// ==================== 升级配置 ====================

// 核心升级消耗金币表 (level => cost)
export const coreUpgradeCosts = {
	1: 1000,
	2: 5000,
	3: 20000,
	4: 80000,
	5: 300000,
	6: 1000000,
	7: 5000000,
	8: 0 // 最高等级
};

// 区域升级消耗金币表 (level => cost)
export const zoneUpgradeCosts = {
	1: 500,
	2: 2000,
	3: 8000,
	4: 30000,
	5: 100000,
	6: 300000
};

// 各区域升级后的解锁提示文案
export const unlockHints = {
	helipad: '解锁：贸易/劫掠地点升至 Lv.{nextLevel}，单位效率提升',
	logistics: '解锁：更高等级交易和天赋打造选项'
};

// 最高区域等级
export const maxZoneLevel = 6;
export const maxCoreLevel = 8;
