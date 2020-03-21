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
                    icon: (el.icon.length > 2 ? '<img alt="activate ' + name + '" src="' + el.icon + '" height="60%" width="60%" />' : `<span>${el.icon}</span>`),
                    title: 'activate',
                    onClick: function (control) {
                        properties[name] = true;
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: (el.icon.length > 2 ? '<img alt="activate ' + name + '" src="' + el.icon + '" height="60%" width="60%" />' : `<span>${el.icon}</span>`),
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
                    icon: (el.icon.length > 2 ? '<img alt="activate ' + name + '" src="' + el.icon + '" height="60%" width="60%" />' : `<span>${el.icon}</span>`),
                    title: 'activate',
                    onClick: function (control) {
                        properties[name] = el.value[1];
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: (el.icon.length > 2 ? '<img alt="activate ' + name + '" src="' + el.icon + '" height="60%" width="60%" />' : `<span>${el.icon}</span>`),
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
            let arr = [];
            el.value.forEach((e, i) => {
                let btn = L.easyButton({
                    states: [{
                        icon: (el.icon[0].length > 2 ? '<img alt="activate ' + name + '" src="' + el.icon[i] + '" height="60%" width="60%" />' : `<span>${el.icon[i]}</span>`),
                        title: 'activate ' + e,
                        onClick: function () {
                            changeButtons(arr);
                            properties[name] = e;
                            this.setActive();
                        }
                    }]
                })
                arr.push(btn);
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