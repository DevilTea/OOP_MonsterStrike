// By Raccoon
// include namespace
'use strict'
Framework.Sprite = class Sprite extends Framework.GameObject {
	constructor(options) {
		super()
		this._tmpCanvas = document.createElement('canvas')
		this._tmpContext = this._tmpCanvas.getContext('2d')
		this.id = undefined
		this.type = undefined
		this.texture = undefined
		this.isDrawBoundry = false
		this.isDrawPace = false   
		this.isStartDrawingFromPosition	= false	
		if(Framework.Util.isString(options)) {
			this.id = options
			Framework.ResourceManager.loadImage({id:options, url:options})
			this.type = 'image'
			this.pushSelfToLevel()
		}else if(Framework.Util.isCanvas(options)){
			this.texture = options
			this.type = 'canvas'
		}else if(!Framework.Util.isUndefined(options)){
			Framework.DebugInfo.Log.error('Sprite 不支援的參數' + options)
		}
	}
	
	initTexture() {
		if(Framework.Util.isUndefined(this.texture)){
			this.texture = Framework.ResourceManager.getResource(this.id);
		}
	}
	
	draw(painter) {
		this.countAbsoluteProperty()
		if(Framework.Util.isUndefined(this.texture)) {
			this.texture = Framework.ResourceManager.getResource(this.id)
		}
		if(Framework.Game.isBackwardCompatiable){
			this.testDraw(painter)
			return
		}
		painter = painter || Framework.Game._context
		let pos
		let realWidth
		let realHeight
		if(this.type === 'image' || this.type === 'canvas') {
			// 計算縮放後的大小
			if(this.isObjectChanged) {                    
				if(!Framework.Util.isAbout(this.absoluteScale,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)) {
					realWidth = this.texture.width * this.scale
					realHeight = this.texture.height * this.scale
					// 將canvas 放大才不會被切到
					this.canvas.width = realWidth
					this.canvas.height = realHeight

					let tranlateX = this.canvas.width / 2
					let tranlateY = this.canvas.height / 2
					
					// 將Canvas 中心點移動到左上角(0,0)
					this.context.translate(tranlateX , tranlateY)
					// 旋轉Canvas
					this.context.rotate(this.absoluteRotation / 180 * Math.PI)
					// 移回來
					this.context.translate(-tranlateX , -tranlateY)
					// 縮放
					this.context.scale(this.absoluteScale, this.absoluteScale)					
					// 畫圖                
					this.context.drawImage(this.texture, 0, 0);

					
				}
				
				// 再畫到主Canvas上                    
				if(this.isDrawBoundry) {
					this.context.rect((this.canvas.width - realWidth) / 2 / this.absoluteScale, (this.canvas.height - realHeight) / 2 / this.absoluteScale, this.texture.width, this.texture.height)  
					this.context.stroke()             
				} 

				if(this.isDrawPace) {
					this.context.rect(this.absolutePosition.x, this.absolutePosition.y, 1, 1);
					this.context.stroke()
				} 
				
			}
			pos = this.isStartDrawingFromPosition ? new Framework.Point(this.absolutePosition.x, this.absolutePosition.y) : new Framework.Point(this.absolutePosition.x - (this.canvas.width / 2), this.absolutePosition.y - (this.canvas.height / 2))
			if(painter instanceof Framework.GameObject) {
				painter = painter.context;  //表示傳進來的其實是GameObject或其 Concrete Class
			}
			if(!Framework.Util.isAbout(this.absoluteScale,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)) {
				painter.drawImage(this.canvas, pos.x, pos.y)
			}
			else{
				painter.drawImage(this.texture, pos.x, pos.y)
			}
		}

	}
	
	testDraw(painter) {
		var painter = painter || Framework.Game._context;
		this.countAbsoluteProperty();
		var texture, tmp, realWidth, realHeight, tmpContext;
		if(Framework.Util.isUndefined(this.texture)){
			this.texture = Framework.ResourceManager.getResource(this.id);
		}
		if(this.type === 'image' || this.type === 'canvas') {
			// 計算縮放後的大小
			if(this.isObjectChanged) {                    
				if(!Framework.Util.isAbout(this.absoluteScale,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)){
					realWidth = this.texture.width * this.scale;
					realHeight = this.texture.height * this.scale;
					// 將canvas 放大才不會被切到
					var diagonalLength = Math.floor(Math.sqrt(Math.pow(realHeight, 2) + Math.pow(realWidth, 2)));
					this.canvas.width = diagonalLength;
					this.canvas.height = diagonalLength;

					var widthRatio = this.canvas.width / realWidth,
						heightRatio = this.canvas.height / realHeight,
						tranlateX = this.canvas.width / 2,
						tranlateY = this.canvas.height / 2;
					
					
					// 將Canvas 中心點移動到左上角(0,0)
					this.context.translate(tranlateX , tranlateY);
					// 旋轉Canvas
					this.context.rotate(this.absoluteRotation / 180 * Math.PI);
					// 移回來
					this.context.translate(-tranlateX , -tranlateY);
					// 縮放
					this.context.scale(this.absoluteScale, this.absoluteScale);
					// 畫圖                
					this.context.drawImage(this.texture, (this.canvas.width - realWidth) / 2 / this.absoluteScale, (this.canvas.height - realHeight) / 2 / this.absoluteScale);

				}
				
				// 再畫到主Canvas上                    
				if(this.isDrawBoundry) {
					this.context.rect((this.canvas.width - realWidth) / 2 / this.absoluteScale, (this.canvas.height - realHeight) / 2 / this.absoluteScale, this.texture.width, this.texture.height);   
					this.context.stroke();                 
				} 

				if(this.isDrawPace) {
					this.context.rect(this.absolutePosition.x, this.absolutePosition.y, 1, 1);
					this.context.stroke();
				} 
				
			}

			if(painter instanceof Framework.GameObject) {
				painter = painter.context;  //表示傳進來的其實是GameObject或其 Concrete Class
			}
			if(!Framework.Util.isAbout(this.absoluteScale,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)){
				painter.drawImage(this.canvas, this.absolutePosition.x - this.canvas.width / 2, this.absolutePosition.y - this.canvas.height / 2);
			}
			else{

				painter.drawImage(this.texture, this.absolutePosition.x - this.texture.width / 2, this.absolutePosition.y - this.texture.height / 2);
			}
		}
	}
	
	toString() {
		return '[Sprite Object]'
	}
	
	teardown() {
		if(this.type === 'image'){
			Framework.ResourceManager.destroyResource(this.id)
		}
	}
}