function setupGraphics(){
    setupBase()
    graphics.main=createGraphics(1200,600)
    setupLayer(graphics.main)
    for(let a=0,la=2;a<la;a++){
        graphics.backgrounds.push(createGraphics(1800,900))
        setupLayer(graphics.backgrounds[a])
        displayBack(graphics.backgrounds[a],a)
    }
    for(let a=0,la=4;a<la;a++){
        graphics.walls.push(createGraphics(40,40))
        setupLayer(graphics.walls[a])
        displayWallGraphic(graphics.walls[a],a)
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
        case 1:
            layer.background(75,150,200)
            for(let a=0,la=50;a<la;a++){
                let b=-50+a*78%(layer.width+100)+random(-10,10)
                let c=random(15,20)
                let d=layer.height*(0.76+a/la*0.24)
                let e=random(160,240)
                layer.fill(40+a/la*20+random(-20,20))
                layer.triangle(b-c,d,b+c,d,b,d-e)
                if(b-c<0||b+c>layer.width){
                    b=layer.width-b
                    e=random(160,240)
                    layer.triangle(b-c,d,b+c,d,b,d-e)
                }
            }
            for(let a=0,la=200;a<la;a++){
                let b=-50+a*71%(layer.width+100)+random(-10,10)
                let c=random(60,80)
                let d=random(0,0.5)
                let e=layer.height*(0.8+a/la*0.24)
                let f=random(80,120)
                layer.fill(60+a/la*20+random(-20,20))
                layer.quad(b-c,e,b+c,e,b+c*d,e-f,b-c*d,e-f)
                if(b-c<0||b+c>layer.width){
                    b=layer.width-b
                    d=random(0,0.5)
                    layer.quad(b-c,e,b+c,e,b+c*d,e-f,b-c*d,e-f)
                }
            }
        break
    }
}
function displayWallGraphic(layer,type){
    layer.noStroke()
    layer.translate(layer.width/2,layer.height/2)
    switch(type){
        case 0: case 1: case 2: case 3:
            layer.noStroke()
            layer.rotate(45*type)
            for(a=0,la=6;a<la;a++){
                layer.fill(210,225,230)
                layer.rotate(180/la)
                layer.triangle(0,0,8,8,5,20)
                layer.fill(100,140,200)
                layer.rotate(180/la)
                layer.triangle(0,0,8,8,5,20)
            }
        break
    }
}