import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import { introduces } from '../index.js';
import { runes } from '../other/rune.js';
import { buffMap } from '../other/buff.js';

const xjzh_allChineseChars = Array.from(
    { length: 0x9FFF - 0x4E00 + 1 },
    (_, i) => String.fromCharCode(0x4E00 + i)
);


/**
 * get方法扩展
 * @type  {import("../../../@types/get").gets}
 */
const gets = {
    xjzh_noAddBuffBool(player, buff) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };

        return this.xjzh_noAddBuffFilter(player).includes(get.xjzh_buffName(buff, false));
    },
    xjzh_noAddBuffFilter(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        let skills = player.getSkills(true, true, true).filter(skill => {
            let info = get.info(skill);
            if (!get.is.object(info.ai)) return false;
            return info.ai.noAddBuff == true;
        }), noAddBufflist = [];

        for (let skill of skills) {
            let info = get.info(skill);
            let list = info.ai.noAddBuffFilter(player) || [];
            noAddBufflist.addArray(list);
        }
        return noAddBufflist;
    },
    xjzh_buffType(name) {
        let buff = this.xjzh_buffName(name, false);
        let info = this.xjzh_buffInfo(buff, "deBuff");
        return info == true ? "deBuff" : "buff";
    },
    xjzh_isDebuff(name) {
        let buff = this.xjzh_buffName(name, false);
        return this.xjzh_buffInfo(buff, "deBuff");
    },
    xjzh_buffList(player, filter) {
        let list = [], map = Object.keys(buffMap);
        for (let name of map) {
            let buff = this.xjzh_buffName(name);
            if (this.xjzh_buffNum(player, buff) == 0) continue;
            if (filter && typeof filter == 'function') {
                if (filter(player, buff) == true) list.push(buff);
                continue;
            }
            list.push(buff);
        }
        return list;
    },
    xjzh_buffNum(player, name) {
        let buff = this.xjzh_buffName(name);
        return (!player.storage[buff] || player.storage[buff] < 0) ? 0 : player.storage[buff];
    },
    xjzh_buffTranslate(name) {
        if (typeof name != 'string') return;
        let info;
        if (buffMap.hasOwnProperty(name)) info = buffMap[name].intro;
        else return;
        return info.name;
    },
    xjzh_buffInfo(name, filter) {
        let buff = this.xjzh_buffName(name, false);
        let info;
        if (buffMap.hasOwnProperty(buff)) info = buffMap[buff].buffInfo;
        else return null;
        if (!filter) return info;
        if (filter == 'limit' && !info.limit) return Infinity;
        return info[filter];
    },
    xjzh_buffName(name, boolean) {
        if (typeof name != 'string') return;
        let buff = name;
        if (buff.indexOf('_') == 0) buff = buff.slice(1);
        if (boolean !== false) {
            if (!buff.startsWith('xjzh_buff_')) buff = 'xjzh_buff_' + buff;
        } else {
            if (buff.startsWith('xjzh_buff_')) buff = buff.slice('xjzh_buff_'.length);
        }
        return buff;
    },
    xjzh_magicResistance(player, damage, reductionPercent = 0, costPerDamage = 10) {
        let nameList = get.nameList(player), mana = player.xjzh_getMp();

        if (nameList.includes("xjzh_diablo_yafeikela")) {
            if (nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_linghunlaoyin", name)).length) {
                reductionPercent += 20;
            }
        }

        if (nameList.includes("xjzh_qixia_qiuliangming")) {
            costPerDamage *= 1.6;
        }

        const actualCostPerDamage = costPerDamage * (1 - reductionPercent / 100);
        const maxReducibleDamage = Math.floor(mana / actualCostPerDamage);
        const actualReducedDamage = Math.min(maxReducibleDamage, damage);
        const manaUsed = actualReducedDamage * actualCostPerDamage;
        const remainingDamage = damage - actualReducedDamage;
        const remainingMana = mana - manaUsed;
        return {
            originalDamage: damage,          // 原始伤害
            remainingDamage: remainingDamage, // 抵消后剩余伤害
            actualReducedDamage: actualReducedDamage, // 实际抵消的伤害
            manaUsed: manaUsed,              // 消耗的魔力
            remainingMana: remainingMana,    // 剩余魔力
            costPerDamage: actualCostPerDamage // 实际每点伤害消耗的魔力
        };
    },
    xjzh_summoner(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        let history = player.getAllHistory("custom", evt => evt.isZhaohuan && evt.source);
        if (!history) return null;
        let source = history
            .map(evt => evt.source)
            .filter(target => target.isAlive())
            .toUniqued()
            .find(item => get.itemtype(item) == "player");
        return source;
    },
    xjzh_minion(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        let history = player.getAllHistory("custom", evt => evt.isZhaohuan && evt.source == player);
        if (!history) return [];
        let source = history
            .map(evt => evt.player)
            .filter(target => target.isAlive());
        return source;
    },
    xjzh_talentUnlock(mode, points) {
        if (typeof mode != "string" || typeof points != "string") return false;
        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
        const unlocked = config?.talent?.[mode]?.allocated;
        if (!unlocked) return false;
        if (!unlocked[points]) return false;
        return unlocked[points];
    },
    xjzh_talentReward(mode, reward) {
        if (typeof mode != "string" || typeof reward != "string") return 0;
        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
        const effects = config?.talent?.[mode]?.effects;
        if (!effects) return 0;
        if (!effects[reward]) return 0;
        return effects[reward];
    },
    xjzh_talentNum(arg, bool) {
        if (typeof arg != "string") return 0;
        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
        config.talent ??= {};
        config.talent[arg] ??= {};
        config.talent[arg].points ??= 5;
        config.talent[arg].originalPoints ??= 0;
        game.xjzh_saveQishuConfig(config);
        return bool ? config.talent[arg].originalPoints + config.talent[arg].points : config.talent[arg].originalPoints;
    },
    xjzh_runeTranslate(arg, type) {
        return runes?.[type]?.[arg]?.translate || "";
    },
    xjzh_runeTranslateInfo(arg, type) {
        return runes?.[type]?.[arg]?.translateInfo?.() || "";
    },
    xjzh_runeTypeTranslate(arg) {
        const type = this.xjzh_runeType(arg);
        return type === "ritual" ? "仪式符文" : "祷告符文";
    },
    xjzh_runeType(arg) {
        if (!arg) return "";
        for (const [type, runeGroup] of Object.entries(runes)) {
            if (Object.hasOwn(runeGroup, arg)) {
                return type;
            }
        }
        return "";
    },
    xjzh_runeList(type) {
        if (!type) {
            return Object.values(runes).flatMap(Object.keys);
        }
        return Object.keys(runes[type] || []);
    },
    xjzh_runeQishuList(item) {
        return game.xjzh_getQishuConfig()?.fuwenEquip?.[item] || [];
    },
    xjzh_runeListNumber(name) {
        return game.xjzh_getQishuConfig()?.fuwen?.[name] || 0;
    },
    xjzh_runeListName(type) {
        const config = game.xjzh_getQishuConfig();
        return config?.fuwen
            ? Object.keys(config.fuwen).filter(item =>
                this.xjzh_runeType(item) === type && this.xjzh_runeListNumber(item) > 0
            )
            : [];
    },
    xjzh_qishuUserName() {
        return game.xjzh_getQishuConfig()?.name || "无名玩家";
    },
    xjzh_qishuUserLevel() {
        return game.xjzh_getQishuConfig()?.level;
    },
    xjzh_qishuUserExp() {
        return game.xjzh_getQishuConfig()?.exp;
    },
    xjzh_qishuBag() {
        return game.xjzh_getQishuConfig()?.bag || [];
    },
    xjzh_qishuCraftedBag() {
        return game.xjzh_getQishuConfig()?.craftedBag || [];
    },
    xjzh_qishuMergedBag() {
        const config = game.xjzh_getQishuConfig();
        if (!config) return { counts: {}, crafted: [] };
        const normalItems = config.bag || [];
        const craftedItems = config.craftedBag || [];
        const counts = {};
        normalItems.forEach(function(itemId) {
            counts[itemId] = (counts[itemId] || 0) + 1;
        });
        craftedItems.forEach(function(c) {
            counts[c.id] = (counts[c.id] || 0) + 1;
        });
        return { counts: counts, crafted: craftedItems };
    },
    xjzh_cailiaoList() {
        return game.xjzh_getQishuConfig()?.cailiao || {};
    },
    xjzh_ensureNumberValue(key) {
        const config = game.xjzh_getQishuConfig();
        if (typeof config?.[key] !== 'number') {
            config[key] = 0;
            game.xjzh_saveQishuConfig(config);
        }
        return config[key];
    },
    xjzh_suipian() {
        return this.xjzh_ensureNumberValue('suipian');
    },
    xjzh_tokens() {
        return this.xjzh_ensureNumberValue('tokens');
    },
    xjzh_cailiaoTranslate(arg) {
        return game.xjzh_getQishuConfig()?.cailiao?.[arg]?.[0] || "";
    },
    xjzh_cailiaoTranslateInfo(arg) {
        return game.xjzh_getQishuConfig()?.cailiao?.[arg]?.[2] || "";
    },
    xjzh_cailiaoNum(arg) {
        const cailiao = game.xjzh_getQishuConfig()?.cailiao || {};
        if (typeof arg !== 'string') {
            return Object.fromEntries(
                Object.entries(cailiao).map(([key, value]) => [key, value[1] || 0])
            );
        }
        return cailiao[arg]?.[1] || 0;
    },
    xjzh_qishuTranslate(arg) {
        return lib.xjzh_qishuyaojians?.[arg]?.translate || "";
    },
    xjzh_qishuTranslateInfo(arg) {
        return lib.xjzh_qishuyaojians?.[arg]?.translate_info || "";
    },
    xjzh_equiped(playerName) {
        return game.xjzh_getQishuConfig()?.player?.[playerName] || [];
    },
    xjzh_equipPlayer(name) {
        return game.xjzh_getQishuConfig()?.equip?.[name] || [];
    },
    xjzh_equipInfo(name) {
        return lib.xjzh_qishuyaojians?.[name] || {};
    },
    xjzh_rands(x, y, z) {
        x = typeof x === 'number' ? x : 1;
        y = typeof y === 'number' ? y : x;
        z = typeof z === 'number' ? z : 1;
        z = Math.min(z, y - x + 1);

        const num = y - x + 1;
        const numbers = [...Array(num)].map((_, i) => i + x);
        return numbers.randomGets(z);
    },
    randomCards(num, name, create) {
        num = (typeof num == 'number') ? num : 1;
        if (typeof name != 'function' || num <= 0) return [];

        let cards, list = [];
        if (create != 'discardPile') {
            let cardPile = Array.from(ui.cardPile.childNodes);
            list = list.concat(cardPile);
        }
        if (create != 'cardPile') {
            let discardPile = Array.from(ui.discardPile.childNodes);
            list = list.concat(discardPile);
        }
        cards = list.filter(name);
        if (!cards.length) return [];
        return num >= cards.length ? cards : cards.randomGets(num);
    },
    xjzh_deEffect(player) {
        if (player.countCards('j', card => card.name != "jydiy_yungongliaoshang") > 0) return true;
        if (player.isTurnedOver()) return true;
        if (player.isLinked()) return true;
        if (player.countDisabled() >= 1) return true;
        if (this.xjzh_buffList(player).some(item => get.xjzh_isDebuff(item))) return true;
        return false;
    },
    xjzh_deEffect2(player) {
        let num = 0;
        num += player.countCards('j', card => card.name != "jydiy_yungongliaoshang");
        if (player.isTurnedOver()) num++;
        if (player.isLinked()) num++;
        num += player.countDisabled();
        num += this.xjzh_buffList(player, (_, item) => lib.xjzh_Debuff.includes(item)).length;
        return num;
    },
    subtype2(obj, player) {
        if (typeof obj == "string") obj = { name: obj };
        if (typeof obj != "object") return "";
        const name = get.name(obj, player);
        if (!lib.card[name]) return "";
        let subtype2 = lib.card[name].subtype2;
        return subtype2;
    },
    xjzh_isMaxMp(player) {
        if (!player || get.itemtype(player) != "player") {
            console.error("Player不存在");
            return false;
        }
        return player.xjzh_hasMpNumber() && player.xjzhMaxMp == player.xjzhMp;
    },
    xjzh_consumeMp(player) {
        if (!player || get.itemtype(player) != "player") {
            console.error("Player不存在");
            return NaN;
        }
        if (!player.xjzh_hasMpNumber()) return NaN;
        if (typeof player.xjzhMaxMp !== 'number' || typeof player.xjzhMp !== 'number') return NaN;
        return player.xjzh_getMaxMp() - player.xjzh_getMp();
    },
    xjzh_kernel() {
        const userAgent = navigator.userAgent.toLowerCase();
        const patterns = {
            trident: 'trident',
            presto: 'presto',
            webKit: 'applewebkit',
            gecko: 'gecko',
            mobile: /applewebkit.*mobile.*/,
            ios: /\(i[^;]+;( u;)? cpu.+mac os x/,
            android: /android|linux/,
            iPhone: 'iphone',
            iPad: 'ipad',
            webApp: 'safari',
            weixin: 'micromessenger',
            qq: /\sqq/
        };

        for (const [key, pattern] of Object.entries(patterns)) {
            if (typeof pattern === 'string') {
                if (key === 'webApp' ? !userAgent.includes(pattern) : userAgent.includes(pattern)) {
                    return game.xjzh_toLowerCase(key);
                }
            } else if (pattern.test(userAgent)) {
                return game.xjzh_toLowerCase(key);
            }
        }

        return null;
    },
    xjzh_checkChinese(str) {
        let reg = new RegExp("[\\u4E00-\\u9FFF]");
        return reg.test(str);
    },
    xjzh_isChinese(str) {
        return /^[\u4E00-\u9FA5]+$/.test(str);
    },
    xjzh_device() {
        const userAgent = navigator.userAgent.toLowerCase();
        let platform = '';
        if (navigator.userAgentData && navigator.userAgentData.platform) {
            platform = navigator.userAgentData.platform.toLowerCase();
        } else {
            if (userAgent.includes('win')) {
                platform = 'win';
            } else if (userAgent.includes('mac')) {
                platform = 'mac';
            }
        }

        const mobileAgents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];

        for (const agent of mobileAgents) {
            if (userAgent.includes(agent)) {
                return agent;
            }
        }

        if (platform.startsWith("win")) {
            return "windows";
        } else if (platform.includes("mac")) {
            return "mac";
        }

        return null;
    },
    xjzh_filterGainSkill(skill, func, player, target) {
        const basicConditions = !lib.translate[skill]
            || !lib.translate[skill].length
            || !lib.translate[skill + '_info']
            || !lib.translate[skill + '_info'].length
            || !lib.skill[skill]
            || lib.skill[skill].sub
            || lib.skill[skill].charlotte
            || lib.skill[skill].nopop;

        if (basicConditions) return false;
        return !func || func(skill, player, target);
    },
    xjzh_checkSvipDate() {
        const config = game.xjzh_getQishuConfig();
        if (!config.svip || !Array.isArray(config.svip)) return false;
        const svipConfig = config.svip;
        if (!svipConfig.length || !this.xjzh_checkDate(svipConfig[0], svipConfig[1])) return false;
        return svipConfig;
    },
    xjzh_checkDate(beginDateStr, endDateStr) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const beginDate = new Date(beginDateStr);
        const endDate = new Date(endDateStr);

        // 检查日期是否有效
        if (isNaN(beginDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('传入的日期格式无效');
            return false;
        }

        // 将开始日期和结束日期的时间部分设置为 00:00:00
        beginDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        return currentDate >= beginDate && currentDate <= endDate;
    },
    xjzh_checkTime(beginTime, endTime) {
        const nowDate = new Date();
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        // 检查时间格式是否有效
        if (!timeRegex.test(beginTime) || !timeRegex.test(endTime)) {
            console.error('传入的时间格式无效，应为 HH:MM');
            return false;
        }

        const [beginHour, beginMinute] = beginTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const beginDate = new Date(nowDate);
        beginDate.setHours(beginHour, beginMinute, 0, 0);

        const endDate = new Date(nowDate);
        endDate.setHours(endHour, endMinute, 0, 0);

        return nowDate.getTime() >= beginDate.getTime() && nowDate.getTime() <= endDate.getTime();
    },
    xjzh_daysBetweenDates(startDateStr, endDateStr) {
        const startDate = new Date(startDateStr);
        if (isNaN(startDate.getTime())) {
            console.error(`无效的开始日期: ${startDateStr}`);
            return NaN;
        }
        const endDate = new Date(endDateStr);
        if (isNaN(endDate.getTime())) {
            console.error(`无效的结束日期: ${endDateStr}`);
            return NaN;
        }

        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    },
    isXHwujiang(player) {
        if (typeof player === "undefined" || (typeof player !== "object" && typeof player !== "string") || (typeof player === "object" && get.itemtype(player) !== "player")) {
            throw new Error(`函数接受了一个不是Player/String的东西: ${typeof player}: ${player}`);
        }
        const names = typeof player === "string" ? [player] : get.nameList(player);
        return names.some(item => {
            const characters = get.character(item);
            return characters.trashBin?.includes('xjzh_die_audio');
        });
    },
    xjzh_isZhaohuan(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        let nameList = get.nameList(player);
        return nameList.some(name => get.character(name).isZhaohuan === true);
    },
    xjzh_zengyiSkills(player) {
        let list = [
            "mieque", "weisong", "liuzhuan", "pianxian", "chongsu", "shunying", "fengyue", "hunqian", "mengdie", "poxiao", "shuangsheng", "xuanbian", "moran", "shenghua", "chaoti", "jinghong", "shefan", "longfei", "yunchui", "fengyang", "dizai", "tianfu", "jiehuo", "xuanbing", "jifeng", "jinglei", "lieshi", "lianyu", "raoliang", "difu", "tianze", "zhangyi", "tunshi"
        ];
        if (get.mode() == "identity") list.addArray(["daoge", "zhuanpo"]);
        if (get.mode() == "xjzh_challenge") list.removeArray(["mengdie", "daoge", "hunqian", "tunshi", "mieque"]);
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        if (get.is.playerNames(player, "xjzh_sanguo_zuoyou")) list.removeArray(["shuangsheng", "pianxian"]);
        return list.map(skill => "xjzh_zengyi_" + skill);
    },
    chineseToArabic(numStr) {
        const chineseNums = { '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };
        const units = { '十': 10, '百': 100, '千': 1000, '万': 10000, '亿': 100000000 };

        let arabicNum = 0;
        let unit = 1;
        let isUnit = false;

        for (let i = numStr.length - 1; i >= 0; i--) {
            const char = numStr[i];
            if (char in chineseNums) {
                arabicNum += chineseNums[char] * unit;
                isUnit = false;
            } else if (char in units) {
                if (isUnit) {
                    console.warn('忽略连续的单位:', char);
                    continue;
                }
                unit = units[char];
                isUnit = true;
            } else {
                throw new Error(`非预期字符: ${char}`);
            }
        }
        return arabicNum;
    },
    xjzh_nearbyRole(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };
        let nextPlayer = player.getNext();
        let previousPlayer = player.getPrevious();
        return [nextPlayer, previousPlayer];
    },
    xjzh_randomChineseString(number) {
        return xjzh_allChineseChars.randomGets(number).join('');
    },
    xjzh_randomEnglishString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    xjzh_calculateHash(code) {
        let type;
        if (typeof code == "string") type = "string";
        else if (typeof code == "function") type = "function";
        else type = "undefined";
        if (typeof type === "undefined") throw new Error(`函数接受了一个不是字符串/函数的东西: ${type}: ${code}`);
        if (type == "function") code = code.toString();
        let hash = 0, i, chr;
        if (code.length === 0) return hash;
        for (i = 0; i < code.length; i++) {
            chr = code.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    },
    xjzh_translateInfo(...args) {
        let str, bool;
        if (!args.length) throw new Error('参数不能为空');
        for (const arg of args) {
            if (typeof arg === 'string') str = arg;
            else if (typeof arg === 'boolean') bool = arg;
        }

        if (!this.xjzh_checkChinese(str) && !bool) return str;

        let introducesLists = Object.keys(introduces);
        for (let item of introducesLists) {
            if (introduces[item].name === str) {
                str = item;
                break;
            }
        }
        return bool ? (introduces[str]?.info ?? str) : str;

    },
    // ============ 魔力系统配置 ============
    xjzh_mpConfig: {
        RECOVER_ANIMATION: {
            PARTICLE_COUNT: 30,
            DURATION: 700,
            PARTICLE_TAIL: 500,
            TEXT_RISE_DISTANCE: 60,
            SPEED_SCALE: 0.2,
            LIFE_SCALE: 4,
        },
        UI: {
            BAR_RADIUS: "50px",
            ANIMATION_DURATION: 1500,
        },
    },
    // ============ 魔力系统辅助函数 ============
    xjzh_animateMpWidth(element, targetWidth, duration) {
        duration = duration || 1500;
        let startWidth = parseFloat(element.style.width) || 0;
        let startTime = performance.now();

        // 动画竞争检查：使用递增ID确保只有最新的动画能执行
        element._mpAnimId = (element._mpAnimId || 0) + 1;
        const currentId = element._mpAnimId;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(timestamp) {
            // 如果ID不匹配，说明有新动画启动，直接return
            if (element._mpAnimId !== currentId) return;

            let timeElapsed = timestamp - startTime;
            let progress = timeElapsed / duration;
            let easingProgress = easeInOutCubic(progress);
            let currentWidth = startWidth + easingProgress * (targetWidth - startWidth);
            element.style.width = currentWidth + "%";
            if (timeElapsed < duration) {
                requestAnimationFrame(step);
            } else {
                element.style.width = targetWidth + "%";
            }
        }

        requestAnimationFrame(step);
    },
    xjzh_createMpParticle(config, x, y) {
        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.speed = {
                    x: (-1 + Math.random() * 2) * config.SPEED_SCALE,
                    y: (-5 + Math.random() * 5) * config.SPEED_SCALE,
                };
                this.location = {
                    x: x + Math.round(Math.random() * 60) - 30,
                    y: y + Math.round(Math.random() * 40) - 20,
                };
                this.radius = 2 + Math.random() * 3;
                this.life = (20 + Math.random() * 20) * config.LIFE_SCALE;
                this.death = this.life;
                this.active = true;
            }
        }
        return Particle;
    },
    xjzh_drawMpParticles(surface, particles, config) {
        surface.globalCompositeOperation = "lighter";
        particles.forEach(p => {
            if (!p.active) return;
            const opacity = p.death / p.life;
            const gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
            gradient.addColorStop(0, `rgba(0, 0, 255, ${opacity})`);
            gradient.addColorStop(0.7, `rgba(0, 0, 255, ${opacity})`);
            gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');
            surface.fillStyle = gradient;
            surface.beginPath();
            surface.arc(p.location.x, p.location.y, p.radius / 2, 0, Math.PI * 2);
            surface.fill();
        });
    },
    xjzh_updateMpParticles(particles, time, config) {
        let activeCount = 0;
        particles.forEach(p => {
            if (!p.active) return;
            p.death--;
            p.radius += 0.2;
            p.location.x += p.speed.x;
            p.location.y += p.speed.y;
            if (p.death < 0 || p.radius < 0) {
                if (time + config.PARTICLE_TAIL >= config.DURATION) {
                    p.active = false;
                } else {
                    p.reset();
                }
            }
            if (p.active) activeCount++;
        });
        return activeCount;
    },
    xjzh_drawMpText(surface, progress, num, x, y, config, textOpacityRef) {
        let textOpacity = 4 * progress * (1 - progress);
        textOpacityRef.value = textOpacity;
        if (textOpacity > 0 && num > 0) {
            const textY = y - 40 - (progress * config.TEXT_RISE_DISTANCE);
            surface.fillStyle = `rgba(255, 215,0, ${textOpacity})`;
            surface.font = 'bold 50px "STXingkai", sans-serif';
            surface.textAlign = 'center';
            surface.textBaseline = 'middle';
            surface.fillText(`+${num}`, x, textY);
        }
    },
    xjzh_randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

};

Object.assign(get, gets);