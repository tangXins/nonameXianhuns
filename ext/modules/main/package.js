import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';
import { skills } from '../index.js';

const extensionInfo = await lib.init.promises.json(`${lib.assetURL}extension/仙家之魂/info.json`);

export const packages = {
    character: {
        character: {},
        translate: {},
    },
    card: {
        card: {},
        translate: {},
        list: [],
    },
    skill: { ...skills },
    author: `${extensionInfo.author}`,
    intro: `${extensionInfo.intro}`,
    diskURL: `${extensionInfo.diskURL}`,
    forumURL: `${extensionInfo.forumURL}`,
    version: `${extensionInfo.version}`,
};