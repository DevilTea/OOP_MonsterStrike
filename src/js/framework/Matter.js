Framework.Matter = class MyMatter {
    constructor() {
        this.engine = Matter.Engine.create()
        this.world = this.engine.world
        this.render = Matter.Render.create({
            element: Framework.Game.mainContainer,
            canvas: Framework.Game.canvas,
            engine: this.engine,
            options: {
                width: Framework.Config.canvasWidth,
                height:Framework.Config.canvasHeight,
                wireframes: true
            }
        })
        this.isWireframeRendering = false
    }
    toggleRenderWireframes() {
        if(this.isWireframeRendering) {
            Matter.Render.stop(this.render)
        } else {
            Matter.Render.run(this.render)
        }
        this.isWireframeRendering = !this.isWireframeRendering
    }
    clearWorld(keepStatic) {
        Matter.World.clear(this.world, keepStatic)
    }
    createRectangleBody(originX, originY, width, height, options) {
        let body = Matter.Bodies.rectangle(originX, originY, width, height, options)
        return body
    }
    createCircleBody(originX, originY, radius, options) {
        let body = Matter.Bodies.circle(originX, originY, radius, options)
        return body
    }
    addBody(body) {
        Matter.World.add(this.world, body)
    }
    removeBody(body) {
        Matter.World.remove(this.world, body)
    }
    setBody(body, settings, value) {
        Matter.Body.set(body, settings, value)
    }
    scaleBody(body, scaleX, scaleY){
        Matter.Body.scale(body, scaleX, scaleY)
    }
    addEventListener(eventName, callback) {
        Matter.Events.on(this.engine, eventName, callback)
    }
    update() {
        Matter.Engine.update(this.engine, 1000 / Framework.Config.fps, 1)
    }
}