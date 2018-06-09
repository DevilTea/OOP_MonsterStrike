GameClasses.Bag = class Bag {
        constructor() {
            this.bagMarbles = []
            this.marbleSmallImgs = []
            this.bagMarbles.push(marbleDataList[1743])
            this.bagMarbles.push(marbleDataList[1032])
            this.bagMarbles.push(marbleDataList[1746])
            this.bagMarbles.push(marbleDataList[391])
    }
    
    load(){
        let check = {}
        this.marbleSmallImgs = []
        this.bagMarbles.forEach((marble) => {
            if(check[marble.name] !== undefined){ // 假如圖片資源重複 就直接複製一分就好
                this.marbleSmallImgs.push(this.marbleSmallImgs[check[marble.name]].cloneImage())
            } else {
                check[marble.name] = this.marbleSmallImgs.length
                this.marbleSmallImgs.push(new Framework.Sprite(imagePath + 'small/' + marble.id + '.jpg'))
            }
        })
    }

    initialize() {
        this.marbleSmallImgs.forEach((img) => {
            img.initTexture()
        })
    }
}