GameClasses.SkillObject = class SkillObject extends GameClasses.MapObject {
    constructor(skill) {
        super()
        autoBind(this)
        this.skill = skill
        this.skillObjSprite = this.skill.skillSprite.clone()
        this.isRemoved = false
    }

    initialize() {
        this.component = new Framework.RectangleComponent(this.matter, this.skillObjSprite, {label: 'mapObjectID_' + this.mapObjectID, isSensor: true})
        let effectObj = {}
        if(GameClasses.SkillFactory.isLazerSkill(this.skill.skillType)) {
            this.component.position = this.skill.skillOwner.component.position
            let sc = 10
            this.component.scale = {x: 1, y: 0.1}
            if(this.skill.skillLevel === GameClasses.skillLevelEnum.LAZER_S) {
                effectObj.scale = {x: 1.5, y: sc}
            } else if(this.skill.skillLevel === GameClasses.skillLevelEnum.LAZER_M) {
                effectObj.scale = {x: 2.5, y: sc}
            } else if(this.skill.skillLevel === GameClasses.skillLevelEnum.LAZER_L) {
                effectObj.scale = {x: 3.5, y: sc}
            } else if(this.skill.skillLevel === GameClasses.skillLevelEnum.LAZER_EL) {
                effectObj.scale = {x: 4.5, y: sc}
            }
            let offset = (this.component.sprite.texture.height * sc - this.component.sprite.height) / 2
            if(this.skill.skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_UP) {
                this.component.rotation = 0
                effectObj.position = {x: this.component.position.x, y: this.component.position.y - offset}
            } else if(this.skill.skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_DOWN) {
                this.component.rotation = 180
                effectObj.position = {x: this.component.position.x, y: this.component.position.y + offset}
            } else if(this.skill.skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_LEFT) {
                this.component.rotation = 90
                effectObj.position = {x: this.component.position.x - offset, y: this.component.position.y}
            } else if(this.skill.skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_RIGHT) {
                this.component.rotation = 270
                effectObj.position = {x: this.component.position.x + offset, y: this.component.position.y}
            }
            this.component.componentMagician.addEffect({}, 900, () => {
                this.component.addBodyToWorld()
            })
            this.component.componentMagician.addEffect(effectObj, 50)
            this.component.componentMagician.addEffect(effectObj, 500, () => {
                this.component.removeBodyFromWorld()
                this.isRemoved = true
                this.skill.doAfter()
                delete this
            })
        }
    }

    /*update() {

    }*/

    draw(ctx) {
        this.skillObjSprite.draw(ctx)
    }
}