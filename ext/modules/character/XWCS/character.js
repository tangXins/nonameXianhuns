import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

let Group = function (str1, str2) {
	if (!str2) return str1;
	if (get.mode() == "xjzh_challenge") return str1;
	return game.getExtensionConfig("仙家之魂", "xjzh_changeGroup") ? str2 : str1;
};

let bannedList = [
	"xjzh_meiren_linjiasheng",
	"xjzh_meiren_xiangwanru",
	"xjzh_meiren_wuyufeng",
	"xjzh_qixia_daxiongxiaomao",
	"xjzh_qixia_mumuxiao"
];

const characters = {
	//美女如云
	"xjzh_meiren_linshuang": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_meiren_qingquan", "xjzh_meiren_hanshuang"],
		names: "林|霜",
		rank: "legend",
	},
	"xjzh_meiren_gaoyu": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_juese", "xjzh_meiren_xiuya", "xjzh_meiren_shumei"],
		names: "高|宇",
		rank: "legend",
	},
	"xjzh_meiren_zhaoyushu": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_chunxiao", "xjzh_meiren_jingzhuang", "xjzh_meiren_lunzhuan"],
		names: "赵|玉姝",
		rank: "legend",
	},
	"xjzh_meiren_linjiasheng": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_ganling", "xjzh_meiren_miaofa"],
		names: "林|嘉笙",
		rank: "legend",
	},
	"xjzh_meiren_wuyufeng": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_meihun", "xjzh_meiren_tianzi", "xjzh_meiren_huoxin"],
		names: "吴|玉凤",
		rank: "legend",
	},
	"xjzh_meiren_huangyuke": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_huizhi", "xjzh_meiren_lanxin", "xjzh_meiren_gupan"],
		names: "黄|毓珂",
		rank: "legend",
	},
	"xjzh_meiren_xiangwanru": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_rouqing", "xjzh_meiren_jiaqi", "xjzh_meiren_huimeng", "xjzh_meiren_xianyou"],
		names: "向|婉茹",
		rank: "legend",
	},
	"xjzh_meiren_huangdanxue": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_meiren_zhongqing", "xjzh_meiren_yiqing", "xjzh_meiren_shangqing"],
		names: "黄|丹雪",
		rank: "legend",
	},

	//天命奇侠
	"xjzh_qixia_daxiongxiaomao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: [
			"xjzh_qixia_qice",
			...(game.getExtensionConfig('金庸群侠传', 'enable') ? ["xjzh_qixia_tianshu"] : []),
			"xjzh_qixia_xiongmao"
		],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_qixia_maybe": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 6,
		skills: ["xjzh_qixia_jiyuan", "xjzh_qixia_jibian"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_qixia_mumuxiao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_qixia_tubian"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_qixia_qiuliangming": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_qixia_niandong", "xjzh_qixia_dikang", "xjzh_qixia_juneng"],
		names: "null|null",
		rank: "legend",
		xjzhMp: {
			"maxMp": 100,
			"mp": 60,
			"huixin": 0,
			"healing": 1,
			"reduce": 0
		},
	},

};

for (let i in characters) {
	if (get.mode() == "connect") {
		if (bannedList.includes(i)) {
			characters[i].isAiForbidden = true;
			characters[i].isUnseen = true;
		}
	}
	if (!characters[i].trashBin) characters[i].trashBin = [];
	let array = ["ext:仙家之魂/skin/yuanhua/" + i + ".jpg", "xjzh_die_audio"];
	if (game.getExtensionConfig("仙家之魂", "xjzh_lutoupifu") === true) array.splice(0, 1, "ext:仙家之魂/skin/lutou/" + i + ".jpg");
	characters[i].trashBin.addArray(array);

	if (!characters[i].dieAudios) characters[i].dieAudios = [];
	characters[i].dieAudios.add("ext:仙家之魂/audio/die/" + i + ".mp3");
}

export default characters;