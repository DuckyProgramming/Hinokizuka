class wall extends physical{
    constructor(layer,x,y,width,height,type,index,spawnRule,zone,args){
        super(layer,x,y,width,height)
        this.type=type
        this.index=index
        this.spawnRule=spawnRule
        this.zone=zone
        this.args=args||[]
        this.fade=1
        this.kill=0
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
        this.velocity={x:0,y:0}
        this.base={position:{x:this.position.x,y:this.position.y},width:this.width,height:this.height}
        this.previous={position:{x:0,y:0}}
        this.deprecate=false
        this.downsize={trigger:[false,false],value:0}
        this.interval=types.wall[this.type].interval
        this.slice=types.wall[this.type].slice
        this.time=0
        this.redundant=[false,false,false,false]
        this.boundary=[]
        this.set()
    }
    set(){
        switch(this.type){
            case 2: case 37: case 52: case 61:
                this.base.height=4
                this.height=4
                this.width=this.base.width-4
                this.deadly=true
            break
            case 3: case 38: case 53: case 62:
                this.base.height=4
                this.height=4
                this.width=this.base.width-4
                this.deadly=true
            break
            case 4: case 39: case 54: case 63:
                this.base.width=4
                this.width=4
                this.height=this.base.height-4
                this.deadly=true
            break
            case 5: case 40: case 55: case 64:
                this.base.width=4
                this.width=4
                this.height=this.base.height-4
                this.deadly=true
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
                        if(!entities.walls[a][b].deprecated&&(entities.walls[a][b].type==7||entities.walls[a][b].type==14||entities.walls[a][b].type==28)&&entities.walls[a][b].index>this.index){
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
            case 8: case 66: case 74:
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
            case 16: case 45: case 65: case 73:
                this.width=this.base.width-10
                this.height=this.base.height-10
                this.deadly=true
            break
            case 20: case 41:
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
            case 29:
                this.active=false
                this.direction=0
                this.rate=0
                this.anim=0
                this.break=false
                this.timer=0
            break
            case 30:
                this.break=false
                this.timer=0
                this.subVelocity={x:0,y:0}
            break
            case 31:
                this.switch=this.args[4]
                this.anim=0
                this.break=false
                this.timer=0
                this.subVelocity={x:0,y:0}
            break
            case 32: case 49:
                this.base.width=30
                this.base.height=30
                this.width=30
                this.height=30
                this.active=true
                this.anim=0
                this.offset=0
                this.timer=0
            break
            case 33: case 50:
                this.base.width=10
                this.base.height=10
                this.width=10
                this.height=10
                switch(this.args[0]){
                    case 1:
                        if(this.args.length<=3){
                            this.args[3]=0
                        }
                        for(let a=0,la=floor((game.edge.x+100)/(this.args[1]*this.args[2])-this.args[3]);a<la;a++){
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,-50+this.args[1]*this.args[2]*(a+this.args[3]),this.position.y,0,0,this.type-1,-1,0,this.zone,[1,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        }
                    break
                    case 2:
                        if(this.args.length<=3){
                            this.args[3]=0
                        }
                        for(let a=0,la=floor((game.edge.x+100)/(this.args[1]*this.args[2])-this.args[3]);a<la;a++){
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,game.edge.x+50-this.args[1]*this.args[2]*(a+this.args[3]),this.position.y,0,0,this.type-1,-1,0,this.zone,[2,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        }
                    break
                    case 3:
                        if(this.args.length<=3){
                            this.args[3]=0
                        }
                        for(let a=0,la=floor((game.edge.y+100)/(this.args[1]*this.args[2])-this.args[3]);a<la;a++){
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,this.position.x,-50+this.args[1]*this.args[2]*(a+this.args[3]),0,0,this.type-1,-1,0,this.zone,[3,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        }
                    break
                    case 4:
                        if(this.args.length<=3){
                            this.args[3]=0
                        }
                        for(let a=0,la=floor((game.edge.y+100)/(this.args[1]*this.args[2])-this.args[3]);a<la;a++){
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,this.position.x,game.edge.y+50-this.args[1]*this.args[2]*(a+this.args[3]),0,0,this.type-1,-1,0,this.zone,[4,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        }
                    break
                    case 5:
                        if(this.args.length<=5){
                            this.args[5]=0
                        }
                        for(let a=0,la=floor(360/(this.args[2]*this.args[4])-this.args[5]);a<la;a++){
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,
                                this.position.x+cos(this.args[3])*this.args[1]*360/this.args[4]/TWO_PI-cos(this.args[3]+a*this.args[2]*this.args[4]+this.args[5]*this.args[2]*this.args[4])*this.args[1]*360/this.args[4]/TWO_PI,
                                this.position.y-sin(this.args[3])*this.args[1]*360/this.args[4]/TWO_PI+sin(this.args[3]+a*this.args[2]*this.args[4]+this.args[5]*this.args[2]*this.args[4])*this.args[1]*360/this.args[4]/TWO_PI,
                            0,0,this.type-1,-1,0,this.zone,[5,this.args[1],this.args[3],this.args[4],a*this.args[2]*this.args[4]+this.args[5]*this.args[2]*this.args[4]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        }
                    break
                }
            break
            case 46:
                this.timer=0
                this.anim=0
            break
            case 47:
                this.base.width=20
                this.base.height=20
                this.width=20
                this.height=20
                this.timer=0
                this.anim=0
            break
            case 48:
                this.base.width=20
                this.base.height=20
                this.width=20
                this.height=20
                this.timer=0
            break
            case 51:
                this.anim=0
                this.move=0
            break
            case 67:
                this.deadly=true
                this.timer=0
                this.pause=0
                this.history=[]
                this.direction=0
                this.speed=0
            break
        }
        this.standard=[0,1,6,15,18,19,21,22,26,29,30,31,34,35,42,43,46,51,56,57,66,67,69,74].includes(this.type)
        this.safe=[1,6,21,22,34,35,42,43,56,57,69].includes(this.type)
        this.expandable=[1,2,3,4,5,6,16,17,21,22,27,34,35,36,37,38,39,40,42,43,44,45,52,53,54,55,56,57,58,61,62,63,64,65,73].includes(this.type)
    }
    onDash(){
        switch(this.type){
            case 14: case 28:
                if(!dev.freecam){
                    this.fly=true
                }
            break
            case 31:
                this.switch=1-this.switch
            break
        }
    }
    onSwitch(){
        switch(this.type){
            case 32:
                this.type=49
                this.offset=180
            break
            case 33:
                this.type=50
            break
            case 49:
                this.type=32
                this.offset=180
            break
            case 50:
                this.type=33
            break
            case 46:
                if(this.timer>=30){
                    this.timer=76
                }
            break
            case 47:
                this.timer=60
            break
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
    execute(args){
        switch(this.type){
            case 23:
                if(this.active&&!(this.args[0]==1&&this.hold!=args[1])){
                    this.recharge=60
                    this.hold.width=this.hold.base.base.width
                    this.hold.height=this.hold.base.base.height
                    this.hold.base.width=this.hold.base.base.width
                    this.hold.base.height=this.hold.base.base.height
                    this.hold.bubble.active=false
                    this.active=false
                    if(args[0]==1){
                        this.anim=0
                    }
                }
            break
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
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2+2,abs(this.boundary[a][b][0].x-this.boundary[a][b][1].x),4,3+(game.level==3?35:0)+(game.level==4?50:0)+(game.level==5?59:0),entities.walls.length,0,this.zone))
                        break
                        case 1:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2-2,abs(this.boundary[a][b][0].x-this.boundary[a][b][1].x),4,2+(game.level==3?35:0)+(game.level==4?50:0)+(game.level==5?59:0),entities.walls.length,0,this.zone))
                        break
                        case 2:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2+2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2,4,abs(this.boundary[a][b][0].y-this.boundary[a][b][1].y),5+(game.level==3?35:0)+(game.level==4?50:0)+(game.level==5?59:0),entities.walls.length,0,this.zone))
                        break
                        case 3:
                            entities.walls[1].push(new wall(this.layer,this.boundary[a][b][0].x/2+this.boundary[a][b][1].x/2-2,this.boundary[a][b][0].y/2+this.boundary[a][b][1].y/2,4,abs(this.boundary[a][b][0].y-this.boundary[a][b][1].y),4+(game.level==3?35:0)+(game.level==4?50:0)+(game.level==5?59:0),entities.walls.length,0,this.zone))
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
                this.layer.stroke(80,60,40,this.fade)
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
                this.layer.stroke(80,60,40,this.fade)
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
                this.layer.stroke(80,60,40,this.fade)
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
                this.layer.stroke(80,60,40,this.fade)
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
                if(this.anim<1||this.timer>15){
                    this.layer.noFill()
                    this.layer.stroke(255,this.fade)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.arc(this.base.position.x-this.position.x,this.base.position.y-this.position.y,this.width*1.2,this.height*1.2,10+a/la*360,-10+(a+1)/la*360)
                    }
                }
				this.layer.fill(50,200,200,this.fade*this.anim)
                this.layer.stroke(30,120,120,this.fade*this.anim)
                this.layer.ellipse(0,0,this.width*1.2,this.height*1.2)
                this.layer.noFill()
                this.layer.stroke(60,240,240,this.fade*this.anim)
                this.layer.arc(0,0,this.width*0.8,this.height*0.8,-75,-15)
            break
            case 24:
                this.layer.fill(200,200,255,this.fade)
                this.layer.quad(0,-15,-10,-5,0,5,10,-5)
                this.layer.quad(0,-5,-10,5,0,15,10,5)
                this.layer.fill(180,180,255,this.fade)
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
            case 29:
                this.layer.fill(140,160,180,this.fade)
                this.layer.stroke(110,130,150,this.fade)
                this.layer.strokeWeight(6)
                this.layer.beginShape()
                for(let a=0,la=this.width/20;a<la;a++){
                    this.layer.vertex(-this.width/2+a*20+(a==0&&this.index%2==1?3:0),-this.height/2+(a+this.index)%2*3)
                }
                for(let a=0,la=this.height/20;a<la;a++){
                    this.layer.vertex(this.width/2-(a+this.index)%2*3,-this.height/2+a*20+(a==0&&floor(this.width/20+this.index)%2==1?3:0))
                }
                for(let a=0,la=this.width/20;a<la;a++){
                    this.layer.vertex(this.width/2-a*20-(a==0&&this.index%2==1?3:0),this.height/2-(a+this.index)%2*3)
                }
                for(let a=0,la=this.height/20;a<la;a++){
                    this.layer.vertex(-this.width/2+(a+this.index)%2*3,this.height/2-a*20-(a==0&&floor(this.width/20+this.index)%2==1?3:0))
                }
                this.layer.endShape(CLOSE)
                this.layer.rotate(this.rate)
                this.layer.fill(90,110,130,this.fade)
                this.layer.stroke(70,100,110,this.fade)
                this.layer.strokeWeight(3)
                this.layer.rect(0,-12,7,10)
                this.layer.rect(0,12,7,10)
                this.layer.rect(-12,0,10,7)
                this.layer.rect(12,0,10,7)
                this.layer.ellipse(0,0,18)
                this.layer.noStroke()
                this.layer.fill(this.anim*250,this.fade)
                this.layer.ellipse(0,0,7)
            break
            case 30: case 31:
                this.layer.fill(200,this.fade)
                if(this.type==31){
                    for(let a=0,la=this.base.width/20*3;a<la;a++){
                        this.layer.triangle(-this.base.width/2+a*20/3,-this.height/2+10-this.anim*10,-this.base.width/2+a*20/3+20/3,-this.height/2+10-this.anim*10,-this.base.width/2+a*20/3+10/3,-this.height/2-this.anim*10)
                        this.layer.triangle(-this.base.width/2+a*20/3,this.height/2-10+this.anim*10,-this.base.width/2+a*20/3+20/3,this.height/2-10+this.anim*10,-this.base.width/2+a*20/3+10/3,this.height/2+this.anim*10)
                    }
                    for(let a=0,la=this.base.height/20*3;a<la;a++){
                        this.layer.triangle(-this.width/2+10-this.anim*10,-this.base.height/2+a*20/3,-this.width/2+10-this.anim*10,-this.base.height/2+a*20/3+20/3,-this.width/2-this.anim*10,-this.base.height/2+a*20/3+10/3)
                        this.layer.triangle(this.width/2-10+this.anim*10,-this.base.height/2+a*20/3,this.width/2-10+this.anim*10,-this.base.height/2+a*20/3+20/3,this.width/2+this.anim*10,-this.base.height/2+a*20/3+10/3)
                    }
                }
                this.layer.fill(140,160,180,this.fade)
                this.layer.stroke(110,130,150,this.fade)
                this.layer.strokeWeight(6)
                this.layer.beginShape()
                for(let a=0,la=this.width/20;a<la;a++){
                    this.layer.vertex(-this.width/2+a*20+(a==0&&this.index%2==1?3:0),-this.height/2+(a+this.index)%2*3)
                }
                for(let a=0,la=this.height/20;a<la;a++){
                    this.layer.vertex(this.width/2-(a+this.index)%2*3,-this.height/2+a*20+(a==0&&floor(this.width/20+this.index)%2==1?3:0))
                }
                for(let a=0,la=this.width/20;a<la;a++){
                    this.layer.vertex(this.width/2-a*20-(a==0&&this.index%2==1?3:0),this.height/2-(a+this.index)%2*3)
                }
                for(let a=0,la=this.height/20;a<la;a++){
                    this.layer.vertex(-this.width/2+(a+this.index)%2*3,this.height/2-a*20-(a==0&&floor(this.width/20+this.index)%2==1?3:0))
                }
                this.layer.endShape(CLOSE)
                if(this.type==31){
                    this.layer.fill(this.anim*500,0,500-this.anim*500,this.fade)
                }else{
                    this.layer.fill(50,200,50,this.fade)
                }
                this.layer.stroke(70,100,110,this.fade)
                this.layer.strokeWeight(3)
                this.layer.ellipse(0,0,18)
                this.layer.strokeWeight(2)
                if(this.args[0]==1){
                    this.layer.rect(0,this.height/2-10,12,4,1)
                }
                if(this.args[1]==1){
                    this.layer.rect(0,-this.height/2+10,12,4,1)
                }
                if(this.args[2]==1){
                    this.layer.rect(this.width/2-10,0,4,12,1)
                }
                if(this.args[3]==1){
                    this.layer.rect(-this.width/2+10,0,4,12,1)
                }
            break
            case 32: case 49:
                this.layer.rotate(-this.offset+(this.type==49?180:0))
                this.layer.scale(1+this.anim*0.5)
                this.layer.noStroke()
                this.layer.fill(45,105,210,this.fade)
                this.layer.rotate(-60)
                this.layer.triangle(-3,12,3,12,0,21)
                this.layer.rotate(30)
                this.layer.triangle(-3,12,3,12,0,24)
                this.layer.rotate(30)
                this.layer.triangle(-3,12,3,12,0,27)
                this.layer.rotate(30)
                this.layer.triangle(-3,12,3,12,0,24)
                this.layer.rotate(30)
                this.layer.triangle(-3,12,3,12,0,21)
                this.layer.rotate(-60)
                this.layer.fill(60,135,225,this.fade)
                this.layer.ellipse(0,0,32,32)
                this.layer.stroke(75,150,240,this.fade)
                this.layer.strokeWeight(2)
                for(let a=0,la=5;a<la;a++){
                    this.layer.arc(a%2*3,0,28-a*6,28-a*6,-180+a*180,a*180)
                }
            break
            case 34:
                this.layer.fill(210,120,90,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 35:
                this.layer.fill(210,120,90,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
                this.layer.stroke(250,this.fade)
                this.layer.strokeWeight(5)
                this.layer.line(-this.width/2+1,-this.height/2+1,this.width/2-1,-this.height/2+1)
            break
            case 36:
                this.layer.fill(180,90,60,this.fade)
                this.layer.rect(0,0,this.width-8,this.height+1)
            break
            case 37:
                this.layer.fill(180,120,60,this.fade)
                for(let a=0,la=this.base.width/20*3;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*20/3,this.height/2,-this.base.width/2+a*20/3+20/3,this.height/2,-this.base.width/2+a*20/3+10/3,-this.height*3/2)
                }
            break
            case 38:
                this.layer.fill(180,120,60,this.fade)
                for(let a=0,la=this.base.width/20*3;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*20/3,-this.height/2,-this.base.width/2+a*20/3+20/3,-this.height/2,-this.base.width/2+a*20/3+10/3,this.height*3/2)
                }
            break
            case 39:
                this.layer.fill(180,120,60,this.fade)
                for(let a=0,la=this.base.height/20*3;a<la;a++){
                    this.layer.triangle(this.width/2,-this.base.height/2+a*20/3,this.width/2,-this.base.height/2+a*20/3+20/3,-this.width*3/2,-this.base.height/2+a*20/3+10/3)
                }
            break
            case 40:
                this.layer.fill(180,120,60,this.fade)
                for(let a=0,la=this.base.height/20*3;a<la;a++){
                    this.layer.triangle(-this.width/2,-this.base.height/2+a*20/3,-this.width/2,-this.base.height/2+a*20/3+20/3,this.width*3/2,-this.base.height/2+a*20/3+10/3)
                }
            break
            case 41:
                this.layer.fill(145+sin(this.time*8)*10,65+sin(this.time*8)*20,40+sin(this.time*8)*20)
                for(a=0,la=10;a<la;a++){
                    this.layer.triangle(0,-13,0,13,26,0)
                    this.layer.rotate(360/la)
                }
                this.layer.fill(205+sin(this.time*8)*60,25+sin(this.time*8)*55,20+sin(this.time*8)*50)
                for(a=0,la=10;a<la;a++){
                    this.layer.triangle(0,-9,0,9,18,0)
                    this.layer.rotate(360/la)
                }
                this.layer.fill(215+sin(this.time*8)*20,135+sin(this.time*8)*20,130+sin(this.time*8)*20)
                this.layer.ellipse(0,0,24,24)
                this.layer.fill(215+sin(this.time*8)*10,35+sin(this.time*8)*30,30+sin(this.time*8)*30)
                this.layer.ellipse(0,4,8,4)
                this.layer.arc(-4,-3,6,6,45,225)
                this.layer.arc(4,-3,6,6,-45,135)
            break
            case 42:
                this.layer.fill(140,200,180,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 43:
                this.layer.fill(140,200,180,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
                this.layer.stroke(250,this.fade)
                this.layer.strokeWeight(5)
                this.layer.line(-this.width/2+1,-this.height/2+1,this.width/2-1,-this.height/2+1)
            break
            case 44:
                this.layer.fill(100,160,140,this.fade)
                this.layer.rect(0,0,this.width-8,this.height+1)
            break
            case 45:
                this.layer.fill(80,200,200,this.fade)
                this.layer.rect(0,0,this.width-10,this.height-10)
                for(let a=0,la=this.base.width/20;a<la;a++){
                    for(let b=0,lb=this.base.height/20;b<lb;b++){
                        this.layer.image(graphics.walls[(a+b)%4+4],-this.base.width/2+10+a*20,-this.base.height/2+10+b*20,40,40)
                    }
                }
            break
            case 46:
                this.layer.noStroke()
				this.layer.fill(60,135,215,this.fade)
				for(let a=0,la=this.width/10-1;a<la;a++){
					this.layer.triangle(5+a*10-this.width/2,this.height/2-1,15+a*10-this.width/2,this.height/2-1,10+a*10-this.width/2,this.height/2+3)
				}
				this.layer.fill(70,145,225,this.fade)
				for(let a=0,la=this.width/10;a<la;a++){
					this.layer.triangle(a*10-this.width/2,this.height/2-1,10+a*10-this.width/2,this.height/2-1,5+a*10-this.width/2,this.height/2+4)
				}
				this.layer.fill(70,145,245,this.fade)
				this.layer.rect(0,0,this.width+4,this.height+4,4)
				this.layer.fill(60,135,235,this.fade)
				this.layer.rect(0,0,this.width+2,this.height+2,4)
				this.layer.fill(50,125,225,this.fade)
				this.layer.rect(0,0,this.width,this.height,3)
				this.layer.fill(55,130,230,this.fade)
				this.layer.rect(0,0,this.width-20,this.height-20,3)
				this.layer.fill(30,105,205,this.fade)
				this.layer.stroke(0,55,155,this.fade)
				this.layer.strokeWeight(1)
				for(let a=0,la=this.width/10;a<la;a++){
					for(let b=0,lb=this.height/10;b<lb;b++){
						this.layer.quad(5+a*10-this.width/2,b*10-this.height/2,a*10-this.width/2,5+b*10-this.height/2,5+a*10-this.width/2,10+b*10-this.height/2,10+a*10-this.width/2,5+b*10-this.height/2)
					}
				}
                this.layer.noStroke()
                this.layer.fill(200,255,255,this.fade)
				regStar(this.layer,0,0,6,8,8,2,2,30)
				this.layer.fill(80,200,255,this.fade)
				regStar(this.layer,0,0,6,6,6,1.5,1.5,30)
				this.layer.fill(40,160,255,this.fade)
				regStar(this.layer,0,0,6,4,4,1,1,30)
            break
            case 47:
                for(let a=0,la=24;a<la;a++){
                    this.layer.fill(150+a%2*50,250,250,this.fade)
                    this.layer.triangle(-1,-11,1,-11,0,-16-a%2*2)
                    this.layer.rotate(15)
                }
                this.layer.fill(160,200,240,this.fade)
                this.layer.ellipse(0,0,24)
                this.layer.fill(120,160,200,this.fade)
                for(let a=0,la=12;a<la;a++){
                    this.layer.arc(0,0,20,20,a*30+6,a*30+24)
                }
                this.layer.fill(160,200,240,this.fade)
                this.layer.ellipse(0,0,16)
                this.layer.rotate(-45+this.anim*90)
                this.layer.fill(40,80,120,this.fade)
                this.layer.rect(0,0,4,32)
                this.layer.fill(40,60,80,this.fade)
                this.layer.rect(0,0,4,28)
                this.layer.fill(80,120,160,this.fade)
                this.layer.ellipse(0,0,12)
                this.layer.fill(80,100,120,this.fade)
                this.layer.rect(0,0,7)
                this.layer.fill(120,180,240,this.fade)
                this.layer.rect(0,0,4)
            break
            case 48:
                this.layer.fill(255,255,180,this.fade)
                this.layer.quad(0,-12,-12,0,0,12,12,0)
                this.layer.fill(255,255,150,this.fade)
                this.layer.quad(0,-10,-10,0,0,10,10,0)
            break
            case 51:
                this.layer.fill(100,140,180,this.fade)
                this.layer.stroke(80,120,160,this.fade)
                this.layer.strokeWeight(4)
                this.layer.rect(0,0,this.width-4,this.height-4,3)
                this.layer.ellipse(0,0,26)
                this.layer.line(-this.width/2+2,-this.height/2+14,-this.width/2+14,-this.height/2+2)
                this.layer.line(this.width/2-2,-this.height/2+14,this.width/2-14,-this.height/2+2)
                this.layer.line(-this.width/2+2,this.height/2-14,-this.width/2+14,this.height/2-2)
                this.layer.line(this.width/2-2,this.height/2-14,this.width/2-14,this.height/2-2)
                this.layer.noStroke()
                this.layer.fill(200,255,255,this.fade)
				regStar(this.layer,0,0,6,8,8,2,2,30)
				this.layer.fill(80,200,255,this.fade)
				regStar(this.layer,0,0,6,6,6,1.5,1.5,30)
				this.layer.fill(40,160,255,this.fade)
				regStar(this.layer,0,0,6,4,4,1,1,30)
            break
            case 52:
                for(let a=0,la=this.base.width/10;a<la;a++){
                    this.layer.fill(120+a%2*80,180+a%2*60,240+a%2*10,this.fade)
                    this.layer.triangle(-this.base.width/2+a*10+2,this.height/2,-this.base.width/2+a*10+8,this.height/2,-this.base.width/2+a*10+5,-this.height*2)
                }
            break
            case 53:
                for(let a=0,la=this.base.width/10;a<la;a++){
                    this.layer.fill(120+a%2*80,180+a%2*60,240+a%2*10,this.fade)
                    this.layer.triangle(-this.base.width/2+a*10+2,-this.height/2,-this.base.width/2+a*10+8,-this.height/2,-this.base.width/2+a*10+5,this.height*2)
                }
            break
            case 54:
                for(let a=0,la=this.base.height/10;a<la;a++){
                    this.layer.fill(120+a%2*80,180+a%2*60,240+a%2*10,this.fade)
                    this.layer.triangle(this.width/2,-this.base.height/2+a*10+2,this.width/2,-this.base.height/2+a*10+8,-this.width*2,-this.base.height/2+a*10+5)
                }
            break
            case 55:
                for(let a=0,la=this.base.height/10;a<la;a++){
                    this.layer.fill(120+a%2*80,180+a%2*60,240+a%2*10,this.fade)
                    this.layer.triangle(-this.width/2,-this.base.height/2+a*10+2,-this.width/2,-this.base.height/2+a*10+8,this.width*2,-this.base.height/2+a*10+5)
                }
            break
            case 56:
                this.layer.fill(220,100,120,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
            break
            case 57:
                this.layer.fill(220,100,120,this.fade)
                this.layer.rect(0,0,this.width+1,this.height+1)
                this.layer.stroke(250,this.fade)
                this.layer.strokeWeight(5)
                this.layer.line(-this.width/2+1,-this.height/2+1,this.width/2-1,-this.height/2+1)
            break
            case 58:
                this.layer.fill(180,80,100,this.fade)
                this.layer.rect(0,0,this.width-8,this.height+1)
            break
            case 59:
                this.layer.stroke(160,this.fade)
                this.layer.strokeWeight(2)
                this.layer.line(-this.width/2,-this.height/2,this.width/2,this.height/2)
            break
            case 60:
                this.layer.stroke(160,this.fade)
                this.layer.strokeWeight(2)
                this.layer.line(-this.width/2,this.height/2,this.width/2,-this.height/2)
            break
            case 61:
                this.layer.fill(180,100,140,this.fade)
                for(let a=0,la=this.base.width/10;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*10,this.height/2,-this.base.width/2+a*10+17/3,this.height/2,-this.base.width/2+a*10+10/3,-this.height*3/2)
                    this.layer.triangle(-this.base.width/2+a*10+13/3,this.height/2,-this.base.width/2+a*10+10,this.height/2,-this.base.width/2+a*10+20/3,-this.height*3/2)
                }
            break
            case 62:
                this.layer.fill(180,100,140,this.fade)
                for(let a=0,la=this.base.width/10;a<la;a++){
                    this.layer.triangle(-this.base.width/2+a*10,-this.height/2,-this.base.width/2+a*10+17/3,-this.height/2,-this.base.width/2+a*10+10/3,this.height*3/2)
                    this.layer.triangle(-this.base.width/2+a*10+13/3,-this.height/2,-this.base.width/2+a*10+10,-this.height/2,-this.base.width/2+a*10+20/3,this.height*3/2)
                }
            break
            case 63:
                this.layer.fill(180,100,140,this.fade)
                for(let a=0,la=this.base.height/10;a<la;a++){
                    this.layer.triangle(this.width/2,-this.base.height/2+a*10,this.width/2,-this.base.height/2+a*10+17/3,-this.width*3/2,-this.base.height/2+a*10+10/3)
                    this.layer.triangle(this.width/2,-this.base.height/2+a*10+13/3,this.width/2,-this.base.height/2+a*10+10,-this.width*3/2,-this.base.height/2+a*10+20/3)
                }
            break
            case 64:
                this.layer.fill(180,100,140,this.fade)
                for(let a=0,la=this.base.height/10;a<la;a++){
                    this.layer.triangle(-this.width/2,-this.base.height/2+a*10,-this.width/2,-this.base.height/2+a*10+17/3,this.width*3/2,-this.base.height/2+a*10+10/3)
                    this.layer.triangle(-this.width/2,-this.base.height/2+a*10+13/3,-this.width/2,-this.base.height/2+a*10+10,this.width*3/2,-this.base.height/2+a*10+20/3)
                }
            break
            case 65:
                this.layer.fill(200,80,120,this.fade)
                this.layer.rect(0,0,this.width-10,this.height-10)
                for(let a=0,la=this.base.width/20;a<la;a++){
                    for(let b=0,lb=this.base.height/20;b<lb;b++){
                        this.layer.image(graphics.walls[(a+b)%4+12],-this.base.width/2+10+a*20,-this.base.height/2+10+b*20,40,40)
                    }
                }
            break
            case 66:
                this.layer.fill(165,135,165,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,9,this.height,2)
                }
                this.layer.fill(150,120,150,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,5,this.height-4,2)
                }
            break
            case 67:
                this.layer.fill(120,100,140,this.fade)
                this.layer.stroke(80,60,100,this.fade)
                this.layer.strokeWeight(4)
                this.layer.beginShape()
                this.layer.vertex(-this.width/2+7,-this.height/2+2)
                this.layer.vertex(this.width/2-7,-this.height/2+2)
                this.layer.vertex(this.width/2-2,-this.height/2+7)
                this.layer.vertex(this.width/2-2,this.height/2-7)
                this.layer.vertex(this.width/2-7,this.height/2-2)
                this.layer.vertex(-this.width/2+7,this.height/2-2)
                this.layer.vertex(-this.width/2+2,this.height/2-7)
                this.layer.vertex(-this.width/2+2,-this.height/2+7)
                this.layer.endShape(CLOSE)
                this.layer.ellipse(0,0,20,20)
                this.layer.line(-7,-7,7,7)
                for(let a=0,la=4;a<la;a++){
                    if(this.args[a]){
                        this.layer.stroke(255,100+(this.direction==a+1?50:0),150+(this.direction==a+1?50:0))
                        this.layer.strokeWeight(6)
                        switch(a){
                            case 0:
                                this.layer.line(-this.width/2+18,this.height/2-9,-this.width/15,this.height/2-9)
                                this.layer.line(this.width/2-18,this.height/2-9,this.width/15,this.height/2-9)
                            break
                            case 1:
                                this.layer.line(-this.width/2+18,-this.height/2+9,-this.width/15,-this.height/2+9)
                                this.layer.line(this.width/2-18,-this.height/2+9,this.width/15,-this.height/2+9)
                            break
                            case 2:
                                this.layer.line(this.width/2-9,-this.height/2+18,this.width/2-9,-this.height/15)
                                this.layer.line(this.width/2-9,this.height/2-18,this.width/2-9,this.height/15)
                            break
                            case 3:
                                this.layer.line(-this.width/2+9,-this.height/2+18,-this.width/2+9,-this.height/15)
                                this.layer.line(-this.width/2+9,this.height/2-18,-this.width/2+9,this.height/15)
                            break
                        }
                        this.layer.stroke(255,50+(this.direction==a+1?50:0),100+(this.direction==a+1?50:0))
                        this.layer.strokeWeight(3)
                        switch(a){
                            case 0:
                                this.layer.line(-this.width/2+18,this.height/2-9,-this.width/15,this.height/2-9)
                                this.layer.line(this.width/2-18,this.height/2-9,this.width/15,this.height/2-9)
                            break
                            case 1:
                                this.layer.line(-this.width/2+18,-this.height/2+9,-this.width/15,-this.height/2+9)
                                this.layer.line(this.width/2-18,-this.height/2+9,this.width/15,-this.height/2+9)
                            break
                            case 2:
                                this.layer.line(this.width/2-9,-this.height/2+18,this.width/2-9,-this.height/15)
                                this.layer.line(this.width/2-9,this.height/2-18,this.width/2-9,this.height/15)
                            break
                            case 3:
                                this.layer.line(-this.width/2+9,-this.height/2+18,-this.width/2+9,-this.height/15)
                                this.layer.line(-this.width/2+9,this.height/2-18,-this.width/2+9,this.height/15)
                            break
                        }
                    }
                }
            break
            case 68:
                this.layer.fill(0,this.fade)
                this.layer.stroke(255,this.fade)
                this.layer.strokeWeight(1)
                this.layer.beginShape()
                for(let a=0,la=this.width*3/10;a<la;a++){
                    this.layer.vertex(-this.width/2+a*10/3,-this.height/2-a%2*6)
                }
                for(let a=0,la=this.height*3/10;a<la;a++){
                    this.layer.vertex(this.width/2+a%2*6,-this.height/2+a*10/3)
                }
                for(let a=0,la=this.width*3/10;a<la;a++){
                    this.layer.vertex(this.width/2-a*10/3,this.height/2+a%2*6)
                }
                for(let a=0,la=this.height*3/10;a<la;a++){
                    this.layer.vertex(-this.width/2-a%2*6,this.height/2-a*10/3)
                }
                this.layer.endShape(CLOSE)
                this.layer.image(graphics.walls[16],0,0,this.width,this.height,this.position.x%(graphics.walls[16].width-this.width),this.position.y%(graphics.walls[16].width-this.height),this.width,this.height)
            break
            case 69:
                this.layer.fill(0,this.fade)
                this.layer.rect(0,0,this.width-2,this.height-2)
                this.layer.noFill()
                this.layer.stroke(150,this.fade)
                this.layer.strokeWeight(2)
                for(let a=0,la=this.width/10-1;a<la;a++){
                    this.layer.line(-this.width/2+10+a*10,-this.height/2+1,-this.width/2+10+a*10,this.height/2-1)
                }
                for(let a=0,la=this.height/10-1;a<la;a++){
                    this.layer.line(-this.width/2+1,-this.height/2+10+a*10,this.width/2-1,-this.height/2+10+a*10)
                }
                this.layer.stroke(255,this.fade)
                this.layer.rect(0,0,this.width-2,this.height-2)
                this.layer.line(-this.width/2+1,-this.height/2+1,-this.width/2-4,-this.height/2+1)
                this.layer.arc(-this.width/2-4,-this.height/2+5,8,8,90,270)
                this.layer.arc(-this.width/2-4,-this.height/2+7,4,4,-90,90)
                this.layer.line(this.width/2-1,-this.height/2+1,this.width/2+4,-this.height/2+1)
                this.layer.arc(this.width/2+4,-this.height/2+5,8,8,-90,90)
                this.layer.arc(this.width/2+4,-this.height/2+7,4,4,90,270)
            break
            case 70:
                this.layer.fill(200,150,100)
                this.layer.rect(0,0,this.width,this.height)
                this.layer.fill(150,100,200)
                this.layer.beginShape()
                this.layer.vertex(this.width/2,-this.height/2+3)
                this.layer.vertex(this.width/2,-this.height*0.2+3)
                this.layer.bezierVertex(this.width*(3*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.2+3+sin(this.time*4)*20,this.width*(6*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.2+3-sin(this.time*4)*20,this.width*(9*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.2+3)
                this.layer.vertex(this.width*(9*(1+cos(this.time*8)*0.01)+0.5),-this.height/2+3)
                this.layer.bezierVertex(this.width*(6*(1+cos(this.time*8)*0.01)+0.5),-this.height/2+3-sin(this.time*4)*20,this.width*(3*(1+cos(this.time*8)*0.01)+0.5),-this.height/2+3+sin(this.time*4)*20,this.width/2,-this.height/2+3)
                this.layer.endShape()
                this.layer.fill(50,100,200)
                this.layer.beginShape()
                this.layer.vertex(this.width/2,-this.height*0.4+3)
                this.layer.vertex(this.width/2,-this.height*0.3+3)
                this.layer.bezierVertex(this.width*(3*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.3+3+sin(this.time*4)*20,this.width*(6*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.3+3-sin(this.time*4)*20,this.width*(9*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.3+3)
                this.layer.vertex(this.width*(9*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.4+3)
                this.layer.bezierVertex(this.width*(6*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.4+3-sin(this.time*4)*20,this.width*(3*(1+cos(this.time*8)*0.01)+0.5),-this.height*0.4+3+sin(this.time*4)*20,this.width/2,-this.height*0.4+3)
                this.layer.endShape()
            break
            case 71:
                this.layer.fill(180,80,100,this.fade)
                this.layer.rect(0,0,this.width+8,this.height+1)
                this.layer.stroke(250,this.fade)
                this.layer.strokeWeight(5)
                this.layer.line(-this.width/2-3,-this.height/2+1,this.width/2+3,-this.height/2+1)
            break
            case 72:
                this.layer.fill(160,60,80,this.fade)
                this.layer.rect(0,0,this.width,this.height,5)
                this.layer.fill(80,40,50,this.fade)
                this.layer.rect(0,-this.height*0.05,this.width*0.675,this.height*0.36,3)
                this.layer.triangle(-this.width*0.2,-this.height*0.3,this.width*0.2,-this.height*0.3,0,-this.height*0.4)
                this.layer.fill(50,25,30,this.fade)
                this.layer.rect(0,-this.height*0.05,this.width*0.675,this.height*0.12)
                this.layer.textSize(10)
                this.layer.text('200m',0,this.height*0.3)
            break
            case 73:
                this.layer.fill(160,160,160,this.fade)
                this.layer.rect(0,0,this.width-10,this.height-10)
                for(let a=0,la=this.base.width/20;a<la;a++){
                    for(let b=0,lb=this.base.height/20;b<lb;b++){
                        this.layer.image(graphics.walls[(a+b)%4+17],-this.base.width/2+10+a*20,-this.base.height/2+10+b*20,40,40)
                    }
                }
            break
            case 74:
                this.layer.fill(200,200,200,this.fade)
                for(let a=0,la=this.width/10;a<la;a++){
                    this.layer.rect(-this.width/2+5+a*10,0,9,this.height,2)
                }
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
        vectorSet(this.previous.position,this.position)
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
                        levels[game.level][this.zone].spawnRule[this.index]=1
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
            case 8: case 66: case 74:
                if(this.timer>0){
                    this.timer--
                }
                this.trigger.fade=this.timer<=0||this.timer>90
                this.standard=this.timer<=0||this.timer>90
            break
            case 9: case 24: case 48:
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
            case 20: case 41:
                if(this.timer>0){
                    this.timer--
                }
            break
            case 23:
                this.anim=smoothAnim(this.anim,this.recharge==0,0,1,5)
                if(this.active){
                    this.timer++
                    if(this.hold.dash.active<=0){
                        this.hold.dash.available=true
                    }
                    if(this.timer<15){
                        this.hold.velocity.x=0
                        this.hold.velocity.y=0
                    }else if(this.timer==15){
                        this.hold.velocity.x=0
                        this.hold.velocity.y=0
                        let a={x:0,y:0}
                        if(inputs.keys[this.hold.id][0]){
                            a.y--
                        }
                        if(inputs.keys[this.hold.id][1]){
                            a.y++
                        }
                        if(inputs.keys[this.hold.id][2]){
                            a.x--
                        }
                        if(inputs.keys[this.hold.id][3]){
                            a.x++
                        }
                        if(a.x==0&&a.y==0){
                            this.execute([0])
                        }else{
                            this.direction=deNumericalDirection(a.x,a.y)
                            this.hold.width=this.width
                            this.hold.height=this.height
                            this.hold.base.width=this.width
                            this.hold.base.height=this.height
                        }
                    }else if(this.timer>15){
                        this.shift(sin(this.direction*45)*6,cos(this.direction*45)*-6)
                        this.hold.velocity.x=sin(this.direction*45)*6
                        this.hold.velocity.y=cos(this.direction*45)*-6
                        if(this.hold.bubble.shiftTime==0){
                            this.hold.position.x=this.position.x
                            this.hold.position.y=this.position.y
                        }
                        if(this.timer>=45||this.hold.dash.active>0||this.hold.bonk>0||this.hold.goal.dead){
                            this.execute([0])
                        }
                    }
                }else if(this.recharge>0){
                    this.recharge--
                    if(this.recharge==0){
                        this.shift(this.base.position.x-this.position.x,this.base.position.y-this.position.y)
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
            case 29:
                if(this.break){
                    if(this.fade<=0){
                        this.timer--
                        if(this.timer<=0){
                            this.trigger.fade=true
                            this.break=false
                            this.position.x=this.base.position.x
                            this.position.y=this.base.position.y
                            this.active=false
                            this.anim=0
                        }
                    }
                }else{
                    this.anim=smoothAnim(this.anim,this.active,0,1,15)
                    if(this.anim>0){
                        this.rate+=this.anim
                        this.shift(sin(this.direction*45)*2*this.anim,cos(this.direction*45)*2*-this.anim)
                    }
                    if(this.position.x<0||this.position.x>game.edge.x||this.position.y<0||this.position.y>game.edge.y){
                        this.break=true
                        this.trigger.fade=false
                        this.timer=120
                    }
                }
            break
            case 30:
                if(this.break){
                    if(this.fade<=0){
                        this.timer--
                        if(this.timer<=0){
                            this.trigger.fade=true
                            this.break=false
                            this.position.x=this.base.position.x
                            this.position.y=this.base.position.y
                        }
                    }
                }else{
                    this.shift(this.subVelocity.x,this.subVelocity.y)
                    this.subVelocity.x*=0.94
                    this.subVelocity.y*=0.94
                    if(this.position.x<0||this.position.x>game.edge.x||this.position.y<0||this.position.y>game.edge.y){
                        this.break=true
                        this.trigger.fade=false
                        this.timer=120
                        this.subVelocity.x=0
                        this.subVelocity.y=0
                    }
                }
            break
            case 31:
                if(this.break){
                    if(this.fade<=0){
                        this.timer--
                        if(this.timer<=0){
                            this.trigger.fade=true
                            this.break=false
                            this.position.x=this.base.position.x
                            this.position.y=this.base.position.y
                        }
                    }
                }else{
                    this.anim=smoothAnim(this.anim,this.switch==1,0,1,15)
                    this.shift(this.subVelocity.x,this.subVelocity.y)
                    this.subVelocity.x*=0.94
                    this.subVelocity.y*=0.94
                    if(this.position.x<0||this.position.x>game.edge.x||this.position.y<0||this.position.y>game.edge.y){
                        this.break=true
                        this.trigger.fade=false
                        this.timer=120
                        this.subVelocity.x=0
                        this.subVelocity.y=0
                    }
                }
            break
            case 32: case 49:
                this.anim=smoothAnim(this.anim,!this.active,0,1,5)
                this.trigger.fade=this.active
                if(this.offset>0){
                    this.offset-=12
                }
                switch(this.args[0]){
                    case 0:
                        if(!this.active){
                            this.timer++
                            if(this.timer>120){
                                this.active=true
                                this.anim=0
                                this.timer=0
                            }
                        }
                    break
                    case 1:
                        this.shift(this.args[1],0)
                        if(this.position.x>game.edge.x+50){
                            this.remove=true
                        }
                    break
                    case 2:
                        this.shift(-this.args[1],0)
                        if(this.position.x<-50){
                            this.remove=true
                        }
                    break
                    case 3:
                        this.shift(0,this.args[1])
                        if(this.position.y>game.edge.y+50){
                            this.remove=true
                        }
                    break
                    case 4:
                        this.shift(0,-this.args[1])
                        if(this.position.y<-50){
                            this.remove=true
                        }
                    break
                    case 5:
                        this.shift(sin(this.args[2]+this.time*this.args[3]+this.args[4])*this.args[1],cos(this.args[2]+this.time*this.args[3]+this.args[4])*this.args[1])
                        if(this.time*this.args[3]+this.args[4]>360){
                            this.remove=true
                        }
                    break
                }
            break
            case 33: case 50:
                if(this.args[0]!=5&&(this.time+round(this.args[3]*this.args[2]))%this.args[2]==0){
                    switch(this.args[0]){
                        case 1:
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,-50,this.position.y,0,0,this.type-1,-1,0,this.zone,[1,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        break
                        case 2:
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,game.edge.x+50,this.position.y,0,0,this.type-1,-1,0,this.zone,[2,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        break
                        case 3:
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,this.position.x,-50,0,0,this.type-1,-1,0,this.zone,[3,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        break
                        case 4:
                            entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,this.position.x,game.edge.y+50,0,0,this.type-1,-1,0,this.zone,[4,this.args[1]]))
                            entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                        break
                    }
                }else if(this.args[0]==5&&(this.time+round(this.args[5]*this.args[2]))%this.args[2]==0){
                    entities.walls[types.wall[this.type-1].slice].push(new wall(this.layer,this.position.x,this.position.y,0,0,this.type-1,-1,0,this.zone,[5,this.args[1],this.args[3],this.args[4],0]))
                    entities.walls[types.wall[this.type-1].slice][entities.walls[types.wall[this.type-1].slice].length-1].checkRedundant()
                }
            break
            case 46:
                if(this.timer>0&&this.timer<45){
                    this.timer++
                    if(this.timer>=45){
                        this.trigger.fade=false
                        this.timer=45
                    }
                }else if(this.timer>45){
                    this.trigger.fade=true
                    if(this.fade>=1){
                        this.timer=0
                    }else if(this.fade>=0.8){
                        this.timer=75
                    }
                }else if(this.timer==45){
                    this.trigger.fade=false
                }else{
                    this.trigger.fade=true
                }
                this.anim=2-this.fade
                this.standard=this.fade>0.8
            break
            case 47:
                if(this.timer>0){
                    this.timer--
                }
                this.anim=smoothAnim(this.anim,game.iceSwitch,0,1,5)
            break
            case 51:
                this.anim=smoothAnim(this.anim,game.iceSwitch,0,1,5)
                if(game.iceSwitch==1&&this.args.length>0&&this.move<this.args[0]){
                    this.move+=4
                    let a=numericalDirection(this.args[1])
                    this.shift(a.x*4,a.y*4)
                }else if(game.iceSwitch==0&&this.args.length>0&&this.move>0){
                    this.move-=4
                    let a=numericalDirection(this.args[1])
                    this.shift(a.x*-4,a.y*-4)
                }
            break
            case 67:
                if(this.pause>0){
                    this.pause--
                }else if(this.timer>0){
                    this.timer--
                }
                if(this.direction!=0){
                    if(this.pause==0){
                        switch(this.direction){
                            case 1:
                                this.shift(0,this.speed)
                            break
                            case 2:
                                this.shift(0,-this.speed)
                            break
                            case 3:
                                this.shift(this.speed,0)
                            break
                            case 4:
                                this.shift(-this.speed,0)
                            break
                        }
                        this.history[this.history.length-1][1]+=this.speed/2
                        if(this.speed<6){
                            this.speed+=0.2
                        }
                        for(let a=0,la=entities.walls.length;a<la;a++){
                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                if(inBoxBox(this,entities.walls[a][b])&&entities.walls[a][b].standard&&entities.walls[a][b].type!=this.type){
                                    switch(this.direction){
                                        case 1:
                                            this.shift(0,entities.walls[a][b].position.y-entities.walls[a][b].height/2-this.height/2-this.position.y)
                                        break
                                        case 2:
                                            this.shift(0,entities.walls[a][b].position.y+entities.walls[a][b].height/2+this.height/2-this.position.y)
                                        break
                                        case 3:
                                            this.shift(entities.walls[a][b].position.x-entities.walls[a][b].width/2-this.width/2-this.position.x,0)
                                        break
                                        case 4:
                                            this.shift(entities.walls[a][b].position.x+entities.walls[a][b].width/2+this.width/2-this.position.x,0)
                                        break
                                    }
                                    this.direction=0
                                }
                            }
                        }
                        switch(this.direction){
                            case 1:
                                if(this.position.y>game.edge.y-this.height/2){
                                    this.direction=0
                                    this.shift(0,game.edge.y-this.height/2-this.position.y)
                                }
                            break
                            case 2:
                                if(this.position.y<this.height/2){
                                    this.direction=0
                                    this.shift(0,this.height/2-this.position.y)
                                }
                            break
                            case 3:
                                if(this.position.x>game.edge.x-this.width/2){
                                    this.direction=0
                                    this.shift(game.edge.x-this.width/2-this.position.x,0)
                                }
                            break
                            case 4:
                                if(this.position.x<this.width/2){
                                    this.direction=0
                                    this.shift(this.width/2-this.position.x,0)
                                }
                            break
                        }
                    }
                    this.timer=120
                }
                if(this.timer==0&&this.direction==0&&this.history.length>0){
                    this.history[this.history.length-1][1]--
                    switch(this.history[this.history.length-1][0]){
                        case 0:
                            this.shift(0,-2)
                        break
                        case 1:
                            this.shift(0,2)
                        break
                        case 2:
                            this.shift(-2,0)
                        break
                        case 3:
                            this.shift(2,0)
                        break
                    }
                    if(this.history[this.history.length-1][1]<=0){
                        this.history.splice(this.history.length-1,1)
                    }
                }
            break
        }
        if(this.fade>0.2&&!this.deprecate&&
            this.type!=17&&this.type!=27&&this.type!=33&&this.type!=36&&this.type!=44&&this.type!=50&&this.type!=58&&this.type!=70&&this.type!=71&&this.type!=72
        ){
            for(let a=0,la=this.collide.box.length;a<la;a++){
                for(let b=0,lb=this.collide.box[a].length;b<lb;b++){
                    let c=this.collide.box[a][b]
                    if(!c.orb.active&&!c.goal.dead&&
                        !((this.type==15||this.type==18||this.type==19)&&(c.velocity.y<=0||c.previous.position.y>this.position.y-this.height/2-c.height/2+6))
                    ){
                        if(inBoxBox({position:this.previous.position,width:this.width+2,height:this.height+2},c)&&this.standard){
                            let d=collideBoxBox(this,c)
                            c.contact[d]=true
                            if(d==1){
                                c.stamina=c.base.stamina
                            }
                            if(d==1){
                                if(this.type==67&&this.direction==0){
                                    c.temp.velocity.x*=0.5
                                    c.temp.velocity.y*=0.5
                                }
                                if(abs(c.temp.velocity.x)<abs(this.velocity.x)){
                                    c.temp.velocity.x=this.velocity.x
                                }
                                if(abs(c.temp.velocity.y)<abs(this.velocity.y)){
                                    c.temp.velocity.y=this.velocity.y
                                }
                            }else if(c.climb>0){
                                c.position.x+=this.velocity.x
                                c.position.y+=this.velocity.y
                            }
                        }
                        if(inBoxBox(this,c)){
                            let d=collideBoxBox(this,c)
                            if(this.standard&&d>=0&&d<=3){
                                c.crush[d]=true
                            }
                            switch(this.type){
                                case 8: case 66: case 74:
                                    if(this.timer==1){
                                        c.goal.dead=true
                                    }
                                    if(this.timer==0){
                                        this.timer=150
                                    }
                                break
                                case 29:
                                    if(this.timer==0){
                                        this.timer=150
                                    }
                                    switch(d){
                                        case 0:
                                            if(!this.active){
                                                this.active=true
                                                this.direction=0
                                            }
                                        break
                                        case 1:
                                            if(!this.active){
                                                this.active=true
                                                this.direction=4
                                            }
                                        break
                                        case 2:
                                            if(!this.active){
                                                this.active=true
                                                this.direction=6
                                            }
                                        break
                                        case 3:
                                            if(!this.active){
                                                this.active=true
                                                this.direction=2
                                            }
                                        break
                                    }
                                break
                                case 30: case 31:
                                    if(this.timer==1||this.type==31&&this.switch==1){
                                        c.goal.dead=true
                                    }
                                    if(this.args[d]==1){
                                        switch(d){
                                            case 0:
                                                this.subVelocity.y=-16
                                                c.velocity.y=10
                                                c.dash.available=true
                                                c.stamina=c.base.stamina
                                                c.dashCut()
                                            break
                                            case 1:
                                                this.subVelocity.y=16
                                                c.velocity.y=-10
                                                c.dash.available=true
                                                c.stamina=c.base.stamina
                                                c.dashCut()
                                            break
                                            case 2:
                                                this.subVelocity.x=-16
                                                c.velocity.x=10
                                                c.dash.available=true
                                                c.stamina=c.base.stamina
                                                c.dashCut()
                                            break
                                            case 3:
                                                this.subVelocity.x=16
                                                c.velocity.x=-10
                                                c.dash.available=true
                                                c.stamina=c.base.stamina
                                                c.dashCut()
                                            break
                                        }
                                    }
                                break
                                case 46:
                                    if(this.timer==75){
                                        c.goal.dead=true
                                    }else if(this.timer==0){
                                        this.timer=1
                                    }
                                break
                            }
                            switch(this.type){
                                case 2: case 37: case 52: case 61:
                                    if(c.velocity.y>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.velocity.y>=6){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 3: case 38: case 53: case 62:
                                    if(c.velocity.y<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.velocity.y<=-6){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 4: case 39: case 54: case 63:
                                    if(c.velocity.x>=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.velocity.x>=6){
                                            c.goal.dead=true
                                        }
                                    }
                                break
                                case 5: case 40: case 55: case 64:
                                    if(c.velocity.x<=0){
                                        this.kill++
                                        c.safe=0
                                        if(this.kill>=2||c.velocity.x<=-6){
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
                                        this.timer=180
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
                                        c.dashCut()
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
                                        c.dashCut()
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
                                        c.dashCut()
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
                                        c.dashCut()
                                    }
                                break
                                case 16: case 45: case 65: case 73:
                                    c.goal.dead=true
                                break
                                case 20: case 41:
                                    if(this.timer==0){
                                        this.timer=5
                                        c.dash.available=true
                                        c.dashPhase=true
                                        c.dashCut()
                                        c.stamina=c.base.stamina
                                        entities.particles.push(new particle(this.layer,this.position.x,this.position.y,2,0,2,[this.type==20?[125,200,255]:this.type==41?[255,180,125]:[0,0,0,]]))
                                        let direction=atan2(c.position.x-this.position.x,c.position.y-this.position.y)
                                        c.velocity.x=sin(direction)*15
                                        c.velocity.y=cos(direction)*15
                                    }
                                break
                                case 23:
                                    if(!this.active&&this.recharge==0&&!(c.bubble.active&&!inBoxBox({position:this.position,width:3,height:3},{position:c.position,width:3,height:3}))){
                                        if(c.bubble.active){
                                            for(let e=0,le=entities.walls.length;e<le;e++){
                                                for(let f=0,lf=entities.walls[e].length;f<lf;f++){
                                                    if(entities.walls[e][f].type==23){
                                                        entities.walls[e][f].execute([1,c])
                                                    }
                                                }
                                            }
                                        }
                                        this.timer=0
                                        this.hold=c
                                        this.active=true
                                        c.bubble.active=true
                                        c.bubble.shiftTime=5
                                        c.bubble.shift.x=this.position.x-c.position.x
                                        c.bubble.shift.y=this.position.y-c.position.y
                                        c.velocity.x=0
                                        c.velocity.y=0
                                        c.dash.active=0
                                        c.dashPhase=false
                                    }
                                break
                                case 24:
                                    if(this.timer==0&&!c.dash.second.available){
                                        c.dash.available=true
                                        c.dash.second.available=true
                                        c.stamina=c.base.stamina
                                        this.timer=180
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
                                case 32:
                                    if(this.active){
                                        if(c.position.y>this.position.y-15||this.timer==120){
                                            c.goal.dead=true
                                        }else{
                                            this.active=false
                                            c.velocity.y=-8
                                            c.jumpTime=c.base.jumpTime
                                            c.dash.available=true
                                            c.stamina=c.base.stamina
                                            c.dashCut()
                                        }
                                    }
                                break
                                case 47:
                                    if(this.timer==0){
                                        for(let a=0,la=entities.walls.length;a<la;a++){
                                            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                                                entities.walls[a][b].onSwitch()
                                            }
                                        }
                                        game.iceSwitch=1-game.iceSwitch
                                    }
                                break
                                case 48:
                                    if(this.timer==0){
                                        if(c.dash.golden.timer<=0){
                                            c.dash.golden.direction=c.velocity.x>0?{x:1,y:0}:(c.velocity.x<0?{x:-1,y:0}:{x:0,y:-1})
                                            c.stamina=c.base.stamina
                                            c.velocity.x=0
                                            c.velocity.y=0
                                        }
                                        c.dash.golden.timer=120
                                        this.timer=180
                                    }
                                break
                                case 49:
                                    if(this.active){
                                        if(c.position.y<this.position.y-15||c.velocity.y>0||this.timer==120){
                                            c.goal.dead=true
                                        }else{
                                            this.active=false
                                            c.velocity.y=8
                                            c.dash.available=true
                                            c.stamina=c.base.stamina
                                            c.dashCut()
                                        }
                                    }
                                break
                                case 68:
                                    if(c.dash.active>0){
                                        c.dash.active=9
                                        c.dreamTime=2
                                        c.dash.available=true
                                        c.jumpTime=c.base.jumpTime*2
                                    }else{
                                        c.goal.dead=true
                                    }
                                break
                                default:
                                    if(c.dash.golden.timer>0){
                                        c.dash.golden.timer=0
                                    }
                                    if(d>=0&&!this.redundant[d]){
                                        c.bonk=2
                                        switch(d){
                                            case 0:
                                                if(c.velocity.y+c.temp.velocity.y-this.velocity.y<0){
                                                    c.position.y=this.position.y+this.height/2+c.height/2
                                                    c.velocity.y=0
                                                    c.velocity.x*=physics.friction.x
                                                }
                                            break
                                            case 1:
                                                if(c.velocity.y+c.temp.velocity.y-this.velocity.y>0){
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
                                                if(c.velocity.x+c.temp.velocity.x-this.velocity.x<0){
                                                    c.position.x=this.position.x+this.width/2+c.width/2
                                                    c.velocity.x=0
                                                    c.velocity.y*=physics.friction.y
                                                }
                                            break
                                            case 3:
                                                if(c.velocity.x+c.temp.velocity.x-this.velocity.x>0){
                                                    c.position.x=this.position.x-this.width/2-c.width/2
                                                    c.velocity.x=0
                                                    c.velocity.y*=physics.friction.y
                                                }
                                            break
                                        }
                                    }
                                    switch(this.type){
                                        case 67:
                                            if(c.dash.active>0){
                                                c.dash.active=0
                                                c.dash.available=true
                                                this.direction=d+1
                                                this.pause=30
                                                this.history.push([d,0])
                                                this.speed=0
                                                switch(d){
                                                    case 0:
                                                        c.velocity.y=4
                                                    break
                                                    case 1:
                                                        c.velocity.y=-10
                                                    break
                                                    case 2:
                                                        c.velocity.x=2
                                                        c.velocity.y=-10
                                                    break
                                                    case 3:
                                                        c.velocity.x=-2
                                                        c.velocity.y=-10
                                                    break
                                                }
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