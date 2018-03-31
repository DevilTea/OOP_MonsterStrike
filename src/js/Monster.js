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
        this.nowHp = this.hp
    }

    load(){
        super.load()
        this.pic = new Framework.Sprite(imagePath + 'monster/' + this.monsterID + '.png')
        let componentOptions = { label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 0, isStatic:true }
        this.component = new Framework.RectangleComponent(this.matter, this.pic, componentOptions)
    }

    initialize(){
        super.initialize()
        //this.scale = 1
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
}