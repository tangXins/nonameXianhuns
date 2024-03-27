import { lib,get,_status,ui,game,ai } from '../../../../../noname.js';
// ---------------------------------------更新内容------------------------------------------//
//代码借鉴自《金庸群侠传》
get.xjzh_update=function(){
	var cfg='extension_仙家之魂_changelog';
	var update=window.xjzh_updateLog;
	lib.extensionPack['仙家之魂'].version=update.version;
	var gengxing=update[update.version]
	if(lib.extensionPack['仙家之魂']&&lib.extensionPack['仙家之魂'].version!=lib.config[cfg]){
		game.saveConfig(cfg,lib.extensionPack['仙家之魂'].version);
	}
	else{
		return false;
	};
	var ul=document.createElement('ul');
	ul.style.textAlign='left';
	var caption;
	var version=update.version;
	var players=gengxing.players||[];
	var cards=gengxing.cards||[];
	var changeLog=gengxing.changeLog||[];
	caption='仙家之魂更新';
	for(var i of changeLog){
		var li=document.createElement('li');
		li.innerHTML=i;
		ul.appendChild(li);
	};
	var dialog=ui.create.dialog(caption,'hidden');
	dialog.add(version);
	dialog.forcebutton=true;
	dialog.classList.add('forcebutton');
	var lic=ui.create.div(dialog.content);
	lic.style.display='block';
	ul.style.display='inline-block';
	ul.style.marginLeft='20px';
	lic.appendChild(ul);
	if(players.length){
		for(var i=0;i<players.length;i++){
			if(!lib.character[players[i]]){
				var result=get.character(players[i]);
				if(result){
					if(!result[4]){
						result[4]=[];
					};
					lib.character[players[i]]=result;
				};
			};
			if(!lib.character[players[i]]){
				players.splice(i--,1);
			};
		};
		if(players.length){
			dialog.addText('武将更新');
			dialog.add([players,'character']);
			//dialog.addSmall([players,'character']);
		};
	};
	if(cards.length){
		for(var i=0;i<cards.length;i++){
			if(!lib.card[cards[i]]){
				cards.splice(i--,1);
			};
		};
		if(cards.length){
			for(var i=0;i<cards.length;i++){
				cards[i]=[get.translation(get.type(cards[i])),'',cards[i]];
			};
			dialog.addText('卡牌更新');
			dialog.add([cards,'vcard']);
			//dialog.addSmall([cards,'vcard']);
		}
	}
	dialog.addText('-----------------END-----------------');
	dialog.open();
	var hidden=false;
	if(!ui.auto.classList.contains('hidden')){
		ui.auto.hide();
		hidden=true;
	};
	game.pause();
	var control=ui.create.control('确定',function(){
		dialog.close();
		control.close();
		if(hidden) ui.auto.show();
		game.resume();
	});
	lib.init.onfree();
};
var _showChangeLog=game.showChangeLog;
game.showChangeLog=function(){
	_showChangeLog();
	var next=game.createEvent('xjzh_update',false);
	next.setContent(function(){
		get.xjzh_update();
	});
};
//检测无名杀版本
get.myCompareVersion=function(a,b){
	if(!a)a="0.0.0";
	if(!b)b="0.0.0";
	var arr1=a.split(".");
	var arr2=b.split(".");
	for(var i=0;i<Math.min(arr1.length,arr2.length);i++){
		var num1=parseInt(arr1[i]);
		var num2=parseInt(arr2[i]);
		if(num1<num2) return -1;
		if(num1>num2) return 1;
	}
	if(arr1.length>arr2.length){
		return 1;
	}
	else if(arr1.length<arr2.length){
		return -1;
	}
	return 0;
};
var noname_versionx="1.10.8";
if(lib.version&&!lib.config.xjzhNotMetionNonameVersion){
    if(get.myCompareVersion(lib.version,"1.10.8")<0){
        alert("当前无名杀版本"+lib.version+"落后于【仙家之魂】最低支持版本1.10.8，已为你关闭本扩展");
        game.saveConfig('extension_仙家之魂_enable',false);
		game.reload();
    }/*
	if(get.myCompareVersion(lib.version,noname_versionx)<0){
		var ret=confirm("当前无名杀版本"+lib.version+"落后于【仙家之魂】最低支持版本1.10.6.2，请尽快更新，点击确定关闭本扩展");
		if(!ret){
			alert("请确认你明白点击此选项导致的后果");
			alert("由游戏版本过低导致任何问题本扩展均不负责");
			//game.saveConfig('xjzhNotMetionNonameVersion',true);
		}
		else{
			game.saveConfig('extension_仙家之魂_enable',false);
			game.reload();
		}
	}*/
};