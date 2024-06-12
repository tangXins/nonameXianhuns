import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characters = {
	//魏
	"xjzh_sanguo_wenyang":["male","wei",4,["xjzh_sanguo_pijian","xjzh_sanguo_zhirui","xjzh_sanguo_yongjue"],[]],
	"xjzh_sanguo_zhangliao":["male","wei",3,["xjzh_sanguo_zhiti","xjzh_sanguo_cuifengx"],[]],
	"xjzh_sanguo_xunyou":["male","wei",3,["xjzh_sanguo_qice",lib.config.extension_仙家之魂_xjzh_jiexiantupo?"xjzh_sanguo_zhiyu2":"xjzh_sanguo_zhiyu"],[]],
	"xjzh_sanguo_xuzhu":["male","wei",4,["xjzh_sanguo_luoyi","xjzh_sanguo_huchi"],[]],
	"xjzh_sanguo_guanlu":["male","wei",3,["xjzh_sanguo_busuan"],[]],
	"xjzh_sanguo_caiyan":["female","wei",3,["xjzh_sanguo_caiqing","xjzh_sanguo_zhishu","xjzh_sanguo_beige","xjzh_sanguo_guihan"],[]],
	"xjzh_sanguo_zhenfu":["female","wei",3,["xjzh_sanguo_luoshen","xjzh_sanguo_qixian","xjzh_sanguo_qingguo"],[]],
	"xjzh_sanguo_guojia":["male","wei",3,["xjzh_sanguo_guimou","xjzh_sanguo_tianji","xjzh_sanguo_tianqi"],[]],
	"xjzh_sanguo_dianwei":["male","wei",6,["xjzh_sanguo_elai","xjzh_sanguo_tiequ"],[]],
	"xjzh_sanguo_caocao":["male","wei",4,["xjzh_sanguo_daizhao","xjzh_sanguo_guixin","xjzh_sanguo_feiying","xjzh_sanguo_batu"],["zhu"]],
	//蜀
	"xjzh_sanguo_zhaoyun":["male","shu",2,["xjzh_sanguo_juejing","xjzh_sanguo_longhun","xjzh_sanguo_peijian"],["InitFilter:noZhuHp"]],
	"xjzh_sanguo_weiyan":["male","shu",4,["xjzh_sanguo_kuanggu","xjzh_sanguo_kuangxi","xjzh_sanguo_aogu"],[]],
	"xjzh_sanguo_yueying":["female","shu",3,["xjzh_sanguo_qicai","xjzh_sanguo_jiqiao","xjzh_sanguo_jianqing"],[]],
	"xjzh_sanguo_kongming":["male","shu",4,["xjzh_sanguo_duice","xjzh_sanguo_zhiji","xjzh_sanguo_bazhen"],[]],
	"xjzh_sanguo_spkongming":["male","shu",3,["xjzh_sanguo_guanxing","xjzh_sanguo_xinghun","xjzh_sanguo_qixing"],[]],
	"xjzh_sanguo_huangzhong":["male","shu",4,["xjzh_sanguo_liegong","xjzh_sanguo_chuzhen",lib.config.extension_仙家之魂_xjzh_jiexiantupo?"xjzh_sanguo_zhujian2":"xjzh_sanguo_zhujian"],[]],
	"xjzh_sanguo_machao":["male","shu","2/4",["xjzh_sanguo_tieji","xjzh_sanguo_jieqiang","xjzh_sanguo_xiongbin"],[]],
	"xjzh_sanguo_pangtong":["male","shu",3,["xjzh_sanguo_liansuo","xjzh_sanguo_hengzhou","xjzh_sanguo_moulue"],[]],
	"xjzh_sanguo_zhangfei":["male","shu",3,["xjzh_sanguo_shijiu","xjzh_sanguo_shayi","xjzh_sanguo_zhenhun"],[]],
	"xjzh_sanguo_guanyu":["male","shu",5,["xjzh_sanguo_wusheng","xjzh_sanguo_shuixi","xjzh_sanguo_wushen"],[]],
	"xjzh_sanguo_liubei":["male","shu",5,["xjzh_sanguo_longnu","nzry_jieying","xjzh_sanguo_jieyi"],["zhu"]],
	//吴
	"xjzh_sanguo_daqiao":["female","wu",3,["xjzh_sanguo_guose","xjzh_sanguo_wanrong","xjzh_sanguo_lixiang"],[]],
	"xjzh_sanguo_xiaoqiao":["female","wu",3,["xjzh_sanguo_tianxiang","xjzh_sanguo_emei","xjzh_sanguo_lixiang"],[]],
	"xjzh_sanguo_espsunce":["male","wu",3,["xjzh_sanguo_zhawang","xjzh_sanguo_xingwu","xjzh_sanguo_jiang","xjzh_sanguo_hunzi"],["zhu"]],
	"xjzh_sanguo_sunquan":["male","wu",4,["xjzh_sanguo_zhiheng","xjzh_sanguo_wuyun","xjzh_sanguo_jiuyuan"],["zhu"]],
	"xjzh_sanguo_sunhao":["male","wu",3,["xjzh_sanguo_mingzheng","xjzh_sanguo_renjun"],["zhu"]],
	"xjzh_sanguo_luxun":["male","wu",3,["xjzh_sanguo_shishu","xjzh_sanguo_huoling","xjzh_sanguo_zhijiluxun","xjzh_sanguo_liantui","xjzh_sanguo_fenyin"],[]],
	"xjzh_sanguo_zhoutai":["male","wu",3,["xjzh_sanguo_buqu","xjzh_sanguo_fenji"],[]],
	"xjzh_sanguo_ganning":["male","wu",4,["xjzh_sanguo_youxia"],[]],
	//群
	"xjzh_sanguo_huaxiong":["male","qun",19,["xjzh_sanguo_shiyong","xjzh_sanguo_yaowu","xjzh_sanguo_yangwei"],[]],
	"xjzh_sanguo_nanhua":["male","qun",3,["xjzh_sanguo_shouye","xjzh_sanguo_xianshou","xjzh_sanguo_lundao"],[]],
	"xjzh_sanguo_simahui":["male","qun",3,["xjzh_sanguo_jianjie","xjzh_sanguo_yinshi"],[]],
	"xjzh_sanguo_sphuatuo":["male","qun",3,["xjzh_sanguo_xingyi","xjzh_sanguo_qingnang"],[]],
	"xjzh_sanguo_huatuo":["male","qun","2/3",["xjzh_sanguo_shengxin","xjzh_sanguo_jishi","xjzh_sanguo_liangyi"],[]],
	"xjzh_sanguo_dongzhuo":["male","qun",6,["xjzh_sanguo_lanzheng","xjzh_sanguo_hengzheng","xjzh_sanguo_baolian","xjzh_sanguo_linnue"],["zhu"]],
	"xjzh_sanguo_zuoci":["male","qun",3,["xjzh_sanguo_daoshu","xjzh_sanguo_huanhua"],[]],
	"xjzh_sanguo_tongyuan":["male","qun",3,["xjzh_sanguo_keluan","xjzh_sanguo_cuifeng","xjzh_sanguo_chaohuang"],[]],
	"xjzh_sanguo_spzhangjiao":["male","qun",3,["xjzh_sanguo_bujiao","xjzh_sanguo_taiping","xjzh_sanguo_fangshu"],["zhu"]],
	"xjzh_sanguo_zhangning":["female","qun",3,["xjzh_sanguo_shanxi","xjzh_sanguo_leijix"],[]],
	"xjzh_sanguo_zhangjiao":["male","qun",3,["xjzh_sanguo_leihun","xjzh_sanguo_shendao","xjzh_sanguo_dianjie","xjzh_sanguo_huangtian"],["zhu"]],
	"xjzh_sanguo_splvbu":["male","qun",4,["mashu","xjzh_sanguo_shenji","xjzh_sanguo_baonulvbu"],["zhu"]],
	"xjzh_sanguo_lvbu":["male","qun",4,["xjzh_sanguo_mashu","xjzh_sanguo_shenji","xjzh_sanguo_feijiang","xjzh_sanguo_jiwu"],["zhu"]],
	"xjzh_sanguo_zhangrang":["male","qun",get.mode()=="identity"?"Infinity":"4",["xjzh_sanguo_luanzheng","xjzh_sanguo_chanxian","xjzh_sanguo_shichong"],[]],
	"xjzh_sanguo_bogui":["male","qun",3,["xjzh_sanguo_baima","xjzh_sanguo_yicong","xjzh_sanguo_muma"],[]],
	"xjzh_sanguo_diaochan":["female","qun",4,["xjzh_sanguo_yuewu","xjzh_sanguo_yuehun"],[]],
	"xjzh_sanguo_zhangbao":["male","qun",3,["xjzh_sanguo_zhoufu","xjzh_sanguo_yingbin"],[]],
	"xjzh_sanguo_yuanshao":["male","qun",3,["xjzh_sanguo_tanzhi","xjzh_sanguo_mingmen"],[]],
	"xjzh_sanguo_yuji":["male","qun",3,["xjzh_sanguo_guhuo","xjzh_sanguo_chanyuan"],[]],
	"xjzh_sanguo_zuoyou":["female","qun",3,["xjzh_sanguo_tongxuan","xjzh_sanguo_youbian"],[]],
	//晋
	"xjzh_sanguo_zhongda":["male","jin",3,["xjzh_sanguo_yinren","xjzh_sanguo_bolue","xjzh_sanguo_biantian",],["zhu"]],
	"xjzh_sanguo_chunhua":["female","jin","3/4",["xjzh_sanguo_jueqing","xjzh_sanguo_shangshi","xjzh_sanguo_huishi"],[]],
	//神
	"xjzh_sanguo_espzhangjiao":["male","shen",4,["xjzh_boss_dianxing"],["unseen","forbidai"]],
	"xjzh_sanguo_espliuxie":["male","shen",4,["xjzh_sanguo_tiance","xjzh_sanguo_tianming","xjzh_sanguo_moubian","xjzh_sanguo_zhongxing"],[]],
	"xjzh_sanguo_espzuoci":["male","shen",3,["xjzh_sanguo_quling"],["forbidai","unseen"]],

};

export default characters;