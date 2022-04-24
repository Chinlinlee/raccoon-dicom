const fs = require('fs');
const fsP = require('node:fs/promises');

module.exports = async (path) => {
    try {
        await fsP.access(path);
        return true;
    } catch(e) {
        return false;
    }
}

module.exports.sync = (path) => {
    try {
        fs.accessSync(path);
        return true;
    } catch(e) {
        return false;
    }
}