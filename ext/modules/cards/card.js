import { lib, game, ui, get, ai, _status } from "../../../../../noname.js";
import { xjzhMathList } from '../mathList/index.js';

const cards = {
    //--------------------基本牌-------------------
    "xjzh_card_zhishijingsai": {
        audio: "ext:仙家之魂/audio/card/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_zhishijingsai.png",
        fullskin: true,
        type: "basic",
        toself: true,
        cardnature: "red",
        enable(event, player) {
            return true;
        },
        selectTarget: -1,
        filterTarget(card, player, target) {
            return target == player;
        },
        /*async contentBefore(event, trigger, player) {
            let name=get.translation(get.name(event.card,player));
            game.xjzh_playSkillAudio(name);
        },*/
        async content(event, trigger, player) {
            let questionNum = 0;
            let correctNum = 0;
            let questionsNum = get.xjzh_rands(1, Object.keys(xjzhMathList).length, 5);
            let questionBank = structuredClone(xjzhMathList);
            while (questionsNum.length) {
                let questionNumber = questionsNum.shift();
                let question = questionBank[questionNumber]["question"];
                let answerNum = questionBank[questionNumber]['answer'];
                let option = questionBank[questionNumber]["option"];
                let randomOption = structuredClone(option).randomSort();
                let dialog = ui.create.dialog(`【知识竞赛】：请选择正确答案${Array.isArray(answerNum) ? `（多选题，限选${answerNum.length}项）` : `（单选题）`}`, 'hidden');
                dialog.addText(`${questionNum + 1}、试题：${question}<br><br>`);
                dialog.add([randomOption, 'textbutton']);
                dialog.buttons.forEach(button => {
                    button.style.width = '50%';
                    button.style.display = 'inline-block';
                    button.style.textAlign = 'left';
                });
                const result = await player.chooseButton(dialog, Array.isArray(answerNum) ? answerNum.length : 1)
                    .set('ai', button => Math.random())
                    .forResult();
                if (result?.links) {
                    let links = result.links;
                    let answerBumber = 0;
                    let str = "正确答案是：";
                    if (Array.isArray(answerNum)) {
                        for await (let answers of answerNum) {
                            let answer = option[answers];
                            if (links.includes(answer)) answerBumber++;
                            str += `${answer}${answerNum.indexOf(answers) != answerNum.length - 1 ? "、" : ""}`;
                        }
                        if (answerBumber == answerNum.length) correctNum++;
                    } else {
                        let answer = option[answerNum];
                        if (links[0] == answer) {
                            correctNum++;
                            answerBumber++;
                        } else {
                            str += answer;
                        }
                    }
                    if (Array.isArray(answerNum) ? answerBumber != answerNum.length : answerBumber == 0) {
                        dialog = ui.create.dialog(`【知识竞赛】：请选择正确答案${Array.isArray(answerNum) ? `（多选题，限选${answerNum.length}项）` : `（单选题）`}`, 'hidden');
                        dialog.addText(`${questionNum + 1}、试题：${question}<br><br>`);
                        dialog.add([option, 'textbutton']);
                        dialog.addText("很遗憾，你答错了!");
                        dialog.addText(str);
                        dialog.buttons.forEach(button => {
                            button.style.width = '50%';
                            button.style.display = 'inline-block';
                            button.style.textAlign = 'left';
                        });
                        player.chooseControl("ok").set('dialog', dialog);
                    }
                }
                questionNum++;
            }
            game.log(player, "答对", correctNum, "道题，答错", 5 - correctNum, "道题");
            switch (correctNum) {
                case 0:
                    player.damage(1, 'nocard', 'nosource');
                    player.chooseToDiscard(1, 'he', true);
                    break;
                case 1:
                    player.chooseToDiscard(1, 'he', true);
                    break;
                case 2:
                    player.draw();
                    break;
                case 3:
                    player.draw(2);
                    break;
                case 4:
                    player.draw(3);
                    player.recover();
                    break;
                case 5:
                    player.draw(3);
                    player.recover();
                    let listEquip = [
                        'equip1',
                        'equip2',
                        'equip3',
                        'equip4',
                        'equip5',
                    ];
                    while (listEquip.length) {
                        let pos = listEquip.shift();
                        if (player.hasEmptySlot(pos)) {
                            let equip = get.cardPile(function (card) {
                                return get.type(card) == 'equip' && get.subtype(card) == pos;
                            });
                            if (equip) {
                                player.equip(equip);
                                player.$gain2(equip, false);
                            };
                        };
                    };
                    break;
            }
        },
        ai: {
            basic: {
                order: 7.2,
                useful: 4.5,
                value: 9.2
            },
            result: {
                target: 2,
            },
            tag: {
                draw: 2,
            }
        },
    },
    "xjzh_card_mingyunyingbi": {
        audio: "ext:仙家之魂/audio/card/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_mingyunyingbi.png",
        fullskin: true,
        type: "basic",
        toself: true,
        enable: true,
        selectTarget: -1,
        cardnature: "thunder",
        cardcolor: "black",
        filterTarget: (card, player, target) => target == player,
        async content(event, trigger, player) {
            let target = event.target, card = event.card;
            if (Math.random() <= 0.5) {
                if (target.isHealthy()) game.log(target, '使用了', '#y【' + get.translation(card) + '】', '无事发生');
                else target.recoverTo(target.maxHp);
            } else {
                let num = target.getHp(true) - 1;
                if (num <= 1) {
                    game.log(target, '使用了', '#y【' + get.translation(card) + '】', '无事发生');
                    return;
                }
                target.damage(num, 'thunder', 'nocard', 'nosource', 'notrigger');
            }
        },
        ai: {
            basic: {
                useful(card, i) {
                    if (get.player().hp > 1) {
                        if (i === 0) return 0;
                        return 1;
                    }
                    if (i === 0) return 7.3;
                    return 10;
                },
                value(card, player) {
                    if (player.isHealthy()) return 0;
                    if (player.getHp(true) == 1) return 10;
                    return 0.5;
                },
            },
            order: 0.2,
            result: {
                player(player, target, card) {
                    if (player.isHealthy()) return 0;
                    if (player.getHp(true) == 1) return 10;
                    return 0.5;
                },
            },
            tag: {
                recover: 1,
                damage: 1,
                natureDamage: 1,
            },
        },
    },
    //--------------------延时锦囊牌----------------
    //--------------------非延时锦囊牌-------------
    "xjzh_card_cuimaidan": {
        audio: "ext:仙家之魂/audio/card/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_cuimaidan.png",
        fullskin: true,
        type: 'xjzh_danyao',
        enable: true,
        modTarget: true,
        vanish: true,
        cardcolor: "black",
        range: { global: 1 },
        filterTarget: lib.filter.notMe,
        loseDelay: false,
        selectTarget: 1,
        async content(event, trigger, player) {
            let skills = game.xjzh_addRandomSkill(null, false, false)[1];
            let target = event.targets[0], list = target.getSkills(null, false, false).filter(skill => {
                return skills.includes(skill);
            }), dialog;
            if (list.length) {
                if (event.isMine()) {
                    dialog = ui.create.dialog('forcebutton', 'hidden');
                    dialog.add('请选择移除一项技能');
                    for (let i = 0; i < list.length; i++) {
                        if (lib.translate[list[i] + '_info']) {
                            let translation = get.translation(list[i]);
                            if (translation[0] == '新' && translation.length == 3) {
                                translation = translation.slice(1, 3);
                            }
                            else {
                                translation = translation.slice(0, 2);
                            }
                            let item = dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">【' + translation + '】</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
                            item.firstChild.link = list[i];
                        }
                    }
                }
                const result = await target.chooseControl(list, 'cancel2')
                    .set('prompt', '【摧脉丹】：请选择移除一个技能').set('ai', () => {
                        if (target.hp >= Math.floor(target.maxHp / 2)) return 'cancel2';
                        return get.min(list, get.skillRank, 'item');
                    })
                    .set('dialog', dialog)
                    .forResult();
                if (result?.control) result.control == "cancel2" ? target.loseHp() : target.removeSkills(result.control);
            } else target.loseHp();
        },
        ai: {
            basic: {
                order: 8,
                useful: [4.5, 3.5, 2],
                value: [6.5, 4.5, 1],
            },
            result: {
                target(player, target) {
                    if (target.hasSkill("xjzh_qishu_materialRemove")) return 10;
                    let skills = game.xjzh_addRandomSkill(null, false, false)[1];
                    let list = target.getSkills(null, false, false).filter(skill => {
                        return skills.includes(skill);
                    });
                    if (list.length > 0) return -3;
                    return -1;
                },
            },
            tag: {
                loseHp: 1,
            }
        },
    },
    //--------------------装备牌-------------------
    //武器

    //防具
    //熔岩铠甲
    "xjzh_card_rongyankaijia": {
        fullskin: true,
        type: 'equip',
        subtype: 'equip2',
        cardcolor: "red",
        cardnature: "fire",
        audio: "ext:仙家之魂/skillaudio/equip/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_rongyankaijia.png",
        async onLose() {
            let player = get.player();
            if (player.storage.xjzh_card_rongyankaijia_skill && player.storage.xjzh_card_rongyankaijia_skill.length) {
                let storage = player.storage.xjzh_card_rongyankaijia_skill.slice(0);
                for (let damageList of storage) {
                    if (player.isDead()) break;
                    player.damage(...(damageList.slice(0)));
                }
                delete player.storage.xjzh_card_rongyankaijia_skill;
                player.unmarkSkill("xjzh_card_rongyankaijia_skill2");
            }
        },
        skills: ["xjzh_card_rongyankaijia_skill"],
        ai: {
            value(card, player, index, method) {
                if (player.isDisabled(2)) return 0.01;
                if (card == player.getEquip(2)) {
                    if (player.hasSkillTag('nodamage')) return 0;
                    if (player.hasSkillTag('nofire')) return 0.5;
                    return 6;
                }
            },
            equipValue: function (card, player) {
                let num = 0
                if (player.hasSkillTag('maixie') && player.hp > 1) return 0;
                if (player.hasSkillTag('maixie_hp') && player.hp > 1) return 0;
                if (player.hp == 1) num += 5;
                if (player.hp == 2) num += 3;
                return num;
            },
            basic: {
                equipValue: 6.5
            },
        },
    },
    //防御马
    //驽马
    "xjzh_card_numa": {
        audio: "ext:仙家之魂/skillaudio/equip/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_numa.png",
        fullskin: true,
        type: 'equip',
        subtype: 'equip3',
        cardcolor: "black",
        filterTarget: function (card, player, target) {
            return target.canEquip(card, true);
        },
        selectTarget: 1,
        distance: { globalTo: -1 },
        ai: {
            order: 9,
            value: function (card, player) {
                if (!player.countCards('j')) return 0;
                if (player.getEquip(3) == card) return 0;
                return -1;
            },
            equipValue: function (card, player) {
                if (player.getCards('e').includes(card)) return 0;
                if (!player.countCards("j")) return 0;
                return -1;
            },
            basic: {
                equipValue: 2,
            },
            result: {
                target: function (player, target, card) {
                    var cards = target.getCards('e');
                    if (!target.getEquip(3)) return 0;
                    if (cards.includes(card)) return 0;
                    return -1;
                },
            },
        },
    },
    //宝物
    //意志呼唤
    "xjzh_card_yizhihuhuan": {
        audio: "ext:仙家之魂/skillaudio/equip/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_yizhihuhuan.png",
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        forceDie: true,
        nomod: true,
        clearLose: true,
        equipDelay: false,
        loseDelay: false,
        cardcolor: "black",
        cardnature: "thunder",
        onLose: function () {
            if (player.storage.xjzh_card_yizhihuhuan_skill) delete player.storage.xjzh_card_yizhihuhuan_skill
        },
        skills: ['xjzh_card_yizhihuhuan_skill'],
        ai: {
            order: 12,
            value: 5.2,
            useful: 3,
            equipValue: 5.2,
            basic: {
                equipValue: 5.2
            },
        },
    },
    //卡德兰之触
    "xjzh_card_kadelanzhichu": {
        audio: "ext:仙家之魂/skillaudio/equip/",
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_kadelanzhichu.png",
        fullskin: true,
        type: 'equip',
        subtype: 'equip5',
        forceDie: true,
        clearLose: true,
        equipDelay: false,
        cardcolor: "red",
        onEquip(player, card) {
            let allowedSubtypes = ["equip1", "equip2", "equip5"];
            let excludedNames = ["jydiybiaoche", "muniu"];
            let cardsPool = lib.inpile.filter(candidate => {
                if (!allowedSubtypes.includes(get.subtype(candidate))) return false;
                if (excludedNames.includes(get.name(candidate))) return false;
                if (player.countCards('e') && player.getCards("e").some(item => get.name(item) == get.name(candidate))) return false;
                return true;
            });

            // 空值检查，防止崩溃
            if (!cardsPool.length) return;
            let cardx = cardsPool.randomGet();
            let skills = lib.card[cardx].skills || [];

            let ecard = card;
            let origin_name = ecard.name;
            let name = ecard.name + '_kadelanzhichu';

            // 防止重复注册
            if (!lib.card[name]) {
                lib.card[name] = get.copy(get.info(ecard));
                lib.translate[name + '_info'] = "<li>当前反射装备<span style=\"color: red\">" + get.translation(cardx) + "</span>：" + lib.translate[cardx + "_info"] + "<br><br>" + lib.translate[ecard.name + '_info'];
                lib.translate[name] = lib.translate[ecard.name];
            }

            ecard.name = name;
            ecard.origin_name = origin_name;
            // 关键：不修改全局 lib.card，而是修改当前装备实例
            ecard.skills = skills;

            player.popup(cardx);
            game.log(card, "当前反射装备<span style=\"color: red\">" + get.translation(cardx) + "</span>")
        },
        onLose(player, card) {
            let ecard = card;
            let cleanedName = ecard.name;
            let originalName = ecard.origin_name;

            // 清理动态注册的全局配置，防止内存泄漏
            if (cleanedName && cleanedName.endsWith('_kadelanzhichu')) {
                delete lib.card[cleanedName];
                delete lib.translate[cleanedName];
                delete lib.translate[cleanedName + '_info'];
                // 如果存在对应的 skills 定义也需要清理（假设格式为 _skills）
                delete lib.card[cleanedName + '_skills'];
            }

            // 恢复卡牌名称
            ecard.name = originalName;
            delete ecard.origin_name;
        },
        skills: [],
        ai: {
            order: 6,
            value: 3,
            useful: 2.5,
            equipValue: 3.5,
            basic: {
                equipValue: 3.5
            },
        },
    },
    //-----------------------End-----------
};

if (game.getExtensionConfig("仙家之魂", "xjzh_cardBeautify") === true) {
    for (let i in cards) {
        let num = await game.promises.checkFile(`extension/仙家之魂/image/cardskins/${i}.png`);
        if (num !== 1) continue;
        cards[i].image = `ext:仙家之魂/image/cardskins/${i}.png`
        cards[i].fullskin = false;
        cards[i].fullimage = true;
    }
}

export default cards;