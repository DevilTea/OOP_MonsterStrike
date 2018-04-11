'use strict'
//在Canvas上製造出Html元件的class
Framework.HtmlElementUI = new (class HtmlElementUI {
    constructor() {
        this.createdElements = []
    }

    createElement(x, y, width, height, elementName) {
        let newElement = new HtmlElement(x, y, width, height, document.createElement(elementName))
        this.createdElements.push(newElement)
        return newElement
    }

    resize() {
        this.createdElements.forEach((ele) => ele.resize())
    }
})

class HtmlElement {
    constructor(x, y, width, height, ele) {
        Object.defineProperty(this, 'style', {
			get : function() {
				return this.ele.style
			},
			set : function (newValue) {
                $(this.ele).css(newValue)
			}
		})
        this.ele = ele
        this.originX = x
        this.originY = y
        this.originWidth = width
        this.originHeight = height
        this.style = {display: 'inline-box', float: 'left', position: 'absolute'}
        this.resize()
        $(Framework.Game.canvasContainer).append(this.ele)
    }

    addEventListener(eventName, callback, useCapture = false) {
        this.ele.addEventListener(eventName, callback, useCapture)
    }

    resize() {
        let widthRatio = Framework.Game.widthRatio
        let heightRatio = Framework.Game.heightRatio
        $(this.ele).remove()
        this.style = {top: Framework.Game.canvas.offsetTop + heightRatio * this.originY + 'px', left: Framework.Game.canvas.offsetLeft + widthRatio * this.originX + 'px', width: widthRatio * this.originWidth + 'px', height: heightRatio * this.originHeight + 'px'}
        $(Framework.Game.canvasContainer).append(this.ele)
    }
}