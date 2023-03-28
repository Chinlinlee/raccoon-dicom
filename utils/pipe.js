/**
 * from {@link https://www.30secondsofcode.org/js/s/pipe-async-functions}
 * @param  {...any} fns 
 * @returns 
 */
const pipeAsyncFunctions = (...fns) =>
  arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));


module.exports.pipe = pipeAsyncFunctions;