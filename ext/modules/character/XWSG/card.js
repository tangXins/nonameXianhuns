import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const cards = {
    "xjzh_zengyi_shuangsheng_card": {
        derivation: "xjzh_sanguo_zuoyou",
        fullskin: false,
        image: "ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
    },
    "xjzh_card_chunfenghuayu": {
        fullskin: true,
        audio: "ext:仙家之魂/audio/card/",
        derivation: "xjzh_sanguo_guanlu",
        type: "trick",
        enable: (event, player) => get.is.playerNames(player, 'xjzh_sanguo_guanlu'),
        cardcolor: 'red',
        selectTarget: 1,
        clearLose: true,
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
        filterTarget: (card, player, target) => !target.hasSkill('xjzh_card_chunfenghuayu_skill'),
        async content(event, trigger, player) {
            event.target.addSkill("xjzh_card_chunfenghuayu_skill");
        },
        ai: {
            basic: {
                order: 10,
                useful: 5,
                value: 10
            },
            result: {
                target(player, target) {
                    if (target.isMin()) return 0;
                    var att = get.attitude(player, target);
                    if (att >= 2) {
                        if (target.hp == 1) return att;
                        if (target.hp == 2 && target.countCards('he') <= 2) return att * 0.7;
                        return 0.5;
                    }
                    return 0;
                },
            },
        },
    },
    "xjzh_card_fanyunfuyu": {
        fullskin: true,
        audio: "ext:仙家之魂/audio/card/",
        derivation: "xjzh_sanguo_guanlu",
        type: "trick",
        cardcolor: 'black',
        notarget: true,
        nodelay: true,
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
        ai: {
            order: 8,
            basic: {
                useful: [7, 5.1, 2],
                value: [7, 5.1, 2],
            },
            tag: {
                damage: 1,
            },
        },
    },
    "xjzh_card_zhizuijinmi": {
        fullskin: true,
        audio: "ext:仙家之魂/audio/card/",
        derivation: "xjzh_sanguo_guanlu",
        type: "trick",
        enable: (event, player) => get.is.playerNames(player, 'xjzh_sanguo_guanlu'),
        cardcolor: 'black',
        selectTarget: 1,
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
        filterTarget: (card, player, target) => !target.hasSkill('xjzh_card_zhizuijinmi_skill'),
        async content(event, trigger, player) {
            let card = event.cards[0];
            let suits = get.suit(card);
            let target = event.target;
            if (suits == "none") suits = lib.suit.randomGet();
            target.storage.xjzh_card_zhizuijinmi_skill = suits;
            target.addSkill("xjzh_card_zhizuijinmi_skill");
        },
        ai: {
            basic: {
                order: 10,
                useful: 5,
                value: 10
            },
            result: {
                target: -2,
            },
        },
    },
    "xjzh_card_tanhuayixian": {
        fullskin: true,
        audio: "ext:仙家之魂/audio/card/",
        derivation: "xjzh_sanguo_guanlu",
        type: "trick",
        cardcolor: 'black',
        enable: (event, player) => get.is.playerNames(player, 'xjzh_sanguo_guanlu'),
        selectTarget: 1,
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
        filterTarget: (card, player, target) => target.isIn(),
        async content(event, trigger, player) {
            if (!player.isIn() || !event.target.isIn()) return;

            let cards = get.cards(5);
            game.cardsGotoOrdering(cards);
            player.showCards(cards);

            for await (let card of cards) {
                if (!player.isIn() || !event.target.isIn()) break;
                if (player.canUse(card, event.target, false, false)) player.useCard(card, event.target, false);

            }
            game.cardsDiscard(cards);
            game.updateRoundNumber();
        },
        ai: {
            order: 5,
            basic: {
                useful: 4,
                value: 3
            },
            result: {
                player: 2,
            },
            tag: {
                respond: 1,
                respondShan: 1,
                damage: 1,
            }
        },
    },
    "xjzh_card_shenjimiaosuan": {
        fullskin: true,
        audio: "ext:仙家之魂/audio/card/",
        derivation: "xjzh_sanguo_guanlu",
        type: "trick",
        enable: (event, player) => get.is.playerNames(player, 'xjzh_sanguo_guanlu'),
        selectTarget: -1,
        toself: true,
        cardcolor: 'red',
        filterTarget: function (card, player, target) {
            return target == player;
        },
        modTarget: true,
        image: "ext:仙家之魂/image/cardpicture/xjzh_card_guanlu.png",
        async content(event, trigger, player) {
            if (ui.cardPile.childNodes.length < 10) game.washCard();
            let cards = get.cards(5), bottomCards = get.bottomCards(5);
            game.cardsGotoOrdering(cards);
            game.cardsGotoOrdering(bottomCards);
            const result = await player.chooseToMove().set("list", [
                ["牌堆顶", cards],
                ["牌堆底", bottomCards]
            ]).set('filterMove', (from, to, moved) => {
                if (to == 0) return moved[0].length < 5;
                if (to == 1) return moved[1].length < 5;
                return typeof to != 'number';
            }).set("prompt", '【神机妙算〗：任意交换牌堆顶或牌堆底的牌').set("processAI", list => {
                let cards = list[0][1], player = get.player(), top = [], judges = player.getCards('j'), stopped = false;
                if (!player.hasWuxie()) {
                    for (let i = 0; i < judges.length; i++) {
                        let judge = get.judge(judges[i]);
                        cards.sort((a, b) => {
                            return judge(b) - judge(a);
                        });
                        if (judge(cards[0]) < 0) {
                            stopped = true; break;
                        }
                        else {
                            top.unshift(cards.shift());
                        }
                    }
                }
                let bottom;
                if (!stopped) {
                    cards.sort((a, b) => {
                        return get.value(b, player) - get.value(a, player);
                    });
                    while (cards.length) {
                        if (get.type(cards[0], 'trick') != 'trick') break;
                        top.unshift(cards.shift());
                    }
                }
                bottom = cards;
                return [top, bottom];
            }).forResult();
            if (result.bool) {
                console.log(result.moved);
                let top = result.moved[0], bottom = result.moved[1], tricks = [];
                top.reverse();
                for (let i = 0; i < top.length; i++) {
                    if (get.type(top[i], 'trick') == "trick") {
                        tricks.push(top[i]);
                        top.remove(top[i]);
                        continue;
                    }
                    ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                }
                for (let i = 0; i < bottom.length; i++) {
                    ui.cardPile.appendChild(bottom[i]);
                }
                player.gain(tricks, 'gain2', 'log', player);
            }
            game.updateRoundNumber();
            player.$fullscreenpop('神机妙算', 'fire');
        },
        ai: {
            basic: {
                order: 8,
                useful: 6.5,
                value: 12
            },
            result: {
                target: 2.5,
            },
            tag: {
                draw: 2,
            }
        },
    },
};

export default cards;