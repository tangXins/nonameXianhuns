export const affix = {
    "xjzh_affix_shenjing": {
        name: '完美神经',
        type: 'prefix',
        affixes: [
            {
                desc: '护甲',
                valType: 'num',
                levelRule: {
                    0: { min: 16, max: 20, rate: 0.2 },
                    1: { min: 11, max: 15, rate: 0.35 },
                    2: { min: 6, max: 10, rate: 0.5 },
                    3: { min: 1, max: 5, rate: 0.85 }
                },
            },
            {
                desc: '体力上限',
                valType: 'num',
                levelRule: {
                    0: { min: 4, max: 5, rate: 0.2 },
                    1: { min: 3, max: 3, rate: 0.35 },
                    2: { min: 2, max: 2, rate: 0.5 },
                    3: { min: 1, max: 1, rate: 0.85 }
                },
            },
            {
                desc: '摸牌数',
                valType: 'num',
                levelRule: {
                    0: { min: 4, max: 5, rate: 0.2 },
                    1: { min: 3, max: 3, rate: 0.35 },
                    2: { min: 2, max: 2, rate: 0.5 },
                    3: { min: 1, max: 1, rate: 0.85 }
                },
            }
        ],
    },
    "xjzh_affix_xiedian": {
        name: '邪恶典籍',
        type: 'suffix',
        affixes: [
            {
                desc: '护甲',
                valType: 'num',
                levelRule: {
                    0: { min: 16, max: 20, rate: 0.2 },
                    1: { min: 11, max: 15, rate: 0.35 },
                    2: { min: 6, max: 10, rate: 0.5 },
                    3: { min: 1, max: 5, rate: 0.85 }
                },
            },
            {
                desc: '体力上限',
                valType: 'num',
                levelRule: {
                    0: { min: 4, max: 5, rate: 0.2 },
                    1: { min: 3, max: 3, rate: 0.35 },
                    2: { min: 2, max: 2, rate: 0.5 },
                    3: { min: 1, max: 1, rate: 0.85 }
                },
            },
            {
                desc: '摸牌数',
                valType: 'num',
                levelRule: {
                    0: { min: 4, max: 5, rate: 0.2 },
                    1: { min: 3, max: 3, rate: 0.35 },
                    2: { min: 2, max: 2, rate: 0.5 },
                    3: { min: 1, max: 1, rate: 0.85 }
                },
            }
        ],
    },
    "xjzh_affix_tianshi": {
        name: '天使核心',
        type: 'both',
    }
};