Stages.Stage6 = class Stage6 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 60
        this.monsterDamageRate = 0.6
    }

    static getStageName() {
        return '第六級關卡'
    }

    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[19], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[19], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[18], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[18], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[19], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[17], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[17], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[19], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[19], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[17], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[20], {x: 540, y: 700}, 2, true)
        map.addMonster(monster1)
    }
}