import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	/*"xjzh_sanguo_yinren":function(player){
		var str="锁定技，游戏开始时，若场上角色数量大于3，你将体力值锁定为";
		if(player.isZhu){
			str+="2;";
		}else{
			str+="1;";
		}
		str+="其他角色阵亡后，若你未因该技能获得至少2点的体力上限，你获得一点体力上限，然后依次获得技能〖极略〗、〖奇才〗，当你拥有以上两个技能时，你移除该技能。";
		return str;
	},*/
	"xjzh_sanguo_caiqing":function(player){
		return `出牌阶段开始时，你可以摸${lib.skill.xjzh_sanguo_caiqing.getDrawResult(player)}张牌。`;
	},
	"xjzh_sanguo_zhiheng":function(player){
		return `出牌阶段限${player.getDamagedHp(true)+1}次，你可以弃置任意张牌并摸等量的牌，然后若你弃置的牌每多一种花色，你额外摸一张牌。`;
	},
	"xjzh_sanguo_lixiang":function(player){
		let list=get.nameList(player).filter(name=>{
			return ["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"].includes(name);
		});
		if(get.config('double_character')){
			if(list.length>=2) return "限定技，当你濒死时，你将武将牌随机替换为“小乔”或“大乔”之一，并回复体力至体力上限。";
			else{
				if(get.is.playerNames(player,"xjzh_sanguo_daqiao")) return "限定技，当你濒死时，你将武将牌替换为“小乔”，并回复体力至体力上限。";
				else if(get.is.playerNames(player,"xjzh_sanguo_xiaoqiao")) return "限定技，当你濒死时，你将武将牌替换为“大乔”，并回复体力至体力上限。";
			}
		}else{
			if(get.is.playerNames(player,"xjzh_sanguo_daqiao")) return "限定技，当你濒死时，你将武将牌替换为“小乔”，并回复体力至体力上限。";
			else if(get.is.playerNames(player,"xjzh_sanguo_xiaoqiao")) return "限定技，当你濒死时，你将武将牌替换为“大乔”，并回复体力至体力上限。";
		}
		return "此技能不可用";
	},
	"xjzh_sanguo_tiance":function(player){
		var str=get.translation('xjzh_sanguo_tiance_info');
		var str2="限两次"
		if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
		return str.replace("限一次",str2);
	},
	"xjzh_sanguo_tianming":function(player){
		var str=get.translation('xjzh_sanguo_tianming_info');
		var str2="限两次"
		if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
		return str.replace("限一次",str2);
	},
	"xjzh_sanguo_moubian":function(player){
		var str=get.translation('xjzh_sanguo_moubian_info');
		if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
		return str+"然后你可以使用或打出此牌";
	},
	"xjzh_sanguo_zhongxing":function(player){
		var str=get.translation('xjzh_sanguo_zhongxing_info');
		if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
		var str2="限定技，主公阵亡时，若你不为主公且场上与你势力一致的角色数量为最多之一，你将身份改为主公，"
		var str3="然后获得一点体力上限并将体力回复至体力上限，";
		var str4="然后所有与你势力一致的角色改为忠臣，此时与你同一阵营的所有角色将势力改为汉，然后其余势力将身份改为反贼，当你阵亡时，所处的阵营直接失败。";
		return str2+str3+str4;
	},
	"xjzh_sanguo_tongxuan":function(player){
		var str="出牌阶段限"+get.cnNumber(get.info("xjzh_sanguo_tongxuan").usable)+"次、游戏开始时、你的回合结束时，你可以移除因〖通玄〗获得的技能并从除〖双生〗之外的所有增益技能中选择"
		var str2="<span style=\"color:#eb1100\">"+get.translation(player.storage.xjzh_sanguo_tongxuan)+"</span>";
		var str3="个技能获得之。"
		return str+str2+str3;
	},
	"xjzh_sanguo_youbian":function(player){
		var str="锁定技，你的准备阶段，你摸";
		if(player.storage.xjzh_sanguo_tongxuan2){
			var str2=get.translation(player.storage.xjzh_sanguo_tongxuan2)+"张牌，";
		}else{
			var str2="x张牌（x为〖通玄〗中的为红色数字），";
		}
		var str3="然后若你已受伤，〖通玄〗中的红色数字+1。"
		return str+str2+str3;
	},
	"xjzh_sanguo_quling":function(player){
		var str=get.translation('xjzh_sanguo_quling_info');
		var str2="";
		var list=window.localStorage.getItem("xjzh_sanguo_quling");
		if(list==null) return str;
		var object=JSON.parse(list);
		var num=object.spower;
		str2+="<br>当前拥有灵力："+num;
		return str+'<br><span class="bluetext">'+str2+'</span><br>';
	},
	"xjzh_sanguo_liegong":function(player){
		var str=lib.translate.xjzh_sanguo_liegong_info;
		var str2="";
		var history=player.getHistory('useCard',function(evt){
			return evt.card&&evt.card.name=='sha';
		});
		if(!history.length)return str;
		if(typeof get.number(history[history.length-1].card)!='number') return str;
		str2+="<br>上张【杀】点数"+get.number(history[history.length-1].card);
		return str+'<br><span class="bluetext">'+str2+'</span><br>';
	},
	"xjzh_sanguo_longnu":function(player){
		var str0="锁定技，转换技，每个其他回合开始时，若你的手牌不大于你的体力值或其手牌为全场唯一最多，你获得其一张牌，然后其摸一张牌";
		var str1="阴：出牌阶段开始时，你失去一点体力并摸一张牌，你的红色手牌均视为【火杀】且无距离限制，且你可以将你的武将牌上的一张黑色“兵”万箭齐发使用(每回合限一次)直到回合结束";
		var str2="阳：出牌阶段开始时，你失去一点体力上限并摸一张牌，你的黑色手牌均视为【雷杀】且无使用次数限制，且你可以将你的武将牌上的一张红色“兵”当桃园结义使用(每回合限一次)直到回合结束";
		if(player.storage.xjzh_sanguo_longnu){
			str1='<span class="bluetext">'+str1+'</span>';
		}
		else{
			str2='<span class="bluetext">'+str2+'</span>';
		}
		return str0+"<li>"+str1+"<li>"+str2;
	},
	"xjzh_sanguo_renjun":function(player){
		var str="主公技，你将〖明政〗中的摸牌数+1改为+2；你将〖暴政〗中的中的造成伤害+1改为+2：";
		if(player.hasSkill("xjzh_sanguo_mingzheng")) str+="你的出牌阶段开始时，你视为使用一张【五谷丰登】。";
		else str+="你的出牌阶段开始时，你视为使用一张【万箭齐发】。";
		return str;
	},
};
export default dynamicTranslates;