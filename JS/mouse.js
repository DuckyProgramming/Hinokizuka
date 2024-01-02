function mouseClicked(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'main':
            if(dev.editor){
                for(let a=0,la=entities.uis.length;a<la;a++){
                    entities.uis[a].onClick(inputs.rel)
                }
            }
        break
    }
}
function mouseDragged(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'main':
            if(dev.editor){
                for(let a=0,la=entities.uis.length;a<la;a++){
                    entities.uis[a].onDrag(inputs.rel,inputs.pRel)
                }
            }
        break
    }
}
function mousePressed(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'main':
            if(dev.editor){
                for(let a=0,la=entities.uis.length;a<la;a++){
                    entities.uis[a].onPress(inputs.rel)
                }
            }
        break
    }
}