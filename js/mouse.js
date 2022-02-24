canvas.addEventListener("mousedown", startPosition, false);
canvas.addEventListener("mouseup", finishedPosition, false);
canvas.addEventListener("mousemove", moveVertex, false);

// variables
var dragging = false;
var aroundVertice = [-1,-1];
var lastX = -1;
var lastY = -1;
var index = -1;
var currentObj;

function startPosition(e) {
    // get x and y value
    let x = e.clientX
    let y = e.clientY
    aroundVertice = curState.getNearestVertice(x,y)
    
    if (aroundVertice[0] !== -1 && aroundVertice[1] !== -1) {
        lastX = x;
        lastY = y;
        dragging = true;
        currentObj = curState.getCurrentObj();
        index = currentObj.findVerticeIndex(aroundVertice[0], aroundVertice[1]);
        console.log('[start position] : index keganti ->', index);
    }
}

function finishedPosition() {
    dragging = false;
    console.log('[finished position]');

    // reset all variables value
    aroundVertice = [-1,-1];
    lastX = -1;
    lastY = -1;
}

function moveVertex(e) {
    let x = e.clientX;
    let y = e.clientY;
    if (dragging) {
        // update object position
        currentObj.replaceVertice(lastX, lastY, index);
        curState.drawAllObjects();
        console.log('[index]', index);
    }

    // update mouse position
    lastX = x;
    lastY = y;
}