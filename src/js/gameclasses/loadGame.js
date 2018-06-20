//立即執行函式, 並封裝所有變數避免衝突
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    var  importJS = function(jsConf) {
        var headID = document.getElementsByTagName("head")[0]; 
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        newJs.onload = () => {
            jsConf.splice(0, 1)
            if(jsConf.length > 0) {
                importJS(jsConf)
            } else {
                loadGameEnd = true
            }
        }
    }
    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    var listScript = 
    [
        { src: gameclassesPath + 'GameEnums.js'},
        { src: gameclassesPath + 'HtmlElementView.js'},
        { src: gameclassesPath + 'GameUI.js'},
        { src: gameclassesPath + 'MapObject.js'},
        { src: gameclassesPath + 'SkillFactory.js'},
        { src: gameclassesPath + 'SkillData.js'},
        { src: gameclassesPath + 'Skill.js'},
        { src: gameclassesPath + 'SkillObject.js'},
        { src: gameclassesPath + 'MarbleData.js'},
        { src: gameclassesPath + 'Marble.js'},
        { src: gameclassesPath + 'MarblePick.js'},
        { src: gameclassesPath + 'Monster.js'},
        { src: gameclassesPath + 'Map.js'},
        { src: gameclassesPath + 'Item.js'},
        { src: gameclassesPath + 'Stage.js'},
        { src: gameclassesPath + 'Bag.js'},
        { src: gameclassesPath + 'BagUI.js'},
        { src: gameclassesPath + 'TeamSystem.js'},
        { src: gameclassesPath + 'TurnEgg.js'},
        { src: gameclassesPath + 'Helper.js'},
        { src: gameclassesPath + 'StartPage.js'},
        { src: gameclassesPath + 'Stage1.js'},
        { src: gameclassesPath + 'Stage2.js'},
        { src: gameclassesPath + 'Stage3.js'},
        { src: gameclassesPath + 'Stage4.js'},
        { src: gameclassesPath + 'Stage5.js'},
        { src: gameclassesPath + 'Stage6.js'},
        { src: gameclassesPath + 'Stage7.js'},
        { src: gameclassesPath + 'Stage8.js'},
        { src: gameclassesPath + 'Stage9.js'},
        { src: gameclassesPath + 'Stage10.js'},
        { src: gameclassesPath + 'StageSelect.js'},
        { src: gameclassesPath + 'EndPage.js'},
        { src: gameclassesPath + 'MainGame.js'}
    ]
    importJS(listScript)
})();