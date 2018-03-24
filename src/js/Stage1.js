class Stage1 extends Framework.Level {
	constructor() {
		super()
		autoBind(this)
		this.map = new Map(this)
	}
	
	initializeProgressResource() {
		super.initializeProgressResource()
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png', this)
		this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2}
        this.loading.scale = 4
	}
	
	load() {
		super.load()
		this.audio = new Framework.AudioManager({
            bgm_mainPage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'bgm/bgm_mainPage.ogg',
                //wav: define.musicPath + 'kick2.wav'
            },
			sound_enterStage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'sound/enterStage.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }
        })
		this.menu = new Framework.Sprite(imagePath + 'background/test.png', this)
		this.menu.position = { x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2 }
        this.menu.scale = 4
		this.temp = new Marble({
			marbleID : 1742,
			attribute : 0,
			rebound : 0,
			hp : 100,
			atk : 100,
			speed : 400,
			race : 0,
			skill : [],
			comboSkill : []
		}, this.map.matter)
		this.map.addMapObject(this.temp)
		this.map.load()
	}
	
	loadingProgress(ctx, requestInfo) {
		super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
	}
	
	initialize() {
		super.initialize()
        this.rootScene.attach(this.menu)
		this.audio.play({name: 'sound_enterStage', loop: false})
		this.audio.play({name: 'bgm_mainPage', loop: true})
		this.audio.setVolume("bgm_mainPage", 0.0)
		//window.setTimeout(this.audio.setVolume("bgm_mainPage", 1), 3000);
		this.map.initialize()
	}
	
	update() {
		super.update()
		this.map.update()
	}
	
	draw(parentCtx) {
		super.draw(parentCtx)
        this.rootScene.draw(parentCtx);
	}
	
	teardown() {
		super.teardown()
	}
	
    click(e){
		super.click(e)
    }
	
	mouseup(e) {
		super.mouseup(e)
		this.map.mouseup(e)
    }

    mousedown(e) {
        super.mousedown(e)
		this.map.mousedown(e)
    }

    mousemove(e) {    
		super.mousemove(e)
		this.map.mousemove(e)
    }

	//為了要讓Mouse和Touch都有一樣的事件
	//又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
    touchstart(e) {
		super.touchstart(e)
        this.mousedown(e[0])
		this.map.touchstart(e)
    }

    touchend(e) {
		super.touchend(e)
        this.mouseup(e[0])
		this.map.touchend(e)
    }
    
    touchmove(e) {
		super.touchmove(e)
        this.mousemove(e[0])
		this.map.touchmove(e)
    }
}
