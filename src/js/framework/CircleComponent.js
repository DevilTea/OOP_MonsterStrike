'use strict'
Framework.CircleComponent = class CircleComponent extends Framework.Component {
	constructor(matter, sprite, options) {
		super(matter, sprite, options)
		autoBind(this)
		this.bodyOptions = options
		this.body = this.matter.createCircleBody(0, 0, 1, this.bodyOptions)
	}

	update() {
		super.update()
		if(!this.hasFirstUpdate && this.sprite.texture) {
			this.hasFirstUpdate = true
			let a = this.sprite.texture.width * this.sprite.scale.x / 2
			this.matter.removeBody(this.body)
			this.body = this.matter.createCircleBody(0, 0, a, this.bodyOptions)
			this.setBody('position', this.sprite.position)
		} else if(this.hasFirstUpdate) {
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
	}
}