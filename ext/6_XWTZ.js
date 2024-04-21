'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('XWTZ')) lib.config.characters.remove('XWTZ');
		lib.translate['XWTZ_character_config']='仙武挑战';
		var XWTZ={
			name:'XWTZ',
			connect:true,
			connectBanned:[],
			character:{
			    //普通BOSS
				"xjzh_boss_zuoyou":["female","shen","3/4",["xjzh_boss_huanxian","xjzh_boss_pangmen","xjzh_boss_zuodao"],["unseen","forbidai"]],
				"xjzh_boss_lvbu":["male","shen",6,["xjzh_boss_jiwu","xjzh_boss_feijiang","xjzh_boss_benxi","xjzh_boss_xiuluo"],["boss","bossallowed"]],
				"xjzh_boss_zhangjiao":["male","shen",4,["xjzh_boss_qingling","xjzh_boss_dianxing"],["boss","bossallowed"]],
				
				//普通BOSS随从
				"xjzh_boss_hjbingyong":["male","qun",3,["xjzh_boss_fubing"],["unseen","forbidai","hiddenboss","bossallowed"]],
				"xjzh_boss_hjlishi":["male","qun",3,["xjzh_boss_fuli"],["unseen","forbidai","hiddenboss","bossallowed"]],
				"xjzh_boss_hjshushi":["male","qun",3,["xjzh_boss_fushui"],["unseen","forbidai","hiddenboss","bossallowed"]],
				"xjzh_boss_hjfangshi":["male","qun",3,["xjzh_boss_fuhuo"],["unseen","forbidai","hiddenboss","bossallowed"]],
				"xjzh_boss_hjguishi":["male","qun",3,["xjzh_boss_guishu"],["unseen","forbidai","hiddenboss","bossallowed"]],
				
				//奇术BOSS
				"xjzh_boss_geligaoli":["male","shen",15,["xjzh_qishu_materialRemove","xjzh_boss_dianmao","xjzh_boss_dianchong","xjzh_boss_dianhua"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_duruier":["male","shen",18,["xjzh_qishu_materialRemove","xjzh_boss_mengdu","xjzh_boss_huanshen"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_qier":["male","shen",6,["xjzh_qishu_materialRemove","xjzh_boss_fusu","xjzh_boss_ganran","xjzh_boss_xuezhou"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_bingchuanjushou":["double","shen",12,["xjzh_qishu_materialRemove","xjzh_qishu_shouyu","xjzh_qishu_shendong","xjzh_qishu_feimou"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_lilisi":["female","shen",6,["xjzh_qishu_materialRemove","xjzh_boss_lianji","xjzh_boss_qiangji","xjzh_boss_zenghen"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_waershen":["male","shen",12,["xjzh_qishu_materialRemove","xjzh_boss_fennu","xjzh_boss_edu","xjzh_boss_canren"],["boss","bossallowed","qishuBoss"]],
				"xjzh_boss_ttshilian":['double','',0,['xjzh_qishu_materialRemove','xjzh_boss_shilian','xjzh_boss_shilian_intro'],['boss','qishuBoss'],'zhu'],
				
				//奇术BOSS随从
				"xjzh_boss_yinaruisi":['double','shen',12,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_masayier":['double','shen',15,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_taernasha":['double','shen',12,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				
				"xjzh_boss_xiaotianshi":['double','shen',4,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_datianshi":['double','shen',6,['xjzh_boss_shenghui2','xjzh_boss_chiyan','xjzh_boss_shilian2'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_gaotianshi":['double','shen',8,['xjzh_boss_shenghui3','xjzh_boss_caijue','xjzh_boss_shilian2'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_tianshizhang":['double','shen',10,['xjzh_boss_shenghui4','xjzh_boss_caijue2','xjzh_boss_shenyou','xjzh_boss_shilian2'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_duohunzhe":['double','shen',4,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_duotianshi":['double','shen',4,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				"xjzh_boss_shachong":['double','shen',4,['xjzh_boss_shenghui'],['unseen','forbidai',"hiddenboss","bossallowed"]],
				
			},
			characterIntro:{
			    "xjzh_boss_lilisi":"莉莉丝是游戏《暗黑破坏神Ⅱ》及《暗黑破坏神IV》中的角色，是憎恨之王墨菲斯托的女儿、庇护所的创造者。<br><br>消耗所有材料各2个可以挑战该boss，胜利时奖励至少1个精魄，额外获得2倍于本局碎片数量个碎片，有几率获得1-4级奇术要件1个，必定获得随机5级奇术要件1个。",
			    "xjzh_boss_waershen":"瓦尔申《暗黑破坏神IV》中的角色。<br><br>消耗恶念之心、颤栗之手、发黑的股骨、咕噜头颅各2个可以挑战该boss，胜利时奖励2个活体钢铁、1个粘液覆盖的蛋，额外获得3个碎片。",
				"xjzh_boss_zuoyou":"据说是左慈的女儿/徒弟，但无从查据",
				"xjzh_boss_lvbu":"字奉先，并州五原郡九原县人。东汉末年名将、东汉末年群雄之一。",
				"xjzh_boss_zhangjiao":"（？－184年），钜鹿（秦治今河北平乡、东汉治今河北宁晋）人。中国东汉末年农民起义军“黄巾军”的领袖。",
				"xjzh_boss_geligaoli":"消耗5个活体钢铁可以挑战该boss，胜利时奖励1个苦痛碎片，额外获得5个碎片。",
				"xjzh_boss_duruier":"督瑞尔是游戏《暗黑破坏神Ⅱ》及《暗黑破坏神IV》中的角色，次级恶魔之一，也称痛苦之王，与所有的大恶魔一样，督瑞尔是从塔萨米特的七个头颅之一中生成的，他统治着地狱的痛苦领域。<br><br>消耗5个活体钢铁可以挑战该boss，胜利时奖励2个提纯的恐惧、2个提纯的鲜血，额外获得7个碎片。",
				"xjzh_boss_qier":"消耗9个提纯的鲜血可以挑战该boss，胜利时奖励3个提纯的恐惧，额外获得10个碎片。",
				"xjzh_boss_bingchuanjushou":"消耗9个提纯的恐惧可以挑战该boss，胜利时奖励3个提纯的鲜血，额外获得10个碎片。",
				"xjzh_boss_ttshilian":"消耗一个“世界之石碎片”参加一场高阶天堂试炼挑战，该挑战分为以下几个阶段<br><br><li>第一阶段：挑战1个大天使和2小天使<br><br><li>第二阶段：挑战1个高阶天使和2个大天使<br><br><li>第三阶段：挑战1个天使长和2个高阶天使<br><br><li>第四阶段：<br><br>早上8点-12点，晚上20点-24点挑战boss“伊纳瑞斯”和2个天使长<br><br>下午12点-16点，晚上0点-4点挑战boss“马萨伊尔”和1个夺魂者、1个堕落天使<br><br>除以上时间外挑战boss“塔尔拉沙”和2个剧毒沙虫",
				
			},
			characterTitle:{
				"xjzh_boss_zuoyou":"玄妙无双",
				"xjzh_boss_lvbu":"武之化身",
				"xjzh_boss_zhangjiao":"太平道人",
				"xjzh_boss_lilisi":"人类之母",
				"xjzh_boss_waershen":"恶念之源",
				"xjzh_boss_duruier":"痛苦之王",
				"xjzh_boss_geligaoli":"流电圣徒",
				
			},
			perfectPair:{
			},
			characterReplace:{
			},
			characterFilter:{
                'xjzh_boss_waershen':function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
				"xjzh_boss_geligaoli":function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
				"xjzh_boss_duruier":function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
				"xjzh_boss_qier":function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
				"xjzh_boss_bingchuanjushou":function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
				"xjzh_boss_lilisi":function(mode){
                    if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
				},
                'xjzh_boss_lvbu':function(mode){
                    if(mode!='boss') return false;
				},
                'xjzh_boss_zuoyou':function(mode){
                    if(mode!='boss') return false;
				},
                'xjzh_boss_zhangjiao':function(mode){
                    if(mode!='boss') return false;
				},
                'xjzh_boss_hjbingyong':function(mode){
                    return false;
				},
                'xjzh_boss_hjlishi':function(mode){
                    return false;
				},
                'xjzh_boss_hjshushi':function(mode){
                    return false;
				},
                'xjzh_boss_hjfangshi':function(mode){
                    return false;
				},
                'xjzh_boss_hjguishi':function(mode){
                    return false;
				},
				
			},
			skill:{
			    "xjzh_boss_shilian_intro":{sub:true,nobracket:true,unique:true},
			    "xjzh_qishu_shouyu":{
					mod:{
						targetEnabled(card){
							if(get.type(card)=='delay') return false;
						},
					},
					trigger:{
					    global:"phaseZhunbeiBegin",
					},
					forced:true,
					locked:true,
					priority:3,
					filter(event,player){
					    if(event.player==player) return false;
					    let cards=lib.inpile.filter(card=>{
					        return get.type(card)=="delay";
					    });
					    if(event.player.countCards("j",card=>{
					        return cards.includes(card.name);
					    })==cards.length) return false;
					    return true;
					},
					async content(event,trigger,player){
					    let cards=lib.inpile.filter(card=>{
					        return get.type(card)=="delay"&&!trigger.player.countCards('j',{name:card});
					    });
					    if(cards.length){
                            trigger.player.executeDelayCardEffect(cards.randomGet());
                        }
                    }, 
			    },
			    "xjzh_qishu_shendong":{
					trigger:{
					    source:"damageBegin1",
					},
					forced:true,
					locked:true,
					priority:3,
					filter(event,player){
					    return !game.hasNature(event,"ice");
					},
					async content(event,trigger,player){
					    game.setNature(trigger,"ice");
                    },
                    subSkill:{
                        "use":{
                            enable:"phaseUse",
                            usable:1,
                            prompt(){
                                return "〖深冻〗：选择一名对你造成过伤害的角色，令其弃置x张牌，每少弃置一张牌失去一点体力上限（x为其对你造成伤害的次数）。";
                            },
                            filter(event,player){
                                let history=player.getAllHistory('damage');
                                return history.length;
                            },
                            filterTarget(card,player,target){
                                return target.getAllHistory('sourceDamage',evt=>{
                                    return evt&&evt.player==player;
                                }).length;
                            },
                            async content(event,trigger,player){
                                let target=event.targets[0];
                                let history=target.getAllHistory('sourceDamage',evt=>{
                                    return evt&&evt.player==player;
                                });
                                let history2=player.getAllHistory('damage',evt=>{
                                    return evt&&evt.source==target;
                                });
                                const [bool,cards]=await target.chooseToDiscard('he',`〖深冻〗：请选择弃置至多${history.length}张牌，否则失去等量体力上限`).set('ai',card=>{
                                    return 6-get.value(card);
                                }).forResult('bool','cards');
                                if(bool&&cards.length<history.length){
                                    target.loseMaxHp(cards.length-history.length);
                                    await target.getHistory('sourceDamage').removeArray(history);
                                    await player.getHistory('damage').removeArray(history2);
                                }
                            },
                        },
                    },
			    },
			    "xjzh_qishu_feimou":{
					trigger:{
					    player:"damageEnd",
					},
					forced:true,
					locked:true,
					priority:3,
					filter(event,player){
					    if(event.source==player) return false;
					    return event.source.countCards('h');
					},
					async content(event,trigger,player){
					    let cards=trigger.source.getCards('h');
					    player.gain(cards,trigger.source,'draw');
					    let num=get.rand(0,cards.length);
					    if(num>0){
					        let card=cards.randomRemove(num);
					        trigger.source.gain(card,player,'draw');
					    }
                    },
                    ai:{
                        maixie:true,
                        maixie_hp:true,
                    },
			    },
			    "xjzh_boss_shilian":{
    			    trigger:{
    			        global:'gameStart',
    			        player:"enterGame",
    			    },
    				forced:true,
    				popup:false,
    				unique:true,
    				fixed:true,
    				charlotte:true,
    				content:function(){
    				    "step 0"
    				    if(game.boss==game.me){
    				        player.say("试炼关卡不允许玩家为boss，本次不消耗材料");
    				        game.over(false);
    				    }
    				    "step 1"
    					player.smoothAvatar();
    					player.init('xjzh_boss_datianshi');
    					_status.noswap=true;
    					game.addVideo('reinit2',player,player.name);
    					"step 2"
    					game.delay();
    					"step 3"
    					game.boss.changeSeat(6);
    					"step 4"
    					game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
    					game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
    				},
			    },
    			"xjzh_boss_shilian2":{
    				trigger:{player:'dieBegin'},
    				forced:true,
    				priority:-10,
    				fixed:true,
        			unique:true,
    				filter:function(event,player){
    					if(get.mode()!='boss') return false;
    					return event.player==game.boss;
    				},
    				content:function(){
    					'step 0'
    					let list=["xjzh_boss_yinaruisi","xjzh_boss_masayier","xjzh_boss_taernasha"];
    					if(!list.filter(name=>{
    					    return get.playerName(game.boss).includes(name);
    					}).length) trigger.cancel(null,null,'notrigger');
    					'step 1'
    					game.delay();
    					"step 2"
    					if(get.playerName(game.boss,"xjzh_boss_datianshi")){
    					    game.changeBoss('xjzh_boss_gaotianshi');
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_gaotianshi")){
    					    game.changeBoss('xjzh_boss_tianshizhang');
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_tianshizhang")){
    					    if(get.xjzh_checkTime("8:00","12:00")||get.xjzh_checkTime("20:00","24:00")){
    					        game.changeBoss('xjzh_boss_yinaruisi');
    					    }
    					    else if(get.xjzh_checkTime("12:00","16:00")||get.xjzh_checkTime("0:00","4:00")){
    					        game.changeBoss('xjzh_boss_masayier');
    					    }
    					    else{
    					        game.changeBoss('xjzh_boss_taernasha');
    					    }
    					}
    					for(var i=0;i<game.players.length;i++){
    						game.players[i].hp=game.players[i].maxHp;
    						game.players[i].update();
    					}
    					game.delay(0.5);
    					"step 3"
    					if(get.playerName(game.boss,"xjzh_boss_gaotianshi")){
    					    game.changeBossFellow("xjzh_boss_datianshi");
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_tianshizhang")){
    					    game.changeBossFellow('xjzh_boss_gaotianshi');
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_yinaruisi")){
    					    game.changeBossFellow("xjzh_boss_tianshizhang");
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_masayier")){
    					    var targets=game.filterPlayer(function(current){return current.identity=="zhong"});
    					    if(targets.length){
    					        if(targets.length>=2){
    					            for(var i=0;i<targets.length;i++){
    					                if(i==0){
    					                    game.changeBossFellow("xjzh_boss_duohunzhe",targets[i]);
    					                }else{
    					                    game.changeBossFellow("xjzh_boss_duotianshi",targets[i]);
    					                }
    					            }
    					        }else{
    					            if(targets.length==1){
        					            game.changeBossFellow("xjzh_boss_duohunzhe");
        					            var num=targets[0].dataset.position;
        					            if(num==5){
        					                game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
        					            }else{
        					                game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
        					            }
        					        }else{
        					            game.addBossFellow2(7,"xjzh_boss_xiaotianshi",0,4);
        					            game.addBossFellow2(5,"xjzh_boss_xiaotianshi",0,4);
        					        }
    					        }
    					    }
    					}
    					else if(get.playerName(game.boss,"xjzh_boss_taernasha")){
    					    game.changeBossFellow("xjzh_boss_shachong");
    					}
    					"step 4"
    					var dnum=0;
    					var dead=game.dead.slice(0);
    					for(var i=0;i<dead.length;i++){
    						if(!dead[i].side&&dead[i].maxHp>0&&dead[i].parentNode==player.parentNode){
    							dead[i].revive(dead[i].maxHp);
    							dnum++;
    						}
    					}
    					for(var i=0;i<game.players.length;i++){
    						if(game.players[i].side) continue;
    						game.players[i].removeEquipTrigger();
    						var hej=game.players[i].getCards('hej');
    						for(var j=0;j<hej.length;j++){
    							hej[j].discard(false);
    						}
    						game.players[i].hp=game.players[i].maxHp;
    						game.players[i].hujia=0;
    						game.players[i].classList.remove('turnedover');
    						game.players[i].removeLink();
    						game.players[i].directgain(get.cards(4-dnum));
    					}
    					"step 5"
    					while(_status.event.name!='phaseLoop'){
    						_status.event=_status.event.parent;
    					}
    					game.resetSkills();
    					_status.paused=false;
    					_status.event.player=game.boss;
    					_status.event.step=0;
    					_status.roundStart=game.boss;
    					game.phaseNumber=0;
    					game.roundNumber=0;
    					if(game.bossinfo){
    						game.bossinfo.loopType=1;
    					}
    				}
    			},
    			"xjzh_boss_shenghui":{
    			    trigger:{
    			        player:"phaseDrawBegin",
    			    },
    			    forced:true,
    			    locked:true,
    			    priority:5,
    			    content:function(){
    			        trigger.num+=2;
    			        player.recover();
    			    },
    			},
    			"xjzh_boss_shenghui2":{
    			    trigger:{
    			        player:["phaseDrawBegin","phaseJieshuBegin"],
    			    },
    			    forced:true,
    			    locked:true,
    			    priority:5,
    			    content:function(){
    			        player.chooseDrawRecover(2,2,true,"〖圣辉〗：请选择摸两张牌或回复两点体力")._triggered=null;
    			    },
    			},
    			"xjzh_boss_chiyan":{
    			    enable:"phaseUse",
    			    usable:1,
    			    filterTarget:lib.filter.notMe,
    			    selectTarget:1,
    			    content:function(){
    			        "step 0"
    			        target.showHandcards();
    			        var cards=target.getCards('h',card=>get.suit(card)=="diamond");
    			        if(cards.length){
    			            var cards=cards.slice(0);
    			            while(cards.length){
    			                cards.shift();
    			                player.useCard({name:"sha",nature:"fire",isCard:true},target);
    			                game.delay();
    			            }
    			        }
    			        "step 1"
    			        if(player.getStat('damage')){
    			            var players=player.getFriends(true).sortBySeat();
    	                    for(var i of players) i.recover();
   		                }
    			    },
    			    ai:{
    			        order:12,
    			        result:{
    			            target:-1,
    			        },
    			    },
    			},
    			"xjzh_boss_shenghui3":{
    			    trigger:{
    			        player:["drawBegin","recoverBegin"],
    			    },
    			    forced:true,
    			    locked:true,
    			    priority:5,
					filter(event,player){
						if(event.name=="recover"){
							return game.countPlayer(current=>current.isDamaged())>=1;
						}
						return true;
					},
    			    async content(event,trigger,player){
    			        let num=trigger.num;
						const targets=await player.chooseTarget(`〖圣辉〗：请选择一名其他角色${trigger.name=="draw"?`摸${num}张牌`:`回复${num}点体力`}`,lib.filter.notMe).set('ai',target=>get.attitude(player,target)).forResultTargets();
						if(targets) targets[0][trigger.name](num);
    			        player.changeHujia(1);
    			    },
    			},
    			"xjzh_boss_caijue":{
    				enable:"phaseUse",
    				usable:1,
    				filter:function(event,player){
    				    return player.countCards('h')>0;
    				},
    				content:function(){
    					"step 0"
    					var targets=player.getEnemies().sortBySeat();
    					event.targets=targets.slice(0);
    					"step 1"
    					event.target=event.targets.shift();
    					"step 2"
    					if(event.target.countCards('h')==0){
    						event.goto(1);
    						event.finish();
    						return;
    					}
    					else if(event.target.countCards('h')==1) event._result={cards:event.target.getCards('h')};
    					else event.target.chooseCard(true).ai=function(card){
    						if(_status.event.getRand()<0.5) return Math.random();
    						return get.value(card);
    					};
    					"step 3"
    					event.target.showCards(result.cards).setContent(function(){});
    					event.dialog=ui.create.dialog(get.translation(event.target)+'展示的手牌',result.cards);
    					event.videoId=lib.status.videoId++;
    					game.broadcast('createDialog',event.videoId,get.translation(event.target)+'展示的手牌',result.cards);
    					game.addVideo('cardDialog',null,[get.translation(event.target)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
    					event.card2=result.cards[0];
    					game.log(event.target,'展示了',event.card2);
    					event._result={};
    					player.chooseToDiscard('he',{suit:get.suit(event.card2)},`〖裁决〗：请弃置一张花色为${get.translation(get.suit(event.card2))}的牌`,function(card){
    						var evt=_status.event.getParent();
    						if(get.damageEffect(evt.target,evt.player,evt.player,'thunder')>0){
    							return 6.2+Math.min(4,evt.player.hp)-get.value(card,evt.player);
    						}
    						return -1;
    					}).set('prompt',false);
    					game.delay(2);
    					"step 4"
    					if(result.bool){
    						event.target.damage(1,player,'thunder','nocard');
    						player.draw();
    					}
    					event.dialog.close();
    					game.addVideo('cardDialog',null,event.videoId);
    					game.broadcast('closeDialog',event.videoId);
    					"step 5"
    					if(event.targets.length){
    					    event.goto(1);
    					}
    				},
    				ai:{
    				    order:8,
    					result:{
    					    player:function(card,player,target){
    					        var ts=player.getEnemies().length;
    					        var hs=player.countCards('h');
    					        if(hs<ts) return 0.5;
    					        if(hs>=ts){
    					            if(hs==ts) return 0.8;
    					            if(hs>ts) return 1;
    					            if(hs>ts+2) return 1.5;
    					        
    					        }
    					        return 0;
    					    },
    					},
    			    },
    			},
    			"xjzh_boss_shenghui4":{
    			    trigger:{
    			        player:["phaseDiscardBefore","useCard"],
    			    },
    			    forced:true,
    			    locked:true,
    			    priority:5,
    			    filter:function(event,player){
    			        if(event.name=="phaseDiscard") return true;
    			        if(event.name=="useCard") return player.isPhaseUsing();
    			        return false;
    			    },
    			    content:function(){
    			        if(trigger.name=="phaseDiscard"){
    			            trigger.cancel(null,null,'notrigger');
    			        }else{
    			            var num=player.getDamagedHp();
    			            var num2=1;
    			            if(player.hasSkill("xjzh_boss_caijue2_on")){
    			                [num,num2]=[num2,num];
    			            }
    			            if(get.type(trigger.card)=="basic"){
    						    trigger.effectCount+=num;
    						    if(num>0) game.log(trigger.card,'额外结算'+num+'次');
    			            }
    			            else if(get.type(trigger.card)=="trick"){
    			                trigger.effectCount+=num2;
    						    if(num2>0) game.log(trigger.card,'额外结算'+num2+'次')
    			            }
    			        }
    			    },
    			},
    			"xjzh_boss_caijue2":{
    				enable:"phaseUse",
    				usable:1,
    				filter:function(event,player){
    				    return player.countCards('h')>0;
    				},
    				group:"xjzh_boss_caijue2_damage",
    				content:function(){
    					"step 0"
    					player.chooseCard(true,'he',`〖裁决〗：请展示一张牌`);
    					"step 1"
    					player.showCards(result.cards).setContent(function(){});
        				event.dialog=ui.create.dialog(get.translation(player)+'展示的手牌',result.cards);
        				event.videoId=lib.status.videoId++;
        				game.broadcast('createDialog',event.videoId,get.translation(player)+'展示的手牌',result.cards);
        				game.addVideo('cardDialog',null,[get.translation(player)+'展示的手牌',get.cardsInfo(result.cards),event.videoId]);
       					event.card2=result.cards[0];
        				game.log(player,'展示了',event.card2);
        				event._result={};
        				"step 2"
        				var targets=player.getEnemies().sortBySeat();
    					event.targets=targets.slice(0);
    					"step 3"
    					event.target=event.targets.shift();
    					event.target.chooseToDiscard(1,'he','〖裁决〗：请弃置一张牌',{suit:get.suit(event.card2)},function(card){
    						var evt=_status.event.getParent();
    						if(get.damageEffect(evt.target,evt.player,evt.target,'thunder')>0){
    							return 6.2+Math.min(4,evt.player.hp)-get.value(card,evt.player);
    						}
    						return -1;
    					}).set('prompt',false);
    					game.delay(2);
    					"step 4"
    					if(!result.bool){
    						event.target.damage(1,player,'thunder','nocard');
    						player.draw();
    					}
    					event.dialog.close();
    					game.addVideo('cardDialog',null,event.videoId);
    					game.broadcast('closeDialog',event.videoId);
    					"step 5"
    					if(event.targets.length){
    					    event.goto(3);
    					}
    				},
    				subSkill:{
    				    "damage":{
    				        trigger:{
    				            source:"damageAfter",
    				        },
    				        popup:false,
    				        sub:true,
    				        prompt:"〖裁决〗：是否转换〖圣辉〗中的数字",
    				        check:function(event,player){
    				            player.getCardUsable
    				            if(player.isHealthy()){
    				                if(player.getCardUsable("sha")>0&&player.hasUsableCard("sha")&&!player.hasSkill("xjzh_boss_caijue2_on")) return 0;
    				                return 1;
    				            }
    				            return 1;
    				        },
    				        content:function(){
    				            if(player.hasSkill("xjzh_boss_caijue2_on")) player.removeSkill("xjzh_boss_caijue2_on",true);
    				            else player.addSkill("xjzh_boss_caijue2_on");
    				        },
    				    },
    				},
    				"on":{sub:true,charlotte:true,},
    				ai:{
    				    order:8,
    					result:{
    					    player:1,
    					},
    			    },
    			},
    			"xjzh_boss_shenyou":{
    			    locked:true,
    			    charlotte:true,
    			    global:["xjzh_boss_shenyou_use","xjzh_boss_shenyou_damage"],
    			    subSkill:{
    			        "use":{
            			    trigger:{
            			        target:"useCardToTargeted",
            			    },
                            forced:true,
                            preHidden:true,
                            sub:true,
                            filter:function(event,player){
                                if(!get.tag(event.card,'damage')) return false;
                                if(!game.boss.getFriends(true).includes(player)) return false;
                                return get.xjzh_deEffect(player);
                            },
                            content:function(){
                                "step 0"
                                var eff=get.effect(player,trigger.card,trigger.player,trigger.player);
                                trigger.player.chooseToDiscard('〖神佑〗：弃置一张手牌，否则'+get.translation(trigger.card)+'对'+get.translation(player)+'无效').set('ai',function(card){
                                    if(_status.event.eff>0){
                                        return 10-get.value(card);
                                    }
                                    return 0;
                                }).set('eff',eff);
                                "step 1"
                                if(result.bool==false){
                                    trigger.getParent().excluded.add(player);
                                }
                            },
                            ai:{
                                effect:{
                                    "target_use":function(card,player,target,current){
                                        if(get.tag(card,'damage')&&get.attitude(player,target)<0){
                                            if(!game.boss.getFriends(true).includes(target)) return;
                                            if(!get.xjzh_deEffect(target)) return;
                                            if(_status.event.name=='xjzh_boss_shenyou_use') return;
                                            if(get.attitude(player,target)>0&&current<0) return 'zerotarget';
                                            var bs=player.getCards('h');
                                            bs.remove(card);
                                            if(card.cards) bs.removeArray(card.cards);
                                            else bs.removeArray(ui.selected.cards);
                                            if(!bs.length) return 'zerotarget';
                                            if(player.hasSkill('jiu')||player.hasSkill('tianxianjiu')) return;
                                            if(bs.length<=2){
                                                for(var i=0;i<bs.length;i++){
                                                    if(get.value(bs[i])<7){
                                                        return [1,0,1,-0.5];
                                                    }
                                                }
                                                return [1,0,0.3,0];
                                            }
                                            return [1,0,1,-0.5];
                                        }
                                    },
                                },
                            },
                        },
                        "damage":{
            			    trigger:{
            			        player:"damageBegin1",
            			    },
                            forced:true,
                            priority:3,
                            sub:true,
                            filter:function(event,player){
                                if(get.xjzh_deEffect(player)) return false;
                                if(!game.boss.getFriends(true).includes(player)) return false;
                                if(!game.hasNature(event)) return false;
                                return true;
                            },
                            content:function(){
                                trigger.changeToZero();
                            },
                        },
                        ai:{
                            effect:{
                                target:function(card,player,target){
                                    if(!game.boss.getFriends(true).includes(target)) return;
                                    if(!get.xjzh_deEffect(target)) return;
                                    if(get.tag(card,'natureDamage')) return [0,0];
                                },
                            },
                        },
                    },
    			},
			    "xjzh_boss_fusu":{
			        trigger:{
			            player:"loseAfter",
			        },
			        forced:true,
			        locked:true,
			        priority:5,
			        group:"xjzh_boss_fusu_use",
			        global:"xjzh_boss_fusu_mod",
			        content:function(){
			            if(player.isHealthy()) player.draw();
			            else player.recover();
			        },
			        subSkill:{
			            use:{
			                trigger:{
			                    global:["useCardEnd","recoverEnd"],
			                },
			                prompt:function(event,player){
			                    return `〖复苏〗：是否视为对${get.translation(event.player)}使用一张【杀】`;
			                },
			                sub:true,
			                filter:function(event,player){
			                    if(event.name=="useCard"){
			                        if(!event.card||!event.cards.length) return false;
			                        if(get.suit(event.card)!="heart") return false;
			                        if(event.player==player) return false;
			                        if(event.player.isDead()) return false;
			                    }
			                    return !player.isUnderControl(true);
			                },
			                content:function(){
			                    "step 0"
			                    player.useCard({name:"sha",isCard:true},trigger.player,false);
			                    "step 1"
			                    if(player.getStat('damage')){
			                        if(trigger.player.countCards('he')) player.gain(trigger.player.getCards('he'),trigger.player,'gain2','log')._triggered=null;
			                    }
			                },
			            },
			            "mod":{
                            mod:{
                                aiOrder:function(player,card,num){
                                    var hs=player.countCards('he');
                                    if(player.isDying()) return;
                                    if(get.suit(card)=="heart") return num-hs;
                                    return num;
                                },
                            },
			            },
			        },
			    },
			    "xjzh_boss_ganran":{
			        trigger:{
			            player:"damageEnd",
			        },
			        forced:true,
			        locked:true,
			        priority:5,
			        marktext:"感染",
			        intro:{
			            name:"感染",
			            content:"#",
			        },
			        global:"xjzh_boss_ganran_buff",
			        group:"xjzh_boss_ganran_use",
			        addMark:function(player){
			            var num=player.countMark("xjzh_boss_ganran");
			            if(num>=3) player.addSkill("fengyin");
			            else player.removeSkill("fengyin",true);
			        },
			        content:function(){
			            "step 0"
			            trigger.source.addMark("xjzh_boss_ganran",1);
			            "step 1"
			            lib.skill.xjzh_boss_ganran.addMark(trigger.source);
			        },
			        subSkill:{
			            "buff":{
			                trigger:{
			                    player:["phaseDrawBegin","damageBegin","phaseUseBegin"],
			                },
			                direct:true,
			                priority:10,
			                sub:true,
			                filter:function(event,player){
			                    return player.hasMark("xjzh_boss_ganran");
			                },
			                content:function(){
			                    var name=trigger.name;
			                    var num=player.countMark("xjzh_boss_ganran");
			                    switch(name){
			                        case "phaseDraw":
			                            if(num>=1){
			                                trigger.num-=1;
			                                game.log(player,"被齐尔领主感染，摸牌数减一");
			                            }
			                        break;
			                        case "damage":
			                            if(num>=2&&trigger.source==game.findPlayer(i=>get.playerName(i,'xjzh_boss_qier'))){
			                                trigger.num++;
			                                game.log(player,"被齐尔领主感染，受到齐尔领主的伤害加一");
			                            }
			                        break;
			                        case "phaseUse":
			                            if(num>=4){
			                                trigger.cancel();
			                                game.log(player,"被齐尔领主感染，跳过了出牌阶段");
			                            }
			                        break; 
			                    };
			                },
			            },
			            "use":{
			                enable:"phaseUse",
			                usable:1,
			                filter:function(event,player) {
			                    return game.countPlayer(p=>p.hasMark('xjzh_boss_ganran'));
			                },
			                filterTarget:function(card,player,target){
			                    if(ui.selected.targets.length) return true;
			                    return target.countMark('xjzh_boss_ganran');
			                },
			                selectTarget:2,
			                prompt:"〖感染〗：请选择两名角色移动其中一名角色的“感染”标记",
			                targetprompt:['失去标记','获得标记'],
			                multitarget:true,
			                content:function(){
			                    'step 0'
			                    targets[0].removeMark('xjzh_boss_ganran',1);
			                    targets[1].addMark('xjzh_boss_ganran',1);
			                    targets[1].loseHp();
			                    "step 1"
			                    lib.skill.xjzh_boss_ganran.addMark(targets[0]);
			                    lib.skill.xjzh_boss_ganran.addMark(targets[1]);
			                },
			                ai:{
			                    order:8,
			                    expose:0.3,
			                    result:{
			                        target:function(player,target){
			                            if(ui.selected.targets.length==0){
			                                return 1;
			                            }
			                            else{
			                                return -1;
			                            }
			                        }
			                    },
			                },
			            },
			        },
			    },
			    "xjzh_boss_xuezhou":{
			        trigger:{
			            global:["phaseAfter","drawBegin",]
			        },
			        forced:true,
			        locked:true,
			        priority:3,
			        filter:function(event,player){
			            if(event.name=="draw") return event.player==player;
			            return event.player.hasMark('xjzh_boss_ganran');
			        },
			        content:function(){
			            "step 0"
			            if(trigger.name=="draw"){
			                event.goto(2);
			                return;
			            }
			            trigger.player.removeMark("xjzh_boss_ganran",1);
			            "step 1"
			            lib.skill.xjzh_boss_ganran.addMark(trigger.player);
			            "step 2"
			            var num=0;
			            for(var target of game.players){
			                if(!target.hasMark("xjzh_boss_ganran")) continue;
			                num+=Math.max(0,target.countMark("xjzh_boss_ganran")-target.hp);
			            }
			            trigger.num+=num;
			        },
			    },
			    "xjzh_boss_dianmao":{
			        trigger:{
			            player:'useCardToPlayer',
					    target:'useCardToTarget',
			        },
			        forced:true,
			        locked:true,
			        priority:3,
			        filter:function(event,player){
			            if(event.getParent('xjzh_boss_dianmao').name=="xjzh_boss_dianmao") return false;
			            if(event.target==player&&event.player!=player){
			                return event.player.countCards('h')>0;
			            }
			            if(event.player==player&&event.target!=player){
			                return event.target.countCards('h')>0;
			            }
			            return false;
			        },
			        content:function(){
			            "step 0"
			            if(trigger.target==player&&trigger.player!=player){
			                event.targets=trigger.player;
			            }
			            else if(trigger.target!=player&&trigger.player==player){
			                event.targets=trigger.target;
			            }
			            "step 1"
			            player.chooseCardButton(event.targets.getCards('h')).set('ai',function(button){
			                return 1;
			            });
			            "step 2"
			            if(result.bool){
			                player.showCards(result.links[0]);
			                var card=result.links[0];
			                if(get.suit(card)=="spade"){
			                    event.targets.discard(card);
			                    player.useCard({name:"sha",nature:"thunder"},event.targets,false).set('addCount',false);
			                }
			            }
			        },
			    },
			    "xjzh_boss_dianchong":{
			        trigger:{
			            global:"damageBegin",
			        },
			        forced:true,
			        locked:true,
			        priority:3,
			        mark:true,
			        intro:{
			            name:"电冲",
			            content:"#",
			        },
			        content:function(){
			            "step 0"
			            if(trigger.source==player&&player.hasMark('xjzh_boss_dianchong')){
			                var num=2*player.countMark('xjzh_boss_dianchong')/100;
			                if(Math.random()<=num){
			                    game.xjzh_Criticalstrike(player,trigger.num,2,game.hasNature(trigger,'thunder')?1:null,true);
			                }
			            }
			            "step 1"
			            if(game.hasNature(trigger,'thunder')){
    					    var evt=event.getParent("damage"),target;
			                if(trigger.source==player&&trigger.player!=player){
    			                target=trigger.player;
    			            }
    			            else if(trigger.source!=player&&trigger.player==player){
    			                target=trigger.source;
    			            }
    					    if(evt&&evt.getParent){
    					        var next=game.createEvent('xjzh_boss_dianchong_mark',false,evt.getParent());
    					        next.player=player;
    					        next.target=target;
    					        next.num=trigger.num;
    					        next.setContent(function(){
    					            "step 0"
    					            player.addMark('xjzh_boss_dianchong',num);
    					            "step 1"
    					            target.changexjzhBUFF("gandian",1);
    					        });
    					    }
    					}
			        },
			    },
			    "xjzh_boss_dianhua":{
			        enable:"phaseUse",
			        filter:function(event,player){
			            return player.hasMark('xjzh_boss_dianchong');
			        },
			        group:"xjzh_boss_dianhua_phase",
			        content:function(){
			            "step 0"
			            player.removeMark("xjzh_boss_dianchong",1);
			            "step 1"
			            var cards=get.cards()[0];
			            player.showCards(cards);
			            if(get.suit(cards)!="spade"){
			                player.gain(cards,'gain2','log');
			                event.finish();
			                return;
			            }
			            "step 2"
			            player.chooseTarget("〖电花〗：对一名角色造成1点雷属性伤害",function(card,player,target){
			                return target!=player;
			            }).set('ai',function(card,player,target){
				             return get.damageEffect(target,player,player,'thunder');
				        });
				        "step 3"
				        if(result.bool){
				            result.targets[0].damage(player,1,'nocard','thunder');
				        }
			        },
			        subSkill:{
			            "phase":{
			                trigger:{
			                    global:["phaseDrawBegin","phaseUseBegin"],
			                },
			                forced:true,
			                sub:true,
			                priority:10,
			                filter:function(event,player){
			                    if(get.xjzhBUFFNum(event.player,"gandian")>0){
			                        var num=player.countMark('xjzh_boss_dianchong')/100;
			                        if(Math.random()<=num) return true;
			                    }
			                    return false;
			                },
			                content:function(){
			                    "step 0"
			                    trigger.cancel(null,null,'notrigger')   
			                    "step 1"
			                    player[trigger.name]();
			                },
			            },
			        },
			        ai:{
			            order:function(){
			                var player=_status.event.player;
			                return player.countMark('xjzh_boss_dianchong');
			            },
			            result:{
			                player:function(player,target){
			                    var num=player.countMark('xjzh_boss_dianchong');
			                    if(num==1) return 0;
			                    return player.countMark('xjzh_boss_dianchong');
			                },
			            },
			        },
				},
			    "xjzh_boss_mengdu":{
			        trigger:{
			            source:"damageBegin",
			        },
			        forced:true,
			        locked:true,
			        priority:3,
			        content:function(){
			            "step 0"
			            game.setNature(trigger,'poison');
			            "step 1"
			            var num=(player.hp*10)/100;
			            if(Math.random()<=num){
			                var evt=event.getParent("damage");
			                if(evt&&evt.getParent){
    			                var next=game.createEvent('xjzh_boss_mengdu_zhongdu',false,evt.getParent());
    					        next.player=player;
    					        next.target=trigger.player;
    					        next.setContent(function(){
    					            "step 0"
    					            target.changexjzhBUFF('zhongdu',1,true);
    					            "step 1"
    					            player.draw(get.xjzhBUFFNum(target,"zhongdu"));
    					        });
    					    }
			            }
			        },
			    },
			    "xjzh_boss_huanshen":{
			        trigger:{
			            player:"damageEnd",
			        },
			        forced:true,
			        locked:true,
			        limited:true,
					skillAnimation:true,
					animationColor:'water',
					animationStr:"痛苦之王",
					init:function(player,skill){
					    player.storage[skill]=false;
					},
					derivation:"xjzh_boss_exing",
					filter:function(event,player){
					    if(player.storage.xjzh_boss_huanshen) return false;
					    return player.hp<=Math.round(player.maxHp/3);
					},
					content:function(){
					    "step 0"
						player.awakenSkill("xjzh_boss_huanshen");
						player.storage.xjzh_boss_huanshen=true;
						"step 1"
    					var num=Math.round(player.maxHp/3);
    					player.recoverTo(num);
						'step 2'
					    if(game.me!=game.boss){
						    game.boss.changeSeat(6);
					    }
					    else{
						    game.boss.nextSeat.changeSeat(3);
						    game.boss.previousSeat.changeSeat(5);
					    }
					    game.delay(0.5);
					    'step 3'
					    lib.translate["xjzh_boss_duruierx"]="督瑞尔的幻影";
					    var follow=game.addBossFellow2(game.me==game.boss?1:5,"xjzh_boss_duruier",null,3);
					    follow.removeSkill("xjzh_boss_huanshen",true);
					    follow.name="xjzh_boss_duruierx";
					    follow.name1="xjzh_boss_duruierx";
					    follow.node.name.innerHTML="督瑞尔的幻影";
					    var follow=game.addBossFellow2(7,"xjzh_boss_duruier",null,3);
					    follow.removeSkill("xjzh_boss_huanshen",true);
					    follow.name="xjzh_boss_duruierx";
					    follow.name1="xjzh_boss_duruierx";
					    follow.node.name.innerHTML="督瑞尔的幻影";
					    player.addSkillLog("xjzh_boss_exing");
					},
			    },
				"xjzh_boss_exing":{
			        trigger:{
			            player:"useCard",
					},
			        forced:true,
			        priority:10,
					firstDo:true,
					filter:function(event,player){
					    if(!event.card||!event.cards.length) return false;
					    if(!event.target||!event.targets.length) return false;
					    if(get.xjzhBUFFNum(event.target,"zhongdu")==0) return false;
					    return get.tag(event.card,'damage');
					},
					content:function(){
					    "step 0"
					    event.num=get.xjzhBUFFNum(trigger.target,"zhongdu");
					    "step 1"
					    target.changexjzhBUFF('zhongdu',-event.num,true);
					    "step 2"
					    trigger.effectCount+=event.num
					    game.log(trigger.card,'额外结算'+get.xjzhBUFFNum(trigger.target,"zhongdu")+'次');
					},
					ai:{
					    result:{
					        target:function(card,player,target){
					            if(!target) return;
					            return get.xjzhBUFFNum(target,"zhongdu");
					        },
					    },
				    },
				},
			    "xjzh_boss_lianji":{
			        trigger:{
			            player:"useCard",
			        },
			        direct:true,
			        priority:10,
			        firstDo:true,
			        locked:true,
			        init:function(player){
			            player.storage.xjzh_boss_lianji={
			                num1:3,
			                num2:1,
			            };
			        },
			        mark:true,
			        marktext:"连",
			        intro:{
			            name:"连击",
			            content:function(storage,player){
			                var trickNum=player.countMark("xjzh_boss_lianji_trick");
			                var basicNum=player.countMark("xjzh_boss_lianji_basic")
				            return "基本牌："+basicNum+"张<br>锦囊牌："+trickNum+"张";
			            },
			        },
			        mod:{
			            aiOrder:function(player,card,num){
                            var trickNum=player.countMark("xjzh_boss_lianji_trick");
			                var basicNum=player.countMark("xjzh_boss_lianji_basic");
			                if(trickNum>0&&get.type(card)=="basic") return num+3;
			                if(basicNum>0&&get.type(card)=="trick") return num+3;
			                return num;
                        },
			        },
			        filter:function(event,player){
			            return ["trick","basic"].includes(get.type(event.cards[0]));
			        },
			        content:function(){
			            "step 0"
			            var num=player.storage.xjzh_boss_lianji.num1
			            var type=get.type(trigger.cards[0]);
			            if(type=="basic"){
			                player.addMark("xjzh_boss_lianji_basic",1,false);
			                if(player.countMark("xjzh_boss_lianji_trick")>=num){
			                    player.removeMark("xjzh_boss_lianji_trick",num,false);
			                }else{
			                    event.finish();
			                    return;
			                }
			            }
			            else if(type=="trick"){
			                player.addMark("xjzh_boss_lianji_trick",1,false);
			                if(player.countMark("xjzh_boss_lianji_basic")>=num){
			                    player.removeMark("xjzh_boss_lianji_basic",num,false);
			                }else{
			                    event.finish();
			                    return;
			                }
			            }
			            "step 1"
			            var num=player.storage.xjzh_boss_lianji.num2
			            trigger.effectCount+=num;
			            player.logSkill("xjzh_boss_lianji",trigger.target);
						game.log(trigger.card,'额外结算'+num+'次');
			        },
			        subSkill:{
			            "basic":{sub:true,},
			            "trick":{sub:true,},
			        },
			    },
			    "xjzh_boss_qiangji":{
			        trigger:{
			            player:"damageEnd",
			        },
			        direct:true,
			        priority:10,
			        firstDo:true,
			        locked:true,
			        init:function(player,skill){
			            player.storage[skill]={
			                num1:15,
			                num2:[1000,12000],
			            };
			        },
			        filter:function(event,player){
			            return Math.random()<=player.storage.xjzh_boss_qiangji.num1/100;
			        },
			        content:function(){
			            var storage=player.storage.xjzh_boss_qiangji;
			            var num;
			            if(Array.isArray(storage.num2)){
			                num=get.rand(storage.num2[0],storage.num2[1]);
			            }
	    		        else{
	    		            num=storage.num2;
	    		        }
	    		        var numx=get.rand(10,30);
	    		        if(storage.num1<75){
	    		            storage.num1*=numx/100;
	    		            if(storage.num1>=75) storage.num1=75;
	    		        }
	    		        if(storage.num2[1]>1000){
	    		            storage.num2[1]*=numx/100;
	    		            if(storage.num2[1]<=1000) storage.num2=1000;
	    		        }
	    		        game.log(player,"离开游戏，将于"+num/1000+"s后回到游戏");
	    		        player.classList.add('out');
	    		        setTimeout(function(){
	    		            player.classList.remove('out');
	    		            game.log(player,"回到游戏");
	    		            var next=game.createEvent('xjzh_intrigger',false);
					        next.player=player;
					        next.setContent(lib.skill.xjzh_boss_qiangji.skillList);
	    		        },num);
			        },
			        skillList:function(){
			            "step 0"
			            var history=player.getAllHistory('damage',function(evt){
			                return evt&&evt.card&&lib.suit.includes(get.suit(evt.card));
			            });
					    if(!history.length){
					        event.goto(2);
					        return;
					    };
					    var card=history[history.length-1].card;
					    if(card) player.chooseUseTarget({name:card.name},false);
					    event.cards=card;
					    event.list=[];
					    "step 1"
	    		        var cards=get.cards()[0];
	    		        player.showCards(cards);
	    		        if(get.number(cards)==get.number(event.cards)||get.suit(cards)==get.suit(event.cards)){
	    		            event.list.push(cards);
	    		            game.delay();
	    		            event.redo();
	    		        }else{
	    		            player.gain(event.list,'gain2','log',player);
	    		        }
	    		        "step 2"
						while(_status.event.name!='phase'){
							_status.event=_status.event.parent;
						}
						_status.event.finish();
						_status.event.untrigger(true);
						player.insertPhase();
			        }
			    },
			    "xjzh_boss_zenghen":{
			        trigger:{
			            player:"dying",
			        },
			        forced:true,
                    limited:true,
                    locked:true,
                    derivation:"xjzh_boss_xueyan",
					skillAnimation:true,
					animationColor:'fire',
					animationStr:"憎恨王座",
					init:function(player){
					    if(!player.storage.xjzh_boss_zenghen) player.storage.xjzh_boss_zenghen=0;
					    player.storage.xjzh_boss_zenghen+=3;
					},
			        filter:function(event,player){
			            return player.storage.xjzh_boss_zenghen&&player.storage.xjzh_boss_zenghen>0;
			        },
			        content:function(){
			            "step 0"
			            player.storage.xjzh_boss_zenghen--
			            "step 1"
			            var list=player.getEnemies().sortBySeat();
			            for(var target of list){
			                target.damage(1,player,'fire','nocard')
			                target.changexjzhBUFF("ranshao",1);
			            }
			            "step 2"
			            //player.maxHp*=2;
			            player.gainMaxHp(player.maxHp);
			            "step 3",
			            player.recoverTo(player.maxHp);
			            player.addSkill("xjzh_boss_xueyan");
			            player.update();
			            "step 4"
			            if(!player.hasSkill("xjzh_boss_lianji")) return;
			            var controlList=["红色数字减一","蓝色数字加一"];
			            player.chooseControl(controlList);
			            "step 5"
			            if(result.control){
			                var links=result.control;
			                if(links=="红色数字减一"){
			                    player.storage.xjzh_boss_lianji.num1--;
			                    if(player.storage.xjzh_boss_lianji.num1<=0) player.storage.xjzh_boss_lianji.num1=0;
			                }else{
			                    player.storage.xjzh_boss_lianji.num2++;
			                }
			            }
			        },
			    },
			    "xjzh_boss_xueyan":{
			        trigger:{
			            source:"damageEnd",
			        },
			        filter:function(event,player){
			            if(event.player.isDead()) return false;
			            return event.source!=event.player;
			        },
			        check:function(event,player){
			            return -get.attitude(player,event.player);
			        },
			        content:function(){
			            var cards=get.cards()[0];
			            player.showCards(cards);
			            if(get.color(cards)=="red"){
			                trigger.player.damage(1,player,'fire','nocard');
    			            trigger.player.changexjzhBUFF("ranshao",1);
    			        }else{
    			            trigger.player.changexjzhBUFF("yishang",1);
    			        }
			        },
			    },
			    "xjzh_boss_fennu":{
			        trigger:{
			            player:"phaseBefore",
			        },
			        frequent:true,
			        priority:Infinity,
			        firstDo:true,
				    xjzh_xinghunSkill:true,
				    charlotte:true,
				    fixed:true,
				    superCharlotte:true,
			        mark:true,
                    marktext:"怒",
			        intro:{
			            name:"愤怒",
		                mark:function(dialog,storage,player){
		                    var storage=player.storage.xjzh_boss_fennu;
		                    dialog.addSmall([storage,'vcard']);
		                },
		                markcount:function(storage,player){
		                    var storage=player.storage.xjzh_boss_fennu;
		                    return storage.length;
		                },
		            },
		            init:function(player){
		                if(!player.storage.xjzh_boss_fennu) player.storage.xjzh_boss_fennu=[];
		            },
			        content:function(){
			            "step 0"
			            var {...cards}=lib.xjzh_qishuyaojians;
			            var list=[]
			            for(var i in cards){
			                if(["xjzh_qishu_wuyan","xjzh_qishu_fengbaopaoxiao","xjzh_qishu_waxilidedaogao","xjzh_qishu_fenglangkx"].includes(i)) continue;
			                var cardname=i;
                            lib.card[cardname]={
                                fullimage:false,
                                image:'ext:仙家之魂/image/qishuyaojian/cards/'+i+'.jpg',  
                            };
                            lib.translate[cardname]=cards[i].translate;
                            lib.translate[cardname+'_info']=cards[i].translate_info;
                            list.push(cardname);
			            }
			            event.func=function(skills){
			                var skillsx=lib.xjzh_qishuyaojians[skills]
        					if(skillsx.skill){
        						var newSkill=skills;
        						if(!lib.skill[newSkill]){
        							lib.skill[newSkill]=skillsx.skill;
        							lib.skill[newSkill].charlotte=true;
        							lib.skill[newSkill].xjzh_qishuSkill=true;
        							lib.skill[newSkill].superChocolate=true;
        							lib.skill[newSkill].nobracket=true;
        							lib.skill[newSkill].locked=true;
        							if(lib.skill[newSkill].priority===undefined) lib.skill[newSkill].priority=5;
        							if(skills.skillName){
        							    lib.translate[newSkill]=skillsx.skillName;
        							}else{
        							    lib.translate[newSkill]=skillsx.translate;
        							}
        							if(skills.skillInfo){
        							    lib.translate[newSkill+'_info']=skillsx.skillInfo;
        							}else{
        							    lib.translate[newSkill+'_info']=skillsx.translate_info;
        							}
        						}
        						player.addSkillLog(newSkill);
        					}
			            };
			            var num=1;
			            if(player.hp<player.maxHp/2) num=[1,3];
			            var str="〖愤怒〗：选择装备";
			            if(num==1) str+="1个奇术要件";
			            else str+="至多3个奇术要件";
			            var next=player.chooseButton([str,[list,'vcard']]).set('filterButton',function(button){
					        var link=button.link[2];
						    var level=cards[link].level;
					        return level<5||1;
				        })
					    next.set('ai',function(button){
					        var link=button.link[2];
						    var level=cards[link].level;
						    return level<5||1;
					    })
				        next.set('selectButton',function(){
				            var player=_status.event.player
				            return num;
                        })
                        next.set('num',num) 
				        'step 1'
				        if(result.bool){
				            if(player.storage.xjzh_boss_fennu.length>0){
				                var storage=player.storage.xjzh_boss_fennu;
				                for(var i=0;i<storage.length;i++){
				                    if(player.hasSkill(storage[i])){
				                        player.removeSkill(storage[i],true);
				                        player.storage.xjzh_boss_fennu.remove(storage[i]);
				                    }
				                }
				            }
				            for(var i=0;i<result.links.length;i++){
				                event.func(result.links[i][2]);
				                player.storage.xjzh_boss_fennu.push(result.links[i][2]);
				            };
				            var card=ui.create.card();
						    card.classList.add('infohidden');
						    card.classList.add('infoflip');
				            player.$gain2(card);
				        }
				        "step 2"
				        if(player.hp<=player.maxHp/3){
				            game.countPlayer(function(current){
				                if(current!=player) current.useCard({name:'sha',isCard:true},current);
				            });
				        }
			        },
			    },
			    "xjzh_boss_edu":{
			        enable:"phaseUse",
				    xjzh_xinghunSkill:true,
				    charlotte:true,
				    fixed:true,
				    superCharlotte:true,
				    nogainsSkill:true,
				    locked:true,
				    usable:1,
				    filterTarget:function(card,player,target){
				        if(target.isMad()) return false;
				        return target!=player;
				    },
				    filter:function(event,player){
				        var num=player.getEnemies().length;
				        if(game.countPlayer(function(current){
				            return current.isMad()&&current.isEnemiesOf(player);
				        })<num) return true;
				        return false;
				    },
			        content:function(){
			            player.loseHp();
			            target.goMad({player:"phaseAfter"});
			            if(player.hp<player.maxHp/2){
			                player.loseMaxHp();
				            game.countPlayer(function(current){
				                if(current!=player) target.useCard({name:'juedou',isCard:true},current);
				            });
				        }
			        },
			        ai:{
			            order:10,
			            result:{
			                player:function(player){
			                    if(player.hp<player.maxHp/2) return -1;
			                    if(player.maxHp<=3) return -2;
			                    return player.hp-player.maxHp/2;
			                },
			                target:function(target){
			                    if(target.hasFriend()) return -1;
			                    return 2;
			                },
			            },
			        },
			    },
			    "xjzh_boss_canren":{
			        trigger:{
			            source:["damageEnd"],
			        },
				    xjzh_xinghunSkill:true,
				    charlotte:true,
				    fixed:true,
				    superCharlotte:true,
				    nogainsSkill:true,
				    locked:true,
				    priority:10,
				    frequent:true,
				    filter:function(event,player){
				        if(event.player.isDead()) return false;
				        if(!event.player.countCards('he')) return false;
				        return true;
				    },
			        content:function(){
			            "step 0"
			            player.gainPlayerCard(trigger.player,"he",true);
			            "step 1"
			            var card=result.links[0];
			            var cards=get.cards()[0];
			            player.showCards(cards);
			            if(get.suit(card)==get.suit(cards)){
			                player.gain(cards,player,'gain2','log');
			                event.redo();
			            }
			        },
			        ai:{
			            result:{
			                player:1,
			            },
			        },
			    },
			    "xjzh_boss_qingling":{
			        trigger:{
			            global:["gameStart","dieAfter"],
			            player:["enterGame","damageBegin"],
			        },
			        forced:true,
			        locked:true,
			        charlotte:true,
			        superCharlotte:true,
			        priority:-1,
			        lastDo:true,
			        unique:true,
			        mark:true,
			        mode:["boss"],
			        marktext:"清",
			        intro:{
			            name:"太平清领",
			            content:function(storage,player){
			                var num=game.phaseNumber;
			                return "受到伤害后，若场上黄巾兵数量小于2，你有"+get.translation(num)+"%几率令一个黄巾兵登场";
			            },
			        },
			        mod:{
					    globalFrom:function(from,to,distance){
					        let num=game.countPlayer(function(current){
					            return get.playerName(current).some(name=>name.includes("xjzh_boss_hj"));
					        });
						    return distance-num;
					    },
					    playerEnabled:function(card,player,target){
					        if(get.tag(card,'damage')&&get.playerName(target).some(name=>name.includes("xjzh_boss_hj"))) return false;
					    },
			        },
			        init:function(player){
			            lib.xjzh_boss_qingling_huangjing=["xjzh_boss_hjbingyong","xjzh_boss_hjlishi","xjzh_boss_hjfangshi","xjzh_boss_hjshushi","xjzh_boss_hjguishi"];
			        },
			        audio:"ext:仙家之魂/audio/skill:2",
			        group:"xjzh_boss_qingling_phase",
			        filter:function(event,player){
			            if(get.mode()=="boss"){
			                if(game.boss!=player) return false;
			            }
			            if(game.countPlayer(function(current){
			                return current.name.indexOf("xjzh_boss_hj")==0;
			            }).length>=2) return false;
			            if(event.name=="damage"){
			                return Math.random<=game.phaseNumber/100;
			            }
			            if(event.name=="die"){
			                var list=lib.xjzh_boss_qingling_huangjing.slice(0);
			                if(!list.includes(event.player.name)) return false;
			                return event.player!=player&&event.player!=game.boss&&event.player.isDead();
			            }
			            return true;
			        },
			        content:function(){
					    "step 0"
					    if(trigger.name=="damage"){
					        event.goto(3);
					    }
					    else if(trigger.name=="die"&&trigger.player.isDead()){
					        trigger.player.hide();
					        event.finish();
					        return;
					    }
					    "step 1"
					    if(game.me!=game.boss){
						    game.boss.changeSeat(6);
					    }
					    else{
						    game.boss.nextSeat.changeSeat(3);
						    game.boss.previousSeat.changeSeat(5);
					    }
					    game.delay(0.5);
					    'step 2'
					    var list=lib.xjzh_boss_qingling_huangjing.slice(0).randomGets(2);
					    var follow=game.addBossFellow2(game.me==game.boss?1:5,list[0],2);
					    var follow=game.addBossFellow2(7,list[1],2);
					    event.finish();
					    return;
					    "step 3"
					    var list=lib.xjzh_boss_qingling_huangjing.slice(0);
					    for(var i=0;i<game.dead.length;i++){
					        if(list.includes(game.dead[i])){
					            game.dead[i].show();
					            var targetx=list.randomGet()
					            game.replacePlayer(game.dead[i],targetx);
					            game.log(player,"将一名",targetx,"召集到了场上");
					            break;
					        }
					    }
			        },
			        subSkill:{
			            "temp":{sub:true,},
			            "phase":{
			                trigger:{
			                    global:"phaseJiseshuBegin",
			                },
			                forced:true,
			                sub:true,
			                priority:3,
			                audio:"xjzh_boss_qingling",
			                filter:function(event,player){
			                    if(get.mode()=="boss"){
			                        if(game.boss!=player) return false;
			                    }
			                    if(game.hasPlayer(function(current){
					                return get.playerName(current).some(name=>name.includes("xjzh_boss_hj"));
					            })&&!player.hasSkill('xjzh_boss_qingling_temp')) return true;
			                    return false;
			                },
			                content:function(){
			                    player.addTempSkill('xjzh_boss_qingling_temp');
			                    player.insertPhase();
			                },
			            },
			        },
			    },
			    "xjzh_boss_dianxing":{
			        enable:"phaseUse",
                    usable:function(player){
                        if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==4) return 2;
                        return 1;
                    },
                    mark:true,
                    marktext:"电",
                    intro:{
                        name:"电刑",
                        content:function(storage,player){
                            if(game.phaseNumber<50) return "你还有"+get.translation(50-game.phaseNumber)+"回合可以改变〖电刑〗技能形态";
                            if(player.storage.xjzh_boss_dianxing){
                                var list=lib.skill.xjzh_boss_dianxing.getSkillList.slice(0);
                                var num=player.storage.xjzh_boss_dianxing-1;
                                return "你选择了〖电刑〗升级：<span style=\"color: gold\">"+list[num]+"</span>";
                            }
                            return "";
                        },
                    },
                    getSkillList:[
                        "主动释放的〖电刑〗可以额外选择一个目标，但其判定成功后不再询问是否重复判定",
			            "主动释放的〖电刑〗判定成功后可以向目标附近友方弹射,但不再询问是否重复判定",
			            "主动释放的〖电刑〗的判定结果改为与弃置牌花色一致，判定成功后令目标感电并摸一张牌",
			            "主动释放的〖电刑〗使用次数+1，但判定失败后须弃置一张牌",
			        ],
                    filter:function(event,player){
                        var num=lib.skill.xjzh_boss_dianxing.usable(player);
                        if(get.skillCount("xjzh_boss_dianxing",player)>=num) return false;
                        if(!player.countCards('he')) return false;
                        return true;
                    },
                    check:function(card){
                        if(game.hasPlayer(function(current){
                            return get.playerName(current,'xjzh_boss_hjguishi');
                        })) return get.color(card)=="black";
                        return 6-get.value(card);
                    },
			        group:["xjzh_boss_dianxing_damage","xjzh_boss_dianxing_skip","xjzh_boss_dianxing_level"],
			        filterTarget:function(card,player,target){
			            return !player.getFriends(true).includes(target);
			        },
			        selectTarget:function(){
			            var player=_status.event.player;
			            if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==1) return [1,2];
			            return 1;
			        },
			        filterCard:true,
			        selectCard:1,
			        position:'he',
			        audio:"ext:仙家之魂/audio/skill:2",
			        content:function(){
			            "step 0"
			            if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==3){
			                event.colorx=get.suit(cards[0]);
			            }else{
			                event.colorx=get.color(cards[0]);
			            }
			            "step 1"
						target.judge(function(card){
						    if(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing==3) return get.suit(card)==event.colorx?-2:0;
							return get.color(card)==event.colorx?-2:0;
						}).judge2=function(result){
							return result.bool==false?true:false;
						};
						"step 2"
						if(result.judge<0){
						    target.damage(1,player,'thunder','nocard');
						    if(player.storage.xjzh_boss_dianxing){
						        if(player.storage.xjzh_boss_dianxing==2){
						            var next=target.getNext();
						            var previous=player.getPrevious();
						            if(target.isFriendsOf(next)&&next.isAlive()) next.damage(1,player,'thunder','nocard');
						            if(target.isFriendsOf(previous)&&previous.isAlive()) previous.damage(1,player,'thunder','nocard');
						        }
						        else if(player.storage.xjzh_boss_dianxing==3){
						            target.changexjzhBUFF('gandian',1);
						            player.draw();
						        }
						    }
						}else{
						    if(player.storage.xjzh_boss_dianxing){
						        if(player.storage.xjzh_boss_dianxing==4){
						            player.chooseToDiscard(1,'he',true)
						        }
						    }
						    event.finish();
						}
						"step 3"
						if(player.isDead()||target.isDead()||(player.storage.xjzh_boss_dianxing&&player.storage.xjzh_boss_dianxing<=2)){
						    event.finish();
						    return;
						}
						player.chooseBool("〖电刑〗：是否令"+get.translation(target)+"再次进行判定？").set('ai',function(){
						    return -get.attitude(player,target);
						});
						"step 4"
						if(result.bool){
						    event.goto(1);
						}
			        },
			        subSkill:{
			            "damage":{
			                trigger:{
			                    global:["phaseBegin","turnOverAfter"],
			                },
			                audio:"xjzh_boss_dianxing",
			                forced:true,
			                priority:-2,
			                sub:true,
			                filter:function(event,player){
			                    if(event.name=="turnOver"&&player.isTurnedOver()) return true;
			                    return game.phaseNumber%10==0;
			                },
			                content:function(){
			                    "step 0"
			                    player.judge(function(card){
							        if(get.suit(card)=='spade'&&get.number(card)>1&&get.number(card)<10) return 5;
							        return 0;
							    }).judge2=function(result){
							        return result.bool==false?true:false;
						        };
						        "step 1"
						        if(result.bool){
						            var list=player.getEnemies().sortBySeat();
						            for(var i=0;i<list.length;i++){
						                list[i].damage(3,player,'thunder','nocard')
						            }
						            if(get.mode()!="boss"){
						                event.finish();
						                return;
						            }
						            var list=lib.xjzh_boss_qingling_huangjing.slice(0);
						            for(var i=0;i<game.dead.length;i++){
						                if(list.includes(game.dead[i])){
						                    game.dead[i].show();
						                    var targetx=list.randomGet()
						                    game.replacePlayer(game.dead[i],targetx);
						                    game.log(player,"将一名",targetx,"召集到了场上");
						                    break;
						                }
						            }
						        }
			                },
			            },
			            "skip":{
			                trigger:{
			                    player:["phaseZhunbeiCancelled","phaseZhunbeiSkipped","phaseJudgeCancelled","phaseJudgeSkipped","phaseDrawCancelled","phaseDrawSkipped","phaseUseCancelled","phaseUseSkipped","phaseDiscardCancelled","phaseDiscardSkipped"],
			                },
			                forced:true,
			                priority:-1,
			                lastDo:true,
			                sub:true,
			                /*filter:function(event,player){
			                    return event.cancelled||event.skipped;
			                },*/
			                content:function(){
			                    player.useSkill("xjzh_boss_dianxing_damage",player);
			                },
			                ai:{
			                    effect:{
			                        target:function(card,player,target){
			                            if(!target) return;
			                            if(get.tag(card,'skip')) return [-3,-2];
			                        },
			                    },
			                },
			            },
			            "level":{
			                trigger:{
			                    global:"phaseBefore",
			                },
			                direct:true,
			                priority:3,
			                sub:true,
			                filter:function(event,player){
			                    if(player.storage.xjzh_boss_dianxing) return false;
			                    return game.phaseNumber==50;
			                },
			                content:function(){
			                    "step 0"
			                    var list=lib.skill.xjzh_boss_dianxing.getSkillList.slice(0);
			                    player.chooseControlList(get.prompt(event.name,player),list).set('ai',function(){
				                    return Math.random();
				                });
				                "step 1"
				                if(result.control!="cancel2"){
				                    var num=result.index
				                    player.storage.xjzh_boss_dianxing=num+1;
				                }
			                },
			            },
			        },
			        ai:{
			            order:8,
			            result:{
			                player:function(card,player,target){
			                    return -0.5;
			                },
			                target:function(card,player,target){
			                    return -1.5;
			                },
			            },
			        },
			    },
			    "xjzh_boss_guishu":{
			        trigger:{
			            player:["phaseZhunbeiBegin","phaseJudgeBegin","phaseDrawBegin","phaseDiscardBegin","phaseJieshuBegin","phaseUseBegin"],
			        },
			        forced:true,
			        locked:true,
			        priority:-9,
			        group:["xjzh_boss_guishu_link","guidao"],
			        content:function(){
			            "step 0"
			            var num=get.rand(1,2);
			            var cards=get.randomCards(num,function(card){
                            return get.color(card)=="black";
                        });
			            player.gain(cards,'giveAuto')   
			            var str="";
			            if(trigger.name=="phaseZhunbei"){
			                str+="准备阶段";
			            }
			            else if(trigger.name=="phaseJudge"){
			                str+="判定阶段";
			            }
			            else if(trigger.name=="phaseDraw"){
			                str+="摸牌阶段";
			            }
			            else if(trigger.name=="phaseUse"){
			                str+="出牌阶段";
			            }
			            else if(trigger.name=="phaseDiscard"){
			                str+="弃牌阶段";
			            }
			            else if(trigger.name=="phaseJieshu"){
			                str+="结束阶段";
			            }
			            game.log(player,"跳过了","#g"+str+"","摸了"+num+"张牌");
			            "step 1"
			            trigger.cancel();
			        },
			        subSkill:{
			            "link":{
			                trigger:{
			                    global:"damageBefore",
			                },
			                forced:true,
			                sub:true,
			                priority:10,
			                filter:function(event,player){
			                    return event.source&&event.source==game.boss&&game.hasNature(trigger,'thunder');
			                },
			                content:function(){
			                    var list=player.getEnemies().sortBySeat();
			                    for(var target of list){
			                        if(!target.isLinked()) target.link(true);
			                    }
			                },
			            },
			        },
			    },
			    "xjzh_boss_fubing":{
                    trigger:{
                        player:"phaseDrawBegin",
                    },
                    silent:true,
			        locked:true,
			        group:"xjzh_boss_fubing_damage",
			        content:function(){
			            "step 0"
			            var list=player.getEnemies().sortBySeat();
			            player.gainMultiple(list);
			            "step 1"
			            player.addTempSkill('xjzh_boss_fubing_max');
			            trigger.cancel(null,null,'notrigger');
			        },
			        subSkill:{
			            "max":{
			                mod:{
                                maxHandcard:function (player,num){
                                    return 0;
                                },
                            },
                            sub:true,
			            },
			            "damage":{
			                trigger:{
			                    global:["damageBegin","linkBegin"],
			                },
			                silent:true,
			                sub:true,
			                filter:function(event,player){
			                    return game.boss==event.player;
			                },
			                content:function(){
			                    if(trigger.name=="damage"){
			                        trigger.player=player;
			                        game.log(player,"发动了","#g〖符兵〗","代替神张角承受了本次伤害");
			                    }else{
			                        if(!trigger.player.isLinked()) trigger.cancel(null,null,"notrigger");
			                    }
			                },
			            },
			        },
			    },
			    "xjzh_boss_fuli":{
			        mod:{
			            cardEnabled:function (card,player){
			                if(card.name=="shan") return false;
                        },
			            cardEnabled2:function (card,player){
			                if(card.name=="shan") return false;
                        },
                        cardUsable:function (card,player,num){
                            if(card.name=='sha') return Infinity;
                        },
                        cardRespondable:function (card,player,event){
                            if(card.name=='shan') return false;
                        },
                    },
                    trigger:{
                        global:["damageBegin","turnOverBegin"],
                    },
                    silent:true,
			        locked:true,
			        filter:function(event,player){
			            if(event.name=="damage") return event.source==game.boss;
			            return event.player==game.boss&&!event.player.isTurnedOver();
			        },
			        content:function(){
			            if(trigger.name=="damage"){
			                trigger.num++
			            }else{
			                trigger.cancel(null,null,"notrigger");
			            }
			        },
			    },
			    "xjzh_boss_fuhuo":{
			        trigger:{
			            player:"phaseDrawBegin",
			        },
			        silent:true,
			        locked:true,
			        group:"xjzh_boss_fuhuo_phase",
			        filter:function(event,player){
			            return !event.cancelled;
			        },
			        content:function(){
			            "step 0"
			            var list=player.getEnemies().sortBySeat();
			            var num=list.length<trigger.num?list.length:trigger.num;
			            var targets=list.randomGets(num);
			            for(var i=0;i<targets.length;i++){
			                targets[i].damage(1,player,'nocard','fire');
			                targets[i].addSkill('xjzh_boss_fuhuo_damage');
			            }
			            player.logSkill('xjzh_boss_fuhuo',targets);
			            "step 1"
			            trigger.cancel(null,null,'notrigger');
			        },
			        subSkill:{
			            "damage":{
			                trigger:{
			                    source:"damageBegin",
			                },
			                silent:true,
			                sub:true,
			                mark:true,
			                marktext:"火",
			                intro:{
			                    name:"符火",
			                    content:"下次造成火焰伤害+1，且你受到等量火焰伤害",
			                },
			                filter:function(event,player){
			                    if(!game.hasNature(event)||game.hasNature(trigger,'fire')) return false;
			                    return !event.cancelled;
			                },
			                content:function(){
			                    "step 0"
			                    trigger.num++
			                    "step 1"
			                    player.damage(trigger.num,player,'fire','nocard');
			                    "step 2"
			                    player.logSkill('xjzh_boss_fuhuo',trigger.player);
			                    "step 3"
			                    player.removeSkill('xjzh_boss_fuhuo_damage');
			                },
			                ai:{
			                    firedamage:true,
			                    result:{
			                        target:function(card,player,target){
			                            if(get.tag(card,'fireDamage')) return -2;
			                        },
			                        player:function(card,player,target){
			                            if(get.tag(card,'fireDamage')) return 2;
			                        },
			                    },
			                },
			            },
			            "phase":{
			                trigger:{
			                    global:"phaseBefore",
			                },
			                silent:true,
			                filter:function(event,player){
			                    if(Math.random()>player.hp/100) return false;
			                    return event.player==game.boss;
			                },
			                content:function(){
			                    trigger.player.gainMaxHp();
			                    player.logSkill('xjzh_boss_fuhuo',trigger.player);
			                },
			            },
			        },
			    },
			    "xjzh_boss_fushui":{
			        trigger:{
			            player:"phaseUseBegin",
			        },
			        silent:true,
			        locked:true,
				    marktext:"水",
				    intro:{
				        content:"expansion",
				        markcount:"expansion",
				    },
			        group:"xjzh_boss_fushui_phase",
				    onremove:function(player,skill){
					    var cards=player.getExpansions(skill);
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
			        filter:function(event,player){
			            return !event.cancelled;
			        },
			        content:function(){
			            "step 0"
			            var list=player.getCards('hej');
			            player.addToExpansion(list,player,'give').gaintag.add('xjzh_boss_fushui');
			            "step 1"
			            trigger.cancel(null,null,'notrigger');
			            "step 2"
			            var list=player.getFriends(true).sortBySeat();
			            var damage=function(){
			                for(var i of list){
			                    if(i.isDamaged()) return true;
			                }
			                return false;
			            };
			            var cards=player.getExpansions("xjzh_boss_fushui").sort();
			            var bool=function(){
			                var num=0
    			            for(var i=0;i<cards.length;i++){
    			                num+=get.number(cards[i]);
			                }
			                if(num>=13) return true;
			                return false;
			            };
			            if(damage()==true&&bool()==true){
			                var evt=event.getParent("phase");
					        if(evt&&evt.getParent){
					            var next=game.createEvent('xjzh_boss_fushui_remove',false,evt.getParent());
					            next.player=player;
					            next.setContent(function(){
					                "step 0"
					                var cards=player.getExpansions("xjzh_boss_fushui");
					                var next=player.chooseCardButton(cards,'〖符水〗：请选择任意张点数不小于13的牌视为使用一张【桃园结义】')
					                next.set('forced',true);
					                next.set('selectButton',function(button){
					                    if(!ui.selected.buttons.length) return true;
										var num=0;
										for(var i=0;i<ui.selected.buttons.length;i++){
											num+=get.number(ui.selected.buttons[i]);
										}
										if(num>=13) return ui.selected.buttons.length;
										return ui.selected.buttons.length+2;
					                });
					                next.set('complexSelect',true);
					                "step 1"
					                if(result.links){
			                            player.loseToDiscardpile(result.links);
					                    player.chooseUseTarget({name:'taoyuan'},true,false).set('targets',game.filterPlayer(function(current){
                                            return current.isFriendsOf(player);
                                        })).viewAs=true;
                                    }
					            });
					        }
			            }
			        },
			        subSkill:{
			            "phase":{
			                trigger:{
			                    global:["drawBegin","phaseDiscardBegin"],
			                },
			                silent:true,
			                filter:function(event,player){
			                    if(game.boss!=event.player) return false;
			                    if(event.name=="phaseDiscard") return event.player.needsToDiscard();
			                    return true;
			                },
			                content:function(){
			                    if(trigger.name=="draw"){
			                        trigger.player.draw()._triggered=null;
			                    }else{
			                        trigger.cancel(null,null,'notrigger');
			                    }
			                    player.logSkill('xjzh_boss_fushui',trigger.player);
			                },
			            },
			        },
			    },
				"xjzh_boss_huanxian":{
	    		    trigger:{
	    		        source:"dieAfter",
	    		    },
					forced:true,
					locked:true,
					unique:true,
	    		    mod:{
						selectTarget:function(card,player,range){
							if(range[1]==-1) return;
							if(game.players.length<3) return;
							if(card.name=='sha') range[1]+=player.storage.xjzh_boss_huanxian_select?player.storage.xjzh_boss_huanxian_select:0;
						},
                        cardUsable:function(card,player,num){
                            if(get.name(card)=="sha") return num+=player.storage.xjzh_boss_huanxian_usable?player.storage.xjzh_boss_huanxian_usable:0;
						},
	    		    },
	    		    filter:function(event,player){
	    		        return event.player.isDead()&&event.source==player&&event.player!=player;
	    		    },
	    		    init:function(player){
						player.storage.xjzh_boss_huanxian=[]
						lib.skill.xjzh_boss_huanxian.getSkillList(player);
						var list=window.localStorage.getItem("xjzh_boss_huanxian");
	    		        var maxhp=JSON.stringify(player.maxHp);
	    		        if(list==null){
	    		            //如果没有存档则定义一个空对象
	    		            var object={
	    		                "card":[],
	    		                "skill":[],
	    		                "storage":[0,0,0],
	    		                "maxhp":[maxhp],
	    		            }
	    		            //将对象转为字符串
	    		            object=JSON.stringify(object);
	    		            //写入存档
						    window.localStorage.setItem("xjzh_boss_huanxian",object);
	    		        }else{
	    		            if(!lib.config.xjzh_boss_huanxian){
	    		                window.localStorage.removeItem("xjzh_boss_huanxian");
	    		                alert("已删除你之前的存档，游戏即将重启");
	    		                game.saveConfig('xjzh_boss_huanxian',true);
	    		                setTimeout(function(){
	    		                    game.reload();
	    		                },3000);
	    		            }
	    		        }
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
									if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill&&!lib.skill.xjzh_sanguo_xinghun.bannedList.includes(lib.character[i][3][j])){
										list.add(lib.character[i][3][j]);
									}
								}
							}
						}
						var skills=player.skills.slice(0);
						for(var i=0;i<skills.length;i++){
							list.remove(skills[i]);
						}
						player.storage.xjzh_boss_huanxian.addArray(list);
					},
					group:["xjzh_boss_huanxian_cundang","xjzh_boss_huanxian_damage"],
	    		    content:function(){
	    		        "step 0"
						var skills=trigger.player.getSkills(null,false,false).filter(function(skill){
							var info=lib.skill[skill];
							return info&&!info.sub&&lib.translate[skill]&&lib.translate[skill+"_info"];
						});
						var list=player.storage.xjzh_boss_huanxian.slice(0);
						for(var i of list){
						    if(player.hasSkill(i)) list.remove(i);
						}
						list=list.randomSort();
						while(skills.length<5){
						    skills.add(list.randomGet());
						}
						var list2=[]
						for(var i of skills){
						    game.expandSkills(i);
						    for(var j in lib.character){
						        var skillsx=lib.character[j][3]
						        if(skillsx.includes(i)) list2.add(j)
						    }
						}
	    		        player.chooseControl(skills,"cancel2").set('dialog',['请选择获得一个技能',[list2,'character']]).set('ai',function(){
	    		            return Math.floor(Math.random()*_status.event.controls.length);
	    		        });
	    		        "step 1"
	    		        if(result.control){
	    		            if(result.control=="cancel2") event.goto(2);
	    		            player.addSkillLog(result.control);
	    		            event.control=result.control
	    		        }
	    		        "step 2"
	    		        var control=[
	    		            "杀造成伤害+1",
	    		            "杀的目标+1",
	    		            "杀使用次数+1",
	    		            "开局获得诸葛连弩",
	    		            "开局获得进攻马",
	    		            "开局获得防御马"
	    		        ]
	    		        if(window.localStorage){
	    		            var list=window.localStorage.getItem("xjzh_boss_huanxian");
	    		            list=JSON.parse(list);
	    		            if(list.card.length){
	    		                for(var i of list.card){
	    		                    if(get.subtype(i)=="equip1") control.remove("开局获得诸葛连弩");
	    		                    if(get.subtype(i)=="equip3") control.remove("开局获得防御马");
	    		                    if(get.subtype(i)=="equip4") control.remove("开局获得进攻马");
	    		                }
	    		            }
	    		        }
	    		        player.chooseControl(control).set('ai',function(){
	    		            return control.randomGet();
	    		        });
	    		        "step 3"
	    		        if(result.control){
	    		            if(window.localStorage){
	    		                var list=window.localStorage.getItem("xjzh_boss_huanxian");
	    		                list=JSON.parse(list);
	    		                if(result.control=="杀造成伤害+1"){
	    		                    player.storage.xjzh_boss_huanxian_damage+=1
	    		                    list.storage[0]+=1
	    		                }
	    		                else if(result.control=="杀的目标+1"){
	    		                    player.storage.xjzh_boss_huanxian_select+=1
	    		                    list.storage[1]+=1
	    		                }
	    		                else if(result.control=="杀使用次数+1"){
	    		                    player.storage.xjzh_boss_huanxian_usable+=1
	    		                    list.storage[2]+=1
	    		                }
	    		                else if(result.control=="开局获得诸葛连弩"){
	    		                    list.card.push("zhuge");
	    		                    player.gain(game.createCard("zhuge"),player,"draw")._triggered=null;
	    		                }
	    		                else if(result.control=="开局获得进攻马"){
	    		                    list.card.push("chitu");
	    		                    player.gain(game.createCard("chitu"),player,"draw")._triggered=null;
	    		                }
	    		                else if(result.control=="开局获得防御马"){
	    		                    list.card.push("jueying");
	    		                    player.gain(game.createCard("jueying"),player,"draw")._triggered=null;
	    		                }
	    		                list.skill.push(event.control);
	    		                object=JSON.stringify(list);
	    		                window.localStorage.setItem("xjzh_boss_huanxian",object);
	    		            }
	    		        }
	    		    },
	    		    subSkill:{
	    		        "cundang":{
	    		            trigger:{
	    		                global:"gameStart",
	    		                player:"enterGame",
	    		            },
	    		            direct:true,
	    		            priority:99,
	    		            firstDo:true,
	    		            sub:true,
	    		            content:function(){
	    		                if(window.localStorage){
	    		                    //读取已有存档
	    		                    var list=window.localStorage.getItem("xjzh_boss_huanxian");
	    		                    list=JSON.parse(list);
	    		                    var cards=[]
	    		                    var skills=[]
	    		                    for(var i in list){
	    		                        if(list[i].length){
	    		                            var name=list[i]
	    		                            for(var j=0;j<name.length;j++){
	    		                                if(typeof name[j]=="number"){
	    		                                    if(j==0){
	    		                                        player.storage.xjzh_boss_huanxian_damage=name[j]
	    		                                    }
	    		                                    else if(j==1){
	    		                                        player.storage.xjzh_boss_huanxian_select=name[j]
	    		                                    }
	    		                                    else if(j==2){
	    		                                        player.storage.xjzh_boss_huanxian_usable=name[j]
	    		                                    }
	    		                                }else{
	    		                                    if(list.maxhp.includes(name[j])){
	    		                                        var num2=Number(name[j])
	    		                                        player.maxHp=num2
	    		                                        player.hp=num2-1
	    		                                        player.update();
	    		                                    }
	    		                                    if(lib.card[name[j]]){
	    		                                        var card=game.createCard(name[j]);
	    		                                        cards.push(card);
	    		                                    }else{
	    		                                        skills.push(name[j]);
	    		                                    }
	    		                                }
	    		                            }
	    		                        }
	    		                    }
	    		                    if(cards.length) player.gain(cards,player,"draw")._triggered=null;
	    		                    if(skills.length) player.addSkill(skills);
	    		                }
	    		            },
	    		        },
	    		        "damage":{
	    		            trigger:{
	    		                source:"damageBegin1",
	    		            },
	    		            direct:true,
	    		            priority:12,
	    		            sub:true,
	    		            filter:function(event,player){
	    		                if(!event.cards||!event.cards.length) return false;
	    		                if(get.name(event.card)!="sha") return false;
	    		                return player.storage.xjzh_boss_huanxian_damage;
	    		            },
	    		            content:function(){
	    		                trigger.num+=player.storage.xjzh_boss_huanxian_damage
	    		            },
	    		            ai:{
	    		                damageBonus:true,
	    		            },
	    		        },
	    		        "nolose":{
	    		            trigger:{
	    		                player:"loseMaxHpBegin",
	    		            },
	    		            direct:true,
	    		            priority:30,
	    		            sub:true,
	    		            content:function(){
								game.log(player,'无法失去体力上限');
								trigger.cancel();
	    		            },
	    		        },
	    		    },
	    		},
				"xjzh_boss_pangmen":{
				    enable:'phaseUse',
				    locked:true,
				    unique:true,
				    usable:function(player){
				        return game.roundNumber;
				    },
		            marktext:"旁门",
				    intro:{
				        name:"旁门",
		                content:"expansion",
			            markcount:"expansion",
				    },
				    onremove:function(player,skill){
					    var cards=player.getExpansions(skill);
					    if(cards.length) player.loseToDiscardpile(cards);
				    },
				    filter:function(event,player){
				        var cards=lib.inpile.slice(0);
				        var list=[]
				        for(var i of cards){
				            if(get.type(i)=="delay") list.add(i);
				        }
				        var bool=false;
				        if(list.length){
				            for(var i of list){
				                if(!player.storage._disableJudge&&!player.hasJudge(i)) bool=true;
				            }
				        }
				        var num=lib.skill.xjzh_boss_pangmen.usable(player);
						if(get.skillCount("xjzh_boss_pangmen",player)>=num) return false;
				        return bool==true;
				    },
				    filterTarget:function(card,player,target){
				        if(!lib.filter.judge(card,player,target)) return false;
				        return target==player;
				    },
				    group:["xjzh_boss_pangmen_delay"],
				    content:function(){
				        "step 0"
				        var cards=get.cardPile(function(card){
                            return get.type(card)=="delay"&&!target.hasJudge(card);
                        });
                        if(!cards) return;
                        player.addToExpansion(cards,"gain2",player).gaintag.add("xjzh_boss_pangmen");
				        if(player.isDamaged()){
				            player.recover();
				        }else{
				            player.gainMaxHp();
				        }
				        if(window.localStorage){
				            var list=window.localStorage.getItem("xjzh_boss_huanxian");
	    		            list=JSON.parse(list);
	    		            var str=JSON.stringify(player.maxHp);
	    		            list.maxhp.splice(0,1,str);
	    		            object=JSON.stringify(list);
	    		            window.localStorage.setItem("xjzh_boss_huanxian",object);
	    		        }
				        "step 1"
				        if(player.getExpansions("xjzh_boss_pangmen").length>=3){
                            var next=game.createEvent('xjzh_boss_pangmen_judge',false);
                            next.player=player;
                            next.setContent(lib.skill.xjzh_boss_pangmen.content2);
				        }
				    },
				    content2:function(){
				        "step 0"
				        var cards=player.getExpansions("xjzh_boss_pangmen")[0];
				         player.loseToDiscardpile(cards);
				         player.$throw(cards,3000,'nobroadcast');
				         player.judge(function(card){
				         if(get.suit(card)==get.suit(cards)) return -1;
				             return 1;
				         });
				         "step 1"
				         if(result.bool){
				             player.chooseTarget("〖旁门〗：对一名其他角色造成一点雷电伤害").set('ai',function(card,player,target){
				                 return get.damageEffect(target,player,player,'thunder');
				             });
				         }else{
				             var targets=player.getEnemies().sortBySeat();
				             for(var i of targets){
				                 i.draw();
				             }
				         }
				         "step 2"
				         if(result.targets){
				             result.targets[0].damage(1,player,"thunder","nocard");
				         }
				         "step 3"
				         if(player.getExpansions("xjzh_boss_pangmen").length) event.goto(0);
				    },
				    ai:{
				        order:12,
				        result:{
				            player:10,
				        },
				    },
				    subSkill:{
				        "delay":{
				            trigger:{
				                player:"addJudgeBegin",
				            },
				            direct:true,
				            priority:20,
				            sub:true,
				            filter:function(event,player){
				                return get.type(event.card)=="delay";
				            },
				            content:function(){
				                "step 0"
				                trigger.cancel();
				                var card=game.createCard(trigger.card);
				                player.addToExpansion(card,"gain2",player).gaintag.add("xjzh_boss_pangmen");
				                "step 1"
				                if(player.getExpansions("xjzh_boss_pangmen").length>=3){
				                    var next=game.createEvent('xjzh_boss_pangmen_judge',false);
                                    next.player=player;
                                    next.setContent(lib.skill.xjzh_boss_pangmen.content2);
				                }
				            },
				            ai:{
				                target:function(card,player,target){
				                    if(get.type(card)=="delay") return [0.1,1];
				                },
				            },
				        },
				    },
				},
				"xjzh_boss_zuodao":{
					trigger:{
						global:'judge',
					},
					locked:true,
					priority:1,
					lastDo:true,
					unique:true,
					prompt:function(event,player){
						return ""+get.translation(event.player)+"进行"+get.translation(event.judgestr)+"判定，亮出的判定牌为"+get.translation(event.player.judging[0])+"，是否发动〖左道〗替换判定牌？";
					},
					content:function(){
						"step 0"
						event.cards=get.cards(player.hp);
						player.chooseCardButton(true,event.cards,'左道：选择一张牌作为你的'+trigger.judgestr+'判定结果').ai=function(button){
							if(get.attitude(player,trigger.player)>0){
								return 1+trigger.judge(button.link);
							}
							if(get.attitude(player,trigger.player)<0){
								return 1-trigger.judge(button.link);
							}
							return 0;
						};
						"step 1"
						if(!result.bool){
							event.finish();
							return;
						}
						player.logSkill('xjzh_boss_zuodao',trigger.player);
						var card=result.links[0];
						event.cards.remove(card);
						var judgestr=get.translation(trigger.player)+'的'+trigger.judgestr+'判定';
						event.videoId=lib.status.videoId++;
						event.dialog=ui.create.dialog(judgestr);
						event.dialog.classList.add('center');
						event.dialog.videoId=event.videoId;
						game.addVideo('judge1',player,[get.cardInfo(card),judgestr,event.videoId]);
						for(var i=0;i<event.cards.length;i++) event.cards[i].discard();
						// var node=card.copy('thrown','center',ui.arena).animate('start');
						var node;
						if(game.chess){
							node=card.copy('thrown','center',ui.arena).animate('start');
						}
						else{
							node=player.$throwordered(card.copy(),true);
						}
						node.classList.add('thrownhighlight');
						ui.arena.classList.add('thrownhighlight');
						if(card){
							trigger.cancel();
							trigger.result={
								card:card,
								judge:trigger.judge(card),
								node:node,
								number:get.number(card),
								suit:get.suit(card),
								color:get.color(card),
							};
							if(trigger.result.judge>0){
								trigger.result.bool=true;
								trigger.player.popup('洗具');
							}
							if(trigger.result.judge<0){
								trigger.result.bool=false;
								trigger.player.popup('杯具');
							}
							game.log(trigger.player,'的判定结果为',card);
							trigger.direct=true;
							trigger.position.appendChild(card);
							game.delay(2);
						}
						else{
							event.finish();
						}
						"step 2"
						ui.arena.classList.remove('thrownhighlight');
						event.dialog.close();
						game.addVideo('judge2',null,event.videoId);
						ui.clear();
						var card=trigger.result.card;
						trigger.position.appendChild(card);
						trigger.result.node.delete();
						game.delay();
						"step 3"
						if(event.cards.length){
							player.gain(event.cards,'log','gain2');
						}
					},
				},
				"xjzh_boss_jiwu":{
				    enable:"phaseUse",
				    usable:1,
				    filterTarget:function(card,player,target){
				        return target!=player;
				    },
				    selectTarget:-1,
				    check:function(card){
				        return 8-get.value(card);
				    },
				    filterCard:function(card){
				        return get.tag(card,'damage');
				    },
					filter:function(event,player){
						return player.countCards('h',function(card){
						    return get.tag(card,'damage');
						});
					},
					content:function(){
					    "step 0"
					    player.useCard({name:'sha',isCard:true},target,false);
					    "step 1"
						if(player.getStat('damage')){
							var cards=get.cardPile(function(card){
                                return get.tag(card,'damage');
                            });
                            if(cards) player.gain(cards,player,'draw');
						}
					},
					ai:{
						expose:0.3,
						order:12,
						result:{
						    player:1,
						},
					},
				},
				"xjzh_boss_feijiang":{
				    trigger:{
				        global:["shaBegin","juedouBegin"],
				    },
				    forced:true,
				    locked:true,
				    priority:20,
				    filter:function(event,player){
				        if(event.card.name=="sha") return event.player==player;
				        if(event.card.name=="juedou") return event.target==player;
				        return false;
				    },
				    init:function(player){
				        player.addAdditionalSkill('xjzh_boss_feijiang',"wushuang");
				    },
					content:function(){
					    "step 0"
						if(trigger.target.countCards('he')){
						    player.gainPlayerCard(trigger.target,"he",true);
						}
						"step 1"
						if(result.bool){
						    var card=result.cards[0]
						    if(get.tag(card,'damage')){
						        player.chooseToDiscard(card,"〖飞将〗：是否弃置此牌令"+get.translation(trigger.card)+"造成伤害+1").set('ai',function(card){
						            return 1;
						        });
						    }else{
						        event.finish();
						        return;
						    }
						}else{
						    event.finish();
						    return;
						}
						"step 2"
						if(result.bool){
						    if(!trigger.baseDamage) trigger.baseDamage=1
						    trigger.baseDamage++
						}
					},
				},
				"xjzh_boss_benxi":{
				    trigger:{
				        source:["damageAfter"],
				    },
				    forced:true,
				    locked:true,
				    priority:20,
				    mark:true,
				    marktext:"袭",
				    intro:{
				        name:"奔袭",
				        content:function(storage,player){
						    var list=player.getSkills(null,false,false).filter(function(skill){
						    	var info=lib.skill[skill];
					    		return info&&info.xjzh_xinghunSkill;
					    	});
						    return "“星魂”技能数量："+get.translation(list.length)+"";
				        },
				        markcount:function(storage,player){
							var list=player.getSkills(null,false,false).filter(function(skill){
						    	var info=lib.skill[skill];
					    		return info&&info.xjzh_xinghunSkill;
					    	});
					    	return list.length;
						},
				    },
				    mod:{
					    globalFrom:function(from,to,distance){
					        var player=_status.event.player
						    var list=player.getSkills(null,false,false).filter(function(skill){
						    	var info=lib.skill[skill];
					    		return info&&info.xjzh_xinghunSkill;
					    	});
						    return distance-list.length;
					    }
				    },
				    group:"xjzh_boss_benxi_phase",
					audio:"ext:仙家之魂/audio/skill:2",
					content:function(){
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
								if(lib.skill[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]]&&lib.translate[lib.character[i][3][j]+'_info']){
									var info=lib.skill[lib.character[i][3][j]];
									if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.limited&&!info.dutySkill&&!info.nogainsSkill){
										if(info.xjzh_xinghunSkill) list.add(lib.character[i][3][j]);
									}
								}
							}
						}
						var skills=list.randomGet();
						player.addSkillLog(skills);
						player.update();
						player.updateMarks();
					},
					subSkill:{
					    "phase":{
					        trigger:{
					            global:"phaseZhunbeiBegin",
					        },
					        prompt:"〖奔袭〗：是否移除一个“星魂”技能执行一个额外的出牌阶段？",
					        filter:function(event,player){
					            var list=player.getSkills(null,false,false).filter(function(skill){
					                var info=lib.skill[skill];
				    		        return info&&info.xjzh_xinghunSkill;
				    	        });
				    	        if(list.length) return event.player!=player;
				    	        return false;
					        },
					        content:function(){
					            "step 0"
					            event.list=player.getSkills(null,false,false).filter(function(skill){
					                var info=lib.skill[skill];
					                return info&&info.xjzh_xinghunSkill;
					            });
					            if(event.isMine()){
					                var dialog=ui.create.dialog('forcebutton');
							        dialog.add('请选择移除一项技能');
							        for(i=0;i<event.list.length;i++){
							            if(lib.translate[event.list[i]+'_info']){
							                var translation=get.translation(event.list[i]);
							                if(translation[0]=='新'&&translation.length==3){
							                    translation=translation.slice(1,3);
							                }else{
							                    translation=translation.slice(0,2);
							                }
							                var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[event.list[i]+'_info']+'</div></div>');
							                item.firstChild.link=event.list[i];
							            }
							        }
							    }
							    player.chooseControl(event.list).set('prompt','请选择移除一项技能').set('ai',function(){
							        return get.min(event.list,get.skillRank,'item');
							    }).set('dialog',dialog);
							    "step 1"
							    if(result.control){
							        player.removeSkill(result.control);
							        game.log(player,"失去了技能","#y〖"+get.translation(result.control)+"〗");
							        player.phaseUse();
							    }
					        },
					    },
					},
				},
				"xjzh_boss_xiuluo":{
				    trigger:{
				        player:"changeSkillsAfter",
				    },
				    forced:true,
				    locked:true,
				    priority:20,
				    filter:function(event,player){
						let list=player.getSkills(null,false,false).filter(function(skill){
				    	    var info=lib.skill[skill];
				    		return info&&info.xjzh_xinghunSkill;
				    	});
				    	if(list.length==6) return true;
				    	return false;
				    },
					audio:"ext:仙家之魂/audio/skill:2",
				    group:["xjzh_boss_xiuluo_hp"],
					content:function(){
					    "step 0"
						event.delay=false;
						event.targets=game.filterPlayer();
						event.targets.remove(player);
						event.targets.sort(lib.sort.seat);
						player.line(event.targets,'green');
						event.targets2=event.targets.slice(0);
						event.targets3=event.targets.slice(0);
						"step 1"
						if(event.targets2.length){
							event.targets2.shift().damage('nocard');
							event.redo();
						}
						"step 2"
						if(event.targets.length){
							event.current=event.targets.shift()
							if(event.current.countCards('e')) event.delay=true;
							event.current.discard(event.current.getCards('e')).delay=false;
						}
						"step 3"
						if(event.delay) game.delay(0.5);
						event.delay=false;
						if(event.targets.length) event.goto(1);
						"step 4"
						if(event.targets3.length){
							var target=event.targets3.shift();
							target.chooseToDiscard(4,'h',true).delay=false;
							if(target.countCards('h')) event.delay=true;
						}
						"step 5"
						if(event.delay) game.delay(0.5);
						event.delay=false;
						if(event.targets3.length) event.goto(3);
					},
					subSkill:{
					    "hp":{
					        trigger:{
					            player:"changeHp",
					        },
					        audio:"ext:仙家之魂/audio/skill:2",
					        prompt:function(event,player){
					            var str="〖修罗〗：是否移除一个“星魂”技能";
					            if(player.isDamaged()){
					                str+="回复一点体力";
					            }else{
					                var list=player.getSkills(null,false,false).filter(function(skill){
					                    var info=lib.skill[skill];
					                    return info&&info.xjzh_xinghunSkill;
					                });
					                var num=Math.max(1,list.length);
					                str+="摸"+get.translation(num)+"张牌";
					            }
					            return str;
					        },
					        filter:function(event,player){
					            var list=player.getSkills(null,false,false).filter(function(skill){
					                var info=lib.skill[skill];
					                return info&&info.xjzh_xinghunSkill;
					            });
					            return list.length;
					        },
					        sub:true,
					        check:function(event,player){return 1;},
					        content:function(){
					            "step 0"
					            event.list=player.getSkills(null,false,false).filter(function(skill){
					                var info=lib.skill[skill];
					                return info&&info.xjzh_xinghunSkill;
					            });
					            if(event.isMine()){
					                var dialog=ui.create.dialog('forcebutton');
							        dialog.add('请选择移除一项技能');
							        for(i=0;i<event.list.length;i++){
							            if(lib.translate[event.list[i]+'_info']){
							                var translation=get.translation(event.list[i]);
							                if(translation[0]=='新'&&translation.length==3){
							                    translation=translation.slice(1,3);
							                }else{
							                    translation=translation.slice(0,2);
							                }
							                var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">〖'+translation+'〗</div><div>'+lib.translate[event.list[i]+'_info']+'</div></div>');
							                item.firstChild.link=event.list[i];
							            }
							        }
							    }
							    player.chooseControl(event.list).set('prompt','请选择移除一项技能').set('ai',function(){
							        return get.min(event.list,get.skillRank,'item');
							    }).set('dialog',dialog);
							    "step 1"
							    if(result.control){
							        player.removeSkill(result.control);
							        game.log(player,"失去了技能","#y〖"+get.translation(result.control)+"〗");
							        if(player.isDamaged()){
							            player.recover();
							        }else{
							            player.draw(Math.max(1,event.list.length));
							        }
							    }
					        },
					        ai:{
					            result:{
					                player:function(player){
					                    var list=player.getSkills(null,false,false).filter(function(skill){
					                        var info=lib.skill[skill];
					                        return info&&info.xjzh_xinghunSkill;
					                    });
					                    if(player.isDamaged()) return list.length-player.hp;
					                    return list.length;
					                },
					            },
					        },
					    },
					},
				},
				
			},
			dynamicTranslate:{
			    "xjzh_boss_qiangji":function(player){
			        var storage=player.storage.xjzh_boss_qiangji;
			        var str="锁定技，你受到伤害有"+storage.num1+"%几率离开游戏，并于";
			        if(Array.isArray(storage.num2)){
			            str+="随机"+storage.num2[0]/1000+"-"+storage.num2[1]/1000+"s后"
			        }else{
			            str+=storage.num2+"s后"
			        }
			        str+="；当你回到游戏时，你可以视为使用一张你上一次因其受到伤害时的牌，然后你展示牌堆顶一张牌直到其花色、点数均与这张牌不同，并获得之前展示的所有牌，技能结算后，你立即结束当前回合并执行一个额外的回合。";
			        return str;
			    },
			    "xjzh_boss_lianji":function(player){
			        var storage=player.storage.xjzh_boss_lianji;
			        var str="锁定技，你每使用<span style=\"color:#FF0000\">"+storage.num1+"</span>张基本牌/非延时锦囊牌，你的下一张非延时锦囊牌/基本牌额外结算<span style=\"color:#0000FF\">"+storage.num2+"</span>次";
			        return str;
			    },
			    "xjzh_boss_dianxing":function(player){
			        if(!player.storage.xjzh_boss_dianxing){
			            var str="出牌阶段限一次，你可以弃置一张牌令一名敌方角色判定，若判定牌颜色与你弃置的牌颜色一致，你令其受到一点雷电伤害，然后你可以重复此流程;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害";
			            var str2="，若此时场上有阵亡的黄巾兵，你随机召集一名黄巾兵进入游戏；第50个回合开始前，你可以选择改变此技能形态";
			            if(get.mode()=="boss") str+=str2;
			            return str;
			        }else{
			            if(player.storage.xjzh_boss_dianxing==1){
			                var str="出牌阶段限一次，你可以弃置一张牌令至多两名敌方角色判定，若判定牌颜色与你弃置的牌颜色一致，你令其受到一点雷电伤害;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害";
			            }
			            if(player.storage.xjzh_boss_dianxing==2){
		                    var str="出牌阶段限一次，你可以弃置一张牌令一名敌方角色判定，若判定牌颜色与你弃置的牌颜色一致，你令其与其<a style='color:#FF0000' href=\"javascript:window.xjzhIntroduce('xjzh_intro_fujin');\">附近</a>友方角色受到一点雷电伤害;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害";
		                }
		                if(player.storage.xjzh_boss_dianxing==3){
			                var str="出牌阶段限一次，你可以弃置一张牌令一名敌方角色判定，若判定牌花色与你弃置的牌花色一致，你令其受到一点雷电伤害并<a style='color:#FF0000' href=\"javascript:window.xjzhIntroduce('xjzh_intro_gandian');\">感电</a>，然后你摸一张牌并可以重复此流程;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害";
			            }
			            if(player.storage.xjzh_boss_dianxing==4){
			                var str="出牌阶段限两次，你可以弃置一张牌令一名敌方角色判定，若判定牌颜色与你弃置的牌颜色一致，你令其受到一点雷电伤害，否则你弃置一张牌，然后你可以重复此流程;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害";
			            }
			            var str2=",若此时场上有阵亡的黄巾兵，你随机召集一名黄巾兵进入游戏";
		                if(get.mode()=="boss") str+=str2;
		                return str;
			        }
			    },
			    "xjzh_boss_fennu":function(player){
			        var str="锁定技，你的回合开始前，";
			        if(player.hp>player.maxHp/2){
			            str+="你选择获得1个";
			        }else{
			            str+="你选择获得至多3个";
			        }
			        str+="等级小于5的奇术要件效果，然后移除你已获得的奇术要件效果，若你的体力值不大于你的体力上限的1/3，则视为场上其他角色依次对自己使用一张【杀】。";
			        return str;
			    },
			    "xjzh_boss_dianchong":function(player){
			        var str="锁定技，当你受到/造成雷属性伤害后，你获得等量“电冲”标记并令其获得1层感电；当你有“电冲”标记时，你造成伤害有";
			        var num=2*player.countMark('xjzh_boss_dianchong');
			        str+=num+"％几率暴击，若为雷属性伤害，额外造成1点暴击伤害。";
			        return str;
			    },
			    "xjzh_boss_dianhua":function(player){
			        var str="出牌阶段，若你有“电冲”标记，你可以弃置1枚“电冲”标记并展示牌堆顶一张牌，若此牌花色为♠，你对一名其他角色造成一点雷属性伤害，否则你获得此牌；感电的角色执行摸牌、出牌阶段时有";
			        var num=2*player.countMark('xjzh_boss_dianchong');
			        str+=num+"％几率改为你执行。";
			        return str;
			    },
			    "xjzh_boss_mengdu":function(player){
				    var str="锁定技，你造成的所有伤害视为毒属性伤害，且你造成毒属性伤害有"+player.hp*10+"％几率令其获得一层中毒，因你而中毒的目标获得的中毒无层数上限；当你令一名角色中毒时，你摸x张牌（x为其武将牌上的中毒层数）；你防止获得中毒。";
				    return str;
			    },
			    "xjzh_boss_shenghui4":function(player){
				    var num=player.getDamagedHp();
    		        var num2=1;
    		        if(player.hasSkill("xjzh_boss_caijue2_on")){
    		            [num,num2]=[num2,num];
    			    }
				    return `锁定技，你始终跳过弃牌阶段；你的回合内，若你已受伤，你使用基本牌额外结算${num}次，否则你使用非延时锦囊牌额外结算${num2}次`;
			    },
			    
			},
			translate:{
				"xjzh_boss_zuoyou":"神左幽",
				"xjzh_boss_lvbu":"神吕布",
				"xjzh_boss_zhangjiao":"神张角",
				"xjzh_boss_hjbingyong":"黄巾兵勇",
				"xjzh_boss_hjlishi":"黄巾力士",
				"xjzh_boss_hjshushi":"黄巾术士",
				"xjzh_boss_hjfangshi":"黄巾方士",
				"xjzh_boss_hjguishi":"黄巾诡士",
			    "xjzh_boss_waershen":"瓦尔申",
				"xjzh_boss_lilisi":"莉莉丝",
				"xjzh_boss_geligaoli":"格里高利",
				"xjzh_boss_duruier":"督瑞尔",
				"xjzh_boss_qier":"齐尔领主",
				"xjzh_boss_bingchuanjushou":"冰川巨兽",
				"xjzh_boss_ttshilian":"天堂试炼",
				"xjzh_boss_xiaotianshi":"小天使",
				"xjzh_boss_datianshi":"大天使",
				"xjzh_boss_gaotianshi":"高阶天使",
				"xjzh_boss_tianshizhang":"天使长",
				"xjzh_boss_yinaruisi":"伊纳瑞斯",
				"xjzh_boss_masayier":"马萨伊尔",
				"xjzh_boss_duohunzhe":"夺魂者",
				"xjzh_boss_duotianshi":"堕落天使",
				"xjzh_boss_taernasha":"塔尔拉沙",
				"xjzh_boss_shachong":"剧毒沙虫",
				
				"xjzh_boss_huanxian":"幻仙",
				"xjzh_boss_huanxian_info":"锁定技，你无法失去体力上限；当你击败一名角色后，你可以选择并获得其所有技能及全扩随机x个技能共计5个技能中的一个及从以下效果中选择获得其中一个永久保存：<li>【杀】造成伤害+1<li>【杀】的目标+1<li>【杀】使用次数+1<li>开局获得诸葛连弩<li>开局获得一张进攻马<li>开局获得一张防御马",
				"xjzh_boss_huanxian_append":"注：开局获得牌选项在局中选择会立即获得一张对应的牌，此3个选项只能选择一次",
				"xjzh_boss_pangmen":"旁门",
				"xjzh_boss_pangmen_info":"锁定技，出牌阶段限x次，你可以将牌堆一张延时锦囊置入判定区，若你已受伤，你回复一点体力，否则你获得一点体力上限；你的判定区被置入延时锦囊时，你将此牌置于你的武将牌上称为“旁门”，若“旁门”不小于3，你依次移除每一张“旁门”并进行一次判定，若判定牌花色与此牌不一致，你选择一名角色对其造成一点雷电伤害，否则令所有敌方角色摸一张牌（x为当前游戏轮数）",
				"xjzh_boss_pangmen_judge":"旁门",
				"xjzh_boss_zuodao":"左道",
				"xjzh_boss_zuodao_info":"锁定技，判定生效前，你可以展示牌堆顶x张牌并选择其中一张替换之，然后你获得其余的牌(x为你当前体力值)，此结果不可更改",
				"xjzh_boss_jiwu":"极武",
				"xjzh_boss_jiwu_info":"出牌阶段限一次，你可以弃置一张[伤害]卡牌视为对场上其他所有角色使用一张不计入次数的【杀】，若此【杀】造成伤害，你摸一张[伤害]卡牌。",
				"xjzh_boss_feijiang":"飞将",
				"xjzh_boss_feijiang_info":"锁定技，你视为拥有技能〖无双〗；你使用【杀】、【决斗】指定目标时，你获得其一张牌，若此牌为[伤害]卡牌，你可以弃置此牌令你使用的牌伤害+1。",
				"xjzh_boss_benxi":"奔袭",
				"xjzh_boss_benxi_info":"锁定技，当你造成伤害后，你获得一个“星魂”技能，你计算与其他角色距离-x；其他角色的准备阶段的你可以移除一个“星魂”技能执行一个额外的出牌阶段（x为你拥有的“星魂”技能数量）",
				"xjzh_boss_xiuluo":"修罗",
				"xjzh_boss_xiuluo_info":"锁定技，当你获得、失去技能时，若你的“星魂”技能数量为6，你发动一次〖神愤〗；当你体力变化后，若你已受伤/未受伤，你可以移除一个“星魂”技能回复一点体力/摸x张牌（x为你拥有的“星魂”技能数量，至低为1）。",
				"xjzh_boss_jinghua":"净化",
				"xjzh_boss_jinghua_info":"锁定技，你获得你已有技能之外的任意标记时取消之，然后你摸等量牌，你免疫负面状态。",
				"xjzh_boss_pomo":"破魔",
				"xjzh_boss_pomo_info":"锁定技，你造成伤害不触发技能结算；当你受到伤害后，你选择并随机修改其一个技能内容（视为技除外）。",
				"xjzh_boss_xieyi":"写意",
				"xjzh_boss_xieyi_info":"锁定技，其他角色回合开始时，你执行一个额外的回合，若你于此回合内造成伤害，你可以令其展示一张手牌（无牌改为展示牌堆顶），若此牌描述包含：<li>回复：你回复一点体力<li>伤害，你对其造成一点伤害<li>摸：你摸两张牌<li>弃置，你弃置其一张牌<li>获得：你获得其一张牌<li>跳过：其跳过出牌阶段",
				"xjzh_boss_fuhuo":"符火",
				"xjzh_boss_fuhuo_info":"锁定技，你始终跳过摸牌阶段，改为对随机x名敌方角色造成1点火焰伤害，受到你火焰伤害的角色下次造成火焰伤害时该伤害+1且其受到等量火焰伤害；当你存活时，神张角的回合开始时有y几率获得一点体力上限（x为你摸牌的数量,y为你体力值的百分比）。",
				"xjzh_boss_fushui":"符水",
				"xjzh_boss_fushui_info":"锁定技，你始终跳过出牌阶段，改为将你区域内的所有牌置于武将牌上，你的回合结束时，若场上存在已受伤的友方角色，且你的“符”至少有两张花色相同的牌，你随机弃置两张花色相同的“符”，视为使用一张目标仅为友方角色的【桃园结义】；当你存活时，神张角摸牌时额外摸一张牌且跳过弃牌阶段。",
				"xjzh_boss_fuli":"符力",
				"xjzh_boss_fuli_info":"锁定技，你无法使用或打出【闪】，你使用【杀】无次数限制；当你存活时，神张角造成伤害+1，且无法被翻面。",
				"xjzh_boss_fubing":"符兵",
				"xjzh_boss_fubing_info":"锁定技，你跳过摸牌阶段改为获得敌方角色各一张牌，若如此做，你本回合手牌上限视为0；当你存活时，神张角受到的伤害改为由你承担且其无法被横置。",
				"xjzh_boss_guishu":"诡术",
				"xjzh_boss_guishu_info":"锁定技，你跳过所有回合阶段，改为每个阶段获得1-2张黑色牌；你视为拥有技能鬼道；当你存活时，神张角造成的雷电伤害生效前，横置场上除你与友方之外的所有角色的武将牌。",
				"xjzh_boss_qingling":"清领",
				"xjzh_boss_qingling_info":"锁定技，游戏开始时、你受到伤害后，你（有x几率）令黄巾术士、黄巾力士、黄巾兵勇、黄巾方士随机两名角色登场（至多两名）；当场上有黄巾力士/黄巾术士/黄巾兵勇/黄巾方士存活时，你于每个回合结束后执行一个新的回合且你计算与其他角色距离减场上黄巾兵数量；你的[伤害]卡牌无法指定黄巾兵为目标；场上的黄巾兵阵亡时移出游戏（x为当前回合数的百分比，黄巾兵的体力上限和体力值为2，初始手牌为4）。",
				"xjzh_boss_dianxing":"电刑",
				"xjzh_boss_dianxing_info":"出牌阶段限一次，你可以弃置一张牌令一名敌方角色判定，若判定牌颜色与你弃置的牌颜色一致，你令其受到一点雷电伤害，然后你可以重复此流程;首个回合开始时、10的倍数个回合开始时、你的回合被跳过时、你的武将牌翻至背面时，你进行一次判定，若结果为♠2-9，你令场上所有敌方角色受到3点雷电伤害，若此时场上有阵亡的黄巾兵，你随机召集一名黄巾兵进入游戏；第50个回合开始前，你可以选择改变此技能形态",
				"xjzh_boss_fennu":"愤怒",
				"xjzh_boss_fennu_info":"锁定技，你的回合开始前，你选择获得1个奇术要件的效果，然后移除你已获得的奇术要件效果，若你的体力值小于你体力上限的一半，则将“获得1个”改为“获得至多3个”，若你的体力值不大于你的体力上限的1/3，则视为场上其他角色依次对自己使用一张【杀】。",
				"xjzh_boss_edu":"恶毒",
				"xjzh_boss_edu_info":"锁定技，出牌阶段限一次，你可以失去一点体力令一名其他角色获得“混乱”直到其回合结束，若此时你的体力值小于你体力上限的一半，你失去一点体力上限并视为该角色对场上除你之外的其他角色一次使用一张【决斗】。",
				"xjzh_boss_canren":"残忍",
				"xjzh_boss_canren_info":"当你造成伤害后，你可以获得其一张牌，然后展示牌堆顶一张牌，若此牌的花色与你获得其的牌花色一致，你获得此牌，然后重复此流程直到花色不一致。",
				"xjzh_boss_lianji":"连击",
				"xjzh_boss_lianji_info":"锁定技，你每使用3张基本牌/非延时锦囊牌，你的下一张非延时锦囊牌/基本牌额外结算1次",
				"xjzh_boss_qiangji":"强击",
				"xjzh_boss_qiangji_info":"锁定技，你受到伤害有几率离开游戏且该几率随机提高10%-30%(该几率至多为75%)，并于随机1-12s后回到游戏，然后令你回到游戏的时间降低10%-30%(该时间至少为1s)；当你回到游戏时，你可以视为使用一张你上一次因其受到伤害时的牌，然后你展示牌堆顶一张牌直到其花色、点数均与这张牌不同，并获得之前展示的所有牌，技能结算后，你立即结束当前回合并执行一个额外的回合。",
				"xjzh_boss_zenghen":"憎恨",
				"xjzh_boss_zenghen_info":"锁定技，本局游戏限3次，当你濒死时，你对场上所有角色造成一点火焰伤害，并令其获得燃烧，然后你的体力上限翻倍并回复体力至体力上限，然后选择将〖连击〗中的红色数字-1或蓝色数字+1，若你不拥有技能〖血炎〗，你获得该技能。",
				"xjzh_boss_xueyan":"血炎",
				"xjzh_boss_xueyan_info":"当你造成伤害后，你可以展示牌堆顶一张牌，所为红色，你对其造成一点火焰伤害并令获得燃烧，否则令其获得一层易伤。",
				"xjzh_boss_mengdu":"猛毒",
				"xjzh_boss_mengdu_info":"锁定技，你造成的所有伤害视为毒属性伤害，且你造成毒属性伤害根据你体力值的10倍的百分比几率令其获得一层中毒，因你而中毒的目标获得的中毒无层数上限；当你令一名角色中毒时，你摸x张牌（x为其武将牌上的中毒层数）；你防止获得中毒。",
				"xjzh_boss_huanshen":"幻身",
				"xjzh_boss_huanshen_info":"锁定技，限定技，当你受到伤害后，若你的体力值为不大于体力上限的1/3（四舍五入），然后你将体力值回复至体力上限的1/3（四舍五入），然后你召唤2个体力值和体力上限为3的“督瑞尔的幻影”，该角色拥有技能〖猛毒〗，然后你获得技能〖恶行〗。",
				"xjzh_boss_exing":"恶行",
				"xjzh_boss_exing_info":"锁定技，你使用[伤害]卡牌指定中毒目标时，你令其移除武将牌上的所有中毒，并额外结算x次（x为其移除中毒前武将牌上的中毒层数），并回复等量体力。",
				"xjzh_boss_dianmao":"电矛",
				"xjzh_boss_dianmao_info":"锁定技，当你不因此技能成为其他角色的[伤害]卡牌目标或你指定其他角色成为[伤害]卡牌目标时，你可以展示其一张手牌，若此牌为♠牌，你弃置此牌并视为对其使用一张不计入出牌次数的【雷杀】。",
				"xjzh_boss_dianchong":"电冲",
				"xjzh_boss_dianchong_info":"锁定技，当你受到/造成雷属性伤害后，你获得等量“电冲”标记并令其获得1层感电；当你有“电冲”标记时，你造成伤害有2x几率暴击（x为你的电冲标记数量的百分比），若为雷属性伤害，额外造成1点暴击伤害。",
				"xjzh_boss_dianhua":"电花",
				"xjzh_boss_dianhua_info":"出牌阶段，若你有“电冲”标记，你可以弃置1枚“电冲”标记并展示牌堆顶一张牌，若此牌花色为♠，你对一名其他角色造成一点雷属性伤害，否则你获得此牌；感电的角色执行摸牌、出牌阶段时有x几率改为你执行（x为你的“电冲”标记的百分比）。",
				"xjzh_boss_fusu":"复苏",
				"xjzh_boss_fusu_info":"锁定技，你失去牌回复一点体力，若你未受伤则改为摸一张牌；你的回合外，其他角色使用♥牌或回复体力后，你可以视为对其使用一张【杀】，若此【杀】造成伤害，你获得其所有牌。",
				"xjzh_boss_ganran":"感染",
				"xjzh_boss_ganran_info":"锁定技，你受到伤害令其获得一个“感染”标记；一名角色的“感染”标记不小于：1、其摸牌阶段摸牌数-1，2、你对其造成的伤害+1，3、其非锁定技失效，4、其跳过出牌阶段；出牌阶段限一次，你可以移动场上一枚“感染”标记，并令获得标记的角色失去一点体力。",
				"xjzh_boss_xuezhou":"血咒",
				"xjzh_boss_xuezhou_info":"锁定技，被感染的角色回合结束时，移除一枚“感染”标记；场上每一枚超出其体力值的“感染”标记令你摸牌时额外摸一张牌。",
				"xjzh_boss_shilian_intro":"天堂试炼",
				"xjzh_boss_shilian_intro_info":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消耗一个“世界之石碎片”参加一场高阶天堂试炼挑战，该挑战分为以下几个阶段<br><br><li>第一阶段：挑战1个大天使和2小天使<br><br><li>第二阶段：挑战1个高阶天使和2个大天使<br><br><li>第三阶段：挑战1个天使长和2个高阶天使<br><br><li>第四阶段：<br><br>早上8点-12点，晚上20点-24点挑战boss“伊纳瑞斯”和2个天使长<br><br>下午12点-16点，晚上0点-4点挑战boss“马萨伊尔”和1个夺魂者、1个堕落天使<br><br>除以上时间外挑战boss“塔尔拉沙”和2个剧毒沙虫",
				"xjzh_boss_shilian":"试炼",
				"xjzh_boss_shilian2":"试炼",
				"xjzh_boss_shenghui":"圣辉",
				"xjzh_boss_shenghui_info":"锁定技，你的摸牌阶段额外摸两张牌并回复一点体力。",
				"xjzh_boss_shenghui2":"圣辉",
				"xjzh_boss_shenghui2_info":"锁定技，你的摸牌阶段及结束阶段，你可以选择回复两点体力或摸两张牌。",
				"xjzh_boss_chiyan":"炽焰",
				"xjzh_boss_chiyan_info":"出牌阶段限一次，你可以选择一名其他角色，令其展示所有手牌，其中每有一张♦牌，视为你对其使用一张【火杀】；当你因此技能造成伤害结算时，你令所有友方角色回复一点体力。",
				"xjzh_boss_shenghui3":"圣辉",
				"xjzh_boss_shenghui3_info":"锁定技，当你摸牌或回复体力时，你令一名其他角色摸等量牌或回复等量体力，然后你获得1点护甲。",
				"xjzh_boss_caijue":"裁决",
				"xjzh_boss_caijue_info":"出牌阶段限一次，你可以令场上所有敌方角色依次展示一张手牌，然后你可以弃置一张花色一致的牌，对其造成一点雷属性伤害，若如此做，你摸一张牌。",
				"xjzh_boss_shenghui4":"圣辉",
				"xjzh_boss_shenghui4_info":"锁定技，你始终跳过弃牌阶段；你的回合内，若你已受伤，你使用基本牌额外结算x次，否则你使用非延时锦囊牌额外结算1次（x为你已失去的体力值）。",
				"xjzh_boss_caijue2":"裁决",
				"xjzh_boss_caijue2_info":"出牌阶段限一次，你可以展示一张手牌，并令所有敌方角色弃置一张花色一致的牌，否则你对其造成一点雷属性伤害；当你造成伤害后，你可以令〖圣辉〗中的数字交换。",
				"xjzh_boss_shenyou":"神佑",
				"xjzh_boss_shenyou_info":"锁定技，你与你的友方角色若有负面状态，其成为[伤害]卡牌目标时，卡牌来源需弃置一张牌，否则此牌无效；若无负面状态，其防止所有属性伤害。",
				"xjzh_qishu_shouyu":"兽语",
				"xjzh_qishu_shouyu_info":"锁定技，你无法成为延时锦囊牌的目标，其他角色准备准备阶段开始时，你令其执行一次随机延时锦囊牌判定。",
				"xjzh_qishu_shendong":"深冻",
				"xjzh_qishu_shendong_info":"锁定技，你造成伤害视为冰属性伤害；出牌阶段限一次，你可以选择一名对你造成过伤害的角色，令其弃置x张牌，每少弃置一张牌失去一点体力上限，然后视为其未对你造成过伤害（x为其对你造成伤害的次数）。",
				"xjzh_qishu_feimou":"非谋",
				"xjzh_qishu_feimou_info":"锁定技，当你受到伤害后，你获得其所有手牌，然后将这些牌随机分配给伤害来源。",
				
			},
		};
		if(true){
			for(var i in XWTZ.character){
				//阵亡配音
				XWTZ.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWTZ.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWTZ.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(var i in XWTZ.character){
				XWTZ.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
		return XWTZ;
	});
});