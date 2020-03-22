let buildtoolbar = function () {
    $('#ToolsArea').w2toolbar({
        name: 'toolbar',
        items: [
            {type: 'button', id: 'text', caption: 'New Text', icon: 'fas fa-pencil-alt'},
            {
                type: 'menu', id: 'image', caption: 'New Image', img: 'fas fa-image', items: [
                    {id: 'mycomputer', text: 'My Computer', icon: 'fas fa-desktop'},
                    {id: 'preupload', text: 'Previous Uploads', icon: 'fas fa-cloud-upload-alt'},
                    {id: 'imagelibrary', text: 'Image Library', icon: 'fas fa-images'},
                    // {id: 'sampleimage', text: 'Sample', icon: 'fas fa-images'},
                ]
            },
            {
                type: 'menu', id: 'more', caption: 'More', img: 'fas fa-ellipsis-v', items: [
                    {text: 'Table', icon: 'fas fa-table'},
                    {text: 'QR Code', icon: 'fas fa-qrcode'},
                    {text: 'Arrow', icon: 'fas fa-arrow-up'},
                    {text: 'Rectangle', icon: 'fas fa-square'},
                    {text: 'Oval', icon: 'fas fa-circle'},
                    {text: 'Line', icon: 'fas fa-slash'},
                    {text: 'Star', icon: 'fas fa-haykal'},
                    // {text: 'Regular polygon', icon: 'fas fa-draw-polygon'},
                ]
            },
            {type: 'break', id: 'break1'},
            {type: 'check', id: 'magnet', tooltip: 'Snap to Grid(S)', icon: 'fas fa-magnet'},
            {type: 'check', id: 'lock', tooltip: 'Lock(L)', icon: 'fas fa-lock'},
            {type: 'button', id: 'delete', tooltip: 'Delete(Del)', icon: 'fas fa-trash-alt'},
            // {type: 'break', id: 'break2'},
            {type: 'spacer'},
            {type: 'button', id: 'undo', disabled: true, tooltip: 'Undo(Ctrl+Z)', icon: 'fas fa-undo'},
            {type: 'button', id: 'redo', disabled: true, tooltip: 'Redo(Ctrl+Y)', icon: 'fas fa-redo'},
            // {type: 'button', id: 'proof', caption: 'Proof', icon: 'fas fa-file'},
            {
                type: 'menu', id: 'proof', caption: 'Proof', img: 'fas fa-file', items: [
                    {id: 'png', text: 'PNG', icon: 'fas fa-file-image'},
                    {id: 'pdf', text: 'PDF', icon: 'fas fa-file-pdf'},
                ]
            },
            {
                type: 'menu', id: 'save', tooltip: 'Save(Ctrl+S)', img: 'fas fa-save', items: [
                    {id: 'load', text: 'Load', icon: 'fas fa-upload'},
                    {id: 'save', text: 'Save', icon: 'fas fa-save'},
                    {id: 'saveas', text: 'Save As', icon: 'fas fa-save'},
                ]
            },
        ],
        onClick: function (event) {
            let objects = null;
            switch (event.target) {
                case 'text':
                    createFabricText('Text');
                    break;
                case 'image:mycomputer':
                    $('#localimageinput').trigger('click');
                    break;
                case 'more:Table':
                    break;
                case 'more:QR Code':
                    openQRpopup(event);
                    break;
                case 'more:Arrow':
                    openArrowpopup(event);
                    break;
                case 'more:Rectangle':
                    createFabricRect();
                    break;
                case 'more:Oval':
                    createFabricOval();
                    break;
                case 'more:Line':
                    createFabricLine();
                    break;
                case 'more:Star':
                    createStar();
                    break;
                // case 'more:Regular polygon':
                //     createRPolygon();
                //     break;
                case 'delete':
                    console.log('del');
                    setTimeout(() => window.open('http://google.com'), 3000);

                    deleteSelectedObj();
                    break;
                case 'lock':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set({
                            lockMovementX: !event.item.checked,
                            lockMovementY: !event.item.checked,
                            lockScalingX: !event.item.checked,
                            lockScalingY: !event.item.checked,
                            lockUniScaling: !event.item.checked,
                            lockRotation: !event.item.checked,
                        });
                        try {
                            objects[i].set({
                                editable: event.item.checked,
                            });
                        } catch (e) {
                            console.log('not text box !');
                        }
                    }

                    break;
                case 'magnet':
                    // console.log(!event.item.checked);
                    break;
                case 'undo':
                    undo();
                    break;
                case 'redo':
                    redo();
                    break;
                case 'proof':

                    break;
                case 'proof:png':
                    let b64 = canvas.toDataURL({
                        format: 'png',
                        multiplier: 4
                    });
                    download(b64, "YourDesign.png", "application/octet-stream");
                    break;
                case 'proof:pdf':
                    let b64i = canvas.toDataURL({
                        format: 'png',
                        multiplier: 4
                    });
                    let pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'px',
                        // format: 'a4',
                        format: [680, 398],
                    });
                    pdf.addImage(b64i, 'PNG', 0, 0, 680, 398);
                    pdf.save("YourDesign.pdf");
                    break;
                case 'save:load':
                    $('#designfromlocalinput').trigger('click');
                    break;
                case 'save:save':
                    saveDesign();
                    break;
                case 'save:saveas':
                    saveasDesign();
                    break;
            }
        }
    });


    $('#localimageinput').on('click', function (ev) {
        this.value = null;
    });
    $('#localimageinput').on('change', function (ev) {
        if (ev.target.value == null) {
            return;
        }
        var f = ev.target.files[0];
        var fr = new FileReader();

        fr.onload = function (ev2) {
            createFabricImage(ev2.target.result);
        };
        fr.readAsDataURL(f);
    });

    $('#designfromlocalinput').on('click', function (ev) {
        this.value = null;
    });
    $('#designfromlocalinput').on('change', function (ev) {
        if (ev.target.value == null) {
            return;
        }
        openLoadingOverlay();
        var f = ev.target.files[0];
        var fr = new FileReader();

        fr.onload = function (ev2) {
            canvas.loadFromJSON(ev2.target.result, function (evnt) {
                canvas.getObjects().forEach(function (v, i, arr) {
                    switch (v.type) {
                        case 'textbox':
                            setFabricTextProperties(v);
                            break;
                        case 'rect':
                            setFabricRectProperties(v);
                            break;
                        case 'oval':
                            setFabricOvalProperties(v);
                            break
                        case 'line':
                            setFabricLineProperties(v);
                            break;
                        case 'image':
                            setFabricImageProperties(v);
                            break;
                        case 'text':
                            setFabricTextArrowProperties(v);
                            break;
                    }
                    lockFabricObj(v);
                    BGImage = canvas.backgroundImage;
                }, this);
                canvas.requestRenderAll();
                closeLoadingOverlay();
            });
            //! -----------------------------------
        };
        canvas.clear();
        fr.readAsText(f);
    });

    var arrbtn = document.getElementById("arrowcharlist");
    for (let a = 8592; a <= 8703; a++) {
        let ch = String.fromCharCode(a);
        let as = document.createElement('a');
        as.value = as.innerHTML = ch;
        as.setAttribute('class', 'button unselectable');
        as.setAttribute("unselectable", "on");
        $(as).click(function () {
            createFabricTextArrow(ch);
            w2popup.close();
        });
        arrbtn.appendChild(as);
    }

    qrcode = new QRCode("qrcode");
    $("#qrtext").on("input", function (e) {
        var elText = e.target;
        qrcode.makeCode(elText.value);
    });


};

let deleteSelectedObj = function () {
    let objects = canvas.getActiveObjects();
    if (objects.length < 1) {
        return;
    }
    w2confirm('Want to delete?')
        .yes(function () {
            let objects = canvas.getActiveObjects();
            for (let i in objects) {
                canvas.remove(objects[i]);
            }
        })
        .no(function () {
            console.log('NO');
        });
};

let saveDesign = function () {
    download(JSON.stringify(canvas), "YourDesign.txt", "text/plain");
};

let saveasDesign = function () {
    download(JSON.stringify(canvas), "YourDesign.txt", "text/plain");
};

function createStar() {
    var numPoints = 5;
    var innerRadius = 50;
    var outerRadius = 100;
    var center = Math.max(innerRadius, outerRadius);
    var angle = Math.PI / numPoints;

    var points = [];
    for (var i = 0; i < numPoints * 2; i++) {
        var radius = i & 1 ? innerRadius : outerRadius;
        points.push({x: center + radius * Math.sin(i * angle), y: center - radius * Math.cos(i * angle)});
    }

    createFabricPolygon(points);
}


// function createRPolygon() {
//     var sides  = 5;
//     var radius = 100;
//     var angle  = 2 * Math.PI / sides;
//     var points = [];
//
//     for (var i = 0; i < sides; i++) {
//         points.push({x:radius + radius * Math.sin(i * angle), y: radius - radius * Math.cos(i * angle)});
//     }
//
//     createFabricPolygon(points);
// }


function openArrowpopup(event) {
    $('#arrowpopup').w2popup({
        overflow: 'hidden',
        speed: '0.3',
        opacity: '0.5',
        modal: false,
        showClose: false,
        showMax: false,
        width: 453,
        height: 300,
        onOpen: function (event) {
        },
        onClose: function (event) {
            console.log('close');
        }
    });

}


function openQRpopup(event) {
    $('#qrpopup').w2popup({
        overflow: 'hidden',
        speed: '0.3',
        opacity: '0.5',
        modal: true,
        showClose: true,
        showMax: false,
        width: 330,
        height: 400,
        buttons: '<button class="w2ui-btn" onclick="addQRtoCanvas(); w2popup.close();">Ok</button>',
        onOpen: function (event) {
            var elText = document.getElementById("qrtext");
            qrcode.makeCode(elText.value);
            window.enableShortKey = false;

        },
        onClose: function (event) {
            console.log('close');
            window.enableShortKey = true;
        }
    });

}

function addQRtoCanvas() {
    let qr = $('#qrcode').children('img')[0];
    createFabricQRImage(qr);
}
