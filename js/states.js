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

    getSelectedObj(x, y) {
        var obj;
        for (let i=0; i < objects.length; i++) {
            if (this.objects[i].isPointInside(x, y)) {
                obj = this.objects[i]
                break;
            }
        }
        return obj
    }
}

poly = new Polygon(5,100, 200, 200, '#1E2D24')
poly2 = new Polygon(3,100, 400, 400, '#F9B4ED')
poly3 = new Polygon(7,80, 600, 600, '#C52184')
objects = [poly, poly2, poly3]
curState = new CurrentState(objects)

curState.drawAllObjects()