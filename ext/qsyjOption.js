'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	lib.arenaReady.push(function(){
        let characters;
	    if(lib.characterPack['XWTZ']){
	        characters=lib.characterPack['XWTZ']
	    }else{
	        return;
	    }
	    let func=function(){
    	    for(let i in characters){
    		    if(!lib.character[i][4]) continue;
    		    if(!lib.character[i][4].includes("qishuBoss")) continue;
                if(lib.character[i].isAiForbidden==true) continue;
                lib.character[i].isBoss=false;
                lib.character[i].isBossAllowed=false;
                lib.character[i].isAiForbidden=true;
                lib.character[i].isUnseen=true;
    		}
	    };
	    let func2=function(name){
    		if(!lib.character[name]) return;
    		if(!lib.character[name][4]) return;
    	    if(!lib.character[name][4].includes("qishuBoss")) return;
            lib.character[name].isBoss=false;
            lib.character[name].isBossAllowed=false;
            lib.character[name].isAiForbidden=true;
            lib.character[name].isUnseen=true;
	    };
	    if(!get.is.object(lib.config.xjzh_qishuyaojians.cailiao)||!characters||characters==undefined){
	        func();
	        return;
	    };

        let bool=false;
        if(game.getExtensionConfig("仙家之魂","xjzh_qishuBossPower")){
            if(get.xjzh_cailiao("xjzh_cailiao_mingyushi")>1) bool=true;
        }

	    //判断材料数量是否能够开启莉莉丝挑战
        var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;

        var lilisiCiaoliao=Object.keys(cailiaoList).filter(item=>!["xjzh_cailiao_shijieshi","xjzh_cailiao_mingyushi"].includes(item));
	    if(lilisiCiaoliao.some(item=>get.xjzh_cailiao(item)<(bool?6:2))){
	        func2("xjzh_boss_lilisi");
	    }

	    //判断材料数量是否能够开启瓦尔申挑战
        if(get.xjzh_cailiao("xjzh_cailiao_enianzhixin")<(bool?12:4)){
	        func2("xjzh_boss_waershen");
	    }

	    //判断材料数量是否能够开启格里高利挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_gangtie")<(bool?15:5)){
	        func2("xjzh_boss_geligaoli");
	    }
	    //判断材料数量是否能够开启都瑞尔挑战
	    if(Object.keys(cailiaoList).filter(function(item){
	        return ["xjzh_cailiao_nianyedan","xjzh_cailiao_kutong"].includes(item);
	    }).some((item)=>{
	        return get.xjzh_cailiao(item)<(bool?6:2);
	    })){
	        func2("xjzh_boss_duruier");
	    }

	    //判断材料数量是否能够开启安达利尔挑战
	    if(Object.keys(cailiaoList).filter(function(item){
	        return ["xjzh_cailiao_wawa","xjzh_cailiao_jiasuo"].includes(item);
	    }).some((item)=>{
	        return get.xjzh_cailiao(item)<(bool?6:2);
	    })){
	        func2("xjzh_boss_andalier");
	    }

	    //判断材料数量是否能够开启冰川巨兽挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_kongju")<(bool?27:9)){
	        func2("xjzh_boss_bingchuanjushou");
	    }

	    //判断材料数量是否能够开启齐尔领主挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_xianxue")<(bool?27:9)){
	        func2("xjzh_boss_qier");
	    }

	    //判断材料数量是否能够开启天堂试炼挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_shijieshi")<(bool?3:1)){
	        func2("xjzh_boss_ttshilian");
	    }

	    /*if(game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")){
	        if(!lib.config.xjzh_qishuyaojians.date){
	            lib.config.xjzh_qishuyaojians.date=new Date().getTime();
	            game.xjzh_changeTokens(1);
	            game.xjzhQishu_saveConfig();
	        }else{
	            const number=lib.config.xjzh_qishuyaojians.date;
	            const number2=new Date().getTime();
	            const number3=((number2-number)/360)/1000;
	            if(number3>=24){
	                lib.config.xjzh_qishuyaojians.date=number2;
	                game.xjzh_changeTokens(1);
	            }
	            game.xjzhQishu_saveConfig();
	        }
	    }*/

	});

    if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;

    //显示倒计时
    /*lib.arenaReady.push(function(){
        //if(get.mode()!="boss") return;
        var box=ui.create.div(ui.window)
        var targetDate = new Date("2023/08/30")
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
            var currentDate = new Date()
            var res = diffTime(currentDate,targetDate);
            window.xjzh_diffTime=((res.day*24*60)+(res.hours*60)+(res.minutes)+(res.seconds/60))*60*1000;
            if(window.xjzh_diffTime>0&&get.mode()=="boss") box.innerHTML = `恶念之心限时挑战剩余-${res.day}天${res.hours}时${res.minutes}分${res.seconds}秒`
        },1000);
    });*/

    game.xjzh_qishuWinner=function(str,str2){
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
        beijing.innerHTML=str;
        text.innerHTML=str2;
    };

    lib.onover.push(async function(ret){
        if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
        if(ret){
            //统计本剧得分
            var player=game.me;
            var qishumingyushi=window.qishumingyushi;
            //限制仅为身份模式、斗地主模式、挑战模式，否则终止运行
            if(!['identity','doudizhu','boss'].includes(get.mode())) return;
            if(get.mode()=="boss"){
                //如果为挑战模式且玩家为boss则终止运行
                if(game.boss==player) return;
                if(!get.isXHwujiang(game.boss)) return;
            }
            //判断是否为身份模式或斗地主模式
            else if(['identity','doudizhu'].includes(get.mode())){
                //如果玩家操作的武将不为仙家之魂武将则终止运行
                if(!get.isXHwujiang(player)) return;
            }
            var draw=player.getAllHistory('draw').length;
            var use=player.getAllHistory('useCard').length;
            var damage=player.getAllHistory('damage').length;
            var source=player.getAllHistory('sourceDamage').length;
            var kill=player.getAllHistory('kill').length;
            var recover=player.getAllHistory('recover').length;

            //var num=get.rand(1,2);
            var num=1+(lib.config.xjzh_qishuyaojians.level/20);
            //var num2=Math.floor(((draw>use?use+draw/2:use)+(source-damage)+(source==kill?kill:source)+recover)*num);
            //对局得分不再计算摸牌数
            var num3=Math.floor(use+(source-damage)+(source==kill?kill:source)+recover);
            var num2=Math.floor((use+(source-damage)+(source==kill?kill:source)+recover)*num)

            var qishuReward={
        		"jingpo":0,
        		"suipian":0,
        		"qishuyaojian":{},
        		"cailiao":{
        		    "xjzh_cailiao_enianzhixin":0,
        		    "xjzh_cailiao_gangtie":0,
        		    "xjzh_cailiao_kongju":0,
        		    "xjzh_cailiao_xianxue":0
        		},
        	};
            //碎片获得
            var suipian=Math.floor(num2);
            qishuReward["suipian"]+=qishumingyushi?suipian:suipian*2;

            //材料获得
            var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
            var cailiaoList2=Object.keys(cailiaoList).filter(function(item){
	            return ["xjzh_cailiao_enianzhixin","xjzh_cailiao_gangtie","xjzh_cailiao_kongju","xjzh_cailiao_xianxue","xjzh_cailiao_mingyushi"].includes(item);
	        });

	        var numx=0;
	        while(numx<4){
	            if(Math.random()<=num2/300){
	                var index=cailiaoList2.randomGet();
                    if(index=="xjzh_cailiao_mingyushi"){
                        if(Math.random()<=0.2*(qishumingyushi?2:1)) qishuReward["cailiao"][index]+=1;
                    }
                    else qishuReward["cailiao"][index]+=1;
	            }
	            numx++
	        }

            var qishuList=[];
            for(var i in lib.xjzh_qishuyaojians){
				var level=get.xjzh_equipInfo(i).level||1;
				if(level&&level<5) qishuList.push(i);
			}

            //精魄及奇术要件获得，若boss为莉莉丝则必定获得一个精魄，额外获得至少0个，至多为3个;
            if(get.mode()=="boss"){
                //消耗材料
                switch(get.nameList(game.boss)[0]){
                    //如果boss为莉莉丝
                    //必定获得精魄1个，额外获得0-3个精魄
                    //额外获得60个碎片
                    //最终获得碎片数量乘2
                    //随机获得1-4级奇术要件1个
                    //必定掉落一个冥狱石
                    case "xjzh_boss_lilisi":
                        qishuReward["jingpo"]+=qishumingyushi?1:2+get.rand(0,3);

                        if(qishumingyushi==true){
                            let number=2;
                            while(number>0){
                                var qishuLevelArr=qishuList.randomGet();
                                if(!qishuReward["qishuyaojian"][qishuLevelArr]) qishuReward["qishuyaojian"][qishuLevelArr]=0;
                                qishuReward["qishuyaojian"][qishuLevelArr]++;
                                number--;
                            }
                        }else{
                            var qishuLevelArr=qishuList.randomGet();
                            if(!qishuReward["qishuyaojian"][qishuLevelArr]) qishuReward["qishuyaojian"][qishuLevelArr]=0;
                            qishuReward["qishuyaojian"][qishuLevelArr]++;
                        }

                        if(!qishuReward["cailiao"]["xjzh_cailiao_shijieshi"]) qishuReward["cailiao"]["xjzh_cailiao_shijieshi"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_shijieshi"]+=qishumingyushi?2:1;

                        if(!qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]) qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]+=qishumingyushi?2:1;

                        qishuReward["suipian"]+=qishumingyushi?60*2:60;

                        qishuReward["suipian"]*=2;
                    break;
                    //如果boss为瓦尔申
                    //获得粘液覆盖的蛋1个
                    //额外获得10个碎片
                    //必定掉落疯狼的狂喜、瓦西里的祷告之一
                    case "xjzh_boss_waershen":
                        let number=1;
                        if(!qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]) qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]=0;
                        if(game.xjzhAchi.hasAchi('净化恶念','game')) number=2;

                        qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]+=qishumingyushi?number*2:number;

                        qishuReward["suipian"]+=qishumingyushi?10*2:10;
                    break;
                    //如果boss为格里高利
                    //获得苦痛碎片1个
                    //额外获得10个碎片
                    case "xjzh_boss_geligaoli":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_kutong"]) qishuReward["cailiao"]["xjzh_cailiao_kutong"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_kutong"]+=qishumingyushi?2:1;

                        qishuReward["suipian"]+=qishumingyushi?10*2:10;
                    break;
                    //如果boss为都瑞尔
                    //额外获得45个碎片
                    //必定掉落风暴咆哮、瓦西里的祷告、痛苦吞食者之一
                    //有几率掉落一个冥狱石
                    case "xjzh_boss_duruier":
                        var randomNum=(Object.keys(cailiaoList).length/0.5)/100;
                        if(Math.random()<randomNum){
                            if(!qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]) qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]=0;
                            qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]+=qishumingyushi?2:1;;
                        }

                        qishuReward["suipian"]+=qishumingyushi?45*2:45;

                        var qishuLevel4=["xjzh_qishu_fengbaopaoxiao","xjzh_qishu_xjzh_qishu_waxilidedaogao","xjzh_qishu_tongkuhushou"];

                        if(qishumingyushi==true){
                            let number=2;
                            while(number>0){
                                var qishuLevel4Arr=qishuLevel4.randomGet();

                                if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                                qishuReward["qishuyaojian"][qishuLevel4Arr]++;

                                number--;
                            }
                        }else{
                            var qishuLevel4Arr=qishuLevel4.randomGet();

                            if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                            qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                        }


                    break;
                    //如果boss为齐尔领主
                    //获得焦沙枷锁1个
                    //额外获得10个碎片
                    //必定掉落疯狼的狂喜、瓦西里的祷告之一
                    case "xjzh_boss_qier":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_jiasuo"]) qishuReward["cailiao"]["xjzh_cailiao_jiasuo"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_jiasuo"]+=qishumingyushi?2:1;

                        qishuReward["suipian"]+=qishumingyushi?10*2:10;
                    break;
                    //如果boss为冰川巨兽
                    //获得针扎娃娃1个
                    //额外获得10个碎片
                    case "xjzh_boss_bingchuanjushou":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_wawa"]) qishuReward["cailiao"]["xjzh_cailiao_wawa"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_wawa"]+=qishumingyushi?2:1;

                        qishuReward["suipian"]+=qishumingyushi?10*2:10;
                    break;
                    //如果boss为安达利尔
                    //额外获得45个碎片
                    //必定掉落无餍之怒、疯狼的狂喜、无名者兜帽之一
                    //有几率掉落一个冥狱石
                    case "xjzh_boss_andalier":
                        var randomNum=(Object.keys(cailiaoList).length/0.5)/100;
                        if(Math.random()<randomNum){
                            if(!qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]) qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]=0;
                            qishuReward["cailiao"]["xjzh_cailiao_mingyushi"]+=qishumingyushi?2:1;
                        }

                        qishuReward["suipian"]+=qishumingyushi?45*2:45;

                        var qishuLevel4=["xjzh_qishu_wuyan","xjzh_qishu_fenglangkx","xjzh_qishu_wumingzhe"];

                        if(qishumingyushi==true){
                            let number=2;
                            while(number>0){
                                var qishuLevel4Arr=qishuLevel4.randomGet();

                                if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                                qishuReward["qishuyaojian"][qishuLevel4Arr]++;

                                number--;
                            }
                        }else{
                            var qishuLevel4Arr=qishuLevel4.randomGet();

                            if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                            qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                        }

                    break;
                };

            }

            //展示奖励结算面板数据
            var str='当前模式：'+get.translation(get.mode())+'<br><br>当前玩家：'+lib.config.xjzh_qishuyaojians.name+'（'+get.translation(game.me.name)+'）<br><br>总计得分：'+num2+'<br><br>对局奖励：';

            str+='<br>&emsp;&emsp;经验（'+num3+'）';

            for(var i in qishuReward){
                switch(i){
                    case "suipian":{
                        if(qishuReward[i]>0){
                            game.xjzh_changeSuipian(qishuReward[i]);
                            str+='<br>&emsp;&emsp;碎片（'+qishuReward[i]+'个）';
                        }
                    };
                    break;
                    case "jingpo":{
                        if(qishuReward[i]>0){
                            game.xjzh_changeTokens(qishuReward[i]);
                            str+='<br>&emsp;&emsp;精魄（'+qishuReward[i]+'个）';
                        }
                    };
                    break;
                    case "qishuyaojian":{
                        var qishuListt=qishuReward[i];
                        if(Object.keys(qishuListt).length>0){
                            for(var j in qishuListt){
                                if(qishuListt[j]>0){
                                    game.xjzh_gainEquip(j,qishuListt[j]);
                                    str+='<br>&emsp;&emsp;'+get.xjzh_qishuTranslate(j)+'（'+qishuListt[j]+'个）';
                                }
                            }
                        }
                    };
                    break;
                    case "cailiao":{
                        var cailiaoListt=qishuReward[i];
                        for(var j in cailiaoListt){
                            if(cailiaoListt[j]>0){
                                game.xjzh_changeCailiao(j,cailiaoListt[j]);
                                str+='<br>&emsp;&emsp;'+get.xjzh_cailiaoTranslate(j)+'（'+cailiaoListt[j]+'个）';
                            }
                        }
                    };
                    break;
                };
            }

            var doneAchievemen=await lib.xjzh_hasDoneAchievement;

            if(doneAchievemen&&doneAchievemen.length>0){
                str+="<br>成就奖励："
                for(var i of doneAchievemen){
                    var name=i.split(",");
                    var info=game.xjzhAchi.info(name[1],name[0]);
                    str+=`<br>&emsp;&emsp;${name[1]}：<br>&emsp;&emsp;&emsp;&emsp;碎片：${info.level*100}<br>&emsp;&emsp;&emsp;&emsp;精魄：${info.level}`;
                }
            }

            game.xjzh_levelUp(qishumingyushi?num3*2:num3);

            game.xjzh_qishuWinner("奖励结算",str);
        }
    });

    lib.skill['xjzh_qishu_materialRemove']={
        trigger:{
            global:"gameStart",
            player:"enterGame",
        },
		silent:true,
		firstDo:true,
		priority:Infinity,
        filter:function(event,player){
            return game.boss!=game.me;
        },
        init:function(player){
            window.qishumingyushi=false;
            if(game.getExtensionConfig("仙家之魂","xjzh_qishuBossPower")){
                if(get.xjzh_cailiao("xjzh_cailiao_mingyushi")>1) window.qishumingyushi=true;
            }

            if(!player.storage.xjzh_qishu_materialRemove) player.storage.xjzh_qishu_materialRemove=player.getOriginalSkills();
			var qishuRemove=window.setInterval(function(){
				for(var skill of player.storage.xjzh_qishu_materialRemove){
				    if(!player.hasSkill(skill)){
				        if(skill=="xjzh_qishu_materialRemove"){
				            window.clearInterval(qishuRemove);
				        };
				        player.addSkill(skill);
				    };
				}
			},1000);

            let dieFunc=player.die;
            player.die=()=>{
                if(player.getHp(true)>0){
                    game.log(`检测到${get.translation(player)}的体力值大于0，已为其终止阵亡结算`);
                    return;
                }
                let die=dieFunc.apply(player,arguments);
                return die;
            };
        },
        async content(event,trigger,player){
            let {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao,qishumingyushi=window.qishumingyushi,qishuName=lib.config.xjzh_qishuyaojians.name,str=`${qishuName?qishuName:"无名玩家"}消耗了`;

            //只要qishumingyushi为真，就消耗两个冥狱石
            //设置boss被强化的数据
            if(qishumingyushi){
                game.xjzh_changeCailiao("xjzh_cailiao_mingyushi",-2);
                let boss=game.boss;
                await game.boss.gainMaxHp(game.boss.maxHp);
                await game.boss.recoverTo(game.boss.maxHp);
                await game.boss.drawTo(game.boss.maxHp);
            }

            switch(get.nameList(game.boss)[0]){
                //如果boss为天堂试炼
                //消耗世界石碎片一个
                case "xjzh_boss_ttshilian":
                    game.xjzh_changeCailiao("xjzh_cailiao_shijieshi",qishumingyushi?-3:-1);
                    str+=`${qishumingyushi?3:1}个${get.xjzh_cailiaoTranslate("xjzh_cailiao_shijieshi")}开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为莉莉丝
                //消耗除世界上碎片、冥狱石之外的所有材料各两个
                case "xjzh_boss_lilisi":
                    var list=Object.keys(cailiaoList).filter(item=>!["xjzh_cailiao_shijieshi","xjzh_cailiao_mingyushi"].includes(item)),arrList=[];
                    for(var i=0;i<list.length;i++){
                        game.xjzh_changeCailiao(list[i],qishumingyushi?-6:-2);
                        arrList.push(get.xjzh_cailiaoTranslate(list[i]));
                    }
                    str+=`${arrList}各${qishumingyushi?6:2}个开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为瓦尔申
                //消耗恶念之心四个
                case "xjzh_boss_waershen":
                    game.xjzh_changeCailiao("xjzh_cailiao_enianzhixin",qishumingyushi?-12:-4);
                    str+=`${qishumingyushi?12:4}个${get.xjzh_cailiaoTranslate("xjzh_cailiao_enianzhixin")}开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为格里高利
                //消耗活体钢铁5个
                case "xjzh_boss_geligaoli":
                    game.xjzh_changeCailiao("xjzh_cailiao_gangtie",qishumingyushi?-15:-5);
                    str+=`${qishumingyushi?15:5}个${get.xjzh_cailiaoTranslate("xjzh_cailiao_enianzhixin")}开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为都瑞尔
                //消耗苦痛碎片、粘液覆盖的蛋各2个
                case "xjzh_boss_duruier":
                    game.xjzh_changeCailiao("xjzh_cailiao_nianyedan",qishumingyushi?-6:-2);
                    game.xjzh_changeCailiao("xjzh_cailiao_kutong",qishumingyushi?-6:-2);
                    str+=`${get.xjzh_cailiaoTranslate("xjzh_cailiao_nianyedan")}、${get.xjzh_cailiaoTranslate("xjzh_cailiao_kutong")}各${qishumingyushi?6:2}个开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为齐尔领主
                //消耗提纯的鲜血9个
                case "xjzh_boss_qier":
                    game.xjzh_changeCailiao("xjzh_cailiao_xianxue",qishumingyushi?-27:-9);
                    str+=`${qishumingyushi?27:9}个${get.xjzh_cailiaoTranslate("xjzh_cailiao_xianxue")}开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为冰川巨兽
                //消耗提纯的恐惧9个
                case "xjzh_boss_bingchuanjushou":
                    game.xjzh_changeCailiao("xjzh_cailiao_kongju",qishumingyushi?-27:-9);
                    str+=`${qishumingyushi?27:9}个${get.xjzh_cailiaoTranslate("xjzh_cailiao_kongju")}开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
                //如果boss为安达利尔
                //消耗焦沙枷锁、针扎娃娃各2个
                case "xjzh_boss_andalier":
                    game.xjzh_changeCailiao("xjzh_cailiao_wawa",qishumingyushi?-6:-2);
                    game.xjzh_changeCailiao("xjzh_cailiao_jiasuo",qishumingyushi?-6:-2);
                    str+=`${get.xjzh_cailiaoTranslate("xjzh_cailiao_wawa")}、${get.xjzh_cailiaoTranslate("xjzh_cailiao_jiasuo")}各${qishumingyushi?6:2}个开启了${get.translation(get.nameList(game.boss)[0])}挑战`;
                break;
            };
            game.log(str);
        },
    };

});