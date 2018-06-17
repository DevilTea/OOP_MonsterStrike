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

    static createHelpDialog(srcImg = [], callback = () => {}) {
        // 外層容器
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(50, 400, 1024, 768, document.createElement('div'), fullContainer, true)
        let dialogImg = Framework.HtmlElementUI.createElement(20, 20, 980, 600, document.createElement('img'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(150, 680, 200, 60, document.createElement('button'), dialogBackground, false)
        let previousButton = Framework.HtmlElementUI.createElement(500, 680, 200, 60, document.createElement('button'), dialogBackground, false)
        let nextButton = Framework.HtmlElementUI.createElement(750, 680, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        let number = 0
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px', border: '2px #999999 solid'}
        dialogImg.ele.src = srcImg[0].id  //預設第一張圖
        // 確認按鈕
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        enterButton.ele.innerText = '確認'
        // 上一個按鍵
        previousButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        previousButton.ele.innerText = '上一個'
        // 下一個按鍵
        nextButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        nextButton.ele.innerText = '下一個'

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

        previousButton.clickEvent = (e) => {
            dialogImg.ele.src = srcImg[Math.abs((--number) % 4)].id
        }
        
        nextButton.clickEvent = (e) => {
            dialogImg.ele.src = srcImg[Math.abs((--number) % 4)].id
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }

    static createWarningDialog(msg, callback = () => {}) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(140, 660, 800, 600, document.createElement('div'), fullContainer, true)
        let dialogText = Framework.HtmlElementUI.createElement(20, 20, 760, 480, document.createElement('div'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(150, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let cancleButton = Framework.HtmlElementUI.createElement(450, 520, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px'}
        dialogText.style = {padding: '10px', color: '#f00000', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '3em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px'}
        dialogText.ele.innerText = msg
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        enterButton.ele.innerText = '確認'
        cancleButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: '#333333'}
        cancleButton.ele.innerText = '不要'

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

        cancleButton.clickEvent = () => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }
}