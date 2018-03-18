var Stage1 = Framework.Class(Framework.Level , {
    
    load: function() {
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png');
    },

    initialize: function() {
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        this.loading.scale = 4;
		
        this.rootScene.attach(this.loading);
    },

    update: function() {
        this.rootScene.update(); 
    },

    draw:function(parentCtx){
        //this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        this.rootScene.draw(parentCtx);
        this.loading.draw(parentCtx);
    },

    keydown:function(e, list){
        Framework.DebugInfo.Log.warning(e.key);
		
    },

    keyup:function(e, list){
		
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click(e[0]);
    },

    click: function (e) {  
        
    },
});