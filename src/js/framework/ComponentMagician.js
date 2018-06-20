Framework.ComponentMagician = class ComponentMagician {
    constructor(component) {
        autoBind(this)
        this.gameFps = Framework.Config.fps
        this.component = component
        this.effectQueue = []
        this.currentEffect
    }
    addEffect(effectObj, duration, callback, ...args) {
        let effect = {}
        effect.effectDelta = {}
        effect.remainingUpdateCount = Math.round(duration / 1000 * this.gameFps)
        Object.keys(effectObj).forEach((key) => {
            if(key !== 'position' && key !== 'scale' && key !== 'rotation' && key !== 'opacity' &&
                key !== 'begin_position' && key !== 'begin_scale' && key !== 'begin_rotation' && key !== 'begin_opacity') {
                throw new Error("目前僅接受position, scale, rotation, opacity的動畫效果")
            } else if(key === 'position' && key === 'scale' && key === 'rotation' && key === 'opacity' && typeof effectObj[key] !== typeof this.component[key]) {
                throw new Error("給予了錯誤型態的動畫參數")
            }
        })
        effect.finishStatus = effectObj
        effect.callback = callback
        effect.args = args
        this.effectQueue.push(effect)
    }
    update() {
        if(this.currentEffect === undefined) {
            if(this.effectQueue.length === 0) {
                return
            } else {
                this.currentEffect = this.effectQueue.shift()
                Object.keys(this.currentEffect.finishStatus).forEach((key) => {
                    if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                        this.component[key] = this.currentEffect.finishStatus['begin_' + key] !== undefined ? this.currentEffect.finishStatus['begin_' + key] : this.component[key]
                        if(key === 'rotation' || key === 'opacity') {
                            this.currentEffect.effectDelta[key] = (this.currentEffect.finishStatus[key] - this.component[key]) / this.currentEffect.remainingUpdateCount
                        } else {
                            this.currentEffect.effectDelta[key] = {}
                            this.currentEffect.effectDelta[key].x = (this.currentEffect.finishStatus[key].x - this.component[key].x) / this.currentEffect.remainingUpdateCount
                            this.currentEffect.effectDelta[key].y = (this.currentEffect.finishStatus[key].y - this.component[key].y) / this.currentEffect.remainingUpdateCount
                        }    
                    }
                })
                //this.component.isDuringEffect = true
            }
        }
        if(this.currentEffect.remainingUpdateCount === 1) {
            Object.keys(this.currentEffect.finishStatus).forEach((key) => {
                if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                    if(key === 'rotation' || key === 'opacity') {
                        this.component[key] = this.currentEffect.finishStatus[key]
                    } else {
                        this.component[key] = {x: this.currentEffect.finishStatus[key].x, y: this.currentEffect.finishStatus[key].y}
                    }
                }
            })
            if(this.currentEffect.callback) {
                this.currentEffect.callback(this.currentEffect.args)
            }
            this.currentEffect = undefined
        } else {
            Object.keys(this.currentEffect.effectDelta).forEach((key) => {
                if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                    if(key === 'rotation' || key === 'opacity') {
                        this.component[key] = this.component[key] + this.currentEffect.effectDelta[key]
                    } else {
                        this.component[key] = {x: this.component[key].x + this.currentEffect.effectDelta[key].x, y: this.component[key].y + this.currentEffect.effectDelta[key].y}
                    }
                }
            })
            this.currentEffect.remainingUpdateCount--
        }
        
    }
}