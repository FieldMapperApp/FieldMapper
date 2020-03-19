import { moveButtons, changeButtons } from './utils';
import { properties } from '../index';

export class Colorbar {

    constructor(map, buttons, colors) {

        this._map = map;
        this._buttons = buttons;
        this._colors = colors;
        this._colorBtnsOpen = this._createBtnsOpen();
        this._colorBtnsCollapsed = this._createBtnsCollapsed();
        this._colorBarOpen = this._createBarOpen();
        this._colorBarCollapsed = this._createBarCollapsed();
        this._collapseBar = this._collapseBar.bind(this);
        this._expandBar = this._expandBar.bind(this);

    }

    _createBtnsOpen() {

        return this._colors.map(e => this._createBtn(e));

    }

    _createBarOpen() {

        let _this = this;

        return L.easyBar(_this._colorBtnsOpen.concat([L.easyButton('<img alt="collapse" src="img/chevron-up.svg" width="60%" height="60%" />', function () {
            _this._collapseBar();
        })]));

    }

    _createBtnsCollapsed() {


        let _this = this;

        return [_this._createBtn(properties.color), L.easyButton('<img alt="expand" src="img/chevron-down.svg" width="60%" height="60%" />', function () {
            _this._expandBar();
        })];
    }

    _createBarCollapsed() {

        let _this = this;

        return L.easyBar(_this._colorBtnsCollapsed);
    }

    _createBtn(color) {

        let _this = this;

        return L.easyButton('<img src=""/>', function (control) {
            changeButtons(_this._colorBtnsOpen);
            properties.color = color;
            control.setActive();
            _this._collapseBar();
        })
    };

    _collapseBar() {

        this._colorBarOpen.remove();
        if (this._buttons) { this._buttons.forEach(e => e.remove()) };
        this._colorBarCollapsed.addTo(this._map);
        this._colorBtnsCollapsed[0].button.style.backgroundColor = properties.color;
        if (this._buttons) {
            this._buttons.forEach((e) => {
                e.addTo(this._map);
                moveButtons(e);
            })
        }

    }

    _expandBar() {

        this._colorBarCollapsed.remove();
        if (this._buttons) { this._buttons.forEach(e => e.remove()) };
        this._colorBarOpen.addTo(this._map);
        for (let [i, val] of this._colors.entries()) {
            this._colorBtnsOpen[i].button.style.backgroundColor = val;
        };
        if (this._buttons) {
            this._buttons.forEach((e) => {
                e.addTo(this._map);
                moveButtons(e);
            })
        }
    }

    add() {

        if (this._buttons) { this._buttons.forEach(e => e.remove()) };
        this._colorBarCollapsed.addTo(this._map);
        this._colorBtnsCollapsed[0].button.style.backgroundColor = properties.color;
        if (this._buttons) {
            this._buttons.forEach((e) => {
                e.addTo(this._map);
                moveButtons(e);
            })
        }
        
    }

    remove() {

        this._colorBarCollapsed.remove();
        this._colorBarOpen.remove();
        this._colorBtnsOpen = [];
        this._colorBtnsCollapsed = [];

    }
}





