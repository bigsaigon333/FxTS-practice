import { pipe, map, range, reduce } from "@fxts/core";

const join = (sep: string) =>
  reduce<Iterable<string>>((a: string, b: string) => `${a}${sep}${b}`);

const repeat = (c: string, count: number) =>
  pipe(
    range(count),
    map((_) => c),
    join("")
  );

const star = pipe(
  range(1, 6),
  map((a) => repeat("*", a)),
  join("\n")
);

console.log(star);

export {};
