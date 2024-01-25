function mainloop(layer){
    clear()
    background(100)
    switch(stage.scene){
        case 'menu':
            layer.image(graphics.scenes[0],900-600*(0.5-cos(menu.transition*180)*0.5),300,1800,600)
            layer.image(graphics.scenes[1],900-1200*(0.5-cos(menu.transition*180)*0.5),300,1800,600)
            operateMenu(layer)
        break
        case 'ending':
            layer.image(graphics.backgrounds[game.level],600,300,1200,600)
            operateEnding(layer)
        break
        case 'main':
            switch(game.level){
                case 0:
                    layer.image(graphics.backgrounds[0],900-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                    layer.image(graphics.backgrounds[0],2700-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                break
                case 1:
                    layer.image(graphics.backgrounds[1],900-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                    layer.image(graphics.backgrounds[1],2700-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                break
                case 2:
                    layer.image(graphics.backgrounds[2],900-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                    layer.image(graphics.backgrounds[2],2700-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                break
                case 3:
                    layer.image(graphics.backgrounds[4],900-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                    layer.image(graphics.backgrounds[4],2700-(view.scroll.x+game.scroll.x+99999)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2),1800,900)
                break
            }
            layer.push()
            layer.translate(-view.scroll.x,-view.scroll.y)
            layer.scale(view.zoom)
            layer.translate(graphics.main.width/2,graphics.main.height/2)
            operateBack(layer)
            for(let a=0,la=run.fore.length;a<la;a++){
                for(let b=0,lb=run.fore[a].length;b<lb;b++){
                    if(
                        run.fore[a][b].position.x+run.fore[a][b].width/2>view.scroll.x-graphics.main.width*0.6/view.zoom&&
                        run.fore[a][b].position.x-run.fore[a][b].width/2<view.scroll.x+graphics.main.width*0.6/view.zoom&&
                        run.fore[a][b].position.y+run.fore[a][b].height/2>view.scroll.y-graphics.main.height*0.6/view.zoom&&
                        run.fore[a][b].position.y-run.fore[a][b].height/2<view.scroll.y+graphics.main.height*0.6/view.zoom
                    ){
                        run.fore[a][b].display()
                    }
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