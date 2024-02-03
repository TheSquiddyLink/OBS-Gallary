import { sleep, animation, randomImage, getElements } from './test.js'

window.onload = start()

async function start() {

    // This gets all of the default elements that are used
    let el = getElements()
    
    // This gets a random image, and requires for an image, name, handle, and icon HTML element
    randomImage(el.img, el.name, el.handle, el.icon)
    // This is a forever loop
    while(true){
        // This tells the program to sleep (wait) for 5 seconds
        await sleep(5)
        // The first animation(s) is the disapear animation
        animation([el.img], "shrink", 2)
        animation([el.name, el.handle, el.icon], 'fadeOut', 3)
        // Code will not wait for animation to finish, so a sleep is needed
        await sleep(2)
        // The last animations are the appear animation
        randomImage(el.img, el.name, el.handle, el.icon)
        animation([el.img], 'grow', 2)
        animation([el.name, el.handle, el.icon], 'fadeIn', 3)
        await sleep(2)

    }
}
