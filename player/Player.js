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
        this.reloadCurrent = 3,
        this.gunArray = [{name:Bullet.name, reload: Bullet.reload, reloadTimer:Bullet.reload}]
        this.gunArrayPosition = 0, 
        this.aimAngle = -90,
        this.moveAngle = 0, 
        this.gunType = this.gunArray[this.gunArrayPosition],
        this.aimControlLag = 0;
        // set first weapon to Bullet upon creating player 
        // this.setWeapon(Bomb)
        players.push(this)
    }

    // make an instance function for setting the type of weapon at the current gunArray position 
    setWeapon(weapon, position=this.gunArrayPosition){
        console.log(weapon)
        // if the player has less than 3 weapons, add this to the gunArray instead of replacing the current weapon
        if (this.gunArray.length < 3){
            this.gunArray.push({
                name:weapon.name, 
                reload:weapon.reload,
                reloadTimer:weapon.reload
            })
            return this.gunArrayPosition=this.gunArray.length-1;
        }else{
            // debugger
            this.gunArray[position].name = weapon.name;
            this.gunArray[position].reload = weapon.reload;
            // allow player to fire the weapon immediately 
            this.gunArray[position].reloadTimer = weapon.reload;
        }
    }

    checkWeaponEquipped(){
        // debugger
        if (this.gunArray[this.gunArrayPosition] !== undefined){
            return this.gunArray[this.gunArrayPosition]
        }else{
            return false 
            // this.setWeapon(Bullet)
        }
    }

    incrementReloadTimer(){
        if (this.checkWeaponEquipped()){
            this.gunArray[this.gunArrayPosition].reloadTimer +=1 
        }
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
        this.incrementReloadTimer()
        // moved to display.js
        // this.drawStats()
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
        if (this.checkWeaponEquipped()){
            text(`Weapon: ${this.gunArray[this.gunArrayPosition].name}`, 10,64)
        }
    }

    controls = () => {
        this.movementControls()
        this.shootingControls()
    }
    
    movementControls(){
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
        this.aimControlLag -=1; 
        let aimControlLagVar = 2; 
        // press space to shoot and reset reloadCurrent
        if (keyIsDown(keys.space.keyCode)){
                this.shoot()
        }
        if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.k.keyCode)){
            this.aimAngle = 135
            this.aimControlLag = aimControlLagVar; 
        }
        else if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.i.keyCode)){
            this.aimAngle = 225
            this.aimControlLag = aimControlLagVar; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.i.keyCode)){
            this.aimAngle = 315
            this.aimControlLag = aimControlLagVar; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.k.keyCode)){
            this.aimAngle = 45
            this.aimControlLag = aimControlLagVar; 
        }
        if (this.aimControlLag<=0){
            if (keyIsDown(keys.i.keyCode)){
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
    }

    // shoot = () => {
    //     // make a variable for the distance from the player's center that the weapon fires 
    //     let distance = 25; 
    //     if (this.gunType.name === 'bullet'){
    //         if (this.reloadCurrent >= Bullet.reload){
    //             new Bullet(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
    //             this.reloadCurrent = 0; 
    //         }
    //     }
    //     if (this.gunType.name === 'bomb'){
    //         if (this.reloadCurrent >= Bomb.reload){
    //             new Bomb(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
    //             this.reloadCurrent = 0; 
    //         }
    //     }
    // }

    shoot(){
        // make a variable for the distance from the player's center that the weapon fires 
        let distance = 25; 
        if (this.gunReloaded()){
            // check all weapon types and fire 
            if (this.gunType.name === 'Bullet'){
                new Bullet(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
                this.gunType.reloadTimer = 0; 
            }
            if (this.gunType.name === 'Bomb'){
                new Bomb(center(this).x+cos(this.aimAngle)*distance,center(this).y+sin(this.aimAngle)*distance,this.aimAngle)
                this.gunType.reloadTimer = 0; 
            }   
        }
    }

    // check to see if the player is able to fire their weapon 
    gunReloaded(){
        if(this.gunType.reloadTimer >= this.gunType.reload){
            console.log('true')
            return true 
        }
        console.log('false')
    }
    move(){
        this.pos.x+=cos(this.moveAngle)*this.speed
        this.pos.y+=sin(this.moveAngle)*this.speed
    }

    collide(obj){
        // function for if an object has collided with the player
        // this can easily be changed later if the player changes shape 
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
    damagePlayer(value){
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

Player.test = 'test'