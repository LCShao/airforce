var cv = document.getElementById("cv"), pen = cv.getContext("2d");

const START = 0, RUNNING = 1, PAUSE = 2, GAMEOVER = 3;
var state = START;

var WIDTH = 480, HEIGHT = 650;
cv.width=WIDTH; cv.height=HEIGHT;

var score = 0, life = 3;

var bg = new Image();
bg.src = "../images/background.png";
const BG_HEIGHT=852;
var bgs_y = [ 0, -BG_HEIGHT];

function paintBG(){
  pen.drawImage(bg,0,bgs_y[0]);
  pen.drawImage(bg,0,bgs_y[1]);
}

var logo = new Image();
logo.src = "../images/start.png";
const LOGO_WIDTH=400;

function paintStart(){
  paintBG();
  pen.drawImage(logo,(WIDTH-LOGO_WIDTH)/2,0);
}

var heros = [];
heros[0] = new Image();
heros[0].src = "../images/hero1.png";
heros[1] = new Image();
heros[1].src = "../images/hero2.png";

var hero={
  width:99, height:124,
  x: (WIDTH-99)/2, y: HEIGHT-150,
  framei:0, 
  isBroken:false,
  paint(){
    if(!this.isBroken){
      pen.drawImage(heros[this.framei],this.x,this.y);
      this.framei=Number(!this.framei);
    }else{
      pen.drawImage(hBlowups[this.framei],this.x,this.y);
      this.framei++
      if(this.framei==hBlowups.length){
        this.isBroken=false;
        this.framei=0;
      }
    }
  }
}

var hBlowups=[];
hBlowups[0] = new Image();
hBlowups[0].src = "../images/hero_blowup_n1.png";
hBlowups[1] = new Image();
hBlowups[1].src = "../images/hero_blowup_n2.png";
hBlowups[2] = new Image();
hBlowups[2].src = "../images/hero_blowup_n3.png";
hBlowups[3] = new Image();
hBlowups[3].src = "../images/hero_blowup_n4.png";

function paintRUNNING(){
  paintBG();
  hero.paint(); 
  // 创建敌方飞机
  enterEnemies();
  // 绘制敌方飞机
  paintEnemies();
  // 控制敌方飞机运动
  stepEnemies();
  // 删除敌方飞机
  delEnemies();
}

function paint(){
  switch(state){
    case 0://START
      paintStart();
      break;
    case 1://RUNNING
      paintRUNNING();
      break;
  }
}

function step(){
  bgs_y[0]++;
  bgs_y[1]++;
  bgs_y[0]==BG_HEIGHT&&(bgs_y[0]=-BG_HEIGHT);
  bgs_y[1]==BG_HEIGHT&&(bgs_y[1]=-BG_HEIGHT);
}

var timer=null;
window.onload=()=>{
  paintStart();
  timer=setInterval(()=>{
    step();
    paint();
  },100);
}

cv.onclick=e=>{
  if(state==START)
    state=RUNNING;
}
