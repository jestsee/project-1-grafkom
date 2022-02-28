canvas.addEventListener("mousedown", mouseDown, false);
canvas.addEventListener("mouseup", mouseUp, false);
canvas.addEventListener("mousemove", mouseMove, false);

// variables
var dragging = false;
var aroundVertice = [-1,-1];
var lastX = -1;
var lastY = -1;
var index = -1;
var currentObj;

var linePoint = 0;
var x1 = -1;
var y1 = -1;
var x2 = -1;
var y2 = -1;

var clickChangePressed = false;
var createPolygonPressed = false;
var createRectanglePressed = false;
var createLinePressed = false;

function mouseDown(e) {
    // get x and y value
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop;

    if (clickChangePressed) {
        currentObj = state.getSelectedObj(x, y);
        currentObj.changeColor(document.getElementById('color').value);
        state.drawAllObjects();
        clickChangePressed = false;

        console.log('clicked');
        console.log(currentObj);
    } 

    else if (createLinePressed) {
        state.addObject(new Line(canvas.width/2, canvas.height/2, x, y));
        state.drawAllObjects();
        createLinePressed = false;
    }

    else if (createPolygonPressed) {
        let nSides = document.getElementById("polygonSides").value;
        let radius = document.getElementById("polygonRadius").value;
        state.addObject(new Polygon(nSides, radius, x, y));
        state.drawAllObjects();
        createPolygonPressed = false;
    }

    else if (createRectanglePressed) {
        let radius = document.getElementById("polygonRadius").value;
        let symmetricChecked = document.getElementById('symmetric').checked

        if(symmetricChecked) {
            state.addObject(new Rectangle(radius, y, x, true))
        } else {
            state.addObject(new Rectangle(radius, y, x, false))
        }
        
        state.drawAllObjects();
        createRectanglePressed = false;
    }

    else {
        aroundVertice = state.getNearestVertice(x,y)
        if (aroundVertice[0] !== -1 && aroundVertice[1] !== -1) {
            lastX = x;
            lastY = y;
            dragging = true;
            currentObj = state.getCurrentObj();
            index = currentObj.findVerticeIndex(aroundVertice[0], aroundVertice[1]);
    
            console.log('only drag');
        } 

        else {
            currentObj = state.getSelectedObj(x, y);
        }
    }
}
    

function mouseUp() {
    dragging = false;

    // reset all variables value
    aroundVertice = [-1,-1];
    lastX = -1;
    lastY = -1;
}

function mouseMove(e) {
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop;
    if (dragging) {
        // update object position
        currentObj.replaceVertice(lastX, lastY, index);
        state.drawAllObjects();
    }

    // update mouse position
    lastX = x;
    lastY = y;
}