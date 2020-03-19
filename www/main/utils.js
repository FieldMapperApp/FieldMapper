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
    document.getElementById('status').innerHTML =  map.getCenter().lat.toFixed(5) + ' x ' + map.getCenter().lng.toFixed(5) + ' @ ' + map.getZoom() + (OSM.isOnline() ? ' (ONLINE)' : OSM.isOffline() ? ' (OFFLINE)' : '');
}

export function hideStatus() {
    document.getElementById('status').style.display = "none";
}

export function showStatus() {
    document.getElementById('status').style.display = "inline";
}