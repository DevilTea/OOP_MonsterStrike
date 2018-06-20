'use strict'
//在Canvas上製造出Html元件的class
Framework.HtmlElementUI = new (class HtmlElementUI {
    constructor() {
        autoBind(this)
        this.attachedHtmlElements = []
    }

    createElement(x, y, width, height, ele, parentHtmlElement, onCanvas = true) {
        let newHtmlElement = new HtmlElement(x, y, width, height, ele, parentHtmlElement, onCanvas)
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

    createTestDialog(msg, callback, ...args) {
        let fullContainer = this.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = this.createElement(140, 360, 800, 600, document.createElement('div'), fullContainer, true)
        let dialogText = this.createElement(20, 20, 760, 480, document.createElement('div'), dialogBackground, false)
        let enterButton = this.createElement(300, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px'}
        dialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'left', borderRadius: '5px'}
        dialogText.ele.innerText = msg
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        enterButton.ele.innerText = '確認'

        fullContainer.clickEvent = (e) => e.stopPropagation()
        fullContainer.mousedownEvent = (e) => e.stopPropagation()
        fullContainer.mouseupEvent = (e) => e.stopPropagation()
        fullContainer.mousemoveEvent = (e) => e.stopPropagation()

        dialogBackground.mousedownEvent = (e) => {
            e.preventDefault()
            e = Framework.MouseManager.countCanvasOffset(e)
            mouseOffset.x = dialogBackground.originX - e.x
            mouseOffset.y = dialogBackground.originY - e.y
        }

        fullContainer.mousemoveEvent = (e) => {
            if(e.buttons === 1) {
                e.preventDefault()
                e = Framework.MouseManager.countCanvasOffset(e)
                dialogBackground.position = {x: mouseOffset.x + e.x, y: mouseOffset.y + e.y}
            }
        }

        enterButton.clickEvent = (e) => {
            this.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
        }

        this.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }
})

class HtmlElement {
    constructor(x, y, width, height, ele, parent, onCanvas) {
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
        this.hasCreated = false
        this.onCanvas = onCanvas
        this.isRootElement = Framework.Util.isUndefined(parent)

        this.clickEvent = (e) => {}
        this.mousedownEvent = (e) => {}
        this.mouseupEvent = (e) => {}
        this.mousemoveEvent = (e) => {}
        this.addEventListener('click', this.click, false)
        this.addEventListener('mousedown', this.mousedown, false)
        this.addEventListener('mouseup', this.mouseup, false)
        this.addEventListener('mousemove', this.mousemove, false)

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

    click(e) {
        this.clickEvent(e)
    }

    mouseup(e) {
        this.mouseupEvent(e)
    }

    mousedown(e) {
        this.mousedownEvent(e)
    }

    mousemove(e) {
        this.mousemoveEvent(e)
    }

    create() {
        if(!this.hasCreated) {
            this.hasCreated = true
            if(this.isRootElement) {
                Framework.Game.mainContainer.appendChild(this.ele)
            } else {
                this.parent.ele.appendChild(this.ele)
            }
            this.childs.forEach((child) => {
                child.create()
            })
        }
    }

    remove() {
        if(this.hasCreated) {
            this.hasCreated = false
            if(this.isRootElement) {
                Framework.Game.mainContainer.removeChild(this.ele)
            } else {
                this.ele.parentElement.removeChild(this.ele)
                
            }
            this.childs.forEach((child) => {
                child.remove()
            })
        }
    }

    resize() {
        let re = this.hasCreated
        let widthRatio
        let heightRatio
        
        if(this.isRootElement) {
            widthRatio = Framework.Game.widthRatio
            heightRatio = Framework.Game.heightRatio
        } else {
            if(this.originWidth === 'full') {
                widthRatio = Framework.Game.widthRatio
            } else {
                if(this.parent.originWidth === 'full') {
                    widthRatio = Framework.Game.widthRatio
                } else {
                    widthRatio = (+this.parent.ele.style.width.slice(0, this.parent.ele.style.width.length - 2) / this.parent.originWidth)
                }
            }
            
            if(this.originHeight === 'full') {
                heightRatio = Framework.Game.heightRatio
            } else {
                if(this.parent.originWidth === 'full') {
                    heightRatio = Framework.Game.heightRatio
                } else {
                    heightRatio = (+this.parent.ele.style.height.slice(0, this.parent.ele.style.height.length - 2) / this.parent.originHeight)
                }
            }
        }
        
        if(re) this.remove()
        this.nowX = (this.onCanvas ? Framework.Game.canvas.offsetLeft : 0) + widthRatio * this.originX
        this.nowY = (this.onCanvas ? Framework.Game.canvas.offsetTop : 0) + heightRatio * this.originY
        
        if(this.originWidth === 'full') {
            if(this.isRootElement) {
                if(this.onCanvas) {
                    this.nowWidth = Framework.Config.canvasWidth * widthRatio
                } else {
                    this.nowWidth = '100%'
                }
            } else {
                this.nowWidth = this.parent.nowWidth
            }
        } else {
            this.nowWidth = widthRatio * this.originWidth
        }
        
        if(this.originHeight === 'full') {
            if(this.isRootElement) {
                if(this.onCanvas) {
                    this.nowHeight = Framework.Config.canvasHeight * heightRatio
                } else {
                    this.nowHeight = '100%'
                }
            } else {
                this.nowHeight = this.parent.nowHeight
            }
        } else {
            this.nowHeight = heightRatio * this.originHeight
        }
        
        
        this.style = {left: this.nowX, top: this.nowY, width: this.nowWidth, height: this.nowHeight}
        if(re) this.create()
        this.childs.forEach((child) => {
            child.resize()
        })
    }
}