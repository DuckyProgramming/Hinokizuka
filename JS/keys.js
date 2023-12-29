function keyPressed(){
    switch(key){
        case 'ArrowUp':
            inputs.keys[0]=true
        break
        case 'ArrowDown':
            inputs.keys[1]=true
        break
        case 'ArrowLeft':
            inputs.keys[2]=true
        break
        case 'ArrowRight':
            inputs.keys[3]=true
        break
        case 'z': case 'Z':
            inputs.keys[4]=true
        break
        case 'x': case 'X':
            inputs.keys[5]=true
        break
        case 'c': case 'C':
            inputs.keys[6]=true
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