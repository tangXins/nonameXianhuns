import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	"xjzh_boss_material": {
		silent: true,
		firstDo: true,
		fixed: true,
		charlotte: true,
		locked: true,
		superCharlotte: true,
		priority: Infinity,
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = player.getOriginalSkills();
			var qishuRemove = window.setInterval(function () {
				for (var skills of player.storage[skill]) {
					if (!player.hasSkill(skills)) {
						if (skills == "xjzh_boss_material") {
							window.clearInterval(qishuRemove);
						};
						player.addSkill(skills);
					};
				}
			}, 1000);

			let dieFunc = player.die;
			player.die = () => {
				if (player.getHp(true) > 0) {
					game.log(`检测到${get.translation(player)}的体力值大于0，已为其终止阵亡结算`);
					return;
				}
				let die = dieFunc.apply(player, arguments);
				return die;
			};
		},
		async content(event, trigger, player) { },
	},
	"xjzh_qishu_shouyu": {
		mod: {
			targetEnabled(card) {
				if (get.type(card) == 'delay') return false;
			},
		},
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		forced: true,
		locked: true,
		priority: 3,
		filter(event, player) {
			if (event.player == player) return false;
			let cards = lib.inpile.filter(card => {
				return get.type(card) == "delay";
			});
			if (event.player.countCards("j", card => {
				return cards.includes(card.name);
			}) == cards.length) return false;
			return true;
		},
		async content(event, trigger, player) {
			let cards = lib.inpile.filter(card => {
				return get.type(card) == "delay" && !trigger.player.countCards('j', { name: card });
			});
			if (cards.length) {
				trigger.player.executeDelayCardEffect(cards.randomGet());
			}
		},
	},
	"xjzh_qishu_shendong": {
		trigger: {
			source: "damageBegin1",
		},
		forced: true,
		locked: true,
		priority: 3,
		filter(event, player) {
			return !game.hasNature(event, "ice");
		},
		async content(event, trigger, player) {
			game.setNature(trigger, "ice");
		},
		subSkill: {
			"use": {
				enable: "phaseUse",
				usable: 1,
				prompt() {
					return "〖深冻〗：选择一名对你造成过伤害的角色，令其弃置x张牌，每少弃置一张牌失去一点体力上限（x为其对你造成伤害的次数）。";
				},
				filter(event, player) {
					let history = player.getAllHistory('damage');
					return history.length;
				},
				filterTarget(card, player, target) {
					return target.getAllHistory('sourceDamage', evt => {
						return evt && evt.player == player;
					}).length;
				},
				async content(event, trigger, player) {
					let target = event.targets[0];
					let history = target.getAllHistory('sourceDamage', evt => {
						return evt && evt.player == player;
					});
					let history2 = player.getAllHistory('damage', evt => {
						return evt && evt.source == target;
					});
					const result = await target.chooseToDiscard([1, history.length], 'he')
						.set('ai', card => 6 - get.value(card))
						.set("prompt", `〖深冻〗：请选择弃置至多${history.length}张牌，否则失去等量体力上限`)
						.forResult();
					if (result?.bool && result?.cards.length < history.length) {
						target.loseMaxHp(history.length - result.cards.length);
						await target.getHistory('sourceDamage').removeArray(history);
						await player.getHistory('damage').removeArray(history2);
					}
				},
			},
		},
	},
	"xjzh_qishu_feimou": {
		trigger: {
			player: "damageEnd",
		},
		forced: true,
		locked: true,
		priority: 3,
		filter(event, player) {
			if (event.source == player) return false;
			return event.source.countCards('h');
		},
		async content(event, trigger, player) {
			let cards = trigger.source.getCards('h');
			player.gain(cards, trigger.source, 'draw');
			let num = get.rand(0, cards.length);
			if (num > 0) {
				let card = cards.randomRemove(num);
				trigger.source.gain(card, player, 'draw');
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	"xjzh_boss_shilian": {
		trigger: { player: 'dieBegin' },
		forced: true,
		priority: -10,
		fixed: true,
		unique: true,
		filter(event, player) {
			if (get.mode() != 'xjzh_challenge') return false;
			return event.player == game.boss;
		},
		async content(event, trigger, player) {
			let list = ["xjzh_boss_yinaruisi", "xjzh_boss_masayier", "xjzh_boss_taernasha"];
			if (!list.filter(name => {
				return get.is.playerNames(trigger.player, name);
			}).length) trigger.cancel(null, null, 'notrigger');

			await game.delay();

			game.filterPlayer2().forEach(player => {
				if (player.isDead()) {
					player.revive(player.maxHp);
				} else {
					player.recoverTo(player.maxHp);
				}

				player.removeEquipTrigger();
				player.discard(player.getCards('hej'))._triggered = null;

				player.hujia = 0;

				player.turnOver(false);
				player.removeLink();
				player.directgain(get.cards(4));
			});

			if (get.is.playerNames(game.boss, "xjzh_boss_datianshi")) {
				await game.changeBoss('xjzh_boss_gaotianshi');
				let targets = game.filterPlayer(current => current.side && game.boss !== current);
				for await (let target of targets) {
					target.changeCharacter(["xjzh_boss_datianshi"]);
				}
			}
			else if (get.is.playerNames(game.boss, "xjzh_boss_gaotianshi")) {
				await game.changeBoss('xjzh_boss_tianshizhang');
				let targets = game.filterPlayer(current => current.side && game.boss !== current);
				for await (let target of targets) {
					target.changeCharacter(["xjzh_boss_gaotianshi"]);
				}
			}
			else if (get.is.playerNames(game.boss, "xjzh_boss_tianshizhang")) {
				if (get.xjzh_checkTime("8:00", "12:00") || get.xjzh_checkTime("20:00", "24:00")) {
					await game.changeBoss('xjzh_boss_yinaruisi');
					let targets = game.filterPlayer(current => current.side && game.boss !== current);
					for await (let target of targets) {
						target.changeCharacter(["xjzh_boss_tianshizhang"]);
					}
				}
				else if (get.xjzh_checkTime("12:00", "16:00") || get.xjzh_checkTime("0:00", "4:00")) {
					let nameList = ['xjzh_boss_duohunzhe', 'xjzh_boss_duotianshi'], num = 0
					await game.changeBoss('xjzh_boss_masayier');
					let targets = game.filterPlayer(current => current.side && game.boss !== current);

					for await (let target of targets) {
						target.changeCharacter([nameList[num]]);
						num++;
					}
				}
				else {
					await game.changeBoss('xjzh_boss_taernasha');
					let targets = game.filterPlayer(current => current.side && game.boss !== current);
					for await (let target of targets) {
						target.changeCharacter(["xjzh_boss_shachong"]);
					}
				}
			}

			game.delay(0.5);

			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(1, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (event, option) => {
							if (event.step != 13) {
								event.step = 13;
								game.broadcastAll((player) => {
									player.classList.remove("glow_phase");
									if (_status.currentPhase) {
										game.log(_status.currentPhase, "结束了回合");
										delete _status.currentPhase;
									}
								}, event.player);
							}
						});
					}
					evt.finish();
					evt._triggered = null;
					evt = evt.getParent(1, true);
				}
				else break;
			}

			evt = trigger.getParent("phase", true, true);
			if (evt.phaseList.some(i => i.startsWith("phaseJieshu"))) {
				await evt.player.phaseJieshu();
			}

			_status.paused = false;
			game.resetSkills();
			_status.paused = false;
			_status.event.player = game.boss;
			_status.event.step = 0;
			_status.roundStart = game.boss;
			game.phaseNumber = 0;
			game.roundNumber = 0;
			if (game.bossinfo) {
				game.bossinfo.loopType = 1;
			}

		}
	},
	"xjzh_boss_xiaoshenghui": {
		trigger: {
			player: "phaseDrawBegin",
		},
		forced: true,
		locked: true,
		priority: 5,
		async content(event, trigger, player) {
			trigger.num += 2;
			player.recover();
		},
	},
	"xjzh_boss_dashenghui": {
		trigger: {
			player: ["phaseDrawBegin", "phaseJieshuBegin"],
		},
		forced: true,
		locked: true,
		priority: 5,
		async content(event, trigger, player) {
			let targets = player.getFriends(true).sortBySeat();
			for await (let target of targets) {
				target.recover();
				target.draw(2);
			}
		},
	},
	"xjzh_boss_chiyan": {
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		prompt: "〖炽焰〗：选择一名其他角色令其展示所有手牌。",
		async content(event, trigger, player) {
			let target = event.target;
			await target.showHandcards();

			let cards = target.getCards('h', card => get.suit(card) == "diamond");
			while (cards.length) {
				cards.shift();
				player.useCard({ name: "sha", nature: "fire", isCard: true }, target).set("addCount", false);
				game.delay();
			}

		},
		ai: {
			order: 12,
			result: {
				target(player, target, card) {
					if (get.damageEffect(target, player, player, 'fire')) return -1;
					return 0;
				},
			},
		},
	},
	"xjzh_boss_gaoshenghui": {
		trigger: {
			player: ["drawBegin", "recoverBegin"],
		},
		forced: true,
		locked: true,
		priority: 5,
		filter(event, player) {
			if (event.name == "recover") {
				return game.countPlayer(current => current.isDamaged()) >= 1;
			}
			return true;
		},
		async content(event, trigger, player) {
			let num = trigger.num;
			const result = await player.chooseTarget(lib.filter.notMe)
				.set('ai', target => get.attitude(player, target))
				.set("prompt", `〖圣辉〗：请选择一名其他角色${trigger.name == "draw" ? `摸${num}张牌` : `回复${num}点体力`}`)
				.forResult();
			if (result?.targets) result.targets[0][trigger.name](num);
			player.changeHujia(1);
		},
	},
	"xjzh_boss_caijue": {
		enable: "phaseUse",
		usable: 1,
		filter: (event, player) => player.countCards('h') > 0,
		async content(event, trigger, player) {
			let targets = player.getEnemies().sortBySeat().filter(target => target.countCards('h'));

			while (targets.length) {
				let target = targets.shift();
				const result = await target.chooseCard(true)
					.set("prompt", "〖裁决〗:选择展示一张牌")
					.set('ai', card => 6 - get.value(card))
					.forResult();
				target.showCards(result.cards);
				game.delay();

				const result2 = await player.chooseToDiscard("he", { suit: get.suit(result.cards[0]) })
					.set('ai', card => {
						if (get.damageEffect(target, player, player, 'thunder') > 0) return 6.2 + Math.min(4, target.hp) - get.value(card, target);
						return 0;
					})
					.set("prompt", `〖裁决〗:请弃置一张花色为${get.translation(get.suit(result.cards[0]))}的牌`)
					.forResult();
				if (result2?.bool) {
					target.damage(1, player, 'thunder', 'nocard');
					player.draw();
				}

			}
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_boss_zhangshenghui": {
		trigger: {
			player: ["phaseDiscardBefore", "useCard"],
		},
		forced: true,
		locked: true,
		priority: 5,
		mod: {
			ignoredHandcard(card, player) {
				return true;
			},
		},
		filter(event, player) {
			let type = get.type(event.card);
			if (!["basic", "trick"].includes(type)) return false;
			if (get.name(event.card, player) == "tiesuo") return false;
			return player.isPhaseUsing()
		},
		async content(event, trigger, player) {
			let num = player.getDamagedHp() || 1;
			trigger.effectCount += num;
			game.log(trigger.card, '额外结算' + num + '次');
		},
	},
	"xjzh_boss_dacaijue": {
		enable: "phaseUse",
		usable: 1,
		filter: (event, player) => player.countCards('h') > 0,
		filterCard: true,
		lose: false,
		discard: false,
		delay: false,
		async content(event, trigger, player) {
			let targets = player.getEnemies().sortBySeat(), card = event.card;
			player.showCards(card);
			for await (let target of targets) {
				const { result: { bool } } = target.countCards("h") == 0 ? { result: { bool: false } } : await target.chooseToDiscard("h", { suit: get.suit(card) }, `〖裁决〗:请弃置一张花色为${get.translation(get.suit(card))}的牌`).set('ai', card => {
					if (get.damageEffect(target, player, target, 'thunder') > 0) return 6.2 + Math.min(4, target.hp) - get.value(card, target);
					return 0;
				});
				if (!bool) target.damage(1, player, 'thunder', 'nocard');
			}

		},
		async contentAfter(event, trigger, player) {
			let targets = player.getEnemies().sortBySeat()
			if (targets.every(item => item.countCards("h"))) return;
			for await (let target of targets) {
				if (!target.countCards("h")) target.damage(1, player, 'thunder', 'nocard');
			}
		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_boss_shenyou": {
		locked: true,
		charlotte: true,
		mode: ["boss"],
		global: ["xjzh_boss_shenyou_use", "xjzh_boss_shenyou_damage"],
		trigger: {
			target: "useCardToTargeted",
			player: "damageBegin1",
		},
		filter(event, player, name) {
			if (name == "damageBegin1") {
				if (!get.is.damageCard(event.card)) return false;
				if (!game.boss.getFriends(true).includes(player)) return false;
				return get.xjzh_deEffect(player);
			}
			if (name == "useCardToTargeted") {
				if (!game.boss.getFriends(true).includes(player)) return false;
				if (!game.hasNature(event)) return false;
				return !get.xjzh_deEffect(player);
			}
			return false;
		},
		async content(event, trigger, player) {
			let name = event.triggername;
			if (name == "damageBegin1") {
				trigger.changeToZero();
			} else {
				let eff = get.effect(player, trigger.card, trigger.player, trigger.player);
				const result = await trigger.player.chooseToDiscard()
					.set('ai', card => {
						if (get.event().eff > 0) return 10 - get.value(card);
						return 0;
					})
					.set("prompt", `〖神佑〗：弃置一张手牌，否则${get.translation(trigger.card)}对 ${get.translation(player)}无效`)
					.set('eff', eff).forResult();
				if (!result?.bool) {
					trigger.getParent().excluded.add(player);
				}
			}
		},
		ai: {
			effect: {
				target_use(card, player, target, current) {
					if (get.is.damageCard(card) && get.attitude(player, target) < 0) {
						if (!game.boss.getFriends(true).includes(target)) return;
						if (!get.xjzh_deEffect(target)) return;
						if (_status.event.triggername == 'useCardToTargeted') return;
						if (get.attitude(player, target) > 0 && current < 0) return 'zerotarget';
						let bs = player.getCards('h');
						bs.remove(card);
						if (card.cards) bs.removeArray(card.cards);
						else bs.removeArray(ui.selected.cards);
						if (!bs.length) return 'zerotarget';
						if (player.hasSkill('jiu') || player.hasSkill('tianxianjiu')) return;
						if (bs.length <= 2) {
							for (let i = 0; i < bs.length; i++) {
								if (get.value(bs[i]) < 7) {
									return [1, 0, 1, -0.5];
								}
							}
							return [1, 0, 0.3, 0];
						}
						return [1, 0, 1, -0.5];
					}
				},
				target(card, player, target) {
					if (!game.boss.getFriends(true).includes(target)) return;
					if (!get.xjzh_deEffect(target)) return;
					if (get.tag(card, 'natureDamage')) return [0, 0];
				},
			},
		},
	},
	"xjzh_boss_fusu": {
		trigger: {
			player: "loseAfter",
			global: ["useCardEnd", "recoverEnd"],
		},
		forced: true,
		locked: true,
		priority: 5,
		filter(event, player) {
			if (event.name == "lose" && event.cards.some(card => get.color(card) == "red")) return true;
			if (_status.currentPhase == player) return false;
			if (event.player == player) return false;
			if (event.player.isDead()) return false;
			if (event.name == "useCard") {
				if (!event.cards || !event.cards.length) return false;
				if (get.suit(event.cards[0]) != "heart") return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			if (trigger.name == "lose") {
				if (player.isHealthy()) player.draw();
				else player.recover();
			} else {
				const result = await player.chooseBool()
					.set('ai', () => { return -get.attitude(player, trigger.player); })
					.set("prompt", `〖复苏〗：是否视为对${get.translation(trigger.player)}使用一张【杀】`)
					.forResult();
				if (result?.bool) {
					let cards = game.createCard("sha", null, null, null);
					await player.useCard(cards, trigger.player, false);
					let history = player.getHistory('sourceDamage', evt => {
						return evt && evt.cards[0] == cards && evt.getParent(3).name == "xjzh_boss_fusu" && evt.player == trigger.player;
					});
					if (history.length && trigger.player.countCards('he')) player.gain(trigger.player.getCards('he'), trigger.player, 'gain2', 'log')._triggered = null;
				}
			}
		},
	},
	"xjzh_boss_ganran": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		locked: true,
		priority: 5,
		marktext: "感染",
		intro: {
			name: "感染",
			content: "#",
		},
		global: "xjzh_boss_ganran_buff",
		group: "xjzh_boss_ganran_use",
		addMark(player) {
			let num = player.countMark("xjzh_boss_ganran");
			if (num >= 3) player.addSkill("fengyin");
			else player.removeSkill("fengyin", true);
		},
		filter(event, player) {
			return !event.numFixed;
		},
		async content(event, trigger, player) {
			trigger.player.addMark("xjzh_boss_ganran", 1);
			lib.skill.xjzh_boss_ganran.addMark(trigger.player);
		},
		subSkill: {
			"buff": {
				trigger: {
					player: ["phaseDrawBegin", "damageBegin", "phaseUseBegin"],
				},
				direct: true,
				priority: 10,
				sub: true,
				filter(event, player) {
					return player.hasMark("xjzh_boss_ganran");
				},
				async content(event, trigger, player) {
					let name = trigger.name, num = player.countMark("xjzh_boss_ganran");
					switch (name) {
						case "phaseDraw":
							if (num >= 1) {
								trigger.num -= 1;
								game.log(player, "被齐尔领主感染，摸牌数减一");
							}
							break;
						case "damage":
							if (num >= 2 && trigger.source == game.findPlayer(i => get.is.playerNames(i, 'xjzh_boss_qier'))) {
								trigger.num++;
								game.log(player, "被齐尔领主感染，受到齐尔领主的伤害加一");
							}
							break;
						case "phaseUse":
							if (num >= 4) {
								trigger.cancel();
								game.log(player, "被齐尔领主感染，跳过了出牌阶段");
							}
							break;
					};
				},
			},
			"use": {
				enable: "phaseUse",
				usable: 1,
				filter(event, player) {
					return game.countPlayer(p => p.hasMark('xjzh_boss_ganran'));
				},
				filterTarget(card, player, target) {
					if (ui.selected.targets.length) return true;
					return target.countMark('xjzh_boss_ganran');
				},
				selectTarget: 2,
				prompt: "〖感染〗：请选择两名角色移动其中一名角色的“感染”标记",
				targetprompt: ['失去标记', '获得标记'],
				multitarget: true,
				async content(event, trigger, player) {
					let targets = event.targets.slice(0);
					targets[0].removeMark('xjzh_boss_ganran', 1);
					targets[1].addMark('xjzh_boss_ganran', 1);
					targets[1].loseHp();
					lib.skill.xjzh_boss_ganran.addMark(targets[0]);
					lib.skill.xjzh_boss_ganran.addMark(targets[1]);
				},
				ai: {
					order: 8,
					expose: 0.3,
					result: {
						target(player, target, card) {
							if (ui.selected.targets.length == 0) return 1;
							return -1;
						}
					},
				},
			},
		},
	},
	"xjzh_boss_xuezhou": {
		trigger: {
			global: ["phaseAfter", "drawBegin",]
		},
		forced: true,
		locked: true,
		priority: 3,
		filter: function (event, player) {
			if (event.name == "draw") return event.player == player;
			return event.player.hasMark('xjzh_boss_ganran');
		},
		content: function () {
			"step 0"
			if (trigger.name == "draw") {
				event.goto(2);
				return;
			}
			trigger.player.removeMark("xjzh_boss_ganran", 1);
			"step 1"
			lib.skill.xjzh_boss_ganran.addMark(trigger.player);
			"step 2"
			var num = 0;
			for (var target of game.players) {
				if (!target.hasMark("xjzh_boss_ganran")) continue;
				num += Math.max(0, target.countMark("xjzh_boss_ganran") - target.hp);
			}
			trigger.num += num;
		},
	},
	"xjzh_boss_dianmao": {
		trigger: {
			player: 'useCardToPlayer',
			target: 'useCardToTarget',
		},
		forced: true,
		locked: true,
		priority: 3,
		filter: function (event, player) {
			if (event.getParent('xjzh_boss_dianmao').name == "xjzh_boss_dianmao") return false;
			if (!get.is.damageCard(event.cards[0])) return false;
			if (event.target == player && event.player != player) {
				return event.player.countCards('h') > 0;
			}
			if (event.player == player && event.target != player) {
				return event.target.countCards('h') > 0;
			}
			return false;
		},
		content: function () {
			"step 0"
			if (trigger.target == player && trigger.player != player) {
				event.targets = trigger.player;
			}
			else if (trigger.target != player && trigger.player == player) {
				event.targets = trigger.target;
			}
			"step 1"
			player.chooseCardButton(event.targets.getCards('h')).set('ai', function (button) {
				if (get.suit(button.link) == "spade") return 1;
				return 0;
			});
			"step 2"
			if (result.bool) {
				player.showCards(result.links[0]);
				var card = result.links[0];
				if (get.suit(card) == "spade") {
					event.targets.discard(card);
					player.useCard({ name: "sha", nature: "thunder" }, event.targets, false).set('addCount', false);
				}
			}
		},
	},
	"xjzh_boss_dianchong": {
		trigger: {
			global: "damageAfter",
			source: "damageSource",
		},
		direct: true,
		locked: true,
		priority: 3,
		mark: true,
		intro: {
			name: "电冲",
			content: "#",
		},
		filter(event, player, name) {
			if (name == "damageSource") {
				return player.hasMark('xjzh_boss_dianchong');
			}
			if (name == "damageAfter") {
				if (!game.hasNature(event, 'thunder')) return false;
				if (event.source && event.source == player) return true;
				if (event.source != player && event.player == player) return true;
				return false;
			}
			return false;
		},
		async content(event, trigger, player) {
			if (event.triggername == "damageSource") {
				let num = 2 * (player.countMark('xjzh_boss_dianchong') / 100);
				game.xjzh_criticalStrike({ event, trigger, player }, num);
			} else {
				let target;
				if (trigger.source == player && trigger.player != player) {
					target = trigger.player;
				}
				else if (trigger.source != player && trigger.player == player) {
					target = trigger.source;
				}
				player.addMark('xjzh_boss_dianchong', trigger.num);
				if (target) target.xjzh_changeBuff("gandian", 1);
			}
		},
	},
	"xjzh_boss_dianhua": {
		enable: "phaseUse",
		filter: function (event, player) {
			return player.hasMark('xjzh_boss_dianchong');
		},
		group: "xjzh_boss_dianhua_phase",
		content: function () {
			"step 0"
			player.removeMark("xjzh_boss_dianchong", 1);
			"step 1"
			var cards = get.cards()[0];
			player.showCards(cards);
			if (get.suit(cards) != "spade") {
				player.gain(cards, 'gain2', 'log');
				event.finish();
				return;
			}
			"step 2"
			player.chooseTarget("〖电花〗：对一名角色造成1点雷属性伤害", function (card, player, target) {
				return target != player;
			}).set('ai', function (card, player, target) {
				return get.damageEffect(target, player, player, 'thunder');
			});
			"step 3"
			if (result.bool) {
				result.targets[0].damage(player, 1, 'nocard', 'thunder');
			}
		},
		subSkill: {
			"phase": {
				trigger: {
					global: ["phaseDrawBegin", "phaseUseBegin"],
				},
				forced: true,
				sub: true,
				priority: 10,
				filter: function (event, player) {
					if (get.xjzh_buffNum(event.player, "gandian") > 0) {
						var num = player.countMark('xjzh_boss_dianchong') / 100;
						if (Math.random() <= num) return true;
					}
					return false;
				},
				content: function () {
					"step 0"
					trigger.cancel(null, null, 'notrigger')
					"step 1"
					player[trigger.name]();
				},
			},
		},
		ai: {
			order: function () {
				let player = get.player();
				return player.countMark('xjzh_boss_dianchong');
			},
			result: {
				player: function (player, target) {
					var num = player.countMark('xjzh_boss_dianchong');
					if (num == 1) return 0;
					return player.countMark('xjzh_boss_dianchong');
				},
			},
		},
	},
	"xjzh_boss_mengdu": {
		trigger: {
			source: "damageBegin",
		},
		forced: true,
		locked: true,
		priority: 3,
		content: function () {
			"step 0"
			game.setNature(trigger, 'poison');
			"step 1"
			var num = (player.hp * 10) / 100;
			if (Math.random() <= num) {
				var evt = event.getParent("damage");
				if (evt && evt.getParent) {
					var next = game.createEvent('xjzh_boss_mengdu_zhongdu', false, evt.getParent());
					next.player = player;
					next.target = trigger.player;
					next.setContent(function () {
						"step 0"
						target.xjzh_changeBuff('zhongdu', 1, true);
						"step 1"
						player.draw(get.xjzh_buffNum(target, "zhongdu"));
					});
				}
			}
		},
		ai: {
			noAddBuff: true,
			noAddBuffFilter(player) {
				return get.is.playerNames(player, "xjzh_boss_duruier") ? ["zhongdu"] : [];
			},
		},
	},
	"xjzh_boss_huanshen": {
		trigger: {
			player: "dying",
		},
		forced: true,
		locked: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'water',
		animationStr: "痛苦之王",
		derivation: "xjzh_boss_exing",
		filter(event, player) {
			return !game.hasPlayer(target => get.is.playerNames(target, "xjzh_boss_duruierhy"));
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			let num = Math.round(player.maxHp / 3);
			player.recoverTo(num);

			await player.addSkills("xjzh_boss_exing");

			await game.addShFellow(5, "xjzh_boss_duruierhy", 3);
			await game.addShFellow(7, "xjzh_boss_duruierhy", 3);

		},
	},
	"xjzh_boss_exing": {
		trigger: {
			player: "useCard",
		},
		forced: true,
		priority: 10,
		firstDo: true,
		filter: function (event, player) {
			if (!event.card || !event.cards.length) return false;
			if (!event.target || !event.targets.length) return false;
			if (get.xjzh_buffNum(event.target, "zhongdu") == 0) return false;
			return get.is.damageCard(event.card);
		},
		content: function () {
			"step 0"
			event.num = get.xjzh_buffNum(trigger.target, "zhongdu");
			"step 1"
			target.xjzh_changeBuff('zhongdu', -event.num, true);
			"step 2"
			trigger.effectCount += event.num
			game.log(trigger.card, '额外结算' + get.xjzh_buffNum(trigger.target, "zhongdu") + '次');
		},
		ai: {
			result: {
				target: function (player, target, card) {
					if (!target) return;
					return get.xjzh_buffNum(target, "zhongdu");
				},
			},
		},
	},
	"xjzh_boss_lianji": {
		trigger: {
			player: "useCard",
		},
		direct: true,
		priority: 10,
		firstDo: true,
		locked: true,
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		init(player) {
			player.storage.xjzh_boss_lianji = new Map(
				[
					["use", 3],
					["count", 1],
					["type", [0, 0]]
				]
			);
		},
		mark: true,
		marktext: "连",
		intro: {
			name: "连击",
			content(storage, player) {
				let list = storage.get("type");
				return `基本牌：${storage.get("type")[0]}张<br>锦囊牌：${storage.get("type")[1]}张`;
			},
		},
		mod: {
			aiOrder(player, card, num) {
				let storage = player.storage.xjzh_boss_lianji;
				let typeNum = storage.get("type"), use = storage.get("use");
				if (typeNum[0] >= use && get.type(card) == "trick") return num + 3;
				if (typeNum[1] >= use && get.type(card) == "basic") return num + 3;
				return num;
			},
		},
		filter(event, player) {
			return ["trick", "basic"].includes(get.type(event.cards[0]));
		},
		async content(event, trigger, player) {
			let storage = player.storage.xjzh_boss_lianji, type = get.type(trigger.cards[0]), bool = false;
			if (type == "basic") {
				await storage.set("type", [storage.get("type")[0] + 1, storage.get("type")[1]]);
				if (storage.get("type")[1] >= storage.get("use")) {
					await storage.set("type", [storage.get("type")[0], 0]);
					bool = true;
				}
			} else {
				await storage.set("type", [storage.get("type")[0], storage.get("type")[1] + 1]);
				if (storage.get("type")[0] >= storage.get("use")) {
					await storage.set("type", [0, storage.get("type")[1]]);
					bool = true;
				}
			}
			if (bool == true) {
				let num = storage.get("count");
				trigger.effectCount += num;
				player.logSkill("xjzh_boss_lianji", trigger.target);
				game.log(trigger.card, '额外结算' + num + '次');
			}
		},
	},
	"xjzh_boss_qiangji": {
		trigger: {
			player: "damageEnd",
		},
		direct: true,
		priority: 10,
		firstDo: true,
		locked: true,
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			return true;
		},
		async content(event, trigger, player) {
			let card = trigger.cards[0];
			if (player.hasUseTarget(card)) await player.chooseUseTarget(card, false);
			let list = [];
			while (true) {
				let cards = get.cards()[0];
				player.showCards(cards);
				if (get.number(cards) == get.number(card) || get.suit(cards) == get.suit(card)) list.push(cards);
				else {
					if (list.length) player.gain(list, 'gain2', 'log', player);
					break;
				};
			}
			while (_status.event.name != 'phase') {
				_status.event = _status.event.parent;
			}
			_status.event.finish();
			_status.event.untrigger(true);
			player.insertPhase();
		},
	},
	"xjzh_boss_zenghen": {
		trigger: {
			player: "dying",
		},
		forced: true,
		limited: true,
		locked: true,
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		derivation: "xjzh_boss_xueyan",
		skillAnimation: true,
		animationColor: 'fire',
		animationStr: "憎恨王座",
		init(player, skill) {
			player.addMark(skill, 3, false);
		},
		filter(event, player) {
			return player.hasMark("xjzh_boss_zenghen");
		},
		async content(event, trigger, player) {
			player.removeMark("xjzh_boss_zenghen", 1, false);
			await player.gainMaxHp(player.maxHp);
			player.recoverTo(player.maxHp);
			player.update();
			let targets = player.getEnemies().sortBySeat(player);
			for await (let target of targets) {
				target.damage(1, player, 'fire', 'nocard');
				target.xjzh_changeBuff("ranshao", 1);
			}
			if (player.hasSkill("xjzh_boss_lianji")) {
				let controlList = ["红色数字减一", "蓝色数字加一"], storage = player.storage.xjzh_boss_lianji;
				const result = await player.chooseControl(controlList).forResult();
				if (result?.control == "红色数字减一") {
					storage.set("use", storage.get("use") == 1 ? 1 : storage.get("use") - 1);
				} else {
					storage.set("count", storage.get("count") + 1);
				}
			}
			if (!player.hasSkill("xjzh_boss_xueyan")) await player.addSkills("xjzh_boss_xueyan");
		},
	},
	"xjzh_boss_xueyan": {
		trigger: {
			source: "damageEnd",
		},
		filter(event, player) {
			if (event.player.isDead()) return false;
			return event.source != event.player;
		},
		check(event, player) {
			return -get.attitude(player, event.player);
		},
		async content(event, trigger, player) {
			let cards = get.cards()[0];
			player.showCards(cards);
			if (get.color(cards) == "red") {
				trigger.player.damage(1, player, 'fire', 'nocard');
				trigger.player.xjzh_changeBuff("ranshao", 1);
			} else {
				trigger.player.xjzh_changeBuff("yishang", 1);
			}
		},
	},
	"xjzh_boss_fennu": {
		trigger: {
			player: "phaseBefore",
		},
		frequent: true,
		priority: Infinity,
		firstDo: true,
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		mark: true,
		marktext: "怒",
		intro: {
			name: "愤怒",
			mark: function (dialog, storage, player) {
				var storage = player.storage.xjzh_boss_fennu;
				dialog.addSmall([storage, 'vcard']);
			},
			markcount: function (storage, player) {
				var storage = player.storage.xjzh_boss_fennu;
				return storage.length;
			},
		},
		init: function (player) {
			if (!player.storage.xjzh_boss_fennu) player.storage.xjzh_boss_fennu = [];
		},
		content: function () {
			"step 0"
			var { ...cards } = lib.xjzh_qishuyaojians;
			var list = []
			for (var i in cards) {
				if (["xjzh_qishu_wuyan", "xjzh_qishu_fengbaopaoxiao", "xjzh_qishu_waxilidedaogao", "xjzh_qishu_fenglangkx", "xjzh_qishu_hakankouyu", "xjzh_qishu_lietiangong", "xjzh_qishu_wumingzhe"].includes(i)) continue;
				var cardname = i;
				lib.card[cardname] = {
					fullimage: false,
					image: 'ext:仙家之魂/image/qishuyaojian/cards/' + i + '.jpg',
				};
				lib.translate[cardname] = cards[i].translate;
				lib.translate[cardname + '_info'] = cards[i].translate_info;
				list.push(cardname);
			}
			event.func = function (skills) {
				var skillsx = lib.xjzh_qishuyaojians[skills]
				if (skillsx.skill) {
					var newSkill = skills;
					if (!lib.skill[newSkill]) {
						lib.skill[newSkill] = skillsx.skill;
						lib.skill[newSkill].charlotte = true;
						lib.skill[newSkill].xjzh_qishuSkill = true;
						lib.skill[newSkill].superCharlotte = true;
						lib.skill[newSkill].nobracket = true;
						lib.skill[newSkill].locked = true;
						if (lib.skill[newSkill].priority === undefined) lib.skill[newSkill].priority = 5;
						if (skills.skillName) {
							lib.translate[newSkill] = skillsx.skillName;
						} else {
							lib.translate[newSkill] = skillsx.translate;
						}
						if (skills.skillInfo) {
							lib.translate[newSkill + '_info'] = skillsx.skillInfo;
						} else {
							lib.translate[newSkill + '_info'] = skillsx.translate_info;
						}
					}
					player.addSkillLog(newSkill);
				}
			};
			var num = 1;
			if (player.hp < player.maxHp / 2) num = [1, 3];
			var str = "〖愤怒〗：选择装备";
			if (num == 1) str += "1个奇术要件";
			else str += "至多3个奇术要件";
			var next = player.chooseButton([str, [list, 'vcard']]).set('filterButton', function (button) {
				var link = button.link[2];
				var level = cards[link].level;
				return level < 5;
			})
			next.set('ai', function (button) {
				var link = button.link[2];
				var level = cards[link].level;
				return get.rand(1, 4);
			})
			next.set('selectButton', function () {
				var player = get.player();
				return num;
			})
			next.set('num', num)
			'step 1'
			if (result.bool) {
				if (player.storage.xjzh_boss_fennu.length > 0) {
					var storage = player.storage.xjzh_boss_fennu;
					for (var i = 0; i < storage.length; i++) {
						if (player.hasSkill(storage[i])) {
							player.removeSkill(storage[i], true);
							player.storage.xjzh_boss_fennu.remove(storage[i]);
						}
					}
				}
				for (var i = 0; i < result.links.length; i++) {
					event.func(result.links[i][2]);
					player.storage.xjzh_boss_fennu.push(result.links[i][2]);
				};
				var card = ui.create.card();
				card.classList.add('infohidden');
				card.classList.add('infoflip');
				player.$gain2(card);
			}
			"step 2"
			if (player.hp <= player.maxHp / 3) {
				game.countPlayer(function (current) {
					if (current != player) current.useCard({ name: 'sha', isCard: true }, current);
				});
			}
		},
	},
	"xjzh_boss_edu": {
		enable: "phaseUse",
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		nogainsSkill: true,
		locked: true,
		usable: 1,
		filterTarget: function (card, player, target) {
			if (target.isMad()) return false;
			return target != player;
		},
		filter: function (event, player) {
			var num = player.getEnemies().length;
			if (game.countPlayer(function (current) {
				return current.isMad() && current.isEnemiesOf(player);
			}) < num) return true;
			return false;
		},
		content: function () {
			player.loseHp();
			target.goMad({ player: "phaseAfter" });
			if (player.hp < player.maxHp / 2) {
				player.loseMaxHp();
				game.countPlayer(function (current) {
					if (current != player) target.useCard({ name: 'juedou', isCard: true }, current);
				});
			}
		},
		ai: {
			order: 10,
			result: {
				player: function (player) {
					if (player.hp < player.maxHp / 2) return -1;
					if (player.maxHp <= 3) return -2;
					return player.hp - player.maxHp / 2;
				},
				target: function (target) {
					if (target.hasFriend()) return -1;
					return 2;
				},
			},
		},
	},
	"xjzh_boss_canren": {
		trigger: {
			source: ["damageEnd"],
		},
		charlotte: true,
		fixed: true,
		superCharlotte: true,
		nogainsSkill: true,
		locked: true,
		priority: 10,
		frequent: true,
		filter(event, player) {
			if (event.player.isDead()) return false;
			if (!event.player.countCards('he')) return false;
			return true;
		},
		async content(event, trigger, player) {
			const result = await player.gainPlayerCard(trigger.player, "he", true).forResult();
			while (true) {
				let cards = get.cards()[0];
				player.showCards(cards);
				if (get.suit(result.links[0]) == get.suit(cards)) {
					player.gain(cards, player, 'gain2', 'log');
				} else break;
			}
		},
		ai: {
			result: {
				player: 1,
			},
		},
	},
	"xjzh_boss_qingling": {
		trigger: {
			global: ["gameStart", "dieAfter"],
			player: "enterGame",
			source: "damageEnd",
		},
		forced: true,
		locked: true,
		charlotte: true,
		superCharlotte: true,
		priority: -1,
		lastDo: true,
		unique: true,
		mod: {
			globalFrom(from, to, distance) {
				let num = game.countPlayer(current => {
					return get.is.playerNames(current, "xjzh_boss_hj");
				});
				return distance - num;
			},
			playerEnabled(card, player, target) {
				if (get.is.damageCard(card) && get.is.playerNames(target, "xjzh_boss_hj")) return false;
			},
		},
		getHuangjinList: ["xjzh_boss_hjbingyong", "xjzh_boss_hjlishi", "xjzh_boss_hjfangshi", "xjzh_boss_hjshushi", "xjzh_boss_hjguishi"],
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let name = event.name;
			if (name != "die" && game.countPlayer(current => get.is.playerNames(current, "xjzh_boss_hj")) >= 2) return false;
			if (name == "damage") {
				return game.hasNature(event, "thunder");
			}
			if (name == "die") {
				return event.player !== player && event.player.isDead() && get.is.playerNames(event.player, "xjzh_boss_hj");
			}
			return true;
		},
		async content(event, trigger, player) {
			let name = trigger.name, list;
			if (name == "die") {
				game.removeShPlayer(trigger.player);
			} else {
				let occupiedPositions = game.players
					.filter(current => get.is.playerNames(current, "xjzh_boss_hj"))
					.map(current => parseInt(current.dataset.position));
				let availablePositions = [5, 7].filter(p => !occupiedPositions.includes(p));
				let needCount = availablePositions.length;
				if (needCount > 0) {
					list = lib.skill[event.name].getHuangjinList.slice(0).randomGets(needCount);
					list.forEach((target, index) => {
						game.addShFellow(availablePositions[index], target, 4);
					});
				}
			}
		},
	},
	"xjzh_boss_dianxing": {
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return player.countCards('hes');
		},
		check(card) {
			if (game.hasPlayer(current => get.is.playerNames(current, 'xjzh_boss_hjguishi'))) return get.color(card) == "black";
			return 8 - get.value(card);
		},
		filterTarget(card, player, target) {
			return player.getEnemies().includes(target);
		},
		selectTarget: 1,
		filterCard: true,
		selectCard: 1,
		position: 'hes',
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let card = event.cards[0], target = event.targets[0], color = get.color(card);
			while (true) {
				const result = await target.judge(card => get.color(card) == get.event().color ? -4 : 4)
					.set("judge2", result => !result.bool)
					.set('color', color)
					.forResult();
				if (!result?.bool) await target.damage(1, player, 'thunder', 'nocard');
				else break;
				if (target.isDead()) break;
				const result2 = await player.chooseBool()
					.set('ai', () => {
						let player = get.player();
						let target = get.event().target;
						return get.damageEffect(target, player, player, 'thunder')
					})
					.set("prompt", `〖电刑〗：是否令${get.translation(target)}再次进行判定？`)
					.forResult();
				if (!result2?.bool) break;
			}
		},
		ai: {
			order: 12,
			result: {
				target: -1.5,
			},
		},
	},
	"xjzh_boss_leiji": {
		trigger: {
			global: ["roundStart"],
		},
		forced: true,
		locked: true,
		priority: 6,
		async content(event, trigger, player) {
			let targets = player.getEnemies().sortBySeat(player);
			for (let target of targets) {
				const result = await target.executeDelayCardEffect('shandian');
				const bool = result._result.bool;
				if (!bool) {
					player.gainMaxHp();
					player.recover();
				}
			}
		},
		ai: {
			expose: 0.5,
			thunderDamage: true,
		},
	},
	"xjzh_boss_guishu": {
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJudgeBegin", "phaseDrawBegin", "phaseDiscardBegin", "phaseJieshuBegin", "phaseUseBegin"],
		},
		forced: true,
		locked: true,
		priority: -9,
		group: ["xjzh_boss_guishu_link", "guidao"],
		content: function () {
			"step 0"
			var num = get.rand(1, 2);
			var cards = get.randomCards(num, function (card) {
				return get.color(card) == "black";
			});
			player.gain(cards, 'giveAuto')
			var str = "";
			if (trigger.name == "phaseZhunbei") {
				str += "准备阶段";
			}
			else if (trigger.name == "phaseJudge") {
				str += "判定阶段";
			}
			else if (trigger.name == "phaseDraw") {
				str += "摸牌阶段";
			}
			else if (trigger.name == "phaseUse") {
				str += "出牌阶段";
			}
			else if (trigger.name == "phaseDiscard") {
				str += "弃牌阶段";
			}
			else if (trigger.name == "phaseJieshu") {
				str += "结束阶段";
			}
			game.log(player, "跳过了", "#g" + str + "", "摸了" + num + "张牌");
			"step 1"
			trigger.cancel();
		},
		subSkill: {
			"link": {
				trigger: {
					global: "damageBefore",
				},
				forced: true,
				sub: true,
				priority: 10,
				filter: function (event, player) {
					return event.source && event.source == game.boss && game.hasNature(event, 'thunder');
				},
				content: function () {
					var list = player.getEnemies().sortBySeat();
					for (var target of list) {
						if (!target.isLinked()) target.link(true);
					}
				},
			},
		},
	},
	"xjzh_boss_fubing": {
		trigger: {
			player: "phaseDrawBegin",
		},
		silent: true,
		locked: true,
		group: "xjzh_boss_fubing_damage",
		content: function () {
			"step 0"
			var list = player.getEnemies().sortBySeat();
			player.gainMultiple(list);
			"step 1"
			player.addTempSkill('xjzh_boss_fubing_max');
			trigger.cancel(null, null, 'notrigger');
		},
		subSkill: {
			"max": {
				mod: {
					maxHandcard: function (player, num) {
						return 0;
					},
				},
				sub: true,
			},
			"damage": {
				trigger: {
					global: ["damageBegin", "linkBegin"],
				},
				silent: true,
				sub: true,
				filter: function (event, player) {
					return game.boss == event.player;
				},
				content: function () {
					if (trigger.name == "damage") {
						trigger.player = player;
						game.log(player, "发动了", "#g〖符兵〗", "代替神张角承受了本次伤害");
					} else {
						if (!trigger.player.isLinked()) trigger.cancel(null, null, "notrigger");
					}
				},
			},
		},
	},
	"xjzh_boss_fuli": {
		mod: {
			cardEnabled: function (card, player) {
				if (card.name == "shan") return false;
			},
			cardEnabled2: function (card, player) {
				if (card.name == "shan") return false;
			},
			cardUsable: function (card, player, num) {
				if (card.name == 'sha') return Infinity;
			},
			cardRespondable: function (card, player, event) {
				if (card.name == 'shan') return false;
			},
		},
		trigger: {
			global: ["damageBegin", "turnOverBegin"],
		},
		silent: true,
		locked: true,
		filter: function (event, player) {
			if (event.name == "damage") return event.source == game.boss;
			return event.player == game.boss && !event.player.isTurnedOver();
		},
		content: function () {
			if (trigger.name == "damage") {
				trigger.num++
			} else {
				trigger.cancel(null, null, "notrigger");
			}
		},
	},
	"xjzh_boss_fuhuo": {
		trigger: {
			player: "phaseDrawBegin",
		},
		silent: true,
		locked: true,
		group: "xjzh_boss_fuhuo_phase",
		filter: function (event, player) {
			return !player.skipList.includes("phaseDraw");
		},
		content: function () {
			"step 0"
			var list = player.getEnemies().sortBySeat();
			var num = list.length < trigger.num ? list.length : trigger.num;
			var targets = list.randomGets(num);
			for (var i = 0; i < targets.length; i++) {
				targets[i].damage(1, player, 'nocard', 'fire');
				targets[i].addSkill('xjzh_boss_fuhuo_damage');
			}
			player.logSkill('xjzh_boss_fuhuo', targets);
			"step 1"
			trigger.cancel(null, null, 'notrigger');
		},
		subSkill: {
			"damage": {
				trigger: {
					source: "damageBegin",
				},
				silent: true,
				sub: true,
				mark: true,
				marktext: "火",
				intro: {
					name: "符火",
					content: "下次造成火焰伤害+1，且你受到等量火焰伤害",
				},
				filter: function (event, player) {
					if (!game.hasNature(event) || game.hasNature(event, 'fire')) return false;
					return !event.numFixed;
				},
				content: function () {
					"step 0"
					trigger.num++
					"step 1"
					player.damage(trigger.num, player, 'fire', 'nocard');
					"step 2"
					player.logSkill('xjzh_boss_fuhuo', trigger.player);
					"step 3"
					player.removeSkill('xjzh_boss_fuhuo_damage');
				},
				ai: {
					firedamage: true,
					result: {
						target: function (player, target, card) {
							if (get.tag(card, 'fireDamage')) return -2;
						},
						player: function (player, target, card) {
							if (get.tag(card, 'fireDamage')) return 2;
						},
					},
				},
			},
			"phase": {
				trigger: {
					global: "phaseBefore",
				},
				silent: true,
				filter: function (event, player) {
					if (Math.random() > player.hp / 100) return false;
					return event.player == game.boss;
				},
				content: function () {
					trigger.player.gainMaxHp();
					player.logSkill('xjzh_boss_fuhuo', trigger.player);
				},
			},
		},
	},
	"xjzh_boss_fushui": {
		trigger: {
			player: "phaseUseBegin",
		},
		silent: true,
		locked: true,
		marktext: "水",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		group: "xjzh_boss_fushui_phase",
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		filter: function (event, player) {
			return !player.skipList.includes("phaseUse");
		},
		content: function () {
			"step 0"
			var list = player.getCards('hej');
			player.addToExpansion(list, player, 'give').gaintag.add('xjzh_boss_fushui');
			"step 1"
			trigger.cancel(null, null, 'notrigger');
			"step 2"
			var list = player.getFriends(true).sortBySeat();
			var damage = function () {
				for (var i of list) {
					if (i.isDamaged()) return true;
				}
				return false;
			};
			var cards = player.getExpansions("xjzh_boss_fushui").sort();
			var bool = function () {
				var num = 0
				for (var i = 0; i < cards.length; i++) {
					num += get.number(cards[i]);
				}
				if (num >= 13) return true;
				return false;
			};
			if (damage() == true && bool() == true) {
				var evt = event.getParent("phase");
				if (evt && evt.getParent) {
					var next = game.createEvent('xjzh_boss_fushui_remove', false, evt.getParent());
					next.player = player;
					next.setContent(function () {
						"step 0"
						var cards = player.getExpansions("xjzh_boss_fushui");
						var next = player.chooseCardButton(cards, '〖符水〗：请选择任意张点数不小于13的牌视为使用一张【桃园结义】')
						next.set('forced', true);
						next.set('selectButton', function (button) {
							if (!ui.selected.buttons.length) return true;
							var num = 0;
							for (var i = 0; i < ui.selected.buttons.length; i++) {
								num += get.number(ui.selected.buttons[i]);
							}
							if (num >= 13) return ui.selected.buttons.length;
							return ui.selected.buttons.length + 2;
						});
						next.set('complexSelect', true);
						"step 1"
						if (result.links) {
							player.loseToDiscardpile(result.links);
							player.chooseUseTarget({ name: 'taoyuan' }, true, false).set('targets', game.filterPlayer(function (current) {
								return current.isFriendsOf(player);
							})).viewAs = true;
						}
					});
				}
			}
		},
		subSkill: {
			"phase": {
				trigger: {
					global: ["drawBegin", "phaseDiscardBegin"],
				},
				silent: true,
				filter: function (event, player) {
					if (game.boss != event.player) return false;
					if (event.name == "phaseDiscard") return event.player.needsToDiscard();
					return true;
				},
				content: function () {
					if (trigger.name == "draw") {
						trigger.player.draw()._triggered = null;
					} else {
						trigger.cancel(null, null, 'notrigger');
					}
					player.logSkill('xjzh_boss_fushui', trigger.player);
				},
			},
		},
	},

};

export default skills;