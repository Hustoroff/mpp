// ==UserScript==
// @name         Game of Life MPP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  John Conway’s Game of Life in MPP ¯\_(ツ)_/¯
// @author       Hustandant#8787
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mpp.terrium.net/*
// @include      *://mppfork.netlify.app/*
// @match        *.mpp.hri7566.info/*
// @match        *://mpp.autoplayer.space/*
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @grant        none
// ==/UserScript==

var mashtab = 10, matr = [], indstrt = false, webBool = false, delay = 0.5, f = 0, setTime;

MPP.client.on("a", function(msg) {
    let message = msg.a.split(" ");
    if(message[0] == "delay" && msg.p.id == MPP.client.participantId && !isNaN(Number(message[1]))) {
        delay = (Number(message[1]) > 3) ? 3 : (Number(message[1]) <= 0) ? 0.001 : Number(message[1]);
        document.getElementById("delay").innerText = delay;
    }
});

MPP.client.emit("notification", {
    title: "Game of Life script (by Hustandant#8787)",
    id:"Script_notification",
    duration:20000,
    target:"#piano",
    html:`<p><h3>F2 - start<br> F4 - clear canvas<br> Tab - grid</br></h3> ${delay} sec. - current delay (<span style="background-color: black"><font color="red">to chat "delay [min - 0.001 max - 3]"</font></span>)<br>ctrl + left mouse button - clear rect</p> Join our discord server: <a target="_blank" href="https://discord.gg/A3SDgxS2Q2">https://discord.gg/A3SDgxS2Q2<a>`
});

const statGM = document.createElement("div");
statGM.id = "statGM";
statGM.style.opacity = "1";
statGM.style.position = "fixed";
statGM.style["z-index"] = 150;
statGM.style.display = "block";
statGM.style.float = "right";
statGM.style.margin = "auto";
statGM.style.top = `${document.getElementById("piano").height}px`;
statGM.style["background-color"] = "rgba(137, 137, 137, 0.414)";
statGM.style["backdrop-filter"] = "blur(1px)";
statGM.style["font-size"] = "21px"
statGM.innerHTML = `<span id="start">Start (F2)</span>, Delay: <span id="delay">${delay}</span>`;
statGM.style.marginLeft = `${String(document.getElementById("piano").offsetLeft + document.getElementById("piano").getElementsByTagName("canvas")[0].offsetLeft)}px`;

const canvas = document.createElement("canvas");
canvas.height = parseInt(document.getElementById("piano").style["margin-top"]);
canvas.width = window.innerWidth;
canvas.id = "canv";
canvas.style.opacity = "1";
canvas.style.top = "0";
canvas.style.display = "block";
canvas.style.float = "right";
canvas.style.position = "fixed";
canvas.style.margin = "auto";canvas.style["z-index"] = 200;
canvas.style["background-color"] = "black";


const ctx = window.ctx = canvas.getContext("2d");

document.body.append(canvas);
document.body.append(statGM);

window.addEventListener("keyup", function (key) {
    key.code == "F2" ? start() : key.code == "F4" ? clearSpace() : key.code == "Tab" ? web() : console.log("ничего");
});

function start() {
    indstrt = !indstrt;
    document.getElementById("start").innerText = indstrt ? "Stop (F2)" : "Start (F2)";
    if (indstrt) scanCanvas();
};

function clearSpace() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < Math.floor(canvas.height / mashtab); i++) {
        for (var j = 0; j < Math.floor(canvas.width / mashtab); j++) {
            matr[i][j] = 0;
            ctx.fillStyle = canvas.style["background-color"] == "white" ? "white" : "black";
            ctx.fillRect(j * mashtab, i * mashtab, 10, 10);
        }
    }
    drawRect();
    if(webBool) drawWeb();
};

function web() {
    webBool = !webBool;
    drawWeb();
};

function matrDraw() {
    for (var i = 0; i < Math.floor(canvas.height / mashtab); i++) {
        matr[i] = [];
        for (var j = 0; j < Math.floor(canvas.width / mashtab); j++) {
            matr[i][j] = 0;
        }
    }
};

matrDraw();

canvas.onclick = function(event) {
    if (!indstrt && !event.ctrlKey) {
        matr[Math.floor(event.offsetY / mashtab)][Math.floor(event.offsetX / mashtab)] = 1;
        drawRect();
    } else {
        if(!indstrt && event.ctrlKey) {
            matr[Math.floor(event.offsetY / mashtab)][Math.floor(event.offsetX / mashtab)] = 0;
            drawRect();
        }
    }
};

canvas.onmousemove = (event) => {
    if(!indstrt && event.which == 1 && !event.ctrlKey) {
        matr[Math.floor(event.offsetY / mashtab)][Math.floor(event.offsetX / mashtab)] = 1;
        drawRect();
    } else {
        if(!indstrt && event.which == 1 && event.ctrlKey) {
            matr[Math.floor(event.offsetY / mashtab)][Math.floor(event.offsetX / mashtab)] = 0;
            drawRect();
        }
    }
};

function drawRect() {
    let LifeC = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < Math.floor(canvas.height / mashtab); i++) {
        for (var j = 0; j < Math.floor(canvas.width / mashtab); j++) {
            ctx.fillStyle = matr[i][j] == 1 ? "white" : "black";
            ctx.fillRect(j * mashtab, i * mashtab, 10, 10);
            if(matr[i][j] == 1) LifeC++;
        }
    }
    if(webBool) drawWeb();
};

function drawWeb() {
    if(webBool) {
        for (let i = 0; i < Math.floor(canvas.height / mashtab); i ++) {
            for (let j = 0; j < Math.floor(canvas.width / mashtab); j ++) {
                ctx.strokeStyle = webBool ? "white" : "black";
                ctx.lineWidth = webBool ? "0.2" : "1";
                ctx.strokeRect(j * mashtab, i * mashtab, 10, 10);
            }
        }
    } else {
        drawRect();
    }
};

function scanCanvas(step) {
    if(indstrt){
        let LifeC = 0;
        var arr = [];
        for (var i = 0; i < Math.floor(canvas.height / mashtab); i++) {
            arr[i] = [];
            for (var j = 0; j < Math.floor(canvas.width / mashtab); j++) {
                var c = 0;
                if(matr[i][j] == 1) LifeC++;
                if (matr[(i == 0 ? Math.floor(canvas.height / mashtab) : i) - 1][j] == 1) c++;
                if (matr[i][(j == Math.floor(canvas.width / mashtab) - 1 ? -1 : j) + 1] == 1) c++;
                if (matr[(i == Math.floor(canvas.height / mashtab) - 1 ? -1 : i) + 1][j] == 1) c++;
                if (matr[i][(j == 0 ? Math.floor(canvas.width / mashtab) : j) - 1] == 1) c++;
                if (matr[(i == 0 ? Math.floor(canvas.height / mashtab) : i) - 1][(j == Math.floor(canvas.width / mashtab) - 1 ? -1 : j) + 1] == 1) c++;
                if (matr[(i == Math.floor(canvas.height / mashtab) - 1 ? -1 : i) + 1][(j == Math.floor(canvas.width / mashtab) - 1 ? -1 : j) + 1] == 1) c++;
                if (matr[(i == Math.floor(canvas.height / mashtab) - 1 ? -1 : i) + 1][(j == 0 ? Math.floor(canvas.width / mashtab) : j) - 1] == 1) c++;
                if (matr[(i == 0 ? Math.floor(canvas.height / mashtab) : i) - 1][(j == 0 ? Math.floor(canvas.width / mashtab) : j) - 1] == 1) c++;
                arr[i][j] = matr[i][j] == 0 ? c == 3 ? 1 : 0 : c == 2 || c == 3 ? 1 : 0;
            }
        }
        matr = arr;
        drawRect();
        setTime = setTimeout(scanCanvas, delay*1000);
    }
};
