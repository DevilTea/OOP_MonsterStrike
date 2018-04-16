'use strict'
//在Canvas上製造出Html元件的class
Framework.HtmlElementUI = new (class HtmlElementUI {
    constructor() {
        autoBind(this)
        this.attachedHtmlElements = []
    }

    createElement(x, y, width, height, ele, parentHtmlElement) {
        let newHtmlElement = new HtmlElement(x, y, width, height, ele, parentHtmlElement)
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

    testDialog(msg) {
        let back = this.createElement(140, 360, 800, 600, document.createElement('div'))
        back.style = {backgroundColor: '#eeeeee'}
        let text = this.createElement(20, 20, 760, 480, document.createElement('div'), back)
        text.style = {backgroundColor: '#ffffff', overflowY: 'scroll', textAlign: 'left'}
        text.ele.innerText = msg
        let btn = this.createElement(300, 530, 200, 60, document.createElement('button'), back)
        btn.ele.innerText = "Touch"
        btn.addEventListener('click', () => {
            back.remove()
            this.detachElement(back)
        })
        this.attachElement(back)
        back.create()
    }
})

class HtmlElement {
    constructor(x, y, width, height, ele, parent) {
        autoBind(this)
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
        if(!this.isRootElement) {
            this.parent.childs.push(this)
        }
        this.childs = []
        this.style = {display: 'block', float: 'left', position: 'absolute'}
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
            this.childs.forEach((child) => {
                $(this.ele).append(child.ele)
            })
        }
    }

    remove() {
        if(this.hasCreated) {
            this.hasCreated = false
            $(this.ele).remove()
            this.childs.forEach((child) => {
                child.remove()
            })
        }
    }

    resize() {
        let re = this.hasCreated
        let widthRatio = this.isRootElement ? Framework.Game.widthRatio : (+this.parent.ele.style.width.slice(0, this.parent.ele.style.width.length - 2) / this.parent.originWidth)
        let heightRatio = this.isRootElement ? Framework.Game.heightRatio : (+this.parent.ele.style.height.slice(0, this.parent.ele.style.height.length - 2) / this.parent.originHeight)
        if(re) this.remove()
        this.nowX = (this.isRootElement ? Framework.Game.canvas.offsetLeft : 0) + widthRatio * this.originX
        this.nowY = (this.isRootElement ? Framework.Game.canvas.offsetTop : 0) + heightRatio * this.originY
        this.nowWidth = widthRatio * this.originWidth
        this.nowHeight = heightRatio * this.originHeight
        this.style = {left: this.nowX + 'px', top: this.nowY, width: this.nowWidth, height: this.nowHeight}
        if(re) this.create()
        this.childs.forEach((child) => {
            child.resize()
        })
    }
}