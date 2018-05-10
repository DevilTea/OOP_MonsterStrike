GameClasses.SkillFactory = class SkillFactory {
    constructor() {
        autoBind(this)
        this.effectSprites = {}
    }

    load() {
        this.effectSprites.effect1 = new Framework.Sprite(imagePath + 'effect/effect1.png')
        this.effectSprites.effect2 = new Framework.Sprite(imagePath + 'effect/effect2.png')
    }

    getOrangeLazerSprite() {
        return this.effectSprites.effect1.getSection({x:865, y:810}, {x:925, y:1020})
    }

    getPurpleLazerSprite() {
        return this.effectSprites.effect1.getSection({x:740, y:605}, {x:800, y:810})
    }

    getOrangeLazerSprite() {
        return this.effectSprites.effect1.getSection({x:733, y:810}, {x:793, y:1020})
    }

    getOrangeLazerSprite() {
        return this.effectSprites.effect1.getSection({x:800, y:810}, {x:860, y:1020})
    }

    getOrangeLazerSprite() {
        return this.effectSprites.effect1.getSection({x:620, y:730}, {x:680, y:940})
    }
}