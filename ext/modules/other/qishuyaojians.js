import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';

/**
 * 奇术要件列表
 * @import { qishuLists } from "../../../@types/qishuyaojian"
 * @type { SMap<qishuLists> }
 */
const qishuyaojians = {
    /*"xjzh_qishu_keyinzhengu": {
        translate: "渴瘾症",
        translate_info: "<li>你可以打造一个你自定义词缀的奇术要件。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“名为“渴瘾症”的瘟疫正在莱提斯大陆蔓延……击败感染渴瘾症的怪物收集足够的渴瘾物质后，即可在雪莱医生的手术室里对怪物进行缝合改造手术。当亲手解决掉自己制造的所有缝合怪时，雪莱医生将根据实验数据为玩家送上惊喜回报！”——雪莱医生</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-雪莱工作室`;
        },
        noTranslate: true,
        level: 5,
    },*/
    "xjzh_qishu_mingtianfu": {
        translate: "冥天照符",
        translate_info: "<li>〖通玄〗的红色数字+1；<li>〖幽变〗触发技能增加结束阶段。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“      ”</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：完成成就“微妙玄通”<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_sanguo_zuoyou",
        replaceSkill: {
            "xjzh_sanguo_youbian": {
                trigger: {
                    player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
                },
                forced: true,
                locked: true,
                priority: -1,
                async content(event, trigger, player) {
                    let names = get.nameList(player), name, bool = false;
                    if (names.some(name => game.xjzh_hasEquiped("xjzh_qishu_junmao", name))) bool = true;
                    name = bool == true ? `xjzh_sanguo_tongxuan_xiejiaozhiguan` : `xjzh_sanguo_tongxuan`;
                    if (!player.storage[name]) return;
                    let num = player.storage[name];
                    await player.draw(num);
                    if (player.isDamaged()) await player.storage[name]++;
                },
                maixue_hp: true,
                skillTagFilter(player, tag, arg) {
                    let names = get.nameList(player), name, bool = false;
                    if (names.some(name => game.xjzh_hasEquiped("xjzh_qishu_junmao", name))) bool = true;
                    name = bool == true ? `xjzh_sanguo_tongxuan_xiejiaozhiguan` : `xjzh_sanguo_tongxuan`;
                    if (tag == 'maixue_hp') {
                        if (player.getHp(true) <= 2) return false;
                        if (player.hasSkill(name)) return true;
                    };
                    return false;
                },
            },
        },
        replaceSkillInfo: {
            'xjzh_sanguo_youbian_info': '锁定技，你的准备阶段/结束阶段，你摸x张牌（x为〖通玄〗中的为红色数字），然后若你已受伤，〖通玄〗中的红色数字+1。',
        },
    },
    "xjzh_qishu_hanhuangxi": {
        translate: "汉皇信玺",
        translate_info: "<li>〖天策〗、〖天命〗使用次数+1；<li>〖谋变〗获得展示的牌可以立即使用之；<li>〖中兴〗发动技能时，若游戏未结束你获得一点体力上限且回复体力至体力上限。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“昆仑绝巅藏一玺，名曰“云螭”。非帝王所琢，乃天地灵气凝结。玺顶白玉螭首，目嵌“天心石”，能辨善恶。上古白龙化魂守护，时隐时现于云海。天光破云，龙魂显圣，择德而居，护佑苍生。——昆仑志”</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：完成成就“再兴炎汉”<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_sanguo_espliuxie",
    },
    "xjzh_qishu_linggansu": {
        translate: "灵感素",
        translate_info: "<li>你的初始魔力为0；<li>你的魔力上限+100；<li>你因技能〖抵抗〗获得的技能可以正常发动。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“灵感如清泉，始于空杯，方能纳百川。唯有放下既有之盈满，始得智慧之无穷。——虚空贤者”</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：完成成就“奇思爆破”<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_qixia_qiuliangming",
        replaceSkillInfo: {
            'xjzh_qixia_dikang_info': '锁定技，你拥有魔力抵抗，且你的魔力抵抗消耗提高60%，若你因魔力抵抗完全抵消一次伤害，你获得一个技能。',
        },
        async init(player) {
            player.xjzh_changeMaxMp(100, true);
            player.xjzh_changeMp(-player.xjzh_getMaxMp(), true);
        },
    },
    "xjzh_qishu_chaofeng": {
        translate: "凤凰图",
        translate_info: "<li>〖朝凰〗获得的增益效果不再移除。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“百鸟朝凰。”</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：完成成就“百鸟朝凰”<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_sanguo_tongyuan",
        replaceSkillInfo: {
            'xjzh_sanguo_chaohuang_info': '限定技，出牌阶段，你可以弃置区域内所有牌，然后将手牌补至体力上限，然后本局游戏内，你使用【杀】无次数和距离限制，并且你的手牌数始终不小于你的体力上限。',
        },
    },
    "xjzh_qishu_lieshou": {
        translate: "猎首",
        translate_info: "<li>你造成1点伤害伤害后，随机偷取目标一项属性。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“骨骼是灵魂的居所，血肉是精神和世界交流的窗口，推动一切的力量就在心窝。即使有了这些，失去了头脑就没有自我。”——冈姆军师拉维安加</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：全域掉落`;
        },
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                source: "damageSource",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            getIndex(event, player) {
                return event.num || 1;
            },
            global: ["xjzh_qishu_lieshou_mod"],
            async content(event, trigger, player) {
                game.xjzh_stealAttributes(player, trigger.player);
            },
            subSkill: {
                "mod": {
                    trigger: {
                        player: "drawBegin",
                    },
                    forced: true,
                    locked: true,
                    priority: 10,
                    popup: false,
                    charlotte: true,
                    sub: true,
                    mod: {
                        maxHandcardFinal(player, num) {
                            let storage = player.storage.xjzh_stealAttributes;
                            if (!storage || !get.is.object(storage) || typeof storage.maxHandCard != "number") return num;
                            return num + storage.maxHandCard;
                        },
                    },
                    filter(event, player) {
                        let storage = player.storage.xjzh_stealAttributes;
                        return storage && get.is.object(storage) && typeof storage.drawNum == "number";
                    },
                    async content(event, trigger, player) {
                        let storage = player.storage.xjzh_stealAttributes;
                        let drawNum = storage.drawNum, result;
                        result = Math.max(0, trigger.num + drawNum);
                        result == 0 ? trigger.changeToZero() : trigger.num = result;
                    },
                },
            },
        },
    },
    "xjzh_qishu_shenshengshuzhi": {
        translate: "神圣树脂",
        translate_info: "<li>你的魔力上限+100点；<li>你回复体力时，提高2%魔力上限并回复1%魔力上限的魔力值；<li>你每回合回蓝数值+10；<li>你的初始魔力值为0。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“纯洁的树脂缓缓流动。”</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-巨口深坑<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        get filter() {
            return Object.keys(lib.character).filter(i =>
                i.startsWith("xjzh_") &&
                get.is.object(lib.character[i].xjzhMp) &&
                typeof lib.character[i].xjzhMp.maxMp == "number" &&
                typeof lib.character[i].xjzhMp.mp == "number"
            );
        },
        async init(player) {
            player.xjzh_changeMaxMp(100, true);
            player.xjzh_changeMp(-player.xjzh_getMaxMp(), true);
            player.xjzhHealing ? player.xjzhHealing += 10 : player.xjzhHealing = 10;
        },
        skill: {
            trigger: {
                player: "recoverAfter",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            async content(event, trigger, player) {
                player.xjzh_changeMaxMp(Math.round(player.xjzh_getMaxMp() * 0.02));
                player.xjzh_changeMp(Math.round(player.xjzh_getMaxMp() * 0.01));
            },
        },
    },
    "xjzh_qishu_linghunlaoyin": {
        translate: "灵魂烙印",
        translate_info: "<li>你的魔力上限-50；<li>你的初始魔力值为0；<li>你因【桃】回复体力时，回复5倍魔力；<li>你的魔力抵抗触发所需魔力降低20%；<li>你的技能〖施虐〗使用牌回复魔力改为使用基本牌回复魔力，但回复的魔力值提高5倍；<li>你的技能〖施虐〗获得会心效果：你有5%几率在发动技能时回复魔力值至魔力上限。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“要创造这样的神器, 需要在炼金术、塑形术和灵魂的微妙魔法方面拥有非凡的造诣。按道理来说它不该存在, 但它的确存在。” - 匠师卡拉斯</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-巨口深坑<br><br>专属角色：${get.translation(this.filter)}<br><br>冲突装备：${this.conflict.map(name => get.xjzh_qishuTranslate(name))}`;
        },
        noTranslate: true,
        level: 4,
        conflict: ["xjzh_qishu_fenglangkx", "xjzh_qishu_wuyan", "xjzh_qishu_fengbaopaoxiao", "xjzh_qishu_waxilidedaogao"],
        filter: "xjzh_diablo_yafeikela",
        skill: {
            trigger: {
                player: "recoverAfter",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (!event.card) return false;
                return get.name(event.card) == "tao";
            },
            async content(event, trigger, player) {
                let num = trigger.num;
                player.xjzh_changeMp(num * 5);
            },
        },
    },
    "xjzh_qishu_yaoyezhibu": {
        translate: "摇曳之步",
        translate_info: "<li>附近角色对你造成伤害有50%几率防止之；<li>你的会心几率+20%；<li>会心：你发动有次数限制的技能（usable）后有40%几率令该技能使用数次+1。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“创造这些靴子的人认为它们是失败品。直到一位‘贵不可及的’卡尔蒂姆贵族被刺杀后, 人们才明白这些靴子的真正力量。” - 巴雷特的《名器谱》</font></span>",
        extra: `等阶：4<br><br>获取：升华试炼-巨口深坑`,
        noTranslate: true,
        level: 4,
        async init(player) {
            player.xjzhHuixin ? player.xjzhHuixin += 0.2 : player.xjzhHuixin = 0.2;
        },
        skill: {
            trigger: {
                player: ["damageBegin1", "useSkillAfter", "logSkillAfter"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (event.name == "damage") {
                    if (!event.source) return false;
                    if (!get.xjzh_nearbyRole(player).includes(event.source)) return false;
                    return Math.random() <= 0.5;
                } else {
                    let skill = get.sourceSkillFor(event);
                    let info = get.info(skill);
                    if (!info.usable) return false;
                    let huixin = player.xjzhHuixin;
                    return Math.random() <= 0.4 * (1 + huixin);
                }
            },
            async content(event, trigger, player) {
                let name = trigger.name;
                if (name == "damage") {
                    trigger.changeToZero();
                    game.log(player, `因<span style="color: yellow;">【${get.translation(event.name)}】</span>`, `防止`, trigger.source, `造成的伤害`);
                }
                else {
                    let skill = get.sourceSkillFor(trigger);
                    player.getStat('skill')[skill]--;
                    game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(skill)}使用次数+1`);
                }
            },
        },
    },
    "xjzh_qishu_tianzhibeimin": {
        translate: "天使之悲悯",
        translate_info: "<li>你的技能〖天籁〗〖祝福〗的魔力消耗-10；<li>〖天籁〗技能结算后，你可以消耗等量魔力令你执行相同的效果<li>〖祝福〗无法再选择你为目标<li>〖祝福〗会直接对你生效，且你可以选择任意名被控制的角色，每额外选择一名角色，魔力消耗+10。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“神爱世人 —— 无论是在苦难中挣扎的灵魂，还是在喜悦中绽放的生命，皆被纳入祂宽广无垠的关怀之网，这份爱超越时空界限，如江河奔涌不息，默默守护着每一个晨曦与黄昏，让迷茫者寻得方向，让破碎者重获希望，在岁月的长河中静静流淌，成为永恒不变的温暖慰藉。” —— 天启 </font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-冰川极地<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_dnf_luoshibahe",
        init(player) {
            if (get.nameList(player).includes("xjzh_dnf_luoshibahe")) {
                let skills = ["xjzh_dnf_tiannai", "xjzh_dnf_zhufu"];
                for (let skill of skills) {
                    let info = get.info(skill);
                    if (info.consumeMp) lib.skill[skill].consumeMp = info.consumeMp - 10;
                }
            }
        },
    },
    "xjzh_qishu_fengleibian": {
        translate: "风雷鞭",
        translate_info: "<li>〖披坚〗可以选择两个技能；<li>〖勇决〗仅使用第一张牌须失去体力。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“文鸯摧锋陷阵，帮助文钦撤退后，司马师派左长史司马班率骁将八千翼而追击，文鸯单枪匹马冲入数千骑兵阵中，转眼间便杀伤百余人，进出六、七次，追骑不敢逼近。。” —— 《资治通鉴》</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：完成成就“披坚执锐”<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_sanguo_wenyang",
        replaceSkill: {
            "xjzh_sanguo_pijian": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                audio: "ext:仙家之魂/audio/skill:2",
                check: (event, player) => true,
                async content(event, trigger, player) {
                    let pijianSkills = game.xjzh_addRandomSkill(null, false)[1]
                        .filter(skill => {
                            let info = get.info(skill);
                            return info && info.shaRelated && !player.skills.includes(skill);
                        }).map(item => [
                            item,
                            '<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' + get.translation(item) + '】</div><div>' + lib.translate[item + '_info'] + '</div></div>'
                        ]);

                    if (!pijianSkills.length) return;

                    const result = await player.chooseButton(pijianSkills.length > 1 ? [1, 2] : 1)
                        .set("createDialog", ["〖披坚〗：请选择一个技能", [pijianSkills.randomGets(3), 'textbutton']])
                        .set("ai", button => get.skillRank(button.link, "in"))
                        .forResult();

                    if (result?.links) {
                        let names = result.links;

                        game.addVideo("skill", player, ["xjzh_sanguo_pijian_changed", [names]]);
                        game.broadcastAll((player, names, triggername) => {
                            player.tempname.addArray(names);
                            for (let name of names) lib.skill[triggername].createCard(name);
                        }, player, names, event.name);

                        let cards = names.map(name => {
                            let card = game.createCard(`xjzh_sanguo_pijian_changed_${name}`, 'none', 'none');
                            return card;
                        });

                        player.$gain2(cards);
                        game.delayx();

                        if (cards) {
                            for await (let card of cards) player.equip(card);
                        }
                    }
                },
                createCard(name) {
                    let characters;
                    for (let i in lib.character) {
                        if (!get.character(i)?.skills?.length) continue;
                        if (get.character(i)?.skills.includes(name)) {
                            characters = i;
                            break;
                        }
                    }
                    if (!lib.card['xjzh_sanguo_pijian_changed_' + name]) {
                        if (lib.translate[name + "_ab"]) lib.translate["xjzh_sanguo_pijian_changed_" + name] = lib.translate[name + "_ab"];
                        else lib.translate["xjzh_sanguo_pijian_changed_" + name] = lib.translate[name];

                        let str = lib.translate[name + "_info"];
                        let card = {
                            fullimage: true,
                            image: "character:" + characters,
                            type: 'equip',
                            subtype: 'equip1',
                            enable: true,
                            selectTarget: -1,
                            filterCard(card, player, target) {
                                if (player != target) return false;
                                return target.canEquip(card, true);
                            },
                            onLose() {
                                let player = get.player();
                                player.drawTo(player.maxHp);
                                player.lose(card, ui.special).set('getlx', false);
                            },
                            modTarget: true,
                            allowMultiple: false,
                            content: lib.element.content.equipCard,
                            toself: true,
                            ai: {},
                            skills: [],
                        }
                        card.distance = { attackFrom: -1 };
                        card.skills.add(name);
                        str += '<li>此牌离开你的装备区后，你将手牌补至体力上限。';
                        lib.translate[`xjzh_sanguo_pijian_changed_${name}_info`] = str;
                        lib.card['xjzh_sanguo_pijian_changed_' + name] = card;
                    }
                },
            },
            "xjzh_sanguo_yongjue": {
                enable: "phaseUse",
                usable: 1,
                audio: "ext:仙家之魂/audio/skill:2",
                filter(event, player) {
                    let history = player.getHistory('useCard', function (evt) {
                        return evt && evt.card && get.is.damageCard(evt.card);
                    });
                    if (!history.length) return false;
                    return player.getEquips(1).length > 0;
                },
                async content(event, trigger, player) {
                    player.discard(player.getEquips(1));
                    player.loseHp();
                    let history = player.getHistory('useCard', function (evt) {
                        return evt && evt.card && get.is.damageCard(evt.card);
                    });
                    let list = history.slice(0);
                    while (list.length) {
                        let object = list.shift();
                        let card = object.card;
                        let targets = object.targets.filter(current => current.isAlive() && player.canUse(card, current));
                        if (targets.length == 0) continue;
                        targets.removeArray(targets.filter(current => current.isDead()));
                        player.useCard(card, targets, false).set('addCount', false);
                    }
                },
                ai: {
                    order() {
                        let player = get.player();
                        let history = player.getHistory('useCard', function (evt) {
                            return evt && evt.card && get.is.damageCard(evt.card);
                        });
                        if (!history.length || player.hp == 1) return 0;
                        return 1;
                    },
                    result: {
                        player(player, target) {
                            let history = player.getHistory('useCard', function (evt) {
                                return evt && evt.card && get.is.damageCard(evt.card);
                            });
                            if (!history.length || player.hp == 1) return 0;
                            return 1;
                        },
                    },
                },
            },
        },
        replaceSkillInfo: {
            'xjzh_sanguo_pijian_info': '你的准备阶段，你可以从随机3个与【杀】有关的技能中选择2个将其视为武器牌装备之，当你失去此牌时，你将手牌补至体力上限；锁定技，你获得技能时，获得一个额外的武器栏。',
            "xjzh_sanguo_yongjue_info": "出牌阶段限一次，你可以弃置武器栏的所有牌并失去一点体力，然后按顺序使用你本回合已使用的所有[伤害]卡牌（不改变目标）。",
        },
    },
    "xjzh_qishu_bubaiwangzhe": {
        translate: "不败王者",
        translate_info: "该奇术要件可以额外镶嵌仪式符文/祷告符文各两个；镶嵌在该奇术要件上的符文不提供任何效果且不和已有符文组合冲突；你无法在该奇术要件上镶嵌两个相同的符文；<li>你每镶嵌一个仪式符文，其他仪式符文获得贡品数量提高50%；<li>你每镶嵌一个祷告符文，其他祷告符文生效时额外生效一次。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“无光之眼未曾退缩或哀泣，他们挺身对抗终结。———仲裁者之书</font></span>",
        extra: `等阶：4<br><br>获取：升华试炼-憎恨王座<br><br>兑换所需：5000碎片`,
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                player: ["addMarkBegin", "xjzh_fuwen_runeTrigger"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                let names = get.nameList(player), lists = get.xjzh_runeQishuList("xjzh_qishu_bubaiwangzhe"), list, qishuList = {}, runesList = {};
                if (!names.length || !lists.length) return false;
                for (let name of names) {
                    list = get.xjzh_equiped(name);
                    if (list.length) qishuList[name] = list;
                }
                let equipList = Object.keys(qishuList);
                for (let equip of equipList) {
                    list = qishuList[equip];
                    list.forEach(item => {
                        if (get.xjzh_runeQishuList(item).length) runesList[item] = get.xjzh_runeQishuList(item);
                    });
                }
                if (Reflect.ownKeys(runesList).length === 0) return false;
                //if(!["addMark","xjzh_fuwen_runeTrigger"].includes(event.name)) return false;
                return event.name == "addMark" ? event.markname.includes("xjzh_fuwen_runeEffect") : Object.keys(runesList).some(item => {
                    if (item === "xjzh_qishu_bubaiwangzhe") return false;
                    return runesList[item].length >= 2;
                });
            },
            async content(event, trigger, player) {
                let list = get.xjzh_runeQishuList(event.name);
                let ritualList = list.filter(item => get.xjzh_runeType(item) == "ritual");
                let praylList = list.filter(item => get.xjzh_runeType(item) == "pray");
                if (trigger.name == "addMark") trigger.num = Math.round(trigger.num * (1 + ritualList.length * 0.5));
                else {
                    if (!praylList.length) return;
                    let num = praylList.length, targetLists = trigger?.targets?.length ? [...trigger.targets] : [], skillsEffect = trigger.skillsEffect;

                    while (num > 0) {
                        await skillsEffect(event, trigger, player);
                        num--;
                    }
                }

            },
        },
    },
    "xjzh_qishu_lianjinshi": {
        translate: "炼金师之力",
        translate_info: "你造成伤害时，若此伤害属性的数量不小于2，你令此伤害溅射至你选择的至多2名额外角色。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“炼金师苦思冥想，花费数个岁月，终于将各种元素属性融合到了一件物品中。——炼金师密卷</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                source: ["damageBegin1"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (event.numFixed || event.cancelled) return false;
                if (event.getParent().name == 'xjzh_qishu_lianjinshi') return false;
                return get.natureList(event, player).length >= 2;
            },
            async content(event, trigger, player) {
                let list = [trigger.num, trigger.nature, player, "notrigger"];
                list.push(trigger.card ? trigger.card : "nocard");
                const result = await player.chooseTarget(`〖炼金师之力〗:请选择至多2角色对其造成${trigger.num}点${get.translation(trigger.nature)}伤害`, lib.filter.notMe).forResult();
                if (result?.targets) {
                    for await (let target of result.targets) target.damage(...(list.slice(0)));
                }
            },
        },
    },
    "xjzh_qishu_tairuier": {
        translate: "泰瑞尔之力",
        translate_info: "你有20%几率防止所有伤害，你有60%几率防止属性伤害，你有15%几率防止体力流失；当你发动技能时，若你未受伤，你可以令一名其他角色获得该技能直到其发动该技能为止。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“于是，正义的完美化身——泰瑞尔诞生了。没有人能比他更勇猛地对抗地狱之力。吸取教训后，所有恶魔都在正义之力面前颤抖。” ——王公之书，第一卷</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                player: ["damageBegin1", "loseHpBegin", "useSkill", "logSkillBegin"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (event.name == "damage") {
                    if (game.hasNature(event)) return Math.random() <= 0.6;
                    return Math.random() <= 0.2;
                }
                if (event.name == "loseHp") return Math.random() <= 0.15;
                if (["useSkill", "logSkillBegin"].includes(event.name)) {
                    let skill = get.sourceSkillFor(event.skill), info = get.info(skill);
                    if (player.isDamaged()) return false;
                    if (!get.skillInfoTranslation(skill, player)) return false;
                    if (lib.skill.global.includes(skill)) return false;
                    if (!info || (info && (info.limited || info.juexingji || info.dutySkill || info.equipSkill || info.cardSkill || info.sub || info.unique || info.runeSkills))) return false;
                    if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;
                    return game.hasPlayer(current => !current.hasSkill(skill));
                }
                return false;
            },
            async content(event, trigger, player) {
                if (["damage", "loseHp"].includes(trigger.name)) trigger.changeToZero();
                else {
                    let skill = get.sourceSkillFor(trigger.skill);
                    const result = await player.chooseTarget(1, `〖泰瑞尔之力〗：令一名其他角色获得技能【${get.translation(skill)}】直到其发动该技能`, (card, player, target) => {
                        if (target == player) return false;
                        return !target.hasSkill(skill);
                    }).set("ai", target => {
                        return get.attitude(player, target);
                    }).forResult();
                    if (result?.targets) result.targets[0].addTempSkills(skill, { player: `${skill}After` });
                }
            },
        },
    },
    "xjzh_qishu_hakankouyu": {
        translate: "哈坎的口谕",
        translate_info: "<li>〖箭雨〗获得42.5%冷却时间缩减；<br>〖箭雨〗有30%几率释放两次；<li>你的〖箭雨〗造成火/毒/冰/雷属性伤害；<li>每使用2张牌，你的〖箭雨〗减少2秒冷却时间。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“封锁卡尔蒂姆大门。让它引以为傲的高墙提供密不透风的防御。凯基斯坦其他地区可能会遭受这场瘟疫，但我的城市和我的人民不会。” - 哈坎二世的布告</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-流电圣徒<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_diablo_kaxia",
        skill: {
            trigger: {
                source: "damageBegin",
                player: "useCardAfter",
            },
            forced: true,
            priority: 10,
            sub: true,
            filter(event, player) {
                let evt = event.getParent(3), name = event.name;
                if (name == "useCard") {
                    let history = player.getAllHistory("useCard", evt => {
                        return evt && evt.getParent().name != "xjzh_diablo_jianyu";
                    });
                    if (!player.storage.xjzh_diablo_jianyu) return false;
                    if (event.getParent().name == "xjzh_diablo_jianyu") return false;
                    return history.length % 2 == 0;
                }
                return evt.name == "xjzh_diablo_jianyu";
            },
            async content(event, trigger, player) {
                let name = trigger.name;
                if (name == "damage") game.setNature(trigger, ["poison", "fire", "ice", "thunder"], true);
                else {
                    game.xjzh_lessCoolTime(player, 2, "xjzh_diablo_jianyu");
                }
            },
        },
    },
    "xjzh_qishu_wuyexinjie": {
        translate: "无夜星空之戒",
        translate_info: "你每使用2张牌，摸1张牌，并使你本回合造成伤害+1；你的会心几率+10%。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“不要让你的热情全都变成了执着。心中的热忱之火固然不能熄灭，但若是为了讨好一个无情的世界而将自己燃烧殆尽，那就是疯了。” - 塞利格大师的遗言</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        async init(player) {
            player.xjzhHuixin ? player.xjzhHuixin += 0.1 : player.xjzhHuixin = 0.1;
        },
        skill: {
            trigger: {
                player: "useCardAfter",
                source: "damageBegin",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                let name = event.name, history = player.getHistory('useCard');
                if (name == 'damage') {
                    return history.length >= 2;
                }
                return history.length % 2 == 0;
            },
            async content(event, trigger, player) {
                let name = trigger.name;
                if (name == 'useCard') player.draw();
                else {
                    trigger.num++;
                }
            },
        },
    },
    "xjzh_qishu_rongjiezhixin": {
        translate: "塞利格的溶解之心",
        translate_info: "<li>当你受到伤害时，你可以弃置x+1张牌防止之；<li>你的手牌上限+y，你摸牌时，你额外摸y张牌（x为你受到的伤害值，y为你的体力值）",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“不要让你的热情全都变成了执着。心中的热忱之火固然不能熄灭，但若是为了讨好一个无情的世界而将自己燃烧殆尽，那就是疯了。” - 塞利格大师的遗言</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        dynamicTranslate(player) {
            return `<li>当你受到伤害时，你可以弃置x+1张牌防止之；<li>你的手牌上限+${player.getHp(true)}，你摸牌时，你额外摸${player.getHp(true)}张牌（x为你受到的伤害值）`;
        },
        skill: {
            trigger: {
                player: ["damageBegin", "drawBegin"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            mod: {
                maxHandcardBase(player, num) {
                    return num + player.getHp(true);
                },
            },
            filter(event, player) {
                let name = event.name;
                if (name == 'damage') {
                    if (player.countCards('hes') < event.num + 1) return false;
                    return !event.numFixed;
                }
                return true;
            },
            async content(event, trigger, player) {
                let name = trigger.name;
                if (name == 'damage') {
                    const result = await player.chooseToDiscard("hes", `〖塞利格的溶解之心〗:弃置${trigger.num + 1}张牌防止之`, trigger.num + 1)
                        .set("ai", card => {
                            if (_status.event.goon) return 12 - get.value(card);
                            return 0;
                        }).set(
                            "goon", (() => {
                                if (get.damageEffect(player, trigger.source, player) > 0) return true;
                                return false;
                            })()
                        ).forResult();
                    if (result?.bool) trigger.changeToZero();
                } else {
                    trigger.num += player.getHp(true);
                }
            },
        },
    },
    "xjzh_qishu_lietiangong": {
        translate: "猎天弓",
        translate_info: "<li>〖乱射〗增加的随机目标改为2个；<li>〖乱射〗使用的牌额外结算一次，且因〖乱射〗造成伤害令目标获得“目盲”",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>——“莫瑞娜拿起她的弓，瞄准了太阳。阳光灼伤了她的双眼，但箭矢依然没有落空。受伤的太阳隐藏了起来，从而带来了第一个夜晚。” - 《猎天传奇》</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-恶念魔窟<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_diablo_moruina",
        replaceSkill: {
            "xjzh_diablo_luanshe": {
                trigger: {
                    player: "useCard2",
                },
                forced: true,
                locked: true,
                priority: 3,
                filter(event, player) {
                    if (!event.cards || !event.cards.length) return false;
                    if (get.name(event.cards[0], player) != "sha") return false;
                    return game.hasPlayer(current => current != event.targets[0] && current != player);
                },
                /*mod:{
                    targetInRange(card,player,target){
                        if(get.name(card,player)=="sha") return true;
                    },
                    playerEnabled(card,player,target){
                        if(get.name(card,player)!="sha") return;
                        let info=get.info(card);
                        if(info.selectTarget&&info.selectTarget!==-1) return true;
                    },
                },*/
                async content(event, trigger, player) {
                    trigger.set("xjzh_diablo_luanshe", true);
                    let targets = game.filterPlayer(current => current != trigger.targets[0] && current != player), num = get.rand(1, Math.min(2, targets.length))
                    targets = targets.randomGets(num);

                    trigger.targets.addArray(targets);
                    game.log(targets, "成为此【杀】的额外目标");

                    trigger.effectCount++;

                    game.log(player, "的技能〖乱射〗额外结算一次");
                },
                ai: {
                    order: 8,
                    result: {
                        player(player, target, card) {
                            if (get.name(card, player) != "sha") return;
                            let targets = game.filterPlayer(current => current != target && current != player), num = 0
                            for (let name of targets) {
                                if (player.isFriendsOf(name)) num++;
                            }
                            if (num > targets.length - num) return 0.2;
                            return 1.5;
                        },
                    },
                },
            },
        },
        replaceSkillInfo: {
            'xjzh_diablo_luanshe_info': '锁定技，当你使用【杀】指定目标时，此【杀】增加1-3个且不为你和初始目标的随机额外目标。',
        },
        skill: {
            trigger: {
                source: "damageAfter",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                let evt = event.getParent(2);
                if (evt && !evt.xjzh_diablo_luanshe) return false;
                return !event.numFixed;
            },
            async content(event, trigger, player) {
                trigger.player.xjzh_changeBuff('mumang', 1);
            },
        },
    },
    "xjzh_qishu_mingyunzhiquan": {
        translate: "命运之拳",
        translate_info: "<li>你的会心几率+(0.1-77.7)%；<li>你造成伤害有几率+(1-3)；<br><br><li>会心：当你对其他角色造成伤害后，你有(0.1-51.8)%几率令其获得随机一层减益buff。",
        dynamicTranslate(player) {
            let storage = player.storage.xjzh_qishu_mingyunzhiquan;
            return `<li>你的会心几率+${(storage.get("huixin") / 10).toFixed(2).replace(/\.00$/, '')}%；<li>你造成伤害有${(storage.get("damage")[0] * 100).toFixed(2).replace(/\.00$/, '')}%几率+${storage.get("damage")[1]}；<br><br><li>会心：当你对其他角色造成伤害后，你有${(storage.get("buff") / 10).toFixed(2).replace(/\.00$/, '')}%几率令其获得随机一层减益buff。`;

        },
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“你会让恐惧欺骗你一生，还是会不惜一切代价去领悟真谛？毕竟，死亡只不过是我们用来交换生命的钱币。” - 祖尔克</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        async init(player) {
            let storage = new Map(
                [
                    ["huixin", get.rand(100, 777)],
                    ["damage", [Math.random(), get.rand(1, 3)]],
                    ["buff", get.rand(100, 518)]
                ]
            );
            player.xjzhHuixin ? player.xjzhHuixin += storage.get("huixin") / 1000 : player.xjzhHuixin = storage.get("huixin") / 1000;
            player.storage.xjzh_qishu_mingyunzhiquan = storage;
        },
        skill: {
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            locked: true,
            charlotte: true,
            superCharlotte: true,
            priority: 10,
            filter(event, player) {
                return !event.numFixed;
            },
            async content(event, trigger, player) {
                let storage = player.storage.xjzh_qishu_mingyunzhiquan;
                if (Math.random() < storage.get("damage")[0]) trigger.num += storage.get("damage")[1];
                if (Math.random() < storage.get("buff") / 1000 * (1 + player.xjzhHuixin)) {
                    player.when({ source: "damageAfter" })
                        .assign({
                            firstDo: true,
                        })
                        .then(() => {
                            let deBuff = lib.xjzh_Debuff.randomGet();
                            trigger.player.xjzh_changeBuff(deBuff, 1);
                            game.log(player, `因<span style="color: yellow;">〖命运之拳〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层${get.xjzh_buffTranslate(deBuff)}`);
                        });
                }
            },
        },
    },
    "xjzh_qishu_junmao": {
        translate: "谐角之冠",
        translate_info: "你所有限制回合发动次数的主动技能+2次发动次数。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“这个头饰曾经是一个伪装成宫廷法师的刺客佩戴的。她的背叛行径虽然最终暴露，但在那之前，她已经成功用魔法诅咒了国王和他的整个家族。” - 《阿斯顿家族的陨落》</font></span>",
        extra: `等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：10%<br><br>兑换所需：230碎片`,
        noTranslate: true,
        level: 4,
        async init(player) {
            let list = player.getSkills(null, false, false).filter(function (skill) {
                let info = lib.skill[skill];
                return info && !info.equipSkill && !info.cardSkill && !lib.skill.global.includes(skill) && info.usable && typeof info.usable == 'number';
            });
            if (!list.length) return;
            for await (let skill of list) {
                let info = get.info(skill);
                if (!info.enable || info.enable != "phaseUse") continue;
                let newSkill = skill + "_xiejiaozhiguan";
                if (!lib.skill[newSkill]) {
                    lib.skill[newSkill] = lib.skill[skill];
                    lib.skill[newSkill].usable = info.usable + 2;
                    lib.translate[newSkill] = get.translation(skill);
                    let text = get.translation(skill + "_info");
                    lib.translate[newSkill + "_info"] = game.xjzh_updateText(text, 2);
                    if (lib.dynamicTranslate[skill]) {
                        const translates = lib.dynamicTranslate[skill];
                        lib.dynamicTranslate[newSkill] = function (player) {
                            return game.xjzh_updateText(translates.apply(null, arguments), 2);
                        };
                    }
                }
                player.changeSkills([newSkill], [skill]);
            }
        },
        skill: {
            trigger: {
                player: "changeSkillsAfter",
            },
            forced: true,
            locked: true,
            charlotte: true,
            superCharlotte: true,
            priority: 10,
            filter(event, player) {
                if (!event.addSkill || !event.addSkill.length) return false;
                if (event.getParent().name == "xjzh_qishu_junmao") return false;
                return event.addSkill.every(skill => {
                    return !skill.includes("_xiejiaozhiguan");
                });
            },
            async content(event, trigger, player) {
                let skills = trigger.addSkill.filter(skill => {
                    return !skill.includes("_xiejiaozhiguan");
                });
                if (!skills.length) return;
                for await (let skill of skills) {
                    let info = get.info(skill);
                    if (!info.enable || info.enable != "phaseUse") continue;
                    let newSkill = skill + "_xiejiaozhiguan";
                    if (!lib.skill[newSkill]) {
                        lib.skill[newSkill] = lib.skill[skill];
                        lib.skill[newSkill].usable = info.usable + 2;
                        lib.translate[newSkill] = get.translation(skill);
                        let text = get.translation(skill + "_info");
                        lib.translate[newSkill + "_info"] = game.xjzh_updateText(text, 2);
                        if (lib.dynamicTranslate[skill]) {
                            const translates = lib.dynamicTranslate[skill];
                            lib.dynamicTranslate[newSkill] = function (player) {
                                return game.xjzh_updateText(translates.apply(null, arguments), 2);
                            };
                        }
                    }
                    player.changeSkills([newSkill], [skill]);
                }
            },
        },
    },
    "xjzh_qishu_tongkuhushou": {
        translate: "痛苦吞食者",
        translate_info: "<li>你使用基本牌造成伤害令其获得等量个“痛”标记；<li>你使用牌对标记的目标造成伤害时，令场上所有被标记的角色受到额外x点伤害，每因此造成一点伤害，你摸一张牌（x为其拥有的标记数量）。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>这副手套以督瑞尔的甲壳碎片制成, 戴着它或被它击中都会导致剧痛, 如同将手插入千万片碎玻璃一样。</font></span>",
        extra: "等阶：4<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：10%<br><br>兑换所需：230碎片",
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                source: "damageSource",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            marktext: "痛",
            intro: {
                content: "#",
            },
            filter(event, player, name) {
                if (!event.cards || !event.cards.length) return false;
                return !event.numFixed && !event.cancelled;
            },
            async content(event, trigger, player) {
                if (!trigger.player.hasMark("xjzh_qishu_tongkuhushou")) {
                    if (get.type(trigger.cards[0]) == "basic") await trigger.player.addMark("xjzh_qishu_tongkuhushou", trigger.num, false);
                } else {
                    let targets = game.filterPlayer(current => current.hasMark("xjzh_qishu_tongkuhushou"));
                    for await (let target of targets) {
                        target.damage(target.countMark("xjzh_qishu_tongkuhushou"), "nocard", player)._triggered = null;
                        target.clearMark("xjzh_qishu_tongkuhushou");
                    }
                }
            },
        },
    },
    "xjzh_qishu_jiandun": {
        translate: "坚毅之盾",
        translate_info: "当你受到伤害后，你获得等量护甲，此后每个你的回合开始时，若你有护甲，你将一点护甲转为体力上限。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            trigger: {
                player: ["damageAfter", "phaseBegin"],
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player, name) {
                if (name == "phaseBegin") return player.hujia > 0;
                if (name == "damageAfter" && !event.hujia) return !event.numFixed || !event.cancelled;
                return false;
            },
            async content(event, trigger, player) {
                if (trigger.name == "damage") {
                    await player.changeHujia(trigger.num);
                } else {
                    player.changeHujia(-1);
                    player.gainMaxHp();
                }
            },
        },
    },
    "xjzh_qishu_suoding": {
        translate: "锁定目标",
        translate_info: "你使用非装备牌和非延时锦囊牌指定目标不小于2时，你可以为此牌重新指定一个目标(需合法)，此牌根据未重新指定目标前的目标数量对其额外生效等量次数。",
        extra: "等阶：4<br><>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：10%<br><br>兑换所需：230碎片",
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                player: "useCard",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (event.targets.length < 2) return false;
                return get.type(event.card) != "delay" && get.type(event.card) != "equip";
            },
            async content(event, trigger, player) {
                const result = await player.chooseTarget(1, `〖锁定目标〗：为${get.translation(trigger.card)}重新指定一个目标并令其额外结算${trigger.targets.length}次`, (card, player, target) => {
                    return player.canUse(get.event().card, target, false);
                })
                    .set('ai', target => {
                        let trigger = _status.event.getTrigger();
                        let player = get.player();
                        return get.effect(target, trigger.card, player, player);
                    })
                    .set('card', trigger.card)
                    .forResult();
                if (result?.targets) {
                    let num = trigger.targets.length;
                    trigger.targets = result.targets;
                    trigger.effectCount += num;
                    game.log(trigger.card, "额外结算", num, "次");
                }
            },
        },
    },
    /*"xjzh_qishu_fenlie": {
        translate: "分裂箭矢",
        translate_info: "你使用不指定为全部目标的牌可以额外指定1个目标。",
        extra: "等阶：5<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：10%<br><br>兑换所需：320碎片",
        noTranslate: true,
        level: 5,
        status: {
            1: [1, 250],
            2: [2, 350],
            3: [3, 500],
            4: [4, 720],
            5: [5, 0],
        },
        maxUp: 5,
        skill: {
            trigger: {
                player: "useCard2",
            },
            forced: true,
            priority: 9,
            lastDo: true,
            filter(event, player) {
                var info = get.info(event.card);
                if (info.allowMultiple == false) return false;
                if (event.targets && !info.multitarget) {
                    if (game.hasPlayer(current => {
                        return !event.targets.includes(current) && player.canUse(event.card, current, false);
                    })) {
                        return true;
                    }
                }
                return false;
            },
            async content(event, trigger, player) {
                let num = lib.xjzh_qishuyaojians["xjzh_qishu_fenlie"].status[lib.config.xjzh_qishuyaojians.levelEquip.item.level][0];
                let list = num == 1 ? 1 : [1, Math.min(num, game.players.length - trigger.targets.length)];
                const targets = await player.chooseTarget(list, `〖分裂箭矢〗：为${get.translation(trigger.card)}额外指定一个目标`, (card, player, target) => {
                    if (_status.event.targets.includes(target)) return false;
                    return player.canUse(_status.event.card, target, false);
                }).set('ai', target => {
                    let trigger = _status.event.getTrigger();
                    let player = _status.event.player;
                    return get.effect(target, trigger.card, player, player);
                }).set('targets', trigger.targets).set('card', trigger.card).forResultTargets();
                if (targets) {
                    trigger.targets.addArray(result.targets);
                    game.log(trigger.player, "成为", trigger.card, "的额外目标");
                }
            },
        },
    },*/
    /*"xjzh_qishu_waxilidedaogao": {
        translate: "瓦西里的祷告",
        translate_info: "你的熊人技能也视为大地技能，你的所有大地技能等级+3，你的体力上限+3，每个回合开始时，以1：10（体力/灵力）的比例消耗灵力值以回复体力值。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“在面向大海的瓦西里雕像处生长着一些大橡树的根，它们有时会出现向后弯曲的情况，根内充满了狂暴的魔法。” - 巴雷特的《名器谱》</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-恶念魔窟<br><br>专属角色：${get.translation(this.filter)}<br><br>冲突装备：${this.conflict.map(name => get.xjzh_qishuTranslate(name))}`;
        },
        noTranslate: true,
        level: 4,
        conflict: ["xjzh_qishu_fengbaopaoxiao"],
        filter: "xjzh_diablo_yafeikela",
        precede: ["xjzh_qishu_wuyan"],
        async init(player) {
            if (!get.is.playerNames(player, "xjzh_diablo_yafeikela")) return;
            let skills = player.getSkills(null, false, false).filter(function (skill) {
                let info = lib.skill[skill];
                if (lib.skill.global.includes(skill)) return false;
                return info && (info.xjzh_xiongrenSkill || info.xjzh_dadiSkill);
            });
            if (skills.length) {
                for await (let skill of skills) {
                    let info = get.info(skill);
                    if (info.xjzh_xiongrenSkill) info.xjzh_dadiSkill = true;
                }
                do {
                    let skill = skills.shift(), info = get.info(skill);
                    if (info.level) info.level += 3;
                } while (skills.length);
            }
            await player.gainMaxHp(3);
            await player.recoverTo(player.maxHp);
        },
        skill: {
            trigger: {
                global: "phaseBefore",
            },
            forced: true,
            priority: 10,
            lastDo: true,
            filter(event, player) {
                if (player.isHealthy()) return false;
                return get.xjzhMp(player) >= 10;
            },
            async content(event, trigger, player) {
                let num = Math.floor(player.xjzhMp / 10);
                let num2 = Math.min(num, player.getDamagedHp(true));
                player.xjzh_changeMp(-(num2 * 10));
                player.recover(num2);
                game.log(player, "将", num2 * 10, "点灵力转化为了", num2, "点体力值");
            },
        },
    },
    "xjzh_qishu_wuyan": {
        translate: "无餍之怒",
        translate_info: "禁用你的技能〖灵兽〗，你锁定形态为熊形态，你的熊人技能不再消耗灵力，改为回复等量灵力。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“灰烬之日”到来时，伟大的德鲁伊纳菲恩提醒他的门徒们说，为了保护图尔·杜拉不受阿斯塔洛斯的烈焰伤害，没有什么是不能牺牲的，哪怕他们的人性。</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-流电圣徒<br><br>专属角色：${get.translation(this.filter)}<br><br>冲突装备：${this.conflict.map(name => get.xjzh_qishuTranslate(name))}`;
        },
        noTranslate: true,
        level: 4,
        conflict: ["xjzh_qishu_fenglangkx"],
        filter: "xjzh_diablo_yafeikela",
        unequip: ["xjzh_qishu_waxilidedaogao"],
        async init(player) {
            if (!get.is.playerNames(player, "xjzh_diablo_yafeikela")) return;
            let node;
            if (player.name2 && player.name2 == 'xjzh_diablo_yafeikela') {
                node = player.node.name2;
            } else {
                node = player.node.name;
            }
            player.setAvatar('xjzh_diablo_yafeikela', 'xjzh_diablo_xiong');
            node.innerHTML = get.translation("xjzh_diablo_xiong");
            let skills = lib.character["xjzh_diablo_xiong"][3];
            player.addSkill(skills);
        },
    },*/
    "xjzh_qishu_fengbaopaoxiao": {
        translate: "风暴咆哮",
        translate_info: "<li>你的会心几率+30%；<li>你获得10%-15%灵力消耗减免；<li>你每回合回蓝数值+3。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“孩子，聆听风暴的天籁之音吧。它有自己的节奏，自己的旋律。听它那美妙的歌声，也许有一天你也能加入进来，与之合鸣。” - 艾蕊达</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-巨口深坑<br><br>专属角色：${get.translation(this.filter)}<br><br>冲突装备：${this.conflict.map(name => get.xjzh_qishuTranslate(name))}`;
        },
        noTranslate: true,
        level: 4,
        conflict: ["xjzh_qishu_waxilidedaogao"],
        filter: "xjzh_diablo_yafeikela",
        precede: ["xjzh_qishu_fenglangkx"],
        async init(player) {
            if (!get.is.playerNames(player, "xjzh_diablo_yafeikela")) return;
            let num = get.rand(10, 15) / 100;
            player.xjzhHuixin ? player.xjzhHuixin += 0.3 : player.xjzhHuixin = 0.3;
            player.xjzhReduce ? player.xjzhReduce += num : player.xjzhReduce = num;
            player.xjzhHealing ? player.xjzhHealing += 3 : player.xjzhHealing = 3;
        },
    },
    "xjzh_qishu_fenglangkx": {
        translate: "疯狼的狂喜",
        translate_info: "<li>你锁定形态为狼人形态；<li>你的灵力上限+50；<li>你的初始魔力值为0；<li>其他角色获得易伤时，你摸1张牌；<li>你摸牌时有几率回复10点魔力。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“他不是诅咒的受害者 - 这都是他自找的。就算他的皮肤裂开，骨骼碎裂，他的笑声也从未停止。” - 疯狂贵族的故事</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-恶念魔窟<br><br>专属角色：${get.translation(this.filter)}<br><br>冲突装备：${this.conflict.map(name => get.xjzh_qishuTranslate(name))}`;
        },
        noTranslate: true,
        level: 4,
        conflict: ["xjzh_qishu_wuyan", "xjzh_qishu_linghunlaoyin"],
        filter: "xjzh_diablo_yafeikela",
        unequip: ["xjzh_qishu_fengbaopaoxiao"],
        async init(player) {
            if (!get.is.playerNames(player, "xjzh_diablo_yafeikela")) return;
            let node;
            if (player.name2 && player.name2 == 'xjzh_diablo_yafeikela') {
                node = player.node.name2;
            } else {
                node = player.node.name;
            }
            player.setAvatar('xjzh_diablo_yafeikela', 'xjzh_diablo_lang');
            node.innerHTML = get.translation("xjzh_diablo_lang");
            player.changeSkills(get.character("xjzh_diablo_lang", 3), get.character("xjzh_diablo_yafeikela", 3));
        },
        skill: {
            trigger: {
                global: "xjzh_changeBuffBegin1",
                player: "drawBegin",
            },
            forced: true,
            locked: true,
            priority: -1,
            filter(event, player) {
                if (event.name == "draw") return game.xjzh_randomSuccess();
                return event.buff == "xjzh_buff_yishang";
            },
            async content(event, trigger, player) {
                if (trigger.name == "draw") player.xjzh_changeMp(10);
                else player.draw();
            },
        },
    },
    "xjzh_qishu_wumingzhe": {
        translate: "无名者兜帽",
        translate_info: "你的会心几率+35%，你对被控制的角色使用牌无距离和次数限制，且被控制的角色的手牌对你始终可见。",
        append_info: "<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“他被逐出了公会，名字也从书中被划去。彻底抹除他的存在就是对他的惩罚。” - 摘录于一张烧焦的羊皮纸</font></span>",
        get extra() {
            return `等阶：${this.level}<br><br>获取：升华试炼-巨口深坑<br><br>专属角色：${get.translation(this.filter)}`;
        },
        noTranslate: true,
        level: 4,
        filter: "xjzh_diablo_nataya",
        async init(player) {
            if (!get.is.playerNames(player, "xjzh_diablo_nataya")) return;
            player.xjzhHuixin ? player.xjzhHuixin += 0.35 : player.xjzhHuixin = 0.35;
        },
        skill: {
            mod: {
                cardUsableTarget(card, player, target) {
                    if (get.xjzh_deEffect(target)) return true;
                },
                targetInRange(card, player, target) {
                    if (get.xjzh_deEffect(target)) return true;
                },
            },
            ai: {
                viewHandcard: true,
                skillTagFilter(player, tag, arg) {
                    if (tag == 'viewHandcard') {
                        if (player == arg) return false;
                        if (get.xjzh_deEffect(arg)) return true;
                        return false;
                    };
                },
            },
        },
    },
    "xjzh_qishu_daojian": {
        translate: "疾疫刀尖",
        translate_info: "你使用【杀】造成伤害附加毒属性伤害且该伤害+1。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                source: "damageBegin",
            },
            forced: true,
            priority: -1,
            lastDo: true,
            filter(event, player) {
                return event.card && get.name(event.card) == "sha";
            },
            async content(event, trigger, player) {
                trigger.num++;
                game.setNature(trigger, 'poison', true);
            },
            ai: {
                poisondamage: true,
            },
        },
    },
    "xjzh_qishu_fuchou": {
        translate: "复仇之笼",
        translate_info: "你所受到的伤害的30%-50%将会被储存起来，直到该数值不小于1时，你可以对一名其他角色以该数值的300%造成等量火焰伤害（四舍五入），若如此做，你清除储存的伤害数值。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            trigger: {
                player: "damageAfter",
            },
            forced: true,
            priority: -1,
            lastDo: true,
            init(player, skill) {
                if (!player.storage[skill]) player.storage[skill] = 0;
            },
            async content(event, trigger, player) {
                let damageNum = trigger.num, storage = player.storage[event.name];
                let randNum = get.rand(30, 50);
                let num = damageNum * (randNum / 100);
                storage += num;
                game.log(player, `受到${damageNum}点伤害的${randNum}%将被储存起来，数值为`, num);

                await game.delay();

                if (storage >= 1) {
                    let damageNum = Math.round(storage * 3);
                    const result = await player.chooseTarget(`〖复仇之笼〗：请选择一名其他角色并对其造成${damageNum}点火焰伤害`, lib.filter.notMe)
                        .set('ai', target => {
                            let player = get.player();
                            return get.damageEffect(target, player, player, "fire");
                        })
                        .forResult();
                    if (result?.targets) {
                        result.targets[0].damage(damageNum, player, 'nocard', 'fire');
                        storage = 0;
                    }
                }
                player.storage[event.name] = storage;
            },
        },
    },
    "xjzh_qishu_wuqijingtong": {
        translate: "武器精通",
        translate_info: "<li>游戏开始时，你获得3个额外的武器栏；<li>你每装备一张武器牌，你计算与其他角色距离-1。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            init(player) {
                player.expandEquip(1, 1, 1);
            },
            mod: {
                globalFrom(from, to, distance) {
                    return distance - from.countCards("e", (card) => get.subtype(card) == "equip1");
                },
            },
        },
    },
    "xjzh_qishu_fangjujingtong": {
        translate: "防具精通",
        translate_info: "<li>游戏开始时，你获得3个额外的防具栏；<li>你每装备一张防具牌，其他角色与你计算距离+1。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            init(player) {
                player.expandEquip(2, 2, 2);
            },
            mod: {
                globalTo(from, to, distance) {
                    return distance - to.countCards("e", (card) => get.subtype(card) == "equip2");
                },
            },
        },
    },
    "xjzh_qishu_binglengjiqiao": {
        translate: "冰冷技巧",
        translate_info: "你防止冰属性伤害；你造成伤害有50%几率附加冰属性伤害并暴击。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            trigger: {
                player: "damageBegin1",
                source: "damageBegin1",
            },
            forced: true,
            priority: -1,
            lastDo: true,
            filter(event, player) {
                if (game.hasNature(event, 'ice') && event.player == player) return true;
                if (event.source == player) return true;
                return false;
            },
            async content(event, trigger, player) {
                if (game.hasNature(event, 'ice') && trigger.player == player) {
                    trigger.changeToZero();
                    return;
                }

                if (trigger.source == player && Math.random() <= 0.5) {
                    game.setNature(trigger, 'ice', true);
                    game.xjzh_criticalStrike({ event, trigger, player });
                }
            },
            ai: {
                effect: {
                    target(card, player, target) {
                        if (get.nature(card).includes('ice')) return 0;
                    },
                },
            },
        },
    },
    "xjzh_qishu_qiyue": {
        translate: "恶念契约",
        translate_info: "你的回合开始时，你从以下3种效果种选择一种：1，获得一点护甲；2，装备一张攻击距离为2的武器牌；3，摸两张牌。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                player: "phaseBefore",
            },
            forced: true,
            priority: -1,
            lastDo: true,
            content: function () {
                "step 0"
                var list = [
                    "获得一点护甲",
                    "装备一张攻击范围为3的武器牌",
                    "摸两张牌"
                ]
                player.chooseControlList(get.prompt(event.name, player), list).set('ai', function () {
                    var player = _status.event.player
                    if (player.hp < player.maxHp / 2) {
                        if (player.hp == 1) return 0;
                        return 1;
                    }
                    return 2;
                });
                "step 1"
                if (result.control != "cancel2") {
                    switch (result.index) {
                        case 0: {
                            player.changeHujia(1);
                            break;
                        }
                        case 1: {
                            player.equip(get.cardPile(function (cardx) {
                                return get.subtype(cardx) == "equip1" && get.info(cardx).distance && get.info(cardx).distance.attackFrom == -2;
                            }));
                            break;
                        }
                        case 2: {
                            player.draw(2);
                            break;
                        }
                    }
                }
            },
        },
    },
    "xjzh_qishu_titoushi": {
        translate: "剃头师",
        translate_info: "你所造成的伤害将被其免疫之，40-20秒后将以每10秒提高70%（四舍五入）令其流失等量体力。",
        extra: "等阶：4<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：5%<br><br>兑换所需：230碎片",
        noTranslate: true,
        level: 4,
        skill: {
            trigger: {
                source: "damageBegin",
            },
            forced: true,
            priority: 6,
            filter(event, player) {
                return !event.numFixed && !event.cancelled;
            },
            async content(event, trigger, player) {
                let num = get.rand(20000, 40000);
                let numx = (num / 1000) * 0.07;
                let damageNum = Math.round(trigger.num * (1 + numx));
                game.log(trigger.player, "受到", player, "的", "#y〖剃头师〗", "影响", trigger.num, "点伤害将于", num / 1000, "s后转为流失", damageNum, "点体力");
                setTimeout(() => {
                    if (trigger.player.isAlive()) {
                        trigger.player.loseHp(damageNum);
                        game.log(trigger.player, "因", player, "的", "#y〖剃头师〗", "流失", damageNum, "点体力");
                    }
                }, num);
                trigger.changeToZero();
            },
        },
    },
    "xjzh_qishu_yaojishi": {
        translate: "药剂师",
        translate_info: "你造成伤害有25-40%几率令其视为受到火、毒、冰属性伤害，每有一种额外的属性伤害，该伤害+1。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                source: "damageBegin",
            },
            forced: true,
            priority: 7,
            filter(event, player) {
                let num = get.rand(25, 40);
                if (Math.random() > num / 100) return false;
                if (event.getParent('xjzh_qishu_yaojishi').name == "xjzh_qishu_yaojishi") return false;
                let list = get.natureList(event, player), list2 = ["poison", "ice", "fire"], num2 = 0;
                list2.forEach(item => {
                    if (!list.includes(item)) num2++;
                });
                if (num2 >= 3) return false;
                return !event.numFixed && !event.cancelled;
            },
            async content(event, trigger, player) {
                let list = get.natureList(trigger, player), list2 = ["poison", "ice", "fire"], list3 = [];
                list2.forEach(item => {
                    if (!list.includes(item)) list3.push(item);
                });
                if (list3.length) {
                    game.setNature(trigger, list3, true);
                    trigger.num += list3.length;
                }
            },
        },
    },
    "xjzh_qishu_wushitongku": {
        translate: "无视痛苦",
        translate_info: "你受到伤害有5-25%防止之，改为回复等量体力。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                player: "damageBegin",
            },
            forced: true,
            priority: 3,
            filter(event, player) {
                let num = get.rand(5, 25);
                if (Math.random() > num / 100) return false;
                return !event.numFixed && !event.cancelled;
            },
            content(event, trigger, player) {
                trigger.player.recover(trigger.num);
                trigger.changeToZero();
            },
        },
    },
    "xjzh_qishu_siwanghuanxing": {
        translate: "死亡缓刑",
        translate_info: "你造成伤害后有15-35%几率令其获得一种随机减益buff，你对有减益buff的角色造成伤害根据每1种减益buff附加额外1点毒属性伤害。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                source: "damageEnd",
            },
            forced: true,
            priority: 2,
            content: function () {
                "step 0"
                if (!trigger.cancelled && !trigger.numFixed) {
                    var deBuff = lib.xjzh_Debuff.slice(0);
                    var num = get.rand(15, 35);
                    if (Math.random() <= num / 100) {
                        trigger.player.xjzh_changeBuff(deBuff.randomGet(), 1);
                    }
                }
                "step 1"
                var list = get.xjzh_buffList(trigger.player, false);
                trigger.player.damage(list.length, player, "poison", "nocard");
                player.logSkill("xjzh_qishu_siwanghuanxing", trigger.player);
            },
        },
    },
    "xjzh_qishu_shengmingfusu": {
        translate: "生命复苏",
        translate_info: "锁定技，当一名角色因你回复体力时，其回复的体力值基础数值+1，若其处于濒死阶段，则额外+1回复基础数值。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                source: "recoverBegin",
            },
            priority: 3,
            forced: true,
            async content(event, trigger, player) {
                trigger.num++;
                if (trigger.player.isDying()) trigger.num++;
            },
        },
    },
    "xjzh_qishu_heianxuewu": {
        translate: "黑暗血舞",
        translate_info: "你的体力值大于体力上限的一半时，你使用[伤害]卡牌须失去一点体力值并令本次造成的伤害+1，但你无需再弃置此牌。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                player: "useCard",
            },
            forced: true,
            priority: 3,
            filter: function (event, player) {
                return player.hp > Math.ceil(player.maxHp / 2) && get.is.damageCard(event.card);
            },
            content: function () {
                "step 0"
                player.loseHp();
                "step 1"
                if (!trigger.baseDamage) trigger.baseDamage = 1;
                trigger.baseDamage++;
                "step 2"
                player.gain(trigger.card, player, 'gain2');
            },
        },
    },
    "xjzh_qishu_jishudanyao": {
        translate: "集束弹药",
        translate_info: "你使用牌指定的目标有20%几率令其获得1层定身。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                player: "useCard2",
            },
            forced: true,
            priority: 3,
            filter: function (event, player) {
                if (get.xjzh_buffNum(player, "dingshen") >= get.xjzh_buffInfo("dingshen", 'limit')) return false;
                return Math.random() <= 0.2;
            },
            content: function () {
                player.xjzh_changeBuff("dingshen", 1);
            },
        },
    },
    "xjzh_qishu_talaxia": {
        translate: "塔拉夏之心",
        translate_info: "若你造成的属性伤害与你上次对其造成的属性伤害不同，你本次造成的属性伤害+1，且你有几率获得一张与你本次造成的属性伤害类型不同的【杀】。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            priority: 3,
            filter: function (event, player) {
                if (!event.nature) return false;
                var history = player.getAllHistory('sourceDamage', function (evt) {
                    return evt && evt.nature;
                });
                var naturex = history[history.length - 1];
                if (naturex != event.nature) return true;
                return false;
            },
            content: function () {
                "step 0"
                trigger.num++
                "step 1"
                var history = player.getAllHistory('sourceDamage', function (evt) {
                    return evt && evt.nature;
                });
                var naturex = history[history.length - 1];
                var nature2 = lib.nature.slice(0).remove(naturex).randomGet();
                if (Math.random() <= Math.random()) player.gain({ name: "sha", nature: nature2 }, player, 'gain2', 'log');
            },
        },
    },
    "xjzh_qishu_huanji": {
        translate: "还击",
        translate_info: "当你横置、翻面、判定区置入延时锦囊牌后，你可以令一名其他角色获得相同效果。",
        extra: "等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：17.5%<br><br>兑换所需：150碎片",
        noTranslate: true,
        level: 3,
        skill: {
            trigger: {
                player: ["linkAfter", "turnOverAfter", "addJudgeAfter"],
            },
            forced: true,
            priority: 4,
            async content(event, trigger, player) {
                let str;
                if (trigger.name == "addJudge") {
                    str = "〖还击〗：请选择将" + get.translation(trigger.cards[0]) + "置入一名其他角色的判定区";
                }
                else if (trigger.name == "link") {
                    str = "〖还击〗：请选择令一名其他角色横置武将牌";
                }
                else if (trigger.name == "turnOver") {
                    str = "〖还击〗：请选择令一名其他角色翻面";
                }
                const result = await player.chooseTarget(str, (card, player, target) => {
                    if (trigger.name == "addJudge") {
                        return target.canAddJudge(trigger.cards[0]);
                    }
                    return target != player;
                })
                    .set("ai", target => {
                        return get.attitude(player, target);
                    })
                    .forResult();
                if (result?.targets) {
                    let target = result.targets[0];
                    if (trigger.name == "addJudge") {
                        let card = game.createCard(trigger.card, get.number(trigger.card), get.suit(trigger.card));
                        target.addJudge(card);
                        target.$gain2(card);
                    } else {
                        target[trigger.name](true);
                    }
                }
            },
        },
    },
    "xjzh_qishu_maoxianmingyun": {
        translate: "冒险命运",
        translate_info: "若你造成伤害的点数不小于2，则该伤害增加100%，否则减少100％。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                source: "damageBegin1",
            },
            forced: true,
            priority: 4,
            filter: function (event, player) {
                if (event.numFixed || event.cancelled) return false;
                return true;
            },
            content: function () {
                if (trigger.num >= 2) trigger.num *= 2;
                else trigger.changeToZero();
            },
        },
    },
    "xjzh_qishu_chengfa": {
        translate: "惩罚",
        translate_info: "若你的攻击距离不小于3，你使用[伤害]卡牌指定目标后获得其随机一张牌。",
        extra: "等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：30%<br><br>兑换所需：100碎片",
        noTranslate: true,
        level: 2,
        skill: {
            trigger: {
                player: "useCardToPlayered",
            },
            forced: true,
            priority: 4,
            filter: function (event, player) {
                if (!get.is.damageCard(event.card)) return false;
                return player.getAttackRange() >= 3;
            },
            content: function () {
                var cards = trigger.target.getGainableCards(player, 'hej');
                player.gain(cards.randomGet(), 'log', trigger.target, 'gain2');
            },
        },
    },
    "xjzh_qishu_guimeihuanying": {
        translate: "诡魅幻影",
        translate_info: "其他角色使用牌前，你有几率使用一张同名牌。",
        extra: "等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：40%<br><br>兑换所需：50碎片",
        noTranslate: true,
        level: 1,
        skill: {
            trigger: {
                global: "useCard",
            },
            forced: true,
            priority: 6,
            filter(event, player) {
                if (event.player == player) return false;
                if (!player.hasUseTarget(event.card)) return false;
                return game.xjzh_randomSuccess();
            },
            async content(event, trigger, player) {
                let card = game.createCard(get.name(trigger.card), get.number(trigger.card), get.suit(trigger.card));
                await player.chooseUseTarget(card);
            },
        },
    },

};
lib.xjzh_qishuyaojians = qishuyaojians;


//设置奇术要件装备情况互通的角色
const xjzh_equipHutong = [
    ['xjzh_huoying_mingren', 'xjzh_huoying_liudaomingren'],
    ['xjzh_huoying_zuozhu', 'xjzh_huoying_liudaozuozhu']
];
lib.xjzh_equipHutong = xjzh_equipHutong;

if (typeof game.xjzh_saveQishuConfig === 'function') {
    game.xjzh_saveQishuConfig();
}

//局内显示奇术要件按钮
if (!lib.element.player.inits) lib.element.player.inits = [];
lib.element.player.inits.add(async (player) => {
    if (player.node.hasOwnProperty("xjzh_equipQishus")) {
        player.node.xjzh_equipQishus.hide();
        delete player.node.xjzh_equipQishus;
    }
    let config = game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions");
    let configAi = game.getExtensionConfig("仙家之魂", "xjzh_qishuAiEquip");
    let configAll = game.getExtensionConfig("仙家之魂", "xjzh_qishuAllMode");
    if (get.nameList(player).length == 0) return false;
    if (configAll !== true && !['identity', 'doudizhu'].includes(get.mode())) return;
    if (configAi !== true && !player.isUnderControl(true)) return;
    if (!config || config === "close") return;
    if (config === "own" && !get.isXHwujiang(player)) return;
    let playerNames = get.nameList(player), qishuEquipsLists = [];
    if (!playerNames.filter(item => get.xjzh_equiped(item).length).length) return;
    if (playerNames.length == 1) {
        qishuEquipsLists = get.xjzh_equiped(playerNames[0]);
    } else {
        playerNames.forEach(name => {
            qishuEquipsLists.addArray(get.xjzh_equiped(name));
        });
    }
    qishuEquipsLists.unique();
    if (!qishuEquipsLists.length) return;
    let names = get.nameList(player)[0], lists = typeof names == "string" ? player.xjzh_qishuyaojians ? player.xjzh_qishuyaojians.get(names) : [] : [];
    if (!player.node.xjzh_equipQishus) {
        const style = {
            right: "17%",
            top: '62%',
            width: '26%',
            height: '18%',
            zIndex: '100',
            overflowX: 'visible',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            cursor: 'pointer',
            margin: '5px',
            position: 'relative',
            backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/qishuAnniu.png')",
            backgroundSize: '70%',
        }
        let newDecadeStyle;
        if (game.hasExtensionLoaded("十周年UI")) {

            newDecadeStyle = game.getExtensionConfig("十周年UI", "newDecadeStyle");

            switch (newDecadeStyle) {
                case "on":
                    style.right = "17%";
                    style.top = "62%";
                    break;
                case "off":
                    style.right = "-74%";
                    style.top = "80.5%";
                    break;
                case "othersOn":
                    style.right = "-74%";
                    style.top = "80.5%";
                    break;
                case "onlineUI":
                    style.right = "-84%";
                    style.top = "85%";
                    break;
                case "othersOff":
                    style.right = "12%";
                    style.top = "77.5%";
                    break;
                case "babysha":
                    style.right = "10%";
                    style.top = "82%";
                    break;
                default:
                    style.right = "17%";
                    style.top = "62%";
            }
        }
        else {
            newDecadeStyle = lib.config.layout;
            let playerHeight;
            switch (newDecadeStyle) {
                case "newlayout":
                    style.right = "8%";
                    style.top = "81.5%";
                    style.backgroundSize = "50%";
                    break;
                case "mobile":
                    style.right = "12.5%";
                    style.top = "-23%";
                    style.backgroundSize = "6%";
                    break;
                case "long":
                    style.right = "12.5%";
                    style.top = "-23%";
                    style.backgroundSize = "6%";
                    break;
                case "long2":
                    playerHeight = lib.config.player_height;
                    if (playerHeight == "short") {
                        style.right = "17%";
                        style.top = "81%";
                    }
                    else if (playerHeight == "default") {
                        style.right = "17%";
                        style.top = "81.5%";
                    }
                    else {
                        style.right = "17%";
                        style.top = "82.5%";
                    }
                    break;
                case "nova":
                    playerHeight = lib.config.player_height_nova;
                    style.backgroundSize = "55%";
                    if (playerHeight == "short") {
                        style.right = "17%";
                        style.top = "81%";
                    }
                    else if (playerHeight == "default") {
                        style.right = "17%";
                        style.top = "81.5%";
                    }
                    else {
                        style.right = "17%";
                        style.top = "82.5%";
                    }
                    break;
                default:
                    style.right = "17%";
                    style.top = "62%";
            }

        }
        const equips = ui.create.div(player, style);
        equips.owner = player;
        player.node.xjzh_equipQishus = equips;

        const updateQishu = function (...args) {

            let list, name;
            for (let arg of args) {
                if (Array.isArray(arg)) list = arg;
                else if (typeof arg === 'string') name = arg;
            }

            if (!name || !Array.isArray(list)) {
                console.error('Invalid parameters for updateQishu');
                return;
            }

            const blank = ui.create.div(ui.window, {
                zIndex: '200',
                top: '0', left: '0',
                width: '100%', height: '100%',
            });
            const setSize = function () {
                windowElement.style.height = blank.clientWidth * 0.28 + 'px';
                windowElement.style.fontSize = blank.clientWidth * 0.6 + 'px';
            };
            const resize = function () {
                setTimeout(setSize, 500);
            };

            lib.onresize.push(resize);

            const removeBlank = function () { blank.remove(); lib.onresize.remove(resize); };

            //blank.listen(removeBlank);

            const windowElement = ui.create.div(blank, {
                left: '20%', width: '60%',
                top: '20%', height: blank.clientWidth * 0.28 + 'px',
                fontSize: blank.clientWidth * 0.6 + 'px',
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/userInfo.png')",
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
                pointerEvents: 'auto'
            });
            //退出按钮
            const eixtAnniu = ui.create.div(windowElement, {
                left: '85%', width: '20%',
                top: '10%', height: '20%',
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/exit2.png')",
                backgroundSize: '30%', backgroundRepeat: 'no-repeat'
            });
            eixtAnniu.listen(removeBlank);
            //window.listen(removeBlank);
            //角色图片
            var playerImage = ui.create.div(windowElement, {
                bottom: '11%', left: '10%',
                height: '68%', width: '23%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
                borderRadius: '20px'
            });
            playerImage.setBackground(name, 'character');
            if (get.nameList(player).length > 1) {
                var switchAnniu = ui.create.div(playerImage, {
                    top: '82%', left: '6%',
                    height: '68%', width: '23%',
                    backgroundSize: '100%', backgroundRepeat: 'no-repeat',
                    borderRadius: '20px',
                    backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/switchAnniu.png')",
                });
                switchAnniu.listen(function () {
                    removeBlank();
                    names = names == get.nameList(player)[0] ? get.nameList(player)[1] : get.nameList(player)[0], lists = typeof names == "string" ? player.xjzh_qishuyaojians.get(names) || [] : [];
                    updateQishu(names, lists);
                })
            }
            //文字窗口
            var text = ui.create.div(windowElement, {
                top: '25%', left: '40%',
                height: '10%', width: '45%',
                color: 'black',
                textAlign: 'center',
                fontSize: '4%', fontFamily: 'xinwei'
            })
            text.innerHTML = get.translation(name) + '已装备奇术要件';

            //奇术要件信息
            var intro = ui.create.div(blank, {
                zIndex: '51',
                width: '300px',
                textAlign: 'left',
                backgroundColor: '#412812',
                transition: 'left 0s,top 0s'
            });
            //奇术要件展示
            let equipPart1 = ui.create.div(windowElement, {
                left: "37%", top: '42%',
                width: '17%', height: '47%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
            });
            let equip1 = list[0];
            equipPart1.item = equip1;
            equipPart1.identifier = equip1;
            if (equip1) equipPart1.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cards/" + equip1 + ".png')";
            var equipPart2 = ui.create.div(windowElement, {
                left: "55%", top: '42%',
                width: '17%', height: '47%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
            });
            let runeEuips1 = get.xjzh_runeQishuList(equip1);
            if (runeEuips1.length) {
                let ritual = runeEuips1.find(item => get.xjzh_runeType(item) == 'ritual');
                let pray = runeEuips1.find(item => get.xjzh_runeType(item) == 'pray');
                if (ritual) {
                    ui.create.div(equipPart1, {
                        top: '10%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunes.png')`,
                    });
                }
                if (pray) {
                    ui.create.div(equipPart1, {
                        top: '50%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunes.png')`,
                    });
                }
            };
            var equip2 = list[1];
            equipPart2.item = equip2;
            equipPart2.identifier = equip2;
            if (equip2) equipPart2.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cards/" + equip2 + ".png')";
            let runeEuips2 = get.xjzh_runeQishuList(equip2);
            if (runeEuips2.length) {
                let ritual = runeEuips2.find(item => get.xjzh_runeType(item) == 'ritual');
                let pray = runeEuips2.find(item => get.xjzh_runeType(item) == 'pray');
                if (ritual) {
                    ui.create.div(equipPart2, {
                        top: '10%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunes.png')`,
                    });
                }
                if (pray) {
                    ui.create.div(equipPart2, {
                        top: '50%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunes.png')`,
                    });
                }
            };
            var equipPart3 = ui.create.div(windowElement, {
                left: "73%", top: '42%',
                width: '17%', height: '47%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
            });
            var equip3 = list[2];
            equipPart3.item = equip3;
            equipPart3.identifier = equip3;
            if (equip3) equipPart3.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cards/" + equip3 + ".png')";
            let runeEuips3 = get.xjzh_runeQishuList(equip3);
            if (runeEuips3.length) {
                let ritual = runeEuips3.find(item => get.xjzh_runeType(item) == 'ritual');
                let pray = runeEuips3.find(item => get.xjzh_runeType(item) == 'pray');
                if (ritual) {
                    ui.create.div(equipPart3, {
                        top: '10%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunes.png')`,
                    });
                }
                if (pray) {
                    ui.create.div(equipPart3, {
                        top: '50%', height: '35%',
                        left: '35%', width: '35%',
                        overflow: 'hidden',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunes.png')`,
                    });
                }
            };

            var updateIntro = function (obj) {
                obj.onmouseover = function (event) {
                    var itemInfo = get.xjzh_equipInfo(this.item);
                    if (!itemInfo || !Reflect.ownKeys(itemInfo).length) return;
                    let runesList = get.xjzh_runeQishuList(this.item);
                    var str = '';
                    if (this.item == "xjzh_qishu_bubaiwangzhe") {
                        str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                            + itemInfo.translate + '</span><br>';
                        str += itemInfo.translate_info + '</span>';
                        if (get.xjzh_runeQishuList(this.item).filter(item => get.xjzh_runeType(item) == 'ritual').length) str += '<br><br>已装备仪式符文数量：' + get.xjzh_runeQishuList(this.item).filter(item => get.xjzh_runeType(item) == 'ritual').length + '</span>';

                        if (get.xjzh_runeQishuList(this.item).filter(item => get.xjzh_runeType(item) == 'pray').length) str += '<br><br>已装备祷告符文数量：' + get.xjzh_runeQishuList(this.item).filter(item => get.xjzh_runeType(item) == 'pray').length + '</span>';
                    }
                    else {
                        str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                            + itemInfo.translate + '</span><br>';
                        str += itemInfo.translate_info + '</span>';
                        if (runesList) {
                            for (let i of runesList) {
                                str += '<br><br><span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                                    + get.xjzh_runeTranslate(i, get.xjzh_runeType(i)) + '（' + get.xjzh_runeTypeTranslate(i) + '）</span><br>';
                                str += get.xjzh_runeTranslateInfo(i, get.xjzh_runeType(i)) + '</span>';
                            }
                        }
                    }
                    intro.innerHTML = str;
                    blank.appendChild(intro);
                    intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                    intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                    intro.show();
                };
                obj.onmousemove = function (event) {
                    intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                    intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                };
                obj.onmouseout = function () {
                    intro.hide();
                };
            };
            updateIntro(equipPart1);
            updateIntro(equipPart2);
            updateIntro(equipPart3);
        }

        equips.listen(function () {
            let player = this.owner;
            if (!(player.xjzh_qishuyaojians instanceof Map)) return;
            lists = typeof names == "string" ? player.xjzh_qishuyaojians.get(names) || [] : [];
            console.log(lists)
            updateQishu(names, lists);
        });
    }
});
