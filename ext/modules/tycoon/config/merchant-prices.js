// ==================== 商人价格系统 ====================

// 稀有度系数
export const rarityMultipliers = {
	'普通': 1.0,
	'优秀': 1.5,
	'稀有': 2.5,
	'史诗': 5.0,
	'神话': 10.0,
	'传说': 20.0
};

// 基础价格表（不含等级加成）
export const basePrices = {
	yinyuecao:   { buy: 50,    sell: 30,  rarity: '普通' },
	xingchensha: { buy: 200,   sell: 120, rarity: '普通' },
	youlanhua:   { buy: 800,   sell: 500, rarity: '优秀' },
	fengxieshi:  { buy: 2500,  sell: 1500,rarity: '优秀' },
	longxianguo: { buy: 8000,  sell: 5000,rarity: '稀有' },
	niepanhuo:   { buy: 25000, sell: 15000,rarity: '史诗' },
	taiguyu:     { buy: 80000, sell: 50000,rarity: '神话' },
	tianmingshi: { buy: 250000,sell: 150000,rarity: '传说' }
};

// 等级影响系数（每级增加20%）
function getLevelMultiplier(level) {
	return 1 + (level - 1) * 0.2;
}

// 获取买入价格（含等级加成）
export function getBuyPrice(itemId, level) {
	var base = basePrices[itemId];
	if (!base) return 0;
	var levelMod = getLevelMultiplier(level || 1);
	return Math.floor(base.buy * levelMod);
}

// 获取卖出价格（含等级加成）
export function getSellPrice(itemId, level) {
	var base = basePrices[itemId];
	if (!base) return 0;
	var levelMod = getLevelMultiplier(level || 1);
	return Math.floor(base.sell * levelMod);
}

// 获取价格信息
export function getPriceInfo(itemId, level) {
	var base = basePrices[itemId];
	if (!base) return null;
	return {
		buy: getBuyPrice(itemId, level),
		sell: getSellPrice(itemId, level),
		rarity: base.rarity,
		levelMultiplier: getLevelMultiplier(level || 1)
	};
}

// 获取所有可交易物品列表
export function getTradeableItems(level) {
	var items = [];
	for (var id in basePrices) {
		if (basePrices.hasOwnProperty(id)) {
			items.push({
				id: id,
				buy: getBuyPrice(id, level),
				sell: getSellPrice(id, level),
				rarity: basePrices[id].rarity
			});
		}
	}
	return items;
}