// menggambar shape berdasarkan vertices dan indices 
// conton input
// var vertices = [
//     -0.5,0.5,0.0,
//     -0.5,-0.5,0.0,
//     0.5,-0.5,0.0,
//  ];
//  indices = [1,2,3];
function drawShape(vertices, indices) {
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    /* ======= Associating shaders to buffer objects =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}
