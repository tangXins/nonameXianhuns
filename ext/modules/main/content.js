import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';

export async function content(config, pack) {
	if (!config.enable) return false;

	//重置材料
	try {
		if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuReset")) {
			game.xjzh_resetCailiao();
			game.saveExtensionConfig("仙家之魂", "xjzh_qishuReset", true);
			game.xjzh_createToast("奇术要件系统已更新，已为你重置材料背包", 'success');
			//game.reload();
		}
	} catch (e) {
		console.log(e);
	};


	//监听《金庸群侠传》的换UI，以同步替换字体颜色
	const method = lib.announce.subscribe("jy_changeJuesePageColor", (e) => {
		let obj = Object.keys(Object.assign({ ...lib.skill }, { ...lib.card })).filter(name => {
			if (name.startsWith("xjzh_")) return true;
			return false;
		});
		for (let name of obj) {
			if (lib.translate[name + "_info"] && lib.translate[name + "_info"].length > 0) {
				let str = lib.translate[name + "_info"];
				let colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
				let color = e.color;
				let reg = new RegExp(colorx, "g");
				if (str.includes("style='color:")) {
					str = str.replace(colorx ? reg : /"#c06d3b"/g, color);
				};
				lib.translate[name + "_info"] = str;
			}
		}
	});


	//第一次导入本扩展自动开启本扩展所有武将包
	try {
		if (!game.getExtensionConfig("仙家之魂", "xjzh_enableCharacters")) {
			let list = ["XWSG", "XWTR", "XWDM", "XWCS", "XWTZ"];
			for (let i of list) {
				if (!lib.config.characters.includes(i)) {
					game.saveConfig('characters', lib.config.characters.concat(i));
				}
			}
			if (!lib.config.cards.includes('xjzh_Card')) {
				game.saveConfig('cards', lib.config.cards.concat('xjzh_Card'));
			}
			game.saveExtensionConfig("仙家之魂", "xjzh_enableCharacters", true);
			game.reload();
		}
	} catch (e) {
		console.log(e);
	};

	if (!game.getExtensionConfig("仙家之魂", "xjzh_importTips")) {
		game.xjzh_createToast('声明：本扩展（《仙家之魂》）完全免费且开源，到目前为止仅在QQ群697310426、839180892以及1028575505发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。', 'info', 8000);
		game.xjzh_createConfirm("请确保你已仔细阅读以上提示，点击『确定』关闭本提示，点击『取消』将关闭【仙家之魂】扩展",
			// 确定
			() => {
				game.saveExtensionConfig("仙家之魂", "xjzh_importTips", true);
			},
			// 取消
			() => {
				if (game.hasExtension("仙家之魂")) {
					game.xjzh_createToast("你点击了取消，将为你关闭【仙家之魂】扩展", 'warning');
					game.saveExtensionConfig("仙家之魂", "enable", false);
					game.xjzh_createConfirm('是否需要删除【仙家之魂】扩展文件内容？',
						() => {
							game.xjzh_createToast('已为你删除扩展文件', 'success');
							game.removeExtension('仙家之魂', false);
						},
						() => {
							game.xjzh_createToast('你可以在扩展界面或文件管理器中删除本扩展或重新在扩展界面开启本扩展', 'info');
						}
					);
				}
			}
		);
	};
	// ---------------------------------------武将评级------------------------------------------//
	if (lib.rank) {
		let obj = Object.keys(lib.character).filter(name => {
			if (name.startsWith("xjzh_")) return true;
			return false;
		});
		for (let name of obj) {
			let rank;
			/*
			junk
			rare
			epic
			legend
			*/
			if (lib.character[name] && lib.character[name].rank) {
				rank = lib.character[name].rank;
				lib.rank.rarity[rank].addArray([name]);
			}
		};
	}
	// ---------------------------------------显示手牌上限------------------------------------------//
	if (game.getExtensionConfig("仙家之魂", "xjzh_ShowmaxHandcard")) {
		lib.skill._xjzh_ShowmaxHandcard = {
			trigger: {
				global: ['gameStart', 'roundStart'],
			},
			forced: true,
			popup: false,
			silent: true,
			async content(event, trigger, player) {
				var interval = setInterval(() => {
					if (!ui.window.contains(player)) return clearInterval(interval);
					var numh = player.countCards('h');
					var nummh = player.getHandcardLimit();
					if (nummh == Infinity) nummh = '∞';
					player.node.count.innerHTML = numh + '/' + nummh;
				}, 100);
			},
		};
	};

	// ---------------------------------------定义函数------------------------------------------//
	//辅助触发
	//代码借鉴《金庸群侠传》
	get.sourceSkill = function (skill, player) {
		//技能的子技能是个的问题
		if (!lib.skill[skill]) return false;
		if (get.info(skill).sourceSkill) {
			skill = get.info(skill).sourceSkill;
		};
		var skills = player.getSkills(null, false, false);
		var skills2 = skills.slice(0);
		game.expandSkills(skills2);
		var es = player.getSkills('e');
		var es2 = es.slice(0);
		game.expandSkills(es2);
		if (skills.includes(skill)) {
			if (!lib.translate[skill]) return false;
			if (!lib.translate[skill + '_info']) return false;
			if (!lib.translate[skill + '_info'].length) return false;
			if (!lib.skill[skill]) return false;
			if (lib.skill[skill].sub) return false;
			if (lib.skill[skill].charlotte) return false;
			if (lib.skill[skill].nopop) return false;
			if (lib.skill[skill].cardSkill) return false;
			//排除特殊情况获得的卡牌技能
			if (lib.skill[skill].equipSkill) return false;
			//排除特殊情况获得的装备技能
			return {
				playerSkill: true, skill: skill, skills: [skill]
			};
		}
		else if (skills2.includes(skill)) {
			for (var i of skills) {
				var info = get.info(i);
				if (info && info.group) {
					var group = info.group;
					if (typeof info.group == 'string') {
						group = [group];
					}
					if (group.includes(skill)) {
						if (!lib.translate[i]) return false;
						if (!lib.translate[i + '_info']) return false;
						if (!lib.translate[i + '_info'].length) return false;
						if (!lib.skill[i]) return false;
						if (lib.skill[i].sub) return false;
						if (lib.skill[i].charlotte) return false;
						if (lib.skill[i].nopop) return false;
						if (lib.skill[i].cardSkill) return false;
						//排除特殊情况获得的卡牌技能
						if (lib.skill[i].equipSkill) return false;
						//排除特殊情况获得的装备技能
						return {
							playerSkill: true, skill: i, skills: [i]
						};
					};
				};
			};
			return false;
		}
		else if (es.includes(skill)) {
			var equips = player.getCards('e');
			for (var equip of equips) {
				var info = get.info(equip);
				if (info && info.skills) {
					if (info.skills.includes(skill)) {
						return {
							equipSkill: true, skill: skill, skills: info.skills.slice(0), card: equip
						};
					};
				};
			};
			return false;
		}
		else if (es2.includes(skill)) {
			for (var i of es) {
				var info = get.info(i);
				if (info && info.group) {
					var group = info.group;
					if (typeof info.group == 'string') {
						group = [group];
					};
					if (group.includes(skill)) {
						var equips = player.getCards('e');
						for (var equip of equips) {
							var info2 = get.info(equip);
							if (info2 && info2.skills) {
								if (info2.skills.includes(i)) {
									return {
										equipSkill: true, skill: i, skills: info2.skills.slice(0), card: equip
									};
								};
							};
						};
					};
				};
			};
		};
		return false;
	};
	lib.element.player.$logSkill = function (arg, target) {
		var next = game.createEvent('$logSkill', false);
		next.player = this;
		next.skillTag = arg;
		next.skill = arg.skill;
		var item = get.itemtype(target);
		if (item == 'players') {
			next.targets = target;
		}
		else if (item == 'player') {
			next.targets = [target];
		};
		next.setContent(async function () {
			this.trigger('$logSkill');
		});
		return next;
	};
	lib.skill._$logSkill2 = {
		trigger: { player: 'useSkillAfter' },
		direct: true,
		forced: true,
		priority: 99779,
		popup: false,
		filter: function (event, player, name) {
			var info = get.info(event.skill);
			return !info.direct;
		},
		content: function () {
			var targets = (trigger.targets && trigger.targets.length ? trigger.targets : [player]);
			var skill = get.sourceSkill(trigger.skill, player);
			if (skill) player.$logSkill(skill, targets);
		},
	};
	lib.skill._$logSkill = {
		trigger: {
			global: ['gameStart', 'gameDrawBefore'],
			//player:['phaseBefore'],
		},
		direct: true,
		forced: true,
		priority: 99779,
		popup: false,
		filter: function (event, player, name) {
			if (!player._hookTrigger || !player._hookTrigger.includes('_$logSkill')) return true;
			return false;
		},
		content: function () {
			if (!player._hookTrigger) player._hookTrigger = [];
			player._hookTrigger.add('_$logSkill');
		},
		hookTrigger: {
			after: function (event, player, triggername) {
				var info = get.info(event.skill);
				if (info && info.popup && !info.direct) {
					var skill = get.sourceSkill(event.skill, player);
					if (skill) player.$logSkill(skill, player);
				};
				return false;
			},
			log: function (player, name, targets) {
				var skill = get.sourceSkill(name, player);
				if (skill) player.$logSkill(skill, targets || player);
			},
		},
	};

};