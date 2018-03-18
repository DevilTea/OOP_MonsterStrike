//立即執行函式, 並封裝所有變數避免衝突
var loadGameEnd;
(function(){
    //動態依序載入JS
    //ref: http://blog.darkthread.net/blogs/darkthreadtw/archive/2009/01/15/4061.aspx
    var  importJS = function(jsConf) {
        var headID = document.getElementsByTagName("head")[0]; 
        var newJs = document.createElement('script');
        newJs.type = 'text/javascript';
        newJs.src= jsConf[0].src;
        headID.appendChild(newJs);
        wait_for_script_load(jsConf, function() {
            jsConf.splice(0, 1);
            if(jsConf.length > 0) {
                importJS(jsConf);

				if(typeof blanket != "undefined"){
					blanket.utils.cache[jsConf[0].src] = {};
					blanket.utils.attachScript({url: jsConf[0].src}, function (content) {
						blanket.instrument({inputFile: content, inputFileName: jsConf[0].src},function (instrumented) {
							blanket.utils.cache[jsConf[0].src].loaded = true;
							blanket.utils.blanketEval(instrumented);
							blanket.requiringFile(jsConf[0].src, true);
						});
					});	
				}
            }else
            {
                loadGameEnd = true;
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
    var listScript = 
    [
        { src: jsPath + 'MapObject.js'},
        { src: jsPath + 'Map.js'},
        { src: jsPath + 'StartPage.js', lookFor: 'StartPage'},
        { src: jsPath + 'Stage1.js', lookFor: 'Stage1'},
        { src: jsPath + 'mainGame.js'}
    ]
    importJS(listScript);
    
})();


    
