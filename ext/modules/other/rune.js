import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';
lib.init.css(lib.assetURL + "extension/仙家之魂/css", 'rune');

/**
 * - 符文列表
 * - 包含仪式符文和祷告符文两个对象
 * @type {import("../../../@types/rune").Runes}
 */
export const runes = {
    ritual: {
        "xjzh_fuwen_huanmo": {
            trigger: { player: "xjzh_changeMp" },
            names: "xjzh_fuwen_huanmo",
            gain: 20,
            type: "ritual",
            translate: "唤魔符文",
            filter: (event, player) => true,
            translateInfo() {
                return `当你回复魔力时，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_tamu": {
            trigger: { player: "useCard" },
            names: "xjzh_fuwen_tamu",
            gain: 25,
            type: "ritual",
            translate: "塔姆符文",
            filter: (event, player) => true,
            translateInfo() {
                return `当你使用牌时，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_lieyan": {
            trigger: { source: "damageAfter" },
            names: "xjzh_fuwen_lieyan",
            gain: 65,
            type: "ritual",
            translate: "烈焰符文",
            filter: (event, player) => game.hasNature(event, "fire"),
            translateInfo() {
                return `当你造成火属性伤害后，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_hanshuang": {
            trigger: { source: "damageAfter" },
            names: "xjzh_fuwen_hanshuang",
            gain: 75,
            type: "ritual",
            translate: "寒霜符文",
            filter: (event, player) => game.hasNature(event, "ice"),
            translateInfo() {
                return `当你造成冰属性伤害后，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_benlei": {
            trigger: { source: "damageAfter" },
            names: "xjzh_fuwen_benlei",
            gain: 55,
            type: "ritual",
            translate: "奔雷符文",
            filter: (event, player) => game.hasNature(event, "thunder"),
            translateInfo() {
                return `当你造成雷属性伤害后，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_cuidu": {
            trigger: { source: "damageAfter" },
            names: "xjzh_fuwen_cuidu",
            gain: 80,
            type: "ritual",
            translate: "淬毒符文",
            filter: (event, player) => game.hasNature(event, "poison"),
            translateInfo() {
                return `当你造成毒属性伤害后，获得${this.gain}个贡品。`
            },
        },
        "xjzh_fuwen_jinren": {
            trigger: { source: "damageAfter" },
            names: "xjzh_fuwen_jinren",
            gain: 35,
            type: "ritual",
            translate: "金刃符文",
            filter: (event, player) => true,
            translateInfo() {
                return `当你造成伤害后，获得${this.gain}个贡品。`
            },
        },

    },
    //祷告符文
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
                return `消耗${this.xiaohao}个贡品，获得1点体力上限。`
            },
        },
        "xjzh_fuwen_qiyuan": {
            xiaohao: 150,
            names: "xjzh_fuwen_qiyuan",
            type: "pray",
            async content(event, trigger, player) {
                player.draw(2);
            },
            translate: "祈愿符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，摸2张牌。`
            },
        },
        "xjzh_fuwen_baofeng": {
            xiaohao: 200,
            names: "xjzh_fuwen_baofeng",
            type: "pray",
            async content(event, trigger, player) {
                const result = await player.chooseTarget(`〖${get.translation(event.name)}〗：选择一名其他角色对其造成1点雷属性伤害`, lib.filter.notMe)
                    .set('ai', target => get.damageEffect(target, player, player, "thunder"))
                    .forResult();
                if (result?.targets) {
                    result.targets[0].damage("thunder", 1, player, "nocard");
                };
            },
            translate: "暴风符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，对一名其他角色造成一点雷属性伤害。`
            },
        },
        "xjzh_fuwen_xinling": {
            xiaohao: 300,
            names: "xjzh_fuwen_xinling",
            type: "pray",
            async content(event, trigger, player) {
                let bannedType = ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技"];
                let list = [];
                game.xjzh_wujiangpai().forEach(item => {
                    if (lib.character[item].skills) {
                        list.addArray(lib.character[item].skills.filter(skill => {
                            if (!get.skillInfoTranslation(skill)) return false;
                            if (lib.skill.global.includes(skill)) return false;
                            return !get.skillCategoriesOf(skill, player).some(type => bannedType.includes(type));
                        }));
                    }
                });
                let skill = list.randomGet();
                player.addSkills(skill);
            },
            translate: "心灵符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，获得一个随机技能。`
            },
        },
        "xjzh_fuwen_jianyu": {
            xiaohao: 250,
            names: "xjzh_fuwen_jianyu",
            type: "pray",
            async content(event, trigger, player) {
                player.chooseUseTarget({ name: 'wanjian' }, true)._triggered = null;
            },
            translate: "箭雨符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，使用一张【万箭齐发】。`
            },
        },
        "xjzh_fuwen_qiushou": {
            xiaohao: 250,
            names: "xjzh_fuwen_qiushou",
            type: "pray",
            async content(event, trigger, player) {
                player.chooseUseTarget({ name: 'nanman' }, true)._triggered = null;
            },
            translate: "酋首符文",
            translateInfo() {
                return `消耗${this.xiaohao}个贡品，使用一张【南蛮入侵】。`
            },
        },

    },
};

lib.xjzh_runes = runes;

//禁止的符文组合
const bannedRunes = [
    ["xjzh_fuwen_tamu", "xjzh_fuwen_jianyu"],
    ["xjzh_fuwen_benlei", "xjzh_fuwen_baofeng"],
];
lib.xjzh_bannedRunes = bannedRunes;