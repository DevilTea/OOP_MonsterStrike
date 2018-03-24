'use strict'
Framework.CircleComponent = class CircleComponent {
	constructor(matter, sprite, options) {
		autoBind(this)
		this.matter = matter
		this.sprite = sprite
		this.body = this.matter.createCircleBody(0, 0, 1, options)
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
				let temp = newValue / this.sprite.scale
				this.sprite.scale = newValue
				this.matter.scaleBody(this.body, temp, temp)
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
			if(this.lockRotation && this.body.angle != 0 && this.body.angularvelocity != 0) {
				this.setBody('angularVelocity', 0)
				this.setBody('angle', 0)
			}
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
	}
}