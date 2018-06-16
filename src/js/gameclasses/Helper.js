GameClasses.Helper = class Helper {
    constructor() {
        this.mainContainer
        this.background
        this.currectButton
        this.cancelButton
        this.helperSpriteButton
        this.helperPhoto = []
    }

    load() {
        this.helperSpriteButton = new Framework.Sprite(imagePath + 'UI/itemothers.png')
        this.helperPhoto.push(new Framework.Sprite(imagePath + 'helper/help1.png'))
        this.helperPhoto.push(new Framework.Sprite(imagePath + 'helper/help2.png'))
        this.helperPhoto.push(new Framework.Sprite(imagePath + 'helper/help3.png'))
        this.helperPhoto.push(new Framework.Sprite(imagePath + 'helper/help4.png'))
    }

    initialize(){
        this.helperSpriteButton.initTexture()
        this.initializeMenu()
        this.initializeButton()
    }

    initializeButton(){
        // 刪除按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '確定'       
        // 返回按鈕
        // this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        // this.cancelButton.ele.innerText = '返回'
    }

    initializeMenu() {
        /*
        this.mainContainer = Framework.HtmlElementUI.createElement(100, 500, 800, 600, document.createElement('div'), undefined, true)
        this.background = Framework.HtmlElementUI.createElement(0, 0, 800, 900, document.createElement('DIALOG'), this.mainContainer, false)
        this.background.ele.dialog = {buttons:{"Ok": () => {dialog("close")}}}
        this.background.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
        console.log(this.background)
        let test = Framework.HtmlElementUI.createElement(0, 0, 800, 600, document.createElement('img'), this.background, false)
        let number = 0
        test.ele.src = this.helperPhoto[number].id
        test.clickEvent = (e) => {
        number = (++number)%4
            test.ele.src = this.helperPhoto[number].id
        }*/
    }

    

    create() { // 顯示選項
        // Framework.HtmlElementUI.attachElement(this.mainContainer)
        // this.mainContainer.create()
        GameClasses.HtmlElementView.createHelpDialog(this.helperPhoto, () => {})
    }

    remove() {// 移除選項
        // Framework.HtmlElementUI.detachElement(this.mainContainer)
        // this.mainContainer.remove()
    }

    setCurrentlButtonClickEvent(callBack) { // 設定取消按鈕的事件
        // this.currectButton.clickEvent = () => {
        //     // callBack()
        //     this.remove()
        // }
    }

    // setCancelButtonClickEvent(callBack) { // 設定取消按鈕的事件
    //     this.cancelButton.clickEvent = () => {
    //         callBack()
    //         this.remove()
    //     }
    // }

}