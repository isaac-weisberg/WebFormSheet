import { IController } from "./IController"

interface ModalStackFrame {
    controller: IController
    sheetContainer: HTMLDivElement
}

export interface IModalStack {
    root: HTMLElement

    present(c: IController): void
}

export function ModalStack(initialController: IController): IModalStack {
    let frames: ModalStackFrame[] = []

    const root = document.createElement('div')
    root.style.backgroundColor = '#000000'

    const baseHeight = '100vh'
    root.style.height = baseHeight
    root.style.position = 'relative'

    const initialControllerWrapper = document.createElement('div')
    root.appendChild(initialControllerWrapper)

    initialController.view.style.height = baseHeight
    initialControllerWrapper.appendChild(initialController.view)

    return {
        root,
        present(c: IController): void {
            const sheetContainer = document.createElement('div')
            sheetContainer.style.position = 'absolute'
            sheetContainer.style.top = '0px'
            sheetContainer.style.left = '0px'
            sheetContainer.style.right = '0px'
            sheetContainer.className = '_modalContainer'
            sheetContainer.style.height = baseHeight
            sheetContainer.style.overflow = 'scroll'

            root.appendChild(sheetContainer)

            const sheet = document.createElement('div')
            sheet.className = '_sheet'
            sheet.style.marginTop = baseHeight
            sheet.style.borderRadius = '16px'
            sheet.style.overflow = 'hidden'
            sheetContainer.appendChild(sheet)

            const contentWrapper = document.createElement('div')
            contentWrapper.className = '_contentWrapper'
            contentWrapper.style.height = `calc(${baseHeight} - 32px)`
            contentWrapper.style.backgroundColor = "#FFFFFF"
            contentWrapper.style.overflow = 'scroll'
            sheet.appendChild(contentWrapper)

            contentWrapper.appendChild(c.view)

            const frame: ModalStackFrame = {
                controller: c,
                sheetContainer
            }
            
            frames = frames.concat(frame)
            root.appendChild(sheetContainer)

            sheetContainer.scrollTo({ 
                top: window.innerHeight - 32, 
                behavior: 'smooth'
            })
        }
    }
}