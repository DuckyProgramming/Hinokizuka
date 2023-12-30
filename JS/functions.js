//basic
function toggle(key){
    return key?false:true
}
function vectorAdd(v1,v2){
    v1.x+=v2.x
    v1.y+=v2.y
}
function vectorSet(v1,v2){
    v1.x=v2.x
    v2.y=v2.y
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
    return point.position.x>=box.position.x-box.width/2&&point.position.x<=box.position.x+box.width/2&&point.position.y>=box.position.y-box.height/2&&point.position.y<=box.position.y+box.height/2
}
function inBoxBox(box1,box2){
    return box1.position.x>=box2.position.x-box1.width/2-box2.width/2&&box1.position.x<=box2.position.x+box1.width/2+box2.width/2&&box1.position.y>=box2.position.y-box1.height/2-box2.height/2&&box1.position.y<=box2.position.y+box1.height/2+box2.height/2
}
function collideBoxBox(static,mobile){
    let v={x:0,y:0}
    let w={x:0,y:0}
    v.x=mobile.position.x==mobile.previous.position.x||mobile.position.x<static.position.x&&mobile.position.x<mobile.previous.position.x||mobile.position.x>static.position.x&&mobile.position.x>mobile.previous.position.x||mobile.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.previous.position.x>static.position.x-static.width/2-mobile.width/2&&mobile.position.x<static.position.x+static.width/2+mobile.width/2&&mobile.previous.position.x<static.position.x+static.width/2+mobile.width/2?
    1:mobile.position.x<static.position.x?(static.position.x-static.width/2-mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x):(static.position.x+static.width/2+mobile.width/2-mobile.previous.position.x)/(mobile.position.x-mobile.previous.position.x)
    v.y=mobile.position.y==mobile.previous.position.y||mobile.position.y<static.position.y&&mobile.position.y<mobile.previous.position.y||mobile.position.y>static.position.y&&mobile.position.y>mobile.previous.position.y||mobile.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.previous.position.y>static.position.y-static.height/2-mobile.height/2&&mobile.position.y<static.position.y+static.height/2+mobile.height/2&&mobile.previous.position.y<static.position.y+static.height/2+mobile.height/2?
    1:mobile.position.y<static.position.y?(static.position.y-static.height/2-mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y):(static.position.y+static.height/2+mobile.height/2-mobile.previous.position.y)/(mobile.position.y-mobile.previous.position.y)
    if(v.x<v.y){
		w.x=static.position.x-static.width/2+mobile.width/2*(mobile.position.x<static.position.x?-1:1)
		w.y=mobile.previous.position.y*(1-v.y)+mobile.position.y*v.y
	}
	else{
		w.y=static.position.y-static.height/2+mobile.height/2*(mobile.position.y<static.position.y?-1:1)
		w.x=mobile.previous.position.x*(1-v.x)+mobile.position.x*v.x
	}
    return atan2(w.x-static.position.x,w.y-static.position.y)>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(w.x-static.position.x,w.y-static.position.y)<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    0:atan2(w.x-static.position.x,w.y-static.position.y)<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||atan2(w.x-static.position.x,w.y-static.position.y)>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)?
    1:atan2(w.x-static.position.x,w.y-static.position.y)<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&atan2(w.x-static.position.x,w.y-static.position.y)>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    2:atan2(w.x-static.position.x,w.y-static.position.y)<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(w.x-static.position.x,w.y-static.position.y)>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)?
    3:basicCollideBoxBox(static,mobile)
}
function basicCollideBoxBox(static,mobile){
    return atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)>atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)<atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    0:atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)<atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)||atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)>atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)?
    1:atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)<atan2(static.width/2+mobile.width/2,-static.height/2-mobile.height/2)&&atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)>atan2(static.width/2+mobile.width/2,static.height/2+mobile.height/2)?
    2:atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)<atan2(-static.width/2-mobile.width/2,static.height/2+mobile.height/2)&&atan2(mobile.position.x-static.position.x,mobile.position.y-static.position.y)>atan2(-static.width/2-mobile.width/2,-static.height/2-mobile.height/2)?
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
    layer.triangle(x+sin(direction)*radiusX,y+cos(direction)*radiusY,x+sin(direction+50)*radiusX,y+cos(direction+50)*radiusY,x+sin(direction+120)*radiusX,y+cos(direction+120)*radiusY)
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
//character graphical
function mergeColor(color1,color2,key){
    return [color1[0]*(1-key)+color2[0]*key,color1[1]*(1-key)+color2[1]*key,color1[2]*(1-key)+color2[2]*key]
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
function displayMain(layer){
    stage.scale=min(width/layer.width,height/layer.height)
    image(layer,width/2,height/2,layer.width*stage.scale,layer.height*stage.scale)
}
function initialElements(layer){
    entities.players.push(new player(layer,0,0))
}
function clearWorld(){
    entities.walls=[]
    entities.uis=[]
}
function generateLevel(level,layer,context,dev){
    if(context==0){
        clearWorld()
    }
    game.edge.x=level.edge.x
    game.edge.y=level.edge.y
    for(let a=0,la=entities.players.length;a<la;a++){
        if(context==0){
            entities.players[a].position.x=level.spawn.x
            entities.players[a].position.y=level.spawn.y
            entities.players[a].reset(0)
            view.goal.scroll.x=game.edge.x<layer.width?game.edge.x/2:constrain(entities.players[a].position.x,layer.width/2,game.edge.x-layer.width/2)
            view.goal.scroll.y=game.edge.y<layer.height?game.edge.y/2:constrain(entities.players[a].position.y,layer.height/2,game.edge.y-layer.height/2)
        }
    }
    view.scroll.x=view.goal.scroll.x
    view.scroll.y=view.goal.scroll.y
    for(let a=0,la=level.walls.length;a<la;a++){
        entities.walls.push(new wall(layer,level.walls[a].x,level.walls[a].y,level.walls[a].width,level.walls[a].height,level.walls[a].type))
    }
    if(dev){
        //entities.uis.push()
    }
    run.fore=[entities.players,entities.walls]
    run.over=[entities.uis]
}
function updateView(){
    view.scroll.x=view.scroll.x*0.9+view.goal.scroll.x*0.1
    view.scroll.y=view.scroll.y*0.9+view.goal.scroll.y*0.1
}
function operateInner(layer){
    if(dev.edge){
        displayComponent(layer,0)
    }
}
function operateOuter(layer){
    for(let a=0,la=entities.players.length;a<la;a++){
        view.goal.scroll.x=game.edge.x<layer.width?game.edge.x/2:constrain(entities.players[a].position.x,layer.width/2,game.edge.x-layer.width/2)
        view.goal.scroll.y=game.edge.y<layer.height?game.edge.y/2:constrain(entities.players[a].position.y,layer.height/2,game.edge.y-layer.height/2)
    }
}
function displayComponent(layer,type){
    switch(type){
        case 0:
            layer.noFill()
            layer.stroke(0,255,100)
            layer.strokeWeight(2)
            layer.rect(game.edge.x/2,game.edge.y/2,game.edge.x,game.edge.y)
        break
    }
}