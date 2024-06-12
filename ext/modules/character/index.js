import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";
import { XWSGINIT } from "./XWSG/index.js";
import { XWTRINIT } from "./XWTR/index.js";
import { XWCSINIT } from "./XWCS/index.js";
import { XWDMINIT } from "./XWDM/index.js";
import { XWTZINIT } from "./XWTZ/index.js";
import { JLBCINIT } from "./JLBC/index.js";

const xjzhCharacterInit=async function(){
    XWSGINIT();
    XWTRINIT();
    XWCSINIT();
    XWDMINIT();
    XWTZINIT();
    JLBCINIT();
};

export default xjzhCharacterInit;