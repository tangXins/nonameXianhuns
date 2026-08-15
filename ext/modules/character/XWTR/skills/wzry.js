import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const wzrySkills = {

	//王者荣耀
	"xjzh_wzry_kongou": {
		trigger: {
			source: "damageAfter",
			player: "useCardToPlayered",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			let name = event.name;
			if (!get.is.playerNames(player, "xjzh_wzry_yuange")) return false;
			if (!player.isUnderControl(true)) return false;
			if (name == "damage") return event.player != player;
			return true;
		},
		forced: true,
		locked: true,
		priority: 5,
		lastDo: true,
		charlotte: true,
		superCharlotte: true,
		persevereSkill: true,
		mark: true,
		marktext: "偶",
		intro: {
			name: "碎片背包",
			mark(dialog, storage, player) {
				let config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				if (!config || config.size == 0) return "没有可用的武将碎片！";
				if (player.isUnderControl(true)) {
					for (let [key, value] of config) {
						dialog.addSmall([[key], 'character'], false);
						dialog.addText(`${get.translation(key)}：${value}`);
					}
				} else {
					dialog.addText('共有' + get.cnNumber(config.size) + '张武将牌');
				}
			},
			markcount(storage, player) {
				let config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				if (!config) return "";
				return config.size;
			},
		},
		init(player, skill) {
			let config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
			if (!config || !(config instanceof Map)) {
				let config = new Map();
				game.saveExtensionConfig("仙家之魂", "xjzh_wzry_kongou", config);
			};
		},
		async content(event, trigger, player) {
			let targets = trigger.targets || trigger.player, config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou"), name, kongOuList = [];

			let num = trigger.name == 'damage' ? 2 : 1;
			if (config && (config instanceof Map) && config.size != 0) {
				for (let [key, value] of config) {
					if (value >= 50) kongOuList.push(key);
				}

				if (kongOuList.length >= 10) num += Math.floor(kongOuList.length / 10);
			}

			if (Array.isArray(targets)) {
				for await (let target of targets) {
					if (target == player) continue;
					name = get.nameList(target);
					name.forEach(item => {
						let currentValue = config.get(item) || 0;
						config.set(item, currentValue + 5);
					});
				}
			} else {
				name = get.nameList(targets);
				name.forEach(item => {
					let currentValue = config.get(item) || 0;
					config.set(item, currentValue + 5);
				});
			}
			player.updateMark("xjzh_wzry_kongou", true);
			game.saveExtensionConfig("仙家之魂", "xjzh_wzry_kongou", config);

		},
	},

	"xjzh_wzry_miying": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:2",
		mark: true,
		marktext: "影",
		intro: {
			name: "秘影",
			mark(dialog, storage, player) {
				let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				if (!config || config.size == 0) return "没有可用的武将碎片！";
				for (let [key, value] of config) {
					if (value >= 50) list.push(key);
				}
				if (player.isUnderControl(true)) {
					dialog.addSmall([list, 'character'], false);
				} else {
					dialog.addText('共有' + get.cnNumber(list.length) + '张武将牌');
				}
			},
			markcount(storage, player) {
				let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				if (!config) return "";
				for (let [key, value] of config) {
					if (value >= 50) list.push(key);
				}
				return list.length;
			},
		},
		filter(event, player) {
			let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
			if (!config) return false;
			for (let [key, value] of config) {
				if (value >= 50) list.push(key);
			}
			return list.length > 0;
		},
		async content(event, trigger, player) {
			let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
			for (let [key, value] of config) {
				if (value >= 50) list.push(key);
			}
			const result = await player.chooseButton(true)
				.set('createDialog', ['〖秘影〗：请选择一张武将牌', [list, 'character']])
				.set("ai", button => {
					return get.rank(button.link, true);
				})
				.forResult();
			if (result?.links) {
				let links = result.links;
				let data = {
					maxHp: player.maxHp,
					hp: player.hp,
					names: get.nameList(player).find(item => item.includes("xjzh_wzry_yuange")),
					names2: links[0],
				}
				player.storage.xjzh_wzry_miying2 = data;

				player.reinit(get.nameList(player).find(item => item.includes("xjzh_wzry_yuange")), links[0], [player.hp, player.maxHp]);

				player.recoverTo(player.maxHp);
				player.drawTo(player.maxHp);
				game.xjzh_clearRestraint(player);
				player.addSkill('xjzh_wzry_miying2');
				player.addSkill('xjzh_wzry_zhiyuan');
				player.updateMark("xjzh_wzry_kongou", true);

				let currentValue = config.get(links[0]) || 0;
				config.set(links[0], currentValue - 50);
				if (config.get(links[0]) <= 0) config.delete(links[0]);

				game.saveExtensionConfig("仙家之魂", "xjzh_wzry_kongou", config);
			}
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
					if (!config || config.size == 0) return 0;
					let num = 0;
					let targets = game.filterPlayer(target => target != player);
					if (targets.length > 0) targets.forEach(target => {
						let names = get.nameList(target);
						if (names.some(item => config.has(item) && config.get(item) >= 50)) num++;
					});
					if (get.xjzh_deEffect(player)) num += get.xjzh_deEffect2(player);
					return num - player.getHp(true);
				},
			},
		},
	},
	"xjzh_wzry_miying2": {
		trigger: {
			player: "dieBegin",
		},
		forced: true,
		locked: true,
		priority: 5,
		lastDo: true,
		charlotte: true,
		sub: true,
		superCharlotte: true,
		persevereSkill: true,
		mark: true,
		marktext: "影",
		intro: {
			name: "秘影",
			mark(dialog, content, player) {
				if (player.isUnderControl(true)) {
					if (_status.gameStarted) dialog.add(ui.create.div('.menubutton.pointerdiv', '点击切换为本体', async function () {
						if (!this.disabled) {
							this.disabled = true;
							this.classList.add("disabled");
							this.style.opacity = 0.5;
							await lib.skill.xjzh_wzry_miying2.unCharacter(player);
						}
					}));
				}
			},
		},
		async unCharacter(player) {
			let storage = player.storage.xjzh_wzry_miying2;
			await player.reinit(storage.names2, storage.names, [storage.hp, storage.maxHp]);
			player.recover();
			player.directgain(get.cards(2));
			player.$draw();
			player.removeSkill("xjzh_wzry_miying2", true);
			delete player.storage.xjzh_wzry_miying2;
			game.xjzh_clearRestraint(player);
			if (_status.imchoosing) {
				delete _status.event._buttonChoice;
				delete _status.event._cardChoice;
				delete _status.event._targetChoice;
				game.check();
			}
			player.update();
		},
		async content(event, trigger, player) {
			trigger.cancel(null, null, 'notrigger');
			await lib.skill.xjzh_wzry_miying2.unCharacter(player);
		},
	},
	"xjzh_wzry_zhiyuan": {
		enable: "phaseUse",
		usable: 1,
		mod: {
			ignoredHandcard(card, player) {
				if (card.hasGaintag('xjzh_wzry_zhiyuan')) return true;
			},
			globalFrom(from, to, distance) {
				if (get.is.playerNames(from, "xjzh_wzry_yuange")) return distance - 1;
			},
			cardUsable(card, player, num) {
				if (get.name(card, player) == "sha" && !get.is.playerNames(player, "xjzh_wzry_yuange")) return num + 1;
			}
		},
		locked: false,
		filterTarget(card, player, target) {
			let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
			for (let [key, value] of config) {
				if (value >= 50) list.push(key);
			}
			let names = get.nameList(target);
			return names.some(item => config.has(item) && config.get(item) >= 50);
		},
		filter(event, player) {
			let list = [], config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
			if (!config || config.size == 0) return false;
			let targets = game.filterPlayer(target => target != player);
			if (targets.length > 0) if (targets.some(target => {
				let names = get.nameList(target);
				if (names.some(item => config.has(item) && config.get(item) >= 50)) return true;
			})) return true;
			return false;
		},
		async content(event, trigger, player) {
			let target = event.targets[0], listEquip = ['equip1', 'equip2', 'equip3', 'equip4', 'equip5',];
			while (listEquip.length) {
				let pos = listEquip.shift();
				if (player.hasEmptySlot(pos) && !target.hasEmptySlot(pos)) {
					let equip = game.createCard(target.getCards("e", card => get.subtype(card) == pos)[0]);
					if (equip) {
						player.equip(equip);
						player.$gain2(equip, false);
					};
				};
			}
			let cards = target.getCards("h").map(item => game.createCard(item));
			player.directgain(cards, true, 'xjzh_wzry_zhiyuan');
		},
	},
	"xjzh_wzry_huange": {
		trigger: {
			player: "phaseBefore",
		},
		frequent: true,
		mark: true,
		marktext: "歌",
		intro: {
			content(storage, player) {
				if (!storage) return;
				return `你的契约队友${get.translation(storage)}`;
			},
		},
		audio: "ext:仙家之魂/audio/skill:6",
		mod: {
			maxHandcard(player, num) {
				if (player.storage.xjzh_wzry_huange) return num + 2;
				return num;
			},
		},
		global: "xjzh_wzry_huange_mod",
		group: "xjzh_wzry_huange_use",
		check: () => 1,
		prompt: "〖欢歌〗：选择一名角色成为你的契约队友",
		async content(event, trigger, player) {
			const result = await player.chooseTarget(lib.filter.notMe)
				.set("prompt", "〖欢歌〗：请选择一名角色成为你的契约队友")
				.set('ai', target => get.attitude(player, target))
				.forResult();
			if (result?.targets) {
				player.storage.xjzh_wzry_huange = result.targets[0];
			}
		},
		subSkill: {
			"use": {
				trigger: {
					global: ["loseAfter", "gainAfter"],
				},
				forced: true,
				sub: true,
				priority: 1,
				audio: "xjzh_wzry_huange",
				filter(event, player) {
					if (!player.storage.xjzh_wzry_huange) return false;
					let target = player.storage.xjzh_wzry_huange;
					let hs = player.countCards("h");
					let hs2 = target.countCards("h");
					if (hs2 < hs) return true;
					return false;
				},
				async content(event, trigger, player) {
					let target = player.storage.xjzh_wzry_huange;
					target.drawTo(player.countCards("h"));
				},
			},
			"mod": {
				locked: true,
				charlotte: true,
				superCharlotte: true,
				mod: {
					maxHandcard(player, num) {
						let target = game.findPlayer(current => {
							return get.is.playerNames(current, "xjzh_wzry_duoliya") && current.storage.xjzh_wzry_huange && current.storage.xjzh_wzry_huange == player;
						});
						if (!target) return num;
						if (num >= target.getHandcardLimit()) return num;
						return target.getHandcardLimit();
					},
				},
			},
		},
	},
	"xjzh_wzry_zhulang": {
		trigger: {
			player: "drawAfter",
		},
		forced: true,
		locked: true,
		priority: 3,
		audio: "ext:仙家之魂/audio/skill:5",
		filter(event, player) {
			if (event.getParent("xjzh_wzry_zhulang").name == "xjzh_wzry_zhulang") return false;
			return player.storage.xjzh_wzry_huange && !event.numFixed;
		},
		async content(event, trigger, player) {
			const cards = await player.draw(trigger.num).forResult();
			if (player.storage.xjzh_wzry_huange) {
				const result = await player.chooseCardButton(cards, [Math.ceil(trigger.num / 2), trigger.num], true)
					.set('prompt', `【逐浪】：选择至多${trigger.num}张牌交给${get.translation(player.storage.xjzh_wzry_huange)}`)
					.set('ai', button => {
						return 8 - get.value(button.link);
					}).forResult();
				if (result?.links) {
					let target = player.storage.xjzh_wzry_huange;
					target.gain(result.links, player, 'draw');
					player.recover();
					target.recover();
				}
			}
		},
	},
	"xjzh_wzry_tiannai": {
		enable: "phaseUse",
		limited: true,
		skillAnimation: true,
		animationColor: "water",
		animationStr: "人鱼之歌",
		init(player) {
			game.xjzh_playAudio('xjzh_wzry_tiannaiaudio');
			player.storage.xjzh_wzry_tiannai = false;
		},
		audio: "ext:仙家之魂/audio/skill:4",
		filter(event, player) {
			if (!player.storage.xjzh_wzry_huange) return false;
			return !player.storage.xjzh_wzry_tiannai;
		},
		async content(event, trigger, player) {
			await player.awakenSkill('xjzh_wzry_tiannai');

			let target = player.storage.xjzh_wzry_huange;
			game.xjzh_clearRestraint(target);
			player.refreshSkill();
			target.addSkill("xjzh_zengyi_poxiao");
			target.storage.xjzh_wzry_tiannaiaudio = true;

			player.loseMaxHp();
		},
	},
	"xjzh_wzry_xiaxing": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		locked: true,
		charlotte: true,
		audio: "ext:仙家之魂/audio/skill:2",
		superCharlotte: true,
		fixed: true,
		popup: false,
		marktext2: "剑",
		marktext: `<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_xiaxing.png>`,
		intro: {
			content: "当前已有#道剑气",
		},
		mod: {
			selectTarget(card, player, range) {
				let type = get.type(card), num = player.countMark("xjzh_wzry_xiaxing");
				if (range[1] == -1) return;
				if (["equip", "delay"].includes(type)) return;
				if (game.players.length < 3) return;
				range[1] += Math.min(num, game.players.length - 1);
			},
		},
		async content(event, trigger, player) {
			await player.addMark(event.name, 1, false);
			game.log(player, "获得了一道剑气");
			if (player.countMark(event.name) >= 4) {
				player.enableSkill('xjzh_wzry_jiange');
				player.$fullscreenpop('青莲剑歌', 'water');
				player.disableSkill(event.name, event.name);
				player.clearMark(event.name, false);
				player.draw(4);

				let evt = event.getParent("phase");
				if (evt && evt.getParent) {
					let next = game.createEvent(event.name, false, evt.getParent());
					next.player = player;
					next.skill = 'xjzh_wzry_jiange';
					next.setContent(() => {
						player.enableSkill('xjzh_wzry_xiaxing');
						player.disableSkill(next.skill, next.skill);
					});
				}
			}

		},
	},
	"xjzh_wzry_jinjiu": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:6",
		filter(event, player) {
			return game.hasPlayer(current => player.inRange(current)) && !player.hasSkill("xjzh_wzry_jinjiu_off");
		},
		mod: {
			cardUsable(card, player, num) {
				if (!player.storage.xjzh_wzry_jinjiu) return num;
				let target = player.storage.xjzh_wzry_jinjiu, num2 = Math.abs(player.getSeatNum() - target.getSeatNum());
				if (["sha", "jiu"].includes(get.name(card, player))) return num + num2;
			},
		},
		filterTarget(card, player, target) {
			if (target == player) return false;
			return player.inRange(target);
		},
		async content(event, trigger, player) {
			let target = event.targets[0];
			player.storage[event.name] = target;

			game.broadcastAll((player, target) => {
				game.swapSeat(player, target);
			}, player, target);

			player.popup(target);
			if (!player.hasSkill("jiu")) {
				player.useCard({ name: 'jiu', isCard: true }, player, false);
				game.xjzh_playAudio(['xjzh_wzry_jinjiu1', 'xjzh_wzry_jinjiu2'].randomGet());
			}
			let num = Math.abs(player.getSeatNum() - target.getSeatNum());
			await player.draw(num);
			await player.addTempSkill("xjzh_wzry_jinjiu_off");

			let evt = event.getParent("phase");
			if (evt && evt.getParent) {
				let next = game.createEvent('xjzh_wzry_jinjiu_delete', false, evt.getParent());
				next.player = player;
				next.target = target;
				next.num = num;
				next.setContent(() => {
					game.broadcastAll((player, target) => {
						game.swapSeat(player, target);
					}, player, target);
					player.popup(target);
					if (!player.hasSkill("jiu")) {
						player.useCard({ name: 'jiu', isCard: true }, player, false);
						game.xjzh_playAudio(['xjzh_wzry_jinjiu1', 'xjzh_wzry_jinjiu2'].randomGet());
					}
					player.draw(num);
					delete player.storage.xjzh_wzry_jinjiu;
				});
			}
		},
		subSkill: { "off": { sub: true, }, },
	},
	"xjzh_wzry_jiange": {
		enable: "phaseUse",
		usable: 5,
		locked: true,
		charlotte: true,
		superCharlotte: true,
		fixed: true,
		audio: "ext:仙家之魂/audio/skill:6",
		filter(event, player) {
			if (!player.countCards('hs')) return false;
			return true;
		},
		init(player, skill) {
			player.disableSkill(skill, skill);
		},
		mod: {
			selectTarget(card, player, range) {
				let type = get.type(card);
				if (range[1] == -1) return;
				if (["equip", "delay"].includes(type)) return;
				if (game.players.length < 3) return;
				range[1] += game.players.length - 1;
			},
		},
		async content(event, trigger, player) {
			let cards = player.getCards('h'), typeList = cards.map(item => get.type(item)).toUniqued();
			const result = await player.chooseControl(typeList, "cancel2")
				.set('ai', () => {
					return typeList.randomGet();
				})
				.set('createDialog', ["〖剑歌〗：请选择一种类型的牌弃置之", "hidden", [cards, 'vcard']])
				.forResult();
			if (result?.control == "cancel2") return;
			let results = cards.filter(item => get.type(item) == result.control);
			await player.discard(results);
			let evt = await player.draw(results.length);
			let evtCards = evt.result;
			while (evtCards.length > 1) {
				let [firstCard, ...restCards] = evtCards;
				let firstNumber = get.number(firstCard), firstSuit = get.suit(firstCard), firstType = get.type(firstCard);

				let allMatch = restCards.every(card =>
					get.number(card) == firstNumber ||
					get.suit(card) == firstSuit ||
					get.type(card) == firstType
				);

				if (!allMatch) break;
				let evt2 = await player.draw(evtCards.length);
				evtCards = evt2.result;
			}
		},
		ai: {
			order(item, player) {
				let cards = player.getCards("h", card => player.getUseValue(card) <= 0);
				cards.sort((a, b) => get.order(b) - get.order(a));
				return get.order(cards[0]) - 0.001;
			},
		}
	},
	"xjzh_wzry_xingchen": {
		trigger: {
			player: "$logSkill",
		},
		filter(event, player) {
			let info = get.info(event.skill);
			if (!lib.translate[event.skill]) return false;
			if (!lib.translate[event.skill + '_info']) return false;
			if (lib.skill.global.includes(event.skill)) return false;
			if (info && (info.limited || info.juexingji || info.dutySkill || info.equipSkill || info.sub || info.unique)) return false;
			if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;
			return true;
		},
		mark: true,
		marktext: "星",
		intro: {
			name: "星辰之力",
			content: "mark",
		},
		locked: true,
		forced: true,
		unique: true,
		audio: "ext:仙家之魂/audio/skill:3",
		init(player, skill) {
			game.xjzh_playAudio('xjzh_wzry_yaoStart');
		},
		group: ["xjzh_wzry_xingchen_damage"],
		async content(event, trigger, player) {
			player.addMark("xjzh_wzry_xingchen", 1, false);
			game.log(player, "因", "#g〖" + get.translation(trigger.skill) + "〗", "获得了一个星辰之力");
			if (player.countMark("xjzh_wzry_xingchen") >= 3) {
				player.clearMark("xjzh_wzry_xingchen");
				player.drawTo(4);
				player.chooseUseTarget({ name: "wanjian" }).set("prompt", `〖裂空〗：是否视为对${get.translation(game.filterPlayer(target => target != player))}使用一张【万箭齐发】？`);
			}
		},
		subSkill: {
			"off": { sub: true, },
			"damage": {
				trigger: {
					player: "damageBegin",
				},
				forced: true,
				sub: true,
				audio: "xjzh_wzry_xingchen",
				filter(event, player) {
					return !player.hasSkill("xjzh_wzry_xingchen_off");
				},
				async content(event, trigger, player) {
					event._args = [trigger.num, trigger.nature, trigger.cards, trigger.card];
					if (trigger.source) event._args.push(trigger.source);
					else event._args.push("nosource");
					window.xjzh_wzry_xingchen = setTimeout(function () {
						player.addTempSkill("xjzh_wzry_xingchen_off", "damageAfter");
						game.xjzh_playAudio('xjzh_wzry_xingchenDamage');
						player.damage.apply(player, event._args.slice(0));
					}, 15000);
					game.log(player, "受到", trigger.source ? "来自于" + get.translation(trigger.source) + "的" : "", trigger.num, "点伤害转为星削将于15s后结算");
					trigger.changeToZero();
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.is.damageCard(card)) return 0.7;
						},
					},
				},
			},
		},
	},
	"xjzh_wzry_liekong": {
		enable: "phaseUse",
		usable: 1,
		filterCard(card, player, target) {
			var suit = get.suit(card);
			for (var i = 0; i < ui.selected.cards.length; i++) {
				if (get.suit(ui.selected.cards[i]) == suit) return false;
			}
			return true;
		},
		selectCard: [1, 4],
		position: 'he',
		complexCard: true,
		filterTarget: lib.filter.notMe,
		filter(event, player) {
			if (player.countCards("he")) return true;
			return false;
		},
		check: (card) => 6 - get.value(card),
		prompt(event, player) {
			return lib.translate.xjzh_wzry_liekong_info;
		},
		audio: "ext:仙家之魂/audio/skill:3",
		async content(event, trigger, player) {
			const result = await event.targets[0].chooseToDiscard("h", [1, event.cards.length], card => {
				let suits = new Array();
				event.cards.slice(0).forEach(card => {
					suits.push(get.suit(card));
				});
				return suits.includes(get.suit(card));
			})
				.set("prompt", `〖裂空〗：请选择弃置至多${event.cards.length}张牌，每少弃置一张，视为${get.translation(player)}对你使用一张杀`)
				.set('ai', card => 6 - get.value(card))
				.forResult();
			let num = result.bool ? event.cards.length - result.cards.length : event.cards.length;
			while (num > 0 && event.targets[0].isAlive()) {
				game.delay();
				game.xjzh_playAudio(['xjzh_wzry_liekong1', 'xjzh_wzry_liekong2', 'xjzh_wzry_liekong3'].randomGet());
				player.useCard({ name: 'sha' }, event.targets[0], false).set('addCount', false);
				num -= 1;
			}
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					if (!player) return;
					let num = 0
					for (var i = 0; i < game.players.length; i++) {
						if (game.players[i].isOut()) continue;
						if (game.players[i] == player) continue;
						if (get.attitude(game.players[i], player) < 0) num++
					}
					return num;
				},
				target: -1,
			},
		},
	},
	//《金庸群侠传·项少龙·穿越》
	"xjzh_wzry_guichen": {
		enable: "phaseUse",
		trigger: {
			player: ["dying", "phaseUseBefore"],
		},
		forced: true,
		locked: true,
		priority: 10,
		audio: "ext:仙家之魂/audio/skill:3",
		getinfo(player) {
			let js, js2;
			if (!player.isDisabledJudge()) {
				js = player.getCards("j"), js2 = [];
				for (let card of js) {
					let name = card.viewAs || get.name(card, player)
					js2.push(name);
				}
			}

			let hasDisabledSlot = [];
			for (let j = 1; j < 7; j++) {
				hasDisabledSlot.push(player.hasDisabledSlot(j));
			}

			let storage = {
				hs: player.getCards("h"),
				es: player.getCards("e"),
				hasDisabledSlot: hasDisabledSlot,
				hp: player.hp,
				maxHp: player.maxHp,
				disableJudge: player.isDisabledJudge(),
				isTurnedOver: player.isTurnedOver(),
				isLinked: player.isLinked(),
				js: js || [],
				js2: js2 || [],
			};
			return storage;
		},
		init(player, skill) {
			if (!player.storage[skill] || !Array.isArray(player.storage[skill])) player.storage[skill] = [];
		},
		filter(event, player) {
			if (event.getParent(2).name == "dying" && event.player == player) return true;
			if (player.storage?.xjzh_wzry_guichen?.length) return true;
			if (event.name == "phaseUse") return true;
			return false;
		},
		async content(event, trigger, player) {
			let name = event.triggername;
			if (name == "phaseUseBefore") {
				let storage = player.storage[event.name];
				storage.push(lib.skill[event.name].getinfo(player));
				player.storage[event.name] = storage;
			} else {
				let storage = player.storage?.xjzh_wzry_guichen;
				if (!storage?.length) return;
				let doing = storage.shift();

				let [hp, maxhp] = [doing.hp, doing.maxHp];
				player.maxHp = maxhp;
				player.hp = hp;

				let hs = player.getCards('he');
				if (hs.length) player.loseToDiscardpile(hs)._triggered = null;

				hs = doing.hs;
				let hs2 = [];
				for (let card of hs) {
					let cards = get.cardPile(get.name(card, player), true);
					hs2.push(cards);
				}
				if (hs2?.length) player.directgain(hs2);

				let hasDisabledSlot = doing.hasDisabledSlot;
				for (let i = 0; i < hasDisabledSlot.length; i++) {
					if (hasDisabledSlot[i] == false && player.hasDisabledSlot(i + 1)) player.enableEquip(i + 1)._triggered = null;
					if (hasDisabledSlot[i] == true && !player.hasDisabledSlot(i + 1)) player.disableEquip(i + 1)._triggered = null;
				}

				let es = doing.es, es2 = [];
				for (let card of es) {
					let cards = get.cardPile(get.name(card, player), true);
					es2.push(cards);
				}
				if (es2?.length) {
					es2.forEach(card => {
						player.equip(card, true)._triggered = null;
					});
				}

				let disableJudge = doing.disableJudge;
				if (player.isDisabledJudge() && !disableJudge) player.enableJudge()._triggered = null;
				if (!player.isDisabledJudge() && disableJudge) player.disableJudge()._triggered = null;

				let isLinked = doing.isLinked;
				if (isLinked != player.isLinked()) player.link()._triggered = null;

				let isTurnedOver = doing.isTurnedOver;
				if (isTurnedOver != player.isTurnedOver()) player.turnOver()._triggered = null;

				let js = doing.js2;
				if (js?.length) {
					for (let card of js) {
						if (player.canAddJudge(card)) player.addJudge(card)._triggered = null;
					}
				}

				player.xjzh_restoreSkill(["xjzh_wzry_liekong", "jiu", "sha"]);

				game.updateRoundNumber();

				if (window.xjzh_wzry_xingchen) clearTimeout(window.xjzh_wzry_xingchen);

				if (name == "dying") lib.skill[event.name].trigger.player.remove("dying");
			}
		},
		ai: {
			order: 2,
			result: {
				player(player, target, card) {
					if (!player.storage?.xjzh_wzry_guichen?.length) return;
					let storage = player.storage.xjzh_wzry_guichen;
					let doing = player.storage.xjzh_wzry_guichen[storage.length - 1].hs.filter(card => ["sha", "jiu"].includes(get.name(card, player)));
					let num = doing.length;
					let cards = player.getCards('h');
					for (let i of cards) {
						if (!player.hasUseTarget(i)) num++;
					}
					return num - cards.length;
				},
			},
		},
	},
	"xjzh_wzry_jianzhong": {
		trigger: {
			source: ["damageAfter", "damageBegin1"],
		},
		forced: true,
		locked: true,
		priority: 6,
		marktext2: "剑",
		marktext: `<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_jianzhong.png>`,
		intro: {
			mark(dialog, content, player) {
				let cards = player.getExpansions('xjzh_wzry_jianzhong');
				if (!cards.length) return;
				let str = `增伤：${cards.map(card => get.type(card, "trick", player)).toUniqued().length}`;
				dialog.add(str)
				dialog.add(cards)
			},
			markcount: "expansion",
		},
		audio: "ext:仙家之魂/audio/skill:2",
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = 10;
		},
		filter(event, player, name) {
			if (name == "damageBegin1") return !event.numFixed;
			return player.getExpansions('xjzh_wzry_jianzhong').length < player.storage.xjzh_wzry_jianzhong;
		},
		async content(event, trigger, player) {
			if (event.triggername == "damageBegin1") {
				let cards = player.getExpansions("xjzh_wzry_jianzhong");
				let suits = cards.map(card => get.type(card, "trick", player)).toUniqued();
				trigger.num += suits.length;
			} else player.addToExpansion(get.cards(), 'gain2').gaintag.add('xjzh_wzry_jianzhong');
		},
		ai: {
			damageBonus: true,
			skillTagFilter(player, tag, arg) {
				if (tag == "damageBonus") return player.getExpansions("xjzh_wzry_jianzhong").map(card => get.type(card, "trick", player)).toUniqued().length > 0;
			},
		},
	},
	"xjzh_wzry_cuijian": {
		trigger: {
			player: "useCard",
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:4",
		filter(event, player) {
			if (!["basic", "trick"].includes(get.type(event.card))) return false;
			if (player.getEquips(1).length) return get.type(event.card) == "basic";
			if (get.name(event.card, player) == "tiesuo") return false;
			return get.type(event.card) == "trick"
		},
		async content(event, trigger, player) {
			trigger.effectCount++;
			game.log(trigger.card, "额外结算1次");
		},
	},
	"xjzh_wzry_jianlai": {
		trigger: {
			player: "addToExpansionAfter",
		},
		audio: "ext:仙家之魂/audio/skill:4",
		filter(event, player) {
			return player.getExpansions('xjzh_wzry_jianzhong').length >= player.storage.xjzh_wzry_jianzhong;
		},
		forced: true,
		locked: true,
		mod: {
			cardUsable(card, player, num) {
				if (!card.cards) return;
				for (let i of card.cards) {
					if (i.hasGaintag("xjzh_wzry_jianzhong")) return Infinity;
				}
			},
			targetInRange(card, player, target) {
				if (!card.cards) return;
				for (let i of card.cards) {
					if (i.hasGaintag("xjzh_wzry_jianzhong")) return true;
				}
			},
		},
		marktext2: "剑来",
		marktext: `<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_jianlai.png>`,
		async content(event, trigger, player) {
			let cards = player.getExpansions('xjzh_wzry_jianzhong');
			player.directgain(cards, null, 'xjzh_wzry_jianzhong');
			player.unmarkSkill('xjzh_wzry_jianzhong');
			player.storage.xjzh_wzry_jianzhong += 10;
		},
		ai: {
			combo: 'xjzh_wzry_jianzhong',
		},
	},
	"xjzh_wzry_bieyue": {
		trigger: {
			player: ['turnOverBefore', 'phaseJudgeBefore', 'phaseDrawBefore', 'phaseDiscardBefore'],
		},
		preHidden: true,
		locked: true,
		notemp: true,
		unique: true,
		audio: "ext:仙家之魂/audio/skill:2",
		init: function (player) {
			player.addMark("xjzh_wzry_bieyue", 4, false);
			player.markSkill("xjzh_wzry_bieyue");
			player.update();
			setInterval(function () {
				if (player.countMark("xjzh_wzry_bieyue") < 4) {
					game.xjzh_playAudio('xjzh_wzry_bieyue3');
					player.addMark('xjzh_wzry_bieyue', 1, false);
					player.markSkill("xjzh_wzry_bieyue");
				}
			}, 50000);
		},
		marktext: "月",
		intro: {
			name: "别月",
		},
		filter(event, player) {
			if (!player.hasMark("xjzh_wzry_bieyue")) return false;
			if (event.name == 'phaseJudge') {
				return player.countCards('j');
			}
			if (event.name == 'phaseDiscard') {
				return player.needsToDiscard();
			}
			if (event.name == 'phaseDraw') {
				return !player.skipList.includes("phaseDraw");
			}
			if (event.name == 'turnOver') {
				if (player.isTurnedOver()) return false;
				return true;
			}
			return false;
		},
		prompt(event, player) {
			var evt = event.name
			var str = "〖别月〗："
			if (evt == "phaseJudge") str += "是否移除一个“月”跳过判定阶段？";
			if (evt == "phaseDiscard") str += "是否移除一个“月”跳过弃牌阶段？";
			if (evt == "phaseDraw") str += "是否移除一个“月”额外摸一张牌？";
			if (evt == "turnOver") str += "是否移除一个“月”跳过翻面？";
			return str;
		},
		check: function (event, player) {
			var evt = event.name
			if (evt == "phaseJudge") {
				var cards = player.getCards('j');
				var num = 0
				for (var i of cards) {
					if (get.is.damageCard(i) || get.tag(i, 'skip')) num++
				}
				return num;
			}
			else if (evt == "phaseDiscard") {
				var num2 = 0
				if (player.needsToDiscard()) {
					for (var i of player.getCards('h')) {
						num2 += get.value(i) / 3
					}
				}
				return num2;
			}
			else if (evt == "phaseDraw") {
				if (player.countMark("xjzh_wzry_bieyue") > 1) return 1;
			}
			else if (evt == "turnOver") {
				if (player.isTurnedOver()) return 1;
			}
			return 0.5;
		},
		content: function () {
			player.removeMark('xjzh_wzry_bieyue', 1, false);
			if (trigger.name == "phaseDraw") {
				trigger.num++
				game.log(player, "移除了一个“月”额外摸了", "#y1", "张牌");
				event.finish();
				return;
			}
			else if (trigger.name == "turnOver") {
				if (player.isTurnedOver()) {
					player.turnOver(false);
				} else {
					trigger.cancel();
				}
				player.turnOver(false);
				game.log(player, "移除了一个“月”解除了", "#y翻面");
				event.finish();
				return;
			}
			trigger.cancel();
			var str = "";
			if (trigger.name == "phaseJudge") str = "#y判定阶段";
			else if (trigger.name == "phaseDiscard") str = "#y弃牌阶段";
			game.log(player, "移除了一个“月”跳过了", str);
		},
		ai: {
			threaten: 3,
			expose: 0.2,
			notemp: true,
			result: {
				player: function (player) {
					if (player.storage.xjzh_wzry_huanhai == true) {
						if (player.countMark("xjzh_wzry_bieyue") == 1) {
							var num = game.filterPlayer(function (current) {
								return current.isOut() && player.isFriendsOf(current);
							});
							var num2 = game.countPlayer(function (current) {
								return current.isOut() && player.isEnemiesOf(current);
							});
							if (num <= num2 || player.hujia >= 2) return -10;
						}
						return lib.skill.xjzh_wzry_bieyue.check.apply(this, arguments);
					}
				},
			},
		},
	},
	"xjzh_wzry_shunhua": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (!game.hasPlayer(function (current) { return !current.hasMark("xjzh_wzry_bieyue") && current != player })) return false;
			return player.countMark("xjzh_wzry_bieyue") > 0;
		},
		prompt: function (event, player) {
			var player = _status.event.player
			var num = player.countMark("xjzh_wzry_bieyue");
			return "〖瞬华〗:选择至多" + get.translation(num) + "个目标令其各获得一个“月”标记";
		},
		filterTarget: function (card, player, target) {
			return target != player && !target.hasMark("xjzh_wzry_bieyue");
		},
		selectTarget: function () {
			var player = _status.event.player
			return [1, player.countMark("xjzh_wzry_bieyue")];
		},
		content: function () {
			target.addMark("xjzh_wzry_bieyue", 1);
			player.removeMark("xjzh_wzry_bieyue", 1, false);
		},
		ai: {
			order: 8,
			result: {
				player: 1,
				target: -1,
			},
		},
	},
	"xjzh_wzry_liuguang": {
		mod: {
			targetInRange: function (card, player, target) {
				if (card.name == 'sha') {
					if (target.hasMark('xjzh_wzry_bieyue') && target != player) return true;
				}
			},
		},
		trigger: {
			player: "useCardToPlayer",
		},
		forced: true,
		priority: -2,
		popup: false,
		notemp: true,
		unique: true,
		audio: "ext:仙家之魂/audio/skill:2",
		filter: function (event, player) {
			if (!event.targets || !event.targets.length) return false;
			if (get.name(event.card) != 'sha') return false;
			var info = get.info(event.card);
			if (info.allowMultiple == false) return false;
			if (info.multitarget) return false;
			return true;
		},
		content: function () {
			"step 0"
			player.addTempSkill("xjzh_wzry_liuguang_off", "shaAfter");
			var targets = game.filterPlayer(function (current) { return current.hasMark("xjzh_wzry_bieyue") && current != player });
			if (targets.length <= 0) {
				event.finish();
				return;
			}
			event.targets = targets.slice(0);
			"step 1"
			if (event.targets.length) {
				event.targetx = event.targets.shift();
				event.targetx.chooseCard('he', 1).set('ai', function (card) {
					var att = get.attitude(player, event.targetx);
					if (event.targetx.countCards('h', 'tao') || event.targetx.countCards('h', 'shan')) return 0;
					if (att > 0) {
						return 8 - get.value(card);
					}
					return 4 - get.value(card);
				});
			}
			"step 2"
			if (result.bool) {
				player.gain(result.cards[0], event.targetx, 'gain2');
			} else {
				event.targetx.say("否");
				game.delayx(1.5);
				trigger.targets.push(event.targetx);
			}
			"step 3"
			player.logSkill('xjzh_wzry_liuguang', event.targetx);
			event.targetx.removeMark("xjzh_wzry_bieyue", 1);
			if (event.targets.length) {
				event.goto(1);
			} else {
				event.finish();
				return;
			}
		},
		subSkill: { "off": { sub: true, }, },
		ai: {
			unequip: true,
			notemp: true,
			skillTagFilter: function (player, tag, arg) {
				if (arg && !arg.target.hasMark("xjzh_wzry_bieyue")) return false;
			},
		},
		subSkill: { off: { sub: true, }, },
	},
	"xjzh_wzry_liuguang2": {
		mod: {
			globalTo: function (from, to, distance) {
				return distance + 1;
			},
			targetInRange: function (card, player, target) {
				return true;
			},
			cardUsable: function (card, player, num) {
				if (card.name == "sha" || card.name == "jiu") return num * 2;
			},
		},
		trigger: {
			player: "useCard",
		},
		forced: true,
		priority: -2,
		notemp: true,
		unique: true,
		audio: "xjzh_wzry_liuguang",
		filter(event, player) {
			if (!event.targets || !event.targets.length) return false;
			if (get.name(event.card) != 'sha') return false;
			let info = get.info(event.cards[0]);
			if (info.allowMultiple == false) return false;
			if (info.multitarget) return false;
			return true;
		},
		async content(event, trigger, player) {
			player.addTempSkill("xjzh_wzry_liuguang2_off", "shaAfter");
			const result = await trigger.targets[0].chooseCard('he', 1)
				.set('ai', card => {
					let player = get.player();
					let target = trigger.targets[0];
					let att = get.attitude(player, target);
					if (target.countCards('h', 'tao') || target.countCards('h', 'shan')) return 0;
					if (att > 0) return 8 - get.value(card);
					return 4 - get.value(card);
				})
				.set("prompt", `〖流光〗：交给${get.translation(player)}一张牌会成为其【杀】的目标。`)
				.forResult();
			if (result?.cards) {
				player.gain(result.cards[0], trigger.targets[0], 'gain2');
			} else {
				trigger.targets[0].say("否");
				game.delayx(1.5);
				trigger.effectCount++;
				game.log(trigger.card, '额外结算1次');
			}
		},
		subSkill: { "off": { sub: true, }, },
		ai: {
			unequip: true,
			notemp: true,
		},
	},
	"xjzh_wzry_huanhai": {
		enable: "phaseUse",
		limited: true,
		unique: true,
		skillAnimation: true,
		animationColor: "water",
		animationStr: "幻海映月",
		filterTarget: function (card, player, target) {
			return target != player;
		},
		init: function (player) {
			player.storage.xjzh_wzry_huanhai = false;
			player.storage.xjzh_wzry_huanhai_remove = []
		},
		filter: function (event, player) {
			if (!player.hasMark("xjzh_wzry_bieyue")) return false;
			if (game.roundNumber <= 1 && player.hp > 1) return false;
			return !player.storage.xjzh_wzry_huanhai;
		},
		content: function () {
			"step 0"
			player.awakenSkill('xjzh_wzry_huanhai');
			player.storage.xjzh_wzry_huanhai = true;
			var players = game.filterPlayer(function (current) { return current.hasMark('xjzh_wzry_bieyue') && current != player });
			for (var i of players) {
				i.clearMark("xjzh_wzry_bieyue", false);
			}
			if (player.countMark("xjzh_wzry_bieyue") < 4) player.addMark("xjzh_wzry_bieyue", 4 - player.countMark("xjzh_wzry_bieyue"));
			"step 1"
			var players = game.filterPlayer(function (current) { return current != target && current != player });
			var list = []
			for (var i of players) {
				list.push(i)
				i.classList.add('out');
				game.log(i, "因", "#y〖幻海〗", "暂时离开游戏");
			}
			player.storage.xjzh_wzry_huanhai_remove = list.slice(0);
			"step 2"
			player.addSkill("xjzh_tongyong_baiban");
			player.addSkill("xjzh_wzry_liuguang2");
			player.addSkill("xjzh_wzry_huanhai_hujia");
			player.addSkill("xjzh_wzry_huanhai_remove");
			var skills = [
				"xjzh_wzry_shunhua",
				"xjzh_wzry_liuguang"
			]
			player.storage['xjzh_tongyong_baiban'].addArray(skills);
			"step 3"
			player.changeHujia(player.hp);
		},
		ai: {
			order: 3,
			result: {
				player: function (player, target) {
					var att = get.attitude(target, player);
					if (att <= 0) {
						if (player.hp > target.hp) return 2;
						return 1;
					}
					return 0;
				},
				target: function (player, target) {
					var att = get.attitude(target, player);
					if (att <= 0) {
						if (player.hp > target.hp) return -2;
						return -1;
					}
					return 0;
				},
			},
		},
		subSkill: {
			"hujia": {
				trigger: {
					source: "damageAfter",
				},
				direct: true,
				priority: -3,
				sub: true,
				content: function () {
					player.changeHujia(trigger.num);
				},
			},
			"remove": {
				trigger: {
					global: "dieAfter",
					player: "xjzh_wzry_bieyueAfter",
				},
				forced: true,
				priority: -3,
				sub: true,
				forceDie: true,
				skillAnimation: true,
				animationColor: "water",
				animationStr: "幻海映月",
				filter: function (event, player) {
					if (event.name == "xjzh_wzry_bieyue" && player.hasMark("xjzh_wzry_bieyue")) return false;
					if (event.name == "die" && event.player.isAlive()) return false;
					return player.storage.xjzh_wzry_huanhai && player.storage.xjzh_wzry_huanhai_remove;
				},
				content: function () {
					"step 0"
					var players = player.storage.xjzh_wzry_huanhai_remove
					for (var i of players) {
						i.classList.remove('out');
						game.log(i, "回到了游戏");
					}
					game.log(players);
					delete player.storage.xjzh_wzry_huanhai_remove
					"step 1"
					if (trigger.player != player) {
						var num = player.hujia
						player.addMark("xjzh_wzry_bieyue", num, false);
						player.changeHujia(-num);
					}
					"step 2"
					delete player.storage['xjzh_tongyong_baiban']
					player.removeSkill("xjzh_tongyong_baiban");
					player.removeSkill("xjzh_wzry_liuguang2");
					player.removeSkill("xjzh_wzry_huanhai_hujia");
					player.removeSkill("xjzh_wzry_huanhai_remove");
				},
			},
		},
	},
	"xjzh_wzry_xunshou": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		locked: true,
		audio: "ext:仙家之魂/audio/skill:3",
		filter(event, player) {
			if (event.player == player) return false;
			return event.player.countCards("he");
		},
		marktext: "巡",
		intro: {
			content: "expansion",
			markcount: "expansion",
		},
		onremove(player, skill) {
			let players = game.filterPlayer(current => {
				return current.countExpansions(skill);
			});
			for (let target of players) {
				let cards = target.getExpansions(skill);
				target.loseToDiscardpile(cards);
			}
		},
		async content(event, trigger, player) {
			/*let cardsList=trigger.player.getExpansions(event.name);
			let suits=cardsList.map(item=>get.suit(item)).toUniqued();*/

			const result = await trigger.player.chooseCard(get.prompt(event.name), 'he', true)
				.set('ai', card => {
					let att = get.attitude(get.player(), get.event().player);
					if (att > 0) return 8 - get.value(card)
					return 4 - get.value(card);
				})
				.forResult();
			if (result?.cards) {
				trigger.player.addToExpansion(result.cards, "gain2", trigger.player).gaintag.add(event.name);
				trigger.player.updateMark(event.name, true);
				player.draw(2);
			}
			if (trigger.player.countExpansions(event.name) >= 4) {
				trigger.player.damage(1, player, 'nocard');
				trigger.player.loseToDiscardpile(trigger.player.getExpansions(event.name));
				trigger.player.addTempSkills("baiban", "damageAfter");
			}
		},
		ai: {
			expose: 0.3,
			threaten: 2,
		},
	},
	"xjzh_wzry_konglie": {
		enable: "phaseUse",
		audio: "ext:仙家之魂/audio/skill:3",
		filter(event, player) {
			return game.hasPlayer(current => {
				return current.countExpansions('xjzh_wzry_xunshou');
			});
		},
		filterTarget(card, player, target) {
			return target.countExpansions('xjzh_wzry_xunshou');
		},
		async content(event, trigger, player) {
			let target = event.targets[0], cards = target.getExpansions('xjzh_wzry_xunshou');
			const result = await player.chooseCardButton(get.prompt('xjzh_wzry_konglie'), cards, 1)
				.set('filterButton', button => player.hasUseTarget(button.link))
				.set('ai', button => {
					if (player.hasUseTarget(button.link)) return player.getUseValue(button.link);
					return 0;
				})
				.forResult();
			if (result?.links) player.chooseUseTarget(result.links[0], true);
		},
		ai: {
			order: 8,
			expose: 0.3,
			result: {
				target(player, target, card) {
					let cards = target.getExpansions('xjzh_wzry_xunshou');
					if (cards.some(card => player.hasUseTarget(card) && game.hasPlayer(current => {
						if (get.effect(current, card, player, player) > 0 && get.useful(card, current) > 0) return true;
						return false;
					}))) return -1;
					return 1;
				},
			},
		},
	},
	"xjzh_wzry_daofeng": {
		trigger: {
			player: "phaseUseBefore",
		},
		forced: true,
		mark: true,
		locked: true,
		marktext: "☯",
		zhuanhuanji(player, skill) {
			if (!player.storage[skill]) {
				player.storage[skill] = true;
				player.addTempSkill('xjzh_wzry_daofeng_yin', { player: 'phaseUseBefore' });
			} else {
				player.storage[skill] = false;
				player.addTempSkill('xjzh_wzry_daofeng_yang', { player: 'phaseUseBefore' });
			};
		},
		intro: {
			name: "刀锋",
			content(storage, player, skill) {
				if (player.storage[skill] == true) return '每个角色出牌阶段开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。';
				return '当你受到伤害或体力流失时，若场上“巡”的数量不大于4，你防止之，然后你可以令一名角色将一张牌置于武将牌上称为“巡”，否则你摸两张牌';
			},
		},
		audio: "ext:仙家之魂/audio/skill:2",
		async content(event, trigger, player) {
			let list = get.xjzh_nearbyRole(player);
			for (let target of list) {
				player.gainPlayerCard(`〖刀锋〗：请选择一张${get.translation(target)}的牌`, target, 1, true).set('ai', button => {
					if (get.attitude(target, player) < 0) return 12 - get.value(button.link);
					return 4 - get.value(button.link);
				});
			}
			player.changeZhuanhuanji(event.name);
		},
		subSkill: {
			"yin": {
				trigger: {
					global: "phaseUseBegin",
				},
				sub: true,
				audio: "ext:仙家之魂/audio/skill:2",
				check: (event, player) => player.getFriends().length,
				prompt: "〖刀锋〗：弃置场上4张花色不一致的“巡”对一名角色造成等量伤害",
				filter(event, player) {
					let targets = game.filterPlayer(current => current.countExpansions('xjzh_wzry_xunshou')), cards = [], suits = [];
					targets.forEach(current => {
						cards.addArray(current.getExpansions("xjzh_wzry_xunshou"));
					});
					suits = cards.map(item => get.suit(item)).toUniqued();
					return suits.length >= 4;
				},
				async content(event, trigger, player) {
					let xunshouTargets = game.filterPlayer(current => current.countExpansions('xjzh_wzry_xunshou'));

					let dialog = ui.create.dialog("hidden");

					for await (let target of xunshouTargets) {
						dialog.add(`${get.translation(target)}武将牌上的“巡守”牌`);
						dialog.add([target.getExpansions('xjzh_wzry_xunshou'), 'vcard']);
					}

					const result = await player.chooseButton(dialog, 4, true)
						.set('filterButton', button => !ui.selected.buttons.some(card => get.suit(card) == get.suit(button.link)))
						.set('complexCard', true)
						.forResult();
					if (result?.links) {
						const result2 = await player.chooseTarget(lib.filter.notMe)
							.set('ai', target => -get.attitude(player, target))
							.set("prompt", `〖刀锋〗：对一名角色造成${result.links.length}点伤害`)
							.forResult();
						if (result2?.targets) {
							for await (let target of xunshouTargets) {
								let cards = target.getExpansions('xjzh_wzry_xunshou'), discard = [];
								target.loseToDiscardpile(result.links.filter(card => cards.includes(card)));
							}
							result2.targets[0].damage(4, player, 'nocard');
						}
					}
				},
			},
			"yang": {
				trigger: {
					player: ["damageBegin1", "loseHpBegin"],
				},
				check: () => 1,
				sub: true,
				forced: true,
				priority: 5,
				filter(event, player) {
					let targets = game.filterPlayer(current => current.countExpansions('xjzh_wzry_xunshou'));
					let cards = [];
					targets.forEach(item => {
						cards.addArray(item.getExpansions("xjzh_wzry_xunshou"));
					});
					return cards.length < 4;
				},
				audio: "ext:仙家之魂/audio/skill:2",
				prompt: "〖刀锋〗：是否防止即将受到的伤害/体力流失，然后令一名角色将一张牌置于武将牌上称为“巡”",
				async content(event, trigger, player) {
					trigger.changeToZero();
					const result = await player.chooseTarget((card, player, target) => {
						if (!target.countCards("he")) return false;
						return target != player;
					})
						.set("prompt", '〖刀锋〗：令一名角色将一张牌置于武将牌上称为“巡”')
						.set('ai', target => -get.attitude(player, target))
						.forResult();
					if (result?.targets) {
						let target = result.targets[0];
						const result2 = await target.chooseCard(get.prompt(event.name), 'he')
							.set('ai', card => {
								let att = get.attitude(player, target);
								if (att > 0) return 8 - get.value(card)
								return 4 - get.value(card);
							})
							.forResult();
						if (result2?.cards) target.addToExpansion(result2.cards, "gain2", trigger.player).gaintag.add("xjzh_wzry_xunshou");
						else player.draw(2);
						target.updateMark("xjzh_wzry_xunshou", true);
					}
				},
			},
		},
	},

};