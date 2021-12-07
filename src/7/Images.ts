import { map, pipe, reduce } from "@fxts/core";
import data from "./data";

interface Image {
  name: string;
  url: string;
}

const join = <T extends { toString: () => string }>(
  sep: string,
  iterable: Iterable<T>
) =>
  reduce<T, string>((a, b) => `${a.toString()}${sep}${b.toString()}`, iterable);

const string = <T>(iterable: Iterable<T>) => join("", iterable);

const fetch = () =>
  new Promise<Image[]>((resolve) => {
    setTimeout(resolve, 200, data);
  });

const tmpl = (imgs: Iterable<Image>) => `
  <div class="images">
    ${pipe(
      imgs,
      map(
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

const Images = {
  fetch,
  tmpl,
};

export default Images;
