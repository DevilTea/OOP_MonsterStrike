'use strict'
Framework.Point = class Point {
	constructor(x = 0, y = 0, isAbsolute = true) {
		this.absolute_x = Math.floor(x)
        this.absolute_y = Math.floor(y)
		this.relative_x = Math.floor(x)
        this.relative_y = Math.floor(y)
		this.isAbsolute = isAbsolute
		
		Object.defineProperty(this, 'x', {
			set: function(newValue) {
				if(this.absolute) {
					this.absolute_x = Math.floor(newValue)
					this.relative_x = Math.floor(newValue - Framework.Game.getCanvas().offsetLeft)      
				} else {
					this.absolute_x = Math.floor(Framework.Game.getCanvas().offsetLeft + newValue)
					this.relative_x = Math.floor(newValue)
				}
			},
			get: function() {
				if(this.absolute) {
					return this.absolute_x       
				} else {
					this.relative_x
				}
			}
		})

		Object.defineProperty(this, 'y', {
			set: function(newValue) {   
				if(this.absolute) {
					this.absolute_y = Math.floor(newValue)
					this.relative_y = Math.floor(newValue - Framework.Game.getCanvas().offsetTop)      
				} else {
					this.absolute_y = Math.floor(Framework.Game.getCanvas().offsetTop + newValue)
					this.relative_y = Math.floor(newValue)
				}  
			},
			get: function() {
				if(this.absolute) {
					return this.absolute_y       
				} else {
					this.relative_y
				}
			}
		})
	}
}