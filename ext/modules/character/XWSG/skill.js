import { lib, game, ui, get, ai, _status, rootURL } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	"xjzh_sanguo_dianxing": {
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
	"xjzh_sanguo_tianxiang": {
		trigger: {
			player: "loseAfter",
		},
		forced: true,
		locked: true,
		priority: 1,
		xjzh_xinghunSkill: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let evt = event.getl(player);
			if (!evt || !evt.hs.length || !evt.es.length) return false;
			let cards = [...evt.hs, ...evt.es];
			return cards.some(card => get.suit(card) == "heart");
		},
		marktext: "天香",
		intro: {
			name: "天香",
			content: "#",
		},
		global: "xjzh_sanguo_tianxiang_mod",
		async content(event, trigger, player) {
			const result = await player.chooseTarget()
				.set("prompt", "〖天香〗：选择一名角色令其获得一个“天香”标记")
				.set('ai', target => get.attitude(player, target))
				.forResult();
			if (result?.targets) {
				result.targets[0].addMark("xjzh_sanguo_tianxiang", 1);
			};
		},
		subSkill: {
			"mod": {
				sub: true,
				charlotte: true,
				locked: true,
				mod: {
					suit(card, suit) {
						let player = get.player();
						if (player && player.hasMark("xjzh_sanguo_tianxiang") && suit == 'spade') return 'heart';
					},
				},
			},
		},
	},
	"xjzh_sanguo_emei": {
		trigger: {
			global: ["addMark", "removeMark"],
		},
		forced: true,
		locked: true,
		priority: 1,
		group: "xjzh_sanguo_emei_use",
		filter(event, player) {
			return event.markName == "xjzh_sanguo_tianxiang";
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let skills = [];
			if (trigger.name == "addMark") {
				trigger.player.xjzh_addRandomSkill(1, false);
			} else {
				skills.addArray(trigger.player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					return !info.sub && !info.unique && !lib.skill.global.includes(skill);
				}));
				if (skills.length) trigger.player.removeSkills(skills.randomGet());
			}
		},
		subSkill: {
			"use": {
				enable: "phaseUse",
				usable: 1,
				sub: true,
				prompt: "〖额眉〗：选择一名角色移去其所有“天香”标记",
				filterTarget(card, player, target) {
					return target.hasMark("xjzh_sanguo_tianxiang");
				},
				audio: "xjzh_sanguo_emei",
				filter(event, player) {
					return game.countPlayer(current => current.countMark("xjzh_sanguo_tianxiang"));
				},
				async content(event, trigger, player) {
					let target = event.targets[0];
					const result = await player
						.chooseControl(["选项一", "选项二", "选项三", "选项四"])
						.set("choiceList", [
							`选项一：令其失去所有技能`,
							`选项二：令其受到等量伤害`,
							`选项三：令其摸等量牌`,
							`选项四：令其获得随机获得一个技能`,
						]
						)
						.set("prompt", "〖额眉〗：请选择一项")
						.set("ai", () => {
							let player = get.player(), target = get.event().target;
							let att = get.attitude(player, target);
							if (att > 0) return ["选项三", "选项四"].randomGet();
							return ["选项一", "选项二"].randomGet();
						})
						.set("target", target)
						.forResult();
					target.popup(result.control);
					let index = result.index;
					switch (index) {
						case 0:
							target.clearSkills();
							break;
						case 1:
							target.damage(target.countMark("xjzh_sanguo_tianxiang"));
							break;
						case 2:
							target.draw(target.countMark("xjzh_sanguo_tianxiang"));
							break;
						case 3:
							let skills = [];
							game.xjzh_wujiangpai().forEach(name => {
								let info = lib.character[name];
								if (info && info?.skills?.length) {
									skills.addArray(info.skills.filter(skill => {
										let info = get.info(skill);
										return info && !info.sub && !info.unique && !info.juexingji && !info.charlotte && !info.limited && !info.zhuSkill && !info.dustSkill && !target.skills.includes(skill);
									}));
								}
							});
							target.addSkills(skills.randomGet());
							break;
					}
					target.clearMark("xjzh_sanguo_tianxiang");
				},
			},
			ai: {
				order: 8,
				result: {
					target: -1,
				},
			},
		},
	},
	"xjzh_sanguo_guose": {
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		frequent: true,
		xjzh_xinghunSkill: true,
		init(player) {
			let cards = Array.from(ui.cardPile.childNodes).concat(Array.from(ui.discardPile.childNodes)).filter(card => get.name(card) == "lebu");
			if (cards.length) {
				game.cardsGotoSpecial(cards);
				game.log(player, "将", cards, "移出游戏");
			}
		},
		audio: "ext:仙家之魂/audio/skill:2",
		check(event, player) {
			return get.attitude(player, event.player);
		},
		prompt(event, player) {
			return `〖国色〗：是否弃置一张♦牌令${get.translation(event.player)}执行一次【乐不思蜀】判定`;
		},
		mod: {
			aiOrder(player, card, num) {
				if (get.suit(card) == "diamond") return num / 2 + get.value({ name: "lebu" });
				return num;
			},
		},
		filter(event, player) {
			console.log(event);
			if (!player.countCards('he', { suit: "diamond" })) return false;
			if (event.player.countCards('j', 'lebu')) return false;
			if (event.getParent().skill == 'xjzh_sanguo_wanrong') return false;
			return event.player != player;
		},
		async content(event, trigger, player) {
			const result = await player.chooseToDiscard('he', { suit: "diamond" })
				.set("prompt", `〖国色〗：请选择弃置一张♦牌令${get.translation(trigger.player)}执行一次【乐不思蜀】判定`)
				.set("ai", (card) => 6 - get.value(card))
				.forResult();
			if (result?.bool) {
				trigger.player.executeDelayCardEffect('lebu');
			}
		},
		ai: {
			skip: true,
		},
	},
	"xjzh_sanguo_wanrong": {
		trigger: {
			global: "judgeAfter",
		},
		frequent: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (get.sourceSkillFor(event) == "xjzh_sanguo_wanrong") return false;
			if (event.cardname != "lebu") return false;
			return !event.result.bool;
		},
		check(event, player) { return 1; },
		async content(event, trigger, player) {
			const result = await player.chooseTarget(lib.filter.notMe)
				.set("prompt", "〖婉容〗：请选择一名其他角色令其执行一个额外的回合")
				.set('ai', target => get.attitude(player, target))
				.forResult();
			if (result?.targets) {
				player.draw(2);
				result.targets[0].insertPhase("xjzh_sanguo_wanrong");
			}
		},
	},
	"xjzh_sanguo_lixiang": {
		trigger: {
			player: "dying",
		},
		limited: true,
		forced: true,
		locked: true,
		unique: true,
		skillAnimation: true,
		animationColor: 'water',
		audio: "ext:仙家之魂/audio/skill:2",
		audioname2: {
			"xjzh_sanguo_daqiqo": "ext:仙家之魂/audio/skill/xjzh_sanguo_lixiang1.mp3",
			"xjzh_sanguo_xiaoqiqo": "ext:仙家之魂/audio/skill/xjzh_sanguo_lixiang2.mp3",
		},
		filter(event, player) {
			let list = get.nameList(player).filter(name => {
				return ["xjzh_sanguo_daqiao", "xjzh_sanguo_xiaoqiao"].includes(name);
			});
			if (list.length == 0) return false;
			return !player.storage.xjzh_sanguo_lixiang;
		},
		async content(event, trigger, player) {
			player.awakenSkill("xjzh_sanguo_lixiang");
			player.clearSkills(true);
			let targets = game.filterPlayer(current => current != player).sort(lib.sort.seat);
			for (let target of targets) {
				target.checkConflict();
				target.checkMarks();
			}
			let list = get.nameList(player).filter(name => {
				return ["xjzh_sanguo_daqiao", "xjzh_sanguo_xiaoqiao"].includes(name);
			});
			let names;
			if (get.config('double_character')) {
				if (list.length >= 2) names = ["xjzh_sanguo_daqiao", "xjzh_sanguo_xiaoqiao"].randomGet();
			} else {
				if (get.is.playerNames(player, "xjzh_sanguo_daqiao")) names = "xjzh_sanguo_xiaoqiao";
				else names = "xjzh_sanguo_daqiao";
			}
			player.changeCharacter([names]);
			player.maxHp = lib.character[names].maxHp;
			player.recoverTo(player.maxHp);
		},
	},
	"xjzh_sanguo_jueqing": {
		trigger: {
			global: ["damageBefore", "loseHpBefore"],
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return !event.numFixed;
		},
		forced: true,
		locked: true,
		unique: true,
		async content(event, trigger, player) {
			trigger._triggered = null;
		},
		ai: {
			jueqing: true,
		},
	},
	"xjzh_sanguo_shangshi": {
		trigger: {
			player: ["useCardEnd"],
		},
		locked: true,
		unique: true,
		frequent: true,
		forbid: ["xjzh_challenge"],
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) { return player.isDamaged() },
		async content(event, trigger, player) {
			const cards = await player.draw().forResult();
			const card = cards[0];
			const history = player.getAllHistory('useCard');
			if (!history.length) return;
			let card2 = history[history.length - 1].card;
			if (get.color(card) != get.color(card2) && game.countPlayer(current => {
				return current != player && current.countCards("hej");
			}) > 0) {
				const result = await player.chooseTarget((card, player, target) => {
					if (!target.countCards("hej")) return false;
					return target != player;
				})
					.set("prompt", "〖伤逝〗：请选择并弃置一名角色的牌")
					.set('ai', target => lib.card.guohe.ai.result.target(player, target))
					.forResult();
				if (!result?.bool) return;
				const target = result.targets[0];
				player.discardPlayerCard("hej", target, true).set('target', target).set('ai', button => lib.card.guohe.ai.button(button));
			}
		},
		ai: {
			maixie: true,
			skillTagFilter: (player, tag, arg) => {
				if (player.isDamaged()) return false;
				return true;
			},
		},
	},
	"xjzh_sanguo_huishi": {
		trigger: {
			global: "gameStart",
			player: "enterGame",
		},
		forced: true,
		locked: true,
		charlotte: true,
		unique: true,
		forbid: ["xjzh_challenge"],
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			game.players.forEach(target => {
				target.addSkill("xjzh_sanguo_huishi2");
			});
		},
		ai: {
			expose: 0.8,
			threaten: 4,
		},
	},
	"xjzh_sanguo_huishi2": {
		trigger: {
			global: "dieEnd",
		},
		charlotte: true,
		sub: true,
		direct: true,
		audio: "xjzh_sanguo_huishi",
		filter(event, player) {
			return get.is.playerNames(event.player, "xjzh_sanguo_zhangchunhua");
		},
		init(player, skill) {
			player.addSkillBlocker(skill);
		},
		async content(event, trigger, player) {
			player.logSkill("xjzh_sanguo_huishi");
			player.removeSkill("xjzh_sanguo_huishi2");
		},
		onremove(player, skill) {
			player.removeSkillBlocker(skill);
		},
		skillBlocker(skill, player) {
			let info = lib.skill[skill]
			if (info && (info.juexingji || info.limited || info.zhuSkill || info.dutySkill || info.jy_bangpai || info.zhuanshuSkill)) {
				if (info.xjzh_xinghunSkill) return false;
				return true
			}
			return false;
		},
	},
	"xjzh_sanguo_pijian": {
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		init(player) {
			player.expandEquip(1);
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

			const result = await player.chooseButton()
				.set("createDialog", ["〖披坚〗：请选择一个技能", [pijianSkills.randomGets(3), 'textbutton']])
				.set("ai", button => get.skillRank(button.link, "in"))
				.forResult();

			if (result?.links) {
				let names = result.links;
				game.addVideo("skill", player, ["xjzh_sanguo_pijian", [names]]);
				game.broadcastAll((player, names, triggername) => {
					player.tempname.addArray(names);
					for (let name of names) lib.skill[triggername].createCard(name);
				}, player, names, event.name);

				let cards = names.map(name => {
					let card = game.createCard(`xjzh_sanguo_pijian_${name}`, 'none', 'none');
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
			if (!lib.card['xjzh_sanguo_pijian_' + name]) {
				if (lib.translate[name + "_ab"]) lib.translate["xjzh_sanguo_pijian_" + name] = lib.translate[name + "_ab"];
				else lib.translate["xjzh_sanguo_pijian_" + name] = lib.translate[name];

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
				lib.translate[`xjzh_sanguo_pijian_${name}_info`] = str;
				lib.card['xjzh_sanguo_pijian_' + name] = card;
			}
		},
	},
	"xjzh_sanguo_zhirui": {
		trigger: {
			player: "useCardAfter",
		},
		forced: true,
		locked: true,
		priority: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (!player.isPhaseUsing()) return false;
			if (get.is.damageCard(event.card)) return false;
			return player.getEquips(1).some(card => card.name.indexOf("xjzh_sanguo_pijian") == 0);
		},
		async content(event, trigger, player) {
			let history = player.getHistory('gain', evt => {
				return evt && evt.getParent().name == "xjzh_sanguo_zhirui";
			}), card;
			if (!history.length) {
				card = get.cardPile(cardx => {
					return get.is.damageCard(cardx);
				});
			} else {
				card = get.cardPile(cardx => {
					return get.is.damageCard(cardx) && cardx.name != history[history.length - 1].cards[0].name;
				});
			}
			if (card) player.gain(card, player, 'gain2', 'log');
			else player.say("没有符合条件的卡牌");
		},
	},
	"xjzh_sanguo_yongjue": {
		enable: "phaseUse",
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let history = player.getHistory('useCard', evt => get.is.damageCard(evt.card));
			if (!history.length) return false;
			if (!player.getEquips(1).length) return false;
			return true;
		},
		async content(event, trigger, player) {
			player.discard(player.getEquips(1));
			let history = player.getHistory('useCard', evt => get.is.damageCard(evt.card));
			let list = history.slice(0);
			while (list.length) {
				let object = list.shift();
				let card = object.card;
				let targets = object.targets.filter(current => current.isAlive() && player.canUse(card, current));
				if (targets.length == 0) continue;
				targets.removeArray(targets.filter(current => current.isDead()));
				const result = await player.chooseBool()
					.set("prompt", `〖勇决〗：是否失去一点体力对${get.translation(targets)}使用一张${get.translation(card)}`)
					.set('ai', () => get.player().getHp(true) > 1)
					.forResult();
				if (result?.bool) {
					player.useCard(card, targets, false).set('addCount', false);
					player.loseHp();
				}
			}
		},
		ai: {
			order() {
				let player = get.player();
				let history = player.getHistory('useCard', function (evt) {
					return evt && evt.card && get.is.damageCard(evt.card);
				});
				if (!history.length) return 0;
				if (history.length > player.hp) return 0.1;
				return 1;
			},
			result: {
				player(player, target) {
					let history = player.getHistory('useCard', function (evt) {
						return evt && evt.card && get.is.damageCard(evt.card);
					});
					if (!history.length) return 0;
					if (history.length > player.hp) return 0.1;
					return 1;
				},
			},
		},
	},
	"xjzh_sanguo_daoshu": {
		trigger: {
			global: "gameStart",
			player: ["enterGame", "damageAfter", "phaseZhunbeiBegin"],
		},
		forced: true,
		locked: true,
		priority: -100,
		group: "xjzh_sanguo_daoshu_add",
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			if (!player.storage.xjzh_sanguo_daoshu2) player.storage.xjzh_sanguo_daoshu2 = 0
			player.storage.xjzh_sanguo_daoshu2++
			if (!player.storage.xjzh_sanguo_daoshu) player.storage.xjzh_sanguo_daoshu = [];
			let list = game.xjzh_wujiangpai().filter(name => {
				if (lib.character[name][3].some(skill => {
					return player.skills.includes(skill);
				})) return false;
				return lib.character[name][1] == 'qun';
			}).randomGets(3);
			if (!list.length) return;
			const result = await player.chooseButton(true)
				.set('ai', button => {
					return get.rank(button.link, true);
				}).set('createDialog', ['请选择一张武将牌', [list, 'character']])
				.forResult();
			if (result?.bool) {
				let link = result.links[0];
				let skills = lib.character[link][3]
				for (let i = 0; i < skills.length; i++) {
					var info = get.info(skills[i]);
					if (info && (info.limited || info.juexingji || info.dustSkill || info.unique || info.zhuSkill)) continue;
					player.addTempSkill(skills[i], { player: "phaseJieshuBegin" });
					player.storage.xjzh_sanguo_daoshu.push(skills[i]);
				}
			}
		},
		subSkill: {
			'add': {
				trigger: {
					player: "phaseJieshuBegin",
				},
				forced: true,
				priority: 38,
				sub: true,
				audio: "xjzh_sanguo_daoshu",
				filter(event, player) {
					return player.storage.xjzh_sanguo_daoshu.length;
				},
				content() {
					"step 0"
					var characters = [];
					event.num = player.storage.xjzh_sanguo_daoshu.length
					event.num2 = player.storage.xjzh_sanguo_daoshu2
					if (event.num < event.num2) {
						event.num2 = event.num
					}
					var skillx = player.storage.xjzh_sanguo_daoshu;
					var skills = [];
					for (var c in lib.character) {
						var info = lib.character[c];
						if (info[3].some(s => skillx.includes(s))) {
							characters.push(c);
							skills.push(...skillx.filter(s => info[3].includes(s)));
							skillx.remove(info[3]);
							if (!skillx.length) break;
						}
					}
					var list = characters;
					if (player.isUnderControl()) {
						game.swapPlayerAuto(player);
					}
					var switchToAuto = function () {
						_status.imchoosing = false;
						event._result = {
							bool: true,
							skills: skills.randomGets(),
						};
						if (event.dialog) event.dialog.close();
						if (event.control) event.control.close();
					};
					var chooseButton = function (list, skills) {
						var event = _status.event;
						if (!event._result) event._result = {};
						event._result.skills = [];
						var rSkill = event._result.skills;
						var dialog = ui.create.dialog('请选择获得的技能', [list, 'character'], 'hidden');
						event.dialog = dialog;
						var table = document.createElement('div');
						table.classList.add('add-setting');
						table.style.margin = '0';
						table.style.width = '100%';
						table.style.position = 'relative';
						for (var i = 0; i < skills.length; i++) {
							var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
							td.link = skills[i];
							table.appendChild(td);
							td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
							td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
								if (_status.dragged) return;
								if (_status.justdragged) return;
								_status.tempNoButton = true;
								setTimeout(function () {
									_status.tempNoButton = false;
								},
									500);
								var link = this.link;
								if (!this.classList.contains('bluebg')) {
									if (rSkill.length >= event.num2) return;
									rSkill.add(link);
									this.classList.add('bluebg');
								}
								else {
									this.classList.remove('bluebg');
									rSkill.remove(link);
								}
							});
						}
						dialog.content.appendChild(table);
						dialog.add('　　');
						dialog.open();
						event.switchToAuto = function () {
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing = false;
						};
						event.control = ui.create.control('ok', function (link) {
							if (rSkill.length !== event.num2) return;
							event.dialog.close();
							event.control.close();
							game.resume();
							_status.imchoosing = false;
						});
						for (var i = 0; i < event.dialog.buttons.length; i++) {
							event.dialog.buttons[i].classList.add('selectable');
						}
						game.pause();
						game.countChoose();
					};
					if (event.isMine()) {
						chooseButton(list, skills);
					}
					else if (event.isOnline()) {
						event.player.send(chooseButton, list, skills);
						event.player.wait();
						game.pause();
					}
					else {
						switchToAuto();
					}
					"step 1"
					var map = event.result || result;
					if (map && map.skills && map.skills.length) {
						for (var s of map.skills) {
							player.addSkillLog(s);
						}
						delete player.storage.xjzh_sanguo_daoshu
						player.checkConflict();
						player.checkMarks();
					}
				},
				ai: {
					combo: 'xjzh_sanguo_daoshu',
				},
			},
		},
	},
	"xjzh_sanguo_huanhua": {
		trigger: {
			player: ["damageBegin", "loseHpBegin", "loseMaxHpBegin"],
		},
		forced: true,
		locked: true,
		priority: 100,
		firstDo: true,
		audio: "ext:仙家之魂/audio/skill:1",
		group: ["xjzh_sanguo_huanhua_remove"],
		content() {
			if (trigger.name == "loseMaxHp") {
				trigger.cancel();
			} else {
				if (trigger.num > 1) trigger.num = 1;
			}
		},
		ai: {
			filterDamage: true,
			filterLoseHp: true,
			skillTagFilter(player, tag, arg) {
				if (tag == 'filterLoseHp') {
					if (player == arg) {
						if (_status.event.num > 1) return true;
					}
				};
				return false;
			},
		},
		subSkill: {
			remove: {
				audio: "xjzh_sanguo_huanhua",
				trigger: {
					player: ["turnOverBefore", "linkBefore"],
				},
				forced: true,
				sub: true,
				init(player) {
					if (player.isTurnedOver()) player.turnOver(false);
				},
				content() {
					trigger.cancel();
				},
			},
			ai: {
				noturn: true,
				nolink: true,
				effect: {
					target(card, player, target) {
						if (get.name(card) == "tiesuo") return [0, 0];
					}
				},
			},
		},
	},
	"xjzh_sanguo_juejing": {
		trigger: {
			player: ['loseAfter', 'changeHp'],
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		forced: true,
		locked: true,
		popup: false,
		unique: true,
		charlotte: true,
		nogainsSkill: true,
		superCharlotte: true,
		xjzh_xinghunSkill: true,
		filter(event, player) {
			if (["changeHp", "loseMaxHp", "gainMaxHp"].includes(event.name)) return true;
			if (event.name == 'gain' && event.player == player) return player.countCards('h') > 4;
			var evt = event.getl(player);
			if (!evt || !evt.hs || evt.hs.length == 0 || player.countCards('h') >= 4) return false;
			var evt = event;
			for (let i = 0; i < 4; i++) {
				evt = evt.getParent('xjzh_sanguo_juejing');
				if (evt.name != 'xjzh_sanguo_juejing') return true;
			}
			return false;
		},
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			if (["changeHp", "loseMaxHp", "gainMaxHp"].includes(trigger.name)) {
				switch (trigger.name) {
					case "changeHp":
						player.link(false);
						player.turnOver(false);
						break;
					default:
						player.maxHp = 2;
						player.update();
						break;
				};
			} else {
				var num = 4 - player.countCards('h');
				if (num > 0) player.draw(num);
				else player.chooseToDiscard('h', true, -num);
			}
			player.logSkill("xjzh_sanguo_juejing");
		},
		ai: {
			noh: true,
			nogain: true,
		},
	},
	"xjzh_sanguo_longhun": {
		inherit: "xinlonghun",
	},
	"xjzh_sanguo_peijian": {
		mod: {
			attackRange(player, range, distance) {
				return Infinity;
			},
		},
		trigger: {
			player: "shaBefore",
		},
		forced: true,
		locked: true,
		popup: false,
		content() {
			player.addTempSkill('unequip', 'shaAfter');
		},
		ai: {
			unequip: true,
		},
	},
	"xjzh_sanguo_kuanggu": {
		trigger: {
			player: ['changeHp', 'loseMaxHpEnd', 'gainMaxHpEnd'],
			source: 'damageAfter',
		},
		forced: true,
		locked: true,
		priority: 2,
		filter(event, player) {
			let name = event.name;
			if (name == 'damage') return event?.source == player && !event.numFixed;
			return true;
		},
		async content(event, trigger, player) {
			let name = trigger.name;
			if (name == 'damage') player.gainMaxHp();
			else {
				if (name == 'changeHp') {
					trigger.cancel(null, null, 'notrigger');
					player.loseMaxHp();
				}
				player.hp = player.maxHp;
				player.update();
			}
		},
		ai: {
			threaten: 1.5,
			filterDamage: true,
			value(card, player) {
				if (get.name(card, player) == 'tao') return 0;
				return get.value(card);
			}
		},
	},
	'xjzh_sanguo_kuangxi': {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			player: 'useCardEnd',
		},
		filter(event, player) {
			let targets = event.targets.slice().remove(player);
			if (!targets || targets.length == 0 || !event.card) return false;
			if (event.card.name == 'wuxie') return false;
			if (!targets.filter(current => current.isAlive()).length) return false;
			return get.type(event.card) == 'trick';
		},
		check(event, player) {
			let targets = event.targets.slice().remove(player), att = 0;
			for (let target of targets) {
				att += ai.get.effect(target, { name: 'sha' }, player, player);
			}
			return att > 1;
		},
		async content(event, trigger, player) {
			let targets = trigger.targets.slice().remove(player);
			await player.loseMaxHp();
			player.useCard({ name: 'sha' }, targets, false);
		},
		ai: {
			effect: {
				player(card, player, target) {
					if (get.type(card) == 'trick') return [1, 2];
				},
			},
		},
	},
	"xjzh_sanguo_aogu": {
		trigger: {
			player: ['loseMaxHpAfter', 'gainMaxHpAfter'],
		},
		locked: true,
		forced: true,
		priority: 5,
		mod: {
			maxHandcardFinal(player, num) {
				return 5;
			},
		},
		async content(event, trigger, player) {
			if (trigger.name == 'gainMaxHp' && player.maxHp >= 8) {
				trigger.cancel(null, null, 'notrigger');
				player.draw(2);
			}
			let skills = ['paoxiao', 'wusheng'];
			if (player.maxHp >= 8) player.addAdditionalSkills("xjzh_sanguo_aogu", skills);
			else player.removeAdditionalSkills("xjzh_sanguo_aogu");
		},
	},
	"xjzh_sanguo_qicai": {
		mod: {
			cardname(card, player, name) {
				if (card.name == 'guohe') return 'shunshou';
			},
			targetInRange(card, player, target, now) {
				var type = get.type(card, 'trick');
				if (type == 'trick') return true;
			},
			ignoredHandcard(card, player) {
				if (card.hasGaintag('xjzh_sanguo_qicai')) return true;
			},
		},
		trigger: {
			player: "useCard",
		},
		forced: true,
		locked: true,
		priority: 8,
		filter(event, player) {
			return get.type(event.card, 'trick') == 'trick';
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			trigger.set("nowuxie", true);
			player.draw().gaintag.add(event.name);
		},
	},
	"xjzh_sanguo_jiqiao": {
		trigger: {
			global: ["judgeBegin", "recoverAfter"],
		},
		direct: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			if (trigger.player == player) {
				player.draw();
				return;
			}
			const result = await player.chooseBool()
				.set("ai", () => {
					let player = get.player(), trigger = get.event().getTrigger();
					return get.attitude(player, trigger.player);
				})
				.set("prompt", `〖机巧〗：令${get.translation(trigger.player)}摸两张牌或你摸一张牌`)
				.forResult();
			if (result?.bool) trigger.player.draw(2);
		},
		ai: {
			expose: 0.1,
		},
	},
	"xjzh_sanguo_jianqing": {
		trigger: {
			player: "dieBegin",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		limited: true,
		forced: true,
		locked: true,
		skillAnimation: true,
		animationColor: 'water',
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			player.storage.xjzh_sanguo_jianqing = true;
			const result = await player.chooseTarget(lib.filter.notMe)
				.set('ai', target => {
					return get.attitude(player, target) > 0;
				})
				.set("prompt", "〖鉴情〗：选择一名其他角色令其获得你的所有技能")
				.forResult();
			if (result?.bool) {
				let target = result.targets[0];
				player.line(target);
				let skills = player.getStockSkills().filter(item => item != "xjzh_sanguo_jianqing");
				target.addSkills(skills);
				target.draw(target.maxHp);
			}
		},
	},
	"xjzh_sanguo_duice": {
		forced: true,
		locked: true,
		mod: {
			selectTarget: function (card, player, range) {
				var type = get.type(card);
				if (range[1] == -1) return;
				if (game.players.length < 3) return;
				if (type == 'trick') range[1]++;
			},
		},
		group: ["xjzh_sanguo_duice_1", "xjzh_sanguo_duice_2"],
		subSkill: {
			"1": {
				audio: "ext:仙家之魂/audio/skill:1",
				forced: true,
				sub: true,
				trigger: {
					player: "phaseBegin",
				},
				content: function () {
					'step 0'
					player.judge(function (card) {
						if (get.color(card) == 'red') return 1;
						return -1
					});
					'step 1'
					if (result.bool) {
						if (player.isDamaged()) {
							player.recover();
						}
						else {
							player.draw(2);
						}
					}
				},
			},
			"2": {
				audio: "ext:仙家之魂/audio/skill:2",
				trigger: {
					target: "useCardToTargeted",
				},
				sub: true,
				forced: true,
				popup: false,
				filter: function (event, player) {
					var info = get.info(event.card);
					if (info.allowMultiple == false) return false;
					if (info.multitarget) return false;
					if (game.players.length <= 2) return false;
					if (['juedou', 'huogong', 'shunshou', 'guohe'].includes(event.card.name)) return true;
					return false;
				},
				content: function () {
					'step 0'
					player.chooseTarget('额外指定一名' + get.translation(trigger.card) + '的目标？', function (card, player, target) {
						var trigger = _status.event.getTrigger();
						if (trigger.targets.includes(target)) return false;
						return lib.filter.targetEnabled2(trigger.card, get.player(), target);
					}).set('ai', function (target) {
						var trigger = _status.event.getTrigger();
						var player = get.player();
						return get.effect(target, trigger.card, player, player);
					});
					'step 1'
					if (result.bool) {
						player.logSkill('xjzh_sanguo_duice_2', result.targets);
						trigger.targets.add(result.targets[0]);
						event.finish();
					}
				},
				ai: {
					effect: {
						target: function (card, player, target) {
							if (game.players.length < 3) return;
							if (card.name == 'juedou' || card.name == 'guohe' || card.name == 'shunshou' || card.name == 'huogong') return 0.5;
						},
					},
				},
			},
		},
	},
	"xjzh_sanguo_zhiji": {
		group: ["xjzh_sanguo_zhiji2"],
		audio: "ext:仙家之魂/audio/skill:1",
		trigger: {
			global: "useCardToBefore",
		},
		direct: true,
		locked: true,
		usable: 1,
		priority: 99,
		mod: {
			targetEnabled(card, player, target) {
				if (['nanman'].includes(card.name)) return false;
			},
		},
		filter(event, player) {
			if (['nanman', 'huogong', 'wanjian'].includes(event.card.name) && event.card.isCard) return true;
			if (event.player == player) return false;
			if (!event.isFirstTarget) return false;
			return false;
		},
		async content(event, trigger, player) {
			player.logSkill("xjzh_sanguo_zhiji", trigger.player);
			let card = get.cardPile(get.name(trigger.card, player));
			if (card) player.gain(card, 'gain2');
			else player.say(`没有符合条件的牌！`);
		},
		ai: {
			expose: 0.5,
			effect: {
				target: function (card, player, target) {
					if (['nanman', 'huogong', 'wanjian'].includes(card.name) && card.isCard) return [1, 1];
				},
			},
		},
	},
	"xjzh_sanguo_zhiji2": {
		audio: "ext:仙家之魂/audio/skill:1",
		enable: "chooseToUse",
		position: "hes",
		sub: true,
		filterCard: true,
		viewAsFilter: function (player) {
			return player.countCards('he') > 0;
		},
		viewAs: {
			name: "wuxie",
		},
		prompt: "将一张牌当无懈可击使用",
		check: function (card) { return 8 - get.value(card); },
		threaten: 1.2,
	},
	"xjzh_sanguo_bazhen": {
		forced: true,
		locked: true,
		group: ["xjzh_sanguo_bazhen_1", "xjzh_sanguo_bazhen_2"],
		subSkill: {
			"1": {
				audio: "xjzh_sanguo_bazhen",
				equipSkill: true,
				noHidden: true,
				sub: true,
				inherit: 'bagua_skill',
				filter: function (event, player) {
					if (!lib.skill.bagua_skill.filter(event, player)) return false;
					if (!player.hasEmptySlot(2)) return false;
					return true;
				},
				ai: {
					respondShan: true,
					effect: {
						target: function (card, player, target) {
							if (player == target && get.subtype(card) == 'equip2') {
								if (get.equipValue(card) <= 7.5) return 0;
							}
							if (!target.hasEmptySlot(2)) return;
							return lib.skill.bagua_skill.ai.effect.target.apply(this, arguments);
						}
					}
				}
			},
			"2": {
				audio: "xjzh_sanguo_bazhen",
				trigger: {
					player: "damageBegin",
				},
				forced: true,
				priority: 5,
				sub: true,
				filter: function (event) {
					return event.num > 1 && game.hasNature(event, 'fire');
				},
				content: function () {
					trigger.num = 1;
				},
				ai: {
					filterDamage: function (event, player) {
						if (get.tag(card, 'firedamage') >= 2) return 0.5;
						return 0.8;
					}
				},
			},
		},
	},
	"xjzh_sanguo_caiqing": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			player: "phaseUseBegin",
		},
		filter(event, player) {
			return player.countCards("h") > 0;
		},
		frequent: true,
		getDrawResult(player) {
			let cards = player.getCards("h"), maxCount = 0, suitCounts = {};
			cards.forEach(card => {
				const suit = get.suit(card);
				suitCounts[suit] = (suitCounts[suit] || 0) + 1;
				maxCount = Math.max(maxCount, suitCounts[suit]);
			});
			return maxCount;
		},
		prompt: (event, player) => `〖才情〗：是否发动〖才情〗摸${lib.skill.xjzh_sanguo_caiqing.getDrawResult(player)}张牌？`,
		xjzh_xinghunSkill: true,
		async content(event, trigger, player) {
			let num = lib.skill.xjzh_sanguo_caiqing.getDrawResult(player);
			player.draw(num);
		},
	},
	"xjzh_sanguo_zhishu": {
		trigger: {
			global: "phaseUseBegin",
		},
		check(event, player) {
			return 1;
		},
		audio: "ext:仙家之魂/audio/skill:2",
		frequent: true,
		priority: 3,
		filter(event, player) {
			return event.player != player && event.player.countCards('hej');
		},
		async content(event, trigger, player) {
			const result = await player.gainPlayerCard(trigger.player, [1, 2], 'visible', 'hej')
				.set('ai', lib.card.shunshou.ai.button)
				.set("prompt", `〖知书〗：请选择${get.translation(trigger.player)}至多2张牌`)
				.forResult();
			if (result?.bool) {
				player.draw();
				const result2 = await player.chooseCard(result.links.length, 'h', true)
					.set('ai', card => {
						if (get.attitude(get.event().getTrigger().player, player) < 0) {
							return 4 - get.value(card);
						} else {
							return 8 - get.value(card);
						}
					})
					.set("promot", `〖知书〗：交给${get.translation(trigger.player)}${get.cnNumber(result.links.length)} 张牌`)
					.forResult();
				if (result2?.bool) {
					player.addExpose(0.5);
					trigger.player.gain(result2.cards, "giveAuto", player);
				}
			}
		},
		ai: {
			expose: 0.4,
		},
	},
	"xjzh_sanguo_beige": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			global: "damageEnd",
		},
		filter(event, player) {
			return event.source && event.source != player && event.player.isIn() && player.countCards('he');
		},
		preHidden: true,
		prompt(event, player) {
			return "" + get.translation(event.source) + "对" + get.translation(event.player) + "造成了伤害，是否发动〖悲歌〗？";
		},
		check(event, player) {
			let att1 = get.attitude(player, event.player);
			let att2 = get.attitude(player, event.source);
			return att1 > 0 && att2 <= 0;
		},
		popup: false,
		async content(event, trigger, player) {
			let check = lib.skill.xjzh_sanguo_beige.check(trigger, player);
			const result = await player.chooseToDiscard('he', get.prompt('xjzh_sanguo_beige'))
				.set("ai", card => {
					if (_status.event.goon) return 8 - get.value(card);
					return 0;
				})
				.set('logSkill', 'xjzh_sanguo_beige')
				.set('goon', check)
				.forResult();
			if (result?.bool) {
				const judgeEvent = await trigger.player.judge().forResult();
				switch (get.suit(judgeEvent.card)) {
					case 'heart':
						let num = trigger.player.isDying() ? trigger.num || 1 : 1;
						trigger.player.recover(num);
						break;
					case 'diamond':
						trigger.player.draw(2);
						break;
					case 'club':
						trigger.source.countCards("he") > 0 ? trigger.source.chooseToDiscard('he', 2, true) : player.draw(2);
						break;
					case 'spade':
						trigger.source.isTurnedOver() ? player.draw(trigger.num) : trigger.source.turnOver();
						break;
				}
			}
		},
		ai: {
			expose: 0.3,
		},
	},
	"xjzh_sanguo_guihan": {
		trigger: {
			player: "dieBefore",
		},
		forced: true,
		locked: true,
		limited: true,
		mark: true,
		marktext: "汉",
		intro: {
			content: "limited",
		},
		skillAnimation: true,
		animationColor: 'water',
		animationStr: "汉家风骨",
		derivation: ["xjzh_sanguo_caiqinggai"],
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			trigger.cancel(null, null, "notrigger");
			player.awakenSkill(event.name);
			player.loseMaxHp();
			player.recoverTo(player.maxHp);
			let targetx = game.filterPlayer(current => current != player);
			targetx.sort(lib.sort.seat);
			for (let target of targetx) {
				await target.loseHp();
			}
			do {
				let target = targetx.shift();
				let list = target.getStockSkills();
				if (list.length) {
					const result = await target.chooseControl(list)
						.set('ai', () => get.min(list, get.skillRank, 'item'))
						.forResult();
					if (result?.control) {
						target.removeSkill(result.control, true);
						target.popup(result.control, 'fire');
						game.log(target, '失去技能', '#g〖' + get.translation(result.control) + '〗');
						game.delay(1.5);
					}
				}
			} while (targetx.length);
			const result2 = await player.chooseTarget(lib.filter.notMe)
				.set("prompt", '选择一名角色令其获得技能〖悲歌〗')
				.set('ai', (card, player, target) => get.attitude(player, target))
				.forResult();
			if (result2?.targets) {
				result2.targets[0].addSkills("xjzh_sanguo_beige");
				result2.targets[0].popup("xjzh_sanguo_beige", 'thunder');
				game.log(result2.targets[0], '获得技能', '#g〖' + get.translation("xjzh_sanguo_beige") + '〗');
			}
			player.removeSkills("xjzh_sanguo_beige");
		},
		ai: {
			expose: 0.5,
		},
	},
	"xjzh_sanguo_liegong": {
		mod: {
			targetInRange(card, player, target) {
				if (card.name == 'sha' && card.number && get.suit(card) == 'diamond') {
					if (get.distance(player, target) <= card.number) return true;
				}
			},
			selectTarget(card, player, range) {
				let cards = [...new Set(player.getCards('h', card => get.suit(card) != 'heart').map(item => get.suit(item)))];
				if (range[1] == -1) return;
				if (get.suit(card) != 'heart') return;
				if (game.players.length <= 2) return;
				if (!cards.length) return;
				if (card.name == 'sha') range[1] += cards.length;
			},
		},
		audio: "ext:仙家之魂/audio/skill:4",
		trigger: {
			player: "shaBegin",
		},
		logTarget: "target",
		shaRelated: true,
		frequent: true,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		prompt(event, player) {
			let str = "〖烈弓〗:是否令此【杀】无法闪避";
			let suit = get.suit(event.cards[0]);
			let cards = [...new Set(player.getCards('h', card => get.suit(card) != 'club'))].map(item => get.suit(item));
			if (suit == "spade") str += "且无视防具";
			if (suit == "club") str += "且额外弃置" + get.translation(event.target) + "" + get.translation(cards.length) + "张手牌";
			return str;
		},
		async content(event, trigger, player) {
			trigger.directHit = true;

			if (trigger.target.countCards('h') && get.suit(trigger.cards[0]) == 'club') {
				let cards = [...new Set(player.getCards('h', card => get.suit(card) != 'club'))].map(item => get.suit(item));

				player.discardPlayerCard('h', trigger.target, true, cards.length);
			}
		},
		ai: {
			threaten: 0.5,
			expose: 0.5,
			directHit_ai: true,
		},
	},
	"xjzh_sanguo_zhujian": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			source: "damageBegin3",
			player: ["damageBegin3", "phaseBegin"],
		},
		forced: true,
		locked: true,
		priority: 3,
		marktext: "箭",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		filter(event, player) {
			if (event.name == "phase") return player.getExpansions("xjzh_sanguo_zhujian").length;
			if (!event.cards || !event.cards.length) return false;
			return get.name(event.cards[0]) == "sha";
		},
		async content(event, trigger, player) {
			if (trigger.name == "phase") player.gain(player.getExpansions("xjzh_sanguo_zhujian"), "gain2", "log", player);
			else {
				let cards = get.cards();
				player.addToExpansion(cards, player, "draw").gaintag.add(event.name);
			}
		},
	},
	"xjzh_sanguo_zhujian2": {
		audio: "xjzh_sanguo_zhujian",
		trigger: {
			target: "useCard",
			player: "useCard",
		},
		frequent: true,
		priority: 4,
		marktext: "箭",
		intro: {
			content: '已记录点数：$'
		},
		filter: function (event, player) {
			if (event.card.name != "sha") return false;
			return !player.getStorage('xjzh_sanguo_zhujian2').includes(get.number(event.card));
		},
		init: function (player) {
			var cards = Array.from(ui.cardPile.childNodes).filter(card => get.name(card) == "sha");
			var num = 0
			var list = []
			for (var i of cards) {
				list.push(get.number(i));
			}
			list = list.sort((a, b) => a - b);
			var list2 = []
			for (var i = 0; i < list.length; i++) {
				if (list[i] != list[i + 1]) list2.push(list[i])
			}
			player.storage.xjzh_sanguo_zhujian3 = list2.length;
		},
		content: function () {
			"step 0"
			var num = get.number(trigger.card);
			player.markAuto('xjzh_sanguo_zhujian2', [num]);
			var cards = get.cardPile(function (card) {
				return get.number(card) != get.number(trigger.card) && card.name == "sha";
			});
			if (cards) player.gain(cards, player, "gain2");
			"step 1"
			var storage = player.getStorage('xjzh_sanguo_zhujian2');
			if (storage.length % 4 == 0) {
				if (!trigger.baseDamage) trigger.baseDamage = 1;
				var num = storage.length / 4
				trigger.baseDamage += num;
				game.log(trigger.player, '令【', trigger.card, '〗伤害加' + get.translation(num) + '');
			}
			"step 2"
			if (player.getStorage('xjzh_sanguo_zhujian2').length >= player.storage.xjzh_sanguo_zhujian3) {
				player.unmarkAuto('xjzh_sanguo_zhujian2', player.getStorage('xjzh_sanguo_zhujian2'));
			}
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (card.name == 'sha') return [1, 0.6];
				},
				player: function (card, player, target) {
					if (card.name == 'sha') return [1, 0.5];
				}
			}
		}
	},
	"xjzh_sanguo_chuzhen": {
		trigger: { player: 'useCard1' },
		forced: true,
		firstDo: true,
		filter: function (event, player) {
			return !event.audioed && event.card.name == 'sha' && player.countUsed('sha', true) > 1 && event.getParent().type == 'phase';
		},
		content: function () {
			trigger.audioed = true;
		},
		mod: {
			aiOrder: function (player, card, num) {
				var history = player.getHistory('useCard', function (evt) {
					return evt.card && evt.card.name == 'sha';
				});
				if (!history.length) return;
				if (typeof get.number(history[history.length - 1].card) != 'number') return;
				if (typeof get.number(card) != 'number') return;
				if (get.name(card) != 'sha') return;
				if (get.number(card) > get.number(history[history.length - 1].card)) {
					return num + (10 / (get.number(card) - get.number(history[history.length - 1].card)));
				}
			},
			cardUsable: function (card, player, num) {
				var history = player.getHistory('useCard', function (evt) {
					return evt.card && evt.card.name == 'sha';
				});
				if (!history.length) return;
				if (get.number(card) > get.number(history[history.length - 1].card) && card.name == "sha") return Infinity;
			},
		},
		shaRelated: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		ai: {
			skillTagFilter: function (player, tag, arg) {
				if (arg.card.name != 'sha') return false;
				var history = player.getHistory('useCard', function (evt) {
					return evt.card && evt.card.name == 'sha';
				});
				if (!history.length) return false;
				if (typeof get.number(history[history.length - 1].card) != 'number') return false;
				if (typeof get.number(arg.card) != 'number') return false;
				if (get.number(arg.card) > get.number(history[history.length - 1].card)) {
					return true;
				}
				return false;
			},
		},
	},
	"xjzh_sanguo_lanzheng": {
		trigger: {
			player: ["phaseDrawBegin", "phaseDiscardBegin"],
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (event.numFixed) return false;
			if (event.name == "phaseDiscard") return player.needsToDiscard() > 0;
			return true;
		},
		async content(event, trigger, player) {
			if (trigger.name == "phaseDraw") trigger.num += player.hp;
			else {
				if (player.needsToDiscard() >= player.maxHp) player.loseHp();
				else player.gainMaxHp();
			}
		},
	},
	"xjzh_sanguo_hengzheng": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			global: "phaseUseEnd",
		},
		forced: true,
		locked: true,
		filter(event, player) {
			if (event.player == player) return false;
			let history = event.player.getHistory('sourceDamage');
			if (!history.length) return true;
			return false;
		},
		async content(event, trigger, player) {
			const result = await trigger.player.chooseCard('he')
				.set("ai", card => {
					if (_status.event.goon) return 12 - get.value(card);
					return 0;
				}).set(
					"goon", (() => {
						if (get.damageEffect(trigger.player, player, trigger.player) > 0) return true;
						if (get.attitude(player, trigger.player) >= 0) return true;
						if (trigger.player.needsToDiscard() > 0) return true;
						return false;
					})()
				).forResult();
			if (result?.cards) player.gain(result.cards, trigger.player, "gain2");
			else trigger.player.damage(1, player, 'nocard');
		},
	},
	"xjzh_sanguo_baolian": {
		trigger: {
			global: "phaseUseBegin",
		},
		forced: true,
		locked: true,
		filter(event, player) {
			if (!event.player.countCards("h")) return false;
			return event.player != player;
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			const result = await trigger.player.chooseCard("h", true)
				.set("prompt", "〖暴敛〗:选择并展示一张手牌")
				.set("ai", card => 8 - get.value(card))
				.forResult();
			trigger.player.showCards(result.cards);
			if (player.getCards("h").some(item => get.type(item) == get.type(result.cards[0]))) player.useCard({ name: 'sha', isCard: true }, trigger.player, false);
		},
	},
	"xjzh_sanguo_linnue": {
		trigger: {
			global: 'damageBegin1',
		},
		forced: true,
		locked: true,
		zhuSkill: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (!player.hasZhuSkill('xjzh_sanguo_linnue')) return false;
			if (event.numFixed || event.num == 0) return false;
			if (!event.source || event.source == undefined) return false;
			if (event.source == player && event.player != player && player.group != event.player.group) return true;
			if (event.source != player && event.player == player && player.group != event.source.group) return true;
			return false;
		},
		async content(event, trigger, player) {
			let group = player.group;
			trigger.source == player ? trigger.num++ : trigger.num--;
		},
		ai: {
			damageBonus: true,
		},
	},
	"xjzh_sanguo_xiongbin": {
		unique: true,
		forceDie: true,
		locked: true,
		xjzh_xinghunSkill: true,
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			if (target == player) return false;
			return target.countCards('hs');
		},
		selectTarget: -1,
		position: "hs",
		multitarget: true,
		multiline: true,
		check: (card) => 6 - get.value(card),
		filterCard: true,
		selectCard: 1,
		losed: false,
		discard: false,
		filter(event, player) {
			return player.countCards("h");
		},
		async content(event, trigger, player) {
			let cards = event.cards[0], card = ui.create.card();
			player.loseToDiscardpile(cards)._triggered = null;
			card.classList.add('infohidden');
			card.classList.add('infoflip');
			player.$throw(card, 1000, 'nobroadcast');
			game.log(player, "扣置了一张牌在场上");
			game.delay(2);

			let [suits, numbers] = [get.suit(cards), get.number(cards)], list = [], targets = game.filterPlayer(target => target != player && target.countCards("h"));
			console.log(suits, numbers);
			targets.sort(lib.sort.seat);
			while (targets.length) {
				let target = targets.shift();
				const result = await target.chooseCard("h", 1, true)
					.set('ai', card => {
						let suit = get.suit(card), number = get.number(card);
						if (suit == suits || number == numbers) return 0;
						return 4 - get.value(card);
					}).forResult();
				if (result?.cards) {
					target.$throw(result.cards[0], 1000, 'nobroadcast');
					game.log(target, "展示了", result.cards[0]);
					game.delay(2);

					let suit = get.suit(result.cards[0]), number = get.number(result.cards[0]);

					if ([suits, numbers].some(item => [suit, number].includes(item))) {
						const result2 = await player.chooseBool()
							.set("ai", () => get.effect(target, { name: 'sha' }, get.player(), get.player()) > 0)
							.set("prompt", `〖雄兵〗：是否视为对${get.translation(target)}使用【杀】？`)
							.forResult();
						if (result2.bool) player.useCard({ name: 'sha' }, target, "unequip", false);
					}
					else list.push(result.cards[0]);
				}
			}
			if (list.length) player.gain(list, "gain2");
		},
		ai: {
			order: 2,
			result: {
				player(player, target, card) {
					if (player.hp <= 1 && player.countCards("h", { name: "tao" }) <= 0) return 0;
					if (game.roundNumber == 1) return 0.5;
					if (player.hp > 1) {
						if (player.countCards("h", { name: "tao" })) return 1.5;
						if (game.players.length < 3) return 1;
						if (game.players.length >= 3 && game.players.length <= 5) return 5;
						if (game.players.length > 5) return 1.5;
					}
					return 0.5;
				}
			},
			threaten: 1.5,
		},
	},
	"xjzh_sanguo_tieji": {
		audio: "ext:仙家之魂/audio/skill:4",
		trigger: {
			player: "shaBegin",
		},
		frequent: true,
		locked: true,
		shaRelated: true,
		check: function (event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		logTarget: "target",
		async content(event, trigger, player) {
			const judgeEvent = await player.judge().forResult();
			let target = trigger.target, [suit, number] = [judgeEvent.suit, judgeEvent.number];
			switch (suit) {
				case "heart":
					if (trigger.getParent(2).name != "xjzh_sanguo_xiongbin") player.getStat().card.sha--;
					break;
				case "spade":
					if (!target.hasSkill('baiban')) target.addTempSkill('baiban', 'shaAfter');
					break;
			}

			const result = await target.chooseToDiscard('he', card => {
				return [suit, number].some(item => [get.suit(card), get.number(card)].includes(item));
			})
				.set("prompt", `〖铁骑〗：请弃置一张花色为${get.translation(suit)}或点数为${get.translation(number)}的牌，否则【杀】无法闪避`)
				.set('ai', card => {
					if (_status.event.eff > 0) return 10 - get.value(card);
					return 0;
				})
				.set("eff", get.damageEffect(target, player, player))
				.forResult();
			if (!result?.bool) trigger.directHit = true;
		},
	},
	"xjzh_sanguo_jieqiang": {
		audio: "ext:仙家之魂/audio/skill:1",
		trigger: {
			player: "phaseDrawBegin",
		},
		forced: true,
		locked: true,
		mod: {
			maxHandcard(player, num) {
				return num += Math.max(player.getDamagedHp(), player.getHp(true));
			},
		},
		async content(event, trigger, player) {
			trigger.num += Math.max(player.getDamagedHp(), player.getHp(true));
		},
	},
	"xjzh_sanguo_shengxin": {
		forced: true,
		locked: true,
		marktext: "圣",
		intro: {
			name: "圣心",
			content: "发动圣心#次",
		},
		group: "xjzh_sanguo_shengxin1",
		mod: {
			ignoredHandcard(card, player) {
				if (get.suit(card) == 'heart') return true;
			},
		},
		trigger: {
			global: "useCardAfter",
		},
		filter: function (event, player) {
			return event.player != player && get.suit(event.card) == 'heart' && Math.random() <= 0.3;
		},
		content: function () {
			player.gain(game.createCard(trigger.card), 'gain2');
		},
	},
	"xjzh_sanguo_shengxin1": {
		audio: "ext:仙家之魂/audio/skill:2",
		enable: "phaseUse",
		prompt: "①选择一名体力小于你的武将，令其恢复体力与你一致并摸一张牌<li>②选择一名体力不小于你的武将，令其摸体力上限张牌",
		usable: 1,
		sub: true,
		mark: true,
		filterCard: function (card) {
			return get.suit(card) == 'heart';
		},
		filter: function (event, player) {
			if (player.countCards('h', { suit: 'heart' }) == 0) return false;
			return event.player.isAlive();
		},
		filterTarget: function (card, player, target) {
			return player != target;
		},
		content: function () {
			if (!player.storage.xjzh_sanguo_liangyi) {
				player.addMark("xjzh_sanguo_shengxin");
			}
			if (target.hp < player.hp) {
				target.recover(player.hp - target.hp);
				target.draw();
			}
			else {
				var num = (Math.min(5, target.maxHp));
				target.draw(num);
			}
		},
		ai: {
			order: 8,
			threaten: 2,
			expose: 0.6,
			result: {
				player: -1,
				target(player, target) {
					if (!target) return;
					var num = player.hp - target.hp
					if (num > 0 && num < 2) return 1.5;
					if (num >= 2) return 3;
					if (num <= 0) return 1.5;
					if (player.countCards('h') > player.hp) return 5;
					return 1.5;
				},
			},
		},
	},
	"xjzh_sanguo_jishi": {
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			global: "dying",
		},
		marktext: "济",
		intro: {
			name: "济世",
			content: "发动济世#次",
		},
		priority: 86,
		prompt: function (event, player) {
			return "" + get.translation(event.player) + "濒死，是否发动济世";
		},
		check: function (event, player) {
			if (get.attitude(player, event.player) > 2) return true;
			return false;
		},
		content: function () {
			"step 0"
			event.cards = get.cards(player.getDamagedHp() + 1);
			player.showCards(event.cards);
			"step 1"
			var num = 0;
			var cards2 = [];
			for (var i = 0; i < event.cards.length; i++) {
				if (get.suit(event.cards[i]) == 'heart') {
					num++;
				}
				if (get.color(event.cards[i]) == 'red') {
					cards2.push(event.cards[i]);
					event.cards.splice(i--, 1);
				}
			}
			game.cardsDiscard(cards2);
			if (num) {
				trigger.player.recoverTo(1);
				if (!player.storage.xjzh_sanguo_liangyi) {
					player.addMark("xjzh_sanguo_jishi");
				}
			}
			"step 2"
			if (event.cards.length) {
				player.gain(event.cards, "gain2");
				game.delay();
			}
		},
		ai: {
			save: true,
			expose: 0.8,
		},
	},
	"xjzh_sanguo_liangyi": {
		skillAnimation: true,
		animationColor: "wood",
		animationStr: "救命良医",
		limited: true,
		unique: true,
		enable: "phaseUse",
		filterTarget: function (card, player, target) {
			return player != target;
		},
		filter: function (event, player) {
			return (player.countMark("xjzh_sanguo_shengxin") >= 3 || player.countMark("xjzh_sanguo_jishi") >= 3);
		},
		forced: true,
		locked: true,
		content: function () {
			"step 0"
			player.awakenSkill(event.name);
			player.clearMark("xjzh_sanguo_shengxin");
			player.clearMark("xjzh_sanguo_jishi");
			"step 1"
			target.recover();
			target.addSkill("xjzh_sanguo_liangyi2");
			target.draw(player.hp + game.countPlayer());
			target.phase("xjzh_sanguo_liangyi");
		},
	},
	"xjzh_sanguo_liangyi2": {
		mark: true,
		marktext: "医",
		intro: {
			name: "良医",
			content: "回合结束后失去所有体力",
		},
		trigger: {
			player: "phaseEnd",
		},
		forced: true,
		locked: true,
		sub: true,
		content: function () {
			player.loseHp(player.hp);
			player.removeSkill("xjzh_sanguo_liangyi2");
		},
	},
	"xjzh_sanguo_yinren": {
		trigger: {
			global: "dieAfter",
			player: ["dieBefore", "damageBegin", "loseHpBegin", "loseMaxHpBegin"],
		},
		mark: true,
		marktext: "隐",
		intro: {
			content: "免疫体力变化",
		},
		locked: true,
		unique: true,
		forced: true,
		priority: 5,
		derivation: ["xjzh_sanguo_jilue", "xjzh_sanguo_qicaix"],
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			if (event.name == "die") return true;
			if (['loseMaxHp', 'loseHp', 'damage'].includes(event.name)) return true;
			return false;
		},
		async content(event, trigger, player) {
			let name = trigger.name, skills = lib.skill[event.name].derivation.slice(0);
			if (name == "die") {
				if (trigger.player == player) {
					trigger.cancel(null, null, 'notrigger');
				} else {
					if (trigger.player.isDead()) {
						if (skills.some(skill => !player.hasSkill(skill))) {
							let skill = skills.find(skill => !player.hasSkill(skill));
							await player.addSkills(skill);
						}
						if (skills.every(item => player.hasSkill(item))) {
							player.removeSkills('xjzh_sanguo_yinren');
							game.xjzh_playAudio('xjzh_sanguo_yinren2');
						}
					}
				}
			}
			else if (['loseMaxHp', 'loseHp', 'damage'].includes(name)) {
				trigger.cancel(null, null, 'notrigger');
			}
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card)) return [0, 0];
					if (get.tag(card, 'loseHp')) return [0, 0];
				},
			},
		},
	},
	"xjzh_sanguo_jilue": {
		enable: "phaseUse",
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			let playerHs = player.countCards('h');
			let targetHs = event.targets[0].countCards('h');
			if (playerHs > targetHs) event.targets[0].draw(playerHs - targetHs);
			else if (playerHs < targetHs) event.targets[0].chooseToDiscard(targetHs - playerHs, true);
			if (playerHs < player.maxHp) player.drawTo(player.maxHp);
		},
		ai: {
			expose: 0.5,
			order: 12,
			result: {
				player: 1,
				target(player, target, card) {
					return player.countCards('h') - target.countCards('h');
				}
			},
		}
	},
	"xjzh_sanguo_qicaix": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:2",
		filterCard(card, player, target) {
			let cardType = get.type(card);
			let onlyTypes = player.getCards('he', card => get.type(card) == cardType)
			if (onlyTypes.length == 1) return false;
			return ui.selected.cards.every(selectedCard => get.type(selectedCard) == cardType);
		},
		selectCard: 2,
		complexCard: true,
		sub: true,
		position: 'he',
		check(card, event) {
			return 6 - get.value(card);
		},
		filter(event, player) {
			let types = player.getCards('he').map(card => get.type(card));
			if (player.countCards("he") < 2) return false;
			return types.toUniqued().length != types.length;
		},
		mod: {
			cardUsable(card, player, num) {
				if (!card.cards) return;
				if (["sha", "jiu"].includes(get.name(card, player))) {
					for (let i of card.cards) {
						if (i.hasGaintag("xjzh_sanguo_qicaix")) return true;
					}
				}
			},
			targetInRange(card, player, target, now) {
				if (!card.cards) return;
				for (let i of card.cards) {
					if (i.hasGaintag("xjzh_sanguo_qicaix")) return true;
				}
			},
		},
		async content(event, trigger, player) {
			let [cardType] = [...event.cards.map(item => get.type(item)).toUniqued()];
			let card = get.cardPile(card => get.type(card) != cardType), cards = card ? card : game.createCard(card);
			player.gain(cards, player, 'draw').gaintag.add(event.name);
		},
		ai: {
			expose: 0.5,
			order: 6,
			result: {
				player(player, target, card) {
					return get.unuseful2(card, player);
				},
			},
		},
	},
	"xjzh_sanguo_bolue": {
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		forced: true,
		locked: true,
		priority: -3,
		filter(event, player) {
			return !player.hasSkill('xjzh_sanguo_yinren');
		},
		mark: true,
		marktext: "博",
		intro: {
			name: "博略",
			content(storage, player) {
				if (storage) return get.translation(storage.suits);
				return "";
			},
			markcount(storage, player) {
				if (storage) return storage.suits.length;
				return 0;
			},
		},
		init(player, skill) {
			let storage = {
				suits: [],
				skills: {
					'wei': [],
					'shu': [],
					'qun': [],
					'wu': [],
				},
			};
			let characterLists = game.xjzh_wujiangpai().filter(item => Object.keys(storage.skills).includes(get.character(item).group));
			for (let name of characterLists) {
				let info = get.character(name);
				if (info.skills?.length) storage.skills[info.group].addArray(info.skills);
			}
			player.storage[skill] = storage;
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let groups = new Map(
				[
					["heart", "shu"],
					["spade", "wei"],
					["diamond", "qun"],
					["club", "wu"],
				]
			), suits;

			if (!player.awakenedSkills.includes("xjzh_sanguo_biantian")) {
				const result = await player.judge().forResult();
				suits = get.suit(result.card, player);
				player.storage[event.name]['suits'].add(suits);
			}
			player.checkConflict();
			player.checkMarks();

			let skills = player.storage[event.name]['skills'], lists = [];
			if (suits) lists.push(skills[groups.get(suits)].randomGet());

			if (!lists.length) {
				for (let group in skills) {
					lists.add(skills[group].randomGet());
				}
			}
			player.addAdditionalSkills('xjzh_sanguo_bolue', lists);
		},
	},
	"xjzh_sanguo_biantian": {
		trigger: {
			player: "xjzh_sanguo_bolueAfter",
		},
		juexingji: true,
		limited: true,
		forced: true,
		locked: true,
		priority: -1,
		skillAnimation: true,
		animationColor: "metal",
		derivation: ["xjzh_sanguo_yingshi", "xjzh_sanguo_langgu"],
		filter(event, player) {
			let name = event.name;
			if (player.awakenedSkills.includes("xjzh_sanguo_biantian")) return false;
			if (!player.storage[name]) return false;
			let storage = player.storage.xjzh_sanguo_bolue;
			return storage['suits']?.length >= 4;
		},
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			await player.gainMaxHp();
			let list = ["spade", "heart", "club", "diamond"]
			let cards = []
			while (list.length) {
				let suits = list.shift();
				let card = get.cardPile(c => get.suit(c) == suits);
				cards.push(card ? card : game.createCard(card));
			}
			await player.gain(cards, player, 'draw');
			await player.addSkills(["xjzh_sanguo_yingshi", "xjzh_sanguo_langgu"]);
			player.unmarkSkill('xjzh_sanguo_bolue');
		},
	},
	"xjzh_sanguo_yingshi": {
		trigger: {
			global: "damageAfter",
		},
		filter(event, player) {
			let target = event.source == player ? event.player : event.source;
			if (!event.source || event.nosource) return false;
			if (!target.hasCard(card => lib.filter.canBeGained(card, player, target), get.is.single() ? "he" : "hej")) return false;
			if (event.source == player) return event.player != player;
			return event.player == player;
		},
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			let target = trigger.source == player ? trigger.player : trigger.source;
			let pos = get.is.single() ? "he" : "hej";
			player.gainPlayerCard(pos, target, 'visible', true)
				.set("target", target).set("complexSelect", false)
				.set("ai", lib.card.shunshou.ai.button)
				.set('filterButton', button => {
					if (!ui.selected.buttons.length) return true;
					return target.getGainableCards(player, pos).includes(button.link);
				});
		},
	},
	"xjzh_sanguo_langgu": {
		trigger: {
			player: ["drawBegin", "gainBegin"],
		},
		forced: true,
		locked: true,
		priority: 3,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return event.getParent().name != 'xjzh_sanguo_langgu';
		},
		async content(event, trigger, player) {
			trigger.cancel(null, null, 'notrigger');
			let owner = get.owner(trigger.cards[0]);
			if (owner && owner.getCards('hejsx').includes(trigger.cards[0])) owner.loseToDiscardpile(trigger.cards);
			else await game.cardsDiscard(trigger.cards);

			let list = ["spade", "heart", "club", "diamond"]
			let cards = []
			while (list.length) {
				let suits = list.shift();
				let card = get.cardPile(c => get.suit(c) == suits);
				cards.push(card ? card : game.createCard(card));
			}
			await player.gain(cards, player, 'draw');
		},
	},
	"xjzh_sanguo_keluan": {
		trigger: {
			target: "useCardToBefore",
		},
		frequent: true,
		check: (event, player) => get.attitude(player, event.player) < 0,
		filter: (event, player) => ["sha", "juedou"].includes(get.name(event.card)),
		async content(event, trigger, player) {
			trigger.player.countCards('he') ? player.gainPlayerCard(trigger.player, "he", true) : player.draw();
			player.addTempSkill('unequip', 'shaAfter');
			player.useCard({ name: 'sha' }, trigger.player, false);
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card)) return [0.5, 0.5];
				},
			},
		},
	},
	"xjzh_sanguo_cuifeng": {
		trigger: {
			global: "useCardToPlayer",
		},
		frequent: true,
		unique: true,
		notemp: true,
		prompt(event, player) {
			return `〖摧锋〗：${get.translation(event.player)}对${get.translation(event.target)}使用了${get.translation(event.card)}，是否发动技能将目标改为${get.translation(player)}？`
		},
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (event.player == player || event.target == player) return false;
			if (event.targets.length != 1) return false;
			return ["sha", "juedou"].includes(get.name(event.card));
		},
		logTarget: "target",
		check(event, player) {
			return get.effect(event.targets[0], event.card, event.player, player) <= get.effect(player, event.card, event.player, player);
		},
		async content(event, trigger, player) {
			await trigger.target.draw();
			trigger.targets.length = 0;
			trigger.getParent().triggeredTargets1.length = 0;
			trigger.targets.push(player);
		},
		ai: {
			notemp: true,
		},
	},
	"xjzh_sanguo_chaohuang": {
		enable: "phaseUse",
		locked: true,
		limited: true,
		mark: true,
		marktext: "凰",
		intro: {
			content: "limited",
		},
		skillAnimation: true,
		audio: "ext:仙家之魂/audio/skill:2",
		animationColor: "thunder",
		animationStr: "北地枪王",
		async content(event, trigger, player) {
			player.awakenSkill('xjzh_sanguo_chaohuang');

			let cards = player.getCards('he');
			if (cards.length >= 10) game.xjzhAchi.addProgress('百鸟朝凰', 'character', 1);
			player.discard(player.getCards('he'));
			player.drawTo(player.maxHp);

			let names = get.nameList(player);
			names.some(name => game.xjzh_hasEquiped("xjzh_qishu_chaofeng", name)) ? player.addSkill('xjzh_sanguo_chaohuang_mod') : player.addTempSkill('xjzh_sanguo_chaohuang_mod');
		},
		subSkill: {
			"mod": {
				trigger: {
					player: ['loseAfter'],
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				forced: true,
				locked: true,
				popup: false,
				unique: true,
				charlotte: true,
				nogainsSkill: true,
				superCharlotte: true,
				xjzh_xinghunSkill: true,
				mod: {
					targetInRange: (card, player, target) => get.name(card, player) == "sha",
					cardUsable: (card, player, num) => get.name(card, player) == "sha",
				},
				filter(event, player) {
					return player.countCards("h") < player.maxHp;
				},
				audio: "ext:仙家之魂/audio/skill:1",
				async content(event, trigger, player) {
					player.drawTo(player.maxHp);
				},
				ai: {
					noh: true,
					nogain: true,
				},
			},
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					let num = Math.ceil(game.roundNumber / 2);
					if (num < player.hp) return 0;
					return 2 * player.hp;
				},
			},
		},
	},
	"xjzh_sanguo_liansuo": {
		trigger: {
			player: ['phaseUseBegin'],
		},
		forced: true,
		locked: true,
		firstDo: true,
		priority: 100,
		popup: false,
		mod: {
			selectTarget: function (card, player, range) {
				if (range[1] == -1) return;
				if (game.players.length < 3) return;
				var info = get.info(card);
				if (get.suit(card) == 'club' || get.name(card) == 'tiesuo') {
					if (get.name(card) == 'tiesuo') {
						range[1] += 1;
					} else {
						if (info.notarget) return;
						if (info.multitarget) return;
						if (get.type(card) == 'equip' || get.type(card) == 'delay') return;
						range[0] = 1;
						range[1] += 1;
					}
				}
			},
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let previous = player.getPrevious();
			let next = player.getNext();
			if (previous && next) {
				return !next.hasSkill("fengyin") || !previous.hasSkill("fengyin");
			}
			return false;
		},
		async content(event, trigger, player) {
			let previous = player.getPrevious();
			let next = player.getNext();
			next.addTempSkill("fengyin");
			previous.addTempSkill("fengyin");
		},
	},
	"xjzh_sanguo_hengzhou": {
		trigger: {
			global: ["gameStart", "changeSkillsAfter", "showCharacterBegin"],
			player: ["enterGame", "dieBefore", "linkAfter"],
		},
		forced: true,
		forceDie: true,
		firstDo: true,
		locked: true,
		priority: 66,
		audio: "ext:仙家之魂/audio/skill:1",
		global: ['xjzh_zxzh_hengzhou_damage', 'xjzh_zxzh_hengzhou_ai'],
		filter(event, player, name) {
			if (name == "linkAfter") return player.isLinked();
			if (name == "gameStart") return game.roundNumber == 0;
			if (["dieBefore", "showCharacterBegin"].includes(name)) return true;
			if (name == "changeSkillsAfter") {
				if (!event.addSkill.length) return false;
				if (event.addSkill.filter(skill => {
					let info = get.info(skill), str = get.translation(skill + "_info");
					if (!str || str.length == 0) return false;
					if (event.player.awakenedSkills && event.player.awakenedSkills.includes(skill)) return false;
					if (lib.skill.global.includes(skill)) return false;
					if (event.player.disabledSkills && event.player.disabledSkills[skill] && event.player.disabledSkills[skill].includes("xjzh_sanguo_hengzhou")) return false;
					if (skill.indexOf('jycw') != -1) return false;
					return str.includes("横置");
				}).length) return true;
			}
			return false;
		},
		async content(event, trigger, player) {
			if (trigger.name == "link") {
				game.countPlayer(current => { current.link(true); });
			} else {
				if (trigger.name == "die") {
					let targets = game.filterPlayer(current => {
						if (!current.disabledSkills) return false;
						let skills = current.getSkills(null, false, false).filter(skill => {
							return current.disabledSkills && current.disabledSkills[skill] && current.disabledSkills[skill].includes("xjzh_sanguo_hengzhou")
						});
						if (skills.length) return true;
						return current != player;
					});
					targets.forEach(target => {
						let skills = target.getSkills(null, false, false).filter(skill => {
							return target.disabledSkills && target.disabledSkills[skill] && target.disabledSkills[skill].includes("xjzh_sanguo_hengzhou")
						});
						target.enableSkill("xjzh_sanguo_hengzhou");
						game.log(target, `的技能${skills.map(item => {
							return `〖${get.translation(item)}〗`;
						})}因庞统的〖横舟〗恢复了`);
					});
				} else {
					let targets = game.filterPlayer(current => current != player);
					for await (let target of targets) {
						let skills = target.getSkills(null, false, false).filter(skill => {
							let info = get.info(skill), str = get.translation(skill + "_info");
							if (!str || str.length == 0) return false;
							if (target.awakenedSkills && target.awakenedSkills.includes(skill)) return false;
							if (lib.skill.global.includes(skill)) return false;
							if (target.disabledSkills && target.disabledSkills[skill] && target.disabledSkills[skill].includes(event.name)) return false;
							if (skill.indexOf('jycw') != -1) return false;
							return str.includes("横置");
						});
						if (skills.length) {
							target.disableSkill(event.name, skills);
							game.log(target, `的技能${skills.map(item => {
								return `〖${get.translation(item)}〗`;
							})}因庞统的〖横舟〗失效了`);
							if (target.isLinked()) target.link(false);
						}
					}
				}
			}
		},
		subSkill: {
			'damage': {
				trigger: {
					player: 'damageBegin3',
				},
				direct: true,
				priority: 10,
				sub: true,
				filter(event, player) {
					if (!player.isLinked()) return false;
					if (!game.hasNature(event, 'fire')) return false;
					return true;
				},
				content() {
					trigger.num++
				},
				ai: {
					fireAttack: true,
					effect: {
						target(card, player, target) {
							if (card.nature == 'fire') return 2;
							if (get.tag(card, 'fireDamage')) return 2;
						},
					},
				},
			},
			'ai': {
				ai: {
					effect: {
						target(card, player, target) {
							let targets = game.findPlayer(current => { return current.hasSkill('xjzh_sanguo_liansuo'); });
							if (card.name == 'tiesuo') {
								if (targets != target && targets.isLinked()) return 0;
							}
						},
					},
					result: {
						player(player, target, card) {
							let targets = game.findPlayer(current => { return current.hasSkill('xjzh_sanguo_liansuo') });
							if (targets.isDead()) return;
							let suit = get.suit(card);
							let number = get.number(card);
							if (suit == 'club') return number;
						},
					},
				},
			},
		},
	},
	"xjzh_sanguo_moulue": {
		trigger: {
			global: "useCardAfter",
		},
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (player.countCards('h') == 0) return false;
			if (get.suit(event.card) != 'club') return false;
			if (!event.targets || !event.targets.length) return false;
			//if(!event.isFirstTarget) return false;
			if (player.getStorage('xjzh_sanguo_moulue').includes(get.number(event.card))) return false;
			return get.itemtype(event.cards) == 'cards' && get.position(event.cards[0], true) == 'o';
		},
		mod: {
			aiOrder(player, card, num) {
				let history = player.getHistory('useCard', function (evt) {
					return evt.card && get.suit(evt.card) == 'club';
				});
				if (!history.length) return;
				if (typeof get.number(history[history.length - 1].card) != 'number') return;
				if (typeof get.number(card) != 'number') return;
				if (get.suit(card) != 'club') return;
				if (get.number(card) > get.number(history[history.length - 1].card)) {
					return num + (10 / (get.number(card) - get.number(history[history.length - 1].card)));
				}
			},
		},
		prompt(event, player) {
			return '〖谋略〗：是否弃置一张手牌获得【' + get.translation(event.card) + '】';
		},
		frequent: true,
		priority: 9,
		marktext: '谋',
		intro: {
			content: '已记录点数：$',
		},
		check(event, player) {
			var cards = Array.from(ui.discardPile.childNodes).filter(card => get.suit(card) != 'club');
			if (!cards.length) return 0;
			return 1;
		},
		async content(event, trigger, player) {
			const result = await player.chooseCard(1, 'h')
				.set('ai', card => {
					let trigger = get.event().getTrigger();
					let num = get.number(trigger.card);
					return get.number(card) > num;
				})
				.set("prompt", `〖谋略〗：是否弃置一张手牌获得【${get.translation(trigger.card)} 〗`)
				.forResult();
			if (result?.cards) {
				let cards = result.cards;
				player.loseToDiscardpile(cards[0]);
				player.gain(trigger.cards, 'gain2', 'log');
				if (get.number(cards[0]) <= get.number(trigger.card)) return;
				let number = Math.min(player.maxHp, Math.abs(get.number(cards[0]) - get.number(trigger.card)));
				let dsiCards = Array.from(ui.discardPile.childNodes).filter(card => get.suit(card) != 'club');
				if (!dsiCards.length) return;
				let num = Math.min(number, dsiCards.length);
				const result2 = await player.chooseCardButton([1, num], dsiCards)
					.set('filterButton', button => get.suit(button.link) != 'club')
					.set('ai', button => {
						return get.value(button.link);
					})
					.set("prompt", `〖谋略〗：选择获得至多${get.translation(num)} 张牌`)
					.forResult();
				if (result2?.links) {
					player.gain(result2.links, 'gain2', 'log');
					if (!player.getStorage('xjzh_sanguo_moulue').includes(number)) player.markAuto('xjzh_sanguo_moulue', [get.number(trigger.card)]);
				}
			}
		},
	},
	"xjzh_sanguo_shijiu": {
		mod: {
			cardname: function (card, player, name) {
				if (card.name == 'jiu') return 'sha';
			},
		},
		trigger: {
			player: "useCardBefore",
		},
		filter(event, player) {
			if (event.card.name != "sha" && get.color(event.card) != "black") return false;
			return player.isPhaseUsing() && player.hasUseTarget({ name: "jiu", isCard: true }, null, false);
		},
		locked: true,
		direct: true,
		priority: 12,
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			player.chooseUseTarget({ name: 'jiu', isCard: true }, true, false, 'nopopup', 'noanimate').set('logSkill', event.name);
		},
	},
	"xjzh_sanguo_shayi": {
		mod: {
			cardUsable: function (card, player, num) {
				if (card.name == 'sha') return Infinity;
			},
			targetInRange: function (card, player, target, now) {
				if (card.name == 'sha') return true;
			},
		},
		trigger: {
			target: "useCardToTarget",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (get.name(event.card) != "sha") return false;
			if (!player.countCards("h", "sha")) return false;
			if (!game.hasPlayer(function (current) { return current.hasMark('xjzh_sanguo_zhenhun') })) return false;
			return true;
		},
		async cost(event, trigger, player) {
			event.result = await player.chooseToDiscard(1, card => get.name(card) == "sha")
				.set('ai', () => game.countPlayer(current => current.hasMark('xjzh_sanguo_zhenhun')))
				.set("prompt", "〖杀意〗：弃置一张【杀】将此牌目标改为任意武将牌上有“魂”的角色")
				.forResult();
		},
		async content(event, trigger, player) {
			if (!event.cards || !event.cards.length) return;
			let num = game.countPlayer(current => { return current.hasMark('xjzh_sanguo_zhenhun') });
			const result = await player.chooseTarget([1, num], true, (card, player, target) => {
				if (!target.hasMark('xjzh_sanguo_zhenhun')) return false;
				return target != player;
			})
				.set("prompt", "〖杀意〗：选择任意名武将牌上有“魂”的角色")
				.set('ai', target => -get.attitude(player, target))
				.forResult();
			if (result?.targets) {
				let targets = result.targets;
				await trigger.targets.remove(player);
				await trigger.targets.addArray(targets);
				game.countPlayer(current => {
					if (targets.includes(current)) current.removeMark("xjzh_sanguo_zhenhun", 1);
				});
				if (trigger.targets.length) {
					game.log(player, "将", trigger.cards[0], "的目标改为了", trigger.targets);
				}
			}
		},
	},
	"xjzh_sanguo_zhenhun": {
		trigger: {
			global: "damageAfter",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		priority: 16,
		forced: true,
		locked: true,
		marktext: "魂",
		intro: {
			name: "震魂",
			content: "mark",
		},
		group: ["xjzh_sanguo_zhenhun_sha", "xjzh_sanguo_zhenhun_die"],
		filter(event, player) {
			if (event.source && event.source.isDead()) return false;
			if (event.player && event.player.isDead()) return false;
			if (event.source == player) return event.player != player;
			return event.player == player;
		},
		async content(event, trigger, player) {
			let target;
			if (trigger.source == player && trigger.player != player) target = trigger.player;
			else if (!trigger.source) return;
			else if (trigger.source != player && trigger.player == player) target = trigger.source;
			await target.addMark("xjzh_sanguo_zhenhun", 1);
			if (target.countMark("xjzh_sanguo_zhenhun") >= 3) {
				const result = await player.chooseBool()
					.set('ai', () => -get.attitude(player, target))
					.set('target', target)
					.set("prompt", `〖震魂〗：是否令${get.translation(target)}失去${target.countMark("xjzh_sanguo_zhenhun")}点体力？`)
					.forResult();
				if (result?.bool) {
					await target.loseHp(target.countMark("xjzh_sanguo_zhenhun"));
					await target.clearMark("xjzh_sanguo_zhenhun");
				}
			}
		},
		subSkill: {
			"sha": {
				trigger: {
					player: "shaBegin",
				},
				forced: true,
				priority: 12,
				firstDo: true,
				sub: true,
				filter: function (event, player) {
					return event.target.hasMark("xjzh_sanguo_zhenhun");
				},
				content: function () {
					trigger.target.addTempSkill('baiban', 'shaAfter');
					player.draw(trigger.target.countMark('xjzh_sanguo_zhenhun'));
				},
			},
			"die": {
				trigger: {
					global: "dieAfter",
				},
				forceDie: true,
				direct: true,
				priority: -10,
				lastDo: true,
				filter: function (event, player) {
					if (event.player != player) return event.player.hasMark('xjzh_sanguo_zhenhun');
					return game.countPlayer(function (current) { return current.hasMark('xjzh_sanguo_zhenhun') });
				},
				content: function () {
					if (trigger.player != player) {
						trigger.player.clearMark("xjzh_sanguo_zhenhun", false);
					} else {
						var players = game.filterPlayer(function (current) { return current.hasMark('xjzh_sanguo_zhenhun') });
						for (var i = 0; i < players.length; i++) {
							players[i].clearMark("xjzh_sanguo_zhenhun", false);
						}
					}
				},
			},
		},
	},
	"xjzh_sanguo_bujiao": {
		trigger: {
			global: "phaseUseBegin",
		},
		frequent: true,
		priority: 3,
		locked: false,
		mod: {
			maxHandcardFinal(player, num) {
				let cards = player.getExpansions("xjzh_sanguo_bujiao"), types = cards.map(card => get.type(card)).toUniqued();
				if (types?.length) return num + types.length;
				return num;
			},
		},
		marktext: "教",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		init(player, skill) {
			player.addToExpansion(get.cards(2), "gain2", player).gaintag.add(skill);
		},
		logTarget: "player",
		audio: "ext:仙家之魂/audio/skill:2",
		filter: (event, player) => event.player != player && player.countCards("he"),
		async content(event, trigger, player) {
			const result = await player.chooseCard("he", 1)
				.set('ai', card => {
					let att = get.attitude(get.event().target, player);
					if (att > 0) return 8 - get.value(card);
					return 4 - get.value(card);
				})
				.set("prompt", `〖布教〗：是否交给${get.translation(trigger.player)} 一张牌`)
				.set("target", trigger.player)
				.forResult();
			if (result?.bool) {
				player.give(result.cards, trigger.player);
				player.addToExpansion(get.cards(), "gain2", trigger.player).gaintag.add(event.name);
			}
		},
		ai: {
			expose: 0.4,
			threaten: 1.5,
		},
	},
	"xjzh_sanguo_guidao": {
		enable: ["chooseToUse", "chooseToRespond"],
		audio: "ext:仙家之魂/audio/skill:2",
		hiddenCard(player, name) {
			let cards = player.getExpansions("xjzh_sanguo_bujiao"), types = cards.map(card => get.type(card)).toUniqued();
			if (!lib.inpile.includes(name)) return false;
			return types.includes(get.type(name));
		},
		filter(event, player) {
			let cards = player.getExpansions("xjzh_sanguo_bujiao"), types = cards.map(card => get.type(card)).toUniqued();
			if (!cards.length) return false;
			return get.inpileVCardList(info => {
				const name = info[2];
				if (!types.includes(get.type(name))) return false;
				return true;
			}).some(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));
		},
		chooseButton: {
			dialog(event, player) {
				let cards = player.getExpansions("xjzh_sanguo_bujiao"), types = cards.map(card => get.type(card)).toUniqued();
				const list = get.inpileVCardList(info => {
					const name = info[2];
					if (!types.includes(get.type(name))) return false;
					return true;
				}).filter(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));

				cards = cards.filter(card => list.some(item => get.type(item[2]) == get.type(card)));
				return ui.create.dialog('〖诡道〗：选择使用一张同类型的牌', [cards, "vcard"], 'hidden');
			},
			check(button) {
				let player = get.player();
				if (!ui.selected.buttons.length) {
					if (player.getExpansions('xjzh_sanguo_bujiao').some(i => get.type(i) == 'equip')) {
						if (get.itemtype(button.link) == 'card' && get.type(button.link) == 'equip') return 1;
						else return 0;
					}
					return player.getUseValue({
						name: button.link[2],
						nature: button.link[3],
					}) > 0;
				}
				return 1;
			},
			backup(links, player) {
				return {
					card: links[0],
					chooseButton: {
						dialog(event, player) {
							let cards = links[0];
							const list = get.inpileVCardList(info => {
								const name = info[2];
								if (get.type(cards) != get.type(name)) return false;
								if (get.type(cards) == 'equip' && get.subtype(cards) != get.subtype(name)) return false;
								return true;
							}).filter(card => event.filterCard(get.autoViewAs({ name: card[2], nature: card[3] }, "unsure"), player, event));

							return ui.create.dialog(`〖诡道〗:请选择想要使用的${get.translation(get.type(cards[2]))}牌`, [list, 'vcard'], 'hidden');
						},
						filter(button, player) {
							let event = get.event().getParent();
							return event.filterCard(get.autoViewAs({ name: button.link[2], nature: button.link[3] }, "unsure"), player, event);
						},
						check: (button) => get.useful({ name: button.link[2], nature: button.link[3] }),
						backup(links, player) {
							return {
								filterCard: (card) => card == lib.skill.xjzh_sanguo_guidao_backup.card,
								selectCard: -1,
								position: 'x',
								popname: true,
								viewAs: {
									name: links[0][2],
									nature: links[0][3],
								},
							}
						},
						prompt(links, player) {
							return '〖诡道〗：将一张牌当' + get.translation(links[0][2]) + '使用';
						}
					}
				}
			}
		},
		ai: {
			order: 6,
			fireAttack: true,
			respondSha: true,
			respondShan: true,
			save: true,
			respondTao: true,
			skillTagFilter(player, tag, arg) {
				let name;
				switch (tag) {
					case "respondSha":
						name = "sha";
						break;
					case "respondShan":
						name = "shan";
						break;
					default:
						name = "tao";
						break;
				}
				return lib.skill["xjzh_sanguo_guidao"].hiddenCard(player, name);
			},
			result: {
				player(player, target, card) {
					if (player.hp <= 2) return 3;
					return player.getExpansions('xjzh_sanguo_bujiao').length - 1;
				},
			}
		}
	},
	"xjzh_sanguo_fangshu": {
		trigger: {
			player: "phaseUseBegin",
		},
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			let cards = player.getExpansions("xjzh_sanguo_bujiao"), types = cards.map(card => get.type(card)).toUniqued();
			let num = Math.min(types.length || 1, 3);
			let showCardsList = get.cards(num);
			player.showCards(showCardsList);

			let colorList = showCardsList.map(card => get.color(card));
			if (colorList.toUniqued().length == 1) {
				player.gain(showCardsList, "gain2", player);
			} else {
				let redList = showCardsList.filter(card => get.color(card) == 'red');
				let blackList = showCardsList.filter(card => get.color(card) == 'black');
				if (redList.length < blackList.length) {
					const result = await player.chooseTarget(1, lib.filter.notMe)
						.set('ai', target => get.damageEffect(target, get.player(), get.player(), 'thunder'))
						.set("prompt", "〖方术〗：选择一名其他角色对其造成1点雷属性伤害")
						.forResult();
					if (result?.targets) result.targets[0].damage("thunder", 1, "nocard", player);
				} else {
					const result = await player.chooseCardButton(showCardsList)
						.set('complexSelect', true)
						.set('selectButton', 2)
						.set('filterButton', button => {
							if (!ui.selected.buttons.length) return true;
							let card = ui.selected.buttons[0].link;
							if (get.color(card) == get.color(button.link)) return false;
							if (ui.selected.buttons.length >= get.event().num) return false;
							return true;
						})
						.set('num', num)
						.set('ai', button => get.value(button.link))
						.set("prompt", `〖方术〗：选择2张颜色不同牌将其置于武将牌上`)
						.forResult();
					if (result?.links) player.addToExpansion(result.links, "gain2", player).gaintag.add("xjzh_sanguo_bujiao");
				}
			}
		},
		ai: {
			order: 12,
			expose: 0.8,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_sanguo_taiping": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			player: 'damageEnd',
		},
		filter(event, player) {
			if (event.numFixed) return false;
			if (!event.source || event.nosource) return false;
			return true;
		},
		priority: 3,
		frequent: true,
		prompt(event, player) {
			return "〖太平〗:你受到" + get.translation(event.source) + "的伤害，是否判定？";
		},
		async content(event, trigger, player) {
			const result = await trigger.source.judge(card => {
				if (get.color(card) == 'black') return -2;
				return 2;
			})
				.set('judge2', result => true)
				.forResult();
			if (result?.judge < 0) {
				player.addToExpansion(result.card, "gain2", player).gaintag.add("xjzh_sanguo_bujiao");
				player.draw();
			} else {
				player.recover();
			}

			if (player.isPhaseUsing()) return;

			game.broadcastAll(ui.clear);
			let evt = trigger.getParent(1, true);
			while (evt?.name != "phaseLoop") {
				if (evt) {
					if (evt.name == "phase") {
						evt.pushHandler("onPhase", (event, option) => {
							if (event.step != 13) {
								event.step = 13;
								game.broadcastAll(player => {
									player.classList.remove("glow_phase");
									if (_status.currentPhase) {
										game.log(_status.currentPhase, "结束了回合");
										delete _status.currentPhase;
									}
								}, player);
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
		},
		ai: {
			effect: {
				target: 1,
			}
		}
	},
	"xjzh_sanguo_shanxi": {
		mod: {
			targetEnabled: function (card) {
				if (card.name == 'shandian') return false;
			},
			ignoredHandcard(card, player) {
				if (get.name(card) == 'shan') return true;
			},
		},
		trigger: {
			global: ["useCard", "respond"],
		},
		frequent: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		check(event, player) {
			return get.damageEffect(event.player, player, player, 'thunder');
		},
		filter(event, player) {
			if (event.card.name == 'shan' && event.player != player) return true;
			return false;
		},
		prompt(event, player) {
			return "〖雷祭〗：令" + get.translation(event.player) + "进行一次【闪电】判定。";
		},
		async content(event, trigger, player) {
			trigger.player.executeDelayCardEffect('shandian').set("judge", card => {
				if (get.color(card) == "black" && get.number(card) > 1 && get.number(card) < 10) return -5;
				return 1;
			}).set("judge2", result => {
				if (result.bool == false) return true;
				return false;
			});
		},
		ai: {
			threaten: 0.8,
			effect: {
				target(card, player, target) {
					if (card.name == "shandian") return [0, 0];
				},
			},
		},
	},
	"xjzh_sanguo_leijix": {
		trigger: {
			player: ["damageAfter", "useCard", "respond"],
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player, name) {
			if (name == "damageAfter") return true;
			return event.card.name == "shan";
		},
		async content(event, trigger, player) {
			const judgeEvent = await player.judge().forResult();
			const result = await player.chooseTarget()
				.set("ai", target => {
					let player = get.player();
					let att = get.attitude(player, target);
					let num = lib.card.tiesuo.ai.result.target(player, target);
					if (get.event().color == "red") {
						if (att < 0) {
							return -num;
						} else {
							if (target.isLinked()) return num;
							return 0.2;
						}
					}
					return get.damageEffect(target, player, player, "thunder");
				})
				.set("color", judgeEvent.color)
				.set("prompt", `〖雷祭〗：选择一个目标令其${judgeEvent.color == "red" ? "横置/取消横置" : "受到一点雷属性伤害"}`)
				.forResult();
			if (result?.targets) {
				switch (judgeEvent.color) {
					case "red": {
						result.targets[0].link();
					};
						break;
					case "black": {
						result.targets[0].damage(player, 1, "nocard", "thunder");
					};
						break;
				}
			}
			player.gain(judgeEvent.card, player, "gain2", "log");
		},
		ai: {
			expose: 0.3,
		},
	},
	"xjzh_sanguo_shendao": {
		trigger: { global: "judge" },
		preHidden: true,
		lastDo: true,
		frequent: true,
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let str = `〖神道〗：${get.translation(trigger.player)}的${trigger.judgestr || ""}判定为${get.translation(trigger.player.judging[0])}，请选择一张牌作为判定结果`;
			const result = await player.chooseCardButton(str, get.cards(Math.max(4, player.hp)))
				.set("filterButton", button => {
					const player = get.player();
					const mod2 = game.checkMod(button.link, player, "unchanged", "cardEnabled2", player);
					if (mod2 != "unchanged") return mod2;
					const mod = game.checkMod(button.link, player, "unchanged", "cardRespondable", player);
					if (mod != "unchanged") return mod;
					return true;
				})
				.set("ai", button => {
					const trigger = get.event().getTrigger();
					const player = get.player();
					const judging = get.event().judging;
					const result = trigger.judge(button.link) - trigger.judge(judging);
					const attitude = get.attitude(player, trigger.player); let val = get.value(button.link);
					if (get.subtype(button.link) == "equip2") val /= 2;
					else val /= 4;
					if (attitude == 0 || result == 0) return 0;
					if (attitude > 0) {
						return result - val;
					}
					return -result - val;
				})
				.set("judging", trigger.player.judging[0])
				.setHiddenSkill("xjzh_sanguo_shendao")
				.forResult();

			if (!result?.bool) return;

			await player.respond(result.links, "xjzh_sanguo_shendao", "highlight", "noOrdering");
			if (trigger.player.judging[0].clone) {
				trigger.player.judging[0].clone.classList.remove("thrownhighlight");
				game.broadcast(function (card) {
					if (card.clone) {
						card.clone.classList.remove("thrownhighlight");
					}
				}, trigger.player.judging[0]);
				game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
			}
			game.cardsDiscard(trigger.player.judging[0]);
			trigger.player.judging[0] = result.links[0];
			trigger.orderingCards.addArray(result.links);
			game.log(trigger.player, "的判定牌改为", result.links[0]);
			await game.delay(2);
		},
		ai: {
			rejudge: true,
			tag: {
				rejudge: 1,
			},
		},
	},
	"xjzh_sanguo_leihun": {
		trigger: {
			global: "damageBefore",
		},
		forced: true,
		locked: true,
		priority: -8,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (event.numFixed) return false;
			return game.hasNature(event, "thunder") || event.source === player;

		},
		async content(event, trigger, player) {
			if (!game.hasNature(trigger, "thunder")) await game.setNature(trigger, 'thunder', true);
			if (trigger.player == player) {
				player.recover(trigger.num);
				trigger.changeToZero();
			} else {
				trigger.source = player;
			}
		},
		ai: {
			expose: 0.4,
			threaten: 2,
			nothunder: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'thunderDamage')) {
						if (target.isHealthy()) return 'zerotarget';
						if (target.hp == 1) return [0, 2];
						return [0, 1];
					}
				},
			},
		},
	},
	"xjzh_sanguo_hongfa": {
		trigger: {
			player: "damageAfter",
			source: "damageAfter",
		},
		forced: true,
		locked: true,
		marktext: "电",
		mark: true,
		audio: "xjzh_sanguo_dianjie",
		intro: {
			name: "弘法",
			content: "当前拥有#个标记，6个标记可发动技能〖电界〗",
		},
		filter(event, player) {
			if (get.sourceSkillFor(event.getParent(2)) == "xjzh_sanguo_dianjie") return false;
			return game.hasNature(event, "thunder");
		},
		async content(event, trigger, player) {
			player.addMark("xjzh_sanguo_hongfa", trigger.num);
			player.updateMark();
		},
	},
	"xjzh_sanguo_dianjie": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:2",
		filterTarget: lib.filter.notMe,
		filter(event, player) {
			return player.countMark("xjzh_sanguo_hongfa") >= 6;
		},
		forceDie: true,
		selectTarget: [1, 3],
		multitarget: true,
		multiline: true,
		targetprompt: ["目标一", "目标二", "目标三"],
		async content(event, trigger, player) {
			let targets = event.targets;
			player.removeMark("xjzh_sanguo_hongfa", 6);
			targets.sortBySeat();

			if (targets.length == 3) {
				for (let target of targets) {
					target.damage('nocard', 'thunder');
				}
			}
			else if (targets.length == 2) {
				const chooseTargets = await player.chooseTarget('请选择受到2点伤害的角色', true, (card, player, target) => {
					let targets = get.event().targets;
					return targets.includes(target);
				})
					.set('ai', target => {
						let player = get.player();
						return get.damageEffect(target, player, player, 'thunder');
					})
					.set('forceDie', true)
					.set('targets', targets);
				if (chooseTargets) {
					let damageTargets = [...chooseTargets, targets.filter(i => !chooseTargets.includes(i))];
					for (let [index, target] of damageTargets.entries()) {
						target.damage(index == 0 ? 2 : 1, 'nocard', 'thunder');
					}
				}
			}
			else if (targets.length == 1) {
				const result = await player.chooseNumbers(get.translation(event.name), [{ prompt: `请选择对${get.translation(targets)}造成伤害点数`, min: 1, max: 3 }], true)
					.set("processAI", () => {
						return [3];
					})
					.forResult();
				let num = result?.numbers[0];
				targets[0].damage(num, 'nocard', 'thunder');
			}
		},
		ai: {
			order: 12,
			combo: "xjzh_sanguo_hongfa",
			result: {
				target(player, target, card) {
					if (target.hasSkillTag('nodamage')) return 0;
					if (player.hasUnknown()) return 0;
					return get.damageEffect(target, player, player, 'thunder');
				},
			},
		},
	},
	"xjzh_sanguo_huangtian": {
		trigger: {
			player: "enterGame",
			global: "gameStart",
		},
		forced: true,
		locked: true,
		popup: false,
		zhuSkill: true,
		derivation: ["xinleiji", "xjzh_sanguo_yishi"],
		audio: "ext:仙家之魂/audio/skill:3",
		filter(event, player) {
			return player.hasZhuSkill('xjzh_sanguo_huangtian');
		},
		async content(event, trigger, player) {
			player.addAdditionalSkill('xjzh_sanguo_huangtian', lib.skill[event.name].derivation.slice(0));
		},
	},
	"xjzh_sanguo_yishi": {
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		forced: true,
		locked: true,
		priority: 66,
		sub: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return event.player != player;
		},
		async content(event, trigger, player) {
			let cards = get.cards(2);
			const result = await player.chooseCardButton(cards)
				.set("ai", button => get.value(button.link))
				.set("prompt", "选择一张牌获得之")
				.forResult();
			if (result?.links) {
				player.gain(result.links[0], "gain2");
				trigger.player.gain(cards.filter(card => !result.links.includes(card)), "gain2");
			}
		},
	},
	"xjzh_sanguo_shenji": {
		mod: {
			selectTarget(card, player, range) {
				if (range[1] == -1) return;
				if (player.getEquip(1)) return;
				if (game.players.length < 3) return;
				if (card.name == 'sha') range[1] += 2;
			},
			aiValue(player, card, num) {
				if (game.players.length <= 3 && card.name == "fangtian") return player.maxHp + 3.5;
			},
		},
		trigger: {
			player: "useCard",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (!player.getEquips(1)) return false;
			return event.card && get.name(event.card) == "sha";
		},
		frequent: true,
		locked: true,
		priority: 99,
		async content(event, trigger, player) {
			await player.addTempSkill("wushuang", "useCardAfter");
			if (player.getEquips("fangtian").length) {
				if (!trigger.baseDamage) trigger.baseDamage = 1;
				trigger.baseDamage += 1;
				game.log(player, '令【', trigger.card, '】伤害加1。')
			}
		},
	},
	"xjzh_sanguo_shenwei": {
		trigger: {
			player: ["changeHp", "loseMaxHpEnd", "gainMaxHpEnd"],
		},
		forced: true,
		locked: true,
		derivation: ["xjzh_sanguo_guiqu", "xjzh_sanguo_xiuluo"],
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			if (trigger.name == "changeHp" && player.getHp(true) > 2) {
				player.draw(2);
				return;
			}

			if (player.maxHp != 2) {
				player.maxHp = 2;
				player.recoverTo(player.maxHp);
				player.update();
			}

			player.changeSkills(get.info(event.name).derivation, ["xjzh_sanguo_shenwei"]);

			let node;
			//觉醒时换头像
			if (player.name2 && player.name2 == 'xjzh_sanguo_splvbu') node = player.node.avatar2;
			else node = player.node.avatar;
			game.broadcastAll(node => {
				node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_sanguo_splvbu1.jpg');
			}, node);

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
			player.insertPhase(event.name);
		},
		ai: {
			maixue: true,
			maixue_hp: true,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card) || get.tag(card, 'loseHp')) return [1, 0.7];
				}
			}
		}
	},
	"xjzh_sanguo_guiqu": {
		trigger: {
			player: ["changeHp", "loseMaxHpBefore", "gainMaxHpBefore"],
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		bannedList: ["mashu", "xjzh_sanguo_shenji", "xjzh_sanguo_xiuluo", "xjzh_sanguo_guiqu"],
		async content(event, trigger, player) {
			let name = trigger.name;
			if (["loseMaxHp", "gainMaxHp"].includes(name)) {
				trigger.cancel(null, null, "notrigger");
				return;
			}
			if (player.isDamaged()) {
				let skills = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					if (!get.skillInfoTranslation(skill)) return false;
					if (lib.skill.global.includes(skill)) return false;
					if (lib.skill[event.name].bannedList.includes(skill)) return false;
					return !info.xjzh_qishuSkill;
				});
				if (!skills.length) return;
				let dialog = ui.create.dialog('〖鬼躯〗：请选择一个技能移除之并回复一点体力', 'hidden');
				let table = document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin = '0';
				table.style.width = '100%';
				table.style.position = 'relative';
				for (let skill of skills) {
					let td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.innerHTML = '<span>' + (lib.translate[skill]) + '</span>';
					td.link = skill;
					td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
					table.appendChild(td);
					dialog.buttons.add(td);
				}
				dialog.content.appendChild(table);
				dialog.add('　');

				const result = await player.chooseButton(dialog)
					.set("ai", () => Math.random())
					.forResult();
				if (result?.links) {
					player.removeSkills(result.links[0]);
					player.recover();
					player.draw();
				}
			} else {
				if (player.hasUseTarget({ name: 'sha' })) player.chooseUseTarget({ name: 'sha' }).set('addCount', false);
			}
		},
	},
	"xjzh_sanguo_xiuluo": {
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		init(player, skill) {
			player.storage[skill] = []
			lib.skill[skill].getSkillList(player);
		},
		getSkillList(player) {
			let list = game.xjzh_wujiangpai(), skills = [];

			list.forEach(name => {
				let characters = lib.character[name];
				if (characters.skills && characters.skills.length) {
					for (let skill of characters.skills) {
						if (lib.translate[skill] && lib.translate[skill + '_info']) {
							let info = get.info(skill);
							if (info && (info.gainable || !info.unique) && !info.zhuSkill && !info.juexingji && !info.limited && !info.dutySkill) {
								if (!lib.skill.global.includes(skill) && info.shaRelated) skills.add(skill);
							}
						}
					}
				}
			});

			player.storage.xjzh_sanguo_xiuluo.addArray(skills);
		},
		filter(event, player) {
			return event.card && get.name(event.card) == "sha" && player.storage.xjzh_sanguo_xiuluo.length;
		},
		async content(event, trigger, player) {
			let skills = player.storage.xjzh_sanguo_xiuluo.slice(0).filter(skill => !player.hasSkill(skill)).randomGet();
			await player.addSkills(skills);
		},
		ai: {
			maixie: true,
		},
	},
	//《玄武江湖·李辟尘·七剑》
	"xjzh_sanguo_luoshen": {
		trigger: {
			player: "useCard",
		},
		priority: 72,
		unique: true,
		frequent: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			var evt = player.getLastUsed(1);
			if (!evt || !evt.card) return false;
			if (!event.isPhaseUsing(player)) return false;
			var evt2 = evt.getParent('phaseUse');
			if (!evt2 || evt2.name != 'phaseUse' || evt2.player != player) return false;
			return true;
		},
		group: ["xjzh_sanguo_luoshen1", "xjzh_sanguo_luoshen2"],
		content: function () {
			"step 0"
			var bool = false;
			var evt = player.getLastUsed(1);
			var suita = get.suit(evt.card);
			var suitb = get.suit(trigger.card);
			if (suita && suita != suitb) {
				bool = true;
			}
			if (bool) {
				player.draw();
			} else {
				event.finish();
			}
			/*"step 1"
			player.chooseCard('h').set('ai',function(card){
				var player=get.player();
				var next=get.player().next;
				var value=get.value(card);
				if(next){
					var att=get.attitude(player,next);
					if(att>0){
						value+=20;
					}else{
						value-=20;
					}
				}
				return -value;
			}).set('prompt','请选择一张牌，将其置于牌堆顶。');
			"step 2"
			if(result.bool){
				event.card=result.cards[0];
				event.card.fix();
				player.lose(result.cards[0],ui.cardPile,'insert');
				game.log(player,'将一张牌置于牌堆顶');
				player.$throw(1,1000);
				game.updateRoundNumber();
			}
			else{
				event.finish();
			}*/
		},
		ai: {
			threaten: 2,
			guanxing: true,
		},
	},
	"xjzh_sanguo_luoshen1": {
		trigger: {
			global: "judgeAfter",
		},
		sub: true,
		priority: 100,
		audio: "ext:仙家之魂/audio/skill:2",
		frequent: function (event, card) {
			if (get.color(event.result.card) == 'red') return true;
			return false;
		},
		locked: true,
		content: function () {
			"step 0"
			if (get.color(trigger.result.card) == 'red') {
				player.draw();
				event.finish();
			}
			else if (get.color(trigger.result.card) == 'black') {
				player.chooseTarget('选择一个目标弃置其一张牌', function (card, player, target) {
					return target != player && target.countCards("hej");
				})
					.set('ai', function (target) {
						if (target.countCards("j")) return get.attitude(player, target);
						if (target.countCards("he")) return -get.attitude(player, target);
					});
			}
			"step 1"
			if (result.bool) {
				game.xjzh_playAudio(['xjzh_sanguo_luoshen_11', 'xjzh_sanguo_luoshen_12'].randomGet());
				player.discardPlayerCard(result.targets[0], 'hej', '是否弃置其一张牌？');
			}
		},
	},
	"xjzh_sanguo_luoshen2": {
		trigger: {
			player: ["drawBegin"],
		},
		audio: "ext:仙家之魂/audio/skill:2",
		forced: true,
		popup: false,
		sub: true,
		content: function () {
			trigger.bottom = true;
		},
	},
	"xjzh_sanguo_qixian": {
		inherit: 'qixian',
	},
	"xjzh_sanguo_qingguo": {
		trigger: {
			player: ["chooseToRespondBegin", "chooseToUseBegin"],
		},
		group: ["xjzh_sanguo_qingguo1"],
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (event.responded) return false;
			if (event.bagua_skill) return false;
			if (!event.filterCard || !event.filterCard({ name: 'shan' }, player, event)) return false;
			if (event.name == 'chooseToRespond' && !lib.filter.cardRespondable({ name: 'shan' }, player, event)) return false;
			if (player.countCards("h", { name: 'shan' })) return false;
			return true;
		},
		check: function (event, player) {
			if (event && (event.ai || event.ai1)) {
				var ai = event.ai || event.ai1;
				var tmp = _status.event;
				_status.event = event;
				var result = ai({ name: 'shan' }, get.player(), event);
				_status.event = tmp;
				return result > 0;
			}
			return true;
		},
		content: function () {
			"step 0"
			trigger.xjzh_sanguo_qingguo = true;
			player.judge('xjzh_sanguo_qingguo', function (card) {
				return (get.color(card) == 'black') ? 1.5 : -0.5
			});
			"step 1"
			if (result.judge > 0) {
				trigger.untrigger();
				trigger.set('responded', true);
				trigger.result = { bool: true, card: { name: 'shan', isCard: true } }
				event.finish();
			}
			else if (player.countCards("he") >= 2) {
				player.chooseToDiscard('he', 2, '弃置两张牌视为使用一张闪').set('ai', function (card) {
					if (player.countCards("he") <= 2) return 0.5;
					if (player.countCards("h", { name: "shan" })) return 0;
					if (trigger.baseDamage == 1) return 1.5;
					return 4 - get.value(card);
				});
			}
			"step 2"
			if (result.bool) {
				trigger.untrigger();
				trigger.set('responded', true);
				trigger.result = { bool: true, card: { name: 'shan', isCard: true } }
			}
		},
		ai: {
			respondShan: true,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, 'respondShan')) return 0.5;
				},
			},
		},
	},
	"xjzh_sanguo_qingguo1": {
		trigger: {
			global: "dying",
		},
		sub: true,
		prompt: function (event, player) {
			return "〖倾国〗：是否进行一次判定，若为♥则" + get.translation(event.player) + "视为使用一张桃";
		},
		audio: "xjzh_sanguo_qingguo",
		filter: function (event, player) {
			if (event.player.countCards("h", { name: "tao" }) > 0) return false;
			return true;
		},
		check: function (event, player) {
			if (event.player.hasSkill("duanchang") && game.players.length >= 3 && event.source == player) return true;
			if (get.attitude(player, event.player) > 0) return true;
			return false;
		},
		content: function () {
			"step 0"
			trigger.player.judge('xjzh_sanguo_qingguo', function (card) {
				return (get.color(card) == 'red') ? 1.5 : -0.5
			});
			"step 1"
			if (result.suit == "heart") {
				trigger.player.useCard({ name: 'tao', isCard: true }, trigger.player);
			}
			else if (result.suit == "diamond") {
				if (player.countCards('h', { suit: "heart" }) <= 0) return;
				player.chooseToDiscard('是否弃置一张♥手牌令' + get.translation(trigger.player) + '视为使用一张桃', function (card) {
					return get.suit(card) == "heart";
				}).ai = function (card) {
					if (get.attitude(player, trigger.player) > 0) return 4 - get.value(card);
					return -1;
				}
			}
			"step 2"
			if (result.bool) {
				trigger.player.useCard({ name: 'tao', isCard: true }, trigger.player);
			}
		},
		ai: {
			save: true,
			respondTao: 0.25,
			expose: 0.8,
			effect: {
				target: function (card, player, target) {
					if (get.tag(card, 'respondTao')) return 0.25;
				},
			},
		},
	},
	"xjzh_sanguo_mingzheng": {
		trigger: {
			global: "phaseDrawBegin",
			player: "damageEnd",
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:1",
		filter: function (event, player) {
			if (event.name == "damage") return true;
			return event.player.group == "wu";
		},
		derivation: "xjzh_sanguo_baozheng",
		content: function () {
			"step 0"
			if (trigger.name == "damage") {
				game.xjzh_playAudio('xjzh_sanguo_baozheng_damage');
				player.removeSkill("xjzh_sanguo_mingzheng");
				player.addSkill("xjzh_sanguo_baozheng");
				event.finish();
				return;
			}
			if (trigger.player != player) {
				if (player.hasZhuSkill('xjzh_sanguo_renjun')) {
					trigger.num += 2;
				} else {
					trigger.num++
				}
			} else {
				var num = game.countPlayer(function (current) {
					return current.group == "wu";
				})
				if (num > 0) player.draw(num);
			}
		},
	},
	"xjzh_sanguo_baozheng": {
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:4",
		filter: function (event, player) {
			return event.player != player;
		},
		marktext: "暴",
		intro: {
			name: "暴政",
			content: "mark",
		},
		group: ["xjzh_sanguo_baozheng2"],
		content: function () {
			var hs = trigger.player.getCards('he');
			if (hs.length) {
				player.gainPlayerCard('he', true, trigger.player);
				trigger.player.addMark("xjzh_sanguo_baozheng", 1);
			}
		},
	},
	"xjzh_sanguo_baozheng2": {
		trigger: {
			source: "damageBegin",
		},
		forced: true,
		locked: true,
		sub: true,
		audio: "xjzh_sanguo_baozheng",
		filter: function (event, player) {
			return event.player.hasMark('xjzh_sanguo_baozheng');
		},
		content: function () {
			"step 0"
			if (player.hasZhuSkill('xjzh_sanguo_renjun')) trigger.num += 2;
			else trigger.num++;
			"step 1"
			var num = trigger.player.countMark('xjzh_sanguo_baozheng');
			player.draw(num);
			trigger.player.clearMark('xjzh_sanguo_baozheng');
		},
	},
	'xjzh_sanguo_renjun': {
		trigger: {
			player: "phaseUseBegin",
		},
		locked: true,
		forced: true,
		unique: true,
		zhuSkill: true,
		priority: 3,
		filter: function (event, player) {
			return player.hasZhuSkill('xjzh_sanguo_renjun');
		},
		content: function () {
			if (player.hasSkill("xjzh_sanguo_mingzheng")) {
				player.chooseUseTarget({ name: "wugu" }, true);
				game.xjzh_playAudio('xjzh_sanguo_mingzheng1');
			} else {
				player.chooseUseTarget({ name: "wanjian" }, true);
				game.xjzh_playAudio('xjzh_sanguo_baozheng3');
			}
		},
	},
	"xjzh_sanguo_wusheng": {
		trigger: {
			player: "damageEnd",
			source: "damageSource",
		},
		forced: true,
		locked: true,
		priority: 9,
		audio: "ext:仙家之魂/audio/skill:2",
		group: ["xjzh_sanguo_wusheng_sha"],
		marktext: "武",
		intro: {
			content: "mark",
		},
		mod: {
			targetInRange(card, player, target) {
				let evt = _status.event;
				if (get.name(card) == 'sha' && evt && evt.name == 'chooseToUse' && evt.player == player && evt.skill == 'xjzh_sanguo_wusheng_sha') return true;
			},
			cardUsable(card, player, num) {
				if (get.name(card) == 'sha' && player.getEquips("qinglong").length) return player.getDamagedHp(true) + num;
			},
		},
		filter(event, player) {
			if (event.getParent().skill == "xjzh_sanguo_wusheng_sha") return false;
			if (event.getParent(5).skill == "xjzh_sanguo_wushen") return false;
			return true;
		},
		getIndex(event, player) {
			return event.num || 1;
		},
		async content(event, trigger, player) {
			player.addMark("xjzh_sanguo_wusheng", 1);
		},
		subSkill: {
			"sha": {
				enable: ["chooseToUse", "chooseToRespond"],
				audio: "xjzh_sanguo_wusheng",
				cardaudio: false,
				popname: true,
				popup: false,
				filterCard: false,
				selectCard: 0,
				sub: true,
				viewAsFilter(player) {
					return player.hasMark("xjzh_sanguo_wusheng");
				},
				viewAs: { name: "sha", color: "red" },
				async precontent(event, trigger, player) {
					player.removeMark("xjzh_sanguo_wusheng", 1);
				},
				ai: {
					order: 3,
					useSha: true,
					respondSha: true,
				},
			},
		},
	},
	"xjzh_sanguo_hengdao": {
		trigger: {
			player: "phaseDrawBegin",
		},
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) == "qinglong") return player.getDamagedHp(true) + 3.5;
			},
		},
		forced: true,
		locked: true,
		priority: 6,
		audio: "xjzh_sanguo_wushen",
		async content(event, trigger, player) {
			if (player.getEquips("qinglong").length) trigger.num += 2;
			else player.equip(game.createCard("qinglong"), true);
		},
	},
	"xjzh_sanguo_wushen": {
		trigger: {
			player: "dieBegin",
		},
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) == "qinglong") return player.getDamagedHp(true) + 3.5;
			},
		},
		forced: true,
		locked: true,
		limited: true,
		mark: true,
		priority: 6,
		marktext: "神",
		intro: {
			content: "limited",
		},
		animationStr: "武神降世",
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return player.hasMark("xjzh_sanguo_wusheng");
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);

			while (player.hasMark("xjzh_sanguo_wusheng")) {
				await player.chooseUseTarget({ name: "sha", color: "red" }).set("prompt", `【武神】:选择对一名角色使用一张【杀】？`);
				player.removeMark("xjzh_sanguo_wusheng", 1);
			}
		},
	},
	"xjzh_sanguo_mashu": {
		audio: "ext:仙家之魂/audio/skill:1",
		firstDo: true,
		trigger: {
			player: "useCard1",
		},
		forced: true,
		filter: function (event, player) {
			return !event.audioed && event.card.name == 'sha';
		},
		content: function () {
			trigger.audioed = true;
		},
		mod: {
			globalFrom: function (from, to, distance) {
				return distance - 1;
			},
			cardUsable: function (card, player, num) {
				if (player.hp <= 1 && card.name == 'sha') return num + 1;
			}
		},
	},
	"xjzh_sanguo_feijiang": {
		enable: "phaseUse",
		unique: true,
		usable: 1,
		group: ["xjzh_sanguo_feijiang_recover"],
		audio: "ext:仙家之魂/audio/skill:1",
		content: function () {
			'step 0'
			if (player.hp > 1) {
				player.damage("nosource");
			}
			else {
				if (player.maxHp > 1) {
					player.loseMaxHp();
				}
				else {
					event.goto(1);
				}
			}
			player.discard(player.getCards("h"));
			'step 1'
			player.draw();
			'step 2'
			event.card = result[0];
			player.addTempSkill("xjzh_sanguo_feijiang_qipai", "phaseEnd");
			if (event.card.name != "sha") {
				player.draw(get.number(event.card));
			}
			else {
				player.addTempSkill("xjzh_sanguo_feijiang_zenshang", "phaseEnd");
				player.addTempSkill("xjzh_sanguo_feijiang_buff", "phaseEnd");
			}
		},
		ai: {
			expose: 0.5,
			order: function () {
				var player = get.player();
				if (player.getCardUsable('sha') > 0) {
					if (player.hasCard("sha", "h")) return 0.5;
					if (!player.hasCard("sha", "h")) return 1;
				}
				if (!player.getStat().skill.xjzh_sanguo_jiwu) {
					if (player.hasSkill('xjzh_sanguo_qiangxilvbu') && !player.hasSkill('xjzh_sanguo_xuanfenglvbu') && !player.hasSkill('xjzh_sanguo_wanshalvbu') && !player.hasSkill('xjzh_sanguo_tiejilvbu')) return 10;
					if (player.hasSkill('xjzh_sanguo_qiangxilvbu') || !player.hasSkill('xjzh_sanguo_xuanfenglvbu') || !player.hasSkill('xjzh_sanguo_wanshalvbu') || !player.hasSkill('xjzh_sanguo_tiejilvbu')) {
						if (player.countCards("h") > 0) return 0.1;
						if (player.countCards("h") <= 0) return 10;
						return 0.5;
					}
				}
				if (player.hp <= 2) {
					if (player.countCards("h") > 0) return 0.5;
					if (player.countCards("h") <= 0) return 1;
				}
				return 1;
			},
			result: {
				player: function (player) {
					var player = get.player();
					if (player.getCardUsable('sha') > 0) {
						if (player.hasCard("sha", "h")) return 0.5;
						if (!player.hasCard("sha", "h")) return 1;
					}
					if (!player.getStat().skill.xjzh_sanguo_jiwu) {
						if (player.hasSkill('xjzh_sanguo_qiangxilvbu') && !player.hasSkill('xjzh_sanguo_xuanfenglvbu') && !player.hasSkill('xjzh_sanguo_wanshalvbu') && !player.hasSkill('xjzh_sanguo_tiejilvbu')) return 10;
						if (player.hasSkill('xjzh_sanguo_qiangxilvbu') || !player.hasSkill('xjzh_sanguo_xuanfenglvbu') || !player.hasSkill('xjzh_sanguo_wanshalvbu') || !player.hasSkill('xjzh_sanguo_tiejilvbu')) {
							if (player.countCards("h") > 0) return 0.1;
							if (player.countCards("h") <= 0) return 10;
							return 0.5;
						}
					}
					if (player.hp <= 2) {
						if (player.countCards("h") > 0) return 0.5;
						if (player.countCards("h") <= 0) return 1;
					}
					return 1;
				}
			}
		},
		subSkill: {
			"zenshang": {
				trigger: {
					source: "damageBegin",
				},
				sub: true,
				forced: true,
				content: function () {
					trigger.num++
				},
			},
			"qipai": {
				trigger: {
					player: "phaseDiscardBegin",
				},
				direct: true,
				sub: true,
				content: function () {
					var num = player.countCards('h');
					if (num > 1) player.chooseToDiscard(num - 1, true);
					else if (num < 1) player.draw();
				},
			},
			"buff": {
				mod: {
					attackRange: function (player, range, distance) {
						return Infinity;
					},
				},
				sub: true,
			},
			"recover": {
				trigger: {
					player: "phaseAfter",
				},
				direct: true,
				sub: true,
				filter: function (event, player) {
					return player.getStat('damage');
				},
				content: function () {
					player.recover();
				},
			}
		},
	},
	"xjzh_sanguo_qiangxilvbu": {
		audio: "ext:仙家之魂/audio/skill:2",
		inherit: 'reqiangxi',
		sub: true,
		usable: 2,
		filterTarget: function (card, player, target) {
			if (player == target) return false;
			if (target.hasSkill('reqiangxi_off')) return false;
			return true;
		},
	},
	"xjzh_sanguo_tiejilvbu": {
		audio: "ext:仙家之魂/audio/skill:1",
		inherit: 'retieji',
		priority: -1,
		sub: true,
	},
	"xjzh_sanguo_wanshalvbu": {
		audio: "ext:仙家之魂/audio/skill:2",
		inherit: 'wansha',
		sub: true,
	},
	"xjzh_sanguo_xuanfenglvbu": {
		audio: "ext:仙家之魂/audio/skill:2",
		inherit: 'rexuanfeng',
		sub: true,
	},
	"xjzh_sanguo_jiwu": {
		audio: "ext:仙家之魂/audio/skill:2",
		enable: 'phaseUse',
		derivation: ["xjzh_sanguo_qiangxilvbu", "xjzh_sanguo_tiejilvbu", "xjzh_sanguo_xuanfenglvbu", "xjzh_sanguo_wanshalvbu"],
		filter: function (event, player) {
			if (player.countCards('h') == 0) return false;
			if (!player.hasSkill('xjzh_sanguo_qiangxilvbu')) return true;
			if (!player.hasSkill('xjzh_sanguo_tiejilvbu')) return true;
			if (!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return true;
			if (!player.hasSkill('xjzh_sanguo_wanshalvbu')) return true;
			return false;
		},
		filterCard: true,
		position: 'he',
		sub: true,
		check: function (card) {
			if (get.position(card) == 'e' && get.player().hasSkill('xjzh_sanguo_xuanfenglvbu')) return 16 - get.value(card);
			return 7 - get.value(card);
		},
		content: function () {
			'step 0'
			var list = [];
			if (!player.hasSkill('xjzh_sanguo_qiangxilvbu')) list.push('xjzh_sanguo_qiangxilvbu');
			if (!player.hasSkill('xjzh_sanguo_tiejilvbu')) list.push('xjzh_sanguo_tiejilvbu');
			if (!player.hasSkill('xjzh_sanguo_xuanfenglvbu')) list.push('xjzh_sanguo_xuanfenglvbu');
			if (!player.hasSkill('xjzh_sanguo_wanshalvbu')) list.push('xjzh_sanguo_wanshalvbu');
			if (list.length == 1) {
				player.addTempSkill(list[0]);
				event.finish();
			}
			else {
				player.chooseControl(list, function () {
					if (list.includes('xjzh_sanguo_xuanfenglvbu') && player.countCards('he', { type: 'equip' })) return 'xjzh_sanguo_xuanfenglvbu';
					if (!player.getStat().skill.xjzh_sanguo_qiangxilvbu) {
						if (player.hasSkill('xjzh_sanguo_qiangxilvbu') && player.getEquip(1) && list.includes('xjzh_sanguo_xuanfenglvbu')) return 'xjzh_sanguo_xuanfenglvbu';
						if (list.includes('xjzh_sanguo_wanshalvbu') || list.includes('xjzh_sanguo_qiangxilvbu')) {
							var players = game.filterPlayer();
							for (var i = 0; i < players.length; i++) {
								if (players[i].hp == 1 && get.attitude(player, players[i]) < 0) {
									if (list.includes('xjzh_sanguo_wanshalvbu')) return 'xjzh_sanguo_wanshalvbu';
									if (list.includes('xjzh_sanguo_qiangxilvbu')) return 'xjzh_sanguo_qiangxilvbu';
								}
							}
						}
					}
					if (list.includes('xjzh_sanguo_qiangxilvbu')) return 'xjzh_sanguo_qiangxilvbu';
					if (list.includes('xjzh_sanguo_wanshalvbu')) return 'xjzh_sanguo_wanshalvbu';
					if (list.includes('xjzh_sanguo_xuanfenglvbu')) return 'xjzh_sanguo_xuanfenglvbu';
					return 'xjzh_sanguo_tiejilvbu';
				})
					.set('prompt', '选择获得一项技能直到回合结束');
			}
			'step 1'
			player.addTempSkill(result.control);
			player.popup(get.translation(result.control));
		},
		ai: {
			order: function () {
				var player = get.player();
				if (player.countCards('e', {
					type: 'equip'
				})
				) return 10;
				if (!player.getStat().skill.xjzh_sanguo_qiangxilvbu) {
					if (player.hasSkill('xjzh_sanguo_qiangxilvbu') && player.getEquip(1) && !player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return 10;
					if (player.hasSkill('xjzh_sanguo_wanshalvbu')) return 1;
					var players = game.filterPlayer();
					for (var i = 0; i < players.length; i++) {
						if (players[i].hp == 1 && get.attitude(player, players[i]) < 0) return 10;
					}
				}
				return 1;
			},
			result: {
				player: function (player) {
					if (player.countCards('e', {
						type: 'equip'
					})
					) return 1;
					if (!player.getStat().skill.xjzh_sanguo_qiangxilvbu) {
						if (player.hasSkill('xjzh_sanguo_qiangxilvbu') && player.getEquip(1) && !player.hasSkill('xjzh_sanguo_xuanfenglvbu')) return 1;
						if (!player.hasSkill('xjzh_sanguo_wanshalvbu') || !player.hasSkill('xjzh_sanguo_qiangxilvbu')) {
							var players = game.filterPlayer();
							for (var i = 0; i < players.length; i++) {
								if (players[i].hp == 1 && get.attitude(player, players[i]) < 0) return 1;
							}
						}
					}
					return 0;
				}
			}
		}
	},
	"xjzh_sanguo_shishu": {
		trigger: {
			source: "damageSource",
			player: "damageEnd",
		},
		forced: true,
		locked: true,
		priority: -1,
		mark: true,
		marktext: "书",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		mod: {
			cardname(card, player) {
				if (!card.hasGaintag('xjzh_sanguo_shishu')) return;
				if (get.color(card) == "red") return "huogong";
				if (get.color(card) == "black") return "wuxie";
			},
			canBeGained(card, player, target) {
				if (!card.hasGaintag('xjzh_sanguo_shishu')) return;
				return false;
			},
			cardDiscardable(card, player) {
				if (!card.hasGaintag('xjzh_sanguo_shishu')) return;
				return false;
			},
			canBeDiscarded(card, player, target) {
				if (!card.hasGaintag('xjzh_sanguo_shishu')) return;
				return false;
			},
			canBeReplaced(card, source, player) {
				if (!card.hasGaintag('xjzh_sanguo_shishu')) return;
				return false;
			},
		},
		getIndex(event, player) {
			return event.num || 1;
		},
		group: ["xjzh_sanguo_shishu2"],
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let cards = get.cards(2);
			const result = await player.chooseCardButton(cards, true)
				.set("ai", button => get.value(button.link, player, 'raw'))
				.set("prompt", `〖识书〗：选择一张牌获得之，另一张牌置于武将牌上`)
				.forResult();
			player.gain(result.links[0], "gain2", "log");
			player.addToExpansion(cards.find(item => item != result.links[0]), "draw", player).gaintag.add(event.name);
		},
		ai: {
			maixie: true,
			maixie_hp: true,
		},
	},
	"xjzh_sanguo_shishu2": {
		trigger: {
			player: ['chooseToRespondBegin', 'chooseToUseBegin'],
		},
		forced: true,
		lastDo: true,
		locked: true,
		unique: true,
		charlotte: true,
		sub: true,
		/*audio:"xjzh_sanguo_shishu",*/
		hiddenCard(player, name) {
			let cards = player.getExpansions("xjzh_sanguo_shishu");
			if (name == "wuxie") return cards.some(item => get.color(item) == "black");
			if (name == "huogong") return cards.some(item => get.color(item) == "red");
		},
		filter(event, player) {
			if (event.responded || event.skill) return false;
			let cards = player.getExpansions("xjzh_sanguo_shishu");
			if (!cards.length) return false;
			return cards.some(card => {
				if (get.color(card) == "red") return event.filterCard && event.filterCard({ name: "huogong" }, player, event);
				return event.filterCard && event.filterCard({ name: "wuxie" }, player, event);
			});
		},
		async content(event, trigger, player) {
			let cards = player.getExpansions("xjzh_sanguo_shishu");
			player.directgain(cards, null, 'xjzh_sanguo_shishu');

			if (trigger.onuse) {
				onuse = trigger.onuse;
			};

			let next = game.createEvent('xjzh_sanguo_shishu_tri', false);
			next.player = player;
			next.setContent(() => {
				let cards = player.getCards("h", card => card.hasGaintag("xjzh_sanguo_shishu"));
				player.addToExpansion(cards, "draw", player).gaintag.add("xjzh_sanguo_shishu");
			});
			event.next.remove(next);
			trigger.after.push(next);
		},
	},
	"xjzh_sanguo_wulue": {
		enable: "phaseUse",
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		derivation: ["zhiheng", "gongxin"],
		/*mod:{
			selectTarget(card,player,range){
				if(range[1]==-1) return;
				if(game.players.length<3) return;
				if(get.name(card)=="huogong") range[1]++;
			},
		},*/
		filter(event, player) {
			return player.getExpansions("xjzh_sanguo_shishu").length || player.countCards("h", card => card.hasGaintag("xjzh_sanguo_shishu"));
		},
		async content(event, trigger, player) {
			let cards = player.getExpansions("xjzh_sanguo_shishu") || player.getCards("h", card => card.hasGaintag("xjzh_sanguo_shishu"));
			player.showCards(cards);
			let num = cards.filter(item => get.color(item) == "red").length, num2 = cards.length - num;
			num > num2 ? player.addTempSkill("gongxin") : player.addTempSkill("zhiheng");
			const result = await player.chooseTarget(get.prompt2("xjzh_sanguo_wulue"), (card, player, target) => {
				if (target == player) return false;
				return !target.getEquips("tengjia").length;
			})
				.set("ai", target => {
					return -get.attitude(player, target);
				})
				.forResult();
			if (result?.targets) {
				let targets = result.targets;
				player.storage.xjzh_sanguo_wulue_target = targets[0];
				let skills = get.skillsFromEquips([{ name: "tengjia" }]);
				if (!skills.length) return;
				targets[0].$gain2(game.createCard({ name: "tengjia" }));
				targets[0].addTempSkill(skills);
				player.addTempSkill('xjzh_sanguo_wulue_target');
			};
		},
		subSkill: {
			"target": {
				mark: true,
				marktext: "武",
				onremove(player, skill) {
					delete player.storage.xjzh_sanguo_wulue_target;
				},
				sub: true,
				intro: {
					content: '本回合内<font color=yellow>$</font>视为装备了<font color=yellow>藤甲</font>直到回合结束'
				},
			},
		},
		ai: {
			order: 12,
			result: {
				target(player, target, card) {
					if (target?.hasSkill('xjzh_sanguo_wulue_target') && target?.getEquips('tengjia')?.length) return 0;
					return -1;
				},
			}
		},
	},
	"xjzh_sanguo_liantui": {
		trigger: {
			player: "loseAfter",
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		locked: true,
		priority: 9,
		audio: "ext:仙家之魂/audio/skill:2",
		mod: {
			targetEnabled(card, player, target) {
				let type = get.type(card), color = get.color(card), cards = target.getExpansions("xjzh_sanguo_shishu") || player.getCards("h", card => card.hasGaintag("xjzh_sanguo_shishu"));
				if (!cards.length) return;
				if (!["trick", "delay"].includes(type)) return;
				if (cards.some(item => get.color(item) == "red") && color == "red") return false;
				if (cards.some(item => get.color(item) == "black") && color == "black") return false;
			},
		},
		filter(event, player) {
			if (player.countCards("h")) return false;
			const evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		async content(event, trigger, player) {
			player.drawTo(player.maxHp);
			if (player.isDamaged()) player.recover();
		},
		ai: {
			threaten: 0.8,
			effect: {
				target(card) {
					if (card.name == "guohe" || card.name == "liuxinghuoyu") return 0.5;
				},
			},
			noh: true,
			skillTagFilter(player, tag) {
				if (tag == "noh") {
					if (player.countCards("h") != 1) return false;
				}
			},
		},
	},
	"xjzh_sanguo_buqu": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			player: ['phaseBefore', 'dying'],
		},
		forced: true,
		locked: true,
		priority: -10,
		init: function (player) {
			player.storage.xjzh_sanguo_buqu = player.maxHp;
		},
		filter: function (event, player) {
			if (event.name == "dying") {
				return player.maxHp > player.storage.xjzh_sanguo_buqu;
			}
			return true;
		},
		content: function () {
			"step 0"
			if (trigger.name == "phase") {
				if (player.isDamaged()) {
					player.recover();
				} else {
					player.gainMaxHp();
				}
				event.finish();
			}
			"step 1"
			player.loseMaxHp();
			player.recoverTo(1);
		},
		ai: {
			save: true,
			skillTagFilter: function (player, tag, target) {
				if (player != target) return false;
			},
		},
	},
	"xjzh_sanguo_fenji": {
		trigger: {
			global: "damageEnd",
		},
		check(event, player) {
			let target = get.player()
			let att = get.attitude(player, target);
			if (att > 0) {
				if (player.storage.xjzh_sanguo_buqu) return player.maxHp - player.storage.xjzh_sanguo_buqu;
				return player.maxHp > 2;
			}
			return 0;
		},
		prompt(event, player) {
			return `〖奋激〗：是否展示牌堆顶${player.maxHp * 2}张牌并令${get.translation(event.player)}获得其中任意一种花色的所有牌？`;
		},
		async content(event, trigger, player) {
			await player.loseMaxHp();
			let cards = get.cards(player.maxHp * 2);
			game.cardsGotoOrdering(cards);
			player.showCards(cards, '奋激');
			let suits = [...new Set(cards.map(card => get.suit(card)))], dialog = ui.create.dialog('hidden', '〖奋激〗：请选择一种花色的牌令' + get.translation(trigger.player) + '获得之', [cards, 'vcard']);
			const result = await player.chooseControl(suits).set('ai', () => Math.random())
				.set('dialog', dialog)
				.forResult();
			if (result?.control) {
				let list = []
				for await (let card of cards) {
					if (get.suit(card) == result.control) list.push(card);
				}
				cards.removeArray(list);
				trigger.player.gain(list, 'draw');
				player.gain(cards, 'draw');
			}
			if (game.hasPlayer(current => { return player.canUse({ name: "sha" }, current) })) player.chooseToUse('〖奋激〗：选择一个目标对其使用一张【杀】', { name: 'sha' });
		},
	},
	//《金庸群侠传·绝独孤求败·无招》
	"xjzh_sanguo_guimou": {
		marktext: "谋",
		mark: true,
		locked: true,
		unique: true,
		charlotte: true,
		intro: {
			name: "神鬼之谋",
			mark: function (dialog, storage, player) {
				var cardPile = Array.from(ui.cardPile.childNodes);
				if (!cardPile.length) return '';
				cardPile = cardPile.slice(0, Math.min(3, cardPile.length));
				if (player.isUnderControl(true)) {
					dialog.addAuto(cardPile);
				} else {
					return '';
				}
			},
		},
		ai: {
			respondShan: true,
			respondSha: true,
			save: true,
			skillTagFilter: function (player, tag, arg) {
				var event = _status.event;
				var cardPile = Array.from(ui.cardPile.childNodes);
				if (!cardPile.length) return false;
				cardPile = cardPile.slice(0, Math.min(3, cardPile.length));
				for (var i = 0; i < cardPile.length; i++) {
					if (tag == 'respondSha') {
						if (cardPile[i].name == 'sha') return true;
					} else if (tag == 'respondShan') {
						if (cardPile[i].name == 'shan') return true;
					} else if (tag == 'save') {
						if (cardPile[i].name == 'jiu' || cardPile[i].name == 'tao') return true;
					};
				};
				return false;
			},
		},
		group: ["xjzh_sanguo_guimou_discard"],
		audio: "ext:仙家之魂/audio/skill:2",
		hiddenCard: function (player, name) {
			var cardPile = Array.from(ui.cardPile.childNodes);
			if (!cardPile.length) return false;
			cardPile = cardPile.slice(0, Math.min(3, cardPile.length));;
			return cardPile.some(i => i.name == name);
		},
		filter: function (event, player) {
			if (event.responded || event.skill) return false;
			var cardPile = Array.from(ui.cardPile.childNodes);
			if (!cardPile.length) return false;
			cardPile = cardPile.slice(0, Math.min(3, cardPile.length));
			return cardPile.some(i => event.filterCard && event.filterCard(i, player, event));
		},
		mod: {
			cardEnabled2: function (card, player) {
				if (_status.event.skill && get.itemtype(card) == 'card' && card.hasGaintag('xjzh_sanguo_guimou')) return false;
			},
		},
		trigger: { player: ['chooseToRespondBegin', 'chooseToUseBegin'] },
		forced: true,
		lastDo: true,
		copy: function (cards) {
			var result = [];
			for (var i of cards) {
				var card = ui.create.card(ui.special);
				card.init([
					i.suit,
					i.number,
					i.name,
					i.nature,
				]);
				//card.storage.vanish=true;
				card.cardid = i.cardid,
					card.wunature = i.wunature,
					card.storage = i.storage,
					card.relatedCard = i;
				result.push(card);
			};
			return result;
		},
		contentx: function () {
			"step 0"
			if (trigger.result.bool) {
				if (trigger.onresult) {
					trigger.onresult(trigger.result);
					delete trigger.onresult;
				};
			};
			"step 1"
			player.lose(event.cards, ui.special)._triggered = null;
			"step 2"
			for (var i of event.cards) {
				i.fix();
				i.remove();
				i.destroyed = true;
			};
		},
		content: function () {
			"step 0"
			var cardPile = Array.from(ui.cardPile.childNodes);
			cardPile = cardPile.slice(0, Math.min(3, cardPile.length));
			event.cards = lib.skill.xjzh_sanguo_guimou.copy(cardPile);
			player.directgains(event.cards, null, 'xjzh_sanguo_guimou');
			"step 1"
			var evt = trigger;
			var onresult = false;
			if (evt.onresult) {
				onresult = evt.onresult;
			};
			var next2 = game.createEvent('xjzh_sanguo_guimou_clear', false);
			next2.cards = event.cards;
			next2.player = player;
			next2._trigger = evt;
			next2.setContent(lib.skill.xjzh_sanguo_guimou.contentx);
			event.next.remove(next2);
			evt.after.push(next2);
			evt.onresult = function (result) {
				if (evt.after.includes(next2)) {
					evt.after.remove(next2);
					evt.next.push(next2);
				};
				if (result.cards && result.cards.length && (result.cards[0].hasGaintag('xjzh_sanguo_guimou') || event.cards.includes(result.cards[0]))) {
					var card2 = result.cards[0];
					result.cards[0] = result.cards[0].relatedCard;
					var cardx = result.cards[0];
					result.card = {
						name: get.name(card2),
						suit: get.suit(card2),
						number: get.number(card2),
						nature: get.nature(card2),
						isCard: true,
						cardid: cardx.cardid,
						wunature: cardx.wunature,
						storage: cardx.storage,
						cards: [cardx],
					};
				};
				if (onresult) onresult.apply(evt, arguments);
				delete evt.onresult;
			};
		},
		subSkill: {
			"discard": {
				trigger: {
					player: "gainBefore",
					global: ["gameDrawAfter"],
				},
				forced: true,
				priority: 100,
				firstDo: true,
				popup: false,
				audio: "xjzh_sanguo_guimou",
				filter: function (event, player) {
					if (event.name == 'gain') return true;
					return player.getCards('h').length;
				},
				content: function () {
					if (trigger.name == 'gain') {
						trigger.cancel();
						var owner = get.owner(trigger.cards[0]);
						if (owner && owner.getCards('hejsx').includes(trigger.cards[0])) owner.lose(trigger.cards, ui.discardPile);
						else game.cardsDiscard(trigger.cards);
						game.log(trigger.cards, '进入了弃牌堆');
					} else {
						var cards = player.getCards('h');
						if (cards.length) {
							player.discard(cards);
						}
					}
				},
				ai: {
					nokeep: true,
					nogain: true,
				},
			},
		},
	},
	//《极略自用·sr张飞·蓄劲》
	"xjzh_sanguo_tianji": {
		enable: "phaseUse",
		locked: true,
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			for (let i = 0; i < game.players.length; i++) {
				if (game.players[i].countCards("j")) {
					return true;
				}
			}
			return false;
		},
		filterTarget: function (card, player, target) {
			if (ui.selected.targets.length == 0) return true;
			if (ui.selected.targets[0].countCards('j') == 0 && target.countCards('j') == 0) return false;
			return player.hp > 0;
		},
		selectTarget: 2,
		multitarget: true,
		multiline: true,
		targetprompt: ['目标一', '目标二'],
		content: function () {
			"step 0"
			targets[0].swapJudgeCards(targets[1]);
			/*"step 1"
			var num=player.hp+2
			event.cards=get.bottomCards(num);
			player.showCards(event.cards,'天机');
			"step 2"
			event.dialog=ui.create.dialog('是否发动〖天机〗？选择一种类型的牌交给一名角色',event.cards);
			var split={
				basic:[],
				delay:[],
				trick:[],
				equip:[]
			};
			for(const card of event.cards){
				let type=get.type(card);
				split[type].push(card);
			}
			var controlList=[];
			for(const type in split){
				if(split[type].length)
				controlList.push(lib.translate[type]);
			}
			var next=player.chooseControl([...controlList,"取消"],event.dialog);
			next.set('ai',function(){
				var splitValue={};
				for(const type in split){
					splitValue[type]=split[type].reduce((v,b)=>v+get.value(b,player),0);
				}
				if(Object.keys(splitValue).some(type=>splitValue[type]>10)){
					let type=Object.keys(splitValue).reduce((a,b)=>splitValue[a]>splitValue[b]?a:b);
					return lib.translate[type];
				}
				else{
					return "取消";
				}
			});
			event._split = split;
			"step 3"
			if(result.control=="取消"){
				event.finish();
			}
			else{
				for(const type in event._split){
					if(lib.translate[type]==result.control)
					event.cards=event._split[type];
				}
				player.chooseTarget('选择获得卡牌的目标',true,function(card,player,target){
					return target==targets[0]||target==targets[1];
				})
				.ai=function(target){
					return get.attitude(player,target);
				};
			}
			"step 4"
			if(event.cards.length) {
				result.targets[0].gain(event.cards,'gain2');
			}*/
			game.delay();
		},
		ai: {
			threaten: 1.2,
		},
	},
	"xjzh_sanguo_tianqi": {
		enable: "phaseUse",
		locked: true,
		forceDie: true,
		unique: true,
		xjzh_xinghunSkill: true,
		charlotte: true,
		nogainsSkill: true,
		group: ["xjzh_sanguo_tianqi_limited"],
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			var targets = game.filterPlayer();
			for (var i = 0; i < targets.length; i++) {
				var list = targets[i].getSkills(null, false, false).filter(function (skill) {
					var info = lib.skill[skill];
					return info && info.juexingji && !info.filterTarget && !info.filterCard && !targets[i].awakenedSkills.includes(skill);
				});
				if (list.length > 0) return true;
			}
			return false;
		},
		filterTarget: function (card, player, target) {
			if (target.getSkills(null, false, false).filter(function (skill) {
				var info = lib.skill[skill];
				return info && info.juexingji && !info.filterTarget && !info.filterCard && !target.awakenedSkills.includes(skill);
			}).length > 0) return true;
			return false;
		},
		usable: 1,
		selectTarget: 1,
		content: function () {
			'step 0'
			player.loseHp();
			var list = target.getSkills(null, false, false).filter(function (skill) {
				var info = lib.skill[skill];
				return info && info.juexingji && !info.filterTarget && !info.filterCard && !target.awakenedSkills.includes(skill);
			});
			if (list.length) {
				if (list.length == 1) {
					event._result = { bool: true, control: list[0] };
				}
				else {
					player.chooseControl(list, 'cancel2').set('prompt', '选择发动' + get.translation(trigger.player) + '的一项技能（限限定技和觉醒技）');
				}
			}
			"step 1"
			if (result && result.control && result.control != "cancel2") {
				target.useSkill(result.control);
			}
		},
		ai: {
			order: 0.1,
			expose: 0.5,
			result: {
				target: function (player, target) {
					if (player.hasUnknown()) return 0;
					var list = target.getSkills(null, false, false).filter(function (skill) {
						var info = lib.skill[skill];
						return info && info.juexingji;
					});
					if (list.length || get.attitude(target, player, player) > 0) return 10;
					return 0;
				},
			},
		},
		subSkill: {
			"limited": {
				trigger: {
					global: ["gameStart"],
				},
				sub: true,
				direct: true,
				firstDo: true,
				priority: 100,
				audio: "ext:仙家之魂/audio/skill:1",
				filter: function (event, player) {
					var targets = game.filterPlayer(function (current) { return current != player });
					var list = []
					for (var i = 0; i < targets.length; i++) {
						var skills = targets[i].getSkills(null, false, false).filter(function (skill) {
							var info = lib.skill[skill];
							return info && info.limited;
						});
						if (skills.length) list.push(skills);
					}
					return list.length;
				},
				content: function () {
					"step 0"
					player.chooseTarget(true, "〖天启〗:请选择一名角色获得其一项限定技", function (card, player, target) {
						var list = target.getSkills(null, false, false).filter(function (skill) {
							var info = lib.skill[skill];
							return info && info.limited;
						});
						return list.length;
					}).set('ai', function (target) {
						return Math.random();
					});
					"step 1"
					if (result.bool) {
						var list = result.targets[0].getSkills(null, false, false).filter(function (skill) {
							var info = lib.skill[skill];
							return info && info.limited;
						});
						if (list.length) {
							if (list.length == 1) {
								event._result = { bool: true, control: list[0] };
							} else {
								player.chooseControl(list).set('ai', function () {
									//return get.max(list,get.skillRank,'item');
									return list.randomGet();
								});
							}
						} else {
							event.finish();
							return;
						}
						event.target = result.targets[0]
					} else {
						event.finish();
						return;
					}
					"step 2"
					if (result && result.control) {
						var skills = result.control
						player.addSkillLog(skills);
						event.target.removeSkill(skills, true);
						player.logSkill("xjzh_sanguo_tianqi_limited");
						player.storage.xjzh_sanguo_tianqi_limited = skills;
						var info = lib.skill[skills];
						info.filter = function (event, player) {
							info.xjzh_sanguo_tianqi_limited_filter = info.filter;
							if (player.storage.xjzh_sanguo_tianqi_limited) return true;
							return this.xjzh_sanguo_tianqi_limited_filter.apply(this, arguments);
						}
					}
				},
			},
		},
	},
	"xjzh_sanguo_longnu": {
		mark: true,
		locked: true,
		marktext: "☯",
		zhuanhuanji: true,
		intro: {
			name: "龙怒",
			content: function (storage, player, skill) {
				if (player.storage.xjzh_sanguo_longnu == true) return '出牌阶段，你的红色手牌均视为【火杀】且无距离限制';
				return '出牌阶段，你的黑色手牌均视为【雷杀】且无使用次数限制';
			},
		},
		trigger: {
			global: "phaseUseBegin",
		},
		forced: true,
		audio: "ext:仙家之魂/audio/skill:2",
		content: function () {
			"step 0"
			if (trigger.player != player) {
				if (trigger.player.isMaxHandcard(true) || player.countCards("h") <= player.hp) {
					if (trigger.player.countCards("he")) {
						player.gainPlayerCard(trigger.player, true, 'he');
						trigger.player.draw();
					}
				}
				event.finish();
			}
			else {
				event.goto(1);
			}
			"step 1"
			if (player.storage.xjzh_sanguo_longnu == true) {
				player.storage.xjzh_sanguo_longnu = false;
				player.loseMaxHp();
				player.draw();
				player.addTempSkill('xjzh_sanguo_longnu_2', 'phaseUseAfter');
				player.addTempSkill('xjzh_sanguo_longnu_taoyuan', 'phaseUseAfter');
			} else {
				player.storage.xjzh_sanguo_longnu = true;
				player.loseHp();
				player.draw();
				player.addTempSkill('xjzh_sanguo_longnu_1', 'phaseUseAfter');
				player.addTempSkill('xjzh_sanguo_longnu_wanjian', 'phaseUseAfter');
			};
		},
		subSkill: {
			"1": {
				mod: {
					cardname: function (card, player) {
						if (get.color(card) == 'red') return 'sha';
					},
					cardnature: function (card, player) {
						if (get.color(card) == 'red') return 'fire';
					},
					targetInRange: function (card, player, target, now) {
						if (get.color(card) == 'red') return true;
					},
				},
				sub: true,
				ai: {
					effect: {
						target: function (card, player, target, current) {
							if (get.tag(card, 'respondSha') && current < 0) return 0.6
						},
					},
					respondSha: true,
				},
			},
			"2": {
				mod: {
					cardname: function (card, player) {
						if (get.color(card) == 'black') return 'sha';
					},
					cardnature: function (card, player) {
						if (get.color(card) == 'black') return 'thunder';
					},
					cardUsable: function (card, player) {
						if (card.name == 'sha' && card.nature == 'thunder') return Infinity;
					},
				},
				sub: true,
				ai: {
					effect: {
						target: function (card, player, target, current) {
							if (get.tag(card, 'respondSha') && current < 0) return 0.6
						},
					},
					respondSha: true,
				},
			},
			"taoyuan": {
				enable: "phaseUse",
				sub: true,
				usable: 1,
				filter: function (event, player) {
					var list = []
					var cards = player.getExpansions('xjzh_sanguo_zhibing');
					for (var i of cards) {
						if (get.color(i) == "red") list.add(i);
					}
					return list.length > 0;
				},
				content: function () {
					"step 0"
					var list = []
					var cards = player.getExpansions('xjzh_sanguo_zhibing');
					for (var i of cards) {
						if (get.color(i) == "red") list.add(i);
					}
					player.chooseCardButton("选择一张牌视为使用一张桃园结义", list);
					"step 1"
					if (result.bool) {
						player.loseToDiscardpile(result.links);
						var targets = game.filterPlayer();
						targets.sort(lib.sort.seat);
						player.useCard({ name: 'taoyuan' }, result.links, targets, false);
					}
				},
				ai: {
					basic: {
						order: function () {
							return 11;
						},
						useful: [3, 1],
						value: 0,
					},
					result: {
						target: function (player, target) {
							return (target.hp < target.maxHp) ? 2 : 0;
						},
					},
					tag: {
						recover: 0.5,
						multitarget: 1,
					},
				},
			},
			"wanjian": {
				enable: "phaseUse",
				sub: true,
				usable: 1,
				filter: function (event, player) {
					var list = []
					var cards = player.getExpansions('xjzh_sanguo_zhibing');
					for (var i of cards) {
						if (get.color(i) == "black") list.add(i);
					}
					return list.length > 0;
				},
				content: function () {
					"step 0"
					var list = []
					var cards = player.getExpansions('xjzh_sanguo_zhibing');
					for (var i of cards) {
						if (get.color(i) == "black") list.add(i);
					}
					player.chooseCardButton("选择一张牌视为使用一张万箭齐发", list);
					"step 1"
					if (result.bool) {
						player.loseToDiscardpile(result.links);
						var targets = game.filterPlayer();
						targets.remove(player);
						targets.sort(lib.sort.seat);
						player.useCard({ name: 'wanjian' }, result.links, targets, false);
					}
				},
				ai: {
					wuxie: function (target, card, player, viewer) {
						if (get.attitude(viewer, target) > 0 && target.countCards('h', 'shan')) {
							if (!target.countCards('h') || target.hp == 1 || Math.random() <= 0.7) return 0;
						}
					},
					basic: {
						order: 9,
						useful: 1,
						value: 5,
					},
					result: {
						"target_use": function (player, target) {
							if (player.hasUnknown(2) && get.mode() != 'guozhan') return 0;
							var nh = target.countCards('h');
							if (get.mode() == 'identity') {
								if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
							}
							if (nh == 0) return -2;
							if (nh == 1) return -1.7
							return -1.5;
						},
						target: function (player, target) {
							var nh = target.countCards('h');
							if (get.mode() == 'identity') {
								if (target.isZhu && nh <= 2 && target.hp <= 1) return -100;
							}
							if (nh == 0) return -2;
							if (nh == 1) return -1.7
							return -1.5;
						},
					},
					tag: {
						respond: 1,
						respondShan: 1,
						damage: 1,
						multitarget: 1,
						multineg: 1,
					},
				},
			},
		},
	},
	"xjzh_sanguo_jieyi": {
		trigger: {
			player: "enterGame",
			global: "gameStart",
		},
		forced: true,
		locked: true,
		popup: false,
		unique: true,
		zhuSkill: true,
		priority: -99,
		audio: "ext:仙家之魂/audio/skill:1",
		filter: function (event, player) {
			if (player.hasZhuSkill('xjzh_sanguo_jieyi')) return true;
			return false;
		},
		derivation: ["xjzh_sanguo_qinjin", "xjzh_sanguo_zhibing"],
		content: function () {
			var skills = ['xjzh_sanguo_qinjin', 'xjzh_sanguo_zhibing'];
			player.addAdditionalSkill('xjzh_sanguo_jieyi', skills);
		},
	},
	"xjzh_sanguo_qinjin": {
		trigger: {
			player: ["shaMiss", "damageEnd"],
			source: "damageSource",
		},
		audio: "ext:仙家之魂/audio/skill:5",
		forced: true,
		locked: true,
		unique: true,
		content: function () {
			if (trigger.name == "damage") {
				if (trigger.player != player) {
					player.gainPlayerCard(trigger.player, true, 'he');
				}
				else if (trigger.player == player && this.trigger.source && trigger.source != player) {
					if (trigger.source.group == "wu" && player.countCards("he")) player.chooseToDiscard("he", true);
				}
			} else {
				if (trigger.target.group == "wu") {
					trigger.target.draw(2);
				}
				else {
					trigger.target.draw();
				}
			}
		},
	},
	"xjzh_sanguo_zhibing": {
		trigger: {
			player: "drawBegin",
		},
		usable: 1,
		sub: true,
		marktext: "兵",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove: function (player, skill) {
			var cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		check: function (event, player) {
			return get.attitude(player, event.player) < 0 &&
				(player.countCards("h") <= 1 || !player.hasCard(function (card) {
					return card.name == "tao" || card.name == "shan" || card.name == "jiu";
				}, 'h'));
		},
		filter: function (event, player) {
			if (event.parent.name == 'phaseDraw') return false;
			return true;
		},
		content: function () {
			"step 0"
			trigger.changeToZero();
			var cardx = get.cards();
			player.popup(cardx)
			player.addToExpansion(cardx, "draw", player).gaintag.add("xjzh_sanguo_zhibing");
			"step 1"
			player.chooseTarget(get.prompt2('xjzh_sanguo_zhibing'), function (card, player, target) {
				return target != player && target.inRangeOf(player);
			})
				.ai = function (target) {
					return get.damageEffect(target, get.player(), get.player());
				};
			"step 2"
			if (result.bool) {
				player.addTempSkill("unequip", "shaAfter");
				player.useCard({ name: 'sha' }, result.targets[0], false);
			}
		},
		ai: {
			unequip_ai: true,
		},
	},
	"xjzh_sanguo_daizhao": {
		trigger: {
			global: "phaseZhunbeiBegin",
		},
		check(event, player) { return 1; },
		locked: true,
		unique: true,
		priority: -1,
		frequent: true,
		mode: ["identity"],
		audio: "ext:仙家之魂/audio/skill:2",
		group: ['xjzh_sanguo_daizhao_zhu'],
		prompt: "〖代诏〗：是否将体力或手牌回复/补至与主公一致？",
		filter(event, player) {
			let zhu = get.zhu(player);
			if (get.mode() != "identity") return false;
			if (zhu == player) return false;
			if (event.player != zhu) return false;
			if ((zhu.getHp(true) > player.getHp(true) && player.isDamaged()) || zhu.countCards('h') > player.countCards('h')) return true;
			return false;
		},
		bannedType: ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技", "持恒技"],
		async content(event, trigger, player) {
			let zhu = get.zhu(player), list = new Array();
			if (zhu.getHp(true) > player.getHp(true) && player.isDamaged()) list.push(`将体力回复至与${get.translation(zhu)}一致`);
			if (zhu.countCards('h') > player.countCards('h')) list.push(`将手牌补至与${get.translation(zhu)}一致`);
			if (list.length == 0) return;
			let dialog = ui.create.dialog('〖代诏〗：请选择一项', 'hidden');
			for (let i = 0; i < list.length; i++) {
				list[i] = [i, list[i]];
			};
			dialog.add([list, 'textbutton']);
			const { result: { links } } = list.length == 1 ? { result: { links: list[0] } } : await player.chooseButton(dialog, true).set('ai', button => {
				let zhu = get.zhu(player);
				if (zhu.countCards('h') > player.countCards('h')) return 1;
				if (zhu.getHp(true) > player.getHp(true)) return 0;
				return get.rand(0, 1);
			});
			if (links) {
				const index = links[0];
				if (index == 1) {
					const num = get.zhu(player).countCards('h') - player.countCards('h');
					if (num == 0) return;
					player.draw(num);
				} else {
					const num = get.zhu(player).getHp(true) - player.getHp(true);
					if (num == 0) return;
					player.recover(num);
				}
			}
		},
		subSkill: {
			"zhu": {
				trigger: {
					global: ["gameStart", "zhuUpdate"],
					player: "enterGame",
				},
				audio: "xjzh_sanguo_daizhao",
				forced: true,
				priority: 1,
				sub: true,
				filter(event, player) {
					if (get.mode() != "identity") return false;
					return get.zhu(player) != player;
				},
				async content(event, trigger, player) {
					let list = [];
					let zhu = get.zhu(player);
					if (zhu && zhu.skills.length) {
						for await (let skill of zhu.skills) {
							if (!get.skillInfoTranslation(skill)) continue;
							if (lib.skill.global.includes(skill)) continue;
							if (get.skillCategoriesOf(skill, player).some(type => lib.skill["xjzh_sanguo_daizhao"].bannedType.includes(type))) continue;
							list.push(skill);
						}
					}
					player.addAdditionalSkill('xjzh_sanguo_daizhao', list);
				},
			},
		},
	},
	"xjzh_sanguo_guixin": {
		trigger: {
			player: "phaseDrawBegin",
		},
		frequent: true,
		priority: -1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return !event.numFixed;
		},
		check(event, player) {
			if (game.players.length - 1 > 2) return 1;
			return 0;
		},
		mod: {
			cardUsableTarget(card, player, target) {
				let storage = player.storage.xjzh_sanguo_guixin;
				if (storage) {
					return storage.get("discard").includes(target);
				}
			},
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			let list = new Map([
				["give", []],
				["discard", []]
			]);
			do {
				let targets = game.filterPlayer(current => current != player && current.countCards("he")).slice(0);
				targets.sort(lib.sort.seat);
				for (let target of targets) {
					if (!target.countCards('he')) continue;
					const result = await target.chooseCard(1, 'he')
						.set('ai', card => get.attitude(player, target) > 0 ? 8 - get.value(card) : 4 - get.value(card))
						.set("prompt", `〖归心〗：请选择交给${get.translation(player)}一张牌，否则弃置一张牌`)
						.forResult();
					if (result?.bool) {
						target.give(result.cards[0], player);
						list.set("give", list.get("give").add(target));
					} else {
						target.chooseToDiscard(1, 'he', true);
						list.set("discard", list.get("discard").add(target));
					}
					game.delay();
				}
			} while (player.isMinCard());
			player.storage[event.name] = list;
			let evt = event.getParent("phase");
			if (evt && evt.getParent) {
				let next = game.createEvent('xjzh_sanguo_guixinDelete', false, evt.getParent());
				next.player = player;
				next.setContent(() => {
					let storage = player.storage.xjzh_sanguo_guixin, gives = storage.get("give");
					if (player.isMaxCard(true)) {
						for (let target of gives) {
							if (target.isAlive()) target.draw();
						}
					}
					delete player.storage.xjzh_sanguo_guixin;
				});
			}
		},
		ai: {
			threaten: 1.5,
		},
	},
	"xjzh_sanguo_feiying": {
		locked: true,
		charlotte: true,
		mod: {
			targetInRange: function (card, player, target) {
				let hs = target.countCards('h');
				let hs2 = player.countCards('h');
				if (hs2 > hs) return true;
			},
			targetEnabled: function (card, player, target) {
				let hs = target.countCards('h');
				let hs2 = player.countCards('h');
				if (hs2 > hs) return false;
			},
		},
	},
	"xjzh_sanguo_batu": {
		trigger: {
			global: "changeHp",
		},
		forced: true,
		popup: false,
		priority: -100,
		zhuSkill: true,
		audio: "ext:仙家之魂/audio/skill:1",
		filter(event, player) {
			if (!player.hasZhuSkill('xjzh_sanguo_batu')) return false;
			return event.player != player && event.player.group == "wei";
		},
		async content(event, trigger, player) {
			let list = [
				`令${get.translation(player)}摸一张牌`,
				`令${get.translation(trigger.player)}摸一张牌`,
			];
			let dialog = ui.create.dialog('〖霸图〗：请选择一项', 'hidden');
			for (let i = 0; i < list.length; i++) {
				list[i] = [i, list[i]];
			};
			dialog.add([list, 'textbutton']);
			const { result: { bool, links } } = await player.chooseButton(dialog, true).set('ai', function (button) {
				if (!_status.event.getTrigger().player.countCards('h')) return 1;
				return 0;
			});
			if (bool && links) {
				if (links[0] == 0) {
					player.draw();
				} else {
					trigger.player.draw();
				}
			}
		},
	},
	"xjzh_sanguo_guanxing": {
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		audio: "reguanxing",
		priority: 3,
		frequent: true,
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = {
				"tianshu": false,
				"tianxuan": false,
				"tianji": false,
				"tianquan": false,
				"yuheng": false,
				"kaiyang": false,
				"yaoguang": false
			};
		},
		mark: true,
		marktext: "星",
		intro: {
			name: "七星命盘",
			content(storage, player) {
				let str = `已点亮：`
				let list = Object.keys(storage), g = {
					"tianshu": "天枢",
					"tianxuan": "天璇",
					"tianji": "天玑",
					"tianquan": "天权",
					"yuheng": "玉衡",
					"kaiyang": "开阳",
					"yaoguang": "摇光"
				}
				list.forEach(item => {
					if (storage[item] === true) str += `${g[item]}&nbsp;&nbsp;&nbsp;`
				});
				return str;
			},
		},
		async content(event, trigger, player) {
			if (player.hasSkill("xjzh_meiren_ganling")) player.removeSkill("xjzh_meiren_ganling", true);
			const result = await player.chooseToGuanxing(5).forResult();
			if (result?.bool) {
				const movedOne = result.moved[0];
				const movedTwo = result.moved[1];
				const movedOneRed = movedOne.filter(card => get.color(card) == "red");
				const movedOneBlack = movedOne.filter(card => get.color(card) == "black");
				const movedTwoRed = movedTwo.filter(card => get.color(card) == "red");
				const movedTwoBlack = movedTwo.filter(card => get.color(card) == "black");

				let cards;
				if (movedOne.length === 5) {
					player.storage[event.name].tianshu = true;
					player.$fullscreenpop(`天枢`);
					cards = movedOne.filter(card => get.type(card) == "basic");
					if (cards.length) player.gain(cards, "draw");
					await game.delay();
				}

				if (movedTwo.length === 5) {
					player.storage[event.name].yuheng = true;
					player.$fullscreenpop(`玉衡`);
					cards = movedTwo.filter(card => get.type(card, "trick") == "trick");
					if (cards.length) player.gain(cards, "draw");
					await game.delay();
				}

				if (movedOne.length > movedTwo.length && movedTwo.length > 0) {
					player.storage[event.name].tianxuan = true;
					player.$fullscreenpop(`天璇`);
					player.addTempSkill(`${event.name}_tianxuan`);
					await game.delay();
				}

				if (movedOneRed.length > movedTwoRed.length && movedTwo.length > 0) {
					player.storage[event.name].tianji = true;
					player.$fullscreenpop(`天玑`);
					const result = await player.chooseTarget(lib.filter.notMe)
						.set('ai', target => {
							return -get.attitude(get.player(), target);
						})
						.set('prompt', "〖天玑〗：令一名其他角色获得“狂风”标记")
						.forResult();
					if (result?.targets) {
						result.targets[0].addSkill(`${event.name}_tianji`);
					}
					await game.delay();
				}

				if (movedOneBlack.length > movedTwoBlack.length && movedTwo.length > 0) {
					player.storage[event.name].tianquan = true;
					player.$fullscreenpop(`天权`);
					const result = await player.chooseTarget(lib.filter.notMe)
						.set('ai', target => {
							const { player, allUse } = get.event();
							if (target.isMin() || target.hasSkill("biantian2") || target.hasSkill("dawu2")) {
								return 0;
							}
							let att = get.attitude(player, target);
							if (att >= 4) {
								if (target.hp > 2 && (target.isHealthy() || target.hasSkillTag("maixie"))) {
									return 0;
								}
								if (allUse || target.hp == 1) {
									return att;
								}
								if (target.hp == 2 && target.countCards("he") <= 2) {
									return att * 0.7;
								}
								return 0;
							}
							return -1;
						})
						.set('prompt', "〖天权〗：令一名其他角色获得“大雾”标记")
						.forResult();
					if (result?.targets) {
						result.targets[0].addSkill(`${event.name}_tianquan`);
					}
					await game.delay();
				}

				if (movedTwoRed.length > movedOneRed.length && movedOne.length > 0) {
					player.storage[event.name].kaiyang = true;
					player.$fullscreenpop(`开阳`);
					const result = await player.chooseTarget(lib.filter.notMe)
						.set('ai', target => {
							let player = get.player();
							return get.damageEffect(target, player, player, "fire");
						})
						.set('prompt', "〖开阳〗：对一名其他角色造成一点火属性伤害")
						.forResult();
					if (result?.targets) {
						result.targets[0].damage(1, player, "nocard", "fire");
					}
				}
				if (movedTwoBlack.length > movedOneBlack.length && movedOne.length > 0) {
					player.storage[event.name].yaoguang = true;
					player.$fullscreenpop(`摇光`);
					player.addSkill("xjzh_meiren_ganling");
				}
			}
		},

		subSkill: {
			"tianxuan": {
				sub: true,
				mod: {
					cardUsable(card, player, num) {
						if (["sha", "jiu"].includes(get.name(card))) return true;
					},
				},
			},
			"tianji": {
				trigger: {
					player: "damageBegin3",
				},
				audio: "kuangfeng",
				sourceSkill: "kuangfeng",
				filter(event, player) {
					return game.hasNature(event, "fire");
				},
				forced: true,
				popup: false,
				mark: true,
				logTarget: "player",
				marktext: "风",
				intro: {
					name: "狂风",
					content(storage) {
						return `受到火属性伤害+1`;
					},
				},
				async content(event, trigger, player) {
					trigger.num++;
					player.removeSkill(event.name);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, "fireDamage") && current < 0) {
								return 1.5;
							}
						},
					},
				},
			},
			"tianquan": {
				trigger: {
					player: "damageBegin4",
				},
				sourceSkill: "dawu",
				audio: "dawu",
				filter(event, player) {
					return !event.hasNature("thunder");
				},
				forced: true,
				popup: false,
				logTarget: "player",
				mark: true,
				marktext: "雾",
				intro: {
					name: "大雾",
					content: `防止受到雷属性伤害`,
				},
				async content(event, trigger, player) {
					trigger.changeToZero();
					player.removeSkill(event.name);
				},
			},
		},
		ai: {
			guanxing: true,
		},
	},
	"xjzh_sanguo_xinghun": {
		trigger: {
			player: ["damageAfter", "drawBegin"],
		},
		forced: true,
		locked: true,
		priority: 3,
		firstDo: true,
		mod: {
			maxHandcardFinal(player, num) {
				let storage = player.storage?.xjzh_sanguo_guanxing;
				let max = 0;
				if (get.is.object(storage)) {
					if (get.is.object(storage)) {
						let list = Object.keys(storage).filter(item => storage[item] === true);
						max += list.length;
					}
				}
				return num + max;
			},
		},
		audio: "qixing",
		getIndex(event, player, name) {
			if (name == "drawBegin") return 1;
			return event.num || 1;
		},
		async content(event, trigger, player) {
			let name = event.triggername;
			if (name == "drawBegin") {
				let storage = player.storage?.xjzh_sanguo_guanxing;
				let max = 0;
				if (get.is.object(storage)) {
					let list = Object.keys(storage).filter(item => storage[item] === true);
					max += list.length;
				}
				trigger.num += max;
				return;
			}
			const cards = await player.draw().forResult();
			const card = cards[0];
			await player.showCards(card);

			const cardnames = lib.translate[get.name(card)];
			player.popup(cardnames)

			let skills = game.xjzh_addRandomSkill()?.[1].filter(skill => {
				let skillInfo = get.skillInfoTranslation(skill);
				if (player.hasSkill(skill)) return false;
				return skillInfo.includes(cardnames);
			});
			if (!skills.length) return;

			let link = skills.randomGet(), characters;
			for (let i in lib.character) {
				let info = lib.character[i];
				if (info[3].some(s => link.includes(s))) characters = i;
			}
			let cardname = 'xjzh_sanguo_xinghu_card_' + characters;
			lib.card[cardname] = {
				fullimage: true,
				image: 'character:' + characters,
			};
			lib.translate[cardname] = lib.translate[link];
			player.$gain2(game.createCard(cardname, '', ''));
			player.addSkills(link);
			player.$fullscreenpop(lib.translate[link], 'thunder');
		},
		ai: {
			maixue_hp: true,
			skillTagFilter(player, tag, arg) {
				if (tag == 'maixue_hp') {
					if (player.getHp(true) <= 2) return false;
				};
				return true;
			},
		},
	},
	"xjzh_sanguo_wuxiang": {
		trigger: {
			player: "dying",
		},
		forced: true,
		locked: true,
		priority: 3,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let storage = player.storage?.xjzh_sanguo_guanxing;
			if (!get.is.object(storage)) return false;
			let list = Object.keys(storage).filter(item => storage[item] === true);
			return list.length >= 7;
		},
		async content(event, trigger, player) {
			player.storage.xjzh_sanguo_guanxing = Object.fromEntries(
				Object.entries(player.storage.xjzh_sanguo_guanxing).map(([key]) => [key, false])
			);
			await player.loseMaxHp();
			await player.recoverTo(player.maxHp);
		},
	},
	"xjzh_sanguo_luanzheng": {
		trigger: {
			player: "enterGame",
			global: "gameStart",
		},
		forced: true,
		unique: true,
		locked: true,
		firstDo: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (["zhong", "nei"].includes(player.identity)) return false;
			return get.mode() == "identity";
		},
		async content(event, trigger, player) {
			let id = player.identity;
			if (get.zhu() == player) {
				let targets = game.filterPlayer(target => {
					if (target == player) return false;
					return target.identity != "fan";
				});
				let target = targets.randomGet();
				player.identity = target.identity;
				player.setIdentity(target.identity);
				player.showIdentity();
				player.update();

				target.identity = 'zhu';
				target.setIdentity("zhu");
				target.showIdentity();
				game.zhu = target;
				target.update();
			} else {
				player.identity = "nei";
				player.setIdentity("nei");
				player.showIdentity();
				player.update();
			}
		},
	},
	"xjzh_sanguo_chanxian": {
		trigger: {
			target: "useCardToTarget",
		},
		audio: "ext:仙家之魂/audio/skill:3",
		filter(event, player) {
			if (!get.is.damageCard(event.card)) return false;
			if (event.targets.length == 1) return game.hasPlayer(target => {
				if (target == player) return false;
				if (target == event.player) return false;
				return event.player.canUse(event.card, target, false, false);
			});
			return player.countCards("he");
		},
		async cost(event, trigger, player) {
			let result;
			if (trigger.targets.length == 1) {
				result = await player.chooseTarget((card, player, target) => {
					let trigger = get.event().getTrigger();
					return target != player && target != trigger.player;
				})
					.set("prompt", `〖谗陷〗：为${get.translation(trigger.card)}指定一名额外目标`)
					.set("ai", target => {
						let trigger = get.event().getTrigger();
						return get.effect(target, trigger.card, trigger.player, player);
					})
					.forResult();
			} else {
				result = await player.chooseToDiscard()
					.set("prompt", `〖谗陷〗：是否弃置一张牌令${get.translation(trigger.card)}无效？`)
					.set("ai", card => 6 - get.value(card, player))
					.forResult();
			}
			event.result = result;
		},
		async content(event, trigger, player) {
			if (!event?.targets) {
				trigger.cancel(null, null, "notrigger");
			} else {
				trigger.targets.addArray(event.targets);
				game.log(event.targets, '成为了额外目标');
			}
		},

	},
	"xjzh_sanguo_shichong": {
		trigger: {
			global: "gameDrawBegin",
			player: "enterGame",
		},
		forced: true,
		locked: true,
		unique: true,
		limited: true,
		mark: true,
		marktext: "宠",
		intro: {
			content: "limited",
		},
		group: ["xjzh_sanguo_shichong_give"],
		skillAnimation: true,
		audio: "ext:仙家之魂/audio/skill:2",
		animationColor: "thunder",
		animationStr: "恃宠窃国",
		content: function () {
			"step 0"
			player.awakenSkill(event.name);
			"step 1"
			event.num = 0
			for (var i = 0; i < game.players.length; i++) {
				if (game.players[i] == player) continue;
				event.num += game.players[i].maxHp;
			}
			"step 2"
			event.num = Math.floor(event.num / game.countPlayer(function (current) { return current != player; }));
			player.maxHp = event.num
			player.hp = event.num;
			player.update();
		},
		subSkill: {
			"give": {
				trigger: {
					global: "phaseDrawAfter",
				},
				audio: "xjzh_sanguo_shichong",
				filter: function (event, player) {
					if (lib.config.extension_仙家之魂_xjzh_jiexiantupo) {
						return event.player != player && event.player.countCards("he") && !player.storage.xjzh_sanguo_shichong;
					}
					return false;
				},
				forced: true,
				sub: true,
				content: function () {
					"step 0"
					trigger.player.addExpose(0.2);
					trigger.player.chooseCard(1, '交给' + get.translation(player) + '一张牌跳过弃牌阶段，否则跳过出牌阶段', 'he').ai = function (card) {
						var target = _status.event.player
						if (target.countCards("h") <= target.getHandcardLimit()) return [-5, 5];
						if (target.countCards("h") > target.getHandcardLimit()) {
							if (get.attitude(target, player) < 0) {
								return 4 - get.value(card);
							}
							else {
								return get.value(card);
							}
						}
					}
					"step 1"
					if (result.bool) {
						player.gain(result.cards, "giveAuto", trigger.player);
						trigger.player.skip("phaseDiscard");
					}
					else {
						trigger.player.skip("phaseUse");
					}
				},
			},
		},
	},
	"xjzh_sanguo_baima": {
		trigger: {
			global: "equipAfter",
		},
		mark: true,
		marktext: "白",
		intro: {
			name: "白马义从",
			mark(dialog, content, player) {
				let num = Array.from(ui.cardPile.childNodes).filter(card => ["equip3", "equip4"].includes(get.subtype(card))).length;
				return `牌堆剩余${get.cnNumber(num)}张坐骑牌`;
			},
		},
		forced: true,
		locked: true,
		filter(event, player) {
			return event.card && ["equip3", "equip4"].includes(get.subtype(event.card));
		},
		async content(event, trigger, player) {
			await player.draw(2);
			if (!Array.from(ui.cardPile.childNodes).filter(card => ["equip3", "equip4"].includes(get.subtype(card))).length) player.insertPhase();
		},
	},
	"xjzh_sanguo_yicong": {
		mark: true,
		marktext: "义",
		init(player) {
			player.disableEquip(3);
			player.disableEquip(4);
		},
		onremove(player, skill) {
			player.enableEquip(3);
			player.enableEquip(4);
		},
		intro: {
			name: "白马义从",
			content(storage, player) {
				return `进攻距离：${game.countPlayer(current => current.getEquips(4).length) + 1}<br>防御距离：${game.countPlayer(current => current.getEquips(3).length) + 1}`;
			},
		},
		mod: {
			globalFrom(from, to, distance) {
				return distance - game.countPlayer(current => current.getEquips(4).length);
			},
			globalTo(from, to, distance) {
				return distance + game.countPlayer(current => current.getEquips(3).length);
			},
		},
		trigger: { player: 'enableEquipBefore' },
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:4",
		filter(event, player) {
			return event.slots.some(item => ["equip3", "equip4"].includes(item));
		},
		async content(event, trigger, player) {
			while (trigger.slots.some(item => ["equip3", "equip4"].includes(item))) trigger.slots.removeArray(["equip3", "equip4"]);
			game.log(player, "的坐骑栏已废除且无法恢复");
		},
		ai: {
			threaten: 0.8,
		},
	},
	"xjzh_sanguo_muma": {
		trigger: {
			global: "loseAfter",
		},
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (event.type == "use") return false;
			if (!game.hasPlayer(current => current.getEquips())) return false;
			let cards = event.cards.filter(card => {
				if (!["equip3", "equip4"].includes(get.subtype(card))) return false;
				if (!game.hasPlayer(current => current.canEquip(card))) return false;
				return true;
			});
			if (!cards.length) return false;
			return cards.filterInD('d').length;
		},
		forced: true,
		locked: true,
		priority: 10,
		async content(event, trigger, player) {
			let cards = trigger.cards.filter(card => {
				if (!["equip3", "equip4"].includes(get.subtype(card))) return false;
				if (!game.hasPlayer(current => current.canEquip(card))) return false;
				return get.position(card) == 'd';
			}), str = `〖募马〗：选择一张坐骑牌令一名其他角色装备之`;
			const result = await player.chooseCardButton(cards, 1)
				.set('ai', (button) => get.equipValueNumber(button.link))
				.set('prompt', str)
				.forResult();
			if (result?.links) {
				const result2 = await player.chooseTarget(str, true, (card, player, target) => {
					if (!target.canEquip(result.links[0])) return false;
					return player != target;
				})
					.set('ai', target => {
						return get.attitude(player, target);
					})
					.forResult();
				if (result2?.targets) {
					result2.targets[0].equip(result.links[0]);
				}
			}
		},
	},
	"xjzh_sanguo_yuewu": {
		enable: "phaseUse",
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		prompt: "〖月舞〗：选择两个目标令其选择交给你一种花色的手牌，交给你牌的角色视为对未交给你牌的角色使用一张无法被无懈可击响应的【决斗】。",
		multitarget: true,
		multiline: true,
		filterTarget(card, player, target) {
			return player != target && target.countCards("h");
		},
		selectTarget: 2,
		targetprompt: ["目标一", "目标二"],
		async content(event, trigger, player) {
			let targets = event.targets, list = new Map(
				[
					["give", []],
					["nogive", []]
				]
			)
			for (let target of targets) {
				let cards = target.getCards("h"), suits = cards.map(card => get.suit(card)).toUniqued();
				const result = await target.chooseControl(suits, "cancel2")
					.set('ai', () => {
						let target = get.event().target, cards = target.getCards("h");

						let suitCount = cards.reduce((acc, card) => {
							let suit = get.suit(card);
							acc[suit] = (acc[suit] || 0) + 1;
							return acc;
						}, {});

						let leastCount = Math.min(...Object.values(suitCount));

						let leastSuit = Object.keys(suitCount).find(suit => suitCount[suit] === Math.min(...Object.values(suitCount)));

						if (target.hasSha()) return "cancel2";
						if (cards.filter(card => get.suit(card) == leastSuit).length >= Math.round(cards.length / 2)) return "cancel2";
						return leastSuit;

					})
					.set("target", target)
					.set('createDialog', [`〖月舞〗：请选择交给${get.translation(player)}一种花色的手牌`, [cards, 'vcard']])
					.forResult();
				if (result?.control != "cancel2") {
					target.give(target.getCards("h", card => get.suit(card) == result.control), player);
					list.set("give", [...list.get("give"), target]);
				} else list.set("nogive", [...list.get("nogive"), target]);
			}
			if (list.get("give").length == 2) return;
			if (list.get("nogive").length == 2) {
				let noGives = list.get("nogive");
				for await (let [index, target] of noGives.entries()) {
					target.useCard({ name: 'juedou', isCard: true }, 'nowuxie', targets[index == 0 ? 1 : 0], 'noai');
				}
			}
			else {
				let targets1 = list.get("give").shift(), targets2 = list.get("nogive").shift();
				targets1.useCard({ name: 'juedou', isCard: true }, 'nowuxie', targets2, 'noai');
			}
		},
		ai: {
			order: 12,
			result: {
				target: -1,
			},
			expose: 0.4,
			threaten: 3,
		},
	},
	"xjzh_sanguo_yuehun": {
		audio: "ext:仙家之魂/audio/skill:2",
		trigger: {
			target: "useCardToAfter",
		},
		frequent: true,
		priority: 3,
		prompt(event, player) {
			return `〖月魂〗：${get.translation(event.player)}对你使用了${get.translation(event.card)}，是否对其使用一张同名牌？`;
		},
		check(event, player) {
			return get.useful(event.card, event.player);
		},
		filter(event, player) {
			if (event.player == player) return false;
			return ["trick", "basic"].includes(get.type(event.card, player)) && event.targets.length == 1;
		},
		async content(event, trigger, player) {
			let target = trigger.player, card = trigger.card;
			player.useCard(card, target, false).set('addCount', false);
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (["trick", "basic"].includes(get.type(card, target))) return [1, 1];
				},
			},
		},
	},
	"xjzh_sanguo_tiance": {
		enable: "phaseUse",
		usable(skill, player) {
			const nameList = get.nameList(player);
			const bool = nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_hanhuangxi", name)).length ? true : false;
			return bool == true ? 2 : 1;
		},
		filterCard: false,
		selectCard: -1,
		filterTarget: true,
		selectTarget: -1,
		multitarget: true,
		multiline: true,
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			event.forceDie = true;
			const cards = [];
			for (const i of event.targets) {
				const cardsi = i.getCards('hej');
				i.lose(cardsi, ui.special, 'visible');
				i.$throw(cardsi, 1000);
				cards.push(...cardsi);
			}
			await game.cardsGotoOrdering(cards);

			const dialog = ui.create.dialog('天策', cards, true);
			_status.dieClose.push(dialog);
			dialog.videoId = lib.status.videoId++;
			game.addVideo('cardDialog', null, ['天策', get.cardsInfo(cards), dialog.videoId]);
			game.broadcast(function (cards, id) {
				const dialog = ui.create.dialog('天策', cards, true);
				_status.dieClose.push(dialog);
				dialog.videoId = id;
			}, cards, dialog.videoId);

			let num = 0;
			let targetx = event.targets[num];
			const selectedCards = [];

			while (dialog.buttons.length > 0) {
				targetx = event.targets[num];

				if (dialog.buttons.length > 1) {
					const result = await targetx.chooseButton(true, function (button) {
						return get.value(button.link, get.player());
					})
						.set('dialog', event.preResult)
						.set('closeDialog', false)
						.set('dialogdisplay', true)
						.set('filterButton', function (button, player) {
							if (selectedCards.includes(button.link)) return false;
							return true;
						})
						.forResult();

					var card = result?.links && result.links[0] ? result.links[0] : dialog.buttons[0].link;
				} else {
					var card = dialog.buttons[0].link;
				}

				selectedCards.push(card);

				let button;
				for (let i = 0; i < dialog.buttons.length; i++) {
					if (dialog.buttons[i].link == card) {
						button = dialog.buttons[i];

						// 创建武将名显示容器
						const nameContainer = document.createElement('div');
						nameContainer.className = 'tiance-name-container';
						nameContainer.style.cssText = `
							position: absolute;
							bottom: 5px;
							left: 0;
							right: 0;
							text-align: center;
							font-size: 14px;
							font-weight: bold;
							color: white;
							text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
							z-index: 10;
							background: rgba(0,0,0,0.7);
							padding: 2px 0;
							border-radius: 3px;
						`;
						nameContainer.innerHTML = ((targetx) => {
							if (targetx._tempTranslate) return targetx._tempTranslate;
							const name = targetx.name;
							if (lib.translate[name + '_ab']) return lib.translate[name + '_ab'];
							return get.translation(name);
						})(targetx);

						button.appendChild(nameContainer);

						// 设置卡牌遮罩效果 - 变暗而不模糊
						const overlay = document.createElement('div');
						overlay.className = 'tiance-overlay';
						overlay.style.cssText = `
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: rgba(0,0,0,0.6);
							z-index: 5;
							border-radius: 5px;
						`;
						button.appendChild(overlay);

						dialog.buttons.remove(button);
						break;
					}
				}

				const capt = get.translation(targetx) + '选择了' + get.translation(button.link);
				if (card) {
					targetx.gain(card, 'visible');
					targetx.$gain2(card);
					game.broadcast(function (card, id, name, capt) {
						const dialog = get.idDialog(id);
						if (dialog) {
							dialog.content.firstChild.innerHTML = capt;
							for (let i = 0; i < dialog.buttons.length; i++) {
								if (dialog.buttons[i].link == card) {
									// 创建武将名容器
									const nameContainer = document.createElement('div');
									nameContainer.className = 'tiance-name-container';
									nameContainer.style.cssText = `
										position: absolute;
										bottom: 5px;
										left: 0;
										right: 0;
										text-align: center;
										font-size: 14px;
										font-weight: bold;
										color: white;
										text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
										z-index: 10;
										background: rgba(0,0,0,0.7);
										padding: 2px 0;
										border-radius: 3px;
									`;
									nameContainer.innerHTML = name;
									dialog.buttons[i].appendChild(nameContainer);

									// 添加遮罩
									const overlay = document.createElement('div');
									overlay.className = 'tiance-overlay';
									overlay.style.cssText = `
										position: absolute;
										top: 0;
										left: 0;
										right: 0;
										bottom: 0;
										background: rgba(0,0,0,0.6);
										z-index: 5;
										border-radius: 5px;
									`;
									dialog.buttons[i].appendChild(overlay);

									dialog.buttons.splice(i--, 1);
									break;
								}
							}
						}
					}, card, dialog.videoId, ((targetx) => {
						if (targetx._tempTranslate) return targetx._tempTranslate;
						const name = targetx.name;
						if (lib.translate[name + '_ab']) return lib.translate[name + '_ab'];
						return get.translation(name);
					})(targetx), capt);
				}
				dialog.content.firstChild.innerHTML = capt;
				game.addVideo('dialogCapt', null, [dialog.videoId, dialog.content.firstChild.innerHTML]);
				game.log(targetx, '选择了', button.link);
				await game.delay();

				if (dialog.buttons.length) {
					num = (num < event.targets.length - 1) ? num + 1 : 0;
				}
			}

			dialog.close();
			_status.dieClose.remove(dialog);
			game.broadcast(function (id) {
				const dialog = get.idDialog(id);
				if (dialog) {
					dialog.close();
					_status.dieClose.remove(dialog);
				}
			}, dialog.videoId);
			game.addVideo('cardDialog', null, dialog.videoId);
		},
		ai: {
			//ai 魔改《极略自用·sk 张鲁·普渡》
			order: 4.5,
			threaten: 2,
			result: {
				player(player, target) {
					let num = 0;
					const list = [];
					let listnum = 0;
					for (let i = 0; i < game.players.length; i++) {
						list.push('0');
					}
					for (let i = 0; i < game.players.length; i++) {
						num += game.players[i].countCards('hej');
					}
					const max = function () {
						for (let i = 0; i < list.length; i++) {
							if (list[i] > num) return true;
						}
						return false;
					};
					while (!max()) {
						num--;
						list[listnum % (game.players.length)]++;
						listnum++;
					}
					return num - player.countCards('h');
				},
				target(player, target) {
					let num = 0;
					const list = [];
					let listnum = 0;
					for (let i = 0; i < game.players.length; i++) {
						list.push('0');
					}
					for (let i = 0; i < game.players.length; i++) {
						num += game.players[i].countCards('hej');
					}
					const max = function () {
						for (let i = 0; i < list.length; i++) {
							if (list[i] > num) return true;
						}
						return false;
					};
					while (!max()) {
						num--;
						list[listnum % (game.players.length)]++;
						listnum++;
					}
					let nu = 0;
					for (let i = 0; i < game.players.length; i++) {
						if (target == game.players[i]) nu = i;
					}
					return list[nu - 1] - target.countCards('hej');
				}
			}
		},
	},
	"xjzh_sanguo_tianming": {
		trigger: {
			target: "useCardToTarget",
		},
		usable(skill, player) {
			let nameList = get.nameList(player);
			let bool = nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_hanhuangxi", name)).length ? true : false;
			return bool == true ? 2 : 1;
		},
		filter(event, player) {
			if (event.player == player) return false;
			return game.hasPlayer(current => current.countCards('h'));
		},
		audio: "ext:仙家之魂/audio/skill:2",
		check: (event, player) => game.hasPlayer(current => current.countCards('h')),
		prompt(event, player) {
			return "〖天命〗：" + get.translation(player) + "成为了" + get.translation(event.player) + "使用的" + get.translation(event.card) + "的目标，是否选择一名角色与其交换手牌？";
		},
		async content(event, trigger, player) {
			"step 0"
			const result = await player.chooseTarget((card, player, target) => target != player && target.countCards('h'))
				.set('prompt', '〖天命〗：选择一名角色与其交换手牌')
				.set('ai', target => {
					let player = get.player()
					let att = get.attitude(player, target);
					let hs = player.getCards("h");
					let hs2 = target.countCards('h');
					let num = 0
					for (var i = 0; i < hs.length; i++) {
						if (get.value(hs[i]) < 8) num++
					}
					let diff = hs.length - hs2;
					if (diff > 0) return att > 0;
					if (diff < 0) return att <= 0;
					return num;
				})
				.forResult();
			if (result?.targets) {
				await player.swapHandcards(result.targets[0]);
				let target = result.targets[0];
				let num = player.countCards('h') - target.countCards('h');
				if (num == 0) return;

				let group = num > 0 ? target.group : player.group;
				let drawTarget = num > 0 ? target : player;

				let num2 = game.countPlayer(current => current.group == group);

				if (num2 > 0) drawTarget.draw(num2);
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					let players = game.filterPlayer(current => current != player);
					let num = game.filterPlayer(current => current.group == player.group).length;
					let hs = player.countCards('h');
					let num2 = 0;
					for (let i = 0; i < players.length; i++) {
						let currentHandCount = players[i].countCards('h');
						if (currentHandCount > hs) {
							num2++;
						}
						else if (currentHandCount <= hs) {
							num2--;
						}
					}
					return num + num2;
				},
			},
		},
	},
	"xjzh_sanguo_moubian": {
		trigger: {
			player: "damageBegin1",
		},
		forced: true,
		locked: true,
		charlotte: true,
		priority: Infinity,
		firstDo: true,
		init(player, skill) {
			let group = ['wei', 'shu', 'wu', 'qun'].randomGet();
			player.changeGroup(group);
			player.update();
			game.xjzh_playAudio('xjzh_sanguo_moubian_start');
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter: (event, player) => event.source,
		async content(event, trigger, player) {
			if (trigger.source.group == player.group) {
				trigger.changeToZero();
				game.log(trigger.source, "无法对", player, "造成伤害");
				return;
			}
			let cards = get.cards()[0];
			player.showCards(cards);

			let types = get.type(cards);
			const result = await trigger.source.chooseToDiscard(1, 'h', card => get.type(card) == get.event().types)
				.set('prompt', `〖谋变〗:是否弃置一张类型为${get.translation(types)}的手牌，否则${get.translation(player)}防止此次伤害`)
				.set('ai', card => {
					let source = get.event().player;
					let eff = get.damageEffect(get.player(), source, source);
					let att = get.attitude(get.player(), source)
					if (eff) {
						if (att <= 0) return 8 - get.value(card);
					}
					return 0;
				})
				.set('source', trigger.source)
				.set('types', types)
				.forResult();
			if (!result.bool) {
				player.gain(cards, "gain2");
				trigger.changeToZero();
				const nameList = get.nameList(player);
				const bool = nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_hanhuangxi", name)).length ? true : false;
				if (bool == false) return;
				if (player.hasUseTarget(cards)) player.chooseToUse(cards, false);
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (!target.hasFriend()) return;
					let group = target.group
					let group2 = player.group
					if (get.is.damageCard(card)) {
						if (group == group2) return 0;
						return 0.5;
					}
				},
			},
		},
	},
	"xjzh_sanguo_zhongxing": {
		trigger: {
			global: "dieBefore",
		},
		direct: true,
		locked: true,
		charlotte: true,
		priority: Infinity,
		firstDo: true,
		mode: ["identity"],
		init() {
			let group = ['YHan', '汉', '汉', { color: [255, 255, 0] }];
			game.addGroup(...group);
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			if (trigger.player != player && game.zhu == trigger.player) {
				if (player.isMaxGroup() && !player.hasSkill("xjzh_sanguo_zhongxing_off")) {
					player.$skill('炎汉中兴', 'legend', 'fire');
					player.logSkill('xjzh_sanguo_zhongxing');
					player.addSkill("xjzh_sanguo_zhongxing_off");

					let targets = game.filterPlayer(current => current != player && current.group == player.group);
					let targets2 = game.filterPlayer(current => current.group != player.group);

					player.identity = 'zhu';
					player.setIdentity("zhu");
					player.showIdentity();
					game.zhu.identity = "fan";
					game.zhu.setIdentity("fan");
					game.zhu = player
					game.zhu.showIdentity();
					game.zhu.update();

					for await (let target of targets) {
						target.identity = "zhong";
						target.setIdentity("zhong");
						target.showIdentity();
						target.update();
					}

					for await (let target of targets2) {
						target.identity = "fan";
						target.setIdentity("fan");
						target.showIdentity();
						target.update();
					}

					let targets3 = game.filterPlayer(current => current.identity == "zhong");

					for await (let target of targets2) {
						target.changeGroup("YHan");
						target.update();
					}

					player.changeGroup("YHan");

					let nameList = get.nameList(player);
					let bool = nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_hanhuangxi", name)).length ? true : false;
					if (bool == true) {
						player.gainMaxHp();
						player.recoverTo(player.maxHp);
					}
					player.update();
				}
			}
			else if (trigger.player == player && game.zhu != player) {
				player.$skill('炎汉中兴', 'legend', 'fire');
				game.delay(2);
				player.logSkill('xjzh_sanguo_zhongxing');
				game.over(game.me.identity != player.identity);
			}
		},
		subSkill: {
			off: { sub: true, },
		},
		ai: {
			threaten: 3.5,
		},
	},
	"xjzh_sanguo_busuan": {
		enable: "phaseUse",
		locked: false,
		usable: 1,
		mod: {
			ignoredHandcard(card, player) {
				if (!get.is.playerNames(player, 'xjzh_sanguo_guanlu')) return;
				let cards = lib.skill['xjzh_sanguo_busuan']?.getGainCards.slice(0);
				if (cards.includes(get.name(card, player))) return true;
			},
			aiValue(player, card, num) {
				if (!get.is.playerNames(player, 'xjzh_sanguo_guanlu')) return;
				let cards = lib.skill['xjzh_sanguo_busuan']?.getGainCards.slice(0);
				if (cards.includes(get.name(card, player))) return num + 10;
			},
			canBeGained(card, player, target) {
				if (!get.is.playerNames(target, 'xjzh_sanguo_guanlu')) return;
				let cards = lib.skill['xjzh_sanguo_busuan']?.getGainCards.slice(0);
				if (cards.includes(get.name(card, target))) return false;
			},
			canBeDiscarded(card, player, target) {
				if (!get.is.playerNames(target, 'xjzh_sanguo_guanlu')) return;
				let cards = lib.skill['xjzh_sanguo_busuan']?.getGainCards.slice(0);
				if (cards.includes(get.name(card, target))) return false;
			},
			cardDiscardable(card, player) {
				if (!get.is.playerNames(player, 'xjzh_sanguo_guanlu')) return;
				let cards = lib.skill['xjzh_sanguo_busuan']?.getGainCards.slice(0);
				if (cards.includes(get.name(card, player))) return false;
			},
		},
		audio: "ext:仙家之魂/audio/skill:2",
		global: "xjzh_card_fanyunfuyu_skill",
		getGainCards: [
			"xjzh_card_chunfenghuayu",
			"xjzh_card_zhizuijinmi",
			"xjzh_card_shenjimiaosuan",
			"xjzh_card_tanhuayixian",
			"xjzh_card_fanyunfuyu",
		],
		filter: (event, player) => get.is.playerNames(player, "xjzh_sanguo_guanlu"),
		async content(event, trigger, player) {
			let gainCards = lib.skill[event.name]?.getGainCards.slice(0);
			if (!gainCards?.length) return;

			player.gain(game.createCard(gainCards.randomGet(), lib.suit.slice(0).randomGet(), get.rand(1, 13)), "gain2", "log", player)._triggered = null;

			let num = player.countCards('h', card => !gainCards.includes(get.name(card, player)));
			if (num == 0) return;

			let list = get.inpileVCardList(info => {
				const name = info[2];
				if (["equip", "xjzh_danyao"].includes(get.type(name))) return false;
				return true;
			});

			if (!list.length) return;
			const result = await player.chooseButton(['〖卜算〗：选择至多两张类型不一致的牌', [list, 'vcard']])
				.set('ai', button => {
					let card = { name: button.link[2] };
					return 12 - get.value(card);
				})
				.set('complexSelect', true)
				.set('selectButton', num > 1 ? [1, Math.min(num, 2)] : 1)
				.set('filterButton', button => {
					let selectButton = get.event().selectButton;
					let num = Array.isArray(selectButton) ? selectButton[1] : selectButton;
					if (!ui.selected.buttons.length) return true;
					let card = ui.selected.buttons[0].link;
					if (get.type(card[2]) == get.type(button.link[2])) return false;
					if (ui.selected.buttons.length >= num) return false;
					return true;
				})
				.forResult();

			if (result?.links) {
				let links = result.links;
				game.broadcastAll(
					async function (links, player) {
						const result2 = await player.chooseCard('hs', true, links.length, card => {
							return !gainCards.includes(get.name(card, player))
						})
							.set('ai', card => 8 - get.value(card))
							.set('complexSelect', true)
							.set('prompt', `请选择${links.length}张手牌`)
							.forResult();

						let cardLits = [];
						for await (let link of links) {
							let createCards = get.cardPile({ name: link[2] }, true);
							cardLits.push(createCards);
						}
						if (cardLits.length) {
							player.gain(cardLits, 'gain2', 'log');
						}

						player.loseToSpecial(result2.cards);
						game.cardsGotoPile(result2.cards, () => ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)]);
						game.updateRoundNumber();
					}, links, player);
			}

		},
		ai: {
			order: 8,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_sanguo_zhanji": {
		trigger: {
			player: ["damageAfter", "discardAfter"],
			target: "useCardToTarget",
		},
		audio: 'xjzh_sanguo_busuan',
		forced: true,
		locked: true,
		priority: 12,
		filter(event, player) {
			if (event.name == 'damage') return true;
			if (!event.cards || !event.cards.length) return false;
			if (event?.target && event.target == player && event.player != player) return get.type(event.card, 'trick') == 'trick';;
			if (event.name == 'discard') return !player.isPhaseUsing(true);
			return false;
		},
		async content(event, trigger, player) {
			player.useSkill('xjzh_sanguo_busuan', false);
		},
	},
	"xjzh_card_chunfenghuayu_skill": {
		mark: true,
		marktext: "春",
		intro: {
			name: "春风化雨",
			content: "防止下一次伤害",
		},
		direct: true,
		priority: 3,
		firstDo: true,
		locked: true,
		charlotte: true,
		trigger: {
			player: "damageBegin1",
		},
		filter(event, player) {
			return !event.numFixed;
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			player.removeSkill("xjzh_card_chunfenghuayu_skill", true);
			player.$fullscreenpop('春风化雨', 'water');
		},
	},
	"xjzh_card_fanyunfuyu_skill": {
		trigger: {
			global: "damageBegin1",
		},
		filter(event, player) {
			if (player.countCards('h', 'xjzh_card_fanyunfuyu')) return get.is.playerNames(player, 'xjzh_sanguo_guanlu');
			return false;
		},
		direct: true,
		priority: 100,
		firstDo: true,
		async content(event, trigger, player) {
			const result = await player.chooseCardTarget({
				position: 'h',
				filterCard(card, player) {
					return get.name(card) == "xjzh_card_fanyunfuyu";
				},
				filterTarget(card, player, target) {
					//var trigger = _status.event.getTrigger();
					return target != player && target != trigger.player;
				},
				ai1(card) {
					return 1;
				},
				ai2(target) {
					if (target.hasSkillTag('nodamage')) return 0;
					return get.damageEffect(target, trigger.source, get.player(), trigger.nature);
				},
				prompt: function () {
					let str = "〖翻云覆雨〗：请弃置一张【翻云覆雨】令一名角色受到";
					if (trigger.source) str += "来自" + get.translation(trigger.source) + "的";
					str += "" + get.translation(trigger.num) + "点";
					if (trigger.nature) str += "" + get.translation(trigger.nature) + ""
					str += "伤害";
					return str;
				}(),
			})
				.forResult();
			if (result?.cards && result?.targets) {
				player.discard(result.cards)._triggered = null;
				result.targets[0].damage(trigger.num, trigger.source, trigger.nature);
				player.$fullscreenpop('翻云覆雨', 'thunder');
			}
		},
	},
	"xjzh_card_zhizuijinmi_skill": {
		mark: true,
		marktext: "醉",
		intro: {
			name: "纸醉金迷",
			content(storage, player) {
				let str = "" + get.translation(player) + "每打出一张牌需要判定，结果与" + get.translation(storage) + "不同则无效，否则摸一张牌";
				return str;
			},
		},
		direct: true,
		priority: 3,
		firstDo: true,
		locked: true,
		charlotte: true,
		trigger: {
			player: "useCard1",
		},
		filter(event, player) {
			return player.storage.xjzh_card_zhizuijinmi_skill;
		},
		group: "xjzh_card_zhizuijinmi_skill_delete",
		async content(event, trigger, player) {
			let suits = player.storage.xjzh_card_zhizuijinmi_skill;
			const judgeEvent = player.judge(card => {
				if (get.suit(card, player) != suits) return -2;
				return 2;
			});
			judgeEvent.judge2 = result => result.bool;
			const { result: { judge } } = await judgeEvent;
			if (judge < 0) {
				trigger.cancel(null, null, 'notrigger');
			} else {
				player.draw();
			}
			player.$fullscreenpop('纸醉金迷', 'fire');
		},
		subSkill: {
			"delete": {
				trigger: {
					player: "phaseAfter",
				},
				direct: true,
				priority: 3,
				firstDo: true,
				locked: true,
				charlotte: true,
				sub: true,
				filter(event, player) {
					return player.storage.xjzh_card_zhizuijinmi_skill;
				},
				async content(event, trigger, player) {
					delete player.storage.xjzh_card_zhizuijinmi_skill;
					player.removeSkill("xjzh_card_zhizuijinmi_skill", true);
				},
			},
		},
	},
	"xjzh_sanguo_youxia": {
		trigger: {
			player: ["phaseAfter", "damageAfter"],
			target: ["useCardToTargeted"],
		},
		forced: true,
		priority: 2,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (event.name == "useCardToTargeted") {
				var history = event.player.getAllHistory('useCard', function (evt) {
					return get.color(evt.card) == "black" && evt.targets.includes(player);
				});
				if (!event.targets.includes(player)) return false;
				if (get.color(event.card) != "black") return false;
				return 100 % history.length == 0;
			}
			if (event.name == "phase" || event.name == "damage") return true;
			return false;
		},
		group: ["xjzh_sanguo_youxia_use", "xjzh_sanguo_youxia_gain"],
		content: function () {
			var card = get.cardPile(function (card) {
				return get.color(card) == "black";
			});
			if (card) player.addToExpansion(card, "gain2", trigger.player).gaintag.add("xjzh_sanguo_youxia_tag");
		},
		subSkill: {
			"tag": {
				marktext: "侠",
				sub: true,
				intro: {
					name: "游侠",
					content: "expansion",
					markcount: "expansion",
				},
				onremove: function (player, skill) {
					var cards = player.getExpansions("xjzh_sanguo_youxia_tag");
					if (cards.length) player.loseToDiscardpile(cards);
				},
			},
			"use": {
				enable: "phaseUse",
				filterTarget: function (card, player, target) {
					if (target == player) return true;
					return !target.countCards('he', function (card) {
						return card.hasGaintag("xjzh_sanguo_youxia_tag");
					});
				},
				audio: "xjzh_sanguo_youxia",
				selectTarget: 1,
				filter: function (event, player) {
					if (!player.getExpansions("xjzh_sanguo_youxia_tag").length) return false;
					if (game.countPlayer(function (current) {
						return current != player && current.countCards('he', function (card) {
							return card.hasGaintag("xjzh_sanguo_youxia_tag");
						});
					}) >= game.players.length) return false;
					return true;
				},
				async content(event, trigger, player) {
					let num = 1, cards = player.getExpansions('xjzh_sanguo_youxia_tag'), targets = event.targets;
					if (targets[0] == player) num = [1, cards.length]
					const result = await player.chooseCardButton(cards, num, true)
						.set('ai', button => {
							let att = get.attitude(player, targets[0]);
							return targets[0].getUseValue(button.link) * -att;
						})
						.forResult();
					if (result?.links) {
						target.gain(result.links, player, 'gain2', 'log').gaintag.add('xjzh_sanguo_youxia_tag');
						if (target != player) {
							if (!target.storage.xjzh_sanguo_youxia) target.storage.xjzh_sanguo_youxia = []
							target.storage.xjzh_sanguo_youxia.push(result.links[0]);
						}
					}
				},
				ai: {
					order: 6,
					result: {
						target(player, target, card) {
							if (!target) return;
							if (target == player) return 1;
							let att = get.attitude(player, target), num = target.countCards('he');
							if (att > 0) return -num;
							return -1;
						},
					},
				},
			},
			"gain": {
				trigger: {
					global: "phaseDiscardBegin",
				},
				forced: true,
				priority: 12,
				audio: "ext:仙家之魂/audio/skill:2",
				filter: function (event, player) {
					if (event.player == player) return false;
					if (!event.player.storage.xjzh_sanguo_youxia) return false;
					var bool = false
					if (event.player.storage.xjzh_sanguo_youxia) {
						for (var i of event.player.storage.xjzh_sanguo_youxia) {
							if (event.player.countCards('hes', function (card) {
								return card == i;
							}) > 0) bool = true;
						}
					}
					if (!bool) return false;
					return true;
				},
				content: function () {
					player.gain(trigger.player.getCards('he'), trigger.player, 'gain2', 'log');
					delete trigger.player.storage.xjzh_sanguo_youxia
				},
			},
		},
		ai: {
			order: 4,
			result: {
				target: function (player, target, card) {
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'tao') {
						if (target.isDamaged()) return 2;
					}
					return -1;
				},
			},
		},
	},
	"xjzh_sanguo_luoyi": {
		trigger: {
			player: ["gainAfter"],
		},
		priority: 2,
		forced: true,
		locked: true,
		init(player, skill) {
			player.disableEquip(2);
		},
		audio: "ext:仙家之魂/audio/skill:4",
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (event.getParent(2).name == "xjzh_sanguo_huchi_use") return false;
			return event.cards.some(card => get.type(card) == "equip" && get.subtype(card) == "equip2");
		},
		group: ["xjzh_sanguo_luoyi_use"],
		async content(event, trigger, player) {
			player.recover();
		},
		subSkill: {
			"use": {
				audio: "xjzh_sanguo_luoyi",
				enable: 'phaseUse',
				prompt: '将一张防具牌牌当作一张无次数限制的【杀】使用',
				position: 'hs',
				filterCard(card) {
					return get.subtype(card) == 'equip2';
				},
				selectCard: 1,
				filterTarget: (card, player, target) => player.canUse({ name: "sha" }, target, true),
				selectTarget() {
					let player = get.player(), num = Math.min(2, game.countPlayer(target => player.canUse({ name: "sha" }, target, true)));
					if (get.players().length < 3) return 1;
					if (!player.hasSkill("xjzh_sanguo_huchi")) return 1;
					return num == 1 ? 1 : [1, num];
				},
				sub: true,
				check(card) { return 1; },
				filter(event, player) {
					if (game.countPlayer(target => player.canUse({ name: "sha" }, target, true))) return false;
					return player.countCards('hs', card => get.subtype(card) == "equip2");
				},
				async content(event, trigger, player) {
					player.useCard({ name: 'sha' }, event.target, false).set('addCount', false).set('baseDamage', 2);
				},
				ai: {
					damageBonus: true,
					order() {
						return get.order({ name: 'sha' }) + 0.2;
					},
					result: {
						target(player, target, card) {
							return lib.card.sha.ai.result.target.apply(this, arguments);
						},
					},
				},
			},
		},
	},
	"xjzh_sanguo_huchi": {
		trigger: {
			source: "damageSource",
		},
		forced: true,
		locked: true,
		priority: 13,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return event.getParent(3).name == "xjzh_sanguo_luoyi_use";
		},
		mod: {
			selectTarget(card, player, range) {
				let type = get.type(card);
				if (range[1] == -1) return;
				if (game.players.length < 3) return;
				if (type == 'basic') range[1]++;
			},
		},
		async content(event, trigger, player) {
			let cards = get.cards(3);
			player.showCards(cards);
			cards = cards.filter(card => get.type(card) == "basic" || get.subtype(card) == "equip2");
			cards.length ? player.gain(cards, player, "gain2") : player.recover();
			/*while (cards.length) {
				var card = cards.pop();
				card.fix();
				ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			};*/
		},
	},
	"xjzh_sanguo_qice": {
		trigger: {
			global: "useCard",
		},
		filter: function (event, player) {
			if (event.player == player) return false;
			if (!event.cards || !event.cards.length) return false;
			if (event.getParent("xjzh_sanguo_qice").name == "xjzh_sanguo_qice") return false;
			return get.type(event.card) == "trick" || !event.card.isCard;
		},
		priority: 13,
		frequent: true,
		audio: "ext:仙家之魂/audio/skill:2",
		prompt: function (event, player) {
			return "〖奇策〗：是否发动展示牌堆顶一张牌使用之";
		},
		check: function (event, player) { return 1; },
		content: function () {
			var cards = get.cards();
			player.showCards(cards);
			if (get.type(cards[0]) == "trick" || get.suit(cards[0]) == get.suit(trigger.cards[0]) || get.number(cards[0]) == get.number(trigger.cards[0])) {
				if (player.hasUseTarget(cards[0])) {
					player.chooseUseTarget(cards[0]);
				}
			}
		},
	},
	"xjzh_sanguo_zhiyu": {
		trigger: {
			player: "damageEnd",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return game.hasPlayer(current => current.countCards('hej'));
		},
		priority: 13,
		frequent: true,
		check(event, player) { return 1; },
		async cost(event, trigger, player) {
			let num = game.countPlayer(current => current != player && current.countCards("he") > 0 && get.attitude(player, current) <= 0);
			let check = num >= 2;
			const { result } = await player.chooseTarget("〖智愚〗：请选择至多两名角色从其区域内获得至多两张牌", [1, 2], (card, player, target) => {
				return target.countCards("he") > 0 && player != target;
			}, target => {
				if (!_status.event.aicheck) return 0;
				const att = get.attitude(player, target);
				if (target.hasSkill("tuntian")) return att / 10;
				return 1 - att;
			}).set("aicheck", check);
			event.result = result;
		},
		async content(event, trigger, player) {
			player.gainMultiple(event.targets, "he");
			trigger.changeToZero();
			game.asyncDelay();
		},
		ai: {
			threaten: 1.4,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card)) return [1, 2];
				},
			},
		},
	},
	"xjzh_sanguo_zhoufu": {
		trigger: {
			player: "damageEnd",
			global: "phaseZhunbeiBegin",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		forced: true,
		locked: true,
		priority: 5,
		marktext: "咒",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			let cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
		filter(event, player) {
			if (event.name == "phaseZhunbei" && player.getExpansions("xjzh_sanguo_zhoufu").length) return event.player != player;
			return event.num > 0;
		},
		async content(event, trigger, player) {
			let cards;
			if (trigger.name == "phaseZhunbei") {
				cards = player.getExpansions("xjzh_sanguo_zhoufu");
				const result = await player.chooseCardButton(cards, get.prompt("xjzh_sanguo_zhoufu", trigger.player, player))
					.set('ai', () => {
						let trigger = get.event().getTrigger();
						return get.attitude(trigger.player, player);
					})
					.forResult();
				if (result?.links) {
					await player.loseToDiscardpile(result.links);
					cards = get.cardPile(card => { return get.type(card) == "delay" }, true);
					if (cards) trigger.player.executeDelayCardEffect(cards);
				}
			} else {
				cards = get.cards(trigger.num);
				await player.addToExpansion(cards, player, "draw").gaintag.add(event.name);
			}
		},
		ai: {
			order: 8,
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card)) return [1, 2];
				},
			},
		},
	},
	"xjzh_sanguo_yingbin": {
		trigger: {
			global: "judgeAfter",
		},
		forced: true,
		locked: true,
		priority: 10,
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			await player.draw();
			while (true) {
				const next = player.chooseToUse({
					filterCard(card, player, event) {
						if (get.itemtype(card) != "card" || (get.position(card) != "h" && get.position(card) != "s")) return false;
						if (get.name(card) == "sha") {
							let num = player.getCardUsable({ name: "sha" });
							if (typeof num == "number") return player.countUsed({ name: "sha" }) < num;
						}
						return lib.filter.filterCard.apply(this, arguments);
					},
					prompt: "〖影兵〗：选择使用一张手牌",
					addCount: true,
					ai1: (card) => get.order(card),
				});
				const result = await next.forResult();
				if (result?.bool) {
					let card = result.card, cards = get.cardPile(item => { return get.type(item) != get.type(card) }, true);
					if (cards) await player.gain(cards, player, "draw");
				}
				else if (!result.bool || !player.getCards("hs").some(card => player.hasUseTarget(card))) break;
			}
		},
	},
	"xjzh_sanguo_tanzhi": {
		trigger: {
			player: "phaseZhunbeiBegin",
		},
		mod: {
			playerEnabled: function (card, player, target) {
				if (!player.storage.xjzh_sanguo_tanzhi) return;
				if (!player.storage.xjzh_sanguo_tanzhi.length) return;
				if (player.storage.xjzh_sanguo_tanzhi.includes(target)) return false;
			},
		},
		audio: "ext:仙家之魂/audio/skill:1",
		prompt: "〖贪智〗：是否发动技能猜测其他角色的手牌？",
		frequent: true,
		priority: 3,
		filter: function (event, player) {
			return game.countPlayer(function (current) {
				return current != player && current.countCards('h');
			}) > 0;
		},
		check: function (event, player) {
			return 0.5;
		},
		marktext: "贪智",
		intro: {
			name: "贪智",
			content: "本回合袁绍无法对你使用牌",
		},
		content: function () {
			"step 0"
			event.targets = game.filterPlayer(function (current) {
				return current != player && current.countCards('h');
			});
			"step 1"
			event.targets2 = event.targets.shift();
			var inpile = lib.inpile.slice(0);
			var text = '请选择猜测' + get.translation(event.targets2) + '的一张手牌的牌名';
			player.chooseVCardButton(true, inpile, text).set('ai', function () {
				return inpile.randomGet();
			});
			"step 2"
			if (result.bool) {
				var card = game.createCard(result.links[0][2]);
				if (event.targets2.countCards('h', { name: card.name })) {
					var card2 = event.targets2.getCards('h').filter(function (cards) {
						return cards.name == result.links[0][2];
					}).randomGet();
					player.gain(card2, event.targets, 'draw');
				} else {
					if (!player.storage.xjzh_sanguo_tanzhi) player.storage.xjzh_sanguo_tanzhi = []
					player.storage.xjzh_sanguo_tanzhi.push(event.targets2);
					var evt = event.getParent("phase");
					if (evt && evt.getParent && !evt.xjzh_sanguo_tanzhi) evt.xjzh_sanguo_tanzhi = true;
				}
				if (event.targets && event.targets.length) event.goto(1);
			}
			"step 3"
			if (!player.storage.xjzh_sanguo_tanzhi.length) return;
			for (var target of player.storage.xjzh_sanguo_tanzhi) {
				target.markSkill("xjzh_sanguo_tanzhi");
			}
			var evt = event.getParent("phase");
			if (evt && evt.getParent && evt.xjzh_sanguo_tanzhi) {
				var next = game.createEvent('xjzh_sanguo_tanzhi_delete', false, evt.getParent());
				next.player = player;
				next.setContent(function () {
					if (player.storage.xjzh_sanguo_tanzhi.length) {
						for (var target of player.storage.xjzh_sanguo_tanzhi) {
							target.unmarkSkill("xjzh_sanguo_tanzhi");
						}
						delete player.storage.xjzh_sanguo_tanzhi;
					}
				});
			}
		},
	},
	"xjzh_sanguo_mingmen": {
		enable: "phaseUse",
		position: 'he',
		usable: 1,
		filterCard: lib.filter.cardDiscardable,
		filter: function (event, player) {
			return player.countCards('he');
		},
		audio: "ext:仙家之魂/audio/skill:2",
		content: function () {
			"step 0"
			var cards = Array.from(ui.cardPile.childNodes).randomGet();
			var card = ui.create.card();
			card.classList.add('infohidden');
			card.classList.add('infoflip');
			player.$throw(card, 1000, 'nobroadcast');
			game.log(player, "扣置了一张牌在场上");
			game.delay(2);
			event.list = {
				1: get.suit(cards),
				2: get.number(cards),
				3: get.type(cards),
				4: cards.name,
			}
			event.num = 0;
			event.num2 = 1;
			"step 1"
			var str = "";
			switch (event.num2) {
				case 1:
					str += "请猜测此牌的花色";
					var controlList = lib.suit.slice(0);
					break;
				case 2:
					str += "请猜测此牌的点数";
					var controlList = [];
					for (var i = 1; i <= 13; i++) {
						controlList.push(i);
					}
					break;
				case 3:
					str += "请猜测此牌的类型";
					var controlList = ["basic", "equip", "delay", "trick"];
					break;
				case 4:
					var names = event.list[event.num2];
					var translates = lib.translate[names];
					var name2 = Array.from(translates).randomGet();
					var controlList = lib.inpile.slice(0);
					str += "请猜测此牌的牌名，温馨提示：这张牌的牌名可能包含这个字——" + name2;
					break;
			}
			if (event.num2 < 4) {
				var str2 = "";
				var dialog = ui.create.dialog('forcebutton', 'hidden');
				switch (event.num2) {
					case 1:
						var suitx = event.list[event.num2];
						if (["heart", "red"].includes(suitx)) {
							str2 += "这张牌可能不是黑色";
						} else {
							str2 += "这张牌可能不是红色";
						}
						break;
					case 2:
						var number = event.list[event.num2];
						if (number % 2 == 0) {
							str2 += "这张牌的点数可能没有余数";
						} else {
							str2 += "这张牌的点数不可能没有余数";
						}
						break;
					case 3:
						str2 += "这张牌的类型可能没有提示！";
						break;
				}
				dialog.addText(str2);
				player.chooseControl(controlList).set('prompt', str).set('dialog', dialog);
			} else {
				player.chooseVCardButton(true, controlList, str).set('ai', function () {
					return controlList.randomGet();
				});
			}
			"step 2"
			if (event.num2 < 4) {
				var boolx = result.control;
				if (event.list[event.num2] == boolx) {
					event.num++;
				} else {
					game.log("你猜错了!");
				}
			} else {
				var boolx = result.links[0][2];
				if (event.list[event.num2] == boolx) {
					event.num++;
				} else {
					game.log("你猜错了!");
				}
			}
			"step 3"
			if (event.num2 < 4) {
				event.num2++
				event.goto(1);
			}
			"step 4"
			game.log(player, "猜中", event.num, "项");
			switch (event.num) {
				case 0:
					player.damage(1, 'nosource', 'nocard');
					break;
				case 1:
					var list = ["basic", "equip", "delay", "trick"];
					player.chooseControl(list).set('prompt', '请选择你要获得牌的类型').set('ai', function () {
						return list.randomGet();
					});
					break;
				case 2:
					if (player.hasUseTarget({ name: "wanjian" })) player.chooseUseTarget({ name: "wanjian" }, true);
					player.draw();
					break;
				case 3:
					game.countPlayer(function (current) {
						if (current != player) {
							if (current.countGainableCards(player, 'he')) player.gainPlayerCard('he', current, true);
						}
					});
					if (player.hasUseTarget({ name: "wanjian" })) player.chooseUseTarget({ name: "wanjian" }, true);
					break;
				case 4:
					player.chooseTarget([1, game.players.length], "选择任意名目标令其各摸一张牌，取消则你摸牌").set('ai', function (target) {
						return get.attitude(player, target);
					});
					break;
			}
			if (event.num != 0) {
				player.getStat().skill.xjzh_sanguo_mingmen -= 1
			}
			if (event.num == 0 || event.num == 2 || event.num == 3) {
				event.finish();
				return;
			}
			"step 5"
			if (event.num == 1) {
				if (result.control) {
					var control = result.control;
					var card = get.cardPile(function (card) {
						return get.type(card) == control;
					});
					if (card) player.gain(card, player, 'gain2', 'log');
				}
			}
			else if (event.num == 4) {
				if (result.bool && result.targets && result.targets.length) {
					var targets = result.targets;
					for (var target of targets) {
						target.draw();
					}
					var targets2 = game.filterPlayer(function (current) {
						return !targets.includes(current);
					});
					for (var target of targets2) {
						target.damage(1, player, 'nocard');
						target.addTempSkill("baiban", { player: "phaseBefore" })
					}
				} else {
					var friends = player.getFriends(true);
					player.draw(friends.length);
					var targets = game.filterPlayer(function (current) {
						return !friends.includes(current);
					});
					for (var target of targets) {
						target.damage(1, player, 'nocard');
						target.addTempSkill("baiban", { player: "phaseBefore" })
					}
				}
			}
		},
	},
	"xjzh_sanguo_biyi": {
		trigger: {
			player: "disableEquipBefore",
		},
		forced: true,
		locked: true,
		priority: 3,
		firstDo: true,
		marktext: "止",
		intro: {
			name: "止啼",
			content: "#",
		},
		global: "xjzh_sanguo_biyi_mod",
		audio: "ext:仙家之魂/audio/skill:1",
		init(player, skill) {
			let listEquip = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5',];
			while (listEquip.length) {
				let pos = listEquip.shift();
				if (player.hasEmptySlot(pos)) {
					let equip = get.cardPile(card => get.type(card) == 'equip' && get.subtype(card) == pos);
					if (equip) {
						player.equip(equip);
						player.$gain2(equip, false);
					};
				};
			}
		},
		async content(event, trigger, player) {
			trigger.slots = [];
			game.log("无法废除", player, "的装备栏");
		},
		subSkill: {
			"mod": {
				charlotte: true,
				locked: true,
				sub: true,
				mod: {
					maxHandcardFinal(player, num) {
						let numx = 0, listEquip = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5',], target = game.findPlayer(target => get.is.playerNames(target, "xjzh_sanguo_zhangliao"));
						if (!target) return num;
						while (listEquip.length) {
							let pos = listEquip.shift();
							if (!target.hasEmptySlot(pos)) numx++;
						}
						if (get.is.playerNames(player, "xjzh_sanguo_zhangliao")) return num += numx;
						return num -= numx;
					},
				},
			},
		},
	},
	"xjzh_sanguo_zhiti": {
		trigger: {
			source: "damageAfter",
			player: "damageAfter",
			global: ["addMark", "removeMark"],
		},
		forced: true,
		locked: true,
		priority: -1,
		lastDo: true,
		marktext: "止",
		intro: {
			name: "止啼",
			content: "#",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (event.name == "damage") {
				if (event.source == player) return event.player != player;
				return event.player != player;
			}
			if (["addMark", "removeMark"].includes(event.name)) {
				if (event.player == player) return false;
				if (event.markName != "xjzh_sanguo_zhiti") return false;
				if (event.name == "addMark") return event.player.countEnabledSlot() > 0;
				return true;
			}
			return false;
		},
		async content(event, trigger, player) {
			if (trigger.name == "damage") {
				trigger.source == player ? trigger.player.addMark("xjzh_sanguo_zhiti", 1) : trigger.source.addMark("xjzh_sanguo_zhiti", 1);
			} else {
				trigger.name == "addMark" ? trigger.player.chooseToDisable() : trigger.player.chooseToEnable();
			}
		},
	},
	"xjzh_sanguo_cuifengx": {
		enable: "phaseUse",
		usable: 1,
		selectTarget: 2,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return game.countPlayer(current => current.countMark("xjzh_sanguo_zhiti"));
		},
		filterTarget(card, player, target) {
			if (ui.selected.targets.length) return true;
			return target.countMark("xjzh_sanguo_zhiti");
		},
		targetprompt: ["失去标记", "获得标记"],
		multitarget: true,
		async content(event, trigger, player) {
			let targets = event.targets;
			await targets[0].removeMark("xjzh_sanguo_zhiti", 1, false);
			await targets[1].addMark("xjzh_sanguo_zhiti", 1, false);
			targets[0].useCard({ name: "sha", isCard: true }, targets[1], 'noai', false).set("baseDamage", 2);
		},
		ai: {
			order: 8,
			expose: 0.3,
			result: {
				target(player, target, card) {
					if (ui.selected.targets.length == 0) return 1;
					else return get.effect(target, { name: "sha" }, ui.selected.targets[0], target) - 3;
				}
			},
		},
	},
	"xjzh_sanguo_xingyi": {
		enable: "phaseUse",
		usable: 1,
		filterTarget(card, player, target) {
			return target.countCards('h');
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let target = event.targets[0], cards = target.getCards('h');
			await target.discard(cards);
			let evt = await target.draw(cards.length * 2), list = [], num = 0;
			for await (let card of evt.result) {
				if (get.suit(card) == "heart") num++;
			};
			let drawNum = num - target.getDamagedHp(true);
			if (drawNum > 0) await target.draw(drawNum);
			target.recover(num);
		},
		ai: {
			order: 12,
			result: {
				target: 1,
			},
		},
	},
	"xjzh_sanguo_qingnang": {
		trigger: {
			global: "changeHpAfter",
		},
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		prompt(event, player) {
			return "〖青囊〗：是否令" + get.translation(event.player) + "交换体力与已损体力？";;
		},
		check(event, player) {
			let att = get.attitude(player, event.player);
			if (event.player == player) {
				if (player.getHp(true) < player.getDamagedHp(true)) return 10;
			} else {
				if (event.player.getHp(true) > event.player.getDamagedHp(true)) return -att;
				return att;
			}
			return 0;
		},
		filter(event, player) {
			if (event.player.isHealthy()) return false;
			if (event.player.isDying()) return false;
			if (event.player.getHp(true) <= 0) return false;
			if (event.player.getDamagedHp(true) == event.player.getHp(true)) return false;
			if (event.getParent("xjzh_sanguo_qingnang").name == "xjzh_sanguo_qingnang") return false;
			return true;
		},
		async content(event, trigger, player) {
			let num = trigger.player.getDamagedHp(true) - trigger.player.getHp(true);
			await trigger.player.changeHp(num);
			if (trigger.player.getHp(true) >= trigger.player.getDamagedHp()) trigger.player.gainMaxHp();
		},
	},
	"xjzh_sanguo_elai": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:3",
		async content(event, trigger, player) {
			await player.loseHp();
			const evt = await player.draw(player.getDamagedHp(true) + 1);
			const cards = evt.result.filter(card => get.type(card) == "equip");
			if (!cards.length) return;
			const { result: { bool, links } } = await player.chooseCardButton([1, cards.length], cards, '〖恶来〗：请选择并弃置任意张装备牌').set('ai', function (button) {
				return 8 - get.value(button.link);
			});
			if (bool && links.length) {
				player.discard(links)._triggered = null;
				const { result: { bool, targets } } = await player.chooseTarget("〖恶来〗：请选择一名其他角色令其受到" + get.translation(links.length) + "点伤害", lib.filter.notMe).set('ai', function (target) {
					if (get.damageEffect(target, get.player(), get.player())) return 1;
				});
				if (bool && targets.length) {
					await targets[0].damage(links.length, player, "nocard");
					await player.discardPlayerCard('he', targets[0], links.length, true);
				}
			}
		},
		ai: {
			order: function (item, player) {
				return player.getDamagedHp() + 0.1;
			},
			result: {
				player: function (player) {
					if (player.countCards('h') >= player.hp - 1) return -1;
					if (player.hp < 2) return -1;
					return 1;
				}
			}
		}
	},
	"xjzh_sanguo_tiequ": {
		trigger: {
			player: "damageBegin1",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (player.countCards('h') <= 0) return false;
			return event.source != undefined;
		},
		frequent: true,
		check(event, player) {
			var source = event.source
			var att = get.attitude(player, event.source);
			if (att > 0) return event.source.hp >= 2;
			return -att;
		},
		async content(event, trigger, player) {
			const cards = player.getCards('h').randomGet();
			player.showCards(cards)
			const { result: { bool } } = await trigger.source.chooseToDiscard('he', `〖铁躯〗：请弃置一张类型为${get.translation(get.type(cards))}的牌，否则失去一点体力`, { type: get.type(cards) }).set('ai', card => {
				return get.unuseful(card) + 2.5 * (5 - get.owner(card).hp);
			});
			if (!bool) trigger.source.loseHp();
		},
	},
	"xjzh_sanguo_guhuo": {
		enable: "phaseUse",
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		init(player) {
			if (game.zhu == player && player.identity == "zhu" && player.isZhu) game.chooseCharacter();
			if (!game.getExtensionConfig("仙家之魂", "xjzh_sanguo_guhuo") && game.me == player) {
				alert("游玩此武将，为获得良好的游戏体验，建议关闭“自动标记身份”，此提示仅显示一次")
				game.saveExtensionConfig("仙家之魂", "xjzh_sanguo_guhuo", true);
			}
		},
		locked: true,
		mode: ["identity"],
		group: ["xjzh_sanguo_guhuo_use", "xjzh_sanguo_guhuo_id"],
		content: function () {
			"step 0"
			var list = ["nei", "fan", "zhong"];
			player.chooseControl(list).set('ai', function () {
				return list.randomGet();
			}).set('prompt', '〖蛊惑〗：选择一张身份牌展示在武将牌上');
			"step 1"
			if (result.control) {
				var id = result.control
				player.node.identity.show();
				player.node.identity.firstChild.innerHTML = get.translation(id);
				player.storage.xjzh_sanguo_guhuo = id
				game.log(player, "展示的身份牌为", "#y" + id)
			}
		},
		ai: {
			order: 12,
			result: {
				player: 10,
			},
		},
		subSkill: {
			"use": {
				trigger: {
					target: "useCardToTarget",
				},
				audio: "xjzh_sanguo_guhuo",
				forced: true,
				priority: 100,
				firstDo: true,
				sub: true,
				filter: function (event, player) {
					if (event.player == player) return false;
					return player.storage.xjzh_sanguo_guhuo;
				},
				content: function () {
					"step 0"
					if (trigger.player.hasMark("xjzh_sanguo_chanyuan")) {
						event.caice = true;
						event.goto(3);
					}
					trigger.player.chooseBool("〖蛊惑〗：" + get.translation(player) + "的身份是否为" + get.translation(player.storage.xjzh_sanguo_guhuo) + "？").set('ai', function () {
						return Math.random()
					});
					"step 1"
					game.delayx(1.5);
					if (result.bool) {
						event.bool = false;
						var id = player.identity
						var id2 = player.storage.xjzh_sanguo_guhuo
						if (id != id2) {
							trigger.getParent().targets.remove(player);
							player.draw();
							event.bool = true;
							game.log(trigger.player, "猜错了于吉的身份", "#y〖" + get.translation(trigger.card) + "〗", "失效了");
						}
					} else {
						event.bool = false;
						var id = player.identity
						var id2 = player.storage.xjzh_sanguo_guhuo
						if (id == id2) {
							trigger.getParent().targets.remove(player);
							player.draw();
							event.bool = true;
							game.log(trigger.player, "猜错了于吉的身份", "#y〖" + get.translation(trigger.card) + "〗", "失效了");
						}
					}
					"step 2"
					if (event.bool == true) {
						trigger.player.addMark("xjzh_sanguo_chanyuan", 1);
						var id = ["nei", "fan", "zhong"].randomGet();
						player.identity = id;
						player.setIdentity(id);
						player.node.identity.show();
						player.node.identity.firstChild.innerHTML = get.translation(player.storage.xjzh_sanguo_guhuo);
						if (game.zhu.isAlive() && player.identity == "zhong") {
							if (!game.countPlayer(function (current) { return current.identity == "fan" }) && !game.countPlayer(function (current) { return current.identity == "nei" })) game.over(true);
						}
					}
					event.finish();
					return;
					"step 3"
					if (event.caice == true) {
						trigger.getParent().targets.remove(player);
						player.draw(2);
						game.log(trigger.player, "因〖缠怨〗导致", "#y〖" + get.translation(trigger.card) + "〗", "失效了");
					}
				},
			},
			"id": {
				trigger: {
					global: "gameStart",
					player: "enterGame",
				},
				direct: true,
				priority: 100,
				firstDo: true,
				sub: true,
				content: function () {
					var list = []
					var players = game.filterPlayer();
					for (var i of players) {
						if (i.isZhu || list.includes(i.identity)) continue;
						list.add(i.identity);
					}
					var id = list.randomGet();
					player.identity = id;
					player.setIdentity(id);
					/*player.showIdentity();
					game.log(player.identity)
					var id2=lib.translate[list.remove(id).randomGet()];
					player.node.identity.firstChild.innerHTML=id2;
					game.log(player.identity);*/
					if (!player.storage.xjzh_sanguo_guhuo) player.node.identity.hide();
				},
			},
		},
	},
	"xjzh_sanguo_chanyuan": {
		trigger: {
			player: "useCard2",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		forced: true,
		priority: 100,
		locked: true,
		mode: ["identity"],
		filter: function (event, player) {
			var type = get.type(event.card)
			if (type != 'basic' && type != 'trick') return false;
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (!info.enable) return false;
			if (event.targets && !info.multitarget) {
				if (game.hasPlayer(function (current) {
					return lib.filter.targetEnabled2(event.card, player, current) && !event.targets.includes(current) && current.hasMark("xjzh_sanguo_chanyuan");
				})) {
					return true;
				}
			}
			return false;
		},
		marktext: "缠",
		intro: {
			name: "缠怨",
			content: "mark",
		},
		mod: {
			maxHandcard: function (player, num) {
				var players = game.players
				var numx = 0
				for (var i = 0; i < players.length; i++) {
					if (players[i].hasMark("xjzh_sanguo_chanyuan")) numx = +players[i].countMark("xjzh_sanguo_chanyuan");
				}
				return num + numx;
			},
		},
		group: ["xjzh_sanguo_chanyuan_draw"],
		content: function () {
			'step 0'
			var num = game.countPlayer(function (current) { return current.hasMark("xjzh_sanguo_chanyuan") });
			var prompt2 = '〖缠怨〗：额外指定一名' + get.translation(trigger.card) + '的目标'
			player.chooseTarget(num, get.prompt('xjzh_sanguo_chanyuan'), function (card, player, target) {
				var player = get.player();
				if (_status.event.targets.includes(target)) return false;
				if (!target.hasMark("xjzh_sanguo_chanyuan")) return false;
				return lib.filter.targetEnabled2(_status.event.card, player, target);
			}).set('prompt2', prompt2).set('ai', function (target) {
				var trigger = _status.event.getTrigger();
				var player = get.player();
				return get.effect(target, trigger.card, player, player);
			}).set('targets', trigger.targets).set('card', trigger.card);
			'step 1'
			if (result.bool) {
				if (!event.isMine()) game.delayx();
				trigger.targets.addArray(result.targets)
				for (var i of result.targets) {
					i.removeMark("xjzh_sanguo_chanyuan", 1);
				}
			}
			else {
				event.finish();
			}
		},
		subSkill: {
			"draw": {
				trigger: {
					player: "phaseBegin1",
				},
				forced: true,
				priority: 1,
				sub: true,
				filter: function (event, player) {
					return !event.numFixed;
				},
				content: function () {
					var numx = 0
					var players = game.players
					for (var i = 0; i < players.length; i++) {
						if (players[i].hasMark("xjzh_sanguo_chanyuan")) numx = +players[i].countMark("xjzh_sanguo_chanyuan");
					}
					trigger.num += numx
				},
			},
		},
	},
	"xjzh_sanguo_jianjie": {
		trigger: {
			global: "gameStart",
			player: "enterGame",
		},
		forced: true,
		priority: 10,
		locked: true,
		mark: true,
		marktext: "杰",
		intro: {
			mark: function (dialog, storage, player) {
				if (storage && storage.length) {
					if (player.isUnderControl(true)) {
						dialog.addSmall([storage, 'character']);
					}
					else {
						dialog.addText('共有' + get.cnNumber(storage.length) + '张武将牌');
					}
				}
				else {
					return '没有武将牌';
				}
			},
			content: function (storage, player) {
				return '共有' + get.cnNumber(storage.length) + '张武将牌'
			},
			markcount: function (storage, player) {
				if (storage && storage.length) return storage.length;
				return "";
			},
		},
		init: function (player) {
			if (!player.storage.xjzh_sanguo_jianjie) {
				player.storage.xjzh_sanguo_jianjie = []
				if (game.roundNumber >= 1) {
					var next = game.createEvent('xjzh_sanguo_jianjie_add', false);
					next.player = player;
					next.setContent(lib.skill.xjzh_sanguo_jianjie.content);
				}
			}
		},
		audio: "ext:仙家之魂/audio/skill:2",
		group: "xjzh_sanguo_jianjie_use",
		content: function () {
			var targets = game.xjzh_wujiangpai(["pangtong", "shiyuan", "fengchu", "庞统", "士元", "凤雏", "诸葛亮", "孔明", "卧龙", "zhugeliang", "kongming", "wolong"]);
			if (targets.length) player.storage.xjzh_sanguo_jianjie = targets.slice(0);
			player.update();
			player.updateMarks();
		},
		subSkill: {
			"use": {
				trigger: {
					global: "phaseZhunbeiBegin",
				},
				forced: true,
				priority: 12,
				sub: true,
				filter: function (event, player) {
					return player.storage.xjzh_sanguo_jianjie && player.storage.xjzh_sanguo_jianjie.length;
				},
				audio: "xjzh_sanguo_jianjie",
				content: function () {
					"step 0"
					var list = player.storage.xjzh_sanguo_jianjie
					player.chooseButton(trigger.player == player ? true : false).set('ai', function (button) {
						var att = get.attitude(player, event.player);
						if (att > 0) get.rank(button.link, true);
						return 0;
					}).set('createDialog', ['〖荐杰〗：' + get.translation(trigger.player) + '的回合开始，请选择一张武将牌', [list, 'character']]);
					"step 1"
					if (result.links) {
						var name = result.links[0]
						var list = []
						var skills = lib.character[name][3]
						for (var i = 0; i < skills.length; i++) {
							var info = get.info(skills[i]);
							if (info && (info.limited || info.juexingji || info.dustSkill || info.sub)) continue;
							trigger.player.addTempSkill(skills[i]);
						}
						trigger.player.storage.xjzh_sanguo_jianjie_damage = player;
						player.addSkill("xjzh_sanguo_jianjie_damage");
						player.storage.xjzh_sanguo_jianjie.remove(name);
					}
				},
			},
			"damage": {
				trigger: {
					global: "phaseAfter",
				},
				forced: true,
				priority: 12,
				sub: true,
				audio: "xjzh_sanguo_jianjie",
				filter: function (event, player) {
					return event.player.storage.xjzh_sanguo_jianjie_damage;
				},
				content: function () {
					"step 0"
					event.targets = game.filterPlayer(function (current) { return current != player });
					event.targets.sortBySeat(event.player);
					"step 1"
					if (event.targets.length) {
						event.target = event.targets.shift();
						event.target.chooseCard(`〖荐杰〗：选择一张牌交给${get.translation(player)}或受到${get.translation(trigger.player)}造成的一点伤害`).set('ai', function (card) {
							var att = get.attitude(player, event.target);
							if (att > 0) return 12 - get.value(card);
							return 4 - get.value(card);
						});
					} else {
						event.finish();
					}
					"step 2"
					if (result.bool && result.cards.length) {
						player.gain(result.cards, event.target, 'draw');
					} else {
						event.target.damage(1, trigger.player, 'nocard');
					}
					"step 3"
					if (event.targets.length) {
						event.goto(1);
					} else {
						player.removeSkill("xjzh_sanguo_jianjie_damage");
					}
				},
			},
		},
	},
	"xjzh_sanguo_yinshi": {
		trigger: {
			player: "damageBegin1",
		},
		forced: true,
		priority: 1,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		group: "xjzh_sanguo_yinshi_use",
		filter(event, player) {
			if (!player.isPhaseUsing()) return false;
			return player.storage.xjzh_sanguo_jianjie && player.storage.xjzh_sanguo_jianjie.length;
		},
		async content(event, trigger, player) {
			trigger.cancel(null, null, 'notrigger');
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (get.is.damageCard(card) && !target.isPhaseUsing() && target.storage.xjzh_sanguo_jianjie && target.storage.xjzh_sanguo_jianjie.length) {
						if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
						return [0, 0];
					}
				},
			},
		},
		subSkill: {
			"use": {
				enable: "phaseUse",
				usable: 1,
				sub: true,
				prompt(event, player) {
					return "〖隐世〗：选择一名角色替换其武将牌？";
				},
				audio: "xjzh_sanguo_yinshi",
				filter(event, player) {
					return player.storage.xjzh_sanguo_jianjie && player.storage.xjzh_sanguo_jianjie.length;
				},
				filterTarget: lib.filter.notMe,
				async content(event, trigger, player) {
					let target = event.target;
					let list = player.storage.xjzh_sanguo_jianjie;
					const result = await player.chooseButton()
						.set('ai', button => {
							let att = get.attitude(player, target);
							if (att > 0) get.rank(button.link, true);
							return 0;
						})
						.set("target", target)
						.set('createDialog', ['〖荐杰〗：请选择一张武将牌', [list, 'character']])
						.forResult();
					if (result?.links) {
						target.changeCharacter(result.links);
						target.maxHp = lib.character[result.links[0]].maxHp;
						target.recoverTo(target.maxHp);
						game.xjzh_clearRestraint(target);
						player.storage.xjzh_sanguo_jianjie.remove(result.links[0]);
					}
				},
				ai: {
					order: 1,
					result: {
						player: 10,
					},
				},
			},
		},
	},
	"xjzh_sanguo_zhiheng": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:2",
		usable(skill, player) {
			return player.getDamagedHp() + 1;
		},
		derivation: ["xjzh_sanguo_wuzhan", "xjzh_sanguo_wumeng", "xjzh_sanguo_wuxing", "xjzh_sanguo_wuzuo"],
		filter(event, player) {
			return player.countCards('he');
		},
		position: 'he',
		filterCard: lib.filter.cardDiscardable,
		selectCard: [1, Infinity],
		prompt: '〖制衡〗：弃置任意张牌并摸等量的牌，每弃置一种额外的花色，你摸一张牌。',
		check(card) {
			let player = get.player();
			if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', card => {
				return get.value(card) >= 8;
			}))) return 1;
			return 6 - get.value(card)
		},
		discard: false,
		lose: false,
		delay: false,
		async content(event, trigger, player) {
			let cards = event.cards.slice(0);
			let suits = cards.map(card => get.suit(card)).unique();
			player.discard(cards);
			player.draw(cards.length + suits.length);
		},
		ai: {
			order: 3,
			threaten: 1.5,
			result: {
				player(player, target) {
					let list = lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0), num = player.countSkill("xjzh_sanguo_zhiheng");
					if (num <= 4) return 1.5;
					return 2;
				},
			},
		},
	},
	"xjzh_sanguo_wuyun": {
		trigger: {
			player: "phaseJieshuBegin",
		},
		forced: true,
		locked: false,
		priority: 3,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let history = player.getHistory('useSkill', evt => evt && evt.skill == "xjzh_sanguo_zhiheng"), skills = lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0);
			if (!history.length) return false;
			if (player.hasSkill(skills[history.length - 1])) return false;
			return true;
		},
		async content(event, trigger, player) {
			let skills = lib.skill.xjzh_sanguo_zhiheng.derivation.slice(0), history = player.getHistory('useSkill', evt => evt && evt.skill == "xjzh_sanguo_zhiheng");
			if (history.length <= 4 && !player.hasSkill(skills[history.length - 1])) player.addSkills(skills[history.length - 1]);
		},
	},
	"xjzh_sanguo_wuzhan": {
		trigger: {
			player: "drawBegin",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (event.num < 3) return false;
			return true;
		},
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		animationStr: "大吴国战",
		check(event, player) {
			return player.getEnemies().length;
		},
		async content(event, trigger, player) {
			player.awakenSkill(event.name);
			let number = trigger.num;
			while (number > 0) {
				const result = await player.chooseTarget((card, player, target) => {
					let history = target.getAllHistory("damage", evt => {
						return evt && evt.getParent("xjzh_sanguo_wuzhan").name == "xjzh_sanguo_wuzhan";
					});
					let num = 0;
					if (history && history.length) {
						for (let i of history) {
							num += i.num;
						}
					}
					if (num >= 2) return false;
					return target != player;
				})
					.set('prompt', `〖吴战〗：请选择令一名其他角色受到来自你的至多2点伤害，剩余可分配${number}点伤害`)
					.set('ai', function (target) {
						return get.damageEffect(target, get.player(), get.player());
					})
					.forResult();
				if (result?.targets) {
					let targets = result.targets, list = [];
					if (number > 1) {
						for (let i = 1; i <= 2; i++) {
							list.push(i);
						}
					} else list = [1];
					const { result: { control } } = list.length == 1 ? { result: { control: list[0] } } : await player.chooseControl(list, "cancel2")
						.set('ai', () => {
							let att = get.attitude(get.player(), targets[0]);
							if (att > 0) return 'cancel2';
							if (targets[0].hasSkillTag("filterDamage")) return list[0];
							return list.randomGet();
						});
					if (control) {
						if (control != "cancel2") {
							await targets[0].damage(control, player, 'nocard');
							number -= control;
						}
					}
				} else break;
			}
			trigger.changeToZero();
		},
	},
	"xjzh_sanguo_wumeng": {
		trigger: {
			player: "drawBefore",
		},
		usable: 1,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			return game.hasPlayer(current => current.group != "wu");
		},
		check(event, player) {
			return game.hasPlayer(current => current.group != "wu" && get.attitude(player, current) > 0);
		},
		async content(event, trigger, player) {
			const result = await player.chooseTarget(get.prompt("xjzh_sanguo_wumeng"), true, (card, player, target) => {
				if (target == player) return false;
				return target.group != "wu";
			})
				.set('ai', target => {
					return get.attitude(player, target);
				})
				.forResult();
			if (result?.targets) {
				let cards = get.cards(trigger.num * 2), targets = result.targets;
				game.cardsGotoOrdering(cards);
				const result2 = await player.chooseCardButton(Math.round(cards.length / 2), cards, true)
					.set('filterButton', button => {
						if (!ui.selected.buttons.length) return true;
						let selected = ui.selected.buttons;
						if (selected >= Math.round(cards.length / 2)) return false;
						return true;
					})
					.set('prompt', `〖吴盟〗：选择${get.translation(Math.round(cards.length / 2))}张牌获得之，并令${get.translation(targets[0])}获得剩余的牌`)
					.forResult();
				if (result2?.links) {
					player.gain(result2.links, 'draw', player);
					targets[0].gain(cards.filter(card => !result2.links.includes(card)), 'draw', player);
				}
			}
			trigger.changeToZero();
		},
	},
	"xjzh_sanguo_wuxing": {
		trigger: {
			source: "damageBegin1",
		},
		forced: true,
		priority: 6,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			return player.countCards('h') >= 8;
		},
		mod: {
			maxHandcard(player, num) {
				return game.countPlayer(current => current.group == "wu") * 2 + num;
			},
		},
		async content(event, trigger, player) {
			trigger.num++
		},
		damageBonus: true,
		skillTagFilter(player, tag) {
			if (tag == "damageBonus") return player.countCards('h') >= 8;
		},
	},
	"xjzh_sanguo_wuzuo": {
		trigger: {
			player: 'loseAfter',
			global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
		},
		usable: 1,
		frequent: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (player.countCards('h')) return false;
			let evt = event.getl(player);
			return evt && evt.player == player && evt.hs && evt.hs.length > 0;
		},
		async content(event, trigger, player) {
			player.draw(2);
		},
		ai: {
			threaten: 0.8,
			effect: {
				target(card) {
					if (get.tag(card, "loseCard") || get.tag(card, "discard") || get.tag(card, "gain")) return 0.5;
				}
			},
			noh: true,
			skillTagFilter(player, tag) {
				if (tag == 'noh') return player.countCards('h') == 1;
			}
		},
	},
	"xjzh_sanguo_jiuyuan": {
		trigger: {
			global: "recoverBegin",
		},
		direct: true,
		priority: 10,
		zhuSkill: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (!player.hasZhuSkill('xjzh_sanguo_jiuyuan')) return false;
			if (event.player == player) return false;
			if (player.isHealthy()) return false;
			var list = [];
			if (event.player.name) list.push(event.player.name);
			if (event.player.name1) list.push(event.player.name1);
			if (event.player.name2) list.push(event.player.name2);
			var bool = false;
			for (var name of list) {
				if (lib.character[name][1] == "wu") bool = true;
			}
			return event.player.group == "wu" || bool == true;
		},
		content: function () {
			"step 0"
			trigger.player.chooseBool("〖救援〗：是否改为孙权回复一点体力，然后你摸一张牌").set('ai', function () {
				var trigger = _status.event.getTrigger()
				var att = get.attitude(get.player(), trigger.player);
				return att;
			});
			"step 1"
			if (result.bool) {
				trigger.player.logSkill('xjzh_sanguo_jiuyuan', player);
				player.recover();
				trigger.player.draw();
				trigger.cancel();
			}
		},
	},
	"xjzh_sanguo_tongxuan": {
		trigger: {
			global: "gameStart",
			player: ["enterGame", "phaseAfter"],
		},
		enable: "phaseUse",
		usable: 1,
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = 0;
			let nameList = get.nameList(player);
			let bool = nameList.filter(name => game.xjzh_hasEquiped("xjzh_qishu_mingtianfu", name)).length ? true : false;
			player.storage[skill] += bool == true ? 2 : 1;
		},
		frequent: true,
		check(event, player) { return 1; },
		filter(event, player) {
			let list = get.xjzh_zengyiSkills(player);
			let num = list.filter(skill => player.hasSkill("xjzh_zengyi_" + skill)).length;
			return num < list.length;
		},
		async content(event, trigger, player) {
			let skills = get.xjzh_zengyiSkills(player), cards = [];
			for (let i of skills) {
				lib.card[i] = {
					fullskin: false,
					image: "ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
				};
				let info = get.info(i)
				if (typeof info.intro.content == "string") {
					lib.translate[i + "_info"] = info.intro.content;
				} else {
					lib.translate[i + "_info"] = info.intro.translations;
				}
				if (lib.card[i]) cards.addArray([i]);
			};
			let dialog = ui.create.dialog(`〖通玄〗：请选择${player.storage[event.name]}个技能获得之`, [cards, 'vcard'], 'hidden');
			const result = await player.chooseButton(dialog, skills.some(skill => player.hasSkill(skill)) ? false : true, [1, player.storage[event.name]])
				.set('ai', button => Math.random())
				.forResult();
			if (result?.links) {
				let reSkills = skills.filter(skill => player.hasSkill(skill));
				await player.removeSkills(reSkills);
				await player.addSkills(result.links.map(item => item[2]));
				//添加获得一个动画
				let card = game.createCard("xjzh_zengyi_shuangsheng_card");
				player.$gain2(card);
			}
			player.update();
		},
		ai: {
			order: 12,
			result: {
				player(player, target) {
					let list = get.xjzh_zengyiSkills(player);
					let skills = list.filter(skill => player.hasSkill("xjzh_zengyi_" + skill)), num = player.storage.xjzh_sanguo_tongxuan;
					return skills.length > num;
				},
			},
		}
	},
	"xjzh_sanguo_youbian": {
		trigger: {
			player: "phaseZhunbeiBegin",
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
	"xjzh_sanguo_shouye": {
		trigger: {
			player: "phaseBegin",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		init(player, skill) {
			player.storage.xjzh_sanguo_shouye = {};
		},
		priority: -5,
		async cost(event, trigger, player) {
			const { result } = await player.chooseTarget("〖授业〗：请选择一名其他角色令其随机获得一个技能直到其发动该技能", lib.filter.notMe).set("ai", target => {
				return get.attitude(player, target);
			});
			event.result = result;
		},
		bannedType: ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技"],
		async content(event, trigger, player) {
			if (!event.targets) return;
			let list = [];
			game.xjzh_wujiangpai().forEach(item => {
				if (lib.character[item].skills) {
					list.addArray(lib.character[item].skills.filter(skill => {
						if (!get.skillInfoTranslation(skill)) return false;
						if (lib.skill.global.includes(skill)) return false;
						return !get.skillCategoriesOf(skill, player).some(type => lib.skill[event.name].bannedType.includes(type));
					}));
				}
			});
			let skill = list.randomGet();
			event.targets[0].addTempSkills(skill, { player: `${skill}After` });
		},
	},
	"xjzh_sanguo_xianshou": {
		trigger: {
			global: "$logSkill",
		},
		forced: true,
		locked: true,
		priority: 1,
		forbid: ["xjzh_challenge"],
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (event.player != player) {
				var list = player.storage.xjzh_sanguo_shouye, list2 = [];
				for (var i in list) {
					list2.push(i);
				}
				if (list2.includes(event.player.name1)) {
					if (list[event.player.name1] == event.skill) return true;
				}
			}
			if (event.player == player) {
				if (!player.storage.xjzh_sanguo_xianshou || !player.storage.xjzh_sanguo_xianshou.length) return false;
				var list = player.storage.xjzh_sanguo_xianshou;
				if (list.includes(event.skill)) return true;
			}
			return false;
		},
		group: ["xjzh_sanguo_xianshou_draw"],
		content: function () {
			"step 0"
			if (trigger.player == player) {
				event.goto(3);
				return;
			}
			"step 1"
			var list = trigger.player.getSkills(null, false, false).filter(function (skill) {
				var info = lib.skill[skill];
				var skills = player.storage.xjzh_sanguo_shouye, list2 = [];
				for (var i in skills) {
					list2.push(i);
				}
				if (list2.includes(trigger.player.name1)) {
					if (skills[trigger.player.name1] == skill) return false;
				}
				return info && !info.unique && !info.limited && !info.juexingji && !info.dutySkill && !info.equipSkill && !info.cardSkill && !lib.skill.global.includes(skill);
			});
			if (!list.length) {
				player.say("没有符合条件的技能");
				return;
			}
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
			player.chooseControl(list, 'cancel2').set('ai', function () {
				return get.max(list, get.skillRank, 'item');
			}).set('dialog', dialog);
			"step 2"
			if (result.control) {
				if (result.control != 'cancel2') {
					player.addSkillLog(result.control);
					if (!player.storage.xjzh_sanguo_xianshou) player.storage.xjzh_sanguo_xianshou = [];
					player.storage.xjzh_sanguo_xianshou.push(result.control);
				} else {
					event.finish();
				}
			}
			event.finish();
			"step 3"
			var list = player.storage.xjzh_sanguo_xianshou
			if (list.includes(trigger.skill)) {
				player.removeSkillLog(trigger.skill, true);
				list.remove(trigger.skill);
				player.storage.xjzh_sanguo_xianshou = list.slice(0);
			}
		},
		subSkill: {
			"draw": {
				trigger: {
					player: "drawBegin",
				},
				direct: true,
				sub: true,
				priority: 1,
				filter: function (event, player) {
					var list = player.storage.xjzh_sanguo_shouye, list2 = [];
					for (var i in list) {
						list2.push(i);
					}
					return list2.length > 0;
				},
				content: function () {
					var list = player.storage.xjzh_sanguo_shouye, list2 = [];
					for (var i in list) {
						list2.push(i);
					}
					if (list2.length > 0) trigger.num += list2.length;
				},
			},
		},
	},
	"xjzh_sanguo_lundao": {
		enable: "phaseUse",
		usable: 1,
		forbid: ["xjzh_challenge"],
		filterTarget: function (card, player, target) {
			return player.canCompare(target);
		},
		audio: "ext:仙家之魂/audio/skill:2",
		selectTarget: function () {
			var player = get.player();
			var num = game.countPlayer(function (current) {
				return player.canCompare(current);
			});
			var list = player.storage.xjzh_sanguo_shouye, list2 = [];
			for (var i in list) {
				list2.push(i);
			}
			var num2 = Math.min(num, list2.length);
			if (num2 > 1) return [1, Math.min(num2, 3)];
			return 1;
		},
		mod: {
			targetEnabled: function (card, player, target, now) {
				if (player.hasSkill('xjzh_sanguo_lundao_target')) return false;
			},
		},
		group: "xjzh_sanguo_lundao_use",
		filter: function (event, player) {
			var list = player.storage.xjzh_sanguo_shouye, list2 = [];
			for (var i in list) {
				list2.push(i);
			}
			return game.hasPlayer(function (current) {
				return player.canCompare(current) && list2.length > 0;
			});
		},
		content: function () {
			"step 0"
			event.count = 0;
			event.count2 = 0;
			event.cards = [];
			"step 1"
			player.chooseToCompare(target);
			"step 2"
			if (result.winner == player) {
				event.count++
			} else {
				event.count2++
			}
			if (result.player) {
				game.cardsGotoOrdering(result.player);
				event.cards.push(result.player);
			}
			if (player.canCompare(target)) event.goto(1);
			"step 3"
			if (event.count > event.count2) {
				game.log(player, "拼点结果为" + get.translation(event.count + event.count2) + "局" + get.translation(event.count) + "胜，最终结果为胜利");
				target.addSkill('xjzh_sanguo_lundao_target');
				target.addSkill("xjzh_sanguo_lundao_remove");
				player.gain(event.cards, player, 'gain2');
			} else {
				game.log(player, "拼点结果为" + get.translation(event.count + event.count2) + "局" + get.translation(event.count) + "胜，最终结果为失败");
				player.loseHp();
			}
		},
		subSkill: {
			"target": {
				sub: true,
			},
			"remove": {
				trigger: {
					global: "phaseBegin",
				},
				direct: true,
				priority: -10,
				sub: true,
				filter: function (event, player) {
					if (!get.is.playerNames(event.player, 'xjzh_sanguo_nanhua')) return false;
					return true;
				},
				content: function () {
					player.removeSkill("xjzh_sanguo_lundao_target");
					player.removeSkill("xjzh_sanguo_lundao_remove");
				},
			},
			"use": {
				trigger: {
					global: ["useSkillBegin", "$logSkill"],
				},
				audio: "xjzh_sanguo_lundao",
				filter: function (event, player) {
					var skills = event.skill
					var info = get.info(skills)
					if (!event.player.hasSkill("xjzh_sanguo_lundao_target")) return false;
					if (!lib.translate[event.skill + '_info']) return false;
					if (lib.skill.global.includes(event.skill)) return false;
					if (info && (info.limited || info.juexingji || info.dutySkill || info.equipSkill || info.sub || info.unique || !info.direct)) return false;
					if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;
					if (event.targets.length && event.targets.includes(player)) return true;
					return false;
				},
				content: function () {
					"step 0"
					player.chooseTarget(`〖论道〗：请选择为技能${trigger.skill}重新指定一个目标`, 1, true).set('ai', function (card, player, target) {
						return game.players.randomGet();
					});
					"step 1"
					if (result.bool) {
						trigger.targets.remove(player);
						trigger.targets.push(result.targets[0]);
					}
				},
			},
		},
		ai: {
			order: 8,
			result: {
				player: function (player, target) {
					var att = get.attitude(player, target);
					if (att > 0) return;
					var hs = player.getCards('h');
					var list = []
					for (var i of hs) {
						if (get.number(i) > 10) list.push(i);
					}
					if (list.length > Math.floor(hs.length / 2)) return 1;
					return -1.5;
				},
			},
		},
	},
	"xjzh_sanguo_shiyong": {
		trigger: {
			player: "damageBegin3",
		},
		forced: true,
		locked: true,
		priority: 2,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			let info = get.info(event.cards[0]);
			if (!event.source) return false;
			if (info && info.allowMultiple != undefined && info.allowMultiple == false) return false;
			if (info.multitarget) return false;
			return !event.numFixed;
		},
		async content(event, trigger, player) {
			trigger.changeToZero();
			player.loseMaxHp();
			trigger.source.draw(2);
			if (get.color(trigger.card) == "red" && trigger.source.isDamaged()) trigger.source.recover();
		},
		ai: {
			expose: 0.3,
			threaten: 3,
			effect: {
				target(card, player, target) {
					let info = get.info(card);
					if (info.multitarget || info.allowMultiple == false) {
						if (get.color(card) == "red") return [1, -2];
						return [2, -1];
					}
				}
			}
		},
	},
	"xjzh_sanguo_yaowu": {
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let target = event.targets[0], cards = [...target.getCards("h", (card) => get.is.damageCard(card))];
			player.loseMaxHp();
			target.gainMaxHp();
			target.showHandcards();
			while (true) {
				if (!cards.length) break;
				const result = await player.chooseCardButton(cards, 1)
					.set('filterButton', button => {
						if (!get.is.damageCard(button.link)) return false;
						return player.hasUseTarget(button.link);
					})
					.set('prompt', `〖耀武〗：请选择${get.translation(target)}的[伤害]手牌使用之`)
					.set('ai', button => {
						if (player.hasUseTarget(button.link)) return player.getUseValue(button.link);
						return 0;
					})
					.forResult();
				if (result?.links) {
					if (player.hasUseTarget(result.links[0])) {
						let bool = await player.chooseUseTarget(result.links[0], true, "nodistance").set("addCount", false);
						if (bool) cards.removeArray(result.links);
					}
				}
				else break;
			}
		},
		ai: {
			expose: 0.5,
			threaten: 2,
			result: {
				target: 1,
				player: (player, target, card) => target.countCards("h", (card) => get.is.damageCard(card)),
			},
		},
	},
	"xjzh_sanguo_yangwei": {
		trigger: {
			player: "loseMaxHpAfter",
		},
		forced: true,
		locked: true,
		limited: true,
		priority: 10,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: (event, player) => player.maxHp <= 2,
		async content(event, trigger, player) {
			player.awakenSkill("xjzh_sanguo_yangwei");
			let targets = game.filterPlayer(current => current != player);
			for (let target of targets) {
				target.loseMaxHp();
			}
			player.gainMaxHp(targets.length);
			player.hp = player.maxHp;
			player.update();
		},
	},
	"xjzh_sanguo_zhawang": {
		trigger: {
			player: "dieAfter",
		},
		forced: true,
		locked: true,
		forceDie: true,
		priority: Infinity,
		mode: ["identity"],
		limited: true,
		skillAnimation: true,
		animationColor: 'fire',
		animationStr: "诈亡兴吴",
		audio: "ext:仙家之魂/audio/skill:1",
		async content(event, trigger, player) {
			player.awakenSkill("xjzh_sanguo_zhawang");
			game.addGlobalSkill("xjzh_sanguo_zhawang_revive");
		},
		subSkill: {
			"revive": {
				trigger: {
					global: "dieBegin",
				},
				direct: true,
				priority: Infinity,
				sub: true,
				audio: "xjzh_sanguo_zhawang",
				filter(event, player) {
					let zhu = get.zhu(player);
					let target = game.findPlayer2(current => get.is.playerNames(current, 'xjzh_sanguo_espsunce'));
					if (!target) return false;
					let id = target.identity;
					let count = game.countPlayer(current => current.identity == "fan");
					if (id == "fan") {
						if (event.player.identity == "fan") {
							if (count == 1) return true;
						}
						if (event.player == zhu || event.player.identity == "nei") {
							if (count == 0) return true;
						}
					}
					if (id == "nei") {
						if (event.player.identity == "fan") {
							if (count == 1) return true;
						}
						if (event.player == zhu) return true;
					}
					if (id == "zhong") {
						return event.player == zhu;
					}
					return false;
				},
				async content(event, trigger, player) {
					game.xjzh_playAudio('xjzh_sanguo_zhawang2');
					let target = game.findPlayer2(current => get.is.playerNames(current, 'xjzh_sanguo_espsunce')), targets;
					if (game.dead.includes(target)) targets = target;
					else return;

					trigger.cancel(null, null, 'notrigger');;
					trigger.player.recoverTo(1);

					targets.revive(3);
					targets.insertPhase();
					game.removeGlobalSkill("xjzh_sanguo_zhawang_revive");


					let evt = _status.event.getParent("phase");
					if (evt) {
						_status.event = evt;
						_status.event.finish();
					}
					_status.paused = false;
				},
			},
		},
	},
	"xjzh_sanguo_xingwu": {
		trigger: {
			player: ["logSkill", 'useSkill']
		},
		forced: true,
		locked: true,
		priority: 10,
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let skill = get.sourceSkillFor(event), info = get.info(skill);
			if (!get.skillInfoTranslation(skill)) return false;
			if (lib.skill.global.includes(skill)) return false;
			return event.skill != "xjzh_sanguo_xingwu";
		},
		async content(event, trigger, player) {
			let skills = [], gainSkills = [], sourceSkill = get.sourceSkillFor(trigger);

			let additionalSkills = player.additionalSkills;
			if (additionalSkills.hasOwnProperty(event.name)) {
				let keepSkills = additionalSkills[event.name][0];
				if (keepSkills != sourceSkill) return;
			}

			let list = game.xjzh_wujiangpai().filter(evt => lib.character[evt][1] == "wu");

			for await (let name of list) {
				if (!lib.character[name]?.skills?.length) continue;
				skills.addArray((lib.character[name].skills).filter(skill => {
					let info = get.info(skill);
					return info && !info.charlotte && !info.dutySkill && !info.juexingji && !info.limited && !info.unique && !info.sub && get.skillInfoTranslation(skill)?.length;
				}));
			}

			let bool = false;
			if (get.is.locked(sourceSkill)) bool = true;

			for await (let skill of skills) {
				if (player.skills.includes(skill)) continue;
				if (bool == false) {
					if (get.is.locked(skill)) gainSkills.push(skill);
				} else {
					if (!get.is.locked(skill)) gainSkills.push(skill);
				}
			}
			if (!gainSkills.length) {
				player.say("没有符合条件的技能");
				return;
			}

			let link = gainSkills.randomGet();

			player.addAdditionalSkills(event.name, link);
			player.popup(link);
		},
	},
	"xjzh_sanguo_jiang": {
		trigger: {
			player: ['damageAfter', 'useCardAfter'],
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let name = event.name;
			if (name == 'damage') {
				if (event.numFixed || !event.source) return false;
				if (!event.source.countCards('he')) return false;
				if (event.getParent(4).name == "xjzh_sanguo_jiang") return false;
				return true;
			}
			if (name == 'useCard') {
				if (!event.cards || !event.cards.length) return false;
				if (!get.is.damageCard(event.cards[0])) return false;
				if (event.getParent(3).name == "xjzh_sanguo_jiang") return false;
				if (!event.targets?.length || event.targets.length != 1) return false;
				if (!event.targets[0].countCards('he')) return false;
				return true;
			}
			return false;
		},
		frequent: true,
		check(event, player) {
			let name = event.name, att, friends = player.getFriends(), enemies = player.getEnemies();
			if (name == 'damage') {
				att = get.attitude(player, event.source);
				if (att > 0) return event.source.countCards('he') > event.source.maxHp;
				return false;
			}
			return true;
		},
		async content(event, trigger, player) {
			let target, name = trigger.name;
			if (name == 'damage') target = trigger.source;
			else target = trigger.targets[0];
			const result = await target.chooseToDiscard(1, 'he', true).forResult();
			if (result?.bool) {
				let inpile = lib.inpile.slice(0).filter(card => {
					let ai = lib.card[card].ai
					if (!ai || !ai.tag || !ai.tag.damage) return false;
					return target.hasUseTarget({ name: card });
				});
				let text = `〖激昂〗：请选择一张牌令${get.translation(target)}使用之`;
				const result2 = await player.chooseVCardButton(true, inpile)
					.set('ai', button => {
						let friends = player.getFriends(true);
						let enemies = player.getEnemies();
						if (friends > enemies) return !get.tag(button.link, 'multitarget');
						return get.tag(button.link, 'multitarget');
					})
					.set('prompt', text)
					.forResult();
				if (result2?.links) {
					let cards = game.createCard(result2.links[0][2]);
					if (!get.tag(cards, 'multitarget')) {
						const result3 = await player.chooseTarget(1, true)
							.set('prompt', `〖激昂〗：请选择${get.translation(cards)}的目标`)
							.set('ai', target => -get.attitude(player, target))
							.forResult();
						if (result3?.targets) {
							let info = get.info(cards);
							target.useCard(cards, result3.targets[0], false);
						}
					} else target.chooseUseTarget(cards, true).set('addCount', false).set('viewAs', true);
				}
			}
		},
		ai: {
			expose: 0.5,
			threaten: 2,
			maixie_defend: true,
			skillTagFilter(player, tag, arg) {
				if (tag == 'maixie_defend') {
					if (player == arg) {
						if (player.getHp(true) <= 2) return false;
					}
				};
				return true;
			},
		},
	},
	"xjzh_sanguo_hunzi": {
		trigger: {
			source: "damageBegin1",
			player: "damageEnd",
		},
		charlotte: true,
		locked: true,
		forced: true,
		priority: 2,
		audio: "ext:仙家之魂/audio/skill:2",
		mod: {
			suit(card, suit) {
				return 'none';
			},
		},
		filter(event, player) {
			return event.source && !event.numFixed;
		},
		async content(event, trigger, player) {
			if (trigger.source == player) {
				if (game.hasNature(trigger)) game.setNature(trigger, null, false);
			}
			player.draw();
		},
	},

};

export default skills;