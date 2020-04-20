let player = {
    x:canvasWidth/2,
    y:canvasHeight/2,
    get pos(){
        return createVector(this.x,this.y)
    },
    size:20,
    health:100,
    get centerX(){
        return this.x+(this.size/2)
    },
    get centerY(){
        return this.y+(this.size/2)
    },
    speed:3,
    reloadMax:5,
    reloadCurrent:3,
    get rightBorder(){
        return this.x+this.size/2;
    },
    get leftBorder(){
        return this.x-this.size/2
    },
    get topBorder(){
        return this.y
    },
    get bottomBorder(){
        return this.y+this.size;
    }, 
    gunType:'bomb'
}



const drawPlayer = () =>{
    fill(0)
    ellipse(player.pos.x,player.pos.y,player.size,player.size); 
    fill(255)
    rect(player.pos.x,player.pos.y,1,1)
    player.reloadCurrent +=1; 
    if (player.reloadCurrent > player.reloadMax){
        player.reloadCurrent=player.reloadMax
    }   
}

const playerBounds = () => {
    if (player.rightBorder >= canvasWidth){
        player.x = canvasWidth-player.size/2
    }
    if (player.leftBorder <= 0){
        player.x = 0+player.size/2
    }
    if (player.topBorder <= 0){
        player.y = 0+player.size/2;
    }
    if (player.bottomBorder >= canvasHeight){
        player.y = canvasHeight-player.size/2
    }

}

const controls = () => {
    // fix diagonal movement later to be like shooting directions 
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(keyCodes.d)){
        player.x += player.speed; 
    }
    if(keyIsDown(LEFT_ARROW) || keyIsDown(keyCodes.a)){
        player.x -= player.speed; 
    }
    if(keyIsDown(UP_ARROW) || keyIsDown(keyCodes.w)){
        player.y -= player.speed; 
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(keyCodes.s)){
        player.y += player.speed; 
    }
    // shooting 
    // check to see if player is reloaded 
    if (player.reloadCurrent === player.reloadMax){
                // // console.log(keys.key)
                //     if (key === 'j' || key === 'k' || key === 'l' || key === 'i'){

                //         if (keys[key]){
                //             shoot(keys[key].x,keys[key].y)
                //         }
                //         key = 0;
                //         player.reloadCurrent = 0;
                //     }
        if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.k.keyCode)){
            shoot(135)
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.j.keyCode) && keyIsDown(keys.i.keyCode)){
            shoot(270-45)
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.i.keyCode)){
            shoot(270+45)
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode) && keyIsDown(keys.k.keyCode)){
            shoot(45)
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.i.keyCode)){
            shoot(-90);
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.l.keyCode)){
            shoot(0);
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.k.keyCode)){
            shoot(-270);
            player.reloadCurrent = 0; 
        }
        else if (keyIsDown(keys.j.keyCode)){
            shoot(180);
            player.reloadCurrent = 0; 
        }
        }
    }

const shoot = (angle) => {
    // given an angle, find the x and y vector the bullet should follow
    // y is multiplied by -1 to account for computer screens basically being flipped 
    const xVector = cos(angle) 
    const yVector = sin(angle)
    if (player.gunType === 'bullet'){
        new Bullet(player.centerX,player.centerY,xVector,yVector)
    }
    if (player.gunType === 'bomb'){
        new Bomb(player.x,player.y,xVector,yVector)
        // console.log(playerBombs)
    }
}

// function to check if player has been hit
// assumes player is an ellipse for now 
function hitPlayer(){

}