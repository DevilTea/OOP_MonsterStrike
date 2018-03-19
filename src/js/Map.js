const MAP_CONST = {
	WALL_THICKNESS : 50
}

class Map {
	constructor() {
		this.nextMapObjectID = 0
		this.mapObjects = []
	}
	
	init() {
		this.nextMapObjectID = 0
		this.mapObjects = []
	}
	
	addMapObject(mapObject) {
		this.nextMapObjectID++
		this.mapObjects.push(mapObject)
	}
	
	removeaddMapObject(mapObject) {
		let indexToRemove = this.mapObjects.indexOf(mapObject)
		if(indexToRemove != -1)
			this.mapObjects.splice(indexToRemove,1)
	}
	
	
}