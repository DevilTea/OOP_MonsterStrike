GameClasses.Bag = class Bag {
        constructor() {
            this.bagMarbles = []
            this.marbleSmallImgs = []
            this.selectedMarbledList = []
    }    
    load(){
        this.bagMarbles.push(marbleDataList[391])
        this.bagMarbles.push(marbleDataList[1746])
        this.bagMarbles.push(marbleDataList[1032])
        this.bagMarbles.push(marbleDataList[1743])
        this.bagMarbles.forEach((marble) => {
            this.marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + marble.id + '.jpg'))
        })
    }

    initialize() {
        this.marbleSmallImgs.forEach((img) => {
            img.initTexture()
        })
    }

    getSelectedMarbledList(){
        return this.selectedMarbledList
    }
}