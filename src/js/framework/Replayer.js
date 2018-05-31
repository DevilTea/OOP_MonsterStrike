// By Raccoon
// include namespace
'use strict'
class ReplayItem {
	constructor() {
		this.replayFunction
		this.infoString
		this.failString
		this.x
		this.y
		this.isDone = false
	}
	
	execute() {
		try {
			// console.log(this.infoString)
			this.replayFunction()
		} catch(err) {
			// console.error('Action Fail:' + this.infoString + "\n" + err)
			// Framework.Game.pause()
		}
		this.isDone = true
	}
}

class AssertionItem {
	constructor() {
		this.targetValue
		this.assertValue
		this.infoString
		this.failString
		this.delta
	}

	execute() {
		let isEqual;
		let assertMessage
		
		if(Framework.Util.isUndefined(this.delta))
		{
			this.delta = 0
		}
		if(Framework.Util.isNumber(this.assertValue))
		{
			isEqual = this.assertValue - this.delta <= evaluate(this.targetValue) && evaluate(this.targetValue) <= this.assertValue + this.delta
		}else
		{
			isEqual = this.assertValue === evaluate(this.targetValue)
		}
		if (isEqual) {
			assertMessage = "Passed!"
			QUnit.assert.ok(isEqual, assertMessage )
		} else {
			assertMessage = 'Assert Fail! targetValue: ' + evaluate(this.targetValue) + ', assertValue: ' + this.assertValue
			assertMessage += '\nFail at ' + this.infoString
			QUnit.assert.ok(isEqual, assertMessage )
			//Framework.Game.pause()
		}
	}
}

Framework.Replayer = new (class Replayer {
	/**
	 * 自動測試重播系統
	 *
	 * @class Replayer
	 *
	 */

	constructor() {
		this.cycleCount = 0
		this.replayList = []
		this.isStart = false
		this.isWaiting = false
		this.pollingFunction
		this.waitingCounter = 0
		this.waitingCondition
		this.isReady = false
		this.isTestEnd = false
		this.isContinue = false
		this.waitForTimeoutSecond = 30
		this.waitForTimeout = 600
		this.isQUnitStart = true
		this.hasExecuteCommand = false
		this.useGoToLevel = false
		this.GREEN_LOG = "color: #6cbd45"
	}
	
	setGameReady() {
		if(this.useGoToLevel) {
			this.useGoToLevel = false
			this.ready()
		} else {
			this.startQUnit()
			this.ready()
		}
	}

	ready(scriptInfo) {
		//console.log('%c ----------------------------',this.GREEN_LOG)
		//console.log('%c Run Test:' + scriptInfo.name,this.GREEN_LOG)
		//if (! this.isReady) { // 2018.01.03 從下方搬上來, 無效
			//Framework.Game.resume() // <-- 追看看會不會造成cycleCount的差異
		//}
		this.isReady = true
		this.isTestEnd = false
		//Framework.Game.resume() // <-- 追看看會不會造成cycleCount的差異
	}

	stopReplay() {
		this.cycleCount = 0
		this.replayList = []
		this.isReady = false
		this.isTestEnd = true
		Framework.Game.pause()
		console.error('Test Stop')
	}
	
	update() {
		if(this.isReady) {  // <- 會不會跟這裡有關? Game.start().runFunction() (636) call Framework.Replayer.setGameReady();
			this.cycleCount++
			//console.log("Cycle count = " + this.cycleCount)
			if(this.isWaiting == false) {
				if(this.replayList.length > 0) {
					this.hasExecuteCommand = true
					this.executeCommand()
				} else {
					if(!this.isTestEnd) {
						if(this.hasExecuteCommand) {
							console.log('%c Test Case Success',this.GREEN_LOG)
							console.log('%c ----------------------------',this.GREEN_LOG)
							//Framework.Game.pause()
							this.isTestEnd = true
							this.hasExecuteCommand = false
							QUnit.start()
						}
					}
				}
			} else {
				this.waitLoop()
			}
			// if (this.replayList.length > 0) {
			// 	if (this.isWaiting == false) {
			// 		this.replayList[0].execute();
			// 		this.replayList.shift();
			// 	} else {
			// 		this.waitLoop();
			// 	}
			// }else
			// {
			// 	if(!this.isTestEnd){
			// 		console.log('%c Test Case Success',this.GREEN_LOG);
			// 		console.log('%c ----------------------------',this.GREEN_LOG);
			// 		Framework.Game.pause();
			// 		this.isTestEnd = true;
			// 	}
			// }
		}
	}

	resetCycleCount() {
		this.cycleCount = 0
	}

	getCycleCount() {
		return this.cycleCount
	}

	resetWaitingCounter() {
		this.waitingCounter = 0
	}

	getWaitingCounter() {
		return this.waitingCounter
	}

	pause() {
		let item = new replayItem()
		item.replayFunction = function() {
			Framework.Game.pause()
			//console.log("Replay pause at " + this.cycleCount + "th cycle")
		}
		this.replayList.push(item)
	}

	resume() {
		let item = new replayItem()
		item.replayFunction = function() {
			Framework.Game.resume()
		}
		this.replayList.push(item)
	}

	assertEqual(targetValue, assertValue, delta) {
		let item = new assertionItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.targetValue = targetValue
		item.assertValue = assertValue
		item.delta = delta
		this.replayList.push(item)
	}

	evaluate(objectString) {
		return eval('Framework.Game._currentLevel.' + objectString)
	}

	executeCommand() {
		while(this.replayList.length > 0 && this.isWaiting == false && this.isReady == true && Framework.Game.isContinue == false) {
			this.replayList[0].execute()
			this.replayList.shift()
		}
	}

	waitFor(condition) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString

		item.replayFunction = function () {
			if(Framework.Util.isNumber(condition) === false) {
				//console.log("wait start")
				condition.setInfoString(splliString)
			}
			this.waitForTimeout = this.waitForTimeoutSecond * Framework.Game.getUpdateFPS()
			this.waitingCounter = 1
			//this.waitingCounter = 0  // 2017.12.07 modify
			//this.waitingCounter = -2  // 2017.12.28 modify
			this.isWaiting = true
			this.waitingCondition = condition
		}
		this.replayList.push(item)
	}

	waitLoop() {
		this.waitingCounter++
		if(Framework.Util.isNumber(this.waitingCondition)) {
			if(this.waitingCounter >= this.waitingCondition) {
				this.isWaiting = false
				executeCommand()
			}
		} else {
			if(this.waitingCondition.isFitCondition()) {
				this.isWaiting = false
				executeCommand()
			}
		}

		if(this.waitingCounter > this.waitForTimeout) {
			let timeoutMessage = 'Wait For Timeout' + this.waitingCondition
			if(Framework.Util.isNumber(this.waitingCondition) === false) {
				timeoutMessage += '\nFail at ' + this.waitingCondition.getInfoString()
			}
			QUnit.assert.ok(false, timeoutMessage)
			Framework.Game.pause()
		}
	}

	mouseClick(x, y) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : x,
				y : y
			}
			Framework.Game.click(e)
		}
		this.replayList.push(item)
	}
	
	mouseDown(x, y) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : x,
				y : y
			}
			Framework.Game.mousedown(e)
		}
		this.replayList.push(item)
	}
	
	mouseUp(x, y) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : x,
				y : y
			}
			Framework.Game.mouseup(e)    // 2017.02.21 added
		}
		this.replayList.push(item)
	}

	mouseClickProperty(positionString) {
		let item = new replayItem()

		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : evaluate(positionString).x,
				y : evaluate(positionString).y
			}
			//console.log("Click " + e.x + " " + e.y)
			Framework.Game.click(e)
		}
		this.replayList.push(item)
	}

	mouseClickObject(objectString) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : evaluate(objectString).position.x,
				y : evaluate(objectString).position.y
			}
			Framework.Game.click(e)
		}
		this.replayList.push(item)
	}

	mouseMove(x, y) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				x : x,
				y : y
			}
			Framework.Game.mousemove(e)
		}
		this.replayList.push(item)
	}
	
	mouseMove(key) {
		let item = new replayItem()

		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				key : key
			}
			Framework.Game.keydown(e)
		}
		this.replayList.push(item)
	}

	keyUp(key) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				key : key
			}
			Framework.Game.keyup(e)
		}
		this.replayList.push(item)
	}
	
	keyPress(key) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				key : key
			}
			Framework.Game.keypress(e)
		}
		this.replayList.push(item)
	}
	
	keyPressAndWait(key, cycle) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			let e = {
				key : key
			}
			keyDown(e)
			waitFor(cycle)
			keyUp(e)
		}
		this.replayList.push(item)
	}

	startQUnit() {
		if(!this.isQUnitStart) {
			this.isQUnitStart = true
			QUnit.start()
		}
	}
	
	stopQUnit()	{
		if(this.isQUnitStart) {
			this.isQUnitStart = false
			QUnit.stop()
		}
	}

	start() {// 從未被呼叫過?!
		stopQUnit()
		Framework.Game._isTestReady  = true
		Framework.Game._isReplay     = true  // 2017.12.13
		Framework.Game._currentLevel = null
		Framework.Game.start()
		console.log('set up test')
	}
	
	stop() {
		Framework.Game.stop()
		console.log('tear down test')
	}
	
	goToLevel(levelName) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			this.isReady = false
			this.useGoToLevel = true
			Framework.Game.goToLevel(levelName)
		}
		this.replayList.push(item)
	}

	executeFunction(functionName) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			evaluate(functionName)
		}
		this.replayList.push(item)
	}

	setFPS(fps) {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			Framework.Game.setUpdateFPS(fps)
			Framework.Game.setDrawFPS(fps)
		}
		this.replayList.push(item)
	}

	resetFPS() {
		let item = new replayItem()
		let callStack = new Error().stack
		let splliString = callStack.split("    at ")[2].split("(")[1].replace(")","")
		item.infoString = splliString
		item.replayFunction = function () {
			Framework.Game.setUpdateFPS(Framework.Game._config.fps)
			Framework.Game.setDrawFPS(Framework.Game._config.fps)
		}
		this.replayList.push(item)
	}
})