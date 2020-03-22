function rgb2hex(hex) {

    var matchColors = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
    var rgb = matchColors.exec(hex);
    return "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')'
        : 'rgb(0,0,0)';
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function numbering(target, i) {
    // debugger
    let res = '';
    let prts = target.split('\n');
    prts.forEach(function (item, index) {
        if (index < prts.length - 1) {
            res += item + '\n' + (i + index) + '. ';
        } else {
            res += item;
        }
    });
    return res;
}

function openLoadingOverlay() {
    // console.log('working');
    document.getElementById("LoadingOverlay").style.display = "block";
}

function closeLoadingOverlay() {
    document.getElementById("LoadingOverlay").style.display = "none";
    // console.log('done');
}


function setFabricTextProperties(text) {
    text.set({
        editable: false,
    });
    $.each(['tl', 'tr', 'br', 'bl', 'ml', 'mt', 'mr', 'mb', 'mtr'], function (i, v) {
        text.setControlVisible(v, false);
    });
    $.each(['ml', 'mr', 'mtr'], function (i, v) {
        text.setControlVisible(v, true);
    });
}

function createFabricText(text) {
    var txt = new fabric.Textbox(text, {
        left: 100,
        top: 100,
    });
    setFabricTextProperties(txt);

    canvas.add(txt).requestRenderAll().setActiveObject(txt);
}

function setFabricImageProperties(img) {
    img.set({});
    $.each(['tl', 'tr', 'br', 'bl', 'ml', 'mt', 'mr', 'mb', 'mtr'], function (i, v) {
        img.setControlVisible(v, false);
    });
    $.each(['tl', 'tr', 'br', 'bl', 'mtr'], function (i, v) {
        img.setControlVisible(v, true);
    });

}

function createFabricImage(src) {
    new fabric.Image.fromURL(src, function (oImg) {
        oImg.set({
            left: 100,
            top: 100,

        });
        setFabricImageProperties(oImg);
        oImg.filters.push(new fabric.Image.filters.HueRotation({
            rotation: 0.0
        }));
        oImg.filters.push(new fabric.Image.filters.Saturation({
            saturation: 0.0
        }));
        oImg.filters.push(new fabric.Image.filters.Brightness({
            brightness: 0.0
        }));
        oImg.applyFilters();

        canvas.add(oImg).requestRenderAll().setActiveObject(oImg);
    });


}

function createFabricQRImage(src) {
    var oImg = new fabric.Image(src, {
        left: 100,
        top: 100,
    });
    $.each(['ml', 'mt', 'mr', 'mb', 'mtr'], function (i, v) {
        oImg.setControlVisible(v, false);
    });

    canvas.add(oImg).requestRenderAll().setActiveObject(oImg);

}

function setFabricLineProperties(lin) {
    lin.set({
        strokeLineCap: 'round', //"butt", "round", "square"
        padding: 10,
    });
    $.each(['tl', 'tr', 'br', 'bl', 'mt', 'mb'], function (i, v) {
        lin.setControlVisible(v, false);
    });
}

function createFabricLine() {
    let lin = new fabric.Line([30, 30, 300, 30], {
        stroke: '#bbb',
        strokeWidth: 5,
    });
    setFabricLineProperties(lin);

    canvas.add(lin).requestRenderAll().setActiveObject(lin);
}

function setFabricOvalProperties(lin) {
    lin.set({});

}

function createFabricOval() {
    let ov = new fabric.Ellipse({
        rx: 100, ry: 100, left: 100, top: 100,
        fill: '#bbb',
        stroke: '#000',
        strokeWidth: 0,

    });
    setFabricOvalProperties(ov);

    canvas.add(ov).requestRenderAll().setActiveObject(ov);
}

function setFabricRectProperties(lin) {
    lin.set({});

}

function createFabricRect() {
    let ov = new fabric.Rect({
        width: 100, height: 200, left: 100, top: 100,
        fill: '#bbb',
        stroke: '#000',
        strokeWidth: 0,

    });
    setFabricRectProperties(ov);

    canvas.add(ov).requestRenderAll().setActiveObject(ov);
}

let setFabricTextArrowProperties = function (ov) {
    $.each(['tl', 'tr', 'br', 'bl', 'mt', 'mb'], function (i, v) {
        ov.setControlVisible(v, false);
    });
};

function createFabricTextArrow(chr) {
    let ov = new fabric.Text(chr, {
        width: 100, height: 200, left: 100, top: 100,
    });
    setFabricTextArrowProperties(ov);

    canvas.add(ov).requestRenderAll().setActiveObject(ov);

}

function createFabricPolygon(points) {
    let fp = new fabric.Polygon(points, {
        left: 100, top: 100,
        fill: '#bbb',
        // PolygonNumber: polygonCount,
        name: "Polygon",
        // selectable: true,
        // noofcircles: ArrayLength,
        objectCaching: false
    });
    canvas.add(fp).requestRenderAll().setActiveObject(fp);

}


function lockFabricObj(obj) {
    obj.set({
        lockMovementX: true,
        lockMovementY: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        lockRotation: true,
    });
    try {
        obj.set({
            editable: false,
        });
    } catch (e) {
        console.log('not text box !');
    }
}

function setCanvasProperties() {
    canvas.set({
        backgroundColor: 'rgb(255,255,255)',
        selectionColor: 'blue',
        selectionLineWidth: 2,
        preserveObjectStacking: true,
        selection: false, // disable group selection
    });
    initCenteringGuidelines(canvas);
    initAligningGuidelines(canvas);
}

let resizeArea = function () {
    // Designer
    document.getElementById('Designer').style.maxWidth = areConfig.width + 2 * areConfig.printableAreaMargin + 'px';
    // DesignerArea
    document.getElementById('DesignerArea').style.maxHeight = areConfig.height + 'px';
    document.getElementById('DesignerArea').style.padding = areConfig.printableAreaMargin + 'px';
    // Canvas
    document.getElementById('PrintableCanvas').setAttribute('width', areConfig.width);
    document.getElementById('PrintableCanvas').setAttribute('height', areConfig.height);
    // SafeArea
    document.getElementById('SafeArea').style.width = areConfig.width - 2 * areConfig.safeAreaMargin + 'px';
    document.getElementById('SafeArea').style.height = areConfig.height - 2 * areConfig.safeAreaMargin + 'px';
    document.getElementById('SafeArea').style.margin = areConfig.safeAreaMargin - 2 + 'px'; // minus border size
    document.getElementById('SafeArea').style.top = -areConfig.height + 'px'; // bring up and over canvas
    // LoadingOverlay
    document.getElementById('LoadingOverlay').style.width = areConfig.width + 2 * areConfig.safeAreaMargin + 'px'; // bring up and over canvas
    document.getElementById('LoadingOverlay').style.height = areConfig.height + 2 * areConfig.printableAreaMargin + 2 * areConfig.safeAreaMargin + 46 + 'px'; // bring up and over canvas
    document.getElementById('LoadingOverlay').style.top = -(areConfig.height + 2 * areConfig.printableAreaMargin + 2 * areConfig.safeAreaMargin + 46 + 30) + 'px'; // bring up and over canvas

};
let buildcanvas = function () {
    resizeArea();
    canvas = new fabric.Canvas('PrintableCanvas');
    setCanvasProperties();

    fabric.Object.prototype.set({
        selectable: true,
        evented: true,
        transparentCorners: false,
        centeredRotation: true,
        centeredScaling: false,
        cornerSize: 10,
        borderColor: '#004c80',
        cornerColor: '#004c80',
        cornerStrokeColor: '#fff',
        cornerStyle: 'circle',
        selectionDashArray: [10, 5],
        borderDashArray: [5, 2],
        rotatingPointOffset: 20,
    });


    canvas.on('mouse:over', function (e) {
        // console.log(JSON.stringify(e));
        if (e.target) {
            e.target.set('transparentCorners', false);
        }
        canvas.requestRenderAll();
    });

    canvas.on('mouse:out', function (e) {
        // console.log(JSON.stringify(e));
        if (e.target) {
            e.target.set('transparentCorners', true);
        }
        canvas.requestRenderAll();
    });

    canvas.on({
        'object:moving': onChange,
        'object:scaling': onChange,
        'object:rotating': onChange,
    });


    canvas.on({
        'object:scaled': function (options) {
            if (options.target.type === 'rect') {
                if (options.transform.action === 'scaleX') {
                    options.target.set({
                        width: options.target.strokeWidth * (options.target.scaleX - 1) + options.target.width * options.target.scaleX,
                        scaleX: 1,
                    });
                }
                else if (options.transform.action === 'scaleY') {
                    options.target.set({
                        height: options.target.strokeWidth * (options.target.scaleY - 1) + options.target.height * options.target.scaleY,
                        scaleY: 1
                    });
                }
                else {
                    options.target.set({
                        width: options.target.strokeWidth * (options.target.scaleX - 1) + options.target.width * options.target.scaleX,
                        height: options.target.strokeWidth * (options.target.scaleY - 1) + options.target.height * options.target.scaleY,
                        scaleX: 1,
                        scaleY: 1
                    });
                }
            }
            if (options.target.type === 'text') {

                options.target.set({
                    // width: options.target.strokeWidth*(options.target.scaleX-1) + options.target.width * options.target.scaleX,
                    // height:10,
                    // lineHeight:  10,
                    // deltaY: 50,
                    fontSize: options.target.fontSize * options.target.scaleX,
                    scaleX: 1,
                    scaleY: 1
                });
            }
            else if (options.target.type === 'ellipse') {
                if (options.transform.action === 'scaleX') {
                    options.target.set({
                        rx: options.target.strokeWidth * (options.target.scaleX - 1) / 2 + options.target.rx * options.target.scaleX,
                        scaleX: 1,
                    });
                }
                else if (options.transform.action === 'scaleY') {
                    options.target.set({
                        ry: options.target.strokeWidth * (options.target.scaleY - 1) / 2 + options.target.ry * options.target.scaleY,
                        scaleY: 1
                    });
                }
                else {
                    options.target.set({
                        rx: options.target.strokeWidth * (options.target.scaleX - 1) / 2 + options.target.rx * options.target.scaleX,
                        ry: options.target.strokeWidth * (options.target.scaleY - 1) / 2 + options.target.ry * options.target.scaleY,
                        scaleX: 1,
                        scaleY: 1
                    });
                }
            }
            else if (options.target.type === 'polygon') {
                if (options.transform.action === 'scaleX') {
                    options.target.set({
                        scaleY: options.target.scaleX,
                    });
                }
                else if (options.transform.action === 'scaleY') {
                    options.target.set({
                        scaleX: options.target.scaleY,
                    });
                }
                else {
                    options.target.set({
                        // width: options.target.strokeWidth * (options.target.scaleX - 1) / 2 + options.target.rx * options.target.scaleX,
                        // height: options.target.strokeWidth * (options.target.scaleY - 1) / 2 + options.target.ry * options.target.scaleY,
                        // scaleX: 1,
                        // scaleY: 1
                    });
                }
            }
        },
    });


    var Direction = {
        LEFT: 0,
        UP: 1,
        RIGHT: 2,
        DOWN: 3
    };

    fabric.util.addListener(document.body, 'keydown', function (options) {
        // disable on text writing
        if (!enableShortKey) {
            return;
        }
        // enable otherwise
        var key = options.which || options.keyCode; // key detection
        // debugger
        if (key === 37) { // handle Left key
            moveSelected(Direction.LEFT);
        } else if (key === 38) { // handle Up key
            moveSelected(Direction.UP);
        } else if (key === 39) { // handle Right key
            moveSelected(Direction.RIGHT);
        } else if (key === 40) { // handle Down key
            moveSelected(Direction.DOWN);
        }

        if (options.repeat) {
            return;
        }

        if (key === 83 && event.ctrlKey) {
            event.preventDefault();
            saveDesign();
        }
        else if (key === 90 && event.ctrlKey) {
            event.preventDefault();
            undo();
        }
        else if (key === 89 && event.ctrlKey) {
            event.preventDefault();
            redo();
        }
        else if (key === 46) {
            w2ui.toolbar.click('delete');
        } else if (key === 83) { // S
            w2ui.toolbar.click('magnet');
            // let sntg = w2ui.toolbar.get('magnet').checked;
            // if (!sntg){w2ui.toolbar.check('magnet')}
            // else {w2ui.toolbar.uncheck('magnet')}
        } else if (key === 76) {
            w2ui.toolbar.click('lock');
        }

    });


    canvas.on({
        'selection:created': onSelection,
        'selection:updated': onSelection,
        'selection:cleared': onSelectionCleared,
        'object:modified': function () {
            updateCanvasState();
        },
        'object:added': function () {
            updateCanvasState();
        }

    });

};

let setAlarmState = function (options, ch) {
    options.target.set({borderColor: ch ? '#FF4800' : 'blue'});
    options.target.set({cornerStrokeColor: ch ? '#FF4800' : '#fff'});
    options.target.set({borderScaleFactor: ch ? 2 : 1});
    options.target.set({borderOpacityWhenMoving: ch ? 1 : 0.4});
};

function onChange(options) {
    // console.log(JSON.stringify(options));
    if (options) {
        options.target.setCoords();
        let is = false;
        canvas.forEachObject(function (obj) {
            if (obj === options.target || obj.type !== 'textbox' || options.target.type !== 'textbox') return;
            if (!is) {
                let ch = options.target.intersectsWithObject(obj);
                setAlarmState(options, ch);
                is |= ch;
            }
            // console.log( i + ' : ' + JSON.stringify(obj.text) + ' > ' + ch);
        });

        if(!is){
            let ch = options.target.left < areConfig.safeAreaMargin;
            ch |= options.target.top < areConfig.safeAreaMargin;
            ch |= (options.target.left+options.target.width) > (areConfig.width-areConfig.safeAreaMargin);
            ch |= (options.target.top+options.target.height) > (areConfig.height-areConfig.safeAreaMargin);
            setAlarmState(options, ch);
        }

        if (options.transform.action === 'drag' && w2ui.toolbar.get('magnet').checked) {
            let grid = 10;
            options.target.set({
                left: Math.round(options.target.left / grid) * grid,
                top: Math.round(options.target.top / grid) * grid
            });
        }

    }
}

function moveSelected(direction) {
    const STEP = 1;

    let objects = canvas.getActiveObjects();
    for (let i in objects) {
        let activeObject = objects[i];

        switch (direction) {
            case Direction.LEFT:
                activeObject.left = (activeObject.left - STEP);
                break;
            case Direction.UP:
                activeObject.top = (activeObject.top - STEP);
                break;
            case Direction.RIGHT:
                activeObject.left = (activeObject.left + STEP);
                break;
            case Direction.DOWN:
                activeObject.top = (activeObject.top + STEP);
                break;
        }
        activeObject.setCoords();
        canvas.renderAll();
    }

}

function onSelection(event) {
    // console.log(JSON.stringify(event.target));
    if (event.target) {

        w2ui.toolbar.set('lock', {checked: event.target.lockMovementX});

        let typ = event.target.type.toLowerCase();
        switch (typ) {
            case 'textbox':
                $('#TextPropertyArea').show();
                $('#ImagePropertyArea').hide();
                $('#MorePropertyArea').hide();
                $('#StarPropertyArea').hide();
                $('#BGPropertyArea').hide();


                $('#inputtext').val(event.target.text);
                if (event.target.fill.indexOf('#') === 0) {
                    w2ui.textpropertybar.set('textcolor', {color: event.target.fill});
                } else {
                    w2ui.textpropertybar.set('textcolor', {color: rgb2hex(event.target.fill)});
                }
                // if (event.target.fontFamily !== "") {
                //     $('#fontlist').w2field().set({id: event.target.fontFamily, text: event.target.fontFamily});
                // }
                w2ui.textpropertybar.set('bold', {checked: event.target.fontWeight === 'bold'});
                w2ui.textpropertybar.set('italic', {checked: event.target.fontStyle === 'italic'});
                w2ui.textpropertybar.set('underline', {checked: event.target.underline});
                switch (event.target.textAlign) {
                    case 'left':
                        w2ui.textpropertybar.set('left', {checked: true});
                        w2ui.textpropertybar.set('center', {checked: false});
                        w2ui.textpropertybar.set('right', {checked: false});
                        break;
                    case 'center':
                        w2ui.textpropertybar.set('left', {checked: false});
                        w2ui.textpropertybar.set('center', {checked: true});
                        w2ui.textpropertybar.set('right', {checked: false});
                        break;
                    case 'right':
                        w2ui.textpropertybar.set('left', {checked: false});
                        w2ui.textpropertybar.set('center', {checked: false});
                        w2ui.textpropertybar.set('right', {checked: true});
                        break;
                }


                break;
            case 'image':
                $('#TextPropertyArea').hide();
                $('#ImagePropertyArea').show();
                $('#MorePropertyArea').hide();
                $('#StarPropertyArea').hide();
                $('#BGPropertyArea').hide();

                break;
            case 'polygon':
                $('#TextPropertyArea').hide();
                $('#ImagePropertyArea').hide();
                $('#MorePropertyArea').hide();
                $('#StarPropertyArea').show();
                $('#BGPropertyArea').hide();
                break;
            case 'rect':
            case 'ellipse':
            case 'line':
            case 'text':
                $('#TextPropertyArea').hide();
                $('#ImagePropertyArea').hide();
                $('#MorePropertyArea').show();
                $('#StarPropertyArea').hide();
                $('#BGPropertyArea').hide();

                break;
        }

    }
}

function onSelectionCleared(event) {
    $('#TextPropertyArea').hide();
    $('#ImagePropertyArea').hide();
    $('#MorePropertyArea').hide();
    $('#StarPropertyArea').hide();
    $('#BGPropertyArea').show();

    w2ui.toolbar.set('lock', {checked: false});

}

let _config = {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1,
};

function updateCanvasState() {
    // console.log('history updated!');
    if ((_config.undoStatus === false && _config.redoStatus === false)) {
        let jsonData = canvas.toJSON();
        let canvasAsJson = JSON.stringify(jsonData);
        if (_config.currentStateIndex < _config.canvasState.length - 1) {
            let indexToBeInserted = _config.currentStateIndex + 1;
            _config.canvasState[indexToBeInserted] = canvasAsJson;
            let numberOfElementsToRetain = indexToBeInserted + 1;
            _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
        } else {
            _config.canvasState.push(canvasAsJson);
        }
        w2ui.toolbar.enable('undo');
        _config.currentStateIndex = _config.canvasState.length - 1;
        if ((_config.currentStateIndex === _config.canvasState.length - 1) && _config.currentStateIndex !== -1) {
            w2ui.toolbar.disable('redo');
        }
    }
}


function undo() {
    if (_config.undoFinishedStatus) {
        if (_config.currentStateIndex === -1) {
            _config.undoStatus = false;
        }
        else {
            if (_config.canvasState.length >= 1) {
                _config.undoFinishedStatus = 0;
                if (_config.currentStateIndex !== 0) {
                    _config.undoStatus = true;
                    canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], function () {
                        let jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex - 1]);
                        canvas.renderAll();
                        _config.undoStatus = false;
                        _config.currentStateIndex -= 1;
                        w2ui.toolbar.enable('undo');
                        if (_config.currentStateIndex !== _config.canvasState.length - 1) {
                            w2ui.toolbar.enable('redo');
                        }
                        _config.undoFinishedStatus = 1;
                    });
                }
                else if (_config.currentStateIndex === 0) {
                    canvas.clear();
                    setCanvasProperties();
                    _config.undoFinishedStatus = 1;
                    w2ui.toolbar.disable('undo');
                    w2ui.toolbar.enable('redo');
                    _config.currentStateIndex -= 1;
                }
            }
        }
    }
}

function redo() {
    if (_config.redoFinishedStatus) {
        if ((_config.currentStateIndex === _config.canvasState.length - 1) && _config.currentStateIndex !== -1) {
            w2ui.toolbar.disable('redo');
        } else {
            if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length !== 0) {
                _config.redoFinishedStatus = 0;
                _config.redoStatus = true;
                canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function () {
                    var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex + 1]);
                    canvas.renderAll();
                    _config.redoStatus = false;
                    _config.currentStateIndex += 1;
                    if (_config.currentStateIndex !== -1) {
                        w2ui.toolbar.enable('undo');
                    }
                    _config.redoFinishedStatus = 1;
                    if ((_config.currentStateIndex === _config.canvasState.length - 1) && _config.currentStateIndex !== -1) {
                        w2ui.toolbar.disable('redo');
                    }
                });
            }
        }
    }
}
