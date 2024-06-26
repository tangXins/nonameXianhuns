import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills={
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
			global:"gameStart",
		},
		marktext:"剑",
		intro:{
			markcount:"expansion",
			mark:function(dialog,content,player){
				var content=player.getExpansions('xjzh_zxzh_cangjian');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						dialog.addAuto(content);
					}
					else{
						return '共有'+get.cnNumber(content.length)+'把剑';
					}
				}
			},
			content:function(content,player){
				var content=player.getExpansions('xjzh_zxzh_cangjian');
				if(content&&content.length){
					if(player==game.me||player.isUnderControl()){
						return get.translation(content);
					}
					return '共有'+get.cnNumber(content.length)+'把剑';
				}
			}
		},
		forced:true,
		locked:true,
		unique:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
		},
		group:["xjzh_zxzh_cangjian_discard","xjzh_zxzh_cangjian_use"],
		content:function (){
			var list=[]
			for(var i=0;i<ui.cardPile.childNodes.length;i++){
				if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
					list.add(ui.cardPile.childNodes[i]);
				}
			}
			if(list.length){
				var num=get.rand(5,9);
				var cards=list.randomGets(num)
				player.addToExpansion(cards,player,'draw').gaintag.add('xjzh_zxzh_cangjian');
			}
		},
		subSkill:{
			"discard":{
				trigger:{
					player:"phaseAfter",
				},
				sub:true,
				direct:true,
				filter:function(event,player){
					if(player.isDisabled(1)) return false;
					return true;
				},
				content:function(){
					"step 0"
					event.num=[]
					if(player.getEquip(1)){
						var cardx=player.getEquip(1);
						var numx=get.rand(ui.cardPile.childElementCount);
						var next=player.lose(cardx,ui.cardPile);
						next.set('forceDie',true);
						next.set('insert_index_card',ui.cardPile.childNodes[numx]);
						next.set('insert_index',function(event){
							return event.insert_index_card;
						});
						event.num=1;
					}else{
						if(player.getExpansions('xjzh_zxzh_cangjian').length){
							if(player.getExpansions('xjzh_zxzh_cangjian').length<2){
								event.num=1
							}
							else{
								event.num=2
							}
							player.chooseCardButton(event.num,"选择两张武器牌将其置入牌堆",player.getExpansions('xjzh_zxzh_cangjian'),true);
						}else{
							event.goto(3);
						}
					}
					"step 1"
					if(result.bool){
						for(var i=0;i<result.links.length;i++){
							player.getExpansions('xjzh_zxzh_cangjian').removeArray(result.links[i]);
							var num=get.rand(ui.cardPile.childElementCount);
							ui.cardPile.insertBefore(result.links[i],ui.cardPile.childNodes[num]);
							/*player.lose(result.links[i],ui.ordering);
							ui.cardPile.insertBefore(result.links[i],ui.cardPile.firstChild);*/
						}
					}
					/*"step 2"
					event.list=[]
					for(var i=0;i<ui.cardPile.childNodes.length;i++){
					event.list.add(ui.cardPile.childNodes[i]);
					}
					"step 3"
					if(event.list&&event.list.length){
					event.cards=event.list;
					event.cards.randomSort();
					game.cardsGotoSpecial(event.cards);
					game.log(player,"将牌堆的牌序打乱了");
					}
					else{
					event.goto(5);
					}
					"step 4"
					for(var x of event.cards){
					x.fix();
					ui.cardPile.insertBefore(x,ui.cardPile.firstChild);
					}
					"step 5"*/
					"step 2"
					player.draw(event.num);
					"step 3"
					if(player.getExpansions('xjzh_zxzh_cangjian').length==0){
						if(!player.isDisabled('equip1')) player.disableEquip('equip1');
					}
					"step 4"
					game.updateRoundNumber();
				},
			},
		},
	},
	"xjzh_zxzh_cangjian_use":{
		enable:"phaseUse",
		sub:true,
		usable:2,
		filter:function(event,player){
			return player.getExpansions('xjzh_zxzh_cangjian').length;
		},
		content:function(){
			"step 0"
			player.chooseCardButton("选择并装备一张武器牌",player.getExpansions('xjzh_zxzh_cangjian'));
			"step 1"
			if(result.bool){
				for(var i=0;i<result.links.length;i++){
					player.getExpansions('xjzh_zxzh_cangjian').removeArray(result.links[i]);
				}
				game.delayx();
				player.useCard(result.links[0],player);
			}
		},
		ai:{
			order:10,
			result:{
				player:function(player,target){
					var cards=player.getEquip(1);
					if(!cards) return;
					var num=0
					var cards2=player.getExpansions('xjzh_zxzh_cangjian');
					for(var i=0;i<cards2.length;i++){
						if(get.useful(cards2[i])>get.useful(cards)) num++
					}
					return num;
				},
			},
		},
	},
	'xjzh_zxzh_yangjian_off':{sub:true,},
	"xjzh_zxzh_yangjian":{
		enable:"phaseUse",
		mod:{
			ignoredHandcard:function(card,player,bool){
				if(card.hasGaintag('xjzh_zxzh_yangjian')) return true;
			},
			aiValue:function(player,card,num){
				if(card.hasGaintag('xjzh_zxzh_yangjian')) return 9.5;
			},
		},
		mark:true,
		marktext:"胎",
		intro:{
			mark:function (dialog,content,player){
				var num=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip1').length;
				return `剩余${get.cnNumber(num)}张武器牌`;
			},
			markcount:function (storage,player){
				var num=Array.from(ui.cardPile.childNodes).filter(card=>get.subtype(card)=='equip1').length;
				return num;
			},
		},
		prompt:function(event,player){
			return "〖养剑〗:弃置任意“剑胎”获得武器牌上的技能直到当前回合结束";
		},
		filterCard:function(card,player,target){
			return card.hasGaintag('xjzh_zxzh_yangjian');
		},
		filter:function(event,player){
			if(player.countCards("h",function(card){
				return card.hasGaintag('xjzh_zxzh_yangjian');
			})<=0) return false;
			return true;
		},
		group:["xjzh_zxzh_yangjian2"],
		selectCard:[1,Infinity],
		content:function(){
			"step 0"
			for(var i=0;i<cards.length;i++){
				var card=game.createCard(cards[i]);
				var skills=get.info(card).skills;
				skills=skills.slice(0);
				for(var j of skills){
					player.$gain2(card);
					player.addTempSkill(j);
				}
			}
			"step 1"
			player.addTempSkill("xjzh_zxzh_yangjian_off")
		},
	},
	"xjzh_zxzh_yangjian2":{
		trigger:{
			player:["phaseZhunbeiBegin","damageEnd"],
		},
		forced:true,
		filter:function(event,player){
			var list=[]
			for(var i=0;i<ui.cardPile.childNodes.length;i++){
				if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
					list.add(ui.cardPile.childNodes[i]);
				}
			}
			if(player.isDisabled(1)&&list.length>0) return true;
			return false;
		},
		content:function(){
			"step 0"
			event.num=0
			"step 1"
			var card=get.cardPile(function(card){
				return get.subtype(card)=='equip1';
			});
			if(card){
				player.gain(card,'gain2').gaintag.add('xjzh_zxzh_yangjian');
				game.log(player,'从牌堆获得了',card);
				event.num++
			}
			"step 2"
			if(event.num<2){
				var list=[]
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					if(get.subtype(ui.cardPile.childNodes[i])=='equip1'){
						list.add(ui.cardPile.childNodes[i]);
					}
				}
				if(list.length>0) event.goto(1);
			}
		},
	},
	"xjzh_zxzh_yujian":{
		mod:{
			aiValue:function(player,card,num){
				if(card.hasGaintag('xjzh_zxzh_yangjian')) return 10;
			},
		},
		enable:["chooseToUse","chooseToRespond"],
		group:["xjzh_zxzh_yujian2"],
		filter:function(event,player){
			if(player.hasSkill('xjzh_zxzh_yangjian_off')) return false;
			if(player.countCards("h",function(card){
				return card.hasGaintag('xjzh_zxzh_yangjian');
			})<=0) return false;
			for(var i of lib.inpile){
				if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
				var type=get.type(i);
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
				var list1=[], list1Tag;
				var list2=[], list2Tag;
				for(var i of lib.inpile){
					if(!lib.translate[i+'_info']) continue;
					if(i=='shan'||i=='wuxie'||i=='xjzh_card_lianqidan') continue;
					var type=get.type(i);
					if(type=='basic'){
						list1.push([type,'',i]);
						if(event.filterCard({name:i},player,event)) list1Tag=true;
						if(i=='sha'){
							for (var j of lib.inpile_nature) list1.push([type,'',i,j]);
						}
					}
					if(type=='trick'){
						list2.push([type,'',i]);
						if(event.filterCard({name:i},player,event)) list2Tag=true;
					}
				}
				var dialog=ui.create.dialog('hidden');
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
			filter:function(button,player){
				var evt=_status.event.getParent();
				return evt.filterCard({name:button.link[2],nature:button.link[3]},player,evt);
			},
			check:function(button){
				var player=_status.event.player;
				if(player.countCards("h",button.link[2],function(card){
					return card.hasGaintag('xjzh_zxzh_yangjian');
				})>0) return 0;
				if(button.link[2]=='wugu') return 0;
				var effect=player.getUseValue(button.link[2]);
				if(effect>0) return effect;
				return 0;
			},
			backup:function (links,player){
				return{
					filterCard:function(card){
						var pos=get.position(card);
						if(pos=='h'&&card.hasGaintag('xjzh_zxzh_yangjian')) return true;
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
			prompt:function (links, player) {
				return '将一张“剑胎”牌当作'+get.translation(links[0][2])+'使用或打出';
			},
		},
	},
	"xjzh_zxzh_yujian2":{
		enable:['chooseToUse','chooseToRespond'],
		prompt:function(){
			return '将1张“剑胎”当作无懈可击使用';
		},
		position:'hs',
		sub:true,
		check:function(card,event){
			if(_status.event.player.hp>1) return 0;
			return 7-get.value(card);
		},
		selectCard:1,
		viewAs:{name:'wuxie'},
		viewAsFilter:function(player){
			if(player.hasSkill('xjzh_zxzh_yangjian_off')) return false;
			return player.countCards("h",function(card){
				return card.hasGaintag('xjzh_zxzh_yangjian');
			})>0;
		},
		filterCard:function(card){
			var pos=get.position(card);
			if(pos=='h'&&card.hasGaintag('xjzh_zxzh_yangjian')) return true;
			return false;
		},
		precontent:function(){
			game.playAudio('card',sex,card.name);
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
							return get.nameList(current,"xjzh_wzry_duoliya")&&current.storage.xjzh_wzry_huange&&current.storage.xjzh_wzry_huange==player;
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
			return player.storage.xjzh_wzry_huange&&!event.numFixed&&!event.cancelled;
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
				player(card,player,target){
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
				player(card,player,target){
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
			if(name=="damageBegin1") return !event.numFixed&&!event.cancelled;
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
			if(player.getEquips(1)) return get.type(event.card)=="basic";
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
				return !event.cancelled&&!event.skiped;
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

	//暗黑破坏神
	"xjzh_diablo_hunhuo":{
		trigger:{
			global:["die","dying"],
		},
		forced:true,
		locked:true,
		fixed:true,
		unique:true,
		charlotte:true,
		superCharlotte:true,
		priority:3,
		firstDo:true,
		mark:true,
		notemp:true,
		forceDie:true,
		marktext:"死亡之书",
		intro:{
			name:"死亡之书",
			mark:function(dialog,storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return "没有灵魂";
				var str=list.slice(0,-2);
				var name=str.split('::');
				if(name.length){
					if(player.isUnderControl(true)){
						dialog.addSmall([name,'character']);
					}
					else{
						dialog.addText('共有'+get.cnNumber(name.length)+'个“灵魂”');
					}
				}
				else{
					return '没有灵魂';
				}
			},
			content:function(storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo")
				if(list==null) return "没有灵魂";
				var str=list.slice(0,-2);
				var name=str.split('::');
				return '共有'+get.cnNumber(name.length)+'个“灵魂”'
			},
			markcount:function(storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return 0;
				var str=list.slice(0,-2);
				var name=str.split('::');
				return name.length;
			},
		},
		derivation:["xjzh_diablo_haoling"],
		getSkillList:function(player){
			if(!player.hasSkill('xjzh_diablo_hunhuo')){
				player.removeAdditionalSkill('xjzh_diablo_hunhuo');
				return;
			}
			var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
			if(list==null) return;
			var str=list.slice(0,-2);
			var name=str.split('::');
			if(!name.length) return;
			var skills2=lib.skill.xjzh_diablo_hunhuo.derivation.slice(0);
			var list2=[]
			for(var i of name){
				if(lib.character[i]==undefined) continue;
				if(lib.character[i][3]){
					var skills=lib.character[i][3]
				}else{
					continue;
				}
				for(var j of skills){
					var info=get.info(j)
					var num=0
					if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.dutySkill){
						list2.push(j);
						num++
					}
					if(num>0) break;
				}
			}
			if(name.length>=2){
				for(var i=0;i<Math.floor(name.length/3);i++){
					list2.push(skills2[i]);
				}
			}
			if(list2.length) player.addAdditionalSkill('xjzh_diablo_hunhuo',list2);
		},
		removeStorage:function(player){
			var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
			if(list==null) return;
			var str=list.slice(0,-2);
			var name=str.split('::');
			if(!name.length) return;
			var characters=lib.characterPack['Beijijinqu']
			var bool=false;
			if(characters!=undefined){
				for(var i in characters){
					if(name.includes(i)) bool=true;
				}
			}
			if(bool==true){
				window.localStorage.removeItem("xjzh_diablo_hunhuo");
				alert('检测到你的死灵之书内存在非法武将，已为你重置存档，游戏即将重启');
				setTimeout(function(){
					game.reload();
				},3000);
			}
		},
		init:function(player){
			lib.skill.xjzh_diablo_hunhuo.removeStorage(player);
			lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
		},
		filter:function(event,player){
			if(event.player==player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return;
				var str=list.slice(0,-2);
				var name=str.split('::');
				if(!name.length) return false;
				return !name.includes(event.player);
			}
			if(event.source&&event.source==player&&event.player!=player&&event.player.isDead()){
				 return game.me==player;
			}
			return false;
		},
		group:["xjzh_diablo_hunhuo_use"],
		async content(event,trigger,player){
			if(trigger.source&&trigger.source==player&&trigger.player!=player&trigger.player.isDead()){

				var object2=[]
				var bool2=false;
				if(player.name) object2.push(player.name);
				if(player.name1) object2.push(player.name1);
				if(player.name2) object2.push(player.name2);
				for(var i of object2){
					if(i.indexOf("xjzh_diablo_lamasi")!=-1) bool2=true;
				}
				if(!bool2) return;
				if(window.localStorage){
					//获取阵亡角色武将名
					var name=trigger.player.name
					var characters=lib.characterPack['Beijijinqu']
					if(characters!=undefined){
						for(var i in characters){
							if(name==i) return;
						}
					}
					//读取已有存档
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list!=null){
						//alert("有");
						//检测存档内是否已包含当前武将名，若有则跳过
						if(list.indexOf(name)!=-1) return;
						list+=name+"::"
						obj=list
					}else{
						//alert("无");
						var str=""
						var obj=name+"::"
						str+=obj
						obj=str
					}
					//将数组转为字符串
					//var setData=JSON.stringify(obj);
					//将数据写入存档
					window.localStorage.setItem("xjzh_diablo_hunhuo",obj);
					game.log(player,"将"+get.translation(trigger.player)+"的灵魂收入了死亡之书");
					lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
				}else{
					alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
				}
				event.finish();
				return;
			}
			else if(trigger.player==player&&trigger.name!="die"){
				if(!window.localStorage){
					alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
					return;
				}
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return;
				var str=list.slice(0,-2);
				var name=str.split('::');
				player.chooseButton(true).set('ai',function(button){
					return Math.random();
				}).set('createDialog',['请选择一个灵魂与你交换身体',[name,'character']]);
			}
			"step 1"
			if(result.bool){
				var link=result.links[0]
				player.reinit(player.name,link,[player.maxHp,player.maxHp]);
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				var str=list.slice(0,-2);
				var name=str.split('::');
				name.remove(link);
				if(name.length){
					var setData=name.join("::");
					setData+="::"
					window.localStorage.setItem("xjzh_diablo_hunhuo",setData);
				}else{
					window.localStorage.removeItem("xjzh_diablo_hunhuo");
				}
				player.removeSkill("xjzh_diablo_hunhuo",true);
				lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
			}
		},
		ai:{
			notemp:true,
		},
		subSkill:{
			"use":{
				enable:"phaseUse",
				usable:1,
				sub:true,
				filter:function(event,player){
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list==null) return;
					var str=list.slice(0,-2);
					var name=str.split('::');
					if(!name.length) return false;
					return game.dead.length;
				},
				content:function(){
					"step 0"
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list==null) return;
					var str=list.slice(0,-2);
					var name=str.split('::');
					player.chooseButton(ui.create.dialog('〖魂火〗：请选择你将要唤醒的灵魂',[name,'character'],'hidden'),function(button){
						return get.rank(button.link,true);
					});
					"step 1"
					if(result.bool){
						var list=[];
						event.targets=result.links[0]
						for(var i=0;i<game.dead.length;i++){
							list.push(game.dead[i].name);
						}
						player.chooseButton(ui.create.dialog('〖魂火〗：请选择一副灵柩',[list,'character'],'hidden'),function(button){
							return 1;
						});
					}
					"step 2"
					if(result.bool&&result.links){
						for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
						event.dead=game.dead[i];
						event.dead.revive(event.targets.maxHp,false);
						var info=lib.character[event.targets]
						if(typeof info[2]=="string"){
							info[2]=Array.from(info[2])
							var hp=info[2][2]
						}else{
							var hp=info[2]
						}
						event.dead.reinit(event.dead.name,event.targets,[hp,hp]);
						event.dead.init(event.targets);
						event.dead.directgain(get.cards(2));
						var id=player.identity
						if(id=="zhu"){
							event.dead.identity="zhong";
							event.dead.setIdentity("zhong");
							event.dead.showIdentity();
						}else{
							event.dead.identity=id;
							event.dead.setIdentity(id);
							event.dead.showIdentity();
						}
						event.dead.addSkill("xjzh_diablo_hunhuo_shibao");
						event.dead.$zhaohuan();
						if(!player.storage.xjzh_diablo_hunhuo_use) player.storage.xjzh_diablo_hunhuo_use=[];
						player.storage.xjzh_diablo_hunhuo_use.push(event.dead);
						//game.log(player.storage.xjzh_diablo_hunhuo_use);
						game.log(player,"唤醒了"+get.translation(event.targets)+"的灵魂");
					}
				},
				ai:{
					order:8,
					expose:0.8,
					result:{
						player:1,
					},
				},
			},
			"shibao":{
				trigger:{
					player:"dieAfter",
					global:["phaseAfter",]
				},
				forceDie:true,
				direct:true,
				priority:-101,
				lastDo:true,
				sub:true,
				filter:function(event,player){
					if(event.name=="die"){
						var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
						if(list==null) return;
						var str=list.slice(0,-2);
						var name=str.split('::');
						return name.includes(player);
					}
					if(event.name=="phase"){
						var id=game.filterPlayer(function(current){
							return current.name=="xjzh_diablo_lamasi"||current.name1=="xjzh_diablo_lamasi"||current.name2=="xjzh_diablo_lamasi";
						}).shift().identity
						if(id=="zhu"){
							if(player.identity!="zhong") return true;
						}
						return player.identity!=id;
					}
					return false;
				},
				content:function(){
					var previous=player.getPrevious();
					var next=player.getNext();
					var list=[
						previous,
						next
					];
					for(var i of list){
						if(i.name=="xjzh_diablo_lamasi") continue;
						i.damage("nosource","nocard");
					}
					player.die()._triggered=null;
				},
			},
		},
	},
	"xjzh_diablo_haoling":{
		enable:"phaseUse",
		locked:true,
		charlotte:true,
		usable:1,
		prompt:"〖号令〗：选择一名被你唤醒且正面朝上的角色",
		check:function(event,player){
			return 1;
		},
		filterTarget:function(card,player,target){
			if(player.storage.xjzh_diablo_hunhuo_use) return player.storage.xjzh_diablo_hunhuo_use.includes(target);
			return false;
		},
		filter:function(event,player){
			return player.storage.xjzh_diablo_hunhuo_use&&player.storage.xjzh_diablo_hunhuo_use.length;
		},
		content:function(){
			target.turnOver(true);
			player.insertPhase();
		},
		ai:{
			order:8,
			result:{
				player:1,
				target:-0.5,
			},
		},
	},
	"xjzh_diablo_luanshe":{
		enable:"phaseUse",
		position:"h",
		usable:1,
		filter:function(event,player){
			if(!player.countCards('h',function(card){
				return get.tag(card,'damage');
			})) return false;
			return game.hasPlayer(function(current){
				return current.inRangeOf(player);
			});
		},
		filterCard:function(card,player,target){
			return get.tag(card,'damage');
		},
		seatNum:function(player,target){
			var obj={
				scale:0.9,
				x:[1,0.5],
				y:[1,0.25],
				height:null,
				width:null,
				angle:null,
				parent:player,
				follow:false,
			};
			var num=target.getState().position;
			switch(num){
				case 1:
					obj.scale=0.4;
					obj.angle=-88;
				break;
				case 2:
					obj.scale=0.52;
					obj.angle=-68;
				break;
				case 3:
					obj.scale=0.65;
					obj.angle=-48;
				break;
				case 4:
					obj.scale=0.75;
					obj.angle=-32;
				break;
				case 5:
					obj.scale=0.9;
					obj.angle=-26;
				break;
				case 6:
					obj.scale=1.12;
					obj.angle=-21;
				break;
				case 7:
					obj.scale=1.15;
					obj.angle=-15;
				break;
			};
			return obj;

		},
		contentBefore:function(){
			"step 0"
			player.chooseBool("〖乱射〗：是否装备【猎天弓】").set('ai',function(){
				return Math.random();
			});
			"step 1"
			if(result.bool){
				var card=game.createCard("xjzh_card_lietiangong");
				player.equip(card);
			}
		},
		content:function(){
			"step 0"
			event.num=0;
			"step 1"
			var targets=game.filterPlayer(function(current){
				return current.inRangeOf(player);
			});
			var num=get.rand(1,Math.min(3,targets.length));
			var targets=targets.slice(0).randomGets(num);
			event.targets=targets.slice(0);

			for(var target of event.targets){
				var obj=lib.skill.xjzh_diablo_luanshe.seatNum(player,target);
				game.xjzh_playEffect('xjzh_skillEffect_gongjian',player,obj);
			};
			player.useCard(cards[0],targets,false).set('addCount',false).set('oncard',function(card,player){
				var that=this;
				if(!that.baseDamage) that.baseDamage=1;
				if(targets.length>=3&&player.getCards('e',function(cardx){
					return card.name=="xjzh_card_lietiangong";
				})){
					that.baseDamage*=2;
				}
			}).set('targets',targets);
			"step 2"
			if(player.getStat('damage')){
				var history=player.getHistory('sourceDamage',function(evt){
					return evt.getParent('xjzh_diablo_luanshe').name=="xjzh_diablo_luanshe";
				});
				for(var i=0;i<history.length;i++){
					var target=history[i].player;
					target.changexjzhBUFF('mumang',1);
					history.splice(i,1);
				}
			}
			"step 3"
			if(event.targets){
				event.num++
				if(event.targets.length<3&&event.num==1){
					var card=player.getCards('e',function(cardx){
						return cardx.name=="xjzh_card_lietiangong";
					});
					if(card) player.discard(card)._triggered=null;
				}else{
					if(event.num==1) event.goto(1);
				}
			}
		},
		ai:{
			order:8,
			result:{
				player:function(player){
					var targets=game.filterPlayer(function(current){
						return player.inRange(current);
					});
					var num=0
					for(var name of targets){
						if(player.isFriendsOf(name)) num++
					}
					if(num>targets-num) return 0.2;
					return 1.5;
				},
			},
		},
	},
	"xjzh_diablo_jingshe":{
		trigger:{
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:-3,
		filter:function(event,player){
			if(event.getParent('xjzh_diablo_luanshe').name!="xjzh_diablo_luanshe") return false;
			return !event.cancelled||event.num>0
		},
		content:function(){
			"step 0"
			trigger.player.changexjzhBUFF('yishang',1);
			"step 1"
			if(get.xjzhBUFFNum(trigger.player,'yishang')>0) trigger.player.turnOver(true);
		},
	},
	"xjzh_diablo_guanzhu":{
		trigger:{
			player:"drawAfter",
		},
		frequent:true,
		group:["xjzh_diablo_guanzhu_use","xjzh_diablo_guanzhu_damage"],
		filter:function(event,player){
			if(player.countCards('h',function(card){
				return get.tag(card,'damage')&&!card.hasGaintag("xjzh_diablo_guanzhu");
			})&&player.countCards('h',function(card){
				return card.hasGaintag("xjzh_diablo_guanzhu");
			})<2) return true;
			return false;
		},
		mod:{
			cardUsable:function(card,player,num){
				if(!card.cards) return;
				if(card.name=="sha"||card.name=="jiu"){
					for(var i of card.cards){
						if(i.hasGaintag("xjzh_diablo_guanzhu")) return Infinity;
					}
				}
			},
		},
		content:function(){
			"step 0"
			var cards=player.getCards('h',function(card){
				return get.tag(card,'damage')&&!card.hasGaintag("xjzh_diablo_guanzhu");
			});
			var num=player.countCards('h',function(card){
				return card.hasGaintag("xjzh_diablo_guanzhu");
			});
			player.chooseCardButton(cards,[1,2-num],"〖灌注〗：请选择至多"+get.translation(2-num)+"张伤害卡牌令其获得灌注效果").set('ai',function(button){
				var player=_status.event.player;
				if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
				return 0;
			});
			"step 1"
			if(result.links){
				event.cards=result.links
			}else{
				event.finish();
			}
			"step 2"
			var dialog=ui.create.dialog('forcebutton','hidden','〖灌注〗：请选择一种灌注效果');
			var str='<div class="popup text" style="width:calc(100%-10px);display:inline-block">';
			str+='冰霜灌注：令你被灌注的牌造成冰属性伤害<br><br><br>';
			str+='火焰灌注：令你被灌注的牌造成火属性伤害</div>';
			dialog.add(str);
			var chooseList=['冰霜灌注','火焰灌注'];
			player.chooseControl(chooseList,'cancel2').set('ai',function(){
				return chooseList.randomGet();
			}).set('dialog',dialog);
			"step 3"
			if(result.control!='cancel2'){
				var cards=event.cards;
				player.addGaintag(cards,'xjzh_diablo_guanzhu');
				if(!player.storage.xjzh_diablo_guanzhu2) player.storage.xjzh_diablo_guanzhu2=cards.slice(0);
				player.storage.xjzh_diablo_guanzhu2.push(cards.slice(0));
				switch(result.control){
					case '冰霜灌注':
					player.storage.xjzh_diablo_guanzhu=1;
					break;
					case '火焰灌注':
					player.storage.xjzh_diablo_guanzhu=2;
					break;
				}
			}else{
				event.finish();
			}
		},
		subSkill:{
			"damage":{
				trigger:{
					source:"damageBegin",
				},
				direct:true,
				sub:true,
				filter:function(event,player){
					if(!event.cards||!event.cards.length) return false;
					if(!player.storage.xjzh_diablo_guanzhu) return false;
					if(!player.storage.xjzh_diablo_guanzhu2) return false;
					return player.storage.xjzh_diablo_guanzhu2.includes(event.cards[0]);
				},
				content:function(){
					"step 0"
					if(player.storage.xjzh_diablo_guanzhu==1){
						game.setNature(trigger,'ice',false)
					}else{
						game.setNature(trigger,'fire',false)
					}
					"step 1"
					switch(trigger.nature){
						case "ice":
						trigger.player.changexjzhBUFF('binghuan',1);
						break;
						case "fire":
						trigger.player.changexjzhBUFF('ranshao',1);
						break;
					}
					"step 2"
					if(player.storage.xjzh_diablo_guanzhu2.length){
						player.storage.xjzh_diablo_guanzhu2.remove(trigger.cards[0]);
					}else{
						delete player.storage.xjzh_diablo_guanzhu2;
					}
				},
			},
			"use":{
				trigger:{player:"useCardBefore"},
				forced:true,
				priority:-1,
				sub:true,
				filter:function(event,player){
					if(event.card.name=='sha'||event.card.name=="jiu"){
						if(event.cards[0].hasGaintag("xjzh_diablo_guanzhu")) return true;
					};
					return false;
				},
				content:function(){
					if(trigger.addCount!==false){
						trigger.addCount=false;
						var stat=player.getStat();
						if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
					};
				},
			},
		},
	},
	"xjzh_diablo_sushe":{
		trigger:{
			player:"useCard",
		},
		forced:true,
		locked:true,
		priority:3,
		init:function(player){
			player.storage.xjzh_diablo_sushe=false;
		},
		filter:function(event,player){
			return event.card.name=="sha";
		},
		content:function(){
			if(player.storage.xjzh_diablo_sushe==true){
				if(!trigger.baseDamage) trigger.baseDamage=1
				trigger.baseDamage*=2;
				player.storage.xjzh_diablo_sushe=false;
			}
			else{
				var num=get.rand(1,3);
				trigger.effectCount+=num;
				game.log(trigger.card,'额外结算'+num+'次');
				if(num==3) player.storage.xjzh_diablo_sushe=true;
			}
		},
	},
	"xjzh_diablo_yingbi":{
		enable:"phaseUse",
		usable:1,
		filter:function(event,player){
			return !player.isTurnedOver();
		},
		mod:{
			globalTo:function(from,to,distance){
				if(to.isTurnedOver()) return distance+1;
			}
		},
		content:function(){
			player.addTempSkill('xjzh_diablo_yingbi_turn',{player:'damageAfter'});
		},
		subSkill:{
			"turn":{
				sub:true,
				init:function(player){
					if(player.isIn()&&!player.isTurnedOver()) player.turnOver(true);
				},
				onremove:function(player,skill){
					if(player.isTurnedOver()) player.turnOver(false);
					if(!player.hasSkill("xjzh_diablo_yingbi_damage")) player.addSkill("xjzh_diablo_yingbi_damage");
				},
				ai:{
					maixie:true,
					maixie_hp:true,
				},
			},
			"damage":{
				trigger:{
					source:"damageAfter",
				},
				forced:true,
				sub:true,
				priority:6,
				filter:function(event,player){
					if(event.source==player&&event.player==player) return false;
					return !event.numFixed&&!event.cancelled;
				},
				mark:true,
				marktext:"隐",
				intro:{
					name:"隐蔽",
					content:"下一次造成伤害令目标获得一层易伤然后你摸两张牌",
				},
				content:function(){
					trigger.player.changexjzhBUFF('yishang',1);
					player.draw(2);
					player.removeSkill("xjzh_diablo_yingbi_damage");
				},
			},
		},
		ai:{
			order:0.1,
			result:{
				player:function(player,target){
					if(!player.hasFriend) return;
					return 1;
				},
			},
		},
	},
	"xjzh_diablo_jianyu":{
		enable:"phaseUse",
		round:2,
		skillAnimation:"epic",
		animationColor:"thunder",
		animationStr:"箭雨",
		group:"xjzh_diablo_jianyu_damage",
		content:function(){
			player.chooseUseTarget({name:'wanjian'},false);
		},
		subSkill:{
			"damage":{
				trigger:{
					source:"damageBegin",
				},
				direct:true,
				priority:10,
				sub:true,
				filter:function(event,player){
					return event.getParent('xjzh_diablo_jianyu').name=="xjzh_diablo_jianyu";
				},
				content:function(){
					game.setNature(trigger,"poison",false);
					if(Math.random()<=Math.random()) trigger.player.changexjzhBUFF('zhongdu',1);
				},
			},
		},
		ai:{
			order:6,
			result:{
				player:1,
			},
		},
	},
	"xjzh_diablo_lingshou":{
		trigger:{
			player:"phaseBefore",
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:10,
		mark:true,
		marktext:"贡",
		intro:{
			name:"德鲁伊灵体贡品",
			content:"#",
		},
		lingshouList:["xjzh_diablo_lang","xjzh_diablo_xiong"],
		async content(event,trigger,player){
			let names=get.nameList(player),arr=["xjzh_qishu_wuyan","xjzh_qishu_fenglangkx"],bool=false;
			for await(let name of names){
				if(arr.some(item=>game.xjzh_hasEquiped(item,name))){
					bool=true;
					break;
				};
			}
			if(bool==true) return;

			if(event.triggername=="damageAfter") player.addMark("xjzh_diablo_lingshou",get.rand(1,100));
			else{
				let list=lib.skill.xjzh_diablo_lingshou.lingshouList.slice(0),node,skills;

				if(player.name2&&player.name2=="xjzh_diablo_yafeikela") node=player.node.name2;
				else node=player.node.name;

				if(player.countMark("xjzh_diablo_lingshou")>=100){

					if(player.storage.xjzh_diablo_lingshou2) list.remove(player.storage.xjzh_diablo_lingshou2);

					let dialog=ui.create.dialog('〖灵兽〗：请选择所要变形的形态，取消变回人类',[list,"character"],'hidden');
					const links=await player.chooseButton(dialog).set('ai',()=>{
						return list.randomGet()
					}).forResultLinks();
					if(links){
						await player.removeMark("xjzh_diablo_lingshou",100,false);
						player.setAvatar('xjzh_diablo_yafeikela',links[0]);
						node.innerHTML=get.translation(links[0]);
						if(player.storage.xjzh_diablo_lingshou2){
							skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
							player.removeSkill(list,true);
						}
						player.storage.xjzh_diablo_lingshou2=links[0];
						let skills=lib.character[links[0]][3];
						player.addSkill(skills);
					}else{
						player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
						if(player.storage.xjzh_diablo_lingshou2){
							skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
							player.removeSkill(list,true);
						}
						node.innerHTML=get.translation("xjzh_diablo_yafeikela");
						delete player.storage.xjzh_diablo_lingshou2;
					}
				}else{
					player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
					if(player.storage.xjzh_diablo_lingshou2){
						skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
						player.removeSkill(list,true);
					}
					node.innerHTML=get.translation("xjzh_diablo_yafeikela");
					delete player.storage.xjzh_diablo_lingshou2;
				}
			}
		},
	},
	"xjzh_diablo_shilue":{
		enable:"phaseUse",
		init(player,skill){
			player.storage[skill]=false;
			//player.addMark("xjzh_diablo_lingshou",1520);
		},
		filter(event,player){
			if(get.xjzh_isMaxMp(player)) return false;
			return player.countMark("xjzh_diablo_lingshou")>0;
		},
		getshilue(player,num){
			player.removeMark("xjzh_diablo_lingshou",num);
			player.changexjzhMp(num);
			let numx=player.xjzhReduce;
			numx>0.3?numx-=0.3:numx=0;
			player.storage.xjzh_diablo_shilue=true;
		},
		group:"xjzh_diablo_shilue_round",
		async content(event,trigger,player){
			let num,num2=player.countMark("xjzh_diablo_lingshou");
			if(event.isMine()){
				// 创建输入框
				let node = ui.create.div();
				applyStylesToNode(node, 'input');
				node.contentEditable = true;
				node.innerText = `请输入有效的数字，至多${num2}`;
				node.addEventListener('input', (event) => {
					validateAndHandleInput(node, num2);
				});

				// 创建确定按钮
				let button = ui.create.div('.menubutton.highlight.large', '确定');
				applyStylesToNode(button, 'button');
				button.addEventListener('click', (e) => {
					handleButtonClick(node, num2);
				});

				// 将输入框和确定按钮添加到界面上
				ui.window.appendChild(node);
				ui.window.appendChild(button);

				// 选中输入框清空文字
				node.onfocus = () => {
					node.innerText = '';
				};

				node.onkeydown = (e) => {
					e.stopPropagation();
					if (e.keyCode == 13) button.click();
				};

				_status.imchoosing = true;
				game.pause();

				function applyStylesToNode(node, type) {
					switch (type) {
						case 'input':
							node.style.width = '400px';
							node.style.height = '30px';
							node.style.lineHeight = '30px';
							node.style.fontFamily = 'xinwei';
							node.style.fontSize = '30px';
							node.style.padding = '10px';
							node.style.left = 'calc(50% - 200px)';
							node.style.top = 'calc(50% - 20px)';
							node.style.whiteSpace = 'nowrap';
							node.style.webkitUserSelect = 'text';
							node.style.textAlign = 'center';
							break;
						case 'button':
							node.style.width = '70px';
							node.style.left = 'calc(50% - 35px)';
							node.style.top = 'calc(50% + 60px)';
							break;
					}
				}

				function validateAndHandleInput(node, num2) {
					const name = node.innerText.trim();
					if (/^\d+$/.test(name) && Number(name) <= num2) {
						// 正确的数字输入处理
					} else {
						node.innerText = `请输入有效的数字，至多${num2}`;
					}
				}

				function handleButtonClick(node, num2) {
					const name = node.innerText.trim();
					try {
						if (/^\d+$/.test(name) && Number(name) <= num2) {
							ui.window.removeChild(node);
							ui.window.removeChild(button);
							game.resume();
							num = Number(name);
							lib.skill[event.name].getshilue(player, num);
						} else {
							alert(getAlertMessage(name, num2));
						}
					} catch (error) {
						console.error("An error occurred:", error);
					} finally {
						node.innerText = `请输入有效的数字，至多${num2}`;
					}
				}

				function getAlertMessage(name, num2) {
					if (name.length == 0) {
						return `请先输入一个有效的数字`;
					} else if (!/^\d+$/.test(name)) {
						return `${name}不是一个有效的数字`;
					} else if (Number(name) > num2) {
						return `${Number(name)}超过${num2}，请重新输入`;
					}
				}
			}else{
				num=get.rand(1,player.countMark("xjzh_diablo_lingshou"));
				lib.skill[event.name].getshilue(player,num);
			}
		},
		subSkill:{
			"round":{
				trigger:{
					global:"roundStart",
				},
				direct:true,
				priority:10,
				sub:true,
				filter(event,player){
					if(game.roundNumber==0) return false;
					if(!player.storage.xjzh_diablo_shilue) return false;
					return true;
				},
				async content(event,trigger,player){
					player.storage.xjzh_diablo_shilue=false;
					player.xjzhReduce+=0.3;
				},
			},
		},
		ai:{
			order:0.2,
			result:{
				player:function(player,target){
					if(player.countMark("xjzh_diablo_lingshou")>100){
						if(player.xjzhMp<=player.xjzhmaxMp/2) return 10;
						return 0.5;
					}
					return 0.1;
				},
			},
		},
	},
	"xjzh_diablo_leibao":{
		enable:"phaseUse",
		level:1,
		powerDrain:45,
		xjzh_fengbaoSkill:true,
		filterTarget(card,player,target){
			return target!=player;
		},
		filter(event,player){
			let powerDrain=lib.skill.xjzh_diablo_leibao.powerDrain,num=player.xjzhReduce;
			return player.xjzhMp>=powerDrain*(1-num);
		},
		async content(event,trigger,player){
			let powerDrain=lib.skill.xjzh_diablo_leibao.powerDrain,num=player.xjzhReduce,level=lib.skill.xjzh_diablo_leibao.level;
			let num2=Math.round(powerDrain*(1-num));
			await player.changexjzhMp(-num2);
			game.xjzh_playEffect('xjzh_skillEffect_leiji',target);
			await target.damage(level,'nocard',player,'thunder');
			if(Math.random()<=0.35*(1+player.xjzhHuixin)){
				target.changexjzhBUFF('gandian',1);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(target)}获得一层感电`);
			}
		},
		ai:{
			order:12,
			expose:0.5,
			result:{
				target(target){
					return -lib.skill.xjzh_diablo_leibao.level;
				},
			},
		},
	},
	"xjzh_diablo_kuanghou":{
		enable:"phaseUse",
		level:1,
		usable:1,
		xjzh_langrenSkill:true,
		check(event,player){
			if(player.isDamaged()){
				if(player.xjzhMp<player.xjzhmaxMp) return 10;
				return 2;
			}
			return 0.5;
		},
		async content(event,trigger,player){
			let num=lib.skill.xjzh_diablo_leibao.level;
			player.recover(Math.floor(num/5));
			player.changexjzhMp(20);
			if(Math.random()<=0.05*(1+player.xjzhHuixin)){
				player.recoverTo(player.maxHp);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复体力至体力上限`);
			}
		},
		ai:{
			order:12,
			expose:0.5,
			result:{
				player(player){
					let num=lib.skill.xjzh_diablo_kuanghou.level;
					return num/5+player.getDamagedHp(true);
				},
			},
		},
	},
	"xjzh_diablo_zhongou":{
		trigger:{
			player:"useCardToPlayer",
		},
		mod:{
			selectTarget(card,player,range){
				let type=get.tag(card,'damage');
				if(!get.tag(card,'damage')) return
				range[1]=1;
			},
		},
		filter(event,player){
			return event.card&&get.tag(event.card,'damage');
		},
		level:1,
		powerDrain:35,
		forced:true,
		locked:false,
		xjzh_xiongrenSkill:true,
		async content(event,trigger,player){
			await player.addTempSkill('unequip','useCardAfter');
			event.qianggu=false;
			if(player.getStat('damage')){
				let num=Math.round(lib.skill.xjzh_diablo_zhongou.powerDrain*(1-player.xjzhReduce)),level=lib.skill.xjzh_diablo_zhongou.level;
				let qianggu=get.nameList(player).filter(name=>game.xjzh_hasEquiped("xjzh_qishu_wuyan",name)).length?true:false;
				if(player.xjzhMp>=num||qianggu==true){
					const {result:{bool}}=
					qianggu==true?{result:{bool:true}}:
					await player.chooseBool(`〖重欧〗：是否消耗${num}灵力获得${level}点护甲和强固点体力值`).set('ai',()=>{return 1});
					if(bool){
						player.changexjzhMp(qianggu==false?num:-num);
						player.changeHujia(level);
						player.changexjzhBUFF('qianggu',level);
					}
				}
				if(Math.random()<=0.25*(1+player.xjzhHuixin)){
					trigger.target.changexjzhBUFF('jiansu',1);
					game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层减速`);
				}
			}
		},
	},
	"xjzh_diablo_fensui":{
		trigger:{
			player:["useCard","phaseBefore"],
			source:"damageBegin",
		},
		forced:true,
		locked:true,
		xjzh_dadiSkill:true,
		level:1,
		priority:2,
		mark:true,
		marktext:"碎",
		intro:{
			name:"粉碎",
			content(storage,player){
				let num=player.countMark("xjzh_diablo_fensui");
				if(num==0||!num) return;
				if(num>=6) return "你下一次造成伤害必定暴击";
				return get.translation(num);
			},
		},
		filter:function(event,player,name){
			if(name=="phaseBefore") return true;
			if(name=="damageBegin") return player.countMark("xjzh_diablo_fensui")>=6;
			if(!event.cards||!event.cards.length) return false;
			if(["delay","equip"].includes(get.type(event.cards[0]))) return false;
			return player.isHealthy();
		},
		async content(event,trigger,player){
			if(event.triggername=="phaseBefore") player.addMark("xjzh_diablo_fensui",1,false);
			else if(event.triggername=="damageBegin"){
				trigger.num*=2;
				player.clearMark("xjzh_diablo_fensui",false);
				if(Math.random()<=0.5*(1+player.xjzhHuixin)){
					trigger.player.turnOver(true);
					game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}被眩晕`);
				}
			}else{
				trigger.effectCount++
				game.log(trigger.card,"额外结算一次");
			}
		},
	},
	"xjzh_diablo_duguan":{
		trigger:{
			source:"damageBegin",
		},
		filter(event,player){
			if(player.xjzhMp<25) return false;
			return true;
		},
		async content(event,trigger,player){
			if(!game.hasNature(trigger)||!game.hasNature(trigger,"poison")) game.setNature(trigger,"poison",false);
			let huixin=player.xjzhHuixin;
			if(get.xjzhBUFFNum(player,'zhongdu')>0) huixin+=0.5;
			if(Math.random()>0.33*(1+huixin)) player.changexjzhMp(-25);
			else game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，该技能不消耗魔力`);
			if(Math.random()<=0.25*(1+huixin)){
				trigger.player.changexjzhBUFF('zhongdu',1);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层中毒`);
			}
		},
	},
	"xjzh_diablo_xianjing":{
		enable:"phaseUse",
		usable:1,
		mark:true,
		marktext:"陷",
		intro:{
			name:"剧毒陷阱",
			mark(dialog,storage,player){
				if(!storage) return;
				if(player.isUnderControl(true)) dialog.addAuto([storage,'vcard']);
			},
		},
		init(player,skill){
			if(!player.storage[skill]) player.storage[skill]=[];
		},
		group:"xjzh_diablo_xianjing_gain",
		async content(event,trigger,player){
			let cards=Array.from(ui.cardPile.childNodes).filter(card=>!player.storage[event.name].includes(card));
			if(!cards.length) return;
			let card=cards.randomGets(Math.ceil(cards.length/100)),dialog=ui.create.dialog('hidden',[card,'vcard']);
			player.chooseControl('ok').set('dialog',dialog);
			player.storage[event.name].addArray(card);
			for await(let i of card){
				let num=get.rand(ui.cardPile.childElementCount);
				i.fix();
				ui.cardPile.insertBefore(i,ui.cardPile.childNodes[num]);
			}
			game.updateRoundNumber();
		},
		subSkill:{
			"gain":{
				trigger:{
					global:"gainAfter",
				},
				forced:true,
				priority:1,
				filter(event,player){
					let cards=event.cards.slice(0);
					return cards.some(item=>player.storage.xjzh_diablo_xianjing.includes(item));
				},
				async content(event,trigger,player){
					if(trigger.player!=player) trigger.player.changexjzhBUFF('zhongdu',get.xjzhBUFFInfo("zhongdu",'limit'));
					if(Math.random()<=0.3*(1+player.xjzhHuixin)){
						player.changexjzhMp(25);
						game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复25点魔力`);
					}
					let storage=player.storage.xjzh_diablo_xianjing,cards=trigger.cards.filter(card=>storage.includes(card));
					if(Math.random()<=0.2*(1+player.xjzhHuixin)){
						player.draw(2);
						player.gain(cards,'gain2',"log");
						game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}摸两张牌并获得了${get.translation(cards)}`);
					}
					storage.removeArray(cards);
				},
			},
		},
		ai:{
			order:12,
			result:{
				player:1,
			},
		},
	},
	"xjzh_diablo_baolu":{
		trigger:{
			source:"damageBegin1",
		},
		forced:true,
		priority:1,
		locked:true,
		filter(event,player){
			if(get.xjzhBUFFNum(event.player,"zhongdu")>0) return true;
			return false;
		},
		async content(event,trigger,player){
			game.setNature(trigger,'poison',false);
			trigger.num++;
			if(Math.random()<=0.25*(1+player.xjzhHuixin)){
				player.useSkill("xjzh_diablo_xianjing",player);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}发动了技能<span style="color: yellow;">〖${get.translation("xjzh_diablo_xianjing")}〗</span>`);
			}
		},
	},

	//地下城与勇士
	"xjzh_dnf_levelUp":{
		getSkillList:{
			2:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":["xjzh_dnf_shenghui"]
			},
			3:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			4:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			5:{
				"xjzh_dnf_jianshen":["xjzh_dnf_gedang"],
				"xjzh_dnf_shengqi":["xjzh_dnf_huanhe"]
			},
			6:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			7:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			8:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			9:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			10:{
				"xjzh_dnf_jianshen":["xjzh_dnf_ligui"],
				"xjzh_dnf_shengqi":["xjzh_dnf_kuaihe"]
			},
			11:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			12:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			13:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			14:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			15:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":["xjzh_dnf_tianyin"]
			},
			16:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			17:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			18:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":["xjzh_dnf_shouhu"]
			},
			19:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":[]
			},
			20:{
				"xjzh_dnf_jianshen":[],
				"xjzh_dnf_shengqi":["xjzh_dnf_zhufu"]
			},
		},
		mod:{
			maxHandcard:function(player,num){
				return num+Math.round(player.storage.xjzh_dnf_levelUp/3);
			},
			cardUsable:function(card,player,num){
				if(card.name=="sha"||card.name=="jiu" ) return num+Math.round(player.storage.xjzh_dnf_levelUp/5);
			},
		},
		direct:true,
		locked:true,
		charlotte:true,
		superCharlotte:true,
		fixed:true,
		priority:102,
		firstDo:true,
		xjzh_xinghunSkill:true,
		nogainsSkill:true,
		mark:true,
		marktext:"面",
		intro:{
			name:"面板",
			content:function(storage,player){
				var str=""
				if(player.storage.xjzh_dnf_levelUp) str+="<li>等级："+get.translation(player.storage.xjzh_dnf_levelUp)+"<br>";
				if(player.storage.xjzh_dnf_exp) str+="<li>经验："+get.translation(player.storage.xjzh_dnf_exp)+"<br>";
				var num=player.xjzhMp;
				var num2=player.xjzhmaxMp;
				if(player.xjzhMp>=0||player.xjzhmaxMp>=0) str+="<li>魔力："+num+"/"+num2+"<br>";
				if(player.storage.basexjzhMp) str+="<li>魔力回复：每回合"+player.storage.basexjzhMp+"点<br>";
				str+="<li>每3级手牌上限+1，每5级出牌次数+1、摸牌数量+1";
				return str;
			},
			markcount:function(storage,player){
				if(!player.storage.xjzh_dnf_levelUp) return "";
				return player.storage.xjzh_dnf_levelUp;
			},
		},
		defineMp:function(player){
			if(!player.storage.basexjzhMp) player.storage.basexjzhMp=2;
		},
		init:function(player){
			if(get.dnfCharacter(player)){
				var dnfnoplayer2time=setInterval(function(){
					if(player.name2) player.xjzh_removeFujiang();
				},500);
				if(!get.dnfCharacter(player)){
					clearInterval(dnfnoplayer2time);
					return;
				}
			}
			lib.skill.xjzh_dnf_levelUp.defineMp(player);
			var name=player.name
			if(!player.storage.xjzh_dnf_skills) player.storage.xjzh_dnf_skills=[]
			if(window.localStorage.getItem(name)==null){
				if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=1
				if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=0
			}else{
				var localStorage=window.localStorage
				var data=localStorage.getItem(name);
				var data=JSON.parse(data)
				if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=data.levelUp
				if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=data.exp
				for(var i of data.skill){
					if(i=="xjzh_dnf_levelUp") continue;
					player.addSkillLog(i);
				}
				var es=[];
				if(data.equip.length){
					for(var i=0;i<data.equip.length;i++){
						var card=game.createCard(data.equip[i]);
						es.push(card);
					}
				}
				if(es.length) player.directequip(es);
			}
		},
		trigger:{
			player:["useCardAfter"],
			source:["damageAfter"],
		},
		filter:function(event,player){
			if(player.storage.xjzh_dnf_levelUp){
				if(player.storage.xjzh_dnf_levelUp>=20) return false;
			}
			return true;
		},
		group:["xjzh_dnf_levelUp_draw","xjzh_dnf_levelUp_gainMp"],
		content:function(){
			"step 0"
			if(!player.storage.xjzh_dnf_levelUp) player.storage.xjzh_dnf_levelUp=1
			if(!player.storage.xjzh_dnf_exp) player.storage.xjzh_dnf_exp=0
			var num=player.storage.xjzh_dnf_levelUp
			 if(num>=20){
				 levelUp=true;
				 event.goto(2);
			 }
			var num2=player.storage.xjzh_dnf_exp
			levelUp=false;
			if(num2>=3+num){
				player.storage.xjzh_dnf_levelUp+=1
				player.storage.xjzh_dnf_exp=0
				player.$fullscreenpop('升级了','thunder');
				levelUp=true;
			}
			else{
				player.storage.xjzh_dnf_exp++
			}
			if(levelUp){
				var name=player.name
				var num=player.storage.xjzh_dnf_levelUp
				var list=lib.skill.xjzh_dnf_levelUp.getSkillList[num][name]
				if(list.length<=0){
					event.goto(2);
					return;
				}
				if(event.isMine){
					var dialog=ui.create.dialog('forcebutton');
					dialog.add('请选择获得一项技能');
					for(i=0;i<list.length;i++){
						if(lib.translate[list[i]+'_info']){
							var translation=get.translation(list[i]);
							if(translation[0]=='新'&&translation.length==3){
								translation=translation.slice(1,3);
							}
							else{
								translation=translation.slice(0,2);
							}
							var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
							item.firstChild.link=list[i];
						}
					}
				}
				var bool=false;
				var level=player.storage.xjzh_dnf_levelUp
				if(player.name=="xjzh_dnf_shengqi"){
					if(level==5||level==15) bool=true;
				}
				if(bool) list.push("cancel2");
				player.chooseControl(list).set('ai',function(){
					return get.max(list,get.skillRank,'item');
				}).set('dialog',dialog);
			}
			"step 1"
			if(result.control){
				if(result.control=="cancel2") event.goto(2);
				player.addSkillLog(result.control);
				if(!player.storage.xjzh_dnf_skills) player.storage.xjzh_dnf_skills=[]
				player.storage.xjzh_dnf_skills.push(result.control);
			}
			"step 2"
			if(levelUp){
				game.log("存档已记录");
				var name=player.name
				var num=player.storage.xjzh_dnf_levelUp
				var num2=player.storage.xjzh_dnf_exp
				var list=[]
				for(var i of player.skills){
					var info=get.info(i);
					if(i=="xjzh_dnf_levelUp") continue;
					if(!lib.translate[i]||!lib.translate[i+"_info"]||info.sub||!player.storage.xjzh_dnf_skills.includes(i)) continue;
					list.push(i);
				}
				var localStorage=window.localStorage
				var data={
					"levelUp":num,
					"exp":num2,
					"skill":list,
					"equip":player.getCards("e")
				}
				var data=JSON.stringify(data);
				localStorage.setItem(name,data);
			}
			"step 3"
			player.update();
			player.updateMarks();
		},
		subSkill:{
			"draw":{
				trigger:{
					player:"phaseDrawBegin",
				},
				direct:true,
				priority:10,
				sub:true,
				filter:function(event,player){
					return player.storage.xjzh_dnf_levelUp>0;
				},
				content:function(){
					var num=Math.round(player.storage.xjzh_dnf_levelUp/5);
					trigger.num+=num
				},
			},
			"gainMp":{
				trigger:{
					player:"phaseJieshuBegin",
				},
				forced:true,
				priority:900,
				sub:true,
				filter:function(event,player){
					if(!get.dnfCharacter(player)) return false;
					if(!player.storage.xjzhMp) return false;
					return player.xjzhMp<player.xjzhmaxMp;
				},
				content:function(){
					var num=player.storage.basexjzhMp
					if(player.hasSkill('xjzh_dnf_shenghui')) num+=2
					player.changexjzhMp(num);
				},
			},
		},
	},
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
	"xjzh_dnf_ligui":{
		trigger:{
			source:"damageBegin",
		},
		forced:true,
		priority:2,
		filter:function(event,player){
			return event.card.name=="sha";
		},
		content:function(){
			if(Math.random()) trigger.player.changexjzhBUFF('gandian',1);
			if(get.xjzhBUFFNum(player,'gandian')>0){
				if(Math.random()<=0.5) trigger.player.damage(player,1,"thunder");
			}
		},
	},
	"xjzh_dnf_gedang":{
		trigger:{
			player:"damageBegin",
		},
		forced:true,
		priority:15,
		content:function(){
			if(game.hasNature(trigger)){
				if(Math.random()<=0.4) trigger.changeToZero();
			}else{
				if(Math.random()<=0.15) trigger.changeToZero();
			}
		},
		ai:{
			effect:{
				target:function (card,player,target,current){
					if(!target.hasFriend()) return;
					if(get.tag(card,'damage')) return [0.4,0.5];
				},
			},
		},
	},
	"xjzh_dnf_huanhe":{
		enable:"phaseUse",
		filter:function(event,player){
			if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
			return player.xjzhMp>=20;
		},
		filterTarget:function(card,player,target){
			if(target.hp>=target.maxHp) return false;
			return true;
		},
		content:function(){
			target.recover();
			player.changexjzhMp(-20);
		},
		ai:{
			order:9,
			threaten:2,
			result:{
				target:function(player,target){
					if(target.hp==1) return 5;
					if(player==target&&player.xjzhMp>=40) return 5;
					return 2;
				},
			},
		},
	},
	"xjzh_dnf_kuaihe":{
		enable:"phaseUse",
		init:function(player){
			if(player.hasSkill("xjzh_dnf_huanhe")) player.removeSkill("xjzh_dnf_huanhe");
			if(player.storage.xjzh_dnf_skills.includes("xjzh_dnf_huanhe")) player.storage.xjzh_dnf_skills.remove("xjzh_dnf_huanhe");
		},
		filter:function(event,player){
			if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
			return player.xjzhMp>=30;
		},
		filterTarget:function(card,player,target){
			if(target.hp>=target.maxHp) return false;
			return true;
		},
		content:function(){
			target.chooseDrawRecover(2);
			player.changexjzhMp(-30);
		},
		ai:{
			order:9,
			threaten:2,
			result:{
				target:function(player,target){
					if(target.hp==1) return 5;
					if(player==target&&player.xjzhMp>=50) return 5;
					return 2;
				},
			},
		},
	},
	"xjzh_dnf_tianyin":{
		enable:"phaseUse",
		init:function(player){
			if(player.hasSkill("xjzh_dnf_kuaihe")) player.removeSkill("xjzh_dnf_kuaihe");
			if(player.storage.xjzh_dnf_skills.includes("xjzh_dnf_kuaihe")) player.storage.xjzh_dnf_skills.remove("xjzh_dnf_kuaihe");
		},
		filter:function(event,player){
			if(!game.hasPlayer(function(current){return current.isDamaged()})) return false;
			return player.xjzhMp>=50;
		},
		filterTarget:function(card,player,target){
			if(target.hp>=target.maxHp) return false;
			return true;
		},
		content:function(){
			target.gainMaxHp();
			target.chooseDrawRecover(2);
			player.changexjzhMp(-50);
		},
		ai:{
			order:9,
			threaten:2,
			result:{
				target:function(player,target){
					if(target.hp==1) return 5;
					if(player==target&&player.xjzhMp>=80) return 5;
					return 2;
				},
			},
		},
	},
	"xjzh_dnf_shenghui":{
		init:function(player){
			if(!player.storage.basexjzhMp) player.storage.basexjzhMp=2
			player.storage.basexjzhMp+=2
		},
	},
	"xjzh_dnf_zhufu":{
		trigger:{
			global:"damageBegin1",
		},
		check:function(event,player){
			var att=get.attitude(player,event.player);
			var hs=player.countCards("h",{subtype:"basic"});
			var hs2=player.countCards("h",{name:"tao"});
			var hs3=player.countCards("h",{name:"shan"});
			if(att<=0){
				if(hs>0){
					if(hs3==1&&hs2==0) return 0;
					if(hs3==0&&hs2==1) return 0;
					return 1;
				}
			}
			return 0.5;
		},
		filter:function(event,player){
			if(player.xjzhMp<30) return false;
			if(player.countCards("h",{subtype:"basic"})<=0) return false;
			return event.notLink();
		},
		content:function(){
			trigger.num++;
			player.changexjzhMp(-30);
		},
		ai:{
			damageBonus:true,
		},
	},
	"xjzh_dnf_shouhu":{
		trigger:{
			player:"changexjzhMp",
		},
		check:function(event,player){
			if(player.hasFriend()) return 1;
			return 0;
		},
		enable:"phaseUse",
		filter:function(event,player){
			if(player.xjzhMp<30) return false;
			if(event.getParent("xjzh_dnf_shouhu").name=="xjzh_dnf_shouhu") return false;
			return true;
		},
		content:function(){
			"step 0"
			player.chooseTarget('〖圣光守护〗：令一名武将获得其体力上限一半的护甲').set('ai',function(target){
				return get.attitude(player,target)>0;
			});
			"step 1"
			if(result.bool){
				var target=result.targets[0]
				var num=Math.floor(target.maxHp/2);
				target.changeHujia(num);
				player.changexjzhMp(-30);
			}
		},
		ai:{
			order:function(event,player){
				var num=player.xjzhMp;
				if(num<30) return 0;
				return Math.round(num/6);
			},
			result:{
				target:function(target){
					var num=player.xjzhMp;
					if(num<30) return 0;
					return Math.round(num/30);
				},
			},
		},
	},
	"xjzh_dnf_jianshenx":{
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
				i.addSkill('xjzh_dnf_jianshenx_nouse');
			}
		},
		group:["xjzh_dnf_jianshenx_use"],
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
				player.useSkill("xjzh_dnf_jianshenx",player);
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
			return !event.numFixed&&!event.cancelled
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
				if(!get.nameList(player,'xjzh_xyj_sunwukong')) return;
				let cards=["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_huoyundao","xjzh_card_dingshenzhou","xjzh_card_zhaoyaojing"];
				if(cards.includes(card.name)) return true;
			},
			aiValue(player,card,num){
				if(!player.hasSkill("xjzh_xyj_ruyi")) return;
				if(!get.nameList(player,'xjzh_xyj_sunwukong')) return;
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

export default skills;