GameClasses.SkillFactory = class SkillFactory {
    constructor(matter) {
        autoBind(this)
        this.matter = matter
        this.effectSprites = {}
        this.typeEnum = {lazer: 0}
    }

    load() {
        this.effectSprites.effect1 = new Framework.Sprite(imagePath + 'effect/effect1.png')
        this.effectSprites.effect2 = new Framework.Sprite(imagePath + 'effect/effect2.png')
    }

    createSkill(skillOwner, skillType, skillLevel, doAfter = () => {}) {
        let skillSprite
        if(SkillFactory.isLazerSkill(skillType)) {
            skillSprite = this.getLazerSprite(skillOwner.element)
        }
        return new GameClasses.Skill(skillOwner, skillType, skillLevel, skillSprite, doAfter)
    }

    static isLazerSkill(skillType) {
        return skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_UP || skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_DOWN ||
                skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_UP || skillType === GameClasses.skillTypeEnum.LAZER_SINGLE_DOWN
    }

    getLazerSprite(element) {
        let lazerSprite
        if(element === GameClasses.elementTypeEnum.WATER) {
            if(this.effectSprites.waterLazer === undefined) {
                this.effectSprites.waterLazer = this.effectSprites.effect1.getSection({x:734, y:811}, {x:794, y:1012})
            }
            lazerSprite = this.effectSprites.waterLazer
        } else if(element === GameClasses.elementTypeEnum.FIRE) {
            if(this.effectSprites.fireLazer === undefined) {
                this.effectSprites.fireLazer = this.effectSprites.effect1.getSection({x:865, y:811}, {x:925, y:1012})
            }
            lazerSprite = this.effectSprites.fireLazer
        } else if(element === GameClasses.elementTypeEnum.WOOD) {
            if(this.effectSprites.woodLazer === undefined) {
                this.effectSprites.woodLazer = this.effectSprites.effect1.getSection({x:622, y:730}, {x:682, y:932})
            }
            lazerSprite = this.effectSprites.woodLazer
        } else if(element === GameClasses.elementTypeEnum.LIGHT) {
            if(this.effectSprites.lightLazer === undefined) {
                this.effectSprites.lightLazer = this.effectSprites.effect1.getSection({x:800, y:811}, {x:860, y:1012})
            }
            lazerSprite = this.effectSprites.lightLazer
        } else if(element === GameClasses.elementTypeEnum.DARK) {
            if(this.effectSprites.darkLazer === undefined) {
                this.effectSprites.darkLazer = this.effectSprites.effect1.getSection({x:735, y:607}, {x:795, y:807})
            }
            lazerSprite = this.effectSprites.darkLazer
        }
        return lazerSprite.clone()
    }
}