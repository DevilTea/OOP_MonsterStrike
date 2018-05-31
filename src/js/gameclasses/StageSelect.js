GameClasses.StageSelect = class StageSelect extends Framework.GameMainMenu {
    constructor() {
        super()

    }

    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2 )
        this.loading.scale = {x: 4, y: 4}
    }

    load() {
        super.load()
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.createStageSelectList()
    }

    createStageSelectList() {
        let num = Object.keys(Stages).length
        let listContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, true)
        let listBackground = Framework.HtmlElementUI.createElement(40, 40, 1000, 1840, document.createElement('div'), listContainer, false)
        let listItems = []
        listBackground.style = {backgroundColor: 'rgba(17, 17, 17, 0.7)'}

        Object.keys(Stages).forEach((key, index) => {
            let listItem = Framework.HtmlElementUI.createElement(20, (20 * (index + 1)) + (200 * index), 960, 200, document.createElement('div'), listBackground, false)
            let listItemNameTag = Framework.HtmlElementUI.createElement(20, 20, 0, 0, document.createElement('div'), listItem, false)
            let listItemDescription = Framework.HtmlElementUI.createElement(20, 100, 960, 0, document.createElement('div'), listItem, false)
            listItem.style = {backgroundColor: '#333333'}
            listItemNameTag.style = {color: '#ffffff', fontWeight: 'bold'}
            listItemNameTag.ele.innerText = key
            listItemDescription.style = {color: '#ffffff', fontWeight: 'bold', fontSize: '2em'}
            listItemDescription.ele.innerText = Stages[key].getStageName()

            listItem.clickEvent = (e) => {  
                Framework.HtmlElementUI.detachElement(listContainer)
                listContainer.remove()
                let stage = {}
                stage[key] = new Stages[key]([...GameClasses.MarblePick.testMarbles()])
                Framework.Game.addNewLevel(stage)
                Framework.Game.goToLevel(key)
            }

            listItems.push(listItem)
        })
        
        Framework.HtmlElementUI.attachElement(listContainer)
        listContainer.create()
    }
}