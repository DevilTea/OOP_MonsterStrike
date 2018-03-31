Framework.Component = class Component {
    constructor(matter, sprite, options) {
        autoBind(this)
        this.matter = matter
        this.sprite = sprite
        this.body = {}
        this.hasFirstUpdate = false
		this.lockRotation = false

        Object.defineProperty(this, 'position', {
			get : function() {
				return this.body.position
			},
			set : function(newValue) {
				this.sprite.position = newValue
				this.setBody('position', newValue)
			}
		})
		
		Object.defineProperty(this, 'scale', {
			get : function() {
				return this.sprite.scale
			},
			set : function(newValue) {
				let tempX = newValue.x / this.sprite.scale.x
				let tempY = newValue.y / this.sprite.scale.y
				this.sprite.scale = newValue
				this.matter.scaleBody(this.body, tempX, tempY)
			}
		})
	}

	setBody(property, value) {
		this.matter.setBody(this.body, property, value)
    }
    
    update() {
		if(this.lockRotation && this.body.angle != 0 && this.body.angularvelocity != 0) {
			this.setBody('angularVelocity', 0)
			this.setBody('angle', 0)
		}
	}
}