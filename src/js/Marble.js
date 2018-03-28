GameClasses.Marble = class Marble extends MapObject {
	constructor(marbleConfig, matter) {
		super(matter)
		autoBind(this)
		this.marbleID = marbleConfig.marbleID		//彈珠ID
		this.attribute = marbleConfig.attribute		//屬性
		this.rebound = marbleConfig.rebound			//反射/貫通
		this.hp = marbleConfig.hp					//HP
		this.atk = marbleConfig.atk					//攻擊力
		this.speed = marbleConfig.speed					//速度
		this.race = marbleConfig.race				//種族
		this.skill = marbleConfig.skill				//技能
		this.comboSkill = marbleConfig.comboSkill1	//友情技能
		
		this.nowHp = this.hp
		this.nowSpeed = 0
		this.isMoving = false
	}
	
	load() {
		super.load()
		this.pic = new Framework.Sprite(imagePath + 'marble/Ball' + this.marbleID + '.png')
		let componentOptions = { label: 'marble', friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isSensor: true}
		this.component = new Framework.CircleComponent(this.matter, this.pic, componentOptions)
	}
	
	initialize() {
		super.initialize()
		this.component.lockRotation = true
		this.scale = 1.5
		this.component.setBody('mass', 0.1)
		this.map.level.rootScene.attach(this.pic)
	}
	
	update() {
		super.update()
		this.component.update()
		if(this.component.body.speed < 1) {
			this.component.setBody('velocity', {x: 0, y: 0})
			this.isMoving = false
		}
	}
	
	draw(ctx) {
	}

    mousedown(e) {
        super.mousedown(e)
    }
	
	mouseup(e) {
        super.mouseup(e)
    }

    mousemove(e) {
		super.mousemove(e)
    }
	
    touchstart(e) {
		super.touchstart(e)
        this.mousedown(e[0])
    }

    touchend(e) {
		super.touchend(e)
        this.mouseup(e[0])
    }
    
    touchmove(e) {
		super.touchend(e)
        this.mousemove(e[0])
    }
	
	shoot(shootingUnitVector) {
		this.isMoving = true
		let velocity = {x: this.speed * shootingUnitVector.x, y: this.speed * shootingUnitVector.y}
		this.component.setBody('velocity', velocity)
	}

	collisionStart(event) {
		super.collisionStart(event)
	}

	collisionEnd(event) {
		super.collisionEnd(event)
	}
}