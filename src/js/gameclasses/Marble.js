GameClasses.Marble = class Marble extends GameClasses.MapObject {
    constructor(marbleSlot, marbleData) {
        super()
        autoBind(this)
        this.marbleID = marbleData.marbleID
        this.sling = marbleData.sling
        this.maxHP = marbleData.HP
        this.nowHP = marbleData.HP
        this.maxSpeed = marbleData.speed
        this.nowSpeed = 0
        this.damage = marbleData.damage
        this.strikeShotCooldown = marbleData.strikeShotCooldown
        this.strikeShot = {}
        this.comboSkill = {}
        this.marbleSlot = marbleSlot/*0,1,2,3*/
        this.isMoving = false
        this.marbleSprite
    }

    load() {
        this.marbleSprite = new Framework.Sprite(imagePath + 'marble/Ball' + this.marbleID + '.png')
    }

    initialize() {
        this.component = new Framework.CircleComponent(this.matter, this.marbleSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isSensor: true})
        this.component.position = {x: (this.marbleSlot + 1) * 216, y: 1400}
        this.component.scale = {x: 1.5, y: 1.5}
        this.component.lockRotation = true
        this.component.addBodyToWorld()
        this.defineProperties()
    }

    update() {
        this.component.update()
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
}