//command.js
//收到各指令对应函数
"use strict";
//设置游戏id
function host(id,name,sideChose){
    gameId=id;
    side=sideChose;
    playerName[side]=name;
    isHost=1;
    document.getElementById('selfPlayer').innerHTML=name;
}

function join(id,name){
    console.log("someone joined!");
    if(isHost){
        doRequest("/accept " + gameId + ' ' + playerName[side] + ' ' + (side^1));
        playerName[side^1]=name;
    }
    document.getElementById('mainBoard').hidden=false;
    showMainBoard();
    showPlayerName();
}

function accept(name,sideChose){
    console.log(name+sideChose);
    if(!isHost){
        side=sideChose;
        playerName[side^1]=name;
        console.log("modified");
    }
    showJoinBoard(0);
    document.getElementById('mainBoard').hidden=false;
    console.log(playerName);
    showPlayerName();
    showMainBoard();
}

//准备/取消准备，发送/ready
//如果双方都准备，游戏开始标记设为true并发送/begin
function setReady(s,swi){
    ready[s]=swi;
    if(ready[0] && ready[1]){
        doRequest('/begin ' + gameId);//启动游戏
    }
}

//设置时间
function setTime(a,b){

}

//设置开始标志并且激活白方走棋
function begin(){
    started=1;
    ready[0]=ready[1]=0;
    if(side===1){
        movable=1;
    }
    initSituation(gameSitu);
    console.log(gameSitu);
    showSituation(gameSitu);
}

//设置开始标志并重置比赛
function end(info){
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

function clickReady(){
    doRequest('/ready ' + gameId + ' ' + side + ' ' + (ready[side]^1));//发送请求
    document.getElementById('readyButton').innerHTML=(ready[side]?"准备":"取消准备");
}

function clickHost(){
    showJoinBoard(0);
    showSideChoose(1);
}

function clickJoin(){
    let i = document.getElementById('inputGameId').value;
    let n = document.getElementById('inputPlayerName').value;
    doRequest('/join ' + i + ' ' + n);
    playerName[0] = playerName[1] = n;
    gameId=i;
}

function clickChose(side){
    console.log(side);
    let i = document.getElementById('inputGameId').value;
    let n = document.getElementById('inputPlayerName').value;
    showSideChoose(0);
    doRequest("/host " + i + ' ' + n + ' ' + side);//发送请求
    host(i,n,side);
}

