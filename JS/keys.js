function upKey(index,id){
    inputs.keys[id][index]=inputs.validKey[index]
}
function keyPressed(){
    switch(stage.scene){
        case 'menu':
            if(menu.scene==0){
                menu.scene=1
            }
        break
        case 'ending':
            transition.trigger=true
            transition.scene='menu'
        break
    }
    if(game.players.length==1){
        switch(key){
            case 'ArrowUp': upKey(0,0); break
            case 'ArrowDown': upKey(1,0); break
            case 'ArrowLeft': upKey(2,0); break
            case 'ArrowRight': upKey(3,0); break
            case 'z': case 'Z': upKey(4,0); break
            case 'x': case 'X': upKey(5,0); break
            case 'c': case 'C': upKey(6,0); break
            case 'r': case 'R': upKey(7,0); break
        }
    }else{
        switch(key){
            case 'ArrowUp': upKey(0,0); break
            case 'ArrowDown': upKey(1,0); break
            case 'ArrowLeft': upKey(2,0); break
            case 'ArrowRight': upKey(3,0); break
            case ',': case '<': upKey(4,0); break
            case '.': case '>': upKey(5,0); break
            case '/': case '?': upKey(6,0); break
            case "'": case '"': upKey(7,0); break

            case 't': case 'T': upKey(0,1); break
            case 'g': case 'G': upKey(1,1); break
            case 'f': case 'F': upKey(2,1); break
            case 'h': case 'H': upKey(3,1); break
            case 'z': case 'Z': upKey(4,1); break
            case 'x': case 'X': upKey(5,1); break
            case 'c': case 'C': upKey(6,1); break
            case "r": case 'R': upKey(7,1); break
        }
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
    if(game.players.length==1){
        switch(key){
            case 'ArrowUp': inputs.keys[0][0]=false; break
            case 'ArrowDown': inputs.keys[0][1]=false; break
            case 'ArrowLeft': inputs.keys[0][2]=false; break
            case 'ArrowRight': inputs.keys[0][3]=false; break
            case 'z': case 'Z': inputs.keys[0][4]=false; break
            case 'x': case 'X': inputs.keys[0][5]=false; break
            case 'c': case 'C': inputs.keys[0][6]=false; break
            case 'r': case 'R': inputs.keys[0][7]=false; break
        }
    }else{
        switch(key){
            case 'ArrowUp': inputs.keys[0][0]=false; break
            case 'ArrowDown': inputs.keys[0][1]=false; break
            case 'ArrowLeft': inputs.keys[0][2]=false; break
            case 'ArrowRight': inputs.keys[0][3]=false; break
            case ',': case '<': inputs.keys[0][4]=false; break
            case '.': case '>': inputs.keys[0][5]=false; break
            case '/': case '?': inputs.keys[0][6]=false; break
            case "'": case '"': inputs.keys[0][7]=false; break

            case 't': case 'T': inputs.keys[1][0]=false; break
            case 'g': case 'G': inputs.keys[1][1]=false; break
            case 'f': case 'F': inputs.keys[1][2]=false; break
            case 'h': case 'H': inputs.keys[1][3]=false; break
            case 'z': case 'Z': inputs.keys[1][4]=false; break
            case 'x': case 'X': inputs.keys[1][5]=false; break
            case 'c': case 'C': inputs.keys[1][6]=false; break
            case "r": case 'R': inputs.keys[1][7]=false; break
        }
    }
}