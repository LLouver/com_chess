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
