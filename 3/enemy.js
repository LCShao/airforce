/*****************定义敌方2种飞机的类型*******************/
//加载两种飞机所需图片
var enemy1 = [];// 小飞机
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

// 初始化两种敌方飞机的数据
var ENEMY1 = {
	imgs : enemy1, //小飞机正常图片和爆炸图片列表
	width : 57,  height : 51, //小飞机大小
	type : 1, //飞机类型
	framei : 0, //当前使用的图片的下标
	life : 1, //生命次数
	score : 1  //分值
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

//  因为天上可能飘着很多架敌机，说明可能需要批量创建子对象，此时就要创建class
class Enemy{
						//这里使用解构的语法，减少代码量
  constructor({imgs,width,height,type,framei,life,score}){
		this.imgs = imgs;
		this.width = width; this.height = height;
		this.type = type;
		this.framei = framei;
		this.life = life;	this.score = score;
		// 定义绘制敌方飞机的坐标值
		// 水平方向上随机
		this.x = Math.random() * (WIDTH - this.width);// 0 - (画布宽-飞机宽)
		// 垂直方向上，都从canvas顶部上方隐藏处，开始下落
		this.y = -this.height;
		this.isBroker=false;//是否撞坏
		this.canDelete=false;//是否可删除
	}
	paint(){//定义每架敌机绘制自己的方法
		pen.drawImage(this.imgs[this.framei],this.x,this.y);
	}
	// 运动方法
	step(){
		if(!this.isBroken){//正常下落
			this.y+=2;//每次y落2
		}else{// 撞坏
			this.framei++; //切换爆炸图片
			//图片切换完，说明可以删除了
			if(this.framei == this.imgs.length){
				this.canDelete = true;
			}
		}
	}
}
//	定义数组，保存所有敌机
var enemies=[];
//	定义函数，让飞机进入界面中
function enterEnemies(){
	//强调: 这里使用百分比，控制敌机出现的频率
	//100个数中取一个随机
	var rand = Math.floor(Math.random()*100);
	if(rand <= 8){//只有随机数<8时，才生成小飞机，说明不是每次都生成
		// 小飞机
		enemies.push(new Enemy(ENEMY1));
	}else if(rand <=10){//随机数>=8且<=10时，才生成中飞机，频率就更少
		// 中飞机
		enemies.push(new Enemy(ENEMY2));
	}
}
// 定义函数，遍历并让敌机绘制自己
function paintEnemies(){
	for(var i=0;i<enemies.length;i++){
		enemies[i].paint();
	}
}
// 让每架敌机下落一步
function stepEnemies(){
	for(var i=0;i<enemies.length;i++){
		enemies[i].step();
	}
}
// 遍历，删除那些超出范围，或撞坏的飞机
function delEnemies(){
	for(var i=0;i<enemies.length;i++){
		// 敌方飞机的y值 > 画布的高度
		if(enemies[i].y > HEIGHT||enemies[i].canDelete){
			enemies.splice(i,1);
		}
	}
}
