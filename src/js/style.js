//style.js
//动态样式的操作函数
"use strict";
//改变窗口的大小，对应改变棋盘大小
function resetBorderSize(){
    let w = window.innerWidth , h = window.innerHeight;
    let m = Math.min(w,h);
    document.getElementById("board").style.width     =(0.7*m).toString()+"px";
    document.getElementById("board").style.height    =(0.7*m).toString()+"px";
    document.getElementById("mainBoard").style.width =(0.7*m).toString()+"px";
    document.getElementById("mainBoard").style.height=(0.8*m).toString()+"px";
    document.getElementById("buttonsList").style.top =(0.8*m).toString()+"px";

}