export const talentList = {
    "wujinshilian": {
        points: 5,
        allocated: {},
        nodes: [
            {
                id: 'root',
                name: '起始节点',
                size: "big",
                description: '结算时你的所有奖励获取量提高20%',
                prerequisites: [],
                img: "root",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "exp", bool == true ? 20 : -20);
                    game.xjzh_addTalentEffect("wujinshilian", "suipian", bool == true ? 20 : -20);
                    game.xjzh_addTalentEffect("wujinshilian", "cailiao", bool == true ? 20 : -20);
                },
                x: 765,
                y: 100
            },
            //分支1 碎片和经验获取相关
            {
                id: 'tA',
                name: '贪婪',
                size: "small",
                description: '结算时碎片获取量提高10%',
                prerequisites: ['root'],
                img: "tA",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "suipian", bool == true ? 10 : -10);
                },
                x: 300,
                y: 250
            },
            {
                id: 'tA1',
                name: '期待',
                size: "small",
                description: '结算时经验获取量提高10%',
                prerequisites: ['tA'],
                img: "tA",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "exp", bool == true ? 10 : -10);
                },
                x: 300,
                y: 400
            },
            {
                id: 'tA2',
                name: '双重诱惑',
                size: "midsize",
                description: '结算时碎片和经验获取量提高20%',
                prerequisites: ['tA1'],
                img: "tA",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "exp", bool == true ? 20 : -20);
                    game.xjzh_addTalentEffect("wujinshilian", "suipian", bool == true ? 20 : -20);
                },
                x: 300,
                y: 550
            },
            {
                id: 'tA3',
                name: '拾荒',
                size: "small",
                description: '结算时碎片获取量提高15%',
                prerequisites: ['tA2'],
                img: "tA",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "suipian", bool == true ? 15 : -15);
                },
                x: 300,
                y: 700
            },
            {
                id: 'tA4',
                name: '渊博',
                size: "small",
                description: '结算时经验获取量提高15%',
                prerequisites: ['tA3'],
                img: "tA",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "exp", bool == true ? 15 : -15);
                },
                x: 300,
                y: 850
            },
            {
                id: 'tA5-1',
                name: '豪赌',
                size: "big",
                description: '点击结算时碎片和经验的获取量50%几率提高200%，但也有50%几率不获得碎片和经验。',
                prerequisites: ['tA4'],
                conflict: "tA5-2",
                img: "tA1",
                addTalentEffects: (bool = false) => { },
                x: 200,
                y: 1000
            },
            {
                id: 'tA5-2',
                name: '胆怯',
                size: "big",
                description: '点击结算时碎片和经验的获取量提高50%。',
                prerequisites: ['tA4'],
                conflict: "tA5-1",
                img: "tA1",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "exp", bool == true ? 50 : -50);
                    game.xjzh_addTalentEffect("wujinshilian", "suipian", bool == true ? 50 : -50);
                },
                x: 400,
                y: 1000
            },

            //分支2 局内游戏相关
            {
                id: 'tB',
                name: '劝降',
                size: "small",
                description: '对1名角色造成伤害时有3%几率令其转变阵营（场上玩家数量少于5时不生效）。',
                prerequisites: ['root'],
                img: "tB",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "changeId", bool == true ? 3 : -3);
                },
                x: 765,
                y: 250
            },
            {
                id: 'tB1',
                name: '隐秘',
                size: "small",
                description: '商店内购买技能/BUFF有3%几率不消耗道韵。',
                prerequisites: ['tB'],
                img: "tB",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "notConsume", bool == true ? 3 : -3);
                },
                x: 765,
                y: 400
            },
            {
                id: 'tB2',
                name: '魅力',
                size: "midsize",
                description: '天赋劝降效果无效；游戏开始时，随机2名敌方非BOSS角色转变阵营（场上玩家数量少于5时不生效）',
                prerequisites: ['tB1'],
                img: "tB",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "changeId", bool == true ? -3 : 3);
                },
                x: 765,
                y: 550
            },
            {
                id: 'tB3',
                name: '盟约',
                size: "small",
                description: '商店内购买技能/BUFF有10%几率不消耗道韵（道韵数量低于时无法触发）',
                prerequisites: ['tB2'],
                img: "tB",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "notConsume", bool == true ? 10 : -10);
                },
                x: 765,
                y: 700
            },
            {
                id: 'tB4',
                name: '凝视',
                size: "small",
                description: '获取道韵时有50%几率额外获得2点道韵',
                prerequisites: ['tB3'],
                img: "tB",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "extra", bool == true ? 50 : -50);
                },
                x: 765,
                y: 850
            },
            {
                id: 'tB5-1',
                name: '宝库',
                size: "big",
                description: '道韵没有储存上限，且商店内购买技能/BUFF有30%几率不消耗道韵（道韵数量低于时无法触发），但若未触发不消耗道韵的效果，购买技能/BUFF/刷新消耗道韵+2。',
                prerequisites: ['tB4'],
                img: "tB1",
                addTalentEffects: (bool = false) => {
                    game.xjzh_addTalentEffect("wujinshilian", "notConsume", bool == true ? 30 : -30);
                    game.xjzh_addTalentEffect("wujinshilian", "consume", bool == true ? 2 : -2);
                },
                x: 665,
                y: 1000
            },
            {
                id: 'tB5-2',
                name: '封印领域',
                size: "big",
                description: '每轮开始时，敌方随机角色有50%几率所有技能失效直到下轮游戏开始，但你有20%几率非锁定技失效直到下轮游戏开始。',
                prerequisites: ['tB4'],
                img: "tB1",
                addTalentEffects: (bool = false) => { },
                x: 865,
                y: 1000
            },

        ]
    }
};