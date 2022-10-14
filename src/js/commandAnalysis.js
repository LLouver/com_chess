//commandAnalysis.js
// 解析指令
"use strict";

function doReceive(s){

    //console.log(s);
    if(s.indexOf('*') === 0){
        if(s.indexOf('joined')) {
           // console.log("一个玩家加入了！");
            //pInRoom++;
        }
        else {
            //console.log("一个玩家离开了！");
            //pInRoom--;
        }
        //document.getElementById("numberOfPlayerInRoom").innerText=pInRoom.toString();
    }
    let p=s.indexOf(":");
    let args = s.substring(p+2).split(' ');
    //console.log("rec:" + args);
    switch (args[0]){
        case '/host'://id,name,side
            console.log('a room created');
            break;
        case '/join'://id game
            if(args[1]!==gameId || args[2] === playerName[side])
                return;
            join(args[1],args[2]);
            break;
        case '/accept'://id name side
            if(args[1]!==gameId || args[2] === playerName[side])
                return;
            accept(args[2],args[3]);
            break;
        case '/setTime'://id time1 time2
            if(args[1]!==gameId)
                return;
            setTime(args[2],args[3]);
            break;
        case '/ready'://id side b
            if(args[1]!==gameId)
                return;
            setReady(args[2],args[3]);
            break;
        case '/end'://id info
            if(args[1]!==gameId)
                return;
            end(args[2]);
            break;
        case '/move'://id lx ly cx xy side
            if(args[1]!==gameId)
                return;
            console.log("move" + args);
            move(args[2],args[3],args[4],args[5],args[6]);
            break;
    }
}

function doRequest(message){
    //console.log("sed:"+message);
    if (message !== '') {
        Chat.socket.send(message);
        //document.getElementById('chat').value = '';
    }
}