const isTestMode = false
const isRecordMode = false
const mainPath = 'src/'
const frameworkPath = mainPath + 'js/framework/'
const jsPath = mainPath + 'js/'
const musicPath = mainPath + 'music/'
const imagePath = mainPath + 'image/'
let Framework = {}
let GameClasses = {}
let Stages = {}
let autoBind = function(obj) {
    for (let o = obj; o; o = Object.getPrototypeOf(o)){
        for (let name of Object.getOwnPropertyNames(o)){
            if (typeof obj[name] === 'function'){
                obj[name] = obj[name].bind(obj);
            }
        }
    }
}
//立即執行函式, 並封裝所有變數避免衝突
let loadEnd

(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    let importJS = function(jsConf) {
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
                loadEnd = true
            }
        })
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
					if(jsConf[0].lookFor === 'loadFrameworkEnd')
					{
						Framework.Game._isTestMode = false
					}
                    clearInterval(interval)
                    callback()      
                }
            }, 50);
    }

    //陣列和載入JS檔的順序相同, lookFor為在要載入的檔案中, 
    //有用到的全域變數, importJS這個function, 會在找到lookFor的變數後
    //才會繼續loading下一個檔案, 如果沒有需要lookFor, 則以空字串代表
    let listScript = 
    [
        { src: frameworkPath + 'loadFramework.js',lookFor: 'loadFrameworkEnd'},
        { src: jsPath + 'loadGame.js',lookFor: 'loadGameEnd'},
    ]
    importJS(listScript)
    
})()