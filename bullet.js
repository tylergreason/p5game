class Bullet{ 
    constructor(x,y,xVel,yVel){
        this.x = x; 
        this.y = y;
        this.xVel=xVel;
        this.yVel=yVel;
        this.flash = 0; 
        this.size = 40;
        this.speed=10;
        playerBullets.push(this);
    }
    update(){
        //make bullet flash colors 
        this.flash +=1; 
        if (this.flash > 0){
            fill(255,0,0,255)
            // this.flash=0;
        }
        if (this.flash > 1){
            fill(0,0,255,255) 
            this.flash=0;
        }
        this.bounds();
        if(collideRectCircle(200,200,100,150,this.x,this.y,this.size,this.size)){
            playerBullets = playerBullets.filter(bullet => bullet !== this)
        }

    }
    show(){
        this.x+=this.xVel*this.speed;
        this.y+=this.yVel*this.speed;
        // debugger
        noStroke();
        // fill(255,0,0)    
        ellipse(this.x,this.y,this.size,this.size)
    }

    bounds(){
        if(this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0){
            playerBullets = removeFromArray(this,playerBullets)
        }
    }
}