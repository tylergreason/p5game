let enemies = [];
class Enemy {
    constructor(x,y){
        this.pos = createVector(x,y)
    }
    // generic function to check health and run die function if below 0 
    checkHealth(){
        if (this.health <= 0){
            this.die()
        }
    }
    die(){

    }
    // maybe include bounds function later 
}

/* 
all enemies should have: 
pos x and y vector 
sizeX 
sizeY
speed 
health 


*/