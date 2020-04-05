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
import { onLoadReset } from './settings/reset/reset';
import { onLoadManageVars, onLoadEditVars } from './settings/variables/variables';
import { onLoadManageLayers, onLoadEditLayers } from './settings/layers/layers';
import { onLoadOptions } from './settings/options/options';
import './settings/variables/variables';
import './settings/layers/layers';
import './settings/options/options';
import { Properties } from './properties';
import { Layer } from './settings/layers/layer';

window.app = {

    init: () => {
        document.addEventListener('deviceready', app.ready, false);
    },

    ready: () => {

        app.map = new L.map('map', {
            zoomControl: false,
        });

        app.points = L.featureGroup();
        app.lines = L.featureGroup();
        app.importedFeatures = L.featureGroup();
        app.properties = new Properties;

        app.loadMap();
        app.initListeners();

    },

    initListeners: () => {

        let map = app.map;
        let OSM = app.OSM;

        document.getElementById('mapBtn').addEventListener('click', showStatus);
        document.getElementById('settingsBtn').addEventListener('click', hideStatus);
        document.getElementById('aboutBtn').addEventListener('click', hideStatus);

        document.getElementById('mapBtn').addEventListener('click', app.loadMap);
        document.addEventListener('openPage', function (ev) {

            switch (ev.detail.page) {

                case "./main/settings/reset/reset.html":
                    onLoadReset(OSM);
                    break

                case "./main/settings/layers/editlayer.html":
                    onLoadEditLayers();
                    break

                case "./main/settings/layers/managelayers.html":
                    onLoadManageLayers();
                    break

                case "./main/settings/variables/editvariable.html":
                    onLoadEditVars();
                    break

                case "./main/settings/variables/managevariables.html":
                    onLoadManageVars();
                    break

                case "./main/settings/options/options.html":
                    onLoadOptions();
                    break
            }

            map.on('moveend', function () {
                updateStatus(map, OSM);
                localStorage.setItem('position', JSON.stringify({ lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: map.getZoom() }));
            }).fire('moveend');

            document.addEventListener("offline", (ev) => ((map, OSM) => onOffline(map, OSM)), false);
            document.addEventListener("online", (ev) => ((map, OSM) => onOnline(map, OSM)), false);

        });

    },

    loadMap: () => {

        let map = app.map;
        let controls = app.controls;

        let _layers = getLayers();
        let layers = _layers.filter(e => e.hasOwnProperty('data'));

        if (localStorage.getItem('position')) {
            let view = JSON.parse(localStorage.getItem('position'));
            for (let [k, v] of Object.entries(view)) {
                view[k] = parseFloat(v)
            }
            map.setView([view.lat, view.lng], view.zoom);
        } else {
            map.setView([52.520008, 13.404954], 20)
        }

        map.eachLayer(el => el.remove());
        if (controls) { controls.forEach(el => el.remove()) };
        if (app.points.getLayers().length !== 0) { app.points.addTo(map) };
        if (app.lines.getLayers().length !== 0) { app.lines.addTo(map) };

        try {
            app.OSM = L.tileLayerCordova('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmVsbHVrc2NoIiwiYSI6ImNqeGFpdTk4NTB2eGYzc3J6MTFiYnUzd2EifQ.Nf5z6iAR6YSOqlJmNyGVgg', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 20,
                tileSize: 512,
                zoomOffset: -1,
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

                return layer;

            })

        }

        let addedLayers = addLayers();

        let layersObj = {};
        for (let e of addedLayers) {
            if (e.layer) { layersObj[e.name] = e.layer };
        }

        app.controls = addControls(map, app.OSM, layersObj);

        console.log('map loaded');

    }

};