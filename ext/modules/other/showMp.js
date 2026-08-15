import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';

//局内显示魔力面板
if (!lib.element.player.inits) lib.element.player.inits = [];
lib.element.player.inits.add(async (player) => {
    if (player.node.hasOwnProperty("xjzhmp")) {
        player.node.xjzhmp.hide();
        delete player.node.xjzhmp;
    }


    if (player.storage._xjzh_skill_showMpCount == true) return;
    if (!get.isXHwujiang(player)) return;
    if (player.isOut()) return;
    let nameList = get.nameList(player), bool = false;
    if (!Array.isArray(nameList) || !nameList.length) return;
    for (let name of nameList) {
        let characters = get.character(name);
        if (!get.is.object(characters)) continue;
        if (characters.xjzhMp && get.is.object(characters.xjzhMp)) bool = true;
    }
    if (!bool) return;

    game.xjzh_showMp(player, player.storage["xjzh_showMpBool"]);
    player.addSkill("xjzh_skill_showMpCount");
});