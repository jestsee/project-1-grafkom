var oldVal = 0

function createLine() {
    sqrrectMode = false;
    createLinePressed = true;
}

function colorButton() {
    if (sqrrectMode) {
        changecolor();
    }
    else {
        clickChange();
    }
}

function clickChange() {
    clickChangePressed = true;
}

function createPolygon() {
    sqrrectMode = false;
    createPolygonPressed = true;
}

function createRectangle() {
    createRectanglePressed = true;
}

function inputSliderX() {
    var slider = document.getElementById('sliderX');
    var newVal = slider.value

    if(newVal > oldVal) {
        console.log("right");
        currentObj.scaleX(1)
    } else if (newVal < oldVal) {
        console.log("left");
        currentObj.scaleX(-1)
    }

    oldVal = newVal
    state.drawAllObjects()
}

function inputSliderY() {
    var slider = document.getElementById('sliderY');
    var newVal = slider.value
    if(newVal > oldVal) {
        console.log("right");
        currentObj.scaleY(1)
    } else if (newVal < oldVal) {
        console.log("left");
        currentObj.scaleY(-1)
    }

    oldVal = newVal
    state.drawAllObjects()
}

function save() {
    state.saveState()
}

function load() {
    var file = document.getElementById('myfile').files[0];
    if(file == null) {
        window.confirm("File untuk diunggah belum dipilih!")
        return
    }

    // create new state
    state = new CurrentState(); 
    var reader = new FileReader()
    reader.onload = function() {
        var fileContent = JSON.parse(reader.result);
  
        for(let i=0; i<fileContent.length; i++) {
            model = fileContent[i]
            if(model.type == "LINE") {
                state.addObject(new Line(model.vertices[0], model.vertices[1], model.vertices[2], model.vertices[3]))
            } else if (model.type == "POLYGON") {
                state.addObject(new Polygon(1,1,1,1,model.vertices, model.colorHex))
            } else if (model.type == "RECTANGLE") {
                state.addObject(new Rectangle(1,1,1,1,model.vertices, model.colorHex))
            }
        }
        state.drawAllObjects();
    };
    reader.readAsText(file);
}