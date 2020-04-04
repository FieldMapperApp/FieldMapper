import { onSubmitEdit } from './edit';
import { onSubmitManage, addItem } from './manage';
import { getVars } from '../utils';

// init
document.addEventListener('openPage', onLoad);

function onLoad(e) {

  let variables = getVars();

  if (e.detail.page === "./main/settings/variables/managevariables.html") { // check which page was requested
    
    if (variables.length !== 0) { variables.forEach(el => addItem(el.name)) }; // render variable list from local storage

    let clearBtn = document.getElementById('clearVarBtn'); // set up event listeners
    clearBtn.addEventListener('click', function(ev) { onClearBtn() });

    let form = document.getElementById("formvariables");
    if (form) {
      
      form.addEventListener('submit', onSubmitManage);

    }

  } else if (e.detail.page === "./main/settings/variables/editvariable.html") {

    let form = document.getElementById("formeditvar");
    if (form) {

      form.addEventListener('submit', onSubmitEdit );

    }

  }
};

function onClearBtn() { // remove all variables from storage and variables list

  let variables = getVars();
  
  variables.forEach(el => {

    let item = document.getElementById("var_item_" + el.name);
    item.remove();

  });

  localStorage.removeItem('variables');

};
