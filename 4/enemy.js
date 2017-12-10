var enemy1 = [];
	enemy1[0] = new Image();
	enemy1[0].src = "../images/enemy1.png";
	enemy1[1] = new Image();
	enemy1[1].src = "../images/enemy1_down1.png";
	enemy1[2] = new Image();
	enemy1[2].src = "../images/enemy1_down2.png";
	enemy1[3] = new Image();
	enemy1[3].src = "../images/enemy1_down3.png";
	enemy1[4] = new Image();
	enemy1[4].src = "../images/enemy1_down4.png";
var enemy2 = [];// 中飞机
	enemy2[0] = new Image();
	enemy2[0].src = "../images/enemy2.png";
	enemy2[1] = new Image();
	enemy2[1].src = "../images/enemy2_down1.png";
	enemy2[2] = new Image();
	enemy2[2].src = "../images/enemy2_down2.png";
	enemy2[3] = new Image();
	enemy2[3].src = "../images/enemy2_down3.png";
	enemy2[4] = new Image();
	enemy2[4].src = "../images/enemy2_down4.png";

var ENEMY1 = {
	imgs : enemy1, 
	width : 57,  height : 51, 
	type : 1, 
	framei : 0,
	life : 1, 
	score : 1 
}
var ENEMY2 = {
	imgs : enemy2,
	width : 69,
	height : 95,
	type : 2,
	framei : 0,
	life : 3,
	score : 3
}

class Enemy{
  constructor({imgs,width,height,type,framei,life,score}){
		this.imgs = imgs;
		this.width = width; this.height = height;
		this.type = type;
		this.framei = framei;
		this.life = life;	this.score = score;
		this.x = Math.random() * (WIDTH - this.width);
		this.y = -this.height;
		this.isBroker=false;
		this.canDelete=false;
	}
	paint(){
		pen.drawImage(this.imgs[this.framei],this.x,this.y);
	}
	step(){
		if(!this.isBroken){
			this.y+=2;
		}else{
			this.framei++;
			if(this.framei == this.imgs.length){
				this.canDelete = true;
			}
		}
	}
	// 定义用于检查敌机是否被撞击的方法
	// 有可能被主角撞击，也有可能被将来的子弹撞击，所以，我们添加参数wo
	// 参数wo 将来传入的可能是- 1)我方飞机;2)子弹
	checkHit(wo){
		//碰撞检测算法: 
		return wo.y + wo.height > this.y
		&& wo.x + wo.width > this.x
		&& wo.y < this.y + this.height
		&& wo.x < this.x + this.width;
	}
	// 新增方法bang() - 用于被撞击后的逻辑
	bang(){
		this.life--;//敌机生命值-1
		if(this.life == 0){ //如果生命值为0，则标记为可删除
			this.canDelete = true;
			score += this.score; //并将得分加入总分
		}
	}
}

var enemies=[];
function enterEnemies(){
	var rand = Math.floor(Math.random()*100);
	if(rand <= 8){
		enemies.push(new Enemy(ENEMY1));
	}else if(rand <=10){
		enemies.push(new Enemy(ENEMY2));
	}
}
function paintEnemies(){
	for(var i=0;i<enemies.length;i++){
		enemies[i].paint();
	}
}
function stepEnemies(){
	for(var i=0;i<enemies.length;i++){
		enemies[i].step();
	}
}
function delEnemies(){
	for(var i=0;i<enemies.length;i++){
		if(enemies[i].y > HEIGHT||enemies[i].canDelete){
			enemies.splice(i,1);
		}
	}
}
// 创建函数遍历，并对每个敌机检测碰撞
function hitEnemies(){
	for(var i=0;i<enemies.length;i++){
		// 判断每个敌机，是否与我方飞机相撞
		if(enemies[i].checkHit(hero)){
			// 处理敌方飞机撞击后的逻辑
			enemies[i].bang();
			// 处理我方飞机撞击后的逻辑
			hero.bang();
		}
	}
}
// 3.5 绘制游戏得分与我方飞机的生命值
function paintText(){
	pen.font = "bold 24px 微软雅黑";
	pen.fillText("SCORE: "+score,10,30);
	pen.fillText("LIFE: "+life,390,30);
}
