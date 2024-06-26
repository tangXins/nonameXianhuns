import { lib,game,ui,get,ai,_status } from "../../../../../noname.js";

const skills={
    //-----------------------卡牌技能-----------------
    ///装备牌
    //霜燃
    "xjzh_card_shuangran_skill":{
        trigger:{
            source:["damageBegin","damageAfter"],
        },
        filter:function(event,player){
            return player.storage.xjzh_card_shuangran_skill;
        },
        equipSkill:true,
        forced:true,
        content:function(){
            var list=player.storage.xjzh_card_shuangran_skill;
            for(var i in list){
                switch(i){
                    case "baojilv":
                    if(event.triggername=="damageBegin"){
                        var num=list[i];
                        if(Math.random()<=num/100) game.xjzh_Criticalstrike(player,trigger.num,2);
                    }
                    break;
                    case "recover":
                    if(event.triggername=="damageBegin"){
                        var num=list[i];
                        if(Math.random()<=0.05&&player.isDamaged()) player.recover(num);
                    }
                    break;
                    case "yishang":
                    if(event.triggername=="damageAfter"){
                        var num=list[i];
                        if(Math.random()<=num[0]/100) trigger.player.changexjzhBUFF('yishang',num[1]);
                    }
                    break;
                    case "ranshao":
                    if(event.triggername=="damageAfter"){
                        var num=list[i];
                        if(Math.random()<=num[0]/100) trigger.player.changexjzhBUFF('ranshao',num[1]);
                    }
                    break;
                }
                //player.logSkill("xjzh_card_shuangran_skill");
            }
        },
    },
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
    "xjzh_card_wuxian_skill":{
        equipSkill:true,
        subSkill:{
            "fanshe":{
                trigger:{
                    player:"damageBegin",
                },
                direct:true,
                priority:10,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_fanshe) player.storage.xjzh_card_wuxian_skill_fanshe=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_fanshe
                    if(!event.source||event.source.isDead()) return false;
                    if(event.getParent('xjzh_card_wuxian_skill_fanshe').name=="xjzh_card_wuxian_skill_fanshe") return false;
                    return Math.random()<=num;
                },
                content:function(){
                    trigger.source.damage(trigger.num,trigger.source,trigger.nature);
                    trigger.changeToZero();
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，反射此次伤害");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(!target.hasFriend()) return;
                            if(get.tag(card,'damage')) return [1.5,1];
                        }
                    },
                },
            },
            "zhufu":{
                trigger:{
                    player:"damageBegin",
                },
                direct:true,
                priority:9,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_zhufu) player.storage.xjzh_card_wuxian_skill_zhufu=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_zhufu
                    return Math.random()<=num;
                },
                content:function(){
                    player.draw();
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，"+get.translation(player)+"摸了1张牌");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(!target.hasFriend()) return;
                            if(get.tag(card,'damage')) return [1.5,1];
                        }
                    },
                },
            },
            "jianren":{
                trigger:{
                    player:"damageAfter",
                },
                direct:true,
                priority:10,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_jianren) player.storage.xjzh_card_wuxian_skill_jianren=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_jianren
                    return Math.random()<=num;
                },
                content:function(){
                    player.recover();
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，"+get.translation(player)+"回复了1点体力");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(!target.hasFriend()) return;
                            if(get.tag(card,'damage')) return [2,1];
                        }
                    },
                },
            },
            "jujiao":{
                trigger:{
                    global:"useCard2",
                },
                direct:true,
                priority:10,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_jujiao) player.storage.xjzh_card_wuxian_skill_jujiao=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_jujiao
                    if(!event.cards||!event.cards.length) return false;
                    if(event.card.name!="sha") return false;
                    if(!event.targets||!event.targets.includes(player)) return false;
                    return Math.random()<=num;
                },
                content:function(){
                    game.delay(1.5)
                    trigger.targets.push(player);
                    //trigger.player.useCard({name:'sha',isCard:true},player,false).set('addCount',false);
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，"+get.translation(trigger.player)+"使用的【杀】额外生效一次");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(get.name(card)=="sha") return [1,2];
                        }
                    },
                },
            },
            "pomo":{
                trigger:{
                    player:"damageBegin",
                },
                direct:true,
                priority:13,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_pomo) player.storage.xjzh_card_wuxian_skill_pomo=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_pomo
                    if(!event.nature) return false;
                    return Math.random()<=num;
                },
                content:function(){
                    trigger.num++
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，"+get.translation(player)+"受到属性伤害+1");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(get.nature(card)) return [1,2];
                        }
                    },
                },
            },
            "liuguang":{
                trigger:{
                    target:"useCardToTargeted",
                },
                direct:true,
                priority:12,
                firstDo:true,
                equipSkill:true,
                sub:true,
                init:function(player){
                    var num=get.rand(30,50);
                    if(!player.storage.xjzh_card_wuxian_skill_liuguang) player.storage.xjzh_card_wuxian_skill_liuguang=num
                },
                filter:function(event,player){
                    var num=player.storage.xjzh_card_wuxian_skill_liuguang
                    if(player.countCards('he')<=0) return false;
                    return !get.tag(event.card,'damage')&&Math.random()<=num;
                },
                content:function(){
                    player.randomDiscard();
                    game.log("<span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill")+"</span>效果触发，"+get.translation(player)+"随机弃置1张牌");
                },
                ai:{
                    effect:{
                        target:function(card,player,target){
                            if(!get.tag(card,'damage')) return [1,2];
                        }
                    },
                },
            },
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
                            delete player.storage.xjzh_card_rongyankaijia_skill;
                            player.unmarkSkill("xjzh_card_rongyankaijia_skill");
                        }
                    });
                }
            }
        },
        ai:{
            nofire:true,
            effect:{
                target:function(card,player,target,current){
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
    "xjzh_card_xiejiaozhiguan_skill":{
        trigger:{
            player:["addSkill","removeSkill"],
        },
        silent:true,
        priority:Infinity,
        lastDo:true,
        filter:function(event,player){
            var skill=event.skill;
            var info=get.info(skill);
            if(!info||!info.usable) return false;
            return true;
        },
        content:function(){
            "step 0"
            lib.card["xjzh_card_xiejiaozhiguan"].onLose(player);
            "step 1"
            lib.card["xjzh_card_xiejiaozhiguan"].onEquip(player);
        },
    },
    //------------------------End-----------------
};

export default skills;