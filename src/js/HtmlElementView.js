GameClasses.HtmlElementView = class HtmlElementView {
    static createDialog(msg, callback = () => {}) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(140, 660, 800, 600, document.createElement('div'), fullContainer, true)
        let dialogText = Framework.HtmlElementUI.createElement(20, 20, 760, 480, document.createElement('div'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(300, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px'}
        dialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '3em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px'}
        dialogText.ele.innerText = msg
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        enterButton.ele.innerText = '確認'

        fullContainer.clickEvent = (e) => e.stopPropagation()
        fullContainer.mousedownEvent = (e) => e.stopPropagation()
        fullContainer.mouseupEvent = (e) => e.stopPropagation()
        fullContainer.mousemoveEvent = (e) => e.stopPropagation()

        dialogBackground.mousedownEvent = (e) => {
            e.preventDefault()
            e = Framework.MouseManager.countCanvasOffset(e)
            mouseOffset.x = dialogBackground.originX - e.x
            mouseOffset.y = dialogBackground.originY - e.y
            canDrag = true
        }

        fullContainer.mouseupEvent = (e) => {
            canDrag = false
        }

        fullContainer.mousemoveEvent = (e) => {
            if(e.buttons === 1 && canDrag) {
                e.preventDefault()
                e = Framework.MouseManager.countCanvasOffset(e)
                dialogBackground.position = {x: mouseOffset.x + e.x, y: mouseOffset.y + e.y}
            }
        }

        enterButton.clickEvent = (e) => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
            callback()
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }

}