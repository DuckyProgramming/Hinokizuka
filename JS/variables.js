types={
    wall:[
        {name:'Empty',interval:{x:10,y:10}},//0
        {name:'Stone - 0',interval:{x:10,y:10}},
        {name:'Spikes - Up',interval:{x:10,y:2}},
        {name:'Spikes - Down',interval:{x:10,y:2}},
        {name:'Spikes - Left',interval:{x:2,y:10}},
        {name:'Spikes - Right',interval:{x:2,y:10}},
        {name:'Stone - 1',interval:{x:10,y:10}},
        {name:'Flower',interval:{x:10,y:10}},
        {name:'Collapsing - 0',interval:{x:10,y:10}},
        {name:'Dash Crystal',interval:{x:10,y:10}},

        {name:'Spring - Up',interval:{x:10,y:2}},//10
        {name:'Spring - Down',interval:{x:10,y:2}},
        {name:'Spring - Left',interval:{x:2,y:10}},
        {name:'Spring - Right',interval:{x:2,y:10}},
    ]
}
stage={scene:'main',scale:0}
game={level:1,zone:8,progress:{zone:0},time:0,player:{size:1},edge:{x:0,y:0},spawn:{x:0,y:0},connections:[],previous:{zone:0},scroll:{x:0,y:0},players:[0],flowers:0}
physics={gravity:0.5,friction:{x:0.96,y:0.995},resistance:{x:0.84,y:0.99}}
view={scroll:{x:0,y:0,anim:0},zoom:1,goal:{scroll:{x:0,y:0}},previous:{scroll:{x:0,y:0}}}
elements={flower:{anim:0,timer:0}}
entities={walls:[],players:[],uis:[]}
run={fore:[],over:[]}
transition={trigger:false,anim:0,scene:stage.scene}
graphics={main:0,backgrounds:[]}
inputs={
    keys:[
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false]
    ],validKey:[true,true,true,true,true,true,true,true],
mouse:{x:0,y:0},rel:{x:0,y:0},pMouse:{x:0,y:0},pRel:{x:0,y:0}}
options={defaultDash:false}
dev={editor:true,hitbox:true,edge:true,connection:true,markspawn:true,freecam:true,infinitedash:false,invincible:true,nograv:false,debound:true}