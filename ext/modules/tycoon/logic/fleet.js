import { loadTycoonStorage, saveTycoonStorage, addTask, updateTasks } from './storage.js';
import { forgeMaterials } from '../config/forgeConfig.js';

export function getFleetDuration(level) {
	var level2 = level || 1;
	return 30 + level2 * 15;
}

export function getFleetCost(level) {
	var level2 = level || 1;
	return Math.floor(100 * Math.pow(1.4, level2 - 1));
}

export function getFleetFailRate(level) {
	var level2 = level || 1;
	if (level2 <= 3) return 0;
	return (level2 - 3) * 0.05;
}

export function getFleetOutputs(level) {
	var level2 = level || 1;
	var outputs = [];
	var shardBase = 5 + level2 * 3;
	outputs.push({ name: '碎片', amount: shardBase });

	if (level2 >= 3) {
		var essenceBase = Math.max(0, level2 - 2);
		outputs.push({ name: '精魄', amount: essenceBase });
	}

	var matCount = Math.min(level2, 8);
	for (var i = 0; i < matCount; i++) {
		var mat = forgeMaterials[i];
		var amount = Math.max(1, Math.floor(level2 * 2 / (i + 1)));
		outputs.push({ name: mat.name, amount: amount });
	}
	return outputs;
}

export function completeFleetOutputs(config, task) {
	var tycoonData = config.tycoon;
	var level = task.level;
	var failRate = getFleetFailRate(level);
	var success = Math.random() > failRate;

	if (success) {
		var outputs = getFleetOutputs(level);
		outputs.forEach(function(out) {
			var amount = parseInt(out.amount);
			if (out.name === '金币') tycoonData.gold += amount;
			else if (out.name === '碎片') config.suipian = (config.suipian || 0) + amount;
			else if (out.name === '精魄') config.tokens = (config.tokens || 0) + amount;
			else {
				var mat = forgeMaterials.find(function(m) { return m.name === out.name; });
				if (mat) {
					tycoonData.forgeMaterials[mat.id] = (tycoonData.forgeMaterials[mat.id] || 0) + amount;
				}
			}
		});
	} else {
		var refund = Math.floor(task.cost * 0.5);
		tycoonData.gold += refund;
	}

	saveTycoonStorage(config);
}

export function autoDispatchUnits() {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;
	var zoneLevel = config.tycoonConfig.zones.helipad || 1;

	var completedTasks = updateTasks(config);
	for (var ci = 0; ci < completedTasks.length; ci++) {
		var task = completedTasks[ci];
		completeFleetOutputs(config, task);
	}

	var units = config.tycoonConfig.units.helipad || [];
	var activeTaskIds = {};
	for (var ti = 0; ti < (config.tycoonConfig.tasks || []).length; ti++) {
		activeTaskIds[config.tycoonConfig.tasks[ti].unitId] = true;
	}

	var dispatchedCount = 0;
	for (var ui = 0; ui < units.length; ui++) {
		var unit = units[ui];
		if (activeTaskIds[unit.id]) continue;

		var cost = getFleetCost(zoneLevel);
		if (tycoonData.gold < cost) continue;

		tycoonData.gold -= cost;
		var task = {
			type: 'fleet',
			unitId: unit.id,
			unitName: unit.name,
			cost: cost,
			level: zoneLevel,
			duration: getFleetDuration(zoneLevel),
			progress: 0
		};
		addTask(config, task);
		dispatchedCount++;
	}

	if (dispatchedCount > 0) {
		saveTycoonStorage(config);
	}
	return dispatchedCount;
}

export function renderFleet(doc, tycoonData, config, qualityColors) {
	var zoneLevel = config.tycoonConfig.zones.helipad || 1;
	var units = config.tycoonConfig.units.helipad || [];
	var tasks = config.tycoonConfig.tasks || [];

	var activeMap = {};
	tasks.forEach(function(t) { activeMap[t.unitId] = t; });

	var html = '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">' +
		'<span style="color:#00BCD4;font-size:13px;">🚢 贸易舰队 Lv.' + zoneLevel + '</span>' +
		'<span style="color:rgba(255,255,255,0.5);font-size:11px;">每' + getFleetDuration(zoneLevel) + '秒 · 消耗' + getFleetCost(zoneLevel) + '金币</span>' +
		'<button id="auto-dispatch" style="margin-left:auto;background:linear-gradient(135deg,#00BCD4,#00838F);color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;">⚡ 自动派遣</button>' +
	'</div>';

	html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;">';

	units.forEach(function(unit) {
		var active = activeMap[unit.id];
		var cardBg = active ? 'linear-gradient(135deg,rgba(255,152,0,0.2),rgba(255,87,34,0.2))' : 'linear-gradient(135deg,rgba(0,188,212,0.15),rgba(0,150,136,0.1))';
		var cardBorder = active ? '#FF9800' : 'rgba(0,188,212,0.3)';

		var progressBar = '';
		var statusIcon = '✅';
		var statusText = '空闲';

		if (active) {
			progressBar = '<div style="margin-top:6px;background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden;">' +
				'<div style="height:100%;width:' + Math.floor(active.progress) + '%;background:linear-gradient(90deg,#FF9800,#FF5722);border-radius:4px;transition:width 0.3s;"></div></div>' +
				'<div style="color:rgba(255,255,255,0.6);font-size:10px;margin-top:3px;">执行中 ' + Math.floor(active.progress) + '%</div>';
			statusIcon = '🚢';
			statusText = '执行中';
		}

		var estOutputs = getFleetOutputs(zoneLevel);
		var estStr = estOutputs.map(function(o) {
			return o.name + '×' + o.amount;
		}).join(', ');

		html += '<div class="fleet-card" data-unit="' + unit.id + '" style="background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:10px;padding:10px;cursor:pointer;transition:transform 0.2s;" onmouseover="this.style.transform=\'scale(1.02)\'" onmouseout="this.style.transform=\'scale(1)\'">' +
			'<div style="display:flex;align-items:center;gap:6px;">' +
				'<span style="font-size:18px;">' + (unit.icon || '🚢') + '</span>' +
				'<span style="color:#fff;font-size:12px;font-weight:bold;">' + unit.name + '</span>' +
			'</div>' +
			'<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">' + statusIcon + ' ' + statusText + '</div>' +
			progressBar +
			'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:6px;">预估: ' + estStr + '</div>' +
			(active ? '<div style="color:rgba(255,255,255,0.3);font-size:10px;">耗时 ' + active.duration + 's · 失败率 ' + Math.floor(getFleetFailRate(zoneLevel) * 100) + '%</div>' : '') +
		'</div>';
	});

	html += '</div>';
	return html;
}

export function updateFleetProgress(doc, contentEl, config, autoDispatchUnitsFn, getZoneUnitsFn, getFleetCostFn, getFleetDurationFn, getFleetOutputsFn) {
	var tycoonData = config.tycoon;
	var zoneLevel = config.tycoonConfig.zones.helipad || 1;

	var completedTasks = updateTasks(config);
	for (var ci = 0; ci < completedTasks.length; ci++) {
		var task = completedTasks[ci];
		completeFleetOutputs(config, task);
	}

	var dispatchedCount = 0;
	var units = config.tycoonConfig.units.helipad || [];
	var activeTaskIds = {};
	for (var ti = 0; ti < (config.tycoonConfig.tasks || []).length; ti++) {
		activeTaskIds[config.tycoonConfig.tasks[ti].unitId] = true;
	}

	for (var ui = 0; ui < units.length; ui++) {
		var unit = units[ui];
		if (activeTaskIds[unit.id]) continue;
		var cost = getFleetCost(zoneLevel);
		if (tycoonData.gold < cost) continue;
		tycoonData.gold -= cost;
		var task = {
			type: 'fleet',
			unitId: unit.id,
			unitName: unit.name,
			cost: cost,
			level: zoneLevel,
			duration: getFleetDuration(zoneLevel),
			progress: 0
		};
		addTask(config, task);
		dispatchedCount++;
	}

	if (completedTasks.length > 0 || dispatchedCount > 0) {
		saveTycoonStorage(config);
	}

	var tasks = config.tycoonConfig.tasks || [];
	var activeMap = {};
	tasks.forEach(function(t) { activeMap[t.unitId] = t; });

	var cards = contentEl.querySelectorAll('.fleet-card');
	cards.forEach(function(cardEl) {
		var unitId = cardEl.getAttribute('data-unit');
		var active = activeMap[unitId];
		var unit = units.find(function(u) { return u.id === unitId; });
		if (!unit) return;

		var hasProgressBar = cardEl.querySelector(':scope > div:nth-child(3) > div');

		if (active && hasProgressBar) {
			var p = Math.floor(active.progress);
			var bar = cardEl.querySelector(':scope > div:nth-child(3)');
			var textEl = cardEl.querySelector(':scope > div:nth-child(4)');
			if (bar) {
				var fill = bar.querySelector('div');
				if (fill) fill.style.width = p + '%';
			}
			if (textEl) textEl.textContent = '执行中 ' + p + '%';
		} else if (active && !hasProgressBar) {
			var estOutputs = getFleetOutputs(zoneLevel);
			var estStr = estOutputs.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
			var pct = Math.floor(active.progress);
			cardEl.style.background = 'linear-gradient(135deg,rgba(255,152,0,0.2),rgba(255,87,34,0.2))';
			cardEl.style.borderColor = '#FF9800';
			cardEl.innerHTML =
				'<div style="display:flex;align-items:center;gap:6px;">' +
					'<span style="font-size:18px;">' + (unit.icon || '🚢') + '</span>' +
					'<span style="color:#fff;font-size:12px;font-weight:bold;">' + unit.name + '</span>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">🚢 执行中</div>' +
				'<div style="margin-top:6px;background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden;">' +
					'<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#FF9800,#FF5722);border-radius:4px;transition:width 0.3s;"></div>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.6);font-size:10px;margin-top:3px;">执行中 ' + pct + '%</div>' +
				'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:6px;">预估: ' + estStr + '</div>' +
				'<div style="color:rgba(255,255,255,0.3);font-size:10px;">耗时 ' + active.duration + 's · 失败率 ' + Math.floor(getFleetFailRate(zoneLevel) * 100) + '%</div>' +
			'';
			bindCardClick(doc, contentEl, config);
		} else if (!active && hasProgressBar) {
			var estOutputs2 = getFleetOutputs(zoneLevel);
			var estStr2 = estOutputs2.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
			cardEl.style.background = 'linear-gradient(135deg,rgba(0,188,212,0.15),rgba(0,150,136,0.1))';
			cardEl.style.borderColor = 'rgba(0,188,212,0.3)';
			cardEl.innerHTML =
				'<div style="display:flex;align-items:center;gap:6px;">' +
					'<span style="font-size:18px;">' + (unit.icon || '🚢') + '</span>' +
					'<span style="color:#fff;font-size:12px;font-weight:bold;">' + unit.name + '</span>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">✅ 空闲</div>' +
				'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:6px;">预估: ' + estStr2 + '</div>' +
			'';
			bindCardClick(doc, contentEl, config);
		}
	});

	var detailEl = contentEl.querySelector('#fleet-detail');
	if (detailEl) {
		var unitId = detailEl.dataset.unitId;
		if (!unitId) {
			var firstCard = contentEl.querySelector('.fleet-card');
			if (firstCard) unitId = firstCard.getAttribute('data-unit');
		}
		if (unitId) {
			updateDetailPanel(doc, contentEl, config, unitId, getZoneUnitsFn, getFleetCostFn, getFleetDurationFn, getFleetOutputsFn);
		}
	}

	return dispatchedCount;
}

export function bindFleetEvents(doc, contentEl, config, tycoonData, autoDispatchUnitsFn, showToast, openTycoonPage, getZoneUnitsFn, getFleetCost, getFleetDuration, getFleetOutputs) {
	contentEl.querySelector('#auto-dispatch').addEventListener('click', function() {
		var dispatched = autoDispatchUnitsFn();
		showToast(doc, '已派遣 ' + dispatched + ' 艘贸易舰队');
		openTycoonPage();
	});

	bindCardClick(doc, contentEl, config, getZoneUnitsFn, getFleetCost, getFleetDuration, getFleetOutputs);
}

function bindCardClick(doc, contentEl, config, getZoneUnitsFn, getFleetCost, getFleetDuration, getFleetOutputs) {
	var cards = contentEl.querySelectorAll('.fleet-card');
	cards.forEach(function(el) {
		if (el._bound) return;
		el._bound = true;
		el.addEventListener('click', function() {
			var unitId = el.getAttribute('data-unit');
			var detailEl = contentEl.querySelector('#fleet-detail');
			if (!detailEl) {
				detailEl = doc.createElement('div');
				detailEl.id = 'fleet-detail';
				detailEl.style.marginTop = '12px';
				contentEl.appendChild(detailEl);
			}
			detailEl.dataset.unitId = unitId;
			updateDetailPanel(doc, contentEl, config, unitId, getZoneUnitsFn, getFleetCost, getFleetDuration, getFleetOutputs);
		});
	});
}

function updateDetailPanel(doc, contentEl, config, unitId, getZoneUnitsFn, getFleetCost, getFleetDuration, getFleetOutputs) {
	var tasks = config.tycoonConfig.tasks || [];
	var task = tasks.find(function(t) { return t.unitId === unitId && !t.completed; });
	var detailEl = contentEl.querySelector('#fleet-detail');
	if (!detailEl) return;

	if (task) {
		var p = task.progress || 0;
		var outputs = getFleetOutputs(task.level);
		var outputsHtml = outputs.map(function(o) { return o.name + '×' + o.amount; }).join(' + ');
		detailEl.innerHTML = '<div style="padding:12px;background:rgba(0,188,212,0.08);border:1px solid rgba(0,188,212,0.3);border-radius:10px;">' +
			'<div style="color:#FFD700;font-weight:bold;margin-bottom:8px;">⏳ 执行中</div>' +
			'<div style="color:rgba(255,255,255,0.7);font-size:12px;margin-bottom:8px;">进度：' + Math.floor(p) + '% | 等级：Lv.' + task.level + '</div>' +
			'<div style="background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden;margin-bottom:8px;">' +
				'<div style="width:' + p + '%;height:100%;background:linear-gradient(90deg,#00BCD4,#4CAF50);border-radius:4px;transition:width 0.3s;"></div>' +
			'</div>' +
			'<div style="color:rgba(255,255,255,0.6);font-size:12px;">消耗：' + task.cost + '金币 | 预计产出：' + outputsHtml + '</div>' +
		'</div>';
	} else {
		var level = config.tycoonConfig.zones.helipad || 1;
		var cost = getFleetCost(level);
		var duration = getFleetDuration(level);
		var outputs = getFleetOutputs(level);
		var outputsHtml = outputs.map(function(o) { return o.name + '×' + o.amount; }).join(' + ');
		detailEl.innerHTML = '<div style="padding:12px;background:rgba(76,175,80,0.08);border:1px solid rgba(76,175,80,0.3);border-radius:10px;">' +
			'<div style="color:#4CAF50;font-weight:bold;margin-bottom:8px;">✅ 空闲中</div>' +
			'<div style="color:rgba(255,255,255,0.7);font-size:12px;margin-bottom:6px;">下次贸易预估：</div>' +
			'<div style="color:rgba(255,255,255,0.8);font-size:13px;">💰 消耗：' + cost + ' 金币 | ⏱️ 耗时：' + duration + '秒</div>' +
			'<div style="color:rgba(255,255,255,0.8);font-size:13px;">📦 产出：' + outputsHtml + '</div>' +
		'</div>';
	}
}