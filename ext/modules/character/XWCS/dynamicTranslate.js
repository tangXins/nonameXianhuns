import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	"xjzh_qixia_tianshu":function(player){
		if(game.getExtensionConfig('金庸群侠传','enable')) return get.translation('xjzh_qixia_tianshu_info');
		return '《金庸群侠传》扩展未安装或未开启，此技能不可用。'
	},

};
export default dynamicTranslates;