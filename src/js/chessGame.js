//chessGame.js
//内部操作
"use strict";

//初始化局面
function initSituation(situation){
    for(let i = 1 ; i <= 8 ; ++i){
        //数组从位置1开始，位置0直接为空，不用管
        situation[i]=[]; //数组每一个元素为一个数组
    }
    //1开始白，8开始黑
    //ABC对应123,以此类推
    //车马象王后国王象马车
    //兵一行
    //第一个字符代表颜色（w、b）；r车，n马，b象，q后，k王，p兵
    //以下为白方
    situation[1]=["  ", "wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
    situation[2]=["  ", "wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
    //以下为黑方
    situation[8]=["  ", "br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
    situation[7]=["  ", "bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
    //剩余全为空（两位空格）
    for(let i = 3 ; i <= 6 ; ++i)
        for(let j = 1 ; j <= 8 ; ++j)
            situation[i][j]="  ";
}

/*以下可以添加公用的工具函数*/

//将board清0
function resetBoard(board){
    for(let i = 1 ; i <= 8 ; ++i)
        for(let j = 1 ; j <= 8 ; ++j)
            board[i][j]=0;
}


/*以下为需要实现的基本函数*/

//选定了一个棋子，标出他能攻击的格子
function markAttack(situation,board,piece){}


//标记出某方棋子可以攻击的所有格子，包括国王攻击
/*调用markValid*/
function markAttackAll(situation,side){
    if(side === 0){        //黑方
        resetBoard(attackBlack);
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] === 'b') {
                    let piece={type:situation[i][j],x:i,y:j};
                    markAttack(situation, attackBlack, piece);
                }
            }
        }
    }
    else if(side === 1){   //白方
        resetBoard(attackWhite);
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] === 'w'){
                    let piece={type:situation[i][j],x:i,y:j};
                    markAttack(situation, attackWhite, piece);
                }
            }
        }
    }
    else return false;
}


//检查某方是否将军（side将军，side^1被将军
/*调用markAttackAll*/
function isCheck(situation,side){
    markAttackAll(situation,side);
    for(let i = 1 ; i <= 8 ; ++i) {
        for (let j = 1; j <= 8; ++j) {
            if(side === 0){ //黑
                if(attackBlack[i][j] && situation[i][j][2] === 'k')
                    return true;
            }
            else{ //白
                if(attackWhite[i][j] && situation[i][j][2] === 'k')
                    return true;
            }
            if(situation[i][j][2] === 'k')
                return false;
        }
    }
    return false;
}

//在board中标出一个棋子能移动到的其它格子（不能走到不符合正常走法规则的格子，而且不能送将）
/*调用markAttack*/
function markValidMove(situation,board,piece){}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation,side){}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation,side){}

