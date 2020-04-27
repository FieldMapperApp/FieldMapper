import { getOptions } from '../settings/utils';
import { Feature } from './feature';
import { iconColor, addPopUp } from './utils';

export async function onMousedown(e) {

    let map = e.target;
    map.dragging.disable();
    let feature = new Feature; // these are the attributes of the object
    await feature.create();

    let line = L.polyline([e.latlng], { color: feature.properties.color })
        .addTo(map)
        .addTo(app.lines);
    line.feature = feature;

    map.on('mousemove', onMousemove);

    function onMousemove(e) {
        line.addLatLng(e.latlng); // draw line while moving the mouse
        map.on('mouseup', onMouseup);
    }

    function onMouseup() {
        map.off('mousemove', onMousemove);
        map.dragging.enable();

        line.feature.properties.comments = (getOptions().comments ? prompt('Comments: ', '') : null);

        addPopUp(line);
        map.off('mouseup', onMouseup);
    }

}

export async function onClick(e) {

    let map = e.target;
    let feature = new Feature; // attributes of the object
    await feature.create();

    let marker = L.marker(e.latlng, { icon: iconColor(feature.properties.color), draggable: true })
        .addTo(map)
        .addTo(app.points);
    feature.properties.comments = (getOptions().comments ? prompt('Comments: ', '') : null);
    marker.feature = feature;

    addPopUp(marker);

}


