'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('XWSG')) lib.config.characters.remove('XWSG');
		lib.translate['XWSG_character_config']='仙武三国';
		var XWSG={
			name:'XWSG',
			connect:true,
			connectBanned:[],
			characterSort:{
				XWSG:{
					"XWSG_wei":["xjzh_sanguo_wenyang","xjzh_sanguo_zhangliao","xjzh_sanguo_xunyou","xjzh_sanguo_xuzhu","xjzh_sanguo_guanlu","xjzh_sanguo_caocao","xjzh_sanguo_dianwei","xjzh_sanguo_caiyan","xjzh_sanguo_zhenfu","xjzh_sanguo_guojia"],
					"XWSG_shu":["xjzh_sanguo_liubei","xjzh_sanguo_zhaoyun","xjzh_sanguo_weiyan","xjzh_sanguo_yueying","xjzh_sanguo_kongming","xjzh_sanguo_spkongming","xjzh_sanguo_huangzhong","xjzh_sanguo_machao","xjzh_sanguo_pangtong","xjzh_sanguo_zhangfei","xjzh_sanguo_guanyu"],
					"XWSG_wu":["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao","xjzh_sanguo_espsunce","xjzh_sanguo_sunquan","xjzh_sanguo_ganning","xjzh_sanguo_sunhao","xjzh_sanguo_luxun","xjzh_sanguo_zhoutai"],
					"XWSG_qun":["xjzh_sanguo_huaxiong","xjzh_sanguo_nanhua","xjzh_sanguo_zuoyou","xjzh_sanguo_simahui","xjzh_sanguo_yuji","xjzh_sanguo_sphuatuo","xjzh_sanguo_yuanshao","xjzh_sanguo_zhangbao","xjzh_sanguo_diaochan","xjzh_sanguo_bogui","xjzh_sanguo_zhangrang","xjzh_sanguo_huatuo","xjzh_sanguo_dongzhuo","xjzh_sanguo_zuoci","xjzh_sanguo_tongyuan","xjzh_sanguo_zhangjiao","xjzh_sanguo_zhangning","xjzh_sanguo_spzhangjiao","xjzh_sanguo_splvbu","xjzh_sanguo_lvbu"],
					"XWSG_jin":["xjzh_sanguo_zhongda","xjzh_sanguo_chunhua"],
					"XWSG_shen":["xjzh_sanguo_espzhangjiao","xjzh_sanguo_espzuoci","xjzh_sanguo_espliuxie"],
				    
				},
			},
			character:{
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
				"xjzh_sanguo_dongzhuo":["male","qun",6,["xjzh_sanguo_lanzheng","xjzh_sanguo_hengzheng","xjzh_sanguo_baolian","xjzh_sanguo_linnue","xjzh_sanguo_zongjiu"],["zhu"]],
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
				
			},
			characterIntro:{
			    "xjzh_sanguo_chunhua":"曹魏粟邑令张汪之女，晋宣帝司马懿之妻，晋景帝司马师和晋文帝司马昭的母亲。",
			    "xjzh_sanguo_wenyang":"文俶（238~291年4月23日[28]），字次骞，小名阿鸯，[1]世称文鸯，[1]沛国谯郡（今安徽省亳州市）人。魏末晋初时期名将，曹魏扬州刺史文钦之子。",
			    "xjzh_sanguo_espsunce":"此武将的设计取自虚拟故事，孙策诈亡统一天下<br>字伯符，吴郡富春县（今浙江省杭州市富阳区）人。东汉末年割据群雄之一，孙吴政权的奠基者之一，破虏将军孙坚长子，吴大帝孙权长兄。",
			    "xjzh_sanguo_espzhangjiao":"自称“大贤良师”“天公将军”，东汉冀州钜鹿（今河北宁晋[1]）人，中国东汉末年农民起义军“黄巾军”的领袖，太平道的创始人。",
			    "xjzh_sanguo_nanhua":"南华老仙，是古典小说《三国演义》中的虚拟人物。其原型来自道教典籍中对庄子的封号，又称“南华仙人”、“南华真人”等。",
			    "xjzh_sanguo_zuoyou":"据说是左慈的女儿/徒弟，但无从查据",
			    "xjzh_sanguo_espzuoci":"此武将的设计取自虚拟故事<br>字元放，号乌角先生，东汉末方士，庐江（今安徽庐江西南）人。少居天柱山，习炼丹。",
			    "xjzh_sanguo_sunquan":"字仲谋， 吴郡 富春县（今浙江省 杭州市 富阳区 ）人。 三国 时期孙吴开国皇帝（229年5月23日－252年5月21日在位）、 政治家、军事统帅。",
			    "xjzh_sanguo_simahui":"字德操，颍川阳翟（今河南省禹州市）人。东汉末年隐士，精通奇门、经学。有“水镜先生”之称。",
			    "xjzh_sanguo_yuji":"东汉末年道士，后为孙策所杀，代表作有《太平经》。",
				"xjzh_sanguo_sphuatuo":"华佗东汉末年著名的医学家，钻研医术而不求仕途。他医术全面，尤其擅长外科，精于手术。",
				"xjzh_sanguo_zhaoyun":"字子龙，常山真定（今河北省正定）人。身长八尺，姿颜雄伟，三国时期蜀汉名将",
				"xjzh_sanguo_zuoci":"字元放，号乌角先生，东汉末方士，庐江（今安徽庐江西南）人。少居天柱山，习炼丹。",
				"xjzh_sanguo_weiyan":"字文长。初随刘备作战，智勇双全，勇冠三军，深得刘备信任，刘备称王后受封汉中太守",
				"xjzh_sanguo_yueying":"三国时荆州沔南白水（今湖北襄阳）人，沔阳名士黄承彦之女，诸葛亮之妻，诸葛瞻之母。",
				"xjzh_sanguo_kongming":"字孔明，号卧龙（也作伏龙），汉族，徐州琅琊阳都（今山东临沂市沂南县）人，三国时期蜀汉丞相，杰出的政治家、军事家、散文家、书法家、发明家。",
				"xjzh_sanguo_spkongming":"字孔明，号卧龙（也作伏龙），汉族，徐州琅琊阳都（今山东临沂市沂南县）人，三国时期蜀汉丞相，杰出的政治家、军事家、散文家、书法家、发明家。",
				"xjzh_sanguo_daqiao":"大乔（生卒年不详），庐江郡皖县（今安徽省潜山市）人，东汉末年江东孙策的夫人，本姓“桥”，小说《三国演义》误作“乔”，因为同时还有一个妹妹嫁给周瑜，为了进行区分，姐姐习惯称作“大乔（桥）”。",
				"xjzh_sanguo_xiaoqiao":"小乔（生卒年不详），本姓桥（小乔为后世误传），庐江皖县（今安徽潜山）人。东汉末年国色美女，桥公次女，名将周瑜的夫人。",
				"xjzh_sanguo_caiyan":"字文姬，别字昭姬，陈留郡圉县（今河南杞县）人，东汉时期女性文学家，文学家蔡邕之女。 博学多才，擅长文学、音乐、书法。",
				"xjzh_sanguo_huangzhong":"字汉升（太平御览卷二百三十八引《蜀志》中作“汉叔”），南阳（治今河南南阳）人。汉末三国时期著名将领，曾于定军山斩杀夏侯渊。",
				"xjzh_sanguo_dongzhuo":"字仲颖，陇西临洮（今甘肃省岷县）人。东汉末年少帝、献帝时权臣，凉州军阀。",
				"xjzh_sanguo_machao":"字孟起，司隶部扶风郡茂陵（今陕西杨凌五泉镇）人，东汉卫尉马腾之子，汉末群雄之一，蜀汉开国名将，有锦马超之称。",
				"xjzh_sanguo_huatuo":"华佗东汉末年著名的医学家，钻研医术而不求仕途。他医术全面，尤其擅长外科，精于手术。",
				"xjzh_sanguo_zhongda":"字仲达，汉族，河内郡温县孝敬里（今河南焦作市温县）人。三国时期魏国杰出的政治家、军事家，西晋王朝的奠基人。",
				"xjzh_sanguo_tongyuan":"字雄付，武术名家。童渊是评书三国中的人物，在历史中以及《三国演义》中都没有被提到过。与并州李彦是结拜兄弟，两人均师承义父玉真子，两人并娶了河北颜家的两位大小姐颜云及颜雨。是童飞之父",
				"xjzh_sanguo_pangtong":"字士元，号凤雏，荆州襄阳（今湖北襄阳）人，东汉末年刘备帐下重要谋士，与诸葛亮同拜为军师中郎将。",
				"xjzh_sanguo_zhangfei":"字益德，涿郡（今河北涿州）人，后世所称三国时期蜀汉五虎上将之一。",
				"xjzh_sanguo_guanyu":"字云长，本字长生，河东郡解县（今山西运城）人，东汉末年名将，被后世崇为“武圣”，与“文圣”孔子齐名。",
				"xjzh_sanguo_zhangjiao":"自称“大贤良师”“天公将军”，东汉冀州钜鹿（今河北宁晋[1]）人，中国东汉末年农民起义军“黄巾军”的领袖，太平道的创始人。",
				"xjzh_sanguo_spzhangjiao":"自称“大贤良师”“天公将军”，东汉冀州钜鹿（今河北宁晋[1]）人，中国东汉末年农民起义军“黄巾军”的领袖，太平道的创始人。",
				"xjzh_sanguo_zhangning":"钜鹿（治今河北省邢台市巨鹿县）人。东汉末年大贤良师张角的女儿，太平道圣女",
				"xjzh_sanguo_splvbu":"字奉先，五原郡九原县（今内蒙古包头市九原区麻池镇西北）人，东汉末年著名将领。 吕布以勇武闻名，素有“人中吕布，马中赤兔”一说。",
				"xjzh_sanguo_lvbu":"字奉先，五原郡九原县（今内蒙古包头市九原区麻池镇西北）人，东汉末年著名将领。 吕布以勇武闻名，素有“人中吕布，马中赤兔”一说。",
				"xjzh_sanguo_zhenfu":"三国时期魏文帝曹丕的正室，魏明帝曹叡之母。本为袁熙之妻，曹操攻陷邺城后成为曹丕的妻室。后因被郭女王（文德郭皇后）所谮而被曹丕赐死，死后谥曰文昭皇后。",
				"xjzh_sanguo_sunhao":"吴大帝孙权之孙，孙和之子，三国时期吴国末代皇帝，公元（264年-280年在位）。",
				"xjzh_sanguo_luxun":"三国时期吴国政治家、军事家，一生出将入相，被赞为“社稷之臣”。",
				"xjzh_sanguo_zhoutai":"三国时期吴国武将。孙策平定江东时即成为东吴的将领，曾经多次保护孙权免受敌军的攻击。后来孙权为了表彰周泰为了东吴出生入死的功绩，而赐给他青罗伞盖。",
				"xjzh_sanguo_guojia":"东汉末年曹操帐下谋士，官至军师祭酒，封洧阳亭侯。史书上称他“才策谋略，世之奇士”。",
				"xjzh_sanguo_dianwei":"曹操部下重要将领，相貌魁梧，膂力过人，同许褚共领虎卫军。本属张邈，后归曹操。",
				"xjzh_sanguo_liubei":"汉昭烈帝，字玄德，东汉末年幽州涿郡涿县（今河北省涿州市）人，西汉中山靖王刘胜之后，三国时期蜀汉开国皇帝，史家多称其为先主。",
				"xjzh_sanguo_caocao":"字孟德，小字阿瞒，沛国谯（今安徽亳州）人，东汉末年著名政治家、军事家、文学家和诗人，曹魏政权的缔造者。",
				"xjzh_sanguo_zhangrang":"东汉宦官，颍川（今河南禹州）人，灵帝朝“十常侍”之一。",
				"xjzh_sanguo_bogui":"字伯圭[1]（一作伯珪），辽西令支（今河北迁安）人，东汉末年武将、军阀，汉末群雄之一。",
				"xjzh_sanguo_diaochan":"貂蝉（生卒年不详），历史小说《三国演义》及其衍生作品中的角色，是中国古代四大美女之一。",
				"xjzh_sanguo_espliuxie":"此武将的设计取自虚拟故事，刘协三兴汉室<br>汉献帝刘协（181年4月2日－234年4月21日），字伯和[1][2]，河南洛阳人。东汉末代皇帝（189年—220年在位），汉灵帝刘宏次子，汉少帝刘辩异母弟，母为灵怀皇后王荣。",
				"xjzh_sanguo_guanlu":"字公明，平原郡平原县（今山东省平原县）人。三国时期曹魏术士，古代卜卦观相行业祖师。",
				"xjzh_sanguo_xuzhu":"字仲康，谯郡谯县（今安徽亳州市）人。东汉末年曹操部下猛将。",
				"xjzh_sanguo_xunyou":"字公达，颍川颍阴（今河南许昌）人。荀彧之侄，东汉末年谋士。",
				"xjzh_sanguo_zhangbao":"东汉末年黄巾起义首领之一，张角的弟弟，张梁的哥哥。中平元年（184）随兄张角起义，号称“地公将军”。",
				"xjzh_sanguo_yuanshao":"字本初，汝南汝阳（今河南省商水县）人。东汉末年军阀，汉末群雄之一。",
				"xjzh_sanguo_zhangliao":"字文远，雁门马邑（今山西省朔州市）人。汉末三国时期曹魏名将，聂壹的后人。",
				"xjzh_sanguo_huaxiong":"华[huà]雄（?－191），东汉末年董卓部下的武将，为董卓帐下都督。",
				
			},
			characterTitle:{
				"xjzh_sanguo_wenyang":"万将披靡",
		        "xjzh_sanguo_espsunce":"江东小霸王",
		        "xjzh_sanguo_chunhua":"冷血皇后",
			    "xjzh_sanguo_huaxiong":"恃勇扬威",
			    "xjzh_sanguo_nanhua":"齐物逍遥",
			    "xjzh_sanguo_zuoyou":"玄奇百变",
			    "xjzh_sanguo_espzuoci":"驱神役鬼",
				"xjzh_sanguo_sunquan":"少年贤君",
				"xjzh_sanguo_zhaoyun":"龙威虎胆",
				"xjzh_sanguo_zuoci":"幻化万千",
				"xjzh_sanguo_weiyan":"嗜血独狼",
				"xjzh_sanguo_yueying":"奇巧灵心",
				"xjzh_sanguo_kongming":"卧龙腾宇",
				"xjzh_sanguo_spkongming":"七星归命",
				"xjzh_sanguo_daqiao":"矜持之花",
				"xjzh_sanguo_xiaoqiao":"仙姿玉质",
				"xjzh_sanguo_caiyan":"遗世才女",
				"xjzh_sanguo_huangzhong":"箭无虚发",
				"xjzh_sanguo_dongzhuo":"揽政祸国",
				"xjzh_sanguo_machao":"西凉锦玉",
				"xjzh_sanguo_huatuo":"圣手回春",
				"xjzh_sanguo_zhongda":"鹰视狼顾",
				"xjzh_sanguo_tongyuan":"北地枪王",
				"xjzh_sanguo_pangtong":"凤鸣岐山",
				"xjzh_sanguo_zhangfei":"万夫莫当",
				"xjzh_sanguo_guanyu":"忠义无双",
				"xjzh_sanguo_zhangjiao":"天公将军",
				"xjzh_sanguo_spzhangjiao":"黄天当立",
				"xjzh_sanguo_zhangning":"大贤后人",
				"xjzh_sanguo_splvbu":"神鬼无前",
				"xjzh_sanguo_lvbu":"人中无敌",
				"xjzh_sanguo_zhenfu":"洛水浮波",
				"xjzh_sanguo_sunhao":"啸天亢声",
				"xjzh_sanguo_luxun":"儒生雄才",
				"xjzh_sanguo_zhoutai":"历战之躯",
				"xjzh_sanguo_guojia":"天妒英杰",
				"xjzh_sanguo_dianwei":"古之恶来",
				"xjzh_sanguo_liubei":"龙怒之火",
				"xjzh_sanguo_caocao":"绝世枭雄",
				"xjzh_sanguo_zhangrang":"祸国殃民",
				"xjzh_sanguo_bogui":"白马义从",
				"xjzh_sanguo_diaochan":"美撼凡尘",
				"xjzh_sanguo_espliuxie":"炎汉中兴",
				"xjzh_sanguo_guanlu":"问天通神",
				"xjzh_sanguo_xuzhu":"虎痴",
				"xjzh_sanguo_xunyou":"谋主",
				"xjzh_sanguo_zhangbao":"地公将军",
				"xjzh_sanguo_yuanshao":"贪智寡断",
				"xjzh_sanguo_zhangliao":"雁门刑天",
				"xjzh_sanguo_sphuatuo":"圣手仁心",
				"xjzh_sanguo_yuji":"太平道人",
				"xjzh_sanguo_simahui":"水镜先生",
				
			},
    		characterInitFilter:{
    			"xjzh_sanguo_zhaoyun":function(tag){
    				if(tag=='noZhuSkill') return false;
    			},
    		},
			perfectPair:{},
			characterReplace:{
			    "xjzh_sanguo_zuoci":['xjzh_sanguo_zuoci','xjzh_sanguo_espzuoci'],
				"xjzh_sanguo_huatuo":['xjzh_sanguo_huatuo','xjzh_sanguo_sphuatuo'],
				"xjzh_sanguo_zhangjiao":['xjzh_sanguo_zhangjiao','xjzh_sanguo_spzhangjiao'],
				"xjzh_sanguo_lvbu":['xjzh_sanguo_lvbu','xjzh_sanguo_splvbu'],
				"xjzh_sanguo_kongming":['xjzh_sanguo_kongming','xjzh_sanguo_spkongming'],
			},
			characterFilter:{
                'xjzh_sanguo_yuji':function(mode){
                    if(mode=="identity") return true;
				},
                /*'xjzh_sanguo_espzhangjiao':function(mode){
                    return false;
				},
                'xjzh_sanguo_espzuoci':function(mode){
                    return false;
                },*/
			},
			card:{
			    "xjzh_zengyi_shuangsheng_card":{
                    derivation:"xjzh_sanguo_zuoyou",
                    fullskin:false,
                    image:"ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
                },
		        "xjzh_card_chunfenghuayu":{
                    fullskin:true,
                    audio:"ext:仙家之魂/audio/card/",
                    derivation:"xjzh_sanguo_guanlu",
                    type:"trick",
                    enable:function(event,player){
                        if(get.playerName(player,'xjzh_sanguo_guanlu')) return true;
                        return false;
                    },
                    cardcolor:'red',
                    selectTarget:1,
				    clearLose:true,
                    image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
                    filterTarget:function(card,player,target){
                         return !target.hasSkill('xjzh_card_chunfenghuayu_skill');
                    },
                    content:function(){
                        target.addSkill("xjzh_card_chunfenghuayu_skill");
                    },
				    ai:{
					    basic:{
						    order:10,
						    useful:5,
					    	value:10
				    	},
					    result:{
						    target:function(target,player){
						        if(target.isMin()) return 0;
						        var att=get.attitude(player,target);
						        if(att>=2){
						            if(target.hp==1) return att;
						            if(target.hp==2&&target.countCards('he')<=2) return att*0.7;
						            return 0.5;
						        }
						        return 0;
						    },
				    	},
			    	},
                },
                "xjzh_card_fanyunfuyu":{
                    fullskin:true,
                    audio:"ext:仙家之魂/audio/card/",
                    derivation:"xjzh_sanguo_guanlu",
                    type:"trick",
		    		cardcolor:'black',
			    	notarget:true,
			    	nodelay:true,
                    image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
				    ai:{
				        order:8,
				    	basic:{
					    	useful:[7,5.1,2],
				    		value:[7,5.1,2],
				    	},
				    	tag:{
				    	    damage:1,
				    	},
			    	},
                },
		        "xjzh_card_zhizuijinmi":{
                    fullskin:true,
                    audio:"ext:仙家之魂/audio/card/",
                    derivation:"xjzh_sanguo_guanlu",
                    type:"trick",
                    enable:function(event,player){
                        if(get.playerName(player,'xjzh_sanguo_guanlu')) return true;
                        return false;
                    },
                    cardcolor:'black',
                    selectTarget:1,
                    image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
                    filterTarget:function(card,player,target){
                         return !target.hasSkill('xjzh_card_zhizuijinmi_skill');
                    },
                    content:function(){
                        var suitx=get.suit(card);
                        if(suitx=="none") suitx=lib.suit.randomGet();
                        target.storage.xjzh_card_zhizuijinmi_skill=suitx
                        target.addSkill("xjzh_card_zhizuijinmi_skill");
                    },
				    ai:{
					    basic:{
					        order:10,
					        useful:5,
					        value:10
					    },
					    result:{
						    target:-2,
				    	},
			    	},
                },
                "xjzh_card_tanhuayixian":{
                    fullskin:true,
                    audio:"ext:仙家之魂/audio/card/",
                    derivation:"xjzh_sanguo_guanlu",
                    type:"trick",
                    enable:function(event,player){
                        if(get.playerName(player,'xjzh_sanguo_guanlu')) return true;
                        return false;
                    },
                    selectTarget:1,
                    image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
                    filterTarget:true,
                    content:function(){
                        'step 0'
					    if(!player.isIn()||!target.isIn()){
				    		event.finish();
						    return;
				    	}
					    event.cards=get.cards(5);
				    	game.cardsGotoOrdering(event.cards);
				    	player.showCards(event.cards);
			    		'step 1'
				    	if(player.isIn()&&target.isIn()&&event.cards.length){
					    	for(var i of event.cards){
					    	    if(player.canUse(i,target,false)){
							    	player.useCard(i,target,false);
						    		event.cards.remove(i);
								    event.redo();
							    	break;
							    }
						    }
					    }
				    	'step 2'
			    		if(event.cards.length){
					    	while(event.cards.length) ui.cardPile.insertBefore(event.cards.pop().fix(),ui.cardPile.firstChild);
					    	game.updateRoundNumber();
				    	}
                    },
				    ai:{
				        order:5,
					    basic:{
						    useful:4,
					    	value:3
				    	},
					    result:{
						    player:2,
				    	},
				    	tag:{
				    	    respond:1,
				    	    respondShan:1,
				    	    damage:1,
				    	}
			    	},
                },
                "xjzh_card_shenjimiaosuan":{
                    fullskin:true,
                    audio:"ext:仙家之魂/audio/card/",
                    derivation:"xjzh_sanguo_guanlu",
                    type:"trick",
                    enable:function(event,player){
                        if(get.playerName(player,'xjzh_sanguo_guanlu')) return true;
                        return false;
                    },
				    selectTarget:-1,
				    toself:true,
				    filterTarget:function(card,player,target){
					    return target==player;
				    },
				    modTarget:true,
                    image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
                    content:function(){
                        "step 0"
                        if(ui.cardPile.childNodes.length<10) game.xjzh_washCard();
                        var cards=get.cards(5);
                        game.cardsGotoOrdering(cards);
                        var cards2=get.bottomCards(5);
					    game.cardsGotoOrdering(cards2);
						var next=target.chooseToMove('【神机妙算〗：任意交换牌堆顶或牌堆底的牌');
						next.set('list',[
					    	['牌堆顶',cards],
					    	['牌堆底',cards2],
						]);
						next.set('filterMove',function(from,to,moved){
							if(to==0) return moved[0].length<5;
							if(to==1) return moved[1].length<5;
							return typeof to!='number';
						});
				    	next.processAI=function(list){
					    	var cards=list[0][1],player=_status.event.player;
					    	var top=[];
					    	var judges=player.getCards('j');
					    	var stopped=false;
					    	if(!player.hasWuxie()){
						    	for(var i=0;i<judges.length;i++){
								    var judge=get.judge(judges[i]);
								    cards.sort(function(a,b){
									    return judge(b)-judge(a);
								    });
							    	if(judge(cards[0])<0){
									    stopped=true;break;
								    }
							    	else{
									    top.unshift(cards.shift());
								    }
						    	}
					    	}
					    	var bottom;
					    	if(!stopped){
							    cards.sort(function(a,b){
								    return get.value(b,player)-get.value(a,player);
							    });
							    while(cards.length){
								    //if(get.value(cards[0],player)<=5) break;
								    if(get.type(cards[0],'trick')!='trick') break;
								    top.unshift(cards.shift());
							    }
						    }
						    bottom=cards;
						    return [top,bottom];
					    }
						"step 1"
						if(result.bool){
							var top=result.moved[0];
							var bottom=result.moved[1];
							var tricks=[]
							top.reverse();
							for(var i=0;i<top.length;i++){
							    if(get.type(top[i],'trick')=="trick"){
							        tricks.push(top[i]);
							        top.removeArray(top[i]);
							        continue;
							    }
							    ui.cardPile.insertBefore(top[i],ui.cardPile.firstChild);
							}
					        for(i=0;i<bottom.length;i++){
					        	ui.cardPile.appendChild(bottom[i]);
					        }
							player.gain(tricks,'gain2','log',player);
						}
						game.updateRoundNumber();
						player.$fullscreenpop('神机妙算','fire');
                    },
				    ai:{
					    basic:{
					        order:8,
						    useful:6.5,
					    	value:12
				    	},
					    result:{
						    target:2.5,
				    	},
				    	tag:{
				    	    draw:2,
				    	}
			    	},
                },
			},
			skill:{
			    "xjzh_sanguo_tianxiang":{
			        trigger:{
			            player:"loseAfter",
			        },
			        forced:true,
			        locked:true,
			        priority:1,
			        audio:"ext:仙家之魂/audio/skill:2",
			        filter(event,player){
			            return event.cards.some(card=>{
			                return get.suit(card)=="heart"&&get.position(card)=='d';
			            });
			        },
			        marktext:"天香",
			        intro:{
			            name:"天香",
			            content:"#",
			        },
			        global:"xjzh_sanguo_tianxiang_mod",
			        async content(event,trigger,player){
			            const targets=await player.chooseTarget("〖天香〗：选择一名角色令其获得一个“天香”标记").set('ai',target=>get.attitude(player,target)).forResultTargets();
			            if(targets){
			                targets[0].addMark("xjzh_sanguo_tianxiang",1);
			            };
			        },
			        subSkill:{
    			        "mod":{
    			            sub:true,
    			            charlotte:true,
    			            locked:true,
    			            mod:{
    			                suit(card,suit){
    			                    let player=get.player();
                                    if(player&&player.hasMark("xjzh_sanguo_tianxiang")&&suit=='spade') return 'heart';
                                },
    			            },
			            },
			        },
			    },
			    "xjzh_sanguo_emei":{
			        trigger:{
			            global:["addMark","removeMark"],
			        },
			        forced:true,
			        locked:true,
			        priority:1,
			        group:"xjzh_sanguo_emei_use",
			        filter(event,player){
			            return event.markname=="xjzh_sanguo_tianxiang";
			        },
			        audio:"ext:仙家之魂/audio/skill:2",
			        async content(event,trigger,player){
			            if(trigger.name=="addMark"){
			                let skills=new Array()  
			                game.xjzh_wujiangpai().forEach(name=>{
    			                if(lib.character[name][0]!="female"){
    			                    skills.addArray(lib.character[name][3].filter(skill=>{
    			                        let info=get.info(skill);
    			                        return !info.sub&&!info.unique&&!info.juexingji&&!info.zhuSkill&&!info.dustSkill&&!trigger.player.skills.includes(skill);
    			                    }));
			                    }
			                });
			                trigger.player.addSkillLog(skills.randomGet());
			            }else{
			                let skills=trigger.player.getSkills(null,false,false).filter(skill=>{
			                    let info=get.info(skill);
			                    return !info.sub&&!info.unique&&!lib.skill.global.includes(skill);
			                });
			                if(skills.length){
			                    const control=await trigger.player.chooseControl(skills).set("ai",()=>{
			                        return get.min(skills,get.skillRank,'item');
			                    }).forResultControl();
			                    trigger.player.removeSkillLog(control);
			                }
			            }
			        },
			        subSkill:{
			            "use":{
			                enable:"phaseUse",
			                usable:1,
			                prompt:"〖额眉〗：选择一名角色移去其所有“天香”标记",
			                filterTarget(card,player,target){
			                    return target.hasMark("xjzh_sanguo_tianxiang");
			                },
			                audio:"xjzh_sanguo_emei",
			                filter(event,player){
			                    return game.countPlayer(current=>{
			                        return current.countMark("xjzh_sanguo_tianxiang");
			                    });
			                },
			                async content(event,trigger,player){
			                    let list=["受伤"];
			                    if(event.targets[0].countCards("he")>=event.targets[0].countMark("xjzh_sanguo_tianxiang")) list.push("弃牌");
			                    const {result:{control}}=
			                        list.length==1?
			                            {result:{control:list[0]}}:
			                            await event.targets[0].chooseControl(list).set("ai",()=>{
			                        let player=get.player();
			                        return list.length==2?"弃牌":"受伤";
			                    });
			                    if(control){
			                        switch(control){
			                            case "弃牌":{
			                                event.targets[0].chooseToDiscard(event.targets[0].countMark("xjzh_sanguo_tianxiang"),'he',true);
			                            }
			                            break;
			                            case "受伤":{
			                                event.targets[0].damage(event.targets[0].countMark("xjzh_sanguo_tianxiang"),player,"nocard");
			                            }
			                            break;
			                        }
			                    }
			                    event.targets[0].clearMark("xjzh_sanguo_tianxiang");
			                },
			            },
			            ai:{
			                order:8,
			                result:{
			                    target:-1,
			                },
			            },
			        },
			    },
			    "xjzh_sanguo_guose":{
			        trigger:{
			            global:"phaseZhunbeiBegin",
			        },
			        locked:true,
			        frequent:true,
			        init(player){
			            let cards=Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes)).filter(card=>get.name(card)=="lebu");
			            if(cards.length){
			                game.cardsGotoSpecial(cards);
			                game.log(player,"将",cards,"移出游戏");
			            }
			        },
					audio:"ext:仙家之魂/audio/skill:2",
			        check(){return 1;},
			        prompt(event,player){
			            return `〖国色〗：是否弃置一张♦牌令${get.translation(event.player)}执行一次【乐不思蜀】判定`;
			        },
			        mod:{
			            aiOrder(player,card,num){
			                if(get.suit(card)=="diamond") return num/2+get.value({name:"lebu"});
			                return num;
                        },
			        },
			        filter(event,player){
			            if(!player.countCards('he',{suit:"diamond"})) return false;
			            if(event.player.countCards('j','lebu')) return false;
			            return event.player!=player;
			        },
                    async content(event,trigger,player){
                        const bool=await player.chooseToDiscard('he',{suit:"diamond"},`〖国色〗：请选择弃置一张♦牌令${get.translation(trigger.player)}执行一次【乐不思蜀】判定`).set("ai",(card)=>-get.attitude(player,trigger.player)).forResultBool();
                        if(bool){
                            trigger.player.executeDelayCardEffect('lebu');
                        }
                    },
			    },
			    "xjzh_sanguo_wanrong":{
			        trigger:{
			            global:"judgeAfter",
			        },
			        frequent:true,
					audio:"ext:仙家之魂/audio/skill:2",
			        filter(event,player){
			            if(event.cardname!="lebu") return false;
			            return event.result.suit!="heart";
			        },
			        check(event,player){return 1;},
                    async content(event,trigger,player){
                        player.draw(2);
                        const targets=await player.chooseTarget("〖婉容〗：请选择一名其他角色令其执行一个额外的回合",lib.filter.notMe).set('ai',target=>get.attitude(player,target)).forResultTargets();
                        if(targets){
                            targets[0].insertPhase("xjzh_sanguo_wanrong",true);
                        }
                    },
			    },
			    "xjzh_sanguo_lixiang":{
			        trigger:{
			            player:"dying",
			        },
					limited:true,
					forced:true,
					locked:true,
					unique:true,
					skillAnimation:true,
					animationColor:'water',
					audio:"ext:仙家之魂/audio/skill:2",
					audioname:["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"],
					init:function(player,skill){
					    player.storage[skill]=false;
					},
					filter(event,player){
					    let list=get.playerName(player).filter(name=>{
						    return ["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"].includes(name);
						});
					    if(list.length==0) return false;
					    return !player.storage.xjzh_sanguo_lixiang;
					},
                    async content(event,trigger,player){
                        player.awakenSkill("xjzh_sanguo_lixiang");
						player.storage.xjzh_sanguo_lixiang=true;
						player.clearSkills(true);
						let targets=game.filterPlayer(current=>current!=player).sort(lib.sort.seat);
						for await(let target of targets){
						    target.checkConflict();
		                    target.checkMarks();
						}
						let list=get.playerName(player).filter(name=>{
						    return ["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"].includes(name);
						});
						let names;
						if(get.config('double_character')){
						    if(list.length>=2) names=["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"].randomGet();
						    player.removeFujiang();
						}else{
						    if(get.playerName(player,"xjzh_sanguo_daqiao")) names="xjzh_sanguo_xiaoqiao";
						    else names="xjzh_sanguo_daqiao";
						}
						player.reinit(player.name,names,[player.hp,player.maxHp]);
						player.recover(player.getDamagedHp(true));
                    },
			    },
				"xjzh_sanguo_jueqing":{
					trigger:{
						global:["damageBefore","loseHpBefore"],
					},
					audio:"ext:仙家之魂/audio/skill:2",
					filter(event,player){
						return !event.numFixed&&!event.cancelled;
					},
				    direct:true,
					locked:true,
					unique:true,
                    async content(event,trigger,player){
                        trigger._triggered=null;
						player.logSkill("xjzh_sanguo_jueqing")
                    },
					ai:{
					    jueqing:true,
					},
				},
				"xjzh_sanguo_shangshi":{
					trigger:{
						player:["useCardEnd"],
					},
					locked:true,
					unique:true,
					frequent:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter(event,player){return player.isDamaged()},
					async content(event,trigger,player){
					    const evt=await player.draw();
					    const card=evt.result[0];
					    const history=player.getAllHistory('useCard');
					    if(!history.length) return;
					    let card2=history[history.length-1].card;
					    if(get.color(card)!=get.color(card2)&&game.countPlayer(current=>{
							return current!=player&&current.countCards("hej");
						})>0){
					    	const {result:{bool,targets}}=await player.chooseTarget("〖伤逝〗：请选择并弃置一名角色的牌",(card,player,target)=>{
								if(!target.countCards("hej")) return false;
								return target!=player;
							}).set('ai',target=>lib.card.guohe.ai.result.target);
        					if(!bool) return;
        					const target=targets[0];
        					player.discardPlayerCard("hej",target,true).set('target',target).set('ai',button=>lib.card.guohe.ai.button);				
					    }
					},
					ai:{
						maixie:function(player){
							if(player.isDamaged()) return false;
							return true;
						},
						maixie_hp:function(player){
							if(player.isDamaged()) return false;
							return true;
						},
					},
				},
				"xjzh_sanguo_huishi":{
					trigger:{
						global:"gameStart",
						player:"enterGame",
					},
					forced:true,
					locked:true,
					charlotte:true,
					unique:true,
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						for(var j=0;j<game.players.length;j++){
							game.players[j].addSkill("xjzh_sanguo_huishi2");
						}
					},
					ai:{
						expose:0.8,
						threaten:4,
					},
				},
				"xjzh_sanguo_huishi2":{
					trigger:{
						global:"dieEnd",
					},
					charlotte:true,
					sub:true,
					direct:true,
					audio:"xjzh_sanguo_huishi",
					filter(event,player){
						return get.playerName(event.player,"xjzh_sanguo_chunhua");
					},
					init(player,skill){
						player.addSkillBlocker(skill);
					},
					content(){
					    player.logSkill("xjzh_sanguo_huishi");
						player.removeSkill("xjzh_sanguo_huishi2");
					},
					onremove(player,skill){
						player.removeSkillBlocker(skill);
					},
					skillBlocker(skill,player){
						var info=lib.skill[skill]
						if(info&&(info.juexingji||info.limited||info.zhuSkill||info.dutySkill||info.jy_bangpai||info.zhuanshuSkill)){
						    if(info.xjzh_xinghunSkill) return false;
						    return true
						}
						return false;
					},
				},
			    "xjzh_sanguo_pijian":{
			        trigger:{
			            player:"phaseZhunbeiBegin",
			        },
			        init(player){
			            player.expandEquip(1);
			        },
			        audio:"ext:仙家之魂/audio/skill:2",
			        check(event,player){return 1;},
			        async content(event,trigger,player){
			            const list=game.xjzh_wujiangpai().filter(function(name){
			                return lib.character[name][3].some(function(skill){
			                    var info=get.info(skill);
			                    if(info&&info.shaRelated&&!player.skills.includes(skill)) return true;
			                });
			            });
			            let skills=[];
			            do{
			                const target=await list.shift();
			                for(let skill of lib.character[target][3]){
			                    let info=get.info(skill);
			                    if(info&&info.shaRelated&&!player.skills.includes(skill))  await skills.push(skill); 
			                }
			            }while(list.length);
			            if(!skills.length) return;
			            const bool=await player.xjzh_chooseSkill(skills.randomGets(3)).set('callback',function(result,player,target){
                            event.skill=result.links[0];
                        }).set("ai",()=>Math.random()).forResultBool()
			            if(bool&&event.skill){
    						let name=[event.skill];
    						game.addVideo('skill',player,['xjzh_sanguo_pijian',name])
    						game.broadcastAll(function(list){
    							lib.skill.xjzh_sanguo_pijian.createCard(name);
    						},list);
    						let cards=name.map(name=>{
    							var card=game.createCard('xjzh_sanguo_pijian_'+name,'none');
    							return card;
    						});
    						player.$gain2(cards);
    						game.delayx();
    						if(cards) player.equip(cards[0]);
    					}
    				},
    				video(player,name){
    					lib.skill.xjzh_sanguo_pijian.createCard(name);
    				},
    				createCard(names){
    				    let name=names[0],characters;
    				    for(let i in lib.character){
    				        if(!lib.character[i][3]||!lib.character[i][3].length) continue;
    				        if(lib.character[i][3].indexOf(name)!=-1){
    				            characters=i;
    				            break;
    				        }
    				    }
    					if(!lib.card['xjzh_sanguo_pijian_'+name]){
    					    lib.translate['xjzh_sanguo_pijian_'+name]=lib.translate[name];
    						let info=lib.skill[name];
    						let str=lib.translate[name+"_info"]
    						let card={
    							fullimage:true,
    							image:'character:'+characters,
    							type:'equip',
    							subtype:'equip1',
    							enable:true,
    							selectTarget:-1,
    							filterCard(card,player,target){
    								if(player!=target) return false;
    								return target.canEquip(card,true);
    							},
    							onLose(){
    							    let player=_status.event.player;
    							    player.drawTo(player.maxHp);
    							    player.lose(card,ui.special).set('getlx',false);
    							},
    							modTarget:true,
    							allowMultiple:false,
    							toself:true,
    							ai:{},
    							skills:[],
    						}
    						card.distance={attackFrom:-1};
    						card.skills.add(name);
    						str+='<li>此牌离开你的装备区后，你将手牌补至体力上限。';
    						lib.translate['xjzh_sanguo_pijian_'+name+'_info']=str;
    						lib.card['xjzh_sanguo_pijian_'+name]=card;
    					}
					},
			    },
			    "xjzh_sanguo_zhirui":{
			        trigger:{
			            player:"useCardAfter",
			        },
			        forced:true,
			        locked:true,
			        priority:1,
			        audio:"ext:仙家之魂/audio/skill:2",
			        filter(event,player){
			            if(!player.isPhaseUsing()) return false;
			            if(get.tag(event.card,'damage')) return false;
			            return player.getEquips(1).some(card=>card.name.indexOf("xjzh_sanguo_pijian")==0);
			        },
			        async content(event,trigger,player){
			            let history=player.getHistory('gain',evt=>{
			                return evt&&evt.getParent().name=="xjzh_sanguo_zhirui";
			            });
			            if(!history.length){
			                var card=get.cardPile(cardx=>{
			                    return get.tag(cardx,'damage');
			                });
			            }else{
			                var card=get.cardPile(cardx=>{
			                    return get.tag(cardx,'damage')&&cardx.name!=history[history.length-1].cards[0].name;
			                });
			            }
			            if(card) player.gain(card,player,'gain2','log');
			            else player.say("没有符合条件的卡牌");
			        },
			    },
			    "xjzh_sanguo_yongjue":{
			        enable:"phaseUse",
			        usable:1,
			        audio:"ext:仙家之魂/audio/skill:2",
			        filter(event,player){
			            let history=player.getHistory('useCard',function(evt){
			                return evt&&evt.card&&get.tag(evt.card,"damage");
			            });
			            if(!history.length) return false;
			            return player.getEquips(1).length>0;
			        },
			        async content(event,trigger,player){
			            player.discard(player.getEquips(1));
			            let history=player.getHistory('useCard',function(evt){
			                return evt&&evt.card&&get.tag(evt.card,"damage");
			            });
			            let list=history.slice(0);
			            while(list.length){
			                let object=list.shift();
			                let card=object.card;
			                let targets=object.targets.filter(current=>current.isAlive()&&player.canUse(card,current));
			                if(targets.length==0) continue;
			                targets.removeArray(targets.filter(current=>current.isDead()));
			                const bool=await player.chooseBool(`〖勇决〗：是否失去一点体力对${get.translation(targets)}使用一张${get.translation(card)}`).set('ai',()=>{
			                    return get.player().getHp(true)>1;
			                }).forResultBool();
			                if(bool){
			                    player.useCard(card,targets,false).set('addCount',false);
			                    player.loseHp();
			                }
			            }
			        },
			        ai:{
			            order(){
							let player=_status.event.player;
							let history=player.getHistory('useCard',function(evt){
			                    return evt&&evt.card&&get.tag(evt.card,"damage");
			                });
			                if(!history.length) return 0;
			                if(history.length>player.hp) return 0.1;
			                return 1;
						},
						result:{
						    player(player,target){
						        let history=player.getHistory('useCard',function(evt){
			                        return evt&&evt.card&&get.tag(evt.card,"damage");
			                    });
			                    if(!history.length) return 0;
			                    if(history.length>player.hp) return 0.1;
			                    return 1;
						    },
						},
			        },
			    },
				"xjzh_sanguo_daoshu":{
					trigger:{
						global:"gameStart",
						player:["enterGame","damageAfter","phaseZhunbeiBegin"],
					},
					forced:true,
					locked:true,
					priority:-100,
					group:"xjzh_sanguo_daoshu_add",
					audio:"ext:仙家之魂/audio/skill:1",
			        async content(event,trigger,player){
						if(!player.storage.xjzh_sanguo_daoshu2) player.storage.xjzh_sanguo_daoshu2=0
						player.storage.xjzh_sanguo_daoshu2++
						if(!player.storage.xjzh_sanguo_daoshu) player.storage.xjzh_sanguo_daoshu=[];
						let list=game.xjzh_wujiangpai().filter(name=>{
						    if(lib.character[name][3].some(skill=>{
						        return player.skills.includes(skill);
						    })) return false;
						    return lib.character[name][1]=='qun';
						}).randomGets(3);
						if(!list.length) return;
						let [bool,links]=await player.chooseButton(true).set('ai',button=>{
							return get.rank(button.link,true);
						}).set('createDialog',['请选择一张武将牌',[list,'character']]).forResult('bool','links');
						if(bool){
							let link=links[0];
							let skills=lib.character[link][3]
							for(let i=0;i<skills.length;i++){
								var info=get.info(skills[i]);
								if(info&&(info.limited||info.juexingji||info.dustSkill||info.unique||info.zhuSkill)) continue;
								player.addTempSkill(skills[i],{player:"phaseJieshuBegin"});
								player.storage.xjzh_sanguo_daoshu.push(skills[i]);
							}
						}
					},
					subSkill:{
						'add':{
							trigger:{
								player:"phaseJieshuBegin",
							},
							forced:true,
							priority:38,
							sub:true,
							audio:"xjzh_sanguo_daoshu",
							filter(event,player){
								return player.storage.xjzh_sanguo_daoshu.length;
							},
							content(){
								"step 0"
								var characters=[];
								event.num=player.storage.xjzh_sanguo_daoshu.length
								event.num2=player.storage.xjzh_sanguo_daoshu2
								if(event.num<event.num2){
								    event.num2=event.num
								}
								var skillx=player.storage.xjzh_sanguo_daoshu;
								var skills=[];
								for(var c in lib.character){
									var info=lib.character[c];
									if(info[3].some(s=>skillx.includes(s))){
										characters.push(c);
										skills.push(...skillx.filter(s=>info[3].includes(s)));
										skillx.remove(info[3]);
										if(!skillx.length) break;
									}
								}
								var list=characters;
								if(player.isUnderControl()){
									game.swapPlayerAuto(player);
								}
								var switchToAuto=function(){
									_status.imchoosing=false;
									event._result={
										bool:true,
										skills:skills.randomGets(),
									};
									if(event.dialog) event.dialog.close();
									if(event.control) event.control.close();
								};
								var chooseButton=function(list,skills){
									var event=_status.event;
									if(!event._result) event._result={};
									event._result.skills=[];
									var rSkill=event._result.skills;
									var dialog=ui.create.dialog('请选择获得的技能',[list,'character'],'hidden');
									event.dialog=dialog;
									var table=document.createElement('div');
									table.classList.add('add-setting');
									table.style.margin='0';
									table.style.width='100%';
									table.style.position='relative';
									for(var i=0;i<skills.length;i++){
										var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
										td.link=skills[i];
										table.appendChild(td);
										td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
										td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
											if(_status.dragged) return;
											if(_status.justdragged) return;
											_status.tempNoButton=true;
											setTimeout(function(){
												_status.tempNoButton=false;
											},
											500);
											var link=this.link;
											if(!this.classList.contains('bluebg')){
												if(rSkill.length>=event.num2) return;
												rSkill.add(link);
												this.classList.add('bluebg');
											}
											else{
												this.classList.remove('bluebg');
												rSkill.remove(link);
											}
										});
									}
									dialog.content.appendChild(table);
									dialog.add('　　');
									dialog.open();
									event.switchToAuto=function(){
										event.dialog.close();
										event.control.close();
										game.resume();
										_status.imchoosing=false;
									};
									event.control=ui.create.control('ok',function(link){
										if(rSkill.length!==event.num2) return;
										event.dialog.close();
										event.control.close();
										game.resume();
										_status.imchoosing=false;
									});
									for(var i=0;i<event.dialog.buttons.length;i++){
										event.dialog.buttons[i].classList.add('selectable');
									}
									game.pause();
									game.countChoose();
								};
								if(event.isMine()){
									chooseButton(list,skills);
								}
								else if(event.isOnline()){
									event.player.send(chooseButton,list,skills);
									event.player.wait();
									game.pause();
								}
								else{
									switchToAuto();
								}
								"step 1"
								var map=event.result||result;
								if(map&&map.skills&&map.skills.length){
									for(var s of map.skills){
										player.addSkillLog(s);
									}
									delete player.storage.xjzh_sanguo_daoshu
									player.checkConflict();
									player.checkMarks();
								}
							},
							ai:{
								combo:'xjzh_sanguo_daoshu',
							},
						},
					},
				},
				"xjzh_sanguo_huanhua":{
					trigger:{
						player:["damageBegin","loseHpBegin","loseMaxHpBegin"],
					},
					forced:true,
					locked:true,
					priority:100,
					firstDo:true,
					audio:"ext:仙家之魂/audio/skill:1",
					group:["xjzh_sanguo_huanhua_remove"],
					content(){
						if(trigger.name=="loseMaxHp"){
							trigger.cancel();
						}else{
							if(trigger.num>1) trigger.num=1;
						}
					},
					ai:{
						filterDamage:true,
						filterLoseHp:true,
						skillTagFilter(player,tag,arg){
							if(tag=='filterLoseHp'){
								if(player==arg){
									if(_status.event.num>1) return true;
								}
							};
							return false;
						},
					},
					subSkill:{
						remove:{
							audio:"xjzh_sanguo_huanhua",
							trigger:{
								player:["turnOverBefore","linkBefore"],
							},
							forced:true,
							sub:true,
							init(player){
							    if(player.isTurnedOver()) player.turnOver(false);
							},
							content(){
								trigger.cancel();
							},
						},
						ai:{
							noturn:true,
							nolink:true,
							effect:{
						    	target(card,player,target){
							    	if(get.name(card)=="tiesuo") return [0,0];
						    	}
					    	},
						},
					},
				},
				"xjzh_sanguo_juejing":{
					trigger:{
						player:['loseAfter','changeHp'],
						global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
					},
					forced:true,
					locked:true,
					popup:false,
					unique:true,
					charlotte:true,
					nogainsSkill:true,
					superCharlotte:true,
					xjzh_xinghunSkill:true,
					filter(event,player){
					    if(["changeHp","loseMaxHp","gainMaxHp"].includes(event.name)) return true;
						if(event.name=='gain'&&event.player==player) return player.countCards('h')>4;
						var evt=event.getl(player);
						if(!evt||!evt.hs||evt.hs.length==0||player.countCards('h')>=4) return false;
						var evt=event;
						for(let i=0;i<4;i++){
							evt=evt.getParent('xjzh_sanguo_juejing');
							if(evt.name!='xjzh_sanguo_juejing') return true;
						}
						return false;
					},
					audio:"ext:仙家之魂/audio/skill:1",
					async content(event,trigger,player){
					    if(["changeHp","loseMaxHp","gainMaxHp"].includes(trigger.name)){
					        switch(trigger.name){
					            case "changeHp":{
					                player.link(false);
							        player.turnOver(false);
					            };
					            break;
					            default:{
					                player.maxHp=2;
					                player.update();
					            };
					        };
					    }else{
    						var num=4-player.countCards('h');
    						if(num>0) player.draw(num);
    						else player.chooseToDiscard('h',true,-num);
						}
    					player.logSkill("xjzh_sanguo_juejing");
					},
					ai:{
						noh:true,
						nogain:true,
					},
				},
				"xjzh_sanguo_longhun":{
					forced:true,
					locked:true,
					group:['xjzh_sanguo_longhun1','xjzh_sanguo_longhun2','xjzh_sanguo_longhun3','xjzh_sanguo_longhun4'],
					ai:{
						fireAttack:true,
						skillTagFilter(player,tag){
							switch(tag){
								case 'respondSha':{
									if(player.countCards('he',{suit:'diamond'})<1) return false;
									break;
								}
								case 'respondShan':{
									if(player.countCards('he',{suit:'club'})<1) return false;
									break;
								}
								case 'save':{
									if(player.countCards('he',{suit:'heart'})<1) return false;
									break;
								}
								default:return true;
								break;
							}
						},
						respondSha:true,
						respondShan:true,
						effect:{
							target(card,player,target){
								if(get.tag(card,'recover')&&target.hp>=2) return [0,0];
								if(!target.hasFriend()) return;
								if((get.tag(card,'damage')==1||get.tag(card,'loseHp'))&&target.hp>1) return 1;
							}
						},
						threaten(player,target){
							if(target.hp==1) return 2;
							return 0.5;
						},
					}
				},
				"xjzh_sanguo_longhun1":{
					audio:"ext:仙家之魂/audio/skill:1",
					enable:['chooseToUse','chooseToRespond'],
					prompt(){
						return '将一张♥牌当作桃使用';
					},
					position:'hes',
					sub:true,
					check(card,event){
						return 10-get.value(card);
					},
					selectCard:1,
					viewAs:{name:'tao'},
					viewAsFilter(player){
						return player.countCards('he',{suit:'heart'})>=1;
					},
					filterCard:function(card){
						return get.suit(card)=='heart';
					}
				},
				"xjzh_sanguo_longhun2":{
					audio:"ext:仙家之魂/audio/skill:1",
					enable:['chooseToUse','chooseToRespond'],
					prompt(){
						return '将一张♦牌当作【火杀】使用或打出';
					},
					position:'hes',
					sub:true,
					check(card,event){
						return 10-get.value(card);
					},
					selectCard:1,
					viewAs:{name:'sha',nature:'fire'},
					viewAsFilter(player){
						return player.countCards('he',{suit:'diamond'})>=1;
					},
					filterCard(card){
						return get.suit(card)=='diamond';
					}
				},
				"xjzh_sanguo_longhun3":{
					audio:"ext:仙家之魂/audio/skill:1",
					enable:['chooseToUse','chooseToRespond'],
					prompt(){
						return '将一张♠牌当作无懈可击使用';
					},
					position:'hes',
					sub:true,
					check(card,event){
						return 7-get.value(card);
					},
					selectCard:1,
					viewAs:{name:'wuxie'},
					viewAsFilter(player){
						return player.countCards('he',{suit:'spade'})>=1;
					},
					filterCard(card){
						return get.suit(card)=='spade';
					}
				},
				"xjzh_sanguo_longhun4":{
					audio:"ext:仙家之魂/audio/skill:1",
					enable:['chooseToUse','chooseToRespond'],
					prompt(){
						return '将♣牌当作闪使用或打出';
					},
					position:'hes',
					sub:true,
					check(card,event){
						return 10-get.value(card);
					},
					selectCard:1,
					viewAs:{name:'shan'},
					viewAsFilter(player){
						return player.countCards('he',{suit:'club'})>=1;
					},
					filterCard(card){
						return get.suit(card)=='club';
					}
				},
				"xjzh_sanguo_peijian":{
					mod:{
					    attackRange(player,range,distance){
                            return Infinity;
                        },
                    },
					trigger:{
						player:"shaBefore",
					},
					forced:true,
					locked:true,
					popup:false,
					content(){
						player.addTempSkill('unequip','shaAfter');
					},
					ai:{
					    unequip:true,
					},
				},
				"xjzh_sanguo_kuanggu":{
					forced:true,
					locked:true,
					group:["xjzh_sanguo_kuanggu_1","xjzh_sanguo_kuanggu_2","xjzh_sanguo_kuanggu_3","xjzh_sanguo_kuanggu_4"],
					subSkill:{
						"1":{
							trigger:{
								player:["loseMaxHpEnd","gainMaxHpEnd"],
							},
							forced:true,
							popup:false,
							sub:true,
							priority:-1,
							filter:function (event,player){
								return player.maxHp>1;
							},
							content:function (){
								player.hp=player.maxHp
								player.update()
							},
						},
						"2":{
							trigger:{
								player:["damageBegin","loseHpBegin"],
							},
							forced:true,
							sub:true,
							filter:function (event,player){
								return player.maxHp>1;
							},
							content:function (){
								trigger.cancel();
								player.loseMaxHp(trigger.num);
							},
						},
						"3":{
							trigger:{
								player:"phaseEnd",
							},
							forced:true,
							sub:true,
							filter:function (event,player){
								return player.getStat('damage')>0&&player.maxHp<8;
							},
							content:function (){
								var num=(Math.min(8-player.maxHp,player.getStat('damage')));
								player.gainMaxHp(num);
							},
						},
						"4":{
							trigger:{
								player:"phaseJudgeBefore",
							},
							forced:true,
							sub:true,
							content:function (){
								if(player.hasJudge('lebu')){
									trigger.cancel();
									player.discard(player.getCards("j"),{
										name:"lebu"
									});
									player.skip('phaseUse');
								}
								else if(player.hasJudge('bingliang')){
									trigger.cancel();
									player.discard(player.getCards("j"),{
										name:"bingliang"
									});
									player.skip('phaseDrawBefore');
								}
							},
						},
					},
				},
				//《剧情三英·神魏延·狂袭》
				"xjzh_sanguo_kuangxi":{
					frequent:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:"useCard",
					},
					filter:function (event,player){
						if(_status.currentPhase!=player) return false;
						if(!event.targets||!event.card) return false;
						if(event.card.name=='wuxie') return false;
						if(event.targets.length<=1&&event.targets.includes(player)) return false;
						var type=get.type(event.card);
						if(type!='trick') return false;
						return true;
					},
					check:function (event,player){
						var att=0;
						for(var i=0;i<event.targets.length;i++){
							if(event.targets[i]!=player){
								att+=get.effect(event.targets[i],{name:'sha'},player,player);
							}
						}
						return att>1;
					},
					unique:true,
					content:function (){
						"step 0"
						trigger.untrigger();
						trigger.finish();
						"step 1"
						var list=[];
						for(var i=0;i<trigger.targets.length;i++){
							if(trigger.targets[i]!=player){
								list.push(trigger.targets[i]);
							}
						}
						player.addTempSkill('unequip','shaAfter');
						player.useCard({name:'sha'},list,false);
						"step 2"
						if(player.getStat('damage')&&player.maxHp<8){
							player.gainMaxHp();
						}
						player.draw();
					},
				},
				"xjzh_sanguo_aogu":{
					locked:true,
					unique:true,
					group:["xjzh_sanguo_aogu_1","xjzh_sanguo_aogu_2"],
					derivation:["wusheng","new_repaoxiao"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:2",
							enable:"phaseUse",
							usable:1,
							sub:true,
							filter:function (event,player){
								return player.maxHp>=6;
							},
							content:function (){
								player.loseMaxHp(player.maxHp-2);
								player.draw(3);
								player.addTempSkill('new_repaoxiao');
								player.addTempSkill('wusheng');
							},
							ai:{
								order:10,
								result:{
									player:function(player){
										var nh=player.num('h');
										if(nh==0) return 0;
										if(nh>=player.maxHp&&player.maxHp>=8) return 3;
										if(nh>=player.hp&&player.maxHp>=8) return 0.3;
										if(nh<=3&&player.maxHp>=8) return 0.1;
										return 0.5;
									},
								}
							},
						},
						"2":{
							trigger:{
								player:"phaseDrawBefore",
							},
							forced:true,
							sub:true,
							filter:function (event,player){
								return player.maxHp>=8;
							},
							content:function (){
								"step 0"
								player.loseMaxHp(player.maxHp-4);
								player.draw(player.maxHp-4);
								"step 1"
								player.phaseUse();
							},
						},
					},
					mod:{
						maxHandcard:function (player,num){
							return 5;
						},
					},
				},
				"xjzh_sanguo_qicai":{
					mod:{
						cardname:function(card,player,name){
							if(card.name=='guohe') return 'shunshou';
						},
						targetInRange:function(card,player,target,now){
							var type=get.type(card,'trick');
							if(type=='trick') return true;
						},
						ignoredHandcard:function(card,player){
						    if(card.hasGaintag('xjzh_sanguo_qicai')) return true;
						},
					},
					trigger:{
					    player:"useCard",
					},
					forced:true,
					locked:true,
					priority:8,
					filter(event,player){
					    return get.type(event.card,'trick')=='trick';
					},
					audio:"ext:仙家之魂/audio/skill:2",
					async content(event,trigger,player){
					    let players=game.filterPlayer(current=>current!=player);
					    trigger.directHit.addArray(players);
    					const evt=await player.draw();
    					const cards=evt.result;
    					await player.addGaintag(cards,"xjzh_sanguo_qicai");
					},
				},
				"xjzh_sanguo_jiqiao":{
				    trigger:{
						global:["judgeBegin","recoverAfter"],
					},
					direct:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					async content(event,trigger,player){
                        //var draws=new Function(`player`,`player.draw(2);player.logSkill('xjzh_sanguo_jiqiao');`);
					    const {result:{bool,targets}}=trigger.player==player?{result:{bool:true,targets:[player]}}:await player.chooseTarget(get.prompt('xjzh_sanguo_jiqiao'),function(card,player,target){
					        var event=_status.event;
							return target==event.player||target==event.target;
						}).set('target',trigger.player).set('ai',function(target){
							var player=_status.event.player;
							if(player==target) return 1;
							return get.attitude(player,target)-1.5;
						});
						if(bool){
						    let target=targets[0];
							if(target==player){
								target.draw();
							}else{
								target.draw(2);
							}
							player.logSkill('xjzh_sanguo_jiqiao')
						}
					},
					ai:{
						expose:0.1,
					},
				},
				"xjzh_sanguo_jianqing":{
					trigger:{
						player:"dieBegin",
					},
					audio:"ext:仙家之魂/audio/skill:2",
					limited:true,
					forced:true,
					locked:true,
					skillAnimation:true,
					animationColor:'water',
					init:function(player,skill){
					    player.storage[skill]=false;
					},
					filter(event,player){
					    return !player.storage.xjzh_sanguo_jianqing;
					},
					async content(event,trigger,player){
					    player.awakenSkill("xjzh_sanguo_jianqing");
						player.storage.xjzh_sanguo_jianqing=true;
						const {result:{bool,targets}}=await player.chooseTarget("〖鉴情〗：选择一名其他角色令其获得你的所有技能",lib.filter.notMe).set('ai',function(target){
							return get.attitude(player,target)>0;
						});
						if(bool){
							let target=targets[0];
							let skills=player.getStockSkills();
							for(let i=0;i<skills.length;i++){
								if(skills[i]=="xjzh_sanguo_jianqing") continue;
								target.addSkill(skills[i]);
							}
							target.draw(target.maxHp);
						}
					},
				},
				"xjzh_sanguo_duice":{
					forced:true,
					locked:true,
					mod:{
						selectTarget:function(card,player,range){
							var type=get.type(card);
							if(range[1]==-1) return;
							if(game.players.length<3) return;
							if(type=='trick') range[1]++;
						},
					},
					group:["xjzh_sanguo_duice_1","xjzh_sanguo_duice_2"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:1",
							forced:true,
							sub:true,
							trigger:{
								player:"phaseBegin",
							},
							content:function (){
								'step 0'
								player.judge(function(card){
									if(get.color(card)=='red') return 1;
									return -1
								});
								'step 1'
								if(result.bool){
									if(player.isDamaged()){
										player.recover();
									}
									else{
										player.draw(2);
									}
								}
							},
						},
						"2":{
							audio:"ext:仙家之魂/audio/skill:2",
							trigger:{
								target:"useCardToTargeted",
							},
							sub:true,
							forced:true,
							popup:false,
							filter:function (event,player){
								var info=get.info(event.card);
								if(info.allowMultiple==false) return false;
								if(info.multitarget) return false;
								if(game.players.length<=2) return false;
								if(['juedou','huogong','shunshou','guohe'].includes(event.card.name)) return true;
								return false;
							},
							content:function (){
								'step 0'
								player.chooseTarget('额外指定一名'+get.translation(trigger.card)+'的目标？',function(card,player,target){
									var trigger=_status.event.getTrigger();
									if(trigger.targets.includes(target)) return false;
									return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
								}).set('ai',function(target){
									var trigger=_status.event.getTrigger();
									var player=_status.event.player;
									return get.effect(target,trigger.card,player,player);
								});
								'step 1'
								if(result.bool){
									player.logSkill('xjzh_sanguo_duice_2',result.targets);
									trigger.targets.add(result.targets[0]);
									event.finish();
								}
							},
							ai:{
								effect:{
									target:function(card,player,target,current){
										if(game.players.length<3) return;
										if (card.name=='juedou'||card.name=='guohe'||card.name=='shunshou'||card.name=='huogong') return 0.5;
									},
								},
							},
						},
					},
				},
				"xjzh_sanguo_zhiji":{
					group:["xjzh_sanguo_zhiji2"],
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						global:"useCardToBefore",
					},
					direct:true,
					locked:true,
					usable:1,
					priority:99,
					mod:{
						targetEnabled:function(card,player,target,now){
							if(['nanman'].includes(card.name)) return false;
						},
					},
					filter:function (event,player){
						if(['nanman','huogong','wanjian'].includes(event.card.name)&&event.card.isCard) return true;
						if(event.player==player) return false;
						if(!event.isFirstTarget) return false;
						return false;
					},
					content:function (){
					    player.logSkill("xjzh_sanguo_zhiji",trigger.player);
                        var card=get.cardPile(function(card){
							return card.name==trigger.card.name;
						});
					    if(card) player.gain(card,'gain2');
					},
					ai:{
					    expose:0.5,
					    effect:{
					        target:function(card,player,target){
					            if(['nanman','huogong','wanjian'].includes(card.name)&&card.isCard) return [1,1];
					        },
					    },
					},
				},
				"xjzh_sanguo_zhiji2":{
					audio:"ext:仙家之魂/audio/skill:1",
					enable:"chooseToUse",
					position:"hes",
					sub:true,
					filterCard:true,
					viewAsFilter:function (player){
						return player.countCards('he')>0;
					},
					viewAs:{
						name:"wuxie",
					},
					prompt:"将一张牌当无懈可击使用",
					check:function (card){return 8-get.value(card);},
					threaten:1.2,
				},
				"xjzh_sanguo_bazhen":{
					forced:true,
					locked:true,
					group:["xjzh_sanguo_bazhen_1","xjzh_sanguo_bazhen_2"],
					subSkill:{
						"1":{
							audio:"xjzh_sanguo_bazhen",
							equipSkill:true,
							noHidden:true,
							sub:true,
							inherit:'bagua_skill',
							filter:function(event,player){
								if(!lib.skill.bagua_skill.filter(event,player)) return false;
								if(!player.isEmpty(2)) return false;
								return true;
							},
							ai:{
								respondShan:true,
								effect:{
									target:function(card,player,target){
										if(player==target&&get.subtype(card)=='equip2'){
											if(get.equipValue(card)<=7.5) return 0;
										}
										if(!target.isEmpty(2)) return;
										return lib.skill.bagua_skill.ai.effect.target.apply(this,arguments);
									}
								}
							}
						},
						"2":{
							audio:"xjzh_sanguo_bazhen",
							trigger:{
								player:"damageBegin",
							},
							forced:true,
							priority:5,
							sub:true,
							filter:function (event){
								return event.num>1&&game.hasNature(event,'fire');
							},
							content:function (){
								trigger.num=1;
							},
							ai:{
								filterDamage:function(event,player){
									if(get.tag(card,'firedamage')>=2) return 0.5;
									return 0.8;
								}
							},
						},
					},
				},
				"xjzh_sanguo_caiqing":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:"phaseUseBegin",
					},
					filter(event,player){
						return player.countCards("h")>0;
					},
					prompt:"是否发动〖才情〗选择一种花色摸等量牌？",
					xjzh_xinghunSkill:true,
					async content(event,trigger,player){
					    let list=[];
					    for(let i=0;i<player.countCards("h");i++){
							if(list.includes(get.suit(player.getCards('h')[i]))) continue;
							list.push(get.suit(player.getCards('h')[i]));
							game.print(list);
						}
						let cards=player.getCards('h');
						let suits=[]
						let dialog=ui.create.dialog('forcebutton','hidden','〖才情〗：请选择一种花色');
						for(let i of cards){
							suits.add(get.suit(i))
						}
						for(let x=0;x<suits.length;x++){
                            let str='<div class="popup text" style="width:calc(100%-10px);display:inline-block">';
							if(suits[x]=="heart") str+=''+get.translation(player.countCards("h",{suit:"heart"}))+'张红桃牌：'+get.translation(player.getCards("h",{suit:"heart"}));
							if(suits[x]=="diamond") str+=''+get.translation(player.countCards("h",{suit:"diamond"}))+'张方块牌：'+get.translation(player.getCards("h",{suit:"diamond"}));
							if(suits[x]=="spade") str+=''+get.translation(player.countCards("h",{suit:"spade"}))+'张黑桃牌：'+get.translation(player.getCards("h",{suit:"spade"}));
							if(suits[x]=="club") str+=''+get.translation(player.countCards("h",{suit:"club"}))+'张梅花牌：'+get.translation(player.getCards("h",{suit:"club"}));
							str+='</div><br><br>';
							dialog.add(str);
						}
						const [bool,control]=await player.chooseControl(list).set('ai',function(){
							return Math.random()<0.5?1:0;
						}).set('dialog',dialog).forResult('bool','control');
						player.draw(player.countCards("h",{suit:control}));
					},
				},
				"xjzh_sanguo_zhishu":{
					trigger:{
						global:"phaseUseBegin",
					},
					check(event,player){
					    return 1;
					},
					audio:"ext:仙家之魂/audio/skill:2",
					frequent:true,
					priority:3,
					filter(event,player){
						return event.player!=player&&event.player.countCards('hej');
					},
					async content(event,trigger,player){
						const [bool,links]=await player.gainPlayerCard(`〖知书〗：请选择${get.translation(trigger.player)}至多2张牌`,trigger.player,[1,2],'visible','hej').set('ai',lib.card.shunshou.ai.button).forResult('bool','links');
						if(bool){
						    player.draw();
						    const [bool,cards]=await player.chooseCard(links.length,'交给'+get.translation(trigger.player)+get.cnNumber(links.length)+'张牌','h',true).set('ai',(card)=>{
							    if(get.attitude(trigger.player,player)<0){
								    return -get.value(card);
							    }else{
								    return get.value(card);
							    }
						    }).forResult('bool','cards');
						    if(bool){
						        player.addExpose(0.5);
							    trigger.player.gain(cards,"giveAuto",player);
						    }
						}
					},
					ai:{
						expose:0.4,
					},
				},
				"xjzh_sanguo_beige":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:"damageEnd",
					},
					filter(event,player){
					    return event.source&&event.source!=player&&event.player.isIn()&&player.countCards('he');
					},
					preHidden:true,
					prompt:function(event,player){
						return ""+get.translation(event.source)+"对"+get.translation(event.player)+"造成了伤害，是否发动〖悲歌〗？";
					},
					check:function(event,player){
						var att1=get.attitude(player,event.player);
						var att2=get.attitude(player,event.source);
						return att1>0&&att2<=0;
					},
					popup:false,
					async content(event,trigger,player){
					    var check=lib.skill.xjzh_sanguo_beige.check(trigger,player);
					    const bool=await player.chooseToDiscard('he',get.prompt('xjzh_sanguo_beige')).set("ai",function(card){
					        if(_status.event.goon) return 8-get.value(card);
							return 0;
					    }).set('logSkill','xjzh_sanguo_beige').set('goon',check).forResultBool();
					    if(bool){
					        const card=await trigger.player.judge().forResultCard();
					        switch(get.suit(card)){
    							case 'heart':
    							if(trigger.player.isDying()){
    							    var num=trigger.num
    							}else{
    							    var num=1
    							}
    							trigger.player.recover(num);
    							break;
    							case 'diamond':
    							trigger.player.draw(2);
    							break;
    							case 'club':
    							if(trigger.source.countCards("he")>0){
    								trigger.source.chooseToDiscard('he',2,true);
    							}
    							else{
    								player.draw(trigger.num);
    							}
    							break;
    							case 'spade':
    							if(trigger.source.isTurnedOver()){
    								player.draw(trigger.num);
    							}
    							else{
    								trigger.source.turnOver();
    							}
    							break;
    						}
					    }
					},
					ai:{
						expose:0.3,
					},
				},
				"xjzh_sanguo_guihan":{
					trigger:{
						player:"dieBefore",
					},
					forced:true,
					locked:true,
					limited:true,
					mark:true,
					marktext:"汉",
					intro:{
						content:"limited",
					},
					skillAnimation:true,
					animationColor:'water',
					animationStr:"汉家风骨",
					derivation:["xjzh_sanguo_caiqinggai"],
					filter(event,player){
					    return !player.storage.xjzh_sanguo_guihan;
					},
					audio:"ext:仙家之魂/audio/skill:2",
					async content(event,trigger,player){
						trigger.cancel();
						player.awakenSkill('xjzh_sanguo_guihan');
						player.storage.xjzh_sanguo_guihan=true;
						player.loseMaxHp();
						player.recover(player.getDamagedHp());
						let targetx=game.filterPlayer(function(current){return current!=player});
						targetx.sort(lib.sort.seat);
						for(let target of targetx){
						    await target.loseHp();
						}
						do{
						    let target=targetx.shift();
						    let list=target.getStockSkills();
						    if(list.length){
    							const {result:{control}}=
    								list.length==1?
    									{result:{control:list[0]}}:
    									await target.chooseControl(list).set('ai',function(){
									//return get.min(list,get.skillRank,'item');
									return list.randomGet();
								});
								if(control){
								    target.removeSkill(control,true);
        							target.popup(control,'fire');
        							game.log(target,'失去技能','#g〖'+get.translation(control)+'〗');
        							game.delay(1.5);
								}
						    }
						}while(targetx.length);
						let [bool,targets]=await player.chooseTarget('选择一个目标获得技能〖悲歌〗',lib.filter.notMe).set('ai',function(target){return get.attitude(player,target)>=2;}).forResult('bool','targets');
						if(bool){
						    targets[0].addSkill("xjzh_sanguo_beige");
							targets[0].popup("xjzh_sanguo_beige",'thunder');
							game.log(targets[0],'获得技能','#g〖'+get.translation("xjzh_sanguo_beige")+'〗');
						}
						player.removeSkill("xjzh_sanguo_beige");
					},
					ai:{
						expose:0.5,
					},
				},
				"xjzh_sanguo_liegong":{
				    mod:{
                        targetInRange:function(card,player,target,now){
                            if(card.name=='sha'&&card.number&&get.suit(card)=='diamond'){
                                if(get.distance(player,target)<=card.number) return true;
                            }
                        },
                        selectTarget:function(card,player,range){
                            var cards=player.getCards('h',function(cardx){
                                return get.suit(cardx)!='heart';
                            });
                            var suitx=[]
                            for(var i of cards){
                                if(!suitx.includes(get.suit(i))) suitx.add(get.suit(i));
                            }
                            var num=suitx.length;
                            if(range[1]==-1) return;
                            if(get.suit(card)!='heart') return;
                            if(game.players.length<=2) return;
                            if(card.name=='sha') range[1]+=num;
                        },
                    },
                    audio:"ext:仙家之魂/audio/skill:4",
                    trigger:{
                        player:"shaBegin",
                    },
                    logTarget:"target",
                    shaRelated:true,
                    frequent:true,
                    check:function (event,player){
                        return get.attitude(player,event.target)<=0;
                    },
                    prompt:function(event,player){
                        var str="〖烈弓〗:是否令此【杀】无法闪避";
                        var suit=get.suit(event.card);
                        var cards=player.getCards('h',function(cardx){
                            return get.suit(cardx)!='club';
                        });
                        var suitx=[]
                        for(var i of cards){
                            if(!suitx.includes(get.suit(i))) suitx.add(get.suit(i));
                        }
                        var num=suitx.length
                        if(suit=="spade") str+="且无视防具";
                        if(suit=="club") str+="且额外弃置"+get.translation(event.target)+""+get.translation(num)+"张手牌";
                        return str;
					},
                    content:function (){
                        'step 0'
                        if(trigger.target.getEquip(2)&&get.suit(trigger.card)=='spade'){
                            player.addTempSkill('unequip','shaAfter');
                        }
	    		        'step 1'
                        if(trigger.target.countCards('h')&&get.suit(trigger.card)=='club'){
                            var cards=player.getCards('h',function(cardx){
                                return get.suit(cardx)!='club';
                            });
                            var suitx=[]
                            for(var i of cards){
                                if(!suitx.includes(get.suit(i))) suitx.add(get.suit(i));
                            }
                            var num=suitx.length
                            player.discardPlayerCard('h',trigger.target,true,num);
                        }
	    		        'step 3'
                        trigger.directHit=true;
                    },
                    ai:{
                        threaten:0.5,
                        expose:0.5,
                        directHit_ai:true,
                        unequip_ai:true,
                       	skillTagFilter:function(player,tag,arg){
                       	    if(tag=='unequip_ai'){
					        	if(arg&&arg.card.name=='sha'&&get.suit(arg.card)=="spade") return true;
						        return false;
						    }
						    if(tag=='directHit_ai') return true;
						    return false;
				    	},
                    },
                },
                "xjzh_sanguo_zhujian":{
                    audio:"ext:仙家之魂/audio/skill:2",
                    trigger:{
                        source:"damageBegin3",
                        player:"damageBegin3",
                    },
                    forced:true,
                    locked:true,
                    priority:3,
                    filter:function(event,player){
                        if(!event.source) return false;
                        if(!event.source.isIn()) return false;
                        return event.card&&event.card.name=='sha';
                    },
                    content:function (){
                        event.card=get.cards();
                        player.showCards(event.card);
                        player.$throw(event.card,1000);
                        game.delay();
                        var number1=get.number(trigger.card);
                        var number2=get.number(event.card);
                        if(number2==number1){
                            trigger.num++
                        }
                        else if(number2>number1){
                            var card=get.cardPile(function(card){
							    return card.name=='sha';
						    });
					    	if(card) player.gain(card,'gain2');
                        }
                        else if(number2<number1){
                            player.gain(event.card,'gain2');
                        }
                    },
					ai:{
						effect:{
							target:function(card,player,target){
								if(card.name=='sha') return [1,0.6];
							},
							player:function(card,player,target){
								if(card.name=='sha') return [1,0.5];
							}
						}
					}
                },
                "xjzh_sanguo_zhujian2":{
                    audio:"xjzh_sanguo_zhujian",
                    trigger:{
                        target:"useCard",
                        player:"useCard",
                    },
                    frequent:true,
                    priority:4,
                    marktext:"箭",
                    intro:{
                        content:'已记录点数：$'
                    },
                    filter:function(event,player){
                        if(event.card.name!="sha") return false;
                        return !player.getStorage('xjzh_sanguo_zhujian2').includes(get.number(event.card));
                    },
                    init:function(player){
                        var cards=Array.from(ui.cardPile.childNodes).filter(card=>get.name(card)=="sha");
                        var num=0
                        var list=[]
                        for(var i of cards){
                            list.push(get.number(i));
                        }
                        list=list.sort((a,b)=>a-b);
                        var list2=[]
                        for(var i=0;i<list.length;i++){
                            if(list[i]!=list[i+1]) list2.push(list[i])
                        }
                        player.storage.xjzh_sanguo_zhujian3=list2.length;
                    },
                    content:function (){
                        "step 0"
                        var num=get.number(trigger.card);
                        player.markAuto('xjzh_sanguo_zhujian2',[num]);
                        var cards=get.cardPile(function(card){
							return get.number(card)!=get.number(trigger.card)&&card.name=="sha";
						});
                        if(cards) player.gain(cards,player,"gain2");
                        "step 1"
                        var storage=player.getStorage('xjzh_sanguo_zhujian2');
                        if(storage.length%4==0){
                            if(!trigger.baseDamage) trigger.baseDamage=1;
							var num=storage.length/4
							trigger.baseDamage+=num;
							game.log(trigger.player,'令【',trigger.card,'〗伤害加'+get.translation(num)+'');
                        }
                        "step 2"
                        if(player.getStorage('xjzh_sanguo_zhujian2').length>=player.storage.xjzh_sanguo_zhujian3){
                            player.unmarkAuto('xjzh_sanguo_zhujian2',player.getStorage('xjzh_sanguo_zhujian2'));
                        }
                    },
					ai:{
						effect:{
							target:function(card,player,target){
								if(card.name=='sha') return [1,0.6];
							},
							player:function(card,player,target){
								if(card.name=='sha') return [1,0.5];
							}
						}
					}
                },
				"xjzh_sanguo_chuzhen":{
			    	trigger:{player:'useCard1'},
			    	forced:true,
				    firstDo:true,
			    	filter:function(event,player){
					    return !event.audioed&&event.card.name=='sha'&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
			    	},
			    	content:function(){
				    	trigger.audioed=true;
		    		},
                    mod:{
                        aiOrder:function(player,card,num){
                            var history=player.getHistory('useCard',function(evt){
                                return evt.card&&evt.card.name=='sha';
                            });
                            if(!history.length)return;
                            if(typeof get.number(history[history.length-1].card)!='number')return;
                            if(typeof get.number(card)!='number')return;
                            if(get.name(card)!='sha')return;
                            if(get.number(card)>get.number(history[history.length-1].card)){
                                return num+(10/(get.number(card)-get.number(history[history.length-1].card)));
                            }
                        },
                        cardUsable:function (card,player,num){
                            var history=player.getHistory('useCard',function(evt){
                                return evt.card&&evt.card.name=='sha';
                            });
                            if(!history.length) return;
                            if(get.number(card)>get.number(history[history.length-1].card)&&card.name=="sha") return Infinity;
						},
                    },
                    shaRelated:true,
                    locked:true,
                    audio:"ext:仙家之魂/audio/skill:2",
                    ai:{
                        skillTagFilter:function(player,tag,arg){
                            if(arg.card.name!='sha')return false;
                            var history=player.getHistory('useCard',function(evt){
                                return evt.card&&evt.card.name=='sha';
                            });
                            if(!history.length)return false;
                            if(typeof get.number(history[history.length].card)!='number')return false;
                            if(typeof get.number(arg.card)!='number')return false;
                            if(get.number(arg.card)>get.number(history[history.length-1].card)){
                                return true;
                            }
                            return false;
                        },
                    },
                },
				"xjzh_sanguo_lanzheng":{
				    trigger:{
				        player:["phaseDrawBegin","phaseDiscardBegin"],
				    },
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
					    if(event.name=="phaseDiscard"){
					        if(player.countCards('he')==0) return false;
					    }
					    return true;
					},
					content:function(){
					    "step 0"
					    trigger.cancel(null,null,'notrigger');
					    "step 1"
					    if(trigger.name=="phaseDraw"){
					        player.draw(player.hp+3);
					        event.finish();
					    }else{
							var num=player.hp+game.countGroup();
							player.chooseToDiscard(num,'he',true);
					    }
					    "step 2"
					    if(!player.getStat('damage')){
							player.loseHp();
						}
					},
				},
				"xjzh_sanguo_hengzheng":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:"phaseUseBegin",
					},
					forced:true,
					locked:true,
					unique:true,
					filter:function (event,player){
						return event.player!=player&&event.player.countCards('he');
					},
					content:function (){
						"step 0"
						player.gainPlayerCard(trigger.player,"he",true);
						"step 1"
						if(player.isMaxHandcard(true)) player.damage(1,'nocard','nosource');
					},
				},
				"xjzh_sanguo_baolian":{
					trigger:{
						global:"phaseUseEnd",
					},
					forced:true,
					locked:true,
					unique:true,
					filter:function (event,player){
						return event.player!=player&&event.player.num('h')>=2&&player.maxHp>3;
					},
					audio:"ext:仙家之魂/audio/skill:2",
					content:function (){
						"step 0"
						if(!trigger.player.getStat('damage')){
							trigger.player.chooseToDiscard("弃置两张牌令董卓流失两点体力或减少一点体力上限",get.prompt('xjzh_sanguo_baolian'),2,'he',true).set('ai',function(card){
								if(get.damageEffect(target,_status.event.player,_status.event.player)) return 2;
								return 4-get.value(card);
							});
						}
						else{
							event.finish();
						}
						'step 1'
						if(result.bool){
						    var dialog=ui.create.dialog('forcebutton','hidden','是否对星董卓发动〖暴敛〗');
                            var str='<div class="popup text" style="width:calc(100%-10px);display:inline-block">';
						    str+="选项一:令董卓失去两点体力<br><br>";
						    str+="选项二:令董卓失去一点体力并摸一张牌</div><br><br>";
							dialog.add(str);
							trigger.player.chooseControl('选项一','选项二',function(){
								if(player.maxHp-player.hp>=2||trigger.player.hp<=1){
									return '选项一';
								}
								else{
									return '选项二';
								}
							}).set('dialog',dialog);
						}
						else{
							event.finish();
						}
						"step 2"
						if(result.control=='选项一'){
							player.loseHp(2);
						}
						else{
							player.loseMaxHp();
							player.draw();
							trigger.player.loseHp();
						}
					},
				},
				"xjzh_sanguo_linnue":{
					mod:{
						cardUsable:function (card,player,num){
							if(card.name=='sha'&&get.color(card)=='red') return Infinity;
						},
					},
					forced:true,
					locked:true,
					popup:false,
					unique:true,
					// alter:true,
					trigger:{
						player:'useCard',
					},
					filter:function(event,player){
						if(get.is.altered('xjzh_sanguo_linnue')) return false;
						return event.card.name=='sha'&&get.color(event.card)=='red';
					},
					content:function(){
						if(player.stat[player.stat.length-1].card.sha>0){
							player.stat[player.stat.length-1].card.sha--;
						}
					},
					group:["xjzh_sanguo_linnue_1","xjzh_sanguo_linnue_2"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:2",
							trigger:{
								player:"damageBegin",
								source:"damageBegin",
							},
							forced:true,
							sub:true,
							filter:function (event,player){
							    if(!event.source||event.source=='nosource') return false;
							    if(event.source==player){
							        return event.player.hasSex('female');
							    }
								return event.source.hasSex('female');
							},
							content:function (){
								trigger.num++;
							},
						},
						"2":{
							audio:"ext:仙家之魂/audio/skill:2",
							forced:true,
							sub:true,
							trigger:{
								player:"useCard",
							},
							filter:function (event){
								return event.card.name=='sha'&&get.color(event.card)=='black';
							},
							content:function (){
								player.addTempSkill('unequip','useCardAfter');
							},
						},
					},
					ai:{
						unequip:true,
						skillTagFilter:function (player,tag,arg){
							if(!get.zhu(player,'shouyue')) return false;
							if(arg&&arg.name=='sha') return true;
							return false;
						},
					},
				},
				"xjzh_sanguo_zongjiu":{
					audio:"ext:仙家之魂/audio/skill:4",
					locked:true,
					zhuSkill:true,
					unique:true,
					enable:'chooseToUse',
					filter:function (event,player){
						if(player.hasZhuSkill('xjzh_sanguo_zongjiu')) return true;
						return false;
					},
					filterCard:function(card){
						return get.suit(card)=='spade';
					},
					viewAs:{name:'jiu'},
					viewAsFilter:function(player){
						if(player.countCards('h',{suit:'spade'})<=0) return false;
					},
					prompt:'将一张黑桃手牌当酒使用',
					check:function(card){
						if(_status.event.type=='dying') return 1;
						return 4-get.value(card);
					},
					ai:{
						skillTagFilter:function(player){
							return player.countCards('h',{suit:'spade'})>0&&player.hp<=0;
						},
						threaten:1.5,
						save:true,
					}
				},
				"xjzh_sanguo_xiongbin":{
					unique:true,
					forceDie:true,
					locked:true,
					xjzh_xinghunSkill:true,
					enable:"phaseUse",
					usable:1,
					filterTarget:function (card,player,target){
						return player!= target;
					},
					selectTarget:-1,
					multitarget:true,
					multiline:true,
					check:function(event,player){
						var att=0;
						for(var i=0;i<event.targets.length;i++){
							if(event.targets[i]!=player){
								att+=get.effect(event.targets[i],{name:'sha'},player,player);
							}
						}
						return att>1;
					},
					filter:function(event,player){
						return player.countCards("h");
					},
					content:function (){
						"step 0"
						//player.awakenSkill(event.name);
						//player.storage[event.name]=true;
						"step 1"
						player.addTempSkill('xjzh_sanguo_xiongbin2','xjzh_sanguo_xiongbinAfter');
						"step 2"
						player.chooseCard("h",1,true).set('ai',function(card){
							return Math.random();
						});
						"step 3"
						var card=ui.create.card();
						card.classList.add('infohidden');
						card.classList.add('infoflip');
						player.$throw(card,1000,'nobroadcast');
						game.log(player,"扣置了一张牌在场上");
						game.delay(2);
						event.suit=get.suit(result.cards[0]);
						event.number=get.number(result.cards[0]);
						"step 4"
						event.list=[]
						event.current=player.next
						"step 5"
						if(event.current!=player){
							if(event.current.countCards("h")){
								event.current.chooseCard("h",1,true).set('ai',function(card){
									var suit=get.suit(card);
									var number=get.number(card);
									if(suit==event.suit) return 0;
									if(number==event.number) return 0;
									return 4-get.value(card);
								});
							}
							else{
								event.current=event.current.next
								event.goto(5);
							}
						}
						else{
							event.goto(7);
						}
						"step 6"
						if(result.bool){
							event.current.$throw(result.cards[0],1000,'nobroadcast');
							game.log(event.current,"展示了",result.cards[0]);
							game.delay(2);
							if(get.suit(result.cards[0])==event.suit||get.number(result.cards[0])==event.number){
								player.useCard({name:'sha'},event.current,"unequip",false);
							}
							else if(get.suit(result.cards[0])!=event.suit&&get.number(result.cards[0])!=event.number){
								event.list.push(result.cards[0]);
							}
							event.current=event.current.next
							event.goto(5);
						}
						"step 7"
						player.gain(event.list,player,"gain2");
						"step 8"
						if(player.getStat('damage')){
							player.damage("nosource","nocard");
						}
					},
					ai:{
						order:1,
						result:{
							player:function(card,player,target){
								if(player.hp<=1&&player.countCards("h",{name:"tao"})<=0) return 0;
								if(game.roundNumber==1) return 0;
								if(player.hp>1){
									if(player.countCards("h",{name:"tao"})) return 1.5;
									if(game.players.length<3) return 1;
									if(game.players.length>=3&&game.players.length<=5) return 5;
									if(game.players.length>5) return 1.5;
								}
								return 0.5;
							}
						},
						threaten:1.5
					},
				},
				"xjzh_sanguo_xiongbin2":{
					trigger:{
						player:"shaMiss",
					},
					forced:true,
					locked:true,
					popup:false,
					sub:true,
					content:function () {
						player.draw();
					},
				},
				"xjzh_sanguo_tieji":{
					audio:"ext:仙家之魂/audio/skill:4",
					trigger:{
						player:"shaBegin",
					},
					frequent:true,
					locked:true,
					shaRelated:true,
					check:function (event,player){
						return get.attitude(player,event.target)<=0;
					},
					logTarget:"target",
					content:function (){
						"step 0"
						trigger.target.judge();
						"step 1"
						var suit=result.suit;
						var numx=get.number(result.card);
						var target=trigger.target;
						var num=target.countCards('h','shan');
						if(suit=="heart"){
							if(trigger.getParent('xjzh_sanguo_xiongbin').name!="xjzh_sanguo_xiongbin") player.getStat().card.sha--;
						}
						else if(suit=="spade"){
							if(!target.hasSkill('baiban')){
								target.addTempSkill('baiban','shaAfter');
							}
						}
						target.chooseToDiscard('请弃置一张花色为'+get.translation(suit)+'或点数为'+get.translation(numx)+'的牌，否则不能使用闪抵消此【杀】','he',function(card){
							return get.suit(card)==_status.event.suit||get.number(card)==numx;
						})
						.set('ai',function(card){
							var num=_status.event.num;
							if(num==0) return 0;
							if(card.name=='shan') return num>1?2:0;
							return 8-get.value(card);
						})
						.set('numx',numx).set('suit',suit);
						"step 2"
						if(!result.bool){
							trigger.directHit=true;
						}
					},
				},
				"xjzh_sanguo_jieqiang":{
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						player:"phaseDrawBegin",
					},
					forced:true,
					locked:true,
					mod:{
						maxHandcard:function (player,num){
						    if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
						        var numx=player.getDamagedHp();
						        var numx2=player.hp;
						        if(numx>numx2){
						            var numx3=numx
						        }else{
						            var numx3=numx2
						        }
						    }else{
						        var numx3=2
						    }
							return numx3+num;
						},
					},
					content:function (){
					    if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
						    var numx=player.getDamagedHp();
						    var numx2=player.hp;
					        if(numx>numx2){
					            var numx3=numx
					        }else{
					            var numx3=numx2
					        }
					    }else{
					        var numx3=player.getDamagedHp();
						}
						trigger.num+=numx3;
					},
				},
				"xjzh_sanguo_shengxin":{
					forced:true,
					locked:true,
					marktext:"圣",
					intro:{
						name:"圣心",
						content:"发动圣心#次",
					},
					group:"xjzh_sanguo_shengxin1",
					mod:{
						maxHandcard:function (player,num){
							var num=player.countCards("h",{color:"red"});
							return player.hp+num;
						},
					},
					trigger:{
						global:"useCardAfter",
					},
					filter:function (event,player){
						return event.player!=player&&get.suit(event.card)=='heart'&&Math.random()<=0.3;
					},
					content:function (){
						player.gain(game.createCard(trigger.card),'gain2');
					},
				},
				"xjzh_sanguo_shengxin1":{
					audio:"ext:仙家之魂/audio/skill:2",
					enable:"phaseUse",
					prompt:"①选择一名体力小于你的武将，令其恢复体力与你一致并摸一张牌<li>②选择一名体力不小于你的武将，令其摸体力上限张牌",
					usable:1,
					sub:true,
					mark:true,
					filterCard:function (card){
						return get.suit(card)=='heart';
					},
					filter:function (event,player){
						if(player.countCards('h',{suit:'heart'})==0) return false;
						return event.player.isAlive();
					},
					filterTarget:function (card,player,target){
						return player!=target;
					},
					content:function (){
						if(!player.storage.xjzh_sanguo_liangyi){
							player.addMark("xjzh_sanguo_shengxin");
						}
						if(target.hp<player.hp){
							target.recover(player.hp-target.hp);
							target.draw();
						}
						else{
							var num=(Math.min(5,target.maxHp));
							target.draw(num);
						}
					},
					ai:{
						order:8,
						threaten:2,
						expose:0.6,
						result:{
							player:-1,
							target:function(player,target){
								if(!target) return;
								var num=player.hp-target.hp
								if(num>0&&num<2) return 1.5;
								if(num>=2) return 3;
								if(num<=0) return 1.5;
								if(player.countCards('h')>player.hp) return 5;
								return 1.5;
							},
						},
					},
				},
				"xjzh_sanguo_jishi":{
					locked:true,
					audio:"ext仙家之魂:2",
					trigger:{
						global:"dying",
					},
					marktext:"济",
					intro:{
						name:"济世",
						content:"发动济世#次",
					},
					priority:86,
					prompt:function(event,player){
						return ""+get.translation(event.player)+"濒死，是否发动济世";
					},
					check:function (event,player){
						if(get.attitude(player,event.player)>2) return true;
						return false;
					},
					content:function (){
						"step 0"
						event.cards=get.cards(player.getDamagedHp()+1);
						player.showCards(event.cards);
						"step 1"
						var num=0;
						var cards2=[];
						for(var i=0;i<event.cards.length;i++){
							if(get.suit(event.cards[i])=='heart'){
								num++;
							}
							if(get.color(event.cards[i])=='red'){
								cards2.push(event.cards[i]);
								event.cards.splice(i--,1);
							}
						}
						game.cardsDiscard(cards2);
						if(num){
							trigger.player.recover(1-trigger.player.hp);
							if(!player.storage.xjzh_sanguo_liangyi){
								player.addMark("xjzh_sanguo_jishi");
							}
						}
						"step 2"
						if(event.cards.length){
							player.gain(event.cards,"gain2");
							game.delay();
						}
					},
					ai:{
						save:true,
						expose:0.8,
					},
				},
				"xjzh_sanguo_liangyi":{
					skillAnimation:true,
					animationColor:"wood",
					animationStr:"救命良医",
					limited:true,
					unique:true,
					enable:"phaseUse",
					filterTarget:function (card,player,target){
						return player!=target;
					},
					filter:function(event,player){
						return (player.countMark("xjzh_sanguo_shengxin")>=3||player.countMark("xjzh_sanguo_jishi")>=3)&&!player.storage.xjzh_sanguo_liangyi;
					},
					forced:true,
					locked:true,
					content:function(){
						"step 0"
						player.awakenSkill(event.name);
						player.storage[event.name]=true;
						player.clearMark("xjzh_sanguo_shengxin");
						player.clearMark("xjzh_sanguo_jishi");
						"step 1"
						target.recover();
						target.addSkill("xjzh_sanguo_liangyi2");
						target.draw(player.hp+game.countPlayer());
						target.phase("xjzh_sanguo_liangyi");
					},
				},
				"xjzh_sanguo_liangyi2":{
					mark:true,
					marktext:"医",
					intro:{
						name:"良医",
						content:"回合结束后失去所有体力",
					},
					trigger:{
						player:"phaseEnd",
					},
					forced:true,
					locked:true,
					sub:true,
					content:function(){
						player.loseHp(player.hp);
						player.removeSkill("xjzh_sanguo_liangyi2");
					},
				},
				"xjzh_sanguo_yinren":{
					trigger:{
					    global:"dieAfter",
					    player:["dieBefore","damageBegin","loseHpBegin","loseMaxHpBegin"],
					},
					mark:true,
					marktext:"隐",
					intro:{
						content:"免疫体力变化",
					},
					init:function(player){
					    setTimeout(function(){
							if(game.players.length>3){
					            if(player.maxHp!=1){
								    player.hp=1
								    player.maxHp=1
					                player.storage.xjzh_sanguo_yinren=0;
								    player.update();
							    }
					        }else{
					            var list=lib.skill.xjzh_sanguo_yinren.derivation.slice(0);
					            player.addSkill(list);
					            player.removeSkill("xjzh_sanguo_yinren");
					        };
					    },500);
					},
					locked:true,
					unique:true,
					forced:true,
					priority:5,
					//forbid:['guozhan','single','boss','doudizhu'],
					derivation:["xjzh_sanguo_jilue","xjzh_sanguo_qicaix"],
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
					    if(event.name=="die"){
					        if(event.player!=player){
					            if(event.player.isDead()) return true;
					        }
					        if(event.player==player) return true;
					    }
					    if(event.name=="damage"||event.name=="loseMaxHp"||event.name=="loseHp") return true;
					    return false;
					},
					content:function(){
					    if(trigger.name=="die"){
					        if(trigger.player!=player){
					            if(trigger.player.isDead()&&player.storage.xjzh_sanguo_yinren<2){
					                player.gainMaxHp();
								    player.recover();
								    var list=lib.skill.xjzh_sanguo_yinren.derivation.slice(0);
								    player.addSkill(list[player.storage.xjzh_sanguo_yinren]);
								    player.storage.xjzh_sanguo_yinren++
								    if(player.hasSkill('xjzh_sanguo_jilue')&&player.hasSkill('xjzh_sanguo_qicaix')){
								        delete player.storage.xjzh_sanguo_yinren
								        player.removeSkill('xjzh_sanguo_yinren');
								        game.playXH('xjzh_sanguo_yinren2');
								    }
					            }
					        }else{
					            trigger.cancel(null,null,'notrigger');
					        }
					    }
					    else if(trigger.name=="damage"||trigger.name=="loseHp"||trigger.name=="loseMaxHp"){
					        trigger.cancel(null,null,'notrigger');
					    }
					},
					ai:{
						nofire:true,
						nothunder:true,
						nodamage:true,
						effect:{
							target:function (card,player,target,current){
								if(get.tag(card,'damage')) return [0,0];
							},
						},
						skillTagFilter:function(player,tag){
							if(player.storage.xjzh_sanguo_yinren){
								return true;
							}
						}
					},
				},
				"xjzh_sanguo_jilue":{
					enable:"phaseUse",
					usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
					filterTarget:function(card,player,target){
						return player!=target;
					},
					sub:true,
					content:function (){
						"step 0"
						var hs=player.countCards('h');
						var hs2=target.countCards('h');
					    if(hs>hs2){
					        target.draw(hs-hs2);
					    }
					    else if(hs<hs2){
					        target.chooseToDiscard(hs2-hs,true);
					    }
					    if(hs<player.maxHp) player.drawTo(player.maxHp);
					},
					ai:{
						expose:0.5,
						order:12,
						result:{
							player:1,
							target:function(player,target){
							    var hs=player.countCards('h');
							    var hs2=target.countCards('h');
							    var hp=player.getDamagedHp();
							    if(hs>hs2) return hs-hs2+hp
							    return -(hs2-hs+hp);
							}
						},
					}
				},
				"xjzh_sanguo_qicaix":{
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:2",
					filterCard(card,player,target){
					    let type=get.type(card);
					    for(let i=0;i<ui.selected.cards.length;i++){
						    if(get.type(ui.selected.cards[i])!=type) return false;
					    }
					    return true;
					},
					selectCard:2,
				    complexCard:true,
					sub:true,
					position:'he',
					check(card,event){
						return 6-get.value(card);
					},
					group:["xjzh_sanguo_qicaix_use"],
					filter(event,player){
					    let cards=player.getCards('he');
					    if(cards.length==0) return false;
					    let list=[]
					    let num=0;
					    for(let i=0;i<cards.length;i++){
					        let card=cards[i]
					        if(list.includes(get.type(card))) num++;
					        list.push(get.type(card))
					    }
					    if(num>0) return true;
					    return false;
					},
					mod:{
						cardUsable(card,player,num){
						    if(!card.cards) return;
						    if(card.name=="sha"||card.name=="jiu"){
						        for(let i of card.cards){
						            if(i.hasGaintag("xjzh_sanguo_qicaix")) return Infinity;
						        }
						    }
						},
						targetInRange(card,player,target,now){
						    if(!card.cards) return;
						    for(let i of card.cards){
						        if(i.hasGaintag("xjzh_sanguo_qicaix")) return true;
						    }
						},
					},
					async content(event,trigger,player){
					    let typex=get.type(event.cards[0]);
					    let card=get.cardPile(function(card){
                            return get.type(card)!=typex;
                        });
                        if(card){
                            player.gain(card,player,'draw');
                        }else{
                            player.gain(game.createCard(card),player,'draw');
                        }
                        player.addGaintag(card,'xjzh_sanguo_qicaix');
					},
					subSkill:{
					    "use":{
                            trigger:{player:"useCardBefore"},
                            forced:true,
                            priority:-1,
                            sub:true,
                            filter(event,player){
                                if(event.card.name=='sha'||event.card.name=="jiu"){
                                    if(event.cards[0].hasGaintag("xjzh_sanguo_qicaix")) return true;
					            };
					            return false;
					        },
					        async content(event,trigger,player){
                                if(trigger.addCount!==false){
                                    trigger.addCount=false;
                                    let stat=player.getStat();
                                    if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
                                }; 
					        },
					    },
					},
					ai:{
						expose:0.5,
						order:12,
						result:{
							player:1,
							target:function(player,target){
							    if(!player) return;
							    if(!target) return;
							    var hs=player.countCards('h');
							    var hs2=target.countCards('h');
							    var hp=player.getDamagedHp();
							    if(hs>hs2) return hs-hs2+hp
							    return -(hs2-hs+hp);
							}
						},
					}
				},
				"xjzh_sanguo_bolue":{
				    trigger:{
				        player:"phaseZhunbeiBegin",
				    },
				    forced:true,
				    priority:-3,
				    filter:function(event,player){
				        return !player.hasSkill('xjzh_sanguo_yinren');
				    },
				    mark:true,
					marktext:"博",
					intro:{
					    name:"博略",
					    content:function(storage,player){
					        if(player.storage.xjzh_sanguo_bolue){
					            var storage=player.storage.xjzh_sanguo_bolue;
					            return get.translation(storage);
					        }
					        return "";
					    },
					    markcount:function(storage,player){
					        if(player.storage.xjzh_sanguo_bolue){
					            var storage=player.storage.xjzh_sanguo_bolue;
					            return storage.length;
					        }
					        return "";
					    },
					},
					init:function(player){
						player.storage.xjzh_sanguo_bolue=[]
					},
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
					    "step 0"
					    if(player.storage.xjzh_sanguo_biantian&&player.storage.xjzh_sanguo_biantian==true) event.goto(3);
					    "step 1"
					    player.judge();
					    "step 2"
					    switch(get.suit(result.card)){
							case 'heart':{
								event.group=["shu"];
								break;
							}
							case 'spade':{
								event.group=["wei"];
								break;
							}
							case 'diamond':{
								event.group=["qun"];
								break;
							}
							case 'club':{
								event.group=["wu"];
								break;
							}
						}
						if(!player.storage.xjzh_sanguo_bolue.includes(get.suit(result.card))) player.storage.xjzh_sanguo_bolue.add(get.suit(result.card));
						"step 3"
						event.skills2=[]
						if(!event.group) event.group=["wei","shu","wu","qun"];
						"step 4"
						player.checkConflict();
						player.checkMarks();
						var list;
						if(_status.characterlist){
							list=[];
							for(var i=0;i<_status.characterlist.length;i++){
								var name=_status.characterlist[i];
								if(lib.character[name][1]==event.group[0]) list.push(name);
							}
						}
						else if(_status.connectMode){
							list=get.charactersOL(function(i){
								return lib.character[i][1]!=event.group[0];
							});
						}
						else{
							list=get.gainableCharacters(function(info){
								return info[1]==event.group[0];
							});
						}
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							list.remove(players[i].name);
							list.remove(players[i].name1);
							list.remove(players[i].name2);
						}
						var skills=[]
						for(var i of list){
							skills.addArray((lib.character[i][3]).filter(function(skill){
								var info=lib.skill[skill];
								return info&&!info.charlotte&&!info.dutySkill&&!info.juexingji&&!info.limited&&!info.unique;
							}));
						}
						event.skills2.push(skills.randomGet())
						event.group.remove(event.group[0]);
						if(player.storage.xjzh_sanguo_biantian&&player.storage.xjzh_sanguo_biantian==true){
						    if(event.skills2.length<4) event.redo();
						}
						"step 5"
						player.addAdditionalSkill('xjzh_sanguo_bolue',event.skills2);
						game.log(player,"获得了技能","#g〖"+get.translation(event.skills2)+"〗");
					},
				},
				"xjzh_sanguo_biantian":{
				    trigger:{
				        player:"xjzh_sanguo_bolueAfter",
				    },
					juexingji:true,
					limited:true,
					forced:true,
					locked:true,
					priority:-1,
					skillAnimation:true,
					animationColor:"metal",
					derivation:["xjzh_sanguo_yingshi","xjzh_sanguo_langgu"],
				    filter:function(event,player){
				        if(!player.storage.xjzh_sanguo_bolue) return false;
				        if(player.storage.xjzh_sanguo_biantian) return false;
				        var list=player.storage.xjzh_sanguo_bolue;
				        return player.storage.xjzh_sanguo_bolue.length>=4;
				    },
					audio:"ext:仙家之魂/audio/skill:1",
				    init:function(player){
				        player.storage.xjzh_sanguo_biantian=false;
				    },
				    content:function(){
				        "step 0"
						player.awakenSkill("xjzh_sanguo_biantian");
						player.storage.xjzh_sanguo_biantian=true;
						"step 1"
						player.gainMaxHp();
						"step 2"
						var list=["spade","heart","club","diamond"]
						var cards=[]
						while(list.length>0){
						    var card=get.cardPile(function(cardx){
						        return get.suit(cardx)==list[0];
                            });
                            if(card){
                                cards.push(card);
                            }else{
                                cards.push(game.createCard(card));
                            }
                            list.remove(list[0]);
                        }
                        player.gain(cards,player,'draw');
                        "step 3"
                        player.addSkill("xjzh_sanguo_yingshi");
                        player.addSkill("xjzh_sanguo_langgu");
                        if(player.storage.xjzh_sanguo_bolue){
                            player.unmarkSkill('xjzh_sanguo_bolue');
                            delete player.storage.xjzh_sanguo_bolue
                        }
				    },
				},
				"xjzh_sanguo_yingshi":{
				    trigger:{
				        global:["damageAfter"],
				    },
				    filter:function(event,player){
				        if(event.source==player) return event.player!=player;
				        return event.player==player;
				    },
					audio:"ext:仙家之魂/audio/skill:1",
				    content:function(){
				        "step 0"
				        if(trigger.source==player){
				            event.target=trigger.player;
				        }else{
				            event.target=player;
				        }
				        var cards=event.target.getCards('h');
				        player.chooseCardButton(cards,1,"〖鹰视〗：选择获得"+get.translation(target)+"一张牌");
				        "step 1"
				        if(result.bool){
				            player.gain(result.links[0],event.target,'draw');
				        }
				    },
				},
				"xjzh_sanguo_langgu":{
				    trigger:{
				        player:["drawBegin","gainBegin"],
				    },
				    forced:true,
				    locked:true,
				    priority:3,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        return event.getParent('xjzh_sanguo_langgu').name!='xjzh_sanguo_langgu';
				    },
				    content:function(){
				        "step 0"
				        trigger.cancel(null,null,'notrigger');
				        "step 1"
						var list=["spade","heart","club","diamond"]
						var cards=[]
						while(list.length>0){
						    var card=get.cardPile(function(cardx){
						        return get.suit(cardx)==list[0];
                            });
                            if(card){
                                cards.push(card);
                            }else{
                                cards.push(game.createCard(card));
                            }
                            list.remove(list[0]);
                        }
                        player.gain(cards,player,'giveAuto');
				    },
				},
				"xjzh_sanguo_keluan":{
					trigger:{
						target:"useCardToBefore",
					},
					frequent:true,
					locked:true,
					check:function (event,player){
						if(get.attitude(player,event.player)<0) return true;
						return false;
					},
					filter:function (event,player){
						return event.card.name=='sha'||event.card.name=='juedou';
					},
					content:function (){
						"step 0"
						if(trigger.player.countCards('he')>0){
							player.gainPlayerCard(trigger.player,"he",true);
						}
						else{
							player.draw();
						}
						"step 1"
						if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
							player.chooseBool('是否视为对'+get.translation(trigger.player)+'使用一张【杀】？').set('ai',function(evt,player){
								return get.attitude(player,trigger.player)<0;
							});
							event.goto(4);
						}
						else{
							if(player.hasSha()){
								player.addTempSkill('unequip','shaAfter');
								player.chooseToUse('是否对'+get.translation(trigger.player)+'使用一张【杀】？',{name:'sha'},trigger.player);
							}
							else{
								event.goto(3);
							}
						}
						"step 2"
						if(player.getStat().card.sha>=1){
							trigger.addCount=false;
							player.getStat().card.sha--
						}
						event.finish();
						"step 3"
						player.draw();
						event.finish();
						"step 4"
						if(result.bool){
							player.addTempSkill('unequip','shaAfter');
							player.useCard({name:'sha'},trigger.player,false);
							event.goto(2);
						}
					},
					ai:{
						effect:{
							target:function (card,player,target,current){
								if(get.tag(card,'damage')) return [0.5,0.5];
							},
						},
					},
				},
				"xjzh_sanguo_cuifeng":{
					trigger:{
						global:"useCardToPlayer",
					},
					frequent:true,
					locked:true,
					unique:true,
					notemp:true,
					prompt:function(event,player){
						return ""+get.translation(event.player)+"对"+get.translation(event.target)+"使用了"+get.translation(event.card)+"，是否发动〖摧锋〗将目标改为"+get.translation(player)+"？";
					},
					filter:function(event,player){
						return event.card&&(event.card.name=='sha'||event.card.name=='juedou')&&event.player!=player&&event.target!=player&&
						event.targets.length==1;
					},
					logTarget:"target",
					check:function(event,player){
						return get.effect(event.targets[0],event.card,event.player,player)<=get.effect(player,event.card,event.player,player);
					},
					content:function(){
						'step 0'
						trigger.target.draw();
						'step 1'
						trigger.targets.length=0;
						trigger.getParent().triggeredTargets1.length=0;
						trigger.targets.push(player);
					},
					ai:{
					    notemp:true,
					},
				},
				"xjzh_sanguo_chaohuang":{
					forced:true,
					locked:true,
					priority:Infinity,
					firstDo:true,
					init:function(player){
					    if(!game.xjzhAchi.hasAchi('百鸟朝凰','character')&&player.isUnderControl(true)&&game.me==player){
					        if(player.name=="xjzh_sanguo_tongyuan"||player.name1=="xjzh_sanguo_tongyuan"||player.name2=="xjzh_sanguo_tongyuan") player.storage.xjzh_sanguo_chaohuang=0
					    }
					},
					trigger:{
					    player:"drawAfter",
					},
					filter:function(event,player){
					    if(player.name=="xjzh_sanguo_tongyuan"||player.name1=="xjzh_sanguo_tongyuan"||player.name2=="xjzh_sanguo_tongyuan"){
					        if(event.getParent("xjzh_sanguo_chaohuang_draw").name=="xjzh_sanguo_chaohuang_draw") return true;
					    }
					    return player.storage.xjzh_sanguo_chaohuang;
					},
					content:function(){
					    if(!player.storage.xjzh_sanguo_chaohuang) player.storage.xjzh_sanguo_chaohuang=0
					    player.storage.xjzh_sanguo_chaohuang++
					    if(player.storage.xjzh_sanguo_chaohuang>=10&&!game.xjzhAchi.hasAchi('百鸟朝凰','character')){
					        if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('百鸟朝凰','character',10);
					    }
					},
					group:["xjzh_sanguo_chaohuang_1","xjzh_sanguo_chaohuang_2"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:"shaMiss",
							},
							forced:true,
							sub:true,
							content:function (){
								"step 0"
								if(player.getStat().card.sha>=1){
									player.getStat().card.sha--
								}
								"step 1"
								if(player.getStat().card.jiu>=1){
									player.getStat().card.jiu--
								}
							},
						},
						"2":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								global:"juedouBegin",
							},
							forced:true,
							sub:true,
							content:function (){
								"srep 0"
								if(event.target=player){
									player.addTempSkill("xjzh_sanguo_chaohuang_draw","juedouAfter");
								}
								else{
									event.goto(1);
								}
								"step 1"
								if(event.player=player){
									if(!game.xjzhAchi.hasAchi('百鸟朝凰','character')) player.addTempSkill("xjzh_sanguo_chaohuang_draw","juedouAfter");
									else player.addTempSkill("xjzh_sanguo_chaohuang_draw","phaseBegin");
								}
								else{
									event.finish()
								}
							},
						},
						"draw":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:"loseAfter",
							},
							forced:true,
							sub:true,
							content:function (){
								player.draw();
							},
						},
					},
				},
				"xjzh_sanguo_liansuo":{
					forced:true,
					locked:true,
					firstDo:true,
					priority:100,
					popup:false,
					mod:{
						selectTarget:function (card,player,range){
                            if(range[1]==-1) return;
                            if(game.players.length<3) return;
                            var info=get.info(card);
                            if(get.suit(card)=='club'||get.name(card)=='tiesuo'){
                                if(get.name(card)=='tiesuo'){
                                    range[1]+=1;
                                }else{
                                    if(info.notarget) return;
                                    if(info.multitarget) return;
                                    if(get.type(card)=='equip') return;
                                    range[0]=1;
                                    range[1]+=1;
                                }
                            }
                        },
					},
					trigger:{
					    player:['phaseUseBegin'],
					},
					group:['xjzh_sanguo_liansuo_add'],
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
					    var previous=player.getPrevious();
						var next=player.getNext();
						if(previous&&next){
						    return !next.hasSkill("fengyin")||!previous.hasSkill("fengyin");
						}
						return false;
					},
					content:function(){
					    var previous=player.getPrevious();
						var next=player.getNext();
						next.addTempSkill("fengyin");
						previous.addTempSkill("fengyin");
					},
					subSkill:{
					    'add':{
					        trigger:{
					            player:"useCardToPlayer",
					        },
					        forced:true,
					        popup:false,
					        priority:100,
					        sub:true,
					        filter:function(event,player){
					            if(event.getParent().triggeredTargets1.length>1) return false;
					            if(event.getParent().targets.length<=1) return false;
					            return get.type(event.card)=='delay';
					        },
					        multitarget:true,
					        content:function(){
					            var cards=trigger.getParent().cards
					            var targets=trigger.getParent().targets
					            event.card=game.createCard({
					                name:cards[0].name,
					                suit:get.suit(cards[0]),
					                number:get.number(cards[0])
					            });
					            targets[1].addJudge(event.card)
					            targets[1].$gain2(event.card)
					        },
					    },
					},
				},
				"xjzh_sanguo_hengzhou":{
                    trigger:{
                        global:["linkAfter","gameStart","$logSkill"],
                        player:"enterGame",
                    },
                    direct:true,
                    locked:true,
                    priority:96,
                    audio:"ext:仙家之魂/audio/skill:1",
                    global:['xjzh_zxzh_hengzhou_damage','xjzh_zxzh_hengzhou_ai'],
                    content:function(){
                        "step 0"
                        if(trigger.name=="gameStart"||trigger.name=="$logSkill") event.goto(1);
                        if(trigger.player==player){
                            if(player.isLinked()){
                                var targets=game.filterPlayer(function(current){return current!=player&&!current.isLinked()});
                                for(var i=0;i<targets.length;i++){
                                    if(!targets[i].isLinked()) targets[i].link(true);
                                }
                            }
                        }else{
                            if(player.isLinked()){
                                if(!trigger.player.isLinked()) trigger.player.link(true);
                            }
                        }
                        event.finish();
                        return;
                        "step 1"
                        var players=game.filterPlayer(function(current){
                            return current!=player;
                        });
                        for(var i=0;i<players.length;i++){
                            var skills=players[i].skills.slice(0)
                            for(var j=0;j<skills.length;j++){
                                /*var str=get.info(skills[j])
                                var info=JSON.stringify(str)*/
                                var info=get.info(skills[j])
                                var info2=lib.translate[skills[j]+'_info']
                                if(info&&info2&&!info.sub&&!players[i].awakenedSkills.includes(skills[j])){
                                    if(info2.indexOf("横置")!=-1){
                                        players[i].disableSkill(skills[j],skills[j],true);
                                        game.log(players[i],"的技能"+get.translation(skills[j])+"失效了");
                                    }
                                }
                            }
                        }
                    },
                    subSkill:{
                        'damage':{
                            trigger:{
                                player:'damageBegin3',
                            },
                            direct:true,
                            priority:10,
                            sub:true,
                            filter:function(event,player){
                                if(!player.isLinked()) return false;
                                if(game.hasNature(event,'fire')) return false;
                                return true;
                            },
                            content:function(){
                                trigger.num++
                            },
                            ai:{
                                fireAttack:true,
                                effect:{
                                    target:function(card,player,target,current){
								        if(card.nature=='fire') return 2;
								        if(get.tag(card,'fireDamage')&&current<0) return 2;
								    },
								},
							},
                        },
                        'ai':{
                            ai:{
                                effect:{
                                    target:function(card,player,target){
                                        var targets=game.filterPlayer(function(current){return current.hasSkill('xjzh_sanguo_liansuo');});
                                        if(card.name=='tiesuo'){
                                            if(targets!=target&&targets.isLinked()) return 0;
                                        }
								    },
								},
								result:{
								    player:function(card,player,target){
								        var targets=game.filterPlayer(function(current){return current.hasSkill('xjzh_sanguo_liansuo');});
								        if(targets.isDead()) return;
								        var suit=get.suit(card);
								        var number=get.number(card);
								        if(suit=='club') return max?max=number:null;
								    },
								},
							},
                        },
                    },
                },
				"xjzh_sanguo_moulue":{
					trigger:{
						global:"useCardToTargeted",
					},
					usable:1,
                    audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
					    if(player.countCards('h')==0) return false;
						if(get.suit(event.card)!='club') return false;
                        if(!event.targets||!event.targets.length) return false;
                        if(!event.isFirstTarget) return false;
					    if(player.getStorage('xjzh_sanguo_moulue').includes(get.number(event.card))) return false;
					    return get.itemtype(event.cards)=='cards'&&get.position(event.cards[0],true)=='o';
					},
                    mod:{
                        aiOrder:function(player,card,num){
                            var history=player.getHistory('useCard',function(evt){
                                return evt.card&&get.suit(evt.card)=='club';
                            });
                            if(!history.length)return;
                            if(typeof get.number(history[history.length-1].card)!='number')return;
                            if(typeof get.number(card)!='number')return;
                            if(get.suit(card)!='club')return;
                            if(get.number(card)>get.number(history[history.length-1].card)){
                                return num+(10/(get.number(card)-get.number(history[history.length-1].card)));
                            }
                        },
                    },
					prompt:function(event,player){
						return '〖谋略〗：是否弃置一张手牌获得【'+get.translation(event.card)+'】';
					},
					frequent:true,
					priority:9,
					marktext:'谋',
					intro:{
					    content:'已记录点数：$',
					},
					check:function(event,player){
					    var cards=Array.from(ui.discardPile.childNodes).filter(card=>get.suit(card)!='club');
					    if(!cards.length) return 0;
					    return 1;
					},
					content:function(){
						"step 0"
						player.chooseCard(1,'h','〖谋略〗：是否弃置一张手牌获得【'+get.translation(trigger.card)+'〗').set('ai',function(card){
						    var num=get.number(trigger.card)
						    return get.number(card)>num;
						});
						"step 1"
						if(result.bool){
						    player.lose(result.cards[0],ui.ordering);
						    player.gain(trigger.cards,'gain2','log');
						    var num1=get.number(trigger.card);
						    var num2=get.number(result.cards[0]);
						    if(num2<=num1) return;
						    var number=Math.min(player.maxHp,Math.abs(num2-num1));
						    var cards=Array.from(ui.discardPile.childNodes).filter(card=>get.suit(card)!='club');
						    if(!cards.length) return;
						    var num3=Math.min(number,cards.length);
						    player.chooseCardButton([1,num3],cards,'〖谋略〗：选择获得至多'+get.translation(num3)+'张牌').set('filterButton',function(button){
						         return get.suit(button.link)!='club';
				    		}).set('ai',function(button){
						        return get.value(button.link);
						    });
						}
						"step 2"
						if(result.links){
						    player.gain(result.links,'gain2','log');
						    var number=get.number(trigger.card)
						    if(!player.getStorage('xjzh_sanguo_moulue').includes(number)) player.markAuto('xjzh_sanguo_moulue',[number]);
						}
					},
				},
				"xjzh_sanguo_shijiu":{
				    mod:{
						cardname:function (card,player,name){
							if(card.name=='jiu') return 'sha';
						},
					},
					trigger:{
					    player:"useCardBefore",
					},
					filter:function(event,player){
					    return event.card.name=="sha"||get.color(event.card)=="black";
					},
					forced:true,
					priority:12,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:1",
					content:function(){
					    player.useCard({name:'jiu'},player,false);
					},
				},
				"xjzh_sanguo_shayi":{
					mod:{
						cardUsable:function(card,player,num){
							if(card.name=='sha') return Infinity;
						},
						targetInRange:function(card,player,target,now){
							if(card.name=='sha') return true;
						},
					},
					trigger:{
					    target:"useCardToBefore",
					},
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
					    if(!event.cards||!event.cards.length) return false;
					    if(get.name(event.card)!="sha") return false;
					    if(!player.hasSha()) return false;
					    if(!game.hasPlayer(function(current){return current.hasMark('xjzh_sanguo_zhenhun')})) return false;
					    return true;
					},
					content:function(){
					    "step 0"
					    player.chooseToDiscard(1,"〖杀意〗：弃置一张【杀】将此牌目标改为任意武将牌上有“魂”的角色",function(card){
					        return get.name(card)=="sha";
					    }).set('ai',function(){
					        var num=game.countPlayer(function(current){return current.hasMark('xjzh_sanguo_zhenhun')});
					        return num;
					    });
					    "step 1"
					    if(result.bool){
					        var num=game.countPlayer(function(current){return current.hasMark('xjzh_sanguo_zhenhun')});
					        player.chooseTarget([1,num],true,"〖杀意〗：选择任意名武将牌上有“魂”的角色",function(target){
					            if(!target.hasMark('xjzh_sanguo_zhenhun')) return false;
					            return target!=player;
					        }).set('ai',function(target){
					            return -get.attitude(player,target);
					        });
					    }else{
					        event.finish();
					        return;
					    }
					    "step 2"
					    if(result.bool&&result.targets.length){
					        trigger.targets.remove(player);
					        for(var i of result.targets){
					            trigger.targets.push(i);
					            i.removeMark("xjzh_sanguo_zhenhun");
					        }
					    }
					},
				},
				"xjzh_sanguo_zhenhun":{
				    trigger:{
				        player:"damageAfter",
						source:"damageAfter",
					},
					audio:"ext:仙家之魂/audio/skill:1",
					priority:16,
					forced:true,
					locked:true,
					marktext:"魂",
					intro:{
						name:"震魂",
						content:"mark",
					},
					group:["xjzh_sanguo_zhenhun_sha","xjzh_sanguo_zhenhun_die"],
					filter:function(event,player){
					    if(event.source.isDead()||event.player.isDead()) return false;
					    if(event.player==player) return event.source!=player;
					    return event.source==player;
					},
					content:function(){
					    "step 0"
					    if(trigger.source==player){
					        trigger.player.addMark("xjzh_sanguo_zhenhun",1);
					        event.num=trigger.player.countMark("xjzh_sanguo_zhenhun");
					        if(num>=3){
					            event.target=trigger.player
					            event.goto(1);
					        }
					    }else{
					        trigger.source.addMark("xjzh_sanguo_zhenhun",1);
					        event.num=trigger.source.countMark("xjzh_sanguo_zhenhun");
					        if(num>=3){
					            event.target=trigger.source
					            event.goto(1);
					        }
					    }
					    event.finish();
					    "step 1"
					    player.chooseBool("〖震魂〗：是否令"+get.translation(event.target)+"失去"+event.num+"点体力？").set('ai',function(){
					        return -get.attitude(player,target);
					    }).set('target',event.target);
					    "step 2"
					    if(result.bool){
					        event.target.loseHp(event.num);
					    }
					},
					subSkill:{
					    "sha":{
					        trigger:{
					            player:"shaBegin",
					        },
					        forced:true,
					        priority:12,
					        firstDo:true,
					        sub:true,
					        filter:function(event,player){
					            return event.target.hasMark("xjzh_sanguo_zhenhun");
					        },
					        content:function(){
					            trigger.target.addTempSkill('baiban','shaAfter');
					            player.draw(trigger.target.countMark('xjzh_sanguo_zhenhun'));
					        },
					    },
					    "die":{
					        trigger:{
					            global:"dieAfter",
					        },
					        forceDie:true,
					        direct:true,
					        priority:-10,
					        lastDo:true,
					        filter:function(event,player){
					            if(event.player!=player) return event.player.hasMark('xjzh_sanguo_zhenhun');
					            return game.countPlayer(function(current){return current.hasMark('xjzh_sanguo_zhenhun')});
					        },
					        content:function(){
					            if(trigger.player!=player){
					                trigger.player.clearMark("xjzh_sanguo_zhenhun",false);
					            }else{
					                var players=game.filterPlayer(function(current){return current.hasMark('xjzh_sanguo_zhenhun')});
					                for(var i=0;i<players.length;i++){
					                    players[i].clearMark("xjzh_sanguo_zhenhun",false);
					                }
					            }
					        },
					    },
					},
				},
				"xjzh_sanguo_bujiao":{
				    trigger:{
				        global:"phaseUseBegin",
				    },
				    direct:true,
				    priority:13,
				    marktext:"教",
				    intro:{
				        content:"expansion",
				        markcount:"expansion",
				    },
				    onremove:function(player,skill){
					    var cards=player.getExpansions(skill);
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
				    group:["xjzh_sanguo_bujiao2"],
				    filter:function(event,player){
				        return event.player!=player&&event.player.countCards("h");
				    },
				    content:function(){
				        "step 0"
				        player.chooseCard("he",1,"〖布教〗：是否交给"+get.translation(trigger.player)+"一张牌").set('ai',function(card){
				            if(get.attitude(trigger.player,player)>0){
				                return 8-get.value(card);
				            }else{
				                return 4-get.value(card);
				            }
				        });
				        "step 1"
				        if(result.bool){
				            player.logSkill("xjzh_sanguo_bujiao",trigger.player);
				            //game.playXH(['xjzh_sanguo_bujiao1'].randomGet());
				            trigger.player.gain(result.cards[0],"draw",player);
				            player.addToExpansion(get.cards()[0],"gain2",trigger.player).gaintag.add("xjzh_sanguo_bujiao");
				        }
				    },
				},
				"xjzh_sanguo_bujiao2": {
					sub:true,
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
						return player.getExpansions("xjzh_sanguo_bujiao").length>0;
					},
					enable:"phaseUse",
					chooseButton:{
						dialog:function(event,player){
							return ui.create.dialog('〖布教〗：选择一张牌使用同类型的一张牌',player.getExpansions('xjzh_sanguo_bujiao'),'hidden');
						},
						check:function(button){
							var player=_status.event.player;
							var type=get.type(button.link,'trick');
							var recover=0,lose=1;
							for(var i=0;i<game.players.length;i++){
								if(!game.players[i].isOut()){
									if(game.players[i].hp<game.players[i].maxHp){
										if(get.attitude(player,game.players[i])>0){
											if(game.players[i].hp<2){
												lose--;
												recover+=0.5;
											}
											lose--;
											recover++;
										}
										else if(get.attitude(player,game.players[i])<0){
											if(game.players[i].hp<2){
												lose++;
												recover-=0.5;
											}
											lose++;
											recover--;
										}
									}
									else{
										if(get.attitude(player,game.players[i])>0){
											lose--;
										}
										else if(get.attitude(player,game.players[i])<0){
											lose++;
										}
									}
								}
							}
							var equipTarget=false;
							var shaTarget=false;
							var shunTarget=false;
							var chaiTarget=false;
							for(var i=0;i<game.players.length;i++){
								if(get.attitude(player,game.players[i])>0){
									if(player!=game.players[i]&&!game.players[i].get('e',{
									subtype:get.subtype(button.link)})
									[0]&&get.attitude(player,game.players[i])>0){
										equipTarget=true;
									}
								}
								if(player.canUse('shunshou',game.players[i])&&get.effect(game.players[i],{name:'shunshou'},player)){
									shunTarget=true;
								}
								if(player.canUse('guohe', game.players[i])&&get.effect(game.players[i],{name:'guohe'},player)>=0){
									chaiTarget=true;
								}
								if(player.canUse('sha',game.players[i])&&get.effect(game.players[i],{name:'sha'},player)>0){
									shaTarget=true;
								}
							}
							if(player.isDamaged()) return (type=='basic')?2:-1;
							if(shaTarget&&player.countCards('h','sha')&&!player.countCards('h','jiu')) return (type=='basic')?1:-1;
							if(lose>recover&&lose>0) return (type=='trick')?1:-1;
							if(lose<recover&&recover>0) return (type=='trick')?1:-1;
							if(equipTarget) return (type=='equip')?1:-1;
							if(shunTarget||chaiTarget) return (type=='trick')?1:-1;
							if(shaTarget&&!player.countCards('h','sha')) return (type=='basic')?1:-1;
							return 0;
						},
						backup:function(links,player){
							if(get.type(links[0])=='trick'){
								return{
									cards:links,
									chooseButton:{
										dialog:function(){
											var list=[];
											for(var i of lib.inpile){
												if(!lib.translate[i+'_info']) continue;
												if(i=='wuxie'||i=='xjzh_card_lianqidan') continue;
												if(lib.card[i].type=='trick') list.push(['非延时锦囊','',i]);
											}
											return ui.create.dialog('〖布教〗:请选择想要使用的非延时锦囊牌', [list,'vcard']);
										},
										filter:function(button,player){
											return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
										},
										check:function(button){
											var player=_status.event.player;
											var recover=0,lose=1;
											for (var i=0;i<game.players.length;i++){
												if(!game.players[i].isOut()){
													if(game.players[i].hp<game.players[i].maxHp){
														if(get.attitude(player,game.players[i])>0){
															if(game.players[i].hp<2){
																lose--;
																recover+=0.5;
															}
															lose--;
															recover++;
														}
														else if(get.attitude(player,game.players[i])<0){
															if(game.players[i].hp<2){
																lose++;
																recover-=0.5;
															}
															lose++;
															recover--;
														}
													}
													else{
														if(get.attitude(player,game.players[i])>0){
															lose--;
														}
														else if(get.attitude(player,game.players[i])<0){
															lose++;
														}
													}
												}
											}
											var shunTarget=false;
											var chaiTarget=false;
											for(var i=0;i<game.players.length;i++){
												if(player.canUse('shunshou',game.players[i])&&get.effect(game.players[i],{name:'shunshou'},player)){
													shunTarget=true;
												}
												if(player.canUse('guohe',game.players[i])&&get.effect(game.players[i],{name:'guohe'},player)>=0){
													chaiTarget=true;
												}
											}
											if(lose>recover&&lose>0) return (button.link[2]=='nanman')?1:-1;
											if(lose<recover&&recover>0) return (button.link[2]=='taoyuan')?1:-1;
											if(shunTarget) return (button.link[2]=='shunshou')?1:-1;
											if(chaiTarget) return (button.link[2]=='guohe')?1:-1;
											return (button.link[2]=='wuzhong')?1:-1;
										},
										backup:function(links,player){
											return{
												filterCard:function(){
													return false;
												},
												selectCard:-1,
												popname:true,
												viewAs:{name:links[0][2]},
												onuse:function(result,player){
													result.cards=lib.skill.xjzh_sanguo_bujiao2_backup.cards;
													var card=result.cards[0];
													player.logSkill('xjzh_sanguo_bujiao2',result.targets);
												}
											}
										},
										prompt:function(links,player){
											return '将一张牌当'+get.translation(links[0][2])+'使用';
										}
									}
								}
							}
							else if(get.type(links[0],'trick')=='basic'){
								return{
									cards:links,
									chooseButton:{
										dialog:function(){
											var list=[];
											for(var i of lib.inpile){
												if(!lib.translate[i+'_info']) continue;
												if(i=='shan') continue;
												if(i=='sha'){
													for(var j of lib.inpile_nature){
														list.push(['basic','',i,j]);
													}
												}
												if(lib.card[i].type=='basic') list.push(['basic','',i]);
											}
											return ui.create.dialog('〖布教〗:请选择想要使用的基本牌', [list, 'vcard']);
										},
										filter:function(button,player){
											return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
										},
										check:function(button){
											var player=_status.event.player;
											var shaTarget=false;
											for(var i=0;i<game.players.length;i++){
												if(player.canUse('sha',game.players[i])&&get.effect(game.players[i],{name:'sha'},
												player)>0){
													shaTarget=true;
												}
											}
											if(player.isDamaged()) return (button.link[2]=='tao')?1:-1;
											if(shaTarget&&player.countCards('h','sha') && !player.countCards('h','jiu')) return (button.link[2]=='jiu')?1:-1;
											if(shaTarget&&!player.countCards('h','sha')) return (button.link[2]=='sha')?1:-1;
											return (button.link[2]=='sha')?1:-1;
										},
										backup:function(links,player){
											return{
												filterCard:function(){
													return false;
												},
												selectCard:-1,
												audio:"ext:仙家之魂/audio/skill:1",
												popname:true,
												viewAs:{name:links[0][2]},
												onuse:function(result,player){
													result.cards=lib.skill.xjzh_sanguo_bujiao2_backup.cards;
													var card=result.cards[0];
													player.logSkill('xjzh_sanguo_bujiao2', result.targets);
												}
											}
										},
										prompt:function(links,player){
											return '〖布教〗：将一张牌当【'+get.translation(links[0][2])+'】使用';
										}
									}
								}
							}
							else if(get.type(links[0])=='equip'){
								return{
									cards:links,
									chooseButton:{
										dialog:function(){
											var list=[];
											for(var i of lib.inpile){
												if(!lib.translate[i+'_info']) continue;
												var typex=get.subtype(links[0])
												if(lib.card[i].subtype==typex) list.push(['装备','',i]);
											}
											return ui.create.dialog('〖布教〗:请选择想要使用的装备', [list,'vcard']);
										},
										filter:function(button,player){
											return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
										},
										check:function(button){
											var player=_status.event.player;
											var num=[1,2,3,4,5];
											for(var i of num){
												if(player.getEquip(i)) return 0
											}
											return 1;
										},
										backup:function(links,player){
											return{
												filterCard:function(){
													return false;
												},
												selectCard:-1,
												/*filterTarget:function(card,player,target){
												return target==player;
												},
												selectTarget:1,*/
												popname:true,
												viewAs:{name:links[0][2]},
												onuse:function(result,player){
													result.cards=lib.skill.xjzh_sanguo_bujiao2_backup.cards;
													var card=result.cards[0];
													player.logSkill('xjzh_sanguo_bujiao2',result.targets);
												}
											}
										},
										prompt:function(links,player){
											return '将一张牌当'+get.translation(links[0][2])+'使用';
										}
									}
								}
							}
							else if(get.type(links[0])=='delay'){
								return{
									cards:links,
									chooseButton:{
										dialog:function(){
											var list=[];
											for(var i of lib.inpile){
												if(!lib.translate[i+'_info']) continue;
												if(lib.card[i].type=='delay') list.push(['延时锦囊','',i]);
											}
											return ui.create.dialog('〖布教〗:请选择想要使用的延时锦囊牌', [list,'vcard']);
										},
										filter:function(button,player){
											return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
										},
										check:function(button){
											var player=_status.event.player;
											for (var i=0;i<game.players.length;i++){
												if(get.attitude(player,game.players[i])<0) return 1;
											}
											return -1;
										},
										backup:function(links,player){
											return{
												filterCard:function(){
													return false;
												},
												selectCard:-1,
												filterTarget:function(card,player,target){
													return lib.filter.judge({name:links[0][2]},player,target)&&player!=target;
												},
												selectTarget:1,
												popname:true,
												viewAs:{name:links[0][2]},
												onuse:function(result,player){
													result.cards=lib.skill.xjzh_sanguo_bujiao2_backup.cards;
													var card=result.cards[0];
													player.logSkill('xjzh_sanguo_bujiao2',result.targets);
												}
											}
										},
										prompt:function(links,player){
											return '将一张牌当'+get.translation(links[0][2])+'使用';
										}
									}
								}
							}
						}
					},
					ai:{
						order:6,
						result:{
							player:function(player){
								if(player.hp<=2) return 3;
								return player.getExpansions('xjzh_sanguo_bujiao').length-1;
							},
						}
					}
				},
				"xjzh_sanguo_fangshu":{
					trigger:{
					    player:"phaseUseBegin",
					},
					locked:true,
					audio:"ext:仙家之魂/audio/skill:1",
					content:function (){
						"step 0"
						event.num=Math.max(2,game.countPlayer(function(current){return current.group==player.group}));
						event.cards=get.cards(event.num);
						player.showCards(event.cards);
						"step 1"
						event.num1=[];
						event.num2=[];
						for(var i=0;i<event.cards.length;i++){
							if(get.color(event.cards[i])=='black'){
								event.num1.push(event.cards[i]);
							}
							if(get.color(event.cards[i])=='red'){
								event.num2.push(event.cards[i]);
							}
						}
						"step 2"
						if(event.num1.length>=event.num2.length){
						    player.gain(event.num1,"gain2",player);
						    player.chooseTarget('〖方术〗:请选择'+get.translation(event.num1.length)+'个目标令其受到一点雷电伤害或选择1个目标令其受到'+get.translation(event.num1.length)+'点雷电伤害(至多为'+get.translation(event.num1.length)+')',[1,event.num1.length],function(card,player,target){
					    		return target!=player;
				    		})
					    	.set('ai',function(target){
							    return get.damageEffect(target, player, player, 'thunder');
					    	});
						}else{
						    var num=Math.max(1,event.num1.length)
						    player.chooseCardButton(event.cards,num,"请选择"+get.cnNumber(num)+"张牌将其置于武将牌上").set('ai',function(button){
						        return Math.random();
						    });
						    event.goto(4);
						}
						"step 3"
						if(result.bool){
							var targets=result.targets;
							if(targets.length==1){
							    var num=Math.min(event.num1.length,2);
							    targets[0].damage("thunder",num,"nocard","nosource")
							    event.finish();
							    return;
							}
							for(var i=0;i<targets.length;i++){
							    targets[i].damage("thunder",1,"nocard","nosource");
							}
							event.finish();
							return;
						}
						else{
							event.finish();
							return;
						}
						"step 4"
						if(result.bool){
						    for(var i=0;i<result.links.length;i++){
						        player.addToExpansion(result.links[i],"gain2",player).gaintag.add("xjzh_sanguo_bujiao");
						    }
						}
					},
					ai:{
						order:12,
						expose:0.8,
						result:{
						    player:1,
						},
					},
				},
				"xjzh_sanguo_taiping":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:'damageEnd',
					},
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
					    if(event.numFixed||event.cancelled) return false;
					    if(!event.source||event.nosource) return false;
						return true;
					},
					priority:13,
					frequent:true,
					prompt:function(event,player){
					    return "〖太平〗:你受到"+get.translation(event.source)+"的伤害，是否判定？";
					},
					content:function(){
						"step 0"
						trigger.source.judge(function(card){
							if(get.color(card)=='red') return -2;
							if(get.color(card)=='black') return -3;
						}).judge2=function(result){
							return result.bool==false?true:false;
						};
						"step 1"
						if(result.color=="black"){
						    player.addToExpansion(result.card,"gain2",player).gaintag.add("xjzh_sanguo_bujiao");
						    player.draw();
						    event.finish();
						}
						else if(result.color=="red"){
						    player.recover();
						}
						"step 2"
						while (_status.event.name!='phase') {
						    _status.event=_status.event.parent;
					    }
					    _status.event.finish();
				    	_status.event.untrigger(true);
					},
					ai:{
						effect:{
							target:1,
						}
					}
				},
				"xjzh_sanguo_shanxi":{
					trigger:{
						global:"judgeEnd",
					},
					global:["xjzh_sanguo_shanxi_jinshandian"],
					group:["xjzh_sanguo_shanxi1","xjzh_sanguo_shanxi2","xjzh_sanguo_shanxi3","xjzh_sanguo_shanxi4","xjzh_sanguo_shanxi5"],
					audio:"ext:仙家之魂/audio/skill:2",
					mod:{
						ignoredHandcard:function(card,player){
						    if(card.hasGaintag('xjzh_sanguo_shanxi')) return true;
						},
						aiValue:function(player,card,num){
							if(card.hasGaintag('xjzh_sanguo_shanxi')) return 10;
						},
						targetEnabled:function (card){
							if(card.name=='shandian') return false;
						},
					},
					forced:true,
					locked:true,
					filter:function (event, player) {
						return get.position(event.result.card,true)=='o'&&
						event.card&&event.card.name=='shandian'&&event.player!=player;
					},
					content:function () {
						player.gain(trigger.result.card,'gain2','log');
					},
					subSkill:{
					    "jinshandian":{
					        sub:true,
					        locked:true,
					        mod:{
					            cardEnabled:function(card,player){
					                if(game.countPlayer(function(current){
					                    return current.hasJudge("shandian");
					                })>=3&&player.name!="xjzh_sanguo_zhangning"
					                &&card.name=='shandian') return false;
					            },
					            cardEnabled2:function(card,player){
					                if(game.countPlayer(function(current){
					                    return current.hasJudge("shandian");
					                })>=3&&player.name!="xjzh_sanguo_zhangning"
					                &&card.name=='shandian') return false;
					            },
					        },
					    },
					},
				},
				"xjzh_sanguo_shanxi1":{
					audio:"xjzh_sanguo_shanxi",
					trigger:{
						global:["useCard","respond"],
					},
					filter:function (event,player){
						if(game.countPlayer(function(current){
							return current.hasJudge("shandian");
						})<3&&event.card.name=='shan'
						&&event.player!=player) return true;
						return false;
					},
					forced:true,
					popup:false,
					sub:true,
					check:function(event,player){return 1;},
					content:function () {
						'step 0'
						var card=game.createCard('shandian');
						if(card){
							event.card=card;
							player.chooseTarget("选择一个目标将一张闪电置入其判定区",function(card,player,target){
								return lib.filter.targetEnabled({name:'shandian'},target,target);
							}).ai=function(target){
								var now=_status.currentPhase.next;
								for(var i=0;i<10;i++){
									if(get.attitude(player,now)<0) return target==now;
									else{
										now=now.next;
									}
								}
								return false;
							}
						}
						else {
							event.finish();
						}
						'step 1'
						if(result.bool){
							player.logSkill('xjzh_sanguo_shanxi1',result.targets[0]);
							result.targets[0].$gain2(event.card);
							player.line(result.targets[0],'thunder');
							result.targets[0].addJudge(event.card);
						}
					},
				},
				"xjzh_sanguo_shanxi2":{
					audio:"xjzh_sanguo_shanxi",
					trigger:{
						global:"phaseJudgeBegin",
					},
					popup:false,
					sub:true,
					filter:function (event,player){
						if(game.countPlayer(function(current){
							return current.hasJudge("shandian");
						})>=1&&event.player!=player) return true;
						return false;
					},
					check:function(event,player){
					    return get.attitude(player,event.player)<0;
					},
					prompt:function(event,player){
						return "是否发动〖闪戏〗移除场上一张【闪电】牌令"+get.translation(event.player)+"进行一次【闪电】判定？";
					},
					content:function (){
					    "step 0"
					    player.chooseTarget("选择一名角色移除其判定区的【闪电】牌令"+get.translation(trigger.player)+"进行一次【闪电】判定",function(card,player,target){
					        return target.hasJudge("shandian");
					    }).set('ai',function(target){
					        return get.attitude(player,target)>=0;
					    });
					    "step 1"
					    if(result.bool){
					        player.logSkill("xjzh_sanguo_shanxi2",trigger.player);
					        event.target=result.targets[0]
					        event.judgestr='闪电';
					        trigger.player.judge(function(card){
					            if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10) return -6;
					            return 0;
					        },event.judgestr).judge2=(result=>result.bool===false);
					    }else{
					        event.finish();
					    }
					    "step 2"
					    if(result.bool===false){
					        trigger.player.damage(3,'thunder','nosource');
					    }
					    "step 3"
					    if(!event.target) return;
					    player.gain(result.card,'gain2','log');
					    var cards=event.target.getCards("j",{name:"shandian"});
					    if(cards) event.target.discard(cards);
					},
					ai:{
						expose:0.5,
					},
				},
				"xjzh_sanguo_shanxi3":{
					forced:true,
					locked:true,
					popup:false,
					trigger:{
						global:"dyingBegin",
					},
					sub:true,
					audio:"xjzh_sanguo_shanxi",
					content:function (){
						player.addTempSkill("xjzh_sanguo_shanxi3_tao","dyingAfter");
					},
					subSkill:{
						"tao":{
							mod:{
								cardname:function (card,player,name){
									if(card.name=='shandian') return 'tao';
								},
							},
							sub:true,
						},
					},
				},
				"xjzh_sanguo_shanxi4":{
					mod:{
						cardUsable:function(card,player,num){
							if(card.name=='sha'){
							    if(card.nature=='thunder') return Infinity;
							    if(get.suit(card)=="spade"&&card.number>=2&&card.number<=9) return Infinity;
							}
						},
					},
					trigger:{
						player:'useCard',
					},
					sub:true,
					audio:"xjzh_sanguo_shanxi",
					filter:function(event,player){
					    if(event.card.name=='sha'){
					        if(game.hasNature(event,'thunder')) return true;
					        if(get.suit(event.card)=="spade"&&event.card.number>=2&&event.card.number<=9) return true;
					    }
						return false;
					},
					forced:true,
					content:function(){
						if(player.stat[player.stat.length-1].card.sha>0){
							player.stat[player.stat.length-1].card.sha--;
						}
					},
				},
				"xjzh_sanguo_shanxi5":{
					trigger:{
						player:['drawAfter','gainAfter'],
						global:['gameDrawAfter'],
					},
					sub:true,
					direct:true,
					firstDo:true,
					content:function(){
					    var cards=player.getCards('h');
					    for(var i of cards){
					        if(i.name=="shan"||i.name=="shandian"||(i.name=="sha"&&i.nature=="thunder")){
					            if(!i.hasGaintag('xjzh_sanguo_shanxi')) player.addGaintag(i,'xjzh_sanguo_shanxi');
					        }
					    }
					},
				},
				"xjzh_sanguo_leijix":{
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						global:["useCard","respond"],
						player:'damageAfter',
					},
					forced:true,
					filter:function (event,player,name){
					    if(name=="damageAfter") return true;
					    if(event.player!=player) return event.card.name=="shandian";
					    return event.card.name=="shan";
					},
					content:function(){
						"step 0"
						player.judge(function(card){
							return get.color(card)=='black'?1:-1;
						});
						"step 1"
						player.gain(result.card,'gain2','log');
						if(result.judge>0){
							player.chooseTarget(get.prompt("〖雷祭〗：选择一个目标令其受到至多2点雷电伤害"),function(card,player,target){
								return player!=target;
							}).ai=function(target){
								return get.damageEffect(target,player,player,'thunder');
							};
						}
						else{
							player.chooseTarget(get.prompt("雷祭：令其横置/取消横置武将牌"),[1,2]).set('ai',function(target){
								if(get.attitude(player,target)<0&&!target.isLinked()) return 2;
								if(get.attitude(player,target)>0&&target.isLinked()) return 2;
								return 0.5
							});
							event.goto(3);
						}
						"step 2"
						if(result.bool){
							player.line(result.targets,"thunder");
							result.targets[0].damage("thunder",result.targets[0].hasJudge("shandian")?2:1);
						}
						event.finish();
						"step 3"
						if(result.bool){
							player.line(result.targets,"xjzh_sanguo_leijix");
							for(var i=0;i<result.targets.length;i++){
							    result.targets[i].link();
							    if(result.targets[i].hasJudge("shandian")){
							        player.draw();
							    }
							}
						}
					},
					ai:{
						expose:0.3,
					},
				},
				"xjzh_sanguo_shendao":{
					trigger:{
						global:'judge',
					},
					locked:true,
					priority:1,
					unique:true,
					prompt:function(event,player){
						return ""+get.translation(event.player)+"进行"+get.translation(event.judgestr)+"的判定，亮出的判定牌为"+get.translation(event.player.judging[0])+"，是否发动〖神道〗替换判定牌？";
					},
					group:["xjzh_sanguo_shendao2"],
					content:function(){
						"step 0"
						if(player.hp<=1){
							event.cards=get.cards(2);
						}
						else{
							event.cards=get.cards(Math.min(4,player.hp));
						}
						player.chooseCardButton(true,event.cards,'神道：选择一张牌作为你的'+trigger.judgestr+'判定结果').ai=function(button){
							if(get.attitude(player,trigger.player)>0){
								return 1+trigger.judge(button.link);
							}
							if(get.attitude(player,trigger.player)<0){
								return 1-trigger.judge(button.link);
							}
							return 0;
						};
						"step 1"
						if(!result.bool){
							event.finish();
							return;
						}
						player.logSkill('xjzh_sanguo_shendao',trigger.player);
						var card=result.links[0];
						event.cards.remove(card);
						while(event.cards.length){
                            var card2=event.cards.pop();                        
                            card2.fix();
                            ui.cardPile.insertBefore(card2,ui.cardPile.firstChild);
                        };	
						var judgestr=get.translation(trigger.player)+'的'+trigger.judgestr+'判定';
						event.videoId=lib.status.videoId++;
						event.dialog=ui.create.dialog(judgestr);
						event.dialog.classList.add('center');
						event.dialog.videoId=event.videoId;
						game.addVideo('judge1',player,[get.cardInfo(card),judgestr,event.videoId]);
						for(var i=0;i<event.cards.length;i++) event.cards[i].discard();
						var node;
						if(game.chess){
							node=card.copy('thrown','center',ui.arena).animate('start');
						}
						else{
							node=player.$throwordered(card.copy(),true);
						}
						node.classList.add('thrownhighlight');
						ui.arena.classList.add('thrownhighlight');
						if(card){
							trigger.cancel();
							trigger.result={
								card:card,
								judge:trigger.judge(card),
								node:node,
								number:get.number(card),
								suit:get.suit(card),
								color:get.color(card),
							};
							if(trigger.result.judge>0){
								trigger.result.bool=true;
								trigger.player.popup('洗具');
							}
							if(trigger.result.judge<0){
								trigger.result.bool=false;
								trigger.player.popup('杯具');
							}
							game.log(trigger.player,'的判定结果为',card);
							trigger.direct=true;
							trigger.position.appendChild(card);
							game.delay(2);
						}
						else{
							event.finish();
						}
						"step 2"
						ui.arena.classList.remove('thrownhighlight');
						game.addVideo('judge2',null,event.videoId);
						event.dialog.close();
						ui.clear();
						var card=trigger.result.card;
						trigger.position.appendChild(card);
						trigger.result.node.delete();
						game.delay();
					},
				},
				"xjzh_sanguo_shendao2":{
					trigger:{
						global:"phaseZhunbeiBegin",
					},
					forced:true,
					locked:true,
					priority:66,
					sub:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function (event,player){
						return !player.isMaxHandcard(true);
					},
					content:function () {
						'step 0'
						event.cards=get.cards(2);
						player.chooseCardButton("选择一张牌获得之",event.cards,true);
						'step 1'
						if(result.bool){
							player.gain(result.links[0],"gain2");
							event.cards.remove(result.links[0]);
							ui.cardPile.insertBefore(event.cards[0],ui.cardPile.firstChild);
						}
					},
				},
				"xjzh_sanguo_leihun":{
					forced:true,
					locked:true,
					group:["xjzh_sanguo_leihun1","xjzh_sanguo_leihun2"],
					trigger:{
						global:"damageBegin2",
					},
					priority:-8,
					forced:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function (event,player){
						return event.player!=player&&game.hasNature(event,"thunder");
					},
					content:function (){
						trigger.source=player;
					},
				},
				"xjzh_sanguo_leihun1":{
					trigger:{
						source:'damageBegin1',
					},
					forced:true,
					locked:true,
					popup:false,
					sub:true,
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						game.setNature(trigger,'thunder',true);
					},
					ai:{
						threaten:9,
					},
				},
				"xjzh_sanguo_leihun2":{
					trigger:{player:'damageBegin4'},
					forced:true,
					locked:true,
					popup:false,
					sub:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event){
						return game.hasNature(event,'thunder');
					},
					content:function(){
						trigger.cancel();
						player.recover(trigger.num);
					},
					ai:{
						threaten:9,
						nothunder:true,
						effect:{
							target:function(card,player,target,current){
								if(get.tag(card,'thunderDamage')){
									if(target.isHealthy()) return 'zerotarget';
									if(target.hp==1) return [0,2];
									return [0,1];
								}
							},
						},
					},
				},
                "xjzh_sanguo_dianjie":{
					unique:true,
					forceDie:true,
					enable:"phaseUse",
					filterTarget:function(card,player,target){
						return target!=player;
					},
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function (event, player){
						return player.countMark("xjzh_sanguo_dianjie2")>=6;
					},
					locked:true,
					group:["xjzh_sanguo_dianjie2"],
					check:function(){return -1},
					selectTarget:[1,3],
					multitarget:true,
					multiline:true,
					targetprompt:["目标一","目标二","目标三"],
                    content:function (){
                        "step 0"
						player.removeMark("xjzh_sanguo_dianjie2",6);
						targets.sortBySeat();
                        "step 1"
                        if(targets.length==3){
                            for(var i=0;i<targets.length;i++){
                                game.xjzh_playEffect("xjzh_skillEffect_leiji2",targets[i]);
                                targets[i].damage('nocard','thunder');
                            }
                            event.finish();
                        }
                        else if(targets.length==2){
                            player.chooseTarget('请选择受到2点伤害的角色',true,function(card,player,target){
                                return _status.event.targets.includes(target);
                            }).set('ai',function(target){
                                var player=_status.event.player;
                                return get.damageEffect(target,player,player,'thunder');
                            }).set('forceDie',true).set('targets',targets);
                            event.goto(3);
                        }
                        else if(targets.length==1){
                            player.chooseControl("1点","2点","3点").set('prompt','请选择伤害点数').set('ai',function(){
                                return "3点";
                            }).set('forceDie',true);
                        }
                        "step 2"
                        var xnum=0
                        if(result.control=="1点") xnum=1;
                        if(result.control=="2点") xnum=2;
                        if(result.control=="3点") xnum=3;
                        game.xjzh_playEffect("xjzh_skillEffect_leiji2",targets[0]);
                        targets[0].damage(xnum,'nocard','thunder');
                        event.finish();
                        "step 3"
                        if(result.bool){
                            result.targets[0].damage(2,'nocard','thunder');
                            game.xjzh_playEffect("xjzh_skillEffect_leiji2",result.targets[0]);
                            for(var i=0;i<targets.length;i++){
                                if(result.targets[0]!=targets[i]){
                                    targets[i].damage('nocard','thunder');
                                    game.xjzh_playEffect("xjzh_skillEffect_leiji2",targets[i]);
                                }
                            }
                        }
                    },
                    ai:{
                        order:12,
                        damage:true,
                        thunderAttack:true,
                        result:{
                            target:function(player,target){
                                if(target.hasSkillTag('nodamage')) return 0;
                                if(player.hasUnknown()) return 0;
                                return get.damageEffect(target,player,player,'thunder');
                            },
                        },
                    },
                },
				"xjzh_sanguo_dianjie2":{
					trigger:{
						player:"damageAfter",
						source:"damageAfter",
					},
					sub:true,
					forced:true,
					locked:true,
					popup:false,
					marktext:"电",
					mark:true,
					audio:"xjzh_sanguo_dianjie",
					intro:{
						name:"电界",
						content:"当前拥有#个标记，6个标记可发动技能电界",
					},
					filter:function (event,player){
					    if(event.getParent("xjzh_sanguo_dianjie").name=="xjzh_sanguo_dianjie") return false;
						return game.hasNature(event,"thunder");
					},
					content:function (){
						player.addMark("xjzh_sanguo_dianjie2",trigger.num);
						player.update();
					},
				},
				"xjzh_sanguo_huangtian":{
					trigger:{
						player:"enterGame",
						global:"gameStart",
					},
					forced:true,
					locked:true,
					popup:false,
					zhuSkill:true,
					audio:"ext:仙家之魂/audio/skill:3",
					filter:function (event,player){
						if(player.hasZhuSkill('xjzh_sanguo_huangtian')) return true;
						return false;
					},
					content:function (){
						var skills=['releiji','xjzh_sanguo_yingbing'];
						player.addAdditionalSkill('xjzh_sanguo_huangtian',skills);
					},
				},
				"xjzh_sanguo_yingbing":{
					audio:"ext:仙家之魂/audio/skill:2",
					usable:1,
					trigger:{
						global:"judgeEnd",
					},
					sub:true,
					filter:function (event,player){
						if(!event.result) return false;
						if(!event.result.card) return false;
						if(event.nogain&&event.nogain(event.result.card)){
							return false;
						}
						return event.player!=player;
					},
					check:function (event,player){
						return get.attitude(player,event.player)<0;
					},
					content:function (){
						if(get.color(trigger.result.card)=='black'){
							player.useCard({name:'sha'},trigger.player,false);
						}
						else{
							player.draw();
						}
					},
				},
				"xjzh_sanguo_shenji":{
					mod:{
						selectTarget:function(card,player,range){
							if(range[1]==-1) return;
							if(player.getEquip(1)) return;
							if(game.players.length<3) return;
							if(card.name=='sha') range[1]+=2;
						},
						aiValue:function(player,card,num){
							if(game.players.length<=3&&card.name=="fangtian") return player.maxHp+3.5;
						},
					},
					trigger:{
						player:"useCard",
					},
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function (event,player){
						return player.get('e', '1')&&(event.card.name=="sha"||event.card.name=="juedou");
					},
					frequent:true,
					locked:true,
					priority:99,
					content:function (){
						"step 0"
						player.addTempSkill("wushuang","useCardAfter");
						"step 1"
						if(player.hasCard(function(card){
							return card.name=="fangtian";
						},'e')){
							if(trigger.baseDamage!=undefined){
								trigger.baseDamage+=1;
								game.log(trigger.player,'令【',trigger.card,'】伤害加一。')
							}
						}
					},
					ai:{
						effect:{
							target:function(card,player,target,current){
								if(get.subtype(card)=='equip1'&&card.name!="fangtian") return -1;
								if(get.subtype(card)=='equip1'&&card.name=="fangtian") return 0.5;
							},
						},
					},
				},
				"xjzh_sanguo_shenji2":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:"useCard",
					},
					forced:true,
					sub:true,
					filter:function (event,player){
						return event.card.name=="fangtian"&&event.player!=player;
					},
					content:function (){
						player.gain(card,'gain2','log');
						player.say("吾乃飞将军吕奉先");
					},
				},
				"xjzh_sanguo_jingjia":{
					forced:true,
					locked:true,
					charlotte:true,
					group:["xjzh_sanguo_jingjia_wuqi","xjzh_sanguo_jingjia_fangju","xjzh_sanguo_jingjia_zuoji","xjzh_sanguo_jingjia_baowu"],
					subSkill:{
						wuqi:{
							mod:{
								cardUsable:function(card,player,num){
									if(player.getEquip(1)&&card.name=='sha') return num+1;
								},
							},
							sub:true,
						},
						fangju:{
							trigger:{
								player:"damageBegin4",
							},
							forced:true,
							filter:function (event,player){
								return player.getEquip(2)&&event.num>1;
							},
							content:function (){
								trigger.num=1;
							},
							sub:true,
						},
						zuoji:{
							trigger:{
								player:"phaseDrawBegin",
							},
							forced:true,
							filter:function (event,player){
								return (player.getEquip(3)||player.getEquip(4));
							},
							content:function(){
								trigger.num++;
							},
							sub:true,
						},
						baowu:{
							trigger:{
								player:"phaseJudgeBefore",
							},
							forced:true,
							filter:function (event,player){
								return player.getEquip(5);
							},
							content:function (){
								trigger.cancel();
								game.log(player,'跳过了判定阶段');
							},
							sub:true,
						},
					},
				},
				"xjzh_sanguo_shenwei":{
					unique:true,
					trigger:{
					player:'phaseDiscardBegin'},
					forced:true,
					locked:true,
					priority:66,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						return !event.audioed;
					},
					content:function(){
						trigger.audioed=true;
					},
					mod:{
						maxHandcard:function(player,current){
							return current+Math.min(3,game.players.length-1);
						}
					}
				},
				"xjzh_sanguo_shenqu":{
					group:'xjzh_sanguo_shenqu2',
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:'phaseZhunbeiBegin',
					},
					filter:function(event,player){
						return player.countCards('h')<=player.maxHp;
					},
					frequent:true,
					locked:true,
					priority:10,
					content:function(){
						player.draw();
					}
				},
				"xjzh_sanguo_shenqu2":{
					trigger:{
						player:'damageAfter',
					},
					direct:true,
					sub:true,
					filter:function(event,player){
						return player.hasSkillTag('respondTao')||player.countCards('h','tao')>0;
					},
					content:function(){
						player.chooseToUse({name:'tao'},'神躯：是否使用一张桃？').logSkill='xjzh_sanguo_shenqu2';
					}
				},
				"xjzh_sanguo_baonulvbu":{
					trigger:{
						player:["changeHp","damageEnd","loseHpEnd","loseMaxHpEnd"],
					},
					forced:true,
					locked:true,
					unique:true,
					juexingji:true,
					limited:true,
					skillAnimation:true,
					animationColor:"metal",
					animationStr:"这战场由我主宰",
					derivation:["xjzh_sanguo_jingjia","xjzh_sanguo_shenqu","xjzh_sanguo_shenwei","xjzh_sanguo_shenfen"],
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						return player.hp<=2;
					},
					content:function(){
						"step 0"
						if(player.maxHp!=2){
							player.maxHp=2
							player.hp=2
							player.update();
						}
						"step 1"
						player.addSkill("xjzh_sanguo_jingjia",true);
						player.addSkill("xjzh_sanguo_shenwei",true);
						player.addSkill("xjzh_sanguo_shenqu",true);
						player.addSkill("xjzh_sanguo_shenfen",true);
						player.removeSkill("xjzh_sanguo_baonulvbu",true);
						"step 2"
						player.phase("xjzh_sanguo_baonulvbu");
						if(player.name2&&player.name2=="xjzh_sanguo_lvbu"){
						    game.broadcastAll()+player.node.avatar2.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_sanguo_splvbu1.jpg');
						    event.goto(3);
						}
						game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_sanguo_splvbu1.jpg');
						"step 3"
						while(_status.event.name!='phase'){
							_status.event=_status.event.parent;
						}
						_status.event.finish();
						_status.event.untrigger(true);
					},
					ai:{
						maixue:true,
						maixue_hp:true,
						effect:{
							target:function(card,player,target){
								if(get.tag(card,'damage')||get.tag(card,'loseHp')) return [1,0.7];
							}
						}
					}
				},
				"xjzh_sanguo_shenfen":{
					trigger:{
						player:"dying",
					},
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					group:["xjzh_sanguo_shenfen_hp"],
					content:function(){
						"step 0"
						game.countPlayer(function(current){
						    current.addTempSkill('xjzh_sanguo_shenfen_nosave','_saveAfter');
						});
						"step 1"
						player.awakenSkill('xjzh_sanguo_shenfen');
						event.delay=false;
						event.targets=game.filterPlayer();
						event.targets.remove(player);
						event.targets.sort(lib.sort.seat);
						player.line(event.targets,'green');
						event.targets2=event.targets.slice(0);
						event.targets3=event.targets.slice(0);
						"step 2"
						if(event.targets2.length){
							event.targets2.shift().damage('nocard');
							event.redo();
						}
						"step 3"
						if(event.targets.length){
							event.current=event.targets.shift()
							if(event.current.countCards('e')) event.delay=true;
							event.current.discard(event.current.getCards('e')).delay=false;
						}
						"step 4"
						if(event.delay) game.delay(0.5);
						event.delay=false;
						if(event.targets.length) event.goto(2);
						"step 5"
						if(event.targets3.length){
							var target=event.targets3.shift();
							target.chooseToDiscard(4,'h',true).delay=false;
							if(target.countCards('h')) event.delay=true;
						}
						"step 6"
						if(event.delay) game.delay(0.5);
						event.delay=false;
						if(event.targets3.length) event.goto(4);
						"step 7"
						player.die();
					},
					subSkill:{
						"nosave":{
							mod:{
								cardSavable:function(){return false},
							},
							sub:true,
						},
						"hp":{
							trigger:{
								player:["gainMaxHpBegin","loseMaxHpEnd"],
							},
							forced:true,
							sub:true,
							audio:"ext:仙家之魂/audio/skill:3",
							content:function(){
								trigger.cancel();
								if(trigger.name=="gainMaxHp"){
									game.log(player,'无法获得体力上限');
								}
								else{
									game.log(player,'无法失去体力上限');
								}
							},
						},
					},
				},
				//《玄武江湖·李辟尘·七剑》
				"xjzh_sanguo_luoshen":{
					trigger:{
						player:"useCard",
					},
					priority:72,
					unique:true,
					frequent:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						var evt=player.getLastUsed(1);
						if(!evt||!evt.card) return false;
						if(!event.isPhaseUsing(player)) return false;
						var evt2=evt.getParent('phaseUse');
						if(!evt2||evt2.name!='phaseUse'||evt2.player!=player) return false;
						return true;
					},
					group:["xjzh_sanguo_luoshen1","xjzh_sanguo_luoshen2"],
					content:function(){
						"step 0"
						var bool=false;
						var evt=player.getLastUsed(1);
						var suita=get.suit(evt.card);
						var suitb=get.suit(trigger.card);
						if(suita&&suita!=suitb){
                            bool=true;
                        }
                        if(bool){
                            player.draw();
                        }else{
                            event.finish();
                        }
						/*"step 1"
						player.chooseCard('h').set('ai',function(card){
						    var player=_status.event.player;
						    var next=_status.event.player.next;
						    var value=get.value(card);
						    if(next){
						        var att=get.attitude(player,next);
						        if(att>0){
						            value+=20;
						        }else{
						            value-=20;
						        }
						    }
						    return -value;
					    }).set('prompt','请选择一张牌，将其置于牌堆顶。');
						"step 2"
						if(result.bool){
							event.card=result.cards[0];
							event.card.fix();
							player.lose(result.cards[0],ui.cardPile,'insert');
							game.log(player,'将一张牌置于牌堆顶');
							player.$throw(1,1000);
							game.updateRoundNumber();
						}
						else{
							event.finish();
						}*/
					},
					ai:{
						threaten:2,
						guanxing:true,
					},
				},
				"xjzh_sanguo_luoshen1":{
					trigger:{
						global:"judgeAfter",
					},
					sub:true,
					priority:100,
					audio:"ext:仙家之魂/audio/skill:2",
					frequent:function(event,card){
						if(get.color(event.result.card)=='red') return true;
						return false;
					},
					locked:true,
					content:function (){
						"step 0"
						if(get.color(trigger.result.card)=='red'){
							player.draw();
							event.finish();
						}
						else if(get.color(trigger.result.card)=='black'){
							player.chooseTarget('选择一个目标弃置其一张牌',function(card,player,target){
								return target!=player&&target.countCards("hej");
							})
							.set('ai',function(target){
								if(target.countCards("j")) return get.attitude(player,target);
								if(target.countCards("he")) return -get.attitude(player,target);
							});
						}
						"step 1"
						if(result.bool){
							game.playXH(['xjzh_sanguo_luoshen_11','xjzh_sanguo_luoshen_12'].randomGet());
							player.discardPlayerCard(result.targets[0],'hej','是否弃置其一张牌？');
						}
					},
				},
				"xjzh_sanguo_luoshen2":{
					trigger:{
						player:["drawBegin"],
					},
					audio:"ext:仙家之魂/audio/skill:2",
					forced:true,
					popup:false,
					sub:true,
					content:function(){
						trigger.bottom=true;
					},
				},
				"xjzh_sanguo_qixian":{
					inherit:'qixian',
				},
				"xjzh_sanguo_qingguo":{
					trigger:{
						player:["chooseToRespondBegin","chooseToUseBegin"],
					},
					group:["xjzh_sanguo_qingguo1"],
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						if(event.responded) return false;
						if(event.bagua_skill) return false;
						if(!event.filterCard||!event.filterCard({name:'shan'},player,event)) return false;
						if(event.name=='chooseToRespond'&&!lib.filter.cardRespondable({name:'shan'},player,event)) return false;
						if(player.countCards("h",{name:'shan'})) return false;
						return true;
					},
					check:function(event,player){
						if(event&&(event.ai||event.ai1)){
							var ai=event.ai||event.ai1;
							var tmp=_status.event;
							_status.event=event;
							var result=ai({name:'shan'},_status.event.player,event);
							_status.event=tmp;
							return result>0;
						}
						return true;
					},
					content:function(){
						"step 0"
						trigger.xjzh_sanguo_qingguo=true;
						player.judge('xjzh_sanguo_qingguo',function(card){
							return (get.color(card)=='black')?1.5:-0.5
						});
						"step 1"
						if(result.judge>0){
							trigger.untrigger();
							trigger.set('responded',true);
							trigger.result={bool:true,card:{name:'shan',isCard:true}}
							event.finish();
						}
						else if(player.countCards("he")>=2){
							player.chooseToDiscard('he',2,'弃置两张牌视为使用一张闪').set('ai',function(card){
								if(player.countCards("he")<=2) return 0.5;
								if(player.countCards("h",{name:"shan"})) return 0;
								if(trigger.baseDamage==1) return 1.5;
								return 4-get.value(card);
							});
						}
						"step 2"
						if(result.bool){
							trigger.untrigger();
							trigger.set('responded',true);
							trigger.result={bool:true,card:{name:'shan',isCard:true}}
						}
					},
					ai:{
						respondShan:true,
						effect:{
							target:function(card,player,target,effect){
								if(get.tag(card,'respondShan')) return 0.5;
							},
						},
					},
				},
				"xjzh_sanguo_qingguo1":{
					trigger:{
						global:"dying",
					},
					sub:true,
					prompt:function(event,player){
						return "〖倾国〗：是否进行一次判定，若为♥则"+get.translation(event.player)+"视为使用一张桃";
					},
					audio:"xjzh_sanguo_qingguo",
					filter:function(event,player){
						if(event.player.countCards("h",{name:"tao"})>0) return false;
						return true;
					},
					check:function(event,player){
						if(event.player.hasSkill("duanchang")&&game.players.length>=3&&event.source==player) return true;
						if(get.attitude(player,event.player)>0) return true;
						return false;
					},
					content:function(){
						"step 0"
						trigger.player.judge('xjzh_sanguo_qingguo',function(card){
							return (get.color(card)=='red')?1.5:-0.5
						});
						"step 1"
						if(result.suit=="heart"){
							trigger.player.useCard({name:'tao',isCard:true},trigger.player);
						}
						else if(result.suit=="diamond"){
						    if(player.countCards('h',{suit:"heart"})<=0) return;
							player.chooseToDiscard('是否弃置一张♥手牌令'+get.translation(trigger.player)+'视为使用一张桃',function(card){
							    return get.suit(card)=="heart";
							}).ai=function(card){
								if(get.attitude(player,trigger.player)>0) return 4-get.value(card);
								return -1;
							}
						}
						"step 2"
						if(result.bool){
							trigger.player.useCard({name:'tao',isCard:true},trigger.player);
						}
					},
					ai:{
						save:true,
						respondTao:0.25,
						expose:0.8,
						effect:{
							target:function(card,player,target,effect){
								if(get.tag(card,'respondTao')) return 0.25;
							},
						},
					},
				},
				"xjzh_sanguo_mingzheng":{
					trigger:{
						global:"phaseDrawBegin",
						player:"damageEnd",
					},
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
					    if(event.name=="damage") return true;
					    return event.player.group=="wu";
					},
					derivation:"xjzh_sanguo_baozheng",
					content:function(){
						"step 0"
						if(trigger.name=="damage"){
						    game.playXH('xjzh_sanguo_baozheng_damage');
						    player.removeSkill("xjzh_sanguo_mingzheng");
						    player.addSkill("xjzh_sanguo_baozheng");
						    event.finish();
						    return;
						}
						if(trigger.player!=player){
						    if(player.hasZhuSkill('xjzh_sanguo_renjun')){
						        trigger.num+=2;
						    }else{
						        trigger.num++
						    }
						}else{
						    var num=game.countPlayer(function(current){
						        return current.group=="wu";
						    })
						    if(num>0) player.draw(num);
						}
					},
				},
				"xjzh_sanguo_baozheng":{
					trigger:{
						global:"phaseZhunbeiBegin",
					},
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:4",
					filter:function(event,player){
						return event.player!=player;
					},
					marktext:"暴",
					intro:{
					    name:"暴政",
					    content:"mark",
					},
					group:["xjzh_sanguo_baozheng2"],
					content:function(){
						var hs=trigger.player.getCards('he');
						if(hs.length){
							player.gainPlayerCard('he',true,trigger.player);
							trigger.player.addMark("xjzh_sanguo_baozheng",1);
						}
					},
				},
				"xjzh_sanguo_baozheng2":{
					trigger:{
						source:"damageBegin",
					},
					forced:true,
					locked:true,
					sub:true,
					audio:"xjzh_sanguo_baozheng",
					filter:function(event,player){
					    return event.player.hasMark('xjzh_sanguo_baozheng');
					    return 
					},
					content:function(){
					    "step 0"
					    if(player.hasZhuSkill('xjzh_sanguo_renjun')) trigger.num+=2;
					    else trigger.num++;
					    "step 1"
					    var num=trigger.player.countMark('xjzh_sanguo_baozheng');
					    player.draw(num);
					    trigger.player.clearMark('xjzh_sanguo_baozheng');
					},
				},
				'xjzh_sanguo_renjun':{
				    trigger:{
				        player:"phaseUseBegin",
				    },
					locked:true,
					forced:true,
					unique:true,
					zhuSkill:true,
					priority:3,
					filter:function(event,player){
					    return player.hasZhuSkill('xjzh_sanguo_renjun');
					},
					content:function(){
					    if(player.hasSkill("xjzh_sanguo_mingzheng")){
					        player.chooseUseTarget({name:"wugu"},true);
						    game.playXH('xjzh_sanguo_mingzheng1');
					    }else{
					        player.chooseUseTarget({name:"wanjian"},true);
					        game.playXH('xjzh_sanguo_baozheng3');
					    }
					},
				},
				"xjzh_sanguo_wusheng":{
					trigger:{
						player:"damageEnd",
						source:"damageSource",
					},
					forced:true,
					locked:true,
					priority:99,
					audio:"ext:仙家之魂/audio/skill:4",
					group:["xjzh_sanguo_wusheng_sha"],
					init:function (player){
						player.storage.xjzh_sanguo_wusheng=0;
						player.syncStorage('xjzh_sanguo_wusheng');
					},
					marktext:"武",
					intro:{
						content:"mark",
					},
					mod:{
						targetInRange:function(card,player,target,now){
							if(get.name(card)=='sha'){
								if(_status.event&&_status.event.name=='chooseToUse'&&_status.event.player==player&&_status.event.skill=='xjzh_sanguo_wusheng_sha'){
									return true;
								}
							}
						},
						cardUsable:function(card,player,num){
							if(card.name=='sha'&&player.getEquip(1)&&player.getEquip(1).name=='qinglong') return player.getDamagedHp()+num;
						},
					},
					filter:function(event,player,card,skill){
						if(player.hasSkill("xjzh_sanguo_wusheng1")){
							return false;
						}
						return true;
					},
					content:function(){
						player.addMark("xjzh_sanguo_wusheng",trigger.num);
					},
					subSkill:{
						"sha":{
							enable:["chooseToUse","chooseToRespond"],
							audio:"ext:仙家之魂/audio/skill:2",
							filter:function(event,player){
								if(player.hasMark("xjzh_sanguo_wusheng")) return true;
								return false;
							},
							check:function(card,event,player){
								if(!player.countCards('h','sha')) return 1;
								return 0;
							},
							cardaudio:false,
							popname:true,
							popup:false,
							filterCard:false,
							selectCard:0,
							viewAs:{name:"sha",color:"red"},
							onuse:function(result,player){
								player.removeMark("xjzh_sanguo_wusheng",1);
								player.addTempSkill("xjzh_sanguo_wusheng1","shaAfter");
							},
							onrespond:function(result,player){
								player.removeMark("xjzh_sanguo_wusheng",1);
							},
							ai:{
								order:3,
								result:{
									player:function(player,current){
										if(!player.countCards('h','sha')) return 1;
										return 0;
									},
									target:function(player,target,card,isLink){
										var eff=function(){
											if(!isLink&&player.hasSkill('jiu')){
												if(!target.hasSkillTag('filterDamage',null,{
													player:player,
													card:card,
													jiu:true,
												})){
													if(get.attitude(player,target)>0){
														return -7;
													}
													else{
														return -4;
													}
												}
												return -0.5;
											}
											return -1.5;
										};
										if(!isLink&&target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
											target:target,
											card:card,
										},true)) return eff/1.2;
										return eff;
									},
								},
								respondSha:true,
								canLink:function(player,target,card){
									if(!target.isLinked()&&!player.hasSkill('wutiesuolian_skill')) return false;
									if(target.mayHaveShan()&&!player.hasSkillTag('directHit_ai',true,{
										target:target,
										card:card,
									},
									true)) return false;
									if(player.hasSkill('jueqing')||target.hasSkill('gangzhi')||target.hasSkill('gangzhi')) return false;
									return true;
								},
								basic:{
									useful:[5,1],
									value:[5,1],
								},
								tag:{
									respond:1,
									respondShan:1,
									damage:function(card){
										if(card.nature=='poison') return;
										return 1;
									},
								},
							},
							sub:true,
						},
					},
					ai:{
						effect:{
							player:function(card,player,target){
								if(card.name=='sha') return [1,1.5];
							},
							target:function(card,player,target){
								if(card.name=='sha') return 0.7;
							},
						},
					},
				},
				"xjzh_sanguo_wusheng1":{
					sub:true,
				},
				"xjzh_sanguo_shuixi":{
					enable:"phaseUse",
					usable:1,
					filterCard:true,
					selectCard:1,
					position:'h',
					audio:"ext:仙家之魂/audio/skill:2",
					selectTarget:function(){
						return ui.selected.cards.length;
					},
					filterTarget:function (card,player,target){
						return player!=target&&target.countCards("he")>0;
					},
					filter:function(event,player,card){
						return player.countCards("h")>0;
					},
					content:function (){
						"step 0"
						if(target.countCards("e")){
							var res=get.damageEffect(target,player);
							target.chooseToDiscard(target.countCards('e'),'he','弃置'+get.cnNumber(target.countCards('e'))+'张牌或失去体力').set('ai',function(card){
								if(card.name=='tao') return -10;
								if(card.name=='jiu'&&_status.event.player.hp==1) return -10;
								return 8-get.value(card);
							}).set('res',res);
						}
						else{
							event.goto(2);
						}
						"step 1"
						if(!result.bool){
							if(target.countCards('e')<2){
								target.loseHp();
							}
							else{
								target.loseHp(target.countCards('e')-1);
							}
							event.finish();
						}
						else{
							event.finish();
						}
						"step 2"
						target.showCards(target.getCards('h'));
						"step 3"
						player.gain(target.getCards('he',function(card){
							return get.suit(card)==get.suit(cards[0]);
						}),'gain2','log');
					},
					ai:{
						order:12,
						expose:0.5,
						threaten:1.8,
						result:{
							player:function(player,target){
								if(get.attitude(player,target)<0&&target.countCards('e')) return 1.5;
								if(get.attitude(player,target)<0&&target.countCards('h')&&target.countCards('e')) return 2;
								if(get.attitude(player,target)<0&&target.countCards('h')) return 1.5;
								if(get.attitude(player,target)<0&&target.countCards('he')<=0) return 1;
								return 1;
							},
							target:0,
						},
					},
				},
				"xjzh_sanguo_wushen":{
					trigger:{
						player:"damageAfter",
					},
					forced:true,
					popup:false,
					locked:true,
					unique:true,
					priority:-1,
					marktext:"神",
					onremove:true,
					intro:{content:'已记录武将：$'},
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function(event,player){
						if(player.hp<=Math.ceil(player.maxHp/2)){
						    if(!player.getStorage('xjzh_sanguo_wushen').includes(event.source)) return true;
						}
						return false;
					},
					content:function(){
						"step 0"
						if(!player.getStorage('xjzh_sanguo_wushen').includes(trigger.source)){
							player.markAuto('xjzh_sanguo_wushen',[trigger.source]);
						    player.phase("xjzh_sanguo_wushen");
						}
						else{
							event.finish()
							return;
						}
						"step 1"
						while(_status.event.name!='phase'){
							_status.event=_status.event.parent;
						}
						_status.event.finish();
						_status.event.untrigger(true);
					},
					group:["xjzh_sanguo_wushen_recover","xjzh_sanguo_wushen_wuqi","xjzh_sanguo_wushen_qitao"],
					subSkill:{
						"recover":{
							trigger:{
								player:"recoverBefore",
							},
							forced:true,
							sub:true,
							priority:-1,
							audio:"ext:仙家之魂/audio/skill:1",
							content:function(){
								trigger.cancel();
							},
							ai:{
								effect:{
									player:function(card,player,target){
										if(get.tag(card,'recover')) return [0,0];
									},
									target:function(card,player,target){
										if(get.tag(card,'recover')) return [0,0];
									},
								},
							},
						},
						"wuqi":{
							forced:true,
							sub:true,
							trigger:{
								player:"phaseDrawBegin",
							},
							priority:-1,
							mod:{
								aiValue:function(player,card,num){
									if(card.name=="qinglong") return player.getDamagedHp()+3.5;
								},
							},
							content:function(){
								if(player.getEquip(1)){
									trigger.num++
								}
								else{
									player.useCard(game.createCard("qinglong"),player);
								}
							},
						},
						"qitao":{
							trigger:{
								player:"phaseDiscardBegin",
							},
							forced:true,
							sub:true,
							priority:99,
							audio:"ext:仙家之魂/audio/skill:1",
							filter:function(event,player){
								return player.countCards('h');
							},
							content:function(){
								"step 0"
								player.showCards(player.getCards('h'));
								"step 1"
								var cards=player.getCards('h',function(card){
									return get.name(card)=='tao';
								});
								event.numx=cards.length>=3?3:cards.length;
								player.discard(cards);
								if(event.numx>0) player.draw(event.numx);
								"step 2"
								if(event.numx>=2){
									player.chooseTarget('武神：选择一个目标令其受到'+get.cnNumber(event.numx-1)+'点伤害',function(card,player,target){
										return player!=target;
									}).set('ai',function(target){
										return get.damageEffect(target,player,player);
									});
								}
								"step 3"
								if(result.bool){
									game.playXH(['xjzh_sanguo_wushen_qitao_1','xjzh_sanguo_wushen_qitao_2.mp3'].randomGet());
									result.targets[0].damage(event.numx-1);
								}
							},
						},
					},
				},
				"xjzh_sanguo_mashu":{
					audio:"ext:仙家之魂/audio/skill:1",
					firstDo:true,
					trigger:{
						player:"useCard1",
					},
					forced:true,
					filter:function(event,player){
						return !event.audioed&&event.card.name=='sha';
					},
					content:function(){
						trigger.audioed=true;
					},
					mod:{
						globalFrom:function(from,to,distance){
							return distance-1;
						},
						cardUsable:function(card,player,num){
							if(player.hp<=1&&card.name=='sha') return num+1;
						}
					},
				},
				"xjzh_sanguo_feijiang":{
					enable:"phaseUse",
					locked:true,
					unique:true,
					usable:1,
					group:["xjzh_sanguo_feijiang_recover"],
					audio:"ext:仙家之魂/audio/skill:1",
					content:function(){
						'step 0'
						if(player.hp>1){
							player.damage("nosource");
						}
						else{
							if(player.maxHp>1){
								player.loseMaxHp();
							}
							else{
								event.goto(1);
							}
						}
						player.discard(player.getCards("h"));
						'step 1'
						player.draw();
						'step 2'
						event.card=result[0];
						player.addTempSkill("xjzh_sanguo_feijiang_qipai","phaseEnd");
						if(event.card.name!="sha"){
							player.draw(get.number(event.card));
						}
						else{
							player.addTempSkill("xjzh_sanguo_feijiang_zenshang","phaseEnd");
							player.addTempSkill("xjzh_sanguo_feijiang_buff","phaseEnd");
						}
					},
					ai:{
						expose:0.5,
						order:function(){
							var player=_status.event.player;
							if(player.getCardUsable('sha')>0){
								if(player.hasCard("sha","h")) return 0.5;
								if(!player.hasCard("sha","h")) return 1;
							}
							if(!player.getStat().skill.xjzh_sanguo_jiwu){
								if(player.hasSkill('xjzh_sanguo_qiangxilvbu')&&!player.hasSkill('xjzh_sanguo_xuanfenglvbu')&&!player.hasSkill('xjzh_sanguo_wanshalvbu')&&!player.hasSkill('xjzh_sanguo_tiejilvbu')) return 10;
								if(player.hasSkill('xjzh_sanguo_qiangxilvbu')||!player.hasSkill('xjzh_sanguo_xuanfenglvbu')||!player.hasSkill('xjzh_sanguo_wanshalvbu')||!player.hasSkill('xjzh_sanguo_tiejilvbu')){
									if(player.countCards("h")>0) return 0.1;
									if(player.countCards("h")<=0) return 10;
									return 0.5;
								}
							}
							if(player.hp<=2){
								if(player.countCards("h")>0) return 0.5;
								if(player.countCards("h")<=0) return 1;
							}
							return 1;
						},
						result:{
							player:function(player){
								var player=_status.event.player;
								if(player.getCardUsable('sha')>0){
									if(player.hasCard("sha","h")) return 0.5;
									if(!player.hasCard("sha","h")) return 1;
								}
								if(!player.getStat().skill.xjzh_sanguo_jiwu){
									if(player.hasSkill('xjzh_sanguo_qiangxilvbu')&&!player.hasSkill('xjzh_sanguo_xuanfenglvbu')&&!player.hasSkill('xjzh_sanguo_wanshalvbu')&&!player.hasSkill('xjzh_sanguo_tiejilvbu')) return 10;
									if(player.hasSkill('xjzh_sanguo_qiangxilvbu')||!player.hasSkill('xjzh_sanguo_xuanfenglvbu')||!player.hasSkill('xjzh_sanguo_wanshalvbu')||!player.hasSkill('xjzh_sanguo_tiejilvbu')){
										if(player.countCards("h")>0) return 0.1;
										if(player.countCards("h")<=0) return 10;
										return 0.5;
									}
								}
								if(player.hp<=2){
									if(player.countCards("h")>0) return 0.5;
									if(player.countCards("h")<=0) return 1;
								}
								return 1;
							}
						}
					},
					subSkill:{
						"zenshang":{
							trigger:{
								source:"damageBegin",
							},
							sub:true,
							forced:true,
							content:function(){
								trigger.num++
							},
						},
						"qipai":{
						    trigger:{
						        player:"phaseDiscardBegin",
						    },
						    direct:true,
						    sub:true,
						    content:function(){
						        var num=player.countCards('h');
						        if(num>1) player.chooseToDiscard(num-1,true);
						        else if(num<1) player.draw();
						    },
						},
						"buff":{
							mod:{
								attackRange:function (player,range,distance){
									return Infinity;
								},
							},
							sub:true,
						},
						"recover":{
							trigger:{
								player:"phaseAfter",
							},
							direct:true,
							sub:true,
							filter:function(event,player){
								return player.getStat('damage');
							},
							content:function(){
								player.recover();
							},
						}
					},
				},
				"xjzh_sanguo_qiangxilvbu":{
					audio:"ext:仙家之魂/audio/skill:2",
					inherit:'reqiangxi',
					sub:true,
					usable:2,
					filterTarget:function(card,player,target){
						if(player==target) return false;
						if(target.hasSkill('reqiangxi_off')) return false;
						return true;
					},
				},
				"xjzh_sanguo_tiejilvbu":{
					audio:"ext:仙家之魂/audio/skill:1",
					inherit:'retieji',
					priority:-1,
					sub:true,
				},
				"xjzh_sanguo_wanshalvbu":{
					audio:"ext:仙家之魂/audio/skill:2",
					inherit:'wansha',
					sub:true,
				},
				"xjzh_sanguo_xuanfenglvbu":{
					audio:"ext:仙家之魂/audio/skill:2",
					inherit:'rexuanfeng',
					sub:true,
				},
				"xjzh_sanguo_jiwu":{
					audio:"ext:仙家之魂/audio/skill:2",
					enable:'phaseUse',
					derivation:["xjzh_sanguo_qiangxilvbu","xjzh_sanguo_tiejilvbu","xjzh_sanguo_xuanfenglvbu","xjzh_sanguo_wanshalvbu"],
					filter:function(event,player){
						if(player.countCards('h')==0) return false;
						if(!player.hasSkill('xjzh_sanguo_qiangxilvbu')) return true;
						if(!player.hasSkill('xjzh_sanguo_tiejilvbu')) return true;
						if(!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return true;
						if(!player.hasSkill('xjzh_sanguo_wanshalvbu')) return true;
						return false;
					},
					filterCard:true,
					position:'he',
					sub:true,
					check:function(card){
						if(get.position(card)=='e'&&_status.event.player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return 16-get.value(card);
						return 7-get.value(card);
					},
					content:function(){
						'step 0'
						var list=[];
						if(!player.hasSkill('xjzh_sanguo_qiangxilvbu')) list.push('xjzh_sanguo_qiangxilvbu');
						if(!player.hasSkill('xjzh_sanguo_tiejilvbu')) list.push('xjzh_sanguo_tiejilvbu');
						if(!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) list.push('xjzh_sanguo_xuanfenglvbu');
						if(!player.hasSkill('xjzh_sanguo_wanshalvbu')) list.push('xjzh_sanguo_wanshalvbu');
						if(list.length==1){
							player.addTempSkill(list[0]);
							event.finish();
						}
						else{
							player.chooseControl(list,function(){
								if(list.includes('xjzh_sanguo_xuanfenglvbu')&&player.countCards('he',{type:'equip'})) return 'xjzh_sanguo_xuanfenglvbu';
								if(!player.getStat().skill.xjzh_sanguo_qiangxilvbu){
									if(player.hasSkill('xjzh_sanguo_qiangxilvbu')&&player.getEquip(1)&&list.includes('xjzh_sanguo_xuanfenglvbu')) return 'xjzh_sanguo_xuanfenglvbu';
									if(list.includes('xjzh_sanguo_wanshalvbu')||list.includes('xjzh_sanguo_qiangxilvbu')){
										var players=game.filterPlayer();
										for(var i=0;i<players.length;i++){
											if(players[i].hp==1&&get.attitude(player,players[i])<0){
												if(list.includes('xjzh_sanguo_wanshalvbu')) return 'xjzh_sanguo_wanshalvbu';
												if(list.includes('xjzh_sanguo_qiangxilvbu')) return 'xjzh_sanguo_qiangxilvbu';
											}
										}
									}
								}
								if(list.includes('xjzh_sanguo_qiangxilvbu')) return 'xjzh_sanguo_qiangxilvbu';
								if(list.includes('xjzh_sanguo_wanshalvbu')) return 'xjzh_sanguo_wanshalvbu';
								if(list.includes('xjzh_sanguo_xuanfenglvbu')) return 'xjzh_sanguo_xuanfenglvbu';
								return 'xjzh_sanguo_tiejilvbu';
							})
							.set('prompt','选择获得一项技能直到回合结束');
						}
						'step 1'
						player.addTempSkill(result.control);
						player.popup(get.translation(result.control));
					},
					ai:{
						order:function(){
							var player=_status.event.player;
							if(player.countCards('e',{
							type:'equip'})
							) return 10;
							if(!player.getStat().skill.xjzh_sanguo_qiangxilvbu){
								if(player.hasSkill('xjzh_sanguo_qiangxilvbu')&&player.getEquip(1)&&!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return 10;
								if(player.hasSkill('xjzh_sanguo_wanshalvbu')) return 1;
								var players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(players[i].hp==1&&get.attitude(player,players[i])<0) return 10;
								}
							}
							return 1;
						},
						result:{
							player:function(player){
								if(player.countCards('e',{
								type:'equip'})
								) return 1;
								if(!player.getStat().skill.xjzh_sanguo_qiangxilvbu){
									if(player.hasSkill('xjzh_sanguo_qiangxilvbu')&&player.getEquip(1)&&!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return 1;
									if(!player.hasSkill('xjzh_sanguo_wanshalvbu')||!player.hasSkill('xjzh_sanguo_qiangxilvbu')){
										var players=game.filterPlayer();
										for(var i=0;i<players.length;i++){
											if(players[i].hp==1&&get.attitude(player,players[i])<0) return 1;
										}
									}
								}
								return 0;
							}
						}
					}
				},
				"xjzh_sanguo_shishu":{
					marktext:"书",
					trigger:{
						source:"damageSource",
						player:"damageEnd",
					},
					forced:true,
					locked:true,
					priority:-1,
					unique:true,
					audio:"ext:仙家之魂/audio/skill:1",
					init:function (player){
						player.addMark('xjzh_sanguo_shishu',2);
					},
					filter:function(event,player){
						var evt=event.getParent(2);
					    if(evt&&["xjzh_sanguo_huoling","xjzh_sanguo_fenyin"].includes(evt.skill)) return false;
						return true;
					},
					content:function(){
						player.addMark('xjzh_sanguo_shishu',trigger.num);
					},
					intro:{
						name:"识书",
						content:"mark",
					},
					ai:{
						combo:"xjzh_sanguo_fenyin",
						maixie:true,
						maixie_hp:true,
					},
				},
				"xjzh_sanguo_huoling":{
					enable:"chooseToUse",
					filterCard:false,
					selectCard:0,
					viewAs:{
					    name:"huogong",
					    nature:"fire",
					},
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					viewAsFilter:function(player){
						return player.hasMark("xjzh_sanguo_shishu");
					},
					onuse:function(result,player){
						"step 0"
						player.removeMark("xjzh_sanguo_shishu");
						"step 1"
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]!=player){
								game.players[i].addTempSkill("xjzh_tongyong_jinwuxie","useCardAfter");
							}
						}
					},
					ai:{
						fireAttack:true,
						result:{
							player:function(player){
								var nh=player.countCards('h');
								if(nh<=player.hp&&nh<=4&&_status.event.name=='chooseToUse'){
									if(typeof _status.event.filterCard=='function'&&_status.event.filterCard({name:'huogong'},player,_status.event)){
										return -10;
									}
									if(_status.event.skill){
										var viewAs=get.info(_status.event.skill).viewAs;
										if(viewAs=='huogong') return -10;
										if(viewAs&&viewAs.name=='huogong') return -10;
									}
								}
								return 0;
							},
							target:function(player,target){
								if(target.hasSkill('huogong2')||target.countCards('h')==0) return 0;
								if(player.countCards('h')<=1) return 0;
								if(target==player){
									if(typeof _status.event.filterCard=='function'&&
									_status.event.filterCard({name:'huogong'},player,_status.event)){
										return -1.5;
									}
									if(_status.event.skill){
										var viewAs=get.info(_status.event.skill).viewAs;
										if(viewAs=='huogong') return -1.5;
										if(viewAs&&viewAs.name=='huogong') return -1.5;
									}
									return 0;
								}
								return -1.5;
							},
						},
					},
				},
				"xjzh_sanguo_zhijiluxun":{
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:2",
					derivation:["rezhiheng","gongxin"],
					filter:function(event,player){
						return player.countMark('xjzh_sanguo_shishu')>=2;
					},
					usable:1,
					filterTarget:function(card,player,target){
						return target!=player&&!target.getEquip("tengjia");
					},
					locked:true,
					mod:{
						selectTarget:function(card,player,range){
							var type=get.type(card);
							if(range[1]==-1) return;
							if(game.players.length<3) return;
							if(card.name=="huogong") return;
							if(type=='trick') range[1]++;
						},
					},
					content:function(){
						player.removeMark('xjzh_sanguo_shishu',2);
						player.addTempSkill('rezhiheng');
						player.addTempSkill('gongxin');
						player.storage.xjzh_sanguo_zhijiluxun_target=target;
						var card=game.createCard("tengjia");
						var skills=get.info(card).skills;
						skills=skills.slice(0);
						if(!skills) return;
						for(var j of skills){
							target.$gain2(card);
							target.addTempSkill(j);
						}
						player.addTempSkill('xjzh_sanguo_zhijiluxun_target');
					},
					subSkill:{
						"target":{
							mark:'character',
							onremove:function(player,skill){
							    delete player.storage.xjzh_sanguo_zhijiluxun_target;
							},
							sub:true,
							intro:{
								content:'本回合内<font color=yellow>$</font>视为装备了<font color=yellow>藤甲</font>直到回合结束'
							},
						},
					},
				},
				"xjzh_sanguo_liantui":{
					trigger:{
						player:"loseAfter",
						global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter",'addToExpansionAfter'],
					},
					frequent:true,
					locked:true,
					priority:99,
					audio:"ext:仙家之魂/audio/skill:4",
					filter:function(event,player){
						if(player.countCards('h')) return false;
						var evt=event.getl(player);
						return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
					},
					content:function(){
						player.addMark("xjzh_sanguo_shishu");
						player.draw();
					},
					ai:{
						threaten:0.8,
						effect:{
							target:function(card){
								if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
							},
						},
						noh:true,
						skillTagFilter:function(player,tag){
							if(tag=='noh'){
								if(player.countCards('h')!=1) return false;
							}
						},
					},
    			},
    			"xjzh_sanguo_fenyin":{
    				enable:"phaseUse",
    				audio:"ext:仙家之魂/audio/skill:2",
    				filter(event,player){
    				    var num=Math.max(6,game.players.length-1);
    					return player.countMark('xjzh_sanguo_shishu')>=num;
    				},
    				usable:1,
    				locked:true,
    				skillAnimation:true,
    				animationColor:"metal",
    				async content(event,trigger,player){
    					player.removeMark('xjzh_sanguo_shishu',Math.max(6,game.players.length-1));
    					const targets=game.filterPlayer(current=>current!=player);
    					targets.sort(lib.sort.seat);
    					await player.line(targets,'green');
    					for await(let target of targets){
    					    let cards=target.getCards('h',{color:"red"});
    					    target.showHandcards();
    						if(cards.length){
        						target.damage(cards.length,player,'nocard','fire');
        						target.discard(cards);
        					}
    					}
    				},
    				ai:{
    					combo:"xjzh_sanguo_shishu",
    					order:10,
    					result:{
    						player(player){
    						    return game.countPlayer(current=>{
    						        if(current!=player) return get.sgn(get.damageEffect(current,player,player,'fire'));
    						    });
    						},
    					},
    				},
    			},
				"xjzh_sanguo_buqu":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
					    player:['phaseBefore','dying'],
					},
					forced:true,
					locked:true,
					priority:-10,
					init:function(player){
					    player.storage.xjzh_sanguo_buqu=player.maxHp;
					},
					filter:function(event,player){
					    if(event.name=="dying"){
					        return player.maxHp>player.storage.xjzh_sanguo_buqu;
					    }
					    return true;
					},
					content:function(){
						"step 0"
						if(trigger.name=="phase"){
						    if(player.isDamaged()){
						        player.recover();
						    }else{
						        player.gainMaxHp();
						    }
						    event.finish();
						}
						"step 1"
						player.loseMaxHp();
						player.recover(1-player.hp);
					},
					ai:{
						save:true,
						skillTagFilter:function(player,tag,target){
							if(player!=target) return false;
						},
					},
				},
				"xjzh_sanguo_fenji":{
				    trigger:{
				        global:"damageEnd",
				    },
				    check:function(event,player){
				        var target=_status.event.player
				        var att=get.attitude(player,target);
				        if(att>0){
				            if(player.storage.xjzh_sanguo_buqu) return player.maxHp-player.storage.xjzh_sanguo_buqu;
				            return player.maxHp>2;
				        }
				        return 0;
				    },
				    content:function(){
				        "step 0"
		                player.loseMaxHp();
		                "step 1"
		                var cards=get.cards(player.maxHp*2);
		                game.cardsGotoOrdering(cards);
		                player.showCards(cards,'奋激');
						var suitx=[]
						var dialog=ui.create.dialog('hidden','〖奋激〗：请选择一种花色的牌令'+get.translation(trigger.player)+'获得之',[cards,'vcard']);
						for(var i of cards){
							suitx.add(get.suit(i));
						}
						event.cards=cards
						player.chooseControl(suitx).set('ai',function(){
							return Math.random();
						}).set('dialog',dialog);
		                "step 2"
		                if(result.control){
		                    var suitx=result.control;
		                    var list=[]
		                    for(var i of event.cards){
		                        if(get.suit(i)==suitx){
		                            list.push(i);
		                            event.cards.remove(i);
		                        }
		                    }
		                    trigger.player.gain(list,'giveAuto');
		                    player.gain(event.cards,'giveAuto');
		                }
		                "step 3"
		                if(game.hasPlayer(function(current){return player.canUse({name:"sha"},current)})){
		                    player.chooseToUse('〖奋激〗：选择一个目标对其使用一张【杀】',{name:'sha'});
		                }
				    },
				},
				//《仙家之魂·绝独孤求败·无招》
				"xjzh_sanguo_guimou":{
					marktext:"谋",
					mark:true,
					locked:true,
					unique:true,
					charlotte:true,
					intro:{
						name:"神鬼之谋",
                        mark:function(dialog,storage,player){
                            var cardPile=Array.from(ui.cardPile.childNodes);
                            if(!cardPile.length) return '';
                            cardPile=cardPile.slice(0,Math.min(3,cardPile.length));                          
                            if(player.isUnderControl(true)){
                                dialog.addAuto(cardPile);
                            }else{
                                return '';
                            }
                        },
                    },
                    ai:{
                        respondShan:true,
                        respondSha:true,
                        save:true,                   
                        skillTagFilter:function(player,tag,arg){
                            var event=_status.event;
                            var cardPile=Array.from(ui.cardPile.childNodes);
                            if(!cardPile.length) return false;
                            cardPile=cardPile.slice(0,Math.min(3,cardPile.length));                
                            for(var i=0; i<cardPile.length;i++){
                                if(tag=='respondSha'){
                                    if(cardPile[i].name=='sha') return true;
                                }else if(tag=='respondShan'){
                                    if(cardPile[i].name=='shan') return true;
                                }else if(tag=='save'){
                                    if(cardPile[i].name=='jiu'||cardPile[i].name=='tao') return true;
                                };
                            };
                            return false;
                        },                             
                    },
					group:["xjzh_sanguo_guimou_discard"],
					audio:"ext:仙家之魂/audio/skill:2",
                    hiddenCard:function(player,name){
                        var cardPile=Array.from(ui.cardPile.childNodes);
                        if(!cardPile.length) return false;
                        cardPile=cardPile.slice(0,Math.min(3,cardPile.length));                ;                        
                        return cardPile.some(i=>i.name==name);
                    },
                    filter:function(event,player){
                        if(event.responded||event.skill) return false;
                        var cardPile=Array.from(ui.cardPile.childNodes);
                        if(!cardPile.length) return false;
                        cardPile=cardPile.slice(0,Math.min(3,cardPile.length));                                     
                        return cardPile.some(i=>event.filterCard&&event.filterCard(i,player,event));                 
                    },
                    mod:{
                        cardEnabled2:function(card,player){
                            if(_status.event.skill&&get.itemtype(card)=='card'&&card.hasGaintag('xjzh_sanguo_guimou')) return false;
                        },
                    },
                    trigger:{player:['chooseToRespondBegin','chooseToUseBegin']},
                    forced:true,
                    lastDo:true,
                    copy:function(cards){
                        var result=[];
                        for(var i of cards){
                            var card=ui.create.card(ui.special);                            
                            card.init([
                                i.suit,
                                i.number,
                                i.name,
                                i.nature,
                            ]);
                            //card.storage.vanish=true;
                            card.cardid=i.cardid,
                            card.wunature=i.wunature,
                            card.storage=i.storage,
                            card.relatedCard=i;
                            result.push(card);
                        };
                        return result;
                    },
                    contentx:function(){
                        "step 0"
                        if(trigger.result.bool){
                            if(trigger.onresult){
                                trigger.onresult(trigger.result);
                                delete trigger.onresult;
                            }; 
                        };
                        "step 1"
                        player.lose(event.cards,ui.special)._triggered=null;    
                        "step 2"
                        for(var i of event.cards){                            
                            i.fix();
                            i.remove();
                            i.destroyed=true;
                        };                                   
                    },
                    content:function(){
                        "step 0"
                        var cardPile=Array.from(ui.cardPile.childNodes);
                        cardPile=cardPile.slice(0,Math.min(3,cardPile.length));   
                        event.cards=lib.skill.xjzh_sanguo_guimou.copy(cardPile);
                        player.directgains(event.cards,null,'xjzh_sanguo_guimou');
                        "step 1"
                        var evt=trigger;
                        var onresult=false;
                        if(evt.onresult){
                            onresult=evt.onresult;
                        };
                        var next2=game.createEvent('xjzh_sanguo_guimou_clear',false);
                        next2.cards=event.cards;
                        next2.player=player;
                        next2._trigger=evt;
                        next2.setContent(lib.skill.xjzh_sanguo_guimou.contentx);
                        event.next.remove(next2);
                        evt.after.push(next2);                       
                        evt.onresult=function(result){
                            if(evt.after.includes(next2)){
                                evt.after.remove(next2);
                                evt.next.push(next2);
                            };      
                            if(result.cards&&result.cards.length&&(result.cards[0].hasGaintag('xjzh_sanguo_guimou')||event.cards.includes(result.cards[0]))){                                                            
                                var card2=result.cards[0];                    
                                result.cards[0]=result.cards[0].relatedCard;
                                var cardx=result.cards[0];                                
                                result.card={
                                    name:get.name(card2),
                                    suit:get.suit(card2),
                                    number:get.number(card2),
                                    nature:get.nature(card2),
                                    isCard:true,
                                    cardid:cardx.cardid,
                                    wunature:cardx.wunature,
                                    storage:cardx.storage,
                                    cards:[cardx],
                                };                              
                            };                       
                            if(onresult) onresult.apply(evt,arguments);
                            delete evt.onresult;
                        };                        
                    },
                    subSkill:{
                        "discard":{
                            trigger:{
                                player:"gainBefore",
                                global:["gameDrawAfter"],
                            },
                            forced:true,
        					priority:100,
        					firstDo:true,
        					popup:false,
        					audio:"xjzh_sanguo_guimou",
                            filter:function(event,player){
                                if(event.name=='gain')return true;
                                return player.getCards('h').length;
                            },
                            content:function(){
                                if(trigger.name=='gain'){
                                    trigger.cancel();
                                    var owner=get.owner(trigger.cards[0]);
                                    if(owner&&owner.getCards('hejsx').includes(trigger.cards[0])) owner.lose(trigger.cards,ui.discardPile);
                                    else game.cardsDiscard(trigger.cards);
                                    game.log(trigger.cards,'进入了弃牌堆');
                                }else{
                                    var cards=player.getCards('h');
                                    if(cards.length){
                                        player.discard(cards);
                                    }
                                }
                            },
                            ai:{
                                nokeep:true,
                                nogain:true,
                            },
                        },
                    },
                },
				//《极略自用·sr张飞·蓄劲》
				"xjzh_sanguo_tianji":{
					enable:"phaseUse",
					locked:true,
					usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						for(i=0;i<game.players.length;i++){
							if(game.players[i].countCards("j")){
								return true;
							}
						}
						return false;
					},
					filterTarget:function (card,player,target){
						if(ui.selected.targets.length==0) return true;
						if(ui.selected.targets[0].countCards('j')==0&&target.countCards('j')==0) return false;
						return player.hp>0;
					},
					selectTarget:2,
					multitarget:true,
					multiline:true,
					targetprompt:['目标一','目标二'],
					content:function(){
						"step 0"
						targets[0].swapJudgeCards(targets[1]);
						/*"step 1"
						var num=player.hp+2
						event.cards=get.bottomCards(num);
						player.showCards(event.cards,'天机');
						"step 2"
						event.dialog=ui.create.dialog('是否发动〖天机〗？选择一种类型的牌交给一名角色',event.cards);
						var split={
							basic:[],
							delay:[],
							trick:[],
							equip:[]
						};
						for(const card of event.cards){
							let type=get.type(card);
							split[type].push(card);
						}
						var controlList=[];
						for(const type in split){
							if(split[type].length)
							controlList.push(lib.translate[type]);
						}
						var next=player.chooseControl([...controlList,"取消"],event.dialog);
						next.set('ai',function(){
							var splitValue={};
							for(const type in split){
								splitValue[type]=split[type].reduce((v,b)=>v+get.value(b,player),0);
							}
							if(Object.keys(splitValue).some(type=>splitValue[type]>10)){
								let type=Object.keys(splitValue).reduce((a,b)=>splitValue[a]>splitValue[b]?a:b);
								return lib.translate[type];
							}
							else{
								return "取消";
							}
						});
						event._split = split;
						"step 3"
						if(result.control=="取消"){
							event.finish();
						}
						else{
							for(const type in event._split){
								if(lib.translate[type]==result.control)
								event.cards=event._split[type];
							}
							player.chooseTarget('选择获得卡牌的目标',true,function(card,player,target){
								return target==targets[0]||target==targets[1];
							})
							.ai=function(target){
								return get.attitude(player,target);
							};
						}
						"step 4"
						if(event.cards.length) {
							result.targets[0].gain(event.cards,'gain2');
						}*/
						game.delay();
					},
					ai:{
						threaten:1.2,
					},
				},
				"xjzh_sanguo_tianqi":{
					enable:"phaseUse",
					locked:true,
					forceDie:true,
					unique:true,
					xjzh_xinghunSkill:true,
					charlotte:true,
					nogainsSkill:true,
					group:["xjzh_sanguo_tianqi_limited"],
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
				        var targets=game.filterPlayer();
			            for(var i=0;i<targets.length;i++){
			                var list=targets[i].getSkills(null,false,false).filter(function(skill){
			                    var info=lib.skill[skill];
			                    return info&&info.juexingji&&!info.filterTarget&&!info.filterCard&&!targets[i].awakenedSkills.includes(skill);
			                });
			                if(list.length>0) return true;
			            }
			            return false;
					},
					filterTarget:function(card,player,target){
					    if(target.getSkills(null,false,false).filter(function(skill){
					        var info=lib.skill[skill];
					        return info&&info.juexingji&&!info.filterTarget&&!info.filterCard&&!target.awakenedSkills.includes(skill);
					    }).length>0) return true;
					    return false;
					},
					usable:1,
					selectTarget:1,
					content:function (){
						'step 0'
						player.loseHp();
			            var list=target.getSkills(null,false,false).filter(function(skill){
			                var info=lib.skill[skill];
			                return info&&info.juexingji&&!info.filterTarget&&!info.filterCard&&!target.awakenedSkills.includes(skill);
			            });
						if(list.length){
							if(list.length==1){
								event._result={bool:true,control:list[0]};
							}
							else{
								player.chooseControl(list,'cancel2').set('prompt','选择发动'+get.translation(trigger.player)+'的一项技能（限限定技和觉醒技）');
							}
						}
						"step 1"
						if(result&&result.control&&result.control!="cancel2"){
							target.useSkill(result.control);
						}
					},
					ai:{
						order:0.1,
						expose:0.5,
						result:{
							target:function(player,target){
								if(player.hasUnknown()) return 0;
								var list=target.getSkills(null,false,false).filter(function(skill){
									var info=lib.skill[skill];
									return info&&info.juexingji;
								});
								if(list.length||get.attitude(target,player,player)>0) return 10;
								return 0;
							},
						},
					},
					subSkill:{
					    "limited":{
					        trigger:{
					            global:["gameStart"],
					        },
					        sub:true,
					        direct:true,
					        firstDo:true,
					        priority:100,
					        audio:"ext:仙家之魂/audio/skill:1",
					        filter:function(event,player){
					            var targets=game.filterPlayer(function(current){return current!=player});
					            var list=[]
					            for(var i=0;i<targets.length;i++){
					                var skills=targets[i].getSkills(null,false,false).filter(function(skill){
					                    var info=lib.skill[skill];
					                    return info&&info.limited;
					                });
					                if(skills.length) list.push(skills);
					            }
					            return list.length;
					        },
					        content:function(){
					            "step 0"
					            player.chooseTarget(true,"〖天启〗:请选择一名角色获得其一项限定技",function(card,player,target){
					                var list=target.getSkills(null,false,false).filter(function(skill){
					                    var info=lib.skill[skill];
					                    return info&&info.limited;
					                });
					                return list.length;
					            }).set('ai',function(target){
					                return Math.random();
					            });
					            "step 1"
					            if(result.bool){
					                var list=result.targets[0].getSkills(null,false,false).filter(function(skill){
					                    var info=lib.skill[skill];
					                    return info&&info.limited;
					                });
					                if(list.length){
					                    if(list.length==1){
					                        event._result={bool:true,control:list[0]};
					                    }else{
					                        player.chooseControl(list).set('ai',function(){
							    		        //return get.max(list,get.skillRank,'item');
							    		        return list.randomGet();
							        	   });
							           }
						            }else{
						                event.finish();
						                return;
						            }
						            event.target=result.targets[0]
					            }else{
					                event.finish();
					                return;
					            }
						        "step 2"
						        if(result&&result.control){
						            var skills=result.control
						            player.addSkillLog(skills);
						            event.target.removeSkill(skills,true);
						            player.logSkill("xjzh_sanguo_tianqi_limited");
					                player.storage.xjzh_sanguo_tianqi_limited=skills;
					                var info=lib.skill[skills];
					                info.filter=function(event,player){
					                    info.xjzh_sanguo_tianqi_limited_filter=info.filter;
					                    if(player.storage.xjzh_sanguo_tianqi_limited) return true;
					                    return this.xjzh_sanguo_tianqi_limited_filter.apply(this,arguments);
					                }
						        }
					        },
					    },
					},
				},
				"xjzh_sanguo_longnu":{
					mark:true,
					locked:true,
					marktext:"☯",
					zhuanhuanji:true,
					intro:{
						name:"龙怒",
						content:function(storage,player,skill){
							if(player.storage.xjzh_sanguo_longnu==true) return '出牌阶段，你的红色手牌均视为【火杀】且无距离限制';
							return '出牌阶段，你的黑色手牌均视为【雷杀】且无使用次数限制';
						},
					},
					trigger:{
						global:"phaseUseBegin",
					},
					forced:true,
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						"step 0"
						if(trigger.player!=player){
							if(trigger.player.isMaxHandcard(true)||player.countCards("h")<=player.hp){
								if(trigger.player.countCards("he")){
									player.gainPlayerCard(trigger.player,true,'he');
									trigger.player.draw();
								}
							}
							event.finish();
						}
						else{
							event.goto(1);
						}
						"step 1"
						if(player.storage.xjzh_sanguo_longnu==true){
							player.storage.xjzh_sanguo_longnu=false;
							player.loseMaxHp();
							player.draw();
							player.addTempSkill('xjzh_sanguo_longnu_2','phaseUseAfter');
							player.addTempSkill('xjzh_sanguo_longnu_taoyuan','phaseUseAfter');
						}else{
							player.storage.xjzh_sanguo_longnu=true;
							player.loseHp();
							player.draw();
							player.addTempSkill('xjzh_sanguo_longnu_1','phaseUseAfter');
							player.addTempSkill('xjzh_sanguo_longnu_wanjian','phaseUseAfter');
						};
					},
					subSkill:{
						"1":{
							mod:{
								cardname:function(card,player){
									if(get.color(card)=='red') return 'sha';
								},
								cardnature:function(card,player){
									if(get.color(card)=='red') return 'fire';
								},
								targetInRange:function(card,player,target,now){
									if(get.color(card)=='red') return true;
								},
							},
							sub:true,
							ai:{
								effect:{
									target:function(card,player,target,current){
										if(get.tag(card,'respondSha')&&current<0) return 0.6
									},
								},
								respondSha:true,
							},
						},
						"2":{
							mod:{
								cardname:function(card,player){
									if(get.color(card)=='black') return 'sha';
								},
								cardnature:function(card,player){
									if(get.color(card)=='black') return 'thunder';
								},
								cardUsable:function(card,player){
									if(card.name=='sha'&&card.nature=='thunder') return Infinity;
								},
							},
							sub:true,
							ai:{
								effect:{
									target:function(card,player,target,current){
										if(get.tag(card,'respondSha')&&current<0) return 0.6
									},
								},
								respondSha:true,
							},
						},
						"taoyuan":{
							enable:"phaseUse",
							sub:true,
							usable:1,
							filter:function(event,player){
								var list=[]
								var cards=player.getExpansions('xjzh_sanguo_zhibing');
								for(var i of cards){
									if(get.color(i)=="red") list.add(i);
								}
								return list.length>0;
							},
							content:function(){
								"step 0"
								var list=[]
								var cards=player.getExpansions('xjzh_sanguo_zhibing');
								for(var i of cards){
									if(get.color(i)=="red") list.add(i);
								}
								player.chooseCardButton("选择一张牌视为使用一张桃园结义",list);
								"step 1"
								if(result.bool){
									player.loseToDiscardpile(result.links);
									var targets=game.filterPlayer();
									targets.sort(lib.sort.seat);
									player.useCard({name:'taoyuan'},result.links,targets,false);
								}
							},
							ai:{
								basic:{
									order:function(){
										return 11;
									},
									useful:[3,1],
									value:0,
								},
								result:{
									target:function(player,target){
										return (target.hp<target.maxHp)?2:0;
									},
								},
								tag:{
									recover:0.5,
									multitarget:1,
								},
							},
						},
						"wanjian":{
							enable:"phaseUse",
							sub:true,
							usable:1,
							filter:function(event,player){
								var list=[]
								var cards=player.getExpansions('xjzh_sanguo_zhibing');
								for(var i of cards){
									if(get.color(i)=="black") list.add(i);
								}
								return list.length>0;
							},
							content:function(){
								"step 0"
								var list=[]
								var cards=player.getExpansions('xjzh_sanguo_zhibing');
								for(var i of cards){
									if(get.color(i)=="black") list.add(i);
								}
								player.chooseCardButton("选择一张牌视为使用一张万箭齐发",list);
								"step 1"
								if(result.bool){
									player.loseToDiscardpile(result.links);
									var targets=game.filterPlayer();
									targets.remove(player);
									targets.sort(lib.sort.seat);
									player.useCard({name:'wanjian'},result.links,targets,false);
								}
							},
							ai:{
								wuxie:function(target,card,player,viewer){
									if(get.attitude(viewer,target)>0&&target.countCards('h','shan')){
										if(!target.countCards('h')||target.hp==1||Math.random()<=0.7) return 0;
									}
								},
								basic:{
									order:9,
									useful:1,
									value:5,
								},
								result:{
									"target_use":function(player,target){
										if(player.hasUnknown(2)&&get.mode()!='guozhan') return 0;
										var nh=target.countCards('h');
										if(get.mode()=='identity'){
											if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
										}
										if(nh==0) return -2;
										if(nh==1) return -1.7
										return -1.5;
									},
									target:function(player,target){
										var nh=target.countCards('h');
										if(get.mode()=='identity'){
											if(target.isZhu&&nh<=2&&target.hp<=1) return -100;
										}
										if(nh==0) return -2;
										if(nh==1) return -1.7
										return -1.5;
									},
								},
								tag:{
									respond:1,
									respondShan:1,
									damage:1,
									multitarget:1,
									multineg:1,
								},
							},
						},
					},
				},
				"xjzh_sanguo_jieyi":{
					trigger:{
						player:"enterGame",
						global:"gameStart",
					},
					forced:true,
					locked:true,
					popup:false,
					unique:true,
					zhuSkill:true,
					priority:-99,
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function (event,player){
						if(player.hasZhuSkill('xjzh_sanguo_jieyi')) return true;
						return false;
					},
					derivation:["xjzh_sanguo_qinjin","xjzh_sanguo_zhibing"],
					content:function (){
						var skills=['xjzh_sanguo_qinjin','xjzh_sanguo_zhibing'];
						player.addAdditionalSkill('xjzh_sanguo_jieyi',skills);
					},
				},
				"xjzh_sanguo_qinjin":{
					trigger:{
						player:["shaMiss","damageEnd"],
						source:"damageSource",
					},
					audio:"ext:仙家之魂/audio/skill:5",
					forced:true,
					locked:true,
					unique:true,
					content:function (){
						if(trigger.name=="damage"){
						    if(trigger.player!=player){
						        player.gainPlayerCard(trigger.player,true,'he');
						    }
						    else if(trigger.player==player&&trigger.source!=player){
						        if(trigger.source.group=="wu"&&player.countCards("he")) player.chooseToDiscard("he",true);
						    }
						}else{
							if(trigger.target.group=="wu"){
								trigger.target.draw(2);
							}
							else{
								trigger.target.draw();
							}
						}
					},
				},
				"xjzh_sanguo_zhibing":{
					trigger:{
						player:"drawBegin",
					},
					usable:1,
					sub:true,
					marktext:"兵",
					intro:{
						content:"expansion",
						markcount:"expansion",
					},
				    onremove:function(player,skill){
					    var cards=player.getExpansions(skill);
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
					check:function (event,player){
						return get.attitude(player,event.player)<0&&
						(player.countCards("h")<=1||!player.hasCard(function(card){
							return card.name=="tao"||card.name=="shan"||card.name=="jiu";
						},'h'));
					},
					filter:function (event,player){
						if(event.parent.name=='phaseDraw') return false;
						return true;
					},
					content:function (){
						"step 0"
						trigger.changeToZero();
						var cardx=get.cards();
						player.popup(cardx)
						player.addToExpansion(cardx,"draw",player).gaintag.add("xjzh_sanguo_zhibing");
						"step 1"
						player.chooseTarget(get.prompt2('xjzh_sanguo_zhibing'),function(card,player,target){
							return target!=player&&target.inRangeOf(player);
						})
						.ai=function(target){
							return get.damageEffect(target,_status.event.player,_status.event.player);
						};
						"step 2"
						if(result.bool){
							player.addTempSkill("unequip","shaAfter");
							player.useCard({name:'sha'},result.targets[0],false);
						}
					},
					ai:{
						unequip_ai:true,
					},
				},
				"xjzh_sanguo_daizhao":{
				    trigger:{
					    global:"phaseZhunbeiBegin",
				    },
					check(event,player){return 1;},
					locked:true,
					unique:true,
					priority:-1,
					frequent:true,
					mode:["identity"],
					audio:"ext:仙家之魂/audio/skill:2",
        			group:['xjzh_sanguo_daizhao_zhu'],
					prompt:"〖代诏〗：是否将体力或手牌回复/补至与主公一致？",
					filter(event,player){
    					let zhu=get.zhu(player);
    					if(get.mode()!="identity") return false;
    					if(zhu==player) return false;
    					if(event.player!=zhu) return false;
    					if((zhu.getHp(true)>player.getHp(true)&&player.isDamaged())||zhu.countCards('h')>player.countCards('h')) return true;
    					return false;
					},
					async content(event,trigger,player){
    					let zhu=get.zhu(player),list=new Array();
    					if(zhu.getHp(true)>player.getHp(true)&&player.isDamaged()) list.push(`将体力回复至与${get.translation(zhu)}一致`);
						if(zhu.countCards('h')>player.countCards('h')) list.push(`将手牌补至与${get.translation(zhu)}一致`);
						if(list.length==0) return;
					    let dialog=ui.create.dialog('〖代诏〗：请选择一项','hidden');
					    for(let i=0;i<list.length;i++){
        					list[i]=[i,list[i]];
        				};
        				await dialog.add([list,'textbutton']);
						const {result:{bool,links}}=list.length==1?{result:{bool:true,links:list[0]}}:await player.chooseButton(dialog,true).set('ai',function(button){
							let zhu=get.zhu(player);
							if(zhu.countCards('h')>player.countCards('h')) return 1;
							if(zhu.getHp(true)>player.getHp(true)) return 0;
							return get.rand(0,1);
						});
						if(bool&&links){
                            const index=links[1];
							if(index.includes("手牌")){
                                const num=get.zhu(player).countCards('h')-player.countCards('h');
                                if(num==0) return;
                                player.draw(num);
							}else{
                                const num=get.zhu(player).getHp(true)-player.getHp(true);
                                if(num==0) return;
                                player.recover(num);
							}
					    }
					},
					subSkill:{
					    "zhu":{
        					trigger:{
        						global:["gameStart","zhuUpdate"],
        						player:"enterGame",
        					},
        					audio:"xjzh_sanguo_daizhao",
        					forced:true,
        					priority:1,
        					sub:true,
        					filter(event,player){
        					    if(get.mode()!="identity") return false;
        					    return get.zhu(player)!=player;
        					},
        					async content(event,trigger,player){
        						let list=[];
        						let zhu=get.zhu(player);
        						if(zhu&&zhu.skills.length){
        							for(let i=0;i<zhu.skills.length;i++){
        								if(lib.skill[zhu.skills[i]]&&lib.translate[zhu.skills[i]+'_info']){
        									await list.push(zhu.skills[i]);
        								}
        							}
        						}
    						    player.addAdditionalSkill('xjzh_sanguo_daizhao',list);
    						},
    					},
    				},
				},
				"xjzh_sanguo_guixin":{
					trigger:{
						player:["phaseDrawBegin"],
					},
					priority:-1,
					audio:"ext:仙家之魂/audio/skill:2",
					filter(event,player){
						return !event.numFixed;
					},
					check(event,player){
					    if(game.players.length-1>2) return 1;
					    return 0;
					},
					async content(event,trigger,player){
						trigger.changeToZero();
						var targets=game.filterPlayer(function(current){return current!=player}).slice(0);
						targets.sort(lib.sort.seat);
						for(let target of targets){
						    if(target.countCards('he')<=0) continue;
						    const {result:{bool,cards}}=await target.chooseCard(1,'he',"〖归心〗：请选择交给曹操一张牌，否则弃置一张牌").set('ai',function(card){
						        return 4-get.value(card);
						    });
						    if(bool&&cards.length){
						        target.give(cards[0],player);
						    }else{
						        target.chooseToDiscard(1,'he',true);
						    }
						    game.delay(0.5);
						}
						if(player.countCards('h')<game.players.length) player.addTempSkill('xjzh_sanguo_guixin_use');
					},
					subSkill:{
					    "use":{
					        trigger:{
					            player:"useCard",
					        },
					        forced:true,
					        popup:false,
					        sub:true,
					        priority:10,
					        audio:"xjzh_sanguo_guixin",
					        filter(event,player){
					            return ["basic","trick"].includes(get.type(event.card));
					        },
					        async content(event,trigger,player){
					            await trigger.effectCount++
	    		                game.log(trigger.card,"额外结算一次");
					        },
					    },
					},
					ai:{
						threaten:1.5,
					},
				},
				"xjzh_sanguo_feiying":{
					locked:true,
					charlotte:true,
					mod:{
						targetInRange:function(card,player,target,now){
						    let hs=target.countCards('h');
						    let hs2=player.countCards('h');
							if(hs2>hs) return true;
						},
						targetEnabled:function(card,player,target,now){
						    let hs=target.countCards('h');
						    let hs2=player.countCards('h');
							if(hs2>hs) return false;
						},
					},
				},
				"xjzh_sanguo_batu":{
					trigger:{
						global:"changeHp",
					},
					forced:true,
					popup:false,
					priority:-100,
					zhuSkill:true,
					audio:"ext:仙家之魂/audio/skill:1",
					filter(event,player){
					    if(!player.hasZhuSkill('xjzh_sanguo_batu')) return false;
						return event.player!=player&&event.player.group=="wei";
					},
					async content(event,trigger,player){
					    let list=[
					        `令${get.translation(player)}摸一张牌`,
					        `令${get.translation(trigger.player)}摸一张牌`,
					    ];
					    let dialog=ui.create.dialog('〖霸图〗：请选择一项','hidden');
                        for(let i=0;i<list.length;i++){
                            list[i]=[i,list[i]];
                        };
                        dialog.add([list,'textbutton']);
                        const {result:{bool,links}}=await player.chooseButton(dialog,true).set('ai',function(button){
                            if(!_status.event.getTrigger().player.countCards('h')) return 1;
                            return 0;
                        });
                        if(bool&&links){
                            if(links[0]==0){
                                player.draw();
                            }else{
                                trigger.player.draw();
                            }
                        }
					},
				},
				"xjzh_sanguo_guanxing":{
				    trigger:{
				        player:["phaseZhunbeiBegin","phaseJieshuBegin"],
				    },
					audio:"ext:仙家之魂/audio/skill:2",
					priority:3,
					frequent:true,
					content:function(){
					    var num=trigger.name=="phaseZhunbei"?5:3;
					    player.chooseToGuanxing(num);
					},
					ai:{
						guanxing:true,
						viewHandcard:true,
						skillTagFilter:function(player,tag,arg){
							if(tag=='viewHandcard'){
								if(player==arg) return false;
								return true
							};
						},
					},
				},
				/*"xjzh_sanguo_xinghun":{
					trigger:{
						player:["enterGame"],
						global:["gameStart"],
					},
					forced:true,
					locked:true,
					popup:false,
					priority:21,
					audio:"ext:仙家之魂/audio/skill:1",
					init:function(player){
						player.storage.xjzh_sanguo_xinghun=[]
						lib.skill.xjzh_sanguo_xinghun.getSkillList(player);
					},
					bannedList:[
					    "guanxing","reguanxing","jlsg_guanxing"
					],
					getSkillList:function(player){
						var list=[];
						var list2=[];
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							list2.add(players[i].name);
							list2.add(players[i].name1);
							list2.add(players[i].name2);
						}
						for(var i in lib.character){
							if(list2.includes(i)) continue;
							for(var j=0;j<lib.character[i][3].length;j++){
								if(lib.skill[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]+'_info']){
									var info=lib.skill[lib.character[i][3][j]];
									if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill&&!lib.skill.xjzh_sanguo_xinghun.bannedList.includes(lib.character[i][3][j])){
										list.add(lib.character[i][3][j]);
									}
								}
							}
						}
						var skills=player.skills.slice(0);
						for(var i=0;i<skills.length;i++){
							list.remove(skills[i]);
						}
						player.storage.xjzh_sanguo_xinghun.addArray(list);
					},
					group:["xjzh_sanguo_xinghun_damage"],
					content:function (){
						"step 0"
						event.count=0
						"step 1"
						var list=player.storage.xjzh_sanguo_xinghun
						if(list.length>7){
							skills3=list.randomGets(7);
						}
						else{
							event.finish();
							return;
						}
						"step 2"
						if(event.isMine()){
							var dialog=ui.create.dialog('forcebutton');
							dialog.add('请选择获得一项技能');
							for(i=0;i<skills3.length;i++){
								if(lib.translate[skills3[i]+'_info']){
									var translation=get.translation(skills3[i]);
									if(translation[0]=='新'&&translation.length==3){
										translation=translation.slice(1,3);
									}
									else{
										translation=translation.slice(0,2);
									}
									var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[skills3[i]+'_info']+'</div></div>');
									item.firstChild.link=skills3[i];
								}
							}
						}
						player.chooseControl(skills3).set('prompt','请选择获得一项技能').set('ai',function(){
							return skills3.randomGet();
						}).dialog=dialog;
						"step 3"
						if(result&&result.control){
							player.addSkillLog(result.control);
							skills3.remove(result.control);
							event.count++
							if(event.count<2) event.goto(2);
						}
					},
					subSkill:{
						"damage":{
							trigger:{
								player:"damageAfter",
							},
							forced:true,
							sub:true,
							audio:"ext:仙家之魂/audio/skill:1",
							content:function(){
								"step 0"
								player.draw();
								"step 1"
								player.showCards(result[0]);
								event.cards=result[0]
								cardnames=lib.translate[event.cards.name]
								player.popup(cardnames)
								"step 2"
								var list=player.storage.xjzh_sanguo_xinghun
								var skills=[]
								for(var i=0;i<list.length;i++){
									var str=lib.translate[list[i]+'_info'];
									if(str.indexOf(cardnames)!=-1) skills.push(list[i]);
								}
								var skills2=player.skills.slice(0);
								for(var i=0;i<skills2.length;i++){
									skills.remove(skills2[i]);
								}
								if(skills.length>0){
									var link=skills.randomGet();
									player.addSkillLog(link);
									player.$fullscreenpop(lib.translate[link],'thunder');
								}
								else{
									player.say("没有符合条件的技能");
								}
							},
							ai:{
								maixie:function(player){
									if(player.hp<2) return false;
									return true;
								},
							},
						},
					},
				},*/
				"xjzh_sanguo_xinghun":{
					trigger:{
						player:["enterGame"],
						global:["gameStart"],
					},
					forced:true,
					locked:true,
					popup:false,
					priority:21,
					group:["xjzh_sanguo_xinghun_damage"],
					audio:"ext:仙家之魂/audio/skill:1",
					init:function(player){
						player.storage.xjzh_sanguo_xinghun=[]
						lib.skill.xjzh_sanguo_xinghun.getSkillList(player);
					},
					bannedList:["guanxing","reguanxing","jlsg_guanxing"],
					getSkillList:function(player){
						var list=[];
						var list2=[];
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							list2.add(players[i].name);
							list2.add(players[i].name1);
							list2.add(players[i].name2);
						}
						for(var i in lib.character){
						    if(lib.character[i][4]){
						        if(lib.character[i][4].includes('boss')) continue;
						        if(lib.character[i][4].includes('bossallowed')) continue;
						        if(lib.character[i][4].includes('hiddenboss')) continue;
						        if(lib.character[i][4].includes('qishuBoss')) continue;
						        if(lib.character[i][4].includes('unseen')) continue;
						        if(lib.character[i][4].includes('forbidai')) continue;
						    }
							if(list2.includes(i)) continue;
							for(var j=0;j<lib.character[i][3].length;j++){
								if(lib.skill[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]+'_info']){
									var info=lib.skill[lib.character[i][3][j]];
									if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill&&!lib.skill.xjzh_sanguo_xinghun.bannedList.includes(lib.character[i][3][j])){
										list.add(lib.character[i][3][j]);
									}
								}
							}
						}
						var skills=player.skills.slice(0);
						for(var i=0;i<skills.length;i++){
							list.remove(skills[i]);
						}
						player.storage.xjzh_sanguo_xinghun.addArray(list);
					},
					content:function(){
						"step 0"
						var characters = [];
						var skillx=player.storage.xjzh_sanguo_xinghun.randomGets(7);
						var skills=[];
						for(var c in lib.character){
							var info=lib.character[c];
							if(info[3].some(s=>skillx.includes(s))){
								characters.push(c);
								skills.push(...skillx.filter(s=>info[3].includes(s)));
								skillx.remove(info[3]);
								if(!skillx.length) break;
							}
						}
						var list=characters;
						if(player.isUnderControl()){
							game.swapPlayerAuto(player);
						}
						var switchToAuto=function(){
							_status.imchoosing=false;
							event._result={
								bool:true,
								skills:skills.randomGets(),
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
						};
						var chooseButton=function(list,skills){
							var event=_status.event;
							if(!event._result) event._result={};
							event._result.skills=[];
							var rSkill=event._result.skills;
							var dialog=ui.create.dialog('请选择获得的技能',[list,'character'], 'hidden');
							event.dialog=dialog;
							var table=document.createElement('div');
							table.classList.add('add-setting');
							table.style.margin='0';
							table.style.width='100%';
							table.style.position='relative';
							for(var i=0;i<skills.length;i++){
								var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
								td.link=skills[i];
								table.appendChild(td);
								td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
								td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
									if(_status.dragged) return;
									if(_status.justdragged) return;
									_status.tempNoButton=true;
									setTimeout(function(){
										_status.tempNoButton=false;
									},
									500);
									var link=this.link;
									if(!this.classList.contains('bluebg')){
										if(rSkill.length>=2) return;
										rSkill.add(link);
										this.classList.add('bluebg');
									}
									else{
										this.classList.remove('bluebg');
										rSkill.remove(link);
									}
								});
							}
							dialog.content.appendChild(table);
							dialog.add('　　');
							dialog.open();
							event.switchToAuto=function(){
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							};
							event.control=ui.create.control('ok',function(link){
								if(rSkill.length!==2) return;
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							});
							for(var i=0;i<event.dialog.buttons.length;i++){
								event.dialog.buttons[i].classList.add('selectable');
							}
							game.pause();
							game.countChoose();
						};
						if(event.isMine()){
							chooseButton(list,skills);
						}
						else if(event.isOnline()){
							event.player.send(chooseButton,list,skills);
							event.player.wait();
							game.pause();
						}
						else{
							switchToAuto();
						}
						"step 1"
						var map=event.result||result;
						if(map&&map.skills&&map.skills.length){
							for(var s of map.skills){
								player.addSkillLog(s);
							}
							delete player.storage.xjzh_sanguo_daoshu
							player.checkConflict();
							player.checkMarks();
						}
					},
					subSkill:{
						"damage":{
							trigger:{
								player:"damageAfter",
							},
							forced:true,
							sub:true,
							priority:12,
							firstDo:true,
							audio:"ext:仙家之魂/audio/skill:1",
							content:function(){
								"step 0"
								player.draw();
								"step 1"
								player.showCards(result[0]);
								event.cards=result[0]
								cardnames=lib.translate[event.cards.name]
								player.popup(cardnames)
								"step 2"
								var list=player.storage.xjzh_sanguo_xinghun
								var skills=[]
								for(var i=0;i<list.length;i++){
									var str=lib.translate[list[i]+'_info'];
									if(str.indexOf(cardnames)!=-1) skills.push(list[i]);
								}
								var skills2=player.skills.slice(0);
								for(var i=0;i<skills2.length;i++){
									skills.remove(skills2[i]);
								}
								if(skills.length>0){
									var link=skills.randomGet(),characters;
									for(var i in lib.character){
										var info=lib.character[i];
										if(info[3].some(s=>link.includes(s))){
											characters=i;
										}
									}
									var cardname='xjzh_sanguo_xinghu_card_'+characters;
									lib.card[cardname]={
										fullimage:true,
										image:'character:'+characters,
									};
									lib.translate[cardname]=lib.translate[link];
									player.$gain2(game.createCard(cardname,'',''));
									player.addSkillLog(link);
									player.$fullscreenpop(lib.translate[link],'thunder');
								}
								else{
									player.say("没有符合条件的技能");
								}
							},
							ai:{
								maixie:function(player){
									if(player.hp<2) return false;
									return true;
								},
							},
						},
					},
				},
				/*"xjzh_sanguo_xingyun":{
					trigger:{
						global:["dieEnd"],
					},
					forced:true,
					audio:"ext:仙家之魂/audio/skill:1",
					group:["xjzh_sanguo_xingyun2"],
					content:function(){
						player.gainMaxHp();
					},
				},
				"xjzh_sanguo_xingyun2":{
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:1",
					limited:true,
					mark:true,
					marktext:"星",
					intro:{
						content:"limited",
					},
					sub:true,
					animationStr:"七星续魂",
					init:function(player){
						player.storage.xjzh_sanguo_xingyun2=false;
					},
					filter:function (event,player){
						return !player.storage.xjzh_sanguo_xingyun2&&game.dead.length>0;
					},
					bannedList:[
					    "xjzh_sanguo_guanxing","xjzh_sanguo_xinghun","xjzh_sanguo_xingyun"
					],
					content:function (){
						"step 0"
						player.awakenSkill(event.name);
						player.storage[event.name]=true;
						"step 1"
						var list=[];
						for(var i=0;i<game.dead.length;i++){
							list.push(game.dead[i].name);
						}
						player.chooseButton(ui.create.dialog('〖星殒〗：选择一名已阵亡的角色令其复活',[list,'character'],'hidden'),function(button){
							for(var i=0;i<game.dead.length&&game.dead[i].name!=button.link;i++);
							return get.attitude(_status.event.player,game.dead[i]);
						});
						"step 2"
						if(result.bool){
							for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
							event.dead=game.dead[i];
							event.dead.revive(2);
							event.dead.draw(2);
							var list1=[]
							var skills=player.skills.slice(0);
							for(var j of skills){
							    var info=lib.skill[j]
							    if((lib.translate[j]&&lib.translate[j+'_info'])&&!info.sub&&!lib.skill.xjzh_sanguo_xingyun2.bannedList.includes(j)){
							        list1.push(j);
							    }	    
							}
							if(list1.length>0){
								player.chooseControl(list1);
							}else{
							    event.finish();
							    return;
							}
						}
						"step 3"
						if(result.control){
							event.dead.addSkill(result.control);
							player.removeSkill(result.control);
							player.removeSkill("xjzh_sanguo_xingyun",true);
							game.log(event.dead,'获得技能','〖'+get.translation(result.control)+'〗');
							game.log(player,'失去技能','〖'+get.translation(result.control)+'〗');
						}
					},
					ai:{
					   order:function(player){
					       var player=_status.event.player
					       var num=0
					       for(var i of game.dead){
					           if(player.getFriends(true).includes(i)) num++
					       }
					       if(num>=2) return 8;
					       return 0.1;
					   },
					   result:{
					       player:function(player){
					           var num=0
					           for(var i of game.dead){
					               if(player.getFriends(true).includes(i)) num++
					           }
					           if(num>=2) return 2;
					           return 0.1; 
					       },
					   },
					},
				},*/
				"xjzh_sanguo_qixing":{
				    trigger:{
				        player:["damageEnd","recoverEnd"],
				    },
				    forced:true,
				    locked:true,
				    priority:3,
				    marktext:"星",
			        intro:{
		                name:"七星",
				        content:"expansion",
				        markcount:"expansion",
		            },
		            onremove:function(player,skill){
					    var cards=player.getExpansions("xjzh_sanguo_qixing");
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
					audio:"ext:仙家之魂/audio/skill:2",
				    group:["xjzh_sanguo_qixing_dying"],
				    content:function(){
				        "step 0"
				        var cards=get.cards(3);
				        var next=player.chooseCardButton(cards);
				        next.set('filterButton',function(button){
				            var player=_status.event.player;
				            var cardx=player.getExpansions("xjzh_sanguo_qixing");
				            if(!cardx.length) return get.type(button.link)=="trick";
				            var list=[];
				            for(var i of cardx){
				                list.push(get.name(i));
				            }
				            return !list.includes(get.name(button.link))&&get.type(button.link)=="trick";
				        });
				        next.set('ai',function(button){
				            return 1;
				        });
				        "step 1"
				        if(result.links){
				            player.addToExpansion(result.links,"gain2",player).gaintag.add("xjzh_sanguo_qixing");
				        }
				    },
				    subSkill:{
				        "dying":{
				            trigger:{
				                player:"dying",
				            },
				            forced:true,
				            priority:10,
				            sub:true,
					        audio:"xjzh_sanguo_qixing",
				            skillAnimation:true,
					        animationColor:"water",
					        animationStr:"七星续魂",
				            filter:function(event,player){
				                return player.getExpansions("xjzh_sanguo_qixing").length>=7;
				            },
				            content:function(){
				                var cards=player.getExpansions("xjzh_sanguo_qixing");
				                player.gain(cards,'gain2',player);
				                player.recover(player.maxHp-player.hp);
				            },
				        },
				    },
				},
				"xjzh_sanguo_luanzheng":{
					mark:true,
					marktext:"乱",
					intro:{
						content:"limited",
					},
					init:function (player,skill){
						player.storage[skill]=false;
					},
					forced:true,
					unique:true,
					locked:true,
					skillAnimation:true,
					group:["xjzh_sanguo_luanzheng_zhu"],
					audio:"ext:仙家之魂/audio/skill:2",
					animationColor:"thunder",
					animationStr:"窃幸绝禋",
					trigger:{
						player:"enterGame",
						global:"gameStart",
					},
					filter:function(event,player){
						if(player.identity=='zhong') return false;
						if(player.identity=='nei') return false;
						return get.mode()=="identity";
					},
					content:function(){
						"step 0"
						player.awakenSkill(event.name);
						player.storage[event.name]=true;
						"step 1"
						var list=game.filterPlayer(function(current){
							return current!=player&&current.identity!="fan";
						});
						if(list.length>0){
							var target=list.randomGet();
						}
						else{
							event.finish();
						}
						var id=target.identity
						if(player.identity=='zhu'){
							target.identity='zhu';
							target.setIdentity("zhu");
							target.showIdentity();
							target.update();
							game.zhu.identity=id;
							game.zhu.setIdentity(id);
							game.zhu.showIdentity();
							game.zhu=target
							game.zhu.update();
						}else{
							player.identity="nei";
							player.setIdentity("nei");
							player.showIdentity();
							player.update();
						}
						//player.node.identity.hide();
					},
					subSkill:{
						"zhu":{
							trigger:{
								global:["gameStart","zhuUpdate"],
							},
							audio:"ext:仙家之魂/audio/skill:2",
							forced:true,
							popup:false,
							locked:true,
							unique:true,
							priority:-1,
							filter:function(event,player){
								return player.storage.xjzh_sanguo_luanzheng=false;
							},
							content:function(){
								var list=[];
								var zhu=get.zhu(player);
								if(zhu&&zhu!=player&&zhu.skills){
									for(var i=0;i<zhu.skills.length;i++){
										if(lib.skill[zhu.skills[i]].zhuSkill){
											list.push(zhu.skills[i]);
										}
									}
								}
								player.addAdditionalSkill('xjzh_sanguo_luanzheng_zhu',list);
								player.storage.zhuSkill_xjzh_sanguo_luanzheng_zhu=list;
							},
						},
					},
				},
				"xjzh_sanguo_chanxian":{
					trigger:{
						target:"useCardToTarget",
					},
					audio:"ext:仙家之魂/audio/skill:3",
					filter:function (event,player){
						if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
							return get.tag(event.card,'damage')&&event.targets.length==1;
						}
						if(game.players.length<3) return false;
						return get.tag(event.card,'damage');
					},
					group:["xjzh_sanguo_chanxian_target"],
					forced:true,
					content:function (){
						"step 0"
						player.chooseTarget('谗陷：请选择一个额外的目标',function (card, player, target) {
							return player!=target&&trigger.player!=target;
						})
						.ai=function(target){
							if (trigger.card.name=='huogong'){
								if(target.num('e','2')&&target.get('e')=='tengjia') return 2;
								if(target.countCards("h")<=0) return -5;
								if(target.hp<=1) return Math.random<0.3;
								return 0.5;
							}
							if(trigger.card.name=='juedou'){
								if(target.hp<=1) return Math.random<0.3;
								return 0.5;
							}
							if(trigger.card.name=='guohe'||trigger.card.name=='shunshou'){
								if(target.num('h')==0) return Math.random<0.3;
								return 1;
							}
						};
						"step 1"
						if(result.bool){
							for (var i=0;i<result.targets.length;i++){
								trigger.targets.push(result.targets[i]);
								game.log(result.targets[i],'成为了额外目标');
								trigger.player.line(trigger.targets);
							}
							event.finish();
						}
						else{
							player.chooseToDiscard("谗陷：请弃置一张牌令"+get.translation(trigger.card)+"无效",'he').ai=function(card){
								if(get.attitude(player,trigger.player)<0) return 6-get.value(card);
							};
						}
						"step 2"
						if(result.bool){
							trigger.cancel();
						}
					},
					ai:{
						expose:0.2,
						effect:{
							target:function(card,player,target,current){
								if(game.players.length<3) return;
								if (card.name=='juedou'||card.name=='guohe'||card.name=='shunshou'||card.name=='huogong') return 0.5;
							},
						},
					},
					subSkill:{
						"target":{
							trigger:{
								global:"useCardToTarget",
							},
							audio:"xjzh_sanguo_chanxian",
							filter:function (event,player){
								if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
									return get.tag(event.card,'damage')&&event.targets.length==1&&event.target!=player;
								}
								return false;
							},
							prompt:function(event,player){
								return ""+get.translation(event.player)+"对"+get.translation(event.target)+"使用了"+get.translation(event.card)+"，是否发动〖谗陷〗将目标改为"+get.translation(player)+"？";
							},
							logTarget:"target",
							sub:true,
							check:function (event,player){
								return get.attitude(player,event.player)>=2;
							},
							content:function(){
								trigger.targets.length=0;
								trigger.getParent().triggeredTargets1.length=0;
								trigger.targets.push(player);
							},
						},
						ai:{
							expose:0.2
						},
					},
				},
				"xjzh_sanguo_shichong":{
					trigger:{
						global:"gameDrawBegin",
						player:"enterGame",
					},
					forced:true,
					locked:true,
					unique:true,
					limited:true,
					mark:true,
					marktext:"宠",
					intro:{
						content:"limited",
					},
					init:function(player,skill){
						player.storage[skill]=false;
					},
					group:["xjzh_sanguo_shichong_give"],
					skillAnimation:true,
					audio:"ext:仙家之魂/audio/skill:2",
					animationColor:"thunder",
					animationStr:"恃宠窃国",
					filter:function(event,player){
						return !player.storage.xjzh_sanguo_shichong;
					},
					content:function(){
						"step 0"
						//player.awakenSkill(event.name);
						player.storage.xjzh_sanguo_shichong=true;
						"step 1"
						event.num=0
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]==player) continue;
							event.num+=game.players[i].maxHp;
						}
						"step 2"
						event.num=Math.floor(event.num/game.countPlayer(function(current){return current!=player;}));
						player.maxHp=event.num
						player.hp=event.num;
						player.update();
					},
					subSkill:{
						"give":{
							trigger:{
								global:"phaseDrawAfter",
							},
							audio:"xjzh_sanguo_shichong",
							filter:function (event,player){
								if(lib.config.extension_仙家之魂_xjzh_jiexiantupo){
									return event.player!=player&&event.player.countCards("he")&&!player.storage.xjzh_sanguo_shichong;
								}
								return false;
							},
							forced:true,
							sub:true,
							content:function(){
								"step 0"
								trigger.player.addExpose(0.2);
								trigger.player.chooseCard(1,'交给'+get.translation(player)+'一张牌跳过弃牌阶段，否则跳过出牌阶段','he').ai=function(card){
									var target=status.event.player
									if(targetr.countCards("h")<=targetr.getHandcardLimit()) return [-5,5];
									if(targetr.countCards("h")>targetr.getHandcardLimit()){
										if(get.attitude(targetr,player)<0){
											return 4-get.value(card);
										}
										else{
											return get.value(card);
										}
									}
								}
								"step 1"
								if(result.bool){
									player.gain(result.cards,"giveAuto",trigger.player);
									trigger.player.skip("phaseDiscard");
								}
								else{
									trigger.player.skip("phaseUse");
								}
							},
						},
					},
				},
				"xjzh_sanguo_baima":{
				    enable:"phaseUse",
				    usable:1,
					mark:true,
					multitarget:true,
					marktext:"白",
					intro:{
						name:"白马义从",
						mark:function(dialog,content,player){
							var num1=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip3'||get.subtype(card)=='equip4').length;
							var num2=Array.from(ui.discardPile.childNodes).filter(card=>get.subtype(card)=='equip3'||get.subtype(card)=='equip4').length;
							return '牌堆剩余'+get.cnNumber(num1)+'张坐骑牌<br>弃牌堆剩余'+get.cnNumber(num2)+'张坐骑牌';
						},
					},
					filter:function(event,player){
					    return game.hasPlayer(function(current){
					        if(current.hasEmptySlot("equip3_4")) return true;
					    });
					    return false;
					},
				    filterTarget:function(card,player,target){
				        return target.hasEmptySlot('equip3_4');
				    },
				    selectTarget:1,
				    content:function(){
				        "step 0"
                        event.listEquip=[
                            'equip3',
                            'equip4',
                        ];
                        while(event.listEquip.length){
                            var pos=event.listEquip.shift();
                            if(target.hasEmptySlot(pos)){
                                var equip=get.cardPile(function(card){
                                    return get.type(card)=='equip'&&get.subtype(card)==pos;
                                });
                                if(equip){
                                    target.equip(equip);
                                    target.$gain2(equip,false);
                                };
                            };
                        }
                        "step 1"
                        player.insertPhase("xjzh_sanguo_baima",true);
				    },
				    ai:{
				        order:8,
				        result:{
				            player:1.5,
				            target:2,
				        },
				    },
				},
				"xjzh_sanguo_yicong":{
					mark:true,
					marktext:"义",
					locked:true,
					group:["xjzh_sanguo_yicong_enable"],
					init:function(player){
						player.disableEquip(3);
						player.disableEquip(4);
					},
					onremove:function(player,skill){
					    player.enableEquip(3);
						player.enableEquip(4);
					},
					intro:{
						name:"白马义从",
						content:function(storage,player){
							var str=''
							var num1=game.countPlayer(function(current){
								return current.getEquip(3)
							});
							var num2=game.countPlayer(function(current){
								return current.getEquip(4)
							});
							str+='进攻距离:'+get.translation(num2+1)+'<br>';
							if(num1)str+='防御距离:'+get.translation(num1);
							return str;
						},
					},
					mod:{
						globalTo:function(from,to,distance){
							var num=game.countPlayer(function(current){
								return current.getEquip(3)
							});
							return distance+num;
						},
						globalFrom:function(from,to,distance){
							var num=game.countPlayer(function(current){
								return current.getEquip(4)
							});
							return distance-(1+num);
						},
					},
					trigger:{global:'equipAfter'},
					forced:true,
					audio:"ext:仙家之魂/audio/skill:3",
					filter:function(event,player){
						return !event.audioed&&get.type(event.card)=='equip'&&(get.subtype(event.card)=='equip3'||get.subtype(event.card)=='equip4');
					},
					content:function(){
						trigger.audioed=true;
					},
					subSkill:{
						"enable":{
							trigger:{
								player:["enableEquipBefore"],
							},
							forced:true,
							popup:false,
							audio:"ext:仙家之魂/audio/skill:1",
							filter:function (event,player){
								return event.pos=="equip3"||event.pos=="equip4";
							},
							content:function (){
								trigger.cancel();
								game.log(player,"的坐骑栏已废除且无法恢复");
							},
							ai:{
								threaten:0.8,
							}
						},
					},
				},
				"xjzh_sanguo_muma":{
				    trigger:{
				        player:["damageBegin"],
				    },
				    filter:function(event,player){
				        return Array.from(ui.discardPile.childNodes).filter(card=>get.subtype(card)=='equip3'||get.subtype(card)=='equip4').length;
				    },
				    forced:true,
				    locked:true,
				    priority:10,
				    content:function(){
						var card1=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip3'||get.subtype(card)=='equip4');
						var card2=Array.from(ui.discardPile.childNodes).filter(card=>get.subtype(card)=='equip3'||get.subtype(card)=='equip4');
						var num1=card1.length
						var num2=card2.length
						for(var k of card2){
						    k.fix();
						    if(k.storage.vanish) continue;
							ui.cardPile.insertBefore(k,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
							player.updateMark("xjzh_sanguo_baima");
							game.updateRoundNumber();
						}
						if(num2>num1) trigger.changeToZero();
				    },
				},
				"xjzh_sanguo_yuewu":{
					enable:"phaseUse",
					usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
					prompt:function(event,player){
						return "选择两个目标令其各自获得对方手牌中没有的花色，然后令其依次弃置你选择的花色并视为对对方使用一张决斗";
					},
					multitarget:true,
					multiline:true,
					intro:{
						content:function (content,player){
							var str=get.translation(player.storage.xjzh_sanguo_yuewu);
							if(str) return '当'+str+'的牌因弃置进入弃牌堆，你可以使用之';
							return "";
						},
					},
					check:function (card,target,player){
						return get.attitude(player,target)<=0;
					},
					filterTarget:function (card,player,target){
						return player!=target&&target.countCards("h");
					},
					selectTarget:2,
					targetprompt:["先出决斗","后出决斗"],
					content:function(){
						"step 0"
						var cards0=targets[0].getCards('h');
						var cards1=targets[1].getCards('h');
						var card0=[]
						var card1=[]
						for(var i=0;i<cards0.length;i++){
							if(!targets[1].countCards('h',{suit:get.suit(cards0[i])})) card0.push(cards0[i]);
						}
						for(var j=0;j<cards1.length;j++){
							if(!targets[0].countCards('h',{suit:get.suit(cards1[j])})) card1.push(cards1[j]);
						}
						if(card0.length) targets[1].gain(card0,'log','draw');
						if(card1.length) targets[0].gain(card1,'log','draw');
						"step 1"
						var card0=targets[0].getCards('h');
						var card1=targets[1].getCards('h');
						var dialog=ui.create.dialog("hidden");
						if(card0.length){
							dialog.add(''+get.translation(targets[0])+'的手牌');
							dialog.add([card0,'vcard']);
						}
						if(card1.length){
							dialog.add(''+get.translation(targets[1])+'的手牌');
							dialog.add([card1,'vcard']);
						}
						var suits=[]
						for(var i of card0){
							suits.add(get.suit(i));
						}
						for(var j of card1){
							suits.add(get.suit(j));
						}
						player.chooseControl(suits).set('ai',function(){
							return suits.randomGet();
						}).set('dialog',dialog);
						"step 2"
						if(result.control){
							suitx=result.control
							var card0=targets[0].getCards("h",function(card){
								return get.suit(card)==suitx;
							});
							var card1=targets[1].getCards("h",function(card){
								return get.suit(card)==suitx;
							});
							if(card0.length){
								if(!lib.config.extension_仙家之魂_xjzh_jiexiantupo){
								    targets[0].discard(card0);
								}else{
								    player.gain(card0,targets[0],"draw");
								}
								targets[0].useCard({name:'juedou',isCard:true},'nowuxie',targets[1],'noai');
								game.delay(0.5);
							}
							if(card1.length){
								if(!lib.config.extension_仙家之魂_xjzh_jiexiantupo){
								    targets[1].discard(card1);
								}else{
								    player.gain(card1,targets[1],"draw");
								}
								targets[1].useCard({name:'juedou',isCard:true},'nowuxie',targets[0],'noai');
								game.delay(0.5);
							}
						}
						"step 3"
						if(player.storage.xjzh_sanguo_yuewu=suitx) delete player.storage.xjzh_sanguo_yuewu
						if(player.storage.xjzh_sanguo_yuehun=suitx) delete player.storage.xjzh_sanguo_yuehun
						if(!lib.config.extension_仙家之魂_xjzh_jiexiantupo){
						    player.storage.xjzh_sanguo_yuewu=suitx;
						    player.storage.xjzh_sanguo_yuehun=suitx;
						    player.markSkill('xjzh_sanguo_yuewu');
						}
					},
					ai:{
						order:12,
						result:{
							target:-1,
						},
						expose:0.4,
						threaten:3,
					},
				},
				"xjzh_sanguo_yuehun":{
					trigger:{global:"discardAfter"},
					filter:function(event,player){
						var cards=event.cards.filter(function(card){
							if(!lib.config.extension_仙家之魂_xjzh_jiexiantupo){
							    if(get.suit(card)!=player.storage.xjzh_sanguo_yuehun) return false;
							}
							if(get.position(card)!='d') return false;
							return player.hasUseTarget(card);
						});
						return cards.length;
					},
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						"step 0"
						if(trigger.delay==false) game.delay();
						"step 1"
						var cards=trigger.cards.filter(function(card){
							if(!lib.config.extension_仙家之魂_xjzh_jiexiantupo){
							    if(get.suit(card)!=player.storage.xjzh_sanguo_yuehun) return false;
							}
							if(get.position(card)!='d') return false;
							return player.hasUseTarget(card);
						});
						event.use=[];
						if(cards.length){
							event.use=cards;
						}
						"step 2"
						if(event.use.length){
							var str='〖月魂〗：选择一张牌使用之?';
							player.chooseCardButton(event.use,1,str).set('filterButton',function(button){
								return _status.event.player.hasUseTarget(button.link);
							}).set('ai',function(button){
								var player=_status.event.player;
								if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
								return 0;
							});
						}
						else{
							event.finish();
						}
						"step 3"
						if(result.bool){
							if(player.hasUseTarget(result.links[0])){
								player.chooseUseTarget(result.links[0],true);
							}
						}
					},
				},
				"xjzh_sanguo_tiance":{
					enable:"phaseUse",
					usable:function(player){
					    if(game.xjzhAchi.hasAchi('再兴炎汉','character')) return 2;
                        return 1;
                    },
					filterCard:false,
					selectCard:-1,
					filterTarget:true,
					selectTarget:-1,
					multitarget:true,
					multiline:true,
					filter:function(event,player){
                        var num=lib.skill.xjzh_sanguo_tiance.usable(player);
                        if(get.skillCount("xjzh_sanguo_tiance",player)>=num) return false;
                        return true;
                    },
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						'step 0'
						event.forceDie=true;
						event.cards=[]
						for(var i of targets){
							var cards=i.getCards('hej');
							i.lose(cards,ui.special,'visible');
							i.$throw(cards,1000)
							event.cards=event.cards.slice(0).concat(cards);
						}
						'step 1'
						game.cardsGotoOrdering(event.cards);
						'step 2'
						var dialog=ui.create.dialog('天策',cards,true);
						_status.dieClose.push(dialog);
						dialog.videoId=lib.status.videoId++;
						game.addVideo('cardDialog',null,['天策',get.cardsInfo(cards),dialog.videoId]);
						game.broadcast(function(cards,id){
							var dialog=ui.create.dialog('天策',cards,true);
							_status.dieClose.push(dialog);
							dialog.videoId=id;
						},
						cards,dialog.videoId);
						event.dialog=dialog;
						event.num=0
						targetx=targets[event.num]
						'step 3'
						if(event.dialog.buttons.length>1){
							var next=targetx.chooseButton(true,function(button){
								return get.value(button.link,_status.event.player);
							});
							next.set('dialog',event.preResult);
							next.set('closeDialog',false);
							next.set('dialogdisplay',true);
						}
						else{
							event.directButton=event.dialog.buttons[0];
						}
						"step 4"
						var dialog=event.dialog;
						var card;
						if(event.directButton){
							card=event.directButton.link;
						}
						else{
							for(var i of dialog.buttons){
								if(i.link==result.links[0]){
									card=i.link;
									break;
								}
							}
							if(!card)card=event.dialog.buttons[0].link;
						}
						var button;
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.buttons[i].link==card){
								button=dialog.buttons[i];
								button.querySelector('.info').innerHTML=function(targetx){
									if(targetx._tempTranslate)return targetx._tempTranslate;
									var name=targetx.name;
									if(lib.translate[name+'_ab'])return lib.translate[name+'_ab'];
									return get.translation(name);
								}
								(targetx);
								dialog.buttons.remove(button);
								break;
							}
						}
						var capt=get.translation(targetx)+'选择了'+get.translation(button.link);
						if(card){
							targetx.gain(card,'visible');
							targetx.$gain2(card);
							game.broadcast(function(card,id,name,capt){
								var dialog=get.idDialog(id);
								if(dialog){
									dialog.content.firstChild.innerHTML=capt;
									for(var i=0;i<dialog.buttons.length;i++){
										if(dialog.buttons[i].link==card){
											dialog.buttons[i].querySelector('.info').innerHTML=name;
											dialog.buttons.splice(i--,1);
											break;
										}
									}
								}
							},
							card,dialog.videoId,function(targetx){
								if(targetx._tempTranslate)return targetx._tempTranslate;
								var name=targetx.name;
								if(lib.translate[name+'_ab'])return lib.translate[name+'_ab'];
								return get.translation(name);
							}
							(targetx),capt);
						}
						dialog.content.firstChild.innerHTML=capt;
						game.addVideo('dialogCapt',null,[dialog.videoId,dialog.content.firstChild.innerHTML]);
						game.log(targetx,'选择了',button.link);
						game.delay();
						'step 5'
						if(event.dialog.buttons.length){
							if(event.num<game.players.length-1){
								event.num++
							}
							else{
								event.num=0
							}
							targetx=targets[event.num]
							event.goto(3);
						}
						'step 6'
						var dialog=event.dialog
						dialog.close();
						_status.dieClose.remove(dialog);
						game.broadcast(function(id){
							var dialog=get.idDialog(id);
							if(dialog){
								dialog.close();
								_status.dieClose.remove(dialog);
							}
						},
						event.dialog.videoId);
						game.addVideo('cardDialog',null,event.dialog.videoId);
					},
					ai:{
						//ai魔改《极略自用·sk张鲁·普渡》
						order:4.5,
						threaten:2,
						result:{
							player:function(player,target){
								var num=0;
								var list=[];
								var listnum=0;
								for (var i=0;i<game.players.length;i++){
									list.push('0');
								}
								for(var i=0;i<game.players.length;i++){
									num+=game.players[i].countCards('hej');
								}
								var max=function(){
									for(var i=0;i<list.length;i++){
										if (list[i]>num) return true;
									}
									return false;
								}
								while(!max()){
									num--;
									list[listnum%(game.players.length)]++;
									listnum++;
								}
								return num-player.countCards('h');
							},
							target:function(player,target){
								var num=0;
								var list=[];
								var listnum=0;
								for(var i=0;i<game.players.length;i++){
									list.push('0');
								}
								for(var i=0;i<game.players.length;i++){
									num+=game.players[i].countCards('hej');
								}
								var max=function () {
									for(var i=0;i<list.length;i++){
										if(list[i]>num) return true;
									}
									return false;
								}
								while(!max()){
									num--;
									list[listnum%(game.players.length)]++;
									listnum++;
								}
								for(var i=0;i<game.players.length;i++){
									if(target==game.players[i]) var nu=i;
								}
								return list[nu-1]-target.countCards('hej');
							}
						}
					},
				},
				"xjzh_sanguo_tianming":{
					trigger:{
						target:"useCardToTarget",
					},
					usable:function(player){
					    if(game.xjzhAchi.hasAchi('再兴炎汉','character')) return 2;
                        return 1;
                    },
					filter:function(event,player){
					    var num=lib.skill.xjzh_sanguo_tianming.usable(player);
                        if(get.xjzh_countSkill("xjzh_sanguo_tianming",player)>=num) return false;
						if(event.player==player) return false;
						return game.hasPlayer(function(current){
							return current.countCards('h')
						});
					},
					audio:"ext:仙家之魂/audio/skill:2",
					check:function(event,player){
						return game.hasPlayer(function(current){
							return current.countCards('h')
						});
					},
					prompt:function(event,player){
						return "〖天命〗："+get.translation(player)+"成为了"+get.translation(event.player)+"使用的"+get.translation(event.card)+"的目标，是否选择一名角色与其交换手牌？";
					},
					content:function(){
						"step 0"
						player.chooseTarget("〖天命〗：选择一名角色与其交换手牌",function(card,player,target){
							return target!=player&&(target.countCards('h')||player.countCards('h'));
						})
						.set('ai',function(target){
							var player=_status.event.player
							var att=get.attitude(player,target);
							var hs=player.getCards("h");
							var hs2=target.countCards('h');
							var num=0
							for(var i=0;i<hs.length;i++){
								if(8-get.value(hs[i])>0) num++
							}
							if(hs.length-hs2>0) return att>0;
							if(hs.length-hs2<0) return att<=0;
							return num;
						});
						"step 1"
						if(result.bool){
							player.swapHandcards(result.targets[0]);
							event.target=result.targets[0]
						}
						else{
							event.finish();
						}
						"step 2"
						var num=player.countCards('h')-event.target.countCards('h')
						if(num==0) return;
						if(num>0){
							var num2=game.countPlayer(function(current){
								return current.group==event.target.group
							});
							if(num2>0) event.target.draw(num2);
						}
						else{
							var num2=game.countPlayer(function(current){
								return current.group==player.group
							});
							if(num2>0) player.draw(num2)
						}
					},
					ai:{
						effect:{
							target:function(card,player,target){
								var players=game.filterPlayer(function(current){
									return current!=player
								});
								var num=game.filterPlayer(function(current){
									return current.group==player.group
								});
								var num2=0
								for(var i=0;i<players.length;i++){
									if(players[i].countCards('h')>player.countCards('h')) num2++
									if(players[i].countCards('h')<=player.countCards('h')) num2-=1
								}
								return num+num2;
							},
						},
					},
				},
				"xjzh_sanguo_moubian":{
					trigger:{
						global:"gameDrawBegin",
						player:"enterGame",
					},
					forced:true,
					locked:true,
					charlotte:true,
					priority:Infinity,
					firstDo:true,
					audio:"ext:仙家之魂/audio/skill:1",
					group:["xjzh_sanguo_moubian_damage"],
					content:function(){
						var group=['wei','shu','wu','qun'].randomGet();
						player.changeGroup(group);
						player.group=group;
						player.update();
					},
					subSkill:{
						"damage":{
							trigger:{
								player:"damageBegin1",
							},
							forced:true,
							priority:100,
							sub:true,
							audio:"ext:仙家之魂/audio/skill:1",
							filter:function(event,player){
								return event.source;
							},
							content:function(){
								"step 0"
								if(trigger.source.group==player.group){
									trigger.changeToZero();
									game.log(trigger.source,"无法对",player,"造成伤害");
									event.finish();
									return;
								}
								else{
									var cards=get.cards()[0];
									player.showCards(cards);
									event.card=cards
								}
								"step 1"
								var typex=get.type(event.card);
								trigger.source.chooseToDiscard("〖谋变〗:是否弃置一张类型为"+get.translation(typex)+"的手牌，否则esp刘协免疫此次伤害",1,'h',function(card){
									return get.type(card)==typex;
								})
								.set('ai',function(card){
									var eff=get.damageEffect(trigger.player,trigger.source,trigger.source);
									var att=get.attitude(trigger.player,trigger.source)
									if(eff){
										if(att<=0) return 8-get.value(card);
									}
									return 0;
								}).set('typex',typex);
								"step 2"
								if(!result.bool){
									player.gain(event.card,"gain2");
									trigger.changeToZero();
									if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return;
									if(player.hasUseTarget(event.card)){
									    player.chooseToUse(event.card);
									}
								}
							},
							ai:{
								effect:{
									target:function(card,player,target){
										if(!target.hasFriend()) return;
										var group=target.group
										var group2=player.group
										if(get.tag(card,"damage")){
											if(group==player.group) return [0,0]
											return 0.5;
										}
									},
								},
							},
						},
					},
				},
				"xjzh_sanguo_zhongxing":{
					trigger:{
						global:"dieBefore",
					},
					direct:true,
					locked:true,
					charlotte:true,
					priority:Infinity,
					firstDo:true,
					mode:["identity"],
					init:function(player){
						var style1=document.createElement('style');
						style1.innerHTML=".player .identity[data-color='YHan'],";
						style1.innerHTML+="div[data-nature='YHan'],";
						style1.innerHTML+="span[data-nature='YHan'] {text-shadow: black 0 0 1px,rgba(255, 0, 204,1) 0 0 2px,rgba(255, 0, 204,1) 0 0 5px,rgba(255, 0, 204,1) 0 0 10px,rgba(255, 0, 204,1) 0 0 10px}";
						style1.innerHTML+="div[data-nature='YHanm'],";
						style1.innerHTML+="span[data-nature='YHanm'] {text-shadow: black 0 0 1px,rgba(255,128,0,1) 0 0 2px,rgba(255,128,0,1) 0 0 5px,rgba(255,128,0,1) 0 0 5px,rgba(255,128,0,1) 0 0 5px,black 0 0 1px;}";
						style1.innerHTML+="div[data-nature='YHanmm'],";
						style1.innerHTML+="span[data-nature='YHanmm'] {text-shadow: black 0 0 1px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,black 0 0 1px;}";
						document.head.appendChild(style1);
						lib.group.add('YHan');
						lib.translate.YHan='汉';
						lib.translate.YHan2='汉';
						lib.groupnature.YHan='YHan';
						/*十周年UI武将名背景*/
						var tenUi=document.createElement('style');
						tenUi.innerHTML=".player>.camp-zone[data-camp='YHan']>.camp-back {background: linear-gradient(to bottom, rgb(204,0,204), rgb(136,0,204), rgb(102,0,204));}";
						/*十周年UI势力*/
						tenUi.innerHTML+=".player>.camp-zone[data-camp='YHan']>.camp-name {text-shadow: 0 0 5px rgb(255, 0, 204), 0 0 10px rgb(255, 0, 204), 0 0 15px rgb(255, 0, 204);}";
						document.head.appendChild(tenUi);
					},
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						if(trigger.player!=player&&game.zhu==trigger.player){
							if(get.maxGroupx(player)==true&&!player.hasSkill("xjzh_sanguo_zhongxing_off")){
								player.$skill('炎汉中兴','legend','fire');
								player.logSkill('xjzh_sanguo_zhongxing');
								player.addSkill("xjzh_sanguo_zhongxing_off");
								var targets=game.filterPlayer(function(current){
									return current!=player&&current.group==player.group
								});
								var targets2=game.filterPlayer(function(current){
									return current.group!=player.group
								});
								player.identity='zhu';
								player.setIdentity("zhu");
								player.showIdentity();
								game.zhu.identity="fan";
								game.zhu.setIdentity("fan");
								game.zhu=player
								game.zhu.showIdentity();
								game.zhu.update();
								for(var i=0;i<targets.length;i++){
									targets[i].identity="zhong";
									targets[i].showIdentity();
									targets[i].update();
								}
								for(var i=0;i<targets2.length;i++){
									targets2[i].identity="fan";
									targets2[i].showIdentity();
									targets2[i].update();
								}
								var targets3=game.filterPlayer(function(current){
									return current.identity=="zhong"
								});
								for(var i=0;i<targets3.length;i++){
									targets[i].changeGroup("YHan");
									targets[i].update();
								}
								player.changeGroup("YHan");
								if(game.xjzhAchi.hasAchi('再兴炎汉','character')){
								    player.gainMaxHp();
								    player.recover(player.getDamagedHp());
								}
								player.update();
							}
						}
						else if(trigger.player==player&&game.zhu!=player){
							player.$skill('炎汉中兴','legend','fire');
							game.delay(2);
							player.logSkill('xjzh_sanguo_zhongxing');
							game.over(game.me.identity!=player.identity);
						}
					},
					subSkill:{
						off:{
						sub:true,},
					},
					ai:{
						threaten:3.5,
					},
				},
				"xjzh_sanguo_busuan":{
				    enable:"phaseUse",
				    locked:true,
				    usable:1,
				    mod:{
						ignoredHandcard:function(card,player){
						    if(!player.hasSkill("xjzh_sanguo_busuan")) return;
						    if(!get.playerName(player,'xjzh_sanguo_guanlu')) return;
						    var cards=[
				                "xjzh_card_chunfenghuayu",
				                "xjzh_card_zhizuijinmi",
				                "xjzh_card_shenjimiaosuan",
				                "xjzh_card_tanhuayixian",
				                "xjzh_card_fanyunfuyu",
				            ]
				            if(cards.includes(card.name)) return true;
						},
						aiValue:function(player,card,num){
						    if(!player.hasSkill("xjzh_sanguo_busuan")) return;
						    if(!get.playerName(player,'xjzh_sanguo_guanlu')) return;
						    var cards=[
				                "xjzh_card_chunfenghuayu",
				                "xjzh_card_zhizuijinmi",
				                "xjzh_card_shenjimiaosuan",
				                "xjzh_card_tanhuayixian",
				                "xjzh_card_fanyunfuyu",
				            ]
				            if(cards.includes(card.name)) return num+10;
						},
                        canBeGained:function(card,player,target,name,now){
						    if(!player.hasSkill("xjzh_sanguo_busuan")) return;
						    if(!get.playerName(player,'xjzh_sanguo_guanlu')) return;
						    var cards=[
				                "xjzh_card_chunfenghuayu",
				                "xjzh_card_zhizuijinmi",
				                "xjzh_card_shenjimiaosuan",
				                "xjzh_card_tanhuayixian",
				                "xjzh_card_fanyunfuyu",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
                        canBeDiscarded:function(card,player,target,name,now){
						    if(!player.hasSkill("xjzh_sanguo_busuan")) return;
						    if(!get.playerName(player,'xjzh_sanguo_guanlu')) return;
						    var cards=[
				                "xjzh_card_chunfenghuayu",
				                "xjzh_card_zhizuijinmi",
				                "xjzh_card_shenjimiaosuan",
				                "xjzh_card_tanhuayixian",
				                "xjzh_card_fanyunfuyu",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
                        cardDiscardable:function(card,player,name,now){
						    if(!player.hasSkill("xjzh_sanguo_busuan")) return;
						    if(!get.playerName(player,'xjzh_sanguo_guanlu')) return;
						    var cards=[
				                "xjzh_card_chunfenghuayu",
				                "xjzh_card_zhizuijinmi",
				                "xjzh_card_shenjimiaosuan",
				                "xjzh_card_tanhuayixian",
				                "xjzh_card_fanyunfuyu",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
					},
					audio:"ext:仙家之魂/audio/skill:2",
				    init:function(player){
				        var cards=[
				            "xjzh_card_chunfenghuayu",
				            "xjzh_card_zhizuijinmi",
				            "xjzh_card_shenjimiaosuan",
				            "xjzh_card_tanhuayixian",
				            "xjzh_card_fanyunfuyu",
				        ]
				        game.addGlobalSkill('xjzh_card_fanyunfuyu_skill');
				        lib.skill.xjzh_sanguo_busuan.getCards_guanlu=cards;
				    },
				    group:["xjzh_sanguo_busuan_evt","xjzh_sanguo_busuan_use"],
				    content:function(){
				        "step 0"
				        var cards=lib.skill.xjzh_sanguo_busuan.getCards_guanlu.slice(0);
				        var card=cards.randomGet();
				        player.gain(game.createCard(card,null,null),"gain2","log",player)._triggered=null;
				        "step 1"
				        var cards=lib.skill.xjzh_sanguo_busuan.getCards_guanlu.slice(0);
				        var num=player.countCards('h',function(card){
				            return !cards.includes(card.name);
				        });
				        if(!num) return;
				        var list=[];
				        for(var i=0;i<lib.inpile.length;i++){
				            var name=lib.inpile[i];
				            var type=get.type(name);
				            var subtype=get.subtype(name);
				            if(name=="sha"){
				                for(var j of lib.inpile_nature) list.push([type,'',name,j]);
				            }
				            if(type!="xjzh_danyao"&&type!="equip") list.push(name);
				        }
				    	if(!list.length) return;
				    	var next=player.chooseButton(['选择至多两张类型不一致的牌',[list,'vcard']])
				    	next.set('ai',function(button){
						    var card={name:button.link[2]};
						    return 12-get.value(card);
				    	});
				    	next.set('complexSelect',true);
				    	next.set('selectButton',function(){
				    	    var player=_status.event.player
				    	    var cardx=lib.skill.xjzh_sanguo_busuan.getCards_guanlu.slice(0);
				            var numx=player.countCards('h',function(card){
				                return !cards.includes(card.name);
				            });
                            return [1,Math.min(numx,2)];
                        })
                        next.set('filterButton',function(button){
                            if(!ui.selected.buttons.length) return true;     
                            var numbers=0;
                            var selected=ui.selected.buttons;
                            for(var i of selected){
                                if(typeof i.link=='number'){
                                    numbers++;
                                }else{
                                    if(typeof button.link!='number'){
                                        if(get.type(button.link[2])==get.type(i.link[2])) return false;
                                    };                   
                                };
                            };
                            if(typeof button.link=='number'){
                                if(numbers>=1) return false;
                            }
                            return true;
                        });
				    	"step 2"
				    	if(result.links){
				    	    event.cards=result.links.slice(0);
				    	    var cards=lib.skill.xjzh_sanguo_busuan.getCards_guanlu.slice(0);
				    	    player.chooseCard(true,event.cards.length,"〖卜算〗：选择至多"+get.translation(event.cards.length)+"张牌",function(card){
				    	        return !cards.includes(card.name);
				    	    }).set('ai',function(card){
				    	        return 6-get.value(card);
				    	    });
				    	}else{
				    	    event.finish();
				    	    return;
				    	}
				    	"step 3"
				    	if(result.bool){
				    	    var cards=[]
				    	    var list=event.cards
				    	    for(var i=0;i<event.cards.length;i++){
				    	        var card=get.cardPile(function(cardx){
				    	            return !cards.includes(cardx)&&cardx.name==list[Math.min(i,list.length-1)][2];
				    	        });
				    	        event.cards.splice(i--,1);
				    	        if(card){
				    	            cards.push(card);
				    	        }else{
				    	            cards.push(game.createCard(card));
				    	        }
				    	    }
				    	    if(cards.length){
				    	        player.gain(cards,'gain2','log');
				    	    }
				    	    var cards2=result.cards.randomSort();
				    	    while(cards2.length){
                                var num=get.rand(ui.cardPile.childElementCount);
                                var card2=cards2.pop();                        
                                card2.fix();
                                ui.cardPile.insertBefore(card2,ui.cardPile.childNodes[num]);
                            };
				    	}
				    },
				    ai:{
				        order:8,
				        result:{
				            player:1,
				        },
				    },
				    subSkill:{
				        "evt":{
				            trigger:{
				                player:["damageAfter","phaseDiscardAfter"],
				                target:"useCardToTarget",
				            },
				            audio:'xjzh_sanguo_busuan',
				            forced:true,
				            priority:12,
				            popup:false,
				            sub:true,
				            filter:function(event,player){
				                if(!event.cards||!event.cards.length) return false;
				                if(event.name=="damage"){
				                    return get.name(event.card)=="sha";
				                }
				                if(event.target==player&&event.player!=player){
				                    return get.type(event.card,'trick')=='trick';
				                }
				                if(event.name=="phaseDiscard"){
				                    return event.cards.length>=2;
				                }
				                return false;
				            },
				            content:function(){
                                player.useSkill('xjzh_sanguo_busuan');
				            },
				        },
				        "use":{
				            trigger:{
				                global:["loseAfter"],
				            },
				            direct:true,
				            priority:12,
				            sub:true,
				            filter:function(event,player){
				                var list=[
				                    "xjzh_card_chunfenghuayu",
				                    "xjzh_card_zhizuijinmi",
				                    "xjzh_card_shenjimiaosuan",
				                    "xjzh_card_tanhuayixian",
				                    "xjzh_card_fanyunfuyu",
				                ]
				                if(event.cards.some(card=>list.includes(card.name))) return true;
				                return false;
				            },
				            content:function(){
                                var cards=trigger.cards
                                var cards2=lib.skill.xjzh_sanguo_busuan.getCards_guanlu.slice(0);
                                var list=[]
                                for(var i of cards){
                                    for(var j of cards2){
                                        if(i.name==j) list.push(i);
                                    }
                                }
                                if(!list.length) return;
                                game.cardsGotoSpecial(list);
				                if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) player.draw(list.length);
                                game.log("#y",list,"被销毁了");
				            },
				        },
				    },
				},
				"xjzh_card_chunfenghuayu_skill":{
				    mark:true,
				    marktext:"春",
				    intro:{
				        name:"春风化雨",
				        content:"免疫下一次伤害",
				    },
				    direct:true,
				    priority:3,
				    firstDo:true,
				    locked:true,
				    charlotte:true,
				    trigger:{
				        player:["damageBegin1"],
				    },
				    filter(event,player){
				        return !event.numFixed&&!event.cancelled;
				    },
				    async content(event,trigger,player){
				        trigger.changeToZero();
				        player.removeSkill("xjzh_card_chunfenghuayu_skill",true);
				        player.$fullscreenpop('春风化雨','water');
				    },
				},
				"xjzh_card_fanyunfuyu_skill":{
				    trigger:{
				        global:["damageBegin1"],
				    },
				    filter:function(event,player){
				        if(player.countCards('h','xjzh_card_fanyunfuyu')){
				            return get.playerName(player,'xjzh_sanguo_guanlu');
				        }
				        return false;
				    },
				    direct:true,
				    priority:100,
				    firstDo:true,
				    content:function(){
				        "step 0"
				        player.chooseCardTarget({
                            position:'h',
                            filterCard:function(card,player){
                                return get.name(card)=="xjzh_card_fanyunfuyu";
                            },
                            filterTarget:function(card,player,target){
                                var trigger=_status.event.getTrigger();
                                return target!=player&&target!=trigger.player;
                            },
                            ai1:function(card){
                                return 1;
                            },
                            ai2:function(target){
                                if(target.hasSkillTag('nodamage')) return 0;
                                return get.damageEffect(target,_status.event.source,_status.event.player,_status.event.nature);
                                //return -get.attitude(_status.event.player,target);
                            },
                            prompt:function(){
                                var str="〖翻云覆雨〗：请弃置一张【翻云覆雨】令一名角色受到";
				                if(trigger.source) str+="来自"+get.translation(trigger.source)+"的";
				                str+=""+get.translation(trigger.num)+"点";
				                if(trigger.nature) str+=""+get.translation(trigger.nature)+""
				                str+="伤害";
				                return str;
                            }(),
                        });
				        "step 1"
				        if(result.bool&&result.targets){
				            player.discard(result.cards[0])._triggered=null;
				            result.targets[0].damage(trigger.num,trigger.source,trigger.nature);
				            player.$fullscreenpop('翻云覆雨','thunder');
				        }
				    },
				},
				"xjzh_card_zhizuijinmi_skill":{
				    mark:true,
				    marktext:"醉",
				    intro:{
				        name:"纸醉金迷",
				        content:function(storage,player){
				            var suit=player.storage.xjzh_card_zhizuijinmi_skill
				            var str=""+get.translation(player)+"每打出一张牌需要判定，结果与"+get.translation(suit)+"不同则无效，否则摸一张牌";
				            return str;
				        },
				    },
				    direct:true,
				    priority:3,
				    firstDo:true,
				    locked:true,
				    charlotte:true,
				    trigger:{
				        player:"useCard1",
				    },
				    filter:function(event,player){
				        return player.storage.xjzh_card_zhizuijinmi_skill;
				    },
				    group:"xjzh_card_zhizuijinmi_skill_delete",
				    content:function(){
				        "step 0"
				        var suitx=player.storage.xjzh_card_zhizuijinmi_skill
				        player.judge(function(card){
							return get.suit(card)==suitx?2:0;
						}).judge2=function(result){
							return result.bool===false?true:false;
						};
				        "step 1"
				        if(result.bool){
				            player.draw();
				        }else{
				            trigger.cancel();
				        }
				        player.$fullscreenpop('纸醉金迷','fire');
				    },
				    subSkill:{
				        "delete":{
				            trigger:{
				                player:"phaseAfter",
				            },
				            direct:true,
				            priority:3,
				            firstDo:true,
				            locked:true,
				            charlotte:true,
				            sub:true,
				            filter:function(event,player){
				                return player.storage.xjzh_card_zhizuijinmi_skill;
				            },
				            content:function(){
				                delete player.storage.xjzh_card_zhizuijinmi_skill;
				                player.removeSkill("xjzh_card_zhizuijinmi_skill",true);
				            },
				        },
				    },
				},
				"xjzh_sanguo_youxia":{
				    trigger:{
				        player:["phaseAfter","damageAfter"],
				        target:["useCardToTargeted"],
				    },
				    forced:true,
				    priority:2,
				    locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(event.name=="useCardToTargeted"){
				            var history=event.player.getAllHistory('useCard',function(evt){
				                return get.color(evt.card)=="black"&&evt.targets.includes(player);
				            });
				            if(!event.targets.includes(player)) return false;
				            if(get.color(event.card)!="black") return false;
				            return 100%history.length==0;
				        }
				        if(event.name=="phase"||event.name=="damage") return true;
				        return false;
				    },
				    group:["xjzh_sanguo_youxia_use","xjzh_sanguo_youxia_gain"],
				    content:function(){
				        var card=get.cardPile(function(card){
							return get.color(card)=="black";
						});
						if(card) player.addToExpansion(card,"gain2",trigger.player).gaintag.add("xjzh_sanguo_youxia_tag");
				    },
				    subSkill:{
				        "tag":{
				            marktext:"侠",
				            sub:true,
				            intro:{
				                name:"游侠",
				                content:"expansion",
				                markcount:"expansion",
				            },
				            onremove:function(player,skill){
					            var cards=player.getExpansions("xjzh_sanguo_youxia_tag");
					            if(cards.length) player.loseToDiscardpile(cards);
				            },
				        },
				        "use":{
				            enable:"phaseUse",
				            filterTarget:function(card,player,target){
				                if(target==player) return true;
				                return !target.countCards('he',function(card){
				                    return card.hasGaintag("xjzh_sanguo_youxia_tag");
				                });
				            },
				            audio:"xjzh_sanguo_youxia",
				            selectTarget:1,
				            filter:function(event,player){
				                if(!player.getExpansions("xjzh_sanguo_youxia_tag").length) return false;
				                if(game.countPlayer(function(current){
				                    return current!=player&&current.countCards('he',function(card){
				                        return card.hasGaintag("xjzh_sanguo_youxia_tag");
				                    });
				                })>=game.players.length) return false;
				                return true;
				            },
				            content:function(){
				                "step 0"
				                var num=1
				                var cards=player.getExpansions('xjzh_sanguo_youxia_tag');
				                if(targets[0]==player) num=[1,cards.length]
				                player.chooseCardButton(cards,num,true).set('ai',function(button){
				                    var att=get.attitude(_status.event.player,_status.event.targetx);
				                    var card={name:button.link[2]};
				                    return _status.event.targetx.getUseValue(card)*-att;
				                }).set('targetx',target);
				                "step 1"
				                if(result.links){
				                    target.gain(result.links,player,'gain2','log').gaintag.add('xjzh_sanguo_youxia_tag');
				                    if(target!=player){
				                        if(!target.storage.xjzh_sanguo_youxia) target.storage.xjzh_sanguo_youxia=[]
				                        target.storage.xjzh_sanguo_youxia.push(result.links[0]);
				                    }
				                }
				            },
				            ai:{
				                order:6,
				                result:{
				                    target:function(player,target){
				                        if(!target) return;
				                        if(target==player) return 1;
				                        var att=get.attitude(player,target);
				                        var num=target.countCards('he');
				                        if(att>0) return -num
				                        return -1;
				                    },
				                },
				            },
				        },
				        "gain":{
				            trigger:{
				                global:"phaseDiscardBegin",
				            },
				            forced:true,
				            priority:12,
					        audio:"ext:仙家之魂/audio/skill:2",
				            filter:function(event,player){
				                if(event.player==player) return false;
				                if(!event.player.storage.xjzh_sanguo_youxia) return false;
				                var bool=false
				                if(event.player.storage.xjzh_sanguo_youxia){
				                    for(var i of event.player.storage.xjzh_sanguo_youxia){
				                        if(event.player.countCards('hes',function(card){
				                            return card==i;
				                        })>0) bool=true;
				                    }
				                }
				                if(!bool) return false;
				                return true;
				            },
				            content:function(){
				                player.gain(trigger.player.getCards('he'),trigger.player,'gain2','log');
				                delete trigger.player.storage.xjzh_sanguo_youxia
				            },
				        },
				    },
				    ai:{
				        order:4,
				        result:{
				            target:function(card,player,target) {
				                if(ui.selected.cards.length&&ui.selected.cards[0].name=='tao'){
				                    if(target.isDamaged()) return 2;
				                }
			                   return -1;
				            },
				        },
				    },
				},
				"xjzh_sanguo_luoyi":{
				    trigger:{
				        player:["gainAfter"],
				    },
				    forced:true,
				    priority:2,
				    locked:true,
				    init:function(player){
				        player.disableEquip(2);
				    },
					audio:"ext:仙家之魂/audio/skill:1",
				    filter:function(event,player){
				        if(!event.cards||!event.cards.length) return false;
				        var cards=event.cards
				        for(var i=0;i<cards.length;i++){
				            if(get.type(cards[i])=="equip"&&get.subtype(cards[i])=="equip2") return true;
				        }
				        return false;
				    },
				    group:["xjzh_sanguo_luoyi_use"],
				    content:function(){
				        if(trigger.getParent("xjzh_sanguo_huchi_use").name!="xjzh_sanguo_huchi_use") player.recover();
				    },
				    subSkill:{
				        "use":{
					        audio:"ext:仙家之魂/audio/skill:3",
				            enable:'phaseUse',
				            prompt:function(){
				                return '将至少一张防具牌牌当作一张无次数限制的【杀】使用';
				            },
				            position:'hs',
				            filterCard:function(card){
				                return get.subtype(card)=='equip2';
				            },
				            selectCard:function(){
				                var player=_status.event.player
				                var cards=player.getCards('hs',function(card){
				                    return get.type(card)=="equip"&&get.subtype(card)=="equip2";
				                });
				                return [1,cards.length]
				            },
				            filterTarget:function(card,player,target){
				                if(!target.inRangeOf(player)) return false;
				                return player.canUse({name:"sha"},target,false);
				            },
				            selectTarget:1,
				            sub:true,
				            check:function(card){return 1;},
				            filter:function(event,player){
				                return player.countCards('hs',function(card){
				                    return get.subtype(card)=="equip2";
				                })>=1;
				            },
				            content:function(){
				                player.loseToDiscardpile(cards[0]);
				                player.useCard({name:'sha'},target,false).set('addCount',false).set('baseDamage',2);
				            },
				            ai:{
				                damageBonus:true,
				                order:function(){
									return get.order({name:'sha'})+0.2;
								},
								result:{
								    target:function(player,target){
								        return lib.card.sha.ai.result.target.apply(this,arguments);
								    },
								},
				            },
				        },
				    },
				},
				"xjzh_sanguo_huchi":{
				    trigger:{
				        source:"damageEnd",
				    },
				    forced:true,
				    locked:true,
				    priority:13,
					audio:"ext:仙家之魂/audio/skill:2",
				    group:"xjzh_sanguo_huchi_use",
				    filter:function(event,player){
				        return event.getParent("xjzh_sanguo_luoyi_use").name=="xjzh_sanguo_luoyi_use";
				    },
				    content:function(){
				        var cards=get.cards(3);
				        var list=[]
				        player.showCards(cards);
				        for(var i=0;i<cards.length;i++){
				            if(get.type(cards[i])=="basic"||get.subtype(cards[i])=="equip2"){
				                list.push(cards[i]);
				                cards.remove(cards[i]);
				            }
				        }
				        if(list.length){
				            player.gain(list,player,"gain2");
				        }else{
				            player.recover();
				        }
				        while(cards.length){
				            var card=cards.pop();                        
				            card.fix();
				            ui.cardPile.insertBefore(card,ui.cardPile.firstChild);
				        };
				    },
				    subSkill:{
				        "use":{
				            trigger:{
				                player:["useCard","respond"],
				            },
					        audio:"ext:仙家之魂/audio/skill:2",
				            prompt:function(event,player){
				                var str="〖虎痴〗：你可以失去一点体力";
				                if(event.name=="useCard"&&get.name(event.card)=="sha"){
				                    str+="令"+get.translation(event.card)+"伤害+1或获得一张防具牌";
				                }else{
				                    str+="获得一张防具牌";
				                }
				                return str;
				            },
				            filter:function(event,player){
				                return get.type(event.card)=="basic";
				            },
				            sub:true,
				            check:function(event,player){
				                var player=_status.event.player
				                if(player.maxHp<=2) return 0;
				                return 1;
				            },
				            content:function(){
				                "step 0"
				                var controlList=[
				                    '失去一点体力获得一张防具牌',
						            '失去一点体力令'+get.translation(trigger.card)+'伤害+1',
				                ]
				                if(trigger.card&&(trigger.name=="useCard"&&get.name(trigger.card)!="sha")||trigger.name=="respond") controlList.remove(controlList[1]);
				                player.chooseControlList(get.prompt(event.name,player),controlList).set('ai',function(){
				                    var player=_status.event.player
				                    if(player.hp>1||trigger.target.countCards('h')>2){
				                        if(trigger.card.name=="sha") return 1;
				                    }
				                    return 0;
				                }).set('trigger.card',trigger.card);
				                "step 1"
				                if(result.index==0){
				                    var card=get.cardPile(function(card){
				                        return get.subtype(card)=="equip2";
				                    });
				                    if(card) player.gain(card,'gain2');
				                }
				                else if(result.index==1){
				                    if(!trigger.baseDamage) trigger.baseDamage=1
				                    trigger.baseDamage+=1
				                }
				                player.loseHp();
				            },
				        },
				    },
				},
				"xjzh_sanguo_qice":{
				    trigger:{
				        global:"useCard",
				    },
				    filter:function(event,player){
				        if(event.player==player) return false;
				        if(!event.cards||!event.cards.length) return false;
				        if(event.getParent("xjzh_sanguo_qice").name=="xjzh_sanguo_qice") return false;
				        return get.type(event.card)=="trick"||!event.card.isCard;
				    },
				    priority:13,
				    frequent:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    prompt:function(event,player){
				        return "〖奇策〗：是否发动展示牌堆顶一张牌使用之";
				    },
				    check:function(event,player){return 1;},
				    content:function(){
				        var cards=get.cards();
				        player.showCards(cards);
				        if(get.type(cards[0])=="trick"||get.suit(cards[0])==get.suit(trigger.card)||get.number(cards[0])==get.number(trigger.cards)){
							if(player.hasUseTarget(cards[0])){
								player.chooseUseTarget(cards[0]);
							}
				        }
				    },
				},
				"xjzh_sanguo_zhiyu":{
				    trigger:{
				        player:"damageEnd",
				    },
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(!event.cards||!event.cards.length) return false;
				        var suit=get.suit(event.card);
				        if(!game.hasPlayer(function(current){return current.countCards('hej')})) return false;
				        if(player.countCards('he',{suit:suit})==0) return false;
				        return true;
				    },
				    priority:13,
				    frequent:true,
				    check:function(event,player){
				        var player=_status.event.player
				        var suit=get.suit(event.card);
				        if(player.countCards('he',{suit:suit})>0) return 1;
				        return 0;
				    },
				    content:function(){
				        "step 0"
				        var suit=get.suit(trigger.card)
				        player.chooseToDiscard('〖智愚〗：请弃置一张'+get.suit(trigger.card)+'牌','he',1,{suit:suit}).set('ai',function(card){
				            return 8-get.value(card);
				        });
				        "step 1"
				        if(result.bool){
				            player.chooseTarget("〖智愚〗：请选择至多两名角色从其区域内获得至多两张牌",[1,2],function(card,player,target){
				                return target!=player&&target.countCards('hej');
				            }).set('ai',function(target){
				                var att=get.attitude(player,target);
				                if(target.countCards('j')&&att>0) return 1;
				                return -att;
				            });
				        }else{
				            event.finish();
				            return;
				        }
				        "step 2"
				        if(result.bool&&result.targets.length){
				            if(result.targets.length>1){
				                for(var i=0;i<result.targets.length;i++){
				                    player.gainPlayerCard(result.targets[i],'visible',true,'hej').set('ai',function(button){
									    var card=button.link;
								    	return get.value(card);
							    	});
							    }
				            }else{
				                player.gainPlayerCard([1,2],result.targets[0],'visible',true,'hej').set('ai',function(button){
								    var card=button.link;
								    return get.value(card);
							    });
				            }
				        }
				    },
				    ai:{
				        threaten:1.4,
				        effect:{
							target:function(card,player,target){
								if(get.tag(card,'damage')) return [1,2];
				            },
				        },
				    },
				},
				"xjzh_sanguo_zhiyu2":{
				    trigger:{
				        player:"damageEnd",
				    },
					audio:"xjzh_sanguo_zhiyu",
				    filter:function(event,player){
				        if(!game.hasPlayer(function(current){return current.countCards('hej')})) return false;
				        return true;
				    },
				    priority:13,
				    frequent:true,
				    check:function(event,player){
				        return 1;
				    },
				    content:function(){
				        "step 0"
				        player.chooseTarget("〖智愚〗：请选择至多两名角色从其区域内获得至多两张牌",[1,2],function(card,player,target){
				            return target!=player&&target.countCards('hej');
				        }).set('ai',function(target){
			                var att=get.attitude(player,target);
				            if(target.countCards('j')&&att>0) return 1;
				            return -att;
				        });
				        "step 1"
				        if(result.bool){
				            if(result.targets.length>1){
				                for(var i=0;i<result.targets.length;i++){
				                    player.gainPlayerCard(result.targets[i],'visible',true,'hej').set('ai',function(button){
									    var card=button.link;
								    	return get.value(card);
							    	});
							    }
				            }else{
				                player.gainPlayerCard([1,2],result.targets[0],'visible',true,'hej').set('ai',function(button){
								    var card=button.link;
								    return get.value(card);
							    });
				            }
				        }else{
				            event.finish();
				            return;
				        }
				    },
				    ai:{
				        threaten:1.4,
				        effect:{
							target:function(card,player,target){
								if(get.tag(card,'damage')) return [1,2];
				            },
				        },
				    },
				},
				"xjzh_sanguo_zhoufu":{
                    enable:"phaseUse",
                    trigger:{
                        player:"damageEnd",
                    },
                    usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
                    global:"xjzh_sanguo_zhoufu_judge",
                    locked:true,
                    prompt:"〖咒缚〗：是否将牌堆一张延时锦囊牌置入一名角色判定区？",
                    content:function(){
                        "step 0"
                        event.card=get.cardPile2(function(card){
					    	return get.type(card)=='delay';
			    	    });
				        if(event.card){
				            player.chooseTarget("〖咒缚〗：是否将"+get.translation(event.card)+"置入一名角色的判定区，否则你摸两张牌",function(card,player,target){
				                return (lib.filter.judge(event.card,player,target)&&player!=target);
				            }).set('ai',function(target){
				                return -get.attitude(player,target);
				            })
				            player.$throw(event.card,1000,'nobroadcast');
				        }
			    	    "step 1"
				        if(!result.bool){
				            if(event.card) player.loseToDiscardpile(event.card);
				            player.draw(2);
				        }else{
				            game.playAudio('card',player.sex,event.card.name);
				            result.targets[0].$gain2(event.card);
				            result.targets[0].addJudge(event.card);
				        }
                    },
                    subSkill:{
                        "judge":{
                            mod:{
                                judge:function(player,result){
					                if(result.bool==true){
							            result.bool=false;
							        }
						    	}
					    	},
				    		trigger:{
						        global:["phaseJudgeBegin"]
					    	},
				    		forced:true,
				    		priority:100,
					    	firstDo:true,
				    		popup:false,
				    		filter:function(event,player){
				    		    return event.player.countCards('j');
				    		},
						    content:function(){
						        trigger.set('noJudgeTrigger',true);
						        game.playXH('xjzh_sanguo_zhoufu_judge1');
					    	},
                        },
                    },
                    ai:{
                        order:8,
                        result:{
                            target:-1,
                        },
                    },
                },
                "xjzh_sanguo_yingbin":{
				    trigger:{
					    global:["phaseUseBegin",'useCardAfter','discardAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter','turnOverAfter'],
				    },
				    direct:true,
			    	locked:true,
		    		priority:10,
				    marktext:"兵",
			    	intro:{
				        name:"影兵",
				        content:"mark",
		    		},
					audio:"ext:仙家之魂/audio/skill:2",
				    group:"xjzh_sanguo_yingbin_judge",
			    	content:function(){
				        var count=game.countPlayer(function(current){
				            return current.countCards('j');
				        });
			    	    if(count>0){
				            if(!player.hasMark('xjzh_sanguo_yingbin')){
				                player.addMark('xjzh_sanguo_yingbin',1,false);
				                game.playXH(['xjzh_sanguo_yingbin1','xjzh_sanguo_yingbin2'].randomGet());
				            }
				            if(!player.isTurnedOver()){
				                player.turnOver(true);
				            }
				        }else{
				            if(player.hasMark('xjzh_sanguo_yingbin')){
				                player.removeMark('xjzh_sanguo_yingbin',1,false);
				                game.playXH(['xjzh_sanguo_yingbin1','xjzh_sanguo_yingbin2'].randomGet());
				            }
				            player.turnOver(false);
			    	    }
		    		},
		    		subSkill:{
				        "judge":{
				            forced:true,
				            priority:10,
				            trigger:{
				                global:"phaseJudgeBegin",
				            },
				            sub:true,
				            audio:"ext:仙家之魂/audio/skill:2",
				            filter:function(event,player){
				                if(!player.hasMark("xjzh_sanguo_yingbin")) return false;
				                if(event.player.countCards('j')<=0) return false;
				                return player.countCards('h');
				            },
				            content:function(){
				                "step 0"
				                player.useSkill("xjzh_sanguo_zhoufu");
				                player.addTempSkill("xjzh_sanguo_yingbin_use","xjzh_sanguo_yingbin_judgeAfter");
				                "step 1"
				                if(!player.hasMark("xjzh_sanguo_yingbin")){
				                    event.finish();
				                    return;
				                }
				                var cards=player.getCards('h');
				                var cards2=cards.filter(function(card){
				                    var info=get.info(card);
				                    if(info.range) return player.hasUseTarget(card,game.filterPlayer(function(current){
				                        return current.inRangeOf(player);
				                    }),false);
				                    return player.hasUseTarget(card);
				                });
					        	event.use=[];
				    	    	if(cards2.length){
							        event.use=cards2;
					        	}
					        	"step 2"	
				        		if(event.use.length){
						        	var str='是否发动〖影兵〗<br>选择一张牌使用之?';
						        	player.chooseCardButton(event.use,1,str).set('filterButton',function(button){
							        	var info=get.info(button.link);
				                        if(info=="range") return _status.event.player.hasUseTarget(button.link,game.filterPlayer(function(current){
							        	    return current.inRangeOf(player);
							        	}),false);
							        	return _status.event.player.hasUseTarget(button.link);
						        	}).set('ai',function(button){
						        	    var player=_status.event.player;
						        	    if(player.hasUseTarget(button.link,game.filterPlayer(function(current){
						        	        return current.inRangeOf(player);
						        	    }),false)) return player.getUseValue(button.link);
						        	    return 0;
						        	});
						        }else{
						            event.finish();
						        }
						        "step 3"
						        if(result.bool){
						            if(player.hasUseTarget(result.links[0])){
						                var info=get.info(result.links[0]);
						                if(info.range){
						                    player.chooseUseTarget(result.links[0],true,game.filterPlayer(function(current){
						                        return current.inRangeOf(player);
						                    }),false);
						                }else{
						                    player.chooseUseTarget(result.links[0]);
						                }
						            }
						            event.goto(1);
						        };
						    },
						},
						"use":{
						    direct:true,
						    priority:12,
						    trigger:{
						        player:"useCard",
						    },
						    sub:true,
						    content:function(){
						        var card=get.cardPile2(function(card){
					        	    return get.type(card)!=get.type(trigger.card);
				                });
				                if(card) player.gain(card,'draw',player);
				             },
				         },
			    	},
			    },
			    "xjzh_sanguo_tanzhi":{
			        trigger:{
			            player:"phaseZhunbeiBegin",
			        },
			        mod:{
						playerEnabled:function(card,player,target){
						    if(!player.storage.xjzh_sanguo_tanzhi) return;
						    if(!player.storage.xjzh_sanguo_tanzhi.length) return;
							if(player.storage.xjzh_sanguo_tanzhi.includes(target)) return false;
						},
					},
					audio:"ext:仙家之魂/audio/skill:1",
			        prompt:"〖贪智〗：是否发动技能猜测其他角色的手牌？",
			        frequent:true,
			        priority:3,
			        filter:function(event,player){
			            return game.countPlayer(function(current){
			                return current!=player&&current.countCards('h');
			            })>0;
			        },
			        check:function(event,player){
			            return 0.5;
			        },
			        marktext:"贪智",
			        intro:{
			            name:"贪智",
			            content:"本回合袁绍无法对你使用牌",
			        },
			        content:function(){
			            "step 0"
			            event.targets=game.filterPlayer(function(current){
			                return current!=player&&current.countCards('h');
			            });
			            "step 1"
			            event.targets2=event.targets.shift();
			            var inpile=lib.inpile.slice(0);
						var text='请选择猜测'+get.translation(event.targets2)+'的一张手牌的牌名';
						player.chooseVCardButton(true,inpile,text).set('ai',function(){
							return inpile.randomGet();
						});
						"step 2"
						if(result.bool){
						    var card=game.createCard(result.links[0][2]);
						    if(event.targets2.countCards('h',{name:card.name})){
						        var card2=event.targets2.getCards('h').filter(function(cards){
						            return cards.name==result.links[0][2];
						        }).randomGet();
						        player.gain(card2,event.targets,'draw');
						    }else{
						        if(!player.storage.xjzh_sanguo_tanzhi) player.storage.xjzh_sanguo_tanzhi=[]
						        player.storage.xjzh_sanguo_tanzhi.push(event.targets2);
						        var evt=event.getParent("phase");
					            if(evt&&evt.getParent&&!evt.xjzh_sanguo_tanzhi) evt.xjzh_sanguo_tanzhi=true;
						    }
						    if(event.targets&&event.targets.length) event.goto(1);
						}
						"step 3"
						if(!player.storage.xjzh_sanguo_tanzhi.length) return;
						for(var target of player.storage.xjzh_sanguo_tanzhi){
						    target.markSkill("xjzh_sanguo_tanzhi");
						}
						var evt=event.getParent("phase");
					    if(evt&&evt.getParent&&evt.xjzh_sanguo_tanzhi){
					        var next=game.createEvent('xjzh_sanguo_tanzhi_delete',false,evt.getParent());
					        next.player=player;
					        next.setContent(function(){
					            if(player.storage.xjzh_sanguo_tanzhi.length){
					                for(var target of player.storage.xjzh_sanguo_tanzhi){
						                target.unmarkSkill("xjzh_sanguo_tanzhi");
						            }
					                delete player.storage.xjzh_sanguo_tanzhi;
					            }
					        });
					    }
			        },
			    },
			    "xjzh_sanguo_mingmen":{
			        enable:"phaseUse",
				    position:'he',
				    usable:1,
				    filterCard:lib.filter.cardDiscardable,
			        filter:function(event,player){
			            return player.countCards('he');
			        },
					audio:"ext:仙家之魂/audio/skill:2",
			        content:function(){
			            "step 0"
			            var cards=Array.from(ui.cardPile.childNodes).randomGet();
						var card=ui.create.card();
						card.classList.add('infohidden');
						card.classList.add('infoflip');
						player.$throw(card,1000,'nobroadcast');
						game.log(player,"扣置了一张牌在场上");
						game.delay(2);
						event.list={
						    1:get.suit(cards),
						    2:get.number(cards),
						    3:get.type(cards),
						    4:cards.name,
						}
						event.num=0;
						event.num2=1;
						"step 1"
						var str="";
						switch(event.num2){
						    case 1:
						    str+="请猜测此牌的花色";
						    var controlList=lib.suit.slice(0);
						    break;
						    case 2:
						    str+="请猜测此牌的点数";
						    var controlList=[];
						    for(var i=1;i<=13;i++){
						        controlList.push(i);
						    }
						    break;
						    case 3:
						    str+="请猜测此牌的类型";
						    var controlList=["basic","equip","delay","trick"];
						    break;
						    case 4:
						    var names=event.list[event.num2];
						    var translates=lib.translate[names];
						    var name2=Array.from(translates).randomGet();
			                var controlList=lib.inpile.slice(0);
						    str+="请猜测此牌的牌名，温馨提示：这张牌的牌名可能包含这个字——"+name2;
						    break;
						}
						if(event.num2<4){
						    var str2="";
						    var dialog=ui.create.dialog('forcebutton','hidden');
						    switch(event.num2){
						        case 1:
						        var suitx=event.list[event.num2];
						        if(["heart","red"].includes(suitx)){
						            str2+="这张牌可能不是黑色";
						        }else{
						            str2+="这张牌可能不是红色";
						        }
						        break;
						        case 2:
						        var number=event.list[event.num2];
						        if(number%2==0){
						            str2+="这张牌的点数可能没有余数";
						        }else{
						            str2+="这张牌的点数不可能没有余数";
						        }
						        break;
						        case 3:
						        str2+="这张牌的类型可能没有提示！";
						        break;
						    }
			                dialog.addText(str2);
						    player.chooseControl(controlList).set('prompt',str).set('dialog',dialog);
						}else{
						    player.chooseVCardButton(true,controlList,str).set('ai',function(){
							    return controlList.randomGet();
						    });
						}
						"step 2"
						if(event.num2<4){
						    var boolx=result.control;
						    if(event.list[event.num2]==boolx){
						        event.num++;
						    }else{
						        game.log("你猜错了!");
						    }
						}else{
						    var boolx=result.links[0][2];
						    if(event.list[event.num2]==boolx){
						        event.num++;
						    }else{
						        game.log("你猜错了!");
						    }
						}
						"step 3"
						if(event.num2<4){
						    event.num2++
						    event.goto(1);
						}
						"step 4"
						game.log(player,"猜中",event.num,"项");
						switch(event.num){
						    case 0:
						    player.damage(1,'nosource','nocard');
						    break;
						    case 1:
						    var list=["basic","equip","delay","trick"];
						    player.chooseControl(list).set('prompt','请选择你要获得牌的类型').set('ai',function(){
						        return list.randomGet();
						    });
						    break;
						    case 2:
						    if(player.hasUseTarget({name:"wanjian"})) player.chooseUseTarget({name:"wanjian"},true);
						    player.draw();
						    break;
						    case 3:
						    game.countPlayer(function(current){
						        if(current!=player){
						            if(current.countGainableCards(player,'he')) player.gainPlayerCard('he',current,true);
					            }
						    });
						    if(player.hasUseTarget({name:"wanjian"})) player.chooseUseTarget({name:"wanjian"},true);
						    break;
						    case 4:
						    player.chooseTarget([1,game.players.length],"选择任意名目标令其各摸一张牌，取消则你摸牌").set('ai',function(target){
						        return get.attitude(player,target);
						    });
						    break;
						}
						if(event.num!=0){
						    player.getStat().skill.xjzh_sanguo_mingmen-=1
						}
						if(event.num==0||event.num==2||event.num==3){
						    event.finish();
						    return;
						}
						"step 5"
						if(event.num==1){
						    if(result.control){
						        var control=result.control;
						        var card=get.cardPile(function(card){
						            return get.type(card)==control;
						        });
						        if(card) player.gain(card,player,'gain2','log');
						    }
						}
						else if(event.num==4){
						    if(result.bool&&result.targets&&result.targets.length){
						        var targets=result.targets;
						        for(var target of targets){
						            target.draw();
						        }
						        var targets2=game.filterPlayer(function(current){
						            return !targets.includes(current);
						        });
						        for(var target of targets2){
						            target.damage(1,player,'nocard');
						            target.addTempSkill("baiban",{player:"phaseBefore"})
						        }
						    }else{
						        var friends=player.getFriends(true);
						        player.draw(friends.length);
						        var targets=game.filterPlayer(function(current){
						            return !friends.includes(current);
						        });
						        for(var target of targets){
						            target.damage(1,player,'nocard');
						            target.addTempSkill("baiban",{player:"phaseBefore"})
						        }
						    }
						}
			        },
			    },
			    "xjzh_sanguo_zhiti":{
			        trigger:{
			            player:"disableEquipBefore",
			        },
			        forced:true,
			        priority:3,
			        firstDo:true,
			        marktext:"止",
			        intro:{
			            name:"止啼",
			            content:"#",
			        },
			        global:"xjzh_sanguo_zhiti_mod",
			        group:"xjzh_sanguo_zhiti_damage",
					audio:"ext:仙家之魂/audio/skill:2",
			        init:function(player){
                        event.listEquip=[
                            'equip1',
                            'equip2',
                            'equip3',
                            'equip4',
                            'equip5',
                        ];
                        while(event.listEquip.length){
                            var pos=event.listEquip.shift();
                            if(player.hasEmptySlot(pos)){
                                var equip=get.cardPile(function(card){
                                    return get.type(card)=='equip'&&get.subtype(card)==pos;
                                });
                                if(equip){
                                    player.equip(equip);
                                    player.$gain2(equip,false);
                                };
                            };
                        }
			        },
					content:function(){
					    trigger.cancel(null,null,'notrigger');
					},
					subSkill:{
					    "damage":{
					        trigger:{
					            source:"damageAfter",
					            player:"damageAfter",
					        },
					        forced:true,
					        sub:true,
					        priority:-1,
					        lastDo:true,
					        audio:"xjzh_sanguo_zhiti",
					        filter:function(event,player){
					            var evt=event.getParent(2);
					            if(event.source!=player&&event.player==player){
					                return game.hasPlayer(function(current){return current.hasMark("xjzh_sanguo_zhiti")});
					            }
					            return evt.skill!="xjzh_sanguo_cuifengx_use"&&event.player.isAlive();
					        },
					        content:function(){
					            "step 0"
					            if(trigger.player!=player&&trigger.source==player){
					                trigger.player.addMark("xjzh_sanguo_zhiti",1);
					                event.finish();
					            }
					            else if(trigger.player==player){
			                        player.chooseTarget(2,"〖止啼〗：移动场上一名角色的“止”标记",function(card,player,target){
			                            if(ui.selected.targets.length==0) return target.hasMark("xjzh_sanguo_zhiti");
			                            if(ui.selected.targets.length==1) return true;
			                            return false;
			                        }).set('ai',function(target){
			                            var att=get.attitude(player,target);
			                            if(ui.selected.targets.length==0) return att>0;
			                            return -att;
			                        });
					            }
					            "step 1"
			                    if(result.bool&&result.targets.length){
			                        result.targets[1].addMark("xjzh_sanguo_zhiti",1);
			                        result.targets[0].removeMark("xjzh_sanguo_zhiti",1);
			                        result.targets[0].useCard({name:'sha'},result.targets[1],false);
			                    }
					        },
					    },
					    "mod":{
					        charlotte:true,
			                locked:true,
					        mod:{
						        maxHandcard:function (player,num){
							        var numx=0
							        for(var i=0;i<game.players.length;i++){
							            numx+=game.players[i].countMark("xjzh_sanguo_zhiti");
							        }
							        var list=[]
							        var bool=false
							        if(player.name) list.push(player.name);
							        if(player.name1) list.push(player.name1);
							        if(player.name2) list.push(player.name2);
							        for(var i of list){
							            if(i.indexOf("xjzh_sanguo_zhangliao")==0) bool=true;
							        }
							        if(bool==true) return num+=numx
							        return num-=player.countMark("xjzh_sanguo_zhiti");
						        },
					        },
					    },
					},
			    },
			    "xjzh_sanguo_cuifengx":{
			        trigger:{
			            global:["addMark","removeMark"],
			        },
			        forced:true,
			        priority:10,
			        locked:true,
			        group:"xjzh_sanguo_cuifengx_use",
					audio:"ext:仙家之魂/audio/skill:2",
			        filter:function(event,player){
			            if(event.player==player) return false;
			            if(event.markname!="xjzh_sanguo_zhiti") return false;
			            return true;
			        },
			        content:function(){
			            if(trigger.name=="addMark"){
			                trigger.player.chooseToDisable();
			            }else{
			                trigger.player.chooseToEnable();
			            }
			        },
			        subSkill:{
			            "use":{
			                trigger:{
			                    global:"useCard2",
			                },
			                sub:true,
			                filter:function(event,player){
			                    if(!event.player.hasMark("xjzh_sanguo_zhiti")) return false;
			                    return true;
			                },
			                audio:"xjzh_sanguo_cuifengx",
			                prompt:function(event,player){
			                    if(event.player.isMaxMark("xjzh_sanguo_zhiti")) return `〖止啼〗：是否对${get.translation(event.player)}造成${event.player.countMark("xjzh_sanguo_zhiti")}点伤害`;
			                    return `〖止啼〗：是否选择${Math.min(event.player.countMark("xjzh_sanguo_zhiti"),game.players.length-1)}个角色成为${get.translation(event.card)}的额外目标`;
			                },
			                content:function(){
			                    "step 0"
			                    if(trigger.player.isMaxMark("xjzh_sanguo_zhiti")){
			                        trigger.player.damage(trigger.player.countMark("xjzh_sanguo_zhiti"),player,'nocard');
			                        trigger.player.addTempSkill('baiban',{player:"phaseBegin"});
			                        trigger.player.clearMark("xjzh_sanguo_zhiti");
			                        event.finish();
			                    }else{
			                        player.chooseTarget(`〖止啼〗：请选择${Math.min(trigger.player.countMark("xjzh_sanguo_zhiti"),game.players.length-1)}个角色成为${get.translation(trigger.card)}的额外目标`,Math.min(trigger.player.countMark("xjzh_sanguo_zhiti",game.players.length-1)),function(card,player,target){
                                        var user=_status.event.user;
                                        return lib.filter.targetEnabled2(_status.event.card,user,target);
                                    }).set('ai',function(target){
			                            var trigger=_status.event.getTrigger();
                                        var user=_status.event.user;
                                        var player=_status.event.player;
                                        return get.effect(target,trigger.card,user,player)*(_status.event.targets.includes(target)?-1:1)-3;
                                    }).set('targets',trigger.targets).set('card',trigger.card).set('user',trigger.player);
			                    }
			                    "step 1"
			                    if(result.bool&&result.targets.length){
			                        trigger.player.clearMark("xjzh_sanguo_zhiti");
			                        for(var i of result.targets){
			                            trigger.targets.push(i)
			                        }
			                    }
			                },
			            },
			        },
			    },
			    "xjzh_sanguo_xingyi":{
			        enable:"phaseUse",
			        usable:1,
			        filterTarget:function(card,player,target){
			            return target.countCards('h');
			        },
			        audio:"ext:仙家之魂/audio/skill:2",
			        content:function(){
			            "step 0"
			            var cards=target.getCards('h');
			            target.discard(cards);
			            target.draw(cards.length+target.hp);
			            "step 1"
			            var cards=result.slice(0);
			            var list=[]
			            for(var i=0;i<cards.length;i++){
			                if(get.suit(cards[i])=="heart") list.push(cards[i]);
			            }
			            var num=list.length;
			            var num2=target.getDamagedHp();
			            target.recover(num);
			            if(num-num2>0){
			                player.draw(num-num2);
			            }else{
			                event.finish();
			                return;
			            }
			            "step 2"
			            if(get.xjzh_deEffect(target)){
			                var list=[]
			                if(target.isTurnedOver()) list.push("翻面");
			                if(target.countCards('j',function(card){return card.name!="jydiy_yungongliaoshang"})>0) list.push("判定区");
			                if(target.isLinked()) list.push("横置");
			                if(target.countDisabled()>=1) list.push("装备栏");
			                if(!list.length) return;
			                target.chooseControl(list,"cancel2").set('ai',function(){
			                    return list.randomGet();
			                }).set('prompt',"〖行医〗：选择一项移除负面状态");
			            }
			            "step 3"
			            if(result.control){
			                if(result.control=="翻面"){
			                    target.turnOver(false);
			                }
			                else if(result.control=="判定区"){
			                    target.discard(target.getCards("j",function(card){return card.name!="jydiy_yungongliaoshang"}));
			                }
			                else if(result.control=="横置"){
			                    target.link(false);
			                }
			                else if(result.control=="装备栏"){
			                    target.chooseEnable();
			                }
			            }
			        },
			        ai:{
			            order:12,
			            result:{
			                target:function(target){
			                    var cards=target.countCards('h');
			                    var hp=target.hp
			                    return cards+hp;
			                },
			                player:function(player){
			                    var num=get.xjzh_deEffect2(player);
			                    if(num=0) return player.countCards('h');
			                    return player.countCards('h')+num;
			                },
			            },
			        },
			    },
			    "xjzh_sanguo_qingnang":{
			        trigger:{
			            global:"changeHp",
			        },
			        usable:1,
			        audio:"ext:仙家之魂/audio/skill:2",
			        prompt:function(event,player){
			            var str="";
			            if(event.player.isDamaged()){
			                str+="〖青囊〗：是否令"+get.translation(event.player)+"交换体力与已损体力？";
			            }else{
			                if(event.getParent('xjzh_sanguo_xingyi').name=='xjzh_sanguo_xingyi') str+="〖青囊〗：是否令"+get.translation(player)+"获得一点体力上限？";
			            }
			            return str;
			        },
			        check:function(event,player){
			            var att=get.attitude(player,event.player);
			            if(event.player==player){
			                if(player.hp<=player.getDamagedHp()) return 10;
			            }
			            if(event.player!=player){
			                if(event.player.hp>event.player.getDamagedHp()) return -att;
			                return att;
			            }
			            return 0;
			        },
			        filter:function(event,player){
			            if(event.player.isHealthy()) return false;
			            if(event.player.isDying()) return false;
			            if(event.type=="dying") return false;
			            if(event.getParent("xjzh_sanguo_qingnang").name=="xjzh_sanguo_qingnang") return false;
			            return true;
			        },
			        content:function(){
			            "step 0"
			            var num=trigger.player.getDamagedHp()-trigger.player.hp;
			            trigger.player.changeHp(num);
			            "step 1"
			            if(trigger.player.hp>=trigger.player.getDamagedHp()){
			                trigger.player.gainMaxHp();
			                if(player.maxHp<game.players.concat(game.dead).length) player.gainMaxHp();
			            }
			        },
			    },
			    "xjzh_sanguo_elai":{
			        enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:3",
					async content(event,trigger,player){
			            await player.loseHp();
			            const evt=await player.draw(player.getDamagedHp(true)+1);
			            const cards=evt.result.filter(card=>get.type(card)=="equip");
			            if(!cards.length) return;
			            const {result:{bool,links}}=await player.chooseCardButton([1,cards.length],cards,'〖恶来〗：请选择并弃置任意张装备牌').set('ai',function(button){
					        return 8-get.value(button.link);
					    });
					    if(bool&&links.length){
					        player.discard(links)._triggered=null;
					        const {result:{bool,targets}}=await player.chooseTarget("〖恶来〗：请选择一名其他角色令其受到"+get.translation(links.length)+"点伤害",lib.filter.notMe).set('ai',function(target){
					            if(get.damageEffect(target,_status.event.player,_status.event.player)) return 1;
					        });
					        if(bool&&targets.length){
					            await targets[0].damage(links.length,player,"nocard");
					            await player.discardPlayerCard('he',targets[0],links.length,true);
					        }
					    }
			        },
			        ai:{
			            order:function(item,player){
			                return player.getDamagedHp()+0.1;
			            },
			            result:{
			                player:function(player){
							    if(player.countCards('h')>=player.hp-1) return -1;
							    if(player.hp<2) return -1;
							    return 1;
						    }
					    }
				    }
			    },
			    "xjzh_sanguo_tiequ":{
			        trigger:{
			            player:"damageBegin1",
			        },
					audio:"ext:仙家之魂/audio/skill:2",
					filter(event,player){
					    if(player.countCards('h')<=0) return false;
					    return event.source!=undefined;
					},
					frequent:true,
					check(event,player){
					    var source=event.source
			            var att=get.attitude(player,event.source);
			            if(att>0) return event.source.hp>=2;
		                return -att;
					},
					async content(event,trigger,player){
					    const cards=player.getCards('h').randomGet();
					    player.showCards(cards)
					    const {result:{bool}}=await trigger.source.chooseToDiscard('he',`〖铁躯〗：请弃置一张类型为${get.translation(get.type(cards))}的牌，否则失去一点体力`,{type:get.type(cards)}).set('ai',card=>{
					        return get.unuseful(card)+2.5*(5-get.owner(card).hp);
					    });
					    if(!bool) trigger.source.loseHp();
					},
			    },
			    "xjzh_sanguo_guhuo":{
			        enable:"phaseUse",
			        usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
			        init:function(player){
			            if(game.zhu==player&&player.identity=="zhu"&&player.isZhu) game.chooseCharacter();
					    if(!lib.config.xjzh_sanguo_guhuo&&game.me==player){
					        alert("游玩此武将，为获得良好的游戏体验，建议关闭“自动标记身份”，此提示仅显示一次")
					        game.saveConfig('xjzh_sanguo_guhuo',true);
					    }
			        },
			        locked:true,
			        mode:["identity"],
			        group:["xjzh_sanguo_guhuo_use","xjzh_sanguo_guhuo_id"],
			        content:function(){
			            "step 0"
			            var list=["nei","fan","zhong"];
			            player.chooseControl(list).set('ai',function(){
			                return list.randomGet();
			            }).set('prompt','〖蛊惑〗：选择一张身份牌展示在武将牌上');
			            "step 1"
			            if(result.control){
			                var id=result.control
			                player.node.identity.show();
						    player.node.identity.firstChild.innerHTML=get.translation(id);
						    player.storage.xjzh_sanguo_guhuo=id
						    game.log(player,"展示的身份牌为","#y"+id)
			            }
			        },
			        ai:{
			            order:12,
			            result:{
			                player:10,
			            },
			        },
			        subSkill:{
			            "use":{
			                trigger:{
			                    target:"useCardToTarget",
			                },
			                audio:"xjzh_sanguo_guhuo",
			                forced:true,
			                priority:100,
			                firstDo:true,
			                sub:true,
			                filter:function(event,player){
			                    if(event.player==player) return false;
			                    return player.storage.xjzh_sanguo_guhuo;
			                },
			                content:function(){
			                    "step 0"
			                    if(trigger.player.hasMark("xjzh_sanguo_chanyuan")){
			                        event.caice=true;
			                        event.goto(3);  
			                    }
			                    trigger.player.chooseBool("〖蛊惑〗："+get.translation(player)+"的身份是否为"+get.translation(player.storage.xjzh_sanguo_guhuo)+"？").set('ai',function(){
			                        return Math.random() 
			                    });
			                    "step 1"
			                    game.delayx(1.5);
			                    if(result.bool){
			                        event.bool=false;
			                        var id=player.identity
			                        var id2=player.storage.xjzh_sanguo_guhuo
			                        if(id!=id2){
			                            trigger.getParent().targets.remove(player);
			                            player.draw();
			                            event.bool=true;
			                            game.log(trigger.player,"猜错了于吉的身份","#y〖"+get.translation(trigger.card)+"〗","失效了");
			                        }
			                    }else{
			                        event.bool=false;
			                        var id=player.identity
			                        var id2=player.storage.xjzh_sanguo_guhuo
			                        if(id==id2){
			                            trigger.getParent().targets.remove(player);
			                            player.draw();
			                            event.bool=true;
			                            game.log(trigger.player,"猜错了于吉的身份","#y〖"+get.translation(trigger.card)+"〗","失效了");
			                        }
			                    }
			                    "step 2"
			                    if(event.bool==true){
			                        trigger.player.addMark("xjzh_sanguo_chanyuan",1);
			                        var id=["nei","fan","zhong"].randomGet();
			                        player.identity=id;
			                        player.setIdentity(id);
			                        player.node.identity.show();
			                        player.node.identity.firstChild.innerHTML=get.translation(player.storage.xjzh_sanguo_guhuo);
			                        if(game.zhu.isAlive()&&player.identity=="zhong"){
			                            if(!game.countPlayer(function(current){return current.identity=="fan"})&&!game.countPlayer(function(current){return current.identity=="nei"})) game.over(true);
			                        }
			                    }
			                    event.finish();
			                    return;
			                    "step 3"
			                    if(event.caice==true){
			                        trigger.getParent().targets.remove(player);
			                        player.draw(2);
			                        game.log(trigger.player,"因〖缠怨〗导致","#y〖"+get.translation(trigger.card)+"〗","失效了");
			                    }
			                },
			            },
			            "id":{
			                trigger:{
			                    global:"gameStart",
			                    player:"enterGame",
			                },
			                direct:true,
			                priority:100,
			                firstDo:true,
			                sub:true,
			                content:function(){
			                    var list=[]
			                    var players=game.filterPlayer();
			                    for(var i of players){
			                        if(i.isZhu||list.includes(i.identity)) continue;
			                        list.add(i.identity);
			                    }
			                    var id=list.randomGet();
			                    player.identity=id;
			                    player.setIdentity(id);
			                    /*player.showIdentity();
					            game.log(player.identity)
					            var id2=lib.translate[list.remove(id).randomGet()];
					            player.node.identity.firstChild.innerHTML=id2;
					            game.log(player.identity);*/
					            if(!player.storage.xjzh_sanguo_guhuo) player.node.identity.hide();
			                },
			            },
			        },
			    },
			    "xjzh_sanguo_chanyuan":{
                    trigger:{
                        player:"useCard2",
                    },
					audio:"ext:仙家之魂/audio/skill:2",
                    forced:true,
                    priority:100,
                    locked:true,
			        mode:["identity"],
                    filter:function (event,player){
                        var type=get.type(event.card)
                        if(type!='basic'&&type!='trick') return false;
                        var info=get.info(event.card);
                        if(info.allowMultiple==false) return false;
                        if(!info.enable) return false;
                        if(event.targets&&!info.multitarget){
                            if(game.hasPlayer(function(current){
                                return lib.filter.targetEnabled2(event.card,player,current)&&!event.targets.includes(current)&&current.hasMark("xjzh_sanguo_chanyuan");
                            })){
                                return true;
                            }
                        }
                        return false;
                    },
			        marktext:"缠",
			        intro:{
			            name:"缠怨",
			            content:"mark",
			        },
					mod:{
						maxHandcard:function (player,num){
							var players=game.players
							var numx=0
							for(var i=0;i<players.length;i++){
							    if(players[i].hasMark("xjzh_sanguo_chanyuan")) numx=+players[i].countMark("xjzh_sanguo_chanyuan");
							}
							return num+numx;
						},
					},
					group:["xjzh_sanguo_chanyuan_draw"],
                    content:function (){
                        'step 0'
                        var num=game.countPlayer(function(current){return current.hasMark("xjzh_sanguo_chanyuan")});
                        var prompt2='〖缠怨〗：额外指定一名'+get.translation(trigger.card)+'的目标'
                        player.chooseTarget(num,get.prompt('xjzh_sanguo_chanyuan'),function(card,player,target){
                            var player=_status.event.player;
                            if(_status.event.targets.includes(target)) return false;
                            if(!target.hasMark("xjzh_sanguo_chanyuan")) return false;
                            return lib.filter.targetEnabled2(_status.event.card,player,target);
                        }).set('prompt2',prompt2).set('ai',function(target){
                            var trigger=_status.event.getTrigger();
                            var player=_status.event.player;
                            return get.effect(target,trigger.card,player,player);
                        }).set('targets',trigger.targets).set('card',trigger.card);
                        'step 1'
                        if(result.bool){
                            if(!event.isMine()) game.delayx();
                            trigger.targets.addArray(result.targets)
                            for(var i of result.targets){
                                i.removeMark("xjzh_sanguo_chanyuan",1);
                            }
                        }
                        else{
                            event.finish();
                        }
                    },
                    subSkill:{
                        "draw":{
                            trigger:{
                                player:"phaseBegin1",
                            },
                            forced:true,
                            priority:1,
                            sub:true,
                           	filter:function(event,player){
                           	    return !event.numFixed;
                           	},
                            content:function(){
                                var numx=0
                                var players=game.players
							    for(var i=0;i<players.length;i++){
							        if(players[i].hasMark("xjzh_sanguo_chanyuan")) numx=+players[i].countMark("xjzh_sanguo_chanyuan");
							    }
							    trigger.num+=numx
                            },
                        },
                    },
                },
                "xjzh_sanguo_jianjie":{
                    trigger:{
                        global:"gameStart",
                        player:"enterGame",
                    },
                    forced:true,
                    priority:10,
                    locked:true,
                    mark:true,
                    marktext:"杰",
					intro:{
						mark:function(dialog,storage,player){
							if(storage&&storage.length){
								if(player.isUnderControl(true)){
									dialog.addSmall([storage,'character']);
								}
								else{
									dialog.addText('共有'+get.cnNumber(storage.length)+'张武将牌');
								}
							}
							else{
								return '没有武将牌';
							}
						},
						content:function(storage,player){
							return '共有'+get.cnNumber(storage.length)+'张武将牌'
						},
						markcount:function(storage,player){
							if(storage&&storage.length) return storage.length;
							return "";
						},
					},
					init:function(player){
					    if(!player.storage.xjzh_sanguo_jianjie){
					        player.storage.xjzh_sanguo_jianjie=[]
					        if(game.roundNumber>=1){
					            var next=game.createEvent('xjzh_sanguo_jianjie_add',false);
					            next.player=player;
					            next.setContent(lib.skill.xjzh_sanguo_jianjie.content);
					        }
					    }
					},
					audio:"ext:仙家之魂/audio/skill:2",
					group:"xjzh_sanguo_jianjie_use",
                    content:function(){
                        var targets=game.xjzh_wujiangpai(["pangtong","shiyuan","fengchu","庞统","士元","凤雏","诸葛亮","孔明","卧龙","zhugeliang","kongming","wolong"]);
						if(targets.length) player.storage.xjzh_sanguo_jianjie=targets.slice(0);
						player.update();
						player.updateMarks();
                    },
                    subSkill:{
                        "use":{
                            trigger:{
                                global:"phaseZhunbeiBegin",
                            },
                            forced:true,
                            priority:12,
                            sub:true,
                            filter:function(event,player){
                                return player.storage.xjzh_sanguo_jianjie&&player.storage.xjzh_sanguo_jianjie.length;
                            },
                            audio:"xjzh_sanguo_jianjie",
                            content:function(){
                                "step 0"
                                var list=player.storage.xjzh_sanguo_jianjie
                                player.chooseButton(trigger.player==player?true:false).set('ai',function(button){
                                    var att=get.attitude(player,event.player);
                                    if(att>0) get.rank(button.link,true);
                                    return 0;
                                }).set('createDialog',['〖荐杰〗：'+get.translation(trigger.player)+'的回合开始，请选择一张武将牌',[list,'character']]);
                                "step 1"
                                if(result.links){
                                    var name=result.links[0]
                                    var list=[]
                                    var skills=lib.character[name][3]
                                    for(var i=0;i<skills.length;i++){
                                        var info=get.info(skills[i]);
                                        if(info&&(info.limited||info.juexingji||info.dustSkill||info.sub)) continue;
                                        trigger.player.addTempSkill(skills[i]);
                                    }
                                    trigger.player.storage.xjzh_sanguo_jianjie_damage=player;
                                    player.addSkill("xjzh_sanguo_jianjie_damage");
                                    player.storage.xjzh_sanguo_jianjie.remove(name);
                                }
                            },
                        },
                        "damage":{
                            trigger:{
                                global:"phaseAfter",
                            },
                            forced:true,
                            priority:12,
                            sub:true,
					        audio:"xjzh_sanguo_jianjie",
                            filter:function(event,player){
                                return event.player.storage.xjzh_sanguo_jianjie_damage;
                            },
                            content:function(){
                                "step 0"
                                event.targets=game.filterPlayer(function(current){return current!=player});
                                event.targets.sortBySeat(event.player);
                                "step 1"
                                if(event.targets.length){
                                    event.target=event.targets.shift();
                                    event.target.chooseCard("〖荐杰〗：选择一张牌交给司马徽或受到"+get.translation(trigger.player)+"造成的一点伤害").set('ai',function(card){
                                        var att=get.attitude(player,event.target);
                                        if(att>0) return 12-get.value(card);
                                        return 4-get.value(card);
                                    });
                                }else{
                                    event.finish();
                                }
                                "step 2"
                                if(result.bool&&result.cards.length){
                                    player.gain(result.cards,event.target,'draw');
                                }else{
                                    event.target.damage(1,trigger.player,'nocard');
                                }
                                "step 3"
                                if(event.targets.length){
                                    event.goto(1);
                                }else{
                                    player.removeSkill("xjzh_sanguo_jianjie_damage");
                                }
                            },
                        },
                    },
                },
                "xjzh_sanguo_yinshi":{
                    trigger:{
                        player:"damageBegin1",
                    },
                    forced:true,
                    priority:1,
                    locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
                    group:"xjzh_sanguo_yinshi_use",
                    filter:function(event,player){
                        if(_status.currentPhase==player) return false;
                        return player.storage.xjzh_sanguo_jianjie&&player.storage.xjzh_sanguo_jianjie.length;
                    },
                    content:function(){
                        trigger.cancel(null,null,'notrigger');
                    },
                    ai:{
                        effect:{
                            target:function(card,player,target){
                                if(get.tag(card,'damage')&&_status.currentPhase!=target&&target.storage.xjzh_sanguo_jianjie&&target.storage.xjzh_sanguo_jianjie.length){
                                    if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                                    return [0,0];
                                }
                            },
                        },
                    },
                    subSkill:{
                        "use":{
                            enable:"phaseUse",
                            trigger:{
                                global:"dying",
                            },
                            usable:1,
                            sub:true,
                            prompt:function(event,player){
                                return "〖隐世〗："+get.translation(event.player)+"濒死，是否替换其武将牌？";
                            },
					        audio:"xjzh_sanguo_yinshi",
                            filter:function(event,player){
                                return player.storage.xjzh_sanguo_jianjie&&player.storage.xjzh_sanguo_jianjie.length;
                            },
                            content:function(){
                                "step 0"
                                if(event.getParent(3).name=="phaseUse"){
                                    player.chooseTarget("〖隐世〗：选择一名其他角色替换其武将牌",function(card,player,target){
                                        return player!=target;
                                    }).set('ai',function(target){
                                        return 1;
                                    });
                                }
                                "step 1"
                                if(event.getParent(3).name=="phaseUse"){
                                    if(result.targets){
                                        event.target=result.targets[0]
                                    }else{
                                        event.finish();
                                        return;
                                    }
                                }
                                var list=player.storage.xjzh_sanguo_jianjie;
                                player.chooseButton().set('ai',function(button){
                                    var trigger=_status.event.getTrigger()
                                    if(event.getParent(3).name=="phaseUse"){
                                        var targetsx=_status.event.target
                                    }else{
                                        var targetsx=trigger.player
                                    }
                                    var att=get.attitude(player,targetsx);
                                    if(att>0) get.rank(button.link,true);
                                    return 0;
                                }).set('createDialog',['〖荐杰〗：请选择一张武将牌',[list,'character']]);
                                "step 2"
                                if(result.links){
                                    if(event.getParent(3).name=="phaseUse"){
                                        var targets=event.target
                                    }else{
                                        var targets=trigger.player;
                                    }
                                    targets.clearSkills2();
                                    if(targets.name2) targets.xjzh_removeFujiang();
                                    //targets.init(result.links[0]);
                                    var info=lib.character[result.links[0]][2];
                                    if(typeof info=="number"){
                                        var hp=info
                                        var maxHp=info
                                    }else{
                                        info=info.split('/');
                                        var hp=info[0];
                                        var maxHp=info[1];
                                    }
                                    targets.reinit(targets.name,result.links[0],[hp,maxHp]);
                                    player.storage.xjzh_sanguo_jianjie.remove(result.links[0]);
                                }
                            },
                        },
                    },
                },
                "xjzh_sanguo_zhiheng":{
                    enable:"phaseUse",
                    usable:function(player){
                        return player.getDamagedHp()+1;
                    },
					audio:"ext:仙家之魂/audio/skill:2",
                    derivation:["xjzh_sanguo_wuzhan","xjzh_sanguo_wumeng","xjzh_sanguo_wuxing","xjzh_sanguo_wuzuo"],
                    filter:function(event,player){
                        var num=lib.skill.xjzh_sanguo_zhiheng.usable(player);
                        if(get.skillCount("xjzh_sanguo_zhiheng",player)>=num) return false;
                        return player.countCards('he');
                    },
				    position:'he',
				    filterCard:lib.filter.cardDiscardable,
				    selectCard:[1,Infinity],
				    prompt:'〖制衡〗：弃置任意张牌并摸等量的牌',
				    check:function(card){
					    var player=_status.event.player;
					    if(get.position(card)=='h'&&!player.countCards('h','du')&&(player.hp>2||!player.countCards('h',function(card){
						    return get.value(card)>=8;
					    }))){
						    return 1;
					    }
					    return 6-get.value(card)
				    },
				    discard:false,
				   	lose:false,
				   	delay:false,
					audio:"ext:仙家之魂/audio/skill:2",
				    content:function(){
				        var num=0
				        var num2=0
				        var num3=0
				        var hs=player.getCards('h');
				        var hs2=player.getCards('e');
				        if(hs.length){
				            for(var i=0;i<hs.length;i++){
				                if(cards.includes(hs[i])) num++
				            }
				        }
				        if(hs2.length){
				            for(var i=0;i<hs2.length;i++){
				                if(cards.includes(hs2[i])) num2++
				            }
				        }
				        if(num==hs.length&&num!=0) num3++
				        if(num2==hs2.length&&num2!=0) num3++
				        player.discard(cards);
				        player.draw(cards.length+num3)
				        if(!player.storage.xjzh_sanguo_zhiheng) player.storage.xjzh_sanguo_zhiheng=0
				        player.storage.xjzh_sanguo_zhiheng++
				    },
				    ai:{
					    order:3,
					    threaten:0.8,
					    result:{
						    player:function(player,target){
						        var list=lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0);
                                var num=get.skillCount("xjzh_sanguo_zhiheng",player);
						        if(num<=4) return 1.5;
						        return 2;
						    },
					    },
					    threaten:1.5
				    },
                },
                "xjzh_sanguo_wuyun":{
                    trigger:{
                        player:"phaseJieshuBegin",
                    },
                    forced:true,
                    priority:3,
					audio:"ext:仙家之魂/audio/skill:2",
                    filter:function(event,player){
                        if(!player.storage.xjzh_sanguo_zhiheng) return false;
                        var list=lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0);
                        var num=0
                        for(var i of list){
                            if(player.hasSkill(i)) num++
                        }
                        if(num>=4) return false;
                        return true;
                    },
                    content:function(){
                        "step 0"
                        var list=lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0);
                        var num=player.storage.xjzh_sanguo_zhiheng
						if(num<=4){
						    player.addSkillLog(list[num-1]);
						}/*else{
						    player.addSkillLog(list);
						}*/
						"step 1"
						delete player.storage.xjzh_sanguo_zhiheng
                    },
                },
                "xjzh_sanguo_wuzhan":{
                    trigger:{
                        player:"drawBegin",
                    },
					audio:"ext:仙家之魂/audio/skill:2",
                    filter:function(event,player){
                        if(event.num<3) return false;
                        if(player.storage.xjzh_sanguo_wuzhan==true) return false;
                        return true;
                    },
                    init:function(player){
                        if(!player.storage.xjzh_sanguo_wuzhan) player.storage.xjzh_sanguo_wuzhan=false;
                    },
					skillAnimation:true,
					animationColor:'thunder',
					animationStr:"大吴国战",
                    check:function(event,player){
                        return player.getEnemies().length;
                    },
                    limited:true,
                    content:function(){
                        "step 0"
						player.awakenSkill('xjzh_sanguo_wuzhan');
						player.storage.xjzh_sanguo_wuzhan=true;
                        event.num=trigger.num
                        "step 1"
                        player.chooseTarget("〖吴战〗：请选择令一名其他角色受到来自于你的至多2点伤害，剩余可分配"+event.num+"点伤害",function(card,player,target){
                            if(target.storage.xjzh_sanguo_wuzhan2){
                                if(target.storage.xjzh_sanguo_wuzhan2>=2) return false;
                            }
                            return target!=player;
                        }).set('ai',function(target){
                            return get.damageEffect(target,_status.event.player,_status.event.player);
                        });
                        "step 2"
                        if(result.bool){
                            event.target=result.targets[0]
                            if(event.num>1){
                                var list=[]
                                for(var i=1;i<=2;i++){
                                    list.push(i);
                                }
                                player.chooseControl(list,'cancel2').set('ai',function(target){
                                    var att=get.attitude(_status.event.player,target);
                                    if(att>0) return 'cancel2';
                                    return list.randomGet();
                                });
                            }else{
                                event.target.damage(1,player,'nocard');
                                event.num-=1
                                if(!event.target.storage.xjzh_sanguo_wuzhan2) event.target.storage.xjzh_sanguo_wuzhan2=0
                                event.target.storage.xjzh_sanguo_wuzhan2+=1;
                                event.goto(4);
                            }
                        }else{
                            event.finish();
                        }
                        "step 3"
                        if(result.control){
                            if(result.control=='cancel2') event.goto(1);
                            var num=result.control
                            event.target.damage(num,player,'nocard');
                            event.num-=num
                            if(!event.target.storage.xjzh_sanguo_wuzhan2) event.target.storage.xjzh_sanguo_wuzhan2=0
                            event.target.storage.xjzh_sanguo_wuzhan2+=num
                        }else{
                            event.goto(1);
                        }
                        "step 4"
                        var evt=event.getParent("xjzh_sanguo_wuzhan");
					    if(evt&&evt.getParent){
				            var next=game.createEvent('xjzh_sanguo_wuzhan_delete',false,evt.getParent());
				            next.player=event.target;
				            next.setContent(function(){
				                if(player.storage.xjzh_sanguo_wuzhan2.length){
				                    delete player.storage.xjzh_sanguo_wuzhan2;
				                }
				            });
				        }
                        "step 5"
                        if(event.num>0){
                            event.goto(1);
                        }else{
                            trigger.changeToZero()
                        }
                    },
                },
                "xjzh_sanguo_wumeng":{
                    trigger:{
                        player:"drawBefore",
                    },
                    usable:1,
					audio:"ext:仙家之魂/audio/skill:2",
                    filter(event,player){
                        return game.hasPlayer(current=>{
							let list=get.playerName(current);
					        let bool=false;
							if(list.some(name=>{
								return lib.character[name][1]!="wu";
							})) bool=true;
                            return current.group!="wu"||bool==true;
                        });
                    },
                    content(){
                        "step 0"
                        player.chooseTarget(get.prompt("xjzh_sanguo_wumeng"),true,function(card,player,target){
                            if(target==player) return false;
							let list=get.playerName(target);
							let bool=false;
							if(list.some(name=>{
								return lib.character[name][1]!="wu";
							})) bool=true;
                            return target.group!="wu"||bool==true;
                        }).set('ai',function(target){
                            return get.attitude(player,target);
                        });
                        "step 1"
                        if(result.bool){
                            event.cards=get.cards(trigger.num*2);
                            game.cardsGotoOrdering(event.cards);
                            event.target=result.targets[0]
                            player.chooseCardButton([1,event.cards.length/2],event.cards,true,'〖吴盟〗：选择'+get.translation(event.cards.length/2)+'张牌获得之，并令'+get.translation(result.targets[0])+'获得剩余的牌').set('filterButton',function(button){
                                if(!ui.selected.buttons.length) return true;
                                var selected=ui.selected.buttons;
                                if(selected>=event.cards.length/2) return false;
                                return true;
                            }).set('cards',event.cards);
                        }
                        "step 2"
                        if(result.links&&result.links.length){
                            player.gain(result.links,'draw',player);
                            event.target.gain(event.cards.filter(card=>!result.links.includes(card)),'draw',player);
                        }
                        "step 3"
                        trigger.changeToZero();
                    },
                },
                "xjzh_sanguo_wuxing":{
                    trigger:{
                        source:"damageBegin1",
                    },
                    forced:true,
                    priority:6,
                    locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
                    filter:function(event,player){
                        return player.countCards('h')>=8;
                    },
                    mod:{
                        maxHandcard:function (player,num){
                            return game.countPlayer(function(current){
                                var list=[]
						        if(current.name) list.push(current.name);
						        if(current.name1) list.push(current.name1);
						        if(current.name2) list.push(current.name2);
						        var bool=false;
						        for(var name of list){
						            if(lib.character[name][1]=="wu") bool=true;
						        }
                                return current.group=="wu"||bool==true;
                            })*2+num;
                        },
                    },
                    content:function(){
                        trigger.num++
                    },
                },
                "xjzh_sanguo_wuzuo":{
				    trigger:{
					    player:'loseAfter',
					    global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				    },
				    usable:1,
				    frequent:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
					    if(player.countCards('h')) return false;
					    var evt=event.getl(player);
					    return evt&&evt.player==player&&evt.hs&&evt.hs.length>0;
				    },
				    content:function(){
					    player.draw(2);
				    },
				    ai:{
					    threaten:0.8,
					    effect:{
						    target:function(card){
							    if(card.name=='guohe'||card.name=='liuxinghuoyu') return 0.5;
						    }
					    },
					    noh:true,
					    skillTagFilter:function(player,tag){
						    if(tag=='noh'){
							    if(player.countCards('h')!=1) return false;
						    }
					    }
				    },
                },
                "xjzh_sanguo_jiuyuan":{
                    trigger:{
                        global:"recoverBegin",
                    },
                    direct:true,
                    priority:10,
                    zhuSkill:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function (event,player){
						if(!player.hasZhuSkill('xjzh_sanguo_jiuyuan')) return false;
						if(event.player==player) return false;
						if(player.isHealthy()) return false;
						var list=[];
						if(event.player.name) list.push(event.player.name);
						if(event.player.name1) list.push(event.player.name1);
						if(event.player.name2) list.push(event.player.name2);
						var bool=false;
						for(var name of list){
						    if(lib.character[name][1]=="wu") bool=true;
						}
						return event.player.group=="wu"||bool==true;
					},
					content:function(){
					    "step 0"
					    trigger.player.chooseBool("〖救援〗：是否改为孙权回复一点体力，然后你摸一张牌").set('ai',function(){
					        var trigger=_status.event.getTrigger()
					        var att=get.attitude(_status.event.player,trigger.player);
					        return att;
					    });
					    "step 1"
					    if(result.bool){
					        trigger.player.logSkill('xjzh_sanguo_jiuyuan',player);
					        player.recover();
					        trigger.player.draw();
					        trigger.cancel();
					    }
					},
                },
                "xjzh_sanguo_quling":{
                    trigger:{
                        source:"dieAfter",
                    },
	    		    direct:true,
	    		    locked:true,
	    		    charlotte:true,
	    		    superCharlotte:true,
	    		    fixed:true,
	    		    xjzh_xinghunSkill:true,
	    		    unique:true,
                    nogainsSkill:true,
	    		    init:function(player){
	    		        if(!lib.config.xjzh_sanguo_quling){
	    		            window.localStorage.removeItem("xjzh_sanguo_quling");
	    		            
	    		            var list=[]
	    		            for(var i in lib.character){
	    		                if(lib.character[i]) list.push(i);
	    		            }
	    		            var name=list.randomGet();
	    		            var object={
	    		                "character":name+"::",
	    		                "spower":20,
	    		            }
                            var obj=JSON.stringify(object);
	    		        }
	    	            window.localStorage.setItem("xjzh_sanguo_quling",obj);
	    	            game.saveConfig('xjzh_diablo_quling',true);
	    		    },
                    filter:function(event,player){
                        if(event.player.isAlive()) return false;
                        if(event.player==player) return false;
	    		        var list=window.localStorage.getItem("xjzh_sanguo_quling");
                        if(list!=null){
                            var object=JSON.parse(list);
                            var str=object.character.slice(0,-2);
                            var name=str.split('::');
                            return !name.includes(event.player);
                        }
                        if(list==null) return true;
                        return false;
                    },
                    group:["xjzh_sanguo_quling_use"],
                    content:function(){
                        game.playXH(['xjzh_sanguo_quling1','xjzh_sanguo_quling2'].randomGet());
                        if(window.localStorage){
                            //获取阵亡角色武将名
                            var name=trigger.player.name
                            var num=get.rank(trigger.player,true);
                            var characters=lib.characterPack['Beijijinqu']
                            if(characters!=undefined){
                                for(var i in characters){
                                    if(name==i) return;
                                }
                            }
                            //读取已有存档
                            var list=window.localStorage.getItem("xjzh_sanguo_quling");
                            if(list!=null){
                                //alert("有");
                                //检测存档内是否已包含当前武将名，若有则跳过
                                var object=JSON.parse(list);
                                if(object.character.indexOf(name)!=-1) return;
                                object.character+=name+"::"
                                object.spower+=num
                                obj=JSON.stringify(object);
                            }else{
                                //alert("无");
	    		                var object={
	    		                    "character":"",
	    		                    "spower":0,
	    		                }
                                object.character+=name+"::"
                                object.spower+=num
	    		                //将对象转为字符串
                                obj=JSON.stringify(object);
	    		            }
	    		            //将数据写入存档
	    		            window.localStorage.setItem("xjzh_sanguo_quling",obj);
	    		        }else{
	    		            alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖驱灵〗");
	    		        }
                    },
                    subSkill:{
                        "use":{
                            enable:"phaseUse",
                            usable:1,
                            filter:function(event,player){
                                var list=window.localStorage.getItem("xjzh_sanguo_quling");
                                if(list!=null){
                                    var object=JSON.parse(list);
                                    var str=object.character.slice(0,-2);
                                    var name=str.split('::');
                                    if(!name.length) return;
                                    var num=get.rank(name[0],true);
                                    for(var i=0;i<name.length;i++){
                                        if(num>get.rank(name[i],true)) num=get.rank(name[i],true);
                                    }
                                    return object.spower>=num;
                                }
                                return false;
                            },
                            sub:true,
                            audio:'xjzh_sanguo_quling',
                            content:function(){
                                "step 0"
                                var list=window.localStorage.getItem("xjzh_sanguo_quling");
                                var object=JSON.parse(list);
                                var str=object.character.slice(0,-2);
                                var list2=str.split('::');
                                player.chooseButton(ui.create.dialog('〖驱灵〗：请选择你要获得技能的武将牌',[list2,'character'],'hidden')).set('filterButton',function(button){
                                    var numx=0
                                    for(var i=0;i<ui.selected.buttons.length;i++){
                                        numx+=get.rank(ui.selected.buttons[i].link,true);
                                    };
                                    return numx<object.spower;
                                }).set('ai',function(button){
                                    return get.rank(button.link,true);
                                }).set('selectButton',[1,Infinity]);
                                "step 1"
                                if(result.links){
                                    var list=result.links;
                                    event.targets=result.links.slice(0);
                                    var skills=[]
                                    for(var i of list){
                                        var info=lib.character[i];
                                        if(info[3]){
                                            for(var j of info[3]){
                                                skills.push(j);
                                            }
                                        }
                                    }
						            if(player.isUnderControl()){
						                game.swapPlayerAuto(player);
						            }
						            var switchToAuto=function(){
						                _status.imchoosing=false;
						                event._result={
								            bool:true,
								            skills:skills.randomGets(),
							            };
							            if(event.dialog) event.dialog.close();
							            if(event.control) event.control.close();
						            };
						            var chooseButton=function(list,skills){
							            var event=_status.event;
							            if(!event._result) event._result={};
							            event._result.skills=[];
							            var rSkill=event._result.skills;
							            var dialog=ui.create.dialog('〖驱灵〗：请选择获得的技能',[list,'character'], 'hidden');
							            event.dialog=dialog;
							            var table=document.createElement('div');
							            table.classList.add('add-setting');
							            table.style.margin='0';
							            table.style.width='100%';
							            table.style.position='relative';
							            for(var i=0;i<skills.length;i++){
								            var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
								            td.link=skills[i];
								            table.appendChild(td);
								            td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
								            td.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
									            if(_status.dragged) return;
									            if(_status.justdragged) return;
									            _status.tempNoButton=true;
									            setTimeout(function(){
										            _status.tempNoButton=false;
									            },
									            500);
									            var link=this.link;
									            if(!this.classList.contains('bluebg')){
										            //if(rSkill.length>=2) return;
										            rSkill.add(link);
										            this.classList.add('bluebg');
									            }
									            else{
										            this.classList.remove('bluebg');
										            rSkill.remove(link);
									            }
								            });
							            }
							            dialog.content.appendChild(table);
							            dialog.add('　　');
							            dialog.open();
							            event.switchToAuto=function(){
								            event.dialog.close();
								            event.control.close();
								            game.resume();
								            _status.imchoosing=false;
							            };
							            event.control=ui.create.control('ok',function(link){
								            if(rSkill.length===0) return;
								            event.dialog.close();
								            event.control.close();
								            game.resume();
								            _status.imchoosing=false;
							            });
							            for(var i=0;i<event.dialog.buttons.length;i++){
								            event.dialog.buttons[i].classList.add('selectable');
							            }
							            game.pause();
							            game.countChoose();
						            };
						            if(event.isMine()){
							            chooseButton(list,skills);
						            }
						            else if(event.isOnline()){
							            event.player.send(chooseButton,list,skills);
							            event.player.wait();
							            game.pause();
						            }
						            else{
							            switchToAuto();
						            }
						        }else{
						            event.finish();
						        }
						        "step 2"
						        var map=event.result||result;
						        if(map&&map.skills&&map.skills.length){
						            for(var s of map.skills){
							            player.addSkillLog(s);
						            }
						            player.checkConflict();
							        player.checkMarks();
						        }
						        "step 3"
						        var num=0
						        for(var i=0;i<event.targets.length;i++){
						            num+=get.rank(event.targets[i],true);
						        }
						        game.log(player,"消耗了"+num+"点灵力");
						        var list=window.localStorage.getItem("xjzh_sanguo_quling");
                                var object=JSON.parse(list);
                                object.spower-=num;
                                obj=JSON.stringify(object);
	    		                window.localStorage.setItem("xjzh_sanguo_quling",obj);
                            },
                        },
                    },
                },
                "xjzh_sanguo_tongxuan":{
                    trigger:{
                        global:"gameStart",
                        player:["enterGame","phaseAfter"],
                    },
                    enable:"phaseUse",
                    usable:1,
                    init:function(player){
                        if(!player.storage.xjzh_sanguo_tongxuan2) player.storage.xjzh_sanguo_tongxuan2=0;
                        player.storage.xjzh_sanguo_tongxuan2++
                    },
                    check:function(event,player){return 1;},
                    filter:function(event,player){
                        var list=[
						    "chongsu","shunying","fengyue","hunqian","mengdie","poxiao","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
						];
						if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
						var num=0
						for(var i of list){
						    if(player.hasSkill("xjzh_zengyi_"+i)) num++
						}
						if(num==list.length) return false;
						return true;
                    },
                    content:function(){
                        "step 0"
                        var list=[
						    "chongsu","shunying","fengyue","hunqian","mengdie","poxiao","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
						];
						if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
						var num=0
						for(var i of list){
						    if(player.hasSkill("xjzh_zengyi_"+i)) player.removeSkill("xjzh_zengyi_"+i,true);
						}
						if(player.storage.xjzh_sanguo_tongxuan){
						    for(var i of player.storage.xjzh_sanguo_tongxuan){
						        player.removeSkill(i,true);
						    }
						    delete player.storage.xjzh_sanguo_tongxuan;
						}
						"step 1"
						var num=player.storage.xjzh_sanguo_tongxuan2;
                        var cards=[]
                        var skillsx=[]
                        var list=[
						    "chongsu","shunying","fengyue","hunqian","mengdie","poxiao","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
						];
						if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
						for(var i of list){
						    skillsx.push("xjzh_zengyi_"+i);
						}
                        for(var i of skillsx){
                            lib.card[i]={
                                fullskin:false,
                                image:"ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
                            };
                            var info=get.info(i)
                            if(typeof info.intro.content=="string"){
                                lib.translate[i+"_info"]=info.intro.content;
                            }else{
                                lib.translate[i+"_info"]=info.intro.translations;
                            }
                            if(lib.card[i]) cards.addArray([i]);
                        };
                        var dialog=ui.create.dialog('〖通玄〗',[cards,'vcard'],'hidden');
                        player.chooseButton(dialog,true,[1,num]).set('ai',function(button){
                            return Math.random();
                        });
                        "step 2"
                        if(result.bool){
                            if(!player.storage.xjzh_sanguo_tongxuan) player.storage.xjzh_sanguo_tongxuan=[];
                            for(var i=0;i<result.links.length;i++){
                                player.addSkill(result.links[i][2]);
                                player.storage.xjzh_sanguo_tongxuan.push(result.links[i][2]);
                                game.log(player,'获得了技能','#g〖'+get.translation(result.links[i][2])+'〗');
                                //添加获得一个动画
                                var card=game.createCard("xjzh_zengyi_shuangsheng_card");
                                player.$gain2(card);
                            }
                            player.update();
                        }
                    },
                },
                "xjzh_sanguo_youbian":{
                    trigger:{
                        player:"phaseZhunbeiBegin",
                    },
                    forced:true,
                    locked:true,
                    priority:-1,
                    content:function(){
                        "step 0"
                        if(!player.storage.xjzh_sanguo_tongxuan2){
                            event.finish();
                        }
                        var num=player.storage.xjzh_sanguo_tongxuan2;
                        player.draw(num);
                        "step 1"
                        if(player.isDamaged()){
                            player.storage.xjzh_sanguo_tongxuan2++
                        }
                    },
                },
                "xjzh_sanguo_shouye":{
                    trigger:{
                        player:"phaseZhunbeiBegin",
                    },
                    forced:true,
                    priority:-3,
					audio:"ext:仙家之魂/audio/skill:2",
					init:function(player){
					    player.storage.xjzh_sanguo_shouye={};
					},
                    group:"xjzh_sanguo_shouye_remove",
                    content:function(){
                        "step 0"
                        event.num=0
                        event.skills=["leiji","guidao","fuji"];
                        event.targets=game.filterPlayer(function(current){
                            return current!=player;
                        });
                        "step 1"
                        if(event.targets.length>event.num){
                            var skillsx=event.skills.randomGet();
                            event.targets[event.num].addSkillLog(skillsx);
                            player.storage.xjzh_sanguo_shouye[event.targets[event.num].name1]=skillsx;
                            event.num++;
                            event.redo();
                        }else{
                            event.finish();
                        }
                    },
                    subSkill:{
                        "remove":{
                            trigger:{
                                player:"phaseBefore",
                                global:"$logSkill",
                            },
                            charlotte:true,
                            locked:true,
                            silent:true,
                            sub:true,
                            audio:"xjzh_sanguo_shouye",
                            filter:function(event,player){
                                if(!player.storage.xjzh_sanguo_shouye) return false;
                                if(event.name=="$logSkill"){
                                    var list=player.storage.xjzh_sanguo_shouye,list2=[];
                                    for(var i in list){
                                        list2.push(i);
                                    }
                                    if(list2.includes(event.player.name1)){
                                        if(list[event.player.name1]==event.skill) return true;
                                    }
                                }
                                if(event.name=="phase"){
                                    if(get.playerName(event.player,"xjzh_sanguo_nanhua")) return true;
                                }
                                return false;
                            },
                            content:function(){
                                if(trigger.name=="$logSkill"){
                                    trigger.player.removeSkill(trigger.skill,true);
                                    delete player.storage.xjzh_sanguo_shouye[trigger.player];
                                }
                                else if(trigger.name=="phase"){
                                    var list=player.storage.xjzh_sanguo_shouye,list2=[];
                                    for(var i in list){
                                        list2.push(i);
                                    }
                                    var targets=game.filterPlayer(function(current){
                                        return list2.includes(current.name1);
                                    });
                                    while(targets.length){
                                        var target=targets.shift();
                                        target.removeSkillLog(list[target.name1],true);
                                    }
                                    player.storage.xjzh_sanguo_shouye={};
                                }
                            },
                        },
                    },
                },
                "xjzh_sanguo_xianshou":{
                    trigger:{
                        global:"$logSkill",
                    },
                    forced:true,
                    locked:true,
                    priority:1,
					audio:"ext:仙家之魂/audio/skill:2",
                    filter:function(event,player){
                        if(event.player!=player){
                            var list=player.storage.xjzh_sanguo_shouye,list2=[];
                            for(var i in list){
                                list2.push(i);
                            }
                            if(list2.includes(event.player.name1)){
                                if(list[event.player.name1]==event.skill) return true;
                            }
                        }
                        if(event.player=player){
                            if(!player.storage.xjzh_sanguo_xianshou||!player.storage.xjzh_sanguo_xianshou.length) return false;
                            var list=player.storage.xjzh_sanguo_xianshou;
                            if(list.includes(event.skill)) return true;
                        }
                        return false;
                    },
                    group:["xjzh_sanguo_xianshou_draw"],
                    content:function(){
                        "step 0"
                        if(trigger.player==player){
                            event.goto(3);
                            return;
                        }
                        "step 1"
                        var list=trigger.player.getSkills(null,false,false).filter(function(skill){
							var info=lib.skill[skill];
							var skills=player.storage.xjzh_sanguo_shouye,list2=[];
                            for(var i in skills){
                                list2.push(i);
                            }
                            if(list2.includes(trigger.player.name1)){
                                if(skills[trigger.player.name1]==skill) return false;
                            }
							return info&&!info.unique&&!info.limited&&!info.juexingji&&!info.dutySkill&&!info.equipSkill&&!info.cardSkill&&!lib.skill.global.includes(skill);
						});
						if(!list.length){
						    player.say("没有符合条件的技能");
						    return;
						}
						var dialog=ui.create.dialog('forcebutton');
			            dialog.add('请选择获得一项技能');
		                for(i=0;i<list.length;i++){
			                if(lib.translate[list[i]+'_info']){
			                    var translation=get.translation(list[i]);
            					if(translation[0]=='新'&&translation.length==3){
							        translation=translation.slice(1,3);
							    }
							    else{
							        translation=translation.slice(0,2);
						        }
						        var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
								item.firstChild.link=list[i];
						    }
				        }
						player.chooseControl(list,'cancel2').set('ai',function(){
						    return get.max(list,get.skillRank,'item');
						}).set('dialog',dialog);
						"step 2"
						if(result.control){
						    if(result.control!='cancel2'){
						        player.addSkillLog(result.control);
						        if(!player.storage.xjzh_sanguo_xianshou) player.storage.xjzh_sanguo_xianshou=[];
						        player.storage.xjzh_sanguo_xianshou.push(result.control);
						    }else{
						        event.finish();
						    }
						}
						event.finish();
						"step 3"
						var list=player.storage.xjzh_sanguo_xianshou
						if(list.includes(trigger.skill)){
						    player.removeSkillLog(trigger.skill,true);
						    list.remove(trigger.skill);
						    player.storage.xjzh_sanguo_xianshou=list.slice(0);
						}
                    },
                    subSkill:{
                        "draw":{
                            trigger:{
                                player:"drawBegin",
                            },
                            direct:true,
                            sub:true,
                            priority:1,
                            filter:function(event,player){
							    var list=player.storage.xjzh_sanguo_shouye,list2=[];
                                for(var i in list){
                                    list2.push(i);
                                }
                                return list2.length>0;
                            },
                            content:function(){
							    var list=player.storage.xjzh_sanguo_shouye,list2=[];
                                for(var i in list){
                                    list2.push(i);
                                }
                                if(list2.length>0) trigger.num+=list2.length;
                            },
                        },
                    },
                },
                "xjzh_sanguo_lundao":{
                    enable:"phaseUse",
                    usable:1,
                    filterTarget:function(card,player,target){
                        return player.canCompare(target);
                    },
					audio:"ext:仙家之魂/audio/skill:2",
                    selectTarget:function(){
                        var player=_status.event.player;
                        var num=game.countPlayer(function(current){
				            return player.canCompare(current);
				        });
				        var list=player.storage.xjzh_sanguo_shouye,list2=[];
                        for(var i in list){
                            list2.push(i);
                        }
				        var num2=Math.min(num,list2.length);
				        if(num2>1) return [1,Math.min(num2,3)];
                        return 1;
                    },
                    mod:{
                        targetEnabled:function(card,player,target,now){
                            if(player.hasSkill('xjzh_sanguo_lundao_target')) return false;
						},
					},
					group:"xjzh_sanguo_lundao_use",
				    filter:function(event,player){
				        var list=player.storage.xjzh_sanguo_shouye,list2=[];
                        for(var i in list){
                            list2.push(i);
                        }
				        return game.hasPlayer(function(current){
				            return player.canCompare(current)&&list2.length>0;
				        });
				    },
                    content:function(){
                        "step 0"
                        event.count=0;
                        event.count2=0;
                        event.cards=[];
                        "step 1"
                        player.chooseToCompare(target);
                        "step 2"
                        if(result.winner==player){
                            event.count++
                        }else{
                            event.count2++
                        }
                        if(result.player){
                            game.cardsGotoOrdering(result.player);
                            event.cards.push(result.player);
                        }
                        if(player.canCompare(target)) event.goto(1);
                        "step 3"
                        if(event.count>event.count2){
                            game.log(player,"拼点结果为"+get.translation(event.count+event.count2)+"局"+get.translation(event.count)+"胜，最终结果为胜利");
                            target.addSkill('xjzh_sanguo_lundao_target');
                            target.addSkill("xjzh_sanguo_lundao_remove");
                            player.gain(event.cards,player,'gain2');
                        }else{
                            game.log(player,"拼点结果为"+get.translation(event.count+event.count2)+"局"+get.translation(event.count)+"胜，最终结果为失败");
                            player.loseHp();
                        }
                    },
                    subSkill:{
						"target":{
							sub:true,
						},
						"remove":{
						    trigger:{
						        global:"phaseBegin",
						    },
						    direct:true,
						    priority:-10,
						    sub:true,
						    filter:function(event,player){
						        if(!get.playerName(event,player,'xjzh_sanguo_nanhua')) return false;
						        return true;
						    },
						    content:function(){
						        player.removeSkill("xjzh_sanguo_lundao_target");
						        player.removeSkill("xjzh_sanguo_lundao_remove");
						    },
						},
                        "use":{
                            trigger:{
                                global:["useSkillBegin","$logSkill"],
                            },
					        audio:"xjzh_sanguo_lundao",
                            filter:function(event,player){
                                var skills=event.skill
                                var info=get.info(skills)
                                if(!event.player.hasSkill("xjzh_sanguo_lundao_target")) return false;
						        if(!lib.translate[event.skill+'_info']) return false;
						        if(lib.skill.global.includes(event.skill)) return false;
						        if(info&&(info.limited||info.juexingji||info.dutySkill||info.equipSkill||info.sub||info.unique||!info.direct)) return false;
						        if(info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) return false;
						        if(event.targets.length&&event.targets.includes(player)) return true;
						        return false;
                            },
                            content:function(){
                                "step 0"
                                player.chooseTarget(`〖论道〗：请选择为技能${trigger.skill}重新指定一个目标`,1,true).set('ai',function(card,player,target){
                                    return game.players.randomGet();
                                });
                                "step 1"
                                if(result.bool){
                                    trigger.targets.remove(player);
                                    trigger.targets.push(result.targets[0]);
                                }
                            },
                        },
                    },
                    ai:{
                        order:8,
                        result:{
                            player:function(player,target){
                                var att=get.attitude(player,target);
                                if(att>0) return;
                                var hs=player.getCards('h');
                                var list=[]
                                for(var i of hs){
                                    if(get.number(i)>10) list.push(i);
                                }
                                if(list.length>Math.floor(hs.length/2)) return 1;
                                return -1.5;
                            },
                        },
                    },
                },
                "xjzh_sanguo_shiyong":{
                    trigger:{
                        player:"damageBegin3",
                    },
                    forced:true,
                    locked:true,
                    priority:2,
					audio:"ext:仙家之魂/audio/skill:2",
                    filter:function(event,player){
                        if(!event.cards||!event.cards.length) return false;
                        var info=get.info(event.cards[0]);
                        if(!event.source) return false;
						if(info&&info.allowMultiple!=undefined&&info.allowMultiple==false) return false;
						if(info.multitarget) return false;
                        return !event.numFixed&&!event.cancelled;
                    },
                    content:function(){
                        "step 0"
                        trigger.changeToZero();
                        "step 1"
                        player.loseMaxHp();
                        "step 2"
                        trigger.source.draw(2);
                        if(get.color(trigger.card)=="red"&&trigger.source.isDamaged()) trigger.source.recover(); 
                    },
				    ai:{
					    effect:{
						    target:function(card,player,target,current){
						        var info=get.info(card);
							    if(info.multitarget||info.allowMultiple==false){
							        if(get.color(card)=="red") return [1,-2];
							        return [1,-1];
							    }
						    }
					    }
				    }
                },
                "xjzh_sanguo_yaowu":{
                    enable:"phaseUse",
                    usable:1,
                    filterTarget:function(card,player,target){
                        return target!=player;
                    },
					audio:"ext:仙家之魂/audio/skill:2",
                    content:function(){
                        "step 0"
                        player.loseMaxHp();
                        target.gainMaxHp();
                        "step 1"
                        event.cards=target.getCards('h');
                        target.showHandcards();
                        "step 2"
                        if(event.cards.length){
                            var str='〖耀武〗：请选择'+get.translation(target)+'的[伤害]手牌使用之';
							player.chooseCardButton(event.cards,1,str).set('filterButton',function(button){
							    if(!get.tag(button.link,'damage')) return false;
								return _status.event.player.hasUseTarget(button.link);
							}).set('ai',function(button){
								var player=_status.event.player;
								if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
								return 0;
							});
						}
						else{
						    event.finish();
						}
						"step 3"
						if(result.bool){
						    event.cards.remove(result.links[0]);
							if(player.hasUseTarget(result.links[0])){
								player.chooseUseTarget(result.links[0],true);
							}
						}else{
						    event.finish();
						}
						"step 4"
						if(event.cards.length){
						    if(target.countCards('h',function(card){
						        return get.tag(card,"damage")&&player.hasUseTarget(card);
						    })) event.goto(2);
						}
                    },
                    ai:{
                        result:{
                            target:function(player,target){
                                return 1;
                            },
                            player:function(player,target){
                                return target.countCards('h');
                            },
                        },
                    },
                },
                "xjzh_sanguo_yangwei":{
                    trigger:{
                        player:"loseMaxHpAfter",
                    },
                    forced:true,
                    locked:true,
                    limited:true,
                    priority:10,
					audio:"ext:仙家之魂/audio/skill:2",
                    init:function(player){
                        player.storage.xjzh_sanguo_yangwei=false;
                    },
                    filter:function(event,player){
                        if(player.storage.xjzh_sanguo_yangwei==true) return false;
                        return player.maxHp<=2;
                    },
                    content:function(){
                        "step 0"
                        player.awakenSkill("xjzh_sanguo_yangwei");
						player.storage.xjzh_sanguo_yangwei=true;
						"step 1"
                        var targets=game.filterPlayer(current=>current!=player);
                        for(var target of targets){
                            target.loseMaxHp();
                        }
                        player.gainMaxHp(targets.length);
                        "step 2"
                        player.hp=player.maxHp;
                        player.update();
                    },
                },
                "xjzh_sanguo_zhawang":{
                    trigger:{
                        player:"dieAfter",
                    },
                    forced:true,
                    locked:true,
                    forceDie:true,
                    priority:Infinity,
                    mode:["identity"],
                    limited:true,
					skillAnimation:true,
					animationColor:'fire',
					animationStr:"诈亡兴吴",
					audio:"ext:仙家之魂/audio/skill:1",
					init:function(player,skill){
					    player.storage[skill]=false;
					},
					filter:function(event,player){
					    return !player.storage.xjzh_sanguo_zhawang;
					},
					content:function (){
						"step 0"
						player.awakenSkill("xjzh_sanguo_zhawang");
						player.storage.xjzh_sanguo_zhawang=true;
						"step 1"
                        game.addGlobalSkill("xjzh_sanguo_zhawang_revive");
                    },
                    subSkill:{
                        "revive":{
                            trigger:{
                                global:"dieBegin",
                            },
                            direct:true,
                            priority:Infinity,
                            sub:true,
                            audio:"xjzh_sanguo_zhawang",
                            filter:function(event,player){
                                var zhu=get.zhu(player);
                                var players=game.filterPlayer2(current=>get.playerName(current,'xjzh_sanguo_espsunce'));
                                if(!players.length) return false;
                                var id=players[0].identity;
                                var count=game.countPlayer(current=>current.identity=="fan");
                                if(id=="fan"){
                                    if(event.player.identity=="fan"){
                                        if(count==1) return true;
                                    }
                                    if(event.player==zhu||event.player.identity=="nei"){
                                        if(count==0) return true;
                                    }
                                }
                                if(id=="nei"){
                                    if(event.player.identity=="fan"){
                                        if(count==1) return true;
                                    }
                                    if(event.player==zhu) return true;
                                }
                                if(id=="zhong"){
                                    return event.player==zhu;
                                }
                                return false;
                            },
                            content:function(){
                                "step 0"
                                game.playXH(['xjzh_sanguo_zhawang2'].randomGet());
                                var players=game.filterPlayer2(current=>get.playerName(current,'xjzh_sanguo_espsunce'));
                                if(game.dead.includes(players[0])){
                                    event.targets=players[0];
                                }else{
                                    event.finish();
                                }
                                "step 1"
                                trigger.cancel();
                                trigger.player.recover(1-trigger.player.hp);
                                "step 2"
                                event.targets.revive(3);
                                event.targets.insertPhase();
					            game.removeGlobalSkill("xjzh_sanguo_zhawang_revive");
                                "step 3"
						        while(_status.event.name!='phase'){
						            _status.event=_status.event.parent;
					            }
					            _status.event.finish();
					            _status.event.untrigger(true);
                            },
                        },
                    },
                },
                "xjzh_sanguo_xingwu":{
					trigger:{
					    player:'$logSkill',
					},
					forced:true,
					locked:true,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						var info=get.info(event.skill);
						if(!lib.translate[event.skill+'_info']) return false;
						if(lib.skill.global.includes(event.skill)) return false;
					    return event.skill!="xjzh_sanguo_xingwu";
					},
					content:function(){
					    var skills=[],skills2=[];
					    var list=game.xjzh_wujiangpai().filter(function(evt){
					        return lib.character[evt][1]=="wu";
					    });
					    for(var i of list){
					        if(!lib.character[i][3]||!lib.character[i][3].length) continue;
							skills.addArray((lib.character[i][3]).filter(function(skill){
								var info=lib.skill[skill];
								return info&&!info.charlotte&&!info.dutySkill&&!info.juexingji&&!info.limited&&!info.unique&&!info.sub;
							}));
					    }
					    var bool=false;
						if(get.is.locked(trigger.skill)){
						    bool=true;
						}
						for(var skillx of skills){
						    if(player.skills.includes(skillx)) continue;
						    if(bool==false){
						        if(get.is.locked(skillx)) skills2.push(skillx);
						    }else{
						        if(!get.is.locked(skillx)) skills2.push(skillx);
						    }
						}
						if(!skills2.length){
						    player.say("没有符合条件的技能");
						    return;
						}
						var link=skills2.randomGet();
						player.addAdditionalSkill('xjzh_sanguo_xingwu',link);
						player.popup(link);
					},
                },
                "xjzh_sanguo_jiang":{
				    trigger:{
					    player:'useCardToEnd',
					    target:'useCardToEnd',
				    },
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(!get.tag(event.card,"damage")) return false;
				        if(event.getParent("xjzh_sanguo_jiang").name=="xjzh_sanguo_jiang") return false;
				        if(event.target==player) return event.player.countCards('he');
				        if(event.target!=event.targets[0]) return false;
				        return event.target.countCards('he');
				    },
				    frequent:true,
				    check:function(event,player){
				        var targets;
				        if(event.target&&event.target==player){
				            targets=event.player;
				        }else{
				            targets=event.target;
				        };
				        var friends=player.getFriends();
				        var enemies=player.getEnemies();
				        var att=get.attitude(player,targets);
				        if(att>0) return 1;
				        if(att<=0){
				            if(friends>enemies) return 0;
				            return 1;
				        }
				        return 0;
				    },
				    content:function(){
				        "step 0"
				        var targets;
				        if(trigger.target==player){
				            targets=trigger.player;
				        }else{
				            targets=trigger.target;
				        }
				        targets.chooseToDiscard(1,'he',true);
				        event.targetx=targets;
				        "step 1"
				        if(result.bool){
				            var inpile=lib.inpile.slice(0).filter(function(card){
				                var ai=lib.card[card].ai
				                if(!ai.tag||!ai.tag.damage) return false;
				                return event.targetx.hasUseTarget({name:card});
				            });
						    var text='〖激昂〗：请选择一张牌令'+get.translation(event.targetx)+'使用之';
						    player.chooseVCardButton(true,inpile,text).set('ai',function(button){
				                var friends=player.getFriends(true);
				                var enemies=player.getEnemies();
        				        if(friends>enemies) return !get.tag(button.link,'multitarget');
        				        return get.tag(button.link,'multitarget');
						    });
				        }else{
				            event.finish();
				        }
				        "step 2"
				        if(result.links){
				            var card=game.createCard(result.links[0][2]);
				            event.targetx.addTempSkill("xjzh_sanguo_jiang_source","useCardAfter");
				            event.targetx.chooseUseTarget(card,true).set('addCount',false).set('viewAs',true);
				        }
				    },
				    subSkill:{
				        "source":{
				            trigger:{
				                source:"damageBefore",
				            },
				            sub:true,
				            direct:true,
				            priority:10,
				            content:function(){
				                var target=game.findPlayer(current=>get.playerName(current,'xjzh_sanguo_espsunce'));
				                trigger.source=target;
				            },
				        },
				    },
				    ai:{
					    effect:{
						    target:function(card,player,target){
							    if(get.tag(card,'damage')) return [1,0.6];
						    },
						    player:function(card,player,target){
							    if(get.tag(card,'damage')) return [1,1];
						    }
					    }
				    }
                },
                "xjzh_sanguo_hunzi":{
                    trigger:{
                        source:"damageBegin",
                        player:"damageEnd",
                    },
                    charlotte:true,
                    locked:true,
                    forced:true,
                    popup:false,
                    priority:2,
					audio:"ext:仙家之魂/audio/skill:2",
                    content:function(){
                        if(trigger.source&&trigger.source==player){
                            if(game.hasNature(trigger)) game.setNature(trigger,null,false);
                            var history=player.getHistory('sourceDamage',function(evt){
                                return evt&&trigger.card&&evt.card==trigger.card;
                            });
                            if(!history.length){
                                player.draw();
                                player.logSkill('xjzh_sanguo_hunzi');
                            }
                        }
                        else if(trigger.player==player&&trigger.source!=player){
                            player.draw();
                            player.logSkill('xjzh_sanguo_hunzi');
                        }
                    },
                },
                
			},
			dynamicTranslate:{
			    /*"xjzh_sanguo_yinren":function(player){
			        var str="锁定技，游戏开始时，若场上角色数量大于3，你将体力值锁定为";
			        if(player.isZhu){
			            str+="2;";
			        }else{
			            str+="1;";
			        }
			        str+="其他角色阵亡后，若你未因该技能获得至少2点的体力上限，你获得一点体力上限，然后依次获得技能〖极略〗、〖奇才〗，当你拥有以上两个技能时，你移除该技能。";
			        return str;
			    },*/
			    "xjzh_sanguo_lixiang":function(player){
					let list=get.playerName(player).filter(name=>{
						return ["xjzh_sanguo_daqiao","xjzh_sanguo_xiaoqiao"].includes(name);
					});
					if(get.config('double_character')){
					    if(list.length>=2) return "限定技，当你濒死时，你将武将牌随机替换为“小乔”或“大乔”之一，并回复体力至体力上限。";
					    else{
					        if(get.playerName(player,"xjzh_sanguo_daqiao")) return "限定技，当你濒死时，你将武将牌替换为“小乔”，并回复体力至体力上限。";
					        else if(get.playerName(player,"xjzh_sanguo_xiaoqiao")) return "限定技，当你濒死时，你将武将牌替换为“大乔”，并回复体力至体力上限。";
					    }
					}else{
					    if(get.playerName(player,"xjzh_sanguo_daqiao")) return "限定技，当你濒死时，你将武将牌替换为“小乔”，并回复体力至体力上限。";
					    else if(get.playerName(player,"xjzh_sanguo_xiaoqiao")) return "限定技，当你濒死时，你将武将牌替换为“大乔”，并回复体力至体力上限。";
					}
					return "此技能不可用";
			    },
			    "xjzh_sanguo_tiance":function(player){
			        var str=get.translation('xjzh_sanguo_tiance_info');
			        var str2="限两次"
			        if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
			        return str.replace("限一次",str2);
			    },
			    "xjzh_sanguo_tianming":function(player){
			        var str=get.translation('xjzh_sanguo_tianming_info');
			        var str2="限两次"
			        if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
			        return str.replace("限一次",str2);
			    },
			    "xjzh_sanguo_moubian":function(player){
			        var str=get.translation('xjzh_sanguo_moubian_info');
			        if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
			        return str+"然后你可以使用或打出此牌";
			    },
			    "xjzh_sanguo_zhongxing":function(player){
			        var str=get.translation('xjzh_sanguo_zhongxing_info');
			        if(!game.xjzhAchi.hasAchi('再兴炎汉','character')) return str;
			        var str2="限定技，主公阵亡时，若你不为主公且场上与你势力一致的角色数量为最多之一，你将身份改为主公，"
			        var str3="然后获得一点体力上限并将体力回复至体力上限，";
			        var str4="然后所有与你势力一致的角色改为忠臣，此时与你同一阵营的所有角色将势力改为汉，然后其余势力将身份改为反贼，当你阵亡时，所处的阵营直接失败。";
			        return str2+str3+str4;
			    },
			    "xjzh_sanguo_tongxuan":function(player){
			        var str="出牌阶段限"+get.cnNumber(get.info("xjzh_sanguo_tongxuan").usable)+"次、游戏开始时、你的回合结束时，你可以移除因〖通玄〗获得的技能并从除〖双生〗之外的所有增益技能中选择"
			        var str2="<span style=\"color:#eb1100\">"+get.translation(player.storage.xjzh_sanguo_tongxuan2)+"</span>";
			        var str3="个技能获得之。"
                    return str+str2+str3;
			    },
			    "xjzh_sanguo_youbian":function(player){
			        var str="锁定技，你的准备阶段，你摸";
			        if(player.storage.xjzh_sanguo_tongxuan2){
			            var str2=get.translation(player.storage.xjzh_sanguo_tongxuan2)+"张牌，";
			        }else{
			            var str2="x张牌（x为〖通玄〗中的为红色数字），";
			        }
			        var str3="然后若你已受伤，〖通玄〗中的红色数字+1。"
                    return str+str2+str3;
			    },
			    "xjzh_sanguo_quling":function(player){
			        var str=get.translation('xjzh_sanguo_quling_info');
			        var str2="";
                    var list=window.localStorage.getItem("xjzh_sanguo_quling");
                    if(list==null) return str;
                    var object=JSON.parse(list);
                    var num=object.spower;
                    str2+="<br>当前拥有灵力："+num;
                    return str+'<br><span class="bluetext">'+str2+'</span><br>';
			    },
			    "xjzh_sanguo_liegong":function(player){
			        var str=lib.translate.xjzh_sanguo_liegong_info;
			        var str2="";
                    var history=player.getHistory('useCard',function(evt){
                        return evt.card&&evt.card.name=='sha';
                    });
                    if(!history.length)return str;
                    if(typeof get.number(history[history.length-1].card)!='number') return str;
                    str2+="<br>上张【杀】点数"+get.number(history[history.length-1].card);
                    return str+'<br><span class="bluetext">'+str2+'</span><br>';
			    },
				"xjzh_sanguo_longnu":function(player){
					var str0="锁定技，转换技，每个其他回合开始时，若你的手牌不大于你的体力值或其手牌为全场唯一最多，你获得其一张牌，然后其摸一张牌";
					var str1="阴：出牌阶段开始时，你失去一点体力并摸一张牌，你的红色手牌均视为【火杀】且无距离限制，且你可以将你的武将牌上的一张黑色“兵”万箭齐发使用(每回合限一次)直到回合结束";
					var str2="阳：出牌阶段开始时，你失去一点体力上限并摸一张牌，你的黑色手牌均视为【雷杀】且无使用次数限制，且你可以将你的武将牌上的一张红色“兵”当桃园结义使用(每回合限一次)直到回合结束";
					if(player.storage.xjzh_sanguo_longnu){
						str1='<span class="bluetext">'+str1+'</span>';
					}
					else{
						str2='<span class="bluetext">'+str2+'</span>';
					}
					return str0+"<li>"+str1+"<li>"+str2;
				},
				"xjzh_sanguo_renjun":function(player){
				    var str="主公技，你将〖明政〗中的摸牌数+1改为+2；你将〖暴政〗中的中的造成伤害+1改为+2：";
				    if(player.hasSkill("xjzh_sanguo_mingzheng")) str+="你的出牌阶段开始时，你视为使用一张【五谷丰登】。";
				    else str+="你的出牌阶段开始时，你视为使用一张【万箭齐发】。";
				    return str;
				},
			},
			translate:{
			    "xjzh_sanguo_wenyang":"文鸯",
				"xjzh_sanguo_chunhua":"张春华",
			    "xjzh_sanguo_espsunce":"esp孙策",
				"xjzh_sanguo_caiyan":"蔡琰",
				"xjzh_sanguo_zhongda":"司马懿",
				"xjzh_sanguo_zhaoyun":"赵云",
				"xjzh_sanguo_huangzhong":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界黄忠":"黄忠",
				"xjzh_sanguo_machao":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界马超":"马超",
				"xjzh_sanguo_weiyan":"魏延",
				"xjzh_sanguo_kongming":"诸葛亮",
				"xjzh_sanguo_spkongming":"sp诸葛亮",
				"xjzh_sanguo_pangtong":"庞统",
				"xjzh_sanguo_zhangfei":"张飞",
				"xjzh_sanguo_guanyu":"关羽",
				"xjzh_sanguo_yueying":"黄月英",
				"xjzh_sanguo_daqiao":"大乔",
				"xjzh_sanguo_xiaoqiao":"小乔",
				"xjzh_sanguo_dongzhuo":"董卓",
				"xjzh_sanguo_huatuo":"华佗",
				"xjzh_sanguo_tongyuan":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界童渊":"童渊",
				"xjzh_sanguo_zuoci":"左慈",
				"xjzh_sanguo_zhangjiao":"张角",
				"xjzh_sanguo_spzhangjiao":"sp张角",
				"xjzh_sanguo_zhangning":"张宁",
				"xjzh_sanguo_splvbu":"sp吕布",
				"xjzh_sanguo_lvbu":"吕布",
				"xjzh_sanguo_zhenfu":"甄宓",
				"xjzh_sanguo_sunhao":"孙皓",
				"xjzh_sanguo_luxun":"陆逊",
				"xjzh_sanguo_zhoutai":"周泰",
				"xjzh_sanguo_guojia":"郭嘉",
				"xjzh_sanguo_dianwei":"典韦",
				"xjzh_sanguo_liubei":"刘备",
				"xjzh_sanguo_caocao":"曹操",
				"xjzh_sanguo_zhangrang":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界张让":"张让",
				"xjzh_sanguo_bogui":"公孙瓒",
				"xjzh_sanguo_diaochan":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界貂蝉":"貂蝉",
				"xjzh_sanguo_espliuxie":"esp刘协",
				"xjzh_sanguo_guanlu":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界管辂":"管辂",
				"xjzh_sanguo_ganning":"甘宁",
				"xjzh_sanguo_xuzhu":"许诸",
				"xjzh_sanguo_xunyou":lib.config.extension_仙家之魂_xjzh_jiexiantupo?"界荀攸":"荀攸",
				"xjzh_sanguo_zhangbao":"张宝",
				"xjzh_sanguo_yuanshao":"袁绍",
				"xjzh_sanguo_zhangliao":"张辽",
				"xjzh_sanguo_sphuatuo":"sp华佗",
				"xjzh_sanguo_yuji":"于吉",
				"xjzh_sanguo_simahui":"司马徽",
				"xjzh_sanguo_sunquan":"孙权",
				"xjzh_sanguo_espzuoci":"esp左慈",
				"xjzh_sanguo_zuoyou":"左幽",
				"xjzh_sanguo_nanhua":"南华老仙",
				"xjzh_sanguo_huaxiong":"华雄",
				"xjzh_sanguo_espzhangjiao":"神张角",
				
				"xjzh_sanguo_jueqing":"绝情",
				"xjzh_sanguo_jueqing_info":"锁定技，场上所有角色体力流失和造成伤害不触发技能结算。",
				"xjzh_sanguo_shangshi":"伤逝",
				"xjzh_sanguo_shangshi_info":"锁定技，当你使用牌后，若你已受伤，你摸一张牌，若此牌与你上一张使用的牌颜色不一致，你可以弃置一名其他角色一张牌。",
				"xjzh_sanguo_huishi":"慧识",
				"xjzh_sanguo_huishi_info":"锁定技，你令其他角色的限定技、觉醒技、主公技、使命技等特殊技能失效（有“星魂”标签的技能除外）。",
				"xjzh_sanguo_pijian":"披坚",
				"xjzh_sanguo_pijian_info":"你获得一个额外的武器栏；你的准备阶段，你可以从随机3个与【杀】有关的技能中选择一个将其视为一张武器牌装备之，当你失去此牌时，你将手牌补至体力上限。",
				"xjzh_sanguo_zhirui":"执锐",
				"xjzh_sanguo_zhirui_info":"锁定技，你的回合内，若你的装备栏有因〖披坚〗装备的武器牌，你使用非[伤害]卡牌后获得一张与你本回合上一次因此技能获得的与其牌名不一致的[伤害]卡牌。",
				"xjzh_sanguo_yongjue":"勇决",
				"xjzh_sanguo_yongjue_info":"出牌阶段限一次，你可以弃置武器栏的所有牌，然后按顺序使用你本回合已使用的所有[伤害]卡牌（不改变目标），你每因此使用一张牌则失去一点体力。",
				"xjzh_sanguo_daoshu":"道术",
				"xjzh_sanguo_daoshu_info":"锁定技，游戏开始时、你的回合开始时、你受到伤害后，你展示3张未上场的群势力武将牌，然后从中选择一张获得其所有技能直到你的回合结束。结束阶段，你从这些技能中选择获得1个技能。",
				"xjzh_sanguo_huanhua":"幻化",
				"xjzh_sanguo_huanhua_info":"锁定技，你无法失去体力上限，你无法被翻面、横置;你受到伤害、失去体力最多为1。",
				"xjzh_sanguo_juejing":"绝境",
				"xjzh_sanguo_juejing_info":"锁定技，你的体力上限锁定为2，你的手牌数锁定为4，你始终跳过摸牌阶段；当你的体力发生变化后，你重置武将牌。",
				"xjzh_sanguo_longhun":"龙魂",
				"xjzh_sanguo_longhun_info":"锁定技，你可以将一张手牌按照以下规则使用或打出：♦️当做【火杀】；♣️当做【闪】；♥️当做【桃】；♠️当做【无懈可击】",
				"xjzh_sanguo_longhun1":"龙魂♥",
				"xjzh_sanguo_longhun2":"龙魂♦",
				"xjzh_sanguo_longhun3":"龙魂♠",
				"xjzh_sanguo_longhun4":"龙魂♣",
				"xjzh_sanguo_peijian":"佩剑",
				"xjzh_sanguo_peijian_info":"锁定技，你的攻击距离无限且你使用【杀】无视防具。",
				"xjzh_sanguo_kuanggu":"狂骨",
				"xjzh_sanguo_kuanggu_info":"锁定技，你的体力值锁定为你的体力上限，你于濒死阶段之外回复体力无效<li>你的体力上限不小于1时，防止所有伤害和体力流失改为失去等量体力上限；回合结束时，若你于回合内造成了伤害，你增加等量体力上限；判定阶段开始时，若你的判定区有乐不思蜀或兵粮寸断，你跳过判定阶段改为判定牌直接生效；你的最大体力上限为8",
				"xjzh_sanguo_kuangxi":"狂袭",
				"xjzh_sanguo_kuangxi_info":"你使用非延时锦囊牌指定目标时，可以终止此结算，视为对其使用一张无视防具且无次数限制的【杀】，然后摸一张牌，若你使用此法造成伤害，你增加一点体力上限",
				"xjzh_sanguo_aogu":"傲骨",
				"xjzh_sanguo_aogu_info":"出牌阶段限一次，若你的体力上限不小于6，你可以将其调整为2，然后摸3张牌并获得技能武圣、咆哮(界)<li>摸牌阶段开始时，若你的体力上限不小于8，你将你的体力上限改为4，然后摸X张牌(X为你失去的体力上限)，并开始一个额外的回合<li>你的手牌上限始终为5",
				"xjzh_sanguo_qicai":"奇才",
				"xjzh_sanguo_qicai_info":"锁定技，你使用的非延时锦囊牌无法被其他角色响应且无距离限制，然后你摸一张牌，你以此法获得的牌不计入手牌上限；你的【过河拆桥】视为【顺手牵羊】。",
				"xjzh_sanguo_jiqiao":"机巧",
				"xjzh_sanguo_jiqiao_info":"锁定技，一名角色判定时或恢复体力后，你可以令其摸两张牌或你摸一张牌。",
				"xjzh_sanguo_jianqing":"鉴情",
				"xjzh_sanguo_jianqing_info":"限定技，当你阵亡时，你可以选择一名其他角色，令其获得除该技能外你的所有技能并摸x张牌(x为其体力上限)",
				"xjzh_sanguo_duice":"对策",
				"xjzh_sanguo_duice_info":"锁定技，回合开始时，你进行一次红色判定，判定成功后，若你已受伤，你恢复一点体力，否则摸两张牌<li>你使用非延时锦囊牌可以额外选择一个目标<li>当你成为决斗、火攻、顺手牵羊、过河拆桥的目标时，你可以为此牌增加一个目标",
				"xjzh_sanguo_zhiji":"智计",
				"xjzh_sanguo_zhiji_info":"锁定技，你不能成为【南蛮入侵】的目标<li>其他角色使用一张非转化的【南蛮入侵】、【万箭齐发】、【火攻】时你从牌堆获得一张同名牌<li>你可以将一张牌当做无懈可击打出",
				"xjzh_sanguo_zhiji2":"智计",
				"xjzh_sanguo_bazhen":"八阵",
				"xjzh_sanguo_bazhen_info":"锁定技，你未装备防具时视为装备着八卦阵，你受到的火焰伤害最大为1",
				"xjzh_sanguo_guihan":"归汉",
				"xjzh_sanguo_guihan_info":"限定技，当你即将阵亡时，你终止此结算并失去一点体力上限，然后回复体力至体力上限，令全场除你之外的其他角色失去一点体力并选择移除武将牌上的一个技能，然后你移除技能〖悲歌〗并可以令一名其他角色获得〖悲歌〗。",
				"xjzh_sanguo_caiqing":"才情",
				"xjzh_sanguo_caiqing_info":"出牌阶段开始时，你可以选择手牌中的任意一种花色，然后摸与之等量的牌。",
				"xjzh_sanguo_zhishu":"知书",
				"xjzh_sanguo_zhishu_info":"其他角色出牌阶段开始时，你可以观看并选择其区域内至多两张牌获得之，若如此做，你摸一张牌，然后你须交给其等量手牌。",
				"xjzh_sanguo_beige":"悲歌",
				"xjzh_sanguo_beige_info":"一名角色受到不由你造成的伤害后，你可以弃一张牌令其进行一次判定，判定结果为<li>♥其回复1点体力(濒死阶段改为恢复伤害点数点体力)<li>♦︎其摸两张牌<li>♣伤害来源弃两张牌(无牌则改为你摸等量伤害张牌)<li>♠伤害来源将其武将牌翻面(若其已翻面则你摸等量伤害张牌)",
				"xjzh_sanguo_liegong":"烈弓",
				"xjzh_sanguo_liegong_info":"你使用【杀】指定目标可以令此【杀】无法闪避且根据条件发动以下效果：<li>♥此【杀】额外指定x个目标(x为你手牌中的非♥牌数量，每种花色最大为1)<li>♦此【杀】攻击距离+y(y为此【杀】的点数)<li>♠此【杀】无视防具<li>♣此【杀】令其额外弃置z张手牌(z为你手牌中非♣牌的数量，每种花色最大为1)",
				"xjzh_sanguo_zhujian":"铸箭",
				"xjzh_sanguo_zhujian_info":"锁定技，当你使用【杀】造成伤害或受到【杀】的伤害时，你展示牌堆顶一张牌，然后执行以下效果：1、点数小于此【杀】点数，你获得此牌；2、点数等于此【杀】点数，此【杀】伤害+1；3、点数大于此【杀】点数，你获得一张【杀】。",
				"xjzh_sanguo_zhujian2":"铸箭",
				"xjzh_sanguo_zhujian2_info":"当你使用【杀】或你成为【杀】的目标后，你记录此【杀】的点数并获得一张与其点数不一致的【杀】，当你记录所有点数后，你清除所有记录的点数；每当你记录的点数数量满足4的倍数时，本次使用【杀】伤害+x(x为你记录的点数数量与4的因数)",
				"xjzh_sanguo_chuzhen":"出阵",
				"xjzh_sanguo_chuzhen_info":"锁定技，你使用点数递增的【杀】无次数限制",
				"xjzh_sanguo_lanzheng":"揽政",
				"xjzh_sanguo_lanzheng_info":"锁定技，你跳过摸牌阶段，改为摸x张牌(x为你的体力值+3)，；你跳过弃牌阶段，改为弃置x张牌(x为你的体力值+场上存在的势力)，若你于该回合内没有造成伤害，你失去一点体力。",
				"xjzh_sanguo_baolian":"暴敛",
				"xjzh_sanguo_baolian_info":"锁定技，其他角色出牌阶段结束时，若其于本回合内没有造成伤害且你的体力上限大于3，需弃置两张牌，然后选择一项:<li>令你失去两点体力<li>令你失去一点体力上限并摸一张牌，然后其失去一点体力。",
				"xjzh_sanguo_hengzheng":"横征",
				"xjzh_sanguo_hengzheng_info":"锁定技，其他角色出牌阶段开始时，你获得其一张牌，然后若你的手牌数为场上唯一最多，你受到一点无来源伤害",
				"xjzh_sanguo_linnue":"凌虐",
				"xjzh_sanguo_linnue_info":"锁定技，你对女性角色造成伤害或受到女性角色伤害+1，你使用黑色【杀】无视防具，你使用红色【杀】无次数限制。",
				"xjzh_sanguo_linnue_info_alter":"锁定技，你使用红色【杀】无次数限制",
				"xjzh_sanguo_zongjiu":"纵酒",
				"xjzh_sanguo_zongjiu_info":"主公技，你可以将一张♠当做酒使用。",
				"xjzh_sanguo_xiongbin":"雄兵",
				"xjzh_sanguo_xiongbin_info":"出牌阶段限一次，你可以扣置一张手牌，然后令其他角色依次展示一张手牌(无牌则跳过)，你视为对其中花色、点数任意一项一致的目标使用一张无次数限制且无视防具的【杀】，此阶段内若其闪避了此【杀】，你摸一张牌，技能结算后，你获得其他角色展示的花色、点数均与你不同的牌，若你于此阶段内造成了伤害，你受到一点无来源伤害。",
				"xjzh_sanguo_tieji":"铁骑",
				"xjzh_sanguo_tieji_info":"当你使用【杀】指定目标时，你可以令其进行一次判定，其需弃置一张与判定牌花色或点数一致的牌，否则此【杀】无法闪避，若此判定牌花色为♥，此【杀】不计入出牌次数，若为♠，其于此【杀】结算前所有技能失效。",
				"xjzh_sanguo_jieqiang":"劫枪",
				"xjzh_sanguo_jieqiang_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "锁定技，你于摸牌阶段额外摸x张牌;你的手牌上限+x(x为你已损体力值值或体力取更高的值)";
					return "锁定技，你于摸牌阶段额外摸x张牌(x为你已损体力值);你的手牌上限+2";
				}(),
				"xjzh_sanguo_shengxin":"圣心",
				"xjzh_sanguo_shengxin_info":"锁定技，出牌阶段限一次，你可以弃置一张红桃牌并选择一个目标，若其体力小于你的体力值，你令其将体力值恢复至与你一致，然后摸一张牌，若其体力不小于你，你令其摸x张牌(x为其体力上限且至多为5)<li>其他角色使用或打出红色牌时，你有30%几率获得之<li>你的红色手牌不计入手牌上限",
				"xjzh_sanguo_shengxin1":"圣心",
				"xjzh_sanguo_jishi":"济世",
				"xjzh_sanguo_jishi_info":"一名角色濒死时，你可以展示牌堆顶x张牌(x为你已经损失的体力+1)，若有♥则令其恢复体力至1，然后你获得剩余的非红色牌",
				"xjzh_sanguo_liangyi":"良医",
				"xjzh_sanguo_liangyi_info":"限定技，出牌阶段，当你满足下列条件之一：①发动圣心3次②发动济世并成功使其恢复体力3次；你可以选择一名武将，令其摸x张牌，然后开始一个额外的回合，回合结束后，其立即失去所有体力(x为目标的体力加场上存活的人数)",
				"xjzh_sanguo_liangyi2":"良医",
				"xjzh_sanguo_yinren":"隐忍",
				"xjzh_sanguo_yinren_info":"锁定技，游戏开始时，若场上角色数量大于3，你将体力值锁定为1；其他角色阵亡后，若你未因该技能获得至少2点的体力上限，你获得一点体力上限，然后依次获得技能〖极略〗、〖奇才〗，当你拥有以上两个技能时，你移除该技能。",
				"xjzh_sanguo_jilue":"极略",
				"xjzh_sanguo_jilue_info":"出牌阶段限一次，你可以选择一名其他角色，令其将手牌调整与你一致，然后你将手牌补至体力上限。",
				"xjzh_sanguo_qicaix":"奇才",
				"xjzh_sanguo_qicaix_info":"出牌阶段，你可以弃置两张相同类型的牌，然后摸一张与你弃置牌类型不一致的牌，你使用这张牌无距离、次数限制。",
				"xjzh_sanguo_bolue":"博略",
				"xjzh_sanguo_bolue_info":"锁定技，你的准备阶段开始时，若你不拥有技能〖隐忍〗，你进行一次判定，并随机获得一个该花色对应势力的技能直到你的下个准备阶段开始时，♠♥♣♦分别对应魏蜀吴群。",
				"xjzh_sanguo_biantian":"变天",
				"xjzh_sanguo_biantian_info":"觉醒技，当你进行〖博略〗判定之后，你记录判定牌花色，若你记录的花色各不相同且不小于4，你获得一点体力上限，然后从牌堆中获得花色各不相同的四张牌，然后你获得技能〖鹰视〗、〖狼顾〗，然后〖博略〗发动时不再判定，你随机获得魏蜀吴群四个势力各一个技能。",
				"xjzh_sanguo_yingshi":"鹰视",
				"xjzh_sanguo_yingshi_info":"当你受到/造成伤害后，你可以观看伤害来源/目标的手牌并获得其中一张牌。",
				"xjzh_sanguo_langgu":"狼顾",
				"xjzh_sanguo_langgu_info":"锁定技，当你摸/获得牌时，你取消之，改为从牌堆中随机获得四张花色不同的牌。",
				"xjzh_sanguo_keluan":"克乱",
				"xjzh_sanguo_keluan_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "当你成为【杀】和【决斗】的目标时，若其有牌，你获得其一张牌，否则你摸一张牌，若如此做，你视为对其使用一张【杀】（此【杀】无视防具且不计入出【杀】次数）";
					return "当你成为【杀】和决斗的目标时，若其有牌，你获得其一张牌，否则你摸一张牌，然后若你有【杀】，你可以选择一张【杀】对其使用或打出（此【杀】无视防具且不计入出【杀】次数）";
				}(),
				"xjzh_sanguo_cuifeng":"摧锋",
				"xjzh_sanguo_cuifeng_info":"其他角色成为【杀】和【决斗】的目标时，你令其摸一张牌，然后你成为此卡牌的目标",
				"xjzh_sanguo_chaohuang":"朝凰",
				"xjzh_sanguo_chaohuang_info":"锁定技，你使用【杀】被响应后，若你不能再使用【杀】或【酒】，你使用【杀】和酒【酒】的次数加1<li>你使用决斗或成为决斗目标后，在决斗结算之前，你每失去一张牌，摸一张牌",
				"xjzh_sanguo_liansuo":"连锁",
				"xjzh_sanguo_liansuo_info":"锁定技，你的回合内，你的上家和下家非锁定技失效；你使用〖铁索连环〗或♣非装备牌可以额外选择一个目标。",
				'xjzh_sanguo_hengzhou':'横舟',
				'xjzh_sanguo_hengzhou_info':'锁定技，场上其他角色与横置相关的技能失效；当你处于横置状态时，场上所有角色横置状态与你一致；被横置的角色受到火焰伤害+1。',
				"xjzh_sanguo_moulue":"谋略",
				"xjzh_sanguo_moulue_info":"每回合限一次，当一张♣牌结算后，若你未记录此牌点数，你可以弃置一张手牌获得此牌，若此牌点数小于弃置牌点数，你选择获得弃牌堆x张非♣牌然后记录此牌点数(x为两张牌点数之差，至多为你的体力上限)。",
				"xjzh_sanguo_shijiu":"嗜酒",
				"xjzh_sanguo_shijiu_info":"锁定技，你的酒均视为【杀】；你使用黑色牌或【杀】时，视为使用一张【酒】。",
				"xjzh_sanguo_shayi":"杀意",
				"xjzh_sanguo_shayi_info":"锁定技，你使用【杀】无次数与距离限制；当你成为【杀】的目标时，你可以弃置一张【杀】将此牌的目标改为任意武将牌上有“魂”标记的角色，然后其移除一个“魂”标记。",
				"xjzh_sanguo_zhenhun":"震魂",
				"xjzh_sanguo_zhenhun_info":"锁定技，当你受到/造成伤害后，伤害来源/其获得一个“魂”标记，当一名角色的“魂”不小于3时，其移除所有标记，然后你可以令其失去等量体力；你使用【杀】指定其他角色时，若其有“魂”标记，其所有技能失效直到此【杀】结算，然后你摸x张牌（x为其武将牌上“魂”的数量）。",
				"xjzh_sanguo_bujiao":"布教",
				"xjzh_sanguo_bujiao_info":"其他角色出牌阶段开始时，你可以交给其一张手牌，若如此做，你将牌堆顶的一张牌置于武将牌上称为“教”，出牌阶段，你可以弃置一张“教”将其当作任意一张对应类型的牌使用或打出。",
				"xjzh_sanguo_bujiao2":"布教",
				"xjzh_sanguo_bujiao2_buckup":"布教",
				"xjzh_sanguo_taiping":"太平",
				"xjzh_sanguo_taiping_info":"当你受到伤害时，你可以判定：黑色，你将判定牌置于武将牌上，然后摸一张牌，红色，你回复一点体力，然后其结束当前回合。",
				"xjzh_sanguo_fangshu":"方术",
				"xjzh_sanguo_fangshu_info":"出牌阶段开始前，你展示牌堆顶x张牌，若黑色牌不小于红色牌，你获得所有黑色牌，然后对y名角色造成一点雷电伤害或对一名角色造成y点雷电伤害(至多为2)，否则你选择其中z张牌将其置于武将牌上(x为场上与你势力一致的角色数量且至低为2，y为黑色牌的数量，z为颜色少的牌数且至低为1)",
				"xjzh_sanguo_shanxi":"闪戏",
				"xjzh_sanguo_shanxi_info":"锁定技，你获得闪电的判定牌，你不能成为闪电的目标，且你的【雷杀】、【闪】、【闪电】不计入手牌上限<li>你使用点数为2-9的♠牌或使用【雷杀】不计入出牌次数<li>其他角色使用/打出闪时，你可以将一张闪电置入一名角色的判定区，场上至多3张闪电<li>其他角色的判定阶段开始时，若场上有闪电，你可以弃置场上一张闪电令其进行一次闪电判定<li>当有角色濒死时，你的闪电均视为桃",
				"xjzh_sanguo_leijix":"雷祭",
				"xjzh_sanguo_leijix_info":"锁定技，当你使用/打出闪、其他角色使用闪电或你受到伤害后，你进行一次判定并获得判定牌:<li>黑色，你选择一个目标令其受到一点雷电伤害，若其判定区有闪电，该伤害加1<li>红色，你选择至多两个目标令其横置武将牌，若其判定区有闪电，你摸一张牌",
				"xjzh_sanguo_leihun":"雷魂",
				"xjzh_sanguo_leihun_info":"锁定技，你造成所有伤害视为雷属性伤害且你是所有雷电伤害的来源，当你受到雷电伤害时，你回复等量体力",
				"xjzh_sanguo_shendao":"神道",
				"xjzh_sanguo_shendao_info":"锁定技，判定阶段开始时，你可以展示牌堆顶x张牌并选择一张作为判定牌，此结果不可更改(x为你的体力值且至多为4至少为2)<li>每个准备阶段，若你的手牌数不为全场唯一最多，你展示牌堆顶两张牌并选择其中一张获得之",
				"xjzh_sanguo_shendao2":"神道",
				/*"xjzh_sanguo_dianjie":"电界",
				"xjzh_sanguo_dianjie_info":"锁定技，当你受到及造成雷电伤害后，获得一个“电”标记<li>限定技，出牌阶段，你可以选择至多3个目标，并弃置至多4张牌，令其受到x点雷电伤害（该伤害无来源），然后你失去y点体力（若你选择的目标为1，且x不大于2，y等于1；若你选择的目标大于1：你弃置的卡牌数为1，y为你选择的目标数，若你弃置的卡牌数大于1，y为你弃置的卡牌数）",*/
				"xjzh_sanguo_dianjie":"电界",
				"xjzh_sanguo_dianjie_info":"锁定技，当你受到及造成雷电伤害后，获得等量个“电”标记；出牌阶段限一次，你可以移除6个标记并选择至多3个目标，令其受到至多3点无来源雷电伤害，你可以任意分配伤害点数，由此法造成雷电伤害不获得标记。",
				"xjzh_sanguo_dianjie2":"电界",
				"xjzh_sanguo_dianjie2":"电界",
				"xjzh_sanguo_huangtian":"黄天",
				"xjzh_sanguo_huangtian_info":"锁定技，主公技，你视为拥有技能〖界雷击〗、〖影兵〗",
				"xjzh_sanguo_yingbing":"影兵",
				"xjzh_sanguo_yingbing_info":"每回合限一次，当一名武将的判定牌生效后，若为黑色，你可以视为对其使用一张【杀】，若为红色，你摸一张牌",
				"xjzh_sanguo_shenji":"神戟",
				"xjzh_sanguo_shenji_info":"锁定技，若你未装备武器牌，你使用【杀】可以指定至多3个目标，若你装备了武器牌，你视为拥有技能〖无双〗，若你装备了武器方天画戟，你使用【杀】和【决斗】造成伤害+1",
				"xjzh_sanguo_jingjia":"精甲",
				"xjzh_sanguo_jingjia_info":"锁定技，若你装备区内有：武器牌，你可以多使用一张【杀】；防具牌，防止你受到的超过1点的伤害；坐骑牌，摸牌阶段多摸一张牌；宝物牌，跳过你的判定阶段。",
				"xjzh_sanguo_shenwei":'神威',
				"xjzh_sanguo_shenwei_info":'锁定技，你的手牌上限+X（X为场上其他角色的数目且至多为3）',
				"xjzh_sanguo_shenqu":"神躯",
				"xjzh_sanguo_shenqu_info":"每名角色的准备阶段，若你的手牌数少于或等于你的体力上限数，你摸一张牌；当你受到伤害后，你可以使用一张【桃】",
				"xjzh_sanguo_shenfen":"神愤",
				"xjzh_sanguo_shenfen_info":"限定技，锁定技，你的濒死阶段，你放弃求桃然后发动〖神愤〗<li>你的体力上限始终为2",
				"xjzh_sanguo_baonulvbu":"暴怒",
				"xjzh_sanguo_baonulvbu_info":"觉醒技，当你的体力不大于2时，你将体力上限改为2，然后恢复体力至体力上限，获得技能精甲、神躯、神威、神愤，技能结算后，你立即结束当前回合开始一个额外的回合",
				"xjzh_sanguo_luoshen":"洛神",
				"xjzh_sanguo_luoshen_info":"锁定技，若你使用牌的花色与上一张不同，你摸一张牌<li>一名武将的判定牌生效之后，若为红色你摸一张牌，若为黑色，你选择一个目标弃置其一张牌<li>你改为从牌堆底摸牌",
				"xjzh_sanguo_luoshen1":"洛神",
				"xjzh_sanguo_luoshen1_info":"是否发动洛神弃置一个目标一张牌",
				"xjzh_sanguo_luoshen2":"洛神",
				"xjzh_sanguo_qixian":"七弦",
				"xjzh_sanguo_qixian_info":"你的手牌上限始终为7",
				"xjzh_sanguo_qingguo":"倾国",
				"xjzh_sanguo_qingguo_info":"当你需要使用或打出一张闪时，若你的手牌中无闪，你可以判定，若为黑色，你视为使用或打出之，若不为黑色，你可以弃置两张牌视为使用或打出之<li>当一名武将濒死时，你可以令其进行一次红色判定，若为♥，其视为使用了一张桃，若为♦，则你需要额外弃置一张♥手牌令其视为使用桃",
				"xjzh_sanguo_qingguo1":"倾国",
				"xjzh_sanguo_mingzheng":"明政",
				"xjzh_sanguo_mingzheng_info":"锁定技，其他吴势力角色摸牌阶段摸牌数+1，你的摸牌阶段摸x张牌（x为场上吴势力角色数量）；你受到伤害后失去该技能，然后你获得技能〖暴政〗。",
				"xjzh_sanguo_baozheng":"暴政",
				"xjzh_sanguo_baozheng_info":"锁定技，其他角色出牌阶段开始时，你获得其一张牌，然后其获得一个“暴政”标记；你对有“暴政”标记的角色造成伤害+1，然后移除其所有“暴政”标记并摸等量牌。",
				"xjzh_sanguo_renjun":"人君",
				"xjzh_sanguo_renjun_info":"主公技，你将〖明政〗中的摸牌数+1改为+2；你将〖暴政〗中的中的造成伤害+1改为+2；若你拥有〖明政〗，你的出牌阶段开始时，你视为使用一张【五谷丰登】，否则你视为使用一张【万箭齐发】。",
				"xjzh_sanguo_wusheng":"武圣",
				"xjzh_sanguo_wusheng_info":"锁定技，你受到伤害或不由武圣造成伤害后，获得等量“武”标记；你可以移除一个“武”标记视为使用或打出一张【杀】，此【杀】无视距离；当你装备青龙偃月刀时，你使用【杀】次数为x（x为你已损体力值+原本可使用【杀】的次数）",
				"xjzh_sanguo_wusheng1":"武圣",
				"xjzh_sanguo_shuixi":"水袭",
				"xjzh_sanguo_shuixi_info":"出牌阶段限一次，你可以弃置一张手牌并选择一个不为你的目标，然后若其装备区有牌，其可以弃置等同于装备区牌数量的牌，否则其失去x点体力，若其装备区无牌，你展示其所有手牌，获得其中所有与你弃置的牌相同花色的牌（x为其装备区的牌数量减一，x为一时不减）",
				"xjzh_sanguo_wushen":"武神",
				"xjzh_sanguo_wushen_info":"锁定技，每名角色限一次，当你受到伤害后，若你的体力不大于你体力上限的一半（向上取整），你立即开始一个新的回合；你的体力回复无效；摸牌阶段开始时，若你装备了武器牌，你的摸牌数加一，否则你装备“青龙偃月刀”；弃牌阶段开始前，你展示手牌并弃置其中的“桃”并摸等量牌，然后你令一个目标受到x点伤害(x为你弃置的“桃”的数量减一)",
				"xjzh_sanguo_mashu":"马术",
				"xjzh_sanguo_mashu_info":"锁定技，你计算与其他角色的距离时减1，当你的体力为1时，你使用【杀】次数+1",
				"xjzh_sanguo_feijiang":"飞将",
				"xjzh_sanguo_feijiang_info":"出牌阶段限一次，若你体力不小于1，你可以受到一点伤害并弃置所有手牌(若你体力为1则改为失去体力上限，若你体力上限为1则取消此前置条件)，然后摸一张牌，若此牌不为【杀】，你摸x张牌，否则你于回合内造成伤害加1且攻击距离无限(x为此牌的点数)，回合结束时，你将手牌弃至/补至1张;若你于回合内造成了伤害，回合结束后你回复一点体力",
				"xjzh_sanguo_jiwu":'极武',
				"xjzh_sanguo_jiwu_info":'出牌阶段，你可以弃置一张牌，然后获得一项：“强袭”、“铁骑”(界)、“旋风”、“完杀”，直到回合结束',
				"xjzh_sanguo_xuanfenglvbu":'旋风',
				"xjzh_sanguo_xuanfenglvbu_info":'当你失去装备区内的牌时，或于弃牌阶段弃置了两张或更多的手牌后，你可以依次弃置一至两名其他角色的共计两张牌，或将一名其他角色装备区内的一张牌移动到另一名其他角色的装备区内。',
				"xjzh_sanguo_tiejilvbu":"铁骑",
				"xjzh_sanguo_tiejilvbu_info":'当你使用【杀】指定一名角色为目标后，你可以进行一次判定并令该角色的非锁定技失效直到回合结束，除非该角色弃置一张与判定结果花色相同的牌，否则不能使用【闪】抵消此【杀】。',
				"xjzh_sanguo_wanshalvbu":"完杀",
				"xjzh_sanguo_wanshalvbu_info":'锁定技，你的回合内，除你以外，不处于濒死状态的角色不能使用【桃】。',
				"xjzh_sanguo_qiangxilvbu":"强袭",
				"xjzh_sanguo_qiangxilvbu_info":'出牌阶段限两次，你可以失去一点体力或弃置一张武器牌，然后一名本阶段内未成为过〖强袭〗的目标的其他角色造成一点伤害。',
				"xjzh_sanguo_shishu":"识书",
				"xjzh_sanguo_shishu_info":"锁定技，游戏开始时，你获得两枚“书”，此后每当你受到伤害或不因〖火令〗造成伤害时，你获得等量“书”",
				"xjzh_sanguo_huoling":"火令",
				"xjzh_sanguo_huoling_info":"锁定技，出牌阶段，你可以弃置一枚“书”，视为对一名角色使用一张火攻（该火攻不能被除你之外的其他角色以无懈可击响应）",
				"xjzh_sanguo_huoling1":"火令",
				"xjzh_sanguo_zhijiluxun":"智计",
				"xjzh_sanguo_zhijiluxun_info":"锁定技，出牌阶段限一次，你可以弃置两枚“书”并选择一名角色，令其于本回合内视为装备了【藤甲】，然后你获得技能〖制衡〗、〖攻心〗；你使用非“火攻”的非延时锦囊牌可以额外选择一个目标",
				"xjzh_sanguo_liantui":"连退",
				"xjzh_sanguo_liantui_info":"锁定技，当你失去最后一张手牌时，你获得一枚“书”并摸一张牌",
    			"xjzh_sanguo_fenyin":"焚营",
    			"xjzh_sanguo_fenyin_info":"出牌阶段限一次，你可以弃置x枚书，令场上所有其他角色依次展示手牌，然后受到来源为你的y点火焰伤害并弃置其中所有的红色手牌（x为场上存活的角色数量，至低为6，y为其手牌中的红色手牌数量）。",
				"xjzh_sanguo_buqu":"不屈",
				"xjzh_sanguo_buqu_info":"锁定技，你的回合开始时，若你已受伤，你回复一点体力，否则你获得一点体力上限；当你濒死时，若你的体力上限大于你的初始体力上限，你减一点体力上限，并回复体力至1。",
				"xjzh_sanguo_fenji":"奋激",
				"xjzh_sanguo_fenji_info":"当一名角色受到伤害后，你可以减一点体力上限，并展示牌堆顶x张牌，你选择并令其获得其中一种花色的所有牌，你获得其余的牌，然后你可以对一名不为你的角色使用一张【杀】（需合法）（x为你的体力上限*2）。",
				"xjzh_sanguo_guimou":"鬼谋",
				"xjzh_sanguo_guimou_info":"锁定技，牌堆顶的3张牌始终对你可见，你可以选择并使用/打出牌堆顶的3张牌<li>你的手牌区始终没有牌。",
				"xjzh_sanguo_guimou1":"鬼谋",
				"xjzh_sanguo_guimou2":"鬼谋",
				"xjzh_sanguo_tianji":"天机",
				"xjzh_sanguo_tianji_info":"锁定技，出牌阶段限一次，你可以交换两名角色的判定区",//若如此做，你可以展示牌堆底x张牌并令这两名角色之一选择并获得其中任一类型的牌(x为你的体力值+2)",
				"xjzh_sanguo_tianqi":"天启",
				"xjzh_sanguo_tianqi_info":"锁定技，游戏开始时，你获得场上其他角色的一个限定技，然后其该技能失效，你无视该技能发动条件；出牌阶段限一次，你可以选择一名武将牌上有觉醒技的角色，令其立即觉醒。",
				"xjzh_sanguo_qiangxi":"强袭",
				"xjzh_sanguo_qiangxi_info":"锁定技，出牌阶段限两次，你可以选择任意张装备牌令一个未因此技能流失体力的目标，令其流失x+y点体力(x为你选择的武器牌，y为你选择的非武器牌的一半(向上取整))，若你选择了非武器牌，你流失等同于非武器牌一半数量的体力（向下取整）<li>当你受到伤害后，你从牌堆或弃牌堆获得一张武器牌<li>当你回复体力后，你从牌堆或弃牌堆获得一张非武器牌的装备牌<li>你可以装备由此法获得的装备",
				"xjzh_sanguo_longnu":"龙怒",
				"xjzh_sanguo_longnu_info":"锁定技，转换技，每个其他回合开始时，若你的手牌不大于你的体力值或其手牌为全场唯一最多，你获得其一张牌，然后其摸一张牌<li>阴：出牌阶段开始时，你失去一点体力并摸一张牌，你的红色手牌均视为【火杀】且无距离限制，且你可以将你武将牌上的一张黑色“兵”当万箭齐发使用(每回合限一次)直到回合结束<li>阳：出牌阶段开始时，你失去一点体力上限并摸一张牌，你的黑色手牌均视为【雷杀】且无次数限制，且你可以将你武将牌上的一张红色“兵”当桃园结义使用(每回合限一次)直到回合结束",
				"xjzh_sanguo_longnu_taoyuan":"龙怒",
				"xjzh_sanguo_longnu_wanjian":"龙怒",
				"xjzh_sanguo_jieyi":"结义",
				"xjzh_sanguo_jieyi_info":"锁定技，主公技，你视为拥有技能〖轻进〗、〖知兵〗",
				"xjzh_sanguo_qinjin":"轻进",
				"xjzh_sanguo_qinjin_info":"锁定技，你使用【杀】指定目标后，若你造成伤害，你获得其一张牌，否则其摸一张牌，若其势力为吴，其摸两张牌;当你受到“吴”势力武将的伤害后，你需要额外弃置一张牌",
				"xjzh_sanguo_qinjin2":"轻进",
				"xjzh_sanguo_zhibing":"知兵",
				"xjzh_sanguo_zhibing_info":"每回合限一次，摸牌阶段除外，当你摸牌时，你可以对一名攻击范围内的目标使用一张无视防具的【杀】（该【杀】不计入出牌次数），若如此做，你取消摸牌改为将牌堆顶的一张牌置于武将牌上称为“兵”",
				"xjzh_sanguo_daizhao":"代诏",
				"xjzh_sanguo_daizhao_info":"锁定技，你视为拥有主公的所有技能；主公的准备阶段开始时，若你不为主公，你可以将手牌数量补至与其一致或体力回复与其一致。",
				"xjzh_sanguo_guixin":"归心",
				"xjzh_sanguo_guixin_info":"你可以跳过摸牌阶段令其他角色选择弃置一张牌或交给你一张牌，技能结算后，若你的手牌数小于场上存活的角色数量，你本回合内使用的所有基本牌和非延时锦囊牌额外结算一次。",
				"xjzh_sanguo_feiying":"飞影",
				"xjzh_sanguo_feiying_info":"锁定技，手牌数大于你的角色无法指定你为卡牌目标，你对手牌数小于你的角色使用牌无距离限制。",
				"xjzh_sanguo_batu":"霸图",
				"xjzh_sanguo_batu_info":"主公技，锁定技，其他魏势力角色体力变化后，你可以摸一张牌或令其摸一张牌。",
				"xjzh_sanguo_guanxing":"观星",
				"xjzh_sanguo_guanxing_info":"其他角色的手牌对你始终可见；你的准备/结束阶段，你可以观看牌堆顶的5/3张牌，并将其以任意顺序置于牌堆项或牌堆底。",
				"xjzh_sanguo_xinghun":"星魂",
				"xjzh_sanguo_xinghun_info":"锁定技，游戏开始时，你随机展示未上场角色的7个技能，并选择获得其中两个技能；你受到伤害后，你摸一张牌并展示此牌，你获得一个你未获得且描述中含有此牌牌名的技能",
				"xjzh_sanguo_qixing":"七星",
				"xjzh_sanguo_qixing_info":"锁定技，当你受到伤害或回复体力后，你可以观看牌堆顶3张牌，并将其中一张与“星”牌名均不一致的非延时锦囊牌置于武将牌上称为“星”，濒死阶段，若你的“星”不小于7，你将所有“星”收入手牌并回复体力至体力上限。",
				/*"xjzh_sanguo_xingyun":"星陨",
				"xjzh_sanguo_xingyun_info":"锁定技，当场上一名角色阵亡后，你获得一点体力上限。限定技，出牌阶段，你可以选择一名已阵亡的角色令其复活，然后你选择武将牌上除〖观星〗、〖星魂〗、〖星殒〗之外的一个技能令其获得之，然后你移除该技能",
				"xjzh_sanguo_xingyun2":"星殒",*/
				"xjzh_sanguo_luanzheng":"乱政",
				"xjzh_sanguo_luanzheng_info":"锁定技，限定技，游戏开始时，若你为主公，你与场上随机一名不为反贼的角色交换身份牌，若你为反贼，你将身份牌改为内奸<li>若你未发动该技能更换身份牌，你视为拥有主公的主公技",
				"xjzh_sanguo_chanxian":"谗陷",
				"xjzh_sanguo_chanxian_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "当你成为[伤害]卡牌的唯一目标时，你可以为其指定一名额外的目标或弃置一张牌令其无效<li>当其他角色成为[伤害]卡牌的唯一目标时，你可以弃置一张手牌将目标改为你";
					return "当你成为[伤害]卡牌的目标时，你可以为其指定一名额外的目标或弃置一张牌令其无效";
				}(),
				"xjzh_sanguo_shichong":"恃宠",
				"xjzh_sanguo_shichong_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "锁定技，限定技，游戏开始后，你将体力值改为场上除你之外所有角色体力值总和的平均数<li>锁定技，若你未发动该技能更改体力上限，其他角色摸牌阶段结束后，需交给你一张牌然后本回合其跳过弃牌阶段，否则其跳过出牌阶段";
					return "锁定技，游戏开始后，你将体力值改为场上除你之外所有角色体力值总和的平均数";
				}(),
				"xjzh_sanguo_baima":"白马",
				"xjzh_sanguo_baima_info":"出牌阶段限一次，你选择一名坐骑栏均为空的目标，令其随机装备坐骑牌直到其所有坐骑栏均不为空或牌堆没有坐骑牌为止，若如此做，你的回合结束时，你执行一个额外的回合。",
				"xjzh_sanguo_yicong":"义从",
				"xjzh_sanguo_yicong_info":"锁定技，游戏开始时，你废除坐骑栏且无法恢复，你计算与其他角色距离-1，场上每一张已装备的进攻马都令你计算与其他角色距离-1，场上每一张已装备的防御马都令其他角色计算与你距离+1。",
				"xjzh_sanguo_muma":"募马",
				"xjzh_sanguo_muma_info":"锁定技，当你受到伤害时，你将弃牌堆所有坐骑牌置入牌堆随机位置，若此前弃牌堆的坐骑牌大于牌堆的坐骑牌，你防止此伤害。",
				"xjzh_sanguo_yuewu":"月舞",
				"xjzh_sanguo_yuewu_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "出牌阶段限一次，你选择两名其他角色令其各自获得对方手牌中没有的花色，然后你选择两名角色手牌的花色类别之一，你依次获得其所有该花色的手牌视为对另一角色使用一张决斗，该决斗不能被无懈可击响应。";
					return "出牌阶段限一次，你选择两名其他角色令其各自获得对方手牌中没有的花色，然后你选择两名角色手牌的花色类别之一，其依次弃置所有该花色的手牌视为对另一角色使用一张决斗，该决斗不能被无懈可击响应。";
				}(),
				"xjzh_sanguo_yuehun":"月魂",
				"xjzh_sanguo_yuehun_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "锁定技，你可以选择并使用一张因弃置而进入弃牌堆的牌";
					return "锁定技，你记录因〖月舞〗选择的花色直到下次选择<li>当该花色的牌因弃置进入弃牌堆时，你可以选择一张牌使用之。";
				}(),
				"xjzh_sanguo_tiance":"天策",
				"xjzh_sanguo_tiance_info":"出牌阶段限一次，你可以将场上所有角色区域内的牌置入处理区然后逆时针依次选择一张牌直到没有牌为止。",
				"xjzh_sanguo_tianming":"天命",
				"xjzh_sanguo_tianming_info":"每回合限一次，当你成为其他角色牌的目标时，你可以与一名角色交换手牌，然后手牌数少的角色摸x张牌(x为场上与其势力一致的角色数量)",
				"xjzh_sanguo_moubian":"谋变",
				"xjzh_sanguo_moubian_info":"游戏开始时，你将势力随机切换为魏蜀吴群中的一个势力，与你势力一致的角色无法对你造成伤害。与你势力不一致的角色对你造成伤害时，你可以展示牌堆顶一张牌，其需弃置一张与此牌类型一致的手牌，否则你获得此牌且该伤害无效。",
				"xjzh_sanguo_zhongxing":"中兴",
				"xjzh_sanguo_zhongxing_info":"限定技，主公阵亡时，若你不为主公且场上与你势力一致的角色数量为最多之一，你将身份改为主公，所有与你势力一致的角色改为忠臣，此时与你同一阵营的所有角色将势力改为汉，然后其余势力将身份改为反贼，当你阵亡时，所处的阵营直接失败。",
				"xjzh_sanguo_busuan":"卜算",
				"xjzh_sanguo_busuan_info":function(){
					if(lib.config.extension_仙家之魂_xjzh_jiexiantupo) return "锁定技，出牌阶段限一次、弃牌阶段弃置至少两张牌时、成为其他角色锦囊牌的目标时、受到【杀】的伤害时，你随机获得一张【春风化雨】、【翻云覆雨】、【纸醉金迷】、【昙花一现】、【神机妙算】，然后你选择从牌堆获得至多2张类型不一致的非装备牌，并将等量手牌洗入牌堆，你失去以上五张牌时，你摸一张牌(以上五张牌不计入手牌上限且无法被弃置、获得)";
					return "锁定技，出牌阶段限一次、弃牌阶段弃置至少两张牌时、成为其他角色锦囊牌的目标时、受到【杀】的伤害时，你随机获得一张【春风化雨】、【翻云覆雨】、【纸醉金迷】、【昙花一现】、【神机妙算】，然后你选择从牌堆获得至多2张类型不一致的非装备牌，并将等量手牌洗入牌堆(以上五张牌不计入手牌上限且无法被弃置、获得)";
				}(),
				"xjzh_sanguo_busuan_append":"注：【春风化雨】、【翻云覆雨】、【纸醉金迷】、【昙花一现】、【神机妙算】不计入手牌上限且无法被弃置、获得",
				"xjzh_card_chunfenghuayu":"春风化雨",
				"xjzh_card_chunfenghuayu_info":"非延时锦囊牌，出牌阶段对一名角色使用，其免疫下一次受到的伤害。",
				"xjzh_card_chunfenghuayu_skill":"春风化雨",
				"xjzh_card_fanyunfuyu":"翻云覆雨",
				"xjzh_card_fanyunfuyu_info":"非延时锦囊牌，当一名角色即将受到伤害时，你可以打出此牌并选择除你之外的其他角色，令其受到伤害来源的等量伤害。",
				"xjzh_card_zhizuijinmi":"纸醉金迷",
				"xjzh_card_zhizuijinmi_info":"非延时锦囊牌，出牌阶段对一名角色使用，其每打出一张牌需要判定，若判定结果与【纸醉金迷】花色不一致，此牌无效，否则其摸一张牌，直到其回合结束",
				"xjzh_card_zhizuijinmi_skill":"纸醉金迷",
				"xjzh_card_tanhuayixian":"昙花一现",
				"xjzh_card_tanhuayixian_info":"非延时锦囊牌，出牌阶段对一名角色使用，你选择并合法对其使用牌堆顶前5张牌",
				"xjzh_card_shenjimiaosuan":"神机妙算",
				"xjzh_card_shenjimiaosuan_info":"非延时锦囊牌，出牌阶段对自己使用，你可以任意交换牌堆顶和牌堆底的前5张牌，然后你获得牌堆顶前5张牌中所有的锦囊牌",
				"xjzh_sanguo_youxia":"游侠",
				"xjzh_sanguo_youxia_info":"锁定技，你的回合结束时、受到伤害时，累计成为100的因数张黑色牌的目标时，你可以将牌堆中一张黑色牌置于武将牌上称为“侠”；出牌阶段，你可以将一张“侠”交给一名不拥有“侠”的角色，其出牌阶段结束后，若此牌仍在其区域内，你获得其区域内所有牌。",
				"xjzh_sanguo_youxia_append":"注：当目标为你时不受是否拥有“侠”的影响",
				"xjzh_sanguo_youxia_use":"游侠",
			    "xjzh_sanguo_youxia_tag":"invisible",
				"xjzh_sanguo_luoyi":"裸衣",
				"xjzh_sanguo_luoyi_info":"锁定技，游戏开始时，你废除防具栏，此后每当你不因〖虎痴〗获得防具牌时，你回复一点体力。出牌阶段，你可以将防具牌当一张无次数限制的【杀】使用，此【杀】基础伤害为2",
				"xjzh_sanguo_luoyi_use":"裸衣",
				"xjzh_sanguo_huchi":"虎痴",
				"xjzh_sanguo_huchi_info":"锁定技，你由〖裸衣〗使用【杀】造成伤害后，你可以获得牌堆顶前3张牌中的所有防具牌和基本牌，若此时无防具牌和基本牌，你回复一点体力；你使用基本牌时可以失去一点体力令此牌伤害+1或获得一张防具牌。",
				"xjzh_sanguo_huchi_use":"虎痴",
				"xjzh_sanguo_qice":"奇策",
				"xjzh_sanguo_qice_info":"其他角色使用非延时锦囊牌或虚拟牌后，你可以展示牌堆顶一张牌，若此牌为非延时锦囊牌或此牌花色、点数任意一项与其一致，你可以立即使用这张牌。",
				"xjzh_sanguo_zhiyu":"智愚",
				"xjzh_sanguo_zhiyu_info":"当你受到伤害后，你可以弃置一张牌，若你弃置的牌与对你造成伤害的牌颜色一致，你可以从其他角色处获得至多2张牌",
				"xjzh_sanguo_zhiyu2":"智愚",
				"xjzh_sanguo_zhiyu2_info":"当你受到伤害后，你可以从其他角色处获得至多2张牌",
				"xjzh_sanguo_zhoufu":"咒缚",
				"xjzh_sanguo_zhoufu_info":"锁定技，场上所有角色的延时锦囊牌判定结果无法更改且无视判定结果生效；出牌阶段限一次、当你受到伤害后，你展示牌堆随机一张延时锦囊牌，你可以将这张牌置入其他角色的判定区或弃置这张牌然后摸两张牌。",
				"xjzh_sanguo_yingbin":"影兵",
				"xjzh_sanguo_yingbin_info":"锁定技，场上其他角色判定区有牌时，你获得一个“兵”标记，当你有“兵”时，你始终处于翻面状态；其他角色判定阶段开始时，若你有“兵”且其判定区有牌，你可以发动一次〖咒缚〗并可以合法使用你的手牌，此阶段内，你使用牌可以摸一张与此牌类型不一致的牌，若你于此阶段内失去“兵”，你结束该技能流程",
				"xjzh_sanguo_tanzhi":"贪智",
				"xjzh_sanguo_tanzhi_info":"准备阶段，你可以依次猜测场上除你之外所有角色的手牌中是否有你选择的牌名，若对，你获得一张同名牌，否则你于本回合内无法对其使用牌。",
				"xjzh_sanguo_mingmen":"名门",
				"xjzh_sanguo_mingmen_info":"出牌阶段，你可以弃置一张牌随机扣置牌堆中的一张牌，你依次猜测其花色、点数、类型、牌名，并根据你猜对的数量获得不同的效果：<br><li>0：你受到一点无来源伤害并禁用该技能直到你的下个回合开始。<li>1：你摸一张你指定类型的牌。<li>2：你视为使用一张【万箭齐发】并摸一张牌。<li>3：你获得场上除你之外所有角色各一张牌并视为使用一张【万箭齐发】<li>4：你令任意名角色各摸一张牌或令你摸x张牌，然后对场上你没有令其摸牌的角色造成一点伤害并令其所有技能失效直到你的下个回合开始(x为场上友方角色数量)。",
				"xjzh_sanguo_zhiti":"止啼",
				"xjzh_sanguo_zhiti_info":"锁定技，你的装备栏无法被废除，你出场时补全装备栏，你的手牌上限+x，其他角色的手牌上限-y。当你不因〖摧锋〗造成伤害后，你令其获得一个“止”标记，当你受到伤害后，你可以移动场上一枚“止”标记，并视为移动前的角色对移动后的角色使用一张【杀】（x为场上所有角色的“止”标记总数，y为其他角色武将牌上“止”的数量）。",
				"xjzh_sanguo_cuifengx":"摧锋",
				"xjzh_sanguo_cuifengx_info":"锁定技，其他角色获得/移除“止”标记时，其选择废除/恢复一个装备栏；当有“止”标记的角色使用牌指定目标时，若此时其“止”数量为场上最多之一，你对其造成等同于“止”标记数量点伤害并禁用其所有技能直到其下个回合开始，否则你可以选择等量角色成为此牌的额外目标，然后移除其所有“止”标记。",
				"xjzh_sanguo_xingyi":"行医",
				"xjzh_sanguo_xingyi_info":"出牌阶段限一次，你可以指定一名角色令其弃置所有手牌然后摸x+y张牌，其中每有一张红桃牌，其回复一点体力，若有多余回复改为你摸牌且其若有其负面状态，其可以选择一项移除之（x为其弃置的手牌数，y为其体力值）。",
				"xjzh_sanguo_qingnang":"青囊",
				"xjzh_sanguo_qingnang_info":"每回合限一次，一名角色不因此技能体力变化后，若其不处于濒死状态，你可以令其交换体力值与已损体力值，然后若其体力值不小于已损体力值，其获得一点体力上限，然后若你的体力上限小于场上角色总数，你获得一点体力上限。",
				"xjzh_sanguo_elai":"恶来",
				"xjzh_sanguo_elai_info":"出牌阶段，你可以失去一点体力，然后摸x+1张牌，若这些牌包含装备牌，你可以弃置这些牌中的任意张装备牌对一名其他角色造成等量伤害，然后你弃置其等量牌。（x为你已损体力值）",
				"xjzh_sanguo_tiequ":"铁躯",
				"xjzh_sanguo_tiequ_info":"当你受到伤害时，你随机展示一张手牌，伤害来源须弃置一张同类型的牌，否则其失去一点体力。",
				"xjzh_sanguo_guhuo":"蛊惑",
				"xjzh_sanguo_guhuo_info":"锁定技，游戏开始时，若你的身份为主公，所有角色重新选将，否则你随机切换你的身份，然后隐藏你的身份（对你也不可见）直到你阵亡。出牌阶段限一次，你可以声明一种身份并展示在武将牌上，此后每当一名角色对你使用牌时，其需要猜测你展示在武将牌上的身份是否正确，若错，你移除此牌为你的目标且其获得一个“缠怨”标记，然后你摸一张牌并随机切换你的身份。",
				"xjzh_sanguo_chanyuan":"缠怨",
				"xjzh_sanguo_chanyuan_info":"锁定技，你的手牌上限及回合摸牌数+x（x为场上所有角色“缠怨”的总数）；有“缠怨”的角色对你使用牌无需猜测，然后移除此牌为你的目标并令你摸两张牌，你使用牌可以额外选择任意有“缠怨”的角色成为目标，然后移除其一个“缠怨”标记。",
				"xjzh_sanguo_jianjie":"荐杰",
				"xjzh_sanguo_jianjie_info":"锁定技，游戏开始时，你展示所有未加入游戏且武将名为诸葛亮或庞统的武将牌并将其置于你的武将牌上称为“杰”；其他角色/你的回合开始时，你可以选择/选择移除并令其获得一张武将牌上的技能直到回合结束，若如此做，回合结束时，你令除你之外的其他角色选择交给你一张牌或受到一点来源为其的伤害。",
				"xjzh_sanguo_yinshi":"隐世",
				"xjzh_sanguo_yinshi_info":"锁定技，若你的武将牌上存在“杰”，你的回合外防止所有伤害；出牌阶段限一次、当一名角色濒死时，若你有“杰”，你可以令其他角色/其替换武将牌为你选择的一张“杰”并重置武将牌。",
				"xjzh_sanguo_zhiheng":"制衡",
				"xjzh_sanguo_zhiheng_info":"出牌阶段限X次，你可以弃置任意张牌，然后摸等量的牌，若你于此技能流程内选择任意区域内的所有牌，每一区域令你额外摸一张牌（X为你已损失的体力值+1）",
				"xjzh_sanguo_wuyun":"吴运",
				"xjzh_sanguo_wuyun_info":"你的回合结束时，若你在本回合内发动了制衡1/2/3/4次，则你获得技能吴战/吴盟/吴兴/吴祚。",
				"xjzh_sanguo_wuzhan":"吴战",
				"xjzh_sanguo_wuzhan_info":"限定技，当你将摸不小于三张牌时，可以改为将不超过摸牌数点伤害任意分配给其他角色（每名角色至多分配2点）。",
				"xjzh_sanguo_wumeng":"吴盟",
				"xjzh_sanguo_wumeng_info":"每回合限一次，当你即将摸牌时，你可以取消之并选择一位非吴势力的玩家，然后从牌堆顶展示你摸牌数两倍的牌，并选择其中的一半获得之，然后其获得另外一半的牌。",
				"xjzh_sanguo_wuxing":"吴兴",
				"xjzh_sanguo_wuxing_info":"锁定技，你的手牌上限+2X（X为其他吴势力角色数）。当你的手牌不小于8张时，你造成的伤害+1。",
				"xjzh_sanguo_wuzuo":"吴祚",
				"xjzh_sanguo_wuzuo_info":"每回合一次，当你失去了你的最后一张手牌时，你可以摸两张牌。",
				"xjzh_sanguo_jiuyuan":"救援",
				"xjzh_sanguo_jiuyuan_info":"主公技，其他吴势力角色回复体力时，其可以改为令你回复1点体力，然后其摸一张牌。",
				"xjzh_sanguo_quling":"驱灵",
				"xjzh_sanguo_quling_info":"锁定技，当你击败其他角色时，根据其武将评级获得x点灵力。出牌阶段限一次，你可以消耗灵力从你已击败的武将中选择任意个技能。",
				"xjzh_zengyi_shuangsheng_card":"双生",
			    "xjzh_zengyi_shuangsheng_card_info":"左幽将其学到的所有法术记录在了这张卡片上，需要时只需要念动咒语就可以随意发动已学会的法术。",
				"xjzh_sanguo_tongxuan":"通玄",
				"xjzh_sanguo_tongxuan_info":"出牌阶段限一次、游戏开始时、你的回合结束时，你可以移除因〖通玄〗获得的技能并从除〖双生〗之外的所有增益技能中选择<span style=\"color:#eb1100\">1</span>个技能获得之。",
				"xjzh_sanguo_youbian":"幽变",
				"xjzh_sanguo_youbian_info":"锁定技，你的准备阶段，你摸x张牌（x为〖通玄〗中的为红色数字），然后若你已受伤，〖通玄〗中的红色数字+1。",
				"xjzh_sanguo_shouye":"授业",
				"xjzh_sanguo_shouye_info":"锁定技，你的回合开始时，令场上除你之外的其他角色从〖鬼道〗、〖雷击〗、〖助祭〗中随机获得一个技能直到其发动该技能或你的下个回合开始时。",
				"xjzh_sanguo_xianshou":"仙授",
				"xjzh_sanguo_xianshou_info":"锁定技，其他角色发动因〖授业〗获得的技能时，你可以获得其武将牌上的一个技能直到你发动该技能；场上每有一个角色拥有因〖授业〗获得的技能，你摸牌数+1。",
				"xjzh_sanguo_lundao":"论道",
				"xjzh_sanguo_lundao_info":"出牌阶段限一次，你可以与至多x名其他角色拼点直到其中一方没有手牌为止，然后若你赢的次数更多，你收回所有你拼点所用的牌，并令其直到你的下个回合开始时使用牌无法指定你为目标，且若其发动技能指定你为目标，你可以指定一名其他角色为该技能的目标，若你赢的次数更少，你失去一点体力（x为场上有因〖授业〗获得技能的角色且至多3，至少为1）。",
				"xjzh_sanguo_shiyong":"恃勇",
				"xjzh_sanguo_shiyong_info":"锁定技，你受到指定目标为1的卡牌的伤害时防止之，然后你减一点体力上限，并令伤害来源摸2张牌，若对你造成伤害的牌颜色为红色，伤害来源回复一点体力。",
				"xjzh_sanguo_yaowu":"耀武",
				"xjzh_sanguo_yaowu_info":"出牌阶段限一次，你可以减一点体力上限并选择一名其他角色，令其获得一点体力上限，若如此做，你展示其所有手牌，若其中有[伤害]卡牌，你可以使用之。",
				"xjzh_sanguo_yangwei":"扬威",
				"xjzh_sanguo_yangwei_info":"限定技，当你的体力上限不大于2时，你令场上除你之外的所有角色失去一点体力上限，然后你获得等量体力上限。",
				"xjzh_sanguo_zhawang":"诈亡",
				"xjzh_sanguo_zhawang_info":"锁定技，限定技，其他角色即将阵亡时，若此时不满足你的胜利条件且你已阵亡，你防止之并令即将阵亡的角色回复体力至1，然后你复活至体力上限并执行一个额外的回合。",
				"xjzh_sanguo_xingwu":"兴吴",
				"xjzh_sanguo_xingwu_info":"锁定技，当你发动锁定技/非锁定技后，你随机获得一个吴势力非锁定技/锁定技，然后移除上一个你因此技能获得的技能。",
				"xjzh_sanguo_jiang":"激昂",
				"xjzh_sanguo_jiang_info":"当你不因此技能成为[伤害]卡牌的目标或你指定其他角色为[伤害]卡牌的目标后，你可以令其弃置一张牌视为使用一张你指定的任意[伤害]卡牌，其使用的这张牌的伤害来源均视为你。",
				"xjzh_sanguo_hunzi":"魂资",
				"xjzh_sanguo_hunzi_info":"锁定技，你造成的伤害均视为无属性伤害，你的所有卡牌花色视为无花色，你造成伤害时/受到伤害后摸一张牌。",
				"xjzh_sanguo_guose":"国色",
				"xjzh_sanguo_guose_info":"锁定技，游戏开始时，你将牌堆所有的【乐不思蜀】移出游戏；其他角色准备阶段开始时，你可以弃置一张♦牌令其执行一次【乐不思蜀】判定。",
				"xjzh_sanguo_wanrong":"婉容",
				"xjzh_sanguo_wanrong_info":"当一名角色的【乐不思蜀】判定成功后，你可以摸2张牌，然后令一名不为你的角色执行一个额外的回合。",
				"xjzh_sanguo_tianxiang":"天香",
				"xjzh_sanguo_tianxiang_info":"锁定技，当你的♥️牌即将进入弃牌堆时，你可以令一名角色获得一个“天香”标记，有“天香”标记的角色区域内的♠️牌视为♥️牌。",
				"xjzh_sanguo_emei":"额眉",
				"xjzh_sanguo_emei_info":"锁定技，当一名角色获得/移去“天香”标记时，其获得未上场女性角色的/失去一个技能；出牌阶段限一次，你可以移去一名角色的所有“天香”标记，若如此做，其须弃置等量牌或受到等量伤害。。",
				"xjzh_sanguo_lixiang":"离乡",
				"xjzh_sanguo_lixiang_info":"限定技，当你濒死时，你将武将牌替换为“小乔”或“大乔”，并回复体力至体力上限。",

				
				"XWSG_wei":"曹魏",
				"XWSG_shu":"蜀汉",
				"XWSG_wu":"东吴",
				"XWSG_qun":"群雄",
				"XWSG_jin":"西晋",
				"XWSG_shen":"特殊",
				
				
			},
		};
        if(true){
            for(var i in XWSG.character){
                //阵亡配音
                XWSG.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWSG.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWSG.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
            }
        }else{
            for(var i in XWSG.character){
                XWSG.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
            }
        }
		//无需复制素材，自动覆盖十周年UI卡牌素材
		if(game.getExtensionConfig('十周年UI','enable')&&lib.config.xjzh_tenuiCardcopy){
            if(typeof lib.decade_extCardImage!='object'){
                lib.decade_extCardImage = {};
            }
            var cardList=["xjzh_zengyi_shuangsheng_card","xjzh_card_chunfenghuayu","xjzh_card_fanyunfuyu","xjzh_card_zhizuijinmi","xjzh_card_tanhuayixian","xjzh_card_shenjimiaosuan"];
            for(var cardname in XWSG.card){
                if(cardname=="xjzh_zengyi_shuangsheng_card") continue;
                if(cardList.includes(cardname)) continue;
                var url = lib.assetURL+"extension/仙家之魂/image/cardimage/tenui/"+cardname+".webp";
                lib.decade_extCardImage[cardname] = url;
            }
        }
		if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.length){
			for(let name of game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character){
				if(!XWSG.character[name]) console.log('未在仙武三国武将包找到该武将');
				else{
					XWSG.character[name][4].remove('unseen');
					XWSG.character[name][4].remove('forbidai');
				}
			}
		}
		return XWSG;
	});
});