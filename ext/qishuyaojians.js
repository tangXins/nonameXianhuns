"use strict";
window.XJZHimport(function(lib,game,ui,get,ai,_status){
    //部分代码借鉴自《时空枢纽》
	//保存存档到本地

	game.xjzhQishu_saveConfig=function(){
	    "step 0"
	    game.saveConfig('xjzh_qishuyaojians',lib.config.xjzh_qishuyaojians);
	    "step 1"
		var list=JSON.stringify(lib.config.xjzh_qishuyaojians);
		var data="奇术要件存档备份："+list.slice(0);
		game.writeFile(lib.init.encode(data),'extension/仙家之魂/save','奇术要件存档备份.json',function(err){});
	};
	//重置存档
	game.xjzh_resetQishu=function(){
	    "step 0"
	    lib.config.xjzh_qishuyaojians={
	        name:"无名玩家",
	        level:1,
	        exp:0,
	        date:0,
    		bag:[],
    		keys:[],
    		player:{},
    		levelEquip:{},
    		equip:{},
    		tokens:10,
    		suipian:300,
    		cailiao:{
    		    //boss瓦尔申挑战材料
    		    "xjzh_cailiao_enianzhixin":["恶念之心",0,"瓦尔申挑战材料；他的肌肉毫无规律的抽动着。"],
    		    //boss格里高利挑战材料
    		    "xjzh_cailiao_gangtie":["活体钢铁",0,"格里高利挑战材料；似乎是一节拥有生命的钢铁。"],
    		    //boss都瑞尔挑战材料
    		    "xjzh_cailiao_nianyedan":["粘液覆盖的蛋",0,"都瑞尔挑战材料；里面蠕动着一个新生的强大存在。"],
    		    "xjzh_cailiao_kutong":["苦痛碎片",0,"都瑞尔挑战材料；一块破碎的灵魂石，只是拿着他，你的胳膊就隐隐作痛。"],
    		    //boss冰川巨兽挑战材料
    		    "xjzh_cailiao_kongju":["提纯的恐惧",0,"冰川巨兽挑战材料；不反光的墨水，你发现自己敏锐地感知到自己终有一死。"],
    		    //boss齐尔领主挑战材料
    		    "xjzh_cailiao_xianxue":["提纯的鲜血",0,"齐尔领主挑战材料；你几乎能透过玻璃感受到一下心跳。"],
				//安达利尔挑战材料
    		    "xjzh_cailiao_wawa":["针扎娃娃",0,"安达利尔挑战材料；每一针都是复仇的索取。"],
    		    "xjzh_cailiao_jiasuo":["焦沙枷锁",0,"安达利尔挑战材料；牢狱与绞架的天作之合，但愿所有罪人都能带上沉重的铁镣。"],
				//冥狱石
    		    "xjzh_cailiao_mingyushi":["冥狱石",0,"奇术boss强化材料；这块怪石历经漫长岁月的沉淀，喃喃吟诵着古老的亵渎之词。"],
    		    //天堂试炼挑战材料
    		    "xjzh_cailiao_shijieshi":["世界石碎片",0,"天堂试炼挑战材料；世界之石破碎之后散落的碎片。"]
    		},
    	};
    	"step 1"
    	var Name=ui.create.div(ui.window,{
        	zIndex:'1000',
   			left:'0',width:'100%',
        	top:'0',height:'100%'
		});
		var inputDiv=ui.create.div(Name,{
        	left:'50%',top:'30%',
        	transform:'translate(-50%, -50%)',
        	width:'400px',height:'270px',
        	textAlign:'center',
        	backgroundSize:'100%',
        	backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/qishuFiles.png')",
        });
        var input=ui.create.node('input',inputDiv,{
        	top:'110px',left:'80px',
        	position:'absolute',
        	width:'230px',height:'20px',
        	background:'none',borderStyle:'none'
        });
        input.id='xjzh_qishu_filesName';
        var okBtm=ui.create.div(inputDiv,{
        	left:'153px',width:'100px',
        	bottom:'55px',height:'35px',
        },function(){
        	var value=document.getElementById('xjzh_qishu_filesName').value;
        	console.log(value)
        	lib.config.xjzh_qishuyaojians.name=value;
        	game.xjzhQishu_saveConfig();
        	window.xjzhOpenLoading('已创建玩家名称为“'+value+'”的奇术要件存档');
        	Name.delete();
        });
        var cancelBtm=ui.create.div(inputDiv,{
        	right:'35px',width:'25px',
        	top:'42px',height:'25px',
        },function(){
            window.xjzhOpenLoading('你点击了取消，已创建玩家名称为“无名玩家”的奇术要件存档');
        	game.xjzhQishu_saveConfig();
        	Name.delete();
        });
        "step 2"
	    game.xjzhQishu_saveConfig();
	};
	//初始化
	if(!lib.config.xjzh_qishuyaojians){
	    lib.config.xjzh_qishuyaojians={
	        name:"无名玩家",
	        level:1,
	        exp:0,
	        date:0,
    		bag:[],
    		keys:[],
    		player:{},
    		levelEquip:{},
    		equip:{},
    		tokens:10,
    		suipian:300,
    		cailiao:{
    		    //boss瓦尔申挑战材料
    		    "xjzh_cailiao_enianzhixin":["恶念之心",0,"瓦尔申挑战材料；他的肌肉毫无规律的抽动着。"],
    		    //boss格里高利挑战材料
    		    "xjzh_cailiao_gangtie":["活体钢铁",0,"格里高利挑战材料；似乎是一节拥有生命的钢铁。"],
    		    //boss都瑞尔挑战材料
    		    "xjzh_cailiao_nianyedan":["粘液覆盖的蛋",0,"都瑞尔挑战材料；里面蠕动着一个新生的强大存在。"],
    		    "xjzh_cailiao_kutong":["苦痛碎片",0,"都瑞尔挑战材料；一块破碎的灵魂石，只是拿着他，你的胳膊就隐隐作痛。"],
    		    //boss冰川巨兽挑战材料
    		    "xjzh_cailiao_kongju":["提纯的恐惧",0,"冰川巨兽挑战材料；不反光的墨水，你发现自己敏锐地感知到自己终有一死。"],
    		    //boss齐尔领主挑战材料
    		    "xjzh_cailiao_xianxue":["提纯的鲜血",0,"齐尔领主挑战材料；你几乎能透过玻璃感受到一下心跳。"],
				//安达利尔挑战材料
    		    "xjzh_cailiao_wawa":["针扎娃娃",0,"安达利尔挑战材料；每一针都是复仇的索取。"],
    		    "xjzh_cailiao_jiasuo":["焦沙枷锁",0,"安达利尔挑战材料；牢狱与绞架的天作之合，但愿所有罪人都能带上沉重的铁镣。"],
				//冥狱石
    		    "xjzh_cailiao_mingyushi":["冥狱石",0,"奇术boss强化材料；这块怪石历经漫长岁月的沉淀，喃喃吟诵着古老的亵渎之词。"],
    		    //天堂试炼挑战材料
    		    "xjzh_cailiao_shijieshi":["世界石碎片",0,"天堂试炼挑战材料；世界之石破碎之后散落的碎片。"]
    		},
    	};
	};
	game.xjzhQishu_saveConfig();

	//提示创建存档
	lib.arenaReady.push(function(){
	    if(!lib.config.xjzh_qishufilesOnload){
            alert("检测到你更新了仙家之魂游戏版本，此版本添加了新的“奇术要件”功能");
            alert("请你在接下来的提示中输入用户名以创建你的专属存档");
            game.xjzh_resetQishu();
            game.saveConfig("xjzh_qishufilesOnload",true);
        }
	});
	//设置奇术要件装备情况互通的角色
	lib.xjzh_equipHutong=[
		['xjzh_huoying_mingren','xjzh_huoying_liudaomingren'],
		['xjzh_huoying_zuozhu','xjzh_huoying_liudaozuozhu']
	];
	//奇术要件列表
	lib.xjzh_qishuyaojians={
	    "xjzh_qishu_junmao":{
	        translate:"谐角之冠",
			translate_info:"你所有限制回合发动次数的主动技能+2次发动次数。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“这个头饰曾经是一个伪装成宫廷法师的刺客佩戴的。她的背叛行径虽然最终暴露，但在那之前，她已经成功用魔法诅咒了国王和他的整个家族。” - 《阿斯顿家族的陨落》</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*4}碎片`,
			noTranslate:false,
			level:4,
			async init(player){
				let list=player.getSkills(null,false,false).filter(function(skill){
					let info=lib.skill[skill];
					return info&&!info.equipSkill&&!info.cardSkill&&!lib.skill.global.includes(skill)&&info.usable&&typeof info.usable=='number';
				});
				if(!list.length) return;
				for await(let skill of list){
					let info=get.info(skill);
					if(!info.enable||info.enable!="phaseUse") continue;
					let newSkill=skill+"_xiejiaozhiguan";
					if(!lib.skill[newSkill]){
						lib.skill[newSkill]=lib.skill[skill];
						lib.skill[newSkill].usable=info.usable+2;
						lib.translate[newSkill]=get.translation(skill);
						let text=get.translation(skill+"_info");
						lib.translate[newSkill+"_info"]=game.xjzh_updateText(text,2);
						if (lib.dynamicTranslate[skill]) {
							const translates = lib.dynamicTranslate[skill];
							lib.dynamicTranslate[newSkill] = function(player) {
								return game.xjzh_updateText(translates.apply(null, arguments), 2);
							};
						}
					}
					player.changeSkills([newSkill],[skill]);
				}
		    },
			skill:{
				trigger:{
	    	        player:"changeSkillsAfter",
	    	    },
				direct:true,
				locked:true,
				charlotte:true,
				superChocolate:true,
				priority:10,
				filter(event,player){
					return event.addSkill&&event.addSkill.length;
				},
				async content(event,trigger,player){
					let skills=trigger.addSkill;
					for await(let skill of skills){
						let info=get.info(skill);
						if(!info.enable||info.enable!="phaseUse") continue;
						let newSkill=skill+"_xiejiaozhiguan";
						if(!lib.skill[newSkill]){
							lib.skill[newSkill]=lib.skill[skill];
							lib.skill[newSkill].usable=info.usable+2;
							lib.translate[newSkill]=get.translation(skill);
							let text=get.translation(skill+"_info");
							lib.translate[newSkill+"_info"]=game.xjzh_updateText(text,2);
							if (lib.dynamicTranslate[skill]) {
								const translates = lib.dynamicTranslate[skill];
								lib.dynamicTranslate[newSkill] = function(player) {
									return game.xjzh_updateText(translates.apply(null, arguments), 2);
								};
							}
						}
						player.removeSkill(skill);
						player.addSkill(newSkill);
					}
				},
			},
		},
	    "xjzh_qishu_tongkuhushou":{
	        translate:"痛苦吞食者",
		    translate_info:"你使用基本牌造成伤害令其获得等量个“痛”标记；你使用牌对标记的目标造成伤害时，令场上所有被标记的角色受到额外x点伤害，每因此造成一点伤害，你摸一张牌（x为其拥有的标记数量）。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>这副手套以督瑞尔的甲壳碎片制成, 戴着它或被它击中都会导致剧痛, 如同将手插入千万片碎玻璃一样。</font></span>",
			extra:"等阶：4<br><>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：5%<br><br>兑换所需：230碎片",
			noTranslate:false,
			level:4,
			skill:{
				trigger:{
	    	        source:"damageSource",
	    	    },
    		    direct:true,
    			priority:10,
    		    lastDo:true,
				marktext:"痛",
				intro:{
					content:"#",
				},
	   		    filter(event,player,name){
					if(!event.cards||!event.cards.length) return false;
					return !event.numFixed&&!event.cancelled;
	    	    },
	    	    async content(event,trigger,player){
					if(!trigger.player.hasMark("xjzh_qishu_tongkuhushou")){
						if(get.type(trigger.cards[0])=="basic") await trigger.player.addMark("xjzh_qishu_tongkuhushou",trigger.num,false);
					}else{
						let targets=game.filterPlayer(current=>current.hasMark("xjzh_qishu_tongkuhushou"));
						for await(let target of targets){
							target.damage(target.countMark("xjzh_qishu_tongkuhushou"),"nocard",player)._triggered=null;
							target.clearMark("xjzh_qishu_tongkuhushou");
						}
					}
	   		    },
	   		},
		},
	    "xjzh_qishu_jiandun":{
	        translate:"坚毅之盾",
		    translate_info:"当你受到伤害后，你获得等量护甲，此后每个你的回合开始时，若你有护甲，你将一点护甲转为体力上限。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:false,
			level:3,
			skill:{
				trigger:{
	    	        player:["damageAfter","phaseBegin"],
	    	    },
    		    direct:true,
    			priority:10,
    		    lastDo:true,
	   		    filter(event,player,name){
					if(name=="phaseBegin") return player.hujia>0;
					if(name=="damageAfter"&&!event.hujia) return !event.numFixed||!event.cancelled;
	   		        return false;
	    	    },
	    	    async content(event,trigger,player){
					if(trigger.name=="damage"){
						await player.changeHujia(trigger.num);
					}else{
						player.changeHujia(-1);
						player.gainMaxHp();
					}
	   		    },
	   		},
		},
	    "xjzh_qishu_suoding":{
	        translate:"锁定目标",
		    translate_info:"你使用非装备牌和非延时锦囊牌指定目标不小于2时，你可以为此牌重新指定一个目标(需合法)，此牌根据未重新指定目标前的目标数量对其额外生效等量次数。",
			extra:"等阶：4<br><>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：5%<br><br>兑换所需：230碎片",
			noTranslate:false,
			level:4,
			skill:{
				trigger:{
	    	        player:"useCard",
	    	    },
    		    direct:true,
    			priority:10,
    		    lastDo:true,
	   		    filter(event,player){
	   		        if(event.targets.length<2) return false;
	   		        return get.type(event.card)!="delay"&&get.type(event.card)!="equip";
	    	    },
	    	    async content(event,trigger,player){
	    	        const targets=await player.chooseTarget(1,`〖锁定目标〗：为${get.translation(trigger.card)}重新指定一个目标并令其额外结算${trigger.targets.length}次`,(card,player,target)=>{
	    	            return player.canUse(_status.event.card,target,false);
	    	        }).set('ai',target=>{
	    	            let trigger=_status.event.getTrigger();
	    	            let player=get.player();
	    	            return get.effect(target,trigger.card,player,player);
	    	        }).set('card',trigger.card).forResultTargets();
					if(targets){
						let num=trigger.targets.length;
						trigger.targets=targets;
						trigger.effectCount+=num;
						game.log(trigger.card,"额外结算",num,"次");
					}
	   		    },
	   		},
		},
	    "xjzh_qishu_fenlie":{
	        translate:"分裂箭矢",
		    translate_info:"你使用不指定为全部目标的牌可以额外指定1个目标。",
			extra:"等阶：5<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：5%<br><br>兑换所需：320碎片",
			noTranslate:false,
			level:5,
			status:{
			    1:[1,250],
			    2:[2,350],
			    3:[3,500],
			    4:[4,720],
			    5:[5,0],
			},
			maxUp:5,
			skill:{
				trigger:{
	    	        player:"useCard2",
	    	    },
    		    direct:true,
    			priority:9,
    		    lastDo:true,
	   		    filter(event,player){
	   		        var info=get.info(event.card);
	   		        if(info.allowMultiple==false) return false;
	   		        if(event.targets&&!info.multitarget){
	   		            if(game.hasPlayer(current=>{
	   		                return !event.targets.includes(current)&&player.canUse(event.card,current,false);
	   		            })){
	   		                return true;
	   		            }
	   		        }
	   		        return false;
	    	    },
	    	    async content(event,trigger,player){
					let num=lib.xjzh_qishuyaojians["xjzh_qishu_fenlie"].status[lib.config.xjzh_qishuyaojians.levelEquip.item.level][0];
					let list=num==1?1:[1,Math.min(num,game.players.length-trigger.targets.length)];
	    	        const targets=await player.chooseTarget(list,`〖分裂箭矢〗：为${get.translation(trigger.card)}额外指定一个目标`,(card,player,target)=>{
	    	            if(_status.event.targets.includes(target)) return false;
	    	            return player.canUse(_status.event.card,target,false);
	    	        }).set('ai',target=>{
	    	            let trigger=_status.event.getTrigger();
	    	            let player=_status.event.player;
	    	            return get.effect(target,trigger.card,player,player);
	    	        }).set('targets',trigger.targets).set('card',trigger.card).forResultTargets();
					if(targets){
						trigger.targets.addArray(result.targets);
						game.log(trigger.player,"成为",trigger.card,"的额外目标");
					}
	   		    },
	   		},
		},
	    "xjzh_qishu_waxilidedaogao":{
	        translate:"瓦西里的祷告",
		    translate_info:"你的熊人技能也视为大地技能，你的所有大地技能等级+3，你的体力上限+3，每个回合开始时，以1：10（体力/灵力）的比例消耗灵力值以回复体力值。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“在面向大海的瓦西里雕像处生长着一些大橡树的根，它们有时会出现向后弯曲的情况，根内充满了狂暴的魔法。” - 巴雷特的《名器谱》</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*5}碎片<br><br>专属角色：亚非克拉<br><br>冲突装备：风暴咆哮`,
			noTranslate:false,
			level:4,
			conflict:["xjzh_qishu_fengbaopaoxiao"],
			filter:"xjzh_diablo_yafeikela",
			precede:["xjzh_qishu_wuyan"],
			async init(player){
                if(!get.is.playerNames(player,"xjzh_diablo_yafeikela")) return;
				let skills=player.getSkills(null,false,false).filter(function(skill){
					let info=lib.skill[skill];
					if(lib.skill.global.includes(skill)) return false;
					return info&&(info.xjzh_xiongrenSkill||info.xjzh_dadiSkill);
				});
				if(skills.length){
					for await(let skill of skills){
					    let info=get.info(skill);
						if(info.xjzh_xiongrenSkill) info.xjzh_dadiSkill=true;
					}
					do{
						let skill=skills.shift(),info=get.info(skill);
						if(info.level) info.level+=3;
					}while(skills.length);
				}
				await player.gainMaxHp(3);
				await player.recoverTo(player.maxHp);
		    },
			skill:{
				trigger:{
	    	        global:"phaseBefore",
	    	    },
    		    direct:true,
    			priority:10,
    		    lastDo:true,
	   		    filter(event,player){
	    		    if(player.isHealthy()) return false;
	    		    return get.xjzhMp(player)>=10;
	    	    },
	    	    async content(event,trigger,player){
	   		        let num=Math.floor(player.xjzhMp/10);
	    		    let num2=Math.min(num,player.getDamagedHp(true));
	    		    player.changexjzhMp(-(num2*10));
	    	        player.recover(num2);
	    	        game.log(player,"将",num2*10,"点灵力转化为了",num2,"点体力值");
	   		    },
	   		},
		},
	    "xjzh_qishu_wuyan":{
	        translate:"无餍之怒",
			translate_info:"禁用你的技能〖灵兽〗，你锁定形态为熊形态，你的熊人技能不再消耗灵力，改为回复等量灵力。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“灰烬之日”到来时，伟大的德鲁伊纳菲恩提醒他的门徒们说，为了保护图尔·杜拉不受阿斯塔洛斯的烈焰伤害，没有什么是不能牺牲的，哪怕他们的人性。</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*5}碎片<br><br>专属角色：亚非克拉<br><br>冲突装备：疯狼的狂喜`,
			noTranslate:false,
			level:4,
			conflict:["xjzh_qishu_fenglangkx"],
			filter:"xjzh_diablo_yafeikela",
			unequip:["xjzh_qishu_waxilidedaogao"],
			async init(player){
                if(!get.is.playerNames(player,"xjzh_diablo_yafeikela")) return;
				let node;
				if(player.name2&&player.name2=='xjzh_diablo_yafeikela'){
					node=player.node.name2;
				}else{
					node=player.node.name;
				}
				player.setAvatar('xjzh_diablo_yafeikela','xjzh_diablo_xiong');
	            node.innerHTML=get.translation("xjzh_diablo_xiong");
	            let skills=lib.character["xjzh_diablo_xiong"][3];
		        player.addSkill(skills);
		    },
		},
		"xjzh_qishu_fengbaopaoxiao":{
		    translate:"风暴咆哮",
			translate_info:"你的狼人技能也视为风暴技能，你的所有风暴技能等级+3，你的会心几率+50%，你获得25%-35%灵力消耗减免。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“孩子，聆听风暴的天籁之音吧。它有自己的节奏，自己的旋律。听它那美妙的歌声，也许有一天你也能加入进来，与之合鸣。” - 艾蕊达</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*5}碎片<br><br>专属角色：亚非克拉<br><br>冲突装备：瓦西里的祷告`,
			noTranslate:false,
			level:4,
			conflict:["xjzh_qishu_waxilidedaogao"],
			filter:"xjzh_diablo_yafeikela",
			precede:["xjzh_qishu_fenglangkx"],
			async init(player){
                if(!get.is.playerNames(player,"xjzh_diablo_yafeikela")) return;
				let skills=player.getSkills(null,false,false).filter(function(skill){
					let info=lib.skill[skill];
					if(lib.skill.global.includes(skill)) return false;
					return info&&(info.xjzh_langrenSkill||info.xjzh_fengbaoSkill);
				});
				if(skills.length){
					for await(let skill of skills){
					    let info=get.info(skill);
						if(info.xjzh_langrenSkill) info.xjzh_fengbaoSkill=true;
					}
					do{
						let skill=skills.shift(),info=get.info(skill);
						if(info.level) info.level+=3;
					}while(skills.length);
				}
				let num=get.rand(25,35)/100;
				player.xjzhHuixin?player.xjzhHuixin+=0.5:player.xjzhHuixin=0.5;
				player.xjzhReduce?player.xjzhReduce+=num:player.xjzhReduce=num;
            },
		},
		"xjzh_qishu_fenglangkx":{
		    translate:"疯狼的狂喜",
			translate_info:"禁用你的技能〖灵兽〗，你锁定形态为狼形态，你的灵力上限+25。<li>会心：你释放狼人技能时有25%几率获得20点灵力，",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“他不是诅咒的受害者 - 这都是他自找的。就算他的皮肤裂开，骨骼碎裂，他的笑声也从未停止。” - 疯狂贵族的故事</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*5}碎片<br><br>专属角色：亚非克拉<br><br>冲突装备：无餍之怒`,
			noTranslate:false,
			level:4,
			conflict:["xjzh_qishu_wuyan"],
			filter:"xjzh_diablo_yafeikela",
			unequip:["xjzh_qishu_fengbaopaoxiao"],
			async init(player){
                if(!get.is.playerNames(player,"xjzh_diablo_yafeikela")) return;
                player.changexjzhmaxMp(25);
				player.changexjzhMp(25);
				let node;
				if(player.name2&&player.name2=='xjzh_diablo_yafeikela'){
					node=player.node.name2;
				}else{
					node=player.node.name;
				}
				player.setAvatar('xjzh_diablo_yafeikela','xjzh_diablo_lang');
	            node.innerHTML=get.translation("xjzh_diablo_lang");
	            let skills=lib.character["xjzh_diablo_lang"][3];
		        player.addSkill(skills);
		    },
			skill:{
				trigger:{
					player:"$logSkill",
				},
				direct:true,
				locked:true,
				priority:-1,
				filter(event,player){
					let skills=event.skill;
					let info=get.info(skills);
					if(lib.skill.global.includes(event.skill)) return false;
					if(info&&!info.xjzh_langrenSkill) return false;
					return Math.random()<=0.25*player.xjzhHuixin;
				},
				async content(event,trigger,player){
					player.changexjzhMp(20);
				},
			},
		},
		"xjzh_qishu_wumingzhe":{
		    translate:"无名者兜帽",
			translate_info:"你的会心几率+35%，你对被控制的角色使用牌无距离和次数限制，且被控制的角色的手牌对你始终可见。",
			append_info:"<span style=\"color:#f9ed89;font-family:xinwei\"><font size =3px>“他被逐出了公会，名字也从书中被划去。彻底抹除他的存在就是对他的惩罚。” - 摘录于一张烧焦的羊皮纸</font></span>",
			extra:`等阶：4<br><br>获取：抽奖、兑换、对局<br><br>抽奖概率：5%<br><br>兑换所需：${230*5}碎片<br><br>专属角色：娜塔亚`,
			noTranslate:false,
			level:4,
			filter:"xjzh_diablo_nataya",
			async init(player){
                if(!get.is.playerNames(player,"xjzh_diablo_nataya")) return;
				player.xjzhHuixin?player.xjzhHuixin+=0.35:player.xjzhHuixin=0.35;
            },
			skill:{
				mod:{
					cardUsableTarget(card,player,target){
						if(get.xjzh_deEffect(target)) return true;
					},
					targetInRange(card,player,target){
						if(get.xjzh_deEffect(target)) return true;
					},
				},
				ai:{
					viewHandcard:true,
					skillTagFilter(player,tag,arg){
						if(tag=='viewHandcard'){
							if(player==arg) return false;
							if(get.xjzh_deEffect(arg)) return true;
							return false;
						};
					},
				},
			},
		},
		"xjzh_qishu_daojian":{
		    translate:"疾疫刀尖",
		    translate_info:"你使用【杀】造成伤害视为毒属性伤害且该伤害+1。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			noTranslate:true,
			level:1,
			skill:{
    			trigger:{
    		        source:"damageBegin",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    			filter(event,player){
    			    return event.card&&get.name(event.card)=="sha";
    			},
    		    async content(event,trigger,player){
					trigger.num++;
    		        game.setNature(trigger,'poison');
    		    },
				ai:{
					poisondamage:true,
				},
    		},
    	},
		"xjzh_qishu_fuchou":{
			translate:"复仇之笼",
			translate_info:"你所受到的伤害的30%-50%将会被储存起来，直到该数值不小于1时，你可以对一名其他角色以该数值的300%造成等量火焰伤害（四舍五入），若如此做，你清除储存的伤害数值。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:true,
			level:3,
			skill:{
    			trigger:{
    		        player:"damageAfter",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    			init(player,skill){
    			    if(!player.storage[skill]) player.storage[skill]=0;
    			},
    		    async content(event,trigger,player){
    			    let num=trigger.num,storage=player.storage.xjzh_qishu_fuchou;
					let num2=get.rand(30,50);
					storage+=num*num2;
    			    game.log(player,`受到的伤害的${num2}%将被储存起来，数值为`,num*num2);
					if(storage>=1){
						let damageNum=Math.round(storage)*3;
    			        const targets=await player.chooseTarget(`〖复仇之笼〗：请选择一名其他角色并对其造成${damageNum}点火焰伤害`,(card,player,target)=>{
    					    return target!=player;
    				    }).set('ai',target=>{
    			            return get.damageEffect(target,_status.event.player,_status.event.player,"fire");
    			        });
						if(targets){
							targets[0].damage(damageNum,player,'nocard','fire');
							storage=0;
						}
					}
    		    },
    		},
		},
		"xjzh_qishu_wuqijingtong":{
			translate:"武器精通",
			translate_info:"你无法再装备武器牌，改为将一张虚拟同名牌置于武将牌上并视为你拥有该武器牌的技能；你武将牌上的每张武器牌为你提供+1进攻距离。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:true,
			level:3,
			skill:{
    			trigger:{
    		        player:"equipBegin",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    			mod:{
    				globalFrom:function(from,to,distance){
    				    var cards=from.getExpansions("xjzh_qishu_wuqijingtong");
    					if(!cards.length) return distance;
    					return distance-cards.length;
    				},
    		        aiOrder:function(player,card,num){
    		            var cards=player.getExpansions("xjzh_qishu_wuqijingtong"),list=[];
    		            if(!cards) return num;
    		            for(var i of cards){
    			            if(!list.includes(get.name(i))) list.push(get.name(i));
    			        }
    			        if(list.includes(get.name(card))) return num-10;
                    },
    			},
    			marktext:"剑",
    			intro:{
    			    name:"武器精通",
    			    content:"expansion",
    				markcount:"expansion",
    			},
    			filter:function(event,player){
    			    return get.subtype(event.card)=="equip1";
    			},
    			onremove:function(player,skill){
    				var cards=player.getExpansions(skill);
    				if(cards.length){
    				    for(var card of cards){
    			            var info=get.info(card);
    			            if(!info.skills) continue;
    			            for(var skill of info.skills){
    			                player.removeSkill(skill,true);
    			            }
    			        }
    				    player.loseToDiscardpile(cards);
    				}
    		    },
    		    content:function(){
    			    "step 0"
    			    var cards=player.getExpansions("xjzh_qishu_wuqijingtong"),list=[];
    			    if(!cards.length) event.goto(1);
    			    for(var i of cards){
    			        if(!list.includes(get.name(i))) list.push(get.name(i));
    			    }
    			    if(list.includes(get.name(trigger.card))) event.goto(3);
    			    "step 1"
    			    var cards=game.createCard(trigger.card,get.suit(trigger.card),get.number(trigger.card));
    			    player.addToExpansion(cards,player,'gain2').gaintag.add('xjzh_qishu_wuqijingtong');
    			    "step 2"
    			    var cards=player.getExpansions("xjzh_qishu_wuqijingtong");
    			    for(var card of cards){
    			        var info=get.info(card);
    			        if(!info.skills) continue;
    			        for(var skill of info.skills){
    			            player.addSkill(skill);
    			        }
    			    }
    			    "step 3"
    			    trigger.cancel(null,null,'notrigger');
    			    player.loseToDiscardpile(trigger.card);
    		    },
		    },
		},
		"xjzh_qishu_fangjujingtong":{
			translate:"防具精通",
			translate_info:"你无法再装备防具牌，改为将一张虚拟同名牌置于武将牌上并视为你拥有该防具牌的技能；你武将牌上的每张防具牌为你提供+1防御距离。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:true,
			level:3,
			skill:{
    			trigger:{
    		        player:"equipBegin",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    			mod:{
    				globalTo:function(from,to,distance){
    				    var cards=to.getExpansions("xjzh_qishu_fangjujingtong");
    					if(!cards.length) return distance;
    					return distance+cards.length;
    				},
    		        aiOrder:function(player,card,num){
    		            var cards=player.getExpansions("xjzh_qishu_fangjujingtong"),list=[];
    		            if(!cards) return num;
    		            for(var i of cards){
    			            if(!list.includes(get.name(i))) list.push(get.name(i));
    			        }
    			        if(list.includes(get.name(card))) return num-10;
                    }
    			},
    			marktext:"防",
    			intro:{
    			    name:"防具精通",
    			    content:"expansion",
    				markcount:"expansion",
    			},
    			filter:function(event,player){
    			    return get.subtype(event.card)=="equip2";
    			},
    			onremove:function(player,skill){
    				var cards=player.getExpansions(skill);
    				if(cards.length){
    				    for(var card of cards){
    			            var info=get.info(card);
    			            if(!info.skills) continue;
    			            for(var skill of info.skills){
    			                player.removeSkill(skill,true);
    			            }
    			        }
    				    player.loseToDiscardpile(cards);
    				}
    		    },
    		    content:function(){
    			    "step 0"
    			    var cards=player.getExpansions("xjzh_qishu_fangjujingtong"),list=[];
    			    if(!cards.length) event.goto(1);
    			    for(var i of cards){
    			        if(!list.includes(get.name(i))) list.push(get.name(i));
    			    }
    			    if(list.includes(get.name(trigger.card))) event.goto(3);
    			    "step 1"
    			    var cards=game.createCard(trigger.card,get.suit(trigger.card),get.number(trigger.card));
    			    player.addToExpansion(cards,player,'gain2').gaintag.add('xjzh_qishu_fangjujingtong');
    			    "step 2"
    			    var cards=player.getExpansions("xjzh_qishu_fangjujingtong");
    			    for(var card of cards){
    			        var info=get.info(card);
    			        if(!info.skills) continue;
    			        for(var skill of info.skills){
    			            player.addSkill(skill);
    			        }
    			    }
    			    "step 3"
    			    trigger.cancel(null,null,'notrigger');
    			    player.loseToDiscardpile(trigger.card);
    		    },
    		},
		},
		"xjzh_qishu_binglengjiqiao":{
			translate:"冰冷技巧",
			translate_info:"你有30%几率防止冰属性伤害；当你防止冰属性伤害后，你视为对其使用一张不计入次数的【冰杀】;你造成冰属性伤害有30%几率暴击，造成额外100%基础伤害点伤害。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:true,
			level:3,
			skill:{
    			trigger:{
    		        player:"damageBegin1",
    		        source:"damageBegin1",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    			filter:function(event,player){
    			    if(!game.hasNature(event,'ice')) return false;
    			    return Math.random()<=0.3;
    			},
    		    content:function(){
    			    "step 0"
    			    if(trigger.source==player&&trigger.player!=player){
    			        event.goto(2);
    			        return;
    			    }
    			    player.logSkill("xjzh_qishu_binglengjiqiao");
    			    trigger.changeToZero();
    				"step 1"
    				if(!trigger.source||trigger.nosource) return;
    				player.useCard({name:"sha",nature:"ice",isCard:true},trigger.source,false).set('addCount',false);
    				event.finish();
    				"step 2"
    			    player.logSkill("xjzh_qishu_binglengjiqiao");
    				game.xjzh_Criticalstrike(player,trigger.num,2,null,true);
    		    },
    		    ai:{
    		        effect:{
    		            target:-0.7,
    		        },
    		    },
    		},
		},
		"xjzh_qishu_qiyue":{
			translate:"恶念契约",
			translate_info:"你的回合开始时，你从以下3种效果种选择一种：1，获得一点护甲；2，装备一张攻击距离为2的武器牌；3，摸两张牌。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    			trigger:{
    		        player:"phaseBefore",
    			},
    		    direct:true,
    			priority:-1,
    		    lastDo:true,
    		    content:function(){
    			    "step 0"
    		        var list=[
    				    "获得一点护甲",
    			        "装备一张攻击范围为3的武器牌",
    		            "摸两张牌"
    				]
    		        player.chooseControlList(get.prompt(event.name,player),list).set('ai',function(){
    				    var player=_status.event.player
    				    if(player.hp<player.maxHp/2){
        				    if(player.hp==1) return 0;
    				        return 1;
    				    }
    				    return 2;
    				});
    				"step 1"
    		        if(result.control!="cancel2"){
    		            switch(result.index){
    					    case 0:{
    							player.changeHujia(1);
    							break;
    						}
    						case 1:{
    							player.equip(get.cardPile(function(cardx){
    								return get.subtype(cardx)=="equip1"&&get.info(cardx).distance&&get.info(cardx).distance.attackFrom==-2;
    							}));
    							break;
    						}
    						case 2:{
    							player.draw(2);
    							break;
    						}
    					}
    				}
    		    },
    		},
		},
		"xjzh_qishu_titoushi":{
			translate:"剃头师",
			translate_info:"你所造成的伤害将被其免疫之，40-20秒后将以每10秒提高70%（四舍五入）令其流失等量体力。",
			extra:"等阶：4<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：5%<br><br>兑换所需：230碎片",
			noTranslate:true,
			level:4,
			skill:{
    		    trigger:{
    		        source:"damageBegin",
    		    },
    		    forced:true,
    		    priority:6,
    		    filter(event,player){
    		        return !event.numFixed&&!event.cancelled;
    		    },
    		    async content(event,trigger,player){
    		        let num=get.rand(20000,40000);
    		        let numx=(num/1000)*0.07;
    		        let damageNum=Math.round(trigger.num*(1+numx));
    		        game.log(trigger.player,"受到",player,"的","#y〖剃头师〗","影响",trigger.num,"点伤害将于",num/1000,"s后转为流失",damageNum,"点体力");
    		        setTimeout(()=>{
    					if(trigger.player.isAlive()){
    					    trigger.player.loseHp(damageNum);
    					    game.log(trigger.player,"因",player,"的","#y〖剃头师〗","流失",damageNum,"点体力");
    					}
    				},num);
    				trigger.changeToZero();
    		    },
    		},
		},
		"xjzh_qishu_yaojishi":{
			translate:"药剂师",
			translate_info:"你造成伤害有25-40%几率令其视为受到火、毒、冰属性伤害，每有一种额外的属性伤害，该伤害+1。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    		    trigger:{
    		        source:"damageBegin",
    		    },
    		    forced:true,
    		    priority:7,
    		    filter(event,player){
    		        let num=get.rand(25,40);
    		        if(Math.random()>num/100) return false;
    		        if(event.getParent('xjzh_qishu_yaojishi').name=="xjzh_qishu_yaojishi") return false;
					let list=get.natureList(event,player),list2=["poison","ice","fire"],num2=0;
					list2.forEach(item=>{
						if(!list.contains(item)) num2++;
					});
					if(num>=3) return false;
    		        return !event.numFixed&&!event.cancelled;
    		    },
    		    async content(event,trigger,player){
					let list=get.natureList(trigger,player),list2=["poison","ice","fire"],list3=[];
					list2.forEach(item=>{
						if(!list.contains(item)) list3.push(item);
					});
					if(list3.length){
						game.setNature(trigger,list3,true);
						trigger.num+=list3.length;
					}
    		    },
    		},
		},
		"xjzh_qishu_wushitongku":{
			translate:"无视痛苦",
			translate_info:"你受到伤害有5-25%防止之，改为回复等量体力。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    		    trigger:{
    		        player:"damageBegin",
    		    },
    		    forced:true,
    		    priority:3,
    		    filter:function(event,player){
    		        var num=get.rand(5,25);
    		        if(Math.random()<=num/100) return false;
    		        return !event.numFixed&&!event.cancelled;
    		    },
    		    content:function(){
    		        trigger.player.recover(trigger.num);
    		        trigger.changeToZero();
    		    },
    		},
		},
		"xjzh_qishu_siwanghuanxing":{
			translate:"死亡缓刑",
			translate_info:"你造成伤害后有15-35%几率令其获得一种随机减益buff，你对有减益buff的角色造成伤害根据每1种减益buff附加额外1点毒属性伤害。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    		    trigger:{
    		        source:"damageEnd",
    		    },
    		    direct:true,
    		    priority:2,
    		    content:function(){
    		        "step 0"
    		        if(!trigger.cancelled&&!trigger.numFixed){
    		            var deBuff=lib.xjzh_Debuff.slice(0);
    		            var num=get.rand(15,35);
    		            if(Math.random()<=num/100){
    		                trigger.player.changexjzhBUFF(deBuff.randomGet(),1);
    		            }
    		        }
    		        "step 1"
    		        var list=get.xjzhBUFFList(trigger.player,false);
    		        trigger.player.damage(list.length,player,"poison","nocard");
    		        player.logSkill("xjzh_qishu_siwanghuanxing",trigger.player);
    		    },
    		},
		},
		"xjzh_qishu_shengmingfusu":{
			translate:"生命复苏",
			translate_info:"锁定技，当一名角色因你回复体力时，其回复的体力值基础数值+1，若其处于濒死阶段，则额外+1回复基础数值。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			//noTranslate:true,
			level:1,
			skill:{
    		    trigger:{
    		        global:"recoverBegin",
    		    },
    		    priority:3,
    		    frequent:true,
    			filter(event,player){
    			    return event.source==player;
    			},
    		    async content(event,trigger,player){
    		        trigger.num++;
    		        if(trigger.player.isDying()) trigger.num++;
    		    },
    		},
		},
		"xjzh_qishu_heianxuewu":{
			translate:"黑暗血舞",
			translate_info:"你的体力值大于体力上限的一半时，你使用[伤害]卡牌须失去一点体力值并令本次造成的伤害+1，但你无需再弃置此牌。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			noTranslate:true,
			level:1,
			skill:{
    		    trigger:{
    		        player:"useCard",
    		    },
    		    direct:true,
    		    priority:3,
    			filter:function(event,player){
    			    return player.hp>Math.ceil(player.maxHp/2)&&get.tag(event.card,"damage");
    			},
    		    content:function(){
    		        "step 0"
    		        player.loseHp();
    		        "step 1"
    		        if(!trigger.baseDamage) trigger.baseDamage=1;
    		        trigger.baseDamage++;
    		        "step 2"
    		        player.gain(trigger.card,player,'gain2');
    		    },
    		},
		},
		"xjzh_qishu_jishudanyao":{
			translate:"集束弹药",
			translate_info:"你使用牌指定的目标有20%几率令其获得1层定身。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			noTranslate:true,
			level:1,
			skill:{
    		    trigger:{
    		        player:"useCard2",
    		    },
    		    direct:true,
    		    priority:3,
    			filter:function(event,player){
    			    if(get.xjzhBUFFNum(player,"dingshen")>=get.xjzhBUFFInfo("dingshen",'limit')) return false;
    			    return Math.random()<=0.2;
    			},
    		    content:function(){
    		        player.changexjzhBUFF("dingshen",1);
    		    },
    		},
		},
		"xjzh_qishu_talaxia":{
			translate:"塔拉夏之心",
			translate_info:"若你造成的属性伤害与你上次对其造成的属性伤害不同，你本次造成的属性伤害+1，且你有几率获得一张与你本次造成的属性伤害类型不同的【杀】。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    		    trigger:{
    		        source:"damageBegin1",
    		    },
    		    direct:true,
    		    priority:3,
    			filter:function(event,player){
    			    if(!event.nature) return false;
    			    var history=player.getAllHistory('sourceDamage',function(evt){
    				    return evt&&evt.nature;
    				});
    				var naturex=history[history.length];
    				if(naturex!=event.nature) return true;
    				return false;
    			},
    		    content:function(){
    		        "step 0"
    		        trigger.num++
    		        "step 1"
    			    var history=player.getAllHistory('sourceDamage',function(evt){
    				    return evt&&evt.nature;
    				});
    				var naturex=history[history.length];
    				var nature2=lib.nature.slice(0).remove(naturex).randomGet();
    		        if(Math.random()<=Math.random()) player.gain({name:"sha",nature:nature2},player,'gain2','log');
    		    },
    		},
		},
		"xjzh_qishu_huanji":{
			translate:"还击",
			translate_info:"当你横置、翻面、判定区置入延时锦囊牌后，你可以令一名其他角色获得相同效果。",
			extra:"等阶：3<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：12.5%<br><br>兑换所需：150碎片",
			noTranslate:true,
			level:3,
			skill:{
    		    trigger:{
    		        player:["linkAfter","turnOverAfter","addJudgeAfter"],
    		    },
    		    forced:true,
    		    priority:4,
    		    async content(event,trigger,player){
    		        if(trigger.name=="addJudge"){
    		            str="〖还击〗：请选择将"+get.translation(trigger.cards[0])+"置入一名其他角色的判定区";
    		        }
    		        else if(trigger.name=="link"){
    		            str="〖还击〗：请选择令一名其他角色横置武将牌";
    		        }
    		        else if(trigger.name=="turnOver"){
    		            str="〖还击〗：请选择令一名其他角色翻面";
    		        }
    		        const targets=await player.chooseTarget(str,(card,player,target)=>{
    		            if(trigger.name=="addJudge"){
    		                return target.canAddJudge(trigger.cards[0]);
    		            }
    		            return target!=player;
    		        }).set("ai",target=>{
						return get.attitude(player,target);
					}).forResultTargets();
					if(targets){
						let target=targets[0];
						if(trigger.name=="addJudge"){
							let card=game.createCard(trigger.card,get.number(trigger.card),get.suit(trigger.card));
							target.addJudge(card);
							target.$gain2(card);
						}else{
							target[trigger.name](true);
						}
					}
    		    },
    		},
		},
		"xjzh_qishu_maoxianmingyun":{
			translate:"冒险命运",
			translate_info:"若你造成伤害的点数不小于2，则该伤害增加100%，否则减少100％。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			noTranslate:true,
			level:1,
			skill:{
    		    trigger:{
    		        player:"damageBegin1",
    		    },
    		    direct:true,
    		    priority:4,
    			filter:function(event,player){
    			    if(event.numFixed||event.cancelled) return false;
    			    return true;
    			},
    		    content:function(){
    		        if(trigger.num>=2) trigger.num*=2;
    		        else trigger.changeToZero();
    		    },
    		},
		},
		"xjzh_qishu_chengfa":{
			translate:"惩罚",
			translate_info:"若你的攻击距离不小于3，你使用[伤害]卡牌指定目标后获得其随机一张牌。",
			extra:"等阶：2<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：25%<br><br>兑换所需：100碎片",
			noTranslate:true,
			level:2,
			skill:{
    		    trigger:{
    		        player:"useCardToPlayered",
    		    },
    		    forced:true,
    		    priority:4,
    			filter:function(event,player){
    			    if(!get.tag(event.card,'damage')) return false;
    			    return player.getAttackRange()>=3;
    			},
    			content:function(){
    			    var cards=trigger.target.getGainableCards(player,'hej');
                    player.gain(cards.randomGet(),'log',trigger.target,'gain2');
                },
            },
        },
		"xjzh_qishu_guimeihuanying":{
			translate:"诡魅幻影",
			translate_info:"其他角色使用牌前，你有几率使用一张同名牌。",
			extra:"等阶：1<br><br>获取途径：抽奖、兑换、对局有概率掉落。<br><br>抽奖概率：35%<br><br>兑换所需：50碎片",
			noTranslate:true,
			level:1,
			skill:{
    		    trigger:{
    		        global:"useCard",
    		    },
    		    forced:true,
    		    priority:6,
    			filter:function(event,player){
    			    if(event.player==player) return false;
    			    if(!player.hasUseTarget(event.card)) return false;
    			    return Math.random<=Math.random();
    			},
    			content:function(){
    			    player.chooseUseTarget(trigger.card);
                },
            },
        },

	},
	/* 模板
	奇术要件id:{
		translate:'奇术要件名称',
		translate_info:'奇术要件效果描述',
		extra:'获取途径',
		level:1, 奇术要件等级，范围为1、2、3、4、5，不写默认为1,
		noTranslate:true, 是否在武将面板上不显示技能描述，需要不写skillInfo
		hidden:true, 是否游戏开始时隐藏，不隐藏不写
		filter:function(name){},可以装备的角色需要满足的条件，其中参数‘name’为角色id，可以以数组或字符串形式直接写角色id
		init:function(player){
			游戏开始时的执行内容，主要为对角色体力值等参数的调整，参数player为角色
		},
		replaceSkill:{
			'被替换的技能id':{
				替换后的技能内容
			}  替换后的技能id为被替换的技能id+'_changed'
			'被替换的技能id':'替换后的技能id'  如果这样写，请在extension.js中提前写好对应技能的代码及翻译
		},  装备的角色被替换掉的技能，可以有多个
		replaceSkillInfo:{
			'被替换的技能id':'替换后技能的名字，不变可以不填',
			'被替换的技能id_info':'替换后技能的描述',
		},
		skill:{
			装备的角色在游戏开始时获得的技能内容
			奇术要件技能会有默认优先度5
		},
		skillName:'',技能名称，不写则默认为奇术要件名称
		skillInfo:'',技能描述，不写则为奇术要件描述
	},*/
	//升级及获得经验
	game.xjzh_levelUp=function(num){
	    "step 0"
	    if(!lib.config.xjzh_qishuyaojians.level) lib.config.xjzh_qishuyaojians.level=1;
	    if(!lib.config.xjzh_qishuyaojians.exp) lib.config.xjzh_qishuyaojians.exp=0;
	    if(!num) num=0;
	    lib.config.xjzh_qishuyaojians.exp+=num;
	    "step 1"
	    const le=lib.config.xjzh_qishuyaojians.level;
	    const ex=lib.config.xjzh_qishuyaojians.exp;

	    if(le==100) return [100,0];

	    if(ex>=le*(100+(10*le))){
	        lib.config.xjzh_qishuyaojians.level+=1;
	        lib.config.xjzh_qishuyaojians.exp-=le*(100+(10*le));
	    }

	    if(ex>=le*(100+(10*le))) game.xjzh_levelUp();
	    "step 2"
	    game.xjzhQishu_saveConfig();
	    return [lib.config.xjzh_qishuyaojians.level,lib.config.xjzh_qishuyaojians.exp];
	};
	//判断是否使用控制台
    game.xjzh_filterAddqishu=function(){
		if(!_status.xjzhDebug){
			if(_status.xjzhCheatCount) return false;
		}
		return true;
    };
	game.xjzh_saveKeys=function(keys){
	    if(!keys||typeof keys!="string") return;
	    if(!lib.config.xjzh_qishuyaojians.keys) lib.config.xjzh_qishuyaojians.keys=[];
	    if(lib.config.xjzh_qishuyaojians.keys.includes(keys)) return;
	    lib.config.xjzh_qishuyaojians.keys.push(keys);
	    game.xjzhQishu_saveConfig();
	    return lib.config.xjzh_qishuyaojians.keys;
	};
	//储存已用兑换码
	game.xjzh_saveKeys=function(keys){
	    if(!keys||typeof keys!="string") return;
	    if(!lib.config.xjzh_qishuyaojians.keys) lib.config.xjzh_qishuyaojians.keys=[];
	    if(lib.config.xjzh_qishuyaojians.keys.includes(keys)) return;
	    lib.config.xjzh_qishuyaojians.keys.push(keys);
	    game.xjzhQishu_saveConfig();
	    return lib.config.xjzh_qishuyaojians.keys;
	};
	//判断兑换码是否已经被使用
	game.xjzh_hasKeys=function(keys){
	    if(!keys||typeof keys!="string") return;
	    if(!lib.config.xjzh_qishuyaojians.keys) lib.config.xjzh_qishuyaojians.keys=[];
	    if(lib.config.xjzh_qishuyaojians.keys.includes(keys)) return true;
	    return false;
	};
	//改变材料数量
	game.xjzh_changeCailiao=function(arg,num){
		if(!game.xjzh_filterAddqishu()) return false;
		if(!get.is.object(lib.config.xjzh_qishuyaojians.cailiao)){
		    lib.config.xjzh_qishuyaojians.cailiao={
    		    //boss瓦尔申挑战材料
    		    "xjzh_cailiao_enianzhixin":["恶念之心",0,"瓦尔申挑战材料；他的肌肉毫无规律的抽动着。"],
    		    //boss格里高利挑战材料
    		    "xjzh_cailiao_gangtie":["活体钢铁",0,"格里高利挑战材料；似乎是一节拥有生命的钢铁。"],
    		    //boss都瑞尔挑战材料
    		    "xjzh_cailiao_nianyedan":["粘液覆盖的蛋",0,"都瑞尔挑战材料；里面蠕动着一个新生的强大存在。"],
    		    "xjzh_cailiao_kutong":["苦痛碎片",0,"都瑞尔挑战材料；一块破碎的灵魂石，只是拿着他，你的胳膊就隐隐作痛。"],
    		    //boss冰川巨兽挑战材料
    		    "xjzh_cailiao_kongju":["提纯的恐惧",0,"冰川巨兽挑战材料；不反光的墨水，你发现自己敏锐地感知到自己终有一死。"],
    		    //boss齐尔领主挑战材料
    		    "xjzh_cailiao_xianxue":["提纯的鲜血",0,"齐尔领主挑战材料；你几乎能透过玻璃感受到一下心跳。"],
				//安达利尔挑战材料
    		    "xjzh_cailiao_wawa":["针扎娃娃",0,"安达利尔挑战材料；每一针都是复仇的索取。"],
    		    "xjzh_cailiao_jiasuo":["焦沙枷锁",0,"安达利尔挑战材料；牢狱与绞架的天作之合，但愿所有罪人都能带上沉重的铁镣。"],
				//冥狱石
    		    "xjzh_cailiao_mingyushi":["冥狱石",0,"奇术boss强化材料；这块怪石历经漫长岁月的沉淀，喃喃吟诵着古老的亵渎之词。"],
    		    //天堂试炼挑战材料
    		    "xjzh_cailiao_shijieshi":["世界石碎片",0,"天堂试炼挑战材料；世界之石破碎之后散落的碎片。"]
    		};
		};
		if(typeof arg!="string"){
		    var {...list}=lib.config.xjzh_qishuyaojians.cailiao;
		    var list2=Object.keys(list);
		    arg=list2.randomGet();
		}
		if(typeof num!='number') num=1;
		if(!lib.config.xjzh_qishuyaojians.cailiao[arg]){
		    switch(arg){
		        case "xjzh_cailiao_enianzhixin":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["恶念之心",0,"瓦尔申挑战材料；他的肌肉毫无规律的抽动着。"];
		        }
		        break;
		        case "xjzh_cailiao_gangtie":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["活体钢铁",0,"格里高利挑战材料；似乎是一节拥有生命的钢铁。"];
		        }
		        break;
		        case "xjzh_cailiao_nianyedan":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["粘液覆盖的蛋",0,"都瑞尔挑战材料；里面蠕动着一个新生的强大存在。"];
		        }
		        break;
		        case "xjzh_cailiao_kutong":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["苦痛碎片",0,"都瑞尔挑战材料；一块破碎的灵魂石，只是拿着他，你的胳膊就隐隐作痛。"];
		        }
		        break;
		        case "xjzh_cailiao_kongju":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["提纯的恐惧",0,"冰川巨兽挑战材料；不反光的墨水，你发现自己敏锐地感知到自己终有一死。"];
		        }
		        break;
		        case "xjzh_cailiao_xianxue":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["提纯的鲜血",0,"齐尔领主挑战材料；你几乎能透过玻璃感受到一下心跳。"];
		        }
		        break;
		        case "xjzh_cailiao_shijieshi":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["世界石碎片",0,"天堂试炼挑战材料；世界之石破碎之后散落的碎片。"];
		        }
		        break;
		        case "xjzh_cailiao_wawa":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["针扎娃娃",0,"安达利尔挑战材料；每一针都是复仇的索取。"];
		        }
		        break;
		        case "xjzh_cailiao_jiasuo":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["焦沙枷锁",0,"安达利尔挑战材料；牢狱与绞架的天作之合，但愿所有罪人都能带上沉重的铁镣。"];
		        }
		        break;
		        case "xjzh_cailiao_mingyushi":{
		            lib.config.xjzh_qishuyaojians.cailiao[arg]=["冥狱石",0,"奇术boss强化材料；这块怪石历经漫长岁月的沉淀，喃喃吟诵着古老的亵渎之词。"];
		        }
		        break;
		    };
		}
		lib.config.xjzh_qishuyaojians.cailiao[arg][1]+=num;
		if(lib.config.xjzh_qishuyaojians.cailiao[arg][1]<0) lib.config.xjzh_qishuyaojians.cailiao[arg][1]=0;
		game.xjzhQishu_saveConfig();
		return lib.config.xjzh_qishuyaojians.cailiao[arg][1];
	};
	//重置所有材料
	game.xjzh_resetCailiao=function(){
		lib.config.xjzh_qishuyaojians.cailiao={
    	    //boss瓦尔申挑战材料
    	    "xjzh_cailiao_enianzhixin":["恶念之心",0,"瓦尔申挑战材料；他的肌肉毫无规律的抽动着。"],
   		    //boss格里高利挑战材料
   		    "xjzh_cailiao_gangtie":["活体钢铁",0,"格里高利挑战材料；似乎是一节拥有生命的钢铁。"],
    		//boss都瑞尔挑战材料
    	    "xjzh_cailiao_nianyedan":["粘液覆盖的蛋",0,"都瑞尔挑战材料；里面蠕动着一个新生的强大存在。"],
    	    "xjzh_cailiao_kutong":["苦痛碎片",0,"都瑞尔挑战材料；一块破碎的灵魂石，只是拿着他，你的胳膊就隐隐作痛。"],
   		    //boss冰川巨兽挑战材料
   		    "xjzh_cailiao_kongju":["提纯的恐惧",0,"冰川巨兽挑战材料；不反光的墨水，你发现自己敏锐地感知到自己终有一死。"],
    		//boss齐尔领主挑战材料
    	    "xjzh_cailiao_xianxue":["提纯的鲜血",0,"齐尔领主挑战材料；你几乎能透过玻璃感受到一下心跳。"],
			//安达利尔挑战材料
			"xjzh_cailiao_wawa":["针扎娃娃",0,"安达利尔挑战材料；每一针都是复仇的索取。"],
			"xjzh_cailiao_jiasuo":["焦沙枷锁",0,"安达利尔挑战材料；牢狱与绞架的天作之合，但愿所有罪人都能带上沉重的铁镣。"],
			//冥狱石
			"xjzh_cailiao_mingyushi":["冥狱石",0,"奇术boss强化材料；这块怪石历经漫长岁月的沉淀，喃喃吟诵着古老的亵渎之词。"],
			//天堂试炼挑战材料
			"xjzh_cailiao_shijieshi":["世界石碎片",0,"天堂试炼挑战材料；世界之石破碎之后散落的碎片。"]
    	};
		game.xjzhQishu_saveConfig();
		return lib.config.xjzh_qishuyaojians.cailiao;
	};
	//获取材料翻译
	get.xjzh_cailiaoTranslate=function(arg){
	    if(!arg) return "";
	    var {...list}=lib.config.xjzh_qishuyaojians.cailiao;
		return list[arg][0];
	};
	//获取材料数量
	get.xjzh_cailiao=function(arg){
	    var {...list}=lib.config.xjzh_qishuyaojians.cailiao;
		var list2=Object.keys(list);
		if(typeof arg!='string'){
		    var obj={};
		    for(var target of list2){
		        if(!obj[target]) obj[target]=0;
		        obj[target]=list[target][1];
		    }
		    return obj;
		}
		if(!list2.includes(arg)) return 0;
		if(!list[arg][1]) return 0;
		return list[arg][1];
	};
	//获取奇术要件翻译
	get.xjzh_qishuTranslate=function(arg){
	    if(!arg) return "";
	    return lib.xjzh_qishuyaojians[arg].translate;
	};
	//检测是否能装备奇术要件
	game.xjzh_canEquip=function(name,playerName){
		if(!name||!playerName) return false;
		var info=get.xjzh_equipInfo(name);
		if(!info) return false;
		if(info.conflict){
    		var conflict=info.conflict;
			if(conflict.some(item=>game.xjzh_hasEquiped(item,playerName))) return `此奇术要件与${conflict.map(item=>get.xjzh_qishuTranslate(item)).join('、')}冲突，不能装备。}`;
		}
		if(info.precede){
			let precede=info.precede;
			if(precede.some(item=>!game.xjzh_hasEquiped(item,playerName))) return `此奇术要件需要先装备${precede.map(item=>get.xjzh_qishuTranslate(item)).join('、')}才能装备。`;
		}
		var filter=info.filter;
		if(typeof filter=='string') return playerName==filter;
		else if(typeof filter=='object') return filter.includes(playerName);
		else if(typeof filter=='function') return filter(playerName);
		return true;
	};
	//改变碎片数量
	game.xjzh_changeSuipian=function(num){
		if(!game.xjzh_filterAddqishu()) return false;
		if(typeof lib.config.xjzh_qishuyaojians.suipian!='number') lib.config.xjzh_qishuyaojians.suipian=0;
		if(typeof num!='number') num=1;
		lib.config.xjzh_qishuyaojians.suipian+=num;
		if(lib.config.xjzh_qishuyaojians.suipian<0) lib.config.xjzh_qishuyaojians.suipian=0;
		game.xjzhQishu_saveConfig();
		return lib.config.xjzh_qishuyaojians.suipian;
	};
	//获取碎片数量
	get.xjzh_suipian=function(){
		if(typeof lib.config.xjzh_qishuyaojians.suipian!='number'){
			lib.config.xjzh_qishuyaojians.suipian=0;
			game.xjzhQishu_saveConfig();
		}
		return lib.config.xjzh_qishuyaojians.suipian;
	};
	//改变精魄数量
	game.xjzh_changeTokens=function(num){
		if(!game.xjzh_filterAddqishu()) return false;
		if(typeof lib.config.xjzh_qishuyaojians.tokens!='number') lib.config.xjzh_qishuyaojians.tokens=0;
		if(typeof num!='number') num=1;
		lib.config.xjzh_qishuyaojians.tokens+=num;
		if(lib.config.xjzh_qishuyaojians.tokens<0) lib.config.xjzh_qishuyaojians.tokens=0;
		game.xjzhQishu_saveConfig();
		return lib.config.xjzh_qishuyaojians.tokens;
	};
	//获取精魄数量
	get.xjzh_tokens=function(){
		if(typeof lib.config.xjzh_qishuyaojians.tokens!='number'){
			lib.config.xjzh_qishuyaojians.tokens=0;
			game.xjzhQishu_saveConfig();
		}
		return lib.config.xjzh_qishuyaojians.tokens;
	};
	//奇术要件升级
	game.xjzh_qishuLevel=function(item){
	    if(!item) return;
	    if(item.level<5) return;
	    var num=0;
	    var info=get.xjzh_equipInfo(item).status;
	    if(!lib.config.xjzh_qishuyaojians.levelEquip) lib.config.xjzh_qishuyaojians.levelEquip={};
	    if(!lib.config.xjzh_qishuyaojians.levelEquip.item){
	        lib.config.xjzh_qishuyaojians.levelEquip.item={
	            level:1,
	            exp:0
	        };
	    };
	    if(!lib.config.xjzh_qishuyaojians.levelEquip.item.level) lib.config.xjzh_qishuyaojians.levelEquip.item.level=1;
	    if(!lib.config.xjzh_qishuyaojians.levelEquip.item.exp) lib.config.xjzh_qishuyaojians.levelEquip.item.exp=0;
	    var level=lib.config.xjzh_qishuyaojians.levelEquip.item.level;
	    var exp=lib.config.xjzh_qishuyaojians.levelEquip.item.exp;
	    var num2=get.xjzh_suipian();
	    if(!info){
	        var loading=window.xjzhOpenLoading();
			loading.subViews.text.innerHTML="条件不符合";
			return;
	    }
	    else if(level==5){
	        var loading=window.xjzhOpenLoading();
			loading.subViews.text.innerHTML="已是最高等级";
			return;
	    }
	    else if(num2==0){
	        var loading=window.xjzhOpenLoading();
			loading.subViews.text.innerHTML="碎片不足";
			return;
	    }

	    if(num2>=info[level][1]-exp){
	        num=info[level][1]-exp;
	    }
	    else if(num2<info[level][1]-exp){
	        num=num2;
	    }

	    lib.config.xjzh_qishuyaojians.levelEquip.item.exp+=num;

	    if(lib.config.xjzh_qishuyaojians.levelEquip.item.exp>=info[level][1]){
	        lib.config.xjzh_qishuyaojians.levelEquip.item.exp-=info[level][1];
	        lib.config.xjzh_qishuyaojians.levelEquip.item.level+=1;

    	    var loading=window.xjzhOpenLoading();
    		loading.subViews.text.innerHTML=get.xjzh_qishuTranslate(item)+"已升级，当前等级："+lib.config.xjzh_qishuyaojians.levelEquip.item.level;
	    }else{
	        var loading=window.xjzhOpenLoading();
    		loading.subViews.text.innerHTML="消耗"+num+"碎片，获得等量经验";
	    }

	    game.xjzhQishu_saveConfig();
	};
	//获得奇术要件
	game.xjzh_gainEquip=function(name){
		if(!game.xjzh_filterAddqishu()) return false;
		lib.config.xjzh_qishuyaojians.bag.push(name);
		game.xjzhQishu_saveConfig();
		return name;
	};
	//失去奇术要件
	game.xjzh_loseEquip=function(name){
		lib.config.xjzh_qishuyaojians.bag.remove(name);
		game.xjzhQishu_saveConfig();
	};
	//检测是否装备了奇术要件
	game.xjzh_hasEquiped=function(name,playerName){
		if(!name) return false;
		if(!lib.xjzh_qishuyaojians[name]) return;
		if(!playerName) return false;
		if(!lib.config.xjzh_qishuyaojians.player[playerName]) return false;
		return lib.config.xjzh_qishuyaojians.player[playerName].includes(name);
	};
	//装备奇术要件
	game.xjzh_useEquip=function(name,playerName,nopop,hutong){
		if(!name||!playerName) return;
		if(!game.xjzh_canEquip(name,playerName)||typeof game.xjzh_canEquip(name,playerName)=="string"){
			let text=game.xjzh_canEquip(name,playerName);
			window.xjzhOpenLoading(typeof text=="string"?text:'该角色不满足装备条件');
			return;
		}
		if(!lib.xjzh_qishuyaojians[name]) return;
		if(!lib.config.xjzh_qishuyaojians.player[playerName]) lib.config.xjzh_qishuyaojians.player[playerName]=[];
		if(lib.config.xjzh_qishuyaojians.player[playerName].length<3){
			if(lib.config.xjzh_qishuyaojians.player[playerName].includes(name)){
				if(!nopop){
					var loading = window.xjzhOpenLoading();
					loading.subViews.text.innerHTML=get.translation(playerName)+"已经装备了"+lib.xjzh_qishuyaojians[name].translate;
				}
				return;
			}
			lib.config.xjzh_qishuyaojians.player[playerName].push(name);
			if(!lib.config.xjzh_qishuyaojians.equip[name]) lib.config.xjzh_qishuyaojians.equip[name]=[];
			lib.config.xjzh_qishuyaojians.equip[name].add(playerName)
			if(!nopop){
				var loading = window.xjzhOpenLoading();
				loading.subViews.text.innerHTML="已为"+get.translation(playerName)+"装备了"+lib.xjzh_qishuyaojians[name].translate;
			}
			if(!hutong){
				game.xjzh_loseEquip(name);
				for(var i of lib.xjzh_equipHutong){
					if(i.includes(playerName)){
						for(var j of i){
							if(j==playerName) continue;
							game.xjzh_useEquip(name,j,true,true);
						}
					}
				}
			}
		}else{
			var equips=lib.config.xjzh_qishuyaojians.player[playerName];
			var equipName=(equips.splice(0,1))[0];
			lib.config.xjzh_qishuyaojians.equip[equipName].remove(playerName);
			equips.push(name);
			if(!lib.config.xjzh_qishuyaojians.equip[name]) lib.config.xjzh_qishuyaojians.equip[name]=[];
			lib.config.xjzh_qishuyaojians.equip[name].push(playerName);
			if(!nopop){
				var loading = window.xjzhOpenLoading();
				loading.subViews.text.innerHTML="已为"+get.translation(playerName)+"装备了"+lib.xjzh_qishuyaojians[name].translate
					+'<br>（自动卸下了'+lib.xjzh_qishuyaojians[equipName].translate+'）';
			}
			if(!hutong){
				game.xjzh_loseEquip(name);
				game.xjzh_gainEquip(equipName);
				for(var i of lib.xjzh_equipHutong){
					if(i.includes(playerName)){
						for(var j of i){
							if(j==playerName) continue;
							game.xjzh_useEquip(name,j,true,true);
						}
					}
				}
			}
		};
		game.xjzhQishu_saveConfig();
	};
	//卸下奇术要件
	game.xjzh_unEquip=function(name,playerName,nopop,hutong){
		if(!name) return;
		if(!lib.xjzh_qishuyaojians[name]){
			if(playerName){
				lib.config.xjzh_qishuyaojians.player[playerName]=[];
			}
			return;
		}
		var info=get.xjzh_equipInfo(name);
		if(info&&info.unequip){
			let unequip=info.unequip;
			if(unequip.some(item=>game.xjzh_hasEquiped(item,playerName))){
				window.xjzhOpenLoading(`此奇术要件需要先卸下${unequip.map(item=>get.xjzh_qishuTranslate(item)).join('、')}才能取消装备。`);
				return;
			}
		}
		if(!lib.config.xjzh_qishuyaojians.player[playerName]) return;
		if(lib.config.xjzh_qishuyaojians.player[playerName].includes(name)){
			lib.config.xjzh_qishuyaojians.player[playerName].remove(name);
			if(lib.config.xjzh_qishuyaojians.equip[name]) lib.config.xjzh_qishuyaojians.equip[name].remove(playerName);
			if(!hutong){
				game.xjzh_gainEquip(name);
				for(var i of lib.xjzh_equipHutong){
					if(i.includes(playerName)){
						for(var j of i){
							if(j==playerName) continue;
							game.xjzh_unEquip(name,j,true,true);
						}
					}
				}
			}
			else return;
		}
		if(!nopop){
			var loading = window.xjzhOpenLoading();
			loading.subViews.text.innerHTML="已为"+get.translation(playerName)+"卸下了"+lib.xjzh_qishuyaojians[name].translate;
		}
		game.xjzhQishu_saveConfig();
	};
	//获取角色装备的奇术要件
	get.xjzh_equiped=function(playerName){
		if(!playerName) return null;
		if(!lib.config.xjzh_qishuyaojians.player[playerName]) return null;
		else return lib.config.xjzh_qishuyaojians.player[playerName]
	};
	//获取装备了奇术要件的角色
	get.xjzh_equipPlayer=function(name){
		if(!lib.config.xjzh_qishuyaojians.equip) return [];
		if(!lib.config.xjzh_qishuyaojians.equip[name]) return [];
		return lib.config.xjzh_qishuyaojians.equip[name]
	};
	//获取奇术要件的信息
	get.xjzh_equipInfo=function(name){
		if(!lib.xjzh_qishuyaojians[name]) return {};
		return lib.xjzh_qishuyaojians[name]||{};
	};
	//奇术要件生效
	lib.translate["_xjzh_qishu_effect"]="奇术要件";
	lib.skill["_xjzh_qishu_effect"]={
		trigger:{
			global:'gameStart',
		},
		silent:true,
		lastDo:true,
		priority:Infinity,
		filter(event,player){
			if(get.nameList(player).length==0) return false;
			if(!get.isXHwujiang(player)) return false;
			if(!['identity','doudizhu','boss'].includes(get.mode())) return false;
			if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return false;
			return true;
		},
		async content(event,trigger,player){
			player.xjzh_qishuyaojians=[null,null,null];
			if(lib.config.xjzh_qishuyaojians.player&&get.nameList(player).length>0){
				let names=get.nameList(player),choice;
				let name=names.find(item=>{
					return lib.config.xjzh_qishuyaojians.player[item];
				});
				choice=lib.config.xjzh_qishuyaojians.player[name]||[];
				var initSkill=function(name,player){
					if(!name) return;
					var item=lib.xjzh_qishuyaojians[name];
					if(!item) return;
					if(item.init) item.init(player);
					if(item.replaceSkill){
						for(var origin in item.replaceSkill){
							if(typeof item.replaceSkill[origin]=='string'){
								var skill=item.replaceSkill[origin];
							}else{
								var skill=origin+'_changed';
								lib.skill[skill]=item.replaceSkill[origin];
								lib.skill[skill].unique=true;
								lib.translate[skill]=lib.translate[origin];
								game.finishSkill(skill,false);
							}
							if(lib.character[player.name][3].includes(origin)){
								var index=lib.character[player.name][3].indexOf(origin);
								lib.character[player.name][3].splice(index,1,skill);
							}
							if(player.skills.includes(origin)){
								var index=player.skills.indexOf(origin);
								player.skills[index]=skill;
								//失去旧技能
								var info=lib.skill[origin];
								player.unmarkSkill(origin);
								delete player.tempSkills[origin];
								if(info){
									if(info.onremove){
										if(typeof info.onremove=='function'){
											info.onremove(player,origin);
										}
										else if(typeof info.onremove=='string'){
											if(info.onremove=='storage'){
												delete player.storage[origin];
											}
											else{
												var cards=player.storage[origin];
												if(get.itemtype(cards)=='card'){
													cards=[cards];
												}
												if(get.itemtype(cards)=='cards'){
													if(player.onremove=='discard'){
														player.$throw(cards);
													}
													if(player.onremove=='discard'||player.onremove=='lose'){
														game.cardsDiscard(cards);
														delete player.storage[origin];
													}
												}
											}
										}
										else if(Array.isArray(info.onremove)){
											for(var i=0;i<info.onremove.length;i++){
												delete player.storage[info.onremove[i]];
											}
										}
										else if(info.onremove===true){
											delete player.storage[origin];
										}
									}
									player.removeSkillTrigger(origin);
									if(!info.keepSkill){
										player.removeAdditionalSkill(origin);
									}
								}
								//获得新技能
								var info=lib.skill[skill];
								player.addSkillTrigger(skill);
								if(info.init2&&!_status.video){
									info.init2(player,skill);
								}
								if(info.mark){
									if(info.mark=='card'&&
										get.itemtype(player.storage[skill])=='card'){
											player.markSkill(skill,player,player.storage[skill]);
									}
									else if(info.mark=='card'&&
										get.itemtype(player.storage[skill])=='cards'){
											player.markSkill(skill,player,player.storage[skill][0]);
									}
									else if(info.mark=='image'){
										player.markSkill(skill,null,ui.create.card(null,'noclick').init([null,null,skill]));
									}
									else if(info.mark=='character'){
										var intro=info.intro.content;
										if(typeof intro=='function'){
											intro=intro(player.storage[skill],player);
										}
										else if(typeof intro=='string'){
											intro=intro.replace(/#/g,player.storage[skill]);
											intro=intro.replace(/&/g,get.cnNumber(player.storage[skill]));
											intro=intro.replace(/\$/g,get.translation(player.storage[skill]));
										}
										var caption;
										if(typeof info.intro.name=='function'){
											caption=info.intro.name(player.storage[skill],player);
										}
										else if(typeof info.intro.name=='string'){
											caption=info.name;
										}
										else{
											caption=get.translation(skill);
										}
										player.markSkillCharacter(skill,player.storage[skill],caption,intro);
									}
									else{
										player.markSkill(skill);
									}
								}
							}
						}
					}
					if(item.replaceSkillInfo){
						for(var origin in item.replaceSkillInfo){
							if(origin.slice(origin.length-5)=='_info'){
								var skill=origin.slice(0,origin.length-5)+'_changed_info';
								lib.translate[skill]=item.replaceSkillInfo[origin];
							}else{
								var skill=origin+'_changed';
								lib.translate[skill]=item.replaceSkillInfo[origin];
							}
						}
					}
					if(item.skill){
						let newSkill=name;
						if(!lib.skill[newSkill]){
							lib.skill[newSkill]=item.skill;
							lib.skill[newSkill].charlotte=true;
							lib.skill[newSkill].xjzh_qishuSkill=true;
							lib.skill[newSkill].superChocolate=true;
							lib.skill[newSkill].nobracket=true;
							lib.skill[newSkill].locked=true;
							lib.skill[newSkill].unique=true;
							if(lib.skill[newSkill].priority===undefined) lib.skill[newSkill].priority=5;
							if(item.skillName){
							    lib.translate[newSkill]=item.skillName;
							}else{
							    lib.translate[newSkill]=item.translate;
							}
							if(item.skillInfo){
							    lib.translate[newSkill+'_info']=item.skillInfo;
							    if(item.append_info) lib.translate[newSkill+'_append_info']=item.append_info;
							}else{
							    if(!item.noTranslate){
							        lib.translate[newSkill+'_info']=item.translate_info;
							        if(item.append_info) lib.translate[newSkill+'_append_info']=item.append_info;
							    }
							}
							let str=lib.translate[newSkill+"_info"],colorx=game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor");
							if(str){
								if(str.includes("控制")){
									let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_kongzhi');\">控制</a>`;
									str=str.replace(/控制/g,str2);
								};
								lib.translate[newSkill+"_info"]=str;
							}
						}
						player.addSkills(newSkill);
					}
				}
				var name1,name2,name3;
				if(player.isUnderControl(true)){
				    name1=choice[0];
				    name2=choice[1];
					name3=choice[2];
				}else{
				    name1=undefined;
					name2=undefined;
					name3=undefined;
				}
				initSkill(name1,player);
				initSkill(name2,player);
				initSkill(name3,player);
				player.xjzh_qishuyaojians[0]=name1;
				player.xjzh_qishuyaojians[1]=name2;
				player.xjzh_qishuyaojians[2]=name3;
			}
		}
	};

});