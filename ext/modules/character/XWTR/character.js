import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

let Group = function (str1, str2) {
	if (!str2) return str1;
	if (get.mode() == "xjzh_challenge") return str1;
	return game.getExtensionConfig("仙家之魂", "xjzh_changeGroup") ? str2 : str1;
};

let bannedList = [
	"xjzh_zxzh_linmo",
	"xjzh_poe_guizu",
	"xjzh_poe_yuhuoshi",
	"xjzh_wzry_yuange",
	"xjzh_diablo_lamasi",
	"xjzh_diablo_yafeikela",
	"xjzh_dnf_suodeluosi"
];

const characters = {
	//众星之魂
	"xjzh_zxzh_jiangningzhi": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 5,
		skills: ["xjzh_zxzh_dianling", "xjzh_zxzh_tusu"],
		names: "姜|凝脂",
		rank: "rare",
	},
	"xjzh_zxzh_linmo": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_zxzh_moyu", "xjzh_zxzh_zhenwen", "xjzh_zxzh_jinyan"],
		names: "林|默",
		rank: "legend",
	},
	"xjzh_zxzh_yumuren": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_zxzh_shiqiao", "xjzh_zxzh_baoxin"],
		names: "余|木人",
		rank: "epic",
	},
	"xjzh_zxzh_linlingshiyu": {
		sex: "double",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_zxzh_leifa", "xjzh_zxzh_jianxin", "xjzh_zxzh_jiezhen"],
		names: "林|凌-林|诗雨",
		rank: "legend",
	},
	"xjzh_zxzh_yuanyuan": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_zxzh_renxin", "xjzh_zxzh_xianghun", "xjzh_zxzh_xunqing"],
		names: "冯|媛媛",
		rank: "legend",
	},
	"xjzh_zxzh_mufeng": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_zxzh_yufeng", "xjzh_zxzh_fengzhen", "xjzh_zxzh_zonghuo"],
		names: "沐|风",
		rank: "legend",
	},
	"xjzh_zxzh_moqinwu": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_zxzh_shoutao", "xjzh_zxzh_taoyuan", "xjzh_zxzh_qiwu"],
		names: "莫|轻舞",
		rank: "legend",
	},
	"xjzh_zxzh_moqinyan": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_zxzh_cangjian", "xjzh_zxzh_jiantai", "xjzh_zxzh_yujian"],
		names: "莫|轻言",
		rank: "legend",
	},
	"xjzh_zxzh_linziyan": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_zxzh_leifax", "xjzh_zxzh_leiyu", "xjzh_zxzh_tianxin"],
		names: "林|子言",
		rank: "legend",
	},

	//流放之路
	//女巫
	"xjzh_poe_nvwu": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: [
			"xjzh_poe_choice2",
			"xjzh_poe_huoqiu",
			"xjzh_poe_mishu",
			...(get.mode() === "connect" ? [] : ["xjzh_poe_liequan", "xjzh_poe_zhaohuan"])
		],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_poe_yuansushi": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice", "xjzh_poe_huiliu", "xjzh_poe_guangta", "xjzh_poe_sangzhong", "xjzh_poe_suxing", "xjzh_poe_bilei", "xjzh_poe_qinhe"],
		names: "null|null",
		rank: "legend",
		isShenhua: true,
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_poe_yuhuoshi": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_poe_choice", "xjzh_poe_zhaohuan", "xjzh_poe_yuquan", "xjzh_poe_huoji", "xjzh_poe_feiteng", "xjzh_poe_xianji", "xjzh_poe_shenyou", "xjzh_poe_shikui"],
		names: "null|null",
		rank: "legend",
		isShenhua: true,
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_poe_diyuliequan": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_ranhuo"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
		isZhaohuan: true,
	},
	"xjzh_poe_kuloumushi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_fusu"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
		isZhaohuan: true,
	},
	"xjzh_poe_kulouzonghuozhe": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_zonghuo"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
		isZhaohuan: true,
	},
	"xjzh_poe_kuloufengbaofashi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_fengbao"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
		isZhaohuan: true,
	},

	//决斗者
	"xjzh_poe_juedouzhe": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice2", "xjzh_poe_jianfeng", "xjzh_poe_sidou", "xjzh_poe_tiaozhan"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_poe_chuxing": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice", "xjzh_poe_zhenya", "xjzh_poe_zaixing", "xjzh_poe_lengxue", "xjzh_poe_shixue", "xjzh_poe_canbao", "xjzh_poe_yingxing"],
		names: "null|null",
		rank: "legend",
		isShenhua: true,
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_poe_weishi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice", "xjzh_poe_jingji", "xjzh_poe_zhuzao", "xjzh_poe_fuchou", "xjzh_poe_doushi", "xjzh_poe_xueyan", "xjzh_poe_baipiao"],
		names: "null|null",
		rank: "legend",
		isShenhua: true,
		isUnseen: true,
		isAiForbidden: true,
	},

	//游侠
	"xjzh_poe_youxia": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice2", "xjzh_poe_jingzhun", "xjzh_poe_diaoling"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_poe_ruiyan": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_choice", "xjzh_poe_fenlie", "xjzh_poe_tanshe", "xjzh_poe_juji", "xjzh_poe_jufeng", "xjzh_poe_danmu"],
		names: "null|null",
		rank: "legend",
		isShenhua: true,
		isUnseen: true,
		isAiForbidden: true,
	},

	//贵族
	"xjzh_poe_guizu": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_poe_shenghua"],
		names: "null|null",
		rank: "legend",
	},

	//王者荣耀
	"xjzh_wzry_yuange": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_wzry_kongou", "xjzh_wzry_miying", "xjzh_wzry_zhiyuan"],
		names: "元|歌",
		rank: "legend",
	},
	"xjzh_wzry_libai": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_wzry_xiaxing", "xjzh_wzry_jinjiu", "xjzh_wzry_jiange"],
		names: "李|白",
		rank: "legend",
	},
	"xjzh_wzry_yao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 2,
		skills: ["xjzh_wzry_xingchen", "xjzh_wzry_liekong", "xjzh_wzry_guichen"],
		names: "东方|曜",
		rank: "legend",
	},
	"xjzh_wzry_ganjiangmoye": {
		sex: "double",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_wzry_jianzhong", "xjzh_wzry_cuijian", "xjzh_wzry_jianlai"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_wzry_haiyue": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_wzry_bieyue", "xjzh_wzry_shunhua", "xjzh_wzry_liuguang", "xjzh_wzry_huanhai"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_wzry_huamulan": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_wzry_xunshou", "xjzh_wzry_konglie", "xjzh_wzry_daofeng"],
		names: "花|木兰",
		rank: "legend",
	},
	"xjzh_wzry_duoliya": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_wzry_huange", "xjzh_wzry_zhulang", "xjzh_wzry_tiannai"],
		names: "null|null",
		rank: "legend",
	},

	//暗黑破坏神
	"xjzh_diablo_lamasi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_diablo_hunhuo"],
		names: "null|null",
		rank: "legend",
		//isAiForbidden: true,
	},
	"xjzh_diablo_moruina": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_luanshe", "xjzh_diablo_jingshe", "xjzh_diablo_guanzhu"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_diablo_kaxia": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_sushe", "xjzh_diablo_yingbi", "xjzh_diablo_jianyu"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_diablo_nataya": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_duguan", "xjzh_diablo_xianjing", "xjzh_diablo_baolu"],
		names: "null|null",
		rank: "legend",
		xjzhMp: {
			"maxMp": 100,
			"mp": 100,
			"huixin": 0.35,
			"healing": 2,
			"reduce": 0
		},
	},
	"xjzh_diablo_kelike": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: [],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
		xjzhMp: {
			"maxMp": 100,
			"mp": 0,
			"huixin": 0.1,
			"healing": 1,
			"reduce": 0
		},
	},
	"xjzh_diablo_yafeikela": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_shilue", "xjzh_diablo_shihua"],
		names: "null|null",
		rank: "legend",
		xjzhMp: {
			get maxMp() {
				let bool = game.xjzh_hasEquiped("xjzh_qishu_linghunlaoyin", "xjzh_diablo_yafeikela") ? true : false;
				if (!bool) {
					if (game.xjzh_hasEquiped("xjzh_qishu_fenglangkx", "xjzh_diablo_yafeikela")) return 150;
					return 100;
				}
				return 50;
			},
			get mp() {
				let list = ["xjzh_qishu_linghunlaoyin", "xjzh_qishu_fenglangkx"];
				let bool = list.some(item => game.xjzh_hasEquiped(item, "xjzh_diablo_yafeikela"));
				return bool ? 0 : this.maxMp;
			},
			"huixin": 0.2,
			"healing": 1,
			"reduce": 0.3
		},
	},
	"xjzh_diablo_xiong": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_zhongou", "xjzh_diablo_fensui"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_diablo_lang": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_diablo_jufeng", "xjzh_diablo_leibao"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_diablo_lilisi": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_boss_lianji", "xjzh_boss_qiangji"],
		names: "null|null",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
	},

	//地下城与勇士
	"xjzh_dnf_suodeluosi": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_dnf_jianshen", "xjzh_dnf_aoyi", "xjzh_dnf_jianyi"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_dnf_luoshibahe": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_dnf_tiannai", "xjzh_dnf_zhufu", "xjzh_dnf_shengyu"],
		names: "null|null",
		rank: "legend",
		xjzhMp: {
			"maxMp": 150,
			"mp": 150,
			"huixin": 0,
			"healing": 1,
			"reduce": 0
		},
	},

	//西游释厄传
	"xjzh_xyj_sunwukong": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_xyj_tianhuo", "xjzh_xyj_dongcha", "xjzh_xyj_ruyi"],
		names: "孙|悟空",
		rank: "legend",
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

	game.checkDir(`extension/仙家之魂/skin/standard/${i}`, async result => {
		if (result === 1) {
			let all = await game.promises.getFileList(`extension/仙家之魂/skin/standard/${i}`);
			if (all?.[1].length) {
				if (!get.is.object(characters[i].extraModeData)) characters[i].extraModeData = {};
				characters[i].extraModeData.skinDirs = [`extension/仙家之魂/skin/standard/`];
			}
		}
	});

	if (game.getExtensionConfig("仙家之魂", "qishuyaojians")?.achi?.character?.length) {
		for (let name of game.getExtensionConfig("仙家之魂", "qishuyaojians").achi.character) {
			if (!characters[name]) console.log('未在仙武同人武将包找到该武将', name);
			else {
				characters[name].isAiForbidden = false;
				characters[name].isUnseen = false;
			}
		}
	}
}

export default characters;