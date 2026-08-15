import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	xjzh_boss_qiangji(player) {
		let storage = player.storage.xjzh_boss_qiangji;
		if (!storage) return get.translation("xjzh_boss_qiangji_info");
		let str = `锁定技，你受到伤害有${Math.round(storage.get("out"))}%几率离开游戏，并于随机1-${Math.round(storage.get("time") / 1000)}s后回到游戏；`
		str += "当你回到游戏时，你可以视为使用一张你上一次因其受到伤害时的牌，然后你展示牌堆顶一张牌直到其花色、点数均与这张牌不同，并获得之前展示的所有牌，技能结算后，你立即结束当前回合并执行一个额外的回合。";
		return str;
	},
	xjzh_boss_lianji(player) {
		let storage = player.storage.xjzh_boss_lianji;
		let str = `锁定技，你每使用<span style=\"color:#FF0000\">${storage.get("use")}</span>张基本牌/非延时锦囊牌，你的下一张非延时锦囊牌/基本牌额外结算<span style=\"color:#0000FF\">${storage.get("count")}</span>次`;
		return str;
	},
	xjzh_boss_fennu(player) {
		let str = "锁定技，你的回合开始前，";
		if (player.hp > player.maxHp / 2) {
			str += "你选择获得1个";
		} else {
			str += "你选择获得至多3个";
		}
		str += "等级小于5的奇术要件效果，然后移除你已获得的奇术要件效果，若你的体力值不大于你的体力上限的1/3，则视为场上其他角色依次对自己使用一张【杀】。";
		return str;
	},
	xjzh_boss_dianchong(player) {
		let str = "锁定技，当你受到/造成雷属性伤害后，你获得等量“电冲”标记并令其获得1层感电；当你有“电冲”标记时，你造成伤害有";
		let num = 2 * player.countMark('xjzh_boss_dianchong');
		str += num + "％几率暴击。";
		let colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
		colorx = colorx ? game.hasExtension("金庸群侠传") ? colorx : "#c06d3b" : "#c06d3b";
		let str2 = `<a style='color:${colorx}' href=\"javascript:game.xjzh_openDialog('暴击');\">暴击</a>`;
		str = str.replace(/暴击/g, str2);
		let str3 = `<a style='color:${colorx}' href=\"javascript:game.xjzh_openDialog('感电');\">感电</a>`;
		str = str.replace(/感电/g, str3);
		return str;
	},
	xjzh_boss_dianhua(player) {
		let str = "出牌阶段，若你有“电冲”标记，你可以弃置1枚“电冲”标记并展示牌堆顶一张牌，若此牌花色为♠，你对一名其他角色造成一点雷属性伤害，否则你获得此牌；感电的角色执行摸牌、出牌阶段时有";
		let num = 2 * player.countMark('xjzh_boss_dianchong');
		str += num + "％几率改为你执行。";
		let colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
		colorx = colorx ? game.hasExtension("金庸群侠传") ? colorx : "#c06d3b" : "#c06d3b";
		let str2 = `<a style='color:${colorx}' href=\"javascript:game.xjzh_openDialog('感电');\">感电</a>`;
		str = str.replace(/感电/g, str2);
		return str;
	},
	xjzh_boss_mengdu(player) {
		let colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
		colorx = colorx ? game.hasExtension("金庸群侠传") ? colorx : "#c06d3b" : "#c06d3b";
		let str2 = `<a style='color:${colorx}' href=\"javascript:game.xjzh_openDialog('中毒');\">中毒</a>`;
		let str = "锁定技，你造成的所有伤害视为毒属性伤害，且你造成毒属性伤害有" + player.getHp(true) * 10 + "％几率令其获得一层中毒，因你而中毒的目标获得的中毒无层数上限；当你令一名角色中毒时，你摸x张牌（x为其武将牌上的中毒层数）；你防止获得中毒。";
		str = str.replace(/中毒/g, str2);
		return str;
	},
	xjzh_boss_shenghui4(player) {
		let num = player.getDamagedHp();
		let num2 = 1;
		if (player.hasSkill("xjzh_boss_caijue2_on")) {
			[num, num2] = [num2, num];
		}
		return `锁定技，你始终跳过弃牌阶段；你的回合内，若你已受伤，你使用基本牌额外结算${num}次，否则你使用非延时锦囊牌额外结算${num2}次`;
	},

};
export default dynamicTranslates;