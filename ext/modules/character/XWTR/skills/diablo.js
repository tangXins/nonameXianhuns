import { lib, game, ui, get, ai, _status } from "../../../../../../../noname.js";

/** @type { importCharacterConfig['skill'] } */
export const diabloSkills={

	//暗黑破坏神
	"xjzh_diablo_hunhuo":{
		trigger:{
			global:["die","dying"],
		},
		forced:true,
		locked:true,
		fixed:true,
		unique:true,
		charlotte:true,
		superCharlotte:true,
		priority:3,
		firstDo:true,
		mark:true,
		notemp:true,
		forceDie:true,
		marktext:"死亡之书",
		intro:{
			name:"死亡之书",
			mark:function(dialog,storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return "没有灵魂";
				var str=list.slice(0,-2);
				var name=str.split('::');
				if(name.length){
					if(player.isUnderControl(true)){
						dialog.addSmall([name,'character']);
					}
					else{
						dialog.addText('共有'+get.cnNumber(name.length)+'个“灵魂”');
					}
				}
				else{
					return '没有灵魂';
				}
			},
			content:function(storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo")
				if(list==null) return "没有灵魂";
				var str=list.slice(0,-2);
				var name=str.split('::');
				return '共有'+get.cnNumber(name.length)+'个“灵魂”'
			},
			markcount:function(storage,player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return 0;
				var str=list.slice(0,-2);
				var name=str.split('::');
				return name.length;
			},
		},
		derivation:["xjzh_diablo_haoling"],
		getSkillList:function(player){
			if(!player.hasSkill('xjzh_diablo_hunhuo')){
				player.removeAdditionalSkill('xjzh_diablo_hunhuo');
				return;
			}
			var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
			if(list==null) return;
			var str=list.slice(0,-2);
			var name=str.split('::');
			if(!name.length) return;
			var skills2=lib.skill.xjzh_diablo_hunhuo.derivation.slice(0);
			var list2=[]
			for(var i of name){
				if(lib.character[i]==undefined) continue;
				if(lib.character[i][3]){
					var skills=lib.character[i][3]
				}else{
					continue;
				}
				for(var j of skills){
					var info=get.info(j)
					var num=0
					if(info&&(info.gainable||!info.unique)&&!info.zhuSkill&&!info.juexingji&&!info.dutySkill){
						list2.push(j);
						num++
					}
					if(num>0) break;
				}
			}
			if(name.length>=2){
				for(var i=0;i<Math.floor(name.length/3);i++){
					list2.push(skills2[i]);
				}
			}
			if(list2.length) player.addAdditionalSkill('xjzh_diablo_hunhuo',list2);
		},
		removeStorage:function(player){
			var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
			if(list==null) return;
			var str=list.slice(0,-2);
			var name=str.split('::');
			if(!name.length) return;
			var characters=lib.characterPack['Beijijinqu']
			var bool=false;
			if(characters!=undefined){
				for(var i in characters){
					if(name.includes(i)) bool=true;
				}
			}
			if(bool==true){
				window.localStorage.removeItem("xjzh_diablo_hunhuo");
				alert('检测到你的死灵之书内存在非法武将，已为你重置存档，游戏即将重启');
				setTimeout(function(){
					game.reload();
				},3000);
			}
		},
		init:function(player){
			lib.skill.xjzh_diablo_hunhuo.removeStorage(player);
			lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
		},
		filter:function(event,player){
			if(event.player==player){
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return;
				var str=list.slice(0,-2);
				var name=str.split('::');
				if(!name.length) return false;
				return !name.includes(event.player);
			}
			if(event.source&&event.source==player&&event.player!=player&&event.player.isDead()){
				 return game.me==player;
			}
			return false;
		},
		group:["xjzh_diablo_hunhuo_use"],
		async content(event,trigger,player){
			if(trigger.source&&trigger.source==player&&trigger.player!=player&trigger.player.isDead()){

				var object2=[]
				var bool2=false;
				if(player.name) object2.push(player.name);
				if(player.name1) object2.push(player.name1);
				if(player.name2) object2.push(player.name2);
				for(var i of object2){
					if(i.indexOf("xjzh_diablo_lamasi")!=-1) bool2=true;
				}
				if(!bool2) return;
				if(window.localStorage){
					//获取阵亡角色武将名
					var name=trigger.player.name
					var characters=lib.characterPack['Beijijinqu']
					if(characters!=undefined){
						for(var i in characters){
							if(name==i) return;
						}
					}
					//读取已有存档
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list!=null){
						//alert("有");
						//检测存档内是否已包含当前武将名，若有则跳过
						if(list.indexOf(name)!=-1) return;
						list+=name+"::"
						obj=list
					}else{
						//alert("无");
						var str=""
						var obj=name+"::"
						str+=obj
						obj=str
					}
					//将数组转为字符串
					//var setData=JSON.stringify(obj);
					//将数据写入存档
					window.localStorage.setItem("xjzh_diablo_hunhuo",obj);
					game.log(player,"将"+get.translation(trigger.player)+"的灵魂收入了死亡之书");
					lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
				}else{
					alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
				}
				event.finish();
				return;
			}
			else if(trigger.player==player&&trigger.name!="die"){
				if(!window.localStorage){
					alert("你的浏览器内核版本过低，不支持localStorage函数，无法发动〖魂火〗");
					return;
				}
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				if(list==null) return;
				var str=list.slice(0,-2);
				var name=str.split('::');
				player.chooseButton(true).set('ai',function(button){
					return Math.random();
				}).set('createDialog',['请选择一个灵魂与你交换身体',[name,'character']]);
			}
			"step 1"
			if(result.bool){
				var link=result.links[0]
				player.reinit(player.name,link,[player.maxHp,player.maxHp]);
				var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
				var str=list.slice(0,-2);
				var name=str.split('::');
				name.remove(link);
				if(name.length){
					var setData=name.join("::");
					setData+="::"
					window.localStorage.setItem("xjzh_diablo_hunhuo",setData);
				}else{
					window.localStorage.removeItem("xjzh_diablo_hunhuo");
				}
				player.removeSkill("xjzh_diablo_hunhuo",true);
				lib.skill.xjzh_diablo_hunhuo.getSkillList(player);
			}
		},
		ai:{
			notemp:true,
		},
		subSkill:{
			"use":{
				enable:"phaseUse",
				usable:1,
				sub:true,
				filter:function(event,player){
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list==null) return;
					var str=list.slice(0,-2);
					var name=str.split('::');
					if(!name.length) return false;
					return game.dead.length;
				},
				content:function(){
					"step 0"
					var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list==null) return;
					var str=list.slice(0,-2);
					var name=str.split('::');
					player.chooseButton(ui.create.dialog('〖魂火〗：请选择你将要唤醒的灵魂',[name,'character'],'hidden'),function(button){
						return get.rank(button.link,true);
					});
					"step 1"
					if(result.bool){
						var list=[];
						event.targets=result.links[0]
						for(var i=0;i<game.dead.length;i++){
							list.push(game.dead[i].name);
						}
						player.chooseButton(ui.create.dialog('〖魂火〗：请选择一副灵柩',[list,'character'],'hidden'),function(button){
							return 1;
						});
					}
					"step 2"
					if(result.bool&&result.links){
						for(var i=0;i<game.dead.length&&game.dead[i].name!=result.buttons[0].link;i++);
						event.dead=game.dead[i];
						event.dead.revive(event.targets.maxHp,false);
						var info=lib.character[event.targets]
						if(typeof info[2]=="string"){
							info[2]=Array.from(info[2])
							var hp=info[2][2]
						}else{
							var hp=info[2]
						}
						event.dead.reinit(event.dead.name,event.targets,[hp,hp]);
						event.dead.init(event.targets);
						event.dead.directgain(get.cards(2));
						var id=player.identity
						if(id=="zhu"){
							event.dead.identity="zhong";
							event.dead.setIdentity("zhong");
							event.dead.showIdentity();
						}else{
							event.dead.identity=id;
							event.dead.setIdentity(id);
							event.dead.showIdentity();
						}
						event.dead.addSkill("xjzh_diablo_hunhuo_shibao");
						event.dead.$zhaohuan();
						if(!player.storage.xjzh_diablo_hunhuo_use) player.storage.xjzh_diablo_hunhuo_use=[];
						player.storage.xjzh_diablo_hunhuo_use.push(event.dead);
						//game.log(player.storage.xjzh_diablo_hunhuo_use);
						game.log(player,"唤醒了"+get.translation(event.targets)+"的灵魂");
					}
				},
				ai:{
					order:8,
					expose:0.8,
					result:{
						player:1,
					},
				},
			},
			"shibao":{
				trigger:{
					player:"dieAfter",
					global:["phaseAfter",]
				},
				forceDie:true,
				direct:true,
				priority:-101,
				lastDo:true,
				sub:true,
				filter:function(event,player){
					if(event.name=="die"){
						var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
						if(list==null) return;
						var str=list.slice(0,-2);
						var name=str.split('::');
						return name.includes(player);
					}
					if(event.name=="phase"){
						var id=game.filterPlayer(function(current){
							return current.name=="xjzh_diablo_lamasi"||current.name1=="xjzh_diablo_lamasi"||current.name2=="xjzh_diablo_lamasi";
						}).shift().identity
						if(id=="zhu"){
							if(player.identity!="zhong") return true;
						}
						return player.identity!=id;
					}
					return false;
				},
				content:function(){
					var previous=player.getPrevious();
					var next=player.getNext();
					var list=[
						previous,
						next
					];
					for(var i of list){
						if(i.name=="xjzh_diablo_lamasi") continue;
						i.damage("nosource","nocard");
					}
					player.die()._triggered=null;
				},
			},
		},
	},
	"xjzh_diablo_haoling":{
		enable:"phaseUse",
		locked:true,
		charlotte:true,
		usable:1,
		prompt:"〖号令〗：选择一名被你唤醒且正面朝上的角色",
		check:function(event,player){
			return 1;
		},
		filterTarget:function(card,player,target){
			if(player.storage.xjzh_diablo_hunhuo_use) return player.storage.xjzh_diablo_hunhuo_use.includes(target);
			return false;
		},
		filter:function(event,player){
			return player.storage.xjzh_diablo_hunhuo_use&&player.storage.xjzh_diablo_hunhuo_use.length;
		},
		content:function(){
			target.turnOver(true);
			player.insertPhase();
		},
		ai:{
			order:8,
			result:{
				player:1,
				target:-0.5,
			},
		},
	},
	"xjzh_diablo_luanshe":{
		trigger:{
			player:"useCard2",
		},
		forced:true,
		locked:true,
		priority:3,
		filter(event,player){
			if(!event.cards||!event.cards.length) return false;
			if(get.name(event.cards[0],player)!="sha") return false;
			return game.hasPlayer(current=>player.canUse("sha",current)&&current!=event.targets[0]&&current!=player);
		},
		seatNum(player,target){
			let obj={
				scale:0.9,
				x:[1,0.5],
				y:[1,0.25],
				height:null,
				width:null,
				angle:null,
				parent:player,
				follow:false,
			},num=target.getState().position;
			switch(num){
				case 1:
					obj.scale=0.4;
					obj.angle=-88;
				break;
				case 2:
					obj.scale=0.52;
					obj.angle=-68;
				break;
				case 3:
					obj.scale=0.65;
					obj.angle=-48;
				break;
				case 4:
					obj.scale=0.75;
					obj.angle=-32;
				break;
				case 5:
					obj.scale=0.9;
					obj.angle=-26;
				break;
				case 6:
					obj.scale=1.12;
					obj.angle=-21;
				break;
				case 7:
					obj.scale=1.15;
					obj.angle=-15;
				break;
			};
			return obj;
		},
		async content(event,trigger,player){
			let targets=game.filterPlayer(current=>player.canUse("sha",current)&&current!=trigger.targets[0]&&current!=player),num=get.rand(1,Math.min(3,targets.length))
			targets=targets.randomGets(num);

			for(let target of targets){
				let obj=lib.skill.xjzh_diablo_luanshe.seatNum(player,target);
				game.xjzh_playEffect('xjzh_skillEffect_gongjian',player,obj);
			};
			trigger.targets.addArray(targets);
			//trigger.targets.sort(()=>Math.random()-0.5);
			game.log(targets,"成为此【杀】的额外目标");
			/*player.when({source:"damageAfter"})
			.assign({
				firstDo:true,
			})
			.filter(()=>{
				if(event.name!="xjzh_diablo_luanshe") return false;
				if(event.player!=player) return false;
				return true;
			})
			.then(()=>{
				trigger.player.changexjzhBUFF('mumang',1);
			});*/
		},
		ai:{
			order:8,
			result:{
				player(player,target,card){
					if(get.name(card,player)!="sha") return;
					let targets=game.filterPlayer(current=>player.canUse("sha",current)&&current!=target&&current!=player),num=0
					for(let name of targets){
						if(player.isFriendsOf(name)) num++;
					}
					if(num>targets-num) return 0.2;
					return 1.5;
				},
			},
		},
	},
	"xjzh_diablo_jingshe":{
		trigger:{
			player:"useCard2",
		},
		forced:true,
		locked:true,
		priority:-3,
		filter(event,player){
			if(get.name(event.cards[0],player)!="sha") return false;
			if(!event.targets||!event.targets.length) return false;
			if(event.targets.length==1) return false;
			let targets=event.targets.slice(0);
			if(targets.every(item=>get.xjzhBUFFNum(item,'yishang')>=get.xjzhBUFFInfo('yishang','limit'))) return false;
			return true;
		},
		async content(event,trigger,player){
			const targets=await player.chooseTarget("〖劲射〗：选择一名角色令其获得1层易伤",(card,player,target)=>{
				return get.xjzhBUFFNum(target,'yishang')<get.xjzhBUFFInfo('yishang','limit')&&target!=player&&trigger.targets.includes(target);
			}).set('ai',target=>-get.attitude(player,target)).forResultTargets();
			if(targets){
				targets[0].changexjzhBUFF('yishang',1);
			};
		},
	},
	"xjzh_diablo_guanzhu":{
		trigger:{
			player:"drawAfter",
		},
		frequent:true,
		group:["xjzh_diablo_guanzhu_use","xjzh_diablo_guanzhu_damage"],
		filter(event,player){
			if(player.countCards('h',card=>get.tag(card,'damage')&&!card.hasGaintag("xjzh_diablo_guanzhu"))&&player.countCards('h',card=>card.hasGaintag("xjzh_diablo_guanzhu"))<2) return true;
			return false;
		},
		mod:{
			cardUsable(card,player,num){
				if(!card.cards) return;
				if(["jiu","sha"].includes(get.name(card,player))){
					if(card.cards.some(item=>item.hasGaintag("xjzh_diablo_guanzhu"))) return true;
				}
			},
		},
		async content(event,trigger,player){
			let cards=player.getCards('h',card=>get.tag(card,'damage'));
			const links=await player.chooseCardButton(cards,cards.length==1?1:[1,2],"〖灌注〗：请选择至多"+get.translation(cards.length==1?1:2)+"张[伤害]卡牌令其获得灌注效果").set('ai',button=>{
				let player=get.player();
				if(player.hasUseTarget(button.link)) return player.getUseValue(button.link);
				return cards.randomGets(cards.length==1?1:[1,2]);
			}).forResultLinks();
			if(!links) return;
			let controlList=[
				'冰霜灌注：令你被灌注的牌造成冰属性伤害',
				'火焰灌注：令你被灌注的牌造成火属性伤害',
				'毒素灌注：令你被灌注的牌造成毒属性伤害'
			];
			const index=await player.chooseControlList(get.prompt(event.name,player),true,controlList)
			.set("ai",()=>{
				return get.rand(0,2);
			})
			.forResult("index");
			let storage=new Map();
			storage.set('guanzhu',{
				nature:{
					0:"ice",
					1:"fire",
					2:"poison"
				},
				index:index,
				cards:links
			});
			player.removeGaintag('xjzh_diablo_guanzhu');
			player.addGaintag(links,'xjzh_diablo_guanzhu');
			player.storage.xjzh_diablo_guanzhu=storage;
		},
		subSkill:{
			"damage":{
				trigger:{
					source:"damageBefore",
				},
				direct:true,
				sub:true,
				filter(event,player){
					let storage=player.storage.xjzh_diablo_guanzhu;
					if(!event.cards||!event.cards.length) return false;
					if(!storage||!storage.get("guanzhu")) return false;
					return storage.get("guanzhu").cards.includes(event.cards[0]);
				},
				async content(event,trigger,player){
					let storage=player.storage.xjzh_diablo_guanzhu;
					await game.setNature(trigger,storage.get("guanzhu").nature[storage.get("guanzhu").index],false)
					switch(trigger.nature){
						case "ice":{
							trigger.player.changexjzhBUFF('binghuan',1);
						}
						break;
						case "fire":{
							trigger.player.changexjzhBUFF('ranshao',1);
						}
						break;
						case "poison":{
							trigger.player.changexjzhBUFF('zhongdu',1);
						}
						break;
					}
				},
			},
			"use":{
				trigger:{player:"useCardBefore"},
				forced:true,
				priority:-1,
				sub:true,
				filter(event,player){
					if(event.card.name=='sha'||event.card.name=="jiu"){
						if(event.cards[0].hasGaintag("xjzh_diablo_guanzhu")) return true;
					};
					return false;
				},
				async content(event,trigger,player){
					if(trigger.addCount!==false){
						trigger.addCount=false;
						let stat=player.getStat();
						if(stat&&stat.card&&stat.card[trigger.card.name]) stat.card[trigger.card.name]--;
					};
				},
			},
		},
	},
	"xjzh_diablo_sushe":{
		trigger:{
			player:"useCard",
		},
		forced:true,
		locked:true,
		priority:3,
		filter(event,player){
			return get.name(event.card)=="sha";
		},
		async content(event,trigger,player){
			let num=get.rand(1,2);
			trigger.effectCount+=num;
			game.log(trigger.card,'额外结算'+num+'次');
		},
	},
	"xjzh_diablo_yingbi":{
		enable:"phaseUse",
		usable:1,
		filter(event,player){
			return get.xjzh_deEffect(player)||game.countPlayer(current=>current.inRangeOf(player));
		},
		async content(event,trigger,player){
			await game.claerRestraint(player);
			let targets=game.filterPlayer(current=>current.inRangeOf(player));
			if(targets.length){
				for(let target of targets) target.changexjzhBUFF('yishang',1);
			}
			player.draw(targets.length);
		},
		ai:{
			order:12,
			result:{
				player(player,target,card){
					if(get.xjzh_deEffect(player)) return 1;
					return game.countPlayer(current=>current.inRangeOf(player));
				},
			},
		},
	},
	"xjzh_diablo_jianyu":{
		enable:"phaseUse",
		skillAnimation:"epic",
		animationColor:"thunder",
		animationStr:"箭雨",
		filter(event,player){
			return !player.storage.xjzh_diablo_jianyu;
		},
		async content(event,trigger,player){
			let names=get.nameList(player),bool=false;
			if(names.some(name=>game.xjzh_hasEquiped("xjzh_qishu_hakankouyu",name))) bool=true;

			let next=await player.useCard({name:'wanjian',isCard:true},game.filterPlayer(current=>current!=player),false).set("effectCount",bool&&Math.random()<=0.3?2:1);

			let xjzh_diablo_jianyuTimer,cooldown=1000*120*(1-0.425),elapsedTime=0,startTime=new Date().getTime();

			player.storage.xjzh_diablo_jianyu=null;

			xjzh_diablo_jianyuTimer=setInterval(()=>{
				elapsedTime+=100;

				let remainingTime=cooldown-elapsedTime,endTime=new Date().getTime(),remainderTime=endTime-startTime;

				player.storage.xjzh_diablo_jianyu=new Map(
					[
						["cooldown",remainingTime],
						["remainder",remainderTime],
					]
				);

				if(remainingTime<=0){
					clearInterval(xjzh_diablo_jianyuTimer);
					delete player.storage.xjzh_diablo_jianyu;
				}
			},100);

		},
		ai:{
			order:8,
			result:{
				player(player,target,card){
					let targets=player.getFriends(),targets2=player.getEnemies();
					return targets2.length>=targets.length?1:0.5;
				},
			},
		},
	},
	"xjzh_diablo_lingshou":{
		trigger:{
			player:"phaseBefore",
			source:"damageAfter",
		},
		forced:true,
		locked:true,
		priority:10,
		mark:true,
		marktext:"贡",
		intro:{
			name:"德鲁伊灵体贡品",
			content:"#",
		},
		lingshouList:["xjzh_diablo_lang","xjzh_diablo_xiong"],
		async content(event,trigger,player){
			let names=get.nameList(player),arr=["xjzh_qishu_wuyan","xjzh_qishu_fenglangkx"],bool=false;
			for await(let name of names){
				if(arr.some(item=>game.xjzh_hasEquiped(item,name))){
					bool=true;
					break;
				};
			}

			if(event.triggername=="damageAfter") player.addMark("xjzh_diablo_lingshou",get.rand(1,100));
			else if(!bool){
				let list=lib.skill.xjzh_diablo_lingshou.lingshouList.slice(0),node,skills;

				if(player.name2&&player.name2=="xjzh_diablo_yafeikela") node=player.node.name2;
				else node=player.node.name;

				if(player.countMark("xjzh_diablo_lingshou")>=100){

					if(player.storage.xjzh_diablo_lingshou2) list.remove(player.storage.xjzh_diablo_lingshou2);

					let dialog=ui.create.dialog('〖灵兽〗：请选择所要变形的形态，取消变回人类',[list,"character"],'hidden');
					const links=await player.chooseButton(dialog).set('ai',()=>{
						return list.randomGet()
					}).forResultLinks();
					if(links){
						await player.removeMark("xjzh_diablo_lingshou",100,false);
						player.setAvatar('xjzh_diablo_yafeikela',links[0]);
						node.innerHTML=get.translation(links[0]);
						if(player.storage.xjzh_diablo_lingshou2){
							skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
							player.removeSkill(list,true);
						}
						player.storage.xjzh_diablo_lingshou2=links[0];
						let skills=lib.character[links[0]][3];
						player.addSkill(skills);
					}else{
						player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
						if(player.storage.xjzh_diablo_lingshou2){
							skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
							player.removeSkill(list,true);
						}
						node.innerHTML=get.translation("xjzh_diablo_yafeikela");
						delete player.storage.xjzh_diablo_lingshou2;
					}
				}else{
					player.setAvatar('xjzh_diablo_yafeikela',"xjzh_diablo_yafeikela");
					if(player.storage.xjzh_diablo_lingshou2){
						skills=lib.character[player.storage.xjzh_diablo_lingshou2][3];
						player.removeSkill(list,true);
					}
					node.innerHTML=get.translation("xjzh_diablo_yafeikela");
					delete player.storage.xjzh_diablo_lingshou2;
				}
			}
		},
	},
	"xjzh_diablo_shilue":{
		enable:"phaseUse",
		init(player,skill){
			player.storage[skill]=false;
		},
		filter(event,player){
			if(get.xjzh_isMaxMp(player)) return false;
			return player.countMark("xjzh_diablo_lingshou")>0;
		},
		group:"xjzh_diablo_shilue_round",
		async content(event,trigger,player){
			let num=Math.min(player.countMark("xjzh_diablo_lingshou"),get.xjzh_consumeMp(player));
			player.removeMark("xjzh_diablo_lingshou",num);
			player.changexjzhMp(num);
			let numx=player.xjzhReduce;
			numx>0.3?numx-=0.3:numx=0;
			player.storage.xjzh_diablo_shilue=true;
		},
		subSkill:{
			"round":{
				trigger:{
					global:"roundStart",
				},
				direct:true,
				priority:10,
				sub:true,
				filter(event,player){
					if(game.roundNumber==0) return false;
					if(!player.storage.xjzh_diablo_shilue) return false;
					return true;
				},
				async content(event,trigger,player){
					player.storage.xjzh_diablo_shilue=false;
					player.xjzhReduce+=0.3;
				},
			},
		},
		ai:{
			order:0.2,
			result:{
				player(player,target){
					let names=get.nameList(player),arr=["xjzh_qishu_wuyan","xjzh_qishu_fenglangkx"],bool=false;
					names.forEach(name=>{
						if(arr.some(item=>game.xjzh_hasEquiped(item,name))) bool=true;
					});
					if(bool) return get.xjzh_consumeMp(player);
					return player.countMark("xjzh_diablo_lingshou")-100+get.xjzh_consumeMp(player);
				},
			},
		},
	},
	"xjzh_diablo_leibao":{
		enable:"phaseUse",
		level:1,
		powerDrain:45,
		xjzh_fengbaoSkill:true,
		multitarget:true,
		multiline:true,
		filterTarget(card,player,target){
			return target!=player;
		},
		selectTarget(){
			let player=get.player(),level=lib.skill.xjzh_diablo_leibao.level;
			return level==1?1:[1,level];
		},
		filter(event,player){
			let powerDrain=lib.skill.xjzh_diablo_leibao.powerDrain,num=player.xjzhReduce;
			return player.xjzhMp>=powerDrain*(1-num);
		},
		async content(event,trigger,player){
			let powerDrain=lib.skill.xjzh_diablo_leibao.powerDrain,num=player.xjzhReduce;
			let num2=Math.round(powerDrain*(1-num));
			await player.changexjzhMp(-num2);
			for(let target of event.targets){
				await game.xjzh_playEffect('xjzh_skillEffect_leiji',target);
				await target.damage(1,'nocard',player,'thunder');
				if(Math.random()<=0.35*(1+player.xjzhHuixin)&&target.isAlive()){
					target.changexjzhBUFF('gandian',1);
					game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(target)}获得一层感电`);
				}
			}
		},
		ai:{
			order:12,
			expose:0.5,
			result:{
				target(target){
					return -lib.skill.xjzh_diablo_leibao.level;
				},
			},
		},
	},
	"xjzh_diablo_kuanghou":{
		enable:"phaseUse",
		level:1,
		usable:1,
		xjzh_langrenSkill:true,
		check(event,player){
			if(player.isDamaged()){
				if(player.xjzhMp<player.xjzhmaxMp) return 10;
				return 2;
			}
			return 0.5;
		},
		filter(event,player){
			if(player.isDamaged()||!get.xjzh_isMaxMp(player)) return true;
			return false;
		},
		async content(event,trigger,player){
			let num=lib.skill.xjzh_diablo_leibao.level;
			player.recover(Math.floor(num/5));
			player.changexjzhMp(20);
			if(Math.random()<=0.05*(1+player.xjzhHuixin)){
				player.recoverTo(player.maxHp);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复体力至体力上限`);
			}
		},
		ai:{
			order:12,
			expose:0.5,
			result:{
				player(player){
					let num=lib.skill.xjzh_diablo_kuanghou.level;
					return num/5+player.getDamagedHp(true);
				},
			},
		},
	},
	"xjzh_diablo_zhongou":{
		trigger:{
			player:"useCardToPlayer",
		},
		mod:{
			selectTarget(card,player,range){
				let type=get.tag(card,'damage');
				if(!get.tag(card,'damage')) return
				range[1]=1;
			},
		},
		filter(event,player){
			return event.card&&get.tag(event.card,'damage');
		},
		level:1,
		powerDrain:35,
		forced:true,
		locked:false,
		xjzh_xiongrenSkill:true,
		async content(event,trigger,player){
			await player.addTempSkill('unequip','useCardAfter');
			event.qianggu=false;
			if(player.getStat('damage')){
				let num=Math.round(lib.skill.xjzh_diablo_zhongou.powerDrain*(1-player.xjzhReduce)),level=lib.skill.xjzh_diablo_zhongou.level;
				let qianggu=get.nameList(player).filter(name=>game.xjzh_hasEquiped("xjzh_qishu_wuyan",name)).length?true:false;
				if(player.xjzhMp>=num||qianggu==true){
					const {result:{bool}}=
					qianggu==true?{result:{bool:true}}:
					await player.chooseBool(`〖重欧〗：是否消耗${num}灵力获得${level}点护甲和强固点体力值`).set('ai',()=>{return 1});
					if(bool){
						player.changexjzhMp(qianggu==false?num:-num);
						player.changeHujia(level);
						player.changexjzhBUFF('qianggu',level);
					}
				}
				if(Math.random()<=0.25*(1+player.xjzhHuixin)){
					trigger.target.changexjzhBUFF('jiansu',1);
					game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层减速`);
				}
			}
		},
	},
	"xjzh_diablo_fensui":{
		trigger:{
			player:["useCard","phaseBefore"],
			source:"damageBegin",
		},
		forced:true,
		locked:true,
		xjzh_dadiSkill:true,
		level:1,
		priority:2,
		mark:true,
		marktext:"碎",
		intro:{
			name:"粉碎",
			content(storage,player){
				let num=player.countMark("xjzh_diablo_fensui");
				if(num==0||!num) return;
				if(num>=6) return "你下一次造成伤害必定暴击";
				return get.translation(num);
			},
		},
		filter:function(event,player,name){
			if(name=="phaseBefore") return true;
			if(name=="damageBegin") return player.countMark("xjzh_diablo_fensui")>=6;
			if(!event.cards||!event.cards.length) return false;
			if(["delay","equip"].includes(get.type(event.cards[0]))) return false;
			return player.isHealthy();
		},
		async content(event,trigger,player){
			if(event.triggername=="phaseBefore") player.addMark("xjzh_diablo_fensui",1,false);
			else if(event.triggername=="damageBegin"){
				trigger.num*=2;
				player.clearMark("xjzh_diablo_fensui",false);
				if(Math.random()<=0.5*(1+player.xjzhHuixin)){
					trigger.player.turnOver(true);
					game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}被眩晕`);
				}
			}else{
				trigger.effectCount++
				game.log(trigger.card,"额外结算一次");
			}
		},
	},
	"xjzh_diablo_duguan":{
		trigger:{
			source:"damageBegin",
		},
		filter(event,player){
			if(player.xjzhMp<25) return false;
			return true;
		},
		async content(event,trigger,player){
			if(!game.hasNature(trigger)||!game.hasNature(trigger,"poison")) game.setNature(trigger,"poison",false);
			let huixin=player.xjzhHuixin;
			if(get.xjzhBUFFNum(player,'zhongdu')>0) huixin+=0.5;
			if(Math.random()>0.33*(1+huixin)) player.changexjzhMp(-25);
			else game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，该技能不消耗魔力`);
			if(Math.random()<=0.25*(1+huixin)){
				trigger.player.changexjzhBUFF('zhongdu',1);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(trigger.player)}获得1层中毒`);
			}
		},
	},
	"xjzh_diablo_xianjing":{
		enable:"phaseUse",
		usable:1,
		mark:true,
		marktext:"陷",
		intro:{
			name:"剧毒陷阱",
			mark(dialog,storage,player){
				if(!storage) return;
				if(player.isUnderControl(true)) dialog.addAuto([storage,'vcard']);
			},
		},
		init(player,skill){
			if(!player.storage[skill]) player.storage[skill]=[];
		},
		group:"xjzh_diablo_xianjing_gain",
		async content(event,trigger,player){
			let cards=Array.from(ui.cardPile.childNodes).filter(card=>!player.storage[event.name].includes(card));
			if(!cards.length) return;
			let card=cards.randomGets(Math.ceil(cards.length/100)),dialog=ui.create.dialog('hidden',[card,'vcard']);
			player.chooseControl('ok').set('dialog',dialog);
			player.storage[event.name].addArray(card);
			for await(let i of card){
				let num=get.rand(ui.cardPile.childElementCount);
				i.fix();
				ui.cardPile.insertBefore(i,ui.cardPile.childNodes[num]);
			}
			game.updateRoundNumber();
		},
		subSkill:{
			"gain":{
				trigger:{
					global:"gainAfter",
				},
				forced:true,
				priority:1,
				filter(event,player){
					if(!event.cards||!event.cards.length) return false;
					return event.cards.some(item=>player.storage.xjzh_diablo_xianjing.includes(item));
				},
				async content(event,trigger,player){
					if(trigger.player!=player) trigger.player.changexjzhBUFF('zhongdu',get.xjzhBUFFInfo("zhongdu",'limit'));
					if(Math.random()<=0.3*(1+player.xjzhHuixin)){
						player.changexjzhMp(25);
						game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}回复25点魔力`);
					}
					let storage=player.storage.xjzh_diablo_xianjing,cards=trigger.cards.filter(card=>storage.includes(card));
					if(Math.random()<=0.2*(1+player.xjzhHuixin)){
						player.draw(2);
						player.gain(cards,'gain2',"log");
						game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}摸两张牌并获得了${get.translation(cards)}`);
					}
					storage.removeArray(cards);
				},
			},
		},
		ai:{
			order:12,
			result:{
				player:1,
			},
		},
	},
	"xjzh_diablo_baolu":{
		trigger:{
			source:"damageBegin1",
		},
		forced:true,
		priority:1,
		locked:true,
		filter(event,player){
			if(get.xjzhBUFFNum(event.player,"zhongdu")>0) return true;
			return false;
		},
		async content(event,trigger,player){
			game.setNature(trigger,'poison',false);
			trigger.num++;
			if(Math.random()<=0.25*(1+player.xjzhHuixin)){
				player.useSkill("xjzh_diablo_xianjing",player);
				game.log(player,`因<span style="color: yellow;">〖${get.translation(event.name)}〗</span>触发了会心一击，${get.translation(player)}发动了技能<span style="color: yellow;">〖${get.translation("xjzh_diablo_xianjing")}〗</span>`);
			}
		},
	},


};