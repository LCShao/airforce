// 3.2 绘制子弹
// 3.2.1 加载子弹的图片
var bullet = new Image();
bullet.src = "../images/bullet1.png";
//天上飞着多个子弹，需要反复创建，所以建立class
class Bullet{
  constructor(){
    this.img = bullet;
    this.width = 9;
    this.height = 21;
    // 子弹发射的位置为英雄机上方中间位置
    this.x = hero.x + hero.width/2 - this.width/2;
    this.y = hero.y - this.height - 10;
    
    this.canDelete = false;
  }
  // 绘制方法
  paint(){
    pen.drawImage(this.img,this.x,this.y);
  }
  // 运动方法
  step(){
    this.y-=10;
  }
  // 新增方法 - 用于处理撞击后的逻辑
  bang(){
    this.canDelete = true;
  }
}

// 3.2.4 创建存储子弹的数组
var bullets = [];
// 3.2.5 创建函数,用于绘制所有子弹
function paintBullets(){
  for(var i=0;i<bullets.length;i++){
    bullets[i].paint();
  }
}
// 3.2.6 创建函数,用于控制所有子弹运动
function bulletsStep(){
  for(var i=0;i<bullets.length;i++){
    bullets[i].step();
  }
}
// 3.2.7 当子弹移动到画布之外时,删除该子弹
function bulletsDel(){
  for(var i=0;i<bullets.length;i++){
    // 判断子弹的y值 < -子弹高度
    if(bullets[i].y < -bullets[i].height || bullets[i].candel){
      bullets.splice(i,1);
    }
  }
}