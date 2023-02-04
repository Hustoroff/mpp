// ==UserScript==
// @name         PC sheet field
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Script for pc players
// @author       Hustandant#1917
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mppfork.netlify.app/*
// @match        *.mpp.hri7566.info/*
// @match        *://mpp.autoplayer.xyz/*
// @license      MIT
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @grant        none
// ==/UserScript==
window.addEventListener('DOMContentLoaded', (event) => {
    $("#bottom .relative").append(`<div id="pc_btn" class="ugly-button">PC field</div>`);
    $("#pc_btn").css({position: "absolute", left: "1020px", top: "4px"}).on("click", () => {
        MPP.client.emit("notification", {
            title: "PC sheet field (script by Hustandant#1917)",
            id:"area_notification",
            duration:-1,
            target:"#piano",
            html:`<textarea id="pcArea"  placeholder="Your sheets..."></textarea><div><h4>More sheets <a href="https://controlc.com/6aa4340f" target="_blank">here</a></h4></div>`
        });
        let area = document.getElementById("pcArea");
        area.innerText = localStorage.getItem("sheets");
        area.parentNode.parentNode.style.width = "100%";
        area.addEventListener("input", () => {
            localStorage.setItem("sheets", area.value);
        });

        let div = document.getElementById("Notification-area_notification").getElementsByClassName("title")[0];
        let elem = document.getElementById("Notification-area_notification");
        div.addEventListener("mousedown", function(evt) {
            evt.preventDefault();
            let xStart = evt.clientX;
            let yStart = evt.clientY;
            var onMouseMove = function (evtMove){
                evtMove.preventDefault();
                var xNew = xStart - evtMove.clientX;
                var yNew = yStart - evtMove.clientY;
                xStart = evtMove.clientX;
                yStart = evtMove.clientY;
                elem.style.top = (elem.offsetTop - yNew) + 'px';
                elem.style.left = (elem.offsetLeft - xNew) + 'px';
            }
            var onMouseUp = function (evtUp){
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        });
    });
});
