GameClasses.BagUI = class BagUI {
    constructor() {
        this.mainContainer
        this.background
        this.currectButton
        this.cancelButton
        this.bagSprite
        this.selectedMarbledImageList
        this.elementsList
        this.currentBagSize = 0
        this.oldBagSize = 0
    }
    load() {
        this.bagSprite = new Framework.Sprite(imagePath + 'UI/monsters.png')
    }
    initialize(bag) {
        this.initializeMenu()
        this.initializeButton()
        this.initializeMarblesImage(bag)
    }
    initializeButton() {
        // 刪除按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '刪除'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
    }
    initializeMenu() {
        this.selectedMarbledImageList = []
        this.bagSprite.initTexture()
        this.mainContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.mainContainer, false)
        this.background.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
    }
    initializeMarblesImage(bag) {
        this.inlineContainer = Framework.HtmlElementUI.createElement(40, 40, 'full', '1500', document.createElement('div'), this.background, true)
        this.inlineContainer.style = { overflowY: 'auto', left: this.background.style.left }
        let addImgY = 0
        this.elementsList = []
        bag.bagMarbles.forEach((marble, index) => {
            if(index % 4 == 0) { addImgY += 210 }
            let marbleSmallEle = { isSelect: false }
            marbleSmallEle.ele = Framework.HtmlElementUI.createElement((20 * ((index % 4) + 1)) + (205 * ((index % 4))), -200 + addImgY, 205, 205, document.createElement('img'), this.inlineContainer, false)
            marbleSmallEle.ele.ele.src = imagePath + 'small/' + marble.id + '.jpg'
            marbleSmallEle.ele.style = { opacity: 0.5 }// 調整透明度 : 0.5透明 彈珠未被選則
            marbleSmallEle.ele.clickEvent = (e) => {
                marbleSmallEle.ele.style = { opacity: 1 } // 調整透明度 : 不透明 彈珠被選則
                if(marbleSmallEle.isSelect) {
                    for (let i = 0; i < this.selectedMarbledImageList.length; i++) { //
                        if(this.selectedMarbledImageList[i].index == marbleSmallEle.index) {
                            this.selectedMarbledImageList.splice(i, 1)
                            break
                        }
                    }
                    marbleSmallEle.ele.style = { opacity: 0.5 }
                    marbleSmallEle.isSelect = false
                } else {
                    marbleSmallEle.isSelect = true
                    marbleSmallEle.index = index
                    this.selectedMarbledImageList.push({ id: marble.id, index: index })
                }
                // console.log(this.selectedMarbledImageList.length)
            }
            this.elementsList.push(marbleSmallEle)
        })
    }
    showBag() { // 顯示選項
        Framework.HtmlElementUI.attachElement(this.mainContainer)
        this.mainContainer.create()
    }
    removeBag() {// 移除選項
        Framework.HtmlElementUI.detachElement(this.mainContainer)
        this.mainContainer.remove()
    }
    setDeletetButtonButtonClickEvent(bag) { // 設定確定按鈕的事件
        this.currentBagSize = bag.bagMarbles.length
        this.oldBagSize = bag.bagMarbles.length 
        this.currectButton.clickEvent = (e) => {
            if(!this.selectedMarbledImageList.length) return
            GameClasses.HtmlElementView.createWarningDialog('\n確定刪除？', () => {
                this.deleteMarblesImage(bag)
                this.elementsList.forEach((marbleSmallEle) => {
                    marbleSmallEle.ele.style = { opacity: 0.5 }
                    marbleSmallEle.isSelect = false
                })
                this.selectedMarbledImageList = []                
            })
        }
    }
    setCancelButtonClickEvent(reload, callBack, stopMusic) { // 設定取消按鈕的事件
        this.cancelButton.clickEvent = (e) => {
            this.selectedMarbledImageList = []
            this.elementsList.forEach((marbleSmallEle) => {
                marbleSmallEle.ele.style = { opacity: 0.5 }
                marbleSmallEle.isSelect = false
            })
            this.removeBag()
            if(this.currentBagSize != this.oldBagSize) {
                this.oldBagSize = this.currentBagSize
                stopMusic()
                reload()
            }
            else {
                callBack()
            }
        }
    }
    deleteMarblesImage(bag) {
        this.selectedMarbledImageList.sort((a, b) => {return b.index - a.index})// 以 index 做反向排序
        this.selectedMarbledImageList.forEach((value) => {
            bag.bagMarbles.splice(value.index, 1)
        })
        this.removeBag() 
        let buttonTeam = this.currectButton.clickEvent // 暫存點擊事件 因為初始化會把事件洗掉
        let buttonTea2 = this.cancelButton.clickEvent
        this.initialize(bag)
        this.currectButton.clickEvent = buttonTeam
        this.cancelButton.clickEvent = buttonTea2
        this.showBag()
        this.currentBagSize = bag.bagMarbles.length
    }
}