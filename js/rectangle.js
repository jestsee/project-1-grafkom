/*========== POLYGON =========*/
class Rectangle {
    constructor(radius=null, centerY=null, centerX=null, symmetric=null, vertices=null, colorHex=null) {
        this.type = "RECTANGLE"
        this.symmetric = symmetric
        this.radius = radius
        this.centerX = centerX
        this.centerY = centerY
        this.colorHex = colorHex
        if (this.colorHex == null) {
            this.colorHex = '#b8d9a4'
        }

        this.vertices = vertices
        if (this.vertices == null) {
            this.vertices = this.generateVertices()
        }
    }

    drawObject() {
        drawShape(this.vertices, this.colorHex)
    }

    scaleX(scale) {
        this.vertices[0] = this.vertices[0] - scale
        this.vertices[2] = this.vertices[2] + scale
        this.vertices[4] = this.vertices[4] + scale
        this.vertices[6] = this.vertices[6] - scale
    }

    scaleY(scale) {
        this.vertices[1] = this.vertices[1] + scale
        this.vertices[3] = this.vertices[3] + scale
        this.vertices[5] = this.vertices[5] - scale
        this.vertices[7] = this.vertices[7] - scale
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
        console.log(this.vertices);
        let vertices = []
        if (this.symmetric) {
            vertices = [
                this.centerX - this.radius/1, this.centerY + this.radius/1, // kiri bawah
                this.centerX + this.radius/1, this.centerY + this.radius/1, // kanan bawah
                this.centerX + this.radius/1, this.centerY - this.radius/1, // kanan atas
                this.centerX - this.radius/1, this.centerY - this.radius/1, // kiri atas
            ]
        } else {
            vertices = [
                this.centerX - this.radius/1, this.centerY + this.radius/2,
                this.centerX + this.radius/1, this.centerY + this.radius/2,
                this.centerX + this.radius/1, this.centerY - this.radius/2,
                this.centerX - this.radius/1, this.centerY - this.radius/2,
            ]
        }
        console.log("VERTICES", vertices);
        return vertices
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
}