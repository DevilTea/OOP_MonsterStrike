GameClasses.MapObject = class MapObject {
    constructor() {
        autoBind(this)
        this.mapObjectID = -2
        this.map
        this.matter
        this.component
    }

    defineProperties() {
        Object.defineProperty(this, 'position', {
			get : function() {
				return this.component.position
			},
			set : function(newValue) {
				this.component.position = newValue
			}
		})
		
		Object.defineProperty(this, 'scale', {
			get : function() {
				return this.component.scale
			},
			set : function(newValue) {
				this.component.scale = newValue
			}
		})
		
        Object.defineProperty(this, 'rotation', {
			get : function() {
				return this.component.rotation
			},
			set : function(newValue) {
				this.component.rotation = newValue
			}
		})

		Object.defineProperty(this, 'opacity', {
			get : function() {
				return this.component.opacity
			},
			set : function(newValue) {
				this.component.opacity = newValue
			}
		})
    }

    load() {}

    initialize() {}

    update() {
		this.component.update()
	}

    draw(ctx) {}

    remove() {}
}