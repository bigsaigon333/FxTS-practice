/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { pipe, take } from "@fxts/core";
import $ from "./dom";
import Images from "./Images";

pipe(Images.fetch(), take(20), Images.tmpl, $.el, $.append($.qs("body")!));

export {};
