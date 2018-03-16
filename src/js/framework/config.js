// By Raccoon
// include namespace
var Framework = (function (Framework) {
	'use strict'
	Framework.Config = function () {
		this.fps = 60;
		this.canvasWidth = 1600;  // 2017.02.20, 電流急急棒
		this.canvasHeight = 900;  // 2017.02.20, 電流急急棒
//		this.canvasWidth = 1350;
//		this.canvasHeight = 700;
//		this.canvasWidth =  640;
//		this.canvasHeight = 480;
		this.isBackwardCompatiable = false;
		this.isOptimize = false;  // 2017.02.20, from V3.1.1
		this.isMouseMoveRecorded = false;
	};
	return Framework;
})(Framework || {});
