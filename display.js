function drawInfo(){
    drawFPS()
    drawPlayerStats()
}

function drawPlayerStats(){
    players.forEach(player => player.drawStats())
}

function drawFPS(){
    textSize(12)
    text(Math.floor(frameRate()),20,60)
}