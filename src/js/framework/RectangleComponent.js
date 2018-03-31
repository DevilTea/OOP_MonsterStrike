Framework.RectangleComponent = class RectangleComponent extends Framework.Component {
    constructor(matter, sprite, options) {
        super(matter, sprite, options)
        autoBind(this)
		this.bodyOptions = options
		this.body = this.matter.createRectangleBody(0, 0, 1, 1, this.bodyOptions)
    }

    update() {
        super.update()
		if(!this.hasFirstUpdate && this.sprite.texture) {
			this.hasFirstUpdate = true
			let realWidth = this.sprite.texture.width * this.sprite.scale.x
            let realHeight = this.sprite.texture.height * this.sprite.scale.y
            this.matter.scaleBody(this.body, realWidth, realHeight)
		} else if(this.hasFirstUpdate) {
			this.sprite.position = this.body.position
			this.sprite.rotation = this.body.angle / Math.PI * 180
		}
    }
}