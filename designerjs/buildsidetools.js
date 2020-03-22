
function buildsidebar() {
    $('#Sides').w2toolbar({
        name: 'sides',
        items: [
            {type: 'button', id: 'front', caption: 'FRONT SIDE'},
            {type: 'break', id: 'break1'},
            {type: 'button', id: 'back', caption: 'REVERSE SIDE'},
            {type: 'spacer'},
            {type: 'button', id: 'preview', caption: 'Preview', icon: 'fas fa-eye'},
            {type: 'button', id: 'next', caption: 'Next', icon: 'fas fa-hand-point-right'},
        ],
        onClick: function (event) {
            console.log(event.target);
            switch (event.target) {
                case 'preview':
                    openPreviewPopup();
                    break;
            }
        }
    });
}

function openPreviewPopup() {
    let img = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8,
    });
    w2popup.open({
        title: 'Front Side',
        body: '<div class="w2ui-centered"><img src="' + img + '" style="width: 90%; height: 90%; margin: auto;"></div>',
        buttons: '<button class="w2ui-btn" onclick="w2popup.close();">Close</button> ',
        width: 600,
        height: 400,
        overflow: 'hidden',
        color: '#333',
        speed: '0.3',
        opacity: '0.8',
        modal: false,
        showClose: false,
        showMax: true,
        onOpen: function (event) {
            console.log('open');
        },
        onClose: function (event) {
            console.log('close');
        },
        onMax: function (event) {
            console.log('max');
        },
        onMin: function (event) {
            console.log('min');
        },
        onKeydown: function (event) {
            console.log('keydown');
        }
    });
}