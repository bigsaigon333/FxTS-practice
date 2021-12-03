import { map, pipe, toAsync, range, delay, each } from "@fxts/core";

pipe(
  range(10),
  toAsync,
  map((a) => delay(a * 100, a)),
  each(console.log)
);
