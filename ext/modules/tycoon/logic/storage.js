import { lib, game } from '../../../../../../noname.js';
import { forgeMaterials } from '../config/forgeConfig.js';

export function getDefaultTycoonData() {
	return {
		gold: 500, coreLevel: 1,
		refreshTokens: 0,
		shards: 0,
		essence: 0,
		runes: 0,
		nestKeys: 0,
		talentComponents: 0,
		dollarChests: 0,
		forgeMaterials: { yinyuecao: 30, xingchensha: 15, youlanhua: 8, fengxieshi: 3, longxianguo: 1, niepanhuo: 0, taiguyu: 0, tianmingshi: 0 }
	};
}

export function getDefaultTycoonConfig() {
	return {
		zones: { helipad: 1, trade: 1, forge: 1 },
		units: {
			helipad: [
				{ id: 'fleet_1', type: 'fleet', name: '贸易舰队α', icon: '🚢' },
				{ id: 'fleet_2', type: 'fleet', name: '贸易舰队β', icon: '🚢' },
				{ id: 'fleet_3', type: 'fleet', name: '贸易舰队γ', icon: '🚢' },
				{ id: 'fleet_4', type: 'fleet', name: '贸易舰队δ', icon: '🚢' }
			],
			trade: [
				{ id: 'trade_merchant', type: 'merchant', name: '商人', icon: '🏪' }
			],
			forge: [
				{ id: 'forge_smith', type: 'smith', name: '锻造师', icon: '⚒️' }
			]
		},
		tasks: []
	};
}

export function loadTycoonStorage() {
	var config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
	if (!config.tycoon) {
		config.tycoon = getDefaultTycoonData();
		config.tycoonConfig = getDefaultTycoonConfig();
		game.xjzh_saveQishuConfig(config);
	}
	if (!config.tycoonConfig) {
		config.tycoonConfig = getDefaultTycoonConfig();
		game.xjzh_saveQishuConfig(config);
	}
	if (!config.craftedBag) {
		config.craftedBag = [];
	}
	if (!config.bag) {
		config.bag = [];
	}

	if (config.tycoon.refreshTokens === undefined) {
		config.tycoon.refreshTokens = 0;
	}

	var newFields = ['shards', 'essence', 'runes', 'nestKeys', 'talentComponents', 'dollarChests'];
	newFields.forEach(function(field) {
		if (config.tycoon[field] === undefined) {
			config.tycoon[field] = 0;
		}
	});

	if (config.tycoonConfig.units && config.tycoonConfig.units.helipad) {
		var units = config.tycoonConfig.units.helipad;
		var hasGlider = units.some(function(u) { return u.type !== 'fleet'; });
		if (hasGlider) {
			var nonFleetUnits = units.filter(function(u) { return u.type !== 'fleet'; });
			nonFleetUnits.forEach(function(u) {
				config.tycoonConfig.tasks = (config.tycoonConfig.tasks || []).filter(function(t) {
					return t.unitId !== u.id;
				});
			});
			config.tycoonConfig.units.helipad = units.filter(function(u) { return u.type === 'fleet'; });
			saveTycoonStorage(config);
		}
	}

	if (config.suipian && config.suipian > 0) {
		config.tycoon.shards = (config.tycoon.shards || 0) + config.suipian;
		config.suipian = 0;
	}
	if (config.tokens && config.tokens > 0) {
		config.tycoon.essence = (config.tycoon.essence || 0) + config.tokens;
		config.tokens = 0;
	}

	if (config.tycoon.shards > 0) {
		config.suipian = (config.suipian || 0) + config.tycoon.shards;
	}
	if (config.tycoon.essence > 0) {
		config.tokens = (config.tokens || 0) + config.tycoon.essence;
	}

	return config;
}

export function saveTycoonStorage(config) {
	game.xjzh_saveQishuConfig(config);
}

export function getTycoonData() {
	var config = loadTycoonStorage();
	if (!config.tycoon) {
		config.tycoon = getDefaultTycoonData();
		game.xjzh_saveQishuConfig(config);
	}
	return config;
}

export function getResourceAmount(resourceId, config) {
	var tycoonData = config.tycoon;
	if (tycoonData.forgeMaterials && tycoonData.forgeMaterials[resourceId] !== undefined) return tycoonData.forgeMaterials[resourceId];
	if (resourceId === 'gold') return tycoonData.gold;
	if (resourceId === 'shards') return tycoonData.shards || 0;
	if (resourceId === 'essence') return tycoonData.essence || 0;
	if (resourceId === 'refreshTokens') return tycoonData.refreshTokens || 0;
	if (resourceId === 'runes') return tycoonData.runes || 0;
	if (resourceId === 'nestKeys') return tycoonData.nestKeys || 0;
	if (resourceId === 'talentComponents') return tycoonData.talentComponents || 0;
	if (resourceId === 'dollarChests') return tycoonData.dollarChests || 0;
	return 0;
}

export function getZoneUnits(zoneId) {
	var config = loadTycoonStorage();
	if (!config.tycoonConfig.units) config.tycoonConfig.units = {};
	if (!config.tycoonConfig.units[zoneId]) {
		config.tycoonConfig.units[zoneId] = getDefaultTycoonConfig().units[zoneId] || [];
		saveTycoonStorage(config);
	}
	return config.tycoonConfig.units[zoneId];
}

export function addTask(config, task) {
	if (!config.tycoonConfig.tasks) config.tycoonConfig.tasks = [];
	task.id = 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
	task.startTime = Date.now();
	task.progress = 0;
	config.tycoonConfig.tasks.push(task);
	saveTycoonStorage(config);
	return task;
}

export function updateTasks(config) {
	if (!config.tycoonConfig.tasks) return [];
	var now = Date.now();
	var completed = [];
	var remaining = [];
	for (var i = 0; i < config.tycoonConfig.tasks.length; i++) {
		var task = config.tycoonConfig.tasks[i];
		var elapsed = (now - task.startTime) / 1000;
		task.progress = Math.min(100, (elapsed / task.duration) * 100);
		if (task.progress >= 100) {
			task.progress = 100;
			task.completed = true;
			completed.push(task);
		} else {
			remaining.push(task);
		}
	}
	config.tycoonConfig.tasks = remaining;
	saveTycoonStorage(config);
	return completed;
}

export function getUnitEfficiency(zoneLevel) {
	return zoneLevel || 1;
}

export function getMaterialByName(name) {
	return forgeMaterials.find(function(m) { return m.name === name; });
}

export function getMaxUnitsForZone(zoneId, zoneLevel, tycoonConfig) {
	var maxUnits = tycoonConfig.zoneMaxUnits[zoneId] || 4;
	return Math.min(zoneLevel, maxUnits);
}

export function getUnitIcon(zoneId, unitType, tycoonConfig) {
	var types = tycoonConfig.unitTypes[zoneId] || [];
	var found = types.find(function(t) { return t.type === unitType; });
	return found ? found.icon : '📦';
}

export function getUnitRole(zoneId, unitType, tycoonConfig) {
	var types = tycoonConfig.unitTypes[zoneId] || [];
	var found = types.find(function(t) { return t.type === unitType; });
	return found ? found.role : '员工';
}

export function getUnitById(zoneId, unitId, getZoneUnitsFn) {
	var units = getZoneUnitsFn(zoneId);
	return units.find(function(u) { return u.id === unitId; });
}