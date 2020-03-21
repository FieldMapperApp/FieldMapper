import { onSubmitEdit } from './edit';
import { onSubmitManage, addItem } from './manage';
import { getLayers } from '../utils';

// init
document.addEventListener('openPage', onLoad);

function onLoad(e) {

  let layers = getLayers();

  if (e.detail.page === "./main/settings/layers/managelayers.html") { // check which page was requested
    
    if (layers.length !== 0) { layers.forEach(el => addItem(el.name, layers)) }; // render variable list from local storage

    let clearBtn = document.getElementById('clearLayersBtn'); // set up event listeners
    clearBtn.addEventListener('click', function(ev) { onClearBtn(layers) });

    let form = document.getElementById("formlayers");
    if (form) {
      
      form.addEventListener('submit', onSubmitManage);

    }

  } else if (e.detail.page === "./main/settings/layers/editlayer.html") {

    let form = document.getElementById("formeditlayer");
    if (form) {

      form.addEventListener('submit', function(ev) { onSubmitEdit(ev, layers) });

    }

  }
};

function onClearBtn(layers) { // remove all variables from storage and variables list

  layers.forEach(el => {

    let item = document.getElementById("layers_item_" + el.name);
    item.remove();

  });

  localStorage.removeItem('layers');

};
