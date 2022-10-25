//timer.js
//用于计时器的各种函数
"use strict";

function countDown(playerSide){
    document.getElementById('meCounting').innerHTML=(Math.floor(restTime[side]/60)) + ' : ' + (restTime[side]%60);
    document.getElementById('enemyCounting').innerHTML=(Math.floor(restTime[side^1]/60)) + ' : ' + (restTime[side^1]%60);
    if(side===playerSide){
        document.getElementById('meCountingImg').innerHTML = document.getElementById("waiting").outerHTML;
        document.getElementById('enemyCountingImg').innerHTML ="";
    }else{
        document.getElementById('enemyCountingImg').innerHTML = document.getElementById("waiting").outerHTML;
        document.getElementById('meCountingImg').innerHTML ="";
    }
    counting = setInterval(function (){
        restTime[playerSide] --;
        let str = (playerSide===side?'meCounting':'enemyCounting');
        //console.log(playerSide + ' ' + str);
        document.getElementById(str).innerHTML=(Math.floor(restTime[playerSide]/60)) + ' : ' + (restTime[playerSide]%60);
        if(restTime[playerSide]===0 && side===playerSide){
            doRequest('/end ' + gameId + ' ' + (playerSide^1));
        }
    },1000);
}