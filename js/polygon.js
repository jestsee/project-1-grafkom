/*========== POLYGON =========*/
class Polygon {
    constructor(nSides, radius, centerX, centerY) {
        this.nSides = nSides
        this.radius = radius
        this.centerX = centerX
        this.centerY = centerY
        this.vertices = this.generateVertices()
    }

    drawObject() {
        drawShape(this.vertices)
    }

    // kalo sempet aja nanti tambahin penanda di tiap ujung sudut
    addHelper() {

    }

    // return related coor if true
    // return [-1,-1] if false
    isAroundVertices(x, y) {
        let output = [-1,-1]

        // iterate through vertices
        for (let i=0; i<this.vertices.length; i+=2) {
            // console.log('DALEM LOOP', this.vertices[i], this.vertices[i+1]);
            if (this.isNearVertice(x, y, this.vertices[i], this.vertices[i+1])) {
                output[0] = this.vertices[i];
                output[1] = this.vertices[i+1];
                break
            }
        }
        return output
    }

    isNearVertice(x, y, myX, myY) {
        const RAD = 20
        return Math.pow(x-myX,2) + Math.pow(y-myY,2) <= RAD * RAD
    }

    generateVertices() {
        let rotAngle = 0
        let output = []
        for (let i = 1; i <= this.nSides; i++) {  
            let y = (-(this.radius * Math.cos(rotAngle + 2 * i * Math.PI / this.nSides)) + this.centerX).toFixed(0)
            let x = (-(this.radius * Math.sin(rotAngle + 2 * i * Math.PI / this.nSides)) + this.centerY).toFixed(0)
            output.push(x,y)
        }
        // console.log(output);
        return output
    }

    findVerticeIndex(myX, myY) {
        let index = -1;
        for (let i=0; i<this.vertices.length; i+=2) {
            if (this.vertices[i] == myX && this.vertices[i+1] == myY) {
                index = i;
                // y index = i + 1
            }
        }
        return index;
    }

    replaceVertice(x, y, index) {
        this.vertices[index] = x;
        this.vertices[index+1] = y;
    }

    // PAS mousedown --> if coor inside then .. else cek ada di dalem poligon atau ga buat ganti warna
    // TODO cek ada di dalem poligon atau ngga
    // TODO cek ada disekitar vertices atau nggga (** ini lebih diprioritasin)
}

function drawTriangle() {
    let vertices = [
        -0.75, -0.65,
        0.75, -0.65,
        0, 0.65,
        0.5, 0,
    ];

    let vertices2 = [
        1, 0.3, // kanan tengah
        0.3, -0.8, // kanan bawah
        -0.8, -0.8, // kiri bawah
        -0.8, 0.3, // kiri tengah
        0.3, 1, // atas tengah
    ];

    let vertices3 = [ // mathopenref coordpolycalc
        400,300,
        313,450,
        487,450
    ];

    let vertices5 = [ // johnthesquirrel
        400,500, // tengah bawah
        313,350, // atas kiri
        487,350, // atas kanan
    ];

    let vertices6 = [ // johnthesquirrel
        345,316, // tengah bawah
        500,394, // atas kiri
        355,489, // atas kanan
    ];

    let vertices4 = [ //
        400,300, // kanan atas
        400,200, // kanan bawah
        200,300, // kiri atas
        200,200, // kiri bawah
    ];

    let vertices7 = generateVertices(5,100)

    indices = generateIndices(vertices7)

    drawShape(vertices7);
    drawShape(vertices4);
}

function generateVertices(nSides, radius) {
    // setup center
    const CENTER_X = gl.canvas.width/2
    const CENTER_Y = gl.canvas.width/2

    rotAngle = 0
    
    let output = []
    for (let i = 1; i <= nSides; i++) {  
        y = (-(radius * Math.cos(rotAngle + 2 * i * Math.PI / nSides)) + CENTER_X).toFixed(0)
        x = (-(radius * Math.sin(rotAngle + 2 * i * Math.PI / nSides)) + CENTER_Y).toFixed(0)
        output.push(x,y)
    }
    console.log(output);
    return output
}

function generateIndices(vertices) {
    indices = []
    len = vertices.length/2-1
    increment = Math.ceil(vertices.length/4)

    for(let i=0; i<=len ;i++) {
        let a = i
        let b = i+1
        let c = i+increment
        
        if ((b)>len) { b = (i)%len }
        if ((c)>len) { c = (c-1)%len }
        
        indices.push(a,b,c)
    }
    return indices;
}

function drawPolygon(nSides, radius) {
    vertices = generateVertices(nSides, radius)
    drawShape(vertices)
}

// drawTriangle()
// drawPolygon(5,100)