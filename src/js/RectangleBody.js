GameClasses.RectangleBody = class RectangleBody {
    constructor(x, y, width, height, isStatic = false) {
        this.world
        this.position = {x: x, y: y}
        this.width = width
        this.height = height
        this.corners = [
            {x: -width / 2, y: -height / 2},
            {x: width / 2, y: -height / 2},
            {x: width / 2, y: height / 2},
            {x: -width / 2, y: height / 2},
        ]

        this.velocity = {x: 0, y: 0}
        this.isStatic = isStatic

        Object.defineProperty(this, 'direction', {
            get: () => {
                return {x: this.velocity.x / this.speed, y: this.velocity.y / this.speed}
            },
            set: (newValue) => {
                let tmp = Math.sqrt(Math.pow(newValue.x, 2) + Math.pow(newValue.y, 2))
                let newDirection = {x: newValue.x / tmp, y: newValue.y / tmp}
                this.velocity.x = newDirection.x * this.speed
                this.velocity.y = newDirection.y * this.speed
            }
        })

        Object.defineProperty(this, 'speed', {
            get: () => {
                return Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2))
            },
            set: (newValue) => {
                let dir = this.direction
                this.velocity.x = dir.x * this.newValue
                this.velocity.y = dir.y * this.newValue
            }
        })
    }

    vertices() {
        let vertices = []
        this.corners.forEach((corner) => {
            vertices.push({x: corner.x + position.x, y: corner.y + position.y})
        })
        return vertices
    }

    update(fps) {
        let toMove = Math.sqrt(Math.pow(this.velocity.x * 60 / 1000, 2) + Math.pow(this.velocity.y * 60 / 1000, 2))
        for(let i = 0; i < toMove; i++) {
            this.position.x += this.direction.x
            this.position.y += this.direction.y
            this.world.detect(this)
        }
    }

    collisionOccured(collision) {

    }
}