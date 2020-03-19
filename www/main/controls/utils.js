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

        let _height = window.getComputedStyle(document.getElementsByClassName('leaflet-right leaflet-top')[0].lastChild.childNodes[0]).getPropertyValue('height');
        let height = parseInt(_height.replace(/px/g, ''), 10);

        if (event === 'collapse') {

            if (movedBtnsR.length != 0) {
                movedBtnsR.forEach(e => {
                    if (enoughSpace(topRightControl, marginBottom, height, attributionControl)) {
                        e.remove();
                        topRightControl.appendChild(e);
                    }   
                })
                changeBottom(bottomRightControl2, marginBottom);
                movedBtnsR = [];
            }
            if (movedBtnsL.length != 0) {
                movedBtnsL.forEach(e => {
                    if (enoughSpace(topLeftControl, marginBottom, height)) {
                        e.remove();
                        topLeftControl.appendChild(e);
                    }
                })
                movedBtnsL = [];
            }

        } else {

            if (isElementOutViewport(el) && el.parentElement.classList.contains('leaflet-left', 'leaflet-top')) {
                el.remove();
                topLeftControl2.appendChild(el);
                movedBtnsL.push(el);
            }
            if ((doElementsOverlap(el, attributionControl) || isElementOutViewport(el)) && el.parentElement.classList.contains('leaflet-right', 'leaflet-top')) {
                el.remove();
                bottomRightControl2.appendChild(el);
                changeBottom(bottomRightControl2, marginBottom);
                movedBtnsR.push(el);
            }

        }

    }


}

function isElementOutViewport(el) {
    let rect = el.getBoundingClientRect();
    let container = document.getElementById('map');
    return rect.bottom < 0 || rect.right < 0 || rect.left > container.clientWidth || rect.top > container.clientHeight;
} //https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433

function doElementsOverlap(el1, el2) {
    let rect1 = el1.getBoundingClientRect();
    let rect2 = el2.getBoundingClientRect();

    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom)
} //https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements

function enoughSpace(col, marginBottom, height, ctrl) {
    let children = [...col.childNodes];
    let bottomBtn = children[children.length - 1];
    let elemPos = (ctrl ? ctrl.getBoundingClientRect().top : document.getElementById('map').getBoundingClientRect().bottom);

    return Math.floor(elemPos / (bottomBtn.getBoundingClientRect().bottom + height + marginBottom))
}

function changeBottom(col, marginBottom) {

    // align second col to first col

    let containerRight = document.getElementsByClassName('leaflet-right')[0];
    let bottomElem = containerRight.childNodes[containerRight.childNodes.length - 1];
    let rect = bottomElem.getBoundingClientRect();
    let rectMap = document.getElementById('map').getBoundingClientRect();
    let _margin = window.getComputedStyle(document.getElementsByClassName('leaflet-right leaflet-bottom')[0].firstChild).getPropertyValue('margin-bottom');
    let margin = parseInt(_margin.replace(/px/g, ''), 10);

    let bottom = (Math.abs(rect.bottom - rectMap.bottom) - marginBottom).toString() + "px";

    col.style.bottom = bottom;

}

export function changeButtons(arr) {
    arr.forEach(i => {
        if (i.active == true) { i.setInactive() };
    });
};