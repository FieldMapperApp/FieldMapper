export function createLocationBtn(map) {
    
    let locationIcon = L.divIcon({
        className: "custom-pin",
        iconAnchor: [12, 20],
        popupAnchor: [0, -10],
        html: `<i class="icon ion-android-locate"></i>`
    })

    let currentPosition, updatedPosition, watchLocation, locationMarkers = L.layerGroup(), updatedLocationMarkers = L.layerGroup();
    let locateBtn = L.easyButton({
        position: 'topright',
        states: [{
            stateName: 'location-off',
            icon: '<img alt="activate location" src="img/location-arrow.svg" width="55%" height="55%" />',
            title: 'Activate Geolocation',
            onClick: function (control) {
                control.setActive();
                locationPermission.getStatus(function(status) {
                    console.log(status)
                    switch(status) {
                        case locationPermission.GRANTED: onPermissionSuccess(); break
                        case locationPermission.DENIED: alert("Looks like you need to enable geolocation first."); break
                    }
                })

                let onPermissionSuccess = () => {
                    navigator.geolocation.getCurrentPosition(onPositionSuccess, onError, { timeout: 5000, enableHighAccuracy: true });
                }

                let onError = function (error) {
                    alert(error.code + '\n' +
                        error.message + '\n');
                };

                let onPositionSuccess = function (position) {
                    console.log('position success');
                    currentPosition = L.latLng(position.coords.latitude, position.coords.longitude);
                    let radius = position.coords.accuracy;
                    let newMarker = L.marker(currentPosition, { icon: locationIcon }).bindPopup("You are within " + radius + " meters from this point").openPopup();
                    let newCircle = L.circle(currentPosition, radius, { weight: '2' });
                    locationMarkers.addLayer(newCircle);
                    locationMarkers.addLayer(newMarker);
                    locationMarkers.addTo(map);
                    locationMarkers.eachLayer(e => console.log(e._latlng));
                    map.flyTo(currentPosition, 17);
                    console.log(currentPosition + ' ' + updatedPosition);
                };
                
                let onWatchSuccess = function (position) {
                    console.log('watching');
                    updatedPosition = L.latLng(position.coords.latitude, position.coords.longitude);
                    if (updatedPosition != currentPosition) {
                        locationMarkers.clearLayers();
                        locationMarkers.remove();
                        updatedLocationMarkers.clearLayers();
                        updatedLocationMarkers.remove();
                        currentPosition = updatedPosition;
                        let radius = position.coords.accuracy;
                        let newMarker = L.marker(updatedPosition, { icon: locationIcon }).bindPopup("You are within " + radius + " meters from this point").openPopup();
                        let newCircle = L.circle(updatedPosition, radius, { weight: '2' });
                        updatedLocationMarkers.addLayer(newCircle);
                        updatedLocationMarkers.addLayer(newMarker);
                        //updatedLocationMarkers.addLayer(L.marker(currentPosition, {icon: iconColor('black')}));
                        updatedLocationMarkers.addTo(map);
                        updatedLocationMarkers.eachLayer(e => console.log(e._latlng));
                    }
                }
                watchLocation = navigator.geolocation.watchPosition(onWatchSuccess, onError, { timeout: 20000, enableHighAccuracy: true });
                control.state('location-on');
            }
        }, {
            stateName: 'location-on',
            icon: '<img alt="deactivate location" src="img/location-arrow.svg" height="55%" width="55%" />',
            title: 'Deactivate Geolocation',
            onClick: function (control) {
                navigator.geolocation.clearWatch(watchLocation);
                locationMarkers.clearLayers();
                locationMarkers.remove();
                updatedLocationMarkers.clearLayers();
                updatedLocationMarkers.remove();
                console.log(locationMarkers.getLayers().length + ' ' + updatedLocationMarkers.getLayers().length);
                //map.removeLayer(locationMarkers);
                control.setInactive();
                console.log(locationMarkers.getLayers().length + ' ' + updatedLocationMarkers.getLayers().length);
                console.log('location off');
                control.state('location-off');
            },
        }]
    });

    return locateBtn;
}

function getCurrentPosition () {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  }