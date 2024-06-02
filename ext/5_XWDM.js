'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('XWDM')) lib.config.characters.remove('XWDM');
		lib.translate['XWDM_character_config']='仙武动漫';
		var XWDM={
			name:'XWDM',
			connect:true,
			connectBanned:[],
			characterSort:{
				XWDM:{
					//火影忍者
					"XWDM_huoying":["xjzh_huoying_zhishui","xjzh_huoying_mingren","xjzh_huoying_zuozhu","xjzh_huoying_dou","xjzh_huoying_kakaxi"],
				},
			},
			character:{
				"xjzh_huoying_mingren":["male","qun",3,["xjzh_huoying_fenshen","xjzh_huoying_xianshu","xjzh_huoying_zuidun","xjzh_huoying_kaigua"],[]],
				"xjzh_huoying_zuozhu":["male","qun",4,["xjzh_huoying_qiling","xjzh_huoying_qianniao"],[]],
				"xjzh_huoying_dou":["male","qun",3,["xjzh_huoying_xianzhang","xjzh_huoying_sihun","xjzh_huoying_chuanyi"],[]],
				"xjzh_huoying_kakaxi":["male","qun",3,["xjzh_huoying_kaobei","xjzh_huoying_shenwei","xjzh_huoying_leiqie"],[]],
				"xjzh_huoying_zhishui":["male","qun",3,["xjzh_huoying_bietian","xjzh_huoying_shunshen","xjzh_huoying_xuzuo"],[]],

			},
			characterIntro:{
				"xjzh_huoying_mingren":"",
				"xjzh_huoying_zuozhu":"",
				"xjzh_huoying_dou":"",
				"xjzh_huoying_kakaxi":"",
				"xjzh_huoying_zhishui":"",

			},
			characterTitle:{
				"xjzh_huoying_mingren":"命运之子",
				"xjzh_huoying_zuozhu":"须佐之男",
				"xjzh_huoying_dou":"蛇岛异仙",
				"xjzh_huoying_kakaxi":"拷贝忍者",
				"xjzh_huoying_zhishui":"瞬身止水",

			},
			perfectPair:{
			},
			characterReplace:{
			},
			characterFilter:{
			},
			skill:{
				"xjzh_huoying_fenshen":{
					enable:"phaseUse",
					audio:"ext:仙家之魂/audio/skill:1",
					filterTarget:function(card,player,target){
						return player.canCompare(target);
					},
					init:function(player){
					    if(!player.storage.xjzh_huoying_fenshen) player.storage.xjzh_huoying_fenshen=1
					},
					selectTarget:function(){
					    var player=_status.event.player
					    var num=player.storage.xjzh_huoying_fenshen
						return [1,num];
					},
					filter:function(event,player){
						return player.countCards('h')>0&&!player.hasSkill('xjzh_huoying_fenshen_off');
					},
					multitarget:true,
					multiline:true,
					content:function(){
                        player.chooseToCompare(targets).callback=function(){
                            if(event.num1>event.num2){
                                if(player.storage.xjzh_huoying_fenshen<3) player.storage.xjzh_huoying_fenshen+=1
                                player.draw();
                                var evt=event.getParent("phase");
                                if(evt&&evt.getParent&&!evt.xjzh_huoying_fenshen) evt.xjzh_huoying_fenshen=true;
                            }else{
                                player.addTempSkill("xjzh_huoying_fenshen_off");
                            }
                        };
					},
					contentAfter:function(){
					    var evt=event.getParent("phase");
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
							target:function(player,target){
								var hs=player.getCards('h');
								for(var i=0;i<hs.length;i++){
									if(get.value(hs[i])<=6){
									    if(get.number(hs[i])>=11) return -1;
									}
								}
								return -0.2;
							},
							player:function(card,player,target){
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
									//game.playXH(['xjzh_huoying_luoxuan1'].randomGet());
								}
							}
						},
						prompt:function(links,player){
							return '将一张牌当作'+get.translation(links[0][2])+'使用';
						}
					},
					ai:{
						order:1,
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
				"xjzh_huoying_xianshu":{
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
					    if(player.countMark('xjzh_huoying_xianshu')<=0) return false;
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
				},
				"xjzh_huoying_zuidun":{
					trigger:{
						global:"dying",
					},
					frequent:true,
					locked:true,
					mark:true,
					marktext:"嘴",
					intro:{
						name:"嘴遁",
						content:"已发动#次",
					},
					mode:["identity","guozhan"],
					init:function (player){
						player.storage.xjzh_huoying_zuidun=0;
						player.syncStorage('xjzh_huoying_zuidun');
					},
					unique:true,
					filter:function(event,player){
						return player.countMark("xjzh_huoying_zuidun")<2&&player!=game.zhu&&event.player!=game.zhu&&event.player!=player;
					},
					prompt:function(event,player){
						if(get.mode()!='guozhan'){
							return '嘴遁：是否令'+get.translation(event.player)+'改变身份与你一致？';
						}
						else{
							return '嘴遁：是否令'+get.translation(event.player)+'改变势力与你一致？';
						}
					},
					content:function(){
						"step 0"
						player.logSkill('xjzh_huoying_zuidun',trigger.player);
						player.addMark("xjzh_huoying_zuidun",1);
						"step 1"
						trigger.player.chooseControl('选项一','选项二',function(){
							return Math.random()<0.5?'选项一':'选项二';
						})
						.set('prompt','嘴遁<br><br><div class="text">1:将所有手牌交给漩涡鸣人，然后立即阵亡</div><br><div class="text">2:失去所有技能并改变身份/势力与漩涡鸣人一致。</div></br>').set('ai',function(event,player){
							if(player.identity==event.player.identity) return Math.random()<0.5;
							var stat=get.situation();
							switch(player.identity){
								case 'fan':
								if(stat<0) return false;
								if(stat==0) return Math.random()<0.6;
								return true;
								case 'zhong':
								if(stat>0) return false;
								if(stat==0) return Math.random()<0.6;
								return true;
								case 'nei':
								if(event.player.identity=='fan'&&stat<0) return true;
								if(event.player.identity=='zhong'&&stat>0) return true;
								if(stat==0) return Math.random()<0.7;
								return false;
							}
						});
						"step 2"
						if(result.control=='选项一'){
							player.gain(trigger.player.getCards('hej'),'give',trigger.player);
							trigger.player.die();
							event.finish();
						}
						else{
							let id=player.identity;
							trigger.player.identity=id;
							trigger.player.setIdentity(id);
							//trigger.player.node.identity.dataset.color='xjzh_huoying_zuidun';
							trigger.player.identityShown=true;
						}
						"step 3"
						trigger.player.clearSkills();
						trigger.player.draw(player.hp-trigger.player.hp);
						player.draw(player.hp-trigger.player.hp);
						player.loseMaxHp();
						trigger.player.recoverTo(1);
						"step 4"
						if(player.countMark("xjzh_huoying_zuidun")>=2){
							player.removeSkill("xjzh_huoying_zuidun",true);
						}
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
					priority:100,
					derivation:["xjzh_huoying_luoxuan","xjzh_huoying_dunshu","xjzh_huoying_liudaofenshen"],
					content:function(){
						"step 0"
						player.maxHp=2
						player.update();
						player.recoverTo(2);
						player.discard(player.getCards('j'));
						player.link(false);
						player.turnOver(false);
						"step 1"
						player.removeSkill("xjzh_huoying_fenshen");
						player.removeSkill("xjzh_huoying_xianshu");
						player.removeSkill("xjzh_huoying_zuidun");
						player.removeSkill("xjzh_huoying_kaigua");
						player.addSkill("xjzh_huoying_luoxuan");
						player.addSkill("xjzh_huoying_dunshu");
						player.addSkill("xjzh_huoying_liudaofenshen");
						"step 2"
						game.delay(2);
						player.node.name.innerHTML=get.slimName('xjzh_huoying_liudaomingren');
						//觉醒时换头像
						game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
						game.log(player,'使用了自己的外挂');
						game.log(player,'进入了六道模式');
						if(player.hasSkill("xjzh_huoying_fenshen")) game.log(player,'失去了技能','#g〖分身〗');
						game.log(player,'失去了技能','#g〖仙术〗');
						game.log(player,'失去了技能','#g〖嘴遁〗');
						game.log(player,'失去了技能','#g〖开挂〗');
						game.log(player,'获得了技能','#g〖螺旋手里剑〗');
						game.log(player,'获得了技能','#g〖阴阳遁术〗');
						game.log(player,'获得了技能','#g〖多重影分身〗');
						player.update();
						game.delay(2);
					},
				},
				"xjzh_huoying_dunshu":{
					locked:true,
					mod:{
						judge:function(player,result){
							if(_status.event.type=='phase'){
								if(result.bool==false){
									result.bool=null;
								}
								else{
									result.bool=false;
								}
							}
						},
					},
					group:["xjzh_huoying_dunshu_1","xjzh_huoying_dunshu_2","xjzh_huoying_dunshu_3","xjzh_huoying_dunshu_4","xjzh_huoying_dunshu_5"],
					subSkill:{
						"1":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:["loseHpBegin","damageBegin"],
							},
							forced:true,
							sub:true,
							filter:function (event,player){
								return _status.currentPhase!=player;
							},
							content:function (){
								"step 0"
								trigger.untrigger();
								trigger.finish();
								"step 1"
								if(trigger.name=="damage"){
									player.draw(trigger.num);
								}
								else{
									player.recover(trigger.num);
								}
							},
							ai:{
								effect:{
									target:function (card,player,target,current){
									    if(!target.hasFriend()) return;
									    if(_status.currentPhase==player) return;
										if(get.tag(card,'damage')){
										    if(player.hasSkillTag('jueqing',false,target)){
										        if(target.isHealthy()) return 'zerotarget';
										    	if(target.isDamaged()) return [0,2];
										    }
										    return [0,2];
										}
										/*if(get.tag(card,'loseHp')){
											if(target.isHealthy()) return 'zerotarget';
											if(target.isDamaged()) return [0,2];
											return [0,1];
										}*/
									},
								}
							}
						},
						"2":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:"recoverEnd",
							},
							forced:true,
							marktext:"术",
							mark:true,
							intro:{
								name:"阴遁术",
								content:"mark",
							},
							sub:true,
							filter:function (event,player){
								return _status.currentPhase==player;
							},
							content:function (){
								player.addMark("xjzh_huoying_dunshu_2",1,false);
							},
							ai:{
								effect:{
									target:function (card,player,target,current){
										if(_status.currentPhase==player&&get.tag(card,'recover')) return [0,2];
									},
								}
							}
						},
						"3":{
							audio:"ext:仙家之魂/audio/skill:1",
							trigger:{
								player:"useCard",
							},
							forced:true,
							sub:true,
							check:function (event,player){
								return get.attitude(player,event.player)<0&&player.countMark("xjzh_huoying_dunshu_2")>=1;
							},
							filter:function (event,player){
								return player.hasMark("xjzh_huoying_dunshu_2")&&get.tag(event.card,'damage');
							},
							content:function (){
								"step 0"
								if(trigger.baseDamage!=undefined){
									trigger.baseDamage+=player.countMark("xjzh_huoying_dunshu_2");
									game.log(trigger.player,'令〖',trigger.card,'〗伤害加'+get.cnNumber(player.countMark("xjzh_huoying_dunshu_2"))+'。');
								}
								"step 1"
								player.clearMark("xjzh_huoying_dunshu_2",false);
							},
							ai:{
								result:{
									player:function(card,player,target,current){
										if(target.countMark("xjzh_huoying_dunshu_2")) return 2;
									}
								}
							}
						},
						"4":{
							audio:"ext:仙家之魂/audio/skill:2",
							trigger:{
								player:["turnOverBefore","linkBefore"],
							},
							forced:true,
							sub:true,
							content:function (){
								"step 0"
								if(!player.isLinked()||!player.isTurnedOver()){
									trigger.untrigger();
									trigger.finish();
								}
								"step 1"
								if(trigger.name=="turnOver"){
									game.log(player,'取消了翻面');
								}
								else{
									game.log(player,'取消了横置');
								}
							},
							ai:{
								noturn:true,
								nolink:true,
								effect:{
									target:function(card,player,target){
										if(get.type(card)=='delay') return 0.5;
									},
								},
							},
						},
						"5":{
							audio:"ext:仙家之魂/audio/skill:2",
							trigger:{
								player:"phaseJieshuBegin",
							},
							forced:true,
							priority:4,
							sub:true,
							content:function (){
								player.loseHp();
							},
							ai:{
								effect:{
									target:function(card,player,target){
										if(get.type(card)=='delay') return 0.5;
									},
								},
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
					group:"xjzh_huoying_liudaofenshen1",
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
						player.storage.xjzh_huoying_liudaofenshen=true;
						var storage=[];
						storage.push(lib.skill.xjzh_huoying_liudaofenshen.getinfo(player));
						player.storage.xjzh_huoying_liudaofenshen1=storage;
						"step 1"
						player.maxHp=2
						player.hp=2
						player.lose(player.getCards("hej"))._triggered=null;
						player.directgain(get.cards(2));
						player.addSkill("xjzh_tongyong_baiban");
						var skills=[
					    	"xjzh_huoying_luoxuan",
						]
						player.storage['xjzh_tongyong_baiban'].addArray(skills);
						player.update();
						'step 2'
						player.node.name.innerHTML=get.slimName('xjzh_huoying_liudaomingrenfs');
						setTimeout(function(){
							player.node.avatar.setBackgroundImage('extension/仙家之魂/skin/min/六道鸣人·分身.jpg');
						},
						100);
					},
				},
				"xjzh_huoying_liudaofenshen1":{
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
						player.node.name.innerHTML=get.slimName('xjzh_huoying_liudaomingren');
						setTimeout(function(){
							player.node.avatar.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaomingren.jpg');
						},100);
						'step 2'
						event.storage=player.storage.xjzh_huoying_liudaofenshen1.slice(0);
						event.doing=event.storage.shift();
						'step 3'
						player.maxHp=event.doing.maxHp;
						player.hp=event.doing.hp;
						var hs=player.getCards('hej');
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
						source:"damageBegin",
					},
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function (event,player){
						return event.card&&!player.hasSkill("xjzh_huoying_qiling_jin");
					},
					forced:true,
					locked:true,
					priority:67,
					marktext:"麒",
					intro:{
						name:"麒麟",
						content:function(storage,player){
							var str='';
							var list=["huo","lei"]
							for(var i of list){
								if(player.hasMark("xjzh_huoying_qiling_"+i)) str+=get.translation("xjzh_huoying_qiling_"+i)+':'+get.translation(player.countMark("xjzh_huoying_qiling_"+i))+'<br>';
							}
							return str;
						},
					},
					group:["xjzh_huoying_qiling_damage"],
					content:function (){
						var colorx=get.color(trigger.card)
						if(colorx=="red"){
							game.setNature(trigger,'fire',false);
						}
						else if(colorx=="black"){
							game.setNature(trigger,'thunder',false);
						}
						if(game.hasNature(trigger,"fire")){
							player.addMark("xjzh_huoying_qiling_huo",1,false);
						}
						else{
							player.addMark("xjzh_huoying_qiling_lei",1,false);
						}
						player.markSkill("xjzh_huoying_qiling");
					},
					subSkill:{
						"huo":{sub:true,},
						"lei":{sub:true,},
						"damage":{
							trigger:{
								source:"damageAfter",
							},
							forced:true,
							audio:"ext:仙家之魂/audio/skill:1",
							filter:function (event,player){
								return player.countMark("xjzh_huoying_qiling_huo")>=3&&player.countMark("xjzh_huoying_qiling_huo")>=1;
							},
							content:function (){
								"step 0"
								player.chooseTarget(get.prompt2('xjzh_huoying_qiling'),function(card,player,target){
									return target!=player;
								})
								.ai=function(target){
									return get.damageEffect(target,player,player,"thunder");
								};
								"step 1"
								if(result.bool){
									player.removeMark("xjzh_huoying_qiling_huo",3);
									player.removeMark("xjzh_huoying_qiling_lei",1);
									var target=result.targets[0];
									var num1=Math.abs(target.hp-player.hp);
									var num2=Math.max(1,num1);
									result.targets[0].damage("thunder",num2,player);
									if(!player.hasMark("xjzh_huoying_qiling_huo")&&!player.hasMark("xjzh_huoying_qiling_lei")) player.unmarkSkill(player.hasMark("xjzh_huoying_qiling"));
								}
							},
							sub:true,
						},
					},
				},
				"xjzh_huoying_qianniao":{
					trigger:{
						player:["phaseZhunbeiBegin","phaseJieshuBegin"],
					},
					forced:true,
					locked:true,
					dutySkill:true,
					priority:-1,
					filter:function (event,player){
						return game.hasPlayer(function(current){
							return current.inRangeOf(player);
						});
					},
					marktext:"瞳",
					intro:{
						name:"写轮眼",
						content:"mark",
					},
					audio:"ext:仙家之魂/audio/skill:1",
					derivation:["xjzh_huoying_tongshu"],
					group:["xjzh_huoying_qianniao_target","xjzh_huoying_qianniao_add"],
					content:function (){
						"step 0"
						var x=["fire","thunder"].randomGet();
						player.chooseUseTarget({
							name:'sha',
							nature:x,
							isCard:true
						},game.filterPlayer(function(current){
							return current.inRangeOf(player);
						}),false)
						.set('prompt',"〖雷遁·千鸟〗选择一名角色视为对其使用一张随机属性为火/雷的【杀】")
						.set('ai',function(target){
							return get.damageEffect(target,player,player,'thunder','fire');
						});
						"step 1"
						if(player.getStat('damage')){
							if(!player.hasSkill("xjzh_huoying_qianniao2")) player.addMark("xjzh_huoying_qianniao",1);
						}
						else{
							player.draw();
						}
					},
					subSkill:{
						"target":{
							trigger:{
								global:["phaseZhunbeiBegin"],
							},
							direct:true,
							priority:-1,
							sub:true,
							filter:function (event,player){
								return event.player.countCards("h")!=event.player.hp&&event.player!=player;
							},
							audio:"ext:仙家之魂/audio/skill:1",
							content:function (){
								"step 0"
								var naturex=["thunder","fire"].randomGet();
								trigger.player.chooseUseTarget({
									name:'sha',
									nature:naturex,
									isCard:true
								},game.filterPlayer(function(current){
								    return current==player;
								}),false,"nodistance")
								.set('prompt',"〖雷遁·千鸟〗对宇智波佐助使用一张随机属性为火/雷的【杀】")
								.set('ai',function(target){
									return get.damageEffect(target,trigger.player,player,'thunder','fire');
								});
								"step 1"
								if(trigger.player.getStat('damage')){
									player.removeMark("xjzh_huoying_qianniao",1);
								}
								else{
									player.draw();
								}
							},
						},
						"add":{
							trigger:{
								global:["roundStart"],
							},
							direct:true,
							priority:-1,
							sub:true,
							filter:function (event,player){
								return game.roundNumber==2;
							},
							audio:"ext:仙家之魂/audio/skill:1",
							content:function (){
								if(player.hasMark("xjzh_huoying_qianniao")){
									player.$skill('六道模式');
									player.clearMark("xjzh_huoying_qianniao");
									player.addSkill("xjzh_huoying_tongshu");
									player.addSkill("xjzh_huoying_qianniao2");
									player.maxHp=2
									player.hp=2
									player.update();
									player.discard(player.getCards('j'));
									player.link(false);
									player.turnOver(false);
									player.node.name.innerHTML=get.slimName('xjzh_huoying_liudaozuozhu');
									game.broadcastAll()+player.node.avatar.setBackgroundImage('extension/仙家之魂/skin/yuanhua/xjzh_huoying_liudaozuozhu.jpg');
									player.draw();
									player.phase("xjzh_huoying_qianniao");
								}
								else{
									player.addSkill("xjzh_huoying_qianniao2");
									player.clearMark("xjzh_huoying_qianniao");
									player.draw(2);
								}
							},
						},
					},
				},
				"xjzh_huoying_qianniao2":{sub:true,},
				"xjzh_huoying_tongshu":{
					forced:true,
					locked:true,
					group:["xjzh_huoying_tongshu1","xjzh_huoying_tongshu2","xjzh_huoying_tongshu3"]
				},
				"xjzh_huoying_tongshu1":{
					trigger:{
						source:"damageBegin",
					},
					sub:true,
					priority:66,
					//nobracket:true,
					changeSeat:true,
					audio:"ext:仙家之魂/audio/skill:1",
					filter:function (event,player){
						return event.source;
					},
					check:function (event,player){
						return get.attitude(player,event.player)>0;
					},
					prompt:function(event,player){
						return '是否发动〖天手力〗与'+get.translation(event.player)+'交换位置并代替其承受该伤害';
					},
					content:function (){
						game.swapSeat(player,trigger.player);
						game.delay(0.5);
						trigger.player=player;
						game.log(player,'代替了',trigger.player,'承受了伤害。');
					},
				},
				"xjzh_huoying_tongshu2":{
					trigger:{
						player:"damageBegin",
					},
					filter:function (event,player){
						return event.source&&event.source!=player;
					},
					sub:true,
					//nobracket:true,
					changeSeat:true,
					audio:"xjzh_huoying_tongshu1",
					check:function (event,player){
						return get.attitude(player,event.source)<0;
					},
					prompt:function(event,player){
						return '是否发动〖天手力〗与'+get.translation(event.source)+'交换位置并视为对其使用一张【杀】';
					},
					content:function (){
						'step 0'
						game.swapSeat(player,trigger.source);
						'step 1'
						player.chooseBool('是否视为对'+get.translation(trigger.source)+'使用一张【杀】').ai=function(card){
							return get.attitude(player,trigger.player)<0;
						}
						'step 2'
						if(result.bool){
							player.useCard({
							name:'sha'},
							trigger.source);
						}
						'step 3'
						if(player.getStat('damage')){
							trigger.cancel();
						}
						else{
							trigger.num++
						}
					},
				},
				"xjzh_huoying_tongshu3":{
					enable:"phaseUse",
					usable:1,
					filterTarget:function (card,player,target){
						return target!=player;
					},
					sub:true,
					mark:'character',
					selectTarget:1,
					audio:"ext:仙家之魂/audio/skill:1",
					prompt:function(event,player){
						return '选择〖炎遁·加具土命〗的目标';
					},
					content:function (){
						'step 0'
						target.addTempSkill("xjzh_huoying_tongshu3_mark",{player:"phaseZhunbeiBefore"});
						'step 1'
						player.storage.xjzh_huoying_tongshu3_from=target;
						player.addTempSkill("xjzh_huoying_tongshu3_from");
					},
					subSkill:{
						"from":{
							mark:true,
							sub:true,
							intro:{
								content:"你与<font color=yellow>$</font>计算距离为一",
							},
							mod:{
								globalFrom:function (from,to,distance){
									if(to.hasSkill('xjzh_huoying_tongshu3_mark')){
										return -Infinity;
									}
								},
							},
						},
						"mark":{
							mark:true,
							sub:true,
							marktext:'炎',
							intro:{
								content:"<font color=yellow>宇智波佐助</font>与你计算距离为一",
							},
						},
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
						global:['$logSkill'],
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
					            if(att<=0) return -1;
					            return 0.2;
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

			},
			dynamicTranslate:{
			    "xjzh_huoying_xianzhang":function(player){
			        var str0="<b><font color=orange>〖掌仙术〗</font>";
			        var str1="转换技，";
			        var str2="阴：每回合限一次，你使用非[伤害]卡牌指定已受伤的目标后，其可以摸两张牌或回复一点体力；";
			        var str3="阳:每回合限一次，其他角色使用[伤害]卡牌指定你为目标时，你可以扣置一张[伤害]卡牌，其猜测此牌牌名，若错，你可以移除此牌的一个目标。";
			        if(player.storage.xjzh_huoying_xianzhang){
						str2='<span class="bluetext">'+str2+'</span>';
					}
					else{
						str3='<span class="bluetext">'+str3+'</span>';
					}
					return str0+str1+"<br><li>"+str2+"<br><li>"+str3;
			    },
			},
			translate:{
				"xjzh_huoying_mingren":"漩涡鸣人",
				"xjzh_huoying_liudaomingren":"六道鸣人",
				"xjzh_huoying_zuozhu":"宇智波佐助",
				"xjzh_huoying_liudaozuozhu":"六道佐助",
				"xjzh_huoying_liudaomingrenfs":"影分身",
				"xjzh_huoying_dou":"药师兜",
				"xjzh_huoying_kakaxi":"旗木卡卡西",
				"xjzh_huoying_zhishui":"宇智波止水",

				"xjzh_huoying_fenshen":"分身",
				"xjzh_huoying_fenshen_info":"<b><font color=orange>〖影分身之术〗</font><b>出牌阶段，你可以与一名角色拼点，若你赢，你可以再次发动该技能且本回合选择目标+1（最多为3），然后你摸一张牌",
				"xjzh_huoying_luoxuan":"螺旋",
				"xjzh_huoying_luoxuan_info":"<b><font color=orange>〖螺旋手里剑〗</font><b>出牌阶段限一次，你可以将一张牌当做任意一张普通锦囊牌使用。",
				"xjzh_huoying_xianshu":"仙术",
				"xjzh_huoying_xianshu_info":"<b><font color=orange>〖仙人模式〗</font><b>游戏开始时，你获得3个仙术查克拉，之后每隔3分钟获得一个仙术查克拉，至多3个，当你失去最后一张手牌时，你可以消耗一个仙术查克拉，将手牌补至体力上限。",
				"xjzh_huoying_zuidun":"嘴遁",
				"xjzh_huoying_zuidun_info":"<b><font color=orange>〖最强嘴遁〗</font><b>限定技，每局游戏限2次，当一名角色濒死时，若你与其均不为主公，你可以令其选择一项：将所有手牌交给你，然后立即阵亡；失去所有技能然后改变身份与你一致。技能结算后，其恢复一点体力，你失去一点体力上限，然后你与其各摸x张牌（x为你与其体力差）（限身份模式和国战模式）",
				"xjzh_huoying_kaigua":"开挂",
				"xjzh_huoying_kaigua_info":"<b><font color=orange>〖开挂封号〗</font><b>觉醒技，当你濒死时，你使用自己的外挂并进入〖六道模式〗<br><br><b><font color=orange>〖六道模式〗</font><b>你将你的的体力上限改为为2并回复体力至体力上限，然后重置武将牌和判定区，技能结算后，你失去技能〖分身〗、〖仙术〗、〖嘴遁〗，获得技能〖螺旋手里剑〗、〖阴阳遁术〗、〖多重·影分身之术〗。",
				"xjzh_huoying_dunshu":"遁术",
				"xjzh_huoying_dunshu_info":"<li><b><font color=orange>〖阳遁术〗</font><b>：你的回合外，你的体力流失视为体力回复，你受到伤害视为摸等量牌，你无视负面效果<li><b><font color=orange>〖阴遁术〗</font><b>：你的回合内，你的体力回复会令你的伤害+1，回合结束时减少一点体力。",
				/*"xjzh_huoying_liudaofenshen":"分身",
				"xjzh_huoying_liudaofenshen_info":"<b><font color=orange>〖多重·影分身之术〗</font><b>限定技，锁定技，你的回合内，你可以召唤两个分身（该分身不拥有“分身”技能且体力值为你的一半,此技能仅限身份模式）",*/
				"xjzh_huoying_liudaofenshen":"分身",
				"xjzh_huoying_liudaofenshen_info":"<b><font color=orange>〖多重·影分身之术〗</font><b>结束阶段，你可以召唤一个分身代替你的本体存于场上直到其阵亡或你的回合开始（该分身拥有2点体力、两张手牌和技能〖遁术〗）",
				"xjzh_huoying_liudaofenshen1":"分身",
				"xjzh_huoying_qiling":"麒麟",
				"xjzh_huoying_qiling_info":"<b><font color=orange>〖雷遁·麒麟〗</font><b>锁定技，你使用红色牌造成伤害均视为火焰伤害，你使用黑色牌造成伤害均视为雷电伤害，当你至少造成3点火焰伤害和1点雷电伤害后，你可以指定一名不为你的角色，令其受到x点雷电伤害(x为你与其体力差，至少为1)",
				"xjzh_huoying_qiling_huo":"火遁",
				"xjzh_huoying_qiling_lei":"雷遁",
				"xjzh_huoying_qianniao":"千鸟",
				"xjzh_huoying_qianniao_info":"<b><font color=orange>〖雷遁·千鸟〗</font><b>使命技，你的回合开始和结束时，你可以视为对你攻击范围内的一个目标使用一张【杀】，该【杀】花色随机且不计入出牌次数，若其闪避了此【杀】，你摸一张牌；其他角色回合开始时，若其手牌数和体力值不等，其可以视为对你使用一张【杀】，若你闪避了此【杀】，你摸一张牌；你因此技能造成／受到伤害获得／失去一个“瞳”标记，第二轮开始前，若你的武将牌上有“瞳”标记，你进入〖六道模式〗，否则你摸两张牌<br><br><b><font color=orange>〖六道模式〗</font><b>你将你的的体力上限改为为2并回复体力至体力上限，然后摸一张牌并重置武将牌和判定区，技能结算后，你获得技能〖瞳术〗。",
				"xjzh_huoying_tongshu":"瞳术",
				"xjzh_huoying_tongshu_info":"<b><font color=orange>〖天手力〗</font><b>当你造成伤害时，你可以与其交换位置，若如此做，你代替其受到伤害。当你受到不由你造成的伤害时，你可以与其交换位置，若如此做，视为对其使用一张无次数限制的【杀】，若该【杀】造成了伤害，则你免疫本次伤害，否则该伤害+1<br><br><b><font color=orange>〖炎遁·加具土命〗</font><b>出牌阶段限一次，你指定一名角色令其获得一个“炎”标记直到其受到你的伤害或其下个回合开始时，你与其计算距离始终为1。",
				"xjzh_huoying_tongshu1":"天手力",
				"xjzh_huoying_tongshu2":"天手力",
				"xjzh_huoying_tongshu3":"炎遁",
				"xjzh_huoying_xianzhang":"仙掌",
				"xjzh_huoying_xianzhang_info":"<b><font color=orange>〖掌仙术〗</font><b>转换技<br><li>阴：每回合限一次，你使用非[伤害]卡牌指定目标后，其可以摸两张牌或回复一点体力；<br><li>阳:每回合限一次，其他角色使用[伤害]卡牌指定你为目标时，你可以扣置一张[伤害]卡牌，其猜测此牌牌名，若错，你可以移除此牌的一个目标。",
				"xjzh_huoying_sihun":"死魂",
				"xjzh_huoying_sihun_info":"<b><font color=orange>〖死魂之术〗</font>限定技，当你濒死时，若场上有已阵亡的角色，你回复x点体力然后摸x张牌，然后令其中随机一个角色复活，复活后其失去所有技能并改变身份、势力与你一致，其拥有2点体力且无法使用、打出牌(x为场上已阵亡的角色数量)。",
				"xjzh_huoying_chuanyi":"传异",
				"xjzh_huoying_chuanyi_info":"<b><font color=orange>〖仙法·传异远影〗</font>当你击败一名角色后，你可以弃置x+1张牌获得其武将牌上的一个技能(x为1，每当你以此技能获得技能后，该数字+1)",
				"xjzh_huoying_kaobei":"拷贝",
				"xjzh_huoying_kaobei_info":"<b><font color=orange>〖复制忍术〗</font>每回合限一次，其他角色发动技能后，若你有“雷”且该技能符合条件，你可以弃置一张“雷”于合适的时机发动一次相应的技能。",
				"xjzh_huoying_shenwei":"神威",
				"xjzh_huoying_shenwei_info":"<b><font color=orange>〖神威〗</font>游戏开始时，你观看牌堆顶7张牌，并将其中4张置于武将牌上称为“雷”；一轮游戏开始时，若当前轮数为奇数，你获得牌堆随机4张牌；当你濒死时，你可以弃置所有“雷”并选择一名角色，然后你选择执行：1，其获得所有“雷”；2，其需弃置任意张点数不小于“雷”的牌，不足则全弃，否则其失去所有体力。",
				"xjzh_huoying_leiqie":"雷切",
				"xjzh_huoying_leiqie_info":"<b><font color=orange>〖雷切〗</font>出牌阶段限一次，你可以交换“雷”和手牌中的任意张牌，然后对一名角色随机发动以下效果：1，其与场上随机一名角色交换位置，直到其下个回合结束前，其不可打出或使用[伤害]卡牌；2，其受到一点雷电伤害，然后其跳过下个出牌阶段。",
				"xjzh_huoying_bietian":"别天",
				"xjzh_huoying_bietian_info":"<b><font color=orange>〖别天神〗</font>本局游戏限两次，出牌阶段，你可以选择一名其他角色，此后的对局中，其摸牌阶段额外摸两张牌且你接管其出牌阶段；若你无法发动该技能，你禁用〖须佐〗。",
				"xjzh_huoying_shunshen":"瞬身",
				"xjzh_huoying_shunshen_info":"<b><font color=orange>〖瞬身术〗</font>当你受到伤害时，你可以弃置一张牌与其交换位置，若此时其手牌区有牌，你获得其一张手牌，然后你可以使用这张牌，若此牌为【闪】，你可以弃置此牌防止该伤害。",
				"xjzh_huoying_xuzuo":"须佐",
				"xjzh_huoying_xuzuo_info":"<b><font color=orange>〖须佐能乎〗</font>锁定技，当你至少发动一次〖别天〗后，你每发动一次〖瞬身〗获得一点护甲；当你使用【杀】造成伤害时，你可以移除所有护甲令此牌伤害+x（x为你移除的护甲数量）。",

				"XWDM_huoying":"火影忍者",
			},
		};
		if(true){
			for(var i in XWDM.character){
				//阵亡配音
				XWDM.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWDM.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWDM.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(var i in XWDM.character){
				XWDM.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
		return XWDM;
	});
});