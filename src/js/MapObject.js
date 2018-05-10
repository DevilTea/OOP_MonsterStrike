GameClasses.MapObject = class MapObject {
    constructor(rectangleBody) {
        autoBind(this)
        this.mapObjectID
        this.map
        this.matter
        this.rectangleBody = rectangleBody
    }

    load() {}

    initialize() {}

    update() {}

    draw(ctx) {}

    remove() {}
}