GameClasses.Monster = class Monster extends MapObject {
    constructor(monsterConfig, matter) {
        super()
		autoBind(this)
        this.monsterID = monsterConfig.monsterID
        this.attribute = monsterConfig.attribute
        this.hp = monsterConfig.hp
        this.race = monsterConfig.race

        this.nowHp = this.hp
    }
}