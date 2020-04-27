import { getDatetime, getDate } from './date.js';

export function writeToFile(data, feature, saveAs) {
    return new Promise(resolve => {
        let datetime = getDatetime(new Date, true);
        let date = getDate(new Date);
        let filename = (saveAs.length != 0 ? saveAs + "_" + feature + "_" + datetime + ".geojson" : feature + "_" + datetime + ".geojson");
        window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (root) {
            console.log(root.fullPath); 
            root.getDirectory('exports', {create: true }, function (dirEntry) {
                console.log(dirEntry.fullPath);
                dirEntry.getDirectory(date, { create: true }, function (subDirEntry) {
                    console.log(subDirEntry.fullPath);
    
                    subDirEntry.getFile(filename, { create: true }, function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.onwriteend = () => {
                                alert('Saved!');
                                resolve()
                            };
    
                            fileWriter.onerror = () => {
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
}