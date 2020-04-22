const canvasWidth = 800; 
const canvasHeight = 800; 
const backgroundColor = () => { background(200,200,200) }
let player=''; 
const keyCodes = {
    l:76, 
    j:74, 
    i:73, 
    k:75,
    d:68,
    a:65,
    s:83,
    w:87
}

const keys = {
    i:{keyCode:73, x:0,y:-1,deg:90},
    l:{keyCode:76, x:1,y:0,deg:0},
    k:{keyCode:75, x:0,y:1,deg:270},
    j:{keyCode:74, x:-1,y:0,deg:180},
    w:{keyCode:87, x:0,y:-1},
    d:{keyCode:68, x:1,y:0},
    s:{keyCode:83, x:0,y:1},
    a:{keyCode:65, x:-1,y:0},
    u:{keyCode:85},
    o:{keyCode:79},
    space:{keyCode:32}
}
// object arrays 
let playerBullets = [];
let explosions = []; 

// general function for removing item from array 
function removeFromArray(item,array){
    return array.filter(obj => obj !== item) 
}

function makeExplosions(x,y,qty,size){
    for (let i = 0; i < qty; i++){
        new Explosion(x,y,size);
    }
}

const center = obj => {
    if (obj.size){
        return {
            x:obj.pos.x+(obj.size/2),
            y:obj.pos.y+(obj.size/2)
        }
    }else if (obj.sizeX){
        return {
            x:obj.pos.x+(obj.sizeX/2),
            y:obj.pos.y+(obj.sizeY/2)
        }
    }else{
        debugger
    }
}





// make screenshake object that can be modified for different shake strengths and times 
let screenshakeValues = {
    shake:0, 
    time:0
}

// function to control how long the screen shakes for 
function screenshake(){
    if (screenshakeValues.time > 0){
        screenshakeValues.time -=1; 
    }   
    if (screenshakeValues.time <= 0){
        screenshakeValues.shake = 0; 
    }
    translate(random(screenshakeValues.shake*-1,screenshakeValues.shake),random(screenshakeValues.shake*-1,screenshakeValues.shake))
}

// function to set screenshake shake and time 
function setShake(shake, time){
    screenshakeValues.shake = shake; 
    screenshakeValues.time = time;    
}

// function to set the fill color with an object 
function setFill(obj){
    fill(`rgba(${obj.r},${obj.g},${obj.b},${obj.a})`)
}

function findAngle(yDestination,yOrigin,xDestination,xOrigin){
    return atan2(yDestination-yOrigin,xDestination-xOrigin)
}

function spawnEnemy(enemy){
    if (enemy === 'horizontalEnemy'){
        return new HorizontalEnemy(random(0,canvasWidth),random(0,canvasHeight)); 
    }
    if (enemy === 'spinEnemy'){
        return new SpinEnemy(random(0,canvasWidth),random(0,canvasHeight));  
    }
}
