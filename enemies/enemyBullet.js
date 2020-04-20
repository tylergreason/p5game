let enemyBullets = []
class EnemyBullet{
    constructor(xOrigin,yOrigin,xDestination,yDestination){
        this.xOrigin=xOrigin,
        this.yOrigin=yOrigin,
        this.pos = createVector(this.xOrigin,this.yOrigin),
        this.aimVariance = 50,
        this.xDestination=xDestination+random(this.aimVariance*-1,this.aimVariance),
        this.yDestination=yDestination+random(this.aimVariance*-1,this.aimVariance),
        this.speed=10,
        this.size=10,
        enemyBullets.push(this)
    }
    center(){
        return createVector(this.pos.x+(this.size/2),this.pos.y+(this.size/2))
    }
    // find and return angle to travel at 
    angle(){
        let angle = atan2(this.yDestination-this.yOrigin,this.xDestination-this.xOrigin)
        // console.log(angle) 
        return angle
    }
    update(){
        this.bounds()
        this.pos.x+=cos(this.angle())*this.speed; 
        this.pos.y+=sin(this.angle())*this.speed;
        this.show()
    }
    show(){
        fill(200,0,0)
        ellipse(this.pos.x,this.pos.y,20,20)
    }
    bounds(){
        if(
            // collide right side bounds
            (this.center().x+this.size/2) > canvasWidth
            ||
            // collide left side bounds
            this.center().x-this.size/2 < 0
            ||
            // collide bottom side bounds
            this.center().y+this.size/2 > canvasHeight
            ||
            // collide top side bounds
            this.center().y-this.size/2 < 0
        ){
            enemyBullets = enemyBullets.filter(obj => obj !== this)
        }
        if (collideCircleCircle(this.pos.x,this.pos.y,this.size,player.pos.x,player.pos.y,players[0].size)){
            enemyBullets = enemyBullets.filter(obj => obj !== this)
            makeExplosions(this.pos.x,this.pos.y,5,30)
            players[0].health -= 5;
        }
    }
    

}