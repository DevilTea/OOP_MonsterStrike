Framework.Matter = class MatterUtil {
        constructor() {
            this.engine = Matter.Engine.create()
            this.world = this.engine.world

        }

        createRectangleBody(originX, originY, width, height, options) {
            let body = Matter.Bodies.rectangle(originX, originY, width, height, options)
            Matter.World.add(this.world, body)
            return body
        }

        createCircleBody(originX, originY, radius, options) {
            let body = Matter.Bodies.circle(originX, originY, radius, options)
            Matter.World.add(this.world, body)
            return body
        }

        setBody(body, settings, value) {
            Matter.Body.set(body, settings, value)
        }

        scaleBody(body, scaleX, scaleY){
            Matter.Body.scale(body, scaleX, scaleY)
        }

        update() {
            Matter.Engine.update(this.engine, 1000 / Framework.Config.fps, 1)
        }
    }