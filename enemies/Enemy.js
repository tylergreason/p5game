let enemies = [];
class Enemy {
    constructor(x,y){
        this.pos = createVector(x,y),
        this.hitBoxes=[]
        enemies.push(this)
    }
    // generic function to check health and run die function if below 0 
    checkHealth(){
        if (this.health <= 0){
            this.die()
        }
    }
    die(){

    }
    drawHitBoxes(){
        rectMode(CORNER)
        this.hitBoxes.forEach(hitBox => {
            if (hitBox.shape === 'rect'){
                return rect(this.pos.x+hitBox.x,this.pos.y+hitBox.y,hitBox.sizeX,hitBox.sizeY)
            }
            if(hitBox.shape === 'circle'){
                return ellipse(this.pos.x+hitBox.x,this.pos.y+hitBox.y,hitBox.sizeX,hitBox.sizeY)
            }
        })
    }
    // collide() checks each hitBox object in this enemies' hiBox array and compares its shape to the shape of the object it wants to know if it collided with. Currently only circles and rectangles are supported.
    collide(obj){
        this.hitBoxes.forEach(hitBox =>{
            if (hitBox.shape === 'circle'){
                if (obj.shape === 'circle'){
                    if (collideCircleCircle(hitBox.x + this.pos.x,hitBox.y + this.pos.y,hitBox.sizeX,hitBox.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                        obj.collision();
                        this.collision(obj)
                        return true 
                    }
                }
                if (obj.shape === 'rect'){
                    if (collideRectCircle(obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY,hitBox.x + this.pos.x,hitBox.y + this.pos.y,hitBox.sizeX,hitBox.sizeY)){
                        obj.collision();
                        this.collision(obj)
                        return true 
                    }
                }
            }
            if (hitBox.shape === 'rect'){
                if (obj.shape === 'rect'){
                    if (collideRectRect(hitBox.x + this.pos.x,hitBox.y + this.pos.y,hitBox.sizeX,hitBox.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                        obj.collision();
                        this.collision(obj)
                        return true 
                    }
                }
                if (obj.shape === 'circle'){
                    if (collideRectCircle(hitBox.x + this.pos.x,hitBox.y + this.pos.y,hitBox.sizeX,hitBox.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
                        obj.collision();
                        this.collision(obj)
                        return true 
                    }
                }
            }
        })

        // old collision code 

        // if (this.shape === 'circle'){
        //     // check if player bullet collided with this enemy 
        //     if (obj.shape === 'circle'){
        //         if (collideCircleCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
        //             console.log('collided with horz enemy')
        //             obj.collision();
        //             this.collision(obj)
        //             return true 
        //         }
        //     }else if(obj.shape === 'rect'){
        //         if (collideRectCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
        //             console.log('collided with horz enemy')
        //             obj.collision();
        //             this.collision(obj)
        //             return true 
        //         }
        //     }
        // }
        // if (this.shape === 'rect'){
        //     // check if player bullet collided with this enemy 
        //     if (obj.shape === 'circle'){
        //         if (collideRectCircle(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
        //             console.log('collided with horz enemy')
        //             obj.collision();
        //             this.collision(obj)
        //             return true 
        //         }
        //     }else if(obj.shape === 'rect'){
        //         if (collideRectRect(this.pos.x,this.pos.y,this.sizeX,this.sizeY,obj.pos.x,obj.pos.y,obj.sizeX,obj.sizeY)){
        //             obj.collision();
        //             this.collision(obj)
        //             return true 
        //         }
        //     }
        // }
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