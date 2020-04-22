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
        this.gunArray = ['bullet','bomb']
        this.gunArrayPosition = 0, 
        this.gunType = this.gunArray[this.gunArrayPosition],
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
        // moved to display.js
        // this.drawStats()
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
        if (this.pos.y-this.size/2 <= 0){
            this.pos.y = 0+this.size/2;
        }
        if (this.pos.y+this.size/2 >= canvasHeight){
            this.pos.y = canvasHeight-this.size/2
        }
    }
    
    drawStats(){
        textSize(32) 
        fill(0)
        text(`HP: ${this.health}`, 10,32)
        text(`Weapon: ${this.gunType}`, 10,64)
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
        // if (keyIsDown(keys.space.keyCode)){
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
    // }
    }
    shoot = (angle) => {
        
        // given an angle, find the x and y vector the bullet should follow
        if (this.gunType === 'bullet'){
            new Bullet(center(this).x,center(this).y,angle)
        }
        if (this.gunType === 'bomb'){
            new Bomb(this.pos.x,this.pos.y,angle)
            // console.log(thisBombs)
        }
    }

    collide(obj){
        if (obj.shape === 'circle'){
            if (collideCircleCircle(this.pos.x,this.pos.y,this.size,obj.pos.x,obj.pos.y,obj.size)){
                return true 
            }
        }else if(obj.shape === 'rect'){
            if (collideRectCircle(obj.pos.x,obj.pos.y,obj.size,obj.size,this.pos.x,this.pos.y,this.size)){
                return true 
            }
        }
    }
    damage(value){
        this.health -= value; 
    }
    switchWeapon(key){
        if (key === 'o'){
            this.gunArrayPosition += 1; 
            console.log(this.gunType)
            console.log(this.gunArrayPosition)
            if (this.gunArrayPosition >= this.gunArray.length){
                this.gunArrayPosition = 0; 
            }
        }
        if (key === 'u'){
            this.gunArrayPosition -= 1; 
            console.log(this.gunType)
            if (this.gunArrayPosition < 0){
                this.gunArrayPosition = this.gunArray.length-1; 
            }
        }
        this.gunType = this.gunArray[this.gunArrayPosition]
    }

}