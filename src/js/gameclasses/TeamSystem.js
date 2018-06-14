GameClasses.TeamSystem = class TeamSystem {
    constructor() {
        this.isSelect = false
        this.selectedMarbledList = []
        this.mainContainer
        this.background
        this.currectButton
        this.cancelButton
        this.marbleSmallEles
        this.marbleSmallImgs
    }

    load(bag) {
        let check = {}
        this.marbleSmallImgs = []
        bag.bagMarbles.forEach((marble) => {
            if(check[marble.name] !== undefined) { // 假如圖片資源重複 就直接複製一分就好
                this.marbleSmallImgs.push(this.marbleSmallImgs[check[marble.name]].cloneImage())
            } else {
                check[marble.name] = this.marbleSmallImgs.length
                this.marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + marble.id + '.jpg'))
            }
        })
    }

    initialize(bag){
        this.initializeMenu()
        this.initializeButton()
        this.initializeMarblesImage(bag)
    }

    initializeButton(){
        // 確認按鈕
        this.currectButton = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.currectButton.ele.innerText = '確定'
        // 返回按鈕
        this.cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), this.background, false)
        this.cancelButton.ele.innerText = '返回'
    }

    initializeMenu(){ // 初始化怪物選項 點擊事件、
        this.marbleSmallImgs.forEach((img) => {
            img.initTexture()
        })
        this.marbleSmallEles = [] // 每當重新載入 StageSelect 都要初始化 重新建立
        this.mainContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        this.background = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), this.mainContainer, false)
        this.background.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)'}
    }

    initializeMarblesImage(bag){
        this.inlineContainer = Framework.HtmlElementUI.createElement(40, 40, 'full', '1500', document.createElement('div'), this.background, true)
        this.inlineContainer.style = {overflowY:'auto',left:this.background.style.left}
        let addImgY = 0
        bag.bagMarbles.forEach((marble, index) => {
            if(index % 4 == 0) { addImgY += 210 }
            let marbleSmallEle = {isSelect:false}
            marbleSmallEle.ele = Framework.HtmlElementUI.createElement((20 * ((index % 4) + 1)) + (205 * ((index % 4))), -200 + addImgY, 205, 205, this.marbleSmallImgs[index].texture, this.inlineContainer, false)
            marbleSmallEle.ele.style = { opacity: 0.5 }// 調整透明度 : 0.5透明 彈珠未被選則
            marbleSmallEle.ele.clickEvent = (e) => {
                if(this.selectedMarbledList.length < 4) {
                    marbleSmallEle.ele.style = { opacity: 1 } // 調整透明度 : 不透明 彈珠被選則
                    if(marbleSmallEle.isSelect){
                        for(let i = 0;i < this.selectedMarbledList.length;i++){ //
                            if(this.selectedMarbledList[i].index == marbleSmallEle.index){
                                this.selectedMarbledList.splice(i, 1)
                                break
                            }
                        }
                        marbleSmallEle.ele.style = { opacity: 0.5 }
                        marbleSmallEle.isSelect = false
                    } else {
                        marbleSmallEle.isSelect = true
                        marbleSmallEle.index = index
                        this.selectedMarbledList.push({ id: marble.id, index: index })
                    }
                }else if(this.selectedMarbledList.length == 4){
                    if(marbleSmallEle.isSelect){
                        for(let i = 0;i < this.selectedMarbledList.length;i++){
                            if(this.selectedMarbledList[i].index == marbleSmallEle.index){
                                this.selectedMarbledList.splice(i, 1)
                                break
                            }
                        }
                        marbleSmallEle.ele.style = { opacity: 0.5 }
                        marbleSmallEle.isSelect = false
                    }
                }
                console.log(this.selectedMarbledList.length)
            }
            this.marbleSmallEles.push(marbleSmallEle)
        })        
    }

    create(){ // 顯示選項
        Framework.HtmlElementUI.attachElement(this.mainContainer)
        this.mainContainer.create()
    }

    remove(){// 移除選項
        Framework.HtmlElementUI.detachElement(this.mainContainer)
        this.mainContainer.remove()
    }

    setCurrectButtonButtonClickEvent(callBack,goToLevel){ // 設定確定按鈕的事件
        this.currectButton.clickEvent = (e) =>{
            if(this.selectedMarbledList.length == 4){
                callBack()
                this.remove()
                this.selectedMarbledList = []
                this.marbleSmallEles.forEach((marbleSmallEle) => {
                    marbleSmallEle.ele.style = { opacity: 0.5 }
                    // marbleSmallEle.clickEvent = (e) => {
                    //     e.preventDefault() // 取消 clickEvent
                    // }
                })
                goToLevel()
            }
        }
    }    
    
    setCancelButtonClickEvent(callBack){ // 設定取消按鈕的事件
        this.cancelButton.clickEvent = (e) =>{
            callBack()
            this.selectedMarbledList = []
            this.marbleSmallEles.forEach((marbleSmallEle) => {
                marbleSmallEle.ele.style = { opacity: 0.5 }
                marbleSmallEle.isSelect = false
            })
            this.remove()
        }
    }

    getSelectedMarbledList(){
        return this.selectedMarbledList
    }
}