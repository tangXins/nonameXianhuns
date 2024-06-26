import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';
import { xjzhCHRskills } from '../index.js';

let jsonInfo=await lib.init.promises.json(`${lib.assetURL}/extension/仙家之魂/info.json`);

export const xjzhPackage={

    character:{character:{},translate:{},},
    card:{card:{},translate:{},list:[],},
    skill:{...xjzhCHRskills},
    author:`${jsonInfo.author}`,
    intro:`版本：${jsonInfo.version}<br><b><font color=red>声明：本扩展完全免费且开源，到目前为止仅在QQ群697310426和545844827发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。`,
    diskURL:"",
    forumURL:"",
    version:`${jsonInfo.version}`,
};