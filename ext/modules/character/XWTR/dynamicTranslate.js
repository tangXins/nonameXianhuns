import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const pageUIColor = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor") || "#c06d3b";

const dynamicTranslates = {
	xjzh_diablo_shilue(player) {
		let str = get.translation("xjzh_diablo_shilue_info");
		let bool = get.nameList(player).filter(name => game.xjzh_hasEquiped("xjzh_qishu_linghunlaoyin", name)).length ? true : false;
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return bool ? `${str}<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.05 * (1 + player.xjzhHuixin) * 100)}%</span>几率在发动技能时回复魔力值至魔力上限。` : str;
	},
	xjzh_wzry_guichen(player) {
		let name = "xjzh_wzry_guichen";
		if (lib.skill[name].trigger.player?.length > 1) return get.translation("xjzh_wzry_guichen_info");
		else return get.translation("xjzh_wzry_guichen_info").replaceAll("本局游戏濒死时限一次，", "");
	},
	xjzh_zxzh_leifa(player) {
		let num = player.countCards("h") + 1;
		return `锁定技，每个准备阶段开始时，你摸${num}张牌并弃${num}张牌，然后你可以与其拼点，若你赢，其受到一点雷电伤害且非锁定技失效直到回合结束。`;
	},
	xjzh_wzry_kongou(player) {
		let config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou"), kongOuList = [], num = 0;
		if (!config || !(config instanceof Map) || config.size == 0) return get.translation('xjzh_wzry_kongou_info');

		for (let [key, value] of config) {
			if (value >= 50) kongOuList.push(key);
		}

		if (kongOuList.length >= 10) num += Math.floor(kongOuList.length / 10);

		let str = `锁定技，持恒技，当你造成伤害后或对一名其他角色使用牌后，你获得其${num + 2}/${num + 1}个武将碎片。`;
		return str;
	},
	xjzh_wzry_daofeng(player) {
		let str = "转换技，你的回合开始时，你获得附近所有角色各一张牌。";
		let str2 = "阴：每个角色出牌阶段开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。";
		let str3 = "阳：当你受到伤害或体力流失时，若场上“巡”的数量不大于4，你防止之，然后你可以令一名角色将一张牌置于武将牌上称为“巡”，否则你摸两张牌";
		if (player.storage.xjzh_wzry_daofeng) {
			str2 = '<span class="bluetext">' + str2 + '</span>';
		} else {
			str3 = '<span class="bluetext">' + str3 + '</span>';
		}
		return str + "<li>" + str2 + "<li>" + str3;
	},
	xjzh_zxzh_tusu(player) {
		let num = player.maxHp;
		return `锁定技，你始终跳过摸牌阶段/弃牌阶段，然后从牌堆获得${num}张牌名不一致的牌/${num}个“屠苏”标记，你使用这些牌无距离限制。`;
	},
	xjzh_diablo_jufeng(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `当你造成伤害后，你可以消耗${Math.round(45 * (1 - player.xjzhReduce))}点魔力令其获得1层易伤；拥有易伤的角色造成伤害后，你摸1张牌。`;
	},
	xjzh_diablo_leibao(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `出牌阶段，你可以消耗${Math.round(45 * (1 - player.xjzhReduce))}点魔力令场上所有易伤的角色受到1点雷属性伤害，对其造成1点雷属性伤害，若场上没有易伤角色，你令1名角色获得1层易伤；。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.30 * (1 + player.xjzhHuixin) * 100)}%</span>几率发动该技能不消耗魔力。`;
	},
	xjzh_diablo_zhongou(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `熊人技能，锁定技，你使用[伤害]卡牌只能指定一个目标，你使用的[伤害]卡牌无视防具，若此牌造成伤害，你可以消耗${Math.round(35 * (1 - player.xjzhReduce))}点灵力获得${lib.skill.xjzh_diablo_leibao.level}点护甲并强固${lib.skill.xjzh_diablo_leibao.level}点体力值。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.25 * (1 + player.xjzhHuixin) * 100)}%</span>几率因此技能造成伤害时令目标获得一层减速。`;
	},
	xjzh_diablo_fensui(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `大地技能，锁定技，若你使用牌指定目标时未受伤，此牌结算两次；每隔6个回合，你下一次造成伤害翻倍。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.5 * (1 + player.xjzhHuixin) * 100)}%</span>几率令因此技能受到伤害的目标眩晕。`;
	},
	xjzh_diablo_duguan(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `当你造成伤害时，你可以消耗${Math.round(25 * (1 - player.xjzhReduce))}点魔力令其视为毒属性伤害，你对中毒的目标造成伤害时，会心几率提高50%。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.33 * (1 + player.xjzhHuixin) * 100)}%</span>几率发动该技能时不消耗魔力；你有<span style="color: yellow;">${Math.round(0.25 * (1 + player.xjzhHuixin) * 100)}%</span>几率造成毒属性伤害时令其获得一层中毒。`;
	},
	xjzh_diablo_xianjing(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		let markedCount = player.storage?.xjzh_diablo_xianjing?.length || 0;
		let totalCount = ui.cardPile.childNodes.length;
		let unmarkedCount = totalCount - markedCount;
		return `出牌阶段限一次，你可以观看牌堆随机${Math.ceil(unmarkedCount / 100)}张牌，并将其标记为“剧毒陷阱”，然后将这些牌洗入牌堆随机位置，当其他角色获得此牌时，其获得最大层数中毒。<li>${huixin}：其他角色获得此牌时，你有<span style="color: yellow;">${Math.round(0.2 * (1 + player.xjzhHuixin) * 100)}%</span>几率摸2张牌并获得此牌；你有30%几率回复25点魔力。`;
	},
	xjzh_diablo_baolu(player) {
		let huixin = `<a style='color:${pageUIColor}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `锁定技，每当你对“中毒”的角色造成1点伤害时，令此伤害视为毒属性伤害且+1。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.25 * (1 + player.xjzhHuixin) * 100)}%</span>几率发动技能〖陷阱〗。`;
	},
	xjzh_wzry_jianzhong(player) {
		let cards = player.getExpansions('xjzh_wzry_jianzhong');
		return `锁定技，每当你造成1点伤害后，你将牌堆顶1张牌置于武将牌上称为“剑”，最多${player.storage.xjzh_wzry_jianzhong}把“剑”；若你有“剑”，你造成伤害+${cards.map(card => get.type(card, "trick", player)).toUniqued().length}。`;
	},
	xjzh_wzry_jianlai(player) {
		let cards = player.getExpansions('xjzh_wzry_jianzhong');
		return `锁定技，当你的“剑”不少于${player.storage.xjzh_wzry_jianzhong}时，你获得所有“剑”，你使用“剑”无次数和距离限制，然后〖剑来〗、〖剑冢〗的基础数量+10。`;
	},
	xjzh_zxzh_cangjian(player) {
		let str = get.translation("xjzh_zxzh_cangjian_info"), storage = player.storage.xjzh_zxzh_cangjian;
		if (!storage?.length) return str;
		return str += "<br><br><span style=\"color:#F3D22B\">已视为装备</span>：" + get.translation(storage);
	},
	xjzh_zxzh_jiantai(player) {
		let num = player.storage?.xjzh_zxzh_cangjian?.length || 0;
		return `锁定技，当你受到/造成伤害后，你可以展示牌堆顶${num ? num + 1 : 1}张牌，并获得其中所有的武器牌称为“剑胎”，若没有武器牌，则改为获得所有的装备牌；“剑胎”不计入手牌上限。`;
	},
	xjzh_diablo_yingbi(player) {
		let num = game.countPlayer(current => current.inRangeOf(player));
		return `出牌阶段限一次，你可以移除所有控制效果并令你攻击范围内的所有角色获得易伤，然后摸${num}张牌。`;
	},
	xjzh_diablo_jianyu(player) {
		let end = player["xjzh_diablo_jianyuCoolTimeEnd"], names = get.nameList(player), bool = false;
		if (names.some(name => game.xjzh_hasEquiped("xjzh_qishu_hakankouyu", name))) bool = true;
		let onCoolTime = end > Date.now();
		let str = `<br><br><span style=\"color:#F3D22B\">剩余冷却时间：${onCoolTime ? Math.ceil((end - Date.now()) / 1000) : 0}秒。</span>`
		return `出牌阶段，你可以视为使用一张【万箭齐发】,冷却时间${bool ? 120 * (1 - 0.425) : 120}秒。${onCoolTime ? str : ""}`;
	},
	xjzh_zxzh_renxin(player) {
		let str = `锁定技，当你失去体力后${player.awakenedSkills.includes("xjzh_zxzh_xunqing") ? "、受到伤害后及你的回合开始时" : ""}，你可以判定，若为红色，你可以令至多2名角色各回复一点体力，否则你可以对至多两名角色各造成一点雷属性伤害。`;
		return str;
	},
	xjzh_poe_fusu(player) {
		let str = get.translation("xjzh_poe_fusu_info");
		let history = player.getAllHistory("custom", evt => evt.isZhaohuan && evt.player == player);
		if (!history.length) return str;
		let target = history.map(evt => evt.source).filter(target => target.isAlive()).toUniqued()[0];
		history = target.getAllHistory("custom", evt => evt.isZhaohuan && evt.source == target);
		let targets = history.map(evt => evt.player).filter(target => target.isAlive());
		str = str.replaceAll("1-x", `${targets.length}`).slice(0, str.indexOf("（"));
		return `${str}。`;
	},

};
export default dynamicTranslates;