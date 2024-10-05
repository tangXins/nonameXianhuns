import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills={
	"xjzh_boss_shilian_intro":{sub:true,nobracket:true,unique:true},
	"xjzh_qishu_shouyu":{
		mod:{
			targetEnabled(card){
				if(get.type(card)=='delay') return false;
			},
		},
		trigger:{
			global:"phaseZhunbeiBegin",
		},
		forced:true,
		locked:true,
		priority:3,
		filter(event,player){
			if(event.player==player) return false;
			let cards=lib.inpile.filter(card=>{
				return get.type(card)=="delay";
			});
			if(event.player.countCards("j",card=>{
				return cards.includes(card.name);
			})==cards.length) return false;
			return true;
		},
		async content(event,trigger,player){
			let cards=lib.inpile.filter(card=>{
				return get.type(card)=="delay"&&!trigger.player.countCards('j',{name:card});
			});
			if(cards.length){
				trigger.player.executeDelayCardEffect(cards.randomGet());
			}
		},
	},
	"xjzh_qishu_shendong":{
		trigger:{
			source:"damageBegin1",
		},
		forced:true,
		locked:true,
		priority:3,
		filter(event,player){
			return !game.hasNature(event,"ice");
		},
		async content(event,trigger,player){
			game.setNature(trigger,"ice");
		},
		subSkill:{
			"use":{
				enable:"phaseUse",
				usable:1,
				prompt(){
					return "〖深冻〗：选择一名对你造成过伤害的角色，令其弃置x张牌，每少弃置一张牌失去一点体力上限（x为其对你造成伤害的次数）。";
				},
				filter(event,player){
					let history=player.getAllHistory('damage');
					return history.length;
				},
				filterTarget(card,player,target){
					return target.getAllHistory('sourceDamage',evt=>{
						return evt&&evt.player==player;
					}).length;
				},
				async content(event,trigger,player){
					let target=event.targets[0];
					let history=target.getAllHistory('sourceDamage',evt=>{
						return evt&&evt.player==player;
					});
					let history2=player.getAllHistory('damage',evt=>{
						return evt&&evt.source==target;
					});
					const [bool,cards]=await target.chooseToDiscard('he',`〖深冻〗：请选择弃置至多${history.length}张牌，否则失去等量体力上限`).set('ai',card=>{
						return 6-get.value(card);
					}).forResult('bool','cards');
					if(bool&&cards.length<history.length){
						target.loseMaxHp(cards.length-history.length);
						await target.getHistory('sourceDamage').removeArray(history);
						await player.getHistory('damage').removeArray(history2);
					}
				},
			},
		},
	},
	"xjzh_qishu_feimou":{
		trigger:{
			player:"damageEnd",
		},
		forced:true,
		locked:true,
		priority:3,
		filter(event,player){
			if(event.source==player) return false;
			return event.source.countCards('h');
		},
		async content(event,trigger,player){
			let cards=trigger.source.getCards('h');
			player.gain(cards,trigger.source,'draw');
			let num=get.rand(0,cards.length);
			if(num>0){
				let card=cards.randomRemove(num);
				trigger.source.gain(card,player,'draw');
			}
		},
		ai:{
			maixie:true,
			maixie_hp:true,
		},
	},
	"xjzh_boss_shilian":{
		trigger:{
			global:'gameStart',
			player:"enterGame",
		},
		forced:true,
		popup:false,
		unique:true,
		fixed:true,
		charlotte:true,
		content:function(){
			"step 0"
			if(game.boss==game.me){
				player.say("试炼关卡不允许玩家为boss，本次不消耗材料");
				game.over(false);
			}
			"step 1"
			player.smoothAvatar();
			player.init('xjzh_boss_datianshi');
			_status.noswap=true;
			game.addVideo('reinit2',player,player.name);
			"step 2"
			game.delay();
			"step 3"
			game.boss.changeSeat(6);
			"step 4"
			game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
			game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
		},
	},
	"xjzh_boss_shilian2":{
		trigger:{player:'dieBegin'},
		forced:true,
		priority:-10,
		fixed:true,
		unique:true,
		filter:function(event,player){
			if(get.mode()!='boss') return false;
			return event.player==game.boss;
		},
		content:function(){
			'step 0'
			let list=["xjzh_boss_yinaruisi","xjzh_boss_masayier","xjzh_boss_taernasha"];
			if(!list.filter(name=>{
				return get.is.playerNames(current,name);
			}).length) trigger.cancel(null,null,'notrigger');
			'step 1'
			game.delay();
			"step 2"
			if(get.is.playerNames(game.boss,"xjzh_boss_datianshi")){
				game.changeBoss('xjzh_boss_gaotianshi');
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_gaotianshi")){
				game.changeBoss('xjzh_boss_tianshizhang');
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_tianshizhang")){
				if(get.xjzh_checkTime("8:00","12:00")||get.xjzh_checkTime("20:00","24:00")){
					game.changeBoss('xjzh_boss_yinaruisi');
				}
				else if(get.xjzh_checkTime("12:00","16:00")||get.xjzh_checkTime("0:00","4:00")){
					game.changeBoss('xjzh_boss_masayier');
				}
				else{
					game.changeBoss('xjzh_boss_taernasha');
				}
			}
			for(var i=0;i<game.players.length;i++){
				game.players[i].hp=game.players[i].maxHp;
				game.players[i].update();
			}
			game.delay(0.5);
			"step 3"
			if(get.is.playerNames(game.boss,"xjzh_boss_gaotianshi")){
				game.changeBossFellow("xjzh_boss_datianshi");
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_tianshizhang")){
				game.changeBossFellow('xjzh_boss_gaotianshi');
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_yinaruisi")){
				game.changeBossFellow("xjzh_boss_tianshizhang");
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_masayier")){
				var targets=game.filterPlayer(function(current){return current.identity=="zhong"});
				if(targets.length){
					if(targets.length>=2){
						for(var i=0;i<targets.length;i++){
							if(i==0){
								game.changeBossFellow("xjzh_boss_duohunzhe",targets[i]);
							}else{
								game.changeBossFellow("xjzh_boss_duotianshi",targets[i]);
							}
						}
					}else{
						if(targets.length==1){
							game.changeBossFellow("xjzh_boss_duohunzhe");
							var num=targets[0].dataset.position;
							if(num==5){
								game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
							}else{
								game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
							}
						}else{
							game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
							game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
						}
					}
				}
			}
			else if(get.is.playerNames(game.boss,"xjzh_boss_taernasha")){
				game.changeBossFellow("xjzh_boss_shachong");
			}
			"step 4"
			var dnum=0;
			var dead=game.dead.slice(0);
			for(var i=0;i<dead.length;i++){
				if(!dead[i].side&&dead[i].maxHp>0&&dead[i].parentNode==player.parentNode){
					dead[i].revive(dead[i].maxHp);
					dnum++;
				}
			}
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].side) continue;
				game.players[i].removeEquipTrigger();
				var hej=game.players[i].getCards('hej');
				for(var j=0;j<hej.length;j++){
					hej[j].discard(false);
				}
				game.players[i].hp=game.players[i].maxHp;
				game.players[i].hujia=0;
				game.players[i].classList.remove('turnedover');
				game.players[i].removeLink();
				game.players[i].directgain(get.cards(4-dnum));
			}
			"step 5"
			while(_status.event.name!='phaseLoop'){
				_status.event=_status.event.parent;
			}
			game.resetSkills();
			_status.paused=false;
			_status.event.player=game.boss;
			_status.event.step=0;
			_status.roundStart=game.boss;
			game.phaseNumber=0;
			game.roundNumber=0;
			if(game.bossinfo){
				game.bossinfo.loopType=1;
			}
		}
	},
	"xjzh_boss_shenghui":{
		trigger:{
			player:"phaseDrawBegin",
		},
		forced:true,
		locked:true,
		priority:5,
		content:function(){
			trigger.num+=2;
			player.recover();
		},
	},
	"xjzh_boss_shenghui2":{
		trigger:{
			player:["phaseDrawBegin","phaseJieshuBegin"],
		},
		forced:true,
		locked:true,
		priority:5,
		content:function(){
			player.chooseDrawRecover(2,2,true,"〖圣辉〗：请选择摸两张牌或回复两点体力")._triggered=null;
		},
	},
	"xjzh_boss_chiyan":{
		enable:"phaseUse",
		usable:1,
		filterTarget:lib.filter.notMe,
		selectTarget:1,
		content:function(){
			"step 0"
			target.showHandcards();
			var cards=target.getCards('h',card=>get.suit(card)=="diamond");
			if(cards.length){
				var cards=cards.slice(0);
				while(cards.length){
					cards.shift();
					player.useCard({name:"sha",nature:"fire",isCard:true},target);
					game.delay();
				}
			}
			"step 1"
			if(player.getStat('damage')){
				var players=player.getFriends(true).sortBySeat();
				for(var i of players) i.recover();
			   }
		},
		ai:{
			order:12,
			result:{
				target:-1,
			},
		},
	},
	"xjzh_boss_shenghui3":{
		trigger:{
			player:["drawBegin","recoverBegin"],
		},
		forced:true,
		locked:true,
		priority:5,
		filter(event,player){
			if(event.name=="recover"){
				return game.countPlayer(current=>current.isDamaged())>=1;
			}
			return true;
		},
		async content(event,trigger,player){
			let num=trigger.num;
			const targets=await player.chooseTarget(`〖圣辉〗：请选择一名其他角色${trigger.name=="draw"?`摸${num}张牌`:`回复${num}点体力`}`,lib.filter.notMe).set('ai',target=>get.attitude(player,target)).forResultTargets();
			if(targets) targets[0][trigger.name](num);
			player.changeHujia(1);
		},
	},
	"xjzh_boss_caijue":{
		enable:"phaseUse",
		usable:1,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		content:function(){
			"step 0"
			var targets=player.getEnemies().sortBySeat();
			event.targets=targets.slice(0);
			"step 1"
			event.target=event.targets.shift();
			"step 2"
			if(event.target.countCards('h')==0){
				event.goto(1);
				event.finish();
				return;
			}
			else if(event.target.countCards('h')==1) event._result={cards:event.target.getCards('h')};
			else event.target.chooseCard(true).ai=function(card){
				if(_status.event.getRand()<0.5) return Math.random();
				return get.value(card);
			};
			"step 3"
			event.target.showCards(result.cards).setContent(function(){});
			event.dialog=ui.create.dialog(get.translation(event.target)+'展示的手牌',result.cards);
			event.videoId=lib.status.videoId++;
			game.broadcast('createDialog',event.videoId,get.translation(event.target)+'展示的手牌',result.cards);
			game.addVideo('cardDialog',null,[get.translation(event.target)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
			event.card2=result.cards[0];
			game.log(event.target,'展示了',event.card2);
			event._result={};
			player.chooseToDiscard('he',{suit:get.suit(event.card2)},`〖裁决〗：请弃置一张花色为${get.translation(get.suit(event.card2))}的牌`,function(card){
				var evt=_status.event.getParent();
				if(get.damageEffect(evt.target,evt.player,evt.player,'thunder')>0){
					return 6.2+Math.min(4,evt.player.hp)-get.value(card,evt.player);
				}
				return -1;
			}).set('prompt',false);
			game.delay(2);
			"step 4"
			if(result.bool){
				event.target.damage(1,player,'thunder','nocard');
				player.draw();
			}
			event.dialog.close();
			game.addVideo('cardDialog',null,event.videoId);
			game.broadcast('closeDialog',event.videoId);
			"step 5"
			if(event.targets.length){
				event.goto(1);
			}
		},
		ai:{
			order:8,
			result:{
				player(player,target,card){
					if(!player) return;
					var ts=player.getEnemies().length;
					var hs=player.countCards('h');
					if(hs<ts) return 0.5;
					if(hs>=ts){
						if(hs==ts) return 0.8;
						if(hs>ts) return 1;
						if(hs>ts+2) return 1.5;

					}
					return 0;
				},
			},
		},
	},
	"xjzh_boss_shenghui4":{
		trigger:{
			player:["phaseDiscardBefore","useCard"],
		},
		forced:true,
		locked:true,
		priority:5,
		filter:function(event,player){
			if(event.name=="phaseDiscard") return true;
			if(event.name=="useCard") return player.isPhaseUsing();
			return false;
		},
		content:function(){
			if(trigger.name=="phaseDiscard"){
				trigger.cancel(null,null,'notrigger');
			}else{
				var num=player.getDamagedHp();
				var num2=1;
				if(player.hasSkill("xjzh_boss_caijue2_on")){
					[num,num2]=[num2,num];
				}
				if(get.type(trigger.card)=="basic"){
					trigger.effectCount+=num;
					if(num>0) game.log(trigger.card,'额外结算'+num+'次');
				}
				else if(get.type(trigger.card)=="trick"){
					trigger.effectCount+=num2;
					if(num2>0) game.log(trigger.card,'额外结算'+num2+'次')
				}
			}
		},
	},
	"xjzh_boss_caijue2":{
		enable:"phaseUse",
		usable:1,
		filter:function(event,player){
			return player.countCards('h')>0;
		},
		group:"xjzh_boss_caijue2_damage",
		content:function(){
			"step 0"
			player.chooseCard(true,'he',`〖裁决〗：请展示一张牌`);
			"step 1"
			player.showCards(result.cards).setContent(function(){});
			event.dialog=ui.create.dialog(get.translation(player)+'展示的手牌',result.cards);
			event.videoId=lib.status.videoId++;
			game.broadcast('createDialog',event.videoId,get.translation(player)+'展示的手牌',result.cards);
			game.addVideo('cardDialog',null,[get.translation(player)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
			   event.card2=result.cards[0];
			game.log(player,'展示了',event.card2);
			event._result={};
			"step 2"
			var targets=player.getEnemies().sortBySeat();
			event.targets=targets.slice(0);
			"step 3"
			event.target=event.targets.shift();
			event.target.chooseToDiscard(1,'he','〖裁决〗：请弃置一张牌',{suit:get.suit(event.card2)},function(card){
				var evt=_status.event.getParent();
				if(get.damageEffect(evt.target,evt.player,evt.target,'thunder')>0){
					return 6.2+Math.min(4,evt.player.hp)-get.value(card,evt.player);
				}
				return -1;
			}).set('prompt',false);
			game.delay(2);
			"step 4"
			if(!result.bool){
				event.target.damage(1,player,'thunder','nocard');
				player.draw();
			}
			event.dialog.close();
			game.addVideo('cardDialog',null,event.videoId);
			game.broadcast('closeDialog',event.videoId);
			"step 5"
			if(event.targets.length){
				event.goto(3);
			}
		},
		subSkill:{
			"damage":{
				trigger:{
					source:"damageAfter",
				},
				popup:false,
				sub:true,
				prompt:"〖裁决〗：是否转换〖圣辉〗中的数字",
				check:function(event,player){
					player.getCardUsable
					if(player.isHealthy()){
						if(player.getCardUsable("sha")>0&&player.hasUsableCard("sha")&&!player.hasSkill("xjzh_boss_caijue2_on")) return 0;
						return 1;
					}
					return 1;
				},
				content:function(){
					if(player.hasSkill("xjzh_boss_caijue2_on")) player.removeSkill("xjzh_boss_caijue2_on",true);
					else player.addSkill("xjzh_boss_caijue2_on");
				},
			},
		},
		"on":{sub:true,charlotte:true,},
		ai:{
			order:8,
			result:{
				player:1,
			},
		},
	},
	"xjzh_boss_shenyou":{
		locked:true,
		charlotte:true,
		global:["xjzh_boss_shenyou_use","xjzh_boss_shenyou_damage"],
		subSkill:{
			"use":{
				trigger:{
					target:"useCardToTargeted",
				},
				forced:true,
				preHidden:true,
				sub:true,
				filter:function(event,player){
					if(!get.tag(event.card,'damage')) return false;
					if(!game.boss.getFriends(true).includes(player)) return false;
					return get.xjzh_deEffect(player);
				},
				content:function(){
					"step 0"
					var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
					trigger.player.chooseToDiscard('〖神佑〗：弃置一张手牌，否则'+get.translation(trigger.card)+'对'+get.translation(player)+'无效').set('ai',function(card){
						if(_status.event.eff>0){
							return 10-get.value(card);
						}
						return 0;
					}).set('eff',eff);
					"step 1"
					if(result.bool==false){
						trigger.getParent().excluded.add(player);
					}
				},
				ai:{
					effect:{
						"target_use":function(card,player,target,current){
							if(get.tag(card,'damage')&&get.attitude(player,target)<0){
								if(!game.boss.getFriends(true).includes(target)) return;
								if(!get.xjzh_deEffect(target)) return;
								if(_status.event.name=='xjzh_boss_shenyou_use') return;
								if(get.attitude(player,target)>0&&current<0) return 'zerotarget';
								var bs=player.getCards('h');
								bs.remove(card);
								if(card.cards) bs.removeArray(card.cards);
								else bs.removeArray(ui.selected.cards);
								if(!bs.length) return 'zerotarget';
								if(player.hasSkill('jiu')||player.hasSkill('tianxianjiu')) return;
								if(bs.length<=2){
									for(var i=0;i<bs.length;i++){
										if(get.value(bs[i])<7){
											return [1,0,1,-0.5];
										}
									}
									return [1,0,0.3,0];
								}
								return [1,0,1,-0.5];
							}
						},
					},
				},
			},
			"damage":{
				trigger:{
					player:"damageBegin1",
				},
				forced:true,
				priority:3,
				sub:true,
				filter:function(event,player){
					if(get.xjzh_deEffect(player)) return false;
					if(!game.boss.getFriends(true).includes(player)) return false;
					if(!game.hasNature(event)) return false;
					return true;
				},
				content:function(){
					trigger.changeToZero();
				},
			},
			ai:{
				effect:{
					target:function(card,player,target){
						if(!game.boss.getFriends(true).includes(target)) return;
						if(!get.xjzh_deEffect(target)) return;
						if(get.tag(card,'natureDamage')) return [0,0];
					},
				},
			},
		},
	},
	"xjzh_boss_fusu":{
		trigger:{
			player:"loseAfter",
			global:["useCardEnd","recoverEnd"],
		},
		forced:true,
		locked:true,
		priority:5,
		filter(event,player){
			if(event.name=="lose"&&event.cards.some(card=>get.color(card)=="red")) return true;
			if(_status.currentPhase==player) return false;
			if(event.player==player) return false;
			if(event.player.isDead()) return false;
			if(event.name=="useCard"){
				if(!event.cards||!event.cards.length) return false;
				if(get.suit(event.cards[0])!="heart") return false;
			}
			return true;
		},
		async content(event,trigger,player){
			if(trigger.name=="lose"){
				if(player.isHealthy()) player.draw();
				else player.recover();
			}else{
				const bool=await player.chooseBool(`〖复苏〗：是否视为对${get.translation(trigger.player)}使用一张【杀】`).set('ai',()=>{return -get.attitude(player,trigger.player);}).forResultBool();
				if(bool){
					let cards=game.createCard("sha",null,null,null);
					await player.useCard(cards,trigger.player,false);
					let history=player.getHistory('sourceDamage',evt=>{
						return evt&&evt.cards[0]==cards&&evt.getParent(3).name=="xjzh_boss_fusu"&&evt.player==trigger.player;
					});
					if(history.length&&trigger.player.countCards('he')) player.gain(trigger.player.getCards('he'),trigger.player,'gain2','log')._triggered=null;
				}
			}
		},
	},
	"xjzh_boss_ganran":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:5,
		marktext:"感染",
		intro:{
			name:"感染",
			content:"#",
		},
		global:"xjzh_boss_ganran_buff",
		group:"xjzh_boss_ganran_use",
		addMark(player){
			let num=player.countMark("xjzh_boss_ganran");
			if(num>=3) player.addSkill("fengyin");
			else player.removeSkill("fengyin",true);
		},
		filter(event,player){
			return !event.numFixed;
		},
		async content(event,trigger,player){
			trigger.player.addMark("xjzh_boss_ganran",1);
			lib.skill.xjzh_boss_ganran.addMark(trigger.player);
		},
		subSkill:{
			"buff":{
				trigger:{
					player:["phaseDrawBegin","damageBegin","phaseUseBegin"],
				},
				direct:true,
				priority:10,
				sub:true,
				filter(event,player){
					return player.hasMark("xjzh_boss_ganran");
				},
				async content(event,trigger,player){
					let name=trigger.name,num=player.countMark("xjzh_boss_ganran");
					switch(name){
						case "phaseDraw":
							if(num>=1){
								trigger.num-=1;
								game.log(player,"被齐尔领主感染，摸牌数减一");
							}
						break;
						case "damage":
							if(num>=2&&trigger.source==game.findPlayer(i=>get.is.playerNames(i,'xjzh_boss_qier'))){
								trigger.num++;
								game.log(player,"被齐尔领主感染，受到齐尔领主的伤害加一");
							}
						break;
						case "phaseUse":
							if(num>=4){
								trigger.cancel();
								game.log(player,"被齐尔领主感染，跳过了出牌阶段");
							}
						break;
					};
				},
			},
			"use":{
				enable:"phaseUse",
				usable:1,
				filter(event,player) {
					return game.countPlayer(p=>p.hasMark('xjzh_boss_ganran'));
				},
				filterTarget(card,player,target){
					if(ui.selected.targets.length) return true;
					return target.countMark('xjzh_boss_ganran');
				},
				selectTarget:2,
				prompt:"〖感染〗：请选择两名角色移动其中一名角色的“感染”标记",
				targetprompt:['失去标记','获得标记'],
				multitarget:true,
				async content(event,trigger,player){
					let targets=event.targets.slice(0);
					targets[0].removeMark('xjzh_boss_ganran',1);
					targets[1].addMark('xjzh_boss_ganran',1);
					targets[1].loseHp();
					lib.skill.xjzh_boss_ganran.addMark(targets[0]);
					lib.skill.xjzh_boss_ganran.addMark(targets[1]);
				},
				ai:{
					order:8,
					expose:0.3,
					result:{
						target(player,target,card){
							if(ui.selected.targets.length==0) return 1;
							return -1;
						}
					},
				},
			},
		},
	},
	"xjzh_boss_xuezhou":{
		trigger:{
			global:["phaseAfter","drawBegin",]
		},
		forced:true,
		locked:true,
		priority:3,
		filter:function(event,player){
			if(event.name=="draw") return event.player==player;
			return event.player.hasMark('xjzh_boss_ganran');
		},
		content:function(){
			"step 0"
			if(trigger.name=="draw"){
				event.goto(2);
				return;
			}
			trigger.player.removeMark("xjzh_boss_ganran",1);
			"step 1"
			lib.skill.xjzh_boss_ganran.addMark(trigger.player);
			"step 2"
			var num=0;
			for(var target of game.players){
				if(!target.hasMark("xjzh_boss_ganran")) continue;
				num+=Math.max(0,target.countMark("xjzh_boss_ganran")-target.hp);
			}
			trigger.num+=num;
		},
	},
	"xjzh_boss_dianmao":{
		trigger:{
			player:'useCardToPlayer',
			target:'useCardToTarget',
		},
		forced:true,
		locked:true,
		priority:3,
		filter:function(event,player){
			if(event.getParent('xjzh_boss_dianmao').name=="xjzh_boss_dianmao") return false;
			if(!get.tag(event.cards[0],"damage")) return false;
			if(event.target==player&&event.player!=player){
				return event.player.countCards('h')>0;
			}
			if(event.player==player&&event.target!=player){
				return event.target.countCards('h')>0;
			}
			return false;
		},
		content:function(){
			"step 0"
			if(trigger.target==player&&trigger.player!=player){
				event.targets=trigger.player;
			}
			else if(trigger.target!=player&&trigger.player==player){
				event.targets=trigger.target;
			}
			"step 1"
			player.chooseCardButton(event.targets.getCards('h')).set('ai',function(button){
				if(get.suit(button.link)=="spade") return 1;
				return 0;
			});
			"step 2"
			if(result.bool){
				player.showCards(result.links[0]);
				var card=result.links[0];
				if(get.suit(card)=="spade"){
					event.targets.discard(card);
					player.useCard({name:"sha",nature:"thunder"},event.targets,false).set('addCount',false);
				}
			}
		},
	},
	"xjzh_boss_dianchong":{
		trigger:{
			global:"damageAfter",
			source:"damageSource",
		},
		direct:true,
		locked:true,
		priority:3,
		mark:true,
		intro:{
			name:"电冲",
			content:"#",
		},
		filter(event,player,name){
			if(name=="damageSource"){
				return player.hasMark('xjzh_boss_dianchong');
			}
			if(name=="damageAfter"){
				if(!game.hasNature(event,'thunder')) return false;
				if(event.source&&event.source==player) return true;
				if(event.source!=player&&event.player==player) return true;
				return false;
			}
			return false;
		},
		async content(event,trigger,player){
			if(event.triggername=="damageSource"){
				let num=2*(player.countMark('xjzh_boss_dianchong')/100);
				if(Math.random()<=num) game.xjzh_Criticalstrike(player,trigger.num,2,game.hasNature(trigger,'thunder')?1:null,true);
			}else{
				let target;
				if(trigger.source==player&&trigger.player!=player){
					target=trigger.player;
				}
				else if(trigger.source!=player&&trigger.player==player){
					target=trigger.source;
				}
				player.addMark('xjzh_boss_dianchong',trigger.num);
				if(target) target.changexjzhBUFF("gandian",1);
			}
		},
	},
	"xjzh_boss_dianhua":{
		enable:"phaseUse",
		filter:function(event,player){
			return player.hasMark('xjzh_boss_dianchong');
		},
		group:"xjzh_boss_dianhua_phase",
		content:function(){
			"step 0"
			player.removeMark("xjzh_boss_dianchong",1);
			"step 1"
			var cards=get.cards()[0];
			player.showCards(cards);
			if(get.suit(cards)!="spade"){
				player.gain(cards,'gain2','log');
				event.finish();
				return;
			}
			"step 2"
			player.chooseTarget("〖电花〗：对一名角色造成1点雷属性伤害",function(card,player,target){
				return target!=player;
			}).set('ai',function(card,player,target){
				 return get.damageEffect(target,player,player,'thunder');
			});
			"step 3"
			if(result.bool){
				result.targets[0].damage(player,1,'nocard','thunder');
			}
		},
		subSkill:{
			"phase":{
				trigger:{
					global:["phaseDrawBegin","phaseUseBegin"],
				},
				forced:true,
				sub:true,
				priority:10,
				filter:function(event,player){
					if(get.xjzhBUFFNum(event.player,"gandian")>0){
						var num=player.countMark('xjzh_boss_dianchong')/100;
						if(Math.random()<=num) return true;
					}
					return false;
				},
				content:function(){
					"step 0"
					trigger.cancel(null,null,'notrigger')
					"step 1"
					player[trigger.name]();
				},
			},
		},
		ai:{
			order:function(){
				var player=_status.event.player;
				return player.countMark('xjzh_boss_dianchong');
			},
			result:{
				player:function(player,target){
					var num=player.countMark('xjzh_boss_dianchong');
					if(num==1) return 0;
					return player.countMark('xjzh_boss_dianchong');
				},
			},
		},
	},
	"xjzh_boss_mengdu":{
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		locked:true,
		priority:3,
		content:function(){
			"step 0"
			game.setNature(trigger,'poison');
			"step 1"
			var num=(player.hp*10)/100;
			if(Math.random()<=num){
				var evt=event.getParent("damage");
				if(evt&&evt.getParent){
					var next=game.createEvent('xjzh_boss_mengdu_zhongdu',false,evt.getParent());
					next.player=player;
					next.target=trigger.player;
					next.setContent(function(){
						"step 0"
						target.changexjzhBUFF('zhongdu',1,true);
						"step 1"
						player.draw(get.xjzhBUFFNum(target,"zhongdu"));
					});
				}
			}
		},
	},
	"xjzh_boss_huanshen":{
		trigger:{
			player:"damageEnd",
		},
		forced:true,
		locked:true,
		limited:true,
		skillAnimation:true,
		animationColor:'water',
		animationStr:"痛苦之王",
		init:function(player,skill){
			player.storage[skill]=false;
		},
		derivation:"xjzh_boss_exing",
		filter:function(event,player){
			if(player.storage.xjzh_boss_huanshen) return false;
			return player.hp<=Math.round(player.maxHp/3);
		},
		content:function(){
			"step 0"
			player.awakenSkill("xjzh_boss_huanshen");
			player.storage.xjzh_boss_huanshen=true;
			"step 1"
			var num=Math.round(player.maxHp/3);
			player.recoverTo(num);
			'step 2'
			if(game.me!=game.boss){
				game.boss.changeSeat(6);
			}
			else{
				game.boss.nextSeat.changeSeat(3);
				game.boss.previousSeat.changeSeat(5);
			}
			game.delay(0.5);
			'step 3'
			lib.translate["xjzh_boss_duruierx"]="督瑞尔的幻影";
			var follow=game.addBossFellow2(game.me==game.boss?1:5,"xjzh_boss_duruier",null,3);
			follow.removeSkill("xjzh_boss_huanshen",true);
			follow.name="xjzh_boss_duruierx";
			follow.name1="xjzh_boss_duruierx";
			follow.node.name.innerHTML="督瑞尔的幻影";
			var follow=game.addBossFellow2(7,"xjzh_boss_duruier",null,3);
			follow.removeSkill("xjzh_boss_huanshen",true);
			follow.name="xjzh_boss_duruierx";
			follow.name1="xjzh_boss_duruierx";
			follow.node.name.innerHTML="督瑞尔的幻影";
			player.addSkillLog("xjzh_boss_exing");
		},
	},
	"xjzh_boss_exing":{
		trigger:{
			player:"useCard",
		},
		forced:true,
		priority:10,
		firstDo:true,
		filter:function(event,player){
			if(!event.card||!event.cards.length) return false;
			if(!event.target||!event.targets.length) return false;
			if(get.xjzhBUFFNum(event.target,"zhongdu")==0) return false;
			return get.tag(event.card,'damage');
		},
		content:function(){
			"step 0"
			event.num=get.xjzhBUFFNum(trigger.target,"zhongdu");
			"step 1"
			target.changexjzhBUFF('zhongdu',-event.num,true);
			"step 2"
			trigger.effectCount+=event.num
			game.log(trigger.card,'额外结算'+get.xjzhBUFFNum(trigger.target,"zhongdu")+'次');
		},
		ai:{
			result:{
				target:function(player,target,card){
					if(!target) return;
					return get.xjzhBUFFNum(target,"zhongdu");
				},
			},
		},
	},
	"xjzh_boss_lianji":{
		trigger:{
			player:"useCard",
		},
		direct:true,
		priority:10,
		firstDo:true,
		locked:true,
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		init(player){
			player.storage.xjzh_boss_lianji=new Map(
				[
					["use",3],
					["count",1],
					["type",[0,0]]
				]
			);
		},
		mark:true,
		marktext:"连",
		intro:{
			name:"连击",
			content(storage,player){
				let list=storage.get("type");
				return `基本牌：${storage.get("type")[0]}张<br>锦囊牌：${storage.get("type")[1]}张`;
			},
		},
		mod:{
			aiOrder(player,card,num){
				let storage=player.storage.xjzh_boss_lianji;
				let typeNum=storage.get("type"),use=storage.get("use");
				if(typeNum[0]>=use&&get.type(card)=="trick") return num+3;
				if(typeNum[1]>=use&&get.type(card)=="basic") return num+3;
				return num;
			},
		},
		filter(event,player){
			return ["trick","basic"].includes(get.type(event.cards[0]));
		},
		async content(event,trigger,player){
			let storage=player.storage.xjzh_boss_lianji,type=get.type(trigger.cards[0]),bool=false;
			if(type=="basic"){
				await storage.set("type",[storage.get("type")[0]+1,storage.get("type")[1]]);
				if(storage.get("type")[1]>=storage.get("use")){
					await storage.set("type",[storage.get("type")[0],0]);
					bool=true;
				}
			}else{
				await storage.set("type",[storage.get("type")[0],storage.get("type")[1]+1]);
				if(storage.get("type")[0]>=storage.get("use")){
					await storage.set("type",[0,storage.get("type")[1]]);
					bool=true;
				}
			}
			if(bool==true){
				let num=storage.get("count");
				trigger.effectCount+=num;
				player.logSkill("xjzh_boss_lianji",trigger.target);
				game.log(trigger.card,'额外结算'+num+'次');
			}
		},
	},
	"xjzh_boss_qiangji":{
		trigger:{
			player:"damageEnd",
		},
		direct:true,
		priority:10,
		firstDo:true,
		locked:true,
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		init(player,skill){
			player.storage[skill]=new Map(
				[
					["out",20],
					["time",12000],
				]
			);
		},
		filter(event,player){
			let storage=player.storage.xjzh_boss_qiangji;
			if(storage.get("out")/100>=Math.random()) return true;
			return false;
		},
		async content(event,trigger,player){
			let storage=player.storage.xjzh_boss_qiangji;
			let time=storage.get("time"),out=storage.get("out"),time2=get.rand(1000,time);


			game.log(player,`离开游戏，将于${Math.round(time2/1000)}s后回到游戏`);
			player.classList.add('out');
			setTimeout(()=>{
				player.classList.remove('out');
				game.log(player,"回到游戏");
				if(trigger.card){
					let card=trigger.card;
					player.chooseUseTarget(card,false);
					let list=[];
					while(true){
						let cards=get.cards()[0];
						player.showCards(cards);
						if(get.number(cards)==get.number(card)||get.suit(cards)==get.suit(card)) list.push(cards);
						else{
							if(list.length) player.gain(list,'gain2','log',player);
							break;
						};
					}
				}
				while(_status.event.name!='phase'){
					_status.event=_status.event.parent;
				}
				_status.event.finish();
				_status.event.untrigger(true);
				player.insertPhase();
			},time2);

			let num=get.rand(10,30)/100;
			if(out<75) storage.set("out",out*(1+num)>75?75:out*=(1+num));
			if(time>1000) storage.set("time",time*(1-num)<1000?1000:time*(1-num));
		},
	},
	"xjzh_boss_zenghen":{
		trigger:{
			player:"dying",
		},
		forced:true,
		limited:true,
		locked:true,
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		derivation:"xjzh_boss_xueyan",
		skillAnimation:true,
		animationColor:'fire',
		animationStr:"憎恨王座",
		init(player,skill){
			player.addMark(skill,3);
		},
		filter(event,player){
			return player.hasMark("xjzh_boss_zenghen");
		},
		async content(event,trigger,player){
			player.removeMark("xjzh_boss_zenghen",1,false);
			await player.gainMaxHp(player.maxHp);
			player.recoverTo(player.maxHp);
			player.update();
			let list=player.getEnemies().sortBySeat(player);
			while(list.length){
				let target=list.shift();
				target.damage(1,player,'fire','nocard')
				target.changexjzhBUFF("ranshao",1);
			}
			if(player.hasSkill("xjzh_boss_lianji")){
				let controlList=["红色数字减一","蓝色数字加一"],storage=player.storage.xjzh_boss_lianji;
				const control=await player.chooseControl(controlList).forResultControl();
				if(control=="红色数字减一"){
					storage.set("use",storage.get("use")==1?1:storage.get("use")-1);
				}else{
					storage.set("count",storage.get("count")+1);
				}
			}
			await player.addSkills("xjzh_boss_xueyan");
		},
	},
	"xjzh_boss_xueyan":{
		trigger:{
			source:"damageEnd",
		},
		filter(event,player){
			if(event.player.isDead()) return false;
			return event.source!=event.player;
		},
		check(event,player){
			return -get.attitude(player,event.player);
		},
		async content(event,trigger,player){
			let cards=get.cards()[0];
			player.showCards(cards);
			if(get.color(cards)=="red"){
				trigger.player.damage(1,player,'fire','nocard');
				trigger.player.changexjzhBUFF("ranshao",1);
			}else{
				trigger.player.changexjzhBUFF("yishang",1);
			}
		},
	},
	"xjzh_boss_fennu":{
		trigger:{
			player:"phaseBefore",
		},
		frequent:true,
		priority:Infinity,
		firstDo:true,
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		mark:true,
		marktext:"怒",
		intro:{
			name:"愤怒",
			mark:function(dialog,storage,player){
				var storage=player.storage.xjzh_boss_fennu;
				dialog.addSmall([storage,'vcard']);
			},
			markcount:function(storage,player){
				var storage=player.storage.xjzh_boss_fennu;
				return storage.length;
			},
		},
		init:function(player){
			if(!player.storage.xjzh_boss_fennu) player.storage.xjzh_boss_fennu=[];
		},
		content:function(){
			"step 0"
			var {...cards}=lib.xjzh_qishuyaojians;
			var list=[]
			for(var i in cards){
				if(["xjzh_qishu_wuyan","xjzh_qishu_fengbaopaoxiao","xjzh_qishu_waxilidedaogao","xjzh_qishu_fenglangkx","xjzh_qishu_hakankouyu","xjzh_qishu_lietiangong","xjzh_qishu_wumingzhe"].includes(i)) continue;
				var cardname=i;
				lib.card[cardname]={
					fullimage:false,
					image:'ext:仙家之魂/image/qishuyaojian/cards/'+i+'.jpg',
				};
				lib.translate[cardname]=cards[i].translate;
				lib.translate[cardname+'_info']=cards[i].translate_info;
				list.push(cardname);
			}
			event.func=function(skills){
				var skillsx=lib.xjzh_qishuyaojians[skills]
				if(skillsx.skill){
					var newSkill=skills;
					if(!lib.skill[newSkill]){
						lib.skill[newSkill]=skillsx.skill;
						lib.skill[newSkill].charlotte=true;
						lib.skill[newSkill].xjzh_qishuSkill=true;
						lib.skill[newSkill].superChocolate=true;
						lib.skill[newSkill].nobracket=true;
						lib.skill[newSkill].locked=true;
						if(lib.skill[newSkill].priority===undefined) lib.skill[newSkill].priority=5;
						if(skills.skillName){
							lib.translate[newSkill]=skillsx.skillName;
						}else{
							lib.translate[newSkill]=skillsx.translate;
						}
						if(skills.skillInfo){
							lib.translate[newSkill+'_info']=skillsx.skillInfo;
						}else{
							lib.translate[newSkill+'_info']=skillsx.translate_info;
						}
					}
					player.addSkillLog(newSkill);
				}
			};
			var num=1;
			if(player.hp<player.maxHp/2) num=[1,3];
			var str="〖愤怒〗：选择装备";
			if(num==1) str+="1个奇术要件";
			else str+="至多3个奇术要件";
			var next=player.chooseButton([str,[list,'vcard']]).set('filterButton',function(button){
				var link=button.link[2];
				var level=cards[link].level;
				return level<5||1;
			})
			next.set('ai',function(button){
				var link=button.link[2];
				var level=cards[link].level;
				return get.rand(1,4);
			})
			next.set('selectButton',function(){
				var player=_status.event.player
				return num;
			})
			next.set('num',num)
			'step 1'
			if(result.bool){
				if(player.storage.xjzh_boss_fennu.length>0){
					var storage=player.storage.xjzh_boss_fennu;
					for(var i=0;i<storage.length;i++){
						if(player.hasSkill(storage[i])){
							player.removeSkill(storage[i],true);
							player.storage.xjzh_boss_fennu.remove(storage[i]);
						}
					}
				}
				for(var i=0;i<result.links.length;i++){
					event.func(result.links[i][2]);
					player.storage.xjzh_boss_fennu.push(result.links[i][2]);
				};
				var card=ui.create.card();
				card.classList.add('infohidden');
				card.classList.add('infoflip');
				player.$gain2(card);
			}
			"step 2"
			if(player.hp<=player.maxHp/3){
				game.countPlayer(function(current){
					if(current!=player) current.useCard({name:'sha',isCard:true},current);
				});
			}
		},
	},
	"xjzh_boss_edu":{
		enable:"phaseUse",
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		nogainsSkill:true,
		locked:true,
		usable:1,
		filterTarget:function(card,player,target){
			if(target.isMad()) return false;
			return target!=player;
		},
		filter:function(event,player){
			var num=player.getEnemies().length;
			if(game.countPlayer(function(current){
				return current.isMad()&&current.isEnemiesOf(player);
			})<num) return true;
			return false;
		},
		content:function(){
			player.loseHp();
			target.goMad({player:"phaseAfter"});
			if(player.hp<player.maxHp/2){
				player.loseMaxHp();
				game.countPlayer(function(current){
					if(current!=player) target.useCard({name:'juedou',isCard:true},current);
				});
			}
		},
		ai:{
			order:10,
			result:{
				player:function(player){
					if(player.hp<player.maxHp/2) return -1;
					if(player.maxHp<=3) return -2;
					return player.hp-player.maxHp/2;
				},
				target:function(target){
					if(target.hasFriend()) return -1;
					return 2;
				},
			},
		},
	},
	"xjzh_boss_canren":{
		trigger:{
			source:["damageEnd"],
		},
		charlotte:true,
		fixed:true,
		superCharlotte:true,
		nogainsSkill:true,
		locked:true,
		priority:10,
		frequent:true,
		filter:function(event,player){
			if(event.player.isDead()) return false;
			if(!event.player.countCards('he')) return false;
			return true;
		},
		content:function(){
			"step 0"
			player.gainPlayerCard(trigger.player,"he",true);
			"step 1"
			var card=result.links[0];
			var cards=get.cards()[0];
			player.showCards(cards);
			if(get.suit(card)==get.suit(cards)){
				player.gain(cards,player,'gain2','log');
				event.redo();
			}
		},
		ai:{
			result:{
				player:1,
			},
		},
	},
	"xjzh_boss_qingling":{
		trigger:{
			global:["gameStart","dieAfter"],
			player:["enterGame","damageBegin"],
		},
		forced:true,
		locked:true,
		charlotte:true,
		superCharlotte:true,
		priority:-1,
		lastDo:true,
		unique:true,
		mark:true,
		mode:["boss"],
		marktext:"清",
		intro:{
			name:"太平清领",
			content:function(storage,player){
				var num=game.phaseNumber;
				return "受到伤害后，若场上黄巾兵数量小于2，你有"+get.translation(num)+"%几率令一个黄巾兵登场";
			},
		},
		mod:{
			globalFrom:function(from,to,distance){
				let num=game.countPlayer(function(current){
					return get.is.playerNames(current,"xjzh_boss_hj");
				});
				return distance-num;
			},
			playerEnabled:function(card,player,target){
				if(get.tag(card,'damage')&&get.is.playerNames(target,"xjzh_boss_hj")) return false;
			},
		},
		init:function(player){
			lib.xjzh_boss_qingling_huangjing=["xjzh_boss_hjbingyong","xjzh_boss_hjlishi","xjzh_boss_hjfangshi","xjzh_boss_hjshushi","xjzh_boss_hjguishi"];
		},
		audio:"ext:仙家之魂/audio/skill:2",
		group:"xjzh_boss_qingling_phase",
		filter:function(event,player){
			if(get.mode()=="boss"){
				if(game.boss!=player) return false;
			}
			if(game.countPlayer(function(current){
				return current.name.indexOf("xjzh_boss_hj")==0;
			}).length>=2) return false;
			if(event.name=="damage"){
				return Math.random<=game.phaseNumber/100;
			}
			if(event.name=="die"){
				var list=lib.xjzh_boss_qingling_huangjing.slice(0);
				if(!list.includes(event.player.name)) return false;
				return event.player!=player&&event.player!=game.boss&&event.player.isDead();
			}
			return true;
		},
		content:function(){
			"step 0"
			if(trigger.name=="damage"){
				event.goto(3);
			}
			else if(trigger.name=="die"&&trigger.player.isDead()){
				trigger.player.hide();
				event.finish();
				return;
			}
			"step 1"
			if(game.me!=game.boss){
				game.boss.changeSeat(6);
			}
			else{
				game.boss.nextSeat.changeSeat(3);
				game.boss.previousSeat.changeSeat(5);
			}
			game.delay(0.5);
			'step 2'
			var list=lib.xjzh_boss_qingling_huangjing.slice(0).randomGets(2);
			var follow=game.addBossFellow2(game.me==game.boss?1:5,list[0],2);
			var follow=game.addBossFellow2(7,list[1],2);
			event.finish();
			return;
			"step 3"
			var list=lib.xjzh_boss_qingling_huangjing.slice(0);
			for(var i=0;i<game.dead.length;i++){
				if(list.includes(game.dead[i])){
					game.dead[i].show();
					var targetx=list.randomGet()
					game.replacePlayer(game.dead[i],targetx);
					game.log(player,"将一名",targetx,"召集到了场上");
					break;
				}
			}
		},
		subSkill:{
			"temp":{sub:true,},
			"phase":{
				trigger:{
					global:"phaseJiseshuBegin",
				},
				forced:true,
				sub:true,
				priority:3,
				audio:"xjzh_boss_qingling",
				filter:function(event,player){
					if(get.mode()=="boss"){
						if(game.boss!=player) return false;
					}
					if(game.hasPlayer(function(current){
						return get.is.playerNames(current,"xjzh_boss_hj");
					})&&!player.hasSkill('xjzh_boss_qingling_temp')) return true;
					return false;
				},
				content:function(){
					player.addTempSkill('xjzh_boss_qingling_temp');
					player.insertPhase();
				},
			},
		},
	},
	"xjzh_boss_dianxing":{
		enable:"phaseUse",
		usable:function(player){
			if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==4) return 2;
			return 1;
		},
		mark:true,
		marktext:"电",
		intro:{
			name:"电刑",
			content:function(storage,player){
				if(game.phaseNumber<50) return "你还有"+get.translation(50-game.phaseNumber)+"回合可以改变〖电刑〗技能形态";
				if(player.storage.xjzh_boss_dianxing){
					var list=lib.skill.xjzh_boss_dianxing.getSkillList.slice(0);
					var num=player.storage.xjzh_boss_dianxing-1;
					return "你选择了〖电刑〗升级：<span style=\"color: gold\">"+list[num]+"</span>";
				}
				return "";
			},
		},
		getSkillList:[
			"主动释放的〖电刑〗可以额外选择一个目标，但其判定成功后不再询问是否重复判定",
			"主动释放的〖电刑〗判定成功后可以向目标附近友方弹射,但不再询问是否重复判定",
			"主动释放的〖电刑〗的判定结果改为与弃置牌花色一致，判定成功后令目标感电并摸一张牌",
			"主动释放的〖电刑〗使用次数+1，但判定失败后须弃置一张牌",
		],
		filter:function(event,player){
			var num=lib.skill.xjzh_boss_dianxing.usable(player);
			if(get.skillCount("xjzh_boss_dianxing",player)>=num) return false;
			if(!player.countCards('he')) return false;
			return true;
		},
		check:function(card){
			if(game.hasPlayer(function(current){
				return get.is.playerNames(current,'xjzh_boss_hjguishi');
			})) return get.color(card)=="black";
			return 6-get.value(card);
		},
		group:["xjzh_boss_dianxing_damage","xjzh_boss_dianxing_skip","xjzh_boss_dianxing_level"],
		filterTarget:function(card,player,target){
			return !player.getFriends(true).includes(target);
		},
		selectTarget:function(){
			var player=_status.event.player;
			if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==1) return [1,2];
			return 1;
		},
		filterCard:true,
		selectCard:1,
		position:'he',
		audio:"ext:仙家之魂/audio/skill:2",
		content:function(){
			"step 0"
			if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==3){
				event.colorx=get.suit(cards[0]);
			}else{
				event.colorx=get.color(cards[0]);
			}
			"step 1"
			target.judge(function(card){
				if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==3) return get.suit(card)==event.colorx?-2:0;
				return get.color(card)==event.colorx?-2:0;
			}).judge2=function(result){
				return result.bool==false?true:false;
			};
			"step 2"
			if(result.judge<0){
				target.damage(1,player,'thunder','nocard');
				if(player.storage.xjzh_boss_dianxing){
					if(player.storage.xjzh_boss_dianxing==2){
						var next=target.getNext();
						var previous=player.getPrevious();
						if(target.isFriendsOf(next)&&next.isAlive()) next.damage(1,player,'thunder','nocard');
						if(target.isFriendsOf(previous)&&previous.isAlive()) previous.damage(1,player,'thunder','nocard');
					}
					else if(player.storage.xjzh_boss_dianxing==3){
						target.changexjzhBUFF('gandian',1);
						player.draw();
					}
				}
			}else{
				if(player.storage.xjzh_boss_dianxing){
					if(player.storage.xjzh_boss_dianxing==4){
						player.chooseToDiscard(1,'he',true)
					}
				}
				event.finish();
			}
			"step 3"
			if(player.isDead()||target.isDead()||(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing<=2)){
				event.finish();
				return;
			}
			player.chooseBool("〖电刑〗：是否令"+get.translation(target)+"再次进行判定？").set('ai',function(){
				return -get.attitude(player,target);
			});
			"step 4"
			if(result.bool){
				event.goto(1);
			}
		},
		subSkill:{
			"damage":{
				trigger:{
					global:["phaseBegin","turnOverAfter"],
				},
				audio:"xjzh_boss_dianxing",
				forced:true,
				priority:-2,
				sub:true,
				filter:function(event,player){
					if(event.name=="turnOver"&&player.isTurnedOver()) return true;
					return game.phaseNumber%10==0;
				},
				content:function(){
					"step 0"
					player.judge(function(card){
						if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10) return 5;
						return 0;
					}).judge2=function(result){
						return result.bool==false?true:false;
					};
					"step 1"
					if(result.bool){
						var list=player.getEnemies().sortBySeat();
						for(var i=0;i<list.length;i++){
							list[i].damage(3,player,'thunder','nocard')
						}
						if(get.mode()!="boss"){
							event.finish();
							return;
						}
						var list=lib.xjzh_boss_qingling_huangjing.slice(0);
						for(var i=0;i<game.dead.length;i++){
							if(list.includes(game.dead[i])){
								game.dead[i].show();
								var targetx=list.randomGet()
								game.replacePlayer(game.dead[i],targetx);
								game.log(player,"将一名",targetx,"召集到了场上");
								break;
							}
						}
					}
				},
			},
			"skip":{
				trigger:{
					player:["phaseZhunbeiCancelled","phaseZhunbeiSkipped","phaseJudgeCancelled","phaseJudgeSkipped","phaseDrawCancelled","phaseDrawSkipped","phaseUseCancelled","phaseUseSkipped","phaseDiscardCancelled","phaseDiscardSkipped"],
				},
				forced:true,
				priority:-1,
				lastDo:true,
				sub:true,
				/*filter:function(event,player){
					return event.cancelled||event.skipped;
				},*/
				content:function(){
					player.useSkill("xjzh_boss_dianxing_damage",player);
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(!target) return;
							if(get.tag(card,'skip')) return [-3,-2];
						},
					},
				},
			},
			"level":{
				trigger:{
					global:"phaseBefore",
				},
				direct:true,
				priority:3,
				sub:true,
				filter:function(event,player){
					if(player.storage.xjzh_boss_dianxing) return false;
					return game.phaseNumber==50;
				},
				content:function(){
					"step 0"
					var list=lib.skill.xjzh_boss_dianxing.getSkillList.slice(0);
					player.chooseControlList(get.prompt(event.name,player),list).set('ai',function(){
						return Math.random();
					});
					"step 1"
					if(result.control!="cancel2"){
						var num=result.index
						player.storage.xjzh_boss_dianxing=num+1;
					}
				},
			},
		},
		ai:{
			order:8,
			result:{
				player:function(player,target,card){
					return -0.5;
				},
				target:function(player,target,card){
					return -1.5;
				},
			},
		},
	},
	"xjzh_boss_guishu":{
		trigger:{
			player:["phaseZhunbeiBegin","phaseJudgeBegin","phaseDrawBegin","phaseDiscardBegin","phaseJieshuBegin","phaseUseBegin"],
		},
		forced:true,
		locked:true,
		priority:-9,
		group:["xjzh_boss_guishu_link","guidao"],
		content:function(){
			"step 0"
			var num=get.rand(1,2);
			var cards=get.randomCards(num,function(card){
				return get.color(card)=="black";
			});
			player.gain(cards,'giveAuto')
			var str="";
			if(trigger.name=="phaseZhunbei"){
				str+="准备阶段";
			}
			else if(trigger.name=="phaseJudge"){
				str+="判定阶段";
			}
			else if(trigger.name=="phaseDraw"){
				str+="摸牌阶段";
			}
			else if(trigger.name=="phaseUse"){
				str+="出牌阶段";
			}
			else if(trigger.name=="phaseDiscard"){
				str+="弃牌阶段";
			}
			else if(trigger.name=="phaseJieshu"){
				str+="结束阶段";
			}
			game.log(player,"跳过了","#g"+str+"","摸了"+num+"张牌");
			"step 1"
			trigger.cancel();
		},
		subSkill:{
			"link":{
				trigger:{
					global:"damageBefore",
				},
				forced:true,
				sub:true,
				priority:10,
				filter:function(event,player){
					return event.source&&event.source==game.boss&&game.hasNature(event,'thunder');
				},
				content:function(){
					var list=player.getEnemies().sortBySeat();
					for(var target of list){
						if(!target.isLinked()) target.link(true);
					}
				},
			},
		},
	},
	"xjzh_boss_fubing":{
		trigger:{
			player:"phaseDrawBegin",
		},
		silent:true,
		locked:true,
		group:"xjzh_boss_fubing_damage",
		content:function(){
			"step 0"
			var list=player.getEnemies().sortBySeat();
			player.gainMultiple(list);
			"step 1"
			player.addTempSkill('xjzh_boss_fubing_max');
			trigger.cancel(null,null,'notrigger');
		},
		subSkill:{
			"max":{
				mod:{
					maxHandcard:function (player,num){
						return 0;
					},
				},
				sub:true,
			},
			"damage":{
				trigger:{
					global:["damageBegin","linkBegin"],
				},
				silent:true,
				sub:true,
				filter:function(event,player){
					return game.boss==event.player;
				},
				content:function(){
					if(trigger.name=="damage"){
						trigger.player=player;
						game.log(player,"发动了","#g〖符兵〗","代替神张角承受了本次伤害");
					}else{
						if(!trigger.player.isLinked()) trigger.cancel(null,null,"notrigger");
					}
				},
			},
		},
	},
	"xjzh_boss_fuli":{
		mod:{
			cardEnabled:function (card,player){
				if(card.name=="shan") return false;
			},
			cardEnabled2:function (card,player){
				if(card.name=="shan") return false;
			},
			cardUsable:function (card,player,num){
				if(card.name=='sha') return Infinity;
			},
			cardRespondable:function (card,player,event){
				if(card.name=='shan') return false;
			},
		},
		trigger:{
			global:["damageBegin","turnOverBegin"],
		},
		silent:true,
		locked:true,
		filter:function(event,player){
			if(event.name=="damage") return event.source==game.boss;
			return event.player==game.boss&&!event.player.isTurnedOver();
		},
		content:function(){
			if(trigger.name=="damage"){
				trigger.num++
			}else{
				trigger.cancel(null,null,"notrigger");
			}
		},
	},
	"xjzh_boss_fuhuo":{
		trigger:{
			player:"phaseDrawBegin",
		},
		silent:true,
		locked:true,
		group:"xjzh_boss_fuhuo_phase",
		filter:function(event,player){
			return !player.skipList.includes("phaseDraw");
		},
		content:function(){
			"step 0"
			var list=player.getEnemies().sortBySeat();
			var num=list.length<trigger.num?list.length:trigger.num;
			var targets=list.randomGets(num);
			for(var i=0;i<targets.length;i++){
				targets[i].damage(1,player,'nocard','fire');
				targets[i].addSkill('xjzh_boss_fuhuo_damage');
			}
			player.logSkill('xjzh_boss_fuhuo',targets);
			"step 1"
			trigger.cancel(null,null,'notrigger');
		},
		subSkill:{
			"damage":{
				trigger:{
					source:"damageBegin",
				},
				silent:true,
				sub:true,
				mark:true,
				marktext:"火",
				intro:{
					name:"符火",
					content:"下次造成火焰伤害+1，且你受到等量火焰伤害",
				},
				filter:function(event,player){
					if(!game.hasNature(event)||game.hasNature(trigger,'fire')) return false;
					return !event.numFixed;
				},
				content:function(){
					"step 0"
					trigger.num++
					"step 1"
					player.damage(trigger.num,player,'fire','nocard');
					"step 2"
					player.logSkill('xjzh_boss_fuhuo',trigger.player);
					"step 3"
					player.removeSkill('xjzh_boss_fuhuo_damage');
				},
				ai:{
					firedamage:true,
					result:{
						target:function(player,target,card){
							if(get.tag(card,'fireDamage')) return -2;
						},
						player:function(player,target,card){
							if(get.tag(card,'fireDamage')) return 2;
						},
					},
				},
			},
			"phase":{
				trigger:{
					global:"phaseBefore",
				},
				silent:true,
				filter:function(event,player){
					if(Math.random()>player.hp/100) return false;
					return event.player==game.boss;
				},
				content:function(){
					trigger.player.gainMaxHp();
					player.logSkill('xjzh_boss_fuhuo',trigger.player);
				},
			},
		},
	},
	"xjzh_boss_fushui":{
		trigger:{
			player:"phaseUseBegin",
		},
		silent:true,
		locked:true,
		marktext:"水",
		intro:{
			content:"expansion",
			markcount:"expansion",
		},
		group:"xjzh_boss_fushui_phase",
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
		},
		filter:function(event,player){
			return !player.skipList.includes("phaseUse");
		},
		content:function(){
			"step 0"
			var list=player.getCards('hej');
			player.addToExpansion(list,player,'give').gaintag.add('xjzh_boss_fushui');
			"step 1"
			trigger.cancel(null,null,'notrigger');
			"step 2"
			var list=player.getFriends(true).sortBySeat();
			var damage=function(){
				for(var i of list){
					if(i.isDamaged()) return true;
				}
				return false;
			};
			var cards=player.getExpansions("xjzh_boss_fushui").sort();
			var bool=function(){
				var num=0
				for(var i=0;i<cards.length;i++){
					num+=get.number(cards[i]);
				}
				if(num>=13) return true;
				return false;
			};
			if(damage()==true&&bool()==true){
				var evt=event.getParent("phase");
				if(evt&&evt.getParent){
					var next=game.createEvent('xjzh_boss_fushui_remove',false,evt.getParent());
					next.player=player;
					next.setContent(function(){
						"step 0"
						var cards=player.getExpansions("xjzh_boss_fushui");
						var next=player.chooseCardButton(cards,'〖符水〗：请选择任意张点数不小于13的牌视为使用一张【桃园结义】')
						next.set('forced',true);
						next.set('selectButton',function(button){
							if(!ui.selected.buttons.length) return true;
							var num=0;
							for(var i=0;i<ui.selected.buttons.length;i++){
								num+=get.number(ui.selected.buttons[i]);
							}
							if(num>=13) return ui.selected.buttons.length;
							return ui.selected.buttons.length+2;
						});
						next.set('complexSelect',true);
						"step 1"
						if(result.links){
							player.loseToDiscardpile(result.links);
							player.chooseUseTarget({name:'taoyuan'},true,false).set('targets',game.filterPlayer(function(current){
								return current.isFriendsOf(player);
							})).viewAs=true;
						}
					});
				}
			}
		},
		subSkill:{
			"phase":{
				trigger:{
					global:["drawBegin","phaseDiscardBegin"],
				},
				silent:true,
				filter:function(event,player){
					if(game.boss!=event.player) return false;
					if(event.name=="phaseDiscard") return event.player.needsToDiscard();
					return true;
				},
				content:function(){
					if(trigger.name=="draw"){
						trigger.player.draw()._triggered=null;
					}else{
						trigger.cancel(null,null,'notrigger');
					}
					player.logSkill('xjzh_boss_fushui',trigger.player);
				},
			},
		},
	},
	"xjzh_boss_jiwu":{
		enable:"phaseUse",
		usable:1,
		filterTarget:lib.filter.notMe,
		selectTarget:-1,
		multitarget:true,
		multiline:true,
		check(card){return 8-get.value(card);},
		filterCard(card){
			return get.tag(card,'damage');
		},
		filter(event,player){
			return player.countCards('h',card=>get.tag(card,'damage'));
		},
		async content(event,trigger,player){
			await player.useCard({name:'sha',isCard:true},event.targets,false);
			if(player.getStat('damage')){
				let cards=get.cardPile(card=>get.tag(card,'damage'));
				if(cards) player.gain(cards,player,'gain2','log');
			}
		},
		ai:{
			expose:0.3,
			order:12,
			result:{
				player:1,
			},
		},
	},
	"xjzh_boss_feijiang":{
		trigger:{
			global:["shaBegin","juedouBegin"],
		},
		forced:true,
		locked:true,
		priority:6,
		filter(event,player){
			return event.player==player;
		},
		init(player,skill){
			player.addAdditionalSkills(skill,"wushuang");
		},
		async content(event,trigger,player){
			if(trigger.target.countCards('he')){
				const links=await player.gainPlayerCard(trigger.target,"he",true).forResultLinks();
				if(links){
					let card=links[0];
					if(get.tag(card,'damage')){
						const cards=await player.chooseToDiscard(card,"〖飞将〗：是否弃置此牌令"+get.translation(trigger.card)+"造成伤害+1").set('ai',card=>{
							return 8-get.value(card);
						}).forResultCards();
						if(cards){
							if(!trigger.baseDamage) trigger.baseDamage=1;
							trigger.baseDamage++;
						}
					}
				}
			}
		},
	},
	"xjzh_boss_benxi":{
		trigger:{
			source:["damageAfter"],
			global:["phaseZhunbeiBegin"],
		},
		forced:true,
		locked:true,
		priority:3,
		mark:true,
		marktext:"袭",
		intro:{
			name:"奔袭",
			content(storage,player){
				let list=player.getSkills(null,false,false).filter(skill=>{
					let info=get.info(skill);
					return info&&info.xjzh_xinghunSkill;
				});
				return "“星魂”技能数量："+get.translation(list.length)+"";
			},
			markcount(storage,player){
				let list=player.getSkills(null,false,false).filter(skill=>{
					let info=get.info(skill);
					return info&&info.xjzh_xinghunSkill;
				});
				return list.length;
			},
		},
		mod:{
			globalFrom(from,to,distance){
				let player=_status.event.player
				let list=player.getSkills(null,false,false).filter(skill=>{
					let info=get.info(skill);
					return info&&info.xjzh_xinghunSkill;
				});
				return distance-list.length;
			}
		},
		audio:"ext:仙家之魂/audio/skill:2",
		filter(event,player){
			if(event.name=="phaseZhunbei"){
				let list=player.getSkills(null,false,false).filter(skill=>{
					let info=lib.skill[skill];
					return info&&info.xjzh_xinghunSkill;
				});
				if(list.length) return event.player!=player;
				return false;
			}
			return !event.numFixed;
		},
		async content(event,trigger,player){
			let name=trigger.name;
			if(name=="damage"){
				let skills=[],list=game.xjzh_wujiangpai(true).filter(name=>{
					return name.startsWith("xjzh_");
				});
				list.forEach(name=>{
					let names=lib.character[name][3];
					skills.addArray(names.filter(skill=>{
						let info=get.info(skill);
						if(player.skills.includes(skill)) return false;
						if(info&&(info.zhuSkill||info.zhuSkill||info.juexingji||info.limited||info.dutySkill||info.nogainsSkill||info.unique)) return false;
						return info&&info.xjzh_xinghunSkill;
					}));
				});
				if(skills.length){
					player.addSkills(skills.randomGet());
					player.update();
					player.updateMarks();
				}
			}else{
				const bool=await player.chooseBool("〖奔袭〗：是否移除一个“星魂”技能执行一个额外的出牌阶段？").set('ai',()=>{return true;}).forResultBool();
				if(bool){
					let list=player.getSkills(null,false,false).filter(skill=>{
						let info=lib.skill[skill];
						return info&&info.xjzh_xinghunSkill;
					}),dialog;
					if(event.isMine()){
						dialog=ui.create.dialog('forcebutton');
						dialog.add('〖奔袭〗：请选择移除一项技能');
						for(let i=0;i<list.length;i++){
							if(lib.translate[list[i]+'_info']){
								let translation=get.translation(list[i]);
								if(translation[0]=='新'&&translation.length==3){
									translation=translation.slice(1,3);
								}else{
									translation=translation.slice(0,2);
								}
								let item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
								item.firstChild.link=list[i];
							}
						}
					}
					const control=await player.chooseControl(list).set('prompt','〖奔袭〗：请选择移除一项技能').set('ai',()=>{
						return get.min(event.list,get.skillRank,'item');
					}).set('dialog',dialog).forResultControl();
					if(control){
						player.removeSkills(control);
						let oldcurrentPhase=_status.currentPhase;
						_status.currentPhase=player;
						player.phaseUse()._extraPhaseReason="xjzh_boss_benxi_phase";
						_status.currentPhase=oldcurrentPhase;
					}
				}
			}
		},
	},
	"xjzh_boss_xiuluo":{
		trigger:{
			player:["changeHp","changeSkillsAfter"],
		},
		forced:true,
		locked:true,
		priority:20,
		filter(event,player){
			let list=player.getSkills(null,false,false).filter(skill=>{
				let info=lib.skill[skill];
				return info&&info.xjzh_xinghunSkill;
			});
			if(event.name=="changeSkills"?list.length==6:list.length) return true;
			return false;
		},
		audio:"ext:仙家之魂/audio/skill:4",
		async content(event,trigger,player){
			if(trigger.name=="changeSkills"){
				let targets=game.filterPlayer(current=>current!=player);
				targets.sort(lib.sort.seat);
				player.line(targets,'green');
				for await(let target of targets){
					target.damage('nocard');
					target.chooseToDiscard(4,"he",true)
				}
			}else{
				let list=player.getSkills(null,false,false).filter(skill=>{
					let info=lib.skill[skill];
					return info&&info.xjzh_xinghunSkill;
				});
				let str=`〖修罗〗：是否移除一个“星魂”技能${player.isDamaged()?"回复一点体力":`摸${get.translation(Math.max(1,list.length))}张牌`}`;
				const bool=await player.chooseBool(str).set('ai',()=>{
					let player=get.player();
					let list=player.getSkills(null,false,false).filter(skill=>{
						let info=lib.skill[skill];
						return info&&info.xjzh_xinghunSkill;
					});
					if(player.isDamaged()) return list.length-player.hp;
					return list.length;
				}).forResultBool();
				if(bool){
					let dialog;
					if(event.isMine()){
						dialog=ui.create.dialog('forcebutton');
						dialog.add('〖修罗〗：请选择移除一项技能');
						for(let i=0;i<list.length;i++){
							if(lib.translate[list[i]+'_info']){
								let translation=get.translation(list[i]);
								if(translation[0]=='新'&&translation.length==3){
									translation=translation.slice(1,3);
								}else{
									translation=translation.slice(0,2);
								}
								let item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
								item.firstChild.link=list[i];
							}
						}
					}
					const control=await player.chooseControl(list).set('prompt','〖修罗〗：请选择移除一项技能').set('ai',()=>{
						return get.min(event.list,get.skillRank,'item');
					}).set('dialog',dialog).forResultControl();
					if(control){
						player.removeSkills(control);
						player.isDamaged()?player.recover():player.draw(Math.max(1,list.length));
					}
				}
			}
		},
	},

};

export default skills;