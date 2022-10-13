//chessGame.js
//内部操作
"use strict";

//初始化局面
function initSituation(situation){
    //定义一个数组
    situation=[];
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

//选定了一个棋子，标出他能走到的格子和能攻击的格子
function markValid(situation,board,piece){}

//标记出某方棋子可以攻击的所有格子，包括国王攻击
/*调用markValid*/
function markAttack(situation,board,side){
    resetBoard(board);
    if(side == 0){        //黑方
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] == 'b') {
                    piece.type=situation[i][j];
                    piece.x=i;
                    piece.y=j;
                    markValid(situation, board, piece);
                }
            }
        }
    }
    else if(side == 1){   //白方
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] == 'w'){
                    piece.type=situation[i][j];
                    piece.x=i;
                    piece.y=j;
                    markValid(situation, board, piece);
                }
            }
        }
    }
    else return false;
}

//检查某一步棋是否合法（不仅不能走到其它格子，而且不能送将）
/*调用markAttack*/
function invalidMove(situation,board,piece,x,y){}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation,side){}

//检查某方是否将军（A将军，B被将军
/*调用markAttack*/
function isCheck(situation,side){
    let board;
    board=[];
    for(let i = 1 ; i <= 8 ; ++i)
        board[i]=[];
    resetBoard(board);
    markAttack(situation,board,side);
    for(let i = 1 ; i <= 8 ; ++i)
        for(let j = 1 ; j <= 8 ; ++j)
            if(board[i][j]==2)
                return true;
    return false;
}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation,side){}

