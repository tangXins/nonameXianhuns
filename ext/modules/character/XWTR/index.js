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

export function XWTRINIT(){
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
			skill:{...skills},
			translate:{...translates,...voices,...characterSortTranslate},
			pinyins: {...pinyins},
		};
		if(true){
			for(let i in XWTR.character){
			    //阵亡配音
				XWTR.character[i][4].push('xjzh_die_audio');
                //加载露头
                if(lib.config.extension_仙家之魂_xjzh_lutoupifu){
                    XWTR.character[i][4].push('ext:仙家之魂/skin/lutou/'+i+'.jpg');
                }else{
                    XWTR.character[i][4].push('ext:仙家之魂/skin/yuanhua/'+i+'.jpg');
                }
			}
		}
		else{
			for(let i in XWTR.character){
				XWTR.character[i][4].push('db:extension-仙家之魂:'+i+'.jpg');
			}
		}
        for(let i in XWTR.skill){
            let info=XWTR.skill[i];
            if(info.marktext2) info.marktext2=info.marktext;
            if(info.subSkill){
                for(let j in info.subSkill){
                    if(info.subSkill[j].marktext2) info.subSkill[j].marktext2=info.subSkill[j].marktext;
                }
            }
        }
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
		if(game.getExtensionConfig("仙家之魂","xjzhAchiStorage")&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character&&game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character.length){
			for(let name of game.getExtensionConfig("仙家之魂","xjzhAchiStorage").character){
				if(!XWTR.character[name]) console.log('未在仙武同人武将包找到该武将');
				else{
					XWTR.character[name][4].remove('unseen');
					XWTR.character[name][4].remove('forbidai');
				}
			}
		}
		return XWTR;
	});
};