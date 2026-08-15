import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

let Group = function (str1, str2) {
	if (!str2) return str1;
	if (get.mode() == "xjzh_challenge") return str1;
	return game.getExtensionConfig("仙家之魂", "xjzh_changeGroup") ? str2 : str1;
};

const characters = {
	"xjzh_boss_lvbu": {
		sex: "male",
		group: "shen",
		hp: 6,
		skills: ["xjzh_boss_jiwu", "xjzh_boss_feijiang", "xjzh_boss_benxi", "xjzh_boss_xiuluo"],
		names: "吕|布",
		rank: "legend",
		isBoss: true,
		isBossAllowed: true,
	},

};


for (let i in characters) {
	if (!characters[i].trashBin) characters[i].trashBin = [];
	let array = ["ext:仙家之魂/skin/yuanhua/" + i + ".jpg", "xjzh_die_audio"];
	if (game.getExtensionConfig("仙家之魂", "xjzh_lutoupifu") === true) array.splice(0, 1, "ext:仙家之魂/skin/lutou/" + i + ".jpg");
	characters[i].trashBin.addArray(array);

	if (!characters[i].dieAudios) characters[i].dieAudios = [];
	characters[i].dieAudios.add("ext:仙家之魂/audio/die/" + i + ".mp3");
};

export default characters;