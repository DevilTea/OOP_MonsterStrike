Framework.Matter = (function() {
    let Engine = Matter.Engine
    let Render = Matter.Render
    let World = Matter.World
    let Body = Matter.Body
    let Bodies = Matter.Bodies


    class MatterUtil {
        constructor() {
            this.Engine = Engine
            this.Render = Render
            this.World = World
            this.Body = Body
            this.Bodies = Bodies
        }
    }

    return MatterUtil
})()