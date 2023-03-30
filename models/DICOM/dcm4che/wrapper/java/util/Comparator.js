"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comparator = exports.createComparatorProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link Comparator} interface.
 * All required methods in {@link ComparatorInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createComparatorProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.Comparator', methods, opts);
}
exports.createComparatorProxy = createComparatorProxy;
/**
 * Class java.util.Comparator.
 *
 * This actually imports the java class for further use.
 * The class {@link ComparatorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Comparator extends (0, java_bridge_1.importClass)('java.util.Comparator') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Comparator = Comparator;
exports.default = Comparator;
//# sourceMappingURL=Comparator.js.map