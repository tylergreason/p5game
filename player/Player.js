let players = []; 
class Player {
    constructor(x,y){
        this.pos = createVector(x,y),
        this.size = 20,
        this.health = 100, 
        this.centerX = this.pos.x+this.size/2,
        this.centerY = this.pos.y+this.size/2,
        this.speed = 5, 
        this.reloadMax = 5, 
        this.reloadCurrent = 3,
        this.gunType = 'bomb',
        players.push(this)
    }
    center(){
        return {
            x:this.pos.x+this.size/2,
            y:this.pos.y+this.size/2
        }
    }
    update(){
        this.controls()
        this.bounds()
        this.drawStats()
        this.reloadCurrent +=1; 
        if (this.reloadCurrent >= this.reloadMax){
            this.reloadCurrent=this.reloadMax
        }
        this.show()
    }

    show(){
        fill(0)
        ellipse(this.pos.x,this.pos.y,this.size,this.size); 
        fill(255)
        rect(this.pos.x,this.pos.y,1,1)
    }   
    
    bounds(){
        if (this.pos.x+this.size/2 >= canvasWidth){
            this.pos.x = canvasWidth-this.size/2
        }
        if (this.pos.x-this.size/2 <= 0){
            this.pos.x = 0+this.size/2
        }
        if (this.pos.y <= 0){
            this.pos.y = 0+this.size/2;
        }
        if (this.pos.y+this.size >= canvasHeight){
            this.pos.y = canvasHeight-this.size/2
        }
    }
    
    drawStats(){
        textSize(32) 
        fill(0)
        text(`HP: ${this.health}`, 10,32)        
    }

    controls = () => {
    // fix diagonal movement later to be like shooting directions 
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(keyCodes.d)){
        this.pos.x += this.speed; 
    }
    if(keyIsDown(LEFT_ARROW) || keyIsDown(keyCodes.a)){
        this.pos.x -= this.speed; 
    }
    if(keyIsDown(UP_ARROW) || keyIsDown(keyCodes.w)){
        this.pos.y -= this.speed; 
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(keyCodes.s)){
        this.pos.y += this.speed; 
    }
    // shooting 
    // check to see if this is reloaded 
    if (this.reloadCurrent === this.reloadMax){
        if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.k.keyCode)){
            this.shoot(135)
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.i.keyCode)){
            this.shoot(270-45)
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.i.keyCode)){
            this.shoot(270+45)
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.k.keyCode)){
            this.shoot(45)
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.i.keyCode)){
            this.shoot(-90);
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode)){
            this.shoot(0);
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.k.keyCode)){
            this.shoot(-270);
            this.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.j.keyCode)){
            this.shoot(180);
            this.reloadCurrent = 0; 
        }
        }
    }
    shoot = (angle) => {
        // given an angle, find the x and y vector the bullet should follow
        const xVector = cos(angle) 
        const yVector = sin(angle)
        if (this.gunType === 'bullet'){
            new Bullet(center(this).x,center(this).y,xVector,yVector)
        }
        if (this.gunType === 'bomb'){
            new Bomb(this.pos.x,this.pos.y,xVector,yVector)
            // console.log(thisBombs)
        }
    }
}