// ==================== 贸易舰队配置 ====================

// 舰队等级配置 (level => cost/output/duration/failRate)
// 舰队等级跟随停机坪等级

export const fleetCosts = {
	1: 50,
	2: 150,
	3: 400,
	4: 1000,
	5: 2500,
	6: 6000,
	7: 15000,
	8: 40000
};

export const fleetOutputs = {
	1: [{ name: '金币', amount: '100' }, { name: '碎片', amount: '10' }],
	2: [{ name: '金币', amount: '300' }, { name: '碎片', amount: '30' }, { name: '银月草', amount: '2' }],
	3: [{ name: '金币', amount: '800' }, { name: '碎片', amount: '80' }, { name: '星辰砂', amount: '3' }],
	4: [{ name: '金币', amount: '2000' }, { name: '碎片', amount: '200' }, { name: '幽兰花', amount: '5' }],
	5: [{ name: '金币', amount: '5000' }, { name: '碎片', amount: '500' }, { name: '凤血石', amount: '2' }],
	6: [{ name: '金币', amount: '12000' }, { name: '碎片', amount: '1200' }, { name: '龙涎果', amount: '3' }],
	7: [{ name: '金币', amount: '30000' }, { name: '碎片', amount: '3000' }, { name: '涅槃火', amount: '2' }],
	8: [{ name: '金币', amount: '80000' }, { name: '碎片', amount: '8000' }, { name: '太古玉', amount: '1' }]
};

// 舰队失败率 (高等级有一定概率失败，失败返还50%金币)
export const fleetFailRates = {
	1: 0,
	2: 0,
	3: 0.05,
	4: 0.1,
	5: 0.15,
	6: 0.2,
	7: 0.25,
	8: 0.3
};

// 舰队贸易时长 (efficiency => duration in seconds)
export function calculateFleetDuration(efficiency) {
	return Math.max(20, 60 - efficiency * 3);
}

// 商人交易物品 (buy/sell with gold)
export const tradeItems = [
	{ id: 'yinyuecao', name: '银月草', buy: 50, sell: 30 },
	{ id: 'xingchensha', name: '星辰砂', buy: 200, sell: 120 },
	{ id: 'youlanhua', name: '幽兰花', buy: 800, sell: 500 },
	{ id: 'fengxieshi', name: '凤血石', buy: 2500, sell: 1500 },
	{ id: 'longxianguo', name: '龙涎果', buy: 8000, sell: 5000 },
	{ id: 'niepanhuo', name: '涅槃火', buy: 25000, sell: 15000 },
	{ id: 'taiguyu', name: '太古玉', buy: 80000, sell: 50000 },
	{ id: 'tianmingshi', name: '天命石', buy: 250000, sell: 150000 }
];