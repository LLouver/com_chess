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
    showReadyButton(1);
    showJoinBoard(0);
    document.getElementById('mainBoard').hidden=false;
    showPlayerName();
    showMainBoard();
    initSituation(gameSitu);
    showSituation(gameSitu);
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
    console.log('setTime ' + str_a + str_b);
}

//设置开始标志并且激活白方走棋
function begin(){
    console.log("began!")
    document.getElementById('meCounting').innerHTML=(Math.floor(restTime[side]/60)) + ' : ' + (restTime[side]%60);
    document.getElementById('enemyCounting').innerHTML=(Math.floor(restTime[side^1]/60)) + ' : ' + (restTime[side^1]%60);
    showReadyButton(0);
    showTimeSetting(0);
    started=1;
    ready[0]=ready[1]=0;
    if(side===1){
        movable=1;
    }
    countDown(1);
    for(let i = 1 ; i <= 8 ; ++ i){
        moveInfo[0][i]=[];
        moveInfo[1][i]=[];
        attackInfo[0][i]=[];
        attackInfo[1][i]=[];
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
    //console.log('player' + playerSide + ' made ' + lx + ly + cx + cy);
    let p=gameSitu[lx][ly];
    if(p === 'bk') isMoved.bk=true;
    if(p === 'br' && lx === 1 && ly === 1) isMoved.br1=true;
    if(p === 'br' && lx === 1 && ly === 8) isMoved.br8=true;
    if(p === 'wk') isMoved.wk=true;
    if(p === 'wr' && lx === 8 && ly === 1) isMoved.wr1=true;
    if(p === 'wr' && lx === 8 && ly === 8) isMoved.wr8=true;

    if(gameSitu[lx][ly][1]==='p' && lx === passant.x && cy === passant.y)
        delPiece(passant.x,passant.y);

    if(p[1] === 'p' && Math.abs(lx-cx)===2){
        passant.x=cx;
        passant.y=cy;
    }
    else{
        passant.x=0;
        passant.y=0;
    }

    drawAnimation(lx,ly,cx,cy);
    if(p[1] === 'k' && Math.abs(cy-ly)===2){
        if(cy > ly)
            drawAnimation(lx,8,lx,cy-1);
        else
            drawAnimation(lx,1,lx,cy+1);
    }

    clearInterval(counting);
    restTime[playerSide] += stepTime;
    countDown(playerSide^1);
    if(side === playerSide){
        return ;
    }
    movable=1;
    if(isEven(gameSitu,side)){
        doRequest('/end ' + gameId + ' e');
    }
    else if(isCheck(gameSitu,side^1)){
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

function clickSetTime(){
    doRequest('/setTime ' + gameId + ' ' + document.getElementById('globalTimeInput').value + ' ' + document.getElementById('stepTimeInput').value);
    showTimeSetting(0);
}
