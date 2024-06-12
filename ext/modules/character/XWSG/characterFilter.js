import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const characterFilters = {
    'xjzh_sanguo_yuji':function(mode){
        if(mode=="identity") return true;
    },
    /*'xjzh_sanguo_espzhangjiao':function(mode){
        return false;
    },
    'xjzh_sanguo_espzuoci':function(mode){
        return false;
    },*/

};

export default characterFilters;