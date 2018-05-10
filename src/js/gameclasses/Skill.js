GameClasses.Skill = class Skill {
    constructor(skillOwner, skillType, skillLevel, skillSprite, doAfter) {
        autoBind(this)
        this.skillOwner = skillOwner
        this.skillType = skillType
        this.skillLevel = skillLevel
        this.skillSprite = skillSprite
        this.doAfter = doAfter
    }

    use() {
        this.skillOwner.map.addSkillObject(new GameClasses.SkillObject(this))
    }
}