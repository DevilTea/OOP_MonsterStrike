GameClasses.BodyWorld = class BodyWorld {
    constructor() {
        this.zone = {upperLeft: {x: 0, y: 0}, bottomRight: {x: 1080, y: 1497}}
        this.bodies = []
        this.checklist = []
    }

    update(fps) {
        this.checklist.length = 0
        this.checklist.push(...this.bodies)
        this.bodies.forEach((body) => {
            body.update(fps)
        })
        
    }

    detect(bodyA) {
        let collisionList = []
        let collision = {}
        this.checklist.forEach((bodyB) => {
            let verticesA = bodyA.vertices()
            let verticesB = bodyB.vertices()
            if((verticesA[0].x >= verticesB[0].x && verticesA[0].x <= verticesB[2].x && verticesA[0].y >= verticesB[0].y && verticesA[0].y <= verticesB[2].y) ||
                (verticesA[1].x >= verticesB[0].x && verticesA[1].x <= verticesB[2].x && verticesA[1].y >= verticesB[0].y && verticesA[1].y <= verticesB[2].y) ||
                (verticesA[2].x >= verticesB[0].x && verticesA[2].x <= verticesB[2].x && verticesA[2].y >= verticesB[0].y && verticesA[2].y <= verticesB[2].y) ||
                (verticesA[3].x >= verticesB[0].x && verticesA[3].x <= verticesB[2].x && verticesA[3].y >= verticesB[0].y && verticesA[3].y <= verticesB[2].y)) {
                
                
            }
        })
    }
}