# com_chess - 计科导大作业1

## stuff

小组成员：朱永祥 毛宇录 王胤杰 田翔宇 向明阳

核心js代码：毛宇录 王胤杰 田翔宇 向明阳

控制与联机js代码：朱永祥

html5框架：朱永祥 毛宇录

css样式与美工：朱永祥 毛宇录 王胤杰

图片资源：毛宇录 王胤杰 田翔宇

音乐音效资源：朱永祥  

内网穿透： 田翔宇  朱永祥

## 项目介绍

### 国际象棋简介

完整教程[戳这里](https://www.chess.com/lessons)

合法且唯一合法的开局摆法[戳这里](http://www.laomaozy.com/uploads/allimg/202106/15422.jpg)

### 全局变量-global

```js
//游戏唯一识别id
let gameId = '0';
//记录双方的名字
let playerName=['null','null'];
//记录是否是host
let isHost=0;
//记录双方准备状况
let ready=[0,0];
//记录游戏是否已经开始
let started=0;
//记录现在是不是自己的回合，能不能移动棋子
let movable=0;
//记录局面
let gameSitu=[];
//辅助数组，用于标记各种被攻击，可走到的位置。
let attackInfo=[];
//辅助数组，用于标记各种被攻击，可走到的位置。
let moveInfo=[];
//表示游戏者方向，1白0黑
let side=1;
//表示当前选中的棋子坐标，[0,0]表示没选
let chosenPiece=[];
//表示决定去哪
let chosenToGo=[];
//表示局时
let restTime=[90,90];
//表示步时
let stepTime=20;
//计时器
let counting;
let delaying;
//标记过路兵
let passant={x:0,y:0};
//王车是否移动过
let isMoved={bk:0,br1:0,br8:0,wk:0,wr1:0,wr8:0};
```
### 全局变量说明

#### 基本约定
```txt
颜色 : 1-白-White-w /0-黑-Black-b

棋子 王-King-k 后-Queen-q 车-Rook-r 马-kNight-n 象-Bishop-b 兵-Pawn-p
```
#### gameSitu[] []-棋盘局面

```txt
从[1][1]到[8][8]，第一维代表行数，第二维代表列数，根据双方角色不同，实际可能要旋转180度
8 br bn bb bq bk bb bn br
7 bp bp bp bp bp bp bp bp
....
2 wp wp wp wp wp wp wp wp
1 wr wn wb wq wk wb wn wr
  1  2  3  4  5  6  7  8
统一用小写
```

### 通讯指令-command
```txt
/host id name side 
    //主持一局游戏，id为游戏唯一识别编号
/join id name
	//加入一局游戏，id为游戏唯一识别编号
/accept id name side
	//同意某人加入，并指定他的side
//只有id匹配才执行下面的指令
/setTime id global step
    //设置局时、步时分别为global s，step s
/ready id side b
    //side:1白0黑 b:1-准备/0-取消准备
/end id info
    //游戏结束，1-白胜 0-黑胜 e-平 info:(0：将杀 1：认输 2：超时)
/move id lx ly cx cy side info
	//side将一个棋子由lx,ly移动到cx,cy,同时伴随着info的升变（无升变则为空）	
```

## HTML5页面

``` html
<!DOCTYPE html>
<html lang="en" >
<head>
	<meta charset="UTF-8">
	<title>Chess</title>
	<script>
		<!-- 在此处引入全局变量 -->
	</script>
</head>

<body style="background-color: #312e2b">

    <!-- mainboard，游戏主区域 -->
<div id="mainBoard" hidden></div>

    <!-- inputBlock，输入房间和玩家信息区域 -->
<div id="inputBlock" class="box" hidden = "hidden"></div>

    <!-- timeSettingBlock，输入时间设定区域 -->
<div id="timeSettingBlock" class="box" hidden = "hidden"></div>

    <!-- chooseBlock，输入执棋颜色（白/黑）区域 -->
<div id="chooseBlock" class="box" hidden></div>
	
    <!-- upgradeBlock，指定升变棋子区域 -->
<div id="upgradeBlock" class="box" hidden></div>

    <!-- buttonsList，准备、设置时间等按钮区域 -->
<div id="buttonsList"></div>

    <!-- timing，等待时css沙漏动画区域 -->
<div id="timing" hidden></div>

    <!-- 资源文件区域，加载各种图片与音频 -->
<div hidden>
</div>

<script>
    <!-- 浏览器页面初始化代码 -->
</script>

</body>
</html>
```

### js代码
```js
	<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
//jquery库引入
	</script>

	<script type="text/javascript" src="src/js/main.js">
//main.js 主要控制函数
	</script>

	<script type="text/javascript" src="src/js/style.js">
//style.js 根据浏览器大小改变样式的函数
	</script>

	<script type="text/javascript" src="src/js/command.js">
//command.js 收到各指令执行的函数
	</script>

	<script type="text/javascript" src="src/js/piece.js">
//piece.js 为html页面添加、删除棋子的函数
	</script>

	<script type="text/javascript" src="src/js/commandAnalysis.js">
//commandAnalysis.js 解析服务器送达的指令并执行指令的函数
	</script>

	<script type="text/javascript" src="src/js/socket.js">
//socket.js 连接Tomcat webservlet 的函数
	</script>

	<script type="text/javascript" src="src/js/chessGame.js">
//chessGame.js 国际象棋游戏核心代码
	</script>

	<script type="text/javascript" src="src/js/animation.js">
//animation.js 棋子移动等动画函数
	</script>

	<script type="text/javascript" src="src/js/timer.js">
//timer.js 计时器控制函数
	</script>

	<script type="text/javascript" src="src/js/debug.js">
//debug.js 用于debug时输出调试信息的函数，现已无内容
	</script>
