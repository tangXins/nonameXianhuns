import { lib,get,_status,ui,game,ai } from '../../../../../noname.js';
import cards from './card.js';
import skills from './skill.js';
import lists from './list.js';
import translates from './translate.js';
export function xjzhCardPack(){
	game.import('card',function(){
        lib.config.all.cards.push('xjzh_Card');
		if(!lib.config.cards.includes('xjzh_Card')) lib.config.cards.remove('xjzh_Card');
		lib.translate['xjzh_Card_card_config']='仙家之魂';
		const xjzh_Card={
			name:'xjzh_Card',
			connect:true,
			card:{...cards},
			skill:{...skills},
			translate:{...translates},
			list:[...lists],
		};
		//无需复制素材，自动覆盖十周年UI卡牌素材
		if(game.getExtensionConfig('十周年UI','enable')&&lib.config.xjzh_tenuiCardcopy){
            if(typeof lib.decade_extCardImage!='object'){
                lib.decade_extCardImage = {};
            }
            for(let cardname in xjzh_Card.card){
                let url = lib.assetURL+"extension/仙家之魂/image/cardimage/tenui/"+cardname+".webp";
                lib.decade_extCardImage[cardname] = url;
            }
        }
		return xjzh_Card;
	});
};