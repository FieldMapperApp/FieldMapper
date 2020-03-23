import { deleteItem, getInd, getVars, updateItem } from '../utils';
import { VarStorage } from './var';

export function onOpenEdit(arg) { // render variable values (edit page)

  let variables = getVars();

  document.getElementById('varName').value = arg.name;
  document.getElementById('varName').readOnly = true;
  document.getElementById('varPos').value = variables[getInd(variables, arg.name)].position;
  document.getElementById('checkboxIcon').checked = (variables[getInd(variables, arg.name)].data ? true : false);

  let btns = [document.getElementById('booleanBtn'), document.getElementById('binaryBtn'), document.getElementById('multiBtn')];

  let activeBtn = btns[['boolean', 'binary', 'multi'].indexOf(variables[getInd(variables, arg.name)].type)];

  activeBtn.classList.remove('grey-400');
  activeBtn.classList.add('grey-900');

  addValue(activeBtn.id);
  if (activeBtn.id !== 'booleanBtn') { document.getElementById('varValue').value = variables[getInd(variables, arg.name)].value };
  if (activeBtn.id === 'multiBtn') { document.getElementById('checkboxCompulsory').checked = variables[getInd(variables, arg.name)].compulsory }

  addFiles();
  
  btns.forEach(e => e.addEventListener('click', onClick));

  function onClick(e) {

    btns.forEach((e) => { e.classList.remove('grey-900'); e.classList.add('grey-400') });
    e.target.classList.add('grey-900');
    addValue(e.target.id);
    addFiles();

  }

  document.getElementById('deleteeditvar').addEventListener('click', function () {
    variables = deleteItem(arg.name, variables, 'variables');
    backPage();
  })

  document.getElementById('checkboxIcon').addEventListener('click', addFiles);
};

export async function onSubmitEdit(e, variables) {

  e.preventDefault();
  console.log('submitted');

  let varStorage = new VarStorage();
  await varStorage.create();

  variables = updateItem(variables, varStorage);

  localStorage.setItem('variables', JSON.stringify({ ...variables })); // store locally (update variables data)
  console.log(JSON.parse(localStorage.getItem('variables')));

  backPage();

};

function addFiles() {

  let checkbox = document.getElementById('checkboxIcon');

  getItems().forEach(e => e.remove());

  if (checkbox.checked) {
    if (!document.getElementById('item-multi')) {
      document.getElementById('icon-checkbox').insertAdjacentHTML('afterend', `
      <div class="item" id="icon-1">
        <label for="varIcon1">SVG Icon 1</label>
        <input type="file" id="varIcon1" accept="image/*" required></input>
      </div>
      `);
    } else {
      let items = document.getElementById("varValue").value.replace(/\s/g, "").split(',').map((e, i) => {
        return `
        <div class="item" id="icon-${i + 1}">
        <label for="varIcon${i + 1}">SVG Icon ${i + 1}</label>
        <input type="file" id="varIcon${i + 1}" accept="image/*" required></input>
      </div>
        `
      })
      document.getElementById('icon-checkbox').insertAdjacentHTML('afterend', items.join());
    } 
  } else {
    getItems().forEach(e => e.remove())
  }
}

function getItems() {

  let arr = [];
  let i = 1;

  while (document.getElementById(`icon-${i}`)) {
      arr.push(document.getElementById(`icon-${i}`));
      i++;
  }
  return arr;

}

function addValue(id) {

  if (id === 'binaryBtn') {
    if (document.getElementById('item-multi')) { document.getElementById('item-multi').remove(); document.getElementById('item-multi2').remove() };
    document.getElementById('var-item-btns').insertAdjacentHTML('afterend', `
      <div class="item" id="item-bin">
        <label for="varValue">Please enter two comma-separated values. The first one is to represent the default state (when the button is inactive).</label>
        <input type="text" id="varValue" placeholder="value1, value2" pattern="^[^,\n]+(?:,[^,\n]+){0,2}$" required></input>
      </div>
      `);
      document.getElementById('varValue').addEventListener('change', addFiles);
  } else if (id === 'multiBtn') {
    if (document.getElementById('item-bin')) { document.getElementById('item-bin').remove() };
    document.getElementById('var-item-btns').insertAdjacentHTML('afterend', `
      <div class="item" id="item-multi">
        <label for="varValue">You can enter as many comma-separated values as you want.</label>
        <input type="text" id="varValue" placeholder="value1, value2, value3, ..." required>
      </div>
      <div class="item" id="item-multi2">
        <label for="checkboxCompulsory">Make variable compulsory</label>
        <div class="right">
          <input type="checkbox" class="switch grey-900" id ="checkboxCompulsory" checked></input>
        </div>
      </div>
      `);
      document.getElementById('varValue').addEventListener('change', addFiles);
  } else {
    if (document.getElementById('item-bin')) { document.getElementById('item-bin').remove() };
    if (document.getElementById('item-multi')) { document.getElementById('item-multi').remove(); document.getElementById('item-multi2').remove() };
    if (document.getElementById('varValue')) { document.getElementById('varValue').removeEventListener('change', addFiles) };
  };

}
