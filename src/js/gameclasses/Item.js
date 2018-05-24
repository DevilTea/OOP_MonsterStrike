GameClasses.Item = class Item extends GameClasses.MapObject {
    constructor(itemSprite, initPosition){
        super()
        autoBind(this)
        this.initPosition = initPosition
        this.section = [{x: 452,y: 1}, {x: 510, y: 62}, {x: 451, y: 187} ,{x:505, y: 240}]
        this.type = ['addHP', 'promoteDamage']
        this.random = Math.floor(Math.random() * 2)
        this.itemSprite = itemSprite.getSection(this.section[this.random * 2], this.section[this.random * 2 + 1])
        this.isRemoving = false
        this.isTouch = false
        this.promoteDamage = 5000
        this.addHP = 5000
    }

    initialize() {// {x: 452,y: 1}, {x: 510, y: 62}  {x: 451, y: 187}, {x:505, y: 240}
        this.itemType = this.type[this.random]
        this.component = new Framework.RectangleComponent(this.matter, this.itemSprite, {label: 'mapObjectID_' + this.mapObjectID, friction: 0, frictionAir: 0.012, frictionStatic: 0, restitution: 1, isSensor: true})
        this.component.position = this.initPosition
        this.component.scale = {x: 1, y: 1 }
        this.component.addBodyToWorld()
        this.defineProperties()
    }

    draw(ctx){
        this.itemSprite.draw(ctx)
    }

    remove() {
        this.component.removeBodyFromWorld()
        this.isRemoving = true
        delete this
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
        else {
            this.map.stage.marbles.forEach((marble) => {
                console.log('promoteDamage')
                marble.damage += this.promoteDamage
            })
        }

    }
}