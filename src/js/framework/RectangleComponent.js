Framework.RectangleComponent = class RectangleComponent extends Framework.Component {
    constructor(matter, sprite, options) {
        super(matter, sprite, options)
        autoBind(this)
		this.body = this.matter.createRectangleBody(0, 0, 1, 1, this.bodyOptions)
    }

    update() {
        super.update()
        if(this.hasAddedToWorld) {
            if(!this.hasFirstUpdate && this.sprite.texture) {
                this.hasFirstUpdate = true
                this.removeBodyFromWorld()
                this.body = this.matter.createRectangleBody(0, 0, this.sprite.width, this.sprite.height, this.bodyOptions)
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