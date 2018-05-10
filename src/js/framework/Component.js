Framework.Component = class Component {
    constructor(matter, sprite, options) {
        autoBind(this)
        this.matter = matter
		this.sprite = sprite
		this.componentMagician = new Framework.ComponentMagician(this)
		this.body = {}
		this.bodyOptions = options
		this.componentPosition = {x: 0, y: 0}
		this.componentScale = {x: 1, y: 1}
		this.componentRotation = 0
		this.componentOpacity = 1
		this.hasAddedToWorld = false
        this.hasFirstUpdate = false
		this.lockRotation = false
		this.syncSprite = true

        Object.defineProperty(this, 'position', {
			get : function() {
				return this.componentPosition
			},
			set : function(newValue) {
				this.componentPosition = {x: newValue.x, y: newValue.y}
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.position = {x: newValue.x, y: newValue.y}
				}
				this.setBody('position', {x: newValue.x, y: newValue.y})
			}
		})
		
		Object.defineProperty(this, 'scale', {
			get : function() {
				return this.componentScale
			},
			set : function(newValue) {
				let tempX = newValue.x / this.componentScale.x
				let tempY = newValue.y / this.componentScale.y
				this.componentScale = {x: newValue.x, y: newValue.y}
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.scale = {x: newValue.x, y: newValue.y}
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
		
        Object.defineProperty(this, 'opacity', {
			get : function() {
				return this.componentOpacity
			},
			set : function(newValue) {
				this.componentOpacity = newValue
				if(this.syncSprite && !this.sprite.isDuringAnimation) {
					this.sprite.opacity = newValue
				}
			}
		})

		Object.defineProperty(this, 'label', {
			get: () => {
				return this.body.label
			},
			set: (newValue) => {
				this.bodyOptions.label = newValue
				this.body.label = newValue
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
		this.componentMagician.update()
	}
}