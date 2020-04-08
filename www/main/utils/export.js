import { getDatetime, getDate } from './date.js';

export function writeToFile(data, feature, saveAs) {
    return new Promise(resolve => {
        var datetime = getDatetime(new Date, true);
        var date = getDate(new Date);
        if (saveAs.length != 0) { var filename = saveAs + "_" + feature + "_" + datetime + ".geojson" }
        else { var filename = feature + "_" + datetime + ".geojson"};
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (root) {
            console.log(root.fullPath); 
            root.getDirectory('exports', {create: true }, function (dirEntry) {
                console.log(dirEntry.fullPath);
                dirEntry.getDirectory(date, { create: true }, function (subDirEntry) {
                    console.log(subDirEntry.fullPath);
    
                    subDirEntry.getFile(filename, { create: true }, function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onwriteend = function (e) {
                                alert('Saved!');
                                resolve()
                            };
    
                            fileWriter.onerror = function (e) {
                                console.log('Failed!');
                            };
    
                            let blob = new Blob([data], { type: 'text/plain' });
                            fileWriter.write(blob);
                        }, onError);
                    }, onError);
                }, onError);
            }, onError);
        }, onError);
    })
}

export function clearData() {
    return new Promise(resolve => {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (root) {
            root.getDirectory('exports', { create: true }, function (dirEntry) {
                dirEntry.removeRecursively(resolve(), (e) => { console.log(e) });
            }, onError);
        }, onError);
    })
}

export function countFiles() {
    return new Promise(resolve => {
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (root) {
            root.getDirectory('exports', { create: true }, function (dirEntry) {
                let reader = dirEntry.createReader();
                reader.readEntries((entries) => {
                    resolve(entries.length)
                })
            }, onError);
        }, onError);
    })
}

function onError(error) {
    console.log(error)
};