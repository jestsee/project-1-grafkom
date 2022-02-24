class CurrentState {
    constructor(objects) {
        this.objects = objects
        this.currentObj = null;
    }

    drawAllObjects() {
        for (let i=0; i < objects.length; i++) {
            this.objects[i].drawObject();
        }
    }

    getNearestVertice(x, y) {
        for (let i=0; i < objects.length; i++) {
            var aroundVertice = objects[i].isAroundVertices(x, y)
            if (~aroundVertice[0] && ~aroundVertice[1]) {
                this.currentObj = this.objects[i]
                break;
            }
        }
        return [aroundVertice[0], aroundVertice[1]];
    }

    getCurrentObj() {
        return this.currentObj;
    }
}

poly = new Polygon(5,100, 200, 200)
poly2 = new Polygon(3,100, 400, 400)
poly3 = new Polygon(7,80, 600, 600)
objects = [poly, poly2, poly3]
curState = new CurrentState(objects)

curState.drawAllObjects()