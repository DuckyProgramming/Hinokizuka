class wall extends physical{
    constructor(layer,x,y,width,height,type,index,spawnRule){
        super(layer,x,y,width,height)
        this.type=type
        this.index=index
        this.spawnRule=spawnRule
        this.fade=1
        this.kill=0
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
        this.base={width:this.width,height:this.height}
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
        this.standard=this.type!=2&&this.type!=3&&this.type!=4&&this.type!=5&&this.type!=7&&this.type!=8&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=13&&this.type!=15&&this.type!=17&&this.type!=18&&this.type!=19
        this.safe=this.type==1||this.type==6
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
            case 7: case 14:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=false
                this.grabbed=[-1,-1]
                let total714=0
                for(let a=0,la=entities.walls.length;a<la;a++){
                    for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                        if(!entities.walls[a][b].deprecated&&(entities.walls[a][b].type==7||entities.walls[a][b].type==14)){
                            total714++
                        }
                    }
                }
                this.speedMark=total714
                if(this.type==14){
                    this.fly=false
                    this.velocity={y:0}
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
        }
    }
    onDash(){
        if(this.type==14){
            this.fly=true
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
            case 7: case 14:
                if(this.type==14){
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
                this.layer.fill(135,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,9,this.height,2)
                }
                this.layer.fill(120,this.fade)
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
        switch(this.type){
            case 7: case 14:
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
                    this.velocity.y-=physics.gravity
                    this.position.y+=this.velocity.y
                }
            break
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
            case 20:
                if(this.timer>0){
                    this.timer--
                }
            break
        }
        if(this.fade>0.2&&!this.deprecate&&
            this.type!=17
        ){
            for(let a=0,la=this.collide.box.length;a<la;a++){
                for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                    let c=this.collide.box[a][b]
                    if(!c.orb.active&&!c.goal.dead&&
                        !((this.type==15||this.type==18||this.type==19)&&(c.velocity.y<=0||c.previous.position.y>this.position.y-this.height/2-c.height/2+6))
                    ){
                        if(inBoxBox({position:this.position,width:this.width+2,height:this.height+2},c)&&
                            this.type!=2&&this.type!=3&&this.type!=4&&this.type!=5&&this.type!=7&&this.type!=9&&this.type!=10&&this.type!=11&&this.type!=12&&this.type!=13&&
                            !(this.type==8&&this.timer>0&&this.timer<180)
                        ){
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
                                    if(this.timer==1){
                                        c.goal.dead=true
                                    }
                                    if(this.timer==0){
                                        this.timer=240
                                    }
                                break
                            }
                            switch(this.type){
                                case 2:
                                    if(c.velocity.y>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.y>=2){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 3:
                                    if(c.velocity.y<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.y<=-2){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 4:
                                    if(c.velocity.x>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.x>=2){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 5:
                                    if(c.velocity.x<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.previous.velocity.x<=-2){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 16:
                                    c.goal.dead=true
                                break
                                case 7: case 14:
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