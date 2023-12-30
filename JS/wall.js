class wall extends physical{
    constructor(layer,x,y,width,height,type){
        super(layer,x,y,width,height)
        this.type=type
        this.fade=1
        this.trigger={fade:true}
        this.collide={box:[entities.players]}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.noStroke()
        switch(this.type){
            case 1:
                this.layer.fill(220,160,180,this.fade)
                this.layer.rect(0,0,this.width,this.height)
            break
        }
        this.layer.pop()
        if(dev.hitbox){
            super.display()
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
                let d=collideBoxBox(this,c)
                if(inBoxBox({position:this.position,width:this.width+2,height:this.height+2},c)){
                    c.contact[d]=true
                    if(d==1){
                        c.stamina=c.base.stamina
                    }
                }
                if(inBoxBox(this,c)){
                    c.crush[d]=true
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
                                if(c.dash.active==0){
                                    c.velocity.x*=physics.friction.x
                                }
                                if(c.dash.timer==0){
                                    c.dash.available=true
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
                }
            }
        }
    }
}