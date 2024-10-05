import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_qixia_tianshu":function(player){
		if(game.getExtensionConfig('金庸群侠传','enable')) return get.translation('xjzh_qixia_tianshu_info');
		return '《金庸群侠传》扩展未安装或未开启，此技能不可用。'
	},
	"xjzh_meiren_qingquan":function(player){
		return !player.awakenedSkills.includes("xjzh_meiren_hanshuang")?"锁定技，当你回复体力后，你获得一点护甲，然后你令一名其他角色随机执行一项：①回复一点体力；②摸一张牌；③获得一点护甲。若你已觉醒，目标执行所有项。":
		"当你回复体力后，你获得两点护甲，然后你令任意名其他角色回复一点体力、摸一张牌、获得一点护甲。";
	},

};
export default dynamicTranslates;