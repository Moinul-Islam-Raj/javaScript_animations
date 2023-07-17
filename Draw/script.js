/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas-1')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const mouse = {
    x:undefined,
    y:undefined,
}

let isDrawing = false
let isEraser = false
let colorIndex = Math.random() * 10000
let width = 1
let color = 'hsl('+colorIndex+',100%,50%)'

document.getElementById('width').addEventListener('change',(e) => {
    width = e.target.value
})

window.addEventListener('resize',() => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
})
window.addEventListener('keypress',(e) => {
    if(e.key === 'c'){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    if(e.key === 'e'){
        isEraser = !isEraser
    }
})

canvas.addEventListener('mousedown',(e) => {
    isDrawing = true
    mouse.x = e.x
    mouse.y = e.y
})
canvas.addEventListener('mouseup',(e) => {
    isDrawing = false
    mouse.x = e.x
    mouse.y = e.y
    color = 'hsl('+colorIndex+',100%,50%)'
    ctx.beginPath(mouse.x,mouse.y)
    ctx.closePath()
})
canvas.addEventListener('mousemove',(e) => {
    mouse.x = e.x
    mouse.y = e.y
})

window.addEventListener('load',() => {

    const animate = function(){

        if(isEraser){
            color = 'white'
            ctx.lineWidth = width
        }else{
            ctx.lineWidth = width
        }
        ctx.strokeStyle = color
        if(isDrawing){
            ctx.lineTo(mouse.x,mouse.y)
            ctx.stroke()
        }

        colorIndex = Math.random() * 10000
        requestAnimationFrame(animate)
    }
    animate()

})