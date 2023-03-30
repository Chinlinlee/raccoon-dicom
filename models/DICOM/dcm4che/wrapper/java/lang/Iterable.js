"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iterable = exports.createIterableProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link Iterable} interface.
 * All required methods in {@link IterableInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createIterableProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.lang.Iterable', methods, opts);
}
exports.createIterableProxy = createIterableProxy;
/**
 * Class java.lang.Iterable.
 *
 * This actually imports the java class for further use.
 * The class {@link IterableClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Iterable extends (0, java_bridge_1.importClass)('java.lang.Iterable') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Iterable = Iterable;
exports.default = Iterable;
//# sourceMappingURL=Iterable.js.map