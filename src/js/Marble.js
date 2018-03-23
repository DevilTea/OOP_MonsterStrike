class Marble extends MapObject {
	constructor(marbleConfig, box2D) {
		super(box2D)
		autoBind(this)
		this.marblePicture
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
		this.isMousedown = false
		this.isMoving = false
		this.stopPos
	}
	
	load() {
		super.load()
		this.marblePicture = new Framework.Sprite(imagePath + 'marble/Ball' + this.marbleID + '.png')
		this.component =  new Framework.circleComponent(this.marblePicture, this.box2D.bodyType_Dynamic, this.box2D)
		this.component.fixtureDef.m_restitution = 0
		this.component.Body.m_userData = "marble"
	}
	
	initialize() {
		super.initialize()
		this.position = new Framework.Point(540, 1500)
		this.stopPos = {x : this.position.x, y : this.position.y}
		this.scale = 2
		this.map.level.rootScene.attach(this.marblePicture)
	}
	
	update() {
		super.update()
		//this.slowdown()
	}
	
	draw(ctx) {
	}

    mousedown(e) {
        super.mousedown(e)
		if(!this.isMoving) {
			this.isMousedown = true
			this.nowUnitVector.x = 0
			this.nowUnitVector.y = 0
			this.mousedownCoordinate.x = e.x
			this.mousedownCoordinate.y = e.y
		}
    }
	
	mouseup(e) {
        super.mouseup(e)
		if(!this.isMoving) {
			this.isMousedown = false
			this.shoot()
		}
    }

    mousemove(e) {
		super.mousemove(e)
		if(this.isMousedown) {
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
	
	shoot() {
		this.nowSpeed = this.speed
		this.isMoving = true
		let forceX = this.speed * this.nowUnitVector.x
		let forceY = this.speed * this.nowUnitVector.y
		this.component.Body.ApplyForce(new this.box2D.b2Vec2(forceX, forceY), this.component.Body.GetWorldCenter())
	}
	
	slowdown() {
		if(this.nowSpeed > 0) {
			let slowdownUnitVector = { x : this.component.Body.m_sweep.c.x - this.component.Body.m_sweep.c0.x, y : this.component.Body.m_sweep.c.y - this.component.Body.m_sweep.c0.y }
			let len = Math.sqrt(Math.pow(slowdownUnitVector.x, 2) + Math.pow(slowdownUnitVector.y, 2)) || 1
			slowdownUnitVector.x /= len
			slowdownUnitVector.y /= len
			let slowdownX = slowdownUnitVector.x * this.map.deceleration
			let slowdownY = slowdownUnitVector.y * this.map.deceleration
			this.component.Body.ApplyForce(new this.box2D.b2Vec2(slowdownX, slowdownY), this.component.Body.GetWorldCenter())
			this.nowSpeed -= Math.sqrt(Math.pow(slowdownX, 2) + Math.pow(slowdownY, 2))
			if(this.nowSpeed <= 0) {
				let slowdownUnitVector = { x : this.component.Body.m_sweep.c.x - this.component.Body.m_sweep.c0.x, y : this.component.Body.m_sweep.c.y - this.component.Body.m_sweep.c0.y }
				let len = Math.sqrt(Math.pow(slowdownUnitVector.x, 2) + Math.pow(slowdownUnitVector.y, 2))
				slowdownUnitVector.x /= len
				slowdownUnitVector.y /= len
				let slowdownX = slowdownUnitVector.x * (-this.nowSpeed)//this.map.deceleration
				let slowdownY = slowdownUnitVector.y * (-this.nowSpeed)//this.map.deceleration
				this.component.Body.ApplyForce(new this.box2D.b2Vec2(slowdownX, slowdownY), this.component.Body.GetWorldCenter())
				this.nowSpeed += Math.sqrt(Math.pow(slowdownX, 2) + Math.pow(slowdownY, 2))
				this.isMoving = false
				this.stopPos = { x : this.position.x, y : this.position.y }
			}
		}
		if(!this.isMoving) {
			this.position.x = this.stopPos.x
			this.position.y = this.stopPos.y
		}
	}
}

/*class Marble extends MapObject {
	constructor(marbleConfig) {
		super()	
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
		
		this.box2D
		this.entity
		this.nowHp = this.hp
		this.nowSpeed = { x : 0, y : 0 }
		this.nowUnitVector = { x : 0, y : 0 }
		this.mousedownCoordinate = new Framework.Point()
		this.isMousedown = false
		
	}
	
	load() {
		super.load()
		this.marblePicture = new Framework.Sprite(imagePath + 'marble/Ball' + this.marbleID + '.png')
		this.marblePicture.scale = 2
		this.map.level.rootScene.attach(this.marblePicture)
		this.box2D = this.map.box2D
		this.entity = this.box2D.createCircleBody(this.marblePicture.width / 2, this.box2D.bodyType_Dynamic)
		this.entity.SetPosition(new this.box2D.b2Vec2(this.position.x, this.position.y))
	}
	
	initialize() {
		super.initialize()
	}
	
	update() {
		super.update()
		this.position.x = this.entity.GetPosition().x
		this.position.y = this.entity.GetPosition().y
		this.marblePicture.position = this.position
	}
	
	draw(ctx) {
		this.marblePicture.draw(ctx)
	}

    mousedown(e) {
        super.mousedown(e)
		this.isMousedown = true
		this.nowUnitVector.x = 0
		this.nowUnitVector.y = 0
		this.mousedownCoordinate.x = e.x
		this.mousedownCoordinate.y = e.y
    }
	
	mouseup(e) {
        super.mouseup(e)
		this.isMousedown = false
		let forceX = this.speed * this.nowUnitVector.x
		let forceY = this.speed * this.nowUnitVector.y
		console.log(forceX + "/" + forceY)
		this.entity.ApplyForce(new this.box2D.b2Vec2(forceX, forceY), this.entity.GetWorldCenter())
    }

    mousemove(e) {
		super.mousemove(e)
		if(this.isMousedown) {
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
}*/