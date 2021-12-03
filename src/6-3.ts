import {
  flat,
  pipe,
  range,
  map,
  takeWhile,
  each,
  delay,
  toAsync,
} from "@fxts/core";

const track = [
  { cars: ["철수", "영희", "철희", "영수"] },
  { cars: ["히든", "커리", "듀란트", "탐슨"] },
  { cars: ["폴", "어빙", "릴라드", "맥컬럼"] },
  { cars: ["스파이더맨", "아이언맨"] },
  { cars: [] },
];

pipe(
  range(Infinity),
  map((i) => track[i]),
  map(({ cars }) => cars),
  toAsync,
  map((a) => delay(1000, a)),
  takeWhile((cars) => cars.length === 4),
  flat,
  map((car) => `${car} 출발!`),
  each((a) => console.log(a))
);
