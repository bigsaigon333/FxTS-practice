import { pipe, map, reduce } from "@fxts/core";

const split = (sep: string) => (str: string) => str.split(sep);

const queryToObject = (str: string) =>
  pipe(
    str,
    split("&"),
    map(split("=")),
    map(([k, v]) => ({ [k]: v })),
    reduce(Object.assign)
  );

const query = "a=1&c=CC&d=DD";
console.log(queryToObject(query));

export {};
