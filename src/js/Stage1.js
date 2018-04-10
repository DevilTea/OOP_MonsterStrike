class Stage1 extends Framework.Level {
	constructor() {
		super()
		autoBind(this)
		this.matter = new Framework.Matter()
		this.matter.addEventListener('collisionStart', this.collisionStart)
		this.matter.addEventListener('collisionEnd', this.collisionEnd)
		this.physicWorld = this.matter.world
		this.physicWorld.gravity = {x: 0, y: 0, scale: 0}
		this.marbles = []
		this.monsters = []
		this.map = new GameClasses.Map(this)
		this.nowMarble = 0
		this.enableShoot = true
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
	
	loadMarbles() {
		let m1 = new GameClasses.Marble({
			marbleID : 1743,
			attribute : 0,
			rebound : 0,
			hp : 100,
			atk : 100,
			speed : 400,
			race : 0,
			skill : [],
			comboSkill : []
		}, this.map.matter)
		let m2 = new GameClasses.Marble({
			marbleID : 1032,
			attribute : 0,
			rebound : 1,
			hp : 100,
			atk : 200,
			speed : 400,
			race : 0,
			skill : [],
			comboSkill : []
		}, this.map.matter)
		let m3 = new GameClasses.Marble({
			marbleID : 1746,
			attribute : 0,
			rebound : 2,
			hp : 100,
			atk : 300,
			speed : 400,
			race : 0,
			skill : [],
			comboSkill : []
		}, this.map.matter)
		let m4 = new GameClasses.Marble({
			marbleID : 3090,
			attribute : 0,
			rebound : 3,
			hp : 100,
			atk : 400,
			speed : 400,
			race : 0,
			skill : [],
			comboSkill : []
		}, this.map.matter)
		this.marbles.push(m1)
		this.marbles.push(m2)
		this.marbles.push(m3)
		this.marbles.push(m4)
		this.marbles.forEach((value) => this.map.addMapObject(value))
	}

	loadMonsters() {
		let ms1 = new GameClasses.Monster({
			monsterID : 239,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		}, this.map.matter)
		let ms2 = new GameClasses.Monster({
			monsterID : 1,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		}, this.map.matter)
		let ms3 = new GameClasses.Monster({
			monsterID : 1,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		}, this.map.matter)
		let ms4 = new GameClasses.Monster({
			monsterID : 1,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		}, this.map.matter)
		let ms5 = new GameClasses.Monster({
			monsterID : 1,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		}, this.map.matter)
		this.monsters.push(ms1)
		this.monsters.push(ms2)
		this.monsters.push(ms3)
		this.monsters.push(ms4)
		this.monsters.push(ms5)
		this.monsters.forEach((value) => this.map.addMapObject(value))
	}

	load() {
		super.load()
		this.audio = new Framework.AudioManager({
			sound_enterStage: {
                //mp3: define.musicPath + 'kick2.mp3',
                ogg: musicPath + 'sound/enterStage.ogg',
                //wav: define.musicPath + 'kick2.wav'
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
		this.loadMonsters()
		this.map.load()
	}
	
	loadingProgress(ctx, requestInfo) {
		super.loadingProgress(ctx, requestInfo)
		this.loading.draw(ctx)
	}
	
	initialize() {
		super.initialize()
        this.rootScene.attach(this.background)
		this.audio.play({name: 'sound_enterStage', loop: false})
		this.marbles.forEach((value, index) => {
			value.position = {x: (index + 1) * 216, y: 1500}
		})
		this.monsters[0].position = {x: 540, y:750}
		this.monsters[1].position = {x: 190, y:400}
		this.monsters[2].position = {x: 930, y:400}
		this.monsters[3].position = {x: 190, y:1100}
		this.monsters[4].position = {x: 930, y:1100}
		
		this.map.initialize()
	}
	
	update() {
		super.update()
		this.map.update()
		if(!this.enableShoot && !this.marbles[this.nowMarble].isMoving) {
			this.enableShoot = true
			this.marbles[this.nowMarble].component.body.isSensor = true
			this.nowMarble = (this.nowMarble + 1) % 4
		}
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
	
    click(e){
		super.click(e)
    }
	
	mouseup(e) {
		super.mouseup(e)
		this.map.mouseup(e)
		if(this.enableShoot && this.isMousedown) {
			if(this.shootingUnitVector.x == 0 && this.shootingUnitVector.y == 0) {
				this.isMousedown = false
			} else {
				this.enableShoot = false
				this.isMousedown = false
				this.drawArrow = false
				this.marbles[this.nowMarble].component.body.isSensor = false
				this.marbles[this.nowMarble].shoot(this.shootingUnitVector)
			}
		}
    }

    mousedown(e) {
        super.mousedown(e)
		this.map.mousedown(e)
		if(this.enableShoot) {
			this.isMousedown = true
			this.shootingUnitVector.x = 0
			this.shootingUnitVector.y = 0
			this.mousedownCoordinate.x = e.x
			this.mousedownCoordinate.y = e.y
		}
    }

    mousemove(e) {    
		super.mousemove(e)
		this.map.mousemove(e)
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
	
    touchstart(e) {
		super.touchstart(e)
		this.map.touchstart(e)
    }

    touchend(e) {
		super.touchend(e)
		this.map.touchend(e)
    }
    
    touchmove(e) {
		super.touchmove(e)
		this.map.touchmove(e)
	}

	keydown(e) {
		if(e.key === 'P') {
			this.matter.toggleRenderWireframes()
		}
	}
	
	collisionStart(event) {
		this.map.collisionStart(event)
	}

	collisionEnd(event) {
		this.map.collisionEnd(event)
	}
}
