GameClasses.MarbleData = class MarbleData {
    constructor(id, name, race, element, sling, hp, damage, speed, comboSkillData) {
        this.id = id
        this.name = name
        this.race = race
        this.element = element
        this.sling = sling
        this.hp = hp
        this.damage = damage
        this.speed = speed
        this.comboSkillData = comboSkillData
    }
}

marbleDataList = {}
let doooo = () => {
    marbleDataList[1] = new GameClasses.MarbleData(1, "Zinge", "Sprite", GameClasses.elementTypeEnum.FIRE, GameClasses.slingTypeEnum.BOUNCE, 1650, 1866, 101.13, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 1006))
    marbleDataList[5] = new GameClasses.MarbleData(5, "Watta", "Sprite", GameClasses.elementTypeEnum.WATER, GameClasses.slingTypeEnum.BOUNCE, 1629, 1733, 103.53, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_DOWN, GameClasses.skillLevelEnum.LASER_M, 1006))
    marbleDataList[11] = new GameClasses.MarbleData(11, "Phyll", "Sprite", GameClasses.elementTypeEnum.WOOD, GameClasses.slingTypeEnum.BOUNCE, 1650, 1866, 101.13, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_LEFT, GameClasses.skillLevelEnum.LASER_L, 1006))
    marbleDataList[15] = new GameClasses.MarbleData(15, "Dazzil", "Sprite", GameClasses.elementTypeEnum.LIGHT, GameClasses.slingTypeEnum.BOUNCE, 1629, 1733, 103.53, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_RIGHT, GameClasses.skillLevelEnum.LASER_EL, 1006))
    marbleDataList[19] = new GameClasses.MarbleData(19, "Glumber", "Sprite", GameClasses.elementTypeEnum.DARK, GameClasses.slingTypeEnum.BOUNCE, 1650, 1866, 101.13, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 1006))
    marbleDataList[56] = new GameClasses.MarbleData(56, "Kaboo", "Vivolith", GameClasses.elementTypeEnum.FIRE, GameClasses.slingTypeEnum.BOUNCE, 3021, 5215, 85.09, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_DOUBLE_HORIZONTAL, GameClasses.skillLevelEnum.LASER_S, 3220))
    marbleDataList[58] = new GameClasses.MarbleData(58, "Brr", "Vivolith", GameClasses.elementTypeEnum.WATER, GameClasses.slingTypeEnum.BOUNCE, 3072, 5421, 83.75, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_DOUBLE_VERTICAL, GameClasses.skillLevelEnum.LASER_M, 3220))
    marbleDataList[60] = new GameClasses.MarbleData(60, "Poink", "Vivolith", GameClasses.elementTypeEnum.WOOD, GameClasses.slingTypeEnum.BOUNCE, 3082, 5523, 83.05, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_CROSS_1, GameClasses.skillLevelEnum.LASER_L, 3220))
    marbleDataList[62] = new GameClasses.MarbleData(62, "Winkle", "Vivolith", GameClasses.elementTypeEnum.LIGHT, GameClasses.slingTypeEnum.BOUNCE, 3062, 5318, 84.42, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_CROSS_2, GameClasses.skillLevelEnum.LASER_EL, 3220))
    marbleDataList[64] = new GameClasses.MarbleData(64, "Squing", "Vivolith", GameClasses.elementTypeEnum.DARK, GameClasses.slingTypeEnum.BOUNCE, 3021, 5215, 85.09, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 3220))
    marbleDataList[1743] = new GameClasses.MarbleData(1743, "Archangel of Annuciation Gabriel", "Sprite", GameClasses.elementTypeEnum.WOOD, GameClasses.slingTypeEnum.BOUNCE, 23865, 23001, 319.33, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_TRACK, GameClasses.skillLevelEnum.LASER_EL, 21302))
    marbleDataList[1032] = new GameClasses.MarbleData(1032, "Underworld Rebel Lucifer", "Sprite", GameClasses.elementTypeEnum.DARK, GameClasses.slingTypeEnum.BOUNCE_2, 21698, 24483, 312.73, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 1006))
    marbleDataList[1746] = new GameClasses.MarbleData(1746, "Shinki Kamui", "Paladin", GameClasses.elementTypeEnum.LIGHT, GameClasses.slingTypeEnum.PIERCE_2, 24602, 22578, 394.87, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 1006))
    marbleDataList[391] = new GameClasses.MarbleData(391, "Zeus of the Shining Flame", "Deity", GameClasses.elementTypeEnum.LIGHT, GameClasses.slingTypeEnum.PIERCE, 26595, 22549, 369.93, new GameClasses.SkillData(GameClasses.skillTypeEnum.LASER_SINGLE_UP, GameClasses.skillLevelEnum.LASER_S, 1006))
}
doooo()