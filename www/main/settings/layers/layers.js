import { onSubmitEdit } from './edit';
import { onSubmitManage, addItem } from './manage';
import { getLayers } from '../utils';

export async function onLoadManageLayers() {

  let layers = await getLayers();

  if (layers.length !== 0) { layers.forEach(el => addItem(el.name, layers)) }; // render variable list from local storage

  let clearBtn = document.getElementById('clearLayersBtn'); // set up event listeners
  clearBtn.addEventListener('click', function (ev) { onClearBtn() });

  let form = document.getElementById("formlayers");
  if (form) { form.addEventListener('submit', onSubmitManage) };

}

export function onLoadEditLayers() {

  let form = document.getElementById("formeditlayer");
  if (form) { form.addEventListener('submit', onSubmitEdit) };

}

async function onClearBtn() { // remove all variables from storage and variables list

  let layers = await getLayers();
  layers.forEach(el => {

    let item = document.getElementById("layers_item_" + el.name);
    item.remove();

  });

  await db.removeItem('layers');

};
