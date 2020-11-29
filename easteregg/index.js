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
class Enemy {
    // to create an enemy:
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    // to show the enemies at screen:
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    // to draw the enemies:
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width/2
const y = canvas.height/2
const player = new Player(x, y, 10, 'white')
player.draw()

// to store the projectiles and enemies:
const projectiles = []
const enemies = []

function spawnEnemies(){
    setInterval( () => {
        // to create random enemies but not too small enemies:
        const radius = Math.random() * (30 - 4) + 4
        let x
        let y

        if(Math.random() < 0.5 ){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
            // y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }else{
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
            )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

let animationId
function animate(){
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0 , 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.font = "30px Arial";
    c.fillStyle = "red";
    c.fillText("Congrats! You found an easter egg!", 50, 50);
    player.draw()
    
    projectiles.forEach((projectile, index) => {
        projectile.update()
        // remove projectiles from edges of screen:
        if(
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
            ){
        setTimeout(() => {
            projectiles.splice(index, 1)
        }, 0)
        }
    })
    enemies.forEach((enemy, index) => {
        enemy.update()
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        // when touch an enemy:
        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId)
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            // when touch an enemy:
            if(dist - enemy.radius - projectile.radius < 1){
                if(enemy.radius > 10){
                    enemy.radius -= 10
                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }else{
                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
            }
        });
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
        )
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    console.log(velocity)

    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            '5',
            'white',
            velocity
        )
    )
})

animate()
spawnEnemies()