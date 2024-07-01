import { lib, game, ui, get, ai, _status } from "../../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const poeSkills={

	//流放之路
	//升华职业选择技能
	"xjzh_poe_choice":{
		trigger:{
			player:'enterGame',
			global:'gameStart',
		},
		silent:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		unique:true,
		firstDo:true,
		priority:Infinity,
		filter:function (event,player){
			if(!lib.config.extension_仙家之魂_poelose) return false;
			var skills1=lib.character[player.name][3];
			skills1=skills1.filter(s=>player.hasSkill(s));
			if (skills1.includes('xjzh_poe_choice')&&skills1.length>4) return true;
			if (player.name2){
				var skills2=lib.character[player.name2][3];
				skills2=skills2.filter(s=>player.hasSkill(s));
				if(skills2.includes('xjzh_poe_choice')&&skills2.length>4) return true;
			}
			return false;
		},
		content:function (){
			'step 0'
			var skills=lib.character[player.name][3];
			var pName=player.name;
			if(!skills.includes(event.name)) {
				skills=lib.character[player.name2][3];
				pName=player.name2;
			}
			skills=skills.filter(s=>s!=event.name&&player.hasSkill(s));
			var num=skills.length-4;
			event.num=num;
			if(!num){
				event.finish();
				return;
			}
			if(player.isUnderControl()){
				game.swapPlayerAuto(player);
			}
			var switchToAuto=function(){
				_status.imchoosing=false;
				event._result={
					bool:true,
					skills:skills.randomGets(num),
				};
				if(event.dialog) event.dialog.close();
				if(event.control) event.control.close();
			};
			var chooseButton=function (pName,skills){
				var event=_status.event;
				if(!event._result) event._result={};
				event._result.skills=[];
				var rSkill=event._result.skills;
				var dialog=ui.create.dialog(`请选择${get.cnNumber(num)}个技能失去`,[[pName],'character'],'hidden');
				event.dialog=dialog;
				var table=document.createElement('div');
				table.classList.add('add-setting');
				table.style.margin='0';
				table.style.width='100%';
				table.style.position='relative';
				for (var i=0;i<skills.length;i++){
					var td=ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
					td.link=skills[i];
					table.appendChild(td);
					td.innerHTML='<span>'+get.translation(skills[i])+'</span>';
					td.addEventListener(lib.config.touchscreen?'touchend':'click',function (){
						if(_status.dragged) return;
						if(_status.justdragged) return;
						_status.tempNoButton=true;
						setTimeout(function(){
							_status.tempNoButton=false;
						},
						500);
						var link=this.link;
						if (!this.classList.contains('bluebg')){
							if (rSkill.length>=event.num) return;
							rSkill.add(link);
							this.classList.add('bluebg');
						}
						else {
							this.classList.remove('bluebg');
							rSkill.remove(link);
						}
					});
				}
				dialog.content.appendChild(table);
				dialog.add('');
				dialog.open();
				event.switchToAuto=function(){
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing=false;
				};
				event.control=ui.create.control('ok',function(link){
					if(rSkill.length!==event.num) return;
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing=false;
				});
				for (var i=0;i<event.dialog.buttons.length;i++){
					event.dialog.buttons[i].classList.add('selectable');
				}
				game.pause();
				game.countChoose();
			};
			if(event.isMine()){
				chooseButton(pName,skills);
			}
			else if(event.isOnline()){
				event.player.send(chooseButton,pName,skills);
				event.player.wait();
				game.pause();
			}
			else{
				switchToAuto();
			}
			'step 1'
			var map=event.result||result;
			if(map&&map.skills){
				for(var skill of map.skills){
					player.popup(skill);
					player.removeSkill(skill);
				}
			}
		},
	},
	//普通武将选择技能
	"xjzh_poe_choice2":{
		silent:true,
		trigger:{
			player:['enterGame'],
			global:['gameStart','phaseBefore'],
		},
		direct:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		unique:true,
		firstDo:true,
		priority:Infinity,
		filter:function(event,player){
			if(!lib.config.extension_仙家之魂_poelose) return false;
			if(get.itemtype(player)!='player') return false;
			if(!get.nameList(player).filter(name=>{
				return name.indexOf("xjzh_poe")==0;
			}).length) return false;
			var skills=player.skills.slice(0);
			var list=[]
			for(var i=0;i<skills.length;i++){
				var info=lib.skill[skills[i]]
				if(lib.translate[skills[i]]&&lib.translate[skills[i]+"_info"]&&info.poelose){
					list.push(skills[i]);
				}
			}
			if(list.length>=2) return true;
			return false;
		},
		content:function(){
			"step 0"
			var skills=player.skills;
			var list=[]
			for(var i=0;i<skills.length;i++){
				var info=lib.skill[skills[i]]
				if(lib.translate[skills[i]]&&lib.translate[skills[i]+"_info"]&&info.poelose&&skills[i]!="xjzh_poe_choice2"){
					list.push(skills[i]);
				}
			}
			event.skills=list.slice(0);
			"step 1"
			if(event.skills.length){
				var dialog=ui.create.dialog('forcebutton','hidden');
				dialog.add('请选择获得一项技能');
				for(i=0;i<event.skills.length;i++){
					if(lib.translate[event.skills[i]+'_info']){
						var translation=get.translation(event.skills[i]);
						if(translation[0]=='新'&&translation.length==3){
							translation=translation.slice(1,3);
						}
						else{
							translation=translation.slice(0,2);
						}
						var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[event.skills[i]+'_info']+'</div></div>');
						item.firstChild.link=event.skills[i];
					}
				}
			}
			else{
				event.finish();
				return;
			}
			player.chooseControl(event.skills,true).set('prompt','请选择移除一项技能').set('ai',function(){
				return event.skills.randomGet();
			}).set('dialog',dialog);
			"step 2"
			if(result&&result.control){
				var skills=result.control
				for(var i of event.skills){
					if(i==skills) continue;
					player.removeSkill(i,true);
				}
				game.log(player,'选择了技能','#y〖'+get.translation(skills)+'〗');
			}
		},
	},
	//游侠
	/*"xjzh_poe_bingjian":{
		mod:{
			aiOrder:function(player,card,num){
				var name=get.name(card);
				if(name!="sha"&&name!="jiu") return num+4;
				return num;
			},
		},
		usable:1,
		locked:true,
		poelose:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:2",
		filterCard:function(card){
			return get.tag(card,'damage');
		},
		complexCard:true,
		selectCard:function(){
			var player=_status.event.player;
			var num=player.countCards('h',function(card){
				return get.tag(card,'damage');
			});
			//if(player==game.me) return -1;
			return num;
		},
		filterTarget:function(card,player,target){
			return target!=player;
		},
		position:'h',
		multitarget:true,
		multiline:true,
		filter:function(event,player){
			var hs=player.getCards('h');
			if(!hs.length) return false;
			for(var i=0;i<hs.length;i++){
				var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
				if(mod2===false) return false;
			};
			return true;
		},
		content:function(){
			"step 0"
			event.num=0
			"step 1"
			event.shanRequired=cards.length
			"step 2"
			var next=targets[event.num].chooseToUse('请使用一张闪');
			next.set('type','respondShan');
			next.set('filterCard',function(card,player){
				if(get.name(card)!='shan') return false;
				return lib.filter.cardEnabled(card,player,'forceEnable');
			});
			if(event.shanRequired>1){
				next.set('prompt2','（共需使用'+event.shanRequired+'张闪）');
			}
			next.set('ai1',function(card){
				var target=_status.event.player;
				var evt=_status.event.getParent();
				var bool=true;
				if(_status.event.shanRequired>1&&!get.is.object(card)&&target.countCards('h','shan')<_status.event.shanRequired){
					bool=false;
				}
				else if(target.hasSkillTag('useShan')){
					bool=true;
				}
				else if(target.hasSkillTag('noShan')){
					bool=false;
				}
				else if(get.damageEffect(target,evt.player,target,evt.card.nature)>=0) bool=false;
				if(bool){
					return get.order(card);
				}
				return 0;
			})
			.set('shanRequired',event.shanRequired);
			next.set('respondTo',[player,card]);
			"step 3"
			if(result.bool){
				event.shanRequired-=1;
				if(event.shanRequired>0){
					event.goto(2);
				}
			}else{
				targets[event.num].damage(event.shanRequired,player,"ice",'nocard');
				if(Math.random()<=Math.random()) targets[event.num].changexjzhBUFF('binghuan',2);
				event.num++
				if(event.num<targets.length-1) event.goto(2);
			}
		},
		prompt:"你可以将所有手牌（至少一张）当一张【冰杀】使用",
		ai:{
			order:8,
			result:{
				target:-1,
			},
		},
	},*/
	"xjzh_poe_bingjian":{
		mod:{
			aiOrder:function(player,card,num){
				var name=get.name(card);
				if(name!="sha"&&name!="jiu") return num+4;
				return num;
			},
		},
		usable:1,
		locked:true,
		poelose:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:2",
		filterCard:function(card){
			return get.tag(card,'damage');
		},
		complexCard:true,
		check:function(card){
			return 4-get.value(card);
		},
		selectCard:function(){
			var player=_status.event.player;
			var num=player.countCards('h',function(card){
				return get.tag(card,'damage');
			});
			//if(player==game.me) return -1;
			return num;
		},
		filterTarget:function(card,player,target){
			return target!=player;
		},
		position:'h',
		multitarget:true,
		multiline:true,
		filter:function(event,player){
			var hs=player.getCards('h',function(card){
				return get.tag(card,'damage');
			});
			if(!hs.length) return false;
			for(var i=0;i<hs.length;i++){
				var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
				if(mod2===false) return false;
			};
			return true;
		},
		content:function(){
			"step 0"
			event.num=0;
			"step 1"
			player.useCard({name:'sha',isCard:true,nature:"ice"},target,false).set('addCount',false);
			"step 2"
			event.num++
			if(event.num<cards.length&&target.isAlive()) event.goto(1);
			"step 3"
			if(player.getStat('damage')){
				if(Math.random()<=Math.random()) target.changexjzhBUFF('binghuan',1);
			}
		},
		ai:{
			order:8,
			expose:0.3,
			result:{
				target:-1,
			},
		},
	},
	"xjzh_poe_dianjian":{
		mod:{
			aiOrder:function(player,card,num){
				var name=get.name(card);
				if(name!="sha"&&name!="jiu") return num+4;
				return num;
			},
		},
		usable:1,
		locked:true,
		poelose:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:2",
		filterCard:function(card){
			return get.tag(card,'damage');
		},
		complexCard:true,
		check:function(card){
			return 4-get.value(card);
		},
		selectCard:function(){
			var player=_status.event.player;
			var num=player.countCards('h',function(card){
				return get.tag(card,'damage');
			});
			//if(player==game.me) return -1;
			return [1,num];
		},
		filterTarget:function(card,player,target){
			return target!=player;
		},
		selectTarget:function(){
			return ui.selected.cards.length;
		},
		position:'h',
		filter:function(event,player){
			var hs=player.getCards('h',function(card){
				return get.tag(card,'damage');
			});
			if(!hs.length) return false;
			for(var i=0;i<hs.length;i++){
				var mod2=game.checkMod(hs[i],player,'unchanged','cardEnabled2',player);
				if(mod2===false) return false;
			};
			return true;
		},
		content:function(){
			"step 0"
			player.useCard({name:'sha',isCard:true,nature:"thunder"},target,false).set('addCount',false);
			"step 1"
			if(player.getStat('damage')){
				if(Math.random()<=Math.random()) target.changexjzhBUFF('gandian',1);
			}
		},
		ai:{
			order:8,
			expose:0.3,
			result:{
				target:-1,
			},
		},
	},
	//锐眼
	"xjzh_poe_fenlie":{
		audio:"ext:仙家之魂/audio/skill:2",
		trigger:{
			player:"useCardToPlayer",
		},
		forced:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		priority:65,
		popup:false,
		filter:function (event,player){
			return get.tag(event.card,'damage')&&game.players.length>2&&event.targets.length==1&&event.target!=player&&get.type(event.card)!="delay";
		},
		content:function (){
			'step 0'
			var num=[]
			if(player.getEquip(1)){
				num=2
			}
			else{
				num=1
			}
			player.chooseTarget('〖分裂〗额外指定'+get.translation(num)+'名'+get.translation(trigger.card)+'的目标？',[1,num],function(card,player,target){
				var trigger=_status.event.getTrigger();
				if(trigger.targets.includes(target)) return false;
				return lib.filter.targetEnabled2(trigger.card,_status.event.player,target);
			})
			.set('ai',function(target){
				var trigger=_status.event.getTrigger();
				var player=_status.event.player;
				return get.effect(target,trigger.card,player,player);
			});
			'step 1'
			if(result.bool){
				var target=result.targets
				for(var i of target){
					trigger.targets.add(i);
				}
				player.logSkill("xjzh_poe_fenlie",target);
				if(player.countMark("xjzh_intro_jufeng")<10) player.useSkill("xjzh_poe_jufeng");
			}
			event.finish();
		},
	},
	"xjzh_poe_tanshe":{
		audio:"ext:仙家之魂/audio/skill:1",
		trigger:{
			source:"damageSource",
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		filter:function(event,player){
			return !player.hasSkill("xjzh_poe_tanshejin")&&Math.random()<=0.3;
		},
		content:function (){
			"step 0"
			player.addTempSkill("xjzh_poe_tanshejin","useCardAfter");
			if(player.hasSkill("xjzh_poe_danmu")){
				trigger.player.damage(1,player);
				event.goto(2);
			}
			"step 1"
			var previous=trigger.player.getPrevious();
			var next=trigger.player.getNext();
			var list=[
				previous,
				next
			];
			var target=list.randomGet();
			if(target){
				target.damage(1,player);
			}
			"step 2"
			if(player.countMark("xjzh_intro_jufeng")<10) player.useSkill("xjzh_poe_jufeng");
		},
	},
	"xjzh_poe_tanshejin":{
		sub:true,
	},
	"xjzh_poe_juji":{
		audio:"ext:仙家之魂/audio/skill:1",
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		filter:function (event,player){
			return !event.player.inRange(player);
		},
		content:function (){
			trigger.num+=Math.floor(trigger.num*0.6);
		},
	},
	"xjzh_poe_jufeng":{
		audio:"ext:仙家之魂/audio/skill:1",
		forced:true,
		popu:false,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		trigger:{
			player:"useCard",
		},
		global:["xjzh_intro_jufeng"],
		group:["xjzh_poe_jufeng_liushi"],
		filter:function (event,player){
			return _status.currentPhase==player&&player.countMark("xjzh_intro_jufeng")<10;
		},
		content:function (){
			"step 0"
			player.addMark("xjzh_intro_jufeng",1,false);
			game.log(player,"获得了一层〖提速尾流〗");
			"step 1"
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].identity==player.identity&&game.players[i]!=player){
					game.players[i].identityShown=true
					game.players[i].addMark("xjzh_intro_jufeng",1,false);
				}
			}
		},
		subSkill:{
			"liushi":{
				trigger:{
					global:"phaseEnd",
					player:"damageEnd",
				},
				forced:true,
				popup:false,
				sub:true,
				filter:function (event,player){
					return player.hasMark("xjzh_intro_jufeng");
				},
				content:function (){
					"step 0"
					for(var i=0;i<game.players.length;i++)
					if(trigger.name=="phase"){
						if(game.players[i].hasMark("xjzh_intro_jufeng")){
							game.players[i].removeMark("xjzh_intro_jufeng",1,false);
						}
					}
					else{
						if(game.players[i].hasMark("xjzh_intro_jufeng")){
							game.players[i].clearMark("xjzh_intro_jufeng",false);
						}
					}
					"step 1"
					if(trigger.name=="phase"){
						game.log(player,"失去了一层〖提速尾流〗");
					}
					else{
						game.log(player,"失去了所有〖提速尾流〗");
					}
				},
			},
		},
	},
	"xjzh_poe_danmu":{
		forced:true,
		poelose:true,
		locked:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		trigger:{
			player:"useCardToPlayer",
		},
		priority:66,
		filter:function(event,player){
			if(!event.targets||event.targets.length) return false;
			if(event.target==player) return false;
			if(event.target.countMark("xjzh_poe_danmu_canpo")>=4) return false;
			return Math.random()<=0.3;
		},
		content:function(){
			trigger.target.addMark("xjzh_poe_danmu_canpo",1,false);
		},
		global:["xjzh_poe_danmu_canpo"],
		subSkill:{
			"canpo":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					source:"damageBegin",
				},
				sub:true,
				forced:true,
				marktext:"残",
				intro:{
					name:"残破",
					content:function(storage,player){
						var str='';
						str+='造成伤害有'+get.translation(storage*25)+'%几率无效';
						return str;
					},
				},
				filter:function (event,player){
					var num1=player.countMark("xjzh_poe_danmu_canpo")*0.25
					return Math.random()<=num1&&player.hasMark("xjzh_poe_danmu_canpo");
				},
				content:function (){
					trigger.cancel();
				},
			},
		},
	},
	//决斗者
	"xjzh_poe_jianfeng":{
		enable:"phaseUse",
		usable:1,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		forceDie:true,
		filterCard:function(card,player,target){
			return get.tag(card,'damage');
		},
		audio:"ext:仙家之魂/audio/skill:1",
		filterTarget:function(card,player,target){
			return target!=player;
		},
		selectTarget:function(){
			if(game.xjzhAchi.hasAchi('刽子手','special')) return [1,2];
			return 1;
		},
		filter:function(event,player){
			var cards=player.getCards('h',function(card){
				return get.tag(card,'damage');
			});
			return cards.length;
		},
		content:function(){
			"step 0"
			var cards=target.getCards('hejxs',function(card){
				return !get.tag(card,'damage');
			});
			if(!cards.length) event.goto(2);
			event.cards=cards
			target.chooseBool('〖剑风〗：是否弃置所有非[伤害]卡牌？').set('ai',function(event,player){
				if(target.countCards('h','shan')>=2) return 0;
				var num=0
				var cards= target.getCards('h',function(card){
					return !get.tag(card,'damage')
				});
				for(var i=0;i<cards.length;i++){
					if(get.value(cards[i])>=8) num++
				}
				return num;
			});
			"step 1"
			if(result.bool){
				var cards=target.getCards('hejxs',function(card){
					return !get.tag(card,'damage');
				});
				target.discard(cards);
				event.finish();
				return;
			}
			"step 2"
			player.useCard('unequip',{name:'sha',isCard:true},target,false).set('addCount',false);
			"step 3"
			if(target.isAlive()){
				game.delay(1.5);
				player.useCard('unequip',{name:'sha',isCard:true},target,false).set('addCount',false).set('oncard',function(card,player){
					var that=this;
					if(!that.baseDamage) that.baseDamage=1;
					that.baseDamage+=1;
				});
			}
			"step 4"
			if(target.isDead()){
				if(!game.xjzhAchi.hasAchi('刽子手','special')){
					if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('刽子手','special',1);
				}
			}
		},
		ai:{
			jueqing:true,
			order:8,
			result:{
				target:-1,
			},
		},
	},
	"xjzh_poe_sidou":{
		enable:"chooseToUse",
		usable:1,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		filterCard:true,
		selectCard:1,
		viewAs:{
			name:"juedou",
		},
		position:"h",
		check:function(card){
			return 6-get.value(card);
		},
		viewAsFilter:function(player){
			return player.countCards('h');
		},
		audio:"ext:仙家之魂/audio/skill:2",
		onuse:function(result,player){
			var cards=result.targets[0].getCards('ej');
			var cards2=player.getCards('ej');
			if(cards) result.targets[0].directgain(cards,null,'xjzh_poe_sidou');
			if(cards2) player.directgain(cards2,null,'xjzh_poe_sidou');
			player.addTempSkill('xjzh_poe_sidou_mod','juedouEnd');
			result.targets[0].addTempSkill('xjzh_poe_sidou_mod','juedouEnd');
			player.addTempSkill('xjzh_poe_sidou_gain');
			result.targets[0].addTempSkill('xjzh_poe_sidou_gain');
		},
		ai:{
			order:8,
			result:{
				target:function(player,target){
					if(!target) return;
					if(!player) return;
					if(target.hasSkillTag('noh')) return 0;
					var cards=target.countCards('hej');
					var cards2=player.countCards('hej');
					return -(cards2-cards);
				},
			},
		},
		subSkill:{
			"mod":{
				locked:true,
				charlotte:true,
				direct:true,
				sub:true,
				mod:{
					cardname:function(card){
						return 'sha';
					},
				},
				trigger:{
					player:"damageEnd",
				},
				filter:function(event,player){
					var num=Math.ceil(player.maxHp/2);
					return num>player.hp;
				},
				content:function(){
					player.loseHp(player.hp);
				},
			},
			"gain":{
				trigger:{
					global:"juedouAfter",
				},
				locked:true,
				charlotte:true,
				direct:true,
				sub:true,
				filter:function(event,player){
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('xjzh_poe_sidou');
					});
					return cards.length;
				},
				content:function(){
					var cards=player.getCards('h',function(card){
						return card.hasGaintag('xjzh_poe_sidou');
					});
					var list=[]
					for(var i=0;i<cards.length;i++){
						if(get.type(cards[i])=="equip") list.push(cards[i]);
						if(get.type(cards[i])=="delay") player.addJudge(cards[i]);
					}
					if(list.length) player.directequip(list);
					player.removeSkill('xjzh_poe_sidou_gain',true);
				},
			},
		},
	},
	"xjzh_poe_tiaozhan":{
		trigger:{
			global:"phaseUseBegin",
		},
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		forceDie:true,
		prompt:function(event,player){
			return "〖挑战〗：是否摸3张牌并视为对"+get.translation(event.player)+"使用一张【决斗】";
		},
		check:function(event,player){
			var att=get.attitude(event.player,player);
			if(!lib.filter.targetEnabled2({name:"juedou"},player,event.player)) return 0;
			if(att<=0){
				return player.countCards('h')+3-event.player.countCards('h');
			}
			if(att>0){
				if(event.player.isHealthy()&&player.countCards('h')<=1) return player.getDamagedHp();
			}
			return 0;
		},
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(!lib.filter.targetEnabled2({name:"juedou"},player,event.player)) return false;
			if(event.player==player) return false;
			return true;
		},
		content:function(){
			"step 0"
			player.draw(3);
			"step 1"
			player.useCard({name:'juedou',isCard:true},trigger.player,false);
			"step 2"
			if(player.getHistory('useCard',function(evt){
				return evt.getParent().name=="xjzh_poe_tiaozhan"&&player.getHistory('sourceDamage',function(evt2){
					return evt.card==evt2.card;
				}).length;
			}).length){
				trigger.player.discard(trigger.player.getCards('h'));
			}else{
				if(!game.xjzhAchi.hasAchi('完美斗士','special')) player.chooseToDiscard(3,true);
			}
			"step 3"
			if(trigger.player.isDead()){
				if(!game.xjzhAchi.hasAchi('完美斗士','special')){
					if(player.isUnderControl(true)&&game.me==player) game.xjzhAchi.addProgress('完美斗士','special',1);
				}
			}
		},
	},
	//处刑者
	"xjzh_poe_zhenya":{
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		mark:true,
		marktext:"镇",
		intro:{
			content:function(storage,player){
				var str='';
				var num=player.storage.xjzh_buff_criticalstrike
				str+='当前物理攻击暴击率：'+get.strNumber(num)+'%';
				return str;
			},
		},
		init:function(player){
			var num=game.players.length*10+game.dead.length*15+10;
			player.storage.xjzh_buff_criticalstrike=num;
		},
		group:["xjzh_poe_zhenya_1","xjzh_poe_zhenya_2","xjzh_poe_zhenya_3"],
		subSkill:{
			"1":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					source:"damageBegin",
				},
				forced:true,
				priority:2,
				sub:true,
				filter:function (event,player){
					if(event.getParent('criticalstrike').name=='criticalstrike') return false;
					return !game.hasNature(event);
				},
				content:function (){
					var numx=player.storage.xjzh_buff_criticalstrike/100;
					var numxx=get.xjzhBUFFNum(player,'criticalstrikes');
					game.xjzh_Criticalstrike(player,trigger.num,numx>=1?3:2,numxx);
				},
			},
			"2":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					player:"damageBegin",
				},
				forced:true,
				sub:true,
				filter:function (event,player){
					return event.num>=2&&player.inRange(event.source);
				},
				content:function (){
					trigger.num=1
				},
			},
			"3":{
				trigger:{
					global:["dieAfter","useCard"],
				},
				direct:true,
				sub:true,
				content:function (){
					lib.skill.xjzh_poe_zhenya.init(player);
				},
			},
		},
	},
	"xjzh_poe_zaixing":{
		forced:true,
		locked:true,
		poelose:true,
		nogainsSkill:true,
		priority:-1,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		trigger:{
			source:"damageAfter",
		},
		filter:function(event,player){
			return !event.cancelled||event.num>0
		},
		content:function(){
			"step 0"
			if(player.hujia<3) player.changeHujia(1);
			"step 1"
			if(!player.storage.xjzh_poe_zaixing) player.storage.xjzh_poe_zaixing=0
			player.storage.xjzh_poe_zaixing++
			"step 2"
			if(player.storage.xjzh_poe_zaixing==3){
				delete player.storage.xjzh_poe_zaixing
				player.changexjzhBUFF('criticalstrikes',1);
			}
		},
	},
	"xjzh_poe_lengxue":{
		forced:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		audio:"ext:仙家之魂/audio/skill:1",
		trigger:{
			source:"damageAfter",
		},
		filter:function (event,player){
			return event.player.isDying()==1;
		},
		content:function (){
			trigger.player.die().source=player;
		},
	},
	"xjzh_poe_shixue":{
		trigger:{
			source:'damageSource',
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		priority:10,
		filter:function(event,player){
			return !game.hasNature(event);
		},
		content:function(){
			if(player.isDamaged()){
				player.recover();
			}
			else{
				if(_status.event.criticalstrike==true){
					player.draw(2);
				}else{
					player.draw();
				}
			}
		}
	},
	"xjzh_poe_canbao":{
		forced:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		audio:"ext:仙家之魂/audio/skill:1",
		trigger:{
			player:"xjzhCriticalstrikeAfter",
		},
		filter:function (event,player){
			return Math.random()<=0.25;
		},
		content:function (){
			player.changexjzhBUFF('criticalstrikes',1);
		},
	},
	"xjzh_poe_yingxiang":{
		forced:true,
		locked:true,
		forceDie:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		marktext:"影",
		priority:11,
		intro:{
			content:"手牌上限、摸牌数、攻击距离、出牌次数+#",
		},
		mod:{
			targetInRange:function(card,player,target,num){
				if(get.distance(player,target)<=card.number) return num+player.countMark("xjzh_poe_yingxiang");
			},
			maxHandcard:function(player,num){
				return num+player.countMark('xjzh_poe_yingxiang');
			},
			cardUsable:function(card,player,num){
				if(card.name=="sha"||card.name=="jiu" ) return num+player.countMark('xjzh_poe_yingxiang');
			},
		},
		audio:"ext:仙家之魂/audio/skill:1",
		trigger:{
			source:"dieAfter",
		},
		filter:function(event,player){
			return event.player.isDead();
		},
		content:function(){
			player.addMark("xjzh_poe_yingxiang",1,false);
		},
		subSkill:{
			"draw":{
				trigger:{
					player:"drawBegin",
				},
				filter:function(event,player){
					return player.hasMark("xjzh_poe_yingxiang");
				},
				forced:true,
				priority:11,
				sub:true,
				content:function(){
					var num=player.countMark("xjzh_poe_yingxiang");
					trigger.num+=num
				},
			},
		},
	},
	"xjzh_poe_yingxing":{
		trigger:{
			player:"damageAfter",
		},
		forced:true,
		priority:-1,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		filter:function(event,player){
			return _status.currentPhase!=player;
		},
		content:function(){
			var evt=_status.event.getParent('phaseUse');
			if(evt&&evt.name=='phaseUse'){
				evt.skipped=true;
			}
		},
		ai:{
			effect:{
				target:function(card,player,target){
					if(!target) return;
					//if(player.countUsed('sha',true)==0) return 0.1;
					if(player.getCardUsable('sha')>0){
						if(get.tag(card,'damage')) return 0.5;
					}
					return 1;
				},
			},
		},
	},
	"xjzh_poe_jingji":{
		trigger:{
			source:["damageAfter"],
			player:["damageAfter","xjzh_poe_fuchou_gedang"],
		},
		forced:true,
		priority:-1,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		poelose:true,
		nogainsSkill:true,
		marktext:"竞",
		intro:{
			name:"竞技",
			content:function(storage,player){
				var str='';
				var num=player.countMark("xjzh_poe_jingji")*6.5;
				if(player.hasSkill('xjzh_poe_zhuzao')) num+=10;
				if(!num||num==0) return '反击几率：0%';
				str+='反击几率：'+get.translation(num)+'%';
				return str;
			},
		},
		filter:function(event,player){
			if(event.player==player) return player.hasMark("xjzh_poe_jingji");
			return event.source==player;
		},
		content:function (){
			if(trigger.source==player){
				if(player.countMark("xjzh_poe_jingji")<10)  player.addMark("xjzh_poe_jingji",1,false);
			}
			else if(trigger.player==player){
				if(player.hasMark("xjzh_poe_jingji")) player.removeMark("xjzh_poe_jingji",1,false);
			}
		},
		group:["xjzh_poe_jingji_fanji"],
		subSkill:{
			"fanji":{
				trigger:{
					player:["damageAfter","damageCancelled"],
				},
				forced:true,
				sub:true,
				filter:function(event,player){
					if(!player.hasMark("xjzh_poe_jingji")) return false;
					if(event.triggername=="damageCancelled") return true;
					var num=player.countMark("xjzh_poe_jingji")*0.065;
					if(player.hasSkill("xjzh_poe_zhuzao")){
						return Math.random()<=num+0.1;
					}
					return Math.random()<=num;
				},
				content:function (){
					"step 0"
					if(event.triggername=="damageAfter"){
						targets=trigger.source;
					}else{
						targets=trigger.player;
					}
					var str="〖反击〗：是否视为对"+get.translation(targets)+"使用一张【杀】";
					player.chooseBool(str).set('ai',function(){
						return get.damageEffect(targets,player,player);
					}).set('targets',targets);
					"step 1"
					if(result.bool){
						if(player.hasSkill("xjzh_poe_zhuzao")){
							player.useCard({name:'sha',isCard:true},targets,false).set('oncard',function(card,player){
								var that=this;
								if(!that.baseDamage) that.baseDamage=1;
								that.baseDamage+=1;
							});
						}else{
							player.useCard({name:'sha',isCard:true},targets,false);
						}
					}
				},
			},
		},
	},
	"xjzh_poe_fuchou":{
		trigger:{
			player:"damageBegin1",
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		priority:66,
		audio:"ext:仙家之魂/audio/skill:1",
		mark:true,
		marktext:"格",
		intro:{
			name:"格挡",
			content:function(storage,player){
				var str='格挡几率上限：';
				var num=player.countMark("xjzh_poe_fuchou");
				num+=player.countMark("xjzh_poe_jingji");
				num+=player.countMark("xjzh_poe_xueyan");
				if(!player.hasSkill("xjzh_poe_doushi")){
					str+='75%<br>物理攻击格挡几率：'+get.translation(num)+'%';
				}
				else{
					str+='85%<br>物理攻击格挡几率：'+get.translation(num)+'%'+'<br>法术攻击格挡几率：'+get.translation(num)+'%';
				}
				return str;
			},
			markcount:function(storage,player){
				return player.countMark("xjzh_poe_fuchou")+player.countMark("xjzh_poe_jingji")+player.countMark("xjzh_poe_xueyan");
			},
		},
		init:function(player){
			player.addMark("xjzh_poe_fuchou",50,false);
			player.update();
		},
		filter:function(event,player){
			var num=player.countMark("xjzh_poe_fuchou");
			if(player.hasMark("xjzh_poe_jingji")) num+=player.countMark("xjzh_poe_jingji");
			if(player.hasSkill("xjzh_poe_doushi")){
				return Math.random()<=num*0.01;
			}
			return !game.hasNature(event)&&Math.random()<=num*0.01;
		},
		content:function (){
			"step 0"
			if(!game.hasNature(trigger)){
				game.log(player,'格挡了本次攻击伤害');
			}
			else{
				game.log(player,'格挡了本次法术伤害');
			}
			"step 1"
			player.recover(trigger.num);
			"step 2"
			var num=60
			if(player.hasSkill("xjzh_poe_doushi")) num+=10
			if(player.countMark("xjzh_poe_fuchou")<num){
				player.addMark("xjzh_poe_fuchou",1,false);
				game.log(player,'增加了1%物理攻击格挡几率');
			}
			"step 3"
			trigger.cancel();

		},
		ai:{
			effect:{
				target:function (card,player,target,current){
					var num1=player.countMark("xjzh_poe_fuchou")*0.01
					var num2=1-num1
					if(get.tag(card,'damage')&&!get.nature(card)) return [num2,num1];
				},
			},
		},
	},
	"xjzh_poe_doushi":{
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		forced:true,
		trigger:{
			player:"disableEquipBefore",
		},
		onremove:function(player,skill){
			if(!player.hasSkill("xjzh_poe_fuchou")) return;
			var num=player.countMark("xjzh_poe_fuchou");
			if(num>60){
				player.removeMark("xjzh_poe_fuchou",num-60,false);
			}
		},
		filter:function (event,player){
			return event.slots.includes('equip2')
		},
		content:function (){
			while(trigger.slots.includes('equip2')) trigger.slots.remove('equip2');
			game.log("无法废除",player,"的防具栏");
		},
	},
	"xjzh_poe_zhuzao":{
		poelose:true,
		locked:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		forced:true,
		init:function(player){
			setTimeout(function(){
				if(player.hasSkill("xjzh_poe_fuchou")){
					player.addMark("xjzh_poe_fuchou",10,false);
					player.updateMarks();
				}
			},500);
		},
		onremove:function(player,skill){
			setTimeout(function(){
				if(player.hasSkill("xjzh_poe_fuchou")){
					player.removeMark("xjzh_poe_fuchou",10,false);
					player.updateMarks();
				}
			},500);
		},
	},
	"xjzh_poe_xueyan":{
		trigger:{
			player:"recoverBegin",
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		content:function(){
			trigger.num++
		},
		contentAfter:function(){
			if(player.isHealthy()){
				if(player.hasSkill('xjzh_sanguo_fuchou')) player.addMark("xjzh_poe_xueyan",2,false);
			}
		},
	},
	"xjzh_poe_baipiao":{
		trigger:{
			player:"damageEnd",
		},
		forced:true,
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		marktext:"嫖",
		intro:{
			content:"expansion",
			markcount:"expansion",
		},
		content:function(){
			if(!player.getEquip(2)){
				var card=get.cardPile(function(card){
					return get.subtype(card)=="equip2";
				});
				if(card) player.useCard(card,player)._triggered=null;
			}else{
				var card=get.cardPile(function(card){
					return get.subtype(card)=="equip2";
				});
				var skills=get.info(card).skills;
				skills=skills.slice(0);
				for(var i of skills){
					player.addSkill(i);
				}
				var cards=game.createCard(card);
				player.addToExpansion(cards,'gain2').gaintag.add('xjzh_poe_baipiao');
				game.cardsDiscard(card);
			}
		},
	},
	"xjzh_poe_shenghua":{
		audio:"ext:仙家之魂/audio/skill:4",
		trigger:{
			player:["enterGame","phaseZhunbeiBegin"],
			global:"gameDrawBegin",
		},
		forced:true,
		locked:true,
		unique:true,
		priority:98,
		content:function (){
			"step 0"
			if(trigger.name=='phaseZhunbei'){
				var list=player.getSkills(null,false,false).filter(function(skill){
					var info=lib.skill[skill];
					return info&&info.poelose&&skill!="xjzh_poe_shenghua";
				});
				player.chooseBool('〖升华〗：是否移除'+get.translation(list)+'重获技能').set('ai',function(){
					 return Math.random();
				});
				event.goto(2);
			}
			"step 1"
			var list=[];
			var list2=[];
			var players=game.players.concat(game.dead);
			for (var i=0;i<players.length;i++){
				list2.add(players[i].name);
				list2.add(players[i].name1);
				list2.add(players[i].name2);
			}
			for(var i in lib.characterPack['XWTR']){
				if(list2.includes(i)) continue;
				for (var j=0;j<lib.character[i][3].length;j++){
					var info=lib.skill[lib.character[i][3][j]];
					if(info&&info.poelose) list.add(lib.character[i][3][j]);
				}
			}
			if(list.length>=5){
				var num=5
			}else{
				var num=list.length
			}
			var link=list.randomGets(num);
			player.addSkill(link);
			game.log(player,'获得技能','〖'+get.translation(link)+'〗');
			event.finish();
			return;
			"step 2"
			if(result.bool){
				var list=player.getSkills(null,false,false).filter(function(skill){
					var info=lib.skill[skill];
					return info&&info.poelose&&skill!="xjzh_poe_shenghua";
				});
				player.removeSkill(list,true);
				event.goto(1);
			}
		},
	},
	//女巫
	"xjzh_poe_huoqiu":{
		mod:{
			cardname(card,player){
				if(get.color(card)=='red') return 'sha';
			},
			cardnature(card,player){
				if(get.color(card)=='red') return 'fire';
			},
			targetInRange(card){
				if(card.name=="sha"&&card.nature=="fire") return true;
			},
			cardUsable(card,player,num){
				if(card.name=='sha'&&card.nature=="fire") return Infinity;
			},
		},
		trigger:{
			source:"damageEnd",
		},
		forced:true,
		locked:true,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		priority:Infinity,
		audio:"ext:仙家之魂/audio/skill:3",
		filter(event,player){
			if(!event.cards||!event.cards.length) return false;
			let history=player.getHistory('sourceDamage',card=>{
				return card.card&&card.card.name=="sha"&&card.card.nature=="fire";
			});
			if(!history.length||history.length==0) return false;
			if(event.getParent(3).name=="xjzh_poe_huoqiu") return false;
			return event.card.name=="sha"&&event.card.nature=="fire";
		},
		async content(event,trigger,player){
			let num=player.getHistory('sourceDamage',function(card){
				return card.card&&card.card.name=="sha"&&card.nature=="fire";
			}).length;
			let target=trigger.player;
			do{
				target=target.getNext();
				if(target==player) target=target.getNext();
				game.xjzh_playEffect('xjzh_skillEffect_baozha',target);
				await target.damage(trigger.nature,trigger.num,trigger.source,'nocard');
				if(!game.xjzhAchi.hasAchi('火焰大师','special')){
					if(player.isUnderControl(true)&&target.isDead()) game.xjzhAchi.addProgress('火焰大师','special',1);
				}
				num--;
			}while(num>0)
			if(game.xjzhAchi.hasAchi('火焰大师','special')){
				let history=player.getHistory('sourceDamage',card=>{
					return card.card&&card.card.name=="sha"&&card.card.nature=="fire";
				});
				if(history.length>1) player.draw(2);
			}
		},
	},
	"xjzh_poe_xuruo":{
		trigger:{
			global:"drawAfter",
		},
		forced:true,
		priority:12,
		locked:true,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		locked:true,
		group:"xjzh_poe_xuruo_damage",
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(event.player==player) return false;
			if(event.player.countCards('h')<=player.countCards('h')) return false;
			return !event.cancelled;
		},
		content:function(){
			var num=player.countCards('h');
			var num2=trigger.player.countCards('h');
			var hs=Math.floor((num2-num)/2);
			player.randomGain(trigger.player,hs);
		},
		subSkill:{
			"damage":{
				trigger:{
					global:"damageBefore",
				},
				direct:true,
				priority:Infinity,
				sub:true,
				filter:function(event,player){
					if(event.player!=player) return false;
					if(!event.source) return false;
					if(event.source.countCards('h')>=player.countCards('h')) return false;
					return !event.cancelled;
				},
				audio:"ext:仙家之魂/audio/skill:2",
				content:function(){
					trigger.num=1;
				}
			},
		},
	},
	//元素使
	"xjzh_poe_huiliu":{
		trigger:{
			global:"phaseZhunbeiBegin",
		},
		direct:true,
		priority:12,
		locked:true,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		mark:true,
		marktext:"汇",
		intro:{
			name:"元素汇流",
			content:function(storage,player){
				if(!player.storage.xjzh_poe_huiliu) return "没有元素汇流";
				var storage=player.storage.xjzh_poe_huiliu
				var str="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				var str2="";
				if(storage=="fire") str2+="火焰";
				if(storage=="ice") str2+="冰霜";
				if(storage=="thunder") str2+="闪电";
				if(storage=="poison") str2+="猛毒";
				str+=str2+"汇流<br><br>";
				str+="<li>你造成伤害视为"+str2+"伤害<br><li>你防止非"+str2+"属性伤害";
				return str;
			},
		},
		audio:"ext:仙家之魂/audio/skill:2",
		group:["xjzh_poe_huiliu_damage"],
		skillList:['fire','thunder','ice','poison'],
		content:function(){
			//if(player.storage.xjzh_poe_huiliu) delete player.storage.xjzh_poe_huiliu;
			var list=lib.skill.xjzh_poe_huiliu.skillList.slice(0);
			if(player.storage.xjzh_poe_huiliu) list.remove(player.storage.xjzh_poe_huiliu);
			var skillx=list.randomGet();
			var str="";
			if(skillx=="fire") str+="火焰";
			if(skillx=="ice") str+="冰霜";
			if(skillx=="thunder") str+="闪电";
			if(skillx=="poison") str+="猛毒";
			str+="汇流";
			player.popup(str)
			player.$fullscreenpop(str,skillx);
			player.storage.xjzh_poe_huiliu=skillx;
		},
		subSkill:{
			"damage":{
				trigger:{
					global:"damageBegin",
				},
				forced:true,
				sub:true,
				priority:-10,
				audio:"xjzh_poe_huiliu",
				filter:function(event,player){
					var storage=player.storage.xjzh_poe_huiliu
					if(event.player==player){
						return event.nature!=storage;
					}
					return true;
				},
				content:function(){
					var storage=player.storage.xjzh_poe_huiliu
					if(trigger.source==player){
						game.setNature(trigger,storage,false)
					}
					if(trigger.player==player){
						if(trigger.nature!=storage) trigger.changeToZero();
					}
				},
			},
		},
		ai:{
			effect:{
				target:function(card,player,target,current) {
					if(!player.storage.xjzh_poe_huiliu) return;
					if(get.tag(card,'damage')){
						if(!game.hasNature(card,player.storage.xjzh_poe_huiliu)){
							return [0,0];
						}
						return [1,0];
					}
				}
			},
		},
	},
	"xjzh_poe_guangta":{
		trigger:{
			source:"damageAfter",
		},
		poelose:true,
		nogainsSkill:true,
		locked:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(!game.hasNature(event)) return false;
			if(event.getParent("xjzh_poe_guangta").name=="xjzh_poe_guangta") return false;
			return event.num>0;
		},
		prompt:function(event,player){
			return "〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害";
		},
		check:function(event,player){
			var targets=[player.getPrevious(),player.getNext()]
			var num=0
			for(var i of targets){
				var att=get.attitude(player,i);
				if(att<=0) num++
			}
			return num;
		},
		content:function(){
			"step 0"
			player.chooseTarget("〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害",true,function(card,player,target){
				var player=_status.event.player;
				return [player.getPrevious(),player.getNext()].includes(target);
			}).set('ai',function(target){
				var trigger=_status.event.getTrigger();
				return get.damageEffect(target,trigger.nature,player,player);
			});
			"step 1"
			if(result.bool){
				var target=result.targets[0]
				target.damage(trigger.num,trigger.nature,player,"nocard");
				var nature=trigger.nature
				switch(nature){
					case 'fire':
					target.changexjzhBUFF('gandian',1);
					break;
					case 'ice':
					target.changexjzhBUFF('ranshao',1);
					break;
					case 'thunder':
					target.changexjzhBUFF('bingdong',1);
					break;
				}
			}
		},
	},
	"xjzh_poe_sangzhong":{
		trigger:{
			player:"loseAfter",
		},
		forced:true,
		locked:true,
		priority:-10,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			var history=player.getAllHistory('lose');
			return history.length%3==0;
		},
		content:function(){
			"step 0"
			player.draw(2);
			"step 1"
			player.addGaintag(result,'xjzh_poe_sangzhong');
		},
	},
	"xjzh_poe_suxing":{
		trigger:{
			global:['damageCancelled','damageZero'],
		},
		forced:true,
		locked:true,
		priority:10,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		audio:"ext:仙家之魂/audio/skill:2",
		filter:function(event,player){
			if(!event.source||event.source!=player) return false;
			return game.hasNature(event);
		},
		content:function(){
			var num=trigger.num==0?1:trigger.num
			trigger.player.damage(num,trigger.source,'nocard')._triggered=null;
		},
		ai:{
			jueqing:true,
			effect:{
				player:function(card,player,target,current){
					if(get.tag(card,'damage')) return [1,-1];
				},
			},
		},
	},
	"xjzh_poe_bilei":{
		initHujia:function(player){
			player.changeHujia(20);
			player.update();
		},
		audio:"ext:仙家之魂/audio/skill:2",
		init:function(player){
			lib.skill.xjzh_poe_bilei.initHujia(player);
		},
		onremove:function(player,skill){
			if(player.hujia>0) player.changeHujia(-player.hujia);
		},
		trigger:{
			player:"changeHujiaAfter",
		},
		filter:function(event,player){
			return player.hujia<=0;
		},
		forced:true,
		locked:true,
		priority:10,
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		content:function(){
			"step 0"
			player.damage(player.maxHp*3,'nocard','notrigger','nosource');
			"step 1"
			if(player.isAlive()){
				lib.skill.xjzh_poe_bilei.initHujia(player);
			}else{
				event.finish();
				return;
			}
			"step 2"
			event.num=player.getAllHistory('damage').length;
			"step 3"
			event.nature=['fire','thunder','kami','ice','stab','poison'].randomGet();
			player.chooseTarget("〖光塔〗：选择你上家/下家一名角色令其受到"+get.translation(event.num)+"点"+get.translation(event.nature)+"属性伤害",true,function(card,player,target){
				return player!=target;
			}).set('ai',function(target){
				var trigger=_status.event.getTrigger();
				return get.damageEffect(target,nature,player,player);
			}).set('nature',event.nature);
			"step 4"
			if(result.bool){
				event.target=result.targets[0]
				event.list=[]
				for(var i=1;i<=event.num;i++){
					event.list.push(i);
				}
				player.chooseControl(event.list).set('ai',function(){
					return Math.random();
				}).set('prompt','〖壁垒〗：请选择对'+get.translation(event.target)+'造成'+get.translation(event.nature)+'属性伤害的点数');
			}else{
				event.finish();
				return;
			}
			"step 5"
			if(result.control){
				var num=result.control
				event.target.damage(num,event.nature,player,'nocard','notrigger');
				event.num-=num
				if(event.num>0) event.goto(3);
			}
		},
	},
	"xjzh_poe_qinhe":{
		enable:"phaseUse",
		poelose:true,
		nogainsSkill:true,
		charlotte:true,
		xjzh_xinghunSkill:true,
		filterTarget:function(card,player,target){
			return target.countCards('h');
		},
		selectTarget:1,
		audio:"ext:仙家之魂/audio/skill:2",
		content:function(){
			"step 0"
			var cards=target.getCards('h');
			target.showCards(cards);
			event.num=0
			event.num2=0
			for(var i=0;i<cards.length;i++){
				if(get.suit(cards[i]=="heart")){
					event.num++
				}
				else if(get.suit(cards[i]=="spade")){
					event.num2++
				}
			}
			"step 1"
			while(event.num>0){
				if(target.isDamaged()) target.useCard({name:'tao'},target,false);
				event.num-=1
			}
			while(event.num2>0){
				target.useCard({name:'jiu'},target,false);
				event.num2-=1
			}
		},
		ai:{
			order:8,
			result:{
				target:function(player,target){
					if(!target) return;
					var hs=target.countCards('h');
					var hp=target.getDamagedHp();
					var att=get.attitude(player,target);
					if(att>0) return hs-hp;
					return hp-hs;
				},
			},
		},
	},

};