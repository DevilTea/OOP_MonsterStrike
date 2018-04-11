Framework.Level = class Level {
	constructor() {
		this.rootScene = new Framework.Scene()
		this.autoDelete = true
		this.firstDraw = true
		this.allGameElement = [this.rootScene]
		this.timelist = []
		this.updatetimelist = []
		this.cycleCount = 0
		this.config = Framework.Config
	}
	
	traversalAllElement(func) {
		this.allGameElement.forEach(func)
	}

	initializeProgressResource() {
	}

	load() {
		this.traversalAllElement(function(ele) {
			ele.load()
		})            
	}

	loadingProgress(ctx, requestInfo) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	}

	initialize() { 
		this.cycleCount = 0
		this.traversalAllElement(function(ele) {
			ele.initialize()
		})
		this.rootScene.initTexture();
	}

	update() {
		this.rootScene.clearDirtyFlag()
		this.traversalAllElement(function(ele) {
			ele.clearDirtyFlag()
		})
		var preDraw = Date.now()
		this.rootScene.update()
		this.cycleCount++
		var drawTime = Date.now() - preDraw
		this.updatetimelist.push(drawTime)
		if(this.updatetimelist.length >= 30)
		{
			var average = this.countAverage(this.updatetimelist)
			this.updatetimelist = []
			//console.log("update time average " + average)
		}
	}

	draw(ctx) { 
		this.rootScene.countAbsoluteProperty()
		/*this.traversalAllElement(function(ele) {
			ele.countAbsoluteProperty();
		})*/
		if(this.canvasChanged) {  
			var rect = this.getChangedRect(ctx.canvas.width, ctx.canvas.height)
			ctx.save()
			ctx.beginPath()
			if(!this.config.isOptimize || this.firstDraw) {  // 2017.02.20, from V3.1.1
				rect.x = 0
				rect.y = 0
				rect.width = ctx.canvas.width
				rect.height = ctx.canvas.height
				this.firstDraw = false
			}
			ctx.rect(rect.x, rect.y, rect.width, rect.height)
			ctx.clip()
			ctx.clearRect(rect.x, rect.y, rect.width, rect.height)
			var preDraw = Date.now() 
			this.rootScene.draw(ctx)
			var drawTime = Date.now() - preDraw
			this.timelist.push(drawTime)
			if(this.timelist.length >= 30)
			{
				var average = this.countAverage(this.timelist)
				this.timelist = []
				//console.log("draw time average " + average)
			}
			ctx.restore()
		} 
	}

	countAverage(list){
		var sum = 0
		for(var i = 0; i < list.length; i++){
			sum += list[i]
		}
		return sum / list.length
	}

	teardown() {
		for(var i in this.allGameElement){
			var deleteObj = this.allGameElement[i]
			if(Framework.Util.isFunction(deleteObj.teardown)) {
				deleteObj.teardown()
			}           
			this.allGameElement[i] = null
			delete this.allGameElement[i]
		}
		this.allGameElement.length = 0
	}

	getChangedRect(maxWidth, maxHeight) {
		var rect = { x: maxWidth, y: maxHeight, x2: 0, y2: 0 }
		
		this.traversalAllElement(function(ele) {
			if(ele.isObjectChanged) {
				var nowDiagonal = Math.ceil(Math.sqrt(ele.width * ele.width + ele.height * ele.height)),
					nowX = Math.ceil(ele.absolutePosition.x - nowDiagonal / 2), 
					nowY = Math.ceil(ele.absolutePosition.y - nowDiagonal / 2),  
					nowX2 = nowDiagonal + nowX,
					nowY2 = nowDiagonal + nowY,
					preDiagonal = Math.ceil(Math.sqrt(ele.previousWidth * ele.previousWidth + ele.previousHeight * ele.previousHeight)),
					preX = Math.ceil(ele.previousAbsolutePosition.x - preDiagonal / 2), 
					preY = Math.ceil(ele.previousAbsolutePosition.y - preDiagonal / 2),  
					preX2 = preDiagonal + preX,
					preY2 = preDiagonal + preY,
					x = (nowX < preX)? nowX:preX,
					y = (nowY < preY)? nowY:preY,
					x2 = (nowX2 > preX2)? nowX2:preX2,
					y2 = (nowY2 > preY2)? nowY2:preY2

				if(x < rect.x) {
					rect.x = x
				}

				if(y < rect.y) {
					rect.y = y                   
				}

				if(x2 > rect.x2) {
					rect.x2 = x2
				}

				if(y2 > rect.y2) {
					rect.y2 = y2
				}
			}
		})

		rect.width = rect.x2 - rect.x
		rect.height= rect.y2 - rect.y

		return rect
	}

	showAllElement() {
		this.traversalAllElement(function(ele) {
			console.log(ele, "ele.isMove", ele._isMove, "ele.isRotate", ele._isRotate, "ele.isScale", ele._isScale, "ele.changeFrame", ele._changeFrame, "ele.isObjectChanged", ele.isObjectChanged);
		})
	}
	/**
	* 處理點擊的事件, 當mousedown + mouseup 都成立時才會被觸發
	* @event click
	* @param {Object} e 事件的參數, 會用到的應該是e.x和e.y兩個參數,
	* 表示的是目前點擊的絕對位置
	*/
	click(e) {
	}

	/**
	* 處理滑鼠點下的事件
	* @event mousedown
	* @param {Object} e 事件的參數, 會用到的應該是e.x和e.y兩個參數,
	* 表示的是目前點擊的絕對位置
	*/
	mousedown(e) {
	}

	/**
	* 處理滑鼠放開的事件
	* @event mouseup
	* @param {Object} e 事件的參數, 會用到的應該是e.x和e.y兩個參數,
	* 表示的是目前放開的絕對位置
	*/
	mouseup(e) {
	}

	/**
	* 處理滑鼠移動的事件(不論是否有點下, 都會觸發該事件)
	* @event mousemove
	* @param {Object} e 事件的參數, 會用到的應該是e.x和e.y兩個參數,
	* 表示的是目前滑鼠的絕對位置
	*/
	mousemove(e) {
	}

	/**
	* 處理觸控到螢幕時的事件, 若是在一般電腦上跑, 是不會觸發此事件的
	* (除非使用debugger模擬, https://developers.google.com/chrome-developer-tools/docs/mobile-emulation?hl=zh-TW)
	* @event touchstart
	* @param {Object} e 事件的參數, 
	* 會用到的應該是e.touches[0].clientX和e.touches[0].clientY兩個參數,
	* 表示的是目前觸控到的位置
	*/
	touchstart(e) {
	}
	
	touchend(e) {
	}

	/**
	* 處理觸控到螢幕並移動時的事件, 若是在一般電腦上跑, 是不會觸發此事件的
	* (除非使用debugger模擬, https://developers.google.com/chrome-developer-tools/docs/mobile-emulation?hl=zh-TW)
	* @event touchmove
	* @param {Object} e 事件的參數, 
	* 會用到的應該是e.touches[0].clientX和e.touches[0].clientY兩個參數,
	* 表示的是目前最新觸控到的位置
	*/
	touchmove(e) {
	}
	
	keydown(e) {
	}
	
	keyup(e) {
	}
	
	keypress(e) {
	}

	resetCycleCount() {
		this.cycleCount = 0
	}
	
	autodelete() {
		for(var i in this.rootScene.attachArray){
			if(Framework.Util.isFunction(this.rootScene.attachArray[i].teardown)) {
				this.rootScene.attachArray[i].teardown()
			}                
			this.rootScene.attachArray[i] = null
			delete this.rootScene.attachArray[i];               
		}
		this.rootScene.attachArray.length = 0
		this.teardown()
	}
}