export function addPopUp(feature) {

    let featureProperties = "";
    let i = 0;
    for (let [key, value] of Object.entries(feature.feature.properties)) {
        i += 1;
        featureProperties = featureProperties.concat(key.bold() + ": " + value + (i < Object.values(feature.feature.properties).length ? ", " : ""));
    }
    feature.bindPopup(featureProperties, { maxHeight: 80 });

    console.log('popup added');

}

export function iconColor(color) {

    return L.divIcon({
        className: "custom-pin",
        iconAnchor: [12, 60],
        popupAnchor: [0, -34],
        html: `<i class="icon icon-big ion-location ${color}"></i>`
    })

}

export function checkGroup(group, options) {
    let prev = getLastLayer();
    if (prev) { console.log(prev.feature.properties.group, ' ', group) } else { console.log(group) };
    return (prev && options.groupColor ? prev.feature.properties.group !== group : false)
}

function getLastLayer() {
    
    let lastP = app.points.getLayers()[app.points.getLayers().length - 1];
    let lastL = app.lines.getLayers()[app.lines.getLayers().length - 1];

    if (lastP && lastL) {
        return (Date.parse(lastP.feature.properties.timestamp) > Date.parse(lastL.feature.properties.timestamp) ? lastP : lastL)
    } else if (lastP && !lastL) {
        return lastP
    } else if (!lastP && lastL) {
        return lastL
    } else {
        return undefined
    }
        
}