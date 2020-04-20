class Bullet{ 
    constructor(x,y,angle){
        this.pos = createVector(x,y)
        this.xVel = cos(angle) 
        this.yVel = sin(angle)
        this.flash = 0; 
        this.size = 20;
        this.speed=20;
        this.angle=angle;
        this.damage = 5;
        playerBullets.push(this);
        setShake(1,3)
    }
    update(){
        this.bounds();
        // check collision with enemy objects 
        enemies.forEach(enemy => this.collide(enemy))
        //make bullet flash colors 
        this.flash +=1; 
        if (this.flash % 2 === 0){
            fill(255,0,255,100)
            // fill(255,0,0,255)
        }
        if (this.flash % 2 === 1){
            fill(200,0,200,255) 
        }
        this.show()
    }
    // show(){
    //     this.pos.x+=this.xVel*this.speed;
    //     this.pos.y+=this.yVel*this.speed;
    //     // debugger
    //     noStroke();
    //     // ellipseMode(CENTER)
    //     ellipse(this.pos.x,this.pos.y,this.size,this.size)
    // }

    show(){
        this.pos.x+=this.xVel*this.speed;
        this.pos.y+=this.yVel*this.speed;
        // debugger
        noStroke();
        push()
            rectMode(CENTER)
            translate(this.pos.x,this.pos.y)
            rotate(this.angle)
            rect(0,0,this.size+50,this.size+5,20)
            fill(255,0,255,100)
            rect(0,0,this.size+20,this.size,20)
        pop()
        // ellipseMode(CENTER)
    }
    bounds(){
        if(
            this.pos.x > canvasWidth 
            || 
            this.pos.x < 0 
            || 
            this.pos.y > canvasHeight 
            || 
            this.pos.y < 0
        ){
            playerBullets = removeFromArray(this,playerBullets)
        }
    }
    // fire collision() when bullet has collided with an enemy 
    collision(obj){
        makeExplosions(this.pos.x,this.pos.y,5,50)
        obj.health -= this.damage
        playerBullets = playerBullets.filter(bullet => bullet !== this)
    }
    // function to check if this bullet has collided with something, usually an enemy 
    collide(obj){
        if (obj.shape === 'circle'){
            if (collideCircleCircle(this.pos.x,this.pos.y,this.size,obj.pos.x,obj.pos.y,obj.size)){
                console.log('collided')
                this.collision(obj)
                return true 
            }
        }else if(obj.shape === 'rect'){
            if (collideRectCircle(obj.pos.x,obj.pos.y,obj.size,obj.size,this.pos.x,this.pos.y,this.size)){
                return true 
            }
        }
    }
}