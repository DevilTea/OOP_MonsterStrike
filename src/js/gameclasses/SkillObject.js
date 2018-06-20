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
    }
    remove() {
        this.component.removeBodyFromWorld()
        this.isRemoved = true
        // delete this
    }
    draw(ctx) {
        this.skillObjSprite.draw(ctx)
    }
}