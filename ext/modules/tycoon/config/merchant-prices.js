// ==================== 商人价格系统 ====================

export const rarityMultipliers = {
	'普通': 1.0,
	'优秀': 1.5,
	'稀有': 2.5,
	'史诗': 5.0,
	'神话': 10.0,
	'传说': 20.0
};

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

export const specialItemPrices = {
	shards:          { name: '碎片', icon: '💎', desc: '通用碎片，锻造基础材料', buy: 20,    sell: 10,  rarity: '普通',   stockRange: [50, 500] },
	essence:         { name: '精魄', icon: '🔮', desc: '通用精魄，高级锻造材料', buy: 200,   sell: 100, rarity: '稀有',   stockRange: [10, 100] },
	talentComponent: { name: '奇术要件', icon: '📜', desc: '随机品质的天赋组件，有几率附带稀有天赋', buy: 5000,  sell: 2000,rarity: '史诗',   stockRange: [1, 5] },
	dollarChest:     { name: '美元宝箱', icon: '💰', desc: '开启可获得大量金币（500~20000）', buy: 3000,  sell: 1500,rarity: '稀有',   stockRange: [1, 8] },
	rune:            { name: '符文', icon: '🔯', desc: '神秘符文，可用于特殊系统', buy: 1500,  sell: 800, rarity: '优秀',   stockRange: [1, 10] },
	nestKey:         { name: '巢穴钥匙', icon: '🗝️', desc: '开启特殊巢穴的钥匙', buy: 10000, sell: 5000,rarity: '史诗',   stockRange: [1, 3] }
};

function getLevelMultiplier(level) {
	return 1 + (level - 1) * 0.2;
}

export function getBuyPrice(itemId, level) {
	var base = basePrices[itemId];
	if (!base) return 0;
	var levelMod = getLevelMultiplier(level || 1);
	return Math.floor(base.buy * levelMod);
}

export function getSellPrice(itemId, level) {
	var base = basePrices[itemId];
	if (!base) return 0;
	var levelMod = getLevelMultiplier(level || 1);
	return Math.floor(base.sell * levelMod);
}

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

export function generatePriceSeed() {
	return Math.random();
}

export function getFluctuatedPrice(basePrice, seed) {
	var fluctuation = 0.7 + seed * 0.6;
	return Math.max(1, Math.floor(basePrice * fluctuation));
}

export function getStockCount(stockRange, seed) {
	var min = stockRange[0];
	var max = stockRange[1];
	return min + Math.floor(seed * (max - min + 1));
}

export function generateShopItems(level, seed) {
	var levelMod = getLevelMultiplier(level || 1);
	var items = [];
	var itemIds = [];

	for (var id in specialItemPrices) {
		if (specialItemPrices.hasOwnProperty(id)) {
			itemIds.push(id);
		}
	}

	var matIds = [];
	for (var mid in basePrices) {
		if (basePrices.hasOwnProperty(mid)) {
			matIds.push(mid);
		}
	}

	var usedSlots = {};
	var slotSeed = seed;

	itemIds.forEach(function(id, idx) {
		var spec = specialItemPrices[id];
		var slotKey = 'special_' + idx;
		var itemSeed = (slotSeed * (idx + 1) + 0.31) % 1;
		var buy = Math.max(1, Math.floor(spec.buy * levelMod * (0.7 + itemSeed * 0.6)));
		var sell = Math.max(1, Math.floor(spec.sell * levelMod * (0.7 + itemSeed * 0.6)));
		var stock = getStockCount(spec.stockRange, itemSeed);

		if (stock > 0) {
			items.push({
				id: id,
				name: spec.name,
				icon: spec.icon,
				type: 'special',
				buy: buy,
				sell: sell,
				rarity: spec.rarity,
				stock: stock,
				desc: spec.desc,
				hasTalent: id === 'talentComponent',
				isDollarChest: id === 'dollarChest',
				isRune: id === 'rune',
				isNestKey: id === 'nestKey'
			});
		}
	});

	var matCount = Math.min(matIds.length, 4);
	var shuffled = matIds.slice().sort(function() { return (seed * 100) % 1 - 0.5; });
	for (var mi = 0; mi < matCount; mi++) {
		var matId = shuffled[mi];
		var mat = basePrices[matId];
		var mSeed = (seed * (mi + 3) + 0.67) % 1;
		var mBuy = Math.max(1, Math.floor(mat.buy * levelMod * (0.7 + mSeed * 0.6)));
		var mSell = Math.max(1, Math.floor(mat.sell * levelMod * (0.7 + mSeed * 0.6)));
		var mStock = 5 + Math.floor(mSeed * 20);

		items.push({
			id: matId,
			name: getMatName(matId),
			icon: getMatIcon(matId),
			type: 'forgeMat',
			buy: mBuy,
			sell: mSell,
			rarity: mat.rarity,
			stock: mStock,
			matId: matId
		});
	}

	items.sort(function(a, b) {
		var order = { '普通': 1, '优秀': 2, '稀有': 3, '史诗': 4, '神话': 5, '传说': 6 };
		return (order[a.rarity] || 0) - (order[b.rarity] || 0);
	});

	return items;
}

function getSpecialIcon(id) {
	var icons = {
		shards: '💎',
		essence: '🔮',
		talentComponent: '📜',
		dollarChest: '💰',
		rune: '🔯',
		nestKey: '🗝️'
	};
	return icons[id] || '📦';
}

function getSpecialDesc(id) {
	var descs = {
		shards: '通用碎片，锻造基础材料',
		essence: '通用精魄，高级锻造材料',
		talentComponent: '随机品质的天赋组件',
		dollarChest: '开启可获得大量金币',
		rune: '神秘符文，可用于特殊系统',
		nestKey: '开启特殊巢穴的钥匙'
	};
	return descs[id] || '';
}

function getMatName(id) {
	var names = {
		yinyuecao: '银月草', xingchensha: '星辰砂', youlanhua: '幽兰花',
		fengxieshi: '凤血石', longxianguo: '龙涎果', niepanhuo: '涅槃火',
		taiguyu: '太古玉', tianmingshi: '天命石'
	};
	return names[id] || id;
}

function getMatIcon(id) {
	var icons = {
		yinyuecao: '🌿', xingchensha: '✨', youlanhua: '🌸',
		fengxieshi: '💎', longxianguo: '🐉', niepanhuo: '🔥',
		taiguyu: '🟡', tianmingshi: '⚫'
	};
	return icons[id] || '📦';
}
