import { lib, get, _status, ui, game, ai } from '../../noname.js';
import checkUpdates from './ext/modules/update/checkUpdate.js';

let content, precontent, config, help, packages, prepare, arenaReady, onremove, files;

try {
    ({ content, precontent, config, help, packages, prepare, arenaReady, onremove, files } = await import('./ext/modules/index.js'));
} catch (e) {
    console.error('导入基础模块失败:', e);
    content = precontent = config = help = packages = prepare = arenaReady = onremove = files = {};
}

const type = "extension";

let extension = {
    name: "仙家之魂",
    editable: false,
    connect: true,
    content,
    precontent,
    onremove,
    arenaReady,
    prepare,
    config,
    help,
    package: packages,
    files,
};

const coreModules = [
    './ext/modules/function/game.js',
    './ext/modules/function/player.js',
    './ext/modules/function/get.js',
    './ext/modules/cards/index.js',
    './ext/modules/character/XWSG/index.js',
    './ext/modules/character/XWTR/index.js',
    './ext/modules/character/XWCS/index.js',
    './ext/modules/character/XWDM/index.js'
];

await Promise.allSettled(
    coreModules.map(path =>
        import(path).catch(e => {
            console.error(`加载核心模块 ${path} 失败:`, e);
            return null;
        })
    )
);

try {
    const infoData = await lib.init.promises.json(`${lib.assetURL}extension/仙家之魂/info.json`);
    if (infoData) {
        const { name, ...packageInfo } = infoData;
        extension.package = { ...packages, ...packageInfo };
    }
} catch (e) {
    console.warn('加载扩展info.json失败:', e);
}

const modulesConfig = [
    { path: './ext/modules/character/XWTZ/index.js', excludeInConnect: true },
    { path: './ext/modules/other/qishuyaojians.js', excludeInConnect: true },
    { path: './ext/modules/other/showMp.js', excludeInConnect: false },
    { path: './ext/modules/other/buff.js', excludeInConnect: false },
    { path: './ext/modules/other/rune.js', excludeInConnect: true },
    { path: './ext/modules/achievement/index.js', excludeInConnect: true },
];

const loadableModules = modulesConfig.filter(
    module => !(get.mode() === "connect" && module.excludeInConnect)
).map(module => module.path);

await Promise.allSettled(
    loadableModules.map(path =>
        import(path).catch(e => {
            console.error(`加载模块 ${path} 失败:`, e);
            return null;
        })
    )
);

if (get.mode() === "xjzh_challenge") {
    await import('./ext/modules/character/XWSL/index.js');
}


try {
    await checkUpdates.checkBannedExtension();
    await checkUpdates.checkCoreUpdate();
} catch (e) {
    console.error('执行失败', e);
}


export { type };
export default extension;