import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";
import characters from "./character.js";
import cards from "./card.js";
import pinyins from "./pinyin.js";
import skills from "./skill.js";
import translates from "./translate.js";
import characterIntros from "./intro.js";
import characterFilters from "./characterFilter.js";
import characterReplaces from "./characterReplace.js";
import dynamicTranslates from "./dynamicTranslate.js";
import characterTitles from "./characterTitle.js";
import voices from "./voices.js";
import { characterSort, characterSortTranslate } from "./sort.js";

game.import("character", function () {
	if(!lib.config.characters.includes('XWTZ')) lib.config.characters.remove('XWTZ');
	lib.translate['XWTZ_character_config']='仙武挑战';
	const XWTZ={
		name:"XWTZ",
		connect:false,
		character:{...characters},
		characterSort:{...characterSort},
		characterFilter:{...characterFilters},
		characterTitle:{...characterTitles},
		dynamicTranslate:{...dynamicTranslates},
		characterIntro:{...characterIntros},
		characterReplace:{...characterReplaces},
		card:{...cards},
		skill:{...skills},
		translate:{...translates,...voices,...characterSortTranslate},
		pinyins: {...pinyins},
	};
	return XWTZ;
});