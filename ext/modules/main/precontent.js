import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
import { xjzhTitle } from '../index.js';
export async function precontent(xjzh){
	const scriptPaths=[
        `cards/index.js`,
		`character/XWSG/index.js`,
		`character/XWTR/index.js`,
		`character/XWCS/index.js`,
		`character/XWDM/index.js`,
		`character/XWTZ/index.js`,
		`character/JLBC/index.js`,
    ];
    Promise.all(
        scriptPaths.map(path => import(`../${path}`))
    ).then(modules => {
        console.log('Yokoso Watashi no Soul Society！')
    }).catch(error => {
        alert('error '+error+'导入失败 !')
        console.error(error.message);
    });

	// ---------------------------------------素材复制------------------------------------------//
	game.xjzh_filesCopy=function(sdir/*源文件夹路径*/,fn/*文件名*/,ddir/*目标文件夹路径*/,callback){
		game.ensureDirectory(ddir,function(){});
		game.readFile(sdir+'/'+fn,function(data){
			game.writeFile(data,ddir,fn,(callback||function(){}));
		});
	};
	// ---------------------------------------JS接口------------------------------------------//
	window.XJZHimport=function(func){
		func(lib,game,ui,get,ai,_status);
	};
	if(xjzh.enable){
		// ---------------------------------------移除【删除扩展按钮】------------------------------------------//
		delete lib.extensionMenu.extension_仙家之魂.delete;
		// ---------------------------------------导入JS------------------------------------------//
		var extList=[
		'1_Skin.js',
		'3_Buff.js',
		'gonglve.js',
		'animation.js'
		];
		for(var i of extList){
			var extURL=lib.assetURL+'extension/仙家之魂/ext/'+i;
			lib.init.js(extURL,null,()=>{},()=>{alert(''+i+'导入失败!')});
		};
		//导入奇术要件文件
		if(game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")){
			lib.init.js(lib.assetURL +'extension/仙家之魂/ext/qishuyaojians.js');
			lib.init.js(lib.assetURL +'extension/仙家之魂/ext/qsyjOption.js');
		};
		lib.init.css(lib.assetURL+"extension/仙家之魂/css",'extension');
		//成就系统
		//部分代码借鉴自《玄武江湖》
		lib.init.js(lib.assetURL+'extension/仙家之魂/ext','achievement',function(){
			lib.init.css(lib.assetURL+'extension/仙家之魂/css','mainPage');
			lib.init.css(lib.assetURL+'extension/仙家之魂/css','achievement');
			lib.arenaReady.push(function(){
				ui.create.system("仙魂成就",function(){
					if(typeof window.openxjzhAchievement=='function'){
						window.openxjzhAchievement();
					}
					else{
						alert("错误：你可能没有正常导入仙家之魂扩展文件");
					}
				},true);
				try{
					//成就初始化
					game.xjzhAchi.init();
					if(!game.getExtensionConfig("仙家之魂","xjzh_importCalculateScore")&&typeof game.xjzhAchi.calculateScore()=="number"){
						let num=game.xjzhAchi.calculateScore();
						game.xjzh_changeTokens(num);
						game.xjzh_changeSuipian(num*50);
						game.saveExtensionConfig("仙家之魂","xjzh_importCalculateScore",true);
					}

					//在武将资料上显示成就是否完成
					let {...characters}=lib.characterPack.XWTR;
					let {...characters2}=lib.characterPack.XWSG;
					let {...characters3}=lib.characterPack.XWCS;
					let {...characters4}=lib.characterPack.XWTZ;
					let {...characters5}=lib.characterPack.XWDM;
					let xianhuns=Object.assign(characters,characters2,characters3,characters4,characters5);
					for(let name in xianhuns){
						if(!lib.characterTitle[name]) lib.characterTitle[name]='';

						//普通胜利对局成就
						if(xjzhTitle[name]){
							if(game.xjzhAchi.hasAchi(xjzhTitle[name],'character')) lib.characterTitle[name]+='（已完成）<br>';
							else lib.characterTitle[name]+='（未完成）<br>';
						}

						//设计的成就
						switch(name){
							case "xjzh_sanguo_espliuxie":{
								lib.characterTitle[name]+='<br>再兴炎汉';
								if(game.xjzhAchi.hasAchi('再兴炎汉','character')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';
							}
							break;
							case "xjzh_sanguo_tongyuan":{
								lib.characterTitle[name]+='<br>百鸟朝凰';
								if(game.xjzhAchi.hasAchi('百鸟朝凰','character')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';
							}
							break;
							case "xjzh_sanguo_tongyuan":{
								lib.characterTitle[name]+='<br>驱雷掣电';
								if(game.xjzhAchi.hasAchi('驱雷掣电','character')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';
							}
							break;
							case "xjzh_poe_juedouzhe":{
								lib.characterTitle[name]+='<br>刽子手';
								if(game.xjzhAchi.hasAchi('刽子手','special')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';

								lib.characterTitle[name]+='<br>完美斗士';
								if(game.xjzhAchi.hasAchi('完美斗士','special')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';
							}
							break;
							case "xjzh_poe_nvwu":{
								lib.characterTitle[name]+='<br>火焰大师';
								if(game.xjzhAchi.hasAchi('火焰大师','special')) lib.characterTitle[name]+='（已完成）<br>';
								else lib.characterTitle[name]+='（未完成）<br>';
							}
							break;
						}
					}
				}
				catch(e){
					console.log("错误：成就初始化失败");
				}
			});
		},function(){
			console.log("错误：仙家之魂成就导入失败");
		});
		//FPS显示
		lib.extensionMenu.extension_仙家之魂.tx_skillAnimation_showFps={
			"name":"FPS显示",
			"init":false,
			"intro":"刷新生效",
		};
		lib.extensionMenu.extension_仙家之魂.tx_skillAnimation_showFpsP={
			"name":"FPS显示位置",
			"init":'rd',
			"item":{
				'rd':'右下',
				'cd':'中下',
				'ld':'左下',
				'ru':'右上',
				'cu':'中上',
				'lu':'左上',
			},
		};
		// ---------------------------------------分界线------------------------------------------//
		//游戏特效（需十周年UI支持）
		game.runAfterExtensionLoaded("十周年UI",()=>{
			if(['tafang', 'chess'].includes(get.mode())&&game.getExtensionConfig("十周年UI","closeWhenChess")) return;
			if(game.hasExtension('十周年UI')&&game.getExtensionConfig("十周年UI","gameAnimationEffect")&&game.getExtensionConfig("仙家之魂","xjzh_playSkillEffect")){
				lib.arenaReady.push(function(){
					if(!window.decadeUI) return;
					var fileInfoList=[
						///仙家之魂骨骼特效清单

						//爆炸特效
						{ name: 'xjzh_skillEffect_baozha', fileType:"json" },
						//雷击特效
						{ name: 'xjzh_skillEffect_leiji', fileType:"json" },
						{ name: 'xjzh_skillEffect_leiji2', fileType:"json" },
						//弓箭特效
						{ name: 'xjzh_skillEffect_gongjian', fileType:"json" },
						//{ name: 'xjzh_skillEffect_gongjian2', fileType:"json" },
						//闪光
						{ name: 'xjzh_skillEffect_whiteFlash', fileType:"json" },
						{ name: 'xjzh_skillEffect_redFlash', fileType:"json" },
						//能量盾
						{ name: 'xjzh_skillEffect_yellowShield', fileType:"json" },
						{ name: 'xjzh_skillEffect_yellowShield2', fileType:"json" },
						//旋风
						{ name: 'xjzh_skillEffect_xuanfeng', fileType:"json" },
						//中毒
						{ name: 'xjzh_skillEffect_methysis', fileType:"json" },

					];
					var fileList=fileInfoList.concat();
					var read=function(){
						if(fileList.length){
							var file=fileList.shift();
							if(file.follow){
								//这个是专门播放追踪卡牌的动画，调用方式 decadeUI.animation.cap.playSpineTo(element, animation, position);
								//建议非追踪对象的特效不要滥用，因为每次导入1个骨骼会生成4个预制骨骼，资源占用较多
								decadeUI.animation.cap.loadSpine(file.name,file.fileType,function(){
									read();
								});
							}else{
								//	这个是专门播放全屏位置的动画
								decadeUI.animation.loadSpine(file.name,file.fileType,function(){
									read();
									decadeUI.animation.prepSpine(this.name);
								});
							}
						}
					};
					read();
					read();
				});

				//卡牌及技能特效

				//林嘉笙〖甘霖〗
				lib.animate.skill["xjzh_meiren_ganling"]=function(name){
					game.xjzh_playEffect("xjzh_skillEffect_yellowShield2",this);
				};
				//诸葛亮〖八阵〗
				lib.animate.skill["xjzh_sanguo_bazhen_2"]=function(name){
					game.xjzh_playEffect("xjzh_skillEffect_redFlash",this);
				};
				//buff中毒
				lib.animate.skill["xjzh_buff_zhongdu"]=function(name){
					game.xjzh_playEffect("xjzh_skillEffect_methysis",this);
				};
			};
		});

	};

};