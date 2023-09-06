"use strict"

function newDiv() {
    return document.createElement('div')
}

const root = document.getElementById('App')
root.style.height = "100vh"
root.style.maxWidth = "400px"
root.style.margin = "0px auto"

root.style.backgroundColor = '#BBBBBF'

const sheetContainer = newDiv()
sheetContainer.className = '_modalContainer'
sheetContainer.style.height = "100vh"
sheetContainer.style.overflow = 'scroll'

root.appendChild(sheetContainer)

const sheet = newDiv()
sheet.className = '_sheet'
sheet.style.marginTop = "100vh"
sheet.style.borderRadius = '16px'
sheet.style.overflow = 'hidden'
sheetContainer.appendChild(sheet)

const innerContent = newDiv()
innerContent.className = '_innorContent'
innerContent.style.height = "calc(100vh - 32px)"
innerContent.style.backgroundColor = "#FFFFFF"
innerContent.style.overflow = 'scroll'
sheet.appendChild(innerContent)

innerContent.textContent = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida, arcu eu faucibus rhoncus, nunc odio aliquet quam, ut euismod nunc nisl sit amet ante. Maecenas dignissim leo ut turpis consectetur suscipit. Nulla eu magna sed quam vehicula aliquam. Phasellus bibendum quis dolor id malesuada. Vestibulum in ornare risus. Fusce hendrerit dolor vitae euismod tempus. Suspendisse potenti. Praesent malesuada nisl ac odio blandit, et iaculis nibh aliquam. Aliquam sollicitudin lorem magna, ultricies mattis mi commodo ut. Vivamus volutpat pulvinar magna, id tempus quam pretium in. Donec a ex finibus, porta enim ac, convallis lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam quis risus nisl. Donec erat ante, suscipit ac convallis sit amet, posuere sit amet neque.

Proin vehicula purus vitae mauris sodales interdum. Phasellus sollicitudin, sapien nec posuere efficitur, nulla eros tristique risus, posuere porttitor dui justo non mi. Proin venenatis bibendum felis et volutpat. Proin efficitur interdum dignissim. Duis ligula nisi, volutpat a lacus sed, tincidunt placerat ante. Nulla facilisi. Morbi arcu mauris, fermentum nec condimentum in, tincidunt ut dolor. Quisque porta et leo eget dignissim. Integer molestie dui condimentum vestibulum tempor. Duis et purus varius, congue ante in, sodales sem.

Quisque ligula lacus, faucibus et erat eget, venenatis sagittis ante. Aenean at rutrum eros, quis dignissim mauris. Sed ac massa vel nulla convallis hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean facilisis sed nibh eget posuere. Cras consectetur iaculis leo quis fringilla. Vivamus blandit, mi eu gravida facilisis, orci dolor accumsan risus, at dignissim erat risus vel quam. Suspendisse sodales hendrerit elit at congue. Donec porta scelerisque ante eu tempus. Duis ut velit mi. Proin lacus augue, dignissim id orci in, varius tempus ex.

Maecenas velit justo, blandit eu ornare sed, suscipit ultrices libero. Nunc aliquam lacus aliquet tempus condimentum. Curabitur eu rutrum sem, at suscipit augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed quis mattis ligula. Nulla lobortis tortor magna, et venenatis neque cursus non. Integer at leo maximus, luctus velit id, imperdiet sapien. Aliquam sit amet imperdiet tellus. Sed vitae arcu mi. Nulla non tellus bibendum lacus lacinia viverra. Nulla sapien augue, tempus sed quam sollicitudin, blandit molestie nulla. Cras varius dapibus nunc, sed semper mauris interdum at. Integer rutrum, quam sit amet dapibus feugiat, mauris quam iaculis turpis, eget fringilla turpis mauris eu nisl.

Etiam volutpat porttitor eros, nec ornare purus. Fusce non ullamcorper mi. Vestibulum et velit ligula. Nunc eget iaculis arcu. Nunc facilisis efficitur accumsan. Nullam vel augue ante. Sed quis velit ligula. Nullam scelerisque sollicitudin urna. Quisque suscipit id eros vitae dictum. Morbi tellus lacus, euismod quis suscipit ac, pulvinar sed urna. Sed quis purus sed ante faucibus blandit. Duis rutrum egestas sem, vel vulputate orci tempor non.
`