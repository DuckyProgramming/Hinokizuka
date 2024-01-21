class wall extends physical{
    constructor(layer,x,y,width,height,type,index,spawnRule,args){
        super(layer,x,y,width,height)
        this.type=type
        this.index=index
        this.spawnRule=spawnRule
        this.args=args||[]
        this.fade=1
        this.kill=0
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
        this.velocity={x:0,y:0}
        this.base={position:{x:this.position.x,y:this.position.y},width:this.width,height:this.height}
        this.deprecate=false
        this.downsize={trigger:false,value:0}
        this.interval=types.wall[this.type].interval
        this.slice=types.wall[this.type].slice
        this.time=0
        this.redundant=[false,false,false,false]
        this.boundary=[]
        this.set()
    }
    set(){
        this.standard=this.type==0||this.type==1||this.type==6||this.type==21||this.type==22||this.type==26
        this.safe=this.type==1||this.type==6||this.type==21||this.type==22
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
            case 7: case 14: case 28:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=false
                this.direction
                this.grabbed=[-1,-1]
                let total7=0
                for(let a=0,la=entities.walls.length;a<la;a++){
                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                        if(!entities.walls[a][b].deprecated&&(entities.walls[a][b].type==7||entities.walls[a][b].type==14||entities.walls[a][b].type==28)){
                            total7++
                        }
                    }
                }
                this.speedMark=total7
                if(this.type==14||this.type==28){
                    this.fly=false
                    this.subVelocity={y:0}
                }
            break
            case 8:
                this.timer=0
            break
            case 9:
                this.base.width=20
                this.base.height=20
                this.width=20
                this.height=20
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
            case 15:
                this.base.height=4
                this.height=4
            break
            case 16:
                this.width=this.base.width-10
                this.height=this.base.height-10
            break
            case 20:
                this.base.width=40
                this.base.height=40
                this.width=40
                this.height=40
                this.timer=0
            break
            case 23:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=false
                this.timer=0
                this.recharge=0
                this.anim=1
                this.direction=0
                this.hold=0
            break
            case 24:
                this.base.width=20
                this.base.height=30
                this.width=20
                this.height=30
                this.timer=0
            break
            case 25:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=false
                this.activeAnim=0
            break
            case 26:
                this.active=false
                this.activeAnim=0
                this.move=0
            break
        }
    }
    onDash(){
        if(this.type==14||this.type==28){
            this.fly=true
        }
    }
    shift(x,y){
        this.position.x+=x
        this.position.y+=y
        this.velocity.x=x
        this.velocity.y=y
        for(let a=0,la=this.boundary.length;a<la;a++){
            for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                this.boundary[a][b][0].x+=x
                this.boundary[a][b][0].y+=y
                this.boundary[a][b][1].x+=x
                this.boundary[a][b][1].y+=y
            }
        }
    }
    checkRedundant(){
        this.redundant=[false,false,false,false]
        this.boundary=[
            [[{x:this.position.x-this.width/2,y:this.position.y+this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y-this.height/2}]],
            [[{x:this.position.x+this.width/2,y:this.position.y-this.height/2},{x:this.position.x+this.width/2,y:this.position.y+this.height/2}]],
            [[{x:this.position.x-this.width/2,y:this.position.y-this.height/2},{x:this.position.x-this.width/2,y:this.position.y+this.height/2}]],
        ]
        if(this.standard){
            if(this.position.y+this.height/2>=game.edge.y){
                this.redundant[0]=true
            }
            if(this.position.y-this.height/2<=0){
                this.redundant[1]=true
            }
            if(this.position.x+this.width/2>=game.edge.x){
                this.redundant[2]=true
            }
            if(this.position.x-this.width/2<=0){
                this.redundant[3]=true
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    let c=entities.walls[a][b]
                    if(c.standard){
                        for(let d=0,ld=this.boundary[0].length;d<ld;d++){
                            if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2>this.boundary[0][d][0].x&&c.position.x+c.width/2<this.boundary[0][d][1].x){
                                this.boundary[0].push([{x:c.position.x+c.width/2,y:this.boundary[0][d][0].y},{x:this.boundary[0][d][1].x,y:this.boundary[0][d][1].y}])
                                this.boundary[0][d][1].x=c.position.x-c.width/2
                            }
                        }
                        for(let d=0,ld=this.boundary[1].length;d<ld;d++){
                            if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2>this.boundary[1][d][0].x&&c.position.x+c.width/2<this.boundary[1][d][1].x){
                                this.boundary[1].push([{x:c.position.x+c.width/2,y:this.boundary[1][d][0].y},{x:this.boundary[1][d][1].x,y:this.boundary[1][d][1].y}])
                                this.boundary[1][d][1].x=c.position.x-c.width/2
                            }
                        }
                        for(let d=0,ld=this.boundary[2].length;d<ld;d++){
                            if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2>this.boundary[2][d][0].y&&c.position.y+c.height/2<this.boundary[2][d][1].y){
                                this.boundary[2].push([{x:this.boundary[2][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[2][d][1].x,y:this.boundary[2][d][1].y}])
                                this.boundary[2][d][1].y=c.position.y-c.height/2
                            }
                        }
                        for(let d=0,ld=this.boundary[3].length;d<ld;d++){
                            if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2>this.boundary[3][d][0].y&&c.position.y+c.height/2<this.boundary[3][d][1].y){
                                this.boundary[3].push([{x:this.boundary[3][d][0].x,y:c.position.y+c.height/2},{x:this.boundary[3][d][1].x,y:this.boundary[3][d][1].y}])
                                this.boundary[3][d][1].y=c.position.y-c.height/2
                            }
                        }
                        for(let d=0,ld=2;d<ld;d++){
                            for(let e=0,le=this.boundary[0].length;e<le;e++){
                                if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2<=this.boundary[0][e][d].x&&c.position.x+c.width/2>=this.boundary[0][e][d].x){
                                    this.boundary[0][e][d].x=c.position.x+c.width/2*(1-d*2)
                                }
                            }
                            for(let e=0,le=this.boundary[1].length;e<le;e++){
                                if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2<=this.boundary[1][e][d].x&&c.position.x+c.width/2>=this.boundary[1][e][d].x){
                                    this.boundary[1][e][d].x=c.position.x+c.width/2*(1-d*2)
                                }
                            }
                            for(let e=0,le=this.boundary[2].length;e<le;e++){
                                if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2<=this.boundary[2][e][d].y&&c.position.y+c.height/2>=this.boundary[2][e][d].y){
                                    this.boundary[2][e][d].y=c.position.y+c.height/2*(1-d*2)
                                }
                            }
                            for(let e=0,le=this.boundary[3].length;e<le;e++){
                                if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2<=this.boundary[3][e][d].y&&c.position.y+c.height/2>=this.boundary[3][e][d].y){
                                    this.boundary[3][e][d].y=c.position.y+c.height/2*(1-d*2)
                                }
                            }
                        }
                        if(c.position.y==this.position.y+this.height/2+c.height/2&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                            this.redundant[0]=true
                        }
                        if(c.position.y==this.position.y-this.height/2-c.height/2&&c.position.x-c.width/2<=this.position.x-this.width/2&&c.position.x+c.width/2>=this.position.x+this.width/2){
                            this.redundant[1]=true
                        }
                        if(c.position.x==this.position.x+this.width/2+c.width/2&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                            this.redundant[2]=true
                        }
                        if(c.position.x==this.position.x-this.width/2-c.width/2&&c.position.y-c.height/2<=this.position.y-this.height/2&&c.position.y+c.height/2>=this.position.y+this.height/2){
                            this.redundant[3]=true
                        }
                    }
                }
            }
        }
    }
    spikify(){
        for(let a=0,la=this.boundary.length;a<la;a++){
            if(!this.redundant[a]){
                for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                    switch(a){
                        case 0:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2+2,abs(this.boundary[a][b][0].x-this.boundary[a][b][1].x),4,3,entities.walls.length,game.zone))
                        break
                        case 1:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2-2,abs(this.boundary[a][b][0].x-this.boundary[a][b][1].x),4,2,entities.walls.length,game.zone))
                        break
                        case 2:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2+2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2,4,abs(this.boundary[a][b][0].y-this.boundary[a][b][1].y),5,entities.walls.length,game.zone))
                        break
                        case 3:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2-2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2,4,abs(this.boundary[a][b][0].y-this.boundary[a][b][1].y),4,entities.walls.length,game.zone))
                        break
                    }
                }
            }
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.noStroke()
        switch(this.type){
            case 1:
                this.layer.fill(150,this.fade)
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
                this.layer.fill(120,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 7: case 14: case 28:
                if(this.type==28){
                    this.layer.scale(1,-1)
                }
                if(this.type==14||this.type==28){
                    this.layer.noFill()
                    this.layer.stroke(240,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.rotate(-20+30*sin(this.time*12))
                    this.layer.arc(-15,-24,16,40,95,160)
                    this.layer.rotate(10)
                    this.layer.arc(-13,-26,12,36,95,160)
                    this.layer.rotate(30-60*sin(this.time*12))
                    this.layer.arc(15,-20,16,40,20,85)
                    this.layer.rotate(-10)
                    this.layer.arc(13,-26,12,36,20,85)
                    this.layer.rotate(-10+30*sin(this.time*12))
                    this.layer.noStroke()
                }
                this.layer.fill(123,189,156,this.fade)
                for(let a=0,la=15;a<la;a++){
                    this.layer.triangle(-2.25,12,2.25,12,0,21)
                    this.layer.rotate(360/la)
                }
                let colors=this.spawnRule==0?
                [[206,111,147],[234,147,180],[253,173,205],[236,141,177],[251,158,193],[255,177,210],[255,203,235]]:
                [[111,147,206],[147,180,234],[173,205,253],[141,177,236],[158,193,251],[177,210,255],[203,235,255]]
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
                this.layer.fill(135,165,135,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,9,this.height,2)
                }
                this.layer.fill(120,150,120,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,5,this.height-4,2)
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
            case 15: case 18: case 19:
                this.layer.fill(230,190,140,this.fade)
                this.layer.rect(0,0,this.width,this.height)
                this.layer.fill(150,110,60)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,2,this.height)
                }
                this.layer.fill(180,this.fade)
                if(this.type!=18){
                    this.layer.quad(-this.width/2+5,this.height/2,-this.width/2+10,this.height/2,-this.width/2,this.height+10,-this.width/2,this.height+5)
                }
                if(this.type!=19){
                    this.layer.quad(this.width/2-5,this.height/2,this.width/2-10,this.height/2,this.width/2,this.height+10,this.width/2,this.height+5)
                }
            break
            case 16:
                this.layer.fill(155,145,195,this.fade)
                this.layer.rect(0,0,this.width-10,this.height-10)
                for(let a=0,la=this.base.width/20;a<la;a++){
                    for(let b=0,lb=this.base.height/20;b<lb;b++){
                        this.layer.image(graphics.walls[(a+b)%4],-this.base.width/2+10+a*20,-this.base.height/2+10+b*20,40,40)
                    }
                }
            break
            case 17:
                this.layer.fill(80,this.fade)
                this.layer.rect(0,0,this.width-8,this.height+1)
            break
            case 20:
                this.layer.fill(40+sin(this.time*8)*10,120+sin(this.time*8)*20,145+sin(this.time*8)*20)
                for(a=0,la=10;a<la;a++){
                    this.layer.triangle(0,-13,0,13,26,0)
                    this.layer.rotate(360/la)
                }
                this.layer.fill(20+sin(this.time*8)*60,200+sin(this.time*8)*55,205+sin(this.time*8)*50)
                for(a=0,la=10;a<la;a++){
                    this.layer.triangle(0,-9,0,9,18,0)
                    this.layer.rotate(360/la)
                }
                this.layer.fill(130+sin(this.time*8)*20,210+sin(this.time*8)*20,215+sin(this.time*8)*20)
                this.layer.ellipse(0,0,24,24)
                this.layer.fill(30+sin(this.time*8)*10,210+sin(this.time*8)*30,215+sin(this.time*8)*30)
                this.layer.ellipse(0,4,8,4)
                this.layer.arc(-4,-3,6,6,45,225)
                this.layer.arc(4,-3,6,6,-45,135)
            break
            case 21:
                this.layer.fill(120,130,140,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 22:
                this.layer.fill(120,130,140,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
                this.layer.stroke(250,this.fade)
                this.layer.strokeWeight(5)
                this.layer.line(-this.width/2+1,-this.height/2+1,this.width/2-1,-this.height/2+1)
            break
            case 23:
                this.layer.strokeWeight(3)
                if(this.anim<1){
                    this.layer.noFill()
                    this.layer.stroke(255,this.fade)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.arc(this.base.position.x-this.position.x,this.base.position.y-this.position.y,this.width*1.2,this.height*1.2,10+a/la*360,-10+(a+1)/la*360)
                    }
                }
				this.layer.fill(50,200,200,this.fade*this.anim)
                this.layer.stroke(30,120,120,this.fade*this.anim)
                this.layer.ellipse(0,0,this.width*1.2,this.height*1.2)
            break
            case 24:
                this.layer.fill(200,255,255,this.fade)
                this.layer.quad(0,-15,-10,-5,0,5,10,-5)
                this.layer.quad(0,-5,-10,5,0,15,10,5)
                this.layer.fill(180,255,255,this.fade)
                this.layer.quad(0,-13,-8,-5,0,3,8,-5)
                this.layer.quad(0,-3,-8,5,0,13,8,5)
            break
            case 25:
                this.layer.noFill()
                this.layer.stroke(180-this.activeAnim*30,180+this.activeAnim*60,180+this.activeAnim*75,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(0,0,25)
                this.layer.line(6*(1-this.activeAnim),-6-1.5*this.activeAnim,7.5*this.activeAnim,0)
                this.layer.line(-6*(1-this.activeAnim),-6-1.5*this.activeAnim,-7.5*this.activeAnim,0)
                this.layer.line(6*(1-this.activeAnim),6+1.5*this.activeAnim,7.5*this.activeAnim,0)
                this.layer.line(-6*(1-this.activeAnim),6+1.5*this.activeAnim,-7.5*this.activeAnim,0)
            break
            case 26:
                this.layer.fill(100,110,120,this.fade)
                this.layer.stroke(80,90,100,this.fade)
                this.layer.strokeWeight(4)
                this.layer.rect(0,0,this.width-4,this.height-4,3)
                this.layer.noFill()
                this.layer.stroke(180-this.activeAnim*30,180+this.activeAnim*60,180+this.activeAnim*75,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(0,0,25)
                this.layer.line(6*(1-this.activeAnim),-6-1.5*this.activeAnim,7.5*this.activeAnim,0)
                this.layer.line(-6*(1-this.activeAnim),-6-1.5*this.activeAnim,-7.5*this.activeAnim,0)
                this.layer.line(6*(1-this.activeAnim),6+1.5*this.activeAnim,7.5*this.activeAnim,0)
                this.layer.line(-6*(1-this.activeAnim),6+1.5*this.activeAnim,-7.5*this.activeAnim,0)
            break
            case 27:
                this.layer.fill(90,100,110,this.fade)
                this.layer.rect(0,0,this.width-8,this.height+1)
            break
        }
        this.layer.pop()
        if(dev.hitbox){
            super.display()
            for(let a=0,la=4;a<la;a++){
                if(!this.redundant[a]){
                    for(let b=0,lb=this.boundary[a].length;b<lb;b++){
                        this.layer.stroke(255,this.select?150:50,this.select?50:0)
                        this.layer.line(
                            this.boundary[a][b][0].x<this.position.x?this.boundary[a][b][0].x+1:this.boundary[a][b][0].x-1,
                            this.boundary[a][b][0].y<this.position.y?this.boundary[a][b][0].y+1:this.boundary[a][b][0].y-1,
                            this.boundary[a][b][1].x<this.position.x?this.boundary[a][b][1].x+1:this.boundary[a][b][1].x-1,
                            this.boundary[a][b][1].y<this.position.y?this.boundary[a][b][1].y+1:this.boundary[a][b][1].y-1
                        )
                    }
                }
            }
        }
    }
    expel(){
        if(this.standard){
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
    }
    update(){
        this.time++
        this.fade=smoothAnim(this.fade,this.trigger.fade,0,1,5)
        this.velocity.x=0
        this.velocity.y=0
        switch(this.type){
            case 7: case 14: case 28:
                if(this.grabbed[0]>=0&&!this.active){
                    this.position.x=map(0.05-this.speedMark*0.015,0,1,this.position.x,this.collide.box[this.grabbed[0]][this.grabbed[1]].position.x)
                    this.position.y=map(0.05-this.speedMark*0.015,0,1,this.position.y,this.collide.box[this.grabbed[0]][this.grabbed[1]].position.y)
                    if(this.collide.box[this.grabbed[0]][this.grabbed[1]].staySafeTime>5){
                        this.active=true
                        this.trigger.fade=false
                        game.running.flowers++
                        if(this.spawnRule==0){
                            game.flowers++
                            game.levelData[game.level].flowers++
                            elements.flower.timer=180
                            for(let a=0,la=8;a<la;a++){
                                entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,360*a/la,2,[[251,158,193]]))
                            }
                        }else{
                            for(let a=0,la=8;a<la;a++){
                                entities.particles.push(new particle(this.layer,this.position.x,this.position.y,0,360*a/la,2,[[158,193,251]]))
                            }
                        }
                        levels[game.level][game.zone].spawnRule[this.index]=1
                    }
                    if(this.collide.box[this.grabbed[0]][this.grabbed[1]].goal.dead||this.collide.box[this.grabbed[0]][this.grabbed[1]].orb.active){
                        this.grabbed=[-1,-1]
                    }
                }else if(this.type==14&&this.fly){
                    this.subVelocity.y-=physics.gravity
                    this.position.y+=this.subVelocity.y
                }else if(this.type==28&&this.fly){
                    this.subVelocity.y+=physics.gravity
                    this.position.y+=this.subVelocity.y
                }
            break
            case 8:
                if(this.timer>0){
                    this.timer--
                }
                this.trigger.fade=this.timer<=0||this.timer>120
                this.standard=this.timer<=0||this.timer>120
            break
            case 9: case 24:
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
            case 20:
                if(this.timer>0){
                    this.timer--
                }
            break
            case 23:
                this.anim=smoothAnim(this.anim,this.recharge==0,0,1,5)
                if(this.active){
                    this.timer++
                    let a=numericalDirection(this.direction)
                    this.shift(a.x*6,a.y*6)
                    this.hold.velocity.x=a.x*6
                    this.hold.velocity.y=a.y*6
                    if(this.timer>=30){
                        this.recharge=120
                        this.hold.width=this.hold.base.base.width
                        this.hold.height=this.hold.base.base.height
                        this.hold.base.width=this.hold.base.base.width
                        this.hold.base.height=this.hold.base.base.height
                        this.hold.bubble.active=false
                        this.hold.dash.available=true
                        this.active=false
                    }
                }else if(this.recharge>0){
                    this.recharge--
                    if(this.recharge==0){
                        this.position.x=this.base.position.x
                        this.position.y=this.base.position.y
                    }
                }
            break
            case 25:
                this.activeAnim=smoothAnim(this.activeAnim,this.active,0,1,5)
            break
            case 26:
                this.activeAnim=smoothAnim(this.activeAnim,this.active,0,1,5)
                if(this.active&&this.args.length>0&&this.move<this.args[0]){
                    this.move+=4
                    let a=numericalDirection(this.args[1])
                    this.shift(a.x*4,a.y*4)
                }
            break
        }
        if(this.fade>0.2&&!this.deprecate&&
            this.type!=17&&this.type!=27
        ){
            for(let a=0,la=this.collide.box.length;a<la;a++){
                for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                    let c=this.collide.box[a][b]
                    if(!c.orb.active&&!c.goal.dead&&
                        !((this.type==15||this.type==18||this.type==19)&&(c.velocity.y<=0||c.previous.position.y>this.position.y-this.height/2-c.height/2+6))
                    ){
                        if(inBoxBox({position:this.position,width:this.width+2,height:this.height+2},c)&&this.standard){
                            let d=collideBoxBox(this,c)
                            c.contact[d]=true
                            if(d==1){
                                c.stamina=c.base.stamina
                            }
                            c.position.x+=this.velocity.x
                            c.position.y+=this.velocity.y
                        }
                        if(inBoxBox(this,c)){
                            let d=collideBoxBox(this,c)
                            c.crush[d]=true
                            switch(this.type){
                                case 8:
                                    if(this.timer==1){
                                        c.goal.dead=true
                                    }
                                    if(this.timer==0){
                                        this.timer=180
                                    }
                                break
                            }
                            switch(this.type){
                                case 2:
                                    if(c.velocity.y>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.y>=2&&abs(c.previous.velocity.x)<3){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 3:
                                    if(c.velocity.y<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.y<=-2&&abs(c.previous.velocity.x)<3){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 4:
                                    if(c.velocity.x>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.x>=2&&abs(c.previous.velocity.y)<3){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 5:
                                    if(c.velocity.x<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.x<=-2&&abs(c.previous.velocity.y)<3){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 7: case 14: case 28:
                                    if(this.grabbed[0]<0){
                                        this.grabbed=[a,b]
                                    }
                                break
                                case 9:
                                    if(this.timer==0&&!c.dash.available){
                                        c.dash.available=true
                                        c.stamina=c.base.stamina
                                        this.timer=240
                                    }
                                break
                                case 10:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.stamina=c.base.stamina
                                        c.velocity.y=-15
                                        c.velocity.x=0
                                        c.dashPhase=false
                                        if(c.dash.active>0){
                                            c.dash.active=0
                                            inputs.keys[c.id][5]=false
                                        }
                                    }
                                break
                                case 11:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.stamina=c.base.stamina
                                        c.velocity.y=9
                                        c.velocity.x=0
                                        c.dashPhase=false
                                        if(c.dash.active>0){
                                            c.dash.active=0
                                            inputs.keys[c.id][5]=false
                                        }
                                    }
                                break
                                case 12:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.stamina=c.base.stamina
                                        c.velocity.x=-12
                                        c.velocity.y=-6
                                        c.dashPhase=false
                                        if(c.dash.active>0){
                                            c.dash.active=0
                                            inputs.keys[c.id][5]=false
                                        }
                                    }
                                break
                                case 13:
                                    if(this.timer==0&&this.anim==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.stamina=c.base.stamina
                                        c.velocity.x=12
                                        c.velocity.y=-6
                                        c.dashPhase=false
                                        if(c.dash.active>0){
                                            c.dash.active=0
                                            inputs.keys[c.id][5]=false
                                        }
                                    }
                                break
                                case 16:
                                    c.goal.dead=true
                                break
                                case 20:
                                    if(this.timer==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.dashPhase=true
                                        if(c.dash.active>0){
                                            c.dash.active=0
                                            inputs.keys[c.id][5]=false
                                        }
                                        c.stamina=c.base.stamina
                                        entities.particles.push(new particle(this.layer,this.position.x,this.position.y,2,0,2,[[125,200,255]]))
                                        let direction=atan2(c.position.x-this.position.x,c.position.y-this.position.y)
                                        c.velocity.x=sin(direction)*15
                                        c.velocity.y=cos(direction)*15
                                    }
                                break
                                case 23:
                                    if(!this.active&&this.recharge==0&&!c.bubble.active){
                                        let e={x:0,y:0}
                                        if(inputs.keys[c.id][0]){
                                            e.y--
                                        }
                                        if(inputs.keys[c.id][1]){
                                            e.y++
                                        }
                                        if(inputs.keys[c.id][2]){
                                            e.x--
                                        }
                                        if(inputs.keys[c.id][3]){
                                            e.x++
                                        }
                                        if(e.x==0&&e.y==0){
                                            this.recharge=60                                            
                                        }else{
                                            this.direction=deNumericalDirection(e.x,e.y)
                                            this.active=true
                                            c.width=this.width
                                            c.height=this.height
                                            c.base.width=this.width
                                            c.base.height=this.height
                                            c.bubble.active=true
                                            c.bubble.shiftTime=5
                                            c.bubble.shift.x=this.position.x-c.position.x
                                            c.bubble.shift.y=this.position.y-c.position.y
                                            c.velocity.x=0
                                            c.velocity.y=0
                                            this.timer=0
                                            this.hold=c
                                        }
                                    }
                                break
                                case 24:
                                    if(this.timer==0&&!c.dash.second.available){
                                        c.dash.available=true
                                        c.dash.second.available=true
                                        c.stamina=c.base.stamina
                                        this.timer=240
                                    }
                                break
                                case 25:
                                    if(!this.active){
                                        this.active=true
                                        let allActive=true
                                        for(let a=0,la=entities.walls.length;a<la;a++){
                                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                if(entities.walls[a][b].type==25&&!entities.walls[a][b].active){
                                                    allActive=false
                                                }
                                            }
                                        }
                                        if(allActive){
                                            for(let a=0,la=entities.walls.length;a<la;a++){
                                                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                    if(entities.walls[a][b].type==26){
                                                        entities.walls[a][b].active=true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                break
                                default:
                                    if(d>=0&&!this.redundant[d]){
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
                                                    if(this.safe&&!c.goal.dead&&c.safe){
                                                        c.safeTime=5
                                                    }
                                                    if(c.dash.active==0){
                                                        c.velocity.x*=physics.friction.x
                                                    }
                                                    if(c.dash.timer==0){
                                                        c.dash.available=true
                                                    }
                                                    if(c.setSpawn&&c.position.x>10&&c.position.x<game.edge.x-10&&c.position.y>10&&c.position.y<game.edge.y-10&&this.standard){
                                                        c.stageSpawn=max(1,c.stageSpawn)
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
}