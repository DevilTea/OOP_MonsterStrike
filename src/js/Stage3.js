Stages.Stage3 = (() => {
    let marble_1 = {
        marbleID : 1743,
        attribute : 4,
        rebound : 0,
        hp : 23865,
        atk : 23001,
        speed : 319.33,
        race : 0,
        skill : [],
        comboSkill : [],
        initPosition : {x: 216, y: 1400}
    }

    let marble_2 = {
        marbleID : 1032,
        attribute : 1,
        rebound : 0,
        hp : 21698,
        atk : 24483,
        speed : 312.73,
        race : 0,
        skill : [],
        comboSkill : [],
        initPosition : {x: 432, y: 1400}
    }

    let marble_3 = {
        marbleID : 1746,
        attribute : 0,
        rebound : 1,
        hp : 24602,
        atk : 22578,
        speed : 394.87,
        race : 0,
        skill : [],
        comboSkill : [],
        initPosition : {x: 648, y: 1400}
    }

    let marble_4 = {
        marbleID : 3090,
        attribute : 2,
        rebound : 0,
        hp : 16072,
        atk : 18187,
        speed : 250.60,
        race : 0,
        skill : [],
        comboSkill : [],
        initPosition : {x: 864, y: 1400}
    }

    let marblesOptions = [marble_1, marble_2, marble_3, marble_4]

    let monstersOptionsMap_1 = [
        {
            isBoss: false,
            monsterID : 1,
            attribute : 0,
            hp : 150000,
            atk : 0,
            skill : [],
            initPosition : {x: 190, y: 400}
        },
        {
            isBoss: false,
            monsterID : 1,
            attribute : 0,
            hp : 150000,
            atk : 0,
            skill : [],
            initPosition : {x: 930, y: 400}
        },
        {
            isBoss: false,
            monsterID : 1,
            attribute : 0,
            hp : 150000,
            atk : 0,
            skill : [],
            initPosition : {x: 190, y: 1100}
        },
        {
            isBoss: false,
            monsterID : 1,
            attribute : 0,
            hp : 150000,
            atk : 0,
            skill : [],
            initPosition : {x: 930, y: 1100}
        }
    ]

    let monstersOptionsMap_2 = [
        {
            isBoss: true,
            monsterID : 239,
            attribute : 0,
            hp : 750000,
            atk : 0,
            skill : [],
            initPosition : {x: 540, y: 750}
        }
    ]

    let monstersOptions = [monstersOptionsMap_1, monstersOptionsMap_2]

    return (new GameClasses.Stage('測試關卡3', marblesOptions, monstersOptions))
})()