import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';

export const buffMap = {
    ///增益
    "qianggu": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_qianggu.png>`,
        intro: {
            name: "强固",
            content: "「<font color=yellow>生命固有</font>」<br><li>自然衰减：<b>是</b> 上限：角色体力上限<br><li>当你的强固体力值不小于你的体力值时，你有20%几率防止伤害，强固的体力值不能超过体力上限。",
        },
        trigger: {
            player: ["damageBegin1"],
        },
        silent: true,
        priority: 3,
        filter(event, player) {
            let num = get.xjzh_buffNum(player, "qianggu");
            if (num >= player.hp) return Math.random() <= 0.2;
            return false;
        },
        async content(event, trigger, player) {
            trigger.cancel(null, null, 'notrigger');
        },
        ai: {
            effect: {
                target(card, player, target) {
                    if (!target.hasFriend()) return;
                    if (get.is.damageCard(card)) {
                        let num = get.xjzh_buffNum(player, "qianggu");
                        if (num >= player.hp) return [0.2, 0.2]
                    }
                },
            },
        },
        buffInfo: {
            naturalLose: true,
            get limit() {
                let player = get.player();
                return player.maxHp;
            },
        },
    },


    ///减益
    "zhongdu": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_zhongdu.png>`,
        intro: {
            name: "中毒",
            content: "「<font color=yellow>毒素缠身</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>使用牌有30%几率失效并受到1点无来源毒属性伤害，然后移除一层中毒；每层中毒使该几率提高10%",
        },
        trigger: {
            player: ["useCard"],
        },
        silent: true,
        priority: 3,
        filter(event, player) {
            if (get.xjzh_buffNum(player, "zhongdu") == 0) return false;
            return true;
        },
        async content(event, trigger, player) {
            let num = get.xjzh_buffNum(player, "zhongdu") * 0.1, bool = false;
            if (Math.random() <= 0.3 * (num + 1)) {
                trigger.cancel(null, null, 'notrigger');
                player.damage(1, 'nocard', 'nosource', 'poison');
                player.xjzh_changeBuff("zhongdu", -1);
            }
        },
        buffInfo: {
            naturalLose: true,
            deBuff: true,
            limit: 3,
        }
    },
    "binghuan": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_binghuan.png>`,
        intro: {
            name: "冰缓",
            content: "「<font color=yellow>冰霜缓速</font>」<br><li>自然衰减：<b>是</b> 上限：1<br><li>你的出牌时间基数改为10秒，每有一层冰缓，该时间减少50%(乘算)",
        },
        trigger: {
            player: ["phaseUseBegin", "xjzh_changeBuffEnd"],
        },
        silent: true,
        priority: 3,
        filter: function (event, player) {
            if (get.xjzh_buffNum(player, "binghuan") == 0) return false;
            if (event.player.isMad()) return false;
            //return get.xjzh_buffName(event.buff,false)=='binghuan'&&event.naturalLose==true;
            return true;
        },
        async content(event, trigger, player) {
            if (trigger.name == "phaseUse" || trigger.name == "xjzh_changeBuff") {
                let num = get.xjzh_buffNum(player, "binghuan"), time = 10;
                do {
                    num--;
                    time *= 0.5;
                } while (num > 0);
                game.broadcastAll(player => {
                    player.forceCountChoose = { phaseUse: time };
                }, player);
                player.addSkill(['xjzh_buff_binghuan_use', 'xjzh_buff_binghuan_cancel']);
            }
        },
        subSkill: {
            use: {
                trigger: { player: 'useCard' },
                charlotte: true,
                silent: true,
                popup: false,
                filter(event, player) {
                    if (!player.forceCountChoose || !player.forceCountChoose.phaseUse) {
                        return false;
                    }
                    return true;
                },
                async content(event, trigger, player) {
                    let num = get.xjzh_buffNum(player, "binghuan"), time = 1;
                    switch (lib.config.game_speed) {
                        case "vslow":
                            time *= 2.5;
                            break;
                        case "slow":
                            time *= 1.5;
                            break;
                        case "fast":
                            time *= 0.7;
                            break;
                        case "vfast":
                            time *= 0.4;
                            break;
                        case "vvfast":
                            time *= 0.2;
                            break;
                    }
                    do {
                        num--;
                        time *= 1.5;
                    } while (num > 0);
                    if (player.forceCountChoose.phaseUse <= 1) {
                        let evt = event.getParent('phaseUse');
                        if (evt) evt.skipped = true;
                    } else {
                        game.broadcastAll(player => {
                            player.forceCountChoose.phaseUse -= 1 + Math.round(time);
                        }, player);
                    }
                },
            },
            cancel: {
                trigger: { player: 'phaseUseEnd' },
                priority: 50,
                silent: true,
                charlotte: true,
                async content(event, trigger, player) {
                    game.broadcastAll(player => {
                        delete player.forceCountChoose;
                    }, player);
                    //ui.auto.show();
                    player.removeSkill('xjzh_buff_binghuan_use');
                    player.removeSkill('xjzh_buff_binghuan_cancel');
                }
            }
        },
        buffInfo: {
            naturalLose: true,
            deBuff: true,
            limit: 1,
        }
    },
    "gandian": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_gandian.png>`,
        intro: {
            name: "感电",
            content: "「<font color=yellow>雷电衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>任意角色对你造成伤害有每层20%几率+1",
        },
        trigger: {
            player: ["damageBegin"],
        },
        silent: true,
        priority: 3,
        filter (event, player) {
            let num = get.xjzh_buffNum(player, "gandian");
            if (num == 0) return false;
            //return get.xjzh_buffName(event.buff,false)=='binghuan'&&event.naturalLose==true;
            return Math.random() <= num * 0.2;
        },
        content: function () {
            trigger.num++
        },
        buffInfo: {
            naturalLose: true,
            limit: 3,
            deBuff: true,
        }
    },
    "ranshao": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_ranshao.png>`,
        intro: {
            name: "燃烧",
            content: "「<font color=yellow>火焰衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>基于你所受到的火焰伤害令你额外受到火焰伤害，每当buff衰减时，受到一点无来源火焰伤害",
        },
        trigger: {
            player: ["damageAfter"],
        },
        silent: true,
        priority: 3,
        group: ["xjzh_buff_ranshao_shuaijian"],
        filter (event, player) {
            let num = get.xjzh_buffNum(player, "ranshao");
            if (num == 0) return false;
            //return get.xjzh_buffName(event.buff,false)=='binghuan'&&event.naturalLose==true;
            if (event.getParent("xjzh_buff_ranshao").name == "xjzh_buff_ranshao") return false;
            if (event.getParent("xjzh_buff_ranshao_shuaijian").name == "xjzh_buff_ranshao_shuaijian") return false;
            return event.num > 0;
        },
        content: function () {
            var num = get.xjzh_buffNum(player, "ranshao")
            player.damage(Math.floor(num * 1.3 * trigger.num), trigger.source, 'fire', 'nocard');
        },
        subSkill: {
            "shuaijian": {
                trigger: {
                    player: "xjzh_changeBuffBegin1",
                },
                direct: true,
                sub: true,
                filter (event, player) {
                    let num = get.xjzh_buffNum(player, "ranshao");
                    if (num == 0) return false;
                    return event.num < 0;
                },
                content: function () {
                    player.damage(1, 'fire', 'nocard', 'nosource');
                },
            },
        },
        buffInfo: {
            naturalLose: true,
            deBuff: true,
            limit: 3
        },
    },
    "bingdong": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_bingdong.png>`,
        intro: {
            name: "冰冻",
            content: "「<font color=yellow>冰霜衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：1<br><li>当你获得此buff时，弃置所有牌，然后直到此buff移除，你无法使用或打出牌",
        },
        trigger: {
            player: ["xjzh_changeBuffAfter"],
        },
        silent: true,
        priority: 3,
        mod: {
            cardEnabled: function (card, player) {
                if (get.xjzh_buffNum(player, "bingdong") >= 0) return false;
            },
            cardEnabled2: function (card, player) {
                if (get.xjzh_buffNum(player, "bingdong") >= 0) return false;
            },
            cardRespondable: function (card, player) {
                if (get.xjzh_buffNum(player, "bingdong") > 0) return false;
            },
        },
        filter (event, player) {
            if (event.num <= 0) return false;
            return player.countCards('hej');
        },
        content: function () {
            player.discard(player.getCards('hej'));
        },
        buffInfo: {
            naturalLose: true,
            limit: 1,
            deBuff: true,
        },
    },
    "mumang": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_mumang.png>`,
        intro: {
            name: "目盲",
            content: "「<font color=yellow>视力衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>你使用牌有每层30%几率改为随机目标",
        },
        trigger: {
            player: "useCardToPlayer",
        },
        silent: true,
        priority: 3,
        filter(event, player) {
            var num = get.xjzh_buffNum(player, 'mumang');
            if (!event.isFirstTarget) return false;
            if (!event.target || !event.targets) return false;
            if (!event.cards || !event.cards.length) return false;
            return Math.random() <= num * 3 / 10;
        },
        content: function () {
            var type = get.type(trigger.card);
            if (type == "delay") {
                var targets = game.filterPlayer(function (current) {
                    return !current.countCards('j', function (card) {
                        return get.name(trigger.card) == get.name(card);
                    });
                }).randomGet();
            } else {
                var targets = game.players.randomGet();
            }
            trigger.targets.remove(trigger.target);
            trigger.targets.push(targets);
            game.log(player, "因", "#y目盲", "影响", trigger.card, "的目标指向了", targets);
        },
        buffInfo: {
            naturalLose: true,
            limit: 3,
            deBuff: true,
        },
    },
    "yishang": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_yishang.png>`,
        intro: {
            name: "易伤",
            content: "「<font color=yellow>衰弱体质</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>受到伤害有30%乘层数几率加层数点伤害",
        },
        trigger: {
            player: "damageBegin",
        },
        silent: true,
        priority: 3,
        filter (event, player) {
            var num = get.xjzh_buffNum(player, 'yishang');
            if (event.cancelled || event.numFixed || num == 0) return false;
            return Math.random() <= num * 3 / 10;
        },
        content: function () {
            var numx = get.xjzh_buffNum(player, 'yishang');
            trigger.num += numx
            game.log(player, "因", "#y易伤", "影响", trigger.card, "造成的伤害+", numx);
        },
        buffInfo: {
            naturalLose: true,
            limit: 3,
            deBuff: true,
        },
    },
    "jiansu": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_jiansu.png>`,
        intro: {
            name: "减速",
            content: "「<font color=yellow>蹒跚而行</font>」<br><li>自然衰减：<b>是</b> 上限：4<br><li>你的攻击距离减少buff层数",
        },
        mod: {
            attackRange: function (from, to, distance) {
                var player = _status.event.player;
                var num = get.xjzh_buffNum(player, 'jiansu');
                return distance - num;
            }
        },
        buffInfo: {
            naturalLose: true,
            limit: 4,
            deBuff: true,
        },
    },
    "dingshen": {
        marktext: `<img style=width:20px src=${rootURL}extension/仙家之魂/image/buff/xjzh_icon_buff_dingshen.png>`,
        intro: {
            name: "定身",
            content: "「<font color=yellow>寸步难行</font>」<br><li>自然衰减：<b>是</b> 上限：4<br><li>你计算与其他角色距离增加buff层数",
        },
        mod: {
            globalFrom (from, to, distance) {
                var player = _status.event.player;
                var num = get.xjzh_buffNum(player, 'dingshen');
                return distance + num;
            }
        },
        buffInfo: {
            naturalLose: true,
            limit: 4,
            deBuff: true,
        },
    },

};

/**
 * 将buff注册到lib.skill中
 */
{
    const buffList = Object.keys(buffMap);
    for (let name of buffList) {
        const buff = buffMap[name];
        const buffName = 'xjzh_buff_' + name;

        if (typeof buff.intro.content === 'string') {
            const contentStr = buff.intro.content;
            buff.intro.content = () => contentStr;
        }

        lib.skill[buffName] = buff;
        lib.translate[buffName] = buff.intro.name;
        lib.translate[buffName + '_name'] = buff.intro.name;

        const content = typeof buff.intro.content === 'function' ? buff.intro.content() : buff.intro.content;
        lib.translate[buffName + '_name_info'] = content;
    }
};


//增益buff
lib.xjzh_Buff = [
    "qianggu"
];

//减益buff
lib.xjzh_Debuff = [
    "binghuan",
    "gandian",
    "ranshao",
    "bingdong",
    "mumang",
    "yishang",
    "jiansu",
    "dingshen",
    "zhongdu"
];

