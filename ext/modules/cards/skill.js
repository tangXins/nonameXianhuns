import { lib,game,ui,get,ai,_status } from "../../../../../noname.js";

const skills={
    //-----------------------卡牌技能-----------------
    ///装备牌
    "xjzh_card_yizhihuhuan_skill":{
        trigger:{
            source:"damageBefore",
        },
        priority:6,
        forced:true,
        firstDo:true,
        equipSkill:true,
        popup:false,
        async content(event,trigger,player){
            if(trigger.num<2){
                game.setNature(trigger,'thunder',false);
            }else{
                let list=[1,"ice",trigger.cards,trigger.card];
                if(trigger.source) list.push(trigger.source);
                else list.push("nosource");
                for(let i=0;i<trigger.num+1;i++){
                    trigger.player.damage.apply(trigger.player,list.slice(0));
                }
                trigger.changeToZero();
            }
        },
        ai:{
            thunderDamage:true,
            iceDamage:true,
        },
    },
    "xjzh_card_rongyankaijia_skill":{
        trigger:{
            player:"damageBefore",
        },
        forced:true,
        priority:20,
        firstDo:true,
        equipSkill:true,
        marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_card_rongyankaijia.png>`,
        intro:{
            name:"熔岩铠甲",
            content(storage,player){
                let num=0;
                for(let list of storage){
                    num+=list.find(evt=>{
                        return typeof evt==="number";
                    });
                }
                return `${get.translation(num)}点伤害将于你的回合结束时结算`;
            },
        },
        filter(event,player){
            if(player.hasSkillTag('unequip2')) return false;
            if (event.player.hasSkillTag("unequip",false,{
                    name: event.card?event.card.name:null,
                    target:player,
                    card:event.card,
                })
            ) return false;
            return true;
        },
        async content(event,trigger,player){
            let num=Math.ceil(trigger.num/2);
            if(game.hasNature(trigger,'fire')){
                trigger.changeToZero();
                game.log(player,"受到熔岩铠甲影响，防止火焰伤害");
                return;
            }else{
                trigger.num-=num;
                if(!player.storage[event.name]) player.storage[event.name]=[];
                let list=[num,trigger.nature,"notrigger"];
                list.push(trigger.source?trigger.source:"nosource");
                list.push(trigger.card?trigger.card:"nocard");
                player.storage.xjzh_card_rongyankaijia_skill.push(list);
                player.markSkill(event.name);


                let evt=event.getParent("phase");
                if(evt&&evt.getParent&&!evt.rongyankaijia_skill) evt.rongyankaijia_skill=true;
                if(evt&&evt.getParent&&evt.rongyankaijia_skill){
                    let next=game.createEvent('rongyankaijia_skill',false,evt.getParent());
                    next.player=player;
                    next.setContent(()=>{
                        if(player.storage.xjzh_card_rongyankaijia_skill){
                            let storage=player.storage.xjzh_card_rongyankaijia_skill.slice(0);
                            for(let damageList of storage){
                                if(player.isDead()) break;
                                player.damage(...(damageList.slice(0)));
                            }
                            if(player.isAlive()){
                                delete player.storage.xjzh_card_rongyankaijia_skill;
                                player.unmarkSkill("xjzh_card_rongyankaijia_skill");
                            }
                        }
                    });
                }
            }
        },
        ai:{
            nofire:true,
            effect:{
                target(card,player,target,current){
                    if(target.hasSkillTag('unequip2')) return;
                    if(player.hasSkillTag('unequip',false,{
                        name:card?card.name:null,
                        target:target,
                        card:card
                    })||player.hasSkillTag('unequip_ai',false,{
                        name:card?card.name:null,
                        target:target,
                        card:card
                    })) return;
                    if(game.hasNature(card,"fire")) return 0;
                    if(get.tag(card,"fireDamage")&&current<0) return 0;
                    return 0.5;
                },
            },
        },
    },
    "xjzh_card_rongyankaijia_skill2":{
        trigger:{
            player:"phaseJieshuBegin",
        },
        forced:true,
        priority:20,
        firstDo:true,
        equipSkill:true,
        mark:true,
        marktext:`<img style=width:20px src=${lib.assetURL}extension/仙家之魂/image/icon/xjzh_card_rongyankaijia.png>`,
        intro:{
            name:"熔岩铠甲",
            content(storage,player){
                let damageList=player.storage.xjzh_card_rongyankaijia_skill.slice(0);
                let num=0;
                for(let list of damageList){
                    num+=list.find(evt=>{
                        return typeof evt==="number";
                    });
                }
                return `${get.translation(num)}点伤害将于你的回合结束时结算`;
            },
        },
        filter(event,player){
            return player.storage.xjzh_card_rongyankaijia_skill&&player.storage.xjzh_card_rongyankaijia_skill.length;
        },
        async content(event,trigger,player){
            let storage=player.storage.xjzh_card_rongyankaijia_skill.slice(0);
            for await(let damageList of storage){
                if(player.isDead()) break;
                player.damage(...damageList.slice(0)).set("rongyankaijia",true);
            }
            if(player.isAlive()){
                delete player.storage.xjzh_card_rongyankaijia_skill;
                player.removeSkill("xjzh_card_rongyankaijia_skill2",true);
            }
        },
    },
    //------------------------End-----------------
};

export default skills;