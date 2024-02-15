function setupGraphics(){
    setupBase()
    graphics.main=createGraphics(1200,600)
    setupLayer(graphics.main)
    graphics.players.push(new player(this.layer,0,0,0,0,true))
    graphics.players.push(new player(this.layer,0,0,1,0,true))
    for(let a=0,la=21;a<la;a++){
        graphics.walls.push(a==16?createGraphics(400,400):createGraphics(40,40))
        setupLayer(graphics.walls[a])
        displayWallGraphic(graphics.walls[a],a)
    }
    for(let a=0,la=10;a<la;a++){
        graphics.backgrounds.push(createGraphics(1800,900))
        setupLayer(graphics.backgrounds[a])
        displayBack(graphics.backgrounds[a],a)
    }
    for(let a=0,la=2;a<la;a++){
        graphics.scenes.push(createGraphics(1800,600))
        setupLayer(graphics.scenes[a])
        displayScene(graphics.scenes[a],a)
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
                let e=random(120,180)
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
        case 2:
            layer.background(75,150,150)
            for(let a=0,la=50;a<la;a++){
                let b=-50+a*78%(layer.width+100)+random(-10,10)
                let c=random(20,25)
                let d=layer.height*(0.76+a/la*0.24)
                let e=random(100,150)
                layer.fill(40+a/la*20+random(-20,20))
                layer.triangle(b-c,d,b+c,d,b,d-e)
                if(b-c<0||b+c>layer.width){
                    b=layer.width-b
                    e=random(100,150)
                    layer.triangle(b-c,d,b+c,d,b,d-e)
                }
            }
            for(let a=0,la=200;a<la;a++){
                let b=-50+a*71%(layer.width+100)+random(-10,10)
                let c=random(45,60)
                let d=random(0.2,0.6)
                let e=layer.height*(0.8+a/la*0.24)
                let f=random(80,120)
                layer.noStroke()
                layer.fill(60+a/la*20+random(-20,20))
                layer.quad(b-c,e,b+c,e,b+c*d,e-f,b-c*d,e-f)
                layer.stroke(250)
                layer.strokeWeight(random(6,8))
                layer.line(b+c*d-1,e-f+3,b-c*d+1,e-f+3)
                if(b-c<0||b+c>layer.width){
                    b=layer.width-b
                    layer.noStroke()
                    layer.fill(60+a/la*20+random(-20,20))
                    layer.quad(b-c,e,b+c,e,b+c*d,e-f,b-c*d,e-f)
                    layer.stroke(250)
                    layer.strokeWeight(random(6,8))
                    layer.line(b+c*d-1,e-f+3,b-c*d+1,e-f+3)
                }
            }
        break
        case 3:
            layer.fill(250)
            for(let a=0,la=20;a<la;a++){
                for(let b=0,lb=10;b<lb;b++){
                    layer.ellipse((a+random(0.1,0.9))/la*layer.width,(b+random(0.1,0.9))/lb*layer.height,random(2,3))
                }
            }
        break
        case 4:
            layer.background(0)
            for(let a=0,la=layer.height;a<la;a++){
                layer.fill(mergeColor([250,160,100],[250,200,160],a/la))
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
            for(let a=0,la=80;a<la;a++){
                for(let b=0,lb=floor(sin((-50+a*71%(layer.width+100))/layer.width*360*6)*50+sin((-50+a*71%(layer.width+100))/layer.width*360*10)*50+200)/20+1;b<lb;b++){
                    let c=-50+a*71%(layer.width+100)-20+(a+b)*9%40
                    let d=layer.height-sin(c/layer.width*360*6)*50-200+b*20-sin(c/layer.width*360*10)*50
                    let e=random(50,80)
                    let f=random(0,1)
                    layer.fill(150+f*15,60+f*15,30+f*15)
                    regPoly(layer,c,d,8,e/2,e/2,0)
                    if(c<0||c>layer.width){
                        c=layer.width-c
                        regPoly(layer,c,d,8,e/2,e/2,0)
                    }
                }
            }
            for(let a=0,la=8;a<la;a++){
                let c=layer.width*(0.0625+a*0.125)
                let d=layer.height*random(0.2,0.4)
                layer.fill(240,0.2)
                for(let b=0,lb=100;b<lb;b++){
                    let e=random(0,360)
                    let f=random(0,1500)**0.6
                    let g=random(20,40)
                    layer.ellipse(c+sin(e)*f,d+cos(e)*f*0.5,g,g*0.5)
                }
            }
        break
        case 5:
            layer.stroke(240,230-random(0,20),200-random(0,40))
            for(let a=0,la=20;a<la;a++){
                for(let b=0,lb=10;b<lb;b++){
                    layer.strokeWeight(random(1,4))
                    let c=(a+random(0.1,0.9))/la*layer.width
                    let d=(b+random(0.1,0.9))/lb*layer.height
                    layer.line(c-random(3,6),d,c+random(3,6),d)
                }
            }
        break
        case 6:
            layer.background(0)
            for(let a=0,la=layer.height;a<la;a++){
                layer.fill(mergeColor([30,100,80],[60,200,160],a/la))
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
            for(let a=0,la=4;a<la;a++){
                layer.fill(mergeColor([120,200,200],[200,250,250],a/la*0.5+a%2*0.5))
                layer.beginShape()
                layer.vertex(0,layer.height)
                let c=random(0.6,0.7)
                let d=0
                let e=[]
                for(let b=0,lb=21-a*2;b<lb;b++){
                    d=((b==0||b==lb-1?c:random(0.6,0.7))+a/la*0.2)
                    layer.vertex(layer.width*b/(lb-1),layer.height*d)
                    e.push(d)
                }
                layer.vertex(layer.width,layer.height)
                layer.endShape()
                for(let b=0,lb=e.length-1;b<lb;b++){
                    if(floor(random(0,2))==0){
                        let c=random(0,1)
                        let d=random(32,50)
                        layer.image(graphics.walls[floor(random(8,12))],layer.width*constrain(map(c,0,1,b/lb,(b+1)/lb),0.01,0.99),layer.height*map(c,0,1,e[b],e[b+1]),d,d)
                    }
                }
            }
            for(let a=0,la=3;a<la;a++){
                layer.fill(100,255-a*100,100+a*155,0.05)
                for(let b=-3,lb=200;b<lb+3;b++){
                    layer.ellipse(b/lb*layer.width+random(-5,5),sin(b/lb*720+a*100)*60+layer.height*0.3+random(-5,5),random(30,60))
                }
            }
        break
        case 7:
            layer.background(0)
            for(let a=0,la=layer.height;a<la;a++){
                layer.fill(mergeColor([255,225,225],[255,125,150],a/la))
                layer.rect(layer.width/2,a+0.5,layer.width,2)
            }
            for(let a=0,la=layer.width/100;a<la;a++){
                let b=random(40,60)+a*100
                let c=random(6,8)
                let d=layer.height*(1.01+a/la*0.06)
                let e=random(360,480)
                let f=a/la*20+random(-20,20)
                let g=random(4,10)
                layer.fill(200+f,80+f,160+f)
                layer.triangle(b-c,d,b+c,d,b,d-e)
                layer.fill(180+f,60+f,140+f)
                layer.quad(b,d-e-g+5,b-g*0.5,d-e+5,b,d-e+g+5,b+g*0.5,d-e+5)
                if(b-g*0.5<0||b+g*0.5>layer.width){
                    b=layer.width-b
                    layer.fill(200+f,80+f,160+f)
                    layer.triangle(b-c,d,b+c,d,b,d-e)
                    layer.fill(180+f,60+f,140+f)
                    layer.quad(b,d-e-g+5,b-g*0.5,d-e+5,b,d-e+g+5,b+g*0.5,d-e+5)
                }
            }
            for(let a=0,la=50;a<la;a++){
                let b=a*73%layer.width+random(-10,10)
                let c=random(15,20)
                let d=layer.height*(1.01+a/la*0.06)
                let e=random(180,360)
                let f=a/la*20+random(-20,20)
                let g=random(8,20)
                layer.fill(200+f,80+f,160+f)
                layer.triangle(b-c,d,b+c,d,b,d-e)
                layer.fill(180+f,60+f,140+f)
                layer.quad(b,d-e-g+5,b-g*0.5,d-e+5,b,d-e+g+5,b+g*0.5,d-e+5)
                if(b-g*0.5<0||b+g*0.5>layer.width){
                    b=layer.width-b
                    layer.fill(200+f,80+f,160+f)
                    layer.triangle(b-c,d,b+c,d,b,d-e)
                    layer.fill(180+f,60+f,140+f)
                    layer.quad(b,d-e-g+5,b-g*0.5,d-e+5,b,d-e+g+5,b+g*0.5,d-e+5)
                }
            }
            layer.fill(210,90,170)
            layer.triangle(-5,layer.height,5,layer.height,0,layer.height-250)
            layer.triangle(-5+layer.width,layer.height,5+layer.width,layer.height,layer.width,layer.height-250)
            layer.quad(0,layer.height-250,5,layer.height-240,0,layer.height-230,-5,layer.height-240)
            layer.quad(layer.width,layer.height-250,layer.width+5,layer.height-240,layer.width,layer.height-230,layer.width-5,layer.height-240)
            for(let a=0,la=50;a<la;a++){
                let b=-50+a*78%(layer.width+100)+random(-10,10)
                let c=random(5,8)
                let d=layer.height*(1.01+a/la*0.04)
                let e=random(120,240)
                let f=a/la*20+random(-20,20)
                layer.fill(160+f,40+f,120+f)
                layer.quad(b-c,d-e*0.95,b,d,b+c,d-e*0.95,b,d-e)
                if(b-c<0||b+c>layer.width){
                    b=layer.width-b
                    layer.quad(b-c,d-e*0.95,b,d,b+c,d-e*0.95,b,d-e)
                }
            }
            for(let a=0,la=29;a<la;a++){
                let b=random(0,60)
                layer.fill(180-b,100-b,140-b)
                layer.ellipse(layer.width*((a*9)%29+random(0.9,1.1))/(la+1),layer.height*random(0.92,0.96),random(125,175))
            }
            let a=random(0,60)
            layer.fill(180-a,100-a,140-a)
            layer.ellipse(0,layer.height*0.918,180)
            layer.ellipse(layer.width,layer.height*0.918,180)
            for(let a=0,la=21;a<la;a++){
                let b=random(0,60)
                layer.fill(140-b,60-b,100-b)
                layer.ellipse(layer.width*((a*8)%21+random(0.9,1.1))/(la+1),layer.height*random(0.99,1.03),random(175,225))
            }
            a=random(0,60)
            layer.fill(140-a,60-a,100-a)
            layer.ellipse(0,layer.height*0.988,230)
            layer.ellipse(layer.width,layer.height*0.988,230)
        break
        case 8:
            layer.stroke(240,160-random(0,40),180-random(0,20))
            for(let a=0,la=20;a<la;a++){
                for(let b=0,lb=10;b<lb;b++){
                    layer.strokeWeight(random(1,4))
                    let c=(a+random(0.1,0.9))/la*layer.width
                    let d=(b+random(0.1,0.9))/lb*layer.height
                    layer.line(c,d-random(3,6),c,d+random(3,6))
                }
            }
        break
        case 9:
            layer.background(0)
            for(let a=0,la=layer.height;a<la;a++){
                layer.fill(mergeColor([20,20,20],[40,40,40],a/la))
                layer.rect(layer.width/2,a+0.5,layer.width,2)
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
        case 4: case 5: case 6: case 7:
            layer.noStroke()
            layer.rotate(45*type)
            for(a=0,la=6;a<la;a++){
                layer.fill(120,240,200)
                layer.rotate(180/la)
                layer.triangle(0,0,8,8,5,20)
                layer.fill(80,200,240)
                layer.rotate(180/la)
                layer.triangle(0,0,8,8,5,20)
            }
        break
        case 8: case 9: case 10: case 11:
            layer.noStroke()
            layer.rotate(45*type)
            for(a=0,la=6;a<la;a++){
                layer.fill(160,240,240)
                layer.rotate(180/la)
                layer.triangle(0,0,4,4,5,20)
                layer.fill(120,200,240)
                layer.rotate(180/la)
                layer.triangle(0,0,4,4,5,20)
            }
        break
        case 12: case 13: case 14: case 15:
            layer.noStroke()
            layer.rotate(45*type)
            for(a=0,la=7;a<la;a++){
                layer.fill(240,80,120)
                layer.rotate(180/la)
                layer.triangle(0,0,5,8,4,23)
                layer.fill(220,80,240)
                layer.rotate(180/la)
                layer.triangle(0,0,5,8,4,23)
            }
        break
        case 16:
            for(let a=0,la=layer.width/20;a<la;a++){
                for(let b=0,lb=layer.height/20;b<lb;b++){
                    layer.fill(random(150,255),255,random(150,255))
                    layer.ellipse(-layer.width/2+a*20+random(-4,24),-layer.height/2+b*20+random(-4,24),random(2,3))
                }
            }
        break
        case 17: case 18: case 19: case 20:
            layer.noStroke()
            layer.rotate(45*type)
            for(a=0,la=7;a<la;a++){
                layer.fill(240,240,240)
                layer.rotate(180/la)
                layer.triangle(0,0,4,8,3,24)
                layer.fill(200,200,200)
                layer.rotate(180/la)
                layer.triangle(0,0,4,8,3,24)
            }
        break
    }
}