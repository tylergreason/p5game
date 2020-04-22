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
    // function to check collision for enemies that are either only a circle or only a rect
    collide(obj){
        if (this.shape === 'circle'){
            // check if player bullet collided with this enemy 
            if (obj.shape === 'circle'){
                if (collideCircleCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                    console.log('collided with horz enemy')
                    obj.collision();
                    this.collision(obj)
                    return true 
                }
            }else if(obj.shape === 'rect'){
                if (collideRectCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                    console.log('collided with horz enemy')
                    obj.collision();
                    this.collision(obj)
                    return true 
                }
            }
        }
        if (this.shape === 'rect'){
            // check if player bullet collided with this enemy 
            if (obj.shape === 'circle'){
                if (collideRectCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                    console.log('collided with horz enemy')
                    obj.collision();
                    this.collision(obj)
                    return true 
                }
            }else if(obj.shape === 'rect'){
                if (collideRectRect(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                    console.log('collided with horz enemy')
                    obj.collision();
                    this.collision(obj)
                    return true 
                }
            }
        }
    }
    collision(obj){
        this.health -= obj.damage;
    }
}

/* 
all enemies should have: 
pos x and y vector 
sizeX 
sizeY
speed 
health 


*/