class MapObject {
	constructor(position = new Framework.Point()) {
		autoBind(this)
		this.position = position
		this.map
	}
	
	load() {
		
	}
	
	initialize() {
		
	}
	
	update() {
		
	}
	
	draw(ctx) {
		
	}
	
	mouseup(e) {
    }

    mousedown(e) {
    }

    mousemove(e) {    
    }
	
    touchstart(e) {
        this.mousedown(e[0])
    }

    touchend(e) {
        this.mouseup(e[0])
    }
    
    touchmove(e) {
        this.mousemove(e[0])
    }	
}