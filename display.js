function drawInfo(){
    drawFPS()
    drawPlayerStats()
    document.getElementById('playerHealth').innerText = player.health

}

function drawPlayerStats(){
    players.forEach(player => player.drawStats())
}

function drawFPS(){
    textSize(12)
    text(Math.floor(frameRate()),10,100)
}

function drawInstructions(){
    // textSize(16)
    // text('WASD to move, IJKL to aim, SPACE to shoot, U and O to switch weapons', 10,10)
}
