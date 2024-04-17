'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('XWCS')) lib.config.characters.remove('XWCS');
		lib.translate['XWCS_character_config']='仙武创世';
		var XWCS={
			name:'XWCS',
			connect:true,
			connectBanned:[],
			characterSort:{
				XWCS:{
					"XWCS_meiren":["xjzh_meiren_linshuang","xjzh_meiren_gaoyu","xjzh_meiren_zhaoyushu","xjzh_meiren_linjiasheng","xjzh_meiren_wuyufeng","xjzh_meiren_huangyuke","xjzh_meiren_xiangwanru","xjzh_meiren_huangdanxue"],
					"XWCS_qixia":["xjzh_qixia_mumuxiao","xjzh_qixia_maybe","xjzh_qixia_daxiongxiaomao"],
				},
			},
			character:{
			    //美女如云
				"xjzh_meiren_linshuang":["female","qun",4,["xjzh_meiren_qingquan","xjzh_meiren_hanshuang"],[]],
				"xjzh_meiren_gaoyu":["female","qun",3,["xjzh_meiren_juese","xjzh_meiren_xiuya","xjzh_meiren_shumei"],[]],
				"xjzh_meiren_zhaoyushu":["female","qun",3,["xjzh_meiren_chunxiao","xjzh_meiren_jingzhuang","xjzh_meiren_lunzhuan"],[]],
				"xjzh_meiren_linjiasheng":["female","qun",3,["xjzh_meiren_ganling","xjzh_meiren_miaofa"],[]],
				"xjzh_meiren_wuyufeng":["female","qun",3,["xjzh_meiren_meihun","xjzh_meiren_tianzi","xjzh_meiren_huoxin"],[]],
				"xjzh_meiren_huangyuke":["female","qun",3,["xjzh_meiren_huizhi","xjzh_meiren_lanxin","xjzh_meiren_gupan"],[]],
				"xjzh_meiren_xiangwanru":["female","qun",3,["xjzh_meiren_rouqing","xjzh_meiren_jiaqi","xjzh_meiren_huimeng","xjzh_meiren_xianyou"],[]],
				"xjzh_meiren_huangdanxue":["female","qun",3,["xjzh_meiren_zhongqing","xjzh_meiren_yiqing","xjzh_meiren_shangqing"],[]],
			    
			    //天命奇侠
			    "xjzh_qixia_daxiongxiaomao":["male","qun",3,["xjzh_qixia_qice","xjzh_qixia_tianshu","xjzh_qixia_xiongmao"],[]],
			    "xjzh_qixia_maybe":["male","qun",6,["xjzh_qixia_jiyuan","xjzh_qixia_jibian"],[]],
			    "xjzh_qixia_mumuxiao":["male","qun",3,["xjzh_qixia_tubian"],[]],
			    
			},
			characterIntro:{
			    //美女如云
				"xjzh_meiren_linshuang":"",
				"xjzh_meiren_gaoyu":"",
				"xjzh_meiren_zhaoyushu":"",
				"xjzh_meiren_linjiasheng":"",
				"xjzh_meiren_wuyufeng":"",
				"xjzh_meiren_huangyuke":"",
				"xjzh_meiren_xiangwanru":"",
				"xjzh_meiren_huangdanxue":"",
				
				//天命奇侠
				"xjzh_qixia_daxiongxiaomao":"",
				"xjzh_qixia_maybe":"",
				"xjzh_qixia_mumuxiao":""
				
			},
			characterTitle:{
			    //美女如云
				"xjzh_meiren_linshuang":"凛冬已至",
				"xjzh_meiren_gaoyu":"绝色倾国",
				"xjzh_meiren_zhaoyushu":"对镜红妆",
				"xjzh_meiren_linjiasheng":"甘霖如瀑",
				"xjzh_meiren_wuyufeng":"天姿绰约",
				"xjzh_meiren_huangyuke":"蕙质兰心",
				"xjzh_meiren_xiangwanru":"婉如清扬",
				"xjzh_meiren_huangdanxue":"伤情别恋",
				
				//天命奇侠
				"xjzh_qixia_daxiongxiaomao":"无字天书",
				"xjzh_qixia_maybe":"侠肝义胆",
				"xjzh_qixia_mumuxiao":"颖悟绝伦",
				
			},
			perfectPair:{
			},
			characterFilter:{
				'xjzh_meiren_huangdanxue':function(mode){
					return true;
				},
			},
			skill:{
			    //美女如云
				"xjzh_meiren_qingquan":{
				    trigger:{
				        player:"recoverAfter",
				    },
				    forced:true,
				    priority:-2,
				    group:["xjzh_meiren_qingquan_use"],
				    content:function(){
				        var num=player.storage.xjzh_sanguo_hanshuang==false?1:2;
				        player.changeHujia(num);
				    },
				    subSkill:{
				        "use":{
				            enable:"phaseUse",
				            sub:true,
				            filterTarget:function(card,player,target){
				                return player!=target;
				            },
				            filter:function(event,player){
				                return player.hujia>0;
				            },
				            content:function(){
				                "step 0"
				                var num=player.hujia;
				                var list=[];
				                for(var i=1;i<=num;i++){
				                    list.push(i);
				                }
				                player.chooseControl(list).set('ai',function(){
				                    return list.randomGet();
				                });
				                "step 1"
				                if(result.control){
				                    player.changeHujia(-result.control);
				                    target.changeHujia(result.control);
				                }
				            },
				        },
				        ai:{
				            order:6,
				            result:{
				                player:-1,
				                target:1,
				            },
				        },
				    },
				    ai:{
				        pretao:true,
				        nokeep:true,
				        skillTagFilter:function(player,tag,arg){
							if(tag=='nokeep'){
								if(player==arg){
									if(player.countCards('h','tao')) return true;
								}
							};
							return false;
						},
				    },
				},
				"xjzh_meiren_hanshuang":{
				    trigger:{
				        player:"dieBegin",
				    },
					forced:true,
					locked:true,
					unique:true,
					juexingji:true,
					limited:true,
					skillAnimation:true,
					animationColor:'water',
					animationStr:"凛冬已至",
					init:function(player,skill){
					    player.storage[skill]=false;
					},
					filter:function(event,player){
					    return !player.storage.xjzh_meiren_hanshuang;
					},
					derivation:['xjzh_meiren_lingdong'],
					content:function (){
						"step 0"
						player.awakenSkill("xjzh_meiren_hanshuang");
						player.storage.xjzh_sanguo_hanshuang=true;
						"step 1"
						trigger.cancel();
						player.loseMaxHp();
						player.recoverTo(1);
				        player.addSkillLog("xjzh_meiren_lingdong");
				    },
				},
				"xjzh_meiren_lingdong":{
				    trigger:{
				        global:"recoverAfter",
				    },
				    forced:true,
				    priority:-2,
				    group:["xjzh_meiren_lingdong_ice","xjzh_meiren_lingdong_phase"],
				    filter:function(event,player){
				        return event.player!=player;
				    },
				    content:function(){
				        player.changeHujia();
				    },
				    subSkill:{
				        "ice":{
				            trigger:{
				                source:"damageBegin",
				            },
				            direct:true,
				            sub:true,
				            priority:3,
				            filter:function(event,player){
				                if(game.hasNature(event,"ice")) return false;
				                return true;
				            },
				            content:function(){
				                game.setNature(trigger,'ice',false);
				                var evt=event.getParent('damage');
				                var next=game.createEvent('xjzh_meiren_lingdong_after',false,evt.getParent());
				                next.player=trigger.player;
				                next.setContent(function(){
				                    if(Math.random()<=Math.random()) player.changexjzhBUFF('binghuan',1);
				                });
				            },
				        },
				        "phase":{
				            trigger:{
				                player:"phaseBegin",
				            },
				            direct:true,
				            sub:true,
				            priority:3,
				            filter:function(event,player){
				                var num=game.countPlayer(function(current){
				                    return current!=player&&get.xjzhBUFFNum(current,'binghuan')>0;
				                });
				                return num==game.players.length-1;
				            },
				            content:function(){
				                var targets=game.filterPlayer(function(current){
				                    return current!=player&&get.xjzhBUFFNum(current,'binghuan')>0;
				                });
				                for(var target of targets){
				                    var num=get.xjzhBUFFNum(target,'binghuan');
				                    target.damage(num,player,'ice','nocard')._triggered=null;
				                    target.changexjzhBUFF('binghuan',-num);
				                }
				            },
				        },
				    },
				},
				"xjzh_meiren_ganling":{
				    trigger:{
				        player:["damageBegin1","dieBegin","loseHpBegin","loseMaxHpBegin"],
				        target:"useCardToBefore",
				    },
					forced:true,
					locked:true,
					priority:5,
					filter:function(event,player){
					    if(event.name=="damage"&&event.num>0) return true;
					    if(event.name=="die"&&player.hp>0) return true;
					    if(["loseHp","loseMaxHp"].includes(event.name)&&_status.currentPhase!=player) return true;
					    if(event.targets&&event.targets.includes(player)&&event.card&&get.type(event.card)=='delay'&&event.card.isCard) return true;
					    return false;
					},
					content:function(){
					    "step 0"
					    trigger.cancel(null,null,'notrigger');
					    "step 1"
					    if(trigger.targets&&trigger.targets.includes(player)&&get.type(trigger.card)=='delay'&&trigger.card.isCard){
					        player.gain(game.createCard(trigger.card),'gain2');
							game.log(player,'获得了'+get.translation(trigger.card)+'');
					    }
					    "step 2"
					    switch(trigger.name){
					        case "damage":
					            game.log("你防止受到所有伤害");
					        break;
					        case "loseMaxHp":
					            game.log(player,'的回合外无法失去体力上限');
					        break;
					        case "loseHp":
					            game.log(player,'的回合外无法失去体力');
					        break;
					        case "die":
					            game.log(player,'防止非正常阵亡');
					        break;
					    };
					},
					ai:{
						nofire:true,
						nothunder:true,
						nodamage:true,
						threaten:0.8,
						effect:{
							target:function (card,player,target){
								if(!target.hasFriend()) return;
								if(get.tag(card,'damage')) return [0,0];
								//if(get.tag(card,'loseHp')) return [0,0];
								if(player.hasSkillTag('jueqing',false,target)) return [0,0];
								if(card&&get.type(card)=="delay"){
									if(player==target) return 0;
									return [0,1];
								};
								return [1,-1];
							},
						},
					},
				},
				"xjzh_meiren_miaofa":{
					audio:"ext:仙家之魂/audio/skill:4",
					trigger:{
						player:"phaseZhunbeiBegin",
						global:"gameDrawBegin",
					},
					forced:true,
					locked:true,
					unique:true,
					priority:11,
					bannedList:[
					    "xjzh_meiren_linjiasheng",
					    "xjzh_sanguo_zuoci",
					    "xjzh_sanguo_zhongda",
					    "xjzh_sanguo_chunhua",
					    "xjzh_meiren_huangyuke",
					    "xjzh_sanguo_zhaoyun",
					    "xjzh_boss_zuoyou",
					    "xjzh_boss_mianhuatang"
					],
					bannedList2:[
					    "xjzh_poe_choice",
					    "xjzh_poe_choice2",
					    "xjzh_dnf_levelUp",
					],
					init:function(player){
						player.storage.xjzh_meiren_miaofa=[]
						lib.skill.xjzh_meiren_miaofa.getSkillList(player);
					},
					getSkillList:function(player){
						var list=[];
						var list2=[];
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							list2.add(players[i].name);
							list2.add(players[i].name1);
							list2.add(players[i].name2);
						}
						for(var i in lib.character){
							if(list2.includes(i)||lib.skill.xjzh_meiren_miaofa.bannedList.includes(i)) continue;
							if(i.indexOf('xjzh_boss_')!=-1) continue;
							if(i.indexOf('xjzh_diablo_')!=-1) continue;
							if(i.indexOf('xjzh_')==0){
								for(var j=0;j<lib.character[i][3].length;j++){
									if(lib.skill[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]+'_info']){
										var info=lib.skill[lib.character[i][3][j]];
										if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill&&!lib.skill.xjzh_meiren_miaofa.bannedList2.includes(lib.character[i][3][j])){
											if(!lib.skill.global.includes(lib.character[i][3])&&!info.nogainsSkill) list.add(lib.character[i][3][j]);
										}
									}
								}
							}
						}
						player.storage.xjzh_meiren_miaofa.addArray(list);
					},
					content:function (){
						"step 0"
						var list=player.storage.xjzh_meiren_miaofa.slice(0);
						var skills=player.skills.slice(0);
						for(var i=0;i<skills.length;i++){
							list.remove(skills[i]);
						}
						if(list.length>2){
							event.skills=list.randomGets(2);
						}else{
							var link=list[0];
							player.addSkill(link);
							game.log(player, '获得技能', '〖' + get.translation(link) + '〗');
							event.goto(3);
						}
						"step 1"
						if(event.isMine()){
							var dialog=ui.create.dialog('forcebutton');
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
						player.chooseControl(event.skills).set('prompt','请选择一个技能获得之').set('ai',function(){
	    		            return event.skills.randomGet();
						}).set('dialog',dialog);
						"step 2"
						if(result&&result.control){
							player.addSkill(result.control);
							game.log(player, '获得技能', '〖' + get.translation(result.control) + '〗');
						}
						"step 3"
						player.loseHp();
						player.draw();
						player.update();
					},
				},
				"xjzh_meiren_juese":{
					enable:"phaseUse",
					filterCard:function(card,player,target){
					    if(!game.hasPlayer(function(current){return current.hasSex('male')})) return get.color(card)=="red";
					    if(!game.hasPlayer(function(current){return current!=player&&current.hasSex('female')})) return get.color(card)=="black";
					    return true;
					},
					usable:1,
					filter:function(event,player){
						if(player.countCards('h')==0) return false;
						return true;
					},
					filterTarget:function (card,player,target){
					    if(get.color(card)=='red') return target.hasSex('female')&&player!=target;
					    if(get.color(card)=='black') return target.hasSex('male');
						return false;
					},
					content:function (){
						switch(get.color(cards[0])){
							case 'black':
							var n=[1,2].randomGet();
							if(n==1){
							    if(target.countCards('he')<=1){
							        player.draw(2);
							    }else{
							        target.chooseToDiscard(2,'he',true);
							    }
							}else{
							    target.addTempSkill('baiban',{player:'phaseEnd'});
							}
							break;
							case 'red':
							var n=[1,2].randomGet();
							if(n==1){
							    if(target.isDamaged()){
							        target.recover();
							    }else{
							        player.getStat().skill.xjzh_meiren_juese-=1;
							    }
							}else{
							    target.draw(2);
							}
							break;
						}
					},
					ai:{
					    expose:0.4,
					    threaten:3,
					    result:{
						    target:function(player,target){
						        var card=ui.selected.cards[0]
						        var att=get.attitude(player,target);
						        var colorx=get.color(card);
						        if(colorx=="red") return att;
						        return -att;
							},
							player:1,
						}
					},
				},
				"xjzh_meiren_xiuya":{
					trigger:{
						player:["chooseToRespondBegin","chooseToUseBegin"],
					},
					forced:true,
					locked:true,
					popup:false,
					max:3,
					priority:29,
					filter:function (event,player){
						return _status.currentPhase!=player;
					},
					content:function (){
						var cards=[];
						var max=Math.min(ui.cardPile.childNodes.length,lib.skill.xjzh_meiren_xiuya.max);
						for(var i=0;i<max;i++){
							var card=ui.cardPile.childNodes[i];
							if(trigger.filterCard(card,player,trigger)){
								cards.push(card);
							}
						}
						if(cards.length){
							player.gain(cards,'draw');
							player.logSkill('xjzh_meiren_xiuya');
						}
					},
					ai:{
						respondSha:true,
						respondShan:true,
						effect:{
							target:function (card,player,target,effect){
								if(get.tag(card,'respondShan')) return 0.7;
								if(get.tag(card,'respondSha')) return 0.7;
							},
						},
					},
					hiddenCard:function (player,name){
						if(_status.currentPhase==player) return false;
						var max=Math.min(ui.cardPile.childNodes.length,lib.skill.xjzh_meiren_xiuya.max);
						for(var i=0;i<max;i++){
							var card=ui.cardPile.childNodes[i];
							if(card.name==name) return true;
						}
						return false;
					},
				},
				"xjzh_meiren_shumei":{
					trigger:{
						player:"damageEnd",
					},
					audio:"ext:仙家之魂/audio/skill:4",
					priority:20,
					check:function(event,player){return 1;},
					init:function(player){
					    player.storage.xjzh_meiren_shumei=[]
					    lib.skill.xjzh_meiren_shumei.getSkillList(player);
					},
					getSkillList:function(player){
						var list=[];
						var list2=[];
						var players=game.players.concat(game.dead);
						for(var i=0;i<players.length;i++){
							list2.add(players[i].name);
							list2.add(players[i].name1);
							list2.add(players[i].name2);
						}
						for(var i in lib.character){
							if(list2.includes(i)) continue;
							for(var j=0;j<lib.character[i][3].length;j++){
								if(lib.skill[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]+'_info']){
									var info=lib.skill[lib.character[i][3][j]];
									if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill){
										list.add(lib.character[i][3][j]);
									}
								}
							}
						}
						var skills=player.skills.slice(0);
						for(var i=0;i<skills.length;i++){
							list.remove(skills[i]);
						}
						player.storage.xjzh_meiren_shumei.addArray(list);
					},
					content:function (){
						"step 0"
						event.num=player.getHistory('damage').length;
						"step 1"
						if(event.num<=0){
						    event.finish();
						    return;
						}
						player.chooseControlList(get.prompt(event.name,trigger.source),[
						    '选择一个目标令其获得一个技能并摸一张牌',
						    '令'+get.translation(trigger.source)+'弃置一张牌然后你摸两张牌',
					    ],function(){
					        if(player.countCards('h')>3||trigger.source.countCards('h')<3) return 0;
							return 1;
						});
						"step 2"
						if(result.control){
						    if(result.index==2){
						        event.finish();
						        return;
						    }
						    if(result.index==0){
							    player.chooseTarget('淑美：选择一个目标令其获得一个技能',true).set('ai',function(target){
							        return get.attitude(player,target);
							    });
						    }else{
							    player.draw(3);
							    trigger.source.chooseToDiscard("he",true);
						    }
						}
						"step 3"
						if(result.bool&&result.targets.length){
							var list=player.storage.xjzh_meiren_shumei.slice(0)
							var link=list.randomGet();
							player.line(result.targets[0],'green');
							result.targets[0].addSkill(link);
							result.targets[0].mark(link,{
								name:get.translation(link),
								content:lib.translate[link+'_info']
							});
							game.log(result.targets[0],'获得技能','〖'+get.translation(link)+'〗');
						    result.targets[0].draw();
						}
						"step 4"
						event.num-=1
						event.goto(1)
					},
					ai:{
						expose:0.3,
						maixie:true,
						effect:{
							target:function (card,player,target){
								if(!target.hasFriend()) return;
								if(get.tag(card,'damage')){
									if(player.hasSkillTag('jueqing',false,target)) return [1,0];
									return 0.8;
								}
							},
						},
					},
				},
				"xjzh_meiren_jingzhuang":{
					audio:"ext:仙家之魂/audio/skill:2",
					forced:true,
					locked:true,
					trigger:{
						player:"damageBegin3",
					},
					content:function (){
						"step 0"
						event.dialog=ui.create.dialog(get.translation(player)+'<span style=\"color: red\">正在照镜子</span>...');
						event.videoId=lib.status.videoId++;
						game.broadcast('createDialog',event.videoId,get.translation(player)+'<span style=\"color: red\">正在照镜子</span>...');
						game.delay(3);
						"step 1"
						event.dialog.close();
						var n=[1,2,3].randomGet();
						if(n==1){
							event.dialog=ui.create.dialog(get.translation(player)+'<span style=\"color: red\">被自己美到了</span>...');
							event.videoId=lib.status.videoId++;
							game.broadcast('createDialog',event.videoId,get.translation(player)+'<span style=\"color: red\">被自己美到了</span>...');
							trigger.num++
							game.delay();
						};
						if(n==2){
							event.dialog=ui.create.dialog(get.translation(trigger.source)+'<span style=\"color: red\">被你美到了</span>...');
							event.videoId=lib.status.videoId++;
							game.broadcast('createDialog',event.videoId,get.translation(trigger.player)+'<span style=\"color: red\">被你美到了</span>...');
							trigger.changeToZero();
							if(trigger.source) trigger.source.damage();
							game.delay();
						};
						if(n==3){
							event.dialog=ui.create.dialog(get.translation(player)+'<span style=\"color: red\">动用了自己的美色</span>...');
							event.videoId=lib.status.videoId++;
							game.broadcast('createDialog',event.videoId,get.translation(player)+'<span style=\"color: red\">动用了自己的美色</span>...');
							player.draw(2);
							game.delay();
						};
						"step 2"
						event.dialog.close();
					},
				},
				"xjzh_meiren_lunzhuan":{
					forced:true,
					locked:true,
					marktext:"轮",
					intro:{
						name:"轮转",
						content:"已复活#次，至多3次",
					},
					group:["xjzh_meiren_lunzhuan_lose","xjzh_meiren_lunzhuan_dying"],
					mod:{
						maxHandcard:function (player,num){
							return player.maxHp;
						},
					},
					trigger:{
						player:"dieBefore",
					},
					filter:function (event,player){
						return player.maxHp>1&&player.countMark("xjzh_meiren_lunzhuan")<3;
					},
					content:function (){
						'step 0'
						trigger.cancel();
						player.addMark("xjzh_meiren_lunzhuan",1);
						player.$fullscreenpop('轮回之术','water');
						'step 1'
						player.loseMaxHp();
						player.recoverTo(1);
						player.discard(player.getCards('j'));
						player.draw(player.maxHp);
					},
					subSkill:{
					    "lose":{
					        trigger:{
						        player:"loseEnd",
					        },
					        forced:true,
					        locked:false,
					        sub:true,
					        filter:function (event,player){
						        return Math.random()<=0.35;
					        },
					        content:function (){
						        player.draw();
					        },
					    },
					    "dying":{
					        trigger:{
						        player:"dying",
					        },
					        forced:true,
					        locked:false,
					        sub:true,
					        filter:function (event,player){
						        return Math.random()<=0.3;
					        },
					        content:function (){
						        player.$fullscreenpop('天降甘霖','water');
						        player.recover();
					        },
					    },
					},
				},
				"xjzh_meiren_chunxiao":{
					audio:"ext:仙家之魂/audio/skill:1",
					trigger:{
						player:"damageEnd",
						source:"damageEnd",
					},
					forced:true,
					locked:true,
					priority:99,
					unique:true,
					marktext:"春",
					intro:{
					    name:"春宵",
					    content:"受到赵玉姝造成的伤害时有50%几率令其获得一点体力上限",
					},
					mod:{
						globalFrom:function(from,to,distance){
						    if(game.countPlayer(function(current){
						        return current.hasMark("xjzh_meiren_chunxiao");
						    })) return -Infinity;
							return distance;
						}
					},
					content:function (){
						'step 0'
						if(!trigger.source||trigger.nosource||(trigger.source&&trigger.source!=player)){
						    player.say('春宵一刻值千金');
						    player.draw();
						}
						else if(trigger.source&&trigger.source==player&&trigger.player!=player){
						    var num=0.35;
						    if(trigger.source.hasMark("xjzh_meiren_chunxiao")) num*=2;
						    if(Math.random()<=num){
						        player.$fullscreenpop('春宵苦短','water');
						        player.gainMaxHp();
						        player.draw();
						        if(trigger.source.hasMark("xjzh_meiren_chunxiao")){
						            trigger.source.chooseToDiscard(1,'he',true);
						            trigger.source.removeMark("xjzh_meiren_chunxiao",1,false);
						        }
						    }
						}
						'step 1'
						if(!trigger.source||trigger.nosource) return;
						if(!trigger.source.hasMark("xjzh_meiren_chunxiao")&&trigger.source!=player) trigger.source.addMark("xjzh_meiren_chunxiao",1,false);
					},
				},
				/*"xjzh_meiren_xianyin":{
				forced:true,
				locked:true,
				group:["xjzh_meiren_xianyin1","xjzh_meiren_xianyin2"],
				},
				"xjzh_meiren_xianyin1":{
				audio:"ext:仙家之魂/audio/skill:2",
				trigger:{
				source:"damageBegin",
				},
				filter:function (event,player){
				return event.card.name!='sha';
				},
				sub:true,
				check:function (event,player){
				if(get.attitude(player,event.player)<0||(player.hp>2&&player.countCards('h')>player.hp)) return false;
				return true;
				},
				prompt:"终止此次伤害结算，改为摸x+1张牌(x为你本次造成的伤害点数)",
				content:function (){
				'step 0'
				trigger.untrigger();
				trigger.finish();
				"step 1"
				player.draw(trigger.num+1);
				},
				ai:{
				expose:0.4,
				},
				},
				"xjzh_meiren_xianyin2":{
				audio:"ext:仙家之魂/audio/skill:1",
				trigger:{
				player:"damageBegin",
				},
				sub:true,
				check:function (event,player){
				if(player.hp>2&&player.countCards('h')<=2) return false;
				return true;
				},
				filter:function (event,player){
				return player.countCards('h')>=2;
				},
				prompt:"弃置x+1张牌防止受到伤害(x为你本次受到的伤害点数)",
				content:function (){
				"step 0"
				player.chooseToDiscard('h','仙音：弃置x+1张牌防止此次伤害(x为你即将受到的伤害)',trigger.num+1).set('ai',function(card){
				return 10-get.value(card);
				}).set('logSkill','xjzh_meiren_xianyin2');
				"step 1"
				if(result.bool){
				trigger.untrigger();
				trigger.finish();
				}
				else{
				event.finish();
				}
				},
				},
				"xjzh_meiren_lengyan":{
				forced:true,
				locked:true,
				trigger:{
				target:"useCardToBefore",
				},
				filter:function (event,player){
				return (get.type(event.card)=='delay'||get.type(event.card)=='trick')&&event.player!=player;
				},
				content:function (){
				"step 0"
				if(trigger.player!=player){
				var n=[1,2,3,4].randomGet();
				if(n==1){
				trigger.player.link(true);
				trigger.player.damage('fire');
				};
				if(n==2){
				player.gain(trigger.cards);
				player.$gain2(trigger.cards);
				};
				if(n==3){
				player.useCard(game.createCard('lebu'),trigger.player);
				};
				if(n==4){
				player.useCard(game.createCard('bingliang'),trigger.player);
				};
				}
				"step 1"
				player.draw();
				},
				},*/
				"xjzh_meiren_meihun":{
					trigger:{
						target:'useCardToTargeted',
					},
					forced:true,
					locked:true,
					group:"xjzh_meiren_meihun2",
					filter:function(event,player){
						if(!get.tag(event.card,'damage')) return false;
						return game.hasPlayer(function(current){
							return current!=player&&current.countCards('h');
						});
					},
					content:function(){
						'step 0'
						player.chooseTarget(get.prompt2('xjzh_meiren_meihun'),function(card,player,target){
							return target!=player&&target.countCards('h')>0;
						})
						.set('ai',function(target){
							var player=_status.event.player;
							var att=get.attitude(player,target);
							if(att>0) return 0;
							return 0.1-att/target.countCards('h');
						});
						'step 1'
						if(result.bool){
							var target=result.targets[0];
							player.logSkill('xjzh_meiren_meihun',target);
							event.target=target;
							player.chooseControl(lib.suit).set('prompt','请选择一种花色').set('ai',function(){
								return lib.suit.randomGet();
							})
						}
						else event.finish();
						'step 2'
						var suit=result.control;
						player.chat(get.translation(suit+2));
						game.log(player,'选择了','#y'+get.translation(suit+2))
						if(target.countCards('h',{
						suit:suit})
						){
							target.chooseCard('h','交给'+get.translation(player)+'一张'+get.translation(suit)+'花色的手牌',true,function(card,player){
								return get.suit(card,player)==_status.event.suit;
							})
							.set('suit',suit);
						}
						else{
							player.discardPlayerCard(target,true,'h','visible');
							event.finish();
						}
						'step 3'
						if(result.bool&&result.cards&&result.cards.length) player.gain(result.cards,target,'give');
					},
				},
				"xjzh_meiren_meihun2":{
					trigger:{
						global:'gainEnd',
					},
					forced:true,
					sub:true,
					filter:function(event,player){
						if(event.source==player&&event.player!=player&&event.cards&&event.cards.length) return event.player.isAlive();
						return false;
					},
					logTarget:function(event,player){
						return event.player;
					},
					content:function(){
						trigger.player.chooseToDiscard('he',trigger.cards.length,true);
					},
				},
				"xjzh_meiren_tianzi":{
					trigger:{
						global:"phaseUseBegin",
					},
					forced:true,
					locked:true,
					unique:true,
					group:"xjzh_meiren_tianzi2",
					filter:function (event,player){
						return player.countCards('h')<=event.player.countCards('h')&&event.player!=player;
					},
					content:function (){
						player.draw();
					},
				},
				"xjzh_meiren_tianzi2":{
					trigger:{
						player:"phaseDrawBegin",
					},
					sub:true,
					filter:function (event, player){
						for(var j=0;j<game.players.length;j++){
							if(player.countCards("h")>=game.players[j].countCards("h")){
								return true;
							}
						}
						return false;
					},
					forced:true,
					content:function (){
						"step 0"
						player.chooseControl('选项一','选项二',function (){
							if(player.hp<=2&&!player.countCards('h',function(card){
								return get.tag(card,'recover');
							})
							) return '选项二';
							return '选项一';
						})
						.set('prompt', '天姿<br><br><div class="text">选项一：失去1点体力</div><br><div class="text">选项二：将手牌调整至与体力一致然后摸体力上限张牌</div></br>');
						"step 1"
						if(result.control=='选项一'){
							player.loseHp();
							event.finish();
						}
						else{
							var num=player.num("h")-player.hp
							if(player.num("h")>player.hp){
								player.chooseToDiscard('h',true,num);
							}
							else{
								player.draw(num);
							}
						}
						"step 2"
						player.draw(player.maxHp);
						"step 3"
						if(player.isMaxHandcard(true)) trigger.cancel();
					},
				},
				"xjzh_meiren_huoxin":{
					enable:'phaseUse',
					usable:1,
					filter:function(event,player){
						if(game.countPlayer()<3) return false;
						return true;
					},
					group:['xjzh_meiren_huoxin_control'],
					complexCard:true,
					selectTarget:2,
					filterTarget:lib.filter.notMe,
					multitarget:true,
					multiline:true,
					delay:false,
					forced:true,
					locked:true,
					targetprompt:['拼点发起人','拼点目标一'],
					content:function(){
						'step 0'
						player.line(targets);
						for(var j=0;j<targets.length;j++){
							if(targets[j].countCards("h")<=0){
								targets[j].draw();
							}
						}
						'step 1'
						if(targets[0].canCompare(targets[1])){
							targets[0].chooseToCompare(targets[1]);
						}
						else event.finish();
						'step 2'
						if(result.winner==targets[0]){
							targets[0].draw();
							targets[1].addMark('xjzh_meiren_huoxin',1);
						}
						else{
							targets[1].draw();
							targets[0].addMark('xjzh_meiren_huoxin',1);
						}
						'step 3'
						player.draw();
					},
					marktext:'魅',
					intro:{
						name:'魅惑',
						name2:'魅惑',
						content:'mark',
					},
					ai:{
						order:1,
						result:{
							target:function(player,target){
								if(target.hasMark('xjzh_meiren_huoxin')) return -2;
								return -1;
							},
						},
					},
				},
				"xjzh_meiren_huoxin_control":{
					forced:true,
					locked:true,
					trigger:{
						global:'phaseBeginStart',
					},
					sub:true,
					filter:function(event,player){
						return player!=event.player&&!event.player._trueMe&&event.player.countMark('xjzh_meiren_huoxin')>=1;
					},
					logTarget:'player',
					skillAnimation:true,
					animationColor:'key',
					content:function(){
						trigger.player.clearMark('xjzh_meiren_huoxin');
						trigger.player._trueMe=player;
						game.addGlobalSkill('autoswap');
						if(trigger.player==game.me){
							game.notMe=true;
							if(!_status.auto) ui.click.auto();
						}
						trigger.player.addSkill('xjzh_meiren_huoxin2');
					},
				},
				"xjzh_meiren_huoxin2":{
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
						player.removeSkill('xjzh_meiren_huoxin2');
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
				"xjzh_meiren_huizhi":{
					unique:true,
					direct:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					priority:99,
					trigger:{
						player:['phaseBegin','phaseEnd','xjzh_meiren_huizhi'],
					},
					filter:function(event,player,name){
						//if(name=='phaseBegin'&&game.phaseNumber==1) return false;
						return player.storage.xjzh_meiren_huizhi&&player.storage.xjzh_meiren_huizhi.character.length>0;
					},
					group:'xjzh_meiren_huizhi2',
					content: function () {
						"step 0"
						_status.noclearcountdown = true;
						event.videoId = lib.status.videoId++;
						var cards = player.storage.xjzh_meiren_huizhi.character.slice(0);
						var selection = player.storage.xjzh_meiren_huizhi.character.slice().randomSort();
						selection.sort(function (a, b) {
							return get.rank(b, true) - get.rank(a, true);
						});
						event.aiChoice = selection[0];
						var choice = '更换技能';
						if (event.aiChoice == player.storage.xjzh_meiren_huizhi.current || get.rank(event.aiChoice, true) < 4) choice = '弃置兰心';
						if (player.isOnline2()) {
							player.send(function (cards, id) {
								var dialog = ui.create.dialog(get.prompt('xjzh_meiren_huizhi'), [cards, 'character']);
								dialog.videoId = id;
							},
							cards, event.videoId);
						}
						event.dialog = ui.create.dialog(get.prompt('xjzh_meiren_huizhi'), [cards, 'character']);
						event.dialog.videoId = event.videoId;
						if (!event.isMine()) {
							event.dialog.style.display = 'none';
						}
						if (event.triggername == 'xjzh_meiren_huizhi') {
							event._result = {
							control: '更换武将' };
						}
						else {
							player.chooseControl('弃置兰心', '更换武将', 'cancel2').set('ai', function () {
								return _status.event.choice;
							})
							.set('choice', choice);
						}
						"step 1"
						event.control = result.control;
						if (event.control=='cancel2') {
							if (player.isOnline2()) {
								player.send('closeDialog', event.videoId);
							}
							delete _status.noclearcountdown;
							if (!_status.noclearcountdown) {
								game.stopCountChoose();
							}
							event.dialog.close();
							event.finish();
							return;
						}
						if (!event.logged) {
							player.logSkill('xjzh_meiren_huizhi');
						event.logged = true }
						var next = player.chooseButton(true).set('dialog', event.videoId);
						next.set('current', player.storage.xjzh_meiren_huizhi.current);
						next.set('filterButton', function (button) {
							return button.link != _status.event.current;
						});
						if (event.control == '弃置兰心') {
							next.set('selectButton', [1, 2]);
						}
						else {
							next.set('ai', function (button) {
								return button.link === _status.event.choice ? 2.5 : 1 + Math.random();
							});
							next.set('choice', event.aiChoice);
						}
						var prompt = event.control == '弃置兰心' ? '选择弃置至多两张兰心' : '选择要切换的兰心';
						var func = function (id, prompt) {
							var dialog = get.idDialog(id);
							if (dialog) {
								dialog.content.childNodes[0].innerHTML = prompt;
							}
						}
						if (player.isOnline2()) {
							player.send(func, event.videoId, prompt);
						}
						else if (event.isMine()) {
							func(event.videoId, prompt);
						}
						"step 2"
						if (result.bool && event.control != '弃置兰心') {
							// debugger;
							var choice = result.links[0];
							if (player.storage.xjzh_meiren_huizhi.current != choice) {
								player.storage.xjzh_meiren_huizhi.current = choice;
								player.storage.xjzh_meiren_huizhi.current2=choice;
								game.broadcastAll(function (character, player) {
									player.sex = lib.character[character][0];
									player.group = lib.character[character][1];
									player.node.name.dataset.nature = get.groupnature(player.group);
								},choice, player);
								var skills = player.storage.xjzh_meiren_huizhi.map[choice];
								player.addAdditionalSkill('xjzh_meiren_huizhi', skills);
								player.flashAvatar('xjzh_meiren_huizhi', choice);
								game.log(player, '获得技能', '#g' + skills.reduce((a, b) => (a + `〖${get.translation(b)}〗`), ''));
								skills.forEach(s => player.popup(s));
								player.syncStorage('xjzh_meiren_huizhi');
								player.updateMarks('xjzh_meiren_huizhi');
							}
						}
						else {
							lib.skill.xjzh_meiren_huizhi.removeHuizhi(player, result.links.slice(0));
							lib.skill.xjzh_meiren_huizhi.addHuizhis(player, result.links.length);
						}
						"step 3"
						if (player.isOnline2()) {
							player.send('closeDialog', event.videoId);
						}
						event.dialog.close();
						delete _status.noclearcountdown;
						if (!_status.noclearcountdown) {
							game.stopCountChoose();
						}
					},
					init: function (player, skill) {
						if (!player.storage.xjzh_meiren_huizhi) player.storage.xjzh_meiren_huizhi = {
							character: [],
							map: {},
						}
					},
					intro:{
						onunmark:function(storage,player){
							_status.characterlist.addArray(storage.character);
							storage.character=[];
						},
						mark:function(dialog,storage,player){
							if(storage&&storage.current) dialog.addSmall([[storage.current],'character']);
							if(storage&&storage.current2) dialog.add('----------------<br>----------------');
							if(storage&&storage.character.length){
								if(player.isUnderControl(true)){
									dialog.addSmall([storage.character,'character']);
								}
								else{
									dialog.addText('共有'+get.cnNumber(storage.character.length)+'张“兰心”');
								}
							}
							else{
								return '没有兰心';
							}
						},
						content:function(storage,player){
							return '共有'+get.cnNumber(storage.character.length)+'张“兰心”'
						},
						markcount:function(storage,player){
							if(storage&&storage.character) return storage.character.length;
							return 0;
						},
					},
					banned:["lisu","sp_xiahoudun","xushao","zhoutai","old_zhoutai","xjzh_meiren_linjiasheng","xjzh_sanguo_zuoci","xjzh_boss_zuoyou","xjzh_sanguo_zhoutai"],
					addHuizhi:function(player){
						if(!player.storage.xjzh_meiren_huizhi) return;
						if(!_status.characterlist){
							if(_status.connectMode) var list=get.charactersOL();
							else{
								var list=[];
								for(var i in lib.character){
									if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
									list.push(i);
								}
							}
							game.countPlayer2(function(current){
								list.remove(current.name);
								list.remove(current.name1);
								list.remove(current.name2);
								if(current.storage.xjzh_meiren_huizhi&&current.storage.xjzh_meiren_huizhi.character) list.removeArray(current.storage.xjzh_meiren_huizhi.character)
							});
							_status.characterlist=list;
						}
						_status.characterlist.randomSort();
						var bool=false;
						for(var i=0;i<_status.characterlist.length;i++){
							var name=_status.characterlist[i];
							if(name.indexOf('zuoci')!=-1||name.indexOf('key')==0||lib.skill.xjzh_meiren_huizhi.banned.includes(name)||player.storage.xjzh_meiren_huizhi.character.includes(name)) continue;
							var skills=lib.character[name][3];
							for(var j=0;j<skills.length;j++){
								var info=lib.skill[skills[j]];
								if(info.charlotte||(info.unique&&!info.gainable)||info.juexingji||info.limited||info.zhuSkill||info.hiddenSkill||info.dutySkill) skills.splice(j--,1);
							}
							if(skills.length){
								player.storage.xjzh_meiren_huizhi.character.push(name);
								player.storage.xjzh_meiren_huizhi.map[name]=skills;
								_status.characterlist.remove(name);
								return name;
							}
						}
					},
					addHuizhis:function(player,num){
						var list=[];
						for(var i=0;i<num;i++){
							var name=lib.skill.xjzh_meiren_huizhi.addHuizhi(player);
							if(name) list.push(name);
						}
						if(list.length){
							game.log(player,'获得了',get.cnNumber(list.length)+'张','#g兰心')
							lib.skill.xjzh_meiren_huizhi.drawCharacter(player,list);
						}
					},
					removeHuizhi:function(player,links){
						player.storage.xjzh_meiren_huizhi.character.removeArray(links);
						_status.characterlist.addArray(links);
						game.log(player,'移除了',get.cnNumber(links.length)+'张','#g兰心')
					},
					drawCharacter:function(player,list){
						game.broadcastAll(function(player,list){
							if(player.isUnderControl(true)){
								var cards=[];
								for(var i=0;i<list.length;i++){
									var cardname='xjzh_meiren_huizhi_card_'+list[i];
									lib.card[cardname]={
										fullimage:true,
										image:'character:'+list[i]
									}
									lib.translate[cardname]=get.rawName2(list[i]);
									cards.push(game.createCard(cardname,'',''));
								}
								player.$draw(cards,'nobroadcast');
							}
						},
						player,list);
					},
				},
				"xjzh_meiren_huizhi2":{
					trigger:{
						global:'gameDrawAfter',
						player:'enterGame',
					},
					forced:true,
					popup:false,
					content:function(){
						lib.skill.xjzh_meiren_huizhi.addHuizhis(player,3);
						player.syncStorage('xjzh_meiren_huizhi');
						player.markSkill('xjzh_meiren_huizhi');
						var next=game.createEvent('xjzh_meiren_huizhi');
						next.player=player;
						next._trigger=trigger;
						next.triggername='xjzh_meiren_huizhi';
						next.setContent(lib.skill.xjzh_meiren_huizhi.content);
					},
				},
				"xjzh_meiren_lanxin":{
					//mode:['identity','single','doudizhu'],
					unique:true,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					priority:99,
					trigger:{
						player:['damageEnd',"loseHpEnd"],
					},
					frequent:true,
					content:function(){
						lib.skill.xjzh_meiren_huizhi.addHuizhis(player,trigger.num);
						player.syncStorage('xjzh_meiren_huizhi');
						player.updateMarks('xjzh_meiren_huizhi');
					},
				},
				"xjzh_meiren_gupan":{
					unique:true,
					priority:99,
					locked:true,
					charlotte:true,
					xjzh_xinghunSkill:true,
					nogainsSkill:true,
					frequent:function(event,card){
						if(get.tag(event.card,'damage')) return true;
						return false;
					},
					prompt:function(event,player){
						return "你成为"+get.translation(event.player)+""+get.translation(event.card)+"的目标，是否发动〖顾盼〗？";
					},
					trigger:{
						target:["useCardToBefore"],
					},
					filter:function(event,player,name){
						return _status.currentPhase!=player&&player.isDamaged()&&player.storage.xjzh_meiren_huizhi&&player.storage.xjzh_meiren_huizhi.character.length>3&&event.player!=player;
					},
					content:function(){
						"step 0"
						_status.noclearcountdown=true;
						event.videoId=lib.status.videoId++;
						var cards=player.storage.xjzh_meiren_huizhi.character.slice(0);
						var sto=player.storage.xjzh_meiren_huizhi;
						event.dialog=ui.create.dialog(get.prompt('xjzh_meiren_huizhi'),[cards,'character']);
						event.dialog.videoId=event.videoId;
						if(!event.isMine()){
							event.dialog.style.display='none';
						}
						"step 1"
						var next=player.chooseButton(true).set('dialog',event.videoId);
						var prompt='选择要弃置的兰心';
						next.set('selectButton');
						next.set('filterButton',function(button){
							return button.link!=_status.event.current;
						});
						next.set('current',player.storage.xjzh_meiren_huizhi.current);
						var func=function(id,prompt){
							var dialog=get.idDialog(id);
							if(dialog){
								dialog.content.childNodes[0].innerHTML=prompt;
							}
						}
						if(player.isOnline2()){
							player.send(func,event.videoId,prompt);
						}
						else if(event.isMine()){
							func(event.videoId,prompt);
						}
						"step 2"
						if(result.bool){
							lib.skill.xjzh_meiren_huizhi.removeHuizhi(player,result.links.slice(0));
							event.name=result.links[0];
							var cardname='xjzh_meiren_huizhi_card_'+event.name;
							var list=[];
							var skills=lib.character[event.name][3];
							for(var j=0;j<skills.length;j++){
								list.push(skills[j]);
							}
							if(list.length<=2){
								player.draw(2);
							}
							else{
								player.draw(list.length);
							}
							player.markSkill('xjzh_meiren_huizhi');
							player.update();
							player.syncStorage('xjzh_meiren_huizhi');
							player.updateMarks('xjzh_meiren_huizhi');
							event.dialog.close();
						}
					},
				},
				"xjzh_meiren_rouqing":{
					trigger:{
						player:"phaseZhunbeiBegin",
					},
					frequent:true,
					locked:true,
					priority:66,
					filter:function (event,player){
						if(!player.countCards('h')) return false;
						var cards=player.getCards('h');
						for(var i=1;i<cards.length;i++){
							if(get.suit(cards[i])!=get.suit(cards[0])) return false;
						}
						return true;
					},
					content:function (){
						"step 0"
						player.showHandcards();
						var hs=player.getCards('h');
						event.suit=get.suit(hs[0]);
						"step 1"
						ui.clear();
						var cards=get.cards(1);
						player.$throw(cards,1000,'nobroadcast');
						event.dialog=ui.create.dialog('柔情',cards,true);
						_status.dieClose.push(event.dialog);
						event.dialog.videoId=lib.status.videoId++;
						game.addVideo('cardDialog',null,['柔情',get.cardsInfo(cards),event.dialog.videoId]);
						game.log(player,"展示了",cards);
						game.delay(3);
						if(get.suit(cards[0])==event.suit) event.goto(3);
						"step 2"
						event.dialog.setCaption('柔情');
						var cards=get.cards(1);
						player.$throw(cards,1000,'nobroadcast');
						game.log(player,"展示了",cards);
						event.dialog.buttons.push(ui.create.button(cards[0],'card',event.dialog.buttons[0].parentNode));
						game.delay(3);
						if(get.suit(cards[0])!=event.suit) event.redo();
						"step 3"
						var gain=[];
						for(var i=0;i<event.dialog.buttons.length;i++){
							gain.push(event.dialog.buttons[i].link)
						}
						player.gain(gain,'gain2','log');
						"step 4"
						event.dialog.close();
						_status.dieClose.remove(event.dialog);
						game.addVideo('cardDialog',null,event.dialog.videoId);
					},
				},
				"xjzh_meiren_jiaqi":{
					trigger:{
						player:"damageEnd",
					},
					frequent:true,
					locked:true,
					priority:99,
					filter:function (event,player){
						return player.countCards('he')>0;
					},
					content:function (){
						"step 0"
						player.chooseCardTarget({
							position:"he",
							complexCard:true,
							filterCard:function (card){
								var suit=get.suit(card);
								for(var i=0;i<ui.selected.cards.length;i++){
									if(get.suit(ui.selected.cards[i])==suit) return false;
								}
								return true;
							},
							selectCard:[1,4],
							filterTarget:function(card,player,target){
								return player!=target;
							},
							ai1:function(card){
								var player=_status.event.player;
								if(ui.selected.cards.length==1) return -1;
								return 8-get.value(card);
							},
							ai2:function(target){
								var att=get.attitude(_status.event.player,target);
								if(att>=0){
									if(target.isTurnedOver()) return att;
									if(target.hp<target.maxHp&&target.countCards('h',function(cardx){
										return get.suit(cardx)==get.suit(ui.selected.cards[0]);
									})
									){
										return att;
									};
								}
								if(att<0){
									if(target.isTurnedOver()) return -1;
									if(!target.countCards('he',function(cardx){
										return get.suit(cardx)==get.suit(ui.selected.cards[0]);
									})
									){
										return -att;
									};
								}
								return 0;
							},
							prompt:'是否弃置任意张不同花色的牌，令一名其他角色选择：弃置等量相同花色组成的牌；或翻面并获得你弃置的牌？'
						});
						"step 1"
						if(result.bool){
							player.logSkill('xjzh_meiren_jiaqi',result.targets[0]);
							player.discard(result.cards);
							event.cardsss=result.cards;
							var ssuit=[];
							for(var i=0;i<result.cards.length;i++){
								var ssuits=get.suit(result.cards[i]);
								if(!ssuit.includes(ssuits)){
									ssuit.push(ssuits);
								}
							}
							event.target=result.targets[0];
							var next=event.target.chooseToDiscard('he',result.cards.length,'是否弃置'+result.cards.length+'张牌回复一点体力？否则翻面并获得其弃置的牌。',function(card,player){
								var suit=get.suit(card);
								if(!ssuit.includes(suit)) return false;
								for(var i=0;i<ui.selected.cards.length;i++){
									if(get.suit(ui.selected.cards[i])==suit||!ssuit.includes(suit)) return false;
								}
								return true;
							});
							next.set("ai",function(card){
								if(event.target.isTurnedOver()) return -1;
								if(result.cards.length<=2&&event.target.hp<event.target.maxHp) return 1;
								if(result.cards.length>2) return -1;
								return 9-get.value(card);
							});
						}
						else{
							event.finish();
						}
						"step 2"
						if(result.bool){
							event.target.recover();
						}
						else{
							event.target.turnOver();
							event.target.$gain2(event.cardsss);
							event.target.gain(event.cardsss);
						}
					},
					ai:{
						threaten:0.6,
					},
				},
				"xjzh_meiren_huimeng":{
					trigger:{
						target:"useCardToTargeted",
					},
					frequent:true,
					locked:true,
					filter:function (event,player){
						return event.player!=player&&!player.isMaxHandcard(true);
					},
					content:function (){
						"step 0"
						if(player.countCards("h")<=0){
							var num=player.hp+1
							event.cards=get.cards(num);
							game.cardsGotoOrdering(event.cards);
						}
						else{
							player.draw();
							event.finish();
						}
						"step 1"
						event.dialog=ui.create.dialog('〖回梦〗：选择一种花色的牌获得之。', event.cards);
						var split={
						spade:[],heart:[],club:[],diamond:[]};
						for(const card of event.cards){
							// split the four suits
							let suit=get.suit(card);
							split[suit].push(card);
						}
						var controlList=[];
						for (const suit in split){
							if(split[suit].length)
							controlList.push(lib.translate[suit]);
						}
						var next=player.chooseControl([...controlList], event.dialog);
						// if (event.dialog) {
						//   next.set('prompt', event.dialog);
						// }
						next.set('ai',function(){
							var splitValue={};
							for(const suit in split) {
								splitValue[suit]=split[suit].reduce((v,b)=>v+get.value(b,player),0);
							}
							if(Object.keys(splitValue).some(suit=>splitValue[suit] >10)){
								let suit=Object.keys(splitValue).reduce((a,b)=>splitValue[a]>splitValue[b]?a:b);
								return lib.translate[suit];
							}
						});
						event._split=split;
						"step 2"
						trigger.changeToZero();
						for(const suit in event._split){
							if (lib.translate[suit]==result.control)
							event.cards=event._split[suit];
						}
						"step 3"
						if(event.cards.length){
							player.gain(event.cards,'gain2','log');
						}
						// for (var i = 0; i < cards.length; i++) {
						//   ui.discardPile.appendChild(cards[i]);
						// }
						game.delay();
					},
					ai:{
						threaten:1.2,
					},
				},
				"xjzh_meiren_xianyou":{
					trigger:{
						player:"xjzh_meiren_huimengAfter",
					},
					forced:true,
					locked:true,
					marktext:"游",
					intro:{
						name:"仙游",
						content:"mark",
					},
					priority:98,
					group:["xjzh_meiren_xianyou1","xjzh_meiren_xianyou2","xjzh_meiren_xianyou3"],
					init:function (player){
						player.storage.xjzh_meiren_xianyou=0;
						player.syncStorage('xjzh_meiren_xianyou');
					},
					content:function (){
						player.addMark("xjzh_meiren_xianyou",1);
					},
					ai:{
						threaten:3
					}
				},
				"xjzh_meiren_xianyou1":{
					trigger:{
						global:"shaBegin",
					},
					locked:true,
					sub:true,
					prompt:function(event,player){
						return "是否移除一个标记对"+get.translation(event.player)+"使用一张决斗";
					},
					priority:66,
					filter:function (event,player){
						return event.player!=player&&event.target==player&&player.hasMark("xjzh_meiren_xianyou");
					},
					check:function (event,player){
						if(get.attitude(player,event.player)<0) return 1;
						if(get.attitude(player,event.player)>0) return 0;
						if(player.countCards("h",{name:"sha"})) return 1.5;
						return player.hasMark("xjzh_meiren_xianyou");
					},
					content:function (){
						"step 0"
						player.removeMark("xjzh_meiren_xianyou",1);
						player.useCard({name:'juedou'},trigger.player);
						"step 1"
						if(player.getStat('damage')){
							trigger.untrigger();
							trigger.finish();
						}
					},
					ai:{
						threaten:3
					}
				},
				"xjzh_meiren_xianyou2":{
					trigger:{
						target:"juedouBegin",
					},
					locked:true,
					sub:true,
					prompt:function(event,player){
						return "是否移除一个标记对"+get.translation(event.player)+"使用一张【杀】";
					},
					priority:66,
					filter:function (event,player){
						return event.player!=player&&event.target==player&&player.hasMark("xjzh_meiren_xianyou");
					},
					check:function (event,player){
						if(get.attitude(player,event.player)<0) return 1;
						if(player.countCards("h",{name:"tao"})) return 0.1;
						if(event.player.countCards("h")<=1) return 0.5;
						return player.hasMark("xjzh_meiren_xianyou");
					},
					content:function (){
						"step 0"
						player.removeMark("xjzh_meiren_xianyou",1);
						player.useCard({name:'sha'},trigger.player);
						"step 1"
						if(!player.getStat('damage')){
							player.chooseToDiscard(2,'he',true);
						}
					},
					ai:{
						threaten:3
					}
				},
				"xjzh_meiren_xianyou3":{
					trigger:{
						global:"damageAfter",
					},
					filter:function(event,player){
					    if(!event.source||event.source.countCards('h')<=0) return false;
					    if(!event.player||event.player.countCards('h')<=0) return false;
					    if(event.player.isDead()||event.source.isDead()) return false;
					    if(player.countCards("h")<player.countMark("xjzh_meiren_xianyou")) return false;
					    return true;
					},
					locked:true,
					priority:33,
					sub:true,
					check:function (event,player){
						if(get.attitude(player,event.source)>0&&event.source.countCards("h")>event.player.countCards("h")) return 0;
						if(get.attitude(player,event.source)<0&&event.source.countCards("h")<event.player.countCards("h")) return 0;
						return 0.5;
					},
					prompt:function(event,player){
						var str = get.translation(event.player)+" 受到了";
						if(event.source){
							str += " "+get.translation(event.source)+' 造成的伤害';
						}
						else{
							str += "伤害";
						}
						str += "，是否发动〖仙游〗令其交换手牌？";
						return str;
					},
					content:function(){
						"step 0"
						var num=player.countCards("h");
						player.removeMark("xjzh_meiren_xianyou",num);
						"step 1"
						if(trigger.player==player){
							player.swapHandcards(trigger.source);
						}
						else{
							trigger.player.swapHandcards(trigger.source);
							player.draw();
						}
					},
				},
				"xjzh_meiren_zhongqing":{
					trigger:{
						global:"gameStart",
					},
					firstDo:true,
					locked:true,
					priority:100,
					direct:true,
					init:function(player){
					    player.storage.xjzh_meiren_zhongqing_target2=0
					},
					group:["xjzh_meiren_zhongqing_target2"],
					content:function(){
						"step 0"
						player.chooseTarget('钟情：选择一个目标令其成为你的钟情对象',true,function(card,player,target){
							return player!=target;
						}).set('ai',function(target){
						    return get.attitude(player,target)>0;
						});
						"step 1"
						if(result.bool){
						    player.storage.xjzh_meiren_zhongqing=result.targets[0]
							result.targets[0].addSkill("xjzh_meiren_zhongqing_target");
						}
					},
					subSkill:{
						"target":{
							mark:true,
							locked:true,
							charlotte:true,
							sub:true,
							intro:{
								content:'<font color=yellow>黄丹雪</font>的钟情对象'
							},
						},
						"target2":{
						    trigger:{
						        global:"useCardToPlayer",
						    },
						    filter:function(event,player){
						        var target2=game.filterPlayer(function(current){return current.hasSkill("xjzh_meiren_zhongqing_target")}).shift();
						        if(event.target.hasSkill('xjzh_meiren_zhongqing_target')&&event.player!=event.target) return true;
						        if(player!=event.player&&event.target==player&&target2.isAlive()) return true 
						        if(!event.isFirstTarget) return false;
						        return false;
						    },
						    direct:true,
						    priority:10,
						    sub:true,
						    content:function(){
						        var evt=trigger.getParent()
						        var target2=game.filterPlayer(function(current){return current.hasSkill("xjzh_meiren_zhongqing_target")}).shift();
						        if(trigger.target==player&&target2.isAlive()){
						            evt.targets.add(target2);
						            player.line(target2,'green');
						            trigger.untrigger();
					                game.log(target2,"成为了",trigger.card,"的额外目标");
						        }
						        else if(trigger.target==target2){
						            evt.targets.add(player);
						            player.line(player,'green');
						            trigger.untrigger();
					                game.log(player,"成为了",trigger.card,"的额外目标");
						        }
						        player.draw();
						        target2.draw();
						        if(!player.storage.xjzh_meiren_zhongqing_target2) player.storage.xjzh_meiren_zhongqing_target2=0
						        player.storage.xjzh_meiren_zhongqing_target2++
						    },
						},
					},
				},
				"xjzh_meiren_yiqing":{
					trigger:{
						target:"useCardToTargeted",
					},
					locked:true,
					priority:66,
					prompt:function(event,player){
						return ""+get.translation(player)+"成为"+get.translation(event.player)+"的目标，是否发动〖移情〗将目标转移给上家或下家？";
					},
					group:["xjzh_meiren_yiqing_draw"],
					filter:function (event,player){
						if(event.player!=player&&event.player.sex=='female'&&!get.tag(event.card,'damage')&&event.targets.length==1) return true;
						if(event.player.sex=='male'&&get.tag(event.card,'damage')&&event.targets.length==1) return true;
						return false;
					},
					content:function (){
						'step 0'
						var tt=player;
						var tc=trigger.card;
						var heartEffect=get.effect(tt.next,tc,player,player)-get.effect(tt,tc,player,player);
						var spadeEffect=get.effect(tt.previous,tc,player,player)-get.effect(tt,tc,player,player);
						player.judge(function(card){
							var suit=get.suit(card,player);
							if(suit=='spade'){
								return spadeEffect;
							}
							else if(suit=='heart'){
								return heartEffect;
							}
							return 0;
						},
						'移情').set('judge2',function(card){
							var suit=get.suit(card,player);
							return ['spade','heart'].includes(suit);
						});
						'step 1'
						if(result){
							var evt=trigger.getParent();
							if(result.suit=='heart'){
								evt.triggeredTargets1.remove(player);
								evt.targets.remove(player);
								evt.targets.add(player.next);
								player.line(player.next,'green');
								trigger.untrigger();
								game.log(trigger.player,"使用的",trigger.card,"的目标被转移给了",player.next,"。");
							}
							else if(result.suit=='spade'){
								evt.triggeredTargets1.remove(player);
								evt.targets.remove(player);
								evt.targets.add(player.previous);
								player.line(player.previous,'green');
								trigger.untrigger();
								game.log(trigger.player,"使用的",trigger.card,"的目标被转移给了",player.previous,"。");
							}
						}
					},
					subSkill:{
						"draw":{
							trigger:{
								target:"useCardToTargeted",
								player:"useCardToPlayered",
							},
							priority:-1,
							forced:true,
							sub:true,
							filter:function (event,player){
								var previous=player.getPrevious();
								var next=player.getNext();
								if(event.target==player){
									return event.player==previous||event.player==next;
								}
								if(event.player==player){
									return event.target==previous||event.target==next;
								}
								return false;
							},
							content:function (){
								player.draw();
							},
						},
					},
				},
				"xjzh_meiren_shangqing":{
					forced:true,
					locked:true,
					juexingji:true,
					unique:true,
					firstDo:true,
					priority:66,
					mark:true,
					marktext:"伤",
					skillAnimation:true,
					animationColor:"water",
					animationStr:"伤魂情离",
					intro:{
					    name:"伤情",
					    mark:function(dialog,storage,player){
					        var str=""
					        var storage=player.storage.xjzh_meiren_zhongqing_target2
					        str+="已发动〖钟情〗："+get.translation(storage)+"次";
					        return str;
					    },
					    markcount:function(storage,player){
					        return player.storage.xjzh_meiren_zhongqing_target2;
					    },
					},
					trigger:{
					    player:"phaseBefore",
					},
					filter:function(event,player){
					    if(player.storage.xjzh_meiren_zhongqing_target2<6) return false;
					    return !player.storage.xjzh_meiren_shangqing;
					},
					derivation:["xjzh_meiren_moqing"],
					content:function(){
					    "step 0"
					    player.awakenSkill('xjzh_meiren_shangqing');
					    player.storage.xjzh_meiren_shangqing=true;
					    "step 1"
					    var target2=game.filterPlayer(function(current){return current.hasSkill("xjzh_meiren_zhongqing_target")}).shift();
					    target2.removeSkill("xjzh_meiren_zhongqing_target");
					    delete player.storage.xjzh_meiren_zhongqing
					    player.removeSkill('xjzh_meiren_zhongqing');
					    player.addSkillLog('xjzh_meiren_moqing');
					    "step 2"
					    var list=['shangqing2','shangqing3']
					    for(var i=0;i<list.length;i++){
					        player.clearMark("xjzh_meiren_"+list[i]);
					    }
					    "step 3"
					    player.chooseTarget('伤情：选择一个目标与其交换体力上限与体力值',function(card,player,target){
							return player!=target&&(target.hp!=player.hp||target.maxHp!=player.maxHp);
						}).set('ai',function(target){
						    var att=get.attitude(player,target);
						    if(att>0) return target.hp<player||target.maxHp<player;
						    if(att<0) return target.hp>player||target.maxHp>player;
						    return att<0;
						});
						"step 4"
						if(result.bool){
						    player.swapMaxHp(result.targets[0]);
						}
					},
				},
				"xjzh_meiren_moqing":{
				    trigger:{
				        player:"damageAfter",
				    },
				    frequent:true,
				    priority:12,
				    filter:function(event,player){
				        return player.isAlive();
				    },
				    check:function(event,player){
				        return 1;
				    },
				    mod:{
						targetEnabled:function(card,player,target,now){
							if(get.tag('multitarget',card)) return false;
							if(get.info(card).allowMultiple==false) return false;
						},
				    },
				    content:function(){
				        "step 0"
				        player.chooseTarget("〖默情〗:请选择一个目标与其交换体力值",function(target){
				            return target!=player&&target.hp!=player.hp;
				        }).set('ai',function(target){
				            var att=get.attitude(player,target)
				            if(att<0) return player.hp<target.hp;
				            if(att>0) return player.hp>target.hp;
				            return att>0;
				        });
				        "step 1"
				        if(result.bool){
				            var hp1=result.targets[0].hp
				            var hp2=player.hp
				            player.hp=hp1
				            result.targets[0].hp=hp2
				            player.update();
				            result.targets[0].update();
				            if(result.targets[0].hp>player.hp){
				                player.addSkill("xjzh_meiren_moqing_use");
				            }
				        }
				    },
				    subSkill:{
				        "use":{
				            trigger:{
				                player:"phaseAfter",
				            },
				            direct:true,
				            priority:-2,
				            sub:true,
				            content:function(){
				                player.draw()
				                player.phaseUse();
				                player.removeSkill("xjzh_meiren_moqing_use");
				            },
				        },
				    },
				},
				
				//天命奇侠
				"xjzh_qixia_qice":{
				    trigger:{
				        global:"drawEnd",
				    },
				    filter(event,player){
				        let list=[];
				        if(!event.result&&!event.result.length) return false;
						for(let card of event.result){
							list.add(get.type(card));
						}
				        if(event.player==player) return false;
				        return list.length>=2;
				    },
				    frequent:true,
				    priority:2,
				    prompt(event,player){
				        return "〖奇策〗:是否选择并弃置"+get.translation(event.player)+"本次摸牌的一个类别中的所有牌";
				    },
				    check:function(event,player){return 0.5;},
				    async content(event,trigger,player){
				        let list=[]
						for(let card of trigger.result.slice(0)){
							if(!list.includes(get.type(card))) list.add(get.type(card));
						}
						let dialog=ui.create.dialog("hidden");
						dialog.add(''+get.translation(trigger.player)+'本次摸的牌');
						dialog.add([trigger.result.slice(0),'vcard']);
				        const control=await player.chooseControl(list,"cancel2").set('ai',function(){
							return list.randomGet();
						}).set('dialog',dialog).forResultControl();
				        if(control&&control!="cancle2"){
							let cards=trigger.result.filter(card=>{
								return get.type(card)==control;
							});
				            trigger.player.discard(cards);
				            trigger.player.draw(cards.length);
				        }
				    },
				},
				"xjzh_qixia_tianshu":{
				    trigger:{
				        player:["phaseZhunbeiBegin","phaseJieshuBegin"],
				    },
				    forced:true,
				    locked:true,
				    priority:3,
				    mark:true,
				    marktext:"天书",
					intro:{
						onunmark(storage,player){
							_status.characterlist.addArray(storage.character2);
							storage.character2=[];
						},
						mark(dialog,storage,player){
							if(storage&&storage.length){
								dialog.addSmall([[storage],'character']);
								dialog.add('----------------<br>----------------');
							};
							if(storage&&storage.length){
								if(player.isUnderControl(true)){
									dialog.addSmall([storage,'character']);
								}
								else{
									dialog.addText('共有'+get.cnNumber(storage.length)+'张“武将牌”');
								}
							}
							else{
								return '空白天书';
							}
						},
						content(storage,player){
							return '共有'+get.cnNumber(storage.length)+'张“武将牌”'
						},
					},
                    filter(event,player){
                        return game.getExtensionConfig('金庸群侠传','enable')
                    },
                    group:["xjzh_qixia_tianshu_use"],
                    content(){
						if(!player.storage.xjzh_qixia_tianshu) player.storage.xjzh_qixia_tianshu=[]
						let list=game.xjzh_wujiangpai().filter(name=>{
							let arr=['ywhy_','qtpz_','ldj_','jue_','xajh_','yttl_','sdxl_','sdyx_','tlbb_'];
							if(player.storage.xjzh_qixia_tianshu.includes(name)) return false;
							return arr.filter(i=>{return name.includes(i);}).length;
						});
						if(!list.length) return;
                        let names=list.randomGet();
						player.storage.xjzh_qixia_tianshu.push(names);
						let skills=lib.character[names][3].filter(skill=>{
						    let info=get.info(skill);
						    if(lib.translate[skill]&&lib.translate[skill+"_info"])  return info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill;
						});
						player.addAdditionalSkill('xjzh_qixia_tianshu',skills);
                        let cardname='xjzh_qixia_tianshu_'+names;
                        lib.card[cardname]={
                            fullimage:true,
                            image:'character:'+names,
                        }
                        lib.translate[cardname]=lib.translate[names];
                        let card=game.createCard(cardname);
                        player.$gain2(card);
                    },
                    subSkill:{
                        "use":{
                            enable:"phaseUse",
                            usable:1,
                            filter(event,player){
                                return player.storage.xjzh_qixia_tianshu&&player.storage.xjzh_qixia_tianshu.length;
                            },
                            async content(event,trigger,player){
                                let list=player.storage.xjzh_qixia_tianshu.slice(0);
                                let dialog=ui.create.dialog('〖天书〗：是否弃置一张武将牌获得其一个技能？',[list,'character'],'hidden');
                                const links=await player.chooseButton(dialog,true).set('ai',function(button){
                                    return get.rank(button.link,true);
                                }).forResultLinks();
                                if(links){
                                    player.storage.xjzh_qixia_tianshu.remove(links[0]);
                                    let skills=lib.character[links[0]][3].filter(skill=>{
										let info=get.info(skill);
                                        if(lib.translate[skill]&&lib.translate[skill+"_info"]) return info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill;
									});		
									if(event.isMine()){
										dialog=ui.create.dialog('forcebutton');
										dialog.add('请选择获得一项技能');
										for(i=0;i<skills.length;i++){
											if(lib.translate[skills[i]+'_info']){
												var translation=get.translation(skills[i]);
												if(translation[0]=='新'&&translation.length==3){
													translation=translation.slice(1,3);
												}
												else{
													translation=translation.slice(0,2);
												}
												var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
												item.firstChild.link=skills[i];
											}
										}
									}
									const control=await player.chooseControl(skills).set('prompt','请选择获得一项技能').set('ai',function(){
										return skills.randomGet();
									}).set('dialog',dialog).forResultControl();
									if(control) player.addSkillLog(control);
                                    let num=0;
									for await(let skill of skills){
						                let str=lib.translate[skill+"_info"];
						                let miaoshu=Array.from(str).filter(text=>{
						                    if(get.xjzh_checkChinese(text)) return true;
				                            return false;
				                        });
				                        num+=miaoshu.length
									}
									let total=0,cards=[];
						            for(let i=0;i<num;i++){
						                let card=get.cardPile(card=>{
						                    if(cards.includes(card)) return false;
						                    if(total+get.number(card,false)>num) return false;
						                    return true;
						                });
						                if(card){
						                    total+=get.number(card,false);
						                    cards.push(card);
						                }
						                if(total==num) break;
						            }
						            if(cards.length) player.gain(cards,'gain2');
						            game.log(player,"摸了",cards.length,"张牌");
						        }
                            },
                            ai:{
                                order:12,
                                result:{
                                    player:1,
                                },
                            },
                        },
                    },
				},
				"xjzh_qixia_xiongmao":{
				    enable:"phaseUse",
				    usable:1,
                    content(){
                        let list=game.xjzh_wujiangpai().filter(name=>{
							return lib.character[name][0]=='female';
						}).randomGet();
                        player.setAvatar(player.name1=="xjzh_qixia_daxiongxiaomao"?player.name1:player.name2,list);
                        var info=lib.character[list]
                        player.sex=info[0];
                        if(typeof info[2]=="string"){
                            info[2]=Array.from(info[2])
                            player.maxHp=info[2][2]
                            player.hp=info[2][0]
                        }else{
                            player.maxHp=info[2]
                            player.hp=info[2]
                        }
                        player.group=info[1]
                        player.update();
                    },
                    ai:{
                        order(){
							return player.hp<player.maxHp;
						},
						result:{
						    player(card,player,target){
						        if(!player) return;
						        if(player.hp<player.maxHp) return 1;
							    return 0.6;
						    },
						},
                    },
				},
				"xjzh_qixia_jiyuan":{
				    trigger:{
						global:["damageBegin"],
					},
					filter:function(event,player){
					    return event.player!=player;
					},
				    prompt:function(event,player){
				        var str="〖急援〗："+get.translation(event.player)+"即将受到"
				        if(event.source) str+="来自于"+get.translation(event.source)
				        if(event.card) str+=""+get.translation(event.card)
				        str+=""+get.translation(event.num)+"点伤害，是否代替其受到伤害"
				        return str;
				    },
				    group:["xjzh_qixia_jiyuan_draw"],
				    check:function(event,player){
				        var att=get.attitude(event.player,player)
				        var players=game.countPlayer(function(current){
				            return player.isFriendsOf(current);
				        });
				        if(att<0||player.hp<=2) return 0;
				        return players;
				    },
				    content:function(){
				        trigger.player.draw(2);
				        game.log(player,"代替",trigger.player,"承受了伤害");
				        trigger.player=player
				    },
				    subSkill:{
				        "draw":{
				            trigger:{
				                player:"phaseBefore",
				            },
				            forced:true,
				            popup:false,
				            priority:12,
				            sub:true,
				            filter:function(event,player){
				                return game.countPlayer(function(current){
				                    return player.isFriendsOf(current);
				                })>0;
				            },
				            content:function(){
				                var num=game.countPlayer(function(current){
				                    return player.isFriendsOf(current);
				                });
				                var num2=player.getDamagedHp();
				                var num3=num-num2;
				                player.recover(Math.max(1,num));
				                player.draw(Math.max(1,num3));
				            },
				        },
				    },
				},
				"xjzh_qixia_jibian":{
				    trigger:{
				        player:"damageAfter",
				    },
				    filter(event,player){
				        return event.source&&event.source!=player&&event.source.isAlive();
				    },
				    check(event,player){
				        let att=get.attitude(event.source,player)
				        if(att<0) return 1;
				    },
				    prompt(event,player){
				        let num=Math.max(1,Math.abs(player.hp-event.source.hp));
						let skills=event.source.getSkills(null,false,false).filter(skill=>{
							if(skill.includes("jycw")) return false;
                            if(lib.translate[skill]&&lib.translate[skill+"_info"]){
                                let str=lib.translate[skill+"_info"]
                                if(str.includes('伤害')) return true;
							}
						});
				        return `〖机变〗:受到${get.translation(event.source)}的伤害，是否摸${get.translation(num)}张牌${skills.length?`并将其技能${skills.map(i=>'【'+get.translation(i)+'】')}替换为〖仁德〗}`:""}？`;
				    },
				    async content(event,trigger,player){
				        let num=Math.max(1,Math.abs(player.hp-trigger.source.hp));
				        let num2=Math.min(13,player.hp+trigger.source.hp)
				        await player.gain(get.randomCards(num,function(card){
                            return get.number(card)==num2;
                        }),player,"giveAuto");
                        let skills=trigger.source.getSkills(null,false,false).filter(skill=>{
							if(!lib.translate[skill]||!lib.translate[skill+"_info"]) return false;
							let str=lib.translate[skill+"_info"];
							if(str.includes('伤害')) return true;
						});
                        if(!skills.length) return;
						for await(let skill of skills){
							let newSkill=skill+"rende";
							if(!lib.skill[newSkill]){
								lib.skill[newSkill]=lib.skill["rende"];
								lib.skill[newSkill].usable=1;
								lib.translate[newSkill]=lib.translate["rende"];
								let str=lib.translate["rende_info"].slice(0);
								let str2="出牌阶段"
								let str3=str.replace(str2,"出牌阶段限一次");
								lib.translate[newSkill+"_info"]=str3;
							}
							if(!trigger.source.hasSkill(newSkill)){
								trigger.source.changeSkills(Array.of(newSkill),Array.of(skill));
							}
						}
				    },
				},
				"xjzh_qixia_tubian":{
				    enable:"phaseUse",
				    usable:1,
                    /*init:function(player){
                        player.storage.xjzh_qixia_tubian=[];
                        lib.skill.xjzh_qixia_tubian.getInfoList(player);
                    },*/
                    mark:true,
                    marktext:"图",
                    intro:{
                        name:"图变",
                        markcount:function(storage,player){
                            return 0;
                        },
                        content:function(storage,player){
                            var sex=player.sex
                            return "当前性别为："+get.translation(sex);
                        },
                    },
                    group:["xjzh_qixia_tubian_damage"],
                    prompt:"〖图变〗：选择一名角色令其获得技能",
                    /*getInfoList:function(player){
                        var list=[];
                        if(_status.characterlist){
                            for(var i=0;i<_status.characterlist.length;i++){
                                var name=_status.characterlist[i];
                                list.push(name);
                            }
                        }
                        else if(_status.connectMode){
                            list=get.charactersOL();
                        }else{
                            list=get.gainableCharacters();
                        }
                        var players=game.players.concat(game.dead);
                        for(var i=0;i<players.length;i++){
                            list.remove(players[i].name);
                            list.remove(players[i].name1);
                            list.remove(players[i].name2);
                        }
                        player.storage.xjzh_qixia_tubian.addArray(list);
                    },*/
                    filterTarget:true,
                    selectTarget:1,
                    content:function(){
                        "step 0"
						//以下代码借鉴自《阳光包》			
						/* 创建dialog */
						var dialog=ui.create.dialog(false);
						/* dialog标题 */
						dialog.add('请输入至多5个汉字');
						/* dialog.add方法只接受div，而不是input */
						var div=document.createElement('div');
						/* 创建input并添加到div里 */
						var input=div.appendChild(document.createElement('input'));
						/* 输入最多5个字符 */
						input.setAttribute('maxlength','5');
						/* input内按键不继续冒泡*/
						input.addEventListener('keydown',e=>{
							e.stopPropagation();
						});
						input.addEventListener('keyup',e=>{
							e.stopPropagation();
						});
						/* 输入前的提示 */
						input.placeholder='请输入武将名';
						/* dialog添加div */
						dialog.add(div);
						/* 把dialog，input加入event,让下一步骤的技能可调用dialog */
						event.dialog=dialog;
						event.input=input;
						'step 1'
						/* 获取上一步骤的dialog */
						var dialog=event.dialog;
					    var input=event.input;
						var clickFun=()=>{
						    /* 移除dialog */
						    dialog.remove();
						    /* value是输入框里的值 */
						    var value=input.value
						    event.str=value
						    /* 继续游戏 */
						    game.resume();
						}
						/* 如果是ai */
						if(!event.isMine()){
							/* 给予ai透视 */
							var list=game.players.filter(item =>!item.isFriendsOf(player)&&item!=player).map(item=>(lib.translate[item.name]||'').replace(/[神,界,OL,手杀,sp]/g,''));
							var str=list.reduce((accumulator,item)=>{
								for(var i=0;i<item.length;i++){
									if(!accumulator.includes(item[i])) return accumulator+item[i];
								}
							},'');
							/* 输入框赋值 */
							input.value=str.slice(0,5);
							/* 然后执行clickFun*/
							clickFun();
						}else{
							/* 显示dialog */
							dialog.open();
							/* 暂停游戏 */
							game.pause();
							/* 输入结束后点击确定 */
							var button=ui.create.control('确定',()=>{
								/*if(!input.value) {
									return alert('输入不能为空');
								}else{
								    event.str=input.value
								}*/
								/*移除button */
								button.remove();
								clickFun();
							});
						}
						//以上代码借鉴自《阳光包》
						"step 2"
						if(!get.xjzh_checkChinese(event.str)){
						    event.goto(0);
						    return;
						}
                        var list=game.xjzh_wujiangpai(event.str,3);
                        if(!list.length) list=game.xjzh_wujiangpai(3);
                        /*var list2=[]
                        if(event.str){
                            var str=event.str.slice(0);
                            if(str.length){
                                str=Array.from(str);
                                str=str.filter(function(str,index,arr){
                                    var id=arr.indexOf(str);
                                    if(id!=index) return false;
                                    if(/[\u4e00-\u9fa5]/.test(str)) return true;
                                    return false;
                                });
                                str=str.join("");
                                for(var i=0;i<list.length;i++){
                                    var info=lib.translate[list[i]]
                                    /*for(var j of str){
                                        if(info.indexOf(j)!=-1){
                                            list2.push(list[i]);
                                        }
                                    }
                                    if(info.indexOf(str)!=-1) list2.push(list[i]);
                                }
                            }
                        }
                        if(list2.length) list=list2.slice(0);*/
                        var dialog=ui.create.dialog('〖图变〗：请选择一张武将牌？','hidden',[list,'character']);
                        player.chooseButton(dialog,true).set('ai',function(button){
                            var att=get.attitude(player,target);
                            var sexx=lib.character[button.link][0]
                            if(target.hasSex(sexx)) return get.rank(button.link,true)*att;
                            return att/get.rank(button.link,true);
                        }).set("target",target);
                        "step 3"
                        if(result.links){
                            event.numx=0
                            var link=result.links[0]
                            target.setAvatar(target.name,link);
                            var info=lib.character[link]
                            if(target.sex==info[0]||target==player){
                                var skills=lib.character[link][3]
                                for(var i of skills){
                                    target.addSkill(i);
                                }
                                game.log(target,"获得技能","#y"+get.translation(skills));
                                event.goto(6);
                            }
                            event.targetx=result.links[0]
                        }
                        "step 4"
                        if(event.numx==0){
                            var skills=target.getSkills(null,false,false).filter(function(skill){
						    	var info=lib.skill[skill];
						    	return lib.translate[skill]&&lib.translate[skill+'_info']&&!info.sub;
						    });
						}else{
						    var skills=lib.character[event.targetx][3]
						}
						if(event.isMine()){
						    var text=""
						    if(event.numx==0){
						        text+="〖图变〗：请选择失去一个技能";
						    }else{
						        text+="〖图变〗：请选择获得一个技能";
						    }
							var dialog=ui.create.dialog(text,'forcebutton','hidden');
							for(i=0;i<skills.length;i++){
								if(lib.translate[skills[i]+'_info']){
									var translation=get.translation(skills[i]);
									if(translation[0]=='新'&&translation.length==3){
										translation=translation.slice(1,3);
									}
									else{
										translation=translation.slice(0,2);
									}
									var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
									item.firstChild.link=skills[i];
								}
							}
						}
						player.chooseControl(skills,true).set('prompt',text).set('ai',function(){
						    return skills.randomGet();
						}).set('dialog',dialog).set('num',event.numx);
						"step 5"
						if(result.control){
						    if(event.numx==0){
						        target.removeSkill(result.control,true);
						        game.log(target,"选择失去技能","#y"+get.translation(result.control));
						        event.numx++
						        event.goto(4);
						    }else{
						        target.addSkillLog(result.control);
						    }
						}
						"step 6"
						var sexs=player.sex
						var sexx=["female","male","double","none"].randomGet();
						player.sex=sexx
						game.log(player,"将性别改为了","#y"+sexx);
						if(player.hasSex("double")){
						    player.gainMaxHp();
						}
						if(player.sex==sexs){
						    if(player.isDamaged()) player.recover();
						    player.draw();
						}else{
						    player.loseHp();
						}
                    },
                    subSkill:{
                        "damage":{
                            trigger:{
                                player:"damageEnd",
                            },
                            sub:true,
                            usable:1,
                            check:function(event,player){return 0.5},
                            prompt:"〖图变〗：是否选择一名角色令其获得技能？",
                            content:function(){
                                "step 0"
                                event.chooseD=false;
                                player.chooseTarget('〖图变〗：是否选择一名角色令其获得技能？').set('ai',function(target){
                                    var att=get.attitude(player,target);
                                    if(att>0) return 1;
                                    return 0.2;
                                });
                                "step 1"
                                if(result.bool||event.chooseD){
                                    event.target=result.targets[0];
                                    event.chooseD=true;
                                    //以下代码借鉴自《阳光包》
                                    /* 创建dialog */
                                    var dialog=ui.create.dialog(false);
                                    /* dialog标题 */
                                    dialog.add('请输入至多5个汉字');
                                    /* dialog.add方法只接受div，而不是input */
                                    var div=document.createElement('div');
                                    /* 创建input并添加到div里 */
                                    var input=div.appendChild(document.createElement('input'));
                                    /* 输入最多3个字符 */
                                    input.setAttribute('maxlength','5');
                                    /* input内按键不继续冒泡*/
                                    input.addEventListener('keydown',e=>{
                                        e.stopPropagation();
                                    });
                                    input.addEventListener('keyup',e=>{
                                        e.stopPropagation();
                                    });
                                    /* 输入前的提示 */
                                    input.placeholder='请输入武将名';
                                    /* dialog添加div */
                                    dialog.add(div);
                                    /* 把dialog，input加入event,让下一步骤的技能可调用dialog */
                                    event.dialog=dialog;
                                    event.input=input;
                                }else{
                                    event.finish();
                                    return;
                                }
                                'step 2'
                                /* 获取上一步骤的dialog */
                                var dialog=event.dialog;
                                var input=event.input;
                                var clickFun=()=>{
                                    /* 移除dialog */
                                    dialog.remove();
                                    /* value是输入框里的值 */
                                    var value=input.value
						            event.str=value
                                    /* 继续游戏 */
                                    game.resume();
                                }
                                /* 如果是ai */
                                if(!event.isMine()){
                                    /* 给予ai透视 */
                                    var list=game.players.filter(item =>!item.isFriendsOf(player)&&item!=player).map(item=>(lib.translate[item.name]||'').replace(/[神,界,OL,手杀,sp]/g,''));
                                    var str=list.reduce((accumulator,item)=>{
                                        for(var i=0;i<item.length;i++){
                                            if(!accumulator.includes(item[i])) return accumulator+item[i];
                                        }
                                    },'');
                                    /* 输入框赋值 */
                                    input.value=str.slice(0,5);
                                    /* 然后执行clickFun*/
                                    clickFun();
                                }else{
                                    /* 显示dialog */
                                    dialog.open();
                                    /* 暂停游戏 */
                                    game.pause();
                                    /* 输入结束后点击确定 */
                                    var button=ui.create.control('确定',()=>{
                                        /*if(!input.value) {
									        return alert('输入不能为空');
								        }else{
								            event.str=input.value
								        }*/
								        /*移除button */
							    	    button.remove();
									    clickFun();
								    });
						        }
						        //以上代码借鉴自《阳光包》
						        "step 3"
						        if(!get.xjzh_checkChinese(event.str)){
						            event.goto(1);
						            return;
						        }
						        var list=game.xjzh_wujiangpai(event.str,3);
                                if(!list.length) list=game.xjzh_wujiangpai(3);
						        /*var list=player.storage.xjzh_qixia_tubian.slice(0);
						        var list2=[]
						        var str=event.str.slice(0);
						        if(str.length){
						            str=Array.from(str);
						            str=str.filter(function(str,index,arr){
						                var id=arr.indexOf(str);
						                if(id!=index) return false;
						                if(/[\u4e00-\u9fa5]/.test(str)) return true;
						                return false;
						            });
						            str=str.join("");
						            for(var i=0;i<list.length;i++){
						                var info=lib.translate[list[i]]
						                /*for(var j of str){
						                    if(info.indexOf(j)!=-1){
						                        list2.push(list[i]);
						                    }
						                }
						                if(info.indexOf(str)!=-1) list2.push(list[i]);
						            }
						        }
						        if(list2.length) list=list2.slice(0);*/
						        var dialog=ui.create.dialog('〖图变〗：请选择一张武将牌？','hidden',[list,'character']);
						        player.chooseButton(dialog,true).set('ai',function(button){
						            var att=get.attitude(player,target);
						            var sexx=lib.character[button.link][0]
						            if(target.hasSex(sexx)) return get.rank(button.link,true)*att;
						            return att/get.rank(button.link,true);
						        }).set("target",event.target);
						        "step 4"
						        if(result.links){
						            event.numx=0
						            var link=result.links[0]
						            event.target.setAvatar(event.target.name,link);
						            var info=lib.character[link]
						            if(event.target.sex==info[0]||event.target==player){
						                var skills=lib.character[link][3]
						                for(var i of skills){
						                    event.target.addSkill(i);
						                }
						                game.log(event.target,"获得技能","#y"+get.translation(skills));
						                event.goto(7);
						            }
						            event.targetx=result.links[0]
						        }
						        "step 5"
						        if(event.numx==0){
						            var skills=event.target.getSkills(null,false,false).filter(function(skill){
						                var info=lib.skill[skill];
						                return lib.translate[skill]&&lib.translate[skill+'_info']&&!info.sub;
						            });
						        }else{
						            var skills=lib.character[event.targetx][3]
						        }
						        if(event.isMine()){
						            var text=""
						            if(event.numx==0){
						                text+="〖图变〗：请选择失去一个技能";
						            }else{
						                text+="〖图变〗：请选择获得一个技能";
						            }
						            var dialog=ui.create.dialog(text,'forcebutton','hidden');
						            for(i=0;i<skills.length;i++){
						                if(lib.translate[skills[i]+'_info']){
						                    var translation=get.translation(skills[i]);
								        	if(translation[0]=='新'&&translation.length==3){
									        	translation=translation.slice(1,3);
					        				}
					        				else{
					        				    translation=translation.slice(0,2);
									        }
									        var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
									        item.firstChild.link=skills[i];
									    }
									}
								}
								player.chooseControl(skills,true).set('prompt',text).set('ai',function(){
								    return skills.randomGet();
								}).set('dialog',dialog).set('num',event.numx);
								"step 6"
								if(result.control){
								    if(event.numx==0){
								        event.target.removeSkill(result.control,true);
						                game.log(event.target,"选择失去技能","#y"+get.translation(result.control));
						                event.numx++
						                event.goto(4);
						            }else{
						                event.target.addSkillLog(result.control);
						            }
						        }
						        "step 7"
						        var sexs=player.sex
						        var sexx=["female","male","double","none"].randomGet();
						        player.sex=sexx
						        game.log(player,"将性别改为了","#y"+sexx);
						        if(player.hasSex("double")){
						            player.gainMaxHp();
						        }
						        if(player.sex==sexs){
						            if(player.isDamaged()) player.recover();
						            player.draw();
						        }else{
						            player.loseHp();
						        }
                            },
                        },
                    },
                    ai:{
                        order:8,
                        threaten:3.5,
                        expose:0.5,
                        result:{
                            target:function(player,target){
                                var att=get.attitude(player,target);
                                if(att>0) return 1;
                                return 0.2;
                            },
                            player:function(player){
                                if(player.maxHp==1) return 0.1;
                                return 1;
                            },
                        },
                    },
				},
				
			},
			dynamicTranslate:{
			    "xjzh_qixia_tianshu":function(player){
					if(game.getExtensionConfig('金庸群侠传','enable')) return get.translation('xjzh_qixia_tianshu_info');
					return '《金庸群侠传》扩展未安装或未开启，此技能不可用。'
			    },
			},
			translate:{
			    //美女如云
				"xjzh_meiren_linshuang":"林霜",
				"xjzh_meiren_gaoyu":"高雨",
				"xjzh_meiren_zhaoyushu":"赵玉姝",
				"xjzh_meiren_linjiasheng":"林嘉笙",
				"xjzh_meiren_wuyufeng":"吴玉凤",
				"xjzh_meiren_huangyuke":"黄毓珂",
				"xjzh_meiren_xiangwanru":"向婉茹",
				"xjzh_meiren_huangdanxue":"黄丹雪",
				
				"xjzh_meiren_juese":"绝色",
				"xjzh_meiren_juese_info":"出牌阶段限一次，你可以弃置一张黑色牌选择一名男性角色或弃置一张红色牌选择一名其他女性角色，然后执行以下规则：黑色，令其随机获得“弃置两张牌（不足则改为你摸两张牌）”或“失去所有技能直到其回合结束”；红色，令其随机获得“摸两张牌”或“回复一点体力（若其未受伤你可以再次发动该技能）”。",
				"xjzh_meiren_xiuya":"秀雅",
				"xjzh_meiren_xiuya_info":"锁定技，你的回合外，每当你需要打出或使用一张牌时，若牌顶堆的前三张有这张牌，你获得之",
				"xjzh_meiren_shumei":"淑美",
				"xjzh_meiren_shumei_info":"当你受到伤害后，你可以选择一项：1，选择一个目标令其随机获得一个技能并摸一张牌，2；令伤害来源弃置一张牌然后你摸3张牌。你可以重复此流程x-1次（x为你本回合受到伤害的次数）",
				"xjzh_meiren_ganling":"甘霖",
				"xjzh_meiren_ganling_info":"锁定技，你防止受到所有伤害；你成为其他角色非转化的延时锦囊目标时，你令其无效且获得一张同名牌；你的回合外，你无法失去体力和体力上限；你防止非正常阵亡。",
				"xjzh_meiren_miaofa":"妙法",
				"xjzh_meiren_miaofa_info":"锁定技，游戏开始及你的准备阶段开始时，你失去一点体力并摸一张牌，然后从未上场的<span style=\"color: blue\">〖仙家之魂〗</span>扩展武将中展示两个技能并选择获得一个技能，限定技，觉醒技，主公技等特殊技能除外",
				"xjzh_meiren_lunzhuan":"轮转",
				"xjzh_meiren_lunzhuan_info":"锁定技，你的手牌上限始终为你的体力上限<li>每局游戏限3次，当你阵亡前，若你的体力上限不小于2，你失去一点体力上限并恢复体力至1，然后弃置判定区的所有牌并摸手牌上限张牌<li>你失去牌有45%几率摸一张牌<li>你濒死时有40%几率恢复一点体力",
				"xjzh_meiren_jingzhuang":"镜装",
				"xjzh_meiren_jingzhuang_info":"锁定技，当你受到伤害前，你可以随机获得以下效果之一：<li>取消之并令其受到一点伤害<li>摸两张牌<li>受到伤害+1",
				"xjzh_meiren_chunxiao":"春宵",
				"xjzh_meiren_chunxiao_info":"锁定技，当你受到伤害后，伤害来源获得一个“春”标记，你获得春宵效果，你造成伤害有25%几率获得一点体力上限并摸一张牌（对有“春”标记的目标几率翻倍并令其弃置一张牌，然后移除标记），你对拥有“春”标记的目标造成伤害后失去春宵效果直到下次受到伤害",
				"xjzh_meiren_meihun":'魅魂',
				"xjzh_meiren_meihun_info":'锁定技，当你成为具有[伤害]标签的卡牌的目标后，你可以令一名其他角色交给你一张你声明的花色的手牌，若其没有则你观看其手牌然后弃置其中一张<li>其他角色每获得你一张牌时，须弃置一张牌',
				"xjzh_meiren_meihun2":"魅魂",
				"xjzh_meiren_tianzi":"天姿",
				"xjzh_meiren_tianzi_info":"锁定技，其他角色回合开始时，若其手牌大于你，你摸一张牌<li>你的准备阶段，若你的手牌为全场最多或之一，你可以选择:①失去一点体力;②你调整手牌数为你的体力值并摸体力上限张牌，若此时你的手牌为全场唯一最多，你跳过摸牌阶段）",
				"xjzh_meiren_tianzi2":"天姿",
				"xjzh_meiren_huoxin_control":'惑心',
				"xjzh_meiren_huoxin":'惑心',
				"xjzh_meiren_huoxin_info":'锁定技，出牌阶段限一次，你可以选择两个目标，然后令其拼点，若其没有手牌则摸可以一张牌，输家获得1个“魅惑”标记，然后你和赢家摸一张牌。拥有一个或更多“魅惑”的角色回合即将开始时，该角色移除其所有“魅惑”，此回合改为由你操控。',
				"xjzh_meiren_huizhi":"蕙质",
				"xjzh_meiren_huizhi_info":"锁定技，游戏开始后，你随机获得三张未加入游戏的武将牌称为“兰心”，并选择一张武将牌，你拥有该武将牌的所有技能且同时将性别和势力属性变成与该武将相同直到该武将牌被替换。你的每个准备阶段和结束阶段或受到伤害后，你可以选择一项：①弃置至多两张未展示的武将牌牌并重新获得等量武将牌，然后摸等量手牌；②更换所展示的武将牌或技能并摸一张牌。（你不可声明限定技、觉醒技、隐匿技、主公技等特殊技能）。",
				"xjzh_meiren_huizhi2":"蕙质",
				"xjzh_meiren_lanxin":"兰心",
				"xjzh_meiren_lanxin_info":"锁定技，你受到伤害或流失体力后，你获得等量新的武将牌。",
				"xjzh_meiren_gupan":"顾盼",
				"xjzh_meiren_gupan_info":"当你于回合外成为卡牌目标时，若你的“兰心”大于3且你已受伤，你可以弃置一张“兰心”然后摸x张牌(x为此“兰心”牌上的技能数量，当技能数量不大于2时，x等于2)。",
				"xjzh_meiren_rouqing":"柔情",
				"xjzh_meiren_rouqing_info":"锁定技，准备阶段开始时，若你的手牌只有一种花色，你可以依次亮出牌顶堆的牌，直到出现与你手牌同花色的牌，然后你获得这些牌。",
				"xjzh_meiren_jiaqi":"佳期",
				"xjzh_meiren_jiaqi_info":"当你受到伤害后，你可以弃置任意张不同花色的牌，令一名其他角色选择：弃置等量相同花色组成的牌；或翻面并获得你弃置的牌。",
				"xjzh_meiren_huimeng":"回梦",
				"xjzh_meiren_huimeng_info":"当你成为卡牌目标后，若你没有手牌，你可以观看牌顶堆x张牌并选择一种花色获得之，反之若你的卡牌数不为全场唯一最多，则你摸一张牌（x为你的体力值+1）",
				"xjzh_meiren_xianyou":"仙游",
				"xjzh_meiren_xianyou_info":"锁定技，当你发动〖<font color=red>回梦</font>〗之后，你获得一个“游”标记</br></br>当一名场上一名角色受到伤害后，你可以移除x个标记令其与伤害来源交换手牌，若你不为其，你摸一张牌（x你的手牌数）</br></br>当你成为卡牌目标时，你可以移除一个标记，并依据以下规则发动技能：<li>【杀】：你对其使用一张决斗，若你造成伤害，则该卡牌无效<li>【决斗】：你对其使用一张【杀】，若你未对其造成伤害，你弃置两张牌",
				"xjzh_meiren_xianyou1":"仙游",
				"xjzh_meiren_xianyou2":"仙游",
				"xjzh_meiren_xianyou3":"仙游",
				"xjzh_meiren_moqing":"默情",
				"xjzh_meiren_moqing_info":"锁定技，你无法成为男性角色的非[伤害]卡牌目标以及【南蛮入侵】、【万箭齐发】、【五谷丰登】的目标<li>你无法使用【南蛮入侵】、【万箭齐发】、【五谷丰登】<li>每当你成为女性角色的[伤害]卡牌目标时，你指定（重新指定）一名男性角色直到其下一次使用指定目标包含你的非[伤害]卡牌后，你可以成为其非[伤害]卡牌目标。",
				"xjzh_meiren_zhongqing":"钟情",
				"xjzh_meiren_zhongqing_info":"锁定技，游戏开始时，你指定一名角色为你的钟情对象，当其/你成为不为其/你的卡牌目标时，令你/其也成为目标，然后你与其各摸一张牌。",
				"xjzh_meiren_yiqing":"移情",
				"xjzh_meiren_yiqing_info":"当你成为不为你的女性角色的非伤害性卡牌目标或男性角色的伤害性卡牌目标且为唯一目标时，你可以进行一次判定：♥目标转移给下家♠目标转移给上家<li>锁定技，当你指定你的上家和下家为目标或你成为你的上家或下家的目标时，你摸一张牌。",
				"xjzh_meiren_shangqing":"伤情",
				"xjzh_meiren_shangqing_info":"觉醒技，你的回合开始时，若你已至少发动6次〖钟情〗，你失去〖钟情〗，获得〖默情〗，然后你与一名其他角色交换体力值、体力上限。",
				"xjzh_meiren_moqing":"默情",
				"xjzh_meiren_moqing_info":"你无法成为所有指定角色为全部目标卡牌的目标；你受到伤害后，你可以与一名体力值不与你相等角色交换体力值，然后若其体力值大于你，你于当前回合结束后摸一张牌并开始一个出牌阶段。",
				"xjzh_meiren_qingquan":"清泉",
				"xjzh_meiren_qingquan_info":"锁定技，当你回复体力后，你获得一点护甲；出牌阶段，你可以移除任意点护甲并令一名其他角色获得等量护甲。",
				"xjzh_meiren_hanshuang":"寒霜",
				"xjzh_meiren_hanshuang_info":"觉醒技，当你阵亡时，你失去一点体力上限取消之并将清泉中的“获得一点护甲”改为“获得两点护甲”，然后回复体力至1并获得技能〖凛冬〗。",
				"xjzh_meiren_lingdong":"凛冬",
				"xjzh_meiren_lingdong_info":"锁定技，场上除你之外的所有角色回复体力都会令你获得一点护甲；你有护甲时，造成伤害始终视为冰属性伤害，且目标有几率获得1层冰缓；你的回合开始时，若场上除你之外所有角色均有冰缓，你移除场上所有角色冰缓，并令其受到等同于其冰缓层数的冰属性伤害。",
				
				//天命奇侠
				"xjzh_qixia_daxiongxiaomao":"大熊小猫",
				"xjzh_qixia_maybe":"昔日烈火",
				"xjzh_qixia_mumuxiao":"木木枭",
				
				"xjzh_qixia_qice":"奇策",
				"xjzh_qixia_qice_info":"其他角色摸牌后，若这些牌的类别不小于2，你可以观看并选择其中一种类别，令其弃置该类别的所有牌然后摸等量牌。",
				"xjzh_qixia_tianshu":"天书",
				"xjzh_qixia_tianshu_info":"锁定技，你的准备/结束阶段，你将一张《金庸群侠传》的武将牌写入天书，然后你视为拥有此武将牌上的技能；出牌阶段限一次，你可以获得天书上一张武将牌的一个技能，若如此做，你弃置该武将牌，然后获得牌堆点数和为这张武将牌上技能描述字数一致的任意张牌。",
				"xjzh_qixia_xiongmao":"熊猫",
				"xjzh_qixia_xiongmao_info":"出牌阶段限一次，你可以将你的武将原画调整为一名随机女性角色的原画，然后你将势力、性别、体力上限、体力值均调整为与其一致。",
				"xjzh_qixia_jiyuan":"急援",
				"xjzh_qixia_jiyuan_info":"当一名角色即将受到伤害时，你可以代替其受到伤害，若如此做，其摸两张牌；场上每有一名友方角色，你的回合开始时，你回复一点体力（至低为1），多余的回复转为摸牌（至低为1）",
				"xjzh_qixia_jibian":"机变",
				"xjzh_qixia_jibian_info":"当你受到伤害后，你摸x张点数为y的牌(x为你与伤害来源的体力差的绝对值，至低为1，y为体力和，至多为13)，然后令其技能描述中含有[伤害]的技能替换为〖仁德〗。",
				"xjzh_qixia_tubian":"图变",
				"xjzh_qixia_tubian_info":"出牌阶段、你受到伤害后限一次，你可以输入一名武将的武将名并展示3张武将名中包含你所输入的值的武将牌(至多5个汉字，若无对应汉字的武将牌或未输入，则改为随机展示3张武将牌)，并将一名角色武将图片改为你选择的武将图片，若其性别与你选择的武将性别不一致，你选择并令其失去当前武将牌上的一个技能，然后你选择令其获得你选择武将牌上的一个技能，否则其（或你为目标时）获得你选择的武将牌上的所有技能，若如此做，你随机切换你的武将性别。技能结算后，若你的武将性别为双，你获得一点体力上限，若你未改变性别，你回复一点体力并摸一张牌，否则你失去一点体力。",
				
				"XWCS_meiren":"美人如玉",
				"XWCS_qixia":"天命奇侠",
				
			},
		};
		if(true){
			for(var i in XWCS.character){
				//阵亡配音
				XWCS.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWCS.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWCS.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(var i in XWCS.character){
				XWCS.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
		return XWCS;
	});
});