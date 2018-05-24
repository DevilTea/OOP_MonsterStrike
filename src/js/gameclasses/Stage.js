GameClasses.Stage = class Stage extends Framework.Level {
    constructor(stageName, marbles) {
        super()
        autoBind(this)
        this.stageName = 'defaultName'
        this.marbles = marbles
        this.nowMarble = 0
        this.maps = []
        this.nowMap = undefined
        this.matter = new Framework.Matter()
        this.gameUI = new GameClasses.GameUI(this)
        this.stageState = 'start'
        this.spawnMonstersAnimationPlayed = false
        this.playerActionDone = false
        this.isShooted = false
        this.isAiming = false
        this.shootingUnitVector = {}
        this.mousedownPosition = {}
        this.monstersActionDone = false
        this.hasCreatedEndingDialog = false

        this.monsterHpRate = 50
        this.monsterDamageRate = 0.1

        this.skillFactory = new GameClasses.SkillFactory()
        /*background sprite*/
        this.backgroundSprite = { loading: undefined, }
        /*player*/
        this.maxHp = 0
        this.nowHp = 0
        this.accumulationDamage = 0
        /*道具設定*/
        this.itemSprite//this.item = new GameClasses.Props(pic, '1', {x: 540, y: 1000}, 'addHP')
    }

    /*FrameworkGameState*/
    initializeProgressResource() {
        super.initializeProgressResource()
        this.backgroundSprite.loading = new Framework.Sprite(imagePath + 'background/loading.png')
    }

    load() {
        super.load()
        this.backgroundSprite.game = new Framework.Sprite(imagePath + 'background/test.png')
        this.itemSprite = new Framework.Sprite(imagePath + 'item/item1.png')
        this.loadMarbles()
        this.loadMaps()
        this.gameUI.loadArrow()
        this.gameUI.loadPlayerInfoUI()
        this.skillFactory.load()
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.backgroundSprite.loading.position = { x: Framework.Game.canvasWidth / 2, y: Framework.Game.canvasHeight / 2 }
        this.backgroundSprite.loading.scale = { x: 4, y: 4 }
        this.backgroundSprite.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        if (this.stageState === 'start') {
            this.backgroundSprite.game.position = { x: Framework.Game.canvasWidth / 2, y: Framework.Game.canvasHeight / 2 }
            this.backgroundSprite.game.scale = { x: 4, y: 4 }
            this.rootScene.attach(this.backgroundSprite.game)
            this.initializeMatter()
            this.initializeMarbles()    
            this.gameUI.initializePlayerInfoUI()
            if(this.hasNextMap()) {
                this.stageState = 'enterIntoMap'
            } else {
                this.stageState = 'endingDialog'
            }
        }
    }

    update() {
        super.update()
        this.matter.update()
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapUpdate()
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersUpdate()
        } else if(this.stageState === 'playerAction') {
            this.playerActionUpdate()
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionUpdate()
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogUpdate()
        }
    }

    draw(ctx) {
        super.draw(ctx)
        this.rootScene.draw(ctx)
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapDraw(ctx)
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersDraw(ctx)
            this.nowMap.drawItems(ctx)
        } else if(this.stageState === 'playerAction') {
            this.playerActionDraw(ctx)
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionDraw(ctx)
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogDraw(ctx)
        }
    }

    keydown(e) {
        if(e.key === 'P') {
            this.matter.toggleRenderWireframes()
        }
    }

    click(e) {
        super.click(e)
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapClick(e)
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersClick(e)
        } else if(this.stageState === 'playerAction') {
            this.playerActionClick(e)
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionClick(e)
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogClick(e)
        }
    }

    mousedown(e) {
        super.mousedown(e)
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapMousedown(e)
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersMousedown(e)
        } else if(this.stageState === 'playerAction') {
            this.playerActionMousedown(e)
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionMousedown(e)
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogMousedown(e)
        }
    }

    mousemove(e) {
        super.mousemove(e)
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapMousemove(e)
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersMousemove(e)
        } else if(this.stageState === 'playerAction') {
            this.playerActionMousemove(e)
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionMousemove(e)
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogMousemove(e)
        }
    }

    mouseup(e) {
        super.mouseup(e)
        if(this.stageState === 'enterIntoMap') {
            this.enterIntoMapMouseup(e)
        } else if(this.stageState === 'spawnMonsters') {
            this.spawnMonstersMouseup(e)
        } else if(this.stageState === 'playerAction') {
            this.playerActionMouseup(e)
        } else if(this.stageState === 'monstersAction') {
            this.monstersActionMouseup(e)
        } else if(this.stageState === 'endingDialog') {
            this.endingDialogMouseup(e)
        }
    }

    /*StageState*/
    enterIntoMapUpdate() {
        this.updateMarbles()
        delete this.nowMap
        this.nowMap = this.maps.shift()
        //console.log('enterIntoMapUpdate')
        this.stageState = 'spawnMonsters'
        this.spawnMonstersAnimationPlayed = false
        this.randomItem()
    }

    spawnMonstersUpdate() {
        this.updateMarbles()
        //console.log('spawnMonstersUpdate')
        this.nowMap.initializeMonsters()
        this.nowMap.updateMonsters()
        this.nowMap.updateItems()
        this.nowMap.addMarbles(this.marbles)
        if(!this.spawnMonstersAnimationPlayed) {
            this.nowMap.monsters.forEach((monster) => {
                monster.component.opacity = 0
                monster.component.componentMagician.addEffect({opacity: 1 }, 1000, () => {
                    this.stageState = 'playerAction'
                })
            })
            this.spawnMonstersAnimationPlayed = true
        }
    }

    playerActionUpdate() {
        this.updateMarbles()
        this.nowMap.updateItems() //道具更新
        this.nowMap.updateMonsters()
        this.nowMap.updateSkillObjects()
        //console.log('playerActionUpdate')
        if(this.isShooted && !this.marbles[this.nowMarble].isMoving) {
            this.playerActionDone = true
            this.marbles.forEach((marble) => {
                marble.hasUsedComboSkill = false
            })
            let toRemove = []
            this.nowMap.monsters.forEach((monster) => {
                monster.calculateHP()
                if(monster.nowHP === 0) {
                    toRemove.push(monster)
                }
            })
            toRemove.forEach((monster) => this.nowMap.removeMonster(monster))
        }
        if(this.playerActionDone && !this.nowMap.hasRemovingMonster()) {
            if (this.nowMap.isAllMonstersDead()) {
                if (this.hasNextMap()) {
                    this.stageState = 'enterIntoMap'
                    this.nowMap.removeAllItem()
                } else {
                    this.stageState = 'endingDialog'
                }
            } else {
                this.nowMap.allMonsterCountdown()
                this.stageState = 'monstersAction'
            }
            this.nowMarble = (this.nowMarble + 1) % 4
            this.gameUI.playerInfoUIOption.nowMarble = this.nowMarble
            this.isShooted = false
            this.playerActionDone = false
        }
    }

    monstersActionUpdate() {
        this.updateMarbles()
        this.nowMap.updateMonsters()
        this.nowMap.updateItems()
        this.nowMap.updateSkillObjects()
        this.nowMap.monsterAttack()
        //console.log('monstersActionUpdate')
        
        if (this.monstersActionDone) {
            this.nowHp = Math.max(this.nowHp - this.accumulationDamage, 0)
            this.accumulationDamage = 0
            this.monstersActionDone = false
            
            if(this.nowHp === 0) {
                this.marbles.forEach((marble) => {
                    marble.component.lockRotation = false
                    let lr = Math.floor(Math.random() * 2)
                    if(lr === 0) {
                        marble.component.componentMagician.addEffect({rotation: 90}, 300)
                    } else if(lr === 1) {
                        marble.component.componentMagician.addEffect({rotation: -90}, 300)
                    }
                })
                this.stageState = 'endingDialog'
            } else {
                this.stageState = 'playerAction'
            }
            
        }
    }

    endingDialogUpdate() {
        this.updateMarbles()
        if(!this.hasCreatedEndingDialog) {
            if(this.nowHp === 0) {
                GameClasses.HtmlElementView.createDialog('死掉了的對話框', () => {
                    Framework.Game.goToLevel('End')
                    delete this
                })
            } else {
                GameClasses.HtmlElementView.createDialog('結束的對話框', () => {
                    Framework.Game.goToLevel('End')
                    delete this
                })
            }
            this.hasCreatedEndingDialog = true
        }
        //console.log('endingDialogUpdate')
    }

    enterIntoMapDraw(ctx) {
        this.drawMarbles(ctx)
    }

    spawnMonstersDraw(ctx) {
        this.drawMarbles(ctx)
        this.nowMap.drawMonsters(ctx)
        this.nowMap.drawItems(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    playerActionDraw(ctx) {
        this.drawMarbles(ctx)
        this.nowMap.drawMonsters(ctx)
        this.nowMap.drawSkillObjects(ctx)
        this.nowMap.drawItems(ctx)
        this.gameUI.drawArrow(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    monstersActionDraw(ctx) {
        this.drawMarbles(ctx)
        this.nowMap.drawMonsters(ctx)
        this.nowMap.drawSkillObjects(ctx)
        this.nowMap.drawItems(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    endingDialogDraw(ctx) {
        this.drawMarbles(ctx)
        this.nowMap.drawMonsters(ctx)
        this.nowMap.drawItems(ctx)
        this.gameUI.drawArrow(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    enterIntoMapClick(e) {
    }

    spawnMonstersClick(e) {
    }

    playerActionClick(e) {
    }

    monstersActionClick(e) {
    }

    endingDialogClick(e) {
    }

    enterIntoMapMousedown(e) {
    }

    spawnMonstersMousedown(e) {
    }

    playerActionMousedown(e) {
        if(!this.isShooted) {
            this.isAiming = true
            this.shootingUnitVector.x = 0
            this.shootingUnitVector.y = 0
            this.mousedownPosition.x = e.x
            this.mousedownPosition.y = e.y
        }
    }

    monstersActionMousedown(e) {
    }

    endingDialogMousedown(e) {
    }

    enterIntoMapMousemove(e) {
    }

    spawnMonstersMousemove(e) {
    }

    playerActionMousemove(e) {
        if(this.isAiming) {
            this.shootingUnitVector.x = this.mousedownPosition.x - e.x
            this.shootingUnitVector.y = this.mousedownPosition.y - e.y
            let len = Matter.Vector.magnitude(this.shootingUnitVector)
            this.shootingUnitVector.x /= len
            this.shootingUnitVector.y /= len

            if(len < 100) {
                this.gameUI.arrowOption.canDraw = false
                this.shootingUnitVector.x = 0
                this.shootingUnitVector.y = 0
            } else {
                this.gameUI.arrowOption.arrowType = this.marbles[this.nowMarble].sling
                this.gameUI.arrowOption.position.x = this.marbles[this.nowMarble].component.position.x
                this.gameUI.arrowOption.position.y = this.marbles[this.nowMarble].component.position.y
                this.gameUI.arrowOption.angle = (Matter.Vector.angle(this.shootingUnitVector, { x: 0, y: 0 }) / Math.PI * 180) + 180
                this.gameUI.arrowOption.length = len
                this.gameUI.arrowOption.canDraw = true
            }
        }
    }

    monstersActionMousemove(e) {
    }

    endingDialogMousemove(e) {
    }

    enterIntoMapMouseup(e) {
    }

    spawnMonstersMouseup(e) {
    }

    playerActionMouseup(e) {
        if(this.isAiming) {
            if(this.shootingUnitVector.x == 0 && this.shootingUnitVector.y == 0) {
                this.isAiming = false
            } else {
                this.isShooted = true
                this.isAiming = false
                this.gameUI.arrowOption.canDraw = false
                this.marbles[this.nowMarble].shoot(this.shootingUnitVector)
            }
        }
    }

    monstersActionMouseup(e) {
    }

    endingDialogMouseup(e) {
    }

    /*Matter*/
    initializeMatter() {
        this.matter.addEventListener('collisionStart', this.collisionStart)
        this.matter.addEventListener('collisionEnd', this.collisionEnd)
        this.matter.world.gravity = { x: 0, y: 0, scale: 0 }
        let wallThickness = 500
        let wallOptions = { label: 'mapObjectID_-1', isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1 }
        this.matter.addBody(this.matter.createRectangleBody(540, - wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(540, 1497 + wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(- wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(1080 + wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions))
    }

    collisionStart(event) {
        this.nowMap.collisionStart(event)
    }

    collisionEnd(event) {
        this.nowMap.collisionEnd(event)
    }

    /*Map*/
    addMap(map) {
        map.stage = this
        map.matter = this.matter
        this.maps.push(map)
    }

    hasNextMap() {
        return this.maps.length > 0
    }

    loadMaps() {
        this.maps.forEach((map) => {
            map.load()
        })
    }

    /*Marble*/
    loadMarbles() {
        this.marbles.forEach((marble) => {
            marble.load()
            this.gameUI.playerInfoUIOption.marbleIDs.push(marble.marbleID)
        })
    }

    initializeMarbles() {
        this.marbles.forEach((marble) => {
            marble.matter = this.matter
            marble.initialize()
            this.maxHp += marble.maxHp
        })
        this.nowHp = this.maxHp
    }

    updateMarbles() {
        this.marbles.forEach((marble) => {
            marble.update()
        })
    }

    drawMarbles(ctx) {
        this.marbles.forEach((marble) => {
            marble.draw(ctx)
        })
    }

    randomItem(){
        let temp = Math.floor(Math.random() * 3)
        console.log(temp)
        if(temp){
            let position = {
                    x: Framework.Game.canvasWidth / 2, 
                    y: Framework.Game.canvasHeight / 2
            }
            for(let i = 0;i < 5;i++){
                let item = new GameClasses.Item(this.itemSprite, {x: Math.floor(Math.random() * position.x + 1), y: Math.floor(Math.random() * position.y + 1)})
                this.nowMap.addItems(item)
            }

        }
    }
}