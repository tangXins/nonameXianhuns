import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import { buffMap } from '../other/buff.js';

/**
 * lib.element.player方法扩展
 * @type  {import("../../../@types/player").players}
 */

const players = {
    xjzh_clearBuff(arg) {
        let buffList = [], buff;
        if (!arg) buffList.addArray(get.xjzh_buffList(this));
        if (typeof arg == "string") {
            buff = get.xjzh_buffName(arg, false);
            if (!buffMap.hasOwnProperty(buff)) return this;
            buffList.add(arg);
        }
        else if (Array.isArray(arg)) buffList.addArray(arg);
        for (let name of buffList) {
            let num = get.xjzh_buffNum(this, name);
            this.xjzh_changeBuff(name, -num)._triggered = null;
        }
        return this;
    },
    xjzh_countBuffNum(filter) {
        let list = get.xjzh_buffList(this, filter), num = 0;
        for (let name of list) {
            num += get.xjzh_buffNum(this, name);
        }
        return num;
    },
    xjzh_changeBuff(...args) {
        const next = game.createEvent('xjzh_changeBuff');
        for (let arg of args) {
            if (get.itemtype(arg) == 'player') {
                next.source = arg;
            }
            else if (typeof arg == 'string') {
                if (arg == "naturalLose") next.naturalLose = true;
                else next.buff = get.xjzh_buffName(arg);
            }
            else if (typeof arg == 'number') {
                next.num = arg;
            }
            else if (typeof arg == 'boolean') {
                next.noLimit = arg;
            }
        }

        if (!next.noLimit) next.noLimit = false;
        if (!next.num) next.num = 1;
        next.player = this;
        next.setContent(async function () {
            if (this.naturalLose == false) await this.trigger("xjzh_changeBuffBegin1");

            let bool = false;
            if (get.xjzh_noAddBuffBool(this.player, this.buff)) bool = true;

            if (!buffMap.hasOwnProperty(get.xjzh_buffName(this.buff, false)) || bool == true) return;
            let buff = this.buff;
            let num = this.num;
            buff = get.xjzh_buffName(buff);
            if (this.num != 0) {
                let tip1;
                if (this.num > 0) {
                    if (!this.player.storage[buff]) {
                        this.player.storage[buff] = 0;
                        tip1 = '附加了';
                    } else {
                        tip1 = '增加了';
                    }
                    if (!this.noLimit) num = Math.min(get.xjzh_buffInfo(buff, 'limit') - this.player.storage[buff], num);
                } else {
                    if (this.naturalLose == true) {
                        tip1 = '自然减少了';
                    } else {
                        tip1 = '移除了';
                    }
                    num = -Math.min(this.player.storage[buff], -num);
                }
                this.player.storage[buff] += num;
                this.player.syncStorage(buff);
                if (this.player.storage[buff] > 0) {
                    this.player.addAdditionalSkill('xjzh_buff', buff, true);
                    this.player.markSkill(buff);
                } else {
                    this.player.removeAdditionalSkill('xjzh_buff', buff);
                    this.player.unmarkSkill(buff);
                }
                let str = `${this.source ? `<span style="color:gold">${get.translation(this.source)}</span>令` : ""}<span style="color:gold">${get.translation(this.player)}</span>${tip1}${Math.abs(num)}层<span style="color:gold">「${get.translation(buff)}」</span>`;
                game.log(str);
            }
        });
    },
    async xjzh_addRandomSkill(num, boolean = false, bool = true) {
        return game.xjzh_addRandomSkill(num, boolean, bool, this);
    },
    restoreSkill(skill, nomark) {
        if (Array.isArray(skill)) {
            for (let i of skill) this.restoreSkill(i, nomark);
        } else {
            if (this.storage[skill] === true) this.storage[skill] = false;
            this.awakenedSkills.remove(skill);
            this.enableSkill(skill + "_awake", skill);
            if (!nomark) this.markSkill(skill);
            _status.event.clearStepCache();
        }
        return this;
    },
    xjzh_restoreSkill(skill) {
        if (Array.isArray(skill)) {
            for (let i of skill) this.xjzh_restoreSkill(i);
        } else {
            if (this.awakenedSkills.includes(skill)) this.restoreSkill(skill);
            else if (typeof skill == "string") {
                if (this.countSkill(skill)) delete this.getStat('skill')[skill];
                if (this.countUsed(skill, true)) delete this.getStat('card')[skill];
            }
            else {
                if (get.is.object(skill)) delete this.getStat('card')[skill.name];
            }
        }
        return this;
    },
    async xjzh_zhaohuan(...args) {
        let target, identity, isNext, drawNum, targetNames;
        for (const arg of args) {
            if (get.itemtype(arg) == "player") target = arg;
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
            let id = this.identity;
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

        let next = game.createEvent('xjzh_zhaohuan', false);
        next.target = target;
        next.source = this;
        next.player = fellow;
        next.name = targetNames;
        next.isZhaohuan = true;
        next.setContent(async function () {
            this.player = next.player;
            this.source.getHistory("custom").push(this);
            this.player.getHistory("custom").push(this);
            //手动处理时机，召唤物召唤到场上后触发
            await this.trigger("xjzh_zhaohuan");
        });
        return next;
    },
    isMaxMark(name, equal) {
        let marks = this.countMark(name);
        let targets = game.filterPlayer();
        for (let target of targets) {
            if (target.isOut() || target == this) continue;
            if (equal) {
                if (target.countMark(name) >= marks) return false;
            }
            else {
                if (target.countMark(name) > marks) return false;
            }
        }
        return true;
    },
    isMinMark(name, equal) {
        let marks = this.countMark(name);
        let targets = game.filterPlayer();
        for (let target of targets) {
            if (target.isOut() || target == this) continue;
            if (equal) {
                if (target.countMark(name) <= marks) return false;
            }
            else {
                if (target.countMark(name) < marks) return false;
            }
        }
        return true;
    },
    $huanxing() {
        this.classList.add('huanxing');
        let str = get.translation(this.name ? this.name : this.name1) || this.name1;
        const name = this.name ? this.name : this.name1;
        if (!str.includes('唤醒◈')) lib.translate[name] = `唤醒◈${get.slimName(name)}`; this.node.name.innerHTML = `${get.translation(this.name ? this.name : this.name1)}`;
        this.update();
        return this;
    },
    xjzh_changeMp(num, bool) {
        let next = game.createEvent('xjzh_changeMp', false);
        next.num = Math.round(num);
        next.player = this;
        next.bool = bool == true ? true : false;
        next.setContent(async function () {
            if (this.bool == false) await this.trigger('xjzh_changeMp');

            let player = this.player, num = this.num;

            if (num == 0 || !player.xjzhMaxMp) return;

            let str = `${num > 0 ? '回复' : '消耗'}了${num > get.xjzh_consumeMp(player) ? get.xjzh_consumeMp(player) : Math.abs(num)}点魔力`;
            if (game.roundNumber != 0) {
                game.log(player, str);
                if (num > 0 && get.xjzh_consumeMp(player) > 0) {
                    player.$xjzh_recoverMp(num);
                    game.playAudio('effect', 'recover');
                }
            }

            player.xjzhMp += num;

            if (isNaN(player.xjzhMp) || player.xjzhMp < 0) player.xjzhMp = 0;

            if (player.xjzhMp > player.xjzhMaxMp) player.xjzhMp = player.xjzhMaxMp;

            player.xjzh_showMp(player.xjzhMp, player.xjzhMaxMp);
        });
        return next;
    },
    xjzh_changeMaxMp(num, bool) {
        let next = game.createEvent('xjzh_changeMaxMp', false);
        next.num = Math.round(num);
        next.player = this;
        next.bool = bool == true ? true : false;
        next.setContent(async function () {
            if (this.bool == false) await this.trigger('xjzh_changeMaxMp');

            let player = this.player;

            if (num == 0) return;

            let str = `${num > 0 ? '增加' : '减少'}了${num > 0 ? num : Math.abs(num)}点魔力上限`;

            if (game.roundNumber != 0) game.log(player, str);

            if (!player.xjzhMaxMp) player.xjzhMaxMp = 0;
            if (!player.xjzhMp) player.xjzhMp = 0;

            player.xjzhMaxMp += num;

            /* if (num > 0) {
                 player.$$xjzh_recoverMp(num);
                 game.playAudio('effect', 'recover');
             }*/
            if (isNaN(player.xjzhMaxMp) || player.xjzhMaxMp < 0) player.xjzhMaxMp = 1;

            if (player.xjzhMp > player.xjzhMaxMp) player.xjzhMp = player.xjzhMaxMp;

            player.xjzh_showMp(player.xjzhMp, player.xjzhMaxMp);
        });
        return next;
    },
    $xjzh_recoverMp(num) {
        // 若对象没有 _recoverAnimationInProgress 属性，进行初始化
        if (!this.hasOwnProperty('_recoverAnimationInProgress')) {
            this._recoverAnimationInProgress = false;
            this._pendingRecoverNum = 0;
        }

        // 如果 num 有效，合并数值
        if (typeof num === 'number' && num > 0) {
            this._pendingRecoverNum += num;
        }

        // 若动画正在进行，不重新启动动画
        if (this._recoverAnimationInProgress) {
            return;
        }

        // 标记动画正在进行
        this._recoverAnimationInProgress = true;

        // 根据游戏模式获取坐标
        const { left, top } = game.chess ? this.getBoundingClientRect() : { left: this.getLeft(), top: this.getTop() };
        const x = left + this.offsetWidth / 2;
        const y = top + this.offsetHeight - 30;

        // 使用配置常量
        const config = get.xjzh_mpConfig.RECOVER_ANIMATION;

        // 文字动画透明度引用
        const textOpacityRef = { value: 0 };

        // 使用 get.js 中的辅助函数创建粒子类
        const ParticleClass = get.xjzh_createMpParticle(config, x, y);

        // 创建粒子数组
        const particles = Array.from({ length: config.PARTICLE_COUNT }, () => new ParticleClass());

        // 绘制粒子特效
        game.draw((time, surface) => {
            get.xjzh_drawMpParticles(surface, particles, config);
            const activeCount = get.xjzh_updateMpParticles(particles, time, config);

            const hasActiveParticles = activeCount > 0;
            const progress = hasActiveParticles ? Math.min(time / (config.DURATION + config.PARTICLE_TAIL), 1) : 1;

            // 使用 get.js 中的辅助函数绘制文字
            get.xjzh_drawMpText(surface, progress, this._pendingRecoverNum, x, y, config, textOpacityRef);

            if (!hasActiveParticles && textOpacityRef.value <= 0) {
                // 动画结束，清除标记
                this._recoverAnimationInProgress = false;
                // 重置待合并的 num 值
                this._pendingRecoverNum = 0;
                return false;
            }
            return true;
        });
    },
    xjzh_showMp(arg, arg2) {
        if (typeof arg !== 'number' || typeof arg2 !== 'number' || arg < 0 || arg2 <= 0) {
            console.error('参数必须是数字且必须是正数');
            return;
        }

        if (!this.node.xjzhmp) {
            this.node.xjzhmp = ui.create.div(".mp", this);
        }

        let mpdiv = this.node.xjzhmp.querySelector('.mpdiv') || ui.create.div(".mpdiv", this.node.xjzhmp);
        mpdiv.style.borderRadius = get.xjzh_mpConfig.UI.BAR_RADIUS;

        let names = get.nameList(this)[0];
        let target = this;
        if (!this.node.xjzhmp._eventBound) {
            this.node.xjzhmp.listen(function (e) {
                e.stopPropagation();
                if (_status.dragged) return;

                ui.arena.classList.add("blur");
                ui.system.classList.add("blur");
                ui.menuContainer.classList.add("blur");

                game.xjzh_createMpPopup(names, target);
            });

            this.node.xjzhmp._eventBound = true;
        }

        let mptext = mpdiv.querySelector('.mptext') || document.createElement('span');
        mptext.className = 'mptext';
        mptext.textContent = arg + "/" + arg2;
        if (!mpdiv.querySelector('.mptext')) {
            mpdiv.appendChild(mptext);
        }

        let remainingPercentage = arg / arg2;

        get.xjzh_animateMpWidth(mpdiv, remainingPercentage * 100, get.xjzh_mpConfig.UI.ANIMATION_DURATION);

        mpdiv.style.width = remainingPercentage * 100 + "%";

        if (remainingPercentage === 1) {
            mpdiv.classList.add("xjzh_full-flash");
        } else {
            mpdiv.classList.remove("xjzh_full-flash");
        }

        let lostEnergyDiv = mpdiv.querySelector('.lost-energy');
        let lostEnergyWidth = (1 - remainingPercentage) * 100;

        if (lostEnergyWidth > 0) {
            if (!lostEnergyDiv) {
                lostEnergyDiv = document.createElement('div');
                lostEnergyDiv.className = 'lost-energy';
                lostEnergyDiv.style.width = lostEnergyWidth + "%";
                lostEnergyDiv.style.backgroundColor = "#fff";
                lostEnergyDiv.style.marginLeft = "-1px";
                mpdiv.insertBefore(lostEnergyDiv, mpdiv.firstChild);
            } else {
                lostEnergyDiv.style.width = lostEnergyWidth + "%";
            }
        } else if (lostEnergyDiv) {
            mpdiv.removeChild(lostEnergyDiv);
        }
    },
    xjzh_removeMp() {
        let mpNode = this.node.xjzhmp;

        if (mpNode) {
            mpNode.parentNode.removeChild(mpNode);

            delete this.xjzhMp;
            delete this.xjzhMaxMp;
            delete this.node.xjzhmp;
        }
    },
    xjzh_getMp() {
        return this.xjzhMp ?? 0;
    },
    xjzh_getMaxMp() {
        return this.xjzhMaxMp ?? 0;
    },
    xjzh_hasMpNumber() {
        return typeof this.xjzhMaxMp == "number" && typeof this.xjzhMp == "number";
    },
    xjzh_getMpData(arg) {
        const listMap = {
            "huixin": 0,
            "maxMp": 0,
            "mp": 0,
            "reduce": 0,
            "healing": 0
        };

        const nameList = get.nameList(this);

        if (!listMap.hasOwnProperty(arg)) return nameList.map(name => get.character(name));

        const [sums, count] = nameList.reduce(([sums, count], name) => {
            const character = get.character(name);
            if (get.is.object(character) && character.xjzhMp && get.is.object(character.xjzhMp)) {
                count++;
                for (const key in sums) {
                    if (character.xjzhMp.hasOwnProperty(key)) {
                        sums[key] += character.xjzhMp[key];
                    }
                }
            }
            return [sums, count];
        }, [{ ...listMap }, 0]);

        if (count === 0) return listMap[arg];

        const average = (key) => {
            const value = sums[key] / count;
            return key === "huixin" || key === "reduce" ? Number(value.toFixed(2)) : Math.round(value);
        };

        return average(arg);
    },
    swapJudgeCards(target) {
        let next = game.createEvent('swapJudgeCards');
        next.player = this;
        next.target = target;
        next.setContent(async function () {
            let player = this.player, target = this.target;
            game.log(player, '和', target, '交换了判定区中的牌');

            let playerJudgeCards = player.getCards('j'), discardPlayerJudeg = [];
            for (let card of playerJudgeCards) {
                if (player.isDisabledJudge()) discardPlayerJudeg.push(card);
            }
            await player.discard(discardPlayerJudeg);


            let targetJudgeCards = target.getCards('j'), discardTargetJudeg = [];

            for (let card of targetJudgeCards) {
                if (target.isDisabledJudge()) discardTargetJudeg.push(card);
            }
            await target.discard(discardTargetJudeg);

            let swapCards = [player.getCards('j'), target.getCards('j')];

            player.lose(swapCards[0], ui.ordering, 'visible');
            target.lose(swapCards[1], ui.ordering, 'visible');

            if (swapCards[0].length) await player.$give(swapCards[0], target, false);
            if (swapCards[1].length) await target.$give(swapCards[1], player, false);

            for (let card of swapCards[1]) {
                player.addJudge(card);
            }

            for (let card of swapCards[0]) {
                target.addJudge(card);
            }
        });
        return next;
    },
    swapMaxHp(target, arg = false, arg2 = false) {
        let next = game.createEvent('swapMaxHp');
        if (arg == true) next.all = true;
        if (arg2 == true) next.forced = true;
        next.player = this;
        next.target = target;
        next.setContent(async function () {
            let event = this, player = event.player, target = event.target;

            let swapMaxhp = (player, target) => {
                let p1 = player.maxHp, t1 = target.maxHp;
                [p1, t1] = [t1, p1];
                player.maxHp = p1;
                target.maxHp = t1;
            };
            let swapHp = (player, target) => {
                let p2 = player.getHp(true), t2 = target.getHp(true);
                [p2, t2] = [t2, p2];
                player.hp = p2;
                target.hp = t2;
            }

            if (event.all) {
                swapMaxhp(player, target);
                swapHp(player, target);
                game.log(player, '与', target, '交换了体力值和体力上限');
                return;
            } else {
                let controls = [];
                if (player.getHp(true) != target.getHp(true)) controls.push('交换体力值');
                if (player.maxHp != target.maxHp) controls.push('交换体力上限');
                if (controls.length == 0) {
                    game.log(`${get.translation(player)}与${get.translation(target)}无需交换体力值或体力上限`);
                    return;
                }
                if (!event.forced) controls.push('cancel2');
                let prompt = `令${get.translation(player)}与${get.translation(target)}交换体力值或体力上限`;
                var choice;

                let p1 = player.maxHp, t1 = target.maxHp, p2 = player.getHp(true), t2 = target.getHp(true);
                if (t1 - p1 < t2 - p2 || (p2 < 2 && t2 > p2)) choice = '交换体力值';
                else choice = '交换体力上限';


                const result = await player.chooseControl(controls)
                    .set('prompt', prompt)
                    .set('ai', function () {
                        return _status.event.choice;
                    })
                    .set('choice', choice)
                    .forResult();
                if (result?.control) {
                    switch (result.control) {
                        case '交换体力值':
                            swapHp(player, target);
                            break;
                        case '交换体力上限':
                            swapMaxhp(player, target);
                            break;
                    }
                    result.control != "cancel2" ? game.log(player, "与", target, "交换了", result.control == "交换体力值" ? "体力值" : "体力上限") : null;

                    player.update();
                    target.update();
                }
            }
        });
        return next;
    },
    isMaxGroup(isMax = false, all = false) {
        let allPlayers = all == false ? game.filterPlayer() : game.filterPlayer2();

        let groupCountMap = new Map();

        allPlayers.forEach(item => {
            let group = item.group;
            if (lib.group.includes(group)) {
                groupCountMap.set(group, (groupCountMap.get(group) || 0) + 1);
            }
        });

        if (groupCountMap.size <= 1) return true;

        let playerGroupCount = groupCountMap.get(this.group) || 0;


        const maxCount = Math.max(...groupCountMap.values());

        const maxCountOccurrences = Array.from(groupCountMap.values()).filter(count => count === maxCount).length;

        if (isMax) {
            return playerGroupCount === maxCount && maxCountOccurrences === 1;
        } else {
            return playerGroupCount === maxCount;
        }

    },

};

Object.assign(lib.element.player, players);