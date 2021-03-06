GameClasses.StartPage = class StartPage extends Framework.GameMainMenu {
    constructor() {
        super()
        autoBind(this)
    }
    initializeProgressResource() {
        super.initializeProgressResource()
        this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
        this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        this.loading.scale = { x: 4, y: 4 }
        this.audio = new Framework.AudioManager({
            bgm_startPage: {
                ogg: musicPath + 'bgm/bgm_startPage.ogg',
            }
        })
    }
    load() {
        super.load()
        this.menu = new Framework.Sprite(imagePath + 'background/startPage.png')
        this.menu.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        this.menu.scale = { x: 2, y: 2 }
    }
    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.loading.draw(ctx)
    }
    initialize() {
        super.initialize()
        GameClasses.HtmlElementView.createWelcomeDialog("物件導向程式設計實習\n盧冠宇大帥哥 - 大爆射\n指導老師：陳偉凱\n組員：　　　　　　　\n陳威任 105590010\n卓旭嘉 105590046", () => {
            this.audio.play({ name: 'bgm_startPage', loop: true });
            this.rootScene.attach(this.menu)
        })
    }
    update() {
        super.update()
    }
    draw(parentCtx) {
        super.draw(parentCtx)
        this.rootScene.draw(parentCtx)
    }
    teardown() {
        super.teardown()
    }
    click(e) {
        super.click(e)
    }
    mouseup(e) {
        super.mouseup(e)
        this.audio.stop('bgm_startPage')
        Framework.Game.goToNextLevel()
    }
    mousedown(e) {
        super.mousedown(e)
    }
    mousemove(e) {
        super.mousemove(e)
    }
    //為了要讓Mouse和Touch都有一樣的事件
    //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
    touchstart(e) {
        super.touchstart(e)
        this.mousedown(e[0])
    }
    touchend(e) {
        super.touchend(e)
        this.mouseup(e)
    }
    touchmove(e) {
        super.touchmove(e)
        this.mousemove(e[0])
    }
}
// 贏了多少場
let userPlayInfo = {
    winGame: 0,
    lostGame: 0,
    playGame: 0,
    gem: 50
}
