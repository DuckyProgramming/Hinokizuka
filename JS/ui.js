class ui{
    constructor(layer){
        this.layer=layer
        this.tab=0
        this.tabNum=4
        this.hiddenTabNum=0
        this.close=false
        this.closeAnim=0
        this.tabAnim=[]
        for(let a=0,la=this.tabNum+this.hiddenTabNum;a<la;a++){
            this.tabAnim.push(0)
        }
        this.editing=0
        this.edit={edge:{x:0,y:0}}
        this.possibleNum="1234567890"
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
                        this.layer.fill(150)
                        for(let b=0,lb=2;b<lb;b++){
                            this.layer.fill(this.editing==b+1?125:150,this.editing==b+1?255:150,this.editing==b+1?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40+b*35,80,30,5)
                        }
                    break
                    case 2:
                        this.layer.fill(150)
                        for(let b=0,lb=1+game.connections.length;b<lb;b++){
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35,80,30,5)
                        }
                    break
                    case 3:
                        let options=['hitbox','edge','connection','freecam','infinitedash','invincible','nograv']
                        for(let b=0,lb=options.length;b<lb;b++){
                            this.layer.fill(dev[options[b]]?125:150,dev[options[b]]?255:150,dev[options[b]]?125:150)
                            this.layer.rect(this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35,80,30,5)
                        }
                    break
                }
                this.layer.fill(0)
                this.layer.textSize(12)
                switch(a){
                    case 0:
                        this.layer.text('Level Size',this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,10)
                        this.layer.text(this.edit.edge.x,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,40)
                        this.layer.text(this.edit.edge.y,this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,75)
                    break
                    case 2:
                        this.layer.text('New',this.layer.width+50-this.tabAnim[a]*100,20)
                        for(let b=0,lb=game.connections.length;b<lb;b++){
                            this.layer.text(game.connections[b].id+' '+game.connections[b].side+'\n'+game.connections[b].region[0]+'-'+game.connections[b].region[1],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,55+b*35)
                        }
                    break
                    case 3:
                        let options=['Hitbox','Edge','Connection','Freecam','Infinite Dash','Invincible','No Gravity']
                        for(let b=0,lb=options.length;b<lb;b++){
                            this.layer.text(options[b],this.layer.width+50-this.tabAnim[a]*100+this.closeAnim*100,20+b*35)
                        }
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
                    if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100,y:40},width:80,height:30})){
                        this.editing=1
                    }else if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100,y:75},width:80,height:30})){
                        this.editing=2
                    }else{
                        this.editing=0
                    }
                break
                case 3:
                    let options=['hitbox','edge','connection','freecam','infinitedash','invincible','nograv']
                    for(let b=0,lb=options.length;b<lb;b++){
                        if(inPointBox({position:mouse},{position:{x:this.layer.width+50-this.tabAnim[this.tab]*100,y:20+b*35},width:80,height:30})){
                            dev[options[b]]=!dev[options[b]]
                        }
                    }
                break
            }
        }
    }
    onKey(key,code){
        if(!this.close){
            switch(this.tab){
                case 0:
                    switch(this.editing){
                        case 1:
                            if(int(key)>=0){
                                this.edit.edge.x=this.edit.edge.x*10+int(key)
                            }else if(code==BACKSPACE){
                                this.edit.edge.x=floor(this.edit.edge.x/10)
                            }else if(code==ENTER){
                                game.edge.x=this.edit.edge.x
                            }
                        break
                        case 2:
                            if(int(key)>=0){
                                this.edit.edge.y=this.edit.edge.y*10+int(key)
                            }else if(code==BACKSPACE){
                                this.edit.edge.y=floor(this.edit.edge.y/10)
                            }else if(code==ENTER){
                                game.edge.y=this.edit.edge.y
                            }
                        break
                    }
                break
            }
        }
    }
}