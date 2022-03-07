// ==UserScript==
// @name         VisNotes MPP
// @namespace    http://tampermonkey.net/
// @version      0.2
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
    const ctx = window.ctx = canvas.getContext("2d");
    const pixel = window.pixel = ctx.createImageData(document.getElementById("piano").querySelector("canvas").width,parseInt(document.getElementById("piano").style["margin-top"]));
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
            ctx.putImageData(pixel, 0, canvas.height - 2);

            if (lastUpdate++ == 0) {
                pixel.data.fill("");
            }
        }
        requestAnimationFrame(redraw);
    };

    redraw();
    redraw();

    window.showNote = function(note, col, ch = 0) {
        if (note in noteDB) {
            lastUpdate = 0;
            const idx = (noteDB[note] + 4) * 4;
            pixel.data[idx + 0] = pixel.data[idx + 4] = pixel.data[idx + 8] = pixel.data[idx + 12] = pixel.data[idx + 16] = pixel.data[idx + 20] = pixel.data[idx + 24] = pixel.data[idx + 28] = col[0];
            pixel.data[idx + 1] = pixel.data[idx + 5] = pixel.data[idx + 9] = pixel.data[idx + 13] = pixel.data[idx + 17] = pixel.data[idx + 21] = pixel.data[idx + 25] = pixel.data[idx + 29] = col[1];
            pixel.data[idx + 2] = pixel.data[idx + 6] = pixel.data[idx + 10] = pixel.data[idx + 14] = pixel.data[idx + 18] = pixel.data[idx + 22] = pixel.data[idx + 26] = pixel.data[idx + 30] = col[2];
            pixel.data[idx + 3] = pixel.data[idx + 7] = pixel.data[idx + 11] = pixel.data[idx + 15] = pixel.data[idx + 19] = pixel.data[idx + 23] = pixel.data[idx + 27] = pixel.data[idx + 31] = 255;
        }
    }
    canvas.style.float = "right";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    document.getElementById("piano").prepend(canvas);


const colcache = Object.create(null);
MPP.piano.renderer.__proto__.vis = MPP.piano.renderer.__proto__.visualize;
MPP.piano.renderer.__proto__.visualize = function (n, c, ch) {
  this.vis(n,c,ch);
  let co = c in colcache ? colcache[c] : Object.freeze(colcache[c] = [c[1]+c[2], c[3]+c[4], c[5]+c[6]].map(x => parseInt(x, 22)));
  showNote(n.note, co);
}
