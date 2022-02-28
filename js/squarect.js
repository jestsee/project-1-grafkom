
// // get canvas and webgl context
// const canvas = document.getElementById("canvas");

// // resizing canvas spy jelas
// // canvas.width  = canvas.clientWidth;
// // canvas.height = canvas.clientHeight;

// // viewport
// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// STEP 1 : CREATE SHADERS AND THE PROGRAM
// locate tempat di GLSL to *bikin shader*
const vertexShaderSource = document.getElementById("vertex-shader").text;
const fragmentShaderSource = document.getElementById("fragment-shader").text;


// *bikin shader*
const vertexShader2 = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader2 = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);


// create program
const program2 = createProgram(gl, vertexShader2, fragmentShader2);

//att and uniform locaitons
var positionAttributeLocation2 = gl.getAttribLocation(program2, "a_position");
var colorAttributeLocation2 = gl.getAttribLocation(program2, "a_color");
var resolutionUniformLocation2 = gl.getUniformLocation(program2, "u_resolution");



// initial conditions

// var idxNowShape = 0;
// var action = "draw";
// var mode = 0; // default mode = pen (0)
// var objects = [];
// var colorRGB = [0, 0, 0]; // default color black
// var mouseClicked = false;


// event listeners





// CLEAR BUTTON
// const clr = document.getElementById("clearBtn");
// clr.addEventListener("click", function(e){
//   idxNowShape = 0;
//   objects = [];
//   drawToScreen();
// });

// //CHANGE MODES
// const pen = document.getElementById("penBtn");
// pen.addEventListener("click", function(e){
//   action = "draw";
//   mode = 0;
// });

// const line = document.getElementById("lineBtn");
// line.addEventListener("click", function(e){
//   action = "draw";
//   mode = 1;
// });

function sqr(e){
  sqrrectMode = true;
  action = "draw";
  mode = 2;
  console.log(action);
}

function rect(e){
  sqrrectMode = true;
  action = "draw";
  mode = 3;
  console.log(action);
}

function edit(e){
  sqrrectMode = true;
  action = "edit";
  console.log(action);
}

function move(e){
  sqrrectMode = true;
  action = "move";
  console.log(action);
}

//COLOR PICKER
function changecolor(e){
  var color = document.getElementById('color').value;
  const RGBval = hexToRGB(color);
  colorRGB[0] = RGBval[0];
  colorRGB[1] = RGBval[1];
  colorRGB[2] = RGBval[2];
}


function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
   
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

function hexToRGB(hex){
  var r = parseInt(hex[1]+hex[2], 16);
  var g = parseInt(hex[3]+hex[4], 16);
  var b = parseInt(hex[5]+hex[6], 16);
  return [r,g,b];//return 23,14,45 -> reformat if needed 
}

function screenKuadran(orX, orY, curX, curY){
  if(orX < curX){
    if(orY < curY){
      return 4;
    }
    else{
      return 1;
    }
  }
  else{
    if(orY < curY){
      return 3;
    }
    else{
      return 2;
    }
  }
}

function isOnObject(objects,x,y){
  var onObject = [];
  objects.forEach(function(object){
    var objectX = [];
    var objectY = [];
    for(var i=0;i<object[1].length;i++){
      if(i%2 == 0){
        objectX.push(object[1][i]);
      } else {
        objectY.push(object[1][i]);
      }
    }
    var maxX = Math.max.apply(null, objectX);
    var minX = Math.min.apply(null, objectX);
    var maxY = Math.max.apply(null, objectY);
    var minY = Math.min.apply(null, objectY);
    if(objectX.includes(x) && y <= maxY && y >= minY){
      onObject.push(object);
    }
    else if(objectY.includes(y) && x <= maxX && x >= minX){
      onObject.push(object);
    }
  })
  return onObject[onObject.length-1] || null;
}

function isOnObject2(objects,x,y){
  var onObject = [];
  objects.forEach(function(object){
    var objectX = [];
    var objectY = [];
    for(var i=0;i<object[1].length;i++){
      if(i%2 == 0){
        objectX.push(object[1][i]);
      } else {
        objectY.push(object[1][i]);
      }
    }
    var maxX = Math.max.apply(null, objectX);
    var minX = Math.min.apply(null, objectX);
    var maxY = Math.max.apply(null, objectY);
    var minY = Math.min.apply(null, objectY);
    if(x >= minX && x <= maxX && y <= maxY && y >= minY){
      onObject.push(object);
    }
  })
  return onObject[onObject.length-1] || null;
}

function isOnVertice(objects,x,y){
  var onVertice = [];
  console.log("tes");
  objects.forEach(function(object){
    for(var i=0;i<object[1].length;i+=2){
      if(Math.abs(x - object[1][i]) < 10 && Math.abs(y - object[1][i+1]) < 10){
        onVertice.push([object,i])
      }
    }
  })
  return onVertice[onVertice.length-1] || null;
}

function drawToScreen(objects){
  // Clear the canvas
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program2);
  gl.uniform2f(resolutionUniformLocation2, gl.canvas.width, gl.canvas.height);

  for(var i = 0; i < objects.length; i++){
    // bind the position buffer
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objects[i][1]), gl.STATIC_DRAW);
    // bind the color buffer
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(objects[i][2]), gl.STATIC_DRAW);
    
    // POSITION Attribute
    //enable bind
    gl.enableVertexAttribArray(positionAttributeLocation2);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // how to get
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation2, size, type, normalize, stride, offset);

    // COLOR Attribute
    //enable bind
    gl.enableVertexAttribArray(colorAttributeLocation2);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // how to get
    size = 3;                 // 3 components per iteration soalnya 3d, ada x y z
    type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
    normalize = true;         // normalize the data (convert from 0-255 to 0-1)
    stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(colorAttributeLocation2, size, type, normalize, stride, offset);

    var offset = 0;
    var count = objects[i][1].length/2;
    if(objects[i][0] == 0){
      var primitiveType = gl.LINE_STRIP;
    }
    else if(objects[i][0] == 1){
      var primitiveType = gl.LINES;
    }
    else if(objects[i][0] == 2 || objects[i][0] == 3){
      var primitiveType = gl.TRIANGLE_FAN;
    }
    gl.drawArrays(primitiveType, offset, count);
  }
}