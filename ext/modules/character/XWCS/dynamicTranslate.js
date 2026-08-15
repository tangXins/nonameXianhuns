import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const dynamicTranslates = {
	xjzh_qixia_niandong(player) {
		if (!player.hasSkill("xjzh_qixia_juneng")) return get.translation('xjzh_qixia_niandong_info');
		else {
			let num = Math.max(10 - player.getSkills(null, false, false).filter(skill => {
				let skills = player.getOriginalSkills();
				if (skills.includes(skill)) return false;
				if (!get.skillInfoTranslation(skill)) return false;
				if (lib.skill.global.includes(skill)) return false;
				return !get.is.locked(skill);
			}).length, 1);
			return `锁定技，每当你消耗魔力，你获得1点灵感素，最多${num}点，当你的灵感素达到上限时，你失去所有灵感素并在当前回合结束后执行一个额外的回合。`;
		}
	},
	xjzh_qixia_juneng(player) {
		let list = player.getSkills(null, false, false).filter(skill => {
			let skills = player.getOriginalSkills();
			if (skills.includes(skill)) return false;
			if (!get.skillInfoTranslation(skill)) return false;
			if (lib.skill.global.includes(skill)) return false;
			return true;
		})
			.reduce((acc, skill) => {
				get.is.locked(skill) ? acc[0].push(skill) : acc[1].push(skill);
				return acc;
			}, [[], []])
			.toUniqued();
		return `锁定技，你拥有${list[0].length}个锁定技，你的回合结束时回复${list[0].length * 10}点魔力，你拥有${list[1].length}个非锁定技，你的灵感素上限为${Math.max(10 - list[1].length, 1)}。`;
	},
	xjzh_qixia_tianshu(player) {
		if (game.getExtensionConfig('金庸群侠传', 'enable')) return get.translation('xjzh_qixia_tianshu_info');
		return '《金庸群侠传》扩展未安装或未开启，此技能不可用。'
	},
	xjzh_meiren_qingquan(player) {
		return !player.awakenedSkills.includes("xjzh_meiren_hanshuang") ? "锁定技，当你回复体力后，你获得一点护甲，然后你令一名其他角色随机执行一项：①回复一点体力；②摸一张牌；③获得一点护甲。若你已觉醒，目标执行所有项。" :
			"当你回复体力后，你获得两点护甲，然后你令任意名其他角色回复一点体力、摸一张牌、获得一点护甲。";
	},
	xjzh_meiren_juese(player) {
		let str = get.translation('xjzh_meiren_juese_info');
		if (!player.storage.xjzh_meiren_juese) return str;
		return str.replace(/一名其他角色/g, `${get.cnNumber(player.storage.xjzh_meiren_juese)}名其他角色`);
	},

};
export default dynamicTranslates;