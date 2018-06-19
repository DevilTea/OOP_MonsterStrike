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
        dialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '2em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px'}
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
            dialogImg.ele.src = srcImg[Math.abs((++number) % srcImg.length)].id
        }
        
        nextButton.clickEvent = (e) => {
            dialogImg.ele.src = srcImg[Math.abs((--number) % srcImg.length)].id
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

    static createWelcomeDialog(msg, callback = () => {}) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(15, 500, 1050, 920, document.createElement('div'), fullContainer, true)
        let dialogText = Framework.HtmlElementUI.createElement(20, 20, 1010, 800, document.createElement('div'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(400, 840, 200, 60, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: '#333333', borderRadius: '5px'}
        dialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', /*fontWeight: 'bold',*/lineHeight: '50px', fontSize: '2em', backgroundColor: '#999999', overflowY: 'auto', textAlign: 'center', borderRadius: '5px'}
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

    /*外掛視窗*/
    static createPlugInDialog(lowerMonsterHP = () => {}, upMablesDamage = () => {}, resetMarblesHP = () =>{}, invincible = () => {}, isOpen) {
        let fullContainer = Framework.HtmlElementUI.createElement(0, 0, 'full', 'full', document.createElement('div'), undefined, false)
        let dialogBackground = Framework.HtmlElementUI.createElement(-500, 250, 1920, 1080, document.createElement('div'), fullContainer, true)
        let titleDialogText = Framework.HtmlElementUI.createElement(30, 20, 1860, 900, document.createElement('div'), dialogBackground, false)
        let instructionsdialogText = Framework.HtmlElementUI.createElement(-100, 40, 800, 860, document.createElement('div'), dialogBackground, true)
        let loserMonsterDialogText = Framework.HtmlElementUI.createElement(30, 180,500, 200, document.createElement('div'), dialogBackground, false)
        let upMarblesDamageDialogText = Framework.HtmlElementUI.createElement(30, 380, 600, 200, document.createElement('div'), dialogBackground, false)
        let resetMarbleHPDialogText = Framework.HtmlElementUI.createElement(30, 580, 500, 200, document.createElement('div'), dialogBackground, false)
        let invincibleDialogText = Framework.HtmlElementUI.createElement(30, 780, 500, 200, document.createElement('div'), dialogBackground, false)
        let loserMonsterHPButton = Framework.HtmlElementUI.createElement(540, 190, 280, 100, document.createElement('button'), dialogBackground, false)
        let upMablesDamageButton = Framework.HtmlElementUI.createElement(540, 390, 280, 100, document.createElement('button'), dialogBackground, false)
        let resetMarbleHPButton = Framework.HtmlElementUI.createElement(540, 580, 280, 100, document.createElement('button'), dialogBackground, false)
        let invincibleButton = Framework.HtmlElementUI.createElement(540, 780, 280, 100, document.createElement('button'), dialogBackground, false)
        let enterButton = Framework.HtmlElementUI.createElement(1410, 950, 200, 100, document.createElement('button'), dialogBackground, false)
        let closeButton = Framework.HtmlElementUI.createElement(1620, 950, 200, 100, document.createElement('button'), dialogBackground, false)
        let mouseOffset = {x: 0, y: 0}
        let canDrag = false
        fullContainer.style = {userSelect: 'none'}
        dialogBackground.style = {backgroundColor: 'rgba(0, 200, 255, 0.7)', borderRadius: '5px'}
        titleDialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '3em', backgroundColor: 'rgba(0, 70, 100, 0.5)', overflowY: 'auto', textAlign: 'left', borderRadius: '5px'}
        titleDialogText.ele.innerText = '快速通關功能0皿0'
        instructionsdialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '1.5em', backgroundColor: '#333333', overflowY: 'auto', textAlign: 'left', borderRadius: '5px', lineHeight: '30px'}
        instructionsdialogText.ele.innerText = '快速通關功能說明：\n減少怪物血量：按一次就減少所有怪物的血量喔～\n增加彈珠攻擊力：一次增加5000點的攻擊力呢～\n恢復彈珠血量：血量回到全滿的狀態，但是怪物攻擊時不能呢～\n無敵：使用後就不能回頭囉，怪物怎麼打都不會輸'
        //減少血量
        loserMonsterDialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '2em'}
        loserMonsterDialogText.ele.innerText = '減少怪物血量'
        loserMonsterHPButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(200, 0, 0, 0.875)', fontWeight: 'bold', fontSize: '1em'}
        loserMonsterHPButton.ele.innerText = '－５０００'
        //增加攻擊力
        upMarblesDamageDialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '2em'}
        upMarblesDamageDialogText.ele.innerText = '增加彈珠攻擊力'
        upMablesDamageButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(0, 150, 0, 0.75)', fontWeight: 'bold', fontSize: '1em'}
        upMablesDamageButton.ele.innerText = '＋５０００'
        //血量回覆
        resetMarbleHPDialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '2em'}
        resetMarbleHPDialogText.ele.innerText = '恢復彈珠血量'
        resetMarbleHPButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(0, 150, 0, 0.75)', fontWeight: 'bold', fontSize: '1em'}
        resetMarbleHPButton.ele.innerText = '恢復'
        //無敵控制
        invincibleDialogText.style = {padding: '10px', color: '#ffffff', fontFamily: '微軟正黑體', fontWeight: 'bold', fontSize: '2em'}
        invincibleDialogText.ele.innerText = '無敵'
        invincibleButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(200, 0, 0, 0.875)', fontWeight: 'bold', fontSize: '1em'}
        invincibleButton.ele.innerText = '開啟'
        //視窗主按鈕
        enterButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(0, 150, 0, 0.75)', fontWeight: 'bold', fontSize: '1em'}
        enterButton.ele.innerText = '確認'
        closeButton.style = {border: '2px #999999 solid', borderRadius: '3px', color: '#ffffff', backgroundColor: 'rgba(200, 0, 0, 0.875)', fontWeight: 'bold', fontSize: '1em'}
        closeButton.ele.innerText = '關閉'

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

        loserMonsterHPButton.clickEvent = () => {
            lowerMonsterHP()
        }

        upMablesDamageButton.clickEvent = () => {
            upMablesDamage()
        }

        resetMarbleHPButton.clickEvent = () => {
            resetMarblesHP()
        }

        invincibleButton.clickEvent = () => {
            invincible()
            invincibleButton.style = {backgroundColor: 'rgba(0, 150, 0, 0.75)'}
            invincibleButton.ele.innerText = '已開啟'
        }

        enterButton.clickEvent = (e) => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
            isOpen.check = false
        }

        closeButton.clickEvent = (e) => {
            Framework.HtmlElementUI.detachElement(fullContainer)
            fullContainer.remove()
            Framework.MouseManager.startHandle()
            isOpen.check = false
        }

        Framework.HtmlElementUI.attachElement(fullContainer)
        fullContainer.create()
        Framework.MouseManager.stopHandle()
        return fullContainer
    }

    
}