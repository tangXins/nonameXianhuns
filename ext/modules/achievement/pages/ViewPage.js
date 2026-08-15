import { lib, game, ui, get } from '../../../../../../../noname.js';

//打开成就视窗
export function openAchievementView(type) {
    if (!type) type = 'character';
    game.xjzhAchi.thisType = type;
    game.pause2();
    game.xjzhAchi.hideLevel = [];
    var { window: achiWindow, bk, resize } = game.xjzh_createPageFrame({
        windowClass: '.xjzh-achiWindow',
        bgClass: '.xjzh-achiWindow-bk',
        exitClass: '.xjzh-achiWindow-return',
        onExit: function () {
            delete game.xjzhAchi.hideLevel;
            delete game.xjzhAchi.thisType;
            game.xjzhAchi.openAchievementMainPage();
        },
    });
    //界面提示标签
    ui.create.div('.xjzh-achiWindow-tips', bk).setBackgroundImage('extension/仙家之魂/css/images/achievement/tips_' + type + '.png');
    //成就文本内容
    var content = ui.create.div('.xjzh-achiWindow-textinner', ui.create.div('.xjzh-achiWindow-text', bk));
    lib.setScroll(content);
    //函数方法
    var state = {
        hideGained: false,
        checkFilter: function (name) {
            var info = game.xjzhAchi.info(name, game.xjzhAchi.thisType);
            if (state.hideGained && game.xjzhAchi.hasAchi(name, game.xjzhAchi.thisType)) return false;
            return !game.xjzhAchi.hideLevel.includes(info.level);
        },
        changeFilter: function (num) {
            if ([1, 2, 3].includes(num)) {
                if (game.xjzhAchi.hideLevel.includes(num)) {
                    game.xjzhAchi.hideLevel.remove(num);
                    return false;
                } else if (game.xjzhAchi.hideLevel.length < 3) {
                    game.xjzhAchi.hideLevel.push(num);
                    return true;
                }
            }
            return undefined;
        },
        refreshList: function () {
            var list = Object.keys(lib.xjzh_achievement[game.xjzhAchi.thisType]);
            var filter = function (name) {
                return !state.hideGained || !game.xjzh_getQishuConfig().achi.got.includes(name);
            };
            for (let i = 0; i < list.length; i++) {
                if (this.checkFilter(list[i])) continue;
                if (state.hideGained && game.xjzh_getQishuConfig().achi.got.includes(name)) continue;
                list.splice(i--, 1);
            }
            var text = "";
            var isFirst = true;
            for (var name of list) {
                //首项不加分割线
                if (isFirst) {
                    isFirst = false;
                } else {
                    text += "<br><p align='center'><img src=" + lib.assetURL + "extension/仙家之魂/css/images/achievement/splitLine.png></p><br>";
                }
                //<--
                let info = game.xjzhAchi.info(name, game.xjzhAchi.thisType);
                let name2 = game.xjzhAchi.nameOf(name, game.xjzhAchi.thisType);
                text += "<p style=\"min-height:100px;\">";
                //显示已完成
                if (game.xjzh_getQishuConfig().achi.got.includes(name2)) {
                    text += "<img src='" + lib.assetURL + "extension/仙家之魂/css/images/achievement/isGained.png' style='height:60px;'/>";
                }
                //<--
                //显示成就名
                text += "<span style=\"color:black;font-family:hwxinkai;font-size:55px;\">&nbsp;";
                if (!info.name) {
                    text += name;
                } else {
                    text += info.name;
                }
                text += "</span>&nbsp;&nbsp;&nbsp;";
                //<--
                //显示成就等级
                for (var i = 0; i < info.level; i++) {
                    text += "<img src='" + lib.assetURL + "extension/仙家之魂/css/images/achievement/star.png' style='height:30px;'/>&nbsp;&nbsp;";
                }
                text += "&nbsp;&nbsp;&nbsp;";
                //<--
                //显示达成时间
                if (game.xjzh_getQishuConfig().achi.date[name2]) {
                    text += "达成于 <font color=\"#FF4500\" size=\"2\">";
                    let ts = game.xjzh_getQishuConfig().achi.date[name2];
                    text += (new Date(ts)).format("yyyy 年 MM 月 dd 日 hh:mm");
                    text += "</font>";
                }
                //<--
                //显示成就达成需求
                if (typeof info.info == 'function') {
                    text += info.info();
                } else {
                    text += "<br><br><span style='font-size:22px;'>&nbsp;&nbsp;<b>◆";
                    text += info.info;
                    text += "</b></span>";
                }
                //<--
                //显示进度（如果未达成的话）
                if (!game.xjzh_getQishuConfig().achi.got.includes(name2)) {
                    if (!info.progress) {
                        if (info.award) text += "";
                        else text += "（0/1）";
                    } else {
                        if (info.award) {
                            text += "";
                        } else {
                            let pog = game.xjzh_getQishuConfig().achi.progress[name2] || 0;
                            text += '（' + pog + '/' + info.progress + '）';
                        }
                    }
                }
                //<--
                text += "<br>";
                //显示奖励
                if (info.extra) {
                    if (typeof info.extra == 'function') {
                        text += info.extra();
                    } else {
                        text += "<br><span style='font-size:22px;'>&nbsp;&nbsp;";
                        text += info.extra;
                        text += "</span>";
                    }
                }
                //显示设计者
                if (info.design) {
                    if (typeof info.design == 'function') {
                        text += "设计：" + info.design();
                    } else {
                        text += "<br><span style='font-size:22px;'>&nbsp;&nbsp;设计：";
                        text += info.design;
                        text += "</span>";
                    }
                }
                //<--
                text += '</p>';
            }
            text += "<br><br><br><br><br><br><br>";
            content.innerHTML = text;
        }
    };
    state.refreshList();
    //过滤器
    var filterButton = ui.create.div('.xjzh-achiWindow-openFilter', bk);
    filterButton.listen(function () {
        var filterWindow = ui.create.div('.xjzh-achiWindow-filterWindow', bk);
        var filterExit = ui.create.div('.xjzh-achiWindow-filterExit', filterWindow);
        filterExit.listen(function () {
            filterWindow.delete();
            state.refreshList();
        });
        var hiden_done = ui.create.div('.xjzh-achiWindow-filter-lv4', filterWindow);
        if (state.hideGained) {
            hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
        }
        hiden_done.innerHTML = '<br><img src="' + lib.assetURL + 'extension/仙家之魂/css/images/achievement/isGained2.png" style="height:30px;"/>&thinsp;显示完成成就&emsp;&thinsp;';
        hiden_done.listen(function () {
            state.hideGained = !state.hideGained;
            if (state.hideGained) {
                hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
            } else {
                hiden_done.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
            }
        });
        var hiden_lv3 = ui.create.div('.xjzh-achiWindow-filter-lv3', filterWindow);
        if (game.xjzhAchi.hideLevel.includes(3)) {
            hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
        }
        hiden_lv3.innerHTML = '<br><img src="' + lib.assetURL + 'extension/仙家之魂/css/images/achievement/star3.png" style="height:30px;"/>&thinsp;显示三星成就&emsp;&thinsp;';
        hiden_lv3.listen(function () {
            if (game.xjzhAchi.hideLevel.includes(3)) {
                game.xjzhAchi.hideLevel.remove(3);
                hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
            } else if (game.xjzhAchi.hideLevel.length < 2) {
                game.xjzhAchi.hideLevel.push(3);
                hiden_lv3.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
            }
        });
        var hiden_lv2 = ui.create.div('.xjzh-achiWindow-filter-lv2', filterWindow);
        if (game.xjzhAchi.hideLevel.includes(2)) {
            hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
        }
        hiden_lv2.innerHTML = '<img src="' + lib.assetURL + 'extension/仙家之魂/css/images/achievement/star2.png" style="height:30px;"/>&thinsp;显示二星成就&emsp;&thinsp;';
        hiden_lv2.listen(function () {
            if (game.xjzhAchi.hideLevel.includes(2)) {
                game.xjzhAchi.hideLevel.remove(2);
                hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
            } else if (game.xjzhAchi.hideLevel.length < 2) {
                game.xjzhAchi.hideLevel.push(2);
                hiden_lv2.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
            }
        });
        var hiden_lv1 = ui.create.div('.xjzh-achiWindow-filter-lv1', filterWindow);
        if (game.xjzhAchi.hideLevel.includes(1)) {
            hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
        }
        hiden_lv1.innerHTML = '<br><img src="' + lib.assetURL + 'extension/仙家之魂/css/images/achievement/star.png" style="height:30px;"/>&thinsp;显示一星成就&emsp;&thinsp;';
        hiden_lv1.listen(function () {
            if (game.xjzhAchi.hideLevel.includes(1)) {
                game.xjzhAchi.hideLevel.remove(1);
                hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional.png');
            } else if (game.xjzhAchi.hideLevel.length < 2) {
                game.xjzhAchi.hideLevel.push(1);
                hiden_lv1.setBackgroundImage('extension/仙家之魂/css/images/achievement/filter_optional_on.png');
            }
        });
    });
}
