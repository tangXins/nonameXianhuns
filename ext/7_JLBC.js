'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	game.import('character',function(){
		if(!lib.config.characters.includes('JLBC')) lib.config.characters.remove('JLBC');
		lib.translate['JLBC_character_config']='极略补充';
		var JLBC={
			name:'JLBC',
			connect:true,
			connectBanned:[],
			characterSort:{
				JLBC:{
					//神武将
					"JLBC_shen":['xjzh_jlsg_diaochan'],
				    //其他
				    "JLBC_other":["xjzh_jlsg_zhaoyan"],
				},
			},
			character:{
				"xjzh_jlsg_diaochan":["female","shen",1,["xjzh_jlsg_lihun","xjzh_jlsg_jueshi"],[]],
				"xjzh_jlsg_zhaoyan":["female","wu",3,["xjzh_jlsg_sanjue"],[]],
			},
			characterIntro:{},
			characterTitle:{},
			perfectPair:{},
			characterReplace:{},
			characterFilter:{},
			skill:{
			    "xjzh_jlsg_sanjue":{
			        trigger:{
			            player:"useCardAfter",
			        },
			        forced:true,
			        locked:true,
			        priority:3,
			        audio:"ext:仙家之魂/jlsg/audio:3",
			        group:["xjzh_jlsg_sanjue_use"],
			        init(player){
			            if(!player.storage.xjzh_jlsg_sanjue) player.storage.xjzh_jlsg_sanjue=[];
			        },
			        filter(event,player){
			            var num=0;
			            var history=player.getAllHistory('useCard');
						if(!history.length) return false;
						for(var i=0;i<history.length;i++){
							if(!history[i].card) continue;
							if(history[i].card.name==event.card.name) num++;
						}
						if(num==1||num==3) return true;
						return false;
			        },
			        async content(event,trigger,player){
					    let list=game.xjzh_wujiangpai().filter(name=>{
					        return lib.character[name][1]=="wu";
					    });
					    let skills=[];
					    for await(let i of list){
					        if(!lib.character[i][3]||!lib.character[i][3].length) continue;
							skills.addArray((lib.character[i][3]).filter(function(skill){
								let info=lib.skill[skill];
								let array=player.storage.xjzh_jlsg_sanjue;
								if(array.includes(skill)||skill=="xjzh_jlsg_sanjue") return false;
								return info&&!info.dutySkill&&!info.juexingji&&!info.limited&&!info.unique;
							}));
					    }
					    if(!skills.length) return;
					    player.storage.xjzh_jlsg_sanjue.push(skills.randomGet());
			        },
			        subSkill:{
			            "use":{
			                enable:"phaseUse",
			                filterTarget:true,
			                audio:"xjzh_jlsg_sanjue",
			                prompt:"〖三绝〗：选择一名角色获得一个储备技能",
			                filter(event,player){
			                    return player.storage.xjzh_jlsg_sanjue&&player.storage.xjzh_jlsg_sanjue.length>0;
			                },
			                async content(event,trigger,player){
			                    let list=[];
                                for(let i in lib.character){
                                    if(lib.character[i][4].includes('boss')) continue;
                                    if(!lib.character[i][3]) continue;
                                    if(lib.character[i][4].includes('minskin')) continue;
                                    if(lib.filter.characterDisabled2(i)) continue;
                                    if(lib.character[i][3].some(function(skill){
                                        return player.storage.xjzh_jlsg_sanjue.includes(skill);
                                    })){
                                        let skillsx=lib.character[i][3].filter(function(skill){
                                            return player.storage.xjzh_jlsg_sanjue.includes(skill);
                                        });
                                        for(let skill of skillsx){
                                            var cardname='xjzh_jlsg_sanjue'+skill;
                                            lib.card[cardname]={
                                                fullimage:true,
                                                skills:skill,
                                                image:'character:'+i,
                                            }
                                            lib.translate[cardname]=lib.translate[skill];
                                            lib.translate[cardname+"_info"]=lib.translate[skill+"_info"];
                                            list.addArray([cardname]);
                                        }
                                    }
                                };
                                if(!list.length) return;
                                let dialog=ui.create.dialog('〖三绝〗',[list,'vcard'],'hidden');
                                const {result:{bool,links}}=await player.chooseButton(dialog,true,1).set('ai',button=>{
                                    return Math.random();
                                });
                                if(bool){
                                    event.target.addSkillLog(lib.card[links[0][2]].skills);
                                    //添加获得一个动画
                                    let card=game.createCard(links[0][2]);
                                    event.target.$gain2(card);
                                    event.target.update();
                                    player.storage.xjzh_jlsg_sanjue.remove(lib.card[links[0][2]].skills);
                                }
			                },
			                ai:{
			                    order:12,
			                    expose:0.2,
			                    result:{
			                        player:1,
			                    },
			                },
			            },
			        },
			    },
                "xjzh_jlsg_lihun":{
                    trigger:{
                        player:"phaseAfter",
                    },
                    frequent:true,
					audio:"ext:仙家之魂/jlsg/audio:4",
                    group:["xjzh_jlsg_lihun2"],
                    async content(event,trigger,player){
                        const {result:{bool,targets}}=await player.chooseTarget('〖离婚〗：请选择一名其他角色进行一个额外的回合',lib.filter.notMe);
                        if(bool){
                            targets[0].addTempSkill("xjzh_jlsg_lihun_mod",{player:"phaseAfter"});
                            targets[0].insertPhase();
                        }
                    },
                    subSkill:{
                        "mod":{
                            trigger:{player:["chooseToUseBefore","chooseUseTargetBefore"]},
                            ai:{jiuOther:true},
                            init(player,skill){
                                player.storage.taoenable=lib.card.tao.enable;
                                lib.card.tao.enable=function(card,player,event){
                                    if(player.hp<player.maxHp) return true;
                                    let range=[-1,-1];
                                    game.checkMod(card,player,range,'selectTarget',player);
                                    if(range[0]==1) return true;
                                    return false;
                                };
                            },
                            onremove(player,skill){
                                lib.card.tao.enable=player.storage.taoenable;
                                delete player.storage.taoenable;
                            },
                            filter(event,player){
                                if(event.name=="chooseUseTarget"){
                                    if(event.targets.length==game.players.length&&!event.filterTarget) return true;
                                    return false;
                                };
                                return event.filterTarget&&event.filterTarget==lib.filter.filterTarget;
                            },
                            charlotte:true,
                            firstDo:true,
                            popup:false,
                            forced:true,
                            content(){      
                                if(event.name=="chooseUseTarget"){
                                    trigger.set('filterTarget',function(card,player,target){
                                        if(!_status.event.targets.includes(target)) return false;
                                        if(!card) return false;			
                                        if(_status.event.nodistance&&lib.filter.targetEnabledx(card,player,target)) return true; 
                                        if(lib.filter.filterTarget(card,player,target)) return true;                                            
                                        
                                        if(game.checkMod(card,player,target,'unchanged','playerEnabled',player)==false) return false;
                                        let mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target);
                                        if(mod===false) return false;
                                        if(mod===true) return true;	
                                        let filter=get.info(card).modTarget;
                                        if(typeof filter=='boolean') return filter;
                                        if(typeof filter=='function') return filter(card,player,target);
                                        return false;
                                    });                                                        
                                }
                                else{     
                                    trigger.set('filterTarget',function(card,player,target){
                                        if(!card) return false;			
                                        if(lib.filter.filterTarget(card,player,target)) return true;                            	
                                        if(game.checkMod(card,player,target,'unchanged','playerEnabled',player)==false) return false;
                                        let mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target);
                                        if(mod===false) return false;
                                        if(mod===true) return true;	
                                        let filter=get.info(card).modTarget;
                                        if(typeof filter=='boolean') return filter;
                                        if(typeof filter=='function') return filter(card,player,target);
                                        return false;
                                    });
                                };
                            },
                            mod:{
                                targetEnabled(card,player,target,now){
                                    if(player==target&&card.name=='sha') return true
                                },
                                cardUsable(card,player,num){
                                    if(typeof num=='number') return Infinity
                                },
                                targetInRange(card,player,target,now){
        							return true;
        						},
        						selectTarget(card,player,range){
                                    let type=get.type(card);
                                    let info=get.info(card);
                                    if(type=='basic'||type=='trick'){
                                        if(info.notarget) return;
                                        if(info.multitarget) return;
                                        range[0]=1;
                                        if(range[1]==-1){
                                            range[1]=game.players.length;
                                        }else range[1]+=game.players.length-1
                                    }
                                    if(type=='equip'||type=='delay'){
                                        if(info.notarget) return;
                                        if(info.multitarget) return;
                                        range[0]=1;
                                        range[1]=1;
                                    }
                                },
                            },
                        },
                    },
                },
                "xjzh_jlsg_lihun2":{
    				forced:true,
    				trigger:{global:'phaseBeginStart'},
    				filter(event,player){
    					return player!=event.player&&!event.player._trueMe&&event.player.hasSkill('xjzh_jlsg_lihun_mod');
    				},
    				logTarget:'player',
    				skillAnimation:true,
    				animationColor:'key',
    				async content(event,trigger,player){
    					trigger.player._trueMe=player;
    					game.addGlobalSkill('autoswap');
    					if(trigger.player==game.me){
    						game.notMe=true;
    						if(!_status.auto) ui.click.auto();
    					}
    					trigger.player.addSkill('xjzh_jlsg_lihun3');
    				},
    			},
    			"xjzh_jlsg_lihun3":{
    				trigger:{
    					player:['phaseAfter','dieAfter'],
    					global:'phaseBefore',
    				},
    				lastDo:true,
    				charlotte:true,
    				forceDie:true,
    				forced:true,
    				silent:true,
    				async content(event,trigger,player){
    					player.removeSkill('xjzh_jlsg_lihun3');
    				},
    				onremove(player){
    					if(player==game.me){
    						if(!game.notMe) game.swapPlayerAuto(player._trueMe)
    						else delete game.notMe;
    						if(_status.auto) ui.click.auto();
    					}
    					delete player._trueMe;
    				},
    			},
                "xjzh_jlsg_jueshi":{
                    trigger:{
                        player:"dying",
                    },
                    forced:true,
                    locked:true,
                    priority:1,
					audio:"ext:仙家之魂/jlsg/audio:4",
                    group:"xjzh_jlsg_jueshi_maxhp",
                    filter(event,player){
                        let cards=get.cardPile2(function(card){
                            return card.name=="tao"||card.name=="jiu";
                        });
                        let targets=game.filterPlayer(function(current){
                            return current.countCards('h',function(card){
                                return card.name=="tao"||card.name=="jiu";
                            });
                        });
                        return cards||targets.length;
                    },
                    async content(event,trigger,player){
                        "step 0"
                        var cards=Array.from(ui.cardPile.childNodes).filter(card=>['tao','jiu'].includes(card.name));
                        cards.push(...game.filterPlayer().map(current=>current.getCards('h',card=>['tao','jiu'].includes(card.name))).flat());
                        event.cards=cards;
                        "step 1"
                        if(!event.cards.length||player.isHealthy()){
                            event.finish();
                            return;
                        }
                        var card=event.cards.randomRemove();
                        var next=player.useCard(card,player);
                        var owner=get.owner(card);
                        if(owner&&owner!=player){
                            next.throw=false;
                            owner.$throw(card);
                        }
                        event.redo();
                    },
                    subSkill:{
                        "maxhp":{
                            trigger:{
                                global:"gameStart",
                                player:["enterGame","gainMaxHpBegin","loseMaxHpBegin"],
                            },
                            direct:true,
                            priority:1,
                            sub:true,
                            async content(event,trigger,player){
                                if(["gainMaxHp","loseMaxHp"].includes(trigger.name)){
                                    trigger.cancel(null,null,'notrigger');
                                }else{
                                    player.hp=1;
                                    player.maxHp=1;
                                    player.update();
                                }
                            },
                        },
                    },
                },
                
                
                
			},
			dynamicTranslate:{
			    "xjzh_jlsg_sanjue":function(player){
			        let str=lib.translate["xjzh_jlsg_sanjue_info"];
			        if(!player.storage.xjzh_jlsg_sanjue.length) return str;
			        let storage=player.storage.xjzh_jlsg_sanjue;
			        let skills=new Array();
			        for(let skill of storage){
			            skills.push(get.translation(skill));
			        }
			        return str+="<br><br><span style=\"color:#F3D22B\">三绝储备技能</span>："+skills;
			    },
			    
			},
			translate:{
				"xjzh_jlsg_diaochan":"sp神貂蝉",
				"xjzh_jlsg_zhaoyan":"赵嫣",
				
				"xjzh_jlsg_sanjue":"三绝",
				"xjzh_jlsg_sanjue_info":"锁定技，当你第一次或第三次使用同名牌时，然后从未上场的吴势力武将中获得一个不为此技能的储备技能；出牌阶段，你可以令一名角色获得一个储备技能",
				"xjzh_jlsg_lihun":"离魂",
				"xjzh_jlsg_lihun_info":"回合结束时，你可以选择一名其他角色，该角色进行一个由你操控的额外回合，其于此额外回合内使用牌可以选择任意角色为目标，且无距离和次数限制。",
				"xjzh_jlsg_jueshi":"绝世",
				"xjzh_jlsg_jueshi_info":"锁定技，你的体力上限锁定为1，当你濒死时，你随机使用场上所有角色手牌及牌堆中的【桃】/【酒】直到你脱离濒死状态。",
				
				"JLBC_shen":"神武将",
                "JLBC_other":"其他",
			},
		};
		if(true){
			for(var i in JLBC.character){
                JLBC.character[i][4].push('ext:仙家之魂/jlsg/skin/'+i+'.jpg');
			}
		}
		else{
			for(var i in JLBC.character){
				JLBC.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
		return JLBC;
	});
});