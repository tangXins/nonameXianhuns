import { lib, game, ui, get } from '../../../../../../../noname.js';

//打开仙家之魂成就界面
export function openAchievementMainPage(wujingBoolean) {
    game.pause2();
    var { window: bookWindow, bk, resize } = game.xjzh_createPageFrame({
        windowClass: '.xjzh-bookWindow',
        bgClass: '.xjzh-bookWindow-bk',
        exitClass: '.xjzh-bookWindow-return',
    });
    //打开特殊成就
    var button_gotoSV = ui.create.div('.xjzh-bookWindow-openAchi-special', ui.create.div('.xjzh-bookWindow-openAchi-special-bk', bk));
    button_gotoSV.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementView('special');
    });
    //打开对局成就
    var button_gotoGV = ui.create.div('.xjzh-bookWindow-openAchi-game', bk);
    button_gotoGV.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementView('game');
    });
    //打开人物成就
    var button_gotoCV = ui.create.div('.xjzh-bookWindow-openAchi-character', bk);
    button_gotoCV.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
        game.xjzhAchi.openAchievementView('character');
    });
    //显示已得成就分数
    var scoreSheet = ui.create.div('.xjzh-bookWindow-scoreSheet', ui.create.div('.xjzh-bookWindow-scoreSheet-bk', bk));
    scoreSheet.innerHTML = game.xjzhAchi.calculateScore();
    //打开成就奖励
    var button_reward = ui.create.div('.xjzh-bookWindow-openReward', bk);
    button_reward.listen(function () {
        bookWindow.delete();
        game.resume2();
        lib.onresize.remove(resize);
        //game.xjzhAchi.openAchievementView('reward');
        game.xjzhAchi.openMissionRewardPage();
    });
    var decorate3 = ui.create.div('.xjzh-bookWindow-openReward-decorate', bk);
    //主页书签
    //var mainPage=ui.create.div('.xjzh-bookWindow-page-main',bk);
    //奇术要件书签
    if (game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") && game.getExtensionConfig("仙家之魂", "xjzh_qishuyaojianOptions") !== "close") {
        var partsPage = ui.create.div('.xjzh-bookWindow-page-parts', bk);
        var partsPage_box = ui.create.div('.xjzh-bookWindow-page-parts-box', partsPage);
        partsPage_box.listen(function () {
            bookWindow.remove();
            game.resume2();
            lib.onresize.remove(resize);
            game.xjzhAchi.openAchievementEquipPage();
        });
        if (!wujingBoolean) {
            //升华试炼书签
            var challengePage = ui.create.div('.xjzh-bookWindow-page-challenge', bk);
            challengePage.listen(function () {
                bookWindow.remove();
                game.resume2();
                lib.onresize.remove(resize);
                game.xjzhAchi.openChallengePage();
            });
        }
    }
}
