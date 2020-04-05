import { getOptions } from '../settings/options/options';
import { getVars } from '../settings/utils';
import { addButton } from './addbutton';
import { createSecondCol, moveButtons } from './utils';
import { createLocationBtn } from './locationbtn';
import { createModeBtns } from './modes';
import { Colorbar } from './colorbar';
import { Var } from '../settings/variables/var';
import { LayerControl } from './layercontrol';
import { createCacheBtn } from './cache';
import { createUndoBtn, createClearBtn, createGroupBtn, createSaveBtn } from './core';

export function addControls(map, OSM, layers) {

    let options = getOptions();

    createSecondCol();

    window.addEventListener('controlexpand', (ev) => { console.log('expand'); moveControls(ev) });
    window.addEventListener('controlcollapse', (ev) => { console.log('collapse'); moveControls(ev) });
    window.addEventListener('controlinit', (ev => { console.log('init'); moveControls(ev) }));
   
    // layer ctrl

    let baselayers = {
        "OSM": OSM,
    };
    let overlays = {
        ...layers,
        "Lines": app.lines,
        "Points": app.points,
    };
    let layerCtrl = new LayerControl(baselayers, overlays, { collapsed: true }).addTo(map);

    let container = layerCtrl.getContainer();

    container.addEventListener('click', () => {
        setTimeout(function () { layerCtrl.collapse() }, 200);
    })

    // zoom ctrl

    let zoomCtrl = L.control.zoom({
        position: 'topright'
    }).addTo(map);

    let modeCtrl = createModeBtns(map);
    modeCtrl.addTo(map);
    modeCtrl.container.id = 'modeCtrl';

    // color bar

    let colorBar = new Colorbar(options.colors);

    if (options.colorbar === true) {
        colorBar.add();
    } else {
        console.log("colorbar deactivated");
    };

    // cache btn

    let cacheBtn = createCacheBtn(map, OSM);

    if (options.cache === true) {
        cacheBtn.addTo(map);
    } else {
        console.log("caching deactivated");
    }


    // undo btn

    let undoBtn = createUndoBtn(map, app.points, app.lines, app.importedFeatures);
    undoBtn.addTo(map);


    // clear all button

    let clearBtn = createClearBtn(map, app.points, app.lines, app.importedFeatures);
    clearBtn.addTo(map);


    // save button

    let saveBtn = createSaveBtn(map, app.points, app.lines, app.importedFeatures);
    saveBtn.addTo(map);

     // locate btn

     let locateBtn = createLocationBtn(map);

     if (options.location === true) {
         locateBtn.addTo(map);
     } else {
         console.log("location deactivated");
     };

    // group btn

    let groupBtn = createGroupBtn();

    if (options.group === true) {
        groupBtn.addTo(map);
        groupBtn.button.id = 'groupBtn';
    } else {
        console.log("group deactivated");
    };

    // custom btns

    let vars = getVars();
    let buttons = vars.map(e => addButton(new Var(e), map));

    let controls = [zoomCtrl, layerCtrl, modeCtrl, colorBar, cacheBtn, groupBtn, saveBtn, clearBtn, undoBtn, locateBtn, ...buttons];
    function moveControls(event) {
        controls.forEach(e => {
            if (e._map && !(e instanceof Colorbar)) {
                moveButtons(e, event);
            }
        })
    };
    let ev = new Event('controlinit');
    window.dispatchEvent(ev)

    return controls;
};
