import { lib, game, ui, get, ai, _status } from "../../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const dnfSkills={

	//地下城与勇士
	"xjzh_card_siwangbingzhu_skill":{
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		equipSkill:true,
		priority:10,
		lastDo:true,
		filter:function(event,player){
			if(!event.source) return false;
			if(event.source!=player) return false;
			//if(event.nature&&event.nature=="ice") return false;
			return true;
		},
		content:function(){
			if(!game.hasNature(trigger)) game.setNature(trigger,'ice',false);
			if(Math.random()<=0.4&&game.hasNature(trigger,'ice')) trigger.num++
		},
		ai:{
			iceDamage:true,
		},
	},
	"xjzh_dnf_jianshen":{
		trigger:{
			player:["phaseZhunbeiBegin","phaseJieshuBegin"],
		},
		forced:true,
		priority:12,
		mod:{
			cardEnabled:function(card,player){
				if(get.subtype(card)=="equip1"){
					   var info=lib.translate[card.name]
					var info2=lib.translate[card.name+"_info"]
					var str=info+info2
					   var bool=false
					   for(var i of str){
						if(i.indexOf('剑')!=-1) bool=true;
					}
					if(bool) return true;
					return false;
				}
			},
			canBeGained:function(card,player,target,name,now){
				var cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				]
				if(cards.includes(card.name)) return false;
			},
			canBeDiscarded:function(card,player,target,name,now){
				var cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				]
				if(cards.includes(card.name)) return false;
			},
			cardDiscardable:function(card,player,name,now){
				var cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				]
				if(cards.includes(card.name)) return false;
			},
		},
		init:function(player){
			var players=game.filterPlayer(function(current){
				return current!=player;
			});
			for(var i of players){
				i.addSkill('xjzh_dnf_jianshen_nouse');
			}
		},
		group:["xjzh_dnf_jianshen_use"],
		content:function(){
			"step 0"
			if(player.isDisabled(1)) return;
			var dialog=ui.create.dialog('〖剑神〗：请选择并装备一把武器','hidden');
			var list=[
				"xjzh_card_tianjigyx",
				"xjzh_card_guanshizhengzong",
				"xjzh_card_julihjc",
				"xjzh_card_mojianklls",
				"xjzh_card_tiancongyunjian",
			]
			dialog.add([list,'vcard']);
			player.chooseButton(dialog,true).set('ai',function(button){
				return Math.random();
			});
			"step 1"
			if(result.bool){
				var card=game.createCard(result.links[0][2]);
				player.equip(card);
			}
		},
		subSkill:{
			"nouse":{
				mod:{
					cardEnabled:function(card,player){
						var info=lib.translate[card.name]
						var info2=lib.translate[card.name+"_info"]
						var str=info+info2
						if(!str) return;
						var bool=false
						for(var i of str){
							if(i.indexOf('剑')!=-1) bool=true;
						}
						if(bool) return false;
					},
				},
				sub:true,
			},
			"use":{
				trigger:{
					global:["loseEnd"],
				},
				direct:true,
				priority:12,
				sub:true,
				filter:function(event,player){
					var list=[
						"xjzh_card_tianjigyx",
						"xjzh_card_guanshizhengzong",
						"xjzh_card_julihjc",
						"xjzh_card_mojianklls",
						"xjzh_card_tiancongyunjian",
					]
					for(var i of list){
						for(var j of event.cards){
							if(i==j.name) return true;
						}
					}
					//if(list.includes(event.card.name)) return true;
					return false;
				},
				content:function(){
					var cards=trigger.cards
					var cards2=[
						"xjzh_card_tianjigyx",
						"xjzh_card_guanshizhengzong",
						"xjzh_card_julihjc",
						"xjzh_card_mojianklls",
						"xjzh_card_tiancongyunjian",
					]
					var list=[]
					for(var i of cards){
						for(var j of cards2){
							if(i.name==j) list.push(i);
						}
					}
					if(!list.length) return;
					game.cardsGotoSpecial(list);
					game.log("#y",list,"被销毁了");
				},
			},
		},
	},
	"xjzh_dnf_aoyi":{
		trigger:{
			player:'loseAfter',
			global:['equipAfter','addJudgeAfter','gainAfter','loseAsyncAfter','addToExpansionAfter'],
		},
		forced:true,
		priority:0.1,
		locked:true,
		filter:function(event,player){
			var evt=event.getl(player);
			if(get.subtype(event.card)!="equip1") return false;
			return evt&&evt.player==player&&evt.es&&evt.es.length>0;
		},
		group:["xjzh_dnf_aoyi_dis"],
		content:function(){
			"step 0"
			var players=[
				player.next,
				player.previous
			]
			for(var i of players){
				player.gainPlayerCard("请选择"+get.translation(i)+"的牌",i,1,true).set('ai',function(button){
					if(get.attitude(i,player)<0){
						return get.value(button.link);
					}
					else{
						return -get.value(button.link);
					}
				});
			}
			"step 1"
			var type2=get.subtype2(trigger.card);
			switch(type2){
				case 'xjzh_guangjian':
				if(player.countCards('j')) player.discard(player.getCards('j'));
				if(player.isTurnedOver()) player.turnOver(false);
				if(player.isLinked()) player.link(false);
				if(player.countDisabled()>0){
					for(var i=1;i<6;i++){
						game.log(i)
						if(player.isDisabled(i)) player.enableEquip(i);
					}
				}
				if(get.xjzhBUFFList(player).length>0){
					for(let i of get.xjzhBUFFList(player)){
						player.changexjzhBUFF(i,get.xjzhBUFFNum(player,-i));
					}
				}
				break;
				case 'xjzh_jujian':
				var players=[
					player.next,
					player.previous
				]
				var list=[]
				for(var i of players){
					if(player.isEnemiesOf(i)) list.push(i);
				}
				if(!list.length) return;
				var targets=list.randomGet();
				if(!player.isTurnedOver()) targets.turnOver(true);
				break;
				case 'xjzh_duanjian':
				var players=[
					player.next,
					player.previous
				]
				var list=[]
				for(var i of players){
					if(player.isEnemiesOf(i)) list.push(i);
				}
				if(!list.length) return;
				var targets=list.randomGet();
				targets.damage(1,player);
				break;
				case 'xjzh_taidao':
				var targets=game.filterPlayer(function(current){
					return player.inRange(current);
				});
				if(!targets.length) return;
				for(var i of targets){
					if(i.getEquip(1)) i.discard(i.getCards('e',1));
				}
				break;
				case 'xjzh_dunqi':
				var targets=game.filterPlayer(function(current){
					return player.inRange(current);
				});
				if(!targets.length) return;
				var targets=targets.randomGet();
				targets.goMad();
				break;
			}
		},
		subSkill:{
			"dis":{
				trigger:{
					player:"disableEquipBefore",
				},
				direct:true,
				priority:999,
				filter:function(event,player){
					return event.pos=="equip1";
				},
				content:function(){
					trigger.cancel();
					game.log(player,"的武器栏无法废除");
				},
			},
		},
	},
	"xjzh_dnf_jianyi":{
		locked:true,
		trigger:{
			player:"damageBegin1",
		},
		priority:10,
		frequent:true,
		prompt:function(event,player){
			if(!player.getEquip(1)){
				return "〖剑意〗：是否发动〖剑神〗切换武器牌？";
			}else{
				var card=player.getCards('e',1);
				var type2=get.subtype2(card);
				switch(type2){
					case 'xjzh_guangjian':
					return "〖剑意〗：是否发动技能令"+get.translation(event.source)+"受到一点伤害？";
					break;
					case 'xjzh_jujian':
					return "〖剑意〗：是否发动技能防止此伤害？";
					break;
					case 'xjzh_duanjian':
					return "〖剑意〗：是否发动技能摸两张牌？";
					break;
					case 'xjzh_taidao':
					return "〖剑意〗：是否发动技能回复一点体力？";
					break;
					case 'xjzh_dunqi':
					return "〖剑意〗：是否发动技能令"+get.translation(event.source)+"跳过出牌阶段？";
					break;
				}
			}
		},
		content:function(){
			if(!player.getEquip(1)){
				player.useSkill("xjzh_dnf_jianshen",player);
			}else{
				var card=player.getCards('e',1);
				var type2=get.subtype2(card);
				switch(type2){
					case 'xjzh_guangjian':
					if(Math.random()) trigger.source.damage(1,player,'nocard');
					break;
					case 'xjzh_jujian':
					if(Math.random()) trigger.changeToZero();
					break;
					case 'xjzh_duanjian':
					player.draw(2);
					break;
					case 'xjzh_taidao':
					player.recover();
					break;
					case 'xjzh_dunqi':
					event.getParent('phaseUse').skipped=true;
					break;
				}
			}
		},
	},
	"xjzh_card_mojianklls_skill":{
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		filter:function(event,player){
			return event.num>0;
		},
		content:function(){
			trigger.player.damage(trigger.num,'notrigger','nocard')._triggered=null;
			trigger.changeToZero();
		},
		subSkill:{
			"nodamage":{
				trigger:{
					player:"damageBegin1",
				},
				forced:true,
				priority:-3,
				sub:true,
				filter:function(event,player){
					var num=Math.floor(trigger.num/2);
					trigger.num-=num
				},
			},
		},
	},
	"xjzh_card_julihjc_skill":{
		trigger:{
			source:"damageBegin",
		},
		prompt:function(event,player){
			return "是否令"+get.translation(event.player)+"跳过下个出牌阶段？";
		},
		priority:88,
		equipSkill:true,
		filter:function(event,player){
			if(!event.card||!event.cards.length) return false;
			return event.card.name=="sha";
		},
		content:function(){
			trigger.player.skip('phaseUse');
		},
	},
	"xjzh_card_tiancongyunjian_skill":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		filter:function(event,player){
			if(!event.cards||!event.cards.length) return false;
			return event.card.name=="sha";
		},
		content:function(){
			"step 0"
			player.chooseTarget("【天丛云剑】：选择一名其他角色令其受到一点无来源伤害",function(target){
				return target!=player;
			}).set('ai',function(target){
				return get.damageEffect(target,player,player);
			});
			"step 1"
			if(result.bool){
				result.targets[0].damage(1,'nosource');
			}
		},
	},
	"xjzh_card_guanshizhengzong_skill":{
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		filter:function(event,player){
			if(!event.cards||!event.cards.length) return false;
			return event.card.name=="sha";
		},
		content:function(){
			"step 0"
			if(Math.random()){
				if(game.hasNature(trigger)) game.setNature(trigger,null,false);
				trigger.num+=Math.ceil(trigger.num/2);
				trigger.player.changexjzhBUFF('liuxue',1);
				if(get.xjzhBUFFNum(trigger.player,'liuxue')>=1){
					player.chooseBool("【观世正宗】：是否收割流血伤害？").set('ai',function(event,player){
						var num=get.xjzhBUFFNum(event.player,'liuxue');
						var num2=0
						var players=event.player
						while(players.getSeatNum()!=1){
							var players=players.previous
							num2++
						}
						var hp=event.player.hp
						if(hp<num2+num) return 10;
						return 0;
					});
				}
			}
			"step 1"
			if(result.bool){
				var num=get.xjzhBUFFNum(trigger.player,'liuxue');
				var num2=0
				var players=trigger.player
				while(players.getSeatNum()!=1){
					var players=players.previous
					num2++
				}
				trigger.player.changexjzhBUFF('liuxue',-num);
				trigger.player.damage(num+num2);
			}
		},
	},
	"xjzh_card_tianjigyx_skill":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		content:function(){
			if(get.xjzhBUFFNum(trigger.player,'gandian')<=0){
				trigger.player.changexjzhBUFF('gandian',1);
			}else{
				if(player.getStat().card.sha>0) player.getStat().card.sha-=1
			}
		},
	},

};