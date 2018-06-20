GameClasses.GameUI = class GameUI {
    constructor(stage) {
        autoBind(this)
        this.stage = stage
        this.arrowOption = {canDraw: false, arrowType: 'bounce', position: {x: 0, y: 0}, angle: 0, length: 0}
        this.arrowSprites = []
        this.playerInfoUIOption = {marbleIDs: [], nowMarble: 0, hpBar: {}}
        this.playerInfoUISprites = {UI: undefined, marbleSmallSprites: []}
        this.playerInfoUIHtmlElements = {marbleSmallHtmlElements: []}
    }
    loadArrow() {
        this.arrowSprites = [
            new Framework.Sprite(imagePath + 'UI/arrow_bounce.png'),
            new Framework.Sprite(imagePath + 'UI/arrow_pierce.png'),
            new Framework.Sprite(imagePath + 'UI/arrow_bounce_2.png'),
            new Framework.Sprite(imagePath + 'UI/arrow_pierce_2.png')
        ]
    }
    initializeArrow() {
        Objects.keys(this.arrowSprites).forEach((key) => this.arrowSprites[key].initTexture())
    }
    drawArrow(ctx) {
        if(this.arrowOption.canDraw) {
            this.arrowSprites[this.arrowOption.arrowType].position = this.arrowOption.position
            this.arrowSprites[this.arrowOption.arrowType].rotation = this.arrowOption.angle
            this.arrowSprites[this.arrowOption.arrowType].scale.x = this.arrowOption.length / this.arrowSprites[this.arrowOption.arrowType].texture.width
            this.arrowSprites[this.arrowOption.arrowType].draw(ctx)
        }
    }
    loadPlayerInfoUI() {
        this.playerInfoUISprites.UI = new Framework.Sprite(imagePath + 'UI/player_info_UI.png')
        this.playerInfoUISprites.UI.position = {x: 540, y: 1708.5}
        let check = {}
        this.playerInfoUIOption.marbleIDs.forEach((marbleID, index) => {// 假如圖片資源重複 就直接複製一分就好
            if(check[marbleID] !== undefined){
                this.playerInfoUISprites.marbleSmallSprites.push(this.playerInfoUISprites.marbleSmallSprites[check[marbleID]].cloneImage())
            } else{
                check[marbleID] = this.playerInfoUISprites.marbleSmallSprites.length
                this.playerInfoUISprites.marbleSmallSprites.push(new Framework.Sprite(imagePath + 'small/' + marbleID + '.jpg'))
            }
        })
    }
    initializePlayerInfoUI() {
        this.playerInfoUISprites.UI.initTexture()
        this.playerInfoUISprites.marbleSmallSprites.forEach((marbleSmall, index) => {
            marbleSmall.initTexture()
            let newHtmlElement = Framework.HtmlElementUI.createElement(10 + index * 205, 1600, 205, 205,  marbleSmall.texture)
            this.playerInfoUIHtmlElements.marbleSmallHtmlElements.push(newHtmlElement)
            Framework.HtmlElementUI.attachElement(newHtmlElement)
        })
    }
    drawPlayerInfoUI(ctx) {
        ctx.fillStyle = "black"
        ctx.fillRect(170, 1542, 855, 30)
        ctx.fillStyle = "red"
        ctx.fillRect(170, 1542, 855 * (this.stage.nowHp / this.stage.maxHp), 30)
        ctx.fillStyle = "green"
        ctx.fillRect(170, 1542, 855 * (Math.max(this.stage.nowHp - this.stage.accumulationDamage, 0) / this.stage.maxHp), 30)
        this.playerInfoUISprites.UI.draw(ctx)
        ctx.font = 'bold 60px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.fillText(Math.max(this.stage.nowHp - this.stage.accumulationDamage, 0) + "/" + this.stage.maxHp, 900, 1570)
        this.playerInfoUIHtmlElements.marbleSmallHtmlElements.forEach((htmlElement) => htmlElement.create())
        this.playerInfoUIHtmlElements.marbleSmallHtmlElements.forEach((htmlElement, index) => {
            htmlElement.resize()
            let previousPosition = htmlElement.position
            if(index === this.playerInfoUIOption.nowMarble) {
                htmlElement.position = {x: previousPosition.x, y: 1580}
            } else {
                htmlElement.position = {x: previousPosition.x, y: 1600}
            }
        })
    }
    remove() {
        this.playerInfoUIHtmlElements.marbleSmallHtmlElements.forEach((htmlElement) => {
            Framework.HtmlElementUI.attachElement(htmlElement)
            htmlElement.remove()
        })
    }
}