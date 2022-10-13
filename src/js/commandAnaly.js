function doReceive(message){

}

function doRequest(message){
    if (message !== '') {
        if(message[0] === '/'){
            let args = message.split(' ');
            if(args.indexOf("`") !== -1 && args.indexOf("/accept") !== 0){
                alert("非法字符！");
                return;
            }

            //原本这里需要做严格的命令检查。但意义不大，所以就只写了几个命令的检查。
            switch (args[0]){
                case '/host':
                    if(args.length!==3 || args[1] === '' || args[2] === '')
                        return;
                    game.host(args[1] , args[2]);
                    break;
                case '/join':
                    if(args.length!==3)
                        return;
                    game.gameName = args[1];
                    player.self = args[2];
                    break;
                case '/accept':
                    if(args.length!==4)
                        return;
                    break;
            }
        }
        Chat.socket.send(message);
        document.getElementById('chat').value = '';
    }
}