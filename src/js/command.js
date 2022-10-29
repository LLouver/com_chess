//command.js
//收到各指令对应函数
"use strict";
//设置游戏id
function host(id,name,str_sideChose){
    gameId=id;
    side=parseInt(str_sideChose);
    playerName[side]=name;
    isHost=1;
    document.getElementById("timing").hidden=false;
    document.getElementById("audio_waiting").play();
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
    alert("比赛房间已成功创建！当前游戏设置为：局时" + restTime[0] +'s，步时' + stepTime + 's，你执' + (side===1?"白":"黑"));
    document.getElementById("timing").hidden=true;
    showButtonList(1);
    showJoinBoard(0);
    document.getElementById('mainBoard').hidden=false;
    showPlayerName();
    showMainBoard();
    initSituation(gameSitu);
    showSituation(gameSitu);
    document.getElementById("audio_waiting").play();
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
    alert("时间被设置为：局时"+restTime[0]+'s，步时'+stepTime+'s。');
}

//设置开始标志并且激活白方走棋
function begin(){
    //console.log("began!")
    document.getElementById('meCounting').innerHTML=(Math.floor(restTime[side]/60)) + ' : ' + (restTime[side]%60);
    document.getElementById('enemyCounting').innerHTML=(Math.floor(restTime[side^1]/60)) + ' : ' + (restTime[side^1]%60);
    showButtonList(0);
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
    document.getElementById("audio_waiting").pause();
    document.getElementById("audio_bgm").play();
}

//设置开始标志并重置比赛
function end(type,info){
    document.getElementById("audio_end").play();
    document.getElementById("audio_bgm").pause();
    console.log("game ended "+info);
    if(type==='e')
        alert("平局");
    else if(parseInt(type)===side)
        delaying=setInterval(function(){
            alert("你赢得了比赛！");
            clearInterval(delaying);
            },1000);
    else
        delaying=setInterval(function(){
            alert("你输掉了比赛！");
            clearInterval(delaying);
        },1000);
    resetGame();
}

/*收到移动指令（对方），画出动画，判定胜负，如果继续则将走棋标记设为true,执行自己回合的函数
* 唯一一个直接传入五个number的接受指令函数
* */
function move(lx,ly,cx,cy,playerSide){
    //console.log('player' + playerSide + ' made ' + lx + ly + cx + cy);
    cancelChoosePiece();
    let p=gameSitu[lx][ly],c=gameSitu[cx][cy];
    if(p === 'bk') isMoved.bk=true;
    if(p === 'br' && ly === 1) isMoved.br1=true;
    if(p === 'br' && ly === 8) isMoved.br8=true;
    if(p === 'wk') isMoved.wk=true;
    if(p === 'wr' && ly === 1) isMoved.wr1=true;
    if(p === 'wr' && ly === 8) isMoved.wr8=true;

    if(gameSitu[lx][ly][1]==='p' && lx === passant.x && cy === passant.y)
        delPiece(passant.x,passant.y);

    if(p[1] === 'p' && Math.abs(lx-cx)===2){
        passant.x=cx;
        passant.y=cy;
        //console.log("now passant " + cx + cy);
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
    if(side !== playerSide){
        movable=1;
    }
    if(isCheck(gameSitu,playerSide)){
        markCheck(playerSide);
        //console.log('now checkmating: ' + isCheckmate(gameSitu,moveInfo[side],side^1));
        if(isCheckmate(gameSitu,moveInfo[playerSide],playerSide)) {
            if(side === playerSide)
                doRequest('/end ' + gameId + ' ' + (playerSide));
        }
        else
            document.getElementById("audio_check").play();
    }
    else if(isEven(gameSitu,moveInfo[playerSide^1],playerSide^1)){
        if(side === playerSide)
            doRequest('/end ' + gameId + ' e');
    }else{
        if(c==="  ")
            document.getElementById("audio_move").play();
        else
            document.getElementById("audio_capture").play();
    }
}

function change(x,y,type){
    type=gameSitu[x][y][0] + type;
    delPiece(x,y);
    addPiece(x,y,type);
    gameSitu[x][y]=type;
    document.getElementById("audio_upgrade").play();
}

function chat(playerSide,message){
    console.log(side + "mess:" + playerSide + ' ' + message);
    if(side===playerSide){
        document.getElementById("meChatting").hidden=false;
        document.getElementById("meChatting").innerHTML=message;
        chatBubbleTiming[playerSide]=setInterval(function(){
            document.getElementById("meChatting").hidden=true;
            console.log("hidden me");
            clearInterval(chatBubbleTiming[playerSide]);
        },3000);
        console.log(chatBubbleTiming[playerSide]);
    }else{
        document.getElementById("enemyChatting").hidden=false;
        document.getElementById("enemyChatting").innerHTML=message;
        chatBubbleTiming[playerSide]=setInterval(function(){
            document.getElementById("enemyChatting").hidden=true;
            console.log("hidden enemy");
            clearInterval(chatBubbleTiming[playerSide]);
        },3000);
        console.log(chatBubbleTiming[playerSide]);
    }

}

//按下各个按钮需要执行的事件
function clickReady(){
    doRequest('/ready ' + gameId + ' ' + side + ' ' + (ready[side]^1));//发送请求
    document.getElementById('readyButton').innerHTML=(ready[side]?"准备":"取消准备");
}

function clickHost(){
    let i = document.getElementById('inputGameId').value;
    let n = document.getElementById('inputPlayerName').value;
    if(i === '' || n === '')
        return;
    showJoinBoard(0);
    showSideChoose(1);
}

function clickJoin(){
    let i = document.getElementById('inputGameId').value;
    let n = document.getElementById('inputPlayerName').value;
    if(i === '' || n === '')
        return;
    doRequest('/join ' + i + ' ' + n);
    playerName[0] = playerName[1] = n;
    gameId=i;
}

function clickChose(side){
    //console.log(side);
    let i = document.getElementById('inputGameId').value;
    let n = document.getElementById('inputPlayerName').value;
    showSideChoose(0);
    doRequest("/host " + i + ' ' + n + ' ' + side);//发送请求
    host(i,n,side);
}

function clickSetTime(){
    let a=document.getElementById('globalTimeInput').value,b=document.getElementById('stepTimeInput').value;
    if(parseInt(a) < 30  || parseInt(b) < 0){
        alert("局时不得少于30s,步时不得为负");
        return;
    }
    doRequest('/setTime ' + gameId + ' ' + a + ' ' + b);
    showTimeSetting(0);
}

function clickUpgrade(s){
    //console.log('now chosen ' + chosenPiece[0] + ' ' + chosenPiece[1]);
    doRequest('/move ' + gameId + ' ' + chosenPiece[0] + ' ' + chosenPiece[1] + ' ' + chosenToGo[0] + ' ' + chosenToGo[1] + ' ' + side + ' ' + s);
    showUpgradeBoard(0);
}