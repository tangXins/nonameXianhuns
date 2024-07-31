import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const wzrySkills={

	//王者荣耀
	"xjzh_wzry_huange":{
		trigger:{
			player:"phaseBefore",
		},
		frequent:true,
		mark:true,
		marktext:"歌",
		intro:{
			content(storage,player){
				if(!storage) return;
				return `你的契约队友${get.translation(storage)}`;
			},
		},
		audio:"ext:仙家之魂/audio/skill:6",
		mod:{
			maxHandcard(player,num){
				if(player.storage.xjzh_wzry_huange) return num+2;
				return num;
			},
		},
		global:"xjzh_wzry_huange_mod",
		group:"xjzh_wzry_huange_use",
		check(event,player){return 1;},
		prompt:"〖欢歌〗：选择一名角色成为你的契约队友",
		async content(event,trigger,player){
			const targets=await player.chooseTarget("〖欢歌〗：请选择一名角色成为你的契约队友",lib.filter.notMe).set('ai',(card,player,target)=>{
				return get.attitude(player,target);
			}).forResultTargets();
			if(targets){
				player.storage.xjzh_wzry_huange=targets[0];
			}
		},
		subSkill:{
			"use":{
				trigger:{
					global:["loseAfter","gainAfter"],
				},
				forced:true,
				sub:true,
				priority:1,
				audio:"xjzh_wzry_huange",
				filter(event,player){
					if(!player.storage.xjzh_wzry_huange) return false;
					let target=player.storage.xjzh_wzry_huange;
					let hs=player.countCards("h");
					let hs2=target.countCards("h");
					if(hs2<hs) return true;
					return false;
				},
				async content(event,trigger,player){
					let target=player.storage.xjzh_wzry_huange;
					target.drawTo(player.countCards("h"));
				},
			},
			"mod":{
				locked:true,
				charlotte:true,
				superCharlotte:true,
				mod:{
					maxHandcard(player,num){
						let target=game.findPlayer(function(current){
							return get.is.playerNames(current,"xjzh_wzry_duoliya")&&current.storage.xjzh_wzry_huange&&current.storage.xjzh_wzry_huange==player;
						});
						if(!target) return num;
						if(num>=target.getHandcardLimit()) return num;
						return target.getHandcardLimit();
					},
				},
			},
		},
	},
	"xjzh_wzry_zhulang":{
		trigger:{
			player:"drawAfter",
		},
		forced:true,
		locked:true,
		priority:3,
		audio:"ext:仙家之魂/audio/skill:5",
		filter(event,player){
			if(event.getParent("xjzh_wzry_zhulang").name=="xjzh_wzry_zhulang") return false;
			return player.storage.xjzh_wzry_huange&&!event.numFixed;
		},
		async content(event,trigger,player){
			const evt=await player.draw(trigger.num);
			if(player.storage.xjzh_wzry_huange){
				let str=`【逐浪】：选择至多${trigger.num}张牌交给${get.translation(player.storage.xjzh_wzry_huange)}`;
				const cards=await player.chooseCardButton(evt.result,[Math.ceil(trigger.num/2),trigger.num],str,true).set('ai',button=>{
					return 8-get.value(button.link);
				}).forResultLinks();
				if(cards){
					let target=player.storage.xjzh_wzry_huange;
					target.gain(cards,player,'draw');
					player.recover();
					target.recover();
				}
			}
		},
	},
	"xjzh_wzry_tiannai":{
		enable:"phaseUse",
		limited:true,
		skillAnimation:true,
		animationColor:"water",
		animationStr:"人鱼之歌",
		init:function(player){
			game.playXH('xjzh_wzry_tiannaiaudio');
			player.storage.xjzh_wzry_tiannai=false;
		},
		audio:"ext:仙家之魂/audio/skill:4",
		filter:function(event,player){
			if(!player.storage.xjzh_wzry_huange) return false;
			return !player.storage.xjzh_wzry_tiannai;
		},
		content:function(){
			"step 0"
			player.awakenSkill('xjzh_wzry_tiannai');
			player.storage.xjzh_wzry_tiannai=true;
			"step 1"
			var target=player.storage.xjzh_wzry_huange;
			target.link(false);
			target.discard(target.getCards('j'));
			target.turnOver(false);
			player.xjzh_resetSkill();
			target.addSkill("xjzh_zengyi_poxiao");
			target.storage.xjzh_wzry_tiannaiaudio=true;
			"step 2"
			player.loseMaxHp();
			player.clearSkills();
		},
	},
	"xjzh_wzry_xiaxing":{
		trigger:{
			source:"damageAfter",
		},
		filter:function(event,player){
			return player.countMark("xjzh_wzry_xiaxing")<4&&!player.hasSkill("xjzh_wzry_xiaxing_off");
		},
		forced:true,
		locked:true,
		charlotte:true,
		mod:{
			selectTarget:function(card,player,range){
				var type=get.type(card);
				var num=player.countMark("xjzh_wzry_xiaxing")
				if(range[1]==-1) return;
				if(type=="equip"||type=="delay") return
				if(game.players.length<3) return;
				if(!player.hasSkill("xjzh_wzry_xiaxing_off")) range[1]+=Math.min(num,game.players.length-1);
				else range[1]+=game.players.length-1;
			},
		},
		audio:"ext:仙家之魂/audio/skill:2",
		superCharlotte:true,
		fixed:true,
		popup:false,
		marktext2:"剑",
        marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_xiaxing.png>`,
		intro:{
			content:"当前已有#道剑气",
		},
		content:function(){
			"step 0"
			player.addMark("xjzh_wzry_xiaxing",1,false);
			player.markSkill("xjzh_wzry_xiaxing");
			game.log(player,"获得了一道剑气");
			/*player.popup("剑气");
			setTimeout(()=>{
				player.removeMark("xjzh_wzry_xiaxing",1,false);
				if(!player.hasMark("xjzh_wzry_xiaxing")) player.unmarkSkill("xjzh_wzry_xiaxing");
				game.log(player,"失去了一道剑气");
			},60000);*/
			"step 1"
			if(player.countMark("xjzh_wzry_xiaxing")<4){
				event.finish();
			}
			"step 2"
			player.clearMark("xjzh_wzry_xiaxing",false);
			"step 3"
			while(_status.event.name!='phase'){
				_status.event=_status.event.parent;
			}
			_status.event.finish();
			_status.event.untrigger(true);
			player.addSkill("xjzh_wzry_xiaxing_off");
			player.phase("xjzh_wzry_xiaxing");
		},
		subSkill:{"off":{sub:true,},},
	},
	"xjzh_wzry_jinjiu":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:6",
		filter:function(event,player){
			if(game.hasPlayer(function(current){
				return player.inRange(current);
			})&&!player.hasSkill("xjzh_wzry_jinjiu_off")) return true;
			return false;
		},
		mod:{
			cardUsable:function (card,player,num){
				if(!player.storage.xjzh_wzry_jinjiu) return num;
				var target=player.storage.xjzh_wzry_jinjiu;
				var num2=Math.abs(player.getSeatNum()-target.getSeatNum());
				if(card.name=="sha"||card.name=="jiu") return num+num2;
			},
		},
		filterTarget:function(card,player,target){
			if(target==player) return false;
			return player.inRange(target);
		},
		content:function(){
			"step 0"
			player.storage.xjzh_wzry_jinjiu=target;
			player.popup(target);
			game.swapSeat(player,target);
			player.popup(target);
			if(!player.hasSkill("jiu")){
				player.useCard({name:'jiu',isCard:true},player,false);
				game.playXH(['xjzh_wzry_jinjiu1','xjzh_wzry_jinjiu2'].randomGet());
			}
			var num=Math.abs(player.getSeatNum()-target.getSeatNum());
			player.draw(num);
			"step 1"
			player.addTempSkill("xjzh_wzry_jinjiu_off");
			"step 2"
			var num=Math.abs(player.getSeatNum()-target.getSeatNum());
			var evt=event.getParent("phase");
			if(evt&&evt.getParent){
				var next=game.createEvent('xjzh_wzry_jinjiu_delete',false,evt.getParent());
				next.player=player;
				next.target=target;
				next.num=num;
				next.setContent(function(){
					game.swapSeat(player,target);
					player.popup(target);
					if(!player.hasSkill("jiu")){
						player.useCard({name:'jiu',isCard:true},player,false);
						game.playXH(['xjzh_wzry_jinjiu1','xjzh_wzry_jinjiu2'].randomGet());
					}
					player.draw(num);
					delete player.storage.xjzh_wzry_jinjiu;
				});
			}
		},
		subSkill:{"off":{sub:true,},},
	},
	"xjzh_wzry_jiange":{
		forced:true,
		locked:true,
		charlotte:true,
		superCharlotte:true,
		fixed:true,
		audio:"ext:仙家之魂/audio/skill:6",
		filter:function(event,player){
			if(!player.hasSkill("xjzh_wzry_xiaxing_off")) return false;
			if(!player.countCards('h')) return false;
			return true;
		},
		enable:"phaseUse",
		usable:5,
		group:"xjzh_wzry_jiange_remove",
		content:function(){
			"step 0"
			var list=[]
			event.cards=player.getCards('h');
			for(var i=0;i<event.cards.length;i++){
				if(!list.includes(get.type(event.cards[i]))) list.add(get.type(event.cards[i]));
			}
			var dialog=ui.create.dialog("〖剑歌〗：请选择一种类型的牌弃置之","hidden",[event.cards,'vcard']);
			player.chooseControl(list,"cancel2").set('ai',function(){
				return list.randomGet();
			}).set('dialog',dialog);
			"step 1"
			if(result.control!="cancel2"){
				var list=[]
				for(var i=0;i<event.cards.length;i++){
					if(get.type(event.cards[i])==result.control) list.push(event.cards[i]);
				}
				player.discard(list);
				player.draw(list.length);
			}else{
				event.finish();
			}
			"step 2"
			if(result&&result.length){
				var cards=result.slice(0);
				var num=0;
				if(cards.length==1) return;
				for(var i=0;i<cards.length-1;i++){
					var card=cards[i]
					var card2=cards[i+1]
					if(get.number(card)==get.number(card2)||get.suit(card)==get.suit(card2)||get.type(card)==get.type(card2)) num++
				}
				if(num==cards.length-1){
					player.draw(cards.length);
					event.redo();
				}
			}
		},
		subSkill:{
			"remove":{
				trigger:{
					player:"phaseAfter",
				},
				direct:true,
				priority:-10,
				sub:true,
				lastDo:true,
				filter:function(event,player){
					return player.hasSkill("xjzh_wzry_xiaxing_off");
				},
				content:function(){
					player.removeSkill("xjzh_wzry_xiaxing_off",true);
				},
			},
		},
	},
	"xjzh_wzry_xingchen":{
		trigger:{
			player:"$logSkill",
		},
		filter(event,player){
			var info=get.info(event.skill);
			if(!lib.translate[event.skill]) return false;
			if(!lib.translate[event.skill+'_info']) return false;
			if(lib.skill.global.includes(event.skill)) return false;
			if(info&&(info.limited||info.juexingji||info.dutySkill||info.equipSkill||info.sub||info.unique)) return false;
			if(info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) return false;
			return true;
		},
		mark:true,
		marktext:"星",
		intro:{
			name:"星辰之力",
			content:"mark",
		},
		locked:true,
		forced:true,
		unique:true,
		audio:"ext:仙家之魂/audio/skill:3",
		init(player){
			game.playXH('xjzh_wzry_yaoStart');
		},
		group:["xjzh_wzry_xingchen_damage"],
		async content(event,trigger,player){
			await player.addMark("xjzh_wzry_xingchen",1,false);
			game.log(player,"因","#g〖"+get.translation(trigger.skill)+"〗","获得了一个星辰之力");
			if(player.countMark("xjzh_wzry_xingchen")>=3){
				player.clearMark("xjzh_wzry_xingchen");
				player.drawTo(4);
				player.chooseUseTarget({name:"wanjian"});
			}
		},
		subSkill:{
			"off":{sub:true,},
			"damage":{
				trigger:{
					player:"damageBegin",
				},
				forced:true,
				sub:true,
				audio:"xjzh_wzry_xingchen",
				filter(event,player){
					return !player.hasSkill("xjzh_wzry_xingchen_off");
				},
				async content(event,trigger,player){
					event._args=[trigger.num,trigger.nature,trigger.cards,trigger.card];
					if(trigger.source) event._args.push(trigger.source);
					else event._args.push("nosource");
					window.xjzh_wzry_xingchen=setTimeout(function(){
						player.addTempSkill("xjzh_wzry_xingchen_off","damageAfter");
						game.playXH('xjzh_wzry_xingchenDamage');
						player.damage.apply(player,event._args.slice(0));
					},15000);
					game.log(player,"受到",trigger.source?"来自于"+get.translation(trigger.source)+"的":"",trigger.num,"点伤害转为星削将于15s后结算");
					trigger.changeToZero();
				},
				ai:{
					effect:{
						target(card,player,target){
							if(get.tag(card,"damage")) return 0.7;
						},
					},
				},
			},
		},
	},
	"xjzh_wzry_liekong":{
		enable:"phaseUse",
		usable:1,
		filterCard(card,player,target){
			var suit=get.suit(card);
			for(var i=0;i<ui.selected.cards.length;i++){
				if(get.suit(ui.selected.cards[i])==suit) return false;
			}
			return true;
		},
		selectCard:[1,4],
		position:'he',
		complexCard:true,
		filterTarget:lib.filter.notMe,
		filter(event,player){
			if(player.countCards("he")) return true;
			return false;
		},
		check(card){
			return 6-get.value(card)
		},
		prompt(event,player){
			return lib.translate.xjzh_wzry_liekong_info;
		},
		audio:"ext:仙家之魂/audio/skill:3",
		async content(event,trigger,player){
			const [bool,cards]=await event.targets[0].chooseToDiscard("h",[1,event.cards.length],card=>{
				let suits=new Array();
				event.cards.slice(0).forEach(card=>{
					suits.push(get.suit(card));
				});
				return suits.includes(get.suit(card));
			}).set('ai',card=>{
				return 6-get.value(card);
			}).forResult('bool','cards');
			let num=0;
			if(bool){
				num=event.cards.length-cards.length;
			}else{
				num=event.cards.length
			}
			while(num>0&&event.targets[0].isAlive()){
				game.delay();
				game.playXH(['xjzh_wzry_liekong1','xjzh_wzry_liekong2','xjzh_wzry_liekong3'].randomGet());
				player.useCard({name:'sha'},event.targets[0],false).set('addCount',false);
				num-=1
			}
		},
		ai:{
			order:8,
			result:{
				player(player,target,card){
					if(!player) return;
					let num=0
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isOut()) continue;
						if(game.players[i]==player) continue;
						if(get.attitude(game.players[i],player)<0) num++
					}
					return num;
				},
				target:-1,
			},
		},
	},
	//《金庸群侠传·项少龙·穿越》
	"xjzh_wzry_guichen":{
		enable:"phaseUse",
		trigger:{
			player:"dying",
		},
		frequent:true,
		audio:"ext:仙家之魂/audio/skill:3",
		getinfo:function(player){
			var js=player.getCards("j");
			var js2=[];
			for(var k=0;k<js.length;k++){
				var name=js[k].viewAs||js[k].name;
				js2.push(name);
			}
			var isDisabled=[];
			for(var j=1;j<7;j++){
				isDisabled.push(player.isDisabled(j));
			}
			var storage={
				player:player,
				hs:player.getCards("h"),
				es:player.getCards("e"),
				isDisabled:isDisabled,
				hp:player.hp,
				maxHp:player.maxHp,
				_disableJudge:player.storage._disableJudge,
				isTurnedOver:player.isTurnedOver(),
				isLinked:player.isLinked(),
				js:js,
				js2:js2,
			};
			return storage;
		},
		filter:function(event,player){
			if(event.getParent(2).name=="dying"&&event.player==player) return true;
			if(player.storage.xjzh_wzry_guichen&&player.storage.xjzh_wzry_guichen.length) return true;
			return false;
		},
		group:["xjzh_wzry_guichen2"],
		content:function(){
			'step 0'
			event.storage=player.storage.xjzh_wzry_guichen;
			event.doing=event.storage.shift();
			'step 1'
			var hp=event.doing.hp;
			player.hp=hp;
			var hs=player.getCards('he');
			if(hs.length) player.lose(hs)._triggered=null;
			'step 2'
			var hs=event.doing.hs;
			var hs2=[];
			for(var i=0;i<hs.length; i++){
				var card=get.cardPile(function(cardx){
					return cardx==hs[i];
				});
				if(!card){
					card=game.createCard(hs[i]);
				}
				hs2.push(card);
			}
			if(hs2.length) player.directgain(hs2);
			'step 3'
			var isDisabled=event.doing.isDisabled;
			for(var i=0; i<isDisabled.length; i++){
				if(isDisabled[i]==false&&player.isDisabled(i+1)) player.enableEquip(i+1)._triggered=null;
				if(isDisabled[i]==true&&!player.isDisabled(i+1)) player.disableEquip(i+1)._triggered=null;
			}
			'step 4'
			var es=event.doing.es;
			var es2=[];
			for(var i=0; i<es.length; i++){
				var card=get.cardPile(function(cardx){
					return cardx==es[i];
				});
				if(!card){
					card=game.createCard(es[i]);
				}
				es2.push(card);
			}
			if(es2.length) player.directequip(es2);
			'step 5'
			if(player.getStat().skill.xjzh_wzry_liekong>0) player.getStat().skill.xjzh_wzry_liekong=0;
			if(player.getStat().card.sha>0) player.getStat().card.sha=0
			if(player.getStat().card.jiu>0) player.getStat().card.jiu=0
			game.updateRoundNumber();
			"step 6"
			if(window.xjzh_wzry_xingchen) clearTimeout(window.xjzh_wzry_xingchen);
			"step 7"
			player.storage.xjzh_wzry_guichen=false
			player.storage.xjzh_wzry_guichen2=false;
			"step 8"
			if(event.triggername="dying"){
				if(Array.isArray(lib.skill['xjzh_wzry_guichen'].trigger.player)==false){
					lib.skill['xjzh_wzry_guichen'].trigger.player=[];
				}
			}
		},
		ai:{
			order:2,
			result:{
				player(player,target,card){
					var player=_status.event.player
					if(!player.storage.xjzh_wzry_guichen||!player.storage.xjzh_wzry_guichen.length) return;
					var num=1
					var cards=player.getCards('h');
					for(var i of cards){
						if(!player.hasUseTarget(i)) num++
					}
					return -cards.length+num;
				},
			},
		},
	},
	"xjzh_wzry_guichen2":{
		trigger:{
			player:"phaseUseBegin",
		},
		forced:true,
		unique:true,
		popup:false,
		sub:true,
		filter:function(event,player){
			return !player.storage.xjzh_wzry_guichen2;
		},
		content:function(){
			player.storage.xjzh_wzry_guichen2=true;
			var storage=[];
			storage.push(lib.skill.xjzh_wzry_guichen.getinfo(player));
			player.storage.xjzh_wzry_guichen=storage;
		},
	},
	"xjzh_wzry_jianzhong":{
		trigger:{
			source:["damageAfter","damageBegin1"],
		},
		forced:true,
		locked:true,
		priority:6,
		marktext2:"剑",
        marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_jianzhong.png>`,
		intro:{
			mark(dialog,content,player){
				let cards=player.getExpansions('xjzh_wzry_jianzhong');
				if(!cards.length) return;
				let str=`增伤：${[...new Set(player.getExpansions("xjzh_wzry_jianzhong").map(card=>get.type(card,"trick",player)))].length}`;
				dialog.add(str)
				dialog.add(cards)
			},
			markcount:"expansion",
		},
		audio:"ext:仙家之魂/audio/skill:2",
		init(player,skill){
			if(!player.storage[skill]) player.storage[skill]=10;
		},
		getIndex(event,player,triggername){
			if(triggername=="damageBegin1") return 1;
			return event.num||1;
		},
		filter(event,player,name){
			if(name=="damageBegin1") return !event.numFixed;
			return player.getExpansions('xjzh_wzry_jianzhong').length<player.storage.xjzh_wzry_jianzhong;
		},
		async content(event,trigger,player){
			if(event.triggername=="damageBegin1"){
				let cards=player.getExpansions("xjzh_wzry_jianzhong");
				let suits=[...new Set(cards.map(card=>get.suit(card)))];
				trigger.num+=suits.length;
			}else player.addToExpansion(get.cards(),'gain2').gaintag.add('xjzh_wzry_jianzhong');
		},
		ai:{
			damageBonus:true,
			skillTagFilter(player,tag,arg){
				if(tag=="damageBonus") return [...new Set(player.getExpansions("xjzh_wzry_jianzhong").map(card=>get.type(card,"trick",player)))].length>0;
			},
		},
	},
	"xjzh_wzry_cuijian":{
		trigger:{
			player:"useCard",
		},
		forced:true,
		locked:true,
		audio:"ext:仙家之魂/audio/skill:4",
		filter(event,player){
			if(!["basic","trick"].includes(get.type(event.card))) return false;
			if(player.getEquips(1).length) return get.type(event.card)=="basic";
			return get.type(event.card)=="trick"
		},
		async content(event,trigger,player){
			trigger.effectCount++;
			game.log(trigger.card,"额外结算1次");
		},
	},
	"xjzh_wzry_jianlai":{
		trigger:{
			player:"addToExpansionAfter",
		},
		audio:"ext:仙家之魂/audio/skill:4",
		filter(event,player){
			return player.getExpansions('xjzh_wzry_jianzhong').length>=player.storage.xjzh_wzry_jianzhong;
		},
		forced:true,
		locked:true,
		mod:{
			cardUsable(card,player,num){
				if(!card.cards) return;
				for(let i of card.cards){
					if(i.hasGaintag("xjzh_wzry_jianzhong")) return Infinity;
				}
			},
			targetInRange(card,player,target){
				if(!card.cards) return;
				for(let i of card.cards){
					if(i.hasGaintag("xjzh_wzry_jianzhong")) return true;
				}
			},
		},
		marktext2:"剑来",
        marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_wzry_jianlai.png>`,
		async content(event,trigger,player){
			let cards=player.getExpansions('xjzh_wzry_jianzhong');
			player.directgain(cards,'gain2',null,'xjzh_wzry_jianzhong');
			player.unmarkSkill('xjzh_wzry_jianzhong');
			player.storage.xjzh_wzry_jianzhong+=10;
		},
		ai:{
			combo:'xjzh_wzry_jianzhong',
		},
	},
	"xjzh_wzry_bieyue":{
		trigger:{
			player:['turnOverBefore','phaseJudgeBefore','phaseDrawBefore','phaseDiscardBefore'],
		},
		preHidden:true,
		locked:true,
		notemp:true,
		unique:true,
		audio:"ext:仙家之魂/audio/skill:2",
		init:function(player){
			player.addMark("xjzh_wzry_bieyue",4,false);
			player.markSkill("xjzh_wzry_bieyue");
			player.update();
			setInterval(function(){
				if(player.countMark("xjzh_wzry_bieyue")<4){
					game.playXH('xjzh_wzry_bieyue3');
					player.addMark('xjzh_wzry_bieyue',1,false);
					player.markSkill("xjzh_wzry_bieyue");
				}
			},50000);
		},
		marktext:"月",
		intro:{
			name:"别月",
		},
		filter:function(event,player){
			if(!player.hasMark("xjzh_wzry_bieyue")) return false;
			if(event.name=='phaseJudge'){
				return player.countCards('j');
			}
			if(event.name=='phaseDiscard'){
				return player.needsToDiscard();
			}
			if(event.name=='phaseDraw'){
				return !player.skipList.includes("phaseDraw");
			}
			if(event.name=='turnOver'){
				if(player.isTurnedOver()) return false;
				return true;
			}
			return false;
		},
		prompt:function(event,player){
			var evt=event.name
			var str="〖别月〗："
			if(evt=="phaseJudge") str+="是否移除一个“月”跳过判定阶段？";
			if(evt=="phaseDiscard") str+="是否移除一个“月”跳过弃牌阶段？";
			if(evt=="phaseDraw") str+="是否移除一个“月”额外摸一张牌？";
			if(evt=="turnOver") str+="是否移除一个“月”跳过翻面？";
			return str;
		},
		check:function(event,player){
			var evt=event.name
			if(evt=="phaseJudge"){
				var cards=player.getCards('j');
				var num=0
				for(var i of cards){
					if(get.tag(i,'damage')||get.tag(i,'skip')) num++
				}
				return num;
			}
			else if(evt=="phaseDiscard"){
				var num2=0
				if(player.needsToDiscard()){
					for(var i of player.getCards('h')){
						num2+=get.value(i)/3
					}
				}
				return num2;
			}
			else if(evt=="phaseDraw"){
				if(player.countMark("xjzh_wzry_bieyue")>1) return 1;
			}
			else if(evt=="turnOver"){
				if(player.isTurnedOver()) return 1;
			}
			return 0.5;
		},
		content:function(){
			player.removeMark('xjzh_wzry_bieyue',1,false);
			if(trigger.name=="phaseDraw"){
				trigger.num++
				game.log(player,"移除了一个“月”额外摸了","#y1","张牌");
				event.finish();
				return;
			}
			else if(trigger.name=="turnOver"){
				if(player.isTurnedOver()){
					player.turnOver(false);
				}else{
					trigger.cancel();
				}
				player.turnOver(false);
				game.log(player,"移除了一个“月”解除了","#y翻面");
				event.finish();
				return;
			}
			trigger.cancel();
			var str="";
			if(trigger.name=="phaseJudge") str="#y判定阶段";
			str="#y弃牌阶段";
			game.log(player,"移除了一个“月”跳过了",str);
		},
		ai:{
			threaten:3,
			expose:0.2,
			notemp:true,
			result:{
				player:function(player){
					if(player.storage.xjzh_wzry_huanhai==true){
						if(player.countMark("xjzh_wzry_bieyue")==1){
							var num=game.filterPlayer(function(current){
								return current.isOut()&&player.isFriendsOf(current);
							});
							var num2=game.countPlayer(function(current){
								return current.isOut()&&player.isEnemiesOf(current);
							});
							if(num<=num2||player.hujia>=2) return -10;
						}
						return lib.skill.xjzh_wzry_bieyue.check.apply(this,arguments);
					}
				},
			},
		},
	},
	"xjzh_wzry_shunhua":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(!game.hasPlayer(function(current){return !current.hasMark("xjzh_wzry_bieyue")&&current!=player})) return false;
			return player.countMark("xjzh_wzry_bieyue")>0;
		},
		prompt:function(event,player){
			var player=_status.event.player
			var num=player.countMark("xjzh_wzry_bieyue");
			return "〖瞬华〗:选择至多"+get.translation(num)+"个目标令其各获得一个“月”标记";
		},
		filterTarget:function(card,player,target){
			return target!=player&&!target.hasMark("xjzh_wzry_bieyue");
		},
		selectTarget:function(){
			var player=_status.event.player
			return[1,player.countMark("xjzh_wzry_bieyue")];
		},
		content:function(){
			target.addMark("xjzh_wzry_bieyue",1);
			player.removeMark("xjzh_wzry_bieyue",1,false);
		},
		ai:{
			order:8,
			result:{
				player:1,
				target:-1,
			},
		},
	},
	"xjzh_wzry_liuguang":{
		mod:{
			targetInRange:function (card,player,target){
				if(card.name=='sha'){
					if(target.hasMark('xjzh_wzry_bieyue')&&target!=player) return true;
				}
			},
		},
		trigger:{
			player:"useCardToPlayer",
		},
		forced:true,
		priority:-2,
		popup:false,
		notemp:true,
		unique:true,
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(!event.targets||!event.targets.length) return false;
			if(get.name(event.card)!='sha') return false;
			var info=get.info(event.card);
			if(info.allowMultiple==false) return false;
			if(info.multitarget) return false;
			return true;
		},
		content:function(){
			"step 0"
			player.addTempSkill("xjzh_wzry_liuguang_off","shaAfter");
			var targets=game.filterPlayer(function(current){return current.hasMark("xjzh_wzry_bieyue")&&current!=player});
			if(targets.length<=0){
				event.finish();
				return;
			}
			event.targets=targets.slice(0);
			"step 1"
			if(event.targets.length){
				event.targetx=event.targets.shift();
				event.targetx.chooseCard('he',1).set('ai',function(card){
					var att=get.attitude(player,event.targetx);
					if(event.targetx.countCards('h','tao')||event.targetx.countCards('h','shan')) return 0;
					if(att>0){
						return 8-get.value(card);
					}
					return 4-get.value(card);
				});
			}
			"step 2"
			if(result.bool){
				player.gain(result.cards[0],event.targetx,'gain2');
			}else{
				event.targetx.say("否");
				game.delayx(1.5);
				trigger.targets.push(event.targetx);
			}
			"step 3"
			player.logSkill('xjzh_wzry_liuguang',event.targetx);
			event.targetx.removeMark("xjzh_wzry_bieyue",1);
			if(event.targets.length){
				event.goto(1);
			}else{
				event.finish();
				return;
			}
		},
		subSkill:{"off":{sub:true,},},
		ai:{
			unequip:true,
			notemp:true,
			skillTagFilter:function(player,tag,arg){
				if(!arg.target.hasMark("xjzh_wzry_bieyue")) return false;
			},
		},
		subSkill:{off:{sub:true,},},
	},
	"xjzh_wzry_liuguang2":{
		mod:{
			globalTo:function(from,to,distance){
				return distance+1;
			},
			targetInRange:function (card,player,target){
				return true;
			},
			cardUsable:function(card,player,num){
				if(card.name=="sha"||card.name=="jiu" ) return num*2;
			},
		},
		trigger:{
			player:"useCard",
		},
		forced:true,
		priority:-2,
		notemp:true,
		unique:true,
		audio:"xjzh_wzry_liuguang",
		filter(event,player){
			if(!event.targets||!event.targets.length) return false;
			if(get.name(event.card)!='sha') return false;
			let info=get.info(event.cards[0]);
			if(info.allowMultiple==false) return false;
			if(info.multitarget) return false;
			return true;
		},
		async content(event,trigger,player){
			player.addTempSkill("xjzh_wzry_liuguang2_off","shaAfter");
			const cards=await trigger.targets[0].chooseCard('he',1).set('ai',card=>{
				let player=get.player();
				let target=trigger.targets[0];
				let att=get.attitude(player,target);
				if(target.countCards('h','tao')||target.countCards('h','shan')) return 0;
				if(att>0) return 8-get.value(card);
				return 4-get.value(card);
			}).forResultCards();
			if(cards){
				player.gain(cards[0],trigger.targets[0],'gain2');
			}else{
				trigger.targets[0].say("否");
				game.delayx(1.5);
				trigger.effectCount++;
				game.log(trigger.card,'额外结算1次');
			}
		},
		subSkill:{"off":{sub:true,},},
		ai:{
			unequip:true,
			notemp:true,
		},
	},
	"xjzh_wzry_huanhai":{
		enable:"phaseUse",
		limited:true,
		unique:true,
		skillAnimation:true,
		animationColor:"water",
		animationStr:"幻海映月",
		filterTarget:function(card,player,target){
			return target!=player;
		},
		init:function(player){
			player.storage.xjzh_wzry_huanhai=false;
			player.storage.xjzh_wzry_huanhai_remove=[]
		},
		filter:function(event,player){
			if(!player.hasMark("xjzh_wzry_bieyue")) return false;
			if(game.roundNumber<=1&&player.hp>1) return false;
			return !player.storage.xjzh_wzry_huanhai;
		},
		content:function(){
			"step 0"
			player.awakenSkill('xjzh_wzry_huanhai');
			player.storage.xjzh_wzry_huanhai=true;
			var players=game.filterPlayer(function(current){return current.hasMark('xjzh_wzry_bieyue')&&current!=player});
			for(var i of players){
				i.clearMark("xjzh_wzry_bieyue",false);
			}
			if(player.countMark("xjzh_wzry_bieyue")<4) player.addMark("xjzh_wzry_bieyue",4-player.countMark("xjzh_wzry_bieyue"));
			"step 1"
			var players=game.filterPlayer(function(current){return current!=target&&current!=player});
			var list=[]
			for(var i of players){
				list.push(i)
				i.classList.add('out');
				game.log(i,"因","#y〖幻海〗","暂时离开游戏");
			}
			player.storage.xjzh_wzry_huanhai_remove=list.slice(0);
			"step 2"
			player.addSkill("xjzh_tongyong_baiban");
			player.addSkill("xjzh_wzry_liuguang2");
			player.addSkill("xjzh_wzry_huanhai_hujia");
			player.addSkill("xjzh_wzry_huanhai_remove");
			var skills=[
				"xjzh_wzry_shunhua",
				"xjzh_wzry_liuguang"
			]
			player.storage['xjzh_tongyong_baiban'].addArray(skills);
			"step 3"
			player.changeHujia(player.hp);
		},
		ai:{
			order:3,
			result:{
				player:function(player,target){
					var att=get.attitude(target,player);
					if(att<=0){
						if(player.hp>target.hp) return 2;
						return 1;
					}
					return 0;
				},
				target:function(player,target){
					var att=get.attitude(target,player);
					if(att<=0){
						if(player.hp>target.hp) return -2;
						return -1;
					}
					return 0;
				},
			},
		},
		subSkill:{
			"hujia":{
				trigger:{
					source:"damageAfter",
				},
				direct:true,
				priority:-3,
				sub:true,
				content:function(){
					player.changeHujia(trigger.num);
				},
			},
			"remove":{
				trigger:{
					global:"dieAfter",
					player:"xjzh_wzry_bieyueAfter",
				},
				forced:true,
				priority:-3,
				sub:true,
				forceDie:true,
				skillAnimation:true,
				animationColor:"water",
				animationStr:"幻海映月",
				filter:function(event,player){
					if(!player.storage.xjzh_wzry_huanhai) return false;
					if(event.name=="xjzh_wzry_bieyue"&&player.hasMark("xjzh_wzry_bieyue")) return false;
					if(event.name=="die"&&event.player.isAlive()) return false;
					return true;
				},
				content:function(){
					"step 0"
					var players=player.storage.xjzh_wzry_huanhai_remove
					for(var i of players){
						i.classList.remove('out');
						game.log(i,"回到了游戏");
					}
					game.log(players);
					delete player.storage.xjzh_wzry_huanhai_remove
					"step 1"
					if(trigger.player!=player){
						var num=player.hujia
						player.addMark("xjzh_wzry_bieyue",num,false);
						player.changeHujia(-num);
					}
					"step 2"
					delete player.storage['xjzh_tongyong_baiban']
					player.removeSkill("xjzh_tongyong_baiban");
					player.removeSkill("xjzh_wzry_liuguang2");
					player.removeSkill("xjzh_wzry_huanhai_hujia");
					player.removeSkill("xjzh_wzry_huanhai_remove");
				},
			},
		},
	},
	"xjzh_wzry_xunshou":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		audio:"ext:仙家之魂/audio/skill:3",
		filter:function(event,player){
			if(event.player==player) return false;
			/*var suits=[]
			if(event.player.getExpansions('xjzh_wzry_xunshou').length){
				var cards=event.player.getExpansions('xjzh_wzry_xunshou');
				for(var i of cards){
					suits.add(get.suit(i));
				}
			}
			return event.player.countCards('he',function(card){
				return !suits.includes(get.suit(card));
			});*/
			return true;
		},
		marktext:"巡",
		intro:{
			content:"expansion",
			markcount:"expansion",
		},
		onremove:function(player,skill){
			var players=game.filterPlayer(function(current){
				return current.getExpansions(skill).length;
			});
			for(var i=0;i<players.length;i++){
				var cards=players[i].getExpansions(skill);
				players[i].loseToDiscardpile(cards);
			}
		},
		content:function(){
			"step 0"
			var suits=[]
			if(trigger.player.getExpansions('xjzh_wzry_xunshou').length){
				var cards=trigger.player.getExpansions('xjzh_wzry_xunshou');
				for(var i of cards){
					suits.add(get.suit(i));
				}
			}
			trigger.player.chooseCard(get.prompt('xjzh_wzry_xunshou'),'he',function(card){
				return !suits.includes(get.suit(card));
			}).set('ai',function(card){
				var att=get.attitude(player,_status.event.getTrigger().player);
				if(att>0) return 8-get.value(card)
				return 4-get.value(card);
			}).set('suits',suits);
			"step 1"
			if(result.bool){
				var card=result.cards[0]
				trigger.player.addToExpansion(card,"gain2",trigger.player).gaintag.add("xjzh_wzry_xunshou");
			}else{
				player.draw(2);
			}
			"step 2"
			if(trigger.player.getExpansions('xjzh_wzry_xunshou').length>=4){
				trigger.player.damage(1,player,'nocard');
				var cards=trigger.player.getExpansions('xjzh_wzry_xunshou');
				trigger.player.loseToDiscardpile(cards);
				trigger.player.addTempSkill('baiban','damageAfter');
			}
		},
	},
	"xjzh_wzry_konglie":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:3",
		filter:function(event,player){
			if(player.hasSkill('xjzh_wzry_konglie_jin')) return false;
			return game.hasPlayer(function(current){
				return current.getExpansions('xjzh_wzry_xunshou').length;
			});
		},
		filterTarget:function(card,player,target){
			return target.getExpansions('xjzh_wzry_xunshou').length;
		},
		content:function(){
			"step 0"
			var cards=target.getExpansions('xjzh_wzry_xunshou');
			player.chooseCardButton(get.prompt('xjzh_wzry_konglie'),cards,1).set('filterButton',function(button){
				return _status.event.player.hasUseTarget(button.link);
			}).set('ai',function(button){
				var player=_status.event.player;
				if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
				return 0;
			});
			"step 1"
			if(result.bool){
				if(player.hasUseTarget(result.links[0])){
					player.chooseUseTarget(result.links[0],true);
				}
			}else{
				event.finish();
				return;
			}
			"step 2"
			if(!target.inRangeOf(player)){
				player.addTempSkill('xjzh_wzry_konglie_jin');
			}
		},
		ai:{
			order:8,
			result:{
				player:function(player,target){
					var cards=target.getExpansions('xjzh_wzry_xunshou');
					var num=0
					for(var card of cards){
						if(player.hasUseTarget(card)) return num+=player.getUseValue(card);
					}
					if(target.inRangeOf(player)) return num;
					return 0.1;
				},
			},
		},
	},
	"xjzh_wzry_daofeng":{
		trigger:{
			player:"phaseBegin",
		},
		forced:true,
		mark:true,
		locked:true,
		marktext:"☯",
		zhuanhuanji:true,
		intro:{
			name:"刀锋",
			content:function(storage,player,skill){
				if(player.storage.xjzh_wzry_daofeng==true) return '每个回合开始时，若场上有“巡”，你可以展示并从场上“巡”中弃置至多4张花色不一致的牌，然后对一名其他角色造成等量伤害。';
				return '当你受到伤害或体力流失时，若场上没有“巡”且数值不小于2，你可以防止之，然后令一名角色将一张牌置于武将牌上称为“巡”。';
			},
		},
		audio:"ext:仙家之魂/audio/skill:2",
		content:function(){
			"step 0"
			var list=[player.getNext(),player.getPrevious()]
			for(var i of list){
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
			if(player.storage.xjzh_wzry_daofeng==true){
				player.storage.xjzh_wzry_daofeng=false;
				player.addTempSkill('xjzh_wzry_daofeng_2','phaseUseAfter');
			}else{
				player.storage.xjzh_wzry_daofeng=true;
				player.addTempSkill('xjzh_wzry_daofeng_1','phaseUseAfter');
			};
		},
		subSkill:{
			"1":{
				trigger:{
					global:"phaseZhunbeiBegin",
				},
				sub:true,
				audio:"ext:仙家之魂/audio/skill:2",
				check:function(event,player){
					/*return game.hasPlayer(function(current){
						return player.isFriendsOf(current);
					});*/
					return player.getFriends().length;
				},
				prompt:"〖刀锋〗：弃置场上4张花色不一致的“巡”对一名角色造成等量伤害",
				filter:function(event,player){
					var players=game.filterPlayer(function(current){
						return current.getExpansions('xjzh_wzry_xunshou').length;
					});
					var list=[]
					for(var i=0;i<players.length;i++){
						var cards=players[i].getExpansions('xjzh_wzry_xunshou');
						list.push(cards);
					}
					var suits=[]
					for(var i of list){
						if(!suits.includes(get.suit(i))) suits.add(get.suit(i));
					}
					if(suits.length<4) return false;
					return true;
				},
				content:function(){
					"step 0"
					var players=game.filterPlayer(function(current){
						return current.getExpansions('xjzh_wzry_xunshou').length;
					});
					event.list=[]
					for(var i=0;i<players.length;i++){
						var cards=players[i].getExpansions('xjzh_wzry_xunshou');
						event.list.push(cards);
					}
					var suits=[]
					for(var i of event.list){
						if(!suits.includes(get.suit(i))) suits.add(get.suit(i));
					}
					if(suits.length<4) return;
					player.chooseCardButton(event.list,4,true).set('filterButton',function(button){
						var suit=get.suit(button.link);
						for(var i=0;i<ui.selected.buttons.length;i++){
							if(get.suit(ui.selected.buttons[i].link)==suit) return false;
						}
						return true;
					}).set('complexCard',true);
					"step 1"
					if(result.links){
						player.loseToDiscardpile(result.links);
						player.chooseTarget('〖刀锋〗：对一名角色造成4点伤害',function(card,player,target){
							return target!=player;
						}).set('ai',function(target){
							return -get.attitude(player,target);
						});
					}
					"step 2"
					if(result.bool&&result.targets.length){
						result.targets[0].damage(4,player,'nocard');
					}
				},
			},
			"2":{
				trigger:{
					player:["damageBegin1","loseHpBegin"],
				},
				check:function(event,player){return 1;},
				sub:true,
				filter:function(event,player){
					if(event.num<=1) return false;
					return !game.hasPlayer(function(current){
						return current.getExpansions('xjzh_wzry_xunshou').length;
					});
				},
				audio:"ext:仙家之魂/audio/skill:2",
				prompt:"〖刀锋〗：是否防止即将受到的伤害/体力流失，然后令一名角色将一张牌置于武将牌上称为“巡”",
				content:function(){
					"step 0"
					trigger.changeToZero();
					"step 1"
					player.chooseTarget('〖刀锋〗：令一名角色将一张牌置于武将牌上称为“巡”',true,function(card,player,target){
						return target!=player;
					}).set('ai',function(target){
						if(target==player.getNext()||target==player.getPrevious()) return 0.5;
						return -get.attitude(player,target);
					});
					"step 2"
					if(result.bool){
						event.target=result.targets[0]
						var suits=[]
						if(event.target.getExpansions('xjzh_wzry_xunshou').length){
							var cards=event.target.getExpansions('xjzh_wzry_xunshou');
							for(var i of cards){
								suits.add(get.suit(i));
							}
						}
						event.target.chooseCard(get.prompt('xjzh_wzry_xunshou'),'he',function(card){
							return !suits.includes(get.suit(card));
						}).set('ai',function(card){
							var att=get.attitude(player,_status.event.getTrigger().player);
							if(att>0) return 8-get.value(card)
							return 4-get.value(card);
						}).set('suits',suits);
					}
					"step 3"
					if(result.cards.length){
						event.target.addToExpansion(result.cards,"gain2",event.target).gaintag.add("xjzh_wzry_xunshou");
					}else{
						player.draw(2);
					}
				},
			},
		},
	},

};