import { pipe, map, range, reduce } from "@fxts/core";

const nine = pipe(
  range(1, 10),
  map((a) =>
    pipe(
      range(1, 10),
      map((b) => `${a}x${b}=${a * b}`),
      reduce((acc, curr) => `${acc}\n${curr}`)
    )
  ),
  reduce((a, b) => `${a}\n\n${b}`)
);

console.log(nine);

export {};
