const fs = require("fs");
const { resolve } = require("path");

const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });


const imageNames = fs.readdirSync('./Assets/Art')
const logos = fs.readdirSync('./Assets/Logos')

console.log(imageNames)
if(fs.existsSync('./CreateConfig/config.json')){
    
    rl.question('File exists, do you want to replace it? (y/n)', async (answer) => {
        if(answer==="y") main();
    })
} else main();


async function main() {
    await artistQuestion()
    await askImageQuestions()

    console.log("Done!")
    console.log(artists)
    console.log(images)
    let data = JSON.stringify({images: images, artists: artists}, null, 2)
    fs.writeFileSync('./CreateConfig/config.json', data)
}

const artists = {}
const images = []

function artistQuestion(){

    return new Promise(resolve => {
        rl.question('What is the artist name?', (name) => {
            rl.question('What is the artist tag?', (tag) => {
                logos.forEach(function(value, index) {
                    console.log(`[${index}] | ${value}`)
                })
                rl.question('What is the socail media icon? (number)', (icon) => {
                    rl.question('Do you want to add another artist? (y/n)', (answer) => {
                        let key = name.split(' ')
                        key = key[0].toLowerCase()
                        artists[key] ={name: name, tag: tag, icon: logos[icon]}               
                        if(answer === "y") resolve(artistQuestion())
                        else resolve();
                    })
                })
            })
                    
        })

    })
 
}

async function askImageQuestions(){
    return new Promise(async resolve => {
        for(let value of imageNames){
            let count = 0
            for(let artist in artists) {
                console.log(`[${count}] | ${artists[artist].name}`)
                count++
            }
            console.log('============')
            console.log(value)
            await imageQuestion(value)
        }

        resolve();

    })
}

function imageQuestion(value){
    console.log("Running question")
    return new Promise(resolve => {
        rl.question('Who is the artist for this file? (number)', (answer) => {
            images.push({file: value, artist: Object.keys(artists)[answer]})
            resolve()
        })
    })

}