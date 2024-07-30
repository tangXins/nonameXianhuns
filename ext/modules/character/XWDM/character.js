import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characters = {
	"xjzh_huoying_mingren":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_huoying_fenshen","xjzh_huoying_zuidun","xjzh_huoying_kaigua"],
		names:"漩涡|鸣人",
	},
	"xjzh_huoying_zuozhu":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_huoying_qiling","xjzh_huoying_qianniao","xjzh_huoying_liudao"],
		names:"宇智波|佐助",
	},
	"xjzh_huoying_dou":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_huoying_xianzhang","xjzh_huoying_sihun","xjzh_huoying_chuanyi"],
		names:"药师|兜",
	},
	"xjzh_huoying_kakaxi":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_huoying_kaobei","xjzh_huoying_shenwei","xjzh_huoying_leiqie"],
		names:"旗木|卡卡西",
	},
	"xjzh_huoying_zhishui":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_huoying_bietian","xjzh_huoying_shunshen","xjzh_huoying_xuzuo"],
		names:"宇智波|止水",
	},

};

for(let i in characters){
	if(!characters[i].trashBin) characters[i].trashBin=[];
	let array=["ext:仙家之魂/skin/yuanhua/"+i+".jpg","xjzh_die_audio"];
	if(lib.config.extension_仙家之魂_xjzh_lutoupifu) array.splice(0,1,"ext:仙家之魂/skin/lutou/"+i+".jpg");
	characters[i].trashBin.addArray(array);

	if(!characters[i].dieAudios) characters[i].dieAudios=[];
	characters[i].dieAudios.add("ext:仙家之魂/audio/die/"+i+".mp3");
}

export default characters;