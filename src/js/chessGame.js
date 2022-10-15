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
    //de(board);
    if(piece.type[1] === "p"){//兵
        if(piece.type[0] === "b"){
            if((piece.x - 1) >= 1) {
                if((piece.y - 1) >= 1)
                    board[piece.x - 1][piece.y - 1] = 1;
                if((piece.y + 1) <= 8)
                    board[piece.x - 1][piece.y + 1] = 1;
            }
        }
        else if(piece.type[0] === "w"){
            if((piece.x + 1) <= 8) {
                if((piece.y - 1) >= 1)
                    board[piece.x + 1][piece.y - 1] = 1;
                if((piece.y + 1) <= 8)
                    board[piece.x + 1][piece.y + 1] = 1;
            }
        }
    }
    else if(piece.type[1] === "r"){//车
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
    else if(piece.type[1] === "n"){//马
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
    else if(piece.type[1] === "b"){//相
        let i = piece.x, j = piece.y;
        while(i < 8 && j < 8) {
            i++;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i > 1 && j < 8) {
            i--;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i < 8 && j > 1) {
            i++;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i > 1 && j > 1) {
            i--;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
    }
    else if(piece.type[1] === "q"){//后
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
        while(i < 8 && j < 8) {
            i++;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i > 1 && j < 8) {
            i--;
            j++;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i < 8 && j > 1) {
            i++;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
        i = piece.x;
        j = piece.y;
        while(i > 1 && j > 1) {
            i--;
            j--;
            board[i][j] = 1;
            if(situation[i][j] !== "  ")
                break;
        }
    }
    else if(piece.type[1] === "k"){//王
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
function markAttackAll(situation,side){
    let color_info = "bw";
    resetBoard(attackInfo[side]);
    for(let i = 1 ; i <= 8 ; ++i) {
        for (let j = 1; j <= 8; ++j){
            if(situation[i][j][0] === color_info[side]) {
                let piece={type:situation[i][j],x:i,y:j};
                markAttack(situation, attackInfo[side], piece);
            }
        }
    }
}


//检查某方是否将军（side将军，side^1被将军
/*调用markAttackAll*/
function isCheck(situation,side){
    let str=side?'bk':'wk';
    markAttackAll(situation,side);
    for(let i = 1 ; i <= 8 ; ++i) {
        for (let j = 1; j <= 8; ++j) {
            if(attackInfo[side][i][j] && situation[i][j] === str)
                return true;
            if(situation[i][j]===str)
                return false;
        }
    }
    return false;
}


function suicide(situation,piece,x,y)
{
    let situation1=[];
    let i=1,j=1;
    while(i<=8)
    {
        situation1[i]=[];
        j=1;
        while(j<=8)
        {
            situation1[i][j]=situation[i][j];
            j++;
        }
        i++;
    }

    situation1[piece.x][piece.y]="  ";
    situation1[x][y]=piece.type;

    let side = 1;
    if(piece.type[0]==="w")
        side = 0;
    return isCheck(situation1, side);
}
//在board中标出一个棋子能移动到的其它格子（不能走到不符合正常走法规则的格子，而且不能送将）
/*调用markAttack*/
function markValidMove(situation,board,piece){
    resetBoard(board);
    if (piece.type[1] === "p") {
        if (piece.type[0] === "b" && piece.x - 1 >= 1) {
            if(piece.x===passant.x) {
                if(piece.y===passant.y + 1||piece.y===passant.y - 1)
                    board[piece.x - 1][passant.y] = 1 ;
            }
            if(situation[piece.x - 1][piece.y] === "  ")
            {
                if(piece.x === 7 && situation[piece.x - 2][piece.y] === "  ")
                    board[piece.x - 2][piece.y] = !suicide(situation,piece,piece.x - 2,piece.y);
                board[piece.x - 1][piece.y] = !suicide(situation,piece,piece.x - 1,piece.y);
            }
            if(piece.y - 1 >= 1)
              if(situation[piece.x - 1][piece.y - 1][0] === 'w')
                board[piece.x - 1][piece.y - 1] = !suicide(situation,piece,piece.x - 1,piece.y-1);
            if(piece.y + 1 <= 8)
              if(situation[piece.x - 1][piece.y + 1][0] === 'w')
                board[piece.x - 1][piece.y + 1] = !suicide(situation,piece,piece.x - 1,piece.y+1);

        }
        else if (piece.type[0] === "w" && piece.x + 1 <= 8) {
            if(piece.x===passant.x) {
                if(piece.y===passant.y + 1||piece.y===passant.y - 1)
                    board[piece.x + 1][passant.y] = 1 ;
            }
            if(situation[piece.x + 1][piece.y] === "  ")
            {
                if(piece.x === 2 && situation[piece.x + 2][piece.y] === "  ")
                    board[piece.x + 2][piece.y] = !suicide(situation,piece,piece.x + 2,piece.y);
                board[piece.x + 1][piece.y] = !suicide(situation,piece,piece.x + 1,piece.y);
            }
            if(piece.y - 1 >= 1)
              if(situation[piece.x + 1][piece.y - 1][0] === 'b')
                board[piece.x + 1][piece.y - 1] = !suicide(situation,piece,piece.x + 1,piece.y - 1);
            if(piece.y + 1 <= 8)
              if(situation[piece.x + 1][piece.y + 1][0] === 'b')
                board[piece.x + 1][piece.y + 1] = !suicide(situation,piece,piece.x + 1,piece.y+1);
        }
    }
    else if (piece.type[1] === "r") {
        for (let i = 1; i + piece.x<= 8 ; i++) {
            board[piece.x + i][piece.y] = !suicide(situation,piece,piece.x + i,piece.y);
            if (situation[piece.x + i][piece.y] !== "  ") {
                if (situation[piece.x + i][piece.y][0] === situation[piece.x][piece.y][0])
                    board[piece.x + i][piece.y] = 0;
                break;
            }

        }
        for (let i = 1; i <= piece.x - 1; i++) {
            board[piece.x - i][piece.y] = !suicide(situation,piece,piece.x - i,piece.y);
            if (situation[piece.x - i][piece.y] !== "  ") {
                if (situation[piece.x - i][piece.y][0] === situation[piece.x][piece.y][0])
                    board[piece.x - i][piece.y] = 0;
                break;
            }

        }
        for (let j = 1; j <= 8 - piece.y; j++) {
            board[piece.x][piece.y + j] = !suicide(situation,piece,piece.x ,piece.y + j);
            if (situation[piece.x][piece.y + j] !== "  ") {
                if (situation[piece.x][piece.y + j][0] === situation[piece.x][piece.y][0])
                    board[piece.x][piece.y + j] = 0;
                break;
            }

        }
        for (let j = 1; j <= piece.y - 1; j++) {
            board[piece.x][piece.y - j] = !suicide(situation,piece,piece.x ,piece.y - j);
            if (situation[piece.x][piece.y - j] !== "  ") {
                if (situation[piece.x][piece.y - j][0] === situation[piece.x][piece.y][0])
                    board[piece.x][piece.y - j] = 0;
                break;
            }

        }
    }
    else if (piece.type[1] === "n") {
        if ((piece.x + 1) <= 8 && (piece.y + 2) <= 8)
            if (situation[piece.x + 1][piece.y + 2][0] !== situation[piece.x][piece.y][0])
                board[piece.x + 1][piece.y + 2] = !suicide(situation,piece,piece.x + 1,piece.y + 2);
        if ((piece.x + 1) <= 8 && (piece.y - 2) >= 1)
            if (situation[piece.x + 1][piece.y - 2][0] !== situation[piece.x][piece.y][0])
                board[piece.x + 1][piece.y - 2] = !suicide(situation,piece,piece.x + 1,piece.y - 2);
        if ((piece.x - 1) >= 1 && (piece.y + 2) <= 8)
            if (situation[piece.x - 1][piece.y + 2][0] !== situation[piece.x][piece.y][0])
                board[piece.x - 1][piece.y + 2] = !suicide(situation,piece,piece.x - 1 ,piece.y + 2);
        if ((piece.x - 1) >= 1 && (piece.y - 2) >= 1)
            if (situation[piece.x - 1][piece.y - 2][0] !== situation[piece.x][piece.y][0])
                board[piece.x - 1][piece.y - 2] = !suicide(situation,piece,piece.x - 1,piece.y - 2);
        if ((piece.x + 2) <= 8 && (piece.y + 1) <= 8)
            if (situation[piece.x + 2][piece.y + 1][0] !== situation[piece.x][piece.y][0])
                board[piece.x + 2][piece.y + 1] = !suicide(situation,piece,piece.x + 2,piece.y + 1);
        if ((piece.x + 2) <= 8 && (piece.y - 1) >= 1)
            if (situation[piece.x + 2][piece.y - 1][0] !== situation[piece.x][piece.y][0])
                board[piece.x + 2][piece.y - 1] = !suicide(situation,piece,piece.x + 2,piece.y - 1);
        if ((piece.x - 2) >= 1 && (piece.y + 1) <= 8)
            if (situation[piece.x - 2][piece.y + 1][0] !== situation[piece.x][piece.y][0])
                board[piece.x - 2][piece.y + 1] = !suicide(situation,piece,piece.x - 2,piece.y + 1);
        if ((piece.x - 2) >= 1 && (piece.y - 1) >= 1)
            if (situation[piece.x - 2][piece.y - 1][0] !== situation[piece.x][piece.y][0])
                board[piece.x - 2][piece.y - 1] = !suicide(situation,piece,piece.x - 2 ,piece.y - 1);
    }
    else if (piece.type[1] === "b") {
        let i = piece.x, j = piece.y;
        while (i < 8 && j < 8) {
            i++;
            j++;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }

        }

        i = piece.x;
        j = piece.y;
        while (i > 1 && j < 8) {
            i--;
            j++;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }

        i = piece.x;
        j = piece.y;
        while (i < 8 && j > 1) {
            i++;
            j--;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }

        i = piece.x;
        j = piece.y;
        while (i > 1 && j > 1) {
            i--;
            j--;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }
    }
    else if (piece.type[1] === "q") {
        for (let i = 1; i <= 8 - piece.x; i++) {
            board[piece.x + i][piece.y] = !suicide(situation,piece,piece.x + i,piece.y);
            if (situation[piece.x + i][piece.y] !== "  ") {
                if (situation[piece.x + i][piece.y][0] === situation[piece.x][piece.y][0])
                    board[piece.x + i][piece.y] = 0;
                break;
            }

        }
        for (let i = 1; i <= piece.x - 1; i--) {
            board[piece.x - i][piece.y] = !suicide(situation,piece,piece.x - i,piece.y);
            if (situation[piece.x - i][piece.y] !== "  ") {
                if (situation[piece.x - i][piece.y][0] === situation[piece.x][piece.y][0])
                    board[piece.x - i][piece.y] = 0;
                break;
            }

        }
        for (let j = 1; j <= 8 - piece.y; j++) {
            board[piece.x][piece.y + j] = !suicide(situation,piece,piece.x ,piece.y + j);
            if (situation[piece.x][piece.y + j] !== "  ") {
                if (situation[piece.x][piece.y + j][0] === situation[piece.x][piece.y][0])
                    board[piece.x][piece.y + j] = 0;
                break;
            }

        }
        for (let j = 1; j <= piece.y - 1; j--) {
            board[piece.x][piece.y - j] = !suicide(situation,piece,piece.x ,piece.y - j);
            if (situation[piece.x][piece.y - j] !== "  ") {
                if (situation[piece.x][piece.y - j][0] === situation[piece.x][piece.y][0])
                    board[piece.x][piece.y - j] = 0;
                break;
            }

        }

        let i = piece.x, j = piece.y;
        while (i < 8 && j < 8) {
            i++;
            j++;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }

        }

        i = piece.x;
        j = piece.y;
        while (i > 1 && j < 8) {
            i--;
            j++;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }

        i = piece.x;
        j = piece.y;
        while (i < 8 && j > 1) {
            i++;
            j--;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }

        i = piece.x;
        j = piece.y;
        while (i > 1 && j > 1) {
            i--;
            j--;
            board[i][j] = !suicide(situation,piece,i,j);
            if (situation[i][j] !== "  ")
            {
                if(situation[i][j][0]===piece.type[0])
                    board[i][j] = 0;
                break;
            }
        }
    }
    else if (piece.type[1] === "k") {
        if(piece.type[0] === 'w') {
            if(isMoved.wk===0) {
                if(isMoved.wr1===0){
                    if(situation[1][4] === "  " && situation[1][3] === "  ")
                        if(!isCheck(situation, 0) && !suicide(situation,piece,1,4) && !suicide(situation,piece,1,3))
                            board[1][3] = 1;
                }
                else if(isMoved.wr8===0){
                    if(situation[1][6] === "  " && situation[1][7] === "  ")
                        if(!isCheck(situation, 0) && !suicide(situation,piece,1,6) && !suicide(situation,piece,1,7))
                            board[1][7] = 1;
                }
            }
        }
        else{
            if(isMoved.bk === 0) {
                if(isMoved.br1 === 0){
                    if(situation[8][4] === "  " && situation[8][3] === "  ")
                        if(!isCheck(situation, 1) && !suicide(situation,piece,1,4) && !suicide(situation,piece,1,3))
                            board[8][3] = 1;
                }
                else if(isMoved.br8 === 0){
                    if(situation[1][6] === "  " && situation[1][7] === "  ")
                        if(!isCheck(situation, 1) && !suicide(situation,piece,1,6) && !suicide(situation,piece,1,7))
                            board[8][7] = 1;
                }
            }
        }



        if ((piece.x + 1) <= 8)
            if(situation[piece.x + 1][piece.y][0] !== piece.type[0])
               board[piece.x + 1][piece.y] = !suicide(situation,piece,piece.x + 1,piece.y);
        if ((piece.x - 1) >= 1)
            if(situation[piece.x - 1][piece.y][0] !== piece.type[0])
               board[piece.x - 1][piece.y] = !suicide(situation,piece,piece.x - 1 ,piece.y);
        if ((piece.y + 1) <= 8)
            if(situation[piece.x][piece.y + 1][0] !== piece.type[0])
               board[piece.x][piece.y + 1] = !suicide(situation,piece,piece.x ,piece.y + 1);
        if ((piece.y - 1) >= 1)
            if(situation[piece.x][piece.y - 1][0] !== piece.type[0])
               board[piece.x][piece.y - 1] = !suicide(situation,piece,piece.x ,piece.y - 1);
        if ((piece.x + 1) <= 8 && (piece.y + 1) <= 8)
            if(situation[piece.x + 1][piece.y + 1][0] !== piece.type[0])
               board[piece.x + 1][piece.y + 1] = !suicide(situation,piece,piece.x + 1 ,piece.y + 1);
        if ((piece.x - 1) >= 1 && (piece.y - 1) >= 1)
            if(situation[piece.x - 1][piece.y - 1][0] !== piece.type[0])
               board[piece.x - 1][piece.y - 1] = !suicide(situation,piece,piece.x - 1 ,piece.y - 1);
        if ((piece.x - 1) >= 1 && (piece.y + 1) <= 8)
            if(situation[piece.x - 1][piece.y + 1][0] !== piece.type[0])
               board[piece.x - 1][piece.y + 1] = !suicide(situation,piece,piece.x - 1 ,piece.y + 1);
        if ((piece.x + 1) <= 8 && (piece.y - 1) >= 1)
            if(situation[piece.x + 1][piece.y - 1][0] !== piece.type[0])
               board[piece.x + 1][piece.y - 1] = !suicide(situation,piece,piece.x + 1 ,piece.y - 1);
    }
}

//检查某方是否无路可走
/*调用markAttack*/
function isEven(situation, side) {

}

//（已知某方将军）检查某方是否将对方将杀（检查B能否应将
/*调用isCheck*/
function isCheckmate(situation, side) {

}

