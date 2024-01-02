class wall extends physical{
    constructor(layer,x,y,width,height,type){
        super(layer,x,y,width,height)
        this.type=type
        this.fade=1
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
        this.base={width:this.width,height:this.height}
        this.deprecate=false
        this.interval=types.wall[this.type].interval
        this.set()
    }
    set(){
        switch(this.type){
            case 2:
                this.width=this.base.width-4
            break
            case 3:
                this.width=this.base.width-4
            break
            case 4:
                this.height=this.base.height-4
            break
            case 5:
                this.height=this.base.height-4
            break
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.noStroke()
        switch(this.type){
            case 1:
                this.layer.fill(120,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 2:
                this.layer.fill(200,this.fade)
                for(let a=0,la=this.base.width/20*3;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*20/3,this.height/2,-this.base.width/2+a*20/3+20/3,this.height/2,-this.base.width/2+a*20/3+10/3,-this.height*3/2)
                }
            break
            case 3:
                this.layer.fill(200,this.fade)
                for(let a=0,la=this.base.width/20*3;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*20/3,-this.height/2,-this.base.width/2+a*20/3+20/3,-this.height/2,-this.base.width/2+a*20/3+10/3,this.height*3/2)
                }
            break
            case 4:
                this.layer.fill(200,this.fade)
                for(let a=0,la=this.base.height/20*3;a<la;a++){
                    this.layer.triangle(this.width/2,-this.base.height/2+a*20/3,this.width/2,-this.base.height/2+a*20/3+20/3,-this.width*3/2,-this.base.height/2+a*20/3+10/3)
                }
            break
            case 5:
                this.layer.fill(200,this.fade)
                for(let a=0,la=this.base.height/20*3;a<la;a++){
                    this.layer.triangle(-this.width/2,-this.base.height/2+a*20/3,-this.width/2,-this.base.height/2+a*20/3+20/3,this.width*3/2,-this.base.height/2+a*20/3+10/3)
                }
            break
        }
        this.layer.pop()
        if(dev.hitbox){
            super.display()
        }
    }
    expel(){
        for(let a=0,la=this.collide.box.length;a<la;a++){
            for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                if(inBoxBox(this,this.collide.box[a][b])){
                    this.collide.box[a][b].position.y=this.position.y-this.height/2-this.collide.box[a][b].height/2
                }
            }
        }
    }
    update(){
        this.fade=smoothAnim(this.fade,0,1,this.trigger.fade,5)
        if(this.fade<=0&&!this.trigger.fade){
            this.remove=true
        }
        for(let a=0,la=this.collide.box.length;a<la;a++){
            for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                let c=this.collide.box[a][b]
                if(inBoxBox({position:this.position,width:this.width+2,height:this.height+2},c)){
                    let d=collideBoxBox(this,c)
                    c.contact[d]=true
                    if(d==1){
                        c.stamina=c.base.stamina
                    }
                }
                if(inBoxBox(this,c)){
                    let d=collideBoxBox(this,c)
                    c.crush[d]=true
                    switch(this.type){
                        case 2:
                            if(c.velocity.y>=0){
                                c.goal.dead=true
                            }
                        break
                        case 3:
                            if(c.velocity.y<=0){
                                c.goal.dead=true
                            }
                        break
                        case 4:
                            if(c.velocity.x>=0){
                                c.goal.dead=true
                            }
                        break
                        case 5:
                            if(c.velocity.x<=0){
                                c.goal.dead=true
                            }
                        break
                        default:
                            switch(d){
                                case 0:
                                    if(c.velocity.y<0){
                                        c.position.y=this.position.y+this.height/2+c.height/2
                                        c.velocity.y=0
                                        c.velocity.x*=physics.friction.x
                                    }
                                break
                                case 1:
                                    if(c.velocity.y>0){
                                        c.position.y=this.position.y-this.height/2-c.height/2
                                        c.velocity.y=0
                                        c.jumpTime=c.base.jumpTime
                                        c.dashPhase=false
                                        if(c.dash.active==0){
                                            c.velocity.x*=physics.friction.x
                                        }
                                        if(c.dash.timer==0){
                                            c.dash.available=true
                                        }
                                        if(c.setSpawn&&c.position.x>10&&c.position.x<game.edge.x-10&&c.position.y>10&&c.position.y<game.edge.y-10){
                                            game.spawn.x=c.position.x
                                            game.spawn.y=c.position.y
                                            c.setSpawn=false
                                        }
                                    }
                                break
                                case 2:
                                    if(c.velocity.x<0){
                                        c.position.x=this.position.x+this.width/2+c.width/2
                                        c.velocity.x=0
                                        c.velocity.y*=physics.friction.y
                                    }
                                break
                                case 3:
                                    if(c.velocity.x>0){
                                        c.position.x=this.position.x-this.width/2-c.width/2
                                        c.velocity.x=0
                                        c.velocity.y*=physics.friction.y
                                    }
                                break
                            }
                        break
                    }
                }
            }
        }
    }
}