import { lib, game, ui, get, ai, _status } from '../../../../../../../noname.js';

//打开符文背包
export function openShowRunePack(item, type, fuwen, state) {
        // 关闭已有符文背包
        var existing = document.getElementById('xjzhRunePackOverlay');
        if (existing) existing.remove();

        game.pause2();

        // 获取对应类型的符文列表
        var runeNames = get.xjzh_runeListName(type);
        var typeTranslate = type === 'ritual' ? '仪式符文' : '祷告符文';
        var typeColor = type === 'ritual' ? '#e74c3c' : '#5dade2';
        var typeBgGradient = type === 'ritual' ? 'linear-gradient(135deg,#e74c3c44 0%,#1a1a2e 100%)' : 'linear-gradient(135deg,#5dade244 0%,#1a1a2e 100%)';
        var typeIconBg = type === 'ritual' ? 'linear-gradient(180deg,#c0392b 0%,#922b21 100%)' : 'linear-gradient(180deg,#2e86c1 0%,#1a5276 100%)';

        // 创建遮罩层
        var overlay = document.createElement('div');
        overlay.id = 'xjzhRunePackOverlay';
        overlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:99999;display:flex !important;align-items:center;justify-content:center;transition:none !important;';

        // 创建面板
        var BASE_WIDTH = 700;
        var BASE_HEIGHT = 500;
        var panel = document.createElement('div');
        panel.style.cssText = 'position:relative !important;display:block !important;transition:none !important;width:' + BASE_WIDTH + 'px;height:' + BASE_HEIGHT + 'px;background:#1a1a2e;border:3px solid ' + typeColor + ';border-radius:15px;box-shadow:0 0 40px ' + typeColor + '88;padding:10px 30px 30px 30px;box-sizing:border-box;';
        overlay.appendChild(panel);

        // 创建标题
        var header = document.createElement('div');
        header.style.cssText = 'position:relative !important;display:block !important;text-align:center;width:100%;margin-top:0px;margin-bottom:8px;';
        header.innerHTML = '<div style="position:relative !important;display:inline-block;padding:10px 30px;border:2px solid ' + typeColor + ';border-radius:10px;background:rgba(139,111,179,0.1);font-family:STXingkai,XingKai,行楷,serif;font-size:28px;color:' + typeColor + ';font-weight:bold;text-shadow:0 0 10px ' + typeColor + '88;letter-spacing:8px;">' + typeTranslate + '</div>';
        panel.appendChild(header);

        // 创建关闭按钮
        var closeBtnBgColor = type === 'ritual' ? '231,76,60' : '93,173,226';
        var closeBtn = document.createElement('div');
        closeBtn.style.cssText = 'position:absolute;right:20px;top:20px;width:35px;height:35px;background:rgba(' + closeBtnBgColor + ',0.3);border:2px solid ' + typeColor + ';border-radius:50%;line-height:31px;text-align:center;cursor:pointer;font-size:22px;color:' + typeColor + ';font-weight:bold;';
        closeBtn.textContent = '×';
        panel.appendChild(closeBtn);

        // 创建卡片容器
        var gridContainer = document.createElement('div');
        gridContainer.style.cssText = 'position:relative !important;display:block !important;border:2px solid ' + typeColor + ';border-radius:10px;padding:15px;background:rgba(0,0,0,0.3);margin-top:10px;';
        panel.appendChild(gridContainer);

        // 统计信息
        var totalCount = 0;
        for (var si = 0; si < runeNames.length; si++) {
            totalCount += get.xjzh_runeListNumber(runeNames[si]);
        }
        var infoLabel = document.createElement('div');
        infoLabel.style.cssText = 'position:relative !important;display:block !important;font-size:13px;color:' + typeColor + ';text-align:center;margin-bottom:10px;font-family:STXingkai,XingKai,行楷,serif;';
        infoLabel.textContent = '共 ' + runeNames.length + ' 种符文，持有总数：' + totalCount;
        gridContainer.appendChild(infoLabel);

        // 创建网格
        var grid = document.createElement('div');
        grid.style.cssText = 'position:relative !important;display:grid !important;grid-template-columns:repeat(4,1fr);gap:15px;padding:5px;justify-items:center;';
        gridContainer.appendChild(grid);

        // 创建符文卡片
        var runeCards = [];
        for (var i = 0; i < runeNames.length; i++) {
            var runeName = runeNames[i];
            var runeCount = get.xjzh_runeListNumber(runeName);
            var runeTranslate = get.xjzh_runeTranslate(runeName, type);

            var card = document.createElement('div');
            card._runeData = { name: runeName, count: runeCount, type: type, translate: runeTranslate };

            // 符文图标区域（显示符文图片）
            var iconArea = document.createElement('div');
            iconArea.className = 'rune-icon-area';
            var runeImg = document.createElement('div');
            runeImg.style.cssText = 'position:relative !important;display:block !important;width:100%;height:100%;background-size:100% 100%;background-position:center;background-repeat:no-repeat;background-image:url(' + lib.assetURL + 'extension/仙家之魂/image/runes/' + runeName + '.png);';
            iconArea.appendChild(runeImg);
            card.appendChild(iconArea);

            var countLabel = document.createElement('div');
            countLabel.textContent = '×' + runeCount;
            card.appendChild(countLabel);

            var nameLabel = document.createElement('div');
            nameLabel.textContent = runeTranslate;
            card.appendChild(nameLabel);

            // 类型标签
            var typeLabel = document.createElement('div');
            typeLabel.textContent = type === 'ritual' ? '仪式' : '祷告';
            card.appendChild(typeLabel);

            // 点击装备
            card.listen((function(runeName, item, type) {
                return function() {
                    if (get.xjzh_runeListNumber(runeName) <= 0) {
                        game.xjzh_openLoading('该符文数量不足！');
                        return;
                    }
                    if (item === "xjzh_qishu_bubaiwangzhe") {
                        let runesLists = get.xjzh_runeQishuList(item);
                        if (!runesLists.includes(runeName)) {
                            game.xjzh_equipRune(item, runeName);
                        } else {
                            game.xjzh_openLoading('你已经装备' + get.xjzh_runeTranslate(runeName, type) + '，无法再次装备！');
                        }
                    } else if (game.xjzh_hasAllEquipRunes(item, runeName) !== false) {
                        let bool = game.xjzh_hasAllEquipRunes(item, runeName), str = "";
                        str = bool === "banned" ? "此符文组合被禁用！" : "你已经装备相同组合的符文，无法再次装备！";
                        game.xjzh_openLoading(str);
                    } else {
                        game.xjzh_equipRune(item, runeName);
                    }
                    state.refreshDialog();
                    overlay.remove();
                    game.resume2();
                };
            })(runeName, item, type));

            // Hover 效果 - 使用touch事件替代
            card.addEventListener('mouseenter', function() {
                if (this._runeData.count > 0) {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 8px 20px ' + typeColor + 'aa';
                }
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });

            runeCards.push({
                card: card,
                countLabel: countLabel,
                nameLabel: nameLabel,
                iconArea: iconArea,
                typeLabel: typeLabel
            });

            grid.appendChild(card);
        }

        // 应用卡片样式 - 3:4 竖版卡片
        var CARD_WIDTH = 110;
        var CARD_HEIGHT = 147;
        function applyStyles(scale) {
            var cardW = CARD_WIDTH * scale;
            var cardH = CARD_HEIGHT * scale;
            var fontSize = 13 * scale;
            var countFontSize = 11 * scale;
            var iconFontSize = 36 * scale;
            var typeFontSize = 9 * scale;

            for (var j = 0; j < runeCards.length; j++) {
                var rc = runeCards[j];
                var hasCount = rc.card._runeData.count > 0;

                rc.card.style.cssText = 'position:relative !important;width:' + cardW + 'px;height:' + cardH + 'px;' +
                    'background:' + (hasCount ? typeBgGradient : 'rgba(60,60,60,0.4)') + ';' +
                    'border:2px solid ' + (hasCount ? typeColor : '#555') + ';' +
                    'border-radius:10px;padding:8px 8px 6px;box-sizing:border-box;overflow:hidden;' +
                    'box-shadow:' + (hasCount ? '0 4px 12px ' + typeColor + '66' : 'none') + ';' +
                    'transition:transform 0.2s,box-shadow 0.2s;cursor:' + (hasCount ? 'pointer' : 'not-allowed') + ';';

                // 图标区域
                rc.iconArea.style.cssText = 'position:absolute;top:12%;left:50%;transform:translateX(-50%);width:' + (cardW * 0.7) + 'px;height:' + (cardW * 0.7) + 'px;' +
                    'background:' + (hasCount ? typeIconBg : 'rgba(80,80,80,0.5)') + ';' +
                    'border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;' +
                    'box-shadow:' + (hasCount ? 'inset 0 -2px 6px rgba(0,0,0,0.3),0 2px 8px ' + typeColor + '44' : 'inset 0 -2px 6px rgba(0,0,0,0.3)') + ';';
                if (rc.iconArea.firstChild) {
                    rc.iconArea.firstChild.style.filter = hasCount ? 'none' : 'grayscale(1) opacity(0.5)';
                }

                // 数量标签
                rc.countLabel.style.cssText = 'position:absolute;top:' + (5 * scale) + 'px;left:' + (5 * scale) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (2 * scale) + 'px ' + (5 * scale) + 'px;border-radius:' + (8 * scale) + 'px;font-size:' + countFontSize + 'px;font-weight:bold;z-index:2;';

                // 类型标签
                rc.typeLabel.style.cssText = 'position:absolute;top:' + (5 * scale) + 'px;right:' + (5 * scale) + 'px;background:' + (hasCount ? typeColor : '#555') + ';color:#fff;padding:' + (2 * scale) + 'px ' + (5 * scale) + 'px;border-radius:' + (8 * scale) + 'px;font-size:' + typeFontSize + 'px;font-weight:bold;z-index:2;';

                // 名称标签
                rc.nameLabel.style.cssText = 'position:absolute;bottom:' + (6 * scale) + 'px;left:0;right:0;font-size:' + fontSize + 'px;font-weight:bold;color:' + (hasCount ? '#fff' : '#666') + ';text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.8);padding:0 4px;line-height:1.2;';
            }
        }

        // 添加到 ui.window
        if (ui.window) {
            ui.window.appendChild(overlay);
        } else {
            document.body.appendChild(overlay);
        }

        // 响应式缩放 - 移动端单独适配，桌面端使用缩放
        function updateSize() {
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var isMobile = lib.config.touchscreen || (winWidth < 1000 && winHeight < 800);

            if (isMobile) {
                // 移动端横屏优化：面板占满屏幕 98% 宽度和 97% 高度
                var panelW = winWidth * 0.98;
                var panelH = winHeight * 0.97;
                var sidePadding = 10;
                var innerW = panelW - sidePadding * 2 - 4;

                panel.style.width = panelW + 'px';
                panel.style.height = panelH + 'px';
                panel.style.padding = '8px ' + sidePadding + 'px ' + sidePadding + 'px ' + sidePadding + 'px';
                panel.style.transform = 'none';
                panel.style.borderRadius = '10px';

                // 调整标题
                header.style.marginBottom = '5px';
                header.firstChild.style.fontSize = '24px';
                header.firstChild.style.padding = '6px 20px';

                // 调整关闭按钮
                closeBtn.style.right = '15px';
                closeBtn.style.top = '15px';
                closeBtn.style.width = '32px';
                closeBtn.style.height = '32px';
                closeBtn.style.lineHeight = '28px';
                closeBtn.style.fontSize = '18px';

                // 调整网格容器
                gridContainer.style.padding = '10px';
                gridContainer.style.marginTop = '5px';
                gridContainer.style.borderWidth = '2px';
                infoLabel.style.fontSize = '12px';
                infoLabel.style.marginBottom = '6px';

                // 移动端：根据宽度动态调整列数
                var gridColumns = Math.min(7, Math.floor(innerW / 100));
                if (gridColumns < 5) gridColumns = 5;
                if (gridColumns > 7) gridColumns = 7;
                var gap = 6;
                grid.style.gridTemplateColumns = 'repeat(' + gridColumns + ',1fr)';
                grid.style.gap = gap + 'px';
                grid.style.padding = '2px';

                // 动态计算卡片尺寸 - 减小最大宽度避免溢出
                var cardW = (innerW - gap * (gridColumns - 1) - 16) / gridColumns;
                if (cardW > 110) cardW = 110;
                if (cardW < 65) cardW = 65;
                applyStylesBySize(cardW);
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

                // 网格列数保持4列
                grid.style.gridTemplateColumns = 'repeat(4,1fr)';

                // 统一使用桌面端的样式
                applyStyles(scale);
            }
        }

        // 移动端卡片样式 - 基于实际尺寸
        function applyStylesBySize(cardW) {
            var cardH = cardW * 1.33;
            var fontSize = Math.max(10, cardW * 0.1);
            var countFontSize = Math.max(9, cardW * 0.09);
            var typeFontSize = Math.max(8, cardW * 0.08);
            var iconSize = cardW * 0.7;

            for (var j = 0; j < runeCards.length; j++) {
                var rc = runeCards[j];
                var hasCount = rc.card._runeData.count > 0;

                rc.card.style.cssText = 'position:relative !important;width:' + cardW + 'px;height:' + cardH + 'px;' +
                    'background:' + (hasCount ? typeBgGradient : 'rgba(60,60,60,0.4)') + ';' +
                    'border:2px solid ' + (hasCount ? typeColor : '#555') + ';' +
                    'border-radius:' + Math.max(8, cardW * 0.09) + 'px;padding:' + (cardW * 0.07) + 'px ' + (cardW * 0.07) + 'px ' + (cardW * 0.05) + 'px;box-sizing:border-box;overflow:hidden;' +
                    'box-shadow:' + (hasCount ? '0 4px 12px ' + typeColor + '66' : 'none') + ';' +
                    'transition:transform 0.2s,box-shadow 0.2s;cursor:' + (hasCount ? 'pointer' : 'not-allowed') + ';';

                // 图标区域
                rc.iconArea.style.cssText = 'position:absolute;top:12%;left:50%;transform:translateX(-50%);width:' + iconSize + 'px;height:' + iconSize + 'px;' +
                    'background:' + (hasCount ? typeIconBg : 'rgba(80,80,80,0.5)') + ';' +
                    'border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:hidden;' +
                    'box-shadow:' + (hasCount ? 'inset 0 -2px 6px rgba(0,0,0,0.3),0 2px 8px ' + typeColor + '44' : 'inset 0 -2px 6px rgba(0,0,0,0.3)') + ';';
                if (rc.iconArea.firstChild) {
                    rc.iconArea.firstChild.style.filter = hasCount ? 'none' : 'grayscale(1) opacity(0.5)';
                }

                // 数量标签
                rc.countLabel.style.cssText = 'position:absolute;top:' + (cardW * 0.04) + 'px;left:' + (cardW * 0.04) + 'px;background:rgba(0,0,0,0.8);color:#fff;padding:' + (cardW * 0.02) + 'px ' + (cardW * 0.05) + 'px;border-radius:' + (cardW * 0.08) + 'px;font-size:' + countFontSize + 'px;font-weight:bold;z-index:2;';

                // 类型标签
                rc.typeLabel.style.cssText = 'position:absolute;top:' + (cardW * 0.04) + 'px;right:' + (cardW * 0.04) + 'px;background:' + (hasCount ? typeColor : '#555') + ';color:#fff;padding:' + (cardW * 0.02) + 'px ' + (cardW * 0.05) + 'px;border-radius:' + (cardW * 0.08) + 'px;font-size:' + typeFontSize + 'px;font-weight:bold;z-index:2;';

                // 名称标签
                rc.nameLabel.style.cssText = 'position:absolute;bottom:' + (cardW * 0.05) + 'px;left:0;right:0;font-size:' + fontSize + 'px;font-weight:bold;color:' + (hasCount ? '#fff' : '#666') + ';text-align:center;text-shadow:0 1px 2px rgba(0,0,0,0.8);padding:0 ' + (cardW * 0.04) + 'px;line-height:1.2;';
            }
        }

        updateSize();
        window.addEventListener('resize', updateSize);

        // 绑定事件
        var closeModal = function () {
            window.removeEventListener('resize', updateSize);
            overlay.remove();
            game.resume2();
        };

        closeBtn.listen(closeModal);
        overlay.listen(function (e) {
            if (e && e.target === overlay) closeModal();
        });
}

//选择装备奇术要件的角色
export function choosePlayer(item, state, bk) {
    if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
    if (!state.xjzh_onOpen) {
        var list = [];
        var characterD;
        var node = ui.create.div('.caption.pointerspan');
        var xianhunCharacter = {};
        if (get.is.phoneLayout()) {
            node.style.fontSize = '30px';
        }
        var namecapt = [];
        var getCapt = function (str) {
            var capt;
            if (str.indexOf('_') == -1) {
                capt = str[0];
            }
            else {
                capt = str[str.lastIndexOf('_') + 1];
            }
            capt = capt.toLowerCase();
            if (!/[a-z]/i.test(capt)) {
                capt = '自定义';
            }
            return capt;
        }
        var info = get.xjzh_equipInfo(item);
        if (info.filter) {
            var filter = info.filter;
            var playerName;
            var xianhunCharacter = {};
            if (typeof filter == 'string') {
                playerName = [filter];
            }
            else if (typeof filter == 'object') {
                playerName = filter;
            }
            else if (typeof filter == 'function') {
                playerName = filter();
            }
            for (var i of playerName) {
                if (lib.character[i][4].includes('minskin')) continue;
                if (lib.character[i][4].includes('boss') || lib.character[i][4].includes('hiddenboss')) {
                    if (lib.config.mode == 'boss') continue;
                    if (!lib.character[i][4].includes('bossallowed')) continue;
                }
                if (lib.character[i][4].includes('stonehidden')) continue;
                if (lib.character[i][4].includes('unseen')) continue;
                list.push(i);
                if (!xianhunCharacter[i]) {
                    xianhunCharacter[i] = lib.character[i];
                }
                if (namecapt.indexOf(getCapt(i)) == -1) {
                    namecapt.push(getCapt(i));
                }
            }
        } else {
            let { ...characters } = lib.characterPack.XWTR;
            let { ...characters2 } = lib.characterPack.XWSG;
            let { ...characters3 } = lib.characterPack.XWCS;
            let { ...characters4 } = lib.characterPack.XWDM;
            xianhunCharacter = game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "own" ? Object.assign(characters, characters2, characters3, characters4) : { ...lib.character };
            let qishuEquipsList = get.xjzh_equipPlayer(item);
            for (var i of qishuEquipsList) {
                delete xianhunCharacter[i];
            }
            for (var i in xianhunCharacter) {
                if (xianhunCharacter[i][4].includes('minskin')) continue;
                if (xianhunCharacter[i][4].includes('boss') || xianhunCharacter[i][4].includes('hiddenboss')) {
                    if (lib.config.mode == 'boss') continue;
                    if (!xianhunCharacter[i][4].includes('bossallowed')) continue;
                }
                if (xianhunCharacter[i][4].includes('stonehidden')) continue;
                if (xianhunCharacter[i][4].includes('unseen')) continue;
                list.push(i);
                if (namecapt.indexOf(getCapt(i)) == -1) {
                    namecapt.push(getCapt(i));
                }
            }
        }
        namecapt.sort(function (a, b) {
            return a > b ? 1 : -1;
        });
        namecapt.remove('自定义');
        namecapt.push('newline');
        for (var i in lib.characterDialogGroup) {
            namecapt.push(i);
        }
        var newlined = false;
        var newlined2;
        var packsource;
        var clickCapt = function (e) {
            if (_status.dragged) return;
            if (characterD.currentcapt2 == '最近' && characterD.currentcaptnode2 != this && !characterD.currentcaptnode2.inited) {
                characterD.currentcapt2 = null;
                characterD.currentcaptnode2.classList.remove('thundertext');
                characterD.currentcaptnode2.inited = true;
                characterD.currentcaptnode2 = null;
            }
            if (this.alphabet) {
                if (this.classList.contains('thundertext')) {
                    characterD.currentcapt = null;
                    characterD.currentcaptnode = null;
                    this.classList.remove('thundertext');
                    if (this.touchlink) {
                        this.touchlink.classList.remove('active');
                    }
                    for (var i = 0; i < characterD.buttons.length; i++) {
                        if (characterD.currentgroup && characterD.buttons[i].group != characterD.currentgroup) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.currentcapt2 && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt, true)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else {
                            characterD.buttons[i].classList.remove('nodisplay');
                        }
                    }
                }
                else {
                    if (characterD.currentcaptnode) {
                        characterD.currentcaptnode.classList.remove('thundertext');
                        if (characterD.currentcaptnode.touchlink) {
                            characterD.currentcaptnode.touchlink.classList.remove('active');
                        }
                    }
                    characterD.currentcapt = this.link;
                    characterD.currentcaptnode = this;
                    this.classList.add('thundertext');
                    if (this.touchlink) {
                        this.touchlink.classList.add('active');
                    }
                    for (var i = 0; i < characterD.buttons.length; i++) {
                        if (characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.currentcapt2 && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt, true)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.currentgroup && characterD.buttons[i].group != characterD.currentgroup) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else {
                            characterD.buttons[i].classList.remove('nodisplay');
                        }
                    }
                }
            }
            else {
                if (newlined2) {
                    newlined2.style.display = 'none';
                    packsource.classList.remove('thundertext');
                    if (!get.is.phoneLayout() || !lib.config.filternode_button) {
                        packsource.innerHTML = '武将包';
                    }
                }
                if (this.classList.contains('thundertext')) {
                    characterD.currentcapt2 = null;
                    characterD.currentcaptnode2 = null;
                    this.classList.remove('thundertext');
                    if (this.touchlink) {
                        this.touchlink.classList.remove('active');
                    }
                    for (var i = 0; i < characterD.buttons.length; i++) {
                        if (characterD.currentgroup && characterD.buttons[i].group != characterD.currentgroup) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.currentcapt && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else {
                            characterD.buttons[i].classList.remove('nodisplay');
                        }
                    }
                }
                else {
                    if (characterD.currentcaptnode2) {
                        characterD.currentcaptnode2.classList.remove('thundertext');
                        if (characterD.currentcaptnode2.touchlink) {
                            characterD.currentcaptnode2.touchlink.classList.remove('active');
                        }
                    }
                    characterD.currentcapt2 = this.link;
                    characterD.currentcaptnode2 = this;
                    this.classList.add('thundertext');
                    if (this.touchlink) {
                        this.touchlink.classList.add('active');
                    }
                    else if (this.parentNode == newlined2) {
                        packsource.innerHTML = this.innerHTML;
                        packsource.classList.add('thundertext');
                    }
                    for (var i = 0; i < characterD.buttons.length; i++) {
                        if (characterD.currentcapt && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt, true)) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else if (characterD.currentgroup && characterD.buttons[i].group != characterD.currentgroup) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else {
                            if (characterD.buttons[i].activate) {
                                characterD.buttons[i].activate();
                            }
                            characterD.buttons[i].classList.remove('nodisplay');
                        }
                    }
                }
            }
            if (characterD.seperate) {
                for (var i = 0; i < characterD.seperate.length; i++) {
                    if (!characterD.seperate[i].nextSibling.querySelector('.button:not(.nodisplay)')) {
                        characterD.seperate[i].style.display = 'none';
                        characterD.seperate[i].nextSibling.style.display = 'none';
                    }
                    else {
                        characterD.seperate[i].style.display = '';
                        characterD.seperate[i].nextSibling.style.display = '';
                    }
                }
            }
            if (filternode) {
                if (filternode.querySelector('.active')) {
                    packsource.classList.add('thundertext');
                }
                else {
                    packsource.classList.remove('thundertext');
                }
            }
            if (e) e.stopPropagation();
        };
        for (i = 0; i < namecapt.length; i++) {
            if (namecapt[i] == 'newline') {
                newlined = document.createElement('div');
                newlined.style.marginTop = '5px';
                newlined.style.display = 'block';
                if (get.is.phoneLayout()) {
                    newlined.style.fontSize = '32px';
                }
                else {
                    newlined.style.fontSize = '22px';
                }
                newlined.style.textAlign = 'center';
                node.appendChild(newlined);
            }
            else if (newlined) {
                var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius');
                span.style.margin = '3px';
                span.style.width = 'auto';
                span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                span.link = namecapt[i];
                span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                newlined.appendChild(span);
                node[namecapt[i]] = span;
                if (namecapt[i] == '收藏') {
                    span._nature = 'fire';
                }
                else {
                    span._nature = 'wood';
                }
            }
            else {
                var span = document.createElement('span');
                span.innerHTML = ' ' + namecapt[i].toUpperCase() + ' ';
                span.link = namecapt[i];
                span.alphabet = true;
                span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
                node.appendChild(span);
            }
        }

        var xianhunCharacterGroup = Object.keys(xianhunCharacter), groups = [];
        xianhunCharacterGroup.forEach(item => {
            if (get.xjzh_checkChinese(get.translation(xianhunCharacter[item][1]))) groups.add(xianhunCharacter[item][1]);
        });
        groups.unique();
        var natures = ['water', 'soil', 'wood', 'metal'];
        var span = document.createElement('span');
        newlined.appendChild(span);
        span.style.margin = '8px';
        var clickGroup = function () {
            if (_status.dragged) return;
            if (characterD.currentcapt2 == '最近' && characterD.currentcaptnode2 != this && !characterD.currentcaptnode2.inited) {
                characterD.currentcapt2 = null;
                characterD.currentcaptnode2.classList.remove('thundertext');
                characterD.currentcaptnode2.inited = true;
                characterD.currentcaptnode2 = null;
            }
            var node = this, link = this.link;
            if (node.classList.contains('thundertext')) {
                characterD.currentgroup = null;
                characterD.currentgroupnode = null;
                node.classList.remove('thundertext');
                for (var i = 0; i < characterD.buttons.length; i++) {
                    if (characterD.currentcapt && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt)) {
                        characterD.buttons[i].classList.add('nodisplay');
                    }
                    else if (characterD.currentcapt2 && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt, true)) {
                        characterD.buttons[i].classList.add('nodisplay');
                    }
                    else {
                        characterD.buttons[i].classList.remove('nodisplay');
                    }
                }
            }
            else {
                if (characterD.currentgroupnode) {
                    characterD.currentgroupnode.classList.remove('thundertext');
                }
                characterD.currentgroup = link;
                characterD.currentgroupnode = node;
                node.classList.add('thundertext');
                for (var i = 0; i < characterD.buttons.length; i++) {
                    if (characterD.currentcapt && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt)) {
                        characterD.buttons[i].classList.add('nodisplay');
                    }
                    else if (characterD.currentcapt2 && characterD.buttons[i].capt != characterD.getCurrentCapt(characterD.buttons[i].link, characterD.buttons[i].capt, true)) {
                        characterD.buttons[i].classList.add('nodisplay');
                    }
                    else if (characterD.currentgroup == 'double') {
                        if (characterD.buttons[i]._changeGroup || characterD.buttons[i].group == 'ye') characterD.buttons[i].classList.remove('nodisplay');
                        else characterD.buttons[i].classList.add('nodisplay');
                    }
                    else {
                        if (characterD.buttons[i]._changeGroup || characterD.buttons[i].group == 'ye' || characterD.buttons[i].group != characterD.currentgroup) {
                            characterD.buttons[i].classList.add('nodisplay');
                        }
                        else {
                            characterD.buttons[i].classList.remove('nodisplay');
                        }
                    }
                }
            }
        };
        for (var i = 0; i < groups.length; i++) {
            var span = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
            span.style.margin = '3px';
            newlined.appendChild(span);
            span.innerHTML = get.translation(groups[i]);
            span.link = groups[i];
            span._nature = natures[i];
            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickGroup);
        }

        var span = document.createElement('span');
        newlined.appendChild(span);
        span.style.margin = '8px';

        packsource = ui.create.div('.tdnode.pointerdiv.shadowed.reduce_radius.reduce_margin');
        packsource.style.margin = '3px';
        newlined.appendChild(packsource);
        var filternode = null;
        var clickCaptNode = function (e) {
            delete _status.filterCharacter;
            ui.window.classList.remove('shortcutpaused');
            filternode.delete();
            filternode.classList.remove('shown');
            clickCapt.call(this.link, e);
        };
        /*if (get.is.phoneLayout() && lib.config.filternode_button) {
            newlined.style.marginTop = '';
            packsource.innerHTML = '筛选';
            filternode = ui.create.div('.popup-container.filter-character.modenopause');
            ui.create.div(filternode);
            filternode.listen(function (e) {
                if (this.classList.contains('removing')) return;
                delete _status.filterCharacter;
                ui.window.classList.remove('shortcutpaused');
                this.delete();
                this.classList.remove('shown');
                e.stopPropagation();
            });
            for (var i = 0; i < node.childElementCount; i++) {
                if (node.childNodes[i].tagName.toLowerCase() == 'span') {
                    node.childNodes[i].style.display = 'none';
                    node.childNodes[i].touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large.capt', node.childNodes[i].innerHTML);
                    node.childNodes[i].touchlink.link = node.childNodes[i];
                }
            }
            ui.create.node('br', filternode.firstChild);
        }
        else {*/
        packsource.innerHTML = '武将包';
        /* }*/
        newlined2 = document.createElement('div');
        newlined2.style.marginTop = '5px';
        newlined2.style.display = 'none';
        newlined2.style.fontFamily = 'xinwei';
        newlined2.classList.add('pointernode');
        if (get.is.phoneLayout()) {
            newlined2.style.fontSize = '32px';
        }
        else {
            newlined2.style.fontSize = '22px';
        }
        newlined2.style.textAlign = 'center';
        node.appendChild(newlined2);

        packsource.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
            if (_status.dragged) return;
            if (get.is.phoneLayout() && lib.config.filternode_button && filternode) {
                _status.filterCharacter = true;
                ui.window.classList.add('shortcutpaused');
                ui.window.appendChild(filternode);
                ui.refresh(filternode);
                filternode.classList.add('shown');
                var dh = filternode.offsetHeight - filternode.firstChild.offsetHeight;
                if (dh > 0) {
                    filternode.firstChild.style.top = (dh / 2) + 'px';
                }
                else {
                    filternode.firstChild.style.top = '';
                }
            }
            else {
                if (newlined2.style.display == 'none') {
                    newlined2.style.display = 'block';
                }
                else {
                    newlined2.style.display = 'none';
                }
            }
        });
        var packlist = [];
        for (var i = 0; i < lib.config.all.characters.length; i++) {
            if (!lib.config.characters.contains(lib.config.all.characters[i])) continue;
            packlist.push(lib.config.all.characters[i]);
        }
        for (var i in lib.characterPack) {
            if (!lib.config.all.characters.contains(i)) {
                packlist.push(i);
            }
        }
        for (var i = 0; i < packlist.length; i++) {
            var span = document.createElement('div');
            span.style.display = 'inline-block';
            span.style.width = 'auto';
            span.style.margin = '5px';
            if (get.is.phoneLayout()) {
                span.style.fontSize = '32px';
            }
            else {
                span.style.fontSize = '22px';
            }
            span.innerHTML = lib.translate[packlist[i] + '_character_config'];
            span.link = packlist[i];
            span.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', clickCapt);
            newlined2.appendChild(span);
            if (filternode) {
                span.touchlink = ui.create.div(filternode.firstChild, clickCaptNode, '.menubutton.large', span.innerHTML);
                span.touchlink.link = span;
            }
        }
        characterD = ui.create.dialog('hidden');
        characterD.classList.add('noupdate');
        characterD.classList.add('scroll1');
        characterD.classList.add('scroll2');
        characterD.classList.add('scroll3');
        characterD.addEventListener(lib.config.touchscreen ? 'touchend' : 'mouseup', function () {
            _status.clicked2 = true;
        });
        characterD.style.height = ((game.layout == 'long2' || game.layout == 'nova') ? 380 : 350) + 'px';
        characterD._scrollset = true;
        characterD.style.zIndex = '300';
        characterD.getCurrentCapt = function (link, capt, noalph) {
            var currentcapt = noalph ? this.currentcapt2 : this.currentcapt;
            if (this.seperatelist && noalph) {
                if (this.seperatelist[currentcapt].contains(link)) return capt;
                return null;
            }
            if (lib.characterDialogGroup[currentcapt]) {
                return lib.characterDialogGroup[currentcapt](link, capt);
            }
            if (lib.characterPack[currentcapt]) {
                if (lib.characterPack[currentcapt][link]) {
                    return capt;
                }
                return null;
            }
            return this.currentcapt;
        }
        characterD.add(node);
        characterD.add([list, 'character'], true);
        characterD.add(ui.create.div('.placeholder'));
        var equip_info = ui.create.div('.menu');
        equip_info.style.transition = 'left 0s,top 0s,opacity .3s';
        equip_info.style.width = '312px';
        equip_info.style['pointer-events'] = 'none';
        equip_info.style['text-align'] = 'left';
        equip_info.style.animation = 'fadeShow .3s';
        equip_info.style['-webkit-animation'] = 'fadeShow .3s';
        equip_info.style['z-index'] = 100000;
        for (i = 0; i < characterD.buttons.length; i++) {
            characterD.buttons[i].group = xianhunCharacter[characterD.buttons[i].link][1];
            characterD.buttons[i].capt = getCapt(characterD.buttons[i].link);
            characterD.buttons[i].item = item;
            characterD.buttons[i].onclick = function () {
                game.xjzh_useEquip(this.item, this.link);
                state.xjzh_onOpen.delete();
                state.xjzh_onOpen = null;
                state.refreshDialog();
            };
        }
        if ((lib.characterDialogGroup[lib.config.character_characterD_tool] ||
            lib.config.character_characterD_tool == '自创')) {
            clickCapt.call(node[lib.config.character_characterD_tool]);
        }
        bk.appendChild(characterD);
        state.xjzh_onOpen = characterD;
    } else {
        state.xjzh_onOpen.delete();
        state.xjzh_onOpen = null;
    };
}
