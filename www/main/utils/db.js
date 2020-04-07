window.db = {
    setItem: (key, value) => {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (root) {
            root.getDirectory('db', { create: true }, dirEntry => {
                dirEntry.getFile(key, { create: true }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        let blob = new Blob([value], { type: 'text/plain' });
                        fileWriter.onwriteend = async function () {
                            console.log("Successful file write: ", key);
                            console.log(await db.getItem(key))
                        };
                        fileWriter.write(blob);
                    }, onError);
                }, onError);
            }, onError);
        }, onError);
    },
    getItem: (key) => {
        return new Promise(resolve => {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (root) {
                root.getDirectory('db', { create: true }, dirEntry => {
                    dirEntry.getFile(key, { create: false }, function (fileEntry) {
                        fileEntry.file(function (file) {
                            let reader = new FileReader();
                            reader.onloadend = function () {
                                resolve(this.result);
                            };
                            reader.readAsText(file);
                        }, (e) => { console.log(key); onError(e) });
                    }, (e) => { console.log(key, " ", e.code); resolve(null) });
                }, (e) => { console.log(key); onError(e) });
            }, (e) => { console.log(key); onError(e) });
        });

    },
    removeItem: (key) => {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (root) {
            root.getDirectory('db', { create: false }, dirEntry => {
                dirEntry.getFile(key, { create: false }, function (fileEntry) {
                    fileEntry.remove()
                }, onError);
            }, onError);
        }, onError);
    },
    clear: () => {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (root) {
            root.getDirectory('db', { create: true }, dirEntry => {
                dirEntry.removeRecursively();
            }, onError);
        }, onError);
    },
    getSize: () => {
        return new Promise(resolve => {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, root => {
                root.getDirectory('db', { create: true }, dirEntry => {
                    dirEntry.getMetadata(metadata => {
                        resolve(metadata.size)
                    }, onError);
                }, onError);
            }, onError);
        });
    },
}

function onError(error) {
    console.log(error)
};