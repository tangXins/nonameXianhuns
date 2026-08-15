import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import achievementLists from './achievementList.js';
import { xjzhTitle } from '../index.js';
import { openChallengePage } from '../challenge/index.js';
import { openMemberCenterPage } from './memberCenterPage.js';
import { openMissionRewardPage } from './missionRewardPage.js';
import { openAchievementMainPage } from './pages/MainPage.js';
import { openAchievementEquipPage } from './pages/EquipPage.js';
import { openAchievementEquipIntro } from './pages/EquipIntroPage.js';
import { openShowRunePack, choosePlayer } from './pages/RunePackPage.js';
import { openAchievementChoujiang } from './pages/ChoujiangPage.js';
import { openAchievementView } from './pages/ViewPage.js';
//import { openForgingPage } from '../forge/index.js';

/**
    *成就系统部分代码和素材借鉴自《玄武江湖》及《时空枢纽》升华试炼部分代码借鉴自《时空枢纽》，感谢"寰宇星辰"和"鸽尔赞"的代码和素材支持（已取得作者同意）
*/

lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'mainPage');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'achievement');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'rune');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'memberCenter');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'reward');
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'cropper');

//成就列表
lib.xjzh_achievement = achievementLists;
//本局内已完成的成就
lib.xjzh_hasDoneAchievement = [];

//对局结束检测成就完成情况
lib.onover.push(function (ret) {
    if (ret && get.mode() == "identity" && game.me) {
        let player = game.me;

        //秋凉明"奇思爆破"成就
        if (get.is.playerNames(player, "xjzh_qixia_qiuliangming")) {
            let num = player.storage["xjzh_qixia_dikang"];
            if (typeof num == "number" && num >= 10) {
                if (!game.xjzhAchi.hasAchi('奇思爆破', 'character')) game.xjzhAchi.addProgress('奇思爆破', 'character', 1);
            }
        }

        //文鸯"披坚执锐"成就
        if (get.is.playerNames(player, "xjzh_sanguo_wenyang")) {
            let history = player.getAllHistory('useSkill', evt => ["xjzh_sanguo_pijian", "xjzh_sanguo_yongjue"].includes(evt.skill));
            let pijianNum = 0, yongjueNum = 0;
            for (let evt of history) {
                if (evt.skill === "xjzh_sanguo_pijian") pijianNum++;
                else if (evt.skill === "xjzh_sanguo_yongjue") yongjueNum++;
            }
            if (pijianNum >= 5 && yongjueNum >= 5 && !game.xjzhAchi.hasAchi('披坚执锐', 'character')) game.xjzhAchi.addProgress('披坚执锐', 'character', 1);
        }

        //女巫"地狱之火"成就
        if (get.is.playerNames(player, "xjzh_poe_nvwu")) {
            let storage = player.storage.xjzh_poe_zhaohuan;
            if (storage.includes(game.findPlayer(item => get.is.playerNames(item, "xjzh_poe_diyuliequan"))) && !game.xjzhAchi.hasAchi('地狱之火', 'special')) game.xjzhAchi.addProgress('地狱之火', 'special', 1);
        }

        //左幽"微妙玄通"成就
        if (get.is.playerNames(player, "xjzh_sanguo_zuoyou")) {
            let storage = player.storage.xjzh_sanguo_tongxuan;
            if (storage >= 10 && !game.xjzhAchi.hasAchi('微妙玄通', 'character')) game.xjzhAchi.addProgress('微妙玄通', 'character', 1);
        }

        //esp刘协"再兴炎汉"成就
        if (get.is.playerNames(player, "xjzh_sanguo_espliuxie")) {
            let history = player.getAllHistory('useSkill');
            let obj = {}, list = ["xjzh_sanguo_tiance", "xjzh_sanguo_tianming", "xjzh_sanguo_moubian", "xjzh_sanguo_zhongxing"];
            for (let i = 0; i < history.length; i++) {
                if (Object.keys(history[i]).includes("skill")) {
                    if (typeof obj[history[i].skill] == "undefined") {
                        if (list.includes(history[i].skill)) obj[history[i].skill] = 1;
                    }
                }
            }
            if (Object.keys(obj).length >= 4) {
                if (!game.xjzhAchi.hasAchi('再兴炎汉', 'character')) {
                    game.xjzhAchi.addProgress('再兴炎汉', 'character', 1);
                }
            }
        }

        //普通成就
        if (!get.config('double_character') && get.isXHwujiang(player)) {
            let name = get.nameList(player)[0];
            if (!game.xjzhAchi.hasAchi(xjzhTitle[name], 'character')) {
                game.xjzhAchi.addProgress(xjzhTitle[name], 'character', 1);
            }
        }
    }
});

/**
 * - 重写扩展菜单的命令
*/
let divFunction = ui.create.div;
ui.create.div = function () {
    let ret = divFunction.apply(this, arguments);
    if (arguments[0] == '.menubutton.round.highlight') {
        if (["执", "作"].includes(arguments[1])) {
            ret.listen(() => {});
        }
    }
    return ret;
};

/**
 * - 成就系统的函数和实现
*/
game.xjzhAchi = {
    //初始化成就系统数据
    init() {
        if (this.inited) return;

        // 仅需遍历key，无需深拷贝整个角色数据对象
        let xianhuns = Object.assign(
            {},
            lib.characterPack.XWTR,
            lib.characterPack.XWSG,
            lib.characterPack.XWCS,
            lib.characterPack.XWTZ,
            lib.characterPack.XWDM
        );

        if (xianhuns) {
            var firstWinSet = function (name) {
                let level = 1;
                if (lib.character[name][4].some(evt => {
                    return !['forbidai', 'unseen'].includes(evt);
                })) {
                    lib.xjzh_achievement['character'][xjzhTitle[name]] = {
                        name: xjzhTitle[name],
                        type: "character",
                        info: "使用" + lib.translate[name] + "获得一场胜利。",
                        level: level,
                        progress: 1,
                        design: "吃朵棉花糖",
                    }
                };
            };
            for (let name in xianhuns) {
                let bossCharacterList = ["xjzh_boss_waershen", "xjzh_boss_geligaoli", "xjzh_boss_duruier", "xjzh_boss_qier", "xjzh_boss_bingchuanjushou", "xjzh_boss_lilisi"];
                if (bossCharacterList.includes(name)) continue;
                if (!xjzhTitle[name]) continue;
                if (!lib.translate[name]) continue;
                firstWinSet(name);
            }
        }

        if (!game.getExtensionConfig("仙家之魂", "xjzh_newAchiInited")) {
            this.reset();
            game.saveExtensionConfig("仙家之魂", "xjzh_newAchiInited", true);
        }
        this.inited = true;
    },
    //重置已获得
    reset() {
        let config = game.xjzh_getQishuConfig();
        let key = {
            got: [],
            progress: {},
            date: {},
            character: [],
            unlock: []
        };
        let saveData = { ...config, achi: { ...key } };
        this.saveConfig(saveData);
    },
    //保存设置
    saveConfig: (key) => game.xjzh_saveQishuConfig(key),
    //计算成就数
    amount(type) {
        const types = ['character', 'game', 'special'];
        if (type) {
            if (!types.includes(type)) return -1;
            return Object.keys(lib.xjzh_achievement?.[type] || {}).length;
        }
        return types.reduce((sum, type) =>
            sum + Object.keys(lib.xjzh_achievement?.[type] || {}).length, 0);
    },
    //计算成就点数
    calculateScore() {
        const gots = game.xjzh_getQishuConfig()?.achi?.got || [];
        if (gots.length === 0) return 0;
        return gots.reduce((sum, achievement) => {
            const [type, name] = this.ofName(achievement);
            const info = this.info(name, type);
            return sum + (info?.level ?? 0);
        }, 0);
    },
    //计算已完成成就数
    amountOfGained(type) {
        const gots = game.xjzh_getQishuConfig()?.achi?.got || [];
        if (type) {
            const validTypes = ['character', 'game', 'special'];
            if (!validTypes.includes(type)) {
                return -1;
            }
            return gots.filter(achievement => achievement.startsWith(type)).length;
        }
        return gots.length;
    },
    //获取成就队列、并按指定方式排序
    checkList(type, filter = () => true, sort = (a, b) => {
        const aLevel = game.xjzhAchi.info(a, type)?.level || 0;
        const bLevel = game.xjzhAchi.info(b, type)?.level || 0;
        return aLevel - bLevel;
    }) {
        if (typeof type !== 'string' || !type) {
            console.error('类型参数必须是有效的字符串');
            return [];
        }

        const map = lib.xjzh_achievement?.[type];
        if (!map) {
            return [];
        }
        let list = Object.keys(map).filter(name => filter(name));
        list.sort(sort);
        return list;
    },
    //加入本局已完成成就记录
    addDone(name) {
        lib.xjzh_hasDoneAchievement.add(name);
    },
    //弹出达成新成就的提示框
    popupDialog(name) {
        game.playAudio('..', 'extension', '仙家之魂/audio/other', 'achievement_complete.mp3');

        let achievementName = this.getInfoName(name), nickname = get.xjzh_qishuUserName();

        game.showLevelUpMessage(nickname, "完成成就", achievementName);
        return achievementName;
    },
    //获取成就信息
    info(name, type) {
        return lib.xjzh_achievement?.[type]?.[name] ?? null;
    },
    // 达成新成就
    got(name) {
        const config = game.xjzh_getQishuConfig();
        const gotList = config.achi.got;
        const dateMap = config.achi.date;

        if (gotList.includes(name)) return;

        gotList.push(name);

        const now = new Date();
        dateMap[name] = now.getTime();

        this.addDone(name);
        this.popupDialog(name);
        this.gainTokens(name);

        this.saveConfig(config);
    },
    //将已领取成就奖励的成就存储
    unlock(name) {
        const config = game.xjzh_getQishuConfig();
        const rewarded = config.achi?.unlock ?? [];
        rewarded.push(name);
        config.achi.unlock = rewarded;
        this.saveConfig(config);
    },
    //需要成就解锁的武将保存
    unlockedCharacter(...characters) {
        const config = game.xjzh_getQishuConfig();
        const unlockedCharacters = config.achi?.character ?? [];
        const newCharacters = characters.filter(name => !unlockedCharacters.includes(name));

        if (newCharacters.length > 0) {
            let message = '解锁新角色';
            newCharacters.forEach(name => {
                unlockedCharacters.push(name);
                message += get.translation(name);
            });
            game.xjzh_openLoading(message);

            this.saveConfig(config);
        }
    },
    // 完成成就获取一定量的奖励
    gainTokens(name) {
        const [type, achievementName] = this.ofName(name);
        const info = this.info(achievementName, type);
        if (!info) return;
        const suipian = info.level * 50;
        const tokens = info.level;
        game.xjzh_changeTokens(tokens);
        game.xjzh_changeSuipian(suipian);
    },
    //增加成就进度
    addProgress(name, type, num) {
        const info = this.info(name, type);
        if (!info) return;

        const name2 = this.nameOf(name, type);
        const config = game.xjzh_getQishuConfig();
        const achiConfig = config.achi;

        if (!achiConfig.progress[name2]) {
            achiConfig.progress[name2] = 0;
        }

        achiConfig.progress[name2] += num;

        if (!achiConfig.character) {
            achiConfig.character = [];
        }

        this.updataProgress(name, type);
        this.saveConfig(config);
    },
    //重置某一个成就
    removeAchi(name, type) {
        const info = this.info(name, type);
        if (!info) return;

        const name2 = this.nameOf(name, type);
        const config = game.xjzh_getQishuConfig();
        const achiConfig = config.achi;

        if (!achiConfig.progress[name2]) return;

        achiConfig.progress[name2] = 0;

        const index = achiConfig.got.indexOf(name2);
        if (index > -1) {
            achiConfig.got.splice(index, 1);
        }

        if (achiConfig.date[name2]) {
            delete achiConfig.date[name2];
        }

        this.saveConfig(config);
    },
    //更新成就进度
    updataProgress(name, type) {
        const info = this.info(name, type);
        if (!info) return;

        const name2 = this.nameOf(name, type);
        const config = game.xjzh_getQishuConfig();
        const progress = config.achi.progress[name2];

        if (info.progress) {
            if (typeof info.progress === 'number') {
                if (progress >= info.progress) {
                    this.got(name2);
                }
            } else if (typeof info.progress === 'function') {
                if (info.progress(true)) {
                    this.got(name2);
                }
            }
        } else if (progress) {
            this.got(name2);
        } else {
            return;
        }

        this.saveConfig(config);
    },
    // 直接达成成就（不触发任何附属计算）
    directGot(name) {
        const config = game.xjzh_getQishuConfig();
        if (!config?.achi?.got?.includes(name)) {
            config.achi.got.push(name);
        }
        this.saveConfig(config);
    },
    // 判断成就是否已达成
    hasAchi(name, type) {
        if (typeof type === 'string') {
            const name2 = this.nameOf(name, type);
            return game.xjzh_getQishuConfig()?.achi?.got?.includes(name2);
        }
        return game.xjzh_getQishuConfig()?.achi?.got?.includes(name);
    },
    // 成就名存储转化
    nameOf(name, type) {
        return { 'character': 'character', 'game': 'game', 'special': 'special' }[type] + ',' + name;
    },
    // 成就名存储还原（返回值：[类别, 成就名]）
    ofName(name) {
        if (name == null) {
            return ['', ''];
        }
        const names = name.split(',', 2);
        const [type, achievementName] = [...names, '', ''];
        return [
            { 'character': 'character', 'game': 'game', 'special': 'special' }[type] || '',
            achievementName
        ];
    },
    // 获得成就文本
    getInfoName(name) {
        if (name == null) {
            return '';
        }
        const [type, achievementName] = this.ofName(name);
        const validType = { 'character': 'character', 'game': 'game', 'special': 'special' }[type] || '';
        const info = this.info(achievementName, validType)
        return info?.name || achievementName;
    },
    // 页面方法（已提取到pages/目录）
    openAchievementMainPage,
    openAchievementEquipPage,
    openAchievementEquipIntro,
    openShowRunePack,
    choosePlayer,
    openAchievementChoujiang,
    openAchievementView,
    //打开挑战页面
    openChallengePage: openChallengePage,
    //打开会员中心页面
    openMemberCenterPage: openMemberCenterPage,
    //打开成就任务列表
    openMissionRewardPage: openMissionRewardPage,
    //打开打造界面
    //penForgingPage: openForgingPage,
};

Date.prototype.format = function (fmt) {
    const components = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
        const match = fmt.match(/(y+)/);
        const yearStr = this.getFullYear().toString();
        const yearPart = yearStr.substring(4 - match[0].length);
        fmt = fmt.replace(match[0], yearPart);
    }

    for (let token in components) {
        if (new RegExp('(' + token + ')').test(fmt)) {
            const match = fmt.match(new RegExp('(' + token + ')'));
            const value = components[token];

            const valueStr = value.toString();
            const formattedValue = match[0].length === 1
                ? valueStr
                : ('00' + valueStr).slice(-2);

            fmt = fmt.replace(match[0], formattedValue);
        }
    }

    return fmt;
};
