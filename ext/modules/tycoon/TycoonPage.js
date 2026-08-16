import { lib, game } from '../../../../../noname.js';
import { zones, zoneMaxUnits, unitTypes, forgeMaterials, qualityColors, getQualityByLevel } from './config/forgeConfig.js';
import { unlockHints, maxZoneLevel } from './config/upgradeConfig.js';
import { loadTycoonStorage, getZoneUnits, getTycoonData } from './logic/storage.js';
import { hexToRgba, showToast, showMaterialDetail, getModalOpen, setModalOpen } from './logic/ui.js';
import { getFleetDuration, getFleetBaseCost, getFleetOutputs, renderFleet, bindFleetEvents, updateFleetProgress } from './logic/fleet.js';
import { executeTrade, renderTrade, bindTradeEvents } from './logic/trade.js';
import { getTalentById, renderForge, forgeTalent, bindForgeEvents, showForgeItemSelect, showForgeConfirmDialog, setSelectedForgeTalent, setUpForging, clearForging, getForging } from './logic/forge.js';
import { getZoneUpgradeCost, canUpgradeCore, canUpgradeZone, executeCoreUpgrade, executeZoneUpgrade, showCoreUpgradeModal, showZoneUpgradeModal, setUpgrading, clearUpgrading, setZoneUpgrading, clearZoneUpgrading } from './logic/upgrade.js';
import { getHelpContent, renderHelpSection, showHelp } from './logic/help.js';
import { fillMainPanel, updateMainResources } from './logic/panel.js';

const tycoonConfig = {
	zones: zones,
	zoneMaxUnits: zoneMaxUnits,
	unitTypes: unitTypes,
	forgeMaterials: forgeMaterials
};

var currentIframe = null;
var currentZoneId = null;
var uiTimer = null;

function startUiTimer() {
	if (uiTimer) return;
	uiTimer = setInterval(function() {
		if (!currentIframe || !document.body.contains(currentIframe)) {
			stopUiTimer();
			return;
		}
		timerTick();
	}, 1000);
}

function stopUiTimer() {
	if (uiTimer) {
		clearInterval(uiTimer);
		uiTimer = null;
	}
}

function forgeItemSelectWrapper(doc, contentEl, config, tycoonData, talent) {
	showForgeItemSelect(doc, contentEl, config, tycoonData, talent,
		lib, forgeMaterials, qualityColors, getQualityByLevel, hexToRgba,
		renderForge, bindForgeEvents, forgeConfirmWrapper, setSelectedForgeTalent, forgeItemSelectWrapper);
}

function forgeConfirmWrapper(doc, contentEl, config, tycoonData, itemId, talent) {
	showForgeConfirmDialog(doc, contentEl, config, tycoonData, itemId, talent,
		lib, forgeMaterials, qualityColors, hexToRgba,
		forgeTalent, showToast, openTycoonPage,
		getForging(), setModalOpen, setUpForging, clearForging);
}

function zoneUpgradeWrapper(doc, zoneId) {
	showZoneUpgradeModal(doc, zoneId, loadTycoonStorage, canUpgradeZone, executeZoneUpgrade, showToast, openTycoonPage, hexToRgba, tycoonConfig, unlockHints, maxZoneLevel, setModalOpen, setZoneUpgrading, clearZoneUpgrading);
}

function timerTick() {
	if (!currentIframe) return;
	var doc = currentIframe.contentDocument;
	if (!doc) return;
	if (getModalOpen()) return;

	var config = getTycoonData();

	if (currentZoneId === 'helipad') {
		var contentEl = doc.getElementById('zone-content');
		if (contentEl) {
			updateFleetProgress(doc, contentEl);
		}
	} else if (currentZoneId === null) {
		updateMainResources(doc, config.tycoon, forgeMaterials);
	}
}

export function openTycoonPage() {
	if (currentIframe && document.body.contains(currentIframe)) {
		var doc = currentIframe.contentDocument;
		var config = getTycoonData();
		if (!getModalOpen()) {
			if (currentZoneId) {
				openZonePage(currentZoneId);
			} else {
				fillMainPanel(doc, config, tycoonConfig, qualityColors, maxZoneLevel, getZoneUpgradeCost, hexToRgba, forgeMaterials, showMaterialDetail, zoneUpgradeWrapper);
				bindMainEvents(doc, config, currentIframe);
			}
		}
		startUiTimer();
		return;
	}

	var iframe = document.createElement('iframe');
	iframe.src = 'extension/仙家之魂/ext/html/tycoon.html';
	iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;border:none;';
	document.body.appendChild(iframe);
	currentIframe = iframe;

	iframe.onload = function() {
		var doc = iframe.contentDocument;
		var config = getTycoonData();
		fillMainPanel(doc, config, tycoonConfig, qualityColors, maxZoneLevel, getZoneUpgradeCost, hexToRgba, forgeMaterials, showMaterialDetail, zoneUpgradeWrapper);
		bindMainEvents(doc, config, iframe);
		startUiTimer();
	};
}

export function openZonePage(zoneId) {
	if (!currentIframe) return;
	currentZoneId = zoneId;
	var doc = currentIframe.contentDocument;
	var config = getTycoonData();
	var tycoonData = config.tycoon;
	var tycoonState = config.tycoonConfig;
	var zoneLevel = (tycoonState.zones && tycoonState.zones[zoneId]) || 1;
	var zoneConfig = tycoonConfig.zones.find(function(z) { return z.id === zoneId; });
	if (!zoneConfig) return;

	doc.getElementById('main-overlay').style.display = 'none';
	doc.getElementById('zone-overlay').style.display = 'flex';

	var iconBox = doc.getElementById('zone-icon-box');
	iconBox.textContent = zoneConfig.icon;
	iconBox.style.background = 'linear-gradient(135deg,' + zoneConfig.color + ',' + zoneConfig.color + 'AA)';

	var titleEl = doc.getElementById('zone-title');
	titleEl.textContent = zoneConfig.name;
	titleEl.style.color = zoneConfig.color;
	titleEl.style.textShadow = '0 0 8px ' + hexToRgba(zoneConfig.color, 0.4);

	doc.getElementById('zone-level').textContent = '等级 Lv.' + zoneLevel;

	var zonePanel = doc.querySelector('#zone-overlay .zone-panel');
	if (zonePanel) {
		zonePanel.style.borderColor = zoneConfig.color;
		zonePanel.style.boxShadow = '0 0 30px ' + hexToRgba(zoneConfig.color, 0.25);
	}
	var backBtn = doc.getElementById('btn-back');
	backBtn.style.borderColor = zoneConfig.color;

	var contentEl = doc.getElementById('zone-content');

	switch (zoneId) {
		case 'helipad':
			contentEl.innerHTML = renderFleet(doc, tycoonData, config, qualityColors);
			bindFleetEvents(doc, contentEl, config, tycoonData, showToast, openTycoonPage);
			break;
		case 'trade':
			contentEl.innerHTML = renderTrade(doc, tycoonData, config, qualityColors);
			bindTradeEvents(doc, contentEl, config, tycoonData, executeTrade, showToast, openTycoonPage);
			break;
		case 'forge':
			setSelectedForgeTalent(null);
			contentEl.innerHTML = renderForge(doc, tycoonData, config, qualityColors);
			bindForgeEvents(doc, contentEl, config, tycoonData, getTalentById, showToast, forgeItemSelectWrapper);
			break;
	}
}

function bindMainEvents(doc, config, iframe) {
	var tycoonData = config.tycoon;

	doc.getElementById('btn-close').onclick = function() {
		stopUiTimer();
		iframe.remove();
		currentIframe = null;
		setModalOpen(false);
	};

	doc.getElementById('btn-upgrade').onclick = function() {
		showCoreUpgradeModal(doc, loadTycoonStorage, canUpgradeCore, executeCoreUpgrade, showToast, openTycoonPage, hexToRgba, setModalOpen, setUpgrading, clearUpgrading);
	};

	doc.getElementById('btn-help').onclick = function() {
		showHelp(doc, getHelpContent, renderHelpSection, qualityColors, hexToRgba, setModalOpen);
	};

	doc.querySelectorAll('[data-zone]').forEach(function(el) {
		el.addEventListener('click', function(e) {
			if (e.target.classList.contains('zone-upgrade-btn')) return;
			var zoneId = el.getAttribute('data-zone');
			openZonePage(zoneId);
		});
	});

	doc.getElementById('btn-back').onclick = function() {
		currentZoneId = null;
		doc.getElementById('zone-overlay').style.display = 'none';
		doc.getElementById('main-overlay').style.display = 'flex';
	};
}