class CurrentState {
    constructor() {
        this.objects = []
        this.currentObj = null;
    }

    addObject(obj) {
        this.objects.push(obj)
    }

    drawAllObjects() {
        for (let i=0; i < this.objects.length; i++) {
            this.objects[i].drawObject();
        }
    }

    getNearestVertice(x, y) {
        let aroundVertice = [-1,-1];
        for (let i=0; i < this.objects.length; i++) {
            aroundVertice = this.objects[i].isAroundVertices(x, y)
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
        for (let i=0; i < this.objects.length; i++) {
            if (this.objects[i].isPointInside(x, y)) {
                obj = this.objects[i]
                break;
            }
        }
        return obj
    }
}