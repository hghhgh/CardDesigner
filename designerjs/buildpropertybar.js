let buildpropertybar = function () {
    $('#TextPropertyArea').w2toolbar({
        name: 'textpropertybar',
        items: [
            {type: 'button', id: 'inputbox', caption: 'Edit Text', icon: 'fas fa-edit'},
            // {
            //      // type: 'drop', id: 'inputbox', text: 'Text', icon: 'fa-plus',
            //      type: 'drop', id: 'inputbox', text: 'Edit', icon: 'fas fa-edit',
            //      html: function (item) {
            //          var html =
            //              '<div style="padding: 3px 10px;">' +
            //              '<textarea rows="4" cols="50" id="inputtext" size="30" oninput="updateTextValue(this.value)" ' +
            //              'onfocus="loadTextValue(this)" style="padding: 3px; border-radius: 2px; border: 1px solid silver"/>' +
            //              '</div>';
            //          return html;
            //      },
            //  },
            {
                type: 'html', id: 'fontfamily',
                html: function (item) {
                    var html = '<select id = "fontlist" onChange = "updateFontFamily();">';
                    return '<div style="padding: 3px 10px;">' + html + '</div>';
                }
            },
            {
                type: 'drop', id: 'fontsize', text: 'Size', icon: 'fas fa-arrows-alt-v',
                // type: 'html', id: 'fontsize',
                html: function (item) {
                    let cv = canvas.getActiveObject();
                    if (cv.type === 'textbox') {
                        let fs = cv.fontSize;
                        var html = '<table><tr>' +
                            '<td><input type="range" min="7" max="96" value="' + fs + '" id="fontsizeslider" oninput="updateSliderVal(this.value)"></td>' +
                            '<td style="text-align:center" id="fontsizesliderval">' + fs + '</td>' +
                            '</tr></table>';
                        return '<div style="padding: 3px 5px;">' + html + '</div>';
                    }
                    return '<div style="padding: 3px 5px;"></div>';
                }
            },
            {id: 'textcolor', type: 'color', caption: 'Color'},
            {
                type: 'drop', id: 'opacity', text: 'Opacity', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table class="slidervaltable">' +
                        '<tr> <td>Opacity:</td>' +
                        '<td><input type="range" value="1" min="0.01" max="1" step="0.01" oninput="changeActiveObjOpacity(this.value)"></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {type: 'break'},
            {id: 'bold', tooltip: 'Bold', type: 'check', icon: 'fas fa-bold'},
            {id: 'italic', tooltip: 'Italic', type: 'check', icon: 'fas fa-italic'},
            {id: 'underline', tooltip: 'Underline', type: 'check', icon: 'fas fa-underline'},
            {type: 'break'},
            {type: 'radio', group: '1', id: 'left', tooltip: 'Left', icon: 'fas fa-align-left'},
            {type: 'radio', group: '1', id: 'center', tooltip: 'Center', icon: 'fas fa-align-center'},
            {type: 'radio', group: '1', id: 'right', tooltip: 'Right', icon: 'fas fa-align-right'},
            {type: 'break'},
            {type: 'check', group: '2', id: 'numbering', tooltip: 'Numbering', icon: 'fas fa-list-ol'},
            {type: 'check', group: '2', id: 'bullet', tooltip: 'Bullet', icon: 'fas fa-list'},
            {type: 'break'},
            {
                type: 'menu', id: 'arrange', tooltip: 'Arrange', icon: 'fas fa-bars', items: [
                    {id: 'bfw', text: 'Bring Forward', icon: 'fas fa-level-up-alt'},
                    {id: 'sbw', text: 'Send Backward', icon: 'fas fa-level-down-alt'},
                    {id: 'sb', text: 'Send to Back', icon: 'fas fa-angle-double-down'},
                    {id: 'bf', text: 'Bring to Front', icon: 'fas fa-angle-double-up'},
                ]
            },
            // {type: 'break'},
            // {type: 'radio', id: 'special', tooltip: 'Special Character', icon: 'fas fa-keyboard'},
            {type: 'button', id: 'dup', tooltip: 'Duplicate', icon: 'fas fa-clone'},
        ],
        onClick: function (event) {
            // console.log(JSON.stringify(event));
            let objects = null;
            switch (event.target) {
                case 'inputbox':
                    openTextPopup(event);
                    break;
                case 'textcolor':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].setColor('#' + event.color);
                    }
                    break;
                case 'bold':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('fontWeight', !event.item.checked ? 'bold' : '');
                        objects[i].set({dirty: true});
                    }
                    break;
                case 'italic':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('fontStyle', !event.item.checked ? 'italic' : '');
                        objects[i].set({dirty: true});
                    }
                    break;
                case 'underline':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('underline', !event.item.checked);
                        objects[i].set({dirty: true});
                    }
                    break;
                case 'left':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('textAlign', 'left'); // can be : "justify-left", "justify-center" or "justify-right".
                    }
                    break;
                case 'center':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('textAlign', 'center');
                    }
                    break;
                case 'right':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('textAlign', 'right');
                    }
                    break;
                case 'numbering':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        let txt = objects[i].text;
                        if (!event.item.checked) {
                            if (txt === '') {
                                txt += '1. ';
                            } else {
                                txt = '1. ' + txt;
                                objects[i].set({text: numbering(txt, 2)});
                            }
                        }
                        else {
                            if (txt.substring(0, 3) === '1. ') {
                                txt = txt.substring(3, txt.length);
                            }
                            objects[i].set({text: txt.replaceAll(/\n\d. /g, '\n')});
                        }
                    }

                    break;
                case 'bullet':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        let txt = objects[i].text;
                        if (!event.item.checked) {
                            if (txt === '') {
                                txt += '• ';
                            } else {
                                txt = '• ' + txt;
                                objects[i].set({text: txt.replaceAll('\n', '\n• ')});
                            }
                        }
                        else {
                            if (txt.substring(0, 2) === '• ') {
                                txt = txt.substring(2, txt.length);
                            }
                            objects[i].set({text: txt.replaceAll('\n• ', '\n')});
                        }
                    }
                    break;
                case 'arrange:bfw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringForward(objects[i])
                    }
                    break;
                case 'arrange:sbw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendBackwards(objects[i])
                    }
                    break;
                case 'arrange:bf':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringToFront(objects[i])
                    }
                    break;
                case 'arrange:sb':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendToBack(objects[i])
                    }
                    break;
                // case 'special':
                //     objects = canvas.getActiveObjects();
                //     for (let i in objects) {
                //         objects[i].set('', '');
                //     }
                //     break;
                case 'dup':
                    Dup();
                    break;
            }
            canvas.renderAll();
        }
    });

    var select = document.getElementById("fontlist");
    for (let a = 0; a < fonts.length; a++) {
        let opt = document.createElement('option');
        opt.value = opt.innerHTML = fonts[a];
        opt.style.fontFamily = fonts[a];
        select.add(opt);
    }


    var schbtn = document.getElementById("specialcharlist");
    // for (let a = 33; a < 9830; a++) {
    for (let a = 33; a < schlist.length; a++) {
        let ch = schlist[a];
        // let ch = String.fromCharCode(a);
        let as = document.createElement('a');
        as.value = as.innerHTML = ch;
        as.setAttribute('class', 'button unselectable');
        as.setAttribute("unselectable", "on");
        $(as).click(function () {
            let itx = $('#inputtext');
            itx.val(itx.val() + ch);
            itx.trigger("oninput");
        });
        schbtn.appendChild(as);
    }

    $('#ImagePropertyArea').w2toolbar({
        name: 'imagepropertybar',
        items: [
            {type: 'button', id: 'croprotate', caption: 'Crop/Rotate', icon: 'fas fa-crop'},
            {
                type: 'menu', id: 'replaceimage', caption: 'Replace', img: 'fas fa-image', items: [
                    {id: 'mycomputer', text: 'My Computer', icon: 'fas fa-desktop'},
                    {id: 'preupload', text: 'Previous Uploads', icon: 'fas fa-cloud-upload-alt'},
                    {id: 'imagelibrary', text: 'Image Library', icon: 'fas fa-images'},
                ]
            },
            {
                type: 'drop', id: 'hsbcolor', text: 'Color', icon: 'fas fa-palette',
                html: function (item) {
                    let cv = canvas.getActiveObject();
                    if (cv.type === 'image') {
                        var html = '<table id="hsceditor">' +
                            '<tr> <td>Hue:</td>' +
                            '<td><input type="range" value="0" min="-2" max="2" step="0.002" oninput="changeFilter(0,\'rotation\',this.value)"></td>' +
                            '<td><a href="#" onclick="resetFilter(0,\'rotation\')">Reset</a></td></tr>' +
                            '<tr> <td>Saturation:</td>' +
                            '<td><input type="range" value="0" min="-1" max="1" step="0.003921" oninput="changeFilter(1,\'saturation\',this.value)"></td>' +
                            '<td><a href="#" onclick="resetFilter(1,\'saturation\')">Reset</a></td></tr>' +
                            '<tr> <td>Brightness:</td>' +
                            '<td><input type="range" value="0" min="-1" max="1" step="0.003921"oninput="changeFilter(2,\'brightness\',this.value)"></td>' +
                            '<td><a href="#" onclick="resetFilter(2,\'brightness\')">Reset</a></td></tr>' +
                            '</table>';
                        return '<div style="padding: 3px 5px;">' + html + '</div>';
                    }
                    return '<div style="padding: 3px 5px;"></div>';
                }
            },
            {
                type: 'drop', id: 'opacity', text: 'Opacity', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table class="slidervaltable">' +
                        '<tr> <td>Opacity:</td>' +
                        '<td><input type="range" value="1" min="0.01" max="1" step="0.01" oninput="changeActiveObjOpacity(this.value)"></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {
                type: 'menu', id: 'arrange', tooltip: 'Arrange', icon: 'fas fa-bars', items: [
                    {id: 'bfw', text: 'Bring Forward', icon: 'fas fa-level-up-alt'},
                    {id: 'sbw', text: 'Send Backward', icon: 'fas fa-level-down-alt'},
                    {id: 'sb', text: 'Send to Back', icon: 'fas fa-angle-double-down'},
                    {id: 'bf', text: 'Bring to Front', icon: 'fas fa-angle-double-up'},
                ]
            },
            {type: 'button', id: 'dup', tooltip: 'Duplicate', icon: 'fas fa-clone'},
        ],
        onClick: function (event) {
            let objects = null;
            switch (event.target) {
                case 'croprotate':
                    openCropPopup(event);
                    break;
                case 'replaceimage:mycomputer':
                    $('#replacelocalimageinput').trigger('click');
                    break;
                case 'arrange:bfw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringForward(objects[i])
                    }
                    break;
                case 'arrange:sbw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendBackwards(objects[i])
                    }
                    break;
                case 'arrange:bf':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringToFront(objects[i])
                    }
                    break;
                case 'arrange:sb':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendToBack(objects[i])
                    }
                    break;
                case 'dup':
                    Dup();
                    break;
            }
        }
    });
    $('#replacelocalimageinput').on('click', function (ev) {
        this.value = null;
    });
    $('#replacelocalimageinput').on('change', function (ev) {
        if (ev.target.value == null) {
            return;
        }
        var f = ev.target.files[0];
        var fr = new FileReader();
        fr.onload = function (ev2) {
            let objects = canvas.getActiveObjects();
            for (let i in objects) {
                objects[i].setSrc(ev2.target.result, function () {
                    canvas.requestRenderAll();
                });
            }
        };
        fr.readAsDataURL(f);

    });

    $('#MorePropertyArea').w2toolbar({
        name: 'morepropertybar',
        items: [
            {
                type: 'drop', id: 'strokeWidth', text: 'Stroke Width', icon: 'fas fa-arrows-alt-v',
                // type: 'html', id: 'fontsize',
                html: function (item) {
                    let cv = canvas.getActiveObject();
                    let fs = cv.strokeWidth;
                    var html = '<table><tr>' +
                        '<td><input type="range" min="0" max="100" value="' + fs + '" id="linestrokeWidthlider" oninput="updateLinestrokeWidth(this.value)"></td>' +
                        '<td style="text-align:center" id="linestrokeWidthliderval">' + fs + '</td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {id: 'strokecolor', type: 'color', caption: 'Stroke Color'},
            {id: 'fillcolor', type: 'color', caption: 'Fill Color'},
            {
                type: 'drop', id: 'opacity', text: 'Opacity', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table class="slidervaltable">' +
                        '<tr> <td>Opacity:</td>' +
                        '<td><input type="range" value="1" min="0.01" max="1" step="0.01" oninput="changeActiveObjOpacity(this.value)"></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {
                type: 'drop', id: 'gradient', text: 'Gradient', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table>' +
                        '<tr> <td><div class="toRightGradBtn" onclick="setGradient(\'toright\');"></div></td>' +
                        '<td><div class="toLeftGradBtn" onclick="setGradient(\'toleft\');"></div></td>' +
                        '<td><div class="toBottomGradBtn" onclick="setGradient(\'tobottom\');"></div></td>' +
                        '<td><div class="toTopGradBtn" onclick="setGradient(\'totop\');"></div></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {
                type: 'menu', id: 'arrange', tooltip: 'Arrange', icon: 'fas fa-bars', items: [
                    {id: 'bfw', text: 'Bring Forward', icon: 'fas fa-level-up-alt'},
                    {id: 'sbw', text: 'Send Backward', icon: 'fas fa-level-down-alt'},
                    {id: 'sb', text: 'Send to Back', icon: 'fas fa-angle-double-down'},
                    {id: 'bf', text: 'Bring to Front', icon: 'fas fa-angle-double-up'},
                ]
            },
            {type: 'button', id: 'dup', tooltip: 'Duplicate', icon: 'fas fa-clone'},
        ],
        onClick: function (event) {
            let objects = null;
            switch (event.target) {
                case 'strokecolor':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('stroke', '#' + event.color);
                    }
                    break;
                case 'fillcolor':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('fill', '#' + event.color);
                    }
                    canvas.requestRenderAll();
                    break;
                case 'arrange:bfw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringForward(objects[i])
                    }
                    break;
                case 'arrange:sbw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendBackwards(objects[i])
                    }
                    break;
                case 'arrange:bf':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringToFront(objects[i])
                    }
                    break;
                case 'arrange:sb':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendToBack(objects[i])
                    }
                    break;
                // case 'special':
                //     objects = canvas.getActiveObjects();
                //     for (let i in objects) {
                //         objects[i].set('', '');
                //     }
                //     break;
                case 'dup':
                    Dup();
                    break;
            }
            canvas.requestRenderAll();

        }
    });

    $('#StarPropertyArea').w2toolbar({
        name: 'starpropertybar',
        items: [
            {
                type: 'drop', id: 'strokeWidth', text: 'Stroke Width', icon: 'fas fa-arrows-alt-v',
                // type: 'html', id: 'fontsize',
                html: function (item) {
                    let cv = canvas.getActiveObject();
                    let fs = cv.strokeWidth;
                    var html = '<table><tr>' +
                        '<td><input type="range" min="0" max="100" value="' + fs + '" id="linestrokeWidthlider" oninput="updateLinestrokeWidth(this.value)"></td>' +
                        '<td style="text-align:center" id="linestrokeWidthliderval">' + fs + '</td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {id: 'strokecolor', type: 'color', caption: 'Stroke Color'},
            {id: 'fillcolor', type: 'color', caption: 'Fill Color'},
            {
                type: 'drop', id: 'opacity', text: 'Number of Points', icon: 'fas fa-certificate',
                html: function (item) {
                    var html = '<table class="slidervaltable">' +
                        '<tr><td>Number of Points:</td>' +
                        '<td><input id="range_point" type="range" value="5" min="2" max="50" step="1" ' +
                        'oninput="changeStarPoint(this.value);range_point_disp.value = range_point.value;"></td>' +
                        '<td><output  id="range_point_disp"></output></td>' +
                        '</tr>' +
                        '<tr><td>Height of points:</td>' +
                        '<td><input id="range_height" type="range" value="50" min="1" max="100" step="1" ' +
                        'oninput="changeStarHeight(this.value);range_height_disp.value = range_height.value;"></td>' +
                        '<td><output  id="range_height_disp"></output></td>' +
                        '</tr>' +
                        '</table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {
                type: 'drop', id: 'opacity', text: 'Opacity', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table class="slidervaltable">' +
                        '<tr> <td>Opacity:</td>' +
                        '<td><input type="range" value="1" min="0.01" max="1" step="0.01" oninput="changeActiveObjOpacity(this.value)"></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
            {
                type: 'menu', id: 'arrange', tooltip: 'Arrange', icon: 'fas fa-bars', items: [
                    {id: 'bfw', text: 'Bring Forward', icon: 'fas fa-level-up-alt'},
                    {id: 'sbw', text: 'Send Backward', icon: 'fas fa-level-down-alt'},
                    {id: 'sb', text: 'Send to Back', icon: 'fas fa-angle-double-down'},
                    {id: 'bf', text: 'Bring to Front', icon: 'fas fa-angle-double-up'},
                ]
            },
            {type: 'button', id: 'dup', tooltip: 'Duplicate', icon: 'fas fa-clone'},
        ],
        onClick: function (event) {
            let objects = null;
            switch (event.target) {
                case 'strokecolor':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('stroke', '#' + event.color);
                    }
                    break;
                case 'fillcolor':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        objects[i].set('fill', '#' + event.color);
                    }
                    break;
                case 'arrange:bfw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringForward(objects[i])
                    }
                    break;
                case 'arrange:sbw':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendBackwards(objects[i])
                    }
                    break;
                case 'arrange:bf':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.bringToFront(objects[i])
                    }
                    break;
                case 'arrange:sb':
                    objects = canvas.getActiveObjects();
                    for (let i in objects) {
                        canvas.sendToBack(objects[i])
                    }
                    break;
                // case 'special':
                //     objects = canvas.getActiveObjects();
                //     for (let i in objects) {
                //         objects[i].set('', '');
                //     }
                //     break;
                case 'dup':
                    Dup();
                    break;
            }
            canvas.requestRenderAll();

        }
    });


    $('#BGPropertyArea').w2toolbar({
        name: 'bgpropertybar',
        items: [
            {
                type: 'menu', id: 'changebg', caption: 'Change Background', img: 'fas fa-image', items: [
                    {id: 'mycomputer', text: 'My Computer', icon: 'fas fa-desktop'},
                    {id: 'preupload', text: 'Previous Uploads', icon: 'fas fa-cloud-upload-alt'},
                    {id: 'imagelibrary', text: 'Image Library', icon: 'fas fa-images'},
                ]
            },
            {
                type: 'menu', id: 'resize', text: 'Resize', icon: 'fas fa-expand-arrows-alt', items: [
                    {type: 'radio', group: '1', id: 'scaleToHeight', text: 'Fit Height'},
                    {type: 'radio', group: '1', id: 'scaleToWidth', text: 'Fit Width'},
                    {type: 'radio', group: '1', id: 'normal', text: 'Normal'},
                ]
            },
            {
                type: 'drop', id: 'opacity', text: 'Opacity', icon: 'fas fa-palette',
                html: function (item) {
                    var html = '<table id="hsceditor">' +
                        '<tr> <td>Opacity:</td>' +
                        '<td><input type="range" value="1" min="0" max="1" step="0.01" oninput="changeBGOpacity(this.value)"></td>' +
                        '</tr></table>';
                    return '<div style="padding: 3px 5px;">' + html + '</div>';
                }
            },
        ],
        onClick: function (event) {
            switch (event.target) {
                case 'changebg:mycomputer':
                    $('#changebgfromlocalinput').trigger('click');
                    break;
                case 'changebg':
                    break;
                case 'resize:scaleToHeight':
                    if (!canvas.backgroundImage) return;
                    BGImage.scaleToHeight(canvas.height);
                    canvas.requestRenderAll();
                    break;
                case 'resize:scaleToWidth':
                    if (!canvas.backgroundImage) return;
                    BGImage.scaleToWidth(canvas.width);
                    canvas.requestRenderAll();
                    break;
                case 'resize:normal':
                    if (!canvas.backgroundImage) return;
                    BGImage.scaleToWidth(BGImage.width);
                    BGImage.scaleToHeight(BGImage.height);
                    canvas.requestRenderAll();
                    break;

            }
        }
    });
    $('#changebgfromlocalinput').on('click', function (ev) {
        this.value = null;
    });
    $('#changebgfromlocalinput').on('change', function (ev) {
        if (ev.target.value == null) {
            return;
        }
        var f = ev.target.files[0];
        var fr = new FileReader();
        fr.onload = function (ev2) {
            fabric.Image.fromURL(ev2.target.result, imgObj => {

                BGImage = imgObj;

                canvas.setBackgroundImage(imgObj, canvas.renderAll.bind(canvas), {
                    opacity: 1,
                    // strech: false
                });

            });
        };
        fr.readAsDataURL(f);
    });

};

function Dup() {
    canvas.getActiveObject().clone(function (clonedObj) {

        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            // evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function (obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        switch (clonedObj.type) {
            case 'textbox':
                setFabricTextProperties(clonedObj);
                break;
            case 'image':
                setFabricImageProperties(clonedObj);
                break;
            case 'line':
                setFabricLineProperties(clonedObj);
                break;
            case 'ellipse':
                setFabricOvalProperties(clonedObj);
                break;
        }
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
    });
}

function openTextPopup(event) {
    $('#texteditpopup').w2popup({
        overflow: 'hidden',
        speed: '0.3',
        opacity: '0.5',
        modal: false,
        showClose: false,
        showMax: false,
        onOpen: function (event) {
            var object = canvas.getActiveObject();
            $('#inputtext').val(object.text);
            window.enableShortKey = false;
        },
        onClose: function (event) {
            console.log('close');
            window.enableShortKey = true;
        }
    });
}

function updateTextValue(val) {
    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].set({text: val});
    }
    canvas.requestRenderAll();
}

function updateFontFamily() {
    var x = document.getElementById('fontlist').selectedIndex;
    var y = document.getElementById('fontlist').options;
    let font = y[x].text;

    // console.log(font);

    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].set("fontFamily", font);
    }
    canvas.requestRenderAll();

}

function checkForInputText(event) {
    let txtelement = document.getElementById('inputtext');
    var txtval = txtelement.value;
    var keycode = (event.keyCode ? event.keyCode : event.which);

    let numbering = w2ui.textpropertybar.get('numbering');
    let bullet = w2ui.textpropertybar.get('bullet');
    if (bullet.checked) {
        if (txtelement.value === '') {
            txtelement.value += '• ';
        }
        if (keycode === 13) {
            txtelement.value += '• ';
        }
        txtval = txtelement.value;
        if (txtval.substr(txtval.length - 1) === '\n') {
            txtelement.value = txtval.substring(0, txtval.length - 1);
        }
    }
    else if (numbering.checked) {
        if (txtelement.value === '') {
            txtelement.value += '1. ';
        }
        if (keycode === 13) {
            let nu = txtval.split('\n').length;
            txtelement.value += nu + '. ';
        }
        txtval = txtelement.value;
        if (txtval.substr(txtval.length - 1) === '\n') {
            txtelement.value = txtval.substring(0, txtval.length - 1);
        }

    }
}

function updateSliderVal(val) {
    document.getElementById('fontsizesliderval').innerHTML = val;
    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].set({fontSize: parseInt(val)});
    }
    canvas.renderAll();
}

function updateLinestrokeWidth(val) {
    document.getElementById('linestrokeWidthliderval').innerHTML = val;
    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        if (objects[i].type === 'line' && parseInt(val) < 1) {
            objects[i].set({strokeWidth: 1});
        }
        else {
            objects[i].set({strokeWidth: parseInt(val)});
        }
    }
    canvas.renderAll();
}

function changeActiveObjOpacity(val) {
    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].opacity = val;
    }
    canvas.renderAll();
}

function openCropPopup(event) {
    let obj = canvas.getActiveObject();
    if (obj.type !== 'image') {
        return;
    }
    const image = document.getElementById('croptarget');
    $('#imagecroppopup').w2popup({
        overflow: 'hidden',
        speed: '0.3',
        opacity: '0.5',
        width: 550,
        height: 550,
        modal: false,
        showClose: false,
        showMax: false,
        buttons: '<button class="w2ui-btn" onclick="w2popup.close();">Close</button> ' +
            '<button class="w2ui-btn" onclick="setImageFromCroppedOne(imgcropper); w2popup.close();">Ok</button>',
        onOpen: function (event) {
            image.src = obj.getSrc();
            imgcropper = new Cropper(image, {
                dragMode: 'move',
                viewMode: 2,
                rotatable: false,
                responsive: true,
                restore: true,
            });
        },
        onClose: function (event) {

        }
    });
}

function setImageFromCroppedOne(imgcropper) {
    let obj = canvas.getActiveObject();
    // let re = cropper.crop();
    obj.setSrc(imgcropper.getCroppedCanvas().toDataURL(), function () {
        // obj.setSrc(re.image.currentSrc, function () {
        canvas.requestRenderAll();
        imgcropper.destroy();
    });
}

function changeFilter(idx, attr, val) {
    let objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].filters[idx][attr] = val;
        objects[i].applyFilters();
        canvas.requestRenderAll();
    }
}

function resetFilter(idx, attr) {
    let objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].filters[idx][attr] = 0.0;
        objects[i].applyFilters();
        canvas.requestRenderAll();
    }
}

function changeStarPoint(numPoints) {
    var innerRadius = $('#range_height').val();
    var outerRadius = 100;
    var center = Math.max(innerRadius, outerRadius);
    var angle  = Math.PI / numPoints;

    var points = [];
    for (var i = 0; i < numPoints * 2; i++) {
        var radius = i & 1 ? innerRadius : outerRadius;
        points.push({x:center + radius * Math.sin(i * angle), y:center - radius * Math.cos(i * angle)});
    }

    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].points = points;
    }
    canvas.renderAll();
}
function changeStarHeight(innerRadius) {
    var numPoints = $('#range_point').val();
    var outerRadius = 100;
    var center = Math.max(innerRadius, outerRadius);
    var angle  = Math.PI / numPoints;

    var points = [];
    for (var i = 0; i < numPoints * 2; i++) {
        var radius = i & 1 ? innerRadius : outerRadius;
        points.push({x:center + radius * Math.sin(i * angle), y:center - radius * Math.cos(i * angle)});
    }

    var objects = canvas.getActiveObjects();
    for (let i in objects) {
        objects[i].points = points;
    }
    canvas.renderAll();
}

function changeBGOpacity(val) {
    if (!canvas.backgroundImage) return;
    BGImage.opacity = val;
    canvas.renderAll();
}

function rgb2transparent(rgb,opac) {
    let prt = rgb.split(')');
    return prt[0] + ',' + opac + ')';
}
function setGradient(dir) {
    let objects = canvas.getActiveObjects();
    for (let i in objects) {
        let clr = '';
        if ((typeof objects[i].fill) !== 'string'){
            clr = objects[i].fill.colorStops[0].color;
        }
        else {
            clr = objects[i].fill.indexOf('#') === 0 ? hexToRgb(objects[i].fill) : objects[i].fill;
        }
        switch (dir) {
            case 'toright':
                objects[i].setGradient('fill', {
                    type: 'linear',
                    x1: 0,
                    y1: 0,
                    x2: objects[i].width,
                    y2: 0,
                    colorStops: {
                        0: clr,
                        1: rgb2transparent(clr, 0)
                    }
                });
                break;
            case 'toleft':
                objects[i].setGradient('fill', {
                    type: 'linear',
                    x1: objects[i].width,
                    y1: 0,
                    x2: 0,
                    y2: 0,
                    colorStops: {
                        0: clr,
                        1: rgb2transparent(clr, 0)
                    }
                });
                break;
            case 'tobottom':
                objects[i].setGradient('fill', {
                    type: 'linear',
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: objects[i].height,
                    colorStops: {
                        0: clr,
                        1: rgb2transparent(clr, 0)
                    }
                });
                break
            case 'totop':
                objects[i].setGradient('fill', {
                    type: 'linear',
                    x1: 0,
                    y1: objects[i].height,
                    x2: 0,
                    y2: 0,
                    colorStops: {
                        0: clr,
                        1: rgb2transparent(clr, 0)
                    }
                });
                break
        }
        canvas.requestRenderAll();
    }

}