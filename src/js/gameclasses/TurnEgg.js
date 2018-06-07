GameClasses.TurnEgg = class TurnEgg {
    constructor(){
        this.eggSprite
        this.egg
        this.container
        this.background
        this.currectButton
        this.cancelButton
    }

    load(){
        this.eggSprite = new Framework.Sprite(imagePath + 'item/item2.png')
    }

    initialize(){
        this.eggSprite.initTexture()
        this.egg = this.eggSprite.getSection({x:356, y:161}, {x:446, y:264})
        this.egg.initTexture()
        this.initializetMenu()
    }
    initializetMenu(){
        this.container = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.container, false)
        // 確認按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '轉owo'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
        this.background.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
        this.currectButton.clickEvent = (e) =>{
            console.log('轉拉')
        }

        this.cancelButton.clickEvent = (e) =>{
            console.log('沒轉拉')
        }
    }

    create(){
        Framework.HtmlElementUI.attachElement(this.container)
        this.container.create()
    }

    remove(){
        Framework.HtmlElementUI.detachElement(this.container)
        this.container.remove()
    }

    setCancelButtonClickEvent(callBack){
        this.cancelButton.clickEvent = (e) =>{
            callBack()
            this.remove()
        }
    }

    getRandomMarble(marble){
        return marble
    }
}