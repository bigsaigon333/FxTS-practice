(() => {
  // node_modules/@fxts/core/dist/esm/_internal/utils.js
  function isIterable(a) {
    var _a;
    return (
      typeof ((_a = a) === null || _a === void 0
        ? void 0
        : _a[Symbol.iterator]) === "function"
    );
  }
  function isAsyncIterable(a) {
    var _a;
    return (
      typeof ((_a = a) === null || _a === void 0
        ? void 0
        : _a[Symbol.asyncIterator]) === "function"
    );
  }

  // node_modules/@fxts/core/dist/esm/_internal/error.js
  var AsyncFunctionException = class extends Error {
    constructor(message = AsyncFunctionException.MESSAGE) {
      super(message);
    }
  };
  AsyncFunctionException.MESSAGE = `'Iterable' can not used with async function.
If you want to deal with async function, see: [toAsync](https://fxts.dev/docs/toAsync)`;

  // node_modules/@fxts/core/dist/esm/pipe1.js
  var pipe1 = (a, f) => {
    return a instanceof Promise ? a.then(f) : f(a);
  };
  var pipe1_default = pipe1;

  // node_modules/@fxts/core/dist/esm/reduce.js
  function sync(f, acc, iterable) {
    for (const a of iterable) {
      acc = f(acc, a);
    }
    return acc;
  }
  async function async(f, acc, iterable) {
    for await (const a of iterable) {
      acc = await pipe1_default(acc, (acc2) => f(acc2, a));
    }
    return acc;
  }
  function reduce(f, seed, iterable) {
    if (iterable === void 0) {
      if (seed === void 0) {
        return (iterable2) => reduce(f, iterable2);
      }
      if (isIterable(seed)) {
        const iterator = seed[Symbol.iterator]();
        const { done, value } = iterator.next();
        if (done) {
          return void 0;
        }
        return sync(f, value, {
          [Symbol.iterator]() {
            return iterator;
          },
        });
      }
      if (isAsyncIterable(seed)) {
        const iterator = seed[Symbol.asyncIterator]();
        return iterator.next().then(({ done, value }) => {
          if (done) {
            return void 0;
          }
          return async(f, value, {
            [Symbol.asyncIterator]() {
              return iterator;
            },
          });
        });
      }
      throw new TypeError("iterable must be type of Iterable or AsyncIterable");
    }
    if (isIterable(iterable)) {
      return sync(f, seed, iterable);
    }
    if (isAsyncIterable(iterable)) {
      return async(f, Promise.resolve(seed), iterable);
    }
    throw new TypeError("iterable must be type of Iterable or AsyncIterable");
  }
  var reduce_default = reduce;

  // node_modules/@fxts/core/dist/esm/Lazy/map.js
  function sync2(f, iterable) {
    const iterator = iterable[Symbol.iterator]();
    return {
      next() {
        const { done, value } = iterator.next();
        if (done) {
          return {
            done: true,
            value: void 0,
          };
        }
        const res = f(value);
        if (res instanceof Promise) {
          throw new AsyncFunctionException();
        }
        return {
          done: false,
          value: res,
        };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }
  function async2(f, iterable) {
    const iterator = iterable[Symbol.asyncIterator]();
    return {
      async next(_concurrent) {
        const { done, value } = await iterator.next(_concurrent);
        if (done) return { done, value };
        return {
          done: false,
          value: await f(value),
        };
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }
  function map(f, iterable) {
    if (iterable === void 0) {
      return (iterable2) => {
        return map(f, iterable2);
      };
    }
    if (isIterable(iterable)) {
      return sync2(f, iterable);
    }
    if (isAsyncIterable(iterable)) {
      return async2(f, iterable);
    }
    throw new TypeError("iterable must be type of Iterable or AsyncIterable");
  }
  var map_default = map;

  // node_modules/@fxts/core/dist/esm/pipe.js
  function pipe(a, ...fns) {
    return reduce_default(pipe1_default, a, fns);
  }
  var pipe_default = pipe;

  // node_modules/@fxts/core/dist/esm/Lazy/take.js
  function* sync3(length, iterable) {
    const iterator = iterable[Symbol.iterator]();
    let cur = null;
    while (length-- > 0 && (cur = iterator.next()).done === false) {
      yield cur.value;
    }
  }
  function async3(length, iterable) {
    const iterator = iterable[Symbol.asyncIterator]();
    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      async next(_concurrent) {
        if (length-- < 1) return { done: true, value: void 0 };
        return iterator.next(_concurrent);
      },
    };
  }
  function take(l, iterable) {
    if (iterable === void 0) {
      return (iterable2) => {
        return take(l, iterable2);
      };
    }
    if (isIterable(iterable)) {
      return sync3(l, iterable);
    }
    if (isAsyncIterable(iterable)) {
      return async3(l, iterable);
    }
    throw new TypeError("iterable must be type of Iterable or AsyncIterable");
  }
  var take_default = take;

  // src/7/dom.ts
  function append(parent, child) {
    if (child == null) {
      return (c) => append(parent, c);
    }
    parent.append(child);
  }
  var $ = {
    el: (html) => {
      const wrap = document.createElement("div");
      wrap.innerHTML = html;
      return wrap.children[0];
    },
    append,
    qs: document.querySelector.bind(document),
  };
  var dom_default = $;

  // src/7/data.ts
  var data = [
    {
      name: "HEART",
      url: "https://s3.marpple.co/files/m2/t3/colored_images/45_1115570_1162087.png",
    },
    {
      name: "\uD558\uD2B8",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819.png",
    },
    {
      name: "2",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076769146_28397.png",
    },
    {
      name: "6",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076919028_64501.png",
    },
    {
      name: "\uB3C4\uB11B",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883.png",
    },
    {
      name: "14",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077199329_75954.png",
    },
    {
      name: "15",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077223857_39997.png",
    },
    {
      name: "\uC2DC\uACC4",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918485881_30787.png",
    },
    {
      name: "\uB3C8",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918585512_77099.png",
    },
    {
      name: "10",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077029665_73411.png",
    },
    {
      name: "7",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076948567_98474.png",
    },
    {
      name: "\uB18D\uAD6C\uACF5",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918719546_22465.png",
    },
    {
      name: "9",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077004840_10995.png",
    },
    {
      name: "\uC120\uBB3C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918791224_48182.png",
    },
    {
      name: "\uB2F9\uAD6C\uACF5",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918909204_46098.png",
    },
    {
      name: "\uC720\uB839",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918927120_12321.png",
    },
    {
      name: "\uC6D0\uC22D\uC774",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919417134_80857.png",
    },
    {
      name: "3",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076802375_69966.png",
    },
    {
      name: "16",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077254829_36624.png",
    },
    {
      name: "\uC548\uACBD",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918944668_23881.png",
    },
    {
      name: "\uD3ED\uC8FD",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919005789_67520.png",
    },
    {
      name: "\uD3ED\uC8FD 2",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919027834_48946.png",
    },
    {
      name: "\uBC15",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919062254_67900.png",
    },
    {
      name: "\uD1B1\uB2C8\uBC14\uD034",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919302583_24439.png",
    },
    {
      name: "11",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077078772_79004.png",
    },
    {
      name: "\uD56B\uB3C4\uADF8",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919086961_23322.png",
    },
    {
      name: "\uACE0\uAE30",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919274214_33127.png",
    },
    {
      name: "\uCC45",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919326628_13977.png",
    },
    {
      name: "\uB3CB\uBCF4\uAE30",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919363855_26766.png",
    },
    {
      name: "\uC9D1",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919395033_19373.png",
    },
    {
      name: "\uC0AC\uB78C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918696715_44274.png",
    },
    {
      name: "\uC5F0\uD544",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919437239_32501.png",
    },
    {
      name: "\uD30C\uC77C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919468582_23707.png",
    },
    {
      name: "\uC2A4\uD53C\uCEE4",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919495804_49080.png",
    },
    {
      name: "\uD2B8\uB85C\uD53C ",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918438617_69000.png",
    },
    {
      name: "\uCE74\uBA54\uB77C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919847041_33220.png",
    },
    {
      name: "\uADF8\uB798\uD504",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918521301_43877.png",
    },
    {
      name: "\uAC00\uBC29",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918642937_11925.png",
    },
    {
      name: "\uC785\uC220",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919886042_10049.png",
    },
    {
      name: "fire",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920036111_19302.png",
    },
    {
      name: "TV",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920054808_42469.png",
    },
    {
      name: "\uD578\uB4DC\uD3F0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920109727_43404.png",
    },
    {
      name: "\uB178\uD2B8\uBD81",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920142776_26474.png",
    },
    {
      name: "\uC804\uAD6C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920181784_14964.png",
    },
    {
      name: "\uC7A5\uBBF8",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920264149_78607.png",
    },
    {
      name: "\uB9E5\uC8FC",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920312701_18073.png",
    },
    {
      name: "\uB9C8\uC774\uD06C",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920397855_39832.png",
    },
    {
      name: "\uBCC4",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920420823_49166.png",
    },
    {
      name: "\uC640\uC774\uD30C\uC774",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920438005_35247.png",
    },
    {
      name: "\uD5E4\uB4DC\uD3F0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920468136_82088.png",
    },
    {
      name: "peace",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920538719_19072.png",
    },
    {
      name: "\uACC4\uC0B0\uAE30",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920348341_40080.png",
    },
    {
      name: "poo 2",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548924259247_12839.png",
    },
    {
      name: "poo 3",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548924850867_72121.png",
    },
    {
      name: "poo 4",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548925154648_40289.png",
    },
    {
      name: "poo",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918988097_38121.png",
    },
    {
      name: "\uBAA8\uB2C8\uD130",
      url: "https://s3.marpple.co/f1/2016/7/1043023_1469769774483.png",
    },
    {
      name: "talk",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548927111573_76831.png",
    },
    {
      name: "keyboard",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516330864360_25866.png",
    },
    {
      name: "daily 2",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548926169159_58295.png",
    },
    {
      name: "daily",
      url: "https://s3.marpple.co/f1/2018/7/1199664_1531814945451_49451.png",
    },
    {
      name: "\uD3B8\uC9C0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548920087850_99421.png",
    },
    {
      name: "sns \uD558\uB2E8\uBC14 2",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548917218903_88079.png",
    },
    {
      name: "sns \uD558\uB2E8\uBC14",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548917192465_28365.png",
    },
    {
      name: "sns \uC774\uBAA8\uC9C0 6",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548927313417_99007.png",
    },
    {
      name: "sns \uC774\uBAA8\uC9C0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548927219485_18861.png",
    },
    {
      name: "13",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516077164559_59630.png",
    },
    {
      name: "iphone",
      url: "https://s3.marpple.co/f1/2016/7/1043023_1469769886837.png",
    },
    {
      name: "\uC544\uC774\uD328\uB4DC",
      url: "https://s3.marpple.co/f1/2016/7/1043023_1469769820297.png",
    },
    {
      name: "\uCEF4\uD4E8\uD130",
      url: "https://s3.marpple.co/f1/2016/7/1043023_1469769802862.png",
    },
    {
      name: "5",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076888018_74741.png",
    },
    {
      name: "poo 1",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548924230868_28487.png",
    },
    {
      name: "Sns icon_\uB625 \uC548\uACBD",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487211657799.png",
    },
    {
      name: "Sns icon_\uB625 \uC6C3\uC74C",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487211686108.png",
    },
    {
      name: "4",
      url: "https://s3.marpple.co/f1/2018/1/1054966_1516076850148_36610.png",
    },
    {
      name: "Sns icon_\uB625 \uB180\uB9BC",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487211670017.png",
    },
    {
      name: "\uB2EC\uB825",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548919531014_35045.png",
    },
    {
      name: "\uC790\uBB3C\uC1E0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918410738_59815.png",
    },
    {
      name: "\uC190 \uC774\uBAA8\uC9C0",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548918353391_54897.png",
    },
    {
      name: "Sns icon_\uC190\uBC14\uB2E5",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210472038.png",
    },
    {
      name: "Sns icon_\uAC80\uC9C0",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210393226.png",
    },
    {
      name: "Sns icon_\uB879",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210522978.png",
    },
    {
      name: "Sns icon_\uD558\uC774\uD30C\uC774\uBE0C",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210538695.png",
    },
    {
      name: "Sns icon_\uBE0C\uC774",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210508758.png",
    },
    {
      name: "Sns icon_\uC911\uC9C0",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210428137.png",
    },
    {
      name: "Sns icon_\uC8FC\uBA39",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210372629.png",
    },
    {
      name: "Sns icon_\uBC15\uC218",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210444994.png",
    },
    {
      name: "Sns icon_\uB530\uBD09",
      url: "https://s3.marpple.co/f1/2017/2/1043404_1487210488684.png",
    },
    {
      name: "\uC190 \uC774\uBAA8\uC9C0 2",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548921736267_35010.png",
    },
    {
      name: "\uC190 \uC774\uBAA8\uC9C0 3",
      url: "https://s3.marpple.co/f1/2019/1/1235206_1548922150829_10878.png",
    },
  ];
  var data_default = data;

  // src/7/Images.ts
  var join = (sep, iterable) =>
    reduce_default((a, b) => `${a.toString()}${sep}${b.toString()}`, iterable);
  var string = (iterable) => join("", iterable);
  var fetch = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 200, data_default);
    });
  var tmpl = (imgs) => `
  <div class="images">
    ${pipe_default(
      imgs,
      map_default(
        (img) => `
          <div class="image">
            <div class="box"><img src="${img.url}" alt=""></div>
            <div class="name">${img.name}</div>
          </div>
        `
      ),
      string
    )}
  </div>
  `;
  var Images = {
    fetch,
    tmpl,
  };
  var Images_default = Images;

  // src/7/7.ts
  pipe_default(
    Images_default.fetch(),
    take_default(20),
    Images_default.tmpl,
    dom_default.el,
    dom_default.append(dom_default.qs("body"))
  );
})();
