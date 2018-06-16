GameClasses.TurnEgg = class TurnEgg {
    constructor() {
        this.egg
        this.container
        this.background
        this.backgroundSprite
        this.currectButton
        this.cancelButton
        this.currentBagSize = 0
        this.oldBagSize = 0
        this.bigMarblePic
        this.gemCost = 5
    }

    load() {
        this.egg = new Framework.Sprite(imagePath + 'UI/turnEgg.png')
        this.backgroundSprite = new Framework.Sprite(imagePath + 'background/background.png')
    }

    initialize() {
        this.backgroundSprite.initTexture()
        this.egg.initTexture()
        this.initializetMenu()
    }

    initializetMenu() {
        this.container = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let background = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', this.backgroundSprite.texture, this.container, true)
        background.style = {left:0}
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.container, false)
        // 確認按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '轉owo'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
    }

    create(bag) {
        Framework.HtmlElementUI.attachElement(this.container)
        this.container.create()
        this.currectButton.clickEvent = (e) => {
            if (userPlayInfo.gem == this.gemCost){
                userPlayInfo.gem -= this.gemCost
                this.oldBagSize = bag.bagMarbles.length
                this.getRandomMarble(bag)
            }else{
                GameClasses.HtmlElementView.createDialog('\r\n寶石不足！\r\n還需要' + (this.gemCost - userPlayInfo.gem) + '個寶石', () => {})
            }
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
            this.remove()
        }
    }

    imageShowBigMarble(randomNumber){   // 顯示抽中的彈珠大圖
        if(this.background.childs.length > 2){
            this.background.childs.pop()
            Framework.HtmlElementUI.detachElement(this.bigMarblePic)
            this.bigMarblePic.remove()
        }        
        this.bigMarblePic = Framework.HtmlElementUI.createElement(40, 150, '960', '960', document.createElement('img'), this.background, false)
        this.bigMarblePic.ele.src = imagePath + 'big/' + randomNumber + '.png'
        this.remove()
        Framework.HtmlElementUI.attachElement(this.container)
        this.container.create()
    }

    getRandomMarble(bag) {
        let number = 100//3174
        // for(number in marbleDataList){}
        let randomNumber = Math.floor((Math.random() * number))
        while(!marbleDataList[randomNumber]){
            randomNumber = Math.floor((Math.random() * number))
        }
        bag.bagMarbles.push(marbleDataList[randomNumber])
        this.currentBagSize = bag.bagMarbles.length
        this.imageShowBigMarble(randomNumber)
    }
}