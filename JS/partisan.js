class partisan extends physical{
    constructor(layer,x,y,width,height){
        super(layer,x,y,width,height)
        this.velocity={x:0,y:0}
        this.previous={position:{x:0,y:0}}
    }
    resetPhysics(){
        this.velocity.x=0
        this.velocity.y=0
    }
    display(){
        super.display()
    }
    update(){
        vectorSet(this.previous.position,this.position)
        vectorAdd(this.position,this.velocity)
    }
}