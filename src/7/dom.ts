/* eslint-disable consistent-return */
function append(parent: ParentNode): (child: Node | string) => void;
function append(parent: ParentNode, child: Node | string): void;
function append(parent: ParentNode, child?: Node | string) {
  if (child == null) {
    return (c: NonNullable<typeof child>) => append(parent, c);
  }

  parent.append(child);
}

const $ = {
  el: (html: string) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = html;

    return wrap.children[0];
  },
  append,
  qs: document.querySelector.bind(document),
};

export default $;
