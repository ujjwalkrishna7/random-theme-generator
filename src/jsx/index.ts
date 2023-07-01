// @include './lib/json2.js'

import { ns } from "../shared/shared";

import * as ilst from "./ilst/ilst";

let main: any;

switch (BridgeTalk.appName) {
  case "illustrator":
  case "illustratorbeta":
    main = ilst;
    break;
}
//@ts-ignore
const host = typeof $ !== "undefined" ? $ : window;
host[ns] = main;

export type Scripts = typeof ilst
