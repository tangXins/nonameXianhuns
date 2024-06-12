import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_jlsg_sanjue":function(player){
		let str=lib.translate["xjzh_jlsg_sanjue_info"];
		if(!player.storage.xjzh_jlsg_sanjue.length) return str;
		let storage=player.storage.xjzh_jlsg_sanjue;
		let skills=new Array();
		for(let skill of storage){
			skills.push(get.translation(skill));
		}
		return str+="<br><br><span style=\"color:#F3D22B\">三绝储备技能</span>："+skills;
	},

};
export default dynamicTranslates;