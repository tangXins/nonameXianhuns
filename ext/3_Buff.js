"use strict";
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	//现在定义新的BUFF时，在lib.xjzhBUFF中请不要加前缀xjzh_buff_
	lib.xjzhBUFF={
	    ///增益
	    "qianggu":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_qianggu.png>`,
			intro:{
				name:"强固",
				content:"「<font color=yellow>生命固有</font>」<br><li>自然衰减：<b>是</b> 上限：角色体力上限<br><li>当你的强固体力值不小于你的体力值时，你有20%几率防止伤害，强固的体力值不能超过体力上限。",
			},
			trigger:{
				player:["damageBegin1"],
			},
			silent:true,
			priority:3,
			filter(event,player){
			    let num=get.xjzhBUFFNum(player,"qianggu");
			    if(num>=player.hp) return Math.random()<=0.2;
			    return false;
			},
			async content(event,trigger,player){
			    trigger.cancel(null,null,'notrigger');
			},
			ai:{
			    effect:{
					target(card,player,target){
					    if(!target.hasFriend()) return;
						if(get.tag(card,'damage')){
							let num=get.xjzhBUFFNum(player,"qianggu");
							if(num>=player.hp) return [0.2,0.2]
						}
					},
				},
			},
			xjzhBuffInfo:{
				naturalLose:true,
				limit(){
				    let player=_status.event.player;
				    return player.maxHp;
				},
			},
	    },
		"criticalstrikes":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_criticalstrikes.png>`,
			intro:{
				name:"暴击球",
				content:"「<font color=yellow>暴击增益</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>每个暴击球令你获得+20%<a style='color:#FF0000' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baoji');\">暴击</a>几率",
			},
			trigger:{
				source:["damageBegin1"],
			},
			silent:true,
			priority:3,
			init:function(player){
			    if(get.playerName(player,"xjzh_poe_chuxing")){
			        if(!player.storage.xjzh_buff_criticalstrike) player.storage.xjzh_buff_criticalstrike=0
			        if(!player.storage.xjzh_buff_criticalstrikeDamage) player.storage.xjzh_buff_criticalstrikeDamage=2
			        player.storage.xjzh_buff_criticalstrike=get.xjzhBUFFNum(player,"criticalstrike")*20;
			    }
			},
			onremove:function(player){
			    if(!get.playerName(player,"xjzh_poe_chuxing")){
			        if(player.storage.xjzh_buff_criticalstrike) delete player.storage.xjzh_buff_criticalstrike;
			        if(player.storage.xjzh_buff_criticalstrikeDamage) delete player.storage.xjzh_buff_criticalstrikeDamage;
			    }
			},
			filter:function (event,player){
			    var list=["xjzh_poe_chuxing"]
			    var names=[]
			    var num=0
			    if(player.name) names.push(player.name);
			    if(player.name1) names.push(player.name1);
			    if(player.name2) names.push(player.name2);
			    for(var i=0;i<names.length;i++){
			        for(var j=0;i<list.length;j++){
			            if(names[i]==list[j]){
			                num++
			                break;
			            }
			        }
			    }
			    if(num==0) return false;
			    if(get.xjzhBUFFNum(player,"criticalstrike")==0) return false;
				return event.num>0||!event.cancelled;
			},
			content:function (){
			    game.xjzh_Criticalstrike(player,trigger.num);
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,0.2],
					randomPower:2,
				},
				limit:function(){
				    var player=_status.event.player;
				    if(get.playerName(player,'xjzh_poe_chuxing')&&player.hasSkill('xjzh_poe_canbao')) return 5;
				    return 3;
				},
			},
		},

		///减益
		"zhongdu":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_zhongdu.png>`,
			intro:{
				name:"中毒",
				content:"「<font color=yellow>毒素缠身</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>使用牌有30%几率失效且有几率受到1点无来源毒属性伤害，每层中毒使该几率提高10%",
			},
			trigger:{
				player:["useCard"],
			},
			silent:true,
			priority:3,
			filter:function (event,player){
				if(get.xjzhBUFFNum(player,"zhongdu")==0) return false;
				return true;
			},
			content:function (){
			    var num=get.xjzhBUFFNum(player,"zhongdu")*0.1;
			    if(Math.random()<=0.3*(num+1)) trigger.cancel();
			    if(Math.random()<=Math.random()) player.damage(1,'nocard','nosource','poison');
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[-0.2,0.2],
					randomPower:3,
				},
				limit:function(){
				    var player=_status.event.player;
				    if(get.playerName(player,'xjzh_boss_duruier')) return 0;
				    return 3;
				},
			}
		},
		"binghuan":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_binghuan.png>`,
			intro:{
				name:"冰缓",
				content:"「<font color=yellow>冰霜缓速</font>」<br><li>自然衰减：<b>是</b> 上限：1<br><li>你的出牌时间基数改为10秒，每有一层冰缓，该时间减少50%(乘算)",
			},
			trigger:{
				player:["phaseUseBegin","changexjzhBUFFEnd"],
			},
			silent:true,
			priority:3,
			filter:function (event,player){
				if(get.xjzhBUFFNum(player,"binghuan")==0) return false;
				if(event.player.isMad()) return false;
				//return get.xjzhBUFFName(event.buff,false)=='binghuan'&&event.naturalLose==true;
				return true;
			},
			async content(event,trigger,player){
				if(trigger.name=="phaseUse"||trigger.name=="changexjzhBUFF"){
					let num=get.xjzhBUFFNum(player,"binghuan"),time=10;
					do{
						num--;
						time*=0.5;
					}while(num>0);
					game.broadcastAll(player=>{
						player.forceCountChoose={phaseUse:time};
					},player);
					player.addSkill(['xjzh_buff_binghuan_use','xjzh_buff_binghuan_cancel']);
				}
			},
			subSkill:{
				use:{
					trigger:{player:'useCard'},
					charlotte:true,
					silent:true,
					popup:false,
					filter(event,player){
						if(!player.forceCountChoose||!player.forceCountChoose.phaseUse){
							return false;
						}
						return true;
					},
					async content(event,trigger,player){
						let num=get.xjzhBUFFNum(player,"binghuan"),time=1;
						switch(lib.config.game_speed){
							case "vslow":
								time*=2.5;
								break;
							case "slow":
								time*=1.5;
								break;
							case "fast":
								time*=0.7;
								break;
							case "vfast":
								time*=0.4;
								break;
							case "vvfast":
								time*=0.2;
								break;
						}
						do{
							num--;
							time*=1.5;
						}while(num>0);
						if(player.forceCountChoose.phaseUse<=1){
							let evt=event.getParent('phaseUse');
							if(evt) evt.skipped=true;
						}else{
							game.broadcastAll(player=>{
								player.forceCountChoose.phaseUse-=1+Math.round(time);
							},player);
						}
					},
				},
				cancel:{
				    trigger:{player:'phaseUseEnd'},
					priority:50,
					silent:true,
					charlotte:true,
					async content(event,trigger,player){
						game.broadcastAll(player=>{
							delete player.forceCountChoose;
						},player);
						//ui.auto.show();
						player.removeSkill('xjzh_buff_binghuan_use');
						player.removeSkill('xjzh_buff_binghuan_cancel');
					}
				}
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,0.2],
					randomPower:2,
				},
				limit:1,
				buffReject:["ranshao"],
			}
		},
		"gandian":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_gandian.png>`,
			intro:{
				name:"感电",
				content:"「<font color=yellow>雷电衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>任意角色对你造成伤害有每层20%几率+1",
			},
			trigger:{
				player:["damageBegin"],
			},
			silent:true,
			priority:3,
			filter:function (event,player){
				var num=get.xjzhBUFFNum(player,"gandian");
				if(get.xjzhBUFFNum(player,"gandian")==0) return false;
				//return get.xjzhBUFFName(event.buff,false)=='binghuan'&&event.naturalLose==true;
				return Math.random()<=num*0.2;
			},
			content:function (){
				trigger.num++
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,0.2],
					randomPower:3,
				},
				limit:3,
			}
		},
		"ranshao":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_ranshao.png>`,
			intro:{
				name:"燃烧",
				content:"「<font color=yellow>火焰衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>基于你所受到的火焰伤害令你额外受到火焰伤害，每当buff衰减时，受到一点无来源火焰伤害",
			},
			trigger:{
				player:["damageAfter"],
			},
			silent:true,
			priority:3,
			group:["xjzh_buff_ranshao_shuaijian"],
			filter:function (event,player){
				if(get.xjzhBUFFNum(player,"ranshao")==0) return false;
				//return get.xjzhBUFFName(event.buff,false)=='binghuan'&&event.naturalLose==true;
				if(event.getParent("xjzh_buff_ranshao").name=="xjzh_buff_ranshao") return false;
				if(event.getParent("xjzh_buff_ranshao_shuaijian").name=="xjzh_buff_ranshao_shuaijian") return false;
				return event.num>0;
			},
			content:function (){
			    var num=get.xjzhBUFFNum(player,"ranshao")
				player.damage(Math.floor(num*1.3*trigger.num,trigger.source,'fire','nocard'));
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,1.3],
					randomPower:3,
				},
				limit:3,
				buffReject:["binghuan"],
			},
			subSkill:{
			    "shuaijian":{
			        trigger:{
			            player:"changexjzhBUFFBegin1",
			        },
			        direct:true,
			        sub:true,
			        filter:function(event,player){
			            if(get.xjzhBUFFNum(player,"ranshao")==0) return false;
			            return event.num<0;
			        },
			        content:function(){
			            player.damage(1,'fire','nocard','nosource');
			        },
			    },
			},
		},
		"bingdong":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_bingdong.png>`,
			intro:{
				name:"冰冻",
				content:"「<font color=yellow>冰霜衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：1<br><li>当你获得此buff时，弃置所有牌，然后直到此buff移除，你无法使用或打出牌",
			},
			trigger:{
				player:["changexjzhBUFFAfter"],
			},
			silent:true,
			priority:3,
			mod:{
			    cardEnabled:function(card,player){
					if(get.xjzhBUFFNum(player,"bingdong")>0) return false;
				},
			    cardEnabled2:function(card,player){
					if(get.xjzhBUFFNum(player,"bingdong")>0) return false;
				},
				cardRespondable:function(card,player){
					if(get.xjzhBUFFNum(player,"bingdong")>0) return false;
				},
			},
			filter:function (event,player){
			    if(event.num<=0) return false;
				return player.countCards('hej');
			},
			content:function (){
			    player.discard(player.getCards('hej'));
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,1],
					randomPower:1,
				},
				limit:1,
			},
		},
		"mumang":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_mumang.png>`,
			intro:{
				name:"目盲",
				content:"「<font color=yellow>视力衰弱</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>你使用牌有每层30%几率改为随机目标",
			},
		    trigger:{
		        player:"useCardToPlayer",
		    },
		    silent:true,
		    priority:3,
		    filter:function(event,player){
		        var num=get.xjzhBUFFNum(player,'mumang');
		        if(!event.isFirstTarget) return false;
		        if(!event.target||event.targets) return false;
		        if(!event.cards||!event.cards.length) return false;
		        return Math.random<=num*3/10;
		    },
		    content:function(){
		        var type=get.type(trigger.card);
		        if(type=="delay"){
		            var targets=game.filterPlayer(function(current){
		                return !current.countCards('j',function(card){
		                    return get.name(trigger.card)==get.name(card);
		                });
		            }).randomGet();
		        }else{
		            var targets=game.players.randomGet();
		        }
		        trigger.targets.remove(trigger.target);
		        trigger.targets.push(targets);
		        game.log(player,"因","#y目盲","影响",trigger.card,"的目标指向了",targets);
		    },
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,0.3],
					randomPower:3,
				},
				limit:3,
			},
		},
		"yishang":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_yishang.png>`,
			intro:{
				name:"易伤",
				content:"「<font color=yellow>衰弱体质</font>」<br><li>自然衰减：<b>是</b> 上限：3<br><li>受到伤害有30%乘层数几率加层数点伤害",
			},
		    trigger:{
		        player:"damageBegin",
		    },
		    silent:true,
		    priority:3,
		    filter:function(event,player){
		        var num=get.xjzhBUFFNum(player,'yishang');
		        if(event.cancelled||event.numFixed||num==0) return false;
		        return Math.random<=num*3/10;
		    },
		    content:function(){
		        var numx=get.xjzhBUFFNum(player,'yishang');
		        trigger.num+=numx
		        game.log(player,"因","#y易伤","影响",trigger.card,"造成的伤害+",numx);
		    },
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,0.3],
					randomPower:3,
				},
				limit:3,
			},
		},
		"jiansu":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_jiansu.png>`,
			intro:{
				name:"减速",
				content:"「<font color=yellow>蹒跚而行</font>」<br><li>自然衰减：<b>是</b> 上限：4<br><li>你的攻击距离减少buff层数",
			},
			mod:{
				attackRange:function(from,to,distance){
				    var player=_status.event.player;
					var num=get.xjzhBUFFNum(player,'jiansu');
					return distance-num;
				}
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,1],
					randomPower:3,
				},
				limit:4,
			},
		},
		"dingshen":{
			marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/buff/xjzh_icon_buff_dingshen.png>`,
			intro:{
				name:"定身",
				content:"「<font color=yellow>寸步难行</font>」<br><li>自然衰减：<b>是</b> 上限：4<br><li>你计算与其他角色距离增加buff层数",
			},
			mod:{
				globalFrom:function(from,to,distance){
				    var player=_status.event.player;
					var num=get.xjzhBUFFNum(player,'jiansu');
					return distance-num;
				}
			},
			xjzhBuffInfo:{
				naturalLose:true,
				buffRank:{
					random:[0,1],
					randomPower:3,
				},
				limit:4,
			},
		},
		/*新buff创建模板
		//「」
		"BUFF名称":{
	    	marktext:"<img style=width:"+(lib.config.extension_十周年UI_newDecadeStyle?"15px":"26px")+" 	src="+lib.assetURL+"extension/仙家之魂/xjzh_icon_buff_xxxx.png>",
	    	intro:{
    	    	name:"BUFF名称翻译",
	    	    content:"BUFF描述",（BUFF名称翻译和描述现在与这里挂钩）
	    	},
	    	trigger:{

	    	},
    		forced:true,
	    	silent:true,
    		priority:3,//这三项是默认的。//PS:别再写奇奇怪怪的优先度了好吗
		    filter:function (event,player){
	        	if(get.xjzhBUFFNum(player,"_xjzh_buff_BUFF名称")==0) return false;
	        },
	    	content:function (){

	    	},
    		xjzhBuffInfo:{
		        naturalLose:（是否为自然衰减类buff，不是可省略此句或填false）,
		        buffRank:{
		            basic:[0,0],（这里写不受层数影响的收益）
		            random:[0,0],（这里写受层数和随机数影响的收益，结果值填概率）
		            randomPower:0,（这里写倍率，与上面random挂钩）
		            add:[0,0],（这里写受层数影响的收益，结果值不需取整）
		        },（第一个数为正收益，第二个为负收益。PS:基本收益论：一牌1收益，一血2收益）
		        buffReject:[],（与之冲突的BUFF，在附加时若有与之冲突的BUFF，则会先削减冲突的BUFF）
		    }
		},
		*/
	};
	var xjzhBuff_init=function(){
		for(var i in lib.xjzhBUFF){
			var buff=lib.xjzhBUFF[i];
			var name='xjzh_buff_'+i;
			/*
			if(name.indexOf('xjzh_buff_')==-1){
			name='xjzh_buff_'+name;
			}
			*/
			lib.skill[name]=buff;
			lib.translate[name]=buff.intro.name;
			lib.translate[name+'_name']=buff.intro.name;
			lib.translate[name+'_name_info']=buff.intro.content;
		}
	};
	xjzhBuff_init();
	/*
	这里请注意，buff现在有三个名称：
	①在lib.xjzhBUFF中的是“BUFF名”
	②BUFF对应的技能名是“xjzh_buff_BUFF名”
	③在技能引用的时候是“xjzh_buff_BUFF名_name”

	不过不用担心，在使用下述方法时，所有方法都会用到get.xjzhBUFFName，
	以便对你写的BUFF名称进行转化，所以在使用的时候，①和②这两种写法可以混用
	具体支持的写法类型请看下面的注释
	*/
	//以下代码借鉴自【时空枢纽】，感谢【时空枢纽】作者鸽尔赞
	lib.translate["_naturalLosexjzhBUFF"]="自然衰减";
	lib.skill["_naturalLosexjzhBUFF"]={
		trigger:{
			player:"phaseAfter",
		},
		direct:true,
		firstDo:true,
		priority:Infinity,
		silent:true,
		content:function (){
			for(var i in lib.xjzhBUFF){
				var buffName=get.xjzhBUFFName(i);
				var info=lib.skill[buffName].xjzhBuffInfo;
				if(info.naturalLose&&get.xjzhBUFFNum(player,buffName)>0){
					game.changexjzhBUFF(player,buffName,-1,'naturalLose');
				}
			}
		}
	};
	//获取BUFF的代码名（除这里之外一般用不上）
	//现在支持的写法：_xjzh_buff_BUFF名、BUFF名、xjzh_buff_BUFF名
	get.xjzhBUFFName=function(name,iscomplete){
		if(typeof name!='string') return;
		var buff=name;
		if(buff.indexOf('_')==0) buff=buff.slice(1);
		if(iscomplete!==false){
			if(buff.indexOf('xjzh_buff_')==-1) buff='xjzh_buff_'+buff;
		}
		else{
			if(buff.indexOf('xjzh_buff_')==0) buff=buff.replace('xjzh_buff_','');
		}
		return buff;
	};
	//获取BUFF的层数
	get.xjzhBUFFNum=function(player,name){
		var buff=get.xjzhBUFFName(name);
		if(!player.storage[buff]||player.storage[buff]<=0) return 0;
		return player.storage[buff];
	};
	//获取BUFF的rank值（给ai判断用）
	get.xjzhBUFFRank=function(player,name,income,plies){
		name=get.xjzhBUFFName(name,false);
		var buff=get.xjzhBUFFName(name);
		var list=[lib.skill[buff].xjzhBuffInfo.buffRank];
		player.getSkills(null,false,false).filter(function(i){
			if(lib.skill[i]&&lib.skill[i].ai&&lib.skill[i].ai.buffRank_extra&&
			lib.skill[i].ai.buffRank_extra[name]){
				list.push(lib.skill[i].ai.buffRank_extra[name]);
			}
		});
		if(!plies||typeof plies!='number'){
			if(income&&typeof income=='number') plies=income;
			else plies=get.xjzhBUFFNum(player,buff);
		}
		var num=0;
		for(let i=0;i<list.length;i++){
			var rank=list[i];
			if(list[i].immunity===true){
				return 0;
			}
			if(income!==false){
				if(rank.basic) num+=rank.basic[0];
				if(rank.add) num+=rank.add[0]*plies;
				var random2=1;
				if(rank.randomPower){
					if(Array.isArray(rank.randomPower)) random2=rank.randomPower[0];
					else random2=rank.randomPower;
				}
				if(rank.random) num+=Math.min(1,rank.random[0]*plies)*random2;
			}
			if(income!==true){
				if(rank.basic) num-=rank.basic[1];
				if(rank.add) num-=rank.add[1]*plies;
				var random2=1;
				if(rank.randomPower){
					if(Array.isArray(rank.randomPower)) random2=rank.randomPower[1];
					else random2=rank.randomPower;
				}
				if(rank.random) num-=Math.min(1,rank.random[1]*plies)*random2;
			}
		}
		if(income===false) return -num;
		return num;
	};
	/*技能中对buffrank的影响赋值写法例：
	xjzh_xxx:{
	ai:{
	buffRank_extra:{
	"diaoling":{
	basic:[0,-0.5],
	add:[1,0]
	}
	}
	}
	}
	*/
	//获取目标角色已有的BUFF种类（可设置过滤filter）
	get.xjzhBUFFList=function(player,filter){
		var list=[];
		for(var i in lib.xjzhBUFF){
			var buff=get.xjzhBUFFName(i);
			if(get.xjzhBUFFNum(player,buff)==0) continue;
			if(filter&&typeof filter=='function'){
				if(filter(player,buff)==true) list.push(buff);
				continue;
			}
			list.push(buff);
		}
		return list;
	};
	//获取BUFF的信息info，该信息与角色无关，会且只会从lib.xjzhBUFF中调取信息。
	/*
	目前来说，有以下几项信息是需要特别注意的：
	limit为BUFF的层数上限，无则视为无限
	buffReject为与之冲突的BUFF
	*/
	get.xjzhBUFFInfo=function(name,filter){
		var buff=get.xjzhBUFFName(name,false);
		var info;
		if(lib.xjzhBUFF[buff]) info=lib.xjzhBUFF[buff].xjzhBuffInfo;
		else return null;
		if(!filter) return info;
		if(filter=='buffReject'){
			if(!info.buffReject) return [];
		}
		else if(filter=='limit'){
		    if(typeof info[filter]=="function"){
		        return info[filter]();
		    }
			else if(!info.limit) return Infinity;
		}
		return info[filter];
	};
	//更改（增加或减少）目标角色BUFF的层数
	//层数不填默认为“增加1层”
	game.changexjzhBUFF=function(){
		var next=game.createEvent('changexjzhBUFF');
		for(let i=0;i<arguments.length;i++){
			if(get.itemtype(arguments[i])=='player'){
				next.player=arguments[i];
			}else if(typeof arguments[i]=='string'){
				if(['naturalLose','isReject'].includes(arguments[i])){
					next[arguments[i]]=true;
				}else{
					next.buff=get.xjzhBUFFName(arguments[i]);
				}
			}else if(typeof arguments[i]=='number'&&!next.num){
				next.num=arguments[i];
			}
			else if(typeof arguments[i]=='boolean'&&arguments[i]===true){
			    next.noLimit=true;
			}
		}
		if(!next.noLimit) next.noLimit=false;
		if(!next.num) next.num=1;
		next.setContent(function(){
			"step 0"
			if(this.isReject){
				event.goto(3);
			}else{
				this.trigger('changexjzhBUFFBegin1');//事件开始，取消事件的地方
			}
			"step 1"
			this.trigger('changexjzhBUFFBegin2');//事件开始，修改事件参数的地方
			"step 2"
			if(!lib.xjzhBUFF[get.xjzhBUFFName(this.buff,false)]){
				event.finish();
			}else if(this.num<=0){
				event.goto(3);
			}else{
				var reject=get.xjzhBUFFInfo(this.buff,'buffReject');
				if(reject.length&&this.num>0){
					for(var i=0;i<reject.length;i++){
						var num2=get.xjzhBUFFNum(this.player,reject[i]);
						if(!num2) continue;
						game.changexjzhBUFF(this.player,reject[i],-this.num,'isReject');
						this.num-=num2;
						if(this.num<=0){
							event.goto(4);
							break;
						}
					}
				}
			}
			"step 3"
			if(this.num!=0){
				var buff=this.buff;
				var num=this.num;
				var tip1;
				if(this.num>0){
					if(!this.player.storage[buff]){
						this.player.storage[buff]=0;
						tip1='附加了';
					}else{
						tip1='增加了';
					}
					if(this.noLimit){
					    if(get.xjzhBUFFInfo(buff,'limit')==0) num=0;
					}else{
					    num=Math.min(get.xjzhBUFFInfo(buff,'limit')-this.player.storage[buff],num);
					}
				}else{
					if(this.naturalLose==true){
						tip1='自然减少了';
					}else{
						tip1='移除了';
					}
					num=-Math.min(this.player.storage[buff],-num);
				}
				this.player.storage[buff]+=num;
				this.player.syncStorage(buff);
				if(this.player.storage[buff]>0){
					player.addAdditionalSkill('xjzh_buff',buff,true);
					this.player.markSkill(buff);
				}else{
					player.removeAdditionalSkill('xjzh_buff',buff);
					this.player.unmarkSkill(buff);
				}
				game.log(this.player,tip1,Math.abs(num),'层','#y「'+get.translation(buff),'」');
			}
		});
		return next;
	};
	//转化目标角色的buff，请不要将互相冲突的buff互相转化
	game.changexjzhBUFFTo=function(){
		var next=game.createEvent('changexjzhBUFFTo');
		for(let i=0;i<arguments.length;i++){
			if(get.itemtype(arguments[i])=='player'){
				next.player=arguments[i];
			}else if(typeof arguments[i]=='string'){
				if(!next.from){
					next.from=get.xjzhBUFFName(arguments[i]);
				}else{
					next.to=get.xjzhBUFFName(arguments[i]);
				}
			}else if(typeof arguments[i]=='number'){
				if(!next.num1) next.num1=arguments[i];
				else next.num2=arguments[i];
			}
		}
		if(!next.num1) next.num1=1;
		if(next.num1>0) next.num1=-next.num1;
		if(!next.num2) next.num2=-next.num1;
		//num1为被转化掉的buff的变化层数，会自动转化为负数，转化buff的变化层数num2则默认为-num1
		//请不要将num2设定为正数
		next.setContent(function(){
			"step 0"
			this.trigger('changexjzhBUFFBeginTo1');//事件开始，取消事件的地方
			"step 1"
			this.trigger('changexjzhBUFFBeginTo2');//事件开始，修改事件参数的地方
			"step 2"
			if(!lib.xjzhBUFF[get.xjzhBUFFName(event.to,false)]||!lib.xjzhBUFF[get.xjzhBUFFName(event.from,false)]||event.num1==0||event.num2==0){
				event.finish();
			}else if(get.xjzhBUFFNum(player,event.from)+event.num1<0){
				//game.log(player,'的buff转化失败');
				this.trigger('changexjzhBUFFBeginToFailed');
				event.finish();
			}
			"step 3"
			var from=event.from,num1=event.num1;
			var to=event.to,num2=event.num2;
			player.storage[from]+=num1;
			player.syncStorage(from);
			if(player.storage[from]>0){
				player.addAdditionalSkill('xjzh_buff',from,true);
				player.markSkill(from);
			}else{
				player.removeAdditionalSkill('xjzh_buff',from);
				player.unmarkSkill(from);
			}
			var reject=get.xjzhBUFFInfo(to,'buffReject');
			var rejectCost=0;
			if(reject.length&&num2>0){
				for(var i=0;i<reject.length;i++){
					var num3=get.xjzhBUFFNum(player,reject[i]);
					if(!num3) continue;
					if(num3>num2) num3=num2;
					rejectCost+=num3;
					num2-=rejectCost;
					var rejectBuff=get.xjzhBUFFName(reject[i]);
					player.storage[rejectBuff]-=num3;
					player.syncStorage(rejectBuff);
					if(player.storage[rejectBuff]<=0){
						player.removeAdditionalSkill('xjzh_buff',rejectBuff);
						player.unmarkSkill(rejectBuff);
					}
					event.rejectCost=rejectCost;
					if(num2<=0) break;
				}
			}
			if(!player.storage[to]) player.storage[to]=0;
			num2=Math.min(get.xjzhBUFFInfo(to,'limit')-player.storage[to],num2);
			player.storage[to]+=num2;
			player.syncStorage(to);
			if(player.storage[to]>0){
				player.addAdditionalSkill('xjzh_buff',to,true);
				player.markSkill(to);
			}else{
				player.removeAdditionalSkill('xjzh_buff',to);
				player.unmarkSkill(to);
			}
			game.log(player,'的',Math.abs(num1),'层「',from,'」','转化成了',Math.abs(num2),'层「',to,'」');
		});
		return next;
	};
	//方法game.changexjzhBUFF的封装
	lib.element.player.changexjzhBUFF=function(arg1,arg2,arg3){
		return game.changexjzhBUFF(this,arg1,arg2,arg3);
	};
	//方法game.changexjzhBUFFTo的封装
	lib.element.player.changexjzhBUFFTo=function(arg1,arg2,arg3,arg4){
		return game.changexjzhBUFFTo(this,arg1,arg2,arg3,arg4);
	};
	//获得目标角色已有的BUFF种类数目（可设置不算在内的BUFF）
	lib.element.player.countxjzhBUFF=function(except){
		if(Array.isArray(except)){
			for(var i=0;i<except.length;i++){
				except[i]=get.xjzhBUFFName(except[i],false);
			}
		}
		else{
			except=[get.xjzhBUFFName(except,false)];
		}
		var num=0;
		for(let i of lib.xjzhBUFF){
			if(except.includes(i)) continue;
			if(get.xjzhBUFFNum(this,i)>0) num++;
		}
		return num;
	};
	//判断其是否免疫该种BUFF
	lib.element.player.isImmxjzhBUFF=function(name){
		name=get.xjzhBUFFName(name);
		var skills=player.getSkills(null,false,false);
		for(let i of skills){
			if(lib.skill[i]&&lib.skill[i].ai&&
			lib.skill[i].ai.buffRank_extra&&
			lib.skill[i].ai.buffRank_extra[name]){
				if(lib.skill[i].ai.buffRank_extra[name].immunity===true){
					return true;
				}
			}
		}
	};
});