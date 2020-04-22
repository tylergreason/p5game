let players = []; 
class Player {
    constructor(x,y){
        this.pos = createVector(x,y),
        this.size = 20,
        this.sizeX=20,
        this.sizeY=20,
        this.health = 100, 
        this.centerX = this.pos.x+this.size/2,
        this.centerY = this.pos.y+this.size/2,
        this.speed = 5, 
        this.reloadMax = 5, 
        this.reloadCurrent = 3,
        this.gunArray = ['bullet','bomb']
        this.gunArrayPosition = 0, 
        this.aimAngle = -90,
        this.moveAngle = 0, 
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
        ellipse(center(this).x,center(this).y,this.size,this.size); 
        fill(255)
        rect(center(this).x,center(this).y,1,1)

        // draw aiming indicator
        push() 
            translate(center(this).x,center(this).y);
            rotate(this.aimAngle); 
            fill(255,0,0); 
            // triangle(this.sizeX-10, this.sizeY,this.sizeX-10, -this.sizeY, 30, 0)
            ellipse(20,0,10,10)
        pop()
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
        textSize(26) 
        fill(0)
        text(`HP: ${this.health}`, 10,32)   
        text(`Weapon: ${this.gunType}`, 10,64)
    }

    controls = () => {
        this.movementControls()
        this.shootingControls()
    }
    
    movementControls(){
        // fix diagonal movement later to be like shooting directions 
        // if(keyIsDown(RIGHT_ARROW) || keyIsDown(keyCodes.d)){

        //     this.pos.x += this.speed; 
        // }
        // if(keyIsDown(LEFT_ARROW) || keyIsDown(keyCodes.a)){
        //     this.pos.x -= this.speed; 
        // }
        // if(keyIsDown(UP_ARROW) || keyIsDown(keyCodes.w)){
        //     this.pos.y -= this.speed; 
        // }
        // if(keyIsDown(DOWN_ARROW) || keyIsDown(keyCodes.s)){
        //     this.pos.y += this.speed; 
        // }
        if (keyIsDown(keys.a.keyCode) && keyIsDown(keys.s.keyCode)){
            this.moveAngle = 135
            this.move()
        }
        else if (keyIsDown(keys.a.keyCode) && keyIsDown(keys.w.keyCode)){
            this.moveAngle = 225
            this.move()
        }
        else if (keyIsDown(keys.d.keyCode) && keyIsDown(keys.w.keyCode)){
            this.moveAngle = 315
            this.move()
        }
        else if (keyIsDown(keys.d.keyCode) && keyIsDown(keys.s.keyCode)){
            this.moveAngle = 45
            this.move()
        }
        else if (keyIsDown(keys.w.keyCode)){
            this.moveAngle = 270
            this.move()
        }
        else if (keyIsDown(keys.d.keyCode)){
            this.moveAngle = 0
            this.move()
        }
        else if (keyIsDown(keys.s.keyCode)){
            this.moveAngle = 90
            this.move()
        }
        else if (keyIsDown(keys.a.keyCode)){
            this.moveAngle = 180
            this.move()
        }
    }

    shootingControls(){
        if (keyIsDown(keys.space.keyCode)){
            if (this.reloadCurrent === this.reloadMax){
                this.shoot()
                this.reloadCurrent = 0; 
            }
        }
        if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.k.keyCode)){
            this.aimAngle = 135
        }
        else if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.i.keyCode)){
            this.aimAngle = 225
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.i.keyCode)){
            this.aimAngle = 315
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.k.keyCode)){
            this.aimAngle = 45
        }
        else if (keyIsDown(keys.i.keyCode)){
            this.aimAngle = 270
        }
        else if (keyIsDown(keys.l.keyCode)){
            this.aimAngle = 0
        }
        else if (keyIsDown(keys.k.keyCode)){
            this.aimAngle = 90
        }
        else if (keyIsDown(keys.j.keyCode)){
            this.aimAngle = 180
        }
    }

    shoot = () => {
        // make a variable for the distance from the player's center that the weapon fires 
        let distance = 25; 
        if (this.gunType === 'bullet'){
            new Bullet(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
        }
        if (this.gunType === 'bomb'){
            new Bomb(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
            // console.log(thisBombs)
        }
    }

    move(){
        this.pos.x+=cos(this.moveAngle)*this.speed
        this.pos.y+=sin(this.moveAngle)*this.speed
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