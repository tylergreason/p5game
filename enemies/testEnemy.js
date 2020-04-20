const testEnemies = []; 
class TestEnemy { 
    constructor(x,y){
        this.pos = createVector(x,y),
        this.speed = 2,
        this.size=100,
        this.timer = 0,
        this.angle=0,
        this.rotate=0,
        testEnemies.push(this)
    }
    // method for getting center of enemy 
    center(){
        return createVector(this.pos.x+(this.size/2),this.pos.y+(this.size/2))
    }
    update(){
        this.bounds()
        this.rotateBody()
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
        push()
            translate(this.center().x,this.center().y)
            rotate(this.rotate) 
            // I do noooot know why I need to subtract half of this object's size 
            // to get it to draw centered, but that's what's needed. 

            ellipseMode(CENTER)
            rectMode(CENTER)
            rect(60,0,30,10)
            rect(-60,0,30,10)
            rect(0,60,10,30)
            rect(0,-60,10,30)
            fill(0,0,255)
            ellipse(0,0,this.size,this.size)
            
            // drawing circles to look cool 
            // fill(0,0,255) 
            // rect(0-this.size-10, 0-this.size/2, 10,10)
            // rect(0, 0-this.size/2, 10,10)
            // rect(60,0, 10,10)
            // rect(-0, -30, 10,10)
            // rect(-0, -0, 10,10)
        pop()
        fill(0,255,0)
        rectMode(CENTER)
        rect(this.pos.x+60,this.pos.y,10,10)
        rect(this.pos.x+60,this.pos.y+60,10,10)
        // rect(this.center().x,this.center().y,this.size-20,this.size-20)
    }
    bounds(){
        if(this.pos.x > canvasWidth-this.size || this.pos.x < 0+this.size || this.pos.y > canvasHeight-this.size || this.pos.y < 0+this.size){
            this.pos.x = 200 
            this.pos.y = 200
        }
    }
    // increase rotation 
    rotateBody(){
        if (this.rotate>=360){
            this.rotate=0;
        }
        this.rotate+=20;
    }
}