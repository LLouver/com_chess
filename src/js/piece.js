function addPiece(x,y,s){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML="<div class='piece " + s + "'></div>";
}

function delPiece(x,y){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML=x+' '+y;
}

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