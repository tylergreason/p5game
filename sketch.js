let filler = 255;
function setup() {
  createCanvas(canvasWidth, canvasHeight)
  angleMode(DEGREES)
  // make new test enemy to test with 
  let newTestEnemy = new TestEnemy(100,100,20); 
}

function draw() {
  backgroundColor()
  noStroke();
  drawPlayerHealth()
  // remove stroke from everything before drawing 
  fill(0)
  if (player.health > 0){
    controls()
    playerBounds()
    drawPlayer()
  }
  // update playerBullets 
  for (let i = 0; i <= playerBullets.length-1;i++){
    if (playerBullets[i]){
      playerBullets[i].show();
      playerBullets[i].update(); 
    }
  }
  // update player bombs 
  for (let i = 0; i <= playerBombs.length-1; i++){
    if (playerBombs[i]){
      playerBombs[i].show() 
      playerBombs[i].update() 
    }
  }
  // update explosions
  for (let i = 0; i <= explosions.length-1; i++){
  if (explosions[i]){
      explosions[i].show() 
      explosions[i].update() 
    }
  }
  // update enemies 
  for (let i = 0; i < testEnemies.length;i++){
    testEnemies[i].update(); 
    testEnemies[i].show();
  }
  // update enemy bullets 
  for (let i = 0; i < enemyBullets.length; i++){
    enemyBullets[i].update()
    enemyBullets[i].show()
  }
  fill(filler)
  rect(200,200,100,150);

	hit = collideRectRect(player.x,player.y,player.size,player.size,200,200,100,150);
  if (hit){
    filler=0; 
  }else{
    filler=255
  }
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

