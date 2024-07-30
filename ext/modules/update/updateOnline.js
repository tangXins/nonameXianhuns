import { lib,get,_status,ui,game,ai } from '../../../../../noname.js';
import { xjzh_updateURLS } from './updateURLS.js';
import { updateLog } from './index.js';

const updateOnlines={
    //在线更新
    "xjzh_updateVersionOption":{
        "name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_updateVersion.png>",
        "intro":"",
        "init":true,
        "clear":true,
    },
    //在线更新
    "xjzh_updateVersionOption":{
        "name":"<img style=width:260px src="+lib.assetURL+"extension/仙家之魂/image/title/xjzh_updateVersion.png>",
        "intro":"",
        "init":true,
        "clear":true,
    },
    "xjzh_update_link": {
        name: '扩展更新地址',
        init: (() => {
            for (const url in xjzh_updateURLS) {
                if (lib.xjzh_updateURL == xjzh_updateURLS[url]) {
                    return url;
                }
            }
            game.saveExtensionConfig('仙家之魂', 'xjzh_update_link', 'GitHub');
            lib.xjzh_updateURL = xjzh_updateURLS['GitHub'];
            return 'GitHub';
        })(),
        item: {
            GitHub: 'GitHub',
            GitCode: 'GitCode'
        },
        onclick: function (item) {
            if (item != game.getExtensionConfig('仙家之魂', 'xjzh_update_link')) {
                delete window.xjzh_updateversion;
                delete window.xjzh_updateSource;
                if (xjzh_updateURLS[item]) {
                    game.saveExtensionConfig('仙家之魂', 'xjzh_update_link', item);
                    lib.xjzh_updateURL = xjzh_updateURLS[item];
                } else {
                    alert(`选择的更新源(${item})不存在`);
                    return false;
                }
            }
        },
    },
    "xjzh_updateAll":{
        name:'强制更新所有主文件',
        intro:'更新游戏时，下载所有主要文件',
        init:false,
        onclick: (bool) => {
            game.saveExtensionConfig('仙家之魂', 'xjzh_updateAll', bool);
        },
    },
    "xjzh_checkForUpdate": {
        // 检查扩展更新
        clear: true,
        intro: '点击检查扩展更新',
        name: '<button type="button">检查扩展更新</button>',
        /** @this {HTMLDivElement | HTMLButtonElement} */
        onclick: async function () {
            /**
             * 下载按钮
             * @type { HTMLButtonElement } button
             **/
            let button;
            if (this instanceof HTMLButtonElement) {
                button = this;
            } else {
                // @ts-ignore
                button = this.childNodes[0].childNodes[0];
            }

            /** @type ParentNode */
            // @ts-ignore
            let parentNode = button.parentNode;
            if (button instanceof HTMLButtonElement && button.innerHTML == "检查扩展更新") {
                if (game.Updating) return alert('正在更新游戏文件，请勿重复点击');
                if (game.allUpdatesCompleted) return alert('游戏文件和素材全部更新完毕');
            }
            if (button.innerText != '检查扩展更新') return;

            /**
             * 判断是否能进行更新(即是否能连接上百度)
             * @returns { Promise<number | void> }
             */
            function canUpdate() {
                return new Promise((resolve, reject) => {
                    myFetch(`https://www.baidu.com`).then(response => {
                        // 304: 自上次访问以来，请求的资源未被修改
                        if (response.status == 200 || response.status == 304) {
                            console.log('连接百度成功，状态码: ' + response.status);
                            resolve();
                        } else {
                            reject(response.status);
                        }
                    }).catch(err => reject(err));
                });
            };

            /**
             * 创建fetch连接
             * @param { string } url 资源请求地址
             * @param { fetchOptions } options 配置
             * @returns { Promise<Response> }
             */
            function myFetch(url, options = { timeout: 5000 }) {
                return new Promise((resolve, reject) => {
                    /** @type { AbortController | undefined } */
                    let myAbortController;
                    /** @type { AbortSignal | undefined } */
                    let signal = undefined;

                    if (typeof window.AbortController == 'function') {
                        if (options.timeout > 0) {
                            myAbortController = new AbortController();
                            signal = myAbortController.signal;
                            // @ts-ignore
                            setTimeout(() => myAbortController.abort(), options.timeout);
                        }
                    } else {
                        console.warn('设备不支持AbortController');
                    }

                    fetch(url, { signal }).then(response => {
                        if (response.redirected) {
                            console.warn(`${url}\n请求已被重定向为:\n${response.url}`);
                        }
                        if (!response.ok) {
                            return reject(response);
                        }
                        resolve(response);
                    }).catch(reject);
                });
            };

            /**
             * @description 请求错误处理
             * @param { { url: string, error: number | Error, message: string } | Error | String } err
             */
            const response_catch = err => {
                console.error(err);
                game.print(err);
                if (typeof err === 'object' && !(err instanceof Error)) {
                    const { url, error, message } = err;
                    if (typeof url !== 'undefined' && typeof error !== 'undefined' && typeof message !== 'undefined') {
                        const translate = {
                            GitHub: 'GitHub',
                            GitCode: 'GitCode',
                        };
                        let url_in_updateURLS;
                        for (const updateURL in xjzh_updateURLS) {
                            if (url.startsWith(xjzh_updateURLS[updateURL])) {
                                url_in_updateURLS = translate[updateURL];
                                break;
                            }
                        }
                        if (url_in_updateURLS) {
                            alert(`更新源:${url_in_updateURLS}\n网络请求目标：${url.replace(lib.xjzh_updateURL + '/main/', '')}\n${error instanceof window.ProgressEvent ? '' : ('状态消息或状态码：' + error + '\n')}提示:${message}`);
                        } else {
                            alert(`网络请求目标：${url}\n${error instanceof window.ProgressEvent ? '' : ('状态消息或状态码：' + error + '\n')}提示:${message}`);
                        }
                    }
                } else if (err instanceof Error) {
                    if (err.name === 'AbortError') {
                        alert('网络连接超时');
                    } else if (err.message == 'Failed to fetch') {
                        alert('网络请求失败');
                    } else {
                        alert(err.message);
                    }
                } else if (typeof err == 'string') {
                    alert(err);
                }
                if (++game.updateErrors > 5) {
                    alert('检测到获取更新失败次数过多，建议您更换无名杀的更新源');
                    game.updateErrors = 0;
                }
            };

            // 是否可以更新，每次都调用的原因是判断网络问题
            try {
                await canUpdate();
            } catch (e) {
                return response_catch(e);
            }
            game.Updating = true;
            game.unwantedToUpdate = false;

            /** 按钮还原状态 */
            const reduction = () => {
                game.Updating = false;
                button.innerText = '检查扩展更新';
                button.disabled = false;
            };

            if (button.disabled) return;
            else if (!game.download) return alert('此版本不支持游戏内更新，请手动更新');
            else {
                button.innerHTML = '正在检查更新';
                button.disabled = true;

                // 获取更新文件
                game.xjzhGetUpdateFiles = () => {
                    /** 获取window.xjzh_updateversion */
                    function getNonameUpdate() {
                        /** 更新源地址 */
                        const updateURL = lib.xjzh_updateURL + '/main/';
                        if (typeof window.xjzh_updateversion == 'object') {
                            return Promise.resolve(window.xjzh_updateversion);
                        } else {
                            return myFetch(`${updateURL}ext/modules/update/update.js`)
                                .then(response => response.text())
                                .then(text => {
                                    // 赋值window.xjzh_updateversion
                                    try {
                                        const data = JSON.parse(text);
                                        if (data.msg.user_not_login == '用户未登录') {
                                            alert('错误: 用户未登录(用coding和玄武镜像可能会出现此问题)\n请更换成其他更新源');
                                            return Promise.reject('user_not_login');
                                        } else {
                                            eval(text);
                                            if (typeof window.xjzh_updateversion != 'object') {
                                                return Promise.reject('更新内容获取失败(update.js)，请重试');
                                            }
                                        }
                                    } catch (e) {
                                        try { eval(text) } catch (error) { console.log(error) }
                                        if (typeof window.xjzh_updateversion != 'object') {
                                            return Promise.reject('更新内容获取失败(update.js)，请重试');
                                        }
                                    }
                                    return window.xjzh_updateversion;
                                });
                        }
                    }
                    /** 获取window.xjzh_updateSource */
                    function getSourceList() {
                        /** 更新源地址 */
                        const updateURL = lib.xjzh_updateURL + '/main/';
                        if (typeof window.xjzh_updateSource == 'object') {
                            return Promise.resolve(window.xjzh_updateSource);
                        } else {
                            return myFetch(`${updateURL}ext/modules/update/source.js`)
                                .then(response => response.text())
                                .then(text => {
                                    //赋值window.xjzh_updateSource
                                    try {
                                        const data = JSON.parse(text);
                                        if (data.msg.user_not_login == '用户未登录') {
                                            alert('错误: 用户未登录(请更换成其他更新源');
                                            return Promise.reject('user_not_login');
                                        } else {
                                            eval(text);
                                            if (typeof window.xjzh_updateSource != 'object') {
                                                return Promise.reject('更新内容获取失败(source.js)，请重试');
                                            }
                                        }
                                    } catch (e) {
                                        try { eval(text) } catch (error) { console.log(error) }
                                        if (typeof window.xjzh_updateSource != 'object') {
                                            return Promise.reject('更新内容获取失败(source.js)，请重试');
                                        }
                                    }
                                    return window.xjzh_updateSource;
                                });
                        }
                    }

                    return new Promise(async (resolve, reject) => {
                        if (!game.download) {
                            reject(new Error('此版本不支持游戏内更新，请手动更新'));
                        }
                        if (window.xjzh_updateversion && window.xjzh_updateSource) {
                            resolve({
                                update: window.xjzh_updateversion,
                                source_list: window.xjzh_updateSource
                            });
                        } else {
                            // 设置最大重试次数为5次
                            let i = 0;
                            while (!(window.xjzh_updateversion && window.xjzh_updateSource) && i < 5) {
                                try {
                                    await getNonameUpdate().then(() => getSourceList()).then(() => {
                                        resolve({
                                            // @ts-ignore
                                            update: window.xjzh_updateversion,
                                            // @ts-ignore
                                            source_list: window.xjzh_updateSource
                                        });
                                    });
                                } catch (e) {
                                    console.log(e);
                                    i++;
                                    if (e == 'user_not_login') return reject(e);
                                }
                            }
                            if (i == 5 && !(window.xjzh_updateversion && window.xjzh_updateSource)) {
                                reject('自动请求5次全部失败, 请重试');
                            } else if (window.xjzh_updateversion && window.xjzh_updateSource) {
                                resolve({
                                    // @ts-ignore
                                    update: window.xjzh_updateversion,
                                    // @ts-ignore
                                    source_list: window.xjzh_updateSource
                                });
                            } else {
                                reject('遇到其他错误, 请重试');
                            }
                        }
                    });
                };

                // 下载进度
                game.xjzhCreateProgress = (title, max, fileName, value) => {
                    /** @type { progress } */
                    // @ts-ignore
                    const parent = ui.create.div(ui.window, {
                        textAlign: 'center',
                        width: '300px',
                        height: '150px',
                        left: 'calc(50% - 150px)',
                        top: 'auto',
                        bottom: 'calc(50% - 75px)',
                        zIndex: '10',
                        boxShadow: 'rgb(0 0 0 / 40 %) 0 0 0 1px, rgb(0 0 0 / 20 %) 0 3px 10px',
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
                        borderRadius: '8px',
                        overflow: 'hidden scroll'
                    });

                    // 可拖动
                    parent.className = 'dialog';

                    const container = ui.create.div(parent, {
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%'
                    });

                    container.ontouchstart = ui.click.dialogtouchStart;
                    container.ontouchmove = ui.click.touchScroll;
                    // @ts-ignore
                    container.style.WebkitOverflowScrolling = 'touch';
                    parent.ontouchstart = ui.click.dragtouchdialog;

                    const caption = ui.create.div(container, '', title, {
                        position: 'relative',
                        paddingTop: '8px',
                        fontSize: '20px'
                    });

                    ui.create.node('br', container);

                    const tip = ui.create.div(container, {
                        position: 'relative',
                        paddingTop: '8px',
                        fontSize: '20px',
                        width: '100%'
                    });

                    const file = ui.create.node('span', tip, '', fileName);
                    file.style.width = file.style.maxWidth = '100%';
                    ui.create.node('br', tip);
                    const index = ui.create.node('span', tip, '', String(value || '0'));
                    ui.create.node('span', tip, '', '/');
                    const maxSpan = ui.create.node('span', tip, '', String(max || '未知'));

                    ui.create.node('br', container);

                    const progress = ui.create.node('progress.zxgxProgress', container);
                    progress.setAttribute('value', value || '0');
                    progress.setAttribute('max', max);

                    parent.getTitle = () => caption.innerText;
                    parent.setTitle = title => caption.innerHTML = title;
                    parent.getFileName = () => file.innerText;
                    parent.setFileName = name => file.innerHTML = name;
                    parent.getProgressValue = () => progress.value;
                    parent.setProgressValue = value => progress.value = index.innerHTML = value;
                    parent.getProgressMax = () => progress.max;
                    parent.setProgressMax = max => progress.max = maxSpan.innerHTML = max;
                    parent.autoSetFileNameFromArray = fileNameList => {
                        if (fileNameList.length > 2) {
                            parent.setFileName(fileNameList.slice(0, 2).concat(`......等${fileNameList.length - 2}个文件`).join('<br/>'));
                        } else if (fileNameList.length == 2) {
                            parent.setFileName(fileNameList.join('<br/>'));
                        } else if (fileNameList.length == 1) {
                            parent.setFileName(fileNameList[0]);
                        } else {
                            parent.setFileName('当前没有正在下载的文件');
                        }
                    };
                    return parent;
                };

                game.xjzhDownload = (url, onsuccess, onerror, onprogress) => {
                    let downloadUrl = url, path = 'extension/仙家之魂', name = url;
                    if (url.indexOf('/') != -1) {
                        path = path + "/" + url.slice(0, url.lastIndexOf('/'));
                        name = url.slice(url.lastIndexOf('/') + 1);
                    }

                    if (url.indexOf('http') != 0) {
                        url = lib.xjzh_updateURL + '/main/' + url;
                    }

                    /**
                     * 下载成功
                     * @param { FileEntry } [FileEntry] 文件系统
                     * @param { boolean } [skipDownload] 是否跳过下载
                     */
                    function success(FileEntry, skipDownload) {
                        if (FileEntry && !skipDownload && ['config', 'xuanwu'].includes(game.getExtensionConfig("仙家之魂","update_link"))) {
                            FileEntry.file(file => {
                                const fileReader = new FileReader();
                                fileReader.onload = e => {
                                    /** @type { string } */
                                    // @ts-ignore
                                    const text = e.target.result;
                                    try {
                                        /** @type { notLogin } */
                                        const data = JSON.parse(text);
                                        if (data.msg.user_not_login == '用户未登录') {
                                            error(new Error(data.msg.user_not_login), data.msg.user_not_login);
                                        }
                                    } catch (err) {
                                        if (typeof onsuccess == 'function') onsuccess();
                                    }
                                }
                                fileReader.readAsText(file, "UTF-8");
                            });
                        } else {
                            if (typeof onsuccess == 'function') {
                                if (skipDownload === true) {
                                    onsuccess(skipDownload);
                                } else {
                                    onsuccess();
                                }
                            }
                        }
                    }

                    /**
                     * 错误处理
                     * @param { FileTransferError | Error } e 错误对象
                     * @param { string } [message] 错误信息
                     */
                    function error(e, message) {
                        // 手机端下载的错误
                        // 如果下载的是文件夹(xx/game/)会报400，如果是xx/game的形式在github会报404
                        // Show-K的服务器下载文件夹也是404，不用管
                        if (window.FileTransferError && e instanceof window.FileTransferError) {
                            const errorCode = {
                                1: 'FILE_NOT_FOUND_ERR',
                                2: 'INVALID_URL_ERR',
                                3: 'CONNECTION_ERR',
                                4: 'ABORT_ERR',
                                5: 'NOT_MODIFIED_ERR'
                            };
                            console.error({
                                message: e.body,
                                source: e.source,
                                status: e.http_status,
                                target: e.target,
                                error: errorCode[e.code]
                            });
                            switch(e.http_status) {
                                case 404:
                                    game.print(`更新源中不存在${path}/${name}`);
                                    console.log(`更新源中不存在${path}/${name}`);
                                    success(undefined, true);
                                    break;
                                case 402:
                                    // git镜像中这个资源无法下载，那就跳过
                                    if(typeof onerror == 'function') {
                                        onerror(e, e.body);
                                    }else{
                                        alert('这个资源在git镜像更新源内无法下载，请在下载操作全部完成后切换更新源下载！');
                                        success(undefined, true);
                                    }
                                    break;
                                default:
                                    if (typeof onerror == 'function') {
                                        onerror(e, e.body);
                                    }
                            }

                        } else {
                            // 电脑端下载的错误
                            console.error(e, message);
                            if (message == 'Not Found') {
                                game.print(`更新源中不存在${path}/${name}`);
                                console.log(`更新源中不存在${path}/${name}`);
                                success(undefined, true);
                            }
                            // git镜像中这个资源无法下载，那就跳过
                            // @ts-ignore
                            else if(typeof onerror == 'function') {
                                onerror(e, e.body);
                            }else{
                                alert('这个资源在git镜像更新源内无法下载，请在下载操作全部完成后切换更新源下载！');
                                success(undefined, true);
                            }
                        }
                    }

                    if (window.FileTransfer) {
                        // 判断是不是文件夹，不是才下载
                        function download() {
                            let fileTransfer = new FileTransfer();
                            fileTransfer.download(encodeURI(`${url}`), encodeURI(lib.assetURL + path + '/' + name), success, error);
                        }
                        window.resolveLocalFileSystemURL(lib.assetURL,
                            /**
                             * @param { DirectoryEntry } DirectoryEntry
                             */
                            DirectoryEntry => {
                                DirectoryEntry.getDirectory(path, { create: false }, dir => {
                                    dir.getDirectory(name, { create: false }, () => {
                                        console.log(`${path}/${name}是文件夹`);
                                        // 跳过下载
                                        success(undefined, true);
                                    }, download);
                                }, download);
                            }, download);
                    } else if (typeof window.require == 'function'){
                        const fetch = myFetch(`${url}`);

                        fetch.then(response => response.arrayBuffer())
                            .then(arrayBuffer => {
                                const fs = require('fs');
                                const p = require('path');
                                const filePath = p.join(__dirname, path, name);
                                const dirPath = p.dirname(filePath);
                                function writeFile() {
                                    fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
                                        if (e) error(e, 'writeFile');
                                        else success();
                                    });
                                }
                                if (!fs.existsSync(dirPath)) {
                                    fs.mkdir(dirPath, { recursive: true }, e => {
                                        if (e) error(e, '文件夹创建失败');
                                        writeFile();
                                    });
                                } else if (fs.existsSync(filePath)) {
                                    const stat = fs.statSync(filePath);
                                    if (stat.isDirectory()) {
                                        console.error(`${path + '/' + name}是个文件夹`);
                                        alert(`${path + '/' + name}是个文件夹，不予下载。请将此问题报告给此更新源的管理者。`);
                                        return success(undefined, true);
                                    } else {
                                        writeFile();
                                    }
                                } else {
                                    writeFile();
                                }
                            })
                            .catch(
                                /** @param { Response } response */
                                response => {
                                    console.log(response);
                                    error(new Error(String(response.status)), response.statusText);
                            })
                    }
                };

                game.xjzhMultiDownload = (list, onsuccess, onerror, onfinish, onprogress) => {
                    // 不修改原数组
                    let list2 = list.slice(0);
                    // 正在并发下载的文件名数组
                    let list3 = [];
                    // 已经下载的数量
                    let length = 0;
                    // 最大并发量
                    let max = 5;
                    /**
                     * 下载文件，失败后300ms重新下载
                     * @param { string } current 文件名
                     */
                    let reload = current => {
                        game.xjzhDownload(current, skipDownload => {
                            if (skipDownload === true) {
                                game.print(`跳过下载: ${current}`);
                                console.log(`跳过下载: ${current}`);
                            } else {
                                console.log(`下载成功: ${current}`);
                            }
                            length++;
                            list3.remove(current);
                            onsuccess(list3);
                            //自调用
                            download();
                        }, (e, message) => {
                            console.log(`下载失败: ${message}`);
                            console.dir(e);
                            onerror(e, message);
                            if (message !== '用户未登录') {
                                setTimeout(() => reload(current), 300);
                            }
                        });
                    };

                    let download = () => {
                        if (length < list.length) {
                            let num_copy = list3.length;
                            for (let i = 1; i <= max - num_copy; i++) {
                                /** 正在下载的文件名 */
                                let current = list2.shift();
                                if (current) {
                                    list3.push(current);
                                    reload(current);
                                } else {
                                    break;
                                }
                            }
                        } else if (!list3.length) {
                            onfinish();
                        }
                    };
                    download();
                };

                game.xjzhCheckVersion = (ver1, ver2) => {
                    if (typeof ver1 != 'string') ver1 = '';
                    if (typeof ver2 != 'string') ver2 = '';
                    /**
                     * @param {string} str
                     */
                    function* walk(str) {
                        let part = '';
                        let terminals = ['.', '-'];
                        for (let i = 0; i < str.length; i++) {
                            if (terminals.includes(str[i])) {
                                yield Number(part);
                                part = '';
                            } else {
                                part += str[i];
                            }
                        }
                        if (part) yield Number(part);
                    }

                    const iterator1 = walk(ver1), iterator2 = walk(ver2);
                    let item1 = iterator1.next(), item2 = iterator2.next();

                    function iterNext() {
                        item1 = iterator1.next();
                        item2 = iterator2.next();
                    }

                    function iterReturn() {
                        iterator1.return();
                        iterator2.return();
                    }

                    while (!item1.done && !item2.done) {
                        if (item1.value === item2.value || isNaN(item1.value) || isNaN(item2.value)) {
                            iterNext();
                        } else if (item1.value > item2.value) {
                            iterReturn();
                            return 1;
                        } else if (item1.value < item2.value) {
                            iterReturn();
                            return -1;
                        }
                    }

                    if (item1.done && !item2.done) {
                        iterReturn();
                        return -1;
                    } else if (!item1.done && item2.done) {
                        iterReturn();
                        return 1;
                    }
                    /* else if (item1.done && item2.done) {
                        return 0;
                    }*/
                    else return 0;
                };

                game.xjzhGetUpdateFiles().then(({ update, source_list: updates }) => {
                    if (!lib.extensionPack.仙家之魂.version) lib.extensionPack.仙家之魂.version = updateLog.version;
                    //要更新的版本和现有的版本一致
                    if (update.version == updateLog.version) {
                        if (!confirm('当前版本已经是最新，是否覆盖更新？')) {
                            game.Updating = false;
                            button.innerHTML = '检查扩展更新';
                            button.disabled = false;
                            return;
                        }
                    } else {
                        const result = game.xjzhCheckVersion(lib.version, update.version);
                        if (result == 1) {
                            if (!confirm('游戏版本比服务器提供的版本还要高，是否覆盖更新？')) {
                                game.Updating = false;
                                button.innerHTML = '检查扩展更新';
                                button.disabled = false;
                                return;
                            }
                        }
                    }

                    let files = null;
                    /** 原来的版本号 */
                    let version = lib.version;

                    let goupdate = (files, update) => {
                        lib.version = update.version;
                        delete window.xjzh_updateSource;

                        if (!game.getExtensionConfig('仙家之魂', 'xjzh_updateAll') && Array.isArray(files)) {
                            files.add('ext/modules/update/update.js');
                            let files2 = [];
                            for (let i = 0; i < files.length; i++) {
                                let str = files[i].indexOf('*');
                                if (str != -1) {
                                    str = files[i].slice(0, str);
                                    files.splice(i--, 1);
                                    for (let j = 0; j < updates.length; j++) {
                                        if (updates[j].indexOf(str) == 0) {
                                            files2.push(updates[j]);
                                        }
                                    }
                                }
                            }
                            updates = files.concat(files2);
                        }

                        for (let i = 0; i < updates.length; i++) {
                            if (updates[i].indexOf('node_modules/') == 0 ) {
                                //只有电脑端用，没有nodejs环境跳过
                                if (!lib.node || !lib.node.fs) {
                                    updates.splice(i--, 1);
                                    continue;
                                };
                                let entry = updates[i];
                                const fs = require('fs');
                                fs.access(__dirname + '/' + entry, function (err) {
                                    if (!err) {
                                        const size = fs.statSync(__dirname + '/' + entry).size;
                                        // @ts-ignore
                                        size == 0 && (err = true);
                                    }
                                    !err && updates.splice(i--, 1);
                                });
                            }
                        }

                        button.remove();

                        let span = document.createElement('span');
                        let n1 = 0;
                        let n2 = updates.length;
                        span.innerHTML = `正在下载文件（${n1}/${n2}）`;
                        parentNode.insertBefore(span, parentNode.firstElementChild);

                        let consoleMenu;
                        if (this != button) {
                            consoleMenu = document.createElement('button');
                            consoleMenu.setAttribute('type', 'button');
                            consoleMenu.innerHTML = '跳转到命令页面';
                            consoleMenu.onclick = ui.click.consoleMenu;
                            parentNode.appendChild(document.createElement('br'));
                            parentNode.appendChild(consoleMenu);
                        }

                        game.xjzhHasLocalNotification = () => {
                            return !!(window.cordova && cordova.plugins && cordova.plugins.notification && cordova.plugins.notification.local);
                        }
                        // 复制文件数组，用来和进度绑定
                        const copyList = [...updates];
                        // 创建下载进度div
                        const progress = game.xjzhCreateProgress('更新扩展', copyList.length, copyList[0]);
                        // app创建通知
                        if (game.xjzhHasLocalNotification()) {
                            cordova.plugins.notification.local.schedule({
                                id: 2,
                                title: '扩展版本更新',
                                text: `正在下载文件（${n1}/${n2}）`,
                                // 进度
                                progressBar: { value: 0 }
                            });
                        }

                        game.xjzhMultiDownload(updates, (fileNameList) => {
                            n1++;
                            span.innerHTML = `正在下载文件（${n1}/${n2}）`;
                            // 更新进度
                            progress.setProgressValue(n1);
                            progress.autoSetFileNameFromArray(fileNameList);
                            if (game.xjzhHasLocalNotification()) {
                                cordova.plugins.notification.local.update({
                                    id: 2,
                                    text: `正在下载文件（${n1}/${n2}）`,
                                    progressBar: { value: (n1 / n2 * 100).toFixed(0) }
                                });
                            }
                        },
                            // 下载失败
                            e => {},
                            // 下载完成
                            () => {
                                // 更新进度, 下载完成时不执行onsuccess而是onfinish
                                progress.setProgressValue(copyList.length);
                                progress.setFileName('下载完成');
                                if (game.xjzhHasLocalNotification()) {
                                    cordova.plugins.notification.local.clear(2);
                                    if (document.hidden) {
                                        cordova.plugins.notification.local.schedule({
                                            id: 4,
                                            title: '扩展版本更新',
                                            text: `扩展版本更新完啦，点击进入无名杀`,
                                        });
                                    }
                                }
                                setTimeout(() => {
                                    // 移除进度条
                                    progress.remove();
                                    // 删除window.xjzh_updateversion
                                    delete window.xjzh_updateversion;
                                    span.innerHTML = `扩展更新完毕（${n1}/${n2}）`;
                                    setTimeout(() => {
                                        if (!game.UpdatingForAsset) {
                                            if (game.unwantedToUpdateAsset) game.allUpdatesCompleted = true;
                                            alert('扩展更新完毕');
                                        }
                                        game.Updating = false;
                                        game.unwantedToUpdate = true;
                                        typeof consoleMenu != 'undefined' && consoleMenu.remove();
                                        parentNode.insertBefore(document.createElement('br'), parentNode.firstElementChild);
                                        let button2 = document.createElement('button');
                                        button2.innerHTML = '重新启动';
                                        button2.onclick = game.reload;
                                        // button2.style.marginTop = '8px';
                                        parentNode.insertBefore(button2, parentNode.firstElementChild);
                                    }, 750);
                                }, 250);
                            },
                            (current, loaded, total) => {
                                if (total != 0) {
                                    progress.setFileName(`${current}(已完成${Math.round((loaded / total) * 100)}%)`);
                                } else {
                                    progress.setFileName(`${current}(已下载${parseSize(loaded)})`);
                                }
                            });
                    };

                    if (Array.isArray(update.files) && update.update) {
                        // 当前扩展版本
                        let version1 = version.split('.');
                        // update里要更新的版本，如果当前扩展版本是这个版本，就只更新update.files里的内容
                        let version2 = update.update.split('.');

                        for (let i = 0; i < version1.length && i < version2.length; i++) {
                            if (+version2[i] > +version1[i]) {
                                files = false;
                                break;
                            } else if (+version1[i] > +version2[i]) {
                                files = update.files.slice(0);
                                break;
                            }
                        }
                        if (files === null) {
                            if (version1.length >= version2.length) {
                                files = update.files.slice(0);
                            }
                        }
                    }

                    let str = '有新版本' + update.version + '可用，是否下载？';
                    if (navigator.notification && navigator.notification.confirm) {
                        let str2 = updateLog.changeLog[0];
                        for (let i = 1; i < updateLog.changeLog.length; i++) {
                            if (updateLog.changeLog[i].indexOf('://') == -1) {
                                str2 += '；' + updateLog.changeLog[i];
                            }
                        }
                        navigator.notification.confirm(
                            str2,
                            function (index) {
                                if (index == 1) {
                                    goupdate(files, update);
                                } else {
                                    // 还原版本
                                    lib.version = version;
                                    game.Updating = false;
                                    button.innerHTML = '检查扩展更新';
                                    button.disabled = false;
                                }
                            },
                            str,
                            ['确定', '取消']
                        );
                    } else {
                        if (confirm(str)) {
                            goupdate(files, update);
                        } else {
                            // 还原版本
                            lib.version = version;
                            game.Updating = false;
                            button.innerHTML = '检查扩展更新';
                            button.disabled = false;
                        }
                    }
                }).catch(err => {
                    game.Updating = false;
                    button.innerHTML = '检查扩展更新';
                    button.disabled = false;
                    response_catch(err);
                    reduction();
                });
            }
        }
    },

};

export default updateOnlines;