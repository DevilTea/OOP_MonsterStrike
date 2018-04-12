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
        
        this.originX = x
        this.originY = y
        this.originWidth = width
        this.originHeight = height
        this.ele = ele
        this.parent = parent || Framework.Game.canvasContainer
        this.hasCreated = false
        this.style = {display: 'inline-box', float: 'left', position: 'absolute'}
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
            $(this.parent).append(this.ele)
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
        let widthRatio = this.parent === Framework.Game.canvasContainer ? Framework.Game.widthRatio : (+this.parent.style.width.slice(0, this.parent.style.width.length - 2) / this.parent.originWidth)
        let heightRatio = this.parent === Framework.Game.canvasContainer ? Framework.Game.heightRatio : (+this.parent.style.height.slice(0, this.parent.style.height.length - 2) / this.parent.originHeight)
        if(re) this.remove()
        this.style = {top: Framework.Game.canvas.offsetTop + Math.round(heightRatio * this.originY) + 'px', left: Framework.Game.canvas.offsetLeft + Math.round(widthRatio * this.originX) + 'px', width: Math.round(widthRatio * this.originWidth) + 'px', height: Math.round(heightRatio * this.originHeight) + 'px'}
        if(re) this.create()
    }
}