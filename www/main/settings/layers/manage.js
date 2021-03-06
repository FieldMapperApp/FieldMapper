import { onOpenEdit } from './edit';
import { getLayers, deleteItem } from '../utils';

export async function onSubmitManage(e) {

    e.preventDefault();

    let layers = await getLayers();

    let input = document.getElementById("layersinput");
    let name = input.value.trim();
    console.log("submitted: " + name);

    let names = layers.map(e => e.name);
    if (name !== '' && !names.includes(name)) {
        layers.push(addNewLayer(name, layers)); // get input and add item to the list
        input.value = '';
        input.focus();
        await db.setItem('layers', JSON.stringify({ ...layers })); // store locally
    } else {
        alert('Please enter a non-duplicate and non-empty name.')
    }

}

function addNewLayer(name, layers) {

    let newLayer = { // default values (can be changed by clicking on the edit button)
        name,
        type: 'GeoJSON',
        file: '',
    }

    addItem(newLayer.name, layers); // add variable name to the list

    return newLayer;

}

export function addItem(name) {

    let list = document.getElementById("listlayers");

    list.insertAdjacentHTML('beforeend', `
      <div class="item" id="layers_item_${name}">
        <h2>${name}</h2>
        <div class="right">
        <button class="grey-900 circle ion-edit small" type="button" id="layer_edit_${name}"></button>
        <button class="grey-900 circle ion-minus small margin" type="button" id="layer_del_${name}"></button>
        </div>
      </div>
    `);

    let delBtn = document.getElementById("layer_del_" + name);
    let editBtn = document.getElementById("layer_edit_" + name);

    delBtn.addEventListener('click', () => {
        console.log(name + "delete button triggered");
        deleteItem(name, 'layers');
    });

    editBtn.addEventListener('click', () => {
        console.log(name + " edit button triggered");
        openPage('./main/settings/layers/editlayer.html', { name }, onOpenEdit);
    });

    console.log(name + " layer added");
}

