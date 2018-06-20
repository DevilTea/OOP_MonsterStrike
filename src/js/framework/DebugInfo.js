'use strict'
class Log {
    constructor(debugInfo, showDebugInfo) {
        this.debugInfo = debugInfo
        this.showDebugInfo = showDebugInfo
    }
    
    prepareLog(state, str) {
        let newLog = document.createElement('p')
        newLog.style.margin = '0'
        newLog.style.minWidth = '600px'    //In order to fill the background color
        newLog.style.padding = '2px 0 2px 5px'
        let logTxt = document.createTextNode('[' + (new Date()).format('hh:mm:ss') + '] ' + '[' + state + '] ' + str)
        newLog.appendChild(logTxt)
        this.debugInfo.appendChild(newLog)
        this.debugInfo.scrollTop = this.debugInfo.scrollHeight
        return newLog
    }
    
    info(str) {
        this.prepareLog('Info', str).style.backgroundColor = '#80ffff'
    }
    
    error(str) {
        this.prepareLog('Error', str).style.backgroundColor = '#ff8080'
    }

    warning(str) {
        this.prepareLog('Warning', str).style.backgroundColor = '#ffff80'
    }

    console(str) {
        if (this.showDebugInfo) {
            console.log(str)
        }
    }
}

Framework.DebugInfo = new (class DebugInfo {
    constructor() {
        this.showDebugInfo = true
        this.containerAppended = false
        this.debugInfo = document.createElement('div')
        this.debugInfo.style.width = '500px'
        this.debugInfo.style.height = '200px'
        this.debugInfo.style.backgroundColor = '#f0f0f0'
        this.debugInfo.style.position = 'absolute'
        this.debugInfo.style.top = '10px'
        this.debugInfo.style.border = '1px solid #000'
        this.debugInfo.style.right = '10px'
        this.debugInfo.style.zIndex = '99999'
        this.debugInfo.style.overflowY = 'scroll'
        this.Log = new Log(this.debugInfo, this.showDebugInfo)
    }

    show(dom) {                
        
        this.debugInfo.style.visibility = 'visible'
        this.debugInfo.style.width = '500px'
        this.debugInfo.style.height = '200px'
        this.debugInfo.style.border = '1px solid #000'
        
        if(!this.containerAppended) {
            var container = dom || document.body
            container.appendChild(this.debugInfo)
        }
    }

    hide(dom) {
        const zeroPxStr = '0px';
        this.debugInfo.style.visibility = 'hidden'
        this.debugInfo.style.border = zeroPxStr
        this.debugInfo.style.width = zeroPxStr
        this.debugInfo.style.height = zeroPxStr
    }
})()