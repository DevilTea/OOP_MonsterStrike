class Map {
	constructor(level) {
		autoBind(this)
		this.level = level
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.wall = { top : { p1 : new Framework.Point(0, 0), p2 : new Framework.Point(1080, 0) }, left : { p1 : new Framework.Point(0, 0), p2 : new Framework.Point(0, 1920) }, right : { p1 : new Framework.Point(1080, 0), p2 : new Framework.Point(1080, 1920) }, bottom : { p1 : new Framework.Point(0, 1920), p2 : new Framework.Point(1080, 1920) } }
		this.deceleration = -20
	}
	
	load() {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].load()
		}
	}
	
	initialize() {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].initialize()
		}
	}
	
	update() {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].update()
		}
	}
	
	draw(ctx) {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].draw(ctx)
		}
	}
	
	mouseup(e) {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].mouseup(e)
		}
    }

    mousedown(e) {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].mousedown(e)
		}
    }

    mousemove(e) {
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].mousemove(e)
		}
    }
	
    touchstart(e) {
        this.mousedown(e[0])
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].touchstart(e)
		}
    }

    touchend(e) {
        this.mouseup(e[0])
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].touchend(e)
		}
    }
    
    touchmove(e) {
        this.mousemove(e[0])
		for(let i = 0; i < this.mapObjects.length; i++) {
			this.mapObjects[i].touchmove(e)
		}
    }	
	
	addMapObject(mapObject) {
		this.nextMapObjectID++
		mapObject.map = this
		this.mapObjects.push(mapObject)
	}
	
	removeaddMapObject(mapObject) {
		let indexToRemove = this.mapObjects.indexOf(mapObject)
		if(indexToRemove != -1) {
			this.mapObjects.splice(indexToRemove, 1)
		}
	}	
}