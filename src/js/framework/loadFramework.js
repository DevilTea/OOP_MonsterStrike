//立即執行函式, 並封裝所有變數避免衝突
let loadFrameworkEnd
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    let  importJS = function(jsConf) {
        let headID = document.getElementsByTagName("head")[0]
        let newJs = document.createElement('script')
        newJs.type = 'text/javascript'
        newJs.src= jsConf[0].src
        headID.appendChild(newJs)
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1)
            if(jsConf.length > 0) {
                importJS(jsConf)
            }else
            {
                loadFrameworkEnd = true
            }
        });
    }

    let wait_for_script_load = function(jsConf, callback) {
        let interval = setInterval(function() {
            if (typeof jsConf[0].lookFor === 'undefined') {
                jsConf[0].lookFor = ''
            }

            if (jsConf[0].lookFor === '') {
                clearInterval(interval)
                callback()
            } else if (eval("typeof " + jsConf[0].lookFor) !== 'undefined') {
                    clearInterval(interval)
                    callback()
                }
            }, 50)
    }

    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    let frameworklistScript = 
    [
        { src: frameworkPath + 'Config.js'},/*updated*/
        { src: frameworkPath + 'Recorder.js'},/*updated*/
        { src: frameworkPath + 'Replayer.js'},/*updated*/
        { src: frameworkPath + 'EqualCondition.js'},/*updated*/
        { src: frameworkPath + 'Util.js'},/*updated*/
        { src: frameworkPath + 'Core.js'},
        { src: frameworkPath + 'DebugInfo.js'},/*updated*/
        { src: frameworkPath + 'FpsAnalysis.js'},/*updated*/
        { src: frameworkPath + 'Point.js'},/*updated*/
        { src: frameworkPath + 'GameObject.js'},/*updated*/
        { src: frameworkPath + 'Sprite.js'},/*updated*/
        { src: frameworkPath + 'AnimationSprite.js'},/*updated*/
        { src: frameworkPath + 'Scene.js'},/*updated*/
        { src: frameworkPath + 'ResourceManager.js'},
        { src: frameworkPath + 'Level.js'},
        { src: frameworkPath + 'Game.js'},
        { src: frameworkPath + 'MouseManager.js'},
        { src: frameworkPath + 'KeyBoardManager.js'},
        { src: frameworkPath + 'TouchManager.js'},
        { src: frameworkPath + 'GameMainMenu.js'},
        { src: frameworkPath + 'Audio.js'},
        { src: frameworkPath + 'Box2dWeb-2.1.a.3.js'},
        { src: frameworkPath + 'Box2D.js'},
        { src: frameworkPath + 'circleComponent.js'},
        { src: frameworkPath + 'polygonComponent.js'},
        { src: frameworkPath + 'squareComponent.js'},
        { src: frameworkPath + 'triangleComponent.js'}
    ]
    importJS(frameworklistScript)
    
})()


    
