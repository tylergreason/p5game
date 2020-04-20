class Bullet{ 
    constructor(x,y,xVel,yVel){
        this.pos = createVector(x,y)
        this.xVel=xVel;
        this.yVel=yVel;
        this.flash = 0; 
        this.size = 40;
        this.speed=10;
        playerBullets.push(this);
        setShake(1,3)
    }
    update(){
        this.bounds();
        //make bullet flash colors 
        this.flash +=1; 
        if (this.flash % 2 === 0){
            fill(255,255,255,100)
            // fill(255,0,0,255)
        }
        if (this.flash % 2 === 1){
            fill(200,0,200,255) 
        }
        this.show()
    }
    show(){
        this.pos.x+=this.xVel*this.speed;
        this.pos.y+=this.yVel*this.speed;
        // debugger
        noStroke();
        // ellipseMode(CENTER)
        ellipse(this.pos.x,this.pos.y,this.size,this.size)
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
}