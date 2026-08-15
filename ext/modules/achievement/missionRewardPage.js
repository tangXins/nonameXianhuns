import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import { rewardLists } from "./rewardList.js"

// 打开任务奖励页面
const openMissionRewardPage = () => {
    game.pause2();
    var { window: achiWindow, bk, resize } = game.xjzh_createPageFrame({
        windowClass: '.xjzh-achiWindow',
        bgClass: '.xjzh-achiWindow-bk',
        exitClass: '.xjzh-achiWindow-return',
        onExit: function () {
            game.xjzhAchi.openAchievementMainPage();
        },
    });
    //成就文本内容
    var content = ui.create.div('.xjzh-achiWindow-textinner', ui.create.div('.xjzh-achiWindow-text', bk));
    lib.setScroll(content);

    // 注入动画样式（只注入一次）
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes shine-border {
        0% { box-shadow: 0 0 5px #00ffff; }
        25% { box-shadow: 0 0 15px #00ffff, inset 0 0 5px rgba(0,255,255,0.5); }
        50% { box-shadow: 0 0 25px #00ffff; }
        75% { box-shadow: 0 0 15px #00ffff, inset 0 0 5px rgba(0,255,255,0.5); }
        100% { box-shadow: 0 0 5px #00ffff; }
        }
        `;
    document.head.appendChild(styleElement);

    // 事件委托：在content上监听一次click，而非逐按钮绑定
    content.addEventListener('click', function (e) {
        const button = e.target.closest('.xjzh-achi-detail-btn');
        if (!button) return;
        const isClickable = button.getAttribute('data-clickable') === 'true';
        if (!isClickable) return;

        const achievementName = button.getAttribute('data-name');
        const info = rewardLists[achievementName];
        if (typeof info.unlocked == 'function') {
            info.unlocked();
            game.xjzhAchi.unlock(achievementName);
        }

        // 更新按钮状态为已领取
        button.className = button.className.replace('xjzh-achi-reward-available', 'xjzh-achi-unlocked');
        button.style.cssText = 'background:#cccccc;border:1px solid #999999;color:#666666;cursor:not-allowed;padding:10px 20px;font-size:24px;border-radius:10px;position:absolute;right:30px;top:10px;cursor:not-allowed;';
        button.setAttribute('data-clickable', 'false');
        button.textContent = '已领取';
    });

    //函数方法
    var state = {
        refreshList() {
            var list = Object.keys(rewardLists);

            // 获取配置信息
            let config = game.xjzh_getQishuConfig();
            let gotList = config.achi?.got ?? [];      // 已完成的成就
            let unlockList = config.achi?.unlock ?? []; // 已领取的成就

            gotList = gotList.map(name => game.xjzhAchi.ofName(name)[1]);

            // 对列表进行排序：已完成未领取 > 未完成 > 已完成已领取
            list.sort((a, b) => {
                const aGot = gotList.includes(a);
                const bGot = gotList.includes(b);
                const aUnlocked = unlockList.includes(a);
                const bUnlocked = unlockList.includes(b);

                if (aGot && !aUnlocked && !(bGot && !bUnlocked)) return -1;
                if (bGot && !bUnlocked && !(aGot && !aUnlocked)) return 1;
                if (aGot && aUnlocked && !(bGot && bUnlocked)) return 1;
                if (bGot && bUnlocked && !(aGot && aUnlocked)) return -1;
                return 0;
            });

            // 清空旧内容
            content.innerHTML = '';
            const frag = document.createDocumentFragment();

            var isFirst = true;
            for (var name of list) {
                // 分割线（首项不加）
                if (!isFirst) {
                    const splitP = document.createElement('p');
                    splitP.setAttribute('align', 'center');
                    const splitImg = document.createElement('img');
                    splitImg.src = lib.assetURL + "extension/仙家之魂/css/images/achievement/splitLine.png";
                    splitP.appendChild(splitImg);
                    frag.appendChild(document.createElement('br'));
                    frag.appendChild(splitP);
                    frag.appendChild(document.createElement('br'));
                } else {
                    isFirst = false;
                }

                let info = rewardLists[name];

                // 容器 <p>
                const p = document.createElement('p');
                p.style.cssText = "min-height:100px; position:relative; padding-right:120px;";

                // 成就图标
                const iconImg = document.createElement('img');
                iconImg.src = `${lib.assetURL}extension/仙家之魂/image/reward/${info.image}.png`;
                iconImg.style.cssText = 'height:195px;float:left;margin-right:30px;';
                iconImg.loading = 'lazy';
                p.appendChild(iconImg);

                // 已完成标记
                if (gotList.includes(name)) {
                    const gainedImg = document.createElement('img');
                    gainedImg.src = lib.assetURL + "extension/仙家之魂/css/images/achievement/isGained.png";
                    gainedImg.style.cssText = 'height:60px;';
                    p.appendChild(gainedImg);
                }

                // 成就名
                const nameSpan = document.createElement('span');
                nameSpan.style.cssText = "color:black;font-family:hwxinkai;font-size:55px;";
                nameSpan.innerHTML = `&nbsp;${name}&nbsp;&nbsp;&nbsp;`;
                p.appendChild(nameSpan);

                // 达成需求
                p.appendChild(document.createElement('br'));
                p.appendChild(document.createElement('br'));
                const infoSpan = document.createElement('span');
                infoSpan.style.cssText = 'font-size:22px;';
                infoSpan.innerHTML = `&nbsp;&nbsp;<b>◆${info.info}</b>`;
                p.appendChild(infoSpan);

                p.appendChild(document.createElement('br'));

                // 奖励
                p.appendChild(document.createElement('br'));
                const rewardSpan = document.createElement('span');
                rewardSpan.style.cssText = 'font-size:22px;';
                rewardSpan.innerHTML = `&nbsp;&nbsp;${info.extra}`;
                p.appendChild(rewardSpan);

                // 按钮
                let buttonClass = 'xjzh-achi-detail-btn';
                let buttonText = '';
                let buttonStyle = '';
                let isClickable = true;

                if (!gotList.includes(name)) {
                    buttonClass += ' xjzh-achi-not-completed';
                    buttonStyle = 'background:#cccccc;border:1px solid #999999;color:#666666;cursor:not-allowed;';
                    buttonText = '未完成';
                    isClickable = false;
                } else if (unlockList.includes(name)) {
                    buttonClass += ' xjzh-achi-unlocked';
                    buttonStyle = 'background:#cccccc;border:1px solid #999999;color:#666666;cursor:not-allowed;';
                    buttonText = '已领取';
                    isClickable = false;
                } else {
                    buttonClass += ' xjzh-achi-reward-available';
                    buttonStyle = 'background:#8a6d3b;border:2px solid #00ffff;box-shadow:0 0 10px #00ffff, inset 0 0 5px rgba(0,255,255,0.5);animation:shine-border 2s linear infinite;';
                    buttonText = '领取';
                    isClickable = true;
                }

                const btn = document.createElement('button');
                btn.className = buttonClass;
                btn.setAttribute('data-name', name);
                btn.setAttribute('data-clickable', String(isClickable));
                btn.style.cssText = `${buttonStyle}padding:10px 20px;font-size:24px;border-radius:10px;position:absolute;right:30px;top:10px;${isClickable ? 'cursor:pointer;' : 'cursor:not-allowed;'}`;
                btn.textContent = buttonText;
                p.appendChild(btn);

                frag.appendChild(p);
            }

            // 底部留白
            for (let i = 0; i < 7; i++) frag.appendChild(document.createElement('br'));

            content.appendChild(frag);
        },
    };
    state.refreshList();
};

export { openMissionRewardPage };