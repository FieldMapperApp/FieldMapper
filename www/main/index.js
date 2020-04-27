import '../../node_modules/leaflet-easybutton/src/easy-button.css';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../css/leaflet-ext.css';
import '../css/index.css';
import './utils/leaflet-tilelayer-cordova';
import 'leaflet-easybutton';
import './utils/easybutton-ext';

import './utils/db';
import { updateStatus, onOnline, onOffline, hideStatus, showStatus, onLoadAbout } from './utils';
import { addControls } from './controls/controls';
import { getLayers, getOptions } from './settings/utils';
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

    ready: async () => {

        // init constants on start of the session
        if (!db.hasOwnProperty('root')) { await db.init() }

        app.map = new L.map('map', {
            zoomControl: false,
        });

        app.points = L.featureGroup();
        app.lines = L.featureGroup();
        app.importedFeatures = L.featureGroup();
        app.properties = new Properties; 
        await app.properties.create();

        await app.loadMap();
        app.initListeners();

    },

    // will be called every time the map tab is re-visited 
    //to reflect changes of options
    loadMap: async () => { 

        console.log(await getOptions())

        let _layers = await getLayers(); // get layers from storage or return empty array
        let position = await db.getItem('position'); // retrieve last position from storage

        let map = app.map;

        let layers = _layers.filter(e => e.hasOwnProperty('data')); // only complete data

        // set map view (either last position from storage or default when first time using the app)
        if (position) {
            let view = JSON.parse(position);
            for (let [k, v] of Object.entries(view)) {
                view[k] = parseFloat(v)
            }
            map.setView([view.lat, view.lng], view.zoom);
        } else {
            map.setView([52.520008, 13.404954], 20)
        }

        // remove all layers and controls (and later re-add them) to reflect changes made in the settings
        map.eachLayer(el => el.remove()); 
        if (app.controls) { app.controls.forEach(el => el.remove()) }
        if (app.points.getLayers().length !== 0) { app.points.addTo(map) }
        if (app.lines.getLayers().length !== 0) { app.lines.addTo(map) }

        // baselayer
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

                // layers are stored as stringified json objects (images as base64)
                let layer = new Layer(e); // create layer from the downsized stored layers 
                layer.layer.addTo(map);

                let bounds = (layer.bounds ? layer.bounds : layer.layer.getBounds());
                map.fitBounds(bounds);

                return layer;

            })

        }

        let addedLayers = addLayers();

        let layersObj = {};
        for (let e of addedLayers) {
            if (e.layer) { layersObj[e.name] = e.layer } // store as "layerName": dataObj
        }

        addControls(map, app.OSM, layersObj); // add controls to the map

        console.log('map loaded');

    },

    initListeners: () => {

        let map = app.map;
        let OSM = app.OSM;

        document.getElementById('mapBtn').addEventListener('click', showStatus);
        document.getElementById('settingsBtn').addEventListener('click', () => { onLoadAbout(); hideStatus() });

        document.getElementById('mapBtn').addEventListener('click', app.loadMap); 

        // listen for mobileui openpage event and delegate to appropriate handler to render page
        document.addEventListener('openPage', function (ev) {

            switch (ev.detail.page) {

                case "./main/settings/reset/reset.html":
                    onLoadReset();
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
        });

        // show current position in status field
        map.on('moveend', async function () {
            updateStatus(map, OSM);
            await db.setItem('position', JSON.stringify({ lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: map.getZoom() }));
        }).fire('moveend');

        document.addEventListener("offline", () => ((map, OSM) => onOffline(map, OSM)), false);
        document.addEventListener("online", () => ((map, OSM) => onOnline(map, OSM)), false);

    }

};