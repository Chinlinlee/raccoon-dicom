"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spliterator$OfDouble = exports.createSpliterator$OfDoubleProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link Spliterator$OfDouble} interface.
 * All required methods in {@link Spliterator$OfDoubleInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createSpliterator$OfDoubleProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.Spliterator$OfDouble', methods, opts);
}
exports.createSpliterator$OfDoubleProxy = createSpliterator$OfDoubleProxy;
/**
 * Class java.util.Spliterator$OfDouble.
 *
 * This actually imports the java class for further use.
 * The class {@link Spliterator$OfDoubleClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class Spliterator$OfDouble extends (0, java_bridge_1.importClass)('java.util.Spliterator$OfDouble') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.Spliterator$OfDouble = Spliterator$OfDouble;
exports.default = Spliterator$OfDouble;
//# sourceMappingURL=Spliterator$OfDouble.js.map