/** @type {HTMLCanvasElement} */
window.addEventListener('load',() =>
{   document.getElementById('span').innerHTML = document.getElementById('range').value
    let iNum = Number(document.getElementById('span').innerHTML)
    document.getElementById('range').addEventListener('change',(e)=>{
        document.getElementById('span').innerHTML = document.getElementById('range').value
        iNum = Number(document.getElementById('span').innerHTML)
    })
    


    const canvas = document.getElementById('canvas-1')
    const ctx = canvas.getContext('2d')
    canvas.height = 1000
    canvas.width = 1000

    const enemyCount = 10
    let enemies = []

    class Enemy{
        constructor(){
            this.image = new Image()
            this.image.src = 'enemy_ghost_1.png'
            this.spriteHeight = 177
            this.spriteWidth = Math.floor(1308/6)
            this.frameX = 0
            this.maxFrame = 5
            this.gameFrame = 0
            this.width = this.spriteWidth / 2
            this.height = this.spriteHeight/ 2
            // this.x = Math.random() * (canvas.width-this.width)
            // this.y = canvas/2/*Math.random() * (canvas.height-this.height)*/
            this.angle = 0
            this.angleIncrese = Math.random() * 2
            this.speed = Math.random() * 10+190
        }
        update(){
            this.x =this.speed*2* Math.sin(this.angle * Math.PI/iNum) + (canvas.width/2-this.width/2)
            this.y = this.speed*2*Math.cos(this.angle * Math.PI/100) + (canvas.height/2-this.height/2)

            this.angle+= this.angleIncrese

            if(this.gameFrame % 3 === 0)this.frameX >= this.maxFrame ? this.frameX = 0 : this.frameX++
            this.gameFrame++
        }
        draw(){
            ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
        }
    }
    for (let i = 0; i < enemyCount; i++) {
        enemies.push(new Enemy())
    }
    let realGameFrame = 0
    function animate(){
        if(realGameFrame % 2200 === 0)ctx.clearRect(0,0,canvas.width,canvas.height)

        enemies.forEach(e=>{
            e.update()
            e.draw()
        })
        realGameFrame++
        requestAnimationFrame(animate)
    }
    animate()
})