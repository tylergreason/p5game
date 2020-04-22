let enemyBullets = []
class EnemyBullet{
    constructor(xOrigin,yOrigin,xDestination,yDestination){
        this.xOrigin=xOrigin,
        this.yOrigin=yOrigin,
        this.pos = createVector(this.xOrigin,this.yOrigin),
        this.aimVariance = 20,
        this.xDestination=xDestination+random(this.aimVariance*-1,this.aimVariance),
        this.yDestination=yDestination+random(this.aimVariance*-1,this.aimVariance),
        this.angle = findAngle(this.yDestination,this.yOrigin,this.xDestination,this.xOrigin)
        this.speed=10,
        this.size=10,
        this.damage=5,
        this.shape = 'circle',
        enemyBullets.push(this)
    }
    update(){
        this.bounds()
        this.pos.x+=cos(this.angle)*this.speed; 
        this.pos.y+=sin(this.angle)*this.speed;
        this.show()
    }
    show(){
        fill(200,0,0)
        ellipse(this.pos.x,this.pos.y,20,20)
    }
    bounds(){
        if(
            // collide right side bounds
            (center(this).x+this.size/2) > canvasWidth
            ||
            // collide left side bounds
            center(this).x-this.size/2 < 0
            ||
            // collide bottom side bounds
            center(this).y+this.size/2 > canvasHeight
            ||
            // collide top side bounds
            center(this).y-this.size/2 < 0
        ){
            enemyBullets = enemyBullets.filter(obj => obj !== this)
        }
        players.forEach(player => {
            if (player.collide(this)){
                enemyBullets = enemyBullets.filter(obj => obj !== this)
                makeExplosions(this.pos.x,this.pos.y,5,30)
                player.damagePlayer(this.damage)
            }
        })
        // if (collideCircleCircle(this.pos.x,this.pos.y,this.size,player.pos.x,player.pos.y,player.size)){
        //     enemyBullets = enemyBullets.filter(obj => obj !== this)
        //     makeExplosions(this.pos.x,this.pos.y,5,30)
        //     players[0].health -= 5;
        // }
    }
    

}