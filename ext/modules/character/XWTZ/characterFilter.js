import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characterFilters = {
    'xjzh_boss_waershen':function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    "xjzh_boss_geligaoli":function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    "xjzh_boss_duruier":function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    "xjzh_boss_qier":function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    "xjzh_boss_bingchuanjushou":function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    "xjzh_boss_lilisi":function(mode){
        if(mode!='boss'||!lib.config.xjzh_qishuyaojianOption) return false;
    },
    'xjzh_boss_lvbu':function(mode){
        if(mode!='boss') return false;
    },
    'xjzh_boss_zuoyou':function(mode){
        if(mode!='boss') return false;
    },
    'xjzh_boss_zhangjiao':function(mode){
        if(mode!='boss') return false;
    },
    'xjzh_boss_hjbingyong':function(mode){
        return false;
    },
    'xjzh_boss_hjlishi':function(mode){
        return false;
    },
    'xjzh_boss_hjshushi':function(mode){
        return false;
    },
    'xjzh_boss_hjfangshi':function(mode){
        return false;
    },
    'xjzh_boss_hjguishi':function(mode){
        return false;
    },

};

export default characterFilters;