import { lib, game, ui, get } from '../../../../../../noname.js';

/**
 * SVIP面板组件
 * 从 memberCenterPage.js 提取
 * @param {Object} options
 * @param {Object} options.bk - 父容器
 * @param {Function} options.onBuySuccess - 购买成功后的回调
 * @returns {{ svipTimpShow: Object, svipPrivilegeText: Object, svipPrivilege: Object, buySvipShowText: Object }}
 */
export function createSvipPanel({ bk, onBuySuccess }) {
    // 预计算所有数据，避免在DOM操作中间插入函数调用
    let boolSvip = get.xjzh_checkSvipDate();
    const svipDaysText = !boolSvip ? "" : `剩余${get.xjzh_daysBetweenDates(game.xjzh_toDateString(new Date()), boolSvip[1])}天`;
    const highlightText = !boolSvip
        ? `<span style="color: #808080"><ul><li>经验获取倍率<li>恩赐概率提升<li>设置用户头像</ul></span>`
        : `<ul><li>经验获取倍率<li>恩赐概率提升<li>设置用户头像</ul>`;
    const imgBase = `${lib.assetURL}/extension/仙家之魂/css/images/memberCenter/`;

    //SVIP有效期文字
    var svipTimpShow = ui.create.div(bk, {
        position: 'absolute',
        right: '18%',
        bottom: '70%',
        width: 'auto',
        height: 'auto',
        textAlign: 'left',
        fontSize: '350%',
        color: '#FFFF00',
        letterSpacing: '10px',
        zIndex: 10,
    });
    svipTimpShow.innerHTML = `SVIP有效期：<br> ${svipDaysText}`;

    //SVIP有效期显示（backgroundImage合并到初始样式，减少单独style写入）
    var svipPrivilegeShow = ui.create.div(bk, {
        position: 'absolute',
        right: '14.7%',
        top: '11%',
        width: '100%',
        height: '100%',
        backgroundSize: "50% 52%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgBase}kuang2.png)`,
        zIndex: 9,
    });

    //SVIP特权文字
    var svipPrivilege = ui.create.div(svipPrivilegeShow, {
        position: 'absolute',
        left: '42%',
        top: '25%',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '350%',
        fontFamily: 'kaiti',
        color: '#FFFF00',
        zIndex: 9,
    });
    svipPrivilege.innerHTML = `SVIP特权`;

    //SVIP特效细节文字
    var svipPrivilegeText = ui.create.div(svipPrivilegeShow, {
        position: 'absolute',
        left: '38%',
        top: '35%',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: '350%',
        fontFamily: 'kaiti',
        color: '#FFFF00',
        zIndex: 9,
    });
    svipPrivilegeText.innerHTML = highlightText;

    var buySvipShowPage = ui.create.div(bk, {
        position: 'absolute',
        left: '25%',
        top: '11%',
        width: '100%',
        height: '100%',
        backgroundSize: "25%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgBase}kuang.png)`,
        zIndex: 9,
    });

    var buySvipShowText = ui.create.div(buySvipShowPage, {
        position: 'absolute',
        left: '42%',
        top: '25%',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '350%',
        fontFamily: 'kaiti',
        color: '#FFFF00',
        zIndex: 9,
    });
    buySvipShowText.innerHTML = `购买SVIP`;

    var buySvipShows = ui.create.div(buySvipShowPage, {
        position: 'absolute',
        left: '0%',
        bottom: '3%',
        width: '100%',
        height: '100%',
        backgroundSize: "20%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgBase}buySvip.png)`,
        zIndex: 9,
    });

    var buySvipShow = ui.create.div(buySvipShowPage, {
        position: 'absolute',
        left: '40.3%',
        top: '58%',
        width: '20%',
        height: '20%',
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgBase}buy.png)`,
        zIndex: 10,
    });
    buySvipShow.listen(function () {
        let bool = game.xjzh_buySvip();
        if (bool) {
            if (typeof onBuySuccess === 'function') onBuySuccess();
        }
    });

    return { svipTimpShow, svipPrivilegeText, svipPrivilege, buySvipShowText };
}
