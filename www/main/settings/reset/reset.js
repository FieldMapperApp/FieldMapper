import { clearData, countFiles } from '../../utils/export';
import { getVars, getLayers, sizeOf } from '../utils';

export async function onLoadReset() {

    let vars = await getVars();
    let layers = await getLayers();

    app.OSM.getCacheContents(async cache => {
        let exports = await countFiles();
        let size = await db.getSize();
        console.log(size)

        document.getElementById('vars-reset').innerText = vars.length.toString() + " variables cached";
        document.getElementById('layers-reset').innerText = layers.length.toString() + " layers imported";
        document.getElementById('exports-reset').innerText = exports + " layers saved in exports directory";
        document.getElementById('cache-reset').innerText = cache.length + " tiles cached";
        document.getElementById('stats').innerText = "Cache used: " + sizeOf(size).toString();

        document.getElementById('clearForm').addEventListener('submit', onSubmit);

    });
}

async function onSubmit(ev) {

    ev.preventDefault();

    let vars = document.getElementById('clearVariables').checked;
    let files = document.getElementById('clearFiles').checked;
    let cache = document.getElementById('clearCache').checked;
    let options = document.getElementById('clearOptions').checked;
    let layers = document.getElementById('clearLayers').checked;
    let position = document.getElementById('clearPosition').checked;
    
    let sure = ([vars, files, cache, options, layers, position].some(x => x) ? confirm('Are you sure?') : false);
    if (sure) {

        if (vars) { await db.removeItem('variables') }
        if (files) { await clearData() }
        if (cache) { app.OSM.emptyCache() }
        if (options) { await db.removeItem('options') }
        if (layers) { await db.removeItem('layers') }
        if (position) { await db.removeItem('position') }

    }

    backPage();

}