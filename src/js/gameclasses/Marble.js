GameClasses.Marble = class Marble extends GameClasses.MapObject {
    constructor(marbleSlot, marbleData) {
        super()
        autoBind(this)
        this.marbleID = marbleData.id
        this.sling = marbleData.sling
        this.element = marbleData.element
        this.maxHp = marbleData.hp
        this.maxSpeed = marbleData.speed
        this.nowSpeed = 0
        this.damage = marbleData.damage
        this.strikeShotCooldown = marbleData.strikeShotCooldown
        this.strikeShot = {}
        this.comboSkillData = marbleData.comboSkillData
        this.comboSkill
        this.hasUsedComboSkill = false
        this.marbleSlot = marbleSlot/*0,1,2,3*/
        this.isMoving = false
        this.marbleSprite
    }
    load() {
        this.marbleSprite = new Framework.Sprite(imagePath + 'ball/Ball' + this.marbleID + '.png')
    }
    initialize() {
        this.comboSkill = Framework.Game.currentLevel.skillFactory.createSkill(this, this.comboSkillData)
        this.component = new Framework.CircleComponent(this.matter, this.marbleSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isSensor: true})
        this.component.position = {x: (this.marbleSlot + 1) * 216, y: 1400}
        this.component.scale = {x: 1.2, y: 1.2}
        this.component.lockRotation = true
        this.component.addBodyToWorld()
        this.defineProperties()
    }
    update() {
        super.update()
        if(this.isMoving && this.component.body.speed < 1) {
            this.component.setBody('velocity', {x: 0, y: 0})
            this.component.body.isSensor = true
            this.isMoving = false
        }
    }
    draw(ctx) {
        this.marbleSprite.draw(ctx)
    }
    shoot(shootingUnitVector) {
        this.isMoving = true
        let velocity = {x: this.maxSpeed * shootingUnitVector.x, y: this.maxSpeed * shootingUnitVector.y}
        this.component.setBody('velocity', velocity)
        this.component.body.isSensor = false
    }
    
    useComboSkill() {
        this.hasUsedComboSkill = true
        this.comboSkill.use()
    }
}