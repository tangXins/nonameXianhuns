import { lib, game, ui, get } from '../../../../../noname.js';
import { createAvatarPicker } from './components/AvatarPicker.js';
import { createSvipPanel } from './components/SvipPanel.js';
import { openUserNameEditor } from './components/UserNameEditor.js';

function throttle(func, delay) {
    let lastCall = 0;
    return function (/** @this {any} */ ...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

const openMemberCenterPage = () => {
    if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
    game.pause2();

    // 预计算所有数据
    if (typeof get.xjzh_qishuUserLevel() !== "number" || typeof get.xjzh_qishuUserExp() !== "number") game.xjzh_levelUp({ level: 1, exp: 0 });
    let requiredExp, level = get.xjzh_qishuUserLevel();
    if (level < 20) requiredExp = 30 + 15 * level;
    else if (level < 50) requiredExp = 86 + 50 * level;
    else requiredExp = 3500 + 800 * (level - 50);
    const qishuNameStr = `用户名：${get.xjzh_qishuUserName()}<br>等级：${level}<br>经验：${get.xjzh_qishuUserExp()}/${level < 100 ? requiredExp : 0}`;
    const userImgBase = `${lib.assetURL}extension/仙家之魂/css/images/user/`;
    const mcImgBase = `${lib.assetURL}extension/仙家之魂/css/images/memberCenter/`;
    const qishuImageUrl = game.getExtensionConfig("仙家之魂", "xjzh_qishuImageUrl") || `${userImgBase}title.png`;

    // 预加载所有背景图
    for (const url of [userImgBase + 'title.png', userImgBase + 'title2.png', mcImgBase + 'kuang2.png', mcImgBase + 'kuang.png', mcImgBase + 'buySvip.png', mcImgBase + 'buy.png']) {
        new Image().src = url;
    }

    // 资源清理句柄
    let avatarPicker = null;
    let throttledAdjustFontSizeHandle = null;
    let svipPanel = null;

    var { window: memberCenterPage, bk } = game.xjzh_createPageFrame({
        windowClass: '.xjzh-memberCenterPage',
        bgClass: '.xjzh-memberCenterPage-bk',
        exitClass: '.xjzh-memberCenterPage-return',
        sizeScale: 1.1,
        onExit: function () {
            if (avatarPicker) { avatarPicker.destroy(); avatarPicker = null; }
            if (throttledAdjustFontSizeHandle) {
                window.removeEventListener('resize', throttledAdjustFontSizeHandle);
                throttledAdjustFontSizeHandle = null;
            }
            game.xjzhAchi.openAchievementEquipPage();
        },
    });

    // 字体自适应：读写分离
    // adjustFontSize 需要在主内容和SVIP面板创建后各调用一次
    var qishuImage, qishuNameIntro;
    function adjustFontSize() {
        const scaleFactor = window.innerWidth / 1200;
        const firstTextSize = Math.max(20 * scaleFactor, 8);
        const secondTextSize = Math.max(35 * scaleFactor, 8);
        if (qishuNameIntro) qishuNameIntro.style.fontSize = firstTextSize + 'px';
        if (svipPanel) {
            svipPanel.svipTimpShow.style.fontSize = secondTextSize + 'px';
            svipPanel.svipPrivilegeText.style.fontSize = secondTextSize + 'px';
            svipPanel.svipPrivilege.style.fontSize = secondTextSize + 'px';
            svipPanel.buySvipShowText.style.fontSize = secondTextSize + 'px';
        }
    }

    // setTimeout(0) 让浏览器先 paint 空框架（+启动 setSize 过渡动画），
    // 再创建主内容DOM，避免首次打开卡顿
    setTimeout(() => {
        // 用户名字容器
        var qishuName = ui.create.div('.xjzh-memberCenterPage-names', bk);

        // 头像
        qishuImage = ui.create.div(qishuName, {
            position: 'absolute',
            left: '2.5%',
            top: '41.5%',
            width: '12%',
            height: '17%',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: '50%',
            zIndex: 20,
            backgroundImage: `url(${qishuImageUrl})`,
        });

        // 头像边框
        ui.create.div(qishuImage, {
            position: 'absolute',
            left: '-3%',
            top: '-4%',
            width: '110%',
            height: '110%',
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: '50%',
            zIndex: 10,
            backgroundImage: `url(${userImgBase}title2.png)`,
        });

        // 用户资料
        qishuNameIntro = ui.create.div(bk, {
            position: 'absolute',
            left: '24%',
            top: '16%',
            width: 'auto',
            height: 'auto',
            textAlign: 'left',
            fontSize: '200%',
            color: '#FFFF00',
            zIndex: 20,
        });
        qishuNameIntro.innerHTML = qishuNameStr;

        // 事件绑定
        qishuImage.listen(function () {
            if (avatarPicker) avatarPicker.changePicture();
        });
        qishuNameIntro.listen(function () {
            memberCenterPage.remove();
            game.resume2();
            openUserNameEditor();
        });

        adjustFontSize();

        // 延迟渲染重组件（rAF），不阻塞首屏
        requestAnimationFrame(() => {
            avatarPicker = createAvatarPicker({ bk, qishuImage });

            svipPanel = createSvipPanel({
                bk,
                onBuySuccess: function () {
                    memberCenterPage.delete();
                    openMemberCenterPage();
                },
            });

            adjustFontSize();
        });
    }, 0);

    const throttledAdjustFontSize = throttle(() => {
        if (qishuNameIntro) adjustFontSize();
    }, 200);
    throttledAdjustFontSizeHandle = throttledAdjustFontSize;
    window.addEventListener('resize', throttledAdjustFontSize);
};

export { openMemberCenterPage };
