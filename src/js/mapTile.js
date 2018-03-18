
var MapTile = function() {
    this.mapFloor = new Framework.Sprite(imagePath + 'floor2.png');
    this.mapFloor.scale = 2;

    this.mapWall = new Framework.Sprite(imagePath + 'treeStone.png');
    this.mapWall.scale = 2;

    this.increaseBombNum  = new Framework.Sprite(imagePath + 'increaseBombNum.png');
    this.increaseBombNum.scale = 1.5;

    this.increaseBombPower  = new Framework.Sprite(imagePath + 'increaseBombPower.png');
    this.increaseBombPower.scale = 1.5;

    this.stopMonster  = new Framework.Sprite(imagePath + 'stopMonster.png');
    this.stopMonster.scale = 1.5;

    this.mapPosition = {x:0, y:0};
    this.spritePosition = {}
    this._tileType = 0;

    this.update = function(){

    }

    this.draw = function(ctx){

        this.mapFloor.draw(ctx);
        if(this._tileType === 1){
            this.mapWall.draw(ctx);
        }else if(this._tileType === -1){
            this.increaseBombNum.draw(ctx);
        }else if(this._tileType === -2){
            this.increaseBombPower.draw(ctx);
        }else if(this._tileType === -3){
            this.stopMonster.draw(ctx);
        }
    }

};

Object.defineProperty(MapTile.prototype, 'position', {
    get: function() {
        return this.mapPosition;
    },
    set: function(newValue) {
        this.mapPosition = newValue;
        this.mapFloor.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.mapWall.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.increaseBombNum.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.increaseBombPower.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
        this.stopMonster.position = {x: this.mapPosition.x * 64, y: this.mapPosition.y * 64};
    }
}); 

Object.defineProperty(MapTile.prototype, 'tileType', {
    get: function() {
        return this._tileType;
    },
    set: function(newValue) {
        this._tileType = newValue;
    }
}); 