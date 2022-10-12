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
