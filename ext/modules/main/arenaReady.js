import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
import { introduces } from '../index.js';
import { xjzhTitle } from '../index.js';
import designAchievement from '../other/designAchievement.js';

export async function arenaReady() {
    // game.checkFile(`${lib.assetURL}/extension/仙家之魂/extension.js`,(a)=>{alert(a)});

    /**
     * 初始化仙家之魂成就界面
    */
    {
        lib.setPopped(ui.create.system("仙魂宝录", () => {
            if (game.xjzhAchi) game.xjzhAchi.openAchievementMainPage();
            else game.xjzh_createToast("未成功导入仙家之魂成就系统", 'error');
        }, true, true), null, 220);

        try {
            //成就初始化
            game.xjzhAchi.init();

            if (!game.getExtensionConfig("仙家之魂", "xjzh_importCalculateScore") && typeof game.xjzhAchi.calculateScore() == "number") {
                let num = game.xjzhAchi.calculateScore();
                if (num > 0) {
                    game.xjzh_changeTokens(num);
                    game.xjzh_changeSuipian(num * 50);
                }
                game.saveExtensionConfig("仙家之魂", "xjzh_importCalculateScore", true);
            }

            //在武将资料上显示成就是否完成
            let xianhuns = {
                ...lib.characterPack.XWTR,
                ...lib.characterPack.XWCS,
                ...lib.characterPack.XWDM,
                ...lib.characterPack.XWSG,
                ...lib.characterPack.XWTZ
            };
            let design = Object.keys(designAchievement);
            for (let name in xianhuns) {
                if (!lib.characterTitle[name] || !xjzhTitle[name]) continue
                if (xjzhTitle[name].includes(lib.characterTitle[name])) lib.characterTitle[name] = '';
                else lib.characterTitle[name] += '<br>';

                //普通胜利对局成就
                if (xjzhTitle[name]) lib.characterTitle[name] += `<a style='color:${game.xjzhAchi.hasAchi(xjzhTitle[name], 'character') ? "#FFD700" : "#F8F8FF"};text-decoration:none;'href=\"javascript:game.xjzhAchi.openAchievementView('character');\">${xjzhTitle[name]}${game.xjzhAchi.hasAchi(xjzhTitle[name], 'character') ? '（已完成）<br>' : '（未完成）<br>'}</a>`;

                //设计的成就
                if (design.includes(name)) {
                    for (let value of designAchievement[name]) {
                        //lib.characterTitle[name]+=`<br>${value[0]}`;
                        lib.characterTitle[name] += `<br><a style='color:${game.xjzhAchi.hasAchi(value[0], value[1]) ? "#FFD700" : "#F8F8FF"};text-decoration:none;'href=\"javascript:game.xjzhAchi.openAchievementView('${value[1]}');\">${value[0]}${game.xjzhAchi.hasAchi(value[0], value[1]) ? '（已完成）<br>' : '（未完成）<br>'}</a>`;
                        //lib.characterTitle[name]+=game.xjzhAchi.hasAchi(value[0],value[1])?'（已完成）<br>':'（未完成）<br>';
                    }
                }
            }
            game.xjzhAchi.saveConfig();
        }
        catch (e) {
            console.log(e + "错误：成就初始化失败");
        }
    }
    /** 初始化奇术配置的逻辑块
     * 检查 game.xjzh_getQishuConfig() 的返回值是否为对象类型
     * get.is.object() 方法用于判断传入的参数是否为对象
     * 若返回值不是对象类型，说明奇术配置可能未正确初始化或已损坏
    */
    {
        //初始化
        if (!get.is.object(game.xjzh_getQishuConfig())) {
            game.xjzh_resetQishu();
            /*let config = game.xjzh_getQishuConfig();
            let achiConfig = game.getExtensionConfig("仙家之魂", "xjzhAchiStorage");
            let qishuConfig = lib.config.xjzh_qishuyaojians;
            let saveData = { ...config, ...qishuConfig, achi: { ...achiConfig } };
            game.xjzh_saveQishuConfig(saveData);*/
            game.saveConfig("xjzh_qishuyaojians");
            game.saveExtensionConfig("仙家之魂", "xjzhAchiStorage");
        }
        
        // 材料自动转换：将旧材料转换为新的钥匙系统
        const config = game.xjzh_getQishuConfig();
        if (config && !config.cailiaoMigrated) {
            game.xjzh_migrateCailiao();
        }
    }
    /**
     * 处理技能、卡牌翻译的名词解释。
     * 判断仙家之魂技能翻译中可替换的名词，并替换为对应的链接
     * 在游戏中点击可弹出对应的弹窗
     * 弹窗内容为对应名词的详细解释
     * 弹窗内容来自introduces对象，其中包含了每个名词的详细解释
     * 如果introduces对象中没有对应的名词，则使用默认的翻译
     * 弹窗内容中的技能、卡牌名称也会被替换为对应的链接
     * 链接的样式为<a style='color:${colorx? colorx : "#c06d3b"}' href=\"javascript:game.xjzh_openDialog('xjzh_intro_${name}');\">${name}</a>
     */
    {
        let obj = Object.keys(Object.assign({ ...lib.skill }, { ...lib.card }, { ...introduces })).filter(name => {
            if (name.startsWith("xjzh_")) return true;
            return false;
        });

        let colorx = game.getExtensionConfig("金庸群侠传", "jy_changeJuesePageUIColor");
        colorx = colorx ? game.hasExtension("金庸群侠传") ? colorx : "#c06d3b" : "#c06d3b";

        // 关键词替换表：keyword → { dialog, display, lookahead }
        const keywordMap = {
            '魔力抵抗': {}, '召唤': {}, '骷髅牧师': {}, '骷髅风暴法师': {},
            '骷髅纵火者': {}, '地狱猎犬': {}, '点燃': {}, '中毒': {},
            '控制': {}, '目盲': {}, '眩晕': {}, '灵柩': {},
            '唤醒': {}, '解放': {}, '冰冻': {}, '灌注': {},
            '强固': {}, '燃烧': {}, '冰缓': {}, '感电': {},
            '周围': {}, '暴击': {}, '易伤': {}, '反击': {},
            '物理攻击': {}, '法术攻击': {}, '附近': {}, '友军': {},
            '飓风': {}, '会心': {}, '减速': {}, '七星命盘': {},
            '格挡上限': {},
            '格挡': { lookahead: '(?!上限)(?!几率)' },
            '定身': { lookahead: '(?!咒)' },
            '暴率': { dialog: '暴击几率', display: '暴击几率' },
            '暴伤': { dialog: '暴击伤害', display: '暴击伤害' },
            '暴球': { dialog: '暴击球', display: '暴击球' },
        };
        // 按长度降序排列，确保长关键词优先匹配（如"格挡上限"先于"格挡"）
        const sortedKeys = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
        const linkPattern = new RegExp(sortedKeys.map(k => k + (keywordMap[k].lookahead || '')).join('|'), 'g');

        for await (let name of obj) {
            if (((get.skillInfoTranslation(name, null).length > 0)) || introduces[name]) {
                let str = get.skillInfoTranslation(name, null) || introduces[name].info;
                str = str.replace(linkPattern, (match) => {
                    const cfg = keywordMap[match];
                    if (!cfg) return match;
                    const dialog = cfg.dialog || match;
                    const display = cfg.display || match;
                    return `<a style='color:${colorx}' href="javascript:game.xjzh_openDialog('${dialog}');">${display}</a>`;
                });
                get.skillInfoTranslation(name, null) ? lib.translate[name + "_info"] = str : introduces[name].info = str;
            };
        };
    };

    /**
     * 处理死灵法师拉马斯【魂火】相关配置的逻辑块。
     * 当仙家之魂扩展配置中的 `xjzh_diablo_hunhuo` 为假值时
     * 会清除本地存储的相关数据，更新扩展配置和全局配置，
     * 并将魂火列表添加到禁用列表中。
     */
    {
        let hunhuo = new Map([
            ["isAi", []],
            ["isPlayer", []],
        ]);
        if (!game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuoTip")) {
            /*alert("第一次安装【仙家之魂】或上一版本所有对局中均未出现死灵法师拉马斯这一角色的请无视此次提示");
            alert("由于死灵法师拉马斯的【魂火】写法更改，前一版本的存档已经不再支持新版本，已为你自动删除");
            alert("游戏将于5秒后自动重新启动");*/
            game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo", hunhuo);
            game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuoTip", true);
            /*setTimeout(function(){
                game.reload();
            },
            5000);*/
        }
        let list = lib.config.banned, bannedList = [...list], hunhuoConfig = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
        if (hunhuoConfig instanceof Map) {
            if (hunhuoConfig.get("isPlayer") && Array.isArray(hunhuoConfig.get("isPlayer"))) bannedList.addArray(hunhuoConfig.get("isPlayer"));
            if (hunhuoConfig.get("isAi") && Array.isArray(hunhuoConfig.get("isAi"))) bannedList.addArray(hunhuoConfig.get("isAi"));
        } else {
            game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo", hunhuo);
        }
        if (bannedList?.length) lib.config.banned = bannedList;
    };

    /**
     * 检查全局配置中 'extension_仙家之魂_tx_skillAnimation_showFps' 选项是否为 true，
     * 如果为 true，则调用 game 对象的 xjzh_showFps 方法，尝试显示帧率信息
     */
    if (game.getExtensionConfig("仙家之魂", "xjzh_showFps") !== "close") {
        game.xjzh_showFps('document.getElementById(id)');
    };

    /**
     *检查 "仙家之魂" 扩展的配置项 "xjzh_backgroundMusic" 的值是否不等于 "1"
     *若不等于 "1"，则调用 game 对象的 xjzh_playBackgroundMusic 方法，尝试播放背景音乐
     */
    if (game.getExtensionConfig("仙家之魂", "xjzh_backgroundMusic") != "1") {
        game.xjzh_playBackgroundMusic();
        ui.backgroundMusic.addEventListener('ended', game.xjzh_playBackgroundMusic);
    };


    /**
     * 检查 "仙家之魂" 扩展的配置项 "xjzh_backgroundPicture" 的值是否不等于 "1"。
     * 若不等于 "1"，则意味着需要设置特定的背景图片。
     * 调用 game 对象的 xjzh_playBackgroundPicture 方法，尝试设置背景图片。
     */
    if (game.getExtensionConfig("仙家之魂", "xjzh_backgroundPicture") != "1") {
        game.xjzh_playBackgroundPicture();
    };

    /**
     * 如果是否是首次加载游戏，如果是，则将首次加载标记设置为 false
     * 如果是首次加载，且当前模式为升华挑战模式，则跳转到身份模式
     */
    if (!sessionStorage.getItem('xjzh_firstloadMode')) {
        sessionStorage.setItem('xjzh_firstloadMode', 'false');
        if (get.mode() == "xjzh_challenge") {
            game.xjzh_createToast("首次加载游戏，即将跳转至身份模式！", 'info');
            game.saveConfig("mode", "identity");
            game.reload();
        }
    };

    /**
     * 判断当前模式是否是《仙家之魂》升华试炼模式
     * 如果是，则判断材料是否足够
     * 如果材料不足，则弹出提示框，提示玩家材料不足，并跳转到身份模式
     */
    if (get.mode() == "xjzh_challenge") {
        if (lib.storage["current"]?.length && lib.storage["current"].includes('_')) {
            let keys = lib.storage["current"], challenges = get.challenges();
            let index = keys.indexOf('_');
            let choice = keys.substring(0, index);
            if (Object.keys(challenges).includes(choice)) {
                if (challenges[choice].consumable && typeof challenges[choice].consumable == 'function' && !challenges[choice].consumable()) {
                    game.xjzh_createToast("材料不足，即将跳转至身份模式！", 'warning');
                    game.saveConfig("mode", "identity");
                    game.reload();
                }
            }
        }
    };

    /**
     * 处理角色的名字前缀。
    */
    {
        lib.namePrefix.set('esp', {
            color: "#faecd1",
            nature: "orangemm",
            showName: "梦",

        });
    };

    /**
     * 清除本扩展一些无用的config项
     */
    {
        let configKeysList = ['xjzhAchiNew', 'xjzh_diablo_hunhuo', 'xjzh_importTips2', 'xjzh_qishufilesOnload', 'xjzh_sanguo_guhuo'];
        configKeysList.forEach(key => {
            game.saveConfig(key);
        });

        game.saveExtensionConfig("仙家之魂", "svipOptions");
    };


    /**
     * 游戏结束获取奖励和显示结算的函数
     */
    {
        if (game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") && game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") !== "close") {
            lib.onover.push(game.xjzh_withPreCheck(game.xjzh_originalFunction));
        }
    }

    /**
     * 删除十周年UI文件夹的本扩展的势力图片
     */
    {
        let num = await game.promises.checkFile(`extension/十周年UI/image/decoration/name_xjzh_xingGroup.png`);
        if (num == 1) {
            game.removeFile(`extension/十周年UI/image/decoration/name_xjzh_xingGroup.png`);
        }
    }

    /**
     * 清除暂时被禁用的亚非克拉奇术要件信息
     */
    {
        const playerName = "xjzh_diablo_yafeikela";
        const qishuList = [
            "xjzh_qishu_wuyan",
            "xjzh_qishu_waxilidedaogao"
        ];

        let qishuEquipsList = game.xjzh_getQishuConfig() || game.xjzh_resetQishu();

        if (qishuEquipsList.equip && Object.keys(qishuEquipsList.equip).length) {
            qishuList.forEach(key => {
                if (qishuEquipsList.equip[key]?.includes(playerName)) {
                    qishuEquipsList.equip[key] = qishuEquipsList.equip[key].filter(i => i !== playerName);
                }
            });
        }

        if (qishuEquipsList.player?.[playerName]) {
            if (qishuEquipsList.player[playerName].some(item => qishuList.includes(item))) {
                qishuEquipsList.player[playerName] = qishuEquipsList.player[playerName]
                    .filter(item => !qishuList.includes(item));
            }
        }

        game.xjzh_saveQishuConfig(qishuEquipsList);
    }

};