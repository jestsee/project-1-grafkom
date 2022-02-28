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
var sqrrectMode = false;
var idxNowShape = 0;
var action = "draw";
var mode = 0;
var objects = [];
var colorRGB = [0, 0, 0];
var mouseClicked = false;
var selectedObject = null;
var selectedVertice = null;

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
    if (!sqrrectMode) {
        // get x and y value
        let x = e.clientX
        let y = e.clientY

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
    } else {
        if (action == "draw"){
            mouseClicked = true;
            var x = e.pageX - this.offsetLeft; 
            var y = e.pageY - this.offsetTop;
        
            if(mode == 0){ // pen
              objects.push([mode,[],[]]);
            }
            else if(mode == 1){ // line
              const colorTwice = colorRGB.concat(colorRGB);
              objects.push([mode,[x,y,x,y],colorTwice]);
            }
            else if(mode == 2 || mode == 3){ // square
              const colorTwice = colorRGB.concat(colorRGB);
              const colorFour = colorTwice.concat(colorTwice);
              objects.push([mode,[x,y, x,y, x,y, x,y],colorFour]);
            }
          }
        else if(action == "edit"){
            mouseClicked = true;
            var x = e.pageX - this.offsetLeft; 
            var y = e.pageY - this.offsetTop;
            var onObject = isOnObject2(objects,x,y);
            if (onObject){
                selectedObject = onObject;
            }
        }
        else if(action == "move"){
            mouseClicked = true;
            var x = e.pageX - this.offsetLeft; 
            var y = e.pageY - this.offsetTop;
            var onVertice = isOnVertice(objects,x,y);
            if (onVertice){
                selectedObject = onVertice[0];
                selectedVertice = onVertice[1];
            }
        }
    }
}
    

function mouseUp() {
    if (!sqrrectMode) {
        dragging = false;

        // reset all variables value
        aroundVertice = [-1,-1];
        lastX = -1;
        lastY = -1;
    }
    else {
        if (action == "draw"){
            mouseClicked = false;
            idxNowShape++;
            console.log(objects)
        }
        else if(action == "edit"){
            mouseClicked = false;
            selectedObject = null;
        }
        else if(action == "move"){
            mouseClicked = false;
            selectedObject = null;
            selectedVertice = null;
        }
    }
}

function mouseMove(e) {
    if (!sqrrectMode) {
        let x = e.clientX;
        let y = e.clientY;
        if (dragging) {
            // update object position
            currentObj.replaceVertice(lastX, lastY, index);
            state.drawAllObjects();
        }

        // update mouse position
        lastX = x;
        lastY = y;
    }
    else {
        if (action == "draw"){
            if(mouseClicked){
              var x = e.pageX - this.offsetLeft; 
              var y = e.pageY - this.offsetTop;
              if(mode == 0){
                objects[idxNowShape][1].push(x, y);
                objects[idxNowShape][2].push(colorRGB[0], colorRGB[1], colorRGB[2]);
              }
              else if(mode == 1){ // line
                for(var i = 0; i < 2; i++){
                  objects[idxNowShape][1].pop();
                }
                objects[idxNowShape][1].push(x, y);
              }
              else if(mode == 2){//square
                for(var i = 0; i < 6; i++){
                  objects[idxNowShape][1].pop();
                }
                var orX = objects[idxNowShape][1][0];
                var orY = objects[idxNowShape][1][1];
                var kuadran = screenKuadran(orX, orY, x, y);
                var sizer = Math.max(Math.abs(orX-x),Math.abs(orY-y));
                if(kuadran == 1){
                  objects[idxNowShape][1].push(orX+sizer, orY, orX+sizer, orY-sizer, orX, orY-sizer);
                }
                else if(kuadran == 2){
                  objects[idxNowShape][1].push(orX-sizer, orY, orX-sizer, orY-sizer, orX, orY-sizer);
                }
                else if(kuadran == 3){
                  objects[idxNowShape][1].push(orX-sizer, orY, orX-sizer, orY+sizer, orX, orY+sizer);
                }
                else if(kuadran == 4){
                  objects[idxNowShape][1].push(orX+sizer, orY, orX+sizer, orY+sizer, orX, orY+sizer);
                }
              }
              else if(mode == 3){
                for(var i = 0; i < 6; i++){
                  objects[idxNowShape][1].pop();
                }
                var orX = objects[idxNowShape][1][0];
                var orY = objects[idxNowShape][1][1];
                var selisihX = x - orX;
                var selisihY = y - orY;
                objects[idxNowShape][1].push(orX+selisihX, orY, x, y, orX, orY+selisihY);
              }
              drawToScreen(objects);
            }
          }
        else if (action == "edit"){
            var x = e.pageX - this.offsetLeft; 
            var y = e.pageY - this.offsetTop;
        
            var onObject = isOnObject2(objects,x,y);
        
            if (onObject && !selectedObject){
              onObject[2] = colorRGB.concat(colorRGB).concat(colorRGB).concat(colorRGB);
            }
        
            if (selectedObject){
              if(selectedObject[0] == 2){//square
                for(var i = 0; i < 6; i++){
                  selectedObject[1].pop();
                }
                var orX = selectedObject[1][0];
                var orY = selectedObject[1][1];
                var kuadran = screenKuadran(orX, orY, x, y);
                var sizer = Math.max(Math.abs(orX-x),Math.abs(orY-y));
                if(kuadran == 1){
                  selectedObject[1].push(orX+sizer, orY, orX+sizer, orY-sizer, orX, orY-sizer);
                }
                else if(kuadran == 2){
                  selectedObject[1].push(orX-sizer, orY, orX-sizer, orY-sizer, orX, orY-sizer);
                }
                else if(kuadran == 3){
                  selectedObject[1].push(orX-sizer, orY, orX-sizer, orY+sizer, orX, orY+sizer);
                }
                else if(kuadran == 4){
                  selectedObject[1].push(orX+sizer, orY, orX+sizer, orY+sizer, orX, orY+sizer);
                }
              }
              else if(selectedObject[0] == 3){
                for(var i = 0; i < 6; i++){
                  selectedObject[1].pop();
                }
                var orX = selectedObject[1][0];
                var orY = selectedObject[1][1];
                var selisihX = x - orX;
                var selisihY = y - orY;
                selectedObject[1].push(orX+selisihX, orY, x, y, orX, orY+selisihY);
              }
            }
            drawToScreen(objects);
        }
        else if(action == "move"){
            var x = e.pageX - this.offsetLeft; 
            var y = e.pageY - this.offsetTop;
            if (selectedObject){
                selectedObject[1][selectedVertice] = x;
                selectedObject[1][selectedVertice+1] = y;
            }
            drawToScreen(objects);
        }
    }
}
