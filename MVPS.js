// ==UserScript==
// @name         MVPS
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  MVPS [Multi Visual Piano Script] designed to expand the technical and visual capabilities of the MPP
// @author       Hustandant#8787
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mpp.terrium.net/*
// @match        *.mpp.hri7566.info/*
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @updateURL    https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @downloadURL  https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @resource     https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @grant        none
// ==/UserScript==

function adnot(){
MPP.client.emit("notification", {

		title: "Multi Visual Piano Script (by Hustandant#8787)",
        id:"MVPS_notification",
		duration:8000,
        target:"#chat-input",
        html:`<p>MVPS [Multi Visual Piano Script] was created by Hustandant to enhance the site's capabilities. If you would like to suggest an idea or report a bug please contact Hustandant#8787.</br></p> Join our discord server: <a target="_blank" href="https://discord.gg/tm6EYtAAmV">https://discord.gg/tm6EYtAAmV<a>`
});
}

MPP.client.on("a", msg => {
    if(msg.p.id != MPP.client.participantId)
        playSound('https://audiokaif.ru/wp-content/uploads/2019/04/5-%D0%97%D0%B2%D1%83%D0%BA-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-facebook.mp3');
        });
MPP.client.on("dm", msg =>{
     playSound_2('https://audiokaif.ru/wp-content/uploads/2019/04/13-%D0%97%D0%B2%D1%83%D0%BA-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-%D0%B4%D0%B8%D1%81%D0%BA%D0%BE%D1%80%D0%B4%D0%B5.mp3')
});


function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

function playSound_2(url) {
  const audio = new Audio(url);
  audio.play();
}

setTimeout(adnot, 2000);



// MPP tools script by Jacob [https://greasyfork.org/ru/users/779512-jakob] (thx a lot :3)

MPP.client.on('a', () => {
  const msgElem = $('.message').last();
  msgElem.html(linkify(msgElem.text()));
});

function linkify(text) {
  let replacedText;

  // URLs starting with http://, https://, or ftp://
  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  // Change email addresses to mailto:: links.
  const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}

// DRAW script by Hri7566 [https://github.com/Hri7566] (thx a lot :3)
EXT = window.EXT || {_initfunc: []};
window.onload = function(){
	MPP = MPP || {};
	MPP.addons = EXT;
	for(var x = EXT._initfunc.length; x--;)
		EXT._initfunc[x]();
	EXT.__proto__ = null;
};

/* By ming, v3 */
EXT = window.EXT || {_initfunc: []};
EXT._initfunc.push(function(){
	var addon = EXT.draw = {__proto__: null};
	addon.lineLife = 10;
	var p = document.createElement("canvas");
	p.id = "drawboard";
	p.style = "position: absolute; top: 0; left: 0; z-index: 400; pointer-events: none;";
	p.width = window.innerWidth;
	p.height = window.innerHeight;
	document.body.appendChild(p);
	var dbctx = p.getContext("2d");
	var shifted = false;
	var clicking = false;
	$(document).on('mousedown', (e)=>{ if(e.shiftKey){ clicking = true; draw(); e.preventDefault(); }});
	$(document).on('mouseup', (e)=>{ clicking = false; });
	$(document).on('keyup keydown', (e)=>{ shifted = e.shiftKey; });

	addon.enabled = true;
	addon.customColor = null;
	addon.ctx = dbctx;
	addon.onrefresh = [];
	addon.brushSize = 2;
	addon.mutes = [];
	addon.lines = [];
	addon.buf = [{n: "ldraw", v: 0}];
	function resize(){
		p.width = window.innerWidth;
		p.height = window.innerHeight;
	}
	window.addEventListener('resize', resize, false);
	addon.flushloop = setInterval(()=>{
		var t = Date.now();
		if(addon.buf.length != 1){
			if(addon.buf.length>1)
				MPP.client.sendArray([{m: "custom", data: {m: 'draw', t: t, n: addon.buf}, target: { mode: 'subscribed' } }]);
			addon.buf = [{n: "ldraw", v: 0}];
		}
	}, 1000/60/16);
	addon.onrefresh.push(function(t){
		if(addon.lines.length){
                        dbctx.clearRect(0,0,window.innerWidth, window.innerHeight);
                        for(var l = 0; l<addon.lines.length;l++){
                        dbctx.globalAlpha = 1;
                        var c=addon.lines[l];
                        dbctx.strokeStyle = c[6];
                        dbctx.lineWidth = c[5];
                        var d = addon.lineLife - (t - c[4]) / 1000;
                        if(d <= 0){
                                addon.lines.splice(l--, 1);
                                continue;
                        }
                        dbctx.globalAlpha = 0.3 * d;
                        dbctx.beginPath();
                        dbctx.moveTo(c[0], c[1]);
                        dbctx.lineTo(c[2], c[3]);
                        dbctx.stroke();
	        	}
		}
	});
	function redraw(){
		if(addon.enabled){
			var t = Date.now();
			for(var x = 0; x < addon.onrefresh.length; x++){
				addon.onrefresh[x](t);
			}
		}
		/*window.requestAnimationFrame(redraw);*/
	}
	/*window.requestAnimationFrame(redraw);*/
	setInterval(redraw, 1000/60/16);
	/* https://stackoverflow.com/a/8639991 */
	function stringToBytesFaster(str) {
		var ch, st, re = [], j=0;
		for (var i = 0; i < str.length; i++ ) {
			ch = str.charCodeAt(i);
			if(ch < 127){
			re[j++] = ch & 0xFF;
			} else {
			st = [];
			do {
				st.push(ch & 0xFF);
				ch = ch >> 8;
			} while (ch);
			st = st.reverse();
			for(var k=0;k<st.length; ++k)
				re[j++] = st[k];
			}
		}
		return re;
	}
	function parseLine(str, color, size){
		var vector = [0, 0, 0, 0, Date.now(), 1, color];
		var bytes = stringToBytesFaster(str);
		vector[0] = Math.round(((100 / 255) * bytes[0]/100) * window.innerWidth);
		vector[1] = Math.round(((100 / 255) * bytes[1]/100) * window.innerHeight);
		vector[2] = Math.round(((100 / 255) * bytes[2]/100) * window.innerWidth);
		vector[3] = Math.round(((100 / 255) * bytes[3]/100) * window.innerHeight);
		vector[5] = size;
		addon.lines.push(vector);
	}
	function draw(){
		var u = MPP.client.getOwnParticipant();
		u.y = Math.max(Math.min(100,u.y), 0);
		u.x = Math.max(Math.min(100,u.x), 0);
		var lastpos = [u.x, u.y];
		var b = new ArrayBuffer(4);
		var dv = new DataView(b);
		dv.setUint8(0, Math.round(u.x/100 * 255));
		dv.setUint8(1, Math.round(u.y/100 * 255));
		function poll(){
			if(lastpos[0] != u.x || lastpos[1] != u.y){
				u.y = Math.max(Math.min(100,u.y), 0);
				u.x = Math.max(Math.min(100,u.x), 0);
				dv.setUint8(2, Math.round(u.x/100 * 255));
				dv.setUint8(3, Math.round(u.y/100 * 255));
				var s = String.fromCharCode.apply(null, new Uint8Array(b));
				var clr = addon.customColor
				addon.buf.push({n: s, v: Math.min(addon.brushSize, 200), d: parseInt(clr.slice(1), 16)});
				dv.setUint8(0, Math.round(u.x/100 * 255));
				dv.setUint8(1, Math.round(u.y/100 * 255));
				lastpos = [u.x, u.y];
				parseLine(s, clr, Math.min(addon.brushSize, 10));
			}
			if(clicking)
				setTimeout(poll, 25);
		}
		setTimeout(poll, 25);
	}

	addon.mkline = function(x, y, x2, y2, s, color){
		if(x<0||y<0||x2<0||y2<0||x>255||y>255||x2>255||y2>255)return;
		var b = new ArrayBuffer(4);
		var dv = new DataView(b);
		dv.setUint8(0, x);
		dv.setUint8(1, y);
		dv.setUint8(2, x2);
		dv.setUint8(3, y2);
		var str = String.fromCharCode.apply(null, new Uint8Array(b));
		var clr = color || addon.customColor || MPP.client.getOwnParticipant().color;
		addon.buf.push({n: str, v: Math.min(s||1, 5), d: parseInt(clr.slice(1), 16)});
		parseLine(str, clr, Math.min(s||1, 5));
	}
	addon.tohtml = function(c) {
		c = c.toString(16);
		return '#' + ('000000' + c).substring(c.length);
	};
	MPP.client.on('custom', (msg) => {
        if (msg.data.m !== 'draw') return;
		if(msg.data.n[0].n == "ldraw" && addon.mutes.indexOf(MPP.client.findParticipantById(msg.data.p)._id) === -1){
			msg.data.n.reduce(function(a, b){
				if(b.n.length == 4){
					var clr = (b.d !== undefined && addon.tohtml(b.d)) || MPP.client.findParticipantById(msg.data.p).color;
					parseLine(b.n, clr, Math.min(b.v,5));
				}
			});
		}
	});
	MPP.client.on('c', ()=>{
		addon.lines = [[0,0,0,0,0,0,"#0"]];
	});

    MPP.client.on('hi', () => {
        if (!MPP.client.customSubscribed) {
            MPP.client.sendArray([{m:"+custom"}]);
            MPP.client.customSubscribed = true;
        }
    });
});

// Visualization of notes script by Chacha-26 [chacha-26@protonmail.com] (thx a lot :3)

const canvas = document.createElement("canvas");
    canvas.height = 128 * 2;
    canvas.width = window.innerWidth;

    canvas.id = "track_of_notes";
    canvas.style = "opacity: 0;";
    const ctx = window.ctx = canvas.getContext("2d");
    const pixel = window.pixel = ctx.createImageData(1,128*2);
    pixel.data.fill(0);
    let lastUpdate = 0;
    $("#track_of_notes").css({ })
    const noteDB = Object.freeze({
        __proto__: null,
        'c-2':  0, 'cs-2':  1, 'd-2':  2, 'ds-2':  3, 'e-2':  4, 'f-2':  5, 'fs-2':  6, 'g-2':  7, 'gs-2':  8, 'a-2':  9, 'as-2': 10, 'b-2': 11,
        'c-1': 12, 'cs-1': 13, 'd-1': 14, 'ds-1': 15, 'e-1': 16, 'f-1': 17, 'fs-1': 18, 'g-1': 19, 'gs-1': 20, 'a-1': 21, 'as-1': 22, 'b-1': 23,
        c0: 24, cs0: 25, d0: 26, ds0: 27, e0: 28, f0: 29, fs0: 30, g0: 31, gs0: 32, a0: 33, as0: 34, b0: 35,
        c1: 36, cs1: 37, d1: 38, ds1: 39, e1: 40, f1: 41, fs1: 42, g1: 43, gs1: 44, a1: 45, as1: 46, b1: 47,
        c2: 48, cs2: 49, d2: 50, ds2: 51, e2: 52, f2: 53, fs2: 54, g2: 55, gs2: 56, a2: 57, as2: 58, b2: 59,
        c3: 60, cs3: 61, d3: 62, ds3: 63, e3: 64, f3: 65, fs3: 66, g3: 67, gs3: 68, a3: 69, as3: 70, b3: 71,
        c4: 72, cs4: 73, d4: 74, ds4: 75, e4: 76, f4: 77, fs4: 78, g4: 79, gs4: 80, a4: 81, as4: 82, b4: 83,
        c5: 84, cs5: 85, d5: 86, ds5: 87, e5: 88, f5: 89, fs5: 90, g5: 91, gs5: 92, a5: 93, as5: 94, b5: 95,
        c6: 96, cs6: 97, d6: 98, ds6: 99, e6: 100, f6: 101, fs6: 102, g6: 103, gs6: 104, a6: 105, as6: 106, b6: 107,
        c7: 108, cs7: 109, d7: 110, ds7: 111, e7: 112, f7: 113, fs7: 114, g7: 115, gs7: 116, a7: 117, as7: 118, b7: 119, c8: 120,
        cs8: 121, d8: 122, ds8: 123, e8: 124, f8: 125, fs8: 126, g8: 127
    });

    let onlyevery = 4, counter = 0;

    window.redraw = function() {
        if (lastUpdate <= canvas.width && counter++ % 4 == 0) {

            const lo = noteDB['gs-1'] * 8 + 4;
            const hi = noteDB['c7'] * 8;

            ctx.globalCompositeOperation = "copy";
            ctx.drawImage(ctx.canvas, -2, 0);
            // reset back to normal for subsequent operations.
            ctx.globalCompositeOperation = "source-over";

            pixel.data[0] = pixel.data[1] = pixel.data[2] = 0;
            pixel.data[3] = 255;

            pixel.data[lo] = pixel.data[lo+1] = pixel.data[lo+2] = 0;
            pixel.data[lo+3] = 255;

            pixel.data[hi] = pixel.data[hi+1] = pixel.data[hi+2] = 0;
            pixel.data[hi+3] = 255;

            pixel.data[1020] = pixel.data[1021] = pixel.data[1022] = 0;
            pixel.data[1023] = 255;

            ctx.putImageData(pixel, canvas.width - 1, 0);
            ctx.putImageData(pixel, canvas.width - 2, 0);

            if (lastUpdate++ == 0) {
                pixel.data.fill(0x7f);
            }
        }
        requestAnimationFrame(redraw);
    };

    redraw();

    window.showNote = function(note, col, ch = 0) {
        if (note in noteDB) {
            lastUpdate = 0;
            const idx = (127 - noteDB[note]) * 8;
            pixel.data[idx + 0] = pixel.data[idx + 4] = col[0];
            pixel.data[idx + 1] = pixel.data[idx + 5] = col[1];
            pixel.data[idx + 2] = pixel.data[idx + 6] = col[2];
            pixel.data[idx + 3] = pixel.data[idx + 7] = 255;
        }
    }

    /*window.canvastest = new Popup({
        id: "canvastest",
        title: "canvas test",
        text: canvas,
        target: "body",
        align: "right",
        pinned: "true",
    });*/
    canvas.style.float = "right";
    canvas.style.position = "fixed";
    canvas.style.top = "3.5ch"
    document.body.appendChild(canvas);


const colcache = Object.create(null);
MPP.piano.renderer.__proto__.vis = MPP.piano.renderer.__proto__.visualize;
MPP.piano.renderer.__proto__.visualize = function (n, c, ch) {
  this.vis(n,c,ch);
  let co = c in colcache ? colcache[c] : Object.freeze(colcache[c] = [c[1]+c[2], c[3]+c[4], c[5]+c[6]].map(x => parseInt(x, 16)));
  showNote(n.note, co);
}


//Rainbow room mode script
var count = 0;
var size = 100;
var rainbow = new Array(size);


for (var i = 0; i < size; i++) {
    var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
    var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
    var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg


    rainbow[i] = "#" + red + green + blue;
}


function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);


    return hex.length === 1 ? "0" + hex : hex;
}





$("#bottom .relative").append(`<div id="MVPS" class="ugly-button 2_btn">MVPS</div>`);
$("#MVPS").css({position: "absolute", left: "780px", top: "32px"}).on("click", () => {
    var MVPS_not = false;
    MVPS_not =!MVPS_not
    if(MVPS_not){
MPP.client.emit("notification", {

		title: "Multi Visual Piano Script (by Hustandant#8787)",
        id:"MVPS_notification",
		duration:-1,
        target:"#MVPS",
        html:`
        <script>
        var pianospinbool = false;
        var backimg = false;
        var rainbowmodename = false;
        var rainbowmodenote = false;
        var rainbowmode = false;
        var pc_wind = false;
        var backg = false;
        var piano = true;
        var chat_hide = false;
        var cursor_hide = false;
        var names_hide = false;
        var drawboard_hide = true;
        var visnoted = false;
        var rainbownick = false;
        var invsblcrsr = false;
        var url_past_img = "https://mpp.terrium.net/meow64.png";
        var url_back = "https://steamuserimages-a.akamaihd.net/ugc/878625026160084538/0399E81B0D1CF96C853CFCC1288D3E0A3D708049/?imw=1024&imh=819&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true";

        function showpreview1(e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            url_back = e.target.result;
            background_del();
            };
        //Imagepath.files[0] is blob type
        reader.readAsDataURL(e.files[0]);
        }

        function showpreview2(e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            url_past_img = e.target.result;
            };
        //Imagepath.files[0] is blob type
        reader.readAsDataURL(e.files[0]);
        }

        //MPP draw image script by Ledlamp [https://gist.github.com/ledlamp/ef0d4db05a49fb795ec59cf96bedbf26] (thx a lot :3)

function paste_image(){
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawPixel(x, y, color) {
  MPP.addons.draw.mkline(x-1,y,x,y,10,color)
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var img = document.createElement("img");
img.crossOrigin = "Anonymous";
img.addEventListener('load', function(){
    console.log(img);
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var c = canvas.getContext('2d');
    c.drawImage(img, 0, 0, img.width, img.height);
    console.log(canvas);

    var pos1 = [128-img.width/2,128-img.height/2], pos2 = [128+img.width/2,128+img.height/2];
    //var pos1 = [0,0], pos2 = [64,64];

    var ii=0;
    for (let x = pos1[0], xo = 0; x < pos2[0]; x++, xo++)
    for (let y = pos1[1], yo = 0; y < pos2[1]; y++, yo++) {
      setTimeout(()=>{
          var rgb = c.getImageData(xo,yo, 1, 1).data;
          drawPixel(x,y, rgbToHex(rgb[0], rgb[1], rgb[2]));
      } ,++ii * 10);
    }
});
img.src = url_past_img;
}



        function pc_sheet_wind(){
         if(pc_wind){
         $("#chat").append(\`<textarea id="pc-wind" autocomplete="off" placeholder="Your sheet here..." ></textarea>\`);
         $("#pc-wind").css({resize: "none", height: "266px", width: window.innerWidth, overflow:"hidden", "border-radius": "8px"})
         }
         else{
         $("#pc-wind").remove()
         }}

         function background_del(){
     if(backg){
        var d=document.createElement('div');
        d.style.width = '1280px';
        d.style.height = '913px';
        d.style.position = 'absolute';
        d.style.top= '0px';
        d.style.left= '0px';
        d.id='backgdiv'
      document.body.appendChild(d);
         $("#backgdiv").css({width: window.innerWidth, height: window.innerHeight, "background-position": "25% 25%", "background-size": "cover", "backdrop-effect": "blur(4px)", "background-image": "url("+url_back+")"})
         console.log(url_back)
     }
    else{
        $("#backgdiv").remove();
    }
    }

    function piano_delete(){
     if(piano){
         $("#piano").css({opacity: "1"})
     }
    else{
    $("#piano").css({opacity: "0"})
    }
    }

    function chat_clear(){
     $('ul').empty();
    }

    function chat_hde(){
    if(chat_hide){
    $('ul').css({opacity: "0"});
    }
    else{
    $('ul').css({opacity: "1"});
    }
    }

    function cursor_hde(){
    if(cursor_hide){
    $('#cursors').css({opacity: "0"});
    }
    else{
    $('#cursors').css({opacity: "1"});
    }
    }

    function names_hde(){
    if(names_hide){
    $("#names").css({opacity: "0"});
    }
    else{
    $("#names").css({opacity: "1"});
    }
    }

    function drawboard_hde(){
    if(drawboard_hide){
    $("#drawboard").css({opacity: "1"});
    }
    else{
    $("#drawboard").css({opacity: "0"});
    }
    }

    function visnote_hde(){
    if(visnoted){
    $("#track_of_notes").css({opacity: "1", "z-index": "399"});
    }
    else{
    $("#track_of_notes").css({opacity: "0"});
    }
    }

    function pinospn(){
    $("#piano").classList.toggle("spin")

    }

    var count = 0;
    var size = 100;
    var rainbow = new Array(size);


    for (var i = 0; i < size; i++) {
        var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
        var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
        var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg


        rainbow[i] = "#" + red + green + blue;
    }


    function sin_to_hex(i, phase) {
        var sin = Math.sin(Math.PI / size * 2 * i + phase);
        var int = Math.floor(sin * 127) + 128;
        var hex = int.toString(16);


        return hex.length === 1 ? "0" + hex : hex;
    }

    // Rainbow mode script
    setInterval(function() {
        if(rainbowmodename){
        if (count > rainbow.length)  count = 0;
			    MPP.addons.draw.customColor = rainbow[count]
        count++;
        }}, 33);

    //Rainbow room mode script
    setInterval(function() {

    if (rainbowmode && MPP.client.isOwner()) {
    if (count > rainbow.length) count = 0;
        {
    MPP.client.sendArray([{
        m: "chset", set: {
            visible: MPP.client.channel.settings.visible,
                chat: MPP.client.channel.settings.chat,
                crownsolo: MPP.client.channel.settings.crownsolo,
            color: rainbow[count],
            id: MPP.client.getOwnParticipant().id
        }

    }]);}}
    count++;
    }, 500);

    setInterval(function() {
    if(rainbowmodenote){
    if (count > rainbow.length) count = 0;
			    id = MPP.client.getOwnParticipant()
			    id.color = rainbow[count]
        count++;
    }
    if(rainbownick){
    if (count > rainbow.length) count = 0;
			    $("#namediv-"+MPP.client.getOwnParticipant().id).css({"background-color": rainbow[count]})
        count++;
    }


    }, 33);
    setInterval(function() {
if(invsblcrsr){
    MPP.client.sendArray([{m:'m', x: 100000, y: 100000}]);
    }
    },12);
    function pianospn(){
    $("#piano").toggleClass("spin", pianospinbool)
    }



        </script>

        <div id="visual_block" style="border-radius: 10px; background-color: #171115; border: 2px solid #333; padding: 4px 12px">
        <h3>Visual:</h3></p>
        <div id="pianodel" class="ugly-button" onclick='piano = !piano, piano_delete();'>Piano deleter</div>
        <div id="cht-clr" class="ugly-button" onclick='chat_clear()'>Clear chat</div>
        <div id="cht-hdn" class="ugly-button" onclick='chat_hide=!chat_hide, chat_hde()'>Hide chat</div>
        <div id="crsr-hdn" class="ugly-button" onclick='cursor_hide=!cursor_hide, cursor_hde()'>Hide cursor</div>
        <div id="nms-hdn" class="ugly-button" onclick='names_hide=!names_hide, names_hde()'>Hide names</div>
        <input type="text" id="inp-back" placeholder="New backround (Image URL)" oninput='url_back = document.getElementById(\`inp-back\`).value'><button id="back" onclick='backg = !backg, background_del();'>Background</button></input></br>
        Load background file:<input type="file" id="inp-backimg" oninput='showpreview1(this)'></input>
        </div></br>
        <div id="draw_block" style="border-radius: 10px; background-color: #171115; border: 2px solid #333; padding: 4px 12px">
        <h3>Drawing:</h3></p>
        <div id="clear-btn" class="ugly-button" onclick='MPP.addons.draw.lines = [[0,0,0,0,0,0,"#0"]]'>Clear Drawings</div>
        <div id="drwbrd-hdn" class="ugly-button" onclick='drawboard_hide = !drawboard_hide, drawboard_hde()'>Drawboard hide</div>
        <div id="rnbwmd" class="ugly-button" onclick='rainbowmodename = !rainbowmodename'>Rainbow lines</div>
        <input id="line_time" type="range" min="1" max="250" title="line lifetime" oninput="MPP.addons.draw.lineLife = document.getElementById(\`line_time\`).value"></input>
        <input id="clr_chng" type="color"><button id="clr-btn" onclick='MPP.addons.draw.customColor=document.getElementById(\`clr_chng\`).value'>Select color</button></input>
        <input id="line_size"type="range" min="1" max="10" title="brush size" oninput="MPP.addons.draw.brushSize = document.getElementById(\`line_size\`).value"></input></br>
        </div></br>
        <div id="other_block" style="border-radius: 10px; background-color: #171115; border: 2px solid #333; padding: 4px 12px">
        <h3>Other settings:</h3>
        <div id="pc-btn" class="ugly-button" onclick='pc_wind = !pc_wind, pc_sheet_wind()'>PC sheet</div>
        <div id="visnote-clr" class="ugly-button" onclick='visnoted = !visnoted, visnote_hde()'>Visual notes</div>
        <div id="invsblcrsr" class="ugly-button" onclick="invsblcrsr = !invsblcrsr">Invisible cursor</div>
        <div id="rnbw" class="ugly-button" onclick='rainbowmode = !rainbowmode' title="ANIME!?!?!??!?!?!??!?!??!?!">Rainbow room</div>
        <div id="rnbwnt" class="ugly-button" onclick='rainbowmodenote = !rainbowmodenote'>Rainbow notes</div>
        <div id="rnnbwnick" class="ugly-button" onclick='rainbownick = !rainbownick'>Rainbow nick</div>
        <div id="pnospn" class="ugly-button" onclick='pianospinbool = !pianospinbool, pianospn()'>Spin piano</div>
        <input type="text" id="inp-img" placeholder="Paste image (Image URL)" oninput='url_past_img = document.getElementById(\`inp-img\`).value'><button id="paste_img" onclick='paste_image(url_past_img)'>Paste image</button></input></br>
        Load image file:</br><input type="file" id="inp-pastimg" oninput='showpreview2(this)'></input>
        </div>
        <div id="ad_block" style="border-radius: 10px; background-color: #171115; border: 2px solid #333; padding: 4px 12px">
        Thanks for using MVPS (◕‿◕✿). Join our discord server: <a target="_blank" href="https://discord.gg/tm6EYtAAmV">https://discord.gg/tm6EYtAAmV<a>
        </div>
        `
	});
    }
});
