window.db = {
    init: async () => {
        let fs = new Promise(resolve => {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 10 * 1024 * 1024, fs => {
                resolve(fs.root)
            }, (e) => { console.log('filesystem could not be accessed ', e.code) });
        });
        this.root = await fs;
    },
    setItem: (key, value) => {
        return new Promise(resolve => {
            this.root.getDirectory('db', { create: true }, dirEntry => {
                dirEntry.getFile(key, { create: true }, function (fileEntry) {
                    fileEntry.createWriter(function (fileWriter) {
                        let blob = new Blob([value], { type: 'text/plain' });
                        fileWriter.onwriteend = function () {
                            console.log("Successful file write: ", key);
                            resolve()
                        };
                        fileWriter.write(blob);
                    }, onError);
                }, onError);
            }, onError);
        })
    },
    getItem: (key) => {
        return new Promise(resolve => {
            this.root.getDirectory('db', { create: true }, dirEntry => {
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
        });

    },
    removeItem: (key) => {
        return new Promise(resolve => {
            this.root.getDirectory('db', { create: false }, dirEntry => {
                dirEntry.getFile(key, { create: false }, function (fileEntry) {
                    fileEntry.remove(resolve())
                }, (e) => { onError(e), resolve(null) });
            }, (e) => { onError(e), resolve(null) });
        })
        
    },
    clear: () => {
        return new Promise(resolve => {
            this.root.getDirectory('db', { create: false }, dirEntry => {
                dirEntry.removeRecursively(resolve(null));
            }, (e) => { onError(e), resolve(null) });
        })
    },
    getSize: () => {
        return new Promise(resolve => {
            this.root.getDirectory('db', { create: true }, dirEntry => {
                dirEntry.getMetadata(metadata => {
                    resolve(metadata.size)
                }, onError);
            }, onError);
        });
    },
}

function onError(error) {
    console.log(error.code)
}