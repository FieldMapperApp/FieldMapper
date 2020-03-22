export function deleteItem(key, arr, type) {

    console.log(key + " deleted")
    arr = arr.filter(item => item.name !== key); // remove from array
    let item = (type === 'variables' ? document.getElementById("var_item_" + key) : document.getElementById("layers_item_" + key));
    item.remove(); // remove from list
    localStorage.setItem(type, JSON.stringify({ ...arr })); // update storage  

}

export function updateItem(arr, obj) {

    let i = getInd(arr, obj.name);
    arr[i] = obj;
    console.log(obj);

    return arr;
}

export function getInd(arr, name) {

    let names = arr.map(x => x.name);
    return names.indexOf(name);

}

export function getVars() {
    return (localStorage.getItem('variables') ? Object.values(JSON.parse(localStorage.getItem('variables'))) : []);
}

export function getLayers() {
    return (localStorage.getItem('layers') ? Object.values(JSON.parse(localStorage.getItem('layers'))) : []);
}