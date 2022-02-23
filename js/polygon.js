/*========== POLYGON =========*/
function drawTriangle() {
    var vertices = [
        -0.75, -0.65,
        0.75, -0.65,
        0, 0.65,
        0.5, 0,
    ];

    var vertices2 = [
        1, 0.3, // kanan tengah
        0.3, -0.8, // kanan bawah
        -0.8, -0.8, // kiri bawah
        -0.8, 0.3, // kiri tengah
        0.3, 1, // atas tengah
    ];

    var vertices3 = [ // mathopenref coordpolycalc
        400,300,
        313,450,
        487,450
    ];

    var vertices5 = [ // johnthesquirrel
        400,500, // tengah bawah
        313,350, // atas kiri
        487,350, // atas kanan
    ];

    var vertices6 = [ // johnthesquirrel
        345,316, // tengah bawah
        500,394, // atas kiri
        355,489, // atas kanan
    ];

    var vertices4 = [ //
        400,300, // kanan atas
        400,200, // kanan bawah
        200,300, // kiri atas
        200,200, // kiri bawah
    ];

    var vertices7 = generateVertices(5,100)

    indices = generateIndices(vertices7)

    drawShape(vertices7, indices);
    drawShape(vertices4, [3,1,2,0,1,2],0,[1,1],[100,300]);
}

function generateVertices(nSides, radius) {
    // setup center
    const CENTER_X = gl.canvas.width/2
    const CENTER_Y = gl.canvas.width/2

    rotAngle = 0
    
    var output = []
    for (var i = 1; i <= nSides; i++) {  
        y = (-(radius * Math.cos(rotAngle + 2 * i * Math.PI / nSides)) + CENTER_X).toFixed(0)
        x = (-(radius * Math.sin(rotAngle + 2 * i * Math.PI / nSides)) + CENTER_Y).toFixed(0)
        output.push(x,y)
    }
    return output
}

function generateIndices(vertices) {
    indices = []
    len = vertices.length/2-1
    increment = Math.ceil(vertices.length/4)

    console.log(len);
    for(var i=0; i<=len ;i++) {
        var a = i
        var b = i+1
        var c = i+increment
        
        if ((b)>len) { b = (i)%len }
        if ((c)>len) { c = (c-1)%len }
        
        indices.push(a,b,c)
    }
    console.log(indices);
    return indices;
}

function drawPolygon(nSides, radius) {
    vertices = generateVertices(nSides, radius)
    indices = generateIndices(vertices)
    drawShape(vertices, indices)
}

// drawTriangle()
drawPolygon(12,150)
