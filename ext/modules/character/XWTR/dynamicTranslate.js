import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_wzry_daofeng":function(player){
		var str="转换技，你的回合开始时，你获得附近所有角色各一张牌。";
		var str2="阴：每个回合开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。";
		var str3="阳：当你受到伤害或体力流失时，若场上没有“巡”且数值不小于2，你可以防止之，然后令一名角色将一张牌置于武将牌上称为“巡”，否则你摸两张牌。";
		if(player.storage.xjzh_wzry_daofeng){
			str2='<span class="bluetext">'+str2+'</span>';
		}
		else{
			str3='<span class="bluetext">'+str3+'</span>';
		}
		return str+"<li>"+str2+"<li>"+str3;
	},
	"xjzh_diablo_leibao":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `风暴技能，出牌阶段，你可以消耗${Math.round(45*(1-player.xjzhReduce))}点灵力召唤一道闪电并指定一名其他角色，对其造成${lib.skill.xjzh_diablo_leibao.level}点雷属性伤害。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.35*(1+player.xjzhHuixin)*100)}%</span>几率因此技能造成伤害时令其获得一层感电`;
	},
	"xjzh_diablo_kuanghou":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `狼人技能，出牌阶段限一次，你可以回复${Math.floor(lib.skill.xjzh_diablo_leibao.level/5)}点体力值并回复20点灵力。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.05*(1+player.xjzhHuixin)*100)}%</span>几率因此技能回复体力时回复体力至体力上限。`;
	},
	"xjzh_diablo_zhongou":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `熊人技能，锁定技，你使用[伤害]卡牌只能指定一个目标，你使用的[伤害]卡牌无视防具，若此牌造成伤害，你可以消耗${Math.round(35*(1-player.xjzhReduce))}点灵力获得${lib.skill.xjzh_diablo_leibao.level}点护甲并强固${lib.skill.xjzh_diablo_leibao.level}点体力值。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.25*(1+player.xjzhHuixin)*100)}%</span>几率因此技能造成伤害时令目标获得一层减速。`;
	},
	"xjzh_diablo_fensui":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `大地技能，锁定技，若你使用牌指定目标时未受伤，此牌结算两次；每隔6个回合，你下一次造成伤害翻倍。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.5*(1+player.xjzhHuixin)*100)}%</span>几率令因此技能受到伤害的目标眩晕。`;
	},
	"xjzh_diablo_duguan":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `当你造成伤害时，你可以消耗${Math.round(25*(1-player.xjzhReduce))}点魔力令其视为毒属性伤害，你对中毒的目标造成伤害时，会心几率提高50%。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.33*(1+player.xjzhHuixin)*100)}%</span>几率发动该技能时不消耗魔力；你有<span style="color: yellow;">${Math.round(0.25*(1+player.xjzhHuixin)*100)}%</span>几率造成毒属性伤害时令其获得一层中毒。`;
	},
	"xjzh_diablo_xianjing":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		let cards=Array.from(ui.cardPile.childNodes).filter(card=>!player.storage.xjzh_diablo_xianjing.includes(card));
		return `出牌阶段限一次，你可以观看牌堆随机${Math.ceil(cards.length/100)}张牌，并将其标记为“剧毒陷阱”，然后将这张牌洗入牌堆随机位置，当其他角色获得此牌时，其获得最大层数中毒。<li>${huixin}：其他角色获得此牌时，你有<span style="color: yellow;">${Math.round(0.2*(1+player.xjzhHuixin)*100)}%</span>几率摸2张牌并获得此牌；你有30%几率回复25点魔力。`;
	},
	"xjzh_diablo_baolu":function(player){
		let huixin=`<a style='color:${game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor")?game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor"):"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
		return `锁定技，每当你对“中毒”的角色造成1点伤害时，令此伤害视为毒属性伤害且+1。<li>${huixin}：你有<span style="color: yellow;">${Math.round(0.25*(1+player.xjzhHuixin)*100)}%</span>几率发动技能〖陷阱〗。`;
	},
	"xjzh_wzry_jianzhong":function(player){
		let cards=player.getExpansions('xjzh_wzry_jianzhong');
		return `锁定技，每当你造成1点伤害后，你将牌堆顶1张牌置于武将牌上称为“剑”，最多${player.storage.xjzh_wzry_jianzhong}把“剑”；若你有“剑”，你造成伤害+${[...new Set(player.getExpansions("xjzh_wzry_jianzhong").map(card=>get.type(card,"trick",player)))].length}。`;
	},
	"xjzh_wzry_jianlai":function(player){
		let cards=player.getExpansions('xjzh_wzry_jianzhong');
		return `锁定技，当你的“剑”不少于${player.storage.xjzh_wzry_jianzhong}时，你获得所有“剑”，你使用“剑”无次数和距离限制，然后〖剑来〗、〖剑冢〗的基础数量+10。`;
	},
	"xjzh_zxzh_cangjian":function(player){
		let str=lib.translate["xjzh_zxzh_cangjian_info"],storage=player.storage.xjzh_zxzh_cangjian;
		if(!storage.length) return str;
		return str+="<br><br><span style=\"color:#F3D22B\">已视为装备</span>："+get.translation(storage);
	},
	"xjzh_zxzh_jiantai":function(player){
		let num=player.storage.xjzh_zxzh_cangjian?player.storage.xjzh_zxzh_cangjian.length:0;
		return `锁定技，当你受到/造成伤害后，你可以展示牌堆顶${num?num+1:1}张牌，并获得其中所有的武器牌称为“剑胎”，若没有武器牌，则改为获得所有的装备牌；“剑胎”不计入手牌上限。`;
	},

};
export default dynamicTranslates;