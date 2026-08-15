import { game } from '../../../../../noname.js';
import { repoOwner, repoName } from './updateSources.js';

const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;

const downloadWithTimeout = async (url, timeout = 30000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response;
    } catch (err) {
        clearTimeout(timeoutId);
        throw err;
    }
};

async function getLatestRelease() {
    try {
        const response = await downloadWithTimeout(githubApiUrl, 10000);
        const releases = await response.json();
        
        if (!releases || releases.length === 0) {
            throw new Error('没有可用的 Release');
        }

        return {
            tag: releases[0].tag_name,
            version: releases[0].tag_name?.replace(/^v/, '') || '0.0.0',
            name: releases[0].name || releases[0].tag_name,
            assets: releases[0].assets.map(asset => ({
                name: asset.name,
                size: asset.size,
                downloadUrl: asset.browser_download_url
            }))
        };
    } catch (err) {
        console.error('[Release] 获取 Release 信息失败:', err);
        throw err;
    }
}

async function getReleaseByVersion(version) {
    try {
        const tagName = version.startsWith('v') ? version : `v${version}`;
        const response = await downloadWithTimeout(githubApiUrl, 10000);
        const releases = await response.json();

        const targetRelease = releases.find(r => r.tag_name === tagName);
        
        if (!targetRelease) {
            throw new Error(`未找到版本 ${version} 的 Release`);
        }

        return {
            tag: targetRelease.tag_name,
            version: version,
            name: targetRelease.name || targetRelease.tag_name,
            assets: targetRelease.assets.map(asset => ({
                name: asset.name,
                size: asset.size,
                downloadUrl: asset.browser_download_url
            }))
        };
    } catch (err) {
        console.error(`[Release] 获取版本 ${version} 的 Release 失败:`, err);
        throw err;
    }
}

async function downloadReleaseAsset(assetUrl, options = {}) {
    const {
        onProgress = () => {},
        onComplete = () => {},
        onError = () => {}
    } = options;

    try {
        const response = await fetch(assetUrl);
        
        if (!response.ok) {
            throw new Error(`下载失败: HTTP ${response.status}`);
        }

        const contentLength = parseInt(response.headers.get('Content-Length') || '0', 10);
        const reader = response.body.getReader();
        const chunks = [];
        let receivedLength = 0;

        while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            chunks.push(value);
            receivedLength += value.length;
            
            if (contentLength > 0) {
                const progress = Math.round((receivedLength / contentLength) * 100);
                onProgress(progress, receivedLength, contentLength);
            }
        }

        const blob = new Blob(chunks);
        const arrayBuffer = await blob.arrayBuffer();
        
        onComplete(arrayBuffer);
        return arrayBuffer;
    } catch (err) {
        console.error('[Release] 下载 Release 资源失败:', err);
        onError(err);
        throw err;
    }
}

async function downloadAndExtractRelease(version, options = {}) {
    const {
        onDownloadProgress = () => {},
        onExtractProgress = () => {},
        onComplete = () => {},
        onError = () => {}
    } = options;

    try {
        const releaseInfo = await getReleaseByVersion(version);
        
        if (!releaseInfo.assets || releaseInfo.assets.length === 0) {
            throw new Error('Release 中没有可用的文件');
        }

        const zipAsset = releaseInfo.assets.find(a => a.name.endsWith('.zip')) || releaseInfo.assets[0];
        
        game.print(`正在下载 Release: ${releaseInfo.name}`);

        const arrayBuffer = await downloadReleaseAsset(zipAsset.downloadUrl, {
            onProgress: (progress, received, total) => {
                onDownloadProgress({
                    progress,
                    received,
                    total,
                    fileName: zipAsset.name
                });
            }
        });

        game.print(`下载完成，正在解压...`);

        if (typeof window.JSZip === 'undefined' && typeof window.zip === 'undefined') {
            console.warn('[Release] JSZip 未加载，无法解压 zip 文件');
            throw new Error('解压库未加载，请使用增量更新或手动下载 Release');
        }

        const zipLib = window.JSZip || window.zip;
        const zip = await zipLib.loadAsync(arrayBuffer);
        
        const files = [];
        let processedCount = 0;
        const totalFiles = Object.keys(zip.files).filter(name => !zip.files[name].dir).length;

        for (const [path, entry] of Object.entries(zip.files)) {
            if (!entry.dir && !path.startsWith('__MACOSX')) {
                files.push({
                    path: path,
                    entry: entry
                });
            }
        }

        for (const file of files) {
            try {
                const content = await zip.file(file.path).async('arraybuffer');
                await writeReleaseFile(file.path, content);
                processedCount++;
                
                const progress = Math.round((processedCount / files.length) * 100);
                onExtractProgress({
                    progress,
                    currentFile: file.path,
                    completed: processedCount,
                    total: files.length
                });
            } catch (err) {
                console.warn(`[Release] 解压文件失败: ${file.path}`, err);
            }
        }

        onComplete({
            success: true,
            version: version,
            fileCount: files.length
        });

        return {
            success: true,
            version: version,
            fileCount: files.length
        };
    } catch (err) {
        console.error('[Release] Release 更新失败:', err);
        onError(err);
        throw err;
    }
}

async function writeReleaseFile(filePath, arrayBuffer) {
    try {
        if (typeof window.require === 'function') {
            const fs = require('fs');
            const path = require('path');
            
            let targetPath;
            if (filePath.startsWith('extension/')) {
                targetPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', filePath);
            } else if (filePath.includes('/仙家之魂/')) {
                const relativePath = filePath.split('/仙家之魂/')[1] || filePath;
                targetPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'extension', '仙家之魂', relativePath);
            } else {
                targetPath = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'extension', '仙家之魂', filePath);
            }
            
            const dirPath = path.dirname(targetPath);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
            
            fs.writeFileSync(targetPath, Buffer.from(arrayBuffer));
        }
    } catch (err) {
        console.error('[Release] 写入文件失败:', filePath, err);
        throw err;
    }
}

function createReleaseDialog(version, summary) {
    return `
        <div style="padding: 15px; text-align: left;">
            <h3 style="margin-top: 0; color: #007bff;">全量更新 - Release v${version}</h3>
            
            <div style="background: #f8f9fa; border-radius: 8px; padding: 10px; margin: 10px 0;">
                <strong>变更统计：</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">
                    <li>总文件数：${summary.totalFiles}</li>
                    <li>新增文件：${summary.newFiles}</li>
                    <li>修改文件：${summary.changedFiles}</li>
                    <li>删除文件：${summary.deletedFiles}</li>
                </ul>
            </div>

            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 10px; margin: 10px 0;">
                <strong style="color: #856404;">⚠️ 注意</strong>
                <ul style="margin: 5px 0; padding-left: 20px; color: #856404;">
                    <li>全量更新会下载完整的 zip 包</li>
                    <li>下载完成后会自动覆盖所有文件</li>
                    <li>如果增量更新无法正常工作，推荐使用此方式</li>
                </ul>
            </div>
        </div>
    `;
}

export {
    getLatestRelease,
    getReleaseByVersion,
    downloadAndExtractRelease,
    createReleaseDialog
};
