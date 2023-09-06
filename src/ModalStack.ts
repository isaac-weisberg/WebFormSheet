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

    const initialControllerWrapper = document.createElement('div')
    root.appendChild(initialControllerWrapper)

    initialControllerWrapper.appendChild(initialController.view)

    return {
        root,
        present(c: IController): void {
            const sheetContainer = document.createElement('div')
            sheetContainer.className = '_modalContainer'
            sheetContainer.style.height = "100vh"
            sheetContainer.style.overflow = 'scroll'

            root.appendChild(sheetContainer)

            const sheet = document.createElement('div')
            sheet.className = '_sheet'
            sheet.style.marginTop = "100vh"
            sheet.style.borderRadius = '16px'
            sheet.style.overflow = 'hidden'
            sheetContainer.appendChild(sheet)

            const innerContent = document.createElement('div')
            innerContent.className = '_innorContent'
            innerContent.style.height = "calc(100vh - 32px)"
            innerContent.style.backgroundColor = "#FFFFFF"
            innerContent.style.overflow = 'scroll'
            sheet.appendChild(innerContent)

            innerContent.appendChild(c.view)

            const frame: ModalStackFrame = {
                controller: c,
                sheetContainer
            }
            
            frames = frames.concat(frame)
            root.appendChild(sheetContainer)
        }
    }
}