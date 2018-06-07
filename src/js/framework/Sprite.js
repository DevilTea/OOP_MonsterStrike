// By Raccoon
// include namespace
'use strict'
Framework.Sprite = class Sprite extends Framework.GameObject {
	constructor(source, options = {}) {
		super()
		this.id = undefined
		this.type = undefined
		this.texture = undefined
		this.options = {
			isDrawBoundry: options.isDrawBoundry || false,
			isDrawPace: options.isDrawPace || false,
			isStartDrawingFromLeftTop: options.isStartDrawingFromLeftTop || false,
			/*-------------------------------------*/
			isSection: options.isSection || false,
		}
		if(Framework.Util.isString(source)) {
			this.id = source
			Framework.ResourceManager.loadImage({ id: source, url: source })
			this.type = 'image'
			this.pushSelfToLevel()
		} else if(Framework.Util.isCanvas(source)) {
			this.texture = source
			this.type = 'canvas'
		} else if(!Framework.Util.isUndefined(source)) {
			Framework.DebugInfo.Log.error('Sprite 不支援的參數' + source)
		}
	}

	initTexture() {
		if(Framework.Util.isUndefined(this.texture)) {
			this.texture = Framework.ResourceManager.getResource(this.id);
		}
	}

	draw(painter) {
		this.animator.update()
		this.countAbsoluteProperty()
		if(Framework.Util.isUndefined(this.texture)) {
			this.texture = Framework.ResourceManager.getResource(this.id)
		}
		if(Framework.Game.isBackwardCompatiable) {
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
				if(!Framework.Util.isAbout(this.absoluteOpacity,1,0.00001) || !Framework.Util.isAbout(this.absoluteScale.x,1,0.00001) || !Framework.Util.isAbout(this.absoluteScale.y,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)) {
					realWidth = this.texture.width * this.scale.x
					realHeight = this.texture.height * this.scale.y
					// 將canvas 放大才不會被切到
					let diagonalLength = Math.ceil(Math.sqrt(Math.pow(realHeight, 2) + Math.pow(realWidth, 2)))
					this.canvas.width = diagonalLength
					this.canvas.height = diagonalLength

					let tranlateX = this.canvas.width / 2
					let tranlateY = this.canvas.height / 2

					// 將Canvas 中心點移動到左上角(0,0)
					this.context.translate(tranlateX, tranlateY)
					// 旋轉Canvas
					this.context.rotate(this.absoluteRotation / 180 * Math.PI)
					// 移回來
					this.context.translate(-tranlateX, -tranlateY)
					// 縮放
					this.context.scale(this.absoluteScale.x, this.absoluteScale.y)
					// 設定透明度
					this.context.globalAlpha = this.absoluteOpacity
					// 產生圖像
					this.context.drawImage(this.texture, (this.canvas.width - realWidth) / 2 / this.absoluteScale.x, (this.canvas.height - realHeight) / 2 / this.absoluteScale.y);
				}

				// 畫到主Canvas上                    
				if(this.options.isDrawBoundry) {
					this.context.rect((this.canvas.width - realWidth) / 2 / this.absoluteScale.x, (this.canvas.height - realHeight) / 2 / this.absoluteScale.y, this.texture.width, this.texture.height)
					this.context.stroke()
				}

				if(this.options.isDrawPace) {
					this.context.rect(this.absolutePosition.x, this.absolutePosition.y, 1, 1);
					this.context.stroke()
				}

			}

			pos = this.options.isStartDrawingFromLeftTop ? new Framework.Point(this.absolutePosition.x, this.absolutePosition.y) : new Framework.Point(this.absolutePosition.x - this.canvas.width / 2, this.absolutePosition.y - this.canvas.height / 2)
			if(painter instanceof Framework.GameObject) {
				painter = painter.context;  //表示傳進來的其實是GameObject或其 Concrete Class
			}
			if(!Framework.Util.isAbout(this.absoluteOpacity,1,0.00001) || !Framework.Util.isAbout(this.absoluteScale.x,1,0.00001) || !Framework.Util.isAbout(this.absoluteScale.y,1,0.00001) || !Framework.Util.isAbout(this.absoluteRotation,0,0.001)) {
				painter.drawImage(this.canvas, pos.x, pos.y)
			} else {
				painter.drawImage(this.texture, this.absolutePosition.x - this.texture.width / 2, this.absolutePosition.y - this.texture.height / 2)
			}
		}

	}

	testDraw(painter) {
		var painter = painter || Framework.Game._context;
		this.countAbsoluteProperty();
		var texture, tmp, realWidth, realHeight, tmpContext;
		if(Framework.Util.isUndefined(this.texture)) {
			this.texture = Framework.ResourceManager.getResource(this.id);
		}
		if(this.type === 'image' || this.type === 'canvas') {
			// 計算縮放後的大小
			if(this.isObjectChanged) {
				if(!Framework.Util.isAbout(this.absoluteScale.x, 1, 0.00001) || !Framework.Util.isAbout(this.absoluteScale.y, 1, 0.00001) || !Framework.Util.isAbout(this.absoluteRotation, 0, 0.001)) {
					realWidth = this.texture.width * this.scale.x;
					realHeight = this.texture.height * this.scale.y;
					// 將canvas 放大才不會被切到
					var diagonalLength = Math.floor(Math.sqrt(Math.pow(realHeight, 2) + Math.pow(realWidth, 2)));
					this.canvas.width = diagonalLength;
					this.canvas.height = diagonalLength;

					var widthRatio = this.canvas.width / realWidth,
						heightRatio = this.canvas.height / realHeight,
						tranlateX = this.canvas.width / 2,
						tranlateY = this.canvas.height / 2;


					// 將Canvas 中心點移動到左上角(0,0)
					this.context.translate(tranlateX, tranlateY);
					// 旋轉Canvas
					this.context.rotate(this.absoluteRotation / 180 * Math.PI);
					// 移回來
					this.context.translate(-tranlateX, -tranlateY);
					// 縮放
					this.context.scale(this.absoluteScale.x, this.absoluteScale.y);
					// 畫圖                
					this.context.drawImage(this.texture, (this.canvas.width - realWidth) / 2 / this.absoluteScale.x, (this.canvas.height - realHeight) / 2 / this.absoluteScale.y);

				}

				// 再畫到主Canvas上                    
				if(this.options.isDrawBoundry) {
					this.context.rect((this.canvas.width - realWidth) / 2 / this.absoluteScale.x, (this.canvas.height - realHeight) / 2 / this.absoluteScale.y, this.texture.width, this.texture.height);
					this.context.stroke();
				}

				if(this.options.isDrawPace) {
					this.context.rect(this.absolutePosition.x, this.absolutePosition.y, 1, 1);
					this.context.stroke();
				}

			}

			if(painter instanceof Framework.GameObject) {
				painter = painter.context;  //表示傳進來的其實是GameObject或其 Concrete Class
			}
			if(!Framework.Util.isAbout(this.absoluteScale.x, 1, 0.00001) || !Framework.Util.isAbout(this.absoluteScale.y, 1, 0.00001) || !Framework.Util.isAbout(this.absoluteRotation, 0, 0.001)) {
				painter.drawImage(this.canvas, this.absolutePosition.x - this.canvas.width / 2, this.absolutePosition.y - this.canvas.height / 2);
			} else {
				painter.drawImage(this.texture, this.absolutePosition.x - this.texture.width / 2, this.absolutePosition.y - this.texture.height / 2);
			}
		}
	}

	toString() {
		return '[Sprite Object]'
	}

	teardown() {
		if(this.type === 'image') {
			Framework.ResourceManager.destroyResource(this.id)
		}
	}
	
	getSection(upperLeft, bottomRight) {
		let tmpCanvas, tmpContext, realWidth, realHeight
		tmpCanvas = document.createElement('canvas')
		//取得局部圖片大小
		realWidth = bottomRight.x - upperLeft.x
		realHeight = bottomRight.y - upperLeft.y
		//目前canvas跟局部圖片大小一樣
		tmpCanvas.width = realWidth
		tmpCanvas.height = realHeight
		tmpContext = tmpCanvas.getContext('2d')
		//因canvas跟局部圖片大小一樣，就直接從局部圖片的左上角的-x, -y開始畫
		tmpContext.drawImage(this.texture, -upperLeft.x, -upperLeft.y)
		return new Framework.Sprite(tmpCanvas)
	}

	clone() {
		let tmpCanvas, tmpContext, realWidth, realHeight, tempResult
		tmpCanvas = document.createElement('canvas')
		tmpCanvas.width = this.texture.width
		tmpCanvas.height = this.texture.height
		tmpContext = tmpCanvas.getContext('2d')
		tmpContext.drawImage(this.texture, 0, 0)
		return new Framework.Sprite(tmpCanvas)
	}
}