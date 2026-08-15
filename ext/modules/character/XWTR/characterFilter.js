import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characterFilters = {
    'xjzh_diablo_lamasi':function(mode){
        if(mode=="identity") return true;
    },
    /*'xjzh_diablo_yafeikela':function(mode){
        if(get.xjzh_device()=="android"){
            if(get.xjzh_kernel()=="webkit") return true;
        };
        return false;
    },*/
    'xjzh_diablo_xiong':function(mode){
        return false;
    },
    'xjzh_diablo_lang':function(mode){
        return false;
    },
    'xjzh_dnf_jianshen':function(mode){
        return false;
    },
    'xjzh_dnf_shengqi':function(mode){
        return false;
    },

};

export default characterFilters;