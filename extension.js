import { lib,get,_status,ui,game,ai } from '../../noname.js';
import { basic,content,precontent,config,help,packages } from './ext/modules/index.js';
import checkUpdates from './ext/modules/update/checkUpdate.js';

export let type = 'extension';

export default async function(){
    const extensionInfo=await lib.init.promises.json(`${basic.extensionDirectoryPath}info.json`);
    basic.extensionName=extensionInfo.name;
    let extension = {
        name:extensionInfo.name,
		editable:false,
        content:content,
        precontent:precontent,
        config:await basic.resolve(config),
        help:await basic.resolve(help),
        package:await basic.resolve(packages),
        files:{"character":[],"card":[],"skill":[],"audio":[]}
    };
    Object.keys(extensionInfo).filter(key=>key!='name').forEach(key=>extension.package[key]=extensionInfo[key]);
  	return extension;
};