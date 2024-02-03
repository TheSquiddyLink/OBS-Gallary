// Folder for all art assets
const folder = './Assests/'
const logoFolder = folder+'Logos/'
const artFolder = folder+'Art/'

// List of all socail images
const socials = {
    twitch: logoFolder+"twitch.png", 
    tiktok: logoFolder+"tiktok.png", 
    twitter: logoFolder+"twitter.png"
}

// All artists
// Required: name
// Options: tag, icon
const artist = {
    john: {name: "John Doe", tag: "@john_doe", icon: socials.twitch},
    jane: {name: "Jane Doe"}
}


// All images
// All fields are required
// File, and artist

const images = [
    {file: artFolder+"example.png", artist: artist.jane},
    {file: artFolder+"example2.png", artist: artist.john}
]

export default images;