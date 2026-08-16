import { loadTycoonStorage, saveTycoonStorage } from './storage.js';
import { generateShopItems, generatePriceSeed } from '../config/merchant-prices.js';
import { forgeMaterials, talentComponentTiers } from '../config/forgeConfig.js';

export function refreshShop() {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;
	var zoneLevel = config.tycoonConfig.zones.trade || 1;

	if ((tycoonData.refreshTokens || 0) <= 0) {
		return { success: false, message: '星界罗盘不足，无法刷新' };
	}

	tycoonData.refreshTokens--;

	var seed = generatePriceSeed();
	var items = generateShopItems(zoneLevel, seed);

	config.tycoonConfig.tradeShop = {
		seed: seed,
		items: items,
		lastRefresh: Date.now()
	};

	saveTycoonStorage(config);
	return { success: true, message: '商贸区已刷新，消耗 1 个星界罗盘' };
}

export function getCurrentShop() {
	var config = loadTycoonStorage();
	var shop = config.tycoonConfig.tradeShop;

	if (!shop || !shop.items || shop.items.length === 0) {
		var zoneLevel = config.tycoonConfig.zones.trade || 1;
		var seed = generatePriceSeed();
		var items = generateShopItems(zoneLevel, seed);
		config.tycoonConfig.tradeShop = {
			seed: seed,
			items: items,
			lastRefresh: Date.now()
		};
		saveTycoonStorage(config);
		return config.tycoonConfig.tradeShop;
	}

	return shop;
}

export function executeTrade(itemId, action, amount) {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;
	var shop = config.tycoonConfig.tradeShop;

	if (!shop) return { success: false, message: '商店未初始化' };

	var item = shop.items.find(function(i) { return i.id === itemId; });
	if (!item) return { success: false, message: '商品不存在' };

	amount = Math.max(1, Math.floor(amount || 1));

	if (action === 'buy') {
		if (item.stock < amount) return { success: false, message: '库存不足' };
		var totalCost = item.buy * amount;
		if (tycoonData.gold < totalCost) return { success: false, message: '金币不足' };

		tycoonData.gold -= totalCost;
		item.stock -= amount;

		applyPurchase(tycoonData, item, amount);

		saveTycoonStorage(config);
		return { success: true, message: '购买成功：' + item.name + ' ×' + amount };
	} else {
		var hasStock = getPlayerStock(tycoonData, item);
		if (hasStock < amount) return { success: false, message: item.name + ' 持有数量不足' };

		tycoonData.gold += item.sell * amount;
		removePlayerStock(tycoonData, item, amount);

		saveTycoonStorage(config);
		return { success: true, message: '出售成功：' + item.name + ' ×' + amount + ' (+' + (item.sell * amount) + '金币)' };
	}
}

function applyPurchase(tycoonData, item, amount) {
	switch (item.id) {
		case 'shards':
			tycoonData.shards = (tycoonData.shards || 0) + amount;
			break;
		case 'essence':
			tycoonData.essence = (tycoonData.essence || 0) + amount;
			break;
		case 'talentComponent':
			tycoonData.talentComponents = (tycoonData.talentComponents || 0) + amount;
			if (item.hasTalent) {
				var tier = rollTalentTier();
				tycoonData.talentTiers = tycoonData.talentTiers || {};
				tycoonData.talentTiers[tier.name] = (tycoonData.talentTiers[tier.name] || 0) + amount;
			}
			break;
		case 'dollarChest':
			var goldReward = 500 + Math.floor(Math.random() * 19500);
			tycoonData.gold += goldReward;
			break;
		case 'rune':
			tycoonData.runes = (tycoonData.runes || 0) + amount;
			break;
		case 'nestKey':
			tycoonData.nestKeys = (tycoonData.nestKeys || 0) + amount;
			break;
		default:
			if (item.type === 'forgeMat') {
				var matId = item.matId || item.id;
				tycoonData.forgeMaterials[matId] = (tycoonData.forgeMaterials[matId] || 0) + amount;
			}
			break;
	}
}

function getPlayerStock(tycoonData, item) {
	switch (item.id) {
		case 'shards': return tycoonData.shards || 0;
		case 'essence': return tycoonData.essence || 0;
		case 'talentComponent': return tycoonData.talentComponents || 0;
		case 'dollarChest': return tycoonData.dollarChests || 0;
		case 'rune': return tycoonData.runes || 0;
		case 'nestKey': return tycoonData.nestKeys || 0;
		default:
			if (item.type === 'forgeMat') {
				return tycoonData.forgeMaterials[item.matId || item.id] || 0;
			}
			return 0;
	}
}

function removePlayerStock(tycoonData, item, amount) {
	switch (item.id) {
		case 'shards': tycoonData.shards = (tycoonData.shards || 0) - amount; break;
		case 'essence': tycoonData.essence = (tycoonData.essence || 0) - amount; break;
		case 'talentComponent': tycoonData.talentComponents = (tycoonData.talentComponents || 0) - amount; break;
		case 'dollarChest': tycoonData.dollarChests = (tycoonData.dollarChests || 0) - amount; break;
		case 'rune': tycoonData.runes = (tycoonData.runes || 0) - amount; break;
		case 'nestKey': tycoonData.nestKeys = (tycoonData.nestKeys || 0) - amount; break;
		default:
			if (item.type === 'forgeMat') {
				tycoonData.forgeMaterials[item.matId || item.id] = (tycoonData.forgeMaterials[item.matId || item.id] || 0) - amount;
			}
			break;
	}
}

function rollTalentTier() {
	var roll = Math.random();
	var cumulative = 0;
	for (var i = 0; i < talentComponentTiers.length; i++) {
		cumulative += talentComponentTiers[i].chance;
		if (roll <= cumulative) return talentComponentTiers[i];
	}
	return talentComponentTiers[0];
}

export function renderTrade(doc, tycoonData, config, qualityColors) {
	var zoneLevel = config.tycoonConfig.zones.trade || 1;

	if (!config.tycoonConfig.tradeShop || !config.tycoonConfig.tradeShop.items || config.tycoonConfig.tradeShop.items.length === 0) {
		var seed = generatePriceSeed();
		var items = generateShopItems(zoneLevel, seed);
		config.tycoonConfig.tradeShop = {
			seed: seed,
			items: items,
			lastRefresh: Date.now()
		};
		saveTycoonStorage(config);
	}

	var shop = config.tycoonConfig.tradeShop || { items: [], seed: 0 };
	var items = shop.items || [];
	var refreshTokens = tycoonData.refreshTokens || 0;

	var html = '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">' +
		'<span style="color:#FFD700;font-size:13px;">🏪 商贸区 Lv.' + zoneLevel + '</span>' +
		'<span style="color:rgba(255,255,255,0.5);font-size:11px;">价格会波动 · 消耗星界罗盘刷新</span>' +
		'<button id="refresh-shop" style="margin-left:auto;background:linear-gradient(135deg,#FF9800,#F57C00);color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;' + (refreshTokens > 0 ? '' : 'opacity:0.5;cursor:not-allowed;') + '">🔄 刷新 (🧭' + refreshTokens + ')</button>' +
	'</div>';

	html += '<div id="trade-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;">';

	if (items.length === 0) {
		html += '<div style="color:rgba(255,255,255,0.4);text-align:center;padding:40px;grid-column:1/-1;">暂无商品，请刷新商贸区</div>';
	}

	items.forEach(function(item) {
		var rarityColor = qualityColors[item.rarity] || '#9E9E9E';
		var playerStock = getPlayerStock(tycoonData, item);
		var isSoldOut = item.stock <= 0;
		var canBuy = !isSoldOut && tycoonData.gold >= item.buy;
		var canBuy10 = canBuy && item.stock >= 10;
		var canSell = playerStock > 0;
		var canSell10 = playerStock >= 10;

		var talentBadge = '';
		if (item.hasTalent) {
			var tier = rollTalentTierPreview();
			talentBadge = '<span style="color:' + rarityColor + ';font-size:9px;margin-left:4px;">[' + tier.name + ']</span>';
		}

		var buyStyle = canBuy ? 'background:linear-gradient(135deg,#4CAF50,#388E3C);color:#fff;border:1px solid #66BB6A;' : 'background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.25);border:1px solid rgba(255,255,255,0.08);';
		var sellStyle = canSell ? 'background:linear-gradient(135deg,#FF9800,#F57C00);color:#fff;border:1px solid #FFB74D;' : 'background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.25);border:1px solid rgba(255,255,255,0.08);';

		html += '<div class="trade-item" data-item-id="' + item.id + '" style="background:rgba(255,255,255,0.04);border:1px solid ' + rarityColor + '33;border-radius:10px;padding:12px;' + (isSoldOut ? 'opacity:0.5;' : '') + '">' +
			'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
				'<span style="font-size:20px;">' + item.icon + '</span>' +
				'<span style="color:' + rarityColor + ';font-weight:bold;font-size:13px;">' + item.name + talentBadge + '</span>' +
				'<span style="color:rgba(255,255,255,0.4);font-size:10px;margin-left:auto;">[' + item.rarity + ']</span>' +
			'</div>' +
			'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-bottom:6px;">' + item.desc + '</div>' +
			'<div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;">' +
				'<span style="color:rgba(255,255,255,0.5);font-size:11px;">持有: <b style="color:#FFD700;">' + playerStock + '</b></span>' +
				'<span style="color:#4CAF50;font-size:11px;' + (canBuy ? '' : 'opacity:0.5;') + '">买: 💰' + item.buy + '</span>' +
				'<span style="color:#FF9800;font-size:11px;' + (playerStock > 0 ? '' : 'opacity:0.5;') + '">卖: 💰' + item.sell + '</span>' +
				'<span style="color:' + (isSoldOut ? '#F44336' : '#8BC34A') + ';font-size:11px;">库存: ' + item.stock + '</span>' +
			'</div>' +
			'<div style="display:flex;gap:6px;">' +
				'<button class="trade-buy" data-id="' + item.id + '" data-amount="1" ' + (canBuy ? '' : 'disabled ') + 'style="flex:1;' + buyStyle + 'padding:6px;border-radius:6px;cursor:' + (canBuy ? 'pointer' : 'not-allowed') + ';font-size:11px;font-weight:bold;">买入×1</button>' +
				'<button class="trade-buy" data-id="' + item.id + '" data-amount="10" ' + (canBuy10 ? '' : 'disabled ') + 'style="flex:1;' + buyStyle + 'padding:6px;border-radius:6px;cursor:' + (canBuy10 ? 'pointer' : 'not-allowed') + ';font-size:11px;font-weight:bold;">×10</button>' +
				'<button class="trade-sell" data-id="' + item.id + '" data-amount="1" ' + (canSell ? '' : 'disabled ') + 'style="flex:1;' + sellStyle + 'padding:6px;border-radius:6px;cursor:' + (canSell ? 'pointer' : 'not-allowed') + ';font-size:11px;font-weight:bold;">卖出×1</button>' +
				'<button class="trade-sell" data-id="' + item.id + '" data-amount="10" ' + (canSell10 ? '' : 'disabled ') + 'style="flex:1;' + sellStyle + 'padding:6px;border-radius:6px;cursor:' + (canSell10 ? 'pointer' : 'not-allowed') + ';font-size:11px;font-weight:bold;">×10</button>' +
			'</div>' +
		'</div>';
	});

	html += '</div>';
	return html;
}

function rollTalentTierPreview() {
	var roll = Math.random();
	var cumulative = 0;
	for (var i = 0; i < talentComponentTiers.length; i++) {
		cumulative += talentComponentTiers[i].chance;
		if (roll <= cumulative) return talentComponentTiers[i];
	}
	return talentComponentTiers[0];
}

export function bindTradeEvents(doc, contentEl, config, tycoonData, executeTradeFn, showToast, openTycoonPage) {
	var refreshBtn = contentEl.querySelector('#refresh-shop');
	if (refreshBtn) {
		refreshBtn.addEventListener('click', function() {
			var result = refreshShop();
			showToast(doc, result.message);
			if (result.success) {
				openTycoonPage();
			}
		});
	}

	contentEl.querySelectorAll('.trade-buy').forEach(function(btn) {
		if (btn._bound) return;
		btn._bound = true;
		btn.addEventListener('click', function() {
			var itemId = btn.getAttribute('data-id');
			var amount = parseInt(btn.getAttribute('data-amount'));
			var result = executeTradeFn(itemId, 'buy', amount);
			showToast(doc, result.message);
			if (result.success) {
				openTycoonPage();
			}
		});
	});

	contentEl.querySelectorAll('.trade-sell').forEach(function(btn) {
		if (btn._bound) return;
		btn._bound = true;
		btn.addEventListener('click', function() {
			var itemId = btn.getAttribute('data-id');
			var amount = parseInt(btn.getAttribute('data-amount'));
			var result = executeTradeFn(itemId, 'sell', amount);
			showToast(doc, result.message);
			if (result.success) {
				openTycoonPage();
			}
		});
	});
}
