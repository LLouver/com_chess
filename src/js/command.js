//command.js
//收到各指令对应函数
"use strict";
//设置游戏id
function host(id,name,str_sideChose){
    gameId=id;
    side=parseInt(str_sideChose);
    playerName[side]=name;
    isHost=1;
    //document.getElementById('selfPlayer').innerHTML=name;
}

function join(id,name){
    if(isHost){
        doRequest("/accept " + gameId + ' ' + playerName[side] + ' ' + (side^1));
        playerName[side^1]=name;
    }
    document.getElementById('mainBoard').hidden=false;
    //showMainBoard();
    showPlayerName();
}

function accept(name,str_sideChose){
    if(!isHost){
        side=parseInt(str_sideChose);
        playerName[side^1]=name;
    }
    showJoinBoard(0);
    document.getElementById('mainBoard').hidden=false;
    showPlayerName();
    //showMainBoard();
}

//准备/取消准备，发送/ready
//如果双方都准备，游戏开始标记设为true并发送/begin
function setReady(s,str_swi){
    ready[s]=parseInt(str_swi);
    if(ready[0] && ready[1]){
        begin();
    }
}

//设置时间
function setTime(str_a,str_b){
    restTime[0]=parseInt(str_a);
    restTime[1]=parseInt(str_a);
    stepTime=parseInt(str_b);
}

//设置开始标志并且激活白方走棋
function begin(){
    console.log("began!")
    document.getElementById('meCounting').innerHTML=(Math.floor(restTime[side]/60)) + ' : ' + (restTime[side]%60);
    document.getElementById('enemyCounting').innerHTML=(Math.floor(restTime[side^1]/60)) + ' : ' + (restTime[side^1]%60);
    started=1;
    ready[0]=ready[1]=0;
    if(side===1){
        movable=1;
    }
    showMainBoard();
    initSituation(gameSitu);
    showSituation(gameSitu);
    countDown(1);
    for(let i = 1 ; i <= 8 ; ++ i){
        gameSitu=[];
        attackInfo=[];
        moveInfo=[];
    }
}

//设置开始标志并重置比赛
function end(type,info){
    if(type==='e')
        alert("平局");
    else if(parseInt(type)===side)
        alert("你赢得了比赛！");
    else
        alert("你输掉了比赛！");
    resetGame();
}

/*收到移动指令（对方），画出动画，判定胜负，如果继续则将走棋标记设为true,执行自己回合的函数
* 唯一一个直接传入五个number的接受指令函数
* */
function move(lx,ly,cx,cy,playerSide){
    drawAnimation(lx,ly,cx,cy);
    clearInterval(counting);
    countDown(playerSide);
    if(side === playerSide){
        return ;
    }
    movable=1;
    if(isEven(gameSitu,side)){
        doRequest('/end ' + gameId + ' e');
    }
    else if(isCheck(side^1)){
        markCheck(side^1);
        if(isCheckmate())
            doRequest('/end ' + gameId + ' ' + side);
    }
}


//按下各个按钮需要执行的事件
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

