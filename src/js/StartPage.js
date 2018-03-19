class StartPage extends Framework.GameMainMenu {
	constructor() {
		super()
	}
	
	initializeProgressResource() {
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        this.loading.scale = 4;
		this.audio = new Framework.Audio({
            bgm_startPage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'bgm/bgm_startPage.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }
        })
	}
	
	load() {
		this.menu = new Framework.Sprite(imagePath + 'background/startPage.png')
		this.menu.position = { x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2 }
        this.menu.scale = 2
        this.rootScene.attach(this.menu);
	}
	
	loadingProgress(ctx, requestInfo) {
		this.loading.draw(ctx)
		this.audio.play({name: 'bgm_startPage', loop: true})
	}
	
	initialize() {
		
	}
	
	update() {
		
	}
	
	draw(parentCtx) {
        this.rootScene.draw(parentCtx);
        //this.menu.draw(parentCtx);
	}
	
	teardown() {
		
	}
	
    click(e){      
        Framework.Game.goToNextLevel();

    }
	
	mouseup(e) {
        this.audio.stop('bgm_startPage');
		Framework.Game.goToNextLevel();
    }

    mousedown(e) {
        
    }

    mousemove(e) {    
	
    }

	//為了要讓Mouse和Touch都有一樣的事件
	//又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
    touchstart(e) {
        this.mousedown(e[0])
    }

    touchend(e) {
        this.mouseup(e)
    }
    
    touchmove(e) {
        this.mousemove(e[0])
    }
}