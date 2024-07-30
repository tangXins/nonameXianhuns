import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';
import updateOnlines from '../update/updateOnline.js';

export const config={
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
    //...updateOnlines,
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
        init:game.getExtensionConfig("仙家之魂","xjzh_Background_Music")=== undefined ? "1" :game.getExtensionConfig("仙家之魂","xjzh_Background_Music"),
        item:{
            "0":"随机播放",
            "1":"默认音乐",
            "2":"国战鏖战",
            "3":"犬夜叉",
            "4":"风一样的勇士",
            "5":"痛苦之村",
        },
        onclick:function (item) {
            game.saveExtensionConfig("仙家之魂","xjzh_Background_Music",item);
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
        init:game.getExtensionConfig("仙家之魂","xjzh_Background_Picture")===undefined ? "1":game.getExtensionConfig("仙家之魂","xjzh_Background_Picture"),
        item:{
            "1":"默认背景",
            "xjzh_Background1":"火影博人",
            "xjzh_Background2":"牛仔风华",
            "xjzh_Background3":"冰肌玉骨",
            "xjzh_Background4":"吊带连心",
            "xjzh_Background5":"池水深深",
            "xjzh_Background6":"碧波荡漾",
            "auto":"自动换背景",
        },
        onclick:function (item) {
            game.saveExtensionConfig("仙家之魂","xjzh_Background_Picture",item);
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
        init:game.getExtensionConfig("仙家之魂","xjzh_Background_Picture_auto")===undefined?"30000":game.getExtensionConfig("仙家之魂","xjzh_Background_Picture_auto"),
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
            game.saveExtensionConfig("仙家之魂","xjzh_Background_Picture_auto",item);
            if(game.getExtensionConfig("仙家之魂","xjzh_Background_Picture_auto")=="auto"){
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
            if(game.hasExtension("十周年UI")){
                game.saveExtensionConfig("仙家之魂","xjzh_tenuiCardcopy",item);
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
            game.saveExtensionConfig("仙家之魂","xjzh_qishuyaojianOption",item);
        }
    },
    "xjzh_qishuBossPower":{
        "name":"强化奇术Boss",
        "intro":"本功能需要开启“奇术要件”按钮，开启后对局将有几率掉落材料冥狱石，挑战奇术Boss时，如果背包中有该材料，将默认消耗2个冥狱石开启强化boss挑战，在该模式下胜利将会获得巨额奖励。",
        "init":false,
        onclick:function(item){
            if(!game.getExtensionConfig("仙家之魂","xjzh_qishuBossPower")&&!game.getExtensionConfig("仙家之魂","xjzh_qishuyaojianOption")){
                alert("奇术要件功能未开启，请开启后使用");
                return;
            }
            game.saveExtensionConfig("仙家之魂","xjzh_qishuBossPower",item);;
        }
    },
    "xjzh_playSkillEffect":{
        "name":"技能特效",
        "intro":"播放部分角色技能特效（需要十周年UI扩展支持），第一次开启请在下方“安装扩展素材”处复制素材",
        "init":false,
        onclick:function(item){
               if(!game.hasExtension("十周年UI")){
                alert("技能特效需十周年UI支持，请安装十周年UI并打开“游戏动画特效”");
                return;
            }
            game.saveExtensionConfig("仙家之魂","xjzh_playSkillEffect",item);
        }
    },
    /*"xjzh_lutoupifu":{
        "name":"露头皮肤",
        "intro":"切换显示仙家之魂武将露头皮肤",
        "init":false,
    },*/
    "poelose":{
        name:"poelose",
        intro:"是否要求POE武将移除技能",
        init:true,
    },
    "xjzh_zengyiSetting":{
        "name":"增益技能",
        "intro":"开启此选项武将在开局时随机获得一个增益技能，该增益技能AI无法获得",
        "init":game.getExtensionConfig("仙家之魂","xjzh_zengyiSetting")!== undefined ? game.getExtensionConfig("仙家之魂","xjzh_zengyiSetting"):"player",
        "item":{
            "player":"仅玩家可获得",
            "own":"仅仙魂武将获得",
            "close":"关闭增益",
        },
        onclick:function(item){
            game.saveExtensionConfig("仙家之魂","xjzh_zengyiSetting",item);
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
            if(!game.hasExtension("十周年UI")&&!game.hasExtension("OLUI")){
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

    // ---------------------------------------存档相关选项------------------------------------------//
    "xjzh_saveIntro":{
        "name":"<b><li>【存档相关选项】",
        "clear":true,
    },
    "xjzh_exportSave":{
        "name":"<b><li>导出存档",
        "clear":true,
        "onclick":function(){
            let list,data;
            if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")){
                list=JSON.stringify(game.getExtensionConfig("仙家之魂","xjzhAchiStorage"));
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
    },
    "xjzh_importSave":{
        "name":'<b><li>导入存档',
        "clear":true,
        "onclick": function() {
            if (this.kzol_openedjm == undefined) {
                var div = ui.create.div();
                div.link_XX = true;

                // 使用DOM API创建元素，避免innerHTML的安全风险
                var input = document.createElement('input');
                input.type = 'file';
                input.style.width = 'calc(100% - 40px)';
                div.appendChild(input);

                var button = document.createElement('button');
                button.textContent = '导入';
                button.style.width = '40px';
                button.onclick = async function() {
                    var file = this.previousSibling.files[0];
                    if (!file) {
                        alert("未选择文件，请重试！");
                        return;
                    }
                    if (!file.name.toLowerCase().endsWith('.json')) {
                        alert("文件必须是.json格式，请重试！");
                        return;
                    }

                    try {
                        var fileContent = await new Promise((resolve, reject) => {
                            var reader = new FileReader();
                            reader.onload = e => resolve(e.target.result);
                            reader.onerror = reject;
                            reader.readAsText(file, "UTF-8");
                        }),data;

                        if (!fileContent) {
                            alert("文件内容为空，请重试！");
                            return;
                        }else{
                            fileContent=lib.init.decode(fileContent);
                            data=fileContent.slice(0);
                            _status.event.dataCover=fileContent;
                        }
                        // 根据文件内容的前缀进行不同的处理
                        if (data.startsWith("死灵之书副本")) {
                            // 处理死灵之书逻辑...
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
                        } else if (fileContent.startsWith("成就存档备份")) {
                            var data = JSON.parse(data.slice(7), "成就存档格式不正确，请重试！");
                            // 处理成就存档逻辑...
                            game.saveExtensionConfig("仙家之魂","xjzhAchiStorage",data);
                            alert("正在为你覆盖存档，将于3秒后重启");
                            setTimeout(function(){
                                game.reload();
                            },3000);
                        } else if (fileContent.startsWith("奇术要件存档备份")) {
                            var data = JSON.parse(data.slice(9), "奇术要件存档格式不正确，请重试！");
                            // 处理奇术要件存档逻辑...

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
                                    let currentData={...data};
                                    let arrList=Object.keys(data.cailiao);
                                    if(arrList.filter(item=>{
                                        return ["xjzh_cailiao_zhanshou","xjzh_cailiao_gugu","xjzh_cailiao_toulu"].includes(item);
                                    }).length){
                                        for(let i in currentData.cailiao){
                                            if(["xjzh_cailiao_zhanshou","xjzh_cailiao_gugu","xjzh_cailiao_toulu"].includes(i)){
                                                delete currentData.cailiao[i];
                                            }
                                        }
                                    }
                                    game.saveConfig('xjzh_qishuyaojians',currentData);
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
                        } else {
                            alert("未知的文件类型，请重试！");
                        }
                    } catch (e) {
                        alert("读取文件时发生错误，请重试！");
                    }
                };
                div.appendChild(button);

                this.parentNode.insertBefore(div, this.nextSibling);
                this.kzol_openedjm = div;
            } else {
                this.parentNode.removeChild(this.kzol_openedjm);
                delete this.kzol_openedjm;
            }
        },
    },
    "xjzh_cleanSave":{
        "name":"<b><li>清除存档",
        "clear":true,
        "onclick":async function(){
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
    },

};