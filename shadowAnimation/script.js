
/**@type {HTMLCanvasElement} */
let fpms = 11 - document.getElementById('speed').value
let state = 'still'

document.getElementById('speed-show').innerHTML = document.getElementById('speed').value

document.getElementById('speed').addEventListener('change',(e) => {
    document.getElementById('speed-show').innerHTML = document.getElementById('speed').value
    fpms = 11 - document.getElementById('speed').value
})
document.getElementById('choose').addEventListener('change',(e) => {
    state = e.target.value
})

const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
const canvas_height = canvas.height = 600;
const canvas_width = canvas.width = 600;

const IMAGE = new Image();IMAGE.src = 'shadow_dog.png'
const frameWidth = 575
const frameHeight = 523


let frame = 0

//////////////////////
let wolf = []
//////////////////////
let frames = [
    {
        name:'still',
        slides:7,
    },
    {
        name:'jump',
        slides:7,
    },
    {
        name:'fall',
        slides:7,
    },
    {
        name:'run',
        slides:9,
    },
    {
        name:'dizzy',
        slides:11,
    },
    {
        name:'sit',
        slides:5,
    },
    {
        name:'roll',
        slides:7,
    },
    {
        name:'byte',
        slides:7,
    },
    {
        name:'ko',
        slides:12,
    },
    {
        name:'gethit',
        slides:4,
    }
]
Array.from(frames).forEach((e,i) => {
    let positionX
    let positionY
    let loc = []
    for (let j = 0; j < e.slides; j++) {
        positionX = j * frameWidth
        positionY = i*frameHeight
        
        loc.push({x:positionX,y:positionY})
    }
    wolf[e.name] = {loc:loc}
})
///////////////////////

function animate(){
    ctx.clearRect(0,0,canvas_width,canvas_height)

    let position = Math.floor(frame/fpms) % wolf[state].loc.length
    let frameX = wolf[state].loc[position].x
    let frameY = wolf[state].loc[position].y

    ctx.drawImage(IMAGE,frameX,frameY,frameWidth,frameHeight,0,0,frameHeight,frameWidth)

    frame++
    requestAnimationFrame(animate)
}
animate()