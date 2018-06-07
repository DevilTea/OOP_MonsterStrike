GameClasses.EndPage = class EndPage extends Framework.GameMainMenu {
	constructor() {
		super()
		autoBind(this)
	}
	
	initializeProgressResource() {
		super.initializeProgressResource()
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2 )
        this.loading.scale = {x: 4, y: 4}
		this.audio = new Framework.AudioManager({
            bgm_mainPage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'bgm/bgm_mainPage.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }
        })
	}
	
	load() {
		super.load()
		Framework.HtmlElementUI.removeAll()
		this.menu = new Framework.Sprite(imagePath + 'background/endPage.png')
		this.menu.position = new Framework.Point(Framework.Game.canvasWidth / 2, Framework.Game.canvasHeight / 2 )
        this.menu.scale = {x: 4, y: 4}
        this.rootScene.attach(this.menu);
	}
	
	loadingProgress(ctx, requestInfo) {
		super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
		//this.audio.play({name: 'bgm_mainPage', loop: true})
	}
	
	initialize() {
		super.initialize()
	}
	
	update() {
		super.update()
	}
	
	draw(parentCtx) {
		super.draw(parentCtx)
		this.rootScene.draw(parentCtx);
		parentCtx.font = '300px 微軟正黑體'
		parentCtx.fillStyle = 'white'
		parentCtx.textAlign = 'center'
		parentCtx.fillText("ㄅㄅ", Framework.Game.canvasWidth / 2, Framework.Game.canvasHeight / 2)
	}
	
	teardown() {
		super.teardown()
	}
	
    click(e) {
		super.click(e)
		Framework.Game.goToLevel('StageSelect')
    }
	
	mouseup(e) {
		super.mouseup(e)
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