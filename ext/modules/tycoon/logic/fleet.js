import { loadTycoonStorage, saveTycoonStorage, addTask, updateTasks } from './storage.js';
import { forgeMaterials } from '../config/forgeConfig.js';

export function getFleetDuration(level) {
	var level2 = level || 1;
	return 30 + level2 * 15;
}

export function getFleetBaseCost(level) {
	var level2 = level || 1;
	return Math.floor(100 * Math.pow(1.4, level2 - 1));
}

export function getFleetFailRate(level) {
	var level2 = level || 1;
	if (level2 <= 3) return 0;
	return (level2 - 3) * 0.05;
}

export function getFleetOutputs(level, goldInput) {
	var level2 = level || 1;
	var baseCost = getFleetBaseCost(level2);
	var multiplier = 1;
	if (goldInput && goldInput > 0) {
		multiplier = Math.pow(goldInput / baseCost, 0.7);
		if (multiplier > 5) multiplier = 5;
	}

	var outputs = [];
	var shardBase = Math.floor((5 + level2 * 3) * multiplier);
	outputs.push({ name: '碎片', amount: Math.max(1, shardBase) });

	if (level2 >= 3) {
		var essenceBase = Math.max(0, Math.floor((level2 - 2) * multiplier));
		if (essenceBase > 0) {
			outputs.push({ name: '精魄', amount: essenceBase });
		}
	}

	var matCount = Math.min(level2, forgeMaterials.length);
	for (var i = 0; i < matCount; i++) {
		var mat = forgeMaterials[i];
		var amount = Math.max(1, Math.floor(level2 * 2 / (i + 1) * multiplier));
		outputs.push({ name: mat.name, amount: amount });
	}

	return outputs;
}

export function getRefreshTokenDropRate(goldInput, level) {
	var baseCost = getFleetBaseCost(level || 1);
	var rate = 0.15;
	if (goldInput && goldInput > baseCost) {
		var bonus = Math.floor((goldInput - baseCost) / 100) * 0.05;
		rate += bonus;
	}
	if (rate > 0.6) rate = 0.6;
	return rate;
}

export function getTalentComponentChance(goldInput, level) {
	var baseCost = getFleetBaseCost(level || 1);
	var chance = 0.05;
	if (goldInput && goldInput > baseCost) {
		var ratio = goldInput / baseCost;
		chance = 0.05 + (ratio - 1) * 0.08;
	}
	if (chance > 0.4) chance = 0.4;
	return chance;
}

export function completeFleetOutputs(config, task) {
	var tycoonData = config.tycoon;
	var level = task.level;
	var failRate = getFleetFailRate(level);
	var success = Math.random() > failRate;

		if (success) {
		var outputs = getFleetOutputs(level, task.cost);
		outputs.forEach(function(out) {
			var amount = parseInt(out.amount);
			if (out.name === '金币') tycoonData.gold += amount;
			else if (out.name === '碎片') tycoonData.shards = (tycoonData.shards || 0) + amount;
			else if (out.name === '精魄') tycoonData.essence = (tycoonData.essence || 0) + amount;
			else {
				var mat = forgeMaterials.find(function(m) { return m.name === out.name; });
				if (mat) {
					tycoonData.forgeMaterials[mat.id] = (tycoonData.forgeMaterials[mat.id] || 0) + amount;
				}
			}
		});

		var refreshRate = getRefreshTokenDropRate(task.cost, level);
		if (Math.random() < refreshRate) {
			tycoonData.refreshTokens = (tycoonData.refreshTokens || 0) + 1;
		}
	} else {
		var refund = Math.floor(task.cost * 0.5);
		tycoonData.gold += refund;
	}

	saveTycoonStorage(config);
}

export function dispatchFleet(unitId, goldAmount) {
	var config = loadTycoonStorage();
	var tycoonData = config.tycoon;
	var zoneLevel = config.tycoonConfig.zones.helipad || 1;
	var units = config.tycoonConfig.units.helipad || [];
	var unit = units.find(function(u) { return u.id === unitId; });

	if (!unit) return { success: false, message: '飞空艇不存在' };

	var tasks = config.tycoonConfig.tasks || [];
	var active = tasks.find(function(t) { return t.unitId === unitId; });
	if (active) return { success: false, message: '该飞空艇正在执行任务' };

	var cost = Math.max(1, Math.floor(goldAmount));
	if (tycoonData.gold < cost) return { success: false, message: '金币不足' };

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
	saveTycoonStorage(config);
	return { success: true, message: unit.name + ' 已派遣，消耗 ' + cost + ' 金币' };
}

export function renderFleet(doc, tycoonData, config, qualityColors) {
	var zoneLevel = config.tycoonConfig.zones.helipad || 1;
	var allUnits = config.tycoonConfig.units.helipad || [];
	var units = allUnits.filter(function(u) { return u.type === 'fleet'; });
	var tasks = config.tycoonConfig.tasks || [];
	var baseCost = getFleetBaseCost(zoneLevel);

	var activeMap = {};
	tasks.forEach(function(t) { activeMap[t.unitId] = t; });

	var html = '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:center;">' +
		'<span style="color:#00BCD4;font-size:13px;">🚢 贸易舰队 Lv.' + zoneLevel + '</span>' +
		'<span style="color:rgba(255,255,255,0.5);font-size:11px;">基础消耗 ' + baseCost + ' 金币 · 耗时 ' + getFleetDuration(zoneLevel) + '秒</span>' +
		'<span style="margin-left:auto;color:#FFD700;font-size:11px;">🧭 星界罗盘: ' + (tycoonData.refreshTokens || 0) + '</span>' +
	'</div>';

	html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;">';

	units.forEach(function(unit) {
		var active = activeMap[unit.id];
		var cardBg = active ? 'linear-gradient(135deg,rgba(255,152,0,0.2),rgba(255,87,34,0.2))' : 'linear-gradient(135deg,rgba(0,188,212,0.15),rgba(0,150,136,0.1))';
		var cardBorder = active ? '#FF9800' : 'rgba(0,188,212,0.3)';

		var content = '';
		if (active) {
			var pct = Math.floor(active.progress);
			var estOutputs = getFleetOutputs(zoneLevel, active.cost);
			var estStr = estOutputs.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
			content = '<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">🚢 执行中</div>' +
				'<div style="margin-top:6px;background:rgba(255,255,255,0.1);border-radius:4px;height:8px;overflow:hidden;">' +
					'<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#FF9800,#FF5722);border-radius:4px;transition:width 0.3s;"></div></div>' +
				'<div style="color:rgba(255,255,255,0.6);font-size:10px;margin-top:3px;">执行中 ' + pct + '%</div>' +
				'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:4px;">消耗: ' + active.cost + '金币 · 耗时 ' + active.duration + 's</div>' +
				'<div style="color:rgba(255,255,255,0.3);font-size:10px;">预估: ' + estStr + '</div>';
		} else {
			var idleOutputs = getFleetOutputs(zoneLevel, baseCost);
			var idleStr = idleOutputs.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
			content = '<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">✅ 空闲</div>' +
				'<div class="dispatch-area" data-unit="' + unit.id + '" style="margin-top:6px;">' +
					'<div style="display:flex;gap:4px;margin-bottom:6px;align-items:center;">' +
						'<input class="dispatch-gold" type="number" min="1" value="' + baseCost + '" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(0,188,212,0.3);color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;width:60px;" />' +
						'<button class="dispatch-preset" data-gold="' + baseCost + '" style="background:rgba(0,188,212,0.3);color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">基础</button>' +
						'<button class="dispatch-preset" data-gold="' + (baseCost * 3) + '" style="background:rgba(255,152,0,0.3);color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">3倍</button>' +
					'</div>' +
					'<button class="dispatch-btn" data-unit="' + unit.id + '" style="width:100%;background:linear-gradient(135deg,#4CAF50,#388E3C);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:12px;">派遣</button>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.3);font-size:10px;margin-top:4px;">预估: ' + idleStr + '</div>' +
				'<div style="color:rgba(255,255,255,0.25);font-size:10px;">多投金币 → 多倍收益 · 失败返还50%</div>';
		}

		html += '<div class="fleet-card" data-unit="' + unit.id + '" style="background:' + cardBg + ';border:1px solid ' + cardBorder + ';border-radius:10px;padding:10px;transition:transform 0.2s;">' +
			'<div style="display:flex;align-items:center;gap:6px;">' +
				'<span style="font-size:18px;">' + (unit.icon || '🚢') + '</span>' +
				'<span style="color:#fff;font-size:12px;font-weight:bold;">' + unit.name + '</span>' +
			'</div>' +
			content +
		'</div>';
	});

	html += '</div>';
	return html;
}

export function updateFleetProgress(doc, contentEl) {
	var config = loadTycoonStorage();

	var completedTasks = updateTasks(config);
	for (var ci = 0; ci < completedTasks.length; ci++) {
		var task = completedTasks[ci];
		completeFleetOutputs(config, task);
	}

	if (completedTasks.length > 0) {
		saveTycoonStorage(config);
	}

	var zoneLevel = config.tycoonConfig.zones.helipad || 1;
	var units = (config.tycoonConfig.units.helipad || []).filter(function(u) { return u.type === 'fleet'; });
	var tasks = config.tycoonConfig.tasks || [];
	var activeMap = {};
	tasks.forEach(function(t) { activeMap[t.unitId] = t; });

	var cards = contentEl.querySelectorAll('.fleet-card');
	cards.forEach(function(cardEl) {
		var unitId = cardEl.getAttribute('data-unit');
		var active = activeMap[unitId];
		var unit = units.find(function(u) { return u.id === unitId; });
		if (!unit) return;

		var hasDispatch = cardEl.querySelector('.dispatch-area');
		var hasProgressBar = cardEl.querySelector(':scope > div:nth-child(3) > div');

		if (active) {
			var pct = Math.floor(active.progress);
			var estOutputs = getFleetOutputs(zoneLevel, active.cost);
			var estStr = estOutputs.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
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
				'<div style="color:rgba(255,255,255,0.4);font-size:10px;margin-top:4px;">消耗: ' + active.cost + '金币 · 耗时 ' + active.duration + 's</div>' +
				'<div style="color:rgba(255,255,255,0.3);font-size:10px;">预估: ' + estStr + '</div>' +
			'';
			bindDispatchEvents(doc, contentEl, config);
		} else if (hasProgressBar || !active) {
			var baseCost = getFleetBaseCost(zoneLevel);
			var idleOutputs = getFleetOutputs(zoneLevel, baseCost);
			var idleStr = idleOutputs.map(function(o) { return o.name + '×' + o.amount; }).join(', ');
			cardEl.style.background = 'linear-gradient(135deg,rgba(0,188,212,0.15),rgba(0,150,136,0.1))';
			cardEl.style.borderColor = 'rgba(0,188,212,0.3)';
			cardEl.innerHTML =
				'<div style="display:flex;align-items:center;gap:6px;">' +
					'<span style="font-size:18px;">' + (unit.icon || '🚢') + '</span>' +
					'<span style="color:#fff;font-size:12px;font-weight:bold;">' + unit.name + '</span>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.5);font-size:10px;margin-top:2px;">✅ 空闲</div>' +
				'<div class="dispatch-area" data-unit="' + unit.id + '" style="margin-top:6px;">' +
					'<div style="display:flex;gap:4px;margin-bottom:6px;align-items:center;">' +
						'<input class="dispatch-gold" type="number" min="1" value="' + baseCost + '" style="flex:1;background:rgba(255,255,255,0.08);border:1px solid rgba(0,188,212,0.3);color:#fff;padding:4px 8px;border-radius:4px;font-size:11px;width:60px;" />' +
						'<button class="dispatch-preset" data-gold="' + baseCost + '" style="background:rgba(0,188,212,0.3);color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">基础</button>' +
						'<button class="dispatch-preset" data-gold="' + (baseCost * 3) + '" style="background:rgba(255,152,0,0.3);color:#fff;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-size:10px;">3倍</button>' +
					'</div>' +
					'<button class="dispatch-btn" data-unit="' + unit.id + '" style="width:100%;background:linear-gradient(135deg,#4CAF50,#388E3C);color:#fff;border:none;padding:6px;border-radius:6px;cursor:pointer;font-size:12px;">派遣</button>' +
				'</div>' +
				'<div style="color:rgba(255,255,255,0.3);font-size:10px;margin-top:4px;">预估: ' + idleStr + '</div>' +
				'<div style="color:rgba(255,255,255,0.25);font-size:10px;">多投金币 → 多倍收益 · 失败返还50%</div>';
			'';
			bindDispatchEvents(doc, contentEl, config);
		}
	});
}

export function bindFleetEvents(doc, contentEl, config, tycoonData, showToast, openTycoonPage) {
	bindDispatchEvents(doc, contentEl, config, showToast, openTycoonPage);
}

function bindDispatchEvents(doc, contentEl, config, showToast, openTycoonPage) {
	var presets = contentEl.querySelectorAll('.dispatch-preset');
	presets.forEach(function(btn) {
		if (btn._bound) return;
		btn._bound = true;
		btn.addEventListener('click', function(e) {
			e.stopPropagation();
			var gold = btn.getAttribute('data-gold');
			var area = btn.closest('.dispatch-area');
			if (area) {
				var input = area.querySelector('.dispatch-gold');
				if (input) input.value = gold;
			}
		});
	});

	var dispatchBtns = contentEl.querySelectorAll('.dispatch-btn');
	dispatchBtns.forEach(function(btn) {
		if (btn._bound) return;
		btn._bound = true;
		btn.addEventListener('click', function(e) {
			e.stopPropagation();
			var unitId = btn.getAttribute('data-unit');
			var area = btn.closest('.dispatch-area');
			var goldInput = area ? area.querySelector('.dispatch-gold') : null;
			var gold = 1;
			if (goldInput) {
				gold = Math.max(1, parseInt(goldInput.value) || 1);
			}
			var result = dispatchFleet(unitId, gold);
			showToast(doc, result.message);
			if (result.success) {
				openTycoonPage();
			}
		});
	});
}
