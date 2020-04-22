let playerBombs=[];

class Bomb {
    constructor(x,y,angle){
        this.pos = createVector(x,y),
        this.angle = angle,
        this.speed = 5,
        this.size=5,
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
        this.pos.x += cos(this.angle)*this.speed;
        this.pos.y += sin(this.angle)*this.speed;
        this.applyDrag()
        fill(0,255,0);
        ellipse(this.pos.x,this.pos.y,this.size)
    }
    bounds(){
        if(this.pos.x > canvasWidth || this.pos.x < 0 || this.pos.y > canvasHeight || this.pos.y < 0){
            playerBombs = playerBombs.filter(obj => obj !== this)
        }
    }
    checkExplode(){
        if (this.timer <= 0){
            // create explosions where the bomb is, then remove it from the explosions array 
            makeExplosions(center(this).x,center(this).y,3,50)
            playerBombs = playerBombs.filter(obj => obj !== this)
            // playerBombs = removeFromArray(this, playerBombs);
        }
    }
    applyDrag(){
        if (this.speed > 0){
            this.speed -= this.drag;
        }
    }
}