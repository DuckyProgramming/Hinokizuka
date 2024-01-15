class particle extends entity{
    constructor(layer,x,y,type,direction,size,args){
        super(layer,x,y)
        this.type=type
        this.direction=direction
        this.size=size
        this.args=args
        switch(this.type){
            case 0: case 1:
                this.scale=1
                this.fade=1
                this.color=args[0]
            break
            case 2:
                this.scale=1
                this.fade=1.5
                this.color=args[0]
            break
        }

    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        this.layer.scale(this.size*this.scale)
        this.layer.noStroke()
        switch(this.type){
            case 0: case 1: case 2:
                this.layer.fill(this.color[0],this.color[1],this.color[2],this.fade)
                this.layer.ellipse(0,0,10,10)
            break
        }
        this.layer.pop()
    }
    update(){
        switch(this.type){
            case 0:
                this.position.x+=cos(this.direction)*this.size*3
                this.position.y+=sin(this.direction)*this.size*3
                this.direction+=4
                this.scale-=1/15
                if(this.scale<=0){
                    this.remove=true
                }
            break
            case 1:
                this.scale-=1/15
                if(this.scale<=0){
                    this.remove=true
                }
            break
            case 2:
                this.scale+=1/5
                this.fade-=1/15
                if(this.fade<=0){
                    this.remove=true
                }
            break
        }
    }
}