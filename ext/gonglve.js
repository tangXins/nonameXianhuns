'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
    
    //输出、摸牌、防御、控制、治疗、辅助。
    var score = {
        "xjzh_sanguo_caiyan":[2,3,1,4,0,3],
        "xjzh_wzry_huamulan":[4,2,2,3,0,1],
        "xjzh_wzry_libai":[3,3,2,1,0,1],
    };
    var scoreItem = ['输出','摸牌','防御','控制','治疗','辅助'];
    var comment = {
        "xjzh_sanguo_caiyan":"",
        "xjzh_wzry_huamulan":"",
        "xjzh_wzry_libai":"",
    };
    var video = {
        //"xjzh_sanguo_caiyan":"<video width='320' height='240' controls style='width:50%;height:50%;object-fit:fill;'><source src='"+lib.assetURL+"extension/仙家之魂/video/1.mp4' type='video/mp4'></video>",
        "xjzh_wzry_huamulan":"<video width='320' height='240' controls style='width:80%;height:80%;object-fit:fill;'><source src='"+lib.assetURL+"extension/仙家之魂/video/花木兰-九霄神辉.mp4' type='video/mp4'></video>",
        "xjzh_wzry_libai":"<video width='320' height='240' controls style='width:80%;height:80%;object-fit:fill;'><source src='"+lib.assetURL+"extension/仙家之魂/video/李白-诗剑行.mp4' type='video/mp4'></video>",
        
        /*"xjzh_wzry_huamulan":"<video width='320' height='240' controls style='width:80%;height:80%;object-fit:fill;'><source src='https://noname.asia/xjzh/video/花木兰-九霄神辉.mp4' type='video/mp4'></video>",
        "xjzh_wzry_libai":"<video width='320' height='240' controls style='width:80%;height:80%;object-fit:fill;'><source src='https://noname.asia/xjzh/video/李白-诗剑行.mp4' type='video/mp4'></video>",
        */
    };
    lib.xjzh_gonglve = function(name){
        if(!score[name] && !comment[name])return;
        var ret = "<img style='width:200px;' src='"+lib.assetURL+"extension/仙家之魂/image/title/xjzh_pic_yxpf.png'/><br><br>";
        if(score[name]){
            for(var i=0;i<scoreItem.length;i++){
                ret = ret + scoreItem[i];
                ret += "：";
                var count = 0;
                for(var j=0;j<score[name][i];j++){
                    count++;
                    ret += "★";
                }
                for(var j=count;j<5;j++){
                    ret += "☆";
                }
                ret += "<br>";
            }
        }
        ret += "<br><img style='width:200px;' src='"+lib.assetURL+"extension/仙家之魂/image/title/xjzh_pic_xkbj.png'/><br>";
        if(comment[name]){
            ret += "<br>&nbsp;&nbsp;"+comment[name]+"<br>";
        }
        //autoplay
        ret += "<br><img style='width:200px;' src='"+lib.assetURL+"extension/仙家之魂/image/title/xjzh_pic_yxsp.png'/><br>";
        if(video[name]){
            ret+=video[name]
        }
        return ret;
    };
});