//style.js
//动态样式的操作函数
"use strict";
//改变窗口的大小，对应改变棋盘大小
function resetBorderSize(){
    let t = Math.floor(0.7*Math.min(window.innerWidth,window.innerHeight));
    document.getElementById("board").style.width=t.toString()+"px";
    document.getElementById("board").style.height=t.toString()+"px";
}