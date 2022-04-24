const fsP = require('node:fs/promises');
const path = require('node:path');
const pathExist = require('./fileExist');

module.exports = async (source, destination, options) => {
    if (!source || !destination) {
        throw new Error("'`source` and `destination` file required'");
    }

    options = {
        overwrite: true,
        ...options
    };

    if (!options.overwrite && await pathExist(destination)) {
        throw new Error(`The destination file exists: ${destination}`);
    }

    await fsP.mkdir(path.dirname(destination), {
        recursive: true,
        mode: options.directoryMode
    });

    try {
        await fsP.rename(source, destination);
    } catch(e) {
        if (e.code === 'EXDEV') {
            await fsP.copyFile(source, destination);
            await fsP.unlink(source);
        } else {
            throw e;
        }
    }
}