// ==UserScript==
// @name         PC sheet field
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Script for pc players
// @author       Hustandant#8787
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mpp.terrium.net/*
// @include      *://mppfork.netlify.app/*
// @match        *.mpp.hri7566.info/*
// @match        *://mpp.autoplayer.space/*
// @license      MIT
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @grant        none
// ==/UserScript==
$("#bottom .relative").append(`<div id="pc_btn" class="ugly-button">PC field</div>`);

$("#pc_btn").css({position: "absolute", left: "1020px", top: "4px"}).on("click", () => {
    MPP.client.emit("notification", {
        title: "PC sheet field (script by Hustandant#8787)",
        id:"area_notification",
        duration:-1,
        target:"#piano",
        html:`<textarea id="pcArea" oninput="resize()" onmousedown="resize()" placeholder="Your sheets..."></textarea><div>Show saved sheets <input id="checkSheet" type="checkbox" onclick="sheet()"></div>
        <script>
        setTimeout(load, 10);
        function load() {
           document.getElementById("checkSheet").checked = JSON.parse(localStorage.getItem("check"));
           document.getElementById("checkSheet").checked && sheet();
        }
        function sheet() {
           localStorage.setItem("check", JSON.parse(document.getElementById("checkSheet").checked));
           if(document.getElementById("checkSheet").checked) {
              document.getElementById("pcArea").value = localStorage.getItem("sheets");
              resize();
           } else { document.getElementById("pcArea").value = "" }
        }
        function resize() {
           document.getElementById("pcArea").parentNode.parentNode.style.width = "100%";
           localStorage.setItem("sheets", document.getElementById("pcArea").value)
        }
        </script>`
    });
});
