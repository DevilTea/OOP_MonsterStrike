GameClasses.Skill = class Skill {
    constructor(skillOwner, skillData, skillSprite, callback = () => {}) {
        autoBind(this)
        this.skillOwner = skillOwner
        this.skillData = skillData
        this.skillSprite = skillSprite
        this.callback = callback
    }

    use() {
        //雷射系技能
        if(GameClasses.SkillFactory.isLaserSkill(this.skillData.skillType)) {
            if(GameClasses.SkillFactory.isSingleLaserSkill(this.skillData.skillType)) {
                this.useSingleLaserSkill(this.skillData.skillType, this.skillData.skillLevel)
            } else if(GameClasses.SkillFactory.isDoubleLaserSkill(this.skillData.skillType)) {
                this.useDoubleLaserSkill(this.skillData.skillType, this.skillData.skillLevel)
            } else if(GameClasses.SkillFactory.isCrossLaserSkill(this.skillData.skillType)) {
                this.useCrossLaserSkill(this.skillData.skillType, this.skillData.skillLevel)
            }
        }
    }

    addSingleLaserObject(laserLevel, rotation, callback = (() => {})) {
        let skillObject = new GameClasses.SkillObject(this)
        let startOffest = Math.min(this.skillOwner.component.sprite.width, this.skillOwner.component.sprite.height) / 2
        let effectObj = {}
        this.skillOwner.map.addSkillObject(skillObject)
        skillObject.component.position = {x: this.skillOwner.component.position.x + startOffest * Math.sin((rotation) / 180 * Math.PI), y: this.skillOwner.component.position.y - startOffest * Math.cos((rotation) / 180 * Math.PI)}
        let sc = 8
        let offset = ((skillObject.component.sprite.texture.height * sc) / 2)
        skillObject.component.scale = {x: 1, y: 0.1}
        skillObject.component.opacity = 0
        if(laserLevel === GameClasses.skillLevelEnum.LASER_S) {
            effectObj.scale = {x: 1.5, y: sc}
        } else if(laserLevel === GameClasses.skillLevelEnum.LASER_M) {
            effectObj.scale = {x: 2.5, y: sc}
        } else if(laserLevel === GameClasses.skillLevelEnum.LASER_L) {
            effectObj.scale = {x: 3.5, y: sc}
        } else if(laserLevel === GameClasses.skillLevelEnum.LASER_EL) {
            effectObj.scale = {x: 4.5, y: sc}
        }
        skillObject.component.rotation = rotation
        effectObj.position = {x: skillObject.component.position.x + offset * Math.sin((rotation) / 180 * Math.PI), y: skillObject.component.position.y - offset * Math.cos((rotation) / 180 * Math.PI)}
        skillObject.component.componentMagician.addEffect({}, 50, () => {
            skillObject.component.addBodyToWorld()
            skillObject.component.opacity = 1
        })
        skillObject.component.componentMagician.addEffect(effectObj, 50)
        skillObject.component.componentMagician.addEffect(effectObj, 500)
        skillObject.component.componentMagician.addEffect({opacity: 0, scale: {x: 1, y: 0.1}, position: this.skillOwner.component.position}, 50, () => {
            skillObject.remove()
            callback()
        })
    }

    useSingleLaserSkill(skillType, skillLevel) {
        if(skillType === GameClasses.skillTypeEnum.LASER_SINGLE_UP) {
            this.addSingleLaserObject(skillLevel, 0, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_SINGLE_DOWN) {
            this.addSingleLaserObject(skillLevel, 180, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_SINGLE_LEFT) {
            this.addSingleLaserObject(skillLevel, 90, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_SINGLE_RIGHT) {
            this.addSingleLaserObject(skillLevel, 270, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_TRACK) {
            let target
            let angle
            if(this.skillOwner instanceof GameClasses.Marble) {
                target = this.skillOwner.map.monsters[Math.floor(Math.random() * this.skillOwner.map.monsters.length)]
            } else if(this.skillOwner instanceof GameClasses.Monster) {
                target = this.skillOwner.map.marbles[Math.floor(Math.random() * this.skillOwner.map.marbles.length)]
            }
            angle = -90 + Matter.Vector.angle({x: target.position.x - this.skillOwner.position.x, y: target.position.y - this.skillOwner.position.y}, { x: 0, y: -1 }) * 180 / Math.PI
            this.addSingleLaserObject(skillLevel, angle, this.callback)
        }
    }

    useDoubleLaserSkill(skillType, skillLevel) {
        if(skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_HORIZONTAL) {
            this.addSingleLaserObject(skillLevel, 90)
            this.addSingleLaserObject(skillLevel, 270, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_VERTICAL) {
            this.addSingleLaserObject(skillLevel, 0)
            this.addSingleLaserObject(skillLevel, 180, this.callback)
        }
    }

    useCrossLaserSkill(skillType, skillLevel) {
        if(skillType === GameClasses.skillTypeEnum.LASER_CROSS_1) {
            this.addSingleLaserObject(skillLevel, 0)
            this.addSingleLaserObject(skillLevel, 90)
            this.addSingleLaserObject(skillLevel, 180)
            this.addSingleLaserObject(skillLevel, 270, this.callback)
        } else if(skillType === GameClasses.skillTypeEnum.LASER_CROSS_2) {
            this.addSingleLaserObject(skillLevel, 45)
            this.addSingleLaserObject(skillLevel, 135)
            this.addSingleLaserObject(skillLevel, 225)
            this.addSingleLaserObject(skillLevel, 315, this.callback)
        }
    }
}