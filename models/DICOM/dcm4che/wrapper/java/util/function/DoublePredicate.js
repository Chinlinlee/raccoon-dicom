"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublePredicate = exports.createDoublePredicateProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link DoublePredicate} interface.
 * All required methods in {@link DoublePredicateInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createDoublePredicateProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.util.function.DoublePredicate', methods, opts);
}
exports.createDoublePredicateProxy = createDoublePredicateProxy;
/**
 * Class java.util.function.DoublePredicate.
 *
 * This actually imports the java class for further use.
 * The class {@link DoublePredicateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class DoublePredicate extends (0, java_bridge_1.importClass)('java.util.function.DoublePredicate') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.DoublePredicate = DoublePredicate;
exports.default = DoublePredicate;
