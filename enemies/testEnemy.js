const testEnemies = []; 
class TestEnemy { 
    constructor(x,y){
        this.pos = createVector(x,y),
        this.speed = 4,
        this.size=20,
        this.timer = 0,
        testEnemies.push(this)
    }
    // method for getting center of enemy 
    center(){
        return createVector(this.pos.x+(this.size/2),this.pos.y+(this.size/2))
    }
    update(){
        // move 
        this.timer +=1; 
        this.pos.x += this.speed; 
        if (this.timer >=100){
            this.speed *=-1 
            this.timer=0;
        }
    }
    show(){
        fill(255,0,0)
        rect(this.pos.x,this.pos.y,this.size,this.size)
    }

}