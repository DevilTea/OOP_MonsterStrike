GameClasses.SkillFactory = class SkillFactory {
    constructor() {
        autoBind(this)
        this.effectSprites = {}
    }
    load() {
        this.effectSprites.effect1 = new Framework.Sprite(imagePath + 'effect/effect1.png')
        this.effectSprites.effect2 = new Framework.Sprite(imagePath + 'effect/effect2.png')
    }
    createSkill(skillOwner, skillData, callback = () => {}) {
        return new GameClasses.Skill(skillOwner, skillData, this.getSkillSprite(skillData.skillType, skillOwner.element), callback)
    }
    static isLaserSkill(skillType) {
        return skillType === GameClasses.skillTypeEnum.LASER_SINGLE_UP || skillType === GameClasses.skillTypeEnum.LASER_SINGLE_DOWN ||
                skillType === GameClasses.skillTypeEnum.LASER_SINGLE_LEFT || skillType === GameClasses.skillTypeEnum.LASER_SINGLE_RIGHT ||
                skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_HORIZONTAL || skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_VERTICAL ||
                skillType === GameClasses.skillTypeEnum.LASER_CROSS_1 || skillType === GameClasses.skillTypeEnum.LASER_CROSS_2 ||
                skillType === GameClasses.skillTypeEnum.LASER_TRACK
    }
    
    static isSingleLaserSkill(skillType) {
        return skillType === GameClasses.skillTypeEnum.LASER_SINGLE_UP || skillType === GameClasses.skillTypeEnum.LASER_SINGLE_DOWN ||
                skillType === GameClasses.skillTypeEnum.LASER_SINGLE_LEFT || skillType === GameClasses.skillTypeEnum.LASER_SINGLE_RIGHT ||
                skillType === GameClasses.skillTypeEnum.LASER_TRACK
    }
    
    static isDoubleLaserSkill(skillType) {
        return skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_HORIZONTAL || skillType === GameClasses.skillTypeEnum.LASER_DOUBLE_VERTICAL
    }
    
    static isCrossLaserSkill(skillType) {
        return skillType === GameClasses.skillTypeEnum.LASER_CROSS_1 || skillType === GameClasses.skillTypeEnum.LASER_CROSS_2
    }
    getSkillSprite(skillType, element) {
        if(SkillFactory.isLaserSkill(skillType)) {
            return this.getLaserSprite(element)
        }
    }
    getLaserSprite(element) {
        let laserSprite
        if(element === GameClasses.elementTypeEnum.WATER) {
            if(this.effectSprites.waterLaser === undefined) {
                this.effectSprites.waterLaser = this.effectSprites.effect1.getSection({x:734, y:811}, {x:794, y:1012})
            }
            laserSprite = this.effectSprites.waterLaser
        } else if(element === GameClasses.elementTypeEnum.FIRE) {
            if(this.effectSprites.fireLaser === undefined) {
                this.effectSprites.fireLaser = this.effectSprites.effect1.getSection({x:622, y:730}, {x:682, y:932})
            }
            laserSprite = this.effectSprites.fireLaser
        } else if(element === GameClasses.elementTypeEnum.WOOD) {
            if(this.effectSprites.woodLaser === undefined) {
                this.effectSprites.woodLaser = this.effectSprites.effect1.getSection({x:865, y:811}, {x:925, y:1012})
            }
            laserSprite = this.effectSprites.woodLaser
        } else if(element === GameClasses.elementTypeEnum.LIGHT) {
            if(this.effectSprites.lightLaser === undefined) {
                this.effectSprites.lightLaser = this.effectSprites.effect1.getSection({x:800, y:811}, {x:860, y:1012})
            }
            laserSprite = this.effectSprites.lightLaser
        } else if(element === GameClasses.elementTypeEnum.DARK) {
            if(this.effectSprites.darkLaser === undefined) {
                this.effectSprites.darkLaser = this.effectSprites.effect1.getSection({x:735, y:607}, {x:795, y:807})
            }
            laserSprite = this.effectSprites.darkLaser
        }
        return laserSprite.clone()
    }
}