import { Game } from "../../../noname.js";
import { Player } from "../../../noname/library/element/player.js";

/**
 * Game方法扩展
 */
declare interface Games extends Game {
    /**
     * 判断两个数组之间的包含关系，支持交集判定与集合相等判定两种模式
     * @param {Array} arr - 主数组
     * @param  {...(Array|boolean)} args - 可变参数：可传入一个目标数组和一个布尔值
     * @param {Array}   [args[array]]   - 目标比较数组
     * @param {boolean} [args[boolean]] - 严格模式开关，默认 false
     * @returns {boolean}
     *   - 非严格模式（默认 false）：arr 中任一元素存在于 list 中则返回 true（交集非空）
     *   - 严格模式（true）：arr 与 list 作为集合完全相等则返回 true（与顺序/重复无关）
     * @throws {Error} 当传入的参数不是数组或布尔值时抛出异常
     * @example
     *   xjzh_includesArrays([1,2,3], [3,4,5])        // true，元素 3 为交集
     *   xjzh_includesArrays([1,2,3], [4,5,6])        // false，无交集
     *   xjzh_includesArrays([1,2,3], [3,2,1], true)  // true，集合完全相等
     *   xjzh_includesArrays([1,1,2], [1,2], true)     // true，去重后相等
     */
	xjzh_includesArrays(arr: any[], ...args: any[]): boolean;
	/**
	 * 打开或复用加载对话框
	 * @param {string} str - 要显示在加载对话框中的文本内容
	 * @returns {Object} dialog - 返回加载对话框对象，包含 close 方法用于关闭对话框
	 */
	xjzh_openLoading(str: string): { close: () => void };
	/**
 * 魔法抗性伤害减免处理
 * 根据玩家的魔法抗性抵消伤害，并消耗相应的魔力值
 * @param {gameEvent} event - 事件对象
 * @param {gameEvent} trigger - 触发器对象，包含伤害数值等信息
 * @param {Player} player - 玩家对象，具有魔法抗性和魔力值的角色
 */
	xjzh_magicResistance(event: any, trigger: any, player: any): void;
	/**
	 * 创建输入对话框并获取用户输入值
	 * @param {Object} event - 游戏事件对象
	 * @param {Object} trigger - 触发事件的 trigger 对象
	 * @param {Object} player - 玩家对象
	 * @returns {Promise<string|null>} 用户输入的字符串，如果验证失败则返回 null
	 */
	xjzh_showInputBox(event: any, trigger: any, player: any): Promise<string | null>;
	/**
	   * 随机偷取目标玩家的属性
	   * 从目标玩家身上随机偷取一项属性（生命值、最大生命值、抽牌数、手牌上限、技能、魔法值、最大魔法值等）
	   * @param { Player } player - 执行偷取操作的玩家对象
	   * @param { Player } target - 被偷取的目标玩家对象
	   * @returns {void}
	   */
	xjzh_stealAttributes(player: Player, target: Player): void;
	/**
	 * 一个css样式管理器
	 */
	xjzh_cssManager: {
		/**
		 * 已加载的样式元素
		 */
		loadedStyles: string[],

		/**
		 * 当前页面的样式元素
		 */
		currentPageCSS: string[],

		/**
		 * 加载页面所需的CSS文件
		 * @param {string[]} cssFiles - 需要加载的CSS文件名数组
		 */
		load(cssFiles: string[]): void;

		/**
		 * 卸载指定的CSS文件
		 * @param {string[]} cssFiles - 需要卸载的CSS文件名数组
		 * @param {boolean} forceUnload - 是否强制卸载，即使其他页面还在使用
		 */
		unload(cssFiles: string[], forceUnload?: boolean): void;
		/**
		 * 检查CSS是否被其他页面使用
		 * @param {string} cssName - CSS文件名
		 * @returns {boolean} 如果CSS被其他页面使用则返回true，否则返回false
		 */
		isCSSUsedElsewhere(cssName: string): boolean;
		/**
		 * 卸载所有已加载的CSS文件
		 */
		unloadAll(): void;
	};
	/**
	 * 重置指定模式下的天赋效果
	 * @param { string } mode - 游戏模式
	 */
	xjzh_resetTalentEffect(mode: string): void;
	/**
	 * 为指定模式添加天赋效果值
	 * @param { string } mode - 游戏模式标识
	 * @param { string } effectType - 效果类型标识
	 * @param { number } value - 要添加的效果值
	 * @returns { void }
	 */
	xjzh_addTalentEffect(mode: string, effectType: string, value: number): void;
	/**
	 * 增加天赋点数
	 * @param { string } arg - 对应模式的天赋星图
	 * @param { number } num - 要增加的天赋点数
	 * @returns { number } 返回通过其他手段增加后的天赋点数
	 */
	xjzh_gainTalentNum(arg: string, num: number): number;
	/**
	 * - 检查某个奇术要件是否装备了相同组合的符文或禁止组合的符文
	 * @param { string } equipItem - 奇术要件的名称
	 * @param { string } arg - 要检查的符文名称
	 * @returns { boolean | string | undefined } - 若装备了相同组合返回 true，若为禁止组合返回 "banned"，否则返回 false，参数无效时返回 undefined
	 */
	xjzh_hasAllEquipRunes(equipItem: string, arg: string): boolean | string | undefined;
	/**
	 * - 检查指定的奇术要件是否装备了某一类型的符文
	 * @param { string } equipItem - 奇术要件的名称
	 * @param { string } type - 符文的类型
	 * @returns { boolean | undefined } - 若装备了返回 true，未装备返回 false，参数无效时返回 undefined
	 */
	xjzh_hasEquipRunes(equipItem: string, type: string): boolean | undefined;
	/**
	 * - 检查指定的奇术要件是否装备了指定符文或该类型的符文
	 * @param { string } equipItem - 奇术要件的名称
	 * @param { string } rune - 符文的名称
	 * @param { boolean } [bool=false] - 是否检查符文类型，默认为 false
	 * @returns { boolean | undefined } - 若装备了返回 true，未装备返回 false，参数无效时返回 undefined
	 */
	xjzh_hasEquipRune(equipItem: string, rune: string, bool?: boolean): boolean | undefined;
	/**
	 * - 从指定的奇术要件上卸下符文
	 * @param { string } equipItem - 奇术要件的名称
	 * @param { string } rune - 符文的名称
	 */
	xjzh_unEquipRune(equipItem: string, rune: string): boolean;
	/**
	 * - 为指定的奇术要件装备符文
	 * @param { string } equipItem - 奇术要件的名称
	 * @param { string } rune - 符文的名称
	 * @returns { boolean } - 若装备成功返回 true，若不满足条件则返回 false
	 */
	xjzh_equipRune(equipItem: string, rune: string): boolean;
	/**
	 * - 从玩家处移除指定数量的符文
	 * @param { string } name - 符文的名称
	 * @param { number } [num=1] - 要移除的符文数量，默认为 1
	 */
	xjzh_loseRune(name: string, num?: number): void;
	/**
	 * - 为玩家增加指定数量的符文
	 * @param { string } name - 符文的名称
	 * @param { number } num - 要增加的符文数量
	 * @returns { string | undefined } - 若操作成功返回符文名称，若参数无效或不允许操作则返回 undefined
	 */
	xjzh_gainRune(name: string, num: number): string | undefined;
	/**
	 * - 创建一个包装函数，用于在执行原始函数前进行前置检查
	 * @param { Function } originalFunction - 原始函数，在满足前置条件后会被执行
	 * @returns { Function } - 返回一个包装后的函数，该函数会先进行前置检查，再决定是否执行原始函数
	 */
	xjzh_withPreCheck(originalFunction: Function): Function;
	/**
	 * - 显示奖励结算弹窗
	 * @param { string } str - 弹窗标题
	 * @param { string } str2 - 弹窗内容
	 */
	xjzh_qishuWinner(str: string, str2: string): void;
	/**
	 * - 处理游戏结束后的奖励结算逻辑
	 * @param { boolean } ret - 游戏结束返回值
	 */
	xjzh_originalFunction(ret?: boolean): void;
	/**
	 * 为玩家的背包添加指定数量的奇术要件
	 * @param { string } name - 奇术要件的名称
	 * @param { number } [num=1] - 要获得的奇术要件数量，默认为 1
	 * @returns { string | boolean } - 若操作成功返回奇术要件名称，若不允许操作返回 false
	 */
	xjzh_gainEquip(name: string, num?: number): string | boolean;
	/**
	 * - 从玩家的背包中移除指定的奇术要件
	 * @param { string } name - 奇术要件的名称
	 */
	xjzh_loseEquip(name: string): void;
	/**
	 * - 从玩家的打造背包中移除指定的已打造奇术要件
	 * @param { string } uid - 已打造奇术要件的唯一标识符
	 * @returns { boolean } - 若成功移除返回 true，未找到返回 false
	 */
	xjzh_loseCraftedEquip(uid: string): boolean;
	/**
	 * - 检查指定角色是否装备了指定的奇术要件
	 * @param { string } name - 奇术要件的名称
	 * @param { string } playerName - 角色的名称
	 * @returns { boolean | undefined } - 若装备了返回 true，未装备返回 false，参数无效时返回 undefined
	 */
	xjzh_hasEquiped(name: string, playerName: string): boolean | undefined;
	/**
	 * 为指定角色装备奇术要件。
	 * @param {string} name - 奇术要件名称。
	 * @param {string} playerName - 角色名称。
	 * @param {boolean} [nopop=false] - 是否不显示提示信息，默认为 false。
	 * @param {boolean} [hutong=false] - 是否为互通操作，默认为 false。
	 */
	xjzh_useEquip(name: string, playerName: string, nopop?: boolean, hutong?: boolean): void;
	/**
	 * 为指定角色卸下奇术要件。
	 * @param {string} name - 奇术要件名称。
	 * @param {string} [playerName] - 角色名称，可选参数。
	 * @param {boolean} [nopop=false] - 是否不显示提示信息，默认为 false。
	 * @param {boolean} [hutong=false] - 是否为互通操作，默认为 false。
	 */
	xjzh_unEquip(name: string, playerName: string, nopop?: boolean, hutong?: boolean): void;
	/**
	 * - 改变材料的数量
	 * @param { string } arg - 材料的键名，若未提供则终止
	 * @param { number | undefined } num - 要改变的数量，若未提供则默认为 1
	 * @returns { number | boolean } - 若操作成功，返回改变后材料的数量；若不允许操作，返回 false

	 */
	xjzh_changeCailiao(arg: string | undefined, num?: number): number | boolean;
	/**
	 * - 重置所有材料的数量
	 * @returns { Object } - 重置后的材料配置对象
	 */
	xjzh_resetCailiao(): Object;
	/**
	 * - 检测是否能装备指定的奇术要件
	 * @param { string } name - 奇术要件的键名
	 * @param { string } playerName - 角色的名称
	 * @returns { boolean | string } - 若能装备返回 true；若不能装备，返回具体的错误信息；若参数无效，返回 false
	 */
	xjzh_canEquip(name: string, playerName: string): boolean | string;
	/**
	 * - 改变碎片的数量
	 * @param { number | undefined } num - 要改变的碎片数量，若未提供则默认为 1
	 * @returns { number | boolean } - 若操作成功，返回改变后碎片的数量；若不允许操作，返回 false
	 */
	xjzh_changeSuipian(num?: number): number | boolean;
	/**
	 * - 改变精魄的数量
	 * @param { number | undefined } num - 要改变的精魄数量，若未提供则默认为 1
	 * @returns { number | boolean } - 若操作成功，返回改变后精魄的数量；若不允许操作，返回 false
	 */
	xjzh_changeTokens(num?: number): number | boolean;
	/**
	 * - 是否允许操作奇术要件相关数据
	 * @returns { boolean } 如果允许添加操作返回 true，否则返回 false
	 */
	xjzh_canAddqishu(): boolean;
	/**
	 * - 储存已使用的兑换码
	 * @param { string } keys - 要储存的兑换码
	 * @returns { Array|null } - 若操作成功，返回包含所有已使用兑换码的数组；若参数不符合要求，返回 null
	 */
	xjzh_saveKeys(keys: string): Array<string> | null;
	/**
	 * - 判断兑换码是否已经被使用
	 * @param { string } keys - 要检查的兑换码
	 * @returns { boolean | null } - 若兑换码已被使用返回 true，未被使用返回 false；若参数不符合要求，返回 null
	 */
	xjzh_hasKeys(keys: string): boolean | null;
	/**
	 * - 定义一组初始的材料信息用以初始化材料。
	 * @returns { Object } 包含基础奇术材料配置信息的对象。
	 */
	xjzh_getBaseCailiao(): Object;
	/**
	 * - 保存奇术要件配置数据，并生成存档备份文件。
	 * @param { Object } [saveData] - 可选的保存数据对象。
	 */
	xjzh_saveQishuConfig(saveData?: Object): Promise<void>;
	/**
   * 过滤添加奇术要件和符文的条件检查函数
   * @returns {boolean} 是否满足条件
   */
	xjzh_filterAddqishu(): boolean;
	/**
	 * 获取奇术要件的配置信息。
	   * @returns { Object } 返回从游戏扩展配置中获取的奇术要件配置对象。
	  */
	xjzh_getQishuConfig(): Object;
	/**
	 * - 重置奇术要件存档
	 * - 此方法会将奇术要件配置重置为初始状态，并使用当前玩家联机昵称创建新存档
	 */
	xjzh_resetQishu(): void;
	/**
 * 显示升级提示效果
 * 创建包含遮罩、闪屏、粒子、文字卡片、流光动画、水波纹等特效的升级提示界面
 *
 * @param {string} name - 角色或实体名称
 * @param {string} str - 升级描述文字（如"晋升为"、"升级到"等）
 * @param {string|number} level - 等级信息，可为数字或字符串；若为数字则自动添加"Lv."前缀
 *
 * @returns {Promise<void>} 无返回值
 */
	showLevelUpMessage(name: string, str: string, level: string | number): Promise<void>;
	/**
	 * 处理角色奇术等级升级逻辑
	 * @param {string|number} arg - 升级参数，可为 "min"、"max" 或数字类型。
	 *                            "min" 表示将等级重置为 1 级且经验为 0；
	 *                            "max" 表示将等级提升到 100 级且经验为 0；
	 *                            数字类型表示增加的经验值。
	 * @returns {boolean|Array<number>} - 若不满足添加奇术条件返回 false；
	 *                                  否则返回包含升级后等级和经验值的数组。
	 */
	xjzh_levelUp(arg: string | number): boolean | Array<number>;
	/**
	 * 为玩家添加随机技能。
	 * @param {number} num - 要添加的随机技能数量。若不是数字，默认添加 1 个技能。
	 * @param {boolean} [boolean=false] - 若为 true，仅筛选以 "xjzh_" 开头的技能。
	 * @param {boolean} [bool=true] - 若为 true，排除特定类型的技能；若为 false，则不排除。
	 * @param {Object} [player] - 要添加技能的玩家对象。若未提供，则仅返回技能列表。
	 * @returns {Array} - 包含两个元素的数组，第一个元素是为玩家添加的技能数组，第二个元素是所有符合条件的技能列表。
	 */
	xjzh_addRandomSkill(num: number, boolean?: boolean, bool?: boolean, player?: Player): Array<string[]>;
	/**
	 * 综合多个信号判断浏览器控制台是否处于打开状态（多信号同时命中才算数，降低误伤）。
	 * @returns { boolean } 命中信号数 >= 2 时返回 true，否则返回 false。
	 */
	xjzh_isConsoleOpen(): boolean;
	/**
	 * 统计控制台开启的可疑信号数量。
	 * - 信号1：窗口内外尺寸差；信号2：debugger计时（默认关闭，需扩展配置开启）；信号3：getter陷阱。
	 * @returns { number } 命中的信号数量。
	 */
	xjzh_detectConsoleSignals(): number;
	/**
	 * - 检查作弊计数状态。
	 * @returns { Object } 作弊状态对象，格式为 { bool: boolean, count: number, suspicion: number }。
	 *   suspicion 为控制台可疑累计次数，达到阈值时 bool 置为 true；count 为主动作弊(GM面板)计数。
	 */
	xjzh_checkCheatCount(): { bool: boolean, count: number, suspicion: number };
	/**
	   * 检查游戏运行过程中是否存在作弊情况。
	   * @returns { boolean } 如果判定为作弊返回 true，否则返回 false。
	  */
	xjzh_checkRunCheat(): boolean;
	/**
	 * - 检查指定目录是否存在且包含特定文件或任意文件。
	 * @param { string } sdir - 要检查的目录名，实际处理时会添加 'extension/' 前缀。
	 * @param { string } name - 文件名，控制检查逻辑的标志。填写后检查是否包含name文件；不填写递归检查目录及其子目录是否包含任意文件。
	 * @param { function } callback - 回调函数，根据检查结果传入不同状态码（1 表示成功，-1 表示失败，0 表示路径为文件）。
	 * @param { boolean } extension - 扩展标志，为 true 时表示检查扩展目录，为 false 时表示检查普通目录。默认值为 true。
	 * @returns { number } - 返回检查结果的状态码：1 表示满足条件，-1 表示不满足条件或出错，0 表示路径为文件。
	 */
	xjzh_hasExtensionFiles(sdir: string, name: boolean, callback: Function, extension?: boolean): number;
	/**
	 * - 显示玩家的魔力相关信息并更新玩家属性
	 * @async
	 * @param { Player } player - 玩家对象
	 * @param { boolean } bool - 布尔值，若为 true 则在更新最大魔力和当前魔力后直接返回
	 * @returns { void }
	 */
	xjzh_showMp(player: Player, bool: boolean): void;
	/**
	 * - 复制文件
	 * @param { string } sdir 源文件夹路径
	 * @param { string } fn   文件名
	 * @param { string } ddir 目标文件夹路径
	 * @param { Function } callback 回调函数
	 * @returns { void }
	 */
	xjzh_copyToFiles(sdir: string, fn: string, ddir: string, callback: Function): void;
	/**
	 * - 异步播放技能音效，使用浏览器的语音合成功能朗读指定文本
	 * @async
	 * @param {...(string | Object)} args - 可变参数，可包含语言设置、要朗读的文本以及语音参数对象
	 * - 若为字符串，可能是格式为 "lang:语言代码" 的语言设置，或者是要朗读的文本
	 * - 若为对象，可包含 volume（音量）、rate（语速）、pitch（音高）属性
	 */
	xjzh_playSkillAudio(...args: (string | Object)[]): Promise<void>;
	/**
	 * - 设置《仙家之魂》扩展的背景图片
	 * - 根据扩展配置选择背景图片，支持自动随机切换背景图片的功能
	 * - 代码借鉴自《金庸群侠传》
	 * @returns { void }
	 */
	xjzh_playBackgroundPicture(): void;
	/**
	 * - 播放《仙家之魂》扩展的背景音乐
	 * - 该函数会根据扩展配置获取背景音乐的设置，然后根据设置播放对应的音乐
	 * - 如果配置为随机播放，则会从指定的音乐列表中随机选择一首播放
	 * - 如果配置的音乐不存在，则调用默认的背景音乐播放函数
	 * - 代码借鉴自《金庸群侠传》
	 * @returns  {void }
	 */
	xjzh_playBackgroundMusic(): void;
	/**
	 * - 显示帧率（FPS）的函数
	 * - 该函数用于在页面上显示当前的帧率，可根据配置设置显示位置
	 * - 代码借鉴自《扩展ol》
	 * @param { string } id - 用于显示帧率的元素的 ID。如果该元素不存在，则会创建一个新的 div 元素
	 * @returns { void }
	 */
	xjzh_showFps(id: string): void;
	/**
	 * - 启动/重设玩家技能的冷却（内部共用），以结束时间戳为权威状态
	 * @param {Object} player - 玩家对象
	 * @param {string} skill - 技能名称
	 * @param {number} duration - 冷却时长（毫秒），<=0 则立即结束冷却
	 * @returns { void }
	 */
	xjzh_startCoolTime(player: Object, skill: string, duration: number): void;
	/**
	 * - 为玩家的技能添加冷却时间
	 * @param {...(Object | number  |string)} args - 可变参数，包含玩家对象、冷却时间（秒）和技能名称
	 * @returns { void }
	 */
	xjzh_addCoolTime(...args: (Object | number | string)[]): void;
	/**
	 * - 减少玩家技能的冷却时间
	 * @param {...(Object | number | string)} args - 可变参数，包含玩家对象、要减少的时间（秒）和技能名称
	 * @returns { void }
	 */
	xjzh_lessCoolTime(...args: (Object | number | string)[]): void;
	/**
	 * - 移除玩家技能的冷却时间
	 * @param {...(Object | string)} args - 可变参数，包含玩家对象和技能名称
	 * @returns { void }
	 */
	xjzh_removeCoolTime(...args: (Object | string)[]): void;
	/**
	 * - 判断玩家技能是否处于冷却状态
	 * @param {...(Object | string)} args - 可变参数，包含玩家对象和技能名称
	 * @returns { boolean } 如果技能处于冷却状态，则返回 true，否则返回 false
	 */
	xjzh_hasCoolTime(...args: (Object | string)[]): boolean;
	/**
	 * - 随机成功函数
	 * - 以给定几率返回是否“成功”
	 * @param { number } [chance=0.5] - 成功几率，取值 [0,1]，默认 0.5（即 50%）
	 * @returns { boolean } 命中该几率时返回 true（成功），否则返回 false
	 */
	xjzh_randomSuccess(chance?: number): boolean;
	/**
	 * - 清除玩家身上的所有控制效果
	 * - 该函数用于解除玩家身上的各种控制效果，包括弃置延时锦囊牌、翻面、横置、恢复装备栏位以及移除减益BUFF
	 * - 它首先检查传入的player参数是否为有效的Player对象，然后执行一系列操作来解除上述限制状态
	 * @param { Player } player - 要清除控制的玩家对象，必须是有效的Player实例
	 * @returns { Player } 返回经过控制效果清除操作后的玩家对象
	 * @throws 如果传入的player参数不是有效的Player对象，则抛出错误
	 */
	xjzh_claerRestraint(player: Player): Player;
	/**
	 * - 更新文本中的次数限制信息
	 * - 该函数主要用于在文本中找到次数限制的表述，并将其更新为新的次数
	 * @param { string } text - 需要更新的文本
	 * @param { number } num - 需要增加到原始次数上的数值
	 * @returns { string } - 更新后的文本字符串
	 */
	xjzh_updateText(text: string, num: number): string;
	/**
	 * - 复制文本到剪贴板的功能函数
	 * @param { string } text 需要复制到剪贴板的文本
	 * @returns { void }
	 */
	copyTotext(text: string): void;
	/**
	 * - 删除文件及文件夹，为防止滥用，只支持操作本扩展目录
	 * @param { string } files - 相对于本扩展目录的文件或文件夹路径
	 * @returns { void }
	 */
	xjzh_removeFiles(files: string): void;
	/**
	 * 异步复制文件或文件夹
	 * @param { string } source - 源文件或文件夹的路径。
	 * @param { string } target - 目标文件或文件夹的路径
	 * @param { string } str - 进度条显示的提示文字
	 * @param { function } onCopyCompleted - 复制完成后调用的回调函数，接收已复制文件数和总文件数作为参数
	 * @param { Boolean } showProgress - 是否显示进度条，默认显示
	 * @returns { void }
	 */
	xjzh_copyFiles(source: string, target: string, str: string, onCopyCompleted: Function, showProgress: Boolean): void;

	/**
	 * - 购买超级会员的函数
	 * - 该函数会先检查用户是否已有超级会员，若有则提示剩余天数及购买规则
	 * - 接着检查用户是否有足够的资源（碎片或精魄）购买超级会员
	 * - 若资源足够，会根据用户选择扣除相应资源并更新超级会员的有效期
	 * @returns { boolean } 若成功购买超级会员返回 true，否则返回 false
	 */
	xjzh_buySvip(): boolean;
	/**
	 * - 将 `new Date()` 获取的时间转为 `YYYY-MM-DD` 字符串格式
	 * @param { Date } [date] - 可选参数，要转换的日期对象。若未提供，则使用当前日期
	 * @returns { string } 转换后的日期字符串，格式为 `YYYY-MM-DD`
	 */
	xjzh_toDateString(date: Date): string;
	/**
	 * - 增加超级会员的使用时间
	 * @param {number} num - 需要增加的天数
	 */
	xjzh_gainSvipTime(num: number): void;
	/**
	 * - 清除超级会员信息
	 * @returns { void }
	 */
	xjzh_clearSvipTime(): void;
	/**
	   * - 将 YYYY-MM-DD 格式的日期字符串转换为 Date 对象。
	   * @param {string} dateString - YYYY-MM-DD 格式的日期字符串。
	   * @returns {Date} 返回对应的 Date 对象，如果输入无效则返回无效的 Date 对象（new Date(NaN)）。
	   */
	xjzh_fromDateString(dateString: string): Date;
	/**
	 * - 将传入字符串中的所有小写字母转换为大写字母
	 * @param { string } str - 需要进行大小写转换的字符串
	 * @returns {string} - 转换后的字符串
	 */
	xjzh_toUpperCase(str: string): string;
	/**
	 * - 将传入字符串中的所有大写字母转换为小写字母
	 * @param { string } str - 需要进行大小写转换的字符串
	 * @returns {string} - 转换后的字符串
	 */
	xjzh_toLowerCase(str: string): string;
	/**
	 * - 获取符合条件的武将牌列表
	 * @param {...(string | string[] | number)} args - 可变参数，支持以下类型：
	 *  - 字符串或数组：武将名称或名称列表，用于筛选武将
	 *  - 数字：指定返回的武将牌数量
	 *  - 布尔值：是否排除已阵亡的武将
	 * @returns { Player[] | undefined } - 符合条件的武将牌列表，若指定了数量则随机返回相应数量的武将牌
	 */
	xjzh_wujiangpai(args: string | string[] | number): Player[] | undefined;
	/**
	 * 暴击伤害处理函数
	 * 根据概率触发暴击，并放大伤害倍数
	 * @param {...any} args - 可变参数列表
	 * @param {Object} args[].event - 事件对象
	 * @param {Object} args[].trigger - 触发器对象，包含伤害数值等信息
	 * @param {Object} args[].player - 玩家对象
	 * @param {number} [args[].crit=0.5] - 暴击概率阈值（当第二个数字参数时）
	 * @param {number} [args[].critDamage=2] - 暴击伤害倍数（当第一个数字参数时）
	 * @param {boolean} [args[].bool] - 布尔标志，为 true 时将 num 设为 1（必定暴击）
	 */
	xjzh_criticalStrike(...args: any[]): Promise<void>;
	/**
	 * - 创建自定义对话框。
	 * @param {...(Array | Function | boolean | string)} args - 可变参数，用于配置对话框。
	 *  - Array: 包含对话框选项的数组，每个选项对应一个按钮。
	 *  - Function: 按钮点击时触发的回调函数，会传入按钮对应的选项值。
	 *  - boolean: 控制是否显示特定图片，默认显示，传入 `false` 则不显示。
	 *  - string: 对话框中显示的文本内容。
	 * @returns { void }
	 */
	xjzh_createDailog(...args: (Array<any> | Function | boolean | string)[]): void;
	/**
	 * - 打开自定义对话框的函数
	 * - 根据传入的参数创建一个对话框，显示相应的信息，并支持自定义选项列表和点击回调
	 * @param {...(string | Array | Function)} args - 可变参数，支持以下类型
	 *  - Array: 包含对话框选项的数组
	 *  - Function: 选项点击时触发的回调函数
	 *  - string: 传入的需要处理的字符串
	 * @returns { void }
	 */
	xjzh_openDialog(...args: (Array<any> | Function | string)[]): void;
	/**
	 * - 播放音频的函数
	 * - 根据配置和传入的参数决定如何调用 `game.playAudio` 方法来播放音频
	 * @param { string } fn - 音频文件的名称
	 * @param { string } [dir] - 音频文件的目录路径，可选参数
	 * @param { string } [sex] - 音频的性别标识，可选参数
	 * @returns { void }
	 */
	xjzh_playAudio(fn: string, dir: string, sex: string): void;
}

export type games = Games & Game;
