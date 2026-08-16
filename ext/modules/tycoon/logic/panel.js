export function fillMainPanel(doc, config, tycoonConfig, qualityColors, maxZoneLevel, getZoneUpgradeCost, hexToRgba, forgeMaterials, showMaterialDetail, showZoneUpgradeModal) {
	var tycoonData = config.tycoon;

	doc.getElementById('sub-title').textContent = 'Lv.' + tycoonData.coreLevel + ' 绿洲核心';

	var now = new Date();
	var dateStr = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
	doc.getElementById('date-info').textContent = '🕐 ' + dateStr;

	fillResourceGrid(doc, tycoonData, hexToRgba);

	fillZoneGrid(doc, config, tycoonConfig, maxZoneLevel, getZoneUpgradeCost, hexToRgba, qualityColors, showZoneUpgradeModal);

	var tabs = ['制作材料'];
	fillTabBar(doc, tabs);

	fillScrollArea(doc, tycoonData, tycoonConfig, forgeMaterials, qualityColors, showMaterialDetail);

	doc.getElementById('main-overlay').style.display = 'flex';
	doc.getElementById('zone-overlay').style.display = 'none';

	doc.getElementById('modal-container').innerHTML = '';
}

export function updateMainResources(doc, tycoonData, forgeMaterials) {
	var resourceCards = doc.querySelectorAll('#resource-grid .resource-value');
	if (resourceCards.length >= 2) {
		resourceCards[0].textContent = tycoonData.gold;
		resourceCards[1].textContent = 'Lv.' + tycoonData.coreLevel;
	}
	var matItems = doc.querySelectorAll('#scroll-area .forge-item');
	matItems.forEach(function(item) {
		var matId = item.getAttribute('data-material');
		var stock = tycoonData.forgeMaterials[matId] || 0;
		var valEl = item.querySelector('.forge-value');
		if (valEl) valEl.textContent = '×' + stock;
	});
}

export function fillResourceGrid(doc, tycoonData, hexToRgba) {
	var cards = [
		{ name: '金币', icon: '💰', value: tycoonData.gold, color: '#FFD700' },
		{ name: '核心等级', icon: '🏰', value: 'Lv.' + tycoonData.coreLevel, color: '#90EE90' }
	];
	var html = cards.map(function(c) {
		return '<div class="resource-card" style="background:linear-gradient(135deg,' + hexToRgba(c.color, 0.15) + ',rgba(255,255,255,0.05));">' +
			'<div class="resource-icon">' + c.icon + '</div>' +
			'<div class="resource-name">' + c.name + '</div>' +
			'<div class="resource-value" style="color:' + c.color + ';text-shadow:0 0 8px ' + hexToRgba(c.color, 0.25) + ';">' + c.value + '</div>' +
		'</div>';
	}).join('');
	doc.getElementById('resource-grid').innerHTML = html;
}

export function fillZoneGrid(doc, config, tycoonConfig, maxZoneLevel, getZoneUpgradeCost, hexToRgba, qualityColors, showZoneUpgradeModal) {
	var zones = config.tycoonConfig.zones;
	var tycoonData = config.tycoon;
	var coreLevel = tycoonData.coreLevel;
	var html = tycoonConfig.zones.map(function(zone) {
		var zoneLevel = zones[zone.id] || 1;
		var nextLevel = zoneLevel + 1;
		var bgColor = hexToRgba(zone.color, 0.13);
		var borderColor = hexToRgba(zone.color, 0.375);
		var badgeBg = hexToRgba(zone.color, 0.188);
		var maxed = zoneLevel >= maxZoneLevel;
		var canUpgrade = !maxed && coreLevel >= nextLevel;
		var upgradeCost = getZoneUpgradeCost(zone.id, zoneLevel);

		var upgradeHtml = '';
		if (maxed) {
			upgradeHtml = '<button class="zone-upgrade-btn" disabled style="opacity:0.5;cursor:not-allowed;background:#555;color:#999;border:none;padding:4px 10px;border-radius:4px;font-size:10px;">已满级</button>';
		} else {
			var coreLocked = coreLevel < nextLevel;
			var canAfford = tycoonData.gold >= upgradeCost;
			var disabled = coreLocked || !canAfford;
			var title = coreLocked ? '需先升级绿洲核心至 Lv.' + nextLevel : (!canAfford ? '金币不足' : '');
			var btnStyle = disabled
				? 'opacity:0.5;cursor:not-allowed;background:#555;'
				: '';
			var btnText = '升级 💰' + upgradeCost;
			if (coreLocked) btnText = '🔒 核心Lv.' + nextLevel;
			upgradeHtml = '<button class="zone-upgrade-btn" data-zone-upgrade="' + zone.id + '"' + (disabled ? ' disabled' : '') + ' title="' + title + '" style="' + btnStyle + '">' + btnText + '</button>';
		}

		return '<div class="zone-card" data-zone="' + zone.id + '" style="background:linear-gradient(135deg,' + bgColor + ',rgba(255,255,255,0.03));border:1px solid ' + borderColor + ';">' +
			'<div class="zone-card-corner">' + zone.icon + '</div>' +
			'<div class="zone-icon">' + zone.icon + '</div>' +
			'<div class="zone-name">' + zone.name + '</div>' +
			'<div class="zone-desc">' + zone.desc + '</div>' +
			'<div class="level-row">' +
				'<div class="zone-level-badge" style="background:' + badgeBg + ';color:' + zone.color + ';">Lv.' + zoneLevel + '</div>' +
				upgradeHtml +
			'</div>' +
		'</div>';
	}).join('');
	doc.getElementById('zone-grid').innerHTML = html;

	doc.querySelectorAll('[data-zone-upgrade]').forEach(function(el) {
		el.addEventListener('click', function(e) {
			e.stopPropagation();
			var zoneId = el.getAttribute('data-zone-upgrade');
			showZoneUpgradeModal(doc, zoneId);
		});
	});
}

export function fillTabBar(doc, tabs) {
	var html = tabs.map(function(tab, i) {
		var cls = i === 0 ? 'tab-btn active' : 'tab-btn inactive';
		return '<div class="' + cls + '" data-tab="' + tab + '">' + tab + '</div>';
	}).join('');
	doc.getElementById('tab-bar').innerHTML = html;
}

export function fillScrollArea(doc, tycoonData, tycoonConfig, forgeMaterials, qualityColors, showMaterialDetail) {
	var html = tycoonConfig.forgeMaterials.map(function(mat) {
		var isHigh = mat.level >= 6;
		var itemCls = isHigh ? 'forge-item high' : 'forge-item normal';
		var valueCls = isHigh ? 'forge-value high' : 'forge-value normal';
		var stock = tycoonData.forgeMaterials[mat.id] || 0;
		var rarityColor = qualityColors[mat.rarity] || '#9E9E9E';
		return '<div class="' + itemCls + '" data-material="' + mat.id + '" style="cursor:pointer;transition:transform 0.2s;" onmouseover="this.style.transform=\'scale(1.03)\'" onmouseout="this.style.transform=\'scale(1)\'">' +
			'<div class="forge-name" style="color:' + rarityColor + ';">' + mat.icon + ' ' + mat.name + '</div>' +
			'<div class="forge-level">Lv.' + mat.level + ' <span style="color:' + rarityColor + ';font-size:10px;">[' + mat.rarity + ']</span></div>' +
			'<div class="' + valueCls + '">×' + stock + '</div>' +
		'</div>';
	}).join('');

	doc.getElementById('scroll-area').innerHTML = '<div class="tab-content">' + html + '</div>';

	doc.querySelectorAll('[data-material]').forEach(function(el) {
		el.addEventListener('click', function() {
			var matId = el.getAttribute('data-material');
			var mat = forgeMaterials.find(function(m) { return m.id === matId; });
			if (mat) showMaterialDetail(doc, mat, tycoonData, qualityColors);
		});
	});
}