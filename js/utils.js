// var vertices = new Float32Array([
//   -0.5,-0.5,
//   0.5,-0.5,
//   0.0,0.5
// ])

// var buffer = gl.createBuffer()
// gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
// gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

// program.color = gl.getUniformLocation(program, 'color')
// gl.uniform4fv(program.color, [0, 1, 0, 1.0])

// program.position = gl.getAttribLocation(program, 'position')
// gl.enableVertexAttribArray(program.position)
// gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

// gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)

function drawShape(vertices, indices, angle=0, scale=[1,1], translation=[0,0]) {

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  program.color = gl.getUniformLocation(program, 'color')
  gl.uniform4fv(program.color, [0, 1, 0, 1.0])

  var index = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  // resolution
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

  // scale
  var scaleLocation = gl.getUniformLocation(program, "u_scale");
  gl.uniform2fv(scaleLocation, scale);

  // rotation
  var rotationLocation = gl.getUniformLocation(program, "u_rotation");
  var rotation = angleInRadians(angle)
  gl.uniform2fv(rotationLocation, rotation);

  // translation
  var translationLocation = gl.getUniformLocation(program, "u_translation");
  gl.uniform2fv(translationLocation, translation);

  // position
  program.position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(program.position)
  gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0)

  // gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2)
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
}

function angleInRadians(angle) {
  var angleInRadians = angle * Math.PI / 180;
  rotation = []
  rotation[0] = Math.sin(angleInRadians);
  rotation[1] = Math.cos(angleInRadians);
  return rotation
}
