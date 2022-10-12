//chessGame.js
//内部操作
//NMSL
"use strict";
//选定了一个棋子，标出他能走到的格子和能攻击的格子
function markValid(situation,board,piece){
//xiangmingyang is my grand son
}

//标记出被某方棋子攻击的所有格子，包括被国王攻击
/*调用markValid*/
function markAttack(situation,board,side){
    //xiangmingyang is my grand son
}

//检查某一步棋是否合法（不仅不能走到其它格子，而且不能送将）
/*调用markAttack*/
function invalidMove(situation,board,piece,x,y){
    //xiangmingyang is my grand son
}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation,side){
//xiangmingyang is my grand son
}

//检查某方是否将军（A将军，B被将军
/*调用markAttack*/
function isCheck(situation,side){
//xiangmingyang is my grand son
}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation,side){
    //xiangmingyang is my grand son
}

