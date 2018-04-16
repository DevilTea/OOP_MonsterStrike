'use strict'
//在Canvas上製造出Html元件的class
Framework.HtmlElementUI = new (class HtmlElementUI {
    constructor() {
        this.attachedHtmlElements = []
    }

    createElement(x, y, width, height, ele) {
        let newHtmlElement = new HtmlElement(x, y, width, height, ele)
        return newHtmlElement
    }

    attachElement(htmlElement) {
        this.attachedHtmlElements.push(htmlElement)
    }

    detachElement(htmlElement) {
        let indexToRemove = this.attachedHtmlElements.indexOf(htmlElement)
        if(indexToRemove !== -1) {
            this.attachedHtmlElements.splice(indexToRemove, 1)
        }
    }

    removeAll() {
        let toRemove = [...this.attachedHtmlElements]
        this.attachedHtmlElements.forEach((htmlElement) => htmlElement.remove())
        toRemove.forEach((attached) => this.detachElement(attached))
    }

    resize() {
        this.attachedHtmlElements.forEach((ele) => ele.resize())
    }
})

class HtmlElement {
    constructor(x, y, width, height, ele, parent) {
        Object.defineProperty(this, 'style', {
			get: () => {
				return this.ele.style
			},
			set: (newValue) => {
                $(this.ele).css(newValue)
			}
        })
        
        Object.defineProperty(this, 'position', {
            get: () => {
                return {x: this.originX, y: this.originY}
            },
            set: (newValue) => {
                if(newValue.x !== this.originX || newValue.y !== this.originY) {
                    this.originX = newValue.x
                    this.originY = newValue.y
                    this.resize()
                }
            }
        })
        
        Object.defineProperty(this, 'width', {
            get: () => {
                return this.originWidth
            },
            set: (newValue) => {
                if(newValue !== this.originWidth) {
                    this.originWidth = newValue
                    this.resize()
                }
            }
        })
        
        Object.defineProperty(this, 'height', {
            get: () => {
                return this.originHeight
            },
            set: (newValue) => {
                if(newValue !== this.originHeight) {
                    this.originHeight = newValue
                    this.resize()
                }
            }
        })
        
        this.hasCreated = false
        this.isRootElement = Framework.Util.isUndefined(parent)
        this.originX = x
        this.originY = y
        this.originWidth = width
        this.originHeight = height
        this.nowX = x
        this.nowY = y
        this.nowWidth = width
        this.nowHeight = height
        this.ele = ele
        this.parent = parent
        this.style = {display: 'box', float: 'left', position: 'absolute'}
        this.resize()
    }

    addEventListener(eventName, callback, useCapture = false) {
        this.ele.addEventListener(eventName, callback, useCapture)
    }

    removeEventListener(eventName, callback) {
        this.ele.removeEventListener(eventName, callback)
    }

    create() {
        if(!this.hasCreated) {
            this.hasCreated = true
            if(this.isRootElement) {
                $(Framework.Game.canvasContainer).append(this.ele)
            } else {
                $(this.parent.ele).append(this.ele)
            }
        }
    }

    remove() {
        if(this.hasCreated) {
            this.hasCreated = false
            $(this.ele).remove()
        }
    }

    resize() {
        let re = this.hasCreated
        let widthRatio = this.isRootElement ? Framework.Game.widthRatio : (+this.parent.ele.style.width.slice(0, this.parent.ele.style.width.length - 2) / this.parent.ele.originWidth)
        let heightRatio = this.isRootElement ? Framework.Game.heightRatio : (+this.parent.ele.style.height.slice(0, this.parent.ele.style.height.length - 2) / this.parent.ele.originHeight)
        if(re) this.remove()
        this.nowX = (this.isRootElement ? Framework.Game.canvas.offsetLeft : this.parent.nowX) + widthRatio * this.originX
        this.nowY = (this.isRootElement ? Framework.Game.canvas.offsetTop : this.parent.nowY) + heightRatio * this.originY
        this.nowWidth = widthRatio * this.originWidth
        this.nowHeight = heightRatio * this.originHeight
        this.style = {left: this.nowX + 'px', top: this.nowY, width: this.nowWidth, height: this.nowHeight}
        if(re) this.create()
    }
}