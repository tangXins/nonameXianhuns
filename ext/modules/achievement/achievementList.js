const achievementLists = {
    //武将成就
    //一般是使用某个武将才能完成的特定成就
    character: {
        "奇思爆破": {
            level: 1,
            info: "使用秋凉明在一局游戏内因〖抵抗〗获得10个技能并获得游戏胜利。",
            extra: "奖励：奇术要件“灵感素”",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "百鸟朝凰": {
            level: 1,
            info: "使用童渊发动〖朝凰〗在一局游戏内弃置至少10张牌。",
            extra: "奖励：奇术要件“凤凰图”",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "披坚执锐": {
            level: 3,
            info: "使用文鸯发动〖披坚〗和〖勇决〗各5次并获得胜利10次。",
            extra: "奖励：奇术要件“风雷鞭”",
            progress: 10,
            design: "吃朵棉花糖",
        },
        "微妙玄通": {
            level: 3,
            info: "使用左幽在身份模式中令技能〖通玄〗的红色数字达到10并获得胜利",
            extra: "奖励：奇术要件“冥天照符”",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "再兴炎汉": {
            level: 3,
            info: "使用esp刘协在一局游戏内发动〖天策〗、〖天命〗、〖谋变〗、〖中兴〗各一次且获得10次胜利。",
            extra: "奖励：奇术要件“汉皇信玺”",
            progress: 10,
            design: "吃朵棉花糖",
        },
        "驱雷掣电": {
            level: 3,
            info: "升华试炼中击败神张角并获得胜利30次",
            extra: "奖励：神张角可以在身份模式使用",
            progress: 30,
            design: "吃朵棉花糖",
        },
    },
    game: {
        //对局成就
        //一般是在对局中达成某些特定条件完成的特定成就
        "秘境破虚": {
            level: 1,
            info: "无尽试炼通关第10关",
            extra: "奖励：15个精魄，1天赋点（无尽试炼）",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "破阵凌仙": {
            level: 2,
            info: "无尽试炼通关第30关",
            extra: "奖励：40个精魄，1000个碎片，3天赋点（无尽试炼）",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "斩邪入圣": {
            level: 2,
            info: "无尽试炼通关第50关",
            extra: "奖励：100个精魄，3000个碎片，6天赋点（无尽试炼）",
            progress: 1,
            design: "吃朵棉花糖",
        },
        "凌虚证道": {
            level: 3,
            info: "无尽试炼通关第100关",
            extra: "奖励：300个精魄，10000个碎片，12天赋点（无尽试炼）",
            progress: 1,
            design: "吃朵棉花糖",
        },
    },
    special: {
        //特殊成就
        //一般是为了解锁某些全局奖励完成的特定成就
        "刽子手": {
            level: 3,
            info: "使用决斗者触发技能〖剑风〗击败30名武将",
            extra: "奖励：解锁POE武将处刑者；〖剑风〗可以额外选择一名角色",
            progress: 30,
            design: "吃朵棉花糖",
        },
        "完美斗士": {
            level: 3,
            info: "使用决斗者触发技能〖挑战〗击败30名武将",
            extra: "奖励：解锁POE武将卫士；〖挑战〗未造成伤害时不需要再弃牌",
            progress: 30,
            design: "吃朵棉花糖",
        },
        "火焰大师": {
            level: 3,
            info: "使用女巫触发技能〖火球〗击败30名武将",
            extra: "奖励：解锁POE武将元素使；〖火球〗传导次数大于1会在技能结算时摸2张牌",
            progress: 30,
            design: "吃朵棉花糖",
        },
        "地狱之火": {
            level: 3,
            info: "使用女巫召唤地狱猎犬胜利20次，游戏结束时地狱猎犬须在场",
            extra: "奖励：解锁POE武将狱火师；地狱猎犬发动技能〖燃火〗时令你摸2张牌",
            progress: 20,
            design: "吃朵棉花糖",
        },
        "莉莉丝的梦魇": {
            level: 3,
            info: "在升华试炼击败莉莉丝60次",
            extra: "奖励：莉莉丝可以在其他模式使用",
            progress: 60,
            design: "吃朵棉花糖",
        },
    },

};

/**
 * 遍历 achievementLists 对象，为 reward 对象添加符合条件的成就奖励信息。
 * 筛选出除 'reward' 之外的属性，遍历这些属性下的所有成就条目，
 * 若成就条目包含 extra 属性，则在 reward 对象中添加对应的奖励信息。
 */
/*Object.keys(achievementLists).filter(item => item != "reward").forEach(type =>
    Object.entries(achievementLists[type] ?? {})
        .forEach(([name, achievement]) => {
            achievement.name = name;
            achievement.type = type;
            if (achievement.extra) {
                achievementLists.reward[name] = {
                    info: achievement.extra,
                    level: achievement.level,
                    award: true,
                    name: name,
                    type: type
                };
            }
        })
);*/

export default achievementLists;