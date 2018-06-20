'use strict'
Framework.TouchManager = new (class TouchManager {
    constructor() {
        autoBind(this)
        this.userTouchstartEvent = function() {}
        this.userTouchendEvent = function() {}
        this.userTouchcancelEvent = function() {}
        this.userTouchleaveEvent = function() {}
        this.userTouchmoveEvent = function() {}
        this.subject
        Framework.Game.canvas.addEventListener('touchstart', this.touchstartEvent, false);
        Framework.Game.canvas.addEventListener('touchend', this.touchendEvent, false);
        //Framework.Game.canvas.addEventListener('touchcancel', this.touchcancelEvent, false);
        //Framework.Game.canvas.addEventListener('touchleave', this.touchleaveEvent, false);
        Framework.Game.canvas.addEventListener('touchmove', this.touchmoveEvent, false);
    }
    
    countCanvasOffset(e) {
        let touches = e.changedTouches
        let pos = {}
        let totalOffsetX = 0
        let totalOffsetY = 0
        let ele = Framework.Game.canvas
        let newE = {}

        do {
            totalOffsetX += ele.offsetLeft;
            totalOffsetY += ele.offsetTop;
            ele = ele.offsetParent;
        } while(ele);

        for (let i = 0; i < touches.length; i++) {
            newE[i] = {};
            newE[i].x = Math.floor((touches[i].pageX - totalOffsetX) / Framework.Game.widthRatio);
            newE[i].y = Math.floor((touches[i].pageY - totalOffsetY) / Framework.Game.heightRatio);
        }

        return newE;
    }
    
    touchstartEvent(e) {
        e.preventDefault()
        let newE = this.countCanvasOffset(e)
        this.userTouchstartEvent.call(this.subject, newE, e)
    }

    touchendEvent(e) {
        e.preventDefault()
        let newE = this.countCanvasOffset(e)
        this.userTouchendEvent.call(this.subject, newE, e)
    }

    touchcancelEvent(e) {
        e.preventDefault()
        let newE = this.countCanvasOffset(e)
        this.userTouchcancelEvent.call(this.subject, newE, e)
    }

    touchleaveEvent(e) {
        e.preventDefault()
        let newE = this.countCanvasOffset(e)
        this.userTouchleaveEvent.call(this.subject, newE, e)
    }

    touchmoveEvent(e) {
        e.preventDefault()
        let newE = this.countCanvasOffset(e)
        this.userTouchmoveEvent.call(this.subject, newE, e)
    }
})()