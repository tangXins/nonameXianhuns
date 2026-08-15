import { lib, game, ui, get, ai, _status, rootURL } from '../../../../../noname.js';
export async function precontent(xjzh) {
	if (!xjzh.enable) return false;

	// ---------------------------------------定义势力------------------------------------------//
	if (game.getExtensionConfig("仙家之魂", "xjzh_changeGroup")) {
		let group = ['xjzh_xingGroup', '星', '星', { color: [255, 255, 0], image: "ext:仙家之魂/image/shili/name_xjzh_xingGroup.png" }];
		game.addGroup(...group);
		if (group[3].image) lib.translate["group_" + group[0]] = group[1] + "势力";
	};
	// ---------------------------------------JS接口------------------------------------------//
	window.XJZHimport = function (func) {
		func(lib, game, ui, get, ai, _status);
	};
	// ---------------------------------------移除【删除扩展按钮】------------------------------------------//
	delete lib.extensionMenu.extension_仙家之魂.delete;
	// ---------------------------------------导入JS------------------------------------------//
	/*var extList = [
	];
	for (var i of extList) {
		var extURL = lib.assetURL + 'extension/仙家之魂/ext/' + i;
		lib.init.js(extURL, null, () => { }, () => { alert('' + i + '导入失败!') });
	};*/
	lib.init.css(lib.assetURL + "extension/仙家之魂/css", 'extension');

};