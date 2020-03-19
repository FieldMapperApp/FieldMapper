import { getDatetime } from '../utils/date';
import { getOptions } from '../settings/options/options';
import { checkGroup } from './utils';
import { properties, points, lines } from '../index';

export class Feature {

    constructor() {

        this.type = "Feature";
        this.properties = new FeatureProperties;

    }

}

class FeatureProperties {
    
    constructor() {

        Object.assign(this, properties);

        this.group = (getOptions().group ? this._getGroup() : null),
        this.color = (checkGroup(this.group) ? properties.getGroupColor() : properties.color),
        this.timestamp = getDatetime(new Date),

        delete this.getGroupColor;
        delete this._getGroupColor;
        delete this._colors;
        
    };

    _getGroup() {

        let modes = document.getElementById('modeCtrl');

        if (getOptions().groupType) {
            return (modes.classList.contains('points-mode') ? this._calcGroup(points, "p") : this._calcGroup(lines, "l"))
        } else {
            return (modes.classList.contains('points-mode') ? this._calcGroup(points) : this._calcGroup(lines))
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