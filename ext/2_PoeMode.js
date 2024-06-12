'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
	// ---------------------------------------POE模式------------------------------------------//
	if(!lib.config.extension_仙家之魂_xjzh_poemode) return;
	
	////相关函数
	
	
	//以下定义仅用于poe模式
	
	//修改回复体力
	lib.element.content.recover=function(){
		if(lib.config.background_audio){
			game.playAudio('effect','recover');
		}
		game.broadcast(function(){
			if(lib.config.background_audio){
				game.playAudio('effect','recover');
			}
		});
		num=num*100
		if(num>get.xjzhmaxHp(player)-get.xjzhHp(player)){
			num=get.xjzhmaxHp(player)-get.xjzhHp(player);
		}
		if(num>0){
			player.changexjzhHp(num);
			game.broadcastAll(function(player){
				if(lib.config.animation&&!lib.config.low_performance){
					player.$recover();
				}
			},player);
			player.$damagepop(num,'wood');
			game.log(player,'回复了'+get.cnNumber(num)+'点体力')
		}
	};
	lib.element.player.recover=function(){
		var next=game.createEvent('recover');
		next.player=this;
		var nocard,nosource;
		var event=_status.event;
		for(var i=0;i<arguments.length;i++){
			if(get.itemtype(arguments[i])=='cards'){
				next.cards=arguments[i].slice(0);
			}
			else if(get.itemtype(arguments[i])=='card'){
				next.card=arguments[i];
			}
			else if(get.itemtype(arguments[i])=='player'){
				next.source=arguments[i];
			}
			else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
				next.card=arguments[i];
			}
			else if(typeof arguments[i]=='number'){
				next.num=arguments[i];
			}
			else if(arguments[i]=='nocard'){
				nocard=true;
			}
			else if(arguments[i]=='nosource'){
				nosource=true;
			}
		}
		if(next.card==undefined&&!nocard) next.card=event.card;
		if(next.cards==undefined&&!nocard) next.cards=event.cards;
		if(next.source==undefined&&!nosource) next.source=event.player;
		if(next.num==undefined) next.num=1;
		if(next.num<=0) _status.event.next.remove(next);
		next.setContent('recover');
		return next;
	};
	
	
	//获取角色体力和体力上限
	get.xjzhHp=function(player){
		return player.storage.xjzhHp;
	};
	get.xjzhmaxHp=function(player){
		return player.storage.xjzhmaxHp;
	};
	//修改体力
	lib.element.player.changexjzhHp=function(num){
		var next=game.createEvent('changexjzhHp',false);
		next.num=num;
		next.player=this;
		next.setContent('changexjzhHp');
		return next;
	};
	lib.element.content.changexjzhHp=function(){
		"step 0"
		event.forceDie=true;
		"step 1"
		if(!player.storage.xjzhHp) player.storage.xjzhHp=0;
		player.storage.xjzhHp+=num;
		if(num>0){
		    player.$recover();
			game.playAudio('effect','recover');
			event.goto(8);
		}
		"step 2"
		event.trigger('damageBegin1');
	    "step 3"
	    event.trigger('damageBegin2');
		"step 4"
		event.trigger('damageBegin3');
		"step 5"
		event.trigger('damageBegin4');
		"step 6"
		if(num==0){
			event.trigger('damageZero');
			event._triggered=null;
		}
		else if(num<0){
			event.trigger('damage');
		}
		"step 7"
	    if(lib.config.background_audio){
		    game.playAudio('effect','damage'+(num<=-2?'2':''));
		}
	    game.broadcast(function(num){
		    if(lib.config.background_audio){
    			game.playAudio('effect','damage'+(num<=-21?'2':''));
		    }
	    },num);
		var str='受到了';
	    if(source) str+='来自<span class="bluetext">'+(source==player?'自己':get.translation(source))+'</span>的';
		str+=get.cnNumber(-num)+'点';
	    if(event.nature) str+=get.translation(event.nature)+'属性';
	    str+='伤害';
	    game.log(player,str);
    	if(player.stat[player.stat.length-1].damaged==undefined){
	    	player.stat[player.stat.length-1].damaged=num;
    	}
	    else{
		    player.stat[player.stat.length-1].damaged+=num;
	    }
	    if(source){
		    source.getHistory('sourceDamage').push(event);
		    if(source.stat[source.stat.length-1].damage==undefined){
			    source.stat[source.stat.length-1].damage=num;
		    }
		    else{
			    source.stat[source.stat.length-1].damage+=num;
		    }
	    }
	    player.getHistory('damage').push(event);
	    if(event.animate){
		    player.$damage(source);
		    game.broadcastAll(function(nature,player){
			    if(lib.config.animation&&!lib.config.low_performance){
				    if(event.nature=='fire'){
					    player.$fire();
				    }
			    	else if(event.nature=='thunder'){
		    			player.$thunder();
				    }
			    }
		    },event.nature,player);
		    var numx=Math.max(0,-num-player.hujia);
		    player.$damagepop(-numx,event.nature);
	    }    
	    if(source&&lib.config.border_style=='auto'){
		    var dnum=0;
		    for(var j=0;j<source.stat.length;j++){
			    if(source.stat[j].damage!=undefined) dnum+=source.stat[j].damage;
		    }
		    if(dnum>=2){
			    if(lib.config.autoborder_start=='silver'){
				    dnum+=4;
			    }
			    else if(lib.config.autoborder_start=='gold'){
				    dnum+=8;
			    }
		    }
		    if(lib.config.autoborder_count=='damage'){
			    source.node.framebg.dataset.decoration='';
			    if(dnum>=10){
				    source.node.framebg.dataset.auto='gold';
				    if(dnum>=12) source.node.framebg.dataset.decoration='gold';
			    }
			    else if(dnum>=6){
				    source.node.framebg.dataset.auto='silver';
				    if(dnum>=8) source.node.framebg.dataset.decoration='silver';
			    }
			    else if(dnum>=2){
				    source.node.framebg.dataset.auto='bronze';
				    if(dnum>=4) source.node.framebg.dataset.decoration='bronze';
			    }
			    if(dnum>=2){
				    source.classList.add('topcount');
			    }
		    }
		    else if(lib.config.autoborder_count=='mix'){
			    source.node.framebg.dataset.decoration='';
			    switch(source.node.framebg.dataset.auto){
				    case 'bronze':if(dnum>=4) source.node.framebg.dataset.decoration='bronze';break;
	    			case 'silver':if(dnum>=8) source.node.framebg.dataset.decoration='silver';break;
    				case 'gold':if(dnum>=12) source.node.framebg.dataset.decoration='gold';break;
	    		}
	    	}
		}
		"step 8"
		if(isNaN(player.storage.xjzhHp)||player.storage.xjzhHp<0) player.storage.xjzhHp=0;
		if(player.storage.xjzhHp>player.storage.xjzhmaxHp) player.storage.xjzhHp=player.storage.xjzhmaxHp;
		"step 9"
		player.xjzhshowHp(player.storage.xjzhHp,player.storage.xjzhmaxHp);
		"step 10"
		var nums=get.xjzhHp(player)/get.xjzhmaxHp(player);
		var nums2=player.maxHp*nums;
		player.hp=Math.ceil(nums2);
		player.update();
		"step 11"
		if(get.xjzhHp(player)<=0&&player.isAlive()&&!event.nodying){
			game.delayx();
			event._dyinged=true;
			player.dying(event);
		}
		"step 12"
		if(num>0) event.goto(16);
		"step 13"
		event.trigger('damageSource');
		"step 14"
		event.trigger('damageEnd');
		"step 15"
		event.trigger('damageAfter');
		"step 16"
		event.trigger('changexjzhHp');
	};
	//修改体力上限
	lib.element.player.changexjzhmaxHp=function(num){
		var next=game.createEvent('changexjzhmaxHp',false);
		next.num=num;
		next.player=this;
		next.setContent('changexjzhmaxHp');
		return next;
	};
	lib.element.content.changexjzhmaxHp=function(){
		'step 0'
		if(num==0) return;
		if(!player.storage.xjzhmaxHp) player.storage.xjzhmaxHp=0;
		player.storage.xjzhmaxHp+=num;
		if(num>0){
		    //player.$recover();
			game.playAudio('effect','recover');
		}
		if(isNaN(player.storage.xjzhmaxHp)||player.storage.xjzhmaxHp<0) player.storage.xjzhmaxHp=0;
		if(player.storage.xjzhHp>player.storage.xjzhmaxHp){
			player.storage.xjzhHp=player.storage.xjzhmaxHp;
		}
		'step 1'
		player.xjzhshowHp(get.xjzhHp(player),get.xjzhmaxHp(player));
		"step 2"
		event.trigger('changexjzhmaxHp');
	};
	//体力显示
	lib.element.player.xjzhshowHp=function(arg,arg2){
		//if(!this.node.hp){
			this.node.xjzhhp=ui.create.div(".xjzhhp",this);
		//}
		var xjzhhpdiv=ui.create.div(".xjzhhpdiv",this.node.xjzhhp,"<span class='xjzhhptext'>"+arg+"/"+arg2+"</span>");
		xjzhhpdiv.style.width=arg/arg2*100+"%";
	};
	//以上定义仅用于poe模式
	///以下函数非原创
	
	//获取装备类型
	get.poeEquip=function(type){
		if(type==1){
			return poetype1;
		}
		else if(type==2){
			return poetype2;
		}
		else if(type==3){
			return poetype3;
		}
		else if(type==4){
			return poetype4;
		}
		else if(type==5){
			return poetype5;
		}
		else if(type==6){
			return poetype6;
		}
		else if(type==7){
			return poetype7;
		}
		else if(type==8){
			return poetype8;
		}
		else if(type==9){
			return poetype9;
		}
		else if(type==10){
			return poetype10;
		}
		else if(type==11){
			return poetype11;
		}
		return [];
	};
	
	//判断是否有装备
	/*get.haspoeEquip=function(player,name){
		var zblist=player.storage.buypoeList;
		for(var i=0;i<zblist.length;i++){
			if(zblist[i].name==name){
				return true;
			}
		}
		return false;
	};
	
	//判断已装备数量
	get.countpoeEquip=function(player,name){
		var zblist=player.storage.buypoeList;
		var count=0;
		for(var a=0;a<zblist.length;a++){
			if(zblist[a].name==name){
				count++;
			}
		}
		return count;
	};*/
	///以上函数非原创
	
	//获取物理伤害
	get.poePhyatk=function(player){
		var phyatk=0;
		if(player.storage.phyatk){
			phyatk=player.storage.phyatk;
		}
		return phyatk;
	};
	
	//获取法术伤害
	get.poeMagatk=function(player){
		var magatk=0;
		if(player.storage.magatk){
			magatk=player.storage.magatk;
		}
		return magatk;
	};
	
	//升级
	lib.element.player.levelUp=function(){
	    var next=game.createEvent('levelUp');
		next.player=this;
		next.setContent('levelUp');
		return next;
	};
	lib.element.content.levelUp=function(){
	    "step 0"
		var exp=player.storage.level*15
		player.removeMark("_poestart_jingyan",exp,false);
		player.storage.level++
		player.$fullscreenpop('升级','thunder');
		player.useSkill("poeLevelUp");
		"step 1"
		event.trigger('levelUp');
	};
	lib.skill.poeLevelUp={
		direct:true,
		content:function(){
			"step 0"
			game.log(player,"升级了，当前等级",player.storage.level);
			//三维属性
			player.storage.attstr+=get.rand(5,7);
			player.storage.attagi+=get.rand(5,7);
			player.storage.attint+=get.rand(5,7);
			//攻击
			//物理攻击
			player.storage.phyatk=player.storage.phyatk+get.rand(10,20)+Math.floor(player.storage.attstr/5);
			//元素攻击
			player.storage.magatk=player.storage.magatk+get.rand(10,20);
			//定义体力
			var num=get.rand(30,50);
			changexjzhmaxHp(num);
			player.changexjzhHp(num);
			"step 1"
			player.logSkill("poeLevelUp")
		},
	};
	
	///以下定义没有作用
	//三维属性
	var attstr=[]//力量
	var attagi=[]//敏捷
	var attint=[]//智力
	
	//攻击属性
	var poeAttack=["phyatk","magatk"]
	var phyatk=[]//物理伤害
	var magatk=[]//元素伤害
	
	//抗性
	var poefirresis=[]//火焰抗性
	var poeiceresis=[]//冰霜抗性
	var poethunderresis=[]//雷电抗性
	
	//护甲
	var poearmor=[]
	
	//等级
	var level=[]
	///以上定义没有作用
	
	//游戏开始
	lib.skill._poestart={
		trigger:{
			global:"gameStart",
			player:"enterGame"
		},
		onremove:function(player){
			player.addSkill('_poestart');
		},
		mark:true,
		marktext:"流",
		intro:{
			name:"属性面板",
			content:function(storage,player){
				var str='';
				
				//等级
				var num0=player.storage.level
				
				//经验
				var exp=num0*15
				
				//三维属性
				var num1=player.storage.attstr
				var num2=player.storage.attagi
				var num3=player.storage.attint
				
				//攻击属性
				var num4=player.storage.phyatk//物理攻击
				var num5=player.storage.magatk//元素攻击
				
				//防御属性
				var num6=player.storage.poefireresis*100//火焰抗性
				var num7=player.storage.poeiceresis*100//冰霜抗性
				var num8=player.storage.poethunderresis*100//闪电抗性
				
				var n1=player.storage.poearmor
				var n2=player.storage.poearmor/32
				var n3=player.storage.level/2
				var num9=Math.ceil(n2/n3)
				
				//翻译
				str+="等级:"+get.translation(num0)+"<br>";
				str+="经验:"+get.translation(player.countMark("_poestart_jingyan"))+"/"+get.translation(exp)+"<br><br>";
				
				str+="三维属性:<br>";
				if(num1)str+='力量：'+get.translation(num1);
				if(num2)str+='敏捷：'+get.translation(num2);
				if(num3)str+='智力：'+get.translation(num3)+'<br><br>';
				
				str+="攻击属性:<br>";
				if(num4)str+='物理伤害：'+get.translation(num4)+'<br>';
				if(num5)str+='元素伤害：'+get.translation(num5)+'<br><br>';
				
				str+="防御属性:<br>";
				if(num6)str+='火焰抗性：'+get.translation(num6/100)+'%<br>';
				if(num7)str+='冰霜抗性：'+get.translation(num7/100)+'%<br>';
				if(num8)str+='闪电抗性：'+get.translation(num8/100)+'%<br>';
				if(n1)str+='护甲：'+get.translation(n1)+'&ensp;&ensp;&ensp;&ensp;';
				if(num9)str+='物理减伤：'+get.translation(num9)+'%<br>';
				return str;
			},
		},
		direct:true,
		priority:-1,
		content:function(){
			//等级
			player.storage.level=1;
			
			//经验
			player.storage._poestart_jingyan=0;
			
			//三维属性
			player.storage.attstr=get.rand(30,50);
			player.storage.attagi=get.rand(30,50);
			player.storage.attint=get.rand(30,50);
			
			//攻击
			//物理攻击
			player.storage.phyatk=get.rand(50,70)+Math.floor(player.storage.attstr/5);
			//元素攻击
			player.storage.magatk=get.rand(50,70);
			
			//抗性
			//火焰抗性
			player.storage.poefireresis=1
			//冰霜抗性
			player.storage.poeiceresis=1
			//闪电抗性
			player.storage.poethunderresis=1
			//护甲
			player.storage.poearmor=32
			
			//定义体力
			var num=get.rand(100,500);
			player.changexjzhmaxHp(player.hp*100+num+Math.floor(player.storage.attstr/2));
			player.changexjzhHp(player.hp*100+num+Math.floor(player.storage.attstr/2));
			
			//本体装备
			//武器、攻击
			player.storage.equipn1=0;
			//防具、抗性
			player.storage.equipn2=0;
			
			player.markSkill("_poestart");
			
			//刷新
			player.update();
		},
		subSkill:{
			"jingyan":{
				trigger:{
					player:["phaseAfter","useCardToAfter"],
					source:"changexjzhmaxHpAfter",
				},
				direct:true,
				priority:-999,
				content:function(){
					"step 0"
					level=player.storage.level
					exp=level*15
					if(level==10) return;
					if(event.triggername=="phaseAfter"){
						var num1=1
						player.addMark("_poestart_jingyan",num1,false);
						game.log(player,"获得了",get.cnNumber(num1),"点经验");
					}
					else if(event.triggername=="useCardToAfter"){
						var num1=1
						player.addMark("_poestart_jingyan",num1,false);
						game.log(player,"获得了",get.cnNumber(num1),"点经验");
					}
					else if(event.triggername=="changexjzhmaxHpAfter"){
						var num=0
						var num1=Math.ceil(trigger.num/50);
						num+=num1
						if(trigger.player.isDying()) num+=num1
						if(trigger.player.isDead()) num+=num1*2
						player.addMark("_poestart_jingyan",num,false);
						game.log(player,"获得了",get.cnNumber(num),"点经验");
					}
					"step 1"
					if(player.countMark("_poestart_jingyan")>=exp){
						player.levelUp();
						player.update();
					}
				},
			},
			"equip":{
				//本体装备加属性
				trigger:{
					player:['equipBegin'],
				},
				direct:true,
				init:function(player){
				},
				filter:function(event,player){
					var type=get.subtype(event.card);
					if(type=="equip3"||type=="equip4") return false;
					return true;
				},
				content:function(){
					//获取装备类型
					var type=get.subtype(trigger.card);
					//获取装备价值
					var val=Math.ceil(get.value(trigger.card));
					//随机数值
					var r1=get.rand(20,50);
					//攻击、护甲数值
					var r2=get.rand(3,8);
					//抗性数值
					//计算数值
					var num1=val*r1//攻击、护甲
					var num2=val*r2//抗性
					//定义装备数据
					var e1=player.storage.equipn1//攻击
					var e2=player.storage.equipn2//防御
					game.log(num1,"攻击结果");
					game.log(num2,"防御结果");
					if(player.getEquip(type)){
						if(type=="equip1"){
							player.storage.phyatk-=e1
							player.storage.phyatk+=num1
							player.storage.magatk-=e1
							player.storage.magatk+=num1
							player.storage.equipn1+=num1
						}
						else if(type=="equip2"){
							player.storage.poefireresis-=e2
							player.storage.poefireresis+=num2
							player.storage.poeiceresis-=e2
							player.storage.poeiceresis+=num2
							player.storage.poethunderresis-=e2
							player.storage.poethunderresis+=num2
							player.storage.poearmor-=e1
							player.storage.poearmor+=num1
							player.storage.equipn2=num2
						}
					}
					else{
						if(type=="equip1"){
							player.storage.equipn1+=num1
							player.storage.phyatk+=num1
							player.storage.magatk+=num1
						}
						else if(type=="equip2"){
							player.storage.equipn2+=num2
							player.storage.poefireresis+=num2
							player.storage.poeiceresis+=num2
							player.storage.poethunderresis+=num2
							player.storage.poearmor+=num1
						}
					}
				},
			},
			"damage":{
				trigger:{
					source:"damageBefore",
				},
				silent:true,
				priority:99,
				content:function(){
				    "step 0"
					//if(!trigger.source||trigger.source==undefined) return;
					//判断伤害类型，处理人物攻击数据
					var nature=trigger.nature
					if(!nature){
						var num1=player.storage.phyatk
					}
					else{
						var num1=player.storage.magatk
					}
					//获取未定义之前的基础伤害数据
					var num2=trigger.num;
					//列出公式，附加基础伤害数据
					var num3=num1*num2+get.rand(0,num1);
					//计算抗性
					if(nature){
						if(nature=="fire"){
							var num4=Math.floor(num3*(1-(player.storage.poefireresis/100)))
						}
						else if(nature=="ice"){
							var num4=Math.floor(num3*(1-(player.storage.poeiceresis/100)))
						}
						else if(nature=="thunder"){
							var num4=Math.floor(num3*(1-(player.storage.poethunderresis/100)))
						}
					}
					else{
						var n1=player.storage.poearmor/32
						var n2=player.storage.level/2
						var n3=Math.ceil(n1/n2)
						var n4=n3/100
						var num4=Math.floor(num3*(1-n4))
					}
					//最终结果，移除基础伤害数据
					var num5=num4-num2;
					trigger.player.changexjzhHp(-num5).set('source',trigger.source).set('animate',true).set('nature',trigger.nature);
					"step 1"
					trigger.player.update();
					trigger.changeToZero();
				},
			},
			"changeHp":{
				trigger:{
					player:["loseHpBegin","gainMaxHpBegin","loseMaxHpBegin"],
				},
				filter:function(event,player){
					return event.num>0;
				},
				direct:true,
				priority:-1,
				content:function(){
					var num=trigger.num*100;
					if(trigger.name=="loseHp"){
					    player.changexjzhHp(-num);
					}
					else if(trigger.name="gainMaxHp"){
					    player.changexjzhmaxHp(num);
					}
					else if(trigger.name=="loseMaxHp"){
					    player.changexjzhmaxHp(-num);
					}
				},
			},
		},
	};
	// ---------------------------------------卡牌修改------------------------------------------//
});