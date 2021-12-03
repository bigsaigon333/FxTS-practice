import { find, pipe, filter, each } from "@fxts/core";

const users = [
  { name: "AA", age: 35 },
  { name: "BB", age: 26 },
  { name: "CC", age: 28 },
  { name: "CC", age: 34 },
  { name: "EE", age: 23 },
];

const user = find((u) => u.name === "BB", users);

console.log(user);

pipe(
  users,
  filter((u) => u.name === "BB"),
  each(console.log)
);

export {};
