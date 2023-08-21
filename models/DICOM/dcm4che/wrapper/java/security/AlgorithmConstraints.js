"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorithmConstraints = exports.createAlgorithmConstraintsProxy = void 0;
const java_bridge_1 = require("java-bridge");
/**
 * Create a proxy for the {@link AlgorithmConstraints} interface.
 * All required methods in {@link AlgorithmConstraintsInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
function createAlgorithmConstraintsProxy(methods, opts) {
    return (0, java_bridge_1.newProxy)('java.security.AlgorithmConstraints', methods, opts);
}
exports.createAlgorithmConstraintsProxy = createAlgorithmConstraintsProxy;
/**
 * Class java.security.AlgorithmConstraints.
 *
 * This actually imports the java class for further use.
 * The class {@link AlgorithmConstraintsClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
class AlgorithmConstraints extends (0, java_bridge_1.importClass)('java.security.AlgorithmConstraints') {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    constructor() {
        super();
    }
}
exports.AlgorithmConstraints = AlgorithmConstraints;
exports.default = AlgorithmConstraints;