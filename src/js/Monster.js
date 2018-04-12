GameClasses.Monster = class Monster extends MapObject {
    constructor(monsterConfig, matter) {
        super(matter)
        autoBind(this)
        this.isBoss = monsterConfig.isBoss
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
            let pos = {x: this.position.x, y: this.position.y - this.component.sprite.height / 2 - 30}
            this.map.stage.gameUI.drawDamageValue(ctx, this.accumulationDamage, pos)
        }
        if(this.isBoss) {
            this.map.stage.gameUI.drawBossHp(ctx, this.accumulationDamage, this.nowHp, this.hp, {x: 0, y: 0}, 1080, 60)
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