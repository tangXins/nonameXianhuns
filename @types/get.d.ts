import { Get } from "../../../noname.js";
import { Player } from "../../../noname/library/element/player.js";
import { Card } from "../../../noname/library/element/card.js";
import { VCard } from "../../../noname/library/element/vcard.js";

/**
 * 卡牌基础UI数据接口
 */
interface CardBaseUIData {
	name?: string;
	suit?: string;
	number?: number;
	nature?: string;
	type?: string;
	subtype?: string;
	[key: string]: any;
}

/**
 * Get方法扩展
 */
declare interface Gets extends Get {
	/**
	 * 获取玩家所有具有noAddbuff特性的技能过滤列表
	 * @param {Player} player - 要检查的玩家对象
	 * @returns {Array<string>} 包含所有noAddbuff过滤条件的数组，如果没有相关技能则返回空数组
	 */
	xjzh_noAddBuffFilter(player: Player): Array<string>;
	/**
	 * 检查玩家是否具有阻止特定增益效果的技能
	 * @param {Player} player - 要检查的玩家对象
	 * @param {string} buff - 增益效果对象
	 * @returns {Boolean} 如果玩家有阻止该增益效果的技能则返回true，否则返回false
	 */
	xjzh_noAddBuffBool(player: Player, buff: string): boolean;
	/**
	 * 获取buff类型
	 * @param {string} name - buff名称
	 * @returns {string} 返回"deBuff"或"buff"，如果是deBuff返回"deBuff"，否则返回"buff"
	 */
	xjzh_buffType(name: string): string;
	/**
	 * 判断是否为debuff
	 * @param {string} name - buff名称
	 * @returns {boolean} 如果是debuff返回true，否则返回false
	 */
	xjzh_isDebuff(name: string): boolean;
	/**
	 * 获取玩家的buff列表
	 * 遍历所有buff类型，筛选出玩家拥有数量大于0的buff，并根据可选的过滤函数进一步筛选
	 * @param {object} player - 玩家对象
	 * @param {function} [filter] - 可选的过滤函数，接收玩家和buff作为参数，返回布尔值决定是否包含该buff
	 * @returns {string[]} 返回符合条件的buff名称数组
	 */
	xjzh_buffList(player: Player, filter?: (player: Player, buff: any) => boolean): string[];
	/**
	 * 获取玩家指定buff的数量
	 * @param {object} player - 玩家对象
	 * @param {string} name - buff名称
	 * @returns {number} 返回玩家指定buff的数量，如果不存在或小于0则返回0
	 */
	xjzh_buffNum(player: Player, name: string): number;
	/**
	 * 获取指定buff的翻译名称
	 * 通过buff名称从映射表中获取对应的介绍信息，并返回其名称字段
	 * @param {string} name - buff的名称
	 * @returns {string|undefined} 返回buff的翻译名称，如果输入不是字符串或buff不存在则返回undefined
	 */
	xjzh_buffTranslate(name: string): string | undefined;
	/**
	 * 获取指定buff的信息
	 * @param {string} name - buff名称
	 * @param {string|boolean} filter - 过滤条件，指定要获取信息的特定属性，如果为false则返回完整信息对象
	 * @returns {Object|any|null} 根据过滤条件返回buff信息对象或特定属性值，如果buff不存在则返回null
	 */
	xjzh_buffInfo(name: string, filter: string | boolean): object | any | null;
	/**
	 * 处理buff名称，根据参数决定是否添加或移除'xjzh_buff_'前缀
	 * @param {string} name - 原始buff名称
	 * @param {boolean} boolean - 控制是否添加前缀，true或undefined时添加'xjzh_buff_'前缀，false时移除前缀
	 * @returns {string|undefined} 处理后的buff名称，如果输入name不是字符串则返回undefined
	 */
	xjzh_buffName(name: string, boolean: boolean): string | undefined;
	/**
	 * 魔力抵抗计算
	 * @param { Player } player - 玩家对象
	 * @param {number} damage - 受到的原始伤害
	 * @param {number} reductionPercent - 魔力消耗减免百分比 (0-100)
	 * @param {number} costPerDamage - 抵消1点伤害所需的魔力值 (默认为10)
	 * @returns {Object} 包含抵消后伤害和消耗魔力的对象
	 */
	xjzh_magicResistance(player: Player, damage: number, mana: number, reductionPercent: number, costPerDamage: number): object;
	/**
	 * 获取奇术要件的词缀
	 * @param {string} item 奇术要件标识
	 * @param {string} [type=''] 词缀类型，'prefix' 表示前缀，'suffix' 表示后缀，空字符串表示获取所有词缀
	 * @returns { Array } 符合条件的词缀数组
	 */
	xjzh_getEquipAffixes<T>(item: string, type: string): Array<T>;
	/**
	 * 获取玩家的召唤物列表
	 * @param { Player } player 目标玩家对象，用于筛选其召唤物
	 * @returns { Player[] } 返回目标玩家存活的召唤物列表，若没有则返回空数组
	 * @throws { Error } 当传入参数不是 Player 类型时抛出错误
	 */
	xjzh_minion(player: Player): Player[];
	/**
	 * - 获取某个召唤物的召唤师
	 * @param { Player } player 传入需要获取召唤师的召唤物玩家对象
	 * @returns { Player } 返回召唤物的召唤师
	 * @throws { Error } 当传入参数不是 Player 类型时抛出错误
	 */
	xjzh_summoner(player: Player): Player;
	/**
	 * 获取天赋奖励配置值
	 * @param { string } mode - 天赋模式类型
	 * @param { string } reward - 奖励类型
	 * @returns { number } 奖励配置值，如果参数类型不正确或配置不存在则返回0
	 */
	xjzh_talentReward(mode: string, reward: string): number;
	/**
	 * - 获取指定天赋的点数
	 * @param { string } arg - 模式对应的天赋星图
	 * @param { boolean } bool - true返回天赋点最终计算之和，false返回通过其他手段获取的天赋点
	 * @returns { number } 天赋点数，如果参数不是字符串则返回0
	 */
	xjzh_talentNum(arg: string, bool: boolean): number
	/**
	 * - 获取符文的翻译名称
	 * @param { string } arg - 符文的名称
	 * @param { string } type - 符文的类型，如 'ritual' 或 'pray'
	 * @returns { string } - 符文的翻译名称，如果参数缺失则返回空字符串
	 */
	xjzh_runeTranslate(arg: string, type: string): string;
	/**
	 * - 获取符文的详细信息
	 * @param { string } arg - 符文的名称
	 * @param { string } type - 符文的类型，如 'ritual' 或 'pray'
	 * @returns { string } - 符文的详细信息，如果参数缺失或信息不存在则返回空字符串
	 */
	xjzh_runeTranslateInfo(arg: string, type: string): string;
	/**
	 * - 获取符文类型的翻译
	 * @param { string } arg - 符文的名称
	 * @returns { string } - 符文类型的翻译，'仪式符文' 或 '祷告符文'，如果参数缺失则返回空字符串
	 */
	xjzh_runeTypeTranslate(arg: string): string;
	/**
	 * - 获取符文的类型
	 * @param { string } arg - 符文的名称
	 * @returns { string } - 符文的类型，如 'ritual' 或 'pray'，如果参数缺失则返回空字符串
	 */
	xjzh_runeType(arg: string): string;
	/**
	 * - 获取符文列表
	 * @param { string } [type] - 可选参数，符文的类型，如 'ritual' 或 'pray'
	 * @returns { string[] } - 符文列表，如果未提供类型则返回所有符文名称，否则返回指定类型的符文名称
	 */
	xjzh_runeList(type?: string): string[];
	/**
	 * - 获取当前奇术要件已装备的符文列表
	 * @param { string } item - 奇术要件的名称
	 * @returns { string[] | [] } - 已装备的符文列表，如果参数缺失或未装备则返回空数组
	 */
	xjzh_runeQishuList(item: string): string[] | [];
	/**
	 * - 获取已有符文的数量
	 * @param { string } name - 符文的名称
	 * @returns { number } - 已有符文的数量，如果参数缺失或符文不存在则返回 0
	 */
	xjzh_runeListNumber(name: string): number;
	/**
	 * - 获取已有符文的列表
	 * @param { string } type - 符文的类型，如 'ritual' 或 'pray'
	 * @returns { string[] } - 已有符文的列表，如果参数缺失或没有符合条件的符文则返回空数组
	 */
	xjzh_runeListName(type: string): string[];
	/**
	 * - 获取指定奇术要件的详细信息
	 * @param { string } name - 奇术要件的键名
	 * @returns { Object } - 奇术要件的详细信息，如果未找到对应奇术要件则返回空对象
	 */
	xjzh_equipInfo(name: string): object;
	/**
	 * 获取装备了指定奇术要件的角色列表
	 * @param { string } name - 奇术要件的键名
	 * @returns { string[] } - 装备了该奇术要件的角色列表，如果未找到相关信息则返回空数组
	 */
	xjzh_equipPlayer(name: string): string[];
	/**
	 * - 获取指定角色装备的奇术要件列表
	 * @param { string } playerName - 角色的名称
	 * @returns { string[]|null } - 角色装备的奇术要件列表，如果参数为空则返回 null，如果角色未装备奇术要件则返回空数组
	 */
	xjzh_equiped(playerName: string): string[] | null;
	/**
	 * - 获取奇术要件描述的翻译
	 * @param { string } arg - 奇术要件的键名
	 * @returns { string } - 奇术要件的描述翻译，如果参数为空或未找到对应奇术要件则返回空字符串
	 */
	xjzh_qishuTranslateInfo(arg: string): string;
	/**
	 * - 获取奇术要件名称的翻译
	 * @param { string } arg - 奇术要件的键名
	 * @returns { string } - 奇术要件的翻译名称，如果参数为空或未找到对应奇术要件则返回空字符串
	 */
	xjzh_qishuTranslate(arg: string): string;
	/**
	 * - 获取材料的数量
	 * @param { string | undefined } arg - 材料的键名，若未提供则返回所有材料的数量
	 * @returns { number | Object } - 若提供了 arg 参数，返回对应材料的数量；若未提供，返回包含所有材料数量的对象
	 */
	xjzh_cailiaoNum(arg?: string): number | Object;
	/**
	 * - 获取材料的详细描述信息
	 * @param { string } arg - 材料的键名
	 * @returns { string } - 材料的详细描述信息，如果参数为空或未找到对应材料则返回空字符串
	 */
	xjzh_cailiaoTranslateInfo(arg: string): string;
	/**
	 * - 获取材料的翻译名称
	 * @param { string } arg - 材料的键名
	 * @returns { string } - 材料的翻译名称，如果参数为空则返回空字符串
	 */
	xjzh_cailiaoTranslate(arg: string): string;
	/**
	 * 确保配置中指定键对应的值为数字类型。
	 * 若该值不是数字类型，则将其初始化为 0 并保存更新后的配置。
	 * @param {string} key - 配置中需要检查的键名。
	 * @returns {number} 配置中指定键对应的数字值。
	 */
	xjzh_ensureNumberValue(key: string): number;
	/**
	 * - 获取奇术要件系统中的精魄数量。
	 * - 若精魄数量未正确初始化或不是数字类型，会将其初始化为 0 并保存配置。
	 * @returns { number } 当前奇术要件系统中的精魄数量。
	 */
	xjzh_tokens(): number;
	/**
	 * - 获取奇术要件系统中的碎片数量。
	 * - 若碎片数量未正确初始化或不是数字类型，会将其初始化为 0 并保存配置。
	 * @returns { number } 当前奇术要件系统中的碎片数量。
	 */
	xjzh_suipian(): number;
	/**
	 * - 获取奇术要件相关材料列表
	 * @returns { Object } 若存在材料信息，返回包含材料信息的对象
	 */
	xjzh_cailiaoList(): Object;
	/**
	 * - 获取奇术要件背包中的物品列表
	 * @returns { Array<string> } 奇术要件背包中的物品列表，如果背包不存在或为空则返回空数组
	 */
	xjzh_qishuBag(): Array<string>;
	/**
	 * - 获取奇术要件存档用户的等级。
	 * @returns { number | undefined } 奇术要件存档用户的等级。
	 */
	xjzh_qishuUserLevel(): number | undefined;
	/**
	 * - 获取奇术用户的名称。
	 * - 该方法会尝试从奇术配置中获取用户名称，
	 * - 若配置不存在或名称属性缺失，则返回默认名称 "无名玩家"。
	 * @returns { string } 奇术用户的名称，默认为 "无名玩家"。
	 */
	xjzh_qishuUserName(): string;
	/**
	 * 获取奇术用户的经验值。
	 * 该方法调用 game.xjzh_getQishuConfig() 方法获取奇术配置对象，
	 * 并使用可选链操作符获取配置对象中的 exp 属性值。
	 * 若配置对象不存在或 exp 属性不存在，则返回 undefined。
	 * @returns { number | undefined } 奇术用户的经验值，若不存在则返回 undefined。
	 */
	xjzh_qishuUserExp(): number | undefined;
	/**
	 * - 从指定范围中随机获取一定数量的唯一整数
	 * @param { number } [x=1] - 范围的起始值，默认为 1
	 * @param { number } [y=x] - 范围的结束值，默认为起始值 x
	 * @param { number } [z=1] - 需要随机获取的整数数量，默认为 1，且不超过范围大小
	 * @returns { number[] } 包含随机获取的唯一整数的数组
	 */
	xjzh_rands(x: number, y: number, z: number): number[];
	/**
	 * - 从牌堆和弃牌堆中随机获取指定数量的符合条件的卡牌
	 * @param { number } [num=1] - 需要随机获取的卡牌数量，如果传入的值不是数字，则默认为 1
	 * @param { function } name - 用于筛选卡牌的回调函数，该函数会被传递给 `filter` 方法
	 * @param { string } [create] - 可选参数，用于指定排除的牌堆，'discardPile' 表示排除弃牌堆，'cardPile' 表示排除牌堆
	 * @returns {Card[]} - 包含随机获取的卡牌的数组，如果没有符合条件的卡牌，则返回空数组
	 */
	randomCards(num: number, name: Function, create?: string): Card[];
	/**
	 * - 判断玩家是否存在负面效果
	 * - 检查玩家的判定牌、翻面状态、连环状态、禁用数量以及负面增益列表，只要满足其中一个条件就认为存在负面效果
	 * @param { Player } player - 要检查的玩家对象
	 * @returns { boolean } 如果玩家存在负面效果返回 true，否则返回 false
	 */
	xjzh_deEffect(player: Player): boolean;
	/**
	 * - 获取玩家拥有的负面控制效果的种类数量
	 * - 统计玩家的判定牌、翻面状态、连环状态、禁用数量以及负面增益列表的数量总和
	 * @param { Player } player 要检查的玩家对象
	 * @returns { number } 玩家拥有的负面控制效果的种类数量
	 */
	xjzh_deEffect2(player: Player): number;
	/**
	 * - 获取装备的子类型
	 * - 若传入的对象为字符串，则将其转换为对象；若对象有效，则获取其对应的卡牌信息并返回子类型
	 * @param { string | Card | VCard | CardBaseUIData } obj - 可以是装备名称字符串或包含装备信息的对象
	 * @param { Player } player - 玩家对象，用于获取卡牌名称
	 * @returns { string } 装备的子类型
	 */
	subtype2(obj: string | Card | VCard | CardBaseUIData, player?: Player): string;
	/**
	 * - 判断玩家的法力值是否达到最大值
	 * @param { Player } player - 检查的玩家对象
	 * @returns { boolean } - 如果玩家的法力值达到最大值返回 true，否则返回 false；若玩家对象无效则返回 false 并输出错误信息
	 */
	xjzh_isMaxMp(player: Player): boolean;
	/**
	 * - 计算玩家已消耗的法力值
	 * @param { Player } player - 要检查的玩家对象
	 * @returns { number | NaN } - 玩家消耗的法力值，如果玩家对象无效或法力值属性不是数字类型则返回 NaN
	 */
	xjzh_consumeMp(player: Player): number;
	/**
	 * - 判断当前设备浏览器内核及相关信息
	 * - 通过解析 navigator.userAgent 字符串来识别浏览器内核、设备类型及应用程序等信息
	 * @returns { string | null } - 返回识别到的信息对应的键名（小写），若未识别到则返回 null
	 */
	xjzh_kernel(): string | null;
	/**
	 * - 判断传入的字符串是否包含中文字符
	 * - 该函数使用正则表达式来匹配字符串中是否存在位于 Unicode 编码范围 \u4E00 到 \u9FFF 之间的字符，
	 * @param { string } str - 需要进行检查的字符串
	 * @returns { boolean } 如果字符串中包含中文字符，返回 true；否则返回 false
	 */
	xjzh_checkChinese(str: string): boolean;
	/**
	 * - 判断传入的字符串是否全部由中文字符组成
	 * - 该函数使用正则表达式来匹配整个字符串，要求字符串的所有字符都位于 Unicode 编码范围 \u4E00 到 \u9FA5 之间
	 * @param { string } str - 需要进行检查的字符串
	 * @returns { boolean } 如果字符串全部由中文字符组成，返回 true；否则返回 false
	 */
	xjzh_isChinese(str: string): boolean;
	/**
	 * - 判断当前设备类型
	 * - 通过解析 `navigator.userAgent` 和 `navigator.userAgentData` 信息来识别设备类型
	 * @returns { string  |null } - 返回识别到的设备类型（小写），若未识别到则返回 null
	 */
	xjzh_device(): string | null;
	/**
	 * - 过滤可获得的技能
	 * - 检查技能的翻译信息、技能对象属性等，根据条件判断技能是否可获得
	 * @param { string } skill - 要检查的技能名称
	 * @param { function } [func] - 可选的自定义过滤函数
	 * @param { Player } [player] - 可选的玩家对象
	 * @param { Player } [target] - 可选的目标对象
	 * @returns { boolean } - 如果技能可获得返回 true，否则返回 false
	 */
	xjzh_filterGainSkill(skill: string, func: Function, player: Player, target: Player): boolean;
	/**
	 * - 判断超级会员是否过期
	 * - 从配置中获取超级会员的日期信息，调用 `xjzh_checkDate` 函数判断当前日期是否在有效期内
	 * @returns { Array| boolean} 如果超级会员未过期，返回配置信息数组；否则返回 false
	 */
	xjzh_checkSvipDate(): Array<Date> | boolean;
	/**
	 * - 判断当前系统日期是否处于某个时间段内
	 * @param { string } beginDateStr - 开始日期字符串，可被 `Date` 构造函数解析
	 * @param { string } endDateStr - 结束日期字符串，可被 `Date` 构造函数解析
	 * @returns { boolean } 如果当前日期在指定时间段内返回 true，否则返回 false
	 */
	xjzh_checkDate(beginDateStr: string, endDateStr: string): boolean;
	/**
	 * - 判断当前系统时间是否处于某个时间段内
	 * @param { string } beginTime - 开始时间，格式为 "HH:MM"
	 * @param { string } endTime - 结束时间，格式为 "HH:MM"
	 * @returns { boolean } - 如果当前时间在指定时间段内返回 true，否则返回 false
	 */
	xjzh_checkTime(beginTime: string, endTime: string): boolean;
	/**
	 * - 获取两个日期之间的时间差（天）。
	 * - 该函数接收两个日期字符串，计算它们之间相差的天数。
	 * - 如果传入的日期字符串无法被 `Date` 构造函数正确解析，会在控制台输出错误信息并返回 `NaN`
	 * @param { string } startDateStr - 开始日期的字符串，需能被 `Date` 构造函数解析
	 * @param { string } endDateStr - 结束日期的字符串，需能被 `Date` 构造函数解析
	 * @returns { number } - 两个日期之间相差的天数，若解析失败则返回 `NaN`
	 */
	xjzh_daysBetweenDates(startDateStr: string, endDateStr: string): number;
	/**
	 * - 判断指定玩家是否为仙家之魂武将
	 * @param { Player } player - 要判断的玩家对象
	 * @returns {boolean} 如果玩家是仙家之魂武将，则返回true；否则返回false
	 */
	isXHwujiang(player: Player): boolean;
	/**
	 * - 检查玩家是否为召唤物。
	 * @param { Player } player - 要检查的玩家对象，必须是有效的Player实例
	 * @returns { boolean } 如果玩家拥有召唤技能，则返回true；否则返回false
	 * @throws 如果传入的player参数不是有效的Player对象，则抛出错误
	 */
	xjzh_isZhaohuan(player: Player): boolean;
	/**
	 * - 获取玩家的增益技能列表
	 * @param  {Player } player - 要获取增益技能的玩家对象，必须是有效的Player实例
	 * @returns { string[] } 返回一个包含玩家增益技能名称的数组
	 * @throws 如果传入的player参数不是有效的Player对象，则抛出错误
	 */
	xjzh_zengyiSkills(player: Player): string[];
	/**
	 * - 将中文数字字符串转换为阿拉伯数字
	 * @param { string } numStr 中文数字字符串
	 * @returns { number } 转换后的阿拉伯数字
	 */
	chineseToArabic(numStr: string): number;
	/**
	 * - 获取玩家相邻的角色
	 * @param { Player } player - 要获取相邻角色的玩家对象，必须是有效的Player实例
	 * @returns { Player[] } 返回一个包含玩家相邻角色的数组，数组的第一个元素是玩家的下一个角色，第二个元素是玩家的上一个角色
	 * @throws 如果传入的player参数不是有效的Player对象，则抛出错误
	 */
	xjzh_nearbyRole(player: Player): Player[];
	/**
	 * - 生成指定长度的随机中文字符串
	 * @param { number } number - 要生成的随机中文字符串的长度
	 * @returns { string } 返回生成的随机中文字符串
	 */
	xjzh_randomChineseString(number: number): string;
	/**
	 * 生成指定长度的随机字符串
	 * @param { number } length - 要生成的随机字符串的长度。
	 * @returns { string } 返回生成的随机字符串。
	 */
	xjzh_randomEnglishString(length: number): string;
	/**
	 * - 计算给定代码字符串的哈希值
	 * @param { string } code - 要计算哈希值的代码字符串
	 * @returns { number } 返回计算得到的哈希值
	 */
	xjzh_calculateHash(code: string): number;
	/**
	 * - 根据传入的参数翻译信息并返回相应结果
	 * @param { ...(string | boolean) } args - 可变参数，可能包含一个字符串和一个布尔值。
	 * - 字符串参数代表需要处理的文本信息，布尔值参数用于控制返回结果的类型。
	 * @returns { string } 返回处理后的字符串，可能是原始字符串、介绍信息对应的键名或介绍信息内容。
	 * @throws 如果没有传入任何参数，抛出错误提示参数不能为空。
	 */
	xjzh_translateInfo(...args: (string | boolean)[]): string;
}

export type gets = Gets & Get;
