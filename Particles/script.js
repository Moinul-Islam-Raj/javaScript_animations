/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const particleArray =[]
let isSpace = false
let framePlus = 2

const mouse = {
    x:undefined,
    y:undefined,
}

// canvas.addEventListener('mousedown',(e)=>{
//     mouse.x = e.x
//     mouse.y = e.y

//     // for (let i = 0; i < 20; i++) {
//     //     particleArray.push(new Particle())
//     // }
// })
canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x
    mouse.y = e.y

    // for (let i = 0; i < 10; i++) {
    //     particleArray.push(new Particle())
    // }
})
document.addEventListener('keypress',e => {
    if(e.key === ' '){
        isSpace = !isSpace
    }if(e.key === 'c' || e.key === 'C'){
        particleArray.splice(0,particleArray.length)
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }if(e.key === 's' || e.key === 'S'){
        particleArray.splice(0,particleArray.length)
        ctx.clearRect(0,0,canvas.width,canvas.height)
        mouse.x = undefined
        mouse.y = undefined
    }if(e.key === 'L' || e.key === 'l'){
        console.log(particleArray)
    }
})
window.addEventListener('resize',(e) => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})


class Particle{
    constructor(){
        this.x =mouse.x
        this.y = mouse.y
        this.size = Math.random() * 4 + 1
        this.speedX = Math.random() * 1 -0.5
        this.speedY = Math.random() * 1 -0.5
        this.frame = 1000
        this.color = 'hsl('+ this.frame +',100%,50%)'
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY

        if(this.size > 0.05) this.size-=0.03
        this.frame+=isSpace ? 10 : 3
        this.color = 'hsl('+ this.frame +',100%,50%)'
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
    }
}


function animate(){
    ctx.fillStyle = 'rgba(0,0,0,.02)'
    if(!isSpace)ctx.fillRect(0,0,canvas.width,canvas.height)
    else{ctx.clearRect(0,0,canvas.width,canvas.height)}
    if(mouse.x != undefined && mouse.y != undefined)
        for (let i = 0; i < (isSpace ? 30 : 20); i++) {
            particleArray.push(new Particle())
        }

    for (let i = 0; i < particleArray.length; i++) {
        const element = particleArray[i];
        element.update()
        element.draw()

        if (element.size <= 1){particleArray.splice(i,1);i--}
    }

    requestAnimationFrame(animate)
}
animate()