import { getOptions } from "./settings/options/options";

export class Properties {

    constructor() {

        this._colors = getOptions().colors;
        this.color = this._colors[0];
        this.getGroupColor = this._getGroupColor();

    }

    _getGroupColor() {

        let colors = this._colors;

        let i = 0;

        return function increment() {
            i = (i >= colors.length - 1 ? 0 : i + 1);
            this.color = colors[i];
            return this.color;
        }
    }

}