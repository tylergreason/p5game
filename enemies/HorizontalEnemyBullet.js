class HorizontalEnemyBullet extends EnemyBullet{
    constructor(xOrigin,yOrigin,xDestination,yDestination,speed,damage){
        super(xOrigin,yOrigin,xDestination,yDestination)
        this.speed = speed; 
        this.damage = damage;
        this.size = 20; 
        this.sizeX = this.size;
        this.sizeY = this.size;
    }   
}