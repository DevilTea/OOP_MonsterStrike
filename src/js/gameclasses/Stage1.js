Stages.Stage1 = class Stage1 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 20
        this.monsterDamageRate = 0.1
    }

    static getStageName() {
        return '雷射技能展示關卡(簡單)'
    }

    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[1], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[5], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[11], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[15], {x: 930, y: 1100}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[56], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[58], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[60], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[62], {x: 930, y: 1100}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[1743], {x: 540, y: 700}, 1, true)
        map.addMonster(monster1)
    }
}