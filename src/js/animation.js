//animation.js
//动画
"use strict";

function onClicked(x,y){
    //console.log(x,y,gameSitu[x][y]);
    //不是自己的回合，不执行任何操作
    console.log('clicked');
    if(!movable) return;
    //选定己方棋子
    if((gameSitu[x][y][0]==='w'&&side===1)||(gameSitu[x][y][0]==='b'&&side===0)){
        //console.log('chose ' + x + y);
        cancelChoosePiece();
        choosePiece(x,y);
        chosenPiece[0]=x;
        chosenPiece[1]=y;
    }else if(chosenPiece[0] !== 0){
        //console.log(moveInfo[side]);
        //console.log(moveInfo[side][x]);
        //console.log("moved " + x + y + ' ' + moveInfo[side][x][y]);
        if(moveInfo[side][x][y])
        {
            if((side === 1 && gameSitu[chosenPiece[0]][chosenPiece[1]] === 'wp' && x===8)||(side === 0 && gameSitu[chosenPiece[0]][chosenPiece[1]] === 'bp' && x===1)){
                chosenToGo[0] = x;
                chosenToGo[1] = y;
                console.log('now chosen ' + chosenPiece[0] + ' ' + chosenPiece[1]);
                console.log('now chosen ' + chosenToGo[0] + ' ' + chosenToGo[1]);
                showUpgradeBoard(1);
            }else
                doRequest('/move ' + gameId + ' ' + chosenPiece[0] + ' ' + chosenPiece[1] + ' ' + x + ' ' + y + ' ' + side);
            movable=0;
        }
            else
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