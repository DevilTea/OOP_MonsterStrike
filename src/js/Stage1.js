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
		this.monster = []
		this.map = new GameClasses.Map(this)
		this.nowMarble = 0
		this.enableShoot = true
		this.isMousedown = false
		this.shootingUnitVector = {x: 0, y: 0}
		this.mousedownCoordinate = {x: 0, y: 0}
	}
	
	initializeProgressResource() {
		super.initializeProgressResource()
		this.loading = new Framework.Sprite(imagePath + 'background/loading.png', this)
		this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2}
        this.loading.scale = 4
	}
	//初始化彈珠
	initMarbles() {
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
			rebound : 0,
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
			rebound : 0,
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
			rebound : 0,
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
	//初始化怪物
	initMonster(){
		let ms1 = new GameClasses.Monster({
			monsterID : 239,
			attribute : 0,
			hp : 500,
			atk : 0,
			skill : []
		},this.map.matter)
		this.monster.push(ms1)
		this.monster.forEach((value) => this.map.addMapObject(value))
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
		this.background = new Framework.Sprite(imagePath + 'background/test.png', this)
		this.background.position = { x: Framework.Game.getCanvasWidth() / 2, y: Framework.Game.getCanvasHeight() / 2 }
		this.background.scale = 4
		this.initMarbles()
		this.initMonster()
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
		this.monster.forEach((value, index) => {
			value.position = {x: 522, y: 750}
		})
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
			let len = Math.sqrt(Math.pow(this.shootingUnitVector.x, 2) + Math.pow(this.shootingUnitVector.y, 2))
			this.shootingUnitVector.x /= len
			this.shootingUnitVector.y /= len
			if(len < 70) {
				this.shootingUnitVector.x = 0
				this.shootingUnitVector.y = 0
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
	
	collisionStart(event) {
		this.map.collisionStart(event)
		let info
		event.pairs.forEach((value) => {info = value})
		if (this.monster.length){
			if (info.bodyB.label == 'monster' &&　!this.monster[0].isDead){
				let hp = this.monster[0].nowhp -= this.marbles[this.nowMarble].atk
				console.log(hp)
				if (hp <= 0 && !this.monster[0].isDead){
					//this.monster[0].isDead = true
					//this.monster[0].component.setBody('isSensor',true)
					this.map.removeMapObject(this.monster[0])
				}
			}
		}

	
		
	}

	collisionEnd(event) {
		this.map.collisionEnd(event)
	}
}
