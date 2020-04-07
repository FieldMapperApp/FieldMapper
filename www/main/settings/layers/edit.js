import { deleteItem, getInd, getLayers, updateItem } from '../utils';
import { LayerStorage } from './layer';

export function onOpenEdit(arg) { // render variable values (edit page)

    let layers = getLayers();

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
        document.getElementById('layer-item-btns').insertAdjacentHTML('afterend', `
      <div class="item" id="item-bounds">
        <label for="layerBounds">Please provide the coordinates (in decimal degrees) of two diagonally opposite corners of the rectangle.</label>
        <div class="item">
        <input type="text" id="layerBounds1" placeholder="latitude1, longitude1" required></input>
        </div>
        <div class="item">
        <input type="text" id="layerBounds2" placeholder="latitude2, longitude2" required></input>
        </div>
      </div>
      <!-- pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$
      " -->
      `);
      document.getElementById('layerFile').accept = "image/*";
    /* https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates */
    } else {
        if (document.getElementById('item-bounds')) { document.getElementById('item-bounds').remove() };
        document.getElementById('layerFile').accept = "";
    };

}  