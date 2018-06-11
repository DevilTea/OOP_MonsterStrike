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
                callBack()
            } else {
                createElementList()
            }
            this.remove()
        }
    }

    getRandomMarble(bagmarbles, marbleSmallImgs) {
        let number = Object.keys(marbleDataList).length
        let randomNumber = Math.floor((Math.random() * number));
        Object.keys(marbleDataList).forEach((key, index) => {
            if(randomNumber == index) {
                bagmarbles.push(marbleDataList[key])
                marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + marbleDataList[key].id + '.jpg'))
                console.log(bagmarbles)
                this.currentBagSize = bagmarbles.length
                return
            }
        })
    }
}