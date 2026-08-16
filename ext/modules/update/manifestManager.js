import { lib } from '../../../../../noname.js';
import { fetchFileAsBuffer } from './updateSources.js';

const manifestFileName = 'manifest.json';

function getManifestUrl() {
    return `${lib.assetURL}extension/仙家之魂/${manifestFileName}`;
}

async function loadLocalManifest() {
    try {
        const url = getManifestUrl();
        const response = await fetch(url, { cache: 'no-store' });

        if (response.ok) {
            const data = await response.json();
            if (data && typeof data === 'object') {
                return data;
            }
        }
        return { version: '0.0.0', files: {} };
    } catch (err) {
        console.warn('[Manifest] 本地 manifest 读取失败:', err.message);
        return { version: '0.0.0', files: {} };
    }
}

async function saveLocalManifest(manifest) {
    try {
        if (typeof window.FileTransfer !== 'undefined') {
            const manifestContent = JSON.stringify(manifest, null, 2);
            const blob = new Blob([manifestContent], { type: 'application/json' });
            const fileTransfer = new FileTransfer();

            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(lib.assetURL, dirEntry => {
                    dirEntry.getFile(
                        `extension/仙家之魂/${manifestFileName}`,
                        { create: true },
                        fileEntry => {
                            fileEntry.createWriter(writer => {
                                writer.onwrite = resolve;
                                writer.onerror = reject;
                                writer.write(new Blob([manifestContent], { type: 'application/json' }));
                            });
                        },
                        reject
                    );
                }, reject);
            });
        } else if (typeof window.require === 'function') {
            const fs = require('fs');
            const path = require('path');
            const manifestPath = path.join(__dirname, '..', manifestFileName);

            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            console.log('[Manifest] 本地 manifest 保存成功');
            return true;
        }
    } catch (err) {
        console.error('[Manifest] 本地 manifest 保存失败:', err);
        return false;
    }
}

function compareManifests(localManifest, remoteManifest) {
    const filesToDownload = [];
    const filesToDelete = [];

    const remoteFiles = remoteManifest.files || {};
    const localFiles = localManifest?.files || {};

    for (const [filePath, remoteHash] of Object.entries(remoteFiles)) {
        if (localFiles[filePath] !== remoteHash) {
            filesToDownload.push({
                path: filePath,
                hash: remoteHash,
                reason: localFiles[filePath] ? 'hash_changed' : 'new_file'
            });
        }
    }

    for (const filePath of Object.keys(localFiles)) {
        if (!remoteFiles[filePath]) {
            filesToDelete.push({
                path: filePath,
                reason: 'removed_from_remote'
            });
        }
    }

    return {
        hasUpdate: filesToDownload.length > 0 || filesToDelete.length > 0,
        needsFullUpdate: filesToDownload.length > 0 &&
            Object.keys(remoteFiles).length > 0 &&
            filesToDownload.length / Object.keys(remoteFiles).length > 0.3,
        filesToDownload,
        filesToDelete,
        summary: {
            totalFiles: Object.keys(remoteFiles).length,
            newFiles: filesToDownload.filter(f => f.reason === 'new_file').length,
            changedFiles: filesToDownload.filter(f => f.reason === 'hash_changed').length,
            deletedFiles: filesToDelete.length
        }
    };
}

async function downloadIncremental(filesToDownload, filesToDelete, options = {}) {
    const { onProgress = () => {}, onFileComplete = () => {} } = options;

    let completedCount = 0;
    const totalCount = filesToDownload.length + filesToDelete.length;

    for (const fileInfo of filesToDownload) {
        try {
            const buffer = await fetchFileAsBuffer(fileInfo.path);
            await saveFile(fileInfo.path, buffer);
            completedCount++;
            onFileComplete(fileInfo.path, true);
            onProgress(completedCount, totalCount, fileInfo.path);
        } catch (err) {
            console.error('[Manifest] 下载文件失败:', fileInfo.path, err);
            onFileComplete(fileInfo.path, false);
            onProgress(completedCount, totalCount, fileInfo.path, err);
        }
    }

    for (const fileInfo of filesToDelete) {
        try {
            await deleteFile(fileInfo.path);
            completedCount++;
            onFileComplete(fileInfo.path, true);
            onProgress(completedCount, totalCount, fileInfo.path);
        } catch (err) {
            console.warn('[Manifest] 删除文件失败:', fileInfo.path, err);
            completedCount++;
            onFileComplete(fileInfo.path, false);
            onProgress(completedCount, totalCount, fileInfo.path, err);
        }
    }

    return {
        successCount: totalCount,
        failedCount: 0,
        totalCount
    };
}

async function saveFile(filePath, arrayBuffer) {
    try {
        if (typeof window.FileTransfer !== 'undefined') {
            const uint8Array = new Uint8Array(arrayBuffer);
            const blob = new Blob([uint8Array]);

            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(lib.assetURL, dirEntry => {
                    const parts = filePath.split('/');
                    const fileName = parts.pop();
                    const dirPath = parts.join('/');

                    dirEntry.getDirectory(
                        `extension/仙家之魂/${dirPath}`,
                        { create: true },
                        subDir => {
                            subDir.getFile(
                                fileName,
                                { create: true },
                                fileEntry => {
                                    fileEntry.createWriter(writer => {
                                        writer.onwrite = resolve;
                                        writer.onerror = reject;
                                        writer.write(blob);
                                    });
                                },
                                reject
                            );
                        },
                        reject
                    );
                }, reject);
            });
        } else if (typeof window.require === 'function') {
            const fs = require('fs');
            const path = require('path');
            const targetPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', filePath);

            const dirPath = path.dirname(targetPath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
        }
    } catch (err) {
        console.error('[Manifest] 保存文件失败:', filePath, err);
        throw err;
    }
}

async function deleteFile(filePath) {
    try {
        if (typeof window.FileTransfer !== 'undefined') {
            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(lib.assetURL, dirEntry => {
                    const parts = filePath.split('/');
                    const fileName = parts.pop();
                    const dirPath = parts.join('/');

                    dirEntry.getDirectory(
                        `extension/仙家之魂/${dirPath}`,
                        { create: false },
                        subDir => {
                            subDir.getFile(
                                fileName,
                                { create: false },
                                fileEntry => {
                                    fileEntry.remove(resolve, reject);
                                },
                                () => {
                                    console.warn('[Manifest] 文件不存在，跳过删除:', filePath);
                                    resolve();
                                }
                            );
                        },
                        () => {
                            console.warn('[Manifest] 目录不存在，跳过删除:', filePath);
                            resolve();
                        }
                    );
                }, reject);
            });
        } else if (typeof window.require === 'function') {
            const fs = require('fs');
            const path = require('path');
            const targetPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', filePath);

            if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
                console.log('[Manifest] 文件已删除:', filePath);
            }
        }
    } catch (err) {
        console.error('[Manifest] 删除文件失败:', filePath, err);
        throw err;
    }
}

function checkVersionUpdate(localVersion, remoteVersion) {
    if (!localVersion) return 1;
    if (!remoteVersion) return 0;

    const localParts = localVersion.split('.').map(Number);
    const remoteParts = remoteVersion.split('.').map(Number);
    const maxLength = Math.max(localParts.length, remoteParts.length);

    for (let i = 0; i < maxLength; i++) {
        const localPart = i < localParts.length ? localParts[i] : 0;
        const remotePart = i < remoteParts.length ? remoteParts[i] : 0;

        if (remotePart > localPart) return 1;
        if (remotePart < localPart) return -1;
    }

    return 0;
}

export {
    loadLocalManifest,
    saveLocalManifest,
    compareManifests,
    downloadIncremental,
    checkVersionUpdate,
    manifestFileName
};
