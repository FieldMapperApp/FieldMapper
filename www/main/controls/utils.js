export function createSecondCol() {

    let topLeftControl2 = document.createElement('div');
    topLeftControl2.classList.add('leaflet-top', 'leaflet-left-2');
    document.getElementsByClassName('leaflet-control-container')[0].append(topLeftControl2);
    let bottomRightControl2 = document.createElement('div');
    bottomRightControl2.classList.add('leaflet-bottom', 'leaflet-right-2');
    document.getElementsByClassName('leaflet-control-container')[0].append(bottomRightControl2);
    topLeftControl2.id = 'top-left-ctrl-2';
    bottomRightControl2.id = 'bottom-right-ctrl-2';

}

export var moveButtons = _moveButtons();

function _moveButtons(e, event) {

    let movedBtnsR = [];
    let movedBtnsL = [];

    return function _move(e, event) {

        let el = (e.getContainer().classList.contains('leaflet-control') ? e.getContainer() : e.getContainer().parentElement);

        let topLeftControl = document.getElementsByClassName('leaflet-top leaflet-left')[0];
        let topRightControl = document.getElementsByClassName('leaflet-top leaflet-right')[0];

        let topLeftControl2 = document.getElementById('top-left-ctrl-2');
        let bottomRightControl2 = document.getElementById('bottom-right-ctrl-2');
        let attributionControl = document.getElementsByClassName('leaflet-control-attribution')[0];

        let _marginBottom = window.getComputedStyle(document.getElementsByClassName('leaflet-right leaflet-bottom')[0].firstChild).getPropertyValue('margin-bottom');
        let marginBottom = parseInt(_marginBottom.replace(/px/g, ''), 10);

        if (event.type === 'controlcollapse') {


            if (movedBtnsR.length != 0) {
                movedBtnsR.forEach(e => {
                    if (enoughSpace(e, topRightControl, marginBottom, attributionControl)) {
                        e.remove();
                        topRightControl.appendChild(e);
                    }
                })
                changeBottom(bottomRightControl2, marginBottom);
                movedBtnsR = [];
            }
            if (movedBtnsL.length != 0) {
                movedBtnsL.forEach(e => {
                    if (enoughSpace(e, topLeftControl, marginBottom)) {
                        e.remove();
                        topLeftControl.appendChild(e);
                    }
                })
                movedBtnsL = [];
            }

        } else {

            if (el.parentElement.classList.contains('leaflet-left', 'leaflet-top') && isElementOutMap(el)) {
                el.remove();
                topLeftControl2.appendChild(el);
                movedBtnsL.push(el);
            }
            if (el.parentElement.classList.contains('leaflet-right', 'leaflet-top') && isElementOutMap(el, attributionControl)) {
                el.remove();
                bottomRightControl2.appendChild(el);
                changeBottom(bottomRightControl2, marginBottom);
                movedBtnsR.push(el);
            }

        }

    }


}

function isElementOutMap(el, ctrl) {
    let rect = el.getBoundingClientRect();
    let bottom = (ctrl ? ctrl.getBoundingClientRect().top : document.getElementById('map').getBoundingClientRect().bottom);

    return (rect.bottom > bottom)
}

function enoughSpace(el, col, marginBottom, ctrl) {
    let children = [...col.childNodes];
    let lastChild = children[children.length - 1];
    let bottomBtn = (lastChild.offsetHeight > 0 ? lastChild : lastChild.childNodes[0]);
    let bottomEdge = (ctrl ? ctrl.getBoundingClientRect().top : document.getElementById('map').getBoundingClientRect().bottom);
    
    return ((bottomBtn.getBoundingClientRect().bottom + el.offsetHeight + marginBottom) < bottomEdge);
} 

function changeBottom(col, marginBottom) {

    // align second col to first col

    let containerRight = document.getElementsByClassName('leaflet-right')[0];
    let bottomElem = containerRight.childNodes[containerRight.childNodes.length - 1];
    let rect = bottomElem.getBoundingClientRect();
    let rectMap = document.getElementById('map').getBoundingClientRect();

    let bottom = (Math.abs(rect.bottom - rectMap.bottom) - marginBottom).toString() + "px";

    col.style.bottom = bottom;

}

export function changeButtons(arr) {
    arr.forEach(i => {
        if (i.active == true) { i.setInactive() };
    });
};