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
            let marble = this.stage.marbles[this.stage.nowMarble]
            if(marble.sling === 'pierce') {
                monster.component.body.isSensor = true
            } else if(marble.sling === 'bounce') {
                monster.component.body.isSensor = false
            }
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
			let mapObj_A = this.getMapObjectByID(parseInt(value.bodyA.label.slice(12)))
            let mapObj_B = this.getMapObjectByID(parseInt(value.bodyB.label.slice(12)))
            if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Marble) {
                //彈珠之間碰撞
                console.log('彈珠之間碰撞')
            } else if((mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Monster) || (mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Monster)) {
                //彈珠與怪物之間碰撞
                console.log('彈珠與怪物之間碰撞')
                let marble
                let monster
                if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Monster) {
                    marble = mapObj_A
                    monster = mapObj_B
                } else if(mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Monster) {
                    marble = mapObj_B
                    monster = mapObj_A
                }
                if(this.stage.stageState === 'playerAction' && this.stage.marbles[this.stage.nowMarble] === marble) {
                    
				}
            }
		})
	}

	collisionEnd(event) {
        event.pairs.forEach((value) => {
			let mapObj_A = this.getMapObjectByID(parseInt(value.bodyA.label.slice(12)))
            let mapObj_B = this.getMapObjectByID(parseInt(value.bodyB.label.slice(12)))
            if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Marble) {
                //彈珠之間碰撞
                console.log('彈珠之間碰撞')
            } else if((mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Monster) || (mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Monster)) {
                //彈珠與怪物之間碰撞
                console.log('彈珠與怪物之間碰撞')
                let marble
                let monster
                if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Monster) {
                    marble = mapObj_A
                    monster = mapObj_B
                } else if(mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Monster) {
                    marble = mapObj_B
                    monster = mapObj_A
                }
                if(this.stage.stageState === 'playerAction' && this.stage.marbles[this.stage.nowMarble] === marble) {
					monster.accumulateDamage(marble.damage)
				}
            }
		})
	}
}