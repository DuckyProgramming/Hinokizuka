types={
    wallList:[
        {name:'Stone - 0',elements:[1]},
        {name:'Stone - 1',elements:[6,17]},
        {name:'Stone - 2',elements:[21,22,27]},
        {name:'Stone - 3',elements:[34,35,36]},
        {name:'Stone - 4',elements:[42,43,44]},
        {name:'Stone - 5',elements:[56,57,58]},
        {name:'Spikes - 1',elements:[2,3,4,5]},
        {name:'Spikes - 2',elements:[37,38,39,40]},
        {name:'Spikes - 3',elements:[52,53,54,55]},
        {name:'Spikes - 4',elements:[61,62,63,64]},
        {name:'Semisolid',elements:[15,18,19]},
        {name:'Flower',elements:[7,14,28]},
        {name:'Dash Crystal',elements:[9,24,48]},
        {name:'Deadly Crystal',elements:[16,45]},
        {name:'Collapsing',elements:[8]},
        {name:'Spring',elements:[10,11,12,13]},
        {name:'Bumper',elements:[20,41]},
        {name:'Bubble',elements:[23]},
        {name:'Mobile Block',elements:[29,30,31]},
        {name:'Ice Crystal',elements:[32,49,33,50]},
        {name:'Lock',elements:[25,26]},
        {name:'Ice Elements',elements:[46,47,51]},
        {name:'Composite',elements:[59]},
    ],wall:[
        {name:'Empty',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},//0
        {name:'Stone - 0',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Up - 1',interval:{x:[10,0],y:[10,-2]},slice:1,clump:0},
        {name:'Spikes - Down - 1',interval:{x:[10,0],y:[10,2]},slice:1,clump:0},
        {name:'Spikes - Left - 1',interval:{x:[10,-2],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Right - 1',interval:{x:[10,2],y:[10,0]},slice:1,clump:0},
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
        {name:'Crystal - 2',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
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
        {name:'Airway',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},

        {name:'Pushable',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},//30
        {name:'Switcher',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Ice Crystal',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Ice Spawner',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Stone - 3',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 3 - Snow',interval:{x:[10,0],y:[10,0]},slice:1,clump:1},
        {name:'Stone - 3 - Back',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Spikes - Up - 2',interval:{x:[10,0],y:[10,-2]},slice:1,clump:0},
        {name:'Spikes - Down - 2',interval:{x:[10,0],y:[10,2]},slice:1,clump:0},
        {name:'Spikes - Left - 2',interval:{x:[10,-2],y:[10,0]},slice:1,clump:0},

        {name:'Spikes - Right - 2',interval:{x:[10,2],y:[10,0]},slice:1,clump:0},//40
        {name:'Red Bumper',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 4',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 4 - Snow',interval:{x:[10,0],y:[10,0]},slice:1,clump:1},
        {name:'Stone - 4 - Back',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Crystal - 4',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Ice Collapsing',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Ice Switch',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Golden Crystal',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Reverse Ice Crystal',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},

        {name:'Reverse Ice Spawner',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},//50
        {name:'Ice Switch Block',interval:{x:[10,0],y:[10,0]},slice:1,clump:2},
        {name:'Spikes - Up - 3',interval:{x:[10,0],y:[10,-2]},slice:1,clump:0},
        {name:'Spikes - Down - 3',interval:{x:[10,0],y:[10,2]},slice:1,clump:0},
        {name:'Spikes - Left - 3',interval:{x:[10,-2],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Right - 3',interval:{x:[10,2],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 5',interval:{x:[10,0],y:[10,0]},slice:1,clump:0},
        {name:'Stone - 5 - Snow',interval:{x:[10,0],y:[10,0]},slice:1,clump:1},
        {name:'Stone - 5 - Back',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},
        {name:'Steel Line - L',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},

        {name:'Steel Line - R',interval:{x:[10,0],y:[10,0]},slice:0,clump:0},//60
        {name:'Spikes - Up - 4',interval:{x:[10,0],y:[10,-2]},slice:1,clump:0},
        {name:'Spikes - Down - 4',interval:{x:[10,0],y:[10,2]},slice:1,clump:0},
        {name:'Spikes - Left - 4',interval:{x:[10,-2],y:[10,0]},slice:1,clump:0},
        {name:'Spikes - Right - 4',interval:{x:[10,2],y:[10,0]},slice:1,clump:0},
    ]
}
stage={scene:'menu',scale:0}
menu={scene:0,transition:0,sceneAnim:[0,0],select:-1,selectAnim:[0,0,0,0,0],levelPos:[[600,540],[300,450],[810,360],[480,270],[660,180]],playerAnim:[0,0]}
game={level:5,zone:1,progress:{zone:0},time:0,player:{size:1},
edge:{x:0,y:0},spawn:{x:0,y:0},scroll:{x:0,y:0},wind:{x:0,y:0},iceSwitch:0,
connections:[],previous:{zone:0},players:[0],flowers:0,deaths:0,running:{flowers:0,deaths:0},loadPlan:0,levelData:[]}
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