class wall extends physical{
    constructor(layer,x,y,width,height,type,index,zone){
        super(layer,x,y,width,height)
        this.type=type
        this.index=index
        this.zone=zone
        this.fade=1
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
        this.base={width:this.width,height:this.height}
        this.deprecate=false
        this.interval=types.wall[this.type].interval
        this.time=0
        this.set()
    }
    set(){
        switch(this.type){
            case 2:
                this.base.height=4
                this.height=4
                this.width=this.base.width-4
            break
            case 3:
                this.base.height=4
                this.height=4
                this.width=this.base.width-4
            break
            case 4:
                this.base.width=4
                this.width=4
                this.height=this.base.height-4
            break
            case 5:
                this.base.width=4
                this.width=4
                this.height=this.base.height-4
            break
            case 7:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=false
            break
            case 8:
                this.timer=0
            break
            case 9:
                this.base.width=15
                this.base.height=15
                this.width=15
                this.height=15
                this.timer=0
            break
            case 10:
                this.base.height=8
                this.height=8
                this.anim=0
                this.timer=0
            break
            case 11:
                this.base.height=8
                this.height=8
                this.anim=0
                this.timer=0
            break
            case 12:
                this.base.width=8
                this.width=8
                this.anim=0
                this.timer=0
            break
            case 13:
                this.base.width=8
                this.width=8
                this.anim=0
                this.timer=0
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
            case 6:
                this.layer.fill(90,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 7:
                this.layer.fill(123,189,156,this.fade)
                for(let a=0,la=15;a<la;a++){
                    this.layer.triangle(-2.25,12,2.25,12,0,21)
                    this.layer.rotate(360/la)
                }
                let colors=[[206,111,147],[234,147,180],[253,173,205],[236,141,177],[251,158,193],[255,177,210],[255,203,235]]
                let offset=[15,10,25,-15,10,15,10,25,-15]
                for(let a=0,la=7;a<la;a++){
                    this.layer.fill(colors[a][0],colors[a][1],colors[a][2],this.fade)
                    for(let b=0,lb=9;b<lb;b++){
                        this.layer.ellipse(0,9-a,6-a*2/3,18-a*2)
                        this.layer.rotate(360/la)
                    }
                    this.layer.rotate(offset[a])
                }
            break
            case 8:
                this.layer.fill(80,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,9,this.height,2)
                }
            break
            case 9:
                this.layer.fill(200,255,200,this.fade)
                this.layer.quad(0,-12,-12,0,0,12,12,0)
                this.layer.fill(180,255,180,this.fade)
                this.layer.quad(0,-10,-10,0,0,10,10,0)
            break
            case 10:
                this.layer.stroke(200,this.fade)
                this.layer.line(this.width*0.4,this.height*0.5,-this.width*0.4,this.height*0.5-this.anim*5)
                this.layer.line(this.width*0.4,this.height*0.5-this.anim*10,-this.width*0.4,this.height*0.5-this.anim*5)
                this.layer.line(this.width*0.4,this.height*0.5-this.anim*10,-this.width*0.2,this.height*0.5-this.anim*15)
                this.layer.fill(200,100,0,this.fade)
                this.layer.stroke(40,this.fade)
                this.layer.strokeWeight(2)
                this.layer.rect(0,-this.anim*15,this.width-2,this.height-2)
                this.layer.point(-5,-this.anim*15)
                this.layer.point(5,-this.anim*15)
            break
            case 11:
                this.layer.stroke(200,this.fade)
                this.layer.line(this.width*0.4,-this.height*0.5,-this.width*0.4,-this.height*0.5+this.anim*5)
                this.layer.line(this.width*0.4,-this.height*0.5+this.anim*10,-this.width*0.4,-this.height*0.5+this.anim*5)
                this.layer.line(this.width*0.4,-this.height*0.5+this.anim*10,-this.width*0.2,-this.height*0.5+this.anim*15)
                this.layer.fill(200,100,0,this.fade)
                this.layer.stroke(40,this.fade)
                this.layer.strokeWeight(2)
                this.layer.rect(0,this.anim*15,this.width-2,this.height-2)
                this.layer.point(-5,this.anim*15)
                this.layer.point(5,this.anim*15)
            break
            case 12:
                this.layer.stroke(200,this.fade)
                this.layer.line(this.width*0.5,this.height*0.4,this.width*0.5-this.anim*5,-this.height*0.4)
                this.layer.line(this.width*0.5-this.anim*10,this.height*0.4,this.width*0.5-this.anim*5,-this.height*0.4)
                this.layer.line(this.width*0.5-this.anim*10,this.height*0.4,this.width*0.5-this.anim*15,-this.height*0.2)
                this.layer.fill(200,100,0,this.fade)
                this.layer.stroke(40,this.fade)
                this.layer.strokeWeight(2)
                this.layer.rect(-this.anim*15,0,this.width-2,this.height-2)
                this.layer.point(-this.anim*15,-5)
                this.layer.point(-this.anim*15,5)
            break
            case 13:
                this.layer.stroke(200,this.fade)
                this.layer.line(-this.width*0.5,this.height*0.4,-this.width*0.5+this.anim*5,-this.height*0.4)
                this.layer.line(-this.width*0.5+this.anim*10,this.height*0.4,-this.width*0.5+this.anim*5,-this.height*0.4)
                this.layer.line(-this.width*0.5+this.anim*10,this.height*0.4,-this.width*0.5+this.anim*15,-this.height*0.2)
                this.layer.fill(200,100,0,this.fade)
                this.layer.stroke(40,this.fade)
                this.layer.strokeWeight(2)
                this.layer.rect(this.anim*15,0,this.width-2,this.height-2)
                this.layer.point(this.anim*15,-5)
                this.layer.point(this.anim*15,5)
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
                let c=this.collide.box[a][b]
                if(inBoxBox(this,c)){
                    let d=basicCollideBoxBox(this,c)
                    switch(d){
                        case 0:
                            c.position.y=this.position.y+this.height/2+c.height/2
                        break
                        case 1:
                            c.position.y=this.position.y-this.height/2-c.height/2
                        break
                        case 2:
                            c.position.x=this.position.x+this.width/2+c.width/2
                        break
                        case 3:
                            c.position.x=this.position.x-this.width/2-c.width/2
                        break
                    }
                }
            }
        }
    }
    update(){
        this.time++
        this.fade=smoothAnim(this.fade,this.trigger.fade,0,1,5)
        switch(this.type){
            case 8:
                if(this.timer>0){
                    this.timer--
                }
                this.trigger.fade=this.timer<=0||this.timer>180
            break
            case 9:
                if(this.timer>0){
                    this.timer--
                }
                this.trigger.fade=this.timer<=0
            break
            case 10: case 11: case 12: case 13:
                if(this.timer>0){
                    this.timer--
                    this.anim+=0.2
                }else if(this.anim>0){
                    this.anim=round(this.anim*20-1)/20
                }
            break
        }
        if(this.fade>0.2&&!this.deprecate){
            for(let a=0,la=this.collide.box.length;a<la;a++){
                for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                    let c=this.collide.box[a][b]
                    if(!c.orb.active&&!c.goal.dead){
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
                                case 8:
                                    if(this.timer==0){
                                        this.timer=240
                                    }
                                break
                            }
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
                                case 7:
                                    if(!this.active){
                                        this.active=true
                                        this.trigger.fade=false
                                        game.flowers++
                                        elements.flower.timer=180
                                        for(let a=0,la=8;a<la;a++){
                                            entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,360*a/la,2,[[251,158,193]]))
                                        }
                                        levels[game.level][game.zone].spawnRule[this.index]=1
                                    }
                                break
                                case 9:
                                    if(this.timer==175){
                                        c.goal.dead=true
                                    }
                                    if(this.timer==0&&!c.dash.available){
                                        c.dash.available=true
                                        this.timer=240
                                    }
                                break
                                case 10:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.velocity.y=-10
                                        c.velocity.x=0
                                    }
                                break
                                case 11:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.velocity.y=10
                                        c.velocity.x=0
                                    }
                                break
                                case 12:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.velocity.x=-10
                                        c.velocity.y=-2
                                    }
                                break
                                case 13:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.velocity.x=10
                                        c.velocity.y=-2
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
    }
}