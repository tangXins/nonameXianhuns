import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills = {
	"xjzh_boss_jiwu": {
		enable: "phaseUse",
		usable: 1,
		filterTarget: lib.filter.notMe,
		selectTarget: -1,
		multitarget: true,
		multiline: true,
		check(card) { return 8 - get.value(card); },
		filterCard(card) {
			return get.is.damageCard(card);
		},
		filter(event, player) {
			return player.countCards('h', card => get.is.damageCard(card));
		},
		async content(event, trigger, player) {
			await player.useCard({ name: 'sha', isCard: true }, event.targets, false);
			if (player.getStat('damage')) {
				let cards = get.cardPile(card => get.is.damageCard(card));
				if (cards) player.gain(cards, player, 'gain2', 'log');
			}
		},
		ai: {
			expose: 0.3,
			order: 12,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_boss_feijiang": {
		trigger: {
			global: ["shaBegin", "juedouBegin"],
		},
		forced: true,
		locked: true,
		priority: 6,
		filter(event, player) {
			return event.player == player;
		},
		init(player, skill) {
			player.addAdditionalSkills(skill, "wushuang");
		},
		async content(event, trigger, player) {
			if (trigger.target.countCards('he')) {
				const result = await player.gainPlayerCard(trigger.target, "he", true).forResult();
				if (result?.links) {
					let card = result.links[0];
					if (get.is.damageCard(card)) {
						const result2 = await player.chooseToDiscard(card)
							.set('ai', card => 8 - get.value(card))
							.set("prompt", `〖飞将〗：是否弃置此牌令${get.translation(trigger.card)}造成伤害+1`)
							.forResult();
						if (result2?.cards) {
							if (!trigger.baseDamage) trigger.baseDamage = 1;
							trigger.baseDamage++;
						}
					}
				}
			}
		},
	},
	"xjzh_boss_benxi": {
		trigger: {
			source: ["damageAfter"],
			global: ["phaseZhunbeiBegin"],
		},
		forced: true,
		locked: true,
		priority: 3,
		mark: true,
		marktext: "袭",
		intro: {
			name: "奔袭",
			content(storage, player) {
				let list = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					return info && info.xjzh_xinghunSkill;
				});
				return "“星魂”技能数量：" + get.translation(list.length) + "";
			},
			markcount(storage, player) {
				let list = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					return info && info.xjzh_xinghunSkill;
				});
				return list.length;
			},
		},
		mod: {
			globalFrom(from, to, distance) {
				let list = from.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					return info && info.xjzh_xinghunSkill;
				});
				return distance - list.length;
			}
		},
		audio: "ext:仙家之魂/audio/skill:2",
		filter(event, player) {
			if (event.name == "phaseZhunbei") {
				let list = player.getSkills(null, false, false).filter(skill => {
					let info = lib.skill[skill];
					return info && info.xjzh_xinghunSkill;
				});
				if (list.length) return event.player != player;
				return false;
			}
			return !event.numFixed;
		},
		async content(event, trigger, player) {
			let name = trigger.name;
			if (name == "damage") {
				let skills = [], list = game.xjzh_wujiangpai(true).filter(name => {
					return name.startsWith("xjzh_");
				});
				list.forEach(name => {
					let names = lib.character[name][3];
					skills.addArray(names.filter(skill => {
						let info = get.info(skill);
						if (player.skills.includes(skill)) return false;
						if (info && (info.zhuSkill || info.juexingji || info.limited || info.dutySkill || info.nogainsSkill || info.unique)) return false;
						return info && info.xjzh_xinghunSkill;
					}));
				});
				if (skills.length) {
					player.addSkills(skills.randomGet());
					player.update();
					player.updateMarks();
				}
			} else {
				const result = await player.chooseBool()
					.set('ai', () => true)
					.set("prompt", "〖奔袭〗：是否移除一个“星魂”技能执行一个额外的出牌阶段？")
					.forResult();
				if (result?.bool) {
					let list = player.getSkills(null, false, false).filter(skill => {
						let info = lib.skill[skill];
						return info && info.xjzh_xinghunSkill;
					}), dialog;
					if (event.isMine()) {
						dialog = ui.create.dialog('forcebutton');
						dialog.add('〖奔袭〗：请选择移除一项技能');
						for (let i = 0; i < list.length; i++) {
							if (lib.translate[list[i] + '_info']) {
								let translation = get.translation(list[i]);
								if (translation[0] == '新' && translation.length == 3) {
									translation = translation.slice(1, 3);
								} else {
									translation = translation.slice(0, 2);
								}
								let item = dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖' + translation + '〗</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
								item.firstChild.link = list[i];
							}
						}
					}
					const result2 = await player.chooseControl(list)
						.set('prompt', '〖奔袭〗：请选择移除一项技能')
						.set('ai', () => get.min(get.event().list, get.skillRank, 'item'))
						.set('dialog', dialog)
						.set('list', list)
						.forResult();
					if (result2?.control) {
						player.removeSkills(result2.control);
						let oldcurrentPhase = _status.currentPhase;
						_status.currentPhase = player;
						player.phaseUse()._extraPhaseReason = "xjzh_boss_benxi_phase";
						_status.currentPhase = oldcurrentPhase;
					}
				}
			}
		},
	},
	"xjzh_boss_xiuluo": {
		trigger: {
			player: ["changeHp", "changeSkillsAfter"],
		},
		forced: true,
		locked: true,
		priority: 20,
		filter(event, player) {
			let list = player.getSkills(null, false, false).filter(skill => {
				let info = lib.skill[skill];
				return info && info.xjzh_xinghunSkill;
			});
			if (event.name == "changeSkills" ? list.length == 6 : list.length) return true;
			return false;
		},
		audio: "ext:仙家之魂/audio/skill:4",
		async content(event, trigger, player) {
			if (trigger.name == "changeSkills") {
				let targets = game.filterPlayer(current => current != player);
				targets.sort(lib.sort.seat);
				player.line(targets, 'green');
				for await (let target of targets) {
					target.damage('nocard');
					target.chooseToDiscard(4, "he", true)
				}
			} else {
				let list = player.getSkills(null, false, false).filter(skill => {
					let info = lib.skill[skill];
					return info && info.xjzh_xinghunSkill;
				});
				const result = await player.chooseBool()
					.set('ai', () => {
						let player = get.player();
						let list = player.getSkills(null, false, false).filter(skill => {
							let info = lib.skill[skill];
							return info && info.xjzh_xinghunSkill;
						});
						if (player.isDamaged()) return list.length - player.hp;
						return list.length;
					})
					.set("prompt", `〖修罗〗：是否移除一个“星魂”技能${player.isDamaged() ? "回复一点体力" : `摸${get.translation(Math.max(1, list.length))}张牌`}`)
					.forResult();
				if (result?.bool) {
					let dialog;
					if (event.isMine()) {
						dialog = ui.create.dialog('forcebutton');
						dialog.add('〖修罗〗：请选择移除一项技能');
						for (let i = 0; i < list.length; i++) {
							if (lib.translate[list[i] + '_info']) {
								let translation = get.translation(list[i]);
								if (translation[0] == '新' && translation.length == 3) {
									translation = translation.slice(1, 3);
								} else {
									translation = translation.slice(0, 2);
								}
								let item = dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖' + translation + '〗</div><div>' + lib.translate[list[i] + '_info'] + '</div></div>');
								item.firstChild.link = list[i];
							}
						}
					}
					const result2 = await player.chooseControl(list)
						.set('prompt', '〖修罗〗：请选择移除一项技能')
						.set('ai', () => get.min(list, get.skillRank, 'item'))
						.set('dialog', dialog)
						.forResult();
					if (result2?.control) {
						player.removeSkills(result2.control);
						player.isDamaged() ? player.recover() : player.draw(Math.max(1, list.length));
					}
				}
			}
		},
	},

};

export default skills;