
import { Player } from "../../../noname/library/element/player.js";

/**
 * 编写奇术要件的模板和说明
 */
export declare interface qishuLists {
    /**
     * - 奇术要件名称
     * @example
     * '炼金师之力'
     */
    translate: string;
    /**
     * - 奇术要件描述
     * @example
     * '你造成伤害时，若此伤害属性的数量不小于2，你令此伤害溅射至你选择的至多2名额外角色。'
     */
    translate_info: string;
    /**
     * - 奇术要件附加描述
     * - 用于介绍奇术要件背景信息
     * - 目前无作用
     * @example
     * '炼金师苦思冥想，花费数个岁月，终于将各种元素属性融合到了一件物品中。——炼金师密卷'
     */
    append_info: string;
    /**
     * - 奇术要件获取途径
     * @example
     * '等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片'
     */
    extra: string;
    /**
     * - 奇术要件等级
     * - 范围为1-5，不写默认为1
     * - 5视为特殊奇术要件
     */
    level?: 1 | 2 | 3 | 4 | 5;
    /**
     * - 奇术要件在游戏内时候不显示描述
     * - 目前无作用
     */
    noTranslate?: boolean;
    /**
     * - 可以装备的角色ID
     * - 目前仅专属奇术要件使用
     * - 有此项的视为专属奇术要件
     * @example
     * //一个函数，参数为一个角色的id，返回true时表示该角色可以装备
     * function(name){
     *      var list=lib.character[name][4];
     *      return !list||!list.contains('hiddenSkill')
     * },
     * @example
     * //可以直接为一个角色的id，表示只有该角色可以装备
     * 'zhaoyun'
     * @example
     * //可以为一个角色id的数组，表示这些角色可以装备
     * ['zhangfei','guanyu']
     */
    filter?: string | string[] | ((playerName: string) => boolean);
    /**
     * - 游戏开始时的执行内容
	 * @param { Player } player - 玩家对象，用于获取技能数据
	 * @returns { void }
     */
    init?: (player: Player) => void;
    /**
     * - 装备的角色被替换掉的技能，可以有多个
     * - 替换后的技能id为被替换的技能id+'_changed'
     * @example
     * //'被替换的技能id':{
     * //    替换后的技能内容
     * //}
     * 'wusheng':{
     *      trigger:{},
     *      filter:{},
     * }
     * @example
     * //'被替换的技能id':'替换后的技能id'
     * 'wusheng':'rewusheng'
     * //如果这样写，请提前写好对应技能的代码及翻译
     */
    replaceSkill?: {
        [skillId: string]: Skill | string;
    };
    /**
     * - 被替换的技能的翻译和描述
     * @example
     * //'被替换的技能id':'替换后技能的名字，不变可以不填',
     * 'wusheng':'咆哮'
     * //'被替换的技能id_info':'替换后技能的描述',
     * 'wusheng_info':'其实这是咆哮'
     */
    replaceSkillInfo?: {
        [skillId: string]: string;
    };
    /**
     * - 奇术要件的技能内容
     * - 奇术要件技能默认优先度为5
     * - 技能id为奇术要件的id
     */
    skill?: Skill;
    /**
     * - 技能名称，不写则默认为奇术要件名称
     */
    skillName?: string;
    /**
     * - 技能描述，不写则无
     */
    skillInfo?: string;
    /**
     * - 装备该奇术要件需要先装备的其他前置奇术要件
     */
    precede?: Array<string>;
    /**
     * - 该奇术要件与其他奇术要件冲突的奇术要件
     */
    conflict?: Array<string>;
    /**
     * - 卸下该奇术要件需要先卸下前置的奇术要件
     */
    unequip?: Array<string>;
}