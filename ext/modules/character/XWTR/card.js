import { lib, game, ui, get, ai, _status } from "../../../../../../noname.js";

const cards={
    "xjzh_card_tianganghuo":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_tianganghuo.png",
        derivation:"xjzh_xyj_sunwukong",
        fullskin:true,
        type:"basic",
        toself:true,
        enable(event,player){
            if(!player.hasSkill("xjzh_xyj_tianhuo")) return false;
            return get.is.playerNames(player,"xjzh_xyj_sunwukong");
        },
        selectTarget:-1,
        filterTarget(card,player,target){
            return target==player;
        },
        async content(event,trigger,player){
            player.addMark("xjzh_xyj_tianhuo",1,false);
        },
        ai:{
            basic:{
                order:7.2,
                useful:4.5,
                value:9.2
            },
            result:{
                target:1,
            },
            tag:{
                draw:1,
            }
        },
    },
    "xjzh_card_hunyuandan":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_hunyuandan.png",
        derivation:"xjzh_xyj_sunwukong",
        fullskin:true,
        type:"basic",
        toself:true,
        enable(event,player){
            if(!player.hasSkill("xjzh_xyj_tianhuo")) return false;
            return get.is.playerNames(player,"xjzh_xyj_sunwukong");
        },
        selectTarget:-1,
        modTarget:true,
        filterTarget(card,player,target){
            return target==player;
        },
        async content(event,trigger,player){
            let num=player.countCards("h",card=>{
                return ["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_zhaoyaojing","xjzh_card_huoyundao","xjzh_card_dingshenzhou"].includes(get.name(card));
            });
            player.drawTo(player.maxHp+num);
        },
        ai:{
            basic:{
                order:7.2,
                useful:4.5,
                value:9.2
            },
            result:{
                target(player,target,card){
                    let num=player.countCards("h",card=>{
                        return ["xjzh_card_tianganghuo","xjzh_card_hunyuandan","xjzh_card_zhaoyaojing","xjzh_card_huoyundao","xjzh_card_dingshenzhou"].includes(get.name(card));
                    });
                    let num2=player.countCards("h")-num;
                    return player.maxHp-num;
                },
            },
            tag:{
                draw:1,
            }
        },
    },
    "xjzh_card_zhaoyaojing":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_zhaoyaojing.png",
        derivation:"xjzh_xyj_sunwukong",
        fullskin:true,
        type:"basic",
        toself:true,
        enable(event,player){
            if(!player.hasSkill("xjzh_xyj_tianhuo")) return false;
            return get.is.playerNames(player,"xjzh_xyj_sunwukong");
        },
        selectTarget:1,
        filterTarget(card,player,target){
            if(!target.countCards("h",{suit:"diamond"})) return false;
            return target!=player;
        },
        async content(event,trigger,player){
            const cards=await event.targets[0].chooseToDiscard("h",{suit:"diamond"})
            .set("selectCard",()=>event.targets[0].countCards("h",{suit:"diamond"}))
            .set("ai",card=>{
                return 4-get.value(card);
            })
            .forResultCards();
            if(!cards) event.targets[0].loseMaxHp();

        },
        ai:{
            basic:{
                order:7.2,
                useful:4.5,
                value:9.2
            },
            result:{
                target:-1,
            },
            tag:{
                loseCard:1,
            }
        },
    },
    "xjzh_card_huoyundao":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_huoyundao.png",
        derivation:"xjzh_xyj_sunwukong",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        skills:["zhuque_skill"],
        distance:{attackFrom:-3},
        ai:{
            basic:{
                equipValue:2,
            },
        },
    },
    "xjzh_card_dingshenzhou":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_dingshenzhou.png",
        derivation:"xjzh_xyj_sunwukong",
        fullskin:true,
        type:"basic",
        toself:true,
        enable(event,player){
            if(!player.hasSkill("xjzh_xyj_tianhuo")) return false;
            return get.is.playerNames(player,"xjzh_xyj_sunwukong");
        },
        selectTarget:1,
        filterTarget(card,player,target){
            let history=player.getHistory("useCard",evt=>evt.card&&get.name(evt.card)=="xjzh_card_dingshenzhou"&&evt.targets.includes(target));
            if(history.length) return false;
            return target!=player;
        },
        async content(event,trigger,player){
            let target=event.targets[0];
            target.skip("phaseUse");
            target.skip("phaseDiscard");
        },
        ai:{
            basic:{
                order:7.2,
                useful:4.5,
                value:9.2
            },
            result:{
                target:-1,
            },
            tag:{
                skip:1,
            }
        },
    },
    "xjzh_card_mojianklls":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_mojianklls.png",
        derivation:"xjzh_dnf_suodeluosi",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        subtype2:"xjzh_jujian",
        skills:["xjzh_card_mojianklls_skill"],
        distance:{attackFrom:-2},
        ai:{
            basic:{
                equipValue:3
            }
        },
    },
    "xjzh_card_julihjc":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_julihjc.png",
        derivation:"xjzh_dnf_suodeluosi",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        subtype2:"xjzh_dunqi",
        skills:["xjzh_card_julihjc_skill"],
        distance:{attackFrom:-1},
        ai:{
            basic:{
                equipValue:3
            }
        },
    },
    "xjzh_card_tianjigyx":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_tianjigyx.png",
        derivation:"xjzh_dnf_suodeluosi",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        subtype2:"xjzh_guangjian",
        skills:["xjzh_card_tianjigyx_skill"],
        distance:{attackFrom:-3},
        ai:{
            basic:{
                equipValue:3
            }
        },
    },
    "xjzh_card_guanshizhengzong":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_guanshizhengzong.png",
        derivation:"xjzh_dnf_suodeluosi",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        subtype2:"xjzh_taidao",
        skills:["xjzh_card_guanshizhengzong_skill"],
        distance:{attackFrom:-3},
        ai:{
            basic:{
                equipValue:3
            }
        },
    },
    "xjzh_card_tiancongyunjian":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_tiancongyunjian.png",
        derivation:"xjzh_dnf_suodeluosi",
        fullskin:true,
        type:"equip",
        subtype:"equip1",
        subtype2:"xjzh_duanjian",
        skills:["xjzh_card_tiancongyunjian_skill"],
        //distance:{attackFrom:-1},
        ai:{
            basic:{
                equipValue:3
            }
        },
    },

};

export default cards;