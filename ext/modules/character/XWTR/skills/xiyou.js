import { lib, game, ui, get, ai, _status } from "../../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */

export const xiyouSkills={


	//西游释厄传
	"xjzh_xyj_tianhuo":{
		enable:"phaseUse",
		init(player,skill){
			player.addMark(skill,3,false);
			player.update();
			game.playXH('xjzh_xyj_tianhuochuchang');
		},
		mark:true,
		marktext:"火",
		intro:{
			name:"天火",
			content:"本局游戏可发动#次",
		},
		audio:"ext:仙家之魂/audio/skill:2",
		filterTarget(card,player,target){
			return [player,player.getNext(),player.getPrevious()].includes(target);
		},
		filterCard(card,player,target){
			return get.suit(card)=="diamond";
		},
		selectCard(){
			let player=get.player(),cards=player.getCards('he',{suit:"diamond"});
			return [1,Math.max(1,cards.length)];
		},
		position:'he',
		lose:false,
		filter(event,player){
			if(!player.countCards('he',{suit:"diamond"})) return false;
			if(!player.hasMark("xjzh_xyj_tianhuo")) return false;
			return true;
		},
		mod:{
			cardUsable(card,player,num){
				let history=player.getHistory('useCard',evt=>evt.card&&get.name(evt.card)=="xjzh_card_hunyuandan");
				if(history.length) return Infinity;
				return num;
			},
		},
		async content(event,trigger,player){
			await player.removeMark("xjzh_xyj_tianhuo",1,false);
			await event.targets[0].gain(event.cards,player,"draw");
			let targets=game.filterPlayer(current=>current!=player),thcards=event.cards.slice(0);
			targets.sortBySeat(player);
			if(event.targets[0]==player.getPrevious()) targets.reverse();
			targets.push(player);
			for(let i=0;i<targets.length;i++){
				game.delay();
				if(targets[i]==player) break;
				let res=get.damageEffect(targets[i],player,targets[i],'fire');
				const cards=await targets[i].chooseCard(`〖天火〗：选择${get.translation(thcards.length+1)}张♦牌交给${get.translation(targets[i+1])}，否则受到${get.translation(thcards.length)}点火焰伤害`,thcards.length+1,{suit:"diamond"}).set('ai',card=>{
					if(_status.event.player.hasSkillTag('nofire')) return -1;
					if(_status.event.res>=0) return 6-get.value(card);
					if(get.type(card)!='basic'){
						return 10-get.value(card);
					}
					return 8-get.value(card);
				}).set('res',res).forResultCards();
				if(cards){
					targets[i].line(targets[i+1],'fire');
					targets[i+1].gain(cards,targets[i],"draw");
					thcards=cards.slice(0);
				}else{
					targets[i].damage(player,thcards.length,"nocard","fire");
					break;
				}
			}
		},
		ai:{
			order:1,
			result:{
				player(player,target){
					if(player.hasUnknown(2)) return 0;
					let num=0,eff=0,players=game.filterPlayer();
					for(let target of players){
						if(get.damageEffect(target,player,target,'fire')>=0){num=0;continue};
						let shao=false;
						num++;
						if(target.countCards('h',card=>{
							if(get.suit(card)!='diamond'){
								return get.value(card)<10;
							}
							return get.value(card)<8;
						})<num) shao=true;
						if(shao){
							eff-=4*(get.realAttitude||get.attitude)(player,target);
							num=0;
						}
						else eff-=num*(get.realAttitude||get.attitude)(player,target)/4;
					}
					if(eff<4) return 0;
					return eff;
				},
			},
		},
	},
	"xjzh_xyj_dongcha":{
		trigger:{
			player:"phaseDrawBegin",
		},
		audio:"ext:仙家之魂/audio/skill:2",
		forced:true,
		locked:true,
		priority:1,
		filter(event,player){
			return !event.numFixed;
		},
		async content(event,trigger,player){
			trigger.num+=2;
		},
		ai:{
			viewHandcard:true,
			skillTagFilter(player,tag,arg){
				if(tag=='viewHandcard'){
					if(player==arg) return false;
					return true;
				};
			},
		},
	},
	"xjzh_xyj_ruyi":{
		trigger:{
			global:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:2,
		audio:"ext:仙家之魂/audio/skill:2",
		filter(event,player){
			if(!game.hasNature(event,"fire")) return false;
			if(event.getParent().name=="xjzh_xyj_tianhuo") return false;
			if(event.player!=player) return event.source==player;
			return true;
		},
		mod:{
			ignoredHandcard(card,player){
				if(!player.hasSkill("xjzh_xyj_ruyi")) return;
				if(!get.is.playerNames(player,'xjzh_xyj_sunwukong')) return;
				let cards=["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_huoyundao","xjzh_card_dingshenzhou","xjzh_card_zhaoyaojing"];
				if(cards.includes(card.name)) return true;
			},
			aiValue(player,card,num){
				if(!player.hasSkill("xjzh_xyj_ruyi")) return;
				if(!get.is.playerNames(player,'xjzh_xyj_sunwukong')) return;
				let cards=["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_huoyundao","xjzh_card_dingshenzhou","xjzh_card_zhaoyaojing"];
				if(cards.includes(card.name)) return num+10;
			},
		},
		getIndex(event){
			return event.num||1;
		},
		async content(event,trigger,player){
			let cards=["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_huoyundao","xjzh_card_dingshenzhou","xjzh_card_zhaoyaojing"].randomGet();
			player.gain(game.createCard(cards,null,null),"gain2","log",player)._triggered=null;
		},
		ai:{
			expose:0.5,
			threaten:1.5,
			effect:{
				target(card,player,target){
					if(get.tag(card,"fireDamage")&&target.hasSkill("xjzh_xyj_ruyi")) return [1,0.5];
				},
			},
			result:{
				player(player,target){
					if(get.tag(card,"fireDamage")&&player.hasSkill("xjzh_xyj_ruyi")) return 1.5;
					return 1;
				},
			},
		},
	},

};