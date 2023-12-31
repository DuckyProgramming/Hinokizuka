function setup(){
    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()
    initialElements(graphics.main)
    generateLevel(levels[game.level][game.zone],graphics.main,0)
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}