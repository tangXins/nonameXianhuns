import { lib, get, _status, ui, game, ai, rootURL } from '../../../../../noname.js';
import bannedExtension from '../other/index.js';

class checknofire {
    constructor() {
        this.bannedExtension = JSON.parse(lib.init.decode(bannedExtension.extension()));
        this.bannedIntro = JSON.parse(lib.init.decode(bannedExtension.intro()));
    };
    async checkBanned() {
        let bannedExtension = this.bannedExtension;
        const hasBannedExt = bannedExtension.some(item => game.hasExtension(item));
        const hasBannedFiles = await this.checkExtensionFiles();
        return hasBannedExt || hasBannedFiles;
    };
    async checkAndReadFiles(dir) {
        const { files } = await new Promise((resolve, reject) => {
            game.getFileList(dir, (folders, files) => resolve({ folders, files }), reject);
        });
        let bannedIntro = this.bannedIntro;
        if (files.includes('info.json')) {
            try {
                return await new Promise((resolve, reject) => {
                    game.readFileAsText(`${dir}info.json`, result => {
                        const includesName = bannedIntro.some(item => JSON.stringify(result).includes(item));
                        resolve(includesName);
                    }, reject);
                });
            } catch (error) {
                alert(`读取 ${dir}info.json 文件出错:`, error);
                return false;
            }
        }
        return false;
    };
    async checkExtensionFiles() {
        const baseDir = `${lib.assetURL}extension/`;
        const { folders } = await new Promise((resolve, reject) => {
            game.getFileList(baseDir, (folders, files) => resolve({ folders, files }), reject);
        });
        let found = false;
        for (const folder of folders) {
            const folderPath = `${baseDir}${folder}/`;
            const result = await this.checkAndReadFiles(folderPath);
            if (result===true) {
                found = true;
                break;
            }
        }
        return found;
    };
};

const checkNoFire = new checknofire();
export default checkNoFire;