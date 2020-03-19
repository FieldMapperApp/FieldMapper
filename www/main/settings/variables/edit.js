import { deleteItem, getInd, getVars, updateItem } from '../utils';
import { Var } from './var';

export function onOpenEdit(arg) { // render variable values (edit page)

    let variables = getVars();

    document.getElementById('varName').value = arg.name;
    document.getElementById('varName').readOnly = true;
    document.getElementById('varPos').value = variables[getInd(variables, arg.name)].position;
    document.getElementById('varIcon').value = (variables[getInd(variables, arg.name)].icon[0].length > 2 ? variables[getInd(variables, arg.name)].icon : "");

    let btns = [document.getElementById('booleanBtn'), document.getElementById('binaryBtn'), document.getElementById('multiBtn')];

    let activeBtn = btns[['boolean', 'binary', 'multi'].indexOf(variables[getInd(variables, arg.name)].type)];

    activeBtn.classList.remove('grey-400');
    activeBtn.classList.add('grey-900');

    addValue(activeBtn.id);
    if (activeBtn.id !== 'booleanBtn') { document.getElementById('varValue').value = variables[getInd(variables, arg.name)].value };
    if (activeBtn.id === 'multiBtn') { document.getElementById('checkboxCompulsory').checked = variables[getInd(variables, arg.name)].compulsory }

    btns.forEach(e => e.addEventListener('click', onClick));

    function onClick(e) {

        btns.forEach((e) => { e.classList.remove('grey-900'); e.classList.add('grey-400') });
        e.target.classList.add('grey-900');
        addValue(e.target.id);

    }

    document.getElementById('deleteeditvar').addEventListener('click', function () {
        variables = deleteItem(arg.name, variables, 'variables');
        backPage();
    })
};

export function onSubmitEdit(e, variables) {

    e.preventDefault();
    console.log('submitted');

    variables = updateItem(variables, new Var);

    localStorage.setItem('variables', JSON.stringify({ ...variables })); // store locally (update variables data)
    console.log(JSON.parse(localStorage.getItem('variables')));

    backPage();

};

function addValue(id) {

    if (id === 'binaryBtn') {
        if (document.getElementById('item-multi')) { document.getElementById('item-multi').remove(); document.getElementById('item-multi2').remove() };
        document.getElementById('var-item-btns').insertAdjacentHTML('afterend', `
      <div class="item" id="item-bin">
        <label for="varValue">Please enter two comma-separated values. The first one is to represent the default state (when the button is inactive).</label>
        <input type="text" id="varValue" placeholder="value1, value2" pattern="^[^,\n]+(?:,[^,\n]+){0,2}$" required></input>
      </div>
      `);
    } else if (id === 'multiBtn') {
        if (document.getElementById('item-bin')) { document.getElementById('item-bin').remove() };
        document.getElementById('var-item-btns').insertAdjacentHTML('afterend', `
      <div class="item" id="item-multi">
        <label for="varValue">You can enter as many comma-separated values as you want.</label>
        <input type="text" id="varValue" placeholder="value1, value2, value3, ..." required>
      </div>
      <div class="item" id="item-multi2">
        <h4>Make variable compulsory</h4>
        <div class="right">
          <input type="checkbox" class="switch grey-900" id ="checkboxCompulsory" checked></input>
        </div>
      </div>
      `);
    } else {
        if (document.getElementById('item-bin')) { document.getElementById('item-bin').remove() };
        if (document.getElementById('item-multi')) { document.getElementById('item-multi').remove(); document.getElementById('item-multi2').remove() };
    };

}
