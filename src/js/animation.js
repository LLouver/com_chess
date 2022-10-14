//animation.js
//动画
"use strict";
function onClicked(x,y){
    //选定己方棋子
    console.log("onclicked " + x + y);
    if(!movable) return;
    if((gameSitu[x][y][0]==='w'&&side===1)||(gameSitu[x][y][0]==='b'&&side===0)){
        cancelChoosePiece();
        choosePiece(x,y);
        chosenPiece[0]=x;
        chosenPiece[1]=y;
    }else if(chosenPiece[0] !== 0){
        //if(moveInfo[side][x][y])
        {
            doRequest('/move ' + gameId + ' ' + chosenPiece[0] + ' ' + chosenPiece[1] + ' ' + x + ' ' + y + ' ' + side);
            movable=0;
        }
        //else
            cancelChoosePiece();
    }
}

function drawAnimation(lx,ly,cx,cy){
    let str=gameSitu[lx][ly];
    delPiece(lx,ly);
    addPiece(cx,cy,str);
    gameSitu[cx][cy]=gameSitu[lx][ly];
    gameSitu[lx][ly]='  ';
}