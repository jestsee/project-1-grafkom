var vertices = new Float32Array([
    -0.5, 0.5, 
    0.0, 0.5, 
    0.0, 0.0
]);

var indices = new Uint16Array([3, 2, 1, 3, 1, 0]);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.useProgram(program);
program.color = gl.getUniformLocation(program, "color");
gl.uniform4fv(program.color, [0, 1, 0, 1.0]);

program.position = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(program.position);
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
