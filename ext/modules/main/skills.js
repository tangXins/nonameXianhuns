import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';
import { runes } from '../other/rune.js';
import { buffMap } from '../other/buff.js';
import { applyTalentEffects } from '../tycoon/config/talentEffects.js';

export const skills = {
	/** @type { importCharacterConfig['skill'] } */
	skill: {
		//控制buff自然衰减的技能
		"_xjzh_buff_naturalLose": {
			trigger: {
				player: "phaseAfter",
			},
			firstDo: true,
			priority: Infinity,
			silent: true,
			async content(event, trigger, player) {
				let map = Object.keys(buffMap);
				for (let name of map) {
					let buffName = get.xjzh_buffName(name);
					let info = lib.skill[buffName].buffInfo;
					if (info.naturalLose && get.xjzh_buffNum(player, buffName) > 0) {
						player.xjzh_changeBuff(buffName, -1, 'naturalLose');
					}
				}
			},
		},
		//控制符文生效的技能
		"_xjzh_fuwen_effect": {
			trigger: {
				global: 'gameStart',
			},
			silent: true,
			lastDo: true,
			priority: Infinity,
			filter(event, player) {
				if (get.nameList(player).length == 0) return false;
				if (!player.isUnderControl(true)) return false;
				if (!get.isXHwujiang(player)) return false;
				if (!['identity', 'doudizhu', 'xjzh_challenge'].includes(get.mode())) return false;
				if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return false;
				if (!get.nameList(player).some(item => get.xjzh_equiped(item).length)) return false;
				return true;
			},
			async content(event, trigger, player) {
				let names = get.nameList(player), qishuList = {}, runesList = {}, list;
				if (!names.length) return;
				for await (let name of names) {
					list = get.xjzh_equiped(name).filter(item => !item.includes("xjzh_qishu_bubaiwangzhe")).toUniqued();
					if (list.length) qishuList[name] = list;
				}
				let equipList = Object.keys(qishuList);
				for await (let equip of equipList) {
					list = qishuList[equip];
					list.forEach(item => {
						if (get.xjzh_runeQishuList(item).length) runesList[item] = get.xjzh_runeQishuList(item);
					});
				}
				function getSkill(arg) {
					let sikllsList = [];
					for (let item in arg) {
						let list = arg[item];
						if (!list.length || list.length <= 1) continue;
						let ritualSkill = runes["ritual"][list.find(item => get.xjzh_runeType(item) == 'ritual')];
						let praySkill = runes["pray"][list.find(item => get.xjzh_runeType(item) == 'pray')];
						let originSkillId = `xjzh_fuwen_runeEffect${ritualSkill.names.slice(10)}${praySkill.names.slice(10)}${get.xjzh_randomEnglishString(get.rand(5, 10))}`;
						if (!lib.skill[originSkillId]) {
							let skill = {
								trigger,
								filter(event, player) {
									if (this.extraFilter && !this.extraFilter(event, player)) {
										return false;
									}
									return true;
								},
								mark: true,
								marktext: null,
								intro: {
									content: null,
								},
								direct: true,
								lastDo: true,
								priority: Infinity,
								charlotte: true,
								superCharlotte: true,
								fixed: true,
								runeSkills: true,
								targetFilter: (player) => null,
								effect: async (event, trigger, player) => null,
								content: async (event, trigger, player) => {
									await player.addMark(originSkillId, ritualSkill.gain);

									if (player.countMark(originSkillId) >= praySkill.xiaohao) {
										let targets = lib.skill[event.name]?.targetFilter?.(player)?.sortBySeat() || [];
										let skillsEffect = lib.skill[event.name].effect;

										let next = game.createEvent('xjzh_fuwen_runeTrigger', false);
										next.player = player;
										next.targets = targets?.length ? [...targets] : [];

										next.skillsEffect = skillsEffect;
										player.logSkill(event.name, targets);

										next.setContent(async function () {
											await skillsEffect(this, trigger, player);
											await player.clearMark(originSkillId);
											this.trigger("xjzh_fuwen_runeTrigger");
										});
									}
								},
							}
							skill.trigger = ritualSkill.trigger;
							skill.extraFilter = ritualSkill.filter;
							skill.effect = praySkill.content;
							skill.targetFilter = praySkill.targetFilter;
							let translate = get.xjzh_randomChineseString(2);
							skill.marktext = translate.slice(1),
								skill.intro.content = (storage, player, skill) => {
									return `<li>贡品数量：${player.countMark(skill)}<br><br><li>锁定技，${ritualSkill.translateInfo().slice(0, -1)}；${praySkill.translateInfo()}`;
								};
							lib.skill[originSkillId] = skill;
							lib.translate[originSkillId] = get.xjzh_randomChineseString(2);
							lib.translate[originSkillId + "_info"] = "";//`锁定技，${ritualSkill.translateInfo().slice(0, -1)}；${praySkill.translateInfo()}`;
							sikllsList.push(originSkillId);
						}
					}
					return sikllsList;
				}

				let sikllsList = getSkill(runesList);
				player.addSkills(sikllsList);

			},

		},
		//控制奇术要件生效的技能
		"_xjzh_qishu_effect": {
			trigger: {
				global: 'gameStart',
			},
			silent: true,
			lastDo: true,
			priority: Infinity,
			filter(event, player) {
				let config = game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions");
				let configAi = game.getExtensionConfig("仙家之魂", "xjzh_qishuAiEquip");
				let configAll = game.getExtensionConfig("仙家之魂", "xjzh_qishuAllMode");
				if (get.nameList(player).length == 0) return false;
				if (configAll !== true && !['identity', 'doudizhu'].includes(get.mode())) return false;
				if (configAi !== true && !player.isUnderControl(true)) return false;
				let playerNames = get.nameList(player), qishuEquipsLists = [];
				if (!playerNames.filter(item => get.xjzh_equiped(item).length).length) return false;
				if (playerNames.length == 1) {
					qishuEquipsLists = get.xjzh_equiped(playerNames[0]);
				} else {
					playerNames.forEach(name => {
						qishuEquipsLists.addArray(get.xjzh_equiped(name));
					});
				}
				qishuEquipsLists.unique();
				if (!qishuEquipsLists.length) return false;
				if (["xjzh_qishu_wuyan", "xjzh_qishu_waxilidedaogao"].some(item => qishuEquipsLists.includes(item))) return false;
				if (!config || config === "close") return false;
				if (config !== "close") {
					if (config === "all") return true;
					return get.isXHwujiang(player);
				}
				return false;

			},
			async content(event, trigger, player) {
				let qishuyaojians = new Map();
				let names = get.nameList(player);
				let name = names.filter(item => {
					return get.xjzh_equiped(item).length;
				});
				var initSkill = function (name, player) {
					if (!name) return;
					var item = lib.xjzh_qishuyaojians[name];
					if (!item) return;
					if (item.init) item.init(player);
					if (item.replaceSkill) {
						for (var origin in item.replaceSkill) {
							if (typeof item.replaceSkill[origin] == 'string') {
								var skill = item.replaceSkill[origin];
							} else {
								var skill = origin + '_changed';
								lib.skill[skill] = item.replaceSkill[origin];
								lib.skill[skill].unique = true;
								lib.translate[skill] = lib.translate[origin];
								game.finishSkill(skill, false);
							}
							if (lib.character[player.name][3].includes(origin)) {
								var index = lib.character[player.name][3].indexOf(origin);
								lib.character[player.name][3].splice(index, 1, skill);
							}
							if (player.skills.includes(origin)) {
								var index = player.skills.indexOf(origin);
								player.skills[index] = skill;
								//失去旧技能
								var info = lib.skill[origin];
								player.unmarkSkill(origin);
								delete player.tempSkills[origin];
								if (info) {
									if (info.onremove) {
										if (typeof info.onremove == 'function') {
											info.onremove(player, origin);
										}
										else if (typeof info.onremove == 'string') {
											if (info.onremove == 'storage') {
												delete player.storage[origin];
											}
											else {
												var cards = player.storage[origin];
												if (get.itemtype(cards) == 'card') {
													cards = [cards];
												}
												if (get.itemtype(cards) == 'cards') {
													if (player.onremove == 'discard') {
														player.$throw(cards);
													}
													if (player.onremove == 'discard' || player.onremove == 'lose') {
														game.cardsDiscard(cards);
														delete player.storage[origin];
													}
												}
											}
										}
										else if (Array.isArray(info.onremove)) {
											for (var i = 0; i < info.onremove.length; i++) {
												delete player.storage[info.onremove[i]];
											}
										}
										else if (info.onremove === true) {
											delete player.storage[origin];
										}
									}
									player.removeSkillTrigger(origin);
									if (!info.keepSkill) {
										player.removeAdditionalSkill(origin);
									}
								}
								//获得新技能
								var info = lib.skill[skill];
								player.addSkillTrigger(skill);
								if (info.init2 && !_status.video) {
									info.init2(player, skill);
								}
								if (info.mark) {
									if (info.mark == 'card' &&
										get.itemtype(player.storage[skill]) == 'card') {
										player.markSkill(skill, player, player.storage[skill]);
									}
									else if (info.mark == 'card' &&
										get.itemtype(player.storage[skill]) == 'cards') {
										player.markSkill(skill, player, player.storage[skill][0]);
									}
									else if (info.mark == 'image') {
										player.markSkill(skill, null, ui.create.card(null, 'noclick').init([null, null, skill]));
									}
									else if (info.mark == 'character') {
										var intro = info.intro.content;
										if (typeof intro == 'function') {
											intro = intro(player.storage[skill], player);
										}
										else if (typeof intro == 'string') {
											intro = intro.replace(/#/g, player.storage[skill]);
											intro = intro.replace(/&/g, get.cnNumber(player.storage[skill]));
											intro = intro.replace(/\$/g, get.translation(player.storage[skill]));
										}
										var caption;
										if (typeof info.intro.name == 'function') {
											caption = info.intro.name(player.storage[skill], player);
										}
										else if (typeof info.intro.name == 'string') {
											caption = info.name;
										}
										else {
											caption = get.translation(skill);
										}
										player.markSkillCharacter(skill, player.storage[skill], caption, intro);
									}
									else {
										player.markSkill(skill);
									}
								}
							}
						}
					}
					if (item.replaceSkillInfo) {
						for (var origin in item.replaceSkillInfo) {
							if (origin.slice(origin.length - 5) == '_info') {
								var skill = origin.slice(0, origin.length - 5) + '_changed_info';
								lib.translate[skill] = item.replaceSkillInfo[origin];
							} else {
								var skill = origin + '_changed';
								lib.translate[skill] = item.replaceSkillInfo[origin];
							}
						}
					}
					if (item.skill) {
						let newSkill = name;
						if (!lib.skill[newSkill]) {
							lib.skill[newSkill] = item.skill;
							lib.skill[newSkill].charlotte = true;
							lib.skill[newSkill].xjzh_qishuSkill = true;
							lib.skill[newSkill].superCharlotte = true;
							lib.skill[newSkill].nobracket = true;
							lib.skill[newSkill].locked = true;
							lib.skill[newSkill].unique = true;
							if (lib.skill[newSkill].priority === undefined) lib.skill[newSkill].priority = 5;
							if (!lib.skill[newSkill].onremove) lib.skill[newSkill].onremove = (player, skill) => {
								if (!player.hasSkill(skill)) player.addSkills(skill);
							};
							if (item.skillName) {
								lib.translate[newSkill] = item.skillName;
							} else {
								lib.translate[newSkill] = item.translate;
							}
							if (item.skillInfo) {
								lib.translate[newSkill + '_info'] = item.skillInfo;
								if (item.append_info) lib.translate[newSkill + '_append'] = item.append_info;
							} else {
								if (!item.noTranslate) {
									lib.translate[newSkill + '_info'] = item.translate_info;
									if (item.append_info) lib.translate[newSkill + '_append'] = item.append_info;
								}
							}
							if (item.dynamicTranslate && !item.noTranslate) {
								lib.translate[newSkill + "_info"] = item.dynamicTranslate(player);
							}
							let str = lib.translate[newSkill + "_info"], colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
							if (str) {
								if (str.includes("控制")) {
									let str2 = `<a style='color:${colorx ? colorx : "#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_kongzhi');\">控制</a>`;
									str = str.replace(/控制/g, str2);
								};
								if (str.includes("会心")) {
									let str2 = `<a style='color:${colorx ? colorx : "#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
									str = str.replace(/会心/g, str2);
								};
								lib.translate[newSkill + "_info"] = str;
							}
						}
						player.addSkills(newSkill);
					}
				}
				for await (let item of name) {
					let equiped = get.xjzh_equiped(item);
					if (!equiped.length) continue;
					equiped.forEach(skill => {
						initSkill(skill, player);
					});
					qishuyaojians.set(item, equiped);
				}
				player.xjzh_qishuyaojians = qishuyaojians;

			var config = game.xjzh_getQishuConfig();
			if (config && config.craftedBag && config.craftedBag.length > 0) {
				var equippedItemIds = [];
				names.forEach(function(n) {
					var eq = get.xjzh_equiped(n);
					if (eq && eq.length > 0) {
						eq.forEach(function(id) {
							if (equippedItemIds.indexOf(id) === -1) {
								equippedItemIds.push(id);
							}
						});
					}
				});
				if (equippedItemIds.length > 0) {
					applyTalentEffects(player, config.craftedBag, equippedItemIds);
				}
			}
			}
		},
		//开局获得增益技能
		"_xjzh_zengyi_addSkills": {
			trigger: {
				global: ["gameStart"],
				player: ["phaseZhunbeiBefore", "enterGame"],
			},
			silent: true,
			filter(event, player) {
				if (game.getExtensionConfig("仙家之魂", "xjzh_zengyiSetting") === 'close') return false;
				if (!player.isUnderControl(true)) return false;
				if (get.mode() == "boss") return game.boss != player;
				if (get.mode() == "xjzh_challenge") return false;
				let list = get.xjzh_zengyiSkills(player);
				if (list.some(skill => player.hasSkill(skill))) return false;
				if (player.hasSkill("xjzh_zengyi_off")) return false;
				if (get.is.playerNames(player, "xjzh_sanguo_zuoyou")) return false;
				return true;
			},
			async content(event, trigger, player) {
				let list = get.xjzh_zengyiSkills(player);
				let skill = list.randomGet();
				game.getExtensionConfig("仙家之魂", "xjzh_zengyiSetting") == "player" ? player.addSkills(skill) : get.isXHwujiang(player) ? player.addSkills(skill) : null;
			},
		},
		//获取角色初始法力值并显示
		"xjzh_skill_showMpCount": {
			trigger: {
				global: ["phaseAfter", "roundStart"]
			},
			direct: true,
			locked: true,
			fixed: true,
			charlotte: true,
			superCharlotte: true,
			unique: true,
			priority: -5,
			filter(event, player, name) {
				if (name == "roundStart") return player.xjzhHuixin > 0.85;
				if (!player.xjzh_hasMpNumber()) return false;
				if (!player.xjzh_getMpData("healing")) return false;
				return !get.xjzh_isMaxMp(player);
			},
			onremove(player, skill) {
				if (player.node.hasOwnProperty("xjzhmp")) player.xjzh_removeMp();
				if (player.isAlive()) {
					game.xjzh_showMp(player, player.storage["xjzh_showMpBool"]);
					player.addSkill(skill);
				}
			},
			async content(event, trigger, player) {
				let num, name = event.triggername;
				if (name == "roundStart") player.xjzhHuixin = 0.85;
				else {
					num = player.xjzhHealing;
					player.xjzh_changeMp(num, true);
				}
			},
		},
		//魔力抵抗技能
		"xjzh_skill_magicResistance": {
			trigger: {
				player: ["damageBegin", "loseHpBegin"]
			},
			forced: true,
			locked: true,
			fixed: true,
			charlotte: true,
			superCharlotte: true,
			unique: true,
			priority: 5,
			filter(event, player) {
				if (!player.xjzh_hasMpNumber()) return false;
				let list = get.xjzh_magicResistance(player, event.num);
				if (list.actualReducedDamage == 0) return false;
				return true;
			},
			async content(event, trigger, player) {
				game.xjzh_magicResistance(event, trigger, player);
			},
		},

		// ---------------------------------------增益技能------------------------------------------//
		"xjzh_zengyi_mieque": {
			trigger: {
				source: "damageBegin1",
				global: "dying",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "灭",
			intro: {
				name: "灭却",
				content: "锁定技，你对其他角色造成伤害时，你令其随机失去等量技能。未拥有技能的其他角色跳过濒死阶段。",
			},
			filter(event, player) {
				let skills = event.player.getSkills(null, false, false).filter(skill => {
					var info = get.info(skill);
					if (!info || get.is.empty(info) || info.charlotte) return false;
					return get.skillInfoTranslation(skill);
				});
				if (event.name == 'damage') return event.player != player && skills.length > 0;
				return event.player != player && skills.length == 0 && event.player.isDying();
			},
			async content(event, trigger, player) {
				if (trigger.name == 'damage') {
					let skills = trigger.player.getSkills(null, false, false).filter(skill => {
						let info = get.info(skill);
						if (!info || get.is.empty(info) || info.charlotte) return false;
						return get.skillInfoTranslation(skill);
					});
					await trigger.player.removeSkills(skills.randomGets(trigger.num));
				}
				else trigger.player.die(trigger.reason)._triggered = null;
			},
		},
		"xjzh_zengyi_weisong": {
			trigger: {
				global: ["phaseZhunbeiBegin"],
			},
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "威",
			intro: {
				name: "威讼",
				content: "其他角色的准备阶段，你可以令其进行一次判定，若为♠，其跳过出牌阶段。",
			},
			check: (event, player) => -get.attitude(player, event.player),
			filter: (event, player) => event.player != player,
			prompt: (event, player) => `〖威讼〗：${get.translation(event.player)}的准备阶段，是否发动【威讼】？`,
			async content(event, trigger, player) {
				const judgeEvent = await player.judge(card => {
					if (get.suit(card) == 'heart') return -2;
					if (get.suit(card) == 'spade') return 2;
					return -1;
				});
				judgeEvent.judge2 = result => result.bool;
				const { result: { judge } } = judgeEvent;
				if (judge < 0) return;
				trigger.player.skip("phaseUse");
			},
		},
		"xjzh_zengyi_liuzhuan": {
			trigger: {
				global: ["loseAfter", "changeSkillsAfter"],
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "流",
			intro: {
				name: "流转",
				content: "锁定技，当其他角色弃置牌或失去技能后，你获得之。",
			},
			filter(event, player, name) {
				if (event.player == player) return false;
				if (event.name == 'changeSkills') {
					return event.removeSkill && event.removeSkill.filter(skill => {
						let info = get.info(skill);
						if (!info || get.is.empty(info) || info.charlotte) return false;
						return get.skillInfoTranslation(skill);
					}).length > 0;
				}
				return event.type === 'discard';
			},
			async content(event, trigger, player) {
				if (trigger.name == 'changeSkills') {
					let skills = trigger.removeSkill.filter(skill => {
						let info = get.info(skill);
						if (!info || get.is.empty(info) || info.charlotte) return false;
						return get.skillInfoTranslation(skill);
					});
					await player.addSkills(skills);
				} else {
					let cards = trigger.cards2.slice(0);
					let evt = trigger.getl(player);
					if (evt && evt.cards) cards.removeArray(evt.cards);
					await player.gain(cards.filter(function (card) {
						return get.position(card, true) == 'd';
					}), 'gain2');
					if (trigger.cards.filterInD().length) await player.gain(trigger.cards.filterInD(), 'gain2');
				}
			},
		},
		"xjzh_zengyi_pianxian": {
			trigger: {
				player: ["useSkillAfter", "logSkill"],
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "翩",
			intro: {
				name: "翩跹",
				content: "锁定技，你“每回合限x次”和“出牌阶段限x次”的技能无次数限制",
			},
			filter(event, player) {
				let skill = event.skill || event.sourceSkill;
				if (skill.startsWith("xjzh_zengyi_pianxian")) return false;
				let skills = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill), str = get.skillInfoTranslation(skill, player);
					if (!info || !info.usable) return false;
					if (typeof info.usable != 'number') return false;
					if (lib.skill.global.includes(skill)) return false;
					if (skill.startsWith('jycw')) return false;
					return ["出牌阶段限", "每回合限"].some(item => str.includes(item));
				});
				return skills.length;
			},
			async content(event, trigger, player) {
				let skills = player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill), str = get.skillInfoTranslation(skill, player);
					if (!info || !info.usable) return false;
					if (typeof info.usable != 'number') return false;
					if (lib.skill.global.includes(skill)) return false;
					if (skill.startsWith('jycw')) return false;
					return ["出牌阶段限", "每回合限"].some(item => str.includes(item));
				});
				for await (let skill of skills) {
					let expandSkills = game.expandSkills([skill]);
					expandSkills.forEach(item => player.getStat('skill')[item] = 0);
				}
			},
		},
		"xjzh_zengyi_zhuanpo": {
			trigger: {
				global: "dying",
			},
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			limited: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "转",
			intro: {
				name: "转魄",
				content: "限定技，当一名角色濒死时，你将其主将替换为任意你选择的武将牌。",
			},
			check(event, player) {
				if (get.attitude(player, event.player) < 4) return false;
				if (player.countCards('h', card => {
					let mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
					if (mod2 != 'unchanged') return mod2;
					let mod = game.checkMod(card, player, event.player, 'unchanged', 'cardSavable', player);
					if (mod != 'unchanged') return mod;
					let savable = get.info(card).savable;
					if (typeof savable == 'function') savable = savable(card, player, event.player);
					return savable;
				}) >= 1 - event.player.hp) return false;
				if (event.player == player || event.player == get.zhu(player)) return true;
				return !player.hasUnknown();
			},
			prompt(event, player) {
				return `〖转魄〗：${get.translation(event.player)}濒死，是否发动技能替换其主将武将牌？`;
			},
			filter(event, player) {
				return !player.storage.xjzh_zengyi_zhuanpo;
			},
			async content(event, trigger, player) {
				player.awakenSkill("xjzh_zengyi_zhuanpo");
				let list = game.xjzh_wujiangpai().filter(name => {
					return !["xjzh_sanguo_zuoyou"].includes(name);
				}).randomGets(30);
				const result = await player.chooseButton(true)
					.set('createDialog', ['〖转魄〗：请选择一张武将牌', [list, 'character']])
					.forResult();
				trigger.player.changeCharacter(result.links);
				trigger.player.recoverTo(trigger.player.maxHp);
			},
		},
		"xjzh_zengyi_daoge": {
			trigger: {
				player: "dieBefore",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "倒",
			intro: {
				name: "倒戈",
				content: "锁定技，当你即将阵亡时，若你的身份为忠臣/反贼且体力上限大于1，你失去一半的体力上限(向下取整)，将身份改为反贼/忠臣，然后终止阵亡结算并回复体力至体力上限，然后若此时满足你所在阵营的胜利条件，你获得胜利。",
			},
			filter(event, player) {
				return player.maxHp > 1 && ["zhong", "fan"].includes(player.identity);
			},
			async content(event, trigger, player) {
				trigger.cancel(null, null, 'notrigger');
				let num = Math.floor(player.maxHp / 2);
				await player.loseMaxHp(num);
				player.recoverTo(player.maxHp);
				var id = player.identity, id2;
				switch (id) {
					case "fan":
						id2 = "zhong";
						break;
					case "zhong":
						id2 = "fan";
						break;
				}
				player.identity = id2;
				player.setIdentity(id2);
				player.showIdentity();
				player.update();
				game.log(player, "发动了技能", "#g〖" + get.translation("xjzh_zengyi_daoge") + "〗", "将身份改为了", "#y" + get.translation(id2));
				if (player.identity == "zhong") {
					if (!game.hasPlayer(current => current.identity == "fan" || current.identity == "nei")) game.over(true);
				}
			},
		},
		"xjzh_zengyi_chongsu": {
			trigger: {
				global: "gameDrawBefore",
				player: "phaseBefore",
			},
			onremove(player, skill) {
				delete player.storage[skill]
			},
			init(player, skill) {
				player.storage[skill] = lib.phaseName;
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "重",
			intro: {
				nocount: true,
				name: "重塑",
				content(content) {
					let list = [
						'准备阶段',
						'判定阶段',
						'摸牌阶段',
						'出牌阶段',
						'弃牌阶段',
						'结束阶段'
					];
					let texts = list.map((stage, index) => {
						let text = `<li>${stage}：`;
						if (get.translation(content[index]) === stage) {
							text += stage;
						} else {
							text += get.translation(content[index]);
						}
						return text;
					});
					return texts.join('');
				},
			},
			prompt: "定义你回合内的阶段",
			async content(event, trigger, player) {
				if (trigger.name == "gameDraw") {
					let list = [];
					for (let i of lib.phaseName) {
						list.add([i, get.translation(i)]);
					}
					for (let i = 0; i < player.storage[event.name].length; i++) {
						let { result } = await player.chooseButton([`###将${get.translation(player.storage[event.name][i])}定义为###${lib.translate.xjzh_zengyi_chongsu_info}`, [list, "tdnodes"]]).set('ai', ({ link }) => {
							let num = Math.random();
							switch (link) {
								case 'phaseZhunbei':
									num = 0;
									break;
								case 'phaseJudge':
									num = 0;
									break;
								case 'phaseDraw':
									num += i < 3 ? 1 : Math.random();
									break;
								case 'phaseUse':
									num += i > 3 ? 1 : Math.random();
									break;
								case 'phaseDiscard':
									num = 0;
									break;
								case 'phaseJieshu':
									num = 0;
									break;
								default:
									num = 0;
									break;
							}
							return num;
						});
						if (!result?.links?.length) break;
						player.storage[event.name][i] = result.links[0];
					}
				} else if (trigger.name == "phase") {
					trigger.phaseList = player.storage[event.name] || lib.phaseName;
				}
			},
		},
		"xjzh_zengyi_shunying": {
			trigger: {
				global: "roundStart",
				player: "phaseZhunbeiBegin",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "瞬",
			intro: {
				name: "瞬影",
				content: "锁定技，每轮游戏开始前，你执行一个额外的回合，其他角色于此回合内非锁定技无效",
			},
			content: async function (event, trigger, player) {
				if (trigger.name == "phase") {
					player.insertPhase('xjzh_zengyi_shunying');
					if (trigger.player != player && !trigger._finished) {
						trigger.finish();
						trigger.untrigger(true);
						trigger._triggered = 5;
						let evt = trigger.player.insertPhase();
						delete evt.skill;
					}
				} else if (trigger.name == "phaseZhunbei") {
					game.players.forEach(current => {
						if (current != player) current.addTempSkill("fengyin");
					});
				}
			},
		},
		"xjzh_zengyi_fengyue": {
			trigger: {
				player: "phaseBegin",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "风",
			intro: {
				name: "风月",
				content: "锁定技，回合开始时，你随机获得一个女性角色的技能。",
			},
			async content(event, trigger, player) {
				let skills = game.xjzh_wujiangpai(null, null, false).filter(name => {
					let obj = get.character(name);
					if (!obj.skills?.length) return false;
					return obj.sex == "female";
				})
					.map(target => get.character(target, 3))
					.flat()
					.filter(skill => {
						let bannedSkillType = ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技", "持恒技", "宗族技", "蓄力技", "阵法技"];
						let info = get.info(skill);
						let skillTypeBool = get.skillCategoriesOf(skill).some(type => bannedSkillType.includes(type));
						if (info?.sub) return false;
						if (!get.skillInfoTranslation(skill)) return false;;
						if (lib.skill.global.includes(skill)) return false;;
						if (player.hasSkill(skill)) return false;
						if (info?.ai?.combo && typeof info.ai.combo === "string") {
							if (!player || (get.itemtype(player) === "player" && !player.hasSkill(info.ai.combo))) return false;
						}
						return true;
					})
					.toUniqued();
				player.addSkillLog(skills.randomGet());
			},
		},
		"xjzh_zengyi_hunqian": {
			enable: "phaseUse",
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "魂",
			intro: {
				name: "魂牵",
				content: "出牌阶段限一次，你可以交换两名角色的手牌、体力、体力上限之一",
			},
			usable: 1,
			filterTarget: true,
			selectTarget: 2,
			multitarget: true,
			multiline: true,
			async content(event, trigger, player) {
				const targets = event.targets.slice(0);
				const controlList = [
					`交换${get.translation(targets[0])}和${get.translation(targets[1])}的体力`,
					`交换${get.translation(targets[0])}和${get.translation(targets[1])}的体力上限`,
					`交换${get.translation(targets[0])}和${get.translation(targets[1])}的手牌`,
				]
				if (targets[0].countCards('h') == 0 && targets[1].countCards('h') == 0) controlList.remove(controlList[2]);
				const { result: { bool, control, index } } = await player.chooseControlList(get.prompt(event.name, player), controlList).set('ai', (card, player, target) => {
					let att = get.attitude(targets[0], player);
					let att2 = get.attitude(targets[1], player);
					if (att > 0) {
						if (targets[0].hp < targets[1].hp) return 1;
						return 0;
					}
					if (att2 > 0) {
						if (targets[1].hp < targets[0].hp) return 1;
						return 0;
					}
					return Math.random();
				}).set('targets', targets);
				if (control != "cancel2") {
					switch (index) {
						case 0: {
							targets[0].hp ^= targets[1].hp;
							targets[1].hp ^= targets[0].hp;
							targets[0].hp ^= targets[1].hp;
							game.log(targets[0], "与", targets[1], "交换了体力值");
						}
							break;
						case 1: {
							targets[0].maxHp ^= targets[1].maxHp;
							targets[1].maxHp ^= targets[0].maxHp;
							targets[0].maxHp ^= targets[1].maxHp;
							game.log(targets[0], "与", targets[1], "交换了体力上限");
						}
							break;
						case 2: {
							targets[0].swapHandcards(targets[1]);
							game.log(targets[0], "与", targets[1], "交换了手牌");
						}
							break;
					};
					targets[0].update();
					targets[1].update();
					player.logSkill("xjzh_zengyi_hunqian", targets);
				}
			},
			ai: {
				order: 10,
				result: {
					player(player, target, card) {
						if (player.hp > target.hp) return target.hp - player.hp;
						if (player.maxHp > target.maxHp) return target.maxHp - player.maxHp;
						if (player.countCards('h') > target.countCards('h')) return target.countCards('h') - player.countCards('h');
						return 0;
					},
					target(player, target, card) {
						if (player == target) return;
						if (player.hp < target.hp) return player.hp - target.hp;
						if (player.maxHp < target.maxHp) return player.maxHp - target.maxHp;
						if (player.countCards('h') < target.countCards('h')) return player.countCards('h') - target.countCards('h');
						return 0;
					}
				},
			},
		},
		"xjzh_zengyi_mengdie": {
			trigger: {
				player: "damageAfter",
			},
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "梦",
			intro: {
				name: "梦蝶",
				content: "当你受到伤害后，你可以令两名角色交换你指定的一个技能",
			},
			prompt: "〖梦蝶〗：选择两个角色交换你指定的一个技能",
			check() { return 1 },
			async content(event, trigger, player) {
				let skills = new Array();
				const result = await player.chooseTarget(2, (card, player, target) => {
					return target.getSkills(null, false, false).filter(skill => {
						let info = lib.skill[skill];
						if (info && (info.cardSkill || info.equipSkill || info.nogainsSkill)) return false;
						return lib.translate[skill] && lib.translate[skill + "_info"];
					}).length;
				})
					.set("prompt", '〖梦蝶〗：选择交换两名角色一个你指定的技能')
					.set('ai', target => Math.random())
					.forResult();
				if (result?.targets) {
					let dialog = [
						'<div class="text center">〖梦蝶〗：请选择交换的技能</div>',
						[result.targets.map(i => get.nameList(i)[0]), 'character']
					], skillList = {};

					for (let target of result.targets) {
						let skills = target.getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (info && info.nogainsSkill) return false;
							return get.skillInfoTranslation(skill);
						});
						skills.forEach(skill => {
							skillList[get.translation(skill)] = skill;
						});
						dialog.push([skills.map(i => get.translation(i)), 'tdnodes']);
					}


					const result2 = await player.chooseButton(dialog)
						.set('complexSelect', true)
						.set('selectButton', 2)
						.set('filterButton', button => {
							let trigger = get.event();
							let skillsOne = trigger.skillsOne;
							let skillsTwo = trigger.skillsTwo;
							let selected = ui.selected.buttons;
							let selectedLinks = selected.map(b => b.link);

							let isOneSelected = skillsOne.includes(button.link);
							let isTwoSelected = skillsTwo.includes(button.link);


							let hasOneSelected = selectedLinks.some(link => skillsOne.includes(link));
							let hasTwoSelected = selectedLinks.some(link => skillsTwo.includes(link));


							if (trigger.playerNames.includes(button.link)) return false;

							if (isOneSelected) return !hasOneSelected;
							if (isTwoSelected) return !hasTwoSelected;

							return !trigger.playerNames.includes(button.link);
						})
						.set("playerNames", result.targets.map(i => get.nameList(i)[0]))
						.set("skillsOne", result.targets[0].getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (info && info.nogainsSkill) return false;
							return get.skillInfoTranslation(skill);
						}).map(i => get.translation(i)))
						.set("skillsTwo", result.targets[1].getSkills(null, false, false).filter(skill => {
							let info = get.info(skill);
							if (info && info.nogainsSkill) return false;
							return get.skillInfoTranslation(skill);
						}).map(i => get.translation(i)))
						.forResult();

					console.log(result2);
					if (result2?.links) {
						let skills = result2.links.map(i => skillList[i]);
						result.targets[0].changeSkills(skills[1], skills[0]);
						result.targets[1].changeSkills(skills[0], skills[1]);
					}
				}
			},
		},
		"xjzh_zengyi_poxiao": {
			trigger: {
				player: "phaseBefore",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "破",
			intro: {
				name: "破晓",
				content: "锁定技，回合开始时，你重置已发动的限定技",
			},
			filter(event, player) {
				let skills = [];
				player.awakenedSkills.forEach(e => {
					skills.push(e);
				});
				return skills.length;
			},
			async content(event, trigger, player) {
				let skills = [];
				player.awakenedSkills.forEach(e => {
					skills.push(e);
				});
				if (skills.length) {
					if (player.storage.xjzh_wzry_tiannaiaudio) game.playXH(['xjzh_wzry_tiannai1', 'xjzh_wzry_tiannai2', 'xjzh_wzry_tiannai3', 'xjzh_wzry_tiannai4'].randomGet());

					skills.forEach(skill => {
						let info = get.info(skill);
						if (info && info.limited && player.awakenedSkills.includes(skill)) {
							player.restoreSkill(skill);
							game.log(player, '恢复了', `<span style="color:#42A5F5;">【${get.translation(skill)}】</span>`);
						}
					});
				}
			},
		},
		"xjzh_zengyi_shuangsheng": {
			trigger: {
				player: "enterGame",
				global: "gameStart",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "双",
			intro: {
				name: "双生",
				content: "锁定技，游戏开始时，你选择并获得至多两个其他增益技能",
			},
			async content(event, trigger, player) {
				let skills = get.xjzh_zengyiSkills(player), cards = []
				for (let i of skills) {
					lib.card[i] = {
						fullskin: false,
						image: "ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
					};
					var info = get.info(i)
					lib.translate[i + "_info"] = info.intro.content;
					if (lib.card[i]) cards.addArray([i]);
				};
				let dialog = ui.create.dialog('〖双生〗：请选择获得至多两个技能', [cards, 'vcard'], 'hidden');
				const result = await player.chooseButton(dialog, true, [1, 2])
					.set('ai', button => Math.random())
					.forResult();
				if (result?.bool) {
					for (let i of skills) {
						delete lib.translate[i + "_info"];
					}
					for (let link of result.links) {
						//for(var i=0;i<result.links.length;i++){
						player.addSkill(link[2]);
						game.log(player, '获得了技能', '#g〖' + get.translation(link[2]) + '〗');
						//添加获得一个动画
						var card = game.createCard("xjzh_zengyi_shuangsheng_card");
						player.$gain2(card);
					}
					player.update();
				}
			},
		},
		"xjzh_zengyi_xuanbian": {
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "玄",
			intro: {
				name: "玄变",
				content: "你获得该技能时，你可以将牌堆牌名相同的一种非装备牌替换为另一种",
			},
			init(player) {
				let next = game.createEvent('xjzh_zengyi_xuanbian_add', false);
				next.player = player;
				next.setContent(lib.skill.xjzh_zengyi_xuanbian.contentList);
			},
			async contentList(event, trigger, player) {
				let list = [];
				for await (let name of lib.inpile) {
					let type = get.type(name);
					if (type != "xjzh_danyao" && type != "equip") list.push(name);
				}
				if (!list.length) return;
				const result = await player.chooseButton(['〖玄变〗：选择至多牌名不一致的牌，先选的牌被替换', [list, 'vcard']])
					.set('ai', button => {
						let card = { name: button.link[2] };
						return 12 - get.value(card);
					})
					.set('complexSelect', true)
					.set('selectButton', [2, 2])
					.set('filterButton', button => {
						if (!ui.selected.buttons.length) return true;
						let selected = ui.selected.buttons;
						for (let i of selected) {
							if (button.link[2] == i.link[2]) return false;
						};
						return true;
					})
					.forResult();
				if (result?.links) {
					let name = result.links[0][2], name2 = result.links[1][2];
					lib.skill.xjzh_zengyi_xuanbian.replaceCard(name, name2);
					player.logSkill("xjzh_zengyi_xuanbian");
					lib.inpile.remove(name);
					game.log(player, "将牌堆所有的", "#y〖" + get.translation(name) + "〗", "替换为了", "#y〖" + get.translation(name2) + "〗");
				}
			},
			async replaceCard(oldCard, newCard) {
				let oldCardList = [], newCardList = [];
				//先替换牌堆的牌
				let cards = Array.from(ui.cardPile.childNodes);
				for (let card of cards) {
					if (get.name(card) == oldCard) {
						oldCardList.push(card);
						newCardList.push(game.createCard2(newCard, get.suit(card), get.number(card)));
					}
				}
				//将弃牌堆的牌替换
				cards = Array.from(ui.discardPile.childNodes);
				for (let card of cards) {
					if (get.name(card) == oldCard) {
						oldCardList.push(card);
						newCardList.push(game.createCard2(newCard, get.suit(card), get.number(card)));
					}
				}
				//将玩家的牌替换
				let targets = game.filterPlayer(current => {
					return current.countCards('hej', card => {
						return get.name(card) == oldCard;
					});
				});
				if (targets.length) {
					while (targets.length) {
						let target = targets.shift();
						cards = target.getCards('hej', card => get.name(card) == oldCard);
						for (let card of cards) {
							target.lose(card, ui.special)._triggered = null;
							target.gain(game.createCard2(newCard, get.suit(card), get.number(card)))._triggered = null;
						}
					}
				}
				game.cardsGotoSpecial(oldCardList);
				game.cardsGotoPile(newCardList);
				game.washCard();
				if (game.shuffleNumber) game.shuffleNumber--;
			},
		},
		"xjzh_zengyi_moran": {
			trigger: {
				player: "useCardToPlayered",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "墨",
			intro: {
				name: "墨染",
				content: "锁定技，你使用黑色牌无法被其他角色响应。",
			},
			filter(event, player) {
				return get.color(event.card) == "black";
			},
			async content(event, trigger, player) {
				trigger.getParent().directHit.add(trigger.target);
			},
			ai: {
				directHit_ai: true,
			},
		},
		"xjzh_zengyi_shenghua": {
			trigger: {
				source: "damageBegin1",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "升",
			intro: {
				name: "升华",
				content: "锁定技，你造成属性伤害+1。",
			},
			filter(event, player) {
				return game.hasNature(event);
			},
			async content(event, trigger, player) {
				trigger.num++;
			},
		},
		"xjzh_zengyi_chaoti": {
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "超",
			intro: {
				name: "超体",
				content: "锁定技，你使用牌无距离和次数限制。",
			},
			mod: {
				targetInRange: (card, player, target) => true,
				cardUsableTarget: (card, player, target) => true,
			},
		},
		"xjzh_zengyi_jinghong": {
			trigger: {
				player: ["phaseDiscardBegin", "phaseJudgeBegin"],
			},
			filter(event, player) {
				if (event.name == "phaseDiscard") return player.needsToDiscard();
				return player.countCards('j');
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "惊",
			intro: {
				name: "惊鸿",
				content: "锁定技，你跳过弃牌阶段和判定阶段。",
			},
			async content(event, trigger, player) {
				trigger.cancel(null, null, 'notrigger');
			},
		},
		"xjzh_zengyi_shefan": {
			trigger: {
				target: 'useCardToTargeted',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "蛇",
			intro: {
				name: "蛇幡",
				content: "锁定技，你成为杀的目标后你与友方各摸一张牌。",
			},
			filter(event, player) {
				return event.card.name == "sha";
			},
			async content(event, trigger, player) {
				let targets = player.getFriends(true).sortBySeat();
				game.asyncDraw(targets, 1)
			},
			ai: {
				effect: {
					target(card, player, target) {
						let num = target.getFriends().sortBySeat().length;
						if (card.name == 'sha') return [num, 0.6];
					},
				},
			},
		},
		"xjzh_zengyi_longfei": {
			trigger: {
				global: 'phaseDrawBegin',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "龙",
			intro: {
				name: "龙飞",
				content: "锁定技，你与友方摸牌阶段摸牌数量+2。",
			},
			filter(event, player) {
				return player.getFriends(true).includes(event.player);
			},
			async content(event, trigger, player) {
				trigger.num += 2
			},
		},
		"xjzh_zengyi_yunchui": {
			trigger: {
				target: 'useCardToTargeted',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "云",
			intro: {
				name: "云垂",
				content: "锁定技，你成为杀的目标时令所有敌方角色弃置一张牌。",
			},
			filter(event, player) {
				return event.card.name == "sha";
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.countCards("he"));
				if (!list.length) return;
				for (let target of list) {
					await target.chooseToDiscard("he", true);
				}
			},
			ai: {
				effect: {
					target(card, player, target) {
						let num = target.getEnemies().sortBySeat().length;
						if (card.name == 'sha') return [num, 0.6];
					},
				},
			},
		},
		"xjzh_zengyi_fengyang": {
			trigger: {
				global: 'useCardToPlayered',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "风",
			intro: {
				name: "风扬",
				content: "锁定技，你与友方成为锦囊牌的目标后摸一张牌。",
			},
			filter(event, player) {
				if (get.type(event.card, "trick") != "trick") return false;
				return player.getFriends(true).includes(event.target);
			},
			async content(event, trigger, player) {
				trigger.target.draw();
			},
			ai: {
				effect: {
					target(card, player, target) {
						if (get.type(card, "trick") == "trick") return [1, 0.6];
					},
				},
			},
		},
		"xjzh_zengyi_dizai": {
			trigger: {
				global: 'phaseEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "地",
			intro: {
				name: "地载",
				content: "锁定技，你与友方回合结束时摸两张牌。",
			},
			filter(event, player) {
				return player.getFriends(true).includes(event.player);
			},
			async content(event, trigger, player) {
				trigger.player.draw(2);
			},
		},
		"xjzh_zengyi_tianfu": {
			trigger: {
				global: 'damageBegin',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "天",
			intro: {
				name: "天覆",
				content: "锁定技，你与友方造成伤害+1。",
			},
			filter(event, player) {
				if (event.numFixed || event.cancelled) return false;
				return player.getFriends(true).includes(event.source);
			},
			async content(event, trigger, player) {
				trigger.num++
			},
			ai: {
				damageBonus: true,
			},
		},
		"xjzh_zengyi_jiehuo": {
			trigger: {
				player: 'phaseEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "火",
			intro: {
				name: "劫火",
				content: "锁定技，你的回合结束时，你随机对场上体力最多的一名敌方造成一点火焰伤害。",
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.isMaxHp());
				if (!list.length) return;
				let target = list.randomGet();
				target.damage(1, "fire", player);
			},
		},
		"xjzh_zengyi_xuanbing": {
			trigger: {
				player: 'phaseBefore',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "冰",
			intro: {
				name: "玄冰",
				content: "锁定技，回合开始时令一名随机敌方角色弃置两张牌。",
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.countCards("he"));
				if (!list.length) return;
				let target = list.randomGet();
				target.chooseToDiscard("he", 2, true);
			},
		},
		"xjzh_zengyi_jifeng": {
			trigger: {
				player: ['phaseEnd', 'phaseBegin'],
			},
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "疾",
			intro: {
				name: "疾风",
				content: "回合开始/结束时你可以视对一名攻击范围内的敌方角色使用一张不计入次数的杀",
			},
			filter(event, player) {
				return player.getEnemies().sortBySeat().filter(target => target.inRangeOf(player)).length;
			},
			prompt: "选择一名角色视为对其使用一张杀",
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.inRangeOf(player));
				if (!list.length) return;
				player.chooseUseTarget({ name: 'sha' }, list, false)
					.set('addCount', false)
					.set('prompt', "选择一名角色视为对其使用一张杀")
					.set('ai', target => get.damageEffect(target, get.player(), get.player(), { name: "sha" }));
			},
		},
		"xjzh_zengyi_jinglei": {
			trigger: {
				player: 'phaseEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "雷",
			intro: {
				name: "惊雷",
				content: "锁定技，回合结束时随机对场上体力最少的一名敌方造成一点雷属性伤害。",
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.isMinHp());
				if (!list.length) return;
				let target = list.randomGet();
				target.damage(1, "thunder", player);
			},
		},
		"xjzh_zengyi_lieshi": {
			trigger: {
				player: 'phaseBegin',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "石",
			intro: {
				name: "裂石",
				content: "锁定技，回合开始时令一名敌方角色弃置所有装备牌。",
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat().filter(target => target.countCards('e'));
				if (list.length) {
					const result = await player.chooseButton(ui.create.dialog('〖裂石〗：选择一名角色弃置其所有装备牌', list))
						.set('ai', button => -get.attitude(player, button.link))
						.forResult();
					if (result?.links) {
						result.links[0].discard(result.links[0].getCards('e'));
					}
				}
			},
		},
		"xjzh_zengyi_lingxu": {
			trigger: {
				player: 'phaseEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "灵",
			intro: {
				name: "灵虚",
				content: "锁定技，回合结束时随机令场上体力最少的一名友方回复一点体力。",
			},
			async content(event, trigger, player) {
				let list = player.getFriends(true).sortBySeat().filter(target => target.isMinHp());
				if (!list.length) return;
				let target = list.randomGet();
				target.recover();
			},
		},
		"xjzh_zengyi_lianyu": {
			trigger: {
				player: 'phaseEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "炼",
			intro: {
				name: "炼狱",
				content: "锁定技，你的回合结束时令场上所有敌方角色失去一点体力。",
			},
			async content(event, trigger, player) {
				let list = player.getEnemies().sortBySeat();
				for (let target of list) {
					await target.loseHp();
				}
			},
		},
		"xjzh_zengyi_raoliang": {
			trigger: {
				global: 'turnOverBegin',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "梁",
			intro: {
				name: "绕梁",
				content: "锁定技，你与友方无法被翻面。",
			},
			filter(event, player) {
				return player.getFriends(true).includes(event.player);
			},
			async content(event, trigger, player) {
				if (!trigger.player.isTurnedOver()) {
					trigger.cancel(null, null, 'notrigger');
				} else {
					trigger.player.turnOver(false);
				}
			},
		},
		"xjzh_zengyi_difu": {
			trigger: {
				global: ['gameDrawBegin', 'dieAfter'],
				player: "enterGame",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "地",
			intro: {
				name: "地缚",
				content: "锁定技，你的下家敌方角色非锁定技失效。",
			},
			filter(event, player) {
				let next = player.getNext();
				if (next) {
					return !next.hasSkill("fengyin") && next.isEnemiesOf(player);
				}
				return false;
			},
			async content(event, trigger, player) {
				let next = player.getNext();
				if (next) {
					if (!next.hasSkill("fengyin") && next.isEnemiesOf(player)) {
						next.addSkill("fengyin");
					}
				}
			},
		},
		"xjzh_zengyi_tianze": {
			trigger: {
				global: ['phaseZhunbeiBegin', 'dieAfter'],
				player: "enterGame",
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "天",
			intro: {
				name: "天择",
				content: "锁定技，你的上家敌方角色非锁定技失效。",
			},
			filter(event, player) {
				let previous = player.getPrevious();
				if (previous) {
					return !previous.hasSkill("fengyin") && previous.isEnemiesOf(player);
				}
				return false;
			},
			async content(event, trigger, player) {
				let previous = player.getPrevious();
				if (previous) {
					if (!previous.hasSkill("fengyin") && previous.isEnemiesOf(player)) {
						previous.addSkill("fengyin");
					}
				}
			},
		},
		"xjzh_zengyi_zhangyi": {
			trigger: {
				player: 'phaseBegin',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "义",
			intro: {
				name: "仗义",
				content: "锁定技，你的回合开始时，弃置所有友方角色判定区的牌。",
			},
			async content(event, trigger, player) {
				let list = player.getFriends(true).sortBySeat().filter(target => target.countCards('j'));
				if (!list.length) return;
				for (let target of list) {
					target.discard(target.getCards("j"));
				}
			},
		},
		"xjzh_zengyi_tunshi": {
			trigger: {
				global: 'dieEnd',
			},
			forced: true,
			locked: true,
			unique: true,
			fixed: true,
			charlotte: true,
			priority: 6,
			firstDo: true,
			superCharlotte: true,
			persevereSkill: true,
			mark: true,
			marktext: "吞",
			intro: {
				name: "吞噬",
				content: "锁定技，其他角色死亡后，你获得其所有技能。",
			},
			filter(event, player) {
				return event.player != player;
			},
			async content(event, trigger, player) {
				let skills = trigger.player.getSkills(null, false, false).filter(skill => {
					let info = get.info(skill);
					return info && !info.charlotte;
				});
				if (skills.length) player.addSkills(skills);
			},
		},
		// ---------------------------------------通用技能------------------------------------------//
		"xjzh_tongyong_viewHandCards": {
			locked: true,
			charlotte: true,
			unique: true,
			ai: {
				viewHandcard: true,
				skillTagFilter(player, tag, arg) {
					if (tag == 'viewHandcard') {
						if (player == arg) return false;
						return true;
					};
				},
			},
		},
		"xjzh_tongyong_baiban": {
			inherit: 'baiban',
			skillBlocker: function (skill, player) {
				if (!player.storage['xjzh_tongyong_baiban'].includes(skill)) return false;
				return !lib.skill[skill].charlotte;
			},
			init: function (player, skill) {
				if (!player.storage[skill]) player.storage[skill] = [];
				player.addSkillBlocker(skill);
			},
			onremove: function (player, skill) {
				player.removeSkillBlocker(skill);
				delete player.storage[skill];
			},
			intro: {
				content: function (storage, player, skill) {
					var list = player.getSkills(null, false, false).filter(function (i) {
						return lib.skill.xjzh_tongyong_baiban.skillBlocker(i, player);
					});
					if (list.length) return '失效技能：' + get.translation(list);
					return '无失效技能';
				},
			},
		},

	},
	translate: {
		"xjzh_zengyi_mieque": "灭却",
		"xjzh_zengyi_weisong": "威讼",
		"xjzh_zengyi_liuzhuan": "流转",
		"xjzh_zengyi_pianxian": "翩跹",
		"xjzh_zengyi_zhuanpo": "转魄",
		"xjzh_zengyi_daoge": "倒戈",
		"xjzh_zengyi_chongsu": "重塑",
		"xjzh_zengyi_shunying": "瞬影",
		"xjzh_zengyi_fengyue": "风月",
		"xjzh_zengyi_hunqian": "魂牵",
		"xjzh_zengyi_mengdie": "梦蝶",
		"xjzh_zengyi_poxiao": "破晓",
		"xjzh_zengyi_shuangsheng": "双生",
		"xjzh_zengyi_xuanbian": "玄变",
		"xjzh_zengyi_moran": "墨染",
		"xjzh_zengyi_shenghua": "升华",
		"xjzh_zengyi_chaoti": "超体",
		"xjzh_zengyi_jinghong": "惊鸿",
		"xjzh_zengyi_shefan": "蛇幡",
		"xjzh_zengyi_longfei": "龙飞",
		"xjzh_zengyi_yunchui": "云垂",
		"xjzh_zengyi_fengyang": "风扬",
		"xjzh_zengyi_dizai": "地载",
		"xjzh_zengyi_tianfu": "天覆",
		"xjzh_zengyi_jiehuo": "劫火",
		"xjzh_zengyi_xuanbing": "玄冰",
		"xjzh_zengyi_jifeng": "疾风",
		"xjzh_zengyi_jinglei": "惊雷",
		"xjzh_zengyi_lieshi": "裂石",
		"xjzh_zengyi_lianyu": "炼狱",
		"xjzh_zengyi_raoliang": "绕梁",
		"xjzh_zengyi_difu": "地缚",
		"xjzh_zengyi_tianze": "天择",
		"xjzh_zengyi_zhangyi": "仗义",
		"xjzh_zengyi_tunshi": "吞噬",
	},
};