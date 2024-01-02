types={
    wall:[
        {name:'Empty',interval:{x:10,y:10}},
        {name:'Stone',interval:{x:10,y:10}},
        {name:'Spikes - Up',interval:{x:10,y:2}},
        {name:'Spikes - Down',interval:{x:10,y:2}},
        {name:'Spikes - Left',interval:{x:2,y:10}},
        {name:'Spikes - Right',interval:{x:2,y:10}},
    ]
}
stage={scene:'main',scale:0}
game={level:0,zone:7,progress:{zone:0},time:0,player:{size:1},edge:{x:0,y:0},spawn:{x:0,y:0},connections:[],previous:{zone:0},scroll:{x:0,y:0}}
physics={gravity:0.5,friction:{x:0.96,y:0.995},resistance:{x:0.84,y:0.99}}
view={scroll:{x:0,y:0,anim:0},zoom:1,goal:{scroll:{x:0,y:0}},previous:{scroll:{x:0,y:0}}}
entities={walls:[],players:[],uis:[]}
run={fore:[],over:[]}
transition={trigger:false,anim:0,scene:stage.scene}
graphics={main:0,backgrounds:[]}
inputs={keys:[false,false,false,false,false,false,false,false],validKey:[true,true,true,true,true,true,true,true],mouse:{x:0,y:0},rel:{x:0,y:0},pMouse:{x:0,y:0},pRel:{x:0,y:0}}
dev={editor:true,hitbox:true,edge:true,connection:true,markspawn:true,freecam:true,infinitedash:false,invincible:true,nograv:false}