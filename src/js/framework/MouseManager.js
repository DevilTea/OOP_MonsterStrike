'use strict'
Framework.MouseManager = new (class MouseManager {
    constructor() {
        autoBind(this)
        this.isHandling = true
        this.userClickEvent = function() {}
        this.userMouseDownEvent = function() {}
        this.userMouseUpEvent = function() {}
        this.userMouseMoveEvent = function() {}
        this.userContextMenuEvent = function() {}
        Framework.Game.mainContainer.addEventListener('click', this.clickEvent, false);
        Framework.Game.mainContainer.addEventListener('mousedown', this.mousedownEvent, false);
        Framework.Game.mainContainer.addEventListener('mouseup', this.mouseupEvent, false);
        Framework.Game.mainContainer.addEventListener('mousemove', this.mousemoveEvent, false);
        Framework.Game.mainContainer.addEventListener('contextmenu', this.contextmenuEvent, false);
    }

    stopHandle() {
        this.isHandling = false
    }

    startHandle() {
        this.isHandling = true
    }
    
    countCanvasOffset(e) {
        let pos = new Framework.Point()
        let totalOffsetX = 0
        let totalOffsetY = 0
        let ele = Framework.Game.canvas

        do {
            totalOffsetX += ele.offsetLeft;
            totalOffsetY += ele.offsetTop;
            ele = ele.offsetParent;
        } while(ele);

        pos.x = e.x || e.clientX;
        pos.y = e.y || e.clientY;
        pos.x = Math.floor((pos.x - totalOffsetX) / Framework.Game.widthRatio);
        pos.y = Math.floor((pos.y - totalOffsetY) / Framework.Game.heightRatio);

        return pos;
    }
    
    clickEvent(e) {
        if(this.isHandling) {
            e.preventDefault()
            e = this.countCanvasOffset(e)
            this.userClickEvent(e)
        }
    }
    
    mousedownEvent(e) {
        if(this.isHandling) {
            e.preventDefault()
            e = this.countCanvasOffset(e)
            this.userMouseDownEvent(e)
        }
    }
    
    mouseupEvent(e) {
        if(this.isHandling) {
            e.preventDefault()
            e = this.countCanvasOffset(e)
            this.userMouseUpEvent(e)
        }
    }
    
    mousemoveEvent(e) {
        if(this.isHandling) {
            e.preventDefault()
            e = this.countCanvasOffset(e)
            this.userMouseMoveEvent(e)
        }
    }
    
    contextmenuEvent(e) {
        if(this.isHandling) {
            e.preventDefault()
            e = this.countCanvasOffset(e)
            this.userContextMenuEvent(e)
        }
    }
})()