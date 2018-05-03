'use strict'
Framework.CircleComponent = class CircleComponent extends Framework.Component {
	constructor(matter, sprite, options) {
		super(matter, sprite, options)
		autoBind(this)
		this.body = this.matter.createCircleBody(0, 0, 1, this.bodyOptions)
	}

	update() {
		if(this.hasAddedToWorld) {
			if(!this.hasFirstUpdate && this.sprite.texture) {
				this.hasFirstUpdate = true
				let radius = this.sprite.texture.width * this.sprite.scale.x / 2

				this.removeBodyFromWorld()
				this.body = this.matter.createCircleBody(0, 0, radius, this.bodyOptions)
				this.addBodyToWorld()

				this.position = this.position
				this.rotation = this.rotation
			} else if(this.hasFirstUpdate) {
				if(this.lockRotation && this.body.angle != 0 && this.body.angularvelocity != 0) {
					this.setBody('angularVelocity', 0)
					this.setBody('angle', 0)
				}
				this.position = this.body.position
				this.rotation = this.body.angle / Math.PI * 180
			}
		}
	}
}