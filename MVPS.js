// ==UserScript==
// @name         MVPS
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  MVPS [Multi Visual Piano Script] designed to expand the technical and visual capabilities of the MPP
// @author       Hustandant#1917
// @match        *://mppclone.com/*
// @include      *://www.multiplayerpiano.com/*
// @include      *://multiplayerpiano.com/*
// @include      *://piano.ourworldofpixels.com/*
// @include      *://mpp.terrium.net/*
// @match        *.mpp.hri7566.info/*
// @match        *://mpp-terrium2.glitch.me/*
// @match        https://mpp.autoplayer.space/
// @icon         https://github.com/Hustoroff/mpp/blob/main/icon.png?raw=true
// @updateURL    https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @downloadURL  https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @resource     https://raw.githubusercontent.com/Hustoroff/mpp/main/MVPS.js
// @grant        none
// ==/UserScript==

function adnot(){
MPP.client.emit("notification", {

		title: "Multi Visual Piano Script (by Hustandant#1917)",
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

setTimeout(adnot, 500);

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
$("#MVPS").css({position: "absolute", left: "1020px", top: "32px"}).on("click", () => {
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


    function chat_clear(){
     $('ul').empty();
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
    MPP.client.sendArray([{m:'m', x: 10000, y: 10000}]);
    }
    },16);
    function pianospn(){
    $("#piano").toggleClass("spin", pianospinbool)
    }



        </script>

        <div id="visual_block" style="border-radius: 10px; background-color: #171115; border: 2px solid #333; padding: 4px 12px">
        <h3>Visual:</h3></p>
        <div id="cht-clr" class="ugly-button" onclick='chat_clear()'>Clear chat</div>
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
