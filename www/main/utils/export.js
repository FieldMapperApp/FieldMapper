import { getDatetime, getDate } from './date.js';

export function writeToFile(data, feature, saveAs) {
    var datetime = getDatetime(new Date, true);
    var date = getDate(new Date);
    if (saveAs.length != 0) { var filename = saveAs + "_" + feature + "_" + datetime + ".geojson" }
    else { var filename = feature + "_" + datetime + ".geojson"};
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fs) {
        console.log(fs.fullPath); 
        fs.getDirectory('exports', {create: true }, function (dirEntry) {
            console.log(dirEntry.fullPath);
            dirEntry.getDirectory(date, { create: true }, function (subDirEntry) {
                console.log(subDirEntry.fullPath);

                subDirEntry.getFile(filename, { create: true }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        fileWriter.onwriteend = function (e) {
                            alert('Saved!');
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Failed!');
                        };

                        var blob = new Blob([data], { type: 'text/plain' });
                        fileWriter.write(blob);
                    }, onError);
                }, onError);
            }, onError);
        }, onError);
    }, onError);
}

function onError(error) {
    console.log(error.code)
};

export function clearData() {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fs) {
        console.log(fs.fullPath); 
        fs.getDirectory('exports', {create: false }, function (dirEntry) {
            dirEntry.remove();
        }, onError);
    }, onError);
}