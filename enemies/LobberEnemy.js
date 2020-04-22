class LobberEnemy extends Enemy {
    constructor(x,y){
        super(x,y)
        this.angle=0
        this.shape = 'rect'
        this.health = 40
        this.speed = 5;
        this.sizeX = 100; 
        this.sizeY = 100; 
        this.fireDirection = -90;
        this.fireRate = 40; 
        this.timer = 0; 
        this.hitBoxes.push({shape:'rect',x:0,y:0,sizeX:this.sizeX,sizeY:this.sizeY})
    }
    update(){
        this.checkHealth()
        this.bounds()
        this.show()
        this.move()
        this.increaseTimer()
        this.fire()
    }
    show(){
        fill(100+this.timer*2,0,0)
        rect(this.pos.x,this.pos.y,this.sizeX,this.sizeY,20)
    }

    increaseTimer(){
        this.timer +=1; 
    }

    fire(){
        if (this.timer % this.fireRate === 0){
            new LobberEnemyBullet(center(this).x,center(this).y,10,10,this.fireDirection)
            this.timer=0;
        }
    }

    reverseDirection(){
        this.angle +=180
    }

    move(){
        this.pos.x += cos(this.angle)*this.speed
        this.pos.y += sin(this.angle)*this.speed
    }

    bounds(){
        // collide right side bounds
        if(this.pos.x + this.sizeX > canvasWidth){
            this.reverseDirection()
        }
        if (this.pos.x <= 0){
            this.reverseDirection()
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

    die(){
        makeExplosions(center(this).x,center(this).y,15,this.sizeX*5) 
        setShake(10,10)
        enemies = enemies.filter(enemy => enemy !== this)
    }
}