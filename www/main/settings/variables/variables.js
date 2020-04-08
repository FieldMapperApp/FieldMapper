import { onSubmitEdit } from './edit';
import { onSubmitManage, addItem } from './manage';
import { getVars } from '../utils';

// init
export async function onLoadManageVars() {

  let variables = await getVars();

  if (variables.length !== 0) { variables.forEach(el => addItem(el.name)) }; // render variable list from local storage

  let clearBtn = document.getElementById('clearVarBtn'); // set up event listeners
  clearBtn.addEventListener('click', function (ev) { onClearBtn() });

  let form = document.getElementById("formvariables");
  if (form) { form.addEventListener('submit', onSubmitManage) };

}

export function onLoadEditVars() {

  let form = document.getElementById("formeditvar");
  if (form) { form.addEventListener('submit', onSubmitEdit) };

}

async function onClearBtn() { // remove all variables from storage and variables list

  let variables = await getVars();

  variables.forEach(el => {

    let item = document.getElementById("var_item_" + el.name);
    item.remove();

  });

  await db.removeItem('variables');

};
