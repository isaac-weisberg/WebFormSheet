export const NoScrollIndicatorClass = '_modalStackNOSCROLLindicator'

let dunRegistored = false
export function RegisterNoScrollIndicatorClass() {
    if (dunRegistored) {
        return
    }

    dunRegistored = true
    const styleElement: HTMLStyleElement = document.createElement('style')
    styleElement.innerHTML = `.${NoScrollIndicatorClass}::-webkit-scrollbar { display: none; } ${NoScrollIndicatorClass} { scrollbar-width: none; -ms-overflow-style: none; }`
    document.getElementsByTagName('head')[0].appendChild(styleElement)
}