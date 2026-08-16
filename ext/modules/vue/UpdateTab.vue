<template>
	<div class="gm-page gm-update-page">
		<div class="gm-update-main">
			<!-- 版本信息卡片 -->
			<div class="gm-update-section gm-update-card version-card">
				<div class="gm-update-card-header">
					<div class="gm-update-card-title">
						<span class="gm-update-title-icon">📦</span>
						版本信息
					</div>
					<div class="gm-update-card-subtitle">管理扩展版本与更新源配置</div>
				</div>
				<div class="gm-update-version-grid">
					<div class="gm-update-version-item">
						<div class="gm-update-item-label">当前版本</div>
						<div class="gm-update-item-value version-highlight">{{ currentVersion || '加载中...' }}</div>
					</div>
					<div class="gm-update-version-item">
						<div class="gm-update-item-label">更新源</div>
						<select class="gm-update-select" v-model="currentSource" @change="onSourceChange">
							<option v-for="source in availableSources" :key="source" :value="source">{{ source }}</option>
						</select>
					</div>
					<div class="gm-update-version-item toggle-container">
						<label class="gm-update-toggle-label">
							<div class="gm-update-toggle-text">
								<div class="gm-update-item-label" style="margin-bottom:4px;">强制全量更新</div>
								<div class="gm-update-item-desc">更新时始终使用 Release 全量包</div>
							</div>
							<div class="custom-checkbox-wrapper">
								<input type="checkbox" v-model="forceFullUpdate" @change="onForceFullToggle" class="gm-update-checkbox">
								<label class="checkbox-custom" :class="{ checked: forceFullUpdate }"></label>
							</div>
						</label>
					</div>
				</div>
			</div>

			<!-- 检查按钮 (空闲状态) -->
			<div class="gm-update-section gm-update-card action-card" v-if="!updateState.isChecking && !updateState.isUpdating && !updateState.hasUpdate && !updateState.isComplete && !updateState.error">
				<div class="gm-update-check-area">
					<button class="gm-update-check-btn" @click="checkUpdate">
						<span class="gm-update-btn-icon">🔍</span>
						<span class="btn-text">检查更新</span>
						<span class="btn-shine"></span>
					</button>
					<div class="gm-update-check-hint">点击按钮连接远程服务器，检查是否有新版本可用</div>
				</div>
			</div>

			<!-- 检查中状态 -->
			<div class="gm-update-section gm-update-card checking-card" v-if="updateState.isChecking">
				<div class="gm-update-status-box">
					<div class="gm-update-spinner-wrapper">
						<div class="gm-update-spinner"></div>
						<div class="spinner-ring"></div>
					</div>
					<div class="gm-update-status-text">
						<div class="gm-update-status-title">正在检查更新...</div>
						<div class="gm-update-status-subtitle">请稍候，正在与远程服务器通信</div>
						<div class="gm-update-status-log">
							<div v-for="(log, index) in checkLogs" :key="index" class="gm-update-log-item" :class="[log.type, { active: index === checkLogs.length - 1 }]">
								<span class="log-indicator" :class="log.type"></span>
								<span class="gm-update-log-time">{{ log.time }}</span>
								<span class="gm-update-log-msg">{{ log.msg }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 已是最新版本 -->
			<div class="gm-update-section gm-update-card success-card" v-if="!updateState.isChecking && !updateState.isUpdating && !updateState.hasUpdate && !updateState.isComplete && !updateState.error && updateState.checked">
				<div class="gm-update-status-success">
					<div class="gm-update-icon gm-update-icon-success">
						<span class="icon-inner">✓</span>
						<div class="icon-glow"></div>
					</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">{{ updateState.message }}</div>
						<div class="gm-update-status-desc">您的扩展已为最新版本，无需更新</div>
					</div>
				</div>
				<div class="gm-update-log-panel" v-if="checkLogs.length > 0">
					<div class="gm-update-log-panel-header">
						<span class="gm-update-log-panel-title">检查日志</span>
						<span class="log-count">{{ checkLogs.length }} 条</span>
					</div>
					<div class="gm-update-status-log">
						<div v-for="(log, index) in checkLogs" :key="'d'+index" class="gm-update-log-item" :class="log.type">
							<span class="log-indicator" :class="log.type"></span>
							<span class="gm-update-log-time">{{ log.time }}</span>
							<span class="gm-update-log-msg">{{ log.msg }}</span>
						</div>
					</div>
				</div>
				<button class="gm-update-refresh-btn" @click="checkUpdate">
					<span class="btn-icon">🔄</span>
					<span>重新检查</span>
				</button>
			</div>

			<!-- 更新信息 -->
			<div class="gm-update-section gm-update-card available-card" v-if="updateState.hasUpdate && !updateState.isUpdating">
				<div class="gm-update-available-header">
					<div class="gm-update-version-compare">
						<div class="version-info-group">
							<span class="gm-update-new-badge">新版本</span>
							<span class="gm-update-version-num">v{{ updateState.remoteVersion }}</span>
						</div>
						<div class="version-arrow-container">
							<span class="gm-update-arrow">→</span>
						</div>
						<div class="version-info-group current">
							<span class="version-label">当前版本</span>
							<span class="gm-update-current">v{{ updateState.localVersion }}</span>
						</div>
					</div>
				</div>

				<div class="gm-update-stats" v-if="updateState.comparison">
					<div class="gm-update-stat gm-update-stat-new">
						<div class="stat-icon-wrap">
							<span class="gm-update-stat-icon">+</span>
						</div>
						<div class="stat-info">
							<span class="gm-update-stat-num">{{ updateState.comparison.summary.newFiles }}</span>
							<span class="gm-update-stat-label">新增文件</span>
						</div>
					</div>
					<div class="gm-update-stat gm-update-stat-changed">
						<div class="stat-icon-wrap">
							<span class="gm-update-stat-icon">~</span>
						</div>
						<div class="stat-info">
							<span class="gm-update-stat-num">{{ updateState.comparison.summary.changedFiles }}</span>
							<span class="gm-update-stat-label">修改文件</span>
						</div>
					</div>
					<div class="gm-update-stat gm-update-stat-deleted">
						<div class="stat-icon-wrap">
							<span class="gm-update-stat-icon">-</span>
						</div>
						<div class="stat-info">
							<span class="gm-update-stat-num">{{ updateState.comparison.summary.deletedFiles }}</span>
							<span class="gm-update-stat-label">删除文件</span>
						</div>
					</div>
				</div>

				<div class="gm-update-files-list" v-if="changedFiles.length > 0">
					<div class="gm-update-files-header">
						<span class="header-title">变更文件列表</span>
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
					<span class="recommend-text">检测到大量文件变更，建议使用全量更新以确保完整性</span>
				</div>

				<div class="gm-update-actions">
					<button class="gm-update-btn gm-update-btn-incremental" @click="startUpdate('incremental')">
						<span class="gm-update-btn-icon">📥</span>
						<span class="btn-label">增量更新</span>
						<span class="btn-sublabel">仅下载变更文件</span>
					</button>
					<button class="gm-update-btn gm-update-btn-full" @click="startUpdate('full')">
						<span class="gm-update-btn-icon">📦</span>
						<span class="btn-label">全量更新</span>
						<span class="btn-sublabel">下载完整版本包</span>
					</button>
				</div>
			</div>

			<!-- 更新进度 -->
			<div class="gm-update-section gm-update-card progress-card" v-if="updateState.isUpdating">
				<div class="gm-update-progress-container">
					<div class="gm-update-progress-header">
						<div class="gm-update-progress-title">
							{{ updateState.updateType === 'incremental' ? '📥 增量更新中' : '📦 全量更新中' }}
						</div>
						<div class="gm-update-progress-percent">{{ updateState.progressPercent }}%</div>
					</div>
					<div class="gm-update-progress-bar">
						<div class="gm-update-progress-fill" :style="{ width: updateState.progressPercent + '%' }">
							<div class="progress-shine"></div>
						</div>
					</div>
					<div class="gm-update-progress-file">
						<span class="gm-update-progress-label">当前进度</span>
						<span class="gm-update-progress-value">{{ updateState.currentFile || '准备中...' }}</span>
					</div>
					<div class="gm-update-progress-log">
						<div v-for="(log, index) in updateLogs" :key="'u'+index" class="gm-update-log-item" :class="[log.type, { active: index === updateLogs.length - 1 }]">
							<span class="log-indicator" :class="log.type"></span>
							<span class="gm-update-log-time">{{ log.time }}</span>
							<span class="gm-update-log-msg">{{ log.msg }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 更新完成 -->
			<div class="gm-update-section gm-update-card complete-card" v-if="updateState.isComplete">
				<div class="gm-update-status-success">
					<div class="gm-update-icon gm-update-icon-success large">
						<span class="icon-inner">✓</span>
						<div class="icon-glow"></div>
					</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">更新完成</div>
						<div class="gm-update-status-desc">{{ updateState.completeMessage }}</div>
						<div class="gm-update-restart-hint">
							<span class="restart-icon">🔄</span>
							<span>请重启游戏以加载新版本</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 更新失败 -->
			<div class="gm-update-section gm-update-card error-card" v-if="updateState.error && !updateState.isUpdating && !updateState.isChecking">
				<div class="gm-update-status-error">
					<div class="gm-update-icon gm-update-icon-error">
						<span class="icon-inner">✗</span>
						<div class="icon-glow"></div>
					</div>
					<div class="gm-update-status-text-center">
						<div class="gm-update-status-title">操作失败</div>
						<div class="gm-update-status-desc">{{ updateState.error }}</div>
					</div>
				</div>
				<button class="gm-update-refresh-btn retry" @click="checkUpdate">
					<span class="btn-icon">🔄</span>
					<span>重试</span>
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
	async mounted() {
		await this.loadConfig();
	},
	methods: {
		getTimeStr() {
			const now = new Date();
			const pad = n => String(n).padStart(2, '0');
			return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
		},
		addCheckLog(msg, type = 'info') {
			this.checkLogs.push({ time: this.getTimeStr(), msg, type });
			if (this.checkLogs.length > 30) this.checkLogs.shift();
		},
		addUpdateLog(msg, type = 'info') {
			this.updateLogs.push({ time: this.getTimeStr(), msg, type });
			if (this.updateLogs.length > 50) this.updateLogs.shift();
		},
		async loadConfig() {
			try {
				this.currentVersion = await updateApi.getCurrentVersionAsync();
				const config = updateApi.getUpdateConfig();
				this.currentSource = config.source;
				this.forceFullUpdate = config.forceFullUpdate;
			} catch (e) {
				console.error('[UpdateTab] 加载配置失败:', e);
				this.currentVersion = '0.0.0';
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
			this.updateState.checked = false;

			try {
				const result = await updateApi.checkForUpdate({
					onStatus: (status) => {
						this.addCheckLog(status, 'info');
					},
					onLog: (entry) => {
						this.checkLogs.push({ time: entry.time, msg: entry.msg, type: entry.type || 'info' });
						if (this.checkLogs.length > 30) this.checkLogs.shift();
					}
				});

				this.updateState.localVersion = result.localVersion;

				if (!result.hasUpdate) {
					this.updateState.hasUpdate = false;
					this.updateState.message = result.message;
				} else {
					this.updateState.hasUpdate = true;
					this.updateState.remoteVersion = result.remoteVersion;
					this.updateState.comparison = result.comparison;
					this.updateState.useRelease = result.useRelease;
					this.updateState.remoteManifest = result.remoteManifest;

					if (result.isHigher) {
						if (!confirm(`本地版本(v${result.localVersion})比远程版本(v${result.remoteVersion})更高，是否覆盖更新？`)) {
							this.updateState.hasUpdate = false;
							this.updateState.message = '已取消更新检查';
							this.addCheckLog('用户取消了更新', 'warning');
						}
					}
				}
			} catch (err) {
				this.addCheckLog(`检查失败: ${err.message || '未知错误'}`, 'error');
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
				if (type === 'incremental') {
					await updateApi.performIncrementalUpdate(
						this.updateState.comparison,
						this.updateState.remoteManifest,
						{
							onProgress: (info) => {
								this.updateState.progressPercent = info.percent;
								this.updateState.currentFile = info.currentFile || '处理中...';
							},
							onStatus: (status) => {
								this.updateState.currentFile = status;
							},
							onLog: (entry) => {
								this.updateLogs.push({ time: entry.time, msg: entry.msg, type: entry.type || 'info' });
								if (this.updateLogs.length > 50) this.updateLogs.shift();
							},
							onComplete: (result) => {
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
								this.updateState.currentFile = status;
							},
							onLog: (entry) => {
								this.updateLogs.push({ time: entry.time, msg: entry.msg, type: entry.type || 'info' });
								if (this.updateLogs.length > 50) this.updateLogs.shift();
							},
							onComplete: (result) => {
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
				this.addUpdateLog(`更新失败: ${err.message || '未知错误'}`, 'error');
				this.updateState.error = err.message || '更新失败';
			} finally {
				this.updateState.isUpdating = false;
			}
		}
	}
};
</script>

<style scoped>
/* ===== 基础布局 - 与存档管理界面一致的明亮主题 ===== */
.gm-update-page {
	display: flex !important;
	flex-direction: column !important;
	padding: 16px !important;
	gap: 16px !important;
	min-height: 100% !important;
	background: transparent !important;
}

.gm-update-main {
	display: flex !important;
	flex-direction: column !important;
	gap: 16px !important;
}

/* ===== 卡片基础样式 - 与存档管理界面风格一致 ===== */
.gm-update-section {
	border-radius: 10px !important;
	padding: 20px 24px !important;
	border: 1px solid var(--border-muted) !important;
	background: var(--bg-light) !important;
	box-shadow: 0 2px 4px rgba(0,0,0,0.08) !important;
	transition: all 0.25s ease !important;
}

.gm-update-section:hover {
	border-color: var(--border) !important;
	box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}

/* ===== 版本信息卡片 ===== */
.version-card {
	background: var(--bg) !important;
	border-color: var(--border) !important;
}

.gm-update-card-header {
	margin-bottom: 16px !important;
	padding-bottom: 12px !important;
	border-bottom: 1px solid var(--border-muted) !important;
}

.gm-update-card-title {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	font-size: 16px !important;
	font-weight: 600 !important;
	color: var(--theme-dark) !important;
}

.gm-update-card-subtitle {
	margin-top: 6px !important;
	font-size: 12px !important;
	color: var(--text-muted) !important;
}

.gm-update-title-icon {
	font-size: 20px !important;
}

/* ===== 版本信息网格 ===== */
.gm-update-version-grid {
	display: grid !important;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
	gap: 16px 24px !important;
}

.gm-update-version-item {
	display: flex !important;
	flex-direction: column !important;
	gap: 8px !important;
}

.gm-update-item-label {
	font-size: 11px !important;
	color: var(--text-muted) !important;
	text-transform: uppercase !important;
	letter-spacing: 0.5px !important;
	font-weight: 600 !important;
}

.gm-update-item-desc {
	font-size: 12px !important;
	color: var(--text-muted) !important;
	line-height: 1.4 !important;
}

.gm-update-item-value {
	font-size: 14px !important;
	font-weight: 600 !important;
	color: var(--text) !important;
}

.version-highlight {
	font-size: 18px !important;
	color: var(--theme-dark) !important;
}

/* ===== 选择框 ===== */
.gm-update-select {
	padding: 8px 14px !important;
	border-radius: 6px !important;
	border: 1px solid var(--border) !important;
	background: white !important;
	color: var(--text) !important;
	font-size: 14px !important;
	cursor: pointer !important;
	outline: none !important;
	transition: all 0.2s ease !important;
	font-weight: 500 !important;
}

.gm-update-select:hover {
	border-color: var(--theme-dark) !important;
}

.gm-update-select:focus {
	border-color: var(--theme-dark) !important;
	box-shadow: 0 0 0 2px rgba(67, 140, 214, 0.2) !important;
}

.gm-update-select option {
	background: white !important;
	color: var(--text) !important;
}

/* ===== 自定义复选框 ===== */
.toggle-container {
	min-width: 180px !important;
}

.gm-update-toggle-label {
	display: flex !important;
	align-items: center !important;
	justify-content: space-between !important;
	gap: 12px !important;
	cursor: pointer !important;
	width: 100% !important;
	padding: 12px 16px !important;
	border-radius: 6px !important;
	background: var(--bg-secondary) !important;
	transition: all 0.2s ease !important;
}

.gm-update-toggle-label:hover {
	background: var(--border-highlight) !important;
}

.gm-update-toggle-text {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
}

.custom-checkbox-wrapper {
	position: relative !important;
	width: 44px !important;
	height: 24px !important;
	flex-shrink: 0 !important;
}

.gm-update-checkbox {
	position: absolute !important;
	opacity: 0 !important;
	width: 100% !important;
	height: 100% !important;
	cursor: pointer !important;
	z-index: 1 !important;
}

.checkbox-custom {
	position: absolute !important;
	top: 0 !important;
	left: 0 !important;
	right: 0 !important;
	bottom: 0 !important;
	background: var(--border-muted) !important;
	border-radius: 24px !important;
	transition: all 0.3s ease !important;
}

.checkbox-custom::before {
	content: '' !important;
	position: absolute !important;
	height: 18px !important;
	width: 18px !important;
	left: 3px !important;
	bottom: 3px !important;
	background: white !important;
	border-radius: 50% !important;
	transition: all 0.3s ease !important;
	box-shadow: 0 2px 4px rgba(0,0,0,0.15) !important;
}

.checkbox-custom.checked {
	background: var(--theme-dark) !important;
}

.checkbox-custom.checked::before {
	transform: translateX(20px) !important;
}

/* ===== 检查按钮 ===== */
.action-card {
	display: flex !important;
	justify-content: center !important;
}

.gm-update-check-area {
	display: flex !important;
	flex-direction: column !important;
	align-items: center !important;
	gap: 14px !important;
	padding: 20px 0 !important;
}

.gm-update-check-btn {
	position: relative !important;
	display: flex !important;
	align-items: center !important;
	gap: 10px !important;
	padding: 12px 32px !important;
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
	border-radius: 8px !important;
	font-size: 16px !important;
	font-weight: 600 !important;
	cursor: pointer !important;
	transition: all 0.25s ease !important;
	box-shadow: 0 2px 8px rgba(67, 140, 214, 0.3) !important;
}

.gm-update-check-btn:hover {
	background: #3366cc !important;
	transform: translateY(-1px) !important;
	box-shadow: 0 4px 16px rgba(67, 140, 214, 0.4) !important;
}

.gm-update-check-btn:active {
	transform: translateY(0) !important;
}

.gm-update-btn-icon {
	font-size: 18px !important;
}

.gm-update-check-hint {
	font-size: 13px !important;
	color: var(--text-muted) !important;
	text-align: center !important;
	max-width: 400px !important;
}

/* ===== 检查中状态 ===== */
.checking-card {
	background: var(--bg) !important;
	border-color: var(--theme) !important;
}

.gm-update-status-box {
	display: flex !important;
	align-items: flex-start !important;
	gap: 16px !important;
}

.gm-update-spinner-wrapper {
	position: relative !important;
	width: 40px !important;
	height: 40px !important;
	flex-shrink: 0 !important;
}

.gm-update-spinner {
	position: absolute !important;
	top: 0 !important;
	left: 0 !important;
	width: 40px !important;
	height: 40px !important;
	border: 3px solid var(--border-highlight) !important;
	border-top-color: var(--theme-dark) !important;
	border-radius: 50% !important;
	animation: gmUpdateSpin 0.8s linear infinite !important;
}

.spinner-ring {
	display: none !important;
}

@keyframes gmUpdateSpin {
	to { transform: rotate(360deg); }
}

@keyframes pulseRing {
	0%, 100% { transform: scale(1); opacity: 0.5; }
	50% { transform: scale(1.2); opacity: 1; }
}

.gm-update-status-text {
	flex: 1 !important;
	min-width: 0 !important;
}

.gm-update-status-title {
	font-size: 15px !important;
	font-weight: 600 !important;
	color: var(--text) !important;
	margin-bottom: 6px !important;
}

.gm-update-status-subtitle {
	font-size: 13px !important;
	color: var(--text-muted) !important;
	margin-bottom: 12px !important;
}

/* ===== 日志系统 ===== */
.gm-update-status-log {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
	max-height: 200px !important;
	overflow-y: auto !important;
	font-family: 'Consolas', 'Monaco', 'Courier New', monospace !important;
	padding: 12px !important;
	background: var(--bg-secondary) !important;
	border-radius: 6px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-update-log-item {
	display: flex !important;
	align-items: flex-start !important;
	gap: 8px !important;
	font-size: 12px !important;
	line-height: 1.6 !important;
	color: var(--text-muted) !important;
	transition: all 0.2s !important;
	padding: 3px 6px !important;
	border-radius: 4px !important;
}

.gm-update-log-item.active {
	color: var(--text) !important;
	background: rgba(67, 140, 214, 0.1) !important;
}

.gm-update-log-item.success {
	color: var(--success) !important;
}

.gm-update-log-item.warning {
	color: hsl(38, 92%, 50%) !important;
}

.gm-update-log-item.error {
	color: var(--danger) !important;
}

.log-indicator {
	width: 6px !important;
	height: 6px !important;
	border-radius: 50% !important;
	flex-shrink: 0 !important;
	margin-top: 8px !important;
	background: var(--border-muted) !important;
	transition: all 0.2s !important;
}

.log-indicator.success {
	background: var(--success) !important;
}

.log-indicator.warning {
	background: hsl(38, 92%, 50%) !important;
}

.log-indicator.error {
	background: var(--danger) !important;
}

.gm-update-log-time {
	font-family: 'Consolas', 'Monaco', monospace !important;
	font-size: 11px !important;
	color: var(--border) !important;
	flex-shrink: 0 !important;
	min-width: 64px !important;
}

.gm-update-log-msg {
	word-break: break-all !important;
	flex: 1 !important;
}

/* ===== 日志面板 ===== */
.gm-update-log-panel {
	margin-top: 16px !important;
	padding: 14px 16px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-update-log-panel-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
	margin-bottom: 10px !important;
}

.gm-update-log-panel-title {
	font-size: 13px !important;
	font-weight: 600 !important;
	color: var(--text) !important;
}

.log-count {
	font-size: 11px !important;
	color: var(--text-muted) !important;
	background: var(--bg) !important;
	padding: 2px 10px !important;
	border-radius: 10px !important;
}

/* ===== 成功/错误状态 ===== */
.gm-update-status-success,
.gm-update-status-error {
	display: flex !important;
	align-items: center !important;
	gap: 16px !important;
	padding: 8px 0 !important;
}

.gm-update-status-text-center {
	display: flex !important;
	flex-direction: column !important;
	gap: 8px !important;
}

.gm-update-status-desc {
	font-size: 13px !important;
	color: var(--text-muted) !important;
	line-height: 1.5 !important;
}

.gm-update-icon {
	position: relative !important;
	width: 52px !important;
	height: 52px !important;
	border-radius: 50% !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	flex-shrink: 0 !important;
}

.gm-update-icon.large {
	width: 64px !important;
	height: 64px !important;
}

.gm-update-icon-success {
	background: var(--success) !important;
	box-shadow: 0 4px 16px rgba(56, 97, 71, 0.3) !important;
}

.gm-update-icon-error {
	background: var(--danger) !important;
	box-shadow: 0 4px 16px rgba(107, 32, 24, 0.3) !important;
}

.icon-inner {
	font-size: 26px !important;
	font-weight: bold !important;
	color: white !important;
}

.gm-update-icon.large .icon-inner {
	font-size: 32px !important;
}

.icon-glow {
	display: none !important;
}

.gm-update-restart-hint {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	font-size: 14px !important;
	color: var(--text-muted) !important;
	margin-top: 4px !important;
	padding: 10px 14px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	border: 1px solid var(--border-muted) !important;
}

.restart-icon {
	font-size: 16px !important;
}

/* ===== 刷新按钮 ===== */
.gm-update-refresh-btn {
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	gap: 8px !important;
	margin-top: 16px !important;
	padding: 10px 24px !important;
	background: var(--bg) !important;
	border: 1px solid var(--border) !important;
	color: var(--theme-dark) !important;
	border-radius: 6px !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	cursor: pointer !important;
	transition: all 0.25s ease !important;
}

.gm-update-refresh-btn:hover {
	background: var(--theme-dark) !important;
	border-color: var(--theme-dark) !important;
	color: white !important;
	transform: translateY(-1px) !important;
}

.gm-update-refresh-btn.retry:hover {
	background: var(--danger) !important;
	border-color: var(--danger) !important;
}

.btn-icon {
	font-size: 14px !important;
}

/* ===== 新版本信息 ===== */
.available-card {
	background: var(--bg) !important;
	border-color: var(--danger) !important;
}

.gm-update-available-header {
	margin-bottom: 16px !important;
}

.gm-update-version-compare {
	display: flex !important;
	align-items: center !important;
	gap: 16px !important;
	padding: 14px 18px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	border: 1px solid var(--border-muted) !important;
}

.version-info-group {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
}

.gm-update-new-badge {
	align-self: flex-start !important;
	background: var(--danger) !important;
	color: white !important;
	padding: 4px 12px !important;
	border-radius: 12px !important;
	font-size: 12px !important;
	font-weight: 600 !important;
	white-space: nowrap !important;
}

.gm-update-version-num {
	font-size: 24px !important;
	font-weight: 700 !important;
	color: var(--danger) !important;
}

.version-arrow-container {
	display: flex !important;
	align-items: center !important;
	padding: 0 4px !important;
}

.gm-update-arrow {
	font-size: 20px !important;
	color: var(--border) !important;
	font-weight: 300 !important;
}

.version-info-group.current .version-label {
	font-size: 11px !important;
	color: var(--text-muted) !important;
}

.gm-update-current {
	font-size: 16px !important;
	color: var(--text) !important;
	font-weight: 600 !important;
}

/* ===== 变更统计 ===== */
.gm-update-stats {
	display: grid !important;
	grid-template-columns: repeat(3, 1fr) !important;
	gap: 12px !important;
	margin: 16px 0 !important;
}

.gm-update-stat {
	display: flex !important;
	align-items: center !important;
	gap: 10px !important;
	padding: 14px !important;
	border-radius: 8px !important;
	transition: all 0.2s ease !important;
}

.gm-update-stat:hover {
	transform: translateY(-1px) !important;
}

.gm-update-stat-new {
	background: rgba(72, 187, 120, 0.15) !important;
	border: 1px solid rgba(72, 187, 120, 0.3) !important;
}

.gm-update-stat-changed {
	background: rgba(67, 140, 214, 0.15) !important;
	border: 1px solid rgba(67, 140, 214, 0.3) !important;
}

.gm-update-stat-deleted {
	background: rgba(229, 62, 62, 0.15) !important;
	border: 1px solid rgba(229, 62, 62, 0.3) !important;
}

.stat-icon-wrap {
	width: 36px !important;
	height: 36px !important;
	border-radius: 8px !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	flex-shrink: 0 !important;
}

.gm-update-stat-new .stat-icon-wrap {
	background: rgba(72, 187, 120, 0.2) !important;
}

.gm-update-stat-changed .stat-icon-wrap {
	background: rgba(67, 140, 214, 0.2) !important;
}

.gm-update-stat-deleted .stat-icon-wrap {
	background: rgba(229, 62, 62, 0.2) !important;
}

.gm-update-stat-icon {
	font-size: 16px !important;
	font-weight: 700 !important;
}

.gm-update-stat-new .gm-update-stat-icon { color: #48bb78 !important; }
.gm-update-stat-changed .gm-update-stat-icon { color: var(--theme-dark) !important; }
.gm-update-stat-deleted .gm-update-stat-icon { color: var(--danger) !important; }

.stat-info {
	display: flex !important;
	flex-direction: column !important;
	gap: 2px !important;
}

.gm-update-stat-num {
	font-size: 20px !important;
	font-weight: 700 !important;
	color: var(--text) !important;
	line-height: 1 !important;
}

.gm-update-stat-label {
	font-size: 11px !important;
	color: var(--text-muted) !important;
}

/* ===== 文件列表 ===== */
.gm-update-files-list {
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	padding: 14px 16px !important;
	margin: 16px 0 !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-update-files-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
	margin-bottom: 10px !important;
}

.header-title {
	font-size: 14px !important;
	font-weight: 600 !important;
	color: var(--text) !important;
}

.gm-update-files-count {
	background: var(--bg) !important;
	color: var(--theme-dark) !important;
	padding: 2px 12px !important;
	border-radius: 10px !important;
	font-size: 12px !important;
	font-weight: 600 !important;
}

.gm-update-files-content {
	max-height: 160px !important;
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
	color: var(--text-muted) !important;
	border-radius: 6px !important;
	transition: all 0.2s !important;
	font-family: 'Consolas', 'Monaco', monospace !important;
}

.gm-update-file-item:hover {
	background: var(--bg) !important;
	color: var(--text) !important;
}

.gm-update-file-icon {
	font-size: 14px !important;
	flex-shrink: 0 !important;
}

.gm-update-file-path {
	word-break: break-all !important;
}

.gm-update-file-more {
	padding: 6px 10px !important;
	font-size: 12px !important;
	color: var(--border) !important;
	font-style: italic !important;
}

/* ===== 推荐提示 ===== */
.gm-update-recommend {
	display: flex !important;
	align-items: center !important;
	gap: 10px !important;
	background: var(--bg-secondary) !important;
	color: var(--text-muted) !important;
	padding: 12px 16px !important;
	border-radius: 8px !important;
	font-size: 13px !important;
	font-weight: 500 !important;
	margin: 16px 0 !important;
	border: 1px solid var(--border) !important;
}

.gm-update-recommend-icon {
	font-size: 16px !important;
	flex-shrink: 0 !important;
}

.recommend-text {
	line-height: 1.5 !important;
}

/* ===== 更新操作按钮 ===== */
.gm-update-actions {
	display: grid !important;
	grid-template-columns: 1fr 1fr !important;
	gap: 12px !important;
	margin-top: 12px !important;
}

.gm-update-btn {
	display: flex !important;
	flex-direction: column !important;
	align-items: center !important;
	gap: 4px !important;
	padding: 14px 20px !important;
	border: none !important;
	border-radius: 8px !important;
	cursor: pointer !important;
	transition: all 0.25s ease !important;
}

.gm-update-btn:hover {
	transform: translateY(-1px) !important;
}

.gm-update-btn-incremental {
	background: var(--success) !important;
	color: white !important;
}

.gm-update-btn-incremental:hover {
	background: #38a169 !important;
}

.gm-update-btn-full {
	background: var(--theme-dark) !important;
	color: white !important;
}

.gm-update-btn-full:hover {
	background: #3366cc !important;
}

.gm-update-btn-icon {
	font-size: 18px !important;
}

.btn-label {
	font-size: 14px !important;
	font-weight: 600 !important;
}

.btn-sublabel {
	font-size: 11px !important;
	opacity: 0.85 !important;
}

/* ===== 进度卡片 ===== */
.progress-card {
	background: var(--bg) !important;
	border-color: var(--theme) !important;
}

.gm-update-progress-container {
	display: flex !important;
	flex-direction: column !important;
	gap: 16px !important;
}

.gm-update-progress-header {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
}

.gm-update-progress-title {
	font-size: 15px !important;
	font-weight: 600 !important;
	color: var(--text) !important;
}

.gm-update-progress-percent {
	font-size: 28px !important;
	font-weight: 700 !important;
	color: var(--theme-dark) !important;
}

.gm-update-progress-bar {
	width: 100% !important;
	height: 14px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	overflow: hidden !important;
	position: relative !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-update-progress-fill {
	height: 100% !important;
	background: var(--theme-dark) !important;
	border-radius: 8px !important;
	transition: width 0.3s ease !important;
}

.progress-shine {
	display: none !important;
}

.gm-update-progress-file {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
	padding: 12px 14px !important;
	background: var(--bg-secondary) !important;
	border-radius: 6px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-update-progress-label {
	font-size: 11px !important;
	color: var(--text-muted) !important;
	font-weight: 600 !important;
}

.gm-update-progress-value {
	color: var(--text) !important;
	word-break: break-all !important;
	font-family: 'Consolas', 'Monaco', monospace !important;
	font-size: 13px !important;
}

.gm-update-progress-log {
	display: flex !important;
	flex-direction: column !important;
	gap: 4px !important;
	padding: 12px 14px !important;
	background: var(--bg-secondary) !important;
	border-radius: 6px !important;
	border: 1px solid var(--border-muted) !important;
	max-height: 180px !important;
	overflow-y: auto !important;
}

/* ===== 完成/错误卡片 ===== */
.complete-card {
	background: var(--bg) !important;
	border-color: var(--success) !important;
}

.error-card {
	background: var(--bg) !important;
	border-color: var(--danger) !important;
}

/* ===== 响应式设计 ===== */
@media (max-width: 768px) {
	.gm-update-page {
		padding: 12px !important;
		gap: 12px !important;
	}

	.gm-update-section {
		padding: 16px !important;
		border-radius: 8px !important;
	}

	.gm-update-version-grid {
		grid-template-columns: 1fr !important;
		gap: 14px !important;
	}

	.gm-update-stats {
		grid-template-columns: 1fr !important;
	}

	.gm-update-actions {
		grid-template-columns: 1fr !important;
	}

	.gm-update-check-btn {
		padding: 10px 28px !important;
		font-size: 15px !important;
	}

	.gm-update-version-compare {
		flex-wrap: wrap !important;
		gap: 12px !important;
	}

	.gm-update-icon {
		width: 48px !important;
		height: 48px !important;
	}

	.gm-update-icon.large {
		width: 56px !important;
		height: 56px !important;
	}
}

@media (max-width: 480px) {
	.gm-update-page {
		padding: 10px !important;
		gap: 10px !important;
	}

	.gm-update-section {
		padding: 14px !important;
	}

	.gm-update-check-btn {
		width: 100% !important;
		justify-content: center !important;
	}

	.gm-update-progress-percent {
		font-size: 22px !important;
	}
}

/* ===== 滚动条美化 ===== */
.gm-update-status-log::-webkit-scrollbar,
.gm-update-files-content::-webkit-scrollbar,
.gm-update-progress-log::-webkit-scrollbar {
	width: 6px !important;
}

.gm-update-status-log::-webkit-scrollbar-track,
.gm-update-files-content::-webkit-scrollbar-track,
.gm-update-progress-log::-webkit-scrollbar-track {
	background: var(--bg-secondary) !important;
	border-radius: 3px !important;
}

.gm-update-status-log::-webkit-scrollbar-thumb,
.gm-update-files-content::-webkit-scrollbar-thumb,
.gm-update-progress-log::-webkit-scrollbar-thumb {
	background: var(--border) !important;
	border-radius: 3px !important;
}

.gm-update-status-log::-webkit-scrollbar-thumb:hover,
.gm-update-files-content::-webkit-scrollbar-thumb:hover,
.gm-update-progress-log::-webkit-scrollbar-thumb:hover {
	background: var(--theme-dark) !important;
}
</style>
