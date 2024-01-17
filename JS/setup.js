function setup(){
    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()

    dev={editor:true,hitbox:true,edge:true,connection:true,markspawn:true,freecam:true,infinitedash:false,invincible:true,nograv:false,debound:true}

    initialElements(graphics.main)
    initialLevels()

    stage.scene='main'
    reformElements()
    generateLevel(levels[game.level][game.zone],graphics.main,0)
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}