import { loadTycoonStorage, saveTycoonStorage } from './storage.js';
import { coreUpgradeCosts, zoneUpgradeCosts, maxZoneLevel, maxCoreLevel } from '../config/upgradeConfig.js';
import { setModalOpen } from './ui.js';

var isUpgrading = false;
var isZoneUpgrading = false;

export function setUpgrading() {
	isUpgrading = true;
}

export function clearUpgrading() {
	isUpgrading = false;
}

export function getUpgrading() {
	return isUpgrading;
}

export function setZoneUpgrading() {
	isZoneUpgrading = true;
}

export function clearZoneUpgrading() {
	isZoneUpgrading = false;
}

export function getZoneUpgrading() {
	return isZoneUpgrading;
}

export { setModalOpen };

function getLastCost(costObj) {
	var keys = Object.keys(costObj).map(Number).sort(function(a, b) { return a - b; });
	if (keys.length === 0) return 0;
	return costObj[keys[keys.length - 1]];
}

export function getCoreUpgradeCost(level) {
	return coreUpgradeCosts[level] || getLastCost(coreUpgradeCosts);
}

export function getZoneUpgradeCost(zoneId, level) {
	return zoneUpgradeCosts[level] || getLastCost(zoneUpgradeCosts);
}

export function canUpgradeCore(config) {
	var tycoonData = config.tycoon;
	var currentLevel = tycoonData.coreLevel;
	if (currentLevel >= maxCoreLevel) return { canUpgrade: false, reason: '已达最高等级' };

	var cost = getCoreUpgradeCost(currentLevel);
	if (tycoonData.gold < cost) return { canUpgrade: false, reason: '金币不足', cost: cost, gold: tycoonData.gold };

	return { canUpgrade: true, cost: cost };
}

export function canUpgradeZone(config, zoneId) {
	var zoneLevel = config.tycoonConfig.zones[zoneId] || 0;
	if (zoneLevel >= maxZoneLevel) return { canUpgrade: false, reason: '已达最高等级' };

	var cost = getZoneUpgradeCost(zoneId, zoneLevel);
	if (!cost) return { canUpgrade: false, reason: '无升级配置' };

	var tycoonData = config.tycoon;
	if (tycoonData.gold < cost) return { canUpgrade: false, reason: '金币不足', cost: cost, gold: tycoonData.gold };

	return { canUpgrade: true, cost: cost };
}

export function executeCoreUpgrade(config) {
	var check = canUpgradeCore(config);
	if (!check.canUpgrade) return { success: false, message: check.reason };

	var tycoonData = config.tycoon;
	tycoonData.gold -= check.cost;
	tycoonData.coreLevel++;
	saveTycoonStorage(config);
	return { success: true, message: '核心升级至 Lv.' + tycoonData.coreLevel };
}

export function executeZoneUpgrade(config, zoneId) {
	var check = canUpgradeZone(config, zoneId);
	if (!check.canUpgrade) return { success: false, message: check.reason };

	var tycoonData = config.tycoon;
	tycoonData.gold -= check.cost;
	config.tycoonConfig.zones[zoneId] = (config.tycoonConfig.zones[zoneId] || 0) + 1;
	saveTycoonStorage(config);
	return { success: true, message: zoneId + ' 升级至 Lv.' + config.tycoonConfig.zones[zoneId] };
}

export function showCoreUpgradeModal(doc, loadTycoonStorageFn, canUpgradeCoreFn, executeCoreUpgradeFn, showToast, openTycoonPage, hexToRgbaFn, setModalOpenFn, setUpgradingFn, clearUpgradingFn) {
	var config = loadTycoonStorageFn();
	var tycoonData = config.tycoon;
	var nextLevel = tycoonData.coreLevel + 1;
	var check = canUpgradeCoreFn(config);
	var cost = check.cost;
	var isMax = tycoonData.coreLevel >= maxCoreLevel;

	var requirements = [
		{ label: '💰 金币', icon: '💰', has: tycoonData.gold, need: cost, unit: '金币' },
		{ label: '🏰 当前核心等级', icon: '🏰', has: tycoonData.coreLevel, need: tycoonData.coreLevel, unit: '级' }
	];

	if (isMax) {
		requirements = [{ label: '🏰 已达最高等级', icon: '🏰', has: 8, need: 8, unit: '级' }];
	}

	var allMet = check.canUpgrade;
	var reqHtml = requirements.map(function(req) {
		var met = req.has >= req.need;
		if (!met) allMet = false;
		var cls = met ? 'met' : 'unmet';
		var display = req.label === '💰 金币'
			? req.has + ' / ' + req.need + ' 金币'
			: req.has + ' 级';
		return '<div class="upgrade-req-item ' + cls + '">' +
			'<span class="req-label"><span class="req-icon">' + req.icon + '</span>' + req.label + '</span>' +
			'<span class="req-value">' + (met ? '✓ ' : '✗ ') + display + '</span>' +
		'</div>';
	}).join('');

	var btnCls = (!isMax && allMet) ? 'enabled' : 'disabled';
	var btnText = isMax ? '已达最高等级' : (allMet ? '⬆ 升级核心' : '❌ 条件不满足');

	var overlay = doc.createElement('div');
	overlay.className = 'upgrade-modal-overlay';
	overlay.innerHTML =
		'<div class="upgrade-modal-box">' +
			'<div class="upgrade-modal-title">🏰 升级绿洲核心</div>' +
			'<div class="upgrade-modal-sub">核心等级 Lv.' + tycoonData.coreLevel + ' → Lv.' + nextLevel + '</div>' +
			'<div class="upgrade-req-list">' + reqHtml + '</div>' +
			'<div class="upgrade-btn-bar">' +
				'<div class="upgrade-confirm-btn ' + btnCls + '" id="core-upgrade-confirm">' + btnText + '</div>' +
				'<div class="upgrade-cancel-btn" id="core-upgrade-cancel">取消</div>' +
			'</div>' +
		'</div>';
	doc.body.appendChild(overlay);
	setModalOpenFn(true);

	overlay.querySelector('#core-upgrade-cancel').addEventListener('click', function() {
		overlay.remove();
		setModalOpenFn(false);
		clearUpgradingFn();
	});

	if (!isMax && allMet) {
		overlay.querySelector('#core-upgrade-confirm').addEventListener('click', function() {
			if (isUpgrading) return;
			setUpgradingFn();
			var confirmBtn = overlay.querySelector('#core-upgrade-confirm');
			confirmBtn.textContent = '升级中...';
			confirmBtn.style.opacity = '0.6';
			confirmBtn.style.pointerEvents = 'none';

			setTimeout(function() {
				var result = executeCoreUpgradeFn(config);
				overlay.remove();
				setModalOpenFn(false);
				clearUpgradingFn();
				showToast(doc, result.message);
				setTimeout(function() { openTycoonPage(); }, 100);
			}, 50);
		});
	}
}

export function showZoneUpgradeModal(doc, zoneId, loadTycoonStorageFn, canUpgradeZoneFn, executeZoneUpgradeFn, showToast, openTycoonPage, hexToRgbaFn, tycoonConfig, unlockHints, maxZoneLevelVal, setModalOpenFn, setZoneUpgradingFn, clearZoneUpgradingFn) {
	var config = loadTycoonStorageFn();
	var tycoonData = config.tycoon;
	var tycoonState = config.tycoonConfig;
	var zoneLevel = tycoonState.zones[zoneId] || 1;
	var nextLevel = zoneLevel + 1;
	var check = canUpgradeZoneFn(config, zoneId);
	var cost = check.cost;
	var coreLevel = tycoonData.coreLevel;
	var zoneInfo = tycoonConfig.zones.find(function(z) { return z.id === zoneId; });
	var isMax = zoneLevel >= maxZoneLevelVal;
	var coreMet = coreLevel >= nextLevel;
	var goldMet = check.canUpgrade;

	var requirements = [
		{ label: '💰 金币', icon: '💰', has: tycoonData.gold, need: cost, met: goldMet },
		{ label: '🏰 核心等级 ≥ Lv.' + nextLevel, icon: '🏰', has: coreLevel, need: nextLevel, met: coreMet }
	];

	var allMet = coreMet && goldMet && !isMax;

	var reqHtml = requirements.map(function(req) {
		var cls = req.met ? 'met' : 'unmet';
		var display = req.label.indexOf('金币') >= 0
			? req.has + ' / ' + req.need + ' 金币'
			: req.has + ' 级 / 需要 Lv.' + req.need;
		return '<div class="upgrade-req-item ' + cls + '">' +
			'<span class="req-label"><span class="req-icon">' + req.icon + '</span>' + req.label + '</span>' +
			'<span class="req-value">' + (req.met ? '✓ ' : '✗ ') + display + '</span>' +
		'</div>';
	}).join('');

	var btnCls = allMet ? 'enabled' : 'disabled';
	var btnText = isMax ? '已达最高等级' : (allMet ? '⬆ 升级至 Lv.' + nextLevel : '❌ 条件不满足');

	var unlockHint = '';
	var hintTemplate = unlockHints[zoneId] || '';
	if (hintTemplate) {
		var hintStyle = 'color:' + zoneInfo.color + ';font-size:12px;margin-top:8px;padding:8px;background:rgba(' + hexToRgbaFn(zoneInfo.color, 0.1) + ');border-radius:6px;';
		var hintContent = hintTemplate.replace('{nextLevel}', nextLevel);
		unlockHint = '<div style="' + hintStyle + '">' + hintContent + '</div>';
	}

	var overlay = doc.createElement('div');
	overlay.className = 'upgrade-modal-overlay';
	overlay.innerHTML =
		'<div class="upgrade-modal-box" style="border-color:' + zoneInfo.color + ';box-shadow:0 0 40px ' + hexToRgbaFn(zoneInfo.color, 0.4) + ';">' +
			'<div class="upgrade-modal-title" style="color:' + zoneInfo.color + ';">' + zoneInfo.icon + ' 升级' + zoneInfo.name + '</div>' +
			'<div class="upgrade-modal-sub">当前 Lv.' + zoneLevel + ' → Lv.' + nextLevel + '</div>' +
			'<div class="upgrade-req-list">' + reqHtml + '</div>' +
			unlockHint +
			'<div class="upgrade-btn-bar" style="margin-top:12px;">' +
				'<div class="upgrade-confirm-btn ' + btnCls + '" id="zone-upgrade-confirm">' + btnText + '</div>' +
				'<div class="upgrade-cancel-btn" id="zone-upgrade-cancel">取消</div>' +
			'</div>' +
		'</div>';
	doc.body.appendChild(overlay);
	setModalOpenFn(true);

	overlay.querySelector('#zone-upgrade-cancel').addEventListener('click', function() {
		overlay.remove();
		setModalOpenFn(false);
		clearZoneUpgradingFn();
	});

	if (allMet) {
		overlay.querySelector('#zone-upgrade-confirm').addEventListener('click', function() {
			if (isZoneUpgrading) return;
			setZoneUpgradingFn();
			var confirmBtn = overlay.querySelector('#zone-upgrade-confirm');
			confirmBtn.textContent = '升级中...';
			confirmBtn.style.opacity = '0.6';
			confirmBtn.style.pointerEvents = 'none';

			setTimeout(function() {
				var result = executeZoneUpgradeFn(config, zoneId);
				overlay.remove();
				setModalOpenFn(false);
				clearZoneUpgradingFn();
				showToast(doc, result.message);
				setTimeout(function() { openTycoonPage(); }, 100);
			}, 50);
		});
	}
}