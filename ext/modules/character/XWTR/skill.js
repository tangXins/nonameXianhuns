import { starsSkills } from './skills/zxzh.js';
import { poeSkills } from './skills/poe.js';
import { wzrySkills } from './skills/wzry.js';
import { diabloSkills } from './skills/diablo.js';
import { dnfSkills } from './skills/dnf.js';
import { xiyouSkills } from './skills/xiyou.js';

const skills = { ...starsSkills, ...starsSkills, ...poeSkills, ...wzrySkills, ...diabloSkills, ...dnfSkills, ...xiyouSkills };

export default skills;