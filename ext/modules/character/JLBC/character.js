const characters = {
	"xjzh_jlsg_diaochan":{
		sex:"female",
		group:"qun",
		hp:1,
		skills:["xjzh_jlsg_lihun","xjzh_jlsg_jueshi"],
		names:"null|null",
	},
	"xjzh_jlsg_zhaoyan":{
		sex:"female",
		group:"qun",
		hp:3,
		skills:["xjzh_jlsg_sanjue"],
		names:"赵|嫣",
	},
};

for(let i in characters){
	if(!characters[i].trashBin) characters[i].trashBin=[];
	let array=["ext:仙家之魂/jlsg/skin/"+i+".jpg","xjzh_die_audio"];
	characters[i].trashBin.addArray(array);

	if(!characters[i].dieAudios) characters[i].dieAudios=[];
	characters[i].dieAudios.add("ext:仙家之魂/audio/die/"+i+".mp3");
}

export default characters;
