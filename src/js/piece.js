//piece.js

//对格子的操作
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

//对piece的操作
function choosePiece(x,y){
    showHighlight(x,y);
    for(let i = 1 ; i <= 8 ; ++ i){
        for(let j = 1 ; j <= 8 ; ++ j){

        }
    }
}

function addPiece(x,y,s){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML="<div class='piece " + s + "'></div>";
    document.getElementById(str).onclick=function (){
        choosePiece(x,y);
    };
}

function delPiece(x,y){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML=x+' '+y;
}

