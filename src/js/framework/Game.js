'use strict'
Framework.Game = new (class Game {
	constructor() {
		autoBind(this)
		this.config = Framework.Config
		this.fps = this.config.fps
		this.canvasWidth = this.config.canvasWidth
		this.canvasHeight = this.config.canvasHeight
		this.isBackwardCompatible = this.config.isBackwardCompatible
		this.widthRatio = 1
		this.heightRatio = 1
		this.isFullScreen = false
		this.isRecording = false
		this.isRecordMode = isRecordMode
		this.isTestMode = isTestMode
		this.isTestReady = false
		this.isReplay = false
		this.isContinue = false
		this.isInit = false
		this.isRunning = false
		this.fpsContext = undefined
		this.fpsAnalysis = new Framework.FpsAnalysis()
		this.drawfpsAnalysis = new Framework.FpsAnalysis()
		this.runInstance = undefined
		this.levels = []
		this.testScripts = []
		this.currentLevel = undefined
		this.context = null
		this.currentTestScript = undefined
		this.currentReplay = undefined
		this.ideaWidth = this.config.canvasWidthRatio || 9
		this.ideaHeight = this.config.canvasHeightRatio || 16
		this.timelist = []
		this.record = new Framework.Recorder()
		this.tempUpdate = function() {}
		this.tempDraw = function(context) {}
		this.stopLoop = this.stopAnimationFrame
		//this.stopLoop = this.stopInterval
		
		this.mainContainer = document.createElement('div')
		this.mainContainer.setAttribute('id', 'main-container')
		$(this.mainContainer).css({backgroundColor: '#000000', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'})
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('id', 'game-canvas')
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
		$(this.canvas).css({backgroundColor: '#000000'})
		this.context = this.canvas.getContext('2d')
		this.mainContainer.appendChild(this.canvas)
	}
	
	recordStart() {
		if(document.getElementById("start_btn").getAttribute("enable") == "true") {
			if(this.isRecordMode) {
				this.isRecording = true
				document.getElementById("start_btn").setAttribute("enable", "false")
				document.getElementById("pause_btn").setAttribute("enable", "true")
				document.getElementById("stop_btn").setAttribute("enable", "true")
				document.getElementById("type_btn").setAttribute("enable", "true")
				document.getElementById("replay_btn").setAttribute("enable", "true")
				document.getElementById("letiable_btn").setAttribute("enable", "false")
				this.btnEnable()
				this.record.start()
				this.resume()
			}
			// ↓如果在replay mode下按了 Record btn, 應該要停止後續的replay動作, 同時放棄後續的腳本, 重新錄製新的腳本才對吧!
			// 試試在這裡把isReplay設為false, 看看 updateFunc() 能不能過.
			// 2017.12.13 : 在Recording mode下replay, Record.waitCounter 和 Replay._waitingCounter 似乎可以調齊了,
			// 但在 _isTestMode = true 下Replay, 仍然快一個cycle, 
			// to do  : 1. 錄製時, assertion game.cycleCount, 2. dump cyclecount 來比較
			if(this.isReplay) {
				this.isReplay  = false // 2017.12.13 增加
				this.isContinue = true  // <-- 只有在 Replay.executeCommend()裡被用到一次
				this.isRecordMode = true
				document.getElementById("start_btn").setAttribute("enable", "false")
				document.getElementById("pause_btn").setAttribute("enable", "true")
				document.getElementById("stop_btn").setAttribute("enable", "true")
				document.getElementById("type_btn").setAttribute("enable", "true")
				document.getElementById("replay_btn").setAttribute("enable", "true")
				document.getElementById("letiable_btn").setAttribute("enable", "false")
				this.btnEnable()
			}
		}
	}
	
	recordPause() {
		if(document.getElementById("pause_btn").getAttribute("enable") == "true") {
			if(this.isRecordMode) {
				this.isRecording = false
				document.getElementById("start_btn").setAttribute("enable", "true")
				document.getElementById("pause_btn").setAttribute("enable", "false")
				document.getElementById("stop_btn").setAttribute("enable", "true")
				document.getElementById("type_btn").setAttribute("enable", "true")
				document.getElementById("replay_btn").setAttribute("enable", "false")
				document.getElementById("letiable_btn").setAttribute("enable", "true")
				this.btnEnable()
				this.record.pause()
				this.pause()
			}
		}
	}
	
	recordStop() {
		if (document.getElementById("stop_btn").getAttribute("enable") == "true") {
			if (this.isRecordMode) {
				this.isRecording = false;
				document.getElementById("start_btn").setAttribute("enable", "false");
				document.getElementById("pause_btn").setAttribute("enable", "false");
				document.getElementById("stop_btn").setAttribute("enable", "false");
				document.getElementById("type_btn").setAttribute("enable", "false");
				document.getElementById("replay_btn").setAttribute("enable", "true");
				document.getElementById("letiable_btn").setAttribute("enable", "false");
				this.btnEnable();
				this.record.stop();
			}
		}
	}
	
	recordInput(){
		if (document.getElementById("type_btn").getAttribute("enable") == "true") {
			let command = prompt("Please enter comment", "");

			if (command != null) {
				this.record.inputCommand("//"+command);
			}
		}	
	}
	
	recordReplay() {
		if(document.getElementById("replay_btn").getAttribute("enable") == "true") {
			this.isReplay = true
			this.teardown()
			this.currentLevel = null
			this.isRecordMode = false
			this.isTestMode = true
			this.record.isRecording = false  // 為了讓 Record.start() 進入記錄 recordString 的區塊
			this.isContinue = false
			Framework.Replayer.resetCycleCount()
			Framework.Replayer.resetWaitingCounter()
			let replayScript = document.getElementById("record_div").innerText
			document.getElementById("record_div").innerText = ""
		
			this.getReplayScript(replayScript)
			this.record.start()
			this.isRecording = true
			this.start()
			//this.isRecording = true
			if(document.getElementById("letiable_list") != null) {
				let div = document.getElementById("letiable_list")
				div.parentNode.removeChild(div)
			}
			document.getElementById("start_btn").setAttribute("enable", "true")
			document.getElementById("pause_btn").setAttribute("enable", "false")
			document.getElementById("stop_btn").setAttribute("enable", "false")
			document.getElementById("type_btn").setAttribute("enable", "true")
			document.getElementById("replay_btn").setAttribute("enable", "false")
			document.getElementById("letiable_btn").setAttribute("enable", "false")
			this.btnEnable()
		}
	}
	
	getReplayScript(script) {
		script = script.replace(/\n/g, "")
		let start = script.indexOf("{", 0)+1
		let end = script.indexOf("}", 0)
		if(end === -1)
			end = script.length
		let mainScript = script.substring(start, end)
		mainScript = mainScript.split(";")
		for(i=0; i<mainScript.length; i++){
			mainScript[i] = mainScript[i].replace("\u00a0\u00a0\u00a0\u00a0", "")
			// if(mainScript[i].indexOf("//", 0) === -1){
			// comment 的部分被直接pass掉, 但是仍然會耗一個cycle, asserting 應該也是, 要怎麼補回來?
			if(mainScript[i].indexOf("replay.assertEqual")!=0) {
				eval(mainScript[i])  // <- 接著會進入 Replay.waitFor() why?
			}
			// }
		}
	}
	
	showletiable() {
		let maindiv = document.getElementById("main")
		if((document.getElementById("letiable_list") == null) &&
			(document.getElementById("letiable_btn").getAttribute("enable") == "true")) {
			let letiableDiv = document.createElement('div')
			letiableDiv.id = 'letiable_list'
			letiableDiv.style.cssText = "width:100%;height:30%;background-color:#d3e0e6;overflow:auto;font-size:20;"
			maindiv.appendChild(letiableDiv)
		} else {
			let div = document.getElementById("letiable_list")
			if (div != null) {
				div.parentNode.removeChild(div)
			}
		}
		listMember("Framework.Game.currentLevel", "&nbsp", "letiable_list")
	}
	
	btnMouseOver(button){
		if(button.getAttribute('enable') === "true") {
			if(button.id == "start_btn")
				button.src = "../../src/image/play_over.png"
			if(button.id == "pause_btn")
				button.src = "../../src/image/pause_over.png"
			if(button.id == "stop_btn")
				button.src = "../../src/image/stop_over.png"
			if(button.id == "type_btn")
				button.src = "../../src/image/addComment_over.png"
			if(button.id == "replay_btn")
				button.src = "../../src/image/replay_over.png"
			if(button.id == "letiable_btn")
				button.src = "../../src/image/letiable_over.png"
		}
	}
	
	btnMouseOut(button) {
		if(button.getAttribute('enable') === "true") {
			if(button.id == "start_btn")
				button.src = "../../src/image/play.png"
			if(button.id == "pause_btn")
				button.src = "../../src/image/pause.png"
			if(button.id == "stop_btn")
				button.src = "../../src/image/stop.png"
			if(button.id == "type_btn")
				button.src = "../../src/image/addComment.png"
			if(button.id == "replay_btn")
				button.src = "../../src/image/replay.png"
			if(button.id == "letiable_btn")
				button.src = "../../src/image/letiable.png"
		}
	}
	
	btnEnable() {
		if(document.getElementById("start_btn").getAttribute("enable") === "true")
			document.getElementById("start_btn").src = "../../src/image/play.png"
		else
			document.getElementById("start_btn").src = "../../src/image/play_disable.png"
		
		if(document.getElementById("pause_btn").getAttribute("enable") === "true")
			document.getElementById("pause_btn").src = "../../src/image/pause.png"
		else
			document.getElementById("pause_btn").src = "../../src/image/pause_disable.png"
		
		if(document.getElementById("stop_btn").getAttribute("enable") === "true")
			document.getElementById("stop_btn").src = "../../src/image/stop.png"
		else
			document.getElementById("stop_btn").src = "../../src/image/stop_disable.png"
		
		if(document.getElementById("type_btn").getAttribute("enable") === "true")
			document.getElementById("type_btn").src = "../../src/image/addComment.png"
		else
			document.getElementById("type_btn").src = "../../src/image/addComment_disable.png"
		
		if(document.getElementById("replay_btn").getAttribute("enable") === "true")
			document.getElementById("replay_btn").src = "../../src/image/replay.png"
		else
			document.getElementById("replay_btn").src = "../../src/image/replay_disable.png"
		
		if(document.getElementById("letiable_btn").getAttribute("enable") === "true")
			document.getElementById("letiable_btn").src = "../../src/image/letiable.png"
		else
			document.getElementById("letiable_btn").src = "../../src/image/letiable_disable.png"
	}
	
	click(e) {
		this.currentLevel.click(e)
		if(this.isRecording) {
			this.record.click(e)
		}
	}
	
	mousedown(e) {
		this.currentLevel.mousedown(e)
		if(this.isRecording) {
			this.record.mousedown(e)
		}
	}
	
	mouseup(e) {
		this.currentLevel.mouseup(e)
		if(this.isRecording) {
			this.record.mouseup(e)
		}
	}
	
	mousemove(e) {
		this.currentLevel.mousemove(e)
		if(this.isRecording) {
			this.record.mousemove(e)
		}
	}
	
	touchstart(e) {
		this.currentLevel.touchstart(e)
	}
	
	touchend(e) {
		this.currentLevel.touchend(e)
	}
	
	touchmove(e) {
		this.currentLevel.touchmove(e)
	}

	keydown(e) {
		this.currentLevel.keydown(e)
		if(this.isRecording) {
			this.record.keydown(e)
		}
	}
	
	keyup(e) {
		this.currentLevel.keyup(e)
		if(this.isRecording) {
			this.record.keyup(e)
		}
	}
	
	keypress(e) {
		this.currentLevel.keypress(e)
		if(this.isRecording) {
			this.record.keypress(e)
		}
	}
	
	initializeProgressResource() {
		this.currentLevel.initializeProgressResource()
	}
	
	load() {
		this.currentLevel.load()
		if(this.isBackwardCompatiable) {
			this.currentLevel.initialize()
		}
	}
	
	loadingProgress(context) {
		this.currentLevel.loadingProgress(context, { request: Framework.ResourceManager.getRequestCount(), response: Framework.ResourceManager.getResponseCount(), percent: Framework.ResourceManager.getFinishedRequestPercent()})
		if(this.isBackwardCompatiable) {
			this.initializeProgressResource()
		}
	}

	initialize() {
		this.currentLevel.initialize()
		this.initializeTestScript(this.currentLevel)
	}
	
	initializeTestScript(level) {
		let levelName = this.findLevelNameByLevel(level)
		for(let i= 0,l=this.testScripts.length;i<l;i++) {
			if(this.testScripts[i].targetLevel === levelName) {
				Framework.Replayer.ready(this.testScripts[i])
				return
			}
		}
	}
	
	update() {
		this.currentLevel.update()
	}
	
	draw() {					
		this.currentLevel.draw()
	}

	teardown() {
		this.currentLevel.autodelete()
		this.isInit = false
	}

	stop() {
		this.pause()
		this.teardown()
	}
	
	getCanvasTopLeft() {
		return new Framework.Point(this.canvas.offsetLeft, this.canvas.offsetTop)
	}
	
	getCanvasWidth() {
		return this.canvas.width
	}

	getCanvasHeight() {
		return this.canvas.height
	}

	findLevel(name) {
		let result = Framework.Util.findValueByKey(this.levels,name)
		if(result === null) {
			return null
		} else {
			return result.level
		}
	}

	findScript(name) {
		let result = Framework.Util.findValueByKey(this.testScripts,name)

		if(result === null) {
			return null
		} else {
			return result.script
		}
	}

	findLevelNameByLevel(level) {
		for(let i = 0, l = this.levels.length; i < l; i++) {
			if(this.levels[i].level === level) {
				return this.levels[i].name
			}
		}
	}
	
	addNewLevel(leveldata) {
		for(let i in leveldata) {
			if(leveldata.hasOwnProperty(i)) {
				if(Framework.Util.isNull(this.findLevel(i))) {
					this.levels.push({name : i , level : leveldata[i]})
				} else {
					/*Framework.DebugInfo.Log.error('Game : 關卡名稱不能重複')
					throw new Error('Game: already has same level name')*/
					this.changeLevelData(i, leveldata[i])
				}
			}
		}
	}

	changeLevelData(levelName, levelObj) {
		let toChange
		this.levels.forEach((level, index) => {
			if(level.name === levelName) {
				toChange = index
			}
		})
		delete this.levels[toChange]
		this.levels[toChange] = {name : levelName , level : levelObj}
	}

	addNewTestScript(levelName,scriptName,scriptInstance) {
		/*let levelName = levelName
		let scriptName = scriptName
		let scriptInstance = scriptInstance*/
		if(Framework.Util.isNull(this.findScript(scriptName))) {
			this.testScripts.push({targetLevel: levelName,name : scriptName , script : scriptInstance})
		} else {
			Framework.DebugInfo.Log.error('Game : Script名稱不能重複')
			throw new Error('Game: already has same script name')
		}
	}
	
	goToLevel(levelName) {
		this.pause()
		this.teardown()
		this.currentLevel = this.findLevel(levelName)
		Framework.Replayer.resetCycleCount()
		if(Framework.Util.isUndefined(this.currentLevel)) {
			Framework.DebugInfo.Log.error('Game : 找不到關卡')
			throw new Error('Game : levelName not found.')
		}
		if(this.isRecordMode) {
			this.record.inputCommand("// Change Level :" + levelName + ";")
		}
		this.start()
	}
	
	reLoadLevel() {
		this.pause()
		this.teardown()
		Framework.Replayer.resetCycleCount()
		this.start()
	}

	goToNextLevel() {
		this.pause()
		this.teardown()
		let flag = false
		Framework.Replayer.resetCycleCount()
		Framework.Replayer.resetWaitingCounter()
		for(let i in this.levels) {
			if(flag) {
				this.currentLevel = this.levels[i].level
				if(this.isRecordMode)
				{
					let levelName = this.findLevelNameByLevel(this.currentLevel)
					this.record.inputCommand("// Change Level :" + levelName + ";")
				}
				this.start()
				return
			}
			if(this.levels[i].level === this.currentLevel) {
				flag = true
			}
		}
		Framework.DebugInfo.Log.error('Game : 無下一關');
		throw new Error('Game : can\'t goto next level.');
	}
	
	goToPreviousLevel(){
		this.pause()
		this.teardown()
		let flag = false
		let prev = undefined
		Framework.Replayer.resetCycleCount()
		for(let i in this.levels) {
			if(this.levels[i].level === this.currentLevel) {
				if(!Framework.Util.isUndefined(prev)) {
					this.currentLevel = prev
					if(this.isRecordMode) {
						let levelName = this.findLevelNameByLevel(this.currentLevel)
						this.record.inputCommand("// Change Level To : " + levelName + ";")
					}
					this.start()
					return
				}
				break
			}
			prev = this.levels[i].level
		}
		Framework.DebugInfo.Log.error('Game : 無前一關')
		throw new Error('Game : can\'t goto previous level.')
	}
	
	start() {
		if(!this.isReplay) {
			if(this.isTestMode && this.isTestReady === false) {
				return
			}
		}
		if(Framework.Util.isUndefined(this.currentLevel) || Framework.Util.isNull(this.currentLevel)) {
			this.currentLevel = this.levels[0].level
		}
		if(!this.isInit) {
			this.resizeEvent()
			document.body.appendChild(this.mainContainer)
			window.addEventListener("resize", this.resizeEvent, false)
		}
		this.initializeProgressResource()
		let runFunction = (function() {
			this.isRunning = true
			this.pause()
			this.initialize()
			this.draw = this.currentLevel.draw.bind(this.currentLevel)
			this.update = this.currentLevel.update.bind(this.currentLevel)
			Framework.Replayer.setGameReady()
			this.run()
		}).bind(this)
		let	initFunction = (function() {
			if(Framework.ResourceManager.getRequestCount() !==  Framework.ResourceManager.getResponseCount()) {
				return
			}
			this.isInit = true;		
			this.draw = this.loadingProgress
			this.update = function() {}
			this.run()
			this.isRunning = false
			this.load()
			if(Framework.ResourceManager.getRequestCount() ===  Framework.ResourceManager.getResponseCount()) {
				runFunction()
			}
		}).bind(this)
		let a = (function() {			
			if(!this.isInit) {
				initFunction()
				return
			}
			if(!this.isRunning) {
				runFunction()
			}
		}).bind(this)
		Framework.ResourceManager.setSubjectFunction(a)
		initFunction()
		Framework.TouchManager.subject = this.currentLevel
		Framework.TouchManager.userTouchstartEvent = this.touchstart
		Framework.TouchManager.userTouchendEvent = this.touchend
		Framework.TouchManager.userTouchmoveEvent = this.touchmove			

		Framework.MouseManager.userClickEvent = ((e) => this.click(e))
		Framework.MouseManager.userMouseDownEvent = ((e) => this.mousedown(e))
		Framework.MouseManager.userMouseUpEvent = ((e) => this.mouseup(e))
		Framework.MouseManager.userMouseMoveEvent = ((e) => this.mousemove(e))
		//Framework.MouseManager.userContextMenuEvent = this.contextmenu;

		Framework.KeyBoardManager.subject = this.currentLevel
		Framework.KeyBoardManager.userKeyupEvent = this.keyup
		Framework.KeyBoardManager.userKeydownEvent = this.keydown
	}
	
	run() {
		let nowFunc = function() { return (new Date()).getTime(); }	
		let updateTicks = 1000 / this.fps
		let drawTicks = 1000 / this.fps
		let previousUpdateTime = nowFunc()
		let previousDrawTime = previousUpdateTime
		let now = previousDrawTime
		let nextGameTick = now
		let nextGameDrawTick = now
		this.skipTicks = Math.round(1000 / this.fps)
		let updateFunc = (function() {	
			now = nowFunc()
			if(now > nextGameTick) {
				this.fpsAnalysis.update()
				if(this.fpsContext) {
					this.fpsContext.innerHTML = 'update FPS:' + this.fpsAnalysis.getUpdateFPS() + '<br />draw FPS:' + this.drawfpsAnalysis.getUpdateFPS()
				}
				this.update()
				
				if(this.isRecording) {
					if((this.isReplay == false) || (Framework.Replayer.getWaitingCounter() > 0)) {  // ok, 但game的cycleCount還是不一致
					   this.record.update() // 哪裡會多做一次呢? 怎麼知道是 game 啟動時第一次的update嗎? 來跳過去?
											// 或者是如果同時也是 this.isReplay = true 的話, 看Replay.cycleCount若>0才允許record.update()?
					}
					//console.log("record update")  為了同步 Record的cycleCount?
				}
				if(this.isReplay) {
					Framework.Replayer.update()
				}
				nextGameTick += this.skipTicks
			}						
		}).bind(this)
		let drawFunc = (function() {
			if(now >= nextGameDrawTick) {					
				this.draw(this.context)
				this.drawfpsAnalysis.update()
				if(this.fpsContext) {
					this.fpsContext.innerHTML = 'update FPS:' + this.fpsAnalysis.getUpdateFPS() + '<br />draw FPS:' + this.drawfpsAnalysis.getUpdateFPS()
				}
				nextGameDrawTick += this.skipTicks
			}
		}).bind(this)
		let gameLoopFunc = (function() {
			/*let currentUpdate = Date.now()
			if(this.lastUpdate) {
				console.log(currentUpdate - this.lastUpdate + ' ms')
			}
			this.lastUpdate = currentUpdate*/
			let preDraw = Date.now()
			updateFunc()
			drawFunc()

			let drawTime = Date.now() - preDraw
			if(drawTime > 5) {
				this.timelist.push(drawTime)
			}
			if(this.timelist.length >= 30)
			{
				let average = this.countAverage(this.timelist)
				this.timelist = []
			}						
		}).bind(this)
		this.isRunning = true
		this.runAnimationFrame(gameLoopFunc)
		//this.runInterval(gameLoopFunc)
	}
	
	countAverage(list) {
		let sum = 0
		for(let i = 0; i < list.length; i++){
			sum += list[i]
		}
		return sum / list.length
	}

	stopInterval() {
		clearInterval(this.runInstance)
	}

	stopAnimationFrame() {
		cancelAnimationFrame(this.runInstance)
	}
	
	runAnimationFrame(gameLoopFunc) {
		window.requestAnimationFrame = window.requestAnimationFrame || 
					window.mozRequestAnimationFrame || 
					window.webkitRequestAnimationFrame || 
					window.msRequestAnimationFrame
		let _run = (function () {
			gameLoopFunc()
			if(this.isRunning){
				this.runInstance = requestAnimationFrame(_run)
			}
		}).bind(this)
		_run()
		this.stopLoop = this.stopAnimationFrame
	}			

	runInterval(gameLoopFunc) {
		let drawTicks = 1000 / this.fps
		let run = gameLoopFunc

		this.runInstance = setInterval(gameLoopFunc, drawTicks)
		this.stopLoop = this.stopInterval
	}

	pause() {
		if(this.isRunning) {
			this.stopLoop()
			this.runInstance = null
			this.isRunning = false
		}
	}

	resume() {
		if(!this.isRunning) {
			this.run()
		}
	}
	
	setUpdateFPS(fps) {
		if(fps > 60) {
			Framework.DebugInfo.Log.warring('FPS must be smaller than 60.')
			throw 'FPS must be smaller than 60.'
			fps = 60
		}
		this.skipTicks = Math.round(1000 / this.fps)
		this.fps = fps
		this.pause()
		this.run()
	}

	getUpdateFPS() {
		return this.fps
	}

	setDrawFPS(fps) {
		if(fps > 60) {
			Framework.DebugInfo.Log.warring('FPS must be smaller than 60.')
			throw 'FPS must be smaller than 60.'
			fps = 60
		}
		this.fps = fps
		this.pause()
		this.run()
	}

	getDrawFPS() {
		return this.fps
	}

	setCanvas(canvas) {
		if(canvas) {
			this.canvas = null
			this.context = null
			this.canvas = canvas
			this.canvasContainer.innerHTML = ''
			this.canvasContainer.appendChild(this.canvas)
			this.context = this.canvas.getContext('2d')
		}
	}

	setContext(context) {
		if(!Framework.Util.isUndefined(context)) {
			this.context = null
			this.canvas = null
			this.context = context
		} else {
			Framework.DebugInfo.Log.error('Game SetContext Error')
		}
	}

	getContext() {
		return this.context
	}
	
	fullScreen(ele) {
		var ele = ele || this.mainContainer			
		if(!ele.fullscreenElement &&    // alternative standard method
		  !ele.mozFullScreenElement && 
		  !ele.webkitFullscreenElement && 
		  !ele.msFullscreenElement ) {  // current working methods
			if(ele.requestFullscreen) {
			  ele.requestFullscreen()
			} else if(ele.msRequestFullscreen) {
			  ele.msRequestFullscreen()
			} else if(ele.mozRequestFullScreen) {
			  ele.mozRequestFullScreen()
			} else if(ele.webkitRequestFullscreen) {
			  ele.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
			}		
		} 
	}
	
	exitFullScreen() {	
		if (document.exitFullscreen) {
		  document.exitFullscreen()
		} else if (document.msExitFullscreen) {
		  document.msExitFullscreen()
		} else if (document.mozCancelFullScreen) {
		  document.mozCancelFullScreen()
		} else if (document.webkitExitFullscreen) {
		  document.webkitExitFullscreen()
		}
	}
	
	resizeEvent() {

		let base = 0
		let baseWidth = window.innerWidth / this.ideaWidth
		let baseHeight = window.innerHeight / this.ideaHeight
		let scaledWidth = 0
		let scaledHeight = 0
		if(this.isTestMode || this.isRecordMode) {
			baseWidth = window.innerWidth * 0.7 / this.ideaWidth
			baseHeight = window.innerHeight * 0.7 / this.ideaHeight
		}
		if(baseWidth < baseHeight) {
			base = baseWidth
		} else {
			base = baseHeight
		}

		scaledWidth = base * this.ideaWidth
		scaledHeight = base * this.ideaHeight
		this.widthRatio = scaledWidth / this.canvas.width
		this.heightRatio = scaledHeight / this.canvas.height
		this.canvas.style.width = scaledWidth + 'px'
		this.canvas.style.height = scaledHeight + 'px'
		Framework.HtmlElementUI.resize()
		if(this.currentLevel.map) {
			this.currentLevel.matter.render.canvas.style.width = scaledWidth + 'px'
			this.currentLevel.matter.render.canvas.style.height = scaledHeight + 'px'
		}
	}
	
	pushGameObj(ele) {
		this.currentLevel.allGameElement.push(ele)
	}

	showAllElement() {
		this.currentLevel.showAllElement()
	}
})

let listMember = function(main, space, divId) {
	if(document.getElementById(divId+"_check")){
		if(document.getElementById(divId+"_check").src.match("../../src/image/arrow_over.png")){
			document.getElementById(divId+"_check").src = "../../src/image/arrow.png";
		}else{
			document.getElementById(divId+"_check").src = "../../src/image/arrow_over.png";
		}
	}
	var div = document.getElementById(divId);
//	var length = div.childNodes.length;
	var length = 0;
	if ((div != null) && (div.childNodes != null)) {
        length = div.childNodes.length;
    }
	if(length > 4){
		for(var i=4; i<length; i++){
			div.removeChild(div.childNodes[4]);
		}
	}
	else{
		for(key in eval(main)){
			//not function
			try{
				if(eval(main)[key].toString().indexOf("function", 0) === -1){
					if(key != "rootScene" && key != "autoDelete" && key != "_firstDraw" && key != "_allGameElement"){
						var varDiv = document.createElement("div");
						varDiv.id = key;
						varDiv.setAttribute("vertical-align","baseline");
						var checkBox = document.createElement("img");
						checkBox.setAttribute("src","../../src/image/arrow.png");
						checkBox.setAttribute("width","5%");
						checkBox.setAttribute("id", key+"_check");
						if (isNaN(key)) {
							var func = 'listMember("'+main.toString()+'.'+ key.toString() +'", "'+space+"&nbsp&nbsp&nbsp"+'", "'+ key +'")';
						} else {
							var func = 'listMember("'+main.toString()+'['+ key.toString() +']", "'+space+"&nbsp&nbsp&nbsp"+'", "'+ key +'")';
						}
						checkBox.setAttribute("onclick", func);
						varDiv.innerHTML += space;
						varDiv.appendChild(checkBox);
						varDiv.innerHTML += key +"&nbsp&nbsp&nbsp";
						if(!isNaN(eval(main)[key])){
							var btn = document.createElement("input");
							btn.setAttribute("type","button");
							btn.value = "Assert";
							var func = 'addAssertion("'+main.toString()+'.'+ key.toString()+'","'+eval(main)[key]+'")'
							btn.setAttribute("onclick", func);
							varDiv.appendChild(btn);
						}
						varDiv.innerHTML += "<br>";
						div.appendChild(varDiv);
						// console.log(key + ": " + eval(main)[key] + "\n");
					}
				}
			}catch(e){
			
			}
		}
		space += "&nbsp&nbsp&nbsp";
	}
}

let addAssertion = function(assertTarget, assertValue){
	// var s = assertTarget.indexOf("Framework.Game._currentLevel.")
	assertTarget = assertTarget.substring(29, assertTarget.length);
	var recordDiv = document.getElementById("record_div");
	document.getElementById("record_div").innerHTML += '<p>&nbsp;&nbsp;&nbsp;&nbsp;replay.assertEqual("'+assertTarget+'", '+assertValue+');</p>';
}