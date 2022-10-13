//command.js
//收到各指令对应函数
"use strict";
//设置游戏id
function host(id,sideChose){
    gameId=id;
    side=sideChose;
}

//准备/取消准备，发送/ready
//如果双方都准备，游戏开始标记设为true并发送/begin
function setReady(s,swi){
    ready[s]=swi;
    if(ready[0] && ready[1]){
        request();//启动游戏
    }
}

//设置开始标志并且激活白方走棋
function begin(){
    started=1;
    ready[0]=ready[1]=0;
    if(side===1){
        movable=1;
    }
}

//设置开始标志并重置比赛
function end(){
    started=0;
    side=side^1;//交换黑白方
}

//收到移动指令（对方），画出动画，判定胜负，如果继续则将走棋标记设为true,执行自己回合的函数
function move(lx,ly,cx,cy){
    drawAnimation(lx,ly,cx,cy);
    movable=1;
    if(isEven()){

    }
    else if(isCheck()){
        if(isCheckmate()){

        }else{

        }
    }
}

function sendReadyRequest(){
    request();//发送请求
}
