'use strict';

const spawn = require('child_process').spawn;
const path7za = require('7zip-bin').path7za;

/**
 * Unpack archive.
 * @param {string} pathToPack - path to archive you want to unpack.
 * @param {string|function} destPathOrCb - Either:
 *                                              (i) destination path, where to unpack.
 *                                              (ii) callback function, in case no destPath to be specified
 * @param {function} [cb] - callback function. Will be called once unpack is done. If no errors, first parameter will contain `null`
 * NOTE: Providing destination path is optional. In case it is not provided, cb is expected as the second argument to function.
 * @param { import('child_process').SpawnOptionsWithoutStdio } spawnOpts
 */
function unpack(pathToPack, destPathOrCb, cb, spawnOpts) {
    if (typeof destPathOrCb === 'function' && cb === undefined) {
        cb = destPathOrCb;
        run(path7za, ['x', pathToPack, '-y'], cb, spawnOpts);
    } else {
        run(path7za, ['x', pathToPack, '-y', '-o' + destPathOrCb], cb, spawnOpts);
    }
}

/**
 * Pack file or folder to archive.
 * @param {string} pathToSrc - path to file or folder you want to compress.
 * @param {string} pathToDest - path to archive you want to create.
 * @param {function} cb - callback function. Will be called once pack is done. If no errors, first parameter will contain `null`.
 * @param { import('child_process').SpawnOptionsWithoutStdio } spawnOpts
 */
function pack(pathToSrc, pathToDest, cb, spawnOpts) {
    run(path7za, ['a', pathToDest, pathToSrc], cb, spawnOpts);
}

/**
 * Get an array with compressed file contents.
 * @param {string} pathToSrc - path to file its content you want to list.
 * @param {function} cb - callback function. Will be called once list is done. If no errors, first parameter will contain `null`.
 * @param { import('child_process').SpawnOptionsWithoutStdio } spawnOpts
 */
function list(pathToSrc, cb, spawnOpts) {
    run(path7za, ['l', '-slt', '-ba', pathToSrc], cb, spawnOpts);
}

/**
 * Run 7za with parameters specified in `paramsArr`.
 * @param {array} paramsArr - array of parameter. Each array item is one parameter.
 * @param {function} cb - callback function. Will be called once command is done. If no errors, first parameter will contain `null`. If no output, second parameter will be `null`.
 * @param { import('child_process').SpawnOptionsWithoutStdio } spawnOpts
 */
function cmd(paramsArr, cb, spawnOpts) {
    run(path7za, paramsArr, cb, spawnOpts);
}

function run(bin, args, cb, spawnOpts={}) {
    cb = onceify(cb);
    const runError = new Error(); // get full stack trace
    const proc = spawn(bin, args, { windowsHide: true, ...spawnOpts });
    let output = '';
    proc.on('error', function (err) {
        cb(err);
    });
    proc.on('exit', function (code) {
        let result = null;
        if (args[0] === 'l') {
            result = parseListOutput(output);
        }
        if (code) {
            runError.message = `7-zip exited with code ${code}\n${output}`;
        }
        cb(code ? runError : null, result);
    });
    proc.stdout.on('data', (chunk) => {
        output += chunk.toString();
    });
    proc.stderr.on('data', (chunk) => {
        output += chunk.toString();
    });
}

// http://stackoverflow.com/questions/30234908/javascript-v8-optimisation-and-leaking-arguments
// javascript V8 optimisation and “leaking arguments”
// making callback to be invoked only once
function onceify(fn) {
    let called = false;
    return function () {
        if (called) return;
        called = true;
        fn.apply(this, Array.prototype.slice.call(arguments)); // slice arguments
    };
}

function parseListOutput(str) {
    if (!str.length) return [];
    str = str.replace(/(\r\n|\n|\r)/gm, '\n');
    const items = str.split(/^\s*$/m);
    const res = [];
    const LIST_MAP = {
        'Path': 'name',
        'Size': 'size',
        'Packed Size': 'compressed',
        'Attributes': 'attr',
        'Modified': 'dateTime',
        'CRC': 'crc',
        'Method': 'method',
        'Block': 'block',
        'Encrypted': 'encrypted'
    };

    if (!items.length) return [];

    for (let item of items) {
        if (!item.length) continue;
        const obj = {};
        const lines = item.split('\n');
        if (!lines.length) continue;
        for (let line of lines) {
            // Split by first " = " occurrence. This will also add an empty 3rd elm to the array. Just ignore it
            const data = line.split(/ = (.*)/s);
            if (data.length !== 3) continue;
            const name = data[0].trim();
            const val = data[1].trim();
            if (LIST_MAP[name]) {
                if (LIST_MAP[name] === 'dateTime') {
                    const dtArr = val.split(' ');
                    if (dtArr.length !== 2) continue;
                    obj['date'] = dtArr[0];
                    obj['time'] = dtArr[1];
                } else {
                    obj[LIST_MAP[name]] = val;
                }
            }
        }
        if (Object.keys(obj).length) res.push(obj);
    }
    return res;
}

module.exports.unpack = unpack;
module.exports.pack = pack;
module.exports.list = list;
module.exports.cmd = cmd;