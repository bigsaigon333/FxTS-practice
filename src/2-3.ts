/* eslint-disable no-continue */
import { pipe, map, reduce, reject } from "@fxts/core";

const obj1 = { a: 1, b: undefined, c: "CC", d: "DD" };

// eslint-disable-next-line func-names
const entries = function* <T>(
  obj: Record<string, T>
): IterableIterator<[string, T]> {
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;

    const v = obj[k];

    if (v === undefined) continue;

    yield [k, v];
  }
};

const join = (sep: string) =>
  reduce<Iterable<string>>((a, b) => `${a}${sep}${b}`);

const queryParams = (obj: Record<string, unknown>) =>
  pipe(
    entries(obj),
    reject(([, v]) => v === undefined),
    map(([k, v]) => [k, String(v)]),
    map(join("=")),
    join("&")
  );

console.log(queryParams(obj1));

export {};
