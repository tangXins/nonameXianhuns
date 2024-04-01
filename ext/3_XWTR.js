'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('XWTR')) lib.config.characters.remove('XWTR');
		lib.translate['XWTR_character_config']='仙武同人';
		var XWTR={
			name:'XWTR',
			connect:true,
			connectBanned:[],
			characterSort:{
				XWTR:{
					"XWTR_zxzh":["xjzh_zxzh_jiangningzhi","xjzh_zxzh_linmo","xjzh_zxzh_yumuren","xjzh_zxzh_linlingshiyu","xjzh_zxzh_yuanyuan","xjzh_zxzh_mufeng","xjzh_zxzh_moqinwu","xjzh_zxzh_linziyan","xjzh_zxzh_moqinyan"],
					"XWTR_poe":["xjzh_poe_yuansushi","xjzh_poe_nvwu","xjzh_poe_youxia","xjzh_poe_juedouzhe","xjzh_poe_chuxing","xjzh_poe_weishi","xjzh_poe_ruiyan","xjzh_poe_guizu"],
					"XWTR_wzry":["xjzh_wzry_duoliya","xjzh_wzry_huamulan","xjzh_wzry_haiyue","xjzh_wzry_libai","xjzh_wzry_yao","xjzh_wzry_ganjiangmoye"],
					"XWTR_diablo":["xjzh_diablo_lilisi","xjzh_diablo_kelike","xjzh_diablo_nataya","xjzh_diablo_yafeikela","xjzh_diablo_lamasi","xjzh_diablo_moruina","xjzh_diablo_kaxia"],
					"XWTR_dnfplayer":["xjzh_dnf_jianshen","xjzh_dnf_shengqi"],
					"XWTR_dnfnpc":["xjzh_dnf_suodeluosi"],
					"XWTR_xyj":["xjzh_xyj_sunwukong"],
					
				},
			},
			character:{
				//众星之魂
				"xjzh_zxzh_jiangningzhi":["female","qun",4,["xjzh_zxzh_dianling","xjzh_zxzh_tusu"],[]],
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
				"xjzh_diablo_nataya":["female","qun",4,["xjzh_diablo_duguan","xjzh_diablo_xianjing","xjzh_diablo_baolu"],[],["xjzhMp:100"]],
				"xjzh_diablo_kelike":["female","qun",4,[],["unseen","forbidai"],["xjzhMp:0/100"]],
				"xjzh_diablo_moruina":["female","qun",4,["xjzh_diablo_luanshe","xjzh_diablo_jingshe","xjzh_diablo_guanzhu"],[]],
				"xjzh_diablo_kaxia":["female","qun",4,["xjzh_diablo_sushe","xjzh_diablo_yingbi","xjzh_diablo_jianyu"],[]],
				"xjzh_diablo_yafeikela":["male","qun",4,["xjzh_diablo_lingshou","xjzh_diablo_shilue"],[],["xjzhMp:100"]],
				"xjzh_diablo_xiong":["male","qun",4,["xjzh_diablo_zhongou","xjzh_diablo_fensui"],["unseen","forbidai"]],
				"xjzh_diablo_lang":["male","qun",4,["xjzh_diablo_leibao","xjzh_diablo_kuanghou"],["unseen","forbidai"]],
				"xjzh_diablo_lilisi":["female","qun",3,["xjzh_boss_lianji","xjzh_boss_qiangji"],["unseen","forbidai"]],
				
				//地下城与勇士
				"xjzh_dnf_jianshen":["male","qun",4,["xjzh_dnf_levelUp"],[],["xjzhMp:80"]],
				"xjzh_dnf_shengqi":["male","qun",4,["xjzh_dnf_levelUp"],[],["xjzhMp:/80100"]],
				"xjzh_dnf_suodeluosi":["male","qun",3,["xjzh_dnf_jianshenx","xjzh_dnf_aoyi","xjzh_dnf_jianyi"],[],[]],
				
				//西游释厄传
				"xjzh_xyj_sunwukong":["male","qun",4,["xjzh_xyj_tianhuo","xjzh_xyj_dongcha","xjzh_xyj_ruyi"],[],[]],
				
			},
			characterIntro:{
				//众星之魂
				"xjzh_zxzh_linlingshiyu":"技能设计：吃朵棉花糖<br><br>技能编译：吃朵棉花糖<br><br>配音CV：挂娘、指尖旋律<br><br>角色故事：暂无",
				"xjzh_zxzh_yuanyuan":"林子言的妻子，同为散修拜入剑宗，林子言对其颇为照顾，且异常关心，后结为夫妻。",
				"xjzh_zxzh_mufeng":"",
				"xjzh_zxzh_moqinwu":"",
				"xjzh_zxzh_linziyan":"",
				"xjzh_zxzh_moqinyan":"",
				"xjzh_zxzh_yumuren":"",
				"xjzh_zxzh_linmo":"",
				"xjzh_zxzh_jiangningzhi":"",
				
				//流放之路
				"xjzh_poe_nvwu":"",
				"xjzh_poe_yuansushi":"",
				"xjzh_poe_juedouzhe":"",
				"xjzh_poe_chuxing":"",
				"xjzh_poe_weishi":"",
				"xjzh_poe_youxia":"",
				"xjzh_poe_ruiyan":"",
				"xjzh_poe_guizu":"",
				
				//王者荣耀
				"xjzh_wzry_libai":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;巍峨的长安城，数百年间屹立不倒。但长安的门户，守卫严密的朱雀门却镌刻着一道剑痕，那是一个青年醉后以长剑所书的诗句“欲上青天揽明月”，轰动整个长安城。当治安官狄仁杰欲以破坏长安的罪名逮捕他时，爱才的女帝拒绝了。女帝甚至下令保留朱雀门上饱含剑意的诗痕。数日之间，这名一人一剑，直入长安的青年“剑仙”之名传遍长安。他就是李白。<br>&ensp;&ensp;&ensp;&ensp;彼时的李白，年少轻狂，拒绝了女帝入朝为官的邀请后，开始试剑天下的旅途。当他初次见到滔滔黄河时，心中的剑意迸发而出，奔流到海不复回。从那时起，没有机关的师承，没有魔道的秘法，没有魔种的血脉的李白，仅仅依靠自己和手中的剑，成为帝国强者中的第一人，乃真正的天纵之才。他会给每个败于己的对手赋诗，因此，诗名和剑名也一同流传开来。后来，甚至有人视之为荣耀，为得诗篇而求一败，令人哭笑不得。<br>&ensp;&ensp;&ensp;&ensp;就在李白的剑意到达巅峰之后不久，旅途也来到了云中漠地。很少有人知道，生活在长安的李白，出生于云中漠地的海市蜃楼之下。他怀着剑仙荣耀归来，却发现幼年记忆里充满异域风情的繁华城池已经不复存在。被贩为奴隶的公主，向他倾诉自己的遭遇：帝国的铁骑越过长城，踏平了整个云中漠地。荒废的城池很快被黄沙掩埋。李白想要救出她，少女却选择了从屈辱中自我了断。<br>&ensp;&ensp;&ensp;&ensp;鲜血激起了李白的侠义之心。他第二次单剑闯入长安，质问女帝讨要征平云中漠地的说法。一夜长安风云变色，大明宫也在剑仙之剑下黯然无光。有史以来从未曾被外力攻破的长安城，第一次因为一个普通人而动摇。<br>&ensp;&ensp;&ensp;&ensp;没有人知道最后发生了什么事。李白自长安城中全身而退。他和女帝的密谈，被视为禁忌，不见于史官的笔下。<br>&ensp;&ensp;&ensp;&ensp;只有李白自己清楚，他的骄傲被挫败了，在最强的巅峰。从那之后，他开始自我放逐，从寂寞的旅途中寻求新的意义，陪伴他的，除了剑，还多了酒。<br>&ensp;&ensp;&ensp;&ensp;人人都以为剑仙就此一蹶不振。但长安的府衙中，狄仁杰查看着关于李白的行踪报告，露出难以捉摸的冷笑。<br>&ensp;&ensp;&ensp;&ensp;“元芳，你怎么看？”<br>&ensp;&ensp;&ensp;&ensp;不等密探回答，他立刻自言自语：“再次出鞘的时候，会更加惊天动地吧。这家伙，太过骄傲，又太过寂寞了。”<br>&ensp;&ensp;&ensp;&ensp;而狄仁杰所预言的这一天，在数年之后到来。<br>&ensp;&ensp;&ensp;&ensp;这是长安城平常的一天。晨钟回响在上空，自云中漠地的旅人远途而来，正抬首打量朱雀门上的剑痕；热闹的长乐坊中，五陵少年们因前所未有的美妙琴声而骚动；感业寺的银杏树依旧枝繁叶茂。唯有狄仁杰手下的密探隐入黑暗，紧张注视着那个白衣潇洒，酒剑相伴的男子身影。<br>&ensp;&ensp;&ensp;&ensp;剑仙李白，三入长安了。<br>&ensp;&ensp;&ensp;&ensp;这次长安城又将怎样被动摇呢？<br>&ensp;&ensp;&ensp;&ensp;“大河之剑天上来！”",
				"xjzh_wzry_yao":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;曜是一个从小怀抱英雄梦想的热血少年，与冷静强大的姐姐镜激烈的争夺着所有比赛的第一。尽管天性不同，但他们都到了稷下学习，渴望在这座象征着王者大陆最高智慧的学府中获得成长。<br>&ensp;&ensp;&ensp;&ensp;曜在老师庄周举办的归虚梦演报名中结识到朋友并成为这支“星之队”的队长，他们的心灵突破了种种桎梏、在竞赛角逐中相继绽放异彩，曜通过环中梦竞赛一节寻找到自我意识的根基，掌握到星辰之力，用剑划下了有力的一笔，就像淹没于漫天星辰中的星星，终于闪烁出独属他的光芒。<br>&ensp;&ensp;&ensp;&ensp;少年曜在环中梦里打败了姐姐，然而作为英雄，一切才刚刚开始。",
				"xjzh_wzry_ganjiangmoye":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;大河之畔生活着贫寒的工匠夫妇。两人青梅竹马，相依为命。丈夫干将别无所长，只是一味痴迷于铸剑。废弃掉的剑在门外堆成了剑冢。村人都嘲笑这个不通世事的家伙，唯有妻子无怨无悔支持着他。<br>&ensp;&ensp;&ensp;&ensp;干将内心同样愧疚于妻子不能过上更好的生活。他只懂得铸剑，便希望能借此扬名，那样终究会有令妻子自豪和荣耀的一天。于是他带着作品去拜访各地的铸剑师，并挑战他们。他削断无数名匠之作，很快让自己的名字传遍云梦泽。自然，被砸掉招牌的铸剑师们也对他恨之入骨。<br>&ensp;&ensp;&ensp;&ensp;世间公认有位绝代的大师。人们都说他的铸剑不仅削铁如泥，而且栖息着魂灵。大师许多弟子都败于干将之手，他们联合起来向师傅痛诉。于是大师向干将送上邀请拜访的帖子。<br>&ensp;&ensp;&ensp;&ensp;胜过大师，自己就是名副其实的当世铸剑第一人。可他如约登门时，大师甚至没有露面，只命弟子持剑在门口迎接，轻轻一挥就将干将之剑斩成几半。匠人们出了一口恶气！他们放声嘲笑干将，把过往的耻辱加倍回报给他。<br>&ensp;&ensp;&ensp;&ensp;干将落荒而逃，失败在心中灼烧。他回到家中重复起枯燥的铸造生涯。熔炉四时不熄，每把剑都比前一把更加锋利，可它们始终是没有生命的铁片。死的剑和活的剑，犹如天上地下般的差距。他逐渐执念于铸剑，完全忘掉了初衷，连妻子的身体日渐衰弱都没有注意到。<br>&ensp;&ensp;&ensp;&ensp;铸剑疯子的事传到阴阳家们耳中。自称为东皇太一的男人召见铸剑师，领他登上祭祀之地，那里矗立着一把剑。干将立刻认出这是大师的作品。<br>&ensp;&ensp;&ensp;&ensp;“这把剑守护着太古的奇迹。它的名字叫巨阙，里面栖息着魂灵：它是剑——更是盾牌。接近它的人都会被剑锋撕裂。”东皇太一的计划困难而有效：锻造更锋利的剑，斩断它。<br>&ensp;&ensp;&ensp;&ensp;“帮我得到奇迹，你就可达成心愿，成为世间无可逾越的铸剑师。在此之前，让我先告诉你让剑活过来的秘法吧。”<br>&ensp;&ensp;&ensp;&ensp;干将浑身颤栗着，不敢相信耳中所闻。<br>&ensp;&ensp;&ensp;&ensp;东皇太一交给他<br>&ensp;&ensp;&ensp;&ensp;太古保存下来的精铁。炉火燃烧了三天三夜，精铁无论如何都不能融化。干将眼里布满血丝，内心天人交战，需要一个生命才能让剑活过来。<br>&ensp;&ensp;&ensp;&ensp;他太专注，没有注意到妻子悄无声息接近，眼神温柔而忧伤。她收到匿名来信，信上写着实现丈夫心愿的方法。自己的身体早已病入膏肓，命中注定要拿去成全爱人。干将从火炉的阴影中抬起头，正好迎上妻子最后的笑容——下一刻她便猛然跳入炉火中。<br>&ensp;&ensp;&ensp;&ensp;撕心裂肺的呼唤和陡然明亮的铁水席卷内心，另一手下意识握紧了铁锤。痛苦转瞬即逝，成功的狂热反倒熔炼了太古的精铁。天明时分，迄今最杰出的作品诞生了，里面栖息着魂灵。男人怀抱宝剑，呢喃着妻子的名字：莫邪。嘴角微微上翘：最爱的妻子和剑，如今是一体了。<br>&ensp;&ensp;&ensp;&ensp;正如东皇太一计划的那样，莫邪剑斩断了巨阙，奇迹“转生之术”的力量被解放出来。这是太古建造的最后奇迹。<br>&ensp;&ensp;&ensp;&ensp;付出那么多，终于可以凌驾世间所有铸剑者之上了！干将毫不犹豫扑向光辉中。炉火般的灼热力量包裹着他，魔道千锤百炼着血肉之躯，令其坚硬而锋利。<br>&ensp;&ensp;&ensp;&ensp;他实现至高的愿望，将自己也锻造为剑。<br>&ensp;&ensp;&ensp;&ensp;故事并未到此结束。干将付出全部所有，现在他需要证明自己。于是他重访大师住所，去回报过往的羞辱。可全部执念面对冷冰冰的墓石却戛然而止：大师早已逝去多年。支撑人生的信念顿时崩塌，统统化作疯狂和绝望。怀抱中的莫邪剑变幻为妻子的身影，轻声安慰他。只有她，永远只有她善解人意，与自己不离不弃。<br>&ensp;&ensp;&ensp;&ensp;一分为二的生命，独一无二的魂灵。",
				"xjzh_wzry_haiyue":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;<br><br>&ensp;&ensp;&ensp;&ensp;海月是最古老的月裔之一，也是神秘莫测的云中蝶的饲养人。<br><br>&ensp;&ensp;&ensp;&ensp;她在孩童时期曾因孱弱多病而被视为无用之人，被村子遗弃在野外苟延残喘十余年。最终在一场饥荒之年的冬夜，她平静地接受了自己将被野兽当作食物的命运。但是，帝俊的降临让云中度过了灾厄，也将她从死亡边缘拉了回来。<br><br>&ensp;&ensp;&ensp;&ensp;从那以后，她立誓将自己的生命献给神。为此，她经历了残酷的人体改造，成为了由帝俊亲手制造的神职者“月裔”中的一员。她忠心耿耿地追随并协助帝俊在云中的所有计划，她亲眼见证帝俊的光辉结束了人间的永夜，和众人一起拥戴祂为“神明”。然而，一场天地倒卷的诸神之战将这些都毁灭了。在圣剑弑神的瞬间，海月透支自己的生命，借用帝俊赐予她的“云中蝶”爆发出了惊人的力量，让众神的军队陷入了一瞬的幻境。正是这短暂的片刻让帝俊的神魂得以逃逸。<br><br>&ensp;&ensp;&ensp;&ensp;一千多年过去了，众神的传说早已湮灭于虚空，但在遥远的漠北天阙山巅，一缕执念却始终萦绕在海月那具早已死亡的琉璃躯体上。“不能让祂这样死去”，成为了铭刻在海月灵魂深处的印记，留在了人间。直到有一天，漠南来的少年不小心打破了天阙山的宁静，也惊醒了沉睡中的幽魂。经历了千年的死别，醒来的海月发誓定要夺回神明的遗产，迎接祂的归来。<br><br>&ensp;&ensp;&ensp;&ensp;为此，她将不惜一切代价。",
				"xjzh_wzry_huamulan":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;静如影，疾如风。<br><br>&ensp;&ensp;&ensp;&ensp;金属的撞击声中，身影掠过。<br><br>&ensp;&ensp;&ensp;&ensp;不动如山，迅烈如火。<br><br>&ensp;&ensp;&ensp;&ensp;偷袭者重重跌倒在地。<br><br>&ensp;&ensp;&ensp;&ensp;战士的头盔裂开，被她扔到地上。发丝飘散出来。<br><br>&ensp;&ensp;&ensp;&ensp;女人！<br><br>&ensp;&ensp;&ensp;&ensp;“想活命吗？紧跟着我！”<br><br>&ensp;&ensp;&ensp;&ensp;前方是无际的长城，以及无际的敌人。<br><br>&ensp;&ensp;&ensp;&ensp;“姐可是传说！”",
				"xjzh_wzry_duoliya":"注：本故事纯属虚构，与真实历史无关。<br><br>&ensp;&ensp;&ensp;&ensp;朵莉亚是来自大海深处的人鱼少女，会伪装成人类在海都“寻宝”，她同时也是人鱼族最有潜力的歌者。<br><br>&ensp;&ensp;&ensp;&ensp;朵莉亚出生于深海中的人鱼族，孩童时代的她便已被族人寄予厚望。小时候，在寻宝”的途中救下了海都命运家族少主海诺，两人从此成为两小无猜的“秘密伙伴”。后来的朵莉亚为平息海底深渊巨兽的危机，选择让狂躁的巨兽吞噬掉俩人最美好的情感以平息动乱。两人在之后皆失去有关对方的记忆，为找到失去的记忆，朵莉亚加入火鹰号，并打算前往珊瑚岛寻找传说中能帮忙唤回失落记忆的“宝物”。",
				
				//暗黑破坏神
				"xjzh_diablo_kelike":"《暗黑破坏神》的科里克是守护亚瑞特巅峰的三名古代守护者之一，同时他也是野蛮人“野禽”部族的前任领导者。在担任部族领袖期间，科里克的主要职责就是保护他的族民免受野兽和敌对部族的侵袭与骚扰。",
				"xjzh_diablo_lamasi":"《暗黑破坏神》中的游戏角色，初代死灵法师",
				"xjzh_diablo_moruina":"《暗黑破坏神》中的第一个游侠，和其他角色一起建立了罗格营地",
				"xjzh_diablo_kaxia":"《暗黑破坏神》中的弓箭手首领，莫瑞娜的好朋友",
				"xjzh_diablo_yafeikela":"《暗黑破坏神》中的德鲁伊首领，据说德鲁伊和野蛮人同宗同源",
				"xjzh_diablo_lilisi":"莉莉丝是游戏《暗黑破坏神IV》中的角色。莉莉丝为憎恨之王墨菲斯托的女儿、庇护所的创造者。",
				"xjzh_diablo_nataya":"游戏《DIABLO II》（暗黑破坏神II）ACT3库拉斯特海港中的一个NPC。一个被雇佣的女杀手，同时也是刺客宗族费斯贾塔（Viz-jaq'tarr）的一员。",
				
				//地下城与勇士
				"xjzh_dnf_jianshen":"只有运用剑术到极致的强大剑士才能获此殊荣，至此方可攀上神剑之巅。",
				"xjzh_dnf_shengqi":"圣骑士是在贝尔玛尔大圣堂里受到神的保佑的法师。他们的职责是保护队员的安全。",
				"xjzh_dnf_suodeluosi":"真正的剑魂索德罗斯，精通数万种武器，具有可以与周围的武器产生共鸣的特殊天赋，在战斗中可以发挥强大的威力。",
				
				//西游释厄传
				"xjzh_xyj_sunwukong":"孙悟空（又称齐天大圣、孙行者、斗战胜佛），是中国古典神魔小说《西游记》中的主要角色之一（传为吴承恩所著）。由开天辟地产生的仙石孕育而生，出生地位于东胜神洲的花果山上，因带领猴群进入水帘洞而被尊为“美猴王”。为了学艺而漂洋过海拜师于须菩提祖师，得名孙悟空，学会大品天仙诀、地煞数七十二变、筋斗云等高超的法术。",
				
			},
			characterTitle:{
				//众星之魂
				"xjzh_zxzh_jiangningzhi":"柔荑凝脂",
				"xjzh_zxzh_linlingshiyu":"剑术双绝",
				"xjzh_zxzh_yuanyuan":"魂牵梦萦",
				"xjzh_zxzh_mufeng":"风中奇杰",
				"xjzh_zxzh_moqinwu":"一舞倾城",
				"xjzh_zxzh_linziyan":"雷法随心",
				"xjzh_zxzh_moqinyan":"铸剑冶魂",
				"xjzh_zxzh_yumuren":"拾樵抱薪",
				"xjzh_zxzh_linmo":"万法同源",
				
				//流放之路
				"xjzh_poe_nvwu":"控火专家",
				"xjzh_poe_yuansushi":"元素大师",
				"xjzh_poe_juedouzhe":"竞技专家",
				"xjzh_poe_chuxing":"冷血屠夫",
				"xjzh_poe_weishi":"抵抗大师",
				"xjzh_poe_youxia":"诡道专家",
				"xjzh_poe_ruiyan":"神箭精灵",
				"xjzh_poe_guizu":"天生贵族",
				
				//王者荣耀
				"xjzh_wzry_libai":"青莲剑仙",
				"xjzh_wzry_yao":"星辰之子",
				"xjzh_wzry_ganjiangmoye":"淬命双剑",
				"xjzh_wzry_haiyue":"永夜之心",
				"xjzh_wzry_huamulan":"传说之刃",
				"xjzh_wzry_duoliya":"人鱼公主",
				
				//暗黑破坏神
				"xjzh_diablo_yafeikela":"德鲁伊领袖",
				"xjzh_diablo_lamasi":"初代死灵法师",
				"xjzh_diablo_moruina":"始祖游侠",
				"xjzh_diablo_kaxia":"罗格领袖",
				"xjzh_diablo_nataya":"潜影杀手",
				
				//地下城与勇士
				"xjzh_dnf_jianshen":"武器大师",
				"xjzh_dnf_shengqi":"神选之光",
				"xjzh_dnf_luodeluosi":"剑术顶峰",
				
				//西游释厄传
				"xjzh_xyj_sunwukong":"破妄金瞳",
				
			},
			perfectPair:{
			},
			characterFilter:{
                'xjzh_diablo_lamasi':function(mode){
                    if(mode=="identity") return true;
                },
                'xjzh_diablo_yafeikela':function(mode){
                    if(get.xjzh_device()=="android"){
                        if(get.xjzh_kernel()=="webkit") return true;
                    };
                    return false;
                },
                'xjzh_diablo_xiong':function(mode){
                    return false;
                },
                'xjzh_diablo_lang':function(mode){
                    return false;
                },
                'xjzh_dnf_jianshen':function(mode){
                    return false;
                },
                'xjzh_dnf_shengqi':function(mode){
                    return false;
                },
                
			},
			card:{
			    "xjzh_card_lietiangong":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_lietiangong.png",
                    derivation:"xjzh_diablo_moruina",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    distance:{attackFrom:-3},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_siwangbingzhu":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_siwangbingzhu.png",
                    derivation:"xjzh_dnf_jianshen",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_guangjian",
                    skills:["xjzh_card_siwangbingzhu_skill"],
                    distance:{attackFrom:-2},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_mojianklls":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_mojianklls.png",
                    derivation:"xjzh_dnf_suodeluosi",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_jujian",
                    skills:["xjzh_card_mojianklls_skill"],
                    distance:{attackFrom:-2},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_julihjc":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_julihjc.png",
                    derivation:"xjzh_dnf_suodeluosi",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_dunqi",
                    skills:["xjzh_card_julihjc_skill"],
                    distance:{attackFrom:-1},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_tianjigyx":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_tianjigyx.png",
                    derivation:"xjzh_dnf_suodeluosi",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_guangjian",
                    skills:["xjzh_card_tianjigyx_skill"],
                    distance:{attackFrom:-3},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_guanshizhengzong":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanshizhengzong.png",
                    derivation:"xjzh_dnf_suodeluosi",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_taidao",
                    skills:["xjzh_card_guanshizhengzong_skill"],
                    distance:{attackFrom:-3},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
			    "xjzh_card_tiancongyunjian":{
					audio:"ext:仙家之魂/audio/card/",
					image:"ext:仙家之魂/image/cardpicture/xjzh_card_tiancongyunjian.png",
                    derivation:"xjzh_dnf_suodeluosi",
                    fullskin:true,
                    type:"equip",
                    subtype:"equip1",
                    subtype2:"xjzh_duanjian",
                    skills:["xjzh_card_tiancongyunjian_skill"],
                    //distance:{attackFrom:-1},
                    ai:{
                        basic:{
						    equipValue:3
					    }
			    	},
                },
                
			},
			skill:{
				//众星之魂
				"xjzh_zxzh_dianling":{
				    enable:"phaseUse",
				    filterTarget:function(card,player,target){
				        var history=target.getAllHistory('sourceDamage');
				        if(!history.length) return;
				        var history=history[0]['counting'];
				        return history>0;
				    },
				    selectTarget:function(){
				        return [1,_status.event.player.hp]
				    },
				    filter:function(event,player){
				        var count=game.countPlayer(function(current){
    				        var history=current.getAllHistory('sourceDamage');
    				        if(!history.length) return;
    				        var history=history[0]['counting'];
    				        return history>0;
				        });
				        return count>0;
				    },
				    content:function(){
				        "step 0"
    				    var list=[];
    				    for(var i=0;i<lib.inpile.length;i++){
                            var info=get.info({name:lib.inpile[i]});                
                            if(!info.enable) continue;
                            if(info.notarget) continue;
                            if(info.type!="basic"&&info.type!="trick") continue;
                            if(!player.canUse({name:lib.inpile[i]},target)) continue;
                            list.push([info.type,'',lib.inpile[i]]);
                            if(lib.inpile[i]=='sha'){
                                for(var j of lib.inpile_nature){
                                    list.push([info.type,'',lib.inpile[i],j]);
                                };
                            };
    				    }
    				    dialog=ui.create.dialog('〖点灵〗：请选择一张牌','hidden',[list,'vcard']);
    				    player.chooseButton(dialog);
                        "step 1"
                        if(result.links){
                            var links=result.links;
                            var card={name:links[0][2],nature:links[0][3],isCard:true};
                            player.useCard(card,target,false);
                            target.getHistory('sourceDamage').removeArray(target.getAllHistory('sourceDamage',evt=>{
                                return evt&&evt.counting;
                            })) 
                            /*var history=target.getAllHistory('sourceDamage');
                            for(var i of history){
                                for(var j in i){
                                    if(j=="counting") delete i[j];
                                }
                            }*/
                        }
				    },
				},
				"xjzh_zxzh_tusu":{
				    trigger:{
				        global:"damageBefore",
				    },
				    forced:true,
				    locked:true,
				    priority:Infinity,
				    firstDo:true,
				    filter:function(event,player){
				        if(event.numFixed||event.cancelled) return false;
				        return event.num>1;
				    },
				    content:function(){
				        if(trigger.source&&trigger.source==player) trigger.set("counting",trigger.num+1);
				        else if(!trigger.source||trigger.source!=player) trigger.set("counting",true);
				    },
				},
				"xjzh_zxzh_leifa":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:"phaseZhunbeiBegin",
					},
					direct:true,
					priority:-3,
					locked:true,
					/*prompt:function(event,player){
						return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
					},
					filter:function (event,player){
						return event.player!=player&&player.canCompare(event.player)&&!player.hasSkill('xjzh_zxzh_leifa1');
					},
					check:function (event,player){
						return ai.get.attitude(player,event.player)<0;
					},*/
					subSkill:{
					    off:{
					        mark:true,
					      	marktext:"雷",
					      	sub:true,
					      	intro:{
					      	    content:"失去<span style=\"color: gold\">雷法</span>直到回合开始",
					      	},
					    },
					},
					content:function (){
						'step 0'
						var num=player.countCards('h');
						player.draw(num);
						player.chooseToDiscard(num,'h',true);
						if(!player.canCompare(trigger.player)||player.hasSkill('xjzh_zxzh_leifa_off')||trigger.player==player){
						    event.finish();
						    return;
						}
						'step 1'
						player.chooseBool('〖雷法〗:是否对'+get.translation(trigger.player)+'发起拼点').set('ai',function(event,player){
						     if(get.attitude(player,trigger.player)>=0) return false;
						     return true;
						});
						'step 2'
						if(result.bool){
						    player.chooseToCompare(trigger.player);
						}else{
						    event.finish();
						}
						'step 3'
						if(result.bool){
						    game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
						    trigger.player.damage('thunder',player);
							trigger.player.addTempSkill('fengyin');
						}else{
							player.draw();
							player.addTempSkill('xjzh_zxzh_leifa_off',{player:'phaseBegin'});
						}
						'step 4'
						player.logSkill('xjzh_zxzh_leifa',trigger.player);
					},
				},
				//《金庸群侠传·杨过·暗魂》
				"xjzh_zxzh_jianxin":{
				    trigger:{
                        player:"damageAfter",
                        source:"damageAfter",
                    },
                    forced:true,
                    locked:true,
                    priority:-1,
					audio:"ext:仙家之魂/audio/skill:8",
                    filter:function(event,player){
                        if(player.hasSkill('xjzh_zxzh_jianxin_off')) return false;
                        return event.num>0&&event.source!=undefined;
                    },
                    subSkill:{off:{sub:true,},},
                    content:function(){
                        "step 0"
                        player.addTempSkill("xjzh_zxzh_jianxin_off","xjzh_zxzh_jianxinAfter");
                        if(!player.getEquip(1)) event.goto(1);
                        if(player.getEquip(1)){
                            var cards=player.getCards('e',function(card){
                                return get.subtype(card)=="equip1";
                            })
                            for(var i of cards){
                                var str=lib.translate[i.name]
                                if(str.indexOf('剑')!=-1){
                                    event.goto(2);
                                }
                            }
                        }
                        "step 1"
                        var card=get.cardPile(function(card){
                            var names=lib.translate[card.name]
                            return names.includes('剑');
				        });
                        player.useCard(card,player,false);
                        event.finish();
                        "step 2"
                        if(trigger.source==player){
                            var num=player.hp+trigger.num
                        }else{
                            var num=player.getDamagedHp()+trigger.num
                        }
                        var cards=get.cards(num),list=[];
                        player.showCards(cards);
                        game.cardsGotoOrdering(cards)
                        for(var i=0;i<cards.length; i++){
                            if(player.hasUseTarget(cards[i])&&get.tag(cards[i],'damage')) list.push(cards[i]);
                        }
                        event.list=list;
                        'step 3'
                        if(event.list.length&&event.list.length!=1){
                            var next=player.chooseCardButton('请选择要使用的牌',event.list);
                            next.set("filterButton",function(button){
                                var player=_status.event.player
                                return player.hasUseTarget(button.link,false);
                            });
                            next.set('ai',function(button){
                                return _status.event.player.getUseValue(button.link,false)
                            });
                        }else if(event.list.length==1){
                            if(player.hasUseTarget(event.list[0],false)){
                                event._result={bool:true,links:event.list};
                            }else{
                                event.finish();
                            }
                        }else{
                            event.finish();
                        }
                        'step 4'
                        if(result.bool){
                            event._result={bool:false};
                            event.using=result.links[0];
                            player.chooseUseTarget(event.using,false);
                        }else{
                            event.finish();
                        }
                        'step 5'
                        if(result&&result.bool){
                            event.list.remove(event.using);
                            if(event.list.length) event.goto(3);
                        }
                    },
                },
				"xjzh_zxzh_jiezhen":{
					trigger:{
					    global:"damageBegin1",
					},
					audio:"ext:仙家之魂/audio/skill:2",
					group:"xjzh_zxzh_jiezhen_zero",
					filter:function(event,player){
					    if(!player.inRange(event.player)) return false;
					    if(event.num<=0&&event.source==undefined) return false;
					    if(event.player==player) return false;
					    if(event.source==player){
					        return game.hasNature(event,'thunder');
					    }
					    return !game.hasNature(event);
					},
					forced:true,
					locked:true,
					priority:99,
					firstDo:true,
					usable:1,
					content:function(){
					    "step 0"
					    str=''
					    bool=false;
				        if(game.hasNature(trigger,'thunder')){
				            bool=true;
				            str+='〖结阵〗:是否代替'+get.translation(trigger.player)+'受到'+get.translation(trigger.num)+'点雷电伤害？';
				        }
				        else{
					        str+='〖结阵〗:是否代替'+get.translation(trigger.source)+'成为伤害来源？';
					    }
					    player.chooseBool(str).set("ai",function(event,player){
					        var att1=get.attitude(trigger.player,player)
				            var att2=get.attitude(trigger.source,player)
				            if(att1<0) return 0;
				            return 1.5;
				        });
					    "step 1"
					    if(result.bool){
					        if(bool){
					            trigger.player=player;
					        }else{
					            trigger.source=player;
					        }
					    }else{
					        player.getStat().skill.xjzh_zxzh_jiezhen-=1
					    }
				   	},
					subSkill:{
					    zero:{
					        trigger:{
					            player:"damageBegin1",
					        },
					        sub:true,
					        forced:true,
					        priority:100,
					        audio:"xjzh_zxzh_jiezhen",
					        filter:function(event,player){
					            return game.hasNature(event,"thunder");
					        },
					        content:function(){
					            trigger.changeToZero();
					        },
					        ai:{
					            nothunder:true,
					            effect:{
					                target:function(card,player,target){
					                    if(get.tag(card,'thunderDamage')) return [0,0];
					                },
				                },
				            },
				        },
				    },
				},
				"xjzh_zxzh_xunqing":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						global:"damageEnd",
					},
					priority:9,
					marktext:"情",
					intro:{
						name:"寻情",
						content:"每轮限3次，当前已发动#次",
					},
					group:["xjzh_zxzh_xunqing_clean","xjzh_zxzh_xunqing_fire"],
					filter:function (event,player){
						return game.hasNature(event,'thunder')&&player.countMark("xjzh_zxzh_xunqing")<3;
					},
					frequent:true,
					prompt:function(event,player){
						return "是否发动〖寻情〗令一名目标随机摸1-3张牌？";
					},
					content:function (){
						"step 0"
						player.chooseTarget(true,'〖寻情〗：选择一名角色令其随机摸至多1-3张牌或摸2张牌').set('ai',function(target){
							if(target.hasSkill('xjzh_sanguo_juejing')) return false;
							if(player.hasSkillTag('nogain')) return false;
							return get.attitude(player,target);
						});
						"step 1"
						if(result.bool){
							var num=[1,2,3].randomGet();
							var target=result.targets[0];
							if(target.name!="xjzh_zxzh_linziyan"){
								target.draw(num);
							}
							else{
								target.draw(num+1);
							}
							if(player.countMark("xjzh_zxzh_xunqing")<3) player.addMark("xjzh_zxzh_xunqing",1,false);
						}else{
						    player.draw(2);
						}
					},
					ai:{
						effect:{
							target:function (card,player,target,current){
								if(get.tag(card,'thunderdamage')) return [1,2];
							},
						},
					},
					subSkill:{
						"clean":{
							trigger:{
								global:"roundStart",
							},
							forced:true,
							popup:false,
							priority:99,
							sub:true,
							filter:function (event,player){
								return player.hasMark("xjzh_zxzh_xunqing");
							},
							content:function(){
								player.clearMark("xjzh_zxzh_xunqing");
							},
						},
						"fire":{
							trigger:{
								source:"damageBegin1",
								player:"damageBegin1",
							},
							forced:true,
							sub:true,
							priority:-3,
							popup:false,
							filter:function(event){
								return game.hasNature(event,'fire');
							},
							content:function(){
								game.setNature(trigger,'thunder',false);
							},
						},
					},
				},
				"xjzh_zxzh_xianghun":{
					forced:true,
					locked:true,
					group:["xjzh_zxzh_xianghun1","xjzh_zxzh_xianghun2"],
					ai:{
						maihp:true,
					},
				},
				"xjzh_zxzh_xianghun1":{
					audio:"ext:仙家之魂/audio/skill:2",
					enable:"phaseUse",
					usable:1,
					sub:true,
					filterCard:true,
					selectCard:1,
					filterTarget:false,
					selectTarget:false,
					prompt:function(event,player){
						return "是否弃置一张牌发动技能〖香魂〗";
					},
					filter:function (event,player){
						return player.countCards('h')>=1;
					},
					check:function(card){
						return 4-get.value(card);
					},
					content:function (){
						"step 0"
						var controls=[];
						if(player.isDamaged()) controls.push('恢复体力');
						controls.push('流失体力');
						if(controls.length){
							if(controls.length==1){
								event._result={
								bool:true,control:controls[0]};
							}
							else{
								player.chooseControl(controls,ui.create.dialog('请选择一项','hidden')).ai=function(){
									if(player.hp>=3) return '流失体力';
									if(player.hp<=2) return '恢复体力';
								};
							}
						}
						"step 1"
						if(result&&result.control){
							if(result.control=='恢复体力'){
								player.recover();
							}
							else{
								player.loseHp();
							}
						}
					},
					ai:{
						order:10,
						result:{
							player:function(player){
								var nh=player.num('h');
								if(nh==0) return 0;
								if(nh>=player.hp&&player.hp>=3) return 2;
								if(nh>=player.hp&&player.hp<3) return 1;
								return 0.5;
							},
						},
					}
				},
				"xjzh_zxzh_xianghun2":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:"loseHpEnd",
					},
					forced:true,
					sub:true,
					content:function (){
						"step 0"
						player.judge(function(card){
							return get.color(card)=='black'?1.5:-1;
						});
						"step 1"
						if(result.bool){
							player.chooseTarget('选择至多两个目标令其各受到一点雷电伤害',[1,2]).ai=function(target){
								return get.damageEffect(target,player,player,'thunder');
							};
						}
						else{
							player.chooseTarget('选择至多3个目标将其横置',[1,3]).ai=function(target){
								if(target.isLinked&&get.attitude(player,target)>0) return 1;
								if(!target.isLinked&&get.attitude(player,target)<0) return 1;
								return 0.5;
							}
							event.goto(3);
						}
						'step 2'
						if(result.bool){
							player.line(result.targets,'thunder');
							for(var i=0;i<result.targets.length;i++)
							result.targets[i].damage('thunder',player);
						}
						event.finish();
						'step 3'
						if(result.bool){
							player.line(result.targets,'thunder');
							for(var i=0;i<result.targets.length;i++){
								result.targets[i].link();
							}
						}
					},
				},
				"xjzh_zxzh_renxin":{
					forced:true,
					locked:true,
					group:["xjzh_zxzh_renxin1","xjzh_zxzh_renxin2","xjzh_zxzh_renxin3"],
				},
				"xjzh_zxzh_renxin1":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:"damageEnd",
					},
					forced:true,
					sub:true,
					priority:23,
					filter:function (event,player){
						return _status.currentPhase!=player&&player.hp<=1;
					},
					content:function (){
						"step 0"
						player.judge();
						player.$fullscreenpop('仁心所向','thunder');
						"step 1"
						switch(get.suit(result.card)){
							case 'heart':
							player.recover(player.maxHp-player.hp);
							player.draw();
							event.finish();
							break;
							case 'diamond':
							player.recover(1-player.hp);
							trigger.player.draw(3);
							event.finish();
							break;
							case 'club':
							trigger.source.link(true);
							trigger.source.chooseToDiscard('he',3,true);
							event.finish();
							break;
							case 'spade':
							trigger.source.damage(1,'thunder',player);
							event.goto(2);
							break;
						}
						"step 2"
						while(_status.event.name!='phase'){
							_status.event=_status.event.parent;
						}
						_status.event.finish();
						_status.event.untrigger(true);
					},
					ai:{
						expose:0.3,
					},
				},
				"xjzh_zxzh_renxin2":{
					trigger:{
						player:"recoverEnd",
					},
					sub:true,
					forced:true,
					filter:function (event,player){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].isDamaged()&&game.players[i]!=player) return true;
						}
					},
					content:function (){
						'step 0'
						player.chooseTarget(get.prompt('xjzh_zxzh_renxin'),[1,2],function(card,player,target){
							return player!=target&&target.isDamaged();
						})
						.set('ai',function(target){
							return get.attitude(player,target)>2&&target.isDamaged();
						});
						'step 1'
						if(result.bool){
							player.line(result.targets);
							for(var i=0;i<result.targets.length;i++)
							result.targets[i].recover();
						}
					},
				},
				"xjzh_zxzh_renxin3":{
					audio:"ext:仙家之魂/audio/skill:2",
					forced:true,
					trigger:{
						player:"damageBegin",
					},
					priority:21,
					sub:true,
					filter:function (event,player){
						return game.hasNature(event,'thunder')&&Math.random()<=0.7;
					},
					content:function (){
						player.logSkill('xjzh_zxzh_renxin3');
						game.log(player,'免疫了此次雷电伤害');
						player.say(['这是他教给我的术','我一直都记得你','这是你最擅长的雷法'].randomGet());
						trigger.untrigger();
						trigger.finish();
					},
					ai:{
						effect:{
							target:function (card,player,target,current){
								if(get.tag(card,'thunderDamage')) return [0.3,0.6];
								return [1,0];
							},
						},
					}
				},
				"xjzh_zxzh_yufeng":{
					trigger:{
						global:"damageBegin",
					},
					group:["xjzh_zxzh_yufeng_damage"],
					check:function (event,player){
						return get.attitude(player,event.player)<0;
					},
					prompt:function(event,player){
						return ""+get.translation(event.player)+"即将受到"+get.translation(event.source)+"造成的伤害，是否发动〖御风〗？";
					},
					usable:2,
					marktext:"风",
					intro:{
					    content:function(storage,player){
					        var str=player.storage.xjzh_zxzh_yufeng
					        return get.translation(str);
					    },
					},
					filter:function (event,player){
						return player.countCards("h")>0;
					},
					content:function (){
						"step 0"
						if(!player.storage.xjzh_zxzh_yufeng) player.storage.xjzh_zxzh_yufeng=[]
						player.chooseToDiscard('是否对'+get.translation(trigger.player)+'发动〖御风〗',function(card,player,target){
						    if(player.storage.xjzh_zxzh_yufeng.includes(get.type(card))) return false;
							return player.countCards('h')>0;
						}).set('ai',function(card){
							var player=_status.event.player,player=_status.event.getTrigger().player;
							var type=get.type(card,player),player;
							var previous=trigger.player.getPrevious();
							var next=trigger.player.getNext();
							var num=trigger.num
							var nature=trigger.nature
							switch(type){
								case 'basic': num++;
								break;
								case 'equip': num==0;
								break;
								case 'delay': nature="fire",previous.num++;
								break;
								case 'trick': nature="thunder",next.num++;
								break;
							}
							return -get.value(card);
						});
						"step 1"
						if(result.bool){
							switch(get.type(result.cards[0])){
								case 'basic':
								trigger.num++;
								player.storage.xjzh_zxzh_yufeng.add("basic");
								break;
								case 'equip':
								trigger.cancel();
								trigger.player.chooseToDiscard(2,"he",true);
								player.storage.xjzh_zxzh_yufeng.add("equip");
								break;
								case 'delay':
								if(!game.hasNature(trigger,'fire')){
									game.setNature(trigger,'fire',false)
								}
								var previous=trigger.player.getPrevious();
								previous.damage("thunder",trigger.source);
								player.storage.xjzh_zxzh_yufeng.add("delay");
								break;
								case 'trick':
								if(!game.hasNature(trigger,'thunder')){
									game.setNature(trigger,'thunder',false)
								}
								var next=trigger.player.getNext();
								next.damage("thunder",trigger.source);
								player.storage.xjzh_zxzh_yufeng.add("trick");
								break;
							}
						}
						"step 2"
						player.markSkill("xjzh_zxzh_yufeng");
						player.update();
					},
					subSkill:{
						"damage":{
						    trigger:{
						        global:["phaseAfter","phaseBefore"],
						    },
						    direct:true,
						    priority:-99,
						    sub:true,
						    content:function(){
						        delete player.storage.xjzh_zxzh_yufeng
						        player.unmarkSkill("xjzh_zxzh_yufeng");
						    },
						},
					}
				},
				//《金庸群侠传·绝郭靖·镇卫》
				"xjzh_zxzh_fengzhen":{
					trigger:{global:"useCard"},
					direct:true,
					priority:-5,
					filter:function(event,player){
						if(event.card.name=='sha'||event.card.name=='nanman'||event.card.name=='wanjian'){
							if(game.hasPlayer(function(current){
								if(!event.targets.includes(current))return false;
								return current.isEmpty(2);
							})
							)return player.countCards('he')>0;
						}
						return false;
					},
					content:function(){
						"step 0"
						var next=player.chooseCardTarget({
							position:'he',
							selectTarget:[1,Infinity],
							filterCard:lib.filter.cardDiscardable,
							filterTarget:function(card,player,target){
								var trigger=_status.event.getTrigger();
								if(!trigger.targets.includes(target))return false;
								return target.isEmpty(2);
								//!target.isDisabled(2);
							},
							ai1:function(card){
								return get.unuseful(card)+9;
							},
							ai2:function(target){
								var trigger=_status.event.getTrigger();
								//var bool1=get.tag(trigger.card,'respondSha')&&!target.hasSha();
								// var bool2=get.tag(trigger.card,'respondShan')&&!target.hasShan();
								//if(bool1||bool2)return get.attitude(_status.event.player,target);
								var att=get.attitude(_status.event.player,target);
								if(trigger.targets.length==1){
									if(trigger.card.name=='sha'&&trigger.card.nature=='fire'&&lib.inpile.includes('tengjia'))return -1;
									if(trigger.card.name=='sha'&&trigger.card.nature=='fire'&&lib.inpile.includes('jydiywuchanyi'))return -1;
									if(trigger.card.name=='sha'&&trigger.card.nature=='jy_du'&&lib.inpile.includes('jydiy_jingsibeixin'))return -1;
								}
								return att>0?att :0;
							},
							prompt:''+get.translation(trigger.targets)+'成为了'+get.translation(trigger.player)+''+get.translation(trigger.card)+'的目标',
							prompt2:'弃置一张牌，选择任意名目标直到此牌结算结束，你选择的角色视为装备一张防具牌',
						});
						"step 1"
						if(result.bool){
							player.logSkill('xjzh_zxzh_fengzhen',result.targets);
							event.targets=result.targets;
							player.discard(result.cards);
							var list=get.inpile(function(name){
								var card={
								name:name};
								var info=get.info(card);
								return info.type=='equip'&&info.subtype=='equip2'&&info.skills;
							});
							for(var i=0; i<list.length; i++){
								list[i]=['防具','',list[i]];
							}
							var att=get.attitude(player,result.targets[0])>0
							var dialog=ui.create.dialog('选择一张防具牌令你选择的角色视为装备该防具牌',[list,'vcard'],'hidden');
							player.chooseButton(dialog,true).set('ai',function(button){
								var player=_status.event.player;
								var aibool=_status.event.aibool;
								var cardx=_status.event.cardx;
								var triggerx=_status.event.triggerx;
								var name=button.link[2];
								if(aibool){
									if((cardx.name=='wanjian'||cardx.name=='nanman')&&(name=='tengjia'||name=='jydiywuchanyi'||name=='jydiy_jingsibeixin'))return 10;
									if(cardx.name=='sha'&&!cardx.nature&&(name=='tengjia'||name=='jydiywuchanyi'||name=='jydiy_jingsibeixin'))return 10;
									if(cardx.name=='sha'&&get.color(cardx)=='black'&&(name=='renwang'||name=='jydiybeidouzhen'))return 10;
									if(cardx.name=='sha'&&name=='jydiytaohuazhen_re')return 8;
									if(cardx.name=='sha'&&(name=='bagua'||'jydiytaohuazhen'))return 6;
									if(triggerx&&triggerx.baseDamage&&triggerx.baseDamage>1&&(name=='jydiy_ruanweijia_re'||name=='jydiy_ruanweijia'))return 5;
									if(triggerx&&triggerx.baseDamage&&triggerx.baseDamage>1&&name=='baiyin')return 4;
									return 0;
								}
								else{
									if(cardx.name=='sha'&&cardx.nature&&cardx.nature=='fire'&&(name=='tengjia'||name=='jydiywuchanyi'))return 10;
									if(cardx.name=='sha'&&cardx.nature&&cardx.nature=='jy_du'&&name=='jydiy_jingsibeixin')return 10;
									return 0;
								}
							})
							.set('aibool',att).set('cardx',trigger.card).set('triggerx',trigger);
						}
						else event.finish();
						"step 2"
						if(result.bool){
							var card=game.createCard(result.links[0][2],'','','');
							var skills=get.info(card).skills;
							skills=skills.slice(0);
							for(var i of event.targets){
								i.$gain2(card);
								for(var s of skills){
									i.addTempSkill(s,'useCardEnd');
								}
							}
						}
					},
				},
				//《金庸群侠传·庄聚贤·焚庄》
				"xjzh_zxzh_zonghuo":{
					skillAnimation:"epic",
					animationColor:"fire",
					animationStr:"烈焰焚天",
					enable:"phaseUse",
					filter:function(event,player){
						return !player.storage.xjzh_zxzh_zonghuo;
					},
					filterTarget:function(card,player,target){
						return player!=target;
					},
					unique:true,
					limited:true,
					selectTarget:-1,
					marktext:"焚",
					mark:true,
					multitarget:true,
					multiline:true,
					line:"fire",
					init:function(player){
						player.storage.xjzh_zxzh_zonghuo=false;
					},
					intro:{
						content:"limited",
					},
					content:function(){
						"step 0"
						player.chooseControl(['一','二'],function(event,player){
							if(player.hasSkillTag('nofire')) return '二';
							if(player.hp-2>0) return '二';
							return '一';
						})
						.set('prompt','请选择要造成的伤害');
						"step 1"
						event.onfire=result.control=='二'?2:1;
						player.damage('fire',event.onfire,player);
						player.storage.xjzh_zxzh_zonghuo=true;
						player.awakenSkill('xjzh_zxzh_zonghuo');
						event.num1=0;
						"step 2"
						if(event.num1<targets.length){
							if(targets[event.num1].countCards('e')&&player.isIn()){
								targets[event.num1].chooseBool('是否将装备区的牌交给'+get.translation(player)+'?否则受到'+get.translation(player)+(event.onfire==2?'二':'一')+'点火焰伤害').set('ai',function(evt,playerx){
									var num=evt.onfire;
									if(playerx.hasSkillTag('nofire')) return false;
									if(get.attitude(playerx,evt.player)>0) return true;
									if(playerx.countCards('e')==1) return true;
									if(playerx.hp-num>1) return true;
									return get.damageEffect(playerx,playerx,playerx,'fire')<0;
								});
							}
							else{
								targets[event.num1].damage('fire',event.onfire,player);
								event.num1++;
								event.redo();
							}
						}
						else{
							event.finish();
						}
						"step 3"
						if(result&&result.bool){
							targets[event.num1].$give(targets[event.num1].getCards('e'),player);
							player.gain(targets[event.num1].getCards('e'));
						}
						else{
							targets[event.num1].damage('fire',event.onfire,player);
							targets[event.num1].say(['此火乘风而来，燎原不绝！','此火焚尽一切，天地万物！'].randomGet())
						}
						event.num1++;
						event.goto(2);
					},
					ai:{
						order:1,
						result:{
							player:function(player){
								var num=0,players=game.filterPlayer();
								for(var i=0;i<players.length;i++){
									if(player!=players[i]&&get.damageEffect(players[i],player,players[i],'fire')<0){
										var att=get.attitude(player,players[i]);
										if(att>0&&!players[i].countCards('e')&&!players[i].hasSkillTag('nofire')){
											num-=1;
										}
										else if(att<0&&!players[i].hasSkillTag('nofire')){
											num+=1;
										}
									}
								}
								if(player.hasSkillTag('nofire')){
									return num;
								}
								else return num-1;
							},
						},
					},
				},
				"xjzh_zxzh_shoutao":{
					locked:true,
					forced:true,
					trigger:{
						player:["gainAfter"],
						global:"phaseZhunbeiBegin",
					},
					mod:{
						cardEnabled:function(card,player){
							if(card.name=='tao') return false;
						},
					},
					priority:-3,
					global:["xjzh_zxzh_shoutao_ai"],
					group:["xjzh_zxzh_shoutao_recover"],
					filter:function (event,player){
						if(event.name=="gain"){
							return event.cards&&event.cards.some(c=>c.name=='tao');
						}
						if(event.name=="phaseZhunbei"){
							return player.countCards("h",{name:"tao"});
						}
						return false;
					},
					content:function (){
						"step 0"
						if(trigger.name=="gain"){
							event.cards=trigger.cards.filter(c=>c.name=='tao');
						}
						else{
							var hs=player.getCards('h','tao');
							if(hs.length){
								player.discard(hs);
								player.draw(hs.length*2);
								player.addMark("xjzh_zxzh_taoyuan",hs.length);
							}
							event.finish();
						}
						"step 1"
						event.card=event.cards.pop();
						player.discard(event.card);
						"step 2"
						if(player.isDamaged()){
							player.recover();
						}
						else{
							player.draw(2,'nodelay');
							if(player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan',1,false);
							game.log(player,'将',event.card,'离开游戏');
							player.lose(event.card,ui.special,'toStorage');
						}
						"step 3"
						if(event.cards.length){
							event.goto(1);
						}
					},
					subSkill:{
						"recover":{
							forced:true,
							popup:false,
							sub:true,
							trigger:{
								global:"recoverAfter",
							},
							content:function (){
								if(trigger.player==player){
									if(!player.hasSkill("xjzh_zxzh_shoutao_jin")&&player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan',1,false);
								}
								else{
									if(player.isDamaged()){
										player.recover(trigger.num);
									}
									else{
										player.draw()
									}
								}
							},
						},
						"ai":{
						    ai:{
						        nosave:true,
						        skillTagFilter:function(player){
						            if(player.countCards("h","tao")) return false;
						        },
						    },
						},
					},
				},
				"xjzh_zxzh_taoyuan":{
					locked:true,
					forced:true,
					marktext:"桃",
					intro:{
						name:"桃源",
						content:"mark",
					},
					trigger:{
						player:"dying",
					},
					filter:function (event,player){
						return player.hasMark("xjzh_zxzh_taoyuan");
					},
					content:function (){
						"step 0"
						player.addTempSkill("xjzh_zxzh_shoutao_jin","recoverAfter");
						var num1=player.countMark("xjzh_zxzh_taoyuan");
						var num2=player.maxHp-player.hp;
						if(num1>num2){
							player.recover(num2);
							player.draw(num1-num2);
						}
						else{
							player.recover(num1);
						}
						"step 1"
						player.clearMark("xjzh_zxzh_taoyuan");
					},
				},
				"xjzh_zxzh_shoutao_jin":{
					sub:true,
				},
				"xjzh_zxzh_qiwu":{
					enable:"phaseUse",
					locked:true,
					usable:1,
					check:function (event,player){
						return player.hp>1||player.canSave(player);
					},
					content:function () {
						'step 0'
						player.loseHp();
						player.draw(2);
						event.targets=game.filterPlayer();
						event.targets.remove(player);
						event.targets.sortBySeat();
						player.line(event.targets,'green');
						event.gained=false;
						'step 1'
						event.target=event.targets.shift();
						event.target.draw();
						event.card=result[0];
						if(event.card.name=='tao'){
							player.gain(event.target,event.card,'visible','give');
							event.gained=true;
						}
						'step 2'
						if(event.targets.length){
							event.goto(1);
						}
					},
					ai:{
						order:12,
					},
				},
    			"xjzh_zxzh_leifax":{
    				trigger:{
    					global:"phaseUseBegin",
    				},
    				frequent:true,
    				locked:true,
    				charlotte:true,
    				priority:3,
    				superCharlotte:true,
    				xjzh_xinghunSkill:true,
    				mod:{
    					targetEnabled(card,player,target) {
    						if(player==target.storage.xjzh_zxzh_leifax_target) return false;
    					},
    				},
    				check(event,player){
    					return get.attitude(player,event.player)<0;
    				},
    				prompt(event,player){
    				    return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
    				},
    				filter(event,player){
    					return event.player!=player;
    				},
    				async content(event,trigger,player){
    					let cards=get.cards()[0];
    					await player.showCards(cards);
    					let suits=get.suit(cards);
    				    if(suits!="spade"){
    						const {result:{bool}}=await trigger.player.chooseToDiscard('请弃置一张花色为'+get.translation(suits)+'的牌，否则本回合内非锁定技失效',"h",1,{suit:suits}).set('ai',card=>{
    							if(["tao","wuzhong"].includes(card.name)) return 0;
    							return 8-get.value(card);
    						});
    						if(!bool){
    						    player.draw();
    						    trigger.player.addTempSkill("fengyin");
    						}
    					}else{
                            game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
    						trigger.player.damage(1,"thunder",player);
    						player.storage.xjzh_zxzh_leifax_target=trigger.player;
    						player.addTempSkill('xjzh_zxzh_leifax_target');
    					}
    				},
    				subSkill:{
    					"target":{
    						mark:'character',
    						onremove:true,
    						sub:true,
    						intro:{
    							content:'本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
    						},
    					},
    				},
    				ai:{
    					expose:0.5,
    				},
    			},
    			"xjzh_zxzh_leifax2":{
    				trigger:{
    					global:"phaseUseBegin",
    				},
    				frequent:true,
    				locked:true,
    				charlotte:true,
    				priority:3,
    				superCharlotte:true,
    				xjzh_xinghunSkill:true,
    				mod:{
    					targetEnabled(card,player,target) {
    						if(player==target.storage.xjzh_zxzh_leifax_target) return false;
    					},
    				},
    				check(event,player){
    					return get.attitude(player,event.player)<0;
    				},
    				prompt(event,player){
    				    return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
    				},
    				filter(event,player){
    					return event.player!=player;
    				},
    				async content(event,trigger,player){
    					let cards=get.cards()[0];
    					await player.showCards(cards);
    					let suits=get.suit(cards);
    				    if(suits!="spade"){
    						const {result:{bool}}=await trigger.player.chooseToDiscard('请弃置两张花色为'+get.translation(suits)+'的牌，否则本回合内非锁定技失效',"h",2,{suit:suits}).set('ai',card=>{
    							if(["tao","wuzhong"].includes(card.name)) return 0;
    							return 8-get.value(card);
    						});
    						if(!bool){
    						    player.draw();
    						    trigger.player.addTempSkill("baiban");
    						}
    					}else{
                            game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
    						trigger.source.damage(2,"thunder",player);
    						player.storage.xjzh_zxzh_leifax_target=trigger.player;
    						player.addTempSkill('xjzh_zxzh_leifax_target');
    					}
    				},
    				subSkill:{
    					"target":{
    						mark:'character',
    						onremove:true,
    						sub:true,
    						intro:{
    							content:'本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
    						},
    					},
    				},
    				ai:{
    					expose:0.5,
    				},
    			},
    			//《血色衣冠·朱棣·盛威》
    			"xjzh_zxzh_leiyu":{
    				forced:true,
    				locked:true,
    				priority:69,
    				group:["xjzh_zxzh_leiyu_unmark","xjzh_zxzh_leiyu_change"],
    				trigger:{
    					player:"phaseBegin",
    					global:"gameDrawBegin",
    				},
    				mod:{
    					suit:function (card,suit){
    						let player=get.player();
    						if(!player||!player.storage.xjzh_zxzh_leiyu) return;
    						return player.storage.xjzh_zxzh_leiyu;
    					},
    				},
    				intro:{
    					content:function (content,player){
    						var str=get.translation(player.storage.xjzh_zxzh_leiyu);
    						return '你所有牌花色均视为：'+str;
    					},
    				},
    				marktext:"雷",
    				content:function(){
    					'step 0'
    					player.chooseControl(lib.suit).set('prompt','请选择一种花色').set('ai',function(){
    						return lib.suit.randomGet();
    					});
    					'step 1'
    					var suit=result.control;
    					player.chat(get.translation(suit+2));
    					game.log(player,'选择了','#y'+get.translation(suit+2));
    					player.storage.xjzh_zxzh_leiyu=true;
    					player.storage['xjzh_zxzh_leiyu']=result.control;
    					player.storage.xjzh_zxzh_leiyu_unmark=result.control;
    					player.markSkill('xjzh_zxzh_leiyu');
    				},
    				subSkill:{
    					"unmark":{
    						trigger:{
    							player:"phaseBegin",
    						},
    						sub:true,
    						priority:70,
    						forced:true,
    						filter:function (event, player) {
    							var player=_status.event.player;
    							return _status.event.player=player&&get.suit(event.card,player)==player.storage.xjzh_zxzh_leiyu;
    							;
    						},
    						content:function () {
    							player.storage.xjzh_zxzh_leiyu=false;
    							player.unmarkSkill('xjzh_zxzh_leiyu');
    							delete player.storage['xjzh_zxzh_leiyu'];
    							delete player.storage.xjzh_zxzh_leiyu_unmark;
    						},
    					},
    					"change":{
    						trigger:{
    							target:"useCardToTargeted",
    						},
    						sub:true,
    						priority:70,
    						forced:true,
    						filter:function (event,player){
    							return get.suit(event.card)==player.storage.xjzh_zxzh_leiyu;
    						},
    						content:function () {
    							player.draw();
    						},
    					},
    				},
    			},
    			"xjzh_zxzh_tianxin":{
    				enable:"phaseUse",
    				async content(event,trigger,player){
    					let cards=get.cards(player.hp);
    					await player.showCards(cards);
    					let num=0;
    					let num2=0;
    					for await(let card of cards){
    					    if(get.suit(card)=='spade') num++;
    					    else num2++;
    					}
    					await game.cardsDiscard(cards);
    					if(num>=num2){
        					const {result:{bool,targets}}=await player.chooseTarget('请选择〖天心〗的目标',lib.filter.notMe).set('ai',target=>{
        						var att=get.attitude(_status.event.player,target);
        						if(att<0) return -att;
        						if(att==0) return Math.random();
        						return att;
        					});
        					if(bool){
        					    var target=targets[0];
                                game.xjzh_playEffect("xjzh_skillEffect_leiji",target);
        						target.damage(num,player,"thunder","nocard");
        						player.removeSkill('xjzh_zxzh_tianxin');
        						player.removeSkill('xjzh_zxzh_leifax');
        						player.addSkill("xjzh_zxzh_leifax2");
        					}
    					}else{
        				    game.xjzh_playEffect("xjzh_skillEffect_leiji2",player);
        					await player.damage(1,player,"thunder","nocard");
        					await player.draw(player.getDamagedHp(true));
    					}
    				},
    				ai:{
    					order:2,
    					expose:0.8,
    					result:{
    					    player(card,player,target){
    					        return player.hp>2;
    					    },
    					},
    				},
    			},
				"xjzh_zxzh_cangjian":{
					trigger:{
						global:"gameStart",
					},
					marktext:"剑",
					intro:{
						markcount:"expansion",
						mark:function(dialog,content,player){
							var content=player.getExpansions('xjzh_zxzh_cangjian');
							if(content&&content.length){
								if(player==game.me||player.isUnderControl()){
									dialog.addAuto(content);
								}
								else{
									return '共有'+get.cnNumber(content.length)+'把剑';
								}
							}
						},
						content:function(content,player){
							var content=player.getExpansions('xjzh_zxzh_cangjian');
							if(content&&content.length){
								if(player==game.me||player.isUnderControl()){
									return get.translation(content);
								}
								return '共有'+get.cnNumber(content.length)+'把剑';
							}
						}
					},
					forced:true,
					locked:true,
					unique:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
				    onremove:function(player,skill){
					    var cards=player.getExpansions(skill);
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
					group:["xjzh_zxzh_cangjian_discard","xjzh_zxzh_cangjian_use"],
					content:function (){
						var list=[]
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
								list.add(ui.cardPile.childNodes[i]);
							}
						}
						if(list.length){
						    var num=get.rand(5,9);
						    var cards=list.randomGets(num)
							player.addToExpansion(cards,player,'draw').gaintag.add('xjzh_zxzh_cangjian');
						}
					},
					subSkill:{
						"discard":{
							trigger:{
								player:"phaseAfter",
							},
							sub:true,
							direct:true,
							filter:function(event,player){
						        if(player.isDisabled(1)) return false;
						        return true;
						    },
							content:function(){
								"step 0"
								event.num=[]
								if(player.getEquip(1)){
									var cardx=player.getEquip(1);
									var numx=get.rand(ui.cardPile.childElementCount);
									var next=player.lose(cardx,ui.cardPile);
									next.set('forceDie',true);
									next.set('insert_index_card',ui.cardPile.childNodes[numx]);
									next.set('insert_index',function(event){
                                        return event.insert_index_card;
                                    });
									event.num=1;
								}else{
									if(player.getExpansions('xjzh_zxzh_cangjian').length){
										if(player.getExpansions('xjzh_zxzh_cangjian').length<2){
											event.num=1
										}
										else{
											event.num=2
										}
										player.chooseCardButton(event.num,"选择两张武器牌将其置入牌堆",player.getExpansions('xjzh_zxzh_cangjian'),true);
									}else{
										event.goto(3);
									}
								}
								"step 1"
								if(result.bool){
									for(var i=0;i<result.links.length;i++){
										player.getExpansions('xjzh_zxzh_cangjian').removeArray(result.links[i]);
										var num=get.rand(ui.cardPile.childElementCount);
										ui.cardPile.insertBefore(result.links[i],ui.cardPile.childNodes[num]);
										/*player.lose(result.links[i],ui.ordering);
										ui.cardPile.insertBefore(result.links[i],ui.cardPile.firstChild);*/
									}
								}
								/*"step 2"
								event.list=[]
								for(var i=0;i<ui.cardPile.childNodes.length;i++){
								event.list.add(ui.cardPile.childNodes[i]);
								}
								"step 3"
								if(event.list&&event.list.length){
								event.cards=event.list;
								event.cards.randomSort();
								game.cardsGotoSpecial(event.cards);
								game.log(player,"将牌堆的牌序打乱了");
								}
								else{
								event.goto(5);
								}
								"step 4"
								for(var x of event.cards){
								x.fix();
								ui.cardPile.insertBefore(x,ui.cardPile.firstChild);
								}
								"step 5"*/
								"step 2"
								player.draw(event.num);
								"step 3"
								if(player.getExpansions('xjzh_zxzh_cangjian').length==0){
									if(!player.isDisabled('equip1')) player.disableEquip('equip1');
								}
								"step 4"
								game.updateRoundNumber();
							},
						},
					},
				},
				"xjzh_zxzh_cangjian_use":{
					enable:"phaseUse",
					sub:true,
					usable:2,
					filter:function(event,player){
						return player.getExpansions('xjzh_zxzh_cangjian').length;
					},
					content:function(){
						"step 0"
						player.chooseCardButton("选择并装备一张武器牌",player.getExpansions('xjzh_zxzh_cangjian'));
						"step 1"
						if(result.bool){
							for(var i=0;i<result.links.length;i++){
								player.getExpansions('xjzh_zxzh_cangjian').removeArray(result.links[i]);
							}
							game.delayx();
							player.useCard(result.links[0],player);
						}
					},
					ai:{
						order:10,
						result:{
							player:function(player,target){
							    var cards=player.getEquip(1);
							    if(!cards) return;
							    var num=0
							    var cards2=player.getExpansions('xjzh_zxzh_cangjian');
							    for(var i=0;i<cards2.length;i++){
							        if(get.useful(cards2[i])>get.useful(cards)) num++
							    }
							    return num;
							},
						},
					},
				},
				'xjzh_zxzh_yangjian_off':{sub:true,},
				"xjzh_zxzh_yangjian":{
					enable:"phaseUse",
					mod:{
						ignoredHandcard:function(card,player,bool){
							if(card.hasGaintag('xjzh_zxzh_yangjian')) return true;
						},
						aiValue:function(player,card,num){
							if(card.hasGaintag('xjzh_zxzh_yangjian')) return 9.5;
						},
					},
					mark:true,
					marktext:"胎",
					intro:{
						mark:function (dialog,content,player){
							var num=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip1').length;
							return `剩余${get.cnNumber(num)}张武器牌`;
						},
						markcount:function (storage,player){
							var num=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip1').length;
							return num;
						},
					},
					prompt:function(event,player){
					    return "〖养剑〗:弃置任意“剑胎”获得武器牌上的技能直到当前回合结束";
					},
					filterCard:function(card,player,target){
						return card.hasGaintag('xjzh_zxzh_yangjian');
					},
					filter:function(event,player){
						if(player.countCards("h",function(card){
							return card.hasGaintag('xjzh_zxzh_yangjian');
						})<=0) return false;
						return true;
					},
					group:["xjzh_zxzh_yangjian2"],
					selectCard:[1,Infinity],
					content:function(){
						"step 0"
						for(var i=0;i<cards.length;i++){
							var card=game.createCard(cards[i]);
							var skills=get.info(card).skills;
							skills=skills.slice(0);
							for(var j of skills){
								player.$gain2(card);
								player.addTempSkill(j);
							}
						}
						"step 1"
						player.addTempSkill("xjzh_zxzh_yangjian_off")
					},
				},
				"xjzh_zxzh_yangjian2":{
					trigger:{
						player:["phaseZhunbeiBegin","damageEnd"],
					},
					forced:true,
					filter:function(event,player){
						var list=[]
						for(var i=0;i<ui.cardPile.childNodes.length;i++){
							if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
								list.add(ui.cardPile.childNodes[i]);
							}
						}
						if(player.isDisabled(1)&&list.length>0) return true;
						return false;
					},
					content:function(){
						"step 0"
						event.num=0
						"step 1"
						var card=get.cardPile(function(card){
							return get.subtype(card)=='equip1';
						});
						if(card){
							player.gain(card,'gain2').gaintag.add('xjzh_zxzh_yangjian');
							game.log(player,'从牌堆获得了',card);
							event.num++
						}
						"step 2"
						if(event.num<2){
							var list=[]
							for(var i=0;i<ui.cardPile.childNodes.length;i++){
								if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
									list.add(ui.cardPile.childNodes[i]);
								}
							}
							if(list.length>0) event.goto(1);
						}
					},
				},
				"xjzh_zxzh_yujian":{
				    mod:{
				        aiValue:function(player,card,num){
							if(card.hasGaintag('xjzh_zxzh_yangjian')) return 10;
						},
				    },
					enable:["chooseToUse","chooseToRespond"],
					group:["xjzh_zxzh_yujian2"],
					filter:function(event,player){
					    if(player.hasSkill('xjzh_zxzh_yangjian_off')) return false;
						if(player.countCards("h",function(card){
							return card.hasGaintag('xjzh_zxzh_yangjian');
						})<=0) return false;
						for(var i of lib.inpile){
							if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
							var type=get.type(i);
							if((type=='basic'||type=='trick')&&event.filterCard({name:i},player,event)) return true;
							if(i=='sha'){
								for(var j of lib.inpile_nature){
									if(event.filterCard({name:i,nature:j},player,event)) return true;
								}
							}
						}
						return false;
					},
					chooseButton:{
						dialog:function (event,player){
							var list1=[], list1Tag;
							var list2=[], list2Tag;
							for(var i of lib.inpile){
								if(!lib.translate[i+'_info']) continue;
								if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
								var type=get.type(i);
								if(type=='basic'){
									list1.push([type,'',i]);
									if(event.filterCard({name:i},player,event)) list1Tag=true;
									if(i=='sha'){
										for (var j of lib.inpile_nature) list1.push([type,'',i,j]);
									}
								}
								if(type=='trick'){
									list2.push([type,'',i]);
									if(event.filterCard({name:i},player,event)) list2Tag=true;
								}
							}
							var dialog=ui.create.dialog('hidden');
							if(list1Tag){
								dialog.add('基本牌');
								dialog.add([list1,'vcard']);
							}
							if(list2Tag){
								dialog.add('锦囊牌');
								dialog.add([list2,'vcard']);
							}
							return dialog;
						},
						filter:function(button,player){
							var evt=_status.event.getParent();
							return evt.filterCard({name:button.link[2],nature:button.link[3]},player,evt);
						},
						check:function(button){
							var player=_status.event.player;
							if(player.countCards("h",button.link[2],function(card){
								return card.hasGaintag('xjzh_zxzh_yangjian');
							})>0) return 0;
							if(button.link[2]=='wugu') return 0;
							var effect=player.getUseValue(button.link[2]);
							if(effect>0) return effect;
							return 0;
						},
						backup:function (links,player){
							return{
								filterCard:function(card){
									var pos=get.position(card);
									if(pos=='h'&&card.hasGaintag('xjzh_zxzh_yangjian')) return true;
									return false;
								},
								selectCard:1,
								popname:true,
								viewAs:{
									name:links[0][2],
									nature:links[0][3],
								},
							}
						},
						prompt:function (links, player) {
							return '将一张“剑胎”牌当作'+get.translation(links[0][2])+'使用或打出';
						},
					},
				},
				"xjzh_zxzh_yujian2":{
					enable:['chooseToUse','chooseToRespond'],
					prompt:function(){
						return '将1张“剑胎”当作无懈可击使用';
					},
					position:'hs',
					sub:true,
					check:function(card,event){
						if(_status.event.player.hp>1) return 0;
						return 7-get.value(card);
					},
					selectCard:1,
					viewAs:{name:'wuxie'},
					viewAsFilter:function(player){
					    if(player.hasSkill('xjzh_zxzh_yangjian_off')) return false;
						return player.countCards("h",function(card){
							return card.hasGaintag('xjzh_zxzh_yangjian');
						})>0;
					},
					filterCard:function(card){
						var pos=get.position(card);
						if(pos=='h'&&card.hasGaintag('xjzh_zxzh_yangjian')) return true;
						return false;
					},
					precontent:function(){
                        game.playAudio('card',sex,card.name);
                    },
				},
				"xjzh_zxzh_shiqiao":{
					trigger:{
					    global:['loseAfter', 'cardsDiscardAfter'],
					},
					filter:function(event,player){
					    return event.cards&&event.cards.filter(function(card){
					        return get.position(card,true)=='d';
					    }).length>0;
					},
					direct:true,
					locked:true,
					priority:6,
					init:function(player){
					    var num=get.rand(1,5);
					    if(!player.storage.xjzh_zxzh_shiqiao) player.storage.xjzh_zxzh_shiqiao=[]
					    while(player.storage.xjzh_zxzh_shiqiao.length<num){
					        var num2=get.rand(1,13);
					        if(!player.storage.xjzh_zxzh_shiqiao.includes(num2)) player.storage.xjzh_zxzh_shiqiao.push(num2);
					    }
					},
					mark:true,
					marktext:"樵",
					intro: {
                        markcount:function(storage,player){
                            if(!player.storage.xjzh_zxzh_shiqiao||!player.storage.xjzh_zxzh_shiqiao.length) return;
                            return player.storage.xjzh_zxzh_shiqiao.length;
                        },
                        content:function(storage,player){
                            var storage=player.storage.xjzh_zxzh_shiqiao;
                            var str="已记录点数：";
                            for(var i=0;i<storage.length;i++){
                                if(storage[i]!=storage[storage.length-1]){
                                    str+=""+get.translation(storage[i])+"、";
                                }else{
                                    str+=""+get.translation(storage[i])+"";
                                }
                            }
                            return str;
                        },
					},
					mod:{
					    aiOrder:function(player,card,num){
                            if(!player.storage.xjzh_zxzh_shiqiao) return;
                            var list=player.storage.xjzh_zxzh_shiqiao.slice(0);
                            if(get.number(card)==list[0]) return num+3.5;
                        },
                    },
					content:function(){
					    var cards=trigger.cards
					    while(cards.length){
					        var card=cards.pop().fix();
                            ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                            var number=get.number(card);
                            if(player.storage.xjzh_zxzh_shiqiao[0]==number){
                                var card2=get.cardPile(function(cardx){
								    return get.number(cardx)!=number;
							    });
							    if(card2){
							    	player.gain(card2,player,"draw");
							    }
							    player.storage.xjzh_zxzh_shiqiao.remove(player.storage.xjzh_zxzh_shiqiao[0]);
							    if(player.storage.xjzh_zxzh_shiqiao.length==0){
							        lib.skill.xjzh_zxzh_shiqiao.init(player);
							    }
                            }
					    }
					},
				},
				"xjzh_zxzh_baoxin":{
					trigger:{
					    player:['phaseDrawBegin','phaseJieshuBegin'],
					},
					filter:function(event,player){
					    if(!player.storage.xjzh_zxzh_shiqiao||!player.storage.xjzh_zxzh_shiqiao.length) return false;
					    if(event.name=="phaseDraw"){
					        return !event.cancelled&&!event.skiped;
					    }
					    return event.name=="phaseJieshu";
					},
					direct:true,
					locked:true,
					priority:6,
					group:["xjzh_zxzh_baoxin_use"],
					content:function(){
					    var list=[];
					    var list2=[];
					    while(list.length<13){
					        var cardPilex=Array.from(ui.cardPile.childNodes);
				    	    var cards=cardPilex.randomGet()
				    	    list.push(cards);
				    	    cardPilex.remove(cards);
					    };
					    player.showCards(list);
					    var storage=player.storage.xjzh_zxzh_shiqiao.slice(0);
					    for(var i of list){
					        if(storage.includes(get.number(i))){
					            list.remove(i);
					            list2.push(i);
					        }
					    }
					    var str="";
					    if(trigger.name=="phaseDraw"){
					        str+="跳过了摸牌阶段";
					    }
					    if(list2.length){
					        player.gain(list2,player,"draw")._triggered=null;
					        str+="摸了"+list2.length+"张牌";
					        game.log(player,str);
					    }else{
					        if(trigger.name=="phaseDraw") str+="但";
					        str+="并没有摸到牌";
					        game.log(player,str);
					    }
					    game.cardsDiscard(list);
					    if(trigger.name=="phaseDraw") trigger.cancel();
					},
					subSkill:{
					    "use":{
					        trigger:{
					            player:"useCard",
					        },
					        sub:true,
					        prompt:function(event,player){
					            var str=`移除点数${get.number(event.cards[0])}摸两张牌或令${get.translation(event.cards[0])}额外结算一次`;
					            return str;
					        },
					        check:function(event,player){return 1;},
					        filter:function(event,player){
					            if(!player.storage.xjzh_zxzh_shiqiao||!player.storage.xjzh_zxzh_shiqiao.length) return false;
					            var storage=player.storage.xjzh_zxzh_shiqiao.slice(0);
					            if(!event.cards||!event.cards.length) return false;
					            if(!storage.includes(get.number(event.cards[0]))) return false;
					            //if(!event.isFirstTarget) return false;
					            if(event.getParent().name=="xjzh_zxzh_baoxin_use") return false 
					            if(get.type(event.cards[0])=="equip"||get.type(event.cards[0])=="delay") return false;
					            return true;
					        },
					        content:function(){
					            "step 0"
				                var controlList=[
				                    `移除点数${get.number(trigger.cards[0])}摸两张牌`,
						            `移除点数${get.number(trigger.cards[0])}令${get.translation(trigger.cards[0])}额外结算一次`,
				                ]
				                player.chooseControlList(get.prompt(event.name,player),controlList).set('ai',function(){
				                    var player=_status.event.player
				                    if(player.countCards('h')<=1) return 0;
				                    return 1;
				                });
				                "step 1"
				                if(result.index==0){
				                    player.storage.xjzh_zxzh_shiqiao.remove(get.number(trigger.cards[0]));
				                    player.draw(2);
				                }
				                else if(result.index==1){
				                    player.storage.xjzh_zxzh_shiqiao.remove(get.number(trigger.cards[0]));
				                    trigger.targets.push(trigger.targets[0]);
				                }
					        },
					    },
					},
				},
				"xjzh_zxzh_moyu":{
				    trigger:{
				        player:"phaseZhunbeiBegin",
				    },
				    check(event,player){return 1;},
				    prompt:"〖默语〗：是否进行一次判定？",
			        async content(event,trigger,player){
						const judgeEvent=await player.judge(card=>{
							if(get.suit(card)=='heart') return 2;
							if(get.suit(card)=='spade') return 1;
							return -1;
						});
						judgeEvent.judge2=result=>result.bool;
						const {result:{judge}}=await judgeEvent;
						if(judge<0) return;
						switch(judge){
							case 2:
								var text="〖默语〗：选择一名角色与其交换体力值与体力上限";
								var num=1;
							break;
							case 1:
								var text="〖默语〗：选择两名角色令其交换技能";
								var num=2;
							break;
						};
						const targets=await player.chooseTarget(text,num,function(card,player,target){
							if(num==1) return target!=player;
							return true;
						}).set('ai',function(target){
							let att=get.attitude(player,target);
							let judge=judgeEvent;
							if(judge==2){
								if(att<0) return target.maxHp>player.maxHp||target.hp>player.hp;
								if(att>0) return 0.5;
							}else{
								return 0.5;
							}
						}).set('num',num).forResultTargets();
						if(targets){
							if(targets.length>1){
								let skills=targets[0].getSkills(null,false,false).filter(skill=>{
									let info=get.info(skill);
									if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
									return true;
								});
								let skills2=targets[1].getSkills(null,false,false).filter(skill=>{
									let info=get.info(skill);
									if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
									return true;
								});
								targets[0].changeSkills(skills2,skills);
								targets[1].changeSkills(skills,skills2);
							}else{
								player.swapMaxHp(targets[0]);
							}
						}
				    },
				},
				"xjzh_zxzh_zhenwen":{
				    trigger:{
				        global:"changeSkillsEnd",
				    },
				    usable(player){
				        return game.roundNumber;
				    },
				    prompt(event,player){
				        let str="〖真纹〗："
						let skills=event.addSkill;
						let skillsLocked=skills.filter(skill=>{
							return get.is.locked(skill);
						});
						let skillsnoLocked=skills.filter(skill=>{
							return !get.is.locked(skill);
						});
				        str+=`是否令${get.translation(event.player)}失去${skills.map(i=>{
							return '【' + get.translation(i) + '】';
						})}`;
						if(skillsnoLocked.length) str+=`然后你获得技能${skillsnoLocked.map(i=>{
							return '【' + get.translation(i) + '】';
						})}`;
						if(skillsLocked.length) str+=`并摸${skillsnoLocked.length*2}张牌`;
				        return str;
				    },
				    filter(event,player){
						if(!event.addSkill.length) return false;
				        if(event.getParent().name=="chooseCharacter") return false;
				        if(event.getParent("xjzh_zxzh_zhenwen").name=="xjzh_zxzh_zhenwen") return false;
						let skills=event.addSkill.slice(0).filter(skill=>{
							let info=get.info(skill);
							if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
							if(lib.skill.global.includes(skill)) return false;
							if(player.getStockSkills().includes(skill)) return false;
							return true;
						});
						if(!skills.length) return false;
				        return true;
				    },
			        async content(event,trigger,player){
				        let skills=trigger.addSkill.slice(0);
						skills.forEach(skill=>{
							if(get.is.locked(skill)){
								trigger.player.removeSkill(skill,true)
								trigger.player.draw(2);
							}else{
								trigger.player.removeSkill(skill,true);
								player.addSkillLog(skill);
							}
						});
				    },
				},
				"xjzh_zxzh_jinyan":{
				    trigger:{
				        global:"$logSkill",
				    },
				    prompt:function(event,player){
				        var str="〖禁言〗：是否禁用"+get.translation(event.player)+"的技能"+get.translation(event.skill)+"直到下个回合开始？";
				        return str;
				    },
				    usable:1,
				    filter:function(event,player){
				        if(event.getParent().name=="chooseCharacter") return false;
				        if(event.getParent("xjzh_zxzh_jinyan").name=="xjzh_zxzh_jinyan") return false;
				        var info=get.info(event.skill)
				        if(!info||!lib.translate[event.skill]||lib.translate[event.skill]==''||!lib.translate[event.skill+'_info']||lib.translate[event.skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub||info.juexingji||info.dutySkill||info.limited) return false;
				        if(lib.skill.global.includes(event.skill)) return false;
				        if(event.player==player) return false;
				        return true;
				    },
				    check:function(event,player){
				        var att=get.attitude(player,event.player);
				        return -att;
				    },
				    content:function(){
				        if(!trigger.player.storage.xjzh_zxzh_jinyan_nouse) trigger.player.storage.xjzh_zxzh_jinyan_nouse=[]
				        trigger.player.storage.xjzh_zxzh_jinyan_nouse.push(trigger.skill);
				        trigger.player.addTempSkill("xjzh_zxzh_jinyan_nouse",{player:"phaseBefore"});
				        game.log(trigger.player,"的技能〖"+get.translation(trigger.skill)+"〗因","#g〖禁言〗","被禁用")
				    },
				    subSkill:{
				        "nouse":{
				            init:function(player,skill){
						        player.addSkillBlocker(skill);
						    },
						    onremove:function(player,skill){
						        player.removeSkillBlocker(skill);
						        if(player.storage.xjzh_zxzh_jinyan_nouse) delete player.storage.xjzh_zxzh_jinyan_nouse
						    },
						    skillBlocker:function(skill,player){
						        if(!player.storage.xjzh_zxzh_jinyan_nouse.includes(skill)) return false;
						        return true;
						    },
				        },
				    },
				},
				
				//流放之路
				//升华职业选择技能
				"xjzh_poe_choice":{
					trigger:{
						player:'enterGame',
						global:'gameStart',
					},
					silent:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					unique:true,
					firstDo:true,
					priority:Infinity,
					filter:function (event,player){
						if(!lib.config.extension_仙家之魂_poelose) return false;
						var skills1=lib.character[player.name][3];
						skills1=skills1.filter(s=>player.hasSkill(s));
						if (skills1.includes('xjzh_poe_choice')&&skills1.length>4) return true;
						if (player.name2){
							var skills2=lib.character[player.name2][3];
							skills2=skills2.filter(s=>player.hasSkill(s));
							if(skills2.includes('xjzh_poe_choice')&&skills2.length>4) return true;
						}
						return false;
					},
					content:function (){
						'step 0'
						var skills=lib.character[player.name][3];
						var pName=player.name;
						if(!skills.includes(event.name)) {
							skills=lib.character[player.name2][3];
							pName=player.name2;
						}
						skills=skills.filter(s=>s!=event.name&&player.hasSkill(s));
						var num=skills.length-4;
						event.num=num;
						if(!num){
							event.finish();
							return;
						}
						if(player.isUnderControl()){
							game.swapPlayerAuto(player);
						}
						var switchToAuto=function(){
							_status.imchoosing=false;
							event._result={
								bool:true,
								skills:skills.randomGets(num),
							};
							if(event.dialog) event.dialog.close();
							if(event.control) event.control.close();
						};
						var chooseButton=function (pName,skills){
							var event=_status.event;
							if(!event._result) event._result={};
							event._result.skills=[];
							var rSkill=event._result.skills;
							var dialog=ui.create.dialog(`请选择${get.cnNumber(num)}个技能失去`,[[pName],'character'],'hidden');
							event.dialog=dialog;
							var table=document.createElement('div');
							table.classList.add('add-setting');
							table.style.margin='0';
							table.style.width='100%';
							table.style.position='relative';
							for (var i=0;i<skills.length;i++){
								var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
								td.link=skills[i];
								table.appendChild(td);
								td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
								td.addEventListener(lib.config.touchscreen?'touchend':'click',function (){
									if(_status.dragged) return;
									if(_status.justdragged) return;
									_status.tempNoButton=true;
									setTimeout(function(){
										_status.tempNoButton=false;
									},
									500);
									var link=this.link;
									if (!this.classList.contains('bluebg')){
										if (rSkill.length>=event.num) return;
										rSkill.add(link);
										this.classList.add('bluebg');
									}
									else {
										this.classList.remove('bluebg');
										rSkill.remove(link);
									}
								});
							}
							dialog.content.appendChild(table);
							dialog.add('');
							dialog.open();
							event.switchToAuto=function(){
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							};
							event.control=ui.create.control('ok',function(link){
								if(rSkill.length!==event.num) return;
								event.dialog.close();
								event.control.close();
								game.resume();
								_status.imchoosing=false;
							});
							for (var i=0;i<event.dialog.buttons.length;i++){
								event.dialog.buttons[i].classList.add('selectable');
							}
							game.pause();
							game.countChoose();
						};
						if(event.isMine()){
							chooseButton(pName,skills);
						}
						else if(event.isOnline()){
							event.player.send(chooseButton,pName,skills);
							event.player.wait();
							game.pause();
						}
						else{
							switchToAuto();
						}
						'step 1'
						var map=event.result||result;
						if(map&&map.skills){
							for(var skill of map.skills){
								player.popup(skill);
								player.removeSkill(skill);
							}
						}
					},
				},
				//普通武将选择技能
				"xjzh_poe_choice2":{
					silent:true,
					trigger:{
						player:['enterGame'],
						global:['gameStart','phaseBefore'],
					},
					direct:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					unique:true,
					firstDo:true,
					priority:Infinity,
					filter:function(event,player){
						if(!lib.config.extension_仙家之魂_poelose) return false;
						if(get.itemtype(player)!='player') return false;
						if(!get.playerName(player).filter(name=>{
						    return name.indexOf("xjzh_poe")==0;
						}).length) return false;
						var skills=player.skills.slice(0);
						var list=[]
						for(var i=0;i<skills.length;i++){
							var info=lib.skill[skills[i]]
							if(lib.translate[skills[i]]&&lib.translate[skills[i]+"_info"]&&info.poelose){
								list.push(skills[i]);
							}
						}
						if(list.length>=2) return true;
						return false;
					},
					content:function(){
						"step 0"
						var skills=player.skills;
						var list=[]
						for(var i=0;i<skills.length;i++){
							var info=lib.skill[skills[i]]
							if(lib.translate[skills[i]]&&lib.translate[skills[i]+"_info"]&&info.poelose&&skills[i]!="xjzh_poe_choice2"){
								list.push(skills[i]);
							}
						}
						event.skills=list.slice(0);
						"step 1"
						if(event.skills.length){
							var dialog=ui.create.dialog('forcebutton','hidden');
							dialog.add('请选择获得一项技能');
							for(i=0;i<event.skills.length;i++){
								if(lib.translate[event.skills[i]+'_info']){
									var translation=get.translation(event.skills[i]);
									if(translation[0]=='新'&&translation.length==3){
										translation=translation.slice(1,3);
									}
									else{
										translation=translation.slice(0,2);
									}
									var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[event.skills[i]+'_info']+'</div></div>');
									item.firstChild.link=event.skills[i];
								}
							}
						}
						else{
							event.finish();
							return;
						}
						player.chooseControl(event.skills,true).set('prompt','请选择移除一项技能').set('ai',function(){
							return event.skills.randomGet();
						}).set('dialog',dialog);
						"step 2"
						if(result&&result.control){
							var skills=result.control
							for(var i of event.skills){
								if(i==skills) continue;
								player.removeSkill(i,true);
							}
							game.log(player,'选择了技能','#y〖'+get.translation(skills)+'〗');
						}
					},
				},
				//游侠
				/*"xjzh_poe_bingjian":{
					mod:{
						aiOrder:function(player,card,num){
							var name=get.name(card);
							if(name!="sha"&&name!="jiu") return num+4;
							return num;
						},
					},
					usable:1,
					locked:true,
					poelose:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:2",
					filterCard:function(card){
						return get.tag(card,'damage');
					},
					complexCard:true,
					selectCard:function(){
						var player=_status.event.player;
						var num=player.countCards('h',function(card){
						    return get.tag(card,'damage');
						});
						//if(player==game.me) return -1;
						return num;
					},
					filterTarget:function(card,player,target){
						return target!=player;
					},
					position:'h',
					multitarget:true,
					multiline:true,
					filter:function(event,player){
						var hs=player.getCards('h');
						if(!hs.length) return false;
						for(var i=0;i<hs.length;i++){
							var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
							if(mod2===false) return false;
						};
						return true;
					},
					content:function(){
						"step 0"
						event.num=0
						"step 1"
						event.shanRequired=cards.length
						"step 2"
						var next=targets[event.num].chooseToUse('请使用一张闪');
						next.set('type','respondShan');
						next.set('filterCard',function(card,player){
							if(get.name(card)!='shan') return false;
							return lib.filter.cardEnabled(card,player,'forceEnable');
						});
						if(event.shanRequired>1){
							next.set('prompt2','（共需使用'+event.shanRequired+'张闪）');
						}
						next.set('ai1',function(card){
							var target=_status.event.player;
							var evt=_status.event.getParent();
							var bool=true;
							if(_status.event.shanRequired>1&&!get.is.object(card)&&target.countCards('h','shan')<_status.event.shanRequired){
								bool=false;
							}
							else if(target.hasSkillTag('useShan')){
								bool=true;
							}
							else if(target.hasSkillTag('noShan')){
								bool=false;
							}
							else if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
							if(bool){
								return get.order(card);
							}
							return 0;
						})
						.set('shanRequired',event.shanRequired);
						next.set('respondTo',[player,card]);
						"step 3"
						if(result.bool){
							event.shanRequired-=1;
							if(event.shanRequired>0){
								event.goto(2);
							}
						}else{
							targets[event.num].damage(event.shanRequired,player,"ice",'nocard');
							if(Math.random()<=Math.random()) targets[event.num].changexjzhBUFF('binghuan',2);
							event.num++
							if(event.num<targets.length-1) event.goto(2);
						}
					},
					prompt:"你可以将所有手牌（至少一张）当一张【冰杀】使用",
					ai:{
						order:8,
						result:{
							target:-1,
						},
					},
				},*/
				"xjzh_poe_bingjian":{
					mod:{
						aiOrder:function(player,card,num){
							var name=get.name(card);
							if(name!="sha"&&name!="jiu") return num+4;
							return num;
						},
					},
					usable:1,
					locked:true,
					poelose:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:2",
					filterCard:function(card){
						return get.tag(card,'damage');
					},
					complexCard:true,
					check:function(card){
					    return 4-get.value(card);
					},
					selectCard:function(){
						var player=_status.event.player;
						var num=player.countCards('h',function(card){
						    return get.tag(card,'damage');
						});
						//if(player==game.me) return -1;
						return num;
					},
					filterTarget:function(card,player,target){
						return target!=player;
					},
					position:'h',
					multitarget:true,
					multiline:true,
					filter:function(event,player){
						var hs=player.getCards('h',function(card){
						    return get.tag(card,'damage');
						});
						if(!hs.length) return false;
						for(var i=0;i<hs.length;i++){
							var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
							if(mod2===false) return false;
						};
						return true;
					},
					content:function(){
					    "step 0"
					    event.num=0;
					    "step 1"
					    player.useCard({name:'sha',isCard:true,nature:"ice"},target,false).set('addCount',false);
					    "step 2"
					    event.num++
					    if(event.num<cards.length&&target.isAlive()) event.goto(1);
					    "step 3"
					    if(player.getStat('damage')){
							if(Math.random()<=Math.random()) target.changexjzhBUFF('binghuan',1);
						}
					},
					ai:{
						order:8,
						expose:0.3,
						result:{
							target:-1,
						},
					},
				},
				"xjzh_poe_dianjian":{
					mod:{
						aiOrder:function(player,card,num){
							var name=get.name(card);
							if(name!="sha"&&name!="jiu") return num+4;
							return num;
						},
					},
					usable:1,
					locked:true,
					poelose:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:2",
					filterCard:function(card){
						return get.tag(card,'damage');
					},
					complexCard:true,
					check:function(card){
					    return 4-get.value(card);
					},
					selectCard:function(){
						var player=_status.event.player;
						var num=player.countCards('h',function(card){
						    return get.tag(card,'damage');
						});
						//if(player==game.me) return -1;
						return [1,num];
					},
					filterTarget:function(card,player,target){
						return target!=player;
					},
					selectTarget:function(){
			    	    return ui.selected.cards.length;
					},
					position:'h',
					filter:function(event,player){
						var hs=player.getCards('h',function(card){
						    return get.tag(card,'damage');
						});
						if(!hs.length) return false;
						for(var i=0;i<hs.length;i++){
							var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
							if(mod2===false) return false;
						};
						return true;
					},
					content:function(){
					    "step 0"
					    player.useCard({name:'sha',isCard:true,nature:"thunder"},target,false).set('addCount',false);
					    "step 1"
					    if(player.getStat('damage')){
							if(Math.random()<=Math.random()) target.changexjzhBUFF('gandian',1);
						}
					},
					ai:{
						order:8,
						expose:0.3,
						result:{
							target:-1,
						},
					},
				},
				//锐眼
				"xjzh_poe_fenlie":{
					audio:"ext:仙家之魂/audio/skill:2",
					trigger:{
						player:"useCardToPlayer",
					},
					forced:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					priority:65,
					popup:false,
					filter:function (event,player){
						return get.tag(event.card,'damage')&&game.players.length>2&&event.targets.length==1&&event.target!=player&&get.type(event.card)!="delay";
					},
					content:function (){
						'step 0'
						var num=[]
						if(player.getEquip(1)){
							num=2
						}
						else{
							num=1
						}
						player.chooseTarget('〖分裂〗额外指定'+get.translation(num)+'名'+get.translation(trigger.card)+'的目标？',[1,num],function(card,player,target){
							var trigger=_status.event.getTrigger();
							if(trigger.targets.includes(target)) return false;
							return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
						})
						.set('ai',function(target){
							var trigger=_status.event.getTrigger();
							var player=_status.event.player;
							return get.effect(target,trigger.card,player,player);
						});
						'step 1'
						if(result.bool){
							var target=result.targets
							for(var i of target){
							    trigger.targets.add(i);
							}
							player.logSkill("xjzh_poe_fenlie",target);
							if(player.countMark("xjzh_intro_jufeng")<10) player.useSkill("xjzh_poe_jufeng");
						}
						event.finish();
					},
				},
				"xjzh_poe_tanshe":{
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						source:"damageSource",
					},
					forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					filter:function(event,player){
						return !player.hasSkill("xjzh_poe_tanshejin")&&Math.random()<=0.3;
					},
					content:function (){
						"step 0"
						player.addTempSkill("xjzh_poe_tanshejin","useCardAfter");
						if(player.hasSkill("xjzh_poe_danmu")){
							trigger.player.damage(1,player);
							event.goto(2);
						}
						"step 1"
						var previous=trigger.player.getPrevious();
						var next=trigger.player.getNext();
						var list=[
						    previous,
						    next
						];
						var target=list.randomGet();
						if(target){
							target.damage(1,player);
						}
						"step 2"
						if(player.countMark("xjzh_intro_jufeng")<10) player.useSkill("xjzh_poe_jufeng");
					},
				},
				"xjzh_poe_tanshejin":{
					sub:true,
				},
				"xjzh_poe_juji":{
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						source:"damageBegin",
					},
					forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					filter:function (event,player){
						return !event.player.inRange(player);
					},
					content:function (){
						trigger.num+=Math.floor(trigger.num*0.6);
					},
				},
				"xjzh_poe_jufeng":{
					audio:"ext:仙家之魂/audio/skill:1",
					forced:true,
					popu:false,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					trigger:{
						player:"useCard",
					},
					global:["xjzh_intro_jufeng"],
					group:["xjzh_poe_jufeng_liushi"],
					filter:function (event,player){
						return _status.currentPhase==player&&player.countMark("xjzh_intro_jufeng")<10;
					},
					content:function (){
						"step 0"
						player.addMark("xjzh_intro_jufeng",1,false);
						game.log(player,"获得了一层〖提速尾流〗");
						"step 1"
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identity==player.identity&&game.players[i]!=player){
								game.players[i].identityShown=true
								game.players[i].addMark("xjzh_intro_jufeng",1,false);
							}
						}
					},
					subSkill:{
						"liushi":{
							trigger:{
								global:"phaseEnd",
								player:"damageEnd",
							},
							forced:true,
							popup:false,
							sub:true,
							filter:function (event,player){
								return player.hasMark("xjzh_intro_jufeng");
							},
							content:function (){
								"step 0"
								for(var i=0;i<game.players.length;i++)
								if(trigger.name=="phase"){
									if(game.players[i].hasMark("xjzh_intro_jufeng")){
										game.players[i].removeMark("xjzh_intro_jufeng",1,false);
									}
								}
								else{
									if(game.players[i].hasMark("xjzh_intro_jufeng")){
										game.players[i].clearMark("xjzh_intro_jufeng",false);
									}
								}
								"step 1"
								if(trigger.name=="phase"){
									game.log(player,"失去了一层〖提速尾流〗");
								}
								else{
									game.log(player,"失去了所有〖提速尾流〗");
								}
							},
						},
					},
				},
				"xjzh_poe_danmu":{
					forced:true,
					poelose:true,
					locked:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					trigger:{
						player:"useCardToPlayer",
					},
					priority:66,
					filter:function(event,player){
					    if(!event.targets||event.targets.length) return false;
					    if(event.target==player) return false;
					    if(event.target.countMark("xjzh_poe_danmu_canpo")>=4) return false;
						return Math.random()<=0.3;
					},
					content:function(){
						trigger.target.addMark("xjzh_poe_danmu_canpo",1,false);
					},
					global:["xjzh_poe_danmu_canpo"],
					subSkill:{
						"canpo":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								source:"damageBegin",
							},
							sub:true,
							forced:true,
							marktext:"残",
							intro:{
								name:"残破",
								content:function(storage,player){
									var str='';
									str+='造成伤害有'+get.translation(storage*25)+'%几率无效';
									return str;
								},
							},
							filter:function (event,player){
								var num1=player.countMark("xjzh_poe_danmu_canpo")*0.25
								return Math.random()<=num1&&player.hasMark("xjzh_poe_danmu_canpo");
							},
							content:function (){
								trigger.cancel();
							},
						},
					},
				},
				//决斗者
				"xjzh_poe_jianfeng":{
					enable:"phaseUse",
					usable:1,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					forceDie:true,
					filterCard:function(card,player,target){
						return get.tag(card,'damage');
					},
					audio:"ext:仙家之魂/audio/skill:1",
					filterTarget:function(card,player,target){
						return target!=player;
					},
					selectTarget:function(){
					    if(game.xjzhAchi.hasAchi('刽子手','special')) return [1,2];
					    return 1;
					},
					filter:function(event,player){
						var cards=player.getCards('h',function(card){
							return get.tag(card,'damage');
						});
						return cards.length;
					},
					content:function(){
						"step 0"
						var cards=target.getCards('hejxs',function(card){
							return !get.tag(card,'damage');
						});
						if(!cards.length) event.goto(2);
						event.cards=cards
						target.chooseBool('〖剑风〗：是否弃置所有非[伤害]卡牌？').set('ai',function(event,player){
							if(target.countCards('h','shan')>=2) return 0;
							var num=0
							var cards= target.getCards('h',function(card){
								return !get.tag(card,'damage')
							});
							for(var i=0;i<cards.length;i++){
								if(get.value(cards[i])>=8) num++
							}
							return num;
						});
						"step 1"
						if(result.bool){
							var cards=target.getCards('hejxs',function(card){
								return !get.tag(card,'damage');
							});
							target.discard(cards);
							event.finish();
							return;
						}
						"step 2"
						player.useCard('unequip',{name:'sha',isCard:true},target,false).set('addCount',false);
						"step 3"
						if(target.isAlive()){
							game.delay(1.5);
							player.useCard('unequip',{name:'sha',isCard:true},target,false).set('addCount',false).set('oncard',function(card,player){
								var that=this;
								if(!that.baseDamage) that.baseDamage=1;
								that.baseDamage+=1;
							});
						}
						"step 4"
						if(target.isDead()){
						    if(!game.xjzhAchi.hasAchi('刽子手','special')){
					            if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('刽子手','special',1);
					        }
						}
					},
					ai:{
						jueqing:true,
						order:8,
						result:{
							target:-1,
						},
					},
				},
				"xjzh_poe_sidou":{
					enable:"chooseToUse",
					usable:1,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					filterCard:true,
					selectCard:1,
					viewAs:{
						name:"juedou",
					},
					position:"h",
					check:function(card){
					    return 6-get.value(card);
					},
					viewAsFilter:function(player){
						return player.countCards('h');
					},
					audio:"ext:仙家之魂/audio/skill:2",
					onuse:function(result,player){
						var cards=result.targets[0].getCards('ej');
						var cards2=player.getCards('ej');
						if(cards) result.targets[0].directgain(cards,null,'xjzh_poe_sidou');
						if(cards2) player.directgain(cards2,null,'xjzh_poe_sidou');
						player.addTempSkill('xjzh_poe_sidou_mod','juedouEnd');
						result.targets[0].addTempSkill('xjzh_poe_sidou_mod','juedouEnd');
						player.addTempSkill('xjzh_poe_sidou_gain');
						result.targets[0].addTempSkill('xjzh_poe_sidou_gain');
					},
					ai:{
						order:8,
						result:{
							target:function(player,target){
								if(!target) return;
								if(!player) return;
								if(target.hasSkillTag('noh')) return 0;
								var cards=target.countCards('hej');
								var cards2=player.countCards('hej');
								return -(cards2-cards);
							},
						},
					},
					subSkill:{
						"mod":{
							locked:true,
							charlotte:true,
							direct:true,
							sub:true,
							mod:{
								cardname:function(card){
									return 'sha';
								},
							},
							trigger:{
								player:"damageEnd",
							},
							filter:function(event,player){
								var num=Math.ceil(player.maxHp/2);
								return num>player.hp;
							},
							content:function(){
								player.loseHp(player.hp);
							},
						},
						"gain":{
							trigger:{
								global:"juedouAfter",
							},
							locked:true,
							charlotte:true,
							direct:true,
							sub:true,
							filter:function(event,player){
								var cards=player.getCards('h',function(card){
									return card.hasGaintag('xjzh_poe_sidou');
								});
								return cards.length;
							},
							content:function(){
								var cards=player.getCards('h',function(card){
									return card.hasGaintag('xjzh_poe_sidou');
								});
								var list=[]
								for(var i=0;i<cards.length;i++){
									if(get.type(cards[i])=="equip") list.push(cards[i]);
									if(get.type(cards[i])=="delay") player.addJudge(cards[i]);
								}
								if(list.length) player.directequip(list);
								player.removeSkill('xjzh_poe_sidou_gain',true);
							},
						},
					},
				},
				"xjzh_poe_tiaozhan":{
				    trigger:{
				        global:"phaseUseBegin",
				    },
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					forceDie:true,
				    prompt:function(event,player){
				        return "〖挑战〗：是否摸3张牌并视为对"+get.translation(event.player)+"使用一张【决斗】";
				    },
				    check:function(event,player){
				        var att=get.attitude(event.player,player);
				        if(!lib.filter.targetEnabled2({name:"juedou"},player,event.player)) return 0;
				        if(att<=0){
				            return player.countCards('h')+3-event.player.countCards('h');
				        }
				        if(att>0){
				            if(event.player.isHealthy()&&player.countCards('h')<=1) return player.getDamagedHp();
				        }
				        return 0;
				    },
				    audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(!lib.filter.targetEnabled2({name:"juedou"},player,event.player)) return false;
				        if(event.player==player) return false;
				        return true;
				    },
				    content:function(){
				        "step 0"
				        player.draw(3);
				        "step 1"
				        player.useCard({name:'juedou',isCard:true},trigger.player,false);
				        "step 2"
				        if(player.getHistory('useCard',function(evt){
				            return evt.getParent().name=="xjzh_poe_tiaozhan"&&player.getHistory('sourceDamage',function(evt2){
				                return evt.card==evt2.card;
				            }).length;
				        }).length){
				            trigger.player.discard(trigger.player.getCards('h'));
				        }else{
				            if(!game.xjzhAchi.hasAchi('完美斗士','special')) player.chooseToDiscard(3,true);
				        }
				        "step 3"
						if(trigger.player.isDead()){
						    if(!game.xjzhAchi.hasAchi('完美斗士','special')){
					            if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('完美斗士','special',1);
					        }
						}
				    },
				},
				//处刑者
				"xjzh_poe_zhenya":{
					forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					mark:true,
					marktext:"镇",
					intro:{
						content:function(storage,player){
							var str='';
							var num=player.storage.xjzh_buff_criticalstrike
							str+='当前物理攻击暴击率：'+get.strNumber(num)+'%';
							return str;
						},
					},
					init:function(player){
					    var num=game.players.length*10+game.dead.length*15+10;
					    player.storage.xjzh_buff_criticalstrike=num;
					},
					group:["xjzh_poe_zhenya_1","xjzh_poe_zhenya_2","xjzh_poe_zhenya_3"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								source:"damageBegin",
							},
							forced:true,
							priority:2,
							sub:true,
							filter:function (event,player){
							    if(event.getParent('criticalstrike').name=='criticalstrike') return false;
								return !game.hasNature(event);
							},
							content:function (){
								var numx=player.storage.xjzh_buff_criticalstrike/100;
								var numxx=get.xjzhBUFFNum(player,'criticalstrikes');
								game.xjzh_Criticalstrike(player,trigger.num,numx>=1?3:2,numxx);
							},
						},
						"2":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:"damageBegin",
							},
							forced:true,
							sub:true,
							filter:function (event,player){
								return event.num>=2&&player.inRange(event.source);
							},
							content:function (){
								trigger.num=1
							},
						},
						"3":{
							trigger:{
								global:["dieAfter","useCard"],
							},
							direct:true,
							sub:true,
							content:function (){
								lib.skill.xjzh_poe_zhenya.init(player);
							},
						},
					},
				},
				"xjzh_poe_zaixing":{
					forced:true,
					locked:true,
					poelose:true,
					nogainsSkill:true,
					priority:-1,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					trigger:{
					    source:"damageAfter",
					},
					filter:function(event,player){
					    return !event.cancelled||event.num>0
					},
					content:function(){
					    "step 0"
						if(player.hujia<3) player.changeHujia(1);
						"step 1"
						if(!player.storage.xjzh_poe_zaixing) player.storage.xjzh_poe_zaixing=0
						player.storage.xjzh_poe_zaixing++
						"step 2"
						if(player.storage.xjzh_poe_zaixing==3){
						    delete player.storage.xjzh_poe_zaixing
						    player.changexjzhBUFF('criticalstrikes',1);
						}
					},
				},
				"xjzh_poe_lengxue":{
					forced:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						source:"damageAfter",
					},
					filter:function (event,player){
						return event.player.isDying()==1;
					},
					content:function (){
						trigger.player.die().source=player;
					},
				},
				"xjzh_poe_shixue":{
					trigger:{
						source:'damageSource',
					},
					forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					priority:10,
					filter:function(event,player){
						return !game.hasNature(event);
					},
					content:function(){
						if(player.isDamaged()){
							player.recover();
						}
						else{
						    if(_status.event.criticalstrike==true){
						        player.draw(2);
						    }else{
						        player.draw();
						    }
						}
					}
				},
				"xjzh_poe_canbao":{
					forced:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						player:"xjzhCriticalstrikeAfter",
					},
					filter:function (event,player){
						return Math.random()<=0.25;
					},
					content:function (){
						player.changexjzhBUFF('criticalstrikes',1);
					},
				},
				"xjzh_poe_yingxiang":{
					forced:true,
					locked:true,
					forceDie:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					marktext:"影",
					priority:11,
					intro:{
						content:"手牌上限、摸牌数、攻击距离、出牌次数+#",
					},
					mod:{
						targetInRange:function(card,player,target,num){
							if(get.distance(player,target)<=card.number) return num+player.countMark("xjzh_poe_yingxiang");
						},
						maxHandcard:function(player,num){
							return num+player.countMark('xjzh_poe_yingxiang');
						},
						cardUsable:function(card,player,num){
							if(card.name=="sha"||card.name=="jiu" ) return num+player.countMark('xjzh_poe_yingxiang');
						},
					},
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						source:"dieAfter",
					},
					filter:function(event,player){
					    return event.player.isDead();
					},
					content:function(){
						player.addMark("xjzh_poe_yingxiang",1,false);
					},
					subSkill:{
						"draw":{
							trigger:{
								player:"drawBegin",
							},
							filter:function(event,player){
								return player.hasMark("xjzh_poe_yingxiang");
							},
							forced:true,
							priority:11,
							sub:true,
							content:function(){
								var num=player.countMark("xjzh_poe_yingxiang");
								trigger.num+=num
							},
						},
					},
				},
				"xjzh_poe_yingxing":{
				    trigger:{
				        player:"damageAfter",
				    },
					forced:true,
					priority:-1,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					filter:function(event,player){
					    return _status.currentPhase!=player;
					},
					content:function(){
				        var evt=_status.event.getParent('phaseUse');
                        if(evt&&evt.name=='phaseUse'){
                            evt.skipped=true;
                        }
					},
					ai:{
					    effect:{
					        target:function(card,player,target){
					            if(!target) return;
					            //if(player.countUsed('sha',true)==0) return 0.1;
					            if(player.getCardUsable('sha')>0){
					                if(get.tag(card,'damage')) return 0.5;
					            }
					            return 1;
					        },
					    },
					},
				},
				"xjzh_poe_jingji":{
					trigger:{
						source:["damageAfter"],
						player:["damageAfter","xjzh_poe_fuchou_gedang"],
					},
					forced:true,
					priority:-1,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					poelose:true,
					nogainsSkill:true,
					marktext:"竞",
					intro:{
						name:"竞技",
						content:function(storage,player){
							var str='';
							var num=player.countMark("xjzh_poe_jingji")*6.5;
							if(player.hasSkill('xjzh_poe_zhuzao')) num+=10;
							if(!num||num==0) return '反击几率：0%';
							str+='反击几率：'+get.translation(num)+'%';
							return str;
						},
					},
					filter:function(event,player){
					    if(event.player==player) return player.hasMark("xjzh_poe_jingji");
					    return event.source==player;
					},
					content:function (){
					    if(trigger.source==player){
						    if(player.countMark("xjzh_poe_jingji")<10)  player.addMark("xjzh_poe_jingji",1,false);
						}
						else if(trigger.player==player){
						    if(player.hasMark("xjzh_poe_jingji")) player.removeMark("xjzh_poe_jingji",1,false);
						}
					},
					group:["xjzh_poe_jingji_fanji"],
					subSkill:{
						"fanji":{
							trigger:{
								player:["damageAfter","damageCancelled"],
							},
							forced:true,
							sub:true,
							filter:function(event,player){
							    if(!player.hasMark("xjzh_poe_jingji")) return false;
							    if(event.triggername=="damageCancelled") return true;
							    var num=player.countMark("xjzh_poe_jingji")*0.065;
							    if(player.hasSkill("xjzh_poe_zhuzao")){
							        return Math.random()<=num+0.1;
							    }
							    return Math.random()<=num;
							},
							content:function (){
								"step 0"
								if(event.triggername=="damageAfter"){
								    targets=trigger.source;
								}else{
								    targets=trigger.player;
								}
								var str="〖反击〗：是否视为对"+get.translation(targets)+"使用一张【杀】";
								player.chooseBool(str).set('ai',function(){
									return get.damageEffect(targets,player,player);
								}).set('targets',targets);
								"step 1"
								if(result.bool){
									if(player.hasSkill("xjzh_poe_zhuzao")){
										player.useCard({name:'sha',isCard:true},targets,false).set('oncard',function(card,player){
											var that=this;
											if(!that.baseDamage) that.baseDamage=1;
											that.baseDamage+=1;
										});
									}else{
										player.useCard({name:'sha',isCard:true},targets,false);
									}
								}
							},
						},
					},
				},
				"xjzh_poe_fuchou":{
					trigger:{
						player:"damageBegin1",
					},
					forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					priority:66,
					audio:"ext:仙家之魂/audio/skill:1",
					mark:true,
					marktext:"格",
					intro:{
						name:"格挡",
						content:function(storage,player){
							var str='格挡几率上限：';
							var num=player.countMark("xjzh_poe_fuchou");
							num+=player.countMark("xjzh_poe_jingji");
							num+=player.countMark("xjzh_poe_xueyan");
							if(!player.hasSkill("xjzh_poe_doushi")){
								str+='75%<br>物理攻击格挡几率：'+get.translation(num)+'%';
							}
							else{
								str+='85%<br>物理攻击格挡几率：'+get.translation(num)+'%'+'<br>法术攻击格挡几率：'+get.translation(num)+'%';
							}
							return str;
						},
						markcount:function(storage,player){
						    return player.countMark("xjzh_poe_fuchou")+player.countMark("xjzh_poe_jingji")+player.countMark("xjzh_poe_xueyan");
						},
					},
					init:function(player){
					    player.addMark("xjzh_poe_fuchou",50,false);
					    player.update();
					},
					filter:function(event,player){
						var num=player.countMark("xjzh_poe_fuchou");
						if(player.hasMark("xjzh_poe_jingji")) num+=player.countMark("xjzh_poe_jingji");
						if(player.hasSkill("xjzh_poe_doushi")){
						    return Math.random()<=num*0.01;
						}
						return !game.hasNature(event)&&Math.random()<=num*0.01;
					},
					content:function (){
						"step 0"
						if(!game.hasNature(trigger)){
							game.log(player,'格挡了本次攻击伤害');
						}
						else{
							game.log(player,'格挡了本次法术伤害');
						}
						"step 1"
						player.recover(trigger.num);
						"step 2"
						var num=60
						if(player.hasSkill("xjzh_poe_doushi")) num+=10
						if(player.countMark("xjzh_poe_fuchou")<num){
						    player.addMark("xjzh_poe_fuchou",1,false);
						    game.log(player,'增加了1%物理攻击格挡几率');
						}
						"step 3"
						trigger.cancel();
						
					},
					ai:{
						effect:{
							target:function (card,player,target,current){
								var num1=player.countMark("xjzh_poe_fuchou")*0.01
								var num2=1-num1
								if(get.tag(card,'damage')&&!get.nature(card)) return [num2,num1];
							},
						},
					},
				},
				"xjzh_poe_doushi":{
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					forced:true,
					trigger:{
						player:"disableEquipBefore",
					},
					onremove:function(player,skill){
					    if(!player.hasSkill("xjzh_poe_fuchou")) return;
					    var num=player.countMark("xjzh_poe_fuchou");
					    if(num>60){
					        player.removeMark("xjzh_poe_fuchou",num-60,false);
					    }
					},
					filter:function (event,player){
						return event.slots.includes('equip2')
					},
					content:function (){
						while(trigger.slots.includes('equip2')) trigger.slots.remove('equip2');
						game.log("无法废除",player,"的防具栏");
					},
				},
				"xjzh_poe_zhuzao":{
					poelose:true,
					locked:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					forced:true,
					init:function(player){
					    setTimeout(function(){
							if(player.hasSkill("xjzh_poe_fuchou")){
					            player.addMark("xjzh_poe_fuchou",10,false);
					            player.updateMarks();
					        }
						},500);
					},
					onremove:function(player,skill){
					    setTimeout(function(){
							if(player.hasSkill("xjzh_poe_fuchou")){
					            player.removeMark("xjzh_poe_fuchou",10,false);
					            player.updateMarks();
					        }
						},500);
					},
				},
				"xjzh_poe_xueyan":{
				    trigger:{
				        player:"recoverBegin",
				    },
				    forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
				    content:function(){
				        trigger.num++
				    },
				    contentAfter:function(){
				        if(player.isHealthy()){
				            if(player.hasSkill('xjzh_sanguo_fuchou')) player.addMark("xjzh_poe_xueyan",2,false);
				        }
				    },
				},
				"xjzh_poe_baipiao":{
				    trigger:{
				        player:"damageEnd",
				    },
				    forced:true,
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
	    		    marktext:"嫖",
				    intro:{
				        content:"expansion",
				        markcount:"expansion",
				    },
				    content:function(){
				        if(!player.getEquip(2)){
				            var card=get.cardPile(function(card){
					            return get.subtype(card)=="equip2";
			                });
			                if(card) player.useCard(card,player)._triggered=null;
				        }else{
				            var card=get.cardPile(function(card){
					            return get.subtype(card)=="equip2";
			                });
			                var skills=get.info(card).skills;
							skills=skills.slice(0);
							for(var i of skills){
							    player.addSkill(i);
							}
							var cards=game.createCard(card);
							player.addToExpansion(cards,'gain2').gaintag.add('xjzh_poe_baipiao');
							game.cardsDiscard(card);
				        }
				    },
				},
				"xjzh_poe_shenghua":{
					audio:"ext:仙家之魂/audio/skill:4",
					trigger:{
						player:["enterGame","phaseZhunbeiBegin"],
						global:"gameDrawBegin",
					},
					forced:true,
					locked:true,
					unique:true,
					priority:98,
					content:function (){
					    "step 0"
					    if(trigger.name=='phaseZhunbei'){
					        var list=player.getSkills(null,false,false).filter(function(skill){
					            var info=lib.skill[skill];
					            return info&&info.poelose&&skill!="xjzh_poe_shenghua";
							});
					        player.chooseBool('〖升华〗：是否移除'+get.translation(list)+'重获技能').set('ai',function(){
						         return Math.random();
					    	});
					    	event.goto(2);
					    }
					    "step 1"
						var list=[];
						var list2=[];
						var players=game.players.concat(game.dead);
						for (var i=0;i<players.length;i++){
							list2.add(players[i].name);
							list2.add(players[i].name1);
							list2.add(players[i].name2);
						}
						for(var i in lib.characterPack['XWTR']){
							if(list2.includes(i)) continue;
							for (var j=0;j<lib.character[i][3].length;j++){
								var info=lib.skill[lib.character[i][3][j]];
								if(info&&info.poelose) list.add(lib.character[i][3][j]);
							}
						}
						if(list.length>=5){
						    var num=5
						}else{
						    var num=list.length
						}
						var link=list.randomGets(num);
						player.addSkill(link);
						game.log(player,'获得技能','〖'+get.translation(link)+'〗');
						event.finish();
						return;
						"step 2"
						if(result.bool){
						    var list=player.getSkills(null,false,false).filter(function(skill){
						        var info=lib.skill[skill];
						        return info&&info.poelose&&skill!="xjzh_poe_shenghua";
							});
							player.removeSkill(list,true);
							event.goto(1);
						}
					},
				},
				//女巫
				"xjzh_poe_huoqiu":{
				    mod:{
				        cardname:function(card,player){
							if(get.color(card)=='red') return 'sha';
						},
						cardnature:function(card,player){
							if(get.color(card)=='red') return 'fire';
						},
						targetInRange:function(card){
						    if(card.name=="sha"&&card.nature=="fire") return true;
						},
						cardUsable:function (card,player,num){
							if(card.name=='sha'&&card.nature=="fire") return Infinity;
						},
				    },
				    trigger:{
				        source:"damageEnd",
				    },
				    forced:true,
				    locked:true,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					priority:Infinity,
					audio:"ext:仙家之魂/audio/skill:3",
				    filter:function(event,player){
				        if(!event.cards||!event.cards.length) return false;
                        var history=player.getHistory('sourceDamage',function(card){
                            return card.card&&card.card.name=="sha"&&card.card.nature=="fire";
                        });
                        if(!history.length||history.length==0) return false;
				        return event.card.name=="sha"&&event.card.nature=="fire";
				    },
				    group:["xjzh_poe_huoqiu_die"],
				    content:function(){
				        "step 0"
				        event.num=player.getHistory('sourceDamage',function(card){
                            return card.card&&card.card.name=="sha"&&card.nature=="fire";
                        }).length;
                        event.target=trigger.player.getNext();
                        if(event.target==player) event.target=event.target.getNext();
                        "step 1"
                        game.xjzh_playEffect('xjzh_skillEffect_baozha',event.target);
                        event.target.damage(trigger.nature,trigger.num,player,'nocard');
                        event.num--
                        if(event.num>0){
                            event.target=event.target.getNext();
                            if(event.target==player) event.target=event.target.getNext();
                            event.redo();
                        }
                        "step 2"
                        if(game.xjzhAchi.hasAchi('火焰大师','special')){
				            var history=player.getHistory('sourceDamage',function(card){
                                return card.card&&card.card.name=="sha"&&card.card.nature=="fire";
                            });
                            if(history.length>1) player.draw(2);
                        }
				    },
				    subSkill:{
				        "die":{
				            trigger:{
				                source:"dieAfter",
				            },
				            forceDie:true,
				            direct:true,
				            sub:true,
				            filter:function(event,player){
				                if(event.player.isAlive()) return false;
				                if(event.getParent('xjzh_poe_huoqiu').name!='xjzh_poe_huoqiu') return false;
				                return !game.xjzhAchi.hasAchi('火焰大师','special');
				            },
				            content:function(){
				                if(!game.xjzhAchi.hasAchi('火焰大师','special')){
					                if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('火焰大师','special',1);
					            }
				            },
				        },
				    },
				},
				"xjzh_poe_xuruo":{
				    trigger:{
				        global:"drawAfter",
				    },
				    forced:true,
				    priority:12,
					locked:true,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					locked:true,
					group:"xjzh_poe_xuruo_damage",
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
					    if(event.player==player) return false;
					    if(event.player.countCards('h')<=player.countCards('h')) return false;
					    return !event.cancelled;
					},
					content:function(){
					    var num=player.countCards('h');
					    var num2=trigger.player.countCards('h');
					    var hs=Math.floor((num2-num)/2);
					    player.randomGain(trigger.player,hs);
					},
					subSkill:{
					    "damage":{
					        trigger:{
					            global:"damageBefore",
					        },
					        direct:true,
					        priority:Infinity,
					        sub:true,
					        filter:function(event,player){
					            if(event.player!=player) return false;
					            if(!event.source) return false;
					            if(event.source.countCards('h')>=player.countCards('h')) return false;
					            return !event.cancelled;
					        },
					        audio:"ext:仙家之魂/audio/skill:2",
					        content:function(){
					            trigger.num=1;
					        }
					    },
					},
				},
				//元素使
				"xjzh_poe_huiliu":{
				    trigger:{
				        global:"phaseZhunbeiBegin",
				    },
				    direct:true,
				    priority:12,
					locked:true,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					mark:true,
					marktext:"汇",
					intro:{
					    name:"元素汇流",
					    content:function(storage,player){
					        if(!player.storage.xjzh_poe_huiliu) return "没有元素汇流";
					        var storage=player.storage.xjzh_poe_huiliu
					        var str="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					        var str2="";
					        if(storage=="fire") str2+="火焰";
					        if(storage=="ice") str2+="冰霜";
					        if(storage=="thunder") str2+="闪电";
					        if(storage=="poison") str2+="猛毒";
					        str+=str2+"汇流<br><br>";
					        str+="<li>你造成伤害视为"+str2+"伤害<br><li>你防止非"+str2+"属性伤害";
					        return str;
					    },
					},
					audio:"ext:仙家之魂/audio/skill:2",
					group:["xjzh_poe_huiliu_damage"],
					skillList:['fire','thunder','ice','poison'],
				    content:function(){
				        //if(player.storage.xjzh_poe_huiliu) delete player.storage.xjzh_poe_huiliu;
				        var list=lib.skill.xjzh_poe_huiliu.skillList.slice(0);
				        if(player.storage.xjzh_poe_huiliu) list.remove(player.storage.xjzh_poe_huiliu);
				        var skillx=list.randomGet();
				        var str="";
				        if(skillx=="fire") str+="火焰";
					    if(skillx=="ice") str+="冰霜";
					    if(skillx=="thunder") str+="闪电";
				        if(skillx=="poison") str+="猛毒";
				        str+="汇流";
				        player.popup(str)
						player.$fullscreenpop(str,skillx);
				        player.storage.xjzh_poe_huiliu=skillx;
				    },
				    subSkill:{
				        "damage":{
				            trigger:{
				                global:"damageBegin",
				            },
				            forced:true,
				            sub:true,
				            priority:-10,
				            audio:"xjzh_poe_huiliu",
				            filter:function(event,player){
				                var storage=player.storage.xjzh_poe_huiliu
				                if(event.player==player){
				                    return event.nature!=storage;
				                }
				                return true;
				            },
				            content:function(){
				                var storage=player.storage.xjzh_poe_huiliu
				                if(trigger.source==player){
				                    game.setNature(trigger,storage,false)
				                }
				                if(trigger.player==player){
				                    if(trigger.nature!=storage) trigger.changeToZero();
				                }
				            },
				        },
				    },
				    ai:{
				        effect:{
				            target:function(card,player,target,current) {
				                if(!player.storage.xjzh_poe_huiliu) return;
				                if(get.tag(card,'damage')){
				                    if(!game.hasNature(card,player.storage.xjzh_poe_huiliu)){
				                        return [0,0];
				                    }
				                    return [1,0];
				                }
				            }
				        },
				    },
				},
				"xjzh_poe_guangta":{
				    trigger:{
				        source:"damageAfter",
				    },
					poelose:true,
					nogainsSkill:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(!game.hasNature(event)) return false;
				        if(event.getParent("xjzh_poe_guangta").name=="xjzh_poe_guangta") return false;
				        return event.num>0;
				    },
				    prompt:function(event,player){
				        return "〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害";
				    },
				    check:function(event,player){
				        var targets=[player.getPrevious(),player.getNext()]
				        var num=0
				        for(var i of targets){
				            var att=get.attitude(player,i);
				            if(att<=0) num++
				        }
				        return num;
				    },
				    content:function(){
				        "step 0"
				        player.chooseTarget("〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害",true,function(card,player,target){
				            var player=_status.event.player;
				            return [player.getPrevious(),player.getNext()].includes(target);
				        }).set('ai',function(target){
				            var trigger=_status.event.getTrigger();
				            return get.damageEffect(target,trigger.nature,player,player);
				        });
				        "step 1"
				        if(result.bool){
				            var target=result.targets[0]
				            target.damage(trigger.num,trigger.nature,player,"nocard");
				            var nature=trigger.nature
				            switch(nature){
				                case 'fire':
				                target.changexjzhBUFF('gandian',1);
				                break;
			                    case 'ice':
			                    target.changexjzhBUFF('ranshao',1);
			                    break;
			                    case 'thunder':
			                    target.changexjzhBUFF('bingdong',1);
			                    break;
			                }
				        }
				    },
				},
				"xjzh_poe_sangzhong":{
				    trigger:{
				        player:"loseAfter",
				    },
				    forced:true,
				    locked:true,
				    priority:-10,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        var history=player.getAllHistory('lose');
				        return history.length%3==0;
				    },
				    content:function(){
				        "step 0"
				        player.draw(2);
				        "step 1"
				        player.addGaintag(result,'xjzh_poe_sangzhong');
				    },
				},
				"xjzh_poe_suxing":{
				    trigger:{
				        global:['damageCancelled','damageZero'],
				    },
				    forced:true,
				    locked:true,
				    priority:10,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					audio:"ext:仙家之魂/audio/skill:2",
				    filter:function(event,player){
				        if(!event.source||event.source!=player) return false;
				        return game.hasNature(event);
				    },
				    content:function(){
				        var num=trigger.num==0?1:trigger.num
				        trigger.player.damage(num,trigger.source,'nocard','untriggering');
				    },
				    ai:{
				        jueqing:true,
				        effect:{
							player:function(card,player,target,current){
								if(get.tag(card,'damage')) return [1,-1];
							},
						},
				    },
				},
				"xjzh_poe_bilei":{
				    initHujia:function(player){
				        player.changeHujia(20);
				        player.update();
				    },
					audio:"ext:仙家之魂/audio/skill:2",
				    init:function(player){
				        lib.skill.xjzh_poe_bilei.initHujia(player);
				    },
				    onremove:function(player,skill){
				        if(player.hujia>0) player.changeHujia(-player.hujia);
				    },
				    trigger:{
				        player:"changeHujiaAfter",
				    },
				    filter:function(event,player){
				        return player.hujia<=0;
				    },
				    forced:true,
				    locked:true,
				    priority:10,
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
				    content:function(){
				        "step 0"
				        player.damage(player.maxHp*3,'nocard','notrigger','nosource');
				        "step 1"
				        if(player.isAlive()){
				            lib.skill.xjzh_poe_bilei.initHujia(player);
				        }else{
				            event.finish();
				            return;
				        }
				        "step 2"
				        event.num=player.getAllHistory('damage').length;
				        "step 3"
				        event.nature=['fire','thunder','kami','ice','stab','poison'].randomGet();
				        player.chooseTarget("〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害",true,function(card,player,target){
				            return player!=target;
				        }).set('ai',function(target){
				            var trigger=_status.event.getTrigger();
				            return get.damageEffect(target,nature,player,player);
				        }).set('nature',event.nature);
				        "step 4"
				        if(result.bool){
				            event.target=result.targets[0]
				            event.list=[]
				            for(var i=1;i<=event.num;i++){
				                event.list.push(i);
				            }
				            player.chooseControl(event.list).set('ai',function(){
				                return Math.random();
				            }).set('prompt','〖壁垒〗：请选择对'+get.translation(event.target)+'造成'+get.translation(event.nature)+'属性伤害的点数');
				        }else{
				            event.finish();
				            return;
				        }
				        "step 5"
				        if(result.control){
				            var num=result.control
				            event.target.damage(num,event.nature,player,'nocard','notrigger');
				            event.num-=num
				            if(event.num>0) event.goto(3);
				        }
				    },
				},
				"xjzh_poe_qinhe":{
				    enable:"phaseUse",
					poelose:true,
					nogainsSkill:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					filterTarget:function(card,player,target){
						return target.countCards('h');
					},
					selectTarget:1,
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
					    "step 0"
					    var cards=target.getCards('h');
					    target.showCards(cards);
					    event.num=0
					    event.num2=0
					    for(var i=0;i<cards.length;i++){
					        if(get.suit(cards[i]=="heart")){
					            event.num++
					        }
					        else if(get.suit(cards[i]=="spade")){
					            event.num2++
					        }
					    }
					    "step 1"
					    while(event.num>0){
					        if(target.isDamaged()) target.useCard({name:'tao'},target,false);
					        event.num-=1
					    }
					    while(event.num2>0){
					        target.useCard({name:'jiu'},target,false);
					        event.num2-=1
					    }
					},
					ai:{
					    order:8,
					    result:{
					        target:function(player,target){
					            if(!target) return;
					            var hs=target.countCards('h');
					            var hp=target.getDamagedHp();
					            var att=get.attitude(player,target);
					            if(att>0) return hs-hp;
					            return hp-hs;
					        },
					    },
					},
				},
				
				//王者荣耀
				"xjzh_wzry_huange":{
				    trigger:{
				        player:"phaseBefore",
				    },
				    frequent:true,
				    mark:true,
					marktext:"歌",
					intro:{
						content:function(storage,player){
						    if(!player.storage.xjzh_wzry_huange) return;
						    var storage=player.storage.xjzh_wzry_huange;
						    return `你的契约队友${get.translation(storage)}`;
						},
					},
					audio:"ext:仙家之魂/audio/skill:6",
				    global:"xjzh_wzry_huange_mod",
				    group:"xjzh_wzry_huange_use",
				    check:function(event,player){return 1;},
				    prompt:"〖欢歌〗：选择一名角色成为你的契约队友",
				    content:function(){
				        "step 0"
				        player.chooseTarget("〖欢歌〗：请选择一名角色成为你的契约队友",function(card,player,target){
				            return target!=player;
				        }).set('ai',function(target){
				            return get.attitude(player,target);
				        });
				        "step 1"
				        if(result.bool){
				            player.storage.xjzh_wzry_huange=result.targets[0];
				        }
				    },
				    subSkill:{
				        "use":{
				            trigger:{
				                global:"loseAfter",
				            },
				            forced:true,
				            sub:true,
				            priority:1,
				            audio:"xjzh_wzry_huange",
				            filter:function(event,player){
				                if(!player.storage.xjzh_wzry_huange) return false;
				                var target=player.storage.xjzh_wzry_huange;
				                var hs=player.countCards("h");
				                var hs2=target.countCards("h");
				                if(hs2<hs) return true;
				                return false;
				            },
				            content:function(){
				                var target=player.storage.xjzh_wzry_huange;
				                target.draw(player.countCards("h")-target.countCards("h"));
				            },
				        },
				        "mod":{
				            locked:true,
				            charlotte:true,
				            superCharlotte:true,
    						mod:{
        						maxHandcard:function(player,num){
        						    var target=game.findPlayer(function(current){
        						        return get.playerName(current,"xjzh_wzry_duoliya")&&current.storage.xjzh_wzry_huange&&current.storage.xjzh_wzry_huange==player;
        						    });
        						    if(!target) return num;
        						    if(num>=target.getHandcardLimit()) return num;
        							return target.getHandcardLimit();
        						},
        					},
				        },
				    },
				},
				"xjzh_wzry_zhulang":{
				    trigger:{
				        player:"drawAfter",
				    },
				    forced:true,
				    locked:true,
				    priority:3,
					audio:"ext:仙家之魂/audio/skill:5",
					filter:function(event,player){
						return player.countCards("h")>player.getHandcardLimit();
					},
					content:function(){
					    "step 0"
					    var num=player.countCards("h")-player.getHandcardLimit();
					    var str='〖逐浪〗：请选择'+num+'张牌弃置';
					    if(player.storage.xjzh_wzry_huange) str+='或将这些牌交给'+get.translation(player.storage.xjzh_wzry_huange);
					    player.chooseCard('h',num,str,true).set('ai',function(card){
					        if(player.storage.xjzh_wzry_huange) return 8-get.value(card);
					        return 4-get.value(card);
					    });
					    "step 1"
					    if(result.bool){
					        event.cards=result.cards;
					        if(!player.storage.xjzh_wzry_huange){
					            player.discard(event.cards);
					            player.recover(event.cards.length);
					            event.finish();
					            return;
					        }else{
					            player.chooseBool("〖逐浪〗：是否将这些牌交给"+get.translation(player.storage.xjzh_wzry_huange)).set(function(){
					                return 1;
					            });
					        }
					    }
					    "step 2"
					    if(result.bool){
					        var target=player.storage.xjzh_wzry_huange;
					        target.gain(event.cards,player,'draw');
					    }else{
					        player.discard(event.cards);
					        player.recover(event.cards.length);
					    }
					},
				},
				"xjzh_wzry_tiannai":{
				    enable:"phaseUse",
				    limited:true,
					skillAnimation:true,
					animationColor:"water",
					animationStr:"人鱼之歌",
					init:function(player){
					    game.playXH('xjzh_wzry_tiannaiaudio');
					    player.storage.xjzh_wzry_tiannai=false;
					},
					audio:"ext:仙家之魂/audio/skill:4",
					filter:function(event,player){
					    if(!player.storage.xjzh_wzry_huange) return false;
					    return !player.storage.xjzh_wzry_tiannai;
					},
					content:function(){
	    		        "step 0"
	    		        player.awakenSkill('xjzh_wzry_tiannai');
	    		        player.storage.xjzh_wzry_tiannai=true;
	    		        "step 1"
	    		        var target=player.storage.xjzh_wzry_huange;
	    		        target.link(false);
	    		        target.discard(target.getCards('j'));
	    		        target.turnOver(false);
	    		        player.xjzh_resetSkill();
	    		        target.addSkill("xjzh_zengyi_poxiao");
	    		        target.storage.xjzh_wzry_tiannaiaudio=true;
	    		        "step 2"
	    		        player.loseMaxHp();
	    		        player.clearSkills();
					},
				},
				"xjzh_wzry_xiaxing":{
					trigger:{
						source:"damageAfter",
					},
					filter:function(event,player){
						return player.countMark("xjzh_wzry_xiaxing")<4&&!player.hasSkill("xjzh_wzry_xiaxing_off");
					},
					forced:true,
					locked:true,
					charlotte:true,
					mod:{
					    selectTarget:function(card,player,range){
							var type=get.type(card);
						    var num=player.countMark("xjzh_wzry_xiaxing")
							if(range[1]==-1) return;
							if(type=="equip"||type=="delay") return
							if(game.players.length<3) return;
							if(!player.hasSkill("xjzh_wzry_xiaxing_off")) range[1]+=Math.min(num,game.players.length-1);
							else range[1]+=game.players.length-1;
						},
					},
					audio:"ext:仙家之魂/audio/skill:2",
					superCharlotte:true,
					fixed:true,
					popup:false,
					marktext2:"剑",
					marktext:"<img style=width:33px height:33px src="+lib.assetURL+"extension/仙家之魂/image/icon/xjzh_wzry_xiaxing.png>",
					intro:{
						content:"当前已有#道剑气",
					},
					content:function(){
						"step 0"
						player.addMark("xjzh_wzry_xiaxing",1,false);
						player.markSkill("xjzh_wzry_xiaxing");
						game.log(player,"获得了一道剑气");
						/*player.popup("剑气");
						setTimeout(()=>{
							player.removeMark("xjzh_wzry_xiaxing",1,false);
							if(!player.hasMark("xjzh_wzry_xiaxing")) player.unmarkSkill("xjzh_wzry_xiaxing");
							game.log(player,"失去了一道剑气");
						},60000);*/
						"step 1"
						if(player.countMark("xjzh_wzry_xiaxing")<4){
						    event.finish();
						}
						"step 2"
						player.clearMark("xjzh_wzry_xiaxing",false);
						"step 3"  
						while(_status.event.name!='phase'){
						    _status.event=_status.event.parent;
					    }
					    _status.event.finish();
					    _status.event.untrigger(true);
						player.addSkill("xjzh_wzry_xiaxing_off");
						player.phase("xjzh_wzry_xiaxing");
					},
					subSkill:{"off":{sub:true,},},
				},
				"xjzh_wzry_jinjiu":{
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:6",
					filter:function(event,player){
					    if(game.hasPlayer(function(current){
					        return player.inRange(current);
					    })&&!player.hasSkill("xjzh_wzry_jinjiu_off")) return true;
					    return false;
					},
					mod:{
					    cardUsable:function (card,player,num){
					        if(!player.storage.xjzh_wzry_jinjiu) return num;
					        var target=player.storage.xjzh_wzry_jinjiu;
					        var num2=Math.abs(player.getSeatNum()-target.getSeatNum());
					        if(card.name=="sha"||card.name=="jiu") return num+num2;
					    },
					},
					filterTarget:function(card,player,target){
					    if(target==player) return false;
					    return player.inRange(target);
					},
					content:function(){
					    "step 0"
					    player.storage.xjzh_wzry_jinjiu=target;
						player.popup(target);
						game.swapSeat(player,target);
						player.popup(target);
						if(!player.hasSkill("jiu")){
						    player.useCard({name:'jiu',isCard:true},player,false);
							game.playXH(['xjzh_wzry_jinjiu1','xjzh_wzry_jinjiu2'].randomGet());
						}
						var num=Math.abs(player.getSeatNum()-target.getSeatNum());
						player.draw(num);
						"step 1"
						player.addTempSkill("xjzh_wzry_jinjiu_off");
						"step 2"
						var num=Math.abs(player.getSeatNum()-target.getSeatNum());
					    var evt=event.getParent("phase");
					    if(evt&&evt.getParent){
					        var next=game.createEvent('xjzh_wzry_jinjiu_delete',false,evt.getParent());
					        next.player=player;
					        next.target=target;
					        next.num=num;
					        next.setContent(function(){
						        game.swapSeat(player,target);
						        player.popup(target);
						        if(!player.hasSkill("jiu")){
						            player.useCard({name:'jiu',isCard:true},player,false);
							        game.playXH(['xjzh_wzry_jinjiu1','xjzh_wzry_jinjiu2'].randomGet());
						        }
						        player.draw(num);
						        delete player.storage.xjzh_wzry_jinjiu;
					        });
					    }
					},
					subSkill:{"off":{sub:true,},},
				},
				"xjzh_wzry_jiange":{
					forced:true,
					locked:true,
					charlotte:true,
					superCharlotte:true,
					fixed:true,
					audio:"ext:仙家之魂/audio/skill:6",
					filter:function(event,player){
					    if(!player.hasSkill("xjzh_wzry_xiaxing_off")) return false;
					    if(!player.countCards('h')) return false;
					    return true;
					},
					enable:"phaseUse",
					usable:5,
					group:"xjzh_wzry_jiange_remove",
					content:function(){
				        "step 0"
				        var list=[]
				        event.cards=player.getCards('h');
				        for(var i=0;i<event.cards.length;i++){
				            if(!list.includes(get.type(event.cards[i]))) list.add(get.type(event.cards[i]));
				        }
						var dialog=ui.create.dialog("〖剑歌〗：请选择一种类型的牌弃置之","hidden",[event.cards,'vcard']);
				        player.chooseControl(list,"cancel2").set('ai',function(){
							return list.randomGet();
						}).set('dialog',dialog);
				        "step 1"
				        if(result.control!="cancel2"){
				            var list=[]
				            for(var i=0;i<event.cards.length;i++){
				                if(get.type(event.cards[i])==result.control) list.push(event.cards[i]);
				            }
				            player.discard(list);
				            player.draw(list.length);
				        }else{
				            event.finish();
				        }
						"step 2"
						if(result&&result.length){
						    var cards=result.slice(0);
						    var num=0;
						    if(cards.length==1) return;
						    for(var i=0;i<cards.length-1;i++){
						        var card=cards[i]
						        var card2=cards[i+1]
						        if(get.number(card)==get.number(card2)||get.suit(card)==get.suit(card2)||get.type(card)==get.type(card2)) num++
						    }
						    if(num==cards.length-1){
						        player.draw(cards.length);
						        event.redo();
						    }
						}
					},
					subSkill:{
					    "remove":{
					        trigger:{
					            player:"phaseAfter",
					        },
					        direct:true,
					        priority:-10,
					        sub:true,
					        lastDo:true,
					        filter:function(event,player){
					            return player.hasSkill("xjzh_wzry_xiaxing_off");
					        },
					        content:function(){
					            player.removeSkill("xjzh_wzry_xiaxing_off",true);
					        },
					    },
					},
				},
				"xjzh_wzry_xingchen":{
					trigger:{
					    player:"$logSkill",
					},
					filter(event,player){
						var info=get.info(event.skill);
						if(!lib.translate[event.skill]) return false;
						if(!lib.translate[event.skill+'_info']) return false;
						if(lib.skill.global.includes(event.skill)) return false;
						if(info&&(info.limited||info.juexingji||info.dutySkill||info.equipSkill||info.sub||info.unique)) return false;
						if(info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) return false;
						return true;
					},
					mark:true,
					marktext:"星",
					intro:{
						name:"星辰之力",
						content:"mark",
					},
					locked:true,
					forced:true,
					unique:true,
					audio:"ext:仙家之魂/audio/skill:3",
					init(player){
					    game.playXH('xjzh_wzry_yaoStart');
					},
					group:["xjzh_wzry_xingchen_damage"],
					async content(event,trigger,player){
						await player.addMark("xjzh_wzry_xingchen",1,false);
						game.log(player,"因","#g〖"+get.translation(trigger.skill)+"〗","获得了一个星辰之力");
						if(player.countMark("xjzh_wzry_xingchen")>=3){
							player.clearMark("xjzh_wzry_xingchen");
							player.drawTo(4);
							player.chooseUseTarget({name:"wanjian"});
						}
					},
					subSkill:{
					    "off":{sub:true,},
					    "damage":{
        					trigger:{
        						player:"damageBegin",
        					},
        					forced:true,
        					sub:true,
        					audio:"xjzh_wzry_xingchen",
        					filter(event,player){
        						return !player.hasSkill("xjzh_wzry_xingchen_off");
        					},
        					async content(event,trigger,player){
        					    var obj=new Object();
        					    obj.source=trigger.source||null;
        					    obj.num=trigger.num;
        					    obj.nature=trigger.nature||null;
        						window.xjzh_wzry_xingchen=setTimeout(function(){
        							player.addTempSkill("xjzh_wzry_xingchen_off","damageAfter");
        							game.playXH('xjzh_wzry_xingchenDamage');
        							player.damage(obj.num,obj.nature,obj.source);
        						},15000);
        						game.log(player,"受到来自于",trigger.source,"的",trigger.num,"点伤害转为星削将于15s后结算");
        						trigger.changeToZero();
        					},
        					ai:{
        						effect:{
        							target(card,player,target){
        								if(get.tag(card,"damage")) return 0.7;
        							},
        						},
        					},
					    },
					},
				},
				"xjzh_wzry_liekong":{
			        enable:"phaseUse",
			        usable:1,
                    filterCard(card,player,target){
                        var suit=get.suit(card);
                        for(var i=0;i<ui.selected.cards.length;i++){
                            if(get.suit(ui.selected.cards[i])==suit) return false;
                        }
                        return true;
                    },
                    selectCard:[1,4],
                    position:'he',
                    complexCard:true,
                    filterTarget:lib.filter.notMe,
                    filter(event,player){
                        if(player.countCards("he")) return true;
                        return false;
                    },
                    check(card){
                        return 6-get.value(card)
                    },
                    prompt(event,player){
                        return lib.translate.xjzh_wzry_liekong_info;
                    },
					audio:"ext:仙家之魂/audio/skill:3",
                    async content(event,trigger,player){
                        const [bool,cards]=await event.targets[0].chooseToDiscard("h",[1,event.cards.length],card=>{
                            let suits=new Array();
                            event.cards.slice(0).forEach(card=>{
                                suits.push(get.suit(card));
                            });
                            return suits.includes(get.suit(card));
                        }).set('ai',card=>{
                            return 6-get.value(card);
                        }).forResult('bool','cards');
                        if(bool){
                            var num=event.cards.length-cards.length;
                        }else{
                            var num=event.cards.length
                        }
                        while(num>0){
                            game.delay();
                            if(event.targets[0].isDead()) break;
                            game.playXH(['xjzh_wzry_liekong1','xjzh_wzry_liekong2','xjzh_wzry_liekong3'].randomGet());
                            player.useCard({name:'sha'},event.targets[0],false).set('addCount',false);
                            num-=1
                        }
                    },
                    ai:{
                        order:8,
                        result:{
                            player(card,player,target){
                                if(!player) return;
                                let num=0
                                for(var i=0;i<game.players.length;i++){
						            if(game.players[i].isOut()) continue;
					                if(game.players[i]==player) continue;
					                if(get.attitude(game.players[i],player)<0) num++
					            }
					            return num;
					        },
						    target:-1,
					    },
					},
				},
				//《金庸群侠传·项少龙·穿越》
				"xjzh_wzry_guichen":{
					enable:"phaseUse",
					trigger:{
						player:"dying",
					},
					frequent:true,
					audio:"ext:仙家之魂/audio/skill:3",
					getinfo:function(player){
						var js=player.getCards("j");
						var js2=[];
						for(var k=0;k<js.length;k++){
							var name=js[k].viewAs||js[k].name;
							js2.push(name);
						}
						var isDisabled=[];
						for(var j=1;j<7;j++){
							isDisabled.push(player.isDisabled(j));
						}
						var storage={
							player:player,
							hs:player.getCards("h"),
							es:player.getCards("e"),
							isDisabled:isDisabled,
							hp:player.hp,
							maxHp:player.maxHp,
							_disableJudge:player.storage._disableJudge,
							isTurnedOver:player.isTurnedOver(),
							isLinked:player.isLinked(),
							js:js,
							js2:js2,
						};
						return storage;
					},
					filter:function(event,player){
						if(event.getParent(2).name=="dying"&&event.player==player) return true;
						if(player.storage.xjzh_wzry_guichen&&player.storage.xjzh_wzry_guichen.length) return true;
						return false;
					},
					group:["xjzh_wzry_guichen2"],
					content:function(){
						'step 0'
						event.storage=player.storage.xjzh_wzry_guichen;
						event.doing=event.storage.shift();
						'step 1'
						var hp=event.doing.hp;
						player.hp=hp;
						var hs=player.getCards('he');
						if(hs.length) player.lose(hs)._triggered=null;
						'step 2'
						var hs=event.doing.hs;
						var hs2=[];
						for(var i=0;i<hs.length; i++){
							var card=get.cardPile(function(cardx){
								return cardx==hs[i];
							});
							if(!card){
								card=game.createCard(hs[i]);
							}
							hs2.push(card);
						}
						if(hs2.length) player.directgain(hs2);
						'step 3'
						var isDisabled=event.doing.isDisabled;
						for(var i=0; i<isDisabled.length; i++){
							if(isDisabled[i]==false&&player.isDisabled(i+1)) player.enableEquip(i+1)._triggered=null;
							if(isDisabled[i]==true&&!player.isDisabled(i+1)) player.disableEquip(i+1)._triggered=null;
						}
						'step 4'
						var es=event.doing.es;
						var es2=[];
						for(var i=0; i<es.length; i++){
							var card=get.cardPile(function(cardx){
								return cardx==es[i];
							});
							if(!card){
								card=game.createCard(es[i]);
							}
							es2.push(card);
						}
						if(es2.length) player.directequip(es2);
						'step 5'
						if(player.getStat().skill.xjzh_wzry_liekong>0) player.getStat().skill.xjzh_wzry_liekong=0;
						if(player.getStat().card.sha>0) player.getStat().card.sha=0
						if(player.getStat().card.jiu>0) player.getStat().card.jiu=0
						game.updateRoundNumber();
						"step 6"
						if(window.xjzh_wzry_xingchen) clearTimeout(window.xjzh_wzry_xingchen);
						"step 7"
						player.storage.xjzh_wzry_guichen=false
						player.storage.xjzh_wzry_guichen2=false;
						"step 8"
						if(event.triggername="dying"){
							if(Array.isArray(lib.skill['xjzh_wzry_guichen'].trigger.player)==false){
								lib.skill['xjzh_wzry_guichen'].trigger.player=[];
							}
						}
					},
					ai:{
						order:2,
						result:{
							player:function(card,player,target){
							    var player=_status.event.player
							    if(!player.storage.xjzh_wzry_guichen||!player.storage.xjzh_wzry_guichen.length) return;
							    var num=1
							    var cards=player.getCards('h');
							    for(var i of cards){
							        if(!player.hasUseTarget(i)) num++
							    }
							    return -cards.length+num;
							},
						},
					},
				},
				"xjzh_wzry_guichen2":{
					trigger:{
						player:"phaseUseBegin",
					},
					forced:true,
					unique:true,
					popup:false,
					sub:true,
					filter:function(event,player){
						return !player.storage.xjzh_wzry_guichen2;
					},
					content:function(){
						player.storage.xjzh_wzry_guichen2=true;
						var storage=[];
						storage.push(lib.skill.xjzh_wzry_guichen.getinfo(player));
						player.storage.xjzh_wzry_guichen=storage;
					},
				},
				"xjzh_wzry_jianzhong":{
				    trigger:{
				        global:["damageAfter"],
				    },
				    direct:true,
				    priority:100,
				    locked:true,
				    marktext2:"剑",
					marktext:"<img style=width:33px height:33px src="+lib.assetURL+"extension/仙家之魂/image/icon/xjzh_wzry_jianzhong.png>",
				    intro:{
                        mark:function(dialog,content,player){
                            var cards=player.getExpansions('xjzh_wzry_jianzhong');
                            if(!cards.length) return;
                            var str='增伤几率：'+get.translation(cards.length*8)+'%';
                            dialog.add(str)
                            dialog.add(cards)
                        },
                        markcount:"expansion",
                    },
					unique:true,
					audio:"ext:仙家之魂/audio/skill:2",
                    group:["xjzh_wzry_jianzhong_add"],
                    /*filter:function(event,player){
                        var cards=player.getExpansions('xjzh_wzry_jianzhong');
                        if(player.hasSkill('xjzh_wzry_jianlai_mod')) return false;
                        return cards.length<15;
                    },*/
                    filter:function(event,player){
                        if(event.source ) return player.isFriendsOf(event.source);
                        return player.getExpansions('xjzh_wzry_jianzhong').length<10;
                    },
                    content:function(){
                        /*if(event.triggername=="gameStart"){
                            player.logSkill('xjzh_wzry_jianzhong');
                            event.finish();
                            return;
                        }*/
                        if(player.hasSkill('xjzh_wzry_jianlai_mod')) return;
                        var cards=player.getExpansions('xjzh_wzry_jianzhong');
                        if(10-cards.length<trigger.num){
                            var num=10-cards.length
                        }else{
                            var num=trigger.num
                        }
                        player.addToExpansion(get.cards(num),'gain2').gaintag.add('xjzh_wzry_jianzhong');
                        player.logSkill('xjzh_wzry_jianzhong');
                    },
                    subSkill:{
                        "add":{
                            trigger:{
                                source:"damageBegin1",
                                player:"damageBegin1",
                            },
                            sub:true,
                            direct:true,
                            filter:function(event,player){
                                return player.getExpansions('xjzh_wzry_jianzhong').length<10;
                            },
                            audio:"ext:仙家之魂/audio/skill:2",
                            content:function(){
                                var cards=player.getExpansions('xjzh_wzry_jianzhong');
                                if(trigger.source!=player){
                                    if(cards.length==10&&player.inRange(trigger.source)){
                                        trigger.untrigger();
									    trigger.finish();
									    player.logSkill(trigger.source,'xjzh_wzry_jianzhong_add');
                                    }
                                }else{
                                    if(player.hasSkill('xjzh_wzry_jianlai_mod')){
                                        var num=0.8
                                    }else{
                                        var num=(cards.length/100)*8
                                    }
                                    if(Math.random()<=num){
                                        trigger.num++
									    player.logSkill(trigger.player,'xjzh_wzry_jianzhong_add');
									}
                                }
                            },
                            ai:{
                                effect:{
                                    target:function(card,player,target){
                                        var cards=player.getExpansions('xjzh_wzry_jianzhong');
                                        if(cards.length<10) return;
                                        if(get.tag(card,'damage')) return [0,0];
                                    },
                                },
                            },
                        },
                    },
                },
                "xjzh_wzry_cuijian":{
                    trigger:{
                        player:"useCardAfter",
                    },
                    direct:true,
                    locked:true,
					audio:"ext:仙家之魂/audio/skill:4",
                    filter:function(event,player){
                        var evt=event.getParent("xjzh_wzry_cuijian");
                        if(evt.name=='xjzh_wzry_cuijian') return false;
                        if(!event.cards||!event.cards.length) return false;
                        if(!event.targets||!event.targets.length) return false;
                        if(event.targets.length!=1) return false;
                        if(event.target==player)return false;
                        if(['delay','equip','xjzh_danyao'].includes(get.type(event.card))) return false;
                        if(player.hasSkill('xjzh_wzry_jianlai_mod')) return false;
                        if(!player.inRange(event.targets[0])) return false;
                        return player.hasUseTarget(event.card);
                    },
                    content:function(){
                        var card=game.createCard(trigger.card);
                        var next=player.chooseUseTarget(card,false)
                        next.set('prompt',get.prompt(event.name));
                        next.set('prompt2','视为使用一张'+get.translation(event.card)+'？');
                        next.set('logSkill',event.name);
                    },
                },
                "xjzh_wzry_jianlai":{
                    enable:"phaseUse",
                    locked:true,
					audio:"ext:仙家之魂/audio/skill:4",
                    filter:function(event,player){
                        if(player.getExpansions('xjzh_wzry_jianzhong').length<10) return false;
                        return !player.storage.xjzh_wzry_jianlai;
                    },
                    limited:true,
				    marktext2:"剑来",
					marktext:"<img style=width:33px height:33px src="+lib.assetURL+"extension/仙家之魂/image/icon/xjzh_wzry_jianlai.png>",
                    init:function(player,skill){
                        player.storage.xjzh_wzry_jianlai=false;
                    },
                    content:function(){
                        "step 0"
                        player.storage.xjzh_wzry_jianlai=true;
                        player.awakenSkill('xjzh_wzry_jianlai');
                        player.addTempSkill('xjzh_wzry_jianlai_mod');
                        player.addTempSkill('xjzh_wzry_jianlai_discard');
                        "step 1"
                        var cards=player.getExpansions('xjzh_wzry_jianzhong');
                        player.directgain(cards,'gain2',null,'xjzh_wzry_jianzhong');
                        player.unmarkSkill('xjzh_wzry_jianzhong');
                        "step 2"
                        setTimeout(()=>{
							player.restoreSkill("xjzh_wzry_jianlai");
						},300000);
                    },
                    ai:{
                        combo:'xjzh_wzry_jianzhong',
                        order:function(name,player){
                            var event=_status.event
                            if(player==event.player){
                                if(player.hp<=1&&player.hasFriend()) return 12;
                            }
                            return 0.1;
                        },
                        result:{
                            player:function(target,player){
                                var event=_status.event
                                if(player==event.player){
                                    if(player.hp<=1&&player.hasFriend()) return 12;
                                }
                                return 0.5;
                            },
                        },
                    },
                    subSkill:{
                        "mod":{
                            sub:true,
                            locked:true,
                            charlotte:true,
                            forced:true,
                            firstDo:true,
                            audio:'xjzh_wzry_jianlai',
                            trigger:{
                                player:'useCard1',
                            },
                            filter:function(event,player){
                            	return !event.audioed&&event.getParent().type=='phase';
                            },
                            content:function(){
                                trigger.audioed=true;
                            },
                            mod:{
                                cardUsable:function (card,player,num){
                                    return Infinity;
                                },
                                globalFrom:function(from,to,distance){
                                    return distance-Infinity;
                                }
                            },
                        },
                        "discard":{
                            sub:true,
                            locked:true,
                            charlotte:true,
                            direct:true,
                            priority:99,
                            trigger:{
                                player:"phaseDiscardBefore",
                            },
                            filter:function(event,player){
                                if(player.countCards('h',function(card){
                                    return card.hasGaintag('xjzh_wzry_jianzhong');
                                })) return true;
                                return false;
                            },
                            content:function(){
                                var cards=player.getCards('hs',function(card){
                                    return card.hasGaintag('xjzh_wzry_jianzhong');
                                });
                                player.addToExpansion(cards,'gain2').gaintag.add('xjzh_wzry_jianzhong');
                            },
                        },
                    },
                },
			    "xjzh_wzry_bieyue":{
				    trigger:{
				        player:['turnOverBefore','phaseJudgeBefore','phaseDrawBefore','phaseDiscardBefore'],
			    	},
				    preHidden:true,
				    locked:true,
				    notemp:true,
				    unique:true,
			    	init:function(player){
				        player.addMark("xjzh_wzry_bieyue",4,false);
				        player.markSkill("xjzh_wzry_bieyue");
				        player.update();
				        setInterval(function(){
					        if(player.countMark("xjzh_wzry_bieyue")<4){
					            player.addMark('xjzh_wzry_bieyue',1,false);
					            player.markSkill("xjzh_wzry_bieyue");
					        }
					    },50000);
				    },
				    marktext:"月",
				    intro:{
				        name:"别月",
				    },
			    	filter:function(event,player){
			    	    if(!player.hasMark("xjzh_wzry_bieyue")) return false;
				        if(event.name=='phaseJudge'){
				            return player.countCards('j');
				        }
			    	    if(event.name=='phaseDiscard'){
				            return player.needsToDiscard();
				        }
				        if(event.name=='phaseDraw'){
				            return !event.cancelled&&!event.skiped;
				        }
				        if(event.name=='turnOver'){
				            if(player.isTurnedOver()) return false;
				            return true;
				        }
			    		return false;
			    	},
			    	prompt:function(event,player){
				        var evt=event.name
				        var str="〖别月〗："
				        if(evt=="phaseJudge") str+="是否移除一个“月”跳过判定阶段？";
				        if(evt=="phaseDiscard") str+="是否移除一个“月”跳过弃牌阶段？";
				        if(evt=="phaseDraw") str+="是否移除一个“月”额外摸一张牌？";
				        if(evt=="turnOver") str+="是否移除一个“月”跳过翻面？";
				        return str;
			    	},
		    		check:function(event,player){
				        var evt=event.name
				        if(evt=="phaseJudge"){
				            var cards=player.getCards('j');
				            var num=0
				            for(var i of cards){
				                if(get.tag(i,'damage')||get.tag(i,'skip')) num++
				            }
				            return num;
				        }
			    	    else if(evt=="phaseDiscard"){
			    	        var num2=0
				            if(player.needsToDiscard()){
				                for(var i of player.getCards('h')){
				                    num2+=get.value(i)/3
				                }
				            }
				            return num2;
				        }
				        else if(evt=="phaseDraw"){
				            if(player.countMark("xjzh_wzry_bieyue")>1) return 1;
				        }
				        else if(evt=="turnOver"){
				            if(player.isTurnedOver()) return 1;
				        }
			    	    return 0.5;
			    	},
				    content:function(){
				        player.removeMark('xjzh_wzry_bieyue',1,false);
				        if(trigger.name=="phaseDraw"){
				            trigger.num++
				            game.log(player,"移除了一个“月”额外摸了","#y1","张牌");
				            event.finish();
				            return;
			    	    }
			    	    else if(trigger.name=="turnOver"){
			    	        if(player.isTurnedOver()){
			    	            player.turnOver(false);
			    	        }else{
			    	            trigger.cancel();
			    	        }
			    	        player.turnOver(false);
			    	        game.log(player,"移除了一个“月”解除了","#y翻面");
				            event.finish();
				            return;
			    	    }
				    	trigger.cancel();
			    		var str="";
				    	if(trigger.name=="phaseJudge") str="#y判定阶段";
			    		str="#y弃牌阶段";
					    game.log(player,"移除了一个“月”跳过了",str);
			    	},
		    		ai:{
				        threaten:3,
			    		expose:0.2,
			    		notemp:true,
			    		result:{
			    		    player:function(player){
			    		        if(player.storage.xjzh_wzry_huanhai==true){
			    		            if(player.countMark("xjzh_wzry_bieyue")==1){
			    		                var num=game.filterPlayer(function(current){
			    		                    return current.isOut()&&player.isFriendsOf(current);
			    		                });
			    		                var num2=game.countPlayer(function(current){
			    		                    return current.isOut()&&player.isEnemiesOf(current);
			    		                });
			    		                if(num<=num2||player.hujia>=2) return -10;
			    		            }
			    		            return lib.skill.xjzh_wzry_bieyue.check.apply(this,arguments);
			    		        }
			    		    },
			    		},
			    	},
	    		},
			    "xjzh_wzry_shunhua":{
				    enable:"phaseUse",
			    	filter:function(event,player){
			    	    if(!game.hasPlayer(function(current){return !current.hasMark("xjzh_wzry_bieyue")&&current!=player})) return false;
			    		return player.countMark("xjzh_wzry_bieyue")>0;
			    	},
			    	prompt:function(event,player){
			    	    var player=_status.event.player
			    	    var num=player.countMark("xjzh_wzry_bieyue");
				        return "〖瞬华〗:选择至多"+get.translation(num)+"个目标令其各获得一个“月”标记";
			    	},
			    	filterTarget:function(card,player,target){
			    	    return target!=player&&!target.hasMark("xjzh_wzry_bieyue");
			    	},
			    	selectTarget:function(){
			    	    var player=_status.event.player
			    	    return[1,player.countMark("xjzh_wzry_bieyue")];
			    	},
				    content:function(){
				        target.addMark("xjzh_wzry_bieyue",1);
				        player.removeMark("xjzh_wzry_bieyue",1,false);
			    	},
		    		ai:{
				        order:8,
				        result:{
				            player:1,
				            target:-1,
				        },
			    	},
	    		},
	    	    "xjzh_wzry_liuguang":{
	    	        mod:{
                        targetInRange:function (card,player,target){
                            if(card.name=='sha'){
                                if(target.hasMark('xjzh_wzry_bieyue')&&target!=player) return true;
                            }
                        },
                    },
                    trigger:{
                        player:"useCardToPlayer",
                    },
                    forced:true,
                    priority:-2,
                    popup:false,
                    //usable:1,
                    notemp:true,
                    unique:true,
                    filter:function(event,player){
                        if(!event.targets||!event.targets.length) return false;
                        if(get.name(event.card)!='sha') return false;
                        var info=get.info(event.card);
                        if(info.allowMultiple==false) return false;
                        if(info.multitarget) return false;
                        if(player.hasSkill('xjzh_wzry_liuguang_off')) return false;
                        return true;
                    },
                    content:function(){
                        "step 0"
                        player.addTempSkill("xjzh_wzry_liuguang_off","shaAfter");
                        var targets=game.filterPlayer(function(current){return current.hasMark("xjzh_wzry_bieyue")&&current!=player});
                        if(targets.length<=0){
                            event.finish();
                            return;
                        }
                        event.targets=targets.slice(0);
                        "step 1"
                        if(event.targets.length){
                            event.targetx=event.targets.shift();
                            event.targetx.chooseCard('he',1).set('ai',function(card){
                                var att=get.attitude(player,event.targetx);
                                if(event.targetx.countCards('h','tao')||event.targetx.countCards('h','shan')) return 0;
                                if(att>0){
                                    return 8-get.value(card);
                                }
                                return 4-get.value(card);
                            });
                        }
                        "step 2"
                        if(result.bool){
                            player.gain(result.cards[0],event.targetx,'gain2');
                        }else{
                            event.targetx.say("否");
                            game.delayx(1.5);
                            trigger.targets.push(event.targetx);
                        }
                        "step 3"
                        player.logSkill('xjzh_wzry_liuguang',event.targetx);
                        event.targetx.removeMark("xjzh_wzry_bieyue",1);
                        if(event.targets.length){
                            event.goto(1);
                        }else{
                            event.finish();
                            return;
                        }
                    },
                    ai:{
                        unequip:true,
                        notemp:true,
				    	skillTagFilter:function(player,tag,arg){
					    	if(!arg.target.hasMark("xjzh_wzry_bieyue")) return false;
				    	},
                    },
                    subSkill:{off:{sub:true,},},
	    		},
	    	    "xjzh_wzry_liuguang2":{
	    	        mod:{
						globalTo:function(from,to,distance){
							return distance+1;
						},
                        targetInRange:function (card,player,target){
                            return true;
                        },
                        cardUsable:function(card,player,num){
							if(card.name=="sha"||card.name=="jiu" ) return num*2;
						},
					},
                    trigger:{
                        player:"useCardToPlayer",
                    },
                    forced:true,
                    priority:-2,
                    //usable:1,
                    notemp:true,
                    unique:true,
                    filter:function(event,player){
                        if(!event.targets||!event.targets.length) return false;
                        if(get.name(event.card)!='sha') return false;
                        var info=get.info(event.card);
                        if(info.allowMultiple==false) return false;
                        if(info.multitarget) return false;
                        if(player.hasSkill('xjzh_wzry_liuguang2_off')) return false;
                        return true;
                    },
                    content:function(){
                        "step 0"
                        player.addTempSkill("xjzh_wzry_liuguang2_off","shaAfter");
                        trigger.target.chooseCard('he',1).set('ai',function(card,player,target){
                            var player=_status.event.player
                            var target=trigger.targets[0]
                            var att=get.attitude(player,target);
                            if(target.countCards('h','tao')||target.countCards('h','shan')) return 0;
                            if(att>0){
                                return 8-get.value(card);
                            }
                            return 4-get.value(card);
                        });
                        "step 1"
                        if(result.bool){
                            player.gain(result.cards[0],trigger.target,'gain2');
                        }else{
                            targetx.say("否");
                            game.delayx(1.5);
                            trigger.targets.push(trigger.target);
                        }
                    },
                    subSkill:{off:{sub:true,},},
                    ai:{
                        unequip:true,
                        notemp:true,
                    },
	    		},
	    		"xjzh_wzry_huanhai":{
	    		    enable:"phaseUse",
	    		    limited:true,
	    		    unique:true,
					skillAnimation:true,
					animationColor:"water",
					animationStr:"幻海映月",
	    		    filterTarget:function(card,player,target){
	    		        return target!=player;
	    		    },
	    		    init:function(player){
	    		        player.storage.xjzh_wzry_huanhai=false;
	    		        player.storage.xjzh_wzry_huanhai_remove=[]
	    		    },
	    		    filter:function(event,player){
			    	    if(!player.hasMark("xjzh_wzry_bieyue")) return false;
			    	    if(game.roundNumber<=1&&player.hp>1) return false;
	    		        return !player.storage.xjzh_wzry_huanhai;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        player.awakenSkill('xjzh_wzry_huanhai');
	    		        player.storage.xjzh_wzry_huanhai=true;
	    		        var players=game.filterPlayer(function(current){return current.hasMark('xjzh_wzry_bieyue')&&current!=player});
	    		        for(var i of players){
	    		            i.clearMark("xjzh_wzry_bieyue",false);
	    		        }
	    		        if(player.countMark("xjzh_wzry_bieyue")<4) player.addMark("xjzh_wzry_bieyue",4-player.countMark("xjzh_wzry_bieyue"));
	    		        "step 1"
	    		        var players=game.filterPlayer(function(current){return current!=target&&current!=player});
	    		        var list=[]
	    		        for(var i of players){
	    		            list.push(i)
	    		            i.classList.add('out');
	    		            game.log(i,"因","#y〖幻海〗","暂时离开游戏");
	    		        }
	    		        player.storage.xjzh_wzry_huanhai_remove=list.slice(0);
	    		        "step 2"
	    		        player.addSkill("xjzh_tongyong_baiban");
						player.addSkill("xjzh_wzry_liuguang2");
						player.addSkill("xjzh_wzry_huanhai_hujia");
						player.addSkill("xjzh_wzry_huanhai_remove");
						var skills=[
					    	"xjzh_wzry_shunhua",
				    		"xjzh_wzry_liuguang"
						]
						player.storage['xjzh_tongyong_baiban'].addArray(skills);
						"step 3"
	    		        player.changeHujia(player.hp);
	    		    },
	    		    ai:{
	    		        order:3,
	    		        result:{
	    		            player:function(player,target){
	    		                var att=get.attitude(target,player);
	    		                if(att<=0){
	    		                    if(player.hp>target.hp) return 2;
	    		                    return 1;
	    		                }
	    		                return 0;
	    		            },
	    		            target:function(player,target){
	    		                var att=get.attitude(target,player);
	    		                if(att<=0){
	    		                    if(player.hp>target.hp) return -2;
	    		                    return -1;
	    		                }
	    		                return 0;
	    		            },
	    		        },
	    		    },
	    		    subSkill:{
	    		        "hujia":{
	    		            trigger:{
	    		                source:"damageAfter",
	    		            },
	    		            direct:true,
	    		            priority:-3,
	    		            sub:true,
	    		            content:function(){
	    		                player.changeHujia(trigger.num);
	    		            },
	    		        },
	    		        "remove":{
	    		            trigger:{
	    		                global:"dieAfter",
	    		                player:"xjzh_wzry_bieyueAfter",
	    		            },
	    		            forced:true,
	    		            priority:-3,
	    		            sub:true,
	    		            forceDie:true,
	    		            skillAnimation:true,
	    		            animationColor:"water",
	    		            animationStr:"幻海映月",
	    		            filter:function(event,player){
	    		                if(!player.storage.xjzh_wzry_huanhai) return false;
	    		                if(event.name=="xjzh_wzry_bieyue"&&player.hasMark("xjzh_wzry_bieyue")) return false;
	    		                if(event.name=="die"&&event.player.isAlive()) return false;
	    		                return true;
	    		            },
	    		            content:function(){
	    		                "step 0"
	    		                var players=player.storage.xjzh_wzry_huanhai_remove
	    		                for(var i of players){
	    		                    i.classList.remove('out');
	    		                    game.log(i,"回到了游戏");
	    		                }
	    		                game.log(players);
	    		                delete player.storage.xjzh_wzry_huanhai_remove
	    		                "step 1"
	    		                if(trigger.player!=player){
	    		                    var num=player.hujia
	    		                    player.addMark("xjzh_wzry_bieyue",num,false);
	    		                    player.changeHujia(-num);
	    		                }
	    		                "step 2"
	    		                delete player.storage['xjzh_tongyong_baiban']
	    		                player.removeSkill("xjzh_tongyong_baiban");
	    		                player.removeSkill("xjzh_wzry_liuguang2");
	    		                player.removeSkill("xjzh_wzry_huanhai_hujia");
	    		                player.removeSkill("xjzh_wzry_huanhai_remove");
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_wzry_xunshou":{
	    		    trigger:{
	    		        source:"damageAfter",
	    		    },
	    		    forced:true,
	    		    locked:true,
					audio:"ext:仙家之魂/audio/skill:3",
	    		    filter:function(event,player){
	    		        if(event.player==player) return false;
	    		        /*var suits=[]
	    		        if(event.player.getExpansions('xjzh_wzry_xunshou').length){
	    		            var cards=event.player.getExpansions('xjzh_wzry_xunshou');
	    		            for(var i of cards){
	    		                suits.add(get.suit(i));
	    		            }
	    		        }
	    		        return event.player.countCards('he',function(card){
	    		            return !suits.includes(get.suit(card));
	    		        });*/
	    		        return true;
	    		    },
	    		    marktext:"巡",
				    intro:{
				        content:"expansion",
				        markcount:"expansion",
				    },
				    onremove:function(player,skill){
				        var players=game.filterPlayer(function(current){
				            return current.getExpansions(skill).length;
				        });
				        for(var i=0;i<players.length;i++){
				            var cards=players[i].getExpansions(skill);
				            players[i].loseToDiscardpile(cards);
				        }
				    },
	    		    content:function(){
	    		        "step 0"
	    		        var suits=[]
	    		        if(trigger.player.getExpansions('xjzh_wzry_xunshou').length){
	    		            var cards=trigger.player.getExpansions('xjzh_wzry_xunshou');
	    		            for(var i of cards){
	    		                suits.add(get.suit(i));
	    		            }
	    		        }
	    		        trigger.player.chooseCard(get.prompt('xjzh_wzry_xunshou'),'he',function(card){
	    		            return !suits.includes(get.suit(card));
	    		        }).set('ai',function(card){
	    		            var att=get.attitude(player,_status.event.getTrigger().player);
	    		            if(att>0) return 8-get.value(card)  
	    		            return 4-get.value(card);
	    		        }).set('suits',suits);
	    		        "step 1"
	    		        if(result.bool){
	    		            var card=result.cards[0]
	    		            trigger.player.addToExpansion(card,"gain2",trigger.player).gaintag.add("xjzh_wzry_xunshou");
	    		        }else{
	    		            player.draw(2);
	    		        }
	    		        "step 2"
	    		        if(trigger.player.getExpansions('xjzh_wzry_xunshou').length>=4){
	    		            trigger.player.damage(1,player,'nocard');
	    		            var cards=trigger.player.getExpansions('xjzh_wzry_xunshou');
	    		            trigger.player.loseToDiscardpile(cards);
	    		            trigger.player.addTempSkill('baiban','damageAfter');
	    		        }
	    		    },
	    		},
	    		"xjzh_wzry_konglie":{
	    		    enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:3",
	    		    filter:function(event,player){
	    		        if(player.hasSkill('xjzh_wzry_konglie_jin')) return false;
				        return game.hasPlayer(function(current){
				            return current.getExpansions('xjzh_wzry_xunshou').length;
				        });
	    		    },
	    		    filterTarget:function(card,player,target){
	    		        return target.getExpansions('xjzh_wzry_xunshou').length;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        var cards=target.getExpansions('xjzh_wzry_xunshou');
	    		        player.chooseCardButton(get.prompt('xjzh_wzry_konglie'),cards,1).set('filterButton',function(button){
							return _status.event.player.hasUseTarget(button.link);
						}).set('ai',function(button){
							var player=_status.event.player;
							if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
							return 0;
						});
						"step 1"
						if(result.bool){
						    if(player.hasUseTarget(result.links[0])){
								player.chooseUseTarget(result.links[0],true);
							}
						}else{
						    event.finish();
						    return;
						}
						"step 2"
						if(!target.inRangeOf(player)){
						    player.addTempSkill('xjzh_wzry_konglie_jin');
						}
					},
					ai:{
					    order:8,
					    result:{
					        player:function(player,target){
					            var cards=target.getExpansions('xjzh_wzry_xunshou');
					            var num=0
					            for(var card of cards){
					                if(player.hasUseTarget(card)) return num+=player.getUseValue(card);
					            }
					            if(target.inRangeOf(player)) return num;
					            return 0.1;
					        },
						},
					},
	    		},
				"xjzh_wzry_daofeng":{
					trigger:{
						player:"phaseBegin",
					},
					forced:true,
					mark:true,
					locked:true,
					marktext:"☯",
					zhuanhuanji:true,
					intro:{
						name:"刀锋",
						content:function(storage,player,skill){
							if(player.storage.xjzh_wzry_daofeng==true) return '每个回合开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。';
							return '当你受到伤害或体力流失时，若场上没有“巡”且数值不小于2，你可以防止之，然后令一名角色将一张牌置于武将牌上称为“巡”。';
						},
					},
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
						"step 0"
						var list=[player.getNext(),player.getPrevious()]
						for(var i of list){
						    player.gainPlayerCard("请选择"+get.translation(i)+"的牌",i,1,true).set('ai',function(button){
							    if(get.attitude(i,player)<0){
								    return get.value(button.link);
							    }
						    	else{
					    			return -get.value(button.link);
				    			}
				    		});
						}
						"step 1"
						if(player.storage.xjzh_wzry_daofeng==true){
							player.storage.xjzh_wzry_daofeng=false;
							player.addTempSkill('xjzh_wzry_daofeng_2','phaseUseAfter');
						}else{
							player.storage.xjzh_wzry_daofeng=true;
							player.addTempSkill('xjzh_wzry_daofeng_1','phaseUseAfter');
						};
					},
					subSkill:{
						"1":{
						    trigger:{
						        global:"phaseZhunbeiBegin",
						    },
							sub:true,
					        audio:"ext:仙家之魂/audio/skill:2",
							check:function(event,player){
							    /*return game.hasPlayer(function(current){
							        return player.isFriendsOf(current);
							    });*/
							    return player.getFriends().length;
							},
							prompt:"〖刀锋〗：弃置场上4张花色不一致的“巡”对一名角色造成等量伤害",
							filter:function(event,player){
							    var players=game.filterPlayer(function(current){
				                    return current.getExpansions('xjzh_wzry_xunshou').length;
				                });
				                var list=[]
				                for(var i=0;i<players.length;i++){
				                    var cards=players[i].getExpansions('xjzh_wzry_xunshou');
				                    list.push(cards);
				                }
				                var suits=[]
				                for(var i of list){
				                    if(!suits.includes(get.suit(i))) suits.add(get.suit(i));
				                }
				                if(suits.length<4) return false;
				                return true;
							},
							content:function(){
							    "step 0"
							    var players=game.filterPlayer(function(current){
				                    return current.getExpansions('xjzh_wzry_xunshou').length;
				                });
				                event.list=[]
				                for(var i=0;i<players.length;i++){
				                    var cards=players[i].getExpansions('xjzh_wzry_xunshou');
				                    event.list.push(cards);
				                }
				                var suits=[]
				                for(var i of event.list){
				                    if(!suits.includes(get.suit(i))) suits.add(get.suit(i));
				                }
				                if(suits.length<4) return;
				                player.chooseCardButton(event.list,4,true).set('filterButton',function(button){
				                    var suit=get.suit(button.link);
				                    for(var i=0;i<ui.selected.buttons.length;i++){
				                        if(get.suit(ui.selected.buttons[i].link)==suit) return false;
				                    }
				                    return true;
				                }).set('complexCard',true);
				                "step 1"
				                if(result.links){
				                    player.loseToDiscardpile(result.links);
				                    player.chooseTarget('〖刀锋〗：对一名角色造成4点伤害',function(card,player,target){
				                        return target!=player;
				                    }).set('ai',function(target){
				                        return -get.attitude(player,target);
				                    });
				                }
				                "step 2"
				                if(result.bool&&result.targets.length){
				                    result.targets[0].damage(4,player,'nocard');
				                }
							},
						},
						"2":{
						    trigger:{
						        player:["damageBegin1","loseHpBegin"],
						    },
						    check:function(event,player){return 1;},
							sub:true,
							filter:function(event,player){
							    if(event.num<=1) return false;
							    return !game.hasPlayer(function(current){
				                    return current.getExpansions('xjzh_wzry_xunshou').length;
				                });
							},
					        audio:"ext:仙家之魂/audio/skill:2",
							prompt:"〖刀锋〗：是否防止即将受到的伤害/体力流失，然后令一名角色将一张牌置于武将牌上称为“巡”",
							content:function(){
							    "step 0"
							    trigger.changeToZero();
							    "step 1"
				                player.chooseTarget('〖刀锋〗：令一名角色将一张牌置于武将牌上称为“巡”',true,function(card,player,target){
				                    return target!=player;
				                }).set('ai',function(target){
				                    if(target==player.getNext()||target==player.getPrevious()) return 0.5;
				                    return -get.attitude(player,target);
				                });
				                "step 2"
				                if(result.bool){
				                    event.target=result.targets[0]
				                    var suits=[]
                	    		    if(event.target.getExpansions('xjzh_wzry_xunshou').length){
	    		                        var cards=event.target.getExpansions('xjzh_wzry_xunshou');
	    		                        for(var i of cards){
	    		                            suits.add(get.suit(i));
	    		                        }
	    		                    }
	    		                    event.target.chooseCard(get.prompt('xjzh_wzry_xunshou'),'he',function(card){
	    		                        return !suits.includes(get.suit(card));
	    		                    }).set('ai',function(card){
	    		                        var att=get.attitude(player,_status.event.getTrigger().player);
	    		                        if(att>0) return 8-get.value(card)  
	    		                        return 4-get.value(card);
	    		                    }).set('suits',suits);
				                }
				                "step 3"
				                if(result.cards.length){
				                    event.target.addToExpansion(result.cards,"gain2",event.target).gaintag.add("xjzh_wzry_xunshou");
				                }else{
				                    player.draw(2);
				                }
							},
						},
					},
	    		},
	    		
	    		//暗黑破坏神
	    		"xjzh_diablo_hunhuo":{
	    		    trigger:{
	    		        global:["die","dying"],
	    		    },
	    		    forced:true,
	    		    locked:true,
	    		    fixed:true,
	    		    unique:true,
	    		    charlotte:true,
	    		    superCharlotte:true,
	    		    priority:3,
	    		    firstDo:true,
	    		    mark:true,
	    		    notemp:true,
	    		    forceDie:true,
	    		    marktext:"死亡之书",
	    		    intro:{
	    		        name:"死亡之书",
	    		        mark:function(dialog,storage,player){
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                            if(list==null) return "没有灵魂";
                            var str=list.slice(0,-2);
                            var name=str.split('::');
							if(name.length){
								if(player.isUnderControl(true)){
									dialog.addSmall([name,'character']);
								}
								else{
									dialog.addText('共有'+get.cnNumber(name.length)+'个“灵魂”');
								}
							}
							else{
								return '没有灵魂';
							}
	    		        },
						content:function(storage,player){
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo")
                            if(list==null) return "没有灵魂";
                            var str=list.slice(0,-2);
                            var name=str.split('::');
							return '共有'+get.cnNumber(name.length)+'个“灵魂”'
						},
						markcount:function(storage,player){
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
							if(list==null) return 0;
                            var str=list.slice(0,-2);
                            var name=str.split('::');
                            return name.length;
						},
	    		    },
	    		    derivation:["xjzh_diablo_haoling"],
	    		    getSkillList:function(player){
	    		        if(!player.hasSkill('xjzh_diablo_hunhuo')){
	    		            player.removeAdditionalSkill('xjzh_diablo_hunhuo');
	    		            return;
	    		        }
	    		        var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                        if(list==null) return;
                        var str=list.slice(0,-2);
                        var name=str.split('::');
                        if(!name.length) return;
                        var skills2=lib.skill.xjzh_diablo_hunhuo.derivation.slice(0);
                        var list2=[]
                        for(var i of name){
                            if(lib.character[i]==undefined) continue;
                            if(lib.character[i][3]){
                                var skills=lib.character[i][3]
                            }else{
                                continue;
                            }
                            for(var j of skills){
                                var info=get.info(j)
                                var num=0
                                if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.dutySkill){
                                    list2.push(j);
                                    num++
                                }
                                if(num>0) break;
                            }
                        }
                        if(name.length>=2){
                            for(var i=0;i<Math.floor(name.length/3);i++){
                                list2.push(skills2[i]);
                            }
                        }
                        if(list2.length) player.addAdditionalSkill('xjzh_diablo_hunhuo',list2);
	    		    },
	    		    removeStorage:function(player){
	    		        var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                        if(list==null) return;
                        var str=list.slice(0,-2);
                        var name=str.split('::');
                        if(!name.length) return;
                        var characters=lib.characterPack['Beijijinqu']
                        var bool=false;
	    		        if(characters!=undefined){
	    		            for(var i in characters){
	    		                if(name.includes(i)) bool=true;
	    		            }
	    		        }
	    		        if(bool==true){
	    		            window.localStorage.removeItem("xjzh_diablo_hunhuo");
	    		            alert('检测到你的死灵之书内存在非法武将，已为你重置存档，游戏即将重启');
	    		            setTimeout(function(){
				                game.reload();
			                },3000);
	    		        }
	    		    },
	    		    init:function(player){
	    		        lib.skill.xjzh_diablo_hunhuo.removeStorage(player);
	    		        lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
	    		    },
	    		    filter:function(event,player){
	    		        if(event.player==player){
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                            if(list==null) return;
                            var str=list.slice(0,-2);
                            var name=str.split('::');
                            if(!name.length) return false;
                            return !name.includes(event.player);
	    		        }
	    		        if(event.source&&event.source==player&&event.player!=player&&event.player.isDead()){
	    		             return game.me==player;
	    		        }
	    		        return false;
	    		    },
	    		    group:["xjzh_diablo_hunhuo_use"],
	    		    async content(event,trigger,player){
	    		        if(trigger.source&&trigger.source==player&&trigger.player!=player&trigger.player.isDead()){
							
	    		            var object2=[]
	    		            var bool2=false;
	    		            if(player.name) object2.push(player.name);
	    		            if(player.name1) object2.push(player.name1);
	    		            if(player.name2) object2.push(player.name2);
	    		            for(var i of object2){
	    		                if(i.indexOf("xjzh_diablo_lamasi")!=-1) bool2=true;
	    		            }
	    		            if(!bool2) return;
	    		            if(window.localStorage){
	    		                //获取阵亡角色武将名
	    		                var name=trigger.player.name
	    		                var characters=lib.characterPack['Beijijinqu']
	    		                if(characters!=undefined){
	    		                    for(var i in characters){
	    		                        if(name==i) return;
	    		                    }
	    		                }
	    		                //读取已有存档
	    		                var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
	    		                if(list!=null){
	    		                    //alert("有");
	    		                    //检测存档内是否已包含当前武将名，若有则跳过
	    		                    if(list.indexOf(name)!=-1) return;
	    		                    list+=name+"::"
	    		                    obj=list
	    		                }else{
	    		                    //alert("无");
	    		                    var str=""
	    		                    var obj=name+"::"
	    		                    str+=obj
	    		                    obj=str
	    		                }
	    		                //将数组转为字符串
	    		                //var setData=JSON.stringify(obj);
	    		                //将数据写入存档
	    		                window.localStorage.setItem("xjzh_diablo_hunhuo",obj);
	    		                game.log(player,"将"+get.translation(trigger.player)+"的灵魂收入了死亡之书");
	    		                lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
	    		            }else{
	    		                alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
	    		            }
	    		            event.finish();
	    		            return;
	    		        }
	    		        else if(trigger.player==player&&trigger.name!="die"){
	    		            if(!window.localStorage){
	    		                alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
	    		                return;
	    		            }
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
	    		            if(list==null) return;
                            var str=list.slice(0,-2);
	    		            var name=str.split('::');
	    		            player.chooseButton(true).set('ai',function(button){
	    		                return Math.random();
	    		            }).set('createDialog',['请选择一个灵魂与你交换身体',[name,'character']]);
	    		        }
	    		        "step 1"
	    		        if(result.bool){
	    		            var link=result.links[0]
	    		            player.reinit(player.name,link,[player.maxHp,player.maxHp]);
	    		            var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                            var str=list.slice(0,-2);
	    		            var name=str.split('::');
	    		            name.remove(link);
	    		            if(name.length){
	    		                var setData=name.join("::");
	    		                setData+="::"
	    		                window.localStorage.setItem("xjzh_diablo_hunhuo",setData);
	    		            }else{
	    		                window.localStorage.removeItem("xjzh_diablo_hunhuo");
	    		            }
	    		            player.removeSkill("xjzh_diablo_hunhuo",true);
	    		            lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
	    		        }
	    		    },
	    		    ai:{
	    		        notemp:true,
	    		    },
	    		    subSkill:{
	    		        "use":{
	    		            enable:"phaseUse",
	    		            usable:1,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                                if(list==null) return;
                                var str=list.slice(0,-2);
                                var name=str.split('::');
                                if(!name.length) return false;
                                return game.dead.length;
	    		            },
	    		            content:function(){
	    		                "step 0"
	    		                var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                                if(list==null) return;
                                var str=list.slice(0,-2);
                                var name=str.split('::');
                                player.chooseButton(ui.create.dialog('〖魂火〗：请选择你将要唤醒的灵魂',[name,'character'],'hidden'),function(button){
	    		                    return get.rank(button.link,true);
	    		                });
	    		                "step 1"
	    		                if(result.bool){
	    		                    var list=[];
	    		                    event.targets=result.links[0]
	    		                    for(var i=0;i<game.dead.length;i++){
	    		                        list.push(game.dead[i].name);
	    		                    }
	    		                    player.chooseButton(ui.create.dialog('〖魂火〗：请选择一副灵柩',[list,'character'],'hidden'),function(button){
	    		                        return 1;
	    		                    });
	    		                }
	    		                "step 2"
	    		                if(result.bool&&result.links){
	    		                    for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
	    		                    event.dead=game.dead[i];
	    		                    event.dead.revive(event.targets.maxHp,false);
	    		                    var info=lib.character[event.targets]
	    		                    if(typeof info[2]=="string"){
	    		                        info[2]=Array.from(info[2])
	    		                        var hp=info[2][2]
	    		                    }else{
	    		                        var hp=info[2]
	    		                    }
	    		                    event.dead.reinit(event.dead.name,event.targets,[hp,hp]);
	    		                    event.dead.init(event.targets);
	    		                    event.dead.directgain(get.cards(2));
	    		                    var id=player.identity
	    		                    if(id=="zhu"){
	    		                        event.dead.identity="zhong";
	    		                        event.dead.setIdentity("zhong");
	    		                        event.dead.showIdentity();
	    		                    }else{
	    		                        event.dead.identity=id;
	    		                        event.dead.setIdentity(id);
	    		                        event.dead.showIdentity();
	    		                    }
	    		                    event.dead.addSkill("xjzh_diablo_hunhuo_shibao");
	    		                    event.dead.$zhaohuan();
	    		                    if(!player.storage.xjzh_diablo_hunhuo_use) player.storage.xjzh_diablo_hunhuo_use=[];
	    		                    player.storage.xjzh_diablo_hunhuo_use.push(event.dead);
	    		                    //game.log(player.storage.xjzh_diablo_hunhuo_use);
	    		                    game.log(player,"唤醒了"+get.translation(event.targets)+"的灵魂");
	    		                }
	    		            },
	    		            ai:{
	    		                order:8,
	    		                expose:0.8,
	    		                result:{
	    		                    player:1,
	    		                },
	    		            },
	    		        },
	    		        "shibao":{
	    		            trigger:{
	    		                player:"dieAfter",
	    		                global:["phaseAfter",]
	    		            },
	    		            forceDie:true,
	    		            direct:true,
	    		            priority:-101,
	    		            lastDo:true,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(event.name=="die"){
	    		                    var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                                    if(list==null) return;
                                    var str=list.slice(0,-2);
                                    var name=str.split('::');
                                    return name.includes(player);
                                }
                                if(event.name=="phase"){
                                    var id=game.filterPlayer(function(current){
                                        return current.name=="xjzh_diablo_lamasi"||current.name1=="xjzh_diablo_lamasi"||current.name2=="xjzh_diablo_lamasi";
                                    }).shift().identity
                                    if(id=="zhu"){
                                        if(player.identity!="zhong") return true;
                                    }
                                    return player.identity!=id;
                                }
                                return false;
	    		            },
	    		            content:function(){
	    		                var previous=player.getPrevious();
	    		                var next=player.getNext();
	    		                var list=[
						            previous,
						            next
					        	];
					        	for(var i of list){
					        	    if(i.name=="xjzh_diablo_lamasi") continue;
					        	    i.damage("nosource","nocard");
					        	}
					        	player.die()._triggered=null;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_haoling":{
	    		    enable:"phaseUse",
	    		    locked:true,
	    		    charlotte:true,
	    		    usable:1,
	    		    prompt:"〖号令〗：选择一名被你唤醒且正面朝上的角色",
	    		    check:function(event,player){
	    		        return 1;
	    		    },
	    		    filterTarget:function(card,player,target){
	    		        if(player.storage.xjzh_diablo_hunhuo_use) return player.storage.xjzh_diablo_hunhuo_use.includes(target);
	    		        return false;
	    		    },
	    		    filter:function(event,player){
	    		        return player.storage.xjzh_diablo_hunhuo_use&&player.storage.xjzh_diablo_hunhuo_use.length;
	    		    },
	    		    content:function(){
	    		        target.turnOver(true);
	    		        player.insertPhase();
	    		    },
	    		    ai:{
	    		        order:8,
	    		        result:{
	    		            player:1,
	    		            target:-0.5,
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_luanshe":{
	    		    enable:"phaseUse",
	    		    position:"h",
	    		    usable:1,
	    		    filter:function(event,player){
	    		        if(!player.countCards('h',function(card){
	    		            return get.tag(card,'damage');
	    		        })) return false;
	    		        return game.hasPlayer(function(current){
	    		            return current.inRangeOf(player);
	    		        });
	    		    },
	    		    filterCard:function(card,player,target){
	    		        return get.tag(card,'damage');
	    		    },
	    		    seatNum:function(player,target){
                        var obj={
                		    scale:0.9,
                			x:[1,0.5],
                			y:[1,0.25],
                		    height:null,
                		    width:null,
                		    angle:null,
                		    parent:player,
                		    follow:false,
                	    };
                	    var num=target.getState().position;
                	    switch(num){
                	        case 1:
                	            obj.scale=0.4;
                	            obj.angle=-88;
                	        break;
                	        case 2:
                	            obj.scale=0.52;
                	            obj.angle=-68;
                	        break;
                	        case 3:
                	            obj.scale=0.65;
                	            obj.angle=-48;
                	        break;
                	        case 4:
                	            obj.scale=0.75;
                	            obj.angle=-32;
                	        break;
                	        case 5:
                	            obj.scale=0.9;
                	            obj.angle=-26;
                	        break;
                	        case 6:
                	            obj.scale=1.12;
                	            obj.angle=-21;
                	        break;
                	        case 7:
                	            obj.scale=1.15;
                	            obj.angle=-15;
                	        break;
                	    };
                	    return obj;
                	    
	    		    },
	    		    contentBefore:function(){
	    		        "step 0"
	    		        player.chooseBool("〖乱射〗：是否装备【猎天弓】").set('ai',function(){
	    		            return Math.random();
	    		        });
	    		        "step 1"
	    		        if(result.bool){
	    		            var card=game.createCard("xjzh_card_lietiangong");
	    		            player.equip(card);
	    		        }
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        event.num=0;
	    		        "step 1"
	    		        var targets=game.filterPlayer(function(current){
	    		            return current.inRangeOf(player);
	    		        });
	    		        var num=get.rand(1,Math.min(3,targets.length));
	    		        var targets=targets.slice(0).randomGets(num);
	    		        event.targets=targets.slice(0);
	    		        
	    		        for(var target of event.targets){
	    		            var obj=lib.skill.xjzh_diablo_luanshe.seatNum(player,target);
	    		            game.xjzh_playEffect('xjzh_skillEffect_gongjian',player,obj);
						};
	    		        player.useCard(cards[0],targets,false).set('addCount',false).set('oncard',function(card,player){
							var that=this;
							if(!that.baseDamage) that.baseDamage=1;
							if(targets.length>=3&&player.getCards('e',function(cardx){
							    return card.name=="xjzh_card_lietiangong";
							})){
							    that.baseDamage*=2;
							}
						}).set('targets',targets);
	    		        "step 2"
	    		        if(player.getStat('damage')){
	    		            var history=player.getHistory('sourceDamage',function(evt){
				                return evt.getParent('xjzh_diablo_luanshe').name=="xjzh_diablo_luanshe";
				            });
				            for(var i=0;i<history.length;i++){
				                var target=history[i].player;
				                target.changexjzhBUFF('mumang',1);
				                history.splice(i,1);
				            }
	    		        }
	    		        "step 3"
	    		        if(event.targets){
	    		            event.num++
	    		            if(event.targets.length<3&&event.num==1){
	    		                var card=player.getCards('e',function(cardx){
							        return cardx.name=="xjzh_card_lietiangong";
							    });
	    		                if(card) player.discard(card)._triggered=null;
	    		            }else{
	    		                if(event.num==1) event.goto(1);
	    		            }
	    		        }
	    		    },
	    		    ai:{
	    		        order:8,
	    		        result:{
	    		            player:function(player){
	    		                var targets=game.filterPlayer(function(current){
	    		                    return player.inRange(current);
	    		                });
	    		                var num=0
	    		                for(var name of targets){
	    		                    if(player.isFriendsOf(name)) num++
	    		                }
	    		                if(num>targets-num) return 0.2;
	    		                return 1.5;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_jingshe":{
	    		    trigger:{
	    		        source:"damageAfter",
	    		    },
	    		    forced:true,
	    		    locked:true,
	    		    priority:-3,
	    		    filter:function(event,player){
	    		        if(event.getParent('xjzh_diablo_luanshe').name!="xjzh_diablo_luanshe") return false;
	    		        return !event.cancelled||event.num>0
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        trigger.player.changexjzhBUFF('yishang',1);
	    		        "step 1"
	    		        if(get.xjzhBUFFNum(trigger.player,'yishang')>0) trigger.player.turnOver(true);
	    		    },
	    		},
	    		"xjzh_diablo_guanzhu":{
	    		    trigger:{
	    		        player:"drawAfter",
	    		    },
	    		    frequent:true,
	    		    group:["xjzh_diablo_guanzhu_use","xjzh_diablo_guanzhu_damage"],
	    		    filter:function(event,player){
	    		        if(player.countCards('h',function(card){
	    		            return get.tag(card,'damage')&&!card.hasGaintag("xjzh_diablo_guanzhu");
	    		        })&&player.countCards('h',function(card){
	    		            return card.hasGaintag("xjzh_diablo_guanzhu");
	    		        })<2) return true;
	    		        return false;
	    		    },
					mod:{
						cardUsable:function(card,player,num){
						    if(!card.cards) return;
						    if(card.name=="sha"||card.name=="jiu"){
						        for(var i of card.cards){
						            if(i.hasGaintag("xjzh_diablo_guanzhu")) return Infinity;
						        }
						    }
						},
					},
	    		    content:function(){
	    		        "step 0"
	    		        var cards=player.getCards('h',function(card){
	    		            return get.tag(card,'damage')&&!card.hasGaintag("xjzh_diablo_guanzhu");
	    		        });
	    		        var num=player.countCards('h',function(card){
	    		            return card.hasGaintag("xjzh_diablo_guanzhu");
	    		        });
	    		        player.chooseCardButton(cards,[1,2-num],"〖灌注〗：请选择至多"+get.translation(2-num)+"张伤害卡牌令其获得灌注效果").set('ai',function(button){
							var player=_status.event.player;
							if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
							return 0;
	    		        });
	    		        "step 1"
	    		        if(result.links){
	    		            event.cards=result.links
	    		        }else{
	    		            event.finish();
	    		        }
	    		        "step 2"
	    		        var dialog=ui.create.dialog('forcebutton','hidden','〖灌注〗：请选择一种灌注效果');
                        var str='<div class="popup text" style="width:calc(100%-10px);display:inline-block">';
						str+='冰霜灌注：令你被灌注的牌造成冰属性伤害<br><br><br>';
						str+='火焰灌注：令你被灌注的牌造成火属性伤害</div>';
						dialog.add(str);
						var chooseList=['冰霜灌注','火焰灌注'];
	    		        player.chooseControl(chooseList,'cancel2').set('ai',function(){
	    		            return chooseList.randomGet();
	    		        }).set('dialog',dialog);
	    		        "step 3"
	    		        if(result.control!='cancel2'){
	    		            var cards=event.cards;
	    		            player.addGaintag(cards,'xjzh_diablo_guanzhu');
	    		            if(!player.storage.xjzh_diablo_guanzhu2) player.storage.xjzh_diablo_guanzhu2=cards.slice(0);
	    		            player.storage.xjzh_diablo_guanzhu2.push(cards.slice(0));
	    		            switch(result.control){
	    		                case '冰霜灌注':
	    		                player.storage.xjzh_diablo_guanzhu=1;
							    break;
	    		                case '火焰灌注':
	    		                player.storage.xjzh_diablo_guanzhu=2;
							    break;
	    		            }
	    		        }else{
	    		            event.finish();
	    		        }
	    		    },
	    		    subSkill:{
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageBegin",
	    		            },
	    		            direct:true,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(!event.cards||!event.cards.length) return false;
	    		                if(!player.storage.xjzh_diablo_guanzhu) return false;
	    		                if(!player.storage.xjzh_diablo_guanzhu2) return false;
	    		                return player.storage.xjzh_diablo_guanzhu2.includes(event.cards[0]);
	    		            },
	    		            content:function(){
	    		                "step 0"
	    		                if(player.storage.xjzh_diablo_guanzhu==1){
	    		                    game.setNature(trigger,'ice',false)
	    		                }else{
	    		                    game.setNature(trigger,'fire',false)
	    		                }
	    		                "step 1"
	    		                switch(trigger.nature){
	    		                    case "ice":
	    		                    trigger.player.changexjzhBUFF('binghuan',1);
	    		                    break;
	    		                    case "fire":
	    		                    trigger.player.changexjzhBUFF('ranshao',1);
	    		                    break;
	    		                }
	    		                "step 2"
	    		                if(player.storage.xjzh_diablo_guanzhu2.length){
	    		                    player.storage.xjzh_diablo_guanzhu2.remove(trigger.cards[0]);
	    		                }else{
	    		                    delete player.storage.xjzh_diablo_guanzhu2;
	    		                }
	    		            },
	    		        },
					    "use":{
                            trigger:{player:"useCardBefore"},
                            forced:true,
                            priority:-1,
                            sub:true,
                            filter:function(event,player){
                                if(event.card.name=='sha'||event.card.name=="jiu"){
                                    if(event.cards[0].hasGaintag("xjzh_diablo_guanzhu")) return true;
					            };
					            return false;
					        },
					        content:function(){
                                if(trigger.addCount!==false){
                                    trigger.addCount=false;
                                    var stat=player.getStat();
                                    if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
                                }; 
					        },
					    },
	    		    },
	    		},
	    		"xjzh_diablo_sushe":{
	    		    trigger:{
	    		        player:"useCard",
	    		    },
	    		    forced:true,
	    		    locked:true,
	    		    priority:3,
	    		    init:function(player){
	    		        player.storage.xjzh_diablo_sushe=false;
	    		    },
	    		    filter:function(event,player){
	    		        return event.card.name=="sha";
	    		    },
	    		    content:function(){
	    		        if(player.storage.xjzh_diablo_sushe==true){
							if(!trigger.baseDamage) trigger.baseDamage=1
							trigger.baseDamage*=2;
							player.storage.xjzh_diablo_sushe=false;
						}
						else{
	    		            var num=get.rand(1,3);
						    trigger.effectCount+=num;
						    game.log(trigger.card,'额外结算'+num+'次');
						    if(num==3) player.storage.xjzh_diablo_sushe=true;
						}
	    		    },
	    		},
	    		"xjzh_diablo_yingbi":{
	    		    enable:"phaseUse",
	    		    usable:1,
	    		    filter:function(event,player){
	    		        return !player.isTurnedOver();
	    		    },
	    		    mod:{
					    globalTo:function(from,to,distance){
						    if(to.isTurnedOver()) return distance+1;
					    }
	    		    },
	    		    content:function(){
	    		        player.addTempSkill('xjzh_diablo_yingbi_turn',{player:'damageAfter'});
	    		    },
	    		    subSkill:{
	    		        "turn":{
	    		            sub:true,
	    		            init:function(player){
	    		                if(player.isIn()&&!player.isTurnedOver()) player.turnOver(true);
	    		            },
	    		            onremove:function(player,skill){
	    		                if(player.isTurnedOver()) player.turnOver(false);
	    		                if(!player.hasSkill("xjzh_diablo_yingbi_damage")) player.addSkill("xjzh_diablo_yingbi_damage");
	    		            },
	    		            ai:{
	    		                maixie:true,
	    		                maixie_hp:true,
	    		            },
	    		        },
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageAfter",
	    		            },
	    		            forced:true,
	    		            sub:true,
	    		            priority:6,
	    		            filter:function(event,player){
	    		                if(event.source==player&&event.player==player) return false;
	    		                return !event.numFixed&&!event.cancelled;
	    		            },
	    		            mark:true,
	    		            marktext:"隐",
	    		            intro:{
	    		                name:"隐蔽",
	    		                content:"下一次造成伤害令目标获得一层易伤然后你摸两张牌",
	    		            },
	    		            content:function(){
	    		                trigger.player.changexjzhBUFF('yishang',1);
	    		                player.draw(2);
	    		                player.removeSkill("xjzh_diablo_yingbi_damage");
	    		            },
	    		        },
	    		    },
	    		    ai:{
	    		        order:0.1,
	    		        result:{
	    		            player:function(player,target){
	    		                if(!player.hasFriend) return;
	    		                return 1;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_jianyu":{
	    		    enable:"phaseUse",
	    		    round:2,
					skillAnimation:"epic",
					animationColor:"thunder",
					animationStr:"箭雨",
					group:"xjzh_diablo_jianyu_damage",
	    		    content:function(){
	    		        player.chooseUseTarget({name:'wanjian'},false);
	    		    },
	    		    subSkill:{
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageBegin",
	    		            },
	    		            direct:true,
	    		            priority:10,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                return event.getParent('xjzh_diablo_jianyu').name=="xjzh_diablo_jianyu";
	    		            },
	    		            content:function(){
	    		                game.setNature(trigger,"poison",false);
	    		                if(Math.random()<=Math.random()) trigger.player.changexjzhBUFF('zhongdu',1);
	    		            },
	    		        },
	    		    },
	    		    ai:{
	    		        order:6,
	    		        result:{
	    		            player:1,
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_lingshou":{
	    		    trigger:{
	    		        player:"phaseBefore",
	    		    },
	    		    filter:function(event,player){
	    		        if(game.xjzh_hasEquiped("xjzh_qishu_wuyan",player.name1)) return false;
	    		        if(game.xjzh_hasEquiped("xjzh_qishu_fenglangkx",player.name1)) return false;
	    		        return player.countMark("xjzh_diablo_lingshou")>=100;
	    		    },
	    		    mark:true,
	    		    marktext:"贡",
	    		    intro:{
	    		        name:"德鲁伊灵体贡品",
	    		        content:function(storage,player){
	    		            var str="贡品："+player.countMark("xjzh_diablo_lingshou")+"个<br>";
	    		            if(player.storage.xjzh_diablo_linglijianmian) str+="灵力消耗减免："+player.storage.xjzh_diablo_linglijianmian+"%<br>";
	    		            if(player.storage.xjzh_diablo_randomhuixin) str+="会心几率："+player.storage.xjzh_diablo_randomhuixin+"％";
	    		            return str;
	    		        },
	    		    },
	    		    lingshouList:["xjzh_diablo_lang","xjzh_diablo_xiong"],
	    		    group:["xjzh_diablo_lingshou_end","xjzh_diablo_lingshou_damage"],
	    		    content:function(){
	    		        "step 0"
	    		        player.removeMark("xjzh_diablo_lingshou",100,false);
	    		        "step 1"
	    		        var list=lib.skill.xjzh_diablo_lingshou.lingshouList.slice(0);
	    		        if(player.storage.xjzh_diablo_lingshou2){
	    		            list.remove(player.storage.xjzh_diablo_lingshou2);
	    		        }
	    		        var dialog=ui.create.dialog('〖灵兽〗：请选择所要变形的形态，取消变回人类',[list,"character"],'hidden');
	    		        player.chooseButton(dialog).set('ai',function(){
	    		            return list.randomGet()
	    		        });
	    		        "step 2"
	    		        if(result.links){
	    		            player.setAvatar('xjzh_diablo_yafeikela',result.links[0]);
	    		            player.node.name.innerHTML=get.translation(result.links[0]);
	    		            if(player.storage.xjzh_diablo_lingshou2){
	    		                var list=lib.character[player.storage.xjzh_diablo_lingshou2][3];
	    		                player.removeSkill(list,true);
	    		            }
	    		            player.storage.xjzh_diablo_lingshou2=result.links[0];
	    		            var list=lib.character[result.links[0]][3];
	    		            player.addSkill(list);
	    		        }else{
	    		            player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
	    		            if(player.storage.xjzh_diablo_lingshou2){
	    		                var list=lib.character[player.storage.xjzh_diablo_lingshou2][3];
	    		                player.removeSkill(list,true);
	    		            }
	    		            player.node.name.innerHTML=get.translation("xjzh_diablo_yafeikela");
	    		            delete player.storage.xjzh_diablo_lingshou2;
	    		        }
	    		    },
	    		    subSkill:{
	    		        "end":{
	    		            trigger:{
	    		                player:"phaseAfter",
	    		            },
	    		            direct:true,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(game.xjzh_hasEquiped("xjzh_qishu_wuyan",player.name1)) return false;
	    		                if(game.xjzh_hasEquiped("xjzh_qishu_fenglangkx",player.name1)) return false;
	    		                if(!player.storage.xjzh_diablo_lingshou2) return false;
	    		                return ["xjzh_diablo_lang","xjzh_diablo_xiong"].includes(player.storage.xjzh_diablo_lingshou2);
	    		            },
	    		            content:function(){
	    		                player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
	    		                if(player.storage.xjzh_diablo_lingshou2){
	    		                    var list=lib.character[player.storage.xjzh_diablo_lingshou2][3];
	    		                    player.removeSkill(list,true);
	    		                }
	    		                player.node.name.innerHTML=get.translation("xjzh_diablo_yafeikela");
	    		                delete player.storage.xjzh_diablo_lingshou2;
	    		            },
	    		        },
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageEnd",
	    		            },
	    		            silent:true,
	    		            sub:true,
	    		            priority:-1,
	    		            filter:function(event,player){
        	    		        if(game.xjzh_hasEquiped("xjzh_qishu_wuyan",player.name1)) return false;
        	    		        if(game.xjzh_hasEquiped("xjzh_qishu_fenglangkx",player.name1)) return false;
        	    		        return true;
	    		            },
	    		            content:function(){
	    		                player.addMark("xjzh_diablo_lingshou",get.rand(1,100));
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_shilue":{
	    		    enable:"phaseUse",
	    		    init:function(player){
	    		        if(!player.storage.xjzh_diablo_linglijianmian) player.storage.xjzh_diablo_linglijianmian=0;
	    		        player.storage.xjzh_diablo_linglijianmian+=30;
	    		        player.storage.xjzh_diablo_shilue=false;
	    		    },
	    		    filter:function(event,player){
	    		        return player.countMark("xjzh_diablo_lingshou")>0;
	    		    },
	    		    group:"xjzh_diablo_shilue_round",
	    		    content:function(){
	    		        "step 0"
	    		        if(event.isMine()){
	    		            var name=prompt("请输入任意数字转换德鲁伊灵体贡品为灵力","00");
	    		        }else{
	    		            name=get.rand(1,player.countMark("xjzh_diablo_lingshou"));
	    		        }
	    		        event.num=name?name:0;
	    		        "step 1"
	    		        if(event.num==0) return;
	    		        var marknum=player.countMark("xjzh_diablo_lingshou");
	    		        var numx=marknum>=event.num?event.num:marknum;
	    		        game.log(numx)
	    		        player.removeMark("xjzh_diablo_lingshou",numx);
	    		        player.changexjzhMp(numx);
	    		        if(player.storage.xjzh_diablo_linglijianmian){
	    		            if(player.storage.xjzh_diablo_linglijianmian>30){
	    		                player.storage.xjzh_diablo_linglijianmian-=30;
	    		            }else{
	    		                delete player.storage.xjzh_diablo_linglijianmian
	    		            }
	    		        }
	    		        player.storage.xjzh_diablo_shilue=true;
	    		    },
	    		    subSkill:{
	    		        "round":{
	    		            trigger:{
	    		                global:"roundStart",
	    		            },
	    		            direct:true,
	    		            priority:10,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(game.roundNumber==0) return false;
	    		                if(!player.storage.xjzh_diablo_shilue) return false;
	    		                return true;
	    		            },
	    		            content:function(){
	    		                player.storage.xjzh_diablo_shilue=false;
	    		                player.storage.xjzh_diablo_linglijianmian+=30;
	    		            },
	    		        },
	    		    },
	    		    ai:{
	    		        order:0.2,
	    		        result:{
	    		            player:function(player,target){
	    		                if(player.countMark("xjzh_diablo_lingshou")>100){
	    		                    if(get.xjzhMp(player)<=get.xjzhmaxMp(player)/2) return 10;
	    		                    return 0.5;
	    		                }
	    		                return 0.1;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_leibao":{
	    		    enable:"phaseUse",
	    		    level:1,
	    		    powerDrain:45,
	    		    xjzh_fengbaoSkill:true,
	    		    filterTarget:function(card,player,target){
	    		        return target!=player;
	    		    },
	    		    filter:function(event,player){
	    		        if(player.storage.xjzh_diablo_linglijianmian){
	    		            var num=Math.min(player.storage.xjzh_diablo_linglijianmian,100);
	    		        }else{
	    		            var num=0;
	    		        }
	    		        var num2=lib.skill.xjzh_diablo_leibao.powerDrain;
	    		        var numx=Math.floor(num2*(1-num/100));
	    		        return get.xjzhMp(player)>=numx;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        if(player.storage.xjzh_diablo_linglijianmian){
	    		            var num=Math.min(player.storage.xjzh_diablo_linglijianmian,100);
	    		        }else{
	    		            var num=0;
	    		        }
	    		        var num2=lib.skill.xjzh_diablo_leibao.powerDrain;
	    		        var numx=Math.floor(num2*(1-num/100));
	    		        player.changexjzhMp(-numx);
	    		        "step 1"
	    		        game.xjzh_playEffect('xjzh_skillEffect_leiji',target);
	    		        var num=lib.skill.xjzh_diablo_leibao.level;
	    		        target.damage(num,'nocard',player,'thunder');
	    		        "step 2"
	    		        var numx=0.15;
	    		        if(player.storage.xjzh_diablo_randomhuixin){
	    		            var num=player.storage.xjzh_diablo_randomhuixin;
	    		            numx*=(1+num/100)
	    		        }
	    		        if(Math.random()<=numx) target.changexjzhBUFF('gandian',1);
	    		    },
	    		    ai:{
	    		        order:12,
	    		        expose:0.5,
	    		        result:{
	    		            target:function(target){
	    		                var num=lib.skill.xjzh_diablo_leibao.level;
	    		                return -num;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_kuanghou":{
	    		    enable:"phaseUse",
	    		    level:1,
	    		    usable:1,
	    		    xjzh_langrenSkill:true,
	    		    check:function(event,player){
	    		        if(player.isDamaged()){
	    		            if(get.xjzhMp(player)<get.xjzhmaxMp(player)) return 10;
	    		            return 2;
	    		        }
	    		        return 0.5;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        var num=lib.skill.xjzh_diablo_leibao.level;
	    		        player.recover(Math.floor(num/5));
	    		        player.changexjzhMp(20);
	    		        var numx=0.05;
	    		        if(player.storage.xjzh_diablo_randomhuixin){
	    		            var num=player.storage.xjzh_diablo_randomhuixin;
	    		            numx*=(1+num/100)
	    		        }
	    		        if(Math.random()<=numx) player.recover(player.getDamagedHp());
	    		        "step 1"
	    		        var numx=0.25;
	    		        if(game.xjzh_hasEquiped("xjzh_card_fengbaopaoxiao",player.name1)){
	    		            if(Math.random<=numx) player.changexjzhMp(20);
	    		        }
	    		    },
	    		    ai:{
	    		        order:12,
	    		        expose:0.5,
	    		        result:{
	    		            player:function(player){
	    		                var num=lib.skill.xjzh_diablo_kuanghou.level;
	    		                return num/5+player.getDamagedHp();
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_zhongou":{
	    		    trigger:{
	    		        player:"useCardToPlayer",
	    		    },
					mod:{
					    selectTarget:function(card,player,range){
							var type=get.tag(card,'damage');
							if(!get.tag(card,'damage')) return
							range[1]=1;
						},
					},
					filter:function(event,player){
					    return get.tag(event.card,'damage');
					},
					level:1,
	    		    powerDrain:35,
	    		    forced:true,
	    		    locked:false,
	    		    xjzh_xiongrenSkill:true,
					content:function(){
					    "step 0"
					    player.addTempSkill('unequip','useCardAfter');
					    event.qianggu=false;
					    "step 1"
					    if(player.getStat('damage')){
					        if(player.storage.xjzh_diablo_linglijianmian){
	    		                var num=Math.min(player.storage.xjzh_diablo_linglijianmian,100);
	    		            }else{
	    		                var num=0;
	    		            }
	    		            var num2=lib.skill.xjzh_diablo_zhongou.powerDrain;
	    		            var numx=Math.floor(num2*(1-num/100));
	    		            event.numx=numx;
	    		            if(game.xjzh_hasEquiped("xjzh_qishu_wuyan",player.name1)){
	    		                event.qianggu=true;
	    		                event.goto(2);
	    		                event.finish();
	    		                return;
	    		            }
	    		            else if(get.xjzhMp(player)<numx){
	    		                event.finish();
	    		                return;
	    		            }
					        player.chooseBool('〖重欧〗：是否消耗'+numx+'点灵力获得点护甲强固点体力值').set('ai',function(){
					            var num=get.xjzhMp(player);
					            if(num>numx) return 1;
					            return 0;
					        }).set('numx',numx);
					    }else{
					        event.finish();
					        return;
					    }
					    "step 2"
					    if(result.bool||event.qianggu){
					        player.changexjzhMp(event.qianggu==true?event.numx:-event.numx);
					        var num=lib.skill.xjzh_diablo_zhongou.level;
					        player.changeHujia(num);
					        player.changexjzhBUFF('qianggu',num);
	    		            var numx=0.25;
	    		            if(player.storage.xjzh_diablo_randomhuixin){
	    		                var num=player.storage.xjzh_diablo_randomhuixin;
	    		                numx*=(1+num/100)
	    		            }
	    		            if(Math.random()<=numx) trigger.target.changexjzhBUFF('jiansu',1);
					    }
					},
	    		},
	    		"xjzh_diablo_fensui":{
	    		    trigger:{
	    		        player:"useCard",
	    		    },
	    		    forced:true,
	    		    locked:true,
	    		    xjzh_dadiSkill:true,
	    		    level:1,
	    		    priority:2,
	    		    mark:true,
	    		    marktext:"碎",
	    		    intro:{
	    		        name:"粉碎",
	    		        content:function(storage,player){
	    		            var num=player.countMark("xjzh_diablo_fensui");
	    		            if(num==0||!num) return;
	    		            if(num==12) return "你下一次造成伤害必定暴击";
	    		            return get.translation(num);
	    		        },
	    		    },
	    		    filter:function(event,player){
	    		        if(["delay","equip"].includes(get.type(event.card))) return false;
	    		        return player.isHealthy();
	    		    },
	    		    group:["xjzh_diablo_fensui_damage","xjzh_diablo_fensui_phase"],
	    		    content:function(){
	    		        trigger.effectCount++
	    		        game.log(trigger.card,"额外结算一次");
	    		    },
	    		    subSkill:{
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageBegin",
	    		            },
	    		            direct:true,
	    		            priority:3,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(event.cancelled||event.numFixed) return false;
	    		                return game.phaseNumber%12==0;
	    		            },
	    		            content:function(){
	    		                var num=lib.skill.xjzh_diablo_fensui.level+1;
	    		                game.xjzh_Criticalstrike(player,trigger.num,num,null,true);
	    		                player.clearMark("xjzh_diablo_fensui",false);
	    		                var numx=0.15;
	    		                if(player.storage.xjzh_diablo_randomhuixin){
	    		                    var num=player.storage.xjzh_diablo_randomhuixin;
	    		                    numx*=(1+num/100)
	    		                }
	    		                if(Math.random()<=numx) trigger.player.turnOver(true);
	    		            },
	    		        },
	    		        "phase":{
	    		            trigger:{
	    		                player:"phaseBefore",
	    		            },
	    		            direct:true,
	    		            priority:3,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(player.countMark("xjzh_diablo_fensui")<12) return true;
	    		                return false;
	    		            },
	    		            content:function(){
	    		                player.addMark("xjzh_diablo_fensui",1,false);
	    		            },
	    		        }
	    		    },
	    		},
	    		"xjzh_diablo_duguan":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    filter:function(event,player){
	    		        if(get.xjzhMp(player)<25) return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        if(!game.hasNature(trigger)||!game.hasNature(trigger,"poison")) game.setNature(trigger,"poison",false);
	    		        "step 1"
	    		        var num=0.33;
	    		        var num2=0.25;
	    		        if(get.xjzhBUFFNum(player,'zhongdu')>0){
	    		            num*=1.5;
	    		            num2*=1.5;
	    		        }
	    		        if(Math.random()>num){
	    		            player.changexjzhMp(-25);
	    		        }
	    		        if(Math.random()<=num2){
	    		            trigger.player.changexjzhBUFF('zhongdu',1);
	    		        }
	    		    },
	    		},
	    		"xjzh_diablo_xianjing":{
	    		    enable:"phaseUse",
	    		    usable:1,
	    		    mark:true,
	    		    marktext:"陷",
	    		    intro:{
	    		        name:"剧毒陷阱",
	    		        mark:function(dialog,storage,player){
	    		            if(!player.storage.xjzh_diablo_xianjing) return;
	    		            var storage=player.storage.xjzh_diablo_xianjing;
	    		            if(player.isUnderControl(true)) dialog.addAuto([storage,'vcard']);
	    		            
	    		        },
	    		    },
	    		    init:function(player){
	    		        if(!player.storage.xjzh_diablo_xianjing) player.storage.xjzh_diablo_xianjing=[];
	    		    },
	    		    group:"xjzh_diablo_xianjing_lose",
	    		    content:function(event,player){
	    		        "step 0"
	    		        var cards=Array.from(ui.cardPile.childNodes).filter(card=>!player.storage.xjzh_diablo_xianjing.includes(card));
	    		        if(!cards.length) return;
	    		        event.card=cards.randomGet();
	    		        var dialog=ui.create.dialog('hidden',[[event.card],'vcard']);
	    		        player.chooseControl('ok').set('dialog',dialog);
	    		        "step 1"
	    		        player.storage.xjzh_diablo_xianjing.push(event.card);
	    		        "step 2"
	    		        game.log(player.storage.xjzh_diablo_xianjing)
	    		        var num=get.rand(ui.cardPile.childElementCount);
                        event.card.fix();
                        ui.cardPile.insertBefore(event.card,ui.cardPile.childNodes[num]);
                        game.updateRoundNumber();
	    		    },
	    		    subSkill:{
	    		        "lose":{
	    		            trigger:{
	    		                global:"loseAfter",
	    		            },
	    		            forced:true,
	    		            priority:1,
	    		            filter:function(event,player){
	    		                if(event.player==player) return false;
	    		                var cards=event.cards;
	    		                var num=0
	    		                for(var i=0;i<cards.length;i++){
	    		                    if(player.storage.xjzh_diablo_xianjing.includes(cards[i])){
	    		                        num++
	    		                        break;
	    		                    }
	    		                }
	    		                if(num==0) return false;
	    		                return true;
	    		            },
	    		            content:function(){
	    		                "step 0"
	    		                trigger.player.changexjzhBUFF('zhongdu',get.xjzhBUFFInfo("zhongdu",'limit'));
	    		                "step 1"
	    		                if(Math.random()<=0.3) player.changexjzhMp(25);
	    		                "step 2"
	    		                var list=[];
	    		                var cards=trigger.cards;
	    		                for(var i=0;i<cards.length;i++){
	    		                    if(player.storage.xjzh_diablo_xianjing.includes(cards[i])){
	    		                        list.push(cards[i]);
	    		                        player.storage.xjzh_diablo_xianjing.remove(cards[i]);
	    		                    }
	    		                }
	    		                if(!list.length) return;
	    		                if(Math.random()<=0.2) player.gain(list,'gain2',log);
	    		            },
	    		        },
	    		    },
	    		    ai:{
	    		        order:12,
	    		        result:{
	    		            player:1,
	    		        },
	    		    },
	    		},
	    		"xjzh_diablo_baolu":{
	    		    trigger:{
	    		        source:"damageBegin1",
	    		    },
	    		    direct:true,
	    		    priority:1,
	    		    locked:true,
	    		    filter:function(event,player){
	    		        if(!player.storage.xjzh_diablo_xianjing) return false;
	    		        var cards=event.player.getCards('hej',function(card){
	    		            return player.storage.xjzh_diablo_xianjing.includes(card);
	    		        });
	    		        if(!cards.length) return false;
	    		        return Math.random()<=0.25;
	    		    },
	    		    content:function(){
	    		        var num=get.rand(1,2);
	    		        switch(num){
							case 0:
							game.setNature(trigger,'poison',false);
							trigger.num++
							break;
							case 1:
							player.useSkill("xjzh_diablo_xianjing",player);
							break;
						}
	    		    },
	    		},
	    		
	    		//地下城与勇士
	    		"xjzh_dnf_levelUp":{
	    		    getSkillList:{
	    		        2:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_shenghui"]
	    		        },
	    		        3:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        4:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        5:{
	    		            "xjzh_dnf_jianshen":["xjzh_dnf_gedang"],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_huanhe"]
	    		        },
	    		        6:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        7:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        8:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        9:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        10:{
	    		            "xjzh_dnf_jianshen":["xjzh_dnf_ligui"],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_kuaihe"]
	    		        },
	    		        11:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        12:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        13:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        14:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        15:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_tianyin"]
	    		        },
	    		        16:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        17:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        18:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_shouhu"]
	    		        },
	    		        19:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":[]
	    		        },
	    		        20:{
	    		            "xjzh_dnf_jianshen":[],
	    		            "xjzh_dnf_shengqi":["xjzh_dnf_zhufu"]
	    		        },
	    		    },
					mod:{
						maxHandcard:function(player,num){
							return num+Math.round(player.storage.xjzh_dnf_levelUp/3);
						},
						cardUsable:function(card,player,num){
							if(card.name=="sha"||card.name=="jiu" ) return num+Math.round(player.storage.xjzh_dnf_levelUp/5);
						},
					},
	    		    direct:true,
	    		    locked:true,
	    		    charlotte:true,
	    		    superCharlotte:true,
	    		    fixed:true,
	    		    priority:102,
	    		    firstDo:true,
	    		    xjzh_xinghunSkill:true,
	    		    nogainsSkill:true,
	    		    mark:true,
	    		    marktext:"面",
	    		    intro:{
	    		        name:"面板",
	    		        content:function(storage,player){
	    		            var str=""
	    		            if(player.storage.xjzh_dnf_levelUp) str+="<li>等级："+get.translation(player.storage.xjzh_dnf_levelUp)+"<br>";
	    		            if(player.storage.xjzh_dnf_exp) str+="<li>经验："+get.translation(player.storage.xjzh_dnf_exp)+"<br>";
	    		            var num=get.xjzhMp(player);
	    		            var num2=get.xjzhmaxMp(player);
	    		            if(get.xjzhMp(player)>=0||get.xjzhmaxMp(player)>=0) str+="<li>魔力："+num+"/"+num2+"<br>";
	    		            if(player.storage.basexjzhMp) str+="<li>魔力回复：每回合"+player.storage.basexjzhMp+"点<br>";
	    		            str+="<li>每3级手牌上限+1，每5级出牌次数+1、摸牌数量+1";
	    		            return str;
	    		        },
	    		        markcount:function(storage,player){
	    		            if(!player.storage.xjzh_dnf_levelUp) return "";
	    		            return player.storage.xjzh_dnf_levelUp;
	    		        },
	    		    },
	    		    defineMp:function(player){
				        if(!player.storage.basexjzhMp) player.storage.basexjzhMp=2;
	    		    },
	    		    init:function(player){
	    		        if(get.dnfCharacter(player)){
	    		            var dnfnoplayer2time=setInterval(function(){
	    		                if(player.name2) player.xjzh_removeFujiang();
					        },500);
					        if(!get.dnfCharacter(player)){
					            clearInterval(dnfnoplayer2time);
					            return;
					        }
	    		        }
	    		        lib.skill.xjzh_dnf_levelUp.defineMp(player);
	    		        var name=player.name
	    		        if(!player.storage.xjzh_dnf_skills) player.storage.xjzh_dnf_skills=[]
	    		        if(window.localStorage.getItem(name)==null){
	    		            if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=1
	    		            if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=0
	    		        }else{
	    		            var localStorage=window.localStorage
	    		            var data=localStorage.getItem(name);
	    		            var data=JSON.parse(data)
	    		            if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=data.levelUp
	    		            if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=data.exp
	    		            for(var i of data.skill){
	    		                if(i=="xjzh_dnf_levelUp") continue;
	    		                player.addSkillLog(i);
	    		            }
	    		            var es=[];
	    		            if(data.equip.length){
	    		                for(var i=0;i<data.equip.length;i++){
                                    var card=game.createCard(data.equip[i]);
                                    es.push(card);
                                }
                            }
                            if(es.length) player.directequip(es);
	    		        }
	    		    },
	    		    trigger:{
	    		        player:["useCardAfter"],
	    		        source:["damageAfter"],
	    		    },
	    		    filter:function(event,player){
	    		        if(player.storage.xjzh_dnf_levelUp){
	    		            if(player.storage.xjzh_dnf_levelUp>=20) return false;
	    		        }
	    		        return true;
	    		    },
	    		    group:["xjzh_dnf_levelUp_draw","xjzh_dnf_levelUp_gainMp"],
	    		    content:function(){
	    		        "step 0"
	    		        if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=1
	    		        if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=0
	    		        var num=player.storage.xjzh_dnf_levelUp
	    		         if(num>=20){
	    		             levelUp=true;
	    		             event.goto(2);
	    		         }
	    		        var num2=player.storage.xjzh_dnf_exp
	    		        levelUp=false;
	    		        if(num2>=3+num){
	    		            player.storage.xjzh_dnf_levelUp+=1
	    		            player.storage.xjzh_dnf_exp=0
	    		            player.$fullscreenpop('升级了','thunder');
	    		            levelUp=true;
	    		        }
	    		        else{
	    		            player.storage.xjzh_dnf_exp++
	    		        }
	    		        if(levelUp){
	    		            var name=player.name
	    		            var num=player.storage.xjzh_dnf_levelUp
	    		            var list=lib.skill.xjzh_dnf_levelUp.getSkillList[num][name]
	    		            if(list.length<=0){
	    		                event.goto(2);
	    		                return;
	    		            }
	    		            if(event.isMine){
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
						    }
							var bool=false;
							var level=player.storage.xjzh_dnf_levelUp
							if(player.name=="xjzh_dnf_shengqi"){
							    if(level==5||level==15) bool=true;
							}
							if(bool) list.push("cancel2");
	    		            player.chooseControl(list).set('ai',function(){
	    		                return get.max(list,get.skillRank,'item');
	    		            }).set('dialog',dialog);
	    		        }
	    		        "step 1"
	    		        if(result.control){
	    		            if(result.control=="cancel2") event.goto(2);
	    		            player.addSkillLog(result.control);
	    		            if(!player.storage.xjzh_dnf_skills) player.storage.xjzh_dnf_skills=[]
	    		            player.storage.xjzh_dnf_skills.push(result.control);
	    		        }
	    		        "step 2"
	    		        if(levelUp){
	    		            game.log("存档已记录");
	    		            var name=player.name
	    		            var num=player.storage.xjzh_dnf_levelUp
	    		            var num2=player.storage.xjzh_dnf_exp
	    		            var list=[]
	    		            for(var i of player.skills){
	    		                var info=get.info(i);
	    		                if(i=="xjzh_dnf_levelUp") continue;
	    		                if(!lib.translate[i]||!lib.translate[i+"_info"]||info.sub||!player.storage.xjzh_dnf_skills.includes(i)) continue;
	    		                list.push(i);
	    		            }
	    		            var localStorage=window.localStorage
	    		            var data={
	    		                "levelUp":num,
	    		                "exp":num2,
	    		                "skill":list,
	    		                "equip":player.getCards("e")
	    		            }
	    		            var data=JSON.stringify(data);
	    		            localStorage.setItem(name,data);
	    		        }
	    		        "step 3"
	    		        player.update();
	    		        player.updateMarks();
	    		    },
	    		    subSkill:{
	    		        "draw":{
	    		            trigger:{
	    		                player:"phaseDrawBegin",
	    		            },
	    		            direct:true,
	    		            priority:10,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                return player.storage.xjzh_dnf_levelUp>0;
	    		            },
	    		            content:function(){
	    		                var num=Math.round(player.storage.xjzh_dnf_levelUp/5);
	    		                trigger.num+=num
	    		            },
	    		        },
	    		        "gainMp":{
	    		            trigger:{
	    		                player:"phaseJieshuBegin",
	    		            },
	    		            forced:true,
	    		            priority:900,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(!get.dnfCharacter(player)) return false;
	    		                if(!player.storage.xjzhMp) return false;
	    		                return get.xjzhMp(player)<get.xjzhmaxMp(player);
	    		            },
	    		            content:function(){
	    		                var num=player.storage.basexjzhMp
	    		                if(player.hasSkill('xjzh_dnf_shenghui')) num+=2
	    		                player.changexjzhMp(num);
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_card_siwangbingzhu_skill":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    forced:true,
	    		    equipSkill:true,
	    		    priority:10,
	    		    lastDo:true,
	    		    filter:function(event,player){
	    		        if(!event.source) return false;
	    		        if(event.source!=player) return false;
	    		        //if(event.nature&&event.nature=="ice") return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        if(!game.hasNature(trigger)) game.setNature(trigger,'ice',false);
	    		        if(Math.random()<=0.4&&game.hasNature(trigger,'ice')) trigger.num++
	    		    },
	    		    ai:{
	    		        iceDamage:true,
	    		    },
	    		},
	    		"xjzh_dnf_ligui":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    forced:true,
	    		    priority:2,
	    		    filter:function(event,player){
	    		        return event.card.name=="sha";
	    		    },
	    		    content:function(){
	    		        if(Math.random()) trigger.player.changexjzhBUFF('gandian',1);
	    		        if(get.xjzhBUFFNum(player,'gandian')>0){
	    		            if(Math.random()<=0.5) trigger.player.damage(player,1,"thunder");
	    		        }
	    		    },
	    		},
	    		"xjzh_dnf_gedang":{
	    		    trigger:{
	    		        player:"damageBegin",
	    		    },
	    		    forced:true,
	    		    priority:15,
	    		    content:function(){
	    		        if(game.hasNature(trigger)){
	    		            if(Math.random()<=0.4) trigger.changeToZero();
	    		        }else{
	    		            if(Math.random()<=0.15) trigger.changeToZero();
	    		        }
	    		    },
	    		    ai:{
	    		        effect:{
							target:function (card,player,target,current){
								if(!target.hasFriend()) return;
								if(get.tag(card,'damage')) return [0.4,0.5];
							},
						},
	    		    },
	    		},
	    		"xjzh_dnf_huanhe":{
	    		    enable:"phaseUse",
	    		    filter:function(event,player){
	    		        if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
	    		        return get.xjzhMp(player)>=20;
	    		    },
	    		    filterTarget:function(card,player,target){
	    		        if(target.hp>=target.maxHp) return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        target.recover();
	    		        player.changexjzhMp(-20);
	    		    },
	    		    ai:{
	    		        order:9,
	    		        threaten:2,
	    		        result:{
	    		            target:function(player,target){
	    		                if(target.hp==1) return 5;
	    		                if(player==target&&get.xjzhMp(player)>=40) return 5;
	    		                return 2;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_dnf_kuaihe":{
	    		    enable:"phaseUse",
	    		    init:function(player){
	    		        if(player.hasSkill("xjzh_dnf_huanhe")) player.removeSkill("xjzh_dnf_huanhe");
	    		        if(player.storage.xjzh_dnf_skills.includes("xjzh_dnf_huanhe")) player.storage.xjzh_dnf_skills.remove("xjzh_dnf_huanhe");
	    		    },
	    		    filter:function(event,player){
	    		        if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
	    		        return get.xjzhMp(player)>=30;
	    		    },
	    		    filterTarget:function(card,player,target){
	    		        if(target.hp>=target.maxHp) return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        target.chooseDrawRecover(2);
	    		        player.changexjzhMp(-30);
	    		    },
	    		    ai:{
	    		        order:9,
	    		        threaten:2,
	    		        result:{
	    		            target:function(player,target){
	    		                if(target.hp==1) return 5;
	    		                if(player==target&&get.xjzhMp(player)>=50) return 5;
	    		                return 2;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_dnf_tianyin":{
	    		    enable:"phaseUse",
	    		    init:function(player){
	    		        if(player.hasSkill("xjzh_dnf_kuaihe")) player.removeSkill("xjzh_dnf_kuaihe");
	    		        if(player.storage.xjzh_dnf_skills.includes("xjzh_dnf_kuaihe")) player.storage.xjzh_dnf_skills.remove("xjzh_dnf_kuaihe");
	    		    },
	    		    filter:function(event,player){
	    		        if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
	    		        return get.xjzhMp(player)>=50;
	    		    },
	    		    filterTarget:function(card,player,target){
	    		        if(target.hp>=target.maxHp) return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        target.gainMaxHp();
	    		        target.chooseDrawRecover(2);
	    		        player.changexjzhMp(-50);
	    		    },
	    		    ai:{
	    		        order:9,
	    		        threaten:2,
	    		        result:{
	    		            target:function(player,target){
	    		                if(target.hp==1) return 5;
	    		                if(player==target&&get.xjzhMp(player)>=80) return 5;
	    		                return 2;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_dnf_shenghui":{
	    		    init:function(player){
	    		        if(!player.storage.basexjzhMp) player.storage.basexjzhMp=2
	    		        player.storage.basexjzhMp+=2
	    		    },
	    		},
	    		"xjzh_dnf_zhufu":{
	    		    trigger:{
	    		        global:"damageBegin1",
	    		    },
	    		    check:function(event,player){
	    		        var att=get.attitude(player,event.player);
	    		        var hs=player.countCards("h",{subtype:"basic"});
	    		        var hs2=player.countCards("h",{name:"tao"});
	    		        var hs3=player.countCards("h",{name:"shan"});
	    		        if(att<=0){
	    		            if(hs>0){
	    		                if(hs3==1&&hs2==0) return 0;
	    		                if(hs3==0&&hs2==1) return 0;
	    		                return 1;
	    		            }
	    		        }
	    		        return 0.5;
	    		    },
	    		    filter:function(event,player){
	    		        if(get.xjzhMp(player)<30) return false;
	    		        if(player.countCards("h",{subtype:"basic"})<=0) return false;
	    		        return event.notLink();
	    		    },
	    		    content:function(){
	    		        trigger.num++;
	    		        player.changexjzhMp(-30);
	    		    },
	    		    ai:{
	    		        damageBonus:true,
	    		    },
	    		},
	    		"xjzh_dnf_shouhu":{
	    		    trigger:{
	    		        player:"changexjzhMp",
	    		    },
	    		    check:function(event,player){
	    		        if(player.hasFriend()) return 1;
	    		        return 0;
	    		    },
	    		    enable:"phaseUse",
	    		    filter:function(event,player){
	    		        if(get.xjzhMp(player)<30) return false;
	    		        if(event.getParent("xjzh_dnf_shouhu").name=="xjzh_dnf_shouhu") return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        player.chooseTarget('〖圣光守护〗：令一名武将获得其体力上限一半的护甲').set('ai',function(target){
							return get.attitude(player,target)>0;
						});
						"step 1"
						if(result.bool){
						    var target=result.targets[0]
						    var num=Math.floor(target.maxHp/2);
						    target.changeHujia(num);
						    player.changexjzhMp(-30);
						}
	    		    },
	    		    ai:{
	    		        order:function(event,player){
	    		            var num=get.xjzhMp(player);
	    		            if(num<30) return 0;
	    		            return Math.round(num/6);
	    		        },
	    		        result:{
	    		            target:function(target){
	    		                var num=get.xjzhMp(player);
	    		                if(num<30) return 0;
	    		                return Math.round(num/30);
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_dnf_jianshenx":{
	    		    trigger:{
	    		        player:["phaseZhunbeiBegin","phaseJieshuBegin"],
	    		    },
	    		    forced:true,
	    		    priority:12,
	    		    mod:{
	    		        cardEnabled:function(card,player){
	    		            if(get.subtype(card)=="equip1"){
	   	                        var info=lib.translate[card.name]
	    	                    var info2=lib.translate[card.name+"_info"]
	    		                var str=info+info2
	   		                    var bool=false
	   	                        for(var i of str){
	    	                        if(i.indexOf('剑')!=-1) bool=true;
	    		                }
	    		                if(bool) return true;
	    		                return false;
	    	                }
	    	            },
                        canBeGained:function(card,player,target,name,now){
						    var cards=[
				                "xjzh_card_tianjigyx",
	    		                "xjzh_card_guanshizhengzong",
	    		                "xjzh_card_julihjc",
	    		                "xjzh_card_mojianklls",
	    		                "xjzh_card_tiancongyunjian",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
                        canBeDiscarded:function(card,player,target,name,now){
						    var cards=[
				                "xjzh_card_tianjigyx",
	    		                "xjzh_card_guanshizhengzong",
	    		                "xjzh_card_julihjc",
	    		                "xjzh_card_mojianklls",
	    		                "xjzh_card_tiancongyunjian",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
                        cardDiscardable:function(card,player,name,now){
						    var cards=[
				                "xjzh_card_tianjigyx",
	    		                "xjzh_card_guanshizhengzong",
	    		                "xjzh_card_julihjc",
	    		                "xjzh_card_mojianklls",
	    		                "xjzh_card_tiancongyunjian",
				            ]
				            if(cards.includes(card.name)) return false;
                        },
	    		    },
	    		    init:function(player){
	    		        var players=game.filterPlayer(function(current){
	    		            return current!=player;
	    		        });
	    		        for(var i of players){
	    		            i.addSkill('xjzh_dnf_jianshenx_nouse');
	    		        }
	    		    },
	    		    group:["xjzh_dnf_jianshenx_use"],
	    		    content:function(){
	    		        "step 0"
	    		        if(player.isDisabled(1)) return;
	    		        var dialog=ui.create.dialog('〖剑神〗：请选择并装备一把武器','hidden');
	    		        var list=[
	    		            "xjzh_card_tianjigyx",
	    		            "xjzh_card_guanshizhengzong",
	    		            "xjzh_card_julihjc",
	    		            "xjzh_card_mojianklls",
	    		            "xjzh_card_tiancongyunjian",
	    		        ]
	    		        dialog.add([list,'vcard']);
	    		        player.chooseButton(dialog,true).set('ai',function(button){
	    		            return Math.random();
	    		        });
	    		        "step 1"
	    		        if(result.bool){
	    		            var card=game.createCard(result.links[0][2]);
	    		            player.equip(card);
	    		        }
	    		    },
	    		    subSkill:{
	    		        "nouse":{
	    		            mod:{
	    		                cardEnabled:function(card,player){
	    		                    var info=lib.translate[card.name]
	    		                    var info2=lib.translate[card.name+"_info"]
	    		                    var str=info+info2
	    		                    if(!str) return;
	    		                    var bool=false
	    		                    for(var i of str){
	    		                        if(i.indexOf('剑')!=-1) bool=true;
	    		                    }
	    		                    if(bool) return false;
	    		                },
	    		            },
	    		            sub:true,
	    		        },
				        "use":{
				            trigger:{
				                global:["loseEnd"],
				            },
				            direct:true,
				            priority:12,
				            sub:true,
				            filter:function(event,player){
				                var list=[
				                    "xjzh_card_tianjigyx",
				                    "xjzh_card_guanshizhengzong",
				                    "xjzh_card_julihjc",
				                    "xjzh_card_mojianklls",
				                    "xjzh_card_tiancongyunjian",
				                ]
				                for(var i of list){
				                    for(var j of event.cards){
				                        if(i==j.name) return true;
				                    }
				                }
				                //if(list.includes(event.card.name)) return true;
				                return false;
				            },
				            content:function(){
                                var cards=trigger.cards
                                var cards2=[
				                    "xjzh_card_tianjigyx",
				                    "xjzh_card_guanshizhengzong",
				                    "xjzh_card_julihjc",
				                    "xjzh_card_mojianklls",
				                    "xjzh_card_tiancongyunjian",
				                ]
                                var list=[]
                                for(var i of cards){
                                    for(var j of cards2){
                                        if(i.name==j) list.push(i);
                                    }
                                }
                                if(!list.length) return;
                                game.cardsGotoSpecial(list);
                                game.log("#y",list,"被销毁了");
				            },
				        },
	    		    },
	    		},
	    		"xjzh_dnf_aoyi":{
	    		    trigger:{
					    player:'loseAfter',
					    global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
				    },
				    forced:true,
				    priority:0.1,
				    locked:true,
				    filter:function(event,player){
					    var evt=event.getl(player);
					    if(get.subtype(event.card)!="equip1") return false;
					    return evt&&evt.player==player&&evt.es&&evt.es.length>0;
				    },
				    group:["xjzh_dnf_aoyi_dis"],
				    content:function(){
				        "step 0"
				        var players=[
						    player.next,
						    player.previous
						]
						for(var i of players){
						    player.gainPlayerCard("请选择"+get.translation(i)+"的牌",i,1,true).set('ai',function(button){
							    if(get.attitude(i,player)<0){
								    return get.value(button.link);
							    }
						    	else{
					    			return -get.value(button.link);
				    			}
				    		});
						}
						"step 1"
				        var type2=get.subtype2(trigger.card);
						switch(type2){
							case 'xjzh_guangjian':
							if(player.countCards('j')) player.discard(player.getCards('j'));
							if(player.isTurnedOver()) player.turnOver(false);
							if(player.isLinked()) player.link(false);
							if(player.countDisabled()>0){
							    for(var i=1;i<6;i++){
							        game.log(i)
							        if(player.isDisabled(i)) player.enableEquip(i);
							    }
							}
							break;
							case 'xjzh_jujian':
							var players=[
							    player.next,
							    player.previous
							]
							var list=[]
							for(var i of players){
							    if(player.isEnemiesOf(i)) list.push(i);
							}
							if(!list.length) return;
							var targets=list.randomGet();
							if(!player.isTurnedOver()) targets.turnOver(true);
							break;
							case 'xjzh_duanjian':
							var players=[
							    player.next,
							    player.previous
							]
							var list=[]
							for(var i of players){
							    if(player.isEnemiesOf(i)) list.push(i);
							}
							if(!list.length) return;
							var targets=list.randomGet();
							targets.damage(1,player);
							break;
							case 'xjzh_taidao':
							var targets=game.filterPlayer(function(current){
							    return player.inRange(current);
							});
							if(!targets.length) return;
							for(var i of targets){
							    if(i.getEquip(1)) i.discard(i.getCards('e',1));
							}
							break;
							case 'xjzh_dunqi':
							var targets=game.filterPlayer(function(current){
							    return player.inRange(current);
							});
							if(!targets.length) return;
							var targets=targets.randomGet();
							targets.goMad();
							break;
						}
				    },
	    		    subSkill:{
	    		        "dis":{
	    		            trigger:{
	    		                player:"disableEquipBefore",
	    		            },
	    		            direct:true,
	    		            priority:999,
	    		            filter:function(event,player){
	    		                return event.pos=="equip1";
	    		            },
	    		            content:function(){
	    		                trigger.cancel();
	    		                game.log(player,"的武器栏无法废除");
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_dnf_jianyi":{
	    		    locked:true,
	    		    trigger:{
	    		        player:"damageBegin1",
	    		    },
	    		    priority:10,
	    		    frequent:true,
	    		    prompt:function(event,player){
	    		        if(!player.getEquip(1)){
	    		            return "〖剑意〗：是否发动〖剑神〗切换武器牌？";
	    		        }else{
	    		            var card=player.getCards('e',1);
	    		            var type2=get.subtype2(card);
	    		            switch(type2){
	    		                case 'xjzh_guangjian':
	    		                return "〖剑意〗：是否发动技能令"+get.translation(event.source)+"受到一点伤害？";
	    		                break;
	    		                case 'xjzh_jujian':
	    		                return "〖剑意〗：是否发动技能防止此伤害？";
	    		                break;
	    		                case 'xjzh_duanjian':
	    		                return "〖剑意〗：是否发动技能摸两张牌？";
	    		                break;
	    		                case 'xjzh_taidao':
	    		                return "〖剑意〗：是否发动技能回复一点体力？";
	    		                break;
	    		                case 'xjzh_dunqi':
	    		                return "〖剑意〗：是否发动技能令"+get.translation(event.source)+"跳过出牌阶段？";
	    		                break;
	    		            }
	    		        }
	    		    },
	    		    content:function(){
	    		        if(!player.getEquip(1)){
	    		            player.useSkill("xjzh_dnf_jianshenx",player);
	    		        }else{
	    		            var card=player.getCards('e',1);
	    		            var type2=get.subtype2(card);
	    		            switch(type2){
							    case 'xjzh_guangjian':
							    if(Math.random()) trigger.source.damage(1,player,'nocard');
							    break;
							    case 'xjzh_jujian':
							    if(Math.random()) trigger.changeToZero();
							    break;
							    case 'xjzh_duanjian':
							    player.draw(2);
							    break;
							    case 'xjzh_taidao':
							    player.recover();
							    break;
							    case 'xjzh_dunqi':
							    event.getParent('phaseUse').skipped=true;
							    break;
							}
	    		        }
	    		    },
	    		},
	    		"xjzh_card_mojianklls_skill":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    forced:true,
	    		    priority:88,
	    		    equipSkill:true,
	    		    filter:function(event,player){
	    		        return event.num>0;
	    		    },
	    		    content:function(){
	    		        trigger.player.damage(trigger.num,'notrigger','untriggering','nocard');
	    		        trigger.changeToZero();
	    		    },
	    		    subSkill:{
	    		        "nodamage":{
	    		            trigger:{
	    		                player:"damageBegin1",
	    		            },
	    		            forced:true,
	    		            priority:-3,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                var num=Math.floor(trigger.num/2);
	    		                trigger.num-=num
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_card_julihjc_skill":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    prompt:function(event,player){
	    		        return "是否令"+get.translation(event.player)+"跳过下个出牌阶段？";
	    		    },
	    		    priority:88,
	    		    equipSkill:true,
	    		    filter:function(event,player){
	    		        if(!event.card||!event.cards.length) return false;
	    		        return event.card.name=="sha";
	    		    },
	    		    content:function(){
	    		        trigger.player.skip('phaseUse');
	    		    },
	    		},
	    		"xjzh_card_tiancongyunjian_skill":{
	    		    trigger:{
	    		        source:"damageAfter",
	    		    },
	    		    forced:true,
	    		    priority:88,
	    		    equipSkill:true,
	    		    filter:function(event,player){
	    		        if(!event.cards||!event.cards.length) return false;
	    		        return event.card.name=="sha";
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        player.chooseTarget("【天丛云剑】：选择一名其他角色令其受到一点无来源伤害",function(target){
	    		            return target!=player;
	    		        }).set('ai',function(target){
	    		            return get.damageEffect(target,player,player);
	    		        });
	    		        "step 1"
	    		        if(result.bool){
	    		            result.targets[0].damage(1,'nosource');
	    		        }
	    		    },
	    		},
	    		"xjzh_card_guanshizhengzong_skill":{
	    		    trigger:{
	    		        source:"damageBegin",
	    		    },
	    		    forced:true,
	    		    priority:88,
	    		    equipSkill:true,
	    		    filter:function(event,player){
	    		        if(!event.cards||!event.cards.length) return false;
	    		        return event.card.name=="sha";
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        if(Math.random()){
	    		            if(game.hasNature(trigger)) game.setNature(trigger,null,false);
	    		            trigger.num+=Math.ceil(trigger.num/2);
	    		            trigger.player.changexjzhBUFF('liuxue',1);
	    		            if(get.xjzhBUFFNum(trigger.player,'liuxue')>=1){
	    		                player.chooseBool("【观世正宗】：是否收割流血伤害？").set('ai',function(event,player){
	    		                    var num=get.xjzhBUFFNum(event.player,'liuxue');
	    		                    var num2=0
	    		                    var players=event.player
	    		                    while(players.getSeatNum()!=1){
	    		                        var players=players.previous
	    		                        num2++
	    		                    }
	    		                    var hp=event.player.hp
	    		                    if(hp<num2+num) return 10;
	    		                    return 0;
	    		                });
	    		            }
	    		        }
	    		        "step 1"
	    		        if(result.bool){
	    		            var num=get.xjzhBUFFNum(trigger.player,'liuxue');
	    		            var num2=0
	    		            var players=trigger.player
	    	                while(players.getSeatNum()!=1){
	    		                var players=players.previous
	    		                num2++
	    		            }
	    		            trigger.player.changexjzhBUFF('liuxue',-num);
	    		            trigger.player.damage(num+num2);
	    		        }
	    		    },
	    		},
	    		"xjzh_card_tianjigyx_skill":{
	    		    trigger:{
	    		        source:"damageAfter",
	    		    },
	    		    forced:true,
	    		    priority:88,
	    		    equipSkill:true,
	    		    content:function(){
	    		        if(get.xjzhBUFFNum(trigger.player,'gandian')<=0){
	    		            trigger.player.changexjzhBUFF('gandian',1);
	    		        }else{
	    		            if(player.getStat().card.sha>0) player.getStat().card.sha-=1
	    		        }
	    		    },
	    		},
	    		
	    		//西游释厄传
	    		"xjzh_xyj_tianhuo":{
	    		    enable:"phaseUse",
	    		    init:function(player,skill){
	    		        player.addMark(skill,3,false);
	    		        player.update();
	    		        game.playXH('xjzh_xyj_tianhuochuchang');
	    		    },
	    		    mark:true,
	    		    marktext:"火",
	    		    intro:{
	    		        name:"天火",
	    		        content:"本局游戏可发动#次",
	    		    },
					audio:"ext:仙家之魂/audio/skill:2",
	    		    filterTarget:function(card,player,target){
	    		        return target==player.getNext()||target==player.getPrevious();
	    		    },
	    		    filterCard:function(card,player,target){
	    		        return get.suit(card)=="diamond";
	    		    },
	    		    selectCard:function(){
	    		        var player=_status.event.player
	    		        var cards=player.getCards('he',{suit:"diamond"});
	    		        return [1,Math.max(1,cards.length)];
	    		    },
	    		    position:'he',
	    		    lose:false,
	    		    filter:function(event,player){
	    		        if(!player.countCards('he',{suit:"diamond"})) return false;
	    		        if(!player.hasMark("xjzh_xyj_tianhuo")) return false;
	    		        return true;
	    		    },
	    		    content:function(){
	    		        "step 0"
	    		        player.removeMark("xjzh_xyj_tianhuo",1,false);
	    		        target.gain(cards,player,"draw");
	    		        "step 1"
	    		        event.targets=game.filterPlayer();
	    		        event.targets.sortBySeat(target);
	    		        if(target==player.getPrevious()){
	    		            event.targets.reverse();
	    		            var targets2=event.targets[event.targets.length-1];
	    		            event.targets.splice(-1,1);
	    		            event.targets.unshift(targets2);
	    		        }
	    		        event.cards=cards.slice(0);
	    		        "step 2"
	    		        if(event.targets.length>1){
	    		            event.card=event.cards.slice(0);
	    		            event.target=event.targets.shift();
	    		            game.delay();
	    		            var res=get.damageEffect(event.target,player,event.target,'fire');
	    		            event.target.chooseCard("〖天火〗：选择"+get.translation(event.card.length+1)+"张♦牌交给"+get.translation(event.targets[0])+"，否则受到"+get.translation(event.card.length)+"点无来源火焰伤害",event.card.length+1,{suit:"diamond"}).set('ai',function(card){
	    		                if(_status.event.player.hasSkillTag('nofire')) return -1;
	    		                if(_status.event.res>=0) return 6-get.value(card);
	    		                if(get.type(card)!='basic'){
	    		                    return 10-get.value(card);
	    		                }
	    		                return 8-get.value(card);
	    		            }).set('res',res);
	    		        }else{
	    		            event.finish();
	    		            return;
	    		        }
	    		        "step 3"
	    		        if(!result.bool){
	    		            event.target.damage(event.card.length,player,'nocard','fire');
	    		            event.finish();
	    		            return;
	    		        }else{
	    		            event.target.line(event.targets[0],'fire');
	    		            event.targets[0].gain(result.cards,event.target,"draw");
	    		            event.cards=result.cards.slice(0);
	    		            event.goto(2);
	    		        }
	    		    },
	    		    ai:{
	    		        order:1,
	    		        result:{
	    		            player:function(player,target){
	    		                if(player.hasUnknown(2)) return 0;
	    	                    var num=0,eff=0,players=game.filterPlayer(function(current){
	    		                    return current!=player;
	    		                }).sortBySeat(target);
	    		                for(var target of players){
	    		                    if(get.damageEffect(target,player,target,'fire')>=0){num=0;continue};
	    		                    var shao=false;
	    		                    num++;
	    		                    if(target.countCards('h',function(card){
	    		                        if(get.suit(card)!='diamond'){
	    		                            return get.value(card)<10;
	    		                        }
	    		                        return get.value(card)<8;
	    		                    })<num) shao=true;
	    		                    if(shao){
	    		                        eff-=4*(get.realAttitude||get.attitude)(player,target);
	    		                        num=0;
	    		                    }
	    		                    else eff-=num*(get.realAttitude||get.attitude)(player,target)/4;
	    		                }
	    		                if(eff<4) return 0;
	    		                return eff;
	    		            },
	    		        },
	    		    },
	    		},
	    		"xjzh_xyj_dongcha":{
	    		    trigger:{
	    		        player:"phaseZhunbeiBegin",
	    		    },
					audio:"ext:仙家之魂/audio/skill:2",
	    		    frequent:true,
	    		    priority:1,
					mod:{
						maxHandcard:function (player,num){
							return num+=player.storage.xjzh_xyj_dongcha?player.storage.xjzh_xyj_dongcha:2;
						},
					},
					check:function(event,player){
					    var num=0
					    var players=game.filterPlayer(function(current){return current!=player});
					    for(var i=0;i<players.length;i++){
				    	    if(get.damageEffect(players[i],player,player,'fire')<=0) num++
					    }
					    if(num>0) return -num;
					    return player.hp-player.countCards('h');
					},
	    		    content:function(){
	    		        "step 0"
	    		        var list=["摸两张牌","弃两张牌","cancel"]
	    		        if(player.countCards('he')<=1) list.remove("弃两张牌");
	    		        player.chooseControl(list).set('ai',function(card,player,target){
	    		            if(player.countCards('h')>=player.hp) return "弃两张牌";
	    		            return "摸两张牌";
	    		        });
	    		        "step 1"
	    		        if(result.control=="摸两张牌"){
	    		            player.draw(2);
	    		            if(!player.storage.xjzh_xyj_dongcha) player.storage.xjzh_xyj_dongcha=0;
	    		            player.storage.xjzh_xyj_dongcha=-2;
	    		        }
	    		        else if(result.control=="弃两张牌"){
	    		            player.chooseToDiscard(2,'he',true);
	    		            if(!player.storage.xjzh_xyj_dongcha) player.storage.xjzh_xyj_dongcha=0;
	    		            player.storage.xjzh_xyj_dongcha=2;
	    		        }
	    		        event.control=result.control
	    		        "step 2"
	    		        if(event.control!="cancel"){
	    		            player.addTempSkill("xjzh_tongyong_viewHandCards");
	    		            player.addTempSkill("xjzh_xyj_dongcha_damage");
	    		        }
	    		    },
	    		    subSkill:{
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageBegin",
	    		            },
	    		            direct:true,
	    		            priority:20,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                return !game.hasNature(event)&&event.num>0;
	    		            },
	    		            content:function(){
	    		                game.setNature(trigger,'fire',false);
	    		            },
	    		        },
	    		    },
	    		},
				"xjzh_xyj_ruyi":{
					trigger:{
						source:"damageAfter",
					},
					forced:true,
					locked:true,
					priority:2,
					audio:"ext:仙家之魂/audio/skill:2",
					filter:function(event,player){
						if(game.hasNature(event,"fire")) return false;
						if(!player.hasSkill("xjzh_xyj_tianhuo")) return false;
						return event.getParent('xjzh_xyj_tianhuo').name!='xjzh_xyj_tianhuo';
					},
					content:function(){
						"step 0"
						var list=[1,2,3].randomGet();
						if(list==1){
							player.addMark('xjzh_xyj_tianhuo',1,false);
							game.log(player,'获得了一次','#y〖天火〗','使用次数');
						}
						else if(list==2){
							if(!player.hasSkill("xjzh_xyj_ruyi_huomian")){
								player.addTempSkill('xjzh_xyj_ruyi_huomian',{player:'phaseBegin'});
								game.log(player,'免疫火焰伤害直到下个回合结束');
							}else{
							    event.redo();
							}
						}
						else if(list==3){
							event.card=get.cardPile(function(card){
								return get.suit(card)=='diamond';
							});
							if(event.card){
								player.$throw(event.card,1000,'nobroadcast')
								var next=player.chooseTarget("〖如意〗：是否将"+get.translation(event.card)+"交给一名角色",true).set('ai',function(card,player,target){
									var att=get.attitude(player,target);
									if(att>0) return 10-get.value(card);
									return 4-get.value(card);
								})
							}
						}
						"step 1"
						if(result.bool&&result.targets){
							result.targets[0].gain(event.card,player,"draw");
						}
					},
					subSkill:{
						"huomian":{
							trigger:{
								player:"damageBegin1",
							},
							forced:true,
							priority:13,
							locked:true,
							sub:true,
							mark:true,
							marktext:"火",
							intro:{
								name:"火焰免疫",
								content:"防止火焰伤害直到下个回合开始",
							},
							filter:function(event,player){
								return game.hasNature(event,"fire");
							},
							content:function(){
								trigger.changeToZero();
								game.log(player,"免疫火焰伤害");
							},
							ai:{
								nothunder:true,
								nodamage:true,
								effect:{
									target:function(card,player,target,current){
										if(get.tag(card,'fireDamage')) return [0,0];
									},
								},
							},
						},
					},
					ai:{
					    combo:'xjzh_xyj_tianhuo',
					},
				},
	    		
			},
			dynamicTranslate:{
			    "xjzh_dnf_levelUp":function(player){
			        var str="〖属性面板〗：每使用一张牌或造成伤害获得一点经验，经验值为3+等级时升级，基础魔力回复为每回合";
			        var num=player.storage.basexjzhMp
			        str+=""+num+"点魔力，每回合回复"+num+"点魔力";
			        return str;
			    },
			    "xjzh_wzry_daofeng":function(player){
			        var str="转换技，你的回合开始时，你获得附近所有角色各一张牌。";
				    var str2="阴：每个回合开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。";
				    var str3="阳：当你受到伤害或体力流失时，若场上没有“巡”且数值不小于2，你可以防止之，然后令一名角色将一张牌置于武将牌上称为“巡”，否则你摸两张牌。";
				    if(player.storage.xjzh_wzry_daofeng){
						str2='<span class="bluetext">'+str2+'</span>';
					}
					else{
						str3='<span class="bluetext">'+str3+'</span>';
					}
					return str+"<li>"+str2+"<li>"+str3;
			    },
			    
			},
			translate:{
				//众星之魂
				"xjzh_zxzh_linlingshiyu":"林凌&诗雨",
				"xjzh_zxzh_yuanyuan":"冯媛媛",
				"xjzh_zxzh_mufeng":"沐风",
				"xjzh_zxzh_moqinwu":"莫轻舞",
				"xjzh_zxzh_linziyan":"林子言",
				"xjzh_zxzh_moqinyan":"莫轻言",
				"xjzh_zxzh_yumuren":"余木人",
				"xjzh_zxzh_linmo":"林默",
				"xjzh_zxzh_jiangningzhi":"姜凝脂",
				
				"xjzh_zxzh_leifa":"雷法",
				"xjzh_zxzh_leifa_info":"锁定技，每个准备阶段开始时，你摸x张牌并弃x张牌，然后你可以与其拼点，若你赢，其受到一点雷电伤害且非锁定技失效直到回合结束，否则你摸一张牌，该技能失效直到你的回合开始(x为你的手牌数量)",
				"xjzh_zxzh_jianxin":"剑心",
				"xjzh_zxzh_jianxin_info":"锁定技，你不因此技能造成/受到伤害时，若你装备了剑类武器，你观看牌堆顶x张牌，并合法使用其中所有[伤害]类卡牌，否则你可以将牌堆一张剑类武器置入武器栏(若伤害来源为你，x为你的体力值加本次伤害点数，否则为你已失去的体力加本次伤害点数)。",
				"xjzh_zxzh_jiezhen":"结阵",
				"xjzh_zxzh_jiezhen_info":"锁定技，你免疫雷电伤害；每回合限一次，当一名你攻击范围内的角色受到雷电/普通伤害时，你可以代替其受到伤害/成为伤害来源。",
				"xjzh_zxzh_xunqing":"寻情",
				"xjzh_zxzh_xunqing_info":"一名角色受到雷电伤害之后，你可以选择一个目标，令其随机摸1～3张牌或摸2张牌，若其为林子言，其额外摸1张牌<li>你造成或受到的火焰伤害视为雷电伤害",
				"xjzh_zxzh_xianghun":"香魂",
				"xjzh_zxzh_xianghun_info":"锁定技，出牌阶段限一次，你可以弃置一张手牌，并选择一项：1，失去一点体力2，回复一点体力<li>当你失去一点体力后，你可以进行一次判定，若为红色，你选择至多3个角色令其横置，否则选择至多2个角色令其受到1点雷电伤害。",
				"xjzh_zxzh_xianghun1":"香魂",
				"xjzh_zxzh_xianghun2":"香魂",
				"xjzh_zxzh_renxin":"仁心",
				"xjzh_zxzh_renxin_info":"锁定技，你有70%几率防止雷电伤害<li>当你于回合外受到伤害，若体力不大于1，你进行一次判定，判定结果如下:<li>♥你恢复体力至体力上限然后摸一张牌<li>♦你恢复体力至1然后摸3张牌<li>♣伤害来源横置武将牌并弃置3张牌<li>♠伤害来源受到一点雷电伤害并跳过当前回合<br><br>当你恢复体力之后你可以选择除你之外的至多2个目标，令其恢复一点体力。",
				"xjzh_zxzh_renxin1":"仁心",
				"xjzh_zxzh_renxin1_info":"♥你恢复体力至体力上限然后摸一张牌</br>♦你恢复体力至1然后摸3张牌</br>♣伤害来源横置武将牌并弃置3张牌</br>♠伤害来源收到一点雷电伤害并跳过当前回合",
				"xjzh_zxzh_renxin2":"仁心",
				"xjzh_zxzh_renxin3":"仁心",
				"xjzh_zxzh_yufeng":"御风",
				"xjzh_zxzh_yufeng_info":"每回合限两次，每种类型的牌限每回合一次，一名角色受伤害时，你可以弃置一张牌并执行以下操作：<li>基本牌：伤害+1<li>装备牌：令其弃置两张牌（不足则全弃）免疫本次伤害<li>延时锦囊牌：将伤害属性改为火焰伤害并向上家传递<li>非延时锦囊牌：将伤害属性改为雷电伤害并向下家传递",
				"xjzh_zxzh_fengzhen":"风阵",
				"xjzh_zxzh_fengzhen_info":"当一名角色使用一张【杀】,【南蛮入侵】或【万箭齐发】时，你可以弃置一张牌，选择任意名目标直到此牌结算结束，你选择的角色视为装备一张你声明的防具牌。",
				"xjzh_zxzh_zonghuo":"纵火",
				"xjzh_zxzh_zonghuo_info":"限定技,出牌阶段，你对自己造成1~2点火焰伤害，然后令所有其他角色选择：将装备区里的所有装备牌交给你(至少一张) ;或受到你的等量火焰伤害。",
				"xjzh_zxzh_shoutao":"守桃",
				"xjzh_zxzh_shoutao_info":"锁定技，你无法使用桃，你获得一张桃后，弃置之并将其移出游戏，此时若你已受伤，你回复一点体力，否则你摸两张牌，其他角色回复体力后，若你未受伤，你摸一张牌，否则你回复等量体力。",
				"xjzh_zxzh_taoyuan":"桃源",
				"xjzh_zxzh_taoyuan_info":"锁定技，你每弃置一张桃或不由弃桃回复体力时获得一个“桃”标记，当你濒死时，你弃置所有标记并回复等量体力，多余回复改为摸牌。",
				"xjzh_zxzh_qiwu":"起舞",
				"xjzh_zxzh_qiwu_info":"锁定技，出牌阶段限一次，你可以流失一点体力并摸两张牌，然后令场上除你之外的所有角色依次摸一张牌，若此牌为桃，你获得之。",
    			"xjzh_zxzh_leifax":"雷法",
    			"xjzh_zxzh_leifax_info":"其他角色出牌阶段开始前，你可以翻开牌堆顶一张牌，若不为♠，其需要弃置一张花色相同的牌，否则其于回合内非锁定技无效，然后你摸一张牌，若为♠，其受到一点雷电伤害，且本回合内你不能成为其使用卡牌的目标。",
    			"xjzh_zxzh_leifax2":"雷法",
    			"xjzh_zxzh_leifax2_info":"其他角色出牌阶段开始前，你可以翻开牌堆顶一张牌，若不为♠，其需要弃置两张花色相同的牌，否则其于回合内所有技能无效，然后你摸一张牌，若为♠，其受到两点雷电伤害，且本回合内你不能成为其使用卡牌的目标。",
    			"xjzh_zxzh_leiyu":"雷域",
    			"xjzh_zxzh_leiyu_info":"锁定技，摸牌阶段前或你的回合开始前，你可以选择一种花色直到你下次选择，你区域内所有牌均视为此花色，且当你成为此花色牌的目标后，你摸一张牌。",
    			"xjzh_zxzh_tianxin":"天心",
    			"xjzh_zxzh_tianxin_info":"出牌阶段，你可以展示牌堆顶x张牌，若其中♠牌的数量为最多之一，你选择一名不为你的角色令其受到y点雷电伤害，然后你将〖雷法〗描述中的一点雷电伤害改为两点，弃置一张牌改为两张牌，非锁定技失效改为所有技能失效，然后失去技能〖天心〗；否则你摸z张牌并受到一点雷电伤害（x为你的体力值，y为♠牌的数量，z为你已失去的体力）。",
				"xjzh_zxzh_cangjian":"藏剑",
				"xjzh_zxzh_cangjian_info":"锁定技，游戏开始时，你将牌堆中5-9张武器牌置于武将牌上称为“剑”，出牌阶段限两次，你可以选择并装备一张武器牌<li>回合结束时，若你装备有武器牌，你将武器牌洗入牌堆并摸一张牌，若没有装备武器牌，你需选择至多两张“剑”将其洗入牌堆并摸等量手牌，若此时你没有“剑”，你废除武器栏。",
				"xjzh_zxzh_cangjian_use":"藏剑",
				"xjzh_zxzh_yangjian":"养剑",
				"xjzh_zxzh_yangjian_info":"锁定技，当你的准备阶段开始时或你受到伤害后，若你已废除武器栏，你可以获得牌堆两张武器牌并将其称为“剑胎”，“剑胎”不计入手牌上限<li>出牌阶段，你可以弃置任意“剑胎”视为始终装备你所选择的武器牌，若如此做，你本阶段内禁用〖御剑〗。",
				"xjzh_zxzh_yangjian2":"养剑",
				"xjzh_zxzh_yujian":"御剑",
				"xjzh_zxzh_yujian_info":"你可以将“剑胎”当作任意基本牌或非延时锦囊牌使用或打出",
				"xjzh_zxzh_yujian2":"御剑",
				"xjzh_zxzh_shiqiao":"拾樵",
				"xjzh_zxzh_shiqiao_info":"锁定技，场上所有进入弃牌堆的牌会被洗入牌堆随机位置。游戏开始时，你记录1-13中随机1-5个点数，当有牌被洗入牌堆时，若此牌点数与你记录的第一个点数一致，你获得一张不同点数的牌，然后你移除该点数，当所有点数均被移除后，你重新记录之。",
				"xjzh_zxzh_baoxin":"抱薪",
				"xjzh_zxzh_baoxin_info":"锁定技，摸牌阶段、弃牌阶段，你随机展示牌堆13张牌，并获得其中所有与〖拾樵〗记录点数一致的牌，然后你跳过摸牌阶段、弃牌阶段；你使用〖拾樵〗包含点数的牌时，你可以选择一项：1、移除〖拾樵〗中与之一致的点数，然后摸2张牌;2、移除〖拾樵〗中与之一致的点数，然后令此牌额外结算一次。",
				"xjzh_zxzh_baoxin_use":"抱薪",
				"xjzh_zxzh_moyu":"默语",
				"xjzh_zxzh_moyu_info":"你的准备阶段，你可以判定：♥你可以与一名角色交换体力值和体力上限；♠你可以令两名其他角色交换技能。",
				"xjzh_zxzh_zhenwen":"真纹",
				"xjzh_zxzh_zhenwen_info":"每回合限x次，当一名角色不因此技能获得技能时，若其为锁定技，你可以令其失去该技能，然后令其摸两张牌，否则你可以令获得技能的角色改为你（x为当前游戏轮数）。",
				"xjzh_zxzh_jinyan":"禁言",
				"xjzh_zxzh_jinyan_info":"当其他角色发动技能后，你可以禁用该技能直到你的下个回合开始。",
				"xjzh_zxzh_dianling":"点灵",
				"xjzh_zxzh_dianling_info":"出牌阶段，你可以选择至多x名因〖屠苏〗造成过伤害的其他角色，视为依次对其使用一张基本牌或非延时锦囊牌，然后其视为未因〖屠苏〗造成过伤害。",
				"xjzh_zxzh_tusu":"屠苏",
				"xjzh_zxzh_tusu_info":"锁定技，当其他角色/你造成伤害点数大于1时，该伤害点数改为1然后重复计算x/x+1次（x为其造成伤害的点数）。",
				
				//流放之路
				"xjzh_poe_nvwu":"女巫",
				"xjzh_poe_yuansushi":"元素使",
				"xjzh_poe_juedouzhe":"决斗者",
				"xjzh_poe_chuxing":"处刑者",
				"xjzh_poe_weishi":"卫士",
				"xjzh_poe_youxia":"游侠",
				"xjzh_poe_ruiyan":"锐眼",
				"xjzh_poe_guizu":"升华使徒",
				
				"xjzh_poe_choice":"升华",
				"xjzh_poe_choice2":"升华",
				"xjzh_poe_jianfeng":"剑风",
				"xjzh_poe_jianfeng_info":"出牌阶段限一次，你可以弃置一张[伤害]卡牌并指定一名其他角色，其可以选择弃置所有非[伤害]卡牌，或视为你对其使用一张不计次数且无视防具的【杀】，此【杀】额外结算1次，额外结算的【杀】造成伤害+1。",
				"xjzh_poe_tiaozhan":"挑战",
				"xjzh_poe_tiaozhan_info":"其他角色出牌阶段开始时，你可以摸3张牌并视为对其使用一张【决斗】(需合法），若你因此造成伤害，你令其弃置所有手牌，否则你弃置3张牌。",
				"xjzh_poe_sidou":"死斗",
				"xjzh_poe_sidou_info":"出牌阶段限一次，你可以将一张牌当决斗使用，若如此做，你与其区域内的所有牌均置入手牌区且视为【杀】直到手牌用尽或此牌结算，当此牌造成伤害后，若受到伤害的角色体力值小于其体力上限的一半(向上取整)，其立即失去所有体力。",
				"xjzh_poe_bingjian":"冰箭",
				"xjzh_poe_bingjian_info":"出牌阶段限一次，你可以选择一名角色并弃置所有[伤害]手牌，若如此做，视为你对其使用一张不计入次数的【冰杀】并额外结算x次，技能结算后，若你对其造成伤害，有几率对其附加1层冰缓（x为你弃置的牌的数量-1）。",
				"xjzh_poe_dianjian":"电箭",
				"xjzh_poe_dianjian_info":"出牌阶段限一次，你可以将任意张[伤害]手牌（至少一张）当一张【雷杀】使用并选择等量目标，若你对其造成伤害，你有几率对其附加1层感电。",
				"xjzh_poe_zhenya":"镇压",
				"xjzh_poe_zhenya_info":"<b><font color=orange>〖镇压〗</font>锁定技，你有10%基础物理攻击暴率，场上每个存活的武将给予你10%物理攻击暴率，场上每个阵亡的角色给予你15%物理攻击暴率，当你的物理攻击暴率不小于100%时，你的暴伤造成3倍伤害，你周围武将对你造成伤害最多为1。",
				"xjzh_poe_zaixing":"灾星",
				"xjzh_poe_zaixing_info":"<b><font color=orange>〖传奇灾星〗</font>锁定技，你造成伤害后获得一点护甲（至多为3），每当你获得3点护甲，你失去所有护甲获得一个暴球，暴球不为你提供暴率，每个暴球令你的暴伤+1（不与〖残暴〗叠加）",
				"xjzh_poe_lengxue":"冷血",
				"xjzh_poe_lengxue_info":"<b><font color=orange>〖刽子手〗</font>锁定技，当你造成无属性伤害令其陷入濒死状态，你令其立即死亡。",
				"xjzh_poe_shixue":"嗜血",
				"xjzh_poe_shixue_info":"<b><font color=orange>〖无尽饥饿〗</font>锁定技，你造成无属性伤害后，若你已受伤，你回复1点体力，否则你摸1张牌，若你本次伤害造成暴击，则你额外摸1张牌。",
				"xjzh_poe_canbao":"残暴",
				"xjzh_poe_canbao_info":"<b><font color=orange>〖残暴热情〗</font>锁定技，你造成暴击时，有25%几率获得一个暴球，暴球不为你提供暴率，每个暴球令你的暴伤+1（不与〖灾星〗叠加）；你的暴击球数量上限+2",
				"xjzh_poe_yingxiang":"影响",
				"xjzh_poe_yingxiang_info":"<b><font color=orange>〖影响〗</font>锁定技，你每击败一名武将令手牌上限、攻击距离、摸牌数、出牌次数+1",
				"xjzh_poe_yingxing":"影形",
				"xjzh_poe_yingxing_info":"<b><font color=orange>〖大师之形〗</font>锁定技，你的回合外，其他角色对你造成伤害后，你令其立即结束出牌阶段。",
				"xjzh_poe_jingji":"竞技",
				"xjzh_poe_jingji_info":"<b><font color=orange>〖竞技挑战者〗</font>锁定技，当你造成伤害后，你获得1枚“竞”标记（至多10个），每个标记为你提供6.5%反击几率和1%物理攻击格挡几率，“竞”标记将在你受到伤害后失去1枚。",
				"xjzh_poe_fuchou":"复仇",
				"xjzh_poe_fuchou_info":"<b><font color=orange>〖强力复仇〗</font>锁定技，你有50%基础物理攻击格挡几率，此后你每格挡一次物理攻击伤害，你获得+1%物理攻击格挡几率，至多60%。",
				"xjzh_poe_doushi":"斗士",
				"xjzh_poe_doushi_info":"<b><font color=orange>〖完美斗士〗</font>锁定技，你的法术攻击格挡几率等同于你的物理攻击格挡几率，你的格上限+10%；你的防具栏无法被废除",
				"xjzh_poe_zhuzao":"铸造",
				"xjzh_poe_zhuzao_info":"<b><font color=orange>〖痛苦铸造〗</font>锁定技，你的反击造成双倍伤害；你的格挡几率+10%，你的反击几率+10%。",
				"xjzh_poe_xueyan":"血眼",
				"xjzh_poe_xueyan_info":"<b><font color=orange>〖血之眼〗</font>锁定技，你的体力回复量+1，若你回复体力后未受伤，你获得+2%物理攻击格挡几率。",
				"xjzh_poe_baipiao":"白嫖",
				"xjzh_poe_baipiao_info":"<b><font color=orange>〖免费力量〗</font>锁定技，当你受到伤害后，若你未装备防具牌，你随机装备一张防具牌，否则你将一张牌堆随机一张防具牌置于弃牌堆，然后视为你装备了该防具牌。",
				"xjzh_poe_fenlie":"分裂",
				"xjzh_poe_fenlie_info":"<b><font color=orange>〖无限弹药〗</font>锁定技，你使用指定单个目标且不为你的[伤害]卡牌可以额外选择一个目标，若你装备了武器牌，你可以额外选择两个目标（额外选择目标不受距离限制）",
				"xjzh_poe_tanshe":"弹射",
				"xjzh_poe_tanshe_info":"<b><font color=orange>〖致命连锁〗</font>锁定技，你造成伤害有30%几率对其附近随机一个武将造成一点伤害。",
				"xjzh_poe_juji":"狙击",
				"xjzh_poe_juji_info":"<b><font color=orange>〖狙击〗</font>锁定技，当你造成伤害时，若你不在其周围，你对其额外造成60%伤害（向下取整）。",
				"xjzh_poe_jufeng":"飓风",
				"xjzh_poe_jufeng_info":"<b><font color=orange>〖飓风之力〗</font>锁定技，你发动〖分裂〗〖弹射〗及你于回合内使用牌时获得一个“风”标记，你最多拥有10个风标记，你拥有标记时获得飓风效果，你和你的友军均具备[飓风]效果（强制翻开身份牌）。",
				"xjzh_poe_danmu":"弹幕",
				"xjzh_poe_danmu_info":"<b><font color=orange>〖弹幕〗</font>锁定技，你的弹射不再令附近武将受伤，改为令你已造成伤害的武将额外受到一点伤害，你使用卡牌指定不为你的目标时，有30%几率令其获得一个“残”标记，每个标记令其有25%几率造成伤害无效。",
				"xjzh_poe_shenghua":"升华",
				"xjzh_poe_shenghua_info":"锁定技，你不需要禁用技能，游戏开始时，你随机获得POE武将的5个技能，此后每当你的准备阶段，你可以移除这些技能并重新获得。",
				"xjzh_poe_shenghuajin":"升华·禁",
				"xjzh_poe_huoqiu":"火球",
				"xjzh_poe_huoqiu_info":"锁定技，你的所有红色手牌视为【火杀】，你使用【火杀】无距离与次数限制，你使用【火杀】造成伤害令该伤害向下传导x次（x为你本回合使用【火杀】造成伤害的次数）",
				"xjzh_poe_xuruo":"虚弱",
				"xjzh_poe_xuruo_info":"锁定技，其他角色摸牌后，若其手牌数大于你，你随机获得其x张牌使你的手牌数于与其手牌数相等或不小于其手牌数；手牌数小于你的角色对你造成伤害时，若该伤害未被防止之，你受到该伤害锁定为1。",
				"xjzh_poe_huiliu":"汇流",
				"xjzh_poe_huiliu_info":"<b><font color=orange>〖元素汇流〗</font>锁定技，每个回合开始时，你随机获得一种元素汇流，并移除其他元素汇流，你拥有元素汇流时，你造成的所有伤害视为该元素属性伤害并防止你受到其他元素属性伤害。",
				"xjzh_poe_guangta":"光塔",
				"xjzh_poe_guangta_info":"<b><font color=orange>〖毁灭光塔〗</font>你造成属性伤害后可以令其附近一名角色受到等量伤害，若此伤害类型为火焰/冰霜/闪电，则你令其获得一层感电/燃烧/冰冻。",
				"xjzh_poe_sangzhong":"丧钟",
				"xjzh_poe_sangzhong_info":"<b><font color=orange>〖死亡丧钟〗</font>锁定技，每当你失去第3张牌时，你摸两张牌",
				"xjzh_poe_suxing":"塑形",
				"xjzh_poe_suxing_info":"<b><font color=orange>〖元素塑形〗</font>锁定技，你造成伤害无法被防止。",
				"xjzh_poe_bilei":"壁垒",
				"xjzh_poe_bilei_info":"<b><font color=orange>〖元素壁垒〗</font>锁定技，你获得此技能时，你获得20点护甲，当你的所有护甲被移除后，你受到3倍于你体力上限的无来源伤害，若你未因此阵亡，你获得20点护甲，然后你可以将你本局游戏中受到的所有伤害视为随机一种属性伤害任意分配给其他角色。",
				"xjzh_poe_qinhe":"亲和",
				"xjzh_poe_qinhe_info":"<b><font color=orange>〖元素亲和〗</font>出牌阶段，你可以选择一名角色并展示其手牌，并弃置其手牌中所有♥牌和♠牌，每一张♥牌令其视为使用一张【桃】，每一张♠令其视为使用一张【酒】；你使用[桃]回复的体力+1。",
				
				//王者荣耀
				"xjzh_wzry_libai":"李白",
				"xjzh_wzry_yao":"东方曜",
				"xjzh_wzry_ganjiangmoye":"干将莫邪",
				"xjzh_wzry_haiyue":"海月",
				"xjzh_wzry_huamulan":"花木兰",
				"xjzh_wzry_duoliya":"朵莉亚",
				
				"xjzh_wzry_xiaxing":"侠行",
				"xjzh_wzry_xiaxing_info":"锁定技，你造成伤害获得一道剑气，每道剑气令你使用牌可以额外指定一名其他角色为目标，你获得四道剑气时解锁〖剑歌〗并失去所有剑气。",
				"xjzh_wzry_jinjiu":"进酒",
				"xjzh_wzry_jinjiu_info":"出牌阶段限一次，你可以与一名攻击范围内的其他角色交换位置，然后你视为使用一张【酒】并摸x张牌，回合结束后，你返回原位置；你使用【杀】次数+x（x为其与你的座位号差值的绝对值）。",
				"xjzh_wzry_jiange":"剑歌",
				"xjzh_wzry_jiange_info":"锁定技，当你解锁该技能后，你禁用〖侠行〗并立即执行一个额外的回合，该回合内，你使用牌可以额外选择任意名角色;出牌阶段限5次，你可以弃置一种类型的牌，然后摸等量手牌，若本次摸牌的牌中有类型、花色、点数任意一项全部一致，你摸等量牌并重复执行该流程，该回合结束时，你禁用该技能直到下次解锁。",
				"xjzh_wzry_xingchen":"星辰",
				"xjzh_wzry_xingchen_info":"锁定技，你受到伤害转为星削15s后结算；你累计发动三次不为〖星辰〗的技能后摸牌至4张并视为使用一张【万箭齐发】。",
				"xjzh_wzry_liekong":"裂空",
				"xjzh_wzry_liekong_info":"出牌阶段限一次，你可以弃置4张花色不同的牌并选择一名其他角色，然后其须弃置等量花色一致的牌，其每少弃置一张牌，视为你对其使用一张不计入次数的【杀】。",
				"xjzh_wzry_guichen":"归尘",
				"xjzh_wzry_guichen_info":"你的出牌阶段开始时，你记录你的当前状态;本局游戏濒死时限一次，出牌阶段限一次，你可以回到你记录的状态。",
				"xjzh_wzry_guichen2":"归尘",
				"xjzh_wzry_jianzhong":"剑冢",
				"xjzh_wzry_jianzhong_info":"锁定技，当你及友方造成伤害后，你将牌堆顶x张牌置于武将牌上称为“剑”，最多10把“剑”，武将牌上每有一把“剑”，你造成伤害时有8%几率+1，当你武将牌上有10把“剑”时，你免疫所有由你攻击范围内角色造成的伤害(x为造成伤害的点数)。",
				"xjzh_wzry_cuijian":"淬剑",
				"xjzh_wzry_cuijian_info":"锁定技，你不因此技能使用牌指定攻击范围内其他角色为唯一目标后，你可以视为使用一张同名牌",
				"xjzh_wzry_jianlai":"剑来",
				"xjzh_wzry_jianlai_info":"限定技，若你剑冢中的“剑”为10，出牌阶段，你可以禁用淬剑，然后你获得剑冢中的所有牌，你于此阶段内使用牌无次数和距离限制，且你无视“剑”的数量锁定增伤几率为80%，你无法于此阶段内补充剑冢，回合结束时，你将所有“剑”置于剑冢中，5分钟后重置该技能。",
				"xjzh_wzry_bieyue":"别月",
				"xjzh_wzry_bieyue_info":"锁定技，游戏开始时，你获得4个“月”标记，此后每隔50s你获得1个“月”，你最多只能拥有4个“月”；你可以移除一个“月”令你摸牌阶段额外摸一张牌或跳过判定、弃牌阶段、解除翻面",
				"xjzh_wzry_shunhua":"瞬华",
				"xjzh_wzry_shunhua_info":"出牌阶段，你可以选择至多x名角色，令其获得一个“月”标记，然后你移除等量标记(x为你拥有的标记数量)。",
				"xjzh_wzry_liuguang":"流光",
				"xjzh_wzry_liuguang_info":"锁定技，你对有“月”的角色使用【杀】无视距离和防具；当你使用【杀】指定目标时，你令除你之外所有有“月”的角色选择：交给你一张牌或成为此【杀】目标，若其已有“月”，则此牌额外对其结算一次，然后其移除“月”标记。",
				"xjzh_wzry_liuguang2":"流光",
				"xjzh_wzry_liuguang2_info":"锁定技，其他角色计算与你距离+1，你使用牌无距离限制且你使用牌次数*2，你使用【杀】无视防具且令其选择：交给你一张牌或此【杀】额外结算一次。",
				"xjzh_wzry_huanhai":"幻海",
				"xjzh_wzry_huanhai_info":"限定技，出牌阶段，你选择一名角色并移除场上其他角色的所有“月”，然后你将“月”补至4个，禁用〖瞬华〗并修改〖流光〗直到〖幻海〗结束，然后令除你与其之外的其他角色暂时离开游戏直到你与其任意一名角色阵亡或你失去所有“月”，然后你获得等同于你体力值的护甲，且此后你每造成一点伤害获得一点护甲，〖幻海〗持续持续时间结束后，你获得等同于你护甲数量个“月”并移除所有护甲(不受〖别月〗标记上限限制)。",
				"xjzh_wzry_huanhai_append":"注：若当前游戏为第一轮且你的体力大于1，你无法发动〖幻海〗",
				"xjzh_wzry_xunshou":"巡守",
				"xjzh_wzry_xunshou_info":"锁定技，你对其他角色造成伤害后，其可以将一张花色不一致的牌置于武将牌上称为“巡”，否则你摸两张牌，当其武将牌上有4张“巡”时，你对其造成一点伤害并禁用其所有技能直到其再次受到伤害后，然后你弃置其所有“巡”。",
				"xjzh_wzry_konglie":"空烈",
				"xjzh_wzry_konglie_info":"出牌阶段，你可以选择并使用场上的一张“巡”，你使用此牌无需合法性判定，若该角色处于你的攻击范围外，你禁用该技能直到你的下个回合开始。",
				"xjzh_wzry_daofeng":"刀锋",
				"xjzh_wzry_daofeng_info":"转换技，你的回合开始时，你获得附近所有角色各一张牌。<li>阴：每个回合开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。<li>阳：当你受到伤害或体力流失时，若场上没有“巡”且数值不小于2，你可以防止之，然后令一名角色将一张牌置于武将牌上称为“巡”，否则你摸两张牌",
				"xjzh_wzry_huange":"欢歌",
				"xjzh_wzry_huange_info":"回合开始时，你可以选择/重新选择一名其他角色成为你的契约队友，其手牌数量及手牌上限始终不小于你的手牌数量和手牌上限。",
				"xjzh_wzry_zhulang":"逐浪",
				"xjzh_wzry_zhulang_info":"锁定技，当你摸牌后，若你的手牌数量大于你的手牌上限，你须选择并弃置超出你手牌上限的所有牌，然后回复等量体力或令你的契约队友获得这些牌。",
				"xjzh_wzry_tiannai":"天籁",
				"xjzh_wzry_tiannai_info":"限定技，出牌阶段，你可以失去一点体力上限并失去所有技能，然后令你的契约队友重置武将牌和其除觉醒技之外的所有技能，然后其获得增益技能〖破晓〗。",
				
				//暗黑破坏神
				"xjzh_diablo_lamasi":"拉斯玛",
				"xjzh_diablo_moruina":"莫瑞娜",
				"xjzh_diablo_kaxia":"卡夏",
				"xjzh_diablo_yafeikela":"亚菲克拉",
				"xjzh_diablo_xiong":"变形·熊",
				"xjzh_diablo_lang":"变形·狼",
				"xjzh_diablo_lilisi":"莉莉丝",
				"xjzh_diablo_nataya":"娜塔亚",
				"xjzh_diablo_kelike":"科里克",
				
				"xjzh_diablo_hunhuo":"魂火",
				"xjzh_diablo_hunhuo_info":"锁定技，当你击败一名角色后，你将其灵魂收入死亡之书中；出牌阶段限一次，你可以消耗一个灵柩将死亡之书中收集的灵魂唤醒至场上为你作战，唤醒的角色拥有〖尸爆〗；阵亡阶段，你可以解放死亡之书中的一个灵魂与你交换身体。",
				"xjzh_diablo_hunhuo_use":"魂火",
				"xjzh_diablo_hunhuo_shibao":"尸爆",
				"xjzh_diablo_hunhuo_shibao_info":"锁定技，当你阵亡后，附近角色受到一点无来源伤害；每个回合结束后，若你的身份与拉马斯不一致，你立即阵亡",
				"xjzh_diablo_hunhuo_append":"注：死亡之书中的灵魂除非拉马斯主动解放，否则无法再以选将的形式出现在场上；游戏开始时，拉马斯会从死亡之书每个灵魂上随机获得一个技能（限定技、主公技、觉醒技除外），并根据灵魂数量(灵魂数量/3，向下取整)获得不同技能",
				"xjzh_diablo_haoling":"号令",
				"xjzh_diablo_haoling_info":"出牌阶段限一次，你可以选择一名被你唤醒且武将牌正面朝上的角色令其翻面，然后你于回合结束后执行一个额外的回合。",
				"xjzh_diablo_luanshe":"乱射",
				"xjzh_diablo_luanshe_info":"出牌阶段限一次，你可以弃置一张[伤害]卡牌，令你攻击范围内随机1-3名角色成为此牌目标，若此牌造成伤害，其获得一层目盲。",
				"xjzh_card_lietiangong":"猎天弓",
				"xjzh_card_lietiangong_info":"你释放〖乱射〗时装备此牌，技能结算后弃置之。你释放的〖乱射〗至少有3个目标时，你有几率令你的〖乱射〗额外发动一次，且你本次造成的伤害翻倍。",
				"xjzh_card_lietiangong_append":"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“莫瑞娜拿起她的弓，瞄准了太阳。阳光灼伤了她的双眼，但箭矢依然没有落空。受伤的太阳隐藏了起来，从而带来了第一个夜晚。” - 《猎天传奇》</font></span>",
				"xjzh_diablo_jingshe":"劲射",
				"xjzh_diablo_jingshe_info":"锁定技，你因〖乱射〗造成的伤害有几率令其获得一层易伤，你对有易伤的角色造成伤害令其眩晕。",
				"xjzh_diablo_guanzhu":"灌注",
				"xjzh_diablo_guanzhu_info":"你摸牌后，你可以选择令其中至多两张[伤害]卡牌获得灌注效果，你使用有灌注的牌无次数限制，且若你因此牌造成伤害，其获得对应一层灌注属性类型buff，灌注效果会被重新选择的灌注效果覆盖。",
				"xjzh_diablo_sushe":"速射",
				"xjzh_diablo_sushe_info":"锁定技，你使用【杀】额外结算1-3次，若你本次〖速射〗额外结算3次，你下一次〖速射〗造成双倍伤害但不再额外结算。",
				"xjzh_diablo_yingbi":"隐蔽",
				"xjzh_diablo_yingbi_info":"出牌阶段限一次，你可以将武将牌翻至背面直到你受到伤害；当你处于翻面时，其他角色计算与你的距离+1；当你的武将牌翻至正面时，你下一次造成伤害令其获得1层易伤且你摸两张牌。",
				"xjzh_diablo_jianyu":"箭雨",
				"xjzh_diablo_jianyu_info":"每2轮限一次，出牌阶段，你可以视为使用一张【万箭齐发】，且你依此法使用的【万箭齐发】造成毒属性伤害；当你因〖箭雨〗造成毒属性伤害时，有几率令其获得1层中毒。",
				"xjzh_diablo_lingshou":"灵兽",
				"xjzh_diablo_lingshou_info":"锁定技，游戏开始时，你获得100个德鲁伊灵体贡品；回合开始时，你可以消耗100个“德鲁伊灵体贡品”，然后选择并变形为狼、熊之一，根据你选择的不同灵兽，获得不同的技能和效果；当你造成伤害后，你有几率获得1-100个“德鲁伊灵体贡品”。",
				"xjzh_diablo_shilue":"施虐",
				"xjzh_diablo_shilue_info":"出牌阶段，你可以将任意德鲁伊灵体贡品转换为灵力，若你本轮游戏未发动该技能，你获得30%灵力消耗减免。",
				"xjzh_diablo_leibao":"雷暴",
				"xjzh_diablo_leibao_info":"风暴技能，出牌阶段，你可以消耗45点灵力召唤一道闪电并指定一名其他角色，对其造成x点雷属性伤害（x为技能等级）。<li>会心：你有15%几率因此技能造成伤害时令其获得一层感电。",
				"xjzh_diablo_kuanghou":"狂吼",
				"xjzh_diablo_kuanghou_info":"狼人技能，出牌阶段限一次，你可以回复x/5体力上限(向下取整)点体力值并回复20点灵力(x为技能等级)。<li>会心：你有5%几率因此技能回复体力时回复体力至体力上限。",
				"xjzh_diablo_zhongou":"重欧",
				"xjzh_diablo_zhongou_info":"熊人技能，锁定技，你使用[伤害]卡牌只能指定一个目标，你使用的[伤害]卡牌无视防具，若此牌造成伤害，你可以消耗35点灵力获得x点护甲并强固x点体力值（x为技能等级）。<li>会心：你有25%几率因此技能造成伤害时令目标获得一层减速。",
				"xjzh_diablo_fensui":"粉碎",
				"xjzh_diablo_fensui_info":"大地技能，锁定技，若你使用牌指定目标时未受伤，此牌结算两次；每隔12个回合，你下一次造成伤害必定暴击，暴击享受额外100%乘技能等级基础伤害加成。<li>会心：你有15%几率暴击时令受到暴击伤害的目标眩晕。",
				"xjzh_diablo_duguan":"毒灌",
				"xjzh_diablo_duguan_info":"当你造成伤害时，你可以消耗25点能量令其视为毒属性伤害，你对中毒的目标造成伤害时，会心几率提高50%。<li>会心：你有33%几率发动该技能时不消耗能量；你有25%几率造成毒属性伤害时令其获得一层中毒。",
				"xjzh_diablo_xianjing":"陷阱",
				"xjzh_diablo_xianjing_info":"出牌阶段限一次，你可以观看牌堆随机一张牌，并将其标记为“剧毒陷阱”，然后将这张牌洗入牌堆随机位置，当其他角色失去此牌时，其获得最大层数中毒。<li>会心：其他角色失去此牌时，你有20%几率获得被标记为“剧毒陷阱”的牌；你有30%几率回复25点能量。",
				"xjzh_diablo_baolu":"暴露",
				"xjzh_diablo_baolu_info":"锁定技，当你对一名区域内有“剧毒陷阱”的角色造成伤害时，你有25%几率发动技能〖陷阱〗，或令本次伤害视为毒属性伤害且+1。",
				
				//地下城与勇士
				"xjzh_dnf_jianshen":"剑神",
				"xjzh_dnf_shengqi":"神思者",
				"xjzh_dnf_suodeluosi":"索德罗斯",
				
				"xjzh_jujian":"巨剑",
				"xjzh_guangjian":"光剑",
				"xjzh_dunqi":"钝器",
				"xjzh_duanjian":"短剑",
				"xjzh_taidao":"太刀",
				"xjzh_card_siwangbingzhu":"死亡冰柱",
				"xjzh_card_siwangbingzhu_info":"光剑：你造成的所有伤害视为冰属性伤害，你造成冰属性伤害有40%几率+1",
				"xjzh_card_siwangbingzhu_skill":"死亡冰柱",
				"xjzh_card_siwangbingzhu_skill_info":"你造成的所有伤害视为冰属性伤害，你造成伤害有40%几率+1",
				"xjzh_dnf_levelUp":"面板",
				"xjzh_dnf_levelUp_info":"〖属性面板〗：每使用一张牌或造成伤害获得一点经验，经验值为3加等级时升级，基础魔力回复为每回合2点魔力，每回合回复2点魔力",
				"xjzh_dnf_levelUp_append":"注：每3级手牌上限+1，每5级出牌次数+1、摸牌数量+1",
				"xjzh_dnf_levelUp_gainMp":"魔力回复",
				"xjzh_dnf_ligui":"里鬼",
				"xjzh_dnf_ligui_info":"〖里·鬼剑术〗：你使用【杀】造成伤害有几率附加一层感电，你对感电的目标使用【杀】造成伤害有50%几率令其额外受到一点雷属性伤害",
				"xjzh_dnf_gedang":"格挡",
				"xjzh_dnf_gedang_info":"〖自动格挡〗：你受到伤害时，有40%几率免疫无属性伤害，15%几率免疫属性伤害",
				"xjzh_dnf_huanhe":"愈合",
				"xjzh_dnf_huanhe_info":"〖缓慢愈合〗：出牌阶段，你可以消耗20点魔力令一名武将回复一点体力。",
				"xjzh_dnf_kuaihe":"愈合",
				"xjzh_dnf_kuaihe_info":"〖快速愈合〗：出牌阶段，你可以消耗30点魔力令一名武将选择回复一点体力或摸两张牌",
				"xjzh_dnf_kuaihe_append":"注：当你获得该技能时，若你有〖缓慢愈合〗，你失去〖缓慢愈合〗",
				"xjzh_dnf_tianyin":"天音",
				"xjzh_dnf_tianyin_info":"〖天堂之音〗：出牌阶段，你可以消耗50点魔力令一名武将获得一点体力上限并选择回复一点体力或摸两张牌",
				"xjzh_dnf_tianyin_append":"注：当你获得该技能时，若你有〖快速愈合〗，你失去〖快速愈合〗",
				"xjzh_dnf_shenghui":"圣辉",
				"xjzh_dnf_shenghui_info":"你的基础魔力回复+2",
				"xjzh_dnf_zhufu":"祝福",
				"xjzh_dnf_zhufu_info":"当一名武将造成伤害时，你可以消耗30点魔力并弃置一张基本牌，令其本次造成伤害+1",
				"xjzh_dnf_shouhu":"守护",
				"xjzh_dnf_shouhu_info":"出牌阶段或当你不因此技能魔力变化后，你可以消耗30点魔力令一名角色获得等同于其体力上限一半的护甲(向下取整)",
				"xjzh_dnf_jianshenx":"剑神",
				"xjzh_dnf_jianshenx_info":"锁定技，场上其他角色无法使用牌名、描述中有“剑”的牌，你只能装备牌名、描述中有剑的武器牌；你的准备阶段、结束阶段，你选择并装备【魔剑·克拉丽丝】、【巨力黄金锤】、【天脊骨狱息】、【天丛云剑】、【名刀·观世正宗】",
				"xjzh_dnf_aoyi":"奥义",
				"xjzh_dnf_aoyi_info":"锁定技，你的武器栏无法废除；你切换武器牌时可以获得附近角色一张手牌，并根据你此时装备的武器牌类型获得不同效果：<li>光剑，移除你的所有负面状态；<li>巨剑，令附近随机一名敌方角色武将牌翻至背面；<li>短剑，对附近随机一名敌方角色造成一点伤害；<li>太刀，弃置所有敌方角色的武器牌；<li>钝器，令周围随机一名敌方角色陷入混乱。",
				"xjzh_card_mojianklls":"魔剑·克拉丽丝",
				"xjzh_card_mojianklls_info":"巨剑：你造成伤害无法免疫且在你发动该技能后受到伤害-50%直到你的下个回合开始时（向下取整）。",
				"xjzh_card_mojianklls_skill":"魔剑·克拉丽丝",
				"xjzh_card_mojianklls_skill_info":"你造成伤害无法免疫且在你发动该技能后受到伤害-50%直到你的下个回合开始时（向下取整）。",
				"xjzh_card_julihjc":"巨力黄金锤",
				"xjzh_card_julihjc_info":"钝器：你使用【杀】造成伤害可以令其跳过下个出牌阶段。",
				"xjzh_card_julihjc_skill":"巨力黄金锤",
				"xjzh_card_julihjc_skill_info":"你使用【杀】造成伤害可以令其跳过下个出牌阶段。",
				"xjzh_card_tianjigyx":"天脊骨狱息",
				"xjzh_card_tianjigyx_info":"光剑：你造成伤害令其感电，你对感电的角色造成伤害后本回合使用【杀】次数+1。",
				"xjzh_card_tianjigyx_skill":"天脊骨狱息",
				"xjzh_card_tianjigyx_skill_info":"你造成伤害令其感电，你对感电的角色造成伤害后本回合使用【杀】次数+1。",
				"xjzh_card_guanshizhengzong":"观世正宗",
				"xjzh_card_guanshizhengzong_info":"太刀：你使用【杀】造成伤害有几率触发刺击，刺击令本次伤害+50%（向上取整），若你触发了刺击，则目标获得流血，你对流血的目标造成伤害可以提前收割流血。",
				"xjzh_card_guanshizhengzong_skill":"观世正宗",
				"xjzh_card_guanshizhengzong_skill_info":"你使用【杀】造成伤害有几率触发刺击，刺击令本次伤害+50%（向上取整），若你触发了刺击，则目标获得流血，你对流血的目标造成伤害可以提前收割流血。",
				"xjzh_card_tiancongyunjian":"天丛云剑",
				"xjzh_card_tiancongyunjian_info":"短剑：你使用【杀】造成伤害后，可以选择一名其他角色令其受到一点无来源伤害。",
				"xjzh_card_tiancongyunjian_skill":"天从云剑",
				"xjzh_card_tiancongyunjian_skill_info":"你使用【杀】造成伤害后，可以选择一名其他角色令其受到一点无来源伤害。",
				"xjzh_dnf_jianyi":"剑意",
				"xjzh_dnf_jianyi_info":"当你受到伤害时，若你未装备武器牌，你可以发动〖剑神〗切换武器牌，否则根据你装备的武器类型获得不同效果：<li>光剑，有几率反弹该伤害<li>巨剑，有几率防止此伤害<li>短剑，摸两张牌<li>太刀，回复一点体力<li>钝器，令其跳过当前出牌阶段",
				
				//西游释厄传
				"xjzh_xyj_sunwukong":"孙悟空",
				
				"xjzh_xyj_tianhuo":"天火",
				"xjzh_xyj_tianhuo_info":"本局游戏限三次，出牌阶段，你可以将任意张♦牌交给你的下家/上家，其可以：1、选择并交给其下家/上家x+1张牌，2、受到等量来源为你的火焰伤害然后终止技能流程；若其为你时，结束技能流程（x为其上家选择的牌的数量）。",
				"xjzh_xyj_dongcha":"洞察",
				"xjzh_xyj_dongcha_info":"准备阶段，你可以摸两张牌或弃置两张牌，若如此做，你手牌上限-2/+2，且你回合结束前其他角色手牌对你可见；若你本回合发动了该技能，你造成普通伤害视为火焰伤害。",
				"xjzh_xyj_ruyi":"如意",
				"xjzh_xyj_ruyi_info":"锁定技，当你不因〖天火〗造成火焰伤害后，你随机执行以下一项：<li>获得一次〖天火〗使用次数<li>将牌堆一张♦牌交给一名角色<li>你于你的下个回合开始前防止火焰伤害。",
				
				"XWTR_zxzh":"众星之魂",
				"XWTR_poe":"流放之路",
				"XWTR_wzry":"王者荣耀",
				"XWTR_diablo":"暗黑破坏神",
				"XWTR_dnfplayer":"DNF·冒险家",
				"XWTR_dnfnpc":"DNF·NPC",
				"XWTR_xyj":"西游释厄传",
				
			},
		};
		if(true){
			for(var i in XWTR.character){
			    //阵亡配音
				XWTR.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWTR.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWTR.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(var i in XWTR.character){
				XWTR.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
        for(var i in XWTR.skill){
            var info=XWTR.skill[i];
            if(info.marktext2) info.marktext2=info.marktext;
            if(info.subSkill){
                for(var j in info.subSkill){
                    if(info.subSkill[j].marktext2) info.subSkill[j].marktext2=info.subSkill[j].marktext;
                }
            }
        }
		//无需复制素材，自动覆盖十周年UI卡牌素材
		if(game.getExtensionConfig('十周年UI','enable')&&lib.config.xjzh_tenuiCardcopy){
            if(typeof lib.decade_extCardImage!='object'){
                lib.decade_extCardImage = {};
            }
            for(var cardname in XWTR.card){
                var url = lib.assetURL+"extension/仙家之魂/image/cardimage/tenui/"+cardname+".webp";
                lib.decade_extCardImage[cardname] = url;
            }
        }
		if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.length){
			for(let name of game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character){
				if(!XWTR.character[name]) console.log('未在仙武同人武将包找到该武将');
				else{
					XWTR.character[name][4].remove('unseen');
					XWTR.character[name][4].remove('forbidai');
				}
			}
		}
		return XWTR;
	});
});