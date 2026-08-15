一、添加文件夹图片读取
    1.在你的扩展内的任意会在游戏开始时加载的js文件中添加以下代码，或新建一个js文件，添加以下代码后加载该js文件

        if (!Array.isArray(lib.xjzh_additionalProfile)) lib.xjzh_additionalProfile=[];
        let list=[
            //此处为你需要设置的文件夹目录，如下示例
            //`${lib.assetURL}/extension/仙家之魂/image/profile/`
        ];
        lib.xjzh_additionalProfile.push(...list);

    2.请勿直接定义数组lib.xjzh_additionalProfile，请使用lib.xjzh_additionalProfile.push()方法添加

二、直接将喜欢的图片放入头像文件夹内
    1.文件夹目录：
        extension/仙家之魂/image/profile/dynamics     动态图片
        extension/仙家之魂/image/profile/static      静态图片
        extension/仙家之魂/image/profile             或者直接放入这个文件夹