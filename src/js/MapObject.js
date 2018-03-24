class MapObject {
	constructor(matter) {
		autoBind(this)
		this.pic = {}
		this.matter = matter
		this.component = {}
		this.map
		
		Object.defineProperty(this, 'position', {
			get : function() {
				return this.component.position
			},
			set : function (newValue) {
				this.component.position = newValue
			}
		})
		
		Object.defineProperty(this, 'scale', {
			get : function () {
				return this.component.scale
			},
			set : function (newValue) {
				this.component.scale = newValue
			}
		})
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