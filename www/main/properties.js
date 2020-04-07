import { getOptions } from "./settings/utils";

export class Properties {

    constructor() {
        this.getGroupColor = this._getGroupColor();
    }

    async create() {

        let options = await getOptions();
        this.color = options.colors[0];
    }

    _getGroupColor(options) {

        let i = 0;

        return function increment(options) {
            let colors = options.colors;
            i = (i >= colors.length - 1 ? 0 : i + 1);
            this.color = colors[i];
            return this.color;
        }
    }

}