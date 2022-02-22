/*** SETUP SHADER  ***/

// Vertex shader source code
var vertCode =
   'attribute vec3 coordinates;' +
   'void main(void) {' +
      ' gl_Position = vec4(coordinates, 1.0);' +
   '}';

var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

// Fragment shader source code
var fragCode =
   'void main(void) {' +
      ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
   '}';

var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);

gl.compileShader(fragShader);

// Create a shader program object to
// store the combined shader program
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);