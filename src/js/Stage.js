GameClasses.Stage = class Stage extends Framework.Level {
    constructor(stageName, marblesOptions, mapsMonstersOptions) {
        super()
        autoBind(this)
        this.stageName = stageName
        this.marblesOptions = marblesOptions
        this.mapsMonstersOptions = mapsMonstersOptions
    }

    initializeProgressResource() {
		super.initializeProgressResource()
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = {x: Framework.Game.canvasWidth / 2 , y: Framework.Game.canvasHeight / 2}
        this.loading.scale = {x: 4, y: 4}
    }
    
    loadMaps() {
        this.mapsMonstersOptions.forEach((mapMonstersOpptions) => {
            let newMap = new GameClasses.Map(this)
            mapMonstersOpptions.forEach((monsterOptions) => {
                let newMonster = new GameClasses.Monster(monsterOptions, this.matter)
                newMonster.load()
                newMap.addMonster(newMonster)
            })
            newMap.load()
            this.maps.push(newMap)
        })
    }

    loadMarbles() {
        this.marblesOptions.forEach((marbleOptions) => {
            let newMarble = new GameClasses.Marble(marbleOptions, this.matter)
            newMarble.load()
            this.marbles.push(newMarble)
        })
    }

    loadUI() {
        this.gameUI.loadArrow()
        this.marblesOptions.forEach((option) => this.gameUI.playerInfoUIOption.marbleIDs.push(option.marbleID))
        this.gameUI.loadPlayerInfoUI()
    }

    load() {
        super.load()
        this.matter = new Framework.Matter()
		this.matter.addEventListener('collisionStart', this.collisionStart)
		this.matter.addEventListener('collisionEnd', this.collisionEnd)
        this.matter.world.gravity = {x: 0, y: 0, scale: 0}

        let wallThickness = 500
		let wallOptions = { label: 'mapObjectID_-1', isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1}
        this.matter.addBody(this.matter.createRectangleBody(540, - wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(540, 1497 + wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(- wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions))
        this.matter.addBody(this.matter.createRectangleBody(1080 + wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions))

        this.marbles = []
        this.maps = []
        this.nowMap = 0
        this.nowMarble = 0
        this.canShoot = true
        this.isInitialized = false
		this.isMousedown = false
		this.shootingUnitVector = {x: 0, y: 0}
        this.mousedownCoordinate = {x: 0, y: 0}
        //UI
        this.gameUI = new GameClasses.GameUI()
        /*---------------------------------------*/
        this.audio = new Framework.AudioManager({
			sound_enterStage: {
                ogg: musicPath + 'sound/enterStage.ogg'
            },
			NTUT: {
                mp3: musicPath + 'bgm/NTUT_classic.mp3'
            },
            bang: {
                mp3: musicPath + 'bgm/朋友BANG不見.mp3'
            },
            victoryEnd: {
                ogg: musicPath + 'sound/victoryEnd.ogg'
            }
        })
        this.background = new Framework.Sprite(imagePath + 'background/test.png')
		this.background.position = { x: Framework.Game.canvasWidth / 2, y: Framework.Game.canvasHeight / 2 }
		this.background.scale = {x: 4, y: 4}
        this.loadMarbles()
        this.loadMaps()
        this.loadUI()
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.rootScene.attach(this.background)
        this.audio.play({name: 'sound_enterStage', loop: false})
        this.audio.play({name: 'bang', loop: false})
        this.maps[this.nowMap].addMarbles(this.marbles)
        this.maps[this.nowMap].initialize()
        this.isInitialized = true

        this.gameUI.initializeArrow()
        this.gameUI.initializePlayerInfoUI()
    }

    turnNextMarble() {
        this.marbles[this.nowMarble].component.body.isSensor = true
        this.nowMarble = (this.nowMarble + 1) % 4
        this.gameUI.playerInfoUIOption.nowMarble = this.nowMarble
    }

    damageMonsters() {
        let toRemove = []
        this.maps[this.nowMap].monsters.forEach((monster) => {
            monster.nowHp = Math.max(monster.nowHp - monster.accumulationDamage, 0)
            monster.accumulationDamage = 0
            if(monster.nowHp === 0) {
                toRemove.push(monster)
            }
        })
        toRemove.forEach((monster) => this.maps[this.nowMap].removeMonster(monster))
    }

    update() {
        super.update()
        this.matter.update()
        this.maps[this.nowMap].update()
        if(!this.canShoot && !this.marbles[this.nowMarble].isMoving) {
			this.canShoot = true
            this.turnNextMarble()
            this.damageMonsters()
            if(this.maps[this.nowMap].monsters.length == 0) {
                this.maps[this.nowMap].remove()
                if(this.nowMap < (this.maps.length - 1)) {
                    this.goToNextMap()
                } else {
                    //所有地圖結束後的動作
                    this.audio.play({name: 'victoryEnd', loop: false})
                    //this.audio.stop('NTUT')
                    Framework.Game.goToLevel('End')
                }
            }
		}
    }

    goToNextMap() {
        this.nowMap++
        this.isInitialized = false
		this.audio.play({name: 'sound_enterStage', loop: false})
        this.maps[this.nowMap].addMarbles(this.marbles)
        this.maps[this.nowMap].initialize()
        this.isInitialized = true
    }

    draw(parentCtx) {
        super.draw(parentCtx)
        this.rootScene.draw(parentCtx);
        this.maps[this.nowMap].draw(parentCtx)
		this.gameUI.drawArrow(parentCtx)
		this.gameUI.drawPlayerInfoUI(parentCtx)
    }

    teardown() {
        super.teardown()
    }

    click(e) {
        super.click(e)
    }

    mousedown(e) {
        super.mousedown(e)
        if(this.isInitialized) {
            this.maps[this.nowMap].mousedown(e)
            if(this.canShoot) {
                this.isMousedown = true
                this.shootingUnitVector.x = 0
                this.shootingUnitVector.y = 0
                this.mousedownCoordinate.x = e.x
                this.mousedownCoordinate.y = e.y
            }
        }
    }

    mousemove(e) {    
        super.mousemove(e)
        if(this.isInitialized) {
            this.maps[this.nowMap].mousemove(e)
            if(this.isMousedown) {
                this.shootingUnitVector.x = this.mousedownCoordinate.x - e.x
                this.shootingUnitVector.y = this.mousedownCoordinate.y - e.y
                let len = Matter.Vector.magnitude(this.shootingUnitVector)
                this.shootingUnitVector.x /= len
                this.shootingUnitVector.y /= len
                
                if(len < 100) {
                    this.gameUI.arrowOption.canDraw = false
                    this.shootingUnitVector.x = 0
                    this.shootingUnitVector.y = 0
                } else {
                    this.gameUI.arrowOption.arrowType = this.marbles[this.nowMarble].rebound
                    this.gameUI.arrowOption.position = this.marbles[this.nowMarble].position
                    this.gameUI.arrowOption.angle = (Matter.Vector.angle(this.shootingUnitVector, {x: 0, y: 0}) / Math.PI * 180) + 180
                    this.gameUI.arrowOption.length = len
                    this.gameUI.arrowOption.canDraw = true
                }
            }
		}
	}

    mouseup(e) {
        super.mouseup(e)
        if(this.isInitialized) {
            this.maps[this.nowMap].mouseup(e)
            if(this.canShoot && this.isMousedown) {
                if(this.shootingUnitVector.x == 0 && this.shootingUnitVector.y == 0) {
                    this.isMousedown = false
                } else {
                    this.canShoot = false
                    this.isMousedown = false
                    this.gameUI.arrowOption.canDraw = false
                    this.marbles[this.nowMarble].component.body.isSensor = false
                    this.marbles[this.nowMarble].shoot(this.shootingUnitVector)
                }
            }
        }
    }

	keydown(e) {
		if(e.key === 'P') {
			this.matter.toggleRenderWireframes()
		}
	}
	
	collisionStart(event) {
		this.maps[this.nowMap].collisionStart(event)
	}

	collisionEnd(event) {
		this.maps[this.nowMap].collisionEnd(event)
	}
}