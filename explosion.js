class Explosion {
    constructor(x,y,size){
        this.x = x+random(-10,10); 
        this.y = y+random(-10,10);
        this.size=size+random(0,size*0.5);
        this.timer=50;
        explosions.push(this); 
    }
    update(){
        this.timer -=1;
        this.checkTimer()
        this.show()
    }
    show(){
        noStroke();
        // give the explosion a flashing animation using modulos 
        if (this.timer % 3 === 0){
            fill(255,0,0,255)
        }
        if (this.timer % 3 === 1){
            fill(255,255,255,0)
        }
        if (this.timer % 3 === 2){
            fill(255,200,200,200);
        }
        ellipse(this.x,this.y,this.size)
    }
    checkTimer(){
        if (this.timer <= 0){
            explosions = removeFromArray(this, explosions);
        }
    }
}