class StartPage extends Framework.GameMainMenu {
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
            bgm_startPage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'bgm/bgm_startPage.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }
        })
	}
	
	load() {
		super.load()
		this.menu = new Framework.Sprite(imagePath + 'background/startPage.png')
		this.menu.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2 )
        this.menu.scale = {x: 2, y: 2}
	}
	
	loadingProgress(ctx, requestInfo) {
		super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
	}
	
	initialize() {
		super.initialize()
		this.createDialog("Waa\r\n\r\n哈囉")
	}
	
	update() {
		super.update()
	}
	
	draw(parentCtx) {
		super.draw(parentCtx)
        this.rootScene.draw(parentCtx);
        //this.menu.draw(parentCtx);
	}
	
	teardown() {
		super.teardown()
	}
	
    click(e) {
		super.click(e)
    }
	
	mouseup(e) {
		super.mouseup(e)
        this.audio.stop('bgm_startPage');
		Framework.Game.goToNextLevel();
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
	
	createDialog(msg) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(140, 660, 800, 600, document.createElement('div'), fullContainer, true)
        let dialogText = Framework.HtmlElementUI.createElement(20, 20, 760, 480, document.createElement('div'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(300, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px'}
        dialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '3em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px'}
        dialogText.ele.innerText = msg
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        enterButton.ele.innerText = '確認'

        fullContainer.clickEvent = (e) => e.stopPropagation()
        fullContainer.mousedownEvent = (e) => e.stopPropagation()
        fullContainer.mouseupEvent = (e) => e.stopPropagation()
        fullContainer.mousemoveEvent = (e) => e.stopPropagation()

        dialogBackground.mousedownEvent = (e) => {
            e.preventDefault()
            e = Framework.MouseManager.countCanvasOffset(e)
            mouseOffset.x = dialogBackground.originX - e.x
            mouseOffset.y = dialogBackground.originY - e.y
            canDrag = true
        }

        fullContainer.mouseupEvent = (e) => {
            canDrag = false
        }

        fullContainer.mousemoveEvent = (e) => {
            if(e.buttons === 1 && canDrag) {
                e.preventDefault()
                e = Framework.MouseManager.countCanvasOffset(e)
                dialogBackground.position = {x: mouseOffset.x + e.x, y: mouseOffset.y + e.y}
            }
        }

        enterButton.clickEvent = (e) => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
			Framework.MouseManager.startHandle()
			this.audio.play({name: 'bgm_startPage', loop: true})
			this.rootScene.attach(this.menu);
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }
}