import {
  tap,
  toArray,
  toAsync,
  map,
  take,
  takeWhile,
  each,
  range,
  takeUntil,
  pipe,
  delay,
  flat,
  reject,
} from "@fxts/core";

type Payment = { imp_id: number; order_id: number; amount: number };
type Payments = {
  [k: number]: Payment[];
};

const Impt: {
  payments: Payments;
  getPayments: (page: number) => Promise<Payment[]>;
  cancelPayment: (imp_id: number) => Promise<string>;
} = {
  payments: {
    1: [
      { imp_id: 11, order_id: 1, amount: 15000 },
      { imp_id: 12, order_id: 2, amount: 25000 },
      { imp_id: 13, order_id: 3, amount: 10000 },
    ],
    2: [
      { imp_id: 14, order_id: 4, amount: 25000 },
      { imp_id: 15, order_id: 5, amount: 45000 },
      { imp_id: 16, order_id: 6, amount: 15000 },
    ],
    3: [
      { imp_id: 17, order_id: 7, amount: 20000 },
      { imp_id: 18, order_id: 8, amount: 30000 },
    ],
    4: [],
    5: [],
  },
  getPayments(page: number) {
    console.log(`http://..?page=${page}`);

    return delay(1_000, this.payments[page]);
  },
  cancelPayment(imp_id: number) {
    return Promise.resolve(`${imp_id}: 취소완료`);
  },
};

const DB = {
  getOrders(ids: number[]) {
    return delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }]);
  },
};

const job = async () => {
  // 결제된 결제모듈측 payments를 가져온다
  // page 단위로 가져오는데
  // 결제 데이터가 있을 때까지 모두 가져와서 하나로 합친다.
  const payments = await pipe(
    range(1, Infinity),
    toAsync,
    map((page) => Impt.getPayments(page)),
    takeUntil((a) => a.length < 3),
    flat,
    toArray
  );

  // 결제가 실제로 완료된 가맹점 측 주문서 id들을 뽑는다.
  const orderIds = await pipe(
    payments,
    map(({ order_id }) => order_id),
    toArray,
    (ids) => DB.getOrders(ids),
    map(({ id }) => id),
    toArray
  );

  // 결제모듈의 payments와 가맹점의 주문서를 비교해서
  // 결제를 취소해야할 id들을 뽑아서
  // 결제 취소 api를 실행한다
  await pipe(
    payments,
    reject(({ order_id }) => orderIds.includes(order_id)),
    map(({ order_id }) => order_id),
    toAsync,
    map((orderId) => Impt.cancelPayment(orderId)),
    each(console.log)
  );
};

// 8초에 한 번만 한다
// 그런데 만일 job이 8초보다 더 걸리면, job이 끝날 때까지 기다린다
(function recur() {
  Promise.all([delay(8_000), job()]).then(recur);
})();
