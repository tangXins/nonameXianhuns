// ==================== 天赋打造配置 ====================

export const forgeMaterials = [
	{ id: 'yinyuecao', name: '银月草', level: 1, rarity: '普通', icon: '🌿', desc: '最基础的制作材料，常见于绿洲草原', useFor: ['破甲×10', '铁壁×10', '迅捷×5', '生命强化×5', '花准×5'], obtainFrom: ['贸易舰队 Lv.2+', '商贸区 💰50'] },
	{ id: 'xingchensha', name: '星辰砂', level: 2, rarity: '普通', icon: '✨', desc: '蕴含星辰之力的细砂，闪烁微光', useFor: ['迅捷×5', '生命强化×5', '高寿×5', '贴身×3'], obtainFrom: ['贸易舰队 Lv.3+', '商贸区 💰200'] },
	{ id: 'youlanhua', name: '幽兰花', level: 3, rarity: '优秀', icon: '🌸', desc: '生长在幽谷深处的神秘花朵', useFor: ['暴击×3', '抗性×3', '观星×1', '集智×1', '协奏×2', '辩机×3'], obtainFrom: ['贸易舰队 Lv.4+', '商贸区 💰800'] },
	{ id: 'fengxieshi', name: '凤血石', level: 4, rarity: '优秀', icon: '💎', desc: '传说中凤凰涅槃遗落的血石', useFor: ['观星×1', '集智×1', '穿透×1', '连击×1', '破军×1', '贪狼×1'], obtainFrom: ['贸易舰队 Lv.5+', '商贸区 💰2500'] },
	{ id: 'longxianguo', name: '龙涎果', level: 5, rarity: '稀有', icon: '🐉', desc: '龙族涎水凝结而成的奇果', useFor: ['穿透×1', '连击×1', '制衡×1', '协奏×1', '七杀×1', '青龙×1', '朱雀×1'], obtainFrom: ['贸易舰队 Lv.6+', '商贸区 💰8000'] },
	{ id: 'niepanhuo', name: '涅槃火', level: 6, rarity: '史诗', icon: '🔥', desc: '凤凰涅槃时燃起的不灭之火', useFor: ['护盾×1', '吸血×1', '攻心×1', '聚财×1', '玄武×1', '白虎×1', '紫微×1'], obtainFrom: ['贸易舰队 Lv.7+', '商贸区 💰25000'] },
	{ id: 'taiguyu', name: '太古玉', level: 7, rarity: '神话', icon: '🟡', desc: '远古时代流传下来的神秘玉石', useFor: ['复活×1', '反伤×1', '天命×1', '太阴×1', '太阳×1', '天机×1'], obtainFrom: ['贸易舰队 Lv.8+', '商贸区 💰80000'] },
	{ id: 'tianmingshi', name: '天命石', level: 8, rarity: '传说', icon: '⚫', desc: '蕴含命运之力的至高神石', useFor: ['万物归心×1', '洞察×1', '文曲×1', '武曲×1', '廉贞×1', '天府×1', '天权×1'], obtainFrom: ['商贸区 💰250000'] }
];

// ==================== 天赋配方配置 ====================
export const forgeRecipes = [
	// ---- 普通品质 ----
	{ id: 'attackUp', name: '破甲', desc: '造成伤害时有30%概率无视1点护甲', cost: { yinyuecao: 5, xingchensha: 3, youlanhua: 1 } },
	{ id: 'defenseUp', name: '铁壁', desc: '受到伤害时有25%概率减免1点伤害', cost: { yinyuecao: 5, xingchensha: 3, youlanhua: 1 } },
	{ id: 'speedUp', name: '迅捷', desc: '摸牌阶段额外摸1张牌', cost: { xingchensha: 5, youlanhua: 2, fengxieshi: 1 } },
	{ id: 'hpUp', name: '生命强化', desc: '体力上限+5，体力+5', cost: { yinyuecao: 4, xingchensha: 4, youlanhua: 1 } },
	{ id: 'huazhun', name: '花准', desc: '摸牌阶段额外摸1张牌', cost: { yinyuecao: 3, xingchensha: 3, youlanhua: 2 } },
	{ id: 'gaoshou', name: '高寿', desc: '每3回合额外摸1张牌', cost: { xingchensha: 4, youlanhua: 2, fengxieshi: 2 } },
	{ id: 'tieshen', name: '贴身', desc: '每3回合体力上限+1', cost: { xingchensha: 3, youlanhua: 3, fengxieshi: 2 } },

	// ---- 优秀品质 ----
	{ id: 'criticalUp', name: '暴击', desc: '造成伤害时有20%概率造成双倍伤害', cost: { youlanhua: 3, fengxieshi: 2, longxianguo: 1 } },
	{ id: 'resistanceUp', name: '抗性', desc: '负面状态持续时间减少1回合', cost: { youlanhua: 2, fengxieshi: 3, longxianguo: 1 } },
	{ id: 'guanxing', name: '观星', desc: '准备阶段观看牌堆顶1张牌', cost: { youlanhua: 2, fengxieshi: 2, longxianguo: 2 } },
	{ id: 'jizhi', name: '集智', desc: '弃牌阶段结束时观看牌堆顶1张牌并选择获得', cost: { youlanhua: 2, fengxieshi: 2, longxianguo: 2 } },
	{ id: 'xiezhou', name: '协奏', desc: '使用普通杀后可以摸一张牌', cost: { youlanhua: 3, fengxieshi: 1, longxianguo: 2 } },
	{ id: 'bianji', name: '辩机', desc: '准备阶段弃置1张牌然后摸1张牌', cost: { youlanhua: 2, fengxieshi: 2, longxianguo: 2 } },
	{ id: 'fangbian', name: '防变', desc: '下次受伤减免1点伤害', cost: { youlanhua: 3, fengxieshi: 2, longxianguo: 1 } },
	{ id: 'chonghuan', name: '重欢', desc: '弃牌后观看牌堆顶，若是杀则获得', cost: { youlanhua: 2, fengxieshi: 3, longxianguo: 1 } },

	// ---- 稀有品质 ----
	{ id: 'piercing', name: '穿透', desc: '伤害可穿透防具直接作用于目标', cost: { fengxieshi: 3, longxianguo: 2, niepanhuo: 1 } },
	{ id: 'doubleStrike', name: '连击', desc: '造成伤害后有30%概率可再次造成1点伤害', cost: { fengxieshi: 2, longxianguo: 3, niepanhuo: 1 } },
	{ id: 'zhengheng', name: '制衡', desc: '出牌阶段限一次，令一名角色恢复1点体力', cost: { fengxieshi: 2, longxianguo: 2, niepanhuo: 2 } },
	{ id: 'jianru', name: '渐入', desc: '每3回合造成伤害+1', cost: { fengxieshi: 3, longxianguo: 1, niepanhuo: 2 } },
	{ id: 'yonggan', name: '勇敢', desc: '体力低于一半时造成伤害+1', cost: { fengxieshi: 2, longxianguo: 2, niepanhuo: 2 } },
	{ id: 'jingxi', name: '精细', desc: '手牌≥2时造成伤害+1', cost: { fengxieshi: 2, longxianguo: 2, niepanhuo: 2 } },
	{ id: 'qisha', name: '七杀', desc: '造成伤害后有25%概率令目标弃2张牌', cost: { fengxieshi: 3, longxianguo: 2, niepanhuo: 1 } },
	{ id: 'pojun', name: '破军', desc: '造成伤害后若目标体力>1，令其再受1点伤害', cost: { fengxieshi: 2, longxianguo: 3, niepanhuo: 1 } },
	{ id: 'tanlang', name: '贪狼', desc: '造成伤害后有30%概率获得伤害源的一张手牌', cost: { fengxieshi: 2, longxianguo: 2, niepanhuo: 2 } },

	// ---- 史诗品质 ----
	{ id: 'shield', name: '护盾', desc: '每回合开始获得可抵挡2点伤害的护盾', cost: { longxianguo: 2, niepanhuo: 3, taiguyu: 1 } },
	{ id: 'lifeSteal', name: '吸血', desc: '造成伤害后恢复等量体力', cost: { longxianguo: 3, niepanhuo: 2, taiguyu: 1 } },
	{ id: 'gongxin', name: '攻心', desc: '出牌阶段可获得其他角色一张手牌', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },
	{ id: 'jucai', name: '聚财', desc: '每回合开始时额外摸1张牌', cost: { longxianguo: 1, niepanhuo: 3, taiguyu: 2 } },
	{ id: 'zhuli', name: '助力', desc: '准备阶段可令一名角色摸1张牌', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },
	{ id: 'renhe', name: '任何', desc: '回合开始时令一名敌人受1伤害并回复1体力', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },
	{ id: 'weibuzu', name: '微不足道', desc: '体力为1时受伤改为回复1体力', cost: { longxianguo: 1, niepanhuo: 3, taiguyu: 2 } },
	{ id: 'huifu', name: '恢复', desc: '受伤后免疫下1次伤害', cost: { longxianguo: 1, niepanhuo: 2, taiguyu: 3 } },
	{ id: 'qinglong', name: '青龙', desc: '每回合开始时令一名敌方摸1张牌', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },
	{ id: 'zhuque', name: '朱雀', desc: '每回合开始时令一名敌方失去1点体力', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },
	{ id: 'xuanwu', name: '玄武', desc: '受到的伤害恒定-1', cost: { longxianguo: 3, niepanhuo: 2, taiguyu: 1 } },
	{ id: 'baihu', name: '白虎', desc: '每回合开始时选择摸2张或回复2点体力', cost: { longxianguo: 2, niepanhuo: 2, taiguyu: 2 } },

	// ---- 神话品质 ----
	{ id: 'revive', name: '复活', desc: '死亡时有一次复活机会，恢复50%体力', cost: { niepanhuo: 3, taiguyu: 2, tianmingshi: 1 } },
	{ id: 'damageReflect', name: '反伤', desc: '受到伤害时反弹50%伤害给攻击者', cost: { niepanhuo: 2, taiguyu: 3, tianmingshi: 1 } },
	{ id: 'tianming', name: '天命', desc: '每回合开始时选择摸2张牌或恢复2点体力', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'ziwei', name: '紫微', desc: '每回合开始时摸1张牌并恢复1点体力', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'taiyin', name: '太阴', desc: '回合结束时摸1张牌', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'taiyang', name: '太阳', desc: '每回合开始时摸1张牌', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'tianmiAlt', name: '天机', desc: '每回合开始时观看牌堆顶2张并选择获得1张', cost: { niepanhuo: 1, taiguyu: 3, tianmingshi: 2 } },
	{ id: 'huihuang', name: '辉煌', desc: '势力获得胜利时额外摸2张牌', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'diwang', name: '帝王', desc: '装备防具时体力上限+1', cost: { niepanhuo: 3, taiguyu: 2, tianmingshi: 1 } },
	{ id: 'xiwang', name: '希望', desc: '手牌为0时回合开始额外摸2张牌', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 2 } },

	// ---- 传说品质 ----
	{ id: 'wanwuguixin', name: '万物归心', desc: '每回合开始时摸2张牌并回复1点体力', cost: { niepanhuo: 1, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'dongcha', name: '洞察', desc: '可以观看其他角色的全部手牌', cost: { niepanhuo: 1, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'wenqu', name: '文曲', desc: '每回合可额外使用1张普通杀', cost: { niepanhuo: 2, taiguyu: 1, tianmingshi: 2 } },
	{ id: 'wuqu', name: '武曲', desc: '使用的普通杀不可被无懈可击响应', cost: { niepanhuo: 1, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'lianzhen', name: '廉贞', desc: '受到的伤害-1', cost: { niepanhuo: 2, taiguyu: 2, tianmingshi: 1 } },
	{ id: 'tianfu', name: '天府', desc: '每回合开始时获得1张普通杀', cost: { niepanhuo: 1, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'tianquan', name: '天权', desc: '每回合开始时令一名敌人弃1张牌', cost: { niepanhuo: 1, taiguyu: 2, tianmingshi: 2 } },
	{ id: 'shengli', name: '胜利', desc: '获得胜利后额外获得1张牌', cost: { niepanhuo: 2, taiguyu: 1, tianmingshi: 2 } }
];



export const qualityColors = {
	'普通': '#9E9E9E', '优秀': '#4CAF50', '稀有': '#2196F3',
	'史诗': '#9C27B0', '神话': '#FF9800', '传说': '#FFD700'
};

export const materialNames = {
	gold: '绿洲金币',
	shards: '碎片',
	essence: '精魄',
	yinyuecao: '银月草', xingchensha: '星辰砂', youlanhua: '幽兰花',
	fengxieshi: '凤血石', longxianguo: '龙涎果', niepanhuo: '涅槃火',
	taiguyu: '太古玉', tianmingshi: '天命石'
};

export function getQualityByLevel(level) {
	if (level <= 2) return '普通';
	if (level <= 4) return '优秀';
	if (level <= 5) return '稀有';
	if (level <= 6) return '史诗';
	if (level <= 7) return '神话';
	return '传说';
}

// ==================== 区域列表配置 ====================

export const zones = [
	{ id: 'helipad', name: '贸易舰队', icon: '🚢', desc: '自动贸易获取资源', color: '#00BCD4' },
	{ id: 'trade', name: '商贸区', icon: '🏪', desc: '金币交易制作材料', color: '#4CAF50' },
	{ id: 'forge', name: '锻造台', icon: '⚒️', desc: '天赋打造与强化', color: '#9C27B0' }
];

export const zoneMaxUnits = {
	helipad: 4,
	trade: 1,
	forge: 1
};

export const unitTypes = {
	helipad: [
		{ type: 'fleet', name: '贸易舰队', icon: '🚢', role: '舰队' }
	],
	trade: [
		{ type: 'merchant', name: '商人', icon: '🏪', role: '商人' }
	],
	forge: [
		{ type: 'smith', name: '锻造师', icon: '⚒️', role: '工匠' }
	]
};