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
	lib.config.all.characters.push('JLBC');
	if(!lib.config.characters.includes('JLBC')) lib.config.characters.remove('JLBC');
	lib.translate['JLBC_character_config']='极略补充';
	const JLBC={
		name:"JLBC",
		connect:true,
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
	return JLBC;
});