import { IController } from "./IController"
import { NoScrollIndicatorClass, RegisterNoScrollIndicatorClass } from "./NoScrollIndicator"

interface ModalStackFrame {
    controller: IController
    sheetContainer: HTMLDivElement
    sheet: HTMLDivElement
    contentWrapper: HTMLDivElement
}
export interface IModalStack {
    root: HTMLElement

    present(c: IController): void
    dismiss(c: IController): void
}

const sheetTransition = 'border-radius .2s ease-out, transform .2s ease-out'
const sheetGapFromTop = 32
const sheetsBackgroundColor = '#FFFFFF'

export function ModalStack(initialController: IController): IModalStack {
    RegisterNoScrollIndicatorClass()

    const baseHeight = '100vh'

    function scrollToOpenedState(frame: ModalStackFrame) {
        frame.sheetContainer.scrollTo({ 
            top: frame.contentWrapper.offsetHeight, 
            behavior: 'smooth'
        })
    }

    function scrollToDismissedState(frame: ModalStackFrame) {
        frame.sheetContainer.scrollTo({ 
            top: 0, 
            behavior: 'smooth'
        })
    }

    let frames: ModalStackFrame[] = []

    const root = document.createElement('div') as HTMLDivElement
    root.style.backgroundColor = '#000000'

    root.style.height = baseHeight
    root.style.position = 'relative'

    const initialControllerWrapper = document.createElement('div')
    initialControllerWrapper.style.overflow = 'hidden'
    initialControllerWrapper.style.transition = sheetTransition
    initialControllerWrapper.style.transformOrigin = '50% 0%'
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
                elementThatWillFirstTierConstrict.style.borderRadius = '24px'
                elementThatWillFirstTierConstrict.style.transform = `translate(0px,  -8px) scale(${firstTierConstrictionToFullSizeRatio})`
            } else {
                const elementThatWillFirstTierConstrict = initialControllerWrapper
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
            sheetContainer.classList.add(NoScrollIndicatorClass)
            sheetContainer.style.transformOrigin = '50% 32px'

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
            contentWrapper.classList.add(NoScrollIndicatorClass)
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

            let scrollHandleTimer: NodeJS.Timeout
            sheetContainer.onscroll = (e) => {
                clearTimeout(scrollHandleTimer)
                scrollHandleTimer = setTimeout(() => {
                    const scrollTop = sheetContainer.scrollTop
                    const rootHeight = root.offsetHeight

                    if (scrollTop < rootHeight / 2) {
                        this.dismiss(c)
                    } else {
                        scrollToOpenedState(frame)
                    }
                }, 300)
            }

            sheetContainer.ondragenter = (e) => {
                console.log("ondragenter")
            }

            sheetContainer.ondragstart = (e) => {
                console.log("ondragstart")
            }

            sheetContainer.ondrag = (e) => {
                console.log("ondrag")
            }

        },
        dismiss(c: IController): void {
            const frameIdx = frames.findIndex((frame) => {
                return frame.controller === c
            })

            if (frameIdx < 0) {
                return
            }

            const framesThatStay = frames.slice(0, frameIdx)
            const framesThatGo = frames.slice(frameIdx, frames.length)
            let topFrameThatGoes: ModalStackFrame|undefined
            if (framesThatGo.length > 0 ) {
                topFrameThatGoes = framesThatGo[framesThatGo.length - 1]
            } else {
                topFrameThatGoes = undefined
            }
            let nonTopFramesThatGo: ModalStackFrame[]
            if (framesThatGo.length > 1) {
                nonTopFramesThatGo = framesThatGo.slice(0, framesThatGo.length - 1)
            } else {
                nonTopFramesThatGo = []
            }

            if (frameIdx > 0) {
                const previousFrame = frames[frameIdx - 1]

                previousFrame.sheetContainer.style.borderRadius = '0px'
                previousFrame.sheetContainer.style.transform = ''
            } else {
                initialControllerWrapper.style.borderRadius = '0px'
                initialControllerWrapper.style.transform = ''
            }

            for (const frame of nonTopFramesThatGo) {
                root.removeChild(frame.sheetContainer)
            }

            if (topFrameThatGoes) {
                const frame = topFrameThatGoes
                scrollToDismissedState(frame)
                setTimeout(() => {
                    root.removeChild(frame.sheetContainer)
                }, 620)
            }

            frames = framesThatStay
        }
    }
}