import { lib, game, ui, _status } from "../../../../../noname.js";

/**
 * 装备锻造台系统
 */

// 加载CSS样式
lib.init.css(lib.assetURL + 'extension/仙家之魂/css', 'forge');

// 锻造台全局状态
const forgingState = {
    selectPos: null, // 选中的锻造位置 {type:prefix/suffix, index:0/1/2, isEmpty:是否空词条}
    selectMat: null, // 选中的材料 {id:1/2/3, name:名称, type:prefix/suffix/both}
    fossilNum: 3,    // 真理化石数量

    // 已拥有词条
    ownAffixes: {
        蛮力: { type: 'prefix', index: 0, level: 3, valType: 'num', desc: '物理攻击力', val: 12 },
        精准: { type: 'prefix', index: 1, level: 2, valType: 'percent', desc: '暴击率', val: 8 },
        吸血: { type: 'suffix', index: 0, level: 2, valType: 'percent', desc: '生命偷取', val: 5 }
    },

    // 材料对应可锻造词条
    materialAffixes: {
        1: {
            name: '史诗玄铁', num: 5, type: 'prefix', affixes: [
                { name: '力量', desc: '物理攻击力', valType: 'num' },
                { name: '敏捷', desc: '攻击速度', valType: 'num' },
                { name: '智慧', desc: '法术强度', valType: 'num' }
            ]
        },
        2: {
            name: '秘法水晶', num: 3, type: 'suffix', affixes: [
                { name: '法穿', desc: '法术穿透', valType: 'num' },
                { name: '回蓝', desc: '法力恢复/秒', valType: 'num' },
                { name: '护盾', desc: '基础护盾值', valType: 'num' }
            ]
        },
        3: {
            name: '凶兽魂核', num: 10, type: 'both', affixes: [
                { name: '嗜血', desc: '生命偷取', valType: 'percent' },
                { name: '狂暴', desc: '暴击伤害', valType: 'percent' },
                { name: '破甲', desc: '物理穿透', valType: 'num' }
            ]
        }
    },

    // 等级数值规则：T0专属16-20区间
    levelRule: {
        0: { min: 16, max: 20, rate: 1 }, // T0终极
        1: { min: 11, max: 15, rate: 1 }, // T1最高
        2: { min: 6, max: 10, rate: 0.7 }, // T2中级
        3: { min: 1, max: 5, rate: 0.4 }   // T3最低
    },

    // 升阶消耗配置
    upgradeCost: {
        蛮力: 5, 精准: 3, 吸血: 4, 力量: 5, 敏捷: 3, 智慧: 4,
        法穿: 3, 回蓝: 2, 护盾: 4, 嗜血: 5, 狂暴: 6, 破甲: 4
    },

    upgradeMat: { // 升阶固定材料
        id: 3, name: '凶兽魂核', icon: '魂'
    }
};

// 创建锻造台界面
export const openForgingPage = (name, type) => {
    game.pause2();

    // 使用文档片段提高性能
    const fragment = document.createDocumentFragment();

    // 主容器
    const forgingPage = ui.create.div('.xjzh-forging-page');
    const container = ui.create.div('.xjzh-forging-container', forgingPage);
    fragment.appendChild(forgingPage);

    // 创建返回按钮
    const returnBtn = ui.create.div('.xjzh-forging-return', forgingPage, function () {
        forgingPage.delete();
        game.resume2();
        // 返回到成就装备页面
        if (game.xjzhAchi && game.xjzhAchi.openAchievementEquipPage) {
            game.xjzhAchi.openAchievementEquipPage();
        }
    });

    // 创建主内容区域
    const mainContent = ui.create.div('.xjzh-forging-main', container);

    // 左侧装备词条区
    const leftCol = ui.create.div('.xjzh-forging-col', mainContent);
    // 第一个子元素自动应用左边样式
    const leftTitle = ui.create.div('.xjzh-col-title.xjzh-col-title-left', leftCol);
    leftTitle.innerHTML = `
        当前装备词条
        <span id="xjzh_equipTip" class="xjzh-unselected-tip">未选择打造位置</span>
    `;

    // 创建词条容器
    const affixWrap = ui.create.div('', leftCol);
    affixWrap.id = 'xjzh_affixWrap';

    // 创建词条卡片
    createAffixCards(affixWrap);

    // 右侧材料锻造区
    const rightCol = ui.create.div('.xjzh-forging-col', mainContent);
    // 第二个子元素自动应用右边样式
    const rightTitle = ui.create.div('.xjzh-col-title.xjzh-col-title-right', '锻造材料选择', rightCol);

    // 真理化石按钮
    const fossilBtn = ui.create.div('.xjzh-truth-fossil-btn', rightCol, truthFossilFunc);
    fossilBtn.innerHTML = `
        真理化石 · 重随所有词条数值
        <span>(消耗1个)</span>
    `;
    fossilBtn.id = 'xjzh_truthFossilBtn';

    // 材料选择提示
    const materialEmpty = ui.create.div('.xjzh-placeholder', '请先在左侧选择打造位置', rightCol);
    materialEmpty.id = 'xjzh_materialEmpty';

    // 材料列表容器
    const materialList = ui.create.div('.xjzh-forge-hidden', rightCol);
    materialList.id = 'xjzh_materialList';
    createMaterialCards(materialList);

    // 词条预览容器
    const affixPreview = ui.create.div('.xjzh-forge-hidden.xjzh-material-affix-preview', rightCol);
    affixPreview.id = 'xjzh_affixPreview';
    affixPreview.innerHTML = '<div class="xjzh-placeholder">请选择上方锻造材料</div>';

    // 底部按钮区域
    const footer = ui.create.div('.xjzh-forging-footer', container);
    const resetBtn = ui.create.div('.xjzh-forging-btn.xjzh-btn-reset', '重置所有选择', footer, resetAll);
    resetBtn.id = 'xjzh_resetBtn';
    const forgeBtn = ui.create.div('.xjzh-forging-btn.xjzh-btn-forge', '开始锻造', footer, doForge);
    forgeBtn.id = 'xjzh_forgeBtn';
    forgeBtn.classList.add('xjzh-forge-hidden'); // 初始隐藏

    // 初始化升阶容器
    initUpgradeWrap();

    // 更新真理化石按钮状态
    updateFossilBtn();

    document.body.appendChild(fragment);
    return forgingPage;
}

// 创建词条卡片容器
function createAffixCards(container) {
    // 创建前缀词条卡片
    for (let i = 0; i < 3; i++) {
        createAffixCard(container, 'prefix', i);
    }

    // 创建后缀词条卡片
    for (let i = 0; i < 3; i++) {
        createAffixCard(container, 'suffix', i);
    }
}

// 创建单个词条卡片
function createAffixCard(container, type, index) {
    const card = ui.create.div('.xjzh-affix-card', container);
    card.dataset.type = type;
    card.dataset.index = index;

    // 添加特殊位置标识类
    if (type === 'prefix' && index === 0) { // 前缀的第一张卡片
        card.classList.add('first-card');
    }
    if (type === 'prefix' && index === 2) { // 前缀的最后一张（索引2，即第3张）
        card.classList.add('prefix-last');
    }
    if (type === 'suffix' && index === 0) { // 后缀的第一张（索引0，即第1张）
        card.classList.add('suffix-first');
    }

    // 检查是否为空词条
    const affixName = getAffixNameByPos(type, index);
    const isEmpty = !affixName;

    if (isEmpty) {
        card.classList.add('empty');
        card.innerHTML = `
            <div class="xjzh-affix-top">
                <div class="xjzh-affix-tag ${type === 'prefix' ? 'xjzh-tag-prefix' : 'xjzh-tag-suffix'}"></div>
                <div class="xjzh-affix-content">
                    <div class="xjzh-affix-name">空词条</div>
                    <div class="xjzh-affix-prop">无属性</div>
                </div>
            </div>
        `;
    } else {
        const affixInfo = forgingState.ownAffixes[affixName];
        const valText = affixInfo.valType === 'num' ?
            `${affixInfo.val}` :
            `${affixInfo.val}%`;

        card.innerHTML = `
            <div class="xjzh-affix-top">
                <div class="xjzh-affix-tag ${type === 'prefix' ? 'xjzh-tag-prefix' : 'xjzh-tag-suffix'}"></div>
                <div class="xjzh-affix-content">
                    <div class="xjzh-affix-prop">${valText} ${affixInfo.desc}</div>
                </div>
                <div class="xjzh-affix-level-tag xjzh-tag-T${affixInfo.level}">T${affixInfo.level}</div>
            </div>
        `;
    }

    // 添加点击事件
    card.addEventListener('click', function () {
        selectPosition(type, index, isEmpty);
    });
}

// 获取指定位置的词条名称
function getAffixNameByPos(type, index) {
    for (let name in forgingState.ownAffixes) {
        const affix = forgingState.ownAffixes[name];
        if (affix.type === type && affix.index === index) {
            return name;
        }
    }
    return null;
}

// 选择锻造位置
function selectPosition(type, index, isEmpty) {
    // 清除之前的选择
    const prevSelected = document.querySelector('.xjzh-affix-card.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }

    // 设置新选择
    forgingState.selectPos = { type, index, isEmpty };

    // 高亮选中卡片
    const selectedCard = document.querySelector(`.xjzh-affix-card[data-type="${type}"][data-index="${index}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    // 更新提示文本
    const equipTip = document.getElementById('xjzh_equipTip');
    if (equipTip) {
        equipTip.textContent = `已选择${type === 'prefix' ? '前缀' : '后缀'}位置${index + 1}`;
        equipTip.className = 'xjzh-selected-tip';
    }

    // 显示材料选择区域
    showMaterialSelection();
}

// 显示材料选择区域
function showMaterialSelection() {
    const materialEmpty = document.getElementById('xjzh_materialEmpty');
    const materialList = document.getElementById('xjzh_materialList');
    const levelRate = document.getElementById('xjzh_levelRate');

    if (materialEmpty) materialEmpty.classList.add('xjzh-forge-hidden');
    if (materialList) {
        materialList.classList.remove('xjzh-forge-hidden');
        // 根据选中的位置类型过滤材料
        filterMaterialsByPosition();
    }
    if (levelRate) levelRate.classList.remove('xjzh-forge-hidden');
}

// 根据选中的位置类型过滤材料
function filterMaterialsByPosition() {
    const selectedPos = forgingState.selectPos;
    if (!selectedPos) return;

    const materialCards = document.querySelectorAll('.xjzh-material-card');

    materialCards.forEach(card => {
        const id = card.dataset.id;
        const mat = forgingState.materialAffixes[id];

        // 检查材料数量是否大于0
        const hasMaterial = mat.num > 0;

        // 检查材料类型是否匹配
        const isTypeMatch = mat.type === selectedPos.type || mat.type === 'both';

        // 如果材料数量大于0且类型匹配，则显示该材料
        if (hasMaterial && isTypeMatch) {
            card.classList.remove('xjzh-forge-hidden');
        } else {
            card.classList.add('xjzh-forge-hidden');
        }
    });

    // 检查是否有可用材料
    const visibleMaterials = document.querySelectorAll('.xjzh-material-card:not(.xjzh-forge-hidden)');
    const noMaterialTip = document.querySelector('.xjzh-no-material-tip');

    // 如果已有提示元素，先移除
    if (noMaterialTip) {
        noMaterialTip.remove();
    }

    // 如果没有可用材料，显示提示
    if (visibleMaterials.length === 0) {
        const materialList = document.getElementById('xjzh_materialList');
        if (materialList) {
            const tip = ui.create.div('.xjzh-no-material-tip', materialList);
            tip.innerHTML = `暂无可用的${selectedPos.type === 'prefix' ? '前缀' : '后缀'}材料`;
        }
    }
}


// 创建材料卡片
function createMaterialCards(container) {
    for (let id in forgingState.materialAffixes) {
        const mat = forgingState.materialAffixes[id];
        const card = ui.create.div('.xjzh-material-card', container);
        card.dataset.id = id;

        card.innerHTML = `
            <div class="xjzh-material-icon">${mat.name.charAt(0)}</div>
            <div class="xjzh-material-info">
                <div class="xjzh-material-name">${mat.name}</div>
                <div class="xjzh-material-num">拥有：${mat.num}个</div>
            </div>
            <div class="xjzh-material-type xjzh-type-${mat.type}">
                ${mat.type === 'prefix' ? '前缀' : mat.type === 'suffix' ? '后缀' : '通用'}
            </div>
        `;

        // 添加点击事件
        card.addEventListener('click', function () {
            selectMaterial(id);
        });
    }
}

// 选择材料
function selectMaterial(id) {
    // 清除之前的选择
    const prevSelected = document.querySelector('.xjzh-material-card.active');
    if (prevSelected) {
        prevSelected.classList.remove('active');
    }

    // 设置新选择
    forgingState.selectMat = forgingState.materialAffixes[id];

    // 高亮选中卡片
    const selectedCard = document.querySelector(`.xjzh-material-card[data-id="${id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }

    // 显示可用词条预览
    showAvailableAffixes(id);
}

// 显示可用词条预览
function showAvailableAffixes(matId) {
    const mat = forgingState.materialAffixes[matId];
    const previewTitle = document.getElementById('xjzh_affixPreviewTitle');
    const affixPreview = document.getElementById('xjzh_affixPreview');

    if (previewTitle) previewTitle.classList.remove('xjzh-forge-hidden');
    if (affixPreview) {
        affixPreview.classList.remove('xjzh-forge-hidden');
        affixPreview.innerHTML = '';

        mat.affixes.forEach(affix => {
            const item = ui.create.div('.xjzh-material-affix-item', affixPreview);
            item.classList.add(`xjzh-mat-${mat.type}`);
            item.innerHTML = `${affix.name} · ${affix.desc}`;
        });
    }

    // 显示锻造按钮
    const forgeBtn = document.getElementById('xjzh_forgeBtn');
    if (forgeBtn) {
        forgeBtn.classList.remove('xjzh-forge-hidden');
    }
}

// 真理化石功能
function truthFossilFunc() {
    if (forgingState.fossilNum <= 0) return;

    forgingState.fossilNum--;
    updateFossilBtn();

    // 重置所有词条数值（模拟效果）
    for (let name in forgingState.ownAffixes) {
        const affix = forgingState.ownAffixes[name];
        const rule = forgingState.levelRule[affix.level];
        affix.val = Math.floor(Math.random() * (rule.max - rule.min + 1)) + rule.min;
    }

    // 更新显示
    const affixCards = document.querySelectorAll('.xjzh-affix-card:not(.empty)');
    affixCards.forEach(card => {
        const type = card.dataset.type;
        const index = parseInt(card.dataset.index);
        const affixName = getAffixNameByPos(type, index);
        if (affixName) {
            const affixInfo = forgingState.ownAffixes[affixName];
            const valText = affixInfo.valType === 'num' ?
                `${affixInfo.val}` :
                `${affixInfo.val}%`;
            const propDiv = card.querySelector('.xjzh-affix-prop');
            if (propDiv) {
                propDiv.textContent = `${valText} ${affixInfo.desc}`;
            }
        }
    });

    alert('真理化石使用成功！所有词条数值已重新随机生成。');
}

// 更新真理化石按钮状态
function updateFossilBtn() {
    const fossilBtn = document.getElementById('xjzh_truthFossilBtn');
    const fossilNum = document.getElementById('xjzh_truthFossilNum');

    if (fossilNum) {
        fossilNum.textContent = forgingState.fossilNum;
    }

    if (fossilBtn) {
        if (forgingState.fossilNum <= 0) {
            fossilBtn.classList.add('disabled');
            fossilBtn.textContent = '真理化石不足';
        } else {
            fossilBtn.classList.remove('disabled');
            fossilBtn.innerHTML = `
                真理化石 · 重随所有词条数值
                <span>(消耗1个)</span>
            `;
        }
    }
}

// 开始锻造
function doForge() {
    if (!forgingState.selectPos || !forgingState.selectMat) {
        alert('请先选择锻造位置和材料！');
        return;
    }

    // 模拟锻造过程
    alert(`正在使用${forgingState.selectMat.name}锻造${forgingState.selectPos.type === 'prefix' ? '前缀' : '后缀'}词条...`);

    // 这里可以添加实际的锻造逻辑
    // 例如：消耗材料、随机生成词条等
}

// 初始化升阶容器
function initUpgradeWrap() {
    // 在T1词条卡片上添加升阶按钮
    const t1Cards = document.querySelectorAll('.xjzh-affix-card:not(.empty)');
    t1Cards.forEach(card => {
        const type = card.dataset.type;
        const index = parseInt(card.dataset.index);
        const affixName = getAffixNameByPos(type, index);
        if (affixName) {
            const affixInfo = forgingState.ownAffixes[affixName];
            if (affixInfo.level === 1) { // T1词条
                const upgradeWrap = ui.create.div('.xjzh-upgrade-wrap', card);
                const upgradeBtn = ui.create.div('.xjzh-upgrade-btn', '升阶', upgradeWrap);
                const preview = ui.create.div('.xjzh-upgrade-preview', 'T0预览', upgradeWrap);
                const cost = ui.create.div('.xjzh-upgrade-cost', `消耗${forgingState.upgradeCost[affixName]}个${forgingState.upgradeMat.name}`, upgradeWrap);

                upgradeBtn.addEventListener('click', function () {
                    upgradeAffix(affixName);
                });
            }
        }
    });
}

// 升阶词条
function upgradeAffix(affixName) {
    const affixInfo = forgingState.ownAffixes[affixName];
    const cost = forgingState.upgradeCost[affixName];
    const mat = forgingState.materialAffixes[forgingState.upgradeMat.id];

    if (mat.num < cost) {
        alert(`材料不足！需要${cost}个${mat.name}`);
        return;
    }

    // 消耗材料
    mat.num -= cost;
    updateMaterialDisplay();

    // 升阶到T0
    affixInfo.level = 0;
    const rule = forgingState.levelRule[0];
    affixInfo.val = Math.floor(Math.random() * (rule.max - rule.min + 1)) + rule.min;

    // 更新显示
    const card = document.querySelector(`.xjzh-affix-card[data-type="${affixInfo.type}"][data-index="${affixInfo.index}"]`);
    if (card) {
        card.classList.add('t0-card');
        const levelTag = card.querySelector('.xjzh-affix-level-tag');
        if (levelTag) {
            levelTag.className = 'xjzh-affix-level-tag xjzh-tag-T0';
            levelTag.textContent = 'T0';
        }
        const valText = affixInfo.valType === 'num' ?
            `${affixInfo.val}` :
            `${affixInfo.val}%`;
        const propDiv = card.querySelector('.xjzh-affix-prop');
        if (propDiv) {
            propDiv.textContent = `${valText} ${affixInfo.desc}`;
        }
        // 移除升阶按钮
        const upgradeWrap = card.querySelector('.xjzh-upgrade-wrap');
        if (upgradeWrap) {
            upgradeWrap.remove();
        }
    }

    alert(`${affixName}升阶成功！已成为T0终极词条！`);
}

// 更新材料显示
function updateMaterialDisplay() {
    const materialCards = document.querySelectorAll('.xjzh-material-card');
    materialCards.forEach(card => {
        const id = card.dataset.id;
        const mat = forgingState.materialAffixes[id];
        const numDiv = card.querySelector('.xjzh-material-num');
        if (numDiv) {
            numDiv.textContent = `拥有：${mat.num}个`;
        }
    });
}

// 重置所有选择
function resetAll() {
    // 清除位置选择
    forgingState.selectPos = null;
    const selectedCard = document.querySelector('.xjzh-affix-card.selected');
    if (selectedCard) {
        selectedCard.classList.remove('selected');
    }

    // 清除材料选择
    forgingState.selectMat = null;
    const activeCard = document.querySelector('.xjzh-material-card.active');
    if (activeCard) {
        activeCard.classList.remove('active');
    }

    // 重置提示文本
    const equipTip = document.getElementById('xjzh_equipTip');
    if (equipTip) {
        equipTip.textContent = '未选择打造位置';
        equipTip.className = 'xjzh-unselected-tip';
    }

    // 显示所有材料（清除过滤）
    const materialCards = document.querySelectorAll('.xjzh-material-card');
    materialCards.forEach(card => {
        card.classList.remove('xjzh-forge-hidden');
    });

    // 移除无材料提示
    const noMaterialTip = document.querySelector('.xjzh-no-material-tip');
    if (noMaterialTip) {
        noMaterialTip.remove();
    }

    // 隐藏相关区域
    const materialEmpty = document.getElementById('xjzh_materialEmpty');
    const materialList = document.getElementById('xjzh_materialList');
    const levelRate = document.getElementById('xjzh_levelRate');
    const previewTitle = document.getElementById('xjzh_affixPreviewTitle');
    const affixPreview = document.getElementById('xjzh_affixPreview');
    const forgeBtn = document.getElementById('xjzh_forgeBtn');

    if (materialEmpty) materialEmpty.classList.remove('xjzh-forge-hidden');
    if (materialList) materialList.classList.add('xjzh-forge-hidden');
    if (levelRate) levelRate.classList.add('xjzh-forge-hidden');
    if (previewTitle) previewTitle.classList.add('xjzh-forge-hidden');
    if (affixPreview) affixPreview.classList.add('xjzh-forge-hidden');
    if (forgeBtn) forgeBtn.classList.add('xjzh-forge-hidden');
}