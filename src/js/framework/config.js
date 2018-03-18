// By Raccoon
// include namespace

'use strict'
Framework.Config =  {
	fps : 60,
	isBackwardCompatiable : false,
	isOptimize : false,  // 2017.02.20, from V3.1.1
	isMouseMoveRecorded : false,
	
	/*Fixed By NawaNawa */
	/*遊戲寬與高 在resizeCanvasAsRation=false才有用 */
	canvasWidth :  1080,
	canvasHeight : 1920,

	/*遊戲寬高比 在resizeCanvasAsRation=true有用 */
	/*EX 16:9 ...  */
	canvasWidthRation : 9,
	canvasHeightRation : 16,

	/*在視窗變化大小時自動resize */
	resizeCanvasAsRation : true
}