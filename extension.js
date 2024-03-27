import { CHRskills as xjzhCHRskills } from './ext/modules/CHRskills/index.js';
import { xjzhVersions } from './ext/modules/version/index.js';
import { xjzhTitle } from './ext/modules/Title/index.js';
import { xjzh_updateURLS } from './ext/modules/update/updateURLS.js';
import './ext/modules/update/index.js';
import { lib } from '../../noname.js';
//还是有很多提示，消一下
Array.prototype.contains=Array.prototype.includes;
lib.xjzhTitle=xjzhTitle;

game.import("extension",function(lib,game,ui,get,ai,_status){
	return {
		name:"仙家之魂",
		editable:false,
		content:function (config,pack){
		    if(!config.enable) return false;

			var introduce={
				"xjzh_intro_zhongdu":{
					name:"中毒",
					info:"使用牌有每层20%几率失效且有几率受到1点无来源毒属性伤害",
				},
				"xjzh_intro_fumian":{
					name:"负面状态",
					info:"翻面、横置、判定区有牌、装备区被废除",
				},
				"xjzh_intro_mumang":{
					name:"目盲",
					info:"你使用牌有每层30%几率改为随机目标",
				},
				"xjzh_intro_yishang":{
					name:"易伤",
					info:"受到伤害有30%乘层数几率加层数点伤害",
				},
				"xjzh_intro_xuanyun":{
					name:"眩晕",
					info:"翻面",
				},
				"xjzh_intro_lingjiu":{
					name:"灵柩",
					info:"场上已阵亡的角色",
				},
				"xjzh_intro_huanxing":{
					name:"唤醒",
					info:"将一名已阵亡的角色唤醒为你选择的灵魂，不解放灵魂",
				},
				"xjzh_intro_jiefang":{
					name:"解放",
					info:"将死亡之书中收集的灵魂移除",
				},
				"xjzh_intro_bingdong":{
					name:'冰冻',
					info:'当你获得此buff时，弃置所有牌，然后直到此buff移除，你无法使用或打出牌',
				},
				"xjzh_intro_guanzhu":{
					name:'灌注',
					info:'令某张牌造成属性伤害',
				},
				"xjzh_intro_ranshao":{
					name:'燃烧',
					info:'基于你所受到的火焰伤害令你额外受到火焰伤害，每当buff衰减时，受到一点无来源火焰伤害',
				},
				"xjzh_intro_binghuan":{
					name:'冰缓',
					info:'出牌时间限定为10s，出牌等待时间提高50%',
				},
				"xjzh_intro_gandian":{
					name:'感电',
					info:'任意角色对拥有此效果的角色造成伤害有20%几率+1',
				},
				"xjzh_intro_zhouwei":{
					name:'周围',
					info:'攻击范围内的武将',
				},
				"xjzh_intro_baojiRan":{
					name:'暴击几率',
					info:'造成伤害有几率暴击',
				},
				"xjzh_intro_baoji":{
					name:'暴击',
					info:'造成伤害基于你的暴击伤害加成提高其受到的伤害，基础暴击伤害加成为100%，暴击伤害无视白银狮子等装备的伤害减免',
				},
				"xjzh_intro_baojiDamage":{
					name:'暴击伤害',
					info:'暴击时根据暴击伤害加成增加额外伤害，基础为100%',
				},
				"xjzh_intro_criticalstrike":{
					name:'暴击球',
					info:'每个暴击球为你提供+20%暴击几率',
				},
				"xjzh_intro_fanji":{
					name:"反击",
					info:"受到伤害或格挡时有几率对其使用一张杀",
				},
				"xjzh_intro_gedang":{
					name:"格挡",
					info:"你受到伤害前有几率免疫之，并回复等量体力",
				},
				"xjzh_intro_qianggu":{
					name:"强固",
					info:"当你的强固体力值不小于你的体力值时，你有20%几率防止伤害，强固的体力值不能超过体力上限。",
				},
				"xjzh_intro_maxGedang":{
					name:"格挡上限",
					info:"你最多能获得的格挡几率",
				},
				"xjzh_intro_gongji":{
					name:"物理攻击",
					info:"无属性伤害",
				},
				"xjzh_intro_fashu":{
					name:"法术攻击",
					info:"属性伤害",
				},
				"xjzh_intro_fujin":{
					name:"附近",
					info:"上家和下家",
				},
				"xjzh_intro_youjun":{
					name:"友军",
					info:"与你身份一致（国战改为势力一致）",
				},
				"xjzh_intro_jufeng":{
					name:"提速尾流",
					info:"每层飓风提供3%几率伤害免疫，每两层飓风使你摸牌阶段额外摸1张牌且使你手牌上限+1，每5层飓风使你卡牌使用次数+1，最大10层",
				},
				"xjzh_intro_jiansu":{
				    name:"减速",
				    info:"你的攻击距离减少buff层数",
				},
				"xjzh_intro_dingshen":{
				    name:"定身",
				    info:"你计算与其他角色距离增加buff层数",
				},
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
				if((!game.xjzhHasExtension("十周年UI")||!game.getExtensionConfig('十周年UI','enable'))&&lib.config.xjzh_playSkillEffect){
					alert("检测到你没有安装十周年UI切开启了技能特效选项，将为你关闭！");
					game.saveConfig('extension_仙家之魂_xjzh_playSkillEffect',false);
					game.saveConfig('xjzh_playSkillEffect',false);
					setTimeout(function(){
						game.reload();
					},1500);
				};
			});
	        lib.arenaReady.push(function(){
		        for(var i in lib.character) {
                if(!lib.character[i][3]) continue;
                if(i.indexOf('xjzh_')!=0) continue;
                var list=lib.character[i][3];
                for(var skillx of list){
                    if(lib.translate[skillx+"_info"]){
                        var str=lib.translate[skillx+"_info"]
                        if(str.includes("负面状态")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fumian');\">负面状态</a>";
                            str=str.replace(/负面状态/g,str2);
                        };
                        if(str.includes("目盲")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_mumang');\">目盲</a>";
                            str=str.replace(/目盲/g,str2);
                        };
                        if(str.includes("中毒")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_zhongdu');\">中毒</a>";
                            str=str.replace(/中毒/g,str2);
                        };
                        if(str.includes("眩晕")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_xuanyun');\">眩晕</a>";
                            str=str.replace(/眩晕/g,str2);
                        };
                        if(str.includes("灵柩")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_lingjiu');\">灵柩</a>";
                            str=str.replace(/灵柩/g,str2);
                        };
                        if(str.includes("唤醒")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_huanxing');\">唤醒</a>";
                            str=str.replace(/唤醒/g,str2);
                        };
                        if(str.includes("解放")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jiefang');\">解放</a>";
                            str=str.replace(/解放/g,str2);
                        };
                        if(str.includes("冰冻")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_bingdong');\">冰冻</a>";
                            str=str.replace(/冰冻/g,str2);
                        };
                        if(str.includes("灌注")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_guanzhu');\">灌注</a>";
                            str=str.replace(/灌注/g,str2);
                        };
                        if(str.includes("强固")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_qianggu');\">强固</a>";
                            str=str.replace(/强固/g,str2);
                        };
                        if(str.includes("燃烧")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_ranshao');\">燃烧</a>";
                            str=str.replace(/燃烧/g,str2);
                        };
                        if(str.includes("冰缓")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_binghuan');\">冰缓</a>";
                            str=str.replace(/冰缓/g,str2);
                        };
                        if(str.includes("感电")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gandian');\">感电</a>";
                            str=str.replace(/感电/g,str2);
                        };
                        if(str.includes("周围")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_zhouwei');\">周围</a>";
                            str=str.replace(/周围/g,str2);
                        };
                        if(str.includes("暴击")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baoji');\">暴击</a>";
                            str=str.replace(/暴击/g,str2);
                        };
                        if(str.includes("暴率")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baojiRan');\">暴击几率</a>";
                            str=str.replace(/暴率/g,str2);
                        };
                        if(str.includes("易伤")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_yishang');\">易伤</a>";
                            str=str.replace(/易伤/g,str2);
                        };
                        if(str.includes("暴伤")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_baojiDamage');\">暴击伤害</a>";
                            str=str.replace(/暴伤/g,str2);
                        };
                        if(str.includes("暴球")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_criticalstrike');\">暴击球</a>";
                            str=str.replace(/暴球/g,str2);
                        };
                        if(str.includes("反击")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fanji');\">反击</a>";
                            str=str.replace(/反击/g,str2);
                        };
                        if(str.includes("格挡")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gedang');\">格挡</a>";
                            str=str.replace(/格挡/g,str2);
                        };
                        if(str.includes("格上限")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_maxGedang');\">格挡上限</a>";
                            str=str.replace(/格上限/g,str2);
                        };
                        if(str.includes("物理攻击")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_gongji');\">物理攻击</a>";
                            str=str.replace(/物理攻击/g,str2);
                        };
                        if(str.includes("法术攻击")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fashu');\">法术攻击</a>";
                            str=str.replace(/法术攻击/g,str2);
                        };
                        if(str.includes("附近")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_fujin');\">附近</a>";
                            str=str.replace(/附近/g,str2);
                        };
                        if(str.includes("友军")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_youjun');\">友军</a>";
                            str=str.replace(/友军/g,str2);
                        };
                        if(str.includes("飓风")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jufeng');\">飓风</a>";
                            str=str.replace(/飓风/g,str2);
                        };
                        if(str.includes("减速")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_jiansu');\">减速</a>";
                            str=str.replace(/减速/g,str2);
                        };
                        if(str.includes("定身")){
                            var str2="<a style='color:#800080' href=\"javascript:game.xjzh_openDialog('xjzh_intro_dingshen');\">定身</a>";
                            str=str.replace(/定身/g,str2);
                        };
                        lib.translate[skillx+"_info"]=str;
                    };
                };
            };
	    });
        game.xjzhHasExtension = function(str){
            return lib.config.extensions && lib.config.extensions.includes(str) && lib.config['extension_'+str+'_enable'];
        };
        game.xjzhHasExtensionInstalled = function(str){
            return lib.config.extensions && lib.config.extensions.includes(str);
        };
    	if(!lib.config.xjzh_importTips2){
    		alert('声明：本扩展（《仙家之魂》）完全免费且开源，到目前为止仅在QQ群697310426和545844827发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。');
    		var ret=confirm("请确保你已仔细阅读以上提示，点击『确定』关闭本提示，点击『取消』将关闭【仙家之魂】扩展");
    		if(!ret){
    			if(game.xjzhHasExtension("仙家之魂")){
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
    	    if(typeof str=="function"){
    	        dialog.innerHTML=str()[0];
    	        text.innerHTML=str()[1];
    	    }else{
        	    if(typeof introduce[str]!='undefined'){
        	        dialog.innerHTML=introduce[str].name;
        	        text.innerHTML=introduce[str].info;
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
    	//代码借鉴自《玄武江湖》
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
			lib.rank.rarity.legend.addArray(["xjzh_boss_ttshilian","xjzh_jlsg_zhaoyan","xjzh_boss_qier","xjzh_boss_duruier","xjzh_boss_geligaoli","xjzh_sanguo_espsunce","xjzh_boss_waershen","xjzh_diablo_lilisi","xjzh_boss_lilisi","xjzh_sanguo_espzhangjiao","xjzh_sanguo_nanhua","xjzh_boss_zhangjiao","xjzh_sanguo_espzuoci","xjzh_sanguo_sphuatuo","xjzh_boss_lvbu","xjzh_zxzh_linmo","xjzh_diablo_lamasi","xjzh_sanguo_zhangbao","xjzh_sanguo_guanlu","xjzh_sanguo_espliuxie","xjzh_qixia_daxiongxiaomao","xjzh_huoying_kakaxi","xjzh_zxzh_linziyan","xjzh_meiren_huangdanxue","xjzh_poe_guizu","xjzh_sanguo_caocao","xjzh_sanguo_guojia","xjzh_meiren_zhaoyushu","xjzh_meiren_linjiasheng","xjzh_sanguo_caiyan","xjzh_sanguo_zhongda","xjzh_sanguo_zhaoyun","xjzh_sanguo_weiyan","xjzh_sanguo_yueying","xjzh_sanguo_kongming","xjzh_sanguo_spkongming","xjzh_sanguo_zhangfei","xjzh_huoying_mingren","xjzh_sanguo_daxiaoqiao","xjzh_sanguo_zuoci","xjzh_boss_zuoyou","xjzh_sanguo_zhangjiao","xjzh_meiren_wuyufeng","xjzh_meiren_huangyuke","xjzh_sanguo_splvbu","xjzh_sanguo_guanyu","xjzh_sanguo_zhenfu","xjzh_sanguo_zhoutai"]);
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
		window.xjzhHasExtension=game.xjzhHasExtension;
		// ---------------------------------------显示手牌上限------------------------------------------//
		if(config.xjzh_ShowmaxHandcard){
			lib.skill._xjzh_ShowmaxHandcard={
				trigger:{
					global:['gameStart','roundStart'],
				},
				forced:true,
				popup:false,
				silent:true,
				content: function (){
					var interval=setInterval(()=>{
						if(!ui.window.contains(player)) return clearInterval(interval);
						var numh=player.countCards('h');
						var nummh=player.getHandcardLimit();
						if(nummh==Infinity) nummh='∞';
						player.node.count.innerHTML=numh+'/'+nummh;
					},
					100);
				},
			};
		};
		// ---------------------------------------阵亡配音------------------------------------------//
		lib.skill._xjzh_dieaudio={
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
		};
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
				//Math.random()*30 生成一个0到29但不等于29的数值
				temp = Math.floor(2 + Math.random() * 38);
				//2加0到29
				//生成一个范围2到31的整数
				temp = temp.toString();
				//转为字符串
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
			var item = lib.config['extension_仙家之魂_xjzh_Background_Picture'];
			if (item != "auto") {
				if (_status.xjzh_Background_Picture_timeout) {
					clearTimeout(_status.xjzh_Background_Picture_timeout);
				};
			}
			else if (item == "auto") {
				var autotime = lib.config['extension_仙家之魂_xjzh_Background_Picture_auto'];
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
		if(lib.config.xjzh_zengyiSetting!=='close'){
			lib.skill._xjzh_zengyix={
				trigger:{
					global:["gameStart"],
					player:["phaseZhunbeiBefore","enterGame"],
				},
				silent:true,
				filter(event,player){
					var list=[
						"chongsu","shunying","fengyue","hunqian","mengdie","poxiao","shuangsheng","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
					]
					if(get.mode()=="boss"){
						if(["xjzh_boss_lilisi","xjzh_boss_duruier","xjzh_boss_waershen","xjzh_boss_geligaoli","xjzh_boss_qier","xjzh_boss_bingchuanjushou"].includes(get.playerName(game.boss))) return false;
					}
					if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
					for(var i of list){
						if(player.skills.includes("xjzh_zengyi_"+i)) return false;
					}
					if(player.hasSkill("xjzh_zengyi_off")) return false;
					if(!player.isUnderControl(true))  return false;
					if(get.playerName(player,"xjzh_sanguo_zuoyou")) return false;
					return true;
				},
				async content(event,trigger,player){
					const list=[
						"chongsu","shunying","fengyue","hunqian","mengdie","poxiao","shuangsheng","xuanbian","moran","shenghua","chaoti","jinghong","shefan","longfei","yunchui","fengyang","dizai","tianfu","jiehuo","xuanbing","jifeng","jinglei","lieshi","lianyu","raoliang","difu","tianze","zhangyi","tunshi"
					];
					if(get.mode()=="identity") list.addArray(["daoge","zhuanpo"]);
					switch(lib.config.xjzh_zengyiSetting){
						case "player":{
							let skills=list.randomGet();
							player.addSkill("xjzh_zengyi_off",false);
							player.addSkill("xjzh_zengyi_"+skills);
							game.log(player,'获得了增益技能<span style=\"color: red\">〖'+get.translation("xjzh_zengyi_"+skills)+'〗</span>');
						}
						break;
						case "own":{
							if(get.xjzh_wujiang(player)){
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
			if(!game.xjzhHasExtension("十周年UI")||!game.getExtensionConfig('十周年UI','enable')){
				console.log("技能特效需十周年UI支持，请安装十周年UI");
				return;
			}
			if(!decadeUI) return;
			if(!lib.config.extension_仙家之魂_xjzh_playSkillEffect||!decadeUI.config.gameAnimationEffect){
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
		};
		//判断是否为《仙家之魂》武将
		get.xjzh_wujiang=function(player){
			var name1=player.name1,name2=player.name2;
			if(name1&&lib.character[name1]&&lib.character[name1][4]){
				var list=lib.character[name1][4].slice(0);
				if(list.includes('xjzh_die_audio')) return true;
			};
			if(name2&&lib.character[name2]&&lib.character[name2][4]){
				var list=lib.character[name2][4].slice(0);
				if(list.includes('xjzh_die_audio')) return true;
			};
			return false;
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
		//显示一个弹窗，摘自《扩展ol》
		game.xjzh_bolSay = function (str, num, num2) {
			if (game.game_bolSayDialog_height == undefined) game.game_bolSayDialog_height = -45;
			if (game.game_bolSayDialog_num == undefined) game.game_bolSayDialog_num = 0;
			game.game_bolSayDialog_num++;
			var func = function () {
				game.game_bolSayDialog_onOpened = true;
				game.game_bolSayDialog_height += 45;
				var dialog = ui.create.dialog('hidden');
				dialog.classList.add('static');
				dialog.add('' + str + '');
				dialog.classList.add('popped');
				dialog.style['pointer-events'] = 'none';
				dialog.style['font-family'] = "'STXinwei','xinwei'";
				ui.window.appendChild(dialog);
				var width = str.length * 20;
				if (num != undefined) width -= num * 20;
				dialog._mod_height = -16;
				dialog.style.width = width + 'px';
				lib.placePoppedDialog(dialog, {
					clientX: (dialog.offsetLeft + dialog.offsetWidth / 2) * game.documentZoom,
					clientY: (dialog.offsetTop + dialog.offsetHeight / 4) * game.documentZoom
				});
				if (dialog._mod_height) dialog.content.firstChild.style.padding = 0;
				dialog.style.left = 'calc(50% - ' + (width + 16) / 2 + 'px' + ')';
				dialog.style.top = 'calc(18% + ' + game.game_bolSayDialog_height + 'px)';
				dialog.style['z-index'] = 999999;
				setTimeout(function () {
					dialog.delete();
					if (game.game_bolSayDialog_height > ui.window.offsetHeight * 0.95 - dialog.offsetHeight * 2) game.game_bolSayDialog_height = -45;
					setTimeout(function () {
						if (game.game_bolSayDialog_num <= 0) game.game_bolSayDialog_height = -45;
					}, 250);
				}, num2 ? num2 : 5000);
				setTimeout(function () {
					delete game.game_bolSayDialog_onOpened;
				}, 500);
			};
			var interval = setInterval(function () {
				if (game.game_bolSayDialog_onOpened == undefined) {
					func();
					game.game_bolSayDialog_num--;
					clearInterval(interval);
				};
			}, 100);
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
		game.xjzh_wujiangpai=function(name,num){
			let list=[];
			for(const argument of arguments){
				if(typeof argument=="string"||Array.isArray(argument)) name=argument;
				else if(typeof argument=="number") num=argument;
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
			if(!num) return list;
			return list.randomGets(num);
		};
		//获取武将ID
		get.playerName=function(player,arg){
			let list=new Array();
			if(player.name) list.push(player.name);
			if(player.name1) list.push(player.name1);
			if(player.name2) list.push(player.name2);
			if(!arg||typeof arg!="string"){
				return list;
			}
			if(list.some(name=>{
				return name==arg;
			})) return true;
			return false;
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
		//判断是否存在负面状态
		get.xjzh_deEffect=function(player){
			if(player.countCards('j',function(card){
			return card.name!="jydiy_yungongliaoshang"})
			>0) return true;
			if(player.isTurnedOver()) return true;
			if(player.isLinked()) return true;
			if(player.countDisabled()>=1) return true;
			return false;
		};
		get.xjzh_deEffect2=function(player){
			var num=0;
			num+=player.countCards('j',function(card){
				return card.name!="jydiy_yungongliaoshang"
			});
			if(player.isTurnedOver()) num++;
			if(player.isLinked()) num++;
			num+=player.countDisabled();
			return num;
		};
		//获取装备子类型
		get.subtype2=function(obj,player){
			if(typeof obj=='string') obj={
			name:obj};
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
		//修改获得临时技能
		var xjzh_addAdditionalSkill=lib.element.player.addAdditionalSkill;
		lib.element.player.addAdditionalSkill=function(skill,skills,keep){
			var next=game.createEvent('addSkill');
			next.player=this;
			next.skill=skill;
			next.setContent('emptyEvent');
			return xjzh_addAdditionalSkill.apply(this,arguments);
		};
		//修改获得临时技能时机
		var xjzh_addTempSkill=lib.element.player.addTempSkill;
		lib.element.player.addTempSkill=function(skill,expire,checkConflict){
			var next=game.createEvent('addSkill');
			next.player=this;
			next.skill=skill;
			next.setContent('emptyEvent');
			return xjzh_addTempSkill.apply(this,arguments);
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
		//获取角色魔力和魔力上限
		get.xjzhMp=function(player){
			if(player.storage.xjzhMp==undefined) return false;
			if(typeof player.storage.xjzhMp=='number') return player.storage.xjzhMp;
			return false;
		};
		get.xjzhmaxMp=function(player){
			if(player.storage.xjzhmaxMp==undefined) return false;
			if(typeof player.storage.xjzhmaxMp=='number') return player.storage.xjzhmaxMp;
			return false;
		};
		//修改魔力
		lib.element.player.changexjzhMp=function(num){
			var next=game.createEvent('changexjzhMp',false);
			next.num=num;
			next.player=this;
			next.setContent('changexjzhMp');
			return next;
		};
		lib.element.content.changexjzhMp=function(){
			"step 0"
			if(num==0||!player.storage.xjzhmaxMp){
				event.finish();
				return;
			}
			"step 1"
			if(!player.storage.xjzhMp) player.storage.xjzhMp=0;
			player.storage.xjzhMp+=num;
			if(num>0){
				player.$recover();
				game.playAudio('effect','recover');
			}
			if(isNaN(player.storage.xjzhMp)||player.storage.xjzhMp<0) player.storage.xjzhMp=0;
			if(player.storage.xjzhMp>player.storage.xjzhmaxMp) player.storage.xjzhMp=player.storage.xjzhmaxMp;
			"step 2"
			player.xjzhshowMp(player.storage.xjzhMp,player.storage.xjzhmaxMp);
			"step 3"
			if(game.roundNumber==0){
				event.goto(4);
				return;
			}
			if(num>0){
				var str2="回复了";
				if(num>get.xjzhmaxMp(player)-get.xjzhMp(player)){
					var numx=get.xjzhmaxMp(player)-get.xjzhMp(player);
				}else{
					var numx=num;
				}
			}else{
				var str2="消耗了";
				var numx=-num;
			}
			var str=`${str2}${numx}点能量`;
			game.log(player,str);
			"step 4"
			event.trigger('changexjzhMp');
		};
		//修改魔力上限
		lib.element.player.changexjzhmaxMp=function(num){
			var next=game.createEvent('changexjzhmaxMp',false);
			next.num=num;
			next.player=this;
			next.setContent('changexjzhmaxMp');
			return next;
		};
		lib.element.content.changexjzhmaxMp=function(){
			'step 0'
			if(num==0) return;
			"step 1"
			if(!player.storage.xjzhmaxMp) player.storage.xjzhmaxMp=0;
			if(!player.storage.xjzhMp) player.storage.xjzhMp=0;
			player.storage.xjzhmaxMp+=num;
			if(num>0){
				player.$recover();
				game.playAudio('effect','recover');
			}
			if(isNaN(player.storage.xjzhmaxMp)||player.storage.xjzhmaxMp<0) player.storage.xjzhmaxMp=0;
			if(player.storage.xjzhMp>player.storage.xjzhmaxMp){
				player.storage.xjzhMp=player.storage.xjzhmaxMp;
			}
			'step 2'
			player.xjzhshowMp(get.xjzhMp(player),get.xjzhmaxMp(player));
			"step 3"
			if(game.roundNumber==0){
				event.goto(4);
				return;
			}
			if(num<0){
				var str2="减少了";
				var numx=-num;
			}else{
				var str2="增加了";
				var numx=num;
			}
			var str=`${str2}${numx}点能量上限`;
			game.log(player,str);
			"step 4"
			event.trigger('changexjzhmaxMp');
		};
		//魔力显示
		lib.element.player.xjzhshowMp=function(arg,arg2){
			//if(!this.node.mp){
				this.node.mp=ui.create.div(".mp",this);
			//}
			var mpdiv=ui.create.div(".mpdiv",this.node.mp,"<span class='mptext'>"+arg+"/"+arg2+"</span>");
			mpdiv.style.width=arg/arg2*100+"%";
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
		game.xjzh_washCard=function(){
			var cards=[]
			for(i=0;i<ui.discardPile.childNodes.length;i++){
				var currentcard=ui.discardPile.childNodes[i];
				currentcard.vanishtag.length=0;
				if(get.info(currentcard).vanish||currentcard.storage.vanish){
					currentcard.remove();
					continue;
				}
				cards.push(currentcard);
			}
			cards.randomSort();
			for(var i=0;i<cards.length;i++){
				ui.cardPile.appendChild(cards[i]);
			}
			game.updateRoundNumber();
			if(_status.event.trigger) _status.event.trigger('washCard');
		};
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
		},
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
		lib.element.content.damage=function(){
			"step 0"
			event.forceDie=true;
			if(event.unreal||event.untriggering) event.goto(5);
			if(event.counting&&event.num>1){
				if(typeof event.counting=="boolean"){
					event.counting=event.num;
				}
				event.counting2=event.counting;
				event.num=1;
			}
			"step 1"
			event.trigger('damageBegin1');
			"step 2"
			event.trigger('damageBegin2');
			"step 3"
			event.trigger('damageBegin3');
			"step 4"
			event.trigger('damageBegin4');
			"step 5"
			//moved changeHujia to changeHp
			
			if(['fire','thunder','ice'].includes(event.nature)){
				if(player.hujia>0&&!player.hasSkillTag('nohujia')&&event.nature!='ice'){
					game.broadcastAll(function(num){
						if(lib.config.background_audio) game.playAudio('effect','hujia_damage_'+event.nature+(num>1?'2':''));
					},num);
				}
				else{
					game.broadcastAll(function(num){
						if(lib.config.background_audio) game.playAudio('effect','damage_'+event.nature+(num>1?'2':''));
					},num);
				}
			}
			else{
				if(player.hujia>0&&!player.hasSkillTag('nohujia')){
					game.broadcastAll(function(num){
						if(lib.config.background_audio) game.playAudio('effect','hujia_damage'+(num>1?'2':''));
					},num);
				}
				else{
					game.broadcastAll(function(num){
						if(lib.config.background_audio) game.playAudio('effect','damage'+(num>1?'2':''));
					},num);
				}
			}
			var str=event.unreal?'视为受到了':'受到了';
			if(source) str+='来自<span class="bluetext">'+(source==player?'自己':get.translation(source))+'</span>的';
			str+=get.cnNumber(num)+'点';
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
			if(!event.unreal){
				if(event.notrigger||event.untriggering){
					player.changeHp(-num,false)._triggered=null;
				}
				else{
					player.changeHp(-num,false);
				}
			}
			if(event.animate!==false){
				player.$damage(source);
				game.broadcastAll(function(nature,player){
					if(lib.config.animation&&!lib.config.low_performance){
						if(nature=='fire'){
							player.$fire();
						}
						else if(nature=='thunder'){
							player.$thunder();
						}
					}
				},event.nature,player);
				var numx=Math.max(0,num-player.hujia);
				player.$damagepop(-numx,event.nature);
			}
			if(event.unreal) event.goto(7);
			if(event.untriggering) event.goto(6);
			if(!event.notrigger){
				if(num==0){
					event.trigger('damageZero');
					event._triggered=null;
				}
				else{
					event.trigger('damage');
				}
			}
			"step 6"
			if(player.hp<=0&&player.isAlive()&&!event.nodying){
				game.delayx();
				event._dyinged=true;
				player.dying(event);
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
			"step 7"
			if(!event.notrigger||!event.untriggering) event.trigger('damageSource');
			"step 8"
			if(event.counting2&&event.counting2>0) event.counting2-=1;
			"step 9"
			if(event.counting2&&event.counting2>0) event.goto(1);
		};
		lib.element.player.damage=function(){
			var next=game.createEvent('damage');
			//next.forceDie=true;
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
				else if(typeof arguments[i]=='number'){
					next.num=arguments[i];
				}
				else if(get.itemtype(arguments[i])=='player'){
					next.source=arguments[i];
				}
				else if(typeof arguments[i]=='object'&&arguments[i]&&arguments[i].name){
					next.card=arguments[i];
				}
				else if(arguments[i]=='nocard'){
					nocard=true;
				}
				else if(arguments[i]=='nosource'){
					nosource=true;
				}
				else if(arguments[i]=='notrigger'){
					next._triggered=null;
					next.notrigger=true;
				}
				else if(arguments[i]=='unreal'){
					next.unreal=true
				}
				else if(arguments[i]=='counting'){
					next.counting=arguments[i];
				}
				else if(arguments[i]=='untriggering'){
					next._triggered=null;
					next.notrigger=true;
				}
				else if(get.itemtype(arguments[i])=='nature'&&arguments[i]!='stab'){
					next.nature=arguments[i];
				}
				else if(get.itemtype(arguments[i])=='natures'){
					var natures=arguments[i].split(lib.natureSeparator);
					natures.remove('stab');
					if(natures.length) next.nature=natures.join(lib.natureSeparator);
				}
			}
			if(next.card==undefined&&!nocard) next.card=event.card;
			if(next.cards==undefined&&!nocard) next.cards=event.cards;
			if(next.source==undefined&&!nosource) next.source=event.player;
			if(next.source&&next.source.isDead()) delete next.source;
			if(next.unreal==undefined) next.unreal=false;
			if(next.untriggering==undefined) next.untriggering=false;
			if(next.num==undefined) next.num=(event.baseDamage||1)+(event.extraDamage||0);
			if(next.counting==undefined) next.counting=false;
			next.original_num=next.num;
			next.change_history=[];
			next.hasNature=function(nature){
				if(!nature) return Boolean(this.nature&&this.nature.length>0);
				let natures=get.natureList(nature),naturesx=get.natureList(this.nature);
				if(nature=='linked') return naturesx.some(n=>lib.linked.includes(n));
				return get.is.sameNature(natures,naturesx);
			};
			if(next.hasNature('poison')) delete next._triggered;
			next.setContent('damage');
			next.filterStop=function(){
				if(this.source&&this.source.isDead()) delete this.source;
				var num=this.original_num;
				for(var i of this.change_history) num+=i;
				if(num!=this.num) this.change_history.push(this.num-num);
				if(this.num<=0){
					delete this.filterStop;
					if(!next.untriggering) this.trigger('damageZero');
					this.finish();
					this._triggered=null;
					return true;
				}
			};
			return next;
		};
		
		// ---------------------------------------国战补充------------------------------------------//
		/*if(config.xjzh_modeguozhan){
			if(lib.characterPack.mode_guozhan){
				//魏
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_caiyan=["female","wei",2,["xjzh_sanguo_caiqing","xjzh_sanguo_zhishu","xjzh_sanguo_guihan"],[]],
				//蜀
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_zhaoyun=["male","shu",2,["xjzh_sanguo_juejing","xjzh_sanguo_longhun","xjzh_sanguo_peijian"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_weiyan=["male","shu",4,["xjzh_sanguo_kuanggu","xjzh_sanguo_kuangxi","xjzh_sanguo_aogu"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_huangzhong=["male","shu",4,["xjzh_sanguo_liegong","xjzh_sanguo_chuzhen","xjzh_sanguo_zhujian"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_machao=["male","shu","3/5",["xjzh_sanguo_tieji","xjzh_sanguo_jieqiang","xjzh_sanguo_xiongbin"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_zhangfei=["male","shu",3,["xjzh_sanguo_shijiu","xjzh_sanguo_shayi","xjzh_sanguo_zhenhun"],[]],
				//吴
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_daxiaoqiao=["female","wu",3,["xjzh_sanguo_guose","xjzh_sanguo_tianxiang","xjzh_sanguo_lixiang"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_luxun=["male","wu",3,["xjzh_sanguo_shishu","xjzh_sanguo_huoling","xjzh_sanguo_zhijiluxun","xjzh_sanguo_fenyin"],[]],
				//群
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_huatuo=["male","qun","2/3",["xjzh_sanguo_shengxin","xjzh_sanguo_jishi","xjzh_sanguo_liangyi"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_sanguo_tongyuan=["male","qun",4,["xjzh_sanguo_keluan","xjzh_sanguo_cuifeng","xjzh_sanguo_chaohuang"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_zxzh_linlingshiyu=["male","qun",4,["xjzh_zxzh_leifa","xjzh_zxzh_jianxin","xjzh_zxzh_zhouling"],[]],
				lib.characterPack.mode_guozhan.gz_xjzh_zxzh_yuanyuan=["female","qun",4,["xjzh_zxzh_renxin","xjzh_zxzh_xianghun","xjzh_zxzh_xunqing"],[]]
				//晋
				//珠联璧合
				lib.perfectPair.gz_xjzh_sanguo_zhongda=['gz_xjzh_sanguo_chunhua']
			}
		};*/
		
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
				// ---------------------------------------导入JS------------------------------------------//
				var extList=[
				'0_Cards.js',
				'1_Skin.js',
				'2_XWSG.js',
				'3_XWTR.js',
				'4_XWCS.js',
				'5_XWDM.js',
				'6_XWTZ.js',
				'7_JLBC.js',
				//'8_PoeMode.js',
				'gonglve.js',
				'updateLog.js',
				'9_Buff.js',
				'animation.js',
				"mathList.js",
				];
				for(var i of extList){
					var extURL=lib.assetURL+'extension/仙家之魂/ext/'+i;
					lib.init.js(extURL,null,()=>{},()=>{alert(''+i+'导入失败!')});
				};
				//导入奇术要件文件
				if(lib.config.xjzh_qishuyaojianOption){
				    lib.init.js(lib.assetURL +'extension/仙家之魂/ext/qishuyaojians.js');
				    lib.init.js(lib.assetURL +'extension/仙家之魂/ext/qsyjOption.js');
				};
				lib.init.css(lib.assetURL+"extension/仙家之魂/css",'extension');
				//成就系统
				//代码借鉴自《玄武江湖》
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
    			if(lib.config.extensions&&lib.config.extensions.includes("十周年UI")&&lib.config['extension_十周年UI_enable']&&game.getExtensionConfig('十周年UI','enable')&&lib.config.extension_仙家之魂_xjzh_playSkillEffect&&lib.config.extension_十周年UI_gameAnimationEffect){
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
                            { name: 'xjzh_skillEffect_gongjian2', fileType:"json" },
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
                
			};
			// ---------------------------------------拉马斯相关选项------------------------------------------//
			lib.extensionMenu.extension_仙家之魂.xjzh_diablo_lamasiintro={
				"name":"<b><li>【拉马斯相关选项】",
				"clear":true,
			};
			lib.extensionMenu.extension_仙家之魂.xjzh_diablo_lamasiintro2={
				"name":"<b><li>导出存档",
				"clear":true,
				"onclick":function(){
					let list,data;
					if(lib.config.xjzhAchiStorage){
						list=JSON.stringify(lib.config.xjzhAchiStorage);
						data="成就存档备份："+list.slice(0);
						game.writeFile(lib.init.encode(data),'extension/仙家之魂/save','成就存档备份.json',function(err){});
					}

					if(lib.config.xjzh_qishuyaojians){
						list=JSON.stringify(lib.config.xjzh_qishuyaojians);
						data="奇术要件存档备份："+list.slice(0);
						game.writeFile(lib.init.encode(data),'extension/仙家之魂/save','奇术要件存档备份.json',function(err){});
					}

					game.xjzh_createDailog('是否帮助拉马斯复制死灵之书？',['确定','取消'],function(bool){
						if(bool=='确定'){
							list=window.localStorage.getItem("xjzh_diablo_hunhuo");
							if(list==null){
								game.xjzh_createDailog('死灵之书不存在！');
								return;
							}
							data=lib.init.encode("死灵之书副本："+list.slice(0));
							game.writeFile(data,'extension/仙家之魂/save','死灵之书副本.json',function(err){
								if(err){
									game.xjzh_createDailog('死灵之书复制成功！');
									game.xjzh_createDailog('导出存档');
								}
								else{
									game.xjzh_createDailog('死灵之书复制失败了！');
									game.xjzh_createDailog('导出存档');
								}
							})
						}
						else{
							game.xjzh_createDailog('你拒绝了拉马斯复制死灵之书！');
						}
					});
				},
			};
			
			lib.extensionMenu.extension_仙家之魂.xjzh_diablo_lamasiintro3={
				"name":'<b><li>导入存档',
				"clear":true,
				"onclick":function(){
					if(this.kzol_openedjm==undefined) {
						var div=ui.create.div();
						div.link_XX=true;
						div.innerHTML='<div style="white-space:nowrap;width:calc(100% - 10px)">' +
						'<input type="file" style="width:calc(100% - 40px)">' +
						'<button style="width:40px">导入</button></div>';
						div.querySelector('button').onclick=function(){
							var fileToLoad=this.previousSibling.files[0];
							var names=this.previousSibling.files[0]["name"];
							if(!names.includes("json")){
							    alert("文件不正确，请重试！");
							    return;
							}
							if(fileToLoad){
								var fileReader=new FileReader();
								fileReader.onload=function(fileLoadedEvent){
									var data=fileLoadedEvent.target.result;
									if(!data){
										alert("文件不正确，请重试！");
										return;
									}else{
									    try{
									        data=lib.init.decode(data);
									        _status.event.dataCover=data;
									    }
									    catch(e){
									        alert("文件不正确，请重试！");
									    }
									    if(data.indexOf("死灵之书副本")==0){
            							    game.xjzh_createDailog('是否帮助拉马斯重写死灵之书？',['确定','取消'],function(bool){
                        						if(bool=='确定'){
                        							this.innerHTML='正在重写死灵之书......';
                        							var data=_status.event.dataCover.slice(7);
                        							window.localStorage.setItem("xjzh_diablo_hunhuo",data);
                        							var list=window.localStorage.getItem("xjzh_diablo_hunhuo");
                        							if(list==null){
                        								game.xjzh_createDailog('重写死灵之书失败了！');
                        							}
                        							else{
                        								game.xjzh_createDailog('重写死灵之书成功了！');
                        							}
                        						}else{
                        						    game.xjzh_createDailog('你拒绝了重写死灵之书!！');
                        						}
                							});
            							}
            							else if(data.indexOf("成就存档备份")==0){
											var data=JSON.parse(data.slice(7));
											lib.config.xjzhAchiStorage=data;
											game.xjzhAchi.saveConfig();
											alert("正在为你覆盖存档，将于3秒后重启");
											setTimeout(function(){
												game.reload();
											},3000);
                    					}
                    					else if(data.indexOf("奇术要件存档备份")==0){
                    						var data=JSON.parse(data.slice(9));
                    						
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
                                            	backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/loadFiles.png')",
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
                                            	if(value!=data.name){
                                            	    window.xjzhOpenLoading('你输入的用户名与存档不一致，已为你取消导入');
                                            	}else{
                                            	    game.saveConfig('xjzh_qishuyaojians',data);
                            						alert("正在为你覆盖存档，将于3秒后重启");
                            						setTimeout(function(){
                            						    game.reload();
                            						},3000);
                                            	}
                                            	Name.delete();
                                            });
                                            var cancelBtm=ui.create.div(inputDiv,{
                                            	right:'35px',width:'25px',
                                            	top:'42px',height:'25px',
                                            },function(){
                                                window.xjzhOpenLoading('你点击了取消，已为你取消导入');
                                            	Name.delete();
                                            });
                    					}
									}
								}
								fileReader.readAsText(fileToLoad,"UTF-8");
							}else{
							    alert("文件不正确，请重试！");
							    return;
							}
						}
						this.parentNode.insertBefore(div,this.nextSibling);
						this.kzol_openedjm=div;
					}
					else{
						this.parentNode.removeChild(this.kzol_openedjm);
						delete this.kzol_openedjm;
					};
				}
			};
			lib.extensionMenu.extension_仙家之魂.xjzh_diablo_lamasiintro4={
				"name":"<b><li>清除存档",
				"clear":true,
				"onclick":function(){

					//重启选项
					game.xjzh_createDailog('已为你重置所选存档，是否重启游戏？',['确定','取消'],function(bool){
						if(bool=='确定'){
							setTimeout(function(){
								game.reload();
							},500);
						}
					});

					//重置死灵之书存档
					let list=window.localStorage.getItem("xjzh_diablo_hunhuo");
					if(list!=null){
							game.xjzh_createDailog('是否重置死灵之书存档？',['确定','取消'],function(bool){
							if(bool=='确定'){
								window.localStorage.removeItem("xjzh_diablo_hunhuo");
							}
						});
					}

					//重置奇术要件存档
					game.xjzh_createDailog('是否重置奇术要件存档？',['确定','取消'],function(bool){
						if(bool=='确定'){
							game.xjzh_resetQishu();
						}
					});

					//重置成就存档
					game.xjzh_createDailog('是否重置成就存档？',['确定','取消'],function(bool){
						if(bool=='确定'){
							//重置成就存档
							game.xjzhAchi.reset();
						}
					});

				},
			};
		},
		help:{},
		config:{
			/*"xjzh_helpx":{
				name:'<div class="hth_menu">▶扩展介绍</div>',
				clear:true,
				onclick:function(){
					if(this.hth_more==undefined){
						var more=ui.create.div('.hth_more',
						'<div style="border: 1px solid white;text-align:left"><font size=3px>'+
						'<li>仙家之魂'+
						'<br>作者:吃朵棉花糖'+
						'<br>技能设计：吃朵棉花糖'+
						'<br>技能编写：吃朵棉花糖'+
						'<br>反馈请加Q：<font color="red">2062192433</font>'+
						'<br>常驻群:<div onclick=window.open("https://qm.qq.com/cgi-bin/qm/qr?k=4oQUDLNJ3VqrBlS4LMjJtU584Z_xKRDl&jump_from=webapi")><span style=\"color: green;text-decoration: underline;font-style: oblique\">697310426</span></div>'+
						'<br>未经允许，请勿擅自改动扩展');
						this.parentNode.insertBefore(more,this.nextSibling);
						this.hth_more=more;
						this.innerHTML='<div class="hth_menu">▼扩展介绍</div>';
					}
					else{
						this.parentNode.removeChild(this.hth_more);
						delete this.hth_more;
						this.innerHTML='<div class="hth_menu">▶扩展介绍</div>';
					};
				},
			},*/
			"xjzh_help":{
				"name":"扩展介绍",
				"init":"1",
				"item":{
					"1":"<span style=\"color:#f9ed89\">查看信息</span>",
					"2":"<li><span style=\"color:#f9ed89\">技能设计：</span></br>吃朵棉花糖、光明牛奶",
					"3":"<li><span style=\"color:#f9ed89\">代码编绎：</span></br>吃朵棉花糖",
				}
			},
			"xjzh_intro1":{
				"name":"代码参照",
				"init":"1",
				"item":{
					"1":"<span style=\"color:#f9ed89\">查看信息</span>",
					"2":"<span style=\"color:#f9ed89\">《仙家之魂》部分代码借鉴了其他扩展部分代码，感谢以下大佬的支持和技能/扩展作者</span>",
					"3":"<li>在线更新部分代码——诗笺<li>魏延·狂袭——《剧情三英·神魏延·狂袭》<li>郭嘉·鬼谋——《金庸群侠传·绝独孤求败·无招》<li>沐风·风阵——《金庸群侠传·绝郭靖·镇卫》<li>沐风·纵火——《金庸群侠传·朱长龄·焚庄》<li>林子言·雷域——《血色衣冠·朱棣·盛威》<li>东方曜·归尘——《金庸群侠传·项少龙·穿越》<li>漩涡鸣人·六道分身——《金庸群侠传·项少龙·穿越》",
				}
			},
			"xjzh_intro2":{
				"name":"特别鸣谢",
				"init":"1",
				"item":{
					"1":"<span style=\"color:#f9ed89\">查看信息</span>",
					"2":"<span style=\"color:#f9ed89\">本扩展借鉴了部分扩展，或一些大佬对本扩展代码、素材或其他方面进行了支持，感谢这部分大佬，以下名单不分先后：",
					"3":"落影逝尘、霸天、寰宇星城、苏婆马里奥、Sukincen、西野七濑、xiaos、鸽尔赞、诗笺、大熊小猫、Maybe、光明牛奶",
				}
			},
			//在线更新
			"xjzh_updateVersionOption":{
				"name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_updateVersion.png>",
				"intro":"",
				"init":true,
				"clear":true,
			},
			//在线更新
			"xjzh_updateVersionOption":{
				"name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_updateVersion.png>",
				"intro":"",
				"init":true,
				"clear":true,
			},
			"xjzh_update_link": {
				name: '扩展更新地址',
				init: (() => {
					for (const url in xjzh_updateURLS) {
						if (lib.xjzh_updateURL == xjzh_updateURLS[url]) {
							return url;
						}
					}
					game.saveConfig('xjzh_update_link', 'GitHub');
					game.saveExtensionConfig('仙家之魂', 'xjzh_update_link', 'GitHub');
					lib.xjzh_updateURL = xjzh_updateURLS['GitHub'];
					return 'GitHub';
				})(),
				item: {
					GitHub: 'GitHub',
					GitCode: 'GitCode'
				},
				onclick: function (item) {
					if (item != game.getExtensionConfig('仙家之魂', 'xjzh_update_link')) {
						delete window.xjzh_updateversion;
						delete window.xjzh_updateSource;
						if (xjzh_updateURLS[item]) {
							game.saveConfig('xjzh_update_link', item);
							game.saveExtensionConfig('仙家之魂', 'xjzh_update_link', item);
							lib.xjzh_updateURL = xjzh_updateURLS[item];
						} else {
							alert(`选择的更新源(${item})不存在`);
							return false;
						}
					}
				},
			},
			"xjzh_updateAll":{
				init:false,
				intro:'更新游戏时，下载所有主要文件',
				name:'强制更新所有主文件',
				onclick: (bool) => {
					game.saveExtensionConfig('仙家之魂', 'xjzh_updateAll', bool);
				},
			},
			"xjzh_checkForUpdate": {
				// 检查扩展更新
				clear: true,
				intro: '点击检查扩展更新',
				name: '<button type="button">检查扩展更新</button>',
				/** @this {HTMLDivElement | HTMLButtonElement} */
				onclick: async function () {
					/**
					 * 下载按钮
					 * @type { HTMLButtonElement } button
					 **/
					let button;
					if (this instanceof HTMLButtonElement) {
						button = this;
					} else {
						// @ts-ignore
						button = this.childNodes[0].childNodes[0];
					}

					/** @type ParentNode */
					// @ts-ignore
					let parentNode = button.parentNode;
					if (button instanceof HTMLButtonElement && button.innerHTML == "检查扩展更新") {
						if (game.Updating) return alert('正在更新游戏文件，请勿重复点击');
						if (game.allUpdatesCompleted) return alert('游戏文件和素材全部更新完毕');
					}
					if (button.innerText != '检查扩展更新') return;
					
					/**
					 * 判断是否能进行更新(即是否能连接上百度)
					 * @returns { Promise<number | void> }
					 */
					function canUpdate() {
						return new Promise((resolve, reject) => {
							myFetch(`https://www.baidu.com`).then(response => {
								// 304: 自上次访问以来，请求的资源未被修改
								if (response.status == 200 || response.status == 304) {
									console.log('连接百度成功，状态码: ' + response.status);
									resolve();
								} else {
									reject(response.status);
								}
							}).catch(err => reject(err));
						});
					};

					/**
					 * 创建fetch连接
					 * @param { string } url 资源请求地址
					 * @param { fetchOptions } options 配置
					 * @returns { Promise<Response> }
					 */
					function myFetch(url, options = { timeout: 5000 }) {
						return new Promise((resolve, reject) => {
							/** @type { AbortController | undefined } */
							let myAbortController;
							/** @type { AbortSignal | undefined } */
							let signal = undefined;

							if (typeof window.AbortController == 'function') {
								if (options.timeout > 0) {
									myAbortController = new AbortController();
									signal = myAbortController.signal;
									// @ts-ignore
									setTimeout(() => myAbortController.abort(), options.timeout);
								}
							} else {
								console.warn('设备不支持AbortController');
							}

							fetch(url, { signal }).then(response => {
								if (response.redirected) {
									console.warn(`${url}\n请求已被重定向为:\n${response.url}`);
								}
								if (!response.ok) {
									return reject(response);
								}
								resolve(response);
							}).catch(reject);
						});
					};
					
					/**
					 * @description 请求错误处理
					 * @param { { url: string, error: number | Error, message: string } | Error | String } err 
					 */
					const response_catch = err => {
						console.error(err);
						game.print(err);
						if (typeof err === 'object' && !(err instanceof Error)) {
							const { url, error, message } = err;
							if (typeof url !== 'undefined' && typeof error !== 'undefined' && typeof message !== 'undefined') {
								const translate = {
									GitHub: 'GitHub',
									GitCode: 'GitCode',
								};
								let url_in_updateURLS;
								for (const updateURL in xjzh_updateURLS) {
									if (url.startsWith(xjzh_updateURLS[updateURL])) {
										url_in_updateURLS = translate[updateURL];
										break;
									}
								}
								if (url_in_updateURLS) {
									alert(`更新源:${url_in_updateURLS}\n网络请求目标：${url.replace(lib.xjzh_updateURL + '/main/', '')}\n${error instanceof window.ProgressEvent ? '' : ('状态消息或状态码：' + error + '\n')}提示:${message}`);
								} else {
									alert(`网络请求目标：${url}\n${error instanceof window.ProgressEvent ? '' : ('状态消息或状态码：' + error + '\n')}提示:${message}`);
								}
							}
						} else if (err instanceof Error) {
							if (err.name === 'AbortError') {
								alert('网络连接超时');
							} else if (err.message == 'Failed to fetch') {
								alert('网络请求失败');
							} else {
								alert(err.message);
							}
						} else if (typeof err == 'string') {
							alert(err);
						}
						if (++game.updateErrors > 5) {
							alert('检测到获取更新失败次数过多，建议您更换无名杀的更新源');
							game.updateErrors = 0;
						}
					};

					// 是否可以更新，每次都调用的原因是判断网络问题
					try {
						await canUpdate();
					} catch (e) {
						return response_catch(e);
					}
					game.Updating = true;
					game.unwantedToUpdate = false;

					/** 按钮还原状态 */
					const reduction = () => {
						game.Updating = false;
						button.innerText = '检查扩展更新';
						button.disabled = false;
					};

					if (button.disabled) return;
					else if (!game.download) return alert('此版本不支持游戏内更新，请手动更新');
					else {
						button.innerHTML = '正在检查更新';
						button.disabled = true;

						// 获取更新文件
						game.xjzhGetUpdateFiles = () => {
							/** 获取window.xjzh_updateversion */
							function getNonameUpdate() {
								/** 更新源地址 */
								const updateURL = lib.xjzh_updateURL + '/main/';
								if (typeof window.xjzh_updateversion == 'object') {
									return Promise.resolve(window.xjzh_updateversion);
								} else {
									return myFetch(`${updateURL}ext/modules/update/update.js`)
										.then(response => response.text())
										.then(text => {
											// 赋值window.xjzh_updateversion
											try {
												const data = JSON.parse(text);
												if (data.msg.user_not_login == '用户未登录') {
													alert('错误: 用户未登录(用coding和玄武镜像可能会出现此问题)\n请更换成其他更新源');
													return Promise.reject('user_not_login');
												} else {
													eval(text);
													if (typeof window.xjzh_updateversion != 'object') {
														return Promise.reject('更新内容获取失败(update.js)，请重试');
													}
												}
											} catch (e) {
												try { eval(text) } catch (error) { console.log(error) }
												if (typeof window.xjzh_updateversion != 'object') {
													return Promise.reject('更新内容获取失败(update.js)，请重试');
												}
											}
											return window.xjzh_updateversion;
										});
								}
							}
							/** 获取window.xjzh_updateSource */
							function getSourceList() {
								/** 更新源地址 */
								const updateURL = lib.xjzh_updateURL + '/main/';
								if (typeof window.xjzh_updateSource == 'object') {
									return Promise.resolve(window.xjzh_updateSource);
								} else {
									return myFetch(`${updateURL}ext/modules/update/source.js`)
										.then(response => response.text())
										.then(text => {
											//赋值window.xjzh_updateSource
											try {
												const data = JSON.parse(text);
												if (data.msg.user_not_login == '用户未登录') {
													alert('错误: 用户未登录(请更换成其他更新源');
													return Promise.reject('user_not_login');
												} else {
													eval(text);
													if (typeof window.xjzh_updateSource != 'object') {
														return Promise.reject('更新内容获取失败(source.js)，请重试');
													}
												}
											} catch (e) {
												try { eval(text) } catch (error) { console.log(error) }
												if (typeof window.xjzh_updateSource != 'object') {
													return Promise.reject('更新内容获取失败(source.js)，请重试');
												}
											}
											return window.xjzh_updateSource;
										});
								}
							}

							return new Promise(async (resolve, reject) => {
								if (!game.download) {
									reject(new Error('此版本不支持游戏内更新，请手动更新'));
								}
								if (window.xjzh_updateversion && window.xjzh_updateSource) {
									resolve({
										update: window.xjzh_updateversion,
										source_list: window.xjzh_updateSource
									});
								} else {
									// 设置最大重试次数为5次
									let i = 0;
									while (!(window.xjzh_updateversion && window.xjzh_updateSource) && i < 5) {
										try {
											await getNonameUpdate().then(() => getSourceList()).then(() => {
												resolve({
													// @ts-ignore
													update: window.xjzh_updateversion,
													// @ts-ignore
													source_list: window.xjzh_updateSource
												});
											});
										} catch (e) {
											console.log(e);
											i++;
											if (e == 'user_not_login') return reject(e);
										}
									}
									if (i == 5 && !(window.xjzh_updateversion && window.xjzh_updateSource)) {
										reject('自动请求5次全部失败, 请重试');
									} else if (window.xjzh_updateversion && window.xjzh_updateSource) {
										resolve({
											// @ts-ignore
											update: window.xjzh_updateversion,
											// @ts-ignore
											source_list: window.xjzh_updateSource
										});
									} else {
										reject('遇到其他错误, 请重试');
									}
								}
							});
						};

						// 下载进度
						game.xjzhCreateProgress = (title, max, fileName, value) => {
							/** @type { progress } */
							// @ts-ignore
							const parent = ui.create.div(ui.window, {
								textAlign: 'center',
								width: '300px',
								height: '150px',
								left: 'calc(50% - 150px)',
								top: 'auto',
								bottom: 'calc(50% - 75px)',
								zIndex: '10',
								boxShadow: 'rgb(0 0 0 / 40 %) 0 0 0 1px, rgb(0 0 0 / 20 %) 0 3px 10px',
								backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
								borderRadius: '8px',
								overflow: 'hidden scroll'
							});

							// 可拖动
							parent.className = 'dialog';

							const container = ui.create.div(parent, {
								position: 'absolute',
								top: '0',
								left: '0',
								width: '100%',
								height: '100%'
							});

							container.ontouchstart = ui.click.dialogtouchStart;
							container.ontouchmove = ui.click.touchScroll;
							// @ts-ignore
							container.style.WebkitOverflowScrolling = 'touch';
							parent.ontouchstart = ui.click.dragtouchdialog;

							const caption = ui.create.div(container, '', title, {
								position: 'relative',
								paddingTop: '8px',
								fontSize: '20px'
							});

							ui.create.node('br', container);

							const tip = ui.create.div(container, {
								position: 'relative',
								paddingTop: '8px',
								fontSize: '20px',
								width: '100%'
							});

							const file = ui.create.node('span', tip, '', fileName);
							file.style.width = file.style.maxWidth = '100%';
							ui.create.node('br', tip);
							const index = ui.create.node('span', tip, '', String(value || '0'));
							ui.create.node('span', tip, '', '/');
							const maxSpan = ui.create.node('span', tip, '', String(max || '未知'));

							ui.create.node('br', container);

							const progress = ui.create.node('progress.zxgxProgress', container);
							progress.setAttribute('value', value || '0');
							progress.setAttribute('max', max);

							parent.getTitle = () => caption.innerText;
							parent.setTitle = title => caption.innerHTML = title;
							parent.getFileName = () => file.innerText;
							parent.setFileName = name => file.innerHTML = name;
							parent.getProgressValue = () => progress.value;
							parent.setProgressValue = value => progress.value = index.innerHTML = value;
							parent.getProgressMax = () => progress.max;
							parent.setProgressMax = max => progress.max = maxSpan.innerHTML = max;
							parent.autoSetFileNameFromArray = fileNameList => {
								if (fileNameList.length > 2) {
									parent.setFileName(fileNameList.slice(0, 2).concat(`......等${fileNameList.length - 2}个文件`).join('<br/>'));
								} else if (fileNameList.length == 2) {
									parent.setFileName(fileNameList.join('<br/>'));
								} else if (fileNameList.length == 1) {
									parent.setFileName(fileNameList[0]);
								} else {
									parent.setFileName('当前没有正在下载的文件');
								}
							};
							return parent;
						};
						
						game.xjzhDownload = (url, onsuccess, onerror, onprogress) => {
							let downloadUrl = url, path = 'extension/仙家之魂', name = url;
							if (url.indexOf('/') != -1) {
								path = path + "/" + url.slice(0, url.lastIndexOf('/'));
								name = url.slice(url.lastIndexOf('/') + 1);
							}
			
							if (url.indexOf('http') != 0) {
								url = lib.xjzh_updateURL + '/main/' + url;
							}
			
							/**
							 * 下载成功
							 * @param { FileEntry } [FileEntry] 文件系统
							 * @param { boolean } [skipDownload] 是否跳过下载
							 */
							function success(FileEntry, skipDownload) {
								if (FileEntry && !skipDownload && ['config', 'xuanwu'].includes(lib.config.update_link)) {
									FileEntry.file(file => {
										const fileReader = new FileReader();
										fileReader.onload = e => {
											/** @type { string } */
											// @ts-ignore
											const text = e.target.result;
											try {
												/** @type { notLogin } */
												const data = JSON.parse(text);
												if (data.msg.user_not_login == '用户未登录') {
													error(new Error(data.msg.user_not_login), data.msg.user_not_login);
												}
											} catch (err) {
												if (typeof onsuccess == 'function') onsuccess();
											}
										}
										fileReader.readAsText(file, "UTF-8");
									});
								} else {
									if (typeof onsuccess == 'function') {
										if (skipDownload === true) {
											onsuccess(skipDownload);
										} else {
											onsuccess();
										}
									}
								}
							}
			
							/**
							 * 错误处理
							 * @param { FileTransferError | Error } e 错误对象
							 * @param { string } [message] 错误信息
							 */
							function error(e, message) {
								// 手机端下载的错误
								// 如果下载的是文件夹(xx/game/)会报400，如果是xx/game的形式在github会报404
								// Show-K的服务器下载文件夹也是404，不用管
								if (window.FileTransferError && e instanceof window.FileTransferError) {
									const errorCode = {
										1: 'FILE_NOT_FOUND_ERR',
										2: 'INVALID_URL_ERR',
										3: 'CONNECTION_ERR',
										4: 'ABORT_ERR',
										5: 'NOT_MODIFIED_ERR'
									};
									console.error({
										message: e.body,
										source: e.source,
										status: e.http_status,
										target: e.target,
										error: errorCode[e.code]
									});
									switch(e.http_status) {
										case 404: 
											game.print(`更新源中不存在${path}/${name}`);
											console.log(`更新源中不存在${path}/${name}`);
											success(undefined, true);
											break;
										case 402:
											// git镜像中这个资源无法下载，那就跳过
											if(typeof onerror == 'function') {
												onerror(e, e.body);
											}else{
												alert('这个资源在git镜像更新源内无法下载，请在下载操作全部完成后切换更新源下载！');
												success(undefined, true);
											}
											break;
										default:
											if (typeof onerror == 'function') {
												onerror(e, e.body);
											}
									}
									
								} else {
									// 电脑端下载的错误
									console.error(e, message);
									if (message == 'Not Found') {
										game.print(`更新源中不存在${path}/${name}`);
										console.log(`更新源中不存在${path}/${name}`);
										success(undefined, true);
									}
									// git镜像中这个资源无法下载，那就跳过
									// @ts-ignore
									else if(typeof onerror == 'function') {
										onerror(e, e.body);
									}else{
										alert('这个资源在git镜像更新源内无法下载，请在下载操作全部完成后切换更新源下载！');
										success(undefined, true);
									}
								}
							}
			
							if (window.FileTransfer) {
								// 判断是不是文件夹，不是才下载
								function download() {
									let fileTransfer = new FileTransfer();
									fileTransfer.download(encodeURI(`${url}`), encodeURI(lib.assetURL + path + '/' + name), success, error);
								}
								window.resolveLocalFileSystemURL(lib.assetURL,
									/**
									 * @param { DirectoryEntry } DirectoryEntry 
									 */
									DirectoryEntry => {
										DirectoryEntry.getDirectory(path, { create: false }, dir => {
											dir.getDirectory(name, { create: false }, () => {
												console.log(`${path}/${name}是文件夹`);
												// 跳过下载
												success(undefined, true);
											}, download);
										}, download);
									}, download);
							} else if (typeof window.require == 'function'){
								const fetch = myFetch(`${url}`);
			
								fetch.then(response => response.arrayBuffer())
									.then(arrayBuffer => {
										const fs = require('fs');
										const p = require('path');
										const filePath = p.join(__dirname, path, name);
										const dirPath = p.dirname(filePath);
										function writeFile() {
											fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
												if (e) error(e, 'writeFile');
												else success();
											});
										}
										if (!fs.existsSync(dirPath)) {
											fs.mkdir(dirPath, { recursive: true }, e => {
												if (e) error(e, '文件夹创建失败');
												writeFile();
											});
										} else if (fs.existsSync(filePath)) {
											const stat = fs.statSync(filePath);
											if (stat.isDirectory()) {
												console.error(`${path + '/' + name}是个文件夹`);
												alert(`${path + '/' + name}是个文件夹，不予下载。请将此问题报告给此更新源的管理者。`);
												return success(undefined, true);
											} else {
												writeFile();
											}
										} else {
											writeFile();
										}
									})
									.catch(
										/** @param { Response } response */
										response => {
											console.log(response);
											error(new Error(String(response.status)), response.statusText);
									})
							}
						};

						game.xjzhMultiDownload = (list, onsuccess, onerror, onfinish, onprogress) => {
							// 不修改原数组
							let list2 = list.slice(0);
							// 正在并发下载的文件名数组
							let list3 = [];
							// 已经下载的数量
							let length = 0;
							// 最大并发量
							let max = 5;
							/**
							 * 下载文件，失败后300ms重新下载
							 * @param { string } current 文件名 
							 */
							let reload = current => {
								game.xjzhDownload(current, skipDownload => {
									if (skipDownload === true) {
										game.print(`跳过下载: ${current}`);
										console.log(`跳过下载: ${current}`);
									} else {
										console.log(`下载成功: ${current}`);
									}
									length++;
									list3.remove(current);
									onsuccess(list3);
									//自调用
									download();
								}, (e, message) => {
									console.log(`下载失败: ${message}`);
									console.dir(e);
									onerror(e, message);
									if (message !== '用户未登录') {
										setTimeout(() => reload(current), 300);
									}
								});
							};
							
							let download = () => {
								if (length < list.length) {
									let num_copy = list3.length;
									for (let i = 1; i <= max - num_copy; i++) {
										/** 正在下载的文件名 */
										let current = list2.shift();
										if (current) {
											list3.push(current);
											reload(current);
										} else {
											break;
										}
									}
								} else if (!list3.length) {
									onfinish();
								}
							};
							download();
						};

						game.xjzhGetUpdateFiles().then(({ update, source_list: updates }) => {
							if (!lib.extensionPack.仙家之魂.version) lib.extensionPack.仙家之魂.version = xjzhVersions;
							//要更新的版本和现有的版本一致
							if (update.version == xjzhVersions) {
								if (!confirm('当前版本已经是最新，是否覆盖更新？')) {
									game.Updating = false;
									button.innerHTML = '检查扩展更新';
									button.disabled = false;
									return;
								}
							} else {
								const result = game.xjzhCheckVersion(lib.version, update.version);
								if (result == 1) {
									if (!confirm('游戏版本比服务器提供的版本还要高，是否覆盖更新？')) {
										game.Updating = false;
										button.innerHTML = '检查扩展更新';
										button.disabled = false;
										return;
									}
								}
							}

							let files = null;
							/** 原来的版本号 */
							let version = lib.version;

							let goupdate = (files, update) => {
								lib.version = update.version;
								delete window.xjzh_updateSource;

								if (!game.getExtensionConfig('仙家之魂', 'xjzh_updateAll') && Array.isArray(files)) {
									files.add('ext/modules/update/update.js');
									let files2 = [];
									for (let i = 0; i < files.length; i++) {
										let str = files[i].indexOf('*');
										if (str != -1) {
											str = files[i].slice(0, str);
											files.splice(i--, 1);
											for (let j = 0; j < updates.length; j++) {
												if (updates[j].indexOf(str) == 0) {
													files2.push(updates[j]);
												}
											}
										}
									}
									updates = files.concat(files2);
								}

								for (let i = 0; i < updates.length; i++) {
									if (updates[i].indexOf('node_modules/') == 0 ) {
										//只有电脑端用，没有nodejs环境跳过
										if (!lib.node || !lib.node.fs) {
											updates.splice(i--, 1);
											continue;
										};
										let entry = updates[i];
										const fs = require('fs');
										fs.access(__dirname + '/' + entry, function (err) {
											if (!err) {
												const size = fs.statSync(__dirname + '/' + entry).size;
												// @ts-ignore
												size == 0 && (err = true);
											}
											!err && updates.splice(i--, 1);
										});
									}
								}

								button.remove();

								let span = document.createElement('span');
								let n1 = 0;
								let n2 = updates.length;
								span.innerHTML = `正在下载文件（${n1}/${n2}）`;
								parentNode.insertBefore(span, parentNode.firstElementChild);

								let consoleMenu;
								if (this != button) {
									consoleMenu = document.createElement('button');
									consoleMenu.setAttribute('type', 'button');
									consoleMenu.innerHTML = '跳转到命令页面';
									consoleMenu.onclick = ui.click.consoleMenu;
									parentNode.appendChild(document.createElement('br'));
									parentNode.appendChild(consoleMenu);
								}

								game.xjzhHasLocalNotification = () => {
									return !!(window.cordova && cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local);
								}
								// 复制文件数组，用来和进度绑定
								const copyList = [...updates];
								// 创建下载进度div
								const progress = game.xjzhCreateProgress('更新扩展', copyList.length, copyList[0]);
								// app创建通知
								if (game.xjzhHasLocalNotification()) {
									cordova.plugins.notification.local.schedule({
										id: 2,
										title: '扩展版本更新',
										text: `正在下载文件（${n1}/${n2}）`,
										// 进度
										progressBar: { value: 0 }
									});
								}
								
								game.xjzhMultiDownload(updates, (fileNameList) => {
									n1++;
									span.innerHTML = `正在下载文件（${n1}/${n2}）`;
									// 更新进度
									progress.setProgressValue(n1);
									progress.autoSetFileNameFromArray(fileNameList);
									if (game.xjzhHasLocalNotification()) {
										cordova.plugins.notification.local.update({
											id: 2,
											text: `正在下载文件（${n1}/${n2}）`,
											progressBar: { value: (n1 / n2 * 100).toFixed(0) }
										});
									}
								},
									// 下载失败
									e => {},
									// 下载完成
									() => {
										// 更新进度, 下载完成时不执行onsuccess而是onfinish
										progress.setProgressValue(copyList.length);
										progress.setFileName('下载完成');
										if (game.xjzhHasLocalNotification()) {
											cordova.plugins.notification.local.clear(2);
											if (document.hidden) {
												cordova.plugins.notification.local.schedule({
													id: 4,
													title: '扩展版本更新',
													text: `扩展版本更新完啦，点击进入无名杀`,
												});
											}
										}
										setTimeout(() => {
											// 移除进度条
											progress.remove();
											// 删除window.xjzh_updateversion
											delete window.xjzh_updateversion;
											span.innerHTML = `扩展更新完毕（${n1}/${n2}）`;
											setTimeout(() => {
												if (!game.UpdatingForAsset) {
													if (game.unwantedToUpdateAsset) game.allUpdatesCompleted = true;
													alert('扩展更新完毕');
												}
												game.Updating = false;
												game.unwantedToUpdate = true;
												typeof consoleMenu != 'undefined' && consoleMenu.remove();
												parentNode.insertBefore(document.createElement('br'), parentNode.firstElementChild);
												let button2 = document.createElement('button');
												button2.innerHTML = '重新启动';
												button2.onclick = game.reload;
												// button2.style.marginTop = '8px';
												parentNode.insertBefore(button2, parentNode.firstElementChild);
											}, 750);
										}, 250);
									},
									(current, loaded, total) => {
										if (total != 0) {
											progress.setFileName(`${current}(已完成${Math.round((loaded / total) * 100)}%)`);
										} else {
											progress.setFileName(`${current}(已下载${parseSize(loaded)})`);
										}
									});
							};

							if (Array.isArray(update.files) && update.update) {
								// 当前扩展版本
								let version1 = version.split('.');
								// update里要更新的版本，如果当前扩展版本是这个版本，就只更新update.files里的内容
								let version2 = update.update.split('.');

								for (let i = 0; i < version1.length && i < version2.length; i++) {
									if (+version2[i] > +version1[i]) {
										files = false;
										break;
									} else if (+version1[i] > +version2[i]) {
										files = update.files.slice(0);
										break;
									}
								}
								if (files === null) {
									if (version1.length >= version2.length) {
										files = update.files.slice(0);
									}
								}
							}

							let str = '有新版本' + update.version + '可用，是否下载？';
							if (navigator.notification && navigator.notification.confirm) {
								let str2 = update.changeLog[0];
								for (let i = 1; i < update.changeLog.length; i++) {
									if (update.changeLog[i].indexOf('://') == -1) {
										str2 += '；' + update.changeLog[i];
									}
								}
								navigator.notification.confirm(
									str2,
									function (index) {
										if (index == 1) {
											goupdate(files, update);
										} else {
											// 还原版本
											lib.version = version;
											game.Updating = false;
											button.innerHTML = '检查扩展更新';
											button.disabled = false;
										}
									},
									str,
									['确定', '取消']
								);
							} else {
								if (confirm(str)) {
									goupdate(files, update);
								} else {
									// 还原版本
									lib.version = version;
									game.Updating = false;
									button.innerHTML = '检查扩展更新';
									button.disabled = false;
								}
							}
						}).catch(err => {
							game.Updating = false;
							button.innerHTML = '检查扩展更新';
							button.disabled = false;
							response_catch(err);
							reduction();
						});
					}
				}
			},
			//美化类选项
			"xjzh_decoration":{
				"name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_decoration.png>",
				"intro":"",
				"init":true,
				"clear":true,
			},
			"xjzh_Background_Music":{
				name:"背景音乐",
				intro:"背景音乐：可随意点播、切换优质动听的背景音乐",
				init:lib.config.extension_仙家之魂_xjzh_Background_Music === undefined ? "1" :lib.config.extension_仙家之魂_xjzh_Background_Music,
				item:{
					"0":"随机播放",
					"1":"默认音乐",
					"2":"国战鏖战",
					"3":"犬夜叉",
					"4":"风一样的勇士",
					"5":"痛苦之村",
				},
				onclick:function (item) {
					game.saveConfig('extension_仙家之魂_xjzh_Background_Music', item);
					game.xjzhplayBackgroundMusic();
					ui.backgroundMusic.addEventListener('ended', game.xjzhplayBackgroundMusic);
				},
				"visualMenu":function (node, link) {
					node.style.height = node.offsetWidth * 1.33 + "px";
					node.style.backgroundSize = '100% 100%';
					node.className = ' xjzhmusicname';
					node.setBackgroundImage('extension/仙家之魂/image/music/' + link + '.png');
				},
			},
			"xjzh_Background_Picture":{
				name:"背景图片",
				intro:"背景图片：可随意切换精美高清的背景图片。",
				init:lib.config.extension_仙家之魂_xjzh_Background_Picture === undefined ? "1" :lib.config.extension_仙家之魂_xjzh_Background_Picture,
				item:{
					"1":"默认背景",
					"xjzh_Background1":"火影博人",
					"xjzh_Background2":"牛仔风华",
					"xjzh_Background3":"冰肌玉骨",
					"xjzh_Background4":"吊带连心",
					"xjzh_Background5":"池水深深",
					"auto":"自动换背景",
				},
				onclick:function (item) {
					game.saveConfig('extension_仙家之魂_xjzh_Background_Picture', item);
					game.xjzhBackground_Picture();
				},
				"visualMenu":function (node, link) {
					//link是冒号前面的，比如default:经典卡背，link就是default
					node.style.height = node.offsetWidth * 0.67 + "px";
					//高度设置成宽度的0.67倍
					node.style.backgroundSize = '100% 100%';
					//图片拉伸
					node.className = 'button character xjzhbackgroundname';
					node.setBackgroundImage('extension/仙家之魂/picture/' + link + '.jpg');
					//设置图片
				},
			},
			"xjzh_Background_Picture_auto":{
				name:"自动换背景时间",
				intro:"设置自动换背景的时间",
				init:lib.config['extension_仙家之魂_xjzh_Background_Picture_auto'] === undefined ? "30000" :lib.config['extension_仙家之魂_xjzh_Background_Picture_auto'],
				item:{
					'5000':'五秒',
					'10000':'十秒',
					'20000':'二十秒',
					'30000':'半分钟',
					'60000':'一分钟',
					'120000':'两分钟',
					'300000':'五分钟',
				},
				onclick:function (item) {
					game.saveConfig('extension_仙家之魂_xjzh_Background_Picture_auto', item);
					if (lib.config.extension_仙家之魂_xjzh_Background_Picture == 'auto') {
						game.xjzhBackground_Picture();
					}
				},
			},
			//功能类选项
			"xjzh_function":{
				"name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_function.png>",
				"intro":"",
				"init":true,
				"clear":true,
			},
			"xjzh_tenuiCardcopy":{
                "name":"卡牌美化",
                "intro":"在安装十周年的情况下无需将本扩展素材复制至十周年文件夹即可显示美化素材（其他UI若需要美化素材请手动复制），若你不喜欢十周年UI风格素材，请关闭此选项，默认关闭",
                "init":false,
                onclick:function(item){
                    if(game.getExtensionConfig('十周年UI','enable')){
                        game.saveConfig('extension_仙家之魂_xjzh_tenuiCardcopy',item);
                        game.saveConfig('xjzh_tenuiCardcopy',item);
                    }else{
                        alert("你未安装或未开启十周年UI，无法使用此功能");
                    };
                }
			},
			"xjzh_qishuyaojianOption":{
                "name":"奇术要件",
                "intro":"开启奇术要件功能，关闭将关闭所有奇术要件相关功能、UI等，默认关闭",
                "init":false,
                onclick:function(item){
                    game.saveConfig('extension_仙家之魂_xjzh_qishuyaojianOption',item);
                    game.saveConfig('xjzh_qishuyaojianOption',item);
                }
            },
			//poe模式
			/*"xjzh_poemode":{
			    name:"poe模式（尚未完成）",
			    intro:"体验poe游戏模式",
			    init:false,
			},*/
			"xjzh_playSkillEffect":{
                "name":"技能特效",
                "intro":"播放部分角色技能特效（需要十周年UI扩展支持），第一次开启请在下方“安装扩展素材”处复制素材",
                "init":false,
                onclick:function(item){
                   	if(!game.xjzhHasExtension("十周年UI")||!game.getExtensionConfig('十周年UI','enable')){
    					alert("技能特效需十周年UI支持，请安装十周年UI并打开“游戏动画特效”");
    					return;
    				}
					
                    game.saveConfig('extension_仙家之魂_xjzh_playSkillEffect',item);
                    game.saveConfig('xjzh_playSkillEffect',item);
                }
            },
			/*"xjzh_lutoupifu":{
				"name":"露头皮肤",
				"intro":"切换显示仙家之魂武将露头皮肤",
				"init":false,
			},*/
			"poelose":{
				name:"poelose",
				intro:"是否要求POE武将弃置技能",
				init:true,
			},
			"xjzh_zengyiSetting":{
				"name":"随机增益",
				"intro":"开启此选项武将在开局时随机获得一个增益技能，该增益技能仅玩家可获得",
				"init":lib.config.xjzh_zengyiSetting !== undefined ? lib.config.xjzh_zengyiSetting:"player",
				"item":{
					"player":"仅玩家可获得",
					"own":"仅仙魂武将获得",
					"close":"关闭增益",
				},
				onclick:function(item){
					game.saveConfig('extension_仙家之魂_xjzh_zengyiSetting',item);
					game.saveConfig('xjzh_zengyiSetting',item);
				}
			},
			"xjzh_changeGroup":{
				"name":'替换势力',
				"intro":"开启后重启游戏生效，将武将势力由“魏蜀吴群”替换为本扩展的“星”势力",
				"init":true,
			},
			"xjzh_ShowmaxHandcard":{
				name:'手牌上限',
				init:false,
				intro:'将游戏内显示的手牌数改为显示手牌数与手牌上限。(例：2/3，代表拥有2张牌，手牌上限为3)',
			},
			/*"xjzh_modeguozhan":{
				name:'国战补充',
				init:false,
				intro:'将本扩展部分武将加入国战将池',
			},*/
			"xjzh_jiexiantupo":{
				name:'界限突破',
				init:false,
				intro:'加强本扩展部分武将技能',
			},
			"xjzh_copySources":{
				"name":"安装扩展素材(请看说明)<font>⇨</font>",
				"intro":"若你希望显示势力图片或在国战显示本扩展武将图片以及优化过的本扩卡牌素材，亦或者需要本扩展的技能特效，建议您点击此处一键复制适配素材，安装完后请重启游戏生效。",
				"clear":true,
				onclick:function(){
					if(!game.xjzhHasExtension("十周年UI")&&!game.xjzhHasExtension("OLUI")){
						alert("你未安装十周年UI或OLUI，请安装后点击此处");
						return;
					}
	
					if(this.parentNode.querySelector(".xjzhdiy")){
						this.rd_rules.remove();
					}
					var rules=ui.create.div(".xjzhdiy","<span style=\"color:#f9ed89\">当前进度为：0/0</span>");
					this.rd_rules=rules;
					this.parentNode.insertBefore(rules, this.nextSibling);
					this.querySelector("font").innerHTML='⇩';;
					if(game.getExtensionConfig('十周年UI','enable')){
						var xjzhcopy_fileList=[
						["extension/仙家之魂/image/effect","extension/十周年UI/assets/animation"],
						["extension/仙家之魂/image/shili","extension/十周年UI/image/decoration"],
						["extension/仙家之魂/image/cardimage/tenui","extension/十周年UI/image/card"],
						];
					}
					else if(game.getExtensionConfig('OLUI','enable')){
						var xjzhcopy_fileList=[
						["extension/仙家之魂/image/shili","extension/OLUI/image/group"],
						["extension/仙家之魂/image/cardimage/tenui","extension/OLUI/image/card/handcards"],
						];
					}
					else if(game.getExtensionConfig('十周年UI','enable')&&game.getExtensionConfig('OLUI','enable')){
						alert("你安装了十周年UI及OLUI并同时打开了以上两个UI，请仅选择一个UI使用");
						return;
					}
					var copy_fileList2=[];
					var count1=xjzhcopy_fileList.length;
					var func=function(){
						var all_count=copy_fileList2.length;
						var count=0;
						while(copy_fileList2.length){
							var list2=copy_fileList2.shift();
							game.xjzh_filesCopy(list2[0],list2[1],list2[2],function(){
								count++;
								rules.firstChild.innerHTML="<span style=\"color:#f9ed89\"><i>当前进度为："+count+"/"+all_count+"</i></span>";
								if(count==all_count){
									var btn=ui.create.div(".center","<img style=width:130px src='"+lib.assetURL+"extension/仙家之魂/image/title/xjzh_title_restart.png'>");
									btn.onclick=function(){
										game.reload();
									};
									rules.appendChild(document.createElement("br"));
									rules.appendChild(btn);
								};
							});
						};
					};
					var func1=function(){
						var listt=xjzhcopy_fileList[0];
						game.getFileList(listt[0],function(fold,file){
							var arr=Array.from(file);
							for(var arr1 of arr){
								copy_fileList2.push([listt[0],arr1,listt[1]]);
							};
							xjzhcopy_fileList.shift();
							if(!xjzhcopy_fileList.length){
								func();
							}else{
								func1();
							}
						});
					};
					func1();
				},
			},
			"xjzh_copySources2":{
				"name":"<span style=\"color:#f9ed89\"><font size =2px>说明：若你希望显示势力图片，建议你点击上方按钮一键复制适配素材，安装完后请重启游戏生效，点击此按钮会同时安装仙家之魂卡包十周年卡牌风格素材。</font></span>",
				"intro":"",
				"clear":true,
				"init":true,
			},
			/*"xjzh_copySources3":{
				"name":"切换卡牌风格",
				"intro":"切换仙家之魂卡包风格",
				"init":"1",
				"item":{
					"1":"十周年",
					"2":"手杀",
					"3":"小程序",
				},
				onclick:function(item){
					if(!game.xjzhHasExtension("十周年UI")&&!game.xjzhHasExtension("OLUI")){
						alert("你未安装十周年UI或OLUI，请安装后点击此处");
						return;
					}
					game.saveConfig('extension_仙家之魂_xjzh_copySources3',item);
					if(this.parentNode.querySelector(".xjzhdiy")) return;
					var rules=ui.create.div(".xjzhdiy","<span style=\"color:#f9ed89\">当前进度为0/0</span>");
					this.rd_rules=rules;
					this.parentNode.insertBefore(rules,this.nextSibling);
					var that=this;
					var xjzhcopy_fileList=[];
					var copy_fileList2=[];
					switch(item){
						case '1':
						if(game.getExtensionConfig('十周年UI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/shili","extension/十周年UI/image/decoration"],
							["extension/仙家之魂/image/cardimage/tenui","extension/十周年UI/image/card"],
							];
						}
						else if(game.getExtensionConfig('OLUI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/cardimage/tenui","extension/OLUI/image/card/handcards"],
							];
						}
						break;
						case '2':
						if(game.getExtensionConfig('十周年UI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/shili","extension/十周年UI/image/decoration"],
							["extension/仙家之魂/image/cardimage/shousha","extension/十周年UI/image/card"],
							];
						}
						else if(game.getExtensionConfig('OLUI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/cardimage/shousha","extension/OLUI/image/card/handcards"],
							];
						}
						break;
						case '3':
						if(game.getExtensionConfig('十周年UI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/shili","extension/十周年UI/image/decoration"],
							["extension/仙家之魂/image/cardimage/shuban","extension/十周年UI/image/card"],
							];
						}
						else if(game.getExtensionConfig('OLUI','enable')){
							var xjzhcopy_fileList=[
							["extension/仙家之魂/image/character","image/character"],
							["extension/仙家之魂/image/cardimage/shuban","extension/OLUI/image/card/handcards"],
							];
						}
						break;
					};
					var copy_fileList2=[];
					var func=function(){
						var all_count=copy_fileList2.length;
						var count=0;
						while(copy_fileList2.length){
							var list2=copy_fileList2.shift();
							game.xjzh_filesCopy(list2[0],list2[1],list2[2],function(){
								count++;
								rules.firstChild.innerHTML="<span style=\"color:#f9ed89\"><i>当前进度为："+count+"/"+all_count+"</i></span>";
								if(count==all_count){
									var btn=ui.create.div(".center","<img style=width:130px src='"+lib.assetURL+"extension/仙家之魂/image/title/xjzh_title_restart.png'>");
									btn.onclick=function(){
										game.reload();
									};
									rules.appendChild(document.createElement("br"));
									rules.appendChild(btn);
								};
							});
						};
					};
					var func1=function(){
						var listt=xjzhcopy_fileList[0];
						game.getFileList(listt[0],function(fold,file){
							var arr=Array.from(file);
							for(var arr1 of arr){
								copy_fileList2.push([
								listt[0],
								arr1,
								listt[1],
								]);
							};
							xjzhcopy_fileList.shift();
							if(!xjzhcopy_fileList.length){
								func();
							}
							else{
								func1();
							}
						});
					};
					func1();
				},
				"visualMenu":function(node,link){
					node.style.height = node.offsetWidth * 1.387 + "px";
					node.style.backgroundSize = '100% 100%';
					node.className='button character incardback';
					node.setBackgroundImage('extension/仙家之魂/image/thumbnail/'+link+'.jpg');
				},
			},*/
			
		},
		package:{
			character:{character:{},translate:{},},
			card:{card:{},translate:{},list:[],},
			skill:xjzhCHRskills,
			intro:"",
			author:`吃朵棉花糖<br>版本：${xjzhVersions}<br><b><font color=red>声明：本扩展完全免费且开源，到目前为止仅在QQ群697310426和545844827发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。`,
			//author:"吃朵棉花糖<br>版本：2.10091<br><b><font color=red>声明：本扩展完全免费且开源，到目前为止仅在QQ群697310426和545844827发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关。</font><b><br><br>仙家之魂交流群：545844827</b><br><img style=width:238px src="+lib.assetURL+"extension/仙家之魂/image/erweima/xjzh_pic_qqqunma1.jpg><b><br><br>金庸群侠传交流群：697310426</b><br><img style=width:238px src="+lib.assetURL+"extension/仙家之魂/image/erweima/xjzh_pic_qqqunma2.jpg>",
			diskURL:"",
			forumURL:"",
			version:"",
		},
		files:{"character":[],"card":[],"skill":[]}
	}
})