Stages.Stage4 = class Stage4 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 40
        this.monsterDamageRate = 0.4
    }

    static getStageName() {
        return '第四級關卡'
    }
    
    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[11], {x: 190, y: 400}, 3)
        let monster2 = new GameClasses.Monster(marbleDataList[11], {x: 930, y: 400}, 3)
        let monster3 = new GameClasses.Monster(marbleDataList[10], {x: 190, y: 1100}, 3)
        let monster4 = new GameClasses.Monster(marbleDataList[10], {x: 930, y: 1100}, 3)
        let monster5 = new GameClasses.Monster(marbleDataList[11], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[9], {x: 190, y: 400}, 3)
        let monster2 = new GameClasses.Monster(marbleDataList[9], {x: 930, y: 400}, 3)
        let monster3 = new GameClasses.Monster(marbleDataList[11], {x: 190, y: 1100}, 3)
        let monster4 = new GameClasses.Monster(marbleDataList[11], {x: 930, y: 1100}, 3)
        let monster5 = new GameClasses.Monster(marbleDataList[12], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }

    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[12], {x: 540, y: 700}, 4, true)
        map.addMonster(monster1)
    }
}