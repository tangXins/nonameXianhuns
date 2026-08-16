import { loadTycoonStorage, saveTycoonStorage } from './storage.js';
import { forgeRecipes, forgeMaterials } from '../config/forgeConfig.js';
import { qualityColors, getQualityByLevel } from '../config/forgeConfig.js';
import { hexToRgba, showToast, setModalOpen } from './ui.js';

var selectedForgeTalent = null;
var isForging = false;

window.forgeFallbackIcon = function(img) {
	var parent = img.parentNode;
	img.remove();
	var fallback = document.createElement('div');
	fallback.className = 'recipe-icon-fallback';
	fallback.style.cssText = 'width:56px;height:56px;background:rgba(255,255,255,0.08);border-radius:8px;align-items:center;justify-content:center;font-size:28px;display:flex;';
	fallback.textContent = '📜';
	if (parent) parent.insertBefore(fallback, parent.firstChild);
};

export function setSelectedForgeTalent(val) {
	selectedForgeTalent = val;
}

export function setUpForging() {
	isForging = true;
}

export function clearForging() {
	isForging = false;
}

export function getForging() {
	return isForging;
}

export function getSelectedForgeTalent() {
	return selectedForgeTalent;
}

export { setModalOpen };

export function getTalentsByLevel(maxLevel) {
	return forgeRecipes.filter(function(recipe) {
		var costKeys = Object.keys(recipe.cost);
		return costKeys.some(function(matId) {
			var mat = forgeMaterials.find(function(m) { return m.id === matId; });
			return mat && mat.level <= maxLevel;
		});
	});
}

export function getTalentById(id) {
	return forgeRecipes.find(function(r) { return r.id === id; });
}

export function renderForge(doc, tycoonData, config, qualityColorsParam) {
	var zoneLevel = config.tycoonConfig.zones.forge || 1;

	var html = '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">' +
		'<span style="color:#9C27B0;font-size:13px;">⚒️ 锻造台 Lv.' + zoneLevel + '</span>' +
		'<span style="color:rgba(255,255,255,0.5);font-size:11px;">选择奇术要件 → 选择天赋</span>' +
	'</div>';

	html += '<div id="forge-selected" style="margin-bottom:12px;"></div>';

	var availableTalents = getTalentsByLevel(zoneLevel);

	html += '<div style="color:rgba(255,255,255,0.6);font-size:12px;margin-bottom:10px;">选择要打造的天赋：</div>';
	html += '<div id="talent-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;">';

	availableTalents.forEach(function(talent) {
		var costEntries = Object.entries(talent.cost);
		var maxMatLevel = 1;
		costEntries.forEach(function(entry) {
			var mat = forgeMaterials.find(function(m) { return m.id === entry[0]; });
			if (mat && mat.level > maxMatLevel) maxMatLevel = mat.level;
		});
		var rarityColor = qualityColorsParam[getQualityByLevel(maxMatLevel)] || '#9C27B0';

		var costHtml = costEntries.map(function(entry) {
			var matId = entry[0];
			var count = entry[1];
			var mat = forgeMaterials.find(function(m) { return m.id === matId; });
			var stock = tycoonData.forgeMaterials[matId] || 0;
			var canAfford = stock >= count;
			var color = canAfford ? '#8BC34A' : '#FF8A80';
			return '<span style="color:' + color + ';font-weight:500;">' + (mat ? mat.name : matId) + '<span style="color:rgba(255,255,255,0.7);">×</span>' + count + ' <span style="color:rgba(255,255,255,0.5);font-size:10px;">(' + stock + ')</span></span>';
		}).join('<span style="color:rgba(255,255,255,0.4);margin:0 3px;">+</span>');

		var canAfford = costEntries.every(function(entry) {
			var matId = entry[0];
			var count = entry[1];
			return (tycoonData.forgeMaterials[matId] || 0) >= count;
		});

		var rarityGlow = '0 0 12px ' + rarityColor + '33';
		var costItemsHtml = costEntries.map(function(entry) {
			var matId = entry[0];
			var count = entry[1];
			var mat = forgeMaterials.find(function(m) { return m.id === matId; });
			var stock = tycoonData.forgeMaterials[matId] || 0;
			var canAfford = stock >= count;
			var color = canAfford ? '#8BC34A' : '#FF8A80';
			var icon = mat ? mat.icon : '📦';
			var name = mat ? mat.name : matId;
			return '<span style="display:inline-flex;align-items:center;gap:2px;color:' + color + ';font-weight:500;font-size:12px;background:rgba(255,255,255,0.04);padding:2px 6px;border-radius:4px;">' +
				'<span>' + icon + '</span>' + name + '<span style="color:rgba(255,255,255,0.7);">×</span>' + count +
				'<span style="color:rgba(255,255,255,0.4);font-size:10px;">(' + stock + ')</span>' +
			'</span>';
		}).join(' ');

		html += '<div class="forge-talent-card" data-talent="' + talent.id + '" style="position:relative;background:linear-gradient(135deg,rgba(' + hexToRgba(rarityColor, 0.12) + '),rgba(255,255,255,0.02));border:1px solid ' + rarityColor + '44;border-radius:12px;padding:16px 16px;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform=\'scale(1.03)\';this.style.boxShadow=\'' + rarityGlow + '\'" onmouseout="this.style.transform=\'scale(1)\';this.style.boxShadow=\'none\'">' +
			'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">' +
				'<span style="color:' + rarityColor + ';font-weight:bold;font-size:15px;text-shadow:0 0 10px ' + rarityColor + '33;">✦ ' + talent.name + '</span>' +
			'</div>' +
			'<div style="color:rgba(255,255,255,0.7);font-size:12px;margin-bottom:10px;line-height:1.5;padding:6px 8px;background:rgba(0,0,0,0.2);border-radius:6px;">' + (talent.desc || '') + '</div>' +
			'<div style="display:flex;gap:4px;flex-wrap:wrap;font-size:12px;align-items:center;margin-bottom:6px;">' + costItemsHtml +
			'</div>' +
			(canAfford ? '' : '<div style="color:#FF8A80;font-size:11px;margin-top:8px;font-weight:500;text-align:center;padding:4px;background:rgba(244,67,54,0.1);border-radius:4px;">⚠ 材料不足</div>') +
		'</div>';
	});

	html += '</div>';

	return html;
}

export function forgeTalent(itemId, talentName, cost) {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;

	for (var matId in cost) {
		if ((tycoonData.forgeMaterials[matId] || 0) < cost[matId]) {
			return { success: false, message: '材料不足' };
		}
	}

	for (var matId in cost) {
		tycoonData.forgeMaterials[matId] -= cost[matId];
	}

	var itemInfo = get.xjzh_equipInfo(itemId);
	var baseName = itemInfo ? (itemInfo.translate || itemId) : itemId;
	var displayName = baseName + '之' + talentName;

	if (!config.bag) config.bag = [];
	var idx = config.bag.indexOf(itemId);
	if (idx >= 0) {
		config.bag.splice(idx, 1);
	}

	if (!config.craftedBag) config.craftedBag = [];
	var uid = 'craft_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
	config.craftedBag.push({
		uid: uid,
		id: itemId,
		displayName: displayName,
		talents: [talentName],
		createdAt: Date.now()
	});

	saveTycoonStorage(config);
	return { success: true, message: '天赋「' + talentName + '」打造成功！' };
}

export function bindForgeEvents(doc, contentEl, config, tycoonData, getTalentByIdFn, showToastFn, showForgeItemSelectFn) {
	contentEl.querySelectorAll('.forge-talent-card').forEach(function(card) {
		card.addEventListener('click', function() {
			var talentId = card.getAttribute('data-talent');
			var talent = getTalentByIdFn(talentId);
			if (!talent) return;

			var canAfford = Object.keys(talent.cost).every(function(matId) {
				return (tycoonData.forgeMaterials[matId] || 0) >= talent.cost[matId];
			});
			if (!canAfford) {
				showToastFn(doc, '材料不足！');
				return;
			}

			showForgeItemSelectFn(doc, contentEl, config, tycoonData, talent);
		});
	});
}

export function showForgeItemSelect(doc, contentEl, config, tycoonData, talent, lib, forgeMaterialsParam, qualityColorsParam, getQualityByLevelFn, hexToRgbaFn, renderForgeFn, bindForgeEventsFn, showForgeConfirmDialogFn, setSelectedForgeTalentFn, restartFn) {
	var bag = config.bag || [];
	var itemCounts = {};
	bag.forEach(function(itemId) {
		itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
	});

	var craftedBag = config.craftedBag || [];
	var qishuyaojians = lib.xjzh_qishuyaojians || {};

	var itemCards = [];
	Object.keys(itemCounts).forEach(function(itemId) {
		var itemInfo = qishuyaojians[itemId];
		var itemName = (itemInfo && itemInfo.translate) ? itemInfo.translate : itemId;
		var itemLevel = (itemInfo && itemInfo.level) ? itemInfo.level : 1;
		var count = itemCounts[itemId];
		var qualityColor = qualityColorsParam[getQualityByLevelFn(itemLevel)] || '#9E9E9E';
		var cardImg = lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cards/' + itemId + '.png';
		var itemDesc = itemInfo ? (itemInfo.desc || '') : '';
		var itemType = itemInfo ? (itemInfo.type || '') : '';
		var itemStats = itemInfo ? (itemInfo.stats || '') : '';

		var existingTalents = [];
		if (craftedBag) {
			craftedBag.forEach(function(c) {
				if (c.id === itemId && c.talents) {
					existingTalents = existingTalents.concat(c.talents);
				}
			});
		}

		var talentsHtml = '';
		if (existingTalents.length > 0) {
			talentsHtml = '<div style="color:#4CAF50;font-size:11px;margin-top:4px;">✨ 已有天赋：' + existingTalents.join('、') + '</div>';
		}

		var statsHtml = '';
		if (itemStats) {
			statsHtml = '<div style="color:rgba(255,255,255,0.6);font-size:11px;margin-top:2px;">' + itemStats + '</div>';
		}

		var typeHtml = '';
		if (itemType) {
			typeHtml = '<span style="color:' + qualityColor + ';font-size:11px;margin-left:6px;">[' + itemType + ']</span>';
		}

		var alreadyHas = existingTalents.includes(talent.name);

		var cardHtml = '<div class="recipe-card" data-forgeitem="' + itemId + '" style="background:linear-gradient(135deg,' + hexToRgbaFn(qualityColor, 0.15) + ',rgba(255,255,255,0.02));border:1px solid ' + qualityColor + ';">' +
			'<div class="recipe-top">' +
				'<img class="recipe-icon" src="' + cardImg + '" style="width:56px;height:56px;border-radius:8px;object-fit:cover;background:rgba(255,255,255,0.05);" onerror="forgeFallbackIcon(this)">' +
				'<div>' +
					'<div class="recipe-name" style="color:' + qualityColor + ';">' + itemName + typeHtml + '</div>' +
					'<div class="recipe-desc">等阶：' + itemLevel + ' | 持有：' + count + '</div>' +
					statsHtml +
					'<div style="color:rgba(255,255,255,0.5);font-size:11px;margin-top:2px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + itemDesc + '</div>' +
					talentsHtml +
				'</div>' +
			'</div>' +
			(alreadyHas
				? '<div class="action-btn" style="background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.4);cursor:not-allowed;">已拥有此天赋</div>'
				: '<div class="action-btn" data-selectitem="' + itemId + '" style="background:linear-gradient(135deg,#2196F3,#1976D2);color:#fff;">选择</div>') +
		'</div>';

		itemCards.push(cardHtml);
	});

	if (itemCards.length === 0) {
		contentEl.innerHTML = '<div class="section-header">' +
			'<div class="section-title">⚒️ 天赋打造工坊</div>' +
			'<div class="section-sub">💡 为奇术要件添加天赋词缀</div>' +
		'</div>' +
		'<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5);">' +
			'<div style="font-size:48px;margin-bottom:10px;">📦</div>' +
			'<div>背包中没有奇术要件</div>' +
			'<div style="font-size:12px;margin-top:10px;">前往贸易获取更多奇术要件</div>' +
		'</div>';
		return;
	}

	var costText = Object.keys(talent.cost).map(function(matId) {
		var mat = forgeMaterialsParam.find(function(m) { return m.id === matId; });
		var matName = mat ? mat.name : matId;
		return matName + '×' + talent.cost[matId];
	}).join(' + ');

	contentEl.innerHTML = '<div class="section-header">' +
		'<div class="section-title">⚒️ 天赋打造工坊</div>' +
		'<div class="section-sub">📜 选择要打造天赋的奇术要件 · 天赋：' + talent.name + '</div>' +
	'</div>' +
	'<div style="margin-bottom:10px;padding:10px;background:rgba(156,39,176,0.1);border-radius:8px;border:1px solid rgba(156,39,176,0.3);color:#CE93D8;font-size:12px;">' +
		'消耗材料：' + costText +
		'<div style="margin-top:6px;"><span class="action-btn" id="forge-back" style="background:rgba(255,255,255,0.1);color:#fff;display:inline-block;padding:6px 16px;font-size:12px;cursor:pointer;">← 重新选择天赋</span></div>' +
	'</div>' +
	'<div class="card-grid">' + itemCards.join('') + '</div>';

	contentEl.querySelector('#forge-back').addEventListener('click', function() {
		setSelectedForgeTalentFn(null);
		contentEl.innerHTML = renderForgeFn(doc, tycoonData, config, qualityColorsParam);
		bindForgeEventsFn(doc, contentEl, config, tycoonData, getTalentById, showToast, restartFn);
	});

	contentEl.querySelectorAll('[data-selectitem]').forEach(function(el) {
		el.addEventListener('click', function() {
			var itemId = el.getAttribute('data-selectitem');
			showForgeConfirmDialogFn(doc, contentEl, config, tycoonData, itemId, talent);
		});
	});
}

export function showForgeConfirmDialog(doc, contentEl, config, tycoonData, itemId, talent, lib, forgeMaterialsParam, qualityColorsParam, hexToRgbaFn, forgeTalentFn, showToastFn, openTycoonPageFn, isForgingRef, setModalOpenFn, setUpForgingFn, clearForgingFn) {
	var qishuyaojians = lib.xjzh_qishuyaojians || {};
	var itemInfo = qishuyaojians[itemId];
	var itemName = itemInfo ? itemInfo.translate : itemId;
	var qualityColor = '#9C27B0';
	var costEntries = Object.entries(talent.cost);
	costEntries.forEach(function(entry) {
		var mat = forgeMaterialsParam.find(function(m) { return m.id === entry[0]; });
		if (mat) {
			var c = qualityColorsParam[getQualityByLevel(mat.level)];
			if (c) qualityColor = c;
		}
	});

	var costText = Object.keys(talent.cost).map(function(matId) {
		var mat = forgeMaterialsParam.find(function(m) { return m.id === matId; });
		var matName = mat ? mat.name : matId;
		return matName + '×' + talent.cost[matId];
	}).join(' + ');

	var overlay = doc.createElement('div');
	overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;';

	var box = doc.createElement('div');
	box.style.cssText = 'width:400px;background:linear-gradient(160deg,#1a1a2e,#16213e);border:2px solid ' + qualityColor + ';border-radius:16px;padding:20px;box-shadow:0 0 30px ' + hexToRgbaFn(qualityColor, 0.4) + ';';

	box.innerHTML = '<div style="color:' + qualityColor + ';font-size:18px;font-weight:bold;text-align:center;margin-bottom:15px;">⚒️ 天赋打造确认</div>' +
		'<div style="margin-bottom:12px;">' +
			'<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;">奇术要件</div>' +
			'<div style="color:#FFD700;font-size:16px;font-weight:bold;">' + itemName + '</div>' +
		'</div>' +
		'<div style="margin-bottom:12px;">' +
			'<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;">添加天赋</div>' +
			'<div style="color:' + qualityColor + ';font-size:16px;font-weight:bold;">✦ ' + talent.name + '</div>' +
			'<div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;">' + (talent.desc || '') + '</div>' +
		'</div>' +
		'<div style="margin-bottom:20px;">' +
			'<div style="color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;">消耗材料</div>' +
			'<div style="color:#fff;font-size:14px;">' + costText + '</div>' +
		'</div>' +
		'<div style="display:flex;gap:10px;">' +
			'<div class="action-btn" id="forge-confirm" style="flex:1;background:linear-gradient(135deg,' + qualityColor + ',' + qualityColor + 'CC);color:#fff;padding:10px;text-align:center;border-radius:8px;cursor:pointer;font-weight:bold;">确认打造</div>' +
			'<div class="action-btn" id="forge-cancel" style="flex:1;background:rgba(255,255,255,0.1);color:#fff;padding:10px;text-align:center;border-radius:8px;cursor:pointer;">取消</div>' +
		'</div>';

	overlay.appendChild(box);
	doc.body.appendChild(overlay);
	setModalOpenFn(true);

	box.querySelector('#forge-confirm').addEventListener('click', function() {
		if (isForgingRef) return;
		setUpForgingFn();
		overlay.remove();
		setModalOpenFn(false);
		var result = forgeTalentFn(itemId, talent.name, talent.cost);
		clearForgingFn();
		if (result.success) {
			showToastFn(doc, result.message);
		} else {
			showToastFn(doc, result.message);
		}
		openTycoonPageFn();
	});

	box.querySelector('#forge-cancel').addEventListener('click', function() {
		overlay.remove();
		setModalOpenFn(false);
		clearForgingFn();
	});
}