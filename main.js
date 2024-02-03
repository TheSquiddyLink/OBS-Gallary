import { sleep, animation, randomImage, getElements } from './test.js'

window.onload = start()

async function start() {

    let el = getElements()
    
    randomImage(el.img, el.name, el.handle, el.icon)
    while(true){
        await sleep(5)
        animation([el.img], "fadeIn", 2)
        animation([el.name, el.handle, el.icon], 'fadeOut', 3)
        await sleep(2)
        randomImage(el.img, el.name, el.handle, el.icon)
        animation([el.img], 'grow', 2)
        animation([el.name, el.handle, el.icon], 'fadeIn', 3)
        await sleep(2)

    }
}
