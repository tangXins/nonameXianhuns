window.XJZHimport(function(lib,game,ui,get,ai,_status){
    //部分代码借鉴自《玄武江湖》及《时空枢纽》
    //判断完成成就的角色是否是玩家且是否为成就需求角色
	lib.element.player.isCharacter=function(name) {
		return this.isUnderControl(true)&&get.playerName(this,name);
	};
	//每次载入游戏自动备份成就存档
	lib.arenaReady.push(function(){
		if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")) game.xjzhAchi.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
	});
	//成就列表
	lib.xjzh_achievement={
	    //武将成就
	    //一般是使用某个武将才能完成的特定成就
		character:{
			"再兴炎汉":{
				level:3,
				info:"使用esp刘协在一局游戏内发动〖天策〗、〖天命〗、〖谋变〗、〖中兴〗各一次且获得10次胜利。",
				extra:"奖励：〖天策〗、〖天命〗使用次数+1，〖谋变〗获得展示的牌可以立即使用之，〖中兴〗发动技能时，若游戏未结束你获得一点体力上限且回复体力至体力上限",
				progress:10,
				design:"吃朵棉花糖",
			},
			"百鸟朝凰":{
				level:1,
				info:"使用童渊发动〖朝凰〗在一局游戏内获得摸10张牌。",
				extra:"奖励：〖朝凰〗效果持续到下个回合结束",
				progress:10,
				design:"吃朵棉花糖",
			},
			"驱雷掣电":{
				level:3,
				info:"使用神张角在挑战模式获得胜利100次",
				extra:"奖励：神张角可以在身份模式使用",
				progress:100,
				design:"吃朵棉花糖",
				unlocked(){
					game.xjzhAchi.unlockedCharacter('xjzh_sanguo_espzhangjiao');
				},
			},
		},
		game:{
	        //对局成就
	        //一般是在对局中达成某些特定条件完成的特定成就
			"净化恶念":{
				level:3,
				info:"击败瓦尔申100次",
				extra:"奖励：挑战模式击败瓦尔申获得材料时额外获得1个材料",
				progress:100,
				design:"吃朵棉花糖",
			},
		},
		special:{
	        //特殊成就
	        //一般是为了解锁某些全局奖励完成的特定成就
			"重金属中毒者":{
				level:3,
				info:"累计使用100张【练气丹】",
				extra:"奖励：使用【练气丹】可选择摸一张牌或回复一点体力且有几率获得一张【练气丹】",
				progress:100,
				design:"吃朵棉花糖",
			},
			"刽子手":{
				level:3,
				info:"使用决斗者触发技能〖剑风〗击败60名武将",
				extra:"奖励：解锁POE武将处刑者；〖剑风〗可以额外选择一名角色",
				progress:60,
				design:"吃朵棉花糖",
				unlocked(){
					game.xjzhAchi.unlockedCharacter('xjzh_poe_chuxing');
				},
			},
			"完美斗士":{
				level:3,
				info:"使用决斗者触发技能〖挑战〗击败60名武将",
				extra:"奖励：解锁POE武将卫士；〖挑战〗未造成伤害时不需要再弃牌",
				progress:60,
				design:"吃朵棉花糖",
				unlocked(){
					game.xjzhAchi.unlockedCharacter('xjzh_poe_weishi');
				},
			},
			"火焰大师":{
				level:3,
				info:"使用女巫触发技能〖火球〗击败60名武将",
				extra:"奖励：解锁POE武将元素使；〖火球〗传导次数大于1会在技能结算时摸2张牌",
				progress:60,
				design:"吃朵棉花糖",
				unlocked(){
					game.xjzhAchi.unlockedCharacter('xjzh_poe_yuansushi');
				},
			},
			"莉莉丝的梦魇":{
				level:3,
				info:"在挑战模式击败莉莉丝60次",
				extra:"奖励：莉莉丝可以在其他模式使用",
				progress:60,
				design:"吃朵棉花糖",
				unlocked(){
					game.xjzhAchi.unlockedCharacter('xjzh_diablo_lilisi');
				},
			},
		},
		reward:{
		    "百鸟朝凰":{
		        info:"〖朝凰〗效果持续到下个回合结束",
		        level:1,
		        award:true,
		    },
		    "重金属中毒者":{
		        info:"使用【练气丹】可选择摸一张牌或回复一点体力且有几率获得一张【练气丹】",
		        level:3,
		        award:true,
		    },
			"刽子手":{
				info:"解锁POE武将处刑者；〖剑风〗可以额外选择一名角色",
				level:3,
				award:true,
			},
			"完美斗士":{
				info:"解锁POE武将卫士；〖挑战〗未造成伤害时不需要再弃牌",
				level:3,
				award:true,
			},
			"火焰大师":{
				info:"解锁POE武将元素使；〖火球〗传导次数大于1会在技能结算时摸2张牌",
				level:3,
				award:true,
			},
			"驱雷掣电":{
			    info:"神张角可以在身份模式使用",
				level:3,
				award:true,
			},
			"莉莉丝的梦魇":{
			    info:"莉莉丝可以在其他模式使用",
				level:3,
				award:true,
			},
			"再兴炎汉":{
				info:"奖励：〖天策〗、〖天命〗使用次数+1，〖谋变〗获得展示的牌可以立即使用之，〖中兴〗发动技能时，若游戏未结束你获得一点体力上限且回复体力至体力上限",
				level:3,
				award:true,
			},
		},
		/*
		"成就名称":{
			level:等级,
			type:类型,
			info:"达成条件",
			或
			info:function(){
				达成条件和复杂进度
			},
			extra:"附言",
			progress:function(isCheck){
				进度查询
			},
			或
			progress:达成需求次数,
		},
		*/
	};
	//本局内已完成的成就
	lib.xjzh_hasDoneAchievement=[];
	//胜利画面
    /*game.xjzh_winnerPlay=function(name,group){
        var background = ui.create.div('.xjzhw-background',document.body);
        var head = ui.create.div('.xjzh-winner-head');
        var biankuang = ui.create.div('.xjzh-winner-biankuang');
        head.setBackgroundImage('extension/仙家之魂/skin/yuanhua/'+name+'.jpg');
        background.appendChild(head);
        background.appendChild(biankuang);
        var text = ui.create.div('.xjzh-winner-text');
        var say = lib.xjzh_winnerSay[name];
        if(say){
            text.innerHTML = say;
        }
        background.appendChild(text);
        var win = ui.create.div('.xjzh-win-text',background);
        win.innerHTML = "胜 利";
        text.style.color = 'yellow';
		if(['XING','shen'].includes(group)){
			background.setBackgroundImage('extension/仙家之魂/image/background/xjzh_pic_background'+group.slice(2)+'.jpg');
		}
        background.animate('start');
        setTimeout(function(){
            var button = ui.create.div('.xjzh-win-close-button',background);
            button.innerHTML = "关闭";
            button.addEventListener('click',function(){
                background.delete();
            });
        },1000);
		if(lib.xjzh_hasDoneAchievement.length){
			var hasDoneAchi=ui.create.div('.xjzh-achi-hasDone',background);
			let text2='本局达成的成就：';
			let list=lib.xjzh_hasDoneAchievement;
			for(let i=0;i<list.length;i++){
				let names=game.xjzhAchi.ofName(list[i]);
				let info=game.xjzhAchi.info(names[1],names[0]);
				if(info&&info.name){
					text2+='<br>&ensp;〈'+info.name+'〉';
				}else{
					text2+='<br>&ensp;〈'+names[1]+'〉';
				}
				if(i>=4) break;
				if(list.length>5&&i==3){
					text2+='<br>&emsp;......';
					break;
				}
			}
			hasDoneAchi.innerHTML=text2;
		}
        return background;
    };*/
    game.xjzh_filterEligible=function(){
		if(!_status.xjzhDebug){
			if(!game.me||!game.me.name||game.me.name.slice(0,5)!='xjzh_') return false;
			if(get.mode()=="identity"){
			    if(game.countPlayer2()<5||game.countPlayer2()>8) return false;
			}
			if(_status.xjzhCheatCount) return false;
		}
		return true;
    };
    lib.onover.push(function(ret){
        if(ret){
            //esp刘协“再兴炎汉”成就
            if(get.mode()=="identity"&&game.me&&get.playerName(game.me,"xjzh_sanguo_espliuxie")){
                var history=game.me.getAllHistory('useSkill');
                var obj=new Object(),list=["xjzh_sanguo_tiance","xjzh_sanguo_tianming","xjzh_sanguo_moubian","xjzh_sanguo_zhongxing"];
                for(var i=0;i<history.length;i++){
                    if(Object.keys(history[i]).includes("skill")){
                        if(typeof obj[history[i].skill]=="undefined"){
                            if(list.includes(history[i].skill)) obj[history[i].skill]=1;
                        }
                    }
                }
                if(Object.keys(obj).length>=4){
                    if(!game.xjzhAchi.hasAchi('再兴炎汉','character')){
					    game.xjzhAchi.addProgress('再兴炎汉','character',1);
                    }
                }
            }
            //神张角“驱雷掣电”成就
            if(get.mode()=="boss"&&game.me&&game.me==game.boss&&get.playerName(game.me,"xjzh_boss_zhangjiao")){
                if(!game.xjzhAchi.hasAchi('驱雷掣电','character')){
					game.xjzhAchi.addProgress('驱雷掣电','character',1);
                }
            }
            //“莉莉丝的梦魇”成就
            if(get.mode()=="boss"&&game.me&&game.me!=game.boss&&get.playerName(game.boss,"xjzh_boss_lilisi")){
                if(!game.xjzhAchi.hasAchi('莉莉丝的梦魇','special')){
					game.xjzhAchi.addProgress('莉莉丝的梦魇','special',1);
                }
            }
            //“净化恶念”成就
            if(get.mode()=="boss"&&game.me&&game.me!=game.boss&&get.playerName(game.boss,"xjzh_boss_waershen")){
                if(!game.xjzhAchi.hasAchi('净化恶念','game')){
					game.xjzhAchi.addProgress('净化恶念','game',1);
                }
            }
            //普通成就
            if(get.mode()=="identity"&&game.me&&!get.config('double_character')&&get.xjzh_wujiang(game.me)){
                let name=get.playerName(game.me)[0];
                if(!game.xjzhAchi.hasAchi(lib.xjzhTitle[name],'character')){
					game.xjzhAchi.addProgress(lib.xjzhTitle[name],'character',1);
                }
            }
        }
    });
	//成就书
	if(!game.getExtensionConfig("仙家之魂","xjzhAchiStorage")){
		let key={
			got:[],
			progress:{},
			date:{},
			character:[]
		};
		game.saveExtensionConfig('仙家之魂',"xjzhAchiStorage",key);
	};

	_status.xjzhCheatCount=0;
    var xjzh_cheatChecked=function(){
        if(window.xjzhDebug&&window.xjzhDebug()){
            //调试模式不计算
            return;
        }
        if(!_status.xjzhCheatCount){
            _status.xjzhCheatCount=1;
        }else{
            _status.xjzhCheatCount++;
        }
    };
    var divFunction=ui.create.div;
    ui.create.div=function(){
        var ret=divFunction.apply(this,arguments);
        if(arguments[0]=='.menubutton.round.highlight'){
            if(arguments[1]=='执'){
                ret.listen(function(){
                    xjzh_cheatChecked();
                });
            }else if(arguments[1]=='作'){
                ret.listen(function(){
                    xjzh_cheatChecked();
                });
            }
        }
        return ret;
    };

	game.xjzhAchi={
		//初始化成就系统数据
		init:function(){
			if(this.inited) return;
			let {...characters}=lib.characterPack.XWTR;
			let {...characters2}=lib.characterPack.XWSG;
			let {...characters3}=lib.characterPack.XWCS;
			let {...characters4}=lib.characterPack.XWTZ;
			let {...characters5}=lib.characterPack.XWDM;
			let xianhuns=Object.assign(characters,characters2,characters3,characters4,characters5);

			console.log(xianhuns)

			if(xianhuns){
				var firstWinSet=function(name){
					let level=1;
					if(lib.character[name][4].some(evt=>{
						return !['forbidai','unseen'].includes(evt);
					})){
						lib.xjzh_achievement['character'][lib.xjzhTitle[name]]={
							name:lib.xjzhTitle[name],
							info:"使用"+lib.translate[name]+"获得一场胜利。",
							level:level,
							design:"吃朵棉花糖",
						}
					};
				};
				for(let name in xianhuns){
				    let bossCharacterList=["xjzh_boss_waershen","xjzh_boss_geligaoli","xjzh_boss_duruier","xjzh_boss_qier","xjzh_boss_bingchuanjushou","xjzh_boss_lilisi"];
				    if(bossCharacterList.includes(name)) continue;
					if(!lib.xjzhTitle[name]) continue;
					if(!lib.translate[name]) continue;
					firstWinSet(name);
				}
			}
			if(!lib.config.xjzhAchiNew){
				this.reset();
				game.saveConfig('xjzhAchiNew',true);
			}
			this.inited=true;
		},
		//重置已获得
		reset:function(){
			let key={
				got:[],
				progress:{},
				date:{},
				character:[]
			};
			this.saveConfig(key);
		},
		//保存设置
		saveConfig:async function(key){
			await game.saveExtensionConfig("仙家之魂","xjzhAchiStorage",key);
			let list=JSON.stringify(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
			let data="成就存档备份："+list.slice(0);
			game.writeFile(lib.init.encode(data),'extension/仙家之魂/save','成就存档备份.json',function(err){});
		},
		//计算成就数
		amount:function(type){
			var types=['character','game','special'];
			if(type){
				if(!types.includes(type)) return -1;
				return Object.keys(lib.xjzh_achievement[type]).length;
			}
			var sum=0;
			for(let i of types){
				sum+=Object.keys(lib.xjzh_achievement[i]).length;
			}
			return sum;
		},
		//计算成就点数
		calculateScore:function(){
			var gots=game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got;
			if(!gots.length) return 0;
			var sum=0;
			for(var i of gots){
				let names=this.ofName(i);
				let info=this.info(names[1],names[0]);
				if(info&&info.level) sum+=info.level;
			}
			game.log(game.xjzhAchi.checkList())
			return sum;
		},
		//计算已完成成就数
		amountOfGained:function(type){
			var gots=game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got;
			if(type){
				var type2={'character':'character','game':'game','special':'special'}[type];
				if(type2){
					var count=0;
					for(let i of gots){
						if(i.indexOf(type2)==0) count++;
					}
					return count;
				}
				return -1;
			}
			return gots.length;
		},
		//获取成就队列、并按指定方式排序
		checkList:function(type,filter,sort){
			var list=[];
			var map=lib.xjzh_achievement[type];
			if(map){
				if(!filter) filter=function(){
					return true;
				};
				if(!sort) sort=function(){
					return game.xjzhAchi.info(a).level-game.xjzhAchi.info(b).level;
				};
				for(let name in map){
					if(filter(name)){
						list.push(name);
					}
				}
				list.sort(sort);
			}
			return list;
		},
		//加入本局已完成成就记录
		addDone:function(name){
			lib.xjzh_hasDoneAchievement.add(name);
		},
		//弹出达成新成就的提示框
		popupDialog:function(name){
			game.playAudio('..','extension','仙家之魂/audio/other','achievement_complete.mp3');
			var dialog=ui.create.div('.xjzh-dialog-completeAchi',document.body);
			setTimeout(function(){
				dialog.delete();
			},2000);
			try{
				dialog.innerHTML=this.getInfoName(name);
			} catch(e){
				return 'error';
			}
			return dialog.innerHTML;
		},
		//获取成就信息
		info:function(name,type){
			try{
				return lib.xjzh_achievement[type][name];
			}catch(e){
				return null;
			}
		},
		unlock:function(name){
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			let list=this.ofName(name)
			let info=this.info(list[1],list[0]);
			if(info&&info.unlocked) info.unlocked();
		},
		//需要成就解锁的武将保存
		unlockedCharacter(){
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			let characters=Array.prototype.slice.call(arguments);
			if(characters.filter(name=>!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.includes(name)).length){
				let str= '解锁新角色';
				for(let i=0;i<characters.length;i++){
					if (!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.includes(characters[i])){
						game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.push(characters[i]);
						str +=''+ get.translation(characters[i]);
					}
				}
				window.xjzhOpenLoading(str);
				this.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
			}
		},
		//达成新成就
		got:function(name){
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name)) return;
			game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.push(name);
			let date=new Date();
			game.getExtensionConfig("仙家之魂","xjzhAchiStorage").date[name]=(new Date()).getTime();
			this.addDone(name);
			this.popupDialog(name);
			this.unlock(name);
			this.gainTokens(name);
			this.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"))
		},
		//完成成就获取一定量的奖励
		gainTokens:function(name){
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			let list=this.ofName(name)
			let info=this.info(list[1],list[0]);
			let suipian=(info.level)*50;
			let tokens=info.level;
			game.xjzh_changeTokens(tokens);
			game.xjzh_changeSuipian(suipian);
		},
		//增加成就进度
		addProgress:function(name,type,num){
			//判断是否满足获得成就的条件
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			var info=this.info(name,type);
			if(!info) return;
			var name2=this.nameOf(name,type);
			if(!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]){
				game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]=0;
			}
			game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]+=num;
			if(!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character) game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character=[];
			this.updataProgress(name,type);
		},
		//重置某一个成就
		removeAchi:function(name,type){
			var info=this.info(name,type);
			if(!info) return;
			var name2=this.nameOf(name,type);
			if(!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]) return;
			game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]=0;
			if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name2)) game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.remove(name2);
			if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").date[name2]) delete game.getExtensionConfig("仙家之魂","xjzhAchiStorage").date[name2];
			this.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
		},
		//更新成就进度
		updataProgress:function(name,type){
			var info=this.info(name,type);
			if(!info) return;
			var name2=this.nameOf(name,type);
			if(info.progress){
				if(typeof info.progress=='number'){
					if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]>=info.progress) this.got(name2);
				}else if(typeof info.progress=='function'){
					if(info.progress(true)) this.got(name2);
				}
			}else if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]){
				this.got(name2);
			}else return;
			this.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
		},
		//直接达成成就（不触发任何附属计算）
		directGot:function(name){
			if(!_status.event.AchiCover){
    			if(!game.xjzh_filterEligible()) return false;
			}
			game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.add(name);
			this.saveConfig(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
		},
		//判断成就是否已达成
		hasAchi:function(name,type){
			if(typeof type=='string'){
				let name2=this.nameOf(name,type);
				return game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name2);
			}
			return game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name);
		},
		//成就名存储转化
		nameOf:function(name,type){
			return {'character':'character','game':'game','special':'special'}[type]+','+name;
		},
		//成就名存储还原（返回值：[类别,成就名]）
		ofName:function(name){
			var names=name.split(',',2);
			return [
				{'character':'character','game':'game','special':'special'}[names[0]],
				names[1]
			];
		},
		//获得成就文本
		getInfoName:function(name){
			var names=this.ofName(name);
			names[0]={'character':'character','game':'game','special':'special'}[names[0]];
			var info=this.info(names[1],names[0]);
			if(info&&info.name) return info.name;
			return names[1];
		},
		//打开仙家之魂成就界面
		openAchievementMainPage:function(){
			game.pause2();
			//覆盖图层
			var bookWindow=ui.create.div('.xjzh-bookWindow');
			document.body.appendChild(bookWindow);
			//背景图层
			var bk=ui.create.div('.xjzh-bookWindow-bk',bookWindow);
			var setSize=function(){
				var screenWidth=ui.window.offsetWidth;
				var screenHeight=ui.window.offsetHeight;
				var whr=1.77778;
				var width;
				var height;
				if(screenWidth/whr>screenHeight){
					height=screenHeight;
					width=height*whr;
				}else{
					width=screenWidth;
					height=screenWidth/whr;
				}
				bk.style.height=Math.round(height)+"px";
				bk.style.width=Math.round(width)+"px";
			};
			setSize();
			var resize=function(){
				setTimeout(setSize,500);
			};
			lib.onresize.push(resize);
			//退出按钮
			var exit=ui.create.div('.xjzh-bookWindow-return',bk);
			lib.onresize.push(resize);
			exit.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				//game.playXwAudio('xwjh_voc_cjdianji',null,true);
			});
			//打开特殊成就
			var button_gotoSV=ui.create.div('.xjzh-bookWindow-openAchi-special',ui.create.div('.xjzh-bookWindow-openAchi-special-bk',bk));
			button_gotoSV.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementView('special');
			});
			//打开对局成就
			var button_gotoGV=ui.create.div('.xjzh-bookWindow-openAchi-game',bk);
			button_gotoGV.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementView('game');
			});
			//打开人物成就
			var button_gotoCV=ui.create.div('.xjzh-bookWindow-openAchi-character',bk);
			button_gotoCV.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementView('character');
			});
			//显示已得成就分数
			var scoreSheet=ui.create.div('.xjzh-bookWindow-scoreSheet',ui.create.div('.xjzh-bookWindow-scoreSheet-bk',bk));
			scoreSheet.innerHTML=this.calculateScore();
			//打开成就奖励
			var button_reward=ui.create.div('.xjzh-bookWindow-openReward',bk);
			button_reward.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementView('reward');
			});
			var decorate3=ui.create.div('.xjzh-bookWindow-openReward-decorate',bk);
			//主页书签
			//var mainPage=ui.create.div('.xjzh-bookWindow-page-main',bk);
			//奇术要件书签
			if(game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")){
			    var partsPage=ui.create.div('.xjzh-bookWindow-page-parts',bk);
			    var partsPage_box=ui.create.div('.xjzh-bookWindow-page-parts-box',partsPage);
    			partsPage_box.listen(function(){
    				bookWindow.remove();
    				game.resume2();
    				lib.onresize.remove(resize);
    				game.xjzhAchi.openAchievementEquipPage();
    			});
    		}
		},
		//打开奇术要件视窗
		openAchievementEquipPage:function(){
		    if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
			//覆盖图层
			var bookWindow=ui.create.div('.xjzh-bookWindow');
			document.body.appendChild(bookWindow);
			//背景图层
			var bk=ui.create.div('.xjzh-bookWindow-bk',bookWindow);
			var setSize=function(){
				var screenWidth=ui.window.offsetWidth;
				var screenHeight=ui.window.offsetHeight;
				var whr=1.77778;
				var width;
				var height;
				if(screenWidth/whr>screenHeight){
					height=screenHeight;
					width=height*whr;
				}else{
					width=screenWidth;
					height=screenWidth/whr;
				}
				bk.style.height=Math.round(height)+"px";
				bk.style.width=Math.round(width)+"px";
			};
			setSize();
			var resize=function(){
				setTimeout(setSize,500);
			};
			lib.onresize.push(resize);
			//显示用户名
			var qishuName=ui.create.div(bk,{
				left:'34%',top:'24.8%',
				transform:'translate(-50%, -50%)',
				width:'400px',height:'270px',
				textAlign:'left',
			});
			if(lib.config.xjzh_qishuyaojians.level===undefined||lib.config.xjzh_qishuyaojians.exp===undefined) game.xjzh_levelUp();
			var qishuNameNum=lib.config.xjzh_qishuyaojians.level*(100+(lib.config.xjzh_qishuyaojians.level*10));
			var qishuNameStr=`用户名：${lib.config.xjzh_qishuyaojians.name}<br>等级：${lib.config.xjzh_qishuyaojians.level}<br>经验：${lib.config.xjzh_qishuyaojians.exp}/${qishuNameNum}`;
			qishuName.innerHTML=qishuNameStr;
			//qishuName.innerHTML="用户名：<span style=\"color:#f9ed89;font-family:xinwei\"><font size =5px>"+lib.config.xjzh_qishuyaojians.name+"</font></span>";
			//退出按钮
			var exit=ui.create.div('.xjzh-bookWindow-return',bk);
			lib.onresize.push(resize);
			exit.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
			});
			//主页书签
			var mainPage=ui.create.div('.xjzh-bookWindow-page-main',bk);
			mainPage.listen(function(){
				bookWindow.remove();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementMainPage();
			});
			//兑换码兑换处
			var duihuan=ui.create.div('.xjzh-duihuan-gain',bk);
			var duihuanBox=ui.create.div(duihuan,{
				left:'0',width:'100%',
				transform:'rotateZ(27deg)',
				opacity:'0.2',
				top:'30%',height:'30%',
			});
			duihuanBox.listen(function(){
				var blank=ui.create.div(ui.window,{
					zIndex:'1000',
					left:'0',width:'100%',
					top:'0',height:'100%'
				});
				var inputDiv=ui.create.div(blank,{
					left:'50%',top:'30%',
					transform:'translate(-50%, -50%)',
					width:'400px',height:'270px',
					textAlign:'center',
					backgroundSize:'100%',
					backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/duihuanma.png')",
				});
				var input=ui.create.node('input',inputDiv,{
					top:'110px',left:'80px',
					position:'absolute',
					width:'230px',height:'20px',
					background:'none',borderStyle:'none'
				});
				input.id='xjzh_input';
				var okBtm=ui.create.div(inputDiv,{
					left:'153px',width:'100px',
					bottom:'55px',height:'35px',
				},function(){
					var value=document.getElementById('xjzh_input').value;
					var url="extension/仙家之魂/keys/兑换列表.json";
                    game.readFileAsText(url,function(data){
                        var keys=JSON.parse(lib.init.decode(data));
					    var keysList=Object.keys(keys);
    					if(keysList.includes(value)){
    					    if(game.xjzh_hasKeys(value)){
        						window.xjzhOpenLoading('你已经兑换过了！');
        					}else{
        					    var str="兑换成功！获得：";
        					    var object=keys[value];
        					    for(var i in object){
									if(i=="date"){
										let time=object["date"]
										if(get.xjzh_checkDate(time[0],time[1])==false){
											window.xjzhOpenLoading(`兑换码已超出兑换时间！<br><br>兑换时间为:<br>${time[0]}——${time[1]}`);
											break;
										}
									}
            					    switch(i){
            						    case "jingpo":
            					            game.xjzh_changeTokens(object[i]);
            					            str+="<br>&emsp;&emsp;精魄（"+object[i]+"个）";
            					        break;
            					        case "suipian":
            					            game.xjzh_changeSuipian(object[i]);
            							    str+="<br>&emsp;&emsp;碎片（"+object[i]+"个）";
            							break;
            							case "cailiao":
            							    for(var k in object[i]){
            							        game.xjzh_changeCailiao(k,object[i][k]);
            						            str+="<br>&emsp;&emsp;"+get.xjzh_cailiaoTranslate(k)+"：（"+object[i][k]+"个）";
            						        }
            						    break;
        							}
        					    }
        					    game.xjzh_saveKeys(value);
        					    if(str.length>8) game.xjzh_qishuWinner("神秘兑换",str);
        					}
    					}else{
    					    window.xjzhOpenLoading('兑换码错误或已失效！');
    					}
                    });
                });



				/*function(){
					var value=document.getElementById('xjzh_input').value;
					const url='https://101.34.7.123/xjzh/keys/兑换列表.json';
					fetch(url,{
						method: 'GET',
						mode:'cors',// 允许发送跨域请求
						credentials: 'include',
						headers: {
							'Cache-Control': 'no-cache'//不缓存
						}
					})
					.then(response => {
						if (!response.ok) throw response;
						return response.text();
					})
					.then(text => {
					    var keys=JSON.parse(lib.init.decode(text));
					    var keysList=Object.keys(keys);
    					if(keysList.includes(value)){
    					    if(game.xjzh_hasKeys(value)){
        						window.xjzhOpenLoading('你已经兑换过了！');
        					}else{
        					    game.xjzh_saveKeys(value)
        					    var str="兑换成功！获得：";
        					    var object=keys[value]
        					    for(var i in object){
            					    switch(i){
            						    case "jingpo":
            					            game.xjzh_changeTokens(object[i]);
            					            str+="<br>&emsp;&emsp;精魄（"+object[i]+"个）";
            					        break;
            					        case "suipian":
            					            game.xjzh_changeSuipian(object[i]);
            							    str+="<br>&emsp;&emsp;碎片（"+object[i]+"个）";
            							break;
            							case "cailiao":
            							    for(var k in object[i]){
            							        game.xjzh_changeCailiao(k,object[i][k]);
            						            str+="<br>&emsp;&emsp;"+get.xjzh_cailiaoTranslate(k)+"：（"+object[i][k]+"个）";
            						        }
            						    break;
        							}
        					    }
        					    game.xjzh_qishuWinner("神秘兑换",str);
        					}
    					}else{
    					    window.xjzhOpenLoading('兑换码错误或已失效！');
    					}
					})
					.catch(e => {
						alert('网络请求错误');
					});
				});*/
				var cancelBtm=ui.create.div(inputDiv,{
					right:'35px',width:'25px',
					top:'42px',height:'25px',
				},function(){
					blank.delete();
				});
			});
			//恩赐书签
			var equipRandom=ui.create.div('.xjzh-equipPage-equipRandom',bk);
			equipRandom.listen(function(){
				bookWindow.remove();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementChoujiang();
			});
			//翻页箭头
			var arrow=ui.create.div('.xjzh-equipPage-arrow',bk);
			arrow.listen(function(){
				state.pageNum++;
				state.refreshPage();
			});
			var arrow2=ui.create.div('.xjzh-equipPage-arrow2',bk);
			arrow2.listen(function(){
				state.pageNum--;
				state.refreshPage();
			});

			// 创建节流函数
			function throttle(func, delay) {
				let lastTime = 0;
				return function() {
					const now = new Date().getTime();
					if (now - lastTime > delay) {
						lastTime = now;
						func.apply(this, arguments);
					}
				};
			}

			// 使用节流包装原有处理函数
			const handleWheel = throttle(function(event) {
				event.preventDefault();

				// 获取总页数并更新页码
				const totalPages = Math.ceil(state.equipNum / 8);

				if (event.deltaY < 0) { // 向上滚动
					state.pageNum = (state.pageNum - 1 + totalPages) % totalPages; // 循环回到上一页
				} else { // 向下滚动
					state.pageNum = (state.pageNum + 1) % totalPages; // 循环进入下一页
				}

				state.refreshPage();
			}, 100); // 限制每100毫秒内只执行一次

			// 添加节流后的事件监听器
			bk.addEventListener('wheel', handleWheel);

			//专属配件书签
			var zhuanshu=ui.create.div('.xjzh-equipPage-zhuanshu',bk);
			zhuanshu.listen(function(){
				if(state.zhuanshu_on) return;
				state.zhuanshu_on=!state.zhuanshu_on;
				state.tongyong_on=!state.tongyong_on;
				state.pageNum=0;
				state.refreshPage();
			});
			//通用配件书签
			var tongyong=ui.create.div('.xjzh-equipPage-tongyong',bk);
			tongyong.listen(function(){
				if(state.tongyong_on) return;
				state.zhuanshu_on=!state.zhuanshu_on;
				state.tongyong_on=!state.tongyong_on;
				state.pageNum=0;
				state.refreshPage();
			});

			//材料按钮
			var cailiaoBox=ui.create.div('.xjzh-equipPage-cailiao',bk);
			cailiaoBox.listen(function(){
			    var cailiaoBoxRemove=ui.create.div(ui.window,{
                    zIndex:10000,
                    width:'100%',height:'100%'
                });
        	    var obj=ui.create.div('.xjzh-dialog',cailiaoBoxRemove);
        	    obj.style.transformOrigin="center";
        	    var num=get.rand(0,5);
        	    var url="extension/仙家之魂/css/images/ui/";
        	    var url2="xjzh_info";
        	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
    			var cailiaoBeijing=ui.create.div('.xjzh-dialog-name',obj);
			    var cailiaoText=ui.create.div('.xjzh-dialog-text',obj);
                cailiaoBoxRemove.listen(function(){
                    cailiaoBoxRemove.delete();
                });
                var cailiaoStr="";
                if(lib.config.xjzh_qishuyaojians.cailiao){
                    var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
                    var cailiaoList2=Object.keys(cailiaoList);
                    for(var i of cailiaoList2){
                        cailiaoStr+=""+cailiaoList[i][0]+"：剩余"+cailiaoList[i][1]+"个<br>";
                    }
                }else{
                    cailiaoStr+="你的背包中没有任何材料";
                }
                cailiaoBeijing.innerHTML="材料背包";
                cailiaoText.innerHTML=cailiaoStr;
			});
			//函数方法
			var state={
				pageNum:0,
				equipNum:0,
				tongyong_on:false,
				zhuanshu_on:true,
				map:{},
				refreshMap:function(){
					var map=state.map;
					for(var i in lib.xjzh_qishuyaojians){
						map[i]=0;
					}
					for(var i of lib.config.xjzh_qishuyaojians.bag){
						if(map[i]!==undefined) map[i]++;
					}
				},
				showing:[],
				filter:function(item){
					let info=get.xjzh_equipInfo(item);
					if(!info) return false;
					if(typeof info.filter=='string') return state.zhuanshu_on;
					return state.tongyong_on;
				},
				refreshPage:function(){
					//刷新书签
					if(state.zhuanshu_on) zhuanshu.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/zhuanshu_on.png')";
					else zhuanshu.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/zhuanshu.png')";
					if(state.tongyong_on) tongyong.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/tongyong_on.png')";
					else tongyong.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/tongyong.png')";
					//刷新奇术要件
					for(var i=0;i<state.showing.length;i++){
						state.showing[i].remove();
					}
					state.showing.length=0;
					if(state.pageNum==0) arrow2.style.display='none';
					else arrow2.style.display='inline';
					state.equipNum=0;
					for(var i in lib.xjzh_qishuyaojians){
						if(state.filter(i)) state.equipNum++;
					}
					if((state.equipNum/8-1)<=state.pageNum) arrow.style.display='none';
					else arrow.style.display='inline';
					var num=state.pageNum*8,list=[];
					//信息窗口
					var intro=ui.create.div(bookWindow,{
						zIndex:'51',
						width:'300px',
						textAlign:'left',
						backgroundColor:'#412812',
						transition:'left 0s,top 0s'
					});
					for(var equip in state.map){
						if(state.filter(equip)) list.push(equip);
					}
					list.sort(function(a,b){
						var level1=get.xjzh_equipInfo(a).level||1,level2=get.xjzh_equipInfo(b).level||1;
						if(level1>level2) return 1;
						if(level1<level2) return -1;
						if(a>b) return 1
						return -1;
					});
					for(var i=0;i<8&&num+i<list.length;i++){
						var equip=list[num+i];
						var equipShow=ui.create.div('.xjzh-equipPage-equipShow',bk);
						state.showing.push(equipShow);
						equipShow.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cards/"+equip+".jpg')";
						var index=i;
						if(index<4) equipShow.style.top='15%';
						else equipShow.style.top='52%';
						switch(i){
							case 0: case 4:
								equipShow.style.left='18%';
								break;
							case 1: case 5:
								equipShow.style.left='33%';
								break;
							case 2: case 6:
								equipShow.style.left='54%';
								break;
							default:
								equipShow.style.left='69%';
						}
						equipShow.item=equip;
						equipShow.listen(function(){
							bookWindow.delete();
							game.resume2();
							lib.onresize.remove(resize);
							game.xjzhAchi.openAchievementEquipIntro(this.item,state);
						});
						var equipHave=ui.create.div(equipShow,{
    						left:'11%',top:'82.5%',
						});
						equipHave.innerHTML="<span style=\"color:#FFFFFF;font-family:xinwei\"><font size =4px>拥有："+state.map[equip]||0+"个</font></span>";
						//鼠标移动到图片上出现弹窗
						equipShow.onmouseover=function(event){
							var item=get.xjzh_equipInfo(this.item);
							if(item==undefined) return;
							var str='';
							str+='<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
							+item.translate+'</span><br>';
							str+=item.translate_info+'</span>';
							intro.innerHTML=str;
							bookWindow.appendChild(intro);
							intro.style.left=(event.clientX+10)/game.documentZoom+'px';
							intro.style.top=(event.clientY+10)/game.documentZoom+'px';
							intro.show();
						};
						equipShow.onmousemove=function(event){
							intro.style.left=(event.clientX+10)/game.documentZoom+'px';
							intro.style.top=(event.clientY+10)/game.documentZoom+'px';
						};
						equipShow.onmouseout=function(){
							intro.hide();
						};
					}
				}
			};
			//奇术要件展示
			if(lib.config.xjzh_qishuyaojians.bag){
				state.refreshMap();
				state.refreshPage();
			}
		},
		//打开奇术要件信息页面
		openAchievementEquipIntro:function(item,state){
		    if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
			//覆盖图层
			var bookWindow=ui.create.div('.xjzh-bookWindow');
			document.body.appendChild(bookWindow);
			//背景图层
			var bk=ui.create.div('.xjzh-bookWindow-bk',bookWindow,{
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/bk.png')",
			});
			//退出按钮
			var exit=ui.create.div('.xjzh-bookWindow-return',bk);
			exit.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
			});
			//主页书签
			var mainPage=ui.create.div('.xjzh-bookWindow-page-main',bk);
			mainPage.listen(function(){
				bookWindow.remove();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementMainPage();
			});
			//奇术要件书签
			var equipMark=ui.create.div('.xjzh-equipPage-equipMark',bk);
			var equipMarkBox=ui.create.div(bk,{
				top:'60%',left:'12%',
				height:'13%',width:'5%',
				zIndex:'3',
			});
			equipMarkBox.listen(function(){
				bookWindow.remove();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementEquipPage();
			});
			//奇术要件名字
			var info=get.xjzh_equipInfo(item);
			var nameDialog=ui.create.div(bk,{
				top:'8%',height:'8%',
				left:'53%',width:'20%',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/kuang.png')",backgroundSize:'100%',
			});
			var nameText=ui.create.div(bk,{
				top:'10.5%',height:'auto',
				left:'53%',width:'21%',
				textAlign:'center',fontFamily:'xinwei',
				color:'rgb(185, 111, 1)',letterSpacing:'3px',
				transform:'rotateZ(-3.5deg)',textShadow:'none',
			})
			nameText.innerHTML=info.translate;
			//奇术要件图片
			var bk2=ui.create.div('.xjzh-bookWindow-bk',bookWindow,{
				zIndex:'0',
			});
			var mengban=ui.create.div(bk2,{
				top:'17%',height:'38%',
				left:'50%',width:'33%',
				backgroundRepeat:'no-repeat',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/lihui/"+item+".jpg')",backgroundSize:'100%',
			})
			//奇术要件介绍
			var textIntro=ui.create.div(bk,{
				top:'18%',height:'31%',
				left:'53%',width:'28%',
				fontFamily:'shousha',color:'rgb(46, 45, 45)',letterSpacing:'3px',
				overflow:'auto',textShadow:'none',
			});
			textIntro.innerHTML=info.translate_info;
			textIntro.hide();
			//切换按钮
			var changeBtm=ui.create.div(bk,{
				top:'50%',height:'5%',
				left:'77%',width:'3%',
				backgroundRepeat:'no-repeat',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/changeBtm.png')",backgroundSize:'100%',
			});
			changeBtm.listen(function(){
				if(mengban.classList.contains('hidden')){
					textIntro.hide();
					mengban.show();
				}else{
					mengban.hide();
					textIntro.show();
				}
			});
			//分割线
			var line=ui.create.div(bk,{
				top:'55%',height:'3%',
				left:'52%',width:'30%',
				backgroundPosition:'0% 50%',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/xian.png')",backgroundSize:'100%',
			})
			//装配文字
			var numText=ui.create.div(bk,{
				top:'58%',height:'5%',
				left:'53%',width:'30%',
				color:'rgb(41, 25, 1)',fontFamily:'xingkai',
				fontSize:ui.window.offsetHeight*0.04+'px',textShadow:'none'
			});
			var num=state.map[item]||0;
			var info=get.xjzh_equipInfo(item);
			numText.innerHTML='装配选择：（剩余：'+num+'）';
			//奇术要件分解按钮
			if(num>0){
    			var qishudisen=ui.create.div(bk,{
    				top:'82%',height:'31%',
    				left:'56%',width:'28%',
    				fontFamily:'shousha',color:'rgb(46, 45, 45)',letterSpacing:'3px',
    				fontSize:"60px",
    				overflow:'auto',textShadow:'none',
    			});
    			qishudisen.innerHTML="分解";
    			qishudisen.listen(function(){

				    var lvx=info.level;
            		var numberx=0;
            		switch(lvx){
            		    case 1:
            		        numberx=15;
            		    break;
            		    case 2:
            		        numberx=30;
            		    break;
            		    case 3:
            		        numberx=50;
            		    break;
            		    case 4:
            		        numberx=65;
            		    break
            		    case 5:
            		        numberx=105;
            		    break;
            		};

                    game.xjzh_loseEquip(item);
                    game.xjzh_changeSuipian(numberx);

                    var loading=window.xjzhOpenLoading();
            		loading.subViews.text.innerHTML=`获得${Math.floor(numberx)}个碎片`;

        			setTimeout(function(){
                        loading.delete();
                    },1500);

                    bookWindow.delete();
				    game.resume2();
				    lib.onresize.remove(resize);

				    game.xjzhAchi.openAchievementEquipIntro(item,state);

				    game.delayx();
    			});
    			//奇术要件升级按钮
    			var qishuLvUp=ui.create.div(bk,{
    				top:'82%',height:'31%',
    				left:'70%',width:'28%',
    				fontFamily:'shousha',color:'rgb(46, 45, 45)',letterSpacing:'3px',
    				fontSize:"60px",
    				overflow:'auto',textShadow:'none',
    			});
    			qishuLvUp.innerHTML="升级";
    			qishuLvUp.listen(function(){
    			    game.xjzh_qishuLevel(item);
    			});
    		};
			//装配选择
			var characterDialog=null;
			state.refreshDialog=function(){
				state.refreshMap();
				var num=state.map[item]||0;
				numText.innerHTML='装配选择：（剩余：'+num+'）';
				if(characterDialog) characterDialog.remove();
				characterDialog=ui.create.div(bk,{
					top:'65%',height:'15%',
					left:'53%',width:'30%',
					borderRadius:'15px',
					backgroundColor:'rgba(88, 53, 2, 0.806)',
					overflowX:'auto',
				});
				characterDialog.addEventListener('wheel',function(event){
					event.preventDefault();
					this.scrollLeft+=event.deltaY;
				});
				var equiped=get.xjzh_equipPlayer(item);
				var i=0;
				for(;i<equiped.length;i++){
					var kuang=ui.create.div(characterDialog,{
						top:'5%',height:'90%',
						left:i*30+2+'%',width:'25%',
					});
					kuang.setBackground(equiped[i],'character');
					kuang.player=equiped[i];
					kuang.listen(function(){
						game.xjzh_unEquip(item,this.player);
						state.refreshDialog();
					});
				}
				if(num>0){
					var addPlayer=ui.create.div(characterDialog,{
						top:'5%',height:'90%',
						left:i*30+2+'%',width:'25%',
						backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/touxiang.png')",backgroundSize:'100%',
					});
					addPlayer.listen(function(){
						game.xjzhAchi.choosePlayer(item,state,bk);
					});
				}
			}
			state.refreshDialog();
			//左侧图片
			var left=ui.create.div(bk,{
				top:'4%',height:'100%',
				left:'16%',width:'37%',
				zIndex:'1',backgroundPosition:'50% -200%',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/left.png')",backgroundSize:'115% 99%',
			});
			var extraInfo=ui.create.div(left,{
				top:'17%',height:'50%',
				left:'20%',width:'65%',
				transform:'rotateZ(-11deg)',overflow:'auto',
				fontFamily:'shousha',color:'rgb(46, 45, 45)',textShadow:'none',fontWeight:'bold'
			});
			extraInfo.innerHTML=info.extra;
			//大小调整
			var setSize=function(){
				var screenWidth=ui.window.offsetWidth;
				var screenHeight=ui.window.offsetHeight;
				var whr=1.77778;
				var width;
				var height;
				if(screenWidth/whr>screenHeight){
					height=screenHeight;
					width=height*whr;
				}else{
					width=screenWidth;
					height=screenWidth/whr;
				}
				bk.style.height=Math.round(height)+"px";
				bk.style.width=Math.round(width)+"px";
				bk2.style.height=Math.round(height)+"px";
				bk2.style.width=Math.round(width)+"px";
				nameText.style.fontSize=screenHeight*0.03+'px';
				extraInfo.style.fontSize=screenHeight*0.038+'px';
				textIntro.style.fontSize=screenHeight*0.035+'px';
				characterDialog.style.fontSize=screenHeight*0.07+'px';
			};
			setSize();
			var resize=function(){
				setTimeout(setSize,500);
			};
			lib.onresize.push(resize);
		},
		//选择装备奇术要件的角色
		choosePlayer:function(item,state,bk){
		    if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
			if(!state.xjzh_onOpen){
				var list=[];
				var characterD;
				var node=ui.create.div('.caption.pointerspan');
				if(get.is.phoneLayout()){
					node.style.fontSize='30px';
				}
				var namecapt=[];
				var getCapt=function(str){
					var capt;
					if(str.indexOf('_')==-1){
						capt=str[0];
					}
					else{
						capt=str[str.lastIndexOf('_')+1];
					}
					capt=capt.toLowerCase();
					if(!/[a-z]/i.test(capt)){
						capt='自定义';
					}
					return capt;
				}
				var info=get.xjzh_equipInfo(item);
				if(info.filter){
		            var filter=info.filter;
		            var playerName;
		            var xianhunCharacter={};
	            	if(typeof filter=='string'){
	            	    playerName=[filter];
	            	}
	            	else if(typeof filter=='object'){
	            	    playerName=filter;
	            	}
	            	else if(typeof filter=='function'){
	            	    playerName=filter();
	            	}
	            	for(var i of playerName){
    					if(lib.character[i][4].includes('minskin')) continue;
    					if(lib.character[i][4].includes('boss')||lib.character[i][4].includes('hiddenboss')){
    						if(lib.config.mode=='boss') continue;
    						if(!lib.character[i][4].includes('bossallowed')) continue;
    					}
    					if(lib.character[i][4].includes('stonehidden')) continue;
    					if(lib.character[i][4].includes('unseen')) continue;
    					list.push(i);
    					if(!xianhunCharacter[i]){
    					    xianhunCharacter[i]=lib.character[i];
    					}
    					if(namecapt.indexOf(getCapt(i))==-1){
    						namecapt.push(getCapt(i));
    					}
    				}
    			}else{
        			let {...characters}=lib.characterPack.XWTR;
        			let {...characters2}=lib.characterPack.XWSG;
        			let {...characters3}=lib.characterPack.XWCS;
        			let {...characters4}=lib.characterPack.XWDM;
        			var xianhunCharacter=Object.assign(characters,characters2,characters3,characters4);
    				for(var i in xianhunCharacter){
    					if(xianhunCharacter[i][4].includes('minskin')) continue;
    					if(xianhunCharacter[i][4].includes('boss')||xianhunCharacter[i][4].includes('hiddenboss')){
    						if(lib.config.mode=='boss') continue;
    						if(!xianhunCharacter[i][4].includes('bossallowed')) continue;
    					}
    					if(xianhunCharacter[i][4].includes('stonehidden')) continue;
    					if(xianhunCharacter[i][4].includes('unseen')) continue;
    					list.push(i);
    					if(namecapt.indexOf(getCapt(i))==-1){
    						namecapt.push(getCapt(i));
    					}
    				}
    			}
				namecapt.sort(function(a,b){
					return a>b?1:-1;
				});
				namecapt.remove('自定义');
				namecapt.push('newline');
				for(var i in lib.characterDialogGroup){
					namecapt.push(i);
				}
				var newlined=false;
				var newlined2;
				var clickCapt=function(e){
					if(_status.dragged) return;
					if(characterD.currentcapt2=='最近'&&characterD.currentcaptnode2!=this&&!characterD.currentcaptnode2.inited){
						characterD.currentcapt2=null;
						characterD.currentcaptnode2.classList.remove('thundertext');
						characterD.currentcaptnode2.inited=true;
						characterD.currentcaptnode2=null;
					}
					if(this.alphabet){
						if(this.classList.contains('thundertext')){
							characterD.currentcapt=null;
							characterD.currentcaptnode=null;
							this.classList.remove('thundertext');
							if(this.touchlink){
								this.touchlink.classList.remove('active');
							}
							for(var i=0;i<characterD.buttons.length;i++){
								if(characterD.currentgroup&&characterD.buttons[i].group!=characterD.currentgroup){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.currentcapt2&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt,true)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else{
									characterD.buttons[i].classList.remove('nodisplay');
								}
							}
						}
						else{
							if(characterD.currentcaptnode){
								characterD.currentcaptnode.classList.remove('thundertext');
								if(characterD.currentcaptnode.touchlink){
									characterD.currentcaptnode.touchlink.classList.remove('active');
								}
							}
							characterD.currentcapt=this.link;
							characterD.currentcaptnode=this;
							this.classList.add('thundertext');
							if(this.touchlink){
								this.touchlink.classList.add('active');
							}
							for(var i=0;i<characterD.buttons.length;i++){
								if(characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.currentcapt2&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt,true)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.currentgroup&&characterD.buttons[i].group!=characterD.currentgroup){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else{
									characterD.buttons[i].classList.remove('nodisplay');
								}
							}
						}
					}
					else{
						if(newlined2){
							newlined2.style.display='none';
						}
						if(this.classList.contains('thundertext')){
							characterD.currentcapt2=null;
							characterD.currentcaptnode2=null;
							this.classList.remove('thundertext');
							if(this.touchlink){
								this.touchlink.classList.remove('active');
							}
							for(var i=0;i<characterD.buttons.length;i++){
								if(characterD.currentgroup&&characterD.buttons[i].group!=characterD.currentgroup){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.currentcapt&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else{
									characterD.buttons[i].classList.remove('nodisplay');
								}
							}
						}
						else{
							if(characterD.currentcaptnode2){
								characterD.currentcaptnode2.classList.remove('thundertext');
								if(characterD.currentcaptnode2.touchlink){
									characterD.currentcaptnode2.touchlink.classList.remove('active');
								}
							}
							characterD.currentcapt2=this.link;
							characterD.currentcaptnode2=this;
							this.classList.add('thundertext');
							if(this.touchlink){
								this.touchlink.classList.add('active');
							}
							for(var i=0;i<characterD.buttons.length;i++){
								if(characterD.currentcapt&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt,true)){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else if(characterD.currentgroup&&characterD.buttons[i].group!=characterD.currentgroup){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else{
									if(characterD.buttons[i].activate){
										characterD.buttons[i].activate();
									}
									characterD.buttons[i].classList.remove('nodisplay');
								}
							}
						}
					}
					if(characterD.seperate){
						for(var i=0;i<characterD.seperate.length;i++){
							if(!characterD.seperate[i].nextSibling.querySelector('.button:not(.nodisplay)')){
								characterD.seperate[i].style.display='none';
								characterD.seperate[i].nextSibling.style.display='none';
							}
							else{
								characterD.seperate[i].style.display='';
								characterD.seperate[i].nextSibling.style.display='';
							}
						}
					}
					if(e) e.stopPropagation();
				};
				for(i=0;i<namecapt.length;i++){
					if(namecapt[i]=='newline'){
						newlined=document.createElement('div');
						newlined.style.marginTop='5px';
						newlined.style.display='block';
						// newlined.style.fontFamily='xinwei';
						if(get.is.phoneLayout()){
							newlined.style.fontSize='32px';
						}
						else{
							newlined.style.fontSize='22px';
						}
						newlined.style.textAlign='center';
						node.appendChild(newlined);
					}
					else if(newlined){
						var span=ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius');
						span.style.margin='3px';
						span.style.width='auto';
						span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
						span.link=namecapt[i];
						span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
						newlined.appendChild(span);
						node[namecapt[i]]=span;
						if(namecapt[i]=='收藏'){
							span._nature='fire';
						}
						else{
							span._nature='wood';
						}
					}
					else{
						var span=document.createElement('span');
						span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
						span.link=namecapt[i];
						span.alphabet=true;
						span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
						node.appendChild(span);
					}
				}
				var natures=['water','soil','wood','metal'];
				var span=document.createElement('span');
				newlined.appendChild(span);
				span.style.margin='8px';
				var clickGroup=function(){
					if(_status.dragged) return;
					if(characterD.currentcapt2=='最近'&&characterD.currentcaptnode2!=this&&!characterD.currentcaptnode2.inited){
						characterD.currentcapt2=null;
						characterD.currentcaptnode2.classList.remove('thundertext');
						characterD.currentcaptnode2.inited=true;
						characterD.currentcaptnode2=null;
					}
					var node=this,link=this.link;
					if(node.classList.contains('thundertext')){
						characterD.currentgroup=null;
						characterD.currentgroupnode=null;
						node.classList.remove('thundertext');
						for(var i=0;i<characterD.buttons.length;i++){
							if(characterD.currentcapt&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt)){
								characterD.buttons[i].classList.add('nodisplay');
							}
							else if(characterD.currentcapt2&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt,true)){
								characterD.buttons[i].classList.add('nodisplay');
							}
							else{
								characterD.buttons[i].classList.remove('nodisplay');
							}
						}
					}
					else{
						if(characterD.currentgroupnode){
							characterD.currentgroupnode.classList.remove('thundertext');
						}
						characterD.currentgroup=link;
						characterD.currentgroupnode=node;
						node.classList.add('thundertext');
						for(var i=0;i<characterD.buttons.length;i++){
							if(characterD.currentcapt&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt)){
								characterD.buttons[i].classList.add('nodisplay');
							}
							else if(characterD.currentcapt2&&characterD.buttons[i].capt!=characterD.getCurrentCapt(characterD.buttons[i].link,characterD.buttons[i].capt,true)){
								characterD.buttons[i].classList.add('nodisplay');
							}
							else if(characterD.currentgroup=='double'){
								if(characterD.buttons[i]._changeGroup||characterD.buttons[i].group=='ye') characterD.buttons[i].classList.remove('nodisplay');
								else characterD.buttons[i].classList.add('nodisplay');
							}
							else{
								if(characterD.buttons[i]._changeGroup||characterD.buttons[i].group=='ye'||characterD.buttons[i].group!=characterD.currentgroup){
									characterD.buttons[i].classList.add('nodisplay');
								}
								else{
									characterD.buttons[i].classList.remove('nodisplay');
								}
							}
						}
					}
				};

				var span=document.createElement('span');
				newlined.appendChild(span);
				span.style.margin='8px';

				var filternode=null;
				var clickCaptNode=function(e){
					delete _status.filterCharacter;
					ui.window.classList.remove('shortcutpaused');
					filternode.delete();
					filternode.classList.remove('shown');
					clickCapt.call(this.link,e);
				};
				newlined2=document.createElement('div');
				newlined2.style.marginTop='5px';
				newlined2.style.display='none';
				newlined2.style.fontFamily='xinwei';
				newlined2.classList.add('pointernode');
				if(get.is.phoneLayout()){
					newlined2.style.fontSize='32px';
				}
				else{
					newlined2.style.fontSize='22px';
				}
				newlined2.style.textAlign='center';
				node.appendChild(newlined2);

				characterD=ui.create.dialog('hidden');
				characterD.classList.add('noupdate');
				characterD.classList.add('scroll1');
				characterD.classList.add('scroll2');
				characterD.classList.add('scroll3');
				characterD.addEventListener(lib.config.touchscreen?'touchend':'mouseup',function(){
					_status.clicked2=true;
				});
				characterD.style.height=((game.layout=='long2'||game.layout=='nova')?380:350)+'px';
				characterD._scrollset=true;
				characterD.style.zIndex='300';
				characterD.getCurrentCapt=function(link,capt,noalph){
					var currentcapt=noalph?this.currentcapt2:this.currentcapt;
					if(this.seperatelist&&noalph){
						if(this.seperatelist[currentcapt].includes(link)) return capt;
						return null;
					}
					if(lib.characterDialogGroup[currentcapt]){
						return lib.characterDialogGroup[currentcapt](link,capt);
					}
					if(lib.characterPack[currentcapt]){
						if(lib.characterPack[currentcapt][link]){
							return capt;
						}
						return null;
					}
					return this.currentcapt;
				}
				characterD.add(node);
				characterD.add([list,'character'],true);
				characterD.add(ui.create.div('.placeholder'));
				var equip_info=ui.create.div('.menu');
				equip_info.style.transition='left 0s,top 0s,opacity .3s';
				equip_info.style.width='312px';
				equip_info.style['pointer-events']='none';
				equip_info.style['text-align']='left';
				equip_info.style.animation='fadeShow .3s';
				equip_info.style['-webkit-animation']='fadeShow .3s';
				equip_info.style['z-index']=100000;
				for(i=0;i<characterD.buttons.length;i++){
					characterD.buttons[i].group=xianhunCharacter[characterD.buttons[i].link][1];
					characterD.buttons[i].capt=getCapt(characterD.buttons[i].link);
					characterD.buttons[i].item=item;
					characterD.buttons[i].onclick=function(){
						game.xjzh_useEquip(this.item,this.link);
						state.xjzh_onOpen.delete();
						state.xjzh_onOpen=null;
						state.refreshDialog();
					};
				}
				if((lib.characterDialogGroup[lib.config.character_characterD_tool]||
					lib.config.character_characterD_tool=='自创')){
					clickCapt.call(node[lib.config.character_characterD_tool]);
				}
				bk.appendChild(characterD);
				state.xjzh_onOpen=characterD;
			}else{
				state.xjzh_onOpen.delete();
				state.xjzh_onOpen=null;
			};
		},
		//打开抽奖页面
		openAchievementChoujiang:function(){
		    if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
			game.pause2();
			//覆盖图层
			var bookWindow=ui.create.div('.xjzh-bookWindow',{
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/choujiang.png')",
			});
			document.body.appendChild(bookWindow);
			//背景图层
			var bk=ui.create.div('.xjzh-bookWindow-bk',{
				backgroundSize:'contain',
				backgroundRepeat:'no-repeat',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/choujiang2.png')",
			});
			//退出按钮
			var exit=ui.create.div(bookWindow,{
				left:'0',width:'10%',
				top:'0',height:'15%',zIndex:'10',
				borderRadius:'0 0 100% 0',backgroundRepeat:'no-repeat',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/exit.png')",backgroundSize:'80%',
			});
			exit.listen(function(){
				bookWindow.delete();
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementEquipPage();
			});
			//精魄数量显示
			var tokens=ui.create.div(bk,{
				right:'3%',width:'15%',
				top:'2.1%',height:'7%',
				backgroundSize:'100%',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/jingpolan.png')",
			});
			var tokensNum=ui.create.div(tokens,{
				left:'25%',width:'50%',
				top:'16%',height:'80%',
				color:'white',textShadow:'none',
				textAlign:'center',fontSize:'70%',
			});
			tokensNum.innerHTML=get.xjzh_tokens();

			/*tokensNum.listen(function(){
    			var boxTime=ui.create.div(bk,{
    				left:'60%',width:'50%',
    				top:'13.5%',height:'80%',
    				color:'white',textShadow:'none',
    				textAlign:'center',fontSize:'100%',
    			});*/

                /*function format(dataString){
                    var time = new Date(dataString);
            		var year = time.getFullYear();
            		var month = time.getMonth()+1;
            		var day = time.getDate();
            		var hour = time.getHours();
            		var minute = time.getMinutes();
            		var second = time.getSeconds();
            		return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
            	}*/

                /*var targetDate=lib.config.xjzh_qishuyaojians.date+86400000;

                function diffTime(current,target){
                    var sub = Math.ceil((target-current)/1000)//时间戳
                    //计算天数
                    var day = parseInt(sub/(60*60*24));
                    if(day<0) day=0;
                    //计算小时
                    var hours = parseInt(sub%(60*60*24)/(60*60));
                    if(hours<0) hours=0;
                    //计算分钟
                    var minutes = parseInt(sub%(60*60)/60);
                    if(minutes<0) minutes=0;
                    //计算秒
                    var seconds = sub%60;
                    if(seconds<0) seconds=0;
                    var obj = {
                        day:day,
                        hours:hours,
                        minutes:minutes,
                        seconds:seconds
                    }
                    return obj
                }
                //用间隔定时器帮助自动输出，不用手动刷新
                setInterval(function(){
                    //定义返回当前时间对象
                    var currentDate=new Date();
                    var res = diffTime(currentDate,targetDate);
                    window.xjzh_diffTime=((res.day*24*60)+(res.hours*60)+(res.minutes)+(res.seconds/60))*60*1000;
                    boxTime.innerHTML = `下次免费精魄剩余-${res.day}天${res.hours}时${res.minutes}分${res.seconds}秒`
                },1000);

    			var tokensTimeDelete=ui.create.div(ui.window,{
    			    zIndex:10000,
    			    width:'100%',height:'100%'
    			});
    			tokensTimeDelete.listen(function(){
    			    boxTime.delete();
    			    tokensTimeDelete.delete();
    			});

			});*/
			//碎片数量显示
			var suipian=ui.create.div(bk,{
				right:'18%',width:'15%',
				top:'2%',height:'7%',
				backgroundSize:'100%',
				backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/suipianlan.png')",
			});
			var suipianNum=ui.create.div(suipian,{
				left:'25%',width:'50%',
				top:'25%',height:'80%',
				color:'white',textShadow:'none',
				textAlign:'center',fontSize:'150%',
			});
			suipianNum.innerHTML=get.xjzh_suipian();
			//珍宝
			/*var zhenbaoKuang=ui.create.div(bk,{
				left:'80%',width:'15%',
				top:'15%',height:'37.5%',
				transform:'rotateZ(5deg)',
				backgroundSize:'100%',backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/reward_bg.png')",
			});
			var zhenbao=ui.create.div(bk,{
				zIndex:'-1',
				left:'81%',width:'13%',
				top:'16.5%',height:'35%',
				transform:'rotateZ(5deg)',
			});
			zhenbao.setBackground('sksn_kailuoya','character');
			var zhenbaoText=ui.create.div(bk,{
				left:'76%',width:'8%',
				top:'35%',height:'19%',
				transform:'rotateZ(5deg)',
				backgroundSize:'100%',backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/reward_flag.png')",
			});*/
			//抽奖
			var map={
			    6:["jingpo"],
				5:["xjzh_cailiao_toulu","xjzh_cailiao_gugu","xjzh_cailiao_zhanshou","xjzh_cailiao_enianzhixin"],
				4:[],
				3:[],
				2:[],
				1:[]
			};
			for(var i in lib.xjzh_qishuyaojians){
				var info=lib.xjzh_qishuyaojians[i];
				if(info.level&&info.level<5){
					map[info.level].push(i);
				}
			}
			//抽奖函数
			var chou=function(){
				var result=[],cishu=this.cishu||1;
				if(get.xjzh_tokens()<cishu){
					var loading = window.xjzhOpenLoading();
            		loading.subViews.text.innerHTML = "你的精魄不足";
					return;
				}
				game.xjzh_changeSuipian(cishu);
				game.xjzh_changeTokens(-cishu);
				tokensNum.innerHTML=get.xjzh_tokens();
			    suipianNum.innerHTML=get.xjzh_suipian();
				game.playAudio('..','extension','仙家之魂/audio/other','choujiang');
				var fazhenbk=ui.create.div('.xjzh-bookWindow',bookWindow);
				var exitFunc=function(){fazhenbk.delete()};
				var fazhen1=ui.create.div('.xjzh-fazhen1',fazhenbk);
				var fazhen2=ui.create.div('.xjzh-fazhen2',fazhenbk);
				var fazhen3=ui.create.div('.xjzh-fazhen3',fazhenbk);
				fazhenbk.listen(exitFunc);
				fazhen1.listen(exitFunc);
				for(var i=0;i<cishu;i++){
					var num=Math.random();
					if(num<0.02){
					    var item=map[6][0];
					    game.xjzh_changeTokens(1);
					    result.push(item);
					}
					else if(num<0.05){
						var item=map[4].randomGet();
						game.xjzh_gainEquip(item);
						result.push(item);
					}
					else if(num<0.1){
					    var num=get.rand(1,2);
					    var cailiao=map[5].randomGet();
					    var item=[cailiao,num];
					    game.xjzh_changeCailiao(cailiao,num);
					    result.push(item)
					}
					else if(num<0.125){
						var item=map[3].randomGet();
						game.xjzh_gainEquip(item);
						result.push(item);
					}
					else if(num<0.25){
						var item=map[2].randomGet();
						game.xjzh_gainEquip(item);
						result.push(item);
					}
					else if(num<0.35){
						var item=map[1].randomGet();
						game.xjzh_gainEquip(item);
						result.push(item);
					}else{
					    var num=get.rand(1,10);
						var item=["suipian",num];
						game.xjzh_changeSuipian(num)
						result.push(item);
					}
				}
				console.log(result)
				setTimeout(function(){
					if(cishu==1){
						var show=ui.create.div('.xjzh-choujiang-result',fazhen1,{
							top:'37%',
							left:'40%',
						});
						if(Array.isArray(result[0])){
							if(result[0][0]=="suipian"){
							    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/suipian.jpg')";
							}else{
						        show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/"+result[0][0]+".jpg')";
							}
							show.innerHTML="✘"+result[0][1]+"";
						}
						else if(result[0]=="jingpo"){
						    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
						}
						else{
						    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cards/"+result[0]+".jpg')";
						}
					}else{
						var list=[];
						for(var i=0;i<10;i++){
							var index=i;
							if(index>4) index-=5;
							var show=ui.create.div('.xjzh-choujiang-result',{
								top:(i>4?'60%':'20%'),
								left:index*25-10+'%',
							});
							list.push(show);
							if(Array.isArray(result[i])){
    							if(result[i][0]=="suipian"){
    							    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/suipian.jpg')";
    							}else{
    							    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/"+result[i][0]+".jpg')";
    							}
    							show.innerHTML="✘"+result[i][1]+"";
							}
						    else if(result[i]=="jingpo"){
						        show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
						    }
    						else{
    						    show.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cards/"+result[i]+".jpg')";
    						}
						}
						fazhen1.appendChild(list[0]);
						var nowShow=1;
						var Timeout=function(){
							setTimeout(function(){
								fazhen1.appendChild(list[nowShow]);
								nowShow++;
								if(nowShow<10) Timeout();
							}, 200);
						};
						Timeout();
					}
				},2000);
				tokensNum.innerHTML=get.xjzh_tokens();
			    suipianNum.innerHTML=get.xjzh_suipian();
			};
			var chouBtm1=ui.create.div(bk,{
				left:'42%',width:'12%',
				top:'76.5%',height:'8%',
			});
			var chouBtm2=ui.create.div(bk,{
				left:'63%',width:'12%',
				top:'76.5%',height:'8%',
			});
			chouBtm2.cishu=10;
			chouBtm1.listen(chou);
			chouBtm2.listen(chou);
			//兑换商店
			var shopBtm=ui.create.div(bk,{
				right:'2%',width:'8%',
				bottom:'23%',height:'15%',
				borderRadius:'50%',
			});
			var openShop=function(){
				//覆盖图层
				var shopWindow=ui.create.div('.xjzh-bookWindow',bookWindow);
				//商店
				var shop=ui.create.div('.xjzh-blackboard',shopWindow,{
					fontSize:shopWindow.clientHeight*0.8+'px',
				});
				var shopText=ui.create.div(shop,{
					top:'3%',height:'7%',
					left:'35%',width:'30%',
					color:'black',textShadow:'none',
					textAlign:'center',fontSize:'6%'
				});
				shopText.innerHTML='兑换商店';
				//退出按钮
				var exit=ui.create.div('.xjzh-bookWindow-return',shop,{
					left:'100%',
				});
				exit.listen(function(){
					shopWindow.delete();
					lib.onresize.remove(resize2);
				});
				//滚动窗口
				var duihuanWindow=ui.create.div(shop,{
					zIndex:'-1',
					left:'5%',width:'90%',
					top:'13%',height:'80%',
					overflow:'auto'
				});
				//兑换列表
				var list=[{
					setImage:function(btm){
						btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
						btm.style.backgroundSize='100% 100%';
						btm.style.backgroundPosition='50% 60%';
						var suipians=ui.create.div(btm,{
							top:'3%',bottom:'5%',
							left:'5%',right:'5%',
							borderRadius:'5%'
						})
					},
					content:function(){
						game.xjzh_changeTokens(1);
					},
					price:75,
				},
				//等阶1
				'xjzh_qishu_daojian',
				'xjzh_qishu_shengmingfusu',
				'xjzh_qishu_heianxuewu',
				'xjzh_qishu_maoxianmingyun',
				'xjzh_qishu_jishudanyao',
				'xjzh_qishu_guimeihuanying',
				//等阶2
				'xjzh_qishu_yaojishi',
				'xjzh_qishu_wushitongku',
				'xjzh_qishu_talaxia',
				'xjzh_qishu_qiyue',
				'xjzh_qishu_siwanghuanxing',
				'xjzh_qishu_chengfa',
				//等阶3
				'xjzh_qishu_fuchou',
				'xjzh_qishu_huanji',
				'xjzh_qishu_wuqijingtong',
				'xjzh_qishu_fangjujingtong',
				'xjzh_qishu_binglengjiqiao',
				"xjzh_qishu_jiandun",
				//等阶4
				"xjzh_qishu_suoding",
				"xjzh_qishu_tongkuhushou",
				'xjzh_qishu_titoushi',
				'xjzh_qishu_wuyan',
				'xjzh_qishu_waxilidedaogao',
				'xjzh_qishu_fenglangkx',
				'xjzh_qishu_fengbaopaoxiao',
				'xjzh_qishu_wumingzhe'

				];
				for(var i=0;i<list.length;i++){
					var btm=ui.create.div(duihuanWindow,{
						left:i%5*19.3+6+'%',width:'12%',
						top:Math.floor(i/5)*60+'%',height:'30%',
						backgroundSize:'100%',backgroundRepeat:'no-repeat',
						overflow:'visible',
						zIndex:1,
					});
					var infoAlert=ui.create.div(btm,{
    					width:'100%',
    					height:'100%',
    					backgroundSize:'100%',
    					backgroundRepeat:'no-repeat',
    					overflow:'visible',
    					zIndex:1,
    				});
					var link=list[i],price;
					if(typeof link=='string'){
						btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cards/"+link+".jpg')";
						let info=get.xjzh_equipInfo(link),level=info.level||1;
						switch(level){
							case 1: price=info.filter?50*(1+level):50;break;
							case 2: price=info.filter?100*(1+level):100;break;
							case 3: price=info.filter?150*(1+level):150;break;
							case 4: price=info.filter?230*(1+level):230;break;
							case 5: price=info.filter?320*(1+level):320;break;
							default: price=50;
						}
						infoAlert.item=link;
				        infoAlert.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            beijing.innerHTML=lib.xjzh_qishuyaojians[this.item].translate;
                            text.innerHTML=lib.xjzh_qishuyaojians[this.item].translate_info;
                        });
					}else if(typeof link=='object'){
						link.setImage(btm);
						price=link.price;
				        infoAlert.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            beijing.innerHTML="精魄";
                            text.innerHTML="用于抽奖的消耗材料";
                        });
					}
					var buy=ui.create.div(btm,{
						top:'133%',height:'50%',
						left:'0',width:'100%',
						backgroundPosition:'0% 50%',backgroundRepeat:'no-repeat',
						backgroundSize:'auto 70%',
						backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/suipianlan.png')",
					});
					buy.link=link;
					buy.price=price;
					buy.listen(function(){
						var link=this.link,price=this.price;
						if(get.xjzh_suipian()<price){
							window.xjzhOpenLoading('你的碎片不够');
							return;
						}else if(typeof link=='string'){
							game.xjzh_gainEquip(link);
						}else if(link.constructor==Object){
							link.content();
						}else{
							window.xjzhOpenLoading('你已经拥有这个商品了');
							return;
						}
						window.xjzhOpenLoading('购买成功');
						game.xjzh_changeSuipian(-price);
						suipianNum.innerHTML=get.xjzh_suipian();
						tokensNum.innerHTML=get.xjzh_tokens();
					});
					var num=ui.create.div(buy,{
						left:'40%',width:'50%',
						top:'21.5%',height:'40%',
						color:'white',textShadow:'none',
						textAlign:'center',fontSize:'5%',
					});
					num.innerHTML=price;
					if(i%5==0){
						var priceLan=ui.create.div(duihuanWindow,{
							left:'0%',width:'100%',
							top:i*12+27+'%',height:'30%',
							backgroundSize:'100%',backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/price.png')",
						});
					}
				}
				//大小调整
				var setSize2=function(){
					shop.style.width=shop.clientHeight*1.7+'px';
					shop.style.fontSize=shop.clientHeight+'px';
				};
				setSize2();
				var resize2=function(){
					setTimeout(setSize2,100);
				};
				lib.onresize.push(resize2);
			}
			shopBtm.listen(openShop);
			//奖励预览
			var yulanBtm=ui.create.div(bk,{
				right:'2%',width:'8%',
				bottom:'4%',height:'15%',
				borderRadius:'50%',
			});
			var openYulan=function(){
				//覆盖图层
				var yulanWindow=ui.create.div('.xjzh-bookWindow',bookWindow);
				//商店
				var yulan=ui.create.div('.xjzh-blackboard',yulanWindow,{
					fontSize:yulanWindow.clientHeight*0.8+'px',
				});
				var yulanText=ui.create.div(yulan,{
					top:'3%',height:'7%',
					left:'35%',width:'30%',
					color:'black',textShadow:'none',
					textAlign:'center',fontSize:'6%'
				});
				yulanText.innerHTML='奖励预览';
				//退出按钮
				var exit=ui.create.div('.xjzh-bookWindow-return',yulan,{
					left:'100%',
				});
				exit.listen(function(){
					yulanWindow.delete();
					lib.onresize.remove(resize2);
				});
				//滚动窗口
				var scrollWindow=ui.create.div(yulan,{
					zIndex:'-1',
					left:'5%',width:'90%',
					top:'13%',height:'80%',
					overflow:'auto'
				});
				//奖励列表
				var list=[
					"suipian",
					"jingpo",
					"xjzh_cailiao_shijieshi",
					"xjzh_cailiao_toulu",
					"xjzh_cailiao_gugu",
					"xjzh_cailiao_zhanshou",
					"xjzh_cailiao_enianzhixin",
					"xjzh_cailiao_gangtie",
					"xjzh_cailiao_xianxue",
					"xjzh_cailiao_kongju",
					"xjzh_cailiao_nianyedan",
					"xjzh_cailiao_kutong"
				];
				for(var i in lib.xjzh_qishuyaojians){
					var level=get.xjzh_equipInfo(i).level||1;
					if(level&&level<5) list.push(i);
				}
				list.sort(function(a,b){
					var level1=get.xjzh_equipInfo(a).level||1,level2=get.xjzh_equipInfo(b).level||1;
					if(level1>level2) return -1;
					if(level1<level2) return 1;
					if(a>b) return 1;
					return -1;
				});
				for(var i=0;i<list.length;i++){
					var btm=ui.create.div(scrollWindow,{
						left:i%5*19.3+6+'%',width:'12%',
						top:Math.floor(i/5)*35+'%',height:'30%',
						backgroundSize:'100%',backgroundRepeat:'no-repeat',
					});
					var link=list[i];
					if(link=="jingpo"){
					    btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
				        btm.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            beijing.innerHTML="精魄";
                            text.innerHTML="用于抽奖的消耗材料";
                        });
					}
					else if(link=="suipian"){
					    btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/suipian.jpg')";
				        btm.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            beijing.innerHTML="奇术碎片";
                            text.innerHTML="用于兑换奇术要件和精魄的材料";
				        });
					}
					else if(link.indexOf("cailiao")!=-1){
					    btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cailiao/"+link+".jpg')";
					    btm.item=link;
				        btm.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
                            var str=""+cailiaoList[this.item][2]+"<br><br>拥有"+cailiaoList[this.item][1]+"个";
                            switch(this.item){
    							case "xjzh_cailiao_gugu":
    							    str+="<br><br>获取途径：对局概率掉落，抽奖<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>恶念之心、咕噜头颅、颤栗之手、发黑的股骨</font></span>各一个可以挑战BOSS瓦尔申";
    							break;
                    		    case "xjzh_cailiao_toulu":
                    		        str+="<br><br>获取途径：对局概率掉落，抽奖<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>恶念之心、咕噜头颅、颤栗之手、发黑的股骨</font></span>各一个可以挑战BOSS瓦尔申";
                    		    break;
                    		    case "xjzh_cailiao_zhanshou":
                    		        str+="<br><br>获取途径：对局概率掉落，抽奖<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>恶念之心、咕噜头颅、颤栗之手、发黑的股骨</font></span>各一个可以挑战BOSS瓦尔申";
                    		    break;
                    		    case "xjzh_cailiao_enianzhixin":
                    		        str+="<br><br>获取途径：对局概率掉落，抽奖<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>恶念之心、咕噜头颅、颤栗之手、发黑的股骨</font></span>各一个可以挑战BOSS瓦尔申";
                    		    break;
                    		    case "xjzh_cailiao_gangtie":
                    		        str+="<br><br>获取途径：挑战瓦尔申概率掉落<br><br>集齐5个<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>活体钢铁</font></span>可以挑战BOSS格里高利";
                    		    break;
                    		    case "xjzh_cailiao_nianyedan":
                    		        str+="<br><br>获取途径：挑战瓦尔申概率掉落<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>粘液覆盖的蛋、苦痛碎片</font></span>各两个可以挑战BOSS都瑞尔";
                    		    break;
                    		    case "xjzh_cailiao_kutong":
                    		        str+="<br><br>获取途径：挑战格里高利概率掉落<br><br>集齐<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>粘液覆盖的蛋、苦痛碎片</font></span>各两个可以挑战BOSS都瑞尔";
                    		    break;
                    		    case "xjzh_cailiao_kongju":
                    		        str+="<br><br>获取途径：挑战都瑞尔、格里高利、齐尔领主概率掉落<br><br>集齐9个<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>提纯的恐惧</font></span>可以挑战BOSS冰川巨兽";
                    		    break;
                    		    case "xjzh_cailiao_xianxue":
                    		        str+="<br><br>获取途径：挑战都瑞尔、格里高利、冰川巨兽概率掉落<br><br>集齐9个<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>提纯鲜血</font></span>可以挑战BOSS齐尔领主";
                    		    break;
                    		    case "xjzh_cailiao_shijieshi":
                    		        str+="<br><br>获取途径：暂无<br><br>集齐1个<span style=\"color:#800080;font-family:xinwei\"><font size =6.5px>世界石碎片</font></span>可以挑战天堂试炼";
                    		    break;
                            };
                            beijing.innerHTML=cailiaoList[this.item][0];
                            text.innerHTML=str;
				        });
				    }
				    else{
				        btm.style.backgroundImage="url('"+lib.assetURL+"extension/仙家之魂/image/qishuyaojian/cards/"+link+".jpg')";
				        btm.item=link;
				        btm.listen(function(){
				            var boxRemove=ui.create.div(ui.window,{
                                zIndex:10000,
                                width:'100%',height:'100%'
                            });
                    	    var obj=ui.create.div('.xjzh-dialog',boxRemove);
                    	    obj.style.transformOrigin="center";
                    	    var num=get.rand(0,5);
                    	    var url="extension/仙家之魂/css/images/ui/";
                    	    var url2="xjzh_info";
                    	    obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
                			var beijing=ui.create.div('.xjzh-dialog-name',obj);
            			    var text=ui.create.div('.xjzh-dialog-text',obj);
                            boxRemove.listen(function(){
                                boxRemove.delete();
                            });
                            beijing.innerHTML=lib.xjzh_qishuyaojians[this.item].translate;
                            text.innerHTML=lib.xjzh_qishuyaojians[this.item].translate_info;
				        });
				    }
				}
				//大小调整
				var setSize2=function(){
					yulan.style.width=yulan.clientHeight*1.7+'px';
					yulan.style.fontSize=yulan.clientHeight+'px';
				};
				setSize2();
				var resize2=function(){
					setTimeout(setSize2,100);
				};
				lib.onresize.push(resize2);
			};
			yulanBtm.listen(openYulan);
			//大小调整
			var setSize=function(){
				var screenWidth=ui.window.offsetWidth;
				var screenHeight=ui.window.offsetHeight;
				var whr=1.77778;
				var width;
				var height;
				if(screenWidth/whr>screenHeight){
					height=screenHeight;
					width=height*whr;
				}else{
					width=screenWidth;
					height=screenWidth/whr;
				}
				bk.style.height=Math.round(height)+"px";
				bk.style.width=Math.round(width)+"px";
				tokens.style.fontSize=Math.round(height/15)+'px';
			};
			setSize();
			bookWindow.appendChild(bk);
			var resize=function(){
				setTimeout(setSize,500);
			};
			lib.onresize.push(resize);
		},
		//打开成就视窗
		openAchievementView:function(type){
			if(!type) type='character';
			game.xjzhAchi.thisType=type;
			game.pause2();
			game.xjzhAchi.hideLevel=[];
			//覆盖图层
			var achiWindow=ui.create.div('.xjzh-achiWindow');
			document.body.appendChild(achiWindow);
			//背景图层
			var bk=ui.create.div('.xjzh-achiWindow-bk',achiWindow);
			var setSize=function(){
				var screenWidth=ui.window.offsetWidth;
				var screenHeight=ui.window.offsetHeight;
				var whr=1.77778;
				var width;
				var height;
				if(screenWidth/whr>screenHeight){
					height=screenHeight;
					width=height*whr;
				}else{
					width=screenWidth;
					height=screenWidth/whr;
				}
				bk.style.height=Math.round(height)+"px";
				bk.style.width=Math.round(width)+"px";
			};
			setSize();
			var resize=function(){
				setTimeout(setSize,500);
			};
			//界面提示标签
			ui.create.div('.xjzh-achiWindow-tips',bk).setBackgroundImage('extension/仙家之魂/css/images/achievement/tips_'+type+'.png');
			//退出按钮
			var exit=ui.create.div('.xjzh-achiWindow-return',bk);
			lib.onresize.push(resize);
			exit.listen(function(){
				achiWindow.delete();
				delete game.xjzhAchi.hideLevel;
				delete game.xjzhAchi.thisType;
				game.resume2();
				lib.onresize.remove(resize);
				game.xjzhAchi.openAchievementMainPage();
				//game.playXwAudio('xwjh_voc_cjdianji',null,true);
			});
			//成就文本内容
			var content=ui.create.div('.xjzh-achiWindow-textinner',ui.create.div('.xjzh-achiWindow-text',bk));
			lib.setScroll(content);
			//函数方法
			var state={
				hideGained:false,
				checkFilter:function(name){
					var info=game.xjzhAchi.info(name,game.xjzhAchi.thisType);
					if(state.hideGained&&game.xjzhAchi.hasAchi(name,game.xjzhAchi.thisType)) return false;
					return !game.xjzhAchi.hideLevel.includes(info.level);
				},
				changeFilter:function(num){
					if([1,2,3].includes(num)){
						if(game.xjzhAchi.hideLevel.includes(num)){
							game.xjzhAchi.hideLevel.remove(num);
							return false;
						}else if(game.xjzhAchi.hideLevel.length<3){
							game.xjzhAchi.hideLevel.push(num);
							return true;
						}
					}
					return undefined;
				},
				refreshList:function(){
					var list=Object.keys(lib.xjzh_achievement[game.xjzhAchi.thisType]);
					var filter=function(name){
						return !state.hideGained||!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name);
					};
					for(let i=0;i<list.length;i++){
						if(this.checkFilter(list[i])) continue;
						if(state.hideGained&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name)) continue;
						list.splice(i--,1);
					}
					var text="";
					var isFirst=true;
					for(var name of list){
						//首项不加分割线
						if(isFirst){
							isFirst=false;
						}else{
							text+="<br><p align='center'><img src="+lib.assetURL+"extension/仙家之魂/css/images/achievement/splitLine.png></p><br>";
						}
						//<--
						let info=game.xjzhAchi.info(name,game.xjzhAchi.thisType);
						let name2=game.xjzhAchi.nameOf(name,game.xjzhAchi.thisType);
						text+="<p style=\"min-height:100px;\">";
						//显示已完成
						if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name2)){
							text+="<img src='"+lib.assetURL+"extension/仙家之魂/css/images/achievement/isGained.png' style='height:60px;'/>";
						}
						//<--
						//显示成就名
						text+="<span style=\"color:black;font-family:hwxinkai;font-size:55px;\">&nbsp;";
						if(!info.name){
							text+=name;
						}else{
							text+=info.name;
						}
						text+="</span>&nbsp;&nbsp;&nbsp;";
						//<--
						//显示成就等级
						for(var i=0;i<info.level;i++){
							text+="<img src='"+lib.assetURL+"extension/仙家之魂/css/images/achievement/star.png' style='height:30px;'/>&nbsp;&nbsp;";
						}
						text+="&nbsp;&nbsp;&nbsp;";
						//<--
						//显示达成时间
						if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage").date[name2]){
							text+="达成于 <font color=\"#FF4500\" size=\"2\">";
							let ts=game.getExtensionConfig("仙家之魂","xjzhAchiStorage").date[name2];
							text+=(new Date(ts)).format("yyyy 年 MM 月 dd 日 hh:mm");
							text+="</font>";
						}
						//<--
						//显示成就达成需求
						if(typeof info.info=='function'){
							text+=info.info();
						}else{
							text+="<br><br><span style='font-size:22px;'>&nbsp;&nbsp;<b>◆";
							text+=info.info;
							text+="</b></span>";
						}
						//<--
						//显示进度（如果未达成的话）
						if(!game.getExtensionConfig("仙家之魂","xjzhAchiStorage").got.includes(name2)){
							if(!info.progress){
							    if(info.award) text+="";
								else text+="（0/1）";
							}else{
							    if(info.award){
							        text+="";
							    }else{
								    let pog=game.getExtensionConfig("仙家之魂","xjzhAchiStorage").progress[name2]||0;
								    text+='（'+pog+'/'+info.progress+'）';
								}
							}
						}
						//<--
						text+="<br>";
						//显示奖励
						if(info.extra){
							if(typeof info.extra=='function'){
								text+=info.extra();
							}else{
								text+="<br><span style='font-size:22px;'>&nbsp;&nbsp;";
								text+=info.extra;
								text+="</span>";
							}
						}
						//显示设计者
						if(info.design){
							if(typeof info.design=='function'){
								text+="设计："+info.design();
							}else{
								text+="<br><span style='font-size:22px;'>&nbsp;&nbsp;设计：";
								text+=info.design;
								text+="</span>";
							}
						}
						//<--
						text+='</p>';
					}
					text+="<br><br><br><br><br><br><br>";
					content.innerHTML = text;
				}
			};
			state.refreshList();
			//过滤器
			var filterButton=ui.create.div('.xjzh-achiWindow-openFilter',bk);
			filterButton.listen(function(){
				var filterWindow=ui.create.div('.xjzh-achiWindow-filterWindow',bk);
				var filterExit=ui.create.div('.xjzh-achiWindow-filterExit',filterWindow);
				filterExit.listen(function(){
					filterWindow.delete();
					state.refreshList();
				});
				var hiden_done=ui.create.div('.xjzh-achiWindow-filter-lv4',filterWindow);
				if(state.hideGained){
					hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
				}
				hiden_done.innerHTML='<br><img src="'+lib.assetURL+'extension/仙家之魂/css/images/achievement/isGained2.png" style="height:30px;"/>&thinsp;显示完成成就&emsp;&thinsp;';
				hiden_done.listen(function(){
					state.hideGained=!state.hideGained;
					if(state.hideGained){
						hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
					}else{
						hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
					}
				});
				var hiden_lv3=ui.create.div('.xjzh-achiWindow-filter-lv3',filterWindow);
				if(game.xjzhAchi.hideLevel.includes(3)){
					hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
				}
				hiden_lv3.innerHTML='<br><img src="'+lib.assetURL+'extension/仙家之魂/css/images/achievement/star3.png" style="height:30px;"/>&thinsp;显示三星成就&emsp;&thinsp;';
				hiden_lv3.listen(function(){
					if(game.xjzhAchi.hideLevel.includes(3)){
						game.xjzhAchi.hideLevel.remove(3);
						hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
					}else if(game.xjzhAchi.hideLevel.length<2){
						game.xjzhAchi.hideLevel.push(3);
						hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
					}
				});
				var hiden_lv2=ui.create.div('.xjzh-achiWindow-filter-lv2',filterWindow);
				if(game.xjzhAchi.hideLevel.includes(2)){
					hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
				}
				hiden_lv2.innerHTML='<img src="'+lib.assetURL+'extension/仙家之魂/css/images/achievement/star2.png" style="height:30px;"/>&thinsp;显示二星成就&emsp;&thinsp;';
				hiden_lv2.listen(function(){
					if(game.xjzhAchi.hideLevel.includes(2)){
						game.xjzhAchi.hideLevel.remove(2);
						hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
					}else if(game.xjzhAchi.hideLevel.length<2){
						game.xjzhAchi.hideLevel.push(2);
						hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
					}
				});
				var hiden_lv1=ui.create.div('.xjzh-achiWindow-filter-lv1',filterWindow);
				if(game.xjzhAchi.hideLevel.includes(1)){
					hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
				}
				hiden_lv1.innerHTML='<br><img src="'+lib.assetURL+'extension/仙家之魂/css/images/achievement/star.png" style="height:30px;"/>&thinsp;显示一星成就&emsp;&thinsp;';
				hiden_lv1.listen(function(){
					if(game.xjzhAchi.hideLevel.includes(1)){
						game.xjzhAchi.hideLevel.remove(1);
						hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
					}else if(game.xjzhAchi.hideLevel.length<2){
						game.xjzhAchi.hideLevel.push(1);
						hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
					}
				});
			});
		},
	};
	//日期格式化方法
	Date.prototype.format=function (str){
        var o={
            "M+":this.getMonth()+1,//月份
            "d+":this.getDate(),//日
            "h+":this.getHours(),//小时
            "m+":this.getMinutes(),//分
            "s+":this.getSeconds(),//秒
            "q+":Math.floor((this.getMonth()+3)/3),//季度
            "S":this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(str)) str=str.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+k+")").test(str)) str=str.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)));
        return str;
    };
	//成就计量技能

	lib.skill['_xjzh_achi_重金属中毒者']={
		trigger:{player:"useCard"},
		firstDo:true,
		priority:6.2,
		forced:true,
		popup:false,
		filter:function(event,player){
			if(!player.isUnderControl(true)) return false;
			if(game.me!=player) return false;
			if(!event.cards||!event.cards.length) return false;
			if(event.card.name!="xjzh_card_lianqidan") return false;
			if(game.xjzhAchi.hasAchi('重金属中毒者','special')) return false;
			return true;
		},
		content:function (){
			game.xjzhAchi.addProgress('重金属中毒者','special',1);
		},
	};

});