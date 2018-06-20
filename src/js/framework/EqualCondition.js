// By Raccoon
// include namespace
'use strict'
Framework.EqualCondition = class EqualCondition {
    constructor(targetProperty ,targetValue,delta) {
        this.targetProperty = targetProperty
        this.targetValue = targetValue
        this.delta = delta
        this.info = ''
    }
    
    isFitCondition() {
        let objectValue = Framework.replayer.evaluate(this.targetProperty);
        if(Framework.Util.isNumber(this.targetValue)) {
            if(objectValue >= this.targetValue - this.delta && objectValue <= this.targetValue + this.delta) {
                return true
            }
        } else if(Framework.Util.isBoolean(targetValue)){
            if(objectValue === targetValue){
                return true
            }
        }
    }
}