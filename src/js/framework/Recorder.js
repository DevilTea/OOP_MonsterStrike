'use strict'
Framework.Recorder = class Recorder {
	constructor() {
		this.record = []
		this.waitCounter = 0
		this.recordDiv
		this.isRecording = false
		this.isPause = false
	}
	
	resetWaitCounter() {  // 2017.11, ¤£¤Ówork
		this.waitCounter = 0
	}
	
	getWaitCounter() {  // 2017.12
		return this.waitCounter
	}

	inputCommand(command) {
		this.recordWait()
		this.record.push(command)
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;' + this.record[this.record.length - 1] + '<br>')
	}
	
	start()	{
		this.waitCounter = 0
		if(this.isRecording === false) {
			this.isRecording = true
			this.isPause = false
			var recordString = 'QUnit.asyncTest( "Test Script", function( assert ) {<br>'
			this.addDivString(recordString)
		} else {
			if(this.isPause) {
				this.isPause = false
			}
		}
	}
	
	pause()	{
		if(this.isRecording) {
			this.recordWait()  // 2016.10.27 added by cbh
			this.isPause = true
		}
	}
	
	stop() {
		if(this.isRecording) {
			this.isRecording = false
			this.isPause = false
			this.addDivString("});<br>")
		}
	}

	addDivString(addString) {
		document.getElementById("record_div").innerHTML += addString
	}

	update() {
		this.waitCounter++
	}
	
	click(e) {
		this.recordWait()
		this.record.push("Framework.replayer.mouseClick("+e.x+","+e.y+");")  // 2017.04.18 marked
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	}
	
	mousedown(e) {
		this.recordWait()
		this.record.push("Framework.replayer.mouseDown("+e.x+","+e.y+");")  // 2017.02.21 added
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	}
	
	mouseup(e) {
		this.recordWait()
		this.record.push("Framework.replayer.mouseUp("+e.x+","+e.y+");")    // 2017.02.21 added
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	}
	
	mousemove(e) {
		this.recordWait()
		this.record.push("Framework.replayer.mouseMove("+e.x+","+e.y+");")
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	}
	
	//keyboard Event
	keydown(e) {
		this.recordWait()
		this.record.push("Framework.replayer.keyDown('"+e.key+"');")
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	};
	
	keyup(e) {
		this.recordWait()
		this.record.push("Framework.replayer.keyUp('"+e.key+"');")
		this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
		this.scrollToBottom()
	}
	
	keypress(e) {
		this.recordWait()
	}

	recordWait() {
		if(this.waitCounter > 0) {
			this.waitCounter++
			this.record.push("Framework.replayer.waitFor("+this.waitCounter+");")
			this.addDivString('&nbsp;&nbsp;&nbsp;&nbsp;'+this.record[this.record.length-1] + '<br>')
			this.waitCounter = 0
		}
	}

	callFunction(inForm, agrs) {
		// TestCount++;
		// if (IsFunction(inForm.SetRecordData)) {
		// } else {
		//     if (TestCount <= 10) {
		//         setTimeout(function() { CallFunction(inForm, agrs); }, 1000);
		//     } else {
		//         alert("©ñ±ó");
		//     }
		// }
		inForm.SetRecordData(agrs)
	}
	
	save() {
		let recordString = 'QUnit.asyncTest( "Test Script", function( assert ) {<br>'
		for(let i = 0; i < this.record.length; i++)
		{
			recordString += '&nbsp;&nbsp;&nbsp;&nbsp;' + this.record[i] + '<br>'
		}
		recordString += '});<br>'
		let form = window.open("record.html", "form2", "_blank", "")
		setTimeout(function() {
			this.callFunction(form, recordString)
		}, 1000)

		//document.getElementById('recordscript').innerHTML = recordString
	}

	insertCommand(command) {
		this.recordWait()
		this.record.push(command)
	}

	scrollToBottom() {
		document.getElementById("record_div").scrollTop = document.getElementById("record_div").scrollHeight
	}
}