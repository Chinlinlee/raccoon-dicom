"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntPredicate = exports.createIntPredicateProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link IntPredicate} interface.
 * All required methods in {@link IntPredicateInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createIntPredicateProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.IntPredicate', methods, opts);
}
exports.createIntPredicateProxy = createIntPredicateProxy;
/**
 * Class java.util.function.IntPredicate.
 *
 * This actually imports the java class for further use.
 * The class {@link IntPredicateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class IntPredicate extends (0, java_bridge_1.importClass)('java.util.function.IntPredicate') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.IntPredicate = IntPredicate;
exports.default = IntPredicate;
