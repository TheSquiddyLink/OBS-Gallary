const path = '../Assets/Art/'

var data

var validJSON = false

const statusVals = {
    error: {
        404: "404 - Image not found in directory, add file to Assets/Art",
    },
    warning: {

    }
    
}

function createArtistList(id, optional){
    let artistSelect = document.getElementById(id)
    let artists = data.artists
    for (const artistKey in artists) {
        let selectItem = document.createElement('option')
        let child = artistSelect.appendChild(selectItem)
        let value = artists[artistKey].name
        if(!optional) value = artistKey
        child.setAttribute('value', value)
        child.innerHTML = artists[artistKey].name
    }
    if(optional){
        let item = document.createElement('option')
        let child = artistSelect.appendChild(item)
        child.setAttribute('value', "new")
        child.innerHTML = "New"
        artistOption();
    }
}

document.addEventListener('DOMContentLoaded', load)
async function load() {
    try{
        data = await fetch('config.json')
        data = await data.json()
        console.log('JSON Found')
        validJSON = true
    } catch(e){
        console.log(e)
        data = {images: [], artists: {}}
        console.log('JSON Not Found')
    }
    
    

    createArtistList("artistSelect")
    createArtistList("artistNameSelect", true)

    document.getElementById('artistName').value = document.getElementById('artistNameSelect').value
    if(document.getElementById('artistNameSelect').value === "new") document.getElementById('artistName').value = ""
    document.getElementById('iconValue').value = document.getElementById('icon').value    

    document.getElementById('fileInput').addEventListener('change', handleFileSelect)
    document.getElementById('select').addEventListener('change', selectChange)
    document.getElementById('addImage').addEventListener('click', addImage)
    document.getElementById('addArtist').addEventListener('click', addArtist)
    document.getElementById('export').addEventListener('click', exportJSON)
    document.getElementById('artistNameSelect').addEventListener('change', artistOption)
    document.getElementById('icon').addEventListener('change', iconOption)
    document.getElementById('back').addEventListener('click', back)
    document.getElementById('next').addEventListener('click', next)
    
}


function back(){
    let select = document.getElementById('select')
    let lenght = select.options.length - 1
    let index = select.options.selectedIndex - 1
    if(index < 1 ){
        select.options.selectedIndex = lenght
    } else {
        select.options.selectedIndex = index
    }
    selectChange()
}

function next(){
    let select = document.getElementById('select')
    let index = select.options.selectedIndex + 1
    let length = select.options.length - 1
    if(index > length){
        select.options.selectedIndex = 0
    } else {
        select.options.selectedIndex = index
    }
    selectChange()
}


function option(select, place) {
    let value = document.getElementById(select).value
    if(value === "new") {
        document.getElementById(place).setAttribute('type', "text")
        document.getElementById(place).value = ""
    }
    else {
        document.getElementById(place).value = value
        document.getElementById(place).setAttribute('type', "hidden")
    } 
}
function iconOption() {
    option('icon', "iconValue")
}
function artistOption(){
    option('artistNameSelect', 'artistName')
    let value = document.getElementById('artistNameSelect').value
    console.log(value)
    if(value == "new") {
        document.getElementById('addArtist').innerHTML= "Add Artist"
        document.getElementById('tag').value = ""
        document.getElementById('icon').value = ""
    }
    else{
        document.getElementById('addArtist').innerHTML = "Update Artist"
        let key = value.split(' ')[0].toLowerCase();
        console.log(key)
        console.log(data.artists[key].tag)
        if(data.artists[key].tag){
            document.getElementById('tag').value = data.artists[key].tag
            document.getElementById('icon').value = data.artists[key].icon
        } else {
            document.getElementById('tag').value = ""
            document.getElementById('icon').value = ""
        }

    } 
 
}

function exportJSON(event) {
    event.preventDefault()
    console.log("Exporting")
    let blob = new Blob([JSON.stringify(data, null, 2)], {type: 'json'})
    let blobURL = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')

    downloadLink.href = blobURL
    downloadLink.download = 'config.json'
    downloadLink.click()
    document.body.appendChild(downloadLink)
    URL.revokeObjectURL(blobURL)
}

function addArtist(event) {
    event.preventDefault()
    let artist = document.getElementById('artistName').value
    let select = document.getElementById('artistNameSelect').value
    let icon = document.getElementById('iconValue').value
    let tag = document.getElementById('tag').value

    if(tag == '') tag = undefined
    if(icon == '') icon = undefined

    console.log(artist)
    let key = artist.split(' ')[0].toLowerCase();
    let type = 'Modify'
    console.log(key)
    let oldData = data.artists[key]
    let part2 = ""
    if(select === "new") {
        type = "New" 
        old = undefined
    }
    else old = `${oldData.name}, ${oldData.tag}, ${oldData.icon}`
    changeLog(type, 'Artist', 'name, tag, icon', old,`${artist}, ${tag}, ${icon}`)

    if(tag === undefined) data.artists[key] = {name: artist}
    else data.artists[key] = {name: artist, tag: tag, icon: icon}
    console.log(data)
}

function addImage(event){
    event.preventDefault();
    let artist = document.getElementById('artistSelect').value
    let file = document.getElementById('select').value

    let index = data.images.findIndex(image => image.file === file)
    console.log(index)
    if(index !== -1) {
        changeLog("modify", file, 'artist',data.images[index].artist, artist )
        data.images[index].artist = artist;
    } else {
        changeLog("create", file, "artist", artist)
        data.images.push({file: file, artist: artist});
    }
    console.log(data)
}

function selectChange(){
    console.log('Selection Changed')
    let value = document.getElementById('select').value
    let preview = document.getElementById('preview')
    preview.setAttribute('src', path+value)
    let status = document.getElementById('status')
    preview.onload = function() {
        status.innerHTML = ""
    }
    preview.onerror = function() {
        status.innerHTML = statusVals.error[404]
    }
    let button = document.getElementById('addImage')
   
    let index = data.images.findIndex(image => image.file === value)
    console.log(index)
    if(index !== -1) button.innerHTML = "Update Image"
    else button.innerHTML = "Add Image"

}

async function handleFileSelect(event){
    console.log(event)
    let fileList = event.target.files
    console.log(fileList)
    console.log(fileList.length)
    let status = document.getElementById('status')
    let preview = document.getElementById('preview')
    let check = document.getElementById('check')
    check.setAttribute('src', path+fileList[fileList.length - 1].name)
    check.onerror = function() {
        status.innerHTML = statusVals.error[404]
    }
    check.onload = function() {
        status.innerHTML = ""
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        preview.src = e.target.result;
    };
    reader.readAsDataURL(fileList[0]);

    
    let select = document.getElementById('select')
    for(let file of fileList){
        let selectItem = document.createElement('option')
        let child = select.appendChild(selectItem)
        child.setAttribute('value', file.name)
        child.innerHTML = file.name
    }
    select.value = fileList[fileList.length - 1].name

   

    let index = data.images.findIndex(image => image.file === fileList[fileList.length - 1].name)
    let button = document.getElementById('addImage')
    console.log(index)
    if(index !== -1) {
        button.innerHTML = "Update Image"
        document.getElementById('artistSelect').value = data.images[index].artist
    }


   
}

function changeLog(type, holder, key, old ,value) {
    let list = document.getElementById('changeLog')

    let line = document.createElement('li')
    let part2 = `=> "${value}"`
    if(!value) part2 = ""
    if(value === old) return;
    line.innerHTML = `${type}: ${holder} | ${key} "${old}" ${part2}`
    list.appendChild(line)
}