class Map {
	constructor(level) {
		autoBind(this)
		this.level = level
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.matter = new Framework.Matter()
		this.physicWorld = this.matter.world
		this.physicWorld.gravity = {x: 0, y: 0, scale: 0}
		let wallThickness = 500
		let wallOptions = { isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1}
		this.walls = {
			top: this.matter.createRectangleBody(540, - wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			bottom: this.matter.createRectangleBody(540, 1920 + wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			left: this.matter.createRectangleBody(- wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions),
			right: this.matter.createRectangleBody(1080 + wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions)
		}
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
		this.matter.update()
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