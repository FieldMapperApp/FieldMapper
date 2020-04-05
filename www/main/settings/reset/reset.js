import { clearData } from '../../utils/export';

export function onLoadReset(OSM) {

    document.getElementById('clearForm').addEventListener('submit', function () {

        let vars = document.getElementById('clearVariables').checked;
        let files = document.getElementById('clearFiles').checked;
        let cache = document.getElementById('clearCache').checked;
        let options = document.getElementById('clearOptions').checked;
        let layers = document.getElementById('clearLayers').checked;
        let sure = ([vars, files, cache, options, layers].some(x => x) ? confirm('Are you sure?') : false);
        if (sure) {
            if (vars) { localStorage.removeItem('variables') };
            if (files) { clearData() };
            if (cache) {
                OSM.emptyCache(function (oks, fails) {
                    var message = "Cleared cache.\n" + oks + " deleted OK\n" + fails + " failed";
                    alert(message);
                })
            }
            if (options) { localStorage.removeItem('options') };
            if (layers) { localStorage.removeItem('layers') };
        }

    });
}