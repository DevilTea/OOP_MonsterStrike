GameClasses.Monster = class Monster extends GameClasses.MapObject {
    constructor(monsterData) {
        super()
        autoBind(this)
        this.monsterID = monsterData.monsterID
        this.isBoss = monsterData.isBoss
        this.maxHP = monsterData.HP
        this.nowHP = monsterData.HP
        this.initPosition = monsterData.initPosition
        this.accumulationDamage = 0
        this.monsterSprite
        this.isInitialized = false
    }

    load() {
        this.monsterSprite = new Framework.Sprite(imagePath + 'monster/' + this.monsterID + '.png')
    }

    initialize() {
        if(!this.isInitialized) {
            this.component = new Framework.RectangleComponent(this.matter, this.monsterSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isStatic: true})
            this.component.position = this.initPosition
            this.component.addBodyToWorld()
            this.isInitialized = true
        }
    }

    update() {
        this.component.update()
    }

    draw(ctx) {
        if(this.isInitialized) {
            this.monsterSprite.draw(ctx)
            if(this.isBoss) {
                this.drawHpBar(ctx, this.accumulationDamage, this.nowHP, this.maxHP, 0, 0, 1080, 40, true)
            } else {
                this.drawHpBar(ctx, this.accumulationDamage, this.nowHP, this.maxHP, this.component.position.x - this.monsterSprite.texture.width / 2 + 50, this.component.position.y - this.monsterSprite.texture.height / 2 - 20, 100, 10, false)
            }
            if(this.accumulationDamage !== 0) {
                this.drawDamageValue(ctx, this.accumulationDamage)
            }
        }
        
    }

    drawDamageValue(ctx, value) {
        ctx.font = '60px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(value, this.component.position.x, this.component.position.y - this.monsterSprite.texture.height / 2 - 50)
    }

    drawHpBar(ctx, accumulationDamage, nowHP, maxHP, x, y, width, height, showHP) {
        let valueLeft = Math.max(nowHP - accumulationDamage, 0)
        ctx.fillStyle = "black"
        ctx.fillRect(x, y, width, height)
        ctx.fillStyle = "red"
        ctx.fillRect(x, y, nowHP / maxHP * width, height)
        ctx.fillStyle = "green"
        ctx.fillRect(x, y, valueLeft / maxHP * width, height)
        if(showHP) {
            ctx.font = '60px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText(valueLeft + "/" + maxHP, x + width / 2, y + height)
        }
    }

    accumulateDamage(damage) {
        this.accumulationDamage += damage
    }

    calculateHP() {
        this.nowHP = Math.max(this.nowHP - this.accumulationDamage, 0)
        this.accumulationDamage = 0
    }

    remove() {
        this.component.removeBodyFromWorld()
    }
}