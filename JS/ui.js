class ui{
    constructor(layer){
        this.layer=layer
        this.tab=0
        this.tabNum=4
        this.hiddenTabNum=8
        this.close=false
        this.closeAnim=0
        this.tabAnim=[]
        for(let a=0,la=this.tabNum+this.hiddenTabNum;a<la;a++){
            this.tabAnim.push(0)
        }
        this.editing=0
        this.edit={edge:{x:0,y:0},wall:{width:0,height:0,type:-1},add:{connection:{id:0,side:0,region:[0,0]},wall:{width:0,height:0,type:0}}}
        this.drag={start:{x:0,y:0},end:{x:0,y:0}}
        this.select=0
        this.selectKey=[]
    }
    set(){
        this.edit.edge.x=game.edge.x
        this.edit.edge.y=game.edge.y
    }
    display(){
        this.layer.noStroke()
        this.layer.fill(180)
        this.layer.rect(this.layer.width-15-(this.tabNum*100+105)*(1-this.closeAnim),5,20,30,5)
        this.layer.fill(0)
        this.layer.textSize(12)
        this.layer.text('X',this.layer.width-15-(this.tabNum*100+105)*(1-this.closeAnim),10)
        for(let a=0,la=this.tabNum;a<la;a++){
            this.layer.fill(180)
            this.layer.rect(this.layer.width-la*100+a*100-55,10+this.tabAnim[a]*10-this.closeAnim*50,90,40+this.tabAnim[a]*20,10)
            this.layer.fill(0)
            this.layer.textSize(15)
            this.layer.text(['Main','Wall','Connection','Dev'][a],this.layer.width-la*100+a*100-55,15+this.tabAnim[a]*20-this.closeAnim*50)
        }
        for(let a=0,la=this.tabNum+this.hiddenTabNum;a<la;a++){
            if(this.tabAnim[a]>0){
                this.layer.fill(180)
                this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,this.layer.height/2,100,this.layer.height)
                switch(a){
                    case 0:
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.fill(this.editing==b+1?125:150,this.editing==b+1?255:150,this.editing==b+1?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40+b*55-max(0,(b-1))*20,80,30,5)
                        }
                    break
                    case 1:
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.fill(this.editing==b+1?125:150,this.editing==b+1?255:150,this.editing==b+1?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40+b*55-max(0,(b-2))*20,80,30,5)
                        }
                    break
                    case 2:
                        this.layer.fill(150)
                        for(let b=0,lb=1+game.connections.length;b<lb;b++){
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35,80,30,5)
                        }
                    break
                    case 3:
                        let options=['hitbox','edge','connection','markspawn','freecam','infinitedash','invincible','nograv','debound','clear']
                        for(let b=0,lb=options.length;b<lb;b++){
                            this.layer.fill(dev[options[b]]?125:150,dev[options[b]]?255:150,dev[options[b]]?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35,80,30,5)
                        }
                    break
                    case 4: case 5:
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.fill(this.editing==b+1?125:150,this.editing==b+1?255:150,this.editing==b+1?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40+b*55-floor(b/4)*20,80,30,5)
                        }
                    break
                    case 6: case 10:
                        this.layer.fill(150)
                        this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20,80,30,5)
                    break
                    case 7: case 9:
                        this.layer.fill(150)
                        for(let b=0,lb=types.wall.length;b<lb;b++){
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,10+b*15,80,10,5)
                        }
                    break
                    case 8:
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.fill(this.editing==b+1?125:150,this.editing==b+1?255:150,this.editing==b+1?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40+b*55-max(0,b-2)*20,80,30,5)
                        }
                    break
                    case 11:
                        this.layer.fill(150)
                        this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20,80,30,5)
                        this.layer.fill(75,200,75,0.2)
                        this.layer.stroke(100,255,100)
                        this.layer.strokeWeight(2)
                        let ds={x:this.drag.start.x-view.scroll.x+this.layer.width/2,y:this.drag.start.y-view.scroll.y+this.layer.height/2}
                        let de={x:this.drag.end.x-view.scroll.x+this.layer.width/2,y:this.drag.end.y-view.scroll.y+this.layer.height/2}
                        this.layer.rect(ds.x/2+de.x/2,ds.y/2+de.y/2,abs(ds.x-de.x),abs(ds.y-de.y))
                        this.layer.noStroke()
                    break
                }
                this.layer.fill(0)
                this.layer.textSize(12)
                switch(a){
                    case 0:
                        this.layer.text('Level Width',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,15)
                        this.layer.text(this.edit.edge.x,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                        this.layer.text('Level Height',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,70)
                        this.layer.text(this.edit.edge.y,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,95)
                        this.layer.text('Export',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,200)
                        this.layer.textSize(10)
                        this.layer.text('Change Spawn',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,130)
                        this.layer.text('Reset to Spawn',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,165)
                    break
                    case 1:
                        this.layer.text('Width',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,15)
                        this.layer.text('Height',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,70)
                        this.layer.text('Type',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,125)
                        this.layer.text('Delete',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,185)
                        this.layer.text('New',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,220)
                        this.layer.text('Spikify',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,255)
                        this.layer.textSize(10)
                        this.layer.text(this.edit.wall.width,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                        this.layer.text(this.edit.wall.height,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,95)
                        if(this.edit.wall.type>=0){
                            this.layer.text(types.wall[this.edit.wall.type].name,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,150)
                        }
                    break
                    case 2:
                        this.layer.text('New',this.layer.width+50-this.tabAnim[a]*100,20)
                        this.layer.textSize(10)
                        for(let b=0,lb=game.connections.length;b<lb;b++){
                            this.layer.text(game.connections[b].id+' '+game.connections[b].side+'\n'+game.connections[b].region[0]+'-'+game.connections[b].region[1],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,55+b*35)
                        }
                    break
                    case 3:
                        let options=['Hitbox','Edge','Connection','Spawn Point','Freecam','Infinite Dash','Invincible','No Gravity','No Bounds','Clear']
                        for(let b=0,lb=options.length;b<lb;b++){
                            this.layer.text(options[b],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35)
                        }
                    break
                    case 4:
                        this.layer.text('ID',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,15)
                        this.layer.text('Side',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,70)
                        this.layer.text('Region Start',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,125)
                        this.layer.text('Region End',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,180)
                        this.layer.text('Confirm',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,240)
                        this.layer.textSize(10)
                        this.layer.text(this.edit.add.connection.id,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                        this.layer.text(this.edit.add.connection.side,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,95)
                        this.layer.text(this.edit.add.connection.region[0],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,150)
                        this.layer.text(this.edit.add.connection.region[1],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,205)
                    break
                    case 5:
                        this.layer.text('ID',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,15)
                        this.layer.text('Side',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,70)
                        this.layer.text('Region Start',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,125)
                        this.layer.text('Region End',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,180)
                        this.layer.text('Delete',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,240)
                        this.layer.textSize(10)
                        if(this.select>=0&&this.select<game.connections.length){
                            this.layer.text(game.connections[this.select].id,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                            this.layer.text(game.connections[this.select].side,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,95)
                            this.layer.text(game.connections[this.select].region[0],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,150)
                            this.layer.text(game.connections[this.select].region[1],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,205)
                        }
                    break
                    case 6: case 10: case 11:
                        this.layer.text('Cancel',this.layer.width+50-this.tabAnim[a]*100,20)
                    break
                    case 7: case 9:
                        this.layer.textSize(10)
                        for(let b=0,lb=types.wall.length;b<lb;b++){
                            this.layer.text(types.wall[b].name,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,10+b*15)
                        }
                    break
                    case 8:
                        this.layer.text('Width',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,15)
                        this.layer.text('Height',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,70)
                        this.layer.text('Type',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,125)
                        this.layer.text('Add',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,185)
                        this.layer.text('Zonal Add',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,220)
                        this.layer.textSize(10)
                        this.layer.text(this.edit.add.wall.width,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                        this.layer.text(this.edit.add.wall.height,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,95)
                        this.layer.text(types.wall[this.edit.add.wall.type].name,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,150)
                    break
                }
            }
        }
    }
    update(){
        this.closeAnim=smoothAnim(this.closeAnim,this.close,0,1,5)
        for(let a=0,la=this.tabNum+this.hiddenTabNum;a<la;a++){
            this.tabAnim[a]=smoothAnim(this.tabAnim[a],this.tab==a,0,1,5)
        }
    }
    onClick(mouse){
        if(inPointBox({position:mouse},{position:{x:this.layer.width-15-(this.tabNum*100+105)*(1-this.closeAnim),y:5},width:20,height:30})){
            this.close=!this.close
        }
        if(!this.close){
            for(let a=0,la=this.tabNum;a<la;a++){
                if(inPointBox({position:mouse},{position:{x:this.layer.width-la*100+a*100-55,y:10+this.tabAnim[a]*10},width:90,height:40+this.tabAnim[a]*20})){
                    this.tab=a
                    this.editing=0
                }
            }
            switch(this.tab){
                case 0:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:95},width:80,height:30})){
                        this.editing=2
                    }else{
                        this.editing=0
                    }
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:130},width:80,height:30})){
                        this.tab=6
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:165},width:80,height:30})){
                        for(let a=0,la=entities.players.length;a<la;a++){
                            entities.players[a].position.x=game.spawn.x
                            entities.players[a].position.y=game.spawn.y
                        }
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:200},width:80,height:30})){
                        let connectionForm=``
                        for(let a=0,la=game.connections.length;a<la;a++){
                            if(a>=1){
                                connectionForm+=`
                `
                            }
                            connectionForm+=`{id:${game.connections[a].id},side:${game.connections[a].side},region:[${game.connections[a].region[0]},${game.connections[a].region[1]}]},`
                        }
                        let wallForm=``
                        let total=0
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(total>=1){
                                    wallForm+=`
                `
                                }
                                total++
                                wallForm+=`{x:${round(entities.walls[a][b].position.x)},y:${round(entities.walls[a][b].position.y)},width:${entities.walls[a][b].base.width},height:${entities.walls[a][b].base.height},type:${entities.walls[a][b].type}},`
                            }
                        }
                        print(
`
        {
            spawn:{x:${game.spawn.x},y:${game.spawn.y}},
            edge:{x:${game.edge.x},y:${game.edge.y}},
            connections:[
                ${connectionForm}
            ],walls:[
                ${wallForm}
            ],
        },
`
                        )
                    }
                break
                case 1:
                    for(let a=0,la=entities.walls.length;a<la;a++){
                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                            if(entities.walls[a][b].select){
                                entities.walls[a][b].position.x=round((entities.walls[a][b].position.x-entities.walls[a][b].interval.x[1])/entities.walls[a][b].interval.x[0])*entities.walls[a][b].interval.x[0]+entities.walls[a][b].interval.x[1]
                                entities.walls[a][b].position.y=round((entities.walls[a][b].position.y-entities.walls[a][b].interval.y[1])/entities.walls[a][b].interval.y[0])*entities.walls[a][b].interval.y[0]+entities.walls[a][b].interval.y[1]
                            }
                        }
                    }
                    for(let a=0,la=entities.walls.length;a<la;a++){
                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                            entities.walls[a][b].checkRedundant()
                        }
                    }
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:95},width:80,height:30})){
                        this.editing=2
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:150},width:80,height:30})){
                        this.tab=7
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:185},width:80,height:30})){
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(entities.walls[a][b].select){
                                    entities.walls[a][b].remove=true
                                }
                            }
                        }
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:220},width:80,height:30})){
                        this.tab=8
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:255},width:80,height:30})){
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(entities.walls[a][b].select){
                                    entities.walls[a][b].spikify()
                                }
                            }
                        }
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                entities.walls[a][b].checkRedundant()
                            }
                        }
                    }else{
                        let selected=0
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(inPointBox({position:{x:inputs.rel.x+view.scroll.x-this.layer.width/2,y:inputs.rel.y+view.scroll.y-this.layer.height/2}},entities.walls[a][b])){
                                    if(entities.walls[a][b].select){
                                        entities.walls[a][b].select=false
                                        this.selectKey.splice(this.selectKey.indexOf(a),1)
                                    }else{
                                        entities.walls[a][b].select=true
                                        this.selectKey.push([a,b])
                                    }
                                    selected++
                                }
                            }
                        }
                        if(selected==0){
                            this.selectKey=[]
                            for(let a=0,la=entities.walls.length;a<la;a++){
                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                    entities.walls[a][b].select=false
                                }
                            }
                        }
                        if(this.selectKey.length==1){
                            for(let a=0,la=entities.walls.length;a<la;a++){
                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                    if(entities.walls[a][b].select){
                                        this.edit.wall.width=entities.walls[a][b].base.width
                                        this.edit.wall.height=entities.walls[a][b].base.height
                                        this.edit.wall.type=entities.walls[a][b].type
                                    }
                                }
                            }
                        }else{
                            this.edit.wall.width=0
                            this.edit.wall.height=0
                            this.edit.wall.type=-1
                        }
                    }
                break
                case 2:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20},width:80,height:30})){
                        this.tab=4
                        this.editing=0
                    }
                    for(let a=0,la=game.connections.length;a<la;a++){
                        if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:55+a*35},width:80,height:30})){
                            this.tab=5
                            this.editing=0
                            this.select=a
                        }
                    }
                break
                case 3:
                    let options=['hitbox','edge','connection','markspawn','freecam','infinitedash','invincible','nograv','debound']
                    for(let b=0,lb=options.length;b<lb;b++){
                        if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20+b*35},width:80,height:30})){
                            dev[options[b]]=!dev[options[b]]
                        }
                    }
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20+options.length*35},width:80,height:30})){
                        for(let b=0,lb=options.length;b<lb;b++){
                            dev[options[b]]=false
                        }
                    }
                break
                case 4:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:95},width:80,height:30})){
                        this.editing=2
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:150},width:80,height:30})){
                        this.editing=3
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:205},width:80,height:30})){
                        this.editing=4
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:240},width:80,height:30})){
                        this.tab=2
                        game.connections.push({id:this.edit.add.connection.id,side:this.edit.add.connection.side,region:[this.edit.add.connection.region[0],this.edit.add.connection.region[1]]})
                    }else{
                        this.editing=0
                    }
                break
                case 5:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:95},width:80,height:30})){
                        this.editing=2
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:150},width:80,height:30})){
                        this.editing=3
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:205},width:80,height:30})){
                        this.editing=4
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:240},width:80,height:30})){
                        this.tab=2
                        game.connections.splice(this.select,1)
                        this.select=-1
                    }else{
                        this.editing=0
                    }
                break
                case 6:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20},width:80,height:30})){
                        this.tab=0
                    }else{
                        game.spawn.x=round((inputs.rel.x+view.scroll.x-this.layer.width/2-10)/20)*20+10
                        game.spawn.y=round((inputs.rel.y+view.scroll.y-this.layer.height/2-10)/20)*20+15
                    }
                break
                case 7:
                    for(let a=0,la=types.wall.length;a<la;a++){
                        if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:10+a*15},width:80,height:10})){
                            this.edit.wall.type=a
                            for(let b=0,lb=entities.walls.length;b<lb;b++){
                                for(let c=0,lc=entities.walls[b].length;c<lc;c++){
                                    if(entities.walls[b][c].select){
                                        entities.walls[b][c].type=a
                                        entities.walls[b][c].set()
                                    }
                                }
                            }
                            this.tab=1
                        }
                    }
                break
                case 8:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:95},width:80,height:30})){
                        this.editing=2
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:150},width:80,height:30})){
                        this.tab=9
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:185},width:80,height:30})){
                        this.tab=10
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:220},width:80,height:30})){
                        this.tab=11
                        this.drag.end.x=0
                        this.drag.end.y=0
                        this.drag.start.x=0
                        this.drag.start.y=0
                    }else{
                        this.editing=0
                    }
                break
                case 9:
                    for(let a=0,la=types.wall.length;a<la;a++){
                        if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:10+a*15},width:80,height:10})){
                            this.edit.add.wall.type=a
                            this.tab=8
                        }
                    }
                break
                case 10:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20},width:80,height:30})){
                        this.tab=1
                    }else{
                        entities.walls[types.wall[this.edit.add.wall.type].slice].push(new wall(this.layer,round((inputs.rel.x+view.scroll.x-this.layer.width/2-types.wall[this.edit.add.wall.type].interval.x[1])/types.wall[this.edit.add.wall.type].interval.x[0])*types.wall[this.edit.add.wall.type].interval.x[0]+types.wall[this.edit.add.wall.type].interval.x[1],round((inputs.rel.y+view.scroll.y-this.layer.height/2-types.wall[this.edit.add.wall.type].interval.y[1])/types.wall[this.edit.add.wall.type].interval.y[0])*types.wall[this.edit.add.wall.type].interval.y[0]+types.wall[this.edit.add.wall.type].interval.y[1],this.edit.add.wall.width,this.edit.add.wall.height,this.edit.add.wall.type))
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                entities.walls[a][b].checkRedundant()
                            }
                        }
                    }
                break
                case 11:
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100+this.closeAnim*100,y:20},width:80,height:30})){
                        this.tab=1
                    }
                break
            }
        }
        switch(this.tab){
            case 11:
                if(dist(this.drag.start.x,this.drag.start.y,this.drag.end.x,this.drag.end.y)>10){
                    entities.walls[types.wall[this.edit.add.wall.type].slice].push(new wall(this.layer,round((this.drag.start.x/2+this.drag.end.x/2-types.wall[this.edit.add.wall.type].interval.x[1])/types.wall[this.edit.add.wall.type].interval.x[0])*types.wall[this.edit.add.wall.type].interval.x[0]+types.wall[this.edit.add.wall.type].interval.x[1],round((this.drag.start.y/2+this.drag.end.y/2-types.wall[this.edit.add.wall.type].interval.y[1])/types.wall[this.edit.add.wall.type].interval.y[0])*types.wall[this.edit.add.wall.type].interval.y[0]+types.wall[this.edit.add.wall.type].interval.y[1],ceil(abs(this.drag.start.x-this.drag.end.x)/20)*20,ceil(abs(this.drag.start.y-this.drag.end.y)/20)*20,this.edit.add.wall.type))
                    for(let a=0,la=entities.walls.length;a<la;a++){
                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                            entities.walls[a][b].checkRedundant()
                        }
                    }
                }
            break
        }
        this.drag.start.x=mouse.x+view.scroll.x-this.layer.width/2
        this.drag.start.y=mouse.y+view.scroll.y-this.layer.height/2
        this.drag.end.x=mouse.x+view.scroll.x-this.layer.width/2
        this.drag.end.y=mouse.y+view.scroll.y-this.layer.height/2
    }
    onDrag(mouse,pMouse){
        switch(this.tab){
            case 1:
                for(let a=0,la=entities.walls.length;a<la;a++){
                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                        if(entities.walls[a][b].select){
                            entities.walls[a][b].position.x+=mouse.x-pMouse.x
                            entities.walls[a][b].position.y+=mouse.y-pMouse.y
                        }
                    }
                }
            break
        }
        this.drag.end.x=mouse.x+view.scroll.x-this.layer.width/2
        this.drag.end.y=mouse.y+view.scroll.y-this.layer.height/2
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                entities.walls[a][b].checkRedundant()
            }
        }
    }
    onPress(mouse){
        this.drag.start.x=mouse.x+view.scroll.x-this.layer.width/2
        this.drag.start.y=mouse.y+view.scroll.y-this.layer.height/2
        this.drag.end.x=mouse.x+view.scroll.x-this.layer.width/2
        this.drag.end.y=mouse.y+view.scroll.y-this.layer.height/2
    }
    onKey(key,code){
        if(!this.close){
            switch(this.tab){
                case 0:
                    if(this.editing==1||this.editing==2){
                        let marker=['x','y'][this.editing-1]
                        if(int(key)>=0){
                            this.edit.edge[marker]=this.edit.edge[marker]*10+int(key)
                        }else if(code==BACKSPACE){
                            this.edit.edge[marker]=floor(this.edit.edge[marker]/10)
                        }else if(code==ENTER){
                            game.edge[marker]=this.edit.edge[marker]
                        }
                    }
                break
                case 1:
                    if(this.editing==1||this.editing==2){
                        let marker=['width','height'][this.editing-1]
                        if(int(key)>=0){
                            this.edit.wall[marker]=this.edit.wall[marker]*10+int(key)
                        }else if(code==BACKSPACE){
                            this.edit.wall[marker]=floor(this.edit.wall[marker]/10)
                        }else if(code==ENTER){
                            for(let a=0,la=entities.walls.length;a<la;a++){
                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                    if(entities.walls[a][b].select){
                                        entities.walls[a][b][marker]=this.edit.wall[marker]
                                        entities.walls[a][b].base[marker]=this.edit.wall[marker]
                                        entities.walls[a][b][['width','height'][2-this.editing]]=entities.walls[a][b].base[['width','height'][2-this.editing]]
                                        entities.walls[a][b].set()
                                    }
                                }
                            }
                            for(let a=0,la=entities.walls.length;a<la;a++){
                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                    entities.walls[a][b].checkRedundant()
                                }
                            }
                        }
                    }
                break
                case 4:
                    if(this.editing==1||this.editing==2){
                        let marker=['id','side'][this.editing-1]
                        if(int(key)>=0){
                            this.edit.add.connection[marker]=this.edit.add.connection[marker]*10+int(key)
                        }else if(code==BACKSPACE){
                            this.edit.add.connection[marker]=floor(this.edit.add.connection[marker]/10)
                        }
                    }else if(this.editing==3||this.editing==4){
                        if(int(key)>=0){
                            this.edit.add.connection.region[this.editing-3]=this.edit.add.connection.region[this.editing-3]*10+int(key)
                        }else if(code==BACKSPACE){
                            this.edit.add.connection.region[this.editing-3]=floor(this.edit.add.connection.region[this.editing-3]/10)
                        }
                    }
                break
                case 5:
                    if(this.editing==1||this.editing==2){
                        let marker=['id','side'][this.editing-1]
                        if(int(key)>=0){
                            game.connections[this.select][marker]=game.connections[this.select][marker]*10+int(key)
                        }else if(code==BACKSPACE){
                            game.connections[this.select][marker]=floor(game.connections[this.select][marker]/10)
                        }
                    }else if(this.editing==3||this.editing==4){
                        if(int(key)>=0){
                            game.connections[this.select].region[this.editing-3]=game.connections[this.select].region[this.editing-3]*10+int(key)
                        }else if(code==BACKSPACE){
                            game.connections[this.select].region[this.editing-3]=floor(game.connections[this.select].region[this.editing-3]/10)
                        }
                    }
                break
                case 8:
                    if(this.editing==1||this.editing==2){
                        let marker=['width','height'][this.editing-1]
                        if(int(key)>=0){
                            this.edit.add.wall[marker]=this.edit.add.wall[marker]*10+int(key)
                        }else if(code==BACKSPACE){
                            this.edit.add.wall[marker]=floor(this.edit.add.wall[marker]/10)
                        }
                    }
                break
            }
        }
    }
}