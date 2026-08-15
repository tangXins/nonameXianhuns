import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

let Group = function (str1, str2) {
	if (!str2) return str1;
	if(get.mode()=="xjzh_challenge") return str1;
	return game.getExtensionConfig("仙家之魂", "xjzh_changeGroup") ? str2 : str1;
};

const characters = {
	"xjzh_huoying_mingren": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_huoying_fenshen", "xjzh_huoying_zuidun", "xjzh_huoying_kaigua"],
		names: "漩涡|鸣人",
		rank: "legend",
	},
	"xjzh_huoying_zuozhu": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_huoying_qiling", "xjzh_huoying_qianniao", "xjzh_huoying_liudao"],
		names: "宇智波|佐助",
		rank: "legend",
	},
	"xjzh_huoying_yaoshidou": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_huoying_xianzhang", "xjzh_huoying_sihun", "xjzh_huoying_chuanyi"],
		names: "药师|兜",
		rank: "legend",
	},
	"xjzh_huoying_kakaxi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_huoying_kaobei", "xjzh_huoying_shenwei", "xjzh_huoying_leiqie"],
		names: "旗木|卡卡西",
		rank: "legend",
	},
	"xjzh_huoying_zhishui": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_huoying_bietian", "xjzh_huoying_shunshen", "xjzh_huoying_xuzuo"],
		names: "宇智波|止水",
		rank: "legend",
	},

};

for (let i in characters) {
	if (!characters[i].trashBin) characters[i].trashBin = [];
	let array = ["ext:仙家之魂/skin/yuanhua/" + i + ".jpg", "xjzh_die_audio"];
	if (game.getExtensionConfig("仙家之魂", "xjzh_lutoupifu") === true) array.splice(0, 1, "ext:仙家之魂/skin/lutou/" + i + ".jpg");
	characters[i].trashBin.addArray(array);

	if (!characters[i].dieAudios) characters[i].dieAudios = [];
	characters[i].dieAudios.add("ext:仙家之魂/audio/die/" + i + ".mp3");
}

export default characters;