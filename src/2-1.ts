import { pipe, map, reduce } from "@fxts/core";

const users = [
  { name: "AA", age: 35 },
  { name: "BB", age: 26 },
  { name: "CC", age: 28 },
  { name: "CC", age: 34 },
  { name: "EE", age: 23 },
];

const totalAge = pipe(
  users,
  map(({ age }) => age),
  reduce((a, b) => a + b)
);

console.log(totalAge);

export {};
