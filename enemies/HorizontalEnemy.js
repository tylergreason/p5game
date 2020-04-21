class HorizontalEnemy extends Enemy{
    constructor(x,y){
        super(x,y)
        // this.test = test;
        this.horizontalMove = false;
        this.angle = 0;
        this.speed = 5;
        this.sizeX = 80; 
        this.sizeY = 160; 
        this.shape = 'rect';
        this.health = 100;
        this.fireRate = 50; 
        this.timer = random(0,20);
        enemies.push(this);
    }
    update(){
        this.checkHealth()
        this.bounds()
        this.increaseTimer()
        this.fire()
        this.move()
        this.show()
    }
    die(){
        makeExplosions(center(this).x,center(this).y,15,this.sizeX*5) 
        setShake(10,10)
        enemies = enemies.filter(enemy => enemy !== this)
    }
    increaseTimer(){
        this.timer+=1;
        if (this.timer >= 100){
            this.timer = 0; 
            this.changeMovement()
        }
    }

    move(){
        this.pos.x += cos(this.angle)*this.speed
        this.pos.y += sin(this.angle)*this.speed
    }

    changeMovement(){
        this.angle += 180;
        console.log(this.angle)
    }
    show(){
        fill((100-this.health)*2,0,0)
        rectMode(CORNER)
        rect(this.pos.x,this.pos.y,this.sizeX, this.sizeY,20)
        rectMode(CENTER)
        fill((this.timer*5))
        ellipse(rectCenter(this).x,rectCenter(this).y,this.timer-20)
    }
    fire(){
        if (this.timer % this.fireRate === 0){
            // fire bullet 
            let bullet = new EnemyBullet(rectCenter(this).x,rectCenter(this).y,player.pos.x,player.pos.y)
            this.timer = 0; 
        }
    }
    bounds(){
        // collide right side bounds
        if(this.pos.x + this.sizeX > canvasWidth){
            // if collide with right edge, go left (180 degrees)
            this.angle = 180
            this.pos.y = random(0,canvasHeight)
        }
        // collide left side bounds
        if (this.pos.x <= 0){
            // if collided with left edge, go right (0 degrees)
            this.angle = 0
            this.pos.y = random(0,canvasHeight)
        }
        // collide bottom side bounds
        if(this.pos.y+this.sizeY > canvasHeight){
            this.pos.y = canvasHeight - this.sizeY;
        } 
        // collide top side bounds
        if (this.pos.y <= 0){
            this.pos.y += 1
        }
    }
}