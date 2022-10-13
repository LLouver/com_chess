//main.js
//html操作，调用内部操作，同时修改html元素
"use strict";
//显示一个局面,对棋盘上64个div修改
function showSituation(situation){
    for (let i = 1; i <= 8; ++i) {
        for (let j = 8; j >= 1; --j) {
            if(gameSitu[i][j] !== "  "){
                addPiece(i,j,gameSitu[i][j]);
            }
        }
    }
}

//显示/隐藏host join框
function showPlayerName(){
    document.getElementById('selfPlayer').innerHTML=playerName[side];
    document.getElementById('enemyPlayer').innerHTML=playerName[side^1];

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
function showMainBoard(){
    if(side) {
        for (let i = 8; i >= 1; --i) {
            for (let j = 1; j <= 8; ++j) {
                let id = 'cell' + i + j;
                let c = "<div id=" + id + " class='cell " + ((i + j) % 2 === 1 ? "white" : "black") + "'>" + i + " " + j + "</div>";
                document.getElementById("board").innerHTML += c;
                //console.log("added" + i + j);
            }
        }
    }
    else{
        for (let i = 1; i <= 8; ++i) {
            for (let j = 8; j >= 1; --j) {
                let id = 'cell' + i + j;
                let c = "<div id=" + id + " class='cell " + ((i + j) % 2 === 1 ? "white" : "black") + "'>" + i + " " + j + "</div>";
                document.getElementById("board").innerHTML += c;
                //console.log("added" + i + j);
            }
        }
    }
    /*用于测试
    addPiece(3,4,'bq');
    showHighlight(3,3);
    showHighlight(3,4);
    showNormal(3,3);
    showWarning(3,5);
    addPiece(3,5,'wk');*/
}
//显示/隐藏时间设置框，隐藏时发送/setTime
function showTimeSetting(swi){}

//指定某方获得胜利和获胜理由
function end(side,reason){}

//轮到自己回合，开始倒计时
function myTurn(){}

//玩家进行了一步合法行棋，执行相应的动画，画动画，同时加上相应步时
function myMove(lx,ly,cx,cy){}

//无论是鼠标还是键盘操作都要发送move和turn指令
//鼠标点击了一个位置，表示选中一个棋子或移动到一个位置，
function clickEvent(lx,ly,cx,cy){}

//将一个元素拖到了一个位置
function dragEvent(lx,ly,cx,cy){}
