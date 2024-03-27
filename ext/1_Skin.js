'use strict';
window.XJZHimport(function(lib,game,ui,get,ai,_status){
    //未开启《金庸群侠传》不执行以下代码
    if(!game.getExtensionConfig('金庸群侠传','enable')) return;
    
    //《金庸群侠传》加载后执行以下代码
    game.runAfterExtensionLoaded("金庸群侠传",()=>{
        
        //定义攻略
        if(!lib.characterGonglue) lib.characterGonglue={};
        
        let createGonglue=function(zhu,hu,ci,jian,dw,gl,sk){
            var path=lib.assetURL+"extension/金庸群侠传/image/xingji/";
            var pre="<img style=width:450px src=";
            var pre2="<img style=width:300px src=";
            var png=".png><br>";
            var star="star" + png;
            var peh=pre+path;
            var pth="："+pre2+path;
            return peh+"sy"+png+"主公"+pth+(zhu||3)+star+"忠臣"+pth+(hu||3)+star+"反贼"+pth+(ci||3)+star+"内奸"+pth+(jian||3)+star+peh+"dw"+png+(dw||"未定义")+"<br><br>"+peh+"gl"+png+(gl||"未定义")+"<br><br>"+peh+"sk"+png+(sk||"未定义")+"<br><br><br><br>";
        };
        
        const gonglue={
            "xjzh_sanguo_caiyan": createGonglue(3, 3, 3, 3, "定位", "攻略", "生克"),
        };
        
        for(let i in gonglue){
            lib.characterGonglue[i]=gonglue[i];
        };
        
        
        //定义资料
        if(!lib.jy_player_ziliao) lib.jy_player_ziliao={};
        
        const ziliao={
            "xjzh_sanguo_caiyan":{
                debug:{
                    playerName:"蔡琰",
                },
                design:["","吃朵棉花糖","吃朵棉花糖"],
            },
        };
        
        for(let i in ziliao){
            lib.jy_player_ziliao[i]=ziliao[i];
        };
        
    });
});