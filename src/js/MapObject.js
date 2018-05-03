GameClasses.MapObject = class MapObject {
    constructor() {
        autoBind(this)
        this.mapObjectID
        this.map
        this.matter
        this.component
    }

    load() {}

    initialize() {}

    update() {}

    draw(ctx) {}

    remove() {}
}