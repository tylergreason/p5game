let playerBombs=[];

class Bomb {
    constructor(x,y,xVel,yVel){
        this.x = x; 
        this.y = y;
        this.xVel = xVel; 
        this.yVel = yVel;
        this.speed = 5; 
        this.size=5;
        // make drag variable to apply to speed so they slow over time 
        this.drag = 0.05; 
        // use a timer to decide when to explode 
        this.timer=30;
        playerBombs.push(this); 
    }
    update(){
        this.bounds()
        this.timer -=1;
        this.checkExplode()
        this.show()
    }
    show(){
        this.x += this.xVel * this.speed; 
        this.y += this.yVel * this.speed; 
        this.applyDrag()
        fill(0,255,0);
        ellipse(this.x,this.y,this.size)
    }
    bounds(){
        if(this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0){
            playerBombs = playerBombs.filter(obj => obj !== this)
        }
    }
    checkExplode(){
        if (this.timer <= 0){
            // create explosions where the bomb is, then remove it from the explosions array 
            makeExplosions(this.x,this.y,3,50)
            playerBombs = removeFromArray(this, playerBombs);
        }
    }
    applyDrag(){
        if (this.speed > 0){
            this.speed -= this.drag;
        }
    }
}