import { lib, game, ui, get, ai, _status } from '../../../../../../noname.js';

//打开奇术要件视窗
export function openAchievementEquipPage(...args) {
        if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
        var pageNumDefault = 0, zhuanshuDefault = true, tongyongDefault = false;
        for (let arg of args) {
            if (typeof arg == 'number') pageNumDefault = arg;
            else if (typeof arg == 'boolean') {
                zhuanshuDefault = arg;
                tongyongDefault = !arg;
            }
        }

        var { window: bookWindow, bk, resize } = game.xjzh_createPageFrame({
            windowClass: '.xjzh-bookWindow',
            bgClass: '.xjzh-bookWindow-bk',
        });

        //头像
        var qishuImage = ui.create.div(bk, {
            position: 'absolute',
            left: '18.5%',
            top: '7.6%',
            width: '4%',
            height: '7%',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: '50%',
            zIndex: 1,
        });
        var qishuImageUrl;
        qishuImageUrl = game.getExtensionConfig("仙家之魂", "xjzh_qishuImageUrl") ? game.getExtensionConfig("仙家之魂", "xjzh_qishuImageUrl") : `${lib.assetURL}extension/仙家之魂/css/images/user/title.png`;
        qishuImage.setBackgroundImage(qishuImageUrl);

        //边框
        var qishuImageInfo = ui.create.div(bk, {
            position: 'absolute',
            left: '17.5%',
            top: '5.5%',
            width: '6%',
            height: '10.8%',
            backgroundSize: "75%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: '50%',
            zIndex: 3,
        });
        qishuImageInfo.setBackgroundImage(`${lib.assetURL}/extension/仙家之魂/css/images/user/title2.png`);

        var qishuImageSvip = ui.create.div(bk, {
            position: 'absolute',
            left: '17.7%',
            top: '1%',
            width: '6%',
            height: '10.8%',
            backgroundSize: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: '50%',
            zIndex: 2,
        });
        let boolSvip = get.xjzh_checkSvipDate();

        qishuImageSvip.setBackgroundImage(`${lib.assetURL}/extension/仙家之魂/css/images/user/${!boolSvip ? "nosvip" : "svip"}.png`);

        //用户名
        var qishuName = ui.create.div(bk, {
            position: 'absolute',
            left: '24%',
            top: '7%',
            width: 'auto',
            height: 'auto',
            textAlign: 'left',
            zIndex: 2,
        });

        function adjustFontSize() {
            var screenWidth = window.innerWidth;

            var baseSize = 10;
            var scaleFactor = screenWidth / 1200;
            var newSize = Math.max(baseSize * scaleFactor, 8);
            qishuName.style.fontSize = newSize + 'px';
        }

        adjustFontSize();

        lib.onresize.push(adjustFontSize);

        if (typeof get.xjzh_qishuUserLevel() !== "number" || typeof get.xjzh_qishuUserExp() != "number") game.xjzh_levelUp({ level: 1, exp: 0 });

        let requiredExp, level = get.xjzh_qishuUserLevel();
        if (level < 20) {
            requiredExp = 30 + 15 * level;
        }
        else if (level < 50) {
            requiredExp = 86 + 50 * level;
        }
        else {
            requiredExp = 3500 + 800 * (level - 50);
        }
        let qishuNameStr = `用户名：${get.xjzh_qishuUserName()}<br>等级：${level}<br>经验：${get.xjzh_qishuUserExp()}/${get.xjzh_qishuUserLevel() < 100 ? requiredExp : 0}`;
        qishuName.innerHTML = qishuNameStr;

        //打开会员中心
        qishuName.listen(function () {
            bookWindow.remove();
            lib.onresize.remove(adjustFontSize);
            game.resume2();
            game.xjzhAchi.openMemberCenterPage();
        });

        qishuImageInfo.listen(function () {
            bookWindow.remove();
            game.resume2();
            lib.onresize.remove(adjustFontSize);
            game.xjzhAchi.openMemberCenterPage();
        });

        //退出按钮
        var exit = ui.create.div('.xjzh-bookWindow-return', bk);
        exit.listen(function () {
            bookWindow.delete();
            game.resume2();
            lib.onresize.remove(resize);
            lib.onresize.remove(adjustFontSize);
        });
        //主页书签
        var mainPage = ui.create.div('.xjzh-bookWindow-page-main', bk);
        mainPage.listen(function () {
            bookWindow.remove();
            game.resume2();
            lib.onresize.remove(resize);
            game.xjzhAchi.openAchievementMainPage();
        });
        //兑换码兑换处
        var duihuan = ui.create.div('.xjzh-duihuan-gain', bk);
        var duihuanBox = ui.create.div(duihuan, {
            left: '0', width: '100%',
            transform: 'rotateZ(27deg)',
            opacity: '0.2',
            top: '30%', height: '30%',
        });
        duihuanBox.listen(function () {
            var blank = ui.create.div(ui.window, {
                zIndex: '1000',
                left: '0', width: '100%',
                top: '0', height: '100%'
            });
            var inputDiv = ui.create.div(blank, {
                left: '50%', top: '30%',
                transform: 'translate(-50%, -50%)',
                width: '400px', height: '270px',
                textAlign: 'center',
                backgroundSize: '100%',
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/duihuanma.png')",
            });
            var input = ui.create.node('input', inputDiv, {
                top: '110px', left: '80px',
                position: 'absolute',
                width: '230px', height: '20px',
                background: 'none', borderStyle: 'none'
            });

            var cancelBtm = ui.create.div(inputDiv, {
                right: '35px', width: '25px',
                top: '42px', height: '25px',
            }, function () {
                blank.delete();
            });

            input.id = 'xjzh_input';
            var okBtm = ui.create.div(inputDiv, {
                left: '153px', width: '100px',
                bottom: '55px', height: '35px',
            }, function () {
                var value = document.getElementById('xjzh_input').value;
                var url = "extension/仙家之魂/keys/兑换列表.json";
                game.readFileAsText(url, function (data) {
                    var keys = JSON.parse(lib.init.decode(data));
                    var keysList = Object.keys(keys);
                    if (keysList.includes(value)) {
                        if (game.xjzh_hasKeys(value)) {
                            game.xjzh_openLoading('你已经兑换过了！');
                        } else {
                            var str = "兑换成功！获得：";
                            var object = keys[value];
                            for (var i in object) {
                                if (i == "date") {
                                    let time = object["date"]
                                    if (get.xjzh_checkDate(time[0], time[1]) == false) {
                                        game.xjzh_openLoading(`兑换码已超出兑换时间！<br><br>兑换时间为:<br>${time[0]}——${time[1]}`);
                                        break;
                                    }
                                }
                                switch (i) {
                                    case "jingpo":
                                        game.xjzh_changeTokens(object[i]);
                                        str += "<br>&emsp;&emsp;精魄（" + object[i] + "个）";
                                        break;
                                    case "suipian":
                                        game.xjzh_changeSuipian(object[i]);
                                        str += "<br>&emsp;&emsp;碎片（" + object[i] + "个）";
                                        break;
                                    case "cailiao":
                                        for (var k in object[i]) {
                                            game.xjzh_changeCailiao(k, object[i][k]);
                                            str += "<br>&emsp;&emsp;" + get.xjzh_cailiaoTranslate(k) + "：（" + object[i][k] + "个）";
                                        }
                                        break;
                                    case "svip":
                                        game.xjzh_gainSvipTime(object[i])
                                        str += `<br>&emsp;&emsp;超级会员：（${object[i]}天）`;
                                        break;
                                }
                            }
                            game.xjzh_saveKeys(value);
                            if (str.length > 8) game.xjzh_qishuWinner("神秘兑换", str);
                        }
                    } else {
                        game.xjzh_openLoading('兑换码错误或已失效！');
                    }
                });
            });



            /*function(){
                var value=document.getElementById('xjzh_input').value;
                const url='https://101.34.7.123/xjzh/keys/兑换列表.json';
                fetch(url,{
                    method: 'GET',
                    mode:'cors',// 允许发送跨域请求
                    credentials: 'include',
                    headers: {
                        'Cache-Control': 'no-cache'//不缓存
                    }
                })
                .then(response => {
                    if (!response.ok) throw response;
                    return response.text();
                })
                .then(text => {
                    var keys=JSON.parse(lib.init.decode(text));
                    var keysList=Object.keys(keys);
                    if(keysList.includes(value)){
                        if(game.xjzh_hasKeys(value)){
                            game.xjzh_openLoading('你已经兑换过了！');
                        }else{
                            game.xjzh_saveKeys(value)
                            var str="兑换成功！获得：";
                            var object=keys[value]
                            for(var i in object){
                                switch(i){
                                    case "jingpo":
                                        game.xjzh_changeTokens(object[i]);
                                        str+="<br>&emsp;&emsp;精魄（"+object[i]+"个）";
                                    break;
                                    case "suipian":
                                        game.xjzh_changeSuipian(object[i]);
                                        str+="<br>&emsp;&emsp;碎片（"+object[i]+"个）";
                                    break;
                                    case "cailiao":
                                        for(var k in object[i]){
                                            game.xjzh_changeCailiao(k,object[i][k]);
                                            str+="<br>&emsp;&emsp;"+get.xjzh_cailiaoTranslate(k)+"：（"+object[i][k]+"个）";
                                        }
                                    break;
                                }
                            }
                            game.xjzh_qishuWinner("神秘兑换",str);
                        }
                    }else{
                        game.xjzh_openLoading('兑换码错误或已失效！');
                    }
                })
                .catch(e => {
                    alert('网络请求错误');
                });
            });*/
        });
        //恩赐书签
        var equipRandom = ui.create.div('.xjzh-equipPage-equipRandom', bk);
        equipRandom.listen(function () {
            bookWindow.remove();
            game.resume2();
            lib.onresize.remove(resize);
            game.xjzhAchi.openAchievementChoujiang();
        });
        //翻页箭头
        var arrow = ui.create.div('.xjzh-equipPage-arrow', bk);
        arrow.listen(function () {
            state.pageNum++;
            state.refreshPage();
        });
        var arrow2 = ui.create.div('.xjzh-equipPage-arrow2', bk);
        arrow2.listen(function () {
            state.pageNum--;
            state.refreshPage();
        });

        // 创建节流函数
        function throttle(func, delay) {
            let lastTime = 0;
            return function () {
                const now = new Date().getTime();
                if (now - lastTime > delay) {
                    lastTime = now;
                    func.apply(this, arguments);
                }
            };
        }

        // 使用节流包装原有处理函数
        const handleWheel = throttle(function (event) {
            event.preventDefault();

            // 获取总页数并更新页码
            const totalPages = Math.ceil(state.equipNum / 8);

            if (event.deltaY < 0) { // 向上滚动
                state.pageNum = (state.pageNum - 1 + totalPages) % totalPages; // 循环回到上一页
            } else { // 向下滚动
                state.pageNum = (state.pageNum + 1) % totalPages; // 循环进入下一页
            }

            state.refreshPage();
        }, 100); // 限制每100毫秒内只执行一次

        // 添加节流后的事件监听器
        bk.addEventListener('wheel', handleWheel);

        //专属奇术要件书签
        var zhuanshu = ui.create.div('.xjzh-equipPage-zhuanshu', bk);
        zhuanshu.listen(function () {
            if (state.zhuanshu_on) return;
            state.zhuanshu_on = !state.zhuanshu_on;
            state.tongyong_on = !state.tongyong_on;
            state.pageNum = 0;
            state.refreshPage();
        });
        //通用奇术要件书签
        var tongyong = ui.create.div('.xjzh-equipPage-tongyong', bk);
        tongyong.listen(function () {
            if (state.tongyong_on) return;
            state.zhuanshu_on = !state.zhuanshu_on;
            state.tongyong_on = !state.tongyong_on;
            state.pageNum = 0;
            state.refreshPage();
        });

        //背包按钮
        var cailiaoBox = ui.create.div('.xjzh-equipPage-cailiao', bk);
        cailiaoBox.listen(function () {
            bookWindow.remove();
            game.pause2();

            // 关闭已有背包
            var existing = document.getElementById('xjzhBagOverlay');
            if (existing) existing.remove();

            // 获取材料数据
            var cailiaoConfig = game.xjzh_getCailiaoConfig();
            var cailiaoList = get.xjzh_cailiaoList();
            var keys = Object.keys(cailiaoConfig);

            var totalCount = 0;
            var materialData = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var config = cailiaoConfig[key];
                var count = 0;
                if (cailiaoList && cailiaoList[key]) {
                    var val = cailiaoList[key];
                    count = Array.isArray(val) ? (val[1] || 0) : (val || 0);
                }
                totalCount += count;
                var qualityName = key.replace('xjzh_cailiao_', '').replace('Key', '');
                materialData.push({
                    key: key,
                    config: config,
                    count: count,
                    qualityName: qualityName
                });
            }

            // 创建遮罩层
            var overlay = document.createElement('div');
            overlay.id = 'xjzhBagOverlay';
            overlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex !important;align-items:center;justify-content:center;transition:none !important;';

            // 创建面板 - 固定尺寸，窗口小时缩放
            var BASE_WIDTH = 1100;
            var BASE_HEIGHT = 650;
            var panel = document.createElement('div');
            panel.style.cssText = 'position:relative !important;display:block !important;transition:none !important;width:' + BASE_WIDTH + 'px;height:' + BASE_HEIGHT + 'px;background:#1a1a2e;border:3px solid #c9a961;border-radius:15px;box-shadow:0 0 40px rgba(201,169,97,0.5);padding:10px 30px 30px 30px;box-sizing:border-box;overflow:hidden;';
            overlay.appendChild(panel);

            // 创建标题 - 固定在面板顶部
            var header = document.createElement('div');
            header.style.cssText = 'position:relative !important;display:block !important;text-align:center;width:100%;margin-top:5px;margin-bottom:15px;';
            header.innerHTML = '<div style="position:relative !important;display:inline-block;padding:5px 35px;border:2px solid #c9a961;border-radius:10px;background:rgba(201,169,97,0.1);font-family:STXingkai,XingKai,行楷,serif;font-size:24px;color:#c9a961;font-weight:bold;text-shadow:0 0 10px rgba(201,169,97,0.5);letter-spacing:12px;">背包</div>';
            panel.appendChild(header);

            // 创建关闭按钮
            var closeBtn = document.createElement('div');
            closeBtn.style.cssText = 'position:absolute;right:20px;top:20px;width:35px;height:35px;background:rgba(201,169,97,0.3);border:2px solid #c9a961;border-radius:50%;line-height:31px;text-align:center;cursor:pointer;font-size:22px;color:#c9a961;font-weight:bold;';
            closeBtn.textContent = '×';
            panel.appendChild(closeBtn);

            // 创建内容滚动容器 - 绝对定位，严格限制在header下方
            var scrollContainer = document.createElement('div');
            var headerH = header.offsetHeight + 65; // header高度 + margin-top + margin-bottom + 额外间距
            scrollContainer.style.cssText = 'position:absolute !important;left:30px;right:30px;top:' + headerH + 'px;bottom:30px;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;border:3px solid rgba(201,169,97,0.4);border-radius:8px;padding:0 15px 15px 15px;';
            panel.appendChild(scrollContainer);

            // 创建分组容器 - 自适应高度，不铺满整个面板
            var groupContainer = document.createElement('div');
            groupContainer.style.cssText = 'position:relative !important;display:block !important;border:2px solid #c9a961;border-radius:10px;padding:20px;background:rgba(0,0,0,0.3);margin-top:30px;';
            scrollContainer.appendChild(groupContainer);

            // 创建分类标题
            var categoryTitle = document.createElement('div');
            categoryTitle.style.cssText = 'position:relative !important;display:inline-block !important;font-family:STXingkai,XingKai,行楷,serif;font-size:22px;color:#c9a961;font-weight:bold;margin-bottom:15px;padding:5px 15px;border-left:4px solid #c9a961;background:rgba(201,169,97,0.1);';
            categoryTitle.textContent = '巢穴钥匙';
            groupContainer.appendChild(categoryTitle);

            // 创建卡片容器 - 每行5个，自适应高度
            var grid = document.createElement('div');
            grid.style.cssText = 'position:relative !important;display:grid !important;grid-template-columns:repeat(5,1fr);gap:15px;padding:5px;';
            groupContainer.appendChild(grid);

            // 创建卡片 - 3:4 竖版比例
            var CARD_WIDTH = 160;
            var CARD_HEIGHT = 213; // 160 * 4/3 ≈ 213
            var cards = []; // 保存卡片引用用于响应式调整
            for (var i = 0; i < materialData.length; i++) {
                var item = materialData[i];

                // 卡片
                var card = document.createElement('div');
                card.className = 'xjzh-bag-card';

                // 数量标签
                var countLabel = document.createElement('div');
                countLabel.textContent = '×' + item.count;
                card.appendChild(countLabel);

                // 品质标签
                var qualityLabel = document.createElement('div');
                qualityLabel.textContent = item.config.quality;
                card.appendChild(qualityLabel);

                // 图标
                var iconBox = document.createElement('div');
                card.appendChild(iconBox);

                // 名称
                var nameLabel = document.createElement('div');
                nameLabel.textContent = item.config.name;
                card.appendChild(nameLabel);

                // 点击事件 - 查看详情
                card.listen((function(item) {
                    return function() {
                        showItemDetail(item);
                    };
                })(item));

                // 保存引用和配置
                card._itemConfig = item.config;
                card._iconPath = item.config.icon;
                cards.push({
                    card: card,
                    countLabel: countLabel,
                    qualityLabel: qualityLabel,
                    iconBox: iconBox,
                    nameLabel: nameLabel,
                    item: item
                });

                grid.appendChild(card);
            }

            // 应用卡片样式（供初始化和响应式调用）
            function applyCardStyles(scale) {
                var cardW = CARD_WIDTH * scale;
                var cardH = CARD_HEIGHT * scale;
                var iconSize = 100 * scale;
                var fontSize = 13 * scale;
                var countFontSize = 12 * scale;
                var qualityFontSize = 11 * scale;
                var padding = 10 * scale;
                var iconMarginTop = 35 * scale;
                var iconMarginBottom = 10 * scale;

                for (var j = 0; j < cards.length; j++) {
                    var c = cards[j];
                    var cfg = c.item.config;

                    c.card.style.cssText = 'position:relative !important;width:' + cardW + 'px;height:' + cardH + 'px;' +
                        'background-image:' + cfg.bgGradient + ';' +
                        'border:2px solid ' + cfg.borderColor + ';' +
                        'border-radius:' + (12 * scale) + 'px;padding:' + padding + 'px;box-sizing:border-box;' +
                        'box-shadow:0 4px 12px rgba(0,0,0,0.4);' +
                        'transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;';

                    c.countLabel.style.cssText = 'position:absolute;top:' + (6 * scale) + 'px;left:' + (6 * scale) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (3 * scale) + 'px ' + (8 * scale) + 'px;border-radius:' + (12 * scale) + 'px;font-size:' + countFontSize + 'px;font-weight:bold;z-index:2;';

                    c.qualityLabel.style.cssText = 'position:absolute;top:' + (6 * scale) + 'px;right:' + (6 * scale) + 'px;background:' + cfg.borderColor + ';color:#fff;padding:' + (3 * scale) + 'px ' + (8 * scale) + 'px;border-radius:' + (12 * scale) + 'px;font-size:' + qualityFontSize + 'px;font-weight:bold;';

                    c.iconBox.style.cssText = 'position:relative !important;display:block !important;width:' + iconSize + 'px;height:' + iconSize + 'px;border-radius:' + (10 * scale) + 'px;background:rgba(0,0,0,0.4);margin:' + iconMarginTop + 'px auto ' + iconMarginBottom + 'px;border:1px solid rgba(255,255,255,0.3);background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + cfg.icon + ');';

                    c.nameLabel.style.cssText = 'position:relative !important;display:block !important;font-size:' + fontSize + 'px;font-weight:bold;color:' + cfg.textColor + ';text-align:center;text-shadow:0 1px 3px rgba(0,0,0,0.8);padding:' + (3 * scale) + 'px;line-height:1.3;';
                }
            }

            // 创建符文容器
            var runeContainer = document.createElement('div');
            runeContainer.style.cssText = 'position:relative !important;display:block !important;border:2px solid #8b6fb3;border-radius:10px;padding:20px;background:rgba(0,0,0,0.3);margin-top:30px;margin-bottom:20px;';
            scrollContainer.appendChild(runeContainer);

            // 符文分类标题
            var runeTitle = document.createElement('div');
            runeTitle.style.cssText = 'position:relative !important;display:inline-block !important;font-family:STXingkai,XingKai,行楷,serif;font-size:22px;color:#8b6fb3;font-weight:bold;margin-bottom:15px;padding:5px 15px;border-left:4px solid #8b6fb3;background:rgba(139,111,179,0.1);';
            runeTitle.textContent = '符文';
            runeContainer.appendChild(runeTitle);

            // 获取符文数据
            var runeList = get.xjzh_runeList();
            var runeCards = [];
            var runeGrid = document.createElement('div');
            runeGrid.style.cssText = 'position:relative !important;display:grid !important;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding:5px;';
            runeContainer.appendChild(runeGrid);

            for (var ri = 0; ri < runeList.length; ri++) {
                var runeName = runeList[ri];
                var runeCount = get.xjzh_runeListNumber(runeName);
                var runeType = get.xjzh_runeType(runeName);
                var runeTypeTranslate = runeType === 'ritual' ? '仪式' : '祷告';
                var runeColor = runeType === 'ritual' ? '#ff6b35' : '#4ecdc4';
                var runeTranslate = get.xjzh_runeTranslate(runeName, runeType);

                var runeCard = document.createElement('div');
                runeCard._runeData = { name: runeName, count: runeCount, type: runeType, typeTranslate: runeTypeTranslate, translate: runeTranslate };

                var runeIconArea = document.createElement('div');
                runeIconArea.style.cssText = 'position:relative !important;display:block !important;background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + lib.assetURL + 'extension/仙家之魂/image/runes/' + runeName + '.png);';
                runeCard.appendChild(runeIconArea);

                var runeCountLabel = document.createElement('div');
                runeCountLabel.textContent = '×' + runeCount;
                runeCard.appendChild(runeCountLabel);

                var runeTypeLabel = document.createElement('div');
                runeTypeLabel.textContent = runeTypeTranslate;
                runeCard.appendChild(runeTypeLabel);

                var runeNameLabel = document.createElement('div');
                runeNameLabel.textContent = runeTranslate;
                runeCard.appendChild(runeNameLabel);

                // 添加点击事件
                runeCard.listen((function(runeData) {
                    return function() {
                        showRuneDetail(runeData);
                    };
                })(runeCard._runeData));

                runeCards.push({
                    card: runeCard,
                    iconArea: runeIconArea,
                    countLabel: runeCountLabel,
                    typeLabel: runeTypeLabel,
                    nameLabel: runeNameLabel,
                    color: runeColor
                });

                runeGrid.appendChild(runeCard);
            }

            // 创建美元宝箱容器
            var chestContainer = document.createElement('div');
            chestContainer.style.cssText = 'position:relative !important;display:block !important;border:2px solid #FFD700;border-radius:10px;padding:20px;background:rgba(0,0,0,0.3);margin-top:30px;margin-bottom:20px;';
            scrollContainer.appendChild(chestContainer);

            // 宝箱分类标题
            var chestTitle = document.createElement('div');
            chestTitle.style.cssText = 'position:relative !important;display:inline-block !important;font-family:STXingkai,XingKai,行楷,serif;font-size:22px;color:#FFD700;font-weight:bold;margin-bottom:15px;padding:5px 15px;border-left:4px solid #FFD700;background:rgba(255,215,0,0.1);';
            chestTitle.textContent = '美元宝箱';
            chestContainer.appendChild(chestTitle);

            // 获取宝箱数据
            var chestConfig = game.xjzh_getDollarChestConfig();
            var chestList = game.xjzh_getDollarChestList();
            var chestKeys = Object.keys(chestConfig);

            // 过滤掉数量为0的宝箱
            var chestData = [];
            for (var ci = 0; ci < chestKeys.length; ci++) {
                var chestKey = chestKeys[ci];
                var cfg = chestConfig[chestKey];
                var count = chestList[chestKey] || 0;
                if (count > 0) {
                    chestData.push({
                        key: chestKey,
                        config: cfg,
                        count: count
                    });
                }
            }

            // 如果没有宝箱，显示提示
            if (chestData.length === 0) {
                var noChestTip = document.createElement('div');
                noChestTip.style.cssText = 'position:relative !important;display:block !important;text-align:center;padding:30px;color:#666;font-size:14px;';
                noChestTip.textContent = '暂无美元宝箱，对局胜利有几率获得';
                chestContainer.appendChild(noChestTip);
            } else {
                // 创建宝箱网格
                var chestGrid = document.createElement('div');
                chestGrid.style.cssText = 'position:relative !important;display:grid !important;grid-template-columns:repeat(5,1fr);gap:15px;padding:5px;';
                chestContainer.appendChild(chestGrid);

                var chestCards = [];
                for (var cdi = 0; cdi < chestData.length; cdi++) {
                    var chestItem = chestData[cdi];
                    var cfg = chestItem.config;
                    var count = chestItem.count;

                    var chestCard = document.createElement('div');
                    chestCard.className = 'xjzh-chest-card';
                    chestCard.style.cssText = 'position:relative !important;width:160px;height:213px;' +
                        'background-image:' + cfg.bgGradient + ';' +
                        'border:2px solid ' + cfg.borderColor + ';' +
                        'border-radius:12px;padding:10px;box-sizing:border-box;' +
                        'box-shadow:0 4px 12px rgba(0,0,0,0.4);' +
                        'transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;';

                    // 数量标签
                    var chestCountLabel = document.createElement('div');
                    chestCountLabel.style.cssText = 'position:absolute;top:6px;left:6px;background:rgba(0,0,0,0.8);color:#fff;padding:3px 8px;border-radius:12px;font-size:12px;font-weight:bold;z-index:2;';
                    chestCountLabel.textContent = '×' + count;
                    chestCard.appendChild(chestCountLabel);

                    // 品质标签
                    var chestQualityLabel = document.createElement('div');
                    chestQualityLabel.style.cssText = 'position:absolute;top:6px;right:6px;background:' + cfg.borderColor + ';color:#fff;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:bold;';
                    chestQualityLabel.textContent = cfg.quality;
                    chestCard.appendChild(chestQualityLabel);

                    // 图标
                    var chestIconBox = document.createElement('div');
                    chestIconBox.style.cssText = 'position:relative !important;display:block !important;width:100px;height:100px;border-radius:10px;background:rgba(0,0,0,0.4);margin:35px auto 10px;border:1px solid rgba(255,255,255,0.3);background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + cfg.icon + ');';
                    chestCard.appendChild(chestIconBox);

                    // 名称
                    var chestNameLabel = document.createElement('div');
                    chestNameLabel.style.cssText = 'position:relative !important;display:block !important;font-size:13px;font-weight:bold;color:' + cfg.textColor + ';text-align:center;text-shadow:0 1px 3px rgba(0,0,0,0.8);padding:3px;line-height:1.3;';
                    chestNameLabel.textContent = cfg.name.replace('美元宝箱', '');
                    chestCard.appendChild(chestNameLabel);

                    // 点击事件 - 开启宝箱
                    chestCard.listen((function(item) {
                        return function() {
                            showChestConfirm(item);
                        };
                    })(chestItem));

                    chestCards.push({
                        card: chestCard,
                        countLabel: chestCountLabel,
                        qualityLabel: chestQualityLabel,
                        iconBox: chestIconBox,
                        nameLabel: chestNameLabel,
                        item: chestItem
                    });

                    chestGrid.appendChild(chestCard);
                }
            }

            // 显示宝箱确认弹窗
            function showChestConfirm(item) {
                var confirmOverlay = document.createElement('div');
                confirmOverlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:200000;display:flex !important;align-items:center;justify-content:center;transition:none !important;';

                var confirmPanel = document.createElement('div');
                confirmPanel.style.cssText = 'position:relative !important;display:block !important;transition:none !important;width:360px;background:#1a1a2e;border:3px solid ' + item.config.borderColor + ';border-radius:15px;box-shadow:0 0 30px ' + item.config.borderColor + ';padding:30px;box-sizing:border-box;z-index:200001;';

                // 标题
                var confirmTitle = document.createElement('div');
                confirmTitle.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-family:STXingkai,XingKai,行楷,serif;font-size:24px;color:' + item.config.textColor + ';font-weight:bold;margin-bottom:15px;text-shadow:0 0 10px ' + item.config.borderColor + ';';
                confirmTitle.textContent = item.config.name;
                confirmPanel.appendChild(confirmTitle);

                // 图标
                var confirmIcon = document.createElement('div');
                confirmIcon.style.cssText = 'position:relative !important;display:block !important;width:100px;height:100px;border-radius:12px;background:rgba(0,0,0,0.4);margin:0 auto 15px;border:2px solid ' + item.config.borderColor + ';background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + item.config.icon + ');';
                confirmPanel.appendChild(confirmIcon);

                // 奖励范围提示
                var confirmTip = document.createElement('div');
                confirmTip.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:14px;color:#fff;margin-bottom:10px;';
                confirmTip.textContent = '可获得 ' + item.config.minReward + '-' + item.config.maxReward + ' 美元';
                confirmPanel.appendChild(confirmTip);

                // 持有数量
                var confirmCount = document.createElement('div');
                confirmCount.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:16px;color:' + item.config.textColor + ';font-weight:bold;margin-bottom:20px;';
                confirmCount.textContent = '持有数量：×' + item.count;
                confirmPanel.appendChild(confirmCount);

                // 按钮容器
                var btnContainer = document.createElement('div');
                btnContainer.style.cssText = 'position:relative !important;display:flex !important;flex-direction:row !important;align-items:center !important;justify-content:space-between !important;gap:15px !important;margin-top:20px !important;width:100% !important;';

                // 开启按钮
                var openBtn = document.createElement('div');
                openBtn.style.cssText = 'position:relative !important;display:block !important;flex:1 !important;width:45% !important;padding:10px !important;text-align:center !important;background:' + item.config.borderColor + ' !important;border:2px solid ' + item.config.borderColor + ' !important;border-radius:8px !important;cursor:pointer !important;font-size:15px !important;color:#fff !important;font-weight:bold !important;box-sizing:border-box !important;';
                openBtn.textContent = '开启';
                openBtn.listen(function() {
                    confirmOverlay.remove();
                    openChest(item);
                });
                btnContainer.appendChild(openBtn);

                // 取消按钮
                var cancelBtn = document.createElement('div');
                cancelBtn.style.cssText = 'position:relative !important;display:block !important;flex:1 !important;width:45% !important;padding:10px !important;text-align:center !important;background:rgba(201,169,97,0.2) !important;border:2px solid #c9a961 !important;border-radius:8px !important;cursor:pointer !important;font-size:15px !important;color:#c9a961 !important;font-weight:bold !important;box-sizing:border-box !important;';
                cancelBtn.textContent = '取消';
                cancelBtn.listen(function() {
                    confirmOverlay.remove();
                });
                btnContainer.appendChild(cancelBtn);

                confirmPanel.appendChild(btnContainer);
                confirmOverlay.appendChild(confirmPanel);
                document.body.appendChild(confirmOverlay);

                confirmOverlay.listen(function(e) {
                    if (e && e.target === confirmOverlay) confirmOverlay.remove();
                });
            }

            // 开启宝箱
            function openChest(item) {
                var result = game.xjzh_openDollarChest(item.key);
                if (!result) {
                    // 数量不足
                    var tipOverlay = document.createElement('div');
                    tipOverlay.style.cssText = 'position:fixed !important;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#ff6b6b;padding:20px 40px;border-radius:10px;border:2px solid #ff6b6b;z-index:300000;font-size:16px;';
                    tipOverlay.textContent = '宝箱数量不足';
                    document.body.appendChild(tipOverlay);
                    setTimeout(function() { tipOverlay.remove(); }, 2000);
                    return;
                }

                // 刷新背包
                refreshBackpack();
            }

            // 刷新背包（重新打开）
            function refreshBackpack() {
                setTimeout(function() {
                    var cailiaoBox = document.querySelector('.xjzh-equipPage-cailiao');
                    if (cailiaoBox) {
                        cailiaoBox.click();
                    }
                }, 100);
            }

            function applyRuneStyles(scale) {
                var runeFontSize = 12 * scale;
                var runeCountFontSize = 11 * scale;
                var runeTypeFontSize = 10 * scale;

                for (var rj = 0; rj < runeCards.length; rj++) {
                    var rc = runeCards[rj];
                    var color = rc.color;
                    var hasCount = rc.card._runeData.count > 0;
                    rc.card.style.cssText = 'position:relative !important;width:100%;aspect-ratio:3/4;padding:8px;' +
                        'background:' + (hasCount ? 'linear-gradient(135deg,' + color + '44 0%,rgba(0,0,0,0.3) 100%)' : 'rgba(80,80,80,0.3)') + ';' +
                        'border:2px solid ' + (hasCount ? color : '#555') + ';' +
                        'border-radius:8px;box-sizing:border-box;overflow:hidden;' +
                        'box-shadow:' + (hasCount ? '0 2px 8px ' + color + '44' : 'none') + ';' +
                        'transition:transform 0.2s;cursor:default;';

                    rc.iconArea.style.cssText = 'position:relative !important;display:block !important;width:' + (50 * scale) + 'px;height:' + (50 * scale) + 'px;margin:' + (8 * scale) + 'px auto ' + (4 * scale) + 'px;border-radius:8px;background:rgba(0,0,0,0.3);background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + lib.assetURL + 'extension/仙家之魂/image/runes/' + rc.card._runeData.name + '.png);' + (hasCount ? '' : 'filter:grayscale(1) opacity(0.5);');

                    rc.countLabel.style.cssText = 'position:absolute;top:' + (4 * scale) + 'px;left:' + (4 * scale) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (2 * scale) + 'px ' + (6 * scale) + 'px;border-radius:' + (10 * scale) + 'px;font-size:' + runeCountFontSize + 'px;font-weight:bold;z-index:2;';

                    rc.typeLabel.style.cssText = 'position:absolute;top:' + (4 * scale) + 'px;right:' + (4 * scale) + 'px;background:' + color + ';color:#fff;padding:' + (2 * scale) + 'px ' + (6 * scale) + 'px;border-radius:' + (10 * scale) + 'px;font-size:' + runeTypeFontSize + 'px;font-weight:bold;';

                    rc.nameLabel.style.cssText = 'position:relative !important;display:block !important;font-size:' + runeFontSize + 'px;font-weight:bold;color:' + (hasCount ? '#fff' : '#666') + ';text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.8);line-height:1.3;';
                }
            }

            // 移动端卡片样式 - 基于实际尺寸
            function applyCardStylesBySize(cardW, cardH) {
                var iconSize = cardW * 0.55;
                var fontSize = Math.max(11, cardW * 0.09);
                var countFontSize = Math.max(10, cardW * 0.08);
                var qualityFontSize = Math.max(9, cardW * 0.075);
                var padding = cardW * 0.06;
                var iconMarginTop = cardH * 0.18;
                var iconMarginBottom = cardH * 0.06;
                var radius = Math.max(8, cardW * 0.08);

                for (var j = 0; j < cards.length; j++) {
                    var c = cards[j];
                    var cfg = c.item.config;

                    c.card.style.cssText = 'position:relative !important;width:' + cardW + 'px;height:' + cardH + 'px;' +
                        'background-image:' + cfg.bgGradient + ';' +
                        'border:2px solid ' + cfg.borderColor + ';' +
                        'border-radius:' + radius + 'px;padding:' + padding + 'px;box-sizing:border-box;' +
                        'box-shadow:0 4px 12px rgba(0,0,0,0.4);' +
                        'transition:transform 0.2s,box-shadow 0.2s;cursor:pointer;';

                    c.countLabel.style.cssText = 'position:absolute;top:' + (cardW * 0.03) + 'px;left:' + (cardW * 0.03) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (cardW * 0.02) + 'px ' + (cardW * 0.05) + 'px;border-radius:' + (cardW * 0.1) + 'px;font-size:' + countFontSize + 'px;font-weight:bold;z-index:2;';

                    c.qualityLabel.style.cssText = 'position:absolute;top:' + (cardW * 0.03) + 'px;right:' + (cardW * 0.03) + 'px;background:' + cfg.borderColor + ';color:#fff;padding:' + (cardW * 0.02) + 'px ' + (cardW * 0.05) + 'px;border-radius:' + (cardW * 0.1) + 'px;font-size:' + qualityFontSize + 'px;font-weight:bold;';

                    c.iconBox.style.cssText = 'position:relative !important;display:block !important;width:' + iconSize + 'px;height:' + iconSize + 'px;border-radius:' + (cardW * 0.06) + 'px;background:rgba(0,0,0,0.4);margin:' + iconMarginTop + 'px auto ' + iconMarginBottom + 'px;border:1px solid rgba(255,255,255,0.3);background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + cfg.icon + ');';

                    c.nameLabel.style.cssText = 'position:relative !important;display:block !important;font-size:' + fontSize + 'px;font-weight:bold;color:' + cfg.textColor + ';text-align:center;text-shadow:0 1px 3px rgba(0,0,0,0.8);padding:' + (cardW * 0.02) + 'px;line-height:1.3;';
                }
            }

            // 移动端符文样式 - 基于实际尺寸
            function applyRuneStylesBySize(runeCardW) {
                var runeFontSize = Math.max(10, runeCardW * 0.1);
                var runeCountFontSize = Math.max(9, runeCardW * 0.09);
                var runeTypeFontSize = Math.max(8, runeCardW * 0.08);
                var runeIconSize = runeCardW * 0.5;
                var runeIconMargin = runeCardW * 0.08;

                for (var rj = 0; rj < runeCards.length; rj++) {
                    var rc = runeCards[rj];
                    var color = rc.color;
                    var hasCount = rc.card._runeData.count > 0;
                    rc.card.style.cssText = 'position:relative !important;width:100%;aspect-ratio:3/4;padding:' + (runeCardW * 0.08) + 'px;' +
                        'background:' + (hasCount ? 'linear-gradient(135deg,' + color + '44 0%,rgba(0,0,0,0.3) 100%)' : 'rgba(80,80,80,0.3)') + ';' +
                        'border:2px solid ' + (hasCount ? color : '#555') + ';' +
                        'border-radius:' + (runeCardW * 0.08) + 'px;box-sizing:border-box;overflow:hidden;' +
                        'box-shadow:' + (hasCount ? '0 2px 8px ' + color + '44' : 'none') + ';' +
                        'transition:transform 0.2s;cursor:default;';

                    rc.iconArea.style.cssText = 'position:relative !important;display:block !important;width:' + runeIconSize + 'px;height:' + runeIconSize + 'px;margin:' + runeIconMargin + 'px auto ' + (runeCardW * 0.04) + 'px;border-radius:' + (runeCardW * 0.08) + 'px;background:rgba(0,0,0,0.3);background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + lib.assetURL + 'extension/仙家之魂/image/runes/' + rc.card._runeData.name + '.png);' + (hasCount ? '' : 'filter:grayscale(1) opacity(0.5);');

                    rc.countLabel.style.cssText = 'position:absolute;top:' + (runeCardW * 0.04) + 'px;left:' + (runeCardW * 0.04) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (runeCardW * 0.02) + 'px ' + (runeCardW * 0.06) + 'px;border-radius:' + (runeCardW * 0.1) + 'px;font-size:' + runeCountFontSize + 'px;font-weight:bold;z-index:2;';

                    rc.typeLabel.style.cssText = 'position:absolute;top:' + (runeCardW * 0.04) + 'px;right:' + (runeCardW * 0.04) + 'px;background:' + color + ';color:#fff;padding:' + (runeCardW * 0.02) + 'px ' + (runeCardW * 0.06) + 'px;border-radius:' + (runeCardW * 0.1) + 'px;font-size:' + runeTypeFontSize + 'px;font-weight:bold;';

                    rc.nameLabel.style.cssText = 'position:relative !important;display:block !important;font-size:' + runeFontSize + 'px;font-weight:bold;color:' + (hasCount ? '#fff' : '#666') + ';text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.8);line-height:1.3;';
                }
            }

            // 添加到 ui.window
            if (ui.window) {
                ui.window.appendChild(overlay);
            } else {
                document.body.appendChild(overlay);
            }

            // 显示物品详情弹窗
            function showItemDetail(item) {
                var detailOverlay = document.createElement('div');
                detailOverlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:200000;display:flex !important;align-items:center;justify-content:center;transition:none !important;';

                var detailPanel = document.createElement('div');
                detailPanel.style.cssText = 'position:relative !important;display:block !important;transition:none !important;width:360px;background:#1a1a2e;border:3px solid ' + item.config.borderColor + ';border-radius:15px;box-shadow:0 0 30px ' + item.config.borderColor + ';padding:30px;box-sizing:border-box;z-index:200001;';

                // 标题
                var detailTitle = document.createElement('div');
                detailTitle.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-family:STXingkai,XingKai,行楷,serif;font-size:24px;color:' + item.config.textColor + ';font-weight:bold;margin-bottom:15px;text-shadow:0 0 10px ' + item.config.borderColor + ';';
                detailTitle.textContent = item.config.name;
                detailPanel.appendChild(detailTitle);

                // 图标
                var detailIcon = document.createElement('div');
                detailIcon.style.cssText = 'position:relative !important;display:block !important;width:100px;height:100px;border-radius:12px;background:rgba(0,0,0,0.4);margin:0 auto 15px;border:2px solid ' + item.config.borderColor + ';background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + item.config.icon + ');';
                detailPanel.appendChild(detailIcon);

                // 品质
                var detailQuality = document.createElement('div');
                detailQuality.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:14px;color:#fff;margin-bottom:15px;';
                detailQuality.innerHTML = '<span style="padding:4px 12px;background:' + item.config.borderColor + ';border-radius:12px;display:inline-block;">' + item.config.quality + '</span>';
                detailPanel.appendChild(detailQuality);

                // 数量
                var detailCount = document.createElement('div');
                detailCount.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:16px;color:' + item.config.textColor + ';font-weight:bold;margin-bottom:15px;';
                detailCount.textContent = '持有数量：×' + item.count;
                detailPanel.appendChild(detailCount);

                // 描述
                var detailDesc = document.createElement('div');
                detailDesc.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:13px;color:#aaa;line-height:1.5;padding:12px;background:rgba(0,0,0,0.3);border-radius:10px;margin-bottom:20px;';
                detailDesc.textContent = item.config.desc || '暂无描述';
                detailPanel.appendChild(detailDesc);

                // 关闭按钮
                var detailClose = document.createElement('div');
                detailClose.style.cssText = 'position:relative !important;display:block !important;width:100%;padding:10px;text-align:center;background:rgba(201,169,97,0.2);border:2px solid #c9a961;border-radius:8px;cursor:pointer;font-size:15px;color:#c9a961;font-weight:bold;';
                detailClose.textContent = '关闭';
                detailClose.listen(function() {
                    detailOverlay.remove();
                });
                detailPanel.appendChild(detailClose);

                detailOverlay.appendChild(detailPanel);
                document.body.appendChild(detailOverlay);

                // 使用listen方法，并添加背景点击关闭支持
                detailOverlay.listen(function(e) {
                    if (e && e.target === detailOverlay) detailOverlay.remove();
                });
            }

            // 显示符文详情弹窗
            function showRuneDetail(runeData) {
                var color = runeData.type === 'ritual' ? '#ff6b35' : '#4ecdc4';
                var typeBgGradient = runeData.type === 'ritual' ? 'linear-gradient(135deg,#ff6b3544 0%,rgba(0,0,0,0.3) 100%)' : 'linear-gradient(135deg,#4ecdc444 0%,rgba(0,0,0,0.3) 100%)';
                var typeIconBg = runeData.type === 'ritual' ? 'linear-gradient(180deg,#c0392b 0%,#922b21 100%)' : 'linear-gradient(180deg,#2e86c1 0%,#1a5276 100%)';
                var hasCount = runeData.count > 0;

                var detailOverlay = document.createElement('div');
                detailOverlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:200000;display:flex !important;align-items:center;justify-content:center;transition:none !important;';

                var detailPanel = document.createElement('div');
                detailPanel.style.cssText = 'position:relative !important;display:block !important;transition:none !important;width:340px;background:#1a1a2e;border:3px solid ' + color + ';border-radius:15px;box-shadow:0 0 30px ' + color + ';padding:25px;box-sizing:border-box;z-index:200001;';

                // 标题
                var detailTitle = document.createElement('div');
                detailTitle.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-family:STXingkai,XingKai,行楷,serif;font-size:22px;color:' + color + ';font-weight:bold;margin-bottom:15px;text-shadow:0 0 10px ' + color + ';';
                detailTitle.textContent = runeData.translate;
                detailPanel.appendChild(detailTitle);

                // 图标
                var detailIcon = document.createElement('div');
                detailIcon.style.cssText = 'position:relative !important;display:block !important;width:100px;height:100px;border-radius:50%;background:' + typeIconBg + ';margin:0 auto 15px;border:2px solid ' + color + ';background-size:cover;background-position:center;background-repeat:no-repeat;background-image:url(' + lib.assetURL + 'extension/仙家之魂/image/runes/' + runeData.name + '.png);' + (hasCount ? '' : 'filter:grayscale(1) opacity(0.5);');
                detailPanel.appendChild(detailIcon);

                // 类型标签
                var detailType = document.createElement('div');
                detailType.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:14px;color:#fff;margin-bottom:10px;';
                detailType.innerHTML = '类型：<span style="padding:4px 12px;background:' + color + ';border-radius:12px;display:inline-block;">' + runeData.typeTranslate + '符文</span>';
                detailPanel.appendChild(detailType);

                // 持有数量
                var detailCount = document.createElement('div');
                detailCount.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:16px;color:' + color + ';font-weight:bold;margin-bottom:15px;';
                detailCount.textContent = '持有数量：×' + runeData.count;
                detailPanel.appendChild(detailCount);

                // 描述
                var detailDesc = document.createElement('div');
                detailDesc.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:13px;color:#aaa;line-height:1.5;padding:12px;background:rgba(0,0,0,0.3);border-radius:10px;margin-bottom:20px;';
                detailDesc.textContent = runeData.type === 'ritual'
                    ? '仪式符文：提供被动增益效果，装备后自动生效。镶嵌在奇术要件上可以获得额外的被动能力。'
                    : '祷告符文：提供主动技能效果，需要积累贡品后触发。镶嵌在奇术要件上可以获得强大的主动技能。';
                detailPanel.appendChild(detailDesc);

                // 状态提示
                var detailStatus = document.createElement('div');
                detailStatus.style.cssText = 'position:relative !important;display:block !important;text-align:center;font-size:12px;color:' + (hasCount ? '#88ff88' : '#ff8888') + ';margin-bottom:15px;';
                detailStatus.textContent = hasCount ? '✓ 可装备' : '✗ 数量不足';
                detailPanel.appendChild(detailStatus);

                // 关闭按钮
                var detailClose = document.createElement('div');
                detailClose.style.cssText = 'position:relative !important;display:block !important;width:100%;padding:10px;text-align:center;background:rgba(' + (runeData.type === 'ritual' ? '255,107,53' : '78,205,196') + ',0.2);border:2px solid ' + color + ';border-radius:8px;cursor:pointer;font-size:15px;color:' + color + ';font-weight:bold;';
                detailClose.textContent = '关闭';
                detailClose.listen(function() {
                    detailOverlay.remove();
                });
                detailPanel.appendChild(detailClose);

                detailOverlay.appendChild(detailPanel);
                document.body.appendChild(detailOverlay);

                // 使用listen方法，并添加背景点击关闭支持
                detailOverlay.listen(function(e) {
                    if (e && e.target === detailOverlay) detailOverlay.remove();
                });
            }

            // 响应式缩放 - 移动端单独适配，桌面端使用缩放
            function updateBagSize() {
                var winWidth = window.innerWidth;
                var winHeight = window.innerHeight;
                var isMobile = lib.config.touchscreen || (winWidth < 1000 && winHeight < 800);

                if (isMobile) {
                    // 移动端横屏优化：面板占满屏幕 98% 宽度和 97% 高度
                    var panelW = winWidth * 0.98;
                    var panelH = winHeight * 0.97;
                    var sidePadding = 10;
                    var topPadding = 5;
                    var innerW = panelW - sidePadding * 2 - 4; // 减去面板padding和滚动容器border

                    panel.style.width = panelW + 'px';
                    panel.style.height = panelH + 'px';
                    panel.style.padding = topPadding + 'px ' + sidePadding + 'px ' + sidePadding + 'px ' + sidePadding + 'px';
                    panel.style.transform = 'none';
                    panel.style.borderRadius = '10px';

                    // 调整滚动容器
                    var newHeaderH = header.offsetHeight + 40;
                    scrollContainer.style.left = '8px';
                    scrollContainer.style.right = '8px';
                    scrollContainer.style.bottom = '8px';
                    scrollContainer.style.top = newHeaderH + 'px';
                    scrollContainer.style.padding = '0 8px 8px 8px';
                    scrollContainer.style.borderWidth = '2px';

                    // 调整分组容器
                    groupContainer.style.padding = '10px';
                    groupContainer.style.marginTop = '12px';
                    groupContainer.style.borderWidth = '2px';

                    // 调整标题
                    categoryTitle.style.fontSize = '18px';
                    categoryTitle.style.padding = '3px 10px';
                    categoryTitle.style.marginBottom = '10px';

                    // 钥匙卡片：5列布局
                    var gridColumns = 5;
                    var gap = 6;
                    grid.style.gridTemplateColumns = 'repeat(' + gridColumns + ',1fr)';
                    grid.style.gap = gap + 'px';
                    grid.style.padding = '2px';

                    // 动态计算卡片尺寸
                    var cardW = (innerW - gap * (gridColumns - 1) - 16) / gridColumns;
                    if (cardW > 140) cardW = 140;
                    if (cardW < 70) cardW = 70;
                    var cardH = cardW * 1.33;
                    applyCardStylesBySize(cardW, cardH);

                    // 调整符文容器
                    runeContainer.style.padding = '10px';
                    runeContainer.style.marginTop = '12px';
                    runeTitle.style.fontSize = '18px';
                    runeTitle.style.padding = '3px 10px';
                    runeTitle.style.marginBottom = '10px';

                    // 符文卡片：根据宽度自动调整列数
                    var runeColumns = Math.min(8, Math.floor(innerW / 80));
                    if (runeColumns < 5) runeColumns = 5;
                    if (runeColumns > 8) runeColumns = 8;
                    var runeGap = 5;
                    runeGrid.style.gridTemplateColumns = 'repeat(' + runeColumns + ',1fr)';
                    runeGrid.style.gap = runeGap + 'px';
                    runeGrid.style.padding = '2px';
                    runeGrid.style.minWidth = '0';
                    var runeCardW = (innerW - runeGap * (runeColumns - 1) - 16) / runeColumns;
                    if (runeCardW > 85) runeCardW = 85;
                    if (runeCardW < 45) runeCardW = 45;
                    applyRuneStylesBySize(runeCardW);
                } else {
                    // 桌面端：使用缩放逻辑
                    var scaleX = winWidth / (BASE_WIDTH + 60);
                    var scaleY = winHeight / (BASE_HEIGHT + 60);
                    var scale = Math.min(1, scaleX, scaleY);

                    panel.style.width = BASE_WIDTH + 'px';
                    panel.style.height = BASE_HEIGHT + 'px';
                    panel.style.padding = '10px 30px 30px 30px';
                    panel.style.transform = 'scale(' + scale + ')';
                    panel.style.transformOrigin = 'center center';
                    panel.style.borderRadius = '15px';

                    // 根据缩放调整网格列数
                    var gridColumns = 5;
                    if (scale < 0.9) gridColumns = 4;
                    if (scale < 0.75) gridColumns = 3;
                    if (scale < 0.6) gridColumns = 2;

                    grid.style.gridTemplateColumns = 'repeat(' + gridColumns + ',1fr)';

                    // 统一使用桌面端的样式
                    applyCardStyles(scale);
                    applyRuneStyles(scale);
                }
            }

            updateBagSize();
            window.addEventListener('resize', updateBagSize);

            // 绑定事件
            var closeModal = function () {
                window.removeEventListener('resize', updateBagSize);
                overlay.remove();
                game.resume2();
                game.xjzhAchi.openAchievementEquipPage();
            };

            closeBtn.listen(closeModal);
            overlay.listen(function (e) {
                if (e && e.target === overlay) closeModal();
            });
        });

        //函数方法
        var state = {
            pageNum: pageNumDefault,
            equipNum: 0,
            tongyong_on: tongyongDefault,
            zhuanshu_on: zhuanshuDefault,
            map: {},
            craftedMap: {},
            craftedEntries: [],
            refreshMap() {
                let stateMap = state.map || {};
                let craftedMap = state.craftedMap || {};
                let craftedEntries = [];
                const qishuyaojians = lib.xjzh_qishuyaojians;
                const qishuBag = get.xjzh_qishuBag();
                const craftedBag = get.xjzh_qishuCraftedBag();

                Object.keys(qishuyaojians).forEach(key => {
                    stateMap[key] = 0;
                    craftedMap[key] = 0;
                });

                Array.isArray(qishuBag) && qishuBag.length && qishuBag.forEach(item => stateMap[item] !== undefined && stateMap[item]++);

                if (Array.isArray(craftedBag) && craftedBag.length) {
                    craftedBag.forEach(c => {
                        if (stateMap[c.id] !== undefined) {
                            craftedMap[c.id] = (craftedMap[c.id] || 0) + 1;
                            var displayKey = c.id + '_crafted_' + (c.uid || (Date.now() + '_' + Math.random().toString(36).substr(2, 9)));
                            craftedEntries.push({
                                displayKey: displayKey,
                                baseId: c.id,
                                uid: c.uid,
                                displayName: c.displayName || '',
                                talents: c.talents || [],
                                createdAt: c.createdAt || 0
                            });
                        }
                    });
                }

                state.craftedMap = craftedMap;
                state.craftedEntries = craftedEntries;
            },
            showing: [],
            filter(item) {
                let info = get.xjzh_equipInfo(item);
                if (!info) return false;
                if (info.filter) return state.zhuanshu_on;
                return state.tongyong_on;
            },
            refreshPage: function () {
                if (state.zhuanshu_on) zhuanshu.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/zhuanshu_on.png')";
                else zhuanshu.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/zhuanshu.png')";
                if (state.tongyong_on) tongyong.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/tongyong_on.png')";
                else tongyong.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/tongyong.png')";
                for (var i = 0; i < state.showing.length; i++) {
                    state.showing[i].remove();
                }
                state.showing.length = 0;
                if (state.pageNum == 0) arrow2.style.display = 'none';
                else arrow2.style.display = 'inline';

                var list = [];
                var craftedEntries = state.craftedEntries || [];

                for (var equip in state.map) {
                    if (state.filter(equip)) {
                        var normalCount = state.map[equip] || 0;
                        if (normalCount > 0) {
                            list.push({ type: 'normal', key: equip, baseId: equip, sortKey: equip });
                        }
                    }
                }

                craftedEntries.forEach(function(entry) {
                    if (state.filter(entry.baseId)) {
                        list.push({ type: 'crafted', key: entry.displayKey, baseId: entry.baseId, entry: entry, sortKey: entry.baseId + '_crafted' });
                    }
                });

                state.equipNum = list.length;
                if ((state.equipNum / 8 - 1) <= state.pageNum) arrow.style.display = 'none';
                else arrow.style.display = 'inline';

                list.sort(function (a, b) {
                    var level1 = get.xjzh_equipInfo(a.baseId).level || 1;
                    var level2 = get.xjzh_equipInfo(b.baseId).level || 1;
                    if (level1 > level2) return 1;
                    if (level1 < level2) return -1;
                    if (a.sortKey > b.sortKey) return 1;
                    return -1;
                });

                var num = state.pageNum * 8;
                var intro = ui.create.div(bookWindow, {
                    zIndex: '51',
                    width: '300px',
                    textAlign: 'left',
                    backgroundColor: '#412812',
                    transition: 'left 0s,top 0s'
                });

                for (var i = 0; i < 8 && num + i < list.length; i++) {
                    var entry = list[num + i];
                    var equipShow = ui.create.div('.xjzh-equipPage-equipShow', bk);
                    state.showing.push(equipShow);

                    var baseId = entry.baseId;
                    equipShow.setBackgroundImage(`${lib.assetURL}extension/仙家之魂/image/qishuyaojian/cards/${baseId}.png`);

                    var isCrafted = entry.type === 'crafted';
                    if (isCrafted) {
                        equipShow.style.boxShadow = '0 0 15px rgba(255,215,0,0.7)';
                        equipShow.style.filter = 'brightness(1.1) saturate(1.2)';
                    }

                    var index = i;
                    if (index < 4) equipShow.style.top = '15%';
                    else equipShow.style.top = '52%';
                    switch (i) {
                        case 0: case 4:
                            equipShow.style.left = '18%';
                            break;
                        case 1: case 5:
                            equipShow.style.left = '33%';
                            break;
                        case 2: case 6:
                            equipShow.style.left = '54%';
                            break;
                        default:
                            equipShow.style.left = '69%';
                    }

                    equipShow.item = baseId;
                    equipShow.isCrafted = isCrafted;
                    if (isCrafted) {
                        equipShow.craftedEntry = entry.entry;
                    }

                    equipShow.listen(function () {
                        bookWindow.delete();
                        game.resume2();
                        lib.onresize.remove(resize);
                        game.xjzhAchi.openAchievementEquipIntro(this.item, state, this.isCrafted, this.craftedEntry);
                    });

                    var equipHave = ui.create.div(equipShow, {
                        left: '11%', top: '8%',
                    });

                    if (isCrafted) {
                        var displayName = entry.entry.displayName || '';
                        var talents = entry.entry.talents || [];
                        var talentsText = talents.length > 0 ? talents.join('、') : '';
                        var info = get.xjzh_equipInfo(baseId);
                        var translateName = info ? info.translate : baseId;
                        var nameText = displayName || (translateName + '之' + talentsText);
                        equipHave.innerHTML = "<span style=\"color:#FFD700;font-family:xinwei;text-shadow:0 0 6px rgba(255,215,0,0.8);\"><font size =3px>✦ " + nameText + "</font></span>";

                        var craftedBadge = ui.create.div(equipShow, {
                            position: 'absolute',
                            right: '5%', top: '5%',
                            width: '24px', height: '24px',
                            backgroundColor: 'linear-gradient(135deg,#FFD700,#FFA500)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            color: '#000',
                            fontWeight: 'bold',
                            boxShadow: '0 0 10px rgba(255,215,0,0.9)',
                            zIndex: '10'
                        });
                        craftedBadge.innerHTML = '✦';
                    } else {
                        var normalCount = state.map[baseId] || 0;
                        var craftedCount = state.craftedMap[baseId] || 0;
                        var displayCount = Math.max(0, normalCount - craftedCount);
                        var countText = "拥有：" + displayCount + "个";
                        equipHave.innerHTML = "<span style=\"color:#FFFFFF;font-family:xinwei\"><font size =4px>" + countText + "</font></span>";
                    }

                    equipShow.addEventListener('mouseenter', function (event) {
                        this.style.transform = 'scale(1.05)';
                        var curIsCrafted = this.isCrafted;
                        this.style.boxShadow = curIsCrafted ? '0 6px 20px rgba(255,215,0,0.6)' : '0 6px 12px rgba(255,215,0,0.5)';
                        var item = get.xjzh_equipInfo(this.item);
                        if (!item) return;
                        var str = '';
                        str += '<span style="font-family:shousha;"><span style="font-size:18px;font-weight:600">'
                            + item.translate + '</span><br>';
                        str += item.translate_info + '</span>';
                        if (curIsCrafted) {
                            var cEntry = this.craftedEntry;
                            var cTalents = cEntry.talents || [];
                            str += '<br><br><span style="color:#FFD700;font-size:14px;">✦ 天赋词缀：' + cTalents.join('、') + '</span>';
                        }
                        intro.innerHTML = str;
                        bookWindow.appendChild(intro);
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                        intro.show();
                    });

                    equipShow.addEventListener('mouseleave', function () {
                        this.style.transform = 'scale(1)';
                        this.style.boxShadow = this.isCrafted ? '0 0 15px rgba(255,215,0,0.7)' : '0 4px 8px rgba(0,0,0,0.3)';
                        intro.hide();
                    });

                    equipShow.addEventListener('mousemove', function (event) {
                        intro.style.left = (event.clientX + 10) / game.documentZoom + 'px';
                        intro.style.top = (event.clientY + 10) / game.documentZoom + 'px';
                    });

                    var removeIntroOnWheel = function (event) {
                        if (event.deltaY !== 0) {
                            intro.remove();
                            equipShow.removeEventListener('wheel', removeIntroOnWheel);
                        }
                    };
                    equipShow.addEventListener('wheel', removeIntroOnWheel);
                }
            }
        };
        //奇术要件展示
        if (get.is.object(lib.xjzh_qishuyaojians)) {
            state.refreshMap();
            state.refreshPage();
        }
    }
