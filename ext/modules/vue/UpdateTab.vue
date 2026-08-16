<template>
	<div class="gm-page gm-update-page">
		<div class="gm-update-main">
			<!-- 版本信息卡片 -->
			<div class="gm-update-section gm-update-card">
				<div class="gm-update-section-title">
					<span class="gm-update-title-icon">📦</span>
					版本信息
				</div>
				<div class="gm-update-version-grid">
					<div class="gm-update-version-item">
						<div class="gm-update-item-label">当前版本</div>
						<div class="gm-update-item-value">{{ currentVersion || '加载中...' }}</div>
					</div>
					<div class="gm-update-version-item">
						<div class="gm-update-item-label">更新源</div>
						<select class="gm-update-select" v-model="currentSource" @change="onSourceChange">
							<option v-for="source in availableSources" :key="source" :value="source">{{ source }}</option>
						</select>
					</div>
					<div class="gm-update-version-item gm-update-item-toggle">
						<div class="gm-update-item-label">强制全量更新</div>
						<input type="checkbox" v-model="forceFullUpdate" @change="onForceFullToggle" class="gm-update-checkbox">
					</div>
				</div>
			</div>

			<!-- 检查更新按钮 -->
			<div class="gm-update-section gm-update-card" v-if="!updateState.isChecking && !updateState.isUpdating && !updateState.hasUpdate && !updateState.isComplete">
				<div class="gm-update-check-area">
					<button class="gm-update-check-btn" @click="checkUpdate" :disabled="updateState.isChecking">
						<span class="gm-update-btn-icon">🔍</span>
						检查更新
					</button>
				</div>
			</div>

			<!-- 检查中状态 -->
			<div class="gm-update-section gm-update-card" v-if="updateState.isChecking">
				<div class="gm-update-status-box">
					<div class="gm-update-spinner"></div>
					<div class="gm-update-status-text">
						<div class="gm-update-status-title">正在检查更新...</div>
						<div class="gm-update-status-log">
							<div v-for="(log, index) in checkLogs" :key="index" class="gm-update-log-item" :class="{ active: index === checkLogs.length - 1 }">
								<span class="gm-update-log-time">{{ log.time }}</span>
								<span class="gm-update-log-msg">{{ log.message }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 已是最新版本 -->
			<div class="gm-update-section gm-update-card" v-if="!updateState.isChecking && !updateState.isUpdating && !updateState.hasUpdate && !updateState.isComplete && updateState.checked && updateState.message">
				<div class="gm-update-status-success">
					<div class="gm-update-icon gm-update-icon-success">✓</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">{{ updateState.message }}</div>
						<div class="gm-update-status-desc">您的扩展已为最新版本</div>
					</div>
				</div>
				<button class="gm-update-refresh-btn" @click="checkUpdate">
					<span>🔄</span> 重新检查
				</button>
			</div>

			<!-- 更新信息 -->
			<div class="gm-update-section gm-update-card" v-if="updateState.hasUpdate && !updateState.isUpdating">
				<div class="gm-update-available-header">
					<div class="gm-update-version-compare">
						<span class="gm-update-new-badge">新版本</span>
						<span class="gm-update-version-num">v{{ updateState.remoteVersion }}</span>
						<span class="gm-update-arrow">→</span>
						<span class="gm-update-current">v{{ updateState.localVersion }}</span>
					</div>
				</div>

				<div class="gm-update-stats" v-if="updateState.comparison">
					<div class="gm-update-stat gm-update-stat-new">
						<span class="gm-update-stat-icon">+</span>
						<span class="gm-update-stat-num">{{ updateState.comparison.summary.newFiles }}</span>
						<span class="gm-update-stat-label">新增</span>
					</div>
					<div class="gm-update-stat gm-update-stat-changed">
						<span class="gm-update-stat-icon">~</span>
						<span class="gm-update-stat-num">{{ updateState.comparison.summary.changedFiles }}</span>
						<span class="gm-update-stat-label">修改</span>
					</div>
					<div class="gm-update-stat gm-update-stat-deleted">
						<span class="gm-update-stat-icon">-</span>
						<span class="gm-update-stat-num">{{ updateState.comparison.summary.deletedFiles }}</span>
						<span class="gm-update-stat-label">删除</span>
					</div>
				</div>

				<div class="gm-update-files-list" v-if="changedFiles.length > 0">
					<div class="gm-update-files-header">
						<span>变更文件列表</span>
						<span class="gm-update-files-count">{{ changedFiles.length }} 个</span>
					</div>
					<div class="gm-update-files-content">
						<div v-for="(file, index) in displayFiles" :key="index" class="gm-update-file-item">
							<span class="gm-update-file-icon">📄</span>
							<span class="gm-update-file-path">{{ file }}</span>
						</div>
						<div v-if="changedFiles.length > displayFileLimit" class="gm-update-file-more">... 等 {{ changedFiles.length }} 个文件</div>
					</div>
				</div>

				<div class="gm-update-recommend" v-if="updateState.useRelease">
					<span class="gm-update-recommend-icon">⚠️</span>
					建议使用全量更新（变更文件较多）
				</div>

				<div class="gm-update-actions">
					<button class="gm-update-btn gm-update-btn-incremental" @click="startUpdate('incremental')">
						<span class="gm-update-btn-icon">📥</span>
						增量更新
					</button>
					<button class="gm-update-btn gm-update-btn-full" @click="startUpdate('full')">
						<span class="gm-update-btn-icon">📦</span>
						全量更新
					</button>
				</div>
			</div>

			<!-- 更新进度 -->
			<div class="gm-update-section gm-update-card" v-if="updateState.isUpdating">
				<div class="gm-update-progress-container">
					<div class="gm-update-progress-header">
						<div class="gm-update-progress-title">
							{{ updateState.updateType === 'incremental' ? '📥 增量更新中' : '📦 全量更新中' }}
						</div>
						<div class="gm-update-progress-percent">{{ updateState.progressPercent }}%</div>
					</div>
					<div class="gm-update-progress-bar">
						<div class="gm-update-progress-fill" :style="{ width: updateState.progressPercent + '%' }"></div>
					</div>
					<div class="gm-update-progress-file">
						<span class="gm-update-progress-label">当前进度:</span>
						<span class="gm-update-progress-value">{{ updateState.currentFile || '准备中...' }}</span>
					</div>
					<div class="gm-update-progress-log">
						<div v-for="(log, index) in updateLogs" :key="index" class="gm-update-log-item" :class="{ active: index === updateLogs.length - 1 }">
							<span class="gm-update-log-time">{{ log.time }}</span>
							<span class="gm-update-log-msg">{{ log.message }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 更新完成 -->
			<div class="gm-update-section gm-update-card" v-if="updateState.isComplete">
				<div class="gm-update-status-success">
					<div class="gm-update-icon gm-update-icon-success">✓</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">更新完成</div>
						<div class="gm-update-status-desc">{{ updateState.completeMessage }}</div>
						<div class="gm-update-restart-hint">🔄 请重启游戏以加载新版本</div>
					</div>
				</div>
			</div>

			<!-- 更新失败 -->
			<div class="gm-update-section gm-update-card" v-if="updateState.error">
				<div class="gm-update-status-error">
					<div class="gm-update-icon gm-update-icon-error">✗</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">更新失败</div>
						<div class="gm-update-status-desc">{{ updateState.error }}</div>
					</div>
				</div>
				<button class="gm-update-refresh-btn" @click="checkUpdate">
					<span>🔄</span> 重试
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { updateApi } from '../update/updateOnline.js';

export default {
	data() {
		return {
			currentVersion: '',
			currentSource: 'jsDelivr',
			forceFullUpdate: false,
			availableSources: ['jsDelivr', 'GitHub'],
			displayFileLimit: 20,
			checkLogs: [],
			updateLogs: [],
			updateState: {
				isChecking: false,
				isUpdating: false,
				isComplete: false,
				hasUpdate: false,
				checked: false,
				message: '',
				localVersion: '',
				remoteVersion: '',
				comparison: null,
				useRelease: false,
				remoteManifest: null,
				updateType: '',
				progressPercent: 0,
				currentFile: '',
				completeMessage: '',
				error: null
			}
		};
	},
	computed: {
		changedFiles() {
			if (!this.updateState.comparison) return [];
			return [
				...this.updateState.comparison.filesToDownload.map(f => f.path),
				...this.updateState.comparison.filesToDelete.map(f => f.path)
			];
		},
		displayFiles() {
			return this.changedFiles.slice(0, this.displayFileLimit);
		}
	},
	watch: {
		forceFullUpdate(val) {
			updateApi.setUpdateConfig('xjzh_updateAll', val);
		}
	},
	mounted() {
		this.loadConfig();
	},
	methods: {
		getTimeStr() {
			const now = new Date();
			const pad = n => String(n).padStart(2, '0');
			return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
		},
		addCheckLog(message) {
			this.checkLogs.push({ time: this.getTimeStr(), message });
			if (this.checkLogs.length > 10) this.checkLogs.shift();
		},
		addUpdateLog(message) {
			this.updateLogs.push({ time: this.getTimeStr(), message });
			if (this.updateLogs.length > 15) this.updateLogs.shift();
		},
		loadConfig() {
			try {
				this.currentVersion = updateApi.getCurrentVersion();
				const config = updateApi.getUpdateConfig();
				this.currentSource = config.source;
				this.forceFullUpdate = config.forceFullUpdate;
			} catch (e) {
				console.error('[UpdateTab] 加载配置失败:', e);
			}
		},
		onSourceChange() {
			updateApi.setUpdateConfig('xjzh_update_source', this.currentSource);
		},
		onForceFullToggle() {
			updateApi.setUpdateConfig('xjzh_updateAll', this.forceFullUpdate);
		},
		async checkUpdate() {
			this.updateState.isChecking = true;
			this.updateState.error = null;
			this.updateState.hasUpdate = false;
			this.updateState.isComplete = false;
			this.updateState.message = '';
			this.checkLogs = [];

			try {
				this.addCheckLog(`开始检查更新 (${this.currentSource}源)`);
				this.addCheckLog('正在连接远程服务器...');

				const result = await updateApi.checkForUpdate(
					{
						onStatus: (status) => {
							this.addCheckLog(status);
						}
					}
				);

				this.updateState.localVersion = result.localVersion;

				if (!result.hasUpdate) {
					this.addCheckLog('检查完成，当前版本已是最新');
					this.updateState.hasUpdate = false;
					this.updateState.message = result.message;
				} else {
					this.addCheckLog(`发现新版本 v${result.remoteVersion}`);
					this.updateState.hasUpdate = true;
					this.updateState.remoteVersion = result.remoteVersion;
					this.updateState.comparison = result.comparison;
					this.updateState.useRelease = result.useRelease;
					this.updateState.remoteManifest = result.remoteManifest;

					if (result.isHigher) {
						if (!confirm(`本地版本(${result.localVersion})比远程版本(${result.remoteVersion})更高，是否覆盖更新？`)) {
							this.updateState.hasUpdate = false;
							this.updateState.message = '已取消更新检查';
						}
					}
				}
			} catch (err) {
				this.addCheckLog(`检查失败: ${err.message || '未知错误'}`);
				this.updateState.error = err.message || '检查更新失败';
			} finally {
				this.updateState.isChecking = false;
				this.updateState.checked = true;
			}
		},
		async startUpdate(type) {
			this.updateState.isUpdating = true;
			this.updateState.isComplete = false;
			this.updateState.error = null;
			this.updateState.updateType = type;
			this.updateState.progressPercent = 0;
			this.updateState.currentFile = '准备中...';
			this.updateLogs = [];

			try {
				this.addUpdateLog(`开始${type === 'incremental' ? '增量' : '全量'}更新`);

				if (type === 'incremental') {
					await updateApi.performIncrementalUpdate(
						this.updateState.comparison,
						this.updateState.remoteManifest,
						{
							onProgress: (info) => {
								this.updateState.progressPercent = info.percent;
								this.updateState.currentFile = info.currentFile || '处理中...';
								if (info.error) {
									this.addUpdateLog(`⚠️ ${info.currentFile} 更新失败: ${info.error.message}`);
								}
							},
							onStatus: (status) => {
								this.addUpdateLog(status);
							},
							onComplete: (result) => {
								this.addUpdateLog('所有文件更新完成');
								this.updateState.isComplete = true;
								this.updateState.completeMessage = result.message;
								this.updateState.progressPercent = 100;
								this.updateState.currentFile = '更新完成！';
							},
							onError: (err) => {
								this.updateState.error = err.message || '增量更新失败';
							}
						}
					);
				} else {
					await updateApi.performFullUpdate(
						this.updateState.remoteVersion,
						this.updateState.remoteManifest,
						{
							onDownloadProgress: (info) => {
								this.updateState.progressPercent = info.progress;
								this.updateState.currentFile = `下载中: ${info.fileName}`;
							},
							onExtractProgress: (info) => {
								this.updateState.progressPercent = info.progress;
								this.updateState.currentFile = `解压 ${info.currentFile} (${info.completed}/${info.total})`;
							},
							onStatus: (status) => {
								this.addUpdateLog(status);
							},
							onComplete: (result) => {
								this.addUpdateLog('全量更新包解压完成');
								this.updateState.isComplete = true;
								this.updateState.completeMessage = result.message;
								this.updateState.progressPercent = 100;
								this.updateState.currentFile = '全量更新完成！';
							},
							onError: (err) => {
								this.updateState.error = err.message || '全量更新失败';
							}
						}
					);
				}
			} catch (err) {
				this.addUpdateLog(`更新失败: ${err.message || '未知错误'}`);
				this.updateState.error = err.message || '更新失败';
			} finally {
				this.updateState.isUpdating = false;
			}
		}
	}
};
</script>

<style scoped>
.gm-update-page {
	display: flex !important;
	flex-direction: column !important;
	padding: 16px !important;
	gap: 16px !important;
	min-height: 100% !important;
}

.gm-update-main {
	display: flex !important;
	flex-direction: column !important;
	gap: 16px !important;
	padding: 0 4px !important;
}

.gm-update-section {
	border-radius: 12px !important;
	padding: 20px 24px !important;
	border: 1px solid var(--border-muted, rgba(255,255,255,0.1)) !important;
	backdrop-filter: blur(10px) !important;
}

.gm-update-card {
	background: rgba(30, 41, 59, 0.7) !important;
}

.gm-update-section-title {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	font-size: 15px !important;
	font-weight: 600 !important;
	color: #e2e8f0 !important;
	margin-bottom: 16px !important;
	padding-bottom: 12px !important;
	border-bottom: 1px solid var(--border-muted, rgba(255,255,255,0.08)) !important;
}

.gm-update-title-icon {
	font-size: 18px !important;
}

/* 版本信息网格 */
.gm-update-version-grid {
	display: grid !important;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
	gap: 16px 24px !important;
}

.gm-update-version-item {
	display: flex !important;
	flex-direction: column !important;
	gap: 6px !important;
}

.gm-update-item-label {
	font-size: 12px !important;
	color: var(--text-muted, rgba(255,255,255,0.5)) !important;
	text-transform: uppercase !important;
	letter-spacing: 0.5px !important;
}

.gm-update-item-value {
	font-size: 16px !important;
	font-weight: 600 !important;
	color: #f1f5f9 !important;
}

.gm-update-item-toggle {
	flex-direction: row !important;
	align-items: center !important;
	justify-content: space-between !important;
}

.gm-update-select {
	padding: 8px 14px !important;
	border-radius: 8px !important;
	border: 1px solid var(--border, rgba(255,255,255,0.15)) !important;
	background: rgba(255,255,255,0.05) !important;
	color: #f1f5f9 !important;
	font-size: 14px !important;
	cursor: pointer !important;
	outline: none !important;
	transition: border-color 0.2s !important;
}

.gm-update-select:hover {
	border-color: var(--theme-dark, #3b82f6) !important;
}

.gm-update-select option {
	background: #1e293b !important;
	color: #f1f5f9 !important;
}

.gm-update-checkbox {
	width: 20px !important;
	height: 20px !important;
	cursor: pointer !important;
	accent-color: var(--theme-dark, #3b82f6) !important;
	border-radius: 4px !important;
}

/* 检查按钮 */
.gm-update-check-area {
	display: flex !important;
	justify-content: center !important;
	padding: 8px 0 !important;
}

.gm-update-check-btn {
	display: flex !important;
	align-items: center !important;
	gap: 10px !important;
	padding: 14px 48px !important;
	background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
	color: white !important;
	border: none !important;
	border-radius: 12px !important;
	font-size: 16px !important;
	font-weight: 600 !important;
	cursor: pointer !important;
	transition: all 0.25s ease !important;
	box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3) !important;
}

.gm-update-check-btn:hover {
	transform: translateY(-2px) !important;
	box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
}

.gm-update-check-btn:active {
	transform: translateY(0) !important;
}

.gm-update-check-btn:disabled {
	opacity: 0.6 !important;
	cursor: not-allowed !important;
	transform: none !important;
}

.gm-update-btn-icon {
	font-size: 18px !important;
}

/* 检查状态 */
.gm-update-status-box {
	display: flex !important;
	align-items: flex-start !important;
	gap: 16px !important;
}

.gm-update-spinner {
	width: 32px !important;
	height: 32px !important;
	border: 3px solid var(--border, rgba(255,255,255,0.1)) !important;
	border-top-color: var(--theme-dark, #3b82f6) !important;
	border-radius: 50% !important;
	animation: gmUpdateSpin 0.8s linear infinite !important;
	flex-shrink: 0 !important;
}

@keyframes gmUpdateSpin {
	to { transform: rotate(360deg); }
}

.gm-update-status-text {
	flex: 1 !important;
	min-width: 0 !important;
}

.gm-update-status-title {
	font-size: 15px !important;
	font-weight: 600 !important;
	color: #f1f5f9 !important;
	margin-bottom: 10px !important;
}

.gm-update-status-log {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
	max-height: 150px !important;
	overflow-y: auto !important;
}

.gm-update-log-item {
	display: flex !important;
	align-items: flex-start !important;
	gap: 8px !important;
	font-size: 13px !important;
	line-height: 1.5 !important;
	color: var(--text-muted, rgba(255,255,255,0.4)) !important;
	transition: color 0.2s !important;
}

.gm-update-log-item.active {
	color: #94a3b8 !important;
}

.gm-update-log-time {
	font-family: monospace !important;
	font-size: 11px !important;
	color: var(--text-muted, rgba(255,255,255,0.3)) !important;
	flex-shrink: 0 !important;
	min-width: 60px !important;
}

.gm-update-log-msg {
	word-break: break-all !important;
}

/* 成功状态 */
.gm-update-status-success {
	display: flex !important;
	align-items: center !important;
	gap: 16px !important;
	padding: 8px 0 !important;
}

.gm-update-status-error {
	display: flex !important;
	align-items: center !important;
	gap: 16px !important;
	padding: 8px 0 !important;
}

.gm-update-status-text-center {
	display: flex !important;
	flex-direction: column !important;
	gap: 6px !important;
}

.gm-update-status-desc {
	font-size: 13px !important;
	color: var(--text-muted, rgba(255,255,255,0.5)) !important;
}

.gm-update-icon {
	width: 52px !important;
	height: 52px !important;
	border-radius: 50% !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	font-size: 26px !important;
	font-weight: bold !important;
	flex-shrink: 0 !important;
}

.gm-update-icon-success {
	background: linear-gradient(135deg, #22c55e, #16a34a) !important;
	color: white !important;
	box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3) !important;
}

.gm-update-icon-error {
	background: linear-gradient(135deg, #ef4444, #dc2626) !important;
	color: white !important;
	box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3) !important;
}

.gm-update-restart-hint {
	font-size: 13px !important;
	color: #fbbf24 !important;
	margin-top: 4px !important;
}

.gm-update-refresh-btn {
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	gap: 8px !important;
	margin-top: 16px !important;
	padding: 10px 24px !important;
	background: transparent !important;
	border: 1px solid var(--border, rgba(255,255,255,0.15)) !important;
	color: #94a3b8 !important;
	border-radius: 8px !important;
	font-size: 14px !important;
	cursor: pointer !important;
	transition: all 0.2s !important;
}

.gm-update-refresh-btn:hover {
	background: rgba(255,255,255,0.05) !important;
	border-color: var(--theme-dark, #3b82f6) !important;
	color: #f1f5f9 !important;
}

/* 新版本信息 */
.gm-update-available-header {
	margin-bottom: 16px !important;
}

.gm-update-version-compare {
	display: flex !important;
	align-items: center !important;
	gap: 12px !important;
	padding: 14px 18px !important;
	background: rgba(59, 130, 246, 0.1) !important;
	border-radius: 10px !important;
	border: 1px solid rgba(59, 130, 246, 0.2) !important;
}

.gm-update-new-badge {
	background: linear-gradient(135deg, #ef4444, #dc2626) !important;
	color: white !important;
	padding: 4px 12px !important;
	border-radius: 12px !important;
	font-size: 12px !important;
	font-weight: 600 !important;
	white-space: nowrap !important;
}

.gm-update-version-num {
	font-size: 22px !important;
	font-weight: 700 !important;
	color: #60a5fa !important;
}

.gm-update-arrow {
	color: var(--text-muted, rgba(255,255,255,0.4)) !important;
	font-size: 18px !important;
}

.gm-update-current {
	font-size: 15px !important;
	color: var(--text-muted, rgba(255,255,255,0.5)) !important;
}

/* 变更统计 */
.gm-update-stats {
	display: grid !important;
	grid-template-columns: repeat(3, 1fr) !important;
	gap: 12px !important;
	margin: 16px 0 !important;
}

.gm-update-stat {
	display: flex !important;
	flex-direction: column !important;
	align-items: center !important;
	justify-content: center !important;
	padding: 16px 12px !important;
	border-radius: 10px !important;
	gap: 4px !important;
}

.gm-update-stat-new {
	background: rgba(34, 197, 94, 0.1) !important;
	border: 1px solid rgba(34, 197, 94, 0.2) !important;
}

.gm-update-stat-changed {
	background: rgba(234, 179, 8, 0.1) !important;
	border: 1px solid rgba(234, 179, 8, 0.2) !important;
}

.gm-update-stat-deleted {
	background: rgba(239, 68, 68, 0.1) !important;
	border: 1px solid rgba(239, 68, 68, 0.2) !important;
}

.gm-update-stat-icon {
	font-size: 16px !important;
	font-weight: 700 !important;
}

.gm-update-stat-new .gm-update-stat-icon { color: #22c55e !important; }
.gm-update-stat-changed .gm-update-stat-icon { color: #eab308 !important; }
.gm-update-stat-deleted .gm-update-stat-icon { color: #ef4444 !important; }

.gm-update-stat-num {
	font-size: 28px !important;
	font-weight: 700 !important;
	color: #f1f5f9 !important;
	line-height: 1 !important;
}

.gm-update-stat-label {
	font-size: 12px !important;
	color: var(--text-muted, rgba(255,255,255,0.5)) !important;
	text-transform: uppercase !important;
	letter-spacing: 0.5px !important;
}

/* 文件列表 */
.gm-update-files-list {
	background: rgba(0,0,0,0.2) !important;
	border-radius: 10px !important;
	padding: 14px 16px !important;
	margin: 16px 0 !important;
}

.gm-update-files-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
	margin-bottom: 10px !important;
	font-size: 13px !important;
	font-weight: 600 !important;
	color: #e2e8f0 !important;
}

.gm-update-files-count {
	background: rgba(59, 130, 246, 0.2) !important;
	color: #60a5fa !important;
	padding: 2px 10px !important;
	border-radius: 10px !important;
	font-size: 12px !important;
}

.gm-update-files-content {
	max-height: 150px !important;
	overflow-y: auto !important;
	display: flex !important;
	flex-direction: column !important;
	gap: 2px !important;
}

.gm-update-file-item {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	padding: 6px 10px !important;
	font-size: 12px !important;
	color: var(--text-muted, rgba(255,255,255,0.5)) !important;
	border-radius: 6px !important;
	transition: background 0.15s !important;
}

.gm-update-file-item:hover {
	background: rgba(255,255,255,0.03) !important;
}

.gm-update-file-icon {
	font-size: 14px !important;
	flex-shrink: 0 !important;
}

.gm-update-file-path {
	word-break: break-all !important;
	font-family: 'Consolas', 'Monaco', monospace !important;
	font-size: 11px !important;
}

.gm-update-file-more {
	padding: 6px 10px !important;
	font-size: 12px !important;
	color: var(--text-muted, rgba(255,255,255,0.3)) !important;
	font-style: italic !important;
}

/* 推荐提示 */
.gm-update-recommend {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	background: rgba(234, 179, 8, 0.1) !important;
	color: #fbbf24 !important;
	padding: 12px 16px !important;
	border-radius: 8px !important;
	font-size: 13px !important;
	font-weight: 500 !important;
	margin: 16px 0 !important;
	border: 1px solid rgba(234, 179, 8, 0.2) !important;
}

.gm-update-recommend-icon {
	font-size: 16px !important;
}

/* 更新按钮 */
.gm-update-actions {
	display: grid !important;
	grid-template-columns: 1fr 1fr !important;
	gap: 12px !important;
	margin-top: 8px !important;
}

.gm-update-btn {
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	gap: 8px !important;
	padding: 14px 20px !important;
	border: none !important;
	border-radius: 10px !important;
	font-size: 14px !important;
	font-weight: 600 !important;
	cursor: pointer !important;
	transition: all 0.25s ease !important;
}

.gm-update-btn-incremental {
	background: linear-gradient(135deg, #22c55e, #16a34a) !important;
	color: white !important;
	box-shadow: 0 4px 15px rgba(34, 197, 94, 0.25) !important;
}

.gm-update-btn-incremental:hover {
	transform: translateY(-2px) !important;
	box-shadow: 0 6px 20px rgba(34, 197, 94, 0.35) !important;
}

.gm-update-btn-full {
	background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
	color: white !important;
	box-shadow: 0 4px 15px rgba(59, 130, 246, 0.25) !important;
}

.gm-update-btn-full:hover {
	transform: translateY(-2px) !important;
	box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35) !important;
}

/* 进度条 */
.gm-update-progress-container {
	display: flex !important;
	flex-direction: column !important;
	gap: 14px !important;
}

.gm-update-progress-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
}

.gm-update-progress-title {
	font-size: 15px !important;
	font-weight: 600 !important;
	color: #f1f5f9 !important;
}

.gm-update-progress-percent {
	font-size: 24px !important;
	font-weight: 700 !important;
	background: linear-gradient(135deg, #60a5fa, #22c55e) !important;
	-webkit-background-clip: text !important;
	-webkit-text-fill-color: transparent !important;
	background-clip: text !important;
}

.gm-update-progress-bar {
	width: 100% !important;
	height: 14px !important;
	background: rgba(0,0,0,0.3) !important;
	border-radius: 7px !important;
	overflow: hidden !important;
}

.gm-update-progress-fill {
	height: 100% !important;
	background: linear-gradient(90deg, #3b82f6, #22c55e) !important;
	border-radius: 7px !important;
	transition: width 0.3s ease !important;
	box-shadow: 0 0 10px rgba(59, 130, 246, 0.5) !important;
}

.gm-update-progress-file {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
	padding: 12px 14px !important;
	background: rgba(0,0,0,0.2) !important;
	border-radius: 8px !important;
	font-size: 13px !important;
}

.gm-update-progress-label {
	color: var(--text-muted, rgba(255,255,255,0.4)) !important;
	font-size: 11px !important;
	text-transform: uppercase !important;
	letter-spacing: 0.5px !important;
}

.gm-update-progress-value {
	color: #94a3b8 !important;
	word-break: break-all !important;
	font-family: 'Consolas', 'Monaco', monospace !important;
}

.gm-update-progress-log {
	display: flex !important;
	flex-direction: column !important;
	gap: 3px !important;
	padding: 12px 14px !important;
	background: rgba(0,0,0,0.2) !important;
	border-radius: 8px !important;
	max-height: 120px !important;
	overflow-y: auto !important;
}
</style>
