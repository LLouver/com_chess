let Chat = {};

Chat.socket = null;

Chat.connect = function(host) {
    if ('WebSocket' in window) {
        Chat.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
        Chat.socket = new MozWebSocket(host);
    } else {
        console.log('Error: WebSocket is not supported by this browser.');
        return;
    }

    Chat.socket.onopen = function () {
        console.log('Info: WebSocket connection opened.');
        alert("已成功连接！");
        document.getElementById("timing").hidden=true;
        showJoinBoard(1);
        /*document.getElementById('chat').onkeydown = function(event) {
            if (event.keyCode === 13) {
                Chat.sendMessage();
            }
        };*/
    };

    Chat.socket.onclose = function () {
        //document.getElementById('chat').onkeydown = null;
        console.log('Info: WebSocket closed.');
        alert("链接已断开！请刷新");
        location.reload();
    };

    Chat.socket.onmessage = function (message) {
        //收到消息，执行对应函数
        doReceive(message.data);
    };
};

Chat.initialize = function() {
    /*if (window.location.protocol === 'http:') {
         Chat.connect('ws://' + window.location.host + '/examples/websocket/chat');
     } else {
         Chat.connect('wss://' + window.location.host + '/examples/websocket/chat');
     }*/

    /*if (window.location.protocol === 'http:') {
        Chat.connect('ws://' + 'localhost:9010'+'/examples/websocket/chat');
    } else {
        Chat.connect('wss://' + 'localhost:9010' + '/examples/websocket/chat');
    }*/
    if (window.location.protocol === 'http:') {
        Chat.connect('ws://' + window.location.host+'/examples/websocket/chat');
    } else {
        Chat.connect('wss://' + window.location.host + '/examples/websocket/chat');
    }
};

Chat.sendMessage = function() {
    doRequest(document.getElementById('chat').value);
};

Chat.initialize();
/*
var Console = {};

Console.log = function(message) {
    var console = document.getElementById('console');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.innerHTML = message;
    console.appendChild(p);
    while (console.childNodes.length > 25) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
};



document.addEventListener("DOMContentLoaded", function() {
    // Remove elements with "noscript" class - <noscript> is not allowed in XHTML
    let noScripts = document.getElementsByClassName("noscript");
    for (let i = 0; i < noScripts.length; i++) {
        noScripts[i].parentNode.removeChild(noScripts[i]);
    }
}, false);

*/