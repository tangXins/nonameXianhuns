import { lib, game, ui } from '../../../../../../noname.js';

/**
 * 用户名修改对话框组件
 * 从 memberCenterPage.js 提取
 * 创建一个包含输入框的对话框，确认后保存用户名
 */
export function openUserNameEditor() {
    var Name = ui.create.div(ui.window, {
        zIndex: '1000',
        left: '0', width: '100%',
        top: '0', height: '100%'
    });
    var inputDiv = ui.create.div(Name, {
        left: '50%', top: '30%',
        transform: 'translate(-50%, -50%)',
        width: '400px', height: '270px',
        textAlign: 'center',
        backgroundSize: '100%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/qishuFiles.png')",
    });
    var input = ui.create.node('input', inputDiv, {
        top: '110px', left: '80px',
        position: 'absolute',
        width: '230px', height: '20px',
        background: 'none', borderStyle: 'none'
    });
    input.id = 'xjzh_qishu_userName';
    var okBtm = ui.create.div(inputDiv, {
        left: '153px', width: '100px',
        bottom: '55px', height: '35px',
    }, function () {
        var value = document.getElementById('xjzh_qishu_userName').value;
        if (typeof value === 'string' && value.length > 0) {
            const config = game.xjzh_getQishuConfig();
            config.name = value;
            game.xjzh_saveQishuConfig(config);
            game.xjzh_openLoading(`已创建玩家名称为"${value}"的奇术要件存档`);
            Name.delete();
            game.xjzhAchi.openAchievementEquipPage();
        } else {
            game.xjzh_openLoading(`请输入任意长度的字符串作为用户名`);
        }
    });
    var cancelBtm = ui.create.div(inputDiv, {
        right: '35px', width: '25px',
        top: '42px', height: '25px',
    }, function () {
        Name.delete();
        game.xjzhAchi.openMemberCenterPage();
    });
}
