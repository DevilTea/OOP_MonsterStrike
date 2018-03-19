class Marble extends Framework.GameMainMenu {
	constructor(attribute = 0, rebound = false, hp = 0, atk = 0, spd = 0, race = 0) {
		super()		
		this.attribute = attribute	//屬性
		this.rebound = rebound		//反射/貫通
		this.hp = hp				//HP
		this.atk = atk				//攻擊力
		this.spd = spd				//速度
		this.race = race			//種族
		this.skill = []				//技能
		this.comboSkill = []		//友情技能
	}

	initializeProgressResource() {
		const ran = Math.floor((Math.random() * 10) + 1)
		this.loading = new Framework.Sprite(imagePath + 'marble/Ball1742.png')
		this.loading.position = {x: Framework.Game.getCanvasWidth() / ran , y: Framework.Game.getCanvasHeight() / ran}
		this.loading.scale = 2
	}
	load() {
		this.pic = new Framework.Sprite(imagePath + 'marble/Ball1742.png')
		this.pic.position = { x: Framework.Game.getCanvasWidth() / ran, y: Framework.Game.getCanvasHeight() / ran }
        this.pic.scale = 2
        this.rootScene.attach(this.pic)
	}
	
	loadingProgress(ctx, requestInfo) {
		 this.loading.draw(ctx)
		// this.audio.play({name: 'bgm_startPage', loop: true})
	}
	
	initialize() {
		
	}
	
	update() {
		
	}
	
	draw(parentCtx) {
        this.rootScene.draw(parentCtx)
        //this.pic.draw(parentCtx);
	}
	
	teardown() {
		
	}
	
    click(e){      
        //Framework.Game.goToNextLevel();

    }
	
	mouseup(e) {
        // this.audio.stop('bgm_startPage');
		// Framework.Game.goToNextLevel();
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