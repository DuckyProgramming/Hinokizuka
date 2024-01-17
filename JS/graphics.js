function setupGraphics(){
    setupBase()
    graphics.main=createGraphics(1200,600)
    setupLayer(graphics.main)
    graphics.players.push(new player(this.layer,0,0,0,0,true))
    graphics.players.push(new player(this.layer,0,0,1,0,true))
    for(let a=0,la=2;a<la;a++){
        graphics.backgrounds.push(createGraphics(1800,900))
        setupLayer(graphics.backgrounds[a])
        displayBack(graphics.backgrounds[a],a)
    }
    for(let a=0,la=2;a<la;a++){
        graphics.scenes.push(createGraphics(1800,600))
        setupLayer(graphics.scenes[a])
        displayScene(graphics.scenes[a],a)
    }
    for(let a=0,la=4;a<la;a++){
        graphics.walls.push(createGraphics(40,40))
        setupLayer(graphics.walls[a])
        displayWallGraphic(graphics.walls[a],a)
    }
}
function poseCharacter(character,type){
    switch(type){
        case 0:
            character.position.x=330
            character.position.y=420
            character.size=3
            character.direction.main=24
            character.skin.arms[0].top.theta=27
            character.skin.arms[1].top.theta=24
            character.skin.arms[0].bottom.theta=66
            character.skin.arms[1].bottom.theta=54
            character.skin.arms[0].top.phi=-114
            character.skin.arms[0].bottom.phi=-96
            character.skin.legs[0].top.theta=36
            character.skin.legs[1].top.theta=36
            character.skin.legs[0].top.phi=-42
            character.skin.legs[1].top.phi=9
            character.skin.legs[0].bottom.phi=-36
            character.skin.legs[1].bottom.phi=3
        break
        case 1:
            character.position.x=450
            character.position.y=430
            character.size=3
            character.direction.main=30
            character.skin.arms[0].top.theta=18
            character.skin.arms[1].top.theta=18
            character.skin.arms[0].bottom.theta=24
            character.skin.arms[1].bottom.theta=24
            character.skin.arms[0].top.phi=-96
            character.skin.arms[1].top.phi=60
            character.skin.arms[0].bottom.phi=3
            character.skin.arms[1].bottom.phi=-15
            character.skin.legs[0].top.theta=36
            character.skin.legs[1].top.theta=36
            character.skin.legs[0].top.phi=-36
            character.skin.legs[1].top.phi=0
            character.skin.legs[0].bottom.phi=-24
            character.skin.legs[1].bottom.phi=-6
        break
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
                    layer.quad(b-c,e,b+c,e,b+c*d,e-f,b-c*d,e-f)
                }
            }
        break
    }
}
function displayScene(layer,type){
    switch(type){
        case 0:
            layer.background(100,160,200)
            for(let a=0,la=3;a<la;a++){
                layer.fill(110-a*10)
                layer.beginShape()
                for(let b=0,lb=1+a*8;b<lb;b++){
                    layer.vertex(layer.width*(2/3+0.012-lb*0.012+b*0.024),layer.height*(0.1+a*0.3+b%2*0.05))
                }
                for(let b=0,lb=9+a*8;b<lb;b++){
                    layer.vertex(layer.width*(2/3-0.012+lb*0.012-b*0.024),layer.height*(0.4+a*0.3+b%2*0.05))
                }
                layer.endShape()
            }
            layer.fill(245)
            layer.beginShape()
            layer.vertex(layer.width*2/3,layer.height*0.1-3)
            for(let b=0,lb=13;b<lb;b++){
                layer.vertex(layer.width*(2/3+0.006-lb*0.006+b*0.012),layer.height*(0.325+b%2*0.02)-3)
            }
            layer.endShape()
            for(let a=0,la=27;a<la;a++){
                let b=layer.width*(a+random(0.1,0.9))/la
                let c=random(1,1.2)
                let d=random(layer.height*0.8,layer.height*0.875)
                layer.fill(140,80,20)
                layer.rect(b,d*0.5+layer.height*0.5,c*10,layer.height-d)
                layer.fill(20,80,20)
                for(let e=0,le=floor(random(3,6));e<le;e++){
                    layer.triangle(b-c*40*(1-e/le*0.8),d-e*c*30*(1-e/le*0.3),b+c*40*(1-e/le*0.8),d-e*c*30*(1-e/le*0.3),b,d-e*c*30*(1-e/le*0.3)-c*50*(1-e/le*0.8))
                }
            }
            layer.fill(30,120,30)
            layer.ellipse(0,layer.height*0.959,105)
            layer.ellipse(layer.width,layer.height*0.959,105)
            for(let a=0,la=45;a<la;a++){
                layer.ellipse(layer.width*(a+random(0.9,1.1))/(la+1),layer.height*random(0.96,0.98),random(75,100))
            }
            layer.fill(110)
            layer.quad(0,layer.height*0.75,0,layer.height,580,layer.height*0.75+55,585,layer.height*0.75+35)
            for(let a=0,la=21;a<la;a++){
                for(let b=0,lb=6-floor(a/4);b<lb;b++){
                    layer.fill(random(120,160))
                    layer.push()
                    layer.translate(a*30-a*a*0.1+random(-10,10),layer.height*0.75+a*2+b*25)
                    layer.rotate(random(0,90))
                    layer.rect(0,0,a==la-1?25:random(30,60-a/la*20))
                    layer.pop()
                }
            }
            for(let a=0,la=graphics.players.length;a<la;a++){
                poseCharacter(graphics.players[a],a)
                graphics.players[a].layer=layer
                graphics.players[a].display()
            }
        break
        case 1:
            layer.noFill()
            for(let a=0,la=2;a<la;a++){ 
                layer.strokeWeight(4-a*2)
                layer.stroke(255-205*a/la,255-105*a/la,255)
                layer.textSize(100)
                layer.text('Hinokizuka',840,250)
            }
            layer.noStroke()
            layer.fill(0)
            layer.erase(0.2,0)
            for(let a=0,la=10;a<la;a++){
                layer.rect(1175-a*25,300,50+a*50,250)
            }
            layer.noErase()
            layer.fill(0,20,80)
            layer.textSize(20)
            layer.text('DuckyProgramming Production',840,300)
            layer.textSize(25)
            layer.text('Any Key to Begin',840,330)
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