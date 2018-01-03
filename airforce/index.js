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
  time:0,
  paint(){
    if(!this.isBroken){
      pen.drawImage(heros[this.framei],this.x,this.y);
      this.framei=Number(!this.framei);
    }else{
      pen.drawImage(hBlowups[this.framei],this.x,this.y);
      this.framei++
      //如果爆炸完成后
      if(this.framei==hBlowups.length){
        state==RUNNING&&life--;//生命次数-1
        if(life == 0){//如果生命次数为0
          state = GAMEOVER; //则游戏结束
          this.framei = hBlowups.length-1; //结束画面停留在爆炸最后一帧
        }else{//如果生命次数不为0，则我方飞机恢复原样，原位置。
          this.x=(WIDTH-99)/2,this.y=HEIGHT-150,
          this.framei=0, 
          this.isBroken=false;
        }
      }
    }
  },
  bang(){
    this.isBroken = true;
  },
  // 定义英雄机发射子弹的算法
  shoot(){//强调: 需要一个属性time作为计数器，控制子弹发射的速度。
    this.time++;
    if(this.time%5 == 0){//定时器每走5次，才发射一次子弹。也就是一秒钟，2发。
      bullets.push(new Bullet());
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
  hero.shoot();
  paintBullets();
  bulletsStep();
  bulletsDel();
  enterEnemies();
  paintEnemies();
  stepEnemies();
  delEnemies();
  hitEnemies();
  paintText()
}

// 绘制GAMEOVER文本
function paintOver(){
  paintBG();
  hero.paint();
  paintEnemies();
  pen.font = "bold 48px 微软雅黑";
  pen.fillText("GAME OVER",100,320);
}

function paint(){
  switch(state){
    case START://START
      paintStart();
      break;
    case RUNNING://RUNNING
      paintRUNNING();
      break;
    case PAUSE:
      hero.paint();
      paintBullets();
      paintEnemies();
      paintText();
      cv.drawImage(pause,10,10);
      break;
    case GAMEOVER:
      paintOver();
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

// 3.1.5 为<canvas>绑定onmousemove事件
cv.onmousemove = e=>{
  if(state == RUNNING){
    var x = e.offsetX;
    var y = e.offsetY;
    // 修改我方飞机的坐标值
    hero.x = x - hero.width/2;
    hero.y = y - hero.height/2;
  }
}
cv.addEventListener("touchmove",e=>{
  if(state == RUNNING){
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    // 修改我方飞机的坐标值
    hero.x = x - hero.width/2;
    hero.y = y - hero.height/2;
  }
},false)
var pause = new Image();
pause.src = "../images/game_pause_nor.png";
// 4 游戏暂停阶段
cv.onmouseover = function(){
  // 从暂停恢复到运行
  if(state == PAUSE){
    state = RUNNING;
  }
}
cv.onmouseout = function(){
  // 从运行切换到暂停
  if(state == RUNNING){
    state = PAUSE;
  }
}
