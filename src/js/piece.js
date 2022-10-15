//piece.js
//对格子的操作
"use strict";

function showHighlight(x,y){
    let str='cell'+x+y;
    document.getElementById(str).className='cell ' + ((x+y)%2===1?'highWhite':'highBlack');
}

function showWarning(x,y) {
    let str='cell'+x+y;
    document.getElementById(str).className='cell warning';
}

function showNormal(x,y){
    let str='cell'+x+y;
    document.getElementById(str).className='cell ' + ((x+y)%2===1?"white":"black") ;
}

function showMovable(x,y,swi){
    //...
    let str = 'cell' + x + y;
    if(swi) {
        document.getElementById(str).className = 'cell chosen ' + ((x + y) % 2 === 1 ? "white" : "black");
    }else{
        document.getElementById(str).className = 'cell ' + ((x + y) % 2 === 1 ? "white" : "black");
    }
}

//对piece的操作
function cancelChoosePiece(){
    chosenPiece[0]=chosenPiece[1]=0;
    for(let i = 1 ; i <= 8 ; ++ i){
        for(let j = 1 ; j <= 8 ; ++ j){
            showMovable(i,j,0);
        }
    }
}

function choosePiece(x,y){
    //console.log('clicked ' + x + y);
    showHighlight(x,y);
    let c=(gameSitu[x][y][0]==='w'?1:0);
    let piece={type:gameSitu[x][y],x:x,y:y};
    markValidMove(gameSitu,moveInfo[c],piece);
    console.log(moveInfo[c]);
    for(let i = 1 ; i <= 8 ; ++ i){
        for(let j = 1 ; j <= 8 ; ++ j){
            if(moveInfo[c][i][j]){
                showMovable(i,j,1);
            }
        }
    }
}

function markCheck(side){
    let str=(side===1?'bk':'wk');
    for(let i = 1 ; i <= 8 ; ++ i) {
        for (let j = 1; j <= 8; ++j) {
            if(gameSitu[i][j] === str)
                showWarning(i,j);
        }
    }
}

function addPiece(x,y,s){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML="<div class='piece " + s + "'></div>";
}

function delPiece(x,y){
    let str='cell'+x+y;
    console.log(str);
    document.getElementById(str).innerHTML=x+' '+y;
}

