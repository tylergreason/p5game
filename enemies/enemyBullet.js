let enemyBullets = []
class EnemyBullet{
    constructor(xOrigin,yOrigin,xDestination,yDestination){
        this.xOrigin=xOrigin,
        this.yOrigin=yOrigin,
        this.pos = createVector(this.xOrigin,this.yOrigin),
        this.aimVariance = 20,
        this.timer = 0, 
        this.xDestination=xDestination+random(this.aimVariance*-1,this.aimVariance),
        this.yDestination=yDestination+random(this.aimVariance*-1,this.aimVariance),
        this.angle = findAngle(this.yDestination,this.yOrigin,this.xDestination,this.xOrigin)
        this.speed=10,
        this.size=10,
        this.sizeX=this.size,
        this.sizeY=this.size,
        this.damage=1,
        this.shape = 'circle',
        enemyBullets.push(this)
    }
    update(){
        this.increaseTimer()
        this.bounds()
        this.move()
        this.collide()
        this.show()
    }
    show(){
        fill(200,0,0)
        ellipseMode(CORNER)
        ellipse(this.pos.x,this.pos.y,this.sizeX,this.sizeY)
    }

    move(){
        this.pos.x+=cos(this.angle)*this.speed; 
        this.pos.y+=sin(this.angle)*this.speed;
    }

    increaseTimer(){
        this.timer +=1; 
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
    }

    collide(){
        players.forEach(player => {
            if (player.collide(this)){
                enemyBullets = enemyBullets.filter(obj => obj !== this)
                makeExplosions(this.pos.x,this.pos.y,5,30)
                player.damagePlayer(this.damage)
            }
        })

    }
    
    

}