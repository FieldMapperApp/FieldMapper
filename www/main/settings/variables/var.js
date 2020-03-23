export class VarStorage {

  constructor() {
    this.name = document.getElementById('varName').value;
    this.position = document.getElementById("varPos").value;
    this.type = this._getType();
    this.compulsory = (this.type === 'multi' ? document.getElementById('checkboxCompulsory').checked : undefined);
    this.value = this._getValue();
  }

  async create() {

    this.data = await this._getData();
    console.log(this.data)

  }

  _getType() {

    let btns = [document.getElementById('booleanBtn'), document.getElementById('binaryBtn'), document.getElementById('multiBtn')];
    let btns_classes = btns.map(e => e.classList.contains('grey-900'));

    return ['boolean', 'binary', 'multi'][btns_classes.indexOf(true)];
  }

  _getValue() {

    if (this.type === 'boolean') {
      return ["true", "false"]
    } else {
      return document.getElementById("varValue").value.replace(/\s/g, "").split(',');
    }
  }

  async _getData() {

      if (document.getElementById('checkboxIcon').checked) {

        let _files = (this.type !== "boolean" ?
          this.value.map((e, i) => { return document.getElementById(`varIcon${i + 1}`).files[0] }) :
          [document.getElementById('varIcon1').files[0]]
        );

        let files = _files.map((e) => 

          new Promise(resolve => {
            let reader = new FileReader;
            reader.readAsDataURL(e);
            reader.onload = (ev) => {
              resolve(ev.target.result);
            }
          })
        )

        let ret = Promise.all(files).then(result => { return(result) })
        return ret;

      } else {
        return null
      }
  }

}

export class Var {

  constructor(obj) {

    Object.assign(this, obj);

    this.icon = this._getIcon();

  }

  _getIcon() {

    if (this.type !== "multi") {
      return this._createIcon(this.name, 0)
    } else {
      let ret = this.value.map((e, i) => {
        return this._createIcon(e, i);
      })
      return ret;
    }
  }

  _createIcon(e, i) {

    if (this.data) {

      let icon;
      let type = this.data[i].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];

      if (type === "image/svg+xml") {

        let svg = atob(this.data[i].replace(/data:image\/svg\+xml;base64,/, ''));
  
        let div = document.createElement('div');
        div.innerHTML = svg.trim();
  
        icon = div.firstChild;
        icon.setAttribute("height", "60%");
        icon.setAttribute("width", "60%");
  
      } else {

        icon = new Image;
        icon.src = this.data[i];
        icon.height = "60%";
        icon.width = "60%";

      }

      return icon.outerHTML;

    } else {

      let icon = document.createElement("span");
      icon.textContent = e.slice(0, 2);

      return icon.outerHTML;

    }
  }

}