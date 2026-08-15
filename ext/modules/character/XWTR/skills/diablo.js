import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const diabloSkills = {
	//暗黑破坏神
	"xjzh_diablo_hunhuo": {
		trigger: {
			global: ["dieAfter", "dying"],
		},
		forced: true,
		locked: true,
		fixed: true,
		unique: true,
		charlotte: true,
		superCharlotte: true,
		priority: 3,
		firstDo: true,
		mark: true,
		notemp: true,
		forceDie: true,
		marktext: "死亡之书",
		intro: {
			name: "死亡之书",
			mark(dialog, storage, player) {
				let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo"), hunhuoList;
				if (!list || list.size == 0) return "没有灵魂!";
				if (player.isUnderControl(true)) hunhuoList = list.get("isPlayer");
				else hunhuoList = list.get("isAi");
				if (!hunhuoList?.length) return "没有灵魂!";
				dialog.addText(`共有${get.cnNumber(hunhuoList?.length)}个灵魂`);
				dialog.addSmall([hunhuoList, 'character']);
			},
			content(storage, player) {
				let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo"), hunhuoList;
				if (!list || list.size == 0) return "没有灵魂!";
				if (player.isUnderControl(true)) hunhuoList = list.get("isPlayer");
				else hunhuoList = list.get("isAi");
				if (!hunhuoList?.length) return "没有灵魂!";
				return `共有${get.cnNumber(hunhuoList?.length)}个灵魂`;
			},
			markcount(storage, player) {
				let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo"), hunhuoList;
				if (!list || list.size == 0) return 0;
				if (player.isUnderControl(true)) hunhuoList = list.get("isPlayer");
				else hunhuoList = list.get("isAi");
				if (!hunhuoList?.length) return 0;
				return hunhuoList?.length;
			},
		},
		derivation: ["xjzh_diablo_haoling"],
		bannedType: ["Charlotte", "主公技", "觉醒技", "限定技", "隐匿技", "使命技", "持恒技"],
		async getSkillList(player) {
			if (!player.hasSkill('xjzh_diablo_hunhuo')) {
				player.removeAdditionalSkill('xjzh_diablo_hunhuo');
				return;
			}
			let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
			if (!list || list.size == 0) return;
			let skills = lib.skill.xjzh_diablo_hunhuo.derivation.slice(0);
			let hunhuoList = player.isUnderControl(true) ? list.get("isPlayer") : list.get("isAi");
			for await (let target of hunhuoList) {
				if (!lib.character[target]) continue;
				if (!lib.character[target]?.skills?.length) continue;
				let getSkills = lib.character[target].skills.slice(0);
				skills.add(getSkills.filter(skill => {
					if (!get.skillInfoTranslation(skill)) return false;
					if (lib.skill.global.includes(skill)) return false;
					if (player.hasSkill(skill)) return false;
					if (get.skillCategoriesOf(skill, player).some(type => lib.skill["xjzh_diablo_hunhuo"].bannedType.includes(type))) return false;
					return true;
				}).randomGet());
			}
			if (skills.length) player.addAdditionalSkill('xjzh_diablo_hunhuo', skills);
		},
		async removeStorage(player) {
			let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
			if (!list || list.size == 0) return;
			if (!lib.config.characters.includes('Beijijinqu')) return;
			let characters = Object.keys(lib.characterPack['Beijijinqu']), hunhuoList = [...list.get("isPlayer"), ...list.get("isAi")];
			if (characters && characters.some(item => hunhuoList.includes(item))) {
				game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo", new Map([
					["isAi", []],
					["isPlayer", []],
				]));
				alert('检测到你的死灵之书内存在非法武将，已为你重置存档，游戏即将在3s后重启');
				setTimeout(function () {
					game.reload();
				}, 3000);
			}
		},
		init(player, skill) {
			if (!game.getExtensionConfig("仙家之魂", skill)) {
				game.saveExtensionConfig("仙家之魂", skill, new Map([
					["isAi", []],
					["isPlayer", []],
				]));
			}
			lib.skill.xjzh_diablo_hunhuo.removeStorage(player);
			lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
		},
		filter(event, player, name) {
			if (!get.is.playerNames(player, "xjzh_diablo_lamasi")) return false;
			if (name == "dieAfter") {
				if (event.player == player) return false;
				if (event.source != player) return false;
				if (event.player.isAlive()) return false;
				return true;
			}
			if (event.name == "dying") {
				let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
				let createList = player.isUnderControl(true) ? list.get("isPlayer") : list.get("isAi");
				if (event.player != player) return false;
				if (!createList.length) return false;
				return true;
			}
			return false;
		},
		group: ["xjzh_diablo_hunhuo_use"],
		async content(event, trigger, player) {
			let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo"), name = event.triggername;
			if (name == "dieAfter") {
				let names = get.nameList(trigger.player), characters = Object.keys(lib.characterPack['Beijijinqu']);
				if (characters && characters.some(item => names.includes(item))) return;
				player.isUnderControl(true) ? list.get("isPlayer").addArray(names) : list.get("isAi").addArray(names);
				game.log(player, "将" + get.translation(trigger.player) + "的灵魂收入了死亡之书");
				lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
			}
			else if (name == "dying" && trigger.player == player) {
				if (!list || list.size == 0) return;
				let createList = player.isUnderControl(true) ? list.get("isPlayer") : list.get("isAi");
				createList = createList.filter(name => {
					if (game.hasPlayer(current => get.is.playerNames(current, name))) return false;
					return true;
				});
				if (!createList.length) return;
				const result = await player.chooseButton(true)
					.set('ai', button => get.rank(button.link, true))
					.set('createDialog', ['请选择一个灵魂与你交换身体', [createList, 'character']])
					.forResult();

				let newPairs = result.links
				if (get.mode() == "xjzh_challenge") {
					let addSkills = [];
					newPairs.forEach(name => {
						addSkills.addArray(
							get.character(name).skills.filter(skill => {
								const info = get.info(skill);
								if (!info || (info.zhuSkill && !player.isZhu2())) return false;
								return true;
							})
						);
					});
					await player.changeSkills(addSkills, []);
				} else {
					await player.changeCharacter(newPairs);
					player.maxHp = lib.character[newPairs[0]].maxHp;
					await player.removeSkill(event.name, true);
				}

				//createList.removeArray(links);
				player.recoverTo(player.maxHp);
				//player.reinit(get.nameList(player).find(item=>item.includes("xjzh_diablo_lamasi")),links[0],[player.maxHp,player.maxHp]);
				lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
			}
			player.updateMarks(event.name, true);
			game.saveExtensionConfig("仙家之魂", event.name, list);
		},
		ai: {
			notemp: true,
		},
		subSkill: {
			"use": {
				enable: "phaseUse",
				usable: 1,
				sub: true,
				filterTarget(card, player, target) {
					return target.isDead() && target?.side;
				},
				filter(event, player) {
					let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
					if (!list || list.size == 0) return false;
					let createList = player.isUnderControl(true) ? list.get("isPlayer") : list.get("isAi");
					createList = createList.filter(name => {
						if (game.hasPlayer(current => get.is.playerNames(current, name))) return false;
						return true;
					});
					if (!createList.length) return false;
					return game.dead.length;
				},
				deadTarget: true,
				async content(event, trigger, player) {
					let target = event.targets[0], list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
					let createList = player.isUnderControl(true) ? list.get("isPlayer") : list.get("isAi");
					createList = createList.filter(name => {
						if (game.hasPlayer(current => get.is.playerNames(current, name))) return false;
						return true;
					});
					const result = await player.chooseButton()
						.set('createDialog', ['〖魂火〗：请选择一副灵柩将其唤醒至场上为你作战', [createList, 'character']])
						.set("ai", button => get.rank(button.link, true))
						.forResult();
					if (result?.links) {
						target.revive(null, true);

						target.changeCharacter(result.links);
						target.maxHp = lib.character[result.links[0]].maxHp;
						target.recoverTo(target.maxHp);
						target.directgain(get.cards(2));

						let id = player.identity;
						if (player == get.zhu(player)) {
							target.identity = "zhong";
							target.setIdentity("zhong");
							target.showIdentity();
						} else {
							target.identity = id;
							target.setIdentity(id);
							target.showIdentity();
						}

						target.addSkill("xjzh_diablo_shibao");

						_status.huanxing = true;
						game.log(player, "唤醒了" + get.translation(target) + "的灵魂");
					}
				},
				async contentAfter(event, trigger, player) {
					if (_status.huanxing) {
						event.targets[0].$huanxing();
						delete _status.huanxing;
					}
				},
				ai: {
					order: 8,
					expose: 0.8,
					result: {
						player: 1,
					},
				},
			},
		},
	},
	"xjzh_diablo_haoling": {
		enable: "phaseUse",
		locked: true,
		charlotte: true,
		usable: 1,
		prompt: "〖号令〗：选择一名被你唤醒且正面朝上的角色",
		check: () => 1,
		deadTarget: true,
		filterTarget(card, player, target) {
			if (player == target) return false;
			if (!ui.selected.targets.length) return true;
			let bool = target.classList.contains("huanxing");
			if (ui.selected.targets.length == 1 && !bool) return true;
			return false;
		},
		selectTarget: 2,
		filter(event, player) {
			return game.countPlayer(current => current.classList.contains("huanxing"));
		},
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			let targets = event.targets;
			await targets[0].draw();
			let cards = targets[0].getCards("h", card => {
				return get.is.damageCard(card) && targets[0].hasUseTarget(card);
			});
			if (!cards.length) return;

			targets[0].chooseToUse((card, player, event) => {
				return get.is.damageCard(card);
			}, true, `〖号令〗：请选择对${targets[1]}使用的一张手牌`)
				.set("targetRequired", true)
				.set("complexSelect", true)
				.set("filterTarget", function (card, player, target) {
					if (target != get.event().source && !ui.selected.targets.includes(get.event().source)) return false;
					return lib.filter.targetEnabled.apply(this, arguments);
				})
				.set("source", targets[1])
				.set("addCount", false);

			player.insertPhase();
		},
		ai: {
			order: 12,
			expose: 0.5,
			threaten: 3,
			result: {
				target: 2,
			},
		}
	},
	"xjzh_diablo_shibao": {
		trigger: {
			player: "dieEnd",
			global: ["phaseAfter",]
		},
		forceDie: true,
		direct: true,
		priority: -10,
		lastDo: true,
		filter(event, player) {
			if (event.name == "die") {
				let list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
				if (!list || list.size == 0) return false;
				return ["isAi", "isPlayer"].some(key => get.nameList(player).some(item => list.get(key).includes(item)));
			}
			if (event.name == "phase") {
				let target = game.findPlayer(current => get.is.playerNames(current, "xjzh_diablo_lamasi"));
				if (!target) return false;
				let id = target.identity;
				if (target == get.zhu(target)) {
					if (player.identity == "zhong") return false;
				}
				return player.identity != id;
			}
			return false;
		},
		async content(event, trigger, player) {
			let list = [player.getPrevious(), player.getNext()];
			for await (let target of list) {
				if (get.is.playerNames(target, "xjzh_diablo_lamasi")) continue;
				target.damage("nosource", "nocard");
			}
			player.die()._triggered = null;
		},
	},
	"xjzh_diablo_luanshe": {
		trigger: {
			player: "useCard2",
		},
		forced: true,
		locked: true,
		priority: 3,
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (get.name(event.cards[0], player) != "sha") return false;
			return game.hasPlayer(current => player.canUse("sha", current) && current != event.targets[0] && current != player);
		},
		async content(event, trigger, player) {
			let targets = game.filterPlayer(current => player.canUse("sha", current) && current != trigger.targets[0] && current != player);
			let target = targets.randomGet();

			trigger.targets.add(target);
			//trigger.targets.sort(()=>Math.random()-0.5);
			game.log(target, "成为此【杀】的额外目标");
			/*player.when({source:"damageAfter"})
			.assign({
				firstDo:true,
			})
			.filter(()=>{
				if(event.name!="xjzh_diablo_luanshe") return false;
				if(event.player!=player) return false;
				return true;
			})
			.then(()=>{
				trigger.player.xjzh_changeBuff('mumang',1);
			});*/
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					if (get.name(card, player) != "sha") return;
					let targets = game.filterPlayer(current => player.canUse("sha", current) && current != target && current != player), num = 0
					for (let name of targets) {
						if (player.isFriendsOf(name)) num++;
					}
					if (num > targets.length - num) return 0.2;
					return 1.5;
				},
			},
		},
	},
	"xjzh_diablo_jingshe": {
		trigger: {
			player: "useCard2",
		},
		forced: true,
		locked: true,
		priority: -3,
		filter(event, player) {
			if (!event.cards || !event.cards.length) return false;
			if (get.name(event.cards[0], player) != "sha") return false;
			if (!event.targets || !event.targets.length) return false;
			if (event.targets.length == 1) return false;
			let targets = event.targets.slice(0);
			if (targets.every(item => get.xjzh_buffNum(item, 'yishang') >= get.xjzh_buffInfo('yishang', 'limit'))) return false;
			return true;
		},
		async content(event, trigger, player) {
			const result = await player.chooseTarget((card, player, target) => {
				let trigger = get.event().getTrigger()
				return get.xjzh_buffNum(target, 'yishang') < get.xjzh_buffInfo('yishang', 'limit') && target != player && trigger.targets.includes(target);
			})
				.set("prompt", "〖劲射〗：选择一名角色令其获得1层易伤")
				.set('ai', target => -get.attitude(player, target))
				.forResult();
			if (result?.targets) {
				result.targets[0].xjzh_changeBuff('yishang', 1);
			};
		},
	},
	"xjzh_diablo_guanzhu": {
		trigger: {
			player: "drawAfter",
		},
		frequent: true,
		locked: false,
		group: ["xjzh_diablo_guanzhu_use", "xjzh_diablo_guanzhu_damage"],
		mod: {
			cardUsable(card, player, num) {
				if (!card.cards) return;
				let natureList = ["fire", "ice", "poison"];
				if (["jiu", "sha"].includes(get.name(card, player))) {
					if (card.cards.some(card => natureList.some(item => card.hasGaintag(`eternal_xjzh_diablo_guanzhu_${item}`)))) return true;
				}
			},
		},
		filter(event, player) {
			let natureList = ["fire", "ice", "poison"];
			if (!player.countCards("h", card => get.is.damageCard(card))) return false;
			if (!event.result.some(card => get.is.damageCard(card))) return false;
			if (player.countCards("h", card => natureList.some(item => card.hasGaintag(`eternal_xjzh_diablo_guanzhu_${item}`))) == player.countCards("h", card => get.is.damageCard(card))) return false;
			return true;
		},
		async content(event, trigger, player) {
			let cards = player.getCards('h', card => get.is.damageCard(card));

			player.storage[event.name] = {};

			let guanzhuObject = {
				"冰霜灌注": "ice",
				"火焰灌注": "fire",
				"毒素灌注": "poison"
			}
			let list = Object.keys(guanzhuObject).map((i, index) => [index, i]);
			let dialog = ["〖灌注〗：请选择为你的卡牌添加灌注效果", [list, 'tdnodes']];

			dialog.push('<div class="text center">选择至多2张[伤害]牌</div>');

			dialog.push([cards, 'vcard']);

			const result = await player.chooseButton(dialog)
				.set('complexSelect', true)
				.set('filterButton', button => {
					const { number, other } = ui.selected.buttons.reduce((acc, { link }) => {
						const type = typeof link === 'number' ? 'number' : 'other';
						return { ...acc, [type]: acc[type] + 1 };
					}, { number: 0, other: 0 });

					const isNumber = typeof button.link === 'number';
					if (isNumber && number >= 1) return false;
					if (!isNumber && other >= 2) return false;
					return true;
				})
				.set('selectButton', [2, Infinity])
				.forResult();

			if (!result?.links) return;

			let num = result.links.find(i => Number.isFinite(i));
			let selectCards = result.links.filter(i => !Number.isFinite(i));
			let nature = Object.values(guanzhuObject)[num];

			let natureList = ["fire", "ice", "poison"];
			cards.forEach(card => natureList.forEach(item => card.removeGaintag(`eternal_xjzh_diablo_guanzhu_${item}`)));

			player.addGaintag(selectCards, `eternal_xjzh_diablo_guanzhu_${nature}`);
			player.storage[event.name] = { nature: result.links };
		},
		subSkill: {
			"ice": { sub: true },
			"fire": { sub: true },
			"poison": { sub: true },
			"damage": {
				trigger: { source: "damageBegin1" },
				forced: true,
				priority: -1,
				sub: true,
				filter(event, player) {
					let natureList = ["fire", "ice", "poison"];
					if (natureList.some(item => event.card.cards[0].hasGaintag(`eternal_xjzh_diablo_guanzhu_${item}`))) return true;
					return false;
				},
				async content(event, trigger, player) {
					let card = trigger.card;
					let natureList = ["fire", "ice", "poison"];
					let gaintag = card.cards[0].gaintag.find(item => natureList.some(tag => item.includes(`eternal_xjzh_diablo_guanzhu_${tag}`)));
					let nature = gaintag.slice(28);
					game.setNature(trigger, nature, true);
					switch (nature) {
						case "ice": {
							trigger.player.xjzh_changeBuff('binghuan', 1);
						}
							break;
						case "fire": {
							trigger.player.xjzh_changeBuff('ranshao', 1);
						}
							break;
						case "poison": {
							trigger.player.xjzh_changeBuff('zhongdu', 1);
						}
							break;
					}
				},
			},
			"use": {
				trigger: { player: "useCardBefore" },
				forced: true,
				priority: -1,
				sub: true,
				filter(event, player) {
					let natureList = ["fire", "ice", "poison"];
					if (natureList.some(item => event.card.cards[0].hasGaintag(`eternal_xjzh_diablo_guanzhu_${item}`))) return true;
					return false;
				},
				async content(event, trigger, player) {
					if (get.type(trigger.card) == "basic") {
						let name = get.name(trigger.card);
						trigger.set("addCount", false);
						let stat = player.getStat();
						if (stat && stat.card && stat.card[name]) stat.card[name]--;
					}
					player.when({ player: "useCardAfter" })
						.assign({
							firstDo: true,
						})
						.filter(evt => {
							let natureList = ["fire", "ice", "poison"];
							return natureList.some(item => evt.card.cards[0].hasGaintag(`eternal_xjzh_diablo_guanzhu_${item}`));
						})
						.then(() => {
							let evt = event.getParent('useCard');
							let card = evt.card;
							let natureList = ["fire", "ice", "poison"];
							let gaintag = card.cards[0].gaintag.find(item => natureList.some(tag => item.includes(`eternal_xjzh_diablo_guanzhu_${tag}`)));
							card.cards[0].removeGaintag(gaintag);
						});
				},
			},
		},
	},
	"xjzh_diablo_sushe": {
		trigger: {
			player: "useCard",
		},
		forced: true,
		locked: true,
		priority: 3,
		filter(event, player) {
			return get.name(event.card) == "sha";
		},
		async content(event, trigger, player) {
			let num = get.rand(1, 2);
			trigger.effectCount += num;
			game.log(trigger.card, '额外结算' + num + '次');
		},
	},
	"xjzh_diablo_yingbi": {
		enable: "phaseUse",
		usable: 1,
		filter(event, player) {
			return get.xjzh_deEffect(player) || game.countPlayer(current => current.inRangeOf(player));
		},
		async content(event, trigger, player) {
			await game.xjzh_clearRestraint(player);
			let targets = game.filterPlayer(current => current.inRangeOf(player));
			if (targets.length) {
				for (let target of targets) target.xjzh_changeBuff('yishang', 1);
			}
			player.draw(targets.length);
		},
		ai: {
			order: 12,
			result: {
				player(player, target, card) {
					if (get.xjzh_deEffect(player)) return 1;
					return game.countPlayer(current => current.inRangeOf(player));
				},
			},
		},
	},
	"xjzh_diablo_jianyu": {
		enable: "phaseUse",
		skillAnimation: "epic",
		animationColor: "thunder",
		animationStr: "箭雨",
		filter(event, player) {
			return !game.xjzh_hasCoolTime(player, "xjzh_diablo_jianyu");
		},
		coolTime: 120,
		async content(event, trigger, player) {
			let names = get.nameList(player), bool = false;
			if (names.some(name => game.xjzh_hasEquiped("xjzh_qishu_hakankouyu", name))) bool = true;
			await player.useCard({ name: 'wanjian', isCard: true }, game.filterPlayer(current => current != player), false).set("effectCount", bool && Math.random() <= 0.3 ? 2 : 1);
		},
		async contentAfter(event, trigger, player) {
			let skill = get.sourceSkillFor(event.getParent());
			let names = get.nameList(player), bool = false;
			if (names.some(name => game.xjzh_hasEquiped("xjzh_qishu_hakankouyu", name))) bool = true;
			let num = bool == true ? 42.5 : 0;
			game.xjzh_addCoolTime(player, skill, lib.skill[skill].coolTime, num);
		},
		ai: {
			order: 8,
			result: {
				player(player, target, card) {
					let targets = player.getFriends(), targets2 = player.getEnemies();
					return targets2.length >= targets.length ? 1 : 0.5;
				},
			},
		},
	},
	"xjzh_diablo_shilue": {
		trigger: {
			player: "useCard",
		},
		forced: true,
		locked: true,
		priority: 3,
		init(player) {
			player.addSkill("xjzh_skill_magicResistance");
		},
		async content(event, trigger, player) {
			let bool = get.nameList(player).filter(name => game.xjzh_hasEquiped("xjzh_qishu_linghunlaoyin", name)).length ? true : false;
			let num = get.rand(1, 5) * (bool && get.type(trigger.card) === "basic" ? 5 : 1);
			if (!get.xjzh_isMaxMp(player)) player.xjzh_changeMp(num);

			if (!bool || get.xjzh_isMaxMp(player)) return;
			if (Math.random() <= 0.05 * (1 + player.xjzhHuixin)) {
				player.xjzh_changeMp(get.xjzh_consumeMp(player));
				game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复魔力至魔力上限`);
			}
		},
		ai: {
			threaten: 0.8,
		},
	},
	"xjzh_diablo_shihua": {
		trigger: {
			player: "xjzh_changeMp",
		},
		forced: true,
		locked: true,
		priority: 10,
		filter(event, player) {
			return event.num > 0;
		},
		async content(event, trigger, player) {
			player.draw();
		},
	},
	"xjzh_diablo_jufeng": {
		trigger: {
			global: "damageAfter",
		},
		forced: true,
		locked: false,
		priority: 10,
		powerDrain: 45,
		async content(event, trigger, player) {
			if (get.xjzh_buffNum(trigger.source, 'yishang') <= 0) player.draw();
			if (trigger.source == player) {
				let powerDrain = lib.skill.xjzh_diablo_jufeng.powerDrain;
				let num = Math.round(powerDrain * (1 - player.xjzhReduce));
				if (get.xjzh_buffNum(trigger.player, 'yishang') >= get.xjzh_buffInfo('yishang', 'limit') || player.xjzh_getMp() < num || !player.xjzh_hasMpNumber()) return;
				const result = await player.chooseBool()
					.set("ai", () => -get.attitude(get.player(), get.event().getParent(3).player))
					.set("prompt", `〖飓风〗：是否消耗${num}点魔力令${get.translation(trigger.player)}获得1层易伤？`)
					.forResult();
				if (result?.bool) {
					player.xjzh_changeMp(-num);
					trigger.player.xjzh_changeBuff('yishang', 1);
				}
			}
		},
		ai: {
			expose: 0.5,
			result: {
				player(player, target) {
					if (target == player) return 0;
					let num = get.xjzh_buffNum(target, 'yishang') || 1;
					let att = get.attitude(player, target);
					return num * -att;
				},
			},
		},
	},
	"xjzh_diablo_leibao": {
		enable: "phaseUse",
		powerDrain: 45,
		filter(event, player) {
			let powerDrain = lib.skill.xjzh_diablo_leibao.powerDrain;
			let num = Math.round(powerDrain * (1 - player.xjzhReduce));
			return player.xjzh_getMp() >= num;
		},
		async content(event, trigger, player) {
			let powerDrain = lib.skill.xjzh_diablo_leibao.powerDrain;
			let num = Math.round(powerDrain * (1 - player.xjzhReduce));
			if (Math.random() > 0.3 * (1 + player.xjzhHuixin)) {
				game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，该技能发动不消耗魔力`);
			} else {
				player.xjzh_changeMp(-num);
			}

			let yishangTargets = game.filterPlayer(current => current != player && (get.xjzh_buffNum(current, 'yishang') > 0));
			if (!yishangTargets.length) {
				const result = await player.chooseTarget((card, player, target) => {
					return get.xjzh_buffNum(target, 'yishang') < get.xjzh_buffInfo('yishang', 'limit') && target != player;
				})
					.set("prompt", "〖雷暴〗：选择一名角色令其获得1层易伤")
					.set('ai', target => -get.attitude(player, target))
					.forResult();
				if (result?.targets) {
					result.targets[0].xjzh_changeBuff('yishang', 1);
				}
			} else {
				for await (let target of yishangTargets) {
					target.damage(1, 'nocard', player, 'thunder');
				}
			}
		},
		ai: {
			order: 12,
			expose: 0.5,
			result: {
				player(player, target, card) {
					let yishangTargets = game.filterPlayer(current => current != player && (get.xjzh_buffNum(current, 'yishang') > 0));
					return yishangTargets.length ? 1 : 0.5;
				},
			},
		},
	},
	"xjzh_diablo_zhongou": {
		trigger: {
			player: "useCardToPlayer",
		},
		mod: {
			selectTarget(card, player, range) {
				let type = get.is.damageCard(card);
				if (!get.is.damageCard(card)) return
				range[1] = 1;
			},
		},
		filter: (event, player) => get.is.damageCard(event.card),
		level: 1,
		powerDrain: 35,
		forced: true,
		locked: false,
		xjzh_xiongrenSkill: true,
		async content(event, trigger, player) {
			await player.addTempSkill('unequip', 'useCardAfter');
			event.qianggu = false;
			if (player.getStat('damage')) {
				let num = Math.round(lib.skill.xjzh_diablo_zhongou.powerDrain * (1 - player.xjzhReduce)), level = lib.skill.xjzh_diablo_zhongou.level;
				let qianggu = get.nameList(player).filter(name => game.xjzh_hasEquiped("xjzh_qishu_wuyan", name)).length ? true : false;
				if (player.xjzh_getMp() >= num || qianggu == true) {
					const result = await player.chooseBool()
						.set("prompt", `〖重欧〗：是否消耗${num}灵力获得${level}点护甲和强固点体力值`)
						.set('ai', () => true)
						.forResult();
					if (result?.bool) {
						player.xjzh_changeMp(qianggu == false ? num : -num);
						player.changeHujia(level);
						player.xjzh_changeBuff('qianggu', level);
					}
				}
				if (Math.random() <= 0.25 * (1 + player.xjzhHuixin)) {
					trigger.target.xjzh_changeBuff('jiansu', 1);
					game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层减速`);
				}
			}
		},
	},
	"xjzh_diablo_fensui": {
		trigger: {
			player: ["useCard", "phaseBefore"],
			source: "damageBegin",
		},
		forced: true,
		locked: true,
		xjzh_dadiSkill: true,
		level: 1,
		priority: 2,
		mark: true,
		marktext: "碎",
		intro: {
			name: "粉碎",
			content(storage, player) {
				let num = player.countMark("xjzh_diablo_fensui");
				if (num == 0 || !num) return;
				if (num >= 6) return "你下一次造成伤害必定暴击";
				return get.translation(num);
			},
		},
		filter: function (event, player, name) {
			if (name == "phaseBefore") return true;
			if (name == "damageBegin") return player.countMark("xjzh_diablo_fensui") >= 6;
			if (!event.cards || !event.cards.length) return false;
			if (["delay", "equip"].includes(get.type(event.cards[0]))) return false;
			return player.isHealthy();
		},
		async content(event, trigger, player) {
			if (event.triggername == "phaseBefore") player.addMark("xjzh_diablo_fensui", 1, false);
			else if (event.triggername == "damageBegin") {
				trigger.num *= 2;
				player.clearMark("xjzh_diablo_fensui", false);
				if (Math.random() <= 0.5 * (1 + player.xjzhHuixin)) {
					trigger.player.turnOver(true);
					game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}被眩晕`);
				}
			} else {
				trigger.effectCount++
				game.log(trigger.card, "额外结算一次");
			}
		},
	},
	"xjzh_diablo_duguan": {
		trigger: {
			source: "damageBegin",
		},
		filter(event, player) {
			if (player.xjzh_getMp() < 25) return false;
			return true;
		},
		async content(event, trigger, player) {
			if (!game.hasNature(trigger) || !game.hasNature(trigger, "poison")) game.setNature(trigger, "poison", false);
			let huixin = player.xjzhHuixin;
			if (get.xjzh_buffNum(player, 'zhongdu') > 0) huixin += 0.5;
			if (Math.random() > 0.33 * (1 + huixin)) player.xjzh_changeMp(-25);
			else game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，该技能不消耗魔力`);
			if (Math.random() <= 0.25 * (1 + huixin)) {
				trigger.player.xjzh_changeBuff('zhongdu', 1);
				game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层中毒`);
			}
		},
	},
	"xjzh_diablo_xianjing": {
		enable: "phaseUse",
		usable: 1,
		mark: true,
		marktext: "陷",
		intro: {
			name: "剧毒陷阱",
			mark(dialog, storage, player) {
				if (!storage) return;
				if (player.isUnderControl(true)) dialog.addAuto([storage, 'vcard']);
			},
		},
		init(player, skill) {
			if (!player.storage[skill]) player.storage[skill] = [];
		},
		onremove(player, skill) {
			if (player.storage[skill]?.length) delete player.storage[skill];
		},
		group: "xjzh_diablo_xianjing_gain",
		async content(event, trigger, player) {
			let cards = Array.from(ui.cardPile.childNodes).filter(card => !player.storage[event.name].includes(card));
			if (!cards.length) return;
			let card = cards.randomGets(Math.ceil(cards.length / 100)), dialog = ui.create.dialog('hidden', [card, 'vcard']);
			player.chooseControl('ok').set('dialog', dialog);
			player.storage[event.name].addArray(card);
			await game.cardsGotoPile(card, () => ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)]);
			player.updateMarks("xjzh_diablo_xianjing");
			game.updateRoundNumber();
		},
		subSkill: {
			"gain": {
				trigger: {
					global: "gainAfter",
				},
				forced: true,
				priority: 1,
				filter(event, player) {
					if (!event.cards || !event.cards.length) return false;
					return event.cards.some(item => player.storage.xjzh_diablo_xianjing.includes(item));
				},
				async content(event, trigger, player) {
					if (trigger.player != player) trigger.player.xjzh_changeBuff('zhongdu', get.xjzh_buffInfo("zhongdu", 'limit'));
					if (Math.random() <= 0.3 * (1 + player.xjzhHuixin)) {
						player.xjzh_changeMp(25);
						game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复25点魔力`);
					}
					let storage = player.storage.xjzh_diablo_xianjing, cards = trigger.cards.filter(card => storage.includes(card));
					if (Math.random() <= 0.2 * (1 + player.xjzhHuixin)) {
						player.draw(2);
						player.gain(cards, 'gain2', "log");
						game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}摸两张牌并获得了${get.translation(cards)}`);
					}
					storage.removeArray(cards);
				},
			},
		},
		ai: {
			order: 12,
			result: {
				player: 1,
			},
		},
	},
	"xjzh_diablo_baolu": {
		trigger: {
			source: "damageBegin1",
		},
		forced: true,
		priority: 1,
		locked: true,
		filter(event, player) {
			if (get.xjzh_buffNum(event.player, "zhongdu") > 0) return true;
			return false;
		},
		async content(event, trigger, player) {
			game.setNature(trigger, 'poison', false);
			trigger.num++;
			if (Math.random() <= 0.25 * (1 + player.xjzhHuixin)) {
				player.useSkill("xjzh_diablo_xianjing", player);
				game.log(player, `因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}发动了技能<span style="color: yellow;">〖${get.translation("xjzh_diablo_xianjing")}〗</span>`);
			}
		},
	},


};