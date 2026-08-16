import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import { createProgress } from '../../../../../noname/library/update.js';
import { introduces } from '../index.js';
import { updateLog } from '../update/index.js';

game.updateLog = updateLog;

// 魔力弹窗样式缓存，避免重复创建
let _cachedMpPopupStyle = null;

/**
 * game方法扩展
 * @type  {import("../../../@types/game").games}
 */
const games = {
    xjzh_includesArrays(arr, ...args) {
        let list, bool;
        for (const arg of args) {
            if (Array.isArray(arg)) list = arg;
            else if (typeof arg === 'boolean') bool = arg;
            else bool = false;
        }
        if ((typeof bool !== "undefined" && typeof bool !== "boolean")
            || (typeof list !== "undefined" && !Array.isArray(list))
            || (typeof arr !== "undefined" && !Array.isArray(arr))) {
            throw new Error(`函数接受了一个不是数组/布尔值的东西: ${list}: ${bool}：${arr}`);
        }
        if (!bool) return arr.some(item => list.includes(item));
        const setA = new Set(arr), setB = new Set(list);
        if (setA.size !== setB.size) return false;
        for (const value of setA) if (!setB.has(value)) return false;
        return true;
    },
    xjzh_openLoading(str) {
        const existingDialogBK = Array.from(ui.window.childNodes).find(
            node => node && node.classList && node.classList.contains('xjzh-loading-dialog-bk')
        );

        if (existingDialogBK && existingDialogBK.xjzh_dialog) {
            const dialog = existingDialogBK.xjzh_dialog;
            if (str && typeof str == 'string' && str.trim()) {
                dialog.subViews.text.textContent = str;
            }
            return dialog;
        }

        const dialogBK = ui.create.div(ui.window, {
            zIndex: 10000,
            width: '100%',
            height: '100%'
        });
        dialogBK.classList.add('xjzh-loading-dialog-bk');

        const dialog = ui.create.div('.xjzh-loading', dialogBK);
        const text = ui.create.div('.xjzh-loading-text', dialog);
        dialog.subViews = { text };

        if (str && typeof str == 'string' && str.trim()) {
            text.textContent = str;
        }

        dialog.close = function () {
            if (dialogBK && dialogBK.parentNode) {
                dialogBK.delete();
            }
        };

        dialogBK.listen(function () {
            dialog.close();
        });

        dialogBK.xjzh_dialog = dialog;

        return dialog;
    },
    xjzh_magicResistance(event, trigger, player) {
        let list = get.xjzh_magicResistance(player, trigger.num);

        if (!list || typeof list.actualReducedDamage !== 'number' || typeof list.manaUsed !== 'number') {
            return;
        }

        let actualReducedDamage = Math.min(list.actualReducedDamage, trigger.num);
        trigger.num = Math.max(0, trigger.num - actualReducedDamage);

        let manaUsed = list.manaUsed;
        if (player.xjzh_getMp() < manaUsed) {
            manaUsed = player.xjzh_getMp();
        }
        player.xjzh_changeMp(-manaUsed);

        game.log(`${get.translation(player)}受到 ${trigger.num} 点伤害，消耗 ${manaUsed} 点魔力抵消 ${actualReducedDamage} 点伤害`);

        let next = game.createEvent('xjzh_magicResistance', false);
        next.player = player;
        Object.assign(next, { ...list, actualReducedDamage, manaUsed });
        next.setContent(async function () {
            this.trigger('xjzh_magicResistance');
        });
    },
    async xjzh_showInputBox(event, trigger, player) {
        // 创建并注入样式
        const style = document.createElement('style');
        style.textContent = `
				.xjzh-input-dialog {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					border-radius: 12px;
					padding: 20px;
					box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
					min-width: 320px;
				}
				.xjzh-input-title {
					color: #fff;
					font-size: 16px;
					font-weight: bold;
					margin-bottom: 15px;
					text-align: center;
					text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
				}
				.xjzh-input-container {
					padding: 0 5px;
				}
				.xjzh-input-field {
					width: 100%;
					padding: 12px 15px;
					font-size: 16px;
					border: 2px solid rgba(255, 255, 255, 0.3);
					border-radius: 8px;
					background: rgba(255, 255, 255, 0.95);
					color: #333;
					outline: none;
					transition: all 0.3s ease;
					box-sizing: border-box;
				}
				.xjzh-input-field:focus {
					border-color: #fff;
					box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
					background: #fff;
				}
				.xjzh-input-field::placeholder {
					color: #999;
				}
				.xjzh-confirm-btn {
					margin-top: 15px;
					padding: 10px 30px;
					background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
					color: #fff;
					border: none;
					border-radius: 8px;
					font-size: 16px;
					font-weight: bold;
					cursor: pointer;
					width: 100%;
					transition: all 0.3s ease;
					box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
				}
				.xjzh-confirm-btn:hover {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
				}
				.xjzh-confirm-btn:active {
					transform: translateY(0);
				}
			`;
        document.head.appendChild(style);

        // 创建 dialog
        const dialog = ui.create.dialog(false);
        dialog.classList.add('xjzh-input-dialog');

        // 添加标题
        const titleDiv = document.createElement('div');
        titleDiv.className = 'xjzh-input-title';
        titleDiv.textContent = '请输入至多 5-15 个字符';
        dialog.add(titleDiv);

        // 创建输入框容器
        const containerDiv = document.createElement('div');
        containerDiv.className = 'xjzh-input-container';

        // 创建输入框
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'xjzh-input-field';
        input.setAttribute('maxlength', '15'); // 英文最大长度
        input.placeholder = '请输入武将名（汉字最多 5 个，字母最多 15 个）';

        // 实时输入验证和清理
        input.addEventListener('input', () => {
            const originalValue = input.value;

            // 移除所有非汉字和非字母的字符
            let cleanedValue = originalValue.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '');

            // 检测主要是汉字还是字母
            const hasChinese = /[\u4e00-\u9fa5]/.test(cleanedValue);
            const hasLetters = /[a-zA-Z]/.test(cleanedValue);

            if (hasChinese && !hasLetters) {
                // 纯汉字：最多 5 个
                const chineseChars = cleanedValue.match(/[\u4e00-\u9fa5]/g) || [];
                if (chineseChars.length > 5) {
                    // 截取前 5 个汉字
                    let result = '';
                    let count = 0;
                    for (const char of cleanedValue) {
                        if (/[\u4e00-\u9fa5]/.test(char)) {
                            if (count < 5) {
                                result += char;
                                count++;
                            }
                        }
                    }
                    cleanedValue = result;
                }
            } else if (hasLetters && !hasChinese) {
                // 纯字母：最多 15 个
                if (cleanedValue.length > 15) {
                    cleanedValue = cleanedValue.slice(0, 15);
                }
            } else if (hasChinese && hasLetters) {
                // 混合输入：优先保留汉字（最多 5 个），然后保留字母（最多 15 个）
                let result = '';
                let chineseCount = 0;
                let letterCount = 0;

                for (const char of cleanedValue) {
                    if (/[\u4e00-\u9fa5]/.test(char)) {
                        if (chineseCount < 5) {
                            result += char;
                            chineseCount++;
                        }
                    } else if (/[a-zA-Z]/.test(char)) {
                        if (letterCount < 15) {
                            result += char;
                            letterCount++;
                        }
                    }
                }
                cleanedValue = result;
            }

            // 如果清理后的值与原值不同，则更新输入框
            if (cleanedValue !== originalValue) {
                input.value = cleanedValue;
            }
        });

        // 阻止非法字符的按键输入（可选的额外防护）
        input.addEventListener('keydown', e => {
            e.stopPropagation();

            // 允许：退格、删除、方向键、Ctrl/Cmd 组合键
            if ([8, 46, 37, 39, 91, 17, 18].includes(e.keyCode) ||
                e.ctrlKey || e.metaKey || e.altKey) {
                return;
            }

            const char = String.fromCharCode(e.which || e.keyCode);
            const isChinese = /[\u4e00-\u9fa5]/.test(char);
            const isLetter = /[a-zA-Z]/.test(char);

            // 只允许汉字和字母输入
            if (!isChinese && !isLetter) {
                e.preventDefault();
            }
        });

        containerDiv.appendChild(input);
        dialog.add(containerDiv);

        // 返回一个 Promise 来等待用户输入
        let inputValue = '';
        await new Promise((resolve) => {
            // AI 逻辑
            if (!event.isMine()) {
                const list = game.players
                    .filter(item => !item.isFriendsOf(player) && item !== player)
                    .map(item => (lib.translate[item.name] || '').replace(/[神，界，OL，手杀，sp]/g, ''));

                let uniqueChars = '';
                for (const item of list) {
                    for (let i = 0; i < item.length; i++) {
                        if (!uniqueChars.includes(item[i])) {
                            uniqueChars += item[i];
                        }
                    }
                }

                inputValue = uniqueChars.slice(0, 5);
                dialog.remove();
                style.remove();
                resolve();
            } else {
                // 玩家逻辑 - 创建确认按钮
                const confirmButton = ui.create.control('确定', () => {
                    if (!input.value.trim()) {
                        // 视觉反馈：输入为空时闪烁红色边框
                        input.style.borderColor = '#ff6b6b';
                        input.focus();
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                        return;
                    }
                    inputValue = input.value.trim();
                    confirmButton.remove();
                    dialog.remove();
                    style.remove();
                    resolve();
                });

                // 支持回车确认
                input.addEventListener('keypress', e => {
                    if (e.key === 'Enter' && input.value.trim()) {
                        confirmButton.click();
                    }
                });

                // 打开对话框并暂停游戏
                dialog.open();
                game.pause();

                // 聚焦输入框
                setTimeout(() => input.focus(), 100);
            }
        });

        game.resume();

        // 验证输入是否为中文
        if (!get.xjzh_checkChinese(inputValue)) {
            return null; // 返回 null 表示验证失败
        }

        return inputValue; // 返回用户输入的字符串
    },
    xjzh_stealAttributes(player, target) {
        if (!player.storage.xjzh_stealAttributes) player.storage.xjzh_stealAttributes = {
            drawNum: 0,
            maxHandCard: 0
        };

        if (!target.storage.xjzh_stealAttributes) target.storage.xjzh_stealAttributes = {
            drawNum: 0,
            maxHandCard: 0
        };

        let list = ["hp", "maxHp", "drawNum", "maxHandCard", "skill", "mp", "maxMp"];
        if (!target.xjzh_hasMpNumber()) list.removeArray(["mp", "maxMp"]);

        let skills = target.getSkills(null, false, false).filter(skill => {
            let info = get.info(skill);
            if (!lib.translate[skill + '_info'] || !lib.translate[skill]) return false;
            if (lib.skill.global.includes(skill)) return false;
            if (!info || (info && (info.limited || info.juexingji || info.dutySkill || info.equipSkill || info.cardSkill || info.sub || info.unique || info.persevereSkill))) return false;
            if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;
            return true;
        });
        if (!skills.length) list.remove("skill");

        let index = list.randomGet();
        switch (index) {
            case "hp":
                target.loseHp();
                player.recover();
                game.log(player, "偷取了", target, "的1点体力");
                break;
            case "maxHp":
                target.loseMaxHp();
                player.gainMaxHp();
                game.log(player, "偷取了", target, "的1点体力上限");
                break;
            case "drawNum":
                player.storage.xjzh_stealAttributes["drawNum"]++;
                target.storage.xjzh_stealAttributes["drawNum"]--;
                game.log(player, "偷取了", target, "的1点摸牌数");
                break;
            case "maxHandCard":
                player.storage.xjzh_stealAttributes["maxHandCard"]++;
                target.storage.xjzh_stealAttributes["maxHandCard"]--;
                game.log(player, "偷取了", target, "的1点手牌上限");
                break;
            case "skill":
                let skill = skills.randomGet();
                player.addSkills(skill);
                target.removeSkills(skill);
                game.log(player, "偷取了", target, "的技能", "#y〖", get.translation(skill), "〗");
                break;
            case "mp":
                if (target.xjzh_getMp() > 0) {
                    let num = get.rand(1, target.xjzh_getMp());
                    target.xjzh_changeMp(-num);
                    player.xjzh_changeMp(num);
                    game.log(player, "偷取了", target, "的", num, "点魔力");
                }
                break;
            case "maxMp":
                if (target.xjzh_getMaxMp() > 0) {
                    let num = get.rand(1, target.xjzh_getMaxMp());
                    target.xjzh_changeMp(-num);
                    player.xjzh_changeMp(num);
                    game.log(player, "偷取了", target, "的", num, "点魔力上限");
                }
                break;
        }
    },
    xjzh_cssManager: {
        loadedStyles: new Map(),
        currentPageCSS: new Set(),
        load(cssFiles) {
            if (!Array.isArray(cssFiles)) return;

            cssFiles.forEach(cssName => {
                if (!this.loadedStyles.has(cssName)) {
                    const styleElement = lib.init.css(lib.assetURL + 'extension/仙家之魂/css', cssName);
                    this.loadedStyles.set(cssName, styleElement);
                }
                this.currentPageCSS.add(cssName);
            });
        },
        unload(cssFiles, forceUnload = false) {
            if (!Array.isArray(cssFiles)) return;

            cssFiles.forEach(cssName => {
                this.currentPageCSS.delete(cssName);
                if (forceUnload || !this.isCSSUsedElsewhere(cssName)) {
                    const styleElement = this.loadedStyles.get(cssName);
                    if (styleElement && styleElement.parentNode) {
                        styleElement.parentNode.removeChild(styleElement);
                    }
                    this.loadedStyles.delete(cssName);
                }
            });
        },
        isCSSUsedElsewhere(cssName) {
            return this.currentPageCSS.has(cssName);
        },
        unloadAll() {
            for (const [cssName, styleElement] of this.loadedStyles) {
                if (styleElement && styleElement.parentNode) {
                    styleElement.parentNode.removeChild(styleElement);
                }
            }
            this.loadedStyles.clear();
            this.currentPageCSS.clear();
        }
    },
    xjzh_resetTalentEffect(mode) {
        if (typeof mode != 'string') return;
        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
        config.talent ??= {};
        config.talent[mode] ??= {};
        config.talent[mode].effects = {};
        game.xjzh_saveQishuConfig(config);
    },
    xjzh_addTalentEffect(mode, effectType, value) {
        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();
        config.talent ??= {};
        config.talent[mode] ??= {};
        config.talent[mode].effects ??= {};
        const effects = config.talent[mode].effects;
        if (typeof effects[effectType] !== "number" || !Number.isFinite(effects[effectType])) effects[effectType] = 0;
        effects[effectType] = (effects[effectType] || 0) + value;
        if (effects[effectType] < 0 || Number.isNaN(effects[effectType])) effects[effectType] = 0;
        game.xjzh_saveQishuConfig(config);
    },
    xjzh_gainTalentNum(arg, num) {
        if (typeof arg !== "string") return 0;

        const config = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();

        config.talent ??= {};
        const talent = config.talent[arg] ??= {};
        talent.originalPoints ??= 0;

        const increment = typeof num === "number" ? num : 1;
        talent.originalPoints += increment;

        game.xjzh_saveQishuConfig(config);
        return talent.originalPoints;
    },
    xjzh_gainRune(name, num) {
        if (!name) return;
        const config = this.xjzh_getQishuConfig();
        config.fuwen ??= {};
        config.fuwen[name] = (config.fuwen[name] || 0) + (num || 0);
        config.fuwen[name] = Math.max(0, config.fuwen[name]);
        this.xjzh_saveQishuConfig(config);
        return name;
    },
    xjzh_loseRune(name, num) {
        if (!name) return;
        num = Math.abs(num) || 1;
        const config = this.xjzh_getQishuConfig();
        config.fuwen ??= {};
        config.fuwen[name] = (config.fuwen[name] || 0) - num;
        if (config.fuwen[name] <= 0) {
            delete config.fuwen[name];
        }
        this.xjzh_saveQishuConfig(config);
    },
    xjzh_equipRune(equipItem, rune) {
        if (!equipItem || !rune) return;
        if (this.xjzh_hasEquipRune(equipItem, rune, true) && equipItem !== "xjzh_qishu_bubaiwangzhe") {
            game.xjzh_openLoading('你已经装备了该类型的符文！');
            return false;
        }
        const config = this.xjzh_getQishuConfig();
        config.fuwenEquip ??= {};
        config.fuwenEquip[equipItem] = config.fuwenEquip[equipItem] || [];
        config.fuwenEquip[equipItem].push(rune);
        this.xjzh_gainRune(rune, -1);
        this.xjzh_saveQishuConfig(config);
        return true;
    },
    xjzh_unEquipRune(equipItem, rune) {
        if (!equipItem || !rune) return;
        const config = this.xjzh_getQishuConfig();
        const equipped = config.fuwenEquip?.[equipItem];
        if (this.xjzh_hasEquipRune(equipItem, rune, true) && equipped?.includes(rune)) {
            equipped.splice(equipped.indexOf(rune), 1);
            this.xjzh_gainRune(rune, 1);
            game.xjzh_openLoading(`你已卸下${get.xjzh_runeTranslate(rune, get.xjzh_runeType(rune))}！`);
        } else {
            game.xjzh_openLoading(`你未装备${get.xjzh_runeTypeTranslate(rune)}！`);
        }
        this.xjzh_saveQishuConfig(config);
    },
    xjzh_hasEquipRune(equipItem, rune, bool) {
        if (!equipItem || !rune) return;
        const equipped = this.xjzh_getQishuConfig().fuwenEquip?.[equipItem] || [];
        if (!bool) return equipped.includes(rune);
        const type = get.xjzh_runeType(rune);
        return equipped.some(item => get.xjzh_runeType(item) === type);
    },
    xjzh_hasEquipRunes(equipItem, type) {
        if (!equipItem || !type) return;
        const runesEquips = get.xjzh_runeQishuList(equipItem);
        return runesEquips?.some(item => get.xjzh_runeType(item) === type) || false;
    },
    xjzh_hasAllEquipRunes(equipItem, arg) {
        if (!arg) return;
        const runesList = get.xjzh_runeQishuList(equipItem) || [];
        if (!runesList.length) return false;

        const config = this.xjzh_getQishuConfig();
        const runesEquipsList = [...runesList, arg];
        const bannedRunes = lib.xjzh_bannedRunes;
        const fuwenEquip = config.fuwenEquip;

        const hasAllRunes = (equip) => runesEquipsList.every(rune => fuwenEquip[equip]?.includes(rune));

        const hasBannedCombination = () => bannedRunes.some(combination =>
            combination.every(rune => runesEquipsList.includes(rune))
        );

        for (const equipKey of Object.keys(fuwenEquip || {})) {
            const equipInfo = get.xjzh_equipInfo(equipKey);
            if (
                get.xjzh_equipInfo(equipItem).filter ||
                !get.xjzh_runeQishuList(equipKey)?.length ||
                equipKey === equipItem ||
                equipKey === "xjzh_qishu_bubaiwangzhe"
            ) continue;

            if (!equipInfo.filter && hasAllRunes(equipKey)) return true;
        }

        return hasBannedCombination() ? "banned" : false;
    },
    xjzh_getQishuConfig: () => game.getExtensionConfig("仙家之魂", "qishuyaojians"),
    xjzh_saveQishuConfig(saveData) {
        const qishuSaveData = saveData ?? this.xjzh_getQishuConfig();

        if (!get.is.object(qishuSaveData)) return;
        game.saveExtensionConfig("仙家之魂", "qishuyaojians", qishuSaveData);

        const list = JSON.stringify(qishuSaveData);
        const data = "奇术要件存档：" + list;

        // 处理错误参数
        game.writeFile(lib.init.encode(data), 'extension/仙家之魂/save', '自动备份.json', (err) => {
            if (err) {
                console.error('保存存档到本地失败:', err);
            }
        });
    },
    xjzh_resetQishu() {
        const baseConfig = {
            name: "无名玩家",
            level: 1,
            exp: 0,
            date: 0,
            bag: [],
            keys: [],
            player: {},
            fuwen: {},
            fuwenEquip: {},
            equip: {},
            tokens: 10,
            suipian: 300,
            svip: [],
            achi: {
                got: [],
                progress: {},
                date: {},
                character: []
            },
            talent: {},
            cailiao: this.xjzh_getBaseCailiao(),
            dollarChests: {
                "xjzh_dollarChest_common": 0,
                "xjzh_dollarChest_fine": 0,
                "xjzh_dollarChest_perfect": 0,
                "xjzh_dollarChest_epic": 0,
                "xjzh_dollarChest_myth": 0
            }
        };

        const nickname = typeof lib.config.connect_nickname === "string" ? lib.config.connect_nickname : "无名玩家";
        baseConfig.name = nickname;

        game.xjzh_openLoading(`已为你自动创建玩家名称为${nickname}的奇术要件存档，稍后你可以在奇术要件窗口修改`);

        this.xjzh_saveQishuConfig(baseConfig);
        return baseConfig;
    },
    async showLevelUpMessage(name, str, level) {
        document.querySelectorAll('.xjzh_levelUp_temp').forEach(el => el.remove());

        // 创建遮罩层
        const mask = document.createElement('div');
        mask.className = 'xjzh_levelUp_temp';
        mask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9997;
        pointer-events: none;
        opacity: 0;
    `;
        document.body.appendChild(mask);
        setTimeout(() => mask.style.opacity = 1, 50);

        // 创建闪屏效果
        const flash = document.createElement('div');
        flash.className = 'xjzh_levelUp_temp';
        flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 9998;
        pointer-events: none;
        opacity: 0;
    `;
        document.body.appendChild(flash);

        // 创建粒子容器
        const particleWrapper = document.createElement('div');
        particleWrapper.className = 'xjzh_levelUp_temp';
        particleWrapper.style.cssText = `
        position: fixed;
        left: 50%;
        top: 100px;
        z-index: 9998;
        pointer-events: none;
    `;
        document.body.appendChild(particleWrapper);

        // 创建文字面板
        const box = document.createElement('div');
        box.className = 'xjzh_levelUp_temp';
        box.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        pointer-events: none;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
        document.body.appendChild(box);

        // 创建卡片
        const card = document.createElement('div');
        card.className = 'xjzh_levelUp_temp';
        card.style.cssText = `
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #ff9500;
        border-radius: 16px;
        padding: 16px 30px;
        box-shadow: 0 0 25px #ff9500;
        opacity: 0;
        transform: scale(0.5);
        height: auto;
        min-height: 80px;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    `;
        box.appendChild(card);

        // 创建文字
        const text = document.createElement('div');
        text.innerText = `恭喜 ${name} ${str} ${typeof level == "number" ? 'Lv.' + level : level}`;
        text.style.cssText = `
        font-size: 28px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: linear-gradient(90deg, #ff0088, #ff9500, #ffea00);
        background-size: 400% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 8px #ff9500;
        opacity: 0;
        padding: 10px 20px;
        line-height: 1.4;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    `;
        card.appendChild(text);

        // 动态调整卡片宽度
        setTimeout(() => {
            const textWidth = text.scrollWidth + 40;
            card.style.width = `${Math.max(textWidth, 300)}px`;
        }, 0);

        // 动画执行顺序
        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.175,0.885,0.32,1)';
            card.style.opacity = 1;
            card.style.transform = 'scale(1)';
        }, 200);

        setTimeout(() => {
            text.style.transition = 'all 0.6s ease';
            text.style.opacity = 1;
        }, 300);

        setTimeout(() => flash.style.opacity = 0.8, 100);
        setTimeout(() => flash.style.opacity = 0, 180);

        // 流光动画
        let pos = 0;
        const shineInterval = setInterval(() => {
            pos += 3;
            text.style.backgroundPosition = `${pos}% 0%`;
        }, 30);

        // 水波纹动画
        const createRing = (delay) => {
            const r = document.createElement('div');
            r.className = 'xjzh_levelUp_temp';
            r.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 2px solid #ffd700;
            opacity: 0;
            pointer-events: none;
            z-index: 9998;
        `;
            box.appendChild(r);

            setTimeout(() => {
                r.style.transition = 'all 1.0s ease-out';
                r.style.opacity = 0.8;
                r.style.width = '320px';
                r.style.height = '320px';
                setTimeout(() => r.style.opacity = 0, 300);
            }, delay);
        };

        createRing(400);
        createRing(550);

        // 粒子动画
        setTimeout(() => {
            const colors = ['#ff9500', '#ffea00', '#ffffff', '#ff0066', '#00ff88'];
            for (let i = 0; i < 500; i++) {
                const p = document.createElement('div');
                p.className = 'xjzh_levelUp_temp';
                p.style.cssText = `
                position: absolute;
                left: 0;
                top: 0;
                width: 9px;
                height: 9px;
                border-radius: 50%;
                background: ${colors[i % colors.length]};
                box-shadow: 0 0 12px ${colors[i % colors.length]};
                opacity: 1;
            `;
                particleWrapper.appendChild(p);

                const angle = Math.random() * Math.PI * 2;
                const dist = 70 + Math.random() * 280;
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;

                setTimeout(() => {
                    p.style.transition = 'all 1.2s cubic-bezier(0.1,0.8,0.2,1)';
                    p.style.transform = `translate(${x}px, ${y}px)`;
                    p.style.opacity = 0;
                }, 10);
            }
        }, 350);

        // 清理所有临时元素
        setTimeout(() => {
            clearInterval(shineInterval);
            document.querySelectorAll('.xjzh_levelUp_temp').forEach(e => e.remove());
        }, 2000);
    },
    xjzh_levelUp(arg) {
        const config = this.xjzh_getQishuConfig();
        config.level ??= 1;
        config.exp ??= 0;

        const originalLevel = config.level;
        if (typeof arg == "number") {
            if (arg < 0 || config.level === 100) return [config.level, config.exp];
            config.exp += arg;
            while (config.level < 100) {
                let requiredExp;
                if (config.level < 20) {
                    requiredExp = 30 + 15 * config.level;
                }
                else if (config.level < 50) {
                    requiredExp = 86 + 50 * config.level;
                }
                else {
                    requiredExp = 3500 + 800 * (config.level - 50);
                }
                if (config.exp < requiredExp) break;

                config.level++;
                config.exp -= requiredExp;

                if (config.level === 100) config.exp = 0;
            }

            if (config.level > originalLevel) this.showLevelUpMessage(config.name, "升级到", config.level);

            this.xjzh_saveQishuConfig(config);
            return [config.level, config.exp];
        }
        else if (get.is.object(arg)) {
            if (typeof arg.level === "number" && arg.level >= 1 && arg.level <= 100) {
                config.level = Math.max(1, Math.min(100, Math.floor(arg.level)));

                if (typeof arg.exp === "number") {
                    config.exp = Math.max(0, arg.exp);
                    if (config.level === 100) config.exp = 0;
                } else {
                    config.exp = (config.level === 100) ? 0 : (config.exp || 0);
                }

                this.xjzh_saveQishuConfig(config);
                return [config.level, config.exp];
            }
        } else {
            game.xjzh_openLoading("你输入的参数有误！");
            return [config.level, config.exp];
        }
    },
    xjzh_saveKeys(keys) {
        if (typeof keys !== "string") return;
        const config = this.xjzh_getQishuConfig();
        config.keys ??= [];
        if (config.keys.includes(keys)) return config.keys;
        config.keys.push(keys);
        this.xjzh_saveQishuConfig(config);
        return config.keys;
    },
    xjzh_hasKeys(keys) {
        if (typeof keys !== "string") return;
        const config = this.xjzh_getQishuConfig();
        config.keys ??= [];
        return config.keys.includes(keys);
    },
    xjzh_getBaseCailiao() {
        return {
            "xjzh_cailiao_liezhiKey": ["劣质巢穴钥匙", 0, "最低品质的巢穴钥匙，可进入基础副本。"],
            "xjzh_cailiao_jingliangKey": ["精良巢穴钥匙", 0, "品质优良的巢穴钥匙，可进入中级副本。"],
            "xjzh_cailiao_wanmeiKey": ["完美巢穴钥匙", 0, "完美无瑕的巢穴钥匙，可进入高级副本。"],
            "xjzh_cailiao_shishiKey": ["史诗巢穴钥匙", 0, "史诗品质的巢穴钥匙，暂未开放。"],
            "xjzh_cailiao_shenhuaKey": ["神话巢穴钥匙", 0, "神话品质的巢穴钥匙，暂未开放。"]
        };
    },
    xjzh_getCailiaoConfig() {
        const baseURL = lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/";
        return {
            "xjzh_cailiao_liezhiKey": {
                name: "劣质巢穴钥匙",
                icon: baseURL + "xjzh_cailiao_liezhiKey.jpg",
                quality: "劣质",
                qualityLevel: 1,
                borderColor: "#666",
                bgGradient: "linear-gradient(135deg, #555, #333)",
                textColor: "#ccc",
                desc: "最低品质的巢穴钥匙，可进入基础副本。"
            },
            "xjzh_cailiao_jingliangKey": {
                name: "精良巢穴钥匙",
                icon: baseURL + "xjzh_cailiao_jingliangKey.jpg",
                quality: "精良",
                qualityLevel: 2,
                borderColor: "#4CAF50",
                bgGradient: "linear-gradient(135deg, #2E7D32, #1B5E20)",
                textColor: "#81C784",
                desc: "品质优良的巢穴钥匙，可进入中级副本。"
            },
            "xjzh_cailiao_wanmeiKey": {
                name: "完美巢穴钥匙",
                icon: baseURL + "xjzh_cailiao_wanmeiKey.jpg",
                quality: "完美",
                qualityLevel: 3,
                borderColor: "#2196F3",
                bgGradient: "linear-gradient(135deg, #1565C0, #0D47A1)",
                textColor: "#64B5F6",
                desc: "完美无瑕的巢穴钥匙，可进入高级副本。"
            },
            "xjzh_cailiao_shishiKey": {
                name: "史诗巢穴钥匙",
                icon: baseURL + "xjzh_cailiao_shishiKey.jpg",
                quality: "史诗",
                qualityLevel: 4,
                borderColor: "#9C27B0",
                bgGradient: "linear-gradient(135deg, #6A1B9A, #4A148C)",
                textColor: "#BA68C8",
                desc: "史诗品质的巢穴钥匙，暂未开放。"
            },
            "xjzh_cailiao_shenhuaKey": {
                name: "神话巢穴钥匙",
                icon: baseURL + "xjzh_cailiao_shenhuaKey.jpg",
                quality: "神话",
                qualityLevel: 5,
                borderColor: "#FFD700",
                bgGradient: "linear-gradient(135deg, #F57F17, #FF6F00)",
                textColor: "#FFD54F",
                desc: "神话品质的巢穴钥匙，暂未开放。"
            }
        };
    },
    xjzh_changeCailiao(arg, num = 1) {
        const config = this.xjzh_getQishuConfig();
        config.cailiao ??= this.xjzh_getBaseCailiao();

        if (typeof arg !== "string") {
            const list2 = Object.keys(config.cailiao);
            arg = list2.randomGet();
        }

        if (!config.cailiao[arg]) {
            config.cailiao[arg] = this.xjzh_getBaseCailiao()[arg];
        }

        config.cailiao[arg][1] += num;
        if (config.cailiao[arg][1] < 0) config.cailiao[arg][1] = 0;
        this.xjzh_saveQishuConfig(config);
        return config.cailiao[arg][1];
    },
    xjzh_resetCailiao() {
        const config = this.xjzh_getQishuConfig();
        config.cailiao = this.xjzh_getBaseCailiao();
        this.xjzh_saveQishuConfig(config);
        return config.cailiao;
    },
    xjzh_migrateCailiao() {
        const config = this.xjzh_getQishuConfig();
        if (!config) return;

        // 检查是否已转换过
        if (config.cailiaoMigrated) return;

        // 旧材料列表（不含冥狱石，冥狱石直接移除）
        const oldCailiaoList = [
            "xjzh_cailiao_enianzhixin",
            "xjzh_cailiao_gangtie",
            "xjzh_cailiao_nianyedan",
            "xjzh_cailiao_kutong",
            "xjzh_cailiao_kongju",
            "xjzh_cailiao_xianxue",
            "xjzh_cailiao_wawa",
            "xjzh_cailiao_jiasuo",
            "xjzh_cailiao_shijieshi"
        ];

        // 计算旧材料总数
        let totalOldCount = 0;
        const oldCailiaoData = config.cailiao || {};

        for (const key of oldCailiaoList) {
            if (oldCailiaoData[key]) {
                totalOldCount += oldCailiaoData[key][1] || 0;
            }
        }

        // 转换比例：每10个旧材料 = 1个完美钥匙，每5个 = 1个精良钥匙，其余 = 劣质钥匙
        let liezhiKeyCount = 0;
        let jingliangKeyCount = 0;
        let wanmeiKeyCount = 0;

        if (totalOldCount > 0) {
            wanmeiKeyCount = Math.floor(totalOldCount / 10);
            jingliangKeyCount = Math.floor((totalOldCount % 10) / 5);
            liezhiKeyCount = totalOldCount - wanmeiKeyCount * 10 - jingliangKeyCount * 5;

            // 至少给1个劣质钥匙
            if (liezhiKeyCount === 0 && jingliangKeyCount === 0 && wanmeiKeyCount === 0) {
                liezhiKeyCount = 1;
            }
        }

        // 重置为新材料
        config.cailiao = this.xjzh_getBaseCailiao();

        // 添加转换后的钥匙
        if (liezhiKeyCount > 0) {
            config.cailiao["xjzh_cailiao_liezhiKey"][1] = liezhiKeyCount;
        }
        if (jingliangKeyCount > 0) {
            config.cailiao["xjzh_cailiao_jingliangKey"][1] = jingliangKeyCount;
        }
        if (wanmeiKeyCount > 0) {
            config.cailiao["xjzh_cailiao_wanmeiKey"][1] = wanmeiKeyCount;
        }

        // 标记已转换
        config.cailiaoMigrated = true;

        this.xjzh_saveQishuConfig(config);
    },
    xjzh_getDollarChestConfig() {
        const baseURL = lib.assetURL + "extension/仙家之魂/image/baoxiang/";
        return {
            "xjzh_dollarChest_common": {
                name: "普通美元宝箱",
                icon: baseURL + "xjzh_dollarChest_common.png",
                quality: "普通",
                borderColor: "#9E9E9E",
                bgGradient: "linear-gradient(135deg, #757575, #424242)",
                textColor: "#BDBDBD",
                desc: "普通品质的美元宝箱",
                minReward: 10,
                maxReward: 30,
                dropWeight: 40
            },
            "xjzh_dollarChest_fine": {
                name: "精良美元宝箱",
                icon: baseURL + "xjzh_dollarChest_fine.png",
                quality: "精良",
                borderColor: "#4CAF50",
                bgGradient: "linear-gradient(135deg, #2E7D32, #1B5E20)",
                textColor: "#81C784",
                desc: "精良品质的美元宝箱",
                minReward: 30,
                maxReward: 80,
                dropWeight: 25
            },
            "xjzh_dollarChest_perfect": {
                name: "完美美元宝箱",
                icon: baseURL + "xjzh_dollarChest_perfect.png",
                quality: "完美",
                borderColor: "#2196F3",
                bgGradient: "linear-gradient(135deg, #1565C0, #0D47A1)",
                textColor: "#64B5F6",
                desc: "完美品质的美元宝箱",
                minReward: 80,
                maxReward: 200,
                dropWeight: 15
            },
            "xjzh_dollarChest_epic": {
                name: "史诗美元宝箱",
                icon: baseURL + "xjzh_dollarChest_epic.png",
                quality: "史诗",
                borderColor: "#9C27B0",
                bgGradient: "linear-gradient(135deg, #6A1B9A, #4A148C)",
                textColor: "#BA68C8",
                desc: "史诗品质的美元宝箱",
                minReward: 200,
                maxReward: 500,
                dropWeight: 5
            },
            "xjzh_dollarChest_myth": {
                name: "神话美元宝箱",
                icon: baseURL + "xjzh_dollarChest_myth.png",
                quality: "神话",
                borderColor: "#FF9800",
                bgGradient: "linear-gradient(135deg, #E65100, #BF360C)",
                textColor: "#FFB74D",
                desc: "神话品质的美元宝箱",
                minReward: 500,
                maxReward: 1500,
                dropWeight: 2
            }
        };
    },
    xjzh_getDollarChestList() {
        const config = this.xjzh_getQishuConfig();
        if (!config.dollarChests) {
            config.dollarChests = {
                "xjzh_dollarChest_common": 0,
                "xjzh_dollarChest_fine": 0,
                "xjzh_dollarChest_perfect": 0,
                "xjzh_dollarChest_epic": 0,
                "xjzh_dollarChest_myth": 0
            };
            this.xjzh_saveQishuConfig(config);
        }
        return config.dollarChests;
    },

    xjzh_changeDollarChest(chestKey, count) {
        const config = this.xjzh_getQishuConfig();
        if (!config.dollarChests) {
            config.dollarChests = {};
        }
        config.dollarChests[chestKey] = Math.max(0, (config.dollarChests[chestKey] || 0) + count);
        this.xjzh_saveQishuConfig(config);
        return config.dollarChests[chestKey];
    },

    xjzh_resetDollarChests() {
        const config = this.xjzh_getQishuConfig();
        config.dollarChests = {
            "xjzh_dollarChest_common": 0,
            "xjzh_dollarChest_fine": 0,
            "xjzh_dollarChest_perfect": 0,
            "xjzh_dollarChest_epic": 0,
            "xjzh_dollarChest_myth": 0
        };
        this.xjzh_saveQishuConfig(config);
        return config.dollarChests;
    },

    xjzh_calculateDollarChestDrop(isWin, killNum, svipLevel = 0) {
        const chestConfig = this.xjzh_getDollarChestConfig();

        // 计算掉落几率
        let dropRate = isWin ? 0.6 : 0.3;
        dropRate += svipLevel * 0.05;
        dropRate = Math.min(dropRate, 0.9);

        // 计算获得数量：1 + min(3, Math.floor(killNum/3))
        const extraCount = Math.min(3, Math.floor(killNum / 3));
        const totalCount = 1 + extraCount;

        // 随机品质
        const results = [];
        const totalWeight = Object.values(chestConfig).reduce((s, c) => s + c.dropWeight, 0) + 13;

        if (Math.random() < dropRate) {
            for (let i = 0; i < totalCount; i++) {
                const rand = Math.random() * totalWeight;
                let cumWeight = 0;
                let selectedKey = null;

                for (const [key, cfg] of Object.entries(chestConfig)) {
                    cumWeight += cfg.dropWeight;
                    if (rand < cumWeight) {
                        selectedKey = key;
                        break;
                    }
                }

                if (selectedKey) {
                    results.push(selectedKey);
                }
            }
        }

        return results;
    },

    xjzh_openDollarChest(chestKey) {
         if (!game.hasExtension(`美元杀`)) return;
        const config = this.xjzh_getDollarChestConfig();
        const chestCfg = config[chestKey];
        if (!chestCfg) return null;

        // 检查库存
        const chestList = this.xjzh_getDollarChestList();
        if ((chestList[chestKey] || 0) <= 0) return null;

        // 减少库存
        this.xjzh_changeDollarChest(chestKey, -1);

        // 计算美元奖励（随机范围）
        const reward = Math.floor(Math.random() * (chestCfg.maxReward - chestCfg.minReward + 1)) + chestCfg.minReward;

        // 检查美元杀是否安装
        const dollarToolkit = game.haituGalleryDraw || lib.haituGalleryDraw;
        if (dollarToolkit && typeof dollarToolkit.changeMoney === "function") {
            dollarToolkit.changeMoney(reward, `开启${chestCfg.name}`);
        }

        return {
            success: true,
            reward: reward,
            chestName: chestCfg.name,
            config: chestCfg
        };
    },

    // ==================== 美元宝箱系统结束 ====================

    xjzh_canEquip(name, playerName) {
        if (!name || !playerName) return false;
        const info = get.xjzh_equipInfo(name);
        if (!info) return false;

        if (info.conflict?.some(item => this.xjzh_hasEquiped(item, playerName))) {
            return `此奇术要件与${info.conflict.map(item => get.xjzh_qishuTranslate(item)).join('、')}冲突，不能装备。`;
        }

        if (info.precede?.some(item => !this.xjzh_hasEquiped(item, playerName))) {
            return `此奇术要件需要先装备${info.precede.map(item => get.xjzh_qishuTranslate(item)).join('、')}才能装备。`;
        }

        const filter = info.filter;
        if (typeof filter === 'string') return playerName === filter;
        if (Array.isArray(filter)) return filter.includes(playerName);
        if (typeof filter === 'function') return filter(playerName);
        return true;
    },
    xjzh_changeSuipian(num = 1) {
        const config = this.xjzh_getQishuConfig();
        config.suipian ??= 0;
        config.suipian += num;
        if (config.suipian < 0) config.suipian = 0;
        this.xjzh_saveQishuConfig(config);
        return config.suipian;
    },
    xjzh_changeTokens(num = 1) {
        const config = this.xjzh_getQishuConfig();
        config.tokens ??= 0;
        config.tokens += num;
        if (config.tokens < 0) config.tokens = 0;
        this.xjzh_saveQishuConfig(config);
        return config.tokens;
    },
    xjzh_gainEquip(name, num = 1) {
        const config = this.xjzh_getQishuConfig();
        config.bag ??= [];
        config.bag.push(...Array(num).fill(name));
        this.xjzh_saveQishuConfig(config);
        return name;
    },
    xjzh_loseEquip(name) {
        const config = this.xjzh_getQishuConfig();
        config.bag ??= [];
        config.bag.remove(name);
        this.xjzh_saveQishuConfig(config);
    },
    xjzh_loseCraftedEquip(uid) {
        const config = this.xjzh_getQishuConfig();
        config.craftedBag ??= [];
        const index = config.craftedBag.findIndex(function(c) { return c.uid === uid; });
        if (index >= 0) {
            const item = config.craftedBag[index];
            if (config.equip && config.equip[item.id]) {
                config.equip[item.id] = [];
                delete config.equip[item.id];
            }
            config.craftedBag.splice(index, 1);
            this.xjzh_saveQishuConfig(config);
            return true;
        }
        return false;
    },
    xjzh_hasEquiped(name, playerName) {
        if (!name || !playerName) return false;
        if (!lib.xjzh_qishuyaojians[name]) return;
        const config = this.xjzh_getQishuConfig();
        return config?.player?.[playerName]?.includes(name);
    },
    xjzh_useEquip(name, playerName, nopop = false, hutong = false) {
        if (typeof name !== "string" || typeof playerName !== "string") return;
        const canEquip = this.xjzh_canEquip(name, playerName);
        if (!canEquip || typeof canEquip === "string") {
            const text = typeof canEquip === "string" ? canEquip : '该角色不满足装备条件';
            if (!nopop) {
                game.xjzh_openLoading(text);
            }
            return;
        }

        if (!lib.xjzh_qishuyaojians[name]) return;

        const config = this.xjzh_getQishuConfig();
        config.player ??= {};
        if (!Array.isArray(config.player[playerName])) config.player[playerName] = [];
        const equipped = config.player[playerName];
        let removedEquip;

        if (equipped.length >= 3) {
            removedEquip = equipped.shift();
            config.equip[removedEquip].remove(playerName);
            if (!hutong) {
                this.xjzh_gainEquip(removedEquip);
            }
        }

        if (equipped.includes(name)) {
            if (!nopop) {
                game.xjzh_openLoading(`${get.translation(playerName)}已经装备了${get.xjzh_qishuTranslate(name)}`);
            }
            return;
        }

        equipped.push(name);
        config.equip ??= {};
        config.equip[name] ??= [];
        config.equip[name].add(playerName);

        let message = `已为${get.translation(playerName)}装备了${get.xjzh_qishuTranslate(name)}`;
        if (removedEquip) {
            message += `<br>（自动卸下了${get.xjzh_qishuTranslate(removedEquip)}）`;
        }

        if (!nopop) {
            game.xjzh_openLoading(message);
        }

        if (!hutong) {
            this.xjzh_loseEquip(name);
            for (const group of lib.xjzh_equipHutong) {
                if (group.includes(playerName)) {
                    for (const member of group) {
                        if (member !== playerName) {
                            this.xjzh_useEquip(name, member, true, true);
                        }
                    }
                }
            }
        }

        this.xjzh_saveQishuConfig(config);
    },
    xjzh_unEquip(name, playerName, nopop = false, hutong = false) {
        if (!name) return;

        const config = this.xjzh_getQishuConfig();
        const info = get.xjzh_equipInfo(name);

        if (!info) {
            if (playerName) config.player[playerName] = [];
            return;
        }

        if (info.unequip?.some(item => this.xjzh_hasEquiped(item, playerName))) {
            game.xjzh_openLoading(`此奇术要件需要先卸下${info.unequip.map(item => get.xjzh_qishuTranslate(item)).join('、')}才能取消装备。`);
            return;
        }

        if (!config.player?.[playerName]?.includes(name)) return;

        config.player[playerName] = config.player[playerName].filter(item => item !== name);

        config.equip?.[name]?.remove(playerName);

        if (!hutong) {
            this.xjzh_gainEquip(name);
            for (const group of lib.xjzh_equipHutong) {
                if (group.includes(playerName)) {
                    for (const member of group) {
                        if (member !== playerName) {
                            this.xjzh_unEquip(name, member, true, true);
                        }
                    }
                }
            }
        }

        if (!nopop) {
            game.xjzh_openLoading(`已为${get.translation(playerName)}卸下了${info.translate}`);
        }

        this.xjzh_saveQishuConfig(config);
    },
    xjzh_qishuWinner(str, str2) {
        const boxRemove = ui.create.div(ui.window, {
            zIndex: 10000,
            width: '100%',
            height: '100%'
        });
        const obj = ui.create.div('.xjzh-dialog', boxRemove);
        obj.style.transformOrigin = "center";
        const num = get.rand(0, 15);
        const url = "extension/仙家之魂/css/images/ui/";
        const url2 = "xjzh_info";
        obj.style.backgroundImage = `url(${rootURL}${url}${url2}${num}.png)`;
        const beijing = ui.create.div('.xjzh-dialog-name', obj);
        const text = ui.create.div('.xjzh-dialog-text', obj);
        boxRemove.listen(() => {
            boxRemove.delete();
        });
        beijing.innerHTML = str;
        text.innerHTML = str2;
    },
    xjzh_originalFunction(ret) {
        if (ret) {
            const player = game.me;

            const isXHWu = get.isXHwujiang(player);
            const akira = lib.characterPack['Akira'];
            const akiraBool = get.is.object(akira) && get.nameList(player).some(item => akira[item]);
            if (!isXHWu && !akiraBool) return;
            if (!['identity', 'doudizhu'].includes(get.mode())) return;

            const playerCount = game.countPlayer2();
            if (playerCount < 3 || playerCount > 12) return;

            const scoreList = {
                drawNum: player.getAllHistory('gain', evt => evt.getParent().name === "draw").map(item => item.cards).flat().length,
                useNum: player.getAllHistory('useCard').length,
                damageNum: player.getAllHistory('damage')?.map(item => item.num).reduce((acc, num) => acc + num, 0) ?? 0,
                sourceNum: player.getAllHistory('sourceDamage')?.map(item => item.num).reduce((acc, num) => acc + num, 0) ?? 0,
                killNum: player.getStat("kill") || 0
            };

            const config = this.xjzh_getQishuConfig();
            const levelPower = 1 + (config.level / 20);

            const boolSvip = get.xjzh_checkSvipDate();
            let boolSvipNumber = 0;
            if (boolSvip) {
                const svipRemainingTime = get.xjzh_daysBetweenDates(this.xjzh_toDateString(new Date()), boolSvip[1]);
                boolSvipNumber = svipRemainingTime / 10;
            }

            const { drawNum, useNum, damageNum, sourceNum, killNum } = scoreList;
            // 出牌数useNum计入活跃度得分（权重0.25）
            let finalScore = Math.floor(drawNum + useNum * 0.25 + (sourceNum * 2 - damageNum));
            let expNumber = Math.round(finalScore * (1 + boolSvipNumber + levelPower));

            let str = `当前模式： ${get.translation(get.mode())}
            <br><br>当前玩家：${config.name}（${get.translation(get.nameList(game.me)[0])}）
            <br><br>击杀数：${killNum} | 总计得分：${finalScore}<br><br>对局奖励：`;

            const qishuReward = {
                "suipian": 0,
                "qishuyaojian": {},
                "cailiao": {
                    "xjzh_cailiao_liezhiKey": 0
                },
            };

            const suipian = finalScore;
            qishuReward["suipian"] += suipian;

            // 劣质巢穴钥匙掉落
            let liezhiKeyChance = suipian < 50 ? 0.10 : Math.min(finalScore / 500, 0.60);
            // VIP加成
            liezhiKeyChance *= (1 + boolSvipNumber * 0.5);

            if (Math.random() <= liezhiKeyChance) {
                let num = get.rand(1, 2);
                qishuReward["cailiao"]["xjzh_cailiao_liezhiKey"] = num;
            }

            const qishuList = [];
            for (const i in lib.xjzh_qishuyaojians) {
                const level = get.xjzh_equipInfo(i).level || 1;
                if (level && level < 4) qishuList.push(i);
            }
            qishuList.push("xjzh_qishu_lieshou");

            if (qishuList.length > 0) {
                const randomNum = suipian < 50 ? 0.15 : finalScore / 331;
                let index = qishuList.randomGet();
                if (Math.random() <= randomNum) {
                    if (Math.random() <= 0.0067 * (1 + randomNum)) index = "xjzh_qishu_lieshou";
                    qishuReward["qishuyaojian"][index] = (qishuReward["qishuyaojian"][index] || 0) + 1;
                }
            }

            const rewardHandlers = {
                suipian: { label: () => "碎片", apply: (name, count) => this.xjzh_changeSuipian(count) },
                qishuyaojian: { nested: true, label: name => get.xjzh_qishuTranslate(name), apply: (name, count) => this.xjzh_gainEquip(name, count) },
                cailiao: { nested: true, label: name => get.xjzh_cailiaoTranslate(name), apply: (name, count) => this.xjzh_changeCailiao(name, count) },
            };

            for (const [key, value] of Object.entries(qishuReward)) {
                const handler = rewardHandlers[key];
                if (!handler) continue;
                const entries = handler.nested ? Object.entries(value) : [[key, value]];
                for (const [name, count] of entries) {
                    if (count > 0) {
                        handler.apply(name, count);
                        str += `<br>&emsp;&emsp;${handler.label(name)}（${count}个）`;
                    }
                }
            }

            const doneAchievemen = lib.xjzh_hasDoneAchievement;
            if (doneAchievemen?.length > 0) {
                str += "<br>成就奖励：";
                for (const i of doneAchievemen) {
                    const [namePart1, namePart2] = i.split(",");
                    const info = game.xjzhAchi.info(namePart2, namePart1);
                    str += `<br>&emsp;&emsp;${namePart2}：<br>&emsp;&emsp;&emsp;&emsp;碎片：${info.level * 50}<br>&emsp;&emsp;&emsp;&emsp;精魄：${info.level}`;
                }
            }

            const runeLists = get.xjzh_runeList();
            const runeProbability = Math.max(0.35, Math.min(finalScore / (runeLists.length + finalScore), 0.8));
            if (Math.random() < runeProbability) {
                const runes = runeLists.randomGet();
                str += `<br>符文奖励：<br>&emsp;&emsp;${get.xjzh_runeTranslate(runes, get.xjzh_runeType(runes))}（1个）`;
                this.xjzh_gainRune(runes, 1);
            }

            if (game.hasExtension(`美元杀`)) {
                // 获取美元杀的 toolkit
                const dollarToolkit = game.haituGalleryDraw || lib.haituGalleryDraw;
                if (dollarToolkit && typeof dollarToolkit.changeMoney === "function") {
                    // 计算美元奖励（每个击杀20美元）
                    const dollarReward = killNum * 20;
                    // 发放美元奖励
                    if (dollarReward > 0) {
                        dollarToolkit.changeMoney(dollarReward, "对局奖励（击败" + killNum + "名敌人）");
                        str += `<br>&emsp;&emsp;<span style="color:#4CAF50;">美元 ×${dollarReward}</span>`;
                    }

                    // 计算宝箱掉落
                    const isWin = ret === game.me;
                    const chestDrops = this.xjzh_calculateDollarChestDrop(isWin, killNum, Math.floor(boolSvipNumber));
                    if (chestDrops.length > 0) {
                        // 给玩家添加宝箱
                        const chestCounts = {};
                        for (const chestKey of chestDrops) {
                            this.xjzh_changeDollarChest(chestKey, 1);
                            chestCounts[chestKey] = (chestCounts[chestKey] || 0) + 1;
                        }
                        // 显示宝箱奖励信息
                        str += "<br>&emsp;&emsp;美元宝箱奖励：";
                        for (const [chestKey, count] of Object.entries(chestCounts)) {
                            const chestCfg = this.xjzh_getDollarChestConfig()[chestKey];
                            if (chestCfg) {
                                str += `<br>&emsp;&emsp;&emsp;&emsp;<span style="color:${chestCfg.borderColor};">${chestCfg.name} ×${count}</span>`;
                            }
                        }
                    }
                }
            }

            // 大亨模式奖励
            const isWin = ret === game.me;
            if (isWin) {
                try {
                    const tycoonConfig = this.xjzh_getQishuConfig();
                    if (tycoonConfig && tycoonConfig.tycoon) {
                        // 初始化craftedBag
                        if (!tycoonConfig.craftedBag) tycoonConfig.craftedBag = [];
                        if (!tycoonConfig.bag) tycoonConfig.bag = [];

                        const tycoonData = tycoonConfig.tycoon;

                        // 金币奖励
                        const goldReward = Math.floor(finalScore * (1 + levelPower));
                        tycoonData.gold += goldReward;

                        this.xjzh_saveQishuConfig(tycoonConfig);
                        str += `<br>&emsp;&emsp;<span style="color:#FFD700;">绿洲金币 ×${goldReward}</span>`;
                    }
                } catch (e) {
                    // 静默处理大亨奖励错误
                }
            }

            this.xjzh_levelUp(expNumber);
            this.xjzh_qishuWinner("奖励结算", str);
        }
    },
    xjzh_withPreCheck(originalFunction) {
        return (ret) => {
            const player = game.me;

            const isXHWu = get.isXHwujiang(player);
            const akira = lib.characterPack['Akira'];
            const akiraBool = get.is.object(akira) && get.nameList(player).some(item => akira[item]);
            if (!isXHWu && !akiraBool) return;
            if (!['identity', 'doudizhu'].includes(get.mode())) return;
            originalFunction.call(this, ret);
        };
    },
    xjzh_addRandomSkill(num, boolean = false, bool = true, player) {
        let bannedCharacter = [
            "xjzh_sanguo_guanlu",
            "xjzh_sanguo_guojia",
            "xjzh_sanguo_yuanshao",
            "xjzh_sanguo_zhangrang",
            "xjzh_sanguo_zuoci",
            "xjzh_sanguo_zuoyou",
            "xjzh_sanguo_yuji",
            "xjzh_meiren_linjiasheng",
            "xjzh_meiren_huangyuke",
            "xjzh_meiren_xiangwanru",
            "xjzh_qixia_daxiongxiaomao",
            "xjzh_qixia_maybe",
            "xjzh_qixia_mumuxiao",
            "xjzh_huoying_zhishui",
            "xjzh_huoying_mingren",
            "xjzh_huoying_zuozhu",
            "xjzh_boss_lvbu",
            "xjzh_zxzh_linmo",
            "xjzh_poe_guizu",
            "xjzh_poe_youxia",
            "xjzh_poe_yuhuoshi",
            "xjzh_wzry_yuange",
            "xjzh_diablo_lamasi",
        ];
        let skills;
        let skillList = this.xjzh_wujiangpai()
            .filter(name => {
                let obj = get.character(name);
                if (bannedCharacter.includes(name)) return false;
                if (obj?.xjzhMp || obj?.isUnseen || obj?.isAiForbidden || obj.isZhaohuan) return false;
                return obj.skills?.length;
            })
            .map(target => get.character(target, 3))
            .flat()
            .filter(skill => {
                let bannedSkills = [
                    //武将技能
                    "xjzh_sanguo_zhawang",
                    "xjzh_sanguo_xianshou",
                    "xjzh_sanguo_lundao",
                    "xjzh_sanguo_shangshi",
                    "xjzh_sanguo_huishi",
                    "xjzh_meiren_daizhao",
                    "xjzh_meiren_zhongqing",
                    "xjzh_poe_liequan",
                    //特殊机制技能
                    "xjzh_skill_showMpCount",
                    "xjzh_poe_choice",
                    "xjzh_poe_choice2",
                    "xjzh_challenge_wujinBuffSkill"
                ];
                let bannedSkillType = ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技", "持恒技", "宗族技", "蓄力技", "阵法技"];
                let info = get.info(skill);
                let skillTypeBool = get.skillCategoriesOf(skill).some(type => bannedSkillType.includes(type));
                if (!info) return false;
                if (boolean === true && !skill.startsWith("xjzh_")) return false;
                if (!get.skillInfoTranslation(skill)) return false;;
                if (lib.skill.global.includes(skill)) return false;;
                if (bannedSkills.includes(skill)) return false;
                if (player && get.itemtype(player) == "player" && player.hasSkill(skill)) return false;
                if (info.ai?.combo && typeof info.ai.combo === "string") {
                    if (!player || (get.itemtype(player) === "player" && !player.hasSkill(info.ai.combo))) return false;
                }
                return bool === true ? !skillTypeBool : true;
            })
            .toUniqued();
        skills = typeof num != "number" ? skillList.randomGets(1) : skillList.randomGets(num);
        if (player && get.itemtype(player) == "player") player.addSkills(skills);
        return [skills, skillList];
    },
    async xjzh_hasExtensionFiles(sdir, name, callback, extension) {
        if (typeof sdir == "string") sdir = extension === true ? `extension/${sdir}` : sdir;
        else {
            console.error(`sdir参数不是字符串`);
            return;
        }
        try {
            const result = await new Promise((resolve, reject) => {
                game.checkDir(sdir, (result) => resolve(result), reject);
            });
            if (result === -1) {
                console.error(`目录 ${sdir} 不存在或无法访问`);
                callback(-1);
                return result;
            }
            else if (result === 0) {
                console.log(`${sdir} 是${sdir.match(/\.([^.]+)$/)?.[1]}类型的文件`);
                callback(0);
                return result;
            }
            else if (result === 1) {
                if (typeof name === "string") {
                    const { folders, files } = await new Promise((resolve, reject) => {
                        game.getFileList(sdir, (folders, files) => resolve({ folders, files }), reject);
                    });

                    const hasRequiredFiles = files.includes(name);
                    if (hasRequiredFiles) {
                        if (typeof callback === 'function') {
                            callback(1);
                        }
                        return 1;
                    } else {
                        console.error(`${sdir} 是目录，但不包含指定文件`);
                        if (typeof callback === 'function') {
                            callback(-1);
                        }
                        return -1;
                    }
                }
                else {
                    const checkFilesRecursively = async (dir) => {
                        const { folders, files } = await new Promise((resolve, reject) => {
                            game.getFileList(dir, (folders, files) => resolve({ folders, files }), reject);
                        });

                        if (files.length > 0) {
                            return true;
                        }

                        if (folders.length > 0) {
                            const results = await Promise.all(
                                folders.map(folder => checkFilesRecursively(`${dir}/${folder}`))
                            );
                            return results.some(result => result);
                        }

                        return false;
                    };

                    const hasFiles = await checkFilesRecursively(sdir);
                    if (hasFiles) {
                        if (typeof callback === 'function') {
                            callback(1);
                        }
                    }
                    return hasFiles ? 1 : -1;
                }
            }
        } catch (error) {
            console.error(`处理 ${sdir} 时出错:`, error);
            return -1;
        }
    },
    async xjzh_showMp(player, bool) {
        let nameList = get.nameList(player), list = [];
        for (let name of nameList) {
            let characters = get.character(name);
            if (!get.is.object(characters)) continue;
            if (characters.xjzhMp && get.is.object(characters.xjzhMp)) list.push(characters.xjzhMp);
        }

        let huixin = 0, reduce = 0, mp = 0, maxMp = 0, healing = 0;
        for (let object of list) {
            if (object.hasOwnProperty("mp")) mp += object["mp"];
            if (object.hasOwnProperty("maxMp")) maxMp += object["maxMp"];
            if (object.hasOwnProperty("huixin")) huixin += object["huixin"];
            if (object.hasOwnProperty("reduce")) reduce += object["reduce"];
            if (object.hasOwnProperty("healing")) healing += object["healing"];
        }
        if (list.length >= 2) {
            let num = list.length;
            huixin = Number((huixin / num).toFixed(2));
            reduce = Number((reduce / num).toFixed(2));
            healing = Math.round(healing / num);
            mp = Math.round(mp / num);
            maxMp = Math.round(maxMp / num);
        }
        //if(!player.node.xjzhmp){
        player.xjzh_changeMaxMp(maxMp, true);
        player.xjzh_changeMp(mp, true);
        if (bool) return;
        if (typeof huixin == "number") {
            if (!player.xjzhHuixin) player.xjzhHuixin = huixin;
            else player.xjzhHuixin += huixin;
        }
        if (typeof reduce == "number") {
            if (!player.xjzhReduce) player.xjzhReduce = reduce;
            else player.xjzhReduce += reduce;
        }
        if (typeof healing == "number") {
            if (!player.xjzhHealing) player.xjzhHealing = healing;
            else player.xjzhHealing += healing;
        }
        //}
        player.storage["xjzh_showMpBool"] = true;
    },
    xjzh_copyToFiles(sdir, fn, ddir, callback) {
        game.ensureDirectory(ddir, function () { });
        game.readFile(sdir + '/' + fn, function (data) {
            game.writeFile(data, ddir, fn, (callback || function () { }));
        });
    },
    async xjzh_playSkillAudio(...args) {
        let lang, str, volume, rate, pitch;
        for await (let arg of args) {
            if (typeof arg == 'string') {
                if (arg.includes("lang:")) lang = arg.replace("lang:", "");
                else str = arg;
            }
            else if (get.is.object(arg)) {
                volume = arg?.volume;
                rate = arg?.rate;
                pitch = arg?.pitch;
            }
        }
        if (!volume) volume = 1;//音量
        if (!rate) rate = 0.8;//语速
        if (!pitch) pitch = 0.8;//音高
        if (!lang) lang = "zh-CN";//语言

        const speechMessage = new SpeechSynthesisUtterance(str);
        speechMessage.volume = volume;
        speechMessage.rate = rate;
        speechMessage.pitch = pitch;
        speechMessage.lang = lang;
        window.speechSynthesis.speak(speechMessage);
    },
    xjzh_playBackgroundPicture() {
        let temp = game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture");
        if (temp == 'auto') {
            let list = [
                "xjzh_backgroundPicture1",
                "xjzh_backgroundPicture2",
                "xjzh_backgroundPicture3",
                "xjzh_backgroundPicture4",
                "xjzh_backgroundPicture5",
                "xjzh_backgroundPicture6",
                "xjzh_backgroundPicture7",
                "xjzh_backgroundPicture8",
                "xjzh_backgroundPicture9",
            ];
            if (_status.xjzh_backgroundPicture) list.remove(_status.xjzh_backgroundPicture);
            temp = list.randomGet();
        }
        _status.xjzh_backgroundPicture = temp;
        if (temp !== '1') {
            game.broadcastAll() + ui.background.setBackgroundImage("extension/仙家之魂/picture/" + temp + ".jpg");
        }
        else {
            game.broadcastAll() + ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
        }
        let item = game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture");
        if (item != "auto") {
            if (_status.xjzh_backgroundPicture_timeout) {
                clearTimeout(_status.xjzh_backgroundPicture_timeout);
            };
        }
        else if (item == "auto") {
            let autotime = game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture_auto");
            let Timeout = autotime ? parseInt(autotime) : 30000;
            let Timeout2 = _status.xjzh_backgroundPicture_timeout2;
            if (_status.xjzh_backgroundPicture_timeout && Timeout2 && Timeout2 != Timeout) {
                clearTimeout(_status.xjzh_backgroundPicture_timeout);
            };
            /////////////////////////////////////////////////
            _status.xjzh_background_Picture_timeout = setTimeout(function () {
                game.xjzh_playBackgroundPicture();
            }, Timeout);
            _status.xjzh_backgroundPicture_timeout2 = Timeout;
        };
    },
    xjzh_playBackgroundMusic() {
        let temp = game.getExtensionConfig("仙家之魂", "xjzh_backgroundMusic");
        if (temp == '0') temp = get.rand(2, 12).toString();
        ui.backgroundMusic.pause();
        let item = {
            "2": "xjzh_backgroundMusic2.mp3",
            "3": "xjzh_backgroundMusic3.mp3",
            "4": "xjzh_backgroundMusic4.mp3",
            "5": "xjzh_backgroundMusic5.mp3",
            "6": "xjzh_backgroundMusic6.mp3",
            "7": "xjzh_backgroundMusic7.mp3",
            "8": "xjzh_backgroundMusic8.mp3",
            "9": "xjzh_backgroundMusic9.mp3",
            "10": "xjzh_backgroundMusic10.mp3",
            "11": "xjzh_backgroundMusic11.mp3",
            "12": "xjzh_backgroundMusic12.mp3",
        };
        if (item[temp]) {
            ui.backgroundMusic.src = lib.assetURL + 'extension/仙家之魂/music/' + item[temp];
        }
        else {
            this.playBackgroundMusic();
            ui.backgroundMusic.addEventListener('ended', this.playBackgroundMusic);
        }
    },
    xjzh_showFps(id) {
        let requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        let div;
        if (!document.getElementById(id)) {
            div = document.createElement('div');
            div.setAttribute('id', 'xjzh_showFPS');
            div.style.zIndex = 999;
            div.style['pointer-events'] = 'none';
            let config = game.getExtensionConfig("仙家之魂", "xjzh_showFps");
            if (!config || config === 'close') return;
            switch (config) {
                case 'cd':
                    div.style.left = 'calc(50% - ' + (div.offsetWidth / 2) + 'px)';
                    div.style.bottom = '0px';
                    break;
                case 'ld':
                    div.style.left = '0px';
                    div.style.bottom = '0px';
                    break;
                case 'ru':
                    div.style.right = '0px';
                    div.style.top = '0px';
                    break;
                case 'cu':
                    div.style.left = 'calc(50% - ' + (div.offsetWidth / 2) + 'px)';
                    div.style.top = '0px';
                    break;
                case 'lu':
                    div.style.left = '0px';
                    div.style.top = '0px';
                    break;
                default:
                    div.style.right = '0px';
                    div.style.bottom = '0px';
            }
            ui.window.appendChild(div);
        }
        else div = document.getElementById(id);

        let fps = 0;
        let last = Date.now();
        let offset;
        let step = function () {
            offset = Date.now() - last;
            fps += 1;
            if (offset >= 1000) {
                last += offset;
                if (fps > 60) fps = 60;
                div.innerHTML = 'FPS:' + fps;
                fps = 0;
            }
            requestAnimationFrame(step);
        };
        step();
    },
    // 冷却系统：以结束时间戳 endTime 为权威状态，剩余时间按真实时间(Date.now)计算，
    // 后台标签被节流也不失准；定时器仅用于刷新展示用的 Map 和到点清理。
    xjzh_startCoolTime(player, skill, duration) {
        // 先清掉可能残留的旧定时器，避免同一技能存在多个 interval
        if (player[`${skill}CoolTimeInterval`]) {
            clearInterval(player[`${skill}CoolTimeInterval`]);
        }
        if (duration <= 0) {
            this.xjzh_removeCoolTime(player, skill);
            return;
        }

        const startTime = Date.now();
        const endTime = startTime + duration;
        // 复用同一个 Map，逐帧只 set，避免每 100ms 新建对象
        const map = new Map([["cooldown", duration], ["remainder", 0]]);
        player[`${skill}CoolTime`] = map;
        player[`${skill}CoolTimeEnd`] = endTime;

        player[`${skill}CoolTimeInterval`] = setInterval(() => {
            const now = Date.now();
            const remaining = endTime - now;
            map.set("cooldown", Math.max(0, remaining));
            map.set("remainder", now - startTime);
            if (remaining <= 0) {
                this.xjzh_removeCoolTime(player, skill);
            }
        }, 100);
    },
    xjzh_addCoolTime(...args) {
        let player, time, skill, reduce;
        for (let arg of args) {
            if (typeof arg === "number") {
                if (time === undefined) time = arg;
                else reduce = arg;
            } else if (typeof arg === "string") skill = arg;
            else player = arg;
        }
        if ([player, skill, time].some(arg => arg === undefined)) return;
        const duration = time * 1000 * (1 - (reduce / 100 || 0));
        player.storage[skill] = null;
        this.xjzh_startCoolTime(player, skill, duration);
    },
    xjzh_lessCoolTime(...args) {
        let player, time, skill;
        for (let arg of args) {
            if (typeof arg === "number") time = arg;
            else if (typeof arg === "string") skill = arg;
            else player = arg;
        }
        if ([player, skill, time].some(arg => arg === undefined)) return;
        if (!player[`${skill}CoolTime`] || player[`${skill}CoolTimeEnd`] === undefined) return;
        // 真正扣减 time 秒剩余冷却；剩余 <=0 时由 startCoolTime 结束冷却
        const remaining = player[`${skill}CoolTimeEnd`] - Date.now() - time * 1000;
        this.xjzh_startCoolTime(player, skill, remaining);
    },
    xjzh_removeCoolTime(...args) {
        let player, skill;
        for (let arg of args) {
            if (typeof arg === "string") skill = arg;
            else player = arg;
        }
        if ([player, skill].some(arg => arg === undefined)) return;
        if (player[`${skill}CoolTimeInterval`]) {
            clearInterval(player[`${skill}CoolTimeInterval`]);
            delete player[`${skill}CoolTimeInterval`];
        }
        delete player[`${skill}CoolTime`];
        delete player[`${skill}CoolTimeEnd`];
    },
    xjzh_hasCoolTime(...args) {
        let player, skill;
        for (let arg of args) {
            if (typeof arg === "string") skill = arg;
            else player = arg;
        }
        if ([player, skill].some(arg => arg === undefined)) return false;
        return player[`${skill}CoolTimeEnd`] > Date.now();
    },
    xjzh_randomSuccess(chance = 0.5) {
        return Math.random() < chance;
    },
    xjzh_clearRestraint(player) {
        let type;
        if (typeof player == "undefined" || ((type = typeof player), type != "object") || ((type = get.itemtype(player)), type != "player")) {
            throw new Error(`函数接受了一个不是Player的东西: ${type}: ${player}`);
        };

        if (player.countCards('j')) player.discard(player.getCards('j', card => get.name(card) != "jydiy_yungongliaoshang"))._triggered = null;
        if (player.isTurnedOver()) player.turnOver(false)._triggered = null;
        if (player.isLinked()) player.link(false)._triggered = null;
        if (player.countDisabledSlot() > 0) {
            for (let i = 1; i < 6; i++) {
                if (player.hasDisabledSlot(i)) player.enableEquip(i)._triggered = null;
            }
        }
        if (get.xjzh_buffList(player).length) player.xjzh_clearBuff();

        player.checkConflict();
        player.checkMarks();

        return player;
    },
    xjzh_updateText(text, num) {
        const pattern = /限(\d+次|\d+|一|二|三|四|五|六|七|八|九|十|百|千)+次/g;
        return text.replace(pattern, function (match) {
            const numberPart = match.replace(/限|次/g, '');
            try {
                const arabicNumber = numberPart.match(/\d+/) ? parseInt(numberPart) : get.chineseToArabic(numberPart);
                return `限${arabicNumber + num}次`;
            } catch (e) {
                console.error("无法识别的数字格式:", numberPart);
                return match;
            }
        });
    },
    copyTotext(text) {
        let textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            alert("文本已复制到剪贴板！");
        } catch (e) {
            console.error("复制失败", e);
            alert("当前浏览器不支持自动复制到剪贴板。");
        }
        document.body.removeChild(textarea);
    },
    xjzh_removeFiles(files) {
        if (lib.node && lib.node.fs) try {
            const deleteFolderRecursive = path => {
                if (!lib.node.fs.existsSync(path)) return;
                lib.node.fs.readdirSync(path).forEach((file, index) => {
                    const currentPath = `${path}/${file}`;
                    if (lib.node.fs.lstatSync(currentPath).isDirectory()) deleteFolderRecursive(currentPath);
                    else lib.node.fs.unlinkSync(currentPath);
                });
                lib.node.fs.rmdirSync(path);
            };
            deleteFolderRecursive(`${__dirname}/extension/仙家之魂/${files}`);
        }
            catch (error) {
                console.log(error);
            }
        else new Promise((resolve, reject) => window.resolveLocalFileSystemURL(`${lib.assetURL}extension/仙家之魂/${files}`, resolve, reject)).then(directoryEntry => directoryEntry.removeRecursively());
    },
    async xjzh_copyFiles(source, target, str, onCopyCompleted, showProgress = true) {
        // 检查源文件夹是否存在
        await new Promise((resolve, reject) => {
            game.checkDir(source, (result) => {
                if (result === -1) {
                    reject(new Error('源文件夹不存在或无法访问'));
                } else if (result === 0) {
                    reject(new Error('指定的源路径不是文件夹'));
                } else {
                    // 递归检查文件夹及其子文件夹是否有文件
                    const checkFilesRecursively = (dir) => {
                        return new Promise((resolveInner, rejectInner) => {
                            game.getFileList(dir, (folders, files) => {
                                if (files.length > 0) {
                                    // 当前文件夹有文件
                                    resolveInner(true);
                                } else if (folders.length > 0) {
                                    // 当前文件夹没有文件，但有子文件夹，递归检查子文件夹
                                    const promises = folders.map(folder => {
                                        const subDir = `${dir}/${folder}`;
                                        return checkFilesRecursively(subDir);
                                    });

                                    Promise.all(promises).then(results => {
                                        // 只要有一个子文件夹有文件，就返回 true
                                        resolveInner(results.some(result => result));
                                    }).catch(rejectInner);
                                } else {
                                    // 当前文件夹既没有文件也没有子文件夹
                                    resolveInner(false);
                                }
                            }, rejectInner);
                        });
                    };

                    checkFilesRecursively(source).then(hasFiles => {
                        if (hasFiles) {
                            resolve();
                        } else {
                            reject(new Error('源文件夹及其子文件夹内没有文件'));
                        }
                    }).catch(reject);
                }
            }, (err) => {
                reject(err);
            });
        });

        /**
         * 根据路径和当前环境（node.js或浏览器），构造完整的文件路径。
         * @param {string} path - 相对路径。
         * @returns {string} 构造的完整路径。
         */
        const getFullPath = (path) => lib.node ? `${__dirname}/${path}` : `${lib.assetURL}${path}`;

        // 修改进度条创建方式，允许外部控制
        let progress = null;
        if (showProgress && str) {
            progress = createProgress(str);
        }

        /**
         * 递归统计文件数量
         * @param {string} srcRelative - 源文件夹的相对路径。
         */
        const countFilesRecursive = async (srcRelative) => {
            return new Promise((resolve, reject) => {
                game.getFileList(srcRelative, (folders, files) => {
                    let count = files.length;
                    const subFolderPromises = folders.map(folder => {
                        const subDir = `${srcRelative}/${folder}`;
                        return countFilesRecursive(subDir);
                    });

                    Promise.all(subFolderPromises).then(subCounts => {
                        count += subCounts.reduce((sum, subCount) => sum + subCount, 0);
                        resolve(count);
                    }).catch(reject);
                }, reject);
            });
        };

        /**
         * 递归复制文件夹及其内容。
         * @param {string} srcRelative - 源文件夹的相对路径。
         * @param {string} destRelative - 目标文件夹的相对路径。
         * @param {number} totalFiles - 总文件数
         * @param {number} copiedFiles - 已复制的文件数
         */
        const copyFolderRecursive = async (srcRelative, destRelative, totalFiles, copiedFiles) => {
            await new Promise((resolve, reject) => {
                game.ensureDirectory(destRelative, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            await new Promise((resolve, reject) => {
                game.getFileList(srcRelative, async (folders, files) => {
                    const allEntries = [...folders, ...files];
                    for (const entry of allEntries) {
                        const srcPath = `${getFullPath(srcRelative)}/${entry}`;
                        const destPath = `${getFullPath(destRelative)}/${entry}`;
                        const entryRelative = `${srcRelative}/${entry}`;
                        const newStr = entry.replace(/_.*$/, '');

                        if (progress) {
                            progress.setFileName(newStr);
                        }

                        const checkDirAsync = (path) => {
                            return new Promise((resolveCheck, rejectCheck) => {
                                game.checkDir(path, (result, err) => {
                                    if (err) {
                                        rejectCheck(err);
                                    } else {
                                        resolveCheck(result);
                                    }
                                });
                            });
                        };

                        try {
                            const result = await checkDirAsync(entryRelative);
                            if (result === 1) {
                                copiedFiles = await copyFolderRecursive(entryRelative, `${destRelative}/${entry}`, totalFiles, copiedFiles);
                            } else if (result === 0) {
                                await new Promise((resolveRead, rejectRead) => {
                                    game.readFile(entryRelative, (data) => {
                                        game.writeFile(data, destRelative, entry, () => {
                                            copiedFiles++;
                                            if (progress) {
                                                progress.setProgressValue(copiedFiles);
                                            }
                                            if (progress && copiedFiles === totalFiles) {
                                                progress.remove();
                                            }
                                            resolveRead();
                                        }, (writeErr) => {
                                            console.error('写入文件失败:', entryRelative, writeErr);
                                            rejectRead(writeErr);
                                        });
                                    }, (readErr) => {
                                        console.error('读取文件失败:', entryRelative, readErr);
                                        rejectRead(readErr);
                                    });
                                });
                            }
                        } catch (error) {
                            console.error('处理文件/目录时出错:', entryRelative, error);
                            reject(error);
                            return;
                        }
                    }
                    resolve(copiedFiles);
                }, reject);
            });
            return copiedFiles;
        };

        let totalFiles = 0;
        let copiedFiles = 0;
        try {
            totalFiles = await countFilesRecursive(source);
            if (progress) {
                progress.setProgressMax(totalFiles);
            }
            copiedFiles = await copyFolderRecursive(source, target, totalFiles, copiedFiles);
            if (typeof onCopyCompleted === "function") onCopyCompleted(copiedFiles, totalFiles);
        } catch (error) {
            console.error('复制过程中出现错误:', error);
            if (typeof onCopyCompleted === "function") onCopyCompleted(copiedFiles, totalFiles);

        } finally {
            if (progress) {
                progress.remove();
            }
        }
    },
    xjzh_buySvip() {
        let svipBool = get.xjzh_checkSvipDate();
        if (svipBool) {
            let num = get.xjzh_daysBetweenDates(this.xjzh_toDateString(new Date()), svipBool[1]);
            let ret = confirm(`你的超级会员剩余${num}天，是否继续？`);
            if (!ret) return;
        }
        let tokens = get.xjzh_tokens(), suipian = get.xjzh_suipian();
        if (suipian < 3500 && tokens < 45) {
            alert("你没有足够的资源购买超级会员");
            return;
        }
        let str = `是否花费${suipian >= 3500 ? "3500碎片/" : ""}${tokens >= 45 ? "45个精魄" : ""}购买30天超级会员？`;
        let ret = confirm(str);
        if (ret) {
            if (suipian >= 3500 && tokens >= 45) {
                let ret = confirm(`确定：碎片支付\n取消：精魄支付`);
                if (ret) {
                    this.xjzh_changeSuipian(-3500);
                } else {
                    this.xjzh_changeTokens(-45);
                }
            }
            else if (suipian >= 3500 || tokens >= 35) {
                if (suipian >= 3500) {
                    this.xjzh_changeSuipian(-3500);
                } else {
                    this.xjzh_changeTokens(-45);
                }
            }
            game.xjzh_gainSvipTime(30);
            return true;
        }
        return false;
    },
    xjzh_gainSvipTime(num, log) {
        const config = game.xjzh_getQishuConfig();
        if (!Array.isArray(config.svip)) config.svip = [];
        const svipBool = get.xjzh_checkSvipDate();
        let data = [], currentDate, futureDate;
        if (!svipBool) {
            currentDate = this.xjzh_toDateString(new Date());
            futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + num);
            futureDate = this.xjzh_toDateString(futureDate);
        } else {
            currentDate = svipBool[0];
            futureDate = this.xjzh_fromDateString(svipBool[1]);
            futureDate.setDate(futureDate.getDate() + num);
            futureDate = this.xjzh_toDateString(futureDate);
        }
        data.addArray([currentDate, futureDate]);
        config.svip = data;
        console.log(data);
        game.xjzh_saveQishuConfig(config);
        if (log !== false) game.xjzh_openLoading(`超级会员购买成功，有效期至${futureDate}`);
    },
    xjzh_clearSvipTime() {
        const config = game.xjzh_getQishuConfig();
        config.svip = [];
        game.xjzh_saveQishuConfig(config);
    },
    xjzh_toDateString(date) {
        if (!date) date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    xjzh_fromDateString(dateString) {
        if (typeof dateString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return new Date(NaN);
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    },
    xjzh_toUpperCase(str) {
        return str.toUpperCase();
    },
    xjzh_toLowerCase(str) {
        return str.toLowerCase();
    },
    xjzh_wujiangpai(...args) {
        let list = [], name, num;
        for (const arg of args) {
            if (typeof arg == "string" || Array.isArray(arg)) name = arg;
            else if (typeof arg == "number") num = arg;
        }

        if (!_status.characterlist) {
            lib.skill.pingjian.initList();
        }
        let allList = _status.characterlist.slice(0);

        if (!name) return typeof num == "number" ? allList.randomGets(num) : allList;

        if (Array.isArray(name)) {
            for (let target of name) {
                list.addArray(this.xjzh_wujiangpai(target, num));
            }
        }

        // 分离完全匹配和模糊匹配的结果
        const exactMatches = [];
        const fuzzyMatches = [];

        // 预处理输入名称，确保有效性
        const isChinese = get.xjzh_checkChinese(name);
        const inputName = isChinese ? get.translation(name) : name;

        console.log('[匹配开始] 输入:', name, '| 是否中文:', isChinese, '| 处理后输入:', inputName);

        // 如果输入名称为空或无效，直接返回
        if (!inputName || inputName.trim().length === 0) {
            console.log('[匹配结束] 输入名称为空，返回空列表');
            return typeof num == "number" ? list.randomGets(num) : list;
        }

        allList.forEach((target, index) => {
            let characters = get.character(target);
            if (!characters?.skills?.length) return;

            const targetName = get.translation(target);

            if (!targetName || targetName.trim().length === 0) return;

            if (targetName === inputName) {
                exactMatches.push(target);
            }
            else if (inputName.length > 0) {
                const inputChars = Array.from(inputName);
                const targetChars = Array.from(targetName);

                const allCharsMatch = inputChars.every(char => targetChars.includes(char));

                if (allCharsMatch) {
                    fuzzyMatches.push(target);
                }
            }
        });
        list.addArray([...exactMatches, ...fuzzyMatches]);
        return typeof num == "number" ? list.randomGets(num) : list;
    },
    async xjzh_addPlayer(...args) {
        let target, identity, isNext, drawNum, targetNames, source;
        for (const arg of args) {
            if (get.itemtype(arg) == "player") {
                if (!target) target = arg;
                else source = arg;
            }
            else if (typeof arg == "string") {
                if (!targetNames) targetNames = arg;
                else identity = arg;
            }
            else if (typeof arg == "boolean") isNext = arg;
            else drawNum = arg;
        }
        if (!targetNames) targetNames = this.xjzh_wujiangpai().randomGet();
        if (!target) target = game.filterPlayer2().randomGet();

        let fellow = await game.addPlayerOL(target, targetNames, null, isNext);

        fellow.directgain(get.cards(drawNum));

        let characters = get.character(targetNames);

        fellow.maxHp = characters.maxHp
        fellow.hp = characters.hp;

        if (typeof identity == "string") {
            fellow.identity = identity;
            fellow.setIdentity(identity);
        } else {
            let id = source.identity;
            switch (id) {
                case "nei":
                    fellow.identity = "nei";
                    fellow.setIdentity("nei");
                    break;
                case "fan":
                    fellow.identity = "fan";
                    fellow.setIdentity("fan");
                    break;
                default:
                    fellow.identity = "zhong";
                    fellow.setIdentity("zhong");
            }
        }
        fellow.identityShown = true;
        fellow.forceShown = true;
        if (get.mode() == "boss") fellow.side = true;
        fellow.update();
        return fellow;
    },
    async xjzh_criticalStrike(...args) {
        let event, trigger, player, crit = 0.5, critDamage = 2, bool = false;
        for (let arg of args) {
            if (get.is.object(arg)) {
                ({ event, trigger, player } = arg);
            }
            else if (typeof arg == "number") {
                if (arg > 1) critDamage = arg;
                else crit = arg;
            }
            else if (typeof arg == "boolean") bool = arg;
        }
        if (bool === true) crit = 1;

        if (Math.random() <= crit) {
            trigger.num *= critDamage;
            trigger.set("xjzh_criticalStrike", true);
            game.log(player, "的伤害触发了", "#y" + "暴击");

            const next = game.createEvent('xjzh_criticalStrike');
            next.player = player;
            next.num = trigger.num;
            next.setContent(async function () {
                this.trigger('xjzh_criticalStrike');
            });
        }
    },
    xjzh_createDailog(...args) {
        let obj = ui.create.div('.save.xjzh_save', ui.window);
        let str, list, click, bool;
        for (let arg of args) {
            if (Array.isArray(arg)) {
                list = arg
            }
            else if (typeof arg == 'function') {
                click = arg
            }
            else if (typeof arg == 'boolean') {
                bool = arg
            }
            else if (typeof arg == 'string') {
                str = arg
            }
        }
        if (bool !== false) {
            let img = document.createElement('img');
            img.setAttribute('src', lib.assetURL + 'extension/仙家之魂/css/images/lamasi/xjzh_diablo_lamasi.png');
            img.className = 'xjzh_save2';
            obj.appendChild(img);
        }
        let dialog = ui.create.div('.xjzh_dialog', obj);
        dialog.innerHTML = str;
        let select = ui.create.div('.xjzh_select', obj);
        if (!list) list = ['确定'];
        for (let i = 0; i < list.length; i++) {
            let node = ui.create.div('.xjzh_select', select);
            node.onclick = function () {
                ui.window.removeChild(obj);
                if (typeof click == 'function') click(this.link);
            }
            node.link = list[i];
            node.innerHTML = get.translation(list[i]);
        }
        ui.window.appendChild(obj);
    },
    xjzh_openDialog(...args) {
        let pbg = ui.create.div(".xjzh-dialog-div", ui.window);
        pbg.style.zIndex = 51;
        let obj = ui.create.div('.xjzh-dialog', pbg);
        obj.style.transformOrigin = "center";
        let num = get.rand(0, 15);
        let url = "extension/仙家之魂/css/images/ui/";
        let url2 = "xjzh_info";

        obj.setBackgroundImage(`${rootURL}${url}${url2}${num}.png`);
        //obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
        let list, click, str;
        for (let arg of args) {
            if (Array.isArray(arg)) {
                list = arg;
            }
            else if (typeof arg == 'function') {
                click = arg;
            }
            else str = arg;
        }
        window.addEventListener("resize", function () {
            let width = document.body.clientWidth;
            let height = document.body.clientHeight;
            if (obj) {
                obj.style.transform = "translate(-50%,-50%) scale(" + Math.min(height / 1440, width / 2560) * 4 + ")";
            }
        }, false);
        let dialog = ui.create.div('.xjzh-dialog-name', obj);
        let text = ui.create.div('.xjzh-dialog-text', obj);
        str = get.xjzh_translateInfo(str);
        if (get.is.object(introduces[str])) {
            dialog.innerHTML = introduces[str].name;
            text.innerHTML = introduces[str].info;
        }
        else {
            if (typeof lib.translate[str] != 'undefined' || typeof lib.translate[str + "_info"] != 'undefined') {
                if (lib.translate[str]) dialog.innerHTML = lib.translate[str];
                if (lib.translate[str + "_info"]) {
                    text.innerHTML = lib.translate[str + "_info"];
                } else {
                    text.innerHTML = get.info(str).intro.content;
                }
            }
            else {
                pbg.remove();
                throw new Error(str + "参数不存在，请检查！");
            }
        }
        let node = ui.create.div('.xjzh-dialog-remove', obj);
        node.onclick = function () {
            pbg.remove();
        }
        pbg.onclick = function () {
            pbg.remove();
        }
        node.link = list;
        ui.window.appendChild(pbg);
    },
    xjzh_playAudio(fn, dir, sex) {
        if (lib.config.background_speak) {
            if (dir && sex)
                game.playAudio(dir, sex, fn);
            else if (dir)
                game.playAudio(dir, fn);
            else
                game.playAudio('..', 'extension', '仙家之魂', 'audio', 'skill', fn);
        }
    },
    xjzh_createPageFrame(options) {
        const { windowClass, bgClass, exitClass, sizeScale = 1, onExit } = options;

        // 在 appendChild 之前读取 ui.window 尺寸
        // 此时无待处理样式变更，读取 offsetWidth 是缓存命中，不触发强制回流
        const screenWidth = ui.window.offsetWidth;
        const screenHeight = ui.window.offsetHeight;

        // 创建窗口和背景（在 DOM 外构建）
        const pageWindow = ui.create.div(windowClass);
        const bk = ui.create.div(bgClass, pageWindow);

        // 退出按钮（可选）
        let exit = null;
        if (exitClass) {
            exit = ui.create.div(exitClass, bk);
        }

        // 先插入 DOM（此时 bk 只有 CSS 默认尺寸 width:50%/height:50%）
        // 框架全局 div { transition: all 0.5s } 会在尺寸变化时产生动画
        document.body.appendChild(pageWindow);

        // 在 rAF 中设置目标尺寸（使用之前缓存的值，不读取布局属性，不触发强制回流）
        // 此时设置尺寸会触发 transition: all 0.5s 的平滑过渡动画
        requestAnimationFrame(() => {
            const whr = 1.77778;
            let width, height;
            if (screenWidth / whr > screenHeight) {
                height = screenHeight;
                width = height * whr;
            } else {
                width = screenWidth;
                height = screenWidth / whr;
            }
            bk.style.height = Math.round(height) * sizeScale + "px";
            bk.style.width = Math.round(width) * sizeScale + "px";
        });

        const resize = function () {
            setTimeout(() => {
                const sw = ui.window.offsetWidth;
                const sh = ui.window.offsetHeight;
                const whr = 1.77778;
                let w, h;
                if (sw / whr > sh) { h = sh; w = h * whr; }
                else { w = sw; h = w / whr; }
                bk.style.height = Math.round(h) * sizeScale + "px";
                bk.style.width = Math.round(w) * sizeScale + "px";
            }, 500);
        };
        lib.onresize.push(resize);

        if (exit) {
            exit.listen(function () {
                pageWindow.delete();
                game.resume2();
                lib.onresize.remove(resize);
                if (onExit) onExit();
            });
        }

        return { window: pageWindow, bk, resize, exit };
    },

    /**
     * 创建Toast通知（自动消失，不阻塞主线程）
     * @param {string} message - 提示文字
     * @param {string} [type='info'] - 类型：info / success / warning / error
     * @param {number} [duration=3000] - 显示时长（毫秒）
     */
    xjzh_createToast(message, type = 'info', duration = 3000) {
        const colors = {
            info: '#5dade2',
            success: '#27ae60',
            warning: '#f39c12',
            error: '#e74c3c',
        };
        const icons = {
            info: 'ℹ',
            success: '✓',
            warning: '⚠',
            error: '✗',
        };
        const color = colors[type] || colors.info;
        const icon = icons[type] || icons.info;

        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-100px);
            z-index: 100001; display: flex; align-items: center; gap: 10px;
            padding: 14px 28px; border-radius: 8px;
            background: rgba(20, 12, 8, 0.95);
            border: 1px solid ${color}; box-shadow: 0 0 15px ${color}88;
            color: #f0e6d3; font-size: 16px; font-family: serif;
            opacity: 0; transition: all 0.3s ease; pointer-events: auto;
        `;
        toast.innerHTML = `<span style="font-size: 20px; color: ${color};">${icon}</span><span>${message}</span>`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        const removeToast = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => toast.remove(), 300);
        };

        toast.addEventListener('click', removeToast);
        setTimeout(removeToast, duration);
    },

    /**
     * 创建确认对话框（替代confirm，不阻塞主线程）
     * @param {string} message - 提示文字
     * @param {Function} onConfirm - 点击"确定"的回调
     * @param {Function} [onCancel] - 点击"取消"的回调
     */
    xjzh_createConfirm(message, onConfirm, onCancel) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 100001; display: flex; align-items: center; justify-content: center;
            background: rgba(0, 0, 0, 0.6); opacity: 0; transition: opacity 0.3s ease;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            background: rgba(30, 18, 12, 0.98); border: 1px solid #ffd700;
            border-radius: 12px; padding: 30px 40px; max-width: 460px; text-align: center;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
            transform: scale(0.9); transition: transform 0.3s ease;
        `;

        const msg = document.createElement('p');
        msg.style.cssText = 'color: #f0e6d3; font-size: 16px; font-family: serif; line-height: 1.6; margin: 0 0 24px 0;';
        msg.textContent = message;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; gap: 16px; justify-content: center;';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = '确定';
        confirmBtn.style.cssText = `
            padding: 8px 32px; border: 1px solid #ffd700; border-radius: 6px;
            background: linear-gradient(135deg, #8b6914, #ffd700);
            color: #1a0f0a; font-size: 15px; font-family: serif; cursor: pointer;
            transition: all 0.2s ease;
        `;

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '取消';
        cancelBtn.style.cssText = `
            padding: 8px 32px; border: 1px solid #888; border-radius: 6px;
            background: rgba(60, 50, 40, 0.8); color: #ccc; font-size: 15px;
            font-family: serif; cursor: pointer; transition: all 0.2s ease;
        `;

        const close = (callback) => {
            overlay.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => { overlay.remove(); if (callback) callback(); }, 300);
        };

        confirmBtn.addEventListener('mouseenter', () => confirmBtn.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.6)');
        confirmBtn.addEventListener('mouseleave', () => confirmBtn.style.boxShadow = 'none');
        cancelBtn.addEventListener('mouseenter', () => cancelBtn.style.background = 'rgba(80, 70, 60, 0.8)');
        cancelBtn.addEventListener('mouseleave', () => cancelBtn.style.background = 'rgba(60, 50, 40, 0.8)');
        confirmBtn.addEventListener('click', () => close(onConfirm));
        cancelBtn.addEventListener('click', () => close(onCancel));

        btnContainer.appendChild(confirmBtn);
        btnContainer.appendChild(cancelBtn);
        card.appendChild(msg);
        card.appendChild(btnContainer);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
    },
    // ============ 魔力弹窗辅助函数 ============
    xjzh_createMpPopupStyle(text) {
        // 缓存机制：只创建一次样式
        if (_cachedMpPopupStyle) {
            return _cachedMpPopupStyle;
        }

        let style = document.createElement('style');
        const styleParts = [];

        for (let i = 0; i < text.length; i++) {
            let keyframes = `@keyframes char-${i}-bianhuan {`;
            for (let j = 0; j <= 100; j += 10) {
                keyframes += `${j}% { color: ${this.xjzh_getRandomColor()}; opacity: 1; }`;
            }
            keyframes += '}';

            styleParts.push(`
                #char-${i} {
                    animation: char-${i}-bianhuan 20s linear 1.5s infinite;
                    font-family: kaiti;
                    font-size: 60px;
                    text-shadow: -1.3px 0px 2.2px #000, 0px -1.3px 2.2px #000, 1.3px 0px 2.2px #000, 0px 1.3px 2.2px #000;
                }
                ${keyframes}
            `);
        }

        styleParts.push(`
            #xjzhMpClass {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 30%;
            }
            .replacement-text {
                text-align: center;
                font-size: 16px;
                margin-top: 10px;
            }
        `);

        style.textContent = styleParts.join('\n');
        document.head.appendChild(style);

        // 缓存样式
        _cachedMpPopupStyle = style;
        return style;
    },
    xjzh_createMpPopup(names, target) {
        var layer = ui.create.div(".popup-container");

        var clicklayer = function (e) {
            if (_status.touchpopping) return;
            if (_status.dragged) return;
            ui.arena.classList.remove("blur");
            ui.system.classList.remove("blur");
            ui.menuContainer.classList.remove("blur");
            // 注意：样式已缓存，不再删除
            this.delete();
            e.stopPropagation();
            game.resume2();
            return false;
        };

        var uiintro = ui.create.div(".menubg.charactercard", layer);
        uiintro.setBackgroundImage(`${lib.assetURL}/extension/仙家之魂/css/images/other/mpBg.png`);
        uiintro.style.backgroundSize = 'cover';
        uiintro.style.backgroundPosition = 'center';
        uiintro.style.backgroundRepeat = 'no-repeat';

        var playerbg = ui.create.div(".menubutton.large.ava", uiintro);
        var bg = ui.create.div(".avatar", playerbg).setBackground(names, "character");

        let intro = ui.create.div(".characterintro", uiintro);

        let htmlContent = `<samp id='xjzhMpClass'></samp>`;
        intro.innerHTML = htmlContent;

        let text = '魔力面板';
        let mpClassElement = intro.querySelector('#xjzhMpClass');
        if (!mpClassElement) {
            console.error('未找到 xjzhMpClass 元素');
            return;
        }

        // 将文字字符添加到 DOM 元素中
        for (let i = 0; i < text.length; i++) {
            let charSpan = document.createElement('span');
            charSpan.textContent = text[i];
            charSpan.id = `char-${i}`;
            mpClassElement.appendChild(charSpan);
        }

        var style = this.xjzh_createMpPopupStyle(text);

        let intro2 = ui.create.div(".characterintro.intro2", uiintro);
        intro2.style.height = "65%";
        intro2.style.width = "55%";
        intro2.style.top = "30%";
        intro2.style.left = "40%";
        let str = ``;
        if (target.xjzhHuixin) str += `<br><li>会心几率：${Math.round(target.xjzhHuixin * 100)}%<br><br>`;
        if (target.xjzhReduce) str += `<li>消耗减免：${Math.round(target.xjzhReduce * 100)}%<br><br>`;
        if (target.xjzhHealing) str += `<li>每回合回蓝：${target.xjzhHealing}`;
        intro2.innerHTML = str;

        intro2.style.display = 'flex';
        intro2.style.flexDirection = 'column';
        intro2.style.fontSize = '24px';
        intro2.style.boxSizing = 'border-box';
        intro2.style.padding = '20px 30px 0 30px';

        uiintro.addEventListener(lib.config.touchscreen ? "touchend" : "click", ui.click.touchpop);
        layer.addEventListener(lib.config.touchscreen ? "touchend" : "click", clicklayer);
        ui.window.appendChild(layer);

        return layer;
    },
    xjzh_openPageInIframe(url) {
        if (!url) return null;

        if (this._pageIframe && document.body.contains(this._pageIframe)) {
            return this._pageIframe;
        }

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;border:none;';
        document.body.appendChild(iframe);
        this._pageIframe = iframe;

        const self = this;

        const closePage = () => {
            iframe.remove();
            self._pageIframe = null;
            window.removeEventListener('message', messageHandler);
        };

        const messageHandler = (e) => {
            const msg = e.data;
            if (!msg || !msg.type) return;
            if (!self._pageIframe || self._pageIframe.contentWindow !== e.source) return;

            const reply = (data) => {
                if (self._pageIframe && self._pageIframe.contentWindow) {
                    self._pageIframe.contentWindow.postMessage({ id: msg.id, data }, '*');
                }
            };

            switch (msg.type) {
                case 'closePage':
                    closePage();
                    break;
                case 'getUpdateInfo':
                    if (!msg.id) return;
                    reply({
                        version: game.updateLog?.version || '-',
                        onlyVersion: game.updateLog?.onlyVersion || '-',
                        updateLog: game.updateLog
                    });
                    break;
                case 'checkUpdate':
                    if (!msg.id) return;
                    game.checkUpdateOnline().then(result => {
                        reply(result);
                    }).catch(err => {
                        reply({
                            connectionOk: false,
                            hasUpdate: false,
                            latestVersion: null,
                            updateSize: null,
                            error: err.message
                        });
                    });
                    break;
                case 'performUpdate':
                    if (!msg.id) return;
                    reply({ success: true });
                    break;
            }
        };

        window.addEventListener('message', messageHandler);

        iframe.onload = () => {
            const doc = iframe.contentDocument;
            if (!doc) return;

            doc.getElementById('btn-close')?.addEventListener('click', closePage);
            doc.querySelectorAll('[data-close-window]').forEach(el => {
                el.addEventListener('click', closePage);
            });
        };

        return iframe;
    },

    xjzh_checkUpdateOnline() {
        const manifestURL = this.updateLog?.manifestURL || 'https://raw.githubusercontent.com/tangXins/nonameXianhuns/main/manifest.json';
        const releaseURL = this.updateLog?.releaseURL || 'https://github.com/tangXins/nonameXianhuns/releases';

        return fetch(manifestURL)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(manifest => {
                const localVersion = this.updateLog?.version || '0.0.0';
                const remoteVersion = manifest.version || '0.0.0';
                const hasUpdate = this.compareVersions(remoteVersion, localVersion) > 0;

                let updateLogData = null;
                if (hasUpdate && this.updateLog) {
                    updateLogData = this.updateLog[remoteVersion] || null;
                }

                return {
                    connectionOk: true,
                    hasUpdate,
                    latestVersion: hasUpdate ? remoteVersion : null,
                    currentVersion: localVersion,
                    updateSize: hasUpdate && manifest.files ? Object.keys(manifest.files).length + ' 个文件' : null,
                    updateLog: updateLogData,
                    manifest: hasUpdate ? manifest : null,
                    downloadUrl: hasUpdate ? releaseURL : null
                };
            })
            .catch(err => {
                return {
                    connectionOk: false,
                    hasUpdate: false,
                    latestVersion: null,
                    currentVersion: this.updateLog?.version || '-',
                    updateSize: null,
                    updateLog: null,
                    manifest: null,
                    downloadUrl: null,
                    error: err.message
                };
            });
    },

    compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        const len = Math.max(parts1.length, parts2.length);
        for (let i = 0; i < len; i++) {
            const p1 = i < parts1.length ? parts1[i] : 0;
            const p2 = i < parts2.length ? parts2[i] : 0;
            if (p1 < p2) return -1;
            if (p1 > p2) return 1;
        }
        return 0;
    },

    xjzh_getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

};

Object.assign(game, games);