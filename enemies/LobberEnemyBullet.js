class LobberEnemyBullet extends EnemyBullet {
    constructor(xOrigin,yOrigin,speed,damage,angle){
        super(xOrigin,yOrigin)
        this.speed = speed; 
        this.damage = damage;
        this.size = 20; 
        this.sizeX = this.size;
        this.sizeY = this.size;
        this.angle = angle; 
        this.gravity = .08; 
    }

    update(){
        this.increaseTimer()
        this.bounds()
        this.move()
        this.collide()
        this.show()
    }

    move(){
        this.pos.x+=cos(this.angle)*this.speed; 
        this.pos.y+=sin(this.angle)*this.speed+this.gravity*this.timer;
    }
}