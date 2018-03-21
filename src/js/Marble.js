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
		this.nowSpeed = 0
		
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
		this.position.y -= this.nowSpeed
		this.nowSpeed = Math.max((this.nowSpeed + this.map.deceleration), 0)
		this.marblePicture.position = this.position
	}
	
	draw(ctx) {
		this.marblePicture.draw(ctx)
	}
	
	mouseup(e) {
        super.mouseup(e)
		this.nowSpeed = this.speed
    }

    mousedown(e) {
        super.mousedown(e)
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


}