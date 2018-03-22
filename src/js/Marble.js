class Marble extends MapObject {
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
	}
	
	initialize() {
		super.initialize()
	}
	
	update() {
		super.update()
		this.position.x += this.nowSpeed.x
		this.position.y += this.nowSpeed.y
		this.nowSpeed.x = this.nowSpeed.x + this.map.deceleration * this.nowUnitVector.x
		this.nowSpeed.x = this.nowUnitVector.x < 0 ? Math.min(this.nowSpeed.x, 0) : Math.max(this.nowSpeed.x, 0)
		this.nowSpeed.y = this.nowSpeed.y + this.map.deceleration * this.nowUnitVector.y
		this.nowSpeed.y = this.nowUnitVector.y < 0 ? Math.min(this.nowSpeed.y, 0) : Math.max(this.nowSpeed.y, 0)
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
		this.nowSpeed.x = this.speed * this.nowUnitVector.x
		this.nowSpeed.y = this.speed * this.nowUnitVector.y
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
}