import { writeToFile } from '../utils/export';

export function createUndoBtn(map, points, lines) {

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="undo last marker" src="img/undo.svg" height="55%" width="55%" />',
            onClick: function (control) {
                control.setActive();
                setTimeout(function () {
                    let features = points.getLayers().concat(lines.getLayers());
                    let sortedFeatures = features.sort((a, b) => {
                        return Date.parse(a.feature.properties.timestamp) - Date.parse(b.feature.properties.timestamp)
                    });
                    let lastFeature = sortedFeatures[sortedFeatures.length - 1];
                    let previousFeature = sortedFeatures[sortedFeatures.length - 2];

                    if (features.length !== 0) {
                        let sureUndo = confirm('Are your sure?');
                        if (sureUndo === true) {
                            if (lines.hasLayer(lastFeature)) {
                                lines.removeLayer(lastFeature);
                            } else {
                                points.removeLayer(lastFeature);
                            }
                            map.removeLayer(lastFeature);
                        }
                    };
                    control.setInactive();
                }, 2);
            },
        }]
    })
}

export function createClearBtn(map, points, lines) {
    
    function clearAll() {
        console.log(points.getLayers().length);
        console.log(lines.getLayers().length);
        points.eachLayer(e => map.removeLayer(e));
        lines.eachLayer(e => map.removeLayer(e));
        points.clearLayers();
        lines.clearLayers();
        console.log(points.getLayers().length);
        console.log(lines.getLayers().length);
    };

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="clear all" src="img/trash.svg" height="60%" width="60%" />',
            onClick: function (control) {
                control.setActive();
                setTimeout(function () {
                    if (lines.getLayers().length + points.getLayers().length !== 0) {
                        let sureClear = confirm('Are you sure?');
                        if (sureClear === true) { clearAll() };
                    };
                    control.setInactive();
                }, 2);
            },
        }]
    })
}

export function createSaveBtn(points, lines) {

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="save" src="img/save.svg" height="60%" width="60%" style="padding-top:6px" />',
            onClick: function (control) {
                control.setActive();
                setTimeout(function () {
                    control.setInactive();
                    let saveAs;
                    if (points.getLayers().length + lines.getLayers().length === 0) {
                        alert('Nothing there to save yet!')
                    } else {
                        saveAs = prompt('Save as', '');
                    };
                    console.log(JSON.stringify(points.toGeoJSON()));
                    console.log(JSON.stringify(lines.toGeoJSON()));
                    if (device.platform == 'Android' && saveAs != null) {
                        if (lines.getLayers() != null) { writeToFile(JSON.stringify(lines.toGeoJSON()), 'lines', saveAs) };
                        if (points.getLayers() != null) { writeToFile(JSON.stringify(points.toGeoJSON()), 'points', saveAs) };
                    };
                    clearAll();
                }, 2)
            }
        }]
    })
}

export function createGroupBtn() {
    return L.easyButton({
        position: 'topright',
        states: [{
            stateName: 'inactive',
            icon: '<img alt="tie to previous marker" src="img/user-friends.svg" width="60%" height="60%" />',
            onClick: function (control) {
                control.button.classList.add('group-active');
                console.log('group active');
                control.setActive();
                control.state('active');
            }
        }, {
            stateName: 'active',
            icon: '<img alt="untie" src="img/user-friends.svg" width="60%" height="60%" />',
            onClick: function (control) {
                control.button.classList.remove('group-active');
                console.log('group inactive');
                control.setInactive();
                control.state('inactive');
            }
        }],
    });
}