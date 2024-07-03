import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const translates = {
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
	"xjzh_sanguo_caiqing_info":"出牌阶段开始时，你可以摸x张牌（x为你手牌中花色最多的牌的数量）。",
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
	"xjzh_sanguo_lanzheng_info":"锁定技，你的摸牌阶段，你额外摸X张牌（X为你的体力值），你的弃牌阶段，若你需弃置的牌的数量不小于你的体力上限，你失去一点体力。",
	"xjzh_sanguo_hengzheng":"横征",
	"xjzh_sanguo_hengzheng_info":"锁定技，其他角色出牌阶段结束时，若其回合内没有造成伤害，其需要交给你一张牌或你对其造成一点伤害。",
	"xjzh_sanguo_baolian":"暴敛",
	"xjzh_sanguo_baolian_info":"锁定技，其他角色的回合开始时，其须选择并跳过一个阶段令你执行一个与选项相同的额外阶段。",
	"xjzh_sanguo_linnue":"凌虐",
	"xjzh_sanguo_linnue_info":"主公技，场上与你势力不一致的角色对你造成伤害-1，你对场上势力与你不一致的角色造成伤害+1。",
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
	"xjzh_sanguo_liansuo_info":"锁定技，你的回合内，你的上家和下家非锁定技失效；你使用〖铁索连环〗或♣非装备牌/非延时锦囊牌可以额外选择一个目标。",
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
	"xjzh_sanguo_shanxi_info":"锁定技，你的【闪】不计入手牌上限，你无法成为闪电的目标；其他角色使用/打出【闪】时，你可以令其执行一次【闪电】判定，且以此法执行的判定结果以黑色2-9生效。",
	"xjzh_sanguo_leijix":"雷祭",
	"xjzh_sanguo_leijix_info":"锁定技，当你使用/打出闪、受到伤害后，你进行一次判定并获得判定牌:<li>黑色，你对一名角色造成一点雷电伤害<li>红色，你令一名角色横置/取消横置。",
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
	"xjzh_sanguo_huangtian_info":"锁定技，主公技，你视为拥有技能〖新雷击〗",
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
	"xjzh_sanguo_guixin_info":"你可以跳过摸牌阶段令其他角色选择弃置一张牌或交给你一张牌，然后若你的手牌数量为场上最少之一，你重复此流程；本回合内，若你发动了此技能，你对选择弃牌的角色使用牌无次数限制，然后你的回合结束后，若你的手牌数量为全场唯一最多，你令所有选择给牌的角色摸一张牌。",
	"xjzh_sanguo_feiying":"飞影",
	"xjzh_sanguo_feiying_info":"锁定技，手牌数大于你的角色无法指定你为卡牌目标，你对手牌数小于你的角色使用牌无距离限制。",
	"xjzh_sanguo_batu":"霸图",
	"xjzh_sanguo_batu_info":"主公技，锁定技，其他魏势力角色体力变化后，你可以摸一张牌或令其摸一张牌。",
	"xjzh_sanguo_guanxing":"观星",
	"xjzh_sanguo_guanxing_info":"其他角色的手牌对你始终可见；你的准备/结束阶段，你可以观看牌堆顶的5/3张牌，并将其以任意顺序置于牌堆项或牌堆底。",
	"xjzh_sanguo_xinghun":"星魂",
	"xjzh_sanguo_xinghun_info":"锁定技，游戏开始时，你随机展示未上场角色的7个技能，并选择获得其中两个技能；你受到伤害后，你摸一张牌并展示此牌，你获得一个你未获得且描述中含有此牌牌名的技能",
	"xjzh_sanguo_qixing":"七星",
	"xjzh_sanguo_qixing_info":"锁定技，当你受到伤害或回复体力后，你可以观看牌堆顶3张牌，并将其中一张与“星”牌名均不一致的牌置于武将牌上称为“星”，濒死阶段，若你的“星”不小于7，你将所有“星”收入手牌并回复体力至体力上限。",
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
	"xjzh_sanguo_baima_info":"锁定技，其他角色装备坐骑牌后，你摸2张牌，若此时牌堆没有坐骑牌，你于当前回合结束后执行一个额外的回合。",
	"xjzh_sanguo_yicong":"义从",
	"xjzh_sanguo_yicong_info":"锁定技，游戏开始时，你废除坐骑栏且无法恢复，其他角色装备的坐骑牌也为你提供相同的效果。",
	"xjzh_sanguo_muma":"募马",
	"xjzh_sanguo_muma_info":"锁定技，当坐骑牌进入弃牌堆时，你可以选择其中一张牌令一名角色装备之（不能替换）",
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
	"xjzh_sanguo_zhongxing_info":"限定技，主公阵亡时，若你不为主公且场上与你势力一致的角色数量为最多之一，你将身份改为主公，所有与你势力一致的角色改为忠臣，此时与你同一阵营的所有角色将势力改为汉，然后其余势力将身份改为反贼；当你阵亡时，你所处的阵营失败。",
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
	"xjzh_sanguo_luoyi_info":"锁定技，游戏开始时，你废除防具栏，此后每当你不因〖虎痴〗获得防具牌时，你回复一点体力。出牌阶段，你可以将防具牌当一张无次数限制的【杀】使用，此【杀】基础伤害为2。",
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
	"xjzh_sanguo_xingyi_info":"出牌阶段限一次，你可以令一名角色弃置所有手牌然后摸等量牌，然后其手牌中每有一张♥牌，其回复一点体力，多余的回复改为摸牌。",
	"xjzh_sanguo_qingnang":"青囊",
	"xjzh_sanguo_qingnang_info":"每回合限一次，一名角色不因此技能体力变化后，若其不处于濒死状态，你可以令其交换体力值与已损体力值，然后若其体力值不小于已损体力值，其获得一点体力上限。",
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
	"xjzh_sanguo_zhiheng_info":"出牌阶段限X次，你可以弃置任意张牌并摸等量的牌，然后若你弃置的牌每多一种花色，你额外摸一张牌（X为你已损失的体力值+1）。",
	"xjzh_sanguo_wuyun":"吴运",
	"xjzh_sanguo_wuyun_info":"你的回合结束时，若你在本回合内发动了制衡1/2/3/4次，则你获得技能吴战/吴盟/吴兴/吴祚。",
	"xjzh_sanguo_wuzhan":"吴战",
	"xjzh_sanguo_wuzhan_info":"限定技，当你将摸不小于三张牌时，可以改为将不超过摸牌数点伤害任意分配给其他角色（每名角色至多分配2点）。",
	"xjzh_sanguo_wumeng":"吴盟",
	"xjzh_sanguo_wumeng_info":"每回合限一次，当你即将摸牌时，你可以取消之并选择一位非吴势力的玩家，然后从牌堆顶展示你摸牌数两倍的牌，并选择其中的一半(四舍五入)获得之，然后其获得另外一半的牌。",
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

};

export default translates;