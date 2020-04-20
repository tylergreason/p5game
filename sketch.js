function setup() {
  createCanvas(canvasWidth, canvasHeight)
  angleMode(DEGREES)
  // make player 
  new Player(canvasWidth/2,canvasHeight/2)
  player = players[0]
  // make new test enemy to test with 
  new TestEnemy(100,100,20); 
  new TestEnemy(100,100,20); 
}

function draw() {
  push()
    screenshake()
    backgroundColor()
    noStroke();
    // remove stroke from everything before drawing 
    fill(0)
    // update players 
    players.forEach(player => player.update())
    // update playerBullets 
    for (let i = 0; i <= playerBullets.length-1;i++){
      if (playerBullets[i]){
        playerBullets[i].update(); 
        // if (playerBullets[i]){
        //   playerBullets[i].show();
        // }
      }
    }
    // update player bombs 
    for (let i = 0; i <= playerBombs.length-1; i++){
      if (playerBombs[i]){
        playerBombs[i].update() 
        // if(playerBombs[i]){
        //   playerBombs[i].show() 
        // }
      }
    }
    // update explosions
    for (let i = 0; i <= explosions.length-1; i++){
    if (explosions[i]){
      explosions[i].update() 
        // explosions[i].show() 
      }
    }
    // update enemies 
    for (let i = 0; i < testEnemies.length;i++){
      testEnemies[i].update(); 
      // testEnemies[i].show();
    }
    // update enemy bullets 
    for (let i = 0; i < enemyBullets.length; i++){
      enemyBullets[i].update()
      // if (enemyBullets[i]){
      //   enemyBullets[i].show()
      // }
    }
  pop()
  showFrameRate()
}

// testing angles with mousePressed 
function mousePressed(){
  console.log(` mouse x ${mouseX}`)
  console.log(` mouse y ${mouseY}`)
  let angle = atan2(mouseY - player.y, mouseX - player.x)
  console.log(`angle: ${angle}`)
  shoot(angle)
  // push() 
  //   translate(player.v.x,player.v.y)
  //   console.log(` mouse x ${mouseX}`)
  //   console.log(` mouse y ${mouseY}`)
  //   let angle2 = atan2(mouseY - player.v.x, mouseX - player.v.y)
  //   console.log(`angle: ${angle2}`)
  //   shoot(angle2)
  // pop()  
}

