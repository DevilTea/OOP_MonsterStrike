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
        this.helperPhoto.push(new Framework.Sprite(imagePath + 'helper/help5.png'))
    }
    initialize() {
        this.helperSpriteButton.initTexture()
        this.initializeMenu()
        this.initializeButton()
    }
    initializeButton() {
        // 刪除按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '確定'
    }
    initializeMenu() {
    }
    create() { // 顯示選項
        GameClasses.HtmlElementView.createHelpDialog(this.helperPhoto, () => { })
    }
    remove() {// 移除選項
    }
    setCurrentlButtonClickEvent(callBack) { // 設定取消按鈕的事件
    }
    setCancelButtonClickEvent(callBack) { // 設定取消按鈕的事件
    }
}