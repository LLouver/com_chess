//main.js
//html操作，调用内部操作，同时修改html元素
"use strict";

function resetGame(){
    side=side^1;
    clearInterval(counting);
    restTime[0]=60;
    restTime[1]=60;
    ready[0]=ready[1]=0;
    movable=0;
}

//显示一个局面,对棋盘上64个div修改
function showSituation(situation){
    for (let i = 1; i <= 8; ++i) {
        for (let j = 8; j >= 1; --j) {
            if(situation[i][j] !== "  "){
                addPiece(i,j,situation[i][j]);
            }
        }
    }
}

//显示/隐藏host join框
function showPlayerName(){
    let me=document.getElementById('meName');
    let opponent=document.getElementById('enemyName');
    me.innerHTML ="<span>" + playerName[side] + "</span>";
    opponent.innerHTML = "<span>" + playerName[side^1] + "</span>";
    if(side === 1) {
        me.innerHTML += "<img src='https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png' alt='/resources/images/wk.png' height='30px' width='30px'>";
        opponent.innerHTML += "<img src='https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png' alt='/resources/images/bk.png' height='30px' width='30px'>";
    }
    else{
        me.innerHTML += "<img src='https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png' alt='/resources/images/bk.png' height='30px' width='30px'>";
        opponent.innerHTML += "<img src='https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png' alt='/resources/images/wk.png' height='30px' width='30px'>";
    }

}

function showJoinBoard(swi){
    if(swi){
        document.getElementById('inputBlock').hidden=false;
        document.getElementById('inputBlock').style.display='grid';
    }
    else{
        document.getElementById('inputBlock').hidden=true;
        document.getElementById('inputBlock').style.display='';
    }
}

function showSideChoose(swi){
    if(swi){
        document.getElementById('chooseBlock').hidden=false;
        document.getElementById('chooseBlock').style.display='grid';
    }else{
        document.getElementById('chooseBlock').hidden=true;
        document.getElementById('chooseBlock').style.display='';
    }
}

function showButtonList(swi){
    if(swi) {
        document.getElementById('readyButton').hidden = false;
        document.getElementById('settingButton').hidden = false;
    }
    else{
        document.getElementById('readyButton').hidden = true;
        document.getElementById('settingButton').hidden = true;
    }
}

function showMainBoard(){
    document.getElementById("board").innerHTML='';
    //console.log("side " + side);
    if(side) {
        //console.log("side 1 " + side);
        for (let i = 8; i >= 1; --i) {
            for (let j = 1; j <= 8; ++j) {
                let id = '"cell' + i + j + '"';
                let c = "<div onclick='onClicked(" + i + ',' + j + ")' id=" + id + " class='cell " + ((i + j) % 2 === 1 ? "white" : "black") + "'>" + "</div>";
                document.getElementById("board").innerHTML += c;
            }
        }
    }
    else{
        //console.log("side 0 " + side);
        for (let i = 1; i <= 8; ++i) {
            for (let j = 8; j >= 1; --j) {
                let id = '"cell' + i + j + '"';
                let c = "<div onclick='onClicked(" + i + ',' + j + ")' id=" + id + " class='cell " + ((i + j) % 2 === 1 ? "white" : "black") + "'>" + "</div>";
                document.getElementById("board").innerHTML += c;
            }
        }
    }
    moveInfo[0]=[];
    moveInfo[1]=[];
    attackInfo[0]=[];
    attackInfo[1]=[];
    for (let i = 1; i <= 8; ++i) {
        moveInfo[0][i]=[];
        moveInfo[1][i]=[];
        attackInfo[0][i]=[];
        attackInfo[1][i]=[];
        for (let j = 1; j <= 8; ++j) {
            moveInfo[0][i][j]=0;
            moveInfo[1][i][j]=0;
            attackInfo[0][i][j]=0;
            attackInfo[1][i][j]=0;
        }
    }

    if(side === 1){
        document.getElementById("queenButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png" alt="/resources/images/wq.png" width="50" height="50">';
        document.getElementById("rookButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png" alt="/resources/images/wr.png" width="50" height="50">';
        document.getElementById("knightButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png" alt="/resources/images/wn.png" width="50" height="50">';
        document.getElementById("bishopButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png" alt="/resources/images/wb.png" width="50" height="50">';
    }else{
        document.getElementById("queenButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png" alt="/resources/images/bq.png" width="50" height="50">';
        document.getElementById("rookButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png" alt="/resources/images/br.png" width="50" height="50">';
        document.getElementById("knightButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png" alt="/resources/images/bn.png" width="50" height="50">';
        document.getElementById("bishopButton").innerHTML=
            '<img style="opacity: 100%" src="https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png" alt="/resources/images/bb.png" width="50" height="50">';
    }

}
//显示/隐藏时间设置框，隐藏时发送/setTime
function showTimeSetting(swi){
    if(swi){
        document.getElementById("globalTimeInput").value=restTime[0];
        document.getElementById("stepTimeInput").value=stepTime;
    }
    document.getElementById('timeSettingBlock').hidden = !swi;
}

function showUpgradeBoard(swi){
    document.getElementById('upgradeBlock').hidden = !swi;
}