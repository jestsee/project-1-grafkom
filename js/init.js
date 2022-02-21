// vertex shader
const _vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// fragment shader
const _fragment = `
precision highp float;
uniform vec4 color;
void main() {
  gl_FragColor = color;
}`;

// compiling shaders
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, _vertex);
gl.compileShader(vertexShader);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, _fragment);
gl.compileShader(fragmentShader);

// Program
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
