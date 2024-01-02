function upKey(id){
    inputs.keys[id]=inputs.validKey[id]
}
function keyPressed(){
    switch(key){
        case 'ArrowUp':
            upKey(0)
        break
        case 'ArrowDown':
            upKey(1)
        break
        case 'ArrowLeft':
            upKey(2)
        break
        case 'ArrowRight':
            upKey(3)
        break
        case 'z': case 'Z':
            upKey(4)
        break
        case 'x': case 'X':
            upKey(5)
        break
        case 'c': case 'C':
            upKey(6)
        break
    }
    switch(stage.scene){
        case 'main':
            if(dev.editor){
                for(let a=0,la=entities.uis.length;a<la;a++){
                    entities.uis[a].onKey(key,keyCode)
                }
            }
        break
    }
}
function keyReleased(){
    switch(key){
        case 'ArrowUp':
            inputs.keys[0]=false
        break
        case 'ArrowDown':
            inputs.keys[1]=false
        break
        case 'ArrowLeft':
            inputs.keys[2]=false
        break
        case 'ArrowRight':
            inputs.keys[3]=false
        break
        case 'z': case 'Z':
            inputs.keys[4]=false
        break
        case 'x': case 'X':
            inputs.keys[5]=false
        break
        case 'c': case 'C':
            inputs.keys[6]=false
        break
    }
}