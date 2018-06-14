GameClasses.StageSelect = class StageSelect extends Framework.GameMainMenu {
    constructor() {
        super()
        this.isInit = false
        this.bagIsLoad = false
        this.bagIsInitialize = false
        this.stage = {}
        this.bag = new GameClasses.Bag()
        this.bagUI = new GameClasses.BagUI()
        this.turnEgg = new GameClasses.TurnEgg()
        this.teamSystem = new GameClasses.TeamSystem()
    }

    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
        this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        this.loading.scale = { x: 4, y: 4 }
    }

    load() {
        super.load()
        this.bagUI.load()
        this.teamSystem.load(this.bag)
        this.turnEgg.load()
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.stage = {}
        this.bagUI.initialize(this.bag)
        this.teamSystem.initialize(this.bag)
        this.turnEgg.initialize()
        this.createStageSelectList()
    }

    createStageSelectList() {
        let num = Object.keys(Stages).length
        // 關卡選單
        let listContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let listBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), listContainer, false)
        // 轉蛋
        let eggButton = Framework.HtmlElementUI.createElement(-240, 10, 200, 200, this.turnEgg.egg.texture, listBackground, false)
        // 背包按鈕
        let bagButton = Framework.HtmlElementUI.createElement(-240, 210, 200, 200, this.bagUI.bagSprite.texture, listBackground, false)
        // 關卡顯示清單
        let listItems = []
        // 各個選單背景設定
        listBackground.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)' }

        let createElementList = ()=> {  // 建立關卡選單元素
            Framework.HtmlElementUI.attachElement(listContainer)
            listContainer.create()
        }
        let removeElementList = () => { // 移除關卡選單元素
            Framework.HtmlElementUI.detachElement(listContainer)
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
                this.teamSystem.create()// 怪物資料清單
                this.teamSystem.setCurrectButtonButtonClickEvent(
                    () => {
                        this.stage[key] = new Stages[key]([...GameClasses.MarblePick.creatMarbles(this.teamSystem.getSelectedMarbledList())])
                    },
                    () => {
                        Framework.Game.addNewLevel(this.stage)
                        Framework.Game.goToLevel(key)
                    }
                )
                this.teamSystem.setCancelButtonClickEvent(
                    () => {createElementList()}
                )
                removeElementList()
            }
            // 轉蛋按鈕
            eggButton.clickEvent = (e) => {
                this.turnEgg.create(this.bag)
                removeElementList()
                this.turnEgg.setCancelButtonClickEvent(
                    ()=>{
                    Framework.Game.reLoadLevel()   // 重新載入當前 Level 資訊，但不會重新載入 constructor() 資訊
                                                    // 因為重載當前 Level 資訊，所以不必再執行 this.createElementList() 否則會造成畫面重疊
                    },
                    () =>{createElementList()}
                )
            }
            // 背包按鈕
            bagButton.clickEvent = (e) => {
                removeElementList()
                this.bagUI.setDeletetButtonButtonClickEvent(this.bag)
                this.bagUI.setCancelButtonClickEvent(
                    ()=>{
                        Framework.Game.reLoadLevel()   // 重新載入當前 Level 資訊，但不會重新載入 constructor() 資訊
                                                        // 因為重載當前 Level 資訊，所以不必再執行 this.createElementList() 否則會造成畫面重疊
                    },
                    () =>{createElementList()}
                )
                this.bagUI.showBag()
            }
            listItems.push(listItem)
        })
        createElementList()
    }

}