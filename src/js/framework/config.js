// By Raccoon
// include namespace

'use strict'

Framework.Config = class Config {
	constructor() {
		this.fps = 60
		this.canvasWidth = 1600
		this.canvasHeight = 900
		this.isBackwardCompatiable = false
		this.isOptimize = false  // 2017.02.20, from V3.1.1
		this.isMouseMoveRecorded = false
	}
}