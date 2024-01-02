function setupGraphics(){
    setupBase()
    graphics.main=createGraphics(1200,600)
    setupLayer(graphics.main)
    for(let a=0,la=1;a<la;a++){
        graphics.backgrounds.push(createGraphics(1800,900))
        setupLayer(graphics.backgrounds[a])
        displayBack(graphics.backgrounds[a],a)
    }
}
function displayBack(layer,type){
    layer.noStroke()
    switch(type){
        case 0:
            layer.background(100,175,225)
            for(let a=0,la=10;a<la;a++){
                let b=layer.width*(a+random(a==0?0.5:0.3,a==la-1?0.5:0.7))/la
                let c=random(1,1.2)
                let d=random(layer.height*0.6,layer.height*0.75)
                layer.fill(160,100,20)
                layer.rect(b,d*0.5+layer.height*0.5,c*20,layer.height-d)
                layer.fill(20,120,20)
                for(let e=0,le=floor(random(3,6));e<le;e++){
                    layer.triangle(b-c*80*(1-e/le*0.8),d-e*c*60*(1-e/le*0.3),b+c*80*(1-e/le*0.8),d-e*c*60*(1-e/le*0.3),b,d-e*c*60*(1-e/le*0.3)-c*100*(1-e/le*0.8))
                }
            }
            layer.fill(40,160,40)
            layer.ellipse(0,layer.height*0.918,210)
            layer.ellipse(layer.width,layer.height*0.918,210)
            for(let a=0,la=23;a<la;a++){
                layer.ellipse(layer.width*(a+random(0.9,1.1))/(la+1),layer.height*random(0.92,0.96),random(150,200))
            }
        break
    }
}