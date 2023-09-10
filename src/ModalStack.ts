import { IController } from "./IController"

interface ModalStackFrame {
    controller: IController
    sheetContainer: HTMLDivElement
    sheet: HTMLDivElement
    contentWrapper: HTMLDivElement
}

function scrollToOpenedState(frame: ModalStackFrame) {
    frame.contentWrapper.style.height = `calc(100vh - ${sheetGapFromTop}px)`
    frame.sheetContainer.scrollTo({ 
        top: frame.contentWrapper.offsetHeight, 
        behavior: 'smooth'
    })
}

function scrollToConstrictionState(frame: ModalStackFrame) {
    frame.contentWrapper.style.height = `100vh`
    frame.sheetContainer.scrollTo({ 
        top: frame.contentWrapper.offsetHeight + sheetGapFromTop,
        behavior: 'smooth'
    })
}

export interface IModalStack {
    root: HTMLElement

    present(c: IController): void
}

const sheetsOriginTransform = '50% 0%'
const sheetTransition = 'border-radius .2s ease-out, transform .2s ease-out'
const sheetGapFromTop = 32
const sheetsBackgroundColor = '#FFFFFF'

let once = true

export function ModalStack(initialController: IController): IModalStack {
    let frames: ModalStackFrame[] = []

    const root = document.createElement('div')
    root.style.backgroundColor = '#000000'

    const baseHeight = '100vh'
    root.style.height = baseHeight
    root.style.position = 'relative'

    const initialControllerWrapper = document.createElement('div')
    initialControllerWrapper.style.overflow = 'hidden'
    initialControllerWrapper.style.transition = sheetTransition
    initialControllerWrapper.style.transformOrigin = sheetsOriginTransform
    initialControllerWrapper.style.backgroundColor = sheetsBackgroundColor
    root.appendChild(initialControllerWrapper)

    initialController.view.style.height = baseHeight
    initialControllerWrapper.appendChild(initialController.view)

    const firstTierConstrictionOffsetFromEdge = 24 // left-right edge, that is

    return {
        root,
        present(c: IController): void {
            const rootWidth = root.offsetWidth
            const firstTierConstictionWidth = rootWidth - firstTierConstrictionOffsetFromEdge * 2
            const firstTierConstrictionToFullSizeRatio = firstTierConstictionWidth / rootWidth

            if (frames.length > 0) {
                const lastFrame = frames[frames.length - 1] 

                const elementThatWillFirstTierConstrict = lastFrame.sheetContainer
                elementThatWillFirstTierConstrict.style.transformOrigin = sheetsOriginTransform
                elementThatWillFirstTierConstrict.style.borderRadius = '24px'
                elementThatWillFirstTierConstrict.style.transform = `translate(0px,  24px) scale(${firstTierConstrictionToFullSizeRatio})`
                scrollToConstrictionState(lastFrame)
            } else {
                const elementThatWillFirstTierConstrict = initialControllerWrapper
                elementThatWillFirstTierConstrict.style.transformOrigin = sheetsOriginTransform
                elementThatWillFirstTierConstrict.style.borderRadius = '24px'
                elementThatWillFirstTierConstrict.style.transform = `translate(0px,  24px) scale(${firstTierConstrictionToFullSizeRatio})`
            }

            const sheetContainer = document.createElement('div')
            sheetContainer.style.position = 'absolute'
            sheetContainer.style.top = '0px'
            sheetContainer.style.left = '0px'
            sheetContainer.style.right = '0px'
            sheetContainer.style.transition = sheetTransition
            sheetContainer.className = '_modalContainer'
            sheetContainer.style.height = baseHeight
            sheetContainer.style.overflow = 'scroll'

            const sheet = document.createElement('div')
            sheet.className = '_sheet'
            sheet.style.marginTop = baseHeight
            sheet.style.borderTopLeftRadius = '16px'
            sheet.style.borderTopRightRadius = '16px'
            sheet.style.overflow = 'hidden'
            sheetContainer.appendChild(sheet)

            const contentWrapper = document.createElement('div')
            contentWrapper.className = '_contentWrapper'
            contentWrapper.style.height = `calc(${baseHeight} - ${sheetGapFromTop}px)`
            contentWrapper.style.backgroundColor = "#FFFFFF"
            contentWrapper.style.overflow = 'scroll'
            sheet.appendChild(contentWrapper)

            contentWrapper.appendChild(c.view)

            const frame: ModalStackFrame = {
                controller: c,
                sheetContainer,
                sheet,
                contentWrapper
            }
        
            frames = frames.concat(frame)
            root.appendChild(sheetContainer)

            scrollToOpenedState(frame)
        }
    }
}