<template>
	<div class="gm-back" v-if="isVisible" @click.self="closeWindow">
		<div class="gm-inner">
			<!-- 顶部导航 -->
			<div class="gm-header">
				<span class="gm-title">工具箱</span>
				<div class="gm-tabs">
					<button
						class="gm-tab"
						:class="{ active: activeTab === 'save' }"
						@click="switchTab('save')"
					>存档管理</button>
					<button
						class="gm-tab"
						:class="{ active: activeTab === 'gm' }"
						@click="switchTab('gm')"
					>GM 工具</button>
				</div>
				<div class="gm-close" @click="closeWindow">×</div>
			</div>

			<!-- 存档管理内容 -->
			<div class="gm-page" v-if="activeTab === 'save'">
				<div class="gm-column">
					<div class="gm-column-header">
						<span>存档管理</span>
					</div>
					<div class="gm-save-body">
						<!-- 奇术要件存档 -->
						<div class="gm-save-section">
							<div class="gm-save-section-title">奇术要件存档</div>
							<div class="gm-save-actions">
								<button class="gm-save-btn gm-save-btn-info" @click="viewQishuDetail">📋 详情</button>
								<button class="gm-save-btn gm-save-btn-success" @click="exportQishu">📤 导出</button>
								<button class="gm-save-btn gm-save-btn-primary" @click="importQishu">📥 导入</button>
								<button class="gm-save-btn gm-save-btn-danger" @click="clearQishu">🗑️ 清除</button>
							</div>
						</div>

						<!-- 死灵之书存档 -->
						<div class="gm-save-section">
							<div class="gm-save-section-title">死灵之书存档</div>
							<div class="gm-save-actions">
								<button class="gm-save-btn gm-save-btn-info" @click="viewDiabloDetail">📋 详情</button>
								<button class="gm-save-btn gm-save-btn-success" @click="exportDiablo">📤 导出</button>
								<button class="gm-save-btn gm-save-btn-primary" @click="importDiablo">📥 导入</button>
								<button class="gm-save-btn gm-save-btn-danger" @click="clearDiablo">🗑️ 清除</button>
							</div>
						</div>

						<!-- 元歌碎片存档 -->
						<div class="gm-save-section">
							<div class="gm-save-section-title">元歌武将碎片存档</div>
							<div class="gm-save-actions">
								<button class="gm-save-btn gm-save-btn-info" @click="viewYuangeDetail">📋 详情</button>
								<button class="gm-save-btn gm-save-btn-success" @click="exportYuange">📤 导出</button>
								<button class="gm-save-btn gm-save-btn-primary" @click="importYuange">📥 导入</button>
								<button class="gm-save-btn gm-save-btn-danger" @click="clearYuange">🗑️ 清除</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- GM 工具内容 -->
			<div class="gm-page" v-if="activeTab === 'gm'">
				<div class="gm-column" v-for="col in columns" :key="col.key">
					<div class="gm-column-header">
						<span>{{ col.label }}</span>
						<span class="gm-column-count">{{ col.options.length }}</span>
						<button
							class="gm-column-pwd-btn"
							v-if="col.key === 'material'"
							@click.stop="openPasswordDialog"
							:title="hasPassword ? '修改密码' : '设置密码'"
						>{{ hasPassword ? '🔐' : '🔑' }}</button>
					</div>
					<div class="gm-column-body">
						<div
							v-for="(def, index) in col.options"
							:key="index"
							class="gm-row"
						>
							<span class="gm-row-name">{{ def.label }}</span>
							<button class="gm-row-btn" @click="executeCheat(def)">执行</button>
						</div>
					</div>
				</div>
			</div>
		</div>

			<!-- 通用确认对话框（导出/清除） -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showConfirmSaveDialog" @click.self="showConfirmSaveDialog = false">
					<div class="gm-dialog" ref="confirmSaveDialog">
						<div class="gm-dialog-icon">{{ confirmSaveIcon }}</div>
						<div class="gm-dialog-title">{{ confirmSaveTitle }}</div>
						<div class="gm-dialog-message" v-html="confirmSaveMessage"></div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-cancel" @click="showConfirmSaveDialog = false">取消</button>
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="executeConfirmSave">确定</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 导入文件选择对话框 -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showImportFileDialog" @click.self="showImportFileDialog = false">
					<div class="gm-dialog" ref="importFileDialog">
							<div class="gm-dialog-icon">📂</div>
						<div class="gm-dialog-title">导入{{ importTargetName }}</div>
						<div class="gm-dialog-message">
							请选择存档文件（JSON 格式）
						</div>
						<div class="gm-dialog-file">
							<input type="file" ref="importFileInput" accept=".json" @change="handleImportFile" />
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-cancel" @click="showImportFileDialog = false">取消</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 用户名验证对话框（奇术要件导入） -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showUsernameDialog" @click.self="showUsernameDialog = false">
					<div class="gm-dialog" ref="usernameDialog">
						<div class="gm-dialog-icon">🔑</div>
						<div class="gm-dialog-title">验证用户名</div>
						<div class="gm-dialog-message">
							请输入存档对应的用户名以确认导入
						</div>
						<div class="gm-dialog-file">
							<input type="text" ref="usernameInput" v-model="inputUsername" placeholder="请输入用户名" @keyup.enter="confirmUsername" />
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-cancel" @click="showUsernameDialog = false">取消</button>
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="confirmUsername">确认</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 确认执行GM对话框 -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showConfirmDialog" @click.self="cancelExecute">
					<div class="gm-dialog" ref="confirmDialog">
						<div class="gm-dialog-icon">⚠️</div>
						<div class="gm-dialog-title">确认操作</div>
						<div class="gm-dialog-message">
							确定要执行 <strong>{{ pendingOption?.label }}</strong> 吗？
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-cancel" @click="cancelExecute">取消</button>
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="confirmExecute">确定</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 结果提示模态框 -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showResultDialog" @click.self="closeResult">
					<div class="gm-dialog gm-dialog-result" ref="resultDialog">
						<div class="gm-dialog-icon">{{ resultIcon }}</div>
						<div class="gm-dialog-title">{{ resultTitle }}</div>
						<div class="gm-dialog-message">
							<strong>{{ resultOptionLabel }}</strong><br />
							{{ resultMessage }}
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="closeResult">知道了</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 详情对话框（结构化展示） -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showDetailDialog" @click.self="showDetailDialog = false">
					<div class="gm-dialog gm-dialog-detail" ref="detailDialog">
						<div class="gm-dialog-title gm-detail-title">{{ detailTitle }}</div>
						<div class="gm-detail-content">
							<template v-if="detailGroups && detailGroups.length">
								<div class="gm-detail-group" v-for="(group, gi) in detailGroups" :key="gi">
									<div class="gm-detail-group-title">{{ group.title }}</div>
									<div class="gm-detail-group-body">
										<div class="gm-detail-row" v-for="(row, ri) in group.rows" :key="ri" style="display: flex !important; min-height: 28px !important;">
											<span class="gm-detail-row-label" style="color: var(--text-muted) !important; display: inline-block !important;">{{ row.label }}</span>
											<span class="gm-detail-row-value" :class="{ 'gm-detail-value-multiline': row.multiline }" style="color: var(--text) !important; display: inline-block !important;">{{ row.value }}</span>
										</div>
									</div>
								</div>
							</template>
							<div v-else class="gm-save-empty">暂无存档数据</div>
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="showDetailDialog = false">关闭</button>
						</div>
					</div>
				</div>
			</Transition>

			<!-- 密码输入对话框（GM工具切换验证） -->
			<Transition name="fade">
				<div class="gm-dialog-mask" v-if="showPasswordDialog" @click.self="cancelPasswordDialog">
					<div class="gm-dialog" ref="passwordDialog">
						<div class="gm-dialog-icon">🔐</div>
						<div class="gm-dialog-title">{{ passwordDialogTitle }}</div>
						<div class="gm-dialog-message">{{ passwordDialogMessage }}</div>
						<div class="gm-dialog-file" v-if="passwordMode === 'set'">
							<input type="password" ref="pwdInput1" v-model="passwordInput1" placeholder="请输入新密码（至少4位）" @keyup.enter="confirmPasswordAction" />
						</div>
						<div class="gm-dialog-file" v-if="passwordMode === 'change'">
							<input type="password" ref="pwdInputOld" v-model="passwordInputOld" placeholder="请输入原密码" @keyup.enter="confirmPasswordAction" />
							<input type="password" ref="pwdInput1" v-model="passwordInput1" placeholder="请输入新密码（至少4位）" @keyup.enter="confirmPasswordAction" />
							<input type="password" ref="pwdInput2" v-model="passwordInput2" placeholder="请再次输入新密码" @keyup.enter="confirmPasswordAction" />
						</div>
						<div class="gm-dialog-file" v-if="passwordMode === 'verify'">
							<input type="password" ref="pwdInput1" v-model="passwordInput1" placeholder="请输入GM工具密码" @keyup.enter="confirmPasswordAction" />
						</div>
						<div class="gm-dialog-actions">
							<button class="gm-dialog-btn gm-dialog-btn-cancel" @click="cancelPasswordDialog">取消</button>
							<button class="gm-dialog-btn gm-dialog-btn-confirm" @click="confirmPasswordAction">{{ passwordConfirmText }}</button>
						</div>
						<div class="gm-password-error" v-if="passwordError">{{ passwordError }}</div>
					</div>
				</div>
			</Transition>
		</div>
</template>

<script>
import eventListener from '../achievement/eventListener.js';
import { lib, game, get, ui } from '../../../../../noname.js';

const CHEAT_TABLE = {
	material: [
		{ label: '所有材料各获得12个', type: 'custom', run: () => { Object.keys(get.xjzh_cailiaoList()).forEach(i => game.xjzh_changeCailiao(i, 12)); } },
		{ label: '重置所有材料', type: 'simple', fn: () => game.xjzh_resetCailiao() },
		{ label: '获得1000个碎片', type: 'custom', run: () => { game.xjzh_changeSuipian(1000); eventListener.emit('suipianUpdated'); } },
		{ label: '获得10个精魄', type: 'custom', run: () => { game.xjzh_changeTokens(10); eventListener.emit('tokensUpdated'); } },
		{ label: '重置所有碎片及精魄', type: 'custom', run: () => { game.xjzh_changeSuipian(-get.xjzh_suipian()); game.xjzh_changeTokens(-get.xjzh_tokens()); eventListener.emit('restTsUpdated'); } },
	],
	achievement: [
		{ label: '一键重置所有成就', type: 'simple', fn: () => game.xjzhAchi.reset(), toast: '所有成就重置完成！' },
		{ label: '获得1000点经验', type: 'simple', fn: () => game.xjzh_levelUp(1000) },
		{ label: '无视经验直接满级', type: 'simple', fn: () => game.xjzh_levelUp({ level: 100, exp: 0 }) },
		{ label: '一键重置等级', type: 'simple', fn: () => game.xjzh_levelUp({ level: 1, exp: 0 }) },
	],
	special: [
		{ label: '所有奇术要件获得1个', type: 'custom', run: () => { Object.keys(lib.xjzh_qishuyaojians).forEach(i => game.xjzh_gainEquip(i)); } },
		{ label: '重置奇术要件存档', type: 'simple', fn: () => game.xjzh_resetQishu() },
		{ label: '获得所有符文各1个', type: 'custom', run: () => { get.xjzh_runeList().forEach(i => game.xjzh_gainRune(i, 1)); } },
		{ label: '获得30天超级会员', type: 'simple', fn: () => game.xjzh_gainSvipTime(30), noToast: true },
		{ label: '清除超级会员信息', type: 'simple', fn: () => game.xjzh_clearSvipTime() },
		{ label: '获得1000美元', type: 'custom', run: () => { const toolkit = game.haituGalleryDraw || lib.haituGalleryDraw; if (toolkit && toolkit.changeMoney) toolkit.changeMoney(1000, 'GM工具奖励'); else throw new Error('美元杀扩展未安装'); } },
		{ label: '获得所有品质宝箱各1个', type: 'custom', run: () => { const config = game.xjzh_getDollarChestConfig(); Object.keys(config).forEach(key => game.xjzh_changeDollarChest(key, 1)); } },
	],
};

export default {
	data() {
		return {
			isVisible: false,
			xjzh_isGmWindowOpen: false,
			activeTab: 'save',
			// 存档信息
			saveInfoQishu: null,
			saveInfoDiablo: null,
			saveInfoYuange: null,
			// 通用确认对话框
			showConfirmSaveDialog: false,
			confirmSaveIcon: '',
			confirmSaveTitle: '',
			confirmSaveMessage: '',
			confirmSaveAction: null,
			// 导入文件选择
			showImportFileDialog: false,
			importTarget: '',
			importTargetName: '',
			pendingImportData: null,
			// 用户名验证
			showUsernameDialog: false,
			inputUsername: '',
			// GM 工具
			showConfirmDialog: false,
			pendingOption: null,
			// 结果提示
			showResultDialog: false,
			resultIcon: '',
			resultTitle: '',
			resultOptionLabel: '',
			resultMessage: '',
			// 详情对话框
			showDetailDialog: false,
			detailTitle: '',
			detailGroups: [],
			// 密码保护
			hasPassword: false,
			showPasswordDialog: false,
			passwordMode: 'verify',
			passwordInput1: '',
			passwordInput2: '',
			passwordInputOld: '',
			passwordDialogTitle: '',
			passwordDialogMessage: '',
			passwordConfirmText: '确认',
			passwordError: '',
			pendingTabAfterVerify: '',
			// Session token：进入GM面板验证后生成，关闭工具箱后失效
			gmVerifiedToken: 0,
		};
	},
	computed: {
		columns() {
			const buildOptions = (list) => list.map(def => ({
				label: def.label,
				action: () => {
					try {
						if (def.type === 'simple') def.fn();
						else def.run();
						this._showResult('✅', '执行成功', def.label, def.toast || '操作已完成');
					} catch (error) {
						console.error(`执行[${def.label}]出错:`, error);
						this._showResult('❌', '执行失败', def.label, error.message || '未知错误');
					}
				}
			}));
			return [
				{ key: 'material', label: '材料', options: buildOptions(CHEAT_TABLE.material) },
				{ key: 'achievement', label: '成就/等级', options: buildOptions(CHEAT_TABLE.achievement) },
				{ key: 'special', label: '特殊', options: buildOptions(CHEAT_TABLE.special) },
			];
		}
	},
	watch: {
		isVisible(val) {
			if (val) {
				this.$nextTick(() => {
					this._ensureContainer();
					this._positionInner();
					this.loadAllSaveInfo();
				});
			}
		},
		showConfirmSaveDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showImportFileDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showUsernameDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showConfirmDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showResultDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showDetailDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		},
		showPasswordDialog(val) {
			if (val) requestAnimationFrame(() => requestAnimationFrame(() => this._positionDialog()));
		}
	},
	mounted() {
		this._onResize = () => {
			if (this.isVisible) {
				setTimeout(() => {
					// resize时ui.window已经恢复显示（resize不会在toolbox打开时触发），可以重新读取
					this._cachedUIRect = null;
					// 先尝试恢复ui.window显示状态再读取
					let tmpDisplay = null;
					if (ui.window && ui.window.style.display === 'none') {
						tmpDisplay = ui.window.style.display;
						ui.window.style.display = '';
					}
					const rect = this._getUIRect();
					if (tmpDisplay !== null && ui.window) {
						ui.window.style.display = tmpDisplay;
					}
					// 读不到缓存也无效时，兜底视口
					if (rect.width === 0 || rect.height === 0) {
						this._cachedUIRect = {
							left: 0, top: 0,
							width: Math.max(document.documentElement.clientWidth, window.innerWidth),
							height: Math.max(document.documentElement.clientHeight, window.innerHeight),
						};
					}
					this._ensureContainer();
					this._positionInner();
					this._positionDialog();
				}, 500);
			}
		};
		lib.onresize.push(this._onResize);
	},
	beforeUnmount() {
		lib.onresize.remove(this._onResize);
	},
	methods: {
		// ========== 密码保护方法 ==========
		_hashPassword(pwd) {
			// 简单哈希：位运算+字符编码，不可逆
			let hash = 0;
			const salt = 'xjzh_gm_2024_';
			const str = salt + pwd;
			for (let i = 0; i < str.length; i++) {
				const chr = str.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0;
			}
			// 转为无符号十六进制
			return (hash >>> 0).toString(16);
		},
		_loadPassword() {
			try {
				const stored = game.getExtensionConfig("仙家之魂", "xjzh_gmPassword");
				if (stored && typeof stored === 'string' && stored.length > 0) {
					this.hasPassword = true;
				} else {
					// A方式：首次无密码时自动写入默认密码
					// 默认密码: xjzh666
					const DEFAULT_HASH = 'd7f21b1';
					game.saveExtensionConfig("仙家之魂", "xjzh_gmPassword", DEFAULT_HASH);
					this.hasPassword = true;
				}
			} catch (e) {
				// 兜底仍然初始化默认密码
				try {
					const DEFAULT_HASH = 'd7f21b1';
					game.saveExtensionConfig("仙家之魂", "xjzh_gmPassword", DEFAULT_HASH);
					this.hasPassword = true;
				} catch (e2) {
					this.hasPassword = false;
				}
			}
		},
		_savePassword(hash) {
			game.saveExtensionConfig("仙家之魂", "xjzh_gmPassword", hash);
			this.hasPassword = true;
		},
		_clearPassword() {
			game.saveExtensionConfig("仙家之魂", "xjzh_gmPassword", '');
			this.hasPassword = false;
		},
		switchTab(tab) {
			if (tab === 'gm') {
				if (this.hasPassword) {
					// 已有密码，需要验证
					this.pendingTabAfterVerify = 'gm';
					this.passwordMode = 'verify';
					this.passwordDialogTitle = '🔐 GM工具密码验证';
					this.passwordDialogMessage = 'GM工具已设置密码，请输入密码以访问';
					this.passwordConfirmText = '确定';
					this.passwordInput1 = '';
					this.passwordError = '';
					this.showPasswordDialog = true;
				} else {
					// 无密码直接切换
					this.gmVerifiedToken = Date.now();
					this.activeTab = 'gm';
				}
			} else {
				this.activeTab = tab;
			}
		},
		openPasswordDialog() {
			if (this.hasPassword) {
				// 修改密码
				this.passwordMode = 'change';
				this.passwordDialogTitle = '🔐 修改GM工具密码';
				this.passwordDialogMessage = '请输入原密码和新密码';
				this.passwordConfirmText = '确认修改';
				this.passwordInputOld = '';
				this.passwordInput1 = '';
				this.passwordInput2 = '';
				this.passwordError = '';
				this.showPasswordDialog = true;
			} else {
				// 设置密码
				this.passwordMode = 'set';
				this.passwordDialogTitle = '🔑 设置GM工具密码';
				this.passwordDialogMessage = '设置密码后，切换到GM工具需要验证密码';
				this.passwordConfirmText = '确认设置';
				this.passwordInput1 = '';
				this.passwordInput2 = '';
				this.passwordError = '';
				this.showPasswordDialog = true;
			}
		},
		cancelPasswordDialog() {
			this.showPasswordDialog = false;
			this.passwordInput1 = '';
			this.passwordInput2 = '';
			this.passwordInputOld = '';
			this.passwordError = '';
			// 如果是验证取消，返回存档管理
			if (this.passwordMode === 'verify' && this.pendingTabAfterVerify) {
				this.activeTab = 'save';
				this.pendingTabAfterVerify = '';
			}
		},
		confirmPasswordAction() {
			this.passwordError = '';
			if (this.passwordMode === 'verify') {
				// 验证密码
				const stored = game.getExtensionConfig("仙家之魂", "xjzh_gmPassword");
				if (!this.passwordInput1) {
					this.passwordError = '请输入密码';
					return;
				}
				const inputHash = this._hashPassword(this.passwordInput1);
				if (inputHash === stored) {
					this.showPasswordDialog = false;
					this.gmVerifiedToken = Date.now();
					this.activeTab = this.pendingTabAfterVerify || 'gm';
					this.pendingTabAfterVerify = '';
					this.passwordInput1 = '';
				} else {
					this.passwordError = '密码错误，请重试';
				}
			} else if (this.passwordMode === 'set') {
				// 设置新密码
				if (!this.passwordInput1 || this.passwordInput1.length < 4) {
					this.passwordError = '密码至少4位';
					return;
				}
				this._savePassword(this._hashPassword(this.passwordInput1));
				this.showPasswordDialog = false;
				this.passwordInput1 = '';
				this._showResult('🔑', '密码设置成功', 'GM工具', '下次切换到GM工具需要密码验证');
			} else if (this.passwordMode === 'change') {
				// 修改密码
				if (!this.passwordInputOld) {
					this.passwordError = '请输入原密码';
					return;
				}
				const stored = game.getExtensionConfig("仙家之魂", "xjzh_gmPassword");
				const oldHash = this._hashPassword(this.passwordInputOld);
				if (oldHash !== stored) {
					this.passwordError = '原密码错误';
					return;
				}
				if (!this.passwordInput1 || this.passwordInput1.length < 4) {
					this.passwordError = '新密码至少4位';
					return;
				}
				if (this.passwordInput1 !== this.passwordInput2) {
					this.passwordError = '两次输入的新密码不一致';
					return;
				}
				this._savePassword(this._hashPassword(this.passwordInput1));
				this.showPasswordDialog = false;
				this.passwordInput1 = '';
				this.passwordInput2 = '';
				this.passwordInputOld = '';
				this._showResult('🔑', '密码修改成功', 'GM工具', '请牢记新密码');
			}
		},
		// ========== 容器与定位 ==========
		_getUIRect() {
			if (this._cachedUIRect && this._cachedUIRect.width > 0) return this._cachedUIRect;
			// 缓存无效时尝试实时读取（非display:none状态）
			try {
				const rect = ui.window.getBoundingClientRect();
				const w = ui.window.offsetWidth;
				const h = ui.window.offsetHeight;
				if (w > 0 && h > 0) {
					this._cachedUIRect = { left: rect.left, top: rect.top, width: w, height: h };
					return this._cachedUIRect;
				}
			} catch (e) {}
			// 兜底：视口
			return {
				left: 0, top: 0,
				width: Math.max(document.documentElement.clientWidth, window.innerWidth),
				height: Math.max(document.documentElement.clientHeight, window.innerHeight),
			};
		},
		_ensureContainer() {
			const el = this.$el;
			if (!el || el.nodeType !== 1) return;
			const gmBack = el.classList.contains('gm-back') ? el : el.querySelector('.gm-back');
			if (!gmBack) return;
			if (gmBack.parentNode !== document.body) {
				document.body.appendChild(gmBack);
			}
			const imp = 'important';
			const rect = this._getUIRect();
			gmBack.style.setProperty('position', 'fixed', imp);
			gmBack.style.setProperty('left', rect.left + 'px', imp);
			gmBack.style.setProperty('top', rect.top + 'px', imp);
			gmBack.style.setProperty('width', rect.width + 'px', imp);
			gmBack.style.setProperty('height', rect.height + 'px', imp);
			gmBack.style.setProperty('margin', '0', imp);
			gmBack.style.setProperty('padding', '0', imp);
			gmBack.style.setProperty('display', 'block', imp);
			gmBack.style.setProperty('background', 'transparent', imp);
		},
		_positionInner() {
			const gmBack = this.$el && (this.$el.classList.contains('gm-back') ? this.$el : this.$el.querySelector('.gm-back'));
			if (!gmBack) return;
			const inner = gmBack.querySelector('.gm-inner');
			if (!inner) return;
			const rect = this._getUIRect();
			const sw = rect.width;
			const sh = rect.height;
			const maxW = Math.min(sw * 0.82, 980);
			const maxH = Math.min(sh * 0.80, 680);
			const minW = 320;
			const minH = 240;
			const important = 'important';
			const availW = Math.max(0, sw - 20);
			const availH = Math.max(0, sh - 20);
			const w = Math.max(minW, Math.min(maxW, availW));
			const h = Math.max(minH, Math.min(maxH, availH));
			const centerX = rect.left + sw / 2;
			const centerY = rect.top + sh / 2;
			inner.style.setProperty('position', 'fixed', important);
			inner.style.setProperty('left', centerX + 'px', important);
			inner.style.setProperty('top', centerY + 'px', important);
			inner.style.setProperty('width', w + 'px', important);
			inner.style.setProperty('height', h + 'px', important);
			inner.style.setProperty('transform', 'translate(-50%, -50%)', important);
			inner.style.setProperty('z-index', '2147483000', important);
		},
		_positionDialog() {
			const gmBack = this.$el && (this.$el.classList.contains('gm-back') ? this.$el : this.$el.querySelector('.gm-back'));
			if (!gmBack) return;
			const masks = gmBack.querySelectorAll('.gm-dialog-mask');
			let mask = null;
			masks.forEach(m => { if (m.offsetHeight > 0) mask = m; });
			if (!mask) return;
			const dialog = mask.querySelector('.gm-dialog');
			if (!dialog) return;
			const imp = 'important';
			const rect = this._getUIRect();
			const sw = rect.width;
			const sh = rect.height;
			const isDetail = dialog.classList.contains('gm-dialog-detail');
			// mask: position fixed 覆盖游戏窗口区域
			mask.style.setProperty('position', 'fixed', imp);
			mask.style.setProperty('left', rect.left + 'px', imp);
			mask.style.setProperty('top', rect.top + 'px', imp);
			mask.style.setProperty('width', sw + 'px', imp);
			mask.style.setProperty('height', sh + 'px', imp);
			mask.style.setProperty('display', 'block', imp);
			mask.style.setProperty('z-index', '2147483001', imp);
			// dialog: position fixed + translate 居中于游戏窗口
			const dlgW = isDetail ? Math.min(700, sw * 0.95) : Math.min(450, sw * 0.85);
			const centerX = rect.left + sw / 2;
			const centerY = rect.top + sh / 2;
			dialog.style.setProperty('position', 'fixed', imp);
			dialog.style.setProperty('left', centerX + 'px', imp);
			dialog.style.setProperty('top', centerY + 'px', imp);
			dialog.style.setProperty('width', dlgW + 'px', imp);
			dialog.style.setProperty('transform', 'translate(-50%, -50%)', imp);
			dialog.style.setProperty('margin', '0', imp);
			if (isDetail) {
				const dlgMaxH = Math.min(sh * 0.88, 900);
				dialog.style.setProperty('max-width', Math.min(800, sw * 0.95) + 'px', imp);
				dialog.style.setProperty('max-height', dlgMaxH + 'px', imp);
				dialog.style.setProperty('height', '0', imp);
				dialog.style.setProperty('min-height', '400px', imp);
				dialog.style.setProperty('display', 'flex', imp);
				dialog.style.setProperty('flex-direction', 'column', imp);
				dialog.style.setProperty('overflow', 'hidden', imp);
			} else {
				dialog.style.setProperty('height', 'auto', imp);
				dialog.style.setProperty('min-height', '280px', imp);
			}
			dialog.style.setProperty('z-index', '2147483002', imp);
		},
		openWindow() {
			if (ui.window) {
				// 先缓存ui.window的位置和尺寸（必须在display:none之前）
				const r = ui.window.getBoundingClientRect();
				this._cachedUIRect = {
					left: r.left,
					top: r.top,
					width: ui.window.offsetWidth,
					height: ui.window.offsetHeight,
				};
				this._gameUIDisplay = ui.window.style.display;
				ui.window.style.display = 'none';
			} else {
				// ui.window不存在（Electron全屏等情况），用视口尺寸
				this._cachedUIRect = {
					left: 0,
					top: 0,
					width: Math.max(document.documentElement.clientWidth, window.innerWidth),
					height: Math.max(document.documentElement.clientHeight, window.innerHeight),
				};
			}
			this.isVisible = true;
			this.activeTab = 'save';
			this.xjzh_isGmWindowOpen = true;
			window.xjzh_isGmWindowOpen = this.xjzh_isGmWindowOpen;
			// 强制重置密码为xjzh666
			const DEFAULT_HASH = 'd7f21b1';
			game.saveExtensionConfig("仙家之魂", "xjzh_gmPassword", DEFAULT_HASH);
			this.hasPassword = true;
		},
		closeWindow() {
			if (ui.window && this._gameUIDisplay !== undefined) {
				ui.window.style.display = this._gameUIDisplay;
				this._gameUIDisplay = undefined;
			}
			this.isVisible = false;
			this.xjzh_isGmWindowOpen = false;
			window.xjzh_isGmWindowOpen = this.xjzh_isGmWindowOpen;
			// 关闭工具箱时清除session token，重新打开需要重新验证
			this.gmVerifiedToken = 0;
			this.activeTab = 'save';
		},
		// ========== 存档管理方法 ==========
		loadAllSaveInfo() {
			// 奇术要件
			try {
				const qishu = game.xjzh_getQishuConfig();
				this.saveInfoQishu = qishu ? { name: qishu.name, level: qishu.level, suipian: qishu.suipian, tokens: qishu.tokens } : null;
			} catch (e) { this.saveInfoQishu = null; }
			// 死灵之书
			try {
				const diablo = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
				if (diablo && diablo instanceof Map) {
					let soulCount = 0;
					for (const [key, value] of diablo) {
						if (Array.isArray(value)) soulCount += value.length;
					}
					this.saveInfoDiablo = { soulCount };
				} else { this.saveInfoDiablo = null; }
			} catch (e) { this.saveInfoDiablo = null; }
			// 元歌碎片
			try {
				const yuange = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				if (yuange && yuange instanceof Map) {
					let totalCount = 0;
					for (const [, value] of yuange) { totalCount += value; }
					this.saveInfoYuange = { typeCount: yuange.size, totalCount };
				} else { this.saveInfoYuange = null; }
			} catch (e) { this.saveInfoYuange = null; }
		},
		// --- 通用确认对话框 ---
		_showConfirmDialog(icon, title, message, action) {
			this.confirmSaveIcon = icon;
			this.confirmSaveTitle = title;
			this.confirmSaveMessage = message;
			this.confirmSaveAction = action;
			this.showConfirmSaveDialog = true;
		},
		executeConfirmSave() {
			this.showConfirmSaveDialog = false;
			if (this.confirmSaveAction) {
				try { this.confirmSaveAction(); } catch (e) { console.error(e); }
				this.confirmSaveAction = null;
			}
		},
		// --- 奇术要件 ---
		exportQishu() {
			this._showConfirmDialog('📤', '导出奇术要件存档', '确定要导出奇术要件存档吗？导出后将下载文件。', () => {
				try {
					const data = game.xjzh_getQishuConfig();
					if (!data) { this._showResult('❌', '导出失败', '奇术要件', '暂无存档数据'); return; }
					game.xjzh_saveQishuConfig(data);
					const encoded = lib.init.encode('存档备份：' + JSON.stringify(data));
					game.writeFile(encoded, 'extension/仙家之魂/save', '奇术要件存档.json', (err) => {
						if (err) this._showResult('❌', '导出失败', '奇术要件', err.message || '文件写入失败');
						else this._showResult('✅', '导出成功', '奇术要件', '存档文件已下载');
					});
				} catch (err) { this._showResult('❌', '导出失败', '奇术要件', err.message || '未知错误'); }
			});
		},
		importQishu() {
			this.importTarget = 'qishu';
			this.importTargetName = '奇术要件存档';
			this.showImportFileDialog = true;
		},
		clearQishu() {
			this._showConfirmDialog('🗑️', '清除奇术要件存档', '确定要清除奇术要件存档吗？此操作<strong>不可撤销</strong>！', () => {
				try {
					game.xjzh_resetQishu();
					this.loadAllSaveInfo();
					this._showResult('✅', '清除成功', '奇术要件', '存档已重置为初始状态');
				} catch (err) { this._showResult('❌', '清除失败', '奇术要件', err.message || '未知错误'); }
			});
		},
		viewQishuDetail() {
			try {
				const data = game.xjzh_getQishuConfig();
				console.log('[仙家之魂] ===== 奇术要件详情点击 =====');
				console.log('[仙家之魂] 原始数据:', JSON.parse(JSON.stringify(data)));
				console.log('[仙家之魂] data的所有key:', Object.keys(data || {}));
				if (!data) { this._showDetail('奇术要件存档详情', []); return; }
				const groups = this._formatQishuDetail(data);
				console.log('[仙家之魂] 格式化后的分组:', JSON.parse(JSON.stringify(groups)));
				this._showDetail('奇术要件存档详情', groups);
			} catch (e) { console.error('[仙家之魂] 详情查看出错:', e); this._showResult('❌', '查看失败', '奇术要件', e.message); }
		},
		_formatQishuDetail(data) {
			console.log('[仙家之魂] 奇术要件原始存档数据:', data);
			console.log('[仙家之魂] data.name:', data?.name, 'data.level:', data?.level, 'data.suipian:', data?.suipian, 'data.tokens:', data?.tokens);
			const groups = [];
			// 翻译工具
			const qTr = k => get.xjzh_qishuTranslate(k) || k;
			const cTr = k => get.xjzh_cailiaoTranslate(k) || k;
			// 辅助：判断空对象
			const isEmptyObj = v => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0;

			// 1. 基础信息（只保留用户名和等级）
			const baseRows = [];
			const userName = data?.name || '—';
			const userLevel = (data?.level || 1) + ' 级';
			console.log('[仙家之魂] 基础信息 - 用户名:', userName, '等级:', userLevel);
			baseRows.push({ label: '用户名', value: userName });
			baseRows.push({ label: '等级', value: userLevel });
			groups.push({ title: '基础信息', rows: baseRows });

			// 2. 资源（碎片和精魄）
			const suipian = data?.suipian || 0;
			const tokens = data?.tokens || 0;
			console.log('[仙家之魂] 资源 - 碎片:', suipian, '精魄:', tokens);
			const resourceRows = [
				{ label: '碎片', value: suipian },
				{ label: '精魄', value: tokens },
			];
			groups.push({ title: '资源', rows: resourceRows });

			// 3. 会员（显示剩余天数）
			if (data.svip && data.svip.length) {
				let totalDays = 0;
				const svipRows = [];
				for (let i = 0; i < data.svip.length; i++) {
					const s = data.svip[i];
					if (typeof s === 'object' && s.days !== undefined) {
						totalDays += Number(s.days) || 0;
					} else if (typeof s === 'number') {
						totalDays += s;
					}
				}
				if (totalDays > 0) {
					svipRows.push({ label: '超级会员', value: '剩余 ' + totalDays + ' 天' });
				} else {
					svipRows.push({ label: '超级会员', value: '已过期' });
				}
				groups.push({ title: '会员', rows: svipRows });
			}

			// 4. 奇术要件（合并同一名称的重复项）
			const itemCountMap = {}; // { 名称: 数量 }
			// 从equip获取
			if (data.equip && Object.keys(data.equip).length) {
				for (const [k, v] of Object.entries(data.equip)) {
					const name = qTr(k);
					if (isEmptyObj(v) || v === true || v === 1) {
						itemCountMap[name] = (itemCountMap[name] || 0) + 1;
					} else if (typeof v === 'number') {
						itemCountMap[name] = (itemCountMap[name] || 0) + v;
					} else if (typeof v === 'object' && v.count) {
						itemCountMap[name] = (itemCountMap[name] || 0) + (Number(v.count) || 1);
					} else {
						itemCountMap[name] = (itemCountMap[name] || 0) + 1;
					}
				}
			}
			// 从bag获取（也可能包含奇术要件）
			if (data.bag && data.bag.length) {
				for (const b of data.bag) {
					if (typeof b === 'object') {
						const name = qTr(b.name || '未知');
						const count = Number(b.count) || 1;
						itemCountMap[name] = (itemCountMap[name] || 0) + count;
					} else {
						const name = qTr(String(b));
						itemCountMap[name] = (itemCountMap[name] || 0) + 1;
					}
				}
			}
			// 构建奇术要件行
			const itemRows = Object.entries(itemCountMap)
				.filter(([_, count]) => count > 0)
				.sort((a, b) => b[1] - a[1]) // 按数量降序
				.map(([name, count]) => ({
					label: name,
					value: count > 1 ? '×' + count : '×1'
				}));
			if (itemRows.length) {
				groups.push({ title: `奇术要件 (${itemRows.length}种, 共${itemRows.reduce((s, r) => s + parseInt(r.value.replace('×', '')), 0)}件)`, rows: itemRows });
			}

			// 5. 材料（只显示种类和数量）
			if (data.cailiao && Object.keys(data.cailiao).length) {
				const cailiaoRows = Object.entries(data.cailiao)
					.filter(([_, v]) => v > 0)
					.sort((a, b) => b[1] - a[1])
					.map(([k, v]) => ({ label: cTr(k), value: '×' + v }));
				if (cailiaoRows.length) groups.push({ title: `材料 (${cailiaoRows.length}种)`, rows: cailiaoRows });
			}

			// 最终过滤：确保没有空 rows 的分组
			const result = groups.filter(g => g.rows && g.rows.length > 0);
			// 兜底：如果所有分组都被过滤，显示原始数据
			if (result.length === 0) {
				try {
					const raw = JSON.stringify(data, null, 2);
					result.push({
						title: '原始数据',
						rows: [{ label: '存档内容', value: raw, multiline: true }]
					});
				} catch (e) {}
			}
			return result;
		},
		// --- 死灵之书 ---
		exportDiablo() {
			this._showConfirmDialog('📤', '导出死灵之书存档', '确定要导出死灵之书存档吗？导出后将下载文件。', () => {
				try {
					const list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
					if (!list) { this._showResult('❌', '导出失败', '死灵之书', '暂无存档数据'); return; }
					const listArr = list instanceof Map ? Array.from(list) : Object.entries(list);
					const encoded = lib.init.encode('死灵之书副本：' + JSON.stringify(listArr));
					game.writeFile(encoded, 'extension/仙家之魂/save', '死灵之书存档.json', (err) => {
						if (err) this._showResult('❌', '导出失败', '死灵之书', err.message || '文件写入失败');
						else this._showResult('✅', '导出成功', '死灵之书', '存档文件已下载');
					});
				} catch (err) { this._showResult('❌', '导出失败', '死灵之书', err.message || '未知错误'); }
			});
		},
		importDiablo() {
			this.importTarget = 'diablo';
			this.importTargetName = '死灵之书存档';
			this.showImportFileDialog = true;
		},
		clearDiablo() {
			this._showConfirmDialog('🗑️', '清除死灵之书存档', '确定要清除死灵之书存档吗？此操作<strong>不可撤销</strong>！', () => {
				try {
					game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
					this.loadAllSaveInfo();
					this._showResult('✅', '清除成功', '死灵之书', '存档数据已清除');
				} catch (err) { this._showResult('❌', '清除失败', '死灵之书', err.message || '未知错误'); }
			});
		},
		viewDiabloDetail() {
			try {
				const list = game.getExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo");
				console.log('[仙家之魂] ===== 死灵之书详情点击 =====');
				console.log('[仙家之魂] 原始数据:', list);
				console.log('[仙家之魂] 类型:', list instanceof Map ? 'Map' : typeof list);
				if (list instanceof Map) console.log('[仙家之魂] Map的所有key:', Array.from(list.keys()));
				else if (list && typeof list === 'object') console.log('[仙家之魂] Object的所有key:', Object.keys(list));
				if (!list) { this._showDetail('死灵之书存档详情', []); return; }
				const groups = this._formatDiabloDetail(list);
				console.log('[仙家之魂] 格式化后的分组:', JSON.parse(JSON.stringify(groups)));
				this._showDetail('死灵之书存档详情', groups);
			} catch (e) { console.error('[仙家之魂] 详情查看出错:', e); this._showResult('❌', '查看失败', '死灵之书', e.message); }
		},
		_formatDiabloDetail(list) {
			console.log('[仙家之魂] 死灵之书原始存档数据:', list, '类型:', list instanceof Map ? 'Map' : typeof list);
			const groups = [];
			const nTr = k => get.translation(k) || k;
			const isEmptyObj = v => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0;
			const safeVal = v => {
				if (v === null || v === undefined || v === '') return '—';
				if (Array.isArray(v) && v.length === 0) return '—';
				if (isEmptyObj(v)) return '—';
				return v;
			};
			// Map 可能是 {isAi: [], isPlayer: []} 形式的存储
			let aiList = [];
			let playerList = [];
			// 先处理 Map 结构
			if (list instanceof Map) {
				// 传统两个key模式
				if (list.has('isAi')) aiList = list.get('isAi') || [];
				if (list.has('isPlayer')) playerList = list.get('isPlayer') || [];
				// 如果这俩key不存在，尝试遍历其他分类key（兜底）
				if (aiList.length === 0 && playerList.length === 0) {
					for (const [key, value] of list) {
						if (key === 'isAi') continue;
						if (key === 'isPlayer') continue;
						const arr = Array.isArray(value) ? value : [];
						if (String(key).toLowerCase().includes('player') || String(key).toLowerCase().includes('玩家')) playerList = playerList.concat(arr);
						else aiList = aiList.concat(arr);
					}
				}
			} else if (Array.isArray(list)) {
				aiList = list;
			} else if (typeof list === 'object' && list !== null) {
				// 可能是对象但不是Map
				if (Array.isArray(list.isAi)) aiList = list.isAi;
				if (Array.isArray(list.isPlayer)) playerList = list.isPlayer;
			}

			const totalSouls = aiList.length + playerList.length;

			// 灵魂统计
			groups.push({
				title: '灵魂统计',
				rows: [
					{ label: '总灵魂数', value: totalSouls + ' 个' },
					{ label: 'AI灵魂', value: aiList.length + ' 个' },
					{ label: '玩家灵魂', value: playerList.length + ' 个' },
				]
			});

			// AI灵魂列表
			if (aiList.length) {
				const rows = aiList.map(s => ({ label: nTr(s), value: safeVal(typeof s === 'object' ? JSON.stringify(s) : s) }));
				if (rows.length) groups.push({ title: `AI灵魂 (${rows.length}个)`, rows });
			}

			// 玩家灵魂列表
			if (playerList.length) {
				const rows = playerList.map(s => ({ label: nTr(s), value: safeVal(typeof s === 'object' ? JSON.stringify(s) : s) }));
				if (rows.length) groups.push({ title: `玩家灵魂 (${rows.length}个)`, rows });
			}

			const result = groups.filter(g => g.rows && g.rows.length > 0);
			if (result.length === 0) {
				try {
					const raw = JSON.stringify(Array.from(list instanceof Map ? list.entries() : Object.entries(list || {})), null, 2);
					result.push({ title: '原始数据', rows: [{ label: '存档内容', value: raw, multiline: true }] });
				} catch (e) {}
			}
			return result;
		},
		// --- 元歌碎片 ---
		exportYuange() {
			this._showConfirmDialog('📤', '导出元歌碎片存档', '确定要导出元歌武将碎片存档吗？导出后将下载文件。', () => {
				try {
					const config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
					if (!config) { this._showResult('❌', '导出失败', '元歌碎片', '暂无存档数据'); return; }
					const configArr = config instanceof Map ? Array.from(config) : Object.entries(config);
					const encoded = lib.init.encode('武将碎片：' + JSON.stringify(configArr));
					game.writeFile(encoded, 'extension/仙家之魂/save', '元歌碎片存档.json', (err) => {
						if (err) this._showResult('❌', '导出失败', '元歌碎片', err.message || '文件写入失败');
						else this._showResult('✅', '导出成功', '元歌碎片', '存档文件已下载');
					});
				} catch (err) { this._showResult('❌', '导出失败', '元歌碎片', err.message || '未知错误'); }
			});
		},
		importYuange() {
			this.importTarget = 'yuange';
			this.importTargetName = '元歌碎片存档';
			this.showImportFileDialog = true;
		},
		clearYuange() {
			this._showConfirmDialog('🗑️', '清除元歌碎片存档', '确定要清除元歌武将碎片存档吗？此操作<strong>不可撤销</strong>！', () => {
				try {
					game.saveExtensionConfig("仙家之魂", "xjzh_wzry_kongou", new Map());
					this.loadAllSaveInfo();
					this._showResult('✅', '清除成功', '元歌碎片', '存档数据已清除');
				} catch (err) { this._showResult('❌', '清除失败', '元歌碎片', err.message || '未知错误'); }
			});
		},
		viewYuangeDetail() {
			try {
				const config = game.getExtensionConfig("仙家之魂", "xjzh_wzry_kongou");
				console.log('[仙家之魂] ===== 元歌碎片详情点击 =====');
				console.log('[仙家之魂] 原始数据:', config);
				console.log('[仙家之魂] 类型:', config instanceof Map ? 'Map' : typeof config);
				if (config instanceof Map) console.log('[仙家之魂] Map的所有key:', Array.from(config.keys()));
				else if (config && typeof config === 'object') console.log('[仙家之魂] Object的所有key:', Object.keys(config));
				if (!config) { this._showDetail('元歌武将碎片详情', []); return; }
				const groups = this._formatYuangeDetail(config);
				console.log('[仙家之魂] 格式化后的分组:', JSON.parse(JSON.stringify(groups)));
				this._showDetail('元歌武将碎片详情', groups);
			} catch (e) { console.error('[仙家之魂] 详情查看出错:', e); this._showResult('❌', '查看失败', '元歌碎片', e.message); }
		},
		_formatYuangeDetail(config) {
			console.log('[仙家之魂] 元歌碎片原始存档数据:', config, '类型:', config instanceof Map ? 'Map' : typeof config);
			const groups = [];
			const nTr = k => get.translation(k) || k;
			const isEmptyObj = v => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0;
			const safeVal = v => {
				if (v === null || v === undefined || v === '') return '—';
				if (Array.isArray(v) && v.length === 0) return '—';
				if (isEmptyObj(v)) return '—';
				return v;
			};
			let totalCount = 0;
			const detailRows = [];
			// 兼容 Map 和 普通对象
			const entries = [];
			if (config instanceof Map) {
				for (const [key, value] of config) entries.push([key, value]);
			} else if (typeof config === 'object' && config !== null) {
				for (const [key, value] of Object.entries(config)) entries.push([key, value]);
			}

			for (const [key, value] of entries) {
				const num = Number(value) || 0;
				totalCount += num;
				const unlocked = num >= 50;
				detailRows.push({
					label: nTr(key),
					value: `${num}个 ${unlocked ? '✓ 已解锁' : '✗ 未解锁'}`
				});
			}
			// 碎片统计
			groups.push({
				title: '碎片统计',
				rows: [
					{ label: '武将种类', value: entries.length + ' 种' },
					{ label: '总碎片数', value: totalCount + ' 个' },
					{ label: '已解锁武将', value: detailRows.filter(r => String(r.value).includes('✓')).length + ' 个' },
					{ label: '未解锁武将', value: detailRows.filter(r => String(r.value).includes('✗')).length + ' 个' },
				]
			});
			// 碎片明细
			if (detailRows.length) {
				groups.push({
					title: `碎片明细 (达到50个可解锁)`,
					rows: detailRows
				});
			}

			const result = groups.filter(g => g.rows && g.rows.length > 0);
			if (result.length === 0) {
				try {
					const raw = JSON.stringify(entries, null, 2);
					result.push({ title: '原始数据', rows: [{ label: '存档内容', value: raw, multiline: true }] });
				} catch (e) {}
			}
			return result;
		},
		// --- 导入文件处理 ---
		handleImportFile(event) {
			const file = event.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const rawContent = e.target.result;
					const decoded = lib.init.decode(rawContent);
					this.pendingImportData = decoded;
					if (this.importTarget === 'qishu') {
						// 奇术要件需要用户名验证
						if (!decoded.startsWith('存档备份')) {
							this._showResult('❌', '导入失败', '奇术要件', '文件格式错误');
							return;
						}
						const data = JSON.parse(decoded.slice(5));
						this.pendingImportData = data;
						this.inputUsername = '';
						this.showImportFileDialog = false;
						this.showUsernameDialog = true;
					} else if (this.importTarget === 'diablo') {
						if (!decoded.startsWith('死灵之书副本')) {
							this._showResult('❌', '导入失败', '死灵之书', '文件格式错误');
							return;
						}
						this.showImportFileDialog = false;
						this._showConfirmDialog('📥', '导入死灵之书', '确认导入死灵之书存档吗？这将覆盖当前数据。', () => {
							try {
								const rawData = this.pendingImportData.slice(7);
								const parsedData = JSON.parse(rawData);
								const dataMap = new Map(parsedData);
								game.saveExtensionConfig("仙家之魂", "xjzh_diablo_hunhuo", dataMap);
								this.loadAllSaveInfo();
								this._showResult('✅', '导入成功', '死灵之书', '存档数据已成功导入');
							} catch (err) { this._showResult('❌', '导入失败', '死灵之书', err.message || '解析失败'); }
						});
					} else if (this.importTarget === 'yuange') {
						if (!decoded.startsWith('武将碎片')) {
							this._showResult('❌', '导入失败', '元歌碎片', '文件格式错误');
							return;
						}
						this.showImportFileDialog = false;
						this._showConfirmDialog('📥', '导入元歌碎片', '确认导入元歌武将碎片存档吗？这将覆盖当前数据。', () => {
							try {
								const rawData = this.pendingImportData.slice(5);
								const parsedData = JSON.parse(rawData);
								const dataMap = new Map(parsedData);
								game.saveExtensionConfig("仙家之魂", "xjzh_wzry_kongou", dataMap);
								this.loadAllSaveInfo();
								this._showResult('✅', '导入成功', '元歌碎片', '存档数据已成功导入');
							} catch (err) { this._showResult('❌', '导入失败', '元歌碎片', err.message || '解析失败'); }
						});
					}
				} catch (err) {
					this._showResult('❌', '导入失败', this.importTargetName, '文件解析错误');
				}
			};
			reader.readAsText(file, 'UTF-8');
			event.target.value = '';
		},
		confirmUsername() {
			const data = this.pendingImportData;
			if (!data) return;
			if (this.inputUsername !== data.name) {
				this.showUsernameDialog = false;
				this._showResult('❌', '导入失败', '奇术要件', '用户名不匹配，已取消导入');
				return;
			}
			this.showUsernameDialog = false;
			try {
				game.xjzh_saveQishuConfig({ ...data });
				this.loadAllSaveInfo();
				this._showResult('✅', '导入成功', '奇术要件', '存档已覆盖，将于3秒后重启');
				setTimeout(() => game.reload(), 3000);
			} catch (err) {
				this._showResult('❌', '导入失败', '奇术要件', err.message || '未知错误');
			}
		},
		// ========== GM 工具方法 ==========
		executeCheat(def) {
			// 检查session token（进入GM面板时验证通过才生成）
			if (!this.gmVerifiedToken) {
				// token失效，强制返回存档管理
				this.activeTab = 'save';
				this._showResult('⚠️', '验证已过期', 'GM工具', '请重新切换到GM工具并验证密码');
				return;
			}
			this.pendingOption = def;
			this.showConfirmDialog = true;
		},
		confirmExecute() {
			const option = this.pendingOption;
			this.showConfirmDialog = false;
			this.pendingOption = null;
			if (option) {
				try { option.action(); } catch (e) { console.error(e); }
			}
		},
		cancelExecute() {
			this.showConfirmDialog = false;
			this.pendingOption = null;
		},
		_showResult(icon, title, label, message) {
			this.resultIcon = icon;
			this.resultTitle = title;
			this.resultOptionLabel = label;
			this.resultMessage = message;
			this.showResultDialog = true;
		},
		_showDetail(title, groups) {
			this.detailTitle = title;
			this.detailGroups = groups;
			this.showDetailDialog = true;
		},
		closeResult() {
			this.showResultDialog = false;
		}
	}
};
</script>

<style scoped>
/* ========== CSS 变量 ========== */
.gm-back {
	--bg-dark: linear-gradient(90deg, rgb(172, 203, 238, .85) 0%, rgba(231, 240, 253, .85) 100%);
	--bg: rgba(255, 255, 255, .2);
	--bg-light: rgba(255, 255, 255, .3);
	--bg-secondary: hsl(208, 45%, 87%);
	--theme-dark: #438cd6;
	--theme: #8ab8e7;
	--text: hsl(240 100% 11%);
	--text-muted: hsl(216 67% 32%);
	--text-light: hsl(216 67% 92%);
	--border: hsl(217 51% 55%);
	--border-muted: hsl(217 73% 68%);
	--border-highlight: rgba(255, 255, 255, .7);
	--danger: hsl(9 21% 41%);
	--success: hsl(147 19% 36%);
	--info: hsl(217 22% 41%);

	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	z-index: 2147483000 !important;
	display: block !important;
	background-color: transparent !important;
	flex-direction: row !important;
	margin: 0 !important;
	padding: 0 !important;
	box-sizing: border-box !important;
	transform: none !important;
	overscroll-behavior: contain !important;
	scroll-behavior: auto !important;
}

.gm-back * {
	margin: 0 !important;
	padding: 0 !important;
	box-sizing: border-box !important;
	color: var(--text) !important;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
	text-shadow: none !important;
	text-align: left !important;
	transform: none !important;
	float: none !important;
	position: static !important;
}

.gm-back ::-webkit-scrollbar { display: none; }

/* ========== 主容器 ========== */
.gm-inner {
	background: var(--bg-dark) !important;
	border-radius: 15px !important;
	border: 2px solid var(--border) !important;
	box-shadow: 0 2px 2px #0003, 0 4px 4px #0000001a !important;
	display: flex !important;
	flex-direction: column !important;
	overflow: hidden !important;
	padding: 0 !important;
}

/* ========== 顶部导航 ========== */
.gm-header {
	display: flex !important;
	flex-direction: row !important;
	align-items: center !important;
	justify-content: flex-start !important;
	height: 50px !important;
	min-height: 50px !important;
	padding: 0 15px !important;
	border-bottom: 2px solid var(--border) !important;
	gap: 15px !important;
	flex-wrap: nowrap !important;
	flex: 0 0 auto !important;
}

.gm-title {
	font-size: 24px !important;
	font-weight: 700 !important;
	color: var(--theme-dark) !important;
	flex-shrink: 0 !important;
}

.gm-tabs {
	display: flex !important;
	gap: 8px !important;
	flex: 1 !important;
	justify-content: center !important;
}

.gm-tab {
	background: transparent !important;
	border: none !important;
	color: var(--text) !important;
	font-size: 18px !important;
	padding: 6px 16px !important;
	border-radius: 6px !important;
	cursor: pointer !important;
	transition: background 0.2s, color 0.2s !important;
	position: static !important;
}

.gm-tab:hover {
	background: var(--theme-dark) !important;
	color: var(--text-light) !important;
}

.gm-tab.active {
	background: var(--theme-dark) !important;
	color: var(--text-light) !important;
}

.gm-close {
	cursor: pointer !important;
	font-size: 30px !important;
	color: var(--text) !important;
	line-height: 1 !important;
	padding: 0 8px !important;
	border-radius: 4px !important;
	transition: background 0.2s !important;
	flex-shrink: 0 !important;
}

.gm-close:hover {
	background: rgba(255, 255, 255, 0.3) !important;
}

/* ========== 内容区 ========== */
.gm-page {
	flex: 1 !important;
	display: flex !important;
	overflow: hidden !important;
	min-height: 0 !important;
}

.gm-column {
	flex: 1 !important;
	display: flex !important;
	flex-direction: column !important;
	border: 1px solid var(--border) !important;
	border-radius: 8px !important;
	margin: 8px !important;
	overflow: hidden !important;
	min-width: 0 !important;
	background: var(--bg) !important;
}

.gm-column-header {
	display: flex !important;
	align-items: center !important;
	gap: 8px !important;
	padding: 10px 12px !important;
	font-size: 16px !important;
	font-weight: 600 !important;
	background: var(--bg-secondary) !important;
	border-bottom: 1px solid var(--border) !important;
	flex-shrink: 0 !important;
}

.gm-column-header > span:first-child {
	flex: 1;
}

.gm-column-pwd-btn {
	padding: 4px 8px !important;
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
	border-radius: 6px !important;
	cursor: pointer !important;
	font-size: 13px !important;
	line-height: 1 !important;
	transition: all 0.2s !important;
	margin-left: 4px !important;
}

.gm-column-pwd-btn:hover {
	background: var(--border) !important;
	transform: translateY(-1px) !important;
}

.gm-column-count {
	background: var(--theme-dark) !important;
	color: var(--text-light) !important;
	font-size: 12px !important;
	padding: 2px 8px !important;
	border-radius: 10px !important;
	font-weight: 500 !important;
}

.gm-column-body {
	flex: 1 !important;
	overflow-y: auto !important;
	padding: 8px !important;
	display: flex !important;
	flex-direction: column !important;
	gap: 6px !important;
}

/* ========== GM 工具行 ========== */
.gm-row {
	display: flex !important;
	align-items: center !important;
	justify-content: space-between !important;
	padding: 10px 12px !important;
	border: 1px solid var(--border-muted) !important;
	border-radius: 6px !important;
	background: var(--bg-light) !important;
	transition: background 0.2s !important;
}

.gm-row:hover {
	background: rgba(255, 255, 255, 0.5) !important;
	border-color: var(--border) !important;
}

.gm-row-name {
	flex: 1 !important;
	font-size: 15px !important;
	color: var(--text) !important;
}

.gm-row-btn {
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
	padding: 6px 20px !important;
	border-radius: 6px !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	cursor: pointer !important;
	transition: all 0.2s !important;
	position: static !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	text-align: center !important;
}

.gm-row-btn:hover {
	background: #3366cc !important;
	transform: scale(1.05) !important;
}

/* ========== 存档管理 ========== */
.gm-save-body {
	flex: 1 !important;
	padding: 8px !important;
	overflow-y: auto !important;
	display: flex !important;
	flex-direction: column !important;
	gap: 8px !important;
}

.gm-save-section {
	background: var(--bg-light) !important;
	border-radius: 8px !important;
	padding: 12px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-save-section-title {
	font-size: 16px !important;
	font-weight: 600 !important;
	color: var(--theme-dark) !important;
	margin-bottom: 10px !important;
}

.gm-save-actions {
	display: flex !important;
	gap: 10px !important;
	justify-content: flex-start !important;
	flex-wrap: wrap !important;
}

.gm-save-btn {
	flex: 0 0 auto !important;
	min-width: 110px !important;
	padding: 10px 14px !important;
	border-radius: 8px !important;
	font-size: 14px !important;
	font-weight: 500 !important;
	cursor: pointer !important;
	transition: all 0.2s !important;
	display: flex !important;
	align-items: center !important;
	justify-content: center !important;
	gap: 8px !important;
}

.gm-save-btn-primary {
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
}

.gm-save-btn-primary:hover {
	background: #3366cc !important;
}

.gm-save-btn-success {
	background: #48bb78 !important;
	color: white !important;
	border: none !important;
}

.gm-save-btn-success:hover {
	background: #38a169 !important;
}

.gm-save-btn-danger {
	background: #e53e3e !important;
	color: white !important;
	border: none !important;
}

.gm-save-btn-danger:hover {
	background: #c53030 !important;
}

/* 存档信息 */
.gm-save-info {
	background: var(--bg) !important;
	border-radius: 6px !important;
	padding: 10px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-save-info-row {
	display: flex !important;
	justify-content: space-between !important;
	padding: 5px 8px !important;
	border-bottom: 1px dashed var(--border-muted) !important;
}

.gm-save-info-row:last-child {
	border-bottom: none !important;
}

.gm-save-info-label {
	color: var(--text-muted) !important;
	font-size: 14px !important;
}

.gm-save-info-value {
	color: var(--text) !important;
	font-weight: 500 !important;
	font-size: 14px !important;
}

.gm-save-empty {
	text-align: center !important;
	color: var(--text-muted) !important;
	padding: 20px !important;
	font-size: 15px !important;
}

.gm-save-detail-btn {
	margin-top: 10px !important;
	background: transparent !important;
	border: 1px solid var(--theme-dark) !important;
	color: var(--theme-dark) !important;
	padding: 8px 16px !important;
	border-radius: 6px !important;
	font-size: 14px !important;
	cursor: pointer !important;
	width: 100% !important;
}

.gm-save-detail-btn:hover {
	background: var(--theme-dark) !important;
	color: white !important;
}

/* ========== 对话框 ========== */
.gm-dialog-mask {
	position: fixed !important;
	top: 0 !important;
	left: 0 !important;
	background: transparent !important;
	display: block !important;
	overflow: hidden !important;
	z-index: 2147483001 !important;
}

.gm-dialog {
	background: white !important;
	border-radius: 12px !important;
	padding: 24px !important;
	max-width: 90vw !important;
	box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
	display: flex !important;
	flex-direction: column !important;
	gap: 12px !important;
	border: 2px solid var(--border) !important;
}

.gm-dialog-icon {
	font-size: 48px !important;
	text-align: center !important;
}

.gm-dialog-title {
	font-size: 22px !important;
	font-weight: 700 !important;
	text-align: center !important;
	color: var(--text) !important;
}

.gm-dialog-message {
	font-size: 16px !important;
	text-align: center !important;
	color: var(--text-muted) !important;
	line-height: 1.5 !important;
}

.gm-dialog-message strong {
	color: var(--text) !important;
	font-weight: 600 !important;
}

.gm-dialog-file {
	padding: 10px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
}

.gm-dialog-file input {
	width: 100% !important;
}

.gm-dialog-actions {
	display: flex !important;
	gap: 16px !important;
	justify-content: center !important;
	margin-top: 20px !important;
}

.gm-dialog-btn {
	padding: 8px 20px !important;
	border-radius: 6px !important;
	font-size: 15px !important;
	font-weight: 500 !important;
	cursor: pointer !important;
	transition: all 0.2s !important;
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	text-align: center !important;
}

.gm-dialog-btn-cancel {
	background: white !important;
	color: var(--danger) !important;
	border: 1px solid var(--danger) !important;
}

.gm-dialog-btn-cancel:hover {
	background: #fed7d7 !important;
}

.gm-dialog-btn-confirm {
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
}

.gm-dialog-btn-confirm:hover {
	background: #3366cc !important;
}

/* 结果对话框 */
.gm-dialog-result {
	min-height: 240px !important;
	align-items: center !important;
}

.gm-dialog-result .gm-dialog-message {
	font-size: 14px !important;
	word-break: break-all !important;
	max-height: 200px !important;
	overflow-y: auto !important;
	padding: 10px !important;
	background: var(--bg-secondary) !important;
	border-radius: 6px !important;
	width: 100% !important;
}

.gm-dialog-result .gm-dialog-actions {
	justify-content: center !important;
}

/* 详情对话框 */
.gm-dialog-detail {
	min-width: 520px !important;
	max-width: 95vw !important;
	height: auto !important;
	display: flex !important;
	flex-direction: column !important;
	overflow: hidden !important;
}

.gm-detail-title {
	margin-bottom: 4px !important;
	flex-shrink: 0 !important;
}

.gm-detail-content {
	flex: 1 1 auto !important;
	min-height: 0 !important;
	overflow-y: auto !important;
	padding: 6px 4px !important;
	display: flex !important;
	flex-direction: column !important;
	gap: 12px !important;
}

/* 恢复详情内容区滚动条 */
.gm-detail-content::-webkit-scrollbar {
	display: block !important;
	width: 8px !important;
	height: 8px !important;
}
.gm-detail-content::-webkit-scrollbar-thumb {
	background: var(--theme) !important;
	border-radius: 4px !important;
	opacity: 0.5 !important;
}
.gm-detail-content::-webkit-scrollbar-track {
	background: var(--bg-secondary) !important;
	border-radius: 4px !important;
}

.gm-detail-group {
	border: 1px solid var(--border-muted) !important;
	border-radius: 8px !important;
	overflow: visible !important;
	background: var(--bg) !important;
}

.gm-detail-group-title {
	font-size: 15px !important;
	font-weight: 600 !important;
	color: var(--theme-dark) !important;
	padding: 10px 14px !important;
	background: var(--bg-secondary) !important;
	border-bottom: 1px solid var(--border-muted) !important;
}

.gm-detail-group-body {
	padding: 6px 10px !important;
	display: block !important;
}

.gm-detail-row {
	display: flex !important;
	justify-content: space-between !important;
	align-items: center !important;
	padding: 8px 12px !important;
	border-bottom: 1px dashed var(--border-muted) !important;
	font-size: 14px !important;
	line-height: 1.5 !important;
	min-height: 28px !important;
}

.gm-detail-row:last-child {
	border-bottom: none !important;
}

.gm-detail-row-label {
	color: var(--text-muted) !important;
	flex-shrink: 0 !important;
	font-weight: 500 !important;
	min-width: 80px !important;
}

.gm-detail-row-value {
	color: var(--text) !important;
	font-weight: 600 !important;
	text-align: right !important;
	word-break: break-all !important;
	flex: 1 !important;
	margin-left: 12px !important;
}

.gm-detail-row-value.gm-detail-value-multiline {
	text-align: left !important;
	white-space: pre-wrap !important;
	font-family: monospace !important;
	font-size: 12px !important;
	background: var(--bg-secondary) !important;
	padding: 8px !important;
	border-radius: 4px !important;
	max-height: 300px !important;
	overflow-y: auto !important;
}

/* ========== 过渡动画 ========== */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
	            transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
	transform-origin: center center !important;
}

.fade-enter-from {
	opacity: 0 !important;
	transform: scale(0.7) !important;
}

.fade-leave-to {
	opacity: 0 !important;
	transform: scale(0.7) !important;
}

/* gm-inner 入场动画（与translate(-50%,-50%)共存） */
.gm-inner {
	animation: gmInnerFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

@keyframes gmInnerFadeIn {
	from {
		opacity: 0;
		filter: brightness(0.85);
	}
	to {
		opacity: 1;
		filter: brightness(1);
	}
}

/* ========== 密码对话框样式 ========== */
.gm-password-error {
	color: #c53030 !important;
	font-size: 13px !important;
	text-align: center !important;
	margin-top: 8px !important;
	padding: 6px 12px !important;
	background: rgba(197, 48, 48, 0.1) !important;
	border-radius: 4px !important;
}

.gm-gm-toolbar {
	display: flex !important;
	align-items: center !important;
	gap: 12px !important;
	padding: 10px 16px !important;
	background: var(--bg-secondary) !important;
	border-radius: 8px !important;
	margin-bottom: 16px !important;
	border: 1px solid var(--border-muted) !important;
}

.gm-password-btn {
	padding: 6px 14px !important;
	background: var(--theme-dark) !important;
	color: white !important;
	border: none !important;
	border-radius: 6px !important;
	cursor: pointer !important;
	font-size: 13px !important;
	font-weight: 600 !important;
	transition: all 0.2s !important;
}

.gm-password-btn:hover {
	background: var(--border) !important;
	transform: translateY(-1px) !important;
}

.gm-password-hint {
	font-size: 12px !important;
	color: var(--text-muted) !important;
}

.gm-password-hint-warn {
	color: #c53030 !important;
	font-weight: 600 !important;
}
</style>
