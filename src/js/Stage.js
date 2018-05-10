GameClasses.Stage = class Stage extends Framework.Level {
    constructor(stageName, marbles) {
        super()
        autoBind(this)
        this.stageName = stageName
        this.marbles = marbles
        this.nowMarble = 0
        this.maps = []
        this.nowMap = -1
        this.matter = new Framework.Matter()
        this.gameUI = new GameClasses.GameUI()
        this.stageState = 'start'
        this.spawnMonstersAnimationPlayed = false
        this.playerActionDone = false
        this.isShooted = false
        this.isAiming = false
        this.shootingUnitVector = {}
        this.mousedownPosition = {}
        this.monstersActionDone = false
        this.hasCreatedEndingDialog = false
        /*background sprite*/
        this.backgroundSprite = { loading: undefined, }
        this.test
        this.temptest
        this.num = 1
    }

    /*FrameworkGameState*/
    initializeProgressResource() {
        super.initializeProgressResource()
        this.backgroundSprite.loading = new Framework.Sprite(imagePath + 'background/loading.png')
    }

    load() {
        super.load()
        this.backgroundSprite.game = new Framework.Sprite(imagePath + 'background/test.png')
        this.loadMarbles()
        this.loadMaps()
        this.gameUI.loadArrow()
        this.gameUI.loadPlayerInfoUI()
        //-------------------------------------------------------------------------------------------- 
        this.test = new Framework.Sprite(imagePath + 'effect/8064F854.png', )
        //this.test.position = new Framework.Point(Framework.Game.getCanvasWidth() / 2, Framework.Game.getCanvasHeight() / 2)
        //-------------------------------------------------------------------------------------------- 
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.backgroundSprite.loading.position = { x: Framework.Game.canvasWidth / 2, y: Framework.Game.canvasHeight / 2 }
        this.backgroundSprite.loading.scale = { x: 4, y: 4 }
        this.backgroundSprite.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        //-------------------------------------------------------------------------------------------- 
        this.temptest = this.test.getSection({ x: 620, y: 730 }, { x: 680, y: 940 })
        //-------------------------------------------------------------------------------------------- 
        if (this.stageState === 'start') {
            this.backgroundSprite.game.position = { x: Framework.Game.canvasWidth / 2, y: Framework.Game.canvasHeight / 2 }
            this.backgroundSprite.game.scale = { x: 4, y: 4 }
            this.rootScene.attach(this.backgroundSprite.game)
            //-------------------------------------------------------------------------------------------- 
            //this.test.scale = { x: 1.5, y: 1.5 }
            //this.temptest.scale = { x: 1.5, y: -1.5 }

            this.rootScene.attach(this.temptest)
            //-------------------------------------------------------------------------------------------- 
            this.initializeMatter()
            this.initializeMarbles()
            this.gameUI.initializePlayerInfoUI()
            if (this.hasNextMap()) {
                this.stageState = 'enterIntoMap'
            } else {
                this.stageState = 'endingDialog'
            }
        }
    }

    update() {
        super.update()
        this.matter.update()
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapUpdate()
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersUpdate()
        } else if (this.stageState === 'playerAction') {
            this.playerActionUpdate()
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionUpdate()
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogUpdate()
        }

        this.sectionAmimate()


    }
    sectionAmimate() {
        // setInterval(() => {
        //     if (this.num > 5) return
        //         console.log(this.num)
        //         this.num += 0.1
        //         this.temptest.scale = { x: 1.5, y: this.num }
            
        // }, 1000)
        // this.temptest.animate({ begin_scale: 1, scale: 6 }, 2000, () => {
        //     this.stageState = 'playerAction'
        //     this.spawnMonstersAnimationPlayed = false
        // })
        
    }

    draw(ctx) {
        super.draw(ctx)
        this.rootScene.draw(ctx)
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapDraw(ctx)
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersDraw(ctx)
        } else if (this.stageState === 'playerAction') {
            this.playerActionDraw(ctx)
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionDraw(ctx)
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogDraw(ctx)
        }
    }

    click(e) {
        super.click(e)
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapClick(e)
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersClick(e)
        } else if (this.stageState === 'playerAction') {
            this.playerActionClick(e)
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionClick(e)
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogClick(e)
        }
    }

    mousedown(e) {
        super.mousedown(e)
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapMousedown(e)
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersMousedown(e)
        } else if (this.stageState === 'playerAction') {
            this.playerActionMousedown(e)
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionMousedown(e)
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogMousedown(e)
        }
    }

    mousemove(e) {
        super.mousemove(e)
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapMousemove(e)
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersMousemove(e)
        } else if (this.stageState === 'playerAction') {
            this.playerActionMousemove(e)
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionMousemove(e)
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogMousemove(e)
        }
    }

    mouseup(e) {
        super.mouseup(e)
        if (this.stageState === 'enterIntoMap') {
            this.enterIntoMapMouseup(e)
        } else if (this.stageState === 'spawnMonsters') {
            this.spawnMonstersMouseup(e)
        } else if (this.stageState === 'playerAction') {
            this.playerActionMouseup(e)
        } else if (this.stageState === 'monstersAction') {
            this.monstersActionMouseup(e)
        } else if (this.stageState === 'endingDialog') {
            this.endingDialogMouseup(e)
        }
    }

    /*StageState*/
    enterIntoMapUpdate() {
        this.updateMarbles()
        this.nowMap++
        console.log('enterIntoMapUpdate')
        this.stageState = 'spawnMonsters'
    }

    spawnMonstersUpdate() {
        this.updateMarbles()
        //console.log('spawnMonstersUpdate')
        this.maps[this.nowMap].initializeMonsters()
        this.maps[this.nowMap].updateMonsters()
        this.maps[this.nowMap].addMarbles(this.marbles)
        if (!this.spawnMonstersAnimationPlayed) {
            this.maps[this.nowMap].monsters.forEach((monster) => {
                monster.monsterSprite.animate({ begin_opacity: 0, opacity: 1 }, 2000, () => {
                    this.stageState = 'playerAction'
                    this.spawnMonstersAnimationPlayed = false
                })
            })
            this.spawnMonstersAnimationPlayed = true
        }
    }

    playerActionUpdate() {
        this.updateMarbles()
        this.maps[this.nowMap].updateMonsters()
        //console.log('playerActionUpdate')
        if (this.isShooted && !this.marbles[this.nowMarble].isMoving) {
            this.playerActionDone = true
            let toRemove = []
            this.maps[this.nowMap].monsters.forEach((monster) => {
                monster.calculateHP()
                if (monster.nowHP === 0) {
                    toRemove.push(monster)
                }
            })
            toRemove.forEach((monster) => this.maps[this.nowMap].removeMonster(monster))
        }
        if (this.playerActionDone) {
            if (this.maps[this.nowMap].isAllMonstersDead()) {
                if (this.hasNextMap()) {
                    this.stageState = 'enterIntoMap'
                } else {
                    this.stageState = 'endingDialog'
                }
            } else {
                this.nowMarble = (this.nowMarble + 1) % 4
                this.gameUI.playerInfoUIOption.nowMarble = this.nowMarble
                this.playerActionDone = false
                this.isShooted = false
                this.stageState = 'monstersAction'
            }
        }
    }

    monstersActionUpdate() {
        this.updateMarbles()
        this.maps[this.nowMap].updateMonsters()
        console.log('monstersActionUpdate')
        this.monstersActionDone = true
        if (this.monstersActionDone) {
            this.monstersActionDone = false
            this.stageState = 'playerAction'
        }
    }

    endingDialogUpdate() {
        if (!this.hasCreatedEndingDialog) {
            this.createDialog('結束的對話框')
            this.hasCreatedEndingDialog = true
        }
        console.log('endingDialogUpdate')
    }

    enterIntoMapDraw(ctx) {
        this.drawMarbles(ctx)
    }

    spawnMonstersDraw(ctx) {
        this.drawMarbles(ctx)
        this.maps[this.nowMap].drawMonsters(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    playerActionDraw(ctx) {
        this.drawMarbles(ctx)
        this.maps[this.nowMap].drawMonsters(ctx)
        this.gameUI.drawArrow(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    monstersActionDraw(ctx) {
        this.drawMarbles(ctx)
        this.maps[this.nowMap].drawMonsters(ctx)
        this.gameUI.drawPlayerInfoUI(ctx)
    }

    endingDialogDraw(ctx) {
        this.drawMarbles(ctx)
        this.maps[this.nowMap].drawMonsters(ctx)
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
        if (!this.isShooted) {
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
        if (this.isAiming) {
            this.shootingUnitVector.x = this.mousedownPosition.x - e.x
            this.shootingUnitVector.y = this.mousedownPosition.y - e.y
            let len = Matter.Vector.magnitude(this.shootingUnitVector)
            this.shootingUnitVector.x /= len
            this.shootingUnitVector.y /= len

            if (len < 100) {
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
        if (this.isAiming) {
            if (this.shootingUnitVector.x == 0 && this.shootingUnitVector.y == 0) {
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
        this.maps[this.nowMap].collisionStart(event)
    }

    collisionEnd(event) {
        this.maps[this.nowMap].collisionEnd(event)
    }

    /*Map*/
    addMap(map) {
        map.stage = this
        map.matter = this.matter
        this.maps.push(map)
    }

    hasNextMap() {
        return this.nowMap < (this.maps.length - 1)
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
        })
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

    createDialog(msg) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(140, 660, 800, 600, document.createElement('div'), fullContainer, true)
        let dialogText = Framework.HtmlElementUI.createElement(20, 20, 760, 480, document.createElement('div'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(300, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = { x: 0, y: 0 }
        let canDrag = false
        fullContainer.style = { userSelect: 'none' }
        dialogBackground.style = { backgroundColor: '#333333', borderRadius: '5px' }
        dialogText.style = { padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '3em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px' }
        dialogText.ele.innerText = msg
        enterButton.style = { border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333' }
        enterButton.ele.innerText = '確認'

        fullContainer.clickEvent = (e) => e.stopPropagation()
        fullContainer.mousedownEvent = (e) => e.stopPropagation()
        fullContainer.mouseupEvent = (e) => e.stopPropagation()
        fullContainer.mousemoveEvent = (e) => e.stopPropagation()

        dialogBackground.mousedownEvent = (e) => {
            e.preventDefault()
            e = Framework.MouseManager.countCanvasOffset(e)
            mouseOffset.x = dialogBackground.originX - e.x
            mouseOffset.y = dialogBackground.originY - e.y
            canDrag = true
        }

        fullContainer.mouseupEvent = (e) => {
            canDrag = false
        }

        fullContainer.mousemoveEvent = (e) => {
            if (e.buttons === 1 && canDrag) {
                e.preventDefault()
                e = Framework.MouseManager.countCanvasOffset(e)
                dialogBackground.position = { x: mouseOffset.x + e.x, y: mouseOffset.y + e.y }
            }
        }

        enterButton.clickEvent = (e) => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }
}