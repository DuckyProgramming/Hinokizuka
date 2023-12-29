class particle extends entity{
    constructor(layer,x,y,type,direction,size,args){
        super(layer,x,y,type)
        this.args=args
        this.direction=direction
        this.size=size
        switch(this.type){
            case 0:
            break
        }

    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.rotate(this.direction)
        this.layer.scale(this.size*this.scale)
        switch(this.type){
            case 0:
            break
        }
        this.layer.pop()
    }
    update(){
        switch(this.type){
            case 0:
            break
        }
    }
}