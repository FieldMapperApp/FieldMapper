import { deleteItem, getInd, getVars, updateItem } from '../utils';
import { VarStorage } from './var';

export async function onOpenEdit(arg) { // render variable values (edit page)

  let variables = await getVars();

  document.getElementById('varName').value = arg.name;
  document.getElementById('varName').readOnly = true;
  document.getElementById('checkboxIcon').checked = (variables[getInd(variables, arg.name)].data ? true : false);

  let btns = [document.getElementById('booleanBtn'), document.getElementById('binaryBtn'), document.getElementById('multiBtn')];

  let activeBtn = btns[['boolean', 'binary', 'multi'].indexOf(variables[getInd(variables, arg.name)].type)];

  activeBtn.classList.remove('grey-400');
  activeBtn.classList.add('grey-900');

  addValue(activeBtn.id);
  if (activeBtn.id !== 'booleanBtn') { document.getElementById('varValue').value = variables[getInd(variables, arg.name)].value }

  addFiles();

  btns.forEach(e => e.addEventListener('click', onClick));

  function onClick(e) {

    btns.forEach((e) => { e.classList.remove('grey-900'); e.classList.add('grey-400') });
    e.target.classList.add('grey-900');
    addValue(e.target.id);
    addFiles();

  }

  document.getElementById('deleteeditvar').addEventListener('click', function () {
    deleteItem(arg.name, 'variables');
    backPage();
  })

  document.getElementById('checkboxIcon').addEventListener('click', addFiles);
}

export async function onSubmitEdit(e) {

  e.preventDefault();
  console.log('submitted');

  let varStorage = new VarStorage();
  await varStorage.create();

  updateItem('variables', varStorage);

  backPage();

}

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
      document.getElementById('icon-checkbox').insertAdjacentHTML('afterend', items.join(''));
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

function addValue(id) { // placeholders/description based on active type

  let item = document.getElementById('item-bin-multi');
  let label = document.getElementById('labelValue');
  let input = document.getElementById('varValue');

  if (id === 'binaryBtn') {

    item.style.display = "inline-block";
    label.innerText = "Please enter two comma-separated values. The first one is to represent the default state (when the button is inactive).";
    input.placeholder = "value1, value2";
    input.required = true;
    input.addEventListener('input', addFiles);

  } else if (id === 'multiBtn') {

    item.style.display = "inline-block";
    label.innerText = "You can enter as many comma-separated values as you want.";
    input.placeholder = "value1, value2, value3, ...";
    input.required = true;
    input.addEventListener('input', addFiles);

  } else {

    item.style.display = "none";
    input.required = false;
    input.removeEventListener('change', addFiles);

  }

}
