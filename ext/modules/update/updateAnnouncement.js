import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';
import { updateLog } from './index.js';
import jsonInfo from '../../../info.json';
lib.init.css(lib.assetURL + "extension/仙家之魂/css", 'updateAnnouncement');
//let jsonInfo = await lib.init.promises.json(`${rootURL}/extension/仙家之魂/info.json`);

//以下代码借鉴自《启动界面美化》
class updateAnnouncement {
    showAnnouncements() {
        const version = jsonInfo.version;
        if (!Object.hasOwn(updateLog, version)) {
            alert("没有此版本更新日志！！！");
            return;
        }

        const updateLogVersion = updateLog[version];

        const openBackground = ui.create.div(".xjzh_update_background", ui.window || document.body);
        openBackground.style["background-color"] = "rgba(0, 0, 0, 0.5)";
        openBackground.style.zIndex = "2000";

        const background = ui.create.div(".xjzh_update_announcement", openBackground);

        const title = ui.create.div(".xjzh_update_announcement_zone", background);

        const leftTitle = ui.create.div(".xjzh_update_announcement_zone_title", title);
        leftTitle.innerHTML = "《仙家之魂》更新公告";

        const exit = ui.create.div(".xjzh_update_announcement_zone_exit", title);
        exit.onclick = () => {
            openBackground.remove();
        };

        const content = ui.create.div(".xjzh_update_announcement_zone", background);
        content.style.height = "85%";
        content.style.backgroundColor = "white";

        const contentZone = ui.create.div(".xjzh_update_announcement_mainZone", content);

        const titleZone = ui.create.div(".xjzh_update_announcement_titleZone", contentZone);

        titleZone.module_index = 1;

        titleZone.modules = {};

        //构建更新日志内容
        const buildUpdateLogContent = () => {
            let str = `<div style="width: 100%; text-align: center !important;"><br><b style="font-size: 30px;">仙家之魂${version}更新档说明</b><br><br></div>`;

            str += '<br><br><br><div style="text-align: center;">';

            const biaoti = Object.keys(updateLogVersion.changeLog);

            for (const key of biaoti) {
                if (!updateLogVersion.changeLog[key]?.length) continue;
                str += `<br><br><b style="font-size: 24px; line-height: 1.8;">${key}</b>`;
                for (const item of updateLogVersion.changeLog[key]) {
                    str += `<li style="font-size: 20px; text-align: left; line-height: 1.8;">${item}</li>`;
                }
            }

            str += '</div>';
            return str;
        };

        const list = [
            ["更新日志", buildUpdateLogContent()],
            ["扩展介绍", `
                <br><br><li>本扩展完全免费且开源，仅在QQ群1028575505、839180892、697310426发布且从未进行过任何宣发，若你通过其他来源获得此扩展所产生的任何问题均与作者无关;
                    <br><li>本扩展以二创三国杀武将为基础，同时兼具许多原创人物及武将，目前已拥有134个武将，设计均为原创;
                        <br><li>本扩展具有许多有趣的机制和玩法，如暗黑破坏神武将的魔力机制、会心机制，全武将均可使用的BUFF机制，仅限本扩展武将装备的奇术要件等等，希望能让你眼前一亮；
                            <br><li>本扩展内部分素材来源于网络，不作商业用途，如有侵权，可联系作者删除；
            `],
            ["获取途径", `
                <br><br><li>本扩展完全免费且开源，仅在QQ群1028575505、839180892、697310426发布且从未进行过任何宣发，以下群聊为作者常驻群，请扫描以下二维码加入群聊；
                            <br><li>加入QQ群聊【无名杀金庸群侠传交流群】，来与更多志同道合的人一起友好交流；
                                <br><img style='width: 50%;' src=${rootURL}extension/仙家之魂/image/erweima/xjzh_pic_qqqunma2.jpg></img>
                                    <br><li>加入QQ群聊【无名杀仙家之魂交流群】，来与更多志同道合的人一起友好交流；
                                        <br><img style='width: 50%;transform: scale(0.9);' src=${rootURL}extension/仙家之魂/image/erweima/xjzh_pic_qqqunma1.jpg></img>
                                            <br><li>加入QQ群聊【无名杀新新魔塔，瘟疫公司，海国图志，魔兽争霸，欧陆风云交流群】，来与更多志同道合的人一起友好交流；
                                                <br><img style='width: 50%;transform: scale(0.9);' src=${rootURL}extension/仙家之魂/image/erweima/xjzh_pic_qqqunma3.jpg></img>
            `],
        ];

        const switchModule = (targetIndex) => {
            if (targetIndex === titleZone.module_index) return;

            titleZone.modules[titleZone.module_index].style.backgroundColor = "#F3F7F8";

            titleZone.module_index = targetIndex;

            titleZone.modules[titleZone.module_index].style.backgroundColor = "#D3D3D3";

            pictureText.innerHTML = list[titleZone.module_index - 1][0];
            text.innerHTML = "<br>" + list[titleZone.module_index - 1][1];
        };

        for (let i = 1; i <= list.length; i++) {
            titleZone.modules[i] = ui.create.div(".xjzh_update_announcement_titleZone_module", titleZone);
            titleZone.modules[i].innerHTML = list[i - 1][0];
            titleZone.modules[i].number = i;
            titleZone.modules[i].onclick = () => switchModule(i);

            if (i === 1) titleZone.modules[i].style.backgroundColor = "#D3D3D3";
        }

        //主要区域中的分割线
        const line = ui.create.div(".xjzh_update_announcement_line", contentZone);

        //主要区域中的文本区域
        const textZone = ui.create.div(".xjzh_update_announcement_textZone", contentZone);

        //文本区域中的图像
        const picture = ui.create.div(".xjzh_update_announcement_textZone_picture", textZone);

        //图像中文字
        const pictureText = ui.create.div(".xjzh_update_announcement_textZone_pictureText", picture);
        pictureText.innerHTML = list[titleZone.module_index - 1][0];

        //文本区域中的文本
        const text = ui.create.div(".xjzh_update_announcement_textZone_text", textZone);
        text.innerHTML = "<br>" + list[titleZone.module_index - 1][1];
    };

};

const openUpdate = new updateAnnouncement();

export default openUpdate;