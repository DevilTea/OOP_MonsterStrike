Stages.Stage8 = class Stage8 extends GameClasses.Stage {
    constructor(marbles) {
        super('', marbles)
        autoBind(this)
        this.stageName = Stages.Stage1.getStageName()
        this.addMap1()
        this.addMap2()
        this.addMap3()
        this.monsterHpRate = 80
        this.monsterDamageRate = 1
    }
    static getStageName() {
        return '第八級關卡'
    }
    addMap1() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[141], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[141], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[145], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[145], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[141], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }
    addMap2() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[150], {x: 190, y: 400}, 2)
        let monster2 = new GameClasses.Monster(marbleDataList[150], {x: 930, y: 400}, 2)
        let monster3 = new GameClasses.Monster(marbleDataList[142], {x: 190, y: 1100}, 2)
        let monster4 = new GameClasses.Monster(marbleDataList[142], {x: 930, y: 1100}, 2)
        let monster5 = new GameClasses.Monster(marbleDataList[150], {x: 540, y: 700}, 2)
        map.addMonster(monster1)
        map.addMonster(monster2)
        map.addMonster(monster3)
        map.addMonster(monster4)
        map.addMonster(monster5)
    }
    addMap3() {
        let map = new GameClasses.Map()
        this.addMap(map)
        let monster1 = new GameClasses.Monster(marbleDataList[238], {x: 540, y: 700}, 2, true)
        map.addMonster(monster1)
    }
}