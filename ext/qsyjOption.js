'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	lib.arenaReady.push(function(){
	    if(lib.characterPack['XWTZ']){
	        var characters=lib.characterPack['XWTZ']
	    }else{
	        return;
	    }
	    var func=function(){
    	    for(var i in characters){
    		    if(!characters[i][4]) continue;
    		    if(!characters[i][4].includes("qishuBoss")) continue;
    		    characters[i][4].remove('boss');
    		    characters[i][4].remove('bossallowed');
    	        characters[i][4].push('unseen');
    	        characters[i][4].push('forbidai');
    		}
	    };
	    var func2=function(name){
    		if(!characters[name]) return;
    		if(!characters[name][4]) return;
    	    if(!characters[name][4].includes("qishuBoss")) return;
    		characters[name][4].remove('boss');
    	    characters[name][4].remove('bossallowed');
            characters[name][4].push('unseen');
   	        characters[name][4].push('forbidai');
	    };
	    if(!lib.config.xjzh_qishuyaojians.cailiao||!characters||characters==undefined){
	        func();
	        return;
	    };
	    
	    //判断材料数量是否能够开启莉莉丝挑战
        var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
	    if(Object.keys(cailiaoList).some(item=>get.xjzh_cailiao(item)<1)){
	        func2("xjzh_boss_lilisi");
	    }
	    
	    //判断材料数量是否能够开启瓦尔申挑战
	    if(Object.keys(cailiaoList).filter(function(item){
	        return ["xjzh_cailiao_gugu","xjzh_cailiao_toulu","xjzh_cailiao_zhanshou","xjzh_cailiao_enianzhixin"].includes(item);
	    }).some((item,index)=>{
	        return get.xjzh_cailiao(item)<1;
	    })){
	        func2("xjzh_boss_waershen");
	    }
	    
	    //判断材料数量是否能够开启格里高利挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_gangtie")<5){
	        func2("xjzh_boss_geligaoli");
	    }
	    
	    //判断材料数量是否能够开启都瑞尔挑战
	    if(Object.keys(cailiaoList).filter(function(item){
	        return ["xjzh_cailiao_nianyedan","xjzh_cailiao_kutong"].includes(item);
	    }).some((item,index)=>{
	        return get.xjzh_cailiao(item)<2;
	    })){
	        func2("xjzh_boss_duruier");
	    }
	    
	    //判断材料数量是否能够开启冰川巨兽挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_kongju")<9){
	        func2("xjzh_boss_bingchuanjushou");
	    }
	    
	    //判断材料数量是否能够开启齐尔领主挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_xianxue")<9){
	        func2("xjzh_boss_qier");
	    }
	    
	    //判断材料数量是否能够开启天堂试炼挑战
	    if(get.xjzh_cailiao("xjzh_cailiao_shijieshi")<1){
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
    
    lib.onover.push(function(ret){
        if(!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")) return;
        if(ret){
            //统计本剧得分
            var player=game.me;
            //限制仅为身份模式、斗地主模式、挑战模式，否则终止运行
            if(!['identity','doudizhu','boss'].includes(get.mode())) return;
            if(get.mode()=="boss"){
                //如果为挑战模式且玩家为boss则终止运行
                if(game.boss==player) return;
                if(!get.xjzh_wujiang(game.boss)) return;
            }
            //判断是否为身份模式或斗地主模式
            else if(['identity','doudizhu'].includes(get.mode())){
                //如果玩家操作的武将不为仙家之魂武将则终止运行
                if(!get.xjzh_wujiang(player)) return;
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
        		    "xjzh_cailiao_gugu":0,
        		    "xjzh_cailiao_toulu":0,
        		    "xjzh_cailiao_zhanshou":0,
        		    "xjzh_cailiao_enianzhixin":0
        		},
        	};
            //碎片获得
            var suipian=Math.floor(num2);
            qishuReward["suipian"]+=suipian;
            
            //材料获得
            var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
            var cailiaoList2=Object.keys(cailiaoList).filter(function(item){
	            return ["xjzh_cailiao_gugu","xjzh_cailiao_toulu","xjzh_cailiao_zhanshou","xjzh_cailiao_enianzhixin"].includes(item);
	        });
	        
	        console.log(cailiaoList2)
	        
	        var numx=0;
	        while(numx<4){
	            if(Math.random()<=num2/300){
	                var index=cailiaoList2.randomGet();
	                qishuReward["cailiao"][index]+=1;
	            }
	            numx++
	        }
	        
            var qishuList=[];
            for(var i in lib.xjzh_qishuyaojians){
				var level=get.xjzh_equipInfo(i).level||1;
				if(level&&level<5) qishuList.push(i);
			}
			
            //精魄及奇术要件获得，若boss为莉莉丝则必定获得一个，额外获得至少0个，至多为3个;
            if(get.mode()=="boss"){
                //消耗材料
                switch(get.playerName(game.boss)[0]){
                    //如果boss为莉莉丝
                    //必定获得精魄1个，额外获得精魄0-碎片数量个
                    //最终获得碎片数量乘2
                    //有几率获得随机1-4级奇术要件1个
                    case "xjzh_boss_lilisi":
                        for(var i in cailiaoList){
                            game.xjzh_changeCailiao(i,-2);
                        }
                        qishuReward["jingpo"]+=1+get.rand(0,3);
                        if(Math.random()<=num2/100){
                            qishuReward["qishuyaojian"][qishuList.randomGet()]=1;
                        }
                        qishuReward["suipian"]*=2;
                    break;
                    //如果boss为瓦尔申
                    //获得活体钢铁2个
                    //获得粘液覆盖的蛋1个
                    //额外获得3个碎片
                    case "xjzh_boss_waershen":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_gangtie"]) qishuReward["cailiao"]["xjzh_cailiao_gangtie"]=0;
                        if(!game.xjzhAchi.hasAchi('净化恶念','game')) qishuReward["cailiao"]["xjzh_cailiao_gangtie"]+=2;
                        else qishuReward["cailiao"]["xjzh_cailiao_gangtie"]+=3;
                        if(!qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]) qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]=0;
                        if(!game.xjzhAchi.hasAchi('净化恶念','game')) qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]+=1;
                        else qishuReward["cailiao"]["xjzh_cailiao_nianyedan"]+=2;
                        qishuReward["suipian"]+=3;
                        var qishuLevel4=["xjzh_qishu_waxilidedaogao","xjzh_qishu_fenglangkx"];
                        var qishuLevel4Arr=qishuLevel4.randomGet();
                        if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                        qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                    break;
                    //如果boss为格里高利
                    //获得苦痛碎片1个
                    //额外获得5个碎片
                    case "xjzh_boss_geligaoli":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_kutong"]) qishuReward["cailiao"]["xjzh_cailiao_kutong"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_kutong"]+=1;
                        qishuReward["suipian"]+=5;
                    break;
                    //如果boss为都瑞尔
                    //获得提纯的恐惧2个
                    //获得提纯的鲜血2个
                    //额外获得7个碎片
                    case "xjzh_boss_duruier":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_kongju"]) qishuReward["cailiao"]["xjzh_cailiao_kongju"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_kongju"]+=2;
                        if(!qishuReward["cailiao"]["xjzh_cailiao_xianxue"]) qishuReward["cailiao"]["xjzh_cailiao_xianxue"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_xianxue"]+=2;
                        qishuReward["suipian"]+=7;
                        var qishuLevel4=["xjzh_qishu_fengbaopaoxiao","xjzh_qishu_titoushi"];
                        var qishuLevel4Arr=qishuLevel4.randomGet();
                        if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                        qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                    break;
                    //如果boss为齐尔领主
                    //获得提纯的恐惧3个
                    //额外获得10个碎片
                    case "xjzh_boss_qier":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_kongju"]) qishuReward["cailiao"]["xjzh_cailiao_kongju"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_kongju"]+=3;
                        qishuReward["suipian"]+=10;
                        var qishuLevel4=["xjzh_qishu_waxilidedaogao","xjzh_qishu_fenglangkx"];
                        var qishuLevel4Arr=qishuLevel4.randomGet();
                        if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                        qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                    break;
                    //如果boss为冰川巨兽
                    //获得提纯的鲜血3个
                    //额外获得10个碎片
                    case "xjzh_boss_bingchuanjushou":
                        if(!qishuReward["cailiao"]["xjzh_cailiao_xianxue"]) qishuReward["cailiao"]["xjzh_cailiao_xianxue"]=0;
                        qishuReward["cailiao"]["xjzh_cailiao_xianxue"]+=3;
                        qishuReward["suipian"]+=10;
                        var qishuLevel4=["xjzh_qishu_wuyan"];
                        var qishuLevel4Arr=qishuLevel4.randomGet();
                        if(!qishuReward["qishuyaojian"][qishuLevel4Arr]) qishuReward["qishuyaojian"][qishuLevel4Arr]=0;
                        qishuReward["qishuyaojian"][qishuLevel4Arr]++;
                    break;
                };
                
            }
    	    
    	    console.log(qishuReward);
			
            //展示奖励结算面板数据
            var str='当前模式：'+get.translation(get.mode())+'<br><br>当前玩家：'+lib.config.xjzh_qishuyaojians.name+'（'+get.translation(game.me.name)+'）<br><br>总计得分：'+num2+'<br><br>获得奖励：';
            
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
            
            game.xjzh_levelUp(num3);
            
            game.xjzh_qishuWinner("奖励结算",str)
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
        },
        group:["xjzh_qishu_materialRemove_nodie"],
        content:function(){
            var {...cailiaoList}=lib.config.xjzh_qishuyaojians.cailiao;
            var cailiaoList2=Object.keys(cailiaoList).filter(function(item){
	            return ["xjzh_cailiao_gugu","xjzh_cailiao_toulu","xjzh_cailiao_zhanshou","xjzh_cailiao_enianzhixin"].includes(item);
	        });
	        console.log(cailiaoList2)
	        var str="";
	        var qishuName=lib.config.xjzh_qishuyaojians.name;
            switch(get.playerName(game.boss)[0]){
                //如果boss为天堂试炼
                //消耗世界石碎片一个
                case "xjzh_boss_ttshilian":
                    game.xjzh_changeCailiao("xjzh_cailiao_shijieshi",-1);
                    game.log(qishuName?qishuName:"无名玩家","消耗了1个","#g世界石碎片","开启了","#y天堂试炼","挑战");
                break;
                //如果boss为莉莉丝
                //消耗所有材料各两个
                case "xjzh_boss_lilisi":
                    var list=Object.keys(cailiaoList);
                    for(var i=0;i<list.length;i++){
                        game.xjzh_changeCailiao(list[i],-2);
                        str+=get.xjzh_cailiaoTranslate(list[i]);
                        if(i!=list.length-1) str+="、";
                    }
                    game.log(qishuName?qishuName:"无名玩家","消耗了","#g"+str+"","各2个开启了","#y莉莉丝","挑战");
                break;
                //如果boss为瓦尔申
                //消耗发黑的股骨、颤栗之手、恶念之心、咕噜头颅各一个
                case "xjzh_boss_waershen":
                    for(var i=0;i<cailiaoList2.length;i++){
                        game.xjzh_changeCailiao(cailiaoList2[i],-1);
                        str+=get.xjzh_cailiaoTranslate(cailiaoList2[i]);
                        if(i!=cailiaoList2.length-1) str+="、";
                    }
                    game.log(qishuName?qishuName:"无名玩家","消耗了","#g"+str+"","各1个开启了","#y瓦尔申","挑战");
                break;
                //如果boss为格里高利
                //消耗活体钢铁5个
                case "xjzh_boss_geligaoli":
                    game.xjzh_changeCailiao("xjzh_cailiao_gangtie",-5);
                    game.log(qishuName?qishuName:"无名玩家","消耗了5个","#g活体钢铁","开启了","#y格里高利","挑战");
                break;
                //如果boss为都瑞尔
                //消耗苦痛碎片、粘液覆盖的蛋各2个
                case "xjzh_boss_duruier":
                    game.xjzh_changeCailiao("xjzh_cailiao_nianyedan",-2);
                    game.xjzh_changeCailiao("xjzh_cailiao_kutong",-2);
                    game.log(qishuName?qishuName:"无名玩家","消耗了","#g苦痛碎片、粘液覆盖的蛋","各2个开启了","#y都瑞尔","挑战");
                break;
                //如果boss为齐尔领主
                //消耗提纯的鲜血9个
                case "xjzh_boss_qier":
                    game.xjzh_changeCailiao("xjzh_cailiao_xianxue",-9);
                    game.log(qishuName?qishuName:"无名玩家","消耗了9个","#g提纯的鲜血","开启了","#y齐尔领主","挑战");
                break;
                //如果boss为冰川巨兽
                //消耗提纯的恐惧9个
                case "xjzh_boss_bingchuanjushou":
                    game.xjzh_changeCailiao("xjzh_cailiao_kongju",-9);
                    game.log(qishuName?qishuName:"无名玩家","消耗了9个","#g提纯的恐惧","开启了","#y冰川巨兽","挑战");
                break;
            };
        },
        subSkill:{
            "nodie":{
                trigger:{
                    player:"dieBefore",
                },
                silent:true,
                sub:true,
                priority:5,
                filter:function(event,player){
                    return player.hp>0;
                },
                content:function(){
                    trigger.cancel(null,null,'notrigger');
                    game.log(`检测到${get.translation(player)}的体力值大于0，已为其终止阵亡结算`);
                },
            },
        },
    };
    
});