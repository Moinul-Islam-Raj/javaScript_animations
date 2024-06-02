/** @type {HTMLCanvasElement} */

const img = new Image()
img.src = './kivy-icon-512.png'

const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight - 5
canvas.width = window.innerWidth - 5

const mouse = {
    x:undefined,
    y:undefined,
}

let pArray = []
let frame = 300
ctx.fillStyle = 'hsl(' + frame + ',100%,50%)'
ctx.strokeStyle = 'white'
let data1
let aX = 150
let aY = -100

canvas.addEventListener('mousemove',(e) => {
    mouse.x = e.x
    mouse.y = e.y
})

window.addEventListener('resize',() => {
    canvas.height = window.innerHeight - 5
    canvas.width = window.innerWidth - 5
})

function first(text){
    ctx.font ='40px sans-serif'
    ctx.fillText(text.toString(),40,40)
    //ctx.drawImage(img,0,0,canvas.width,canvas.height)
    data1 = ctx.getImageData(0,0,canvas.width,canvas.width)
}
first('@The_Raj)')

class Particle {
    constructor(x,y,r,g,b){
        this.r = r
        this.g = g
        this.b = b
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = 2.5
        this.weight = (Math.random() * 1 + 0.5)
    }
    update(){

    }
    draw(){
        ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
    }
}
for(let y = 0;y < data1.height;y++){
    for(let x = 0; x < data1.width; x++){
        let yVal = (data1.data.length/data1.width) * y
        let dataVal = data1.data[x*4 + (yVal) -1]
        if(dataVal > 128){
            pArray.push(new Particle(x*7 - aX,y*7 - aY,40,40,20))
        }
    }
}

function init() {
    for(let i = 0; i < pArray.length; i++){
        pArray[i].update()
        pArray[i].draw()

        let dx = pArray[i].x - mouse.x
        let dy = pArray[i].y - mouse.y
        let distance = Math.sqrt(dx*dx + dy*dy)
        let force = ((distance - 100) /distance)
        if(force<=5){force = 5}

        if (distance < 100){
            pArray[i].x += dx/force/pArray[i].weight
            pArray[i].y += dy/force/pArray[i].weight
        }
        else if(pArray[i].baseX !== pArray[i].x && pArray[i].baseY !== pArray[i].y && distance > 110){
            let dx = pArray[i].baseX - pArray[i].x
            let dy = pArray[i].baseY - pArray[i].y
            let distance = Math.sqrt(dx*dx + dy*dy)

            pArray[i].x += dx/100
            pArray[i].y += dy/100
        }
    }
}
function connect(){
    for (let i = 0; i < pArray.length; i++) {
        const element = pArray[i];

        for (let j = i; j < pArray.length; j++) {
            const element_2 = pArray[j];
            
            let dx = element.x - element_2.x
            let dy = element.y - element_2.y
            let distance = Math.sqrt(dx*dx + dy*dy) 

            if(distance < 15){
                ctx.strokeStyle = 'hsl('+frame+',100%,75%)'
                ctx.lineWidth = 0.9
                ctx.beginPath()
                ctx.moveTo(element.x,element.y)
                ctx.lineTo(element_2.x,element_2.y)
                ctx.stroke()
            }
        }
    }
}

window.addEventListener('load',() => {

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height)

        init()
        connect()

        frame+=1.5
        ctx.fillStyle = 'hsl(' + frame + ',100%,40%)'
        requestAnimationFrame(animate)
    }
    animate()

})
