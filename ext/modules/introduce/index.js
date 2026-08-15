import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';

//const colorx=game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor");

export const introduces = {
    "xjzh_intro_yunianjiejing": {
        name: "欲念结晶",
        info: `装备欲念罗盘后，你在游戏内造成伤害会获得随机数量的欲念结晶；
                <li>欲念结晶用于在游戏结束时有几率使获得的奖励提高，若该几率未达到100%，若未触发奖励提高则奖励会全部消失；
                <li>每点欲念结晶提供0.1%成功几率，超出100%的几率，每有5%几率提供最终奖励提高1%。`,
    },
    "xjzh_intro_arcaneDefense": {
        name: "魔力抵抗",
        info: `原本受到伤害或流失体力的效果会以更多魔力抵消，一般为10倍魔力。`,
    },
    "xjzh_intro_qixingminpan": {
        name: "七星命盘",
        info: `<br>&nbsp;&nbsp;&nbsp;&nbsp;SP诸葛亮发动技能〖观星〗获得附加效果的条件，具体如下。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【天枢】</font>将所有牌置于牌堆顶：你获得这些牌中的所有基本牌。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【天璇】</font>置于牌堆顶的牌大于置于牌堆底的牌：你本回合使用牌无次数限制。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【天玑】</font>置于牌堆顶的红色牌大于置于牌堆底的红色牌：你令一名其他角色获得“狂风”标记。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【天权】</font>置于牌堆顶的黑色牌大于置于牌堆底的黑色牌：令一名其他角色获得“大雾”标记。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【玉衡】</font>将所有牌置于牌堆底：获得这些牌中的所有锦囊牌。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【开阳】</font>置于牌堆底的红色牌大于置于牌堆顶的红色牌：你对一名其他角色造成一点火焰伤害。
        <br><br>&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:#da701a'>【摇光】</font>置于牌堆底的黑色牌大于置于牌堆顶的黑色牌：获得技能〖甘霖〗直到你下一次发动〖观星〗。
        <br><br><br><br>`,
    },
    "xjzh_intro_zhaohuan": {
        name: "召唤",
        info: `将一名角色添加至场上作为召唤物，召唤物与普通武将没有区别，但召唤物阵亡时会被移出游戏，当召唤该召唤物的武将阵亡时，其召唤的所有召唤物均会被移出游戏`,
    },
    "xjzh_intro_kuloumushi": {
        name: "骷髅牧师",
        info: `骷髅牧师会在每轮开始时治疗所有友方召唤物和召唤师，且治疗效果会根据场上召唤物的数量变化<br><br><img style=width:340px src=${rootURL}extension/仙家之魂/image/avatar/xjzh_avatar_kuloumushi.png>`,
    },
    "xjzh_intro_kuloufengbaofashi": {
        name: "骷髅风暴法师",
        info: `骷髅风暴法师对敌方角色造成伤害会令其获得一层感电，且会令感电层数突破上限<br><br><img style=width:340px src=${rootURL}extension/仙家之魂/image/avatar/xjzh_avatar_kuloufengbaofashi.png>`,
    },
    "xjzh_intro_kulouzonghuozhe": {
        name: "骷髅纵火者",
        info: `骷髅纵火者会令场上所有敌方角色的燃烧层数突破上限，并有几率在你造成火属性伤害时令随机一名敌方角色受到一点火属性伤害<br><br><img style=width:340px src=${rootURL}extension/仙家之魂/image/avatar/xjzh_avatar_kulouzonghuozhe.png>`,
    },
    "xjzh_intro_diyuliequan": {
        name: "地狱猎犬",
        info: `地狱猎犬会周期性令周围敌方被点燃；若场上有被点燃的角色，你造成火属性伤害+1<br><br><img style=width:340px src=${rootURL}extension/仙家之魂/image/avatar/xjzh_avatar_diyuliequan.png>`,
    },
    "xjzh_intro_dianran": {
        name: "点燃",
        info: "武将牌上有燃烧BUFF的角色被视为点燃",
    },
    "xjzh_intro_huixin": {
        name: "会心",
        info: "拥有会心的角色和技能有几率发动额外的效果，默认的会心几率与技能计算的方式为乘算提高，如某角色的会心几率为50%，技能为35%，那么该技能最终有0.35*(1+0.5)=0.525，即有52.5%的几率触发技能。<br><br>会心几率默认为10%（未定义则为0），部分角色例外，如：<br><br><li>娜塔亚：50%<li>亚非克拉：20%",
    },
    "xjzh_intro_zhongdu": {
        name: "中毒",
        info: "使用牌有每层20%几率失效且有几率受到1点无来源毒属性伤害",
    },
    "xjzh_intro_kongzhi": {
        name: "控制",
        info: "翻面、横置、判定区有牌、装备区被废除、角色拥有减益buff",
    },
    "xjzh_intro_mumang": {
        name: "目盲",
        info: "你使用牌有每层30%几率改为随机目标",
    },
    "xjzh_intro_yishang": {
        name: "易伤",
        info: "受到伤害有30%乘层数几率加层数点伤害",
    },
    "xjzh_intro_xuanyun": {
        name: "眩晕",
        info: "翻面",
    },
    "xjzh_intro_lingjiu": {
        name: "灵柩",
        info: "场上已阵亡的角色",
    },
    "xjzh_intro_huanxing": {
        name: "唤醒",
        info: "将一名已阵亡的角色唤醒为你选择的灵魂，不解放灵魂",
    },
    "xjzh_intro_jiefang": {
        name: "解放",
        info: "将死亡之书中收集的灵魂移除",
    },
    "xjzh_intro_bingdong": {
        name: '冰冻',
        info: '当你获得此buff时，弃置所有牌，然后直到此buff移除，你无法使用或打出牌',
    },
    "xjzh_intro_guanzhu": {
        name: '灌注',
        info: '令某张牌造成属性伤害',
    },
    "xjzh_intro_ranshao": {
        name: '燃烧',
        info: '基于你所受到的火焰伤害令你额外受到火焰伤害，每当buff衰减时，受到一点无来源火焰伤害',
    },
    "xjzh_intro_binghuan": {
        name: '冰缓',
        info: '出牌时间限定为10s，出牌等待时间提高50%',
    },
    "xjzh_intro_gandian": {
        name: '感电',
        info: '任意角色对拥有此效果的角色造成伤害有20%几率+1',
    },
    "xjzh_intro_zhouwei": {
        name: '周围',
        info: '攻击范围内的武将',
    },
    "xjzh_intro_baojiRan": {
        name: '暴击几率',
        info: '造成伤害有几率造成额外伤害',
    },
    "xjzh_intro_baoji": {
        name: '暴击',
        info: '造成伤害基于你的暴击伤害加成提高其受到的伤害，基础暴击伤害加成为100%，暴击伤害无视白银狮子等装备的伤害减免',
    },
    "xjzh_intro_baojiDamage": {
        name: '暴击伤害',
        info: '暴击时根据暴击伤害加成增加额外伤害，基础为100%',
    },
    "xjzh_intro_fanji": {
        name: "反击",
        info: "格挡后有几率对其使用一张杀",
    },
    "xjzh_intro_gedang": {
        name: "格挡",
        info: "你受到伤害前有几率免疫之，并回复等量体力",
    },
    "xjzh_intro_qianggu": {
        name: "强固",
        info: "当你的强固体力值不小于你的体力值时，你有20%几率防止伤害，强固的体力值不能超过体力上限。",
    },
    "xjzh_intro_maxGedang": {
        name: "格挡上限",
        info: "你最多能获得的格挡几率",
    },
    "xjzh_intro_gongji": {
        name: "物理攻击",
        info: "无属性伤害",
    },
    "xjzh_intro_fashu": {
        name: "法术攻击",
        info: "属性伤害",
    },
    "xjzh_intro_fujin": {
        name: "附近",
        info: "上家和下家",
    },
    "xjzh_intro_youjun": {
        name: "友军",
        info: "与你身份一致（国战改为势力一致）",
    },
    "xjzh_intro_jufeng": {
        name: "提速尾流",
        info: "每层提速尾流提供3%几率伤害免疫，每两层提速尾流使你摸牌阶段额外摸1张牌且使你手牌上限+1，每5层提速尾流使你卡牌使用次数+1，最大10层",
    },
    "xjzh_intro_jiansu": {
        name: "减速",
        info: "你的攻击距离减少buff层数",
    },
    "xjzh_intro_dingshen": {
        name: "定身",
        info: "你计算与其他角色距离增加buff层数",
    },

};