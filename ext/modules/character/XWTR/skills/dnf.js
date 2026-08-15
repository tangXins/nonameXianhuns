import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const dnfSkills = {

	//地下城与勇士
	"xjzh_dnf_tiannai": {
		trigger: {
			global: ["recoverAfter", "damageAfter"],
		},
		consumeMp: 30,
		prompt: (event, player) => `〖天籁〗：是否消耗${lib.skill["xjzh_dnf_tiannai"].consumeMp}点魔力令${get.translation(event.player)}回复1点体力？`,
		filter(event, player) {
			let num = lib.skill["xjzh_dnf_tiannai"].consumeMp;
			if (get.sourceSkillFor(event.getParent(2)) == "xjzh_dnf_tiannai") return false;
			if (player.xjzh_getMp() < num) return false;
			if (event.player.isDead()) return false;
			return event.player.isDamaged();
		},
		check: (event, player) => get.recoverEffect(event.player, player, player)&&get.attitude(player, event.player) > 0,
		async content(event, trigger, player) {
			let num = lib.skill[event.name].consumeMp;
			lib.skill[event.name].contentUse(player, trigger.player, num);

			let nameList = get.nameList(player), equip = false;
			if (nameList.some(name => game.xjzh_hasEquiped("xjzh_qishu_tianzhibeimin", name))) equip = true;
			if (!equip) return;

			const result = await player.chooseBool()
				.set("ai", () => {
					let player = get.player();
					if (player.isHealthy()) return 0.5;
					return 2;
				})
				.set("prompt", `〖天籁〗：是否消耗${num}点魔力令${get.translation(player)}回复1点体力？`)
				.forResult();
			if (result?.bool) lib.skill[event.name].contentUse(player, player, num);
		},
		async contentUse(player, target, num) {
			player.xjzh_changeMp(-num);
			target.recover();
			await target.update();
			await game.delayex();
			if (target.isHealthy()) target.gainMaxHp();
		},
		ai: {
			expose: 0.5,
			threaten: 2,
		},
	},
	"xjzh_dnf_zhufu": {
		enable: "phaseUse",
		marktext: "祝",
		intro: {
			name: "荣誉祝福",
			content(storage, player, skill) {
				return `${get.translation(player)}下一次造成伤害+1且防止下一次受到的伤害`;
			},
		},
		consumeMp: 35,
		filter(event, player) {
			let num = lib.skill["xjzh_dnf_zhufu"].consumeMp;
			if (player.xjzh_getMp() < num) return false;
			return game.countPlayer(target => get.xjzh_deEffect(target));
		},
		filterTarget(card, player, target) {
			let nameList = get.nameList(player), equip = false;
			if (nameList.some(name => game.xjzh_hasEquiped("xjzh_qishu_tianzhibeimin", name))) equip = true;
			return get.xjzh_deEffect(target) && (!equip || player !== target);

		},
		multitarget: true,
		multiline: true,
		selectTarget() {
			let player = get.player();
			let nameList = get.nameList(player);
			let targets = game.filterPlayer(target => get.xjzh_deEffect(target));
			let equip = false;
			let num = lib.skill["xjzh_dnf_zhufu"].consumeMp, mp = player.xjzh_getMp() - num;
			let selectTargetNum = Math.min(targets.length, Math.floor(mp / 10));
			if (nameList.some(name => game.xjzh_hasEquiped("xjzh_qishu_tianzhibeimin", name))) equip = true;
			return !equip ? 1 : targets.length == 1 ? 1 : selectTargetNum == 1 ? 1 : [1, selectTargetNum];
		},
		async content(event, trigger, player) {
			let num = lib.skill[event.name].consumeMp;
			let targets = [...event.targets, player].sortBySeat();
			if (targets.length > 2) num += (targets.length - 2) * 10;
			player.xjzh_changeMp(-num);
			targets.forEach(target => lib.skill[event.name].contentUse(target, event.name));
		},
		async contentUse(player, name) {
			game.xjzh_clearRestraint(player);
			player.addMark(name, 1, false);
			player.addSkill(`${name}_use`);
		},
		subSkill: {
			"use": {
				trigger: {
					global: "damageBegin1",
				},
				forced: true,
				priority: 3,
				sub: true,
				filter(event, player) {
					return (event.player == player) ^ (event.source == player);
				},
				async content(event, trigger, player) {
					if (trigger.source == player) trigger.num++;
					else if (trigger.player == player) trigger.changeToZero();
					player.clearMark("xjzh_dnf_zhufu");
					player.removeSkill(event.name, true);
				},
				ai: {
					nodamage: true,
					damageBonus: true,
					result: {
						player(player, target, card) {
							if (get.is.damageCard(card)) return 2;
						},
					},
					effect: {
						target(card, player, target) {
							if (get.is.damageCard(card)) return [0, 0.3];
						},
					},
				},
			},
		},
		ai: {
			order: 12,
			result: {
				player(player, target, card) {
					let att = get.attitude(player, target);
					if (att <= 0) return -1;
					return get.xjzh_deEffect2(target);
				},
			},
		},
	},
	"xjzh_dnf_shengyu": {
		trigger: {
			global: "phaseAfter",
		},
		forced: true,
		locked: true,
		priority: 5,
		async content(event, trigger, player) {
			player.xjzh_changeMp(5);
			let targets = game.filterPlayer(target => target.hasMark("xjzh_dnf_zhufu"));
			if (!targets.length) return;
			await game.asyncDraw(targets.sortBySeat());
			await game.delayex();
			if (get.xjzh_isMaxMp(player)) {
				player.xjzh_changeMaxMp(5);
				const result = await player.chooseTarget(lib.filter.notMe)
					.set('ai', target => get.attitude(target, player))
					.set("prompt", `〖圣愈〗：选择一名角色令${get.translation(trigger.source)}执行一个额外的回合`)
					.forResult();
				if (result?.targets) {
					result.targets[0].storage[event.name] = player;
					result.targets[0].insertPhase();
				}
			}
		},
		subSkill: {
			"use": {
				trigger: {
					player: "useCardAfter",
				},
				direct: true,
				locked: true,
				sub: true,
				filter(event, player) {
					return player.storage.xjzh_dnf_shengyu;
				},
				onremove(player, skill) {
					delete player.storage.xjzh_dnf_shengyu;
				},
				async content(event, trigger, player) {
					let target = player.storage.xjzh_dnf_shengyu
					if (get.xjzh_isMaxMp(target)) player.draw();
					else target.xjzh_changeMp(1);

					let evt = event.getParent("phase");
					if (evt && evt.getParent) {
						let next = game.createEvent('loseShengyu', false, evt.getParent());
						next.player = player;
						next.skill = event.name;
						next.setContent(function () {
							if (player.hasSkill(skill)) player.removeSkill(skill, true);

						});
					}
				},
			},
		},
	},
	"xjzh_dnf_jianshen": {
		trigger: {
			player: ["phaseZhunbeiBegin", "phaseJieshuBegin"],
		},
		forced: true,
		priority: 12,
		mod: {
			canBeGained(card, player, target, name) {
				let cards = [
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if (cards.includes(card.name)) return false;
			},
			canBeDiscarded(card, player, target, name) {
				let cards = [
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if (cards.includes(card.name)) return false;
			},
			cardDiscardable(card, player) {
				let cards = [
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if (cards.includes(card.name)) return false;
			},
		},
		global: "xjzh_dnf_jianshen_nouse",
		async content(event, trigger, player) {
			"step 0"
			if (player.hasDisabledSlot(1) && !player.hasEnabledSlot(1)) return;
			let dialog = ui.create.dialog('〖剑神〗：请选择并装备一把武器', 'hidden'), list = [
				"xjzh_card_tianjigyx",
				"xjzh_card_guanshizhengzong",
				"xjzh_card_julihjc",
				"xjzh_card_mojianklls",
				"xjzh_card_tiancongyunjian",
			];
			dialog.add([list, 'vcard']);
			const result = await player.chooseButton(dialog, true)
				.set('ai', button => Math.random())
				.forResult();
			if (result?.links) {
				let card = game.createCard(result.links[0][2]);
				player.equip(card);
			}
		},
		subSkill: {
			"nouse": {
				mod: {
					cardEnabled(card, player) {
						if (!card) return;
						if (get.is.playerNames(player, "xjzh_dnf_suodeluosi")) return;
						let str = `${lib.translate[card.name]}${lib.translate[card.name + "_info"]}`;
						if (str.includes('剑')) return false;
					},
					cardEnabled2(card, player) {
						if (!card) return;
						if (get.is.playerNames(player, "xjzh_dnf_suodeluosi")) return;
						let str = `${lib.translate[card.name]}${lib.translate[card.name + "_info"]}`;
						if (str.includes('剑')) return false;
					},
				},
				charlotte: true,
				locked: true,
				sub: true,
			},
		},
	},
	"xjzh_dnf_aoyi": {
		trigger: {
			player: ['loseAfter', 'disableEquipBefore'],
			global: ["equipAfter", "addJudgeAfter", "gainAfter", "loseAsyncAfter", "addToExpansionAfter"],
		},
		forced: true,
		priority: 3,
		locked: true,
		filter(event, player) {
			let evt = event.getl(player);
			if (event.name == "disableEquip") return event.slots.includes("equip1");
			if (event.cards?.length && get.subtype(event.cards[0]) != "equip1") return false;
			return evt && evt.player == player && evt.es && evt.es.length > 0;
		},
		async content(event, trigger, player) {
			if (trigger.name == "disableEquip") {
				while (trigger.slots.includes("equip1")) trigger.slots.remove("equip1");
				game.log(player, "的武器栏无法废除");
			} else {
				let targets = [player.getNext(), player.getPrevious()];
				for await (let target of targets) {
					player.randomGain(target, 'h', true);
				}

				let type = get.subtype2(trigger.cards[0]);
				switch (type) {
					case 'xjzh_guangjian':
						game.xjzh_clearRestraint(player);
						break;
					case 'xjzh_jujian':
						targets = targets.filter(item => player.isEnemiesOf(item) && !item.isTurnedOver());
						if (!targets.length) break;
						let target = targets.randomGet();
						target.turnOver(true);
						break;
					case 'xjzh_duanjian':
						targets = targets.filter(item => player.isEnemiesOf(item));
						targets.randomGet().damage(1, player, "nocard");
						break;
					case 'xjzh_taidao':
						targets = game.filterPlayer(current => player.inRange(current));
						if (!targets.length) break;
						for await (let target of targets) {
							if (target.getEquips(1).length) target.discard(target.getCards('e', card => get.subtype(card) == "equip1"));
						}
						break;
					case 'xjzh_dunqi':
						targets = game.filterPlayer(current => player.inRange(current));
						if (!targets.length) break;
						targets.randomGet().goMad();
						break;
				}
			}
		},
	},
	"xjzh_dnf_jianyi": {
		trigger: {
			player: "damageBegin1",
		},
		priority: 10,
		frequent: true,
		locked: true,
		prompt(event, player) {
			if (!player.getEquips(1).length) {
				return "〖剑意〗：是否发动〖剑神〗切换武器牌？";
			} else {
				let card = player.getEquips(1).filter(card => get.subtype2(card))[0], type = get.subtype2(card);
				switch (type) {
					case 'xjzh_guangjian':
						return `〖剑意〗：是否对${get.translation(event.source)}造成${event.num}点伤害，并令其获得一层感电？`;
						break;
					case 'xjzh_jujian':
						return `〖剑意〗：是否防止此伤害并令${get.translation(event.source)}视为你选择的一名其他角色使用一张不计入次数的【杀】？`;
						break;
					case 'xjzh_duanjian':
						return `〖剑意〗：是否发动技能摸两张牌？`;
						break;
					case 'xjzh_taidao':
						return `〖剑意〗：是否令${get.translation(event.source)}选择弃置${event.num}张牌或令你回复一点体力？`;
						break;
					case 'xjzh_dunqi':
						return `〖剑意〗：是否令${get.translation(event.source)}立即结束当前出牌阶段？`;
						break;
				}
			}
		},
		filter(event, player) {
			if (!player.getEquips(1).length) return true;
			let card = player.getEquips(1).filter(card => get.subtype2(card))[0], type = get.subtype2(card);
			if (type == "xjzh_duanjian") return true;
			if (type == "xjzh_jujian" && event.source && !game.hasNature(event)) return true;
			if (["xjzh_guangjian", "xjzh_taidao", "xjzh_dunqi"].includes(type) && event.source) return true;
			return false;
		},
		async content(event, trigger, player) {
			if (!player.getEquips(1).length) {
				player.useSkill("xjzh_dnf_jianshen", player);
			} else {
				let card = player.getEquips(1).filter(card => get.subtype2(card))[0], type = get.subtype2(card), result;
				switch (type) {
					case 'xjzh_guangjian':
						trigger.source.damage(trigger.num, player, 'nocard');
						trigger.source.xjzh_changeBuff('gandian', 1);
						break;
					case 'xjzh_jujian':
						trigger.changeToZero();
						result = await player.chooseTarget((card, player, target) => ![trigger.source, player].includes(target))
							.set("prompt", `〖剑意〗：选择一名角色${get.translation(trigger.source)}对其使用一张【杀】`)
							.set('ai', target => get.effect(target, { name: 'sha' }, player, player))
							.forResult();
						if (result?.targets) trigger.source.useCard({ name: 'sha' }, result.targets, false).set("addCount", false);
						break;
					case 'xjzh_duanjian':
						player.draw(2);
						break;
					case 'xjzh_taidao':
						result = await trigger.source.chooseToDiscard(trigger.num, 'he')
							.set("ai", card => {
								if (get.recoverEffect(trigger.source, player, player) < 0) return 7 - get.value(card);
								return 0;
							})
							.set("prompt", `〖剑意〗：弃置${trigger.num}张牌，否则${get.translation(player)}回复一点体力`)
							.forResult();
						if (!result?.bool) player.recover();
						break;
					case 'xjzh_dunqi':
						event.getParent('phaseUse').skipped = true;
						break;
				}
			}
		},
	},
	"xjzh_card_mojianklls_skill": {
		trigger: {
			source: "damageBefore",
		},
		forced: true,
		priority: 88,
		equipSkill: true,
		filter(event, player) {
			return event.num > 0;
		},
		async content(event, trigger, player) {
			trigger.player.damage(trigger.num, 'notrigger', 'nocard')._triggered = null;
			trigger.changeToZero();
		},
	},
	"xjzh_card_julihjc_skill": {
		trigger: {
			source: "damageAfter",
		},
		prompt(event, player) {
			return "是否令" + get.translation(event.player) + "跳过下个出牌阶段？";
		},
		priority: 8,
		equipSkill: true,
		filter(event, player) {
			return event.card && get.name(event.card) == "sha";
		},
		check(event, player) {
			return -get.attitude(player, event.player);
		},
		async content(event, trigger, player) {
			trigger.player.skip('phaseUse');
		},
		ai: {
			skip: true,
		},
	},
	"xjzh_card_tiancongyunjian_skill": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		priority: 88,
		equipSkill: true,
		filter(event, player) {
			return event.card && get.name(event.card) == "sha";
		},
		async content(event, trigger, player) {
			const result = await player.chooseTarget(lib.filter.notMe)
				.set('ai', target => get.damageEffect(target, player, player))
				.set("prompt", "【天丛云剑】：选择一名其他角色令其受到一点无来源伤害")
				.forResult();
			if (result?.targets) result.targets[0].damage(1, 'nosource');
		},
	},
	"xjzh_card_guanshizhengzong_skill": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		priority: 8,
		equipSkill: true,
		filter(event, player) {
			return event.card && get.name(event.card) == "sha";
		},
		async content(event, trigger, player) {
			await trigger.player.xjzh_changeBuff('yishang', 1);
			if (get.xjzh_buffNum(player, "yishang") == get.xjzh_buffInfo('yishang', 'limit')) {
				await trigger.player.damage(get.xjzh_buffNum(player, 'yishang'), player, "nocard");
				trigger.player.xjzh_changeBuff('yishang', -get.xjzh_buffNum(player, 'yishang'));
			}
		},
	},
	"xjzh_card_tianjigyx_skill": {
		trigger: {
			source: "damageAfter",
		},
		forced: true,
		priority: 8,
		equipSkill: true,
		mod: {
			cardUsable(card, player, num) {
				if (get.name(card) == 'sha') return 2;
			},
		},
		async content(event, trigger, player) {
			if (get.xjzh_buffNum(trigger.player, 'gandian') <= 0) {
				trigger.player.xjzh_changeBuff('gandian', 1);
			} else {
				if (player.getStat().card.sha > 0) player.getStat().card.sha -= 1
			}
		},
	},

};