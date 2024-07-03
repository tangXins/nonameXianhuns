import { lib,game,ui,get,ai,_status} from "../../../../../noname.js";
import { xjzhMathList } from '../mathList/index.js';

const cards={
    //--------------------基本牌-------------------
    "xjzh_card_zhishijingsai":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_zhishijingsai.png",
        fullskin:true,
        type:"basic",
        toself:true,
        enable(event,player){
            return true;
        },
        selectTarget:-1,
        filterTarget(card,player,target){
            return target==player;
        },
        async content(event,trigger,player){
            let num=0;
            let num2=0;
            let num3=get.xjzh_rands(1,64,5);
            let mathList=xjzhMathList;
            while(num3.length){
                let num4=num3.shift();
                let answerNum=mathList[num4]['answer'];
                let dialog=ui.create.dialog(`【知识竞赛】：请选择正确答案${Array.isArray(answerNum)?`（多选题，限选${answerNum.length}项）`:`（单选题）`}`,'hidden');
                let question=mathList[num4]["question"];
                let option=mathList[num4]["option"];
                dialog.addText(`${num+1}、试题：${question}<br><br>`);
                dialog.add([option,'textbutton']);
                const [bool,links]=await player.chooseButton(dialog,Array.isArray(answerNum)?answerNum.length:1).set('ai',function(button){
                    return Math.random();
                }).forResult('bool','links');
                if(bool&&links){
                    let num5=0;
                    let str="正确答案是：";
                    if(Array.isArray(answerNum)){
                        for await(let answers of answerNum){
                            let answer=mathList[num4]["option"][answers];
                            if(links.includes(answer)) num5++;
                            str+=`${answer}${answerNum.indexOf(answers)!=answerNum.length-1?"、":""}`;
                        }
                        if(num5==answerNum.length) num2++;
                    }else{
                        let answer=mathList[num4]["option"][answerNum];
                        if(links[0]==answer){
                            num2++;
                            num5++;
                        }else{
                            str+=answer;
                        }
                    }
                    if(Array.isArray(answerNum)?num5!=answerNum.length:num5==0){
                        dialog=ui.create.dialog(`【知识竞赛】：请选择正确答案${Array.isArray(answerNum)?`（多选题，限选${answerNum.length}项）`:`（单选题）`}`,'hidden');
                        dialog.addText(`${num+1}、试题：${question}<br><br>`);
                        dialog.add([option,'textbutton']);
                        dialog.addText("很遗憾，你答错了!");
                        dialog.addText(str);
                        player.chooseControl("ok").set('dialog',dialog);
                    }
                }
            }
            game.log(player,"答对",num2,"道题，答错",5-num2,"道题");
            switch(num2){
                case 0:
                player.damage(1,'nocard','nosource');
                player.chooseToDiscard(1,'he',true);
                break;
                case 1:
                player.chooseToDiscard(1,'he',true);
                break;
                case 2:
                player.draw();
                break;
                case 3:
                player.draw(2);
                break;
                case 4:
                player.draw(3);
                player.recover();
                break;
                case 5:
                player.draw(3);
                player.recover();
                let listEquip=[
                    'equip1',
                    'equip2',
                    'equip3',
                    'equip4',
                    'equip5',
                ];
                while(listEquip.length){
                    var pos=listEquip.shift();
                    if(player.hasEmptySlot(pos)){
                        var equip=get.cardPile(function(card){
                            return get.type(card)=='equip'&&get.subtype(card)==pos;
                        });
                        if(equip){
                            player.equip(equip);
                            player.$gain2(equip,false);
                        };
                    };
                };
                break;
            }
        },
        ai:{
            basic:{
                order:7.2,
                useful:4.5,
                value:9.2
            },
            result:{
                target:2,
            },
            tag:{
                draw:2,
            }
        },
    },
    "xjzh_card_mingyunyingbi":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_mingyunyingbi.png",
        fullskin:true,
        type:"basic",
        toself:true,
        enable:function(event,player){
            return true;
        },
        selectTarget:-1,
        filterTarget:function(card,player,target){
            return target==player;
        },
        content:function(){
            //var player=_status.event.player
            if(Math.random()<=0.5){
                if(target.isHealthy()) game.log(target,'使用了','#y【'+get.translation(card)+'】','无事发生');
                target.recoverTo(target.maxHp);
            }else{
                var num=target.hp-1
                if(num<=0){
                    game.log(target,'使用了','#y【'+get.translation(card)+'】','无事发生');
                    event.finish();
                }
                target.damage(num,'thunder','nocard','nosource','notrigger');
            }
        },
        ai:{
            basic:{
                useful(card,i){
                    if (get.player().hp>1){
                        if(i===0) return 0;
                        return 1;
                    }
                    if(i===0) return 7.3;
                    return 10;
                },
                value(card,player){
                    if(!player) return;
                    if(player.hp>1){
                        if(player.hp==player.maxHp) return 0;
                        return (player.maxHp-player.hp)/player.maxHp;
                    }
                    return player.maxHp-player.hp;
                },
            },
            order:0.2,
            result:{
                target(player,target,card){
                    if(!target) return;
                    if(target.hp>1){
                        if(target.hp==target.maxHp) return 0;
                        return (target.maxHp-target.hp)/target.maxHp;
                    }
                    return target.maxHp-target.hp;
                },
            },
            tag:{
                recover:1,
                damage:1,
                natureDamage:1,
            },
        },
    },
    //--------------------延时锦囊牌----------------
    //--------------------非延时锦囊牌-------------
    "xjzh_card_lianqidan":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_lianqidan.png",
        fullskin:true,
        type:'xjzh_danyao',
        enable:true,
        toself:true,
        modTarget:true,
        vanish:true,
        filterTarget:function(card,player,target){
            return target==player
        },
        /*onLose:function(){
        card.fix();
        card.remove();
        card.destroyed=true;
        game.log(card,'被销毁了');
        },*/
        loseDelay:false,
        selectTarget:-1,
        content:function(){
            "step 0"
            if(!get.is.ordinaryCard(card)){
                game.log(card,"不为实体牌，本次使用不生效");
                event.finish();
                return;
            }
            "step 1"
            draw=false;
            lose=false;
            var list=player.getSkills(null,false,false).filter(function(skill){
                var info=lib.skill[skill];
                if(lib.skill.global.includes(skill)) return false;
                if(skill.indexOf('jycw')!=-1) return false;
                return info&&info.usable&&typeof info.usable=='number';
            });
            if(list.length){
                if(list.length==1) event._result={control:list[0]};
                else player.chooseControl(list).set('prompt','【练气丹】：令一个技能使用次数+1').set('ai',function(){
                    return get.max(list,get.skillRank,'item');
                });
            }
            else{
                draw=true;
            }
            "step 2"
            if(result&&result.control){
                var skills=result.control
                var info=lib.skill[skills];
                var num=info.usable
                info.usable=num+1;
                /*var str=lib.translate[skills+"_info"]
                var str2=get.cnNumber(num+1);
                var int="限"+get.cnNumber(num)+"次"
                if(str.indexOf(int)!=-1){
                    var str3=str.replace(int,"限"+str2+"次");
                }
                var str3=/限一次/ig
                var str4=str.replace(str3,"限"+str2+"次");
                if(str3&&str3.length) lib.translate[skills+"_info"]=str3
                lib.dynamicTranslate[skills]=function(player){
                    return str3;
                };*/
            }
            "step 3"
            var list=player.getSkills(null,false,false).filter(function(skill){
                var info=lib.skill[skill];
                return info&&info.limited&&player.awakenedSkills.includes(skill);
            });
            if(list.length){
                var link=list.randomGet();
                player.restoreSkill(link);
                draw=false;
                lose=true;
            }
            "step 4"
            if(draw){
                player.draw(2);
            }
            else{
                if(lose){
                    player.loseMaxHp();
                    game.log(player,"失去了一点体力上限");
                }
            }
            "step 5"
            if(game.xjzhAchi.hasAchi('重金属中毒者','special')){
                if(player.isUnderControl(true)&&game.me==player){
                    player.chooseDrawRecover(true,"【练气丹】：请选择摸一张牌或回复一点体力");
                    if(Math.random()) player.directgain(game.createCard(card),null,'xjzh_card_lianqidan');
                }
            }
            "step 6"
            game.cardsGotoSpecial(card);
            game.log(card,'被销毁了');
        },
        ai:{
            basic:{
                order:10,
                useful:4.5,
                value:6.5,
            },
            result:{
                player:function(card,player,target){
                    var list=player.getSkills(null,false,false).filter(function(skill){
                        var info=lib.skill[skill];
                        return info&&info.usable&&typeof info.usable=='number';
                    });
                    var list2=player.getSkills(null,false,false).filter(function(skill){
                        var info=lib.skill[skill];
                        return info&&info.limited&&player.awakenedSkills.includes(skill);
                    });
                    if(list.length>0) return 5;
                    if(list2.length>0) return 5;
                    if(player.maxHp==1) return -10;
                    return 1;
                },
            },
            tag:{
                draw:2,
            },
        },
    },
    "xjzh_card_cuimaidan":{
        audio:"ext:仙家之魂/audio/card/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_cuimaidan.png",
        fullskin:true,
        type:'xjzh_danyao',
        enable:true,
        modTarget:true,
        vanish:true,
        range:{global:1},
        filterTarget:function(card,player,target){
            return target!=player;
        },
        loseDelay:false,
        selectTarget:1,
        content:function(){
            "step 0"
            var list=target.getSkills(null,false,false).filter(function(skill){
                var info=lib.skill[skill];
                return info&&!info.equipSkill&&!info.cardSkill&&!info.sub&&lib.translate[skill]&&lib.translate[skill+"_info"]&&!info.xjzh_qishuSkill;
            });
            if(list.length){
                if(event.isMine()){
                    var dialog=ui.create.dialog('forcebutton','hidden');
                    dialog.add('请选择移除一项技能');
                    for(i=0;i<list.length;i++){
                        if(lib.translate[list[i]+'_info']){
                            var translation=get.translation(list[i]);
                            if(translation[0]=='新'&&translation.length==3){
                                translation=translation.slice(1,3);
                            }
                            else{
                                translation=translation.slice(0,2);
                            }
                            var item=dialog.add('<div class="popup pointerdiv" style="width:95%;display:inline-block"><div class="skill">【'+translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                            item.firstChild.link=list[i];
                        }
                    }
                }
                target.chooseControl(list,'cancel2').set('prompt','【摧脉丹】：请选择移除一个技能').set('ai',function(player,target){
                    if(target.hp>=Math.floor(target.maxHp/2)) return 'cancel2';
                    return get.min(list,get.skillRank,'item');
                }).set('dialog',dialog);
            }
            else{
                target.loseHp();
                event.finish();
            }
            "step 1"
            if(result.control!="cancel2"){
                var skills=result.control
                target.removeSkill(skills);
                game.log(target,"移除了技能","#y","〖"+get.translation(skills)+"〗");
            }else{
                target.loseHp();
                event.finish();
            }
            "step 2"
            game.cardsGotoSpecial(cards);
            game.log(cards,'被销毁了');
        },
        ai:{
            basic:{
                order:8,
                useful:[4.5,3.5,2],
                value:[6.5,4.5,1],
            },
            result:{
                target:function(player,target){
                    if(target.hasSkill("xjzh_qishu_materialRemove")) return 10;
                    var list=target.getSkills(null,false,false).filter(function(skill){
                        var info=lib.skill[skill];
                        return info&&!info.sub&&lib.translate[skill]&&lib.translate[skill+"_info"];
                    });
                    if(list.length>0) return -5;
                    return -1;
                },
            },
            tag:{
                loseHp:1,
            }
        },
    },
    //--------------------装备牌-------------------
    //武器
    "xjzh_card_shuangran":{
        fullskin:true,
        type:'equip',
        subtype:'equip1',
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_shuangran.png",
        forceDie:true,
        clearLose:true,
        equipDelay:false,
        loseDelay:false,
        onEquip:function(){
            var num=0
            var player=_status.event.player;
            var object=new Object();
            var list=['baojilv','recover','yishang','ranshao'];
            while(num<=3){
                switch(num){
                    case 0:
                    var numx=get.rand(3,8);
                    object[list[num]]=numx;
                    break;
                    case 1:
                    var numx=get.rand(1,3);
                    object[list[num]]=numx;
                    break;
                    case 2:
                    var numx=get.rand(15,25);
                    var numx2=get.rand(1,3);
                    object[list[num]]=[numx];
                    object[list[num]].push(numx2)
                    break;
                    case 3:
                    var numx=get.rand(5,15);
                    var numx2=get.rand(1,3);
                    object[list[num]]=[numx];
                    object[list[num]].push(numx2)
                    break;
                }
                num++;
            }

            var ecard=player.getEquip(1);
            var origin_name=ecard.name;

            var name=ecard.name+'_shuangran';
            lib.card[name]=get.copy(get.info(ecard));

            lib.translate[name+'_info']="";

            for(var i in object){
                switch(i){
                    case "baojilv":
                    lib.translate[name+'_info']+="<li>造成伤害有<span style=\"color: red\">"+get.translation(object[i])+"%</span>几率暴击<br><br>";
                    break;
                    case "recover":
                    lib.translate[name+'_info']+="<li>造成伤害有5%几率回复<span style=\"color: red\">"+get.translation(object[i])+"</span>点体力<br><br>";
                    break;
                    case "yishang":
                    lib.translate[name+'_info']+="<li>造成伤害有<span style=\"color: red\">"+get.translation(object[i][0])+"％</span>几率令其获得<span style=\"color: red\">"+get.translation(object[i][1])+"</span>层易伤<br><br>";
                    break;
                    case "ranshao":
                    lib.translate[name+'_info']+="<li>造成伤害有<span style=\"color: red\">"+get.translation(object[i][0])+"％</span>几率令其获得<span style=\"color: red\">"+get.translation(object[i][1])+"</span>层燃烧";
                    break;
                }
            }

            player.storage.xjzh_card_shuangran_skill=object;

            lib.translate[name]=lib.translate[ecard.name];

            ecard.name=name;
            ecard.origin_name=origin_name;
        },
        onLose:function(){
            if(player.storage.xjzh_card_shuangran_skill) delete player.storage.xjzh_card_shuangran_skill;
        },
        skills:["xjzh_card_shuangran_skill"],
        ai:{
            value:function(card,player,index,method){
                return Math.random()*0.5
            },
            equipValue:function(card,player){
                if(player.hp<=2) return 0.5;
                return Math.random();
            },
            basic:{
                equipValue:0.5
            },
        },
    },
    //防具
    //无限
    "xjzh_card_wuxian":{
        fullskin:true,
        type:'equip',
        subtype:'equip2',
        forceDie:true,
        clearLose:true,
        equipDelay:false,
        loseDelay:false,
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_wuxian.png",
        skills:[],
        onEquip:function(){
            var num=0
            var list=["xjzh_card_wuxian_skill_fanshe","xjzh_card_wuxian_skill_zhufu","xjzh_card_wuxian_skill_jianren","xjzh_card_wuxian_skill_jujiao","xjzh_card_wuxian_skill_pomo","xjzh_card_wuxian_skill_liuguang"].randomGets(3);
            if(Array.isArray(lib.card[card.name].skills)===true) lib.card[card.name].skills=list;

            while(num<=list.length-1){
                lib.skill[list[num]].init(player);
                num++
            }

            var ecard=card
            var origin_name=ecard.name;

            var name=ecard.name+'_wuxian';
            lib.card[name]=get.copy(get.info(ecard));

            var str=""
            var player=_status.event.player

            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_fanshe")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_fanshe")+"</span>：你受到伤害时有"+get.translation(player.storage.xjzh_card_wuxian_skill_fanshe)+"%几率反射该伤害<br><br>";
            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_zhufu")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_zhufu")+"</span>：你受到伤害时有"+get.translation(player.storage.xjzh_card_wuxian_skill_zhufu)+"%几率摸一张牌<br><br>";
            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_jianren")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_jianren")+"</span>：你受到伤害后有"+get.translation(player.storage.xjzh_card_wuxian_skill_jianren)+"%几率回复一点体力<br><br>";
            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_jujiao")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_jujiao")+"</span>：你成为【杀】的目标时有"+get.translation(player.storage.xjzh_card_wuxian_skill_jujiao)+"%几率令其额外结算一次<br><br>";
            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_pomo")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_pomo")+"</span>：你受到属性伤害有"+get.translation(player.storage.xjzh_card_wuxian_skill_pomo)+"%几率+1<br><br>";
            if(lib.card[card.name].skills.includes("xjzh_card_wuxian_skill_liuguang")) str+="<li><span style=\"color: red\">"+get.translation("xjzh_card_wuxian_skill_liuguang")+"</span>：你成为非伤害性卡牌时有"+get.translation(player.storage.xjzh_card_wuxian_skill_liuguang)+"%几率随机弃置一张牌<br><br>";

            str+=""+get.translation("xjzh_card_wuxian_info")+"";

            lib.translate[name+'_info']=str

            lib.translate[name]=lib.translate[ecard.name];

            ecard.name=name;
            ecard.origin_name=origin_name;
            game.log(player,"的无限效果为：","#y"+get.translation(list));
        },
        onLose:function(){
            if(player.storage.xjzh_card_wuxian_skill_fanshe) delete player.storage.xjzh_card_wuxian_skill_fanshe
            if(player.storage.xjzh_card_wuxian_skill_zhufu) delete player.storage.xjzh_card_wuxian_skill_zhufu
            if(player.storage.xjzh_card_wuxian_skill_jianren) delete player.storage.xjzh_card_wuxian_skill_jianren
            if(player.storage.xjzh_card_wuxian_skill_jujiao) delete player.storage.xjzh_card_wuxian_skill_jujiao
            if(player.storage.xjzh_card_wuxian_skill_pomo) delete player.storage.xjzh_card_wuxian_skill_pomo
            if(player.storage.xjzh_card_wuxian_skill_liuguang) delete player.storage.xjzh_card_wuxian_skill_liuguang
        },
        //cardnature:'thunder',
        ai:{
            value:function(card,player,index,method){
                return Math.random()*0.5
            },
            equipValue:function(card,player){
                if(player.hp<=2) return 0.5;
                return Math.random();
            },
            basic:{
                equipValue:0.5
            },
        },
    },
    //熔岩铠甲
    "xjzh_card_rongyankaijia":{
        fullskin:true,
        type:'equip',
        subtype:'equip2',
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_rongyankaijia.png",
        async onLose(){
            let player=get.player();
            if(player.storage.xjzh_card_rongyankaijia_skill&&player.storage.xjzh_card_rongyankaijia_skill.length){
                let storage=player.storage.xjzh_card_rongyankaijia_skill.slice(0);
                for(let damageList of storage){
                    if(player.isDead()) break;
                    player.damage(...(damageList.slice(0)));
                }
                delete player.storage.xjzh_card_rongyankaijia_skill;
                player.unmarkSkill("xjzh_card_rongyankaijia_skill2");
            }
        },
        skills:["xjzh_card_rongyankaijia_skill"],
        ai:{
            value(card,player,index,method){
                if(player.isDisabled(2)) return 0.01;
                if(card==player.getEquip(2)){
                    if(player.hasSkillTag('nodamage')) return 0;
                    if(player.hasSkillTag('nofire')) return 0.5;
                    return 6;
                }
            },
            equipValue:function(card,player){
                let num=0
                if(player.hasSkillTag('maixie')&&player.hp>1) return 0;
                if(player.hasSkillTag('maixie_hp')&&player.hp>1) return 0;
                if(player.hp==1) num+=5;
                if(player.hp==2) num+=3;
                return num;
            },
            basic:{
                equipValue:6.5
            },
        },
    },
    //防御马
    //驽马
    "xjzh_card_numa":{
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_numa.png",
        fullskin:true,
        type:'equip',
        subtype:'equip3',
        filterTarget:function(card,player,target){
            return target.canEquip(card,true);
        },
        selectTarget:1,
        distance:{globalTo:-1},
        ai:{
            order:9,
            value:function(card,player){
                if(!player.countCards('j')) return 0;
                if(player.getEquip(3)==card) return 0;
                return -1;
            },
            equipValue:function(card,player){
                if(player.getCards('e').includes(card)) return 0;
                if(!player.countCards("j")) return 0;
                return -1;
            },
            basic:{
                equipValue:2,
            },
            result:{
                target:function(player,target){
                    var cards=target.getCards('e');
                    if(!target.getEquip(3)) return 0;
                    if(cards.includes(card)) return 0;
                    return -1;
                },
            },
        },
    },
    //宝物
    //意志呼唤
    "xjzh_card_yizhihuhuan":{
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_yizhihuhuan.png",
        fullskin:true,
        type:'equip',
        subtype:'equip5',
        forceDie:true,
        nomod:true,
        clearLose:true,
        equipDelay:false,
        loseDelay:false,
        onLose:function(){
            if(player.storage.xjzh_card_yizhihuhuan_skill) delete player.storage.xjzh_card_yizhihuhuan_skill
        },
        skills:['xjzh_card_yizhihuhuan_skill'],
        ai:{
            order:12,
            value:5.2,
            useful:3,
            equipValue:5.2,
            basic:{
                equipValue:5.2
            },
        },
    },
    //卡德兰之触
    "xjzh_card_kadelanzhichu":{
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_kadelanzhichu.png",
        fullskin:true,
        type:'equip',
        subtype:'equip5',
        forceDie:true,
        clearLose:true,
        equipDelay:false,
        onEquip(){
            let cards=lib.inpile.filter(card=>{
                if(!["equip1","qeuip2","equip5"].includes(get.subtype(card))) return false;
                if(get.name(card)=="muniu") return false;
                if(player.countCards('e')&&player.getCards("e").some(item=>get.name(item)==get.name(card))) return false;
                return true;
            });
            let cardx=cards.randomGet();

            lib.card[card.name].skills=lib.card[cardx].skills?lib.card[cardx].skills:[];

            let ecard=card;
            let origin_name=ecard.name;
            let name=ecard.name+'_kadelanzhichu';
            lib.card[name]=get.copy(get.info(ecard));

            lib.translate[name+'_info']="<li>当前反射装备<span style=\"color: red\">"+get.translation(cardx)+"</span>："+lib.translate[cardx+"_info"]+"<br><br>"+lib.translate[ecard.name+'_info'];

            lib.translate[name]=lib.translate[ecard.name];

            ecard.name=name;
            ecard.origin_name=origin_name;
            player.popup(cardx);
            game.log(card,"当前反射装备<span style=\"color: red\">"+get.translation(cardx)+"</span>")
        },
        skills:[],
        ai:{
            order:6,
            value:3,
            useful:2.5,
            equipValue:3.5,
            basic:{
                equipValue:3.5
            },
        },
    },
    //谐角之冠
    "xjzh_card_xiejiaozhiguan":{
        audio:"ext:仙家之魂/skillaudio/equip/",
        image:"ext:仙家之魂/image/cardpicture/xjzh_card_xiejiaozhiguan.png",
        fullskin:true,
        type:'equip',
        subtype:'equip5',
        forceDie:true,
        clearLose:true,
        equipDelay:false,
        skills:["xjzh_card_xiejiaozhiguan_skill"],
        onEquip:function(){
            var player=_status.event.player;
            var ecard=player.getEquip(5);
            var origin_name=ecard.name;
            player.storage.xjzh_card_xiejiaozhiguan_skill=[];

            var name=ecard.name+'xiejiaozhiguan';
            lib.card[name]=get.copy(get.info(ecard));
            lib.translate[name+'_info']="你所有限制回合发动次数的主动技能+2次发动次数。<br><br>受【谐角之冠】影响的技能：";

            var list=player.getSkills(null,false,false).filter(function(skill){
                var info=lib.skill[skill];
                return info&&!info.equipSkill&&!info.cardSkill&&!lib.skill.global.includes(skill)&&info.usable&&typeof info.usable=='number';
            });
            if(!list.length) return;
            var list2=[];
            for(var i=0;i<list.length;i++){
                var info=lib.skill[list[i]];
                if(!info.enable||info.enable!="phaseUse") continue;
                var num=info.usable
                info.usable=num+2;
                list2.push(list[i]);
                lib.translate[name+'_info']+="<br><span style=\"color: yellow\">【"+get.translation(list[i])+"】+：2</span>";
            }

            /*player.addSkill("xjzh_tongyong_baiban");
            player.storage['xjzh_tongyong_baiban'].push(list2);*/

            player.storage.xjzh_card_xiejiaozhiguan_skill=list2.slice(0);

            lib.translate[name]=lib.translate[ecard.name];

            ecard.name=name;
            ecard.origin_name=origin_name;
        },
        onLose:function(){
            var player=_status.event.player;
            var list=player.getSkills(null,false,false).filter(function(skill){
                var info=lib.skill[skill];
                return info&&info.usable&&typeof info.usable=='number';
            });

            if(!list.length) return;

            for(var i=0;i<list.length;i++){
                var info=lib.skill[list[i]];
                if(!info.enable||info.enable!="phaseUse") continue;
                if(player.storage.xjzh_card_xiejiaozhiguan_skill&&!player.storage.xjzh_card_xiejiaozhiguan_skill.includes(list[i])) continue;
                var num=info.usable
                info.usable=num-=2;
            }

            if(player.storage.xjzh_card_xiejiaozhiguan_skill) delete player.storage.xjzh_card_xiejiaozhiguan_skill;
        },
        ai:{
            order:6,
            useful:2.5,
            value:function(card,player,index,method){
                var list=player.getSkills(null,false,false).filter(function(skill){
                    var info=lib.skill[skill];
                    return info&&info.usable&&typeof info.usable=='number';
                });
                if(!list.length) return;
                var num=0;
                var num2=0;
                for(var i=0;i<list.length;i++){
                    var info=lib.skill[list[i]];
                    if(!info.enable||info.enable!="phaseUse"){
                        num+=get.skillRank(list[i],"in",true);
                    }else{
                        num2+get.skillRank(list[i],"out",true);
                    }
                }
                return num-num2;
            },
            equipValue:function(card,player){
                var list=player.getSkills(null,false,false).filter(function(skill){
                    var info=lib.skill[skill];
                    return info&&info.usable&&typeof info.usable=='number';
                });
                if(!list.length) return;
                var num=0;
                var num2=0;
                for(var i=0;i<list.length;i++){
                    var info=lib.skill[list[i]];
                    if(!info.enable||info.enable!="phaseUse"){
                        num+=get.skillRank(list[i],"in",true);
                    }else{
                        num2+get.skillRank(list[i],"out",true);
                    }
                }
                return num-num2;
            },
            basic:{
                equipValue:3.5
            },
            result:{
                player:function(player,target){
                    var list=player.getSkills(null,false,false).filter(function(skill){
                        var info=lib.skill[skill];
                        return info&&info.usable&&typeof info.usable=='number';
                    });
                    if(!list.length) return;
                    var num=0;
                    var num2=0;
                    for(var i=0;i<list.length;i++){
                        var info=lib.skill[list[i]];
                        if(!info.enable||info.enable!="phaseUse"){
                            num+=get.skillRank(list[i],"in",true);
                        }else{
                            num2+get.skillRank(list[i],"out",true);
                        }
                    }
                    return num-num2;
                },
            },
        },
    },
    //-----------------------End-----------
};

export default cards;