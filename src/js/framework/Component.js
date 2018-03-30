Framework.Component = class Component {
    constructor(matter, sprite, options) {
        autoBind(this)
        this.matter = matter
        this.sprite = sprite
        this.body = {}
        this.hasFirstUpdate = false

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
		if(!this.hasFirstUpdate && this.sprite.texture) {
			this.hasFirstUpdate = true
			let a = this.sprite.texture.width
			this.matter.scaleBody(this.body, a / 2, a / 2)
		} else if(this.hasFirstUpdate) {
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
	}
}