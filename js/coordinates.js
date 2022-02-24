class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    isCoordInside(x, y) {
        const RAD = 20
        return (x-this.x) * (x-this.x) +
            (y-this.y) * (y-this.y) <= RAD * RAD
    }
}

let coor = new Coordinates(400,300)
console.log(coor.isCoordInside(406,308))