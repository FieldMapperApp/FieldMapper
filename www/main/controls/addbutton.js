import { properties } from '../index';
import { changeButtons } from './utils';

export function addButton(el, map) {

    let name = el.name;

    let newButton;
    console.log(el.type);

    switch (el.type) {

        case "boolean":

            console.log('case boolean');
            properties[name] = false;
            newButton = L.easyButton({
                position: el.position,
                states: [{
                    stateName: 'inactive',
                    icon: el.icon,
                    title: 'activate',
                    onClick: function (control) {
                        properties[name] = true;
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: el.icon,
                    stateName: 'active',
                    title: 'deactivate',
                    onClick: function (control) {
                        properties[name] = false;
                        control.setInactive();
                        control.state('inactive');
                    },
                }]
            }).addTo(map);

            break;

        case "binary":

            console.log('case binary');
            properties[name] = el.value[0];
            newButton = L.easyButton({
                position: el.position,
                states: [{
                    stateName: 'inactive',
                    icon: el.icon,
                    title: 'activate',
                    onClick: function (control) {
                        properties[name] = el.value[1];
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: el.icon,
                    stateName: 'active',
                    title: 'deactivate',
                    onClick: function (control) {
                        properties[name] = el.value[0];
                        control.setInactive();
                        control.state('inactive');
                    },
                }]
            }).addTo(map);

            break;

        case "multi":

            console.log('case multi');
            let arr = el.value.map((e, i) => {
                return L.easyButton({
                    states: [{
                        icon: el.icon[i],
                        title: 'activate ' + e,
                        onClick: function () {
                            changeButtons(arr);
                            properties[name] = e;
                            this.setActive();
                        }
                    }]
                })
            });

            newButton = L.easyBar(arr).addTo(map);
            if (el.compulsory === true) {
                properties[name] = el.value[0];
                arr[0].setActive();
            } else {
                properties[name] = null
            }
            break;
    }

    return newButton;

}