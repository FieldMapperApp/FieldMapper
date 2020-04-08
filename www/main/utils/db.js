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
        this.root.getDirectory('db', { create: true }, dirEntry => {
            dirEntry.getFile(key, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    let blob = new Blob([value], { type: 'text/plain' });
                    fileWriter.onwriteend = async function () {
                        console.log("Successful file write: ", key);
                    };
                    fileWriter.write(blob);
                }, onError);
            }, onError);
        }, onError);
    },
    getItem: (key) => {
        //return new Promise(resolve => {
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
        //});

    },
    removeItem: (key) => {
        this.root.getDirectory('db', { create: false }, dirEntry => {
            dirEntry.getFile(key, { create: false }, function (fileEntry) {
                fileEntry.remove()
            }, onError);
        }, onError);
    },
    clear: () => {
        this.root.getDirectory('db', { create: true }, dirEntry => {
            dirEntry.removeRecursively();
        }, onError);
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
    console.log(error)
};