import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	"xjzh_huoying_fenshen": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:1",
		filterTarget(card, player, target) {
			return player.canCompare(target);
		},
		init(player) {
			if (!player.storage.xjzh_huoying_fenshen) player.storage.xjzh_huoying_fenshen = 1
		},
		selectTarget() {
			let player = get.player();
			let num = player.storage.xjzh_huoying_fenshen
			return [1, num];
		},
		filter(event, player) {
			return player.countCards('h') && !player.hasSkill('xjzh_huoying_fenshen_off');
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			player.chooseToCompare(event.targets).callback = () => {
				if (event.num1 > event.num2) {
					if (player.storage.xjzh_huoying_fenshen < 3) player.storage.xjzh_huoying_fenshen += 1
					player.chooseDrawRecover(1, 1, true, "〖分身〗：请选择摸两张牌或回复一点体力");
					let evt = event.getParent("phase");
					if (evt && evt.getParent && !evt.xjzh_huoying_fenshen) evt.xjzh_huoying_fenshen = true;
				} else {
					player.addTempSkill("xjzh_huoying_fenshen_off");
				}
			};
		},
		contentAfter() {
			let evt = event.getParent("phase");
			if (evt && evt.getParent && evt.xjzh_huoying_fenshen) {
				var next = game.createEvent('xjzh_huoying_fenshen_delete', false, evt.getParent());
				next.player = player;
				next.setContent(function () {
					if (player.storage.xjzh_huoying_fenshen) {
						player.storage.xjzh_huoying_fenshen = 1;
					}
				});
			}
		},
		ai: {
			order: 7,
			result: {
				target(player, target, card) {
					var hs = player.getCards('h');
					for (var i = 0; i < hs.length; i++) {
						if (get.value(hs[i]) <= 6) {
							if (get.number(hs[i]) >= 11) return -1;
						}
					}
					return -0.2;
				},
				player(player, target, card) {
					var hs = player.getCards('h');
					for (var i = 0; i < hs.length; i++) {
						if (get.value(hs[i]) <= 6) {
							if (get.number(hs[i]) >= 11) return 1;
						}
					}
					return 0.5;
				},
			},
		},
		subSkill: { "off": { sub: true, }, },
	},
	"xjzh_huoying_luoxuan": {
		enable: ["chooseToUse", "chooseToRespond"],
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:1",
		hiddenCard(player, name) {
			if ((get.type(name) != "trick")) return false;
			return player.countCards("hs") && lib.inpile.includes(name);
		},
		filter(event, player) {
			if (!player.countCards("hs")) return false;
			return get
				.inpileVCardList(info => {
					const name = info[2];
					if (get.type(name) != "trick") return false;
					return true;
				})
				.some(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));
		},
		chooseButton: {
			dialog(event, player) {
				const list = get
					.inpileVCardList(info => {
						const name = info[2];
						if (get.type(name) != "trick") return false;
						return true;
					})
					.filter(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));
				return ui.create.dialog('〖螺旋〗: 请选择你要使用的牌', 'hidden', [list, 'vcard']);
			},
			check(button) {
				let player = get.player();
				let recover = 0, lose = 1, players = game.filterPlayer();
				for (let i = 0; i < players.length; i++) {
					if (players[i].hp == 1 && get.damageEffect(players[i], player, player) > 0 && !players[i].hasSha()) {
						return (button.link[2] == 'juedou') ? 2 : -1;
					}
					if (!players[i].isOut()) {
						if (players[i].hp < players[i].maxHp) {
							if (get.attitude(player, players[i]) > 0) {
								if (players[i].hp < 2) {
									lose--;
									recover += 0.5;
								}
								lose--;
								recover++;
							}
							else if (get.attitude(player, players[i]) < 0) {
								if (players[i].hp < 2) {
									lose++;
									recover -= 0.5;
								}
								lose++;
								recover--;
							}
						}
						else {
							if (get.attitude(player, players[i]) > 0) {
								lose--;
							}
							else if (get.attitude(player, players[i]) < 0) {
								lose++;
							}
						}
					}
				}
				if (lose > recover && lose > 0) return (button.link[2] == 'nanman') ? 1 : -1;
				if (lose < recover && recover > 0) return (button.link[2] == 'taoyuan') ? 1 : -1;
				return (button.link[2] == 'wuzhong') ? 1 : -1;
			},
			backup(links, player) {
				return {
					filterCard: true,
					position: 'hes',
					selectCard: 1,
					popname: true,
					audio: "xjzh_huoying_luoxuan",
					viewAs: { name: links[0][2] },
					precontent() {
						player.say('这招是我自创的忍术——螺旋手里剑', '有话直说，这就是我的忍道');
					}
				}
			},
			prompt(links, player) {
				return '将一张牌当作' + get.translation(links[0][2]) + '使用';
			}
		},
		ai: {
			order: 6,
			threaten: 1.6,
			result: {
				player(player, target, card) {
					let num = 0;
					let cards = player.getCards('h');
					for (let i = 0; i < cards.length; i++) {
						num += Math.max(0, get.value(cards[i], player, 'raw'));
					}
					num /= cards.length;
					num *= Math.min(cards.length, player.hp);
					return 12 - num;
				}
			},
		}
	},
	/*"xjzh_huoying_xianshu":{
		trigger:{
			player:"loseEnd",
		},
		locked:true,
		frequent:true,
		init:function(player){
			if(!player.hasMark("xjzh_huoying_xianshu")){
				player.addMark('xjzh_huoying_xianshu',3,false);
				game.log(player,'获得了3个','#y仙术查克拉');
			}
			var xjzh_huoying_xianshu=setInterval(function(){
				if(player.countMark("xjzh_huoying_xianshu")<3){
					player.addMark('xjzh_huoying_xianshu',1,false);
					game.log(player,'获得了1个','#y仙术查克拉');
				}else{
					clearInterval(xjzh_huoying_xianshu);
					lib.skill.xjzh_huoying_xianshu.init(player);
				}
			},18000);
			var xjzh_huoying_xianshuClear=setInterval(function(){
				if(player.hasSkill("xjzh_huoying_dunshu")){
					clearInterval(xjzh_huoying_xianshu);
					clearInterval(xjzh_huoying_xianshuClear);
				}
			},1);
		},
		mark:true,
		marktext:"仙术",
		intro:{
			name:"仙术查克拉",
			content:"鸣人以影分身存储的仙术查克拉，目前有#个",
		},
		audio:"ext:仙家之魂/audio/skill:1",
		filter:function(event,player){
			if(!player.hasMark('xjzh_huoying_xianshu')) return false;
			if(player.countCards('h')) return false;
			for(var i=0;i<event.cards.length;i++){
				if(event.cards[i].original=='h') return true;
			}
			return false;
		},
		content:function(){
			player.removeMark('xjzh_huoying_xianshu',1,false);
			game.log(player,'消耗了1个','#y仙术查克拉');
			player.drawTo(player.maxHp);
		},
		ai:{
			threaten:0.8,
			effect:{
				target:function (card,player,target){
					if(target.countCards('h')==1&&(card.name=='guohe'||card.name=='shunshou')) return -player.maxHp;
				},
			},
			noh:true,
		},
	},*/
	"xjzh_huoying_zuidun": {
		trigger: {
			global: "dying",
		},
		frequent: false,
		locked: true,
		mark: true,
		marktext: "嘴",
		intro: {
			name: "嘴遁",
			content(storage, player) {
				let num = player.countMark("xjzh_huoying_zuidun");
				return `已发动${num}次`;
			},
		},
		mode: ["identity", "guozhan"],
		unique: true,
		filter(event, player) {
			return player.countMark("xjzh_huoying_zuidun") < 2 && player != game.zhu && event.player != game.zhu && event.player != player;
		},
		prompt(event, player) {
			return `嘴遁：是否令${get.translation(event.player)}改变${get.mode() == "guozhan" ? "势力" : "身份"}与你一致？`;
		},
		async content(event, trigger, player) {
			player.logSkill('xjzh_huoying_zuidun', trigger.player);
			player.addMark("xjzh_huoying_zuidun", 1, false);
			let list = [
				[1, `选项一：将所有牌交给漩涡鸣人，然后立即阵亡`],
				[2, `选项二：改变${get.mode() == "guozhan" ? "势力" : "身份"}与漩涡鸣人一致`]
			];
			const result = await trigger.player.chooseButton([`嘴遁：请选择一项`, [list, 'textbutton']], true)
				.set("ai", button => {
					let id = player.identity, num = game.countPlayer(current => current.identity == id), link = button.link;
					if (id == event.player.identity) return link == 2;
					if (num + 1 > game.players.length - num) return link == 2;
					return link == [1, 2].randomGet();
				})
				.forResult();
			if (result?.links) {
				switch (result.links[0]) {
					case 1: {
						player.gain(trigger.player.getCards('hej'), 'give', trigger.player);
						trigger.player.die().source = trigger.getParent().source;
						break;
					};
					case 2: {
						let id = player.identity;
						trigger.player.identity = id;
						trigger.player.setIdentity(id);
						trigger.player.identityShown = true;
						break;
					};
				}
			}
			if (trigger.player.isAlive()) {
				trigger.player.loseMaxHp();
				await trigger.player.recoverTo(trigger.player.maxHp);
				trigger.player.draw(trigger.player.getHp(true));
				player.draw(trigger.player.getHp(true));
			}
			if (player.countMark("xjzh_huoying_zuidun") >= 2) player.removeSkill("xjzh_huoying_zuidun", true);
		},
	},
	"xjzh_huoying_kaigua": {
		trigger: {
			player: "dying",
		},
		forced: true,
		locked: true,
		unique: true,
		mark: true,
		marktext: "挂",
		intro: {
			name: "开挂",
			content: "limited",
		},
		limited: true,
		skillAnimation: true,
		animationStr: '六道模式',
		animationColor: 'fire',
		juexingji: true,
		priority: 1,
		derivation: ["xjzh_huoying_luoxuan", "xjzh_huoying_dunshu", "xjzh_huoying_liudaofenshen"],
		async content(event, trigger, player) {
			player.maxHp = 3;
			player.update();
			player.recoverTo(3);
			player.discard(player.getCards('j'));
			player.link(false);
			player.turnOver(false);
			let skills = [["xjzh_huoying_luoxuan", "xjzh_huoying_dunshu", "xjzh_huoying_liudaofenshen"], ["xjzh_huoying_fenshen", "xjzh_huoying_zuidun", "xjzh_huoying_kaigua"]];
			player.changeSkills(skills[0], skills[1]);
			game.delay(2);
			let node, node2
			//觉醒时换头像
			if (player.name2 && player.name2 == 'xjzh_huoying_liudaomingren') {
				node = player.node.avatar2;
				node2 = player.node.name2;
			} else {
				node = player.node.avatar;
				node2 = player.node.name;
			}
			node2.innerHTML = get.slimName('xjzh_huoying_liudaomingren');
			game.broadcastAll(node => {
				node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
			}, node);
			game.log(player, '使用了自己的外挂');
			game.log(player, '进入了六道模式');
			player.update();
			game.delay(2);
		},
	},
	"xjzh_huoying_dunshu": {
		locked: true,
		mod: {
			judge(player, result) {
				if (_status.event.type == 'phase') {
					if (result.bool == false) {
						result.bool = null;
					}
					else {
						result.bool = false;
					}
				}
			},
			cardUsable(card, player, num) {
				if (_status.currentPhase != player) return num;
				return Infinity;
			},
		},
		group: ["xjzh_huoying_dunshu_yang", "xjzh_huoying_dunshu_ying", "xjzh_huoying_dunshu_huihe", "xjzh_huoying_dunshu_fumian"],
		subSkill: {
			"yang": {
				audio: "ext:仙家之魂/audio/skill:1",
				trigger: {
					player: ["damageBegin", "loseHpBegin"],
				},
				forced: true,
				sub: true,
				filter(event, player) {
					return _status.currentPhase != player;
				},
				async content(event, trigger, player) {
					player.draw(trigger.num);
					if (game.countPlayer(current => current.isDamaged())) {
						let num = Math.min(trigger.num, game.countPlayer(current => current.isDamaged()));
						const result = await player.chooseTarget(trigger.num > 1 ? [1, num] : 1, (card, player, target) => {
							return target.isDamaged();
						})
							.set("prompt", `阳遁术：选择一名角色，令其回复一点体力`)
							.set("ai", target => {
								return get.attitude(player, target);
							})
							.forResult();
						if (result?.targets) {
							result.targets.map(target => {
								target.recover();
							});
						}
					}
					trigger.changeToZero();
				},
				ai: {
					nodamage: true,
					effect: {
						target(player, target, card) {
							if (get.is.damageCard(card) || get.tag(card, 'loseHp')) return 'zeroplayertarget';
						}
					},
				},
			},
			"ying": {
				audio: "ext:仙家之魂/audio/skill:1",
				trigger: {
					source: "damageBegin1",
				},
				forced: true,
				sub: true,
				filter(event, player) {
					return _status.currentPhase == player;
				},
				async content(event, trigger, player) {
					let history = player.getHistory("sourceDamage");
					if (history.length) trigger.num += history.length;
				},
			},
			"fumian": {
				audio: "ext:仙家之魂/audio/skill:1",
				trigger: {
					player: ["turnOver", "linkBefore"],
				},
				forced: true,
				sub: true,
				async content(event, trigger, player) {
					player.turnOver(false);
					player.link(false);
				},
				ai: {
					noturn: true,
					nolink: true,
				},
			},
			"huihe": {
				audio: "ext:仙家之魂/audio/skill:1",
				trigger: {
					player: "phaseBefore",
				},
				forced: true,
				sub: true,
				async content(event, trigger, player) {
					game.countPlayer(current => {
						current.addTempSkill("baiban");
					});
				},
			},

		},
	},
	//《金庸群侠传·项少龙·穿越》
	"xjzh_huoying_liudaofenshen": {
		trigger: {
			player: "phaseJieshuEnd",
		},
		locked: true,
		filter: function (event, player) {
			return !player.storage.xjzh_huoying_liudaofenshen;
		},
		group: "xjzh_huoying_liudaofenshen2",
		getinfo: function (player) {
			var js = player.getCards("j");
			var js2 = [];
			for (var k = 0; k < js.length; k++) {
				var name = js[k].viewAs || js[k].name;
				js2.push(name);
			}
			var isDisabled = [];
			for (var j = 1; j < 7; j++) {
				isDisabled.push(player.isDisabled(j));
			}
			var storage = {
				player: player,
				hs: player.getCards("h"),
				es: player.getCards("e"),
				isDisabled: isDisabled,
				hp: player.hp,
				maxHp: player.maxHp,
				_disableJudge: player.storage._disableJudge,
				isTurnedOver: player.isTurnedOver(),
				isLinked: player.isLinked(),
				js: js,
				js2: js2,
			};
			return storage;
		},
		content: function () {
			'step 0'
			player.loseHp();
			player.storage.xjzh_huoying_liudaofenshen = true;
			var storage = [];
			storage.push(lib.skill.xjzh_huoying_liudaofenshen.getinfo(player));
			player.storage.xjzh_huoying_liudaofenshen1 = storage;
			"step 1"
			player.maxHp = 3;
			player.hp = 3;
			player.lose(player.getCards("hej"))._triggered = null;
			player.directgain(get.cards(3));
			player.addSkill("xjzh_tongyong_baiban");
			let skills = [
				"xjzh_huoying_luoxuan",
			]
			player.storage['xjzh_tongyong_baiban'].addArray(skills);
			player.update();
			'step 2'
			setTimeout(() => {
				let node, node2
				//觉醒时换头像
				if (player.name2 && player.name2 == 'xjzh_huoying_liudaomingren') {
					node = player.node.avatar2;
					node2 = player.node.name2;
				} else {
					node = player.node.avatar;
					node2 = player.node.name;
				}
				node2.innerHTML = get.slimName('xjzh_huoying_liudaomingrenfs');
				game.broadcastAll((node) => {
					node.setBackgroundImage('extension/仙家之魂/skin/min/六道鸣人·分身.jpg');
				}, node);
			}, 100);
		},
	},
	"xjzh_huoying_liudaofenshen2": {
		trigger: {
			player: ["dieBegin", "phaseZhunbeiBegin"],
		},
		forceDie: true,
		forced: true,
		filter: function (event, player) {
			return player.storage.xjzh_huoying_liudaofenshen;
		},
		content: function () {
			"step 0"
			if (trigger.name == "die") trigger.cancel();
			"step 1"
			setTimeout(() => {
				let node, node2
				//觉醒时换头像
				if (player.name2 && player.name2 == 'xjzh_huoying_liudaomingren') {
					node = player.node.avatar2;
					node2 = player.node.name2;
				} else {
					node = player.node.avatar;
					node2 = player.node.name;
				}
				node2.innerHTML = get.slimName('xjzh_huoying_liudaomingren');
				game.broadcastAll((node) => {
					node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
				}, node);
			}, 100);
			'step 2'
			event.storage = player.storage.xjzh_huoying_liudaofenshen1.slice(0);
			event.doing = event.storage.shift();
			'step 3'
			player.maxHp = event.doing.maxHp;
			player.hp = event.doing.hp;
			var hs = player.getCards('ej');
			if (hs.length) player.lose(hs, ui.special)._triggered = null;
			'step 4'
			var hs = event.doing.hs;
			var hs2 = [];
			for (var i = 0; i < hs.length; i++) {
				var card = get.cardPile(hs[i], true);
				hs2.push(card);
			}
			if (hs2.length) player.directgain(hs2);
			'step 5'
			var isDisabled = event.doing.isDisabled;
			for (var i = 0; i < isDisabled.length; i++) {
				if (isDisabled[i] == false && player.isDisabled(i + 1)) player.enableEquip(i + 1)._triggered = null;
				if (isDisabled[i] == true && !player.isDisabled(i + 1)) player.disableEquip(i + 1)._triggered = null;
			}
			'step 6'
			var es = event.doing.es;
			var es2 = [];
			for (var i = 0; i < es.length; i++) {
				var card = get.cardPile(es[i], true);
				es2.push(card);
			}
			if (es2.length) player.directequip(es2);
			player.update();
			"step 7"
			player.storage.xjzh_huoying_liudaofenshen = false;
			delete player.storage['xjzh_tongyong_baiban']
			player.removeSkill("xjzh_tongyong_baiban");
		},
	},
	"xjzh_huoying_qiling": {
		trigger: {
			source: "damageBefore",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (get.suit(event.cards[0]) == "none") return false;
			return true;
		},
		forced: true,
		locked: true,
		priority: 6,
		marktext: "麒",
		intro: {
			name: "麒麟",
			content(storage, player) {
				let str = '';
				let list = ["huo", "lei"]
				for (let i of list) {
					if (player.hasMark("xjzh_huoying_qiling_" + i)) str += get.translation("xjzh_huoying_qiling_" + i) + ':' + get.translation(player.countMark("xjzh_huoying_qiling_" + i)) + '<br>';
				}
				return str;
			},
		},
		async content(event, trigger, player) {
			await game.setNature(trigger, get.color(trigger.cards[0]) == "red" ? "fire" : "thunder", false);
			player.addMark(game.hasNature(trigger, "fire") ? "xjzh_huoying_qiling_huo" : "xjzh_huoying_qiling_lei", 1, false);
			player.markSkill("xjzh_huoying_qiling");
			if (player.countMark("xjzh_huoying_qiling_huo") >= 3 && player.countMark("xjzh_huoying_qiling_lei") >= 1) {
				let evt = event.getParent("damage");
				if (evt && evt.getParent) {
					let next = game.createEvent('xjzh_huoying_qiling_trigger', false, evt.getParent());
					next.player = player;
					next.setContent(async () => {
						const result = await player.chooseTarget(get.prompt2('xjzh_huoying_qiling'), lib.filter.notMe)
							.set("ai", target => get.damageEffect(target, player, player, "thunder"))
							.forResult();
						if (result?.targets) {
							player.removeMark("xjzh_huoying_qiling_huo", 3);
							player.removeMark("xjzh_huoying_qiling_lei", 1);
							let num = Math.max(player.awakenedSkills.includes("xjzh_huoying_liudao") ? 1 : 2, Math.abs(result.targets[0].getHp(true) - player.getHp(true)));
							result.targets[0].damage("thunder", num, player, "nocard");
							if (["huo", "lei"].every(item => !player.hasMark("xjzh_huoying_qiling_" + item))) player.unmarkSkill("xjzh_huoying_qiling");
						}
					});
				}
			}

		},
		subSkill: { "huo": { sub: true, }, "lei": { sub: true, }, },
	},
	"xjzh_huoying_qianniao": {
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		frequent: true,
		priority: -1,
		filter(event, player, name) {
			return player.hasUseTarget("sha");
		},
		marktext: "瞳",
		intro: {
			name: "写轮眼",
			content: "mark",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		derivation: ["xjzh_huoying_tongshu"],
		async content(event, trigger, player) {
			let cards = game.createCard("sha", lib.suit.randomGet(), null, null);
			await player.chooseUseTarget(cards, game.filterPlayer(current => {
				return current.inRangeOf(player);
			}), false)
				.set('prompt', "〖雷遁·千鸟〗选择一名角色视为对其使用一张随机属性为火/雷的【杀】")
				.set('ai', target => {
					return get.damageEffect(target, player, player, 'thunder', 'fire');
				});


			let history = player.getHistory('sourceDamage', evt => evt.getParent(4).name == "xjzh_huoying_qianniao");
			if (history.length) {
				if (!player.awakenedSkills.includes("xjzh_huoying_liudao")) {
					player.addMark("xjzh_huoying_qianniao", 1);

					let next = game.createEvent('xjzh_huoying_liudaoTrigger', false);
					next.player = player;
					next.setContent(async () => {
						if (player.countMark("xjzh_huoying_qianniao") >= 4) event.trigger("xjzh_huoying_liudaoTrigger");
					});
				}
			} else {
				player.draw(player.awakenedSkills.includes("xjzh_huoying_liudao") ? 1 : 2);
			}
		},
	},
	"xjzh_huoying_liudao": {
		trigger: {
			player: "xjzh_huoying_liudaoTrigger",
		},
		forced: true,
		locked: true,
		unique: true,
		mark: true,
		marktext: "轮",
		intro: {
			name: "轮回眼",
			content: "limited",
		},
		limited: true,
		skillAnimation: true,
		animationStr: '六道模式',
		animationColor: 'fire',
		juexingji: true,
		priority: 1,
		audio: "ext:仙家之魂/audio/skill:1",
		filter: (event, player) => player.countMark("xjzh_huoying_qianniao") >= 4,
		derivation: ["xjzh_huoying_tongshu"],
		async content(event, trigger, player) {
			player.awakenSkill("xjzh_huoying_liudao");
			player.clearMark("xjzh_huoying_qianniao");
			player.addSkills("xjzh_huoying_tongshu");
			player.maxHp = 3;
			player.hp = 3;
			player.update();
			player.discard(player.getCards('j'));
			player.link(false);
			player.turnOver(false);
			player.node.name.innerHTML = get.slimName('xjzh_huoying_liudaozuozhu');
			let node, node2
			//觉醒时换头像
			if (player.name2 && player.name2 == 'xjzh_huoying_zuozhu') {
				node = player.node.avatar2;
				node2 = player.node.name2;
			} else {
				node = player.node.avatar;
				node2 = player.node.name;
			}
			node2.innerHTML = get.slimName('xjzh_huoying_liudaozuozhu');

			game.broadcastAll(node => {
				node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaozuozhu.jpg');
			}, node);

		},
	},
	"xjzh_huoying_tongshu": {
		trigger: {
			global: "damageBegin",
		},
		changeSeat: true,
		locked: false,
		priority: 6,
		mod: {
			globalFrom: (from, to, distance) => 1,
		},
		audio: "ext:仙家之魂/audio/skill:1",
		prompt(event, player) {
			return `〖天手力〗：${get.translation(event.source)}即将对${get.translation(event.player)}造成伤害，是否与${get.translation(event.source)}交换位置并视为对其使用一张【杀】`;
		},
		filter: (event, player) => event.source != player,
		check: (event, player) => get.attitude(player, event.player) > 0,
		async content(event, trigger, player) {
			if (trigger.player != player) {
				game.broadcastAll((player, target) => {
					game.swapSeat(player, target);
				}, player, trigger.player);
			}
			game.delay(0.5);
			let cards = game.createCard("sha", lib.suit.randomGet(), null, null);
			await player.useCard(cards, trigger.source, false).set('addCount', false).set('oncard', function (card, player) {
				let that = this;
				if (!that.baseDamage) that.baseDamage = 1;
				that.baseDamage++;
			});
			let history = player.getHistory('sourceDamage', evt => evt.getParent(3).name == "xjzh_huoying_tongshu");
			if (history.length) {
				trigger.changeToZero();
				game.log(trigger.player, "因", player, '的技能〖天手力〗防止了此伤害。');
			}
			else {
				game.log(player, '代替了', trigger.player, '承受了伤害。');
				trigger.player = player;
			}
		},
	},
	"xjzh_huoying_xianzhang": {
		mark: true,
		locked: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			name: "掌仙术",
			content: function (storage, player, skill) {
				if (player.storage.xjzh_huoying_xianzhang == true) return '每回合限一次，你使用非[伤害]卡牌指定已受伤的目标后，你可以令其摸两张牌或回复一点体力；';
				return '每回合限一次，其他角色使用[伤害]卡牌指定你为目标时，你可以扣置一张[伤害]卡牌，其猜测此牌牌名，若错，你可以移除此牌的一个目标。';
			},
		},
		trigger: {
			player: "phaseUseBegin",
		},
		forced: true,
		priority: 62,
		audio: "ext:仙家之魂/audio/skill:2",
		content: function () {
			if (player.storage.xjzh_huoying_xianzhang == true) {
				player.storage.xjzh_huoying_xianzhang = false;
				player.addTempSkill('xjzh_huoying_xianzhang_2', {
					player: 'phaseUseBegin'
				});
			}
			else {
				player.storage.xjzh_huoying_xianzhang = true;
				player.addTempSkill('xjzh_huoying_xianzhang_1', { player: 'phaseUseBegin' });
			}
		},
		subSkill: {
			"1": {
				trigger: {
					player: "useCardToPlayered",
				},
				sub: true,
				usable: 1,
				prompt: function (event, player) {
					return "是否发动〖掌仙术〗令" + get.translation(event.target) + "摸两张牌或回复一点体力";
				},
				check: function (event, player) {
					return get.attitude(player, event.target) > 0;
				},
				filter: function (event, player) {
					return !get.is.damageCard(event.card);
				},
				content: function () {
					trigger.target.chooseDrawRecover(2, 1, true, "〖掌仙术〗：请选择摸两张牌或回复一点体力");
				},
				ai: {
					result: {
						target: 1.5,
					},
				},
			},
			"2": {
				trigger: {
					target: "useCardToTargeted",
				},
				sub: true,
				usable: 1,
				prompt: function (event, player) {
					return "是否发动〖掌仙术〗令" + get.translation(event.player) + "猜测你的手牌";
				},
				check: function (event, player) {
					return 1;
				},
				filter: function (event, player) {
					return get.is.damageCard(event.card) && player.countCards('h', function (card) {
						return get.is.damageCard(card);
					});
				},
				content: function () {
					"step 0"
					player.chooseCard('h', 1, "选择一张手牌令" + get.translation(trigger.player) + "猜测牌名", function (card) {
						return get.is.damageCard(card);
					});
					"step 1"
					if (result.bool) {
						var cardx = ui.create.card();
						cardx.classList.add('infohidden');
						cardx.classList.add('infoflip');
						player.$throw(cardx, 1000, 'nobroadcast');
						game.log(player, "扣置了一张牌在场上");
						event.cardx = result.cards[0]
						game.delay(2);
						var inpile = lib.inpile.filter(function (name) {
							var card = { name: name };
							if (!get.is.damageCard(card)) return false;
							return true;
						});
						var text = '请选择猜测一种[伤害]类卡牌;'
						trigger.player.chooseVCardButton(true, inpile, text).set('ai', function () {
							if (Math.random() <= 0.5) return "sha";
							return Math.random();
						});
					}
					"step 2"
					if (result && result.links) {
						var card2 = game.createCard(result.links[0][2]);
						trigger.player.$throw(card2, 1000, 'nobroadcast');
						player.$throw(event.cardx, 1000, 'nobroadcast');
						if (result.links[0][2].name != event.cardx.name) {
							player.chooseTarget('选择移除' + get.translation(trigger.card) + '的一个目标', function (card, player, target) {
								return trigger.targets.includes(target);
							})
								.set('ai', function () {
									return get.attitude(player, target) > 0;
								});
						}
						else {
							event.finish();
						}
					}
					"step 3"
					if (result.bool) {
						trigger.targets.remove(result.targets[0]);
					}
				},
				ai: {
					effect: {
						target: function (player, target, card) {
							if (get.is.damageCard(card)) return [0.5, 0.5];
							return 1;
						},
					},
				},
			},
		},
	},
	"xjzh_huoying_sihun": {
		trigger: {
			player: "dyingBefore",
		},
		init: function (player, skill) {
			player.storage.xjzh_huoying_sihun = false;
		},
		filter: function (event, player) {
			return !player.storage.xjzh_huoying_sihun && game.dead.length > 0;
		},
		forced: true,
		priority: -16,
		limited: true,
		mark: true,
		marktext: "魂",
		intro: {
			name: "死魂之术",
			content: "limited",
		},
		skillAnimation: true,
		animationColor: "water",
		animationStr: "死魂之术",
		content: function () {
			"step 0"
			player.awakenSkill('xjzh_huoying_sihun');
			player.storage.xjzh_huoying_sihun = true;
			"step 1"
			var dead = game.dead
			player.recover(dead.length);
			player.draw(dead.length);
			var de = []
			for (var i = 0; i < dead.length; i++) {
				de.push(dead[i]);
			}
			var link = de.randomGet();
			link.revive(2);
			if (game.zhu != player) {
				var id = player.identity;
			}
			else {
				var id = 'zhong';
			}
			link.setIdentity(id);
			link.identity = id;
			link.node.identity.dataset.color = 'xjzh_huoying_sihun';
			link.identityShown = true;
			link.changeGroup(player.group);
			link.clearSkills();
			link.addSkill("xjzh_huoying_sihun_display");
		},
		subSkill: {
			"display": {
				mod: {
					cardEnabled2: function (card, player, now) {
						return false;
					},
					cardEnabled: function (card, player, now) {
						return false;
					},
				},
				trigger: {
					player: ["drawAfter", "gainAfter"],
				},
				direct: true,
				priority: 16,
				sub: true,
				filter: function (event, player) {
					return player.countCards("h");
				},
				content: function () {
					var cardx = player.getCards("h");
					player.lose(cardx, ui.cardPile, get.rand(0, ui.cardPile.childNodes.length));
				},
				ai: {
					nosave: true,
				},
			},
		},
	},
	"xjzh_huoying_chuanyi": {
		trigger: {
			source: "damageEnd",
		},
		prompt: function (event, player) {
			return "是否弃置" + get.translation(player.storage.xjzh_huoying_chuanyi + 1) + "张牌发动〖仙法·传异远影〗获得" + get.translation(event.player) + "的一个技能";
		},
		init: function (player, skill) {
			player.storage.xjzh_huoying_chuanyi = 1;
		},
		check: function (event, player) {
			var cards = player.getCards("he");
			for (var i of cards) {
				if (4 - get.value(i)) return 1;
			}
			return 0.5;
		},
		filter: function (event, player) {
			return event.player.isDead();
		},
		content: function () {
			"step 0"
			var num = player.storage.xjzh_huoying_chuanyi
			list = trigger.player.skills.filter(s => lib.translate[s] && lib.translate[s + '_info'] && lib.skill[s] && !lib.skill[s].nopopup && !lib.skill[s].equipSkill && !lib.skill[s].juexingji && !lib.skill[s].limited && !lib.skill[s].unique && !lib.skill[s].dutySkill);
			if (list.length) {
				player.chooseToDiscard(num + 1, "he", "是否弃置" + get.cnNumber(num + 1) + "张牌获得" + get.translation(trigger.player) + "的一个技能").set('ai', function (card) {
					return 6 - get.value(card);
				});
			}
			"step 1"
			if (result.bool) {
				if (event.isMine()) {
					var dialog = ui.create.dialog('forcebutton');
					dialog.add('请选择获得一项技能');
					for (i = 0; i < list.length; i++) {
						if (lib.translate[list[i] + '_info']) {
							var translation = get.translation(list[i]);
							if (translation[0] == '新' && translation.length == 3) {
								translation = translation.slice(1, 3);
							}
							else {
								translation = translation.slice(0, 2);
							}
							var item = dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖' + translation + '〗</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
							item.firstChild.link = list[i];
						}
					}
				}
				if (list.length == 1) event._result = {
					control: list[0]
				};
				else player.chooseControl(list).set('prompt', '请选择获得一项技能').set('ai', function () {
					return get.max(list, get.skillRank, 'item');
				}).set('dialog', dialog);
			}
			"step 2"
			if (result && result.control) {
				player.addSkillLog(result.control);
				player.storage.xjzh_huoying_chuanyi++
			}
		},
	},
	"xjzh_huoying_kaobei": {
		trigger: {
			global: ["logSkill", "useSkillAfter"],
		},
		usable: 1,
		bannedList: [
			"ywhy_youli"
		],
		forced: true,
		firstDo: true,
		priority: 100,
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			let skill = get.sourceSkillFor(event), info = get.info(skill);
			if (player.hasSkill(skill)) return false;
			if (lib.skill.xjzh_huoying_kaobei.bannedList.includes(skill)) return false;
			if (!lib.translate[skill + '_info'] || !lib.translate[skill]) return false;
			if (lib.skill.global.includes(skill)) return false;
			if (!player.getExpansions("xjzh_huoying_shenwei").length) return false;
			if (!info || (info && (info.limited || info.juexingji || info.dutySkill || info.equipSkill || info.cardSkill || info.sub || info.unique || info.persevereSkill))) return false;
			if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;
			return event.player != player;
		},
		async content(event, trigger, player) {
			let skill = get.sourceSkillFor(trigger);
			let cards = player.getExpansions("xjzh_huoying_shenwei");
			const result = await player.chooseCardButton(cards, 1)
				.set("prompt", `〖拷贝〗：选择移除一张“雷”获得${get.translation(trigger.player)} 的技能〖"${get.translation(skill)}〗`)
				.set('ai', button => {
					let trigger = get.event().getTrigger(), skill = get.sourceSkillFor(trigger), rank = get.skillRank(skill, "inout");
					let valuex = get.value(button.link), number = get.number(button.link);
					return number - valuex + rank;
				})
				.forResult();
			if (result?.links) {
				player.loseToDiscardpile(result.links);
				player.addTempSkills(skill, { player: `${skill}After` });
			}
		},
	},
	"xjzh_huoying_shenwei": {
		trigger: {
			global: ["gameStart", "roundStart"],
			player: ["enterGame", "dying"],
		},
		forced: true,
		mark: true,
		marktext: "雷",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		filter(event, player) {
			if (event.name == "game") return true;
			if (event.name == "dying") return player.getExpansions("xjzh_huoying_shenwei").length;
			return game.roundNumber % 2 != 0;
		},
		async content(event, trigger, player) {
			let name = trigger.name, cards;
			if (name == "game") {
				cards = get.cards(7);
				const result = await player.chooseCardButton(cards, 4, true)
					.set("prompt", "〖神威〗：选择4张牌将其置于你的武将牌上")
					.set('ai', button => {
						return get.number(button.link) + get.value(button.link);
					})
					.forResult();
				if (result?.links) player.addToExpansion(result.links, "giveAuto", player).gaintag.add("xjzh_huoying_shenwei");
			}
			else if (name == "dying") {
				cards = player.getExpansions("xjzh_huoying_shenwei");
				let num = cards.reduce((a, b) => a + get.number(b), 0);
				const result = await player.chooseButtonTarget({
					createDialog: ["〖神威〗：请选择一项", [
						[
							["gain", "令一名角色获得所有“雷”"],
							["discard", `令一名角色弃置任意张点数和不小于${get.translation(num)}的牌,否则其失去所有体力`],
						],
						"textbutton",
					],
					],
					forced: true,
					filterTarget: lib.filter.notMe,
					ai1: button => {
						const player = get.player();
						const num = get.event().num;
						switch (button.link) {
							case "gain": {
								return 4;
							}
							case "discard": {
								if (game.hasPlayer(target => {
									const att = get.attitude(player, target);
									let disCards = target.getCards("he");
									let disNum = disCards.reduce((a, b) => a + get.number(b), 0);
									return att < 0 && disNum < num
								})) return 6;
								break;
							}
						}
						return 1;
					},
					ai2(target) {
						const link = ui.selected.buttons[0]?.link,
							player = get.player(),
							att = get.attitude(player, target);
						if (!link) {
							return 0;
						}
						if (link == "gain") return att;
						return -att;
					},
				})
					.set("num", num)
					.forResult();
				if (result?.bool) {
					let target = result.targets[0];
					let link = result.links[0];
					if (link == "gain") {
						target.gain(cards, player, "giveAuto");
					} else {
						const result2 = await target.chooseToDiscard('he')
							.set('complexCard', true)
							.set('complexSelect', true)
							.set('selectCard', () => {
								let num2 = 0;
								let target = get.event().target;
								for (let i = 0; i < ui.selected.cards.length; i++) {
									num2 += get.number(ui.selected.cards[i]);
								}
								if (num2 >= num) return ui.selected.cards.length;
								return target.countCards("h");
							})
							.set('ai', card => {
								return 12 - get.value(card);
							})
							.set("prompt", `〖神威〗:弃置任意张点数和不小于${get.translation(num)}的牌,否则失去所有体力`)
							.set('target', target)
							.forResult();
						if (!result2?.bool) target.loseHp(target.getHp(true));
					}
				}
			}
			else {
				cards = Array.from(ui.cardPile.childNodes).randomGets(4);
				player.gain(cards, player, "giveAuto");
			}
		},
	},
	"xjzh_huoying_leiqie": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			return player.countCards('h') || player.getExpansions('xjzh_huoying_shenwei').length;
		},
		usable: 1,
		async content(event, trigger, player) {
			let cards = player.getExpansions('xjzh_huoying_shenwei');
			if (!cards.length && !player.countCards('h')) return;
			const result = await player.chooseToMove()
				.set('list', [
					[get.translation(player) + '（你）的雷', cards],
					['手牌区', player.getCards('h')],
				])
				.set('filterMove', (from, to, moved) => {
					if (to == 0) return moved[0].length < 4;
					return typeof to != 'number';
				})
				.set('processAI', list => {
					let player = get.player(), cards = list[0][1].concat(list[1][1]).sort((a, b) => get.value(a) - get.value(b)), cards2 = cards.splice(0, player.getExpansions('xjzh_huoying_shenwei').length);
					return [cards2, cards];
				})
				.set("prompt", '〖雷切〗：是否交换“雷”和手牌？')
				.forResult();
			if (result?.moved) {
				let moved = result.moved;
				let pushs = moved[0], gains = moved[1];
				pushs.removeArray(player.getExpansions('xjzh_huoying_shenwei'));
				gains.removeArray(player.getCards('h'));
				player.addToExpansion(pushs, player, 'giveAuto').gaintag.add('xjzh_huoying_shenwei');
				if (pushs.length) game.log(player, '将', pushs, '作为“雷”置于武将牌上');
				player.gain(gains, 'gain2');
			}
			const result2 = await player.chooseTarget(lib.filter.notMe)
				.set("prompt", "〖雷切〗:请选择一个目标对其造成1点雷属性伤害")
				.set('ai', target => get.damageEffect(target, player, player, "thunder"))
				.forResult();
			if (result2?.targets) {
				result2.targets[0].damage(1, player, "nocard", "thunder");
			}
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_huoying_bietian": {
		trigger: {
			source: "damageAfter",
			player: "phaseDrawBegin",
			global: "phaseBegin",
		},
		/*prompt(event,player){
			let str=`〖别天神〗：是否失去一点体力随机偷取${event.source==player?`${get.translation(event.player)}`:`${get.translation(event.source)}`}一个回合阶段`;
			return str;
		},*/
		forced: true,
		locked: true,
		priority: 5,
		mark: true,
		marktext: "别",
		intro: {
			name: "别天神",
			content(storage, player) {
				return `额外阶段${storage.length - 6}个`;
			},
			markcount(storage, player) {
				return storage?.length ? storage.length - 6 : 0;
			},
		},
		init(player, skill) {
			game.countPlayer(current => {
				current.storage[skill] = ["phaseZhunbei", "phaseJudge", "phaseDraw", "phaseUse", "phaseDiscard", "phaseJieshu"];
			});
		},
		filter(event, player) {
			if (event.name == "phase") return event.player.storage.xjzh_huoying_bietian && event.player.storage.xjzh_huoying_bietian.length;
			if (event.name == "phaseDraw") return player.storage.xjzh_huoying_bietian && player.storage.xjzh_huoying_bietian.length > 6;
			if (event.name == "damage") return !event.numFixed && !event.cancelled && event.num >= 2;
		},
		async content(event, trigger, player) {
			let name = trigger.name;
			switch (name) {
				case "damage": {
					let storage = trigger.player.storage[event.name];
					let str = `〖别天神〗：是否失去一点体力上限随机偷取${get.translation(trigger.player)}一个回合阶段`;
					const result = await player.chooseBool()
						.set("prompt", str)
						.set('ai', () => {
							let player = get.player();
							if (player.maxHp <= 1) return false;
							if (storage.some(item => ["phaseDraw", "phaseUse"].includes(item))) return true;
							return false;
						})
						.forResult();
					if (result?.bool) {
						player.loseMaxHp();
						let results = storage.randomGet();
						storage.remove(results);
						trigger.player.storage[event.name] = storage;
						player.storage[event.name].push(results);
						game.log(player, '偷取', trigger.player, "的", results);
						player.update();
					}
				}
					break;
				case "phase": {
					let phaseList = trigger.player.storage[event.name];
					trigger.phaseList = trigger.player == player ? phaseList.randomSort() : phaseList;
				}
					break;
				case "phaseDraw": {
					let storage = player.storage[event.name];
					trigger.num += storage.length - 6;
				}
					break;
			}
		},
	},
	"xjzh_huoying_shunshen": {
		trigger: {
			player: ["phaseBefore", "damageBegin1"],
		},
		forced: true,
		locked: true,
		priority: 5,
		filter(event, player) {
			if (event.name == "damage") return event.source && [player.getNext(), player.getPrevious()].includes(event.source) && !event.numFixed;
			return true;
		},
		async content(event, trigger, player) {
			if (trigger.name == "damage") {
				trigger.changeToZero();
				return;
			}
			let targets = game.filterPlayer(current => current != player).randomGet();
			game.swapSeat(player, targets);
			event.trigger("xjzh_huoying_shunshen_trigger");
			player.chooseToUse({
				filterCard(card, player, event) {
					if (get.itemtype(card) != "card" || (get.position(card) != "h" && get.position(card) != "s")) return false;
					return lib.filter.filterCard.apply(this, arguments);
				},
				prompt: "〖瞬身〗：选择使用一张手牌",
				addCount: false,
				ai1: (card) => get.order(card),
			});
		},
		ai: {
			swapSeat: true,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card) && [target.getNext(), target.getPrevious()].includes(player)) return 0;
				},
			},
		},
	},
	"xjzh_huoying_xuzuo": {
		trigger: {
			player: ["xjzh_huoying_shunshen_trigger", "damageBegin1"],
		},
		forced: true,
		priority: 3,
		locked: true,
		filter(event, player) {
			if (event.name == "damage") return player.hujia >= 2;
			return true;
		},
		async content(event, trigger, player) {
			if (trigger.name == "damage") {
				await player.gainMaxHp(Math.floor(player.hujia / 2));
				await player.changeHujia(-player.hujia);
			} else player.changeHujia(1);
		},
	},

};

export default skills;