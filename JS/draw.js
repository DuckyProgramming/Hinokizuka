function mainloop(layer){
    clear()
    background(100)
    layer.background(150)
    switch(stage.scene){
        case 'main':
            layer.push()
            layer.translate(-view.scroll.x,-view.scroll.y)
            layer.scale(view.zoom)
            layer.translate(graphics.main.width/2,graphics.main.height/2)
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
    displayMain(graphics.main)
    updateView()
    game.time++
}
function draw(){
    mainloop(graphics.main)
}