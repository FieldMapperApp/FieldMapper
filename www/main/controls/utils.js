export function createSecondCol() {

    let topLeftControl2 = document.createElement('div');
    topLeftControl2.classList.add('leaflet-top', 'leaflet-left-2');

    let topLeftControl3 = document.createElement('div');
    topLeftControl3.classList.add('leaflet-top', 'leaflet-left-3');
    document.getElementsByClassName('leaflet-control-container')[0].append(topLeftControl2, topLeftControl3);

    let bottomRightControl2 = document.createElement('div');
    bottomRightControl2.classList.add('leaflet-bottom', 'leaflet-right-2');
    document.getElementsByClassName('leaflet-control-container')[0].append(bottomRightControl2);

    topLeftControl2.id = 'top-left-ctrl-2';
    topLeftControl3.id = 'top-left-ctrl-3';
    bottomRightControl2.id = 'bottom-right-ctrl-2';

}

export var moveButtons = _moveButtons();

function _moveButtons(e, event) {

    let firstEl2Col, firstEl3Col;

    return function _move(e, event) {

        let el = (e.getContainer().classList.contains('leaflet-control') ? e.getContainer() : e.getContainer().parentElement);

        let topLeftControl = document.getElementsByClassName('leaflet-top leaflet-left')[0];
        let topRightControl = document.getElementsByClassName('leaflet-top leaflet-right')[0];

        let topLeftControl2 = document.getElementById('top-left-ctrl-2');
        let topLeftControl3 = document.getElementById('top-left-ctrl-3');
        let bottomRightControl2 = document.getElementById('bottom-right-ctrl-2');
        let attributionControl = document.getElementsByClassName('leaflet-control-attribution')[0];

        let _marginBottom = window.getComputedStyle(document.getElementsByClassName('leaflet-right leaflet-bottom')[0].firstChild).getPropertyValue('margin-bottom');
        let marginBottom = parseInt(_marginBottom.replace(/px/g, ''), 10);

        if (event.type === 'controlcollapse') {

            [...bottomRightControl2.childNodes].reverse()
                .forEach(e => {
                    if (enoughSpace(e, topRightControl, marginBottom, attributionControl)) {
                        e.remove();
                        topRightControl.appendChild(e);
                    }
                });

            [...topLeftControl3.childNodes].forEach(e => {
                if (enoughSpace(e, topLeftControl2, marginBottom)) {
                    e.remove();
                    topLeftControl2.appendChild(e);
                }
            });

            [...topLeftControl2.childNodes].forEach(e => {
                if (enoughSpace(e, topLeftControl, marginBottom)) {
                    e.remove();
                    topLeftControl.appendChild(e);
                }
            });

        } else {

            if (event.type === 'controlinit') {
                firstEl2Col = topLeftControl2.firstChild;
                firstEl3Col = topLeftControl3.firstChild;
            }
            let args = [event.type, el, topLeftControl2, topLeftControl3, bottomRightControl2, firstEl2Col, firstEl3Col, attributionControl];
            expandInit(...args);

        }
        changeBottom(bottomRightControl2, topRightControl, marginBottom);

    }
}

function expandInit(type, el, topLeftControl2, topLeftControl3, bottomRightControl2, firstEl2Col, firstEl3Col, attributionControl) {

    if (el.parentElement.classList.contains('leaflet-left', 'leaflet-top') && isElementOutMap(el)) {
        el.remove();
        if (type === 'controlinit') {
            topLeftControl2.appendChild(el) }
        else {
            firstEl2Col.insertAdjacentElement('beforebegin', el)
        }
    }
    if (el.parentElement.classList.contains('leaflet-left-2', 'leaflet-top') && isElementOutMap(el)) {
        el.remove();
        if (type === 'controlinit') {
            topLeftControl3.appendChild(el) }
        else {
            firstEl3Col.insertAdjacentElement('beforebegin', el)
        }
    }
    if (el.parentElement.classList.contains('leaflet-right', 'leaflet-top') && isElementOutMap(el, attributionControl)) {
        el.remove();
        bottomRightControl2.appendChild(el);
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

function changeBottom(secondCol, firstCol, marginBottom) {

    // align second col with first col

    if (secondCol.childNodes.length != 0) {

        let bottomElem = firstCol.childNodes[firstCol.childNodes.length - 1];
        let rect = bottomElem.getBoundingClientRect();
        let rectMap = document.getElementById('map').getBoundingClientRect();

        let bottom = (Math.abs(rect.bottom - rectMap.bottom) - marginBottom).toString() + "px";
        secondCol.style.bottom = bottom;

    }

}

export function changeButtons(arr) {
    arr.forEach(i => {
        if (i.active == true) { i.setInactive() };
    });
};