import { writeToFile } from '../utils/export';
import { getOptions } from '../settings/utils';

export function createUndoBtn(map, points, lines, imports) {

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="undo last marker" src="img/undo.svg" height="55%" width="55%" />',
            onClick: function (control) {
                control.setActive();
                setTimeout(async function () {
                    let options = await getOptions();
                    let features = points.getLayers().concat(lines.getLayers());

                    if (options.deletion) {
                        features = features.concat(imports.getLayers())
                    }

                    let sortedFeatures = features.sort((a, b) => {
                        return Date.parse(a.feature.properties.timestamp) - Date.parse(b.feature.properties.timestamp)
                    });
                    let lastFeature = sortedFeatures[sortedFeatures.length - 1];

                    if (features.length !== 0) {
                        let sureUndo = confirm('Are your sure?');
                        if (sureUndo === true) {
                            if (lines.hasLayer(lastFeature)) {
                                lines.removeLayer(lastFeature);
                            } else if (points.hasLayer(lastFeature)) {
                                points.removeLayer(lastFeature);
                            } else {
                                imports.removeLayer(lastFeature)
                            }
                            map.removeLayer(lastFeature);
                        }
                    }
                    control.setInactive();
                }, 2);
            },
        }]
    })
}

export function createClearBtn(map, points, lines, imports) {

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="clear all" src="img/trash.svg" height="60%" width="60%" />',
            onClick: function (control) {
                control.setActive();
                setTimeout(async function () {
                    let options = await getOptions();
                    let layers = lines.getLayers().length + points.getLayers().length;
                    if (options.deletion) {
                        console.log('option true')
                        console.log(imports.getLayers())
                        layers += imports.getLayers().length;
                    }
                    console.log(layers)
                    if (layers !== 0) {
                        let sureClear = confirm('Are you sure?');
                        if (sureClear === true) { clearAll(options.deletion, points, lines, imports, map) }
                    }
                    control.setInactive();
                }, 2);
            },
        }]
    })
}

export function createSaveBtn(map, points, lines, imports) {

    return L.easyButton({
        position: 'topright',
        states: [{
            icon: '<img alt="save" src="img/save.svg" height="60%" width="60%" style="padding-top:6px" />',
            onClick: async function (control) {

                let options = await getOptions();

                control.setActive();
                setTimeout(async function () {

                    control.setInactive();

                    let saveAs;
                    let layers = lines.getLayers().length + points.getLayers().length;
                    if (options.deletion) {
                        layers += imports.getLayers().length;
                    }
                    if (layers === 0) {
                        alert('Nothing there to save yet!')
                    } else {
                        saveAs = prompt('Save as', '');
                    }

                    console.log(JSON.stringify(points.toGeoJSON()));
                    console.log(JSON.stringify(lines.toGeoJSON()));
                    console.log(JSON.stringify(imports.toGeoJSON()));

                    if (device.platform == 'Android' && saveAs) {
                        if (lines.getLayers()) { await writeToFile(JSON.stringify(lines.toGeoJSON()), 'lines', saveAs) }
                        if (points.getLayers()) { await writeToFile(JSON.stringify(points.toGeoJSON()), 'points', saveAs) }
                        if (options.export && imports.getLayers()) { await writeToFile(JSON.stringify(imports.toGeoJSON()), 'imports', saveAs) }
                    
                        clearAll(options.deletion, points, lines, imports, map);
                    }

                }, 2)
            }
        }]
    })
}

function clearAll(option, points, lines, imports, map) {

    console.log(points.getLayers().length);
    console.log(lines.getLayers().length);
    console.log(imports.getLayers().length);
    points.eachLayer(e => map.removeLayer(e));
    lines.eachLayer(e => map.removeLayer(e));
    points.clearLayers();
    lines.clearLayers();
    if (option) {
        imports.eachLayer(e => map.removeLayer(e));
        imports.clearLayers();
    }
    console.log(points.getLayers().length);
    console.log(lines.getLayers().length);
    console.log(imports.getLayers().length);
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