import { onOpenEdit } from './edit';
import { getVars, deleteItem } from '../utils';

export function onSubmitManage(e) {

    e.preventDefault();
    console.log('submit manage');

    let variables = getVars();

    let input = document.getElementById("variableinput");
    let name = input.value.trim();
    console.log("submitted: " + name);

    if (name !== '') {
        variables.push(addNewVar(name, variables)); // get input and call function to visualize new item
        input.value = '';
        input.focus();
    }

    localStorage.setItem('variables', JSON.stringify({ ...variables })); // store locally

};

function addNewVar(name, variables) {

    let newVar = { // default values (can be changed upon click on the edit button)
        name,
        type: 'boolean',
        value: null,
        icon: name.slice(0, 2),
        position: 'topleft',
    }

    addItem(newVar.name, variables); // add variable name to the list

    return newVar;

};

export function addItem(name, variables) {

    let list = document.getElementById("listvariables");

    list.insertAdjacentHTML('beforeend', `
      <div class="item" id="var_item_${name}">
        <h2>${name}</h2>
        <div class="right">
        <button class="grey-900 circle ion-edit small" type="button" id="var_edit_${name}"></button>
        <button class="grey-900 circle ion-minus small margin" type="button" id="var_del_${name}"></button>
        </div>
      </div>
    `);

    let delBtn = document.getElementById("var_del_" + name);
    let editBtn = document.getElementById("var_edit_" + name);

    delBtn.addEventListener('click', e => {
        //e.stopPropagation();
        console.log(name + "delete button triggered");
        deleteItem(name, variables, 'variables');
    });

    editBtn.addEventListener('click', e => {
        console.log(name + " edit button triggered");
        openPage('./main/settings/variables/editvariable.html', { name }, onOpenEdit);
    });

    console.log(name + " var added");
}

