Stages.Stage5 = class Stage5 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 50
        this.monsterDamageRate = 0.5
    }

    static getStageName() {
        return '第五級關卡'
    }

    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[15], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[15], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[14], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[14], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[15], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[14], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[14], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[13], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[13], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[14], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[16], {x: 540, y: 700}, 3, true)
        map.addMonster(monster1)
    }
}