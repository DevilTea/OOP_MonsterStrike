GameClasses.Stage = class Stage extends Framework.Level {
    constructor(marblesOptions, mapsMonstersOptions) {
        super()
        autoBind(this)
        this.matter = new Framework.Matter()
		this.matter.addEventListener('collisionStart', this.collisionStart)
		this.matter.addEventListener('collisionEnd', this.collisionEnd)
        this.matter.world.gravity = {x: 0, y: 0, scale: 0}

        let wallThickness = 500
		let wallOptions = { label: 'mapObjectID_-1', isStatic: true, friction: 0, frictionAir: 0, frictionStatic: 0, restitution: 1}
		this.walls = {
			top: this.matter.createRectangleBody(540, - wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			bottom: this.matter.createRectangleBody(540, 1600 + wallThickness, 1080 + wallThickness * 2, wallThickness * 2, wallOptions),
			left: this.matter.createRectangleBody(- wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions),
			right: this.matter.createRectangleBody(1080 + wallThickness, 810, wallThickness * 2, 1920 + wallThickness * 2, wallOptions)
        }
        this.matter.addBody(this.walls.top)
        this.matter.addBody(this.walls.bottom)
        this.matter.addBody(this.walls.left)
        this.matter.addBody(this.walls.right)

        this.marbles = []
        this.marblesOptions = marblesOptions
        this.maps = []
        this.mapsMonstersOptions = mapsMonstersOptions
        this.nowMap = 0
        this.nowMarble = 0
        this.canShoot = true
        this.isInitialized = false
        //UI
		this.drawArrow = false
		this.isMousedown = false
		this.shootingUnitVector = {x: 0, y: 0}
		this.mousedownCoordinate = {x: 0, y: 0}
    }

    initializeProgressResource() {
		super.initializeProgressResource()
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png')
		this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2}
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

    load() {
        super.load()
        this.audio = new Framework.AudioManager({
			sound_enterStage: {
                ogg: musicPath + 'sound/enterStage.ogg'
            }
        })
        this.background = new Framework.Sprite(imagePath + 'background/test.png')
		this.background.position = { x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2 }
		this.background.scale = {x: 4, y: 4}
		this.arrow_rebound = new Framework.Sprite(imagePath + 'UI/arrow_rebound.png')
		this.arrow_penetrate = new Framework.Sprite(imagePath + 'UI/arrow_penetrate.png')
		this.arrow_rebound_2 = new Framework.Sprite(imagePath + 'UI/arrow_rebound_2.png')
		this.arrow_penetrate_2 = new Framework.Sprite(imagePath + 'UI/arrow_penetrate_2.png')
        this.loadMarbles()
        this.loadMaps()
    }

    loadingProgress(ctx, requestInfo) {
        super.loadingProgress(ctx, requestInfo)
        this.loading.draw(ctx)
    }

    initialize() {
        super.initialize()
        this.rootScene.attach(this.background)
		this.audio.play({name: 'sound_enterStage', loop: false})
        this.maps[this.nowMap].addMarbles(this.marbles)
        this.maps[this.nowMap].initialize()
        this.isInitialized = true
    }

    update() {
        super.update()
        this.matter.update()
        this.maps[this.nowMap].update()
        if(!this.canShoot && !this.marbles[this.nowMarble].isMoving) {
			this.canShoot = true
			this.marbles[this.nowMarble].component.body.isSensor = true
            this.nowMarble = (this.nowMarble + 1) % 4
            if(this.maps[this.nowMap].monsters.length == 0) {
                this.maps[this.nowMap].remove()
                if(this.nowMap < (this.maps.length - 1)) {
                    this.goToNextMap()
                } else {
                    //所有地圖結束後的動作
		            Framework.Game.goToNextLevel();
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
		if(this.drawArrow) {
			this.arrow.draw(parentCtx)
		}
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
                    this.drawArrow = false
                    this.shootingUnitVector.x = 0
                    this.shootingUnitVector.y = 0
                } else {
                    switch (this.marbles[this.nowMarble].rebound) {
                        case 0:
                            this.arrow = this.arrow_rebound
                            break
                        case 1:
                            this.arrow = this.arrow_penetrate
                            break
                        case 2:
                            this.arrow = this.arrow_rebound_2
                            break
                        case 3:
                            this.arrow = this.arrow_penetrate_2
                            break
                        default:
                            this.arrow = this.arrow_rebound
                            break;
                    }
                    if(this.arrow.texture) {
                        this.arrow.position = this.marbles[this.nowMarble].position
                        this.arrow.rotation = (Matter.Vector.angle(this.shootingUnitVector, {x: 0, y: 0}) / Math.PI * 180) + 180
                        this.arrow.scale = {x: len / this.arrow.texture.width, y: 1}
                    }
                    this.drawArrow = true
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
                    this.drawArrow = false
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