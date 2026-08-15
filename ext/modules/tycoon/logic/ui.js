var isModalOpen = false;

export function setModalOpen(val) {
	isModalOpen = val;
}

export function getModalOpen() {
	return isModalOpen;
}

export function hexToRgba(hex, alpha) {
	var r = parseInt(hex.slice(1, 3), 16);
	var g = parseInt(hex.slice(3, 5), 16);
	var b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r},${g},${b},${alpha})`;
}

export function showToast(doc, message) {
	var toast = doc.createElement('div');
	toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:15px 30px;border-radius:10px;z-index:999999;font-size:14px;text-align:center;border:1px solid rgba(255,152,0,0.5);box-shadow:0 0 20px rgba(255,152,0,0.3);';
	toast.textContent = message;
	doc.body.appendChild(toast);
	setTimeout(function() {
		toast.style.transition = 'opacity 0.3s';
		toast.style.opacity = '0';
		setTimeout(function() { toast.remove(); }, 300);
	}, 2000);
}

export function showMaterialDetail(doc, mat, tycoonData, qualityColors) {
	var stock = tycoonData.forgeMaterials[mat.id] || 0;
	var rarityColor = qualityColors[mat.rarity] || '#9E9E9E';

	var useForHtml = (mat.useFor || []).map(function(u) {
		return '<span style="display:inline-block;padding:3px 8px;margin:2px;background:' + hexToRgba(rarityColor, 0.15) + ';border-radius:10px;color:' + rarityColor + ';font-size:11px;">' + u + '</span>';
	}).join('');

	var obtainHtml = (mat.obtainFrom || []).map(function(o) {
		return '<div style="color:rgba(255,255,255,0.7);font-size:12px;margin:2px 0;">• ' + o + '</div>';
	}).join('');

	var overlay = doc.createElement('div');
	overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:999998;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.25s ease;';

	var box = doc.createElement('div');
	box.style.cssText = 'width:360px;max-width:90vw;background:linear-gradient(160deg,#1a1a2e,#16213e);border:2px solid ' + rarityColor + ';border-radius:14px;padding:18px;box-shadow:0 0 30px ' + hexToRgba(rarityColor, 0.4) + ';opacity:0;transform:scale(0.92);transition:opacity 0.25s ease,transform 0.25s ease;';

	box.innerHTML = '' +
		'<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">' +
			'<div style="font-size:36px;">' + mat.icon + '</div>' +
			'<div>' +
				'<div style="color:' + rarityColor + ';font-size:18px;font-weight:bold;">' + mat.name + '</div>' +
				'<div style="color:' + rarityColor + ';font-size:11px;padding:2px 8px;background:' + hexToRgba(rarityColor, 0.2) + ';border-radius:10px;display:inline-block;">' + mat.rarity + ' · Lv.' + mat.level + '</div>' +
			'</div>' +
			'<div style="margin-left:auto;color:#FFD700;font-weight:bold;">×' + stock + '</div>' +
		'</div>' +
		'<div style="color:rgba(255,255,255,0.6);font-size:12px;margin-bottom:12px;padding:8px;background:rgba(255,255,255,0.05);border-radius:8px;">' + (mat.desc || '') + '</div>' +
		'<div style="margin-bottom:12px;">' +
			'<div style="color:' + rarityColor + ';font-size:12px;font-weight:bold;margin-bottom:6px;">🔨 用途</div>' +
			'<div>' + (useForHtml || '<span style="color:rgba(255,255,255,0.4);font-size:12px;">暂无</span>') + '</div>' +
		'</div>' +
		'<div style="margin-bottom:14px;">' +
			'<div style="color:' + rarityColor + ';font-size:12px;font-weight:bold;margin-bottom:6px;">📍 获取途径</div>' +
			(obtainHtml || '<span style="color:rgba(255,255,255,0.4);font-size:12px;">暂无</span>') +
		'</div>' +
		'<div style="text-align:center;">' +
			'<div class="action-btn" id="mat-detail-close" style="display:inline-block;background:linear-gradient(135deg,' + rarityColor + ',' + rarityColor + 'CC);color:#fff;padding:8px 30px;border-radius:8px;cursor:pointer;font-weight:bold;font-size:13px;">关闭</div>' +
		'</div>';

	overlay.appendChild(box);
	doc.body.appendChild(overlay);

	requestAnimationFrame(function() {
		overlay.style.opacity = '1';
		box.style.opacity = '1';
		box.style.transform = 'scale(1)';
	});

	function close() {
		overlay.style.opacity = '0';
		box.style.opacity = '0';
		box.style.transform = 'scale(0.92)';
		setTimeout(function() {
			overlay.remove();
		}, 250);
	}

	box.querySelector('#mat-detail-close').addEventListener('click', close);
	overlay.addEventListener('click', function(e) {
		if (e.target === overlay) close();
	});
}