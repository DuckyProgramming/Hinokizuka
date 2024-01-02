function mainloop(layer){
    clear()
    background(100)
    switch(stage.scene){
        case 'main':
            layer.image(graphics.backgrounds[game.level],-(view.scroll.x+game.scroll.x)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
            layer.image(graphics.backgrounds[game.level],1800-(view.scroll.x+game.scroll.x)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
            layer.push()
            layer.translate(-view.scroll.x,-view.scroll.y)
            layer.scale(view.zoom)
            layer.translate(graphics.main.width/2,graphics.main.height/2)
            operateBack(layer)
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    run.fore[a][b].display()
                    run.fore[a][b].update()
                    if(run.fore[a][b].remove){
                        run.fore[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
            operateInner(layer)
            layer.pop()
            for(let a=0,la=run.over.length;a<la;a++){
                for(let b=0,lb=run.over[a].length;b<lb;b++){
                    run.over[a][b].display()
                    run.over[a][b].update()
                    if(run.over[a][b].remove){
                        run.over[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
            operateOuter(layer)
        break
    }
    runTransition(layer)
    displayMain(graphics.main)
    updateView()
    updateMouse(graphics.main)
    game.time++
}
function draw(){
    mainloop(graphics.main)
}