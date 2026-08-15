import { Player } from "../../../noname/library/element/player.js";
import { GameEvent } from "../../../noname/library/element/gameEvent.js";


/**
 * lib.element.Player方法扩展
 */
declare interface Players extends Player {
	/**
	 * - 清除指定buff
	 * @param {string|Array|undefined} arg - 要清除的buff参数，可以是字符串、数组或未定义
	 * @returns {Object} 返回当前对象实例
	 */
	xjzh_clearBuff(arg: string | any[] | undefined): Player;
	/**
	 * - 修改玩家的_buff_状态数量
	 * - 此方法用于给玩家增加、减少或设置_buff_状态层数，支持正负数值操作
	 *
	 * @param {...any} args - 参数列表，可以包含以下类型的参数：
	 *   - player: 操作来源玩家对象，指定谁执行了此操作
	 *   - string: buff名称或特殊标识符"naturalLose"
	 *     - 当值为"naturalLose"时，表示自然减少buff
	 *     - 其他字符串作为buff名称
	 *   - number: 要改变的buff层数，正数为增加，负数为减少
	 *   - boolean: 是否不受buff上限限制，默认为false
	 *
	 * @returns {void} 无返回值，通过事件异步执行buff修改操作
	 */
	xjzh_changeBuff(...args: any[]): void;
	/**
	 * 计算玩家身上的buff数量
	 * @param { string | function } filter - 用于过滤buff的条件，可以是字符串或函数
	 * @returns { number } 符合条件的buff总数量
	 */
	xjzh_countBuffNum(filter: string | Function): number;
	/**
	 * - 调用game.xjzh_addRandomSkill方法令当前玩家随机获得指定数量的技能
	 * @param { number } num - 要获得的随机技能数量。若不是数字类型，则只获得一个随机技能。
	 * @param { boolean } [boolean] - 是否过滤非《仙家之魂》武将技能。为 true 时过滤，为 false 时不过滤。默认值为 false。
	 * @param { boolean } [bool] - 是否过滤特殊技能。为 true 时过滤。为 false 时不过滤。默认值为 true。
	 * @returns { Promise<[string[], string[]]> } - 一个 Promise，解析为包含添加的技能列表和可用技能列表的数组。
	 */
	xjzh_addRandomSkill(num: number, boolean?: boolean, bool?: boolean): Promise<[string[], string[]]>;
	/**
	 * - 恢复玩家技能的方法
	 * @param { string | string[] } skill 要恢复的技能名称或技能名称数组
	 * @returns { Player } 返回当前玩家对象，支持链式调用
	 */
	xjzh_restoreSkill(skill: string | string[]): Player;
	/**
	 * - 召唤玩家的方法
	 * @param args - 可变参数，包括名称、抽牌数、血量列表、位置和身份
	 * @returns { GameEvent } 返回创建的事件对象
	 */
	xjzh_zhaohuan(...args: (string | number | string[])[]): GameEvent;
	/**
	 * - 检查玩家的标记数量是否是最大的
	 * @param { string } name - 标记的名称
	 * @param { boolean } equal - 是否包含相等的情况
	 * @returns { boolean } 如果是最大的则返回 true，否则返回 false
	 */
	isMaxMark(name: string, equal: boolean): boolean;
	/**
	 * - 检查玩家的标记数量是否是最小的
	 * @param { string } name - 标记的名称
	 * @param { boolean } equal - 是否包含相等的情况
	 * @returns { boolean } 如果是最小的则返回 true，否则返回 false
	 */
	isMinMark(name: string, equal: boolean): boolean;
	/**
	 * - 为当前对象添加 'huanxing' 类，并更新节点名称的显示内容
	 * @returns { Player } 返回当前玩家对象
	 */
	$huanxing(): Player;
	/**
	 * - 更改玩家的魔力
	 * @param { number } num - 要更改的魔力，正数表示回复，负数表示消耗
	 * @param { boolean } bool - 是否执行魔力变更时机
	 * @returns { GameEvent } 返回创建的事件对象
	 */
	xjzh_changeMp(num: number, bool?: boolean): GameEvent;
	/**
	 * - 更改玩家的魔力上限值
	 * @param { number } num - 要更改的魔力上限值，正数表示增加，负数表示减少
	 * @param { boolean } bool - 是否执行魔力上限变更时机
	 * @returns { GameEvent } 返回创建的事件对象
	 */
	xjzh_changeMaxMp(num: number, bool?: boolean): GameEvent;
	/**
	 * - 执行魔力恢复动画效果
	 * - 若同时有多个动画事件，只会显示一个动画事件，但是多个事件的文本数字会相加显示一个
	 * @param { number } num - 显示的魔力回复数值文本
	 */
	$xjzh_recoverMp(num?: number): void;
	/**
	 * - 显示玩家的魔力，并更新魔力条的显示状态
	 * - 该方法会验证输入参数，确保 MP 容器存在，更新魔力条文本内容
	 * - 并使用动画效果调整魔力条宽度，同时处理魔力条的边框样式和失去魔力部分的显示
	 * @param { number } arg - 当前的魔力，必须为非负数字
	 * @param { number } arg2 - 魔力上限值，必须为正数字
	 */
	xjzh_showMp(arg: number, arg2: number): void;
	/**
	 * - 移除播放器中的 MP 容器。
	 * - 该函数用于彻底移除播放器界面中的 MP 模块容器，包括容器内的所有元素。
	 * - 这是对播放器界面进行动态调整的重要功能，可以用于在不需要 MP 模块时清理界面。
	 */
	xjzh_removeMp(): void;
	/**
	 * - 获取玩家当前的魔力
	 * @returns { number } 玩家当前的魔力，如果未定义则返回 0
	 */
	xjzh_getMp(): number;
	/**
	 * - 获取玩家的魔力上限值
	 * @returns { number } 玩家的魔力上限值，如果未定义则返回 0
	 */
	xjzh_getMaxMp(): number;
	/**
	 * - 检查玩家是否拥有魔力相关属性
	 * - 该方法通过判断玩家对象的 xjzhMaxMp 和 xjzhMp 属性是否为数字类型，
	 * - 来确定玩家是否拥有有效的魔力上限和当前魔力。
	 * @returns {boolean} 如果 xjzhMaxMp 和 xjzhMp 均为数字类型，则返回 true；否则返回 false。
	 */
	xjzh_hasMpNumber(): boolean;
	/**
	 * - 获取玩家的魔法相关数据
	 * - 此函数获取的是玩家的初始数据，并非最终数据
	 * @param {string} [arg] - 可选参数，指定要获取的数据类型，有效值为 "huixin", "maxMp", "mp", "reduce", "healing"
	 * @returns {Array|number} - 如果未提供有效参数，返回角色列表；否则返回指定类型的计算结果
	 */
	xjzh_getMpData(arg?: string): Array<number> | number;
	/**
	 * - 交换当前玩家与目标玩家判定区中的牌
	 * @param { Player } target - 目标玩家对象
	 * @returns { GameEvent } 返回创建的事件对象
	 */
	swapJudgeCards(target: Player): GameEvent;
	/**
	 * - 交换当前玩家与目标玩家的体力上限，可选交换体力值
	 * @param { Player } target - 目标玩家对象，将与当前玩家进行体力值和体力上限的交换
	 * @param { boolean } arg - 一个布尔值，若为 true，则同时交换体力值和体力上限
	 * @param { boolean } arg2 - 一个布尔值，若为 true，不能选择取消交换
	 * @returns { GameEvent } 返回创建的事件对象
	 */
	swapMaxHp(target: Player, arg?: boolean, arg2?: boolean): GameEvent;
	/**
	 * - 判断当前玩家所属势力是否是人数最多的势力之一。
	 * @param {boolean} [isMax=false] - 若为 true，则判断当前玩家所属势力是否是唯一人数最多的势力；若为 false，则判断是否是人数最多的势力之一。
	 * @param {boolean} [all=false] - 若为 false，则使用 game.filterPlayer() 过滤玩家；若为 true，则使用 game.filterPlayer2() 过滤玩家。
	 * @returns {boolean} 根据判断条件返回相应的布尔值，若势力数量小于等于 1，则直接返回 true。
	 */
	isMaxGroup(isMax?: boolean, all?: boolean): boolean;
}

export type players = Players & Player;
