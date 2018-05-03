GameClasses.Map = class Map {
    constructor() {
        autoBind(this)
        this.stage
        this.matter
        this.nextMapObjectID = 0
        this.mapObjects = []
        this.monsters = []
        this.marbles = []
        this.hasAddMarbles = false
    }

    load() {
        this.loadMonsters()
    }

    initialize() {
    }

    update() {
    }

    draw(ctx) {
    }

    addMapObject(mapObject) {
        mapObject.mapObjectID = this.nextMapObjectID++
        mapObject.map = this
        mapObject.matter = this.matter
        this.mapObjects.push(mapObject)
    }

    removeMapObject(mapObject) {
        this.mapObjects.splice(this.mapObjects.indexOf(mapObject), 1)
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

    /*Marbles*/
    addMarbles(marbles) {
        if(!this.hasAddMarbles) {
            marbles.forEach((marble) => {
                this.addMapObject(marble)
                marble.component.label = 'mapObjectID_' + marble.mapObjectID
                this.marbles.push(marble)
            })
            this.hasAddMarbles = true
        }
    }

    removeMarbles() {
        this.marbles.forEach((marble) => {
            this.removeMapObject(marble)
        })
        this.marbles.legth = 0
    }


    /*Monsters*/
    loadMonsters() {
        this.monsters.forEach((monster) => {
            monster.load()
        })
    }

    initializeMonsters() {
        this.monsters.forEach((monster) => {
            monster.initialize()
        })
    }

    updateMonsters() {
        this.monsters.forEach((monster) => {
            monster.update()
        })
    }

    drawMonsters(ctx) {
        this.monsters.forEach((monster) => {
            monster.draw(ctx)
        })
    }

    addMonster(monster) {
        this.addMapObject(monster)
        this.monsters.push(monster)
    }

    removeMonster(monster) {
        this.removeMapObject(monster)
        this.monsters.splice(this.monsters.indexOf(monster), 1)
        monster.remove()
    }

    isAllMonstersDead() {
        return this.monsters.length === 0
    }

    /*Matter*/
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
					monster.accumulateDamage(marble.damage)
				}
			}
		})
	}

	collisionEnd(event) {
	}
}