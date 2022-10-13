function addPiece(s,x,y){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML="<div class='piece " + s + "'></div>";
}

function delPiece(x,y){
    let str='cell'+x+y;
    document.getElementById(str).innerHTML=x+' '+y;
}