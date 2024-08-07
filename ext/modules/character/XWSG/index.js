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
	lib.config.all.characters.push('XWSG');
	if(!lib.config.characters.includes('XWSG')) lib.config.characters.remove('XWSG');
	lib.translate['XWSG_character_config']='仙武三国';
	const XWSG={
		name:"XWSG",
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
	//无需复制素材，自动覆盖十周年UI卡牌素材
	if(game.getExtensionConfig('十周年UI','enable')&&lib.config.xjzh_tenuiCardcopy){
		if(typeof lib.decade_extCardImage!='object'){
			lib.decade_extCardImage = {};
		}
		let cardList=["xjzh_zengyi_shuangsheng_card","xjzh_card_chunfenghuayu","xjzh_card_fanyunfuyu","xjzh_card_zhizuijinmi","xjzh_card_tanhuayixian","xjzh_card_shenjimiaosuan"];
		for(let cardname in XWSG.card){
			if(cardname=="xjzh_zengyi_shuangsheng_card") continue;
			if(cardList.includes(cardname)) continue;
			let url = lib.assetURL+"extension/仙家之魂/image/cardimage/tenui/"+cardname+".webp";
			lib.decade_extCardImage[cardname] = url;
		}
	}
	/*if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.length){
		for(let name of game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character){
			if(!XWSG.character[name]) console.log('未在仙武三国武将包找到该武将');
			else{
				XWSG.character[name][4].remove('unseen');
				XWSG.character[name][4].remove('forbidai');
			}
		}
	}*/
	return XWSG;
});