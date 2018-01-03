
		// 增加射击的方法
		this.shoot = function(){
			this.time++;
			if(this.time%3 == 0){
				bullets.push(new Bullet(BULLET));
			}
		}


	// 3.1.5 为<canvas>绑定onmousemove事件
	canvas.onmousemove = function(event){
		if(state == RUNNING){
			// event.pageX/clientX/offsetX/x
			var x = event.offsetX;
			var y = event.offsetY;
			// 修改我方飞机的坐标值
			hero.x = x - hero.width/2;
			hero.y = y - hero.height/2;
		}
	}
	

	
	
	
	// 3.4 创建函数 - 用于检查撞击情况
	function hitEnemies(){
		for(var i=0;i<enemies.length;i++){
			// 我方飞机撞击敌方飞机
			if(enemies[i].checkHit(hero)){
				// 处理敌方飞机撞击后的逻辑
				enemies[i].bang();
				// 处理我方飞机撞击后的逻辑
				hero.bang();
			}
			
		}
	}
	
	// 4 游戏暂停阶段
	canvas.onmouseover = function(){
		// 从暂停恢复到运行
		if(state == PAUSE){
			state = RUNNING;
		}
	}
	canvas.onmouseout = function(){
		// 从运行切换到暂停
		if(state == RUNNING){
			state = PAUSE;
		}
	}
	var pause = new Image();
	pause.src = "images/game_pause_nor.png";
	
	

	// 定义游戏的核心控制器
	setInterval(function(){
		// 1 绘制背景图片
		sky.paint();
		// 2 控制背景运动
		sky.step();
		switch (state){
			case START:
				// 3 绘制logo图片
				context.drawImage(logo,20,0);
				break;
			case STARTTING:
				// 绘制动画效果
				loading.paint();
				// 切换动画图片
				loading.step();
				break;
			case RUNNING:
				// 绘制我方飞机
				hero.paint();
				// 我方飞机动画
				hero.step();
				// 我方飞机的射击
				hero.shoot();
				// 绘制子弹
				bulletsPaint();
				// 移动子弹
				bulletsStep();
				// 删除子弹
				bulletsDel();
				// 创建敌方飞机
				enterEnemies();
				// 绘制敌方飞机
				paintEnemies();
				// 控制敌方飞机运动
				stepEnemies();
				// 删除敌方飞机
				delEnemies();
				// 检查是否被撞击
				hitEnemies();
				// 绘制得分与生命值
				paintText();
				break;
			case PAUSE:
				hero.paint();
				bulletsPaint();
				paintEnemies();
				paintText();
				context.drawImage(pause,10,10);
				break;
			case GAMEOVER:
				hero.paint();
				bulletsPaint();
				paintEnemies();
				paintText();
				paintOver();
				break;
		}
	},100);

// 