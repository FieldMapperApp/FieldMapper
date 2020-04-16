export async function deleteItem(key, type) {

    let arr = (type === "variables" ? await getVars() : await getLayers());
    console.log(key + " deleted")
    arr = arr.filter(item => item.name !== key); // remove from array
    let item = (type === 'variables' ? document.getElementById("var_item_" + key) : document.getElementById("layers_item_" + key));
    item.remove(); // remove from list
    await db.setItem(type, JSON.stringify({ ...arr })); // update storage  

}

export async function updateItem(type, obj) {
    let arr = (type === "variables" ? await getVars() : await getLayers());
    let i = getInd(arr, obj.name);
    arr[i] = obj;
    console.log(obj);

    await db.setItem(type, JSON.stringify({ ...arr })); // store locally (update variables data)
}

export function getInd(arr, name) {

    let names = arr.map(x => x.name);
    return names.indexOf(name);

}

export function sizeOf(bytes) {
    if (bytes == 0) { return "0.00 B"; }
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
}

export async function getVars() {
    let vars = await db.getItem('variables');

    return (vars ? Object.values(JSON.parse(vars)) : []);
}

export async function getLayers() {
    let layers = await db.getItem('layers');

    return (layers ? Object.values(JSON.parse(layers)) : []);
}

export async function getOptions() {
    let options = await db.getItem('options');

    return (options ? JSON.parse(options) : {
        colorbar: true,
        colors: ["black", "olivedrab", "gold", "firebrick", "dodgerblue", "saddlebrown"],
        location: true,
        comments: true,
        cache: true,
        deletion: false,
        export: false,
        group: true,
        groupType: true,
        groupColor: false
    })
}