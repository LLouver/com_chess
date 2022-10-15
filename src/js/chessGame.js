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
function markAttack(situation,board,piece){
    if(piece.type[1] === "p"){
        if(piece.type[0] === "b"){
            board[piece.x - 1][piece.y - 1] = 1;
            board[piece.x - 1][piece.y + 1] = 1;
        }
        else if(piece.type[0] === "w"){
            board[piece.x + 1][piece.y - 1] = 1;
            board[piece.x + 1][piece.y + 1] = 1;
        }
    }
    else if(piece.type[1] === "r"){
        for(let i = 1; i <= 8 - piece.x; i++) {
            board[piece.x + i][piece.y] = 1;
            if(situation[piece.x + i][piece.y] !== "  ")
                break;
        }
        for(let i = 1; i <= piece.x - 1; i--) {
            board[piece.x - i][piece.y] = 1;
            if(situation[piece.x - i][piece.y] !== "  ")
                break;
        }
        for(let j = 1; j <= 8 - piece.y; j++) {
            board[piece.x][piece.y + j] = 1;
            if(situation[piece.x][piece.y + j] !== "  ")
                break;
        }
        for(let j = 1; j <= piece.y - 1; j--) {
            board[piece.x][piece.y - j] = 1;
            if(situation[piece.x][piece.y - j] !== "  ")
                break;
        }
    }
    else if(piece.type[1] === "n"){
        if((piece.x + 1) <= 8 && (piece.y + 2) <= 8)
            board[piece.x + 1][piece.y + 2] = 1;
        if((piece.x + 1) <= 8 && (piece.y - 2) >= 1)
            board[piece.x + 1][piece.y - 2] = 1;
        if((piece.x - 1) >= 1 && (piece.y + 2) <= 8)
            board[piece.x - 1][piece.y + 2] = 1;
        if((piece.x - 1) >= 1 && (piece.y - 2) >= 1)
            board[piece.x - 1][piece.y - 2] = 1;
        if((piece.x + 2) <= 8 && (piece.y + 1) <= 8)
            board[piece.x + 2][piece.y + 1] = 1;
        if((piece.x + 2) <= 8 && (piece.y - 1) >= 1)
            board[piece.x + 2][piece.y - 1] = 1;
        if((piece.x - 2) >= 1 && (piece.y + 1) <= 8)
            board[piece.x - 2][piece.y + 1] = 1;
        if((piece.x - 2) >= 1 && (piece.y - 1) >= 1)
            board[piece.x - 2][piece.y - 1] = 1;
    }
    else if(piece.type[1] === "b"){
        let i = piece.x, j = piece.y;
        while(i <= 8 && j <= 8) {
            i++;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i >= 1 && j <= 8) {
            i--;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i <= 8 && j >= 1) {
            i++;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i >= 1 && j >= 1) {
            i--;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
    }
    else if(piece.type[1] === "q"){
        for(let i = 1; i <= 8 - piece.x; i++) {
            board[piece.x + i][piece.y] = 1;
            if(situation[piece.x + i][piece.y] !== "  ")
                break;
        }
        for(let i = 1; i <= piece.x - 1; i--) {
            board[piece.x - i][piece.y] = 1;
            if(situation[piece.x - i][piece.y] !== "  ")
                break;
        }
        for(let j = 1; j <= 8 - piece.y; j++) {
            board[piece.x][piece.y + j] = 1;
            if(situation[piece.x][piece.y + j] !== "  ")
                break;
        }
        for(let j = 1; j <= piece.y - 1; j--) {
            board[piece.x][piece.y - j] = 1;
            if(situation[piece.x][piece.y - j] !== "  ")
                break;
        }

        let i = piece.x, j = piece.y;
        while(i <= 8 && j <= 8) {
            i++;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i >= 1 && j <= 8) {
            i--;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i <= 8 && j >= 1) {
            i++;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        while(i >= 1 && j >= 1) {
            i--;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
    }
    else if(piece.type[1] === "k"){
        if((piece.x + 1) <= 8)
            board[piece.x + 1][piece.y] = 1;
        if((piece.x - 1) >= 1)
            board[piece.x - 1][piece.y] = 1;
        if((piece.y + 1) <= 8)
            board[piece.x][piece.y + 1] = 1;
        if((piece.y - 1) >= 1)
            board[piece.x][piece.y - 1] = 1;
        if((piece.x + 1) <= 8 && (piece.y + 1) <= 8)
            board[piece.x + 1][piece.y + 1] = 1;
        if((piece.x - 1) >= 1 && (piece.y - 1) >= 1)
            board[piece.x - 1][piece.y - 1] = 1;
        if((piece.x - 1) >= 1 && (piece.y + 1) <= 8)
            board[piece.x - 1][piece.y + 1] = 1;
        if((piece.x + 1) <= 8 && (piece.y - 1) >= 1)
            board[piece.x + 1][piece.y - 1] = 1;
    }
}


//标记出某方棋子可以攻击的所有格子，包括国王攻击
/*调用markValid*/
function markAttackAll(situation,board,side){
    resetBoard(board);
    if(side === 0){        //黑方
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] === 'b') {
                    let piece={type:situation[i][j],x:i,y:j};
                    markAttack(situation, board, piece);
                }
            }
        }
    }
    else if(side === 1){   //白方
        for(let i = 1 ; i <= 8 ; ++i) {
            for (let j = 1; j <= 8; ++j){
                if(situation[i][j][0] === 'w'){
                    let piece={type:situation[i][j],x:i,y:j};
                    markAttack(situation, board, piece);
                }
            }
        }
    }
    else return false;
}


//检查某方是否将军（A将军，B被将军
/*调用markAttack*/
function isCheck(situation,side){



}

//在board中标出一个棋子能移动到的其它格子（不能走到不符合正常走法规则的格子，而且不能送将）
/*调用markAttack*/
function markValidMove(situation,board,piece){}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation,board,side){
    if(side===0) {
        let mark=0;
        for(let i=1;i<=8;i++) {
            for (let j = 1; j <= 8; j++) {
                if (situation[i][j][0] === 'w') {
                    let piece = {type: situation[i][j], x: i, y: j};
                    markValidMove(situation,board,piece);
                    for(let k=1;k<=8;k++) {
                        for (let t = 1; t <= 8; t++) {
                            if (board[k][t]) {
                                mark++;
                            }
                        }
                    }
                }
            }
        }
       return mark === 0;
    }
    else if(side===1) {
        let mark=0;
        for(let i=1;i<=8;i++) {
            for (let j = 1; j <= 8; j++) {
                if (situation[i][j][0] === 'b') {
                    let piece = {type: situation[i][j], x: i, y: j};
                    markValidMove(situation,board,piece);
                    for(let k=1;k<=8;k++){
                        for(let t=1;t<=8;t++){
                            if(board[k][t]){
                                mark++;
                            }
                        }
                    }
                }
            }
        }
        return mark === 0;//true表示无路可走
    }
}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation,board,side){
    if(side===0) {
        return !!(isEven(situation, board, 0) && isCheck(situation, 1));
    }
    else if(side===1) {
        return !!(isEven(situation, board, 1) && isCheck(situation, 0));
    }
}

