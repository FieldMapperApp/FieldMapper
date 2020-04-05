import { iconColor, addPopUp } from "../../draw/utils";
import { getDatetime } from '../../utils/date';

export class LayerStorage {

    constructor() {

        this.name = document.getElementById('layerName').value;
        this.type = this._getType();
        this.bounds = this._getBounds();

    }

    async create() {

        this.data = await this._getFile();

    }

    _getType() {

        let btns = [document.getElementById('geoJsonBtn'), document.getElementById('imageBtn')];
        let btns_classes = btns.map(e => e.classList.contains('grey-900'));
        return ['GeoJSON', 'imageOverlay'][btns_classes.indexOf(true)];

    }

    _getBounds() {

        if (this.type === 'imageOverlay') {

            let bounds1 = document.getElementById('layerBounds1').value.replace(/\s/g, "").split(',');
            let bounds2 = document.getElementById('layerBounds2').value.replace(/\s/g, "").split(',');

            return [bounds1.map(e => parseFloat(e)), bounds2.map(e => parseFloat(e))];

        } else {

            return null

        }

    }

    _getFile() {

        return new Promise(resolve => {

            let reader = new FileReader;
            let file = document.getElementById('layerFile').files[0];

            if (this.type === 'GeoJSON') { reader.readAsText(file) } else { reader.readAsDataURL(file) }
            reader.onload = (ev) => {
                resolve(ev.target.result);
            }

        })

    }

}

export class Layer {

    constructor(obj) {

        Object.assign(this, obj);

        this.layer = this._getLayer();
    }

    _getLayer() {

        if (this.type === 'GeoJSON') {

            let data = JSON.parse(this.data);

            return L.geoJSON(data, {
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, { icon: iconColor(feature.properties.color) })
                },
                style: function(feature) {
                    return { color: feature.properties.color}
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties.hasOwnProperty('timestamp')) {
                        feature.properties["timestamp_old"] = feature.properties.timestamp;
                    }
                    feature.properties.timestamp = getDatetime(new Date);
                    app.importedFeatures.addLayer(layer);

                    addPopUp(layer)
                }
            });

        } else {

            let image = new Image;
            image.src = this.data;

            return L.imageOverlay(image, this.bounds);

        }
    }

}