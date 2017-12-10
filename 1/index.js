// 前提: 获得画布和画笔
var cv = document.getElementById("cv");
var pen = cv.getContext("2d");
// 0 游戏初始化
// 0.1 4种状态
const START = 0;		// 开始
const RUNNING = 1;		// 运行中
const PAUSE = 2;		// 暂停
const GAMEOVER = 3;		// 结束
// 0.2 当前状态
var state = START;
// 0.3 设置当前画布的高度和宽度
var WIDTH = 480, HEIGHT = 650;
cv.width=WIDTH; cv.height=HEIGHT;
// 0.4 游戏得分
var score = 0;
// 0.5 我方飞机的生命次数
var life = 3;

// 1. 绘制欢迎界面: 欢迎界面背景循环滚动，其实是两个背景图片收尾相接实现
// 1.1 加载背景图片
var bg = new Image();
bg.src = "../images/background.png";
// 保存背景图片高度
const BG_HEIGHT=852;
// 初始化两个背景图片在开始时的y坐标
var bgs_y = [ 0, -BG_HEIGHT];
// 定义绘制背景图片的方法
function paintBG(){
  pen.drawImage(bg,0,bgs_y[0]);
  pen.drawImage(bg,0,bgs_y[1]);
}

// 1.2 加载LOGO图片
var logo = new Image();
logo.src = "../images/start.png";
const LOGO_WIDTH=400;

// 1.3 汇总绘制欢迎页面的方法
function paintStart(){
  paintBG();
  pen.drawImage(logo,(WIDTH-LOGO_WIDTH)/2,0);
}

// 1.4 汇总绘制各个状态一切内容的方法
function paint(){
  switch(state){
    case 0://START
      paintStart();
      break;
  }
}

// 1.5 定义背景图片移动一次的方法
function step(){
  // 让两张图片同时下落一步
  bgs_y[0]++;
  bgs_y[1]++;
  // 判断两张图片y坐标的临界点，如果到了临界点，就回到-BG_HEIGHT
  bgs_y[0]==BG_HEIGHT&&(bgs_y[0]=-BG_HEIGHT);
  bgs_y[1]==BG_HEIGHT&&(bgs_y[1]=-BG_HEIGHT);
}

// 1.6 页面加载后，启动定时器，反复下落，并重绘一切
var timer=null;
window.onload=()=>{
  paintStart();//先调一次，是为了防止定时器首屏空白
  timer=setInterval(()=>{
    step();
    paint();
  },50);
}
