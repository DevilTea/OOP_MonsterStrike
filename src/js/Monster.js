GameClasses.Monster = class Monster extends MapObject {
    constructor(monsterConfig, matter) {
        super(matter)
		autoBind(this)
        this.monsterID = monsterConfig.monsterID
        this.attribute = monsterConfig.attribute
        this.race = monsterConfig.race
        this.hp = monsterConfig.hp
        this.atk = monsterConfig.atk
        this.skill = monsterConfig.skill
        this.isDead = false
        this.nowhp = this.hp
    }

    load(){
        super.load()
        this.pic = new Framework.Sprite(imagePath + 'monster/' + this.monsterID + '.png')
        let componentOptions = { label: 'monster', friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 0, isSensor: false, isStatic:true }
        this.component = new Framework.CircleComponent(this.matter, this.pic, componentOptions)
    }

    initialize(){
        super.initialize()
        this.component.lockRotation = true
        this.scale = 1.5
        this.component.setBody('mass', 0.2)
        this.map.level.rootScene.attach(this.pic)
    }

    update(){
        super.update()
        this.component.update()

    }

    draw(ctx){
    }

    mousedown(e){
        super.mousedown(e)
    }

    mouseup(e){
        super.mouseup(e)
    }

    mousemove(e){
        super.mousemove(e)
    }

    touchstart(e){
        super.touchstart(e)
        this.mousedown(e[0])
    }

    touchend(e){
		super.touchend(e)
        this.mousemove(e[0])
    }

	collisionStart(event) {
        //碰撞事件收集(?
		//event.pairs.forEach((value) => {console.log(value)})
		super.collisionStart(event)
	}

	collisionEnd(event) {
		super.collisionEnd(event)
    }
    
}