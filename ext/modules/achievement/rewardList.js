export const rewardLists = {
    "奇思爆破": {
        image: "xjzh_qixia_qiuliangming",
        info: "使用秋凉明在一局游戏内因〖抵抗〗获得10个技能并获得游戏胜利。",
        extra: "奖励：奇术要件“灵感素”",
        unlocked() {
            game.xjzh_gainEquip("xjzh_qishu_linggansu", 1);
            let str = `获得奇术要件“灵感素”`;
            game.xjzh_openLoading(str);
        },
    },
    "百鸟朝凰": {
        image: "xjzh_sanguo_tongyuan",
        info: "使用童渊发动〖朝凰〗在一局游戏内弃置至少10张牌。",
        extra: "奖励：奇术要件“凤凰图”",
        unlocked() {
            game.xjzh_gainEquip("xjzh_qishu_chaofeng", 1);
            let str = `获得奇术要件“凤凰图”`;
            game.xjzh_openLoading(str);
        },
    },
    "披坚执锐": {
        image: "xjzh_sanguo_wenyang",
        info: "使用文鸯发动〖披坚〗和〖勇决〗各5次并获得胜利10次。",
        extra: "奖励：奇术要件“风雷鞭”",
        unlocked() {
            game.xjzh_gainEquip("xjzh_qishu_fengleibian", 1);
            let str = `获得奇术要件“风雷鞭”`;
            game.xjzh_openLoading(str);
        },
    },
    "微妙玄通": {
        image: "xjzh_sanguo_zuoyou",
        info: "使用左幽在身份模式中令技能〖通玄〗的红色数字达到10并获得胜利",
        extra: "奖励：奇术要件“冥天照符”",
        unlocked() {
            game.xjzh_gainEquip("xjzh_qishu_mingtianfu", 1);
            let str = `获得奇术要件“冥天照符”`;
            game.xjzh_openLoading(str);
        },
    },
    "再兴炎汉": {
        image: "xjzh_sanguo_espliuxie",
        info: "使用esp刘协在一局游戏内发动〖天策〗、〖天命〗、〖谋变〗、〖中兴〗各一次且获得10次胜利。",
        extra: "奖励：奇术要件“汉皇信玺”",
        unlocked() {
            game.xjzh_gainEquip("xjzh_qishu_hanhuangxi", 1);
            let str = `获得奇术要件“汉皇信玺”`;
            game.xjzh_openLoading(str);
        },
    },
    "驱雷掣电": {
        image: "xjzh_boss_zhangjiao",
        info: "升华试炼中击败神张角并获得胜利30次",
        extra: "奖励：神张角可以在身份模式使用",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_sanguo_espzhangjiao');
        },
    },
    "秘境破虚": {
        image: "reward",
        info: "无尽试炼通关第10关",
        extra: "奖励：15个精魄，1天赋点",
        unlocked() {
            game.xjzh_changeTokens(15);
            game.xjzh_gainTalentNum("wujinshilian", 1);
            let str = `获得精魄X15；无尽试炼天赋X1`;
            game.xjzh_openLoading(str);
        },
    },
    "破阵凌仙": {
        image: "reward",
        info: "无尽试炼通关第30关",
        extra: "奖励：40个精魄，1000个碎片，3天赋点",
        unlocked() {
            game.xjzh_changeTokens(40);
            game.xjzh_changeSuipian(1000);
            game.xjzh_gainTalentNum("wujinshilian", 3);
            let str = `获得精魄X40；碎片X1000；无尽试炼天赋X3`;
            game.xjzh_openLoading(str);
        },
    },
    "斩邪入圣": {
        image: "reward",
        info: "无尽试炼通关第50关",
        extra: "奖励：100个精魄，3000个碎片，6天赋点",
        unlocked() {
            game.xjzh_changeTokens(100);
            game.xjzh_changeSuipian(3000);
            game.xjzh_gainTalentNum("wujinshilian", 6);
            let str = `获得精魄X100；碎片X3000；无尽试炼天赋X6`;
            game.xjzh_openLoading(str);
        },
    },
    "凌虚证道": {
        image: "reward",
        info: "无尽试炼通关第100关",
        extra: "奖励：300个精魄，10000个碎片，12天赋点",
        unlocked() {
            game.xjzh_changeTokens(300);
            game.xjzh_changeSuipian(10000);
            game.xjzh_gainTalentNum("wujinshilian", 12);
            let str = `获得精魄X300；碎片X10000；无尽试炼天赋X12`;
            game.xjzh_openLoading(str);
        },
    },
    "刽子手": {
        image: "xjzh_poe_juedouzhe",
        info: "使用决斗者触发技能〖剑风〗击败30名武将",
        extra: "奖励：解锁POE武将处刑者；〖剑风〗可以额外选择一名角色",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_poe_chuxing');
        },
    },
    "完美斗士": {
        image: "xjzh_poe_juedouzhe",
        info: "使用决斗者触发技能〖挑战〗击败30名武将",
        extra: "奖励：解锁POE武将卫士；〖挑战〗未造成伤害时不需要再弃牌",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_poe_weishi');
        },
    },
    "火焰大师": {
        image: "xjzh_poe_nvwu",
        info: "使用女巫触发技能〖火球〗击败30名武将",
        extra: "奖励：解锁POE武将元素使；〖火球〗传导次数大于1会在技能结算时摸2张牌",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_poe_yuansushi');
        },
    },
    "地狱之火": {
        image: "xjzh_poe_nvwu",
        info: "使用女巫召唤地狱猎犬胜利20次，游戏结束时地狱猎犬须在场",
        extra: "奖励：解锁POE武将狱火师；地狱猎犬发动技能〖燃火〗时令你摸2张牌",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_poe_yuhuoshi');
        },
    },
    "莉莉丝的梦魇": {
        image: "xjzh_boss_lilisi",
        info: "在升华试炼击败莉莉丝60次",
        extra: "奖励：莉莉丝可以在其他模式使用",
        unlocked() {
            game.xjzhAchi.unlockedCharacter('xjzh_diablo_lilisi');
        },
    },
};
