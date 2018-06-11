GameClasses.Item = class Item extends GameClasses.MapObject {
    constructor(itemSprite, initPosition, itemLevel){
        super()
        autoBind(this)
        this.initPosition = initPosition
        this.section = [{x: 452,y: 1}, {x: 510, y: 62}, {x: 451, y: 187} ,{x:505, y: 240}, {x: 483, y: 734} ,{x:505, y: 760}]
        this.type = ['addHP', 'promoteDamage', 'promoteDef']
        this.random = Math.floor(Math.random() * 3)
        this.itemSprite = itemSprite.getSection(this.section[this.random * 2], this.section[this.random * 2 + 1])
        this.isRemoving = false
        this.isTouch = false
        this.itemLevel = itemLevel
        this.promoteDamage = 5000
        this.addHP = 5000
    }

    initialize() {
        this.itemType = this.type[this.random]
        this.component = new Framework.RectangleComponent(this.matter, this.itemSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isSensor: true})
        this.component.position = this.initPosition
        this.component.scale = {x: 1.2, y: 1.2 }
        this.component.addBodyToWorld()
        this.defineProperties()
    }

    draw(ctx){
        this.itemSprite.draw(ctx)
    }

    remove() {
        this.component.removeBodyFromWorld()
        this.isRemoving = true
        // delete this
    }

    useItemEffect(){
        this.isTouch = true
        if(this.itemType === 'addHP') {
            console.log('addHP')
            this.map.stage.nowHp += this.addHP
            if(this.map.stage.nowHp > this.map.stage.maxHp) {
                this.map.stage.nowHp = this.map.stage.maxHp
            }
        }
        else if(this.itemType === 'promoteDamage'){
            this.map.stage.marbles.forEach((marble) => {
                console.log('promoteDamage')
                marble.damage += this.promoteDamage
            })
        }

    }
}