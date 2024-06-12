import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_dnf_levelUp":function(player){
		var str="〖属性面板〗：每使用一张牌或造成伤害获得一点经验，经验值为3+等级时升级，基础魔力回复为每回合";
		var num=player.storage.basexjzhMp
		str+=""+num+"点魔力，每回合回复"+num+"点魔力";
		return str;
	},
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

};
export default dynamicTranslates;