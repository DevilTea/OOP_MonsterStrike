Stages.Stage1 = class Stage1 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 10
        this.monsterDamageRate = 0.1
    }

    static getStageName() {
        return '第一級關卡'
    }

    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[1], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[1], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[3], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[3], {x: 930, y: 1100}, 1)
        let monster5 = new GameClasses.Monster(marbleDataList[1], {x: 540, y: 700}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[4], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[4], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[1], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[1], {x: 930, y: 1100}, 1)
        let monster5 = new GameClasses.Monster(marbleDataList[4], {x: 540, y: 700}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[2], {x: 540, y: 700}, 2, true)
        map.addMonster(monster1)
    }
}