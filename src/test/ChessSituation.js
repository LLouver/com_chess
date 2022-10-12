"use strict";
function ChessSituation(){//一个棋局局面

    this.board=[];
    for(let i = 1 ; i <= 8 ; ++ i) {
        this.board[i] = [];
        for (let j = 1; j <= 8; ++j) {
            this.board[i][j] = {type:0,val:i+j};
        }
    }//初始化为8*8个对象
    this.board2=[];
    for(let i = 1 ; i <= 8 ; ++ i) {
        this.board2[i] = [];
        for (let j = 1; j <= 8; ++j) {
            this.board2[i][j] = {type:0,val:i+j};
        }
    }//初始化为8*8个对象
    this.board2=this.board;
    this.init=function(){

    }
}

function setChessSituation(dst,src){
    for(let i = 1 ; i <= 8 ; ++ i) {
        for (let j = 1; j <= 8; ++j) {
            dst[i][j]=src[i][j];
        }
    }//初始化为8*8个对象
}