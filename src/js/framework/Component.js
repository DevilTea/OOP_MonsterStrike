Framework.Component = class Component {
    constructor(matter, sprite, options) {
        autoBind(this)
        this.matter = matter
        this.sprite = sprite
		this.body = {}
		this.bodyOptions = options
		this.componentPosition = {x: 0, y: 0}
		this.componentScale = {x: 0, y: 0}
		this.componentRotation = 0
		this.hasAddedToWorld = false
        this.hasFirstUpdate = false
		this.lockRotation = false
		this.syncSprite = true

        Object.defineProperty(this, 'position', {
			get : function() {
				return this.componentPosition
			},
			set : function(newValue) {
				this.componentPosition = newValue
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.position = newValue
				}
				this.setBody('position', newValue)
			}
		})
		
		Object.defineProperty(this, 'scale', {
			get : function() {
				return this.componentScale
			},
			set : function(newValue) {
				let tempX = newValue.x / this.componentScale.x
				let tempY = newValue.y / this.componentScale.y
				this.componentScale = newValue
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.scale = newValue
				}
				this.matter.scaleBody(this.body, tempX, tempY)
			}
		})
		
        Object.defineProperty(this, 'rotation', {
			get : function() {
				return this.componentRotation
			},
			set : function(newValue) {
				this.componentRotation = newValue
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.rotation = newValue
				}
				this.setBody('angle', newValue * Math.PI / 180)
			}
		})
	}
	
	addBodyToWorld() {
		this.matter.addBody(this.body)
		this.hasAddedToWorld = true
	}

	removeBodyFromWorld() {
		this.matter.removeBody(this.body)
		this.hasAddedToWorld = false
	}

	setBody(property, value) {
		this.matter.setBody(this.body, property, value)
    }
    
    update() {
		
	}
}