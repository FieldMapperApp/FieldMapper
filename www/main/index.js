import '../../node_modules/leaflet-easybutton/src/easy-button.css';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../css/leaflet-ext.css';
import '../css/index.css';
import './utils/leaflet-tilelayer-cordova';
import 'leaflet-easybutton';
import './utils/easybutton-ext';

import { updateStatus, onOnline, onOffline, hideStatus, showStatus } from './utils';
import { addControls } from './controls/controls';
import { getLayers } from './settings/utils';
import './settings/variables/variables';
import './settings/layers/layers';
import './settings/options/options';
import { clearData } from './utils/export';
import { Properties } from './properties';
import { Layer } from './settings/layers/layer';

export var properties = new Properties;

export var points = L.featureGroup();
export var lines = L.featureGroup();
export var importedFeatures = L.featureGroup();

window.app = {
    init: () => {
        document.addEventListener('deviceready', app.ready, false);
    },
    ready: () => {

        document.getElementById('mapBtn').addEventListener('click', showStatus);
        document.getElementById('settingsBtn').addEventListener('click', hideStatus);
        document.getElementById('aboutBtn').addEventListener('click', hideStatus);

        const map = new L.map('map', {
            minZoom: 14,
            maxZoom: 60,
            zoomControl: false,
        });

        let OSM;
        let layers;
        loadMap();

        document.getElementById('mapBtn').addEventListener('click', loadMap);
        document.getElementById('clearForm').addEventListener('submit', function () {

            let vars = document.getElementById('clearVariables').checked;
            let files = document.getElementById('clearFiles').checked;
            let cache = document.getElementById('clearCache').checked;
            let options = document.getElementById('clearOptions').checked;
            let layers = document.getElementById('clearLayers').checked;
            let sure = ([vars, files, cache, options, layers].some(x => x) ? confirm('Are you sure?') : false);
            if (sure) {
                if (vars) { localStorage.removeItem('variables') };
                if (files) { clearData() };
                if (cache) {
                    OSM.emptyCache(function (oks, fails) {
                        var message = "Cleared cache.\n" + oks + " deleted OK\n" + fails + " failed";
                        alert(message);
                    })
                }
                if (options) { localStorage.removeItem('options') };
                if (layers) { localStorage.removeItem('layers') };
            }

        });

        var controls;

        function loadMap() {

            console.log('map loaded');

            let _layers = getLayers();
            layers = _layers.filter(e => e.hasOwnProperty('data'));

            if (localStorage.getItem('position')) {
                let view = JSON.parse(localStorage.getItem('position'));
                for (let [k, v] of Object.entries(view)) {
                    view[k] = parseFloat(v)
                }
                map.setView([view.lat, view.lng], view.zoom);
            } else {
                map.setView([52.520008, 13.404954], 30)
            }

            map.eachLayer(el => el.remove());
            if (controls) { controls.forEach(el => el.remove()) };
            if (points.getLayers().length !== 0) { points.addTo(map) };
            if (lines.getLayers().length !== 0) { lines.addTo(map) };

            try {
                OSM = L.tileLayerCordova('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 60,
                    minZoom: 14,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright/">OpenStreetMap contributors</a>',
                    folder: 'TileLayer',
                    name: 'OSM',
                    debug: true
                }).addTo(map);
            } catch (e) {
                alert(e);
            }


            let addLayers = () => {

                return layers.map((e) => {

                    let layer = new Layer(e);
                    layer.layer.addTo(map);

                    let bounds = (layer.bounds ? layer.bounds : layer.layer.getBounds());
                    map.fitBounds(bounds);
                    // [52.524734053267068, 13.343059052083383], [52.526208565146916, 13.348740350623903]

                    return layer;

                })

            }
            let addedLayers = addLayers();

            let layersObj = {};
            for (let e of addedLayers) {
                if (e.layer) { layersObj[e.name] = e.layer };
            }

            map.on('moveend', function () {
                updateStatus(map, OSM);
                localStorage.setItem('position', JSON.stringify({ lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: map.getZoom() }));
            }).fire('moveend');

            document.addEventListener("offline", (ev) => ((map, OSM) => onOffline(map, OSM)), false);
            document.addEventListener("online", (ev) => ((map, OSM) => onOnline(map, OSM)), false);

            controls = addControls(map, OSM, layersObj);

        };

    }
};