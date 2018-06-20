GameClasses.TurnEgg = class TurnEgg{
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
        this.gemImg
        this.NumberOfGem
        this.gemCost = 5
        this.audio
        this.marblesNumberList = []
    }
    load() {
        Object.keys(marbleDataList).forEach((key) =>{
            this.marblesNumberList.push(marbleDataList[key].id)
        })
        this.egg = new Framework.Sprite(imagePath + 'UI/turnEgg.png')
        this.backgroundSprite = new Framework.Sprite(imagePath + 'background/background.png')
        this.audio = new Framework.AudioManager(
            {
                sound_get_marble : {
                    ogg : musicPath + 'sound/sound_get_marble.ogg'
                }
            }
        )
    }
    initialize() {
        this.backgroundSprite.initTexture()
        this.egg.initTexture()
        this.initializetMenu()
    }
    initializetMenu() {
        this.container = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let background = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', this.backgroundSprite.texture, this.container, true)
        background.style = { left: 0 }
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.container, false)
        // 確認按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '一抽'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
        // 寶石圖片
        this.gemImg = Framework.HtmlElementUI.createElement(-260, 20, 200, 200, document.createElement('img'), this.container, false)
        this.NumberOfGem = Framework.HtmlElementUI.createElement(-300, 220, 280, 60, document.createElement('div'), this.container, false)
        this.gemImg.ele.src = imagePath + 'UI/gem.png'
        this.NumberOfGem.style = { color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '1em' }
        this.NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
        this.gemImg.clickEvent = (e) => {
            userPlayInfo.gem += 5
            this.NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
        }
    }
    create(bag) {
        Framework.HtmlElementUI.attachElement(this.container)
        this.NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
        this.container.create()
        this.currectButton.clickEvent = (e) => {
            if(userPlayInfo.gem >= this.gemCost) {
                userPlayInfo.gem -= this.gemCost
                this.NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
                this.oldBagSize = bag.bagMarbles.length
                this.getRandomMarble(bag)
            } else {
                GameClasses.HtmlElementView.createDialog('\r\n寶石不足！\r\n還需要' + (this.gemCost - userPlayInfo.gem) + '個寶石', () => { })
            }
        }
    }
    remove() {
        Framework.HtmlElementUI.detachElement(this.container)
        this.container.remove()
    }
    setCancelButtonClickEvent(callBack, createElementList, stopMusic) {
        this.cancelButton.clickEvent = (e) => {
            if(this.currentBagSize != this.oldBagSize) { // 沒有轉蛋 就不需重載
                this.oldBagSize = this.currentBagSize
                stopMusic()
                callBack()
            } else {
                createElementList()
            }
            this.remove()
        }
    }
    imageShowBigMarble(randomNumber) {   // 顯示抽中的彈珠大圖
        if(this.background.childs.length > 2) {
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
        let number = this.marblesNumberList.length//100//3174
        // for(number in marbleDataList){}
        let randomNumber = Math.floor((Math.random() * number))
        console.log(number, randomNumber)
        while (!marbleDataList[this.marblesNumberList[randomNumber]]) {
            randomNumber = Math.floor((Math.random() * number))
        }
        bag.bagMarbles.push(marbleDataList[this.marblesNumberList[randomNumber]])
        this.currentBagSize = bag.bagMarbles.length
        this.imageShowBigMarble(this.marblesNumberList[randomNumber])
        this.audio.play({name: 'sound_get_marble', loop:false})
    }
}