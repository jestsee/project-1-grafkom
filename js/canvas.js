/*** SETUP CANVAS  ***/
var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

var gl = canvas.getContext("webgl");
if (!gl) {
    alert("Unable to setup WebGL. Your browser or computer may not support it");
}

// TODO nanti ganti warna putih
// bisa ganti di css juga sih
gl.clearColor(0, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
