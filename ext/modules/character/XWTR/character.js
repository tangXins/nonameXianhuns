const characters = {
	//众星之魂
	"xjzh_zxzh_jiangningzhi":["female","qun",3,["xjzh_zxzh_dianling","xjzh_zxzh_tusu"],[]],
	"xjzh_zxzh_linmo":["male","qun",3,["xjzh_zxzh_moyu","xjzh_zxzh_zhenwen","xjzh_zxzh_jinyan"],[]],
	"xjzh_zxzh_yumuren":["male","qun",4,["xjzh_zxzh_shiqiao","xjzh_zxzh_baoxin"],[]],
	"xjzh_zxzh_linlingshiyu":["double","qun",3,["xjzh_zxzh_leifa","xjzh_zxzh_jianxin","xjzh_zxzh_jiezhen"],['zhuanshu:xjzh_zhuanshu_jianzong']],
	"xjzh_zxzh_yuanyuan":["female","qun",4,["xjzh_zxzh_renxin","xjzh_zxzh_xianghun","xjzh_zxzh_xunqing"],[]],
	"xjzh_zxzh_mufeng":["male","qun",4,["xjzh_zxzh_yufeng","xjzh_zxzh_fengzhen","xjzh_zxzh_zonghuo"],[]],
	"xjzh_zxzh_moqinwu":["female","qun",3,["xjzh_zxzh_shoutao","xjzh_zxzh_taoyuan","xjzh_zxzh_qiwu"],[]],
	"xjzh_zxzh_moqinyan":["male","qun",3,["xjzh_zxzh_cangjian","xjzh_zxzh_yangjian","xjzh_zxzh_yujian"],['zhuanshu:xjzh_zhuanshu_jianzong']],
	"xjzh_zxzh_linziyan":["male","qun",4,["xjzh_zxzh_leifax","xjzh_zxzh_leiyu","xjzh_zxzh_tianxin"],['zhuanshu:xjzh_zhuanshu_jianzong']],

	//流放之路
	//女巫
	"xjzh_poe_nvwu":["female","qun",3,["xjzh_poe_choice2","xjzh_poe_huoqiu","xjzh_poe_xuruo"],[]],
	"xjzh_poe_yuansushi":["female","qun",3,["xjzh_poe_choice","xjzh_poe_huiliu","xjzh_poe_guangta","xjzh_poe_sangzhong","xjzh_poe_suxing","xjzh_poe_bilei","xjzh_poe_qinhe"],["unseen","forbidai"]],

	//决斗者
	"xjzh_poe_juedouzhe":["male","qun",3,["xjzh_poe_choice2","xjzh_poe_jianfeng","xjzh_poe_sidou","xjzh_poe_tiaozhan"],[]],
	"xjzh_poe_chuxing":["male","qun",3,["xjzh_poe_choice","xjzh_poe_zhenya","xjzh_poe_zaixing","xjzh_poe_lengxue","xjzh_poe_shixue","xjzh_poe_canbao","xjzh_poe_yingxiang","xjzh_poe_yingxing"],["unseen","forbidai"]],
	"xjzh_poe_weishi":["male","qun",3,["xjzh_poe_choice","xjzh_poe_jingji","xjzh_poe_zhuzao","xjzh_poe_fuchou","xjzh_poe_doushi","xjzh_poe_xueyan","xjzh_poe_baipiao"],["unseen","forbidai"]],

	//游侠
	"xjzh_poe_youxia":["female","qun",3,["xjzh_poe_choice2","xjzh_poe_bingjian","xjzh_poe_dianjian"],[]],
	"xjzh_poe_ruiyan":["female","qun",3,["xjzh_poe_choice","xjzh_poe_fenlie","xjzh_poe_tanshe","xjzh_poe_juji","xjzh_poe_jufeng","xjzh_poe_danmu"],["unseen","forbidai"]],

	//贵族
	"xjzh_poe_guizu":["female","qun",3,["xjzh_poe_shenghua"],[]],

	//王者荣耀
	"xjzh_wzry_libai":["male","qun",3,["xjzh_wzry_xiaxing","xjzh_wzry_jinjiu","xjzh_wzry_jiange"],[]],
	"xjzh_wzry_yao":["male","qun",2,["xjzh_wzry_xingchen","xjzh_wzry_liekong","xjzh_wzry_guichen"],[]],
	"xjzh_wzry_ganjiangmoye":["double","qun",3,["xjzh_wzry_jianzhong","xjzh_wzry_cuijian","xjzh_wzry_jianlai"],[]],
	"xjzh_wzry_haiyue":["female","qun",3,["xjzh_wzry_bieyue","xjzh_wzry_shunhua","xjzh_wzry_liuguang","xjzh_wzry_huanhai"],[]],
	"xjzh_wzry_huamulan":["female","qun",4,["xjzh_wzry_xunshou","xjzh_wzry_konglie","xjzh_wzry_daofeng"],[]],
	"xjzh_wzry_duoliya":["female","qun",4,["xjzh_wzry_huange","xjzh_wzry_zhulang","xjzh_wzry_tiannai"],[]],

	//暗黑破坏神
	"xjzh_diablo_lamasi":["male","qun",3,["xjzh_diablo_hunhuo"],[]],
	"xjzh_diablo_nataya":["female","qun",4,["xjzh_diablo_duguan","xjzh_diablo_xianjing","xjzh_diablo_baolu"],[],[{
		"name":"xjzhMp",
		"maxMp":100,
		"mp":100,
		"huixin":1
	}]],
	"xjzh_diablo_kelike":["female","qun",4,[],["unseen","forbidai"],[{
		"name":"xjzhMp",
		"maxMp":100,
		"mp":0
	}]],
	"xjzh_diablo_moruina":["female","qun",4,["xjzh_diablo_luanshe","xjzh_diablo_jingshe","xjzh_diablo_guanzhu"],[]],
	"xjzh_diablo_kaxia":["female","qun",4,["xjzh_diablo_sushe","xjzh_diablo_yingbi","xjzh_diablo_jianyu"],[]],
	"xjzh_diablo_yafeikela":["male","qun",4,["xjzh_diablo_lingshou","xjzh_diablo_shilue"],[],[{
		"name":"xjzhMp",
		"maxMp":100,
		"mp":100,
		"huixin":0.2,
		"reduce":0.3
	}]],
	"xjzh_diablo_xiong":["male","qun",4,["xjzh_diablo_zhongou","xjzh_diablo_fensui"],["unseen","forbidai"]],
	"xjzh_diablo_lang":["male","qun",4,["xjzh_diablo_leibao","xjzh_diablo_kuanghou"],["unseen","forbidai"]],
	"xjzh_diablo_lilisi":["female","qun",3,["xjzh_boss_lianji","xjzh_boss_qiangji"],["unseen","forbidai"]],

	//地下城与勇士
	"xjzh_dnf_jianshen":["male","qun",4,["xjzh_dnf_levelUp"],[],[{
		"name":"xjzhMp",
		"maxMp":80,
		"mp":80
	}]],
	"xjzh_dnf_shengqi":["male","qun",4,["xjzh_dnf_levelUp"],[],[{
		"name":"xjzhMp",
		"maxMp":100,
		"mp":80
	}]],
	"xjzh_dnf_suodeluosi":["male","qun",3,["xjzh_dnf_jianshenx","xjzh_dnf_aoyi","xjzh_dnf_jianyi"],[],[]],

	//西游释厄传
	"xjzh_xyj_sunwukong":["male","qun",4,["xjzh_xyj_tianhuo","xjzh_xyj_dongcha","xjzh_xyj_ruyi"],[],[]],

};

export default characters;