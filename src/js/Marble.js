class Marble extends MapObject {
	constructor() {
		super()
		this.attribute = 0			//屬性
		this.rebound = false		//反射/貫通
		this.hp = 0					//HP
		this.atk = 0				//攻擊力
		this.spd = 0				//速度
		this.race = 0				//種族
		this.skill = []				//技能
		this.comboSkill = []		//友情技能
	}
}