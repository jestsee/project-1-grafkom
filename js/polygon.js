/*========== POLYGON =========*/
class Polygon {
    constructor(nSides, radius, centerY, centerX) {
        this.nSides = nSides
        this.radius = radius
        this.centerX = centerX
        this.centerY = centerY
        this.colorHex = '#b8d9a4'
        this.vertices = this.generateVertices()
    }

    drawObject() {
        drawShape(this.vertices, this.colorHex)
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

    changeColor(newColor) {
        this.colorHex = newColor;
    }

    isPointInside(x, y) {
        var vs = this.vertices.map(function (x) { // apa taroh di atribut aja ya
            return parseInt(x); 
          });
          
        var inside = false;
        for (let i=0; i < vs.length; i+=2) {
            let j = i-2;
            if(i==0) {j = vs.length-2}
            var xi = vs[i], yi = vs[i+1];
            var xj = vs[j], yj = vs[j+1];

            // console.log(`x${i} : ${xi}, y${i} : ${yi}`);
            // console.log(`x${j} : ${xj}, y${j} : ${yj}`);

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    // PAS mousedown --> if coor inside then .. else cek ada di dalem poligon atau ga buat ganti warna
    // TODO cek ada di dalem poligon atau ngga
    // TODO cek ada disekitar vertices atau nggga (** ini lebih diprioritasin)
}