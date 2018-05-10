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
        { src: jsPath + 'GameUI.js'},
        { src: jsPath + 'BodyWorld.js'},
        { src: jsPath + 'RectangleBody.js'},
        { src: jsPath + 'MapObject.js'},
        { src: jsPath + 'Marble.js'},
        { src: jsPath + 'Monster.js'},
        { src: jsPath + 'Map.js'},
        { src: jsPath + 'Stage.js'},
        { src: jsPath + 'StartPage.js'},
        { src: jsPath + 'Stage1.js'},
        { src: jsPath + 'StageSelect.js'},
        { src: jsPath + 'EndPage.js'},
        { src: jsPath + 'MainGame.js'}
    ]
    importJS(listScript);
    
})();


    
