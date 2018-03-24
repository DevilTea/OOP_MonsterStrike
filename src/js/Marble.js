class Marble extends MapObject {
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
		this.nowUnitVector = { x : 0, y : 0 }
		this.mousedownCoordinate = new Framework.Point()
		this.isMoving = false
		this.isMousedown = false
		this.firstUpdate = false
	}
	
	load() {
		super.load()
		this.pic = new Framework.Sprite(imagePath + 'marble/Ball' + this.marbleID + '.png')
	}
	
	initialize() {
		super.initialize()
		let componentOptions = { friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1}
		this.component = new Framework.CircleComponent(this.matter, this.pic, componentOptions)
		this.component.lockRotation = true
		this.position = new Framework.Point(540, 1500)
		this.scale = 2
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
		if(!this.isMoving) {
			console.log("waa")
			this.isMousedown = true
			this.nowUnitVector.x = 0
			this.nowUnitVector.y = 0
			this.mousedownCoordinate.x = e.x
			this.mousedownCoordinate.y = e.y
		}
    }
	
	mouseup(e) {
        super.mouseup(e)
		if(!this.isMoving && this.isMousedown) {
			console.log("waaa")
			this.isMousedown = false
			this.shoot()
		}
    }

    mousemove(e) {
		super.mousemove(e)
		if(this.isMousedown) {
			console.log("waaaa")
			this.nowUnitVector.x = this.mousedownCoordinate.x - e.x
			this.nowUnitVector.y = this.mousedownCoordinate.y - e.y
			let len = Math.sqrt(Math.pow(this.nowUnitVector.x, 2) + Math.pow(this.nowUnitVector.y, 2))
			this.nowUnitVector.x /= len
			this.nowUnitVector.y /= len
			if(len < 70) {
				this.nowUnitVector.x = 0
				this.nowUnitVector.y = 0
			}
		}
    }
	
    touchstart(e) {
        super.touchstart(e)
		if(!this.isMoving) {
			console.log("waa")
			this.isMousedown = true
			this.nowUnitVector.x = 0
			this.nowUnitVector.y = 0
			this.mousedownCoordinate.x = e.x
			this.mousedownCoordinate.y = e.y
		}
    }
	
	touchend(e) {
        super.touchend(e)
		if(!this.isMoving && this.isMousedown) {
			console.log("waaa")
			this.isMousedown = false
			this.shoot()
		}
    }

    touchmove(e) {
		super.touchmove(e)
		if(this.isMousedown) {
			console.log("waaaa")
			this.nowUnitVector.x = this.mousedownCoordinate.x - e.x
			this.nowUnitVector.y = this.mousedownCoordinate.y - e.y
			let len = Math.sqrt(Math.pow(this.nowUnitVector.x, 2) + Math.pow(this.nowUnitVector.y, 2))
			this.nowUnitVector.x /= len
			this.nowUnitVector.y /= len
			if(len < 70) {
				this.nowUnitVector.x = 0
				this.nowUnitVector.y = 0
			}
		}
    }
	
	shoot() {
		this.isMoving = true
		let velocity = {x: this.speed * this.nowUnitVector.x, y: this.speed * this.nowUnitVector.y}
		this.component.setBody('velocity', velocity)
	}
}