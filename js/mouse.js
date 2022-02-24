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
var clickChangePressed = false;

function mouseDown(e) {
    // get x and y value
    let x = e.clientX
    let y = e.clientY

    if (clickChangePressed) {
        currentObj = curState.getSelectedObj(x, y);
        currentObj.changeColor(document.getElementById('color').value);
        curState.drawAllObjects();
        clickChangePressed = false;

        console.log('clicked');
        console.log(currentObj);
    }

    aroundVertice = curState.getNearestVertice(x,y)
    // console.log(poly2.isPointInside(x, y), x, y);
    
    if (aroundVertice[0] !== -1 && aroundVertice[1] !== -1 && !clickChangePressed) {
        lastX = x;
        lastY = y;
        dragging = true;
        currentObj = curState.getCurrentObj();
        index = currentObj.findVerticeIndex(aroundVertice[0], aroundVertice[1]);

        console.log('only drag');
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
    let x = e.clientX;
    let y = e.clientY;
    if (dragging) {
        // update object position
        currentObj.replaceVertice(lastX, lastY, index);
        curState.drawAllObjects();
    }

    // update mouse position
    lastX = x;
    lastY = y;
}