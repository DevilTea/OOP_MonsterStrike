GameClasses.Monster = class Monster extends GameClasses.MapObject {
    constructor(monsterData, initPosition, attackCountdown, isBoss = false) {
        super()
        autoBind(this)
        this.monsterID = monsterData.id
        this.element = monsterData.element
        this.isBoss = isBoss
        this.maxHP = monsterData.hp
        this.nowHP = this.maxHP
        this.maxAttackCountdown = attackCountdown
        this.nowAttackCountdown = attackCountdown
        this.attackSkillData = monsterData.comboSkillData
        this.attackSkill
        this.initPosition = initPosition
        this.accumulationDamage = 0
        this.monsterSprite
        this.isInitialized = false
        this.isAttacking = false
        this.isRemoving = false
    }
    load() {
        this.monsterSprite = new Framework.Sprite(imagePath + 'big/' + this.monsterID + '.png')
    }
    initialize() {
        if(!this.isInitialized) {
            this.maxHP = this.maxHP * this.map.stage.monsterHpRate
            this.nowHP = this.maxHP
            this.attackSkill = this.map.stage.skillFactory.createSkill(this, this.attackSkillData, () => {
                this.isAttacking = false
                this.nowAttackCountdown = this.maxAttackCountdown
                this.map.attackingMonsters.shift()
                this.map.monsterAttack()
            })
            this.component = new Framework.RectangleComponent(this.matter, this.monsterSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isStatic: true})
            this.component.position = this.initPosition
            if(this.isBoss) {
                this.component.scale = {x: 1.2, y: 1.2}
            } else {
                this.component.scale = {x: 0.8, y: 0.8}
            }
            this.component.addBodyToWorld()
            this.isInitialized = true
            this.defineProperties()
        }
    }
    /*update() {
        super.update()
    }*/
    attack() {
        if(!this.isAttacking) {
            this.isAttacking = true
            // console.log('怪物攻擊')
            this.attackSkill.use()
        }
    }
    draw(ctx) {
        if(this.isInitialized) {
            this.monsterSprite.draw(ctx)
            if(!this.isRemoving) {
                if(this.isBoss) {
                    this.drawHpBar(ctx, this.accumulationDamage, this.nowHP, this.maxHP, 0, 0, 1080, 40, true)
                } else {
                    this.drawHpBar(ctx, this.accumulationDamage, this.nowHP, this.maxHP, this.component.position.x - this.monsterSprite.texture.width / 2 + 50, this.component.position.y - this.monsterSprite.texture.height / 2 - 20, 100, 10, false)
                }
                this.drawAttackCountdown(ctx, this.nowAttackCountdown)
                if(this.accumulationDamage !== 0) {
                    this.drawDamageValue(ctx, this.accumulationDamage)
                }
            }
        }
    }
    drawAttackCountdown(ctx, value) {
        ctx.font = '900 40px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(value, this.component.position.x - this.monsterSprite.texture.width / 2, this.component.position.y + this.monsterSprite.texture.height / 2)
    }
    drawDamageValue(ctx, value) {
        ctx.font = 'bold 60px Arial'
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
            ctx.font = 'bold 60px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.fillText(valueLeft + "/" + maxHP, x + width / 2, y + height)
            ctx.lineWidth = 3
            ctx.strokeText(valueLeft + "/" + maxHP, x + width / 2, y + height)
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