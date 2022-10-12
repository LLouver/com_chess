# 棋盘

```js
从[1][1]到[8][8]，第一维代表行数，第二维代表列数，根据双方角色不同，实际可能要旋转180度
```

<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F46251981%2F028b120f917749339f0e531a827e470d.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDYyNTE5ODEvMDI4YjEyMGY5MTc3NDkzMzlmMGU1MzFhODI3ZTQ3MGQuanBn%2Fsign%2F697c633bbcf3565667aa4d0832c8dd18.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668157576&t=ecb47aeff75aa12f23b6df53fa95f4ce" />

```java
/host id
    //主持一局游戏，id为游戏唯一识别编号
//只有id匹配才执行下面的指令
/settime id 200 30 
    //设置局时、步时分别为200s，30s
/ready id b 1
    //side:1白0黑 b:1-准备/0-取消准备
/begin id 
    //比赛开始
/end id e info
    //游戏结束，1-白胜 0-黑胜 e-平 info:(0：将杀 1：认输 2：超时)

    

```

### style.js

```js
//style.js
//动态样式的操作函数
"use strict";
//改变窗口的大小，对应改变棋盘大小
function resetBorderSize(width,height){}
```



### main.js

```js
//main.js
//html操作，调用内部操作，同时修改html元素
"use strict";
//显示一个局面,对棋盘上64个div修改
function showSituation(situation){}

//显示/隐藏时间设置框，隐藏时发送/settime
function showTimeSetting(swi){}

//指定某方获得胜利和获胜理由
function end(side,reason){}

//轮到自己回合，开始倒计时
function myTurn(){}

//玩家进行了一步合法行棋，执行相应的动画，画动画，同时加上相应步时
function mymove(lx,ly,cx,cy){}

//无论是鼠标还是键盘操作都要发送move和turn指令
//鼠标点击了一个位置，表示选中一个棋子或移动到一个位置，
function clickEvent(lx,ly,cx,cy){}

//将一个元素拖到了一个位置
function dragEvent(lx,ly,cx,cy){}

```

### command.js

```js
//command.js
//收到各指令对应函数
"use strict";
//设置游戏id
function host(id){}

//准备/取消准备，发送/ready
//如果双方都准备，游戏开始标记设为true并发送/begin
function setReady(swi){}

//设置开始标志并且激活白方走棋
function begin(){}

//设置开始标志并重置比赛
function end(){}

//收到移动指令（对方），画出动画，判定胜负，如果继续则将走棋标记设为true,执行自己回合的函数
function move(lx,ly,cx,cy){}

```

### chessGame.js

``` js
//chessGame.js
//内部操作
"use strict";
//选定了一个棋子，标出他能走到的格子和能攻击的格子
function markValid(situation,board,piece){}

//标记出被某方棋子攻击的所有格子，包括被国王攻击
/*调用markValid*/
function markAttack(situation,board,side){}

//检查某一步棋是否合法（不仅不能走到其它格子，而且不能送将）
/*调用markAttack*/
function invalidMove(situation,board,piece,x,y){}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation,side){}

//检查某方是否将军（A将军，B被将军
/*调用markAttack*/
function isCheck(situation,side){}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation,side){}


```

