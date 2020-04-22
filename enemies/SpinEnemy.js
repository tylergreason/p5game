class SpinEnemy extends Enemy { 
    constructor(x,y){
        super(x,y)
        this.pos = createVector(x,y),
        this.speed = 5,
        this.size=30,
        this.sizeX=this.size,
        this.sizeY=this.size,
        this.timer = 0,
        this.angle=270,
        this.rotate=0,
        this.fireRate = 10,
        this.shape = 'circle',
        this.health = 10,
        this.hitBoxes.push({shape:'circle',x:0,y:0,sizeX:this.sizeX,sizeY:this.sizeY}),
        enemies.push(this)
    }
    // method for getting center of enemy 
    center(){
        return createVector(this.pos.x+(this.sizeX/2),this.pos.y+(this.sizeY/2))
    }
    update(){
        this.checkHealth()
        this.bounds()
        this.rotateBody()
        // move 
        this.timer +=1; 
        this.move()
        this.fire()
        // turn around periodically 
        this.movementTimer()
        this.show()
    }
    changeMovement(){
        this.angle = random(0,360)   
    }
    movementTimer(){
        if (this.timer >=100){
            this.timer=0;
            this.changeMovement()
            // check angle to player 
            // let angle = atan2(this.pos.y-player.y,this.pos.x-player.x)
            // console.log(angle)
        }
    }
    
    // make function for moving enemy 
    move(){
        this.pos.x += cos(this.angle)*this.speed
        this.pos.y += sin(this.angle)*this.speed
    }
    
    show(){
        fill(255,0,0)
        push()
            translate(center(this).x,center(this).y)
            fill(0)
            rotate(this.rotate) 
            ellipseMode(CENTER)
            rectMode(CENTER)
            rect(60,0,30,10)
            rect(-60,0,30,10)
            rect(0,60,10,30)
            rect(0,-60,10,30)
            rotate(45)
                rect(80,0,60,10)
                    rotate(90)
                    rect(80,0,60,10)
                        rotate(90)
                        rect(80,0,60,10)
                            rotate(90)
                            rect(80,0,60,10)
            rotate(45)
            fill(0,0,255)

            // this is the main body, drawn at 0,0 because we translated to that coordinate 
            // ellipseMode(CORNER)
            ellipse(0,0,this.sizeX,this.sizeY)
        pop()
        fill(0,255,0)
        ellipseMode(CORNER)
        rectMode(CORNER)
        // this.drawHitBoxes()
        
        // reset ellipse and rect draw modes 
    }
    bounds(){
        // collide right side bounds
        if((this.center().x+this.sizeX/2) > canvasWidth){
            this.angle = random(91,269)
        }
        // collide left side bounds
        if (this.center().x-this.sizeX/2 < 0){
            this.angle = random(271,449)
        }
        // collide bottom side bounds
        if(this.center().y+this.sizeY/2 > canvasHeight){
            this.angle = random(181,359)
        } 
        // collide top side bounds
        if (this.center().y-this.sizeY/2 < 0){
            this.angle = random(1,179)
        }
    }
    // increase rotation 
    rotateBody(){
        this.rotate+=5;
    }
    fire(){
        if (this.timer % this.fireRate === 0){
            // fire bullet 
            let bullet = new EnemyBullet(center(this).x,center(this).y,player.pos.x,player.pos.y)
        }
    }
    checkHealth(){
        if (this.health <= 0){
            this.die();
        }
    }
    die(){
        makeExplosions(center(this).x,center(this).y,15,this.sizeX*5) 
            setShake(10,10)
            enemies = enemies.filter(enemy => enemy !== this)
    }
    
}