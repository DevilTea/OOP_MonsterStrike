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
        this.helper = new GameClasses.Helper()
        this.gemImg
        this.audio
        // this.isOpen = {check:false}
    }

    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
        this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        this.loading.scale = { x: 4, y: 4 }
        this.audio = new Framework.AudioManager({
            bgm_mainPage: {
                ogg: musicPath + 'bgm/bgm_mainPage.ogg',
            },
            sound_enterStage: {
                ogg: musicPath + 'sound/enterStage.ogg',
            }
        })
    }

    load() {
        super.load()
        this.bag.bagMarbles.sort((a, b) => { return a.id - b.id })
        this.bagUI.load()
        this.teamSystem.load(this.bag)
        this.turnEgg.load()
        this.helper.load()
        this.gemImg = new Framework.Sprite(imagePath + 'UI/gem.png')
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
        this.helper.initialize()
        this.gemImg.initTexture()
        this.createStageSelectList()
        this.audio.play({ name: 'bgm_mainPage', loop: true });
    }

    createStageSelectList() {
        let num = Object.keys(Stages).length
        // 關卡選單
        let listContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let listBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), listContainer, false)
        // 轉蛋
        let eggButton = Framework.HtmlElementUI.createElement(-240, 60, 200, 200, this.turnEgg.egg.texture, listContainer, false)
        // 背包按鈕
        let bagButton = Framework.HtmlElementUI.createElement(-240, 280, 200, 200, this.bagUI.bagSprite.texture, listContainer, false)
        // 幫助按鈕
        let helperButton = Framework.HtmlElementUI.createElement(-240, 500, 200, 200, this.helper.helperSpriteButton.texture, listContainer, false)
        // 寶石圖片
        let gemImg = Framework.HtmlElementUI.createElement(-240, 720, 200, 200, this.gemImg.texture, listContainer, false)
        let NumberOfGem = Framework.HtmlElementUI.createElement(-300, 920, 280, 50, document.createElement('div'), listContainer, false)
        NumberOfGem.style = { color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '1em' }
        NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
        // 關卡顯示清單
        let listItems = []
        // 各個選單背景設定
        listBackground.style = { backgroundColor: 'rgba(17, 17, 17, 0.7)', overflowX: 'auto' }

        let createElementList = () => {  // 建立關卡選單元素
            Framework.HtmlElementUI.attachElement(listContainer)
            listContainer.create()
        }
        let removeElementList = () => { // 移除關卡選單元素
            Framework.HtmlElementUI.detachElement(listContainer)
            listContainer.remove()
        }

        Object.keys(Stages).forEach((key, index) => {
            let listItem = Framework.HtmlElementUI.createElement(40, (20 * (index + 1)) + (200 * index), 900, 200, document.createElement('div'), listBackground, false)
            let listItemNameTag = Framework.HtmlElementUI.createElement(20, 20, 0, 0, document.createElement('div'), listItem, false)
            let listItemDescription = Framework.HtmlElementUI.createElement(20, 100, 900, 0, document.createElement('div'), listItem, false)
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
                        this.audio.stop('bgm_mainPage')
                        this.audio.play({ name: 'sound_enterStage', loop: false })
                        Framework.Game.addNewLevel(this.stage)
                        Framework.Game.goToLevel(key)
                    }
                )
                this.teamSystem.setCancelButtonClickEvent(
                    () => { createElementList() }
                )
                removeElementList()
            }
            // 轉蛋按鈕
            eggButton.clickEvent = (e) => {
                this.turnEgg.create(this.bag)
                removeElementList()
                this.turnEgg.setCancelButtonClickEvent(
                    () => {
                        Framework.Game.reLoadLevel()   // 重新載入當前 Level 資訊，但不會重新載入 constructor() 資訊
                        // 因為重載當前 Level 資訊，所以不必再執行 this.createElementList() 否則會造成畫面重疊
                    },
                    () => { createElementList() },
                    () => { this.audio.stop('bgm_mainPage') }
                )
            }
            // 背包按鈕
            bagButton.clickEvent = (e) => {
                removeElementList()
                this.bagUI.setDeletetButtonButtonClickEvent(this.bag)
                this.bagUI.setCancelButtonClickEvent(
                    () => {
                        Framework.Game.reLoadLevel()   // 重新載入當前 Level 資訊，但不會重新載入 constructor() 資訊
                        // 因為重載當前 Level 資訊，所以不必再執行 this.createElementList() 否則會造成畫面重疊
                    },
                    () => { createElementList() },
                    () => { this.audio.stop('bgm_mainPage') }
                )
                this.bagUI.showBag()
            }
            // 幫助按鈕
            helperButton.clickEvent = (e) => {
                this.helper.create()
            }
            gemImg.clickEvent = (e) => {
                userPlayInfo.gem += 5
                NumberOfGem.ele.innerText = '剩下 ' + userPlayInfo.gem + ' 個寶石'
            }
            listItems.push(listItem)
        })
        createElementList()
    }

    keydown(e) {
        if(e.key === 'M') {
            console.log('turnegg')
        }
    }

}