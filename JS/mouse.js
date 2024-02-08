function mouseClicked(){
    updateMouse(graphics.main)
    switch(stage.scene){
        case 'menu':
            let anyClicked=false
            if(menu.scene==0){
                for(let a=0,la=menu.playerAnim.length;a<la;a++){
                    if(dist(220+a*330-600*(0.5-cos(menu.transition*180)*0.5),400,inputs.rel.x,inputs.rel.y)<25){
                        if(game.players.includes(a)){
                            game.players.splice(game.players.indexOf(a),1)
                            if(game.players.length==0){
                                game.players.push(1-a)
                            }
                        }else{
                            game.players.push(a)
                        }
                        anyClicked=true
                    }
                }
                if(!anyClicked){
                    menu.scene=1
                }
            }else{
                for(let a=0,la=menu.levelPos.length;a<la;a++){
                    if(dist(menu.levelPos[a][0],menu.levelPos[a][1],inputs.rel.x,inputs.rel.y)<25){
                        if(menu.select==a){
                            transition.trigger=true
                            transition.scene='main'
                            game.level=a
                            game.zone=0
                            view.scroll.x=0
                            view.scroll.y=0
                            game.scroll.x=0
                            game.scroll.y=0
                            game.running.flowers=0
                            game.running.deaths=0
                            reformLevels()
                            reformElements()
                            inputs.validKey=a==0?[true,true,true,true,false,false,false,false]:[true,true,true,true,true,true,true,true]
                        }else{
                            menu.select=a
                            anyClicked=true
                        }
                    }
                }
                if(!anyClicked){
                    menu.select=-1
                    if(inPointBox({position:inputs.rel},{position:{x:30,y:graphics.main.height-30},width:40,height:40})){
                        menu.scene=0
                    }
                }
            }
        break
        case 'ending':
            transition.trigger=true
            transition.scene='menu'
        break
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