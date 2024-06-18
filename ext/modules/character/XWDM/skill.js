import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
const skills={
	"xjzh_huoying_fenshen":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:1",
		filterTarget(card,player,target){
			return player.canCompare(target);
		},
		init(player){
			if(!player.storage.xjzh_huoying_fenshen) player.storage.xjzh_huoying_fenshen=1
		},
		selectTarget(){
			let player=get.player();
			let num=player.storage.xjzh_huoying_fenshen
			return [1,num];
		},
		filter(event,player){
			return player.countCards('h')&&!player.hasSkill('xjzh_huoying_fenshen_off');
		},
		multitarget:true,
		multiline:true,
		async content(event,trigger,player){
			player.chooseToCompare(event.targets).callback=()=>{
				if(event.num1>event.num2){
					if(player.storage.xjzh_huoying_fenshen<3) player.storage.xjzh_huoying_fenshen+=1
					player.chooseDrawRecover(1,1,true,"〖分身〗：请选择摸两张牌或回复一点体力");
					let evt=event.getParent("phase");
					if(evt&&evt.getParent&&!evt.xjzh_huoying_fenshen) evt.xjzh_huoying_fenshen=true;
				}else{
					player.addTempSkill("xjzh_huoying_fenshen_off");
				}
			};
		},
		contentAfter(){
			let evt=event.getParent("phase");
			if(evt&&evt.getParent&&evt.xjzh_huoying_fenshen){
				var next=game.createEvent('xjzh_huoying_fenshen_delete',false,evt.getParent());
				next.player=player;
				next.setContent(function(){
					if(player.storage.xjzh_huoying_fenshen){
						player.storage.xjzh_huoying_fenshen=1;
					}
				});
			}
		},
		ai:{
			order:7,
			result:{
				target(player,target){
					var hs=player.getCards('h');
					for(var i=0;i<hs.length;i++){
						if(get.value(hs[i])<=6){
							if(get.number(hs[i])>=11) return -1;
						}
					}
					return -0.2;
				},
				player(card,player,target){
					var hs=player.getCards('h');
					for(var i=0;i<hs.length;i++){
						if(get.value(hs[i])<=6){
							if(get.number(hs[i])>=11) return 1;
						}
					}
					return 0.5;
				},
			},
		},
		subSkill:{"off":{sub:true,},},
	},
	"xjzh_huoying_luoxuan":{
		enable:"phaseUse",
		usable:1,
		audio:"ext:仙家之魂/audio/skill:1",
		filter:function (card,player){
			return player.countCards('he')>0;
		},
		chooseButton:{
			dialog:function(){
				var list=['taoyuan','wugu','juedou','huogong','jiedao','tiesuo','guohe','shunshou','wuzhong','wanjian','nanman'];
				for(var i=0;i<list.length;i++){
					list[i]=['锦囊','',list[i]];
				}
				return ui.create.dialog(get.translation('xjzh_huoying_luoxuan'),[list,'vcard']);
			},
			filter:function(button,player){
				return lib.filter.filterCard({name:button.link[2]},player,_status.event.getParent());
			},
			check:function(button){
				var player=_status.event.player;
				var recover=0,lose=1,players=game.filterPlayer();
				for(var i=0;i<players.length;i++){
					if(players[i].hp==1&&get.damageEffect(players[i],player,player)>0&&!players[i].hasSha()){
						return (button.link[2]=='juedou')?2:-1;
					}
					if(!players[i].isOut()){
						if(players[i].hp<players[i].maxHp){
							if(get.attitude(player,players[i])>0){
								if(players[i].hp<2){
									lose--;
									recover+=0.5;
								}
								lose--;
								recover++;
							}
							else if(get.attitude(player,players[i])<0){
								if(players[i].hp<2){
									lose++;
									recover-=0.5;
								}
								lose++;
								recover--;
							}
						}
						else{
							if(get.attitude(player,players[i])>0){
								lose--;
							}
							else if(get.attitude(player,players[i])<0){
								lose++;
							}
						}
					}
				}
				if(lose>recover&&lose>0) return (button.link[2]=='nanman')?1:-1;
				if(lose<recover&&recover>0) return (button.link[2]=='taoyuan')?1:-1;
				return (button.link[2]=='wuzhong')?1:-1;
			},
			backup:function(links,player){
				return {
					filterCard:true,
					position:'he',
					selectCard:1,
					popname:true,
					audio:"xjzh_huoying_luoxuan",
					viewAs:{name:links[0][2]},
					precontent:function(){
						var chat=['这招是我自创的忍术——螺旋手里剑','有话直说，这就是我的忍道'].randomGet();
						player.say(chat);
					}
				}
			},
			prompt:function(links,player){
				return '将一张牌当作'+get.translation(links[0][2])+'使用';
			}
		},
		ai:{
			order:6,
			result:{
				player:function(player){
					var num=0;
					var cards=player.getCards('h');
					for(var i=0;i<cards.length;i++){
						num+=Math.max(0,get.value(cards[i],player,'raw'));
					}
					num/=cards.length;
					num*=Math.min(cards.length,player.hp);
					return 12-num;
				}
			},
			threaten:1.6,
		}
	},
	/*"xjzh_huoying_xianshu":{
		trigger:{
			player:"loseEnd",
		},
		locked:true,
		frequent:true,
		init:function(player){
			if(!player.hasMark("xjzh_huoying_xianshu")){
				player.addMark('xjzh_huoying_xianshu',3,false);
				game.log(player,'获得了3个','#y仙术查克拉');
			}
			var xjzh_huoying_xianshu=setInterval(function(){
				if(player.countMark("xjzh_huoying_xianshu")<3){
					player.addMark('xjzh_huoying_xianshu',1,false);
					game.log(player,'获得了1个','#y仙术查克拉');
				}else{
					clearInterval(xjzh_huoying_xianshu);
					lib.skill.xjzh_huoying_xianshu.init(player);
				}
			},18000);
			var xjzh_huoying_xianshuClear=setInterval(function(){
				if(player.hasSkill("xjzh_huoying_dunshu")){
					clearInterval(xjzh_huoying_xianshu);
					clearInterval(xjzh_huoying_xianshuClear);
				}
			},1);
		},
		mark:true,
		marktext:"仙术",
		intro:{
			name:"仙术查克拉",
			content:"鸣人以影分身存储的仙术查克拉，目前有#个",
		},
		audio:"ext:仙家之魂/audio/skill:1",
		filter:function(event,player){
			if(!player.hasMark('xjzh_huoying_xianshu')) return false;
			if(player.countCards('h')) return false;
			for(var i=0;i<event.cards.length;i++){
				if(event.cards[i].original=='h') return true;
			}
			return false;
		},
		content:function(){
			player.removeMark('xjzh_huoying_xianshu',1,false);
			game.log(player,'消耗了1个','#y仙术查克拉');
			player.drawTo(player.maxHp);
		},
		ai:{
			threaten:0.8,
			effect:{
				target:function (card,player,target){
					if(target.countCards('h')==1&&(card.name=='guohe'||card.name=='shunshou')) return -player.maxHp;
				},
			},
			noh:true,
		},
	},*/
	"xjzh_huoying_zuidun":{
		trigger:{
			global:"dying",
		},
		frequent:false,
		locked:true,
		mark:true,
		marktext:"嘴",
		intro:{
			name:"嘴遁",
			content(storage,player){
				let num=player.countMark("xjzh_huoying_zuidun");
				return `已发动${num}次`;
			},
		},
		mode:["identity","guozhan"],
		unique:true,
		filter(event,player){
			return player.countMark("xjzh_huoying_zuidun")<2&&player!=game.zhu&&event.player!=game.zhu&&event.player!=player;
		},
		prompt(event,player){
			return `嘴遁：是否令${get.translation(event.player)}改变${get.mode()=="guozhan"?"势力":"身份"}与你一致？`;
		},
		async content(event,trigger,player){
			player.logSkill('xjzh_huoying_zuidun',trigger.player);
			player.addMark("xjzh_huoying_zuidun",1,false);
			let list=[
				[1,`选项一：将所有牌交给漩涡鸣人，然后立即阵亡`],
				[2,`选项二：改变${get.mode()=="guozhan"?"势力":"身份"}与漩涡鸣人一致`]
			];
			const links=await trigger.player.chooseButton([`嘴遁：请选择一项`,[list,'textbutton']],true).set("ai",button=>{
				let id=player.identity,num=game.countPlayer(current=>current.identity==id),link=button.link;
				if(id==event.player.identity) return link==2;
				if(num+1>game.players.length-num) return link==2;
				return link==[1,2].randomGet();
			}).forResultLinks();
			if(links){
				switch(links[0]){
					case 1:{
						player.gain(trigger.player.getCards('hej'),'give',trigger.player);
						trigger.player.die().source=trigger.getParent().source;
						break;
					};
					case 2:{
						let id=player.identity;
						trigger.player.identity=id;
						trigger.player.setIdentity(id);
						trigger.player.identityShown=true;
						break;
					};
				}
			}
			if(trigger.player.isAlive()){
				trigger.player.loseMaxHp();
				await trigger.player.recoverTo(trigger.player.maxHp);
				trigger.player.draw(trigger.player.getHp(true));
				player.draw(trigger.player.getHp(true));
			}
			if(player.countMark("xjzh_huoying_zuidun")>=2) player.removeSkill("xjzh_huoying_zuidun",true);
		},
	},
	"xjzh_huoying_kaigua":{
		trigger:{
			player:"dying",
		},
		forced:true,
		locked:true,
		unique:true,
		mark:true,
		marktext:"挂",
		intro:{
			name:"开挂",
			content:"limited",
		},
		limited:true,
		skillAnimation:true,
		animationStr:'六道模式',
		animationColor:'fire',
		juexingji:true,
		priority:1,
		derivation:["xjzh_huoying_luoxuan","xjzh_huoying_dunshu","xjzh_huoying_liudaofenshen"],
		async content(event,trigger,player){
			player.maxHp=3;
			player.update();
			player.recoverTo(3);
			player.discard(player.getCards('j'));
			player.link(false);
			player.turnOver(false);
			let skills=[["xjzh_huoying_luoxuan","xjzh_huoying_dunshu","xjzh_huoying_liudaofenshen"],["xjzh_huoying_fenshen","xjzh_huoying_zuidun","xjzh_huoying_kaigua"]];
			player.changeSkills(skills[0],skills[1]);
			game.delay(2);
			let node,node2
			//觉醒时换头像
			if(player.name2&&player.name2=='xjzh_huoying_liudaomingren'){
				node=player.node.avatar2;
				node2=player.node.name2;
			}else{
				node=player.node.avatar;
				node2=player.node.name;
			}
			node2.innerHTML=get.slimName('xjzh_huoying_liudaomingren');
			game.broadcastAll((node)=>{
				node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
			},node);
			game.log(player,'使用了自己的外挂');
			game.log(player,'进入了六道模式');
			player.update();
			game.delay(2);
		},
	},
	"xjzh_huoying_dunshu":{
		locked:true,
		mod:{
			judge(player,result){
				if(_status.event.type=='phase'){
					if(result.bool==false){
						result.bool=null;
					}
					else{
						result.bool=false;
					}
				}
			},
			cardUsable(card,player,num){
				if( _status.currentPhase!=player) return num;
				return Infinity;
			},
		},
		group:["xjzh_huoying_dunshu_yang","xjzh_huoying_dunshu_ying","xjzh_huoying_dunshu_huihe","xjzh_huoying_dunshu_fumian"],
		subSkill:{
			"yang":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					player:["damageBegin","loseHpBegin"],
				},
				forced:true,
				sub:true,
				filter(event,player){
					return _status.currentPhase!=player;
				},
				async content(event,trigger,player){
					player.draw(trigger.num);
					if(game.countPlayer(current=>current.isDamaged())){
						const targets=await player.chooseTarget(`阳遁术：选择一名角色，令其回复一点体力`,trigger.num>1?[1,Math.min(trigger.num,game.countPlayer(current=>current.isDamaged()))]:1,(card,player,target)=>{
							return target.isDamaged();
						}).set("ai",target=>{
							return get.attitude(player,target);
						}).forResultTargets();
						if(targets){
							targets.map(target=>{
								target.recover();
							});
						}
					}
					trigger.changeToZero();
				},
				ai:{
					nodamage:true,
					effect:{
						target(card,player,target,current){
							if(get.tag(card,'damage')||get.tag(card,'loseHp')) return 'zeroplayertarget';
						}
					},
				},
			},
			"ying":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					source:"damageBegin1",
				},
				forced:true,
				sub:true,
				filter(event,player){
					return _status.currentPhase==player;
				},
				async content(event,trigger,player){
					let history=player.getHistory("sourceDamage");
					if(history.length) trigger.num+=history.length;
				},
			},
			"fumian":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					player:["turnOver","linkBefore"],
				},
				forced:true,
				sub:true,
				async content(event,trigger,player){
					player.turnOver(false);
					player.link(false);
				},
				ai:{
					noturn:true,
					nolink:true,
				},
			},
			"huihe":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
					player:"phaseBefore",
				},
				forced:true,
				sub:true,
				async content(event,trigger,player){
					game.countPlayer(current=>{
						current.addTempSkill("baiban");
					});
				},
			},

		},
	},
	//《金庸群侠传·项少龙·穿越》
	"xjzh_huoying_liudaofenshen":{
		trigger:{
			player:"phaseJieshuEnd",
		},
		locked:true,
		filter:function(event,player){
			return !player.storage.xjzh_huoying_liudaofenshen;
		},
		group:"xjzh_huoying_liudaofenshen2",
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
		content:function (){
			'step 0'
			player.loseHp();
			player.storage.xjzh_huoying_liudaofenshen=true;
			var storage=[];
			storage.push(lib.skill.xjzh_huoying_liudaofenshen.getinfo(player));
			player.storage.xjzh_huoying_liudaofenshen1=storage;
			"step 1"
			player.maxHp=3;
			player.hp=3;
			player.lose(player.getCards("hej"))._triggered=null;
			player.directgain(get.cards(3));
			player.addSkill("xjzh_tongyong_baiban");
			let skills=[
				"xjzh_huoying_luoxuan",
			]
			player.storage['xjzh_tongyong_baiban'].addArray(skills);
			player.update();
			'step 2'
			setTimeout(()=>{
				let node,node2
				//觉醒时换头像
				if(player.name2&&player.name2=='xjzh_huoying_liudaomingren'){
					node=player.node.avatar2;
					node2=player.node.name2;
				}else{
					node=player.node.avatar;
					node2=player.node.name;
				}
				node2.innerHTML=get.slimName('xjzh_huoying_liudaomingrenfs');
				game.broadcastAll((node)=>{
					node.setBackgroundImage('extension/仙家之魂/skin/min/六道鸣人·分身.jpg');
				},node);
			},100);
		},
	},
	"xjzh_huoying_liudaofenshen2":{
		trigger:{
			player:["dieBegin","phaseZhunbeiBegin"],
		},
		forceDie:true,
		forced:true,
		filter:function(event,player){
			return player.storage.xjzh_huoying_liudaofenshen;
		},
		content:function(){
			"step 0"
			if(trigger.name=="die") trigger.cancel();
			"step 1"
			setTimeout(()=>{
				let node,node2
				//觉醒时换头像
				if(player.name2&&player.name2=='xjzh_huoying_liudaomingren'){
					node=player.node.avatar2;
					node2=player.node.name2;
				}else{
					node=player.node.avatar;
					node2=player.node.name;
				}
				node2.innerHTML=get.slimName('xjzh_huoying_liudaomingren');
				game.broadcastAll((node)=>{
					node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
				},node);
			},100);
			'step 2'
			event.storage=player.storage.xjzh_huoying_liudaofenshen1.slice(0);
			event.doing=event.storage.shift();
			'step 3'
			player.maxHp=event.doing.maxHp;
			player.hp=event.doing.hp;
			var hs=player.getCards('ej');
			if(hs.length) player.lose(hs,ui.special)._triggered=null;
			'step 4'
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
			'step 5'
			var isDisabled=event.doing.isDisabled;
			for(var i=0; i<isDisabled.length; i++){
				if(isDisabled[i]==false&&player.isDisabled(i+1)) player.enableEquip(i+1)._triggered=null;
				if(isDisabled[i]==true&&!player.isDisabled(i+1)) player.disableEquip(i+1)._triggered=null;
			}
			'step 6'
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
			player.update();
			"step 7"
			player.storage.xjzh_huoying_liudaofenshen=false;
			delete player.storage['xjzh_tongyong_baiban']
			player.removeSkill("xjzh_tongyong_baiban");
		},
	},
	"xjzh_huoying_qiling":{
		trigger:{
			source:"damageBefore",
		},
		audio:"ext:仙家之魂/audio/skill:1",
		filter(event,player){
			if(!event.cards||!event.cards.length) return false;
			if(get.suit(event.cards[0])=="none") return false;
			return true;
		},
		forced:true,
		locked:true,
		priority:6,
		marktext:"麒",
		intro:{
			name:"麒麟",
			content(storage,player){
				let str='';
				let list=["huo","lei"]
				for(let i of list){
					if(player.hasMark("xjzh_huoying_qiling_"+i)) str+=get.translation("xjzh_huoying_qiling_"+i)+':'+get.translation(player.countMark("xjzh_huoying_qiling_"+i))+'<br>';
				}
				return str;
			},
		},
		async content(event,trigger,player){
			await game.setNature(trigger,get.color(trigger.cards[0])=="red"?"fire":"thunder",false);
			await player.addMark(game.hasNature(trigger,"fire")?"xjzh_huoying_qiling_huo":"xjzh_huoying_qiling_lei",1,false);
			player.markSkill("xjzh_huoying_qiling");
			if(player.countMark("xjzh_huoying_qiling_huo")>=3&&player.countMark("xjzh_huoying_qiling_lei")>=1){
				let evt=event.getParent("damage");
				if(evt&&evt.getParent){
					let next=game.createEvent('xjzh_huoying_qiling_trigger',false,evt.getParent());
					next.player=player;
					next.setContent(async ()=>{
						const targets=await player.chooseTarget(get.prompt2('xjzh_huoying_qiling'),lib.filter.notMe).set("ai",target=>{
							return get.damageEffect(target,player,player,"thunder");
						}).forResultTargets();
						if(targets){
							player.removeMark("xjzh_huoying_qiling_huo",3);
							player.removeMark("xjzh_huoying_qiling_lei",1);
							let num=Math.max(player.awakenedSkills.includes("xjzh_huoying_liudao")?1:2,Math.abs(targets[0].getHp(true)-player.getHp(true)));
							targets[0].damage("thunder",num,player,"nocard");
							if(!player.hasMark("xjzh_huoying_qiling_huo")&&!player.hasMark("xjzh_huoying_qiling_lei")) player.unmarkSkill("xjzh_huoying_qiling");
						}
					});
				}
			}

		},
		subSkill:{"huo":{sub:true,},"lei":{sub:true,},},
	},
	"xjzh_huoying_qianniao":{
		trigger:{
			player:["phaseZhunbeiBegin","phaseJieshuBegin"],
		},
		frequent:true,
		priority:-1,
		filter(event,player,name){
			return player.hasUseTarget("sha");
		},
		marktext:"瞳",
		intro:{
			name:"写轮眼",
			content:"mark",
		},
		audio:"ext:仙家之魂/audio/skill:1",
		derivation:["xjzh_huoying_tongshu"],
		async content(event,trigger,player){
			let cards=game.createCard("sha",lib.suit.randomGet(),null,null);
			await player.chooseUseTarget(cards,game.filterPlayer(current=>{
				return current.inRangeOf(player);
			}),false)
			.set('prompt',"〖雷遁·千鸟〗选择一名角色视为对其使用一张随机属性为火/雷的【杀】")
			.set('ai',target=>{
				return get.damageEffect(target,player,player,'thunder','fire');
			});
			let history=player.getHistory('sourceDamage',evt=>evt.getParent(4).name=="xjzh_huoying_qianniao");
			if(history.length){
				if(!player.awakenedSkills.includes("xjzh_huoying_liudao")){
					await player.addMark("xjzh_huoying_qianniao",1);
					event.trigger("xjzh_huoying_liudaoTrigger");
				}
			}else{
				player.draw(player.awakenedSkills.includes("xjzh_huoying_liudao")?1:2);
			}
		},
	},
	"xjzh_huoying_liudao":{
		trigger:{
			player:"xjzh_huoying_liudaoTrigger",
		},
		forced:true,
		locked:true,
		unique:true,
		mark:true,
		marktext:"轮",
		intro:{
			name:"轮回眼",
			content:"limited",
		},
		limited:true,
		skillAnimation:true,
		animationStr:'六道模式',
		animationColor:'fire',
		juexingji:true,
		priority:1,
		audio:"ext:仙家之魂/audio/skill:1",
		filter(event,player){
			return player.countMark("xjzh_huoying_qianniao")>=6;
		},
		derivation:["xjzh_huoying_tonshu"],
		async content(event,trigger,player){
			player.awakenSkill("xjzh_huoying_liudao");
			player.clearMark("xjzh_huoying_qianniao");
			player.addSkills("xjzh_huoying_tongshu");
			player.maxHp=3;
			player.hp=3;
			player.update();
			player.discard(player.getCards('j'));
			player.link(false);
			player.turnOver(false);
			player.node.name.innerHTML=get.slimName('xjzh_huoying_liudaozuozhu');
			let node,node2
			//觉醒时换头像
			if(player.name2&&player.name2=='xjzh_huoying_zuozhu'){
				node=player.node.avatar2;
				node2=player.node.name2;
			}else{
				node=player.node.avatar;
				node2=player.node.name;
			}
			node2.innerHTML=get.slimName('xjzh_huoying_liudaozuozhu');
			game.broadcastAll((node)=>{
				node.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaozuozhu.jpg');
			},node);
		},
	},
	"xjzh_huoying_tongshu":{
		trigger:{
			global:"damageBegin",
		},
		frequent:true,
		changeSeat:true,
		priority:6,
		mod:{
			globalFrom:function(from,to,distance){
				return 1;
			},
		},
		audio:"ext:仙家之魂/audio/skill:1",
		prompt(event,player){
			return `是否发动〖天手力〗与${get.translation(event.source)}交换位置并视为对其使用一张【杀】`;
		},
		filter(event,player){
			return event.source!=player;
		},
		check(event,player){
			return get.attitude(player,event.player)>0;
		},
		async content(event,trigger,player){
			if(trigger.player!=player) game.swapSeat(player,trigger.player);
			game.delay(0.5);
			let cards=game.createCard("sha",lib.suit.randomGet(),null,null);
			await player.useCard(cards,trigger.source,false).set('addCount',false).set('oncard',(card,player)=>{
				let that=this;
				if(!that.baseDamage) that.baseDamage=1;
				that.baseDamage++;
			});
			let history=player.getHistory('sourceDamage',evt=>evt.getParent(3).name=="xjzh_huoying_tongshu1");
			if(history.length){
				trigger.changeToZero();
				game.log(trigger.player,"因",player,'的技能〖天手力〗防止了此伤害。');
			}
			else{
				trigger.player=player;
				game.log(player,'代替了',trigger.player,'承受了伤害。');
			}
		},
	},
	"xjzh_huoying_xianzhang":{
		mark:true,
		locked:true,
		marktext:"☯",
		zhuanhuanji:true,
		intro:{
			name:"掌仙术",
			content:function(storage,player,skill){
				if(player.storage.xjzh_huoying_xianzhang==true) return '每回合限一次，你使用非[伤害]卡牌指定已受伤的目标后，你可以令其摸两张牌或回复一点体力；';
				return '每回合限一次，其他角色使用[伤害]卡牌指定你为目标时，你可以扣置一张[伤害]卡牌，其猜测此牌牌名，若错，你可以移除此牌的一个目标。';
			},
		},
		trigger:{
			player:"phaseUseBegin",
		},
		forced:true,
		priority:62,
		audio:"ext:仙家之魂/audio/skill:2",
		content:function(){
			if(player.storage.xjzh_huoying_xianzhang==true){
				player.storage.xjzh_huoying_xianzhang=false;
				player.addTempSkill('xjzh_huoying_xianzhang_2',{
					player:'phaseUseBegin'
				});
			}
			else{
				player.storage.xjzh_huoying_xianzhang=true;
				player.addTempSkill('xjzh_huoying_xianzhang_1',{
					player:'phaseUseBegin'
				});
			}
		},
		subSkill:{
			"1":{
				trigger:{
					player:"useCardToPlayered",
				},
				sub:true,
				usable:1,
				prompt:function(event,player){
					return "是否发动〖掌仙术〗令"+get.translation(event.target)+"摸一张牌或回复一点体力";
				},
				check:function(event,player){
					return get.attitude(player,event.target)>0;
				},
				filter:function(event,player){
					return !get.tag(event.card,"damage");
				},
				content:function(){
					trigger.target.chooseDrawRecover(2,1,true,"〖掌仙术〗：请选择摸两张牌或回复一点体力");
				},
				ai:{
					result:{
						target:1.5,
					},
				},
			},
			"2":{
				trigger:{
					target:"useCardToTargeted",
				},
				sub:true,
				usable:1,
				prompt:function(event,player){
					return "是否发动〖掌仙术〗令"+get.translation(event.player)+"猜测你的手牌";
				},
				check:function(event,player){
					return 1;
				},
				filter:function(event,player){
					return get.tag(event.card,"damage")&&player.countCards('h',function(card){
						return get.tag(card,'damage');
					});
				},
				content:function(){
					"step 0"
					player.chooseCard('h',1,"选择一张手牌令"+get.translation(trigger.player)+"猜测牌名",function(card){
						return get.tag(card,'damage');
					});
					"step 1"
					if(result.bool){
						var cardx=ui.create.card();
						cardx.classList.add('infohidden');
						cardx.classList.add('infoflip');
						player.$throw(cardx,1000,'nobroadcast');
						game.log(player,"扣置了一张牌在场上");
						event.cardx=result.cards[0]
						game.delay(2);
						var inpile=lib.inpile.filter(function(name){
							var card={name:name};
							if(!get.tag(card,'damage')) return false;
							return true;
						});
						var text='请选择猜测一种[伤害]类卡牌;'
						trigger.player.chooseVCardButton(true,inpile,text).set('ai',function(){
							if(Math.random()<=0.5) return "sha";
							return Math.random();
						});
					}
					"step 2"
					if(result&&result.links){
						var card2=game.createCard(result.links[0][2]);
						trigger.player.$throw(card2,1000,'nobroadcast');
						player.$throw(event.cardx,1000,'nobroadcast');
						if(result.links[0][2].name!=event.cardx.name){
							player.chooseTarget('选择移除'+get.translation(trigger.card)+'的一个目标',function(card,player,target){
								return trigger.targets.includes(target);
							})
							.set('ai',function(){
								return get.attitude(player,target)>0;
							});
						}
						else{
							event.finish();
						}
					}
					"step 3"
					if(result.bool){
						trigger.targets.remove(result.targets[0]);
					}
				},
				ai:{
					effect:{
						target:function(player,target,card){
							if(get.tag(card,"damage")) return [0.5,0.5];
							return 1;
						},
					},
				},
			},
		},
	},
	"xjzh_huoying_sihun":{
		trigger:{
			player:"dyingBefore",
		},
		init:function(player,skill){
			player.storage.xjzh_huoying_sihun=false;
		},
		filter:function(event,player){
			return !player.storage.xjzh_huoying_sihun&&game.dead.length>0;
		},
		forced:true,
		priority:-16,
		limited:true,
		mark:true,
		marktext:"魂",
		intro:{
			name:"死魂之术",
			content:"limited",
		},
		skillAnimation:true,
		animationColor:"water",
		animationStr:"死魂之术",
		content:function(){
			"step 0"
			player.awakenSkill('xjzh_huoying_sihun');
			player.storage.xjzh_huoying_sihun=true;
			"step 1"
			var dead=game.dead
			player.recover(dead.length);
			player.draw(dead.length);
			var de=[]
			for(var i=0;i<dead.length;i++){
				de.push(dead[i]);
			}
			var link=de.randomGet();
			link.revive(2);
			if(game.zhu!=player){
				var id=player.identity;
			}
			else{
				var id='zhong';
			}
			link.setIdentity(id);
			link.identity=id;
			link.node.identity.dataset.color='xjzh_huoying_sihun';
			link.identityShown=true;
			link.changeGroup(player.group);
			link.clearSkills();
			link.addSkill("xjzh_huoying_sihun_display");
		},
		subSkill:{
			"display":{
				mod:{
					cardEnabled2:function(card,player,now){
						return false;
					},
					cardEnabled:function(card,player,now){
						return false;
					},
				},
				trigger:{
					player:["drawAfter","gainAfter"],
				},
				direct:true,
				priority:16,
				sub:true,
				filter:function(event,player){
					return player.countCards("h");
				},
				content:function(){
					var cardx=player.getCards("h");
					player.lose(cardx,ui.cardPile,'get.rand(0,ui.cardPile.childNodes.length)');
				},
				ai:{
					nosave:true,
				},
			},
		},
	},
	"xjzh_huoying_chuanyi":{
		trigger:{
			source:"damageEnd",
		},
		prompt:function(event,player){
			return "是否弃置"+get.translation(player.storage.xjzh_huoying_chuanyi+1)+"张牌发动〖仙法·传异远影〗获得"+get.translation(event.player)+"的一个技能";
		},
		init:function(player,skill){
			player.storage.xjzh_huoying_chuanyi=1;
		},
		check:function(event,player){
			var cards=player.getCards("he");
			for(var i of cards){
				if(4-get.value(i)) return 1;
			}
			return 0.5;
		},
		filter:function(event,player){
			return event.player.isDead();
		},
		content:function(){
			"step 0"
			var num=player.storage.xjzh_huoying_chuanyi
			list=trigger.player.skills.filter(s=>lib.translate[s]&&lib.translate[s+'_info']&&lib.skill[s]&&!lib.skill[s].nopopup&&!lib.skill[s].equipSkill&&!lib.skill[s].juexingji&&!lib.skill[s].limited&&!lib.skill[s].unique&&!lib.skill[s].dutySkill);
			if(list.length){
				player.chooseToDiscard(num+1,"he","是否弃置"+get.cnNumber(num+1)+"张牌获得"+get.translation(trigger.player)+"的一个技能").set('ai',function(card){
					return 6-get.value(card);
				});
			}
			"step 1"
			if(result.bool){
				if(event.isMine()){
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
				if(list.length==1) event._result={
				control:list[0]};
				else player.chooseControl(list).set('prompt','请选择获得一项技能').set('ai',function(){
					return get.max(list,get.skillRank,'item');
				}).set('dialog',dialog);
			}
			"step 2"
			if(result&&result.control){
				player.addSkillLog(result.control);
				player.storage.xjzh_huoying_chuanyi++
			}
		},
	},
	"xjzh_huoying_kaobei":{
		trigger:{
			global:'$logSkill',
		},
		usable:1,
		bannedList:[
			"ywhy_youli"
		],
		direct:true,
		firstDo:true,
		priority:100,
		marktext:"拷",
		intro:{
			name:"拷贝",
			content:'$',
		},
		audio:"ext:仙家之魂/audio/skill:1",
		//check:function(event,player){return 1;},
		filter:function(event,player){
			var skills=event.skill
			var skills2=player.getStockSkills();
			var info=get.info(skills)
			if(skills2.includes(event.skill)) return false;
			if(lib.skill.xjzh_huoying_kaobei.bannedList.includes(skills)) return false;
			if(!lib.translate[event.skill+'_info']) return false;
			if(lib.skill.global.includes(event.skill)) return false;
			if(player.getExpansions("xjzh_huoying_shenwei").length<=0) return false;
			if(info&&(info.limited||info.juexingji||info.dutySkill||info.equipSkill||info.sub||info.unique)) return false;
			if(info.ai&&(info.ai.combo||info.ai.notemp||info.ai.neg)) return false;
			return true;
		},
		/*prompt:function(event,player){
		return "〖拷贝〗：是否移除一张“雷”发动技能〖"+get.translation(event.skill)+"〗";
		},*/
		content:function(){
			"step 0"
			var bool=false;
			var skills=trigger.skill
			var skills2=trigger.player.skills;
			for(var i=0;i<skills2.length;i++){
				var info=lib.skill[skills2[i]]
				if(typeof info.group=='string'){
					if(info.group==skills) bool=true;
					break;
				}
				else if(Array.isArray(info.group)){
					for(var j of info.group){
						if(j==skills) bool=true;
						break;
					}
				}
			}
			if(bool){
				event.finish();
				return;
			}
			"step 1"
			if(trigger.player==player){
				if(player.getStorage('xjzh_huoying_kaobei').includes(trigger.skill)){
					player.unmarkAuto('xjzh_huoying_kaobei',[trigger.skill])
					player.addAdditionalSkill('xjzh_huoying_kaobei',player.getStorage('xjzh_huoying_kaobei'));
					player.syncStorage('xjzh_huoying_kaobei');
					player.markSkill('xjzh_huoying_kaobei');
				}
				event.finish();
				return;
			}
			else{
				if(player.getStorage('xjzh_huoying_kaobei').includes(trigger.skill)){
					event.finish();
					return;
				}
			}
			"step 2"
			var cards=player.getExpansions("xjzh_huoying_shenwei");
			player.chooseCardButton(cards,1,"〖拷贝〗：选择移除一张“雷”获得"+get.translation(trigger.player)+"的技能〖"+get.translation(trigger.skill)+"〗").set('ai',function(button){
				var valuex=get.value(button.link)
				var number=get.number(button.link)
				return 6-valuex+number;
			});
			"step 3"
			if(result.bool){
				player.loseToDiscardpile(result.links);
				player.markAuto('xjzh_huoying_kaobei',[trigger.skill]);
				player.addAdditionalSkill('xjzh_huoying_kaobei', player.getStorage('xjzh_huoying_kaobei'));
				player.syncStorage('xjzh_huoying_kaobei');
				player.markSkill('xjzh_huoying_kaobei');
			}
		},
	},
	"xjzh_huoying_shenwei":{
		trigger:{
			global:["gameStart"],
			player:["enterGame"],
		},
		forced:true,
		mark:true,
		marktext:"雷",
		intro:{
			content:"expansion",
			markcount:"expansion",
		},
		audio:"ext:仙家之魂/audio/skill:1",
		onremove:function(player,skill){
			var cards=player.getExpansions(skill);
			if(cards.length) player.loseToDiscardpile(cards);
		},
		group:["xjzh_huoying_shenwei_round","xjzh_huoying_shenwei_dying"],
		filter:function(event,player){
			return true;
		},
		content:function(){
			"step 0"
			var cards=get.cards(7);
			player.chooseCardButton(cards,4,true,"〖神威〗：选择4张牌将其置于你的武将牌上").set('ai',function(button){
				return get.number(button.link)+get.value(button.link);
			});
			"step 1"
			if(result.links){
				player.addToExpansion(result.links,"giveAuto",player).gaintag.add("xjzh_huoying_shenwei");
			}
		},
		subSkill:{
			round:{
				trigger:{
					global:"roundStart",
				},
				forced:true,
				audio:"xjzh_huoying_shenwei",
				filter:function(event,player){
					return game.roundNumber%2!=0;
				},
				content:function(){
					var list=Array.from(ui.cardPile.childNodes);
					var cards=list.randomGets(4);
					player.gain(cards,player,"giveAuto");
				},
			},
			dying:{
				trigger:{
					player:"dyingBegin",
				},
				prompt:function(event,player){
					return "〖神威〗：令一名角色获得所有“雷”或令其弃置点数不小于“雷”的任意张牌";
				},
				audio:"xjzh_huoying_shenwei",
				filter:function(event,player){
					return player.getExpansions("xjzh_huoying_shenwei").length;
				},
				content:function(){
					"step 0"
					draw=false;
					event.num=0
					var cardx=player.getExpansions("xjzh_huoying_shenwei");
					for(var i of cardx){
						event.num+=get.number(i);
					}
					player.chooseControlList(get.prompt(event.name,player), [
					'令一名角色获得所有“雷”',
					'令其弃置任意张点数不小于'+get.translation(event.num)+'的牌',
					],function(){
						var att=get.attitude(player,target);
						if(player.hasFriend()&&att>=0) return 0;
						return 1;
					})
					.set("player",player);
					"step 1"
					if(result.index==0){
						draw=true;
						player.chooseTarget(true,"令一名角色获得所有“雷”",function(target){
							return target!=player;
						})
						.set('ai',function(target){
							return get.attitude(player,target)>=0;
						});
					}
					else{
						player.chooseTarget(true,"令一名角色弃置任意张点数不小于"+get.translation(event.num)+"的牌",function(card,player,target){
							return target!=player&&target.countCards("h");
						})
						.set('ai',function(target){
							return get.attitude(player,target)<0;
						});
					}
					"step 2"
					if(result.bool){
						if(draw){
							var cardx=player.getExpansions("xjzh_huoying_shenwei");
							result.targets[0].gain(cardx,player,"giveAuto");
							event.finish();
						}
						else{
							var cardx=player.getExpansions("xjzh_huoying_shenwei");
							event.num2=result.targets[0].countCards("h");
							event.target=result.targets[0]
							var next=event.target.chooseCard('弃置任意张点数之和不小于'+get.translation(event.num)+'的牌，否则失去所有体力','h');
							next.set('numx',event.num);
							next.set('complexCard',true);
							next.set('complexSelect',true);
							next.set('selectCard',function(){
								var num2=0;
								for(var i=0;i<ui.selected.cards.length;i++){
									num2+=get.number(ui.selected.cards[i]);
								}
								if(num2>=_status.event.numx) return ui.selected.cards.length;
								return event.num2;
							});
							next.set('ai',function(card){
								return 4-get.value(card);
							});
						}
					}
					"step 3"
					if(result.bool){
						event.target.discard(result.cards);
						/*num=0
						for(var i of result.cards){
						num+=get.number(i)
						}
						if(num<event.num&&result.cards.length!=event.num2){
						event.target.loseHp(event.target.hp);
						}*/
					}
					else{
						event.target.loseHp(event.target.hp);
					}
					"step 4"
					var cards=player.getExpansions("xjzh_huoying_shenwei");
					if(cards.length) player.loseToDiscardpile(cards);
				},
			},
		},
	},
	"xjzh_huoying_leiqie":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:1",
		filter:function(event,player){
			return player.countCards('h');
		},
		usable:1,
		content:function(){
			"step 0"
			var cards=player.getExpansions('xjzh_huoying_shenwei');
			if(!cards.length||!player.countCards('h')){
				event.finish();
				return;
			}
			var next=player.chooseToMove('〖雷切〗：是否交换“雷”和手牌？');
			next.set('list',[
				[get.translation(player)+'（你）的雷',cards],
				['手牌区',player.getCards('h')],
			]);
			next.set('filterMove',function(from,to,moved){
				if(to==0) return moved[0].length<4;
				return typeof to!='number';
			});
			next.set('processAI',function(list){
				var player=_status.event.player,cards=list[0][1].concat(list[1][1]).sort(function(a,b){
					return get.value(a)-get.value(b);
				}),cards2=cards.splice(0,player.getExpansions('xjzh_huoying_shenwei').length);
				return [cards2,cards];
			});
			"step 1"
			if(result.bool){
				var pushs=result.moved[0],gains=result.moved[1];
				pushs.removeArray(player.getExpansions('xjzh_huoying_shenwei'));
				gains.removeArray(player.getCards('h'));
				player.addToExpansion(pushs,player,'giveAuto').gaintag.add('xjzh_huoying_shenwei');
				if(pushs.length) game.log(player,'将',pushs,'作为“雷”置于武将牌上');
				player.gain(gains,'gain2');
			}
			"step 2"
			player.chooseTarget("〖雷切〗:请选择一个目标",function(card,player,target){
				return target!=player;
			}).set('ai',function(target){
				return get.damageEffect(target,player,player);
			});
			"step 3"
			if(result.bool){
				var list=[1,2].randomGet();
				if(list==1){
					var players=game.filterPlayer().randomGet();
					game.swapSeat(players,result.targets[0]);
					result.targets[0].addTempSkill("xjzh_huoying_leiqie_1","phaseJieshuBegin");
				}
				else if(list==2){
					result.targets[0].damage(1,"noCard","thunder");
					result.targets[0].addTempSkill("xjzh_huoying_leiqie_2");
				}
			}
		},
		subSkill:{
			"1":{
				mod:{
					cardEnabled:function(card,player){
						if(get.tag(card,"damage")) return false;
					},
					"cardEnabled2":function(card,player){
						if(get.tag(card,"damage")) return false;
					},
				},
				sub:true,
				locked:true,
			},
			"2":{
				trigger:{
					player:"phaseUseBegin",
				},
				direct:true,
				priority:-2,
				firstDo:true,
				sub:true,
				locked:true,
				content:function(){
					trigger.cancel();
				},
			},
		},
		ai:{
			order:8,
			result:{
				player:1,
			},
		},
	},
	"xjzh_huoying_bietian":{
		enable:"phaseUse",
		audio:"ext:仙家之魂/audio/skill:1",
		init:function(player){
			player.addMark("xjzh_huoying_bietian",2,false);
			player.update();
		},
		mark:true,
		marktext:"天",
		intro:{
			name:"别天神",
			content:"本局游戏限#次",
		},
		group:["xjzh_huoying_bietian_control"],
		filterTarget:function(card,player,target){
			if(target.hasSkill("xjzh_huoying_bietian_draw")) return false;
			return target!=player;
		},
		filter:function(event,player){
			if(!player.hasMark("xjzh_huoying_bietian")) return false;
			return true;
		},
		content:function(){
			"step 0"
			player.removeMark("xjzh_huoying_bietian",1,false);
			if(!player.hasMark("xjzh_huoying_bietian")) player.disableSkill('xjzh_huoying_bietian',"xjzh_huoying_xuzuo");
			"step 1"
			target.addSkill("xjzh_huoying_bietian_draw");
		},
		ai:{
			order:8,
			result:{
				target:function(player,target){
					var att=get.attitude(player,target)
					if(att<=0) return -2;
					return 0.1;
				},
				player:function(player,target){
					var num=player.countMark("xjzh_huoying_bietian");
					if(num>1) return 1;
					if(game.countPlayer(function(current){return current!=player})<=3) return 1;
					return 0.01;
				},
			},
		},
		subSkill:{
			"draw":{
				mark:true,
				marktext:"别",
				intro:{
					name:"别天神",
					content:"出牌阶段由<span style=\"color: gold\">宇智波止水</span>接管",
				},
				trigger:{player:"phaseDrawBegin"},
				direct:true,
				firstDo:true,
				content:function(){
					player.draw(2);
				},
			},
			"control":{
				trigger:{global:'phaseBeginStart'},
				filter:function(event,player){
					return player!=event.player&&!event.player._trueMe&&event.player.hasSkill("xjzh_huoying_bietian_draw");
				},
				forced:true,
				priority:100,
				sub:true,
				logTarget:'player',
				skillAnimation:true,
				animationColor:'key',
				content:function(){
					trigger.player._trueMe=player;
					game.addGlobalSkill('autoswap');
					if(trigger.player==game.me){
						game.notMe=true;
						if(!_status.auto) ui.click.auto();
					}
					trigger.player.addSkill('xjzh_huoying_bietian_remove');
				},
			},
			"remove":{
				trigger:{
					player:['phaseAfter','dieAfter'],
					global:'phaseBefore',
				},
				lastDo:true,
				charlotte:true,
				forceDie:true,
				forced:true,
				silent:true,
				sub:true,
				content:function(){
					player.removeSkill('xjzh_huoying_bietian_remove');
				},
				onremove:function(player){
					if(player==game.me){
						if(!game.notMe) game.swapPlayerAuto(player._trueMe)
						else delete game.notMe;
						if(_status.auto) ui.click.auto();
					}
					delete player._trueMe;
				},
			},
		},
	},
	"xjzh_huoying_shunshen":{
		trigger:{
			player:"damageBegin",
		},
		filter:function(event,player){
			return player.countCards('he')>0;
		},
		check:function(event,player){return 1},
		content:function(){
			"step 0"
			player.chooseToDiscard('he','〖瞬身〗：是否弃置一张牌与其交换位置？').set('ai',function(card){
				return 6-get.value(card);
			});
			"step 1"
			if(result.bool){
				if(trigger.source!=player) game.swapSeat(player,trigger.source);
				game.delay(0.5);
				player.gainPlayerCard(trigger.source,true,'h').set('ai',function(button){
					var card=button.link;
					return get.value(card);
				});
			}else{
				event.finish();
			}
			"step 2"
			if(result.bool&&result.cards.length){
				if(get.name(result.cards[0])!="shan"){
					if(player.hasUseTarget(result.cards[0])){
						player.chooseUseTarget(result.cards[0]);
						event.finish();
					}else{
						event.finish();
					}
				}else{
					event.cards=result.cards[0]
					player.chooseBool("〖瞬身〗：是否弃置"+get.translation(result.cards[0])+"防止该伤害？").set('ai',function(){
						return 1;
					});
				}
			}else{
				event.finish();
			}
			"step 3"
			if(result.bool){
				player.discard(event,cards);
				trigger.changeToZero();
				game.log(player,"发动〖瞬身〗防止此伤害");
			}
		},
	},
	"xjzh_huoying_xuzuo":{
		trigger:{
			player:"logSkill",
		},
		forced:true,
		priority:3,
		locked:true,
		filter:function(event,player){
			if(event.skill!="xjzh_huoying_shunshen") return false;
			if(player.countMark('xjzh_huoying_bietian')>=2) return false;
			return true;
		},
		group:["xjzh_huoying_xuzuo_sha"],
		content:function(){
			player.changeHujia(1);
		},
		subSkill:{
			"sha":{
				trigger:{
					source:"damageBegin1",
				},
				filter:function(event,player){
					return player.hujia>0;
				},
				sub:true,
				prompt:function(event,player){
					return "〖须佐〗：是否移除所有护甲令此牌伤害加"+get.translation(player.hujia)+"？";
				},
				content:function(){
					trigger.num+=player.hujia
					player.changeHujia(-player.hujia)
				},
			},
		},
	},

};

export default skills;