import { lib, game, ui, get, ai, _status } from "../../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const starsSkills={

	//众星之魂
	"xjzh_zxzh_dianling":{
		trigger:{
			global:"phaseBegin",
		},
		frequent:true,
		prompt(event,player){
			return `〖点灵〗：是否令${get.translation(event.player)}本回合阶段顺序逆转？`;
		},
		filter(event,player){
			if(!player.hasMark("xjzh_zxzh_tusu")) return false;
			return event.player!=player&&event.player.isIn();
		},
		check(event,player){
			let att=get.attitude(player,event.player);
			let num=event.player.needsToDiscard();
			if(att<=0&&num>0) return num;
			if(att>0&&num<=0) return num;
			return 1;
		},
		group:["xjzh_zxzh_dianling_end"],
		async content(event,trigger,player){
			trigger.phaseList=trigger.phaseList.reverse();
			trigger.player.addTempSkill("xjzh_zxzh_dianling_on");
			player.removeMark("xjzh_zxzh_tusu",1);
			game.log(`${get.translation(player)}令${get.translation(trigger.player)}本回合阶段顺序逆转`);
		},
		subSkill:{
			"on":{sub:true,},
			"end":{
				trigger:{
					global:["recoverAfter","loseHp","damageAfter"],
				},
				forced:true,
				priority:3,
				sub:true,
				filter(event,player){
					if(event.name=="damage") return event.source&&event.source.hasSkill("xjzh_zxzh_dianling_on");
					return event.player.hasSkill("xjzh_zxzh_dianling_on");
				},
				async content(event,trigger,player){
					const targets=await player.chooseTarget(`〖点灵〗：选择一名角色令其${trigger.name=="damage"?`受到${trigger.num}点伤害`:trigger.name=="recover"?`回复${trigger.num}点体力？`:`失去${trigger.num}点体力？`}`,(card,player,target)=>{
						let trigger=_status.event.getTrigger();
						if(target.hasSkill("xjzh_zxzh_dianling_on")||target==player) return false;
						if(trigger.name=="recover") return target.isDamaged();
						return true;
					}).set("ai",(card,player,target)=>{
						let trigger=_status.event.getTrigger();
						if(trigger.name=="damage") return get.damageEffect(target,player,player);
						if(trigger.name=="recover") return get.recoverEffect(target,player,player);
						if(trigger.name=="loseHp"&&!target.hasSkillTag("maixie_hp")) return 0;
						return 1;
					}).forResultTargets();
					if(targets){
						if(trigger.name=="damage") targets[0].damage.apply(targets[0],[trigger.num,trigger.nature,trigger.cards,trigger.card,player]);
						else targets[0][trigger.name](trigger.num);
					}
				}
			},
		},
	},
	"xjzh_zxzh_tusu":{
		trigger:{
			player:["phaseDrawBegin","phaseDiscardBegin"],
		},
		forced:true,
		locked:true,
		priority:Infinity,
		firstDo:true,
		mark:true,
		marktext:"屠苏",
		intro:{
			content:"#",
		},
		mod:{
			targetInRange(card,player,target,now){
				if(!card.cards) return;
				for(let i of card.cards){
					if(i.hasGaintag("xjzh_zxzh_tusu")) return true;
				}
			},
		},
		async content(event,trigger,player){
			if(trigger.name=="phaseDraw"){
				let cards=[];
				for(let i=0;i<ui.cardPile.childElementCount;i++){
					let card=ui.cardPile.childNodes[i];
					  if(cards.includes(get.name(card))) continue;
					  cards.push(card);
					  if(cards.length>=player.maxHp) break;
				}
				player.directgain(cards,null,'xjzh_zxzh_tusu');
			}else{
				player.addMark("xjzh_zxzh_tusu",player.maxHp);
			}
			trigger.cancel(null,null,'notrigger');
		},
	},
	"xjzh_zxzh_leifa":{
		audio:"ext:仙家之魂/audio/skill:2",
		trigger:{
			global:"phaseZhunbeiBegin",
		},
		direct:true,
		priority:-3,
		locked:true,
		/*prompt:function(event,player){
			return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
		},
		filter:function (event,player){
			return event.player!=player&&player.canCompare(event.player)&&!player.hasSkill('xjzh_zxzh_leifa1');
		},
		check:function (event,player){
			return ai.get.attitude(player,event.player)<0;
		},*/
		subSkill:{
			off:{
				mark:true,
				  marktext:"雷",
				  sub:true,
				  intro:{
					  content:"失去<span style=\"color: gold\">雷法</span>直到回合开始",
				  },
			},
		},
		content:function (){
			'step 0'
			var num=player.countCards('h');
			player.draw(num);
			player.chooseToDiscard(num,'h',true);
			if(!player.canCompare(trigger.player)||player.hasSkill('xjzh_zxzh_leifa_off')||trigger.player==player){
				event.finish();
				return;
			}
			'step 1'
			player.chooseBool('〖雷法〗:是否对'+get.translation(trigger.player)+'发起拼点').set('ai',function(event,player){
				 if(get.attitude(player,trigger.player)>=0) return false;
				 return true;
			});
			'step 2'
			if(result.bool){
				player.chooseToCompare(trigger.player);
			}else{
				event.finish();
			}
			'step 3'
			if(result.bool){
				game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
				trigger.player.damage('thunder',player);
				trigger.player.addTempSkill('fengyin');
			}else{
				player.draw();
				player.addTempSkill('xjzh_zxzh_leifa_off',{player:'phaseBegin'});
			}
			'step 4'
			player.logSkill('xjzh_zxzh_leifa',trigger.player);
		},
	},
	//《金庸群侠传·杨过·暗魂》
	"xjzh_zxzh_jianxin":{
		trigger:{
			player:"damageAfter",
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:-1,
		audio:"ext:仙家之魂/audio/skill:8",
		filter:function(event,player){
			if(player.hasSkill('xjzh_zxzh_jianxin_off')) return false;
			return event.num>0&&event.source!=undefined;
		},
		subSkill:{off:{sub:true,},},
		content:function(){
			"step 0"
			player.addTempSkill("xjzh_zxzh_jianxin_off","xjzh_zxzh_jianxinAfter");
			if(!player.getEquip(1)) event.goto(1);
			if(player.getEquip(1)){
				var cards=player.getCards('e',function(card){
					return get.subtype(card)=="equip1";
				})
				for(var i of cards){
					var str=lib.translate[i.name]
					if(str.indexOf('剑')!=-1){
						event.goto(2);
					}
				}
			}
			"step 1"
			var card=get.cardPile(function(card){
				var names=lib.translate[card.name]
				return names.includes('剑');
			});
			player.useCard(card,player,false);
			event.finish();
			"step 2"
			if(trigger.source==player){
				var num=player.hp+trigger.num
			}else{
				var num=player.getDamagedHp()+trigger.num
			}
			var cards=get.cards(num),list=[];
			player.showCards(cards);
			game.cardsGotoOrdering(cards)
			for(var i=0;i<cards.length; i++){
				if(player.hasUseTarget(cards[i])&&get.tag(cards[i],'damage')) list.push(cards[i]);
			}
			event.list=list;
			'step 3'
			if(event.list.length&&event.list.length!=1){
				var next=player.chooseCardButton('请选择要使用的牌',event.list);
				next.set("filterButton",function(button){
					var player=_status.event.player
					return player.hasUseTarget(button.link,false);
				});
				next.set('ai',function(button){
					return _status.event.player.getUseValue(button.link,false)
				});
			}else if(event.list.length==1){
				if(player.hasUseTarget(event.list[0],false)){
					event._result={bool:true,links:event.list};
				}else{
					event.finish();
				}
			}else{
				event.finish();
			}
			'step 4'
			if(result.bool){
				event._result={bool:false};
				event.using=result.links[0];
				player.chooseUseTarget(event.using,false);
			}else{
				event.finish();
			}
			'step 5'
			if(result&&result.bool){
				event.list.remove(event.using);
				if(event.list.length) event.goto(3);
			}
		},
	},
	"xjzh_zxzh_jiezhen":{
		trigger:{
			global:"damageBegin1",
		},
		audio:"ext:仙家之魂/audio/skill:2",
		group:"xjzh_zxzh_jiezhen_zero",
		filter:function(event,player){
			if(!player.inRange(event.player)) return false;
			if(event.num<=0&&event.source==undefined) return false;
			if(event.player==player) return false;
			if(event.source==player){
				return game.hasNature(event,'thunder');
			}
			return !game.hasNature(event);
		},
		forced:true,
		locked:true,
		priority:99,
		firstDo:true,
		usable:1,
		content:function(){
			"step 0"
			str=''
			bool=false;
			if(game.hasNature(trigger,'thunder')){
				bool=true;
				str+='〖结阵〗:是否代替'+get.translation(trigger.player)+'受到'+get.translation(trigger.num)+'点雷电伤害？';
			}
			else{
				str+='〖结阵〗:是否代替'+get.translation(trigger.source)+'成为伤害来源？';
			}
			player.chooseBool(str).set("ai",function(event,player){
				var att1=get.attitude(trigger.player,player)
				var att2=get.attitude(trigger.source,player)
				if(att1<0) return 0;
				return 1.5;
			});
			"step 1"
			if(result.bool){
				if(bool){
					trigger.player=player;
				}else{
					trigger.source=player;
				}
			}else{
				player.getStat().skill.xjzh_zxzh_jiezhen-=1
			}
		   },
		subSkill:{
			zero:{
				trigger:{
					player:"damageBegin1",
				},
				sub:true,
				forced:true,
				priority:100,
				audio:"xjzh_zxzh_jiezhen",
				filter:function(event,player){
					return game.hasNature(event,"thunder");
				},
				content:function(){
					trigger.changeToZero();
				},
				ai:{
					nothunder:true,
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'thunderDamage')) return [0,0];
						},
					},
				},
			},
		},
	},
	"xjzh_zxzh_xunqing":{
		audio:"ext:仙家之魂/audio/skill:2",
		trigger:{
			global:"damageEnd",
		},
		priority:9,
		marktext:"情",
		intro:{
			name:"寻情",
			content:"每轮限3次，当前已发动#次",
		},
		group:["xjzh_zxzh_xunqing_clean","xjzh_zxzh_xunqing_fire"],
		filter:function (event,player){
			return game.hasNature(event,'thunder')&&player.countMark("xjzh_zxzh_xunqing")<3;
		},
		frequent:true,
		prompt:function(event,player){
			return "是否发动〖寻情〗令一名目标随机摸1-3张牌？";
		},
		content:function (){
			"step 0"
			player.chooseTarget(true,'〖寻情〗：选择一名角色令其随机摸至多1-3张牌或摸2张牌').set('ai',function(target){
				if(target.hasSkill('xjzh_sanguo_juejing')) return false;
				if(player.hasSkillTag('nogain')) return false;
				return get.attitude(player,target);
			});
			"step 1"
			if(result.bool){
				var num=[1,2,3].randomGet();
				var target=result.targets[0];
				if(target.name!="xjzh_zxzh_linziyan"){
					target.draw(num);
				}
				else{
					target.draw(num+1);
				}
				if(player.countMark("xjzh_zxzh_xunqing")<3) player.addMark("xjzh_zxzh_xunqing",1,false);
			}else{
				player.draw(2);
			}
		},
		ai:{
			effect:{
				target:function (card,player,target,current){
					if(get.tag(card,'thunderdamage')) return [1,2];
				},
			},
		},
		subSkill:{
			"clean":{
				trigger:{
					global:"roundStart",
				},
				forced:true,
				popup:false,
				priority:99,
				sub:true,
				filter:function (event,player){
					return player.hasMark("xjzh_zxzh_xunqing");
				},
				content:function(){
					player.clearMark("xjzh_zxzh_xunqing");
				},
			},
			"fire":{
				trigger:{
					source:"damageBegin1",
					player:"damageBegin1",
				},
				forced:true,
				sub:true,
				priority:-3,
				popup:false,
				filter:function(event){
					return game.hasNature(event,'fire');
				},
				content:function(){
					game.setNature(trigger,'thunder',false);
				},
			},
		},
	},
	"xjzh_zxzh_xianghun":{
		forced:true,
		locked:true,
		group:["xjzh_zxzh_xianghun1","xjzh_zxzh_xianghun2"],
		ai:{
			maihp:true,
		},
	},
	"xjzh_zxzh_xianghun1":{
		audio:"ext:仙家之魂/audio/skill:2",
		enable:"phaseUse",
		usable:1,
		sub:true,
		filterCard:true,
		selectCard:1,
		filterTarget:false,
		selectTarget:false,
		prompt:function(event,player){
			return "是否弃置一张牌发动技能〖香魂〗";
		},
		filter:function (event,player){
			return player.countCards('h')>=1;
		},
		check:function(card){
			return 4-get.value(card);
		},
		content:function (){
			"step 0"
			var controls=[];
			if(player.isDamaged()) controls.push('恢复体力');
			controls.push('流失体力');
			if(controls.length){
				if(controls.length==1){
					event._result={
					bool:true,control:controls[0]};
				}
				else{
					player.chooseControl(controls,ui.create.dialog('请选择一项','hidden')).ai=function(){
						if(player.hp>=3) return '流失体力';
						if(player.hp<=2) return '恢复体力';
					};
				}
			}
			"step 1"
			if(result&&result.control){
				if(result.control=='恢复体力'){
					player.recover();
				}
				else{
					player.loseHp();
				}
			}
		},
		ai:{
			order:10,
			result:{
				player:function(player){
					var nh=player.num('h');
					if(nh==0) return 0;
					if(nh>=player.hp&&player.hp>=3) return 2;
					if(nh>=player.hp&&player.hp<3) return 1;
					return 0.5;
				},
			},
		}
	},
	"xjzh_zxzh_xianghun2":{
		audio:"ext:仙家之魂/audio/skill:2",
		trigger:{
			player:"loseHpEnd",
		},
		forced:true,
		sub:true,
		content:function (){
			"step 0"
			player.judge(function(card){
				return get.color(card)=='black'?1.5:-1;
			});
			"step 1"
			if(result.bool){
				player.chooseTarget('选择至多两个目标令其各受到一点雷电伤害',[1,2]).ai=function(target){
					return get.damageEffect(target,player,player,'thunder');
				};
			}
			else{
				player.chooseTarget('选择至多3个目标将其横置',[1,3]).ai=function(target){
					if(target.isLinked&&get.attitude(player,target)>0) return 1;
					if(!target.isLinked&&get.attitude(player,target)<0) return 1;
					return 0.5;
				}
				event.goto(3);
			}
			'step 2'
			if(result.bool){
				player.line(result.targets,'thunder');
				for(var i=0;i<result.targets.length;i++)
				result.targets[i].damage('thunder',player);
			}
			event.finish();
			'step 3'
			if(result.bool){
				player.line(result.targets,'thunder');
				for(var i=0;i<result.targets.length;i++){
					result.targets[i].link();
				}
			}
		},
	},
	"xjzh_zxzh_renxin":{
		forced:true,
		locked:true,
		group:["xjzh_zxzh_renxin1","xjzh_zxzh_renxin2","xjzh_zxzh_renxin3"],
	},
	"xjzh_zxzh_renxin1":{
		audio:"ext:仙家之魂/audio/skill:2",
		trigger:{
			player:"damageEnd",
		},
		forced:true,
		sub:true,
		priority:23,
		filter:function (event,player){
			return _status.currentPhase!=player&&player.hp<=1;
		},
		content:function (){
			"step 0"
			player.judge();
			player.$fullscreenpop('仁心所向','thunder');
			"step 1"
			switch(get.suit(result.card)){
				case 'heart':
				player.recoverTo(player.maxHp);
				player.draw();
				event.finish();
				break;
				case 'diamond':
				player.recoverTo(1);
				trigger.player.draw(3);
				event.finish();
				break;
				case 'club':
				trigger.source.link(true);
				trigger.source.chooseToDiscard('he',3,true);
				event.finish();
				break;
				case 'spade':
				trigger.source.damage(1,'thunder',player);
				event.goto(2);
				break;
			}
			"step 2"
			while(_status.event.name!='phase'){
				_status.event=_status.event.parent;
			}
			_status.event.finish();
			_status.event.untrigger(true);
		},
		ai:{
			expose:0.3,
		},
	},
	"xjzh_zxzh_renxin2":{
		trigger:{
			player:"recoverEnd",
		},
		sub:true,
		forced:true,
		filter:function (event,player){
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].isDamaged()&&game.players[i]!=player) return true;
			}
		},
		content:function (){
			'step 0'
			player.chooseTarget(get.prompt('xjzh_zxzh_renxin'),[1,2],function(card,player,target){
				return player!=target&&target.isDamaged();
			})
			.set('ai',function(target){
				return get.attitude(player,target)>2&&target.isDamaged();
			});
			'step 1'
			if(result.bool){
				player.line(result.targets);
				for(var i=0;i<result.targets.length;i++)
				result.targets[i].recover();
			}
		},
	},
	"xjzh_zxzh_renxin3":{
		audio:"ext:仙家之魂/audio/skill:2",
		forced:true,
		trigger:{
			player:"damageBegin",
		},
		priority:21,
		sub:true,
		filter:function (event,player){
			return game.hasNature(event,'thunder')&&Math.random()<=0.7;
		},
		content:function (){
			player.logSkill('xjzh_zxzh_renxin3');
			game.log(player,'免疫了此次雷电伤害');
			player.say(['这是他教给我的术','我一直都记得你','这是你最擅长的雷法'].randomGet());
			trigger.untrigger();
			trigger.finish();
		},
		ai:{
			effect:{
				target:function (card,player,target,current){
					if(get.tag(card,'thunderDamage')) return [0.3,0.6];
					return [1,0];
				},
			},
		}
	},
	"xjzh_zxzh_yufeng":{
		trigger:{
			global:"damageBegin",
		},
		group:["xjzh_zxzh_yufeng_damage"],
		check:function (event,player){
			return get.attitude(player,event.player)<0;
		},
		prompt:function(event,player){
			return ""+get.translation(event.player)+"即将受到"+get.translation(event.source)+"造成的伤害，是否发动〖御风〗？";
		},
		usable:2,
		marktext:"风",
		intro:{
			content:function(storage,player){
				var str=player.storage.xjzh_zxzh_yufeng
				return get.translation(str);
			},
		},
		filter:function (event,player){
			return player.countCards("h")>0;
		},
		content:function (){
			"step 0"
			if(!player.storage.xjzh_zxzh_yufeng) player.storage.xjzh_zxzh_yufeng=[]
			player.chooseToDiscard('是否对'+get.translation(trigger.player)+'发动〖御风〗',function(card,player,target){
				if(player.storage.xjzh_zxzh_yufeng.includes(get.type(card))) return false;
				return player.countCards('h')>0;
			}).set('ai',function(card){
				var player=_status.event.player,player=_status.event.getTrigger().player;
				var type=get.type(card,player),player;
				var previous=trigger.player.getPrevious();
				var next=trigger.player.getNext();
				var num=trigger.num
				var nature=trigger.nature
				switch(type){
					case 'basic': num++;
					break;
					case 'equip': num==0;
					break;
					case 'delay': nature="fire",previous.num++;
					break;
					case 'trick': nature="thunder",next.num++;
					break;
				}
				return -get.value(card);
			});
			"step 1"
			if(result.bool){
				switch(get.type(result.cards[0])){
					case 'basic':
					trigger.num++;
					player.storage.xjzh_zxzh_yufeng.add("basic");
					break;
					case 'equip':
					trigger.cancel();
					trigger.player.chooseToDiscard(2,"he",true);
					player.storage.xjzh_zxzh_yufeng.add("equip");
					break;
					case 'delay':
					if(!game.hasNature(trigger,'fire')){
						game.setNature(trigger,'fire',false)
					}
					var previous=trigger.player.getPrevious();
					previous.damage("thunder",trigger.source);
					player.storage.xjzh_zxzh_yufeng.add("delay");
					break;
					case 'trick':
					if(!game.hasNature(trigger,'thunder')){
						game.setNature(trigger,'thunder',false)
					}
					var next=trigger.player.getNext();
					next.damage("thunder",trigger.source);
					player.storage.xjzh_zxzh_yufeng.add("trick");
					break;
				}
			}
			"step 2"
			player.markSkill("xjzh_zxzh_yufeng");
			player.update();
		},
		subSkill:{
			"damage":{
				trigger:{
					global:["phaseAfter","phaseBefore"],
				},
				direct:true,
				priority:-99,
				sub:true,
				content:function(){
					delete player.storage.xjzh_zxzh_yufeng
					player.unmarkSkill("xjzh_zxzh_yufeng");
				},
			},
		}
	},
	//《金庸群侠传·绝郭靖·镇卫》
	"xjzh_zxzh_fengzhen":{
		trigger:{global:"useCard"},
		direct:true,
		priority:-5,
		filter:function(event,player){
			if(event.card.name=='sha'||event.card.name=='nanman'||event.card.name=='wanjian'){
				if(game.hasPlayer(function(current){
					if(!event.targets.includes(current))return false;
					return current.isEmpty(2);
				})
				)return player.countCards('he')>0;
			}
			return false;
		},
		content:function(){
			"step 0"
			var next=player.chooseCardTarget({
				position:'he',
				selectTarget:[1,Infinity],
				filterCard:lib.filter.cardDiscardable,
				filterTarget:function(card,player,target){
					var trigger=_status.event.getTrigger();
					if(!trigger.targets.includes(target))return false;
					return target.isEmpty(2);
					//!target.isDisabled(2);
				},
				ai1:function(card){
					return get.unuseful(card)+9;
				},
				ai2:function(target){
					var trigger=_status.event.getTrigger();
					//var bool1=get.tag(trigger.card,'respondSha')&&!target.hasSha();
					// var bool2=get.tag(trigger.card,'respondShan')&&!target.hasShan();
					//if(bool1||bool2)return get.attitude(_status.event.player,target);
					var att=get.attitude(_status.event.player,target);
					if(trigger.targets.length==1){
						if(trigger.card.name=='sha'&&trigger.card.nature=='fire'&&lib.inpile.includes('tengjia'))return -1;
						if(trigger.card.name=='sha'&&trigger.card.nature=='fire'&&lib.inpile.includes('jydiywuchanyi'))return -1;
						if(trigger.card.name=='sha'&&trigger.card.nature=='jy_du'&&lib.inpile.includes('jydiy_jingsibeixin'))return -1;
					}
					return att>0?att :0;
				},
				prompt:''+get.translation(trigger.targets)+'成为了'+get.translation(trigger.player)+''+get.translation(trigger.card)+'的目标',
				prompt2:'弃置一张牌，选择任意名目标直到此牌结算结束，你选择的角色视为装备一张防具牌',
			});
			"step 1"
			if(result.bool){
				player.logSkill('xjzh_zxzh_fengzhen',result.targets);
				event.targets=result.targets;
				player.discard(result.cards);
				var list=get.inpile(function(name){
					var card={
					name:name};
					var info=get.info(card);
					return info.type=='equip'&&info.subtype=='equip2'&&info.skills;
				});
				for(var i=0; i<list.length; i++){
					list[i]=['防具','',list[i]];
				}
				var att=get.attitude(player,result.targets[0])>0
				var dialog=ui.create.dialog('选择一张防具牌令你选择的角色视为装备该防具牌',[list,'vcard'],'hidden');
				player.chooseButton(dialog,true).set('ai',function(button){
					var player=_status.event.player;
					var aibool=_status.event.aibool;
					var cardx=_status.event.cardx;
					var triggerx=_status.event.triggerx;
					var name=button.link[2];
					if(aibool){
						if((cardx.name=='wanjian'||cardx.name=='nanman')&&(name=='tengjia'||name=='jydiywuchanyi'||name=='jydiy_jingsibeixin'))return 10;
						if(cardx.name=='sha'&&!cardx.nature&&(name=='tengjia'||name=='jydiywuchanyi'||name=='jydiy_jingsibeixin'))return 10;
						if(cardx.name=='sha'&&get.color(cardx)=='black'&&(name=='renwang'||name=='jydiybeidouzhen'))return 10;
						if(cardx.name=='sha'&&name=='jydiytaohuazhen_re')return 8;
						if(cardx.name=='sha'&&(name=='bagua'||'jydiytaohuazhen'))return 6;
						if(triggerx&&triggerx.baseDamage&&triggerx.baseDamage>1&&(name=='jydiy_ruanweijia_re'||name=='jydiy_ruanweijia'))return 5;
						if(triggerx&&triggerx.baseDamage&&triggerx.baseDamage>1&&name=='baiyin')return 4;
						return 0;
					}
					else{
						if(cardx.name=='sha'&&cardx.nature&&cardx.nature=='fire'&&(name=='tengjia'||name=='jydiywuchanyi'))return 10;
						if(cardx.name=='sha'&&cardx.nature&&cardx.nature=='jy_du'&&name=='jydiy_jingsibeixin')return 10;
						return 0;
					}
				})
				.set('aibool',att).set('cardx',trigger.card).set('triggerx',trigger);
			}
			else event.finish();
			"step 2"
			if(result.bool){
				var card=game.createCard(result.links[0][2],'','','');
				var skills=get.info(card).skills;
				skills=skills.slice(0);
				for(var i of event.targets){
					i.$gain2(card);
					for(var s of skills){
						i.addTempSkill(s,'useCardEnd');
					}
				}
			}
		},
	},
	//《金庸群侠传·庄聚贤·焚庄》
	"xjzh_zxzh_zonghuo":{
		skillAnimation:"epic",
		animationColor:"fire",
		animationStr:"烈焰焚天",
		enable:"phaseUse",
		filter:function(event,player){
			return !player.storage.xjzh_zxzh_zonghuo;
		},
		filterTarget:function(card,player,target){
			return player!=target;
		},
		unique:true,
		limited:true,
		selectTarget:-1,
		marktext:"焚",
		mark:true,
		multitarget:true,
		multiline:true,
		line:"fire",
		init:function(player){
			player.storage.xjzh_zxzh_zonghuo=false;
		},
		intro:{
			content:"limited",
		},
		content:function(){
			"step 0"
			player.chooseControl(['一','二'],function(event,player){
				if(player.hasSkillTag('nofire')) return '二';
				if(player.hp-2>0) return '二';
				return '一';
			})
			.set('prompt','请选择要造成的伤害');
			"step 1"
			event.onfire=result.control=='二'?2:1;
			player.damage('fire',event.onfire,player);
			player.storage.xjzh_zxzh_zonghuo=true;
			player.awakenSkill('xjzh_zxzh_zonghuo');
			event.num1=0;
			"step 2"
			if(event.num1<targets.length){
				if(targets[event.num1].countCards('e')&&player.isIn()){
					targets[event.num1].chooseBool('是否将装备区的牌交给'+get.translation(player)+'?否则受到'+get.translation(player)+(event.onfire==2?'二':'一')+'点火焰伤害').set('ai',function(evt,playerx){
						var num=evt.onfire;
						if(playerx.hasSkillTag('nofire')) return false;
						if(get.attitude(playerx,evt.player)>0) return true;
						if(playerx.countCards('e')==1) return true;
						if(playerx.hp-num>1) return true;
						return get.damageEffect(playerx,playerx,playerx,'fire')<0;
					});
				}
				else{
					targets[event.num1].damage('fire',event.onfire,player);
					event.num1++;
					event.redo();
				}
			}
			else{
				event.finish();
			}
			"step 3"
			if(result&&result.bool){
				targets[event.num1].$give(targets[event.num1].getCards('e'),player);
				player.gain(targets[event.num1].getCards('e'));
			}
			else{
				targets[event.num1].damage('fire',event.onfire,player);
				targets[event.num1].say(['此火乘风而来，燎原不绝！','此火焚尽一切，天地万物！'].randomGet())
			}
			event.num1++;
			event.goto(2);
		},
		ai:{
			order:1,
			result:{
				player:function(player){
					var num=0,players=game.filterPlayer();
					for(var i=0;i<players.length;i++){
						if(player!=players[i]&&get.damageEffect(players[i],player,players[i],'fire')<0){
							var att=get.attitude(player,players[i]);
							if(att>0&&!players[i].countCards('e')&&!players[i].hasSkillTag('nofire')){
								num-=1;
							}
							else if(att<0&&!players[i].hasSkillTag('nofire')){
								num+=1;
							}
						}
					}
					if(player.hasSkillTag('nofire')){
						return num;
					}
					else return num-1;
				},
			},
		},
	},
	"xjzh_zxzh_shoutao":{
		locked:true,
		forced:true,
		trigger:{
			player:["gainAfter"],
			global:"phaseZhunbeiBegin",
		},
		mod:{
			cardEnabled:function(card,player){
				if(card.name=='tao') return false;
			},
		},
		priority:-3,
		global:["xjzh_zxzh_shoutao_ai"],
		group:["xjzh_zxzh_shoutao_recover"],
		filter:function (event,player){
			if(event.name=="gain"){
				return event.cards&&event.cards.some(c=>c.name=='tao');
			}
			if(event.name=="phaseZhunbei"){
				return player.countCards("h",{name:"tao"});
			}
			return false;
		},
		content:function (){
			"step 0"
			if(trigger.name=="gain"){
				event.cards=trigger.cards.filter(c=>c.name=='tao');
			}
			else{
				var hs=player.getCards('h','tao');
				if(hs.length){
					player.discard(hs);
					player.draw(hs.length*2);
					player.addMark("xjzh_zxzh_taoyuan",hs.length);
				}
				event.finish();
			}
			"step 1"
			event.card=event.cards.pop();
			player.discard(event.card);
			"step 2"
			if(player.isDamaged()){
				player.recover();
			}
			else{
				player.draw(2,'nodelay');
				if(player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan',1,false);
				game.log(player,'将',event.card,'离开游戏');
				player.lose(event.card,ui.special,'toStorage');
			}
			"step 3"
			if(event.cards.length){
				event.goto(1);
			}
		},
		subSkill:{
			"recover":{
				forced:true,
				popup:false,
				sub:true,
				trigger:{
					global:"recoverAfter",
				},
				content:function (){
					if(trigger.player==player){
						if(!player.hasSkill("xjzh_zxzh_shoutao_jin")&&player.hasSkill("xjzh_zxzh_taoyuan")) player.addMark('xjzh_zxzh_taoyuan',1,false);
					}
					else{
						if(player.isDamaged()){
							player.recover(trigger.num);
						}
						else{
							player.draw()
						}
					}
				},
			},
			"ai":{
				ai:{
					nosave:true,
					skillTagFilter:function(player){
						if(player.countCards("h","tao")) return false;
					},
				},
			},
		},
	},
	"xjzh_zxzh_taoyuan":{
		locked:true,
		forced:true,
		marktext:"桃",
		intro:{
			name:"桃源",
			content:"mark",
		},
		trigger:{
			player:"dying",
		},
		filter:function (event,player){
			return player.hasMark("xjzh_zxzh_taoyuan");
		},
		content:function (){
			"step 0"
			player.addTempSkill("xjzh_zxzh_shoutao_jin","recoverAfter");
			var num1=player.countMark("xjzh_zxzh_taoyuan");
			var num2=player.maxHp-player.hp;
			if(num1>num2){
				player.recover(num2);
				player.draw(num1-num2);
			}
			else{
				player.recover(num1);
			}
			"step 1"
			player.clearMark("xjzh_zxzh_taoyuan");
		},
	},
	"xjzh_zxzh_shoutao_jin":{
		sub:true,
	},
	"xjzh_zxzh_qiwu":{
		enable:"phaseUse",
		locked:true,
		usable:1,
		check:function (event,player){
			return player.hp>1||player.canSave(player);
		},
		content:function () {
			'step 0'
			player.loseHp();
			player.draw(2);
			event.targets=game.filterPlayer();
			event.targets.remove(player);
			event.targets.sortBySeat();
			player.line(event.targets,'green');
			event.gained=false;
			'step 1'
			event.target=event.targets.shift();
			event.target.draw();
			event.card=result[0];
			if(event.card.name=='tao'){
				player.gain(event.target,event.card,'visible','give');
				event.gained=true;
			}
			'step 2'
			if(event.targets.length){
				event.goto(1);
			}
		},
		ai:{
			order:12,
		},
	},
	"xjzh_zxzh_leifax":{
		trigger:{
			global:"phaseUseBegin",
		},
		frequent:true,
		locked:true,
		charlotte:true,
		priority:3,
		superCharlotte:true,
		xjzh_xinghunSkill:true,
		mod:{
			targetEnabled(card,player,target) {
				if(player==target.storage.xjzh_zxzh_leifax_target) return false;
			},
		},
		check(event,player){
			return get.attitude(player,event.player)<0;
		},
		prompt(event,player){
			return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
		},
		filter(event,player){
			return event.player!=player;
		},
		async content(event,trigger,player){
			let cards=get.cards()[0];
			await player.showCards(cards);
			let suits=get.suit(cards);
			if(suits!="spade"){
				const {result:{bool}}=await trigger.player.chooseToDiscard('请弃置一张花色为'+get.translation(suits)+'的牌，否则本回合内非锁定技失效',"h",1,{suit:suits}).set('ai',card=>{
					if(["tao","wuzhong"].includes(card.name)) return 0;
					return 8-get.value(card);
				});
				if(!bool){
					player.draw();
					trigger.player.addTempSkill("fengyin");
				}
			}else{
				game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
				trigger.player.damage(1,"thunder",player);
				player.storage.xjzh_zxzh_leifax_target=trigger.player;
				player.addTempSkill('xjzh_zxzh_leifax_target');
			}
		},
		subSkill:{
			"target":{
				mark:'character',
				onremove:true,
				sub:true,
				intro:{
					content:'本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
				},
			},
		},
		ai:{
			expose:0.5,
		},
	},
	"xjzh_zxzh_leifax2":{
		trigger:{
			global:"phaseUseBegin",
		},
		frequent:true,
		locked:true,
		charlotte:true,
		priority:3,
		superCharlotte:true,
		xjzh_xinghunSkill:true,
		mod:{
			targetEnabled(card,player,target) {
				if(player==target.storage.xjzh_zxzh_leifax_target) return false;
			},
		},
		check(event,player){
			return get.attitude(player,event.player)<0;
		},
		prompt(event,player){
			return "是否对"+get.translation(event.player)+"发动〖雷法〗？";
		},
		filter(event,player){
			return event.player!=player;
		},
		async content(event,trigger,player){
			let cards=get.cards()[0];
			await player.showCards(cards);
			let suits=get.suit(cards);
			if(suits!="spade"){
				const {result:{bool}}=await trigger.player.chooseToDiscard('请弃置两张花色为'+get.translation(suits)+'的牌，否则本回合内非锁定技失效',"h",2,{suit:suits}).set('ai',card=>{
					if(["tao","wuzhong"].includes(card.name)) return 0;
					return 8-get.value(card);
				});
				if(!bool){
					player.draw();
					trigger.player.addTempSkill("baiban");
				}
			}else{
				game.xjzh_playEffect("xjzh_skillEffect_leiji2",trigger.player);
				trigger.player.damage(2,"thunder",player);
				player.storage.xjzh_zxzh_leifax_target=trigger.player;
				player.addTempSkill('xjzh_zxzh_leifax_target');
			}
		},
		subSkill:{
			"target":{
				mark:'character',
				onremove:true,
				sub:true,
				intro:{
					content:'本回合内<font color=yellow>$</font>无法指定<font color=yellow>林子言</font>为目标直到回合结束'
				},
			},
		},
		ai:{
			expose:0.5,
		},
	},
	//《血色衣冠·朱棣·盛威》
	"xjzh_zxzh_leiyu":{
		forced:true,
		locked:true,
		priority:69,
		group:["xjzh_zxzh_leiyu_unmark","xjzh_zxzh_leiyu_change"],
		trigger:{
			player:"phaseBegin",
			global:"gameDrawBegin",
		},
		mod:{
			suit:function (card,suit){
				let player=get.player();
				if(!player||!player.storage.xjzh_zxzh_leiyu) return;
				return player.storage.xjzh_zxzh_leiyu;
			},
		},
		intro:{
			content:function (content,player){
				var str=get.translation(player.storage.xjzh_zxzh_leiyu);
				return '你所有牌花色均视为：'+str;
			},
		},
		marktext:"雷",
		content:function(){
			'step 0'
			player.chooseControl(lib.suit).set('prompt','请选择一种花色').set('ai',function(){
				return lib.suit.randomGet();
			});
			'step 1'
			var suit=result.control;
			player.chat(get.translation(suit+2));
			game.log(player,'选择了','#y'+get.translation(suit+2));
			player.storage.xjzh_zxzh_leiyu=true;
			player.storage['xjzh_zxzh_leiyu']=result.control;
			player.storage.xjzh_zxzh_leiyu_unmark=result.control;
			player.markSkill('xjzh_zxzh_leiyu');
		},
		subSkill:{
			"unmark":{
				trigger:{
					player:"phaseBegin",
				},
				sub:true,
				priority:70,
				forced:true,
				filter:function (event, player) {
					var player=_status.event.player;
					return _status.event.player=player&&get.suit(event.card,player)==player.storage.xjzh_zxzh_leiyu;
					;
				},
				content:function () {
					player.storage.xjzh_zxzh_leiyu=false;
					player.unmarkSkill('xjzh_zxzh_leiyu');
					delete player.storage['xjzh_zxzh_leiyu'];
					delete player.storage.xjzh_zxzh_leiyu_unmark;
				},
			},
			"change":{
				trigger:{
					target:"useCardToTargeted",
				},
				sub:true,
				priority:70,
				forced:true,
				filter:function (event,player){
					return get.suit(event.card)==player.storage.xjzh_zxzh_leiyu;
				},
				content:function () {
					player.draw();
				},
			},
		},
	},
	"xjzh_zxzh_tianxin":{
		enable:"phaseUse",
		async content(event,trigger,player){
			let cards=get.cards(player.hp);
			await player.showCards(cards);
			let num=0;
			let num2=0;
			for await(let card of cards){
				if(get.suit(card)=='spade') num++;
				else num2++;
			}
			await game.cardsDiscard(cards);
			if(num>=num2){
				const {result:{bool,targets}}=await player.chooseTarget('请选择〖天心〗的目标',lib.filter.notMe).set('ai',target=>{
					var att=get.attitude(_status.event.player,target);
					if(att<0) return -att;
					if(att==0) return Math.random();
					return att;
				});
				if(bool){
					var target=targets[0];
					game.xjzh_playEffect("xjzh_skillEffect_leiji",target);
					target.damage(num,player,"thunder","nocard");
					player.removeSkill('xjzh_zxzh_tianxin');
					player.removeSkill('xjzh_zxzh_leifax');
					player.addSkill("xjzh_zxzh_leifax2");
				}
			}else{
				game.xjzh_playEffect("xjzh_skillEffect_leiji2",player);
				await player.damage(1,player,"thunder","nocard");
				await player.draw(player.getDamagedHp(true));
			}
		},
		ai:{
			order:2,
			expose:0.8,
			result:{
				player(card,player,target){
					return player.hp>2;
				},
			},
		},
	},
	"xjzh_zxzh_cangjian":{
		trigger:{
			player:["phaseBegin","phaseEnd"],
		},
		marktext:"剑",
		intro:{
			markcount:"expansion",
			mark(dialog,content,player){
				content=player.getExpansions('xjzh_zxzh_cangjian');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'把剑';
					}
				}
			},
		},
		forced:true,
		locked:true,
		unique:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		onremove(player,skill){
			let cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
		},
		init(player,skill){
			let cards=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip1');
			cards.length?player.addToExpansion(cards.randomGets(get.rand(5,9)),player,'draw').gaintag.add('xjzh_zxzh_cangjian'):null;
			player.disableEquip(1);
			player.storage[skill]=[];
		},
		filter(event,player){
			return player.hasExpansions('xjzh_zxzh_cangjian');
		},
		async content(event,trigger,player){
			let cards=player.getExpansions('xjzh_zxzh_cangjian').randomGet();
			player.getExpansions('xjzh_zxzh_cangjian').remove(cards);
			ui.cardPile.insertBefore(cards,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
			let skills=get.info(cards,false).skills;
			if(skills.length){
				player.addSkill(skills);
				player.storage[event.name].push(get.name(cards,false));
			}
			game.updateRoundNumber();
		},
	},
	"xjzh_zxzh_jiantai":{
		trigger:{
			global:"damageEnd",
		},
		forced:true,
		priority:3,
		mod:{
			ignoredHandcard(card,player,bool){
				if(card.hasGaintag('xjzh_zxzh_jiantai')) return true;
			},
			aiValue(player,card,num){
				if(card.hasGaintag('xjzh_zxzh_jiantai')) return 9.5;
			},
		},
		filter(event,player){
			if(!player.storage.xjzh_zxzh_cangjian||!player.storage.xjzh_zxzh_cangjian.length) return false;
			if(event.source!=player&&event.player==player) return true;
			if(event.source==player) return true;
			return false;
		},
		async content(event,trigger,player){
			let num=player.storage.xjzh_zxzh_cangjian.length?player.storage.xjzh_zxzh_cangjian.length:0,cards=get.cards(num+1);
			player.showCards(cards);
			game.delayx();
			let card=cards.filter(item=>get.subtype(item)=='equip1').length?cards.filter(item=>get.subtype(item)=='equip1'):cards.filter(item=>get.type(item)=='equip');
			player.gain(card,"gain2","log",player).gaintag.add(event.name);
		},
	},
	"xjzh_zxzh_yujian":{
		enable:["chooseToUse","chooseToRespond"],
		group:["xjzh_zxzh_yujian2"],
		filter:function(event,player){
			if(!player.countCards("h",card=>card.hasGaintag('xjzh_zxzh_jiantai'))) return false;
			for(let i of lib.inpile){
				if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
				let type=get.type(i);
				if((type=='basic'||type=='trick')&&event.filterCard({name:i},player,event)) return true;
				if(i=='sha'){
					for(var j of lib.inpile_nature){
						if(event.filterCard({name:i,nature:j},player,event)) return true;
					}
				}
			}
			return false;
		},
		chooseButton:{
			dialog:function (event,player){
				let list1=[],list1Tag,list2=[],list2Tag;
				for(let i of lib.inpile){
					if(!lib.translate[i+'_info']) continue;
					if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
					let type=get.type(i);
					if(type=='basic'){
						list1.push([type,'',i]);
						if(event.filterCard({name:i},player,event)) list1Tag=true;
						if(i=='sha'){
							for (let j of lib.inpile_nature) list1.push([type,'',i,j]);
						}
					}
					if(type=='trick'){
						list2.push([type,'',i]);
						if(event.filterCard({name:i},player,event)) list2Tag=true;
					}
				}
				let dialog=ui.create.dialog('hidden');
				if(list1Tag){
					dialog.add('基本牌');
					dialog.add([list1,'vcard']);
				}
				if(list2Tag){
					dialog.add('锦囊牌');
					dialog.add([list2,'vcard']);
				}
				return dialog;
			},
			filter(button,player){
				let evt=_status.event.getParent();
				return evt.filterCard({name:button.link[2],nature:button.link[3]},player,evt);
			},
			check(button){
				let player=_status.event.player;
				if(player.countCards("h",button.link[2],card=>card.hasGaintag('xjzh_zxzh_jiantai'))>0) return 0;
				if(button.link[2]=='wugu') return 0;
				let effect=player.getUseValue(button.link[2]);
				if(effect>0) return effect;
				return 0;
			},
			backup(links,player){
				return{
					filterCard(card){
						let pos=get.position(card);
						if(pos=='h'&&card.hasGaintag('xjzh_zxzh_jiantai')) return true;
						return false;
					},
					selectCard:1,
					popname:true,
					viewAs:{
						name:links[0][2],
						nature:links[0][3],
					},
				}
			},
			prompt(links,player){
				return '将一张“剑胎”牌当作'+get.translation(links[0][2])+'使用或打出';
			},
		},
	},
	"xjzh_zxzh_yujian2":{
		enable:"chooseToUse",
		filterCard(card) {
			let pos=get.position(card);
			if(pos=='h'&&card.hasGaintag('xjzh_zxzh_jiantai')) return true;
			return false;
		},
		viewAsFilter(player) {
			return player.countCards("hs",card=>card.hasGaintag('xjzh_zxzh_jiantai'))>0;
		},
		viewAs:{
			name:"wuxie",
		},
		sub:true,
		position:"hs",
		prompt:"将1张“剑胎”当作无懈可击使用",
		check(card) {
			const tri = _status.event.getTrigger();
			if (tri && tri.card && tri.card.name == "chiling") return -1;
			return 8 - get.value(card);
		},
		threaten:1.2,
		ai:{
			basic:{
				useful:[6,4,3],
				value:[6,4,3],
			},
			result:{
				player:1,
			},
			expose:0.2,
		},
	},
	"xjzh_zxzh_shiqiao":{
		trigger:{
			global:['loseAfter', 'cardsDiscardAfter'],
		},
		filter(event,player){
			return event.cards&&event.cards.filter(function(card){
				return get.position(card,true)=='d';
			}).length>0;
		},
		forced:true,
		locked:true,
		priority:6,
		init(player){
			let num=get.rand(1,5);
			if(!player.storage.xjzh_zxzh_shiqiao) player.storage.xjzh_zxzh_shiqiao=[]
			while(player.storage.xjzh_zxzh_shiqiao.length<num){
				let num2=get.rand(1,13);
				if(!player.storage.xjzh_zxzh_shiqiao.includes(num2)) player.storage.xjzh_zxzh_shiqiao.push(num2);
			}
		},
		mark:true,
		marktext:"樵",
		intro: {
			markcount(storage,player){
				if(!storage) return;
				return storage.length;
			},
			content(storage,player){
				let str="已记录点数：";
				for(let i=0;i<storage.length;i++){
					if(storage[i]!=storage[storage.length-1]){
						str+=""+get.translation(storage[i])+"、";
					}else{
						str+=""+get.translation(storage[i])+"";
					}
				}
				return str;
			},
		},
		mod:{
			aiOrder(player,card,num){
				if(!player.storage.xjzh_zxzh_shiqiao) return;
				let list=player.storage.xjzh_zxzh_shiqiao.slice(0);
				if(get.number(card)==list[0]) return num+3.5;
			},
		},
		async content(event,trigger,player){
			let cards=trigger.cards
			while(cards.length){
				let storage=player.storage.xjzh_zxzh_shiqiao;
				let card=cards.pop().fix();
				ui.cardPile.insertBefore(card,ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
				let number=get.number(card);
				if(storage.includes(number)){
					let card2=get.cardPile(cardx=>{
						return get.number(cardx)!=number;
					});
					if(card2){
						player.gain(card2,player,"draw");
					}
					storage.removeArray(storage.filter(index=>{
						return index==number;
					}));
					game.log(player,"移除了点数",number,"获得了",card2);
					if(storage.length==0){
						lib.skill.xjzh_zxzh_shiqiao.init(player);
					}
				}
			}
		},
	},
	"xjzh_zxzh_baoxin":{
		trigger:{
			player:['phaseDrawBegin','phaseDiscardBegin'],
		},
		filter(event,player){
			if(!player.storage.xjzh_zxzh_shiqiao||!player.storage.xjzh_zxzh_shiqiao.length) return false;
			return true;
		},
		forced:true,
		locked:true,
		priority:6,
		group:["xjzh_zxzh_baoxin_use"],
		async content(event,trigger,player){
			trigger.cancel(null,null,'notrigger');
			let list=[],list2=[];
			while(list.length<13){
				let cardPilex=Array.from(ui.cardPile.childNodes);
				let cards=cardPilex.randomGet()
				list.push(cards);
				cardPilex.remove(cards);
			};
			player.showCards(list);
			let storage=player.storage.xjzh_zxzh_shiqiao.slice(0);
			for(let i of list){
				if(storage.includes(get.number(i))){
					list.remove(i);
					list2.push(i);
				}
			}
			if(list2.length){
				player.gain(list2,player,"draw")._triggered=null;
			}
			let str=`跳过了${get.translation(trigger.name)}${list2.length?"摸了":""}${list2.length}张牌`;
			game.cardsDiscard(list);
			game.log(player,str);
		},
		subSkill:{
			"use":{
				trigger:{
					player:"useCard",
				},
				forced:true,
				priority:6,
				sub:true,
				check:function(event,player){return 1;},
				filter(event,player){
					if(!player.storage.xjzh_zxzh_shiqiao||!player.storage.xjzh_zxzh_shiqiao.length) return false;
					let storage=player.storage.xjzh_zxzh_shiqiao.slice(0);
					if(!event.cards||!event.cards.length) return false;
					if(!storage.includes(get.number(event.cards[0]))) return false;
					if(event.getParent().name=="xjzh_zxzh_baoxin_use") return false
					if(get.type(event.cards[0])=="equip"||get.type(event.cards[0])=="delay") return false;
					return true;
				},
				async content(event,trigger,player){
					let controlList=[
						`移除点数${get.number(trigger.cards[0])}摸两张牌`,
						`移除点数${get.number(trigger.cards[0])}令${get.translation(trigger.cards[0])}额外结算一次`,
					]
					const index=await player.chooseControlList(get.prompt(event.name,player),controlList).set('ai',()=>{
						var player=_status.event.player
						if(player.countCards('h')<=1) return 0;
						return 1;
					}).forResult("index");
					if(index){
						switch(index){
							case 0:{
								player.storage.xjzh_zxzh_shiqiao.remove(get.number(trigger.cards[0]));
								player.draw(2);
							};
							break;
							case 1:{
								player.storage.xjzh_zxzh_shiqiao.remove(get.number(trigger.cards[0]));
								trigger.effectCount++
								game.log(trigger.cards[0],'额外结算1次');
							};
							break;
						}
					}
				},
			},
		},
	},
	"xjzh_zxzh_moyu":{
		trigger:{
			player:"phaseZhunbeiBegin",
		},
		check(event,player){return 1;},
		prompt:"〖默语〗：是否进行一次判定？",
		async content(event,trigger,player){
			const judgeEvent=await player.judge(card=>{
				if(get.suit(card)=='heart') return 2;
				if(get.suit(card)=='spade') return 1;
				return -1;
			});
			judgeEvent.judge2=result=>result.bool;
			const {result:{judge}}=judgeEvent;
			if(judge<0) return;
			switch(judge){
				case 2:
					var text="〖默语〗：选择一名角色与其交换体力值与体力上限";
					var num=1;
				break;
				case 1:
					var text="〖默语〗：选择两名角色令其交换技能";
					var num=2;
				break;
			};
			const targets=await player.chooseTarget(text,num,function(card,player,target){
				if(num==1) return target!=player;
				return true;
			}).set('ai',function(target){
				let att=get.attitude(player,target);
				let judge=judgeEvent;
				if(judge==2){
					if(att<0) return target.maxHp>player.maxHp||target.hp>player.hp;
					if(att>0) return 0.5;
				}else{
					return 0.5;
				}
			}).set('num',num).forResultTargets();
			if(targets){
				if(targets.length>1){
					let skills=targets[0].getSkills(null,false,false).filter(skill=>{
						let info=get.info(skill);
						if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
						return true;
					});
					let skills2=targets[1].getSkills(null,false,false).filter(skill=>{
						let info=get.info(skill);
						if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
						return true;
					});
					targets[0].changeSkills(skills2,skills);
					targets[1].changeSkills(skills,skills2);
				}else{
					player.swapMaxHp(targets[0]);
				}
			}
		},
	},
	"xjzh_zxzh_zhenwen":{
		trigger:{
			global:"changeSkillsEnd",
		},
		usable(player){
			return game.roundNumber;
		},
		prompt(event,player){
			let str="〖真纹〗："
			let skills=event.addSkill;
			let skillsLocked=skills.filter(skill=>{
				return get.is.locked(skill);
			});
			let skillsnoLocked=skills.filter(skill=>{
				return !get.is.locked(skill);
			});
			str+=`是否令${get.translation(event.player)}失去${skills.map(i=>{
				return '【' + get.translation(i) + '】';
			})}`;
			if(skillsnoLocked.length) str+=`然后你获得技能${skillsnoLocked.map(i=>{
				return '【' + get.translation(i) + '】';
			})}`;
			if(skillsLocked.length) str+=`并摸${skillsnoLocked.length*2}张牌`;
			return str;
		},
		filter(event,player){
			if(!event.addSkill.length) return false;
			if(event.getParent().name=="chooseCharacter") return false;
			if(event.getParent("xjzh_zxzh_zhenwen").name=="xjzh_zxzh_zhenwen") return false;
			let skills=event.addSkill.slice(0).filter(skill=>{
				let info=get.info(skill);
				if(!info||!lib.translate[skill]||lib.translate[skill]==''||!lib.translate[skill+'_info']||lib.translate[skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub) return false;
				if(lib.skill.global.includes(skill)) return false;
				if(player.getStockSkills().includes(skill)) return false;
				return true;
			});
			if(!skills.length) return false;
			return true;
		},
		async content(event,trigger,player){
			let skills=trigger.addSkill.slice(0);
			skills.forEach(skill=>{
				if(get.is.locked(skill)){
					trigger.player.removeSkill(skill,true)
					trigger.player.draw(2);
				}else{
					trigger.player.removeSkill(skill,true);
					player.addSkillLog(skill);
				}
			});
		},
	},
	"xjzh_zxzh_jinyan":{
		trigger:{
			global:"$logSkill",
		},
		prompt:function(event,player){
			var str="〖禁言〗：是否禁用"+get.translation(event.player)+"的技能"+get.translation(event.skill)+"直到下个回合开始？";
			return str;
		},
		usable:1,
		filter:function(event,player){
			if(event.getParent().name=="chooseCharacter") return false;
			if(event.getParent("xjzh_zxzh_jinyan").name=="xjzh_zxzh_jinyan") return false;
			var info=get.info(event.skill)
			if(!info||!lib.translate[event.skill]||lib.translate[event.skill]==''||!lib.translate[event.skill+'_info']||lib.translate[event.skill+'_info']==''||info.equipSkill||info.cardSkill||info.temp||info.sub||info.juexingji||info.dutySkill||info.limited) return false;
			if(lib.skill.global.includes(event.skill)) return false;
			if(event.player==player) return false;
			return true;
		},
		check:function(event,player){
			var att=get.attitude(player,event.player);
			return -att;
		},
		content:function(){
			if(!trigger.player.storage.xjzh_zxzh_jinyan_nouse) trigger.player.storage.xjzh_zxzh_jinyan_nouse=[]
			trigger.player.storage.xjzh_zxzh_jinyan_nouse.push(trigger.skill);
			trigger.player.addTempSkill("xjzh_zxzh_jinyan_nouse",{player:"phaseBefore"});
			game.log(trigger.player,"的技能〖"+get.translation(trigger.skill)+"〗因","#g〖禁言〗","被禁用")
		},
		subSkill:{
			"nouse":{
				init:function(player,skill){
					player.addSkillBlocker(skill);
				},
				onremove:function(player,skill){
					player.removeSkillBlocker(skill);
					if(player.storage.xjzh_zxzh_jinyan_nouse) delete player.storage.xjzh_zxzh_jinyan_nouse
				},
				skillBlocker:function(skill,player){
					if(!player.storage.xjzh_zxzh_jinyan_nouse.includes(skill)) return false;
					return true;
				},
			},
		},
	},

};