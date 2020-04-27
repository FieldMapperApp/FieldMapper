import { changeButtons } from './utils';

export function addButton(el, map) {

    let name = el.name;

    let newButton;
    console.log(el.type);

    switch (el.type) {

        case "boolean":

            console.log('case boolean');
            app.properties[name] = false;
            newButton = L.easyButton({
                states: [{
                    stateName: 'inactive',
                    icon: el.icon,
                    title: 'activate',
                    onClick: function (control) {
                        app.properties[name] = true;
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: el.icon,
                    stateName: 'active',
                    title: 'deactivate',
                    onClick: function (control) {
                        app.properties[name] = false;
                        control.setInactive();
                        control.state('inactive');
                    },
                }]
            }).addTo(map);

            break;

        case "binary":

            console.log('case binary');
            app.properties[name] = el.value[0];
            newButton = L.easyButton({
                states: [{
                    stateName: 'inactive',
                    icon: el.icon,
                    title: 'activate',
                    onClick: function (control) {
                        app.properties[name] = el.value[1];
                        control.setActive();
                        control.state('active');
                    }
                }, {
                    icon: el.icon,
                    stateName: 'active',
                    title: 'deactivate',
                    onClick: function (control) {
                        app.properties[name] = el.value[0];
                        control.setInactive();
                        control.state('inactive');
                    },
                }]
            }).addTo(map);

            break;

        case "multi": {

            console.log('case multi');
            let arr = el.value.map((e, i) => {
                return L.easyButton({
                    states: [{
                        icon: el.icon[i],
                        title: 'activate ' + e,
                        onClick: function () {
                            changeButtons(arr);
                            app.properties[name] = e;
                            this.setActive();
                        }
                    }]
                })
            });

            newButton = L.easyBar(arr).addTo(map);
            app.properties[name] = el.value[0];
            arr[0].setActive();
            break;
        }
    }

    return newButton;

}