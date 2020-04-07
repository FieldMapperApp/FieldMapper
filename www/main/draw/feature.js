import { getDatetime } from '../utils/date';
import { getOptions } from '../settings/utils';
import { checkGroup } from './utils';

export class Feature {

    constructor() {

        this.type = "Feature";
        this.properties = {};
        Object.assign(this.properties, app.properties);

        this.properties.timestamp = getDatetime(new Date);

        delete this.properties.getGroupColor;

    }

    async create() {

        let options = await getOptions();
        this.properties.group = (options.group ? this._getGroup(options) : null);
        this.properties.color = (checkGroup(this.properties.group, options) ? app.properties.getGroupColor(options) : app.properties.color);
   
    }

    _getGroup(options) {

        let modes = document.getElementById('modeCtrl');

        if (options.groupType) {
            return (modes.classList.contains('points-mode') ? this._calcGroup(app.points, "p") : this._calcGroup(app.lines, "l"))
        } else {
            return (modes.classList.contains('points-mode') ? this._calcGroup(app.points) : this._calcGroup(app.lines))
        }

    }

    _calcGroup(type, char) {

        let btn = document.getElementById('groupBtn');

        if (type.getLayers().length != 0) {
            if (btn.classList.contains('group-active')) {
                console.log('active')
                let prev = type.getLayers()[type.getLayers().length - 1];
                return prev.feature.properties.group;
            } else {
                let prev = type.getLayers()[type.getLayers().length - 1];
                if (char) {
                    return char + (parseInt(prev.feature.properties.group.slice(1), 10) + 1).toString();
                } else {
                    return prev.feature.properties.group + 1
                }
            }
        } else {
            if (char) {
                return char + 1
            } else {
                return 1
            }
        }

    }


}