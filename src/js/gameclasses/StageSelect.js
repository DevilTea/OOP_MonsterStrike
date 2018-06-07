GameClasses.StageSelect = class StageSelect extends Framework.GameMainMenu {
    constructor() {
        super()
        this.selectedMarbledList = []
        this.isInit = false
        this.bagIsLoad = false
        this.bagIsInitialize = false
        this.bag = new GameClasses.Bag()
        this.turnEgg = new GameClasses.TurnEgg()
    }

    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
        this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        this.loading.scale = { x: 4, y: 4 }
    }

    load() {
        super.load()
        this.turnEgg.load()
        if(!this.bagIsLoad){
            this.bagIsLoad = true
            this.bag.load()
        }
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.turnEgg.initialize()
        if(!this.bagIsInitializ){
            this.bagIsInitialize = true
            this.bag.initialize()
        }
        this.createStageSelectList()
    }

    createStageSelectList() {
        let num = Object.keys(Stages).length
        // 關卡選單
        let listContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let listBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), listContainer, false)
        let egg = Framework.HtmlElementUI.createElement(0, 1600, 200, 200, this.turnEgg.egg.texture, listBackground, false)
        egg.fill
        // 彈珠選單
        let marbleSmallEleContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let marbleSmallEleBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), marbleSmallEleContainer, false)
        // 確認按鈕
        let button = Framework.HtmlElementUI.createElement(700, 1600, 250, 100, document.createElement('button'), marbleSmallEleBackground, false)
        button.ele.innerText = '確定'
        // 返回按鈕
        let cancelButton = Framework.HtmlElementUI.createElement(350, 1600, 250, 100, document.createElement('button'), marbleSmallEleBackground, false)
        cancelButton.ele.innerText = '返回'
        // 關卡顯示清單
        let listItems = []
        let marbleSmallEles = []
        // 各個選單背景設定
        listBackground.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
        marbleSmallEleBackground.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }
        //
        let addImgY = 0
        let isSelected = false, isCreat = false

        let createElementList = ()=>{
            Framework.HtmlElementUI.attachElement(listContainer)// 點擊關卡選項後 移除關卡選項html元素
            listContainer.create()
        }
        let removeElementforList = () =>{
            Framework.HtmlElementUI.detachElement(listContainer)// 點擊關卡選項後 移除關卡選項html元素
            listContainer.remove()
        }

        Object.keys(Stages).forEach((key, index) => {
            let listItem = Framework.HtmlElementUI.createElement(20, (20 * (index + 1)) + (200 * index), 960, 200, document.createElement('div'), listBackground, false)
            let listItemNameTag = Framework.HtmlElementUI.createElement(20, 20, 0, 0, document.createElement('div'), listItem, false)
            let listItemDescription = Framework.HtmlElementUI.createElement(20, 100, 960, 0, document.createElement('div'), listItem, false)
            listItem.style = { backgroundColor: '#333333' }
            listItemNameTag.style = { color: '#ffffff', fontWeight: 'bold' }
            listItemNameTag.ele.innerText = key
            listItemDescription.style = { color: '#ffffff', fontWeight: 'bold', fontSize: '2em' }
            listItemDescription.ele.innerText = Stages[key].getStageName()
            // 關卡清單點擊事件
            listItem.clickEvent = (e) => {
                // 怪物資料清單
                if(!isCreat) {
                    isCreat = true //配合返回鍵時 避免掉重複建立此判斷事裡的事件或物件
                    this.bag.bagMarbles.forEach((marble, index) => { // 從背包取出彈珠 預設4個
                        let id = marble.id
                        if(index % 4 == 0) { addImgY += 210 }
                        let marbleSmallEle = Framework.HtmlElementUI.createElement((20 * ((index % 4) + 1)) + (205 * ((index % 4))), 0 + addImgY, 205, 205, this.bag.marbleSmallImgs[index].texture, marbleSmallEleBackground, false)
                        marbleSmallEle.style = { opacity: 0.6 }// 調整透明度 : 0.6透明 彈珠未被選則
                        marbleSmallEle.clickEvent = (e) => {
                            if(this.selectedMarbledList.length < 4) {
                                marbleSmallEle.style = { opacity: 1 } // 調整透明度 : 不透明 彈珠被選則
                                this.selectedMarbledList.forEach((item, index) => { // 判斷是否已經選過
                                    if(item.id == id) { //有選過 就不加入選擇清單 並重設為透明
                                        isSelected = true 
                                        marbleSmallEle.style = { opacity: 0.6 }
                                        this.selectedMarbledList.splice(index, 1)
                                    } else { isSelected = false }
                                })
                                if(!isSelected) { this.selectedMarbledList.push({ id: id, index: index }) }
                            } else if(this.selectedMarbledList.length == 4) {
                                this.selectedMarbledList.forEach((item, index) => {
                                    if(item.id == id) {
                                        isSelected = true
                                        marbleSmallEle.style = { opacity: 0.6 }
                                        this.selectedMarbledList.splice(index, 1)
                                    }
                                })
                            }
                            if(this.selectedMarbledList.length == 0) { isSelected = false }
                            console.log(this.selectedMarbledList.length)
                        }
                        button.clickEvent = (e) => { // 確認按鈕點擊事件
                            if(this.selectedMarbledList.length == 4) {
                                let stage = {}
                                marbleDataList[304] = new GameClasses.MarbleData(304, "Zeus of the Shining Flame", "Deity", GameClasses.elementTypeEnum.LIGHT, GameClasses.slingTypeEnum.PIERCE, 26595, 22549, 369.93, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_DOUBLE_VERTICAL, GameClasses.skillLevelEnum.LASER_L, 21302))
                                this.bag.bagMarbles.push(marbleDataList[304])
                                this.bag.marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + marbleDataList[304].id + '.jpg'))
                                this.bag.marbleSmallImgs[this.bag.marbleSmallImgs.length - 1].initTexture
                                Framework.HtmlElementUI.detachElement(marbleSmallEleContainer)
                                marbleSmallEleContainer.remove()
                                stage[key] = new Stages[key]([...GameClasses.MarblePick.creatMarbles(this.selectedMarbledList)])
                                isSelected = false
                                this.selectedMarbledList = []
                                marbleSmallEles.forEach((marbleSmallEle) => {
                                    marbleSmallEle.style = { opacity: 0.6 }
                                    marbleSmallEle.clickEvent = (e) => {
                                        e.preventDefault() // 取消 clickEvent
                                    }
                                })
                                Framework.Game.addNewLevel(stage)
                                Framework.Game.goToLevel(key)
                            }
                        }
                        cancelButton.clickEvent = (e) => { // 返回按鈕
                            Framework.HtmlElementUI.detachElement(marbleSmallEleContainer)// 
                            marbleSmallEleContainer.remove()
                            createElementList()
                            this.selectedMarbledList = []
                            marbleSmallEles.forEach((marbleSmallEle) => {
                                marbleSmallEle.style = { opacity: 0.6 }
                            })
                            isSelected = false
                        }
                        marbleSmallEles.push(marbleSmallEle)
                    })
                }
                Framework.HtmlElementUI.detachElement(listContainer)// 
                listContainer.remove()
                Framework.HtmlElementUI.attachElement(marbleSmallEleContainer)// 
                marbleSmallEleContainer.create()
            }
            egg.clickEvent = (e) => {
                this.turnEgg.create()
                Framework.HtmlElementUI.detachElement(listContainer)// 
                listContainer.remove()
                this.turnEgg.setCancelButtonClickEvent(()=>{
                    createElementList()
                })
            }
            listItems.push(listItem)
        })
        Framework.HtmlElementUI.attachElement(listContainer)// 
        listContainer.create()
    }

}