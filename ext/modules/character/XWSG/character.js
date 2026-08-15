import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

let Group = function (str1, str2) {
	if (!str2) return str1;
	if(get.mode()=="xjzh_challenge") return str1;
	return game.getExtensionConfig("仙家之魂", "xjzh_changeGroup") ? str2 : str1;
};

let bannedList = [
	"xjzh_sanguo_espsunce",
	"xjzh_sanguo_ganning",
	"xjzh_sanguo_zhoutai",
	"xjzh_sanguo_diaochan",
	"xjzh_sanguo_nanhua",
	"xjzh_sanguo_lvbu",
	"xjzh_sanguo_yuanshao",
	"xjzh_sanguo_yuji",
	"xjzh_sanguo_zhangrang",
	"xjzh_sanguo_caocao",
	"xjzh_sanguo_guanyu",
	"xjzh_sanguo_espliuxie"
];

const characters = {
	//魏
	"xjzh_sanguo_wenyang": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_pijian", "xjzh_sanguo_zhirui", "xjzh_sanguo_yongjue"],
		names: "文|鸯",
		rank: "legend",
	},
	"xjzh_sanguo_zhangliao": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_biyi", "xjzh_sanguo_zhiti", "xjzh_sanguo_cuifengx"],
		names: "张|辽",
		rank: "legend",
	},
	"xjzh_sanguo_xunyou": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_qice", "xjzh_sanguo_zhiyu"],
		names: "荀|攸",
		rank: "legend",
	},
	"xjzh_sanguo_xuzhu": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_luoyi", "xjzh_sanguo_huchi"],
		names: "许|褚",
		rank: "legend",
	},
	"xjzh_sanguo_guanlu": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_busuan", "xjzh_sanguo_zhanji"],
		names: "管|辂",
		rank: "legend",
	},
	"xjzh_sanguo_caiyan": {
		sex: "female",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_caiqing", "xjzh_sanguo_zhishu", "xjzh_sanguo_beige", "xjzh_sanguo_guihan"],
		names: "蔡|琰",
		rank: "legend",
	},
	"xjzh_sanguo_zhenfu": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_luoshen", "xjzh_sanguo_qixian", "xjzh_sanguo_qingguo"],
		names: "甄|宓",
		rank: "legend",
	},
	"xjzh_sanguo_guojia": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_guimou", "xjzh_sanguo_tianji", "xjzh_sanguo_tianqi"],
		names: "郭|嘉",
		rank: "legend",
	},
	"xjzh_sanguo_dianwei": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 6,
		skills: ["xjzh_sanguo_elai", "xjzh_sanguo_tiequ"],
		names: "典|韦",
		rank: "legend",
	},
	"xjzh_sanguo_caocao": {
		sex: "male",
		group: Group("wei", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_daizhao", "xjzh_sanguo_guixin", "xjzh_sanguo_feiying", "xjzh_sanguo_batu"],
		names: "曹|操",
		rank: "legend",
		isZhugong: true,
	},
	//蜀
	"xjzh_sanguo_huangyueying": {
		sex: "female",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_qicai", "xjzh_sanguo_jiqiao", "xjzh_sanguo_jianqing"],
		names: "黄|月英",
		rank: "legend",
	},
	"xjzh_sanguo_zhaoyun": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 2,
		skills: ["xjzh_sanguo_juejing", "xjzh_sanguo_longhun", "xjzh_sanguo_peijian"],
		names: "赵|云",
		rank: "legend",
		initFilters: ["noZhuHp"],
	},
	"xjzh_sanguo_weiyan": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_kuanggu", "xjzh_sanguo_kuangxi", "xjzh_sanguo_aogu"],
		names: "魏|延",
		rank: "legend",
	},
	"xjzh_sanguo_kongming": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_duice", "xjzh_sanguo_zhiji", "xjzh_sanguo_bazhen"],
		names: "诸葛|亮",
		rank: "legend",
	},
	"xjzh_sanguo_spkongming": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 5,
		skills: ["xjzh_sanguo_guanxing", "xjzh_sanguo_xinghun", "xjzh_sanguo_wuxiang"],
		names: "诸葛|亮",
		rank: "legend",
	},
	"xjzh_sanguo_huangzhong": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_liegong", "xjzh_sanguo_chuzhen", "xjzh_sanguo_zhujian"],
		names: "黄|忠",
		rank: "legend",
	},
	"xjzh_sanguo_machao": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 2,
		maxHp: 4,
		skills: ["xjzh_sanguo_tieji", "xjzh_sanguo_jieqiang", "xjzh_sanguo_xiongbin"],
		names: "马|超",
		rank: "legend",
	},
	"xjzh_sanguo_pangtong": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_liansuo", "xjzh_sanguo_hengzhou", "xjzh_sanguo_moulue"],
		names: "庞|统",
		rank: "legend",
	},
	"xjzh_sanguo_zhangfei": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_shijiu", "xjzh_sanguo_shayi", "xjzh_sanguo_zhenhun"],
		names: "张|飞",
		rank: "legend",
	},
	"xjzh_sanguo_guanyu": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 5,
		skills: ["xjzh_sanguo_wusheng", "xjzh_sanguo_hengdao", "xjzh_sanguo_wushen"],
		names: "关|羽",
		rank: "legend",
	},
	"xjzh_sanguo_liubei": {
		sex: "male",
		group: Group("shu", "xjzh_xingGroup"),
		hp: 5,
		skills: ["xjzh_sanguo_longnu", "nzry_jieying", "xjzh_sanguo_jieyi"],
		names: "刘|备",
		rank: "legend",
		isZhugong: true,
	},
	//吴
	"xjzh_sanguo_espsunce": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_zhawang", "xjzh_sanguo_xingwu", "xjzh_sanguo_jiang", "xjzh_sanguo_hunzi"],
		names: "孙|策",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_sunquan": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_zhiheng", "xjzh_sanguo_wuyun", "xjzh_sanguo_jiuyuan"],
		names: "孙|权",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_ganning": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_youxia"],
		names: "甘|宁",
		rank: "legend",
	},
	"xjzh_sanguo_daqiao": {
		sex: "female",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_guose", "xjzh_sanguo_wanrong", "xjzh_sanguo_lixiang"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_sanguo_xiaoqiao": {
		sex: "female",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_tianxiang", "xjzh_sanguo_emei", "xjzh_sanguo_lixiang"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_sanguo_sunhao": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_mingzheng", "xjzh_sanguo_renjun"],
		names: "孙|皓",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_luxun": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_shishu", "xjzh_sanguo_wulue", "xjzh_sanguo_liantui"],
		names: "陆|逊",
		rank: "legend",
	},
	"xjzh_sanguo_zhoutai": {
		sex: "male",
		group: Group("wu", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_buqu", "xjzh_sanguo_fenji"],
		names: "周|泰",
		rank: "legend",
	},
	//群
	"xjzh_sanguo_dongzhuo": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 6,
		skills: ["xjzh_sanguo_lanzheng", "xjzh_sanguo_hengzheng", "xjzh_sanguo_baolian", "xjzh_sanguo_linnue"],
		names: "董|卓",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_zhangjiao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_leihun", "xjzh_sanguo_shendao", "xjzh_sanguo_dianjie", "xjzh_sanguo_hongfa", "xjzh_sanguo_huangtian"],
		names: "张|角",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_spzhangjiao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_bujiao", "xjzh_sanguo_guidao", "xjzh_sanguo_taiping", "xjzh_sanguo_fangshu"],
		names: "张|角",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_lvbu": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_mashu", "xjzh_sanguo_shenji", "xjzh_sanguo_feijiang", "xjzh_sanguo_jiwu"],
		names: "吕|布",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_splvbu": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["mashu", "xjzh_sanguo_shenji", "xjzh_sanguo_shenwei"],
		names: "吕|布",
		rank: "legend",
		isZhugong: true,
	},
	"xjzh_sanguo_huaxiong": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 19,
		skills: ["xjzh_sanguo_shiyong", "xjzh_sanguo_yaowu", "xjzh_sanguo_yangwei"],
		names: "华|雄",
		rank: "legend",
	},
	"xjzh_sanguo_nanhua": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_shouye", "xjzh_sanguo_xianshou", "xjzh_sanguo_lundao"],
		names: "null|null",
		rank: "legend",
		isAiForbidden: true,
		isUnseen: true,
	},
	"xjzh_sanguo_simahui": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_jianjie", "xjzh_sanguo_yinshi"],
		names: "司马|徽",
		rank: "legend",
	},
	"xjzh_sanguo_huatuo": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 2,
		maxHp: 3,
		skills: ["xjzh_sanguo_shengxin", "xjzh_sanguo_jishi", "xjzh_sanguo_liangyi"],
		names: "华|佗",
		rank: "legend",
	},
	"xjzh_sanguo_sphuatuo": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_xingyi", "xjzh_sanguo_qingnang"],
		names: "华|佗",
		rank: "legend",
	},
	"xjzh_sanguo_zuoci": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_daoshu", "xjzh_sanguo_huanhua"],
		names: "左|慈",
		rank: "legend",
	},
	"xjzh_sanguo_tongyuan": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_keluan", "xjzh_sanguo_cuifeng", "xjzh_sanguo_chaohuang"],
		names: "童|渊",
		rank: "legend",
	},
	"xjzh_sanguo_zhangning": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_shanxi", "xjzh_sanguo_leijix"],
		names: "张|宁",
		rank: "legend",
	},
	"xjzh_sanguo_zhangrang": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: get.mode() == "identity" ? Infinity : 4,
		skills: ["xjzh_sanguo_luanzheng", "xjzh_sanguo_chanxian", "xjzh_sanguo_shichong"],
		names: "张|让",
		rank: "legend",
	},
	"xjzh_sanguo_bogui": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_baima", "xjzh_sanguo_yicong", "xjzh_sanguo_muma"],
		names: "公孙|瓒",
		rank: "legend",
	},
	"xjzh_sanguo_diaochan": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_yuewu", "xjzh_sanguo_yuehun"],
		names: "null|null",
		rank: "legend",
	},
	"xjzh_sanguo_zhangbao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_zhoufu", "xjzh_sanguo_yingbin"],
		names: "张|宝",
		rank: "legend",
	},
	"xjzh_sanguo_yuanshao": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_tanzhi", "xjzh_sanguo_mingmen"],
		names: "袁|绍",
		rank: "legend",
	},
	"xjzh_sanguo_yuji": {
		sex: "male",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_guhuo", "xjzh_sanguo_chanyuan"],
		names: "于|吉",
	},
	"xjzh_sanguo_zuoyou": {
		sex: "female",
		group: Group("qun", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_tongxuan", "xjzh_sanguo_youbian"],
		names: "左|幽",
		rank: "legend",
	},
	//晋
	"xjzh_sanguo_simayi": {
		sex: "male",
		group: Group("jin", "xjzh_xingGroup"),
		hp: 3,
		skills: ["xjzh_sanguo_yinren", "xjzh_sanguo_bolue", "xjzh_sanguo_biantian"],
		names: "司马|懿",
		rank: "legend",
		isZhugong: true,
		initFilters: ["noZhuHp"],
	},
	"xjzh_sanguo_zhangchunhua": {
		sex: "female",
		group: Group("jin", "xjzh_xingGroup"),
		hp: 3,
		maxHp: 4,
		skills: ["xjzh_sanguo_jueqing", "xjzh_sanguo_shangshi", "xjzh_sanguo_huishi"],
		names: "张|春华",
		rank: "legend",
	},
	//神
	"xjzh_sanguo_espzhangjiao": {
		sex: "male",
		group: Group("shen", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_dianxing"],
		names: "张|角",
		rank: "legend",
		isUnseen: true,
		isAiForbidden: true,
	},
	"xjzh_sanguo_espliuxie": {
		sex: "male",
		group: Group("shen", "xjzh_xingGroup"),
		hp: 4,
		skills: ["xjzh_sanguo_tiance", "xjzh_sanguo_tianming", "xjzh_sanguo_moubian", "xjzh_sanguo_zhongxing"],
		names: "刘|协",
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


	if (game.getExtensionConfig("仙家之魂", "qishuyaojians")?.achi?.character?.length) {
		for (let name of game.getExtensionConfig("仙家之魂", "qishuyaojians").achi.character) {
			if (!characters[name]) console.log('未在仙武三国武将包找到该武将');
			else {
				characters[name].isAiForbidden = false;
				characters[name].isUnseen = false;
			}
		}
	}
}

export default characters;