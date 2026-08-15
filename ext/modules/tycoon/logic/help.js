import { setModalOpen } from './ui.js';

export { setModalOpen };

export function getHelpContent() {
	return [
		{ title: '🏰 绿洲核心', color: '#FFD700', content: '绿洲大亨的核心等级，决定所有区域的上限。通过对局胜利获取金币来升级核心等级，最高等级8级。' },
		{ title: '🚢 贸易舰队', color: '#00BCD4', content: '贸易舰队自动派遣，消耗金币获取碎片和制作材料。等级越高产出越丰厚，高等级有一定失败率。' },
		{ title: '🏪 商贸区', color: '#4CAF50', content: '商人交易：金币与制作材料互换。低买高卖，灵活调配资源。价格受商贸区等级影响。' },
		{ title: '⚒️ 锻造台', color: '#9C27B0', content: '消耗制作材料为奇术要件打造天赋。不同品质天赋需要不同等级的材料和锻造台等级。' },
		{ title: '💡 游戏流程', color: '#FF9800', content: '1. 对局胜利获取金币 → 升级核心\n2. 升级各区域等级 → 解锁更多功能\n3. 贸易舰队自动派遣 → 获取碎片和制作材料\n4. 使用商贸区 → 买卖制作材料\n5. 选择奇术要件 → 打造天赋词缀' }
	];
}

export function renderHelpSection(doc, sections, colors) {
	var html = '';
	sections.forEach(function(s) {
		var color = colors[s.color] || s.color || '#FFD700';
		html += '<div style="background:rgba(255,255,255,0.05);border-left:3px solid ' + color + ';border-radius:8px;padding:12px 14px;margin-bottom:10px;">' +
			'<div style="color:' + color + ';font-weight:bold;font-size:14px;margin-bottom:6px;">' + s.title + '</div>' +
			'<div style="color:rgba(255,255,255,0.7);font-size:12px;line-height:1.6;white-space:pre-line;">' + s.content + '</div>' +
		'</div>';
	});
	return html;
}

export function showHelp(doc, getHelpContentFn, renderHelpSectionFn, qualityColors, hexToRgbaFn, setModalOpenFn) {
	var sections = getHelpContentFn();

	var sectionsHtml = renderHelpSectionFn(doc, sections, qualityColors);

	var overlay = doc.createElement('div');
	overlay.style.cssText = 'position:fixed !important;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:999999;display:flex !important;align-items:center;justify-content:center;';

	var box = doc.createElement('div');
	box.style.cssText = 'position:relative !important;width:500px;max-height:80vh;background:linear-gradient(160deg,#1a1a2e,#16213e);border:2px solid #FFD700;border-radius:16px;box-shadow:0 0 40px rgba(255,215,0,0.5);padding:20px;box-sizing:border-box;overflow:hidden;display:flex;flex-direction:column;';

	var title = doc.createElement('div');
	title.style.cssText = 'color:#FFD700;font-size:22px;font-weight:bold;text-align:center;margin-bottom:15px;text-shadow:0 0 10px rgba(255,215,0,0.6);';
	title.textContent = '📖 绿洲大亨帮助说明';

	var content = doc.createElement('div');
	content.style.cssText = 'overflow-y:auto;flex:1;padding-right:10px;scrollbar-width:none;-ms-overflow-style:none;';
	content.innerHTML = sectionsHtml;

	var style = doc.createElement('style');
	style.textContent = '::-webkit-scrollbar{display:none;}';
	content.appendChild(style);

	var btnBar = doc.createElement('div');
	btnBar.style.cssText = 'display:flex;justify-content:center;margin-top:15px;padding-top:10px;border-top:1px solid rgba(255,215,0,0.3);';

	var closeBtn = doc.createElement('div');
	closeBtn.style.cssText = 'padding:10px 30px;background:linear-gradient(135deg,#FFD700,#FFA500);color:#000;border-radius:8px;cursor:pointer;font-weight:bold;font-size:14px;';
	closeBtn.textContent = '知道了';
	closeBtn.addEventListener('click', function() {
		overlay.remove();
		setModalOpenFn(false);
	});

	btnBar.appendChild(closeBtn);
	box.appendChild(title);
	box.appendChild(content);
	box.appendChild(btnBar);
	overlay.appendChild(box);
	setModalOpenFn(true);

	overlay.addEventListener('click', function(e) {
		if (e.target === overlay) {
			overlay.remove();
			setModalOpenFn(false);
		}
	});

	doc.body.appendChild(overlay);
}