import { pipe, filter, map, reduce } from "@fxts/core";

const users = [
  { name: "AA", age: 35 },
  { name: "BB", age: 26 },
  { name: "CC", age: 28 },
  { name: "CC", age: 34 },
  { name: "EE", age: 23 },
];

const totalAgesGreaterThan30 = pipe(
  users,
  map(({ age }) => age),
  filter((a) => a > 30),
  reduce((a, b) => a + b)
);

console.log(totalAgesGreaterThan30);

export {};
