import { loadTycoonStorage, saveTycoonStorage } from './storage.js';
import { getBuyPrice, getSellPrice } from '../config/merchant-prices.js';
import { forgeMaterials } from '../config/forgeConfig.js';

export function executeTrade(itemId, action, amount) {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;
	var zoneLevel = config.tycoonConfig.zones.trade || 1;
	var mat = forgeMaterials.find(function(m) { return m.id === itemId; });
	if (!mat) return { success: false, message: '材料不存在' };

	if (action === 'buy') {
		var price = getBuyPrice(itemId, zoneLevel);
		var totalCost = price * amount;
		if (tycoonData.gold < totalCost) return { success: false, message: '金币不足' };
		tycoonData.gold -= totalCost;
		tycoonData.forgeMaterials[itemId] = (tycoonData.forgeMaterials[itemId] || 0) + amount;
		saveTycoonStorage(config);
		return { success: true, message: '购买成功：' + mat.name + ' ×' + amount };
	} else {
		var stock = tycoonData.forgeMaterials[itemId] || 0;
		if (stock < amount) return { success: false, message: mat.name + ' 数量不足' };
		var sellPrice = getSellPrice(itemId, zoneLevel);
		var totalGain = sellPrice * amount;
		tycoonData.forgeMaterials[itemId] = stock - amount;
		tycoonData.gold += totalGain;
		saveTycoonStorage(config);
		return { success: true, message: '出售成功：' + mat.name + ' ×' + amount + ' (+' + totalGain + '金币)' };
	}
}

export function renderTrade(doc, tycoonData, config, qualityColors) {
	var zoneLevel = config.tycoonConfig.zones.trade || 1;
	var html = '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">' +
		'<span style="color:#FFD700;font-size:13px;">🏪 商贸区 Lv.' + zoneLevel + '</span>' +
		'<span style="color:rgba(255,255,255,0.5);font-size:11px;">等级影响价格加成</span>' +
	'</div>';

	html += '<div id="trade-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;">';

	forgeMaterials.forEach(function(mat) {
		var stock = tycoonData.forgeMaterials[mat.id] || 0;
		var rarityColor = qualityColors[mat.rarity] || '#9E9E9E';
		var buyPrice = getBuyPrice(mat.id, zoneLevel);
		var sellPrice = getSellPrice(mat.id, zoneLevel);

		html += '<div style="background:rgba(255,255,255,0.04);border:1px solid ' + rarityColor + '33;border-radius:10px;padding:12px;">' +
			'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
				'<span style="font-size:20px;">' + mat.icon + '</span>' +
				'<span style="color:' + rarityColor + ';font-weight:bold;font-size:13px;">' + mat.name + '</span>' +
				'<span style="color:rgba(255,255,255,0.4);font-size:10px;margin-left:auto;">Lv.' + mat.level + ' [' + mat.rarity + ']</span>' +
			'</div>' +
			'<div style="display:flex;gap:8px;margin-bottom:8px;">' +
				'<span style="color:rgba(255,255,255,0.5);font-size:11px;">持有: ' + stock + '</span>' +
				'<span style="color:#4CAF50;font-size:11px;">买: 💰' + buyPrice + '</span>' +
				'<span style="color:#FF9800;font-size:11px;">卖: 💰' + sellPrice + '</span>' +
			'</div>' +
			'<div style="display:flex;gap:6px;">' +
				'<button class="trade-buy" data-id="' + mat.id + '" data-amount="1" style="flex:1;background:linear-gradient(135deg,#4CAF50,#388E3C);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:11px;">买入×1</button>' +
				'<button class="trade-buy" data-id="' + mat.id + '" data-amount="10" style="flex:1;background:linear-gradient(135deg,#4CAF50,#388E3C);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:11px;">×10</button>' +
				'<button class="trade-sell" data-id="' + mat.id + '" data-amount="1" style="flex:1;background:linear-gradient(135deg,#FF9800,#F57C00);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:11px;">卖出×1</button>' +
				'<button class="trade-sell" data-id="' + mat.id + '" data-amount="10" style="flex:1;background:linear-gradient(135deg,#FF9800,#F57C00);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:11px;">×10</button>' +
			'</div>' +
		'</div>';
	});

	html += '</div>';
	return html;
}

export function bindTradeEvents(doc, contentEl, config, tycoonData, executeTradeFn, showToast, openTycoonPage) {
	contentEl.querySelectorAll('.trade-buy').forEach(function(btn) {
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