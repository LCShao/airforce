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

// 2. 游戏运行阶段
// 2.1 绘制我方飞机
// 2.1.1 加载我方飞机的正常图片
var heros = [];
heros[0] = new Image();
heros[0].src = "../images/hero1.png";
heros[1] = new Image();
heros[1].src = "../images/hero2.png";
// 2.1.2 定义我方飞机对象
//集中保存宽高，位置，正在使用哪张图片: 
var hero={
  width:99, height:124,
  x: (WIDTH-99)/2, y: HEIGHT-150,
  framei:0, 
  isBroken:false,
  //定义绘制自己的方法: 
  //如果没有撞机，就在heros数组中两种图间切换
  //否则如果撞机，就在hBlowups数组中依次选择每张撞机图片绘制
    //如果hBlowups中图片播放完，可修改自己的状态为正常，并回复正常图片
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

// 2.1.3 加载我方飞机爆炸的图片
var hBlowups=[];
hBlowups[0] = new Image();
hBlowups[0].src = "../images/hero_blowup_n1.png";
hBlowups[1] = new Image();
hBlowups[1].src = "../images/hero_blowup_n2.png";
hBlowups[2] = new Image();
hBlowups[2].src = "../images/hero_blowup_n3.png";
hBlowups[3] = new Image();
hBlowups[3].src = "../images/hero_blowup_n4.png";

// 2.1.4 绘制运行阶段的一切
function paintRUNNING(){
  paintBG();//先绘制背景动画
  hero.paint(); //再绘制前景主角飞机动画
}

function paint(){
  switch(state){
    case 0://START
      paintStart();
      break;
    // 2.1.5 在paint中添加绘制RUNNING阶段一起的方法
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
  },50);
}

// 在最后，为canvas添加单击事件，从START状态切换为RUNNING状态
cv.onclick=e=>{
  if(state==START)
    state=RUNNING;
}
