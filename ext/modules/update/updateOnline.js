import { lib, ui, game } from '../../../../../noname.js';
import { createProgress } from '../../../../../noname/library/update.js';
import { fetchManifest, getSourceInfo, resetSource } from './updateSources.js';
import { loadLocalManifest, saveLocalManifest, compareManifests, downloadIncremental, checkVersionUpdate } from './manifestManager.js';
import { downloadAndExtractRelease } from './releaseManager.js';

const updateOnlines = {
    "xjzh_updateVersionOption": {
        "name": `<img style="width:260px" src="${lib.assetURL}extension/仙家之魂/image/title/xjzh_updateVersion.png">`,
        "intro": "",
        "init": true,
        "clear": true,
    },
    "xjzh_update_source": {
        name: '更新源',
        init: (() => {
            const savedSource = game.getExtensionConfig('仙家之魂', 'xjzh_update_source');
            return savedSource || 'jsDelivr';
        })(),
        item: {
            jsDelivr: 'jsDelivr (推荐)',
            GitHub: 'GitHub (备用)'
        },
        onclick: function (item) {
            if (item !== game.getExtensionConfig('仙家之魂', 'xjzh_update_source')) {
                game.saveExtensionConfig('仙家之魂', 'xjzh_update_source', item);
                resetSource();
                alert(`更新源已切换为: ${item}`);
            }
        },
    },
    "xjzh_updateAll": {
        name: '强制全量更新',
        intro: '更新时始终使用 Release 全量包',
        init: false,
        onclick: (bool) => {
            game.saveExtensionConfig('仙家之魂', 'xjzh_updateAll', bool);
        },
    },
    "xjzh_checkForUpdate": {
        clear: true,
        intro: '点击检查扩展更新',
        name: '<button type="button">检查扩展更新</button>',
        onclick: async function () {
            let button;
            if (this instanceof HTMLButtonElement) {
                button = this;
            } else {
                button = this.childNodes[0]?.childNodes[0];
            }

            if (!button || button.innerText !== '检查扩展更新') return;
            if (button.disabled) return;
            if (game.Updating) return alert('正在更新游戏文件，请勿重复点击');

            game.Updating = true;
            button.innerHTML = '正在检查更新...';
            button.disabled = true;

            const resetButton = () => {
                game.Updating = false;
                button.innerHTML = '检查扩展更新';
                button.disabled = false;
            };

            try {
                game.print('正在检查更新...');

                const localManifest = await loadLocalManifest();
                const remoteManifest = await fetchManifest();

                const localVersion = lib.extensionPack['仙家之魂']?.version || '0.0.0';
                const remoteVersion = remoteManifest.version;

                const versionCompare = checkVersionUpdate(localVersion, remoteVersion);

                if (versionCompare === 0) {
                    alert('当前版本已是最新！');
                    resetButton();
                    return;
                }

                if (versionCompare > 0) {
                    if (!confirm(`本地版本(${localVersion})比远程版本(${remoteVersion})更高，是否覆盖更新？`)) {
                        resetButton();
                        return;
                    }
                }

                const comparison = compareManifests(localManifest, remoteManifest);

                const forceFullUpdate = game.getExtensionConfig('仙家之魂', 'xjzh_updateAll');
                const useRelease = forceFullUpdate || comparison.needsFullUpdate;

                showUpdateDialog(remoteVersion, comparison, useRelease, async (updateType) => {
                    try {
                        button.innerHTML = updateType === 'incremental'
                            ? '正在增量更新...'
                            : '正在全量更新...';

                        if (updateType === 'incremental') {
                            await performIncrementalUpdateCompat(comparison, remoteManifest, resetButton);
                        } else {
                            await performFullUpdateCompat(remoteVersion, remoteManifest, resetButton);
                        }
                    } catch (err) {
                        console.error('[Update] 更新失败:', err);
                        alert(`更新失败: ${err.message || '未知错误'}`);
                        resetButton();
                    }
                }, resetButton);

            } catch (err) {
                console.error('[Update] 检查更新失败:', err);

                let errorMsg = '检查更新失败';
                if (err.name === 'AbortError') {
                    errorMsg = '网络连接超时，请检查网络或切换更新源';
                } else if (err.message) {
                    errorMsg += ': ' + err.message;
                }

                alert(errorMsg);
                resetButton();
            }
        },
    },
};

function showUpdateDialog(version, comparison, recommendRelease, onSelect, onCancel) {
    const dialog = ui.create.dialog('', 'hidden');
    dialog.forcebutton = true;
    dialog.classList.add('forcebutton');

    let content = `
        <div style="padding: 15px; text-align: left; max-width: 500px;">
            <h2 style="margin-top: 0; color: #007bff; text-align: center;">
                🎉 发现新版本 v${version}
            </h2>

            <div style="background: #e3f2fd; border-radius: 8px; padding: 10px; margin: 10px 0;">
                <strong>📊 变更统计：</strong>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 5px;">
                    <span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">
                        新增: ${comparison.summary.newFiles}
                    </span>
                    <span style="background: #ffc107; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">
                        修改: ${comparison.summary.changedFiles}
                    </span>
                    <span style="background: #dc3545; color: white; padding: 3px 8px; border-radius: 12px; font-size: 12px;">
                        删除: ${comparison.summary.deletedFiles}
                    </span>
                </div>
            </div>

            <div style="background: #f8f9fa; border-radius: 8px; padding: 10px; margin: 10px 0; max-height: 150px; overflow-y: auto;">
                <strong>📝 变更文件列表：</strong>
                <ul style="margin: 5px 0; padding-left: 20px; font-size: 12px;">
    `;

    const changedFiles = [
        ...comparison.filesToDownload.map(f => f.path),
        ...comparison.filesToDelete.map(f => f.path)
    ];

    const displayFiles = changedFiles.slice(0, 20);
    displayFiles.forEach(file => {
        content += `<li>${file}</li>`;
    });

    if (changedFiles.length > 20) {
        content += `<li style="color: #6c757d;">... 等 ${changedFiles.length} 个文件</li>`;
    }

    content += `
                </ul>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button id="btn-incremental" style="flex: 1; padding: 10px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; ${recommendRelease ? 'opacity: 0.5;' : ''}">
                    📥 增量更新
                </button>
                <button id="btn-full" style="flex: 1; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    📦 全量更新
                </button>
            </div>
            <button id="btn-cancel" style="width: 100%; padding: 8px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                取消
            </button>
    `;

    const lic = ui.create.div(dialog.content);
    lic.style.display = 'block';
    lic.innerHTML = content;

    setTimeout(() => {
        const btnIncremental = document.getElementById('btn-incremental');
        const btnFull = document.getElementById('btn-full');
        const btnCancel = document.getElementById('btn-cancel');

        if (btnIncremental) {
            btnIncremental.onclick = () => {
                dialog.close();
                onSelect('incremental');
            };
        }

        if (btnFull) {
            btnFull.onclick = () => {
                dialog.close();
                onSelect('full');
            };
        }

        if (btnCancel) {
            btnCancel.onclick = () => {
                dialog.close();
                onCancel();
            };
        }
    }, 100);

    dialog.open();
}

async function performIncrementalUpdateCompat(comparison, remoteManifest, resetButton) {
    const totalCount = comparison.filesToDownload.length + comparison.filesToDelete.length;
    const progress = createProgress('增量更新', totalCount, '准备中...', 0);

    try {
        game.print(`开始增量更新，共 ${totalCount} 个文件需要处理...`);

        let completedCount = 0;

        const result = await downloadIncremental(
            comparison.filesToDownload,
            comparison.filesToDelete,
            {
                onProgress: (completed, total, currentFile, error) => {
                    progress.setProgressValue(completed);
                    progress.setFileName(currentFile || '处理中...');

                    if (error) {
                        game.print(`⚠️ ${currentFile} 更新失败: ${error.message}`);
                    } else {
                        game.print(`✓ ${currentFile} 更新成功 (${completed}/${total})`);
                    }
                },
                onFileComplete: (filePath, success) => {
                    if (!success) {
                        console.warn(`[Update] 文件更新失败: ${filePath}`);
                    }
                }
            }
        );

        await saveLocalManifest(remoteManifest);

        progress.setProgressValue(result.totalCount);
        progress.setFileName('更新完成！');

        setTimeout(() => {
            progress.close();
            alert(`增量更新完成！\n\n✅ 成功处理 ${result.totalCount} 个文件\n🔄 请重启游戏以加载新版本`);
            game.reload();
        }, 1000);

    } catch (err) {
        console.error('[Update] 增量更新失败:', err);
        progress.close();
        alert(`增量更新失败: ${err.message || '未知错误'}`);
        resetButton();
    }
}

async function performFullUpdateCompat(version, remoteManifest, resetButton) {
    const progress = createProgress('全量更新 (Release)', 100, '准备下载...', 0);

    try {
        game.print(`开始全量更新，版本 v${version}...`);

        await downloadAndExtractRelease(version, {
            onDownloadProgress: ({ progress: p, received, total, fileName }) => {
                progress.setProgressValue(p);
                const sizeStr = total ? formatSize(total) : '未知大小';
                progress.setFileName(`下载 ${fileName}: ${p}% (${formatSize(received)}/${sizeStr})`);
            },
            onExtractProgress: ({ progress: p, currentFile, completed, total }) => {
                progress.setProgressValue(p);
                progress.setFileName(`解压 ${currentFile} (${completed}/${total})`);
            },
            onComplete: async () => {
                await saveLocalManifest(remoteManifest);
                progress.setProgressValue(100);
                progress.setFileName('全量更新完成！');

                setTimeout(() => {
                    progress.close();
                    alert(`全量更新完成！\n\n📦 已下载并解压 Release v${version}\n🔄 请重启游戏以加载新版本`);
                    game.reload();
                }, 1000);
            },
            onError: (err) => {
                console.error('[Update] Release 更新失败:', err);
            }
        });

    } catch (err) {
        console.error('[Update] 全量更新失败:', err);
        progress.close();

        if (err.message && err.message.includes('没有可用的 Release')) {
            alert('该版本还没有发布 Release，请使用增量更新或联系作者');
        } else {
            alert(`全量更新失败: ${err.message || '未知错误'}`);
        }
        resetButton();
    }
}

// ============ Vue 组件可用的 API ============

const updateApi = {

    getCurrentVersion() {
        return lib.extensionPack['仙家之魂']?.version || '0.0.0';
    },

    getUpdateConfig() {
        return {
            source: game.getExtensionConfig('仙家之魂', 'xjzh_update_source') || 'jsDelivr',
            forceFullUpdate: game.getExtensionConfig('仙家之魂', 'xjzh_updateAll') || false,
            sourceInfo: getSourceInfo()
        };
    },

    setUpdateConfig(key, value) {
        game.saveExtensionConfig('仙家之魂', key, value);
        if (key === 'xjzh_update_source') {
            resetSource();
        }
    },

    async checkForUpdate(callbacks = {}) {
        const { onStatus } = callbacks;
        
        if (game.Updating) {
            throw new Error('正在更新游戏文件，请勿重复点击');
        }

        game.Updating = true;

        try {
            game.print('正在检查更新...');
            if (onStatus) onStatus('准备读取本地版本信息...');

            const localManifest = await loadLocalManifest();
            if (onStatus) onStatus('本地版本信息读取完成');
            
            if (onStatus) onStatus('正在连接远程服务器获取最新版本...');
            const source = game.getExtensionConfig('仙家之魂', 'xjzh_update_source') || 'jsDelivr';
            if (onStatus) onStatus(`正在连接 ${source} 服务器...`);
            
            const remoteManifest = await fetchManifest();
            if (onStatus) onStatus('远程版本信息获取成功');

            const localVersion = this.getCurrentVersion();
            const remoteVersion = remoteManifest.version;

            if (onStatus) onStatus(`正在对比版本信息 (本地: v${localVersion}, 远程: v${remoteVersion})...`);
            const versionCompare = checkVersionUpdate(localVersion, remoteVersion);

            if (versionCompare === 0) {
                if (onStatus) onStatus('版本对比完成，当前版本已是最新');
                return {
                    hasUpdate: false,
                    localVersion,
                    remoteVersion,
                    message: '当前版本已是最新！'
                };
            }

            const isHigher = versionCompare > 0;

            if (onStatus) onStatus('正在对比本地与远程文件列表...');
            const comparison = compareManifests(localManifest, remoteManifest);
            const forceFullUpdate = game.getExtensionConfig('仙家之魂', 'xjzh_updateAll');
            const useRelease = forceFullUpdate || comparison.needsFullUpdate;

            const totalFiles = comparison.summary.newFiles + comparison.summary.changedFiles + comparison.summary.deletedFiles;
            if (onStatus) onStatus(`检测到 ${totalFiles} 个变更文件 (新增:${comparison.summary.newFiles} 修改:${comparison.summary.changedFiles} 删除:${comparison.summary.deletedFiles})`);

            return {
                hasUpdate: true,
                localVersion,
                remoteVersion,
                isHigher,
                comparison,
                useRelease,
                remoteManifest
            };
        } catch (err) {
            console.error('[Update] 检查更新失败:', err);
            if (onStatus) onStatus(`检查失败: ${err.message || '未知错误'}`);
            let errorMsg = '检查更新失败';
            if (err.name === 'AbortError') {
                errorMsg = '网络连接超时，请检查网络或切换更新源';
            } else if (err.message) {
                errorMsg += ': ' + err.message;
            }
            throw new Error(errorMsg);
        } finally {
            game.Updating = false;
        }
    },

    async performIncrementalUpdate(comparison, remoteManifest, callbacks = {}) {
        const totalCount = comparison.filesToDownload.length + comparison.filesToDelete.length;
        const { onProgress, onFileComplete, onComplete, onError, onStatus } = callbacks;

        try {
            game.print(`开始增量更新，共 ${totalCount} 个文件需要处理...`);
            if (onStatus) onStatus(`准备下载 ${comparison.filesToDownload.length} 个新文件...`);

            let completedCount = 0;
            let lastStatusTime = 0;

            const result = await downloadIncremental(
                comparison.filesToDownload,
                comparison.filesToDelete,
                {
                    onProgress: (completed, total, currentFile, error) => {
                        completedCount = completed;
                        if (onProgress) {
                            onProgress({
                                completed,
                                total,
                                currentFile,
                                percent: total > 0 ? Math.round((completed / total) * 100) : 0,
                                error: error || null
                            });
                        }
                        const now = Date.now();
                        if (onStatus && (now - lastStatusTime > 500 || completed === total)) {
                            lastStatusTime = now;
                            if (error) {
                                onStatus(`⚠️ ${currentFile} 更新失败 (${completed}/${total})`);
                            } else if (currentFile) {
                                onStatus(`正在处理: ${currentFile} (${completed}/${total})`);
                            }
                        }
                        if (error) {
                            game.print(`⚠️ ${currentFile} 更新失败: ${error.message}`);
                        } else {
                            game.print(`✓ ${currentFile} 更新成功 (${completed}/${total})`);
                        }
                    },
                    onFileComplete: (filePath, success) => {
                        if (!success) {
                            console.warn(`[Update] 文件更新失败: ${filePath}`);
                        }
                        if (onFileComplete) onFileComplete(filePath, success);
                    }
                }
            );

            if (onStatus) onStatus('文件下载完成，正在保存版本信息...');
            await saveLocalManifest(remoteManifest);
            if (onStatus) onStatus('版本信息保存成功');

            if (onComplete) {
                onComplete({
                    success: true,
                    totalCount: result.totalCount,
                    completedCount,
                    message: `增量更新完成！成功处理 ${result.totalCount} 个文件`
                });
            }

            if (onStatus) onStatus(`增量更新全部完成 (${result.totalCount} 个文件)`);
            return result;
        } catch (err) {
            console.error('[Update] 增量更新失败:', err);
            if (onStatus) onStatus(`增量更新失败: ${err.message || '未知错误'}`);
            if (onError) {
                onError(err);
            }
            throw err;
        }
    },

    async performFullUpdate(version, remoteManifest, callbacks = {}) {
        const { onDownloadProgress, onExtractProgress, onComplete, onError, onStatus } = callbacks;

        try {
            game.print(`开始全量更新，版本 v${version}...`);
            if (onStatus) onStatus(`准备下载 Release v${version} 全量更新包...`);

            await downloadAndExtractRelease(version, {
                onDownloadProgress: (info) => {
                    if (onDownloadProgress) onDownloadProgress(info);
                    if (onStatus && info.progress % 25 === 0) {
                        onStatus(`下载中: ${info.fileName} ${info.progress}%`);
                    }
                },
                onExtractProgress: (info) => {
                    if (onExtractProgress) onExtractProgress(info);
                    if (onStatus && info.progress % 25 === 0) {
                        onStatus(`解压中: ${info.currentFile} (${info.completed}/${info.total})`);
                    }
                },
                onComplete: async () => {
                    if (onStatus) onStatus('下载完成，正在解压全量包...');
                    await saveLocalManifest(remoteManifest);
                    if (onStatus) onStatus('全量更新完成，版本信息已保存');
                    if (onComplete) {
                        onComplete({
                            success: true,
                            version,
                            message: `全量更新完成！已下载并解压 Release v${version}`
                        });
                    }
                },
                onError: (err) => {
                    if (onStatus) onStatus(`全量更新失败: ${err.message || '未知错误'}`);
                    if (onError) onError(err);
                }
            });
        } catch (err) {
            console.error('[Update] 全量更新失败:', err);
            if (onStatus) onStatus(`全量更新失败: ${err.message || '未知错误'}`);
            if (onError) {
                onError(err);
            }
            throw err;
        }
    },

    formatSize
};

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.min(i, units.length - 1))).toFixed(1) + ' ' + units[Math.min(i, units.length - 1)];
}

export default updateOnlines;
export { updateApi, formatSize, fetchManifest, loadLocalManifest, saveLocalManifest, compareManifests, checkVersionUpdate };