import { GameEvent } from "../../../noname/library/element/gameEvent.js";
import { Player } from "../../../noname/library/element/player.js";

/**
 * 定义一个字符串索引签名的泛型接口，用于表示键为字符串，值为泛型类型 T 的对象
 * @typeParam T - 值的类型，由外部传入确定
 */
export declare interface SMap<T> {
    // 字符串索引签名，允许使用任意字符串作为键访问对象属性，属性值类型为 T
    [key: string]: T;
}

/**
 * 仪式符文接口，描述仪式符文的属性和方法
 */
export declare interface ritual {
    /**
     * - 触发时机，与技能写法一致
     */
    trigger: { player: string | string[] };
    /**
     * - 符文ID
     */
    names: string;
    /**
     * - 每次触发仪式符文时获得的贡品数量
     */
    gain: number;
    /**
     * - 符文类型
     * - 此处必须写"ritual"，表示这是一个仪式符文
     */
    type: "ritual";
    /**
     * - 符文名称
     * - 用于在界面上显示
     */
    translate: string;
    /**
     * - 过滤函数
     * - 用于判断是否满足仪式符文的触发条件
     * @param { GameEvent } event  - 返回创建的事件对象
     * @param { Player } player - 目标玩家对象
     * @returns { Boolean } 如果满足触发条件返回 true，即触发符文的内容
     */
    filter: (event: GameEvent, player: Player) => boolean;
    /**
     * - 符文描述
     * @returns 符文效果的描述字符串
     */
    translateInfo: () => string;
}

/**
 * 祷告符文接口，描述祷告符文的属性和方法
 */
export declare interface pray {
    /**
     * - 每次使用祷告符文时消耗的贡品数量
     */
    xiaohao: number;
    /**
     * - 符文ID
     */
    names: string;
    /**
     * - 符文类型
     * - 此处必须写"pray"，表示这是一个祷告符文
     */
    type: "pray";
    /**
     * - 符文效果函数
     * - 执行祷告符文的具体效果
     * @param { GameEvent } event - 事件对象，包含触发事件的相关信息
     * @param { GameEvent } trigger - 触发对象，代表触发该祷告符文的源头
     * @param { Player } player - 玩家对象，代表使用该祷告符文的玩家
     */
    content: (event: GameEvent, trigger: GameEvent, player: Player) => Promise<void>;
    /**
     * - 符文名称
     * - 用于在界面上显示
     */
    translate: string;
    /**
     * - 符文描述
     * @returns 符文效果的描述字符串
     */
    translateInfo: () => string;
    /**
     * - 可选的目标过滤函数，用于筛选符合条件的目标
     * @param { Player } player - 玩家对象，代表使用玩家使用符文的目标
     * @returns { Array<Player> } - 符合条件的目标对象数组
     */
    targetFilter?: (Player: Player) => Array<Player>;
}

/**
 * - 符文对象接口
 * - 包含仪式符文列表和祷告符文列表
 * - 符文的触发/使用的玩家始终为player即game.me
 * - 符文的触发/使用的目标始可由pray对象内符文的targetFilter定义
 * - 如你想写一个效果为“消耗200个贡品对女性角色造成1点伤害”
 * @example
 *
 targetFilter(player):=>game.filterPlayer(target=>target.hasSex("female"))
 */
export declare interface Runes {
    /**
     * - 仪式符文列表
     * - 键必须为ritual
     * - 值是一个包含多个对象的对象
     * @example
     *
    ritual: {
        "xjzh_fuwen_tamu": {
            trigger: { player: "useCard" },
            names: "xjzh_fuwen_tamu",
            gain: 25,
            type: "ritual",
            translate: "塔姆符文",
            filter: (event, player) => true,
            translateInfo() {
                return `当你使用牌时，获得${this.gain}个贡品`
            }
        }
    }
     */
    ritual: SMap<ritual>;
    /**
     * - 祷告符文列表
     * - 键必须为pray
     * - 值是一个包含多个对象的对象
     * @example
     *
    pray: {
        "xjzh_fuwen_zhaer": {
            xiaohao: 250,
            names: "xjzh_fuwen_zhaer",
            type: "pray",
            async content(event, trigger, player) {
                player.gainMaxHp();
            },
            translate: "扎尔符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，获得1点体力上限`
            },
        },
    },
     */
    pray: SMap<pray>;
}

