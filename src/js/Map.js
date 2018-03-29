GameClasses.Map = class Map {
	constructor(level) {
		autoBind(this)
		this.level = level
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.matter = this.level.matter
		let wallThickness = 500
		let wallOptions = { label: 'mapObjectID_-1', isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1}
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
		event.pairs.forEach((value) => {
			let mapObjID_A = parseInt(value.bodyA.label.slice(12))
			let mapObjID_B = parseInt(value.bodyB.label.slice(12))
			if((this.getMapObjectByID(mapObjID_A) instanceof GameClasses.Marble && this.getMapObjectByID(mapObjID_B) instanceof GameClasses.Monster) ||
			(this.getMapObjectByID(mapObjID_A) instanceof GameClasses.Monster && this.getMapObjectByID(mapObjID_B) instanceof GameClasses.Marble)) {
				let marble
				let monster
				if(this.getMapObjectByID(mapObjID_A) instanceof GameClasses.Marble && this.getMapObjectByID(mapObjID_B) instanceof GameClasses.Monster) {
					marble = this.getMapObjectByID(mapObjID_A)
					monster = this.getMapObjectByID(mapObjID_B)
				} else {
					marble = this.getMapObjectByID(mapObjID_B)
					monster = this.getMapObjectByID(mapObjID_A)
				}
				monster.nowHp = Math.max(monster.nowHp - marble.atk, 0);
				console.log("attack %d", monster.mapObjectID)
				if(monster.nowHp == 0) {
					this.removeMapObject(monster)
					console.log("kill %d", monster.mapObjectID)
				}
			}
		})
		//this.mapObjects.forEach((value) => value.collisionStart(event))
	}

	collisionEnd(event) {
		//this.mapObjects.forEach((value) => value.collisionEnd(event))
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
		mapObject.mapObjectID = (this.nextMapObjectID++)
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
	
	getMapObjectByID(mapObjectID) {
		var temp
		this.mapObjects.forEach((value, index) => {
			if(value.mapObjectID == mapObjectID) {
				temp = value
			}
		})
		return temp
	}
}