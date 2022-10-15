//timer.js
//用于计时器的各种函数
"use strict";

function countDown(playerSide){
    counting = setInterval(function (){
        restTime[playerSide] --;
        let str = (playerSide===side?'meCounting':'enemyCounting');
        console.log(playerSide + ' ' + str);
        document.getElementById(str).innerHTML=(Math.floor(restTime[playerSide]/60)) + ' : ' + (restTime[playerSide]%60);
        if(restTime[playerSide]===0 && side===playerSide){
            doRequest('/end ' + gameId + ' ' + (playerSide^1));
        }
    },1000);
}