/* CONSTS */
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')

canvas.width  = innerWidth
canvas.height = innerHeight

class Player {
    // to create the player:
    constructor(x, y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    // to show the player at screen:
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}
class Projectile {
    // to create shoots:
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    // to show the shoots at screen:
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    // to draw the path of the shoot:
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width/2
const y = canvas.height/2
const player = new Player(x, y, 30, 'blue')
player.draw()

// to store the projectiles:
const projectiles = []

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile) => {
        projectile.update()
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
        )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    console.log(velocity)

    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            '5',
            'red',
            velocity
        )
    )
})

animate()