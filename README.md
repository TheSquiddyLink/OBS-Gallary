# OBS-Gallery

# About

This is a basic HTML website that can be run using an OBS Built-in browser. This is still in development and is not fully for release, however, you may download this and use it if you are interested. 

I plan on making an interactable config creator in the future, however for now it must be done manually. 

# How to use
To use this I recommend having an IDE such as Visual Studio Code, it is not needed but will make things significantly easier. 
## Setting Config

1. Clone `configTemplate.js` and rename it to `config.js`
2. Open the cloned file named `config.js`
3. Lines 2-4 should not be changed unless you have different directories you want the files to be stored in
```js
const folder = './Assests/'
const logoFolder = folder+'Logos/'
const artFolder = folder+'Art/'
```
4. Lines 7-10 may need to be changed if you have additional icons
```js
const socials = {
    twitch: logoFolder+"twitch.png", 
    tiktok: logoFolder+"tiktok.png", 
    twitter: logoFolder+"twitter.png"
}
```
5. The artist variable (line 16) will need to be changed
   * To add an artist do the following steps
     1. Create a key-value IE: `john:`
     2. Add `{}`
     3. Within the `{}` add a key value called `name:`
     4. After `name:` add the name as a string `"John Doe"`
     5. Optional: Repeat steps 3 and 4 for the key values tag and icon
   * When finished it should look like this
```js
     const artist = {
    john: {name: "John Doe", tag: "@john_doe", icon: socials.twitch},
    jane: {name: "Jane Doe"}
}
```
6. Add all of the images
   * To add an image do the following steps
     1. Create a new list by adding `{}`
     2. Add the key `file:`
     3. The value for the key `file` will be artFolder+"example.png", with `example` being replaced with your image
     4. Add the key `artist:`
     5. The value for the artist will be `artist.jane`, with `jane` being replaced by the key for the artist
7. The config file is finished, to change animations now go to `main.js`
## Animation Config
1. All information in `main.js` does not need to be changed, outside of the animations
2. Lines 17, 18, 23, and 24 are the animations.
3. There will be 3 input values for the function, the middle one, is a string IE: "shrink" is the animation type, replace that with the animation you want
    * Animation Types:
    * shrink
    * grow
    * fadeIn
    * fadeOut
    * slideIn
    * slideOut
