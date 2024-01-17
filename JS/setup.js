function setup(){
    createCanvas(windowWidth-40,windowHeight-40)
    setupGraphics()
    initialElements(graphics.main)
    initialLevels()
    //dev={editor:true,hitbox:true,edge:true,connection:true,markspawn:true,freecam:true,infinitedash:false,invincible:true,nograv:false,debound:true}
}
function windowResized(){
    resizeCanvas(windowWidth-40,windowHeight-40)
}