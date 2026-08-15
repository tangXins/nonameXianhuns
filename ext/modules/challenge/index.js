import { lib, game, ui, get, ai, _status, rootURL } from "../../../../../noname.js";
import { talentList } from "./talentList.js";

/**
    *升华试炼部分代码和素材借鉴自《时空枢纽》，感谢"鸽尔赞"的代码和素材支持（已取得作者同意）
    *升华试炼部分代码和素材借鉴自《无尽模式》，感谢"锟斤拷烫烫烫"的代码和素材支持（已取得作者同意）
*/

lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'challenge');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'wujinMode');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'talent');

//升华试炼 - 困难模式由UI控制，不再依赖冥狱石
const qishuName = get.xjzh_qishuUserName();

// 表现评分系统
function xjzh_getPerformanceRank(data, maxTurns) {
    let score = 0;
    score += (data.charactersAlive || 0) * 20;
    score += Math.max(0, (maxTurns - (data.turnsUsed || 0)) * 5);
    score += (data.noDamageRounds || 0) * 10;
    if (data.specialCondition) score += 50;
    if (score >= 100) return { rank: 'S', multiplier: 1.5, extraKey: true };
    if (score >= 70) return { rank: 'A', multiplier: 1.3, extraKey: false };
    if (score >= 40) return { rank: 'B', multiplier: 1.15, extraKey: false };
    return { rank: 'C', multiplier: 1.0, extraKey: false };
}

const forbiddenCharacters = {
    tongyong: {
        'xjzh_poe_yuhuoshi': '狱火师',
        'xjzh_poe_nvwu': '女巫',
        'xjzh_sanguo_guojia': '郭嘉',
        'xjzh_wzry_yuange': '元歌',
        'xjzh_huoying_kakaxi': '旗木卡卡西',
        'xjzh_zxzh_linmo': '林默',
        'xjzh_diablo_lamasi': '拉斯玛',
        'xjzh_sanguo_zhangrang': '张让',
        'xjzh_meiren_xiangwanru': '向婉茹',
        'xjzh_sanguo_nanhua': '南华老仙',
        'xjzh_qixia_daxiongxiaomao': '大熊小猫',
        'xjzh_qixia_mumuxiao': '木木枭',
        'xjzh_poe_youxia': '游侠',
        'xjzh_sanguo_yuji': '于吉',
        "xjzh_sanguo_guanlu": "管辂",
        "xjzh_sanguo_yuanshao": "袁绍",
        "xjzh_sanguo_zuoci": "左慈",
        "xjzh_sanguo_zuoyou": "左幽",
        "xjzh_meiren_linjiasheng": "林嘉笙",
        "xjzh_meiren_huangyuke": "黄毓珂",
        "xjzh_huoying_zhishui": "宇智波止水",
        "xjzh_huoying_mingren": "漩涡鸣人",
        "xjzh_huoying_zuozhu": "宇智波佐助",
        "xjzh_boss_lvbu": "神吕布",
        "xjzh_poe_guizu": "升华使徒",
    },
    huangjin: {
        'xjzh_sanguo_liubei': '刘备',
        'xjzh_sanguo_caocao': '曹操',
        'xjzh_sanguo_zhangbao': '张宝',
    },
};

const bannedSkills = [];

const challenges = {
    'huangjin': {
        consumable() {
            return true;
        },
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【镇压黄巾】试炼不需要消耗材料。\

            <br><br>二、挑战规则 \
                <br><li>神张角阵亡时张宝和黄巾兵均已阵亡。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×1。 \
                <br><li>获得神张角"驱雷掣电"成就。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外钥匙，C级基础倍率）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.huangjin), ...Object.values(forbiddenCharacters.tongyong)]} \
            `,
        stage: {
            'zhangjiao': {
                name: '镇压黄巾',
                image: 'xjzh_boss_zhangjiao',
                enemies: {
                    6: 'xjzh_boss_zhangjiao',
                    4: 'xjzh_sanguo_zhangbao',
                },
                friends: {
                    0: 'free',
                    1: 'xjzh_sanguo_liubei',
                    2: 'xjzh_sanguo_caocao',
                },
                forbidden: [...Object.keys(forbiddenCharacters.huangjin), ...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {},
                gameDraw: (player) => 4,
                init: () => { },
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_zhangjiao'));
                },
                filters: [
                    () => !game.hasPlayer(target => target.side == true),
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.huangjin), ...Object.keys(forbiddenCharacters.tongyong)],
                    `神张角阵亡时张宝和黄巾兵均已阵亡`,
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            if (!game.xjzhAchi.hasAchi('驱雷掣电', 'character')) game.xjzhAchi.addProgress('驱雷掣电', 'character', 1);
            let suipian = get.rand(10, 200);
            let liezhiKey = 1;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) liezhiKey += 1;
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'siling': {
        consumable() {
            let config = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
            if (!config || config.size == 0) return false;
            let playerSouls = config?.get("isPlayer") || [];
            let aiSouls = config?.get("isAi") || [];
            let allSouls = [...playerSouls, ...aiSouls];
            return allSouls.length >= 1;
        },
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【亡灵禁界】需死灵之书有存入的灵魂（无钥匙消耗）。\

            <br><br>二、挑战规则 \
                <br><li>获得胜利。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×1。 \
                <br><li>随机解放死灵之书的灵魂，优先解放AI收集的灵魂。 \
                <br><li>精魄×1。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \

                <br><br>五、已被《亡灵之书》收集的灵魂数量:${(() => {
                let config = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo")
                let playerSouls = config?.get("isPlayer") || [];
                let aiSouls = config?.get("isAi") || [];
                let allSouls = [...playerSouls, ...aiSouls];
                return allSouls.length

            })()} \
        `,
        stage: {
            'lamasi': {
                name: '亡灵禁界',
                image: 'xjzh_diablo_lamasi',
                enemies: {
                    6: 'xjzh_diablo_lamasi',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_diablo_lamasi: {
                        hp: 6, maxHp: 12,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => {
                    let target = game.findPlayer(target => get.is.playerNames(target, 'xjzh_diablo_lamasi')), list = ["xjzh_challenge_lamasAddPlayer", "xjzh_challenge_lamasiMaxHs"];
                    target.addSkills(list);
                },
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_diablo_lamasi'));
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)],
                    `获得胜利`
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(10, 200);
            let liezhiKey = 1;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) liezhiKey += 1;
            let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
            if (!list || list.size == 0) return;
            let isAi = list.get("isAi"), isPlayer = list.get("isPlayer"), jiefang;
            if (isAi.length) jiefang = isAi.randomRemove();
            else if (isPlayer.length) jiefang = isPlayer.randomRemove();
            game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo", list);
            game.xjzh_changeTokens(1);
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;精魄（1个）<br>&emsp;&emsp;已解放（${get.translation(jiefang)}）<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        },
    },
    'wujinshilian': {
        consumable() {
            return true;
        },
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);

            return introButton;
        },
        talentButton(showWindow) {
            var talentButton = ui.create.div('.xjzh-challengePage-talentButton', showWindow);
            return talentButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【无尽试炼】试炼不需要消耗材料。\

            <br><br>二、挑战规则 \
                <br><li>第一关为基础奖励关卡，boss为本体神吕布。 \
                <br><li>从第二关开始boss随机切换，并根据关卡增加敌方数量。 \
                <br><li>每一关结束重置玩家所有状态，包括但不限于负面状态、技能。 \
                <br><li>从第5关开始，敌方角色会随机获得技能，最少为1个，每通过一关该数字+1，最多为10个。 \
                <br><li>从第5关开始，敌方角色分发手牌后会再摸牌，最少为2张，每通过一关该数字+2，最多为20张。 \
                <br><li>从第5关开始，敌方角色分发手牌后获得体力上限，每一关加2，最多为20。 \
                <br><li>道韵的储存有上限，最多为30，所以在每一关结束后尽量消耗道韵。 \
                <br><li>玩家拥有5次复活次数，复活次数消耗完毕后在任意一关阵亡视为挑战失败，但依然会结算奖励。 \
                <br><li>在商店界面点击结算可立即获得奖励，但除了通关记录之外的所有数据会重置。 \
                <br><li>在商店界面点击退出会储存本次通关数，下次可以加载。 \
                <br><li>每一关挑战成功后，会自动存档。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：根据挑战的关卡数以及击杀的武将数量获得经验值。 \
                <br><li>根据挑战的关卡数以及击杀的武将数量获得碎片。 \
                <br><li>根据挑战的关卡数以及击杀的武将数量获得劣质/精良巢穴钥匙（随机）。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外精良钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
            `,
        stage: {
            'wujing': {
                name: '无尽试炼',
                image: 'shen_lvbu',
                enemies: {
                    6: 'shen_lvbu',
                },
                friends: {
                    0: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {},
                gameDraw: (player) => 4,
                init: () => {
                    game.updateChallengeLevel(1, false);
                    game.me.addSkill("xjzh_challenge_wujinBuffSkill")
                },
                firstPhase() {
                    return game.findPlayer(target => target == game.me);
                },
                filters: [],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let { level, sourceDieNum } = game.wujingModeStorage;
            let num = level - 1;
            let talentExpNum = get.xjzh_talentReward("wujinshilian", "exp"),
                talentSuipianNum = get.xjzh_talentReward("wujinshilian", "suipian"),
                talentCailiaoNum = get.xjzh_talentReward("wujinshilian", "cailiao");
            let str = `当前模式：${get.translation(get.mode())}
                        <br><br>当前玩家：${get.qishuName()}
                        （ ${get.translation(get.nameList(game.me)[0])}）
                        <br><br>对局奖励：`;
            let exp = 15 * (num + sourceDieNum) * (1 + talentExpNum / 100),
                suipian = (num + sourceDieNum) * 5 * (1 + talentSuipianNum / 100),
                cailiaoNumber = 1 * num + Math.floor(sourceDieNum / 20 * 2) * (1 + talentCailiaoNum / 100);
            if (get.xjzh_talentUnlock("wujinshilian", "tA5-1")) {
                const mathNum = Math.random() < 0.5 ? 3 : 0;
                exp *= mathNum;
                suipian *= mathNum;
            }
            else if (get.xjzh_talentUnlock("wujinshilian", "tA5-2")) {
                exp *= 1.5;
                suipian *= 1.5;
            }

            exp = Math.trunc(exp);
            suipian = Math.trunc(suipian);
            cailiaoNumber = Math.trunc(cailiaoNumber);

            str += `<br>&emsp;&emsp;经验：${exp}
                        <br>&emsp;&emsp;碎片：${suipian}个`;

            game.xjzh_levelUp(exp);
            game.xjzh_changeSuipian(suipian);

            // 无尽试炼只掉落劣质钥匙和精良钥匙
            let cailiaoList = ["xjzh_cailiao_liezhiKey", "xjzh_cailiao_jingliangKey"], gainCailiao = {};

            while (cailiaoNumber > 0) {
                cailiaoNumber--;
                let cailiao = cailiaoList.randomGet();
                if (gainCailiao[cailiao]) gainCailiao[cailiao]++;
                else gainCailiao[cailiao] = 1;
            }

            for (let cailiao in gainCailiao) {
                game.xjzh_changeCailiao(cailiao, gainCailiao[cailiao]);
                str += `<br>&emsp;&emsp;${get.xjzh_cailiaoTranslate(cailiao)}：${gainCailiao[cailiao]}个`;
            }

            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 30);
            let bonusSuipian = Math.floor(suipian * (performance.multiplier - 1));
            if (bonusSuipian > 0) {
                game.xjzh_changeSuipian(bonusSuipian);
                str += `<br>&emsp;&emsp;表现奖励碎片：${bonusSuipian}个`;
            }
            if (performance.extraKey) {
                game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", 1);
                str += `<br>&emsp;&emsp;表现奖励精良巢穴钥匙：1个`;
            }
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'enianmoku': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_liezhiKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_liezhiKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【恶念魔窟】试炼需要消耗12个"劣质巢穴钥匙"。\

            <br><br>二、挑战规则 \
                <br><li>每次对瓦尔申造成伤害不得超过其体力上限的1/3（向下取整）。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×2、精良巢穴钥匙×2。 \
                <br><li>奇术要件"疯狼的狂喜"、"瓦西里的祷告"、"猎天弓"随机获得1个。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外精良钥匙，倍率1.5/1.3/1.15/1.0）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
            `,
        stage: {
            'waersheng': {
                name: '恶念魔窟',
                image: 'xjzh_boss_waershen',
                enemies: {
                    6: 'xjzh_boss_waershen',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_waershen: {
                        hp: 24, maxHp: 24,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_waershen'));
                },
                filters: [
                    () => !game.waershengDamage,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)],
                    `每次对瓦尔申造成伤害最大不得超过3点`
                ],
                globalSkills: ['xjzh_challenge_waershengDamage'],
            },
        },
        onWinner() {
            let suipian = get.rand(10, 200);
            let liezhiKey = 2;
            let jingliangKey = 2;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) jingliangKey += 1;
            let qishuList = ["xjzh_qishu_fenglangkx", "xjzh_qishu_waxilidedaogao", "xjzh_qishu_lietiangong"].randomGet();
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            game.xjzh_gainEquip(qishuList, 1);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;${get.xjzh_qishuTranslate(qishuList)}（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'zenghenwangzuo': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_wanmeiKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_wanmeiKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_wanmeiKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【憎恨王座】试炼需要消耗12个“完美巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>游戏结束时友方没有角色阵亡 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机50-500碎片、劣质巢穴钥匙×12、精良巢穴钥匙×12、完美巢穴钥匙×6、史诗巢穴钥匙×1。 \
                <br><li>精魄×1-4。 \
                <br><li>随机获得3-4级奇术要件1个（包括专属奇术要件）。\
                <br><li>30%几率获得奇术要件“不败王者”。\
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外完美钥匙，无阵亡特殊条件）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'lilisi': {
                name: '憎恨王座',
                image: 'xjzh_boss_lilisi',
                enemies: {
                    6: 'xjzh_boss_lilisi',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_lilisi: {
                        hp: 12, maxHp: 12,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                globalSkills: [],
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_lilisi'));
                },
                filters: [
                    () => !game.hasPlayer2(target => !target.side && target.isDead()),
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)],
                    `游戏结束时友方没有角色阵亡`
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            if (!game.xjzhAchi.hasAchi('莉莉丝的梦魇', 'special')) game.xjzhAchi.addProgress('莉莉丝的梦魇', 'special', 1);
            let suipian = get.rand(50, 500);
            let liezhiKey = 12;
            let jingliangKey = 12;
            let wanmeiKey = 6;
            let shishiKey = 1;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: !game.hasPlayer2(target => !target.side && target.isDead())
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) wanmeiKey += 1;
            let jingpo = get.rand(1, 4);
            game.xjzh_changeTokens(jingpo);
            let qishuList = Object.keys(lib.xjzh_qishuyaojians).filter(item => {
                let level = get.xjzh_equipInfo(item).level || 1;
                return level && level >= 3 && level < 5;
            });
            let qishu = qishuList.randomGet();
            game.xjzh_gainEquip(qishu, 1);
            if (Math.random() <= 0.3) {
                game.xjzh_gainEquip("xjzh_qishu_bubaiwangzhe", 1);
            }
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            game.xjzh_changeCailiao("xjzh_cailiao_wanmeiKey", wanmeiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_shishiKey", shishiKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;精魄（${jingpo}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;完美巢穴钥匙（${wanmeiKey}个）<br>&emsp;&emsp;史诗巢穴钥匙（${shishiKey}个）<br>&emsp;&emsp;${get.xjzh_qishuTranslate(qishu)}（1个）`;
            if (Math.random() <= 0.3) str += `<br>&emsp;&emsp;不败王者（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'liudianshengtu': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_liezhiKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_liezhiKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【流电圣徒】试炼需要消耗12个“劣质巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>当敌方存活角色大于等于2时，你无法对其造成伤害。 \
                <br><li>敌方角色阵亡时，你获得“麻痹”标记，直到回合结束。\

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×2、精良巢穴钥匙×2。 \
                <br><li>3级奇术要件“不灭雷鸣”、“Hakankouyu”随机获得1个。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外精良钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'geligaoli': {
                name: '流电圣徒',
                image: 'xjzh_boss_geligaoli',
                enemies: {
                    6: 'xjzh_boss_geligaoli',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_geligaoli: {
                        hp: 30, maxHp: 30,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                globalSkills: [],
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_geligaoli'));
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(10, 200);
            let liezhiKey = 2;
            let jingliangKey = 2;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) jingliangKey += 1;
            let qishuList = ["xjzh_qishu_wuyan", "xjzh_qishu_hakankouyu"].randomGet();
            game.xjzh_gainEquip(qishuList, 1);
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;${get.xjzh_qishuTranslate(qishuList)}（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'jukoushenkeng': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_jingliangKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_jingliangKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【巨口深坑】试炼需要消耗12个“精良巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>每轮开始时，所有角色获得“腐蚀”标记。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机50-500碎片、劣质巢穴钥匙×6、精良巢穴钥匙×3、完美巢穴钥匙×2。 \
                <br><li>4级奇术要件随机获得1个。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外完美钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'duruier': {
                name: '巨口深坑',
                image: 'xjzh_boss_duruier',
                enemies: {
                    6: 'xjzh_boss_duruier',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_duruier: {
                        hp: 36, maxHp: 36,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                globalSkills: [],
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_duruier'));
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(50, 500);
            let liezhiKey = 6;
            let jingliangKey = 3;
            let wanmeiKey = 2;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) wanmeiKey += 1;
            let qishuList = ["xjzh_qishu_fengbaopaoxiao", "xjzh_qishu_wumingzhe", "xjzh_qishu_linghunlaoyin", "xjzh_qishu_shenshengshuzhi"].randomGet();
            game.xjzh_gainEquip(qishuList, 1);
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            game.xjzh_changeCailiao("xjzh_cailiao_wanmeiKey", wanmeiKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;完美巢穴钥匙（${wanmeiKey}个）<br>&emsp;&emsp;${get.xjzh_qishuTranslate(qishuList)}（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'xianxuejitan': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_liezhiKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_liezhiKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【献血祭坛】试炼需要消耗12个“劣质巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>每轮结束时，你需要失去1点体力（或弃1张牌）。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×2、精良巢穴钥匙×2。 \
                <br><li>3级奇术要件“疯狼的狂喜”、“瓦西里的祷告”随机获得1个。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外完美钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'qier': {
                name: '献血祭坛',
                image: 'xjzh_boss_qier',
                enemies: {
                    6: 'xjzh_boss_qier',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_qier: {
                        hp: 12, maxHp: 12,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                globalSkills: [],
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_qier'));
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(10, 200);
            let liezhiKey = 2;
            let jingliangKey = 2;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) {
            }
            let qishuList = ["xjzh_qishu_fenglangkx", "xjzh_qishu_waxilidedaogao"].randomGet();
            game.xjzh_gainEquip(qishuList, 1);
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;${get.xjzh_qishuTranslate(qishuList)}（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'binchuanjidi': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_liezhiKey") >= 12;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", -12);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_liezhiKey'], 12,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【冰川极地】试炼需要消耗12个“劣质巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>每轮结束时，所有角色获得“冰冻”标记。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机10-200碎片、劣质巢穴钥匙×2、精良巢穴钥匙×2。 \
                <br><li>4级奇术要件“冰封王座”必获。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外完美钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'jushou': {
                name: '冰川极地',
                image: 'xjzh_boss_bingchuanjushou',
                enemies: {
                    6: 'xjzh_boss_bingchuanjushou',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {
                    xjzh_boss_bingchuanjushou: {
                        hp: 24, maxHp: 24,
                    },
                },
                gameDraw: (player) => {
                    if (player == game.boss) return player.maxHp;
                    return 4;
                },
                init: () => { },
                globalSkills: [],
                firstPhase() {
                    return game.findPlayer(target => get.is.playerNames(target, 'xjzh_boss_bingchuanjushou'));
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(10, 200);
            let liezhiKey = 2;
            let jingliangKey = 2;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 20);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) {
            }
            game.xjzh_gainEquip("xjzh_qishu_tianzhibeimin", 1);
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;冰封王座（1个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },
    'tiantangshilian': {
        consumable() {
            return get.xjzh_cailiaoNum("xjzh_cailiao_wanmeiKey") >= 24;
        },
        consumables() {
            game.xjzh_changeCailiao("xjzh_cailiao_wanmeiKey", -24);
        },
        consumableTarnstion: [
            ['xjzh_cailiao_wanmeiKey'], 24,
        ],
        initEntrys(showWindow) {
            var entry = ui.create.div('.xjzh-challengePage-entry', showWindow);
            return [entry];
        },
        initIntro(showWindow) {
            var introButton = ui.create.div('.xjzh-challengePage-introButton', showWindow);
            return introButton;
        },
        intro: `一、前置条件 \
                <br><li>开启【天堂试炼】试炼需要消耗24个“完美巢穴钥匙”。\

            <br><br>二、挑战规则 \
                <br><li>莉莉丝会使用“天堂之怒”技能，对所有敌方角色造成伤害。 \

            <br><br>三、挑战奖励 \
                <br><li>固定奖励：随机50-500碎片、劣质巢穴钥匙×12、精良巢穴钥匙×12、完美巢穴钥匙×6、史诗巢穴钥匙×2、神话巢穴钥匙×1。 \
                <br><li>表现奖励：根据通关表现获得额外奖励（S级额外史诗钥匙）。 \

            <br><br>四、关卡禁用武将 \
                <br><li>《仙家之魂》：${[...Object.values(forbiddenCharacters.tongyong)]} \
        `,
        stage: {
            'tianshi': {
                name: '天堂试炼',
                image: 'xjzh_boss_ttshilian',
                enemies: {
                    7: 'xjzh_boss_xiaotianshi',
                    6: 'xjzh_boss_datianshi',
                    5: 'xjzh_boss_xiaotianshi',
                },
                friends: {
                    0: 'free',
                    1: 'free',
                    2: 'free',
                },
                forbidden: [...Object.keys(forbiddenCharacters.tongyong)],
                replaceCharacterInfo: {},
                gameDraw: (player) => 4,
                init: () => { },
                firstPhase() {
                    return game.findPlayer(target => game.boss == target);
                },
                filters: [
                    () => true,
                ],
                filterIntros: [
                    [...Object.keys(forbiddenCharacters.tongyong)]
                ],
                globalSkills: [],
            },
        },
        onWinner() {
            let suipian = get.rand(50, 500);
            let liezhiKey = 12;
            let jingliangKey = 12;
            let wanmeiKey = 6;
            let shishiKey = 2;
            let shenhuaKey = 1;
            let performance = xjzh_getPerformanceRank({
                charactersAlive: game.countPlayer2(target => !target.side && !target.isDead()),
                turnsUsed: game.turn,
                noDamageRounds: 0,
                specialCondition: false
            }, 25);
            suipian = Math.floor(suipian * performance.multiplier);
            if (performance.extraKey) shishiKey += 1;
            game.xjzh_changeSuipian(suipian);
            game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", liezhiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_jingliangKey", jingliangKey);
            game.xjzh_changeCailiao("xjzh_cailiao_wanmeiKey", wanmeiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_shishiKey", shishiKey);
            game.xjzh_changeCailiao("xjzh_cailiao_shenhuaKey", shenhuaKey);
            let str = `当前模式：${get.translation(get.mode())}<br><br>当前玩家：${get.qishuName()}（${get.translation(get.nameList(game.me)[0])}）<br><br>表现评价：${performance.rank}<br><br>对局奖励：<br>&emsp;&emsp;碎片（${suipian}个）<br>&emsp;&emsp;劣质巢穴钥匙（${liezhiKey}个）<br>&emsp;&emsp;精良巢穴钥匙（${jingliangKey}个）<br>&emsp;&emsp;完美巢穴钥匙（${wanmeiKey}个）<br>&emsp;&emsp;史诗巢穴钥匙（${shishiKey}个）<br>&emsp;&emsp;神话巢穴钥匙（${shenhuaKey}个）`;
            game.xjzh_qishuWinner("奖励结算", str);
        }
    },

};

function packSkills(lib, game, ui, get, ai, _status) {
    /**
     * 挑战模式独有的技能都写在这里
     * @type {SMap<Skill>}
     */
    let skills = {
        /* ----------------挑战角色技能---------------------------- */
        'xjzh_challenge_waershengDamage': {
            trigger: { source: 'damageAfter' },
            ruleSkill: true,
            filter(event, player) {
                let num = 3;
                return !player.side && event.player == game.boss && event.num > num;
            },
            forced: true,
            silent: true,
            async content(event, trigger, player) {
                game.waershengDamage = true;
                game.checkResult();
            }
        },
        'xjzh_challenge_lamasiMaxHs': {
            mod: {
                maxHandcardFinal: (player, num) => player.maxHp,
            },
        },
        'xjzh_challenge_lamasAddPlayer': {
            trigger: { player: 'phaseBefore' },
            direct: true,
            filter(event, player) {
                return !game.hasPlayer(target => target.classList.contains("huanxing"));
            },
            async content(event, trigger, player) {
                let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo"), hunhuoList = [...list.get("isAi"), ...list.get("isPlayer")];
                let addPlayers = hunhuoList.randomGets(2), numList = [5, 7];
                if (!game.hasPlayer2(target => target.classList.contains("huanxing"))) {
                    while (addPlayers.length) {
                        let names = addPlayers.shift();
                        let seatNum = numList.randomRemove();
                        let target = await game.addShFellow(seatNum, names, 4, 3);
                        target.$huanxing();
                    }
                } else {
                    let targets = game.filterPlayer2(target => target.classList.contains("huanxing") && target.isDead());
                    while (addPlayers.length) {
                        let names = addPlayers.shift(), target = targets.shift();
                        await target.changeCharacter([names]);
                        target.$huanxing();
                    }
                }
            }
        },
        'xjzh_challenge_wujinBuffSkill': {
            mod: {
                cardUsable(card, player, num) {
                    let list = game.wujingModeStorage.buff;
                    if (!list) return num;
                    let useNum = list.basicUseNum;
                    if (["sha", "jiu"].includes(get.name(card))) return num + list.basicUseNum;
                },
                maxHandcardFinal(player, num) {
                    let list = game.wujingModeStorage.buff;
                    if (!list) return num;
                    return num + list.maxHandcard;
                },
                selectTarget(card, player, range) {
                    let list = game.wujingModeStorage.buff;
                    let name = get.name(card);
                    if (!list) return;
                    if (range[1] == -1) return;
                    if (game.players.length < 3) return;
                    let num = Math.min(game.players.length - 1, list.selectTargetNum);
                    if (name == 'sha') range[1] += num;
                },
                globalFrom(from, to, distance) {
                    let list = game.wujingModeStorage.buff;
                    if (!list) return distance;
                    return distance - list.globalFromNum;
                },
                globalTo(from, to, distance) {
                    let list = game.wujingModeStorage.buff;
                    if (!list) return distance;
                    return distance + list.globalToNum;
                },
            },
            mode: ["xjzh_challenge"],
            forced: true,
            locked: true,
            popup: false,
            charlotte: true,
            superCharlotte: true,
            fixed: true,
            unique: true,
            priority: 15,
            group: [
                "xjzh_challenge_wujinBuffSkill_damage",
                "xjzh_challenge_wujinBuffSkill_sourceDamage",
                "xjzh_challenge_wujinBuffSkill_talentChangeId",
                "xjzh_challenge_wujinBuffSkill_roundBaiban",
            ],
            subSkill: {
                "damage": {
                    trigger: { player: "damageBegin1" },
                    direct: true,
                    priority: 15,
                    filter(event, player) {
                        let list = game.wujingModeStorage.buff;
                        if (event.numFixed || event.cancelled) return false;
                        if (Boolean(list.damage) == false) return false;
                        return event.num > 0;
                    },
                    async content(event, trigger, player) {
                        let list = game.wujingModeStorage.buff;
                        if (list.damage >= trigger.num) trigger.changeToZero();
                        else trigger.num -= list.damage;
                        player.popup("xjzh_challenge_wujinBuffSkill");
                    },
                    ai: {
                        filterDamage: true,
                        skillTagFilter(player, tag, arg) {
                            if (!Boolean(game.wujingModeStorage.buff.damage)) return false;
                            return true;
                        },
                        effect: {
                            target(card, player, target) {
                                let list = game.wujingModeStorage.buff;
                                let num = list.damage;
                                if (get.is.damageCard(card)) return num > 0 ? -1 : 1;
                            },
                        },
                    },
                },
                "sourceDamage": {
                    trigger: { source: "damageSource" },
                    direct: true,
                    priority: 15,
                    filter(event, player) {
                        if (!event.card || !event.cards.length) return false;
                        let list = game.wujingModeStorage.buff, card = event.card, type = get.type(card);
                        if (event.player == player) return false;
                        if (type == "basic") return Boolean(list.basicDamage);
                        if (type == "trick") return Boolean(list.trickDamage);
                        return false;
                    },
                    async content(event, trigger, player) {
                        let list = game.wujingModeStorage.buff, card = trigger.card, type = get.type(card);
                        let num = type == "basic" ? list.basicDamage : list.trickDamage;
                        trigger.num += num;
                        player.popup("xjzh_challenge_wujinBuffSkill");
                    },
                    ai: {
                        damageBonus: true,
                    },
                },
                "talentChangeId": {
                    trigger: {
                        source: "damageAfter",
                        global: "gameStart",
                    },
                    direct: true,
                    priority: 5,
                    lastDo: true,
                    filter(event, player, name) {
                        let bool = get.xjzh_talentUnlock("wujinshilian", "tB2");
                        if (name == "damageAfter" && !bool && event.player.identity != player.identity && event.player.isAlive()) return Math.random() < get.xjzh_talentReward("wujinshilian", "changeId") / 100 && game.players.length >= 5;
                        if (name == "gameStart" && bool) return game.players.length >= 5;
                        return false;
                    },
                    async content(event, trigger, player) {
                        let name = event.triggername;
                        if (name == "damageAfter") {
                            trigger.player.identity = player.identity;
                            trigger.player.setIdentity(player.identity);
                            trigger.player.side = false;
                            trigger.player.showIdentity();
                            trigger.player.update();
                        } else {
                            let targets = game.filterPlayer(current => current != player && current != game.boss).randomGets(2);
                            targets.forEach(current => {
                                current.identity = player.identity;
                                current.setIdentity(player.identity);
                                current.side = false;
                                current.showIdentity();
                                current.update();
                            });
                        }
                    },
                },
                "roundBaiban": {
                    trigger: {
                        global: "roundStart",
                    },
                    direct: true,
                    priority: 15,
                    filter(event, trigger) {
                        return get.xjzh_talentUnlock("wujinshilian", "tB5-2");
                    },
                    async content(event, trigger, player) {
                        let targets = game.filterPlayer(target => target != player);
                        let num = get.rand(1, targets.length)
                        targets = targets.randomGets(num);
                        targets.forEach(target => {
                            if (Math.random() <= 0.5) target.addTempSkills("baiban", event.triggername)
                        });
                        if (Math.random() <= 0.2) player.addTempSkills("baiban", event.triggername)
                    },
                },
            },
        },

    };
    return skills;
}
const skills = packSkills(lib, game, ui, get, ai, _status);
const translates = {
    "xjzh_challenge_lamasiMaxHs": "亡语",
    "xjzh_challenge_lamasiMaxHs_info": "锁定技，你的手牌上限始终为你的体力上限,你的技能魂火无法唤醒敌方角色。",
    "xjzh_challenge_lamasAddPlayer": "唤灵",
    "xjzh_challenge_lamasAddPlayer_info": "锁定技，你的回合开始，若场上没有你唤醒的角色，则从死灵之书中随机唤醒两个灵魂加入场上。",
    "xjzh_challenge_wujinBuffSkill": "神佑",
    "xjzh_challenge_wujinBuffSkill_info": "无尽模式每通过一关，可选择一项增益加强自身。",

};
const dynamicTranslates = {
    xjzh_challenge_wujinBuffSkill(player) {
        let str = get.skillInfoTranslation("xjzh_challenge_wujinBuffSkill");
        let storage = game.wujingModeStorage, num = storage.level;
        if (num == 1) return str;
        let text = `<br><br>已通过：${num - 1}关，当前处于第${num}关<br><br>已获得加成：`;
        if (storage.buff.basicUseNum > 0) text += `<li>基本牌使用次数+${storage.buff.basicUseNum}`;
        if (storage.buff.basicDamage > 0) text += `<li>基本牌造成伤害+${storage.buff.basicDamage}`;
        if (storage.buff.trickDamage > 0) text += `<li>非延时锦囊牌造成伤害+${storage.buff.trickDamage}`;
        if (storage.buff.damage > 0) text += `<li>受到伤害-${storage.buff.damage}`;
        if (storage.buff.selectTargetNum > 0) text += `<li>【杀】的目标+${storage.buff.selectTargetNum}`;
        if (storage.buff.drawNum > 0) text += `<li>摸牌阶段摸牌数+${storage.buff.drawNum}`;
        if (storage.buff.maxHp > 0) text += `<li>体力上限+${storage.buff.maxHp}`;
        if (storage.buff.maxHandcard > 0) text += `<li>手牌上限+${storage.buff.maxHandcard}`;
        if (storage.buff.globalFromNum > 0) text += `<li>与其他角色计算距离-${storage.buff.globalFromNum}`;
        if (storage.buff.globalToNum > 0) text += `<li>其他角色与你计算距离+${storage.buff.globalToNum}`;
        if (storage.skills.length > 0) text += `<li>技能：${storage.skills.map(skill => `〖${get.translation(skill)}〗`).join('')}`;
        return str + text;
    },
};

//创建新模式
const mode = {
    name: "xjzh_challenge",
    start: function () {
        "step 0"
        //禁止托管
        ui.auto.classList.add('hidden');
        //单人操作
        game.saveConfig("single_control", true, true);

        lib.translate.restart = "返回";
        lib.init.css(lib.assetURL + "layout/mode", "boss");
        game.delay(0.1);
        "step 1"
        var bosslist = ui.create.div("#bosslist.hidden");
        event.bosslist = bosslist;
        lib.setScroll(bosslist);

        if (!lib.config.touchscreen && lib.config.mousewheel) {
            bosslist._scrollspeed = 30;
            bosslist._scrollnum = 10;
            bosslist.onmousewheel = ui.click.mousewheel;
        }

        var onpause = function () {
            ui.window.classList.add("bosspaused");
        };
        var onresume = function () {
            ui.window.classList.remove("bosspaused");
        };
        game.onpause = onpause;
        game.onpause2 = onpause;
        game.onresume = onresume;
        game.onresume2 = onresume;
        ui.create.div(bosslist);

        event.current = null;
        var list = [];
        if (lib.storage.current == undefined) lib.storage.current = "huangjin_zhangjiao";
        var challenges = get.challenges();
        var challenge = get.challengeAndStage(lib.storage.current)[0];
        for (var c in challenges) {
            if (c != challenge) continue;
            for (var stage in challenges[c]['stage']) {
                var info = challenges[c]['stage'][stage];
                if (info.filter && !info.filter()) continue;
                var name = `${c}_${stage}`;

                var player = ui.create.player(bosslist).init(info['image']);
                player._nointro = true;//删除信息描述
                player.setBackground(info['image'], 'character');
                player.name = name;
                player.node.hp.style.display = "none";
                list.push(player);
                player.setIdentity(challenges[c]['stage'][stage]['name']);
                //这里可以调整名字颜色
                // player.node.identity.dataset.color = info[5];

                player.classList.add("bossplayer");

                if (lib.storage.current == name) {
                    event.current = player;
                    player.classList.add("highlight");
                }

            }
        }
        if (!list.length) {
            alert("没有可选择的升华试炼");
            event.finish();
            lib.init.onfree();
            _status.over = true;
            //跳转到身份模式
            game.saveConfig("mode", "identity");
            game.reload();
            return;
        }
        if (!event.current) {
            event.current = bosslist.childNodes[1];
            event.current.classList.add("highlight");
        }
        ui.create.div(bosslist);
        ui.create.cardsAsync();
        game.finishCards();
        game.addGlobalSkill("autoswap");
        ui.arena.setNumber(8);
        ui.control.style.transitionProperty = "opacity";
        ui.control.classList.add("bosslist");
        setTimeout(function () {
            ui.control.style.transitionProperty = "";
        }, 1000);

        ui.window.appendChild(bosslist);

        setTimeout(function () {
            if (event.current) {
                var left = event.current.offsetLeft - (ui.window.offsetWidth - 180) / 2;
                if (bosslist.scrollLeft < left) {
                    bosslist.scrollLeft = left;
                }
            }
            bosslist.show();
        }, 200);
        game.me = ui.create.player();

        game.chooseCharacter(function (target) {
            if (event.current) {
                event.current.classList.remove("highlight");
            }
            event.current = target;
            game.save("current", target.name);
            target.classList.add("highlight");
            if (_status.event.checkList) _status.event.checkList();
        });
        "step 2"
        var info = get.stageInfo(event.current.name);
        var [challenge, stage] = get.challengeAndStage(event.current.name);
        game.stageInfo = {
            challenge: challenge,
            stage: stage,
        };
        for (var i in info) {
            game.stageInfo[i] = info[i];
        }

        setTimeout(function () {
            ui.control.classList.remove("bosslist");
        }, 500);
        if (info.replaceCharacterInfo) {
            for (let id in info.replaceCharacterInfo) {
                if (!lib.character[id]) continue;
                if (info.image == "xjzh_diablo_lamasi") Object.assign(lib.character[id], info.replaceCharacterInfo[id]);
            }
        }

        game.challengers = [];
        var i = 0;
        for (var position in info.friends) {
            var player = ui.create.player();
            player.getId();
            var name = info.friends[position];
            if (name == 'free') {
                game.challengers.push(player);
                player.init(result.links[i++]).addTempClass('start');
            } else {
                player.init(name).addTempClass('start');
            }
            player.setIdentity(" ");
            player.identity = "fan";
            player.dataset.identity = 'friend';//用于身份牌
            player.side = false;
            game.players.push(player);
            player.dataset.position = parseInt(position);
            ui.arena.appendChild(player);
        }

        for (var position in info.enemies) {
            var player = ui.create.player();
            player.getId();
            player.init(game.stageInfo.enemies[position]);
            player.addTempClass("start");
            if (position == 6) {
                player.setIdentity(" ");
                player.identity = "zhu";
                game.boss = player;
                player.dataset.identity = 'enemy_boss';//用于身份牌
            } else {
                player.setIdentity(" ");
                player.identity = "zhong";
                player.dataset.identity = 'enemy';//用于身份牌
            }
            player.side = true;
            game.players.push(player);

            var num = parseInt(position);
            player.dataset.position = num;

            ui.arena.appendChild(player);
        }

        if (info.globalSkills) {
            for (var i of info.globalSkills) game.addGlobalSkill(i);
        }

        ui.create.me();

        ui.fakeme = ui.create.div(".fakeme.avatar", ui.me);
        ui.fakeme.style.display = "none";

        event.bosslist.delete();

        game.arrangePlayers();
        for (var position = 0; position < game.players.length; position++) {
            game.players[position].node.action.innerHTML = "行动";
        }

        if (get.storageMode() == "wujinshilian_wujing") {
            let wujinObject = {
                level: 0,
                coin: game.getExtensionConfig("仙家之魂", "xjzh_challengeAllCoin") == true ? 999 : 6,
                revive: 5,
                name: get.nameList(game.me)[0],
                sourceDieNum: 0,
                copyCardsNum: 0,
                nickName: typeof get.xjzh_qishuUserName() == "string" ? get.xjzh_qishuUserName() : typeof lib.config.connect_nickname == "string" ? typeof lib.config.connect_nickname : "无名玩家",
                buff: {
                    "basicUseNum": 0,
                    "basicDamage": 0,
                    "trickDamage": 0,
                    "damage": 0,
                    "selectTargetNum": 0,
                    "drawNum": 0,
                    "maxHp": 0,
                    "maxHandcard": 0,
                    "globalFromNum": 0,
                    "globalToNum": 0,
                },
                originSkills: [...game.me.getSkills(null, false, false).filter(skill => skill != "xjzh_challenge_wujinBuffSkill")],
                buffList: [],
                skills: [],
                shop: {
                    buff: [],
                    skill: [],
                },
            }
            game.wujingModeStorage = wujinObject;
            if (!game.getExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData")) game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
        }

        if (info.init) {
            info.init();
        }
        lib.setPopped(
            ui.create.system(info.name, null, true, true),
            () => {
                let dialog = ui.create.dialog("hidden");
                let info = game.stageInfo;
                let { filters, filterIntros } = info;
                let str = '';
                for (let i = 0; i < filterIntros.length; i++) {
                    let filter = filters[i - 1], intro = filterIntros[i];
                    if (Array.isArray(intro)) {
                        dialog.add(`模式禁用武将`);
                        dialog.addSmall([intro, 'character'], false);
                    } else {
                        if (typeof filter != 'function' || filter()) {
                            str += `<li>${intro}`;
                        }
                        else {
                            str += `<li><span style="opacity:0.5">${intro}</span>`;
                        }
                    }
                }
                dialog.add(`胜利规则`);
                dialog.add('<div class="text center">' + str + "</div>");
                dialog.add(ui.create.div(".placeholder"));
                return dialog;
            },
            220
        );
        "step 3"
        let players = game.filterPlayer(target => target.side == true);
        players.forEach(target => {
            if (target.node.hasOwnProperty("xjzh_equipQishus")) {
                target.node.xjzh_equipQishus.hide();
                delete target.node.xjzh_equipQishus;
            }
        });

        event.trigger("gameStart");

        game.xjzh_setChallengePile();

        game.gameDraw(game.me, game.stageInfo.gameDraw || 4);
        for (let target of get.players()) {
            game.triggerEnter(target);
        }
        "step 4"
        if (get.storageMode() != "wujinshilian_wujing") event.goto(8);
        else {
            event.luckCardNum = 3;
            let saveData = game.getExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData");
            if (Object.keys(saveData)?.length) {
                let ret = confirm(`检测到有未结算的对局，是否加载？`)
                if (ret) event.goto(10);
                else game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
            }
        }
        "step 5"
        if (event.luckCardNum <= 0) event.goto(8);
        event.dialog = ui.create.dialog(`是否使用手气卡？还剩${event.luckCardNum}次！`);
        ui.create.confirm("oc");
        event.custom.replace.confirm = function (bool) {
            _status.event.bool = bool;
            game.resume();
        };
        "step 6"
        _status.imchoosing = true;
        event.switchToAuto = function () {
            _status.event.bool = false;
            game.resume();
        };
        game.pause();
        "step 7"
        _status.imchoosing = false;
        if (event.bool) {
            var hs = game.me.getCards("h");
            game.addVideo("lose", game.me, [get.cardsInfo(hs), [], [], []]);
            for (var i = 0; i < hs.length; i++) {
                hs[i].discard(false);
            }
            game.me.directgain(get.cards(hs.length));
            event.luckCardNum--;
            event.goto(5);
        } else {
            if (event.dialog) event.dialog.close();
            if (ui.confirm) ui.confirm.close();
        }
        "step 8"
        game.me._start_cards = game.me.getCards("h");
        const bannedSkills = get.bannedSkills();
        if (bannedSkills.length) {
            bannedSkills.forEach(skill => {
                lib.skill[skill] = {};
                lib.translate[skill + `_info`] = `此模式下不可用`;
            });
        }
        "step 9"
        game.phaseLoop(game.stageInfo.firstPhase?.() || game.challengers[0]);
        setTimeout(function () {
            ui.updatehl();
        }, 200);

        game.challenge_reviveNumbers = 0;

        var challenges = get.challenges(), challenge = challenges[game.stageInfo.challenge], qishuName = get.qishuName();
        if (challenge.consumables && typeof challenge.consumables == 'function') {
            if (challenge.consumable()) {
                let lists = challenge.consumableTarnstion, list = lists[0].slice(0);
                let str = `<span style="color: #FFD700;">${qishuName ? qishuName : "无名玩家"}</span>消耗了`;
                if (Array.isArray(list)) {
                    if (list.length === 1) str += `<span style="color: #008000;">${lists[1]}</span>个<span style="color: #0000FF;">${get.xjzh_cailiaoTranslate(list[0])}</span>`;
                    else {
                        let translatedItems = list.map(item => `<span style="color: #0000FF;">${get.xjzh_cailiaoTranslate(item)}</span>`);
                        let joinedItems = translatedItems.slice(0, -1).join('、');
                        if (translatedItems.length > 0) {
                            str += joinedItems;
                            if (translatedItems.length > 1) {
                                str += '、';
                            }
                            str += translatedItems[translatedItems.length - 1];
                        }
                        str += `各<span style="color: #008000;">${lists[1]}</span>个`;
                    }
                }
                str += `开启了<span style="color: #800080;">${get.translation(game.stageInfo.name)}</span>升华试炼`;
                game.log(str);
                challenge.consumables();
            }
            else {
                alert('材料不足');
                game.over(false);
                return;
            }
        }
        event.finish();
        "step 10"
        game.loadWujinGameSave();
        event.goto(5);
    },
    element: {
        player: {
            dieAfter() {
                const isEndlessMode = get.storageMode() === "wujinshilian_wujing";
                const canRevive = game.challengers.includes(this) && game.challenge_reviveNumbers < 10;

                if (isEndlessMode) {
                    if (this.side) {
                        game.wujingModeStorage.sourceDieNum++;
                        if (!game.hasPlayer(target => target.side)) {
                            // game.playAudio(`ext:仙家之魂/other/music/win.mp3`);
                            game.updateChallengeLevel(1, true);
                            game.continueToWujin(true);
                        }
                        return;
                    }
                    else {
                        game.wujingModeStorage.revive--;
                        game.wujingModeStorage.coin += 3;
                        //  game.playAudio(`ext:仙家之魂/other/music/defeat.mp3`);
                        if (game.wujingModeStorage.revive <= 0) {
                            game.updateWuJinSaveData();
                            game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
                            let info = game.stageInfo;
                            game.winnerStage(info.challenge);
                            game.over(false);
                        } else {
                            game.continueToWujin();
                        }
                        return;
                    }
                } else if (canRevive) {
                    game.reviveConfirmg.call(this);
                } else {
                    const shouldCheckResult = !game.hasPlayer(current => game.challengers.includes(current), true) ||
                        !game.hasPlayer(current => current.side, true) ||
                        this === game.boss;
                    if (shouldCheckResult) game.checkResult();
                }
            },
            dieAfter2(source) {
                if (get.storageMode() != "wujinshilian_wujing") return;
                if (this.isOut() || source?.isDead()) return;
                if (source) {
                    if (source.identity != this.identity) {
                        source.draw(2);
                    }
                } else {
                    game.delay();
                }
            },
            isUnderControl(self, me) {
                me = me || game.me;
                var that = this?._trueMe || this;
                if (that.isMad() || game.notMe) return false;

                // game.me: self为true时返回true（显示手牌等），否则返回false（不受AI控制）
                if (this === me || that === me) {
                    if (self) return true;
                    return false;
                }

                // 其他玩家由AI控制
                return false;
            },
        },
    },
    card: {},
    characterPack: {},
    cardPack: {},
    init: function () {
    },
    game: {
        xjzh_getCardsFromPacks(packNames) {
            let cards = [];
            for (let packName of packNames) {
                if (lib.cardPack[packName]) {
                    cards = cards.concat(lib.cardPack[packName]);
                }
            }
            return cards.toUniqued();
        },
        xjzh_setChallengePile() {
            if (!game._xjzh_originalInpile) {
                // 保存原始卡牌池、卡牌列表和物理牌堆
                game._xjzh_originalInpile = lib.inpile.slice();
                game._xjzh_originalCardList = lib.card.list.slice();
                game._xjzh_originalCardPileHTML = ui.cardPile.innerHTML;

                // 从指定卡牌包构建新卡牌池
                const challengeCardPack = ["xjzh_Card", "standard", "extra"];
                const allowedCards = this.xjzh_getCardsFromPacks(challengeCardPack);
                console.log("升华试炼允许的卡牌包:", challengeCardPack);
                console.log("升华试炼卡牌池:", allowedCards.length, "张卡");

                // 过滤 lib.card.list，只保留允许的卡牌
                lib.card.list = lib.card.list.filter(card => allowedCards.includes(card[2]));
                console.log("过滤后 card.list:", lib.card.list.length, "张卡");

                // 清空物理牌堆
                ui.cardPile.innerHTML = '';
                lib.inpile = [];

                // 重建物理牌堆和卡牌池
                for (var i = 0; i < lib.card.list.length; i++) {
                    if (lib.card[lib.card.list[i][2]]) {
                        lib.inpile.add(lib.card.list[i][2]);
                        if (lib.card.list[i][2] == "sha" && lib.card.list[i][3]) {
                            lib.inpile_nature.add(lib.card.list[i][3]);
                        }
                        ui.create.card(ui.cardPile).init(lib.card.list[i]);
                    }
                }
                console.log("重建后 inpile:", lib.inpile.length, "张卡");
                console.log("重建后 cardPile:", ui.cardPile.childNodes.length, "张卡");

                // 注册游戏结束回调，恢复卡牌池
                lib.onover.push(() => {
                    if (game._xjzh_originalInpile) {
                        lib.inpile = game._xjzh_originalInpile;
                        game._xjzh_originalInpile = null;
                    }
                    if (game._xjzh_originalCardList) {
                        lib.card.list = game._xjzh_originalCardList;
                        game._xjzh_originalCardList = null;
                    }
                    if (game._xjzh_originalCardPileHTML) {
                        ui.cardPile.innerHTML = game._xjzh_originalCardPileHTML;
                        game._xjzh_originalCardPileHTML = null;
                        console.log("已恢复原始 cardPile");
                    }
                });
            }
        },
        reserveDead: true,
        async hookConfirmg(...args) {
            game.pause();
            let str, okCallback, cancelCallback;
            for (let arg of args) {
                if (typeof arg == "string") str = arg;
                else if (typeof arg == "function") {
                    if (!okCallback) okCallback = arg;
                    else cancelCallback = arg;
                }
            }

            let dialog = ui.create.dialog(str);
            const confirmButton = ui.create.confirm("oc");

            if (ui.confirm && ui.confirm.node) {
                const { ok, cancel } = ui.confirm.node;

                if (ok && typeof okCallback === 'function') {
                    ok.onclick = async () => {
                        await okCallback();
                        game.resume();
                        if (ui.confirm) {
                            ui.confirm.close();
                            delete ui.confirm;
                        }
                        if (dialog) {
                            dialog.close();
                        }
                    };
                }

                if (cancel && typeof cancelCallback === 'function') {
                    cancel.onclick = async () => {
                        game.resume();
                        if (ui.confirm) {
                            ui.confirm.close();
                            delete ui.confirm;
                        }
                        if (dialog) {
                            dialog.close();
                        }
                        await cancelCallback();
                    };
                }
            }

        },
        async loadWujinGameSave() {
            let saveData = game.getExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData");
            let storage = game.wujingModeStorage;
            let saveDatas = Object.assign({ ...storage }, { ...saveData });
            game.wujingModeStorage = { ...saveDatas };
            game.updateChallengeLevel(false);

            ui.arena.setNumber(8);

            let saves = game.wujingModeStorage;
            let players = saves.player;

            let list = game.xjzh_wujiangpai().filter(name => name != storage.name);


            let target = game.me;
            game.xjzh_clearRestraint(target);
            target.loseToDiscardpile(target.getCards("hej"));
            target.changeCharacter([players]);

            let skills = [...saves.originSkills, ...saves.skills].toUniqued();
            if (!target.hasSkill("xjzh_challenge_wujinBuffSkill")) skills.add("xjzh_challenge_wujinBuffSkill");
            await target.addSkills(skills);
            let characters = get.character(players)
            let num = storage.buff.maxHp, maxHpNum = characters.maxHp + num;
            target.maxHp = maxHpNum;
            target.hp = characters.hp;
            target.update();

            let bossNames = list.randomRemove();
            game.changeBoss(bossNames);

            let levelToSeat = {
                1: 6,
                2: 5,
                3: 7,
                4: 4,
                5: 3,
                6: 2
            };

            let targetsNum = Math.max(1, saves.level > 6 ? 6 : saves.level);
            for (let i = 2; i <= targetsNum; i++) {
                let player = ui.create.player();
                let names = list.randomRemove();
                let seatNum = levelToSeat[i];
                player.getId();
                player.init(names).addTempClass('start');
                player.setIdentity(" ");
                player.identity = "zhong";
                player.dataset.identity = 'enemy';
                player.side = true;
                player.dataset.position = parseInt(seatNum);
                game.players.push(player);
                ui.arena.appendChild(player);
                player.update();
            }

            game.arrangePlayers();

            let targets = game.filterPlayer2(current => {
                if (!current.side) return false;
                return true;
            }).sortBySeat(game.me);
            if (targets?.length) {
                let num = 2;
                targets.forEach(i => {
                    i.setSeatNum(num);
                    num++;
                });
            }


            game.resetSkills();
            game.phaseNumber = 0;
            game.roundNumber = 0;
            if (game.bossinfo) {
                game.bossinfo.loopType = 1;
            }
            if (_status.brawl) _status.brawl = undefined;

            let levelNum = Math.min(4, Math.floor(game.wujingModeStorage.level / 4));
            if (levelNum > 0) await game.copyToCardsPile(levelNum);

            await game.delay(1);

            game.syncState();
            get.event().trigger("gameStart");

            game.xjzh_setChallengePile();

            game.gameDraw(game.me, game.stageInfo.gameDraw || 4);

            for (let target of get.players()) {
                game.triggerEnter(target);
            }

            await game.delay(1);

            if (saves.level >= 5) {
                let targets = game.filterPlayer2(current => {
                    if (!current.side) return false;
                    return true;
                }).sortBySeat(game.me);
                let skillsNum = Math.max(1, Math.min(10, saves.level - 4));
                let drawNum = Math.min(20, 2 + (saves.level - 5) * 2);
                if (targets?.length) {
                    targets.forEach(i => {
                        i.xjzh_addRandomSkill(skillsNum, false);
                        i.directgain(get.cards(drawNum));
                        i.maxHp += Math.abs(Math.floor(drawNum));
                        i.hp = i.maxHp;
                        i.update();
                    });
                }
            }

            game.broadcastAll(ui.clear);
            game.washCard();
            game.updateRoundNumber();
            game.phaseLoop(game.me);

            ui.dialog.close();
            game.resume();

            game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
        },
        async continueToWujin(types = false) {
            'step 0'
            let saveData = {
                player: get.nameList(game.me)[0],
            };
            let saveDatas = Object.assign({ ...saveData }, { ...game.wujingModeStorage });
            game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", saveDatas);
            //背景音乐暂停
            ui.backgroundMusic.pause();
            //游戏暂停
            game.pause();
            "step 1"
            //清除无名美化的一些特效
            if (typeof game.wjmh_canliutexiao == "function") game.wjmh_canliutexiao();

            for (const player of game.players) {
                if (player.hasOwnProperty('stopDynamic')) {
                    player.stopDynamic();
                }
                let dynamic = player.dynamic;
                let deputy = player.dynamic?.deputy;
                let primary = player.dynamic?.primary;
                if (!dynamic) continue;
                primary = !!primary;
                deputy = !!deputy;
                if (primary && dynamic.primary) {
                    dynamic.stop(dynamic.primary);
                    dynamic.primary = null;
                } else if (deputy && dynamic.deputy) {
                    dynamic.stop(dynamic.deputy);
                    dynamic.deputy = null;
                } else if (!primary && !deputy) {
                    dynamic.stopAll();
                    dynamic.primary = null;
                    dynamic.deputy = null;
                }
                if (!dynamic.primary && !dynamic.deputy) {
                    player.classList.remove('d-skin', 'd-skin2');
                    player.$dynamicWrap?.remove();
                }
                skinSwitch.cleanupAfterStopDynamic(player, primary, deputy);
            }
            if (ui.auto.classList.contains("hidden")) ui.auto.classList.remove("hidden")
            ui.arenalog.innerHTML = '';
            ui.historybar.innerHTML = '';
            ui.sidebar.innerHTML = '';
            ui.sidebar3.innerHTML = '';
            'step 2'
            var home = ui.create.div('.xjzh_wujinHomePage');
            document.body.appendChild(home);
            var homeBody = ui.create.div('.xjzh_wujinHomePageBody', home);
            var setStateSize = function () {
                var screenWidth = ui.window.offsetWidth;
                var screenHeight = ui.window.offsetHeight;
                var whr = 2.0;
                var width;
                var height;
                if (screenWidth / whr > screenHeight) {
                    height = screenHeight;
                    width = height * whr;
                } else {
                    width = screenWidth;
                    height = screenWidth / whr;
                }
                homeBody.style.height = Math.round(height) + "px";
                homeBody.style.width = Math.round(width) + "px";
                homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
            };
            setStateSize();
            var reStatesize = function () {
                setTimeout(setStateSize, 500);
            };
            lib.onresize.push(reStatesize);
            home.delete();
            lib.onresize.remove(reStatesize);
            'step 3'
            if (ui.thrown && ui.thrown.length > 0) {
                for (var i = 0; i < ui.thrown.length; i++) {
                    ui.thrown[i].remove();
                }
            }
            document.querySelectorAll('.skill-dialog').forEach(el => {
                el.remove();
            });
            //不知道会不会出其他bug
            if (lib.skill._changeJudges) {
                let ss = document.querySelector(".skill-control");
                ss.removeChild(game.me.node.judges)
            };
            ui.clear();
            ui.mebg.remove();
            ui.me.remove();
            ui.handcards1Container.remove();
            ui.handcards2Container.remove();
            if (window.dui) {
                ui.equipSolts.remove();
            }
            function clearSLBuff() {
                var buffDesc = document.querySelectorAll(".SLBuffDesc");
                if (buffDesc.length > 0) {
                    for (const ele of buffDesc) {
                        ele.parentNode.removeChild(ele);
                    }
                }
                var ssui = document.getElementsByClassName("skill-control");
                var buffs = ssui.length > 0 ? document.querySelectorAll(".playerbuffstyle2") : document.querySelectorAll(".playerbuffstyle3");
                if (buffs.length > 0) {
                    for (const buff of buffs) {
                        buff.parentNode.removeChild(buff);
                    }
                }
            }
            clearSLBuff();
            let players = game.players.concat(game.dead);
            for (var i = 0; i < players.length; i++) {
                (function (player) {
                    if (player.jiubuff) {
                        player.jiubuff.forEach(function (i) {
                            txcsanm.hstop(i);
                        });
                        delete player.jiubuff;
                    }
                    if (player.node.jiu) {
                        player.node.jiu.delete();
                        player.node.jiu2.delete();
                        delete player.node.jiu;
                        delete player.node.jiu2;
                    }
                    let cards = player.getCards('hesjx');
                    player.loseToDiscardpile(cards).set('log', false).set('_triggered', null);
                    player.clearSkills(true);
                    game.removePlayerOL(player);
                })(players[i]);
            }
            'step 4'
            game.shuffleNumber = 0;
            'step 5'
            game.delay();
            game.createWujinShop(types);
        },
        async copyToCardsPile(num) {
            if (typeof num != "number") num = 1;
            let cards = Array.from(ui.cardPile.childNodes), copyCards = [];

            if (game.wujingModeStorage.copyCardsNum >= 4) return;

            game.wujingModeStorage.copyCardsNum += num;

            while (num > 0) {
                cards.forEach(card => copyCards.push(game.createCard2(card)));
                num--;
            }
            await game.cardsGotoPile(copyCards, "triggeronly", "washCard", ["shuffleNumber", 1]);
            game.updateRoundNumber();
        },
        async startToWujin() {
            //背景音乐播放
            ui.backgroundMusic.play();

            let storage = game.wujingModeStorage;
            let list = game.xjzh_wujiangpai().filter(name => name != storage.name);

            let player = ui.create.player();
            player.getId();
            player.init(storage.name).addTempClass('start');
            game.me = player;
            player.setIdentity(" ");
            player.identity = "fan";
            player.dataset.identity = 'friend';
            player.side = false;

            player.dataset.position = parseInt(0);
            player.setSeatNum(1);

            game.players.push(player);
            ui.arena.appendChild(player);

            ui.create.me();
            let characters = get.character(get.nameList(player)[0]);
            let skills = [...storage.originSkills, ...storage.skills].toUniqued();
            if (!player.hasSkill("xjzh_challenge_wujinBuffSkill")) skills.add("xjzh_challenge_wujinBuffSkill");
            await player.addSkills(skills.filter(skill => !player.hasSkill(skill)));
            player.refreshSkill();
            //let skinName = get.nameList(target)[0];
            //player.setAvatar(skinName, skinName);
            let num = storage.buff.maxHp, maxHpNum = characters.maxHp + num;
            player.maxHp = maxHpNum;
            player.hp = characters.hp;
            game.xjzh_clearRestraint(player);

            let levelToSeat = {
                1: 6,
                2: 5,
                3: 7,
                4: 4,
                5: 3,
                6: 2
            };

            let targetsNum = Math.max(1, storage.level > 6 ? 6 : storage.level);
            for (let i = 1; i <= targetsNum; i++) {
                let target = ui.create.player();
                let names = list.randomRemove();
                let seatNum = i == 1 ? 6 : levelToSeat[i];
                target.getId();
                target.init(names).addTempClass('start');
                if (seatNum == 6) {
                    target.setIdentity(" ");
                    target.identity = "zhu";
                    game.boss = target;
                    target.dataset.identity = 'enemy_boss';
                } else {
                    target.setIdentity(" ");
                    target.identity = "zhong";
                    target.dataset.identity = 'enemy';
                }

                target.side = true;
                target.dataset.position = parseInt(seatNum);
                game.players.push(target);
                ui.arena.appendChild(target);
                target.update();
            }


            ui.arena.setNumber(8)
            game.arrangePlayers();

            let targets = game.filterPlayer2(current => {
                if (!current.side) return false;
                return true;
            }).sortBySeat(game.me);
            if (targets?.length) {
                let num = 2;
                targets.forEach(i => {
                    i.setSeatNum(num);
                    num++;
                });
            }

            game.resetSkills();
            game.phaseNumber = 0;
            game.roundNumber = 0;
            if (game.bossinfo) {
                game.bossinfo.loopType = 1;
            }
            if (_status.brawl) _status.brawl = undefined;

            if ([4, 8, 12, 16].includes(game.wujingModeStorage.level)) await game.copyToCardsPile();

            await game.delay(1);

            game.syncState();
            get.event().trigger("gameStart");

            game.xjzh_setChallengePile();

            game.gameDraw(game.me, game.stageInfo.gameDraw || 4);

            for (let target of get.players()) {
                game.triggerEnter(target);
            }

            await game.delay(1);
            let luckCardNum = 3;
            while (luckCardNum > 0) {
                const result = await game.me.chooseControl("ok", "cancel2")
                    .set('prompt', `是否使用手气卡？还剩${luckCardNum}次！`)
                    .forResult();
                if (result?.control != "cancel2") {
                    let hs = game.me.getCards("h");
                    game.addVideo("lose", game.me, [get.cardsInfo(hs), [], [], []]);
                    for (let i = 0; i < hs.length; i++) {
                        hs[i].discard(false);
                    }
                    game.me.directgain(get.cards(4));
                    luckCardNum--;
                } else break;
            }

            if (storage.level >= 5) {
                let skillsNum = Math.max(1, Math.min(10, storage.level - 4));
                let drawNum = Math.min(20, 2 + (storage.level - 5) * 2);
                if (targets?.length) {
                    targets.forEach(i => {
                        i.xjzh_addRandomSkill(skillsNum, false);
                        i.directgain(get.cards(drawNum));
                        i.maxHp += Math.abs(Math.floor(drawNum));
                        i.hp = i.maxHp;
                        i.update();
                    });
                }
            }

            game.broadcastAll(ui.clear);
            game.washCard();
            game.updateRoundNumber();
            game.phaseLoop(game.me);
        },
        async createWujinShop(types = false) {
            const home = ui.create.div('.xjzh_wujinHomeBgPage');
            document.body.appendChild(home);
            if (!_status.choiceShop || !_status.choiceType) {
                _status.choiceShop = undefined;
                _status.choiceType = undefined;
            }
            const homeBody = ui.create.div('.xjzh_wujinHomeBg', home);
            let onHomeSize = function () {
                let screenWidth = ui.window.offsetWidth;
                let screenHeight = ui.window.offsetHeight;
                let whr = 2.05;
                let width;
                let height;
                if (screenWidth / whr > screenHeight) {
                    height = screenHeight;
                    width = height * whr;
                } else {
                    width = screenWidth;
                    height = screenWidth / whr;
                }
                homeBody.style.height = Math.round(height) + "px";
                homeBody.style.width = Math.round(width) + "px";
                homeBody.style.transform = 'translate(-50%,-50%) scale(0.9)';
            };
            onHomeSize();
            let setHomesize = function () {
                setTimeout(onHomeSize, 500);
            };
            lib.onresize.push(setHomesize);
            const buffList = [
                { name: '连发', info: '基本牌使用次数+1', skill: 'basicUseNum' },
                { name: '强攻', info: '基本牌造成伤害+1', skill: 'basicDamage' },
                { name: '智识', info: '非延时锦囊牌造成伤害+1', skill: 'trickDamage' },
                { name: '灵护', info: '受到伤害-1', skill: 'damage' },
                { name: '余箭', info: '【杀】的目标+1', skill: 'selectTargetNum' },
                { name: '誓约', info: '摸牌阶段摸牌数+1', skill: 'drawNum' },
                { name: '命归', info: '体力上限+1', skill: 'maxHp' },
                { name: '微光', info: '手牌上限+1', skill: 'maxHandcard' },
                { name: '轻袭', info: '与其他角色计算距离-1', skill: 'globalFromNum' },
                { name: '铁壁', info: '其他角色与你计算距离+1', skill: 'globalToNum' },
            ];
            const body = ui.create.div('.xjzh_wujinHomeBg2', homeBody);
            const textBody = ui.create.div('.xjzh_wujinLevelText', `第${game.wujingModeStorage.level}关`, body);
            const topBar = ui.create.div('.xjzh_layout_bar', body);
            const leftTop = ui.create.div('.xjzh_layout_left', topBar);
            const rightTop = ui.create.div('.xjzh_layout_right', topBar);
            ui.create.div('.xjzh_layout_achievementbutton', leftTop, () => game.xjzhAchi.openAchievementMainPage());
            ui.create.div('.xjzh_layout_recordbutton', leftTop, () => game.showWujinDataSave());
            const topCoin = ui.create.div('.xjzh_layout_coin', `${game.wujingModeStorage.coin}`, rightTop, () => console.log('点击道韵'));
            const leftBody = ui.create.div('.xjzh_wujinDataLeftBody', body);
            const rightBody = ui.create.div('.xjzh_wujinDataRightBody', body);
            function funcBuff(shop, str, str2) {
                const icon = (function () {
                    let clickPrompt;
                    if (str == 'buff') {
                        clickPrompt = ui.create.div('.xjzh_wujinDataBuffIcon', shop.name);
                        clickPrompt.setBackgroundImage(`extension/仙家之魂/css/images/wujinMode/bufficon.png`);
                    } else if (str == 'skill') {
                        clickPrompt = ui.create.div('.xjzh_wujinDataBuffIcon', get.translation(shop));
                        clickPrompt.setBackgroundImage(`extension/仙家之魂/css/images/wujinMode/skillicon.png`);
                    }
                    clickPrompt.choiced = function () {
                        leftBody.choosingNow = this;
                        clickPrompt.style.boxShadow = '-5px 0px 5px rgba(255,255,0,0.75),0px -5px 5px rgba(255,255,0,0.75),5px 0px 5px rgba(255,255,0,0.75),0px 5px 5px rgba(255,255,0,0.75)';
                    };
                    clickPrompt.noChoiced = function () {
                        leftBody.choosingNow = null;
                        clickPrompt.style.boxShadow = 'none';
                    };

                    clickPrompt.addEventListener("click", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        let query = document.querySelector('.xjzh_wujinBuffInfo');
                        if (leftBody.choosingNow) {
                            leftBody.choosingNow.noChoiced();
                        }
                        _status.choiceShop = shop;
                        _status.choiceType = str;
                        if (query) {
                            if (query.innerHTML.includes(shop.name) || query.innerHTML.includes(get.translation(shop))) {
                                query.remove();
                            } else {
                                query.innerHTML = `
                            <p class="buff-name">${str == 'buff' ? '加成' : '技能'}【${str == 'buff' ? (shop.name || '未知Buff') : (get.translation(shop) || '未知技能')}】</p>
                            <p class="buff-info">${str == 'buff' ? (shop.info || '暂无描述') : (lib.translate[shop + "_info"] || '暂无描述')}</p>
                            `;
                                this.choiced();
                                clickPrompt.style.boxShadow = '-5px 0px 5px rgba(0,255,0,0.75),0px -5px 5px rgba(0,255,0,0.75),5px 0px 5px rgba(0,255,0,0.75),0px 5px 5px rgba(0,255,0,0.75)';
                            }
                        } else {
                            this.choiced();
                            clickPrompt.style.boxShadow = '-5px 0px 5px rgba(0,255,0,0.75),0px -5px 5px rgba(0,255,0,0.75),5px 0px 5px rgba(0,255,0,0.75),0px 5px 5px rgba(0,255,0,0.75)';
                            let desc = ui.create.div('.xjzh_wujinBuffInfo');
                            desc.style[str2] = '53%';
                            desc.innerHTML = `
                            <p class="buff-name">${str == 'buff' ? '加成' : '技能'}【${str == 'buff' ? (shop.name || '未知Buff') : (get.translation(shop) || '未知技能')}】</p>
                            <p class="buff-info">${str == 'buff' ? (shop.info || '暂无描述') : (lib.translate[shop + "_info"] || '暂无描述')}</p>
                            `;
                            body.appendChild(desc);
                        }
                        return false;
                    });
                    return clickPrompt;
                })();
                return icon;
            }

            let icon0 = (function () {
                let clickPrompt = ui.create.div('.xjzh_wujinDataIcon.xjzh_wujinDataIcon0', '刷新', leftBody);
                clickPrompt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    let coin = game.wujingModeStorage.coin;
                    if (coin < 1) {
                        game.messageToPopup('道韵不足');
                        return;
                    } else {
                        game.wujingModeStorage.coin -= 1;
                        topCoin.innerHTML = game.wujingModeStorage.coin;
                        _status.choiceShop = undefined;
                        _status.choiceType = undefined;
                        let query = document.querySelector('.xjzh_wujinBuffInfo');
                        document.querySelectorAll('.xjzh_wujinDataBuffIcon').forEach(el => {
                            el.noChoiced();
                        });
                        if (query) {
                            query.remove();
                        }
                        upShop('up');
                        game.messageToPopup('刷新成功');
                    }
                    return false;
                });
                return clickPrompt;
            })();
            let icon1 = (function () {
                let clickPrompt = ui.create.div('.xjzh_wujinDataIcon.xjzh_wujinDataIcon1', '购买', leftBody);
                clickPrompt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    let coin = game.wujingModeStorage.coin;
                    if (_status.choiceShop) {
                        if (coin < 3) {
                            game.messageToPopup('道韵不足');
                            return;
                        } else {
                            game.wujingModeStorage.coin -= Math.random() <= get.xjzh_talentReward("wujinshilian", "notConsume") / 100 ? 0 : get.xjzh_talentUnlock("wujinshilian", "tB5-1") ? 3 + get.xjzh_talentReward("wujinshilian", "consume") : 3;
                            topCoin.innerHTML = game.wujingModeStorage.coin;
                            if (_status.choiceType == 'buff') {
                                game.wujingModeStorage.buff[_status.choiceShop.skill]++;
                                game.wujingModeStorage.buffList.push(_status.choiceShop);
                                game.wujingModeStorage.shop.buff.remove(_status.choiceShop);
                                upBuffBodyDiv('buff');
                            } else {
                                game.wujingModeStorage.skills.push(_status.choiceShop);
                                game.wujingModeStorage.shop.skill.remove(_status.choiceShop);
                                upBuffBodyDiv('skill');
                            }
                            _status.choiceShop = undefined;
                            _status.choiceType = undefined;
                            upShop('shop');
                            game.messageToPopup('购买成功');
                        }
                    } else {
                        game.messageToPopup('请选择要购买的物品');
                    }
                    return false;
                });
                return clickPrompt;
            })();
            let icon2 = (function () {
                let clickPrompt = ui.create.div('.xjzh_wujinDataIcon.xjzh_wujinDataIcon2', '结算', rightBody);
                clickPrompt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    home.delete();
                    game.updateWuJinSaveData();
                    game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
                    let info = game.stageInfo;
                    game.winnerStage(info.challenge);
                    game.over(true);
                    return false;
                });
                return clickPrompt;
            })();
            let icon3 = (function () {
                let clickPrompt = ui.create.div('.xjzh_wujinDataIcon.xjzh_wujinDataIcon3', '退出', rightBody);
                clickPrompt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (game.wujingModeStorage.revive <= 0) {
                        game.messageToPopup('复活次数不足，已无法退出，请点击结算结束本局');
                        return;
                    }
                    let saveData = {
                        player: get.nameList(game.me)[0],
                    };
                    let saveDatas = Object.assign({ ...saveData }, { ...game.wujingModeStorage });
                    game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", saveDatas);
                    window.location.reload();
                    return false;
                });
                return clickPrompt;
            })();
            let icon4 = (function () {
                let clickPrompt = ui.create.div('.xjzh_wujinDataIcon.xjzh_wujinDataIcon4', '挑战', rightBody);
                clickPrompt.addEventListener("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (game.wujingModeStorage.revive <= 0) {
                        game.messageToPopup('复活次数不足，已无法开始对局，请点击结算结束本局');
                        return;
                    }
                    home.delete();
                    lib.onresize.remove(onHomeSize);
                    game.resume();
                    game.startToWujin();
                    return false;
                });
                return clickPrompt;
            })();
            const shopBody = ui.create.div('.xjzh_wujinDatashopBody', leftBody);
            shopBody.textContent = '商    店';

            const skillBody = ui.create.div('.xjzh_wujinDataSkillBody', leftBody);
            function upShop(str) {
                while (skillBody.firstChild) {
                    skillBody.removeChild(skillBody.firstChild);
                }
                let query = document.querySelector('.xjzh_wujinBuffInfo');
                document.querySelectorAll('.xjzh_wujinDataBuffIcon').forEach(el => {
                    el.noChoiced();
                });
                if (query) {
                    query.remove();
                }
                _status.choiceShop = undefined;
                _status.choiceType = undefined;
                let allBuffs = [];
                let skillList = [];
                if (str == 'up') {
                    skillList = game.xjzh_addRandomSkill(null, game.getExtensionConfig("仙家之魂", "xjzh_challengeAllSkills") == true ? false : true)[1]
                        .filter(skill => {
                            let originalSkills = [...game.wujingModeStorage.skills, ...game.wujingModeStorage.originSkills];
                            if (originalSkills.includes(skill)) return false;
                            return true;
                        })
                        .toUniqued()
                        .randomGets(Math.max(1, Math.min(6, Math.floor(game.wujingModeStorage.level / 2))));

                    for (let buff of buffList) {
                        allBuffs.push(buff);
                    }

                    allBuffs = allBuffs.randomGets(Math.max(1, Math.min(3, Math.floor(game.wujingModeStorage.level / 2))));
                    game.wujingModeStorage.shop.buff = allBuffs;
                    game.wujingModeStorage.shop.skill = skillList;
                } else if (str == 'shop') {
                    allBuffs = game.wujingModeStorage.shop.buff || [];
                    skillList = game.wujingModeStorage.shop.skill || [];
                }
                if (allBuffs.length) {
                    for (let i of allBuffs) {
                        skillBody.appendChild(funcBuff(i, 'buff', 'left'));
                    }
                }
                if (skillList.length) {
                    for (let i of skillList) {
                        skillBody.appendChild(funcBuff(i, 'skill', 'left'));
                    }
                }
            }

            //如果是战斗获胜进入商店，自动刷新一次
            if (types === true) upShop('up');

            if (game.wujingModeStorage.shop.buff.length == 0 && game.wujingModeStorage.shop.skill.length == 0) {
                upShop('up');
            } else {
                upShop('shop');
            }
            const playBody = ui.create.div('.xjzh_wujinDataPlayBody', rightBody);
            function upPlayRevive() {
                Array.from(playBody.querySelectorAll('.xjzh_hpDataRevive, .wujin_DataRevive_hp2')).forEach(el => {
                    playBody.removeChild(el);
                });
                let revive = game.wujingModeStorage.revive;
                let revive2 = 5 - revive;
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                while (revive--) {
                    const div = ui.create.div(".xjzh_hpDataRevive");
                    fragment1.appendChild(div);
                }
                playBody.appendChild(fragment1);
                while (revive2--) {
                    const div = ui.create.div(".xjzh_hpDataRevive2");
                    fragment2.appendChild(div);
                }
                playBody.appendChild(fragment2);
            }
            upPlayRevive();
            const playBodyDiv = ui.create.div('.xjzh_playerBody', playBody);
            playBodyDiv.update = function () {
                const name = game.wujingModeStorage.name;
                playBodyDiv.innerHTML = '';
                var intro = get.character(name);
                if (!intro) {
                    for (var i in lib.characterPack) {
                        if (lib.characterPack[i][name]) {
                            intro = lib.characterPack[i][name];
                            break;
                        }
                    }
                }
                var playComps = {
                    bg: (function () {
                        var bg = ui.create.div('.xjzh_wujinGroupBg');
                        bg.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/name2_' + intro.group + '.png');
                        return bg;
                    })(intro[1]),
                    imp: (function () {
                        var imp = ui.create.div('.xjzh_wujinCharaterBg');
                        //修改千幻
                        /*imp.classList.add("qh-not-replace");*/
                        //修改
                        imp.setBackground(name, 'character');
                        const str = imp.style.backgroundImage;
                        if (!str) return;
                        if (lib.device == 'ios' || lib.device == 'android') {
                            var tmp = str.split('(')[1].split(')')[0];
                            if (tmp.indexOf('"') > -1) {
                                tmp = tmp.split('"')[1].split('"')[0];
                            }
                        } else {
                            var tmp = str.split('("')[1].split('")')[0];
                        }

                        var firstPromise = new Promise(function (resolve, reject) {
                            var reader = new FileReader();
                            var img = new Image();
                            img.src = lib.assetURL + decodeURI(tmp);
                            if (lib.device == 'ios' || lib.device == 'android') {
                                img.src = tmp;
                            }
                            var isAlphaBackground = 0;
                            var canvas = document.createElement('canvas');
                            var context = canvas.getContext('2d');
                            img.onload = function () {
                                var originWidth = this.width;
                                var originHeight = this.height;
                                canvas.width = originWidth;
                                canvas.height = originHeight;
                                context.clearRect(0, 0, originWidth, originHeight);
                                context.drawImage(img, 0, 0);
                                isAlphaBackground = 0;
                                var imageData = context.getImageData(0, 0, 50, 50).data;
                                for (var index = 3; index < 100; index += 4) {
                                    if (imageData[index] != 255) {
                                        isAlphaBackground++;
                                        if (isAlphaBackground >= 25) {
                                            resolve();
                                            break;
                                        }
                                    }
                                }
                            };
                        });
                        firstPromise.then(function (successMessage) {
                            imp.style.backgroundImage = 'none';
                            var imp2 = ui.create.div('.xjzh_wujinCharaterBg2', imp);
                            //适配千幻
                            //   imp2.classList.add("qh-not-replace");
                            //
                            imp2.setBackground(name, 'character');
                        });
                        return imp;
                    })(intro.group),
                    namebody: (function (name) {
                        var info = lib.translate[name];
                        var namebody = ui.create.div(".xjzh_wujinCharaterNameBg", info);
                        return namebody;
                    })(name),
                    playHp: (function (name) {
                        var playHp = ui.create.div('.xjzh_wujinCharaterHpBox');
                        var hp = get.character(name).hp;
                        var maxHp = get.character(name).maxHp;
                        if (hp < 6 && maxHp < 6) {
                            var num = maxHp - hp;
                            while (hp--) {
                                var tmp = ui.create.div(".xjzh_wujinCharaterHpIcon", playHp);
                                if (hp > 2) {
                                    tmp.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/glass1.png');
                                } else if (hp > 1) {
                                    tmp.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/glass2.png');
                                } else if (hp > 0) {
                                    tmp.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/glass3.png');
                                }
                            }
                            while (num--) {
                                var tmp = ui.create.div(".xjzh_wujinCharaterHpIcon", playHp);
                                tmp.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/glass4.png');
                            }
                        } else {
                            var tmp = ui.create.div(".xjzh_wujinCharaterHpIcon2", playHp);
                            tmp.setBackgroundImage('extension/仙家之魂/css/images/wujinMode/glass1.png');
                            var numbody = ui.create.div(".wujin_consoledeskPlayHpNum", hp + '', playHp);
                            numbody.innerHTML = hp + '<br>/<br>' + maxHp;
                        }
                        return playHp;
                    })(name),
                };
                for (var i in playComps) {
                    playBodyDiv.appendChild(playComps[i]);
                }
            };
            playBodyDiv.update();
            const buffBody = ui.create.div('.xjzh_wujinDataBuffBody', rightBody);
            const buffBodySkill = ui.create.div('.xjzh_wujinDataBuffCommon.xjzh_wujinDataBuffBodySkill', '技能', buffBody, () => upBuffBodyDiv('skill'));
            const buffBodyBuff = ui.create.div('.xjzh_wujinDataBuffCommon.xjzh_wujinDataBuffBodyBuff', '强化', buffBody, () => upBuffBodyDiv('buff'));
            const buffBodyCell = ui.create.div('.xjzh_wujinDataBuffCommon.xjzh_wujinDataBuffBodyCell', '出售', buffBody, (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (_status.choiceShop && _status.choiceType && (game.wujingModeStorage.buffList.includes(_status.choiceShop) || game.wujingModeStorage.skills.includes(_status.choiceShop))) {
                    game.wujingModeStorage.coin += 1;
                    topCoin.innerHTML = game.wujingModeStorage.coin;
                    if (_status.choiceType == 'buff') {
                        game.wujingModeStorage.buffList.remove(_status.choiceShop);
                    } else if (_status.choiceType == 'skill') {
                        game.wujingModeStorage.skills.remove(_status.choiceShop);
                    }
                    _status.choiceShop = undefined;
                    _status.choiceType = undefined;
                    upBuffBodyDiv();
                    game.messageToPopup('出售成功');
                } else {
                    game.messageToPopup('请选择要出售的物品');
                }
                return false;
            });
            const buffBodyDiv = ui.create.div('.xjzh_wujinDataBuffBodyDiv', buffBody);
            if (!_status.choiceBuffBodyDiv) {
                _status.choiceBuffBodyDiv = 'skill';
            }
            function upBuffBodyDiv(str) {
                Array.from(buffBodyDiv.querySelectorAll('.xjzh_wujinDataBuffIcon')).forEach(el => {
                    buffBodyDiv.removeChild(el);
                });
                let query = document.querySelector('.xjzh_wujinBuffInfo');
                document.querySelectorAll('.xjzh_wujinDataBuffIcon').forEach(el => {
                    el.noChoiced();
                });
                if (query) {
                    query.remove();
                }
                _status.choiceShop = undefined;
                _status.choiceType = undefined;
                if (!str) {
                    str = _status.choiceBuffBodyDiv;
                }
                if (str == 'skill') {
                    let bannedSkills = [
                        "xjzh_poe_choice",
                        "xjzh_poe_choice2",
                        "xjzh_dnf_levelUp",
                        "xjzh_skill_showMpCount"
                    ];
                    let skill = [...game.wujingModeStorage.originSkills, ...game.wujingModeStorage.skills].filter(skill => !bannedSkills.includes(skill));
                    for (let i of skill) {
                        buffBodyDiv.appendChild(funcBuff(i, 'skill', 'right'));
                    }
                    _status.choiceBuffBodyDiv = str;
                    return;
                }
                if (str == 'buff') {
                    let buff = game.wujingModeStorage.buffList;
                    for (let i of buff) {
                        buffBodyDiv.appendChild(funcBuff(i, 'buff', 'right'));
                    }
                    _status.choiceBuffBodyDiv = str;
                    return;
                }
            };
            upBuffBodyDiv('skill');
        },
        messageToPopup(info) {
            var home = document.getElementById('xjzh_wujinMessagePopupHome');
            if (!home) {
                home = ui.create.div('#xjzh_wujinMessagePopupHome');
                document.body.appendChild(home);
                var setmessagePopupSize = function () {
                    var screenWidth = ui.window.offsetWidth;
                    var screenHeight = ui.window.offsetHeight;
                    var whr = 2.4;
                    var width;
                    var height;
                    if (screenWidth / whr > screenHeight) {
                        height = screenHeight;
                        width = height * whr;
                    } else {
                        width = screenWidth;
                        height = screenWidth / whr;
                    }
                    home.style.height = Math.round(height) + "px";
                    home.style.width = Math.round(width) + "px";
                };
                setmessagePopupSize();
                var remessagePopupsize = function () {
                    setTimeout(setmessagePopupSize, 500);
                };
                lib.onresize.push(remessagePopupsize);
            }
            var div = ui.create.div('.xjzh_wujinMessagePopupDiv', home);
            var bg = ui.create.div('.xjzh_wujinMessagePopupDivBg', div);
            var text = ui.create.div('.xjzh_wujinMessagePopupDivText', info + '', div);
            setTimeout(function () {
                home.removeChild(div);
            }, 1600);
        },
        reviveConfirmg() {
            let number = 100 * Math.pow(2, game.challenge_reviveNumbers);
            let str = `是否花费${number}个碎片复活${get.translation(this)}？你本局还可以复活${10 - game.challenge_reviveNumbers}次`;

            let okCallback = () => {
                game.xjzh_changeSuipian(-number);
                this.revive(this.maxHp);
                this.drawTo(this.maxHp);
                game.challenge_reviveNumbers++;
            };
            let cancelCallback = () => {
                if (!game.hasPlayer(current => {
                    return game.challengers.includes(current);
                }, true
                ) || !game.hasPlayer(current => {
                    return current.side;
                }, true) ||
                    this == game.boss
                ) {
                    game.checkResult();
                }
            };;
            game.hookConfirmg(str, okCallback, cancelCallback);
        },
        updateChallengeLevel(...args) {
            let coin = false, num = 0;
            for (const arg of args) {
                if (typeof arg == "boolean") coin = arg;
                else if (typeof arg == "number") num = arg;
            }
            if (num > 0) game.wujingModeStorage.level += num;
            if (coin === true) {
                let num = game.wujingModeStorage.level;
                game.wujingModeStorage.coin += Math.min(12, num + 2);
            }
            if (game.getExtensionConfig("仙家之魂", "xjzh_challengeAllCoin") != true && game.wujingModeStorage.coin > 30) game.wujingModeStorage.coin = 30;
            let boxTime = document.getElementById('challenge-level-box');
            if (!boxTime) {
                boxTime = ui.create.div(ui.window, {
                    color: 'red', textShadow: 'none',
                    textAlign: 'center', fontSize: '3vh',
                    fontFamily: 'hwxinkai',
                });
                boxTime.id = 'challenge-level-box';
            }
            boxTime.innerHTML = `第${game.wujingModeStorage.level}关`;
            game.onAchievementComplete(game.wujingModeStorage.level);
        },
        onAchievementComplete(num) {
            if (typeof num != 'number') return;
            if (![10, 30, 50, 100].includes(num)) return;
            let object = {
                10: "秘境破虚",
                30: "破阵凌仙",
                50: "斩邪入圣",
                100: "凌虚证道",
            };
            let str = object[parseInt(num)];
            if (!game.xjzhAchi.hasAchi(str, 'game')) game.xjzhAchi.addProgress(str, 'game', 1);
        },
        checkResult() {
            let info = game.stageInfo, bool = false;
            if (get.storageMode() == "wujinshilian_wujing") {
                if (!game.hasPlayer(target => target.side)) {
                    game.winnerStage(info.challenge);
                    game.over(true);
                } else game.over(false);
                return;
            }
            if (!get.nameList(game.boss).includes(info.image)) {
                game.over(false);
                return;
            }
            if (!game.boss.isAlive()) {
                if (info?.filters && Array.isArray(info.filters)) {
                    for (let func of info.filters) {
                        if (!func()) bool = true;
                    }
                }
                if (!bool) {
                    game.winnerStage(info.challenge);
                    game.over(true);
                } else {
                    game.over(false);
                }
            } else {
                game.over(false);
            }
        },
        winnerStage(challenge) {
            challenge = challenge || game.stageInfo['challenge'];
            let challenges = get.challenges();
            if (!challenges[challenge]) return;
            let info = challenges[challenge];
            if (typeof info.onWinner == 'function') info.onWinner();
            let saveData = game.getExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData");
            if (Object.keys(saveData).length > 0) {
                game.updateWuJinSaveData();
                game.saveExtensionConfig("仙家之魂", "xjzh_wujinGameSvaeData", {});
            };
        },
        updateWuJinSaveData() {
            let modeSave = game.getExtensionConfig("仙家之魂", "xjzh_wujinModeSave") || [];
            let storage = game.wujingModeStorage;
            let saveData = {
                name: storage.name,
                translateNmae: lib.translate[storage.name],
                nickName: storage.nickName,
                time: new Date().getTime(),
                level: storage.level,
                revive: storage.revive,
            };
            modeSave.push(saveData);
            game.saveExtensionConfig("仙家之魂", "xjzh_wujinModeSave", modeSave);
        },
        createWujinDataSave() {
            let storage = game.getExtensionConfig("仙家之魂", "xjzh_wujinModeSave");
            if (!storage?.length) {
                alert("暂无通关数据");
                return;
            };
            game.pause2();
            let page = ui.create.div('.xjzh_saveData_background', document.body);
            let bg = ui.create.div('.xjzh_saveDtatBgBody', page);
            let close = ui.create.div('.menubutton.round', '×', bg, () => {
                document.body.removeChild(page);
                page.delete();
                game.resume2();
            });
            close.style.top = '5%';
            close.style.right = '2%';
            let textBg = ui.create.div('.xjzh_saveData_textBg', bg);
            textBg.textContent = `通关记录`;
            let homeBody = ui.create.div('.xjzh_saveDataBgDisPlay', bg);
            let dialog = ui.create.dialog('hidden');
            dialog.style.width = '50dvw';
            dialog.style.height = '100dvh';
            dialog.style.left = '6dvw';
            dialog.style.justifyContent = 'center';
            dialog.style.alignItems = 'center';
            dialog.style.top = '20px';
            homeBody.appendChild(dialog);

            const saveData = storage.sort((a, b) => {
                return b.level - a.level;
            });
            saveData.forEach(item => {
                dialog.addText('<span style="font-weight:bold;margin-right:5px"></span>');
                dialog.addSmall([[item.name], 'character']);
            });
            let num = 0;
            dialog.buttons.forEach(button => {
                button.classList.add('xjzh_saveData_characters');
                let table = `
                    <section class="xjzh_saveDataIntro">
                        <table>
                            <thead>
                                <tr>
                                    <th>排名</th>
                                    <th>玩家</th>
                                    <th>通关时间</th>
                                    <th>结算关卡</th>
                                    <th>复活次数</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                table += `
                    <tr>
                        <td>${num + 1}</td>
                        <td>${saveData[num]['nickName']}</td>
                        <td>${game.xjzh_toDateString(new Date(saveData[num]['time']))}</td>
                        <td>${saveData[num]['level']}</td>
                        <td>${5 - saveData[num]['revive']}</td>
                    </tr>
                `;
                table += `</tbody></table></section>`;
                let characterData = ui.create.div('.xjzh_saveData_table');
                characterData.innerHTML = table;
                button.parentNode.appendChild(characterData);
                num++;
            });
        },
        showWujinDataSave() {
            let storage = game.getExtensionConfig("仙家之魂", "xjzh_wujinModeSave");
            if (!storage?.length) {
                alert("暂无通关数据");
                return;
            };
            game.createWujinDataSave();
        },
        onSwapControl() {
            game.addVideo("onSwapControl");
            var name = game.me.name;
            if (ui.fakeme && ui.fakeme.current != name) {
                ui.fakeme.current = name;
                if (ui.versushighlight && ui.versushighlight != game.me) {
                    ui.versushighlight.classList.remove("current_action");
                }
                ui.versushighlight = game.me;
                game.me.classList.add("current_action");
                // game.me.line(ui.fakeme,{opacity:0.5,dashed:true});

                ui.fakeme.style.backgroundImage = game.me.node.avatar.style.backgroundImage;
                // ui.fakeme.style.backgroundSize='cover';
            }
            ui.updatehl();
        },
        chooseCharacter(func) {
            var next = game.createEvent("chooseCharacter");
            next.showConfig = true;
            next.customreplacetarget = func;
            next.setContent(function () {
                "step 0";
                var i;
                var list = [];
                event.list = list;

                var filterCharacter = function (name) {
                    let characters = get.character(name);
                    let banned = ["isMinskin", "isBoss", "isHiddenBoss", "isUnseen", "isAiForbidden"];
                    if (banned.some(item => characters[item])) return true;
                    if (!get.storageMode()?.length) return false;
                    let mode = get.storageMode();
                    let info = get.stageInfo(mode);
                    if (info.forbidden && info.forbidden.includes(name)) return true;
                    let isEndlessMode = get.storageMode() === "wujinshilian_wujing";
                    let allCharacterEnabled = game.getExtensionConfig("仙家之魂", "xjzh_challengeAllCharacter") === true;
                    if (isEndlessMode && allCharacterEnabled) return false;
                    return !name.startsWith('xjzh_');
                }
                for (let i in lib.character) {
                    if (filterCharacter(i)) continue;
                    list.push(i);
                }
                list.randomSort();

                var dialog = ui.create.dialog("选择参战角色", "hidden");
                dialog.classList.add("fixed");
                ui.window.appendChild(dialog);
                dialog.classList.add("bosscharacter");
                dialog.classList.add("modeshortcutpause");
                dialog.classList.add("withbg");
                // dialog.add('0/3');
                dialog.add([list.slice(0, 20), "character"]);
                dialog.noopen = true;
                var next = game.me.chooseButton(dialog, true).set("onfree", true);
                next._triggered = null;
                next.custom.replace.target = event.customreplacetarget;

                var info = get.stageInfo(lib.storage.current);
                if (info.friends) {
                    var num = 0;
                    for (var i in info.friends) {
                        if (info.friends[i] == 'free') num++;
                    }
                    _status.event.selectButton = [num, num];
                    game.uncheck();
                }
                next.selectButton = [num, num];

                next.changeDialog = function () {
                    var dialog;
                    if (ui.cheat2 && ui.cheat2.dialog == _status.event.dialog) {
                        dialog = ui.cheat2.backup
                    } else {
                        dialog = _status.event.dialog;
                    }
                    list.randomSort();
                    var buttons = ui.create.div(".buttons");
                    var node = dialog.buttons[0].parentNode;
                    dialog.buttons = ui.create.buttons(
                        list.slice(0, 20),
                        "character",
                        buttons
                    );
                    dialog.content.insertBefore(buttons, node);
                    buttons.addTempClass("start");
                    node.remove();

                    game.uncheck();
                    game.check();
                };

                ui.create.cheat = function () {
                    ui.cheat = ui.create.control("更换", next.changeDialog);
                };
                var createCharacterDialog = function () {
                    event.dialogxx = ui.create.characterDialog(filterCharacter);
                    event.dialogxx.classList.add("bosscharacter");
                    event.dialogxx.classList.add("withbg");
                    event.dialogxx.classList.add("fixed");
                    if (ui.cheat2) {
                        ui.cheat2.addTempClass("controlpressdownx", 500);
                        ui.cheat2.classList.remove("disabled");
                    }
                };

                createCharacterDialog();

                ui.create.cheat2 = function () {
                    ui.cheat2 = ui.create.control("自由选将", function () {
                        if (this.dialog == _status.event.dialog) {
                            this.dialog.close();
                            _status.event.dialog = this.backup;
                            ui.window.appendChild(this.backup);
                            delete this.backup;
                            game.uncheck();
                            game.check();
                            if (ui.cheat) {
                                ui.cheat.addTempClass("controlpressdownx", 500);
                                ui.cheat.classList.remove("disabled");
                            }
                            if (_status.bosschoice) {
                                _status.bosschoice.addTempClass("controlpressdownx", 500);
                                _status.bosschoice.classList.remove("disabled");
                            }
                        } else {
                            this.backup = _status.event.dialog;
                            _status.event.dialog.close();
                            _status.event.dialog = _status.event.parent.dialogxx;
                            this.dialog = _status.event.dialog;
                            ui.window.appendChild(this.dialog);
                            game.uncheck();
                            game.check();
                            if (ui.cheat) {
                                ui.cheat.classList.add("disabled");
                            }
                            if (_status.bosschoice) {
                                _status.bosschoice.classList.add("disabled");
                            }
                        }
                    });
                };

                if (!ui.cheat) ui.create.cheat();
                if (!ui.cheat2) ui.create.cheat2();

                next.checkList = function () {
                    list.length = 0;
                    for (i in lib.character) {
                        if (filterCharacter(i)) continue;
                        list.push(i);
                    }
                    _status.event.parent.dialogxx.delete();
                    createCharacterDialog();
                    if (ui.cheat2.dialog && ui.cheat2.dialog == _status.event.dialog) {
                        _status.event.dialog = _status.event.parent.dialogxx;
                        ui.cheat2.dialog = _status.event.parent.dialogxx;
                        ui.window.appendChild(_status.event.parent.dialogxx);
                    }
                    _status.event.changeDialog();

                    var info = get.stageInfo(lib.storage.current);
                    if (info.friends) {
                        var num = 0;
                        for (var i in info.friends) {
                            if (info.friends[i] == 'free') num++;
                        }
                        _status.event.selectButton = [num, num];
                    }

                    game.uncheck();
                    game.check();

                }

                "step 1";
                if (ui.cheat) {
                    ui.cheat.close();
                    delete ui.cheat;
                }
                if (ui.cheat2) {
                    ui.cheat2.close();
                    delete ui.cheat2;
                }

                if (_status.bosschoice) {
                    _status.bosschoice.close();
                    delete _status.bosschoice;
                }
                event.result = {
                    boss: false,
                    links: result.links,
                };
                let charaterLinks = result.buttons;
                charaterLinks.forEach(item => {
                    game.addRecentCharacter(item.link);
                });
                _status.coinCoeff = get.coinCoeff(result.links);
            });
            return next;
        },
        modeSwapPlayer(player) {
            game.swapControl(player);
            game.onSwapControl();
        },
        changeBoss(name, num, player) {
            if (!player) {
                if (game.additionaldead) {
                    game.additionaldead.push(game.boss);
                } else {
                    game.additionaldead = [game.boss];
                }
                player = game.boss;
                delete game.boss;
            }

            player.delete();
            game.players.remove(player);
            game.dead.remove(player);
            var boss = ui.create.player();
            boss.getId();
            boss.init(name);
            boss.side = true;
            game.addVideo("bossSwap", player, (game.boss ? "_" : "") + boss.name);
            boss.dataset.position = player.dataset.position;
            if (game.me == player) {
                game.swapControl(boss);
            }

            game.players.push(boss.addTempClass("zoominanim"));
            game.arrangePlayers();
            if (!game.boss) {
                game.boss = boss;
                boss.setIdentity(" ");
                boss.identity = "zhu";
                boss.dataset.identity = 'enemy_boss';
            } else {
                boss.setIdentity(" ");
                boss.identity = "zhong";
                boss.dataset.identity = 'enemy';
            }
            ui.arena.appendChild(boss);
            if (typeof num == 'number') boss.directgain(get.cards(4));
        },
        addShFellow(position, name, draw, hp = 2) {
            let fellow = game.addFellow(position, name, 'zoominanim');
            fellow.maxHp = hp;
            fellow.hp = hp;
            fellow.update();
            if (typeof draw == 'number') fellow.directgain(get.cards(draw));
            fellow.side = true;
            fellow.setIdentity(" ");
            fellow.identity = "zhong";
            fellow.dataset.identity = 'enemy';
            game.addVideo('setIdentity', fellow, 'zhong');
            return fellow;
        },
        removeShPlayer(player) {
            if (_status.roundStart == player) _status.roundStart = player.next || player.getNext() || game.players[0];
            player.style.left = `${player.getLeft()}px`;
            player.style.top = `${player.getTop()}px`;
            if (player == undefined) player = game.dead[0] || game.me.next;
            if (player.isAlive()) {
                player.next.previous = player.previous;
                player.previous.next = player.next;
            }
            player.nextSeat.previousSeat = player.previousSeat;
            player.previousSeat.nextSeat = player.nextSeat;
            player.delete();
            game.players.remove(player);
            game.dead.remove(player);
            player.removed = true;
            if (player == game.me) {
                ui.me.hide();
                ui.auto.hide();
                ui.wuxie.hide();
            }
            setTimeout(() => player.removeAttribute("style"), 500);
            return player;
        },
    },
    skill: skills,
    translate: translates,
    dynamicTranslate: dynamicTranslates,
    get: {
        storageMode: () => lib.storage["current"] || "",
        bannedSkills: () => bannedSkills,
        qishuName: () => qishuName,
        challenges: () => challenges,
        challengeAndStage: (name) => name.split('_'),
        stageInfo(name) {
            let [challenge, stage] = get.challengeAndStage(name);
            return challenges[challenge]['stage'][stage];
        },
        challengeInfo(name) {
            let [challenge, stage] = get.challengeAndStage(name);
            return challenges[challenge];
        },
        rawAttitude(from, to) {
            let num = to.identity == "zhong" ? 5 : 6;
            return from.side === to.side ? num : -num;
        },
    },
};
/*const info = {
    translate: '升华试炼',
    config: {
        // single_control: {
        //     name: "单人控制",
        //     init: true,
        //     frequent: true,
        //     onclick(bool) {
        //         game.saveConfig("single_control", bool, true);
        //     },
        //     intro: "只控制一名角色，其他角色由AI控制",
        // },
    }
};*/
//game.addMode('xjzh_challenge', mode, info);
game.import('mode', () => mode);
lib.translate["xjzh_challenge"] = '升华试炼';

//打开挑战页面的函数
export function openChallengePage() {
    if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
    game.pause2();
    //覆盖图层
    var challengePage = ui.create.div('.xjzh-challengePage');
    document.body.appendChild(challengePage);
    //背景图层
    var bk = ui.create.div('.xjzh-challengePage-bk', challengePage);
    // 滚动条引用，用于动态调整尺寸
    var scrollBarRef = null;
    var setSize = function () {
        var screenWidth = ui.window.offsetWidth;
        var screenHeight = ui.window.offsetHeight;
        var whr = 1.77778;
        var width;
        var height;
        if (screenWidth / whr > screenHeight) {
            height = screenHeight;
            width = height * whr;
        } else {
            width = screenWidth;
            height = screenWidth / whr;
        }
        var bkWidth = Math.round(width) * 1.1;
        var bkHeight = Math.round(height) * 1.1;
        bk.style.height = bkHeight + "px";
        bk.style.width = bkWidth + "px";

        // 动态设置滚动条尺寸，基于 bk 容器的实际尺寸
        if (scrollBarRef) {
            // 滚动条宽度: 12% of bkWidth
            var scrollBarWidth = bkWidth * 0.15;
            // item 实际内容宽度（减去左右各 15% 的边距）
            var itemContentWidth = scrollBarWidth * 0.7;
            // 保持图片比例，按 width:height = 16:9 计算 item 高度
            var itemHeight = itemContentWidth * 9 / 16;
            // item 左右边距
            var itemSideMargin = scrollBarWidth * 0.15;
            // item 间距
            var itemGap = itemHeight * 0.2;

            // 设置滚动条尺寸
            scrollBarRef.style.top = (bkHeight * 0.2) + "px";
            scrollBarRef.style.width = scrollBarWidth + "px";
            scrollBarRef.style.left = (bkWidth * 0.775) + "px";

            // 设置 item 样式
            var items = scrollBarRef.querySelectorAll('.xjzh-challengePage-scrollBar-item');
            items.forEach(function(item, index) {
                item.style.height = itemHeight + "px";
                item.style.minHeight = itemHeight + "px";
                item.style.width = itemContentWidth + "px";
                item.style.marginLeft = itemSideMargin + "px";
                item.style.marginRight = itemSideMargin + "px";
                item.style.marginBottom = itemGap + "px";
                if (index === items.length - 1) {
                    item.style.marginBottom = "0";
                }
            });

            // 计算实际内容高度
            var totalContentHeight = items.length * itemHeight + Math.max(0, items.length - 1) * itemGap;
            // 最大可用高度：从 top 20% 到底部 20%（保守计算）
            var maxAvailableHeight = bkHeight * 0.6;

            // 实际高度：取内容高度和最大可用高度的较小值
            var actualHeight = Math.min(totalContentHeight, maxAvailableHeight);
            scrollBarRef.style.height = actualHeight + "px";
        }
    };
    setSize();
    var resize = function () {
        setTimeout(setSize, 500);
    };
    //退出按钮
    var exit = ui.create.div('.xjzh-challengePage-return', bk);
    lib.onresize.push(resize);
    exit.listen(function () {
        challengePage.delete();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementMainPage();
    });

    //展示页面
    var mainWindow = ui.create.div('.xjzh-challengePage-mainWindow', bk);
    var showWindow = ui.create.div('.xjzh-challengePage-showWindow', bk);
    //选择挑战的滚动条
    var scrollBar = ui.create.div('.xjzh-challengePage-scrollBar', bk);
    // 将 scrollBar 引用保存到闭包中
    scrollBarRef = scrollBar;
    // var scrollBarWrapper = ui.create.div('.xjzh-challengePage-scrollBar-item-wrapper', scrollBar);
    var defaultChoice;
    for (var id in challenges) {
        if (challenges[id].consumable && typeof challenges[id].consumable == 'function' && challenges[id].consumable()) {
            if (!defaultChoice) defaultChoice = id;
            var challenge = challenges[id];
            var item = ui.create.div('.xjzh-challengePage-scrollBar-item', scrollBar);
            item.challenge = challenge;
            item.id = id;
            item.setBackgroundImage('extension/仙家之魂/css/images/challenges/thumbnail/' + id + '.png');
            item.addEventListener('click', function () {
                state.refreshShowwindow(this.id);
            });
        }
    }
    // 项目创建完成后，动态设置滚动条尺寸
    setSize();

    //函数方法
    var state = {
        choice: null,
        refreshShowwindow: function (choice) {
            const buttons = document.querySelectorAll('.xjzh-challengePage-talentButton');
            if (buttons?.length) buttons.forEach(button => button.remove());

            if (challenges[choice].consumable && typeof challenges[choice].consumable == 'function' && challenges[choice].consumable()) {
                if (this.choice) {
                    var last = document.querySelector(`.xjzh-challengePage-scrollBar-item#${this.choice}`);
                    last.setBackgroundImage('extension/仙家之魂/css/images/challenges/thumbnail/' + last.id + '.png');
                }
                var now = document.querySelector(`.xjzh-challengePage-scrollBar-item#${choice}`);
                now.setBackgroundImage('extension/仙家之魂/css/images/challenges/thumbnail_active/' + choice + '.png');

                //showWindow.innerHTML = '';
                this.choice = choice;
                var info = challenges[choice];

                showWindow.setBackgroundImage('extension/仙家之魂/css/images/challenges/mainPhoto/' + choice + '.png');

                var entrys = info.initEntrys(showWindow);
                var i = 0;
                for (var stage in info['stage']) {
                    var entry = entrys[i++];
                    entry._id = choice;
                    entry.stage = stage;
                    if (info['stage'][stage].filter === undefined || info['stage'][stage].filter()) {
                        entry.addEventListener('click', function () {
                            if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") {
                                alert('未开启奇术要件功能！');
                                return;
                            }
                            var id = this._id, stage = this.stage;
                            challengePage.delete();
                            game.resume2();
                            lib.onresize.remove(resize);

                            game.saveConfig("mode", 'xjzh_challenge');
                            game.save('current', `${id}_${stage}`);
                            game.reload();
                        })
                    }
                }

                var introButton = info.initIntro(showWindow);
                introButton._intro = info.intro;
                introButton.addEventListener('click', function () {
                    var introWindow = ui.create.div('.xjzh-challengePage-introWindow', bk);
                    var container = ui.create.div('.xjzh-challengePage-introWindow-container', introWindow);
                    container.innerHTML = this._intro;

                    introWindow.addEventListener('click', function () {
                        introWindow.delete();
                    })
                });

                if (typeof info.talentButton == "function") {
                    // 引入天赋树样式
                    var talentButton = info.talentButton(showWindow);
                    talentButton._mode = choice;
                    talentButton.addEventListener('click', function () {
                        // 天赋树系统实现
                        if (!window.state) window.state = { talentPoints: { attack: 0, defense: 0, element: 0 } };

                        // 从配置中读取天赋数据，如果不存在则使用默认值
                        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
                        const mode = this._mode;


                        const talentTree = talentList[mode];

                        // 确保天赋配置存在
                        config.talent ??= {};
                        config.talent[mode] ??= { points: talentTree.points, originalPoints: 0, allocated: {} };

                        const pointsNum = config.talent[mode]?.points ?? 5;
                        const originalPointsNum = config.talent[mode]?.originalPoints ?? 0;

                        // 使用配置中的数据覆盖默认数据
                        talentTree.points = pointsNum + originalPointsNum;
                        talentTree.allocated = { ...config.talent[mode].allocated };

                        // 创建天赋树界面
                        const talentWindow = ui.create.div('.xjzh-talent-tree-window');
                        talentWindow.innerHTML = `
                            <div class='talent-header' style='padding: 0 10px;'>
                                <h2 class='main-title'>天赋星图</h2>
                                <div class='points-container'>
                                    <img src='${lib.assetURL}extension/仙家之魂/css/images/challenges/talent/point.png' class='point-icon'>
                                    <span id='talent-points'>${talentTree.points}</span>
                                </div>
                                <div class='button-group' style='min-width: 200px; justify-content: space-between;'>
                                    <button id='reset-talents'>一键重置天赋</button>
                                    <button id='exit-talents'>退出</button>
                                </div>
                            </div>
                            <div class='talent-grid' id='talent-grid'></div>
                        `;

                        // 保存原始坐标比例
                        const originalCoords = {};
                        const baseWidth = 800; // 基准宽度
                        const baseHeight = 800; // 基准高度

                        // 记录原始坐标
                        talentTree.nodes.forEach(node => {
                            originalCoords[node.id] = {
                                x: node.x,
                                y: node.y
                            };
                        });

                        // 检查是否有后置天赋已解锁
                        function hasUnlockedChildren(nodeId) {
                            return talentTree.nodes.some(node =>
                                node.prerequisites.includes(nodeId) && talentTree.allocated[node.id]
                            );
                        }

                        // 重置单个天赋
                        function resetTalent(nodeId) {
                            if (talentTree.allocated[nodeId]) {
                                talentTree.allocated[nodeId] = false;
                                talentTree.points++;
                                // 递归重置子天赋
                                talentTree.nodes
                                    .filter(node => node.prerequisites.includes(nodeId))
                                    .forEach(child => resetTalent(child.id));
                            }
                        }

                        // 根据窗口大小调整坐标
                        function adjustCoordinatesForScale() {
                            const grid = talentWindow.querySelector('#talent-grid');
                            const container = grid.querySelector('.talent-nodes-container');

                            if (!container) return;

                            // 获取当前容器尺寸
                            const currentWidth = grid.clientWidth;
                            const currentHeight = grid.clientHeight;

                            // 计算缩放比例
                            const scaleX = currentWidth / baseWidth;
                            const scaleY = currentHeight / baseHeight;
                            const scale = Math.min(scaleX, scaleY, 1); // 使用最小比例，最大不超过1

                            // 应用缩放
                            container.style.transform = `scale(${scale})`;

                            return scale;
                        }

                        // 保存天赋数据到配置
                        function saveTalentData() {
                            const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
                            config.talent ??= {};
                            config.talent[mode].points = talentTree.points;
                            config.talent[mode].allocated = { ...talentTree.allocated };
                            game.xjzh_saveQishuConfig(config);
                        }

                        // 渲染天赋节点
                        function renderTalentNodes() {
                            const grid = talentWindow.querySelector('#talent-grid');
                            // 清空并重新创建连接线容器
                            grid.innerHTML = '<div class="talent-nodes-container"><div class="talent-connections"></div></div>';
                            const container = grid.querySelector('.talent-nodes-container');
                            const connections = grid.querySelector('.talent-connections');
                            connections.style.position = 'absolute';
                            connections.style.top = '0';
                            connections.style.left = '0';
                            connections.style.width = '100%';
                            connections.style.height = '100%';
                            connections.style.pointerEvents = 'none';
                            connections.style.zIndex = '0';

                            // 绘制连接线
                            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                            svg.setAttribute('width', '100%');
                            svg.setAttribute('height', '100%');
                            svg.style.position = 'absolute';
                            svg.style.top = '0';
                            svg.style.left = '0';
                            svg.style.zIndex = '0';
                            connections.appendChild(svg);

                            // 计算内容高度
                            let maxHeight = 0;

                            talentTree.nodes.forEach(node => {
                                const isUnlocked = talentTree.allocated[node.id] || false;
                                const canUnlock = talentTree.points > 0 && node.prerequisites.every(p => talentTree.allocated[p]);

                                let nodeClass = 'talent-node';
                                if (isUnlocked) {
                                    nodeClass += ' unlocked';
                                } else if (canUnlock) {
                                    nodeClass += ' available';
                                } else {
                                    nodeClass += ' locked';
                                }

                                const nodeElement = ui.create.div('.' + nodeClass.replace(/\s+/g, '.'));

                                // 设置节点背景图片
                                if (node.img) {
                                    const dir = `${lib.assetURL}extension/仙家之魂/css/images/challenges/talent/talentPoints/${mode}/`;
                                    nodeElement.style.backgroundImage = `url("${dir}${node.img}.png")`;
                                }

                                //nodeElement.innerHTML = `<div class='node-name'>${node.name}</div>`;
                                //<div class='node-desc' style="font-size:12px; margin-top:5px;">${node.description}</div>`;
                                nodeElement.dataset.id = node.id;
                                // 设置节点位置
                                nodeElement.style.position = 'absolute';
                                nodeElement.style.left = `${node.x}px`;
                                nodeElement.style.top = `${node.y}px`;
                                nodeElement.style.transform = 'translate(-50%, -50%)';
                                if (node.size) {
                                    let size = node.size, width, height;
                                    if (size == "big") {
                                        width = 150;
                                        height = 150;
                                    } else if (size == "midsize") {
                                        width = 125;
                                        height = 125;
                                    }
                                    else {
                                        width = 100;
                                        height = 100;
                                    }
                                    nodeElement.style.width = `${width}px`;
                                    nodeElement.style.height = `${height}px`;
                                }

                                // 更新最大高度
                                const nodeBottom = node.y + 50; // 50 = 100/2 (节点高度的一半)
                                if (nodeBottom > maxHeight) {
                                    maxHeight = nodeBottom;
                                }

                                // 绘制连接线
                                if (node.prerequisites && node.prerequisites.length > 0) {
                                    node.prerequisites.forEach(prereqId => {
                                        const prereqNode = talentTree.nodes.find(n => n.id === prereqId);
                                        if (prereqNode) {
                                            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                                            line.setAttribute('x1', prereqNode.x);
                                            line.setAttribute('y1', prereqNode.y);
                                            line.setAttribute('x2', node.x);
                                            line.setAttribute('y2', node.y);
                                            line.setAttribute('stroke', talentTree.allocated[prereqId] ? '#00ff66' : '#888888');
                                            line.setAttribute('stroke-width', '2');
                                            line.setAttribute('stroke-opacity', talentTree.allocated[prereqId] ? '1' : canUnlock ? '0.6' : '0.3');
                                            svg.appendChild(line);
                                        }
                                    });
                                }

                                // 局部更新天赋节点样式
                                function updateTalentNodeStyles() {
                                    // 更新所有节点的样式（包括后置天赋）
                                    talentTree.nodes.forEach(nodeData => {
                                        const nodeElement = talentWindow.querySelector(`.talent-node[data-id="${nodeData.id}"]`);
                                        if (nodeElement) {
                                            const isUnlocked = talentTree.allocated[nodeData.id] || false;
                                            const canUnlock = talentTree.points > 0 && nodeData.prerequisites.every(p => talentTree.allocated[p]);

                                            // 移除旧的类
                                            nodeElement.classList.remove('unlocked', 'available', 'locked');

                                            // 添加新的类
                                            if (isUnlocked) {
                                                nodeElement.classList.add('unlocked');
                                            } else if (canUnlock) {
                                                nodeElement.classList.add('available');
                                            } else {
                                                nodeElement.classList.add('locked');
                                            }
                                        }
                                    });

                                    // 更新连接线颜色
                                    const svg = talentWindow.querySelector('.talent-connections svg');
                                    if (svg) {
                                        const lines = svg.querySelectorAll('line');
                                        lines.forEach(line => {
                                            // 从line的属性中获取节点信息
                                            const x1 = parseFloat(line.getAttribute('x1'));
                                            const y1 = parseFloat(line.getAttribute('y1'));
                                            const x2 = parseFloat(line.getAttribute('x2'));
                                            const y2 = parseFloat(line.getAttribute('y2'));

                                            // 找到对应的节点
                                            const prereqNode = talentTree.nodes.find(n => n.x === x1 && n.y === y1);
                                            const node = talentTree.nodes.find(n => n.x === x2 && n.y === y2);

                                            if (prereqNode && node) {
                                                const isPrereqUnlocked = talentTree.allocated[prereqNode.id] || false;
                                                const canUnlock = talentTree.points > 0 && node.prerequisites.every(p => talentTree.allocated[p]);

                                                line.setAttribute('stroke', isPrereqUnlocked ? '#00ff66' : '#888888');
                                                line.setAttribute('stroke-opacity', isPrereqUnlocked ? '1' : canUnlock ? '0.6' : '0.3');
                                            }
                                        });
                                    }
                                }

                                // 点击天赋节点
                                nodeElement.addEventListener('click', () => {
                                    // 创建信息框前先检查是否已存在，避免重复创建
                                    const existingInfoBox = document.querySelector('.talent-info-box');
                                    if (existingInfoBox) {
                                        existingInfoBox.remove();
                                    }

                                    // 重新计算当前节点状态
                                    const isUnlocked = talentTree.allocated[node.id] || false;
                                    const canUnlock = talentTree.points > 0 && node.prerequisites.every(p => talentTree.allocated[p]);

                                    // 创建信息框
                                    const infoBox = ui.create.div('.talent-info-box');
                                    infoBox.style.position = 'absolute';
                                    infoBox.style.left = '50%';
                                    infoBox.style.top = '50%';
                                    infoBox.style.transform = 'translate(-50%, -50%)';
                                    infoBox.style.background = 'rgba(10, 10, 20, 0.95)';
                                    infoBox.style.border = '1px solid #ffd700';
                                    infoBox.style.borderRadius = '6px';
                                    infoBox.style.padding = '10px';
                                    infoBox.style.zIndex = '2000';
                                    infoBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                                    infoBox.style.color = '#fff';
                                    infoBox.style.width = 'auto';
                                    infoBox.style.minWidth = '250px';
                                    infoBox.style.maxWidth = '300px';
                                    infoBox.style.boxSizing = 'border-box';

                                    // 根据状态决定按钮显示
                                    let actionButtonHtml = '', reasonBool = false;
                                    if (isUnlocked) {
                                        actionButtonHtml = '<button id="talent-action-btn" style="background-color: #ff4444; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: background-color 0.3s; font-size: 14px; margin-right: 10px; flex-shrink: 0;">重置天赋</button>';
                                    } else if (canUnlock) {
                                        actionButtonHtml = '<button id="talent-action-btn" style="background-color: #ff4444; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: background-color 0.3s; font-size: 14px; margin-right: 10px; flex-shrink: 0;">加点</button>';
                                    } else {
                                        const reason = talentTree.points <= 0 ? '（天赋点不足）' :
                                            node.prerequisites.some(p => !talentTree.allocated[p]) ? '（前置天赋未解锁）' : '';
                                        actionButtonHtml = `<span style="color: #888; font-size: 14px; white-space: nowrap;">无法操作${reason}</span>`;
                                        reasonBool = true;
                                    }

                                    // 信息框内容 - 使用与悬停显示一致的样式
                                    infoBox.innerHTML = `
                                        <h4 style="margin-top: 0; color: #ffd700; border-bottom: 1px solid #888; padding-bottom: 5px;">${node.name}</h4>
                                        <p style="margin: 5px 0; font-size: 14px; line-height: 1.5;">${node.description}</p>
                                        ${node.prerequisites.length ?
                                            `<p style="margin: 5px 0; font-size: 12px; color: #aaa;">
                                                前置要求: ${node.prerequisites.map(p => talentTree.nodes.find(n => n.id === p).name).join(', ')}
                                            </p>` : ''
                                        }
                                        ${reasonBool == true ? `<p style="margin: 5px 0; font-size: 14px; line-height: 1.5;">${actionButtonHtml}</p>`
                                            : ''
                                        }
                                        <div style="display: flex; justify-content: center; margin-top: 10px; gap: 10px; flex-wrap: wrap;">
                                            ${reasonBool == false ? actionButtonHtml : ''}
                                            <button id="talent-close-btn" style="
                                                background-color: #666;
                                                color: white;
                                                border: none;
                                                padding: 8px 16px;
                                                border-radius: 4px;
                                                cursor: pointer;
                                                transition: background-color 0.3s;
                                                font-size: 14px;
                                                flex-shrink: 0;
                                            ">关闭</button>
                                        </div>
                                    `;

                                    // 添加关闭功能（点击信息框外部关闭）
                                    infoBox.addEventListener('click', (e) => {
                                        e.stopPropagation();
                                    });

                                    document.body.appendChild(infoBox);

                                    // 添加按钮事件
                                    const actionButton = infoBox.querySelector('#talent-action-btn');
                                    const closeButton = infoBox.querySelector('#talent-close-btn');

                                    if (actionButton) {
                                        actionButton.addEventListener('click', () => {
                                            // 再次检查状态以确保准确性
                                            const currentIsUnlocked = talentTree.allocated[node.id] || false;
                                            const currentCanUnlock = talentTree.points > 0 && node.prerequisites.every(p => talentTree.allocated[p]);

                                            if (currentIsUnlocked) {
                                                // 重置天赋
                                                if (hasUnlockedChildren(node.id)) {
                                                    alert('请先重置所有后置天赋');
                                                    return;
                                                }
                                                //const confirmReset = confirm('确定要重置此天赋吗？');
                                                //if (confirmReset) {
                                                resetTalent(node.id);
                                                // 局部更新节点样式而不是重渲染整个树
                                                updateTalentNodeStyles();
                                                // 更新点数显示
                                                talentWindow.querySelector('#talent-points').textContent = talentTree.points;
                                                node.addTalentEffects();
                                                // 保存数据
                                                saveTalentData();

                                                // 关闭信息框
                                                if (infoBox.parentNode) {
                                                    infoBox.parentNode.removeChild(infoBox);
                                                }
                                                //}
                                            } else if (currentCanUnlock) {
                                                // 加点
                                                //const confirmAdd = confirm('确定要加点到该天赋吗？');
                                                //if (confirmAdd) {
                                                try {
                                                    const nodesTalents = talentTree.nodes;
                                                    const nodesTalentsBool = nodesTalents.some(item => item.id == node.id && item.conflict);
                                                    const nodesTalentConflict = nodesTalentsBool ? nodesTalents.find(item => item.id == node.id && item.conflict).conflict : "";
                                                    if (nodesTalentsBool && talentTree.allocated[nodesTalentConflict] == true) {
                                                        alert("大型天赋只能选择一个加点！！！");
                                                        return;
                                                    }
                                                    talentTree.allocated[node.id] = true;
                                                    talentTree.points--;
                                                    node.addTalentEffects(true);
                                                    // 局部更新节点样式而不是重渲染整个树
                                                    updateTalentNodeStyles();
                                                    // 更新点数显示
                                                    talentWindow.querySelector('#talent-points').textContent = talentTree.points;
                                                    // 保存数据
                                                    saveTalentData();

                                                    // 关闭信息框
                                                    if (infoBox.parentNode) {
                                                        infoBox.parentNode.removeChild(infoBox);
                                                    }
                                                } catch (error) {
                                                    alert('加点时出错: ' + error.message);
                                                }
                                                //}
                                            } else {
                                                alert('无法解锁该天赋，请检查前置条件！');
                                            }
                                        });
                                    }

                                    closeButton.addEventListener('click', () => {
                                        // 关闭信息框
                                        if (infoBox.parentNode) {
                                            infoBox.parentNode.removeChild(infoBox);
                                        }
                                    });

                                    // 点击外部关闭信息框
                                    const closeHandler = (e) => {
                                        if (!infoBox.contains(e.target)) {
                                            if (infoBox.parentNode) {
                                                infoBox.parentNode.removeChild(infoBox);
                                            }
                                            document.removeEventListener('click', closeHandler);
                                        }
                                    };

                                    // 延迟添加事件监听器，避免立即触发
                                    setTimeout(() => {
                                        document.addEventListener('click', closeHandler);
                                    }, 100);
                                });

                                // 悬停显示详情
                                /*nodeElement.addEventListener('mouseenter', (e) => {
                                    const tooltip = ui.create.div('.talent-tooltip');
                                    tooltip.innerHTML = `
                                        <h4>${node.name}</h4>
                                        <p>${node.description}</p>
                                        ${node.prerequisites.length ? `<p>前置要求: ${node.prerequisites.map(p => talentTree.nodes.find(n => n.id === p).name).join(', ')}</p>` : ''}
                                    `;
                                    document.body.appendChild(tooltip);

                                    // 强制重排以获取准确尺寸
                                    tooltip.style.position = 'absolute';
                                    tooltip.style.visibility = 'hidden';
                                    tooltip.style.display = 'block';

                                    // 获取tooltip尺寸
                                    const tooltipWidth = tooltip.offsetWidth || 250; // 使用默认值以防万一
                                    const tooltipHeight = tooltip.offsetHeight || 100;

                                    // 恢复可见性
                                    tooltip.style.visibility = 'visible';
                                    tooltip.style.display = 'block';

                                    // 获取鼠标位置（相对于视口）
                                    const x = e.clientX;
                                    const y = e.clientY;

                                    // 获取窗口尺寸
                                    const windowWidth = window.innerWidth;
                                    const windowHeight = window.innerHeight;

                                    // 计算tooltip位置，使其贴近鼠标但不超出窗口边界
                                    let left, top;

                                    // 水平位置：优先放在右侧，如果放不下就放在左侧
                                    if (x + 10 + tooltipWidth <= windowWidth) {
                                        // 右侧放置，更贴近鼠标
                                        left = x + 10;
                                    } else if (x - 10 - tooltipWidth >= 0) {
                                        // 左侧放置
                                        left = x - 10 - tooltipWidth;
                                    } else {
                                        // 默认放在右侧，即使会超出边界
                                        left = Math.max(0, x + 10);
                                    }

                                    // 垂直位置：优先放在下方，如果放不下就放在上方
                                    if (y + 10 + tooltipHeight <= windowHeight) {
                                        // 下方放置，更贴近鼠标
                                        top = y + 10;
                                    } else if (y - 10 - tooltipHeight >= 0) {
                                        // 上方放置
                                        top = y - 10 - tooltipHeight;
                                    } else {
                                        // 默认放在下方，即使会超出边界
                                        top = Math.max(0, y + 10);
                                    }

                                    tooltip.style.left = `${left}px`;
                                    tooltip.style.top = `${top}px`;

                                    // 添加窗口大小变化监听器，确保tooltip位置正确
                                    const handleResize = () => {
                                        // 窗口大小变化时直接移除tooltip
                                        tooltip.remove();
                                    };

                                    window.addEventListener('resize', handleResize);

                                    // 在mouseleave时清理事件监听器
                                    const removeListeners = () => {
                                        window.removeEventListener('resize', handleResize);
                                        nodeElement.removeEventListener('mouseleave', removeListeners);
                                    };

                                    nodeElement.addEventListener('mouseleave', removeListeners);
                                });

                                nodeElement.addEventListener('mouseleave', () => {
                                    document.querySelector('.talent-tooltip')?.remove();
                                });*/

                                container.appendChild(nodeElement);
                            });

                            // 设置容器高度以支持滚动
                            const contentHeight = Math.max(maxHeight + 100, grid.clientHeight);
                            container.style.minHeight = contentHeight + 'px';

                            // 调整坐标缩放
                            adjustCoordinatesForScale();
                        }

                        // 窗口大小变化时重新调整
                        function onWindowResize() {
                            adjustCoordinatesForScale();
                        }

                        // 添加窗口大小变化监听器
                        const resizeObserver = new ResizeObserver(onWindowResize);
                        resizeObserver.observe(talentWindow);

                        // 重置天赋按钮
                        const resetButton = talentWindow.querySelector('#reset-talents');
                        if (resetButton) {
                            resetButton.addEventListener('click', () => {
                                const confirmResetAll = confirm('确定要重置所有天赋吗？');
                                if (confirmResetAll) {
                                    talentTree.allocated = {};
                                    game.xjzh_resetTalentEffect(mode);
                                    talentTree.points = 5 + get.xjzh_talentNum(mode, false); // 重置天赋点
                                    renderTalentNodes();
                                    talentWindow.querySelector('#talent-points').textContent = talentTree.points;
                                    // 保存数据
                                    saveTalentData();
                                }
                            });
                        }

                        // 退出按钮
                        const exitButton = talentWindow.querySelector('#exit-talents');
                        if (exitButton) {
                            exitButton.addEventListener('click', () => {
                                // 移除监听器
                                resizeObserver.unobserve(talentWindow);
                                talentWindow.remove();
                            });
                        }

                        // 初始渲染
                        renderTalentNodes();
                        bk.appendChild(talentWindow);
                    });
                }
            }
        }
    };
    state.refreshShowwindow(defaultChoice);
};