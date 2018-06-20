Stages.Stage10 = class Stage10 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 100
        this.monsterDamageRate = 1
    }
    static getStageName() {
        return '第十級關卡'
    }
    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[59], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[61], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[63], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[65], {x: 930, y: 1100}, 1)
        let monster5 = new GameClasses.Monster(marbleDataList[244], {x: 540, y: 700}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }
    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[126], {x: 190, y: 400}, 1)
        let monster2 = new GameClasses.Monster(marbleDataList[128], {x: 930, y: 400}, 1)
        let monster3 = new GameClasses.Monster(marbleDataList[130], {x: 190, y: 1100}, 1)
        let monster4 = new GameClasses.Monster(marbleDataList[134], {x: 930, y: 1100}, 1)
        let monster5 = new GameClasses.Monster(marbleDataList[245], {x: 540, y: 700}, 1)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }
    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[299], {x: 540, y: 700}, 1, true)
        map.addMonster(monster1)
    }
}