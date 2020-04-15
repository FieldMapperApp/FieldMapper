import { onSubmitEdit } from './edit';
import { onSubmitManage, addItem } from './manage';
import { getVars } from '../utils';
import Sortable from 'sortablejs';

// init
export async function onLoadManageVars() {

  let variables = await getVars();

  if (variables.length !== 0) { variables.forEach(el => addItem(el.name)) 
  }; // render variable list from local storage

  let clearBtn = document.getElementById('clearVarBtn'); // set up event listeners
  clearBtn.addEventListener('click', onClearBtn);

  let listVariables = document.getElementById('listvariables');
  new Sortable(listVariables, {
    handle: '.ion-arrow-move',
    animation: 150,
    onSort: async () => { 
      let variables = await getVars();
      let newOrder = [...listVariables.querySelectorAll('[id^="var_item"]')].map(e => e.id.split('_')[2]);
      variables.forEach(e => { e.id = newOrder.indexOf(e.name) });
      variables.sort((a, b) => { return a.id-b.id })
      await db.setItem('variables', JSON.stringify(variables));
    }
  });

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
