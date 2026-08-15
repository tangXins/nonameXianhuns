import { lib, get, _status, ui, game, ai } from '../../../../../noname.js';
import cards from './card.js';
import skills from './skill.js';
import lists from './list.js';
import translates from './translate.js';

game.import('card', function () {
	lib.config.all.cards.push('xjzh_Card');
	if (!lib.config.cards.includes('xjzh_Card')) lib.config.cards.remove('xjzh_Card');
	lib.translate['xjzh_Card_card_config'] = '仙家之魂';
	const xjzh_Card = {
		name: 'xjzh_Card',
		connect: true,
		card: { ...cards },
		skill: { ...skills },
		translate: { ...translates },
		list: [...lists],
	};

	return xjzh_Card;
});