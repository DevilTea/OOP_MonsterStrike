GameClasses.Map = class Map {
    constructor() {
        autoBind(this)
        this.stage
        this.matter
        this.nextMapObjectID = 0
        this.mapObjects = []
        this.monsters = []
        this.attackingMonsters = []
        this.marbles = []
        this.hasAddMarbles = false
        this.skillObjects = []
        this.audio
        this.items = []
    }
    load() {
        this.loadMonsters()
        this.audio = new Framework.AudioManager({
            hit: {
                ogg: musicPath + 'sound/hit.ogg', 
            },
            sound_lazer : {
                ogg : musicPath + 'sound/sound_lazer.ogg'
            }
        })
        // this.loadItems()
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
            if(marble.sling === GameClasses.slingTypeEnum.PIERCE || marble.sling === GameClasses.slingTypeEnum.PIERCE_2) {
                monster.component.body.isSensor = true
            } else if(marble.sling === GameClasses.slingTypeEnum.BOUNCE || marble.sling === GameClasses.slingTypeEnum.BOUNCE_2) {
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
        monster.isRemoving = true
        monster.component.componentMagician.addEffect({opacity: 0 }, 1000, () => {
            this.removeMapObject(monster)
            this.monsters.splice(this.monsters.indexOf(monster), 1)
            monster.remove()
        })
    }
    allMonsterCountdown() {
        this.monsters.forEach((monster) => {
            monster.nowAttackCountdown = monster.nowAttackCountdown - 1
            if(monster.nowAttackCountdown === 0) {
                this.attackingMonsters.push(monster)
            }
        })
    }
    monsterAttack() {
        if(this.attackingMonsters.length === 0) {
            this.stage.monstersActionDone = true
            return
        } else {
            this.attackingMonsters[0].attack()
        }
    }
    hasRemovingMonster() {
        let removing = 0
        this.monsters.forEach((monster) => {
            removing = monster.isRemoving ? (removing + 1) : removing
        })
        return removing > 0
    }
    isAllMonstersDead() {
        return this.monsters.length === 0
    }
    /*SkillObject*/
    addSkillObject(skillObject) {
        this.addMapObject(skillObject)
        this.skillObjects.push(skillObject)
        skillObject.initialize()
    }
    removeSkillObject(skillObject) {
        this.removeMapObject(skillObject)
        this.skillObjects.splice(this.skillObjects.indexOf(skillObject), 1)
    }
    updateSkillObjects() {
        this.skillObjects.forEach((skillObject) => {
            skillObject.update()
            if(skillObject.isRemoved) {
                this.removeSkillObject(skillObject)
            }
        })
    }
    drawSkillObjects(ctx) {
        this.skillObjects.forEach((skillObject) => {
            skillObject.draw(ctx)
        })
    }
    /*items*/
    // loadItems() {  //載入道具
    //     this.items.forEach((item) => {
    //         item.load()
    //     })
    // }
    // initializeItems() { // 初始化道具
    //     this.items.forEach((item) => {
    //         item.initialize()
    //     })
    // }
    updateItems() {
        this.items.forEach((item) => {
            item.update()
            // if(item.isRemoving){
            //     this.removeItems(item)
            // }
        })
    }
    drawItems(ctx) {
        this.items.forEach((item) => {
            item.draw(ctx)
        })
    }
    addItems(item){
        this.addMapObject(item)
        this.items.push(item)
        item.initialize()
    }
    isAllItemRemove() {
        return this.items.length === 0
    }
    removeItem(item) {
        item.isRemoving = true
        this.removeMapObject(item)
        this.items.splice(this.items.indexOf(item), 1)
        item.remove()
    }
    removeAllItem(){
        this.items.forEach((item) => {
            this.removeItem(item)
        })
    }
    /*Matter*/
    collisionStart(event) {
        event.pairs.forEach((value) => {
            let mapObj_A = this.getMapObjectByID(parseInt(value.bodyA.label.slice(12)))
            let mapObj_B = this.getMapObjectByID(parseInt(value.bodyB.label.slice(12)))
            // console.log(mapObj_A, mapObj_B)
            if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Marble) {
                //彈珠之間碰撞
                let friend
                if(this.stage.marbles[this.stage.nowMarble] !== mapObj_A) {
                    friend = mapObj_A
                } else if(this.stage.marbles[this.stage.nowMarble] !== mapObj_B) {
                    friend = mapObj_B
                }
                if(!friend.hasUsedComboSkill) {
                    friend.useComboSkill()
                }
            } else if((mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Monster) || (mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Monster)) {
                //彈珠與怪物之間碰撞
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
                    this.audio.play({ name: 'hit', loop:false})
					monster.accumulateDamage(marble.damage)
				}
            } else if((mapObj_A instanceof GameClasses.SkillObject && !(mapObj_B instanceof GameClasses.SkillObject)) || (mapObj_B instanceof GameClasses.SkillObject && !(mapObj_A instanceof GameClasses.SkillObject))) {
                //其中一個一定是技能物件而另一個一定不是
                let skillObject
                let mapObject
                if(mapObj_A instanceof GameClasses.SkillObject) {
                    this.audio.play({name : 'sound_lazer', loop: false})
                    skillObject = mapObj_A
                    mapObject = mapObj_B
                } else if(mapObj_B instanceof GameClasses.SkillObject) {
                    this.audio.play({name : 'sound_lazer', loop: false})
                    skillObject = mapObj_B
                    mapObject = mapObj_A
                }
                //限制另一物件一定是彈珠或怪物
                if(mapObject instanceof GameClasses.Marble || mapObject instanceof GameClasses.Monster) {
                    if(skillObject.skill.skillOwner.constructor.name.replace(/bound /g, '') === mapObject.constructor.name.replace(/bound /g, '')) {
                        if(skillObject.skill.skillOwner !== mapObject) {
                            // console.log('技能持有者與技能施放對象為同一陣營')
                        }
                    } else {
                        // console.log('技能持有者與技能施放對象為對立陣營')
                        let damage = skillObject.skill.skillData.skillDamage
                        if(mapObject instanceof GameClasses.Marble) {
                            damage = Math.round(damage * this.stage.monsterDamageRate)
                            this.stage.accumulationDamage += damage
                        } else if(mapObject instanceof GameClasses.Monster) {
                            mapObject.accumulateDamage(damage)
                        }
                    }
                }
            } else if((mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Item) || (mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Item)){
                //彈珠與道具之間碰撞
                let marble
                let item
                if(mapObj_A instanceof GameClasses.Marble && mapObj_B instanceof GameClasses.Item) {
                    marble = mapObj_A
                    item = mapObj_B
                } else if(mapObj_B instanceof GameClasses.Marble && mapObj_A instanceof GameClasses.Item) {
                    marble = mapObj_B
                    item = mapObj_A
                }
                if(this.stage.stageState === 'playerAction') {
                        item.useItemEffect()
                        this.removeItem(item)
                }
            }
		})
	}
	collisionEnd(event) {
	}
}