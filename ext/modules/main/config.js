import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';
import openUpdate from '../update/updateAnnouncement.js';
import { createApp } from '../../../../../game/vue.esm-browser.js';
import GmCheat from '../vue/gmGod.vue';
import { openTycoonPage } from '../tycoon/TycoonPage.js';

export const config = {
    "xjzh_nofire_explain": {
        name: '<div class="hth_menu">▶扩展说明（点击展开）</div>',
        clear: true,
        onclick() {
            if (this.xjzh_nofire_explain == undefined) {
                let more = ui.create.div('.xjzh_nofire_explain',
                    '<div style="border: 1px solid white;text-align:left"><div style="color:rgb(210,210,000); font-size:15px; line-height:1.5; text-shadow: 0 0 2px black">' +
                    '<li>1、无名杀遵循GPL3协议，任何人可以自由复制、修改、分发程序而不需要原作者的授权和同意，但是GPL3协议并未说明程序中的素材是否遵循该协议，一般认为若这些素材是该程序不可分割的一部分，则视为遵循GPL3协议，否则不适用于GPL3协议，无名杀扩展一般情况下不存在代码和素材强制绑定而导致程序无法运行的情况，本扩展更不存在代码运行时必须存在某个素材' +
                    '<br><br><li>2、本扩展遵循GPL3协议，任何人可以自由复制、修改、分发本扩展代码，但必须遵循GPL3协议，即必须保留以下信息：保留原作者的版权声明。这通常包括原作者的姓名或版权所有者的名称，以及版权声明的年份；包含 GPLv3 许可声明；程序的所有源代码部分，而不是只提供部分代码，如只提供修改后的代码；如果对项目进行了修改，需要明确说明修改的部分，清晰地指出哪些部分是原始代码，哪些部分是修改后的代码；保证接收者能够方便地获取到源代码。' +
                    '<br><br><li>3、本扩展的素材来自于网图、本人购买、本人自行制作、请人制作等4个方面，而由于GPL3协议没有明确说明素材的归属，一般认为素材版权/著作权来自于原图制作者（包含二次制作，但不包含自行制作）。' +
                    '<br><br><li>4、本扩展在被二次修改的过程中，我要求修改传播者删除我自己制作的素材被拒绝，鉴于某些大佬认为GPL3协议包含素材部分，so，我无话可说，仅说明，此后若有更新的版本可能不再包含所有本人自行制作、二次创作、请人制作、购买的所有素材。' +
                    '<br><br><li>5、任何转发、复制、修改本扩展的行为不受作者（吃朵棉花糖）支持，任何修改本扩展的行为，请删除所有我自行制作的素材。' +
                    '<br><br><li>6、本扩展禁止某火使用、修改，若你能看到这条声明，那么一般情况下你没有安装某火的扩展，或者本扩展已被修改，如果是已被修改的情况，请自行删除本扩展，否则作者不对本扩展造成的任何后果负责，也不接受任何关于本扩展的反馈。'
                );
                this.parentNode.insertBefore(more, this.nextSibling);
                this.xjzh_nofire_explain = more;
                this.innerHTML = '<div class="hth_menu">▶扩展说明（点击折叠）</div>';
            }
            else {
                this.parentNode.removeChild(this.xjzh_nofire_explain);
                delete this.xjzh_nofire_explain;
                this.innerHTML = '<div class="hth_menu">▶扩展说明（点击展开）</div>';
            };
        },
    },
    "xjzh_openAnnouncement": {
        name: "<u><b>点击此处打开更新公告</b></u>",
        intro: "",
        clear: true,
        onclick(item) {
            openUpdate.showAnnouncements();
        },
    },
    "xjzh_openHelp": {
        name: "<u><b>点击此处打开帮助文档</b></u>",
        intro: "查看完整的游戏玩法说明和功能介绍",
        clear: true,
        async onclick(item) {
            const helpUrl = lib.assetURL + 'extension/仙家之魂/ext/html/help.html';

            try {
                // 先检查文件是否存在
                const response = await fetch(helpUrl, { method: 'HEAD' });
                if (!response.ok) {
                    game.xjzh_createDailog('帮助文档不存在，请检查扩展文件是否完整！');
                    return;
                }

                // 文件存在，打开新窗口
                const helpWindow = window.open(helpUrl, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
                if (!helpWindow || helpWindow.closed || typeof helpWindow.closed == 'undefined') {
                    game.xjzh_createDailog('帮助文档已在新窗口打开，如被拦截请允许弹出窗口！');
                }
            } catch (error) {
                console.error('检查帮助文档失败:', error);
                game.xjzh_createDailog('无法访问帮助文档，请检查扩展文件完整性！');
            }
        },
    },
    "xjzh_gameSaveManagement": {
        name: "<u><b>点击此处打开工具箱</b></u>",
        clear: true,
        onclick: function () {
            // 创建或获取 GM 工具实例
            if (!window.xjzh_gmInstance) {
                const app = createApp(GmCheat);
                const mountEl = document.createElement('div');
                document.body.appendChild(mountEl);
                const vm = app.mount(mountEl);
                window.xjzh_gmInstance = vm;
                window.xjzh_gmApp = app;
            }
            window.xjzh_gmInstance.openWindow();
        },
    },
    "xjzh_tycoon": {
        name: "<u><b>点击进入绿洲大亨</b></u>",
        clear: true,
        onclick: function () {
            openTycoonPage();
        },
    },
    "xjzh_help": {
        name: "扩展介绍",
        init: "1",
        item: {
            "1": "<span style=\"color:#f9ed89\">查看信息</span>",
            "2": "<li><span style=\"color:#f9ed89\">技能设计：</span></br>吃朵棉花糖、光明牛奶",
            "3": "<li><span style=\"color:#f9ed89\">代码编绎：</span></br>吃朵棉花糖",
        },
    },
    "xjzh_intro1": {
        name: "代码参照",
        init: "1",
        item: {
            "1": "<span style=\"color:#f9ed89\">查看信息</span>",
            "2": "<span style=\"color:#f9ed89\">《仙家之魂》部分技能代码借鉴了其他扩展部分代码，感谢以下大佬的支持和技能/扩展作者</span>",
            "3": "<li>在线更新部分代码——诗笺<li>郭嘉·鬼谋——《金庸群侠传·绝独孤求败·无招》<li>沐风·风阵——《金庸群侠传·绝郭靖·镇卫》<li>沐风·纵火——《金庸群侠传·朱长龄·焚庄》<li>林子言·雷域——《血色衣冠·朱棣·盛威》<li>东方曜·归尘——《金庸群侠传·项少龙·穿越》<li>漩涡鸣人·六道分身——《金庸群侠传·项少龙·穿越》",
        },
    },
    "xjzh_intro2": {
        name: "特别鸣谢",
        init: "1",
        item: {
            "1": "<span style=\"color:#f9ed89\">查看信息</span>",
            "2": "<span style=\"color:#f9ed89\">本扩展借鉴了部分扩展，或一些大佬对本扩展代码、素材或其他方面进行了支持，感谢这部分大佬，以下名单不分先后：",
            "3": "落影逝尘、霸天、寰宇星城、苏婆马里奥、Sukincen、西野七濑、xiaos、鸽尔赞、诗笺、大熊小猫、Maybe、光明牛奶、缘伴随行、锟斤拷烫烫烫",
        },
    },
    //美化类选项
    "xjzh_decoration": {
        name: "<img style=width:260px src=" + lib.assetURL + "extension/仙家之魂/image/title/xjzh_decoration.png>",
        intro: "",
        init: true,
        clear: true,
        onclick() {
            if (lib.config.xjzh_decoration == undefined) {
                lib.config.xjzh_decoration = [];
                let nextSibling = this.nextSibling;
                while (!nextSibling.innerHTML.includes("xjzh_qishu.png")) {
                    lib.config.xjzh_decoration.push(nextSibling);
                    nextSibling = nextSibling.nextSibling;
                }
                lib.config.xjzh_decoration.forEach(function (element) { element.hide() });
            } else {
                lib.config.xjzh_decoration.forEach(function (element) { element.show() });
                delete lib.config.xjzh_decoration;
            }
        }
    },
    "xjzh_backgroundMusic": {
        name: "背景音乐",
        intro: "背景音乐：可随意点播、切换优质动听的背景音乐",
        init: game.getExtensionConfig("仙家之魂", "xjzh_backgroundMusic") === undefined ? "1" : game.getExtensionConfig("仙家之魂", "xjzh_backgroundMusic"),
        item: {
            "0": "随机播放",
            "1": "默认音乐",
            "2": "国战鏖战",
            "3": "犬夜叉",
            "4": "风一样的勇士",
            "5": "痛苦之村",
            "6": "仙剑奇缘",
            "7": "桃花岛",
            "8": "景天—护甲",
            "9": "雪见-落入凡尘",
            "10": "雪见—仙凡之旅",
            "11": "GBL女神殿",
            "12": "迷乱之村",
        },
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_backgroundMusic", item);
            game.xjzh_playBackgroundMusic();
            ui.backgroundMusic.addEventListener('ended', game.xjzh_playBackgroundMusic);
        },
        visualMenu: function (node, link) {
            node.style.height = node.offsetWidth * 1.33 + "px";
            node.style.backgroundSize = '100% 100%';
            node.className = ' xjzh_musicName';
            node.setBackgroundImage('extension/仙家之魂/image/music/' + link + '.png');
        },
    },
    "xjzh_backgroundPicture": {
        name: "背景图片",
        intro: "背景图片：可随意切换精美高清的背景图片。",
        init: game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture") === undefined ? "1" : game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture"),
        item: {
            "1": "默认背景",
            "xjzh_backgroundPicture1": "火影博人",
            "xjzh_backgroundPicture2": "牛仔风华",
            "xjzh_backgroundPicture3": "冰肌玉骨",
            "xjzh_backgroundPicture4": "吊带连心",
            "xjzh_backgroundPicture5": "池水深深",
            "xjzh_backgroundPicture6": "碧波荡漾",
            "xjzh_backgroundPicture7": "樱花瀑布",
            "xjzh_backgroundPicture8": "北夜极光",
            "xjzh_backgroundPicture9": "海绵宝宝",
            "auto": "自动换背景",
        },
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_backgroundPicture", item);
            game.xjzh_playBackgroundPicture();
        },
        visualMenu: function (node, link) {
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
    "xjzh_backgroundPicture_auto": {
        name: "自动换背景时间",
        intro: "设置自动换背景的时间",
        init: game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture_auto") === undefined ? "30000" : game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture_auto"),
        item: {
            '5000': '五秒',
            '10000': '十秒',
            '20000': '二十秒',
            '30000': '半分钟',
            '60000': '一分钟',
            '120000': '两分钟',
            '300000': '五分钟',
        },
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_backgroundPicture_auto", item);
            if (game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture_auto") == "auto") {
                game.xjzh_playBackgroundPicture();
            }
        },
    },
    "xjzh_cardBeautify": {
        name: "卡牌美化",
        intro: "<li>使用本体的fullimage显示本扩展的十周年卡牌素材<li>若你不喜欢十周年UI风格素材，请关闭此选项<li>此选项默认关闭<li>由于未使用任何额外代码和css，所以开启后本扩展卡牌的花色和点数显示为白色，若不喜欢请关闭此选项",
        init: false,
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_cardBeautify", item);
        },
    },
    //奇术要件选项
    "xjzh_qishuConfig": {
        name: "<img style=width:260px src=" + lib.assetURL + "extension/仙家之魂/image/title/xjzh_qishu.png>",
        intro: "",
        init: true,
        clear: true,
        onclick() {
            if (lib.config.xjzh_qishuConfig == undefined) {
                lib.config.xjzh_qishuConfig = [];
                let nextSibling = this.nextSibling;
                while (!nextSibling.innerHTML.includes("xjzh_function.png")) {
                    lib.config.xjzh_qishuConfig.push(nextSibling);
                    nextSibling = nextSibling.nextSibling;
                }
                lib.config.xjzh_qishuConfig.forEach(function (element) {
                    element.hide()
                    // element.style.display = 'none';
                });
            } else {
                lib.config.xjzh_qishuConfig.forEach(function (element) {
                    element.show()
                    //element.style.display = '';
                });
                delete lib.config.xjzh_qishuConfig;
            }
        }
    },
    "xjzh_qishuyaojianOptions": {
        name: "奇术要件",
        intro: "开启奇术要件功能，关闭将关闭所有奇术要件相关功能、UI等，默认关闭",
        init: game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") ? game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") : "close",
        item: {
            "all": "所有武将开启",
            "own": "仅仙魂武将开启",
            "close": "关闭",
        },
        onclick(item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions", item);
        },
    },
    "xjzh_qishuAiEquip": {
        name: "AI启用",
        intro: "本功能需要开启“奇术要件”按钮，开启后AI将使用你的配置装备奇术要件。",
        init: false,
        onclick(item) {
            let config = game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions");
            if (!config || config === "close") {
                alert("奇术要件功能未开启，请开启后使用");
                return;
            }
            game.saveExtensionConfig("仙家之魂", "xjzh_qishuAiEquip", item);;
        }
    },
    "xjzh_qishuAllMode": {
        name: "全模式启用",
        intro: "本功能需要开启“奇术要件”按钮，除升华试炼外的其他模式均可使用奇术要件。",
        init: false,
        onclick(item) {
            let config = game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions");
            if (!config || config === "close") {
                alert("奇术要件功能未开启，请开启后使用");
                return;
            }
            game.saveExtensionConfig("仙家之魂", "xjzh_qishuAllMode", item);;
        }
    },
    //功能类选项
    "xjzh_function": {
        name: "<img style=width:260px src=" + lib.assetURL + "extension/仙家之魂/image/title/xjzh_function.png>",
        intro: "",
        init: true,
        clear: true,
        onclick() {
            if (lib.config.xjzh_function == undefined) {
                lib.config.xjzh_function = [];
                let nextSibling = this.nextSibling;
                while (!nextSibling.innerHTML.includes("xjzh_challenge.png")) {
                    lib.config.xjzh_function.push(nextSibling);
                    nextSibling = nextSibling.nextSibling;
                }
                lib.config.xjzh_function.forEach(function (element) {
                    element.hide()
                    //element.style.display = 'none';
                });
            } else {
                lib.config.xjzh_function.forEach(function (element) {
                    element.show()
                    //element.style.display = '';
                });
                delete lib.config.xjzh_function;
            }
        }
    },
    "xjzh_lutoupifu": {
        name: "露头皮肤",
        intro: "切换显示仙家之魂武将露头皮肤",
        init: false,
    },
    "xjzh_poelose": {
        name: "poelose",
        intro: "是否要求POE武将移除技能",
        init: true,
        onclick(item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_poelose", item);
        },
    },
    "xjzh_zengyiSetting": {
        name: "增益技能",
        intro: "开启此选项武将在开局时随机获得一个增益技能，该增益技能AI无法获得",
        init: game.getExtensionConfig("仙家之魂", "xjzh_zengyiSetting") !== undefined ? game.getExtensionConfig("仙家之魂", "xjzh_zengyiSetting") : "player",
        item: {
            "player": "仅玩家可获得",
            "own": "仅仙魂武将获得",
            "close": "关闭增益",
        },
        onclick(item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_zengyiSetting", item);
        },
    },
    "xjzh_changeGroup": {
        name: '替换势力',
        intro: "开启后重启游戏生效，将武将势力由“魏蜀吴群”替换为本扩展的“星”势力",
        init: true,
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_changeGroup", item);
        },
    },
    "xjzh_ShowmaxHandcard": {
        name: '手牌上限',
        init: false,
        intro: '将游戏内显示的手牌数改为显示手牌数与手牌上限。(例：2/3，代表拥有2张牌，手牌上限为3)',
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_ShowmaxHandcard", item);
        },
    },
    "xjzh_jiexiantupo": {
        name: '界限突破',
        init: false,
        intro: '加强本扩展部分武将技能',
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_jiexiantupo", item);
        },
    },
    "xjzh_showFps": {
        name: '显示FPS',
        init: game.getExtensionConfig("仙家之魂", "xjzh_showFps") ? game.getExtensionConfig("仙家之魂", "xjzh_showFps") : "close",
        item: {
            close: '关闭',
            rd: '右下',
            cd: '中下',
            ld: '左下',
            ru: '右上',
            cu: '中上',
            lu: '左上',
        },
        onclick: function (item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_showFps", item);
        },
    },
    /*
    "xjzh_copySources": {
        name: "安装扩展素材(请看说明)<font>⇨</font>",
        intro: "若你希望显示势力图片，建议你点击上方按钮一键复制适配素材，安装完后请重启游戏生效，点击此按钮会同时安装仙家之魂卡包十周年卡牌风格素材。",
        clear: true,
        onclick: function () {
            if (!game.hasExtension("十周年UI")) {
                alert("你未安装十周年UI，请安装后点击此处");
                return;
            }

            if (this.parentNode.querySelector(".xjzhdiy")) {
                this.rd_rules.remove();
            }
            var rules = ui.create.div(".xjzhdiy", "<span style=\"color:#f9ed89\">准备复制文件...</span>");
            this.rd_rules = rules;
            this.parentNode.insertBefore(rules, this.nextSibling);

            var xjzhcopy_fileList = [
                //["extension/仙家之魂/image/shili", "extension/十周年UI/image/decoration"],
                ["extension/仙家之魂/image/cardimage/decade", "extension/十周年UI/image/card-skins/decade"],
                ["extension/仙家之魂/image/cardimage/caise", "extension/十周年UI/image/card-skins/caise"],
                ["extension/仙家之魂/image/cardimage/online", "extension/十周年UI/image/card-skins/online"],
                ["extension/仙家之魂/image/cardimage/decade", "extension/十周年UI/image/card-skins/bingkele"],
            ];

            var completeCount = 0;
            var totalFiles = 0;
            var copiedFiles = 0;

            var countPromises = xjzhcopy_fileList.map(function (paths) {
                return new Promise(function (resolve) {
                    game.getFileList(paths[0], function (folders, files) {
                        function countFilesRecursive(dir, callback) {
                            game.getFileList(dir, function (subFolders, subFiles) {
                                var count = subFiles.length;
                                if (subFolders.length === 0) {
                                    callback(count);
                                } else {
                                    var promises = subFolders.map(function (folder) {
                                        return new Promise(function (res) {
                                            countFilesRecursive(dir + '/' + folder, res);
                                        });
                                    });
                                    Promise.all(promises).then(function (results) {
                                        var subCount = results.reduce(function (sum, c) { return sum + c; }, 0);
                                        callback(count + subCount);
                                    });
                                }
                            });
                        }

                        var initialCount = files.length;
                        if (folders.length === 0) {
                            resolve(initialCount);
                        } else {
                            var promises = folders.map(function (folder) {
                                return new Promise(function (res) {
                                    countFilesRecursive(paths[0] + '/' + folder, res);
                                });
                            });
                            Promise.all(promises).then(function (results) {
                                var subCount = results.reduce(function (sum, c) { return sum + c; }, 0);
                                resolve(initialCount + subCount);
                            });
                        }
                    });
                });
            });

            Promise.all(countPromises).then(function (counts) {
                totalFiles = counts.reduce(function (sum, count) { return sum + count; }, 0);
                rules.firstChild.innerHTML = `<span style="color:#f9ed89">发现 ${totalFiles} 个文件，开始复制...</span>`;

                // 开始复制文件
                xjzhcopy_fileList.forEach(function (paths) {
                    game.xjzh_copyFiles(paths[0], paths[1], "正在安装素材", function (copied, total) {
                        completeCount++;
                        copiedFiles += copied;
                        rules.firstChild.innerHTML = `<span style="color:#f9ed89"><i>正在复制: ${completeCount}/${xjzhcopy_fileList.length} 个目录，已复制 ${copiedFiles}/${totalFiles} 个文件</i></span>`;

                        // 所有目录都复制完成
                        if (completeCount === xjzhcopy_fileList.length) {
                            rules.firstChild.innerHTML = `<span style="color:#f9ed89"><i>复制完成！共复制 ${copiedFiles} 个文件</i></span>`;
                            var btn = ui.create.div(".center", `<img style="width:130px" src="${lib.assetURL}extension/仙家之魂/image/title/xjzh_title_restart.png">`);
                            btn.onclick = function () {
                                game.reload();
                            };
                            rules.appendChild(document.createElement("br"));
                            rules.appendChild(btn);
                        }
                    }, false);
                });
            }).catch(function (error) {
                console.error('统计文件数量时出错:', error);
                rules.firstChild.innerHTML = `<span style="color:#ff6666">统计文件数量时出错</span>`;
            });
        },
    },
    "xjzh_copySources2": {
        name: "<span style=\"color:#f9ed89\"><font size =2px>说明：若你希望显示势力图片，建议你点击上方按钮一键复制适配素材，安装完后请重启游戏生效，点击此按钮会同时安装仙家之魂卡包十周年卡牌风格素材。</font></span>",
        intro: "",
        clear: true,
        init: true,
    },*/
    //升华试炼相关选项
    "xjzh_challengeIntro": {
        name: "<img style=width:260px src=" + lib.assetURL + "extension/仙家之魂/image/title/xjzh_challenge.png>",
        intro: "",
        init: true,
        clear: true,
        onclick() {
            if (lib.config.xjzh_challengeIntro == undefined) {
                lib.config.xjzh_challengeIntro = [];
                let nextSibling = this.nextSibling;
                while (nextSibling != undefined) {
                    lib.config.xjzh_challengeIntro.push(nextSibling);
                    nextSibling = nextSibling.nextSibling;
                }
                lib.config.xjzh_challengeIntro.forEach(function (element) {
                    element.hide();
                });
            } else {
                lib.config.xjzh_challengeIntro.forEach(function (element) {
                    element.show();
                });
                delete lib.config.xjzh_challengeIntro;
            }
        }
    },
    "xjzh_challengeWujinModeIntro": {
        name: "<div style=\"display: flex; justify-content: center; align-items: center; font-size: 25px;\"><b>··无尽试炼··</b></div>",
        clear: true,
    },
    "xjzh_challengeAllSkills": {
        name: '全扩技能池',
        init: false,
        intro: '升华试炼-无尽试炼的商店会刷新出全扩技能池，关闭仅为《仙家之魂》扩展的技能。',
        onclick(item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_challengeAllSkills", item);
        },
    },
    "xjzh_challengeAllCharacter": {
        name: '全扩武将池',
        init: false,
        intro: '升华试炼所有模式默认只能使用《仙家之魂》的武将，开启此选项后，可以在升华试炼-无尽试炼中使用本体及所有扩展的武将，若因此造成报错，概不受理。”。',
        onclick(item) {
            game.saveExtensionConfig("仙家之魂", "xjzh_challengeAllCharacter", item);
        },
    },
    "xjzh_challengeAllCoin": {
        name: '初始999道韵',
        init: false,
        intro: '升华试炼-无尽试炼的商店的初始道韵为999，需要先完成成就“凌虚证道”。',
        onclick(item) {
            if (!game.xjzhAchi.hasAchi("凌虚证道", 'game')) {
                alert("请先完成成就“凌虚证道”");
                return;
            }
            game.saveExtensionConfig("仙家之魂", "xjzh_challengeAllCoin", item);
        },
    },

};