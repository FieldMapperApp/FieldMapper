import { properties } from '../../index';

document.addEventListener('openPage', onLoad);
function onLoad(e) {

  if (e.detail.page === "./main/settings/options/options.html") {

    let defColors = ["black", "green", "yellow", "red", "blue", "brown"];
    let options = getOptions();

    let colorbarCheckbox = document.getElementById("colorbarCheckbox");
    colorbarCheckbox.checked = options.colorbar;

    let locationCheckbox = document.getElementById("locationCheckbox");
    locationCheckbox.checked = options.location;

    let commentsCheckbox = document.getElementById("commentsCheckbox");
    commentsCheckbox.checked = options.comments;

    let cachingCheckbox = document.getElementById('cachingCheckbox');
    cachingCheckbox.checked = options.cache;

    let groupCheckbox = document.getElementById('groupCheckbox');
    groupCheckbox.checked = options.group;

    checkGroupBtn(groupCheckbox, options);

    groupCheckbox.addEventListener('click', function (e) { checkGroupBtn(e.target, options) });

    document.getElementById('groupColorCheckbox').addEventListener('click', checkColorBtn);
    document.getElementById('colorbarCheckbox').addEventListener('click', checkColorBtn);

    let colorsAdded = defColors.map(e => {
      if (options.colors.includes(e)) {
        return document.getElementById(`${e}Checkbox`);
      }
    });
    colorsAdded.filter(el => el != null).forEach(e => { e.checked = true });

    let form = document.getElementById("formoptions");
    if (form) {
      console.log("form initialzed");
      form.addEventListener('submit', function (ev) {
        onSubmitOptions(ev, options, defColors)
      })
    }
  }
}

function onSubmitOptions(e, options, defColors) {

  e.preventDefault();

  let colorbarCheckbox = document.getElementById("colorbarCheckbox");
  options.colorbar = colorbarCheckbox.checked;

  let colorCheckboxes = defColors.map(e => document.getElementById(`${e}Checkbox`));
  let colorsNew = colorCheckboxes.map(e => {
    if (e.checked) { return e.value }
  })
  options.colors = colorsNew.filter(el => el != null);
  properties.color = options.colors[0];

  let locationCheckbox = document.getElementById("locationCheckbox");
  options.location = locationCheckbox.checked;

  let commentsCheckbox = document.getElementById("commentsCheckbox");
  options.comments = commentsCheckbox.checked;

  let cachingCheckbox = document.getElementById('cachingCheckbox');
  options.cache = cachingCheckbox.checked;

  let groupCheckbox = document.getElementById('groupCheckbox');
  options.group = groupCheckbox.checked;

  if (document.getElementById('groupTypeCheckbox')) {
    options.groupType = document.getElementById('groupTypeCheckbox').checked
  } else {
    options.groupType = null;
  }
  if (document.getElementById('groupColorCheckbox')) {
    options.groupColor = document.getElementById('groupColorCheckbox').checked;
  } else {
    options.groupColor = null;
  }

  localStorage.setItem('options', JSON.stringify(options));

  console.log(JSON.parse(localStorage.getItem('options')));

  backPage();
}

function checkGroupBtn(btn, options) {
  let elem = document.getElementById('item-comments');
  if (btn.checked) {
    //elem.classList.add('no-space-bottom', 'no-border');
    elem.insertAdjacentHTML('afterend', `
        <div class="item" id="group-type">
            <h2>Only group features of same geometry type</h2>
            <div class="right no-space-top">
                <input type="checkbox" class="switch grey-900" id="groupTypeCheckbox" checked>
            </div>
        </div>
        <div class="item" id="group-color">
            <h2>Automatically choose random color for groups</h2>
            <div class="right">
                <input type="checkbox" class="switch grey-900" id="groupColorCheckbox" checked>
            </div>
        </div>
      `);

    document.getElementById('groupTypeCheckbox').checked = options.groupType;
    document.getElementById('groupColorCheckbox').checked = options.groupColor;

  } else {
    if (document.getElementById('group-type')) {
      document.getElementById('group-type').remove();
      document.getElementById('group-color').remove();
    }
  }
}

function checkColorBtn(e) {

  console.log(e.target.id);

  let colorbar = document.getElementById('colorbarCheckbox');
  let colorgroup = document.getElementById('groupColorCheckbox');

  if (e.target.id === 'groupColorCheckbox' && e.target.checked) {
    colorbar.checked = false;
  } else if (e.target.id === 'colorbarCheckbox' && e.target.checked) {
    colorgroup.checked = false;
  } else if (e.target.id === 'groupColorCheckbox' && !e.target.checked) {
    colorbar.checked = true;
  } else {
    colorgroup.checked = true;
  }

}

export function getOptions() {
  return (localStorage.hasOwnProperty('options') ? JSON.parse(localStorage.getItem('options')) : { colorbar: true, colors: ["black", "green", "yellow", "red", "blue", "brown"], location: true, comments: true, cache: true, group: true, groupType: true, groupColor: false })
}