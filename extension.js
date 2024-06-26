import { lib,get,_status,ui,game,ai } from '../../noname.js';
import { xjzhTitle,xjzhUpdateLog,xjzhConfig,xjzhPackage,xjzhCardPack,introduces } from './ext/modules/index.js';
import xjzhCharacterInit from './ext/modules/character/index.js';
//还是有很多提示，消一下
Array.prototype.contains=Array.prototype.includes;
lib.xjzhTitle=xjzhTitle;

//检测无名杀版本
(async()=>{
	let getVersionUpdate=function(a,b){
		if(!a )a="0.0.0";
		if(!b) b="0.0.0";
		let arr1=a.split(".");
		let arr2=b.split(".");
		for(let i=0;i<Math.min(arr1.length,arr2.length);i++){
			let num1=parseInt(arr1[i]);
			let num2=parseInt(arr2[i]);
			if(num1<num2) return -1;
			if(num1>num2) return 1;
		}
		if(arr1.length>arr2.length){
			return 1;
		}
		else if(arr1.length<arr2.length){
			return -1;
		}
		return 0;
	};
	if(lib.version){
		if(getVersionUpdate(lib.version,"1.10.13")<0){
			alert(`当前无名杀版本${lib.version}低于【仙家之魂】支持无名杀版本1.10.13，可能会引起报错，已为你关闭本扩展`);
			game.saveExtensionConfig("仙家之魂","enable",false);
			game.reload();
		}
	};
})();

game.import("extension",function(lib,game,ui,get,ai,_status){
	return {
		name:"仙家之魂",
		editable:false,
		content:function (config,pack){
		    if(!config.enable) return false;


			//第一次导入本扩展自动开启本扩展所有武将包
			try{
				if(!game.getExtensionConfig("仙家之魂","xjzh_enableCharacters")){
					let list=["XWSG","XWTR","XWDM","XWCS","XWTZ","JLBC"];
					for(let i of list){
						if(!lib.config.characters.includes(i)){
							game.saveConfig('characters',lib.config.characters.concat(i));
						}
					}
					if(!lib.config.cards.includes('xjzh_Card')){
						game.saveConfig('cards',lib.config.cards.concat('xjzh_Card'));
					}
					game.saveExtensionConfig("仙家之魂","xjzh_enableCharacters",true);
					game.reload();
				}
			}catch(e){
				console.log(e);
			};

			//第一次导入本扩展自动开启本扩展所有武将包
			try{
				if(!game.getExtensionConfig("仙家之魂","xjzh_qishuReset")){
					game.xjzh_resetCailiao();
					game.saveExtensionConfig("仙家之魂","xjzh_qishuReset",true);
					alert("奇术要件系统已更新，已为你重置材料背包");
					game.reload();
				}
			}catch(e){
				console.log(e);
			};

	        lib.arenaReady.push(function(){
		        if(lib.config.xjzh_diablo_hunhuo){
			        alert("第一次安装【仙家之魂】或上一版本所有对局中均未出现死灵法师拉马斯这一角色的请无视此次提示");
			        alert("由于死灵法师拉马斯的【魂火】写法更改，前一版本的存档已经不再支持新版本，已为你自动删除");
			        alert("游戏将于5秒后自动重新启动");
			        window.localStorage.removeItem("xjzh_diablo_hunhuo");
			        game.saveConfig('xjzh_diablo_hunhuo',false);
			        setTimeout(function(){
				        game.reload();
			        },
			        5000);
		        }
		        var list=lib.config.banned;
		        var list2=window.localStorage.getItem("xjzh_diablo_hunhuo");
		        if(list2==null) return;
		        var str=list2.slice(0,-2);
		        var name=str.split('::');
		        for(var i of name){
			        list.push(i);
		        }
		        lib.config.banned=list.slice(0);
	        });

	        lib.arenaReady.push(function(){
				if(!game.hasExtension("十周年UI")&&game.getExtensionConfig("仙家之魂","xjzh_playSkillEffect")){
					alert("检测到你没有安装十周年UI且开启了技能特效选项，将为你关闭！");
					game.saveExtensionConfig("仙家之魂","xjzh_playSkillEffect",false);
					setTimeout(function(){
						game.reload();
					},1500);
				};
			});
            lib.arenaReady.push(async()=>{
                let obj=Object.keys(Object.assign({...lib.skill},{...lib.card})).filter(name=>{
                    if(name.startsWith("xjzh_")) return true;
                    return false;
                });
                let colorx=game.getExtensionConfig("金庸群侠传","jy_changeJuesePageUIColor");
                for await(let name of obj){
                    if(lib.translate[name+"_info"]&&lib.translate[name+"_info"].length>0){
                        let str = lib.translate[name+ "_info"]

						if(str.includes("控制")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_kongzhi');\">控制</a>`;
							str=str.replace(/控制/g,str2);
						};
						if(str.includes("目盲")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_mumang');\">目盲</a>`;
							str=str.replace(/目盲/g,str2);
						};
						if(str.includes("中毒")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_zhongdu');\">中毒</a>`;
							str=str.replace(/中毒/g,str2);
						};
						if(str.includes("眩晕")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_xuanyun');\">眩晕</a>`;
							str=str.replace(/眩晕/g,str2);
						};
						if(str.includes("灵柩")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_lingjiu');\">灵柩</a>`;
							str=str.replace(/灵柩/g,str2);
						};
						if(str.includes("唤醒")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huanxing');\">唤醒</a>`;
							str=str.replace(/唤醒/g,str2);
						};
						if(str.includes("解放")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jiefang');\">解放</a>`;
							str=str.replace(/解放/g,str2);
						};
						if(str.includes("冰冻")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_bingdong');\">冰冻</a>`;
							str=str.replace(/冰冻/g,str2);
						};
						if(str.includes("灌注")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_guanzhu');\">灌注</a>`;
							str=str.replace(/灌注/g,str2);
						};
						if(str.includes("强固")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_qianggu');\">强固</a>`;
							str=str.replace(/强固/g,str2);
						};
						if(str.includes("燃烧")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_ranshao');\">燃烧</a>`;
							str=str.replace(/燃烧/g,str2);
						};
						if(str.includes("冰缓")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_binghuan');\">冰缓</a>`;
							str=str.replace(/冰缓/g,str2);
						};
						if(str.includes("感电")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gandian');\">感电</a>`;
							str=str.replace(/感电/g,str2);
						};
						if(str.includes("周围")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_zhouwei');\">周围</a>`;
							str=str.replace(/周围/g,str2);
						};
						if(str.includes("暴击")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baoji');\">暴击</a>`;
							str=str.replace(/暴击/g,str2);
						};
						if(str.includes("暴率")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baojiRan');\">暴击几率</a>`;
							str=str.replace(/暴率/g,str2);
						};
						if(str.includes("易伤")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_yishang');\">易伤</a>`;
							str=str.replace(/易伤/g,str2);
						};
						if(str.includes("暴伤")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baojiDamage');\">暴击伤害</a>`;
							str=str.replace(/暴伤/g,str2);
						};
						if(str.includes("暴球")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_criticalstrike');\">暴击球</a>`;
							str=str.replace(/暴球/g,str2);
						};
						if(str.includes("反击")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fanji');\">反击</a>`;
							str=str.replace(/反击/g,str2);
						};
						if(str.includes("格挡")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gedang');\">格挡</a>`;
							str=str.replace(/格挡/g,str2);
						};
						if(str.includes("格上限")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_maxGedang');\">格挡上限</a>`;
							str=str.replace(/格上限/g,str2);
						};
						if(str.includes("物理攻击")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gongji');\">物理攻击</a>`;
							str=str.replace(/物理攻击/g,str2);
						};
						if(str.includes("法术攻击")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fashu');\">法术攻击</a>`;
							str=str.replace(/法术攻击/g,str2);
						};
						if(str.includes("附近")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fujin');\">附近</a>`;
							str=str.replace(/附近/g,str2);
						};
						if(str.includes("友军")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_youjun');\">友军</a>`;
							str=str.replace(/友军/g,str2);
						};
						if(str.includes("飓风")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jufeng');\">飓风</a>`;
							str=str.replace(/飓风/g,str2);
						};
						if(str.includes("会心")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huixin');\">会心</a>`;
							str=str.replace(/会心/g,str2);
						};
						if(str.includes("减速")){
							let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jiansu');\">减速</a>`;
							str=str.replace(/减速/g,str2);
						};
						if(str.includes("定身")){
							let num=str.indexOf("定身");
							if(str[num+2]!="咒"){
								let str2=`<a style='color:${colorx?colorx:"#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_dingshen');\">定身</a>`;
								str=str.replace(/定身/g,str2);
							}
						};
                        lib.translate[name+"_info"] = str;
                    };
                };
			});
			if(!lib.config.xjzh_importTips2){
				alert('声明：本扩展（《仙家之魂》）完全免费且开源，到目前为止仅在QQ群697310426和545844827发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。');
				var ret=confirm("请确保你已仔细阅读以上提示，点击『确定』关闭本提示，点击『取消』将关闭【仙家之魂】扩展");
				if(!ret){
					if(game.hasExtension("仙家之魂")){
						alert("你点击了取消，将为你关闭【仙家之魂】扩展");
						game.saveConfig('extension_仙家之魂_enable',false);
						var ret2=confirm('是否需要删除【仙家之魂】扩展文件内容？')
						if(ret2){
							alert('已为你删除扩展文件');
							game.removeExtension('仙家之魂',false);
						}else{
							alert('你可以在扩展界面或文件管理器中删除本扩展或重新在扩展界面开启本扩展');
						}
					}
					else{
						throw new Error('("你点击了取消，已为你取消导入【仙家之魂】扩展');
					}
				}
				else{
					game.saveConfig('xjzh_importTips2',true);
				}
			};
			game.xjzh_openDialog=function(str){
				var pbg=ui.create.div(".xjzh-dialog-div",ui.window);
				pbg.style.zIndex=51;
				var obj=ui.create.div('.xjzh-dialog',pbg);
				obj.style.transformOrigin="center";
				var num=get.rand(0,5);
				var url="extension/仙家之魂/css/images/ui/";
				var url2="xjzh_info";
				obj.style.backgroundImage="url("+lib.assetURL+""+url+""+url2+""+num+".png)";
				var str,list,click;
				for(var i=0;i<arguments.length;i++){
					if(Array.isArray(arguments[i])){
						list=arguments[i];
					}
					else if(typeof arguments[i]=='function'){
						click=arguments[i];
					}
					/*else if(typeof arguments[i]=='string'){
						str=arguments[i];
					}*/
				}
				window.addEventListener("resize",function(){
					var width=document.body.clientWidth;
					var height=document.body.clientHeight;
					if(obj){
						obj.style.transform="translate(-50%,-50%) scale("+Math.min(height/1440,width/2560)*4+")";
					}
				},false);
				var dialog=ui.create.div('.xjzh-dialog-name',obj);
				var text=ui.create.div('.xjzh-dialog-text',obj);
				if(typeof introduces[str]!='undefined'){
					dialog.innerHTML=introduces[str].name;
					text.innerHTML=introduces[str].info;
				}
				else{
					if(typeof lib.translate[str]!='undefined'||typeof lib.translate[str+"_info"]!='undefined'){
						if(lib.translate[str]) dialog.innerHTML=lib.translate[str];
						if(lib.translate[str+"_info"]){
							text.innerHTML=lib.translate[str+"_info"];
						}else{
							text.innerHTML=get.info(str).intro.content;
						}
					}
					else{
						pbg.remove();
						throw new Error(str+"参数不存在，请检查！");
					}
				}
				var node=ui.create.div('.xjzh-dialog-remove',obj);
				node.onclick=function(){
					pbg.remove();
				}
				pbg.onclick=function(){
					pbg.remove();
				}
				node.link=list;
				ui.window.appendChild(pbg);
			};
			//成就系统
			//部分代码借鉴自《玄武江湖》
			window.openxjzhAchievement=function(){
				if(game.xjzhAchi){
					game.xjzhAchi.openAchievementMainPage();
					return;
				}
				else{
					alert("发生了点小问题，您可以重新载入本扩展试试。");
				}
			};
			// ---------------------------------------武将评级------------------------------------------//
			if(lib.rank){
				//废将(A)
				lib.rank.rarity.junk.addArray(["xjzh_boss_xiaotianshi"]);
				//精品(S)
				lib.rank.rarity.rare.addArray(["xjzh_boss_datianshi","xjzh_boss_gaotianshi","xjzh_zxzh_jiangningzhi","xjzh_poe_chuxing","xjzh_poe_yuansushi","xjzh_poe_nvwu","xjzh_dnf_shengqi","xjzh_dnf_jianshen","xjzh_poe_youxia","xjzh_poe_juedouzhe","xjzh_huoying_dou"]);
				//史诗(SS)
				lib.rank.rarity.epic.addArray(["xjzh_sanguo_xiaoqiao","xjzh_sanguo_daqiao","xjzh_boss_tianshizhang","xjzh_wzry_duoliya","xjzh_sanguo_chunhua","xjzh_sanguo_wenyang","xjzh_diablo_kelike","xjzh_diablo_nataya","xjzh_diablo_yafeikela","xjzh_sanguo_huaxiong","xjzh_meiren_linshuang","xjzh_diablo_kaxia","xjzh_diablo_moruina","xjzh_sanguo_zuoyou","xjzh_sanguo_sunquan","xjzh_wzry_huamulan","xjzh_sanguo_simahui","xjzh_sanguo_yuji","xjzh_xyj_sunwukong","xjzh_sanguo_zhangliao","xjzh_huoying_zhishui","xjzh_dnf_suodeluosi","xjzh_zxzh_yumuren","xjzh_sanguo_yuanshao","xjzh_qixia_mumuxiao","xjzh_sanguo_xunyou","xjzh_sanguo_xuzhu","xjzh_sanguo_ganning","xjzh_wzry_haiyue","xjzh_qixia_maybe","xjzh_wzry_ganjiangmoye","xjzh_sanguo_diaochan","xjzh_wzry_libai","xjzh_wzry_yao","xjzh_sanguo_bogui","xjzh_sanguo_zhangrang","xjzh_zxzh_moqinyan","xjzh_huoying_zuozhu","xjzh_zxzh_mufeng","xjzh_zxzh_moqinwu","xjzh_sanguo_liubei","xjzh_sanguo_dianwei","xjzh_sanguo_luxun","xjzh_zxzh_yuanyuan","xjzh_zxzh_linlingshiyu","xjzh_meiren_gaoyu","xjzh_sanguo_tongyuan","xjzh_sanguo_dongzhuo","xjzh_sanguo_machao","xjzh_sanguo_huatuo","xjzh_sanguo_huangzhong","xjzh_sanguo_pangtong","xjzh_sanguo_spzhangjiao","xjzh_sanguo_zhangning","xjzh_meiren_xiangwanru","xjzh_sanguo_sunhao","xjzh_sanguo_lvbu"]);
				//传说(SSS)
				lib.rank.rarity.legend.addArray(["xjzh_jlsg_diaochan","xjzh_boss_bingchuanjushou","xjzh_boss_ttshilian","xjzh_jlsg_zhaoyan","xjzh_boss_qier","xjzh_boss_duruier","xjzh_boss_geligaoli","xjzh_sanguo_espsunce","xjzh_boss_waershen","xjzh_diablo_lilisi","xjzh_boss_lilisi","xjzh_sanguo_espzhangjiao","xjzh_sanguo_nanhua","xjzh_boss_zhangjiao","xjzh_sanguo_espzuoci","xjzh_sanguo_sphuatuo","xjzh_boss_lvbu","xjzh_zxzh_linmo","xjzh_diablo_lamasi","xjzh_sanguo_zhangbao","xjzh_sanguo_guanlu","xjzh_sanguo_espliuxie","xjzh_qixia_daxiongxiaomao","xjzh_huoying_kakaxi","xjzh_zxzh_linziyan","xjzh_meiren_huangdanxue","xjzh_poe_guizu","xjzh_sanguo_caocao","xjzh_sanguo_guojia","xjzh_meiren_zhaoyushu","xjzh_meiren_linjiasheng","xjzh_sanguo_caiyan","xjzh_sanguo_zhongda","xjzh_sanguo_zhaoyun","xjzh_sanguo_weiyan","xjzh_sanguo_yueying","xjzh_sanguo_kongming","xjzh_sanguo_spkongming","xjzh_sanguo_zhangfei","xjzh_huoying_mingren","xjzh_sanguo_daxiaoqiao","xjzh_sanguo_zuoci","xjzh_boss_zuoyou","xjzh_sanguo_zhangjiao","xjzh_meiren_wuyufeng","xjzh_meiren_huangyuke","xjzh_sanguo_splvbu","xjzh_sanguo_guanyu","xjzh_sanguo_zhenfu","xjzh_sanguo_zhoutai"]);
			}
			// ---------------------------------------定义势力------------------------------------------//
			//代码借鉴自《金庸群侠传》
			var changePlayer={
				//仙武三国
				"xjzh_sanguo_daqiao":"XING",
				"xjzh_sanguo_xiaoqiao":"XING",
				"xjzh_sanguo_wenyang":"XING",
				"xjzh_sanguo_chunhua":"XING",
				"xjzh_sanguo_huaxiong":"XING",
				"xjzh_sanguo_zhaoyun":"XING",
				"xjzh_sanguo_caiyan":"XING",
				"xjzh_sanguo_zhongda":"XING",
				"xjzh_sanguo_zhenfu":"XING",
				"xjzh_sanguo_weiyan":"XING",
				"xjzh_sanguo_yueying":"XING",
				"xjzh_sanguo_kongming":"XING",
				"xjzh_sanguo_spkongming":"XING",
				"xjzh_sanguo_huangzhong":"XING",
				"xjzh_sanguo_machao":"XING",
				"xjzh_sanguo_pangtong":"XING",
				"xjzh_sanguo_zhangfei":"XING",
				"xjzh_sanguo_guanyu":"XING",
				"xjzh_sanguo_daxiaoqiao":"XING",
				"xjzh_sanguo_sunhao":"XING",
				"xjzh_sanguo_huatuo":"XING",
				"xjzh_sanguo_dongzhuo":"XING",
				"xjzh_sanguo_zuoci":"XING",
				"xjzh_sanguo_tongyuan":"XING",
				"xjzh_sanguo_spzhangjiao":"XING",
				"xjzh_sanguo_zhangning":"XING",
				"xjzh_sanguo_zhangjiao":"XING",
				"xjzh_sanguo_splvbu":"XING",
				"xjzh_sanguo_lvbu":"XING",
				"xjzh_sanguo_luxun":"XING",
				"xjzh_sanguo_zhoutai":"XING",
				"xjzh_sanguo_guojia":"XING",
				"xjzh_sanguo_dianwei":"XING",
				"xjzh_sanguo_liubei":"XING",
				"xjzh_sanguo_caocao":"XING",
				"xjzh_sanguo_zhangrang":"XING",
				"xjzh_sanguo_bogui":"XING",
				"xjzh_sanguo_diaochan":"XING",
				"xjzh_sanguo_espliuxie":"XING",
				"xjzh_sanguo_espsunce":"XING",
				"xjzh_sanguo_guanlu":"XING",
				"xjzh_sanguo_ganning":"XING",
				"xjzh_sanguo_xuzhu":"XING",
				"xjzh_sanguo_xunyou":"XING",
				"xjzh_sanguo_zhangbao":"XING",
				"xjzh_sanguo_yuanshao":"XING",
				"xjzh_sanguo_zhangliao":"XING",
				"xjzh_sanguo_sphuatuo":"XING",
				"xjzh_sanguo_yuji":"XING",
				"xjzh_sanguo_simahui":"XING",
				"xjzh_sanguo_sunquan":"XING",
				"xjzh_sanguo_espzuoci":"XING",
				"xjzh_sanguo_zuoyou":"XING",
				"xjzh_sanguo_nanhua":"XING",
				//仙武同人
				"xjzh_zxzh_jiangningzhi":"XING",
				"xjzh_zxzh_linlingshiyu":"XING",
				"xjzh_zxzh_yuanyuan":"XING",
				"xjzh_zxzh_mufeng":"XING",
				"xjzh_zxzh_moqinwu":"XING",
				"xjzh_zxzh_linziyan":"XING",
				"xjzh_zxzh_moqinyan":"XING",
				"xjzh_zxzh_yumuren":"XING",
				"xjzh_zxzh_linmo":"XING",
				"xjzh_meiren_linshuang":"XING",
				"xjzh_poe_nvwu":"XING",
				"xjzh_poe_yuansushi":"XING",
				"xjzh_poe_juedouzhe":"XING",
				"xjzh_poe_chuxing":"XING",
				"xjzh_poe_weishi":"XING",
				"xjzh_poe_youxia":"XING",
				"xjzh_poe_ruiyan":"XING",
				"xjzh_poe_guizu":"XING",
				"xjzh_wzry_libai":"XING",
				"xjzh_wzry_yao":"XING",
				"xjzh_wzry_duoliya":"XING",
				"xjzh_wzry_ganjiangmoye":"XING",
				"xjzh_wzry_haiyue":"XING",
				"xjzh_wzry_huamulan":"XING",
				"xjzh_diablo_lamasi":"XING",
				"xjzh_diablo_moruina":"XING",
				"xjzh_diablo_kelike":"XING",
				"xjzh_diablo_kaxia":"XING",
				"xjzh_diablo_yafeikela":"XING",
				"xjzh_diablo_lilisi":"XING",
				"xjzh_diablo_nataya":"XING",
				"xjzh_dnf_jianshen":"XING",
				"xjzh_dnf_shengqi":"XING",
				"xjzh_dnf_suodeluosi":"XING",
				"xjzh_xyj_sunwukong":"XING",
				//仙武创世
				"xjzh_meiren_gaoyu":"XING",
				"xjzh_meiren_zhaoyushu":"XING",
				"xjzh_meiren_linjiasheng":"XING",
				"xjzh_meiren_wuyufeng":"XING",
				"xjzh_meiren_huangyuke":"XING",
				"xjzh_meiren_xiangwanru":"XING",
				"xjzh_meiren_huangdanxue":"XING",
				"xjzh_qixia_mumuxiao":"XING",
				"xjzh_qixia_daxiongxiaomao":"XING",
				"xjzh_qixia_maybe":"XING",
				//仙武动漫
				"xjzh_huoying_mingren":"XING",
				"xjzh_huoying_zuozhu":"XING",
				"xjzh_huoying_dou":"XING",
				"xjzh_huoying_kakaxi":"XING",
				"xjzh_huoying_zhishui":"XING",
			};
			if(config.disEnableCharacter){
				for(var i in lib.character){
					if(!changePlayer[i]) lib.character[i][4].add("unseen");
				};
				lib.arenaReady.push(function(){
					var list=[];
					if(lib.config.all.characters.includes('XWSG')) list.add('XWSG');
					if(lib.config.all.characters.includes('XWTR')) list.add('XWTR');
					if(lib.config.all.characters.includes('XWCS')) list.add('XWCS');
					if(lib.config.all.characters.includes('XWDM')) list.add('XWDM');
					if(lib.config.all.characters.includes('XWTZ')) list.add('XWTZ');
					lib.config.all.characters=list;
				});
			};
			if(config.xjzh_changeGroup){
				for(var i in changePlayer) {
					if(lib.character[i]) lib.character[i][1]=changePlayer[i];
				};
			};
			if(config.xjzh_changeGroup){
				var style1=document.createElement('style');
				style1.innerHTML=".player .identity[data-color='XING'],";
				style1.innerHTML+="div[data-nature='XING'],";
				style1.innerHTML+="span[data-nature='XING'] {text-shadow: black 0 0 1px,rgba(255, 0, 204,1) 0 0 2px,rgba(255, 0, 204,1) 0 0 5px,rgba(255, 0, 204,1) 0 0 10px,rgba(255, 0, 204,1) 0 0 10px}";
				style1.innerHTML+="div[data-nature='XINGm'],";
				style1.innerHTML+="span[data-nature='XINGm'] {text-shadow: black 0 0 1px,rgba(255,128,0,1) 0 0 2px,rgba(255,128,0,1) 0 0 5px,rgba(255,128,0,1) 0 0 5px,rgba(255,128,0,1) 0 0 5px,black 0 0 1px;}";
				style1.innerHTML+="div[data-nature='XINGmm'],";
				style1.innerHTML+="span[data-nature='XINGmm'] {text-shadow: black 0 0 1px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,rgba(255,128,204,1) 0 0 2px,black 0 0 1px;}";
				document.head.appendChild(style1);
				lib.group.add('XING');
				lib.translate.XING='星';
				lib.translate.XING2='星';
				lib.groupnature.XING='XING';
				/*十周年UI武将名背景*/
				var tenUi=document.createElement('style');
				tenUi.innerHTML=".player>.camp-zone[data-camp='XING']>.camp-back {background: linear-gradient(to bottom, rgb(204,0,204), rgb(136,0,204), rgb(102,0,204));}";
				/*十周年UI势力*/
				tenUi.innerHTML+=".player>.camp-zone[data-camp='XING']>.camp-name {text-shadow: 0 0 5px rgb(255, 0, 204), 0 0 10px rgb(255, 0, 204), 0 0 15px rgb(255, 0, 204);}";
				document.head.appendChild(tenUi);
			}
			// ---------------------------------------界Mark------------------------------------------//
			//代码借鉴自《金庸群侠传》
			lib.arenaReady.push(function() {
				if (lib.config.extensions && lib.config.extensions.includes('十周年UI') && lib.config['extension_十周年UI_enable']) {
					if (window.duicfg && window.duicfg.showJieMark) {
						lib.xjzh_player_init = lib.element.player.init;
						lib.element.player.init = function(character, character2, skill) {
							var xjzhesp={
								xjzh_sanguo_espliuxie:'esp刘协',
								xjzh_sanguo_espzuoci:'esp左慈',
								xjzh_sanguo_espsunce:"esp孙策",
							};
							var xjzhsp={
								xjzh_sanguo_spzhangjiao:'sp张角',
								xjzh_sanguo_splvbu:'sp吕布',
								xjzh_sanguo_spkongming:'sp诸葛亮',
								xjzh_sanguo_sphuatuo:'sp华佗',
							};
							var xjzhjiexian={
								xjzh_sanguo_tongyuan:'界童渊',
								xjzh_sanguo_machao:'界马超',
								xjzh_sanguo_zhangrang:'界张让',
								xjzh_sanguo_guanlu:'界管辂',
								xjzh_sanguo_xunyou:'界荀攸',
								xjzh_sanguo_diaochan:'界貂蝉',
								xjzh_sanguo_huangzhong:'界黄忠',
							};
							var player = lib.xjzh_player_init.apply(this, arguments);
							////===========界标============////
							if (lib.config.extension_仙家之魂_xjzh_jiexiantupo) {
								if (character && xjzhjiexian[character]) {
									if (player.$jieMark == undefined) {
										player.$jieMark = window.dui.element.create('jie-mark', player);
									}
									else {
										player.appendChild(player.$jieMark);
									};
									var name = xjzhjiexian[character];
									name = name.slice(1);
									player.node.name.innerHTML = get.verticalStr(name, true);
									return player;
								};
							};
							////===========SP标============////
							if (character && xjzhsp[character]) {
								if (player.$jieMark == undefined) {
									player.$jieMark = window.dui.element.create('jie-mark', player);
								}
								else {
									player.appendChild(player.$jieMark);
								};
								player.$jieMark.style.backgroundImage = 'url("' + lib.assetURL + "extension/仙家之魂/image/jiemark/mark_xjzh_sp.png" + '")';
								var name = xjzhsp[character];
								name = name.slice(2);
								player.node.name.innerHTML = get.verticalStr(name, true);
								return player;
							};
							////===========ESP标============////
							if (character && xjzhesp[character]) {
								if (player.$jieMark == undefined) {
									player.$jieMark = window.dui.element.create('jie-mark', player);
								}
								else {
									player.appendChild(player.$jieMark);
								};
								player.$jieMark.style.backgroundImage = 'url("' + lib.assetURL + "extension/仙家之魂/image/jiemark/mark_xjzh_esp.png" + '")';
								var name = xjzhesp[character];
								name = name.slice(3);
								player.node.name.innerHTML = get.verticalStr(name, true);
								return player;
							};
							return player;
						};
					};
				};
			});
			// ---------------------------------------Fps显示------------------------------------------//
			//代码借鉴自《扩展ol》
			game.xjzh_showFps=function(id){
				var requestAnimationFrame=window.requestAnimationFrame||
				window.webkitRequestAnimationFrame||
				window.mozRequestAnimationFrame||
				window.oRequestAnimationFrame||
				window.msRequestAnimationFrame||
				function(callback){
					window.setTimeout(callback,1000/60);
				};
				var div;
				if(document.getElementById(id)==undefined){
					div=document.createElement('div');
					div.setAttribute('id','xjzh_showFPS');
					div.style.zIndex=999;
					div.style['pointer-events']='none';
					var config=lib.config['extension_仙家之魂_tx_skillAnimation_showFpsP'];
					if(config=='cd'){
						div.style.left='calc(50% - '+(div.offsetWidth/2)+'px)';
						div.style.bottom='0px';
					}
					else if(config=='ld'){
						div.style.left='0px';
						div.style.bottom='0px';
					}
					else if(config=='ru'){
						div.style.right='0px';
						div.style.top='0px';
					}
					else if(config=='cu'){
						div.style.left='calc(50% - '+(div.offsetWidth/2)+'px)';
						div.style.top='0px';
					}
					else if(config=='lu'){
						div.style.left='0px';
						div.style.top='0px';
					}
					else{
						div.style.right='0px';
						div.style.bottom='0px';
					};
					ui.window.appendChild(div);
				}
				else{
					div=document.getElementById(id);
				};
				var fps=0;
				var last=Date.now();
				var offset;
				var step=function(){
					offset=Date.now()-last;
					fps+=1;
					if(offset>=1000){
						last+=offset;
						if(fps>60) fps=60;
						div.innerHTML='FPS:'+fps;
						fps=0;
					}
					requestAnimationFrame(step);
				};
				step();
			};
			lib.arenaReady.push(function(){
				if(lib.config['extension_仙家之魂_tx_skillAnimation_showFps']==true){
					game.xjzh_showFps('document.getElementById(id)');
				};
			});
			// ---------------------------------------文件导入------------------------------------------//
			//代码借鉴自《玄武江湖》
			window.xjzhOpenLoading = function(str){
				var dialogBK=ui.create.div(ui.window,{
					zIndex:10000,
					width:'100%',height:'100%'
				});
				dialogBK.listen(function(){
					dialogBK.delete();
				})
				var dialog = ui.create.div('.xjzh-loading',dialogBK);
				var text = ui.create.div('.xjzh-loading-text',dialog);
				dialog.subViews = {text};
				if(str&&typeof str=='string') text.innerHTML=str;
				return dialog;
			};
			// ---------------------------------------显示手牌上限------------------------------------------//
			if(config.xjzh_ShowmaxHandcard){
				lib.skill._xjzh_ShowmaxHandcard={
					trigger:{
						global:['gameStart','roundStart'],
					},
					forced:true,
					popup:false,
					silent:true,
					content:function (){
						var interval=setInterval(()=>{
							if(!ui.window.contains(player)) return clearInterval(interval);
							var numh=player.countCards('h');
							var nummh=player.getHandcardLimit();
							if(nummh==Infinity) nummh='∞';
							player.node.count.innerHTML=numh+'/'+nummh;
						},100);
					},
				};
			};
			// ---------------------------------------阵亡配音------------------------------------------//
			/*lib.skill._xjzh_dieaudio={
				trigger:{player:'die'},
				popup:false,
				forced:true,
				forceDie:true,
				content:function(){
					if(lib.character[player.name]&&lib.character[player.name][4].includes('xjzh_die_audio')) {
						game.playAudio('..', 'extension','仙家之魂','audio','skill',player.name);
					}
					else if(lib.character[player.name1]&&lib.character[player.name1][4].includes('xjzh_die_audio')){
						game.playAudio('..', 'extension','仙家之魂','audio','skill',player.name1);
					};
					setTimeout(function(){
						if(player.name2&&lib.character[player.name2]&&lib.character[player.name2][4].includes('xjzh_die_audio')){
							game.playAudio('..', 'extension','仙家之魂','audio','skill',player.name2);
						}
					},
					1500);
				},
			};*/
			// ---------------------------------------播放音乐------------------------------------------//
			//代码借鉴自《金庸群侠传》
			game.playXH=function(fn,dir,sex){
				if(lib.config.background_speak){
					if(dir&&sex)
					game.playAudio(dir,sex,fn);
					else if(dir)
					game.playAudio(dir,fn);
					else
					game.playAudio('..','extension','仙家之魂','audio','skill',fn);
				}
			};
			// ---------------------------------------背景音乐------------------------------------------//
			//代码借鉴自《金庸群侠传》
			game.xjzhplayBackgroundMusic = function () {
				var temp = lib.config.extension_仙家之魂_xjzh_Background_Music;
				if (temp == '0') {
					/*//Math.random()*30 生成一个0到29但不等于29的数值
					temp = Math.floor(2 + Math.random() * 38);
					//2加0到29
					//生成一个范围2到31的整数
					temp = temp.toString();
					//转为字符串*/
					temp=get.rand(2,5).toString();
				};
				ui.backgroundMusic.pause();
				var item = {
					"2":"xjzh_Backgroundmusic2.mp3",
					"3":"xjzh_Backgroundmusic3.mp3",
					"4":"xjzh_Backgroundmusic4.mp3",
					"5":"xjzh_Backgroundmusic5.mp3",
				};
				if (item[temp]) {
					ui.backgroundMusic.src = lib.assetURL + 'extension/仙家之魂/music/' + item[temp];
				}
				else {
					game.playBackgroundMusic();
					ui.backgroundMusic.addEventListener('ended', game.playBackgroundMusic);
				}
			}
			if (lib.config.extension_仙家之魂_xjzh_Background_Music && lib.config.extension_仙家之魂_xjzh_Background_Music != "1") {
				lib.arenaReady.push(function () {
					//ui.backgroundMusic.autoplay=true;
					//ui.backgroundMusic.pause();
					game.xjzhplayBackgroundMusic();
					ui.backgroundMusic.addEventListener('ended', game.xjzhplayBackgroundMusic);
				});
			};
			// ---------------------------------------背景图片------------------------------------------//
			//代码借鉴自《金庸群侠传》
			game.xjzhBackground_Picture = function () {
				var temp = lib.config['extension_仙家之魂_xjzh_Background_Picture'];
				if (temp == 'auto') {
					var list = [
					"xjzh_Background1",
					"xjzh_Background2",
					"xjzh_Background3",
					"xjzh_Background4",
					"xjzh_Background5",
					"xjzh_Background6",
					];
					if (_status.xjzhBackground_Picture) list.remove(_status.xjzhBackground_Picture);
					temp = list.randomGet();
				}
				_status.xjzhBackground_Picture = temp;
				if (temp !== '1') {
					game.broadcastAll() + ui.background.setBackgroundImage("extension/仙家之魂/picture/" + temp + ".jpg");
				}
				else {
					game.broadcastAll() + ui.background.setBackgroundImage('image/background/' + lib.config.image_background + '.jpg');
				}
				var item = game.getExtensionConfig("仙家之魂","xjzh_Background_Picture");
				if (item != "auto") {
					if (_status.xjzh_Background_Picture_timeout) {
						clearTimeout(_status.xjzh_Background_Picture_timeout);
					};
				}
				else if (item == "auto") {
					var autotime = game.getExtensionConfig("仙家之魂","xjzh_Background_Picture_auto");
					var Timeout = autotime ? parseInt(autotime) :30000;
					///////////////////////////////////////////////////////
					var Timeout2 = _status.xjzh_Background_Picture_Timeout2;
					if (_status.xjzh_Background_Picture_timeout && Timeout2 && Timeout2 != Timeout) {
						clearTimeout(_status.xjzh_Background_Picture_timeout);
					};
					/////////////////////////////////////////////////
					_status.xjzh_Background_Picture_timeout = setTimeout(function () {
						game.xjzhBackground_Picture();
					},
					Timeout);
					/*Timeout*/
					_status.xjzh_Background_Picture_Timeout2 = Timeout;
				};
			};
			if (lib.config.extension_仙家之魂_xjzh_Background_Picture && lib.config.extension_仙家之魂_xjzh_Background_Picture != "1") {
				lib.arenaReady.push(function () {
					game.xjzhBackground_Picture();
				});
			};
			// ---------------------------------------增益技能------------------------------------------//
			if(game.getExtensionConfig("仙家之魂","xjzh_zengyiSetting")!=='close'){
				lib.skill._xjzh_zengyix={
					trigger:{
						global:["gameStart"],
						player:["phaseZhunbeiBefore","enterGame"],
					},
					silent:true,
					filter(event,player){
						var list=[
							"pianxian","chongsu","shunying","fengyue","hunqian","mengdie","poxiao","shuangsheng","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
						]
						if(get.mode()=="boss"){
							if(["xjzh_boss_lilisi","xjzh_boss_duruier","xjzh_boss_waershen","xjzh_boss_geligaoli","xjzh_boss_qier","xjzh_boss_bingchuanjushou"].includes(get.nameList(game.boss))) return false;
						}
						if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
						for(var i of list){
							if(player.skills.includes("xjzh_zengyi_"+i)) return false;
						}
						if(player.hasSkill("xjzh_zengyi_off")) return false;
						if(!player.isUnderControl(true))  return false;
						if(get.nameList(player,"xjzh_sanguo_zuoyou")) return false;
						return true;
					},
					async content(event,trigger,player){
						const list=[
							"pianxian","chongsu","shunying","fengyue","hunqian","mengdie","poxiao","shuangsheng","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
						];
						if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
						switch(game.getExtensionConfig("仙家之魂","xjzh_zengyiSetting")){
							case "player":{
								let skills=list.randomGet();
								player.addSkill("xjzh_zengyi_off",false);
								player.addSkill("xjzh_zengyi_"+skills);
								game.log(player,'获得了增益技能<span style=\"color: red\">〖'+get.translation("xjzh_zengyi_"+skills)+'〗</span>');
							}
							break;
							case "own":{
								if(get.isXHwujiang(player)){
									let skills=list.randomGet();
									player.addSkill("xjzh_zengyi_off",false);
									player.addSkill("xjzh_zengyi_"+skills);
									game.log(player,'获得了增益技能<span style=\"color: red\">〖'+get.translation("xjzh_zengyi_"+skills)+'〗</span>');
								}
							}
							break;
						};
					},
				};
			};
			// ---------------------------------------定义函数------------------------------------------//
			/**
			 * 复制文本到剪贴板的功能函数。
			 * 通过创建一个临时的textarea元素，将指定文本写入该元素，选中该文本，然后执行浏览器的复制命令来实现复制功能。
			 * 由于不同浏览器对复制命令的支持程度不同，因此使用try-catch语句来捕获可能的错误。
			 *
			 * @param {string} text 需要复制到剪贴板的文本。
			 */
			game.xjzh_copyToText=function(text){
				// 创建一个textarea元素
				let textarea=document.createElement("textarea");
				// 设置textarea的值为待复制的文本
				textarea.value = text;
				// 将textarea添加到文档体中
				document.body.appendChild(textarea);
				// 选中textarea中的文本
				textarea.select();
				try {
					// 尝试执行浏览器的复制命令
					document.execCommand("copy");
					// 如果执行成功，给出提示
					alert("文本已复制到剪贴板！");
				} catch (e) {
					// 如果执行失败，输出错误到控制台，并给出提示
					console.error("复制失败", e);
					alert("当前浏览器不支持自动复制到剪贴板。");
				}
				// 删除临时的textarea元素
				document.body.removeChild(textarea);
			};
			//以下代码借鉴自《金庸群侠传》
			//显示更新内容
			get.xjzh_update=function(){
				try{
					let update=xjzhUpdateLog;
					lib.extensionPack['仙家之魂'].version=xjzhUpdateLog.version;
					let gengxing=update[update.version];
					if(lib.extensionPack['仙家之魂']&&lib.extensionPack['仙家之魂'].version!=game.getExtensionConfig("仙家之魂","changelog")){
						game.saveExtensionConfig("仙家之魂","changelog",lib.extensionPack['仙家之魂'].version);
					}else{
						return false;
					};
					if(gengxing.removeFiles&&typeof gengxing.removeFiles=="function") gengxing.removeFiles();
					let ul=document.createElement('ul');
					ul.style.textAlign='left';
					let caption;
					let version=update.version;
					let players=gengxing.players||[];
					let cards=gengxing.cards||[];
					let changeLog=gengxing.changeLog||[];
					caption='仙家之魂更新';
					for(let i of changeLog){
						let li=document.createElement('li');
						li.innerHTML=i;
						ul.appendChild(li);
					};
					let dialog=ui.create.dialog(caption,'hidden');
					dialog.add(version);
					dialog.forcebutton=true;
					dialog.classList.add('forcebutton');
					let lic=ui.create.div(dialog.content);
					lic.style.display='block';
					ul.style.display='inline-block';
					ul.style.marginLeft='20px';
					lic.appendChild(ul);
					if(players.length){
						for(let i=0;i<players.length;i++){
							if(!lib.character[players[i]]){
								let result=get.character(players[i]);
								if(result){
									if(!result[4]){
										result[4]=[];
									};
									lib.character[players[i]]=result;
								};
							};
							if(!lib.character[players[i]]){
								players.splice(i--,1);
							};
						};
						if(players.length){
							dialog.addText('武将更新');
							dialog.add([players,'character']);
							//dialog.addSmall([players,'character']);
						};
					};
					if(cards.length){
						for(let i=0;i<cards.length;i++){
							if(!lib.card[cards[i]]){
								cards.splice(i--,1);
							};
						};
						if(cards.length){
							for(let i=0;i<cards.length;i++){
								cards[i]=[get.translation(get.type(cards[i])),'',cards[i]];
							};
							dialog.addText('卡牌更新');
							dialog.add([cards,'vcard']);
							//dialog.addSmall([cards,'vcard']);
						}
					}
					dialog.addText('-----------------END-----------------');
					dialog.open();
					let hidden=false;
					if(!ui.auto.classList.contains('hidden')){
						ui.auto.hide();
						hidden=true;
					};
					game.pause();
					let control=ui.create.control('确定',function(){
						dialog.close();
						control.close();
						if(hidden) ui.auto.show();
						game.resume();
					});
					lib.init.onfree();
				}catch(error){
					console.log(error);
				};
			};
			let _showChangeLog=game.showChangeLog;
			game.showChangeLog=function(){
				_showChangeLog();
				let next=game.createEvent('xjzh_update',false);
				next.setContent(function () {
					get.xjzh_update();
				});
			};
			//以上代码借鉴自《金庸群侠传》
			//删除文件及文件夹
			//为防止滥用，只支持操作本扩展目录
			game.xjzh_removeFiles=(files)=>{
				if(lib.node&&lib.node.fs) try{
					const deleteFolderRecursive=path=>{
						if(!lib.node.fs.existsSync(path)) return;
						lib.node.fs.readdirSync(path).forEach((file,index)=>{
							const currentPath = `${path}/${file}`;
							if (lib.node.fs.lstatSync(currentPath).isDirectory()) deleteFolderRecursive(currentPath);
							else lib.node.fs.unlinkSync(currentPath);
						});
						lib.node.fs.rmdirSync(path);
					};
					deleteFolderRecursive(`${__dirname}/extension/仙家之魂/${files}`);
				}
				catch(error){
					console.log(error);
				}
				else new Promise((resolve,reject)=>window.resolveLocalFileSystemURL(`${lib.assetURL}extension/仙家之魂/${files}`,resolve,reject)).then(directoryEntry=>directoryEntry.removeRecursively());
			};
			/**
			 * 异步复制文件或文件夹。
			 * 使用node.js的文件系统模块在node环境复制文件，对于非node环境，则使用File API进行复制。
			 * @param {string} source - 源文件或文件夹的路径。
			 * @param {string} target - 目标文件或文件夹的路径。
			 * @param {function} onCopyCompleted - 复制完成后调用的回调函数，接收已复制文件数和总文件数作为参数。
			 */
			game.xjzh_copyFiles = async (source, target, onCopyCompleted) => {
				/**
				 * 根据路径和当前环境（node.js或浏览器），构造完整的文件路径。
				 * @param {string} path - 相对路径。
				 * @returns {string} 构造的完整路径。
				 */
				const getFullPath = (path) => lib.node ? `${__dirname}/${path}` : `${lib.assetURL}${path}`;

				// 当前环境为node.js且存在fs模块时，使用node.js的方式复制文件
				if (lib.node && lib.node.fs) {
					let totalFiles = 0; // 总文件数
				  	let copiedFiles = 0; // 已复制的文件数

					/**
					 * 递归复制文件夹及其内容。
					 * @param {string} srcRelative - 源文件夹的相对路径。
					 * @param {string} destRelative - 目标文件夹的相对路径。
					 */
					const copyFolderRecursive = async (srcRelative, destRelative) => {
						const src = getFullPath(srcRelative);
						const dest = getFullPath(destRelative);
						// 如果源文件夹不存在，则直接返回
						if (!lib.node.fs.existsSync(src)) return;
						// 如果目标文件夹不存在，则创建目标文件夹
						if (!lib.node.fs.existsSync(dest)) lib.node.fs.mkdirSync(dest, { recursive: true });
						const files = lib.node.fs.readdirSync(src);
						totalFiles = files.length;

						await Promise.all(files.map(async (file) => {
						const srcPath = `${src}/${file}`;
						const destPath = `${dest}/${file}`;
						// 如果是子文件夹，则递归复制
						if (lib.node.fs.lstatSync(srcPath).isDirectory()) {
							await copyFolderRecursive(`${srcRelative}/${file}`, `${destRelative}/${file}`);
						} else {
							// 如果是文件，则直接复制
							lib.node.fs.copyFileSync(srcPath, destPath);
							copiedFiles++;
						}
						}));
					};

					try {
						await copyFolderRecursive(source, target);
						// 复制完成后，调用回调函数
						onCopyCompleted(copiedFiles, totalFiles);
					} catch (error) {
						console.log(error);
					}
				} else {
					// 在非node.js环境下，使用File API进行文件复制
					new Promise((resolve, reject) =>
						window.resolveLocalFileSystemURL(getFullPath(source), resolve, reject)
					)
					.then(sourceEntry =>
					  new Promise((resolve, reject) =>
						window.resolveLocalFileSystemURL(getFullPath(target), resolve, reject)
						  .catch(() => window.resolveLocalFileSystemURL(getFullPath(''), dirEntry =>
							dirEntry.getDirectory(target.split('/').pop(), { create: true }, resolve)
						  ))
					  	).then(targetEntry =>
							sourceEntry.copyTo(targetEntry, null, resolve, reject)
					  	)
					)
					.then(() => onCopyCompleted(null, null)) // 在复制完成后调用回调
					.catch(error => console.error(error));
				}
			};
			//重置所有技能
			lib.element.player.xjzh_resetSkill=function(){
				var skills=this.skills.slice(0),list=[];
				game.expandSkills(skills);
				while(skills.length){
					var skill=skills.shift();
					var info=get.info(skill);
					if(typeof info.usable=='number'){
						if(this.hasSkill('counttrigger')&&this.storage.counttrigger[skill]&&this.storage.counttrigger[skill]>=1){
							delete this.storage.counttrigger[skill];
							list.add(skill);
						}
						if(typeof get.skillCount(skill)=='number'&&get.skillCount(skill)>=1){
							delete this.getStat('skill')[skill];
							list.add(skill);
						}
					}
					if(info.round&&this.storage[skill+'_roundcount']){
						delete this.storage[skill+'_roundcount'];
						list.add(skill);
					}
					if(this.storage[`temp_ban_${skill}`]){
						delete this.storage[`temp_ban_${skill}`];
					}
					if(this.awakenedSkills.includes(skill)){
						this.restoreSkill(skill);
						list.add(skill);
					}
				}
				if(list.length){
					var str='';
					for(var i of list){
						str+='【'+get.translation(i)+'】、';
					}
					game.log(this,'重置了技能','#g'+str.slice(0,-1));
				}
				return this;
			},
			//重置限定技支持传入object参数
			lib.element.player.restoreSkill=function(skill,nomark){
				if(Array.isArray(skill)){
					for(var i of skill) this.restoreSkill(i);
				}else{
					if(this.storage[skill]===true) this.storage[skill]=false;
					this.awakenedSkills.remove(skill);
					this.enableSkill(skill+'_awake',skill);
					if(!nomark) this.markSkill(skill);
					_status.event.clearStepCache();
				}
				return this;
			},
			//播放技能特效(需十周年支持)
			game.xjzh_playEffect=function(name,target,obj){
				if(!game.hasExtension("十周年UI")){
					console.log("技能特效需十周年UI支持，请安装十周年UI");
					return;
				}
				if(!window.decadeUI) return;
				if(!game.getExtensionConfig("仙家之魂","xjzh_playSkillEffect")||!game.getExtensionConfig("十周年UI","gameAnimationEffect")){
					console.log("未开启“技能特效”或十周年“游戏动画特效”");
					return;
				}
				if(obj==undefined){
					obj={...lib.xjzh_animations[name]};
					if(obj.parent===null){
						if(target) obj.parent=target;
						else obj.parent=this;
					}
				}
				decadeUI.animation.playSpine(name,obj);
			};
			//判断技能在当前阶段使用或发动的次数
			get.xjzh_countSkill=function(skill,player,self){
				if(!skill) return null;
				if(player==undefined) player=_status.event.player;
				if(self){
					var history=player.getAllHistory('useSkill',function(evt){
						return evt&&evt.skill&&evt.skill==skill;
					});
					if(!history) return 0;
					return history.length;
				}
				if(player.isUnderControl(true)){
					var num=player.getStat('skill')[skill];
					if(num==undefined) return 0;
					return num;
				}else{
					var history=player.getHistory('useSkill',function(evt){
						return evt&&evt.skill&&evt.skill==skill;
					});
					if(!history) return 0;
					return history.length;
				}
				return 0;
			};
			//判断当前系统日期是否处于某个时间段内
			get.xjzh_checkDate=function(beginDateStr,endDateStr){
				let curDate=new Date(),
				beginDate=new Date(beginDateStr),
				endDate=new Date(endDateStr);
				if(curDate>=beginDate&&curDate<=endDate) return true;
				return false;
			};
			//判断当前系统时间是否处于某个时间段内
			get.xjzh_checkTime=function(beginTime,endTime){
				var nowDate=new Date();
				var beginDate=new Date(nowDate);
				var endDate=new Date(nowDate);

				var beginIndex=beginTime.lastIndexOf("\:");
				var beginHour=beginTime.substring(0,beginIndex);
				var beginMinue=beginTime.substring(beginIndex+1,beginTime.length);
				beginDate.setHours(beginHour, beginMinue,0,0);

				var endIndex=endTime.lastIndexOf("\:");
				var endHour=endTime.substring(0,endIndex);
				var endMinue=endTime.substring(endIndex+1,endTime.length);
				endDate.setHours(endHour,endMinue,0,0);
				return nowDate.getTime()-beginDate.getTime()>=0&&nowDate.getTime()<=endDate.getTime();
			};
			///以下函数借鉴自《金庸群侠传》
			get.xjzh_filterGainSkill = function (skill, func, player, target) {
				if (!lib.translate[skill]) return false;
				if (!lib.translate[skill].length) return false;
				if (!lib.translate[skill + '_info']) return false;
				if (!lib.translate[skill + '_info'].length) return false;
				if (!lib.skill[skill]) return false;
				if (lib.skill[skill].sub) return false;
				if (lib.skill[skill].charlotte) return false;
				if (lib.skill[skill].nopop) return false;
				//if(player&&player.hasSkill(skill,false,false,false)) return false;
				return !func || func(skill, player, target);
			};
			lib.element.player.xjzh_chooseSkill = function (list) {
				var next = game.createEvent('xjzh_chooseSkill');
				next.player = this;
				next.list = list.slice(0);
				next.setContent('xjzh_chooseSkill');
				for (var i = 1; i < arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						next.prompt = arguments[i];
					}
					else if (typeof arguments[i] == 'function') {
						if (!next.func) next.func = arguments[i];
						else next.ai = arguments[i];
					}
					else if (typeof arguments[i] == 'number') {
						next.selectButton = [arguments[i], arguments[i]];
					}
					else if (get.itemtype(arguments[i]) == 'select') {
						next.selectButton = arguments[i];
					}
					else if (typeof arguments[i] == 'boolean') {
						next.forced = arguments[i];
					}
					else if (get.itemtype(arguments[i]) == 'player') {
						next.target = arguments[i];
					};
				};
				if (!next.selectButton) {
					next.selectButton = [1, 1];
				};
				if (!next.func) {
					next.func = function () { return true };
				};
				if (!next.target) {
					next.target = next.player;
				};
				if (typeof next.forced != 'boolean') {
					next.forced = true;
				};
				return next;
			};
			lib.element.content.xjzh_chooseSkill = function () {
				"step 0"
				event.list = event.list.filter(function (i) {
					return get.xjzh_filterGainSkill(i, event.func, player, target);
				});
				if (!event.list.length) {
					event.finish();
					event.result = { bool: false };
					game.log('没有可以正常挑选的技能！')
					return;
				};
				//-------------------------------------------------------------///
				var range = get.select(event.selectButton);
				event.selectButton = range;
				if (event.list.length < event.selectButton[0]) {
					event.selectButton[0] = event.list.length;
				};
				if (!event.prompt) {
					var str = '请选择获得';
					if (range[0] == range[1]) str += get.cnNumber(range[0]);
					else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
					else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
					str += '项技能';
					event.prompt = str;
				};
				var list = [];
				for (var skill of event.list) {
					list.push([
						skill,
						'<div class="popup text" style="width:calc(100% - 10px);display:inline-block"><div class="skill">【' + get.translation(skill) + '】</div><div>' + lib.translate[skill + '_info'] + '</div></div>',
					]);
				};
				var next = player.chooseButton([
					event.prompt,
					[list, 'textbutton'],
				]);
				next.set('forced', event.forced);
				next.set('target', target);
				next.set('selectButton', event.selectButton);
				next.set('filterButton', function (button) { return true });
				next.set('ai', event.ai || function (button) {
					var player = _status.event.player;
					var target = _status.event.target;
					if (target.hasSkill(button.link, false, false, false)) return 0;
					if (player != target) {
						var att = get.attitude(player, target) > 0 ? 1 : -1;
						_status.event.skillRankPlayer = target;
						return (get.skillRank(button.link) * att) - 0.1;
					};
					return get.skillRank(button.link) + 0.1;
				});
				"step 1"
				if (result.bool && result.links && result.links.length) {
					event.result = { bool: true, skills: result.links };
					if (event.callback) {
						event.callback(result, player, target);//这里可以自定义获得的是否临时技能//
					}
					else {
						for (var i = 0; i < result.links.length; i++) {
							target.addSkillLog(result.links[i]);
						};
					};
				} else {
					event.result = { bool: false };
				};
			};
			///以上函数借鉴自《金庸群侠传》
			//小写字母转大写字母
			game.xjzh_toUpperCase=function (str) {
				str=str.toUpperCase();
				return str;
			};
			//大写字母转小写字母
			game.xjzh_toLowerCase=function (str) {
				str=str.toLowerCase();
				return str;
			};
			//判断当前设备类型
			get.xjzh_device=function(){
				var userAgent=navigator.userAgent,platform=navigator.platform,arg=null;
				var Agents=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod");
				for(var i=0;i<Agents.length;i++){
					if(userAgent.indexOf(Agents[i])>0){
						arg=Agents[i];
						break;
					}
				}
				if(arg==null){
					if(platform.indexOf("Win")==0){
						arg="windows";
					}
					else if(platform.indexOf("Mac")){
						arg="Mac";
					}
					else{
						return null;
					}
				}
				return game.xjzh_toLowerCase(arg);
			};
			//判断当前设备浏览器内核
			get.xjzh_kernel=function(){
				var u=navigator.userAgent,arg=null;
				var object={
					trident:u.indexOf('Trident')>-1, //IE内核
					presto:u.indexOf('Presto')>-1, //opera内核
					webKit:u.indexOf('AppleWebKit')>-1, //苹果、谷歌内核
					gecko:u.indexOf('Gecko') >-1&&u.indexOf('KHTML') == -1, //火狐内核
					mobile:!!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android:u.indexOf('Android')>-1||u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone:u.indexOf('iPhone')>-1 , //是否为iPhone或者QQHD浏览器
					iPad:u.indexOf('iPad')>-1, //是否iPad
					webApp:u.indexOf('Safari')==-1, //是否web应该程序，没有头部与底部
					weixin:u.indexOf('MicroMessenger')>-1, //是否微信
					qq:u.match(/\sQQ/i)==" qq" //是否QQ
				};
				for(var i in object){
					if(object[i]){
						arg=i.toString();
						break;
					}
				}
				if(arg==null) return null;
				return game.xjzh_toLowerCase(arg);
			};
			//获得临时技能显示记录
			lib.element.player.addTempSkillLog=function(skill,arg){
				if(!this.skills.includes(skill)){
					this.popup(skill);
					game.log(this,'获得了技能','#g【'+get.translation(skill)+'】');
				}
				if(arg){
					this.addTempSkill(skill,arg);
				}else{
					this.addTempSkill(skill)
				}
			};    /**
			* 判断指定玩家是否为仙家之魂武将
			*
			* 本函数通过检查玩家对象的属性来确定该玩家是否为特定身份。
			* 它遍历函数接收到的所有参数，寻找玩家对象。然后，它检查玩家对象是否满足特定身份的条件。
			* 这个条件是玩家对象的名字在特定数组中，并且该名字对应的字符有特定的标识。
			*
			* @returns {boolean} 如果玩家是仙家之魂武将，则返回true；否则返回false。
			*/
		    get.isXHwujiang=function(...arg){
				// 初始化变量，用于存储玩家对象和玩家名称列表
				let player, str, list = [];

				// 遍历函数的所有参数，寻找玩家对象
				// 遍历函数接收的所有参数
				for(let argument of arg) {
					// 如果参数是玩家对象，则将其赋值给player变量
					if (get.itemtype(argument) == "player") player = argument;
				}

				// 如果没有找到玩家对象，则返回false
				if(!player) return false;

				// 获取玩家对象的名字列表
				let names=get.nameList(player);
				// 如果玩家名字列表为空或不是数组，则返回false
				if(!names.length||!Array.isArray(names)) return false;

				// 检查玩家名字列表中是否有名字满足特定条件（即对应的角色有特定的死亡音频标识）
				return names.some(item=>{
					if(!lib.character[item]) return false;
					if(!lib.character[item][4]) return false;
					return lib.character[item][4].includes('xjzh_die_audio');
		   		})?true:false;
		   };
			//判断字符串是否含有中文
			get.xjzh_checkChinese=function(str){
				let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				if(reg.test(str)) return true;
				return false;
			};
			//判断字符串是否全部是中文
			get.xjzh_checkChinese=function(str){
				let reg=/^[\u4E00-\u9FA5]+$/;
				if(!reg.test(str)) return false;
				return true ;
			};
			//增益buff
			lib.xjzh_Buff=[
				"criticalstrikes"
			],
			//减益buff
			lib.xjzh_Debuff=[
				"binghuan",
				"gandian",
				"raoshao",
				"bingdong",
				"mumang",
				"yishang",
				"jiansu",
				"dingshen"
			],
			//获取指定参数的武将牌
			game.xjzh_wujiangpai=function(){
                let list=[],name,num,nodead;
				for(const argument of arguments){
					if(typeof argument=="string"||Array.isArray(argument)) name=argument;
					else if(typeof argument=="number") num=argument;
                    else if(typeof argument=="boolean") nodead=argument;
				}
				if(Array.isArray(name)){
					for(let target of name){
						list.addArray(game.xjzh_wujiangpai(target,num));
					}
				}
				for(let i in lib.character){
					if(!lib.character[i][3]) continue;
					if(lib.filter.characterDisabled2(i)||lib.filter.characterDisabled(i)) continue;
					if(!name){
						list.push(i);
						continue;
					}
					if(get.xjzh_checkChinese(name)){
						if(get.translation(i).includes(get.translation(name))) list.push(i);
					}else{
						if(i.includes(name)) list.push(i);
					}
				}
                if(nodead){
                    let players=game.players.concat(game.dead);
                    for(let i=0;i<players.length;i++){
                        list.remove(players[i].name);
                        list.remove(players[i].name1);
                        list.remove(players[i].name2);
                    }
                }
				if(!num) return list;
				return list.randomGets(num);
			};
			/**
			 * nameList用于检查传入的参数中是否包含指定的玩家名称。
			 * 如果未指定玩家名称，则返回所有玩家名称的列表。
			 *
			 * @async
			 * @returns {Array|boolean} 如果未指定特定字符串，则返回玩家名称列表；
			 * 如果指定了特定字符串，并且列表中存在该字符串，则返回true；否则返回false。
			 */
			get.nameList=function(...arg){
				let player, str, list = [];

				// 遍历函数接收的所有参数
				for(let argument of arg) {
					// 如果参数是玩家对象，则将其赋值给player变量
					if (get.itemtype(argument) == "player") player = argument;
					// 如果参数是字符串，则将其赋值给str变量
					else if (typeof argument == "string") str = argument;
				}

				// 如果没有player或指定字符串，直接返回玩家名称列表
				if(!player) return list;
				// 将玩家的名称添加到列表中，如果存在多个名称
				if (player.name) list.push(player.name);
				if (player.name1) list.push(player.name1);
				if (player.name2) list.push(player.name2);
				if (!str) return list;
				// 如果指定了特定字符串，检查列表中是否包含该字符串
				// 如果包含，则返回true；否则返回false
				return list.some(name => name.startsWith(str)) ? true : false;
			};
			//挑战模式切换随从
			game.changeBossFellow=function(name,player){
				if(!player){
					var player=game.filterPlayer2(function(current){
						return current.identity=="zhong";
					});
					for(var i of player){
						game.changeBossFellow(name,i);
					}
				}else{
					player.delete();
					game.players.remove(player);
					game.dead.remove(player);
					game.addBossFellow2(player.getState().position,name,0,4);
				}
			},
			//挑战模式添加随从
			game.addBossFellow2=function(position,name,num,num2){
				var fellow=game.addFellow(position,name,'zoominanim');
				if(num==undefined||num==null) num=4;
				if(num2){
					fellow.hp=num2
					fellow.maxHp=num2;
					fellow.update();
				}
				if(num>0) fellow.directgain(get.cards(num));
				fellow.side=true;
				fellow.identity='zhong';
				fellow.setIdentity('zhong');
				game.addVideo('setIdentity',fellow,'zhong');
				return fellow;
			};
			//替换牌堆的牌为另一种牌
			game.xjzh_replaceCard=function(oldCard,newCard){
				//先替换牌堆的牌
				var cards=Array.from(ui.cardPile.childNodes);
				for(var i=0;i<cards.length;i++){
					var card=cards[i];
					if(card.name==oldCard){
						game.cardsGotoSpecial(card);
						ui.cardPile.insertBefore(game.createCard2(newCard,get.suit(card),get.number(card)),ui.cardPile.childNodes[i]);
					}
				}
				//将玩家的牌替换
				var targets=game.filterPlayer(function(current){
					return current.countCards('hej',function(cardx){
						return cardx.name==oldCard;
					});
				});
				if(targets.length){
					for(var player of targets){
						var cards3=player.getCards('hej',function(cardx){
							return cardx.name==oldCard;
						});
						var list=[]
						for(var i of cards3){
							var cardx=game.createCard2(newCard,get.suit(i),get.number(i));
							list.push(cardx);
						}
						player.discard(cards3)._triggered=null;
						player.gain(list,'giveAuto',false)._triggered=null;
					}
				}
				//将弃牌堆的牌替换
				var cards2=Array.from(ui.discardPile.childNodes);
				for(var i=0;i<cards2.length;i++){
					var card=cards2[i];
					if(card.name==oldCard){
						game.cardsGotoSpecial(card);
						game.cardsDiscard(game.createCard2(newCard,get.suit(card),get.number(card)))
					}
				}
			};
			//暴击相关函数，参数分别为造成暴击的角色、暴击前的伤害数值、暴击伤害加成、暴击伤害额外加成、是否不受暴击几率影响
			game.xjzh_Criticalstrike=function(player,num,num2,num3,arg){
				"step 0"
				if(arg&&arg==true){
					var numx=1;
				}
				else if(!arg||arg==null||typeof arg!="boolean"){
					if(player.storage.xjzh_buff_criticalstrike){
						var numx=player.storage.xjzh_buff_criticalstrike/100;
					}else{
						return;
					}
				}
				_status.event.criticalstrike=false;
				if(!num2||num2==null) num2=player.storage.xjzh_buff_criticalstrikeDamage?Math.ceil(player.storage.xjzh_buff_criticalstrikeDamage):2;
				if(!num3||num3==null) num3=0
				if(Math.random()<=numx){
					player.addTempSkill("unequip","damageAfter");
					var trigger=_status.event.getTrigger();
					num=Math.floor((num*num2)+num3);
					trigger.num=num;
					_status.event.criticalstrike=true;
					game.log(player,"的伤害触发了","#y"+"暴击");
				}else{
					return;
				}
				"step 1"
				var next=game.createEvent('xjzhCriticalstrike');
				next.player=player;
				next.num=num
				next.setContent(function(){
					event.trigger('xjzhCriticalstrike');
				});
			};
			//判断标记是否为唯一最多
			lib.element.player.isMaxMark=function(name,equal){
				var marks=this.countMark(name);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isOut()||game.players[i]==this) continue;
					if(equal){
						if(game.players[i].countMark(name)>=marks) return false;
					}
					else{
						if(game.players[i].countMark(name)>marks) return false;
					}
				}
				return true;
			};
			//判断标记是否为唯一最少
			lib.element.player.isMinMark=function(name,equal){
				var marks=this.countMark(name);
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].isOut()||game.players[i]==this) continue;
					if(equal){
						if(game.players[i].countMark(name)<=marks) return false;
					}
					else{
						if(game.players[i].countMark(name)<marks) return false;
					}
				}
				return true;
			};
			//判断是否被控制
			get.xjzh_deEffect=function(player){
				if(player.countCards('j',card=>card.name!="jydiy_yungongliaoshang")>0) return true;
				if(player.isTurnedOver()) return true;
				if(player.isLinked()) return true;
				if(player.countDisabled()>=1) return true;
				if(get.xjzhBUFFList(player,(player,item)=>lib.xjzh_Debuff.includes(item)).length>0) return true;
				return false;
			};
			//获取其有几种控制效果
			get.xjzh_deEffect2=function(player){
				var num=0;
				num+=player.countCards('j',card=>card.name!="jydiy_yungongliaoshang");
				if(player.isTurnedOver()) num++;
				if(player.isLinked()) num++;
				num+=player.countDisabled();
				num+=get.xjzhBUFFList(player,(player,item)=>lib.xjzh_Debuff.includes(item)).length;
				return num;
			};
			//获取装备子类型
			get.subtype2=function(obj,player){
				if(typeof obj=='string') obj={name:obj};
				if(typeof obj!='object') return;
				var name=get.name(obj,player);
				if(!lib.card[name]) return;
				return lib.card[name].subtype2;
			};
			//简单的灵柩唤醒特效
			lib.element.player.$zhaohuan=function(){
				var that=this
				var name=that.name
				that.classList.add('zhaohuan');
				that.node.name.innerHTML='唤醒◈'+get.translation(name);
			};
			//清除技能
			lib.element.player.clearSkills2=function(all){
				var list=[];
				var exclude=[];
				for(var i=0;i<arguments.length;i++){
					exclude.push(arguments[i]);
				}
				for(i=0;i<this.skills.length;i++){
					if(!exclude.includes(this.skills[i])){
						list.push(this.skills[i]);
					}
				}
				if(all){
					for(var i in this.additionalSkills){
						this.removeAdditionalSkill(i);
					}
				}
				for(var i of list){
					var info=lib.skill[i]
					this.unmarkSkill(i);
					game.broadcastAll(function(player,i){
						player.skills.remove(i);
						player.hiddenSkills.remove(i);
					},
					this,i);
					this.checkConflict(i);
					delete this.tempSkills[i];
					if(info){
						if(info.onremove){
							if(typeof info.onremove=='function'){
								info.onremove(this,i);
							}
							else if(typeof info.onremove=='string'){
								if(info.onremove=='storage'){
									delete this.storage[i];
								}
								else{
									var cards=this.storage[i];
									if(get.itemtype(cards)=='card'){
										cards=[cards];
									}
									if(get.itemtype(cards)=='cards'){
										if(this.onremove=='discard'){
											this.$throw(cards);
										}
										if(this.onremove=='discard'||this.onremove=='lose'){
											game.cardsDiscard(cards);
											delete this.storage[i];
										}
									}
								}
							}
							else if(Array.isArray(info.onremove)){
								for(var i=0;i<info.onremove.length;i++){
									delete this.storage[info.onremove[i]];
								}
							}
							else if(info.onremove===true){
								delete this.storage[skill];
							}
						}
						this.removeSkillTrigger(i);
						if(!info.keepSkill){
							this.removeAdditionalSkill(i);
						}
					}
					this.enableSkill(i+'_awake');
				}
				if(this.hujia>0) this.changeHujia(-this.hujia)._triggered=null;
				if(get.xjzh_deEffect(this)){
					if(this.isLinked()) this.link(false)._triggered=null;
					if(this.isTurnedOver()) this.turnOver(false)._triggered=null;
					if(this.countCards('j')) this.discard(this.getCards('j'))._triggered=null;
					if(this.countDisabled()>0){
						for(var i=1;i<6;i++){
							if(this.isDisabled(i)) this.enableEquip(i)._triggered=null;
						}
					}
				}
				this.checkConflict();
				this.checkMarks();
				return list;
			};
			//选项效果
			game.xjzh_createDailog=function(){
				var obj=ui.create.div('.save.xjzh_save',ui.window);
				var str,list,click,bool;
				for(var i=0;i<arguments.length;i++){
					if(Array.isArray(arguments[i])){
						list=arguments[i];
					}
					else if(typeof arguments[i]=='function'){
						click=arguments[i];
					}
					else if(typeof(arguments[i])=='boolean'){
						bool=arguments[i];
					}
					else if(typeof arguments[i]=='string'){
						str=arguments[i];
					}
				}
				if(bool!==false){
					var img=document.createElement('img');
					img.setAttribute('src',lib.assetURL+'extension/仙家之魂/css/images/lamasi/xjzh_diablo_lamasi.png');
					img.className='xjzh_save2';
					obj.appendChild(img);
				}
				var dialog=ui.create.div('.xjzh_dialog',obj);
				dialog.innerHTML=str;
				var select=ui.create.div('.xjzh_select',obj);
				if(!list) list=['确定'];
				for(var i=0;i<list.length;i++){
					var node=ui.create.div('.xjzh_select',select);
					node.onclick=function(){
						ui.window.removeChild(obj);
						if(typeof click=='function') click(this.link);
					}
					node.link=list[i];
					node.innerHTML=get.translation(list[i]);
				}
				ui.window.appendChild(obj);
			};
			get.xjzh_isMaxMp=function(player){
				if(!player||get.itemtype(player)!="player"){
					console.error("Player不存在");
        			return false;
				}
				return typeof player.xjzhmaxMp === 'number' && typeof player.xjzhMp === 'number' && player.xjzhmaxMp === player.xjzhMp;
			};
			get.xjzh_consumeMp=function(player){
				if(!player||get.itemtype(player)!="player"){
					console.error("Player不存在");
        			return NaN;
				}
				if (typeof player.xjzhmaxMp !== 'number' || typeof player.xjzhMp !== 'number') {
					return NaN;
				}
				return player.xjzhmaxMp-player.xjzhMp;
			};
			//修改魔力
			lib.element.player.changexjzhMp=function(num){
				let next=game.createEvent('changexjzhMp',false);
				next.num=num;
				next.player=this;
				next.setContent("changexjzhMp");
				return next;
			};
			lib.element.content.changexjzhMp=function(){
				"step 0"
				event.trigger('changexjzhMp');
				"step 1"
				if(num==0||!player.xjzhmaxMp) return;
				let str=`${get.translation(player)}${num>0?'回复':'消耗'}了${num>get.xjzh_consumeMp(player)?get.xjzh_consumeMp(player):Math.abs(num)}点能量`;
				if(game.roundNumber!=0) game.log(player,str);
				player.xjzhMp+=num;
				if(num>0&&get.xjzh_consumeMp(player)>0){
					player.$recover();
					game.playAudio('effect','recover');
				}
				if(isNaN(player.xjzhMp)||player.xjzhMp<0) player.xjzhMp=0;
				if(player.xjzhMp>player.xjzhmaxMp) player.xjzhMp=player.xjzhmaxMp;
				player.xjzhshowMp(player.xjzhMp,player.xjzhmaxMp);
			};
			//修改魔力上限
			lib.element.player.changexjzhmaxMp=function(num){
				let next=game.createEvent('changexjzhmaxMp',false);
				next.num=num;
				next.player=this;
				next.setContent("changexjzhmaxMp");
				return next;
			};
			lib.element.content.changexjzhmaxMp=function(){
				"step 0"
				event.trigger('changexjzhmaxMp');
				"step 1"
				if(num==0) return;
				let str=`${get.translation(player)}${num>0?'增加':'减少'}了${num>0?num:Math.abs(num)}点能量上限`;
				if(game.roundNumber!=0) game.log(player,str);
				if(!player.xjzhmaxMp) player.xjzhmaxMp=0;
				if(!player.xjzhMp) player.xjzhMp=0;
				player.xjzhmaxMp+=num;
				if(num>0){
					player.$recover();
					game.playAudio('effect','recover');
				}
				if(isNaN(player.xjzhmaxMp)||player.xjzhmaxMp<0) player.xjzhmaxMp=1;
				if(player.xjzhMp>player.xjzhmaxMp) player.xjzhMp=player.xjzhmaxMp;
				player.xjzhshowMp(player.xjzhMp,player.xjzhmaxMp);
			};
			lib.element.player.xjzhshowMp = function(arg, arg2) {
				// 参数验证
				if (typeof arg !== 'number' || typeof arg2 !== 'number' || arg < 0 || arg2 <= 0) {
					console.error('参数必须是数字且必须是正数');
					return;
				}

				// 确保 mp 容器存在
				if (!this.node.xjzhmp) {
					this.node.xjzhmp = ui.create.div(".mp", this);
				}

				// 获取或创建 .mpdiv 元素，并始终设置圆角样式
				let mpdiv = this.node.xjzhmp.querySelector('.mpdiv') || ui.create.div(".mpdiv", this.node.xjzhmp);
				mpdiv.style.borderRadius = "50px";

				// 更新文本内容
				let mptext = mpdiv.querySelector('.mptext') || document.createElement('span');
				mptext.className = 'mptext';
				mptext.textContent = arg + "/" + arg2;
				if (!mpdiv.querySelector('.mptext')) {
					mpdiv.appendChild(mptext);
				}

				function animateWidthChange(element, targetWidth, duration) {
					let startWidth = parseFloat(element.style.width);
					let startTime = performance.now();
					let currentWidth = startWidth;

					function easeInOutCubic(t) {
						return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
					}

					function step(timestamp) {
						let timeElapsed = timestamp - startTime;
						let progress = timeElapsed / duration;

						// 使用easeInOutCubic函数实现缓入缓出效果
						let easingProgress = easeInOutCubic(progress);

						// 计算当前宽度，确保缓入缓出变化
						let currentWidth = startWidth + easingProgress * (targetWidth - startWidth);

						element.style.width = currentWidth + "%";

						// 如果动画还在进行中，则继续请求下一帧
						if (timeElapsed < duration) {
							requestAnimationFrame(step);
						} else {
							// 确保动画结束时宽度精确为目标值
							element.style.width = targetWidth + "%";
						}
					}

					requestAnimationFrame(step);
				}

				// 计算剩余能量百分比
				let remainingPercentage = arg / arg2;

				animateWidthChange(mpdiv, remainingPercentage * 100, 1500);

				// 设置剩余能量的宽度，同时确保mpdiv有正确的宽度
				mpdiv.style.width = remainingPercentage * 100 + "%";

				// 添加边框样式处理
				if (remainingPercentage === 1) {
					// 能量条满时，应用黄色闪光边框样式
					mpdiv.classList.add("xjzh_full-flash");
				} else {
					// 能量条未满时，移除任何可能存在的特殊边框样式，假设默认边框样式已经定义好
					mpdiv.classList.remove("xjzh_full-flash");
				}
				// 处理失去能量部分为白色底色
				let lostEnergyDiv = mpdiv.querySelector('.lost-energy');
				let lostEnergyWidth = (1 - remainingPercentage) * 100;

				if (lostEnergyWidth > 0) {
					if (!lostEnergyDiv) {
						// 创建并设置样式，注意调整lostEnergyDiv的样式以露出mpdiv的左圆角
						lostEnergyDiv = document.createElement('div');
						lostEnergyDiv.className = 'lost-energy';
						lostEnergyDiv.style.width = lostEnergyWidth + "%";
						lostEnergyDiv.style.backgroundColor = "#fff";
						// 通过负margin-left让lostEnergyDiv不遮挡mpdiv的左圆角
						lostEnergyDiv.style.marginLeft = "-1px"; // 假设1px是边框宽度或需要调整的值
						mpdiv.insertBefore(lostEnergyDiv, mpdiv.firstChild);
					} else {
						// 更新宽度
						lostEnergyDiv.style.width = lostEnergyWidth + "%";
					}
				} else if (lostEnergyDiv) {
					mpdiv.removeChild(lostEnergyDiv);
				}

			};

			/**
			 * 移除播放器中的MP容器。
			 *
			 * 该函数用于彻底移除播放器界面中的MP模块容器，包括容器内的所有元素。
			 * 这是对播放器界面进行动态调整的重要功能，可以用于在不需要MP模块时清理界面。
			 *
			 * @function
			 * @memberOf lib.element.player
			 * @name xjzhremoveMp
			 * @returns {undefined}
			 */
			lib.element.player.xjzhremoveMp = function() {
				// 获取MP容器节点
				let mpNode = this.node.xjzhmp;

				// 如果MP容器存在
				if (mpNode) {
					// 从父节点中移除MP容器
					// 移除mp容器以及其内部的所有子元素（包括进度条、文本等）
					mpNode.parentNode.removeChild(mpNode);

					// 删除播放器实例中与MP容器相关的属性
					delete this.xjzhMp;
					delete this.xjzhmaxMp;
					// 清除节点对象中的MP容器引用
					// 清空对mp容器的引用
					delete this.node.xjzhmp;
				}
			};

			//地下城与勇士角色库
			lib.xjzh_dnf_character=[
				"xjzh_dnf_jianshen",
				"xjzh_dnf_shengqi",
			],
			//判断武将是否为地下城与勇士
			get.dnfCharacter=function(player){
				var list=lib.xjzh_dnf_character.slice(0);
				var list2=[]
				if(player.name) list2.push(player.name);
				if(player.name1) list2.push(player.name1);
				if(player.name2) list2.push(player.name2);
				var bool=false;
				for(var i=0;i<list2.length;i++){
					if(list.some(current=>current.indexOf(i)==0)){
						bool=true;
						break;
					}
				}
				if(bool) return true;
				return false;
			},
			//检索卡牌
			//代码借鉴自《金庸群侠传》
			get.randomCard = function(name,create) {
				var cards=get.randomCards(1,name,create);
				if (cards.length) return cards[0];
				return null;
			};
			get.randomCardsNum=function(name,create) {
				var cards=get.randomCards(999,name,create);
				return cards.length;
			};
			get.randomCards = function(num, name, create) {
				///name 要求为函数///
				var num = (typeof num == 'number') ? num : 1;
				if(typeof name!='function'){
					alert('get.randomCards:请检查name参数');
					return [];
				}
				if (num <= 0) {
				alert("巧妇难为无米之炊!") };
				var cards,list=[];
				if(create!='discardPile'){
					var cardPile=Array.from(ui.cardPile.childNodes);
					list=list.concat(cardPile);
				}
				if(create!='cardPile'){
					var discardPile=Array.from(ui.discardPile.childNodes);
					list=list.concat(discardPile);
				}
				cards=list.filter(name);
				if(!cards.length) return [];
				if(num>=cards.length) return cards;
				return cards.randomGets(num);
			};
			//辅助触发
			//代码借鉴《金庸群侠传》
			get.sourceSkill=function(skill,player){
				//技能的子技能是个的问题
				if(!lib.skill[skill]) return false;
				if (get.info(skill).sourceSkill){
					skill=get.info(skill).sourceSkill;
				};
				var skills=player.getSkills(null,false,false);
				var skills2=skills.slice(0);
				game.expandSkills(skills2);
				var es=player.getSkills('e');
				var es2=skills.slice(0);
				game.expandSkills(es2);
				if(skills.includes(skill)){
					if(!lib.translate[skill]) return false;
					if(!lib.translate[skill+'_info']) return false;
					if(!lib.translate[skill+'_info'].length) return false;
					if(!lib.skill[skill]) return false;
					if(lib.skill[skill].sub) return false;
					if(lib.skill[skill].charlotte) return false;
					if(lib.skill[skill].nopop) return false;
					if(lib.skill[skill].cardSkill) return false;
					//排除特殊情况获得的卡牌技能
					if(lib.skill[skill].equipSkill) return false;
					//排除特殊情况获得的装备技能
					return {
					playerSkill:true,skill:skill,skills:[skill]};
				}
				else if(skills2.includes(skill)){
					for (var i of skills) {
						var info=get.info(i);
						if (info&&info.group){
							var group=info.group;
							if(typeof info.group=='string'){
								group=[group];
							}
							if(group.includes(skill)){
								if(!lib.translate[i]) return false;
								if(!lib.translate[i+'_info']) return false;
								if(!lib.translate[i+'_info'].length) return false;
								if(!lib.skill[i]) return false;
								if(lib.skill[i].sub) return false;
								if(lib.skill[i].charlotte) return false;
								if(lib.skill[i].nopop) return false;
								if(lib.skill[i].cardSkill) return false;
								//排除特殊情况获得的卡牌技能
								if(lib.skill[i].equipSkill) return false;
								//排除特殊情况获得的装备技能
								return {
								playerSkill:true,skill:i,skills:[i]};
							};
						};
					};
					return false;
				}
				else if(es.includes(skill)){
					var equips=player.getCards('e');
					for (var equip of equips){
						var info=get.info(equip);
						if(info&&info.skills){
							if(info.skills.includes(skill)){
								return {
								equipSkill:true,skill:skill,skills:info.skills.slice(0),card:equip};
							};
						};
					};
					return false;
				}
				else if(es2.includes(skill)){
					for (var i of es){
						var info=get.info(i);
						if(info&&info.group){
							var group=info.group;
							if(typeof info.group=='string'){
								group=[group];
							};
							if(group.includes(skill)){
								var equips=player.getCards('e');
								for (var equip of equips){
									var info2=get.info(equip);
									if(info2&&info2.skills){
										if(info2.skills.includes(i)){
											return {
											equipSkill:true,skill:i,skills:info2.skills.slice(0),card:equip};
										};
									};
								};
							};
						};
					};
				};
				return false;
			};
			lib.element.player.$logSkill=function(arg,target){
				var next=game.createEvent('$logSkill',false);
				next.player=this;
				next.skillTag=arg;
				next.skill=arg.skill;
				var item=get.itemtype(target);
				if(item=='players'){
					next.targets=target;
				}
				else if(item=='player'){
					next.targets=[target];
				};
				next.setContent(function(){
					event.trigger('$logSkill');
				});
				return next;
			};
			lib.skill._$logSkill2 = {
				trigger:{player:'useSkillAfter'},
				direct: true,
				forced: true,
				priority: 99779,
				popup: false,
				filter:function(event, player, name) {
					var info = get.info(event.skill);
					return !info.direct;
				},
				content: function() {
					var targets = (trigger.targets && trigger.targets.length ? trigger.targets : [player]);
					var skill = get.sourceSkill(trigger.skill, player);
					if (skill) player.$logSkill(skill, targets);
				},
			};
			lib.skill._$logSkill = {
				trigger: {
					global: ['gameStart', 'gameDrawBefore'],
					//player:['phaseBefore'],
				},
				direct: true,
				forced: true,
				priority: 99779,
				popup: false,
				filter:function(event, player, name) {
					if (!player._hookTrigger || !player._hookTrigger.includes('_$logSkill')) return true;
					return false;
				},
				content: function(){
					if (!player._hookTrigger) player._hookTrigger = [];
					player._hookTrigger.add('_$logSkill');
				},
				hookTrigger: {
					after:function(event, player, triggername) {
						var info = get.info(event.skill);
						if (info&&info.popup&&!info.direct) {
							var skill = get.sourceSkill(event.skill, player);
							if (skill) player.$logSkill(skill, player);
						};
						return false;
					},
					log:function(player, name, targets) {
						var skill = get.sourceSkill(name, player);
						if (skill) player.$logSkill(skill,targets||player);
					},
				},
			};
			//区间内取随机整数，返回数组类型数字
			get.xjzh_rands=function(x,y,z){
				if(typeof z!="number") z=1;
				if(typeof x!="number") x=1;
				if(typeof y!="number") y=x;
				if(y==1) return Array.of(1);
				if(z>y) z=y;
				var list=[],list2=[];
				for(var i=x;i<=y;i++) list.push(i);
				/*list.sort((a,b)=>{
					return a-b
				});*/
				for(var i=0;i<z;i++){
					var num=list.randomGet();
					list2.push(num);
					list.remove(num);
				}
				return list2;
			};
			//判断角色势力是否为最多之一
			get.maxGroupx=function(player,num){
				var id=player.group
				var num=game.countPlayer(function(current){
					return current.group==id
				});
				var targets=game.filterPlayer(function(current){
					return current.group!=id
				});
				var list=[]
				for(var i=0;i<targets.length;i++){
					if(lib.group.includes(targets[i].group)) list.add(targets[i].group);
				}
				if(!list.length) return null;
				for(var i=0;i<list.length;i++){
					var num2=game.countPlayer(function(current){
						return current.group==list[i]
					});
					if(num<=num2) return false;
				}
				return true;
			};
			//增加/更换/移除副将
			//代码借鉴自《金庸群侠传》
			lib.element.player.xjzh_replaceFujiang=function(name2){
				var player=this;
				player.reinit(player.name2,name2,[player.hp,player.maxHp]);
			};
			lib.element.player.xjzh_addFujiang=function(name2){
				var player=this;
				player.name2=name2
				player.classList.add('fullskin2');
				player.reinit(player.name2,name2,[player.hp,player.maxHp]);
				player.node.avatar2.show();
				player.node.count.classList.add('p2');
				player.node.name2.show();
			};
			lib.element.player.xjzh_removeFujiang=function(name2){
				var player=this;
				player.reinit(player.name2,player.name2,[player.hp,player.maxHp]);
				delete player.name2;
				player.classList.remove('fullskin2');
				player.node.avatar2.hide();
				player.node.count.classList.remove('p2');
				player.node.name2.hide()
			};
			//检测获得/移除标记
			lib.element.content.removeMark=function(){
				"step 0"
				if(event.removeMarkTrigger!==false) event.trigger("removeMark");
				"step 1"
				var marks=event.markname
				var log=event.log
				var player=event.player
				var num=event.num
				if(typeof num!='number'||!num) num=1;
				if(typeof player.storage[marks]!='number'||!player.storage[marks]) return;
				if(num>player.storage[marks]) num=player.storage[marks];
				player.storage[marks]-=num;
				if(log!==false){
					var str=false;
					var info=get.info(marks);
					if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
					else str=lib.translate[marks];
					if(str) game.log(player,'移去了',get.cnNumber(num),'个','#g【'+str+'】');
				}
				player.syncStorage(marks);
				player[(player.storage[marks]||(lib.skill[marks]&&lib.skill[marks].mark))?'markSkill':'unmarkSkill'](marks);
			};
			lib.element.player.removeMark=function(i,num,log){
				var next=game.createEvent('removeMark');
				next.player=this;
				next.num=num;
				next.markname=i;
				next.log=log;
				next.setContent('removeMark');
				return next;
			};
			lib.element.content.addMark=function(){
				"step 0"
				if(event.addMarkTrigger!==false) event.trigger("addMark");
				"step 1"
				var marks=event.markname
				var log=event.log
				//var player=event.player
				var num=event.num
				if(typeof num!='number'||!num) num=1;
				if(typeof player.storage[marks]!='number') player.storage[marks]=0;
				player.storage[marks]+=num;
				if(log!==false){
					var str=false;
					var info=get.info(marks);
					if(info&&info.intro&&(info.intro.name||info.intro.name2)) str=info.intro.name2||info.intro.name;
					else str=lib.translate[marks];
					if(str) game.log(player,'获得了',get.cnNumber(num),'个','#g【'+str+'】');
				}
				player.syncStorage(marks);
				player.markSkill(marks);
			};
			lib.element.player.addMark=function(i,num,log){
				var next=game.createEvent('addMark');
				next.player=this;
				next.num=num;
				next.markname=i;
				next.log=log
				next.setContent('addMark');
				return next;
			};
			//交换判定区
			lib.element.player.swapJudgeCards=function(target){
				var next=game.createEvent('swapJudgeCards');
				next.player=this;
				next.target=target;
				next.setContent('swapJudgeCards');
				return next;
			};
			lib.element.content.swapJudgeCards=function(){
				"step 0"
				game.log(player,'和',target,'交换了判定区中的牌')
				"step 1"
				var j0=player.getCards('j');
				var todis0=[];
				for(var i=0;i<j0.length;i++){
					if(player.storage._disableJudge) todis0.push(j0[i]);
				}
				player.discard(todis0);
				var j1=target.getCards('j');
				var todis1=[];
				for(var i=0;i<j1.length;i++){
					if(target.storage._disableJudge) todis1.push(j1[i]);
				}
				target.discard(todis1);
				"step 2"
				event.cards=[player.getCards('j'),target.getCards('j')];
				player.lose(event.cards[0],ui.ordering,'visible');
				target.lose(event.cards[1],ui.ordering,'visible');
				if(event.cards[0].length) player.$give(event.cards[0],target,false);
				if(event.cards[1].length) target.$give(event.cards[1],player,false);
				"step 3"
				for(var i=0;i<event.cards[1].length;i++){
					player.addJudge(event.cards[1][i]);
				}
				for(var i=0;i<event.cards[0].length;i++){
					target.addJudge(event.cards[0][i]);
				}
			};
			//交换体力值和体力上限
			lib.element.player.swapMaxHp=function(target,arg,arg2){
				var next=game.createEvent('swapMaxHp');
				if(arg&&arg===true) next.all=true;
				if(arg2&&arg2===true) next.forced=true;
				next.player=this;
				next.target=target;
				next.setContent('swapMaxHp');
				return next;
			};
			lib.element.content.swapMaxHp=function(){
				"step 0"
				event.func=function(player,target){
					var p1=player.maxHp;
					var t1=target.maxHp;
					[p1,t1]=[t1,p1];
					player.maxHp=p1;
					target.maxHp=t1;
				};
				event.func2=function(player,target){
					var p2=player.hp;
					var t2=target.hp;
					[p2,t2]=[t2,p2];
					player.hp=p2;
					target.hp=t2;
				}
				if(event.all){
					event.func(player,target);
					event.func2(player,target);
					game.log(player,'与',target,'交换了体力值和体力上限');
					return;
				}else{
					var controls=[];
					if(player.hp!=target.hp) controls.push('交换体力值');
					if(player.maxHp!=target.maxHp) controls.push('交换体力上限');
					if(controls.length==0){
						game.log(`${get.translation(player)}与${get.translation(target)}无需交换体力值或体力上限`);
						return;
					}
					if(!event.forced){
						controls.push('cancel2');
					}
					var prompt=`令${get.translation(player)}与${get.translation(target)}交换体力值或体力上限`;
					var choice;

					var p1=player.maxHp;
					var t1=target.maxHp;
					var p2=player.hp;
					var t2=target.hp;
					if(t1-p1<t2-p2||(p2<2&&t2>p2)){
						choice='交换体力值';
					}
					else{
						choice='交换体力上限';
					}

					var next=player.chooseControl(controls)
					next.set('prompt',prompt);
					next.set('ai',function(){
						return _status.event.choice;
					});
					next.set('choice',choice);
				}
				'step 1'
				if(result.control&&result.control!='cancel2'){
					if(result.control=='交换体力值'){
						event.func2(player,target);
					}else{
						event.func(player,target);
					}
					game.log(player,"与",target,"交换了",result.control=="交换体力值"?"体力值":"体力上限");
				}

				/*player.maxHp^=target.maxHp;
				target.maxHp^=player.maxHp
				player.maxHp^=target.maxHp;
				player.hp^=target.hp;
				target.hp^=player.hp;
				player.hp^=target.hp;*/

				"step 2"
				player.update();
				target.update();
			};

		},
		precontent:function (xjzh){
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


				/**
				 * 初始化武将包
				 * 该函数用于加载和初始化武将包，武将包是应用程序中包含特定功能或信息的可视化组件。
				 * 参数: 无
				 * 返回值: 无
				 */
				//导入武将包
				xjzhCharacterInit();
				/**
				 * 初始化卡片包
				 * 该函数用于加载和初始化卡片包，卡片包是应用程序中包含特定功能或信息的可视化组件。
				 * 参数: 无
				 * 返回值: 无
				 */
				//导入卡牌包
				xjzhCardPack();
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
							game.xjzh_playEffect("xjzh_skillEffect_whiteFlash",this);
						};
						//诸葛亮〖八阵〗
						lib.animate.skill["xjzh_sanguo_bazhen_2"]=function(name){
							game.xjzh_playEffect("xjzh_skillEffect_redFlash",this);
						};
						//黄忠〖烈弓〗
						/*lib.animate.skill["xjzh_sanguo_liegong"]=function(name){
							game.xjzh_playEffect('xjzh_skillEffect_gongjian',this);
						};*/
					};
                });

			};

		},
		help:{},
		config:{...xjzhConfig},
		package:{...xjzhPackage},
		files:{"character":[],"card":[],"skill":[]}
	}
})