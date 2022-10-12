// Patameters for the game
var interv_gen_breads = 200, // How long it takes to generate the next eater, ms
    interv_refresh = 20, // Refresh Interval, ms
    speed_breads = 10; // px, The move speed of breads per REFRESH

// To set parameters manually
function set(b, c, e) {
    interv_gen_breads = b;
    interv_refresh = c;
    speed_breads = e;
    return ({
        Interval_Generate_breads : interv_gen_breads,
        Interval_Refresh : interv_refresh,
        Speed_Of_breads : speed_breads
    });
}

function closeIntro() {
    document.getElementById('status').style.opacity = 1;
    document.getElementById('status').innerText = "Ready...";
    document.getElementById('intro').style.opacity = 0;
}

var timeRemain, stopCode_countDown;
function gamemode(mode) {
    if (mode === 0) {
        timeRemain = 60;
        gameInitialize()
        gameStart();
        document.getElementById('CountDown').style.opacity = .5;
        document.getElementById('CountDown').innerText = timeRemain;
        document.getElementById('Control').style.display = "none";
        document.getElementById('GameMode').style.display = "none";
        // setTimeout(function(){
        //     gameStop();
        // }, 60000);
        stopCode_countDown = setInterval(function(){
            if (timeRemain === 0) {
                document.getElementById('CountDown').innerText = "";
                document.getElementById('Control').style.display = "block";
                document.getElementById('GameMode').style.display = "block";
                window.clearInterval(stopCode_countDown);
                gameStop();
                document.getElementById('status').innerText = "Timed Out !!";
            } else {
                document.getElementById('CountDown').innerText = timeRemain;
            }
            timeRemain--;
        }, 1000);
    }
}

// Necessary varibles
var stopCode_genbreads, stopCode_Refresh,
    // Regard items as boxes
    round_eater = 108, // px
    width_bread = 21.6, // px
    height_bread = 36, // px
    eater = document.getElementById('eater');

// Necessary functions
document.onmousemove = function(e) {
    e = e || window.event;
    eater.style.left = e.clientX - round_eater / 2 + "px";
};

// Necessary general varibles
var obj_gameBoard = document.getElementById('gameBoard'),
    bread = new Array();

// Core functions
function func_gen_breads() {
    var this_bread = document.createElement("div");
    this_bread.setAttribute("class", "breads");
    this_bread.style.left = Math.random() * (document.body.clientWidth - round_eater)  + 'px';
    this_bread.style.top = "0";
    this_bread.innerHTML = '<img src="./sources/img/bread.png" />';
    obj_gameBoard.appendChild(this_bread);
    bread.push(this_bread);
}

function func_refresh() {
    for (var i = 0; i < bread.length; i++) {
        bread[i].style.top = parseInt(bread[i].style.top) + speed_breads + "px";
        if ((Math.abs(parseInt(bread[i].style.left) - parseInt(eater.style.left)) <= ((round_eater + width_bread) / 2)) 
            // && (Math.abs(parseInt(bread[i].style.top) - window.outerHeight + parseInt(eater.style.bottom)) <= ((round_eater + width_bread) / 2))) {
            && parseInt(bread[i].style.top) + height_bread >= (window.outerHeight - 50 - parseInt(eater.style.bottom) - round_eater) // 50为误差补偿，不一定准确
            && parseInt(bread[i].style.top) < (window.outerHeight - parseInt(eater.style.bottom) - round_eater) ) {
                obj_gameBoard.removeChild(bread[i]);
                bread.splice(i, 1);
                document.getElementById('scoreBoard').innerText = parseInt(document.getElementById('scoreBoard').innerText) + 1;
        } else if (parseInt(bread[i].style.top) >= window.outerHeight) {
            obj_gameBoard.removeChild(bread[i]);
            bread.splice(i, 1);
        }
    }
}

function gameStart() {
    document.getElementById('CountDown').style.opacity = 0;
    document.getElementById('CountDown').innerText = "";
    gameStop();
    // if (document.getElementById('intro').style.opacity != 0) {
    //     document.getElementById('intro').style.opacity = 0;
    // }
    document.getElementById('status').innerText = "Game Start !!!";
    setTimeout(function(){
        document.getElementById('status').style.opacity = 0;
    }, 500);
    document.getElementById('Control').style.opacity = .3;
    stopCode_genbreads = setInterval(function(){func_gen_breads();}, interv_gen_breads);
    stopCode_Refresh = setInterval(function(){func_refresh();}, interv_refresh);
}

function gameStop() {
    closeIntro();
    document.getElementById('status').style.opacity = 1;
    document.getElementById('status').innerText = "PAUSE";
    document.getElementById('Control').style.opacity = 1;
    window.clearInterval(stopCode_genbreads);
    window.clearInterval(stopCode_Refresh);
}

function gameInitialize() {
    gameStop();
    document.getElementById('status').style.opacity = 1;
    document.getElementById('status').innerText = "Ready...";
    document.getElementById('Control').style.opacity = 1;
    while (bread.length) {
        obj_gameBoard.removeChild(bread[0]);
        bread.splice(0, 1);
    }
    bread = new Array();
    document.getElementById('scoreBoard').innerText = "0";
}