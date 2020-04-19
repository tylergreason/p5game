const testEnemies = []; 
class TestEnemy { 
    constructor(x,y){
        this.pos = createVector(x,y),
        this.speed = 2,
        this.size=20,
        this.timer = 0,
        this.angle=0,
        testEnemies.push(this)
    }
    // method for getting center of enemy 
    center(){
        return createVector(this.pos.x+(this.size/2),this.pos.y+(this.size/2))
    }
    update(){
        this.bounds()
        // move 
        this.timer +=1; 
        this.move()
        // turn around periodically 
        if (this.timer % 30 === 0){
            // fire bullet 
            let bullet = new EnemyBullet(this.pos.x,this.pos.y,player.x,player.y)
        }
        if (this.timer >=50){
            this.timer=0;
            this.changeMovement()
            // check angle to player 
            let angle = atan2(this.pos.y-player.y,this.pos.x-player.x)
            // console.log(angle)
        }
    }
    changeMovement(){
        this.angle = random(0,360)    
    }
    
    // make function for moving enemy 
    move(){
        this.pos.x += cos(this.angle)*this.speed
        this.pos.y += sin(this.angle)*this.speed
    }
    
    show(){
        fill(255,0,0)
        rect(this.pos.x,this.pos.y,this.size,this.size)
    }
    bounds(){
        if(this.pos.x > canvasWidth-this.size || this.pos.x < 0+this.size || this.pos.y > canvasHeight-this.size || this.pos.y < 0+this.size){
            this.pos.x = 200 
            this.pos.y = 200
        }
    }
}