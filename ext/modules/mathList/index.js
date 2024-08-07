import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';

export const xjzhMathList={
    1:{
        "question":"汽车行驶时遇到暴雨洪涝灾害，如果在积水中熄火，是否可以再次点火？",
        "option":["可以","不可以"],
        "answer":1,
    },
    2:{
        "question":"延时锦囊牌乐不思蜀（不考虑武将技能）没有哪种花色？",
        "option":["方块","梅花","红桃"],
        "answer":0,
    },
    3:{
        "question":"三国杀中被称为教主的武将是？",
        "option":["左慈","诸葛亮","张角","张飞"],
        "answer":2,
    },
    4:{
        "question":"不拘一格降人才是谁的诗？",
        "option":["李白","李商隐","纳兰性德","龚自珍"],
        "answer":3,
    },
    5:{
        "question":"“十步杀一人，千里不留行。事了拂衣去，深藏身与名。”出自哪首诗？",
        "option":["侠客行","武侠行","金庸行","李白行"],
        "answer":0,
    },
    6:{
        "question":"“安能摧眉折腰事权贵”的下一句是？",
        "option":["明朝散发弄扁舟","直挂云帆济沧海","随君直到夜郎西","使我不得开心颜"],
        "answer":3,
    },
    7:{
        "question":"“大鹏一日同风起，扶摇直上九万里”，诗人以大鹏自比，其中的大鹏取自庄子的哪一名篇？",
        "option":["齐物论","田子方","逍遥游","南华真经"],
        "answer":2,
    },
    8:{
        "question":"“到中流击水，浪遏飞舟”是在哪一条江河？",
        "option":["湘江","珠江","澜沧江","汉江"],
        "answer":0,
    },
    9:{
        "question":"韩信“明修栈道，暗度陈仓”是为了骗过谁？",
        "option":["项籍","项梁","项燕","项庄"],
        "answer":0,
    },
    10:{
        "question":"全国开展“向雷锋同志学习”的热潮始于哪一年？",
        "option":["1961","1962","1963","1981"],
        "answer":2,
    },
    11:{
        "question":"领导我们事业的核心力量是中国共产党，这一论断是毛泽东在哪一次会议中提出来的？",
        "option":["中华人民共和国第一届全国人民代表大会第一次会议","中华人民共和国第一届全国人民代表大会第二次会议","中华人民共和国第一届全国人民代表大会第三次会议","中华人民共和国第二届全国人民代表大会第一次会议"],
        "answer":0,
    },
    12:{
        "question":"以下哪部著作中，认为数学是天地万物最根本的东西，是四时之终始，万物之祖宗？",
        "option":["周脾算经","九章算术","海岛算经","孙子算经"],
        "answer":3,
    },
    13:{
        "question":"预备党员认真履行党员义务，具备党员条件的，应当按期转为正式党员；需要继续考察和教育的，可以延长预备期，但不能超过（）。",
        "option":["半年","一年","一年半","两年"],
        "answer":1,
    },
    14:{
        "question":"冰球的比赛用球一般是用什么材质制作的？",
        "option":["塑料","橡胶","铝合金","铅"],
        "answer":1,
    },
    15:{
        "question":"湄公河发源于我国的唐古拉山东北坡，在我国境内被称为？",
        "option":["怒江","澜沧江","松花江","黑龙江"],
        "answer":1,
    },
    16:{
        "question":"已知A+B的和为39.6，如果把A的小数点向右移动一位，则A等于B，求A和B的值。",
        "option":["A:1.5,B:15","A:2.3,B:23","A:3.6,B:36"],
        "answer":2,
    },
    17:{
        "question":"建安五年,袁曹争霸,曹操的军师()巧施'饵敌'之计,击败文丑。 ",
        "option":["刘晔","程昱", "荀彧","荀攸"],
        "answer":3,
    },
    18:{
        "question":" 建安五年,袁曹争霸,曹操军师所用的“饵敌”之计大败文丑在明代小说《三国演义》中被改编为？",
        "option":["关羽斩文丑","夜袭乌巢","官渡之战","许攸献计"],
        "answer":0,
    },
    19:{
        "question":"正史中“草船借箭”的主人公是？",
        "option":["诸葛亮","周瑜","孙权","曹操"],
        "answer":2,
    },
    20:{
        "question":"在《三国演义平话》中使用草船借箭的是？",
        "option":["诸葛亮","周瑜","孙权","曹操"],
        "answer":1,
    },
    21:{
        "question":"正史中诸葛亮主动出兵北伐几次？",
        "option":["6","5","4","3"],
        "answer":1,
    },
    22:{
        "question":"《三国演义》中空城计的故事灵感来源于哪位人物的空营计？",
        "option":["关羽","张飞","赵云","马超"],
        "answer":2,
    },
    23:{
        "question":"典故好好先生来源于东汉末年哪位人物？",
        "option":["庞德公","司马徽","皇甫嵩","卢植"],
        "answer":1,
    },
    24:{
        "question":"送分题！仙家之魂的作者是？",
        "option":["呓朵棉花糖","吃个棉花糖","吃朶棉花糖","吃朵棉花糖"],
        "answer":3,
    },
    25:{
        "question":"一列火车长200米，通过一条长430的隧道用了42秒，以同样的速度通过某站台用25秒，这个站台长多少米？",
        "option":["216米","169米","263米","175米"],
        "answer":3,
    },
    26:{
        "question":"一项工作，甲单独做需15天完成，乙单独做需12天完成。这项工作由甲乙两人合做，并且施工期间乙休息7天，问几天完成？",
        "option":["12天","10天","8天","6天"],
        "answer":1,
    },
    27:{
        "question":"“飞流直下三千尺，疑是银河落九天。”这句诗运用了什么修辞手法？",
        "option":["用典","比喻","拟人","夸张"],
        "answer":3,
    },
    28:{
        "question":"“大宝在发动〖破军〗并装备古锭刀的情况下，酒火杀装备了藤甲的标诸葛亮，能造成几点伤害？",
        "option":["0点","1点","2点","3点","4点"],
        "answer":4,
    },
    29:{
        "question":"《仙家之魂》esp刘协发动【天策】会将其他角色的所有牌置入处理区，包括判定区？",
        "option":["对","错"],
        "answer":0,
    },
    30:{
        "question":"怎样才能取得民族独立和人民解放？近代以来历史表明，必须首先（）",
        "option":["反帝反封建的民主革命","旧民主主义革命","新民主主义革命","农民起义"],
        "answer":0,
    },
    31:{
        "question":"“红船精神”的诞生地是哪儿？",
        "option":["上海","江苏扬州","延安","浙江嘉兴"],
        "answer":3,
    },
    32:{
        "question":"1937年7月，日本蓄意制造了（），全面抗日战争开始。",
        "option":["九·一八事变","七七事变","西安事变","华北事变"],
        "answer":1,
    },
    33:{
        "question":"“一诺千金”出自《史记》，原文为“得黄金百两，不如（）一诺”。",
        "option":["龙且","项燕","钟离昧","季布","张良"],
        "answer":3,
    },
    34:{
        "question":"下列词语正确的是？",
        "option":["创作","创做","怆作","创做"],
        "answer":0,
    },
    35:{
        "question":"下列哪一项文学常识是正确的？",
        "option":["曹操，字孟德，是三国时期的文学家、政治家、军事家","李白的诗充满了浪漫主义色彩，是初唐时期最伟大的诗人之一","王勃，与卢照邻、杨炯、王维合成为初唐四杰","曹植，建安时期著名文学家，被谢灵运评为“才高八斗”"],
        "answer":3,
    },
    36:{
        "question":"中国历史上第一个皇帝是？",
        "option":["汉高祖刘邦","唐太宗李世民","魏武帝曹操","秦始皇嬴政"],
        "answer":3,
    },
    37:{
        "question":"《孙子兵法》中“上兵”手段是？",
        "option":["伐谋","伐交","非攻","兼爱"],
        "answer":0,
    },
    38:{
        "question":"中国历史上最后一个皇帝是？",
        "option":["明思宗朱由检","唐哀帝李柷","汉献帝刘协","爱新觉罗·溥仪"],
        "answer":3,
    },
    39:{
        "question":"“一剑曾当百万师”的上一句是？",
        "option":["一身转战三千里","会当水击三千里","破敌无需十万兵","一剑霜寒十九洲"],
        "answer":0,
    },
    40:{
        "question":"山水诗派的鼻祖是？",
        "option":["孟浩然","王维","谢灵运","陶渊明"],
        "answer":2,
    },
    41:{
        "question":"无名杀《金庸群侠传》扩展的作者是？",
        "option":["小熊大猫","大小熊猫","小大熊猫","大熊小猫"],
        "answer":3,
    },
    42:{
        "question":"单机武侠RPG游戏《金庸群侠传》的开发者是？",
        "option":["大熊小猫","半瓶神仙醋","河洛工作室","吃朵棉花糖"],
        "answer":2,
    },
    43:{
        "question":"Flash单机武侠RPG游戏《金庸群侠传》的开发者是？",
        "option":["大熊小猫","半瓶神仙醋","河洛工作室","吃朵棉花糖"],
        "answer":1,
    },
    44:{
        "question":"“路漫漫其修远兮，吾将上下而求索”是谁的名言？",
        "option":["墨子","孔子","屈原","老子"],
        "answer":2,
    },
    45:{
        "question":"1937年7月，全面抗日战争爆发后，11月20日，国民政府正式迁都（）？",
        "option":["成都","重庆","南京","武汉"],
        "answer":1,
    },
    46:{
        "question":"三国杀中，如果一名武将将牌堆摸空，而此时弃牌堆没有牌，如何结算？",
        "option":["摸牌者胜利","继续游戏","摸牌者失败","平局"],
        "answer":3,
    },
    47:{
        "question":"高压电线脱落，如果不慎进入高压电圈，如何自救？",
        "option":["快速逃离","继续前行","慢步离开","单脚跳走"],
        "answer":3,
    },
    48:{
        "question":"在抖音刷到美女不影响身体的正确做法是？",
        "option":["划过","保存","点赞","收藏","分享"],
        "answer":0,
    },
    49:{
        "question":"电视剧《轮到你了》中黑岛沙和的扮演者是谁？",
        "option":["西野五濑","西野六濑","西野七濑","西野八濑","西野九濑"],
        "answer":2,
    },
    50:{
        "question":"请补全《绝句》窗含西岭千秋雪，门泊（）万里船。",
        "option":["西蜀","东吴","南晋","北魏"],
        "answer":1,
    },
    51:{
        "question":"中国历史上第一次大规模农民起义是？",
        "option":["黄巾起义","绿林起义","太平天国起义","陈胜吴广起义"],
        "answer":3,
    },
    52:{
        "question":"公元184年爆发了一次大规模的农民起义，标志性三国历史的开始，这一次农民起义是？",
        "option":["黄巾起义","绿林起义","太平天国起义","陈胜吴广起义"],
        "answer":0,
    },
    53:{
        "question":"张鲁是所在教派是？",
        "option":["五升米教","五升面教","五斗米教","五斗面教"],
        "answer":2,
    },
    54:{
        "question":"阮籍等七人组成的组合名称是？",
        "option":["全真七子","江南七怪","竹林七贤","建安七子"],
        "answer":2,
    },
    55:{
        "question":"“但使龙城飞将在”的下一句是？",
        "option":["芙蓉帐暖度春宵","朕与将军解战袍","不教胡马度阴山","从此君王不早朝"],
        "answer":2,
    },
    56:{
        "question":"“但使龙城飞将在”的飞将是谁？",
        "option":["吕布","张飞","李靖","李广"],
        "answer":3,
    },
    57:{
        "question":"无名杀扩展《海国图志》的作者酷爱（）",
        "option":["人妻","恶鬼","少女","僵尸"],
        "answer":3,
    },
    58:{
        "question":"全面抗日战争期间，()后日本在南京犯下了罄竹难书的滔天罪行。",
        "option":["皖南事变","一·二八事变","三三事变","八·一三事变"],
        "answer":3,
    },
    59:{
        "question":"在开启双将的情况下，选择《仙家之魂》大乔和小乔组成双将，濒死发动技能〖离乡〗会将武将牌替换为（）或（）？",
        "option":["大乔","小乔","大桥","小桥"],
        "answer":[0,1],
    },
    60:{
        "question":"公元184年爆发的黄巾起义中，黄巾军的主要指挥官是（）（）（）",
        "option":["张宁","张角","张宝","张松","张梁","张辽","张任"],
        "answer":[1,2,4],
    },
    61:{
        "question":"《诗经》主要分类有（）（）（）",
        "option":["赋","比","风","雅","兴","颂"],
        "answer":[2,3,5],
    },
    62:{
        "question":"儒家经典中的四书是哪四书？",
        "option":["大学","中学","中庸","孟子","孔子","论语","淮南子"],
        "answer":[0,2,3,5],
    },
    62:{
        "question":"儒家经典中的五经是哪五经？",
        "option":["诗经","辞海","尚书","中书","礼记","周易","春秋"],
        "answer":[0,2,4,5,6],
    },
    63:{
        "question":"儒家学派的代表人物有哪些？",
        "option":["孔子","孟子","荀子","庄子","慧子","墨子","韩非子"],
        "answer":[0,1,2],
    },
    64:{
        "question":"以下哪几个皇帝是中国历史上某一个封建王朝的末代皇帝？",
        "option":["刘辨","李隆基","赵构","朱由检","李柷","赢子婴"],
        "answer":[3,4,5],
    },

};