"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map$Entry = exports.createMap$EntryProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link Map$Entry} interface.
 * All required methods in {@link Map$EntryInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createMap$EntryProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.Map$Entry', methods, opts);
}
exports.createMap$EntryProxy = createMap$EntryProxy;
/**
 * Class java.util.Map$Entry.
 *
 * This actually imports the java class for further use.
 * The class {@link Map$EntryClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Map$Entry extends (0, java_bridge_1.importClass)('java.util.Map$Entry') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Map$Entry = Map$Entry;
exports.default = Map$Entry;
