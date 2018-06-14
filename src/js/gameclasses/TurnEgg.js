GameClasses.TurnEgg = class TurnEgg {
    constructor() {
        this.eggSprite
        this.egg
        this.container
        this.background
        this.currectButton
        this.cancelButton
        this.currentBagSize = 0
        this.oldBagSize = 0
        this.bigMarblePic
    }

    load() {
        this.eggSprite = new Framework.Sprite(imagePath + 'item/item2.png')
    }

    initialize() {
        this.eggSprite.initTexture()
        this.egg = this.eggSprite.getSection({ x: 356, y: 161 }, { x: 446, y: 264 })
        this.egg.initTexture()
        this.initializetMenu()
    }

    initializetMenu() {
        this.container = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.container, false)
        // 確認按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '轉owo'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
        this.background.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
    }

    create(bagmarbles, marbleSmallImgs) {
        Framework.HtmlElementUI.attachElement(this.container)
        this.container.create()
        this.currectButton.clickEvent = (e) => {
            this.oldBagSize = bagmarbles.length
            this.getRandomMarble(bagmarbles, marbleSmallImgs)
        }
    }

    remove() {
        Framework.HtmlElementUI.detachElement(this.container)
        this.container.remove()
    }

    setCancelButtonClickEvent(callBack,createElementList) {
        this.cancelButton.clickEvent = (e) => {
            if(this.currentBagSize != this.oldBagSize) { // 沒有轉蛋 就不需重載
                this.oldBagSize = this.currentBagSize
                callBack()
            } else {
                createElementList()
            }
            // this.bigMarblePic.remove()
            this.remove()
        }
    }

    imageShowBigMarble(randomNumber){   // 顯示抽中的彈珠大圖
        if(this.background.childs.length > 2){
            this.background.childs.pop()
            Framework.HtmlElementUI.detachElement(this.bigMarblePic)
            this.bigMarblePic.remove()
        }        
        this.bigMarblePic = Framework.HtmlElementUI.createElement(0, 100, '960', '960', document.createElement('img'), this.background, false)
        this.bigMarblePic.ele.src = imagePath + 'big/' + randomNumber + '.png'
        this.remove()
        Framework.HtmlElementUI.attachElement(this.container)
        this.container.create()
    }

    getRandomMarble(bagmarbles, marbleSmallImgs) {
        let number = 100//3174
        // for(number in marbleDataList){}
        let randomNumber = Math.floor((Math.random() * number))
        while(!marbleDataList[randomNumber]){
            randomNumber = Math.floor((Math.random() * number))
        }
        bagmarbles.push(marbleDataList[randomNumber])
        marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + randomNumber + '.jpg'))
        this.currentBagSize = bagmarbles.length
        this.imageShowBigMarble(randomNumber)
    }
}