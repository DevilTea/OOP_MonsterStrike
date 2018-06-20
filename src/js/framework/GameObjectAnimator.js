Framework.GameObjectAnimator = class GameObjectAnimator {
    constructor(gameObject) {
        autoBind(this)
        this.gameFps = Framework.Config.fps
        this.gameObject = gameObject
        this.animationQueue = []
        this.currentAnimation
    }
    addAnimation(animationObj, duration, callback, ...args) {
        let animation = {}
        animation.animationDelta = {}
        animation.remainingUpdateCount = Math.round(duration / 1000 * this.gameFps)
        Object.keys(animationObj).forEach((key) => {
            if(key !== 'position' && key !== 'scale' && key !== 'rotation' && key !== 'opacity' &&
                key !== 'begin_position' && key !== 'begin_scale' && key !== 'begin_rotation' && key !== 'begin_opacity') {
                throw new Error("目前僅接受position, scale, rotation, opacity的動畫效果")
            } else if(key === 'position' && key === 'scale' && key === 'rotation' && key === 'opacity' && typeof animationObj[key] !== typeof this.gameObject[key]) {
                throw new Error("給予了錯誤型態的動畫參數")
            }
        })
        animation.finishStatus = animationObj
        animation.callback = callback
        animation.args = args
        this.animationQueue.push(animation)
    }
    update() {
        if(this.currentAnimation === undefined) {
            if(this.animationQueue.length === 0) {
                return
            } else {
                this.currentAnimation = this.animationQueue[0]
                this.animationQueue.splice(0, 1)
                Object.keys(this.currentAnimation.finishStatus).forEach((key) => {
                    if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                        this.gameObject[key] = this.currentAnimation.finishStatus['begin_' + key] !== undefined ? this.currentAnimation.finishStatus['begin_' + key] : this.gameObject[key]
                        if(key === 'rotation' || key === 'opacity') {
                            this.currentAnimation.animationDelta[key] = (this.currentAnimation.finishStatus[key] - this.gameObject[key]) / this.currentAnimation.remainingUpdateCount
                        } else {
                            this.currentAnimation.animationDelta[key] = {}
                            this.currentAnimation.animationDelta[key].x = (this.currentAnimation.finishStatus[key].x - this.gameObject[key].x) / this.currentAnimation.remainingUpdateCount
                            this.currentAnimation.animationDelta[key].y = (this.currentAnimation.finishStatus[key].y - this.gameObject[key].y) / this.currentAnimation.remainingUpdateCount
                        }    
                    }
                })
                this.gameObject.isDuringAnimation = true
            }
        }
        if(this.currentAnimation.remainingUpdateCount === 1) {
            Object.keys(this.currentAnimation.finishStatus).forEach((key) => {
                if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                    if(key === 'rotation' || key === 'opacity') {
                        this.gameObject[key] = this.currentAnimation.finishStatus[key]
                    } else {
                        this.gameObject[key] = {x: this.currentAnimation.finishStatus[key].x, y: this.currentAnimation.finishStatus[key].y}
                    }
                }
            })
            if(this.currentAnimation.callback) {
                this.currentAnimation.callback(this.currentAnimation.args)
            }
            this.gameObject.isDuringAnimation = false
            this.currentAnimation = undefined
        } else {
            Object.keys(this.currentAnimation.animationDelta).forEach((key) => {
                if(key === 'position' || key === 'scale' || key === 'rotation' || key === 'opacity') {
                    if(key === 'rotation' || key === 'opacity') {
                        this.gameObject[key] = this.gameObject[key] + this.currentAnimation.animationDelta[key]
                    } else {
                        this.gameObject[key] = {x: this.gameObject[key].x + this.currentAnimation.animationDelta[key].x, y: this.gameObject[key].y + this.currentAnimation.animationDelta[key].y}
                    }
                }
            })
            this.currentAnimation.remainingUpdateCount--
        }
        
    }
}