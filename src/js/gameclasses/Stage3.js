Stages.Stage3 = class Stage3 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage3.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 30
        this.monsterDamageRate = 0.3
    }

    static getStageName() {
        return '第三級關卡'
    }

    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[5], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[5], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[7], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[7], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[5], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[8], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[8], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[5], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[5], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[8], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[6], {x: 540, y: 700}, 3, true)
        map.addMonster(monster1)
    }
}