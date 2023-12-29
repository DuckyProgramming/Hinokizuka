class physical extends entity{
    constructor(layer,x,y,width,height){
        super(layer,x,y)
        this.width=width
        this.height=height
    }
    display(){
        this.layer.noFill()
        this.layer.stroke(255,100,0)
        this.layer.strokeWeight(2)
        this.layer.rect(this.position.x,this.position.y,this.width,this.height)
    }
}