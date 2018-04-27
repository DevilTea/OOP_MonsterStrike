Framework.GameObjectAnimator = class GameObjectAnimator {
    constructor(gameObject) {
        autoBind(this)
        this.gameFps = Framework.Config.fps
        this.gameObject = gameObject
        this.animationQueue = []
        this.currentAnimation
    }

    addAnimation(animationObj, duration) {
        let animation = {}
        animation.animationDelta = {}
        animation.remainingUpdateCount = Math.round(duration / 1000 * this.gameFps)
        Object.keys(animationObj).forEach((key) => {
            if(key !== 'position' && key !== 'scale' && key !== 'rotation' && key !== 'opacity') {
                throw new Error("目前僅接受position, scale, rotation, opacity的動畫效果")
            } else if(typeof animationObj[key] !== typeof this.gameObject[key]) {
                throw new Error("給予了錯誤型態的動畫參數")
            } else {
                if(key === 'rotation' || key === 'opacity') {
                    animation.animationDelta[key] = (animationObj[key] - this.gameObject[key]) / animation.remainingUpdateCount
                } else {
                    animation.animationDelta[key] = {}
                    animation.animationDelta[key].x = (animationObj[key].x - this.gameObject[key].x) / animation.remainingUpdateCount
                    animation.animationDelta[key].y = (animationObj[key].y - this.gameObject[key].y) / animation.remainingUpdateCount
                }
            }
        })
        animation.finishStatus = animationObj
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
                    if(key === 'rotation' || key === 'opacity') {
                        this.currentAnimation.animationDelta[key] = (this.currentAnimation.finishStatus[key] - this.gameObject[key]) / this.currentAnimation.remainingUpdateCount
                    } else {
                        this.currentAnimation.animationDelta[key] = {}
                        this.currentAnimation.animationDelta[key].x = (this.currentAnimation.finishStatus[key].x - this.gameObject[key].x) / this.currentAnimation.remainingUpdateCount
                        this.currentAnimation.animationDelta[key].y = (this.currentAnimation.finishStatus[key].y - this.gameObject[key].y) / this.currentAnimation.remainingUpdateCount
                    }
                })
                this.gameObject.isDuringAnimation = true
            }
        }

        if(this.currentAnimation.remainingUpdateCount === 1) {
            Object.keys(this.currentAnimation.finishStatus).forEach((key) => {
                this.gameObject[key] = this.currentAnimation.finishStatus[key]
            })
            delete this.currentAnimation
            this.currentAnimation = undefined
            this.gameObject.isDuringAnimation = false
        } else {
            Object.keys(this.currentAnimation.animationDelta).forEach((key) => {
                if(key === 'rotation' || key === 'opacity') {
                    this.gameObject[key] = this.gameObject[key] + this.currentAnimation.animationDelta[key]
                } else {
                    this.gameObject[key] = {x: this.gameObject[key].x + this.currentAnimation.animationDelta[key].x, y: this.gameObject[key].y + this.currentAnimation.animationDelta[key].y}
                }
            })
            this.currentAnimation.remainingUpdateCount--
        }
        
    }
}