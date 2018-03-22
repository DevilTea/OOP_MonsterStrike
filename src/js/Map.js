class Map {
	constructor(level) {
		autoBind(this)
		this.level = level
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.deceleration = -100
		this.box2D = new Framework.Box2D()
		this.box2D.createWorld()
		this.walls = {
			top : this.box2D.createSquareBody(1080/30, 0, this.box2D.bodyType_Static),
			left : this.box2D.createSquareBody(0, 1920/30, this.box2D.bodyType_Static),
			right : this.box2D.createSquareBody(0, 1920/30, this.box2D.bodyType_Static),
			bottom : this.box2D.createSquareBody(1080/30, 0, this.box2D.bodyType_Static)
		}
		this.walls.top.SetPosition(new this.box2D.b2Vec2(0, 0))
		this.walls.left.SetPosition(new this.box2D.b2Vec2(0, 0))
		this.walls.right.SetPosition(new this.box2D.b2Vec2(1080/30, 0))
		this.walls.bottom.SetPosition(new this.box2D.b2Vec2(0, 1920/30))
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
		this.box2D.draw()
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