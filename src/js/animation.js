//animation.js
//动画
"use strict";
function onClicked(x,y){
    //选定己方棋子
    if((gameSitu[x][y][0]==='w'&&side===1)||(gameSitu[x][y][0]==='b'&&side===0)){
        choosePiece(x,y);
    }else{
        if(moveInfo[side][x][y]){
            doRequest('/move ' + gameId + ' ' + chosenPiece[0] + ' ' + chosenPiece[1] + ' ' + x + ' ' + y);
        }
        else{
            cancelChoosePiece();
        }
    }
}

function drawAnimation(lx,ly,cx,cy){
    delPiece(lx,ly);
    addPiece(cx,cy);
}