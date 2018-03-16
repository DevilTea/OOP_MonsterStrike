//立即執行函式, 並封裝所有變數避免衝突
var loadFrameworkEnd;
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    var  importJS = function(jsConf, src, lookFor) {
        var headID = document.getElementsByTagName("head")[0]; 
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf, lookFor);
            }else
            {
                loadFrameworkEnd = true;
            }
        });
    }

    var wait_for_script_load = function(jsConf, callback) {
        var interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = '';
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval);
                callback();
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval);
                    callback();      
                }
            }, 50);
    }

    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    var frameworklistScript = 
    [
        { src: define.frameworkPath + 'config.js'},
        { src: define.frameworkPath + 'Record.js'},
        { src: define.frameworkPath + 'Replay.js'},
        { src: define.frameworkPath + 'EqualCondition.js'},
        { src: define.frameworkPath + 'Util.js'},
        { src: define.frameworkPath + 'core.js'},
        { src: define.frameworkPath + 'DebugInfo.js'},
        { src: define.frameworkPath + 'FpsAnalysis.js'},
        { src: define.frameworkPath + 'Point.js'},
        { src: define.frameworkPath + 'GameObject.js'},
        { src: define.frameworkPath + 'Sprite.js'},
        { src: define.frameworkPath + 'animationSprite.js'},
        { src: define.frameworkPath + 'Scene.js'},
        { src: define.frameworkPath + 'ResourceManager.js'},
        { src: define.frameworkPath + 'level.js'},
        { src: define.frameworkPath + 'Game.js'},
        { src: define.frameworkPath + 'MouseManager.js'},
        { src: define.frameworkPath + 'KeyBoardManager.js'},
        { src: define.frameworkPath + 'TouchManager.js'},
        { src: define.frameworkPath + 'gameMainMenu.js'},
        { src: define.frameworkPath + 'Audio.js'},
        { src: define.frameworkPath + 'Box2dWeb-2.1.a.3.js'},
        { src: define.frameworkPath + 'Box2D.js'},
        { src: define.frameworkPath + 'circleComponent.js'},
        { src: define.frameworkPath + 'polygonComponent.js'},
        { src: define.frameworkPath + 'squareComponent.js'},
        { src: define.frameworkPath + 'triangleComponent.js'},
    ]
    importJS(frameworklistScript);
    
})();


    
