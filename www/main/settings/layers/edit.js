import { deleteItem, getInd, getLayers, updateItem } from '../utils';
import { LayerStorage } from './layer';

export async function onOpenEdit(arg) { // render variable values (edit page)

    let layers = await getLayers();

    document.getElementById('layerName').value = arg.name;
    document.getElementById('layerName').readOnly = true;

    let btns = [document.getElementById('geoJsonBtn'), document.getElementById('imageBtn')];

    let activeBtn = btns[['GeoJSON', 'imageOverlay'].indexOf(layers[getInd(layers, arg.name)].type)];

    activeBtn.classList.remove('grey-400');
    activeBtn.classList.add('grey-900');

    addBounds(activeBtn.id);

    btns.forEach(e => e.addEventListener('click', onClick));

    function onClick(e) {

        btns.forEach((e) => { e.classList.remove('grey-900'); e.classList.add('grey-400') });
        e.target.classList.add('grey-900');
        addBounds(e.target.id);

    }

    document.getElementById('deleteeditlayer').addEventListener('click', function () {
        deleteItem(arg.name, 'layers');
        backPage();
    })
};

export async function onSubmitEdit(e) {

    e.preventDefault();
    console.log('submitted');

    let layer = new LayerStorage;
    await layer.create();

    updateItem('layers', layer);

    backPage();

};

function addBounds(id) {

    if (id === 'imageBtn') {
        document.getElementById('item-bounds').style.display = "inline-block";
        document.getElementById('layerBounds1').required = true;
        document.getElementById('layerBounds2').required = true;
        document.getElementById('layerFile').accept = "image/*";
        /* https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates */
    } else {
        document.getElementById('item-bounds').style.display = "none";
        document.getElementById('layerBounds1').required = false;
        document.getElementById('layerBounds2').required = false;
        document.getElementById('layerFile').accept = "";
    };

}  