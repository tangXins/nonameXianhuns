import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const dnfSkills={

	//地下城与勇士
	"xjzh_dnf_jianshen":{
		trigger:{
			player:["phaseZhunbeiBegin","phaseJieshuBegin"],
		},
		forced:true,
		priority:12,
		mod:{
			canBeGained(card,player,target,name){
				let cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if(cards.includes(card.name)) return false;
			},
			canBeDiscarded(card,player,target,name){
				let cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if(cards.includes(card.name)) return false;
			},
			cardDiscardable(card,player){
				let cards=[
					"xjzh_card_tianjigyx",
					"xjzh_card_guanshizhengzong",
					"xjzh_card_julihjc",
					"xjzh_card_mojianklls",
					"xjzh_card_tiancongyunjian",
				];
				if(cards.includes(card.name)) return false;
			},
		},
		global:"xjzh_dnf_jianshen_nouse",
		async content(event,trigger,player){
			"step 0"
			if(player.hasDisabledSlot(1)&&!player.hasEnabledSlot(1)) return;
			let dialog=ui.create.dialog('〖剑神〗：请选择并装备一把武器','hidden'),list=[
				"xjzh_card_tianjigyx",
				"xjzh_card_guanshizhengzong",
				"xjzh_card_julihjc",
				"xjzh_card_mojianklls",
				"xjzh_card_tiancongyunjian",
			];
			dialog.add([list,'vcard']);
			const links=await player.chooseButton(dialog,true).set('ai',button=>{
				return Math.random();
			}).forResultLinks();
			if(links){
				let card=game.createCard(links[0][2]);
				player.equip(card);
			}
		},
		subSkill:{
			"nouse":{
				mod:{
					cardEnabled(card,player){
						if(!card) return;
						if(get.is.playerNames(player,"xjzh_dnf_suodeluosi")) return;
						let str = `${lib.translate[card.name]}${lib.translate[card.name + "_info"]}`;
						if(str.includes('剑')) return false;
					},
					cardEnabled2(card,player){
						if(!card) return;
						if(get.is.playerNames(player,"xjzh_dnf_suodeluosi")) return;
						let str = `${lib.translate[card.name]}${lib.translate[card.name + "_info"]}`;
						if(str.includes('剑')) return false;
					},
				},
				charlotte:true,
				locked:true,
				sub:true,
			},
		},
	},
	"xjzh_dnf_aoyi":{
		trigger:{
			player:['loseAfter','disableEquipBefore'],
			global:["equipAfter","addJudgeAfter","gainAfter","loseAsyncAfter","addToExpansionAfter"],
		},
		forced:true,
		priority:3,
		locked:true,
		filter(event,player){
			let evt=event.getl(player);
			if (event.name == "disableEquip") return event.slots.includes("equip1");
			if(get.subtype(event.cards[0])!="equip1") return false;
			return evt&&evt.player==player&&evt.es&&evt.es.length>0;
		},
		async content(event,trigger,player){
			if(trigger.name=="disableEquip"){
				while (trigger.slots.includes("equip1")) trigger.slots.remove("equip1");
				game.log(player,"的武器栏无法废除");
			}else{
				let targets=[player.getNext(),player.getPrevious()];
				for await(let target of targets){
					player.randomGain(target,'h',true);
				}

				let type=get.subtype2(trigger.cards[0]);
				switch(type){
					case 'xjzh_guangjian':
						game.claerRestraint(player);
					break;
					case 'xjzh_jujian':
						targets=targets.filter(item=>player.isEnemiesOf(item)&&!item.isTurnedOver());
						if(!targets.length) break;
						let target=targets.randomGet();
						target.turnOver(true);
					break;
					case 'xjzh_duanjian':
						targets=targets.filter(item=>player.isEnemiesOf(item));
						targets.randomGet().damage(1,player,"nocard");
					break;
					case 'xjzh_taidao':
						targets=game.filterPlayer(current=>player.inRange(current));
						if(!targets.length) break;
						for await(let target of targets){
							if(target.getEquips(1).length) target.discard(target.getCards('e',card=>get.subtype(card)=="equip1"));
						}
					break;
					case 'xjzh_dunqi':
						targets=game.filterPlayer(current=>player.inRange(current));
						if(!targets.length) break;
						targets.randomGet().goMad();
					break;
				}
			}
		},
	},
	"xjzh_dnf_jianyi":{
		trigger:{
			player:"damageBegin1",
		},
		priority:10,
		frequent:true,
		locked:true,
		prompt(event,player){
			if(!player.getEquips(1).length){
				return "〖剑意〗：是否发动〖剑神〗切换武器牌？";
			}else{
				let card=player.getEquips(1).filter(card=>get.subtype2(card))[0],type=get.subtype2(card);
				switch(type){
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
		filter(event,player){
			if(!player.getEquips(1).length) return true;
			let card=player.getEquips(1).filter(card=>get.subtype2(card))[0],type=get.subtype2(card);
			if(type=="xjzh_duanjian") return true;
			if(type=="xjzh_jujian"&&event.source&&!event.hasNature()) return true;
			if(["xjzh_guangjian","xjzh_taidao","xjzh_dunqi"].includes(type)&&event.source) return true;
			return false;
		},
		async content(event,trigger,player){
			if(!player.getEquips(1).length){
				player.useSkill("xjzh_dnf_jianshen",player);
			}else{
				let card=player.getEquips(1).filter(card=>get.subtype2(card))[0],type=get.subtype2(card);
				switch(type){
					case 'xjzh_guangjian':
						trigger.source.damage(trigger.num,player,'nocard');
						trigger.source.changexjzhBUFF('gandian',1);
					break;
					case 'xjzh_jujian':
						trigger.changeToZero();
						const targets=await player.chooseTarget(`选择一名角色令${get.translation(trigger.source)}对其使用一张【杀】`,(card,player,target)=>{
							return ![trigger.source,player].includes(target);
						}).set('ai',target=>{
							return get.effect(target,{name:'sha'},player,player);
						}).forResultTargets();
						if(targets) trigger.source.useCard({name:'sha'},targets,false).set("addCount",false);
					break;
					case 'xjzh_duanjian':
						player.draw(2);
					break;
					case 'xjzh_taidao':
						const bool=await trigger.source.chooseToDiscard(`弃置${trigger.num}张牌，否则${get.translation(player)}回复一点体力`,trigger.num,'he').set("ai", card=>{
							if (get.recoverEffect(trigger.source,player,player)<0) return 7 - get.value(card);
							return 0;
						}).forResultBool();
						if(!bool) player.recover();
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
			source:"damageBefore",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		filter(event,player){
			return event.num>0;
		},
		async content(event,trigger,player){
			trigger.player.damage(trigger.num,'notrigger','nocard')._triggered=null;
			trigger.changeToZero();
		},
	},
	"xjzh_card_julihjc_skill":{
		trigger:{
			source:"damageAfter",
		},
		prompt(event,player){
			return "是否令"+get.translation(event.player)+"跳过下个出牌阶段？";
		},
		priority:8,
		equipSkill:true,
		filter(event,player){
			return event.card&&get.name(event.card)=="sha";
		},
		check(event,player){
			return -get.attitude(player,event.player);
		},
		async content(event,trigger,player){
			trigger.player.skip('phaseUse');
		},
		ai:{
			skip:true,
		},
	},
	"xjzh_card_tiancongyunjian_skill":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		priority:88,
		equipSkill:true,
		filter(event,player){
			return event.card&&get.name(event.card)=="sha";
		},
		async content(event,trigger,player){
			const targets=await player.chooseTarget("【天丛云剑】：选择一名其他角色令其受到一点无来源伤害",lib.filter.notMe).set('ai',target=>{
				return get.damageEffect(target,player,player);
			}).forResultTargets();
			if(targets) targets[0].damage(1,'nosource');
		},
	},
	"xjzh_card_guanshizhengzong_skill":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		priority:8,
		equipSkill:true,
		filter(event,player){
			return event.card&&get.name(event.card)=="sha";
		},
		async content(event,trigger,player){
			await trigger.player.changexjzhBUFF('yishang',1);
			if(get.xjzhBUFFNum(player,"yishang")==get.xjzhBUFFInfo('yishang','limit')){
				await trigger.player.damage(get.xjzhBUFFNum(player,'yishang'),player,"nocard");
				trigger.player.changexjzhBUFF('yishang',-get.xjzhBUFFNum(player,'yishang'));
			}
		},
	},
	"xjzh_card_tianjigyx_skill":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		priority:8,
		equipSkill:true,
		mod:{
			cardUsable(card,player,num){
				if(get.name(card)=='sha') return 2;
			},
		},
		async content(event,trigger,player){
			if(get.xjzhBUFFNum(trigger.player,'gandian')<=0){
				trigger.player.changexjzhBUFF('gandian',1);
			}else{
				if(player.getStat().card.sha>0) player.getStat().card.sha-=1
			}
		},
	},

};