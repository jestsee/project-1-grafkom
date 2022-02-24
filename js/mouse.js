canvas.addEventListener("mousedown", startPosition, false);
canvas.addEventListener("mouseup", finishedPosition, false);
canvas.addEventListener("mousemove", moveVertex, false);

// variables
var dragging = false;
var aroundVertice = [-1,-1];
var lastX = -1;
var lastY = -1;
var index = -1

function startPosition(e) {
    let x = e.clientX
    let y = e.clientY
    aroundVertice = poly.isAroundVertices(x, y)
    if (aroundVertice[0] !== -1 && aroundVertice[1] !== -1) {
        lastX = x;
        lastY = y;
        dragging = true;
        index = poly.findVerticeIndex(aroundVertice[0], aroundVertice[1]);
        console.log('[start position] : index keganti ->', index);
    }
}

function finishedPosition() {
    dragging = false;
    console.log('[finished position]');
    aroundVertice = [-1,-1];
    lastX = -1;
    lastY = -1;
}

function moveVertex(e) {
    // if(!dragging) return;
    // poly.replaceVertice(e.clientX, e.clientY, aroundVertice[0], aroundVertice[1]);
    // console.log('masuk moveVertex');

    let x = e.clientX;
    let y = e.clientY;
    if (dragging) {
        // update
        poly.replaceVertice(lastX, lastY, index);
        console.log('[index]', index);
    }

    // update mouse position
    lastX = x;
    lastY = y;
}

function mouseMove(e) {
    console.log(e);
}

function mouseDown(e) {
    let x = e.clientX
    let y = e.clientY

    vertice = poly.isAroundVertices(x,y)
    console.log(vertice)
    poly.replaceVertice(200, 200, vertice[0], vertice[1]);
    
}
