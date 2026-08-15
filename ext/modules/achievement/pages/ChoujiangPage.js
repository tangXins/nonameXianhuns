import { lib, game, ui, get, ai, _status } from '../../../../../../../noname.js';
import eventListener from '../eventListener.js';

// 品质颜色映射配置
const QUALITY_CONFIG = {
    myth: {
        borderColor: '#FF9800',
        bgGradient: 'linear-gradient(135deg, #E65100, #BF360C)',
        glowColor: '#FFB74D',
        name: '神话'
    },
    epic: {
        borderColor: '#9C27B0',
        bgGradient: 'linear-gradient(135deg, #6A1B9A, #4A148C)',
        glowColor: '#BA68C8',
        name: '史诗'
    },
    perfect: {
        borderColor: '#2196F3',
        bgGradient: 'linear-gradient(135deg, #1565C0, #0D47A1)',
        glowColor: '#64B5F6',
        name: '完美'
    },
    fine: {
        borderColor: '#4CAF50',
        bgGradient: 'linear-gradient(135deg, #2E7D32, #1B5E20)',
        glowColor: '#81C784',
        name: '精良'
    },
    common: {
        borderColor: '#9E9E9E',
        bgGradient: 'linear-gradient(135deg, #757575, #424242)',
        glowColor: '#BDBDBD',
        name: '普通'
    },
    level7: {
        borderColor: '#FF5722',
        bgGradient: 'linear-gradient(135deg, #D84315, #BF360C)',
        glowColor: '#FF8A65',
        name: '7级'
    },
    level6: {
        borderColor: '#795548',
        bgGradient: 'linear-gradient(135deg, #5D4037, #3E2723)',
        glowColor: '#A1887F',
        name: '6级'
    },
    level5: {
        borderColor: '#FFC107',
        bgGradient: 'linear-gradient(135deg, #FFB300, #FF8F00)',
        glowColor: '#FFE082',
        name: '5级'
    },
    level4: {
        borderColor: '#00BCD4',
        bgGradient: 'linear-gradient(135deg, #00838F, #006064)',
        glowColor: '#4DD0E1',
        name: '4级'
    },
    level3: {
        borderColor: '#03A9F4',
        bgGradient: 'linear-gradient(135deg, #0277BD, #01579B)',
        glowColor: '#4FC3F7',
        name: '3级'
    },
    level2: {
        borderColor: '#8BC34A',
        bgGradient: 'linear-gradient(135deg, #689F38, #558B2F)',
        glowColor: '#C5E1A5',
        name: '2级'
    },
    level1: {
        borderColor: '#BDBDBD',
        bgGradient: 'linear-gradient(135deg, #757575, #424242)',
        glowColor: '#E0E0E0',
        name: '1级'
    },
    suipian: {
        borderColor: '#607D8B',
        bgGradient: 'linear-gradient(135deg, #455A64, #37474F)',
        glowColor: '#90A4AE',
        name: '碎片'
    },
    svip: {
        borderColor: '#E91E63',
        bgGradient: 'linear-gradient(135deg, #C2185B, #880E4F)',
        glowColor: '#F48FB1',
        name: '会员卡'
    },
    jingpo: {
        borderColor: '#FFD700',
        bgGradient: 'linear-gradient(135deg, #B8860B, #8B6914)',
        glowColor: '#FFE55C',
        name: '精魄'
    }
};

// 获取奖励品质配置
function getRewardConfig(result) {
    // 宝箱类型
    if (Array.isArray(result) && result[0] === 'chest') {
        var chestCfg = game.xjzh_getDollarChestConfig()[result[1]];
        if (chestCfg) {
            var qualityKey = result[1].replace('xjzh_dollarChest_', '');
            return QUALITY_CONFIG[qualityKey] || QUALITY_CONFIG.common;
        }
    }
    // svip类型
    if (Array.isArray(result) && result[0] === 'svip') {
        return QUALITY_CONFIG.svip;
    }
    // 碎片类型
    if (Array.isArray(result) && result[0] === 'suipian') {
        return QUALITY_CONFIG.suipian;
    }
    // 材料类型
    if (Array.isArray(result) && result[0] && result[0].indexOf('cailiao') !== -1) {
        var cailiaoKey = result[0];
        if (cailiaoKey.indexOf('wanmei') !== -1) return QUALITY_CONFIG.level6;
        if (cailiaoKey.indexOf('jingliang') !== -1) return QUALITY_CONFIG.level5;
        if (cailiaoKey.indexOf('liezhi') !== -1) return QUALITY_CONFIG.level4;
        return QUALITY_CONFIG.common;
    }
    // 精魄
    if (result === 'jingpo' || (typeof result === 'string' && result === 'jingpo')) {
        return QUALITY_CONFIG.jingpo;
    }
    // 装备类型 - 根据等级获取配置
    if (typeof result === 'string' && !Array.isArray(result)) {
        var info = get.xjzh_equipInfo(result);
        if (info && info.level) {
            var levelKey = 'level' + info.level;
            return QUALITY_CONFIG[levelKey] || QUALITY_CONFIG.level1;
        }
    }
    // 数组形式的奖励
    if (Array.isArray(result) && result[0] && result[0].indexOf('cailiao') !== -1) {
        var cailiaoKey2 = result[0];
        if (cailiaoKey2.indexOf('wanmei') !== -1) return QUALITY_CONFIG.level6;
        if (cailiaoKey2.indexOf('jingliang') !== -1) return QUALITY_CONFIG.level5;
        if (cailiaoKey2.indexOf('liezhi') !== -1) return QUALITY_CONFIG.level4;
        return QUALITY_CONFIG.common;
    }
    return QUALITY_CONFIG.level1;
}

// 获取奖励显示信息
function getRewardDisplay(result) {
    // 宝箱类型
    if (Array.isArray(result) && result[0] === 'chest') {
        var chestCfg = game.xjzh_getDollarChestConfig()[result[1]];
        if (chestCfg) {
            return {
                icon: chestCfg.icon,
                name: chestCfg.name,
                count: 1,
                quality: chestCfg.quality
            };
        }
    }
    // svip类型
    if (Array.isArray(result) && result[0] === 'svip') {
        return {
            icon: lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cailiao/svip.jpg',
            name: '超级会员',
            count: result[1],
            quality: '会员卡'
        };
    }
    // 碎片类型
    if (Array.isArray(result) && result[0] === 'suipian') {
        return {
            icon: lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cailiao/suipian.jpg',
            name: '奇术碎片',
            count: result[1],
            quality: '碎片'
        };
    }
    // 材料类型
    if (Array.isArray(result) && result[0] && result[0].indexOf('cailiao') !== -1) {
        return {
            icon: lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cailiao/' + result[0] + '.jpg',
            name: get.xjzh_cailiaoTranslate(result[0]),
            count: result[1],
            quality: getRewardConfig(result).name
        };
    }
    // 精魄
    if (result === 'jingpo') {
        return {
            icon: lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg',
            name: '精魄',
            count: 1,
            quality: '精魄'
        };
    }
    // 装备类型
    if (typeof result === 'string' && !Array.isArray(result)) {
        var info = get.xjzh_equipInfo(result);
        var name = info ? info.translate : result;
        return {
            icon: lib.assetURL + 'extension/仙家之魂/image/qishuyaojian/cards/' + result + '.png',
            name: name,
            count: 1,
            quality: info && info.level ? info.level + '级' : ''
        };
    }
    return {
        icon: '',
        name: '未知奖励',
        count: 1,
        quality: ''
    };
}

// 创建统一卡片样式的奖励展示元素
function createRewardCard(result, position, isSingle) {
    var config = getRewardConfig(result);
    var display = getRewardDisplay(result);

    var card = ui.create.div('.xjzh-choujiang-result', position, isSingle ? {} : {});

    // 设置卡片样式
    card.style.border = '3px solid ' + config.borderColor;
    card.style.borderRadius = '12px';
    card.style.background = config.bgGradient;
    card.style.boxShadow = '0 0 25px ' + config.glowColor + ', inset 0 0 15px rgba(0,0,0,0.3)';
    card.style.padding = '8px';
    card.style.boxSizing = 'border-box';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'space-between';
    card.style.animation = 'xjzh-card-appear 0.4s ease-out';

    // 品质标签
    var qualityTag = ui.create.div(card);
    qualityTag.style.cssText = 'position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:' + config.borderColor + ';color:#fff;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:bold;text-shadow:0 1px 2px rgba(0,0,0,0.5);white-space:nowrap;';
    qualityTag.innerHTML = config.name;

    // 图片容器
    var imgContainer = ui.create.div(card);
    imgContainer.style.cssText = 'width:100%;height:65%;display:flex;align-items:flex-end;justify-content:center;margin-top:8px;';

    if (display.icon) {
        var img = ui.create.div(imgContainer);
        img.style.cssText = 'width:80%;height:80%;background-size:contain;background-repeat:no-repeat;background-position:center top;';
        img.style.backgroundImage = "url('" + display.icon + "')";
    }

    // 名称
    var nameDiv = ui.create.div(card);
    nameDiv.style.cssText = 'width:100%;text-align:center;color:#fff;font-size:12px;font-weight:bold;text-shadow:0 1px 3px rgba(0,0,0,0.8);padding-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    nameDiv.innerHTML = display.name;

    // 数量
    if (display.count > 1) {
        var countDiv = ui.create.div(card);
        countDiv.style.cssText = 'top:80%;width:100%;text-align:center;color:#FFD700;font-size:14px;font-weight:bold;text-shadow:0 1px 3px rgba(0,0,0,0.8);margin-top:auto;padding-bottom:4px;';
        countDiv.innerHTML = '×' + display.count;
    }

    return card;
}

//打开恩赐页面
export function openAchievementChoujiang() {
    if (!game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") || game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") === "close") return;
    game.pause2();
    //覆盖图层
    var bookWindow = ui.create.div('.xjzh-bookWindow', {
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/choujiang.png')",
    });

    document.body.appendChild(bookWindow);
    //背景图层
    var bk = ui.create.div('.xjzh-bookWindow-bk', {
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/choujiang2.png')",
    });

    //退出按钮
    var exit = ui.create.div(bookWindow, {
        left: '0', width: '10%',
        top: '0', height: '15%', zIndex: '10',
        borderRadius: '0 0 100% 0', backgroundRepeat: 'no-repeat',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/exit.png')",
        backgroundSize: '80%',
    });
    exit.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementEquipPage();
    });
    //精魄数量显示
    var tokens = ui.create.div(bk, {
        right: '3%', width: '15%',
        top: '2.1%', height: '7%',
        backgroundSize: '100%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/jingpolan.png')",
    });
    var tokensNum = ui.create.div(tokens, {
        left: '25%', width: '50%',
        top: '16%', height: '80%',
        color: 'white', textShadow: 'none',
        textAlign: 'center', fontSize: '70%',
    });
    tokensNum.innerHTML = get.xjzh_tokens();

    eventListener.on('tokensUpdated', () => {
        tokensNum.innerHTML = get.xjzh_tokens();
    });
    /*tokensNum.listen(function(){
        var boxTime=ui.create.div(bk,{
            left:'60%',width:'50%',
            top:'13.5%',height:'80%',
            color:'white',textShadow:'none',
            textAlign:'center',fontSize:'100%',
        });*/

    /*function format(dataString){
        var time = new Date(dataString);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }*/

    /*var targetDate=lib.config.xjzh_qishuyaojians.date+86400000;

    function diffTime(current,target){
        var sub = Math.ceil((target-current)/1000)//时间戳
        //计算天数
        var day = parseInt(sub/(60*60*24));
        if(day<0) day=0;
        //计算小时
        var hours = parseInt(sub%(60*60*24)/(60*60));
        if(hours<0) hours=0;
        //计算分钟
        var minutes = parseInt(sub%(60*60)/60);
        if(minutes<0) minutes=0;
        //计算秒
        var seconds = sub%60;
        if(seconds<0) seconds=0;
        var obj = {
            day:day,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        }
        return obj
    }
    //用间隔定时器帮助自动输出，不用手动刷新
    setInterval(function(){
        //定义返回当前时间对象
        var currentDate=new Date();
        var res = diffTime(currentDate,targetDate);
        window.xjzh_diffTime=((res.day*24*60)+(res.hours*60)+(res.minutes)+(res.seconds/60))*60*1000;
        boxTime.innerHTML = `下次免费精魄剩余-${res.day}天${res.hours}时${res.minutes}分${res.seconds}秒`
    },1000);

    var tokensTimeDelete=ui.create.div(ui.window,{
        zIndex:10000,
        width:'100%',height:'100%'
    });
    tokensTimeDelete.listen(function(){
        boxTime.delete();
        tokensTimeDelete.delete();
    });

});*/
    //碎片数量显示
    var suipian = ui.create.div(bk, {
        right: '18%', width: '15%',
        top: '2%', height: '7%',
        backgroundSize: '100%',
        backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/suipianlan.png')",
    });
    var suipianNum = ui.create.div(suipian, {
        left: '25%', width: '50%',
        top: '25%', height: '80%',
        color: 'white', textShadow: 'none',
        textAlign: 'center', fontSize: '150%',
    });
    suipianNum.innerHTML = get.xjzh_suipian();

    eventListener.on('suipianUpdated', () => {
        suipianNum.innerHTML = get.xjzh_suipian();
    });


    eventListener.on('restTsUpdated', () => {
        suipianNum.innerHTML = get.xjzh_suipian();
        tokensNum.innerHTML = get.xjzh_tokens();
    });
    //珍宝
    /*var zhenbaoKuang=ui.create.div(bk,{
        left:'80%',width:'15%',
        top:'15%',height:'37.5%',
        transform:'rotateZ(5deg)',
        backgroundSize:'100%',backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/reward_bg.png')",
    });
    var zhenbao=ui.create.div(bk,{
        zIndex:'-1',
        left:'81%',width:'13%',
        top:'16.5%',height:'35%',
        transform:'rotateZ(5deg)',
    });
    zhenbao.setBackground('xjzh_kailuoya','character');
    var zhenbaoText=ui.create.div(bk,{
        left:'76%',width:'8%',
        top:'35%',height:'19%',
        transform:'rotateZ(5deg)',
        backgroundSize:'100%',backgroundImage:"url('"+lib.assetURL+"extension/仙家之魂/css/images/qishuyaojian/reward_flag.png')",
    });*/
    //抽奖
    var map = {
        7: ["svip"],
        6: ["jingpo", "xjzh_cailiao_wanmeiKey"],
        5: ["xjzh_cailiao_jingliangKey", "xjzh_cailiao_liezhiKey"],
        4: [],
        3: [],
        2: [],
        1: []
    };
    for (var i in lib.xjzh_qishuyaojians) {
        var info = get.xjzh_equipInfo(i);
        if (info.level && info.level < 5) {
            if (!info.filter) map[info.level].push(i);
        }
    }
    //抽奖函数
    var chou = function () {
        var result = [], cishu = this.cishu || 1;
        if (get.xjzh_tokens() < cishu) {
            game.xjzh_openLoading("你的精魄不足");
            return;
        }
        game.xjzh_changeSuipian(cishu);
        game.xjzh_changeTokens(-cishu);
        tokensNum.innerHTML = get.xjzh_tokens();
        suipianNum.innerHTML = get.xjzh_suipian();
        game.playAudio('..', 'extension', '仙家之魂/audio/other', 'choujiang');
        var fazhenbk = ui.create.div('.xjzh-bookWindow', bookWindow);
        var exitFunc = function () { fazhenbk.delete() };
        var fazhen1 = ui.create.div('.xjzh-fazhen1', fazhenbk);
        var fazhen2 = ui.create.div('.xjzh-fazhen2', fazhenbk);
        var fazhen3 = ui.create.div('.xjzh-fazhen3', fazhenbk);
        fazhenbk.listen(exitFunc);
        fazhen1.listen(exitFunc);

        // 会员加成计算：每10天+1%高品质加成，上限5%
        let boolSvip = get.xjzh_checkSvipDate();
        let bonusPercent = 0;
        if (boolSvip) {
            let svipDays = get.xjzh_daysBetweenDates(game.xjzh_toDateString(new Date()), boolSvip[1]);
            bonusPercent = Math.min(5, Math.floor(svipDays / 10));
        }
        let highBonus = bonusPercent / 100;

        for (var i = 0; i < cishu; i++) {
            var num = Math.random();

            // ===== 高品质宝箱（会员加成）=====
            if (num < 0.02 + highBonus) {
                // 神话宝箱 (2%)
                game.xjzh_changeDollarChest('xjzh_dollarChest_myth', 1);
                result.push(['chest', 'xjzh_dollarChest_myth']);
            }
            else if (num < 0.05 + highBonus) {
                // 史诗宝箱 (3%)
                game.xjzh_changeDollarChest('xjzh_dollarChest_epic', 1);
                result.push(['chest', 'xjzh_dollarChest_epic']);
            }
            else if (num < 0.07 + highBonus) {
                // 7级：svip 3-5天 (2%)
                let svipDays = get.rand(3, 5);
                result.push(["svip", svipDays]);
                game.xjzh_gainSvipTime(svipDays, false);
            }
            else if (num < 0.10 + highBonus) {
                // 6级：精魄/完美钥匙 (3%)
                let item = map[6].randomGet();
                if (item == "jingpo") {
                    game.xjzh_changeTokens(1);
                    result.push("jingpo");
                } else {
                    game.xjzh_changeCailiao(item, 1);
                    result.push([item, 1]);
                }
            }
            else if (num < 0.12 + highBonus) {
                // 完美宝箱 (2%)
                game.xjzh_changeDollarChest('xjzh_dollarChest_perfect', 1);
                result.push(['chest', 'xjzh_dollarChest_perfect']);
            }
            else if (num < 0.17 + highBonus) {
                // 4级装备 (5%)
                let item = map[4].randomGet();
                game.xjzh_gainEquip(item);
                result.push(item);
            }
            else if (num < 0.22 + highBonus) {
                // 精良宝箱 (5%)
                game.xjzh_changeDollarChest('xjzh_dollarChest_fine', 1);
                result.push(['chest', 'xjzh_dollarChest_fine']);
            }

            // ===== 中品质宝箱（无加成）=====
            else if (num < 0.37 + highBonus) {
                // 普通宝箱 (15%)
                game.xjzh_changeDollarChest('xjzh_dollarChest_common', 1);
                result.push(['chest', 'xjzh_dollarChest_common']);
            }

            // ===== 原有低品质奖励（无加成）=====
            else if (num < 0.40 + highBonus) {
                // 5级材料 (3%)
                let rand = [5, 7].randomGet();
                if (rand === 7) {
                    result.push(["svip", 1]);
                    game.xjzh_gainSvipTime(1, false);
                } else {
                    let count = get.rand(1, 2);
                    let cailiao = map[5].randomGet();
                    game.xjzh_changeCailiao(cailiao, count);
                    result.push([cailiao, count]);
                }
            }
            else if (num < 0.425 + highBonus) {
                // 3级装备 (2.5%)
                let item = map[3].randomGet();
                game.xjzh_gainEquip(item);
                result.push(item);
            }
            else if (num < 0.55 + highBonus) {
                // 2级装备 (12.5%)
                let item = map[2].randomGet();
                game.xjzh_gainEquip(item);
                result.push(item);
            }
            else if (num < 0.65 + highBonus) {
                // 1级装备 (10%)
                let item = map[1].randomGet();
                game.xjzh_gainEquip(item);
                result.push(item);
            } else {
                // 碎片（兜底，压缩至35%）
                let suipianNum = get.rand(5, 35);
                game.xjzh_changeSuipian(suipianNum);
                result.push(["suipian", suipianNum]);
            }
        }

        setTimeout(function () {
            if (cishu == 1) {
                // 单抽：使用统一卡片样式
                var card = createRewardCard(result[0], fazhen1, true);
                card.style.top = '37%';
                card.style.left = '40%';
                card.style.width = '15%';
                card.style.height = '25%';
            } else {
                // 十连抽：使用统一卡片样式
                var list = [];
                for (var i = 0; i < 10; i++) {
                    var index = i;
                    if (index > 4) index -= 5;
                    var card = createRewardCard(result[i], null, false);
                    card.style.top = (i > 4 ? '60%' : '20%');
                    card.style.left = index * 25 - 10 + '%';
                    card.style.width = '18%';
                    card.style.height = '28%';
                    list.push(card);
                }
                // 依次展示卡片
                fazhen1.appendChild(list[0]);
                var nowShow = 1;
                var Timeout = function () {
                    setTimeout(function () {
                        fazhen1.appendChild(list[nowShow]);
                        nowShow++;
                        if (nowShow < 10) Timeout();
                    }, 200);
                };
                Timeout();
            }
        }, 2000);
        tokensNum.innerHTML = get.xjzh_tokens();
        suipianNum.innerHTML = get.xjzh_suipian();
    };
    var chouBtm1 = ui.create.div(bk, {
        left: '42%', width: '12%',
        top: '76.5%', height: '8%',
    });
    var chouBtm2 = ui.create.div(bk, {
        left: '63%', width: '12%',
        top: '76.5%', height: '8%',
    });
    chouBtm2.cishu = 10;
    chouBtm1.listen(chou);
    chouBtm2.listen(chou);
    //兑换商店
    var shopBtm = ui.create.div(bk, {
        right: '2%', width: '8%',
        bottom: '23%', height: '15%',
        borderRadius: '50%',
    });
    var openShop = function () {
        //覆盖图层
        var shopWindow = ui.create.div('.xjzh-bookWindow', bookWindow);
        //商店
        var shop = ui.create.div('.xjzh-blackboard', shopWindow, {
            fontSize: shopWindow.clientHeight * 0.8 + 'px',
        });
        var shopText = ui.create.div(shop, {
            top: '3%', height: '7%',
            left: '35%', width: '30%',
            color: 'black', textShadow: 'none',
            textAlign: 'center', fontSize: '6%'
        });
        shopText.innerHTML = '兑换商店';
        //退出按钮
        var exit = ui.create.div('.xjzh-bookWindow-return', shop, {
            left: '100%',
        });
        exit.listen(function () {
            shopWindow.delete();
            lib.onresize.remove(resize2);
        });
        //滚动窗口
        var duihuanWindow = ui.create.div(shop, {
            zIndex: '-1',
            left: '5%', width: '90%',
            top: '13%', height: '80%',
            overflow: 'auto'
        });
        //兑换列表
        var list = [
            {
                name: 'jingpo',
                setImage(btm) {
                    btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
                    btm.style.backgroundSize = '100% 100%';
                    btm.style.backgroundPosition = '50% 60%';
                    var suipians = ui.create.div(btm, {
                        top: '3%', bottom: '5%',
                        left: '5%', right: '5%',
                        borderRadius: '5%'
                    })
                },
                content() {
                    game.xjzh_changeTokens(1);
                },
                price: 75,
            },
            {
                name: 'xjzh_cailiao_liezhiKey',
                setImage(btm) {
                    btm.style.backgroundImage = `url('${lib.assetURL}extension/仙家之魂/image/qishuyaojian/cailiao/${this.name}.jpg')`;
                    btm.style.backgroundSize = '100% 100%';
                    btm.style.backgroundPosition = '50% 60%';
                    var suipians = ui.create.div(btm, {
                        top: '3%', bottom: '5%',
                        left: '5%', right: '5%',
                        borderRadius: '5%'
                    })
                },
                content() {
                    game.xjzh_changeCailiao("xjzh_cailiao_liezhiKey", 1);
                },
                price: 40,
            },
            {
                name: 'xjzh_qishu_bubaiwangzhe',
                setImage(btm) {
                    btm.style.backgroundImage = `url('${lib.assetURL}extension/仙家之魂/image/qishuyaojian/cards/${this.name}.png')`;
                    btm.style.backgroundSize = '100% 100%';
                    btm.style.backgroundPosition = '50% 60%';
                    var suipians = ui.create.div(btm, {
                        top: '3%', bottom: '5%',
                        left: '5%', right: '5%',
                        borderRadius: '5%'
                    })
                },
                content() {
                    game.xjzh_gainEquip("xjzh_qishu_bubaiwangzhe");
                },
                price: 5000,
            },
            //等阶1
            'xjzh_qishu_daojian',
            'xjzh_qishu_shengmingfusu',
            'xjzh_qishu_heianxuewu',
            'xjzh_qishu_maoxianmingyun',
            'xjzh_qishu_jishudanyao',
            'xjzh_qishu_guimeihuanying',
            //等阶2
            'xjzh_qishu_yaojishi',
            'xjzh_qishu_wushitongku',
            'xjzh_qishu_talaxia',
            'xjzh_qishu_qiyue',
            'xjzh_qishu_siwanghuanxing',
            'xjzh_qishu_chengfa',
            //等阶3
            'xjzh_qishu_fuchou',
            'xjzh_qishu_huanji',
            'xjzh_qishu_wuqijingtong',
            'xjzh_qishu_fangjujingtong',
            'xjzh_qishu_binglengjiqiao',
            "xjzh_qishu_jiandun",
            //等阶4
            "xjzh_qishu_lianjinshi",
            "xjzh_qishu_wuyexinjie",
            "xjzh_qishu_tairuier",
            "xjzh_qishu_rongjiezhixin",
            "xjzh_qishu_mingyunzhiquan",
            "xjzh_qishu_suoding",
            "xjzh_qishu_junmao",
            "xjzh_qishu_tongkuhushou",
            'xjzh_qishu_titoushi',

        ];
        for (var i = 0; i < list.length; i++) {
            var btm = ui.create.div(duihuanWindow, {
                left: i % 5 * 19.3 + 6 + '%', width: '12%',
                top: Math.floor(i / 5) * 60 + '%', height: '30%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
                overflow: 'visible',
                zIndex: 1,
            });
            var infoAlert = ui.create.div(btm, {
                width: '100%',
                height: '100%',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                overflow: 'visible',
                zIndex: 1,
            });
            var link = list[i], price;
            if (typeof link == 'string') {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cards/" + link + ".png')";
                let info = get.xjzh_equipInfo(link), level = info.level || 1;
                switch (level) {
                    case 1: price = info.filter ? 50 * (1 + level) : 50; break;
                    case 2: price = info.filter ? 100 * (1 + level) : 100; break;
                    case 3: price = info.filter ? 150 * (1 + level) : 150; break;
                    case 4: price = info.filter ? 230 * (1 + level) : 230; break;
                    case 5: price = info.filter ? 320 * (1 + level) : 320; break;
                    default: price = 50;
                }
                infoAlert.item = link;
                infoAlert.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    beijing.innerHTML = get.xjzh_qishuTranslate(this.item);
                    text.innerHTML = get.xjzh_qishuTranslateInfo(this.item);
                });
            } else if (typeof link == 'object') {
                link.setImage(btm);
                price = link.price;
                infoAlert.names = link.name;
                infoAlert.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    if (this.names == "jingpo") {
                        beijing.innerHTML = "精魄";
                        text.innerHTML = "用于抽奖的消耗材料";
                    }
                    else if (this.names == "xjzh_cailiao_liezhiKey") {
                        beijing.innerHTML = get.xjzh_cailiaoTranslate(this.names);
                        text.innerHTML = get.xjzh_cailiaoTranslateInfo(this.names);
                    }
                    else {
                        beijing.innerHTML = get.xjzh_qishuTranslate(this.names);
                        text.innerHTML = get.xjzh_qishuTranslateInfo(this.names);
                    }
                });
            }
            var buy = ui.create.div(btm, {
                top: '133%', height: '50%',
                left: '0', width: '100%',
                backgroundPosition: '0% 50%', backgroundRepeat: 'no-repeat',
                backgroundSize: 'auto 70%',
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/suipianlan.png')",
            });
            buy.link = link;
            buy.price = price;
            buy.listen(function () {
                var link = this.link, price = this.price;
                if (get.xjzh_suipian() < price) {
                    game.xjzh_openLoading('你的碎片不够');
                    return;
                } else if (typeof link == 'string') {
                    game.xjzh_gainEquip(link);
                } else if (link.constructor == Object) {
                    link.content();
                } else {
                    game.xjzh_openLoading('你已经拥有这个商品了');
                    return;
                }
                game.xjzh_openLoading('购买成功');
                game.xjzh_changeSuipian(-price);
                suipianNum.innerHTML = get.xjzh_suipian();
                tokensNum.innerHTML = get.xjzh_tokens();
            });
            var num = ui.create.div(buy, {
                left: '40%', width: '50%',
                top: '21.5%', height: '40%',
                color: 'white', textShadow: 'none',
                textAlign: 'center', fontSize: '5%',
            });
            num.innerHTML = price;
            if (i % 5 == 0) {
                var priceLan = ui.create.div(duihuanWindow, {
                    left: '0%', width: '100%',
                    top: i * 12 + 27 + '%', height: '30%',
                    backgroundSize: '100%', backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/qishuyaojian/price.png')",
                });
            }
        }
        //大小调整
        var setSize2 = function () {
            shop.style.width = shop.clientHeight * 1.7 + 'px';
            shop.style.fontSize = shop.clientHeight + 'px';
        };
        setSize2();
        var resize2 = function () {
            setTimeout(setSize2, 100);
        };
        lib.onresize.push(resize2);
    }
    shopBtm.listen(openShop);
    //奖励预览
    var yulanBtm = ui.create.div(bk, {
        right: '2%', width: '8%',
        bottom: '4%', height: '15%',
        borderRadius: '50%',
    });
    var openYulan = function () {
        //覆盖图层
        var yulanWindow = ui.create.div('.xjzh-bookWindow', bookWindow);
        //商店
        var yulan = ui.create.div('.xjzh-blackboard', yulanWindow, {
            fontSize: yulanWindow.clientHeight * 0.8 + 'px',
        });
        var yulanText = ui.create.div(yulan, {
            top: '3%', height: '7%',
            left: '35%', width: '30%',
            color: 'black', textShadow: 'none',
            textAlign: 'center', fontSize: '6%'
        });
        yulanText.innerHTML = '奖励预览';
        //退出按钮
        var exit = ui.create.div('.xjzh-bookWindow-return', yulan, {
            left: '100%',
        });
        exit.listen(function () {
            yulanWindow.delete();
            lib.onresize.remove(resize2);
        });
        //滚动窗口
        var scrollWindow = ui.create.div(yulan, {
            zIndex: '-1',
            left: '5%', width: '90%',
            top: '13%', height: '80%',
            overflow: 'auto'
        });
        //奖励列表
        var list = [
            "svip",
            "suipian",
            "jingpo",
            "xjzh_cailiao_liezhiKey",
            "xjzh_cailiao_jingliangKey",
            "xjzh_cailiao_wanmeiKey"
        ];
        for (var i in lib.xjzh_qishuyaojians) {
            let info = get.xjzh_equipInfo(i);
            if (info.filter) continue;
            let level = get.xjzh_equipInfo(i).level || 1;
            if (level && level < 5) list.push(i);
        }
        if (list.includes("xjzh_qishu_bubaiwangzhe")) list.remove("xjzh_qishu_bubaiwangzhe")
        list.sort(function (a, b) {
            var level1 = get.xjzh_equipInfo(a).level || 1, level2 = get.xjzh_equipInfo(b).level || 1;
            if (level1 > level2) return -1;
            if (level1 < level2) return 1;
            if (a > b) return 1;
            return -1;
        });
        for (var i = 0; i < list.length; i++) {
            var btm = ui.create.div(scrollWindow, {
                left: i % 5 * 19.3 + 6 + '%', width: '12%',
                top: Math.floor(i / 5) * 35 + '%', height: '30%',
                backgroundSize: '100%', backgroundRepeat: 'no-repeat',
            });
            var link = list[i];
            if (link == "jingpo") {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/jingpo.jpg')";
                btm.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    beijing.innerHTML = "精魄";
                    text.innerHTML = "用于抽奖的消耗材料";
                });
            }
            else if (link == "suipian") {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/suipian.jpg')";
                btm.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    beijing.innerHTML = "奇术碎片";
                    text.innerHTML = "用于兑换奇术要件和精魄的材料";
                });
            }
            else if (link == "svip") {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/svip.jpg')";
                btm.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    beijing.innerHTML = "一天会员卡";
                    text.innerHTML = "抽奖获得该卡时直接增加1天会员时间，抽奖可以一次抽中多张会员卡";
                });
            }
            else if (link.indexOf("cailiao") != -1) {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cailiao/" + link + ".jpg')";
                btm.item = link;
                btm.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    var { ...cailiaoList } = get.xjzh_cailiaoList();
                    var str = "" + cailiaoList[this.item][2] + "<br><br>拥有" + cailiaoList[this.item][1] + "个";
                    switch (this.item) {
                        case "xjzh_cailiao_liezhiKey":
                            str += "<br><br>获取途径：无尽试炼等低级副本掉落<br><br>劣质巢穴钥匙，可进入【镇压黄巾】、【无尽试炼】等基础副本";
                            break;
                        case "xjzh_cailiao_jingliangKey":
                            str += "<br><br>获取途径：中级副本奖励<br><br>精良巢穴钥匙，可进入【恶念魔窟】、【憎恨王座】等中级副本";
                            break;
                        case "xjzh_cailiao_wanmeiKey":
                            str += "<br><br>获取途径：高级副本奖励<br><br>完美巢穴钥匙，可进入【流电圣徒】、【献血祭坛】、【冰川极地】、【天堂试炼】等高级副本";
                            break;
                    };
                    beijing.innerHTML = cailiaoList[this.item][0];
                    text.innerHTML = str;
                });
            }
            else {
                btm.style.backgroundImage = "url('" + lib.assetURL + "extension/仙家之魂/image/qishuyaojian/cards/" + link + ".png')";
                btm.item = link;
                btm.listen(function () {
                    var boxRemove = ui.create.div(ui.window, {
                        zIndex: 10000,
                        width: '100%', height: '100%'
                    });
                    var obj = ui.create.div('.xjzh-dialog', boxRemove);
                    obj.style.transformOrigin = "center";
                    var num = get.rand(0, 15);
                    var url = "extension/仙家之魂/css/images/ui/";
                    var url2 = "xjzh_info";
                    obj.style.backgroundImage = "url(" + lib.assetURL + "" + url + "" + url2 + "" + num + ".png)";
                    var beijing = ui.create.div('.xjzh-dialog-name', obj);
                    var text = ui.create.div('.xjzh-dialog-text', obj);
                    boxRemove.listen(function () {
                        boxRemove.delete();
                    });
                    beijing.innerHTML = lib.xjzh_qishuyaojians[this.item].translate;
                    text.innerHTML = lib.xjzh_qishuyaojians[this.item].translate_info;
                });
            }
        }
        //大小调整
        var setSize2 = function () {
            yulan.style.width = yulan.clientHeight * 1.7 + 'px';
            yulan.style.fontSize = yulan.clientHeight + 'px';
        };
        setSize2();
        var resize2 = function () {
            setTimeout(setSize2, 100);
        };
        lib.onresize.push(resize2);
    };
    yulanBtm.listen(openYulan);
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
        tokens.style.fontSize = Math.round(height / 15) + 'px';
    };
    setSize();
    bookWindow.appendChild(bk);
    var resize = function () {
        setTimeout(setSize, 500);
    };
    lib.onresize.push(resize);
}
