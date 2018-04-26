GameClasses.Map = class Map {
	constructor(stage) {
		//autoBind(this)
		this.stage = stage
		this.nextMapObjectID = 0
		this.mapObjects = []
		this.monsters = []
		this.marbles = []
		this.matter = this.stage.matter
	}
	
	load() {
		//this.mapObjects.forEach((value) => value.load())
		this.audio = new Framework.AudioManager({
			hit1: {
                mp3: musicPath + 'sound/hit1.mp3'
			},
			hit2: {
                mp3: musicPath + 'sound/hit2.mp3'
            },
			hit3: {
                mp3: musicPath + 'sound/hit3.mp3'
            },
			hit4: {
                mp3: musicPath + 'sound/hit4.mp3'
            }
        })
	}
	
	initialize() {
		this.mapObjects.forEach((value) => value.initialize())
	}

	remove() {
		this.monsters.forEach((monster) => {
			monster.remove()
		})
		this.removeMarbles()
	}
	
	update() {
		//this.matter.update()
		this.mapObjects.forEach((value) => value.update())
	}
	
	draw(ctx) {
		this.mapObjects.forEach((value) => value.draw(ctx))
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
				if(this.stage.marbles[this.stage.nowMarble] === marble) {
					let songNamelist = Object.keys(this.audio.mainPlaylist)
					this.audio.play({name: songNamelist[Math.floor(Math.random() * songNamelist.length)], loop: false})
					monster.accumulationDamage += marble.atk
				}
				//monster.nowHp = Math.max(monster.nowHp - marble.atk, 0)
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
		mapObject.component.bodyOptions.label = 'mapObjectID_' + mapObject.mapObjectID
		mapObject.component.body.label = 'mapObjectID_' + mapObject.mapObjectID
	}
	
	removeMapObject(mapObject) {
		let indexToRemove = this.mapObjects.indexOf(mapObject)
		if(indexToRemove != -1) {
			this.mapObjects.splice(indexToRemove, 1)
		}
	}

	addMonster(monster) {
		this.monsters.push(monster)
		this.addMapObject(monster)
	}

	removeMonster(monster) {
		monster.remove()
		let indexToRemove = this.monsters.indexOf(monster)
		if(indexToRemove != -1) {
			this.monsters.splice(indexToRemove, 1)
		}
		this.removeMapObject(monster)
	}

	addMarbles(marbles) {
		this.marbles = [...marbles]
		this.marbles.forEach((marble) => {
			this.addMapObject(marble)
		})
	}

	removeMarbles() {
		this.marbles.forEach((marble) => {
			marble.component.removeBodyFromWorld()
			this.removeMapObject(marble)
		})
	}
	
	getMapObjectByID(mapObjectID) {
		let temp
		this.mapObjects.forEach((value) => {
			if(value.mapObjectID == mapObjectID) {
				temp = value
			}
		})
		return temp
	}
}