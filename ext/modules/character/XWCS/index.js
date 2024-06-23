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

export function XWCSINIT(){
	game.import("character", function () {
		lib.config.all.characters.push('XWCS');
		if(!lib.config.characters.includes('XWCS')) lib.config.characters.remove('XWCS');
		lib.translate['XWCS_character_config']='仙武创世';
		const XWCS={
			name:"XWCS",
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
		if(true){
			for(let i in XWCS.character){
				//阵亡配音
				XWCS.character[i][4].push('xjzh_die_audio');
				XWCS.character[i][4].push(`die:ext:仙家之魂/audio/die:true`);
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWCS.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWCS.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(let i in XWCS.character){
				XWCS.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
		return XWCS;
	});
};
