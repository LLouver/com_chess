// Patameters for the game
var interv_gen_eaters = 500, // How long it takes to generate the next eater, ms
    interv_gen_breads = 200, // How long it takes to generate the next eater, ms
    interv_refresh = 20, // Refresh Interval, ms
    speed_eaters = 5, // px, The move speed of eaters per REFRESH
    speed_breads = 10; // px, The move speed of breads per REFRESH

// To set parameters manually
function set(a, b, c, d, e) {
    interv_gen_eaters = a;
    interv_gen_breads = b;
    interv_refresh = c;
    speed_eaters = d;
    speed_breads = e;
    return ({
        Interval_Generate_eaters : interv_gen_eaters,
        Interval_Generate_breads : interv_gen_breads,
        Interval_Refresh : interv_refresh,
        Speed_Of_eaters : speed_eaters,
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
var stopCode_geneaters, stopCode_genbreads, stopCode_Refresh,
    // See collash boxes as boxes
    round_eater = 54, // px
    round_bread = 21.6, // px
    mouse_X, mouse_Y;

// Necessary functions
document.onmousemove = function(e) {
    e = e || window.event;
    mouse_X = e.clientX;
    mouse_Y = e.clientY;
};

// Necessary general varibles
var obj_gameBoard = document.getElementById('gameBoard'),
    eater_unmatched = new Array(), 
    eater_matched = new Array(), 
    bread_unmatched = new Array,
    bread_matched = new Array();

// Core functions
function func_gen_eaters() {
    var this_eater = document.createElement("div");
    this_eater.setAttribute("class", "eaters");
    this_eater.style.left = Math.random() * (document.body.clientWidth - round_eater) + 'px';
    this_eater.style.top = "0";
    this_eater.innerHTML = '<img src="./sources/img/eater.png" />';
    obj_gameBoard.appendChild(this_eater);
    // eater_unmatched.push(this_eater);
    if (bread_unmatched.length > 0) {
        var notMatched = true;
        for (var i = 0; i < bread_unmatched.length; i++) {
            if (Math.abs(parseInt(bread_unmatched[i].style.left) - parseInt(this_eater.style.left) + (round_eater - round_bread) / 2) <= ((round_eater + round_bread) / 2)
                && (parseInt(bread_unmatched[i].style.top) >= parseInt(this_eater.style.top))) {
                
                // Move the matched bread and eater
                bread_matched.push(bread_unmatched[i]);
                bread_unmatched.splice(i, 1);
                eater_matched.push(this_eater);
                notMatched = false;
                break;
            }
        }
        if (notMatched) {
            eater_unmatched.push(this_eater);
        }
    } else {
        eater_unmatched.push(this_eater);
    }
}

function func_gen_breads() {
    var this_bread = document.createElement("div");
    this_bread.setAttribute("class", "breads");
    this_bread.style.left = mouse_X  + 'px';
    this_bread.style.top = mouse_Y - 60 + 'px';
    this_bread.innerHTML = '<img src="./sources/img/bread.png" />';
    obj_gameBoard.appendChild(this_bread);
    if (eater_unmatched.length > 0) {
        var notMatched = true;
        for(var i = 0; i < eater_unmatched.length; i++) {
            if (Math.abs(parseInt(eater_unmatched[i].style.left) - parseInt(this_bread.style.left) + (round_eater - round_bread) / 2) <= ((round_eater + round_bread) / 2) 
                && (parseInt(eater_unmatched[i].style.top) <= parseInt(this_bread.style.top))) {

                // Move the matched eater and bread
                eater_matched.push(eater_unmatched[i]);
                eater_unmatched.splice(i, 1);
                bread_matched.push(this_bread);
                notMatched = false;
                break;
            }
        }
        if (notMatched) {
            bread_unmatched.push(this_bread);
        }
    } else {
        bread_unmatched.push(this_bread);
    }
}

function func_refresh() {
    for (var i = 0; i < eater_unmatched.length; i++) {
        eater_unmatched[i].style.top = parseInt(eater_unmatched[i].style.top) + speed_eaters + "px";
        if (parseInt(eater_unmatched[i].style.top) >= window.outerHeight) {
            obj_gameBoard.removeChild(eater_unmatched[i]);
            eater_unmatched.splice(i, 1);
            document.getElementById('scoreBoard').innerText =  parseInt(document.getElementById('scoreBoard').innerText) - 10;
        }
    }
    for (var i = 0; i < eater_matched.length; i++) {
        eater_matched[i].style.top = parseInt(eater_matched[i].style.top) + speed_eaters + "px";
        if ((parseInt(bread_matched[i].style.top) - parseInt(eater_matched[i].style.top)) <= ((round_eater + round_bread) / 2)) {
            
            // obj_gameBoard.removeChild(eater_matched[i]);
            eater_matched[i].setAttribute("class", "eaters getBread");
            anim_eating(eater_matched[i]);
            obj_gameBoard.removeChild(bread_matched[i]);
            eater_matched.splice(i, 1);
            bread_matched.splice(i, 1);
            // Score ++
            document.getElementById('scoreBoard').innerText =  parseInt(document.getElementById('scoreBoard').innerText) + 1;

        }
    }
    for (var i = 0; i < bread_unmatched.length; i++) {
        bread_unmatched[i].style.top = parseInt(bread_unmatched[i].style.top) - speed_breads + "px";
        if (parseInt(bread_unmatched[i].style.top) <= 0) {
            obj_gameBoard.removeChild(bread_unmatched[i]);
            bread_unmatched.splice(i, 1);
        }
    }
    for (var i = 0; i < bread_matched.length; i++) {
        bread_matched[i].style.top = parseInt(bread_matched[i].style.top) - speed_breads + "px";
    }
}

function anim_eating(eater) {
    eater.innerHTML = '<img src="./sources/img/getbread.png" />';
    eater.style.opacity = 0;
    setTimeout(function(){
        obj_gameBoard.removeChild(eater);
    }, 500);
}

function gameStart() {
    document.getElementById('CountDown').style.opacity = 0;
    document.getElementById('CountDown').innerText = "";
    gameStop();
    document.getElementById('status').innerText = "Game Start !!!";
    setTimeout(function(){
        document.getElementById('status').style.opacity = 0;
    }, 500);
    document.getElementById('Control').style.opacity = .3;
    stopCode_geneaters = setInterval(function(){func_gen_eaters();}, interv_gen_eaters);
    stopCode_genbreads = setInterval(function(){func_gen_breads();}, interv_gen_breads);
    stopCode_Refresh = setInterval(function(){func_refresh();}, interv_refresh);
}

function gameStop() {
    closeIntro();
    document.getElementById('status').style.opacity = 1;
    document.getElementById('status').innerText = "PAUSE";
    document.getElementById('Control').style.opacity = 1;
    window.clearInterval(stopCode_geneaters);
    window.clearInterval(stopCode_genbreads);
    window.clearInterval(stopCode_Refresh);
}

function gameInitialize() {
    gameStop();
    document.getElementById('status').style.opacity = 1;
    document.getElementById('status').innerText = "Ready...";
    document.getElementById('Control').style.opacity = 1;
    obj_gameBoard.innerHTML = "";
    eater_unmatched = new Array();
    eater_matched = new Array();
    bread_unmatched = new Array();
    bread_matched = new Array();
    document.getElementById('scoreBoard').innerText = "0";
}