import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characters = {
	//美女如云
	"xjzh_meiren_linshuang":{
		sex:"female",
		group:"qun",
		hp:4,
		skills:["xjzh_meiren_qingquan","xjzh_meiren_hanshuang"],
		names:"林|霜",
	},
	"xjzh_meiren_gaoyu":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_juese","xjzh_meiren_xiuya","xjzh_meiren_shumei"],
		names:"高|宇",
	},
	"xjzh_meiren_zhaoyushu":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_chunxiao","xjzh_meiren_jingzhuang","xjzh_meiren_lunzhuan"],
		names:"赵|玉姝",
	},
	"xjzh_meiren_linjiasheng":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_ganling","xjzh_meiren_miaofa"],
		names:"林|嘉笙",
	},
	"xjzh_meiren_wuyufeng":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_meihun","xjzh_meiren_tianzi","xjzh_meiren_huoxin"],
		names:"吴|玉凤",
	},
	"xjzh_meiren_huangyuke":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_huizhi","xjzh_meiren_lanxin","xjzh_meiren_gupan"],
		names:"黄|毓珂",
	},
	"xjzh_meiren_xiangwanru":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_rouqing","xjzh_meiren_jiaqi","xjzh_meiren_huimeng","xjzh_meiren_xianyou"],
		names:"向|婉茹",
	},
	"xjzh_meiren_huangdanxue":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_meiren_zhongqing","xjzh_meiren_yiqing","xjzh_meiren_shangqing"],
		names:"黄|丹雪",
	},

	//天命奇侠
	"xjzh_qixia_daxiongxiaomao":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_qixia_qice","xjzh_qixia_tianshu","xjzh_qixia_xiongmao"],
		names:"null|null",
	},
	"xjzh_qixia_maybe":{
		sex:"male",
		group:"qun",
		hp:6,
		skills:["xjzh_qixia_jiyuan","xjzh_qixia_jibian"],
		names:"null|null",
	},
	"xjzh_qixia_maybe":{
		sex:"male",
		group:"qun",
		hp:3,
		skills:["xjzh_qixia_tubian"],
		names:"null|null",
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