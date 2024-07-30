import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";
import characters from "./character.js";
import cards from "./card.js";
import pinyins from "./pinyin.js";
import { starsSkills,poeSkills,wzrySkills,diabloSkills,dnfSkills,xiyouSkills } from './skills/index.js';
import translates from "./translate.js";
import characterIntros from "./intro.js";
import characterFilters from "./characterFilter.js";
import characterReplaces from "./characterReplace.js";
import dynamicTranslates from "./dynamicTranslate.js";
import characterTitles from "./characterTitle.js";
import voices from "./voices.js";
import { characterSort, characterSortTranslate } from "./sort.js";

game.import("character", function () {
	lib.config.all.characters.push('XWTR');
	if(!lib.config.characters.includes('XWTR')) lib.config.characters.remove('XWTR');
	lib.translate['XWTR_character_config']='仙武同人';
	const XWTR={
		name:"XWTR",
		connect:true,
		character:{...characters},
		characterSort:{...characterSort},
		characterFilter:{...characterFilters},
		characterTitle:{...characterTitles},
		dynamicTranslate:{...dynamicTranslates},
		characterIntro:{...characterIntros},
		characterReplace:{...characterReplaces},
		card:{...cards},
		skill:{...starsSkills,...starsSkills,...poeSkills,...wzrySkills,...diabloSkills,...dnfSkills,...xiyouSkills},
		translate:{...translates,...voices,...characterSortTranslate},
		pinyins: {...pinyins},
	};

	//无需复制素材，自动覆盖十周年UI卡牌素材
	if(game.getExtensionConfig('十周年UI','enable')&&lib.config.xjzh_tenuiCardcopy){
		if(typeof lib.decade_extCardImage!='object'){
			lib.decade_extCardImage = {};
		}
		let cardList=["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_zhaoyaojing","xjzh_card_huoyundao","xjzh_card_dingshenzhou"];
		for(let cardname in XWSG.card){
			if(cardList.includes(cardname)) continue;
			let url = lib.assetURL+"extension/仙家之魂/image/cardimage/tenui/"+cardname+".webp";
			lib.decade_extCardImage[cardname] = url;
		}
	}
	return XWTR;
});