types={
    wall:[
        {name:'Empty',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},//0
        {name:'Stone - 0',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Up',interval:{x:[10,0],y:[10,-2]},slice:1,clump:0},
        {name:'Spikes - Down',interval:{x:[10,0],y:[10,2]},slice:1,clump:0},
        {name:'Spikes - Left',interval:{x:[10,-2],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Right',interval:{x:[10,2],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 1',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Flower',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Collapsing - 0',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Dash Crystal',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},

        {name:'Spring - Up',interval:{x:[10,0],y:[5,0]},slice:1,clump:0},//10
        {name:'Spring - Down',interval:{x:[10,0],y:[5,0]},slice:1,clump:0},
        {name:'Spring - Left',interval:{x:[5,0],y:[10,0]},slice:1,clump:0},
        {name:'Spring - Right',interval:{x:[5,0],y:[10,0]},slice:1,clump:0},
        {name:'Winged Flower',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Semisolid',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Crystal',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Stone - 1 - Back',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Semisolid - L',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Semisolid - R',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},

        {name:'Bumper',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},//20
        {name:'Stone - 2',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 2 - Snow',interval:{x:[10,0],y:[10,0]},slice:1,clump:1},
        {name:'Green Bubble',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Double Dash Crystal',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Lock Switch',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Lock Block',interval:{x:[10,0],y:[10,0]},slice:1,clump:2},
        {name:'Stone - 2 - Back',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Downward Winged Flower',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Airway',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},

        {name:'Shifter',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},//30
        {name:'Ice Crystal',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Ice Spawner',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},

    ]
}
stage={scene:'menu',scale:0}
menu={scene:0,transition:0,sceneAnim:[0,0],select:-1,selectAnim:[0,0,0],levelPos:[[600,540],[360,420],[780,300]],playerAnim:[0,0]}
game={level:2,zone:0,progress:{zone:0},time:0,player:{size:1},edge:{x:0,y:0},spawn:{x:0,y:0},connections:[],previous:{zone:0},scroll:{x:0,y:0},players:[0],flowers:0,deaths:0,running:{flowers:0,deaths:0},loadPlan:0,levelData:[]}
physics={gravity:0.5,friction:{x:0.96,y:0.995},resistance:{x:0.84,y:0.99}}
view={scroll:{x:0,y:0,anim:0},zoom:1,goal:{scroll:{x:0,y:0}},previous:{scroll:{x:0,y:0}}}
elements={flower:{anim:0,timer:0}}
entities={walls:[[],[]],players:[],reserve:[],uis:[]}
run={fore:[],over:[]}
transition={trigger:false,anim:0,scene:stage.scene}
graphics={main:0,backgrounds:[],scenes:[],walls:[],players:[]}
inputs={
    keys:[
        [false,false,false,false,false,false,false,false],
        [false,false,false,false,false,false,false,false]
    ],validKey:[true,true,true,true,true,true,true,true],
mouse:{x:0,y:0},rel:{x:0,y:0},pMouse:{x:0,y:0},pRel:{x:0,y:0}}
options={defaultDash:false}
dev={editor:false,hitbox:false,edge:false,connection:false,markspawn:false,freecam:false,infinitedash:false,invincible:false,nograv:false,debound:false,noplayer:false}