/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const mouse = {
    x:undefined,
    y:undefined,
}
const particlesArray = []

canvas.addEventListener('mousemove',(e) => {
    mouse.x = e.x
    mouse.y = e.y

    for (let i = 0; i < 5;i++) {
        particlesArray.push(new Particle())
    }
})

window.addEventListener('resize',() => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})

class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 7 + 2
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY

        if(this.size > 1)this.size-= 0.04
    }
    draw(){
        ctx.fillStyle = 'rgba(0,200,255,0.6)'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
    }
}

function init() {
    for(i = 0; i < particlesArray.length;i++){
        particlesArray[i].update()
        particlesArray[i].draw()

        if(particlesArray[i].size <= 4){
            particlesArray.splice(i,1)
            i--
        }        
    }
    // particlesArray.forEach((p,i) => {
    //     p.update()
    //     p.draw()

    //     if(particlesArray[i].size <= 5){
    //         particlesArray.splice(i,1)
    //     }
    // })
}
function connect(){
    for(i = 0;i<particlesArray.length;i++){
        for(j = 0; j<particlesArray.length;j++){
            let dx = particlesArray[i].x - particlesArray[j].x
            let dy = particlesArray[i].y - particlesArray[j].y
            let distance = Math.sqrt(dx*dx + dy*dy)

            if(distance< 40){
                ctx.strokeStyle = 'rgba(0,255,255,0.2)'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x,particlesArray[j].y)
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

        requestAnimationFrame(animate)
    }
    animate()

})