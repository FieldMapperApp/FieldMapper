import { changeButtons } from './utils';
import { onMousedown, onClick } from '../draw/draw';

export function createModeBtns(map) {

    let modeButtons = [
        L.easyButton('<img alt="create points" src="img/pin.svg" width="60%" />', function () {
            map.off('mousedown', onMousedown);
            map.on('click', onClick);
            changeButtons(modeButtons);
            if (this.button.parentElement.classList.contains('lines-mode')) { this.button.parentElement.classList.remove('lines-mode') };
            this.button.parentElement.classList.add('points-mode');
            this.setActive();
            console.log('markerMode');
        }),
        L.easyButton('<img alt="create lines" src="img/create.svg" width="60%" height="60%" />', function () {
            map.off('click', onClick);
            map.on('mousedown', onMousedown);
            changeButtons(modeButtons);
            if (this.button.parentElement.classList.contains('points-mode')) { this.button.parentElement.classList.remove('points-mode') };
            this.button.parentElement.classList.add('lines-mode');
            this.setActive();
            console.log('freehandMode');
        }),
    ];

    return L.easyBar(modeButtons);

}