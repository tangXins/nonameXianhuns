import { lib,get,_status,ui,game,ai } from '../../../../../noname.js';
import { updateLog } from '../index.js';

class updates {
    checkVersion(version1="0.0.0",version2="0.0.0"){
        // 将版本号字符串按.分割，并将各部分转换为整数填充在数组中
        let v1Parts = version1.split('.').map(Number);
        let v2Parts = version2.split('.').map(Number);

        // 获取两个版本号数组的最大长度
        let maxLength = Math.max(v1Parts.length, v2Parts.length);

        // 循环比较每个部分
        for (let i = 0; i < maxLength; i++) {
            // 如果某个版本号的当前部分已比较完，但另一版本还有剩余部分，则剩余部分默认为0
            let v1Part = i < v1Parts.length ? v1Parts[i] : 0;
            let v2Part = i < v2Parts.length ? v2Parts[i] : 0;

            // 比较当前部分
            if (v1Part < v2Part) {
                return -1; // version1小于version2
            } else if (v1Part > v2Part) {
                return 1; // version1大于version2
            }
        }

        // 如果所有部分都相等，则认为版本号相等
        return 0;
    };

    checkUpdate(){
        if(lib.version&&typeof lib.version=="string"){
            if(this.checkVersion(lib.version,updateLog.onlyVersion)<0){
                alert(`当前无名杀版本${lib.version}低于【仙家之魂】支持无名杀版本${updateLog.onlyVersion}，可能会引起报错，已为你关闭本扩展`);
                game.saveExtensionConfig("仙家之魂","enable",false);
                game.reload();
            }
        };
    };

    showUpdateLog(){
        try{
            let update=updateLog;
            lib.extensionPack['仙家之魂'].version=updateLog.version;
            let gengxing=update[update.version];
            if(lib.extensionPack['仙家之魂']&&lib.extensionPack['仙家之魂'].version!=game.getExtensionConfig("仙家之魂","changelog")){
                game.saveExtensionConfig("仙家之魂","changelog",lib.extensionPack['仙家之魂'].version);
            }else{
                return false;
            };
            if(gengxing.removeFiles&&typeof gengxing.removeFiles=="function") gengxing.removeFiles();
            let ul=document.createElement('ul');
            ul.style.textAlign='left';
            let caption,version=update.version,players=gengxing.players||[],cards=gengxing.cards||[],changeLog=gengxing.changeLog||[];
            caption='仙家之魂更新';
            for(let i of changeLog){
                let li=document.createElement('li');
                li.innerHTML=i;
                ul.appendChild(li);
            };
            let dialog=ui.create.dialog(caption,'hidden');
            dialog.add(version);
            dialog.forcebutton=true;
            dialog.classList.add('forcebutton');
            let lic=ui.create.div(dialog.content);
            lic.style.display='block';
            ul.style.display='inline-block';
            ul.style.marginLeft='20px';
            lic.appendChild(ul);
            if(players.length){
                for(let i=0;i<players.length;i++){
                    if(!lib.character[players[i]]){
                        let result=get.character(players[i]);
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
                };
            };
            if(cards.length){
                for(let i=0;i<cards.length;i++){
                    if(!lib.card[cards[i]]){
                        cards.splice(i--,1);
                    };
                };
                if(cards.length){
                    for(let i=0;i<cards.length;i++){
                        cards[i]=[get.translation(get.type(cards[i])),'',cards[i]];
                    };
                    dialog.addText('卡牌更新');
                    dialog.add([cards,'vcard']);
                }
            }
            dialog.addText('-----------------END-----------------');
            dialog.open();
            let hidden=false;
            if(!ui.auto.classList.contains('hidden')){
                ui.auto.hide();
                hidden=true;
            };
            game.pause();
            let control=ui.create.control('确定',()=>{
                dialog.close();
                control.close();
                if(hidden) ui.auto.show();
                game.resume();
            });
            lib.init.onfree();
        }catch(error){
            alert(error);
        };
    };

};

const checkUpdates=new updates();

let originalShowChangeLog = game.showChangeLog;

game.showChangeLog = function () {
    try {
        originalShowChangeLog && originalShowChangeLog();
        checkUpdates.showUpdateLog();
    } catch (error) {
        console.error('Failed to show change log or update log:', error);
    }
};

checkUpdates.checkUpdate();

export default checkUpdates;