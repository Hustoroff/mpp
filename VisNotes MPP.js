// ==UserScript==
// @name         VisNotes MPP
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Visualization of notes (based on Chacha-26 script)
// @author       Hustandant#8787
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mpp.terrium.net/*
// @match        *.mpp.hri7566.info/*
// @match        *://mpp.autoplayer.space/*
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @grant        none
// ==/UserScript==

const canvas = document.createElement("canvas");
    canvas.height = parseInt(document.getElementById("piano").style["margin-top"]);
    canvas.width = document.getElementById("piano").querySelector("canvas").width;
    canvas.id = "track_of_notes";
    canvas.style.opacity = "1";
    canvas.style.top = "0";
    canvas.style.float = "right";
    canvas.style.position = "fixed";
    canvas.style.margin = "auto";
    canvas.style.marginLeft = `${String(document.getElementById("piano").offsetLeft + document.getElementById("piano").getElementsByTagName("canvas")[0].offsetLeft)}px`;
    canvas.style["z-index"] = 250;

    const ctx = window.ctx = canvas.getContext("2d");
    const pixel = window.pixel = ctx.createImageData(document.getElementById("piano").querySelector("canvas").width,canvas.height);
    pixel.data.fill(0);
    let lastUpdate = 0;
    const noteDB = {};

    Object.keys(MPP.piano.keys).forEach(key => noteDB[key] = MPP.piano.keys[key].rect.x);
    let onlyevery = 4, counter = 0;

    window.redraw = function() {
        if (lastUpdate <= canvas.height && counter++ % 4 == 0) {

            ctx.globalCompositeOperation = "copy";
            ctx.drawImage(ctx.canvas, 0, -1);
            ctx.globalCompositeOperation = "source-over";

            ctx.putImageData(pixel, 0, canvas.height - 1);
            if (lastUpdate++ == 0) {
                pixel.data.fill();
            }
        }
        requestAnimationFrame(redraw);
    };

    redraw();
    redraw();
    redraw();

    window.showNote = function(note, col, ch = 0) {
        if (note in noteDB) {
            lastUpdate = 0;
            const idx = (noteDB[note]) * 4;
            if(note.split("").includes("s")) {
                let otS = ((MPP.piano.keys[note].rect.w - Math.round(MPP.piano.renderer.blackBlipWidth))/2)*4;
                for(let i=0; i<(MPP.piano.renderer.blackBlipWidth)*4; i+=4){
                    pixel.data[idx + otS + i] = col[0];
                    pixel.data[idx + otS + i + 1] = col[1];
                    pixel.data[idx + otS + i + 2] = col[2];
                    pixel.data[idx + otS + i + 3] = 255;
                }
            } else {
                let ot = (Math.round((MPP.piano.keys[note].rect.w - Math.round(MPP.piano.renderer.whiteBlipWidth))/2))*4;
                for(let i=0; i<(MPP.piano.renderer.whiteBlipWidth)*4; i+=4){
                    pixel.data[idx + ot + i] = col[0];
                    pixel.data[idx + ot + i + 1] = col[1];
                    pixel.data[idx + ot + i + 2] = col[2];
                    pixel.data[idx + ot + i + 3] = 255;
                }
            }
        }
    }

    document.body.append(canvas);

$(window).resize(function() {
  canvas.height = parseInt(document.getElementById("piano").style["margin-top"]);
  canvas.width = Number(document.getElementById("piano").querySelector("canvas").style.width.replace(/[a-zа-яё]/gi, ''));
  canvas.style.marginLeft = `${String(document.getElementById("piano").offsetLeft + document.getElementById("piano").getElementsByTagName("canvas")[0].offsetLeft)}px`;
})

const colcache = Object.create(null);
MPP.piano.renderer.__proto__.vis = MPP.piano.renderer.__proto__.visualize;
MPP.piano.renderer.__proto__.visualize = function (n, c, ch) {
  this.vis(n,c,ch);
  let co = c in colcache ? colcache[c] : Object.freeze(colcache[c] = [c[1]+c[2], c[3]+c[4], c[5]+c[6]].map(x => parseInt(x, 22)));
  showNote(n.note, co);
}
