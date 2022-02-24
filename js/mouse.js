canvas.addEventListener("mousedown", startPosition, false);
canvas.addEventListener("mouseup", finishedPosition, false);
canvas.addEventListener("mousemove", moveVertex, false);

let dragging = false;
let aroundVertice = [-1,-1];

function startPosition(e) {
    aroundVertice = poly.isAroundVertices(e.clientX, e.clientY)
    if (aroundVertice[0] !== -1 && aroundVertice[1] !== -1) {
        console.log('masuk sini ngab');
        dragging = true;
    }
}

function finishedPosition() {
    dragging = false;
    aroundVertice = [-1,-1];
}

function moveVertex(e) {
    if(!dragging) return;
    poly.replaceVertice(e.clientX, e.clientY, aroundVertice[0], aroundVertice[1]);
    console.log('masuk moveVertex');
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
