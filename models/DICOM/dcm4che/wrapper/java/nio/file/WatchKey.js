"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchKey = exports.createWatchKeyProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link WatchKey} interface.
 * All required methods in {@link WatchKeyInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createWatchKeyProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.nio.file.WatchKey', methods, opts);
}
exports.createWatchKeyProxy = createWatchKeyProxy;
/**
 * Class java.nio.file.WatchKey.
 *
 * This actually imports the java class for further use.
 * The class {@link WatchKeyClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class WatchKey extends (0, java_bridge_1.importClass)('java.nio.file.WatchKey') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.WatchKey = WatchKey;
exports.default = WatchKey;
