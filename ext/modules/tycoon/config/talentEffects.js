import { lib, get, game } from '../../../../../../noname.js';

const talentEffects = {
	// ==================== 强化类天赋 ====================
	"attackUp": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (Math.random() < 0.3) {
					event.damage -= 1;
					if (event.damage < 0) event.damage = 0;
				}
			}
		},
		translate: "破甲",
		translate_info: "锁定技，你造成伤害时有30%概率无视1点护甲。",
	},
	"defenseUp": {
		skill: {
			trigger: { player: "damagedBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (Math.random() < 0.25) {
					event.damage -= 1;
					if (event.damage < 0) event.damage = 0;
				}
			}
		},
		translate: "铁壁",
		translate_info: "锁定技，受到伤害时有25%概率减免1点伤害。",
	},
	"speedUp": {
		skill: {
			trigger: { player: "phaseDrawBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				player.draw(1, 'talent_speed');
			}
		},
		translate: "迅捷",
		translate_info: "锁定技，你的摸牌阶段额外摸1张牌。",
	},
	"hpUp": {
		async init(player) {
			player.changeMaxHp(5, true);
			player.changeHp(5, true);
		},
		translate: "生命强化",
		translate_info: "锁定技，你的体力上限+5，体力+5。",
	},
	"criticalUp": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (Math.random() < 0.2 && !event.noDamage) {
					event.damage *= 2;
				}
			}
		},
		translate: "暴击",
		translate_info: "锁定技，你造成伤害时有20%概率造成双倍伤害。",
	},
	"resistanceUp": {
		skill: {
			trigger: { player: "phaseZhunbeiBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var statusList = player.getStatus('negative');
				statusList.forEach(function(s) {
					if (s.duration) s.duration = Math.max(0, s.duration - 1);
				});
			}
		},
		translate: "抗性",
		translate_info: "锁定技，回合开始时减少所有负面状态1回合持续时间。",
	},
	"piercing": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (event.to) {
					event.to.storage['defense_ignore'] = true;
				}
			}
		},
		translate: "穿透",
		translate_info: "锁定技，你造成的伤害可穿透防具直接作用于目标。",
	},
	"doubleStrike": {
		skill: {
			trigger: { player: "damageEnd" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (event.damage > 0 && !event.chain) {
					if (Math.random() < 0.3) {
						await player.useSkill('xjzh_talentSkills_doubleStrike');
					}
				}
			}
		},
		translate: "连击",
		translate_info: "锁定技，你造成伤害后有30%概率可再次造成1点伤害。",
	},
	"shield": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				player.storage['talent_shield'] = 2;
			}
		},
		translate: "护盾",
		translate_info: "锁定技，每回合开始获得可抵挡2点伤害的护盾。",
	},
	"lifeSteal": {
		skill: {
			trigger: { player: "damageEnd" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (event.damage > 0) {
					player.changeHp(event.damage);
				}
			}
		},
		translate: "吸血",
		translate_info: "锁定技，你造成伤害后恢复等量体力。",
	},
	"jucai": {
		skill: {
			trigger: { player: "phaseDrawBegin" },
			forced: true,
			locked: true,
			priority: 3,
			async content(event, trigger, player) {
				player.draw(1, 'talent_jucai');
			}
		},
		translate: "聚财",
		translate_info: "锁定技，每回合开始时额外摸1张牌。",
	},
	"revive": {
		skill: {
			trigger: { player: "dieBegin" },
			forced: true,
			locked: true,
			priority: 6,
			filter(event, player) {
				return !player.storage['talent_revived'];
			},
			async content(event, trigger, player) {
				player.storage['talent_revived'] = true;
				event.die = false;
				player.changeMaxHp(-Math.floor(player.hpMax * 0.5));
				player.changeHp(Math.floor(player.hpMax * 0.5));
			}
		},
		translate: "复活",
		translate_info: "锁定技，你死亡时有一次复活机会，恢复50%体力。",
	},
	"damageReflect": {
		skill: {
			trigger: { player: "damagedEnd" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (event.damage > 0 && event.from) {
					event.from.changeHp(Math.floor(event.damage * 0.5));
				}
			}
		},
		translate: "反伤",
		translate_info: "锁定技，受到伤害时反弹50%伤害给攻击者。",
	},
	"yonggan": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return player.hp <= player.hpMax / 2;
			},
			async content(event, trigger, player) {
				event.damage += 1;
			}
		},
		translate: "勇敢",
		translate_info: "锁定技，体力低于一半时造成伤害+1。",
	},
	"jingxi": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return player.cards.length >= 2;
			},
			async content(event, trigger, player) {
				if (player.cards.length >= 2) {
					player.draw(1);
					event.damage += 1;
				}
			}
		},
		translate: "精细",
		translate_info: "锁定技，手牌≥2时造成伤害+1。",
	},
	"huazhun": {
		skill: {
			trigger: { player: "phaseDrawBegin" },
			forced: true,
			locked: true,
			priority: 3,
			async content(event, trigger, player) {
				player.draw(1);
			}
		},
		translate: "花准",
		translate_info: "锁定技，摸牌阶段额外摸1张牌。",
	},
	// ==================== 技能类天赋 ====================
	"guanxing": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var card = player.pile.top(1);
				if (card) {
					await player.chooseControl('guanxing_choice', 'xjzh_talentSkills_guanxing', [card], function(card) {
						player.draw(1);
					});
				}
			}
		},
		translate: "观星",
		translate_info: "准备阶段，观看牌堆顶1张牌。",
	},
	"jizhi": {
		skill: {
			trigger: { player: "phaseDiscardEnd" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var card = player.pile.top(1);
				if (card) {
					await player.chooseControl('jizhi_choice', 'xjzh_talentSkills_jizhi', [card], function(card) {
						player.draw(1);
					});
				}
			}
		},
		translate: "集智",
		translate_info: "弃牌阶段结束时观看牌堆顶1张牌并选择获得。",
	},
	"zhengheng": {
		skill: {
			trigger: { player: "phaseUseBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (!player.storage['talent_hengheng_used']) {
					player.storage['talent_hengheng_used'] = true;
					var targets = player.enemies;
					var target = targets.randomGet();
					if (target && target.hp < target.hpMax) {
						target.changeHp(1);
					}
				}
			}
		},
		translate: "制衡",
		translate_info: "锁定技，出牌阶段限一次，可令一名角色恢复1点体力。",
	},
	"gongxin": {
		skill: {
			trigger: { player: "phaseUseBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var enemies = player.enemies;
				enemies.forEach(function(enemy) {
					var hand = enemy.cards;
					if (hand.length > 0) {
						var card = hand.randomGet();
						player.gainCard(card, enemy);
					}
				});
			}
		},
		translate: "攻心",
		translate_info: "锁定技，出牌阶段可获得其他角色一张手牌。",
	},
	"xiezhou": {
		skill: {
			trigger: { player: "useCard" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return get.type(event.card) === 'attack' && event.card.suit && event.card.number;
			},
			async content(event, trigger, player) {
				player.draw(1);
			}
		},
		translate: "协奏",
		translate_info: "锁定技，当你使用普通杀后可以摸一张牌。",
	},
	"tianming": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				await player.chooseControl('tianming_choice', 'xjzh_talentSkills_tianming', [
					{ id: 'draw', label: '摸2张牌' },
					{ id: 'recover', label: '恢复2点体力' }
				], function(choice) {
					if (choice === 'draw') player.draw(2);
					else player.changeHp(2);
				});
			}
		},
		translate: "天命",
		translate_info: "锁定技，每回合开始时选择一项：摸2张牌或恢复2点体力。",
	},
	"wanwuguixin": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				player.draw(2);
				player.changeHp(1);
			}
		},
		translate: "万物归心",
		translate_info: "锁定技，每回合开始时摸2张牌并回复1点体力。",
	},
	"dongcha": {
		skill: {
			trigger: { player: "phaseDrawBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var enemies = player.enemies;
				enemies.forEach(function(enemy) {
					var handCards = enemy.cards;
					if (handCards && handCards.length > 0) {
						player.showCards(enemy, handCards);
					}
				});
			}
		},
		translate: "洞察",
		translate_info: "锁定技，你可以观看其他角色的全部手牌。",
	},
	// ==================== 特殊类天赋 ====================
	"gaoshou": {
		skill: {
			trigger: { player: "phaseDrawBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (player.storage['talent_gaoshou_count'] === undefined) {
					player.storage['talent_gaoshou_count'] = 0;
				}
				player.storage['talent_gaoshou_count']++;
				if (player.storage['talent_gaoshou_count'] % 3 === 0) {
					player.draw(1);
				}
			}
		},
		translate: "高寿",
		translate_info: "锁定技，每3回合额外摸1张牌。",
	},
	"tieshen": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (!player.storage['talent_tieshen_count']) {
					player.storage['talent_tieshen_count'] = 0;
				}
				player.storage['talent_tieshen_count']++;
				if (player.storage['talent_tieshen_count'] >= 3) {
					player.storage['talent_tieshen_count'] = 0;
					player.changeMaxHp(1);
					player.changeHp(1);
				}
			}
		},
		translate: "贴身",
		translate_info: "锁定技，每3回合体力上限+1。",
	},
	"jianru": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				if (player.storage['talent_jianru_stacks'] === undefined) {
					player.storage['talent_jianru_stacks'] = 0;
				}
				player.storage['talent_jianru_stacks']++;
				if (player.storage['talent_jianru_stacks'] >= 3) {
					player.storage['talent_jianru_stacks'] = 0;
					return true;
				}
				return false;
			},
			async content(event, trigger, player) {
				event.damage += 1;
			}
		},
		translate: "渐入",
		translate_info: "锁定技，每3回合造成伤害+1。",
	},
	"fangbian": {
		skill: {
			trigger: { player: "damagedBegin" },
			forced: true,
			locked: true,
			priority: 5,
			filter(event, player) {
				return player.storage['talent_fangbian_ready'] === true;
			},
			async content(event, trigger, player) {
				event.damage -= 1;
				if (event.damage < 0) event.damage = 0;
				player.storage['talent_fangbian_ready'] = false;
			}
		},
		translate: "防变",
		translate_info: "锁定技，回合开始时获得防变状态，下次受伤减免1点。",
	},
	"chonghuan": {
		skill: {
			trigger: { player: "phaseDiscardEnd" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var pileTop = player.pile.top(1);
				if (pileTop && get.type(pileTop) === 'attack') {
					player.gainCard(pileTop);
				}
			}
		},
		translate: "重欢",
		translate_info: "锁定技，弃牌后观看牌堆顶，若是杀则获得。",
	},
	"shengli": {
		skill: {
			trigger: { player: "winEnd" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (player === trigger.player) {
					player.draw(1);
				}
			}
		},
		translate: "胜利",
		translate_info: "锁定技，本局游戏你获得胜利后额外获得1张牌。",
	},
	"xiwang": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				if (player.cards.length === 0) {
					player.draw(2);
				}
			}
		},
		translate: "希望",
		translate_info: "锁定技，手牌为0时回合开始额外摸2张牌。",
	},
	"zhuli": {
		skill: {
			trigger: { player: "phaseZhunbeiBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_zhuli_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_zhuli_used'] = true;
				var targets = player.enemies;
				var target = targets.randomGet();
				if (target) {
					target.draw(1);
				}
			}
		},
		translate: "助力",
		translate_info: "锁定技，准备阶段可令一名角色摸1张牌（每回合限1次）。",
	},
	"huihuang": {
		skill: {
			trigger: { player: "winEnd" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				if (player === trigger.player) {
					player.draw(2);
				}
			}
		},
		translate: "辉煌",
		translate_info: "锁定技，当你的势力获得胜利时，你额外摸2张牌。",
	},
	"diwang": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_diwang_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_diwang_used'] = true;
				var equips = player.getCards('e');
				if (equips && equips.length > 0) {
					player.changeMaxHp(1);
					player.changeHp(1);
				}
			}
		},
		translate: "帝王",
		translate_info: "锁定技，装备防具时体力上限+1（每回合限1次）。",
	},
	"renhe": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var enemies = player.enemies;
				if (enemies.length > 0) {
					var target = enemies.randomGet();
					if (target.hp > 1) {
						target.changeHp(-1);
						player.changeHp(1);
					}
				}
			}
		},
		translate: "任何",
		translate_info: "锁定技，回合开始时选择一名体力>1的敌人造成1伤害并回复1体力。",
	},
	"weibuzu": {
		skill: {
			trigger: { player: "damagedEnd" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return player.hp <= 1;
			},
			async content(event, trigger, player) {
				if (player.hp <= 1) {
					player.changeHp(1);
					event.damage = 0;
				}
			}
		},
		translate: "微不足道",
		translate_info: "锁定技，体力为1时受伤改为回复1体力。",
	},
	"huifu": {
		skill: {
			trigger: { player: "damagedEnd" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_huifu_active'];
			},
			async content(event, trigger, player) {
				if (event.damage > 0) {
					player.storage['talent_huifu_active'] = true;
					var skillId = 'xjzh_talentSkills_huifuShield';
					if (!lib.skill[skillId]) {
						lib.skill[skillId] = {
							trigger: { player: "damagedBegin" },
							forced: true,
							locked: true,
							priority: 6,
							filter: function(e, p) {
								return p.storage['talent_huifu_active'];
							},
							async content(e, t, p) {
								e.damage = 0;
								p.storage['talent_huifu_active'] = false;
								p.removeSkillTrigger(skillId);
								p.removeAdditionalSkill(skillId);
							}
						};
						lib.skill[skillId].charlotte = true;
						lib.skill[skillId].xjzh_talentSkill = true;
						lib.skill[skillId].priority = 6;
						lib.translate[skillId] = '恢复护盾';
						p.addSkills(skillId);
					} else {
						player.addSkills(skillId);
					}
				}
			}
		},
		translate: "恢复",
		translate_info: "锁定技，受伤后免疫下1次伤害。",
	},
	"bianji": {
		skill: {
			trigger: { player: "phaseZhunbeiBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return player.cards.length >= 1;
			},
			async content(event, trigger, player) {
				if (player.cards.length >= 1) {
					var card = player.cards[0];
					player.dropCard(card);
					player.draw(1);
				}
			}
		},
		translate: "辩机",
		translate_info: "锁定技，准备阶段弃置1张牌然后摸1张牌。",
	},

	// ==================== 新增天赋：七杀破军 ====================
	"qisha": {
		skill: {
			trigger: { player: "damageEnd" },
			forced: true,
			locked: true,
			priority: 5,
			filter(event, player) {
				return event.damage > 0 && event.to && event.to.cards && event.to.cards.length > 0;
			},
			async content(event, trigger, player) {
				if (Math.random() < 0.25) {
					await event.to.chooseControl('qisha_discard', 'xjzh_talentSkills_qisha', event.to.cards, function(card) {
						event.to.dropCard(card);
					});
					if (event.to.cards.length > 0) {
						await event.to.chooseControl('qisha_discard2', 'xjzh_talentSkills_qisha', event.to.cards, function(card) {
							event.to.dropCard(card);
						});
					}
				}
			}
		},
		translate: "七杀",
		translate_info: "锁定技，造成伤害后有25%概率令目标弃2张牌。",
	},
	"pojun": {
		skill: {
			trigger: { player: "damageEnd" },
			forced: true,
			locked: true,
			priority: 5,
			filter(event, player) {
				return event.damage > 0 && event.to && event.to.hp > 1;
			},
			async content(event, trigger, player) {
				event.to.changeHp(-1);
				player.changeHp(1);
			}
		},
		translate: "破军",
		translate_info: "锁定技，造成伤害后若目标体力>1，令其再受1点伤害且你回复1点体力。",
	},
	"tanlang": {
		skill: {
			trigger: { player: "damageEnd" },
			forced: true,
			locked: true,
			priority: 5,
			filter(event, player) {
				return event.damage > 0 && event.from && event.from.cards && event.from.cards.length > 0;
			},
			async content(event, trigger, player) {
				if (Math.random() < 0.3) {
					var source = event.from;
					var hand = source.cards;
					if (hand.length > 0) {
						var card = hand.randomGet();
						player.gainCard(card, source);
					}
				}
			}
		},
		translate: "贪狼",
		translate_info: "锁定技，造成伤害后有30%概率获得伤害源的一张手牌。",
	},

	// ==================== 新增天赋：四象 ====================
	"qinglong": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_qinglong_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_qinglong_used'] = true;
				var targets = player.enemies;
				if (targets.length > 0) {
					var target = targets.randomGet();
					target.draw(1);
				}
			}
		},
		translate: "青龙",
		translate_info: "锁定技，每回合开始时令一名敌方角色摸1张牌（每回合限1次）。",
	},
	"zhuque": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_zhuque_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_zhuque_used'] = true;
				var targets = player.enemies;
				if (targets.length > 0) {
					var target = targets.randomGet();
					if (target.hp > 1) {
						target.changeHp(-1);
					}
				}
			}
		},
		translate: "朱雀",
		translate_info: "锁定技，每回合开始时令一名敌方角色失去1点体力（每回合限1次）。",
	},
	"xuanwu": {
		skill: {
			trigger: { player: "damagedBegin" },
			forced: true,
			locked: true,
			priority: 5,
			async content(event, trigger, player) {
				event.damage -= 1;
				if (event.damage < 0) event.damage = 0;
			}
		},
		translate: "玄武",
		translate_info: "锁定技，你受到的伤害恒定-1。",
	},
	"baihu": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				await player.chooseControl('baihu_choice', 'xjzh_talentSkills_baihu', [
					{ id: 'draw', label: '摸2张牌' },
					{ id: 'heal', label: '回复2点体力' }
				], function(choice) {
					if (choice === 'draw') player.draw(2);
					else player.changeHp(2);
				});
			}
		},
		translate: "白虎",
		translate_info: "锁定技，每回合开始时选择一项：摸2张牌或回复2点体力。",
	},

	// ==================== 新增天赋：星辰 ====================
	"ziwei": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				player.draw(1);
				player.changeHp(1);
			}
		},
		translate: "紫微",
		translate_info: "锁定技，每回合开始时摸1张牌并恢复1点体力。",
	},
	"taiyin": {
		skill: {
			trigger: { player: "phaseEnd" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				player.draw(1);
			}
		},
		translate: "太阴",
		translate_info: "锁定技，回合结束时摸1张牌。",
	},
	"taiyang": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 3,
			async content(event, trigger, player) {
				player.draw(1);
			}
		},
		translate: "太阳",
		translate_info: "锁定技，每回合开始时摸1张牌。",
	},
	"tianmiAlt": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_tianmi_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_tianmi_used'] = true;
				var topCards = player.pile.top(2);
				if (topCards && topCards.length >= 2) {
					await player.chooseControl('tianmi_view', 'xjzh_talentSkills_tianmi', topCards, function(card) {
						player.gainCard(card);
					});
				}
			}
		},
		translate: "天机",
		translate_info: "锁定技，每回合开始时观看牌堆顶2张牌并选择获得1张（每回合限1次）。",
	},

	// ==================== 新增天赋：谋略 ====================
	"wenqu": {
		skill: {
			trigger: { player: "phaseUseBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_wenqu_used'] && player.cards.length >= 1;
			},
			async content(event, trigger, player) {
				player.storage['talent_wenqu_used'] = true;
				var hand = player.cards;
				if (hand.length > 0) {
					var card = hand.randomGet();
					if (get.type(card) === 'attack') {
						await player.useCard(card);
					}
				}
			}
		},
		translate: "文曲",
		translate_info: "锁定技，每回合可额外使用1张普通杀。",
	},
	"wuqu": {
		skill: {
			trigger: { player: "damageBegin" },
			forced: true,
			locked: true,
			priority: 5,
			filter(event, player) {
				return event.card && get.type(event.card) === 'attack' && event.card.suit && event.card.number;
			},
			async content(event, trigger, player) {
				if (Math.random() < 0.3) {
					event.damage += 1;
				}
			}
		},
		translate: "武曲",
		translate_info: "锁定技，使用普通杀造成伤害时有30%概率伤害+1。",
	},
	"lianzhen": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return player.cards.length >= 3;
			},
			async content(event, trigger, player) {
				player.draw(1);
			}
		},
		translate: "廉贞",
		translate_info: "锁定技，手牌≥3时每回合开始额外摸1张牌。",
	},
	"tianfu": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			async content(event, trigger, player) {
				var newCard = game.createCard('sha_red');
				if (!newCard) newCard = game.createCard('sha');
				if (newCard) {
					player.gain(newCard);
				}
			}
		},
		translate: "天府",
		translate_info: "锁定技，每回合开始时获得1张普通杀。",
	},
	"tianquan": {
		skill: {
			trigger: { player: "phaseReadyBegin" },
			forced: true,
			locked: true,
			priority: 4,
			filter(event, player) {
				return !player.storage['talent_tianquan_used'];
			},
			async content(event, trigger, player) {
				player.storage['talent_tianquan_used'] = true;
				var targets = player.enemies;
				if (targets.length > 0) {
					var target = targets.randomGet();
					var hand = target.cards;
					if (hand.length > 0) {
						var card = hand.randomGet();
						target.dropCard(card);
					}
				}
			}
		},
		translate: "天权",
		translate_info: "锁定技，每回合开始时令一名敌人弃1张牌（每回合限1次）。",
	},
};

// ==================== 工具函数 ====================

export function getTalentEffect(talentId) {
	return talentEffects[talentId];
}

export function getTalentByTranslate(translateName) {
	for (var id in talentEffects) {
		if (talentEffects[id].translate === translateName) {
			return { id: id, def: talentEffects[id] };
		}
	}
	return null;
}

function toCamelCase(str) {
	return str.replace(/_([a-z])/g, function(m, c) {
		return c.toUpperCase();
	});
}

export function registerTalentSkill(player, talentId, talentDef) {
	var skillId = 'xjzh_talentSkills_' + toCamelCase(talentId);

	if (!lib.skill[skillId] && talentDef.skill) {
		lib.skill[skillId] = Object.assign({}, talentDef.skill);
		lib.skill[skillId].charlotte = true;
		lib.skill[skillId].xjzh_talentSkill = true;
		lib.skill[skillId].superCharlotte = true;
		lib.skill[skillId].nobracket = true;
		lib.skill[skillId].locked = true;
		lib.skill[skillId].unique = true;
		if (lib.skill[skillId].priority === undefined) {
			lib.skill[skillId].priority = 5;
		}
		lib.translate[skillId] = talentDef.translate;
		lib.translate[skillId + '_info'] = talentDef.translate_info;
		if (!lib.skill[skillId].onremove) {
			lib.skill[skillId].onremove = function(p, s) {
				if (!p.hasSkill(s)) p.addSkills(s);
			};
		}
	}

	if (talentDef.init) {
		try { talentDef.init(player); } catch(e) {}
	}

	if (!player.hasSkill(skillId)) {
		player.addSkills(skillId);
	}
}

export function applyTalentEffects(player, craftedBag, equippedItemIds) {
	if (!craftedBag || !Array.isArray(craftedBag)) return;

	var equippedSet = {};
	if (equippedItemIds && Array.isArray(equippedItemIds)) {
		equippedItemIds.forEach(function(id) {
			equippedSet[id] = true;
		});
	}

	var talentsToApply = [];
	craftedBag.forEach(function(c) {
		if (c.talents && Array.isArray(c.talents)) {
			if (equippedItemIds && equippedItemIds.length > 0) {
				if (!equippedSet[c.id]) return;
			}
			c.talents.forEach(function(t) {
				if (talentsToApply.indexOf(t) === -1) {
					talentsToApply.push(t);
				}
			});
		}
	});

	var applied = {};
	talentsToApply.forEach(function(talentName) {
		if (applied[talentName]) return;
		applied[talentName] = true;

		var found = getTalentByTranslate(talentName);
		if (!found) return;

		registerTalentSkill(player, found.id, found.def);
	});
}

export { talentEffects };