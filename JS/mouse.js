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