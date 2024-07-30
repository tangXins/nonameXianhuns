import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_huoying_xianzhang":function(player){
		var str0="<b><font color=orange>〖掌仙术〗</font>";
		var str1="转换技，";
		var str2="阴：每回合限一次，你使用非[伤害]卡牌指定已受伤的目标后，其可以摸两张牌或回复一点体力；";
		var str3="阳:每回合限一次，其他角色使用[伤害]卡牌指定你为目标时，你可以扣置一张[伤害]卡牌，其猜测此牌牌名，若错，你可以移除此牌的一个目标。";
		if(player.storage.xjzh_huoying_xianzhang){
			str2='<span class="bluetext">'+str2+'</span>';
		}
		else{
			str3='<span class="bluetext">'+str3+'</span>';
		}
		return str0+str1+"<br><li>"+str2+"<br><li>"+str3;
	},
	"xjzh_huoying_dunshu":function(player){
		let num=player.getHistory("sourceDamage").length||0;
		return `<b><font color=orange>〖阳遁术〗</font><b>你的回合外，你防止所有伤害和体力流失然后摸等量牌，然后你可以令等量名角色各回复一点体力，你无法被翻面、横置，且判定效果反转;<br><b><font color=orange>〖阴遁术〗</font><b>你的回合内，场上其他角色所有技能失效，你使用牌无次数限制且你造成的伤害+${num}。`;
	},

};
export default dynamicTranslates;