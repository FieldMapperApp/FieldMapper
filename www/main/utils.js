export function onOffline(map, OSM) {
    console.log('offline');
    OSM.goOffline();
    updateStatus(map, OSM);
}

export function onOnline(map, OSM) {
    console.log('online');
    OSM.goOnline();
    updateStatus(map, OSM);
}

export function updateStatus(map, OSM) {
    document.getElementById('status').innerHTML =  map.getCenter().lat.toFixed(5) + ' ' + map.getCenter().lng.toFixed(5) + ' @ ZL ' + map.getZoom() + (OSM.isOnline() ? ' (online)' : OSM.isOffline() ? ' (offline))' : '');
}

export function hideStatus() {
    document.getElementById('status').style.display = "none";
}

export function showStatus() {
    document.getElementById('status').style.display = "inline";
}

export function onLoadAbout() {
    let container = document.getElementById('tabSettings').getBoundingClientRect().bottom;
    let list = document.getElementById('settingsList').getBoundingClientRect().bottom;
    let imprint = document.getElementById('imprint').offsetHeight;
    let about = document.getElementById('about');
    let content = document.getElementById('about-content');
    about.style.height = (container - list).toString() + "px";
    content.style.height = (container - list - imprint).toString() + "px";
}