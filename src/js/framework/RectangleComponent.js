Framework.RectangleComponent = class RectangleComponent extends Framework.Component {
    constructor(matter, sprite, options) {
        super(matter, sprite, options)
        autoBind(this)
		this.body = this.matter.createRectangleBody(0, 0, 1, 1, this.bodyOptions)
    }

    update() {
        if(this.hasAddedToWorld) {
            if(!this.hasFirstUpdate && this.sprite.texture) {
                this.hasFirstUpdate = true
                let realWidth = this.sprite.texture.width * this.sprite.scale.x
                let realHeight = this.sprite.texture.height * this.sprite.scale.y
                this.removeBodyFromWorld()
                this.body = this.matter.createRectangleBody(0, 0, realWidth, realHeight, this.bodyOptions)
                this.addBodyToWorld()

                this.position = this.position
                this.rotation = this.rotation
            } else if(this.hasFirstUpdate) {
                if(this.lockRotation && this.body.angle != 0 && this.body.angularvelocity != 0) {
                    this.setBody('angularVelocity', 0)
                    this.setBody('angle', 0)
                }
                this.position = {x: this.body.position.x, y: this.body.position.y}
                this.rotation = this.body.angle / Math.PI * 180
            }
        }
    }
}