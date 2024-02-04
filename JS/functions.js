//basic
function stanh(value){
    return (2**value-1)/(2**value+1)*0.5+0.5
}
function vectorAdd(v1,v2){
    v1.x+=v2.x
    v1.y+=v2.y
}
function vectorSet(v1,v2){
    v1.x=v2.x
    v1.y=v2.y
}
function vectorDot(v1,v2){
    v1.x=v1.x*v2.x
    v1.y=v1.y*v2.y
}
function vectorMultScalar(v,s){
    v.x=v.x*s
    v.y=v.y*s
}
function randSign(){
    return floor(random(0,2))*2-1
}
function sign(value){
    return value>=0?1:-1
}
//calculatory
function inPointBox(point,box){
    return point.position.x>box.position.x-box.width/2&&point.position.x<box.position.x+box.width/2&&point.position.y>box.position.y-box.height/2&&point.position.y<box.position.y+box.height/2
}
function inBoxBox(box1,box2){
    return box1.position.x>box2.position.x-box1.width/2-box2.width/2&&box1.position.x<box2.position.x+box1.width/2+box2.width/2&&box1.position.y>box2.position.y-box1.height/2-box2.height/2&&box1.position.y<box2.position.y+box1.height/2+box2.height/2
}
function onSegment(p,q,r){ 
    return q.x<=max(p.x,r.x)&&q.x>=min(p.x, r.x)&&q.y<=max(p.y,r.y)&&q.y>=min(p.y, r.y)
}
function orientPoint(p,q,r){ 
    s=(q.y-p.y)*(r.x-q.x)-(q.x-p.x)*(r.y-q.y) 
    return s==0?0:s>0?1:2
}
function intersect(p1,q1,p2,q2){
    o1=orientPoint(p1,q1,p2)
    o2=orientPoint(p1,q1,q2)
    o3=orientPoint(p2,q2,p1)
    o4=orientPoint(p2,q2,q1)
    return o1!=o2&&o3!=o4||
    o1==0&&onSegment(p1,p2,q1)||
    o2==0&&onSegment(p1,q2,q1)||
    o3==0&&onSegment(p2,p1,q2)||
    o4==0&&onSegment(p2,q1,q2)
} 
function collideBoxBox(static,mobile){
    if(inBoxBox(static,{position:mobile.previous.position,width:mobile.width-1,height:mobile.height-1})){
        return basicCollideBoxBox(static,mobile)
    }
    for(let a=0,la=static.boundary.length;a<la;a++){
        for(let b=0,lb=static.boundary[a].length;b<lb;b++){
            if(intersect(mobile.position,mobile.previous.position,
                {x:static.boundary[a][b][0].x+mobile.width/2*(a==2?1:-1),y:static.boundary[a][b][0].y+mobile.height/2*(a==0?1:-1)},
                {x:static.boundary[a][b][1].x+mobile.width/2*(a!=3?1:-1),y:static.boundary[a][b][1].y+mobile.height/2*(a!=1?1:-1)})){
                return a
            }
        }
    }
    return basicCollideBoxBox(static,mobile)
    /*return inBoxBox(static,{position:mobile.previous.position,width:mobile.width-1,height:mobile.height-1})?
        basicCollideBoxBox(static,mobile):
        intersect(mobile.position,mobile.previous.position,
        {x:static.boundary[0][0].x-mobile.width/2,y:static.boundary[0][0].y+mobile.height/2},
        {x:static.boundary[0][0].x+mobile.width/2,y:static.boundary[0][1].y+mobile.height/2})?
        0:intersect(mobile.position,mobile.previous.position,
        {x:static.boundary[1][0].x-mobile.width/2,y:static.boundary[1][0].y-mobile.height/2},
        {x:static.boundary[1][1].x+mobile.width/2,y:static.boundary[1][1].y-mobile.height/2})?
        1:intersect(mobile.position,mobile.previous.position,
        {x:static.boundary[2][0].x+mobile.width/2,y:static.boundary[2][0].y-mobile.height/2},
        {x:static.boundary[2][1].x+mobile.width/2,y:static.boundary[2][1].y+mobile.height/2})?
        2:intersect(mobile.position,mobile.previous.position,
        {x:static.boundary[3][0].x-mobile.width/2,y:static.boundary[3][0].y-mobile.height/2},
        {x:static.boundary[3][1].x-mobile.width/2,y:static.boundary[3][1].y+mobile.height/2})?
        3:basicCollideBoxBox(static,mobile)*/
    /*let v={x:0,y:0}
    let w={x:0,y:0}
    v.x=mobile.position.x==mobile.previous.position.x||mobile.position.x<static.position.x&&mobile.position.x<mobile.previous.position.x||mobile.position.x>static.position.x&&mobile.position.x>mobile.previous.position.x||mobile.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.previous.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.position.x<static.position.x+static.width/2+mobile.width/2&&mobile.previous.position.x<static.position.x+static.width/2+mobile.width/2?
	1:mobile.position.x<static.position.x?(static.position.x-static.width/2-mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x):(static.position.x+static.width/2+mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
	v.y=mobile.position.y==mobile.previous.position.y||mobile.position.y<static.position.y&&mobile.position.y<mobile.previous.position.y||mobile.position.y>static.position.y&&mobile.position.y>mobile.previous.position.y||mobile.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.previous.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.position.y<static.position.y+static.height/2+mobile.height/2&&mobile.previous.position.y<static.position.y+static.height/2+mobile.height/2?
    1:mobile.position.y<static.position.y?(static.position.y-static.height/2-mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y):(static.position.y+static.height/2+mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
	if(v.x<v.y){
        w.x=static.position.x+(static.width/2+mobile.width/2)*(mobile.position.x<static.position.x?-1:1)
		w.y=mobile.previous.position.y*(1-v.y)+mobile.position.y*v.y
	}
	else{
    	w.y=static.position.y+(static.height/2+mobile.height/2)*(mobile.position.y<static.position.y?-1:1)
		w.x=mobile.previous.position.x*(1-v.x)+mobile.position.x*v.x
	}
    let u=atan2(w.x-static.position.x,w.y-static.position.y)
    if(u>180){
        u-=360
    }else if(u<-180){
        u+=360
    }
    return u>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    0:u<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||u>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)?
    1:u<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&u>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    2:u<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)?
    3:basicCollideBoxBox(static,mobile)*/
}
function basicCollideBoxBox(static,mobile){
    let u=atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)
    if(u>180){
        u-=360
    }else if(u<-180){
        u+=360
    }
    return u>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    0:u<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||u>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)?
    1:u<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&u>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    2:u<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&u>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)?
    3:-1
}
function smoothAnim(anim,trigger,minPoint,maxPoint,speed){
	if(trigger&&anim<maxPoint){
		return min(round(anim*speed+1)/speed,maxPoint)
	}
	if(!trigger&&anim>minPoint){
		return max(round(anim*speed-1)/speed,minPoint)
	}
	return anim
}
function numericalDirection(direction){
    switch(direction){
        case 0:
            return {x:0,y:-1}
        case 1:
            return {x:1,y:-1}
        case 2:
            return {x:1,y:0}
        case 3:
            return {x:1,y:1}
        case 4:
            return {x:0,y:1}
        case 5:
            return {x:-1,y:1}
        case 6:
            return {x:-1,y:0}
        case 7:
            return {x:-1,y:-1}
    }
}
function deNumericalDirection(x,y){
    switch(x){
        case 0:
            switch(y){
                case -1:
                    return 0
                case 1:
                    return 4
            }
        case -1:
            switch(y){
                case -1:
                    return 7
                case 0:
                    return 6
                case 1:
                    return 5
            }
        case 1:
            switch(y){
                case -1:
                    return 1
                case 0:
                    return 2
                case 1:
                    return 3
            }
    }
}
//graphical
function setupBase(){
    colorMode(RGB,255,255,255,1)
    angleMode(DEGREES)
    rectMode(CENTER)
    imageMode(CENTER)
    textAlign(CENTER,CENTER)
    noStroke()
}
function setupLayer(layer){
    layer.colorMode(RGB,255,255,255,1)
    layer.angleMode(DEGREES)
    layer.rectMode(CENTER)
    layer.imageMode(CENTER)
    layer.textAlign(CENTER,CENTER)
    layer.noStroke()
}
function regTriangle(layer,x,y,radiusX,radiusY,direction){
    layer.triangle(x+sin(direction)*radiusX,y+cos(direction)*radiusY,x+sin(direction+120)*radiusX,y+cos(direction+120)*radiusY,x+sin(direction-120)*radiusX,y+cos(direction-120)*radiusY)
}
function regPoly(layer,x,y,sides,radiusX,radiusY,direction){
    layer.beginShape()
    for(let a=0,la=sides;a<la;a++){
        layer.vertex(x+sin(a/la*360+direction)*radiusX,y+cos(a/la*360+direction)*radiusY)
    }
    layer.endShape(CLOSE)
}
function regStar(layer,x,y,points,radiusX,radiusY,innerRadiusX,innerRadiusY,direction){
    layer.beginShape()
    for(let a=0,la=points;a<la;a++){
        layer.vertex(x+sin(a/la*360+direction)*radiusX,y+cos(a/la*360+direction)*radiusY)
        layer.vertex(x+sin((a+0.5)/la*360+direction)*innerRadiusX,y+cos((a+0.5)/la*360+direction)*innerRadiusY)
    }
    layer.endShape(CLOSE)
}
function diamond(layer,x,y,width,height){
    layer.quad(x-width/2,y,x,y-height/2,x+width/2,y,x,y+height/2)
}
//character graphical
function mergeColor(color1,color2,key){
    return [color1[0]*(1-key)+color2[0]*key,color1[1]*(1-key)+color2[1]*key,color1[2]*(1-key)+color2[2]*key]
}
function tripletColor(color1,color2,color3,key){
    return key>=1?[color2[0]*(2-key)+color3[0]*(key-1),color2[1]*(2-key)+color3[1]*(key-1),color2[2]*(2-key)+color3[2]*(key-1)]:[color1[0]*(1-key)+color2[0]*key,color1[1]*(1-key)+color2[1]*key,color1[2]*(1-key)+color2[2]*key]
}
function controlSpin(list,direction,spec){
    for(let a=0,la=list.length;a<la;a++){
        if(list[a].spin[0]>list[a].spin[1]&&spec==1){
            list[a].spin[1]=list[a].spin[0]+list[a].spin[1]
            list[a].spin[0]=list[a].spin[1]-list[a].spin[0]
            list[a].spin[1]=list[a].spin[1]-list[a].spin[0]
            list[a].y[1]=list[a].y[0]+list[a].y[1]
            list[a].y[0]=list[a].y[1]-list[a].y[0]
            list[a].y[1]=list[a].y[1]-list[a].y[0]
        }
        for(let b=0,lb=list[a].spin.length;b<lb;b++){
            if(direction+list[a].spin[b]>180){
                list[a].spin[b]-=360
                if(direction+list[a].spin[b]>180){
                    list[a].spin[b]-=360
                }
            }else if(direction+list[a].spin[b]<-180){
                list[a].spin[b]+=360
                if(direction+list[a].spin[b]<-180){
                    list[a].spin[b]+=360
                }
            }
        }
    }
}
function displayTrianglesBack(layer,parts,direction,base,width,weight,slant,color,fade){
    layer.fill(color[0],color[1],color[2],fade)
    layer.stroke(color[0],color[1],color[2],fade)
    layer.strokeWeight(weight)
    layer.strokeJoin(ROUND)
    for(let part of parts){
        if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
            if(cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
            }else{
                layer.quad(sin(part.spin[1]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
            if(cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
            }else{
                layer.quad(sin(part.spin[0]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)<=0&&cos(part.spin[2]+direction)<=0){
            layer.triangle(sin(part.spin[0]+direction)*width/2,base,sin(part.spin[1]+direction)*width/2,base,sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
        }
    }
}
function displayTrianglesFront(layer,parts,direction,base,width,weight,slant,color,fade){
    if(color==-1){
        layer.fill(0,fade)
        layer.stroke(0,fade)
        layer.erase(fade,fade)
    }else{
        layer.fill(color[0],color[1],color[2],fade)
        layer.stroke(color[0],color[1],color[2],fade)
    }
    layer.strokeWeight(weight)
    layer.strokeJoin(ROUND)
    for(let part of parts){
        if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
            if(cos(part.spin[2]+direction)<0){
                layer.triangle(sin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])))
            }else if(cos(part.spin[2]+direction)>0){
                layer.quad(sin(part.spin[0]+direction)*width/2,base,width/2,base,width/2+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
            if(cos(part.spin[2]+direction)<0){
                layer.triangle(sin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2])))
            }else if(cos(part.spin[2]+direction)>0){
                layer.quad(sin(part.spin[1]+direction)*width/2,base,-width/2,base,-width/2-part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,base+part.height*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2])),sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
            }
        }else if(cos(part.spin[0]+direction)>0&&cos(part.spin[1]+direction)>0&&cos(part.spin[2]+direction)>0){
            layer.triangle(sin(part.spin[0]+direction)*width/2,base,sin(part.spin[1]+direction)*width/2,base,sin(part.spin[2]+direction)*(width/2+part.height*slant),base+part.height)
        }
    }
}
function displayTrianglesBackMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade,control=[0,1]){
    layer.strokeWeight(weight)
    layer.strokeJoin(ROUND)
    let a=0
    let la=parts.length
    for(let part of parts){
        a++
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else{
            layer.fill(mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[0],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[1],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[2],fade)
            layer.stroke(mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[0],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[1],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[2],fade)
        }
        if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
            if(cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                width/2+(part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))*slant,
                base+part.y[2]*abs(1-(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))+part.y[1]*abs(90-part.spin[2]-direction)/abs(part.spin[1]-part.spin[2]))
            }else{
                layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                width/2+(part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                base+part.y[1]*(1-abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
            if(cos(part.spin[2]+direction)>0){
                layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                -width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
            }else{
                layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                -width/2-(part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                base+part.y[0]*(1-abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(-90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)<=0&&cos(part.spin[2]+direction)<=0){
            layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
        }
    }
}
function displayTrianglesFrontMerge(layer,parts,direction,base,width,weight,slant,color1,color2,fade,control=[0,1]){
    layer.strokeWeight(weight)
    layer.strokeJoin(ROUND)
    let a=0
    let la=parts.length
    for(let part of parts){
        a++
        if(color1==-1){
            layer.fill(0,fade)
            layer.stroke(0,fade)
            layer.erase(fade,fade)
        }else{
            layer.fill(mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[0],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[1],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[2],fade)
            layer.stroke(mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[0],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[1],mergeColor(color1,color2,map(a/la,0,1,control[0],control[1]))[2],fade)
        }
        if(cos(part.spin[1]+direction)<=0&&cos(part.spin[0]+direction)>0){
            if(cos(part.spin[2]+direction)<=0){
                layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                width/2+(part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))*slant,
                base+part.y[0]*(1-abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]))+part.y[1]*abs(90-part.spin[0]-direction)/abs(part.spin[1]-part.spin[0]),
                width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
            }else{
                layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],
                width/2+(part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))*slant,
                base+part.y[0]*(1-(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]))+part.y[1]*(90-part.spin[0]-direction)/(part.spin[1]-part.spin[0]),
                width/2+(part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                base+part.y[2]*(1-(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
            }
        }else if(cos(part.spin[0]+direction)<=0&&cos(part.spin[1]+direction)>0){
            if(cos(part.spin[2]+direction)<=0){
                layer.triangle(sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                -width/2-(part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))*slant,
                base+part.y[1]*(1-abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]))+part.y[0]*abs(-90-part.spin[1]-direction)/abs(part.spin[0]-part.spin[1]),
                -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))*slant,
                base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))+part.y[1]*(-90-part.spin[2]-direction)/(part.spin[1]-part.spin[2]))
            }else{
                layer.quad(sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2],
                sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],
                -width/2-(part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))*slant,
                base+part.y[1]*(1-(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]))+part.y[0]*(-90-part.spin[1]-direction)/(part.spin[0]-part.spin[1]),
                -width/2-(part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))*slant,
                base+part.y[2]*(1-(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))+part.y[0]*(-90-part.spin[2]-direction)/(part.spin[0]-part.spin[2]))
            }
        }else if(cos(part.spin[0]+direction)>0&&cos(part.spin[1]+direction)>0&&cos(part.spin[2]+direction)>0){
            layer.triangle(sin(part.spin[0]+direction)*(width/2+part.y[0]*slant),base+part.y[0],sin(part.spin[1]+direction)*(width/2+part.y[1]*slant),base+part.y[1],sin(part.spin[2]+direction)*(width/2+part.y[2]*slant),base+part.y[2])
        }
    }
}
//key
function updateMouse(layer){
    inputs.pMouse.x=inputs.mouse.x
    inputs.pMouse.y=inputs.mouse.y
    inputs.pRel.x=inputs.rel.x
    inputs.pRel.y=inputs.rel.y
	inputs.mouse.x=mouseX
	inputs.mouse.y=mouseY
	inputs.rel.x=(inputs.mouse.x-width/2)/stage.scale+layer.width/2
	inputs.rel.y=(inputs.mouse.y-height/2)/stage.scale+layer.height/2
}
function displayMain(layer){
    stage.scale=min(width/layer.width,height/layer.height)
    image(layer,width/2,height/2,layer.width*stage.scale,layer.height*stage.scale)
}
function initialElements(layer){
    for(let a=0,la=2;a<la;a++){
        if(dev.editor&&!game.players.includes(a)){
            entities.reserve.push(0)
        }else{
            entities.reserve.push(new player(layer,0,0,a,a,false))
        }
    }
}
function reformElements(){
    entities.players=[]
    for(let a=0,la=game.players.length;a<la;a++){
        entities.reserve[game.players[a]].id=a
        entities.players.push(entities.reserve[game.players[a]])
    }
}
function initialLevels(){
    for(let a=0,la=levels.length;a<la;a++){
        game.levelData.push({flowers:0,deaths:0})
        for(let b=0,lb=levels[a].length;b<lb;b++){
            levels[a][b].spawnRule=[]
            for(let c=0,lc=levels[a][b].walls.length;c<lc;c++){
                levels[a][b].spawnRule.push(0)
            }
            if(!levels[a][b].hasOwnProperty('wind')){
                levels[a][b].wind={x:0,y:0}
            }
        }
    }
}
function reformLevels(){
    for(let a=0,la=levels.length;a<la;a++){
        for(let b=0,lb=levels[a].length;b<lb;b++){
            for(let c=0,lc=levels[a][b].walls.length;c<lc;c++){
                if(levels[a][b].spawnRule[c]==1){
                    levels[a][b].spawnRule[c]=2
                }
            }
        }
    }
}
function clearWorld(){
    entities.particles=[]
    entities.walls=[[],[]]
}
function unlockLevel(level,zone){
    switch(level){
        case 0:
            switch(zone){
                case 1:
                    inputs.validKey[4]=true
                break
                case 2:
                    inputs.validKey[7]=true
                break
                case 4:
                    inputs.validKey[6]=true
                break
                case 6:
                    inputs.validKey[5]=true
                break
            }
        break
    }
}
function generateLevel(level,layer,context){
    if(game.zone>game.progress.zone){
        game.progress.zone=game.zone
        unlockLevel(game.level,game.zone)
    }
    view.previous.scroll.x=view.goal.scroll.x
    view.previous.scroll.y=view.goal.scroll.y
    let nudge={x:0,y:0}
    switch(context){
        case 0: case 1:
            clearWorld()
        break
        case 2: case 3: case 4: case 5:
            for(let a=0,la=level.connections.length;a<la;a++){
                for(let b=0,lb=game.connections.length;b<lb;b++){
                    if(level.connections[a].id==game.previous.zone&&game.connections[b].id==game.zone&&abs(level.connections[a].side-game.connections[b].side)==2){
                        switch(context){
                            case 2:
                                nudge.y=-level.edge.y
                                nudge.x=-(level.connections[a].region[0]/2+level.connections[a].region[1]/2-game.connections[b].region[0]/2-game.connections[b].region[1]/2)
                            break
                            case 3:
                                nudge.x=game.edge.x
                                nudge.y=-(level.connections[a].region[0]/2+level.connections[a].region[1]/2-game.connections[b].region[0]/2-game.connections[b].region[1]/2)
                            break
                            case 4:
                                nudge.y=game.edge.y
                                nudge.x=-(level.connections[a].region[0]/2+level.connections[a].region[1]/2-game.connections[b].region[0]/2-game.connections[b].region[1]/2)
                            break
                            case 5:
                                nudge.x=-level.edge.x
                                nudge.y=-(level.connections[a].region[0]/2+level.connections[a].region[1]/2-game.connections[b].region[0]/2-game.connections[b].region[1]/2)
                            break
                        }
                    }
                }
            }
            view.scroll.x-=nudge.x
            view.scroll.y-=nudge.y
            view.previous.scroll.x-=nudge.x
            view.previous.scroll.y-=nudge.y
            game.scroll.x+=nudge.x
            game.scroll.y+=nudge.y
            let group=[entities.players,entities.walls[0],entities.walls[1],entities.particles]
            for(let a=0,la=group.length;a<la;a++){
                for(let b=0,lb=group[a].length;b<lb;b++){
                    group[a][b].position.x-=nudge.x
                    group[a][b].position.y-=nudge.y
                    if(a==0){
                        group[a][b].previous.position.x=group[a][b].position.x
                        group[a][b].previous.position.y=group[a][b].position.y
                    }
                }
            }
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    entities.walls[a][b].deprecate=true
                }
            }
        break
    }
    let old={edge:{x:game.edge.x,y:game.edge.y},previous:{zone:game.previous.zone},connections:game.connections}
    game.previous.zone=game.zone
    game.connections=level.connections
    game.edge.x=level.edge.x
    game.edge.y=level.edge.y
    game.wind.x=level.wind.x
    game.wind.y=level.wind.y
    game.iceSwitch=1
    for(let a=0,la=entities.players.length;a<la;a++){
        switch(context){
            case 0:
                entities.players[a].position.x=level.spawn.x-a*10-5+la*5
                entities.players[a].position.y=level.spawn.y
                entities.players[a].reset(0)
            break
            case 1:
                entities.players[a].position.x=game.spawn.x-a*10-5+la*5
                entities.players[a].position.y=game.spawn.y
                entities.players[a].reset(0)
            break
            case 2:
                entities.players[a].reset(entities.players[a].orb.active?2:1)
                if(!entities.players[a].orb.active){
                    game.spawn.x=entities.players[a].position.x
                    game.spawn.y=entities.players[a].position.y-5
                }
            break
            case 3:
                entities.players[a].reset(entities.players[a].orb.active?2:1)
                if(!entities.players[a].orb.active){
                    game.spawn.x=entities.players[a].position.x+5
                    game.spawn.y=entities.players[a].position.y
                }
            break
            case 4:
                entities.players[a].reset(entities.players[a].orb.active?2:1)
                if(!entities.players[a].orb.active){
                    game.spawn.x=entities.players[a].position.x
                    game.spawn.y=entities.players[a].position.y+5
                }
            break
            case 5:
                entities.players[a].reset(entities.players[a].orb.active?2:1)
                if(!entities.players[a].orb.active){
                    game.spawn.x=entities.players[a].position.x-5
                    game.spawn.y=entities.players[a].position.y
                }
            break
        }
        view.goal.scroll.x=game.edge.x<layer.width?game.edge.x/2:constrain(entities.players[a].position.x,layer.width/2,game.edge.x-layer.width/2)
        view.goal.scroll.y=game.edge.y<layer.height?game.edge.y/2:constrain(entities.players[a].position.y,layer.height/2,game.edge.y-layer.height/2)
    }
    view.scroll.anim=context==0||context==1?10:0
    switch(context){
        case 0:
            view.scroll.x=view.goal.scroll.x
            view.scroll.y=view.goal.scroll.y
            game.spawn.x=level.spawn.x
            game.spawn.y=level.spawn.y
        break
        case 1:
            view.scroll.x=view.goal.scroll.x
            view.scroll.y=view.goal.scroll.y
        break
    }
    if(dev.freecam){
        view.scroll.x=0
        view.scroll.y=0
        for(let a=0,la=entities.players.length;a<la;a++){
            view.scroll.x+=entities.players[a].position.x/la
            view.scroll.y+=entities.players[a].position.y/la
        }
        view.scroll.anim=10
    }
    for(let a=0,la=3;a<la;a++){
        for(let b=0,lb=level.walls.length;b<lb;b++){
            if((level.spawnRule[b]==0||level.spawnRule[b]==2)&&types.wall[level.walls[b].type].clump==a){
                entities.walls[types.wall[level.walls[b].type].slice].push(new wall(layer,level.walls[b].x,level.walls[b].y,level.walls[b].width,level.walls[b].height,level.walls[b].type,b,level.spawnRule[b],game.zone,level.walls[b].args))
            }
        }
    }
    for(let a=0,la=entities.walls.length;a<la;a++){
        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
            entities.walls[a][b].checkRedundant()
        }
    }
    if(context==2||context==3||context==4||context==5){
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                entities.walls[a][b].expel()
            }
        }
        if(abs(nudge.x)>5&&abs(nudge.y)>5){
            let top=0
            switch(context){
                case 2:
                    top=1
                break
                case 3: case 5:
                    for(let a=0,la=level.connections.length;a<la;a++){
                        for(let b=0,lb=old.connections.length;b<lb;b++){
                            if(level.connections[a].id==old.previous.zone&&old.connections[b].id==game.zone&&abs(level.connections[a].side-old.connections[b].side)==2){
                                top=level.connections[a].region[0]/2+level.connections[a].region[1]/2-old.connections[b].region[0]/2-old.connections[b].region[1]/2>0?1:0
                            }
                        }
                    }
                break
                case 4:
                    top=0
                break
            }
            switch(top){
                case 0:
                    for(let a=0,la=entities.walls.length;a<la;a++){
                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                            if(entities.walls[a][b].deprecate&&entities.walls[a][b].position.y+entities.walls[a][b].base.height/2+nudge.y>=old.edge.y){
                                entities.walls[a][b].position.y+=level.edge.y/2
                                entities.walls[a][b].height+=level.edge.y
                                entities.walls[a][b].base.height+=level.edge.y
                                entities.walls[a][b].downsize.trigger[0]=true
                                entities.walls[a][b].downsize.value=level.edge.y
                            }else if(!entities.walls[a][b].deprecate&&entities.walls[a][b].position.y-entities.walls[a][b].base.height/2<=0){
                                entities.walls[a][b].position.y-=level.edge.y/2
                                entities.walls[a][b].height+=level.edge.y
                                entities.walls[a][b].base.height+=level.edge.y
                                entities.walls[a][b].downsize.trigger[1]=true
                                entities.walls[a][b].downsize.value=level.edge.y
                            }
                        }
                    }
                break
                case 1:
                    for(let a=0,la=entities.walls.length;a<la;a++){
                        for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                            if(!entities.walls[a][b].deprecate&&entities.walls[a][b].position.y+entities.walls[a][b].base.height/2>=level.edge.y){
                                entities.walls[a][b].position.y+=old.edge.y/2
                                entities.walls[a][b].height+=old.edge.y
                                entities.walls[a][b].base.height+=old.edge.y
                                entities.walls[a][b].downsize.trigger[0]=true
                                entities.walls[a][b].downsize.value=old.edge.y
                            }else if(entities.walls[a][b].deprecate&&entities.walls[a][b].position.y-entities.walls[a][b].base.height/2-nudge.y<=0){
                                entities.walls[a][b].position.y-=old.edge.y/2
                                entities.walls[a][b].height+=old.edge.y
                                entities.walls[a][b].base.height+=old.edge.y
                                entities.walls[a][b].downsize.trigger[1]=true
                                entities.walls[a][b].downsize.value=old.edge.y
                            }
                        }
                    }
                break
            }
        }
    }
    if(dev.editor){
        if(entities.uis.length==0){
            entities.uis.push(new ui(layer))
            entities.uis[entities.uis.length-1].set()
        }else{
            for(let a=0,la=entities.uis.length;a<la;a++){
                entities.uis[a].set()
            }
        }
    }
    run.fore=[entities.walls[0],entities.particles,entities.players,entities.walls[1]]
    run.over=dev.editor?[entities.uis]:[]
}
function updateView(){
    if(dev.freecam){
        view.scroll.x=0
        view.scroll.y=0
        for(let a=0,la=entities.players.length;a<la;a++){
            view.scroll.x+=entities.players[a].position.x/la
            view.scroll.y+=entities.players[a].position.y/la
        }
        for(let a=0,la=entities.walls.length;a<la;a++){
            for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                if(entities.walls[a][b].deprecate&&!((entities.walls[a][b].type==7||entities.walls[a][b].type==14||entities.walls[a][b].type==28)&&entities.walls[a][b].grabbed[0]>=0&&!entities.walls[a][b].active)){
                    entities.walls[a][b].remove=true
                }
            }
        }
    }else if(view.scroll.anim<10){
        view.scroll.anim++
        if(view.scroll.anim>=10){
            view.scroll.anim=10
            for(let a=0,la=entities.walls.length;a<la;a++){
                for(let b=0,lb=entities.walls[a].length;b<lb;b++){
                    if(entities.walls[a][b].deprecate&&!((entities.walls[a][b].type==7||entities.walls[a][b].type==14||entities.walls[a][b].type==28)&&entities.walls[a][b].grabbed[0]>=0&&!entities.walls[a][b].active)){
                        entities.walls[a][b].remove=true
                    }else if(entities.walls[a][b].downsize.trigger[0]){
                        entities.walls[a][b].downsize.trigger[0]=false
                        entities.walls[a][b].position.y-=entities.walls[a][b].downsize.value/2
                        entities.walls[a][b].height-=entities.walls[a][b].downsize.value
                        entities.walls[a][b].base.height-=entities.walls[a][b].downsize.value
                    }else if(entities.walls[a][b].downsize.trigger[1]){
                        entities.walls[a][b].downsize.trigger[1]=false
                        entities.walls[a][b].position.y+=entities.walls[a][b].downsize.value/2
                        entities.walls[a][b].height-=entities.walls[a][b].downsize.value
                        entities.walls[a][b].base.height-=entities.walls[a][b].downsize.value
                    }
                }
            }
        }
        view.scroll.x=map(view.scroll.anim,0,10,view.previous.scroll.x,view.goal.scroll.x)
        view.scroll.y=map(view.scroll.anim,0,10,view.previous.scroll.y,view.goal.scroll.y)
    }else{
        view.scroll.x=view.scroll.x*0.9+view.goal.scroll.x*0.1
        view.scroll.y=view.scroll.y*0.9+view.goal.scroll.y*0.1
    }
}
function operateBack(layer){
    if(game.level==0){
        displayComponent(layer,0)
    }
}
function operateInner(layer){
    for(let a=0,la=3;a<la;a++){
        if(dev[['edge','connection','markspawn'][a]]){
            displayComponent(layer,a+1)
        }
    }
}
function operateOuter(layer){
    if(game.loadPlan>0){
        generateLevel(levels[game.level][game.zone],layer,game.loadPlan)
        game.loadPlan=0
    }
    if(!dev.freecam){
        let mid={x:0,y:0}
        let total=0
        for(let a=0,la=entities.players.length;a<la;a++){
            if(!entities.players[a].goal.dead){
                mid.x+=entities.players[a].position.x
                mid.y+=entities.players[a].position.y
                total++
            }
        }
        if(mid.x==0&&mid.y==0){
            for(let a=0,la=entities.players.length;a<la;a++){
                mid.x+=entities.players[a].position.x
                mid.y+=entities.players[a].position.y
                total++
            }
        }
        mid.x=constrain(mid.x/total,layer.width/2,game.edge.x-layer.width/2)
        mid.y=constrain(mid.y/total,layer.height/2,game.edge.y-layer.height/2)
        view.goal.scroll.x=game.edge.x<layer.width?game.edge.x/2:mid.x
        view.goal.scroll.y=game.edge.y<layer.height?game.edge.y/2:mid.y
    }
    displayComponent(layer,4)
    switch(game.level){
        case 2:
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
        break
        case 3:
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[5],900-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+sin(game.time*3)*20)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+(game.time*(1+game.wind.y)/10)%900,1800,900)
            layer.image(graphics.backgrounds[5],2700-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+sin(game.time*3)*20)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+(game.time*(1+game.wind.y)/10)%900,1800,900)
            layer.image(graphics.backgrounds[5],900-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+sin(game.time*3)*20)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+(game.time*(1+game.wind.y)/10)%900,1800,900)
            layer.image(graphics.backgrounds[5],2700-(view.scroll.x+game.scroll.x+(36000+game.time*game.wind.x/2%36000)+sin(game.time*3)*20)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+(game.time*(1+game.wind.y)/10)%900,1800,900)
        break
        case 4:
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+game.time)/10%1800,-450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],900-(view.scroll.x+game.scroll.x+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
            layer.image(graphics.backgrounds[3],2700-(view.scroll.x+game.scroll.x+game.time)/10%1800,450-300*stanh((view.scroll.y+game.scroll.y)/1800+0.2)+game.time*3%900,1800,900)
        break
    }
}
function operateMenu(layer){
    menu.transition=smoothAnim(menu.transition,menu.scene==1,0,1,60)
    for(let a=0,la=menu.sceneAnim.length;a<la;a++){
        menu.sceneAnim[a]=smoothAnim(menu.sceneAnim[a],menu.scene==a&&menu.transition==a,0,1,30)
    }
    for(let a=0,la=menu.selectAnim.length;a<la;a++){
        menu.selectAnim[a]=smoothAnim(menu.selectAnim[a],menu.select==a,0,1,15)
    }
    for(let a=0,la=menu.playerAnim.length;a<la;a++){
        menu.playerAnim[a]=smoothAnim(menu.playerAnim[a],game.players.includes(a),0,1,15)
    }
    layer.noStroke()
    for(let a=0,la=menu.levelPos.length;a<la;a++){
        layer.fill(220,menu.sceneAnim[1]*menu.selectAnim[a])
        layer.rect(menu.levelPos[a][0]+80,menu.levelPos[a][1],100,a==0?40:60,4)
        layer.fill(180,menu.sceneAnim[1]*menu.selectAnim[a])
        layer.rect(menu.levelPos[a][0]+80,menu.levelPos[a][1],95,a==0?35:55,4)
        layer.fill(0,menu.sceneAnim[1]*menu.selectAnim[a])
        layer.textSize(12)
        layer.text(`${a==0?'Tutorial':`Chapter ${a}\n${game.levelData[a].flowers}/12 Flowers`}\n${game.levelData[a].deaths} Death${game.levelData[a].deaths!=1?`s`:``}`,menu.levelPos[a][0]+80,menu.levelPos[a][1])
        layer.fill(180,255,255,menu.sceneAnim[1])
        diamond(layer,menu.levelPos[a][0],menu.levelPos[a][1],50,50)
        layer.fill(220,255,255,menu.sceneAnim[1])
        diamond(layer,menu.levelPos[a][0],menu.levelPos[a][1],40,40)
        layer.fill(0,0,40,menu.sceneAnim[1])
        layer.textSize(20)
        layer.text(a==0?'T':a,menu.levelPos[a][0],menu.levelPos[a][1]+1)
    }
    layer.noFill()
    for(let a=0,la=menu.playerAnim.length;a<la;a++){
        layer.stroke(500-menu.playerAnim[a]*500,menu.playerAnim[a]*500,0,menu.sceneAnim[0]*0.8)
        layer.strokeWeight(3)
        let center=220+a*330-600*(0.5-cos(menu.transition*180)*0.5)
        layer.ellipse(center,400,50)
        layer.line(center+12*(1-menu.playerAnim[a]),388-3*menu.playerAnim[a],center+15*menu.playerAnim[a],400)
        layer.line(center-12*(1-menu.playerAnim[a]),388-3*menu.playerAnim[a],center-15*menu.playerAnim[a],400)
        layer.line(center+12*(1-menu.playerAnim[a]),412+3*menu.playerAnim[a],center+15*menu.playerAnim[a],400)
        layer.line(center-12*(1-menu.playerAnim[a]),412+3*menu.playerAnim[a],center-15*menu.playerAnim[a],400)
    }
    layer.noStroke()
    layer.fill(100,menu.sceneAnim[1])
    layer.rect(30,layer.height-30,40,40,4)
    layer.fill(120,menu.sceneAnim[1])
    layer.rect(30,layer.height-30,32,32,4)
    layer.fill(40,menu.sceneAnim[1])
    regTriangle(layer,32,layer.height-30,12,12,30)
    if(menu.scene==1){
        elements.flower.timer=1
    }
    displayComponent(layer,4)
}
function operateEnding(layer){
    layer.noStroke()
    layer.fill(0,0.2)
    layer.rect(layer.width/2,layer.height/2,layer.width,layer.height)
    layer.fill(0,0,20)
    layer.textSize(30)
    layer.text(`${game.level==0?``:`${game.running.flowers}/12 Flowers\n`}${game.running.deaths} Death${game.running.deaths!=1?`s`:``}`,layer.width/2,300)
    layer.textSize(50)
    layer.text('End of Chapter',layer.width/2,520)
    layer.textSize(25)
    layer.text('Any Key to Continue',layer.width/2,560)
}
function displayComponent(layer,type){
    switch(type){
        case 0:
            layer.noStroke()
            layer.fill(11,18,60)
            layer.textSize(15)
            switch(game.zone){
                case 0:
                    layer.push()
                    layer.translate(520,400)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'Arrow Keys\nto Move':'Arrow Keys / TFGH\nto Move',0,0)
                    layer.pop()
                break
                case 1:
                    layer.push()
                    layer.translate(400,380)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'Z to\nJump':'Comma / Z\nto Jump',0,0)
                    layer.pop()
                break
                case 2:
                    layer.push()
                    layer.translate(330,460)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'R to\nReset':'Apostrophe / R\nto Reset',0,0)
                    layer.pop()
                break
                case 4:
                    layer.push()
                    layer.translate(160,400)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'C to Grab a Wall\nUp and Down Keys to\nClimb While Grabbing':'Forward Slash / C\nto Grab a Wall\nUp and Down Keys to\nClimb While Grabbing',0,0)
                    layer.pop()
                break
                case 6:
                    layer.push()
                    layer.translate(310,340)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'X to Dash\nHold Down Arrow Keys\nto Set Direction':'Period / X to Dash\nHold Down Arrow Keys\nto Set Direction',0,0)
                    layer.pop()
                break
                case 7:
                    layer.push()
                    layer.translate(180,420)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'Jump (Z) on a Wall\nto Wall Jump':'Jump (Comma / Z) on a\nWall to Wall Jump',0,0)
                    layer.pop()
                    layer.push()
                    layer.translate(960,180)
                    layer.rotate(5)
                    layer.text(game.players.length==1?'Dashes (X) Can\nBe Diagonal':'Dashes (Period / X)\nCan Be Diagonal',0,0)
                    layer.pop()
                break
            }
        break
        case 1:
            layer.noFill()
            layer.stroke(0,255,100)
            layer.strokeWeight(2)
            layer.rect(game.edge.x/2,game.edge.y/2,game.edge.x,game.edge.y)
        break
        case 2:
            layer.fill(255)
            layer.strokeWeight(2)
            for(let a=0,la=game.connections.length;a<la;a++){
                layer.stroke(100,255,0)
                switch(game.connections[a].side){
                    case 0:
                        layer.line(game.connections[a].region[0]+8,4,game.connections[a].region[1]-8,4)
                        layer.line(game.connections[a].region[0]+8,12,game.connections[a].region[0]+8,4)
                        layer.line(game.connections[a].region[1]-8,12,game.connections[a].region[1]-8,4)
                    break
                    case 1:
                        layer.line(game.edge.x-4,game.connections[a].region[0]+8,game.edge.x-4,game.connections[a].region[1]-8)
                        layer.line(game.edge.x-4,game.connections[a].region[0]+8,game.edge.x-12,game.connections[a].region[0]+8)
                        layer.line(game.edge.x-4,game.connections[a].region[1]-8,game.edge.x-12,game.connections[a].region[1]-8)
                    break
                    case 2:
                        layer.line(game.connections[a].region[0]+8,game.edge.y-4,game.connections[a].region[1]-8,game.edge.y-4)
                        layer.line(game.connections[a].region[0]+8,game.edge.y-12,game.connections[a].region[0]+8,game.edge.y-4)
                        layer.line(game.connections[a].region[1]-8,game.edge.y-12,game.connections[a].region[1]-8,game.edge.y-4)
                    break
                    case 3:
                        layer.line(4,game.connections[a].region[0]+8,4,game.connections[a].region[1]-8)
                        layer.line(4,game.connections[a].region[0]+8,12,game.connections[a].region[0]+8)
                        layer.line(4,game.connections[a].region[1]-8,12,game.connections[a].region[1]-8)
                    break
                }
                layer.noStroke()
                layer.textSize(16)
                switch(game.connections[a].side){
                    case 0:
                        layer.text(game.connections[a].id,game.connections[a].region[0]/2+game.connections[a].region[1]/2,16)
                    break
                    case 1:
                        layer.text(game.connections[a].id,game.edge.x-16,game.connections[a].region[0]/2+game.connections[a].region[1]/2)
                    break
                    case 2:
                        layer.text(game.connections[a].id,game.connections[a].region[0]/2+game.connections[a].region[1]/2,game.edge.y-16)
                    break
                    case 3:
                        layer.text(game.connections[a].id,16,game.connections[a].region[0]/2+game.connections[a].region[1]/2)
                    break
                }
            }
        break
        case 3:
            layer.stroke(0,100,255)
            layer.strokeWeight(2)
            layer.line(levels[game.level][game.zone].spawn.x-10,levels[game.level][game.zone].spawn.y,levels[game.level][game.zone].spawn.x+10,levels[game.level][game.zone].spawn.y)
            layer.line(levels[game.level][game.zone].spawn.x,levels[game.level][game.zone].spawn.y+10,levels[game.level][game.zone].spawn.x,levels[game.level][game.zone].spawn.y-10)
            layer.stroke(0,0,150)
            layer.line(game.spawn.x-7,game.spawn.y-7,game.spawn.x+7,game.spawn.y+7)
            layer.line(game.spawn.x-7,game.spawn.y+7,game.spawn.x+7,game.spawn.y-7)
        break
        case 4:
            elements.flower.anim=smoothAnim(elements.flower.anim,elements.flower.timer>0,0,1,30)
            if(elements.flower.timer>0){
                elements.flower.timer--
            }
            if(elements.flower.anim>0){
                layer.push()
                layer.translate(-50+elements.flower.anim*75,25)
                layer.fill(255)
                layer.stroke(0)
                layer.strokeWeight(0.5)
                layer.textSize(20)
                layer.text(game.flowers,30,0)
                layer.noStroke()
                layer.fill(123,189,156)
                for(let a=0,la=15;a<la;a++){
                    layer.triangle(-2.25,12,2.25,12,0,21)
                    layer.rotate(360/la)
                }
                let colors=[[206,111,147],[234,147,180],[253,173,205],[236,141,177],[251,158,193],[255,177,210],[255,203,235]]
                let offset=[15,10,25,-15,10,15,10,25,-15]
                for(let a=0,la=7;a<la;a++){
                    layer.fill(colors[a][0],colors[a][1],colors[a][2])
                    for(let b=0,lb=9;b<lb;b++){
                        layer.ellipse(0,9-a,6-a*2/3,18-a*2)
                        layer.rotate(360/la)
                    }
                    layer.rotate(offset[a])
                }
                layer.pop()
            }
        break
    }
}
function runTransition(layer){
    if(transition.trigger){
        transition.anim+=0.1
        if(transition.anim>=1){
            transition.trigger=false
            switch(transition.scene){
                case 'main':
                    generateLevel(levels[game.level][game.zone],layer,stage.scene=='main'?1:0)
                break
            }
            stage.scene=transition.scene
        }
    }else if(transition.anim>0){
        transition.anim-=0.1
    }
    if(transition.anim>0){
        layer.fill(0)
        layer.rect(layer.width/2,layer.height/4*transition.anim,layer.width,layer.height*transition.anim/2)
        layer.rect(layer.width/2,layer.height*(1-1/4*transition.anim),layer.width,layer.height*transition.anim/2)
        layer.rect(layer.width/4*transition.anim,layer.height/2,layer.width/2*transition.anim,layer.height*(1-transition.anim))
        layer.rect(layer.width*(1-1/4*transition.anim),layer.height/2,layer.width/2*transition.anim,layer.height*(1-transition.anim))
    }
}