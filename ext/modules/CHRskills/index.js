import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';

export const CHRskills={
    skill:{
	    //获取角色初始法力值并显示
	    "_xjzh_skill_showMpCount":{
	        trigger:{
	            global:["gameStart"],
	            player:"enterGame",
	        },
	        silent:true,
	        priority:Infinity,
	        firstDo:true,
			/*locked:true,
			fixed:true,
			charlotte:true,
			unique:true,
			superCharlotte:true,*/
        	marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_skill_showMpCount.png>`,
			intro:{
				name:"魔力面板",
				content(storage,player){
					let str=``;
					if(player.xjzhHuixin) str+=`<li>会心几率：${Math.round(player.xjzhHuixin*100)}%`;
					if(player.xjzhReduce) str+=`<li>消耗减免：${Math.round(player.xjzhReduce*100)}%`;
					return str;
				},
			},
			/*onremove(player){
				player.xjzhremoveMp();
			},*/
	        filter(event,player){
	            if(!get.xjzh_wujiang(player)) return false;
				if(player.isOut()) return false;
				let nameList=get.playerName(player),num=0;
				nameList.forEach(item=>{
					let names=lib.character[item][5];
					if(names&&Array.isArray(names)){
						let object=names.filter(index=>{
							if(Object.prototype.toString.call(index)==='[object Object]'&&index!==null&&index.name=='xjzhMp') return true;
							return false;
						});
						if(object.length>0) num++;
					}
				});
				return num>0;
	        },
	        async content(event,trigger,player){
				let nameList=get.playerName(player),object;
				nameList.forEach(item=>{
					let names=lib.character[item][5];
					if(names&&Array.isArray(names)){
						object=names.filter(index=>{
							if(Object.prototype.toString.call(index)==='[object Object]'&&index!==null&&index.name=='xjzhMp') return true;
							return false;
						})[0];
					}
				});
				if(!player.node.xjzhmp){
					await player.changexjzhmaxMp(object["maxMp"]);
					await player.changexjzhMp(object["mp"]);
					if(object.hasOwnProperty("huixin")){
						if(!player.xjzhHuixin) player.xjzhHuixin=object["huixin"]||0;
						else player.xjzhHuixin+=object["huixin"];
					}
					if(object.hasOwnProperty("reduce")){
						if(!player.xjzhReduce) player.xjzhReduce=object["reduce"]||0;
						else player.xjzhReduce+=object["reduce"];
					}
				}
				player.markSkill(event.name);
	        },
	    },
		// ---------------------------------------状态技能------------------------------------------//
		"xjzh_intro_jufeng":{
			trigger:{
				player:"damageBegin",
			},
			forced:true,
			locked:true,
			popup:false,
			priority:9,
			unique:true,
			mark:true,
			marktext:"风",
			intro:{
				name:"提速尾流",
				content:function(storage,player){
					var str='';
					str+='提速尾流：'+get.translation(storage)+'层'+'<br>免伤几率：'+get.translation(storage)*4+'%'+'<br>额外摸牌：'+Math.floor(get.translation(storage)/2)+'<br>额外出杀／酒次数：'+Math.floor(get.translation(storage)/5);
					return str;
				},
			},
			mod:{
				cardUsable:function(card,player,num){
					if(card.name=='sha'||card.name=='jiu') return num+Math.floor(player.countMark("xjzh_intro_jufeng")/5);
				}
			},
			init:function(player,skill){
				player.storage.xjzh_intro_jufeng==0;
			},
			filter:function (event,player){
				return Math.random()<=player.countMark("xjzh_intro_jufeng")*0.03;
			},
			group:["xjzh_intro_jufeng_mopai"],
			content:function (){
				trigger.cancel();
			},
			subSkill:{
				"mopai":{
					trigger:{
						player:"phaseDrawBegin",
					},
					forced:true,
					popup:false,
					filter:function (event,player){
						return player.hasMark("xjzh_intro_jufeng");
					},
					content:function (){
						trigger.num+=Math.floor(player.countMark("xjzh_intro_jufeng")/2);
					},
				},
			},
		},
		// ---------------------------------------增益技能------------------------------------------//
		"xjzh_zengyi_off":{
			locked:true,
			fixed:true,
			charlotte:true,
			superCharlotte:true,
			unique:true,
			sub:true,
			onremove:function(player){
				player.addSkill("xjzh_zengyi_off");
			},
		},
		"xjzh_zengyi_pianxian":{
		    trigger:{
		        global:"gameStart",
		        player:["changeSkillsAfter","enterGame"],
		    },
			forced:true,
			locked:true,
			unique:true,
			mark:true,
			marktext:"翩",
			intro:{
			    name:"翩跹",
			    content:"你“每回合限x次”和“出牌阶段限x次”的技能无次数限制",
			},
			async getSKillReslut(player){
				let skills=player.getSkills(null,false,false).filter(skill=>{
					let info=get.info(skill);
					if(lib.skill.global.includes(skill)) return false;
					if(skill.indexOf('jycw')!=-1) return false;
					return info&&info.usable&&typeof info.usable=='number';
				});
				if(skills.length){
					for await(let skill of skills){
						let info=get.info(skill);
						delete info.usable;
					}
				}
			},
			init(player,skill){
				lib.skill[skill].getSKillReslut(player);
			},
			async content(event,trigger,player){
				lib.skill["xjzh_zengyi_pianxian"].getSKillReslut(player);
			},
		},
		"xjzh_zengyi_zhuanpo":{
		    trigger:{
		        global:"dying",
		    },
			locked:true,
			unique:true,
			mark:true,
			marktext:"转",
			intro:{
			    name:"转魄",
			    content:"限定技，当一名角色濒死时，你将其主将替换为任意你选择的武将牌。",
			},
			limited:true,
			init(player){
			    player.storage.xjzh_zengyi_zhuanpo=false;
			},
			check(event,player){
			    return get.attitude(event.player,player);
			},
			prompt(event,player){
			    return `〖转魄〗：${get.translation(event.player)}濒死，是否发动技能替换其主将武将牌？`;
			},
			filter(event,player){
			    return !player.storage.xjzh_zengyi_zhuanpo;
			},
			async content(event,trigger,player){
			    player.awakenSkill("xjzh_zengyi_zhuanpo");
			    player.storage.xjzh_zengyi_zhuanpo=true;
			    let list=game.xjzh_wujiangpai().filter(name=>{
			        return !["xjzh_sanguo_zuoyou"].includes(name);
			    }).randomGets(30);
			    const links=await player.chooseButton(true).set('createDialog',['〖转魄〗：请选择一张武将牌',[list,'character']]).forResultLinks();
			    trigger.player.reinit(trigger.player.name1,links[0],[trigger.player.hp,trigger.player.maxHp]);
			    trigger.player.recoverTo(trigger.player.maxHp)
			},
		},
		"xjzh_zengyi_daoge":{
		    trigger:{
		        player:"dieBefore",
		    },
			locked:true,
			unique:true,
			silent:true,
			mark:true,
			marktext:"倒",
			intro:{
			    name:"倒戈",
			    content:"当你即将阵亡时，若你的身份为忠臣/反贼且体力上限大于1，你失去一半的体力上限(向下取整)，将身份改为反贼/忠臣，然后终止阵亡结算并回复体力至体力上限，然后若此时满足你所在阵营的胜利条件，你获得胜利。",
			},
			filter(event,player){
			    return player.maxHp>1&&["zhong","fan"].includes(player.identity);
			},
			async content(event,trigger,player){
			    trigger.cancel(null,null,'notrigger');
			    let num=Math.floor(player.maxHp/2);
			    await player.loseMaxHp(num);
			    player.recoverTo(player.maxHp);
			    var id=player.identity,id2;
			    switch(id){
			        case "fan":
			        id2="zhong";
			        break;
			        case "zhong":
			        id2="fan";
			        break;
			    }
				player.identity=id2;
				player.setIdentity(id2);
				player.showIdentity();
				player.update();
				game.log(player,"发动了技能","#g〖"+get.translation("xjzh_zengyi_daoge")+"〗","将身份改为了","#y"+get.translation(id2));
				if(player.identity=="zhong"){
				    if(!game.hasPlayer(current=>current.identity=="fan"||current.identity=="nei")) game.over(true);
				}
			},
		},
		"xjzh_zengyi_chongsu":{
		    trigger:{
		        global:"gameStart",
		        player:"enterGame",
		    },
		    silent:true,
			locked:true,
			unique:true,
			mark:true,
			marktext:"重",
			intro:{
				name:"重塑",
				translations:"游戏开始时，你可以自定义你的回合",
				content(storage,player){
				    if(!player.storage.xjzh_zengyi_chongsu) return "游戏开始时，你可以自定义你的回合。";
			        let phase={
			            "phaseZhunbei":"准备",
			            "phaseJudge":"判定",
			            "phaseDraw":"摸牌",
			            "phaseUse":"出牌",
			            "phaseDiscard":"弃牌",
			            "phaseJieshu":"结束",
			        },str="";
				    let object={
			            "phaseZhunbei":[storage["phaseZhunbei"],phase[storage["phaseZhunbei"]]],
			            "phaseJudge":[storage["phaseJudge"],phase[storage["phaseJudge"]]],
			            "phaseDraw":[storage["phaseDraw"],phase[storage["phaseDraw"]]],
			            "phaseUse":[storage["phaseUse"],phase[storage["phaseUse"]]],
			            "phaseDiscard":[storage["phaseDiscard"],phase[storage["phaseDiscard"]]],
			            "phaseJieshu":[storage["phaseJieshu"],phase[storage["phaseJieshu"]]],
			        };
			        for(let i in object){
                        switch(i){
                            case "phaseZhunbei":
                                str+=`&emsp;&emsp;准备阶段：${object[i][1]}阶段<br>`;
                            break;
                            case "phaseJudge":
                                str+=`&emsp;&emsp;判定阶段：${object[i][1]}阶段<br>`;
                            break;
                            case "phaseDraw":
                                str+=`&emsp;&emsp;摸牌阶段：${object[i][1]}阶段<br>`;
                            break;
                            case "phaseUse":
                                str+=`&emsp;&emsp;出牌阶段：${object[i][1]}阶段<br>`;
                            break;
                            case "phaseDiscard":
                                str+=`&emsp;&emsp;弃牌阶段：${object[i][1]}阶段<br>`;
                            break;
                            case "phaseJieshu":
                                str+=`&emsp;&emsp;结束阶段：${object[i][1]}阶段`;
                            break;
                        };
			        }
                    return str;
                },
			},
			onremove:function(player,skill){
			    delete player.storage.xjzh_zengyi_chongsu
			},
			init:function(player,skill){
			    if(game.roundNumber>0) player.useSkill("xjzh_zengyi_chongsu",player);
			},
			group:"xjzh_zengyi_chongsu_mod",
		    async content(event,trigger,player){
		        let phaseList=["准备","判定","摸牌","出牌","弃牌","结束"],num=0;
		        let objects={
		            "phaseZhunbei":"phaseZhunbei",
		            "phaseJudge":"phaseJudge",
		            "phaseDraw":"phaseDraw",
		            "phaseUse":"phaseUse",
		            "phaseDiscard":"phaseDiscard",
		            "phaseJieshu":"phaseJieshu",
		        };
		        if(!player.storage.xjzh_zengyi_chongsu) player.storage.xjzh_zengyi_chongsu=objects;
				while(num<6){
					let count=phaseList[num];
					let dialog=ui.create.dialog(`〖重塑〗：请选择将${count}阶段替换为你选择阶段`,'forcebutton');
					const control=await player.chooseControl(phaseList,true).set('dialog',dialog).set('ai',function(){
						return phaseList.randomGet()
					}).forResultControl();
					if(control){
						let phases={
							"准备":"phaseZhunbei",
							"判定":"phaseJudge",
							"摸牌":"phaseDraw",
							"出牌":"phaseUse",
							"弃牌":"phaseDiscard",
							"结束":"phaseJieshu",
						};
						let objects=player.storage.xjzh_zengyi_chongsu;
						objects[Object.keys(objects)[num]]=phases[control];
						player.storage.xjzh_zengyi_chongsu=objects;
						num++
					}
				}
				console.log(player.storage.xjzh_zengyi_chongsu);
		    },
		    subSkill:{
		        "mod":{
		            trigger:{
		                player:["phaseBegin"],
		            },
		            forced:true,
		            priority:100,
		            sub:true,
		            filter:function(event,player){
		                if(!player.storage.xjzh_zengyi_chongsu) return false;
		                return true;
		            },
					async content(event,trigger,player){
		                let objects=player.storage.xjzh_zengyi_chongsu,phaseList=[];
						for(let i in objects){
							phaseList.push(objects[i]);
						}
						trigger.phaseList=phaseList;
		            },
		        },
		    },
		},
		"xjzh_zengyi_shunying":{
			trigger:{
			    global:"roundStart",
			},
			filter:function(event,player){
			    return !player.hasSkill("xjzh_zengyi_shunying_off")&&game.roundNumber>0;
			},
			locked:true,
			charlotte:true,
			unique:true,
			direct:true,
			mark:true,
			marktext:"瞬",
			intro:{
				name:"瞬影",
				content:"每轮游戏开始前，你执行一个额外的回合，其他角色于此回合内非锁定技无效",
			},
			async content(event,trigger,player){
			    player.addTempSkill("xjzh_zengyi_shunying_off");
			    player.logSkill("xjzh_zengyi_shunying");
			    game.countPlayer(function(current){
			        if(current!=player) current.addTempSkill('fengyin','phaseAfter');
			    });
			    player.phase("xjzh_zengyi_shunying");
			},
			subSkill:{"off":{sub:true,},},
		},
		"xjzh_zengyi_fengyue":{
			trigger:{
			    player:"phaseBegin",
			},
			locked:true,
			unique:true,
			mark:true,
			silent:true,
			marktext:"风",
			intro:{
				name:"风月",
				content:"回合开始时，你随机获得一个女性角色的技能",
			},
			async content(event,trigger,player){
			    let characterlist=game.xjzh_wujiangpai(null,null,false).filter(name=>{
			        if(!lib.character[name][3]||!lib.character[name][3].length) return false;
			        return lib.character[name][0]=="female";
			    });
			    const skills=new Array();
			    for await(let name of characterlist){
				    skills.addArray((lib.character[name][3]).filter(function(skill){
					    var info=lib.skill[skill];
					    return info&&!info.charlotte&&!info.dutySkill&&!info.juexingji&&!info.limited&&!info.unique&&!info.sub;
				    }));
			    }
				player.addSkillLog(skills.randomGet());
			    player.logSkill("xjzh_zengyi_fengyue",player);
			},
		},
		"xjzh_zengyi_hunqian":{
		    enable:"phaseUse",
		    popup:false,
			locked:true,
			unique:true,
			mark:true,
			marktext:"魂",
			intro:{
				name:"魂牵",
				content:"出牌阶段限一次，你可以交换两名角色的手牌、体力、体力上限之一",
			},
			usable:1,
		    filterTarget:true,
		    selectTarget:2,
		    multitarget:true,
		    multiline:true,
		    async content(event,trigger,player){
		        const targets=event.targets.slice(0);
		        const controlList=[
	                `交换${get.translation(targets[0])}和${get.translation(targets[1])}的体力`,
	                `交换${get.translation(targets[0])}和${get.translation(targets[1])}的体力上限`,
	                `交换${get.translation(targets[0])}和${get.translation(targets[1])}的手牌`,
	            ]
	            if(targets[0].countCards('h')==0&&targets[1].countCards('h')==0) controlList.remove(controlList[2]);
                const {result:{bool,control,index}}=await player.chooseControlList(get.prompt(event.name,player),controlList).set('ai',(card,player,target)=>{
                    let att=get.attitude(targets[0],player);
                    let att2=get.attitude(targets[1],player);
                    if(att>0){
                        if(targets[0].hp<targets[1].hp) return 1;
                        return 0;
                    }
                    if(att2>0){
                        if(targets[1].hp<targets[0].hp) return 1;
                        return 0;
                    }
                    return Math.random();
	            }).set('targets',targets);
	            if(control!="cancel2"){
	                switch(index){
	                    case 0:{
		                    targets[0].hp^=targets[1].hp;
			                targets[1].hp^=targets[0].hp;
			                targets[0].hp^=targets[1].hp;
			                game.log(targets[0],"与",targets[1],"交换了体力值");
	                    }
	                    break;
	                    case 1:{
			                targets[0].maxHp^=targets[1].maxHp;
			                targets[1].maxHp^=targets[0].maxHp;
			                targets[0].maxHp^=targets[1].maxHp;
			                game.log(targets[0],"与",targets[1],"交换了体力上限");
	                    }
	                    break;
	                    case 2:{
		                    targets[0].swapHandcards(targets[1]);
	                        game.log(targets[0],"与",targets[1],"交换了手牌");
	                    }
	                    break;
	                };
	                targets[0].update();
	                targets[1].update();
	                player.logSkill("xjzh_zengyi_hunqian",targets);
	            }
		    },
		    ai:{
		        order:12,
		        result:{
		            player:1,
		        },
		    },
		},
		"xjzh_zengyi_mengdie":{
			trigger:{
			    player:"damageAfter",
			},
		    popup:false,
			locked:true,
			unique:true,
			mark:true,
			marktext:"梦",
			intro:{
				name:"梦蝶",
				content:"当你受到伤害后，你可以令两名角色交换你指定的一个技能",
			},
			prompt:"〖梦蝶〗：选择两个角色交换你指定的一个技能",
			check(){return 1},
		    async content(event,trigger,player){
		        let skills=new Array();
		        const targets=await player.chooseTarget('〖梦蝶〗：选择交换两名角色一个你指定的技能',2,(card,player,target)=>{
		            return target.getSkills(null,false,false).filter(function(skill){
		                let info=lib.skill[skill];
    		            if(info&&(info.cardSkill||info.equipSkill||info.nogainsSkill)) return false;
    			        return lib.translate[skill]&&lib.translate[skill+"_info"];
    		        }).length;
		        }).set('ai',target=>{
		            return Math.random();
		        }).forResultTargets();
		        if(targets){
		            for await(let target of targets){
		                let list=target.getSkills(null,false,false).filter(function(skill){
    		                let info=lib.skill[skill];
    		                if(info&&(info.cardSkill||info.equipSkill||info.nogainsSkill)) return false;
    				        return lib.translate[skill]&&lib.translate[skill+"_info"];
    			        });
    			        if(event.isMine()){
    				        var dialog=ui.create.dialog('forcebutton');
    				        dialog.add('请选择获得一项技能');
    				        for(let i=0;i<list.length;i++){
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
    			        const control=await player.chooseControl(list).set('prompt','〖梦蝶〗：请选择一项技能').set('ai',()=>{
    				        return list.randomGet();
    			        }).set('dialog',dialog).forResultControl();
    			        if(control) skills.push(control);
		            }
		            if(skills.length){
		                targets[0].changeSkills(Array.of(skills[1]),Array.of(skills[0]));
						targets[1].changeSkills(Array.of(skills[0]),Array.of(skills[1]));
		                player.logSkill("xjzh_zengyi_mengdie",event.targets2);
		            }
		        }
		    },
		},
		"xjzh_zengyi_poxiao":{
			trigger:{
			    player:"phaseBefore",
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"破",
			intro:{
				name:"破晓",
				content:"回合开始时，你重置已发动的限定技",
			},
			filter(event,player){
			    let list=player.getSkills(null,false,false).filter(function(skill){
				    var info=lib.skill[skill];
				    return info&&info.limited&&!info.juexingji&&player.awakenedSkills.includes(skill);
			    });
			    if(list.length) return true;
			    return false;
			},
		    async content(event,trigger,player){
		        let list=player.getSkills(null,false,false).filter(function(skill){
				    var info=lib.skill[skill];
				    return info&&info.limited&&!info.juexingji
			    });
			    if(list.length){
			        if(player.storage.xjzh_wzry_tiannaiaudio){
			            game.playXH(['xjzh_wzry_tiannai1','xjzh_wzry_tiannai2','xjzh_wzry_tiannai3','xjzh_wzry_tiannai4'].randomGet());
			        }
		            player.restoreSkill(list);
		        }
		        player.logSkill("xjzh_zengyi_poxiao",player);
		    },
		},
		"xjzh_zengyi_shuangsheng":{
			trigger:{
			    player:"enterGame",
			    global:"gameStart",
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"双",
			intro:{
				name:"双生",
				content:"游戏开始时，你选择并获得至多两个其他增益技能",
			},
			async content(event,trigger,player){
			    let list=[
			        "pianxian","chongsu","shunying","fengyue","hunqian","mengdie","poxiao","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
			    ]
			    if(get.mode()=="identity") list.push("daoge");
                let skills=[]
                for(let skill of list){
                    skills.push("xjzh_zengyi_"+skill);
                }
                let cards=[]
                for(let i of skills){
                    lib.card[i]={
                        fullskin:false,
                        image:"ext:仙家之魂/image/avatar/xjzh_avatar_zengyi.png",
                    };
                    var info=get.info(i)
                    lib.translate[i+"_info"]=info.intro.content;
                    if(lib.card[i]) cards.addArray([i]);
                };
                let dialog=ui.create.dialog('〖双生〗：请选择获得至多两个技能',[cards,'vcard'],'hidden');
                const [bool,links]=await player.chooseButton(dialog,true,[1,2]).set('ai',button=>{
                    return Math.random();
                }).forResult('bool','links');
                if(bool){
                    for(let i of skills){
                        delete lib.translate[i+"_info"];
                    }
                    for(let link of links){
                    //for(var i=0;i<result.links.length;i++){
                        player.addSkill(link[2]);
                        game.log(player,'获得了技能','#g〖'+get.translation(link[2])+'〗');
                        //添加获得一个动画
                        var card=game.createCard("xjzh_zengyi_shuangsheng_card");
                        player.$gain2(card);
                    }
                    player.logSkill("xjzh_zengyi_shuangsheng",player);
                    player.update();
                }
	        },
		},
		"xjzh_zengyi_xuanbian":{
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"玄",
			intro:{
				name:"玄变",
				content:"你获得该技能时，你可以将牌堆牌名相同的一种牌替换为另一种",
			},
			init(player){
		        var next=game.createEvent('xjzh_zengyi_xuanbian_add',false);
		        next.player=player;
		        next.setContent(lib.skill.xjzh_zengyi_xuanbian.contentList);
			},
			contentList(){
			    "step 0"
			    var list=[];
			    for(var i=0;i<lib.inpile.length;i++){
	                var name=lib.inpile[i];
	                var type=get.type(name);
	                if(type!="xjzh_danyao"&&type!="equip") list.push(name);
	            }
	    	    if(!list.length) return;
	    	    var next=player.chooseButton(['〖玄变〗：选择至多牌名不一致的牌，先选的牌被替换',[list,'vcard']])
	    	    next.set('ai',function(button){
			        var card={name:button.link[2]};
			        return 12-get.value(card);
	    	    });
	    	    next.set('complexSelect',true);
	    	    next.set('selectButton',[2,2]);
                next.set('filterButton',function(button){
                    if(!ui.selected.buttons.length) return true;
                    var selected=ui.selected.buttons;
                    for(var i of selected){
                        if(button.link[2]==i.link[2]) return false;
                    };
                    return true;
                });
                "step 1"
                if(result.links){
                    var card=result.links[0][2];
                    var card2=result.links[1][2];
                    game.xjzh_replaceCard(card,card2);
				    player.logSkill("xjzh_zengyi_xuanbian");
                    game.log(player,"将牌堆所有的","#y〖"+get.translation(result.links[0][2])+"〗","替换为了","#y〖"+get.translation(result.links[1][2])+"〗");
                }
			},
		},
		"xjzh_zengyi_moran":{
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"墨",
			intro:{
				name:"墨染",
				content:"使用黑色牌无法被其他角色响应",
			},
			trigger:{
			    player:"useCardToPlayered",
			},
			filter(event,player){
			    return get.color(event.card)=="black";
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_moran",trigger.target);
			    trigger.getParent().directHit.add(trigger.target);
			},
			ai:{
			    directHit_ai:true,
			},
		},
		"xjzh_zengyi_shenghua":{
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"升",
			intro:{
				name:"升华",
				content:"造成属性伤害+1",
			},
			trigger:{
			    source:"damageBegin1",
			},
			filter(event,player){
			    return game.hasNature(event);
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_shenghua",player);
			    trigger.num++
			},
		},
		"xjzh_zengyi_chaoti":{
			mark:true,
			marktext:"超",
			intro:{
				name:"超体",
				content:"使用牌无距离和次数限制",
			},
		    mod:{
			    cardUsable(card,player,num){
				    if(card.name=='sha'||card.name=='jiu') return Infinity;
			    },
			    targetInRange(card,player,target,now){
			        return true;
			    },
		    },
			direct:true,
			locked:true,
			priority:9,
			unique:true,
		    trigger:{player:'useCard1'},
		    filter:function(event,player){
		        return (event.card.name=='sha'||event.card.name=='jiu')&&player.countUsed('sha',true)>1&&event.getParent().type=='phase';
	        },
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_chaoti",player);
	        },
	        ai:{
		        unequip:true,
		        skillTagFilter(player,tag,arg){
			        if(!get.zhu(player,'shouyue')) return false;
			        if(arg&&(arg.name=='sha'||arg.name=='jiu')) return true;
			        return false;
		        }
	        }
		},
		"xjzh_zengyi_jinghong":{
			trigger:{
				player:["phaseDiscardBegin","phaseJudgeBegin"],
			},
			filter(event,player){
			    if(event.name=="phaseDiscard") return player.needsToDiscard();
				return player.countCards('j');
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"惊",
			intro:{
				name:"惊鸿",
				content:"跳过弃牌阶段和判定阶段",
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_jinghong",player);
				trigger.cancel(null,null,'notrigger');
			},
		},
		"xjzh_zengyi_shefan":{
			trigger:{
				target:'useCardToTargeted',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"蛇",
			intro:{
				name:"蛇幡",
				content:"你成为杀的目标后你与友方各摸一张牌",
			},
			filter(event,player){
				return event.card.name=="sha";
			},
			async content(event,trigger,player){
				let list=player.getFriends(true).sortBySeat();
				player.logSkill("xjzh_zengyi_shefan",list);
				for(let target of list){
					await target.draw();
				}
			},
			ai:{
				effect:{
					target(card,player,target){
						var num=target.getFriends().sortBySeat().length;
						if(card.name=='sha') return [num,0.6];
					},
				},
			},
		},
		"xjzh_zengyi_longfei":{
			trigger:{
				global:'phaseDrawBegin',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"龙",
			intro:{
				name:"龙飞",
				content:"你与友方摸牌阶段摸牌数量+2",
			},
			filter(event,player){
				return player.getFriends(true).includes(event.player);
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_longfei",trigger.player);
				trigger.num+=2
			},
		},
		"xjzh_zengyi_yunchui":{
			trigger:{
				target:'useCardToTargeted',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"云",
			intro:{
				name:"云垂",
				content:"你成为杀的目标时令所有敌方角色弃置一张牌",
			},
			filter(event,player){
				return event.card.name=="sha";
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.countCards("he"));
				if(!list.length) return;
				player.logSkill("xjzh_zengyi_yunchui",list);
				for(let target of list){
					await target.chooseToDiscard("he",true);
				}
			},
			ai:{
				effect:{
					target(card,player,target){
						var num=target.getEnemies().sortBySeat().length;
						if(card.name=='sha') return [num,0.6];
					},
				},
			},
		},
		"xjzh_zengyi_fengyang":{
			trigger:{
				global:'useCardToPlayered',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"风",
			intro:{
				name:"风扬",
				content:"你与友方成为锦囊牌的目标后摸一张牌",
			},
			filter(event,player){
				if(get.type(event.card,"trick")!="trick") return false;
				return player.getFriends(true).includes(event.target);
			},
			async content(event,trigger,player){
				trigger.target.draw();
			},
			ai:{
				effect:{
					target(card,player,target){
						if(get.type(card,"trick")=="trick") return [1,0.6];
					},
				},
			},
		},
		"xjzh_zengyi_dizai":{
			trigger:{
				global:'phaseEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"地",
			intro:{
				name:"地载",
				content:"你与友方回合结束时摸两张牌",
			},
			filter(event,player){
				return player.getFriends(true).includes(event.player);
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_dizai",trigger.player);
				trigger.player.draw(2);
			},
		},
		"xjzh_zengyi_tianfu":{
			trigger:{
				global:'damageBegin',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"天",
			intro:{
				name:"天覆",
				content:"你与友方造成伤害+1",
			},
			filter(event,player){
				if(event.numFixed||event.cancelled) return false;
				return player.getFriends(true).includes(event.source);
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_tianfu",trigger.source);
				trigger.num++
			},
			ai:{
				damageBonus:true,
			},
		},
		"xjzh_zengyi_jiehuo":{
			trigger:{
				player:'phaseEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"火",
			intro:{
				name:"劫火",
				content:"回合结束时随机对场上体力最多的一名敌方造成一点火焰伤害",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.isMaxHp());
				if(!list.length) return;
				let target=list.randomGet();
				target.damage(1,"fire",player);
				player.logSkill("xjzh_zengyi_jiehuo",target);
			},
		},
		"xjzh_zengyi_xuanbing":{
			trigger:{
				player:'phaseBefore',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"冰",
			intro:{
				name:"玄冰",
				content:"回合开始时令一名随机敌方角色弃置两张牌",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.countCards("he"));
				if(!list.length) return;
				let target=list.randomGet();
				target.chooseToDiscard("he",2,true);
				player.logSkill("xjzh_zengyi_xuanbing",target);
			},
		},
		"xjzh_zengyi_jifeng":{
			trigger:{
				player:['phaseEnd','phaseBegin'],
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"疾",
			intro:{
				name:"疾风",
				content:"回合开始/结束时你可以视对一名攻击范围内的敌方角色使用一张不计入次数的杀",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.inRangeOf(player));
				if(!list.length) return;
				player.chooseUseTarget({name:'sha'},list,false).set('addCount',false).set('prompt',"选择一名角色视为对其使用一张杀").set('ai',(card,target,player)=>{
					return get.damageEffect(target,player,player);
				});
			},
		},
		"xjzh_zengyi_jinglei":{
			trigger:{
				player:'phaseEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"雷",
			intro:{
				name:"惊雷",
				content:"回合结束时随机对场上体力最少的一名敌方造成一点雷电伤害",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.isMinHp());
				if(!list.length) return;
				let target=list.randomGet();
				target.damage(1,"thunder",player);
				player.logSkill("xjzh_zengyi_jinglei",target);
			},
		},
		"xjzh_zengyi_lieshi":{
			trigger:{
				player:'phaseBegin',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"石",
			intro:{
				name:"裂石",
				content:"回合开始时令一名敌方角色弃置所有装备牌",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat().filter(target=>target.countCards('e'));
				if(list.length){
    				const [bool,links]=await player.chooseButton(ui.create.dialog('〖裂石〗：选择一名角色弃置其所有装备牌',list)).set('ai',button=>{
    					return -get.attitude(player,button.link);
    				}).forResult('bool','links');
    				if(links&&bool){
    					player.logSkill("xjzh_zengyi_lieshi",links[0]);
    					links[0].discard(links[0].getCards('e'));
					}
				}
			},
		},
		"xjzh_zengyi_lingxu":{
			trigger:{
				player:'phaseEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"灵",
			intro:{
				name:"灵虚",
				content:"回合结束时随机令场上体力最少的一名友方回复一点体力",
			},
			async content(event,trigger,player){
				let list=player.getFriends(true).sortBySeat().filter(target=>target.isMinHp());
				if(!list.length) return;
				let target=list.randomGet();
				target.recover();
				player.logSkill("xjzh_zengyi_lingxu",target);
			},
		},
		"xjzh_zengyi_lianyu":{
			trigger:{
				player:'phaseEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"炼",
			intro:{
				name:"炼狱",
				content:"回合结束时场上所有敌方失去一点体力",
			},
			async content(event,trigger,player){
				let list=player.getEnemies().sortBySeat();
				player.logSkill("xjzh_zengyi_lianyu",list);
				for(let target of list){
					await target.loseHp();
				}
			},
		},
		"xjzh_zengyi_raoliang":{
			trigger:{
				global:'turnOverBegin',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"梁",
			intro:{
				name:"绕梁",
				content:"你与友方无法被翻面",
			},
			filter(event,player){
				return player.getFriends(true).includes(event.player);
			},
			async content(event,trigger,player){
				player.logSkill("xjzh_zengyi_raoliang",trigger.player);
				if(!trigger.player.isTurnedOver()){
					trigger.cancel(null,null,'notrigger');
				}else{
					trigger.player.turnOver(false);
				}
			},
		},
		"xjzh_zengyi_difu":{
			trigger:{
				global:['gameDrawBegin','dieAfter'],
				player:"enterGame",
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"地",
			intro:{
				name:"地缚",
				content:"你的下家敌方角色非锁定技失效",
			},
			filter(event,player){
				var next=player.getNext();
				if(next){
					return !next.hasSkill("fengyin")&&next.isEnemiesOf(player);
				}
				return false;
			},
			async content(event,trigger,player){
				let next=player.getNext();
				if(next){
					if(!next.hasSkill("fengyin")&&next.isEnemiesOf(player)){
						next.addSkill("fengyin");
					}
				}
			},
		},
		"xjzh_zengyi_tianze":{
			trigger:{
				global:['phaseZhunbeiBegin','dieAfter'],
				player:"enterGame",
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"天",
			intro:{
				name:"天择",
				content:"你的上家敌方角色非锁定技失效",
			},
			filter(event,player){
				var previous=player.getPrevious();
				if(previous){
					return !previous.hasSkill("fengyin")&&previous.isEnemiesOf(player);
				}
				return false;
			},
			async content(event,trigger,player){
				let previous=player.getPrevious();
				if(previous){
					if(!previous.hasSkill("fengyin")&&previous.isEnemyOf(player)){
						previous.addSkill("fengyin");
					}
				}
			},
		},
		"xjzh_zengyi_zhangyi":{
			trigger:{
				player:'phaseBegin',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"义",
			intro:{
				name:"仗义",
				content:"你的回合开始时，弃置所有友方角色判定区的牌",
			},
			async content(event,trigger,player){
				let list=player.getFriends(true).sortBySeat().filter(target=>target.countCards('j'));
				if(!list.length) return;
				player.logSkill("xjzh_zengyi_zhangyi",list);
				for(let target of list){
				    target.discard(target.getCards("j"));
				}
			},
		},
		"xjzh_zengyi_tunshi":{
			trigger:{
				global:'dieEnd',
			},
			direct:true,
			locked:true,
			priority:9,
			unique:true,
			mark:true,
			marktext:"吞",
			intro:{
				name:"吞噬",
				content:"其他角色死亡后，你获得其所有技能",
			},
			filter(event,player){
				return event.player!=player;
			},
			async content(event,trigger,player){
				let skills=trigger.player.skills.slice(0);
				for(let skill of skills){
					let info=get.info(skill);
					if(lib.translate[skill]&&lib.translate[skill+'_info']&&!info.sub){
						player.addSkill(skill);
					}
				}
				player.logSkill("xjzh_zengyi_tunshi",trigger.player);
			},
		},
		// ---------------------------------------通用技能------------------------------------------//
		"xjzh_tongyong_viewHandCards":{
			locked:true,
			charlotte:true,
			unique:true,
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
		"xjzh_tongyong_baiban":{
			inherit:'baiban',
			skillBlocker:function(skill,player){
				if(!player.storage['xjzh_tongyong_baiban'].includes(skill)) return false;
				return !lib.skill[skill].charlotte;
			},
			init:function(player,skill){
				if(!player.storage[skill]) player.storage[skill]=[];
				player.addSkillBlocker(skill);
			},
			onremove:function(player,skill){
				player.removeSkillBlocker(skill);
				delete player.storage[skill];
			},
			intro:{
				content:function(storage,player,skill){
					var list=player.getSkills(null,false,false).filter(function(i){
						return lib.skill.xjzh_tongyong_baiban.skillBlocker(i,player);
					});
					if(list.length) return '失效技能：'+get.translation(list);
					return '无失效技能';
				},
			},
		},

	},
	translate:{
		"xjzh_zengyi_pianxian":"翩跹",
	    "xjzh_zengyi_zhuanpo":"转魄",
		"xjzh_zengyi_daoge":"倒戈",
		"xjzh_zengyi_chongsu":"重塑",
		"xjzh_zengyi_shunying":"瞬影",
		"xjzh_zengyi_fengyue":"风月",
		"xjzh_zengyi_hunqian":"魂牵",
		"xjzh_zengyi_mengdie":"梦蝶",
		"xjzh_zengyi_poxiao":"破晓",
		"xjzh_zengyi_shuangsheng":"双生",
		"xjzh_zengyi_xuanbian":"玄变",
		"xjzh_zengyi_moran":"墨染",
		"xjzh_zengyi_shenghua":"升华",
		"xjzh_zengyi_chaoti":"超体",
		"xjzh_zengyi_jinghong":"惊鸿",
		"xjzh_zengyi_shefan":"蛇幡",
		"xjzh_zengyi_longfei":"龙飞",
		"xjzh_zengyi_yunchui":"云垂",
		"xjzh_zengyi_fengyang":"风扬",
		"xjzh_zengyi_dizai":"地载",
		"xjzh_zengyi_tianfu":"天覆",
		"xjzh_zengyi_jiehuo":"劫火",
		"xjzh_zengyi_xuanbing":"玄冰",
		"xjzh_zengyi_jifeng":"疾风",
		"xjzh_zengyi_jinglei":"惊雷",
		"xjzh_zengyi_lieshi":"裂石",
		"xjzh_zengyi_lianyu":"炼狱",
		"xjzh_zengyi_raoliang":"绕梁",
		"xjzh_zengyi_difu":"地缚",
		"xjzh_zengyi_tianze":"天择",
		"xjzh_zengyi_zhangyi":"仗义",
		"xjzh_zengyi_tunshi":"吞噬",
	},
};