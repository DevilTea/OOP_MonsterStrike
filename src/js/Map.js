GameClasses.Map = class Map {
	constructor(level) {
		autoBind(this)
		this.level = level
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.matter = this.level.matter
		let wallThickness = 500
		let wallOptions = { label: 'wall', isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1}
		this.walls = {
			top: this.matter.createRectangleBody(540, - wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			bottom: this.matter.createRectangleBody(540, 1600 + wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			left: this.matter.createRectangleBody(- wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions),
			right: this.matter.createRectangleBody(1080 + wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions)
		}
	}
	
	load() {
		this.mapObjects.forEach((value) => value.load())
	}
	
	initialize() {
		this.mapObjects.forEach((value) => value.initialize())
	}
	
	update() {
		this.matter.update()
		this.mapObjects.forEach((value) => value.update())
	}
	
	draw(ctx) {
		this.mapObjects.forEach((value) => value.draw())
	}
	
	mouseup(e) {
		this.mapObjects.forEach((value) => value.mouseup(e))
	}

	mousedown(e) {
	this.mapObjects.forEach((value) => value.mousedown(e))
	}

	mousemove(e) {
	this.mapObjects.forEach((value) => value.mousemove(e))
	}

	touchstart(e) {
	this.mapObjects.forEach((value) => value.touchstart(e))
	}

	touchend(e) {
	this.mapObjects.forEach((value) => value.touchend(e))
	}
	
	touchmove(e) {
	this.mapObjects.forEach((value) => value.touchmove(e))
	}

	collisionStart(event) {
		this.mapObjects.forEach((value) => value.collisionStart(event))
	}

	collisionEnd(event) {
		this.mapObjects.forEach((value) => value.collisionEnd(event))
	}

	clearMonsters() {
		for(let i = 0; i < this.mapObjects.length; i++) {
			if(this.mapObjects[i] instanceof GameClasses.Monster) {
				this.removeMapObject(this.mapObjects[i])
				i--;
			}
		}
	}

	addMapObject(mapObject) {
		this.nextMapObjectID++
		mapObject.map = this
		this.mapObjects.push(mapObject)
	}
	
	removeMapObject(mapObject) {
		let indexToRemove = this.mapObjects.indexOf(mapObject)
		if(indexToRemove != -1) {
			this.mapObjects.splice(indexToRemove, 1)
			this.matter.removeBody(mapObject.component.body)
			this.level.rootScene.detach(mapObject.component.sprite)
		}
	}	
}