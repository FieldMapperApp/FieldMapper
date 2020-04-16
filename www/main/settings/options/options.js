import { getOptions, getLayers } from '../utils';

export async function onLoadOptions() {

  let options = await getOptions();
  let layers = await getLayers();

  let colorbarCheckbox = document.getElementById("colorbarCheckbox");
  colorbarCheckbox.checked = options.colorbar;

  let locationCheckbox = document.getElementById("locationCheckbox");
  locationCheckbox.checked = options.location;

  let commentsCheckbox = document.getElementById("commentsCheckbox");
  commentsCheckbox.checked = options.comments;

  let cachingCheckbox = document.getElementById('cachingCheckbox');
  cachingCheckbox.checked = options.cache;

  let deletionCheckbox = document.getElementById('deletionCheckbox');
  deletionCheckbox.checked = options.deletion;

  let exportCheckbox = document.getElementById('exportCheckbox');
  exportCheckbox.checked = options.export;

  if (layers.length == 0) {
    document.getElementById('item-deletion').style.display = "none";
    document.getElementById('item-export').style.display = "none"
  }

  let groupCheckbox = document.getElementById('groupCheckbox');
  groupCheckbox.checked = options.group;

  let groupTypeBtn = document.getElementById('groupTypeCheckbox');
  groupTypeBtn.checked = options.groupType;

  let groupColorBtn = document.getElementById('groupColorCheckbox')
  groupColorBtn.checked = options.groupColor;

  checkGroupBtn(groupCheckbox, options);

  groupCheckbox.addEventListener('click', function (e) { checkGroupBtn(e.target, options) });

  document.getElementById('groupColorCheckbox').addEventListener('click', checkColorBtn);
  document.getElementById('colorbarCheckbox').addEventListener('click', checkColorBtn);

  let colorsAdded = options.colors.map(e => {
    return document.getElementById(`${e}Checkbox`);
  });
  colorsAdded.forEach(e => { e.checked = true });

  let form = document.getElementById("formoptions");
  if (form) {
    [...form.elements].forEach(e => e.addEventListener('input', (ev) => { onChange(ev, options) }))
  }
}

async function onChange(ev, options) {

  ev.preventDefault();

  switch (ev.target.id) {
    case "colorbarCheckbox":
      options.colorbar = ev.target.checked;
      break
    case "locationCheckbox":
      options.location = ev.target.checked;
      break
    case "commentsCheckbox":
      options.comments = ev.target.checked;
      break
    case "cachingCheckbox":
      options.cache = ev.target.checked;
      break
    case "deletionCheckbox":
      options.deletion = ev.target.checked;
      break
    case "exportCheckbox":
      options.export = ev.target.checked;
      break
    case "groupCheckbox":
      options.group = ev.target.checked;
      break
  }

  let colorCheckboxes = document.getElementById('colors-list').querySelectorAll('input[type="checkbox"]');
  let colorsNew = [...colorCheckboxes].map(e => {
    if (e.checked) { return e.value }
  })
  options.colors = colorsNew.filter(el => el != null);
  app.properties.color = options.colors[0];

  if (document.getElementById('groupCheckbox').checked) {
    options.groupType = document.getElementById('groupTypeCheckbox').checked;
    options.groupColor = document.getElementById('groupColorCheckbox').checked;
  } else {
    options.groupColor = null;
    options.groupType = null;
  }

  await db.setItem('options', JSON.stringify(options));
  console.log(await getOptions())

}

function checkGroupBtn(btn) {
  let groupType = document.getElementById("group-type");
  let groupColor = document.getElementById("group-color");
  let itemComments = document.getElementById("item-comments");

  if (btn.checked) {
    groupType.style.display = "inline-block";
    groupColor.style.display = "inline-block";
    itemComments.classList.remove('no-border');
  } else {
    groupType.style.display = "none";
    groupColor.style.display = "none";
    itemComments.classList.add('no-border');
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