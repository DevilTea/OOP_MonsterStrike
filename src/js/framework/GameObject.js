// By Raccoon
'use strict'
Framework.GameObject = class GameObject {
    constructor() {
        autoBind(this)

        this.absolutePosition = { x: 0, y: 0 }
        this.absoluteRotation = 0
        this.absoluteScale = {x: 1, y: 1}
        this.absoluteOpacity = 1
        this.systemLayer = 1
        //this.spriteParent = {}
        
        this.previousAbsolutePosition = new Framework.Point()
        this.previousWidth = 0
        this.previousHeight = 0

        this.rotation = 0
        this.scale = {x: 1, y: 1}
        this.position = { x: 0, y: 0 }
        this.opacity = 1

        this._isRotate = true
        this._isScale = true
        this._isMove = true
        this._isFade = true
        this._changeFrame = true
        this._isCountAbsolute = false
        
        this.animator = new Framework.GameObjectAnimator(this)
        this.isDuringAnimation = false
        //this.pushSelfToLevel()
        Object.defineProperty(this, 'isObjectChanged', {
            get: function() {
                var isParentChanged = false
                /*if(!Framework.Util.isUndefined(this.spriteParent)) {
                    isParentChanged = this.spriteParent.isObjectChanged;
                }*/
                
                if(!Framework.Util.isUndefined(this.attachArray)) {
                    this.attachArray.forEach(function(ele) {
                        if(ele.isObjectChanged) {
                           isParentChanged  = true
                       }
                    });
                }
                return this._isRotate || this._isScale || this._isFade || this._isMove || this._changeFrame || isParentChanged;
            }
        })
    
        Object.defineProperty(this, 'isOnChangedRect', {
            get: function() {
                var halfDiagonal = this.diagonal / 2,
                    thisRect = { x: this.absolutePosition.x - halfDiagonal, 
                        y: this.absolutePosition.y - halfDiagonal,
                        x2: this.absolutePosition.x + halfDiagonal, 
                        y2: this.absolutePosition.y + halfDiagonal,
                    },
                    changedRect = Framework.Game.currentLevel.getChangedRect(Framework.Config.canvasWidth, Framework.Config.canvasHeight);

                if((thisRect.x < changedRect.x2 && thisRect.y < changedRect.y2) || 
                    (thisRect.x2 > changedRect.x && thisRect.y2 > changedRect.y) ||
                    (thisRect.x2 > changedRect.x && thisRect.y2 < changedRect.y) ||
                    (thisRect.x2 < changedRect.x && thisRect.y2 > changedRect.y)) {
                    return true;
                }
                return false;
            }
        })
        
        /**
        * 絕對寬度的getter/setter
        * @property width
        * @type {number} 
        * @default 0
        */
        Object.defineProperty(this, 'width', {
            get: function() {
                var width = 0;
                if(this.texture) {
                    width = this.texture.width;
                }
                /* if (this.col) {
                    width = this.texture.width / this.col;
                }*/
                return Math.floor(width * this.absoluteScale.x);
            }
        })

        /**
        * 絕對高度的getter/setter
        * @property height
        * @type {number} 
        * @default 0
        */
        Object.defineProperty(this, 'height', {
            get: function() {
                var height = 0;//this.texture.height;
                if(this.texture) {
                    height = this.texture.height;
                }
                /*if (this.row) {
                    height = this.texture.height / this.row;
                }*/
                return Math.floor(height * this.absoluteScale.y);
            }
        })

        Object.defineProperty(this, 'diagonal', {
            get: function() {
                return Math.sqrt(this.width * this.width + this.height * this.height);
            }
        })
    
        /**
        * 絕對位置左上角的getter
        * @property upperLeft
        * @type {number} 
        * @default 0
        * @readOnly
        */
        Object.defineProperty(this, 'upperLeft', {
            get: function() {    

                var oriX = -this.width / 2,
                    oriY = -this.height / 2,
                    positionDif = this.countRotatePoint({x:oriX,y:oriY},this.absoluteRotation);

                return { x: Math.floor(this.absolutePosition.x + positionDif.x), y: Math.floor(this.absolutePosition.y + positionDif.y) };
            }
        })

        /**
        * 絕對位置右上角的getter
        * @property upperRight
        * @type {number}  
        * @default 0
        * @readOnly
        */
        Object.defineProperty(this, 'upperRight', {
            get: function() {    

                var oriX = this.width / 2,
                    oriY = -this.height / 2,
                    positionDif = this.countRotatePoint({x:oriX,y:oriY},this.absoluteRotation);

                return { x: Math.floor(this.absolutePosition.x + positionDif.x), y: Math.floor(this.absolutePosition.y + positionDif.y) };
            }
        })

        /**
        * 絕對位置左下角的getter
        * @property lowerLeft
        * @type {number}  
        * @default 0
        * @readOnly
        */
        Object.defineProperty(this, 'lowerLeft', {
            get: function() {                    
                
                var oriX = -this.width / 2,
                    oriY = this.height / 2,
                    positionDif = this.countRotatePoint({x:oriX,y:oriY},this.absoluteRotation);

                return { x: Math.floor(this.absolutePosition.x + positionDif.x), y: Math.floor(this.absolutePosition.y + positionDif.y) };
            }
        })

        /**
        * 絕對位置右下角的getter
        * @property lowerRight
        * @type {number}  
        * @default 0
        * @readOnly
        */
        Object.defineProperty(this, 'lowerRight', {
            get: function() {                    
             
                var oriX = this.width / 2,
                    oriY = this.height / 2,
                    positionDif = this.countRotatePoint({x:oriX,y:oriY},this.absoluteRotation)

                return { x: Math.floor(this.absolutePosition.x + positionDif.x), y: Math.floor(this.absolutePosition.y + positionDif.y) };
            }
        })
        
        Object.defineProperty(this, 'layer', {
           set: function(newValue) {
               this.systemLayer = newValue;
               if(!Framework.Util.isUndefined(this.attachArray)) {
                   this.attachArray.forEach(function(o) {
                       o.layer = newValue + 1
                   })
               }
           },
           get: function() {
               return this.systemLayer
           }
        })

        Object.defineProperty(this, 'canvas', {               
           get: function() {
                if(!Framework.Util.isUndefined(this._selfCanvas)) {
                    return this._selfCanvas;
                }
                                  
                this._selfCanvas =  document.createElement('canvas');
                var diagonalLength = Math.ceil(Math.sqrt(Math.pow(this.height, 2) + Math.pow(this.width, 2)));
                // this._selfCanvas.width = diagonalLength;
                // this._selfCanvas.height = diagonalLength;
                this._selfCanvas.width = this.width;
                this._selfCanvas.height = this.height;
                if(this.width === 0 && this.height === 0) {
                    /*this._selfCanvas = Framework.Game._canvas;
                    return this._selfCanvas;*/
                    this._selfCanvas.width = Framework.Game.canvas.width;
                    this._selfCanvas.height = Framework.Game.canvas.height;
                } 
                return this._selfCanvas;
           }
        })

        Object.defineProperty(this, 'context', {               
           get: function() {                    
                return this.canvas.getContext('2d');
           }
        })
    }
    
    clearDirtyFlag() {
        this._isRotate = false;
        this._isScale = false;
        this._isMove = false;
        this._isFade = false
        this._changeFrame = false;
    }

    pushSelfToLevel() {
        Framework.Game.pushGameObj(this)
    }

    countAbsoluteProperty() {    

        this.previousAbsolutePosition.x = this.absolutePosition.x;
        this.previousAbsolutePosition.y = this.absolutePosition.y;
        this.previousWidth = this.width;
        this.previousHeight = this.height;
        
        if(this.absoluteRotation !== this.rotation) {
            this._isRotate = true;
        }

        if(this.absoluteScale !== this.scale) {
            this._isScale = true;
        }

        if(this.absolutePosition.x !== this.position.x || this.absolutePosition.y !== this.position.y) {
            this._isMove = true
        }

        if(this.absoluteOpacity !== this.opacity) {
            this._isFade = true
        }

        this.rotation %= 360
        this.absoluteRotation = this.rotation;
        this.absoluteScale = this.scale;
        this.absoluteOpacity = this.opacity

        this.absolutePosition.x = this.position.x;
        this.absolutePosition.y = this.position.y;

        if(Array.isArray(this.attachArray)) {
            this.attachArray.forEach(function(ele) {
                if(!Framework.Util.isUndefined(ele.countAbsoluteProperty))
                {
                    ele.countAbsoluteProperty();
                }

            });
        }
    }
    
    countRotatePoint(point, angle) {
        let currentRotate = (angle / 180) * Math.PI
        let cosRatio = Math.cos(currentRotate)
        let sinRatio = Math.sin(currentRotate)
        let pointX =  point.x * cosRatio - point.y * sinRatio
        let pointY = point.x * sinRatio + point.y * cosRatio
        return { x: pointX, y: pointY };
    }
    
    animate(animationObj, duration, callback, ...args) {
        this.animator.addAnimation(animationObj, duration, callback, ...args)
    }
    
    load() {}
    initialize() {}
    update() {}
    draw(ctx) {}
    teardown() {}
    toString() { return '[GameObject Object]'}
}