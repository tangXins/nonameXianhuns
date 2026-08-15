import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const starsSkills = {

	//众星之魂
	"xjzh_zxzh_dianling": {
		trigger: {
			global: "phaseBegin",
		},
		frequent: true,
		prompt(event, player) {
			return `〖点灵〗：是否令${get.translation(event.player)}本回合阶段顺序逆转？`;
		},
		filter(event, player) {
			if (!player.hasMark("xjzh_zxzh_tusu")) return false;
			return event.player != player && event.player.isIn();
		},
		check(event, player) {
			let att = get.attitude(player, event.player);
			let num = event.player.needsToDiscard();
			if (att <= 0 && num > 0) return num;
			if (att > 0 && num <= 0) return num;
			return 1;
		},
		group: ["xjzh_zxzh_dianling_end"],
		async content(event, trigger, player) {
			trigger.phaseList = trigger.phaseList.reverse();
			trigger.player.addTempSkill("xjzh_zxzh_dianling_on");
			player.removeMark("xjzh_zxzh_tusu", 1);
			game.log(`${get.translation(player)}令${get.translation(trigger.player)}本回合阶段顺序逆转`);
		},
		subSkill: {
			"on": { sub: true, },
			"end": {
				trigger: {
					global: ["recoverAfter", "loseHpAfter", "damageAfter"],
				},
				priority: 3,
				sub: true,
				filter(event, player) {
					if (event.name == "damage") return event.source && event.source.hasSkill("xjzh_zxzh_dianling_on");
					return event.player.hasSkill("xjzh_zxzh_dianling_on");
				},
				async cost(event, trigger, player) {
					event.result = await player.chooseTarget((card, player, target) => {
						let trigger = get.event().getTrigger();
						if (target.hasSkill("xjzh_zxzh_dianling_on") || target == player) return false;
						if (trigger.name == "recover") return target.isDamaged();
						return true;
					})
						.set("prompt", `〖点灵〗：选择一名角色令其${trigger.name == "damage" ? `受到${trigger.num}点伤害` : trigger.name == "recover" ? `回复${trigger.num}点体力？` : `失去${trigger.num}点体力？`}`)
						.set("ai", target => {
							let trigger = get.event().getTrigger(), player = get.player();
							if (trigger.name == "damage") return get.damageEffect(target, player, player);
							if (trigger.name == "recover") return get.recoverEffect(target, player, player);
							if (trigger.name == "loseHp" && !target.hasSkillTag("maixie_hp")) return 0;
							return 1;
						})
						.forResult();
				},
				async content(event, trigger, player) {
					let target = event.targets[0];
					if (!target) return;
					if (trigger.name == "damage") target.damage.apply(target, [trigger.num, trigger.nature, trigger.cards, trigger.card, player]);
					else target[trigger.name](trigger.num);
				}
			},
		},
	},
	"xjzh_zxzh_tusu": {
		trigger: {
			player: ["phaseDrawBegin", "phaseDiscardBegin"],
		},
		forced: true,
		locked: true,
		priority: Infinity,
		firstDo: true,
		mark: true,
		marktext: "屠苏",
		intro: {
			content: "#",
		},
		mod: {
			targetInRange(card, player, target, now) {
				if (!card.cards) return;
				for (let i of card.cards) {
					if (i.hasGaintag("xjzh_zxzh_tusu")) return true;
				}
			},
		},
		async content(event, trigger, player) {
			if (trigger.name == "phaseDraw") {
				let cards = [];
				for (let i = 0; i < ui.cardPile.childElementCount; i++) {
					let card = ui.cardPile.childNodes[i];
					if (cards.includes(get.name(card))) continue;
					cards.push(card);
					if (cards.length >= player.maxHp) break;
				}
				player.directgain(cards, null, 'xjzh_zxzh_tusu');
			} else {
				player.addMark("xjzh_zxzh_tusu", player.maxHp);
			}
			trigger.cancel(null, null, 'notrigger');
		},
	},
	"xjzh_zxzh_leifa": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		priority: -3,
		forced: true,
		locked: true,
		async content(event, trigger, player) {

			let num = player.countCards('h');
			player.draw(num);
			player.chooseToDiscard(num, 'h', true);

			if (!player.canCompare(trigger.player) || trigger.player == player) return;

			let result = await player.chooseBool()
				.set('ai', () => {
					let trigger = get.event().getTrigger();
					return -get.attitude(get.player(), trigger.player);
				})
				.set('prompt', `【雷法】：是否对${get.translation(trigger.player)}发起拼点？`)
				.forResult();
			if (!result?.bool) return;

			const result2 = await player.chooseToCompare(trigger.player).forResult();
			if (result2?.bool) {
				trigger.player.damage('thunder', player, 'nocard');
				trigger.player.addTempSkill('fengyin');
			}
		},
	},
	//《金庸群侠传·杨过·暗魂》
	"xjzh_zxzh_jianxin": {
		trigger: {
			player: "damageAfter",
			source: "damageAfter",
		},
		forced: true,
		locked: true,
		priority: -1,
		audio: "ext:仙家之魂/audio/skill:8",
		filter(event, player) {
			if (event.getParent(4).name == "xjzh_zxzh_jianxin") return false;
			return !event.numFixed && event.source;
		},
		async content(event, trigger, player) {
			let useNum = trigger.num;
			if (!player.hasEmptySlot(1)) {
				let card = get.cardPile(card => get.translation(card).includes('剑'));
				player.useCard(card, player, false);
			} else {
				if (trigger.source == player) useNum += player.getHp(true);
				else useNum += player.getDamagedHp(true);
				let cards = get.cards(useNum);
				player.showCards(cards);
				game.cardsGotoOrdering(cards);
				while (cards.length) {
					const result = await player.chooseCardButton(cards)
						.set('ai', button => {
							let player = get.player();
							return player.getUseValue(button.link, false);
						})
						.set('filterButton', button => {
							let player = get.player();
							return player.hasUseTarget(button.link, false) && get.is.damageCard(button.link);
						})
						.set("prompt", `〖剑心〗：请选择要使用的牌`)
						.forResult();
					if (result?.links) {
						cards.removeArray(result.links);
						let link = result.links[0];
						player.chooseUseTarget(link, false);
					} else break;
				}
			}
		},
		ai: {
			expose: 0.2,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card)) return [1, 1];
				},
			},
		},
	},
	"xjzh_zxzh_jiezhen": {
		trigger: {
			player: "damageBegin1",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		forced: true,
		locked: true,
		priority: 9,
		firstDo: true,
		filter(event, player) {
			if (game.hasNature(event, "thunder", player)) return true;
			return event?.source?.isIn() && !event.numFixed;
		},
		async content(event, trigger, player) {
			if (game.hasNature(trigger, "thunder", player)) {
				trigger.changeToZero();
				return;
			} else {
				let bool = player.inRange(trigger.source);
				let targets = game.filterPlayer(target => bool ? player.inRange(target) : !player.inRange(target));
				targets.add(player);
				if (!targets?.length) return;
				let target = targets.randomGet();
				trigger.player = target;
				if (target != player) game.log(`${get.translation(target)}代替${get.translation(player)}成为了${get.translation(trigger.source)}造成的伤害的目标`);
			}
		},
		ai: {
			expose: 0.5,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'thunderDamage')) return "zeroplayertarget";
					const bool = target.inRange(player);
					const targets = game.filterPlayer(current => bool ? target.inRange(current) : !target.inRange(current));
					targets.add(player);
					return [1 / targets.length, 1, 0, -(1 / targets.length)];
				},
			},
		},
	},
	"xjzh_zxzh_xianghun": {
		audio: "ext:仙家之魂/audio/skill:2",
		enable: "phaseUse",
		usable: 1,
		async content(event, trigger, player) {
			player.loseHp();
			player.draw(2);
		},
		ai: {
			order: 10,
			maixie_hp: true,
			maixie_defend: true,
			result: {
				player(player, target, card) {
					return player.getHp(true) - 1;
				},
			},
		}
	},
	"xjzh_zxzh_renxin": {
		trigger: {
			player: ["loseHpEnd", "damageEnd", "phaseBegin"]
		},
		audio: "ext:仙家之魂/audio/skill:2",
		forced: true,
		locked: true,
		priority: 10,
		filter(event, player) {
			if (["damage", "phase"].includes(event.name)) return player.awakenedSkills.includes("xjzh_zxzh_xunqing");
			return true;
		},
		async content(event, trigger, player) {
			const result = await player.judge().forResult();
			const result2 = await player.chooseTarget([1, 2], (card, player, target) => {
				if (result.color == "red") return target.isDamaged();
				return true;
			})
				.set("ai", target => {
					let player = get.player();
					if (result.color == "red") return get.recoverEffect(target, player, player);
					return get.damageEffect(target, player, player, "thunder");
				})
				.set("prompt", `〖仁心〗：选择至多2个目标令其各${result.color == "red" ? "回复1点体力" : "受到1点雷属性伤害"}`)
				.forResult();
			if (result2?.targets) {
				for await (let target of result2.targets) {
					if (result.color == "red") target.recover();
					else target.damage(player, 1, "nocard", "thunder");
				}
			}
		},
	},
	"xjzh_zxzh_xunqing": {
		trigger: {
			player: "useSkillAfter",
		},
		juexingji: true,
		limited: true,
		forced: true,
		locked: true,
		priority: -1,
		skillAnimation: true,
		animationColor: "metal",
		audio: "ext:仙家之魂/audio/skill:2",
		mark: true,
		marktext: "情",
		intro: {
			content(storage, player) {
				let history = player.getAllHistory("useSkill", (evt) => evt.skill == "xjzh_zxzh_renxin");
				return `已发动${history.length}次〖仁心〗`;
			},
			markcount: (storage, player) => player.getAllHistory("useSkill", (evt) => evt.skill == "xjzh_zxzh_renxin").length,
		},
		filter(event, player) {
			let history = player.getAllHistory("useSkill", (evt) => evt.skill == "xjzh_zxzh_renxin");
			return history.length >= 6;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			game.xjzh_clearRestraint(player);
			player.recoverTo(player.maxHp);
		},
	},
	"xjzh_zxzh_yufeng": {
		trigger: {
			global: "damageBegin3",
		},
		check(event, player) {
			if (game.hasNature(event)) return get.damageEffect(event.player, event.source, player, event.nature);
			return get.damageEffect(event.player, event.source, player);
		},
		prompt(event, player) {
			return `${get.translation(event.player)} 即将受到${get.translation(event.source)}造成的伤害，是否发动〖御风〗？`;
		},
		usable: 1,
		filter(event, player) {
			if (!player.countCards("hs")) return false;
			if (!event.source || !event.source.isIn()) return false;
			if (game.hasNature(event)) return player.countCards("hs", card => get.type(card) != "basic");
			if (!game.hasNature(event)) return player.countCards("hs", card => get.type(card) == "basic");;
			return false;
		},
		async content(event, trigger, player) {
			let natureBool = game.hasNature(trigger), result;

			if (!natureBool) {
				result = await player.chooseToDiscard(1, "hs")
					.set("prompt", `〖御风〗:弃置一张牌基本牌令${get.translation(trigger.source)}对${get.translation(trigger.player)}造成的${trigger.num}点伤害+1`)
					.set("filterCard", card => get.type(card) == "basic")
					.set("ai", () => {
						let trigger = get.event().getTrigger(), player = get.player();
						return get.damageEffect(trigger.player, trigger.source, player);
					})
					.forResult();
			} else {
				result = await player.chooseCardTarget({
					prompt: get.prompt(event.name),
					prompt2: ` 〖御风〗:弃置一张非牌基本牌并选择一名其他角色，令其受到${get.translation(trigger.source)}造成的${trigger.num}点${get.translation(trigger.nature)}伤害`,
					filterCard: (card, player, target) => get.type(card) != "basic",
					filterTarget: (card, player, target) => get.event().getTrigger().player != target && target != player,
					ai1: (card) => 8 - get.value(card),
					ai2(target) {
						let trigger = get.event().getTrigger(), player = get.player();
						return get.damageEffect(target, trigger.source, player, trigger.nature);
					},
				}).forResult();
			}
			if (result?.bool) {
				if (result?.targets?.length) {
					let target = result.targets[0];
					target.damage(trigger.source, trigger.num, "nocard", trigger.nature);
				} else trigger.num++;
			}
		},
	},
	//《金庸群侠传·绝郭靖·镇卫》
	"xjzh_zxzh_fengzhen": {
		trigger: { global: "useCard" },
		direct: true,
		priority: -5,
		filter: function (event, player) {
			if (event.card.name == 'sha' || event.card.name == 'nanman' || event.card.name == 'wanjian') {
				if (game.hasPlayer(function (current) {
					if (!event.targets.includes(current)) return false;
					return current.isEmpty(2);
				})
				) return player.countCards('he') > 0;
			}
			return false;
		},
		content: function () {
			"step 0"
			var next = player.chooseCardTarget({
				position: 'he',
				selectTarget: [1, Infinity],
				filterCard: lib.filter.cardDiscardable,
				filterTarget: function (card, player, target) {
					var trigger = _status.event.getTrigger();
					if (!trigger.targets.includes(target)) return false;
					return target.isEmpty(2);
					//!target.isDisabled(2);
				},
				ai1: function (card) {
					return get.unuseful(card) + 9;
				},
				ai2: function (target) {
					var trigger = _status.event.getTrigger();
					//var bool1=get.tag(trigger.card,'respondSha')&&!target.hasSha();
					// var bool2=get.tag(trigger.card,'respondShan')&&!target.hasShan();
					//if(bool1||bool2)return get.attitude(_status.event.player,target);
					var att = get.attitude(_status.event.player, target);
					if (trigger.targets.length == 1) {
						if (trigger.card.name == 'sha' && trigger.card.nature == 'fire' && lib.inpile.includes('tengjia')) return -1;
						if (trigger.card.name == 'sha' && trigger.card.nature == 'fire' && lib.inpile.includes('jydiywuchanyi')) return -1;
						if (trigger.card.name == 'sha' && trigger.card.nature == 'jy_du' && lib.inpile.includes('jydiy_jingsibeixin')) return -1;
					}
					return att > 0 ? att : 0;
				},
				prompt: '' + get.translation(trigger.targets) + '成为了' + get.translation(trigger.player) + '' + get.translation(trigger.card) + '的目标',
				prompt2: '弃置一张牌，选择任意名目标直到此牌结算结束，你选择的角色视为装备一张防具牌',
			});
			"step 1"
			if (result.bool) {
				player.logSkill('xjzh_zxzh_fengzhen', result.targets);
				event.targets = result.targets;
				player.discard(result.cards);
				var list = get.inpile(function (name) {
					var card = {
						name: name
					};
					var info = get.info(card);
					return info.type == 'equip' && info.subtype == 'equip2' && info.skills;
				});
				for (var i = 0; i < list.length; i++) {
					list[i] = ['防具', '', list[i]];
				}
				var att = get.attitude(player, result.targets[0]) > 0
				var dialog = ui.create.dialog('选择一张防具牌令你选择的角色视为装备该防具牌', [list, 'vcard'], 'hidden');
				player.chooseButton(dialog, true).set('ai', function (button) {
					var player = _status.event.player;
					var aibool = _status.event.aibool;
					var cardx = _status.event.cardx;
					var triggerx = _status.event.triggerx;
					var name = button.link[2];
					if (aibool) {
						if ((cardx.name == 'wanjian' || cardx.name == 'nanman') && (name == 'tengjia' || name == 'jydiywuchanyi' || name == 'jydiy_jingsibeixin')) return 10;
						if (cardx.name == 'sha' && !cardx.nature && (name == 'tengjia' || name == 'jydiywuchanyi' || name == 'jydiy_jingsibeixin')) return 10;
						if (cardx.name == 'sha' && get.color(cardx) == 'black' && (name == 'renwang' || name == 'jydiybeidouzhen')) return 10;
						if (cardx.name == 'sha' && name == 'jydiytaohuazhen_re') return 8;
						if (cardx.name == 'sha' && (name == 'bagua' || 'jydiytaohuazhen')) return 6;
						if (triggerx && triggerx.baseDamage && triggerx.baseDamage > 1 && (name == 'jydiy_ruanweijia_re' || name == 'jydiy_ruanweijia')) return 5;
						if (triggerx && triggerx.baseDamage && triggerx.baseDamage > 1 && name == 'baiyin') return 4;
						return 0;
					}
					else {
						if (cardx.name == 'sha' && cardx.nature && cardx.nature == 'fire' && (name == 'tengjia' || name == 'jydiywuchanyi')) return 10;
						if (cardx.name == 'sha' && cardx.nature && cardx.nature == 'jy_du' && name == 'jydiy_jingsibeixin') return 10;
						return 0;
					}
				})
					.set('aibool', att).set('cardx', trigger.card).set('triggerx', trigger);
			}
			else event.finish();
			"step 2"
			if (result.bool) {
				var card = game.createCard(result.links[0][2], '', '', '');
				var skills = get.info(card).skills;
				skills = skills.slice(0);
				for (var i of event.targets) {
					i.$gain2(card);
					for (var s of skills) {
						i.addTempSkill(s, 'useCardEnd');
					}
				}
			}
		},
	},
	//《金庸群侠传·庄聚贤·焚庄》
	"xjzh_zxzh_zonghuo": {
		skillAnimation: "epic",
		animationColor: "fire",
		animationStr: "烈焰焚天",
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return player != target;
		},
		unique: true,
		limited: true,
		selectTarget: -1,
		marktext: "焚",
		mark: true,
		multitarget: true,
		multiline: true,
		line: "fire",
		intro: {
			content: "limited",
		},
		content: function () {
			"step 0"
			player.chooseControl(['一', '二'], function (event, player) {
				if (player.hasSkillTag('nofire')) return '二';
				if (player.hp - 2 > 0) return '二';
				return '一';
			})
				.set('prompt', '请选择要造成的伤害');
			"step 1"
			event.onfire = result.control == '二' ? 2 : 1;
			player.damage('fire', event.onfire, player);
			player.awakenSkill('xjzh_zxzh_zonghuo');
			event.num1 = 0;
			"step 2"
			if (event.num1 < targets.length) {
				if (targets[event.num1].countCards('e') && player.isIn()) {
					targets[event.num1].chooseBool('是否将装备区的牌交给' + get.translation(player) + '?否则受到' + get.translation(player) + (event.onfire == 2 ? '二' : '一') + '点火焰伤害').set('ai', function (evt, playerx) {
						var num = evt.onfire;
						if (playerx.hasSkillTag('nofire')) return false;
						if (get.attitude(playerx, evt.player) > 0) return true;
						if (playerx.countCards('e') == 1) return true;
						if (playerx.hp - num > 1) return true;
						return get.damageEffect(playerx, playerx, playerx, 'fire') < 0;
					});
				}
				else {
					targets[event.num1].damage('fire', event.onfire, player);
					event.num1++;
					event.redo();
				}
			}
			else {
				event.finish();
			}
			"step 3"
			if (result && result.bool) {
				targets[event.num1].$give(targets[event.num1].getCards('e'), player);
				player.gain(targets[event.num1].getCards('e'));
			}
			else {
				targets[event.num1].damage('fire', event.onfire, player);
				targets[event.num1].say(['此火乘风而来，燎原不绝！', '此火焚尽一切，天地万物！'].randomGet())
			}
			event.num1++;
			event.goto(2);
		},
		ai: {
			order: 1,
			result: {
				player: function (player) {
					var num = 0, players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (player != players[i] && get.damageEffect(players[i], player, players[i], 'fire') < 0) {
							var att = get.attitude(player, players[i]);
							if (att > 0 && !players[i].countCards('e') && !players[i].hasSkillTag('nofire')) {
								num -= 1;
							}
							else if (att < 0 && !players[i].hasSkillTag('nofire')) {
								num += 1;
							}
						}
					}
					if (player.hasSkillTag('nofire')) {
						return num;
					}
					else return num - 1;
				},
			},
		},
	},
	"xjzh_zxzh_shoutao": {
		trigger: {
			player: "gainAfter",
			global: "phaseZhunbeiBegin",
		},
		mod: {
			cardEnabled(card, player) {
				if (get.name(card, player) == 'tao') return false;
			},
		},
		locked: true,
		forced: true,
		priority: -3,
		global: ["xjzh_zxzh_shoutao_ai"],
		group: ["xjzh_zxzh_shoutao_recover"],
		filter(event, player) {
			if (event.name == "gain") {
				return event.cards && event.cards.some(c => c.name == 'tao');
			}
			if (event.name == "phaseZhunbei") {
				return player.countCards("h", { name: "tao" });
			}
			return false;
		},
		async content(event, trigger, player) {
			let cards;
			if (trigger.name == "gain") cards = trigger.cards.filter(c => c.name == 'tao');
			else cards = player.getCards('h', 'tao');

			if (!cards.length) return;
			if (player.isDamaged()) player.recover();
			else {
				player.draw(2, 'nodelay');
				if (player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan', 1, false);
				game.log(player, '将', cards, '移出游戏');
			}
			player.lose(cards, ui.special);
		},
		subSkill: {
			"recover": {
				trigger: {
					global: "recoverAfter",
				},
				forced: true,
				popup: false,
				sub: true,
				async content(event, trigger, player) {
					if (trigger.player == player) {
						if (!player.hasSkill("xjzh_zxzh_shoutao_jin") && player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan', 1, false);
					}
					else {
						if (player.isDamaged()) player.recover(trigger.num);
						else player.draw()
					}
				},
			},
			"ai": {
				ai: {
					nosave: true,
					skillTagFilter: function (player) {
						if (player.countCards("h", "tao")) return false;
					},
				},
			},
			"jin": { sub: true },
		},
	},
	"xjzh_zxzh_taoyuan": {
		locked: true,
		forced: true,
		marktext: "桃",
		intro: {
			name: "桃源",
			content: "mark",
		},
		trigger: {
			player: "dying",
		},
		filter(event, player) {
			return player.hasMark("xjzh_zxzh_taoyuan");
		},
		content: function () {
			"step 0"
			player.addTempSkill("xjzh_zxzh_shoutao_jin", "recoverAfter");
			var num1 = player.countMark("xjzh_zxzh_taoyuan");
			var num2 = player.maxHp - player.hp;
			if (num1 > num2) {
				player.recover(num2);
				player.draw(num1 - num2);
			}
			else {
				player.recover(num1);
			}
			"step 1"
			player.clearMark("xjzh_zxzh_taoyuan");
		},
	},
	"xjzh_zxzh_shoutao_jin": {
		sub: true,
	},
	"xjzh_zxzh_qiwu": {
		enable: "phaseUse",
		locked: true,
		usable: 1,
		check: function (event, player) {
			return player.hp > 1 || player.canSave(player);
		},
		content: function () {
			'step 0'
			player.loseHp();
			player.draw(2);
			event.targets = game.filterPlayer();
			event.targets.remove(player);
			event.targets.sortBySeat();
			player.line(event.targets, 'green');
			event.gained = false;
			'step 1'
			event.target = event.targets.shift();
			event.target.draw();
			event.card = result[0];
			if (event.card.name == 'tao') {
				player.gain(event.target, event.card, 'visible', 'give');
				event.gained = true;
			}
			'step 2'
			if (event.targets.length) {
				event.goto(1);
			}
		},
		ai: {
			order: 12,
		},
	},
	"xjzh_zxzh_leifax": {
		trigger: {
			global: "phaseUseBegin",
		},
		frequent: true,
		locked: true,
		charlotte: true,
		priority: 3,
		superCharlotte: true,
		xjzh_xinghunSkill: true,
		mod: {
			targetEnabled(card, player, target) {
				if (player == target.storage.xjzh_zxzh_leifax_target) return false;
			},
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0;
		},
		prompt(event, player) {
			return "是否对" + get.translation(event.player) + "发动〖雷法〗？";
		},
		filter(event, player) {
			return event.player != player;
		},
		async content(event, trigger, player) {
			let cards = get.cards()[0];
			await player.showCards(cards);
			let suits = get.suit(cards);
			if (suits != "spade") {
				const result = await trigger.player.chooseToDiscard("h", 1, { suit: suits })
					.set('ai', card => {
						if (["tao", "wuzhong"].includes(card.name)) return 0;
						return 8 - get.value(card);
					})
					.set("prompt", `〖雷法〗：请弃置一张花色为${get.translation(suits)}的牌，否则本回合内非锁定技失效`)
					.forResult();
				if (!result?.bool) {
					player.draw();
					trigger.player.addTempSkill("fengyin");
				}
			} else {
				trigger.player.damage(1, "thunder", player);
				player.storage.xjzh_zxzh_leifax_target = trigger.player;
				player.addTempSkill('xjzh_zxzh_leifax_target');
			}
		},
		subSkill: {
			"target": {
				mark: 'character',
				onremove: true,
				sub: true,
				intro: {
					content: '本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
				},
			},
		},
		ai: {
			expose: 0.5,
		},
	},
	"xjzh_zxzh_leifax2": {
		trigger: {
			global: "phaseUseBegin",
		},
		frequent: true,
		locked: true,
		charlotte: true,
		priority: 3,
		superCharlotte: true,
		xjzh_xinghunSkill: true,
		mod: {
			targetEnabled(card, player, target) {
				if (player == target.storage.xjzh_zxzh_leifax_target) return false;
			},
		},
		check(event, player) {
			return get.attitude(player, event.player) < 0;
		},
		prompt(event, player) {
			return "是否对" + get.translation(event.player) + "发动〖雷法〗？";
		},
		filter(event, player) {
			return event.player != player;
		},
		async content(event, trigger, player) {
			let cards = get.cards()[0];
			await player.showCards(cards);
			let suits = get.suit(cards);
			if (suits != "spade") {
				const result = await trigger.player.chooseToDiscard("h", 2, { suit: suits })
					.set('ai', card => {
						if (["tao", "wuzhong"].includes(card.name)) return 0;
						return 8 - get.value(card);
					})
					.set("prompt", `〖雷法〗：请弃置两张花色为${get.translation(suits)}的牌，否则本回合内非锁定技失效`)
					.forResult();
				if (!result?.bool) {
					player.draw();
					trigger.player.addTempSkill("baiban");
				}
			} else {
				trigger.player.damage(2, "thunder", player);
				player.storage.xjzh_zxzh_leifax_target = trigger.player;
				player.addTempSkill('xjzh_zxzh_leifax_target');
			}
		},
		subSkill: {
			"target": {
				mark: 'character',
				sub: true,
				intro: {
					content: '本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
				},
			},
		},
		ai: {
			expose: 0.5,
		},
	},
	//《血色衣冠·朱棣·盛威》
	"xjzh_zxzh_leiyu": {
		forced: true,
		locked: true,
		priority: 69,
		group: ["xjzh_zxzh_leiyu_unmark", "xjzh_zxzh_leiyu_change"],
		trigger: {
			player: "phaseBegin",
			global: "gameDrawBegin",
		},
		mod: {
			suit: function (card, suit) {
				let player = get.player();
				if (!player || !player.storage.xjzh_zxzh_leiyu) return;
				return player.storage.xjzh_zxzh_leiyu;
			},
		},
		intro: {
			content: function (content, player) {
				var str = get.translation(player.storage.xjzh_zxzh_leiyu);
				return '你所有牌花色均视为：' + str;
			},
		},
		marktext: "雷",
		content: function () {
			'step 0'
			player.chooseControl(lib.suit).set('prompt', '请选择一种花色').set('ai', function () {
				return lib.suit.randomGet();
			});
			'step 1'
			var suit = result.control;
			player.chat(get.translation(suit + 2));
			game.log(player, '选择了', '#y' + get.translation(suit + 2));
			player.storage.xjzh_zxzh_leiyu = true;
			player.storage['xjzh_zxzh_leiyu'] = result.control;
			player.storage.xjzh_zxzh_leiyu_unmark = result.control;
			player.markSkill('xjzh_zxzh_leiyu');
		},
		subSkill: {
			"unmark": {
				trigger: {
					player: "phaseBegin",
				},
				sub: true,
				priority: 70,
				forced: true,
				filter: function (event, player) {
					var player = _status.event.player;
					return _status.event.player = player && get.suit(event.card, player) == player.storage.xjzh_zxzh_leiyu;
					;
				},
				content: function () {
					player.storage.xjzh_zxzh_leiyu = false;
					player.unmarkSkill('xjzh_zxzh_leiyu');
					delete player.storage['xjzh_zxzh_leiyu'];
					delete player.storage.xjzh_zxzh_leiyu_unmark;
				},
			},
			"change": {
				trigger: {
					target: "useCardToTargeted",
				},
				sub: true,
				priority: 70,
				forced: true,
				filter: function (event, player) {
					return get.suit(event.card) == player.storage.xjzh_zxzh_leiyu;
				},
				content: function () {
					player.draw();
				},
			},
		},
	},
	"xjzh_zxzh_tianxin": {
		enable: "phaseUse",
		async content(event, trigger, player) {
			let cards = get.cards(player.hp);
			await player.showCards(cards);
			let num = 0;
			let num2 = 0;
			for await (let card of cards) {
				if (get.suit(card) == 'spade') num++;
				else num2++;
			}
			await game.cardsDiscard(cards);
			if (num >= num2) {
				const result = await player.chooseTarget(lib.filter.notMe)
					.set('ai', target => {
						let att = get.attitude(get.player(), target);
						if (att < 0) return -att;
						if (att == 0) return Math.random();
						return att;
					})
					.set("prompt", `〖天心〗：请选择一名角色对其造成${num2}点伤害`)
					.forResult();
				if (result?.bool) {
					let target = result.targets[0];
					target.damage(num, player, "thunder", "nocard");
					player.removeSkill('xjzh_zxzh_tianxin');
					player.removeSkill('xjzh_zxzh_leifax');
					player.addSkill("xjzh_zxzh_leifax2");
				}
			} else {
				await player.damage(1, player, "thunder", "nocard");
				await player.draw(player.getDamagedHp(true));
			}
		},
		ai: {
			order: 2,
			expose: 0.8,
			result: {
				player(player, target, card) {
					return player.hp > 2;
				},
			},
		},
	},
	"xjzh_zxzh_cangjian": {
		trigger: {
			player: ["phaseBegin", "phaseEnd"],
		},
		marktext: "剑",
		intro: {
			markcount: "expansion",
			mark(dialog, storage, player) {
				const cards = player.getExpansions('xjzh_zxzh_cangjian');

				if (!cards?.length) return;

				if (player.isUnderControl(true)) {
					dialog.addText("你收藏的武器<br><br>");
					dialog.addAuto(cards);

					if (storage?.length) {
						const equips = storage.map(name => game.createCard(name));
						dialog.addText("你装备的武器<br><br>");
						dialog.addAuto(equips);
					}
				}
				else {
					return `共有${get.cnNumber(cards.length)}把剑`;
				}
			},
		},
		forced: true,
		locked: true,
		unique: true,
		xjzh_xinghunSkill: true,
		nogainsSkill: true,
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		init(player, skill) {
			let cards = Array.from(ui.cardPile.childNodes).filter(card => get.subtype(card) == 'equip1');
			cards.length ? player.addToExpansion(cards.randomGets(get.rand(5, 9)), player, 'draw').gaintag.add('xjzh_zxzh_cangjian') : null;
			player.disableEquip(1);
			player.storage[skill] = [];
		},
		mod: {
			attackFrom(player, target, range) {
				let num = 0;
				if (player.storage?.xjzh_zxzh_cangjian?.length) {
					let storage = player.storage.xjzh_zxzh_cangjian;
					storage.forEach(card => {
						let info = lib.card[card];
						if (info.distance && info.distance.attackFrom) num += info.distance.attackFrom;
					});
				}
				return range + num;
			},
		},
		filter(event, player) {
			return player.hasExpansions('xjzh_zxzh_cangjian');
		},
		async content(event, trigger, player) {
			let cards = player.getExpansions('xjzh_zxzh_cangjian').randomGet();
			game.cardsGotoOrdering(cards);
			player.showCards(cards);
			game.cardsGotoPile(cards, () => ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
			let skills = get.info(cards, false).skills;
			if (skills?.length) {
				player.addSkill(skills);
				player.storage[event.name].push(get.name(cards, false));
			}
			game.updateRoundNumber();
		},
	},
	"xjzh_zxzh_jiantai": {
		trigger: {
			global: "damageEnd",
		},
		forced: true,
		priority: 3,
		mod: {
			ignoredHandcard(card, player, bool) {
				if (card.hasGaintag('xjzh_zxzh_jiantai')) return true;
			},
			aiValue(player, card, num) {
				if (card.hasGaintag('xjzh_zxzh_jiantai')) return 9.5;
			},
		},
		filter(event, player) {
			if (!player.storage.xjzh_zxzh_cangjian || !player.storage.xjzh_zxzh_cangjian.length) return false;
			if (event.source != player && event.player == player) return true;
			if (event.source == player) return true;
			return false;
		},
		async content(event, trigger, player) {
			let num = player.storage.xjzh_zxzh_cangjian.length ? player.storage.xjzh_zxzh_cangjian.length : 0, cards = get.cards(num + 1);
			player.showCards(cards);
			game.delayx();
			let card = cards.filter(item => get.subtype(item) == 'equip1').length ? cards.filter(item => get.subtype(item) == 'equip1') : cards.filter(item => get.type(item) == 'equip');
			player.gain(card, "gain2", "log", player).gaintag.add(event.name);
		},
	},
	"xjzh_zxzh_yujian": {
		enable: ["chooseToUse", "chooseToRespond"],
		hiddenCard(player, name) {
			if (!["basic", "trick"].includes(get.type(name))) return false;
			return player.countCards("hs", card => card.hasGaintag("xjzh_zxzh_jiantai")) && lib.inpile.includes(name);
		},
		filter(event, player) {
			if (!player.countCards("hs", card => card.hasGaintag("xjzh_zxzh_jiantai"))) return false;
			return get.inpileVCardList(info => {
				const name = info[2];
				if (!["basic", "trick"].includes(get.type(name))) return false;
				return true;
			}).some(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));
		},
		chooseButton: {
			dialog(event, player) {
				const list = get.inpileVCardList(info => {
					const name = info[2];
					if (!["basic", "trick"].includes(get.type(name))) return false;
					return true;
				}).filter(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));

				let dialog = ui.create.dialog('〖御剑〗: 请选择你要使用的牌', 'hidden');
				if (list.some(name => get.type(name[2]) == 'basic')) {
					dialog.add('基本牌');
					dialog.add([list.filter(name => get.type(name[2]) == 'basic'), 'vcard']);
				}

				if (list.some(name => get.type(name[2]) == 'trick')) {
					dialog.add('锦囊牌');
					dialog.add([list.filter(name => get.type(name[2]) == 'trick'), 'vcard']);
				}

				return dialog
			},
			check(button) {
				if (get.event().getParent().type != "phase") return 1;
				return get.event("player").getUseValue({
					name: button.link[2],
					nature: button.link[3],
				});
			},
			backup(links, player) {
				return {
					filterCard: card => card.hasGaintag("xjzh_zxzh_jiantai"),
					complexCard: true,
					position: "hs",
					selectCard: 1,
					popname: true,
					viewAs: {
						name: links[0][2],
						nature: links[0][3],
					},
					ai1: (card) => 7 - get.value(card),
				};
			},
			prompt(links, player) {
				return "〖御剑〗：将一张“剑胎”牌当作" + get.translation(links[0][3] || "") + "【" + get.translation(links[0][2]) + "】使用/打出";
			},
		},
		ai: {
			order: 7,
			respondSha: true,
			respondShan: true,
			combo: "xjzh_zxzh_jiantai",
			skillTagFilter(player, tag, arg) {
				if (arg == "respond") return false;
				const name = tag == "respondSha" ? "sha" : "shan";
				return get.info("xjzh_zxzh_yujian").hiddenCard(player, name);
			},
			result: {
				player: 1,
			},
		},
	},
	"xjzh_zxzh_shiqiao": {
		trigger: {
			global: ['loseAfter', 'cardsDiscardAfter'],
		},
		filter(event, player) {
			return event.cards && event.cards.filter(function (card) {
				return get.position(card, true) == 'd';
			}).length > 0;
		},
		forced: true,
		locked: true,
		priority: 6,
		init(player) {
			let num = get.rand(1, 5);
			if (!player.storage.xjzh_zxzh_shiqiao) player.storage.xjzh_zxzh_shiqiao = []
			while (player.storage.xjzh_zxzh_shiqiao.length < num) {
				let num2 = get.rand(1, 13);
				if (!player.storage.xjzh_zxzh_shiqiao.includes(num2)) player.storage.xjzh_zxzh_shiqiao.push(num2);
			}
		},
		mark: true,
		marktext: "樵",
		intro: {
			markcount(storage, player) {
				if (!storage) return;
				return storage.length;
			},
			content(storage, player) {
				let str = "已记录点数：";
				for (let i = 0; i < storage.length; i++) {
					if (storage[i] != storage[storage.length - 1]) {
						str += "" + get.translation(storage[i]) + "、";
					} else {
						str += "" + get.translation(storage[i]) + "";
					}
				}
				return str;
			},
		},
		mod: {
			aiOrder(player, card, num) {
				if (!player.storage.xjzh_zxzh_shiqiao) return;
				let list = player.storage.xjzh_zxzh_shiqiao.slice(0);
				if (get.number(card) == list[0]) return num + 3.5;
			},
		},
		async content(event, trigger, player) {
			let cards = trigger.cards
			while (cards.length) {
				let storage = player.storage.xjzh_zxzh_shiqiao;
				let card = cards.pop().fix();
				game.cardsGotoPile(card, () => {
					return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
				});
				//ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
				let number = get.number(card);
				if (storage.includes(number)) {
					let card2 = get.cardPile(cardx => {
						return get.number(cardx) != number;
					});
					if (card2) {
						player.gain(card2, player, "draw");
					}
					storage.removeArray(storage.filter(index => {
						return index == number;
					}));
					game.log(player, "移除了点数", number, "获得了", card2);
					if (storage.length == 0) {
						lib.skill.xjzh_zxzh_shiqiao.init(player);
					}
				}
			}
		},
	},
	"xjzh_zxzh_baoxin": {
		trigger: {
			player: ['phaseDrawBegin', 'phaseDiscardBegin'],
		},
		filter(event, player) {
			if (!player.storage.xjzh_zxzh_shiqiao || !player.storage.xjzh_zxzh_shiqiao.length) return false;
			return true;
		},
		forced: true,
		locked: true,
		priority: 6,
		group: ["xjzh_zxzh_baoxin_use"],
		async content(event, trigger, player) {
			trigger.cancel(null, null, 'notrigger');
			let list = [], list2 = [];
			while (list.length < 13) {
				let cardPilex = Array.from(ui.cardPile.childNodes);
				let cards = cardPilex.randomGet()
				list.push(cards);
				cardPilex.remove(cards);
			};
			player.showCards(list);
			let storage = player.storage.xjzh_zxzh_shiqiao.slice(0);
			for (let i of list) {
				if (storage.includes(get.number(i))) {
					list.remove(i);
					list2.push(i);
				}
			}
			if (list2.length) {
				player.gain(list2, player, "draw")._triggered = null;
			}
			let str = `跳过了${get.translation(trigger.name)}${list2.length ? "摸了" : ""}${list2.length}张牌`;
			game.cardsDiscard(list);
			game.log(player, str);
		},
		subSkill: {
			"use": {
				trigger: {
					player: "useCard",
				},
				forced: true,
				priority: 6,
				sub: true,
				check: () => 1,
				filter(event, player) {
					if (!player.storage.xjzh_zxzh_shiqiao || !player.storage.xjzh_zxzh_shiqiao.length) return false;
					let storage = player.storage.xjzh_zxzh_shiqiao.slice(0);
					if (!event.cards || !event.cards.length) return false;
					if (!storage.includes(get.number(event.cards[0]))) return false;
					if (event.getParent().name == "xjzh_zxzh_baoxin_use") return false
					if (get.type(event.cards[0]) == "equip" || get.type(event.cards[0]) == "delay") return false;
					return true;
				},
				async content(event, trigger, player) {
					let controlList = [
						`移除点数${get.number(trigger.cards[0])}摸两张牌`,
						`移除点数${get.number(trigger.cards[0])}令${get.translation(trigger.cards[0])}额外结算一次`,
					], storage = player.storage.xjzh_zxzh_shiqiao;
					const result = await player.chooseControlList(get.prompt(event.name, player), controlList, true)
						.set('ai', () => {
							let player = get.player();
							if (player.countCards('h') <= 1) return 0;
							return 1;
						})
						.forResult();
					storage.remove(get.number(trigger.cards[0]));
					if (result?.index == 1) {
						trigger.effectCount++
						game.log(trigger.cards[0], '额外结算1次');
					} else player.draw(2);
					if (storage.length == 0) lib.skill.xjzh_zxzh_shiqiao.init(player);
				},
			},
		},
	},
	"xjzh_zxzh_moyu": {
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		check: () => 1,
		prompt: "〖默语〗：是否进行一次判定？",
		async content(event, trigger, player) {
			const result = await player.judge(card => {
				if (get.suit(card) == 'heart') return 2;
				if (get.suit(card) == 'spade') return 1;
				return -1;
			})
				.set("judge2", result => result.bool)
				.forResult();
			if (result?.judge < 0) return;
			let text, num;
			switch (result.judge) {
				case 2:
					text = "〖默语〗：选择一名角色与其交换体力值与体力上限";
					num = 1;
					break;
				case 1:
					text = "〖默语〗：选择两名角色令其交换技能";
					num = 2;
					break;
			};
			const result2 = await player.chooseTarget(num, (card, player, target) => {
				if (num == 1) return target != player;
				return true;
			})
				.set("prompt", text)
				.set('ai', target => {
					let att = get.attitude(player, target);
					let judge = result.judge;
					if (judge == 2) {
						if (att < 0) return target.maxHp > player.maxHp || target.hp > player.hp;
						if (att > 0) return 0.5;
					} else {
						return 0.5;
					}
				}).set('num', num)
				.forResult();
			if (result2?.targets) {
				let targets = result2.targets;
				if (targets.length > 1) {
					let skills = targets[0].getSkills(null, false, false).filter(skill => {
						let info = get.info(skill);
						if (!info || !lib.translate[skill] || lib.translate[skill] == '' || !lib.translate[skill + '_info'] || lib.translate[skill + '_info'] == '' || info.equipSkill || info.cardSkill || info.temp || info.sub) return false;
						return true;
					});
					let skills2 = targets[1].getSkills(null, false, false).filter(skill => {
						let info = get.info(skill);
						if (!info || !lib.translate[skill] || lib.translate[skill] == '' || !lib.translate[skill + '_info'] || lib.translate[skill + '_info'] == '' || info.equipSkill || info.cardSkill || info.temp || info.sub) return false;
						return true;
					});
					targets[0].changeSkills(skills2, skills);
					targets[1].changeSkills(skills, skills2);
				} else {
					player.swapMaxHp(targets[0]);
				}
			}
		},
	},
	"xjzh_zxzh_zhenwen": {
		trigger: {
			global: "changeSkillsEnd",
		},
		usable(skill, player) {
			return game.roundNumber;
		},
		prompt(event, player) {
			let str = "〖真纹〗："
			let skills = event.addSkill;
			let skillsLocked = skills.filter(skill => {
				return get.is.locked(skill);
			});
			let skillsnoLocked = skills.filter(skill => {
				return !get.is.locked(skill);
			});
			if (skillsLocked.length) str += `是否令${get.translation(event.player)}失去${skillsLocked.map(i => {
				return '【' + get.translation(i) + '】';
			})}并摸两张牌`;
			if (skillsnoLocked.length) str += `或者将获得技能${skillsnoLocked.map(i => {
				return '【' + get.translation(i) + '】';
			})}的角色改为你`;
			return str;
		},
		check(event, player) {
			let att = get.attitude(player, event.player);
			return -att;
		},
		filter(event, player) {
			if (!event.addSkill.length) return false;
			if (event.getParent().name == "chooseCharacter") return false;
			if (event.getParent("xjzh_zxzh_zhenwen").name == "xjzh_zxzh_zhenwen") return false;
			let skills = event.addSkill.slice(0).filter(skill => {
				let info = get.info(skill);
				if (!info || !lib.translate[skill] || lib.translate[skill] == '' || !lib.translate[skill + '_info'] || lib.translate[skill + '_info'] == '' || info.equipSkill || info.cardSkill || info.temp || info.sub) return false;
				if (lib.skill.global.includes(skill)) return false;
				if (player.getStockSkills().includes(skill)) return false;
				if (skill === "xjzh_zxzh_zhenwen") return false;
				return true;
			});
			if (!skills.length) return false;
			return true;
		},
		async content(event, trigger, player) {
			let skills = trigger.addSkill.slice(0);
			skills.forEach(skill => {
				if (get.is.locked(skill)) {
					trigger.player.removeSkill(skill, true)
					trigger.player.draw(2);
				} else {
					trigger.player.removeSkill(skill, true);
					player.addSkillLog(skill);
				}
			});
		},
	},
	"xjzh_zxzh_jinyan": {
		trigger: {
			global: ["logSkill", 'useSkill'],
		},
		prompt(event, player) {
			var str = "〖禁言〗：是否禁用" + get.translation(event.player) + "的技能〖" + get.translation(event.skill) + "〗直到下个回合开始？";
			return str;
		},
		usable: 1,
		filter(event, player) {
			let skill = get.sourceSkillFor(event);
			let info = get.info(get.sourceSkillFor(event));
			if (skill == 'xjzh_zxzh_jinyan') return false;
			if (!info || !get.skillTranslation(skill) || info.equipSkill || info.cardSkill || info.temp || info.sub || info.juexingji || info.dutySkill || info.limited) return false;
			if (lib.skill.global.includes(event.skill)) return false;
			if (event.player == player) return false;
			if (game.roundNumber == 0) return false;
			if (!player.countCards('hs')) return false;
			return true;
		},
		check(event, player) {
			let att = get.attitude(player, event.player);
			return -att;
		},
		async content(event, trigger, player) {
			const result = await player.chooseToDiscard('hs', 1, get.prompt2(event.name))
				.set('ai', card => {
					let att = get.attitude(player, trigger.player);
					if (att > 0) return 0;
					return 8 - get.value(card);
				})
				.forResult();
			if (result?.bool) trigger.player.tempBanSkill(get.sourceSkillFor(trigger), { player: 'phaseBegin' });
		},
	},

};