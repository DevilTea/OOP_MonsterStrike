class StartPage extends Framework.Level {
	constructor() {
		super()
	}
	
	initializeProgressResource() {
		super.initializeProgressResource()
	}
	
	load() {
		super.load()
	}
	
	loadingProgress(ctx, requestInfo) {
		super.loadingProgress(ctx, requestInfo)
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
	}
	
	teardown() {
		super.teardown()
	}
	
    click(e) {
		super.click(e)
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