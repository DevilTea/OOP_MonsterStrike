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
        this.initPosition = monsterConfig.initPosition

        this.nowHp = this.hp
        this.accumulationDamage = 0
    }

    load(){
        super.load()
        let sprite = new Framework.Sprite(imagePath + 'monster/' + this.monsterID + '.png')
        let componentOptions = {friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 0, isStatic:true}
        this.component = new Framework.RectangleComponent(this.matter, sprite, componentOptions)
		this.position = this.initPosition
    }

    initialize(){
        super.initialize()
        //this.scale = 1
        this.map.stage.rootScene.attach(this.component.sprite)
		this.component.addBodyToWorld()
    }

    remove() {
        this.map.stage.rootScene.detach(this.component.sprite)
		this.component.removeBodyFromWorld()
    }

    update(){
        super.update()
        this.component.update()
    }

    draw(ctx) {
        if(this.accumulationDamage !== 0) {
            ctx.font = '60px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText(this.accumulationDamage, this.position.x, this.position.y - this.component.sprite.height / 2 - 30)
        }
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
        this.mousemove(e[0])
    }    
}