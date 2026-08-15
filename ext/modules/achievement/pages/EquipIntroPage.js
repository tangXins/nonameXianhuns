import { lib, game, ui, get, ai, _status } from '../../../../../../../noname.js';

//打开奇术要件信息页面
export function openAchievementEquipIntro(item, state, isCrafted, craftedEntry) {
    if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
    isCrafted = !!isCrafted;
    //覆盖图层
    var bookWindow = ui.create.div('.xjzh-bookWindow');
    document.body.appendChild(bookWindow);
    //背景图层
    var bk = ui.create.div('.xjzh-bookWindow-bk', bookWindow, {
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/bk.png')",
    });

    //退出按钮
    var exit = ui.create.div('.xjzh-bookWindow-return', bk);
    exit.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
    });
    //主页书签
    var mainPage = ui.create.div('.xjzh-bookWindow-page-main', bk);
    mainPage.listen(function () {
        bookWindow.remove();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementMainPage();
    });
    //奇术要件书签
    var equipMark = ui.create.div('.xjzh-equipPage-equipMark', bk);
    var equipMarkBox = ui.create.div(bk, {
        top: '60%', left: '12%',
        height: '13%', width: '5%',
        zIndex: '3',
    });
    equipMarkBox.listen(function () {
        bookWindow.remove();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementEquipPage(state.pageNum, state.zhuanshu_on);
    });
    //奇术要件名字
    var info = get.xjzh_equipInfo(item);
    var nameDialog = ui.create.div(bk, {
        top: '8%', height: '8%',
        left: '53%', width: '20%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/kuang.png')", backgroundSize: '100%',
    });
    var displayName = info.translate;
    if (isCrafted && craftedEntry) {
        var entryName = craftedEntry.displayName || '';
        if (entryName) displayName = entryName;
    }
    var nameText = ui.create.div(bk, {
        top: '10.5%', height: 'auto',
        left: '53%', width: '21%',
        textAlign: 'center', fontFamily: 'xinwei',
        color: 'rgb(185, 111, 1)', letterSpacing: '3px',
        transform: 'rotateZ(-3.5deg)', textShadow: 'none',
    })
    nameText.innerHTML = displayName;
    //奇术要件图片
    var bk2 = ui.create.div('.xjzh-bookWindow-bk', bookWindow, {
        zIndex: '0',
    });
    var mengban = ui.create.div(bk2, {
        top: '17%', height: '38%',
        left: '50%', width: '33%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/lihui/" + item + ".jpg')", backgroundSize: '100%',
    });
    //奇术要件介绍
    var textIntro = ui.create.div(bk, {
        top: '18%', height: '31%',
        left: '53%', width: '28%',
        fontFamily: 'shousha', color: 'rgb(46, 45, 45)', letterSpacing: '3px',
        overflow: 'auto', textShadow: 'none',
    });
    textIntro.innerHTML = info.translate_info;
    if (isCrafted && craftedEntry) {
        var entryTalents = craftedEntry.talents || [];
        if (entryTalents.length > 0) {
            textIntro.innerHTML += '<br><br><span style="color:#B8860B;font-size:14px;font-weight:bold;">✦ 天赋词缀：</span>';
            textIntro.innerHTML += '<span style="color:#DAA520;font-size:13px;">' + entryTalents.join('、') + '</span>';
        }
    }
    textIntro.hide();
    //切换按钮
    var changeBtm = ui.create.div(bk, {
        top: '50%', height: '5%',
        left: '77%', width: '3%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/changeBtm.png')", backgroundSize: '100%',
    });
    changeBtm.listen(function () {
        if (mengban.classList.contains('hidden')) {
            textIntro.hide();
            mengban.show();
        } else {
            mengban.hide();
            textIntro.show();
        }
    });
    //分割线
    var line = ui.create.div(bk, {
        top: '55%', height: '3%',
        left: '52%', width: '30%',
        backgroundPosition: '0% 50%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/xian.png')", backgroundSize: '100%',
    })
    //装配文字
    var numText = ui.create.div(bk, {
        top: '58%', height: '5%',
        left: '53%', width: '30%',
        color: 'rgb(41, 25, 1)', fontFamily: 'xingkai',
        fontSize: ui.window.offsetHeight * 0.04 + 'px', textShadow: 'none'
    });
    var num = state.map[item] || 0;
    var craftedCount = state.craftedMap ? (state.craftedMap[item] || 0) : 0;
    if (isCrafted) {
        numText.innerHTML = '装配选择：' + displayName;
    } else {
        var displayCount = Math.max(0, num - craftedCount);
        numText.innerHTML = '装配选择：' + displayName;
    }

    //奇术要件分解按钮
    if ((isCrafted && craftedEntry) || (!isCrafted && num >= 1)) {
        var qishudisen = ui.create.div(bk, {
            top: '50%', height: '5%',
            left: '55%', width: '3%',
            backgroundRepeat: 'no-repeat',
            backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/disintegrate.png')", backgroundSize: '100%',
        });

        qishudisen.listen(function () {
            if (isCrafted && craftedEntry) {
                game.xjzh_loseCraftedEquip(craftedEntry.uid);
            } else {
                game.xjzh_loseEquip(item);
            }
            game.xjzh_changeSuipian(105);
            let loading = game.xjzh_openLoading(`获得105个碎片`);
            setTimeout(function () {
                loading.close();
            }, 1500);
            state.refreshDialog();

            game.delayx();
        });
    };
    //信息窗口
    var intro = ui.create.div(bookWindow, {
        zIndex: '51',
        width: '300px',
        textAlign: 'left',
        backgroundColor: '#412812',
        transition: 'left 0s,top 0s'
    });
    //装配选择
    var characterDialog = null, qishuEquip = null;
    state.refreshDialog = function () {
        state.refreshMap();
        if (intro) intro.hide();
        var num = state.map[item] || 0;
        var craftedCount = state.craftedMap ? (state.craftedMap[item] || 0) : 0;
        if (isCrafted) {
            numText.innerHTML = '装配选择：' + displayName;
        } else {
            var displayCount = Math.max(0, num - craftedCount);
            numText.innerHTML = '装配选择：' + displayName;
        }
        if (characterDialog) characterDialog.remove();
        if (qishuEquip) qishuEquip.remove();
        characterDialog = ui.create.div(bk, {
            top: '62.5%', height: '15%',
            left: '53%', width: '30%',
            borderRadius: '15px',
            backgroundColor: 'rgba(88, 53, 2, 0.806)',
            overflowX: 'auto',
        });
        characterDialog.addEventListener('wheel', function (event) {
            event.preventDefault();
            this.scrollLeft += event.deltaY;
        });
        var equiped = get.xjzh_equipPlayer(item);
        var i = 0;
        for (; i < equiped.length; i++) {
            var kuang = ui.create.div(characterDialog, {
                top: '5%', height: '90%',
                left: i * 30 + 2 + '%', width: '25%', borderRadius: '10px',
            });
            kuang.setBackground(equiped[i], 'character');
            kuang.player = equiped[i];
            kuang.listen(function () {
                game.xjzh_unEquip(item, this.player);
                state.refreshDialog();
            });
        }
        if (num > 0 || isCrafted) {
            var addPlayer = ui.create.div(characterDialog, {
                top: '5%', height: '90%',
                left: i * 30 + 2 + '%', width: '25%',
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/touxiang.png')", backgroundSize: '100%',
            });
            addPlayer.listen(function () {
                game.xjzhAchi.choosePlayer(item, state, bk);
            });
        }

        //符文装备提示文字
        var fuwenText = ui.create.div(bk, {
            top: '77.5%', height: '5%',
            left: '53%', width: '30%',
            color: 'rgb(41, 25, 1)', fontFamily: 'xingkai',
            fontSize: ui.window.offsetHeight * 0.04 + 'px', textShadow: 'none'
        });
        fuwenText.innerHTML = `符文装备选项：`;
        //装备符文背景
        qishuEquip = ui.create.div(bk, {
            top: '81.8%',
            height: '12%',
            left: '53%',
            width: '30%',
            borderRadius: '15px',
            backgroundColor: 'rgba(88, 53, 2, 0.806)',
            overflowX: 'auto',
            overflowY: 'hidden',
            minHeight: '12%',
            // 确保滚动条样式可见
            scrollbarWidth: 'auto',
            WebkitOverflowScrolling: 'touch',
        });
        qishuEquip.addEventListener('wheel', function (event) {
            event.preventDefault();
            this.scrollLeft += event.deltaY;
        });
        //qishuEquip.innerHTML = "装备";
        let runesEquip = get.xjzh_runeQishuList(item);
        let runesEquips = Array.isArray(runesEquip) ? runesEquip : [];
        let ritualList = get.xjzh_runeListName("ritual");
        if (ritualList.length) {
            if (item === "xjzh_qishu_bubaiwangzhe") {
                let bubaiQishuList = get.xjzh_runeQishuList(item).filter(i => get.xjzh_runeType(i) == "ritual");
                let bubaiQishuLists = [...bubaiQishuList];
                for (let i = 0; i < 3; i++) {
                    //仪式符文按钮
                    var ritualFuwen = ui.create.div(qishuEquip, {
                        top: '23%',
                        left: i * 16 + 3.5 + '%',
                        height: '56%',
                        width: '13%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        zIndex: 1,
                        overflow: 'auto',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunesImage.png')`,
                    });
                    if (bubaiQishuList.length) {
                        ritualFuwen.identifier = bubaiQishuLists[i];
                        bubaiQishuList.remove(ritualFuwen.identifier);
                        // 显示对应符文图片
                        ritualFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/image/runes/${ritualFuwen.identifier}.png`);
                        ritualFuwen.style.backgroundSize = 'contain';
                        ritualFuwen.style.backgroundRepeat = 'no-repeat';
                        ritualFuwen.style.backgroundPosition = 'center';
                    }
                    ritualFuwen.listen(function () {
                        /*bookWindow.delete();
                        game.resume2();*/
                        lib.onresize.remove(resize);
                        if (this.identifier) {
                            game.xjzh_unEquipRune(item, this.identifier);
                            state.refreshDialog();
                            //ritualFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunesImage.png`);
                            //game.xjzhAchi.openAchievementEquipIntro(item, state);
                            state.refreshDialog();
                        } else {
                            game.xjzhAchi.openShowRunePack(item, "ritual", this, state);
                        }
                    });
                    if (ritualFuwen.identifier) {
                        let rune = ritualFuwen.identifier, type = get.xjzh_runeType(rune);
                        ritualFuwen.onmouseover = function (event) {
                            var str = '';
                            str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                                + get.xjzh_runeTranslate(rune, type) + '（' + get.xjzh_runeTypeTranslate(rune) + '）</span><br>';
                            str += get.xjzh_runeTranslateInfo(rune, type) + '</span>';
                            intro.innerHTML = str;
                            bookWindow.appendChild(intro);
                            intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                            intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                            intro.show();
                        };
                        ritualFuwen.onmousemove = function (event) {
                            intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                            intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                        };
                        ritualFuwen.onmouseout = function () {
                            intro.hide();
                        };
                        var removeIntroOnWheel = function (event) {
                            if (event.deltaY !== 0) {
                                intro.remove();
                                ritualFuwen.removeEventListener('wheel', removeIntroOnWheel);
                            }
                        };
                        ritualFuwen.addEventListener('wheel', removeIntroOnWheel);
                    }
                }
            } else {
                //仪式符文按钮
                var ritualFuwen = ui.create.div(qishuEquip, {
                    top: '5%',
                    height: '90%',
                    left: '22%',
                    width: '25%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '80%',
                    backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/${game.xjzh_hasEquipRunes(item, "ritual") ? "ritualRunes" : "ritualRunesImage"}.png')`,
                });
                // 如果已装备仪式符文，显示对应符文图片
                if (game.xjzh_hasEquipRunes(item, "ritual")) {
                    var equippedRune = runesEquips.find(i => get.xjzh_runeType(i) == "ritual");
                    if (equippedRune) {
                        ritualFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/image/runes/${equippedRune}.png`);
                        ritualFuwen.style.backgroundSize = 'contain';
                        ritualFuwen.style.backgroundRepeat = 'no-repeat';
                        ritualFuwen.style.backgroundPosition = 'center';
                    }
                }
                ritualFuwen.listen(function () {
                    /*bookWindow.delete();
                    game.resume2();*/
                    lib.onresize.remove(resize);
                    if (game.xjzh_hasEquipRunes(item, "ritual")) {
                        game.xjzh_unEquipRune(item, runesEquips.find(i => get.xjzh_runeType(i) == "ritual"));
                        state.refreshDialog();
                        //ritualFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/css/images/runes/ritualRunesImage.png`);
                        //game.xjzhAchi.openAchievementEquipIntro(item, state);
                        state.refreshDialog();
                    } else {
                        game.xjzhAchi.openShowRunePack(item, "ritual", this, state);
                    }
                });
                if (game.xjzh_hasEquipRunes(item, "ritual")) {
                    let rune = runesEquips.find(i => get.xjzh_runeType(i) == "ritual"), type = get.xjzh_runeType(rune);
                    ritualFuwen.onmouseover = function (event) {
                        var str = '';
                        str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                            + get.xjzh_runeTranslate(rune, type) + '（' + get.xjzh_runeTypeTranslate(rune) + '）</span><br>';
                        str += get.xjzh_runeTranslateInfo(rune, type) + '</span>';
                        intro.innerHTML = str;
                        bookWindow.appendChild(intro);
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                        intro.show();
                    };
                    ritualFuwen.onmousemove = function (event) {
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                    };
                    ritualFuwen.onmouseout = function () {
                        intro.hide();
                    };
                    var removeIntroOnWheel = function (event) {
                        if (event.deltaY !== 0) {
                            intro.remove();
                            ritualFuwen.removeEventListener('wheel', removeIntroOnWheel);
                        }
                    };
                    ritualFuwen.addEventListener('wheel', removeIntroOnWheel);
                }
            }
        }

        let prayList = get.xjzh_runeListName("pray");
        if (prayList.length) {
            if (item === "xjzh_qishu_bubaiwangzhe") {
                let bubaiQishuList = get.xjzh_runeQishuList(item).filter(i => get.xjzh_runeType(i) == "pray");
                let bubaiQishuLists = [...bubaiQishuList];
                let num = 0;
                for (let i = 3; i < 6; i++) {
                    //祷告符文按钮
                    var prayFuwen = ui.create.div(qishuEquip, {
                        top: '23%',
                        left: i * 16 + 3.5 + '%',
                        height: '56%',
                        width: '13%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        zIndex: 1,
                        overflowX: 'auto',
                        backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunesImage.png')`,
                    });
                    if (bubaiQishuList.length) {
                        prayFuwen.identifier = bubaiQishuLists[num];
                        bubaiQishuList.remove(prayFuwen.identifier);
                        // 显示对应符文图片
                        prayFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/image/runes/${prayFuwen.identifier}.png`);
                        prayFuwen.style.backgroundSize = 'contain';
                        prayFuwen.style.backgroundRepeat = 'no-repeat';
                        prayFuwen.style.backgroundPosition = 'center';
                    }
                    prayFuwen.listen(function () {
                        /*bookWindow.delete();
                        game.resume2();*/
                        lib.onresize.remove(resize);
                        if (this.identifier) {
                            game.xjzh_unEquipRune(item, this.identifier);
                            state.refreshDialog();
                            //prayFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunesImage.png`);
                            //game.xjzhAchi.openAchievementEquipIntro(item, state);
                        } else {
                            game.xjzhAchi.openShowRunePack(item, "pray", this, state);
                        }
                    });

                    if (prayFuwen.identifier) {
                        let rune = prayFuwen.identifier, type = get.xjzh_runeType(rune);
                        prayFuwen.onmouseover = function (event) {
                            var str = '';
                            str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                                + get.xjzh_runeTranslate(rune, type) + '（' + get.xjzh_runeTypeTranslate(rune) + '）</span><br>';
                            str += get.xjzh_runeTranslateInfo(rune, type) + '</span>';
                            intro.innerHTML = str;
                            bookWindow.appendChild(intro);
                            intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                            intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                            intro.show();
                        };
                        prayFuwen.onmousemove = function (event) {
                            intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                            intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                        };
                        prayFuwen.onmouseout = function () {
                            intro.hide();
                        };
                        var removeIntroOnWheel = function (event) {
                            if (event.deltaY !== 0) {
                                intro.remove();
                                prayFuwen.removeEventListener('wheel', removeIntroOnWheel);
                            }
                        };
                        prayFuwen.addEventListener('wheel', removeIntroOnWheel);
                    }
                    num++;
                }
            } else {
                //祷告符文按钮
                var prayFuwen = ui.create.div(qishuEquip, {
                    top: '5%',
                    height: '90%',
                    left: '53%',
                    width: '25%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '80%',
                    backgroundImage: `url('${lib.assetURL}extension/仙家之魂/css/images/runes/${game.xjzh_hasEquipRunes(item, "pray") ? "prayRunes" : "prayRunesImage"}.png')`,
                });
                // 如果已装备祷告符文，显示对应符文图片
                if (game.xjzh_hasEquipRunes(item, "pray")) {
                    var equippedPrayRune = runesEquips.find(i => get.xjzh_runeType(i) == "pray");
                    if (equippedPrayRune) {
                        prayFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/image/runes/${equippedPrayRune}.png`);
                        prayFuwen.style.backgroundSize = 'contain';
                        prayFuwen.style.backgroundRepeat = 'no-repeat';
                        prayFuwen.style.backgroundPosition = 'center';
                    }
                }
                prayFuwen.listen(function () {
                    /*bookWindow.delete();
                    game.resume2();*/
                    lib.onresize.remove(resize);
                    if (game.xjzh_hasEquipRunes(item, "pray")) {
                        game.xjzh_unEquipRune(item, runesEquips.find(i => get.xjzh_runeType(i) == "pray"));
                        state.refreshDialog();
                        //prayFuwen.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/css/images/runes/prayRunesImage.png`);
                        //game.xjzhAchi.openAchievementEquipIntro(item, state);
                    } else {
                        game.xjzhAchi.openShowRunePack(item, "pray", this, state);
                    }
                });

                if (game.xjzh_hasEquipRunes(item, "pray")) {
                    let rune = runesEquips.find(i => get.xjzh_runeType(i) == "pray"), type = get.xjzh_runeType(rune);
                    prayFuwen.onmouseover = function (event) {
                        var str = '';
                        str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                            + get.xjzh_runeTranslate(rune, type) + '（' + get.xjzh_runeTypeTranslate(rune) + '）</span><br>';
                        str += get.xjzh_runeTranslateInfo(rune, type) + '</span>';
                        intro.innerHTML = str;
                        bookWindow.appendChild(intro);
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                        intro.show();
                    };
                    prayFuwen.onmousemove = function (event) {
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                    };
                    prayFuwen.onmouseout = function () {
                        intro.hide();
                    };
                    var removeIntroOnWheel = function (event) {
                        if (event.deltaY !== 0) {
                            intro.remove();
                            prayFuwen.removeEventListener('wheel', removeIntroOnWheel);
                        }
                    };
                    prayFuwen.addEventListener('wheel', removeIntroOnWheel);
                }

            }
        }
    }
    state.refreshDialog();
    //左侧图片
    var left = ui.create.div(bk, {
        top: '4%', height: '100%',
        left: '16%', width: '37%',
        zIndex: '1', backgroundPosition: '50% -200%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/left.png')", backgroundSize: '115% 99%',
    });
    var extraInfo = ui.create.div(left, {
        top: '17%', height: '50%',
        left: '20%', width: '65%',
        transform: 'rotateZ(-11deg)', overflow: 'auto',
        fontFamily: 'shousha', color: 'rgb(46, 45, 45)', textShadow: 'none', fontWeight: 'bold'
    });
    extraInfo.innerHTML = info.extra;

    //大小调整
    var setSize = function () {
        var screenWidth = ui.window.offsetWidth;
        var screenHeight = ui.window.offsetHeight;
        var whr = 1.77778;
        var width;
        var height;
        if (screenWidth / whr > screenHeight) {
            height = screenHeight;
            width = height * whr;
        } else {
            width = screenWidth;
            height = screenWidth / whr;
        }
        bk.style.height = Math.round(height) + "px";
        bk.style.width = Math.round(width) + "px";
        bk2.style.height = Math.round(height) + "px";
        bk2.style.width = Math.round(width) + "px";
        nameText.style.fontSize = screenHeight * 0.03 + 'px';
        extraInfo.style.fontSize = screenHeight * 0.038 + 'px';
        textIntro.style.fontSize = screenHeight * 0.035 + 'px';
        characterDialog.style.fontSize = screenHeight * 0.07 + 'px';
    };
    setSize();
    var resize = function () {
        setTimeout(setSize, 500);
    };
    lib.onresize.push(resize);
}
