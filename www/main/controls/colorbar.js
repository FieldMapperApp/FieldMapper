export class Colorbar {

    constructor(colors) {

        this._container = this._createContainer();
        this._colors = colors;
        this._colorBtnsOpen = this._createBtnsOpen();
        this._colorBtnsCollapsed = this._createBtnsCollapsed();
        this._colorBarOpen = this._createBarOpen();
        this._colorBarCollapsed = this._createBarCollapsed();
        this._collapseBar = this._collapseBar.bind(this);
        this._expandBar = this._expandBar.bind(this);

    }

    _createContainer() {

        let container = document.createElement('div');
        container.id = "colorbar";
        let topLeftControl = document.getElementsByClassName('leaflet-top leaflet-left')[0];
        topLeftControl.appendChild(container);

        return container;

    }

    _createBtnsOpen() {

        return this._colors.map(e => this._createBtn(e));

    }

    _createBarOpen() {

        let _this = this;

        return L.easyBar(_this._colorBtnsOpen.concat([L.easyButton('<img alt="collapse" src="img/chevron-up.svg" width="60%" height="60%" />', function () {
            _this._collapseBar();
        })])).container;

    }

    _createBtnsCollapsed() {


        let _this = this;

        return [_this._createBtn(app.properties.color), L.easyButton('<img alt="expand" src="img/chevron-down.svg" width="60%" height="60%" />', function () {
            _this._expandBar();
        })];
    }

    _createBarCollapsed() {

        let _this = this;

        return L.easyBar(_this._colorBtnsCollapsed).container;
    }

    _createBtn(color) {

        let _this = this;

        return L.easyButton('<img src=""/>', function (control) {
            app.properties.color = color;
            control.setActive();
            _this._collapseBar();
        })
    }

    _collapseBar() {

        this._colorBarOpen.remove();
        this._container.appendChild(this._colorBarCollapsed);
        this._colorBtnsCollapsed[0].button.style.backgroundColor = app.properties.color;

        let ev = new Event('controlcollapse');
        window.dispatchEvent(ev);

    }

    _expandBar() {

        this._colorBarCollapsed.remove();
        this._container.appendChild(this._colorBarOpen);
        for (let [i, val] of this._colors.entries()) {
            this._colorBtnsOpen[i].button.style.backgroundColor = val;
        }

        let ev = new Event('controlexpand');
        window.dispatchEvent(ev);
    }

    add() {
     
        this._container.appendChild(this._colorBarCollapsed);
        this._colorBtnsCollapsed[0].button.style.backgroundColor = app.properties.color;
        
    }

    remove() {

        this._container.remove();
        this._colorBtnsOpen = [];
        this._colorBtnsCollapsed = [];

    }
}





