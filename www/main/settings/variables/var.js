export class Var {

    constructor() { 
      this.name = document.getElementById('varName').value;
      this.position = document.getElementById("varPos").value;
      this.type = this._getType();
      this.compulsory = (this.type === 'multi' ? document.getElementById('checkboxCompulsory').checked : undefined);
      this.value = this._getValue();
      this.icon = this._getIcon();
    }

    _getType() {

      let btns = [document.getElementById('booleanBtn'), document.getElementById('binaryBtn'), document.getElementById('multiBtn')];
      console.log(btns.map(e => e.classList.contains('grey-900')));
      let btns_classes = btns.map(e => e.classList.contains('grey-900'));
      console.log(['boolean', 'binary', 'multi'][btns_classes.indexOf(true)]);
      return ['boolean', 'binary', 'multi'][btns_classes.indexOf(true)];
    }

    _getValue() {

      if (this.type === 'boolean') {
        return ["true", "false"]
      } else {
        return document.getElementById("varValue").value.replace(/\s/g, "").split(',');
      }
    }

    _getIcon() {

      if (document.getElementById("varIcon").value != "") {
        return document.getElementById("varIcon").value;
      } else if (this.type !== 'multi') {
        return this.name.slice(0, 2);
      } else {
        return this.value.map(e => e.slice(0, 2))
      }

    }
  }