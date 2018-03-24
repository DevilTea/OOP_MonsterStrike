'use strict'
Framework.MouseManager = new (class MouseManager {
	constructor() {
		autoBind(this)
		this.userClickEvent = function() {}
		this.userMouseDownEvent = function() {}
		this.userMouseUpEvent = function() {}
		this.userMouseMoveEvent = function() {}
		this.userContextMenuEvent = function() {}
		this.subject
		Framework.Game.canvas.addEventListener('click', this.clickEvent, false);
		Framework.Game.canvas.addEventListener('mousedown', this.mousedownEvent, false);
		Framework.Game.canvas.addEventListener('mouseup', this.mouseupEvent, false);
		Framework.Game.canvas.addEventListener('mousemove', this.mousemoveEvent, false);
		Framework.Game.canvas.addEventListener('contextmenu', this.contextmenuEvent, false);
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
		e.preventDefault()
		e = this.countCanvasOffset(e)
		this.userClickEvent.call(this.subject, e)
	}
	
	mousedownEvent(e) {
		e.preventDefault()
		e = this.countCanvasOffset(e)
		this.userMouseDownEvent.call(this.subject, e)
	}
	
	mouseupEvent(e) {
		e.preventDefault()
		e = this.countCanvasOffset(e)
		this.userMouseUpEvent.call(this.subject, e)
	}
	
	mousemoveEvent(e) {
		e.preventDefault()
		e = this.countCanvasOffset(e)
		this.userMouseMoveEvent.call(this.subject, e)
	}
	
	contextmenuEvent(e) {
		e.preventDefault()
		e = this.countCanvasOffset(e)
		this.userContextMenuEvent.call(this.subject, e)
	}
})()