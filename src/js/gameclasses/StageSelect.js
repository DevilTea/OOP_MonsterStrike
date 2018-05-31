GameClasses.StageSelect = class StageSelect extends Framework.GameMainMenu {
    constructor() {
        super()
        this.marbleSmallImgs = []
    }

    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2 )
        this.loading.scale = {x: 4, y: 4}
    }

    load() {
        super.load()
        Object.keys(marbleDataList).forEach((objectKey, index)=> {
            let value = marbleDataList[objectKey].id
            this.marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + value + '.jpg'))
        })
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.createStageSelectList()

        this.marbleSmallImgs.forEach((img)=>{
            img.initTexture()
        })
    }

    createStageSelectList() {
        let num = Object.keys(Stages).length
        // 關卡選單
        let listContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let listBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), listContainer, false)
        // 彈珠選單
        let marbleSmallEleContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let marbleSmallEleBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), marbleSmallEleContainer, false)
        // 確認按鈕
        let button = Framework.HtmlElementUI.createElement(700, 1400, 250, 100, document.createElement('button'), marbleSmallEleBackground, false)
        button.ele.innerText = '確定'
        // 關卡顯示清單
        let listItems = []
        // 各個選單背景設定
        listBackground.style = {backgroundColor: 'rgba(17, 17, 17, 0.7)'}
        marbleSmallEleBackground.style = {backgroundColor: 'rgba(17, 17, 17, 0.7)'}
        //
        let addImgY = 0
        let selectedMarbledList = []
        let isSelected = false

        Object.keys(Stages).forEach((key, index) => {
            let listItem = Framework.HtmlElementUI.createElement(20, (20 * (index + 1)) + (200 * index), 960, 200, document.createElement('div'), listBackground, false)
            let listItemNameTag = Framework.HtmlElementUI.createElement(20, 20, 0, 0, document.createElement('div'), listItem, false)
            let listItemDescription = Framework.HtmlElementUI.createElement(20, 100, 960, 0, document.createElement('div'), listItem, false)
            listItem.style = {backgroundColor: '#333333'}
            listItemNameTag.style = {color: '#ffffff', fontWeight: 'bold'}
            listItemNameTag.ele.innerText = key
            listItemDescription.style = {color: '#ffffff', fontWeight: 'bold', fontSize: '2em'}
            listItemDescription.ele.innerText = Stages[key].getStageName()
            // 關卡清單點擊事件
            listItem.clickEvent = (e) => {
                // 怪物資料清單
                Object.keys(marbleDataList).forEach((objectKey, index)=> {
                    let id = marbleDataList[objectKey].id
                    if(index % 4 == 0){addImgY += 210}
                    let marbleSmallEle = Framework.HtmlElementUI.createElement((20 * ((index % 4) + 1)) + (205 * ((index % 4))), 0 + addImgY, 205, 205,this.marbleSmallImgs[index].texture, marbleSmallEleBackground, false)
                    marbleSmallEle.style = {opacity: 0.6}
                    marbleSmallEle.clickEvent = (e)=>{
                        if(selectedMarbledList.length < 4){
                            marbleSmallEle.style = {opacity: 1}
                            selectedMarbledList.forEach((item, index)=>{
                                if(item.id == id){
                                    isSelected = true
                                    marbleSmallEle.style = {opacity: 0.6}
                                    selectedMarbledList.splice(index, 1)
                                }else{isSelected = false}
                            })
                            if(!isSelected){selectedMarbledList.push({id: id, index: index})}
                        }else if(selectedMarbledList.length >= 4){
                            selectedMarbledList.forEach((item, index)=>{
                                if(item.id == id){
                                    isSelected = true
                                    marbleSmallEle.style = {opacity: 0.6}
                                    selectedMarbledList.splice(index, 1)
                                }
                            })
                        }
                        if(selectedMarbledList.length == 0){isSelected = false}
                    }
                    button.clickEvent = (e) => { // 確認按鈕點擊事件
                        if(selectedMarbledList.length == 4){
                            Framework.HtmlElementUI.detachElement(marbleSmallEleContainer)
                            marbleSmallEleContainer.remove()
                            stage[key] = new Stages[key]([...GameClasses.MarblePick.creatMarbles(selectedMarbledList)])
                            Framework.Game.addNewLevel(stage)
                            Framework.Game.goToLevel(key)                            
                        }
                    }
                })
                let stage = {}
                Framework.HtmlElementUI.detachElement(listContainer)// 點擊關卡選項後 移除關卡選項html元素
                listContainer.remove()
                Framework.HtmlElementUI.attachElement(marbleSmallEleContainer)// 進入選擇彈珠 顯示彈珠選單
                marbleSmallEleContainer.create()
            }
            listItems.push(listItem)
        })
        Framework.HtmlElementUI.attachElement(listContainer)// 一開始進入關卡選單 顯示關卡選單
        listContainer.create()
    }
}