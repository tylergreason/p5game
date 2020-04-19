let enemyBullets = []
class EnemyBullet{
    constructor(xOrigin,yOrigin,xDestination,yDestination){
        this.xOrigin=xOrigin,
        this.yOrigin=yOrigin,
        this.pos = createVector(this.xOrigin,this.yOrigin),
        this.xDestination=xDestination,
        this.yDestination=yDestination,
        this.speed=10,
        this.size=10,
        enemyBullets.push(this)
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
    }
    show(){
        fill(0,0,0)
        ellipse(this.pos.x,this.pos.y,20,20)
    }
    bounds(){
        if(this.pos.x > canvasWidth || this.pos.x < 0 || this.pos.y > canvasHeight || this.pos.y < 0){
            enemyBullets = enemyBullets.filter(obj => obj !== this)
        }
    }

}